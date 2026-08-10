// Construit le pack Lunii « Histoires pour dodo » au format Archive STUdio (.zip)
// et le dépose dans la bibliothèque locale STUdio (%UserProfile%\.studio\library).
//
// Source = inbox (MP3 téléchargés par Papa Yann, chaîne « Histoires et Contes »).
// Lunii EMBALLE, ne crée pas de contenu (règle d'or) : les intros YouTube (~12,6 s de
// jingle, détecté par fingerprint chromaprint 2026-08-02) ont été coupées en amont,
// les récits sont déjà pad 300 ms + loudnorm dans assets/audio/histoires-dodo/.
// Titres de menu = TTS [softly] narratrice_f (pack pour s'endormir).
//
// Usage : node studio/lunii/scripts/build-dodo-pack.mjs
// Prérequis : ffmpeg (winget Gyan.FFmpeg), JDK 17 (jar.exe), STUdio (pour visualiser).
//
// Structure (story.json v1 — pattern validé vraie boîte, fix BUG-5) :
//   Cover/Menu fusionné (squareOne + wheel : la molette DIT le titre de chaque histoire)
//     --OK--> Récit complet (autoplay) --fin--> retour Cover/Menu
//   home = sortir du pack (homeTransition:null partout).

import { createHash } from "crypto";
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { spawnSync } from "child_process";

const ROOT = "c:/ProjetsPerso/Claude_Projects/MaxPlay";
const AUDIO_DIR = join(ROOT, "studio/lunii/assets/audio/histoires-dodo");
const FFMPEG =
  "C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";
const JAR = "C:/Program Files/Eclipse Adoptium/jdk-17.0.19.10-hotspot/bin/jar.exe";
const FONT = "C\\:/Windows/Fonts/arialbd.ttf";
const LIBRARY = join(homedir(), ".studio", "library");

// UUIDs FIGÉS (préfixe 5d0a/d5*/d6* — distinct de voyage 1f0a/a1*, dinos 3f0a/b2*, tritri e7c1)
const UUID_COVER = "5d0a2b3c-4d5e-6f70-8a91-b2c3d4e5f605";

// Les 12 histoires dans l'ordre de la molette (douceurs d'abord, « Silence » en dernier)
const HISTOIRES = [
  { n: 1,  slug: "petite-fille",   titre: "Petite fille et le loup",                    color: "0x6c5b9e" },
  { n: 2,  slug: "loup-livre",     titre: "Le loup tombe du livre",                     color: "0x4a6fa5" },
  { n: 3,  slug: "ecole-loups",    titre: "L'ecole des loups",                          color: "0x5b7f5e" },
  { n: 4,  slug: "secret-foret",   titre: "Le secret de la foret",                      color: "0x2e6e5e" },
  { n: 5,  slug: "gentillesse",    titre: "La gentillesse me rend plus fort",           color: "0xb07d4f" },
  { n: 6,  slug: "dispute",        titre: "La dispute",                                 color: "0xa05252" },
  { n: 7,  slug: "bisous",         titre: "J'aime pas les bisous",                      color: "0xb05f7a" },
  { n: 8,  slug: "arc-en-ciel",    titre: "Arc-en-Ciel, le plus beau poisson des oceans", color: "0x3e7ca8" },
  { n: 9,  slug: "adam",           titre: "Adam le dinosaure",                          color: "0x5e8a4a" },
  { n: 10, slug: "aurore",         titre: "Aurore, chasseuse de dinosaures",            color: "0x8a6a3a" },
  { n: 11, slug: "eleonore",       titre: "Eleonore et le dinosaure",                   color: "0x7a5a8e" },
  { n: 12, slug: "silence-dormir", titre: "Silence, je veux dormir",                    color: "0x3a4a7a" },
];

const TITLE = "Histoires pour dodo";
const DESC = "12 histoires douces pour s'endormir. Tourne la molette pour choisir ton histoire, OK pour l'ecouter. Titres dits a voix douce.";

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
const coverAudio = join(AUDIO_DIR, "titres", "cover-dodo.mp3");
for (const f of [FFMPEG, JAR, coverAudio]) if (!existsSync(f)) throw new Error(`Introuvable : ${f}`);
for (const h of HISTOIRES) {
  for (const p of [join(AUDIO_DIR, `${h.slug}.mp3`), join(AUDIO_DIR, "titres", `titre-${h.slug}.mp3`)]) {
    if (!existsSync(p)) throw new Error(`Audio introuvable : ${p}`);
  }
}

const tmp = join(ROOT, "studio/lunii/.build-dodo");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(join(tmp, "staging", "assets"), { recursive: true });

const assets = {}; // clé logique -> nom sha1 dans assets/
function addAsset(srcPath, ext) {
  const buf = readFileSync(srcPath);
  const name = sha1(buf) + ext;
  writeFileSync(join(tmp, "staging", "assets", name), buf);
  return name;
}

// Masterise un audio pour la boîte : -13 LUFS / TP -1.5 dB (aligné sur les packs du commerce,
// mesurés à -13 LUFS — le loudnorm d'origine visait -24 et sonnait ~11 dB trop bas, 2026-08-04).
function masterAudio(srcPath, outName) {
  run(FFMPEG, ["-y", "-i", srcPath,
    "-af", "loudnorm=I=-13:TP=-1.5:LRA=11", "-ar", "44100", "-ac", "1", "-b:a", "128k", join(tmp, outName)], `master ${outName}`);
  return addAsset(join(tmp, outName), ".mp3");
}

// Image 320x240 carton nuit : FOND NOIR + texte blanc, NIVEAUX DE GRIS natifs
// (l'écran Lunii est monochrome — demande Papa Yann 2026-08-02 : gris sur noir, pas de couleur)
function buildCarton(label, _color, outName) {
  // drawtext : wrap manuel sur 2 lignes si le titre est long
  const words = label.split(" ");
  let l1 = "", l2 = "";
  for (const w of words) { if ((l1 + " " + w).trim().length <= 22 && !l2) l1 = (l1 + " " + w).trim(); else l2 = (l2 + " " + w).trim(); }
  const y1 = l2 ? "95" : "110";
  const vf =
    `drawtext=text='${l1.replace(/'/g, "")}':fontfile='${FONT}':fontcolor=white:fontsize=26:x=(w-text_w)/2:y=${y1},` +
    (l2 ? `drawtext=text='${l2.replace(/'/g, "")}':fontfile='${FONT}':fontcolor=white:fontsize=26:x=(w-text_w)/2:y=135,` : "") +
    "format=gray";
  run(FFMPEG, ["-y", "-f", "lavfi", "-i", "color=c=black:s=320x240", "-vf", vf, "-frames:v", "1", join(tmp, outName)], `carton ${outName}`);
  return addAsset(join(tmp, outName), ".png");
}

// ─── 1. Cover/Menu : illustration ChatGPT si dispo, sinon carton nuit ─────────
// Illustrations 320x240 16 gris générées via gen-dodo-images.mjs (+ to-lunii.sh)
// dans assets/images/histoires-dodo/ : cover-lunii.png et <slug>-lunii.png.
const IMG_DIR = join(ROOT, "studio/lunii/assets/images/histoires-dodo");
function illustrationOrCarton(slug, titre, color, cartonName) {
  const illu = join(IMG_DIR, `${slug}-lunii.png`);
  if (existsSync(illu)) return addAsset(illu, ".png");
  return buildCarton(titre, color, cartonName);
}
assets.coverImage = illustrationOrCarton("cover", "Histoires pour dodo", "0x1b2a4a", "cover.png");
assets.coverAudio = masterAudio(coverAudio, "cover-dodo.mp3");
// thumbnail = l'asset cover choisi (illustration ou carton)
writeFileSync(join(tmp, "staging", "thumbnail.png"), readFileSync(join(tmp, "staging", "assets", assets.coverImage)));

// ─── 2. Pour chaque histoire : illustration/carton + récit + titre ────────────
for (const h of HISTOIRES) {
  h.imgAsset = illustrationOrCarton(h.slug, h.titre, h.color, `h-${h.slug}.png`);
  h.audioAsset = masterAudio(join(AUDIO_DIR, `${h.slug}.mp3`), `recit-${h.slug}.mp3`);          // récit (trim+pad) re-masterisé -13 LUFS
  h.titleAsset = masterAudio(join(AUDIO_DIR, "titres", `titre-${h.slug}.mp3`), `titre-${h.slug}.mp3`); // titre doux re-masterisé
  h.uuidTitle = `d5000000-0000-4000-8000-${String(h.n).padStart(12, "0")}`;
  h.uuid = `d6000000-0000-4000-8000-${String(h.n).padStart(12, "0")}`;
}

// ─── 3. story.json (format v1) — pattern validé vraie boîte (fix BUG-5) ───────
const stageNodes = [
  {
    uuid: UUID_COVER,
    squareOne: true,
    name: "Menu histoires",
    image: assets.coverImage,
    audio: assets.coverAudio,
    okTransition: { actionNode: "action-menu", optionIndex: 0 },
    homeTransition: null, // home:true + null = sortir du pack vers biblio
    controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
  },
];

for (const h of HISTOIRES) {
  // ÉTIQUETTE (option de menu) : carton + titre doux parlé ; la molette parcourt les étiquettes
  stageNodes.push({
    uuid: h.uuidTitle,
    name: `Etiquette ${h.n} - ${h.titre}`,
    image: h.imgAsset,
    audio: h.titleAsset,
    okTransition: { actionNode: `action-recit-${h.slug}`, optionIndex: 0 }, // OK → lance le récit
    homeTransition: null,
    controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
  });
  // RÉCIT : lecture au clic, fin → retour menu (ok:true OBLIGATOIRE sur autoplay)
  stageNodes.push({
    uuid: h.uuid,
    name: `Recit ${h.n} - ${h.titre}`,
    image: h.imgAsset,
    audio: h.audioAsset,
    okTransition: { actionNode: "action-back-menu", optionIndex: 0 },
    homeTransition: null,
    controlSettings: { wheel: false, ok: true, home: true, pause: true, autoplay: true },
  });
}

const actionNodes = [
  { id: "action-back-menu", name: "Retour menu", options: [UUID_COVER] },
  { id: "action-menu", name: "Choix histoire", options: HISTOIRES.map((h) => h.uuidTitle) },
  ...HISTOIRES.map((h) => ({ id: `action-recit-${h.slug}`, name: `Recit ${h.slug}`, options: [h.uuid] })),
];

// ─── Remap des id d'actionNode lisibles → UUID stables ────────────────────────
function idToUuid(id) {
  const h = sha1(`dodo-action:${id}`);
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
const zipName = "maxplay-histoires-dodo.zip";
run(JAR, ["-cfM", join(tmp, zipName), "-C", join(tmp, "staging"), "."], "jar zip");

// ─── 5. Dépôt dans la bibliothèque STUdio ─────────────────────────────────────
mkdirSync(LIBRARY, { recursive: true });
writeFileSync(join(LIBRARY, zipName), readFileSync(join(tmp, zipName)));

console.log(`✅ Pack construit : ${join(LIBRARY, zipName)}`);
console.log(`   ${HISTOIRES.length} histoires + cover/menu fusionné (titres dits à voix douce).`);
console.log(`   Ouvre http://localhost:8080 → bibliothèque locale.`);
