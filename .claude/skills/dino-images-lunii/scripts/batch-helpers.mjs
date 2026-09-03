// Helpers partagés pour les scripts batch-dino-*.mjs
// Gestion du state, quota, pause adaptative, sanitizer de noms

import { readFileSync, existsSync, writeFileSync, statSync } from 'node:fs';

/**
 * Crée un gestionnaire de state pour un batch de génération d'images.
 * @param {string} outDir - Répertoire de sortie (où _BATCH-STATE.json sera stocké)
 * @param {number} dailyLimit - Limite quotidienne (défaut: 20)
 */
export function createBatchState(outDir, dailyLimit = 20) {
  const stateFile = outDir + '/_BATCH-STATE.json';

  function load() {
    if (!existsSync(stateFile)) {
      return { countToday: 0, lastGenDate: null, completedIds: [], failedIds: [], backoffMs: 0 };
    }
    const state = JSON.parse(readFileSync(stateFile, 'utf8'));
    const today = new Date().toISOString().split('T')[0];
    const lastDate = state.lastGenDate ? state.lastGenDate.split('T')[0] : null;
    if (lastDate !== today) {
      state.countToday = 0;
      state.backoffMs = 0;
    }
    return state;
  }

  function save(state) {
    writeFileSync(stateFile, JSON.stringify(state, null, 2));
  }

  function checkQuota(state) {
    if (state.countToday >= dailyLimit) {
      console.log(`\n⛔ QUOTA JOURNALIER ATTEINT (${state.countToday}/${dailyLimit} images).`);
      console.log(`   Reprendre demain ou utiliser un autre compte ChatGPT.`);
      process.exit(5);
    }
  }

  function adaptivePause(state) {
    const baseDelay = state.countToday < 12 ? 10000 :   // Phase 1 : 10s
                      state.countToday < 18 ? 60000 :   // Phase 2 : 1min
                      state.countToday < 20 ? 300000 :  // Phase 3 : 5min
                      600000;                            // Phase 4 : 10min
    const jitter = Math.floor(Math.random() * 5000);
    const delay = baseDelay + jitter;
    console.log(`  (pause ${(delay/1000).toFixed(0)}s — image ${state.countToday + 1}/${dailyLimit})`);
    const start = Date.now();
    while (Date.now() - start < delay) { /* spinlock synchrone */ }
  }

  function sanitizeFileName(name) {
    return name
      .replace(/^grok\//, '')
      .replace(/\.(jpg|png)$/i, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');
  }

  function recordSuccess(state, id) {
    state.completedIds.push(id);
    state.countToday++;
    state.lastGenDate = new Date().toISOString();
    state.backoffMs = 0;
  }

  function recordFailure(state, id) {
    if (!state.failedIds.includes(id)) {
      state.failedIds.push(id);
    }
  }

  function isCompleted(state, id) {
    return state.completedIds.includes(id);
  }

  return {
    load, save, checkQuota, adaptivePause, sanitizeFileName,
    recordSuccess, recordFailure, isCompleted, dailyLimit
  };
}

/**
 * Vérifie si une génération a réussi en vérifiant le fichier de sortie.
 * @param {string} outPath - Chemin du fichier généré
 * @param {number} resultCode - Code retour du script de génération
 */
export function checkSuccess(outPath, resultCode) {
  return resultCode === 0 && existsSync(outPath) && statSync(outPath).size > 1000;
}
