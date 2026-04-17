import { Bot, Context } from "grammy";
import { homedir } from "os";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_CHAT_ID = process.env.ALLOWED_CHAT_ID
  ? parseInt(process.env.ALLOWED_CHAT_ID)
  : null;
const PROJECT_PATH =
  process.env.PROJECT_PATH ?? "C:/ProjetsPerso/Claude_Projects/MaxPlay";

const MAX_HISTORY = 10; // nb d'échanges conservés (user + assistant = 2 messages chacun)

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN manquant dans .env");
  process.exit(1);
}

const bot = new Bot(BOT_TOKEN);

type Message = { role: "user" | "assistant"; content: string };

// Historique par chat
const histories = new Map<number, Message[]>();


function getHistory(chatId: number): Message[] {
  if (!histories.has(chatId)) histories.set(chatId, []);
  return histories.get(chatId)!;
}

function addToHistory(chatId: number, role: "user" | "assistant", content: string) {
  const history = getHistory(chatId);
  history.push({ role, content });
  // Garder seulement les MAX_HISTORY derniers échanges (2 messages = 1 échange)
  while (history.length > MAX_HISTORY * 2) history.splice(0, 2);
}

function buildPromptWithHistory(chatId: number, userMessage: string): string {
  const history = getHistory(chatId);
  if (history.length === 0) return userMessage;

  const lines = history.map((m) =>
    m.role === "user"
      ? `[Utilisateur] : ${m.content}`
      : `[Claude] : ${m.content}`
  );

  return (
    `Voici l'historique de notre conversation (contexte) :\n\n` +
    lines.join("\n\n") +
    `\n\n---\n\n[Utilisateur] : ${userMessage}`
  );
}

// /start
bot.command("start", async (ctx) => {
  await ctx.reply(
    `👋 MaxPlay Bot actif !\n\nTon Chat ID : \`${ctx.chat.id}\`\n\nAjoute-le dans .env comme ALLOWED_CHAT_ID puis redémarre.`,
    { parse_mode: "Markdown" }
  );
});

// /status
bot.command("status", async (ctx) => {
  if (!isAllowed(ctx)) return;
  const count = getHistory(ctx.chat.id).length / 2;
  await ctx.reply(`✅ Bot actif · Claude Code prêt · Projet : MaxPlay\n📝 ${count} échange(s) en mémoire`);
});

// /reset — vide l'historique
bot.command("reset", async (ctx) => {
  if (!isAllowed(ctx)) return;
  histories.delete(ctx.chat.id);
  await ctx.reply("🗑️ Historique effacé. Nouvelle conversation.");
});

// Tout autre message → exécution directe
bot.on("message:text", async (ctx) => {
  if (!isAllowed(ctx)) {
    await ctx.reply(`⛔ Non autorisé.\n\nTon Chat ID : \`${ctx.chat.id}\``, {
      parse_mode: "Markdown",
    });
    return;
  }

  const userMessage = ctx.message.text;
  const chatId = ctx.chat.id;
  const thinking = await ctx.reply("⏳ Claude réfléchit…");

  try {
    const promptWithHistory = buildPromptWithHistory(chatId, userMessage);
    const response = await runClaude(promptWithHistory);

    addToHistory(chatId, "user", userMessage);
    addToHistory(chatId, "assistant", response.slice(0, 1000));

    await ctx.api.deleteMessage(chatId, thinking.message_id).catch(() => {});
    for (const chunk of splitMessage(response)) {
      await ctx.reply(chunk, { parse_mode: "Markdown" }).catch(() => ctx.reply(chunk));
    }
  } catch (err) {
    await ctx.api.deleteMessage(chatId, thinking.message_id).catch(() => {});
    await ctx.reply(`❌ Erreur : ${err instanceof Error ? err.message : String(err)}`);
    console.error(err);
  }
});

function isAllowed(ctx: Context): boolean {
  if (ALLOWED_CHAT_ID === null) return true;
  return ctx.chat?.id === ALLOWED_CHAT_ID;
}

async function runClaude(prompt: string): Promise<string> {
  const home = homedir();
  const proc = Bun.spawn(["claude", "-p", prompt, "--dangerously-skip-permissions"], {
    cwd: PROJECT_PATH,
    stdout: "pipe",
    stderr: "pipe",
    env: {
      ...process.env,
      HOME: home,
      USERPROFILE: home,
    },
  });

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
