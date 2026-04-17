import { Bot, Context, InlineKeyboard } from "grammy";
import { homedir } from "os";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_CHAT_ID = process.env.ALLOWED_CHAT_ID
  ? parseInt(process.env.ALLOWED_CHAT_ID)
  : null;
const PROJECT_PATH =
  process.env.PROJECT_PATH ?? "C:/ProjetsPerso/Claude_Projects/MaxPlay";

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN manquant dans .env");
  process.exit(1);
}

const bot = new Bot(BOT_TOKEN);

// Demandes en attente de validation : id → prompt
const pendingRequests = new Map<string, string>();

// /start — affiche le chat ID pour configurer ALLOWED_CHAT_ID
bot.command("start", async (ctx) => {
  await ctx.reply(
    `👋 MaxPlay Bot actif !\n\nTon Chat ID : \`${ctx.chat.id}\`\n\nAjoute-le dans .env comme ALLOWED_CHAT_ID puis redémarre.`,
    { parse_mode: "Markdown" }
  );
});

// /status — vérification rapide
bot.command("status", async (ctx) => {
  if (!isAllowed(ctx)) return;
  await ctx.reply("✅ Bot actif · Claude Code prêt · Projet : MaxPlay");
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
  const reqId = `req_${Date.now()}`;
  pendingRequests.set(reqId, userMessage);

  const keyboard = new InlineKeyboard()
    .text("✅ Exécuter", `approve_${reqId}`)
    .text("❌ Annuler", `cancel_${reqId}`);

  const preview = userMessage.length > 300
    ? userMessage.slice(0, 300) + "…"
    : userMessage;

  await ctx.reply(
    `📨 *Demande reçue :*\n\n\`\`\`\n${preview}\n\`\`\`\n\nTu valides l'exécution ?`,
    { parse_mode: "Markdown", reply_markup: keyboard }
  );
});

// Validation → exécution
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery();

  if (data.startsWith("approve_")) {
    const reqId = data.replace("approve_", "");
    const userMessage = pendingRequests.get(reqId);
    pendingRequests.delete(reqId);

    if (!userMessage) {
      await ctx.editMessageText("⚠️ Demande expirée ou déjà traitée.");
      return;
    }

    await ctx.editMessageText(
      `⏳ *Exécution en cours…*\n\n\`\`\`\n${userMessage.slice(0, 300)}\n\`\`\``,
      { parse_mode: "Markdown" }
    );

    try {
      const response = await runClaude(userMessage);
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