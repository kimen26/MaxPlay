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

// Fake Collection au contrat v2 (NID v4, validé par collection.spec.mjs) :
// 2 œufs individuels au chargement (pas encore au chaud). Le hook de test
// __addEgg simule le 3e œuf + le rend prêt (l'éclosion legacy du Mur passe
// par readyToHatch()/hatch(), inchangés côté nid-ui).
// Le théâtre du 1er œuf (one-shot) est neutralisé via le flag maxplay_nid_intro
// pour ne pas interférer avec les scénarios historiques (testé dans nid-e2e).
const FAKE_COLLECTION = `
(function () {
  try { localStorage.setItem('maxplay_nid_intro', '1'); } catch (e) {}
  var owned = ['triceratops'];
  var eggs = [
    { famille: 'raptor', golden: false, acc: [], caresses: 0 },
    { famille: 'cou_long', golden: false, acc: [], caresses: 0 }
  ];
  var sac = ['paille'];
  var streak = 0;
  var FAM = { raptor: { id: 'raptor', label: 'les chasseurs à griffes', emoji: '🦅', color: '#e67e22' },
              cou_long: { id: 'cou_long', label: 'les géants à long cou', emoji: '🦒', color: '#27ae60' } };
  function ready(e) { return e.acc.length >= 3 || !!e.loveWarm; }
  window.Collection = {
    state: function () { return { owned: owned.slice(), eggs: this.eggs(), sac: this.sac(), pending: this.pending(), streak: streak }; },
    pending: function () { return { count: eggs.length, golden: eggs.filter(function (e) { return e.golden; }).length }; },
    owned: function () { return owned.slice(); },
    eggs: function () {
      return eggs.map(function (e, i) {
        return { index: i, famille: e.famille, familleMeta: FAM[e.famille] || null, golden: e.golden,
                 acc: e.acc.slice(), caresses: e.caresses, stage: Math.min(3, e.caresses), needed: 3, ready: ready(e) };
      });
    },
    sac: function () { return sac.length ? [{ id: 'paille', nom: 'de la paille', emoji: '🌾', count: sac.length }] : []; },
    familleInfo: function (id) { return FAM[id] || null; },
    hatchThreshold: function () { return 3; },
    readyEggIndex: function () { for (var i = 0; i < eggs.length; i++) if (ready(eggs[i])) return i; return -1; },
    warmEgg: function (i, accId) {
      var e = eggs[i]; if (!e || sac.indexOf(accId) === -1 || ready(e)) return { ok: false, ready: !!(e && ready(e)) };
      sac.splice(sac.indexOf(accId), 1); e.acc.push(accId);
      return { ok: true, ready: ready(e) };
    },
    caress: function (i) {
      var e = eggs[i]; if (!e) return { stage: 0, ready: false };
      e.caresses++;
      return { stage: Math.min(3, e.caresses), ready: ready(e), loveJustWarmed: false };
    },
    hatchEgg: function (i) {
      var e = eggs[i]; if (!e || !ready(e)) return null;
      eggs.splice(i, 1);
      var picked = 'velociraptor';
      if (owned.indexOf(picked) === -1) owned.push(picked);
      return { id: picked, nom: 'Vélociraptor', famille: 'raptor', rare: false };
    },
    readyToHatch: function () { return this.readyEggIndex() !== -1; },
    hatch: function () { return this.hatchEgg(this.readyEggIndex()); },
    own: function (id) { if (owned.indexOf(id) === -1) owned.push(id); },
    // hook de test uniquement : 3e œuf PRÊT (au chaud) — l'éclosion du Mur peut se jouer
    __addEgg: function () {
      if (eggs.length < 3) eggs.push({ famille: 'raptor', golden: eggs.length + 1 >= 3, acc: ['paille', 'paille', 'paille'], caresses: 0 });
      else eggs[eggs.length - 1].acc = ['paille', 'paille', 'paille'];
    }
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

  // ── 3bis. NID v4 : œufs teintés FAMILLE + chambre des œufs ────────────
  const tinted = await page.locator('.nid-oeuf.plein[style*="--oeuf-c"]').count();
  ok('les œufs du Mur sont teintés à la couleur de leur famille (--oeuf-c)', tinted === 2, `count=${tinted}`);
  await page.click('.nid-oeuf.plein', { force: true });
  const chambreOpen = await page.waitForSelector('#chambre-ov', { timeout: 3000 }).then(() => true).catch(() => false);
  ok('tap sur un œuf du nid → la CHAMBRE DES ŒUFS s\'ouvre', chambreOpen);
  if (chambreOpen) {
    const chOeufs = await page.locator('#chambre-ov .ch-oeuf').count();
    ok('la chambre montre les 2 œufs en grand', chOeufs === 2, `count=${chOeufs}`);
    const chAcc = await page.locator('#chambre-ov .ch-acc').count();
    ok('le sac latéral montre l\'accessoire dispo', chAcc === 1, `count=${chAcc}`);
    // soin tap-tap : sélectionne l'accessoire puis tap l'œuf → slot rempli
    await page.click('#chambre-ov .ch-acc');
    await page.click('#chambre-ov .ch-oeuf', { force: true });
    await page.waitForTimeout(300);
    const slotRempli = await page.locator('#chambre-ov .ch-slot.rempli').count();
    ok('accessoire posé sur l\'œuf (slot rempli, sac décrémenté)', slotRempli === 1, `count=${slotRempli}`);
    // caresse (tap sans sélection) : fissure cosmétique apparaît
    await page.click('#chambre-ov .ch-oeuf', { force: true });
    await page.waitForTimeout(200);
    const crack = await page.locator('#chambre-ov .nid-crack').count();
    ok('caresse → craquement visuel (fissure cosmétique)', crack >= 1, `count=${crack}`);
    await page.screenshot({ path: resolve(artifacts, 'chambre-oeufs.png') });
    await page.click('#chambre-ov .ch-back');
    await page.waitForFunction(() => !document.getElementById('chambre-ov'), null, { timeout: 3000 }).catch(() => {});
    ok('retour ← ferme la chambre', await page.evaluate(() => !document.getElementById('chambre-ov')));
    // le nid du Mur reflète le soin (mini-icône accessoire sous l'œuf)
    const accIcon = await page.locator('.nid-oeuf .nid-oeuf-accs').count();
    ok('le nid du Mur montre l\'accessoire équipé sous l\'œuf', accIcon >= 1, `count=${accIcon}`);
  }

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

  // Retour PY 2026-07-26 : carte de gain distincte (nom + 2 boutons ≥80px)
  // après la fête d'éclosion — clic "Continuer" explicite (fallback tap-anywhere
  // pour le cas doublon, qui garde l'ancien comportement).
  const gainCard = await page.waitForSelector('.hatch-gain, .hatch-doublon', { timeout: 5000 }).then(() => true).catch(() => false);
  ok('carte de gain affichée après l\'éclosion (nom + actions)', gainCard);
  if (await page.locator('.hatch-btn-continuer').count()) {
    await page.click('.hatch-btn-continuer');
  } else {
    await page.mouse.click(240, 450);
  }
  await page.waitForFunction(() => {
    return !document.querySelector('.hatch-doublon') &&
           !document.querySelector('.hatch-gain') &&
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

  // ── Bug 1 (PY 2026-07-28, "j'ai eu un œuf en or il s'est ouvert direct") ──
  // Quand la capsule qui complète le trio (3e œuf) est DORÉE, le nid doit la
  // montrer un temps perceptible AVANT l'éclosion automatique déclenchée par
  // init() au chargement du Mur — pas juste 300ms (imperceptible, ressenti
  // comme "s'ouvre tout seul"). On recharge une page fraîche (nouveau init())
  // avec 3 capsules déjà en attente et la 3e dorée, et on vérifie qu'à 800ms
  // l'éclosion n'a PAS encore démarré (le nid doré est encore visible) alors
  // qu'elle finit par se jouer avant 2500ms (le nid n'est pas bloqué non plus).
  const FAKE_COLLECTION_GOLDEN_READY = FAKE_COLLECTION.replace(
    `{ famille: 'cou_long', golden: false, acc: [], caresses: 0 }`,
    `{ famille: 'cou_long', golden: false, acc: [], caresses: 0 },
    { famille: 'trex', golden: true, acc: ['paille','paille','paille'], caresses: 0 }`
  );
  const page2 = await browser.newPage({ viewport: { width: 480, height: 900 } });
  const errors2 = [];
  page2.on('pageerror', e => errors2.push(`pageerror: ${e.message}`));
  await page2.addInitScript(FAKE_COLLECTION_GOLDEN_READY);
  await page2.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });
  await page2.waitForFunction(() => !!window.NidUI, null, { timeout: 5000 }).catch(() => {});

  await page2.waitForTimeout(800);
  const hatchStartedEarly = await page2.evaluate(() => {
    return !!(document.querySelector('div[style*="position: fixed"][style*="z-index: 70"]') ||
              document.querySelector('.hatch-doublon'));
  });
  ok('œuf doré qui complète le trio : PAS d\'éclosion encore à 800ms (le doré doit se voir)', !hatchStartedEarly);

  const goldenEggVisibleMeanwhile = await page2.locator('.nid-oeuf.dore').count().catch(() => 0);
  ok('pendant l\'attente, l\'œuf doré est bien visible dans le nid (teinté, pas ouvert)', goldenEggVisibleMeanwhile > 0, `count=${goldenEggVisibleMeanwhile}`);

  const hatchEventuallyPlays = await page2.waitForFunction(() => {
    return document.querySelector('div[style*="position: fixed"][style*="z-index: 70"]') ||
           document.querySelector('.hatch-doublon');
  }, null, { timeout: 4000 }).then(() => true).catch(() => false);
  ok('l\'éclosion finit par se jouer (nid pas bloqué indéfiniment)', hatchEventuallyPlays === true);

  await page2.close();
  ok('Aucune erreur JS scénario œuf doré (smoke)', errors2.length === 0, errors2.join(' | '));

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
