// Audit d'etancheite des coloriages (flood fill 4-connexe depuis les 4 coins).
//
// A QUOI CA SERT : un coloriage doit etre une forme FERMEE. Si un trait interieur
// est ouvert (strie, barbe de plume, meche de pelage tracee en trait libre), le
// remplissage de mj-32 fuit par ce trou et repeint tout l'ecran. L'oeil ne voit
// pas le trou ; ce flood fill, si.
//
// METHODE : on inonde depuis les 4 coins ; obstacle = pixel sombre (luminance
// < 200) et opaque (alpha >= 32). Si le fond atteint le carre central, la forme
// fuit. Si le fond couvre plus de 88 % de l'image, verdict DOUTEUX (silhouette
// trop fine pour conclure). En cas de FUITE, les pixels-trou candidats les plus
// proches du centre sont listes : c'est la ou regarder dans l'image.
//
// LIMITE ASSUMEE, ET ELLE EST LARGE (L-D39) : ce script demande "le fond atteint-il
// le CENTRE GEOMETRIQUE ?", ce qui n'est PAS la question de l'etancheite. Chez un
// sujet aux membres ecartes (ailes deployees, nageoires ouvertes) le centre tombe
// entre deux membres, donc dans le fond, et le verdict FUITE tombe a tort — c'est
// ainsi que 5 dinos parfaitement etanches ont ete accuses le 2026-09-08. Idem pour
// les decors de paysage (fond_*), au centre vide par construction.
// => Ce script est un DEPISTAGE. Le verdict se prend avec verifie-fuite-reelle.mjs
//    et se confirme a l'oeil avec preuve-remplissage.mjs. Ne jamais reparer une
//    image sur la seule foi de ce fichier.
//
// LECTURE SEULE : aucun fichier du repo n'est modifie. Les .webp sont decodes en
// PNG dans un dossier temporaire (ffmpeg est le seul decodeur webp disponible sur
// la machine, ImageMagick n'est pas installe), supprime a la fin.
//
// Usage :
//   node studio/dino/content/scripts/etancheite/audit-etancheite.mjs           # dinos
//   node studio/dino/content/scripts/etancheite/audit-etancheite.mjs --plantes # plantes
//   node ... --dossier <chemin> --motif "_coloriage.webp"                      # libre
//
// Historique : ne a l'audit du 2026-09-09 (70/70 dinos testes, 5 fuites trouvees,
// cf. L-D38). Vivait dans un scratchpad de session, donc perissable : verse dans
// le repo pour que l'outillage survive a la session qui l'a ecrit.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(__dir, '..', '..', '..', '..', '..');

function arg(nom) {
  const i = process.argv.indexOf(nom);
  return i !== -1 ? process.argv[i + 1] : null;
}

const SOURCE_DIR = arg('--dossier')
  ? path.resolve(arg('--dossier'))
  : process.argv.includes('--plantes')
    ? path.join(RACINE, 'site', 'img', 'dinos', 'plantes')
    : path.join(RACINE, 'site', 'img', 'dinos', 'paleoart');
const MOTIF = arg('--motif') || '_coloriage.webp';

if (!fs.existsSync(SOURCE_DIR)) {
  console.error('Dossier introuvable : ' + SOURCE_DIR);
  process.exit(2);
}

// Decodage en RGBA BRUT via ffmpeg, dans un dossier temporaire. Volontairement
// sans librairie PNG : aucune dependance npm n'est installee dans ce sous-arbre,
// et un outil d'audit qui exige un `npm install` finit par ne plus etre lance.
// ffmpeg donne les dimensions puis les pixels ; on lit un Buffer, c'est tout.
const PNG_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'etancheite-'));

function dimensions(src) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', src]).toString().trim();
  const [w, h] = out.split('x').map(Number);
  if (!w || !h) throw new Error('dimensions illisibles pour ' + src);
  return { width: w, height: h };
}

function decoderRGBA(src) {
  const { width, height } = dimensions(src);
  const dst = path.join(PNG_DIR, path.basename(src) + '.rgba');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', src,
    '-pix_fmt', 'rgba', '-f', 'rawvideo', dst]);
  const data = fs.readFileSync(dst);
  fs.rmSync(dst, { force: true });
  const attendu = width * height * 4;
  if (data.length !== attendu) {
    throw new Error('taille RGBA inattendue pour ' + src + ' : ' + data.length + ' au lieu de ' + attendu);
  }
  return { data, width, height };
}

const LUM_SEUIL_TRAIT = 200;
const ALPHA_SEUIL_VIDE = 32;
const SEUIL_DOUTEUX_PCT = 88;
const CENTRE_DEMI_COTE = 2;
const NB_CANDIDATS_TROU = 5;

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function isObstacle(data, idx) {
  const o = idx * 4;
  const r = data[o], g = data[o + 1], b = data[o + 2], a = data[o + 3];
  if (a < ALPHA_SEUIL_VIDE) return false;
  return luminance(r, g, b) < LUM_SEUIL_TRAIT;
}

function floodFillFromSeeds(data, width, height, seeds) {
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = new Int32Array(total);
  let qHead = 0, qTail = 0;
  const startedSeeds = [];
  const rejectedSeeds = [];

  for (const [sx, sy] of seeds) {
    const sidx = sy * width + sx;
    if (isObstacle(data, sidx)) {
      rejectedSeeds.push([sx, sy]);
      continue;
    }
    if (visited[sidx]) continue;
    visited[sidx] = 1;
    queue[qTail++] = sidx;
    startedSeeds.push([sx, sy]);
  }

  while (qHead < qTail) {
    const idx = queue[qHead++];
    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) {
      const nidx = idx - 1;
      if (!visited[nidx] && !isObstacle(data, nidx)) { visited[nidx] = 1; queue[qTail++] = nidx; }
    }
    if (x < width - 1) {
      const nidx = idx + 1;
      if (!visited[nidx] && !isObstacle(data, nidx)) { visited[nidx] = 1; queue[qTail++] = nidx; }
    }
    if (y > 0) {
      const nidx = idx - width;
      if (!visited[nidx] && !isObstacle(data, nidx)) { visited[nidx] = 1; queue[qTail++] = nidx; }
    }
    if (y < height - 1) {
      const nidx = idx + width;
      if (!visited[nidx] && !isObstacle(data, nidx)) { visited[nidx] = 1; queue[qTail++] = nidx; }
    }
  }

  return { visited, startedSeeds, rejectedSeeds, reachedCount: qTail };
}

function findTrouCandidates(data, width, height, visited, cx, cy, maxCandidates) {
  const candidates = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!isObstacle(data, idx)) continue;
      let adjacentToReached = false;
      if (x > 0 && visited[idx - 1]) adjacentToReached = true;
      else if (x < width - 1 && visited[idx + 1]) adjacentToReached = true;
      else if (y > 0 && visited[idx - width]) adjacentToReached = true;
      else if (y < height - 1 && visited[idx + width]) adjacentToReached = true;
      if (!adjacentToReached) continue;
      const dist = Math.hypot(x - cx, y - cy);
      candidates.push({ x, y, dist });
    }
  }
  candidates.sort((a, b) => a.dist - b.dist);
  return candidates.slice(0, maxCandidates);
}

function auditImage(absPath, name) {
  if (!fs.existsSync(absPath)) {
    return { name, error: 'FICHIER INTROUVABLE : ' + absPath };
  }
  let image;
  try {
    image = decoderRGBA(absPath);
  } catch (e) {
    return { name, error: 'DECODAGE IMPOSSIBLE : ' + e.message };
  }

  const { width, height, data } = image;
  const total = width * height;
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);

  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];

  const { visited, startedSeeds, rejectedSeeds, reachedCount } =
    floodFillFromSeeds(data, width, height, corners);

  const pctFond = (reachedCount / total) * 100;

  let centreAtteint = false;
  for (let dy = -CENTRE_DEMI_COTE; dy <= CENTRE_DEMI_COTE && !centreAtteint; dy++) {
    const yy = cy + dy;
    if (yy < 0 || yy >= height) continue;
    for (let dx = -CENTRE_DEMI_COTE; dx <= CENTRE_DEMI_COTE; dx++) {
      const xx = cx + dx;
      if (xx < 0 || xx >= width) continue;
      if (visited[yy * width + xx]) { centreAtteint = true; break; }
    }
  }

  let verdict;
  if (centreAtteint) verdict = 'FUITE';
  else if (pctFond > SEUIL_DOUTEUX_PCT) verdict = 'DOUTEUX';
  else verdict = 'ETANCHE';

  let trouCandidates = [];
  if (verdict === 'FUITE') {
    trouCandidates = findTrouCandidates(data, width, height, visited, cx, cy, NB_CANDIDATS_TROU);
  }

  return {
    name,
    width,
    height,
    pctFond,
    verdict,
    centreAtteint,
    startedSeedsCount: startedSeeds.length,
    rejectedSeeds,
    trouCandidates,
  };
}

const sources = fs.readdirSync(SOURCE_DIR)
  .filter(f => f.endsWith(MOTIF) && !f.startsWith('fond_'))  // decors exclus : centre vide par construction
  .sort()
  .map(f => path.join(SOURCE_DIR, f));

if (!sources.length) {
  console.error('Aucune image ' + MOTIF + ' dans ' + SOURCE_DIR);
  process.exit(2);
}

// Sonde ffmpeg/ffprobe AVANT la boucle : sans decodeur, l'audit ne peut rien
// conclure et doit sortir, jamais afficher un rassurant "0 fuite".
try {
  decoderRGBA(sources[0]);
} catch (e) {
  console.error('Decodage impossible (ffmpeg/ffprobe absent ou en erreur) : ' + e.message);
  fs.rmSync(PNG_DIR, { recursive: true, force: true });
  process.exit(2);
}

const files = sources;

console.log('=== Audit etancheite des coloriages ===');
console.log('Source :', SOURCE_DIR);
console.log('LUM_SEUIL_TRAIT =', LUM_SEUIL_TRAIT);
console.log('ALPHA_SEUIL_VIDE =', ALPHA_SEUIL_VIDE);
console.log('SEUIL_DOUTEUX_PCT =', SEUIL_DOUTEUX_PCT);
console.log('Images à auditer :', files.length);
console.log('');

const results = [];
for (const abs of files) {
  const f = path.basename(abs);
  const r = auditImage(abs, f);
  results.push(r);
  if (r.error) {
    console.log('[audit] ' + f + '  -> ERREUR: ' + r.error);
  } else {
    console.log(
      '[audit] ' + f + '  -> ' + r.width + 'x' + r.height +
      ' | fond=' + r.pctFond.toFixed(2) + '%' +
      ' | centre atteint=' + r.centreAtteint +
      ' | verdict=' + r.verdict
    );
    if (r.rejectedSeeds.length) {
      console.log('    ATTENTION coin(s) eux-mêmes TRAIT (non floodés) : ' + JSON.stringify(r.rejectedSeeds));
    }
    if (r.trouCandidates.length) {
      r.trouCandidates.forEach(c => {
        console.log('    candidat trou x=' + c.x + ' y=' + c.y + ' dist=' + c.dist.toFixed(1) + 'px');
      });
    }
  }
}

const fuites = results.filter(r => r.verdict === 'FUITE');
const douteux = results.filter(r => r.verdict === 'DOUTEUX');
const etanches = results.filter(r => r.verdict === 'ETANCHE');
const erreurs = results.filter(r => r.error);

console.log('');
console.log('=== RÉSUMÉ ===');
console.log('Total :', results.length);
console.log('ÉTANCHE :', etanches.length);
console.log('DOUTEUX :', douteux.length);
console.log('FUITE :', fuites.length);
console.log('ERREUR :', erreurs.length);
if (fuites.length) console.log('Dinos en FUITE :', fuites.map(r => r.name).join(', '));
if (douteux.length) console.log('Dinos DOUTEUX :', douteux.map(r => r.name).join(', '));

// Le rapport va dans le TEMP, pas dans le dossier d'assets : site/img/ est deploye,
// un JSON d'audit n'a rien a y faire.
const rapport = path.join(os.tmpdir(), '_etancheite-resultats.json');
fs.writeFileSync(rapport, JSON.stringify(results, null, 2));
fs.rmSync(PNG_DIR, { recursive: true, force: true });
console.log('');
console.log('Resultats JSON : ' + rapport);

// Code de sortie non nul si au moins une fuite : utilisable en porte de verification.
process.exit(fuites.length ? 1 : 0);
