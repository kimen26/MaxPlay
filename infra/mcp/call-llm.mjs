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
    process.exit(1);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content ?? "";
  if (!text) {
    process.stderr.write(`[call-llm] ✗ réponse vide after ${elapsed}ms\n`);
    process.exit(1);
  }
  process.stderr.write(`[call-llm] ✓ HTTP ${res.status} after ${elapsed}ms, responseChars=${text.length}\n`);

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
