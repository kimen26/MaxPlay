// Bibliothèque commune aux builds de packs Lunii MaxPlay.
// Regroupe les helpers ffmpeg/jar/sha1/story.json partagés par les 3 configs
// (dinos, voyage, tritri) pour que build-pack.mjs reste un simple orchestrateur.

import { createHash } from "crypto";
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { spawnSync } from "child_process";

export const ROOT = "c:/ProjetsPerso/Claude_Projects/MaxPlay";
export const FFMPEG =
  "C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";
export const JAR = "C:/Program Files/Eclipse Adoptium/jdk-17.0.19.10-hotspot/bin/jar.exe";
export const LIBRARY = join(homedir(), ".studio", "library");

export function run(cmd, args, label) {
  const r = spawnSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (r.status !== 0) {
    throw new Error(`${label} a échoué (exit ${r.status}) : ${r.stderr?.toString().slice(-500)}`);
  }
}

export function sha1(buf) {
  return createHash("sha1").update(buf).digest("hex");
}

// UUID déterministe (format canonique) dérivé d'une chaîne — pour les actionNode.id
// que l'éditeur STUdio exige en UUID (cf. LESSONS-MOTEUR § Format story.json v1).
export function idToUuid(str) {
  const h = sha1(str);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

// Prépare le staging .build-<nom>/ (purgé puis recréé) — même convention pour les 3 packs.
export function prepareStaging(nom) {
  const tmp = join(ROOT, `studio/lunii/.build-${nom}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(join(tmp, "staging", "assets"), { recursive: true });
  return tmp;
}

// Ajoute un fichier au staging sous son nom sha1 (convention STUdio) et renvoie ce nom.
export function addAsset(tmp, srcPath, ext) {
  const buf = readFileSync(srcPath);
  const name = sha1(buf) + ext;
  writeFileSync(join(tmp, "staging", "assets", name), buf);
  return name;
}

// Masterise un audio pour la boîte : pad 300ms de tête + loudnorm -13 LUFS / TP -1.5 dB
// (règle gravée LESSONS-MOTEUR § REX 2026-08-04 : packs du commerce ≈ -13 LUFS, le canon
// web reste à sa propre norme — la masterisation se fait ICI, au packaging, jamais en amont).
export function masterAudio(tmp, srcPath, outName) {
  const outPath = join(tmp, outName);
  run(FFMPEG, ["-y", "-i", srcPath,
    "-af", "adelay=300|300,loudnorm=I=-13:TP=-1.5:LRA=11", "-ar", "44100", "-ac", "1", "-b:a", "128k", outPath],
    `master ${outName}`);
  return addAsset(tmp, outPath, ".mp3");
}

// Image 320x240 RGB24 sans alpha (exigence Lunii), pad au fond demandé (noir par défaut :
// écran rétro-éclairé, cf. rules/lunii.md § Images Lunii).
export function buildImage(tmp, srcPath, outName, { pad = "black" } = {}) {
  const outPath = join(tmp, outName);
  run(FFMPEG, ["-y", "-i", srcPath,
    "-vf", `scale=320:240:force_original_aspect_ratio=decrease,pad=320:240:(ow-iw)/2:(oh-ih)/2:${pad},format=rgb24`,
    outPath], `img 320x240 ${outName}`);
  return outPath;
}

// Écrit story.json (format v1) : remap les id d'actionNode lisibles en UUID déterministes
// (sel `salt` pour ne pas collisionner entre pack normal et pack de test), zippe via jar
// (entrées avec « / », contrairement à Compress-Archive), dépose dans ~/.studio/library
// PUIS purge le staging .build-<nom>/ (règle brief HO-R06 pt.3 : purge auto après dépôt).
export function writeStoryAndZip(tmp, nom, { title, description, stageNodes, actionNodes, zipName, salt = "" }) {
  const ID_MAP = {};
  for (const a of actionNodes) ID_MAP[a.id] = idToUuid(`${salt}${nom}-action:${a.id}`);
  for (const a of actionNodes) { a.id = ID_MAP[a.id]; delete a.name; }
  for (const n of stageNodes) {
    for (const t of [n.okTransition, n.homeTransition]) {
      if (t && ID_MAP[t.actionNode]) t.actionNode = ID_MAP[t.actionNode];
    }
    delete n.name;
  }

  const story = { format: "v1", title, description, version: 1, nightModeAvailable: false, stageNodes, actionNodes };
  writeFileSync(join(tmp, "staging", "story.json"), JSON.stringify(story, null, 2));

  const zipPath = join(tmp, zipName);
  run(JAR, ["-cfM", zipPath, "-C", join(tmp, "staging"), "."], "jar zip");

  mkdirSync(LIBRARY, { recursive: true });
  const dest = join(LIBRARY, zipName);
  writeFileSync(dest, readFileSync(zipPath));

  // Purge du staging : le livrable est déjà dans la bibliothèque, la triple copie
  // (source + staging sha1 + zip) n'a plus de raison d'exister sur disque (cf. brief HO-R06,
  // audit 2026-09-12 P1 : 684 Mo de .build-* jamais purgés).
  rmSync(tmp, { recursive: true, force: true });

  return dest;
}

export function requireFiles(files) {
  for (const f of files) if (!existsSync(f)) throw new Error(`Fichier requis introuvable : ${f}`);
}
