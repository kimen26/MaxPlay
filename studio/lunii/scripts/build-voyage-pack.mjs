// Construit le pack Lunii « Le voyage des dinosaures » au format Archive STUdio (.zip)
// et le dépose dans la bibliothèque locale STUdio (%UserProfile%\.studio\library).
//
// Usage : bun studio/lunii/scripts/build-voyage-pack.mjs
// Prérequis : ffmpeg (winget Gyan.FFmpeg), JDK 17 (jar.exe), STUdio (pour visualiser).
//
// Structure du pack (format story.json v1, cf. ArchiveStoryPackWriter.java) :
//   Cover/Menu (image + annonce voyage, wheel = choisir l'époque)
//     --OK sur option molette--> Récit de l'époque
//       --fin (autoplay)--> retour au Cover/Menu
//
// Les 8 récits existent déjà (voix Narratrice F + Wex), produits par le pôle DINO.
// Les images existent déjà (320×240 fond noir, skill dino-images-lunii).
// Ce script EMBALLE, il ne crée pas de contenu (règle d'or Lunii).

import { createHash } from "crypto";
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync, copyFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { spawnSync } from "child_process";

const ROOT = "c:/ProjetsPerso/Claude_Projects/MaxPlay";
const AUDIO_DIR = join(ROOT, "site/audio/dinos/fr"); // récits + menus déplacés sous fr/ (canon multilingue)
const IMG_DIR = join(ROOT, "studio/dino/content/lunii/voyage");
const FFMPEG =
  "C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";
const JAR = "C:/Program Files/Eclipse Adoptium/jdk-17.0.19.10-hotspot/bin/jar.exe";
const LIBRARY = join(homedir(), ".studio", "library");

// UUIDs FIGÉS : un rebuild produit le même pack (pas de doublon côté STUdio/Lunii)
const UUID_COVER = "1f0a2b3c-4d5e-6f70-8a91-b2c3d4e5f601";

// Les 8 époques DANS L'ORDRE CHRONOLOGIQUE (numéro = position molette)
// Ordre corrigé : Intro → Trias → Jurassique → Crétacé → Extinction → Mammifères → Glace → Paléontologie
// UUIDs FIGÉS par époque (un rebuild produit le même pack, pas de doublon)
const EPOQUES = [
  { n: 1, key: "intro",          titre: "Le depart",       audio: "recit-intro.mp3",           image: "ep-intro.png",         uuid: "a1000000-0000-4000-8000-000000000001" },
  { n: 2, key: "trias",          titre: "Le Trias",        audio: "recit-trias.mp3",           image: "ep-trias.png",         uuid: "a1000000-0000-4000-8000-000000000002" },
  { n: 3, key: "jurassique",     titre: "Le Jurassique",   audio: "recit-jurassique.mp3",      image: "ep-jurassique.png",    uuid: "a1000000-0000-4000-8000-000000000003" },
  { n: 4, key: "cretace",        titre: "Le Cretace",      audio: "recit-cretace.mp3",         image: "ep-cretace.png",       uuid: "a1000000-0000-4000-8000-000000000004" },
  { n: 5, key: "extinction",     titre: "Extinction",      audio: "recit-extinction.mp3",      image: "ep-extinction.png",    uuid: "a1000000-0000-4000-8000-000000000005" },
  { n: 6, key: "mammiferes",     titre: "Les mammiferes",  audio: "recit-mammiferes.mp3",      image: "ep-mammiferes.png",    uuid: "a1000000-0000-4000-8000-000000000006" },
  { n: 7, key: "glace-mammouth", titre: "La glace",        audio: "recit-glace-mammouth.mp3",  image: "ep-glace-mammouth.png", uuid: "a1000000-0000-4000-8000-000000000007" },
  { n: 8, key: "paleo",          titre: "La paleontologie", audio: "recit-paleo.mp3",           image: "ep-paleo.png",         uuid: "a1000000-0000-4000-8000-000000000008" },
];

const TITLE = "Le voyage des dinosaures";
const DESC = "8 recits d'epoque dans l'ordre : du Trias jusqu'aux mammouths. Tourne la molette pour choisir ton epoque. Voix de l'encyclopedie dino de Max (Narratrice + Wex).";

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
for (const e of EPOQUES) {
  const a = join(AUDIO_DIR, e.audio);
  const i = join(IMG_DIR, e.image);
  const t = join(AUDIO_DIR, `menu-ep-${e.key}.mp3`); // titre court (étiquette menu)
  if (!existsSync(a)) throw new Error(`Audio introuvable : ${a}`);
  if (!existsSync(i)) throw new Error(`Image introuvable : ${i}`);
  if (!existsSync(t)) throw new Error(`Titre court introuvable : ${t}`);
}
const coverAudio = join(AUDIO_DIR, "menu-voyage.mp3");
if (!existsSync(coverAudio)) throw new Error(`Audio cover introuvable : ${coverAudio}`);

const tmp = join(ROOT, "studio/lunii/.build-voyage");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(join(tmp, "staging", "assets"), { recursive: true });

const assets = {}; // clé logique -> nom sha1 dans assets/
function addAsset(srcPath, ext) {
  const buf = readFileSync(srcPath);
  const name = sha1(buf) + ext;
  writeFileSync(join(tmp, "staging", "assets", name), buf);
  return name;
}

// ─── 1. Cover : image évolution + annonce voyage ──────────────────────────────────
// Image = cover-evolution.png (évolution complète), Audio = menu-voyage.mp3
const coverImgPath = join(IMG_DIR, "cover-evolution.png");
run(FFMPEG, ["-y", "-i", coverAudio,
  "-af", "adelay=300|300,loudnorm=I=-13:TP=-1.5:LRA=11", "-ar", "44100", "-ac", "1", "-b:a", "128k", join(tmp, "cover.mp3")], "cover voyage audio");
assets.coverImage = addAsset(coverImgPath, ".png");
assets.coverAudio = addAsset(join(tmp, "cover.mp3"), ".mp3");

// ─── 2. Pour chaque époque : image + récit (pad 300ms + loudnorm) ─────────────
for (const e of EPOQUES) {
  const imgPath = join(IMG_DIR, e.image);
  const audioPath = join(AUDIO_DIR, e.audio);
  run(FFMPEG, ["-y", "-i", audioPath,
    "-af", "adelay=300|300,loudnorm=I=-13:TP=-1.5:LRA=11", "-ar", "44100", "-ac", "1", "-b:a", "128k", join(tmp, `ep-${e.key}.mp3`)], `recit ${e.key}`);
  e.imgAsset = addAsset(imgPath, ".png");
  e.audioAsset = addAsset(join(tmp, `ep-${e.key}.mp3`), ".mp3");
  // étiquette de menu (niveau 2) : titre court parlé, masterisé à -13 LUFS comme les récits, même image que le récit
  run(FFMPEG, ["-y", "-i", join(AUDIO_DIR, `menu-ep-${e.key}.mp3`),
    "-af", "loudnorm=I=-13:TP=-1.5:LRA=11", "-ar", "44100", "-ac", "1", "-b:a", "128k", join(tmp, `menu-ep-${e.key}.mp3`)], `menu ${e.key}`);
  e.titleAsset = addAsset(join(tmp, `menu-ep-${e.key}.mp3`), ".mp3");
  e.uuidTitle = `a2000000-0000-4000-8000-00000000000${e.n}`;
}

// thumbnail du pack = la cover image
writeFileSync(join(tmp, "staging", "thumbnail.png"), readFileSync(coverImgPath));

// ─── 3. story.json (format v1) ────────────────────────────────────────────────
// Cover/Menu = UN SEUL stage (fusion : pas de double-OK ressenti)
//   wheel=true → molette parcourt les 8 options
//   ok=true → OK entre dans l'époque sélectionnée
//   home=true + homeTransition:null → bouton maison sort du pack
//   autoplay=false → l'audio de la cover se joue une fois, on attend l'action
//
// Récit : autoplay=true → à la fin, okTransition déclenchée automatiquement
//   ok=true OBLIGATOIRE (sinon okTransition ignorée → reboucle + image figée)
//   home=true + homeTransition → retour menu
//   wheel=false → pas de choix pendant le récit

// NAVIGATION 2 NIVEAUX (fix 2026-06-19 : avant, les options du menu étaient les récits
// complets eux-mêmes → parcourir la molette lançait le récit direct. Maintenant :
//   MENU (molette) → 8 ÉTIQUETTES (titre court 1-2s) → OK → RÉCIT complet
//   Parcourir le menu ne joue QUE le titre court (pas le récit). Lecture = au clic.
//   Étiquettes : autoplay=false (comme les options de menu du pack dinos) → pas d'auto-lecture.
const stageNodes = [
  {
    uuid: UUID_COVER,
    squareOne: true,
    name: "Menu epoques",
    image: assets.coverImage,
    audio: assets.coverAudio,
    okTransition: { actionNode: "action-menu", optionIndex: 0 },
    homeTransition: null, // home:true + null = sortir du pack vers biblio
    controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
  },
];

for (const e of EPOQUES) {
  // ÉTIQUETTE (option de menu) : image époque + titre court parlé, la molette parcourt les étiquettes
  stageNodes.push({
    uuid: e.uuidTitle,
    name: `Etiquette ${e.n} - ${e.titre}`,
    image: e.imgAsset,
    audio: e.titleAsset,
    okTransition: { actionNode: `action-recit-${e.key}`, optionIndex: 0 }, // OK → lance le récit
    homeTransition: null,     // maison = sortie du pack (moteur natif, pas de retour forcé au menu)
    controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
  });
  // RÉCIT complet : lecture au clic, fin → retour menu
  stageNodes.push({
    uuid: e.uuid,
    name: `Recit ${e.n} - ${e.titre}`,
    image: e.imgAsset,
    audio: e.audioAsset,
    okTransition: { actionNode: "action-back-menu", optionIndex: 0 },       // fin (autoplay) / OK → retour menu
    homeTransition: null,      // maison = sortie du pack (moteur natif, pas de retour forcé au menu)
    controlSettings: { wheel: false, ok: true, home: true, pause: true, autoplay: true },
  });
}

const actionNodes = [
  { id: "action-back-menu", name: "Retour menu", options: [UUID_COVER] },
  // Le menu (molette) parcourt les 8 ÉTIQUETTES (titres courts), pas les récits
  { id: "action-menu", name: "Choix epoque", options: EPOQUES.map((e) => e.uuidTitle) },
  // chaque étiquette → son récit
  ...EPOQUES.map((e) => ({ id: `action-recit-${e.key}`, name: `Recit ${e.key}`, options: [e.uuid] })),
];

// ─── Remap des id d'actionNode lisibles → UUID stables ────────────────────────
// L'éditeur web STUdio EXIGE que actionNode.id soit un UUID
function idToUuid(id) {
  const h = sha1(`voyage-action:${id}`);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
}
const ID_MAP = {};
for (const a of actionNodes) ID_MAP[a.id] = idToUuid(a.id);
for (const a of actionNodes) { a.id = ID_MAP[a.id]; delete a.name; }
for (const n of stageNodes) {
  for (const t of [n.okTransition, n.homeTransition]) {
    if (t && ID_MAP[t.actionNode]) t.actionNode = ID_MAP[t.actionNode];
  }
  delete n.name;
}

const story = {
  format: "v1",
  title: TITLE,
  description: DESC,
  version: 1,
  nightModeAvailable: false,
  stageNodes,
  actionNodes,
};
writeFileSync(join(tmp, "staging", "story.json"), JSON.stringify(story, null, 2));

// ─── 4. Zip via jar ───────────────────────────────────────────────────────────
const zipName = "maxplay-voyage-dinosaures.zip";
run(JAR, ["-cfM", join(tmp, zipName), "-C", join(tmp, "staging"), "."], "jar zip");

// ─── 5. Dépôt dans la bibliothèque STUdio ─────────────────────────────────────
mkdirSync(LIBRARY, { recursive: true });
writeFileSync(join(LIBRARY, zipName), readFileSync(join(tmp, zipName)));

console.log(`✅ Pack construit : ${join(LIBRARY, zipName)}`);
console.log(`   ${EPOQUES.length} récits chronologiques + cover/menu fusionné.`);
console.log(`   Images : vraies images 320×240 fond noir (skill dino-images-lunii).`);
console.log(`   Audio : pad 300ms + loudnorm appliqué.`);
console.log(`   Ouvre http://localhost:8080 → le pack apparaît dans la bibliothèque locale.`);
