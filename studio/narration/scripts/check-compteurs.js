#!/usr/bin/env node
/**
 * check-compteurs.js — Anti-dérive des chiffres en dur dans les INDEX narration.
 *
 * RECOMPTE les faits sur le disque (prénoms, onomatopées, masterclasses craft,
 * stories) et COMPARE aux chiffres déclarés dans les fichiers d'index.
 * NE RÉECRIT RIEN : rapporte les dérives, un humain (ou l'agent) corrige.
 *
 * Usage : node studio/narration/scripts/check-compteurs.js
 * Sortie : ✅ par compteur conforme, ❌ par dérive (détail déclaré vs réel).
 * Exit code 1 si au moins une dérive (branchable en hook / audit PMO).
 *
 * Règle transverse (memory/DOCTRINE.md) : un chiffre volatil est soit vérifié
 * par ce script, soit exprimé en relatif (« voir X ») — jamais recopié en dur
 * sans filet.
 *
 * Historique : créé 2026-07-27 (phase 3 cartographie, anti-récidive après
 * l'audit qui a trouvé 218 vs 274 prénoms, 17 vs 20 pivots, etc.).
 */

const fs = require('fs');
const path = require('path');

const NARRATION_DIR = path.join(__dirname, '..');
const CRAFT_DIR = path.join(__dirname, '..', '..', '..', '.claude', 'skills', 'narration-craft');

let derives = 0;
const ok = (label, detail) => console.log(`✅ ${label}${detail ? ' — ' + detail : ''}`);
const ko = (label, detail) => { derives++; console.log(`❌ ${label} — ${detail}`); };

function read(rel) {
  return fs.readFileSync(path.join(NARRATION_DIR, rel), 'utf8');
}

// ---------- 1. Prénoms : comptage réel par fiche culture ----------
// Sections méta (non-prénoms) rencontrées dans les fiches — heuristique :
// tout titre contenant 'Note', 'Cross-références', 'À enrichir', 'Statut'.
function comptePrenoms(fichier) {
  const content = read(path.join('cross-culture/prenoms/par-culture', fichier));
  const titres = [...content.matchAll(/^## (.+)$/gm)].map(m => m[1].trim());
  const meta = /note|cross-références|à enrichir|statut/i;
  return titres.filter(t => !meta.test(t)).length;
}

function checkPrenoms() {
  const dir = path.join(NARRATION_DIR, 'cross-culture/prenoms/par-culture');
  const fiches = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
  const reels = {};
  let totalReel = 0;
  for (const f of fiches) {
    // Fiches dépréciées (0 prénom) : tupi-guarani redirige vers bresilien-tupi-orisha
    reels[f] = comptePrenoms(f);
    totalReel += reels[f];
  }

  // Table déclarée dans prenoms/INDEX.md : | [par-culture/<fichier>](...) | ... | N | ... |
  const index = read('cross-culture/prenoms/INDEX.md');
  const lignes = [...index.matchAll(/\| \[par-culture\/([\w-]+\.md)\]\([^)]*\) \|[^|]*\| *(\d+) *\|/g)];
  for (const [, fichier, nStr] of lignes) {
    const n = parseInt(nStr, 10);
    const reel = reels[fichier];
    if (reel === undefined) { ko(`prénoms ${fichier}`, `listé dans INDEX (${n}) mais fichier absent`); continue; }
    if (reel !== n) ko(`prénoms ${fichier}`, `INDEX déclare ${n}, réel ${reel}`);
  }
  // Fiches présentes mais absentes de la table
  const listes = new Set(lignes.map(m => m[1]));
  for (const f of fiches) {
    if (!listes.has(f)) ko(`prénoms ${f}`, `fichier existe (${reels[f]} prénoms) mais absent de la table INDEX`);
  }

  // Total déclaré
  const mTotal = index.match(/Total qualifiés à ce jour : (\d+) prénoms\*\* sur \*\*(\d+) fiches/);
  if (mTotal) {
    const [, tot, nb] = mTotal;
    if (parseInt(tot, 10) !== totalReel) ko('prénoms total', `INDEX déclare ${tot}, réel ${totalReel}`);
    else ok('prénoms total', `${totalReel} sur ${fiches.length} fiches`);
    if (parseInt(nb, 10) !== fiches.length) ko('prénoms nb fiches', `INDEX déclare ${nb}, réel ${fiches.length}`);
  } else {
    ko('prénoms total', 'ligne « Total qualifiés » introuvable dans prenoms/INDEX.md');
  }

  // Propagations : cross-culture/INDEX.md (arbre + état) et doctrine.md
  const ccIndex = read('cross-culture/INDEX.md');
  for (const [regex, label] of [
    [/(\d+) prénoms qualifiés \/ (\d+) fiches culture/, 'cross-culture/INDEX arbre'],
    [/\*\*Catalogue prénoms\*\* : (\d+) prénoms \/ (\d+) fiches/, 'cross-culture/INDEX état'],
  ]) {
    const m = ccIndex.match(regex);
    if (m) {
      if (parseInt(m[1], 10) !== totalReel) ko(label, `déclare ${m[1]}, réel ${totalReel}`);
      if (m[2] && parseInt(m[2], 10) !== fiches.length) ko(label, `déclare ${m[2]} fiches, réel ${fiches.length}`);
    }
  }
  const doctrine = read('cross-culture/doctrine.md');
  const mDoc = doctrine.match(/\((\d+) prénoms \/ 30 cultures actives/);
  if (mDoc && parseInt(mDoc[1], 10) !== totalReel) ko('doctrine.md surcouverture', `déclare ${mDoc[1]}, réel ${totalReel}`);
  for (const [fichier, label] of [['japonais.md', 'jp'], ['bresilien-tupi-orisha.md', 'br']]) {
    const mCast = doctrine.match(new RegExp(`prenoms/par-culture/${fichier.replace('.', '\\.')}.*\\((\\d+) prénoms\\)`));
    if (mCast && parseInt(mCast[1], 10) !== reels[fichier]) ko(`doctrine.md casting ${label}`, `déclare ${mCast[1]}, réel ${reels[fichier]}`);
  }
}

// ---------- 2. Onomatopées : entrées du tableau + pivots ----------
function checkOnomatopees() {
  const cat = read('cross-culture/onomatopees/catalogue-onomatopees.md');
  const entrees = new Set([...cat.matchAll(/^\| (\d+) \|/gm)].map(m => m[1]));
  const nbEntrees = entrees.size;
  // Pivots = numéros listés dans la ligne Recommandations « entrées **…** »
  const mListe = cat.match(/entrées \*\*([\d, ]+)\*\*/);
  const nbPivots = mListe ? mListe[1].split(',').map(s => s.trim()).filter(Boolean).length : 0;

  const mTitre = cat.match(/### (\d+) pivots/);
  if (mTitre && parseInt(mTitre[1], 10) !== nbPivots) ko('onomatopées pivots (titre)', `déclare ${mTitre[1]}, réel ${nbPivots}`);
  const mRegle = cat.match(/: (\d+) entrées listées en \*Recommandations/);
  if (mRegle && parseInt(mRegle[1], 10) !== nbPivots) ko('onomatopées pivots (règle)', `déclare ${mRegle[1]}, réel ${nbPivots}`);
  if (mTitre && mRegle && parseInt(mTitre[1], 10) === nbPivots && parseInt(mRegle[1], 10) === nbPivots) {
    ok('onomatopées pivots', `${nbPivots}`);
  }
  // Chaque pivot listé existe-t-il comme entrée ?
  if (mListe) {
    for (const num of mListe[1].split(',').map(s => s.trim()).filter(Boolean)) {
      if (!entrees.has(num)) ko('onomatopées pivot orphelin', `#${num} listé mais pas d'entrée ${num} dans le tableau`);
    }
  }

  const ccIndex = read('cross-culture/INDEX.md');
  for (const m of ccIndex.matchAll(/onomatopees[^\n]*\((\d+) entrées\)|Catalogue onomatopées\*\* : (\d+) entrées/g)) {
    const n = parseInt(m[1] || m[2], 10);
    if (n !== nbEntrees) ko('cross-culture/INDEX onomatopées', `déclare ${n}, réel ${nbEntrees}`);
  }
  const eqIndex = read('equipe/INDEX.md');
  const mEq = eqIndex.match(/Catalogue (\d+) onomatopées/);
  if (mEq && parseInt(mEq[1], 10) !== nbEntrees) ko('equipe/INDEX onomatopées', `déclare ${mEq[1]}, réel ${nbEntrees}`);
  ok('onomatopées entrées', `${nbEntrees}`);
}

// ---------- 3. Craft : masterclasses sur disque (info, pas de chiffre dur à vérifier) ----------
function checkCraft() {
  if (!fs.existsSync(CRAFT_DIR)) { ko('craft', `dossier introuvable : ${CRAFT_DIR}`); return; }
  const nb = fs.readdirSync(CRAFT_DIR).filter(f => /^\d+-.*\.md$/.test(f)).length;
  ok('craft masterclasses', `${nb} fichiers sur disque (la liste à jour vit dans SKILL.md — rien à vérifier en dur)`);
}

// ---------- 4. Stories : chaque dossier NNN-* est-il dans stories/INDEX.md ? ----------
function checkStories() {
  const dir = path.join(NARRATION_DIR, 'stories');
  const dossiers = fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory() && /^\d{3}-/.test(e.name)).map(e => e.name).sort();
  const index = read('stories/INDEX.md');
  let manquants = 0;
  for (const d of dossiers) {
    if (!index.includes(`(${d}/README.md)`) && !index.includes(`(${d}/)`)) {
      ko('stories INDEX', `${d} absent de stories/INDEX.md`);
      manquants++;
    }
  }
  // Statuts frontmatter vs gabarit canon
  let canon = 0;
  for (const d of dossiers) {
    const readme = path.join(dir, d, 'README.md');
    if (!fs.existsSync(readme)) { ko('stories README', `${d}/README.md absent`); continue; }
    const fm = fs.readFileSync(readme, 'utf8');
    if (/^statut: canon/m.test(fm)) canon++;
  }
  if (!manquants) ok('stories INDEX', `${dossiers.length} dossiers, tous indexés — ${canon} canon`);
}

// ---------- main ----------
console.log('— check-compteurs · narration MaxPlay —\n');
checkPrenoms();
checkOnomatopees();
checkCraft();
checkStories();
console.log(derives ? `\n${derives} dérive(s) — corriger les INDEX déclarés.` : '\nAucune dérive. Compteurs conformes.');
process.exit(derives ? 1 : 0);
