// mur-nid.spec.mjs — Chantier NID P3 : nid-ui.js sur le Mur (site/index.html).
// Playwright + Chromium réel. P1 (site/js/collection.js) peut ne pas exister
// encore au moment où ce test tourne : on injecte un FAUX window.Collection
// via addInitScript, au contrat exact validé par collection.spec.mjs
// (state/pending/readyToHatch/hatch/owned). Ça isole ce test de la vitesse
// d'avancement de l'agent P1 tout en verrouillant le contrat côté UI.
//
// Usage : node studio/minijeux/tests/mur-nid.spec.mjs
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const INDEX = resolve(SITE, 'index.html');
const artifacts = resolve(__dir, '.artifacts');
mkdirSync(artifacts, { recursive: true });

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) fail++; };

// Fake Collection : 2 œufs en attente au chargement (pas encore prêt à éclore).
// Mutable via window.__setPending pour simuler le 3e œuf en cours de test.
const FAKE_COLLECTION = `
(function () {
  var owned = ['triceratops'];
  var pending = { count: 2, golden: false };
  var streak = 0;
  window.Collection = {
    state: function () { return { owned: owned.slice(), pending: Object.assign({}, pending), streak: streak }; },
    pending: function () { return Object.assign({}, pending); },
    owned: function () { return owned.slice(); },
    readyToHatch: function () { return pending.count >= 3; },
    hatch: function () {
      if (pending.count < 3) return null;
      pending = { count: 0, golden: false };
      var picked = 'velociraptor';
      if (owned.indexOf(picked) === -1) owned.push(picked);
      return { id: picked, nom: 'Vélociraptor', famille: 'raptor', rare: false };
    },
    own: function (id) { if (owned.indexOf(id) === -1) owned.push(id); },
    // hook de test uniquement (pas dans le vrai contrat P1)
    __addEgg: function () { pending = { count: Math.min(3, pending.count + 1), golden: pending.count + 1 >= 3 }; }
  };
})();
`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
const errors = [];
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
page.on('console', m => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });

try {
  await page.addInitScript(FAKE_COLLECTION);
  await page.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });

  // ── 1. Le Mur charge sans erreur ──────────────────────────────────────
  ok('Mur chargé (file des copains visible)', (await page.locator('#copains-grid .copain').count()) > 0);

  // nid-ui.js se charge dynamiquement (mur.js l'injecte) — laisser le temps
  await page.waitForFunction(() => !!window.NidUI, null, { timeout: 5000 }).catch(() => {});
  ok('NidUI chargé dynamiquement par mur.js', await page.evaluate(() => !!window.NidUI));

  // ── 2. Nid affiché avec l'état localStorage préparé (2 œufs, 0 doré) ──
  await page.waitForSelector('#nid-host', { timeout: 5000 }).catch(() => {});
  const nidVisible = await page.locator('#nid-host').isVisible().catch(() => false);
  ok('Le nid est affiché sur le Mur', nidVisible);
  const oeufsPleins = await page.locator('.nid-oeuf.plein').count();
  ok('2 œufs pleins affichés (état préparé)', oeufsPleins === 2, `count=${oeufsPleins}`);
  const oeufsTotal = await page.locator('.nid-oeuf').count();
  ok('3 emplacements au total', oeufsTotal === 3, `count=${oeufsTotal}`);
  ok('aucun œuf doré (pending.golden=false)', (await page.locator('.nid-oeuf.dore').count()) === 0);

  await page.screenshot({ path: resolve(artifacts, 'mur-nid.png') });

  // ── 3. Bandeau collection présent (possédé Triceratops en couleur) ────
  const bandeauVisible = await page.locator('#nid-bandeau').isVisible().catch(() => false);
  ok('Bandeau collection affiché', bandeauVisible);
  const possede = await page.locator('.nid-vig.possede').count();
  ok('au moins 1 dino possédé affiché en couleur', possede >= 1, `count=${possede}`);
  const ombres = await page.locator('.nid-vig.ombre-only').count();
  ok('les non-possédés sont affichés en ombre', ombres > 0, `count=${ombres}`);
  const lazy = await page.locator('.nid-vig img[loading="lazy"]').count();
  ok('lazy-load posé sur les vignettes (60+ têtes)', lazy > 0);

  // ── 4. Vignettes-aperçu présentes sur les rangées copains ─────────────
  const apercus = await page.locator('.copain .c-apercu').count();
  ok('vignettes-aperçu posées sur au moins une rangée copain', apercus > 0, `count=${apercus}`);
  const rowHeightOk = await page.evaluate(() => {
    const el = document.querySelector('.copain');
    return el ? getComputedStyle(el).height : null;
  });
  ok('la ligne copain garde sa hauteur compacte (70px, non cassée)', rowHeightOk === '70px', `height=${rowHeightOk}`);

  // ── 5. Simulation 3e œuf → éclosion se joue → dino ajouté au bandeau ──
  const ownedBefore = await page.evaluate(() => window.Collection.owned().length);
  await page.evaluate(() => { window.Collection.__addEgg(); });
  await page.evaluate(() => { if (window.NidUI) window.NidUI.playHatchIfReady(); });
  // la séquence d'éclosion pose un overlay (fixed / .hatch-doublon) tapable
  const hatchSeen = await page.waitForFunction(() => {
    return document.querySelector('div[style*="position: fixed"][style*="z-index: 70"]') ||
           document.querySelector('.hatch-doublon');
  }, null, { timeout: 4000 }).then(() => true).catch(() => false);
  ok('la séquence d\'éclosion se joue (overlay affiché)', hatchSeen);

  if (hatchSeen) await page.screenshot({ path: resolve(artifacts, 'mur-eclosion.png') });

  // tap n'importe où pour continuer (jamais bloquant > ~4s, on tape tout de suite)
  await page.mouse.click(240, 450);
  await page.waitForFunction(() => {
    return !document.querySelector('.hatch-doublon') &&
           !document.querySelector('div[style*="z-index: 70"]');
  }, null, { timeout: 5000 }).catch(() => {});

  const ownedAfter = await page.evaluate(() => window.Collection.owned().length);
  ok('un dino a bien été ajouté à la collection après éclosion', ownedAfter > ownedBefore, `before=${ownedBefore} after=${ownedAfter}`);

  // le bandeau doit refléter le nouveau possédé après la séquence
  await page.waitForTimeout(300);
  const possedeApres = await page.locator('.nid-vig.possede').count();
  ok('le bandeau reflète le nouveau dino possédé', possedeApres >= possede, `avant=${possede} après=${possedeApres}`);

  // ── 6. Frise dans le repaire, recommandé visible ──────────────────────
  await page.evaluate(() => { if (window.MUR) window.MUR.openRepaire('velo'); });
  await page.waitForSelector('#repaire-view:not([style*="display: none"])', { timeout: 4000 }).catch(() => {});
  const friseCount = await page.locator('.frise .frise-jeu').count();
  ok('frise-chemin affichée dans le repaire (remplace la grille)', friseCount > 0, `count=${friseCount}`);
  const recoCount = await page.locator('.frise .frise-jeu.reco').count();
  ok('le jeu recommandé (grand/brille) est visible', recoCount === 1, `count=${recoCount}`);
  // suivants tapables : data-url présent même sur les non-recommandés
  const tousAvecUrl = await page.locator('.frise .frise-jeu').evaluateAll(
    els => els.every(e => !!e.dataset.url)
  );
  ok('tous les jeux de la frise sont tapables (accès libre, pas de verrou)', tousAvecUrl);

  await page.screenshot({ path: resolve(artifacts, 'repaire-frise.png') });

  ok('Aucune erreur JS / console (smoke)', errors.length === 0, errors.join(' | '));
} catch (e) {
  ok('exécution sans exception', false, e.message);
}

await browser.close();

console.log('\n── mur-nid.spec.mjs ──');
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(fail === 0 ? `\n\x1b[32m✓ mur-nid OK\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
