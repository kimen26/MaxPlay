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
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

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
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error("ERREUR: ELEVENLABS_API_KEY non définie");
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

  if (!Array.isArray(segments) || segments.length === 0) {
    console.error("ERREUR: 'segments' vide ou absent");
    process.exit(1);
  }
  for (const [i, s] of segments.entries()) {
    if (!s.voice_id || typeof s.text !== "string") {
      console.error(`ERREUR: segment #${i} invalide (voice_id + text requis)`);
      process.exit(1);
    }
  }

  const totalChars = segments.reduce((n, s) => n + s.text.length, 0);
  console.log(`  → ${segments.length} segments, ${totalChars} car, modèle ${model_id}`);

  console.log(`[2/5] Packetisation (≤ ${SAFETY} car / ≤ ${MAX_VOICES} voix par paquet)...`);
  const packets = packetize(segments);
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
      model_id,
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
