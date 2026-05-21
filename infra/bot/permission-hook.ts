#!/usr/bin/env bun
/**
 * Hook `command` pour PermissionRequest (Claude Code).
 *
 * Pourquoi un hook `command` et pas `http` ?
 * Un hook HTTP ne peut renvoyer que { behavior: "allow"|"deny" } — aucun moyen
 * de faire remonter du texte à Claude. Pour répondre à un `AskUserQuestion`
 * depuis Telegram, il faut le mécanisme **exit code 2 + stderr** (Claude lit le
 * stderr d'un hook command qui sort en code 2 et le traite comme feedback).
 *
 * Flux :
 *  - stdin = payload JSON du hook ({ tool_name, tool_input, ... }).
 *  - AskUserQuestion → POST /ask au bot, attend les taps, exit 2 + stderr = réponses.
 *  - tout autre outil → POST /permission au bot (allow/deny), JSON décision sur stdout.
 *  - bot injoignable / erreur → exit 0 sans sortie = on laisse Claude Code gérer
 *    normalement (prompt UI), on ne bloque jamais le travail.
 */

const BOT_BASE = process.env.BOT_PERMISSION_URL ?? "http://localhost:3001";
// Marge sous le timeout du hook (1210 s déclaré dans settings.json).
const WAIT_MS = 19 * 60 * 1000;

interface HookPayload {
  tool_name?: string;
  tool?: string;
  tool_input?: unknown;
  [key: string]: unknown;
}

interface AskOption {
  label: string;
  description?: string;
}
interface AskQuestion {
  question: string;
  header?: string;
  multiSelect?: boolean;
  options: AskOption[];
}

function allowDecision(): string {
  return JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PermissionRequest",
      decision: { behavior: "allow" },
    },
  });
}

function denyDecision(): string {
  return JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PermissionRequest",
      decision: { behavior: "deny" },
    },
  });
}

async function postJson(path: string, body: unknown, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(`${BOT_BASE}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  const raw = await Bun.stdin.text();

  let payload: HookPayload = {};
  try {
    payload = JSON.parse(raw) as HookPayload;
  } catch {
    // Payload illisible → ne pas bloquer.
    process.exit(0);
  }

  const toolName = (payload.tool_name ?? payload.tool ?? "") as string;
  const toolInput = (payload.tool_input ?? {}) as Record<string, unknown>;

  // ── AskUserQuestion : on relaye les options et on renvoie le choix via exit 2 ──
  if (toolName === "AskUserQuestion" && Array.isArray(toolInput.questions)) {
    const questions = toolInput.questions as AskQuestion[];
    try {
      const res = await postJson("/ask", { questions }, WAIT_MS);
      const data = (await res.json()) as
        | { answers: { header?: string; question: string; answer: string }[] }
        | { cancelled: true }
        | { mode: "ici" };

      if ("mode" in data && data.mode === "ici") {
        // Mode ICI : on autorise, le picker natif VSCode gère la réponse.
        process.stdout.write(allowDecision());
        process.exit(0);
      }

      if ("cancelled" in data && data.cancelled) {
        // L'utilisateur a refusé de répondre → on bloque proprement.
        process.stderr.write("L'utilisateur a annulé la question via Telegram.");
        process.exit(2);
      }

      const lines = (data as { answers: { header?: string; question: string; answer: string }[] }).answers
        .map((a) => `• ${a.header ? `[${a.header}] ` : ""}${a.question}\n  → ${a.answer}`)
        .join("\n");

      // exit 2 = blocage + stderr renvoyé à Claude comme feedback : c'est notre canal de réponse.
      process.stderr.write(
        `Réponse(s) de l'utilisateur via Telegram :\n${lines}\n\n` +
          `Continue en te basant sur ce(s) choix, sans reposer la question.`
      );
      process.exit(2);
    } catch {
      // Bot KO → laisser Claude poser la question normalement (UI locale).
      process.exit(0);
    }
  }

  // ── Tout autre outil : décision allow/deny via le bot, comme avant ──────────────
  try {
    const res = await postJson(
      "/permission",
      { tool_name: toolName, tool_input: toolInput },
      WAIT_MS
    );
    const text = (await res.text()).trim();
    // Le bot renvoie déjà le JSON { hookSpecificOutput: ... } attendu.
    process.stdout.write(text || allowDecision());
    process.exit(0);
  } catch {
    // Bot injoignable → on ne bloque pas le travail.
    process.exit(0);
  }
}

main().catch(() => process.exit(0));

// Évite un warning TS « unused » si denyDecision n'est pas appelé directement.
void denyDecision;
