import { Bot, Context, InlineKeyboard } from "grammy";
import { hostname } from "os";
import { randomUUID } from "crypto";
import { spawn } from "child_process";
import { appendFileSync } from "fs";
import { join } from "path";

const INSTANCE_ID = randomUUID().slice(0, 8);
const INSTANCE_TAG = `[${INSTANCE_ID}@${hostname()}#${process.pid}]`;
const STARTED_AT = new Date().toISOString();

// Log fichier en APPEND : les redirections Start-Process tronquent les logs de
// l'instance vivante quand un doublon démarre — le fichier append survit.
const LOG_FILE = join(import.meta.dir, "bot.run.log");

function log(...args: unknown[]) {
  const line = `${new Date().toISOString()} ${INSTANCE_TAG} ${args
    .map((a) => (a instanceof Error ? a.stack ?? a.message : String(a)))
    .join(" ")}`;
  console.log(line);
  try {
    appendFileSync(LOG_FILE, line + "\n");
  } catch {
    // disque indisponible — on garde au moins la console
  }
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

try {
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
      log(`[PERM] Nouvelle demande ${reqId} — outil: ${tool_name}`);

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
      log(`[PERM] Message envoyé sur Telegram pour ${reqId}`);

      // Attendre la réponse Telegram (max 20 min)
      const allow = await new Promise<boolean>((resolve) => {
        pendingPermissions.set(reqId, resolve);
        setTimeout(() => {
          if (pendingPermissions.has(reqId)) {
            pendingPermissions.delete(reqId);
            log(`[PERM] Timeout expiré pour ${reqId} → refus auto`);
            resolve(false);
            bot.api.sendMessage(ALLOWED_CHAT_ID!, "⏰ Permission expirée (20 min) — refusée.").catch(() => {});
          }
        }, 20 * 60 * 1000);
      });

      log(`[PERM] Décision pour ${reqId} : ${allow ? "ALLOW" : "DENY"}`);

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

    return new Response("Not found", { status: 404 });
  },
  });
} catch (err) {
  log(
    `❌ Port 3001 indisponible — une autre instance du bot tourne déjà ? Arrêt propre.`,
    err instanceof Error ? err.message : String(err)
  );
  process.exit(1);
}

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
  await ctx.reply(`✅ Bot actif · Claude Code prêt · Projet : MaxPlay\n📝 ${count} échange(s) en mémoire`);
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

  // Battement de cœur : le message d'attente est édité toutes les 60s pour que
  // l'utilisateur voie que le bot est vivant (avant : silence total jusqu'au timeout).
  const t0 = Date.now();
  const heartbeat = setInterval(() => {
    const sec = Math.round((Date.now() - t0) / 1000);
    bot.api
      .editMessageText(
        chatId,
        thinkingId!,
        `${AGENT_EMOJI[agent]} Claude travaille toujours… ${sec}s _(agent : ${agent})_`,
        { parse_mode: "Markdown" }
      )
      .catch(() => {});
  }, 60_000);

  try {
    const promptWithHistory = buildPromptWithHistory(chatId, userMessage);
    const response = await runClaude(promptWithHistory, agent);
    clearInterval(heartbeat);

    addToHistory(chatId, "user", userMessage);
    addToHistory(chatId, "assistant", response.slice(0, 1000));

    await bot.api.deleteMessage(chatId, thinkingId).catch(() => {});
    for (const chunk of splitMessage(response)) {
      await bot.api
        .sendMessage(chatId, chunk, { parse_mode: "Markdown" })
        .catch(() => bot.api.sendMessage(chatId, chunk));
    }
  } catch (err) {
    clearInterval(heartbeat);
    const errMsg = `❌ Erreur : ${err instanceof Error ? err.message : String(err)}`;
    log(`❌ processUserMessage chat=${chatId}`, err instanceof Error ? err : String(err));
    // Éditer le message d'attente est plus fiable que delete+send (un seul appel API)
    await bot.api.editMessageText(chatId, thinkingId, errMsg).catch(async () => {
      await bot.api.deleteMessage(chatId, thinkingId!).catch(() => {});
      await bot.api.sendMessage(chatId, errMsg).catch(() => {});
    });
  }
}

// ─── Callbacks (permissions) ──────────────────────────────────────────────────

bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  log(`[CALLBACK] Reçu : ${data}`);

  try {
    await ctx.answerCallbackQuery();
  } catch (e) {
    log("[CALLBACK] answerCallbackQuery a échoué :", e);
  }

  if (data.startsWith("perm_allow_")) {
    const reqId = data.replace("perm_allow_", "");
    log(`[CALLBACK] Autoriser demandé pour ${reqId}`);
    const resolve = pendingPermissions.get(reqId);
    pendingPermissions.delete(reqId);
    if (resolve) {
      log(`[CALLBACK] Résolution ALLOW pour ${reqId}`);
      resolve(true);
      await ctx.editMessageText("✅ Permission accordée.").catch((e) => log("[CALLBACK] editMessageText fail:", e));
    } else {
      log(`[CALLBACK] reqId ${reqId} introuvable dans pendingPermissions`);
      await ctx.editMessageText("⚠️ Cette demande a déjà été traitée ou a expiré.").catch(() => {});
    }
    return;
  }

  if (data.startsWith("perm_deny_")) {
    const reqId = data.replace("perm_deny_", "");
    log(`[CALLBACK] Refus demandé pour ${reqId}`);
    const resolve = pendingPermissions.get(reqId);
    pendingPermissions.delete(reqId);
    if (resolve) {
      log(`[CALLBACK] Résolution DENY pour ${reqId}`);
      resolve(false);
      await ctx.editMessageText("❌ Permission refusée.").catch((e) => log("[CALLBACK] editMessageText fail:", e));
    } else {
      log(`[CALLBACK] reqId ${reqId} introuvable dans pendingPermissions`);
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

type Agent = "narration" | "game-dev" | "dino" | "max-adventure" | "quick";

// Casting V1 figé (2026-04-24, ajusté 2026-05-05) : Wex + Melki/Mimi/Dadou/Madie/Lulu/Pierrot/Raph/Juju/Nono
const NARRATION_KEYWORDS = [
  "histoire", "histoir", "personnage", "narration", "univers", "ennéagramme",
  "wex", "melki", "mimi", "dadou", "madie", "lulu", "pierrot", "raph", "juju", "nono",
  "pont cassé", "libellule", "éveil", "gardien", "totem", "compagnon",
  "arc", "chapitre", "scène", "dialogue", "récit", "conte",
  "écris", "écri", "rédige", "invente", "imagine", "crée une histoire",
];

const GAME_KEYWORDS = [
  "jeu", "mini-jeu", "mj-", "code", "bug", "html", "javascript",
  "bus svg", "déploie", "deploy", "github", "menu", "index.html",
  "tracker", "son", "victoire", "couleur", "svg", "score", "étoile",
  "crée un jeu", "nouveau jeu", "corrige", "répare", "ajoute",
];

const DINO_KEYWORDS = [
  "dino", "dinosaure", "tritri", "tricératops", "encyclopédie", "fiche dino",
  "dev-dinos", "jurassique", "crétacé", "trias", "fossile", "paléo",
  "t-rex", "tyrannosaure", "raptor", "mammouth", "mégafaune", "préhistoire",
  "voyage époque", "famille dino",
];

const MAX_ADVENTURE_KEYWORDS = [
  "max adventure", "max-adventure", "phaser", "tile", "tilemap", "tileset",
  "limezu", "carte top-down", "pixel-map",
];

function detectAgent(message: string): Agent {
  const lower = message.toLowerCase();
  const score = (keywords: string[]) =>
    keywords.filter((k) => lower.includes(k)).length;

  const scores: [Agent, number][] = [
    ["dino", score(DINO_KEYWORDS)],
    ["max-adventure", score(MAX_ADVENTURE_KEYWORDS)],
    ["narration", score(NARRATION_KEYWORDS)],
    ["game-dev", score(GAME_KEYWORDS)],
  ];

  const best = scores.reduce((a, b) => (b[1] > a[1] ? b : a));
  return best[1] > 0 ? best[0] : "quick";
}

const AGENT_EMOJI: Record<Agent, string> = {
  "narration": "📖",
  "game-dev": "🎮",
  "dino": "🦖",
  "max-adventure": "🗺️",
  "quick": "⚡",
};

// Indication de pôle injectée dans le prompt pour aider le routage CLAUDE.md côté CLI
const AGENT_POLE_HINT: Record<Agent, string> = {
  "narration": "Pôle NARRATION (studio/narration/)",
  "game-dev": "Pôle JEU — mini-jeux (studio/minijeux/)",
  "dino": "Pôle DINO (studio/dino/, déployé dans site/)",
  "max-adventure": "Pôle JEU — Max Adventure tiles (studio/max-adventure/)",
  "quick": "Question rapide, pas de pôle particulier",
};

async function runClaude(prompt: string, agent: Agent = "quick"): Promise<string> {
  const callId = randomUUID().slice(0, 6);
  const t0 = Date.now();

  // Map agent → modèle CLI Claude Code (utilise l'auth OAuth de l'utilisateur, pas de clé API)
  const modelMap: Record<Agent, string> = {
    "narration": "opus",
    "game-dev": "sonnet",
    "dino": "sonnet",
    "max-adventure": "sonnet",
    "quick": "haiku",
  };

  const model = modelMap[agent];
  const routedPrompt = `[Message reçu via le bot Telegram MaxPlay — aiguillage : ${AGENT_POLE_HINT[agent]}]\n\n${prompt}`;
  log(`🚀 runClaude[${callId}] agent=${agent} model=${model} promptLen=${routedPrompt.length} (via CLI)`);

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
      // Sous Windows, le SIGTERM émulé peut être ignoré — kill forcé en filet
      setTimeout(() => {
        try {
          child.kill("SIGKILL");
        } catch {
          // process déjà mort
        }
      }, 5000);
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
        log(`❌ runClaude[${callId}] timeout=${CLAUDE_TIMEOUT_MS}ms stderr="${stderr.trim().slice(0, 300)}"`);
        reject(new Error(`Erreur Claude: timeout après ${Math.round(CLAUDE_TIMEOUT_MS / 60000)} min`));
        return;
      }

      if (code !== 0) {
        const errMsg = stderr.trim() || `exit code ${code}`;
        log(`❌ runClaude[${callId}] exit=${code} duration=${dt}ms stderr="${errMsg.slice(0, 300)}"`);
        reject(new Error(`Erreur Claude: ${errMsg.slice(0, 500)}`));
        return;
      }

      const responseText = stdout.trim();
      log(`✅ runClaude[${callId}] exit=0 duration=${dt}ms responseLen=${responseText.length}`);
      if (stderr.trim()) log(`⚠️ runClaude[${callId}] stderr non vide: "${stderr.trim().slice(0, 200)}"`);
      resolve(responseText || "(pas de réponse)");
    });

    child.stdin.write(routedPrompt);
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

bot.catch((err) => log("❌ Bot error:", err.error instanceof Error ? err.error : String(err.error)));

process.on("uncaughtException", (err) => log("❌ uncaughtException:", err));
process.on("unhandledRejection", (reason) =>
  log("❌ unhandledRejection:", reason instanceof Error ? reason : String(reason))
);

log(`🤖 MaxPlay Bot démarré… INSTANCE_ID=${INSTANCE_ID} pid=${process.pid} host=${hostname()} CLAUDE_TIMEOUT_MS=${CLAUDE_TIMEOUT_MS} PROJECT_PATH=${PROJECT_PATH}`);

// ─── Polling résilient ────────────────────────────────────────────────────────
// bot.start() ne se résout que lorsque le polling s'arrête. Une erreur dedans (ex:
// 409 Conflict = une autre instance/un test a appelé getUpdates) rejetait la promesse
// SANS être catchée → unhandledRejection → polling mort pour toujours, mais process et
// serveur HTTP encore vivants = ZOMBIE PARTIEL silencieux (cause du « jamais de réponse »).
// On relance désormais le polling avec backoff. Un 409 transitoire est absorbé ; un
// conflit durable (vrai doublon) finit par faire exit → le garde-fou port 3001 + le hook
// SessionStart garantissent qu'une seule instance saine tourne.
const MAX_POLLING_RETRIES = 6;

async function runPolling() {
  for (let attempt = 1; attempt <= MAX_POLLING_RETRIES; attempt++) {
    try {
      await bot.start({
        drop_pending_updates: true,
        onStart: (me) =>
          log(`✅ Polling Telegram actif @${me.username} (tentative ${attempt}/${MAX_POLLING_RETRIES})`),
      });
      log("ℹ️ Polling arrêté normalement.");
      return;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const isConflict = msg.includes("409") || msg.includes("Conflict");
      log(`❌ Polling crashé (tentative ${attempt}/${MAX_POLLING_RETRIES})${isConflict ? " [409 conflit]" : ""}:`, msg);
      if (attempt >= MAX_POLLING_RETRIES) {
        log("🛑 Trop d'échecs de polling — arrêt du process (le hook SessionStart relancera une instance saine).");
        process.exit(1);
      }
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

runPolling();
