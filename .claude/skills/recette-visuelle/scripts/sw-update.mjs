#!/usr/bin/env node
// sw-update.mjs — scénario "visite 1 (ancienne version) -> déploiement ->
// visite 2" pour vérifier qu'une bascule de service worker recharge la page
// UNE seule fois et ne laisse qu'un seul cache de coquille actif (L-148 :
// incident 2026-09-28, armoire v6 réapparue après passage en v8 parce que la
// coquille cache-first servait encore l'ancienne version).
//
// Usage : node sw-update.mjs [--page site/index.html] [--sw-version-file site/js/gen/sw-version.js]
//
// Modifie temporairement sw-version.js (nouveau hash factice) puis LE
// RESTAURE TOUJOURS (try/finally), y compris en cas d'erreur — vérifier après
// coup avec `git diff --stat <fichier>` (doit être vide).
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import { serveLocal } from './lib/serve-local.mjs';

function parseArgs(argv) {
  const out = { page: 'site/index.html', swVersionFile: 'site/js/gen/sw-version.js' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--page') out.page = argv[++i];
    else if (a === '--sw-version-file') out.swVersionFile = argv[++i];
  }
  return out;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const versionPath = resolve(args.swVersionFile);
  const original = readFileSync(versionPath, 'utf8');
  const match = original.match(/self\.SW_VERSION\s*=\s*'([^']+)'/);
  if (!match) {
    console.error(`Format inattendu dans ${versionPath} — attendu: self.SW_VERSION = '<hash>';`);
    process.exit(2);
  }

  const local = resolve(args.page);
  const served = await serveLocal(local);
  const browser = await chromium.launch();

  let reloadCount = 0;
  let restored = false;

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Visite 1 : installation initiale, aucun contrôleur avant -> sw-register.js
    // ne doit PAS recharger (règle explicite du fichier).
    await page.goto(served.url, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => navigator.serviceWorker.controller, { timeout: 10000 }).catch(() => {
      console.warn('Avertissement : aucun controller après la visite 1 (service worker non enregistré ? vérifier location.protocol / support).');
    });

    // Déploiement simulé : nouveau hash.
    const fakeHash = `test${Date.now().toString(16)}`;
    const updated = original.replace(/self\.SW_VERSION\s*=\s*'[^']+'/, `self.SW_VERSION = '${fakeHash}'`);
    writeFileSync(versionPath, updated, 'utf8');

    // Visite 2 : même page, même contexte (le service worker existant reste
    // installé) — on redemande la navigation pour déclencher la détection de
    // mise à jour du navigateur. On ne compte que les rechargements
    // déclenchés PAR LA PAGE ELLE-MÊME (sw-register.js sur controllerchange),
    // pas cette navigation initiale : le compteur démarre après le goto.
    await page.goto(served.url, { waitUntil: 'networkidle' });
    page.on('load', () => { reloadCount++; });
    // Laisser le temps au cycle install/activate/controllerchange de se jouer.
    await page.waitForTimeout(3000);

    const cacheKeys = await page.evaluate(async () => (await caches.keys()));
    const shellCaches = cacheKeys.filter((k) => /shell|precache|app/i.test(k));

    await context.close();

    console.log(`Rechargements observés après déploiement simulé : ${reloadCount} (attendu : 1, jamais 0 ni 2+)`);
    console.log(`Caches présents : ${JSON.stringify(cacheKeys)}`);
    console.log(`Caches de coquille détectés : ${JSON.stringify(shellCaches)} (attendu : 1 seul)`);

    const ok = reloadCount === 1 && shellCaches.length <= 1;
    console.log(ok ? 'OK : bascule conforme.' : 'PROBLEME : bascule non conforme, voir L-148.');
    process.exitCode = ok ? 0 : 1;
  } finally {
    writeFileSync(versionPath, original, 'utf8');
    restored = true;
    await browser.close();
    await served.close();
    if (restored) console.log(`Restauré : ${versionPath}`);
  }
}

run().catch(async (err) => { console.error(err); process.exit(1); });
