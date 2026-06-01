// test-unlock.mjs — étoiles (dérivées) + déblocage PAR CATÉGORIE (2★) + code (sans navigateur)
// Le 1er jeu de chaque catégorie est ouvert ; le suivant DANS la catégorie s'ouvre à 2★.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const JS = resolve(__dir, '..', 'web', 'js');

const mem = {};
globalThis.localStorage = {
  getItem: k => (k in mem ? mem[k] : null),
  setItem: (k, v) => { mem[k] = String(v); },
  removeItem: k => { delete mem[k]; },
};
function seed(id, { plays = 0, perfect = 0 } = {}) {
  const d = JSON.parse(mem['maxplay_progress'] || '{}');
  d.games = d.games || {};
  const history = [];
  for (let i = 0; i < perfect; i++) history.push({ correct: 5, questions: 5, score: 0, maxScore: 0 });
  d.games[id] = { plays: Math.max(plays, perfect), history };
  mem['maxplay_progress'] = JSON.stringify(d);
}

const win = {};
for (const f of ['catalog.js', 'stars.js', 'unlock.js']) new Function('window', readFileSync(resolve(JS, f), 'utf8'))(win);
const { Stars, Unlock } = win;

let fail = 0;
const ok = (name, cond) => { console.log(`  ${cond ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m'}  ${name}`); if (!cond) fail++; };

console.log('\n══ Déblocage par catégorie (2★) + étoiles + code ══\n');
// 1ers de catégorie = ouverts (plusieurs portes d'entrée)
ok('mj-04 ouvert (1er Compter)',   Unlock.isUnlocked('mj-04') === true);
ok('mj-01 ouvert (1er Couleurs)',  Unlock.isUnlocked('mj-01') === true);
ok('mj-06 ouvert (1er Lire)',      Unlock.isUnlocked('mj-06') === true);
ok('mj-19 ouvert (1er Observer)',  Unlock.isUnlocked('mj-19') === true);
ok('mj-12 ouvert (libre)',         Unlock.isUnlocked('mj-12') === true);
// 2e de catégorie = verrouillé
ok('mj-13c verrouillé (2e Compter)', Unlock.isUnlocked('mj-13c') === false);
ok('dinos verrouillé (code)',        Unlock.isUnlocked('dinos') === false);

// 1★ sur mj-04 ne suffit pas ; 2★ ouvre mj-13c (même catégorie)
seed('mj-04', { perfect: 1 });
ok('1★ sur mj-04 → mj-13c encore fermé', Unlock.isUnlocked('mj-13c') === false);
seed('mj-04', { perfect: 2 });
ok('2★ sur mj-04 → mj-13c ouvert',       Unlock.isUnlocked('mj-13c') === true);

// Bâcler n'ouvre rien : mj-13c joué 9× sans étoile → mj-05 (3e Compter) reste fermé
seed('mj-13c', { plays: 9, perfect: 0 });
ok('bâcler mj-13c (9 essais, 0★) → mj-05 fermé', Unlock.isUnlocked('mj-05') === false);

// Plafond maxStars = 5
seed('mj-04', { perfect: 9 });
ok('étoiles plafonnées à 5 (mj-04)', Stars.get('mj-04') === 5 && Stars.max('mj-04') === 5);
ok('mj-04 complété (MAXIMUM)',       Stars.isComplete('mj-04') === true);

// Code dino
const bad = await Unlock.redeem('PASBON');
ok('code invalide refusé',  bad.ok === false);
const good = await Unlock.redeem('  tritri ');
ok('code TRITRI accepté',   good.ok === true && good.bundle === 'dinos');
ok('dinos débloqué',        Unlock.isUnlocked('dinos') === true);

// Console parent : tout ouvert
mem['maxplay_admin'] = JSON.stringify({ unlockAll: true });
ok('console parent → mj-05 ouvert (sans étoiles)', Unlock.isUnlocked('mj-05') === true);
delete mem['maxplay_admin'];
ok('progression remise → mj-05 re-verrouillé',     Unlock.isUnlocked('mj-05') === false);

console.log(fail === 0 ? '\n\x1b[32m✓ logique OK\x1b[0m\n' : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail ? 1 : 0);
