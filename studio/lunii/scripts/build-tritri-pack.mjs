// Construit le pack Lunii « Tritri le Tricératops » au format Archive STUdio (.zip)
// et le dépose dans la bibliothèque locale STUdio (%UserProfile%\.studio\library).
//
// Usage : bun studio/lunii/scripts/build-tritri-pack.mjs
// Prérequis : ffmpeg (winget Gyan.FFmpeg), JDK 17 (jar.exe), STUdio (pour visualiser).
//
// Structure du pack (format story.json v1, cf. ArchiveStoryPackWriter.java) :
//   Cover (image + bloc « nom »)  --OK-->  Récit complet (5 blocs concat + loudnorm)
//   fin du récit (autoplay)       --------> retour Cover

import { createHash } from "crypto";
import { mkdirSync, rmSync, writeFileSync, readFileSync, copyFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { spawnSync } from "child_process";

const ROOT = "c:/ProjetsPerso/Claude_Projects/MaxPlay";
const AUDIO_DIR = join(ROOT, "site/audio/dinos");
const IMAGE_SRC = join(ROOT, "site/img/dinos/Triceratops.png");
const FFMPEG =
  "C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";
const JAR = "C:/Program Files/Eclipse Adoptium/jdk-17.0.19.10-hotspot/bin/jar.exe";
const LIBRARY = join(homedir(), ".studio", "library");

// UUIDs FIGÉS : un rebuild produit le même pack (pas de doublon côté STUdio/Lunii)
const UUID_COVER = "7a3f1c9e-4b2d-4e8a-9c61-d5f08a72b3e4";
const UUID_RECIT = "b8e52d17-6a90-4f3c-8d24-1c7e9f50a6b2";

const BLOCS = [
  "triceratops-nom.mp3",
  "triceratops-taille.mp3",
  "triceratops-regime.mp3",
  "triceratops-funfact.mp3",
  "triceratops-recap.mp3",
];

function run(cmd, args, label) {
  const r = spawnSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (r.status !== 0) {
    throw new Error(`${label} a échoué (exit ${r.status}) : ${r.stderr?.toString().slice(-500)}`);
  }
}

function sha1(buf) {
  return createHash("sha1").update(buf).digest("hex");
}

// ─── 0. Vérifications préalables ──────────────────────────────────────────────
for (const f of [FFMPEG, JAR, IMAGE_SRC, ...BLOCS.map((b) => join(AUDIO_DIR, b))]) {
  if (!existsSync(f)) throw new Error(`Fichier requis introuvable : ${f}`);
}

const tmp = join(ROOT, "studio/lunii/.build-tritri");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(join(tmp, "staging", "assets"), { recursive: true });

// ─── 1. Récit complet : concat 5 blocs + loudnorm (règle audio gravée) ───────
const concatList = BLOCS.map((b) => `file '${join(AUDIO_DIR, b).replace(/\\/g, "/")}'`).join("\n");
writeFileSync(join(tmp, "concat.txt"), concatList);
run(
  FFMPEG,
  ["-y", "-f", "concat", "-safe", "0", "-i", join(tmp, "concat.txt"),
   "-af", "loudnorm=I=-13:TP=-1.5:LRA=11", "-ar", "44100", "-ac", "1", "-b:a", "128k", join(tmp, "recit.mp3")],
  "ffmpeg concat+loudnorm"
);

// ─── 2. Cover : annonce du nom seule (déjà loudnorm côté site, on la passe quand même) ─
run(
  FFMPEG,
  ["-y", "-i", join(AUDIO_DIR, "triceratops-nom.mp3"),
   "-af", "loudnorm=I=-13:TP=-1.5:LRA=11", "-ar", "44100", "-ac", "1", "-b:a", "128k", join(tmp, "cover.mp3")],
  "ffmpeg cover audio"
);

// ─── 3. Image 320x240, fond blanc, sans alpha (exigence Lunii) ────────────────
run(
  FFMPEG,
  ["-y", "-i", IMAGE_SRC,
   "-vf", "scale=320:240:force_original_aspect_ratio=decrease,pad=320:240:(ow-iw)/2:(oh-ih)/2:white,format=rgb24",
   join(tmp, "cover.png")],
  "ffmpeg image 320x240"
);

// ─── 4. Assets nommés par SHA1 (convention STUdio) ────────────────────────────
const assets = {};
for (const [key, file, ext] of [
  ["coverImage", "cover.png", ".png"],
  ["coverAudio", "cover.mp3", ".mp3"],
  ["recitAudio", "recit.mp3", ".mp3"],
]) {
  const buf = readFileSync(join(tmp, file));
  const name = sha1(buf) + ext;
  writeFileSync(join(tmp, "staging", "assets", name), buf);
  assets[key] = name;
}
copyFileSync(join(tmp, "cover.png"), join(tmp, "staging", "thumbnail.png"));

// ─── 5. story.json (format v1) ────────────────────────────────────────────────
const story = {
  format: "v1",
  title: "Tritri le Tricératops",
  description: "Fiche dino MaxPlay : nom, taille, régime, le savais-tu et récap. Audio ElevenLabs de l'encyclopédie dino de Max.",
  version: 1,
  nightModeAvailable: false,
  stageNodes: [
    {
      uuid: UUID_COVER,
      squareOne: true,
      name: "Cover Tritri",
      image: assets.coverImage,
      audio: assets.coverAudio,
      okTransition: { actionNode: "action-recit", optionIndex: 0 },
      homeTransition: null,
      controlSettings: { wheel: true, ok: true, home: false, pause: false, autoplay: false },
    },
    {
      uuid: UUID_RECIT,
      name: "Récit complet Tritri",
      image: null,
      audio: assets.recitAudio,
      okTransition: { actionNode: "action-cover", optionIndex: 0 },
      homeTransition: null,
      controlSettings: { wheel: false, ok: false, home: true, pause: true, autoplay: true },
    },
  ],
  actionNodes: [
    { id: "action-recit", name: "Vers le récit", options: [UUID_RECIT] },
    { id: "action-cover", name: "Retour accueil", options: [UUID_COVER] },
  ],
};
writeFileSync(join(tmp, "staging", "story.json"), JSON.stringify(story, null, 2));

// ─── 6. Zip via jar (entrées avec « / », contrairement à Compress-Archive) ────
const zipName = "maxplay-tritri-fiche-dino.zip";
run(JAR, ["-cfM", join(tmp, zipName), "-C", join(tmp, "staging"), "."], "jar zip");

// ─── 7. Dépôt dans la bibliothèque STUdio ─────────────────────────────────────
mkdirSync(LIBRARY, { recursive: true });
copyFileSync(join(tmp, zipName), join(LIBRARY, zipName));

console.log(`✅ Pack construit : ${join(LIBRARY, zipName)}`);
console.log(`   Assets : ${Object.entries(assets).map(([k, v]) => `${k}=${v}`).join(" · ")}`);
console.log(`   Ouvre http://localhost:8080 → le pack apparaît dans la bibliothèque locale.`);
