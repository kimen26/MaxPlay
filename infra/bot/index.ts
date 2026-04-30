import { Bot, Context, InlineKeyboard } from "grammy";
import { homedir } from "os";
import { randomUUID } from "crypto";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_CHAT_ID = process.env.ALLOWED_CHAT_ID
  ? parseInt(process.env.ALLOWED_CHAT_ID)
  : null;
const PROJECT_PATH =
  process.env.PROJECT_PATH ?? "C:/ProjetsPerso/Claude_Projects/MaxPlay";

const MAX_HISTORY = 10;

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN manquant dans .env");
  process.exit(1);
}

const bot = new Bot(BOT_TOKEN);

type Message = { role: "user" | "assistant"; content: string };

const histories = new Map<number, Message[]>();

// Permissions en attente : reqId → { resolve }
const pendingPermissions = new Map<string, (allow: boolean) => void>();

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

      // Attendre la réponse Telegram (max 5 min)
      const allow = await new Promise<boolean>((resolve) => {
        pendingPermissions.set(reqId, resolve);
        setTimeout(() => {
          if (pendingPermissions.has(reqId)) {
            pendingPermissions.delete(reqId);
            console.log(`[PERM] Timeout expiré pour ${reqId} → refus auto`);
            resolve(false);
            bot.api.sendMessage(ALLOWED_CHAT_ID!, "⏰ Permission expirée (5 min) — refusée.").catch(() => {});
          }
        }, 5 * 60 * 1000);
      });

      console.log(`[PERM] Décision pour ${reqId} : ${allow ? "ALLOW" : "DENY"}`);

      // Format de réponse attendu par le hook PermissionRequest de Claude Code
      return Response.json(
        allow
          ? { decision: "allow" }
          : { decision: "deny", reason: "Refusé via Telegram" }
      );
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log("🌐 HTTP server démarré sur port 3001 (permissions)");

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
  await ctx.reply(`✅ Bot actif · Claude Code prêt · Projet : MaxPlay\n📝 ${count} échange(s) en mémoire`);
});

bot.command("reset", async (ctx) => {
  if (!isAllowed(ctx)) return;
  histories.delete(ctx.chat.id);
  await ctx.reply("🗑️ Historique effacé. Nouvelle conversation.");
});

// ─── Messages → Claude ────────────────────────────────────────────────────────

bot.on("message:text", async (ctx) => {
  if (!isAllowed(ctx)) {
    await ctx.reply(`⛔ Non autorisé.\n\nTon Chat ID : \`${ctx.chat.id}\``, {
      parse_mode: "Markdown",
    });
    return;
  }

  const chatId = ctx.chat.id;
  const text = ctx.message.text;
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
  const home = homedir();
  const proc = Bun.spawn(
    ["claude", "-p", prompt, "--agent", agent, "--dangerously-skip-permissions"],
    {
      cwd: PROJECT_PATH,
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, HOME: home, USERPROFILE: home },
    }
  );

  const timeoutId = setTimeout(() => proc.kill(), 5 * 60 * 1000);
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ]);
  clearTimeout(timeoutId);
  const exitCode = await proc.exited;

  if (exitCode !== 0 && !stdout.trim()) {
    throw new Error(stderr.trim() || `Claude a quitté avec le code ${exitCode}`);
  }
  return stdout.trim() || "(pas de réponse)";
}

function splitMessage(text: string, maxLen = 4000): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += maxLen) {
    chunks.push(text.slice(i, i + maxLen));
  }
  return chunks;
}

bot.catch((err) => console.error("Bot error:", err));

console.log("🤖 MaxPlay Bot démarré…");
bot.start({ drop_pending_updates: true });
