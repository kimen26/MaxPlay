#!/usr/bin/env node
'use strict';
/**
 * HO-R12 — régénère la ligne "Chiffres data" en tête des scripts audio V3 FR
 * (studio/dino/content/scripts-audio/fr/V3/<id>.md) depuis la fiche canon JSON
 * (studio/dino/content/dinos/<id>.json), pour qu'elle ne puisse plus diverger
 * de la vraie source (D-009).
 *
 * NE TOUCHE QUE la ligne "> Chiffres data (...) : ..." — jamais le reste du
 * fichier (corps narré, autres lignes d'en-tête, fact-check, étymologie...).
 * Si la ligne est absente d'un fichier, ce script ne l'ajoute PAS (hors
 * périmètre : signalé en sortie, laissé pour décision explicite).
 *
 * Usage : node studio/dino/content/scripts/export/_gen-chiffres-data-header.cjs [--write]
 *   Sans --write : dry-run, affiche ce qui changerait.
 *   --write : applique.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../../..');
const DINOS_DIR = path.join(ROOT, 'studio/dino/content/dinos');
const MD_DIR = path.join(ROOT, 'studio/dino/content/scripts-audio/fr/V3');

// Fonctions de comparaison — copiées à l'identique depuis site/js/dinos-data.js
// (référentiel figé, cf commentaires du fichier source). Dupliquées ici en lecture
// seule pour calculer la ligne d'en-tête sans dépendre d'un require() de fichier
// navigateur (const globaux, pas de module.exports).
function _round1(x) { return Math.round(x * 10) / 10; }
function _qty(n, sing, plur) { return n <= 1 ? `un ${sing}` : `${n} ${plur}`; }
function _que(s) { return /^[aeiouyéèêàh]/i.test(s) ? `qu'${s}` : `que ${s}`; }

function _compLong(m) {
  if (m >= 30) return `comme un bus accordéon et un bus, l'un derrière l'autre !`;
  if (m >= 24) return `comme deux bus l'un derrière l'autre !`;
  if (m >= 16) return `aussi long qu'un bus accordéon !`;
  if (m >= 11) return `aussi long qu'un bus RATP !`;
  if (m >= 8.5) return `aussi long qu'un camion !`;
  if (m >= 7) return `comme deux voitures l'une derrière l'autre !`;
  if (m >= 5.6) return `aussi long qu'une rue à deux voies est large — il barrait la route !`;
  if (m >= 4.3) return `aussi long qu'un grand 4×4 !`;
  if (m >= 3.3) return `comme une petite voiture !`;
  if (m >= 2.4) return `comme trois enfants de 4 ans allongés !`;
  if (m >= 1.9) return `aussi long qu'une moto !`;
  if (m >= 1.7) return `comme un grand Papa allongé par terre !`;
  if (m >= 1.35) return `aussi long qu'un vélo !`;
  if (m >= 0.8) return `comme un grand chien — un labrador !`;
  if (m >= 0.45) return `comme un gros chat allongé !`;
  return `tout petit, comme un poulet !`;
}

function _compHaut(m) {
  if (m >= 11) return `aussi haut qu'un immeuble de ${Math.round(m / 3)} étages !`;
  if (m >= 7.5) return `aussi haut qu'un immeuble de trois étages !`;
  if (m >= 5.6) return `aussi haut qu'un lampadaire !`;
  if (m >= 4.8) return `presque trois Papas l'un sur l'autre !`;
  if (m >= 4.0) return `aussi haut qu'un bus anglais à deux étages !`;
  if (m >= 3.3) return `comme deux Papas l'un sur l'autre !`;
  if (m >= 2.8) return `aussi haut qu'un panier de basket !`;
  if (m >= 2.3) return `aussi haut qu'un but de foot !`;
  if (m >= 2.1) return `comme Papa qui te porte tout en haut sur ses épaules !`;
  if (m >= 1.9) return `aussi haut qu'une porte !`;
  if (m >= 1.7) return `aussi grand que Papa debout !`;
  if (m >= 1.25) return `aussi haut qu'une voiture — il fallait lever la tête !`;
  if (m >= 0.85) return `aussi grand qu'un enfant de 4 ans !`;
  if (m >= 0.65) return `il t'arrivait au nombril !`;
  if (m >= 0.45) return `il t'arrivait aux fesses !`;
  if (m >= 0.25) return `il t'arrivait aux genoux !`;
  return `plus bas que tes genoux !`;
}

function _compPoids(t) {
  if (t >= 7.5) {
    const cands = [
      { n: Math.round(t / 5), w: 5, sing: 'éléphant', plur: 'éléphants', pref: 0 },
      { n: Math.round(t / 3), w: 3, sing: 'hippopotame', plur: 'hippopotames', pref: 1 },
      { n: Math.round(t / 2), w: 2, sing: 'rhinocéros', plur: 'rhinocéros', pref: 2 },
    ].filter(c => c.n >= 2)
     .map(c => ({ ...c, err: Math.abs(t - c.n * c.w) / (c.n * c.w) }))
     .sort((a, b) => a.err - b.err || a.pref - b.pref);
    const ele = cands.find(c => c.w === 5);
    const best = (ele && ele.err <= 0.10 && ele.err <= cands[0].err + 0.03) ? ele : cands[0];
    return `aussi lourd ${_que(_qty(best.n, best.sing, best.plur))} !`;
  }
  if (t >= 6.3) return `aussi lourd qu'un éléphant et un rhinocéros ensemble !`;
  if (t >= 5.5) return `aussi lourd que 3 rhinocéros !`;
  if (t >= 4.4) return `aussi lourd qu'un éléphant !`;
  if (t >= 3.7) return `aussi lourd que 2 rhinocéros !`;
  if (t >= 3.35) return `aussi lourd qu'un hippopotame et un cheval ensemble !`;
  if (t >= 2.8) return `aussi lourd qu'un hippopotame !`;
  if (t >= 2.3) return `aussi lourd que 5 chevaux !`;
  if (t >= 1.8) return `aussi lourd qu'un rhinocéros !`;
  if (t >= 1.45) return `aussi lourd qu'une petite voiture et une vache ensemble !`;
  if (t >= 0.85) return `aussi lourd qu'une petite voiture !`;
  if (t >= 0.55) return `aussi lourd qu'une vache !`;
  if (t >= 0.45) return `aussi lourd qu'un cheval !`;
  if (t >= 0.36) return `aussi lourd que 2 lions !`;
  if (t >= 0.29) return `aussi lourd que 2 ânes !`;
  if (t >= 0.225) return `aussi lourd qu'un tigre !`;
  if (t >= 0.18) return `aussi lourd qu'un lion !`;
  if (t >= 0.14) return `aussi lourd qu'un âne !`;
  if (t >= 0.09) return `aussi lourd qu'un cochon !`;
  if (t >= 0.075) return `aussi lourd que Papa !`;
  if (t >= 0.068) return `aussi lourd qu'un kangourou !`;
  if (t >= 0.045) return `aussi lourd qu'un loup !`;
  if (t >= 0.035) return `aussi lourd qu'un grand enfant de 10 ans !`;
  if (t >= 0.023) return `aussi lourd qu'un chien !`;
  if (t >= 0.011) return `aussi lourd qu'un enfant de 4 ans !`;
  if (t >= 0.0035) return `aussi lourd qu'un gros chat !`;
  return `léger comme un petit oiseau !`;
}

function _compVitesse(k) {
  if (k == null) return '';
  if (k >= 85) return `presque aussi vite qu'un guépard !`;
  if (k >= 66) return `aussi vite qu'une autruche !`;
  if (k >= 56) return `aussi vite qu'un lion qui charge !`;
  if (k >= 48) return `aussi vite qu'une voiture en ville !`;
  if (k >= 40) return `aussi vite qu'un cheval au galop !`;
  if (k >= 32.5) return `aussi vite qu'un chien qui court !`;
  if (k >= 27.5) return `aussi vite qu'un cheval au petit galop !`;
  if (k >= 22.5) return `aussi vite qu'un vélo qui roule bien !`;
  if (k >= 17.5) return `aussi vite que Papa qui court !`;
  if (k >= 12.5) return `comme un vélo qui roule tranquille !`;
  if (k >= 8.5) return `aussi vite qu'un enfant qui court !`;
  if (k >= 5.5) return `comme Papa qui marche vite !`;
  return `aussi vite que toi quand tu marches !`;
}

function buildLine(d) {
  const parts = [];
  parts.push(`${d.taille_m} m long`);
  if (d.hauteur_m !== undefined) parts.push(`${d.hauteur_m} m haut`);
  parts.push(`${d.poids_t} t`);
  if (d.vitesse_kmh !== undefined) parts.push(`vitesse ${d.vitesse_kmh} km/h`);

  const fnParts = [`_compLong(${d.taille_m})`];
  const outParts = [_compLong(d.taille_m)];
  if (d.hauteur_m !== undefined) { fnParts.push(`_compHaut(${d.hauteur_m})`); outParts.push(_compHaut(d.hauteur_m)); }
  fnParts.push(`_compPoids(${d.poids_t})`);
  outParts.push(_compPoids(d.poids_t));
  if (d.vitesse_kmh !== undefined) { fnParts.push(`_compVitesse(${d.vitesse_kmh})`); outParts.push(_compVitesse(d.vitesse_kmh)); }

  const today = new Date().toISOString().slice(0, 10);
  return `> Chiffres data (\`studio/dino/content/dinos/${d.id}.json\`) : ${parts.join(' · ')}. Comparaisons = sortie EXACTE de ${fnParts.join(' / ')}, régénérées ${today} : ${outParts.map(o => `\`${o}\``).join(' / ')}.`;
}

function main() {
  const write = process.argv.includes('--write');
  const files = fs.readdirSync(MD_DIR).filter(f => f.endsWith('.md') && !f.startsWith('_'));

  let changed = 0, unchanged = 0, skippedNoLine = 0, skippedNoFiche = 0;
  const report = [];

  for (const f of files) {
    const id = f.replace(/\.md$/, '');
    const dinoFile = path.join(DINOS_DIR, `${id}.json`);
    if (!fs.existsSync(dinoFile)) { skippedNoFiche++; continue; }
    const d = JSON.parse(fs.readFileSync(dinoFile, 'utf8'));

    const mdPath = path.join(MD_DIR, f);
    const content = fs.readFileSync(mdPath, 'utf8');
    const lines = content.split(/\r\n|\n/);
    const idx = lines.findIndex(l => l.startsWith('> Chiffres data'));
    if (idx === -1) { skippedNoLine++; report.push(`${id} : SANS ligne "Chiffres data" — non touché (hors périmètre)`); continue; }

    const newLine = buildLine(d);
    if (lines[idx] === newLine) { unchanged++; continue; }

    changed++;
    report.push(`${id} : ligne mise à jour`);
    if (write) {
      const eol = content.includes('\r\n') ? '\r\n' : '\n';
      lines[idx] = newLine;
      fs.writeFileSync(mdPath, lines.join(eol), 'utf8');
    }
  }

  console.log(`${write ? 'ÉCRIT' : 'DRY-RUN'} : ${changed} changées, ${unchanged} déjà à jour, ${skippedNoLine} sans ligne, ${skippedNoFiche} sans fiche JSON.`);
  for (const r of report) console.log(' -', r);
}

main();
