#!/usr/bin/env node
// Moteur UNIQUE de build des packs Lunii MaxPlay — remplace les 3 scripts
// build-{dinos,voyage,tritri}-pack.mjs (HO-R06, 2026-09-12).
//
// Usage :
//   node studio/lunii/scripts/build-pack.mjs <tritri|voyage|dinos> [--test]
//   node studio/lunii/scripts/build-pack.mjs --help
//
// Chaque pack est décrit par packs/<nom>.json (données) + une fonction de
// construction ci-dessous (la géométrie de navigation — menu 1 niveau, menu
// 2 niveaux chrono, menu 2 niveaux famille→dino — diffère trop d'un pack à
// l'autre pour être réduite à un JSON déclaratif sans un mini-moteur de
// règles ad hoc ; ça ajouterait une couche d'indirection pour 3 packs).
// Les helpers communs (ffmpeg/jar/sha1/story.json/purge) vivent dans
// scripts/lib/pack-common.mjs.
//
// Prérequis : ffmpeg (winget Gyan.FFmpeg), JDK 17 (jar.exe).
// Assets audio déjà canon (site/audio/dinos, studio/lunii/assets/audio) —
// ce script EMBALLE, il ne crée pas de contenu (règle d'or Lunii, CLAUDE.md pôle).

import { readFileSync, existsSync, writeFileSync, copyFileSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";
import {
  ROOT, FFMPEG, requireFiles, prepareStaging, addAsset, masterAudio, buildImage,
  writeStoryAndZip, idToUuid,
} from "./lib/pack-common.mjs";

function help() {
  console.log(`Usage : node build-pack.mjs <tritri|voyage|dinos> [--test]

  tritri   Pack "Tritri le Tricératops" (fiche unique, cover -> récit).
  voyage   Pack "Le voyage des dinosaures" (8 époques, menu chrono 2 niveaux).
  dinos    Pack "Les dinos de Max" (11 familles -> dinos, menu 2 niveaux).
           --test : sous-ensemble de dinos.json passé via DINOS_JSON, pack -TEST distinct.

Dépose le zip dans ~/.studio/library/ et purge studio/lunii/.build-<nom>/ après coup.`);
}

const args = process.argv.slice(2);
if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  help();
  process.exit(0);
}

const nomArg = args[0];
const TEST_MODE = args.includes("--test");

const BUILDERS = { tritri: buildTritri, voyage: buildVoyage, dinos: buildDinos };
if (!BUILDERS[nomArg]) {
  console.error(`Pack inconnu : "${nomArg}". Attendu : ${Object.keys(BUILDERS).join(", ")}.`);
  process.exit(1);
}

const cfg = JSON.parse(readFileSync(join(ROOT, "studio/lunii/packs", `${nomArg}.json`), "utf8"));
const dest = BUILDERS[nomArg](cfg, TEST_MODE);
console.log(`Pack construit : ${dest}`);
console.log(`Ouvre http://localhost:8080 -> le pack apparaît dans la bibliothèque locale.`);

function ffmpegConcat(concatFile, outPath) {
  const r = spawnSync(FFMPEG, ["-y", "-f", "concat", "-safe", "0", "-i", concatFile, outPath], { stdio: ["ignore", "pipe", "pipe"] });
  if (r.status !== 0) throw new Error(`ffmpeg concat a échoué : ${r.stderr?.toString().slice(-500)}`);
}

// ─────────────────────────────────────────────────────────────────────────
// TRITRI — cover (annonce nom) -> récit complet (5 blocs concat + loudnorm)
// ─────────────────────────────────────────────────────────────────────────
function buildTritri(cfg) {
  const audioDir = join(ROOT, cfg.audioDir);
  const imageSrc = join(ROOT, cfg.imageSrc);
  requireFiles([imageSrc, ...cfg.blocs.map((b) => join(audioDir, b))]);

  const tmp = prepareStaging("tritri");
  const assets = {};

  const concatList = cfg.blocs.map((b) => `file '${join(audioDir, b).replace(/\\/g, "/")}'`).join("\n");
  const concatFile = join(tmp, "concat.txt");
  writeFileSync(concatFile, concatList);
  ffmpegConcat(concatFile, join(tmp, "recit-brut.mp3"));
  assets.recitAudio = masterAudio(tmp, join(tmp, "recit-brut.mp3"), "recit.mp3");

  assets.coverAudio = masterAudio(tmp, join(audioDir, cfg.coverAudio), "cover-audio.mp3");
  const coverImgPath = buildImage(tmp, imageSrc, "cover.png", { pad: "white" });
  assets.coverImage = addAsset(tmp, coverImgPath, ".png");
  copyFileSync(coverImgPath, join(tmp, "staging", "thumbnail.png"));

  const stageNodes = [
    {
      uuid: cfg.uuidCover, squareOne: true, name: "Cover Tritri",
      image: assets.coverImage, audio: assets.coverAudio,
      okTransition: { actionNode: "action-recit", optionIndex: 0 },
      homeTransition: null,
      controlSettings: { wheel: true, ok: true, home: false, pause: false, autoplay: false },
    },
    {
      uuid: cfg.uuidRecit, name: "Récit complet Tritri",
      image: null, audio: assets.recitAudio,
      okTransition: { actionNode: "action-cover", optionIndex: 0 },
      homeTransition: null,
      controlSettings: { wheel: false, ok: false, home: true, pause: true, autoplay: true },
    },
  ];
  const actionNodes = [
    { id: "action-recit", name: "Vers le récit", options: [cfg.uuidRecit] },
    { id: "action-cover", name: "Retour accueil", options: [cfg.uuidCover] },
  ];

  return writeStoryAndZip(tmp, "tritri", {
    title: cfg.titre, description: cfg.description, stageNodes, actionNodes, zipName: cfg.zipName,
  });
}

// ─────────────────────────────────────────────────────────────────────────
// VOYAGE — menu chrono 2 niveaux : cover/menu -> étiquette époque -> récit
// ─────────────────────────────────────────────────────────────────────────
function buildVoyage(cfg) {
  const audioDir = join(ROOT, cfg.audioDir);
  const imgDir = join(ROOT, cfg.imgDir);
  const coverAudioSrc = join(audioDir, cfg.coverAudio);
  const coverImgSrc = join(imgDir, cfg.coverImage);
  requireFiles([coverAudioSrc, coverImgSrc]);
  for (const e of cfg.epoques) {
    requireFiles([join(audioDir, e.audio), join(imgDir, e.image), join(audioDir, `menu-ep-${e.key}.mp3`)]);
  }

  const tmp = prepareStaging("voyage");
  const assets = {};

  assets.coverAudio = masterAudio(tmp, coverAudioSrc, "cover.mp3");
  assets.coverImage = addAsset(tmp, coverImgSrc, ".png");
  copyFileSync(coverImgSrc, join(tmp, "staging", "thumbnail.png"));

  const stageNodes = [
    {
      uuid: cfg.uuidCover, squareOne: true, name: "Menu epoques",
      image: assets.coverImage, audio: assets.coverAudio,
      okTransition: { actionNode: "action-menu", optionIndex: 0 },
      homeTransition: null,
      controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
    },
  ];
  const actionNodes = [];

  for (const e of cfg.epoques) {
    const imgAsset = addAsset(tmp, join(imgDir, e.image), ".png");
    const audioAsset = masterAudio(tmp, join(audioDir, e.audio), `ep-${e.key}.mp3`);
    const titleAsset = masterAudio(tmp, join(audioDir, `menu-ep-${e.key}.mp3`), `menu-ep-${e.key}.mp3`);
    const uuidTitle = `a2000000-0000-4000-8000-00000000000${e.n}`;

    stageNodes.push({
      uuid: uuidTitle, name: `Etiquette ${e.n} - ${e.titre}`,
      image: imgAsset, audio: titleAsset,
      okTransition: { actionNode: `action-recit-${e.key}`, optionIndex: 0 },
      homeTransition: null,
      controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
    });
    stageNodes.push({
      uuid: e.uuid, name: `Recit ${e.n} - ${e.titre}`,
      image: imgAsset, audio: audioAsset,
      okTransition: { actionNode: "action-back-menu", optionIndex: 0 },
      homeTransition: null,
      controlSettings: { wheel: false, ok: true, home: true, pause: true, autoplay: true },
    });
    actionNodes.push({ id: `action-recit-${e.key}`, name: `Recit ${e.key}`, options: [e.uuid] });
    e._uuidTitle = uuidTitle;
  }
  actionNodes.push({ id: "action-back-menu", name: "Retour menu", options: [cfg.uuidCover] });
  actionNodes.push({ id: "action-menu", name: "Choix epoque", options: cfg.epoques.map((e) => e._uuidTitle) });

  return writeStoryAndZip(tmp, "voyage", {
    title: cfg.titre, description: cfg.description, stageNodes, actionNodes, zipName: cfg.zipName,
  });
}

// ─────────────────────────────────────────────────────────────────────────
// DINOS — menu 2 niveaux : cover/familles -> famille (molette dinos) -> nom -> fiche
// ─────────────────────────────────────────────────────────────────────────
function buildDinos(cfg, testMode) {
  const dinosSrc = process.env.DINOS_JSON || cfg.dinosJsonDefault;
  const DINOS = JSON.parse(readFileSync(dinosSrc, "utf8"));
  const isTest = testMode || /test/i.test(dinosSrc);
  const salt = isTest ? "test:" : "";
  const nomPack = isTest ? "dinos-test" : "dinos";

  const A_MENUS = join(ROOT, cfg.audioMenus);
  const A_NOMS = join(ROOT, cfg.audioNoms);
  const A_RECITS = join(ROOT, cfg.audioRecits);
  const IMG_WEB = join(ROOT, cfg.imgWeb);
  const IMG_LUNII_FAM = join(ROOT, cfg.imgLuniiFamilles);
  const IMG_LUNII_DINOS = join(ROOT, cfg.imgLuniiDinos);
  const COVER_IMG = join(IMG_LUNII_FAM, cfg.coverImage);

  const familles = cfg.familles.map((f) => ({ ...f }));
  if (isTest) {
    for (const f of familles) f.uuid = idToUuid(`test:fam:${f.key}`);
  }
  const dinosByFam = {};
  for (const d of DINOS) (dinosByFam[d.fam] = dinosByFam[d.fam] || []).push(d);

  const required = [join(A_MENUS, cfg.coverAudio)];
  for (const f of familles) required.push(join(A_MENUS, f.menu));
  for (const d of DINOS) { required.push(join(A_NOMS, `nom-${d.slug}.mp3`)); required.push(join(A_RECITS, `${d.slug}.mp3`)); }
  requireFiles(required);

  const tmp = prepareStaging(nomPack);
  const assets = {};

  const coverImgPath = buildImage(tmp, COVER_IMG, "cover.png", { pad: "black" });
  assets.coverImage = addAsset(tmp, coverImgPath, ".png");
  assets.coverAudio = masterAudio(tmp, join(A_MENUS, cfg.coverAudio), "cover-audio.mp3");
  copyFileSync(coverImgPath, join(tmp, "staging", "thumbnail.png"));

  const uuidCover = isTest ? cfg.uuidCoverTest : cfg.uuidCover;
  const stageNodes = [{
    uuid: uuidCover, squareOne: true, name: "Menu familles",
    image: assets.coverImage, audio: assets.coverAudio,
    okTransition: { actionNode: "action-into-famille", optionIndex: 0 },
    homeTransition: null,
    controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
  }];
  const actionNodes = [];

  const FAMILLES_ACTIVES = familles.filter((f) => (dinosByFam[f.key] || []).length > 0);
  for (const fam of FAMILLES_ACTIVES) {
    const list = dinosByFam[fam.key] || [];
    const famImgSrc = fam.img && existsSync(join(IMG_LUNII_FAM, fam.img)) ? join(IMG_LUNII_FAM, fam.img) : COVER_IMG;
    const famImgPath = buildImage(tmp, famImgSrc, `fam-${fam.key}.png`, { pad: "black" });
    const famImg = addAsset(tmp, famImgPath, ".png");
    const famAudio = masterAudio(tmp, join(A_MENUS, fam.menu), `fam-audio-${fam.key}.mp3`);

    stageNodes.push({
      uuid: fam.uuid, name: `Famille ${fam.titre}`,
      image: famImg, audio: famAudio,
      okTransition: { actionNode: `action-dinos-${fam.key}`, optionIndex: 0 },
      homeTransition: null,
      controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
    });

    for (const d of list) {
      const uuidNom = idToUuid(`${salt}dino-nom:${d.slug}`);
      const uuidFiche = idToUuid(`${salt}dino-fiche:${d.slug}`);

      const dinoImgProvided = join(IMG_LUNII_DINOS, `${d.slug}.png`);
      const dinoImgFallbackBase = join(IMG_WEB, d.slug.charAt(0).toUpperCase() + d.slug.slice(1));
      const dinoImgSrc = existsSync(dinoImgProvided)
        ? dinoImgProvided
        // paleoart/ est en webp depuis HO-R13 (2026-09-12) ; .jpg gardé en repli si jamais
        // une source plus ancienne traîne encore (ne devrait plus arriver).
        : existsSync(`${dinoImgFallbackBase}.webp`)
          ? `${dinoImgFallbackBase}.webp`
          : `${dinoImgFallbackBase}.jpg`;
      const dinoImgPath = buildImage(tmp, dinoImgSrc, `dino-${d.slug}.png`, { pad: "black" });
      const dinoImg = addAsset(tmp, dinoImgPath, ".png");
      const nomAudio = masterAudio(tmp, join(A_NOMS, `nom-${d.slug}.mp3`), `nom-${d.slug}.mp3`);
      const ficheAudio = masterAudio(tmp, join(A_RECITS, `${d.slug}.mp3`), `fiche-${d.slug}.mp3`);

      stageNodes.push({
        uuid: uuidNom, name: `Nom ${d.name}`,
        image: dinoImg, audio: nomAudio,
        okTransition: { actionNode: `action-fiche-${d.slug}`, optionIndex: 0 },
        homeTransition: null,
        controlSettings: { wheel: true, ok: true, home: true, pause: false, autoplay: false },
      });
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
    actionNodes.push({ id: `action-dinos-${fam.key}`, name: `Dinos ${fam.titre}`, options: list.map((d) => d._uuidNom) });
    actionNodes.push({ id: `action-back-${fam.key}`, name: `Retour ${fam.titre}`, options: [fam.uuid] });
  }
  actionNodes.push({ id: "action-into-famille", name: "Choix famille", options: FAMILLES_ACTIVES.map((f) => f.uuid) });

  const title = isTest ? cfg.titreTest : cfg.titre;
  const zipName = isTest ? cfg.zipNameTest : cfg.zipName;
  const dest = writeStoryAndZip(tmp, nomPack, {
    title, description: cfg.description, stageNodes, actionNodes, zipName, salt,
  });
  console.log(`${FAMILLES_ACTIVES.length} familles · ${DINOS.length} dinos · ${stageNodes.length} stages.`);
  return dest;
}
