import { Bot, Context, InlineKeyboard } from "grammy";
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

// Demandes en attente de validation
const pendingRequests = new Map<string, string>();

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

// Tout autre message → demande de validation avant exécution
bot.on("message:text", async (ctx) => {
  if (!isAllowed(ctx)) {
    await ctx.reply(`⛔ Non autorisé.\n\nTon Chat ID : \`${ctx.chat.id}\``, {
      parse_mode: "Markdown",
    });
    return;
  }

  const userMessage = ctx.message.text;
  const chatId = ctx.chat.id;
  const reqId = `req_${Date.now()}`;

  // Stocker le message + chatId pour la validation
  pendingRequests.set(reqId, JSON.stringify({ chatId, userMessage }));

  const keyboard = new InlineKeyboard()
    .text("✅ Exécuter", `approve_${reqId}`)
    .text("❌ Annuler", `cancel_${reqId}`);

  const preview = userMessage.length > 300 ? userMessage.slice(0, 300) + "…" : userMessage;
  const histCount = getHistory(chatId).length / 2;
  const histInfo = histCount > 0 ? `\n_📝 ${histCount} échange(s) de contexte inclus_` : "";

  await ctx.reply(
    `📨 *Demande reçue :*\n\n\`\`\`\n${preview}\n\`\`\`${histInfo}\n\nTu valides l'exécution ?`,
    { parse_mode: "Markdown", reply_markup: keyboard }
  );
});

// Validation → exécution
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery();

  if (data.startsWith("approve_")) {
    const reqId = data.replace("approve_", "");
    const stored = pendingRequests.get(reqId);
    pendingRequests.delete(reqId);

    if (!stored) {
      await ctx.editMessageText("⚠️ Demande expirée ou déjà traitée.");
      return;
    }

    const { chatId, userMessage } = JSON.parse(stored) as { chatId: number; userMessage: string };

    await ctx.editMessageText(
      `⏳ *Exécution en cours…*\n\n\`\`\`\n${userMessage.slice(0, 300)}\n\`\`\``,
      { parse_mode: "Markdown" }
    );

    try {
      const promptWithHistory = buildPromptWithHistory(chatId, userMessage);
      const response = await runClaude(promptWithHistory);

      // Sauvegarder dans l'historique
      addToHistory(chatId, "user", userMessage);
      addToHistory(chatId, "assistant", response.slice(0, 1000)); // tronquer pour pas exploser la mémoire

      for (const chunk of splitMessage(response)) {
        await ctx.reply(chunk, { parse_mode: "Markdown" }).catch(() => ctx.reply(chunk));
      }
    } catch (err) {
      await ctx.reply(`❌ Erreur : ${err instanceof Error ? err.message : String(err)}`);
      console.error(err);
    }
    return;
  }

  if (data.startsWith("cancel_")) {
    const reqId = data.replace("cancel_", "");
    pendingRequests.delete(reqId);
    await ctx.editMessageText("❌ Demande annulée.");
    return;
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
