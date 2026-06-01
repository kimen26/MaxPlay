// test-unlock.mjs — logique étoiles (dérivées) + déblocage (2★) + code (sans navigateur)
// Les étoiles se déduisent de localStorage['maxplay_progress'] (écrit par tracker.js).
// Règle figée : le suivant s'ouvre à 2 parties 100% (2★). Bâcler n'ouvre RIEN.
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

console.log('\n══ Étoiles (dérivées) + déblocage 2★ + code ══\n');
ok('seuil de déblocage = 2★',            Unlock.UNLOCK_STARS === 2);
ok('mj-01 ouvert (1er de la séquence)',  Unlock.isUnlocked('mj-01') === true);
ok('mj-04 verrouillé au départ',         Unlock.isUnlocked('mj-04') === false);
ok('mj-12 (libre) ouvert',               Unlock.isUnlocked('mj-12') === true);
ok('dinos verrouillé (code requis)',     Unlock.isUnlocked('dinos') === false);

// 1 partie 100% = 1★ → PAS encore assez (il en faut 2)
seed('mj-01', { perfect: 1 });
ok('1★ sur mj-01',                       Stars.get('mj-01') === 1);
ok('1★ NE débloque PAS mj-04 (il faut 2★)', Unlock.isUnlocked('mj-04') === false);

// 2 parties 100% = 2★ → ouvre mj-04
seed('mj-01', { perfect: 2 });
ok('2★ sur mj-01',                       Stars.get('mj-01') === 2);
ok('2★ → mj-04 débloqué',                Unlock.isUnlocked('mj-04') === true);

// Bâcler n'ouvre RIEN : beaucoup d'essais, 0 réussite → reste fermé
seed('mj-04', { plays: 9, perfect: 0 });
ok('mj-04 : 9 essais, 0 étoile',         Stars.get('mj-04') === 0 && Stars.plays('mj-04') === 9);
ok('bâcler (9 essais, 0★) → mj-05 RESTE fermé', Unlock.isUnlocked('mj-05') === false);

// Plafond maxStars (mj-01 = 3)
seed('mj-01', { perfect: 9 });
ok('étoiles plafonnées à maxStars (mj-01=3)', Stars.get('mj-01') === 3 && Stars.max('mj-01') === 3);
ok('mj-01 complété (trophée MAXIMUM)',   Stars.isComplete('mj-01') === true);

// Code dino (async, casse/espaces)
const bad = await Unlock.redeem('PASBON');
ok('code invalide refusé',               bad.ok === false);
const good = await Unlock.redeem('  tritri ');
ok('code TRITRI accepté',                good.ok === true && good.bundle === 'dinos');
ok('dinos débloqué après code',          Unlock.isUnlocked('dinos') === true);

// Console parent : "tout débloquer" ouvre tout, même sans étoiles ni code
mem['maxplay_admin'] = JSON.stringify({ unlockAll: true });
ok('console parent → mj-13c ouvert (sans étoiles)', Unlock.isUnlocked('mj-13c') === true);
ok('console parent → dinos ouvert (sans code)',     Unlock.isUnlocked('dinos') === true);
delete mem['maxplay_admin'];
ok('progression remise → mj-13c re-verrouillé',     Unlock.isUnlocked('mj-13c') === false);

console.log(fail === 0 ? '\n\x1b[32m✓ logique OK\x1b[0m\n' : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail ? 1 : 0);
