#!/usr/bin/env bun
/**
 * generate-story-audio.js
 *
 * Génère l'audio multi-voix d'une story MaxPlay depuis un JSON de segments
 * (format _segments-NNN-vX.json) en bypassant l'API Studio EL (whitelistée
 * pour comptes entreprise uniquement). Utilise des appels TTS standard
 * + concaténation ffmpeg pour produire un MP3 final.
 *
 * Usage:
 *   bun narration/scripts/generate-story-audio.js <segments.json>
 *
 * Variables d'env requises:
 *   ELEVENLABS_API_KEY
 *
 * Output:
 *   - Segments temporaires : <output_dir>/segments/seg-NN.mp3
 *   - MP3 final : output_path du JSON
 *   - concat-list.txt utilisé par ffmpeg
 */

import { join, dirname, basename } from "node:path";
import { mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const FFMPEG = "C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";

const VOICE_SETTINGS = {
  "cbRcktt2xvoeFpdvW2wg": { stability: 0.55, similarity_boost: 0.75, style: 0.35, use_speaker_boost: false },
  "MvACGLim6BRvCWyH21A6": { stability: 0.68, similarity_boost: 0.72, style: 0.18, use_speaker_boost: false },
  "Te5RKnm9ebwdEvZ1S5pS": { stability: 0.45, similarity_boost: 0.70, style: 0.65, use_speaker_boost: true },
  "ukIKjXqbiGGkqIz0SW5c": { stability: 0.65, similarity_boost: 0.70, style: 0.25, use_speaker_boost: true },
};

const DEFAULT_VOICE_SETTINGS = { stability: 0.55, similarity_boost: 0.75, style: 0.35, use_speaker_boost: false };

function stripTags(text) {
  return text.replace(/\[[^\]]+\]/g, "").trim();
}

async function ttsSegment(apiKey, voiceId, text, modelId, outputPath, previousText, nextText) {
  const settings = VOICE_SETTINGS[voiceId] ?? DEFAULT_VOICE_SETTINGS;
  const body = { text, model_id: modelId, voice_settings: settings };
  if (previousText) body.previous_text = previousText;
  if (nextText) body.next_text = nextText;
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "xi-api-key": apiKey },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ElevenLabs ${response.status}: ${err}`);
  }
  const requestId = response.headers.get("request-id") ?? null;
  const audio = await response.arrayBuffer();
  await Bun.write(outputPath, audio);
  return { sizeBytes: audio.byteLength, requestId };
}

async function processBatch(apiKey, batch, modelId, segmentsDir) {
  const results = await Promise.allSettled(
    batch.map(async ({ index, segment, previousText, nextText }) => {
      const outputPath = join(segmentsDir, `seg-${String(index).padStart(2, "0")}.mp3`);
      const { sizeBytes, requestId } = await ttsSegment(
        apiKey,
        segment.voice_id,
        segment.text,
        modelId,
        outputPath,
        previousText,
        nextText
      );
      return { index, outputPath, sizeKB: Math.round(sizeBytes / 1024), requestId };
    })
  );
  return results;
}

async function concatWithFfmpeg(segmentFiles, outputPath, listPath) {
  const listContent = segmentFiles.map((p) => `file '${p.replace(/\\/g, "/")}'`).join("\n");
  await writeFile(listPath, listContent, "utf-8");
  const cmd = `"${FFMPEG}" -y -f concat -safe 0 -i "${listPath}" -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:a libmp3lame -b:a 192k -ar 44100 "${outputPath}"`;
  execSync(cmd, { stdio: "inherit" });
}

async function main() {
  const segmentsJsonPath = process.argv[2];
  if (!segmentsJsonPath) {
    console.error("Usage: bun generate-story-audio.js <segments.json>");
    process.exit(1);
  }
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error("ERREUR: ELEVENLABS_API_KEY non définie");
    process.exit(1);
  }

  console.log(`[1/5] Chargement ${segmentsJsonPath}...`);
  const raw = await readFile(segmentsJsonPath, "utf-8");
  const config = JSON.parse(raw);
  const { project_name, segments, output_path, model_id = "eleven_v3" } = config;
  console.log(`  → ${segments.length} segments, modèle: ${model_id}`);
  console.log(`  → Output final: ${output_path}`);

  const outputDir = dirname(output_path);
  const segmentsDir = join(outputDir, "segments");
  if (existsSync(segmentsDir)) {
    console.log(`[2/5] Nettoyage anciens segments ${segmentsDir}...`);
    await rm(segmentsDir, { recursive: true, force: true });
  }
  await mkdir(segmentsDir, { recursive: true });
  console.log(`[2/5] Dossier segments créé.`);

  console.log(`[3/5] Génération ${segments.length} segments TTS avec previous_text/next_text...`);
  console.log(`  (batches de 4 en parallèle — contexte prosodique inter-segment activé)`);
  const BATCH_SIZE = 4;
  const segmentFiles = new Array(segments.length);
  const requestIds = new Array(segments.length);
  const totalStart = Date.now();
  for (let i = 0; i < segments.length; i += BATCH_SIZE) {
    const batch = segments.slice(i, i + BATCH_SIZE).map((segment, k) => {
      const index = i + k;
      const prevSeg = index > 0 ? segments[index - 1] : null;
      const nextSeg = index < segments.length - 1 ? segments[index + 1] : null;
      return {
        index,
        segment,
        previousText: prevSeg ? stripTags(prevSeg.text) : undefined,
        nextText: nextSeg ? stripTags(nextSeg.text) : undefined,
      };
    });
    const batchStart = Date.now();
    const results = await processBatch(apiKey, batch, model_id, segmentsDir);
    for (const r of results) {
      if (r.status === "rejected") {
        console.error(`  ✗ Batch error: ${r.reason}`);
        process.exit(1);
      }
      const { index, outputPath, sizeKB, requestId } = r.value;
      segmentFiles[index] = outputPath;
      requestIds[index] = requestId;
      const reqIdShort = requestId ? ` [${requestId.slice(0, 8)}...]` : "";
      console.log(`  ✓ seg-${String(index).padStart(2, "0")}.mp3 (${sizeKB} KB)${reqIdShort}`);
    }
    const batchSec = ((Date.now() - batchStart) / 1000).toFixed(1);
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(segments.length / BATCH_SIZE)} en ${batchSec}s`);
  }
  const totalSec = ((Date.now() - totalStart) / 1000).toFixed(1);
  console.log(`[3/5] Tous segments générés en ${totalSec}s.`);
  const requestIdsPath = join(segmentsDir, "request-ids.json");
  await writeFile(requestIdsPath, JSON.stringify(requestIds, null, 2), "utf-8");
  console.log(`  request_ids sauvegardés: ${requestIdsPath} (pour 2e passe optionnelle)`);

  console.log(`[4/5] Concaténation ffmpeg → ${output_path}...`);
  const listPath = join(outputDir, "concat-list.txt");
  await concatWithFfmpeg(segmentFiles, output_path, listPath);

  console.log(`[5/5] ✅ Audio final généré: ${output_path}`);
  console.log(`  Segments temporaires conservés dans: ${segmentsDir}`);
  console.log(`  Project: ${project_name}`);
}

main().catch((e) => {
  console.error("Erreur fatale:", e);
  process.exit(1);
});
