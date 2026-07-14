// Harnais de test de la logique de MERGE de cloud.js (fix audit persistance
// 2026-07-14). Ne teste PAS l'auth Supabase (magic link) : teste _merge et
// _mergeState — le cœur qui protège la progression contre les pertes en Mode 2.
//
// Lance : node studio/minijeux/tests/cloud-merge.test.mjs
// Vert = les 4 findings HAUTE de merge sont corrigés.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLOUD = join(__dirname, '..', '..', '..', 'site', 'js', 'cloud.js');

// ── Stub navigateur : on neutralise init() (pas de réseau, pas de location) ──
function loadCloud() {
  const store = {};
  const win = {
    addEventListener() {}, location: { href: '', pathname: '/' },
  };
  const doc = { addEventListener() {}, visibilityState: 'visible', createElement: () => ({}), head: { appendChild() {} } };
  const sandbox = {
    window: win, document: doc, navigator: {}, console,
    setTimeout, clearTimeout,
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; },
      get length() { return Object.keys(store).length; },
      key: (i) => Object.keys(store)[i],
    },
  };
  // location globale (cloud.js lit `location.href` sans window.)
  sandbox.location = win.location;
  let code = readFileSync(CLOUD, 'utf8');
  // Neutralise l'appel init() final (dernière ligne exécutable) pour éviter le réseau.
  code = code.replace(/\n\s*init\(\);\s*\n\}\)\(window\);\s*$/, '\n})(window);');
  const fn = new Function(...Object.keys(sandbox), code + '\n;return window.Cloud;');
  return { Cloud: fn(...Object.values(sandbox)), store };
}

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log('  \x1b[32mPASS\x1b[0m  ' + name); }
  else { fail++; console.log('  \x1b[31mFAIL\x1b[0m  ' + name + (detail ? '\n        → ' + detail : '')); }
}

const { Cloud } = loadCloud();

console.log('\n── FIX #4 : _merge somme les compteurs (plus de max-pick destructeur) ──');
{
  // 2 appareils jouent le même jeu en parallèle, sessions disjointes.
  const A = { version: 1, games: { 'mj-05': {
    plays: 6, totalQuestions: 18, correctAnswers: 15, totalScore: 60, maxScore: 60,
    history: [
      { date: '2026-07-01T10:00:00.000Z', correct: 3, questions: 3, score: 10, maxScore: 10 },
      { date: '2026-07-01T10:05:00.000Z', correct: 3, questions: 3, score: 10, maxScore: 10 },
    ] } }, sessions: [] };
  const B = { version: 1, games: { 'mj-05': {
    plays: 4, totalQuestions: 12, correctAnswers: 8, totalScore: 40, maxScore: 40,
    history: [
      { date: '2026-07-02T09:00:00.000Z', correct: 2, questions: 3, score: 8, maxScore: 10 },
      { date: '2026-07-02T09:05:00.000Z', correct: 1, questions: 3, score: 5, maxScore: 10 },
    ] } }, sessions: [] };
  const m = Cloud._merge(A, B).games['mj-05'];
  // history unionné = 4 entrées distinctes → correctAnswers = 3+3+2+1 = 9
  check('correctAnswers sommés depuis l\'history unionné', m.correctAnswers === 9, 'got ' + m.correctAnswers + ' (attendu 9)');
  check('totalQuestions sommés', m.totalQuestions === 12, 'got ' + m.totalQuestions);
  check('plays = nb sessions distinctes', m.plays === 4, 'got ' + m.plays + ' (4 history distincts)');
  check('history dédupliqué (4 entrées)', m.history.length === 4, 'got ' + m.history.length);
}

console.log('\n── FIX #4b : _merge ne double-compte pas les sessions communes ──');
{
  const shared = { date: '2026-07-01T10:00:00.000Z', correct: 3, questions: 3, score: 10, maxScore: 10 };
  const A = { version: 1, games: { 'mj-01': { plays: 1, totalQuestions: 3, correctAnswers: 3, totalScore: 10, maxScore: 10, history: [shared] } }, sessions: [] };
  const B = { version: 1, games: { 'mj-01': { plays: 1, totalQuestions: 3, correctAnswers: 3, totalScore: 10, maxScore: 10, history: [{ ...shared }] } }, sessions: [] };
  const m = Cloud._merge(A, B).games['mj-01'];
  check('session partagée comptée une seule fois', m.correctAnswers === 3 && m.plays === 1, 'correct=' + m.correctAnswers + ' plays=' + m.plays);
}

console.log('\n── FIX #2 : _mergeState fusionne mj20_progress par langue (max des tiers) ──');
{
  const A = JSON.stringify({ version: 2, langs: { fr: { unlockedTier: 4 }, es: { unlockedTier: 3 } } });
  const B = JSON.stringify({ version: 2, langs: { fr: { unlockedTier: 4 }, en: { unlockedTier: 4 } } });
  const m = JSON.parse(Cloud._mergeState('mj20_progress', A, B));
  check('espagnol tier 3 préservé (A)', m.langs.es.unlockedTier === 3);
  check('anglais tier 4 préservé (B)', m.langs.en.unlockedTier === 4);
  check('français tier 4 conservé', m.langs.fr.unlockedTier === 4);
}

console.log('\n── FIX #2b : _mergeState prend le MAX quand une langue diffère ──');
{
  const A = JSON.stringify({ version: 2, langs: { es: { unlockedTier: 3, consecutiveCorrect: 5 } } });
  const B = JSON.stringify({ version: 2, langs: { es: { unlockedTier: 1, consecutiveCorrect: 2 } } });
  const m = JSON.parse(Cloud._mergeState('mj20_progress', A, B));
  check('tier = max(3,1) = 3', m.langs.es.unlockedTier === 3, 'got ' + m.langs.es.unlockedTier);
  check('consecutiveCorrect = max(5,2) = 5', m.langs.es.consecutiveCorrect === 5);
}

console.log('\n── FIX #2c : _mergeState union des déblocages (maxplay_unlocks) ──');
{
  const A = JSON.stringify({ TRITRI: true });
  const B = JSON.stringify({ DINOPACK: true });
  const m = JSON.parse(Cloud._mergeState('maxplay_unlocks', A, B));
  check('les 2 bundles débloqués préservés', m.TRITRI === true && m.DINOPACK === true);
}

console.log('\n── FIX #2d : _mergeState union galerie (dessins) dédupliquée ──');
{
  const A = JSON.stringify([{ id: 'd1' }, { id: 'd2' }]);
  const B = JSON.stringify([{ id: 'd2' }, { id: 'd3' }]);
  const m = JSON.parse(Cloud._mergeState('mj32_galerie', A, B));
  check('3 dessins distincts (d2 dédupliqué)', m.length === 3, 'got ' + m.length);
}

console.log('\n── Clé scalaire : _mergeState renvoie null (LWW géré par l\'appelant) ──');
{
  check('maxplay_lang scalaire → null', Cloud._mergeState('maxplay_lang', '"fr"', '"en"') === null);
  check('maxplay_ambiance scalaire → null', Cloud._mergeState('maxplay_ambiance', '"espace"', '"nuit"') === null);
}

console.log('\n── _merge protège les étoiles (history jamais perdu) ──');
{
  // A a une partie parfaite, B pas → l'history parfaite de A doit survivre.
  const A = { version: 1, games: { 'mj-03': { plays: 1, totalQuestions: 3, correctAnswers: 3, totalScore: 30, maxScore: 30, history: [{ date: '2026-07-01T00:00:00.000Z', correct: 3, questions: 3, score: 30, maxScore: 30 }] } }, sessions: [] };
  const B = { version: 1, games: { 'mj-03': { plays: 5, totalQuestions: 15, correctAnswers: 6, totalScore: 60, maxScore: 150, history: [{ date: '2026-07-02T00:00:00.000Z', correct: 1, questions: 3, score: 10, maxScore: 30 }] } }, sessions: [] };
  const m = Cloud._merge(A, B).games['mj-03'];
  const hasPerfect = m.history.some(h => h.correct === h.questions && h.questions > 0);
  check('la partie parfaite de A survit au merge (B a plus de plays)', hasPerfect);
}

console.log('\n' + (fail === 0 ? '\x1b[32m✓ ' + pass + ' PASS' : '\x1b[31m✗ ' + fail + ' FAIL / ' + pass + ' PASS') + '\x1b[0m\n');
process.exit(fail === 0 ? 0 : 1);
