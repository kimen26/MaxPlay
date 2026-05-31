// test-unlock.mjs — logique étoiles (dérivées) + déblocage + code (sans navigateur)
// Les étoiles se déduisent de localStorage['maxplay_progress'] (écrit par tracker.js).
// On simule donc la progression réelle.
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

// Simule la progression que tracker.js écrirait
function seed(id, { plays = 0, perfect = 0 } = {}) {
  const d = JSON.parse(mem['maxplay_progress'] || '{}');
  d.games = d.games || {};
  const history = [];
  for (let i = 0; i < perfect; i++) history.push({ correct: 5, questions: 5, score: 0, maxScore: 0 });
  d.games[id] = { plays: Math.max(plays, perfect), history };
  mem['maxplay_progress'] = JSON.stringify(d);
}

const win = {};
function reload() { for (const f of ['catalog.js', 'stars.js', 'unlock.js']) new Function('window', readFileSync(resolve(JS, f), 'utf8'))(win); }
reload();
let { Stars, Unlock } = win;

let fail = 0;
const ok = (name, cond) => { console.log(`  ${cond ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m'}  ${name}`); if (!cond) fail++; };

console.log('\n══ Étoiles (dérivées) + déblocage + code ══\n');
ok('mj-01 ouvert (1er de la séquence)',  Unlock.isUnlocked('mj-01') === true);
ok('mj-04 verrouillé au départ',         Unlock.isUnlocked('mj-04') === false);
ok('mj-12 (libre) ouvert',               Unlock.isUnlocked('mj-12') === true);
ok('max-adventure ouvert (libre)',       Unlock.isUnlocked('max-adventure') === true);
ok('dinos verrouillé (code requis)',     Unlock.isUnlocked('dinos') === false);
ok('mj-01 : 0 étoile au départ',         Stars.get('mj-01') === 0);

// 1 partie à 100% sur mj-01 → 1★ → mj-04 s'ouvre (option B)
seed('mj-01', { perfect: 1 });
ok('1★ sur mj-01 (partie 100%)',         Stars.get('mj-01') === 1);
ok('1★ → mj-04 débloqué',                Unlock.isUnlocked('mj-04') === true);

// Garde-fou anti-blocage : 4 essais sans réussite ouvrent aussi le suivant
seed('mj-04', { plays: 4, perfect: 0 });
ok('mj-04 sans étoile mais 4 essais',    Stars.get('mj-04') === 0 && Stars.plays('mj-04') === 4);
ok('4 essais → mj-05 débloqué (anti-blocage)', Unlock.isUnlocked('mj-05') === true);

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

console.log(fail === 0 ? '\n\x1b[32m✓ logique OK\x1b[0m\n' : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail ? 1 : 0);
