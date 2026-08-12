#!/usr/bin/env node
// Génère site/js/lexique-fr.js (window.LEXIQUE_FR) depuis le lexique de
// prononciation studio/dino/content/i18n/lexiques-prononciation/fr.md.
//
// Usage : node studio/dino/content/scripts/i18n/_gen-lexique-site.mjs
//
// Seules les entrées « à risque » (§2 + §2bis, respelling en **gras**) sont
// exportées — les noms qui « se lisent bien tels quels » (§3, en *italique*)
// n'ont rien à faire dans le lexique. Le respell est consommé par TTS.speak
// (site/js/tts.js) UNIQUEMENT au moment de construire l'utterance : la clé de
// lookup des clips pré-enregistrés (voice.js) reste le texte brut.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../..');
const SRC = path.join(ROOT, 'studio', 'dino', 'content', 'i18n', 'lexiques-prononciation', 'fr.md');
const OUT = path.join(ROOT, 'site', 'js', 'lexique-fr.js');

const md = fs.readFileSync(SRC, 'utf8');

// On ne lit que les sections §2 (« noms À RISQUE ») et §2bis — tout ce qui est
// entre le titre « ## 2. » et le titre « ## 3. ».
const debut = md.indexOf('## 2.');
const fin = md.indexOf('## 3.');
if (debut === -1 || fin === -1 || fin <= debut) {
  console.error('Sections §2/§3 introuvables dans fr.md — format changé ?');
  process.exit(1);
}
const bloc = md.slice(debut, fin);

const lexique = {};
let ignores = 0;

for (const ligne of bloc.split('\n')) {
  const t = ligne.trim();
  if (!t.startsWith('|')) continue;
  const cols = t.split('|').map(c => c.trim());
  // cols = ['', nom, ecrire, piege, '']
  const nom = cols[1] || '';
  const ecrire = cols[2] || '';
  if (!nom || /^-+$/.test(nom.replace(/\s/g, '')) || nom.startsWith('Nom ')) continue;

  // Respelling = le **gras** de la colonne « Écrire dans l'audio ».
  // Pas de gras (italique « se lit bien tel quel ») = entrée OK telle quelle → skip.
  const m = ecrire.match(/\*\*([^*]+)\*\*/);
  if (!m) { ignores++; continue; }
  const respell = m[1].trim();

  // Clé = le nom avant toute parenthèse explicative. Si la ligne est un nom
  // d'usage multi-mots (« Loup terrible (Aenocyon dirus) »), le latin visé est
  // déjà couvert par sa propre entrée §2 → on ne crée pas de clé parasite
  // (remplacer « Loup » partout serait catastrophique).
  const cle = nom.replace(/\s*\(.*$/, '').trim();
  if (!cle || cle.includes(' ')) { ignores++; continue; }
  if (lexique[cle]) { console.log(`doublon ignoré : ${cle}`); continue; }
  lexique[cle] = respell;
}

const entrees = Object.keys(lexique).sort((a, b) => a.localeCompare(b, 'fr'));
const corps = entrees.map(k => `  ${JSON.stringify(k)}: ${JSON.stringify(lexique[k])},`).join('\n');

const js = `// ─────────────────────────────────────────────────────────────────────────────
// lexique-fr.js — GÉNÉRÉ, ne pas éditer à la main.
// Source : studio/dino/content/i18n/lexiques-prononciation/fr.md (§2 + §2bis)
// Régénérer : node studio/dino/content/scripts/i18n/_gen-lexique-site.mjs
//
// Respelling FR des noms savants (dinos) pour le TTS navigateur : TTS.speak
// (site/js/tts.js) remplace ces noms par leur graphie phonétique AU MOMENT de
// construire l'utterance speechSynthesis — jamais dans la clé normalisée
// utilisée par voice.js pour retrouver les clips pré-enregistrés.
// ─────────────────────────────────────────────────────────────────────────────
window.LEXIQUE_FR = {
${corps}
};
`;

fs.writeFileSync(OUT, js);
console.log(`${entrees.length} entrées → ${path.relative(ROOT, OUT)} (${ignores} lignes sans respelling ignorées)`);
