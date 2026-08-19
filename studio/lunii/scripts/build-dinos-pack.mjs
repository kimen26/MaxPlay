// Construit le pack Lunii « Les dinos de Max » au format Archive STUdio (.zip),
// menu à DEUX NIVEAUX (famille → dino), et le dépose dans la bibliothèque STUdio.
//
// Usage : bun studio/lunii/scripts/build-dinos-pack.mjs
// Prérequis : ffmpeg, JDK 17 (jar.exe), STUdio (pour visualiser).
//             + assets pré-générés via prepare-lunii-assets (noms-dino, recits-dino, menus).
//
// Navigation (logique validée Papa Yann 2026-06-16) :
//   Cover = Menu FAMILLES (squareOne, molette : 9 familles ; chaque cran DIT le nom savant)
//     --OK--> Menu DINOS de la famille (molette : les dinos ; chaque cran DIT juste le nom du dino)
//       --OK--> Fiche complète du dino (4 blocs collés : nom+taille+régime+funfact — récap exclu du flux linéaire, EP-D-30)
//         --fin (autoplay)--> retour au menu DINOS de sa famille
//
// 70 dinos, 11 familles (2026-08-02 : +19 — 62 + mammifères/oiseaux une fois leurs menus produits).
// EMBALLE l'audio déjà canon (règle d'or Lunii — aucun TTS ici, sauf accroches menu/noms validées).
// Audio puisé dans studio/lunii/assets/ (pré-généré), images paleoart (gris auto).

import { createHash } from "crypto";
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { spawnSync } from "child_process";

const ROOT = "c:/ProjetsPerso/Claude_Projects/MaxPlay";
// Photos dino : paleoart canon (site/img/dinos/paleoart/<Nom>.jpg).
// NB : avant 2026-08, les photos web vivaient à la racine de site/img/dinos en .png
// (répertoire depuis réorganisé en sous-dossiers — d'où ce chemin).
const IMG_WEB = join(ROOT, "site/img/dinos/paleoart");
const ASSETS = join(ROOT, "studio/lunii/assets");
const A_NOMS = join(ASSETS, "audio/noms-dino");
const A_RECITS = join(ASSETS, "audio/recits-dino");
const A_MENUS = join(ASSETS, "audio/menus");
// Images Lunii FOURNIES par Papa Yann (skill dino-images-lunii) — déjà 320x240 gris, sans texte.
const IMG_LUNII_FAM = join(ROOT, "studio/dino/content/lunii/familles");
const A_IMG_DINO = join(ASSETS, "images/dinos"); // images dino Lunii (à venir) — fallback photo web sinon
// Mapping clé de famille → fichier image fourni (familles/NN-*.png)
const FAM_IMG = {
  trex: "01-theropodes.png", cou_long: "02-sauropodes.png", arme: "03-thyreophores.png",
  cornu: "04-ceratopsiens.png", bec: "05-ornithopodes.png", raptor: "06-dromaeosaures.png",
  pterosaures: "07-pterosaures.png", enaliosaures: "08-enaliosaures.png", volant: "09-avant-les-dinos.png",
  mammiferes: "10-mammiferes.png", oiseaux: "11-oiseaux.png",
};
const COVER_IMG = join(IMG_LUNII_FAM, "00-cover-toutes-familles.png");
const FFMPEG =
  "C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";
const JAR = "C:/Program Files/Eclipse Adoptium/jdk-17.0.19.10-hotspot/bin/jar.exe";
const FONT = "C\\:/Windows/Fonts/arialbd.ttf";
const LIBRARY = join(homedir(), ".studio", "library");

// Mode test : DINOS_JSON=…test10.json → pack séparé (nom de fichier + UUID distincts)
const TEST_MODE = !!process.env.DINOS_JSON && /test/i.test(process.env.DINOS_JSON);
const UUID_COVER = TEST_MODE
  ? "3f0a2b3c-4d5e-6f70-8a91-b2c3d4e5f703"
  : "3f0a2b3c-4d5e-6f70-8a91-b2c3d4e5f603";

// 9 familles dans l'ordre de la molette. menu = accroche pré-générée (assets/audio/menus).
// emblem = slug du dino dont la photo sert de carton famille (fallback si pas d'image fournie).
const FAMILLES = [
  { key: "trex",         menu: "menu-fam-theropodes.mp3",   titre: "Theropodes",   color: "0xc0392b", emblem: "tyrannosaurus", uuid: "b2000000-0000-4000-8000-000000000001" },
  { key: "cou_long",     menu: "menu-fam-sauropodes.mp3",   titre: "Sauropodes",   color: "0x27ae60", emblem: "brachiosaurus", uuid: "b2000000-0000-4000-8000-000000000002" },
  { key: "cornu",        menu: "menu-fam-ceratopsiens.mp3", titre: "Ceratopsiens", color: "0xf39c12", emblem: "triceratops",   uuid: "b2000000-0000-4000-8000-000000000003" },
  { key: "arme",         menu: "menu-fam-thyreophores.mp3", titre: "Thyreophores", color: "0x7f8c8d", emblem: "stegosaurus",   uuid: "b2000000-0000-4000-8000-000000000004" },
  { key: "bec",          menu: "menu-fam-ornithopodes.mp3", titre: "Ornithopodes", color: "0x8e44ad", emblem: "parasaurolophus", uuid: "b2000000-0000-4000-8000-000000000005" },
  { key: "raptor",       menu: "menu-fam-dromeosaures.mp3", titre: "Dromeosaures", color: "0xe67e22", emblem: "velociraptor",  uuid: "b2000000-0000-4000-8000-000000000006" },
  { key: "pterosaures",  menu: "menu-fam-pterosaures.mp3",  titre: "Pterosaures",  color: "0x2980b9", emblem: "pteranodon",    uuid: "b2000000-0000-4000-8000-000000000007" },
  { key: "enaliosaures", menu: "menu-fam-enaliosaures.mp3", titre: "Enaliosaures", color: "0x16607a", emblem: "mosasaurus",    uuid: "b2000000-0000-4000-8000-000000000008" },
  { key: "volant",       menu: "menu-fam-avant-dinos.mp3",  titre: "Avant les dinos", color: "0x8e6e3c", emblem: "dimetrodon", uuid: "b2000000-0000-4000-8000-000000000009" },
  { key: "mammiferes",   menu: "menu-fam-mammiferes.mp3",   titre: "Mammiferes",   color: "0x8d6e63", emblem: "mammuthus",    uuid: "b2000000-0000-4000-8000-000000000010" },
  { key: "oiseaux",      menu: "menu-fam-oiseaux.mp3",      titre: "Oiseaux",      color: "0xd68910", emblem: "titanis",      uuid: "b2000000-0000-4000-8000-000000000011" },
];

const TITLE = TEST_MODE ? "Les dinos de Max (TEST)" : "Les dinos de Max";
const DESC = "Choisis une famille (la molette dit son nom), puis ton dino. Il te raconte tout : nom, taille, ce qu'il mange, un secret et un resume. Encyclopedie de Max.";
const SALT = TEST_MODE ? "test:" : ""; // sel UUID distinct pour ne pas collisionner avec le pack complet

function run(cmd, args, label) {
  const r = spawnSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (r.status !== 0) throw new Error(`${label} a échoué (exit ${r.status}) : ${r.stderr?.toString().slice(-400)}`);
}
function sha1(buf) { return createHash("sha1").update(buf).digest("hex"); }

// ─── Charge la liste des dinos (slug, famille, nom d'affichage) ───────────────
// DINOS_JSON permet un sous-ensemble test (ex. c:/tmp/dinos-test10.json).
const DINOS_SRC = process.env.DINOS_JSON || "c:/tmp/dinos70.json";
const DINOS = JSON.parse(readFileSync(DINOS_SRC, "utf8"));

// En mode test, re-dériver les UUID de famille pour ne pas collisionner avec le pack complet
if (TEST_MODE) for (const f of FAMILLES) {
  const h = createHash("sha1").update(`test:fam:${f.key}`).digest("hex");
  f.uuid = `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
}
const dinosByFam = {};
for (const d of DINOS) (dinosByFam[d.fam] = dinosByFam[d.fam] || []).push(d);

const tmp = join(ROOT, "studio/lunii/.build-dinos");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(join(tmp, "staging", "assets"), { recursive: true });

function addAsset(srcPath, ext) {
  const buf = readFileSync(srcPath);
  const name = sha1(buf) + ext;
  writeFileSync(join(tmp, "staging", "assets", name), buf);
  return name;
}

// Masterise un audio pour la boîte : -13 LUFS / TP -1.5 dB.
// Les packs du commerce sont masterisés à ≈ -13 LUFS (mesuré sur Suzanne et Gaston) alors
// que loudnorm sans paramètre vise -24 (norme TV) → nos histoires sonnaient ~11 dB trop bas
// (constat Papa Yann 2026-08-04). La masterisation se fait ICI, au packaging : le canon web
// (site/audio) n'est pas touché.
function masterAudio(srcPath, outName) {
  run(FFMPEG, ["-y", "-i", srcPath,
    "-af", "loudnorm=I=-13:TP=-1.5:LRA=11", "-ar", "44100", "-ac", "1", "-b:a", "128k", join(tmp, outName)], `master ${outName}`);
  return addAsset(join(tmp, outName), ".mp3");
}

// Image 320x240 : 1) image Lunii fournie (gardée telle quelle, fond noir = contraste Lunii)
//                 2) sinon photo web en gris + bandeau  3) sinon carton couleur
// Pad NOIR (pas blanc) pour rester cohérent avec le fond sombre des emblèmes fournis.
function buildImage(opts, outPath) {
  const { provided, webSlug, label, color } = opts;
  if (provided && existsSync(provided)) {
    run(FFMPEG, ["-y", "-i", provided,
      "-vf", "scale=320:240:force_original_aspect_ratio=decrease,pad=320:240:(ow-iw)/2:(oh-ih)/2:black,format=rgb24",
      join(tmp, outPath)], `img fournie ${outPath}`);
    return;
  }
  const web = webSlug ? join(IMG_WEB, webSlug.charAt(0).toUpperCase() + webSlug.slice(1) + ".jpg") : null;
  if (web && existsSync(web)) {
    run(FFMPEG, ["-y", "-i", web,
      "-vf", "scale=320:240:force_original_aspect_ratio=decrease,pad=320:240:(ow-iw)/2:(oh-ih)/2:black,format=gray," +
             `drawbox=x=0:y=200:w=320:h=40:color=black@0.55:t=fill,` +
             `drawtext=text='${label}':fontfile='${FONT}':fontcolor=white:fontsize=24:x=(w-text_w)/2:y=207,format=rgb24`,
      join(tmp, outPath)], `img web gris ${outPath}`);
    return;
  }
  // carton couleur (placeholder en attendant l'image fournie)
  run(FFMPEG, ["-y", "-f", "lavfi", "-i", `color=c=${color}:s=320x240`,
    "-vf", `drawtext=text='${label}':fontfile='${FONT}':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=(h-text_h)/2,format=gray,format=rgb24`,
    "-frames:v", "1", join(tmp, outPath)], `carton ${outPath}`);
}

// ─── 0. Vérifs : assets audio requis ──────────────────────────────────────────
const required = [FFMPEG, JAR, join(A_MENUS, "menu-cover-dinos.mp3")];
for (const f of FAMILLES) required.push(join(A_MENUS, f.menu));
for (const d of DINOS) { required.push(join(A_NOMS, `nom-${d.slug}.mp3`)); required.push(join(A_RECITS, `${d.slug}.mp3`)); }
for (const f of required) if (!existsSync(f)) throw new Error(`Asset requis introuvable : ${f}`);

const assets = {};

// ─── 1. Cover (= menu familles) : image scène de groupe fournie + annonce ─────
buildImage({ provided: COVER_IMG, webSlug: null, label: "Les dinos de Max", color: "0x4a235a" }, "cover.png");
assets.coverImage = addAsset(join(tmp, "cover.png"), ".png");
assets.coverAudio = masterAudio(join(A_MENUS, "menu-cover-dinos.mp3"), "cover-audio.mp3");
writeFileSync(join(tmp, "staging", "thumbnail.png"), readFileSync(join(tmp, "cover.png")));

const stageNodes = [];
const actionNodes = [];

// Cover = Menu FAMILLES (squareOne + wheel) — la molette parcourt les 9 familles
// home:true + homeTransition:null → le bouton maison SORT du pack vers la bibliothèque Lunii.
// (home:false bloquait la sortie une fois revenu ici — cf. LESSONS-MOTEUR / discussion #191.)
stageNodes.push({
  uuid: UUID_COVER, squareOne: true, name: "Menu familles",
  image: assets.coverImage, audio: assets.coverAudio,
  okTransition: { actionNode: "action-into-famille", optionIndex: 0 },
  homeTransition: null,
  controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
});

// ─── 2. Par famille : stage d'entrée (accroche) → sous-menu dinos → fiches ────
// On ne garde que les familles peuplées (utile en mode test, et robuste en général).
const FAMILLES_ACTIVES = FAMILLES.filter((f) => (dinosByFam[f.key] || []).length > 0);
for (const fam of FAMILLES_ACTIVES) {
  const list = dinosByFam[fam.key] || [];
  // image carton famille = emblème Lunii fourni (charte : gris uni, sans texte) ; fallback photo web sinon
  const famProvided = FAM_IMG[fam.key] ? join(IMG_LUNII_FAM, FAM_IMG[fam.key]) : null;
  buildImage({ provided: famProvided, webSlug: fam.emblem, label: fam.titre, color: fam.color }, `fam-${fam.key}.png`);
  const famImg = addAsset(join(tmp, `fam-${fam.key}.png`), ".png");
  const famAudio = masterAudio(join(A_MENUS, fam.menu), `fam-audio-${fam.key}.mp3`); // accroche [excited] nom savant

  // stage d'entrée famille : on entend l'accroche, molette = ses dinos
  stageNodes.push({
    uuid: fam.uuid, name: `Famille ${fam.titre}`,
    image: famImg, audio: famAudio,
    okTransition: { actionNode: `action-dinos-${fam.key}`, optionIndex: 0 },
    homeTransition: null,
    controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
  });

  for (const d of list) {
    // 2 stages par dino : (a) option molette (dit le NOM)  (b) fiche complète (OK)
    const uuidNom = sha1(`${SALT}dino-nom:${d.slug}`).slice(0, 8) + "-0000-4000-8000-" + sha1(`${SALT}nom:${d.slug}`).slice(0, 12);
    const uuidFiche = sha1(`${SALT}dino-fiche:${d.slug}`).slice(0, 8) + "-0000-4000-8000-" + sha1(`${SALT}fiche:${d.slug}`).slice(0, 12);

    // image dino (Lunii fournie sinon photo web gris + bandeau nom)
    buildImage({ provided: join(A_IMG_DINO, `${d.slug}.png`), webSlug: d.slug, label: d.name.replace(/\s*\(.*\)/, ""), color: fam.color }, `dino-${d.slug}.png`);
    const dinoImg = addAsset(join(tmp, `dino-${d.slug}.png`), ".png");
    const nomAudio = masterAudio(join(A_NOMS, `nom-${d.slug}.mp3`), `nom-${d.slug}.mp3`);   // nom sec [excited]
    const ficheAudio = masterAudio(join(A_RECITS, `${d.slug}.mp3`), `fiche-${d.slug}.mp3`); // 5 blocs collés

    // (a) option molette : DIT le nom, OK → fiche
    stageNodes.push({
      uuid: uuidNom, name: `Nom ${d.name}`,
      image: dinoImg, audio: nomAudio,
      okTransition: { actionNode: `action-fiche-${d.slug}`, optionIndex: 0 },
      homeTransition: null,
      controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
    });
    // (b) fiche complète : autoplay, fin → retour sous-menu dinos de la famille
    // ⚠️ ok:true OBLIGATOIRE sur un node autoplay : sinon okTransition ignorée à la fin
    //    → la fiche reboucle + image figée (piège issue #100 symétrique, cf. LESSONS-MOTEUR).
    stageNodes.push({
      uuid: uuidFiche, name: `Fiche ${d.name}`,
      image: dinoImg, audio: ficheAudio,
      okTransition: { actionNode: `action-back-${fam.key}`, optionIndex: 0 },
      homeTransition: null,
      controlSettings: { wheel: false, ok: true, home: true, pause: true, autoplay: true },
    });
    d._uuidNom = uuidNom;
    actionNodes.push({ id: `action-fiche-${d.slug}`, name: `Fiche ${d.name}`, options: [uuidFiche] });
  }

  // sous-menu dinos : la molette parcourt les stages "nom" des dinos de la famille
  actionNodes.push({ id: `action-dinos-${fam.key}`, name: `Dinos ${fam.titre}`, options: list.map((d) => d._uuidNom) });
  actionNodes.push({ id: `action-back-${fam.key}`, name: `Retour ${fam.titre}`, options: [fam.uuid] });
}

// menu familles (molette niveau 1) → les 9 stages d'entrée famille
actionNodes.push({ id: "action-into-famille", name: "Choix famille", options: FAMILLES_ACTIVES.map((f) => f.uuid) });

// ─── 3. Remap id actionNode lisibles → UUID (format canonique STUdio) ─────────
function idToUuid(id) {
  const h = sha1(`${SALT}dinos-action:${id}`);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
}
const ID_MAP = {};
for (const a of actionNodes) ID_MAP[a.id] = idToUuid(a.id);
for (const a of actionNodes) { a.id = ID_MAP[a.id]; delete a.name; }
for (const n of stageNodes) {
  for (const t of [n.okTransition, n.homeTransition]) if (t && ID_MAP[t.actionNode]) t.actionNode = ID_MAP[t.actionNode];
  delete n.name;
}

const story = { format: "v1", title: TITLE, description: DESC, version: 1, nightModeAvailable: false, stageNodes, actionNodes };
writeFileSync(join(tmp, "staging", "story.json"), JSON.stringify(story, null, 2));

// ─── 4. Zip + dépôt ───────────────────────────────────────────────────────────
const zipName = TEST_MODE ? "maxplay-dinos-de-max-TEST.zip" : "maxplay-dinos-de-max.zip";
run(JAR, ["-cfM", join(tmp, zipName), "-C", join(tmp, "staging"), "."], "jar zip");
mkdirSync(LIBRARY, { recursive: true });
writeFileSync(join(LIBRARY, zipName), readFileSync(join(tmp, zipName)));

const nbDinos = DINOS.length;
console.log(`✅ Pack construit : ${join(LIBRARY, zipName)}`);
console.log(`   ${FAMILLES_ACTIVES.length} familles · ${nbDinos} dinos · ${stageNodes.length} stages.`);
console.log(`   Nav : famille (accroche) → molette dino (dit le nom) → OK → fiche complète.`);
console.log(`   Ouvre http://localhost:8080 → bibliothèque locale.`);
