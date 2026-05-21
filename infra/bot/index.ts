import { Bot, Context, InlineKeyboard } from "grammy";
import { hostname } from "os";
import { randomUUID } from "crypto";
import { spawn } from "child_process";

const INSTANCE_ID = randomUUID().slice(0, 8);
const INSTANCE_TAG = `[${INSTANCE_ID}@${hostname()}#${process.pid}]`;
const STARTED_AT = new Date().toISOString();

function log(...args: unknown[]) {
  console.log(INSTANCE_TAG, ...args);
}

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_CHAT_ID = process.env.ALLOWED_CHAT_ID
  ? parseInt(process.env.ALLOWED_CHAT_ID)
  : null;
const PROJECT_PATH =
  process.env.PROJECT_PATH ?? "C:/ProjetsPerso/Claude_Projects/MaxPlay";

const CLAUDE_CLI = process.env.CLAUDE_CLI ?? "claude";
const CLAUDE_TIMEOUT_MS = parseInt(process.env.CLAUDE_TIMEOUT_MS ?? "600000");

const MAX_HISTORY = 10;

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN manquant dans .env");
  process.exit(1);
}

const bot = new Bot(BOT_TOKEN);

type Message = { role: "user" | "assistant"; content: string };

const histories = new Map<number, Message[]>();

// Mode de présence : "ici" = picker natif VSCode interactif + Telegram en copie
// lecture seule ; "dehors" = picker local supprimé, réponse via boutons Telegram.
type PresenceMode = "ici" | "dehors";
let presenceMode: PresenceMode = "ici";

// Permissions en attente : reqId → { resolve }
const pendingPermissions = new Map<string, (allow: boolean) => void>();

// Questions AskUserQuestion en attente : `${reqId}_${qIdx}` → { resolve, options }
type AskOption = { label: string; description?: string };
type AskQuestion = {
  question: string;
  header?: string;
  multiSelect?: boolean;
  options: AskOption[];
};
const pendingAsks = new Map<
  string,
  { resolve: (label: string | null) => void; options: AskOption[] }
>();

// ─── Buffer pour messages longs découpés par Telegram ─────────────────────────

const MESSAGE_BUFFER_MS = 1500; // délai d'attente entre morceaux

interface MessageBuffer {
  parts: string[];
  timer: ReturnType<typeof setTimeout>;
  thinkingMsgId?: number;
}

const messageBuffers = new Map<number, MessageBuffer>();

async function flushBuffer(chatId: number) {
  const buffer = messageBuffers.get(chatId);
  if (!buffer) return;
  messageBuffers.delete(chatId);

  const fullText = buffer.parts.join("\n");
  if (!fullText.trim()) return;

  await processUserMessage(chatId, fullText, buffer.thinkingMsgId);
}

// ─── Historique ──────────────────────────────────────────────────────────────

function getHistory(chatId: number): Message[] {
  if (!histories.has(chatId)) histories.set(chatId, []);
  return histories.get(chatId)!;
}

function addToHistory(chatId: number, role: "user" | "assistant", content: string) {
  const history = getHistory(chatId);
  history.push({ role, content });
  while (history.length > MAX_HISTORY * 2) history.splice(0, 2);
}

function buildPromptWithHistory(chatId: number, userMessage: string): string {
  const history = getHistory(chatId);
  if (history.length === 0) return userMessage;
  const lines = history.map((m) =>
    m.role === "user" ? `[Utilisateur] : ${m.content}` : `[Claude] : ${m.content}`
  );
  return (
    `Voici l'historique de notre conversation (contexte) :\n\n` +
    lines.join("\n\n") +
    `\n\n---\n\n[Utilisateur] : ${userMessage}`
  );
}

// ─── HTTP server (port 3001) — permissions Claude Code ───────────────────────

Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true });
    }

    if (url.pathname === "/permission" && req.method === "POST") {
      if (ALLOWED_CHAT_ID === null) {
        return Response.json({ decision: "allow" });
      }

      let body: { tool_name?: string; tool_input?: unknown; [key: string]: unknown } = {};
      try {
        body = await req.json() as typeof body;
      } catch {
        return Response.json({ decision: "allow" });
      }

      // Claude Code envoie {tool_name, tool_input} ou le payload brut du hook
      const tool_name = (body.tool_name ?? body.tool ?? "outil inconnu") as string;
      const tool_input = body.tool_input ?? body;
      const reqId = randomUUID();
      console.log(`[PERM] Nouvelle demande ${reqId} — outil: ${tool_name}`);

      // Formater l'input pour affichage
      const inputStr = JSON.stringify(tool_input, null, 2);
      const preview = inputStr.length > 600 ? inputStr.slice(0, 600) + "\n…" : inputStr;

      const keyboard = new InlineKeyboard()
        .text("✅ Autoriser", `perm_allow_${reqId}`)
        .text("❌ Refuser", `perm_deny_${reqId}`);

      await bot.api.sendMessage(
        ALLOWED_CHAT_ID,
        `🔐 *Demande de permission*\n\n*Outil :* \`${tool_name}\`\n\n\`\`\`json\n${preview}\n\`\`\``,
        { parse_mode: "Markdown", reply_markup: keyboard }
      );
      console.log(`[PERM] Message envoyé sur Telegram pour ${reqId}`);

      // Attendre la réponse Telegram (max 20 min)
      const allow = await new Promise<boolean>((resolve) => {
        pendingPermissions.set(reqId, resolve);
        setTimeout(() => {
          if (pendingPermissions.has(reqId)) {
            pendingPermissions.delete(reqId);
            console.log(`[PERM] Timeout expiré pour ${reqId} → refus auto`);
            resolve(false);
            bot.api.sendMessage(ALLOWED_CHAT_ID!, "⏰ Permission expirée (20 min) — refusée.").catch(() => {});
          }
        }, 20 * 60 * 1000);
      });

      console.log(`[PERM] Décision pour ${reqId} : ${allow ? "ALLOW" : "DENY"}`);

      // Format attendu par PermissionRequest (Claude Code hooks, 2026-05) :
      // { hookSpecificOutput: { hookEventName, decision: { behavior } } }
      // L'ancien format { decision: "allow" } était ignoré silencieusement.
      return Response.json({
        hookSpecificOutput: {
          hookEventName: "PermissionRequest",
          decision: {
            behavior: allow ? "allow" : "deny",
          },
        },
      });
    }

    // ─── AskUserQuestion : afficher la question + 1 bouton par option ────────────
    if (url.pathname === "/ask" && req.method === "POST") {
      if (ALLOWED_CHAT_ID === null) {
        // Pas de Telegram configuré → on annule pour laisser l'UI locale gérer.
        return Response.json({ cancelled: true });
      }

      let body: { questions?: AskQuestion[] } = {};
      try {
        body = (await req.json()) as typeof body;
      } catch {
        return Response.json({ cancelled: true });
      }

      const questions = body.questions ?? [];
      if (questions.length === 0) return Response.json({ cancelled: true });

      // Mode "ici" : on notifie sur Telegram (lecture seule) et on laisse le picker
      // natif VSCode gérer la réponse (le hook recevra { mode: "ici" } → allow).
      if (presenceMode === "ici") {
        for (const q of questions) {
          const optLines = (q.options ?? [])
            .map((o) => (o.description ? `• *${o.label}* — ${o.description}` : `• *${o.label}*`))
            .join("\n");
          await bot.api
            .sendMessage(
              ALLOWED_CHAT_ID,
              `💻 *${q.header ?? "Question"}* _(réponds dans VSCode)_\n\n${q.question}\n\n${optLines}`,
              { parse_mode: "Markdown" }
            )
            .catch(() => {});
        }
        console.log(`[ASK] mode=ici → notification seule, picker local`);
        return Response.json({ mode: "ici" });
      }

      const reqId = randomUUID().slice(0, 8);
      console.log(`[ASK] mode=dehors → ${reqId}, ${questions.length} question(s)`);

      const answers: { header?: string; question: string; answer: string }[] = [];

      // Une question à la fois (single-select). multiSelect → premier tap = réponse.
      for (let qIdx = 0; qIdx < questions.length; qIdx++) {
        const q = questions[qIdx]!;
        const opts = q.options ?? [];

        const keyboard = new InlineKeyboard();
        opts.forEach((opt, oIdx) => {
          keyboard.text(opt.label, `ask_${reqId}_${qIdx}_${oIdx}`).row();
        });
        keyboard.text("✋ Annuler", `ask_${reqId}_${qIdx}_cancel`);

        const optLines = opts
          .map((o) => (o.description ? `• *${o.label}* — ${o.description}` : `• *${o.label}*`))
          .join("\n");

        await bot.api.sendMessage(
          ALLOWED_CHAT_ID,
          `❓ *${q.header ?? "Question"}*\n\n${q.question}\n\n${optLines}`,
          { parse_mode: "Markdown", reply_markup: keyboard }
        );

        const key = `${reqId}_${qIdx}`;
        const choice = await new Promise<string | null>((resolve) => {
          pendingAsks.set(key, { resolve, options: opts });
          setTimeout(() => {
            if (pendingAsks.has(key)) {
              pendingAsks.delete(key);
              console.log(`[ASK] Timeout question ${key} → annulée`);
              resolve(null);
            }
          }, 19 * 60 * 1000);
        });

        if (choice === null) {
          console.log(`[ASK] ${reqId} annulée à la question ${qIdx}`);
          return Response.json({ cancelled: true });
        }
        answers.push({ header: q.header, question: q.question, answer: choice });
      }

      console.log(`[ASK] ${reqId} complète : ${answers.map((a) => a.answer).join(" | ")}`);
      return Response.json({ answers });
    }

    return new Response("Not found", { status: 404 });
  },
});

log("🌐 HTTP server démarré sur port 3001 (permissions)");

// ─── Commandes Telegram ───────────────────────────────────────────────────────

bot.command("start", async (ctx) => {
  await ctx.reply(
    `👋 MaxPlay Bot actif !\n\nTon Chat ID : \`${ctx.chat.id}\`\n\nAjoute-le dans .env comme ALLOWED_CHAT_ID puis redémarre.`,
    { parse_mode: "Markdown" }
  );
});

bot.command("status", async (ctx) => {
  if (!isAllowed(ctx)) return;
  const count = getHistory(ctx.chat.id).length / 2;
  const modeLabel = presenceMode === "ici" ? "💻 ICI" : "📱 DEHORS";
  await ctx.reply(
    `✅ Bot actif · Claude Code prêt · Projet : MaxPlay\n📝 ${count} échange(s) en mémoire\n🧭 Mode : ${modeLabel} (/mode)`
  );
});

bot.command("whoami", async (ctx) => {
  if (!isAllowed(ctx)) return;
  await ctx.reply(
    `🆔 *Instance bot*\n\n` +
      `\`${INSTANCE_TAG}\`\n` +
      `Démarrée : ${STARTED_AT}\n` +
      `Projet : ${PROJECT_PATH}`,
    { parse_mode: "Markdown" }
  );
});

bot.command("reset", async (ctx) => {
  if (!isAllowed(ctx)) return;
  histories.delete(ctx.chat.id);
  await ctx.reply("🗑️ Historique effacé. Nouvelle conversation.");
});

bot.command("ici", async (ctx) => {
  if (!isAllowed(ctx)) return;
  presenceMode = "ici";
  await ctx.reply(
    "💻 Mode *ICI* — tu réponds aux questions dans VSCode. Telegram en reçoit une copie pour info.",
    { parse_mode: "Markdown" }
  );
});

bot.command("dehors", async (ctx) => {
  if (!isAllowed(ctx)) return;
  presenceMode = "dehors";
  await ctx.reply(
    "📱 Mode *DEHORS* — les questions arrivent ici avec des boutons, tu réponds depuis Telegram.",
    { parse_mode: "Markdown" }
  );
});

bot.command("mode", async (ctx) => {
  if (!isAllowed(ctx)) return;
  const label = presenceMode === "ici" ? "💻 ICI (réponse VSCode)" : "📱 DEHORS (réponse Telegram)";
  await ctx.reply(`Mode actuel : *${label}*\n\n/ici · /dehors pour basculer.`, {
    parse_mode: "Markdown",
  });
});

// ─── Messages → Claude ────────────────────────────────────────────────────────

bot.on("message:text", async (ctx) => {
  const chatId = ctx.chat.id;
  const text = ctx.message.text;
  const preview = text.length > 80 ? text.slice(0, 80) + "…" : text;
  log(`📨 update chat=${chatId} text="${preview}"`);

  if (!isAllowed(ctx)) {
    log(`⛔ chat=${chatId} non autorisé (ALLOWED=${ALLOWED_CHAT_ID})`);
    await ctx.reply(`⛔ Non autorisé.\n\nTon Chat ID : \`${chatId}\``, {
      parse_mode: "Markdown",
    });
    return;
  }

  const existing = messageBuffers.get(chatId);

  if (existing) {
    // Message suivant : on l'ajoute au buffer et on repousse le timer
    existing.parts.push(text);
    clearTimeout(existing.timer);
    existing.timer = setTimeout(() => flushBuffer(chatId), MESSAGE_BUFFER_MS);
    return;
  }

  // Premier morceau : on crée le buffer et on affiche le message "réfléchit"
  const agent = detectAgent(text);
  const thinking = await ctx.reply(
    `${AGENT_EMOJI[agent]} Claude réfléchit… _(agent : ${agent})_`,
    { parse_mode: "Markdown" }
  );

  messageBuffers.set(chatId, {
    parts: [text],
    timer: setTimeout(() => flushBuffer(chatId), MESSAGE_BUFFER_MS),
    thinkingMsgId: thinking.message_id,
  });
});

async function processUserMessage(
  chatId: number,
  userMessage: string,
  thinkingMsgId?: number
) {
  const agent = detectAgent(userMessage);

  let thinkingId = thinkingMsgId;
  if (!thinkingId) {
    const msg = await bot.api.sendMessage(
      chatId,
      `${AGENT_EMOJI[agent]} Claude réfléchit… _(agent : ${agent})_`,
      { parse_mode: "Markdown" }
    );
    thinkingId = msg.message_id;
  }

  try {
    const promptWithHistory = buildPromptWithHistory(chatId, userMessage);
    const response = await runClaude(promptWithHistory, agent);

    addToHistory(chatId, "user", userMessage);
    addToHistory(chatId, "assistant", response.slice(0, 1000));

    await bot.api.deleteMessage(chatId, thinkingId).catch(() => {});
    for (const chunk of splitMessage(response)) {
      await bot.api
        .sendMessage(chatId, chunk, { parse_mode: "Markdown" })
        .catch(() => bot.api.sendMessage(chatId, chunk));
    }
  } catch (err) {
    await bot.api.deleteMessage(chatId, thinkingId).catch(() => {});
    await bot.api.sendMessage(
      chatId,
      `❌ Erreur : ${err instanceof Error ? err.message : String(err)}`
    );
    console.error(err);
  }
}

// ─── Callbacks (permissions) ──────────────────────────────────────────────────

bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  console.log(`[CALLBACK] Reçu : ${data}`);

  try {
    await ctx.answerCallbackQuery();
  } catch (e) {
    console.log("[CALLBACK] answerCallbackQuery a échoué :", e);
  }

  if (data.startsWith("perm_allow_")) {
    const reqId = data.replace("perm_allow_", "");
    console.log(`[CALLBACK] Autoriser demandé pour ${reqId}`);
    const resolve = pendingPermissions.get(reqId);
    pendingPermissions.delete(reqId);
    if (resolve) {
      console.log(`[CALLBACK] Résolution ALLOW pour ${reqId}`);
      resolve(true);
      await ctx.editMessageText("✅ Permission accordée.").catch((e) => console.log("[CALLBACK] editMessageText fail:", e));
    } else {
      console.log(`[CALLBACK] reqId ${reqId} introuvable dans pendingPermissions`);
      await ctx.editMessageText("⚠️ Cette demande a déjà été traitée ou a expiré.").catch(() => {});
    }
    return;
  }

  if (data.startsWith("ask_")) {
    // Format : ask_<reqId>_<qIdx>_<oIdx|cancel>
    const rest = data.slice("ask_".length);
    const lastSep = rest.lastIndexOf("_");
    const key = rest.slice(0, lastSep); // `${reqId}_${qIdx}`
    const optPart = rest.slice(lastSep + 1);
    const pending = pendingAsks.get(key);
    pendingAsks.delete(key);

    if (!pending) {
      await ctx.editMessageText("⚠️ Cette question a déjà été traitée ou a expiré.").catch(() => {});
      return;
    }

    if (optPart === "cancel") {
      pending.resolve(null);
      await ctx.editMessageText("✋ Question annulée.").catch(() => {});
      return;
    }

    const oIdx = parseInt(optPart, 10);
    const label = pending.options[oIdx]?.label ?? null;
    pending.resolve(label);
    await ctx
      .editMessageText(`✅ Réponse : *${label ?? "?"}*`, { parse_mode: "Markdown" })
      .catch(() => ctx.editMessageText(`✅ Réponse : ${label ?? "?"}`).catch(() => {}));
    return;
  }

  if (data.startsWith("perm_deny_")) {
    const reqId = data.replace("perm_deny_", "");
    console.log(`[CALLBACK] Refus demandé pour ${reqId}`);
    const resolve = pendingPermissions.get(reqId);
    pendingPermissions.delete(reqId);
    if (resolve) {
      console.log(`[CALLBACK] Résolution DENY pour ${reqId}`);
      resolve(false);
      await ctx.editMessageText("❌ Permission refusée.").catch((e) => console.log("[CALLBACK] editMessageText fail:", e));
    } else {
      console.log(`[CALLBACK] reqId ${reqId} introuvable dans pendingPermissions`);
      await ctx.editMessageText("⚠️ Cette demande a déjà été traitée ou a expiré.").catch(() => {});
    }
    return;
  }
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isAllowed(ctx: Context): boolean {
  if (ALLOWED_CHAT_ID === null) return true;
  return ctx.chat?.id === ALLOWED_CHAT_ID;
}

type Agent = "narration" | "game-dev" | "quick";

const NARRATION_KEYWORDS = [
  "histoire", "histoir", "personnage", "narration", "univers", "ennéagramme",
  "wex", "melki", "mimi", "polo", "jérem", "lulu", "pierrot", "raph", "juju", "nono",
  "léo", "sam", "élia", "lila", "camille", "victor", "iris", "theo", "noa",
  "pont cassé", "éveil", "phos", "gardien", "totem", "compagnon",
  "arc", "chapitre", "scène", "dialogue", "récit", "conte",
  "écris", "écri", "rédige", "invente", "imagine", "crée une histoire",
];

const GAME_KEYWORDS = [
  "jeu", "mini-jeu", "mj-", "code", "bug", "html", "javascript", "phaser",
  "bus svg", "déploie", "deploy", "github", "menu", "index.html",
  "tracker", "son", "victoire", "couleur", "svg", "score",
  "crée un jeu", "nouveau jeu", "corrige", "répare", "ajoute",
];

function detectAgent(message: string): Agent {
  const lower = message.toLowerCase();

  const narrationScore = NARRATION_KEYWORDS.filter((k) => lower.includes(k)).length;
  const gameScore = GAME_KEYWORDS.filter((k) => lower.includes(k)).length;

  if (narrationScore > gameScore && narrationScore > 0) return "narration";
  if (gameScore > narrationScore && gameScore > 0) return "game-dev";
  return "quick";
}

const AGENT_EMOJI: Record<Agent, string> = {
  "narration": "📖",
  "game-dev": "🎮",
  "quick": "⚡",
};

async function runClaude(prompt: string, agent: Agent = "quick"): Promise<string> {
  const callId = randomUUID().slice(0, 6);
  const t0 = Date.now();

  // Map agent → modèle CLI Claude Code (utilise l'auth OAuth de l'utilisateur, pas de clé API)
  const modelMap: Record<Agent, string> = {
    "narration": "opus",
    "game-dev": "sonnet",
    "quick": "haiku",
  };

  const model = modelMap[agent];
  log(`🚀 runClaude[${callId}] agent=${agent} model=${model} promptLen=${prompt.length} (via CLI)`);

  return new Promise<string>((resolve, reject) => {
    const args = ["-p", "--model", model, "--permission-mode", "bypassPermissions"];
    const child = spawn(CLAUDE_CLI, args, {
      cwd: PROJECT_PATH,
      shell: false,
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, CLAUDE_TIMEOUT_MS);

    child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

    child.on("error", (err) => {
      clearTimeout(timer);
      const dt = Date.now() - t0;
      log(`❌ runClaude[${callId}] spawn error=${err.message} duration=${dt}ms`);
      reject(new Error(`Erreur Claude (spawn): ${err.message}`));
    });

    child.on("close", (code) => {
      clearTimeout(timer);
      const dt = Date.now() - t0;

      if (timedOut) {
        log(`❌ runClaude[${callId}] timeout=${CLAUDE_TIMEOUT_MS}ms`);
        reject(new Error(`Erreur Claude: timeout après ${CLAUDE_TIMEOUT_MS}ms`));
        return;
      }

      if (code !== 0) {
        const errMsg = stderr.trim() || `exit code ${code}`;
        log(`❌ runClaude[${callId}] exit=${code} duration=${dt}ms stderr="${errMsg.slice(0, 200)}"`);
        reject(new Error(`Erreur Claude: ${errMsg.slice(0, 500)}`));
        return;
      }

      const responseText = stdout.trim();
      log(`✅ runClaude[${callId}] exit=0 duration=${dt}ms responseLen=${responseText.length}`);
      resolve(responseText || "(pas de réponse)");
    });

    child.stdin.write(prompt);
    child.stdin.end();
  });
}

function splitMessage(text: string, maxLen = 4000): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += maxLen) {
    chunks.push(text.slice(i, i + maxLen));
  }
  return chunks;
}

bot.catch((err) => console.error(INSTANCE_TAG, "Bot error:", err));

log(`🤖 MaxPlay Bot démarré… INSTANCE_ID=${INSTANCE_ID} pid=${process.pid} host=${hostname()} CLAUDE_TIMEOUT_MS=${CLAUDE_TIMEOUT_MS} PROJECT_PATH=${PROJECT_PATH}`);
bot.start({ drop_pending_updates: true });
