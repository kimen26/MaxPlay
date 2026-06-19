// Construit le pack Lunii « Pierre et le loup » (Prokofiev, dit par Gérard Philipe)
// au format Archive STUdio (.zip) et le dépose dans ~/.studio/library.
//
// Source = inbox (MP3 + PNG fournis par Papa Yann). Lunii EMBALLE, ne crée pas de contenu.
// Usage : node studio/lunii/scripts/build-pierre-loup-pack.mjs
//
// Structure (story.json v1, validée sur la vraie boîte = patron Tritri, + fixes BUG-3 / autoplay) :
//   Cover (image + bumper 8s)  --OK-->  Récit complet (~27 min, autoplay)  --fin/OK--> retour Cover
//   home = sortir du pack (squareOne home:true + homeTransition:null).

import { createHash } from "crypto";
import { mkdirSync, rmSync, writeFileSync, readFileSync, copyFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { spawnSync } from "child_process";

const ROOT = "c:/ProjetsPerso/Claude_Projects/MaxPlay";
const INBOX = join(ROOT, "studio/dino/content/inbox");
const AUDIO_SRC = join(INBOX, "Pierre et le Loup par Gérard Philipe (12).mp3");
const IMAGE_SRC = join(INBOX, "pierre et le loup.png");
const FFMPEG = "C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";
const JAR = "C:/Program Files/Eclipse Adoptium/jdk-17.0.19.10-hotspot/bin/jar.exe";
const LIBRARY = join(homedir(), ".studio", "library");

// UUIDs FIGÉS, distincts des packs voyage (1f0a/a1*) et dinos (3f0a/b2*) → pas de collision.
const UUID_COVER = "e7c1a2b3-4d5e-4f60-8a71-b2c3d4e5f6a1";
const UUID_RECIT = "e7c1a2b3-4d5e-4f60-8a71-b2c3d4e5f6a2";

function run(cmd, args, label) {
  const r = spawnSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (r.status !== 0) throw new Error(`${label} a échoué (exit ${r.status}) : ${r.stderr?.toString().slice(-600)}`);
}
const sha1 = (buf) => createHash("sha1").update(buf).digest("hex");

// ─── 0. Vérifs ────────────────────────────────────────────────────────────────
for (const f of [FFMPEG, JAR, AUDIO_SRC, IMAGE_SRC]) if (!existsSync(f)) throw new Error(`Introuvable : ${f}`);

const tmp = join(ROOT, "studio/lunii/.build-pierre-loup");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(join(tmp, "staging", "assets"), { recursive: true });

// ─── 1. Récit complet : +300ms silence tête (anti-coupe) puis loudnorm, 44100 mono 128k ─
run(FFMPEG, ["-y", "-i", AUDIO_SRC, "-af", "adelay=300:all=1,loudnorm",
  "-ar", "44100", "-ac", "1", "-b:a", "128k", join(tmp, "recit.mp3")], "ffmpeg recit");

// ─── 2. Cover audio : bumper = 8 premières secondes (intro orchestrale) + pad + loudnorm ─
run(FFMPEG, ["-y", "-i", AUDIO_SRC, "-t", "8", "-af", "adelay=300:all=1,loudnorm",
  "-ar", "44100", "-ac", "1", "-b:a", "128k", join(tmp, "cover.mp3")], "ffmpeg cover audio");

// ─── 3. Image 320x240 (4:3 natif → pas de bandes), pad noir (écran rétro-éclairé), sans alpha ─
run(FFMPEG, ["-y", "-i", IMAGE_SRC,
  "-vf", "scale=320:240:force_original_aspect_ratio=decrease,pad=320:240:(ow-iw)/2:(oh-ih)/2:black,format=rgb24",
  "-frames:v", "1", join(tmp, "cover.png")], "ffmpeg image");

// ─── 4. Assets nommés par SHA1 ────────────────────────────────────────────────
const assets = {};
for (const [key, file, ext] of [["coverImage","cover.png",".png"],["coverAudio","cover.mp3",".mp3"],["recitAudio","recit.mp3",".mp3"]]) {
  const buf = readFileSync(join(tmp, file));
  const name = sha1(buf) + ext;
  writeFileSync(join(tmp, "staging", "assets", name), buf);
  assets[key] = name;
}
copyFileSync(join(tmp, "cover.png"), join(tmp, "staging", "thumbnail.png"));

// ─── 5. story.json (v1) ───────────────────────────────────────────────────────
const story = {
  format: "v1",
  title: "Pierre et le loup",
  description: "Le conte musical de Prokofiev, raconté par Gérard Philipe. Chaque personnage a son instrument.",
  version: 1,
  nightModeAvailable: false,
  stageNodes: [
    {
      uuid: UUID_COVER, squareOne: true, name: "Cover Pierre et le loup",
      image: assets.coverImage, audio: assets.coverAudio,
      okTransition: { actionNode: "action-recit", optionIndex: 0 },
      homeTransition: null,
      // squareOne : home=true + homeTransition=null => sortir du pack (fix BUG-3)
      controlSettings: { wheel: false, ok: true, home: true, pause: false, autoplay: false },
    },
    {
      uuid: UUID_RECIT, name: "Récit Pierre et le loup",
      image: assets.coverImage, audio: assets.recitAudio,
      okTransition: { actionNode: "action-cover", optionIndex: 0 },
      homeTransition: null,
      // autoplay=true => ok=true obligatoire (sinon reboucle + image figée). home=true => sortie pack.
      controlSettings: { wheel: false, ok: true, home: true, pause: true, autoplay: true },
    },
  ],
  actionNodes: [
    { id: "action-recit", name: "Vers le récit", options: [UUID_RECIT] },
    { id: "action-cover", name: "Retour accueil", options: [UUID_COVER] },
  ],
};
writeFileSync(join(tmp, "staging", "story.json"), JSON.stringify(story, null, 2));

// ─── 6. Zip via jar (entrées avec « / ») + dépôt library ──────────────────────
const zipName = "maxplay-pierre-et-le-loup.zip";
run(JAR, ["-cfM", join(tmp, zipName), "-C", join(tmp, "staging"), "."], "jar zip");
mkdirSync(LIBRARY, { recursive: true });
copyFileSync(join(tmp, zipName), join(LIBRARY, zipName));

console.log(`✅ Pack construit : ${join(LIBRARY, zipName)}`);
console.log(`   Récit ~27 min · cover bumper 8s · image 320x240.`);
console.log(`   Rafraîchis http://localhost:8080 → glisse le pack vers le DEVICE.`);
