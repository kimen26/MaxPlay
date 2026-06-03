#!/usr/bin/env bun
/**
 * generate-story-dialogue.js  —  PROCESS MILITAIRE audio (DEC-AUDIO-PRODUCTION-001)
 *
 * Méthode OFFICIELLE MaxPlay : POST /v1/text-to-dialogue (multi-voix natif,
 * 1 appel par paquet ≤ 2000 car) puis ffmpeg loudnorm pour coller les 2-3
 * paquets. Remplace l'ancien generate-story-audio.js (anti-pattern 32 TTS mono,
 * archivé dans _archive/).
 *
 * Avant toute production réelle : dérouler la checklist de fraîcheur
 *   ~/.claude/skills/audio-direction-elevenlabs/00-freshness-protocol.md
 *
 * Usage:
 *   ELEVENLABS_API_KEY="..." bun narration/scripts/generate-story-dialogue.js <segments.json>
 *
 * Format JSON attendu (MaxPlay interne — ≠ format natif EL) :
 *   {
 *     "project_name": "...",
 *     "model_id": "eleven_v3",                 // optionnel, défaut eleven_v3
 *     "language_code": "fr",                    // optionnel
 *     "settings": { "stability": 0.5 },         // optionnel (cf. delta D1 du skill)
 *     "output_path": "c:/.../001-final.mp3",
 *     "segments": [ { "voice_id": "...", "text": "[softly] ..." }, ... ]
 *   }
 * Le mapping segments -> inputs ne garde que {voice_id, text} (role ignoré).
 *
 * Output:
 *   - Paquets temporaires : <output_dir>/packets/pkt-NN.mp3
 *   - MP3 final : output_path
 *   - request-ids.json (debug / 2e passe)
 */

import { join, dirname } from "node:path";
import { mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { homedir } from "node:os";

// Source unique du resolver voice_id (jamais hardcoder un id ailleurs).
const VOICE_MAP_PATH = join(
  dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")),
  "..",
  "personnages",
  "voix-meta",
  "voice-map.json"
);

/**
 * Résout la clé API depuis l'environnement, sinon depuis la config Claude
 * globale (~/.claude.json → mcpServers.llm-copains.env). Source UNIQUE :
 * la clé ne vit que là, jamais dans le repo.
 */
function resolveApiKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY;
  try {
    const cfg = JSON.parse(readFileSync(join(homedir(), ".claude.json"), "utf-8"));
    const servers = cfg.mcpServers ?? {};
    for (const name of ["llm-copains", "elevenlabs"]) {
      const k = servers[name]?.env?.ELEVENLABS_API_KEY;
      if (k) return k;
    }
  } catch {
    /* config absente/illisible → erreur explicite plus bas */
  }
  return null;
}

function loadVoiceMap() {
  try {
    const m = JSON.parse(readFileSync(VOICE_MAP_PATH, "utf-8"));
    return { voices: m.voices ?? {}, alias: m._alias ?? {}, deprecated: m.deprecated ?? {} };
  } catch {
    return { voices: {}, alias: {}, deprecated: {} };
  }
}

/**
 * Résout le voice_id d'un segment via voice-map.json (source de vérité).
 * Priorité : clé `role`/`voice` → map (autoritaire). À défaut `voice_id`
 * littéral, refusé s'il est dans la liste deprecated. Anti-périmage.
 */
function resolveVoiceId(seg, vmap, idx) {
  const rawKey = (seg.role ?? seg.voice ?? "").toString().trim().toLowerCase();
  const key = vmap.alias[rawKey] ?? rawKey;
  const mapped = key ? vmap.voices[key] : undefined;

  if (mapped) {
    if (seg.voice_id && seg.voice_id !== mapped) {
      console.warn(
        `  ⚠ seg #${idx} "${rawKey}" : voice_id du JSON (${seg.voice_id}) ignoré → resolver autoritaire ${mapped}`
      );
    }
    return mapped;
  }
  if (seg.voice_id) {
    if (vmap.deprecated[seg.voice_id]) {
      throw new Error(
        `seg #${idx} : voice_id PÉRIMÉ ${seg.voice_id} — ${vmap.deprecated[seg.voice_id]}`
      );
    }
    if (rawKey) {
      console.warn(`  ⚠ seg #${idx} : rôle "${rawKey}" absent du voice-map → fallback voice_id littéral`);
    }
    return seg.voice_id;
  }
  throw new Error(
    `seg #${idx} : ni rôle connu ("${rawKey}") ni voice_id — voir ${VOICE_MAP_PATH}`
  );
}

const FFMPEG =
  "C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";

const API_URL = "https://api.elevenlabs.io/v1/text-to-dialogue";
const CHAR_CAP = 2000; // plafond dur EL
const SAFETY = 1900; // marge sous le plafond (tags comptés comme chars)
const MAX_VOICES = 10; // limite EL voix uniques / requête

/**
 * Regroupe les segments en paquets immuables tels que la somme des longueurs
 * de text reste ≤ SAFETY et que le nombre de voix uniques ≤ MAX_VOICES.
 * Un segment n'est jamais coupé : 1 segment = 1 input.
 */
function packetize(segments) {
  const packets = [];
  let current = [];
  let currentChars = 0;
  let currentVoices = new Set();

  for (const seg of segments) {
    const len = seg.text.length;
    if (len > CHAR_CAP) {
      throw new Error(
        `Segment trop long (${len} > ${CHAR_CAP} car) — découper le canon en amont:\n  "${seg.text.slice(0, 80)}..."`
      );
    }
    const nextVoices = new Set(currentVoices).add(seg.voice_id);
    const overflow = currentChars + len > SAFETY || nextVoices.size > MAX_VOICES;
    if (current.length > 0 && overflow) {
      packets.push(current);
      current = [];
      currentChars = 0;
      currentVoices = new Set();
    }
    current = [...current, { voice_id: seg.voice_id, text: seg.text }];
    currentChars += len;
    currentVoices.add(seg.voice_id);
  }
  if (current.length > 0) packets.push(current);
  return packets;
}

async function dialoguePacket(apiKey, inputs, modelId, languageCode, settings, outputPath) {
  const body = { inputs, model_id: modelId, output_format: "mp3_44100_128" };
  if (languageCode) body.language_code = languageCode;
  if (settings) body.settings = settings;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "xi-api-key": apiKey },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(
      `ElevenLabs ${response.status}: ${err}\n` +
        `→ Erreur de schéma possible : repasser la checklist de fraîcheur (00-freshness-protocol.md).`
    );
  }
  const requestId = response.headers.get("request-id") ?? null;
  const audio = await response.arrayBuffer();
  await Bun.write(outputPath, audio);
  return { sizeBytes: audio.byteLength, requestId };
}

async function concatWithFfmpeg(packetFiles, outputPath, listPath) {
  if (packetFiles.length === 1) {
    // 1 seul paquet : un loudnorm direct suffit (pas de concat).
    const cmd = `"${FFMPEG}" -y -i "${packetFiles[0]}" -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:a libmp3lame -b:a 192k -ar 44100 "${outputPath}"`;
    execSync(cmd, { stdio: "inherit" });
    return;
  }
  const listContent = packetFiles.map((p) => `file '${p.replace(/\\/g, "/")}'`).join("\n");
  await writeFile(listPath, listContent, "utf-8");
  const cmd = `"${FFMPEG}" -y -f concat -safe 0 -i "${listPath}" -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:a libmp3lame -b:a 192k -ar 44100 "${outputPath}"`;
  execSync(cmd, { stdio: "inherit" });
}

async function main() {
  const segmentsJsonPath = process.argv[2];
  if (!segmentsJsonPath) {
    console.error("Usage: bun generate-story-dialogue.js <segments.json>");
    process.exit(1);
  }
  const apiKey = resolveApiKey();
  if (!apiKey) {
    console.error(
      "ERREUR: clé ElevenLabs introuvable (ni $ELEVENLABS_API_KEY, ni ~/.claude.json mcpServers)"
    );
    process.exit(1);
  }

  console.log(`[1/5] Chargement ${segmentsJsonPath}...`);
  const config = JSON.parse(await readFile(segmentsJsonPath, "utf-8"));
  const {
    project_name,
    segments,
    output_path,
    model_id = "eleven_v3",
    language_code = null,
    settings = null,
  } = config;

  // RÈGLE MILITAIRE (DEC-AUDIO-PRODUCTION-001) : eleven_v3 OBLIGATOIRE.
  // Seul v3 gère les audio tags inline ([softly], [gasps]…) du voice-director.
  const MODEL = "eleven_v3";
  if (model_id && model_id !== MODEL) {
    console.warn(`  ⚠ model_id "${model_id}" du JSON IGNORÉ → eleven_v3 forcé (règle militaire audio)`);
  }

  if (!Array.isArray(segments) || segments.length === 0) {
    console.error("ERREUR: 'segments' vide ou absent");
    process.exit(1);
  }
  for (const [i, s] of segments.entries()) {
    if (typeof s.text !== "string") {
      console.error(`ERREUR: segment #${i} invalide (text requis)`);
      process.exit(1);
    }
  }

  const vmap = loadVoiceMap();
  if (Object.keys(vmap.voices).length === 0) {
    console.warn(`  ⚠ voice-map.json introuvable (${VOICE_MAP_PATH}) — fallback voice_id littéral`);
  }
  // Résolution autoritaire des voix AVANT packetisation (anti-périmage).
  const resolvedSegments = segments.map((s, i) => ({
    voice_id: resolveVoiceId(s, vmap, i),
    text: s.text,
  }));

  const totalChars = resolvedSegments.reduce((n, s) => n + s.text.length, 0);
  console.log(`  → ${resolvedSegments.length} segments, ${totalChars} car, modèle ${MODEL} (militaire)`);

  console.log(`[2/5] Packetisation (≤ ${SAFETY} car / ≤ ${MAX_VOICES} voix par paquet)...`);
  const packets = packetize(resolvedSegments);
  packets.forEach((pk, i) => {
    const chars = pk.reduce((n, s) => n + s.text.length, 0);
    const voices = new Set(pk.map((s) => s.voice_id)).size;
    console.log(`  paquet ${i + 1}/${packets.length} : ${pk.length} seg, ${chars} car, ${voices} voix`);
  });

  const outputDir = dirname(output_path);
  const packetsDir = join(outputDir, "packets");
  if (existsSync(packetsDir)) await rm(packetsDir, { recursive: true, force: true });
  await mkdir(packetsDir, { recursive: true });

  console.log(`[3/5] ${packets.length} appel(s) text-to-dialogue...`);
  const packetFiles = [];
  const requestIds = [];
  for (const [i, inputs] of packets.entries()) {
    const outPath = join(packetsDir, `pkt-${String(i).padStart(2, "0")}.mp3`);
    const start = Date.now();
    const { sizeBytes, requestId } = await dialoguePacket(
      apiKey,
      inputs,
      MODEL,
      language_code,
      settings,
      outPath
    );
    const sec = ((Date.now() - start) / 1000).toFixed(1);
    const reqShort = requestId ? ` [${requestId.slice(0, 8)}...]` : "";
    console.log(`  ✓ pkt-${String(i).padStart(2, "0")}.mp3 (${Math.round(sizeBytes / 1024)} KB, ${sec}s)${reqShort}`);
    packetFiles.push(outPath);
    requestIds.push(requestId);
  }
  await writeFile(join(packetsDir, "request-ids.json"), JSON.stringify(requestIds, null, 2), "utf-8");

  console.log(`[4/5] Concat ffmpeg + loudnorm → ${output_path}...`);
  await concatWithFfmpeg(packetFiles, output_path, join(outputDir, "concat-list.txt"));

  console.log(`[5/5] ✅ Audio final : ${output_path}`);
  console.log(`  Project: ${project_name} · paquets conservés: ${packetsDir}`);
}

main().catch((e) => {
  console.error("Erreur fatale:", e.message ?? e);
  process.exit(1);
});
