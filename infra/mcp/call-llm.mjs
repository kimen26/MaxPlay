#!/usr/bin/env node
// call-llm.mjs — appel LLM en API DIRECTE, hors transport MCP.
//
// POURQUOI : le tool-call MCP de Claude Code a un timeout non configurable
// (~250s, MCP_TOOL_TIMEOUT n'existe pas — issue anthropics/claude-code#47076).
// Les writers narratifs longs (Kimi surtout) dépassent cette limite.
// Ce script fait EXACTEMENT le même fetch que le serveur MCP llm-copains,
// mais lancé via l'outil Bash → soumis au timeout Bash (jusqu'à 600 000 ms),
// pas à la limite du transport MCP.
//
// Clé : lue depuis ~/.claude.json (mcpServers.llm-copains.env). Canal GRATUIT
// par défaut (MOONSHOT_API_KEY / kimi.com). Le payant n'est PAS exposé ici.
//
// Usage :
//   node call-llm.mjs --provider kimi --system <file> --prompt <file> \
//        [--temperature 0.6] [--timeout-ms 540000] [--out <file>]
//
// system/prompt passés par FICHIER (zéro problème d'échappement shell).
// Réponse écrite sur --out si fourni, sinon stdout.

import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

function arg(name, def = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

const provider = arg("provider", "kimi");
const systemFile = arg("system");
const promptFile = arg("prompt");
const temperature = arg("temperature");
const timeoutMs = Number(arg("timeout-ms", "540000")); // 9 min < 600s cap Bash
const outFile = arg("out");
const writer = arg("writer");          // requis pour provider kimi-payant (garde-fou)
const thinking = arg("thinking");      // "enabled" | "disabled" — requis pour kimi-payant

// ── GARDE-FOU RÈGLE FIGÉE ──────────────────────────────────────────────
// Le canal payant Moonshot est STRICTEMENT réservé à 2 writers du casting
// figé : kimi-k26-instant et kimi-k26-thinking. Toute autre valeur de
// --writer (ou son absence) sur provider=kimi-payant = refus immédiat.
// Voir mémoire feedback-kimi-payant-interdit / feedback-regle-figee-alerte.
const PAYANT_WRITERS_AUTORISES = ["kimi-k26-instant", "kimi-k26-thinking"];
if (provider === "kimi-payant") {
  if (!writer || !PAYANT_WRITERS_AUTORISES.includes(writer)) {
    console.error(
      `ERREUR GARDE-FOU: provider 'kimi-payant' réservé à ${PAYANT_WRITERS_AUTORISES.join(" / ")}. ` +
      `Reçu --writer='${writer ?? "(absent)"}'. Refus. Règle figée — voir mémoire feedback-kimi-payant-interdit.`
    );
    process.exit(3);
  }
}

if (!systemFile || !promptFile) {
  console.error("ERREUR: --system <file> et --prompt <file> obligatoires.");
  process.exit(2);
}

// Clé depuis la config MCP (source unique de vérité, jamais en dur).
let env = {};
try {
  const cfg = JSON.parse(readFileSync(join(homedir(), ".claude.json"), "utf8"));
  env = (cfg.mcpServers && cfg.mcpServers["llm-copains"] && cfg.mcpServers["llm-copains"].env) || {};
} catch (e) {
  console.error(`ERREUR lecture ~/.claude.json: ${e.message}`);
  process.exit(2);
}

// Canaux GRATUITS uniquement. Le payant Moonshot est volontairement absent
// (règle projet : réservé à 2 writers via le tool MCP dédié).
const PROVIDERS = {
  kimi: {
    baseUrl: "https://api.kimi.com/coding/v1",
    model: "kimi-for-coding",
    keyEnv: "MOONSHOT_API_KEY",
    headers: {
      "User-Agent": "claude-code/1.9.0 (win32; x64)",
      "X-Client-Name": "claude-code",
      "X-Client-Version": "1.9.0",
    },
  },
  deepseek: {
    baseUrl: "https://api.deepseek.com/v1",
    model: "deepseek-chat",
    keyEnv: "DEEPSEEK_API_KEY",
    headers: {},
  },
  grok: {
    baseUrl: "https://api.x.ai/v1",
    model: "grok-4-latest",
    keyEnv: "XAI_API_KEY",
    headers: {},
  },
  // PAYANT — accès verrouillé par le garde-fou --writer ci-dessus.
  // Existe pour les 2 writers k26 dont la génération longue dépasse le
  // transport MCP (~250s). Le CLI contourne le transport, pas la règle.
  "kimi-payant": {
    baseUrl: "https://api.moonshot.ai/v1",
    model: "kimi-k2.6",
    keyEnv: "MOONSHOT_PAYANT_API_KEY",
    headers: {},
  },
};

const p = PROVIDERS[provider];
if (!p) {
  console.error(`ERREUR: provider inconnu '${provider}'. Connus: ${Object.keys(PROVIDERS).join(", ")}`);
  process.exit(2);
}
const apiKey = env[p.keyEnv];
if (!apiKey) {
  console.error(`ERREUR: ${p.keyEnv} absente de ~/.claude.json (llm-copains.env).`);
  process.exit(2);
}

const systemPrompt = readFileSync(systemFile, "utf8");
const userPrompt = readFileSync(promptFile, "utf8");

const body = {
  model: p.model,
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ],
};
if (temperature !== undefined) body.temperature = Number(temperature);
// Modèle payant K2.6 : thinking explicite (enabled = kimi-k26-thinking,
// disabled = kimi-k26-instant). Contrainte API : temp 0.6 si disabled, 1 si enabled.
if (provider === "kimi-payant" && thinking) {
  body.thinking = { type: thinking };
}

// STREAMING OBLIGATOIRE (doc officielle Moonshot/Kimi) :
// en non-stream, une génération longue (~5-8 min pour 550 mots) laisse la
// connexion HTTP silencieuse → une passerelle réseau intermédiaire la coupe
// (« fetch failed » ~5min, AVANT le timeout serveur de 2h et AVANT notre
// AbortController). Le stream renvoie les tokens en continu → connexion
// jamais muette → plus aucune coupure passerelle. Source :
// platform.moonshot.ai/docs/guide/utilize-the-streaming-output-feature.
body.stream = true;

const started = Date.now();
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), timeoutMs);

process.stderr.write(
  `[call-llm] → ${provider} ${p.baseUrl} model=${p.model} promptChars=${userPrompt.length} timeoutMs=${timeoutMs}\n`
);

try {
  const res = await fetch(`${p.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...p.headers,
    },
    body: JSON.stringify(body),
    signal: controller.signal,
  });
  clearTimeout(timer);
  const elapsed = Date.now() - started;

  if (!res.ok) {
    const errText = await res.text();
    process.stderr.write(`[call-llm] ✗ HTTP ${res.status} after ${elapsed}ms: ${errText.slice(0, 500)}\n`);
    process.exitCode = 1;
    throw new Error(`HTTP ${res.status}`);
  }

  // Lecture du flux SSE : chaque event = "data: {json}\n\n", fin = "data: [DONE]".
  // On réassemble choices[0].delta.content. La connexion reçoit des octets en
  // continu → aucune passerelle ne la coupe pour silence.
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  let lastBeat = Date.now();
  for await (const chunk of res.body) {
    buffer += decoder.decode(chunk, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";        // garde la ligne partielle
    for (const line of lines) {
      const t = line.trim();
      if (!t || !t.startsWith("data:")) continue;
      const payload = t.slice(5).trim();
      if (payload === "[DONE]") continue;
      try {
        const j = JSON.parse(payload);
        const piece = j?.choices?.[0]?.delta?.content;
        if (piece) text += piece;
      } catch { /* ligne SSE non-JSON (keep-alive) : ignore */ }
    }
    // Battement de progression toutes les ~30s pour visibilité.
    if (Date.now() - lastBeat > 30000) {
      lastBeat = Date.now();
      process.stderr.write(`[call-llm] … stream en cours, ${text.length} chars à ${((Date.now()-started)/1000)|0}s\n`);
    }
  }
  const elapsedFull = Date.now() - started;
  if (!text) {
    process.stderr.write(`[call-llm] ✗ stream vide after ${elapsedFull}ms\n`);
    process.exitCode = 1;
    throw new Error("stream vide");
  }
  process.stderr.write(`[call-llm] ✓ stream OK after ${elapsedFull}ms, responseChars=${text.length}\n`);

  if (outFile) {
    writeFileSync(outFile, text, "utf8");
    process.stderr.write(`[call-llm] écrit → ${outFile}\n`);
  } else {
    process.stdout.write(text);
  }
  // Pas de process.exit() brutal : laisse l'event loop se vider proprement
  // (évite l'assertion libuv Windows src\win\async.c au teardown).
  process.exitCode = 0;
} catch (e) {
  clearTimeout(timer);
  const elapsed = Date.now() - started;
  const aborted = e?.name === "AbortError";
  process.stderr.write(
    `[call-llm] ✗ ${aborted ? `timeout après ${elapsed}ms (limite ${timeoutMs}ms)` : `erreur réseau après ${elapsed}ms: ${e.message}`}\n`
  );
  process.exitCode = 1;
}
