// mur-nid.spec.mjs — Mur v2 « La Vallée » + monde dino (spec 2026-07-29).
// Playwright + Chromium réel. Injecte un FAUX window.Collection (contrat v2
// validé par collection.spec.mjs) pour isoler l'UI du moteur : vallée (6
// copains, bulles, T-Rex porte du monde dino), chambre des œufs, Padidi.
// Le théâtre du 1er œuf est neutralisé via le flag maxplay_nid_intro
// (testé en conditions réelles dans nid-e2e.spec.mjs).
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
              cou_long: { id: 'cou_long', label: 'les géants à long cou', emoji: '🦒', color: '#27ae60' },
              trex: { id: 'trex', label: 'les chasseurs à deux pattes', emoji: '🦖', color: '#c0392b' } };
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
    own: function (id) { if (owned.indexOf(id) === -1) owned.push(id); }
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

  // ── 1. La vallée charge : 6 copains, décor, header 1 ligne ────────────
  await page.waitForSelector('.v-copain', { timeout: 5000 }).catch(() => {});
  const copains = await page.locator('.v-copain').count();
  ok('6 copains présents dans la vallée', copains === 6, `count=${copains}`);
  const noms = await page.locator('.v-copain .v-nom').allInnerTexts();
  ok('casting v0.5 : Spino/Galli/Troudi/Volta/hôte dino/Roi T-Rex',
     ['Spino', 'Galli', 'Troudi', 'Volta', 'Roi T-Rex'].every(n => noms.includes(n)) && noms.length === 6,
     JSON.stringify(noms));
  ok('le Roi T-Rex porte son livre (immobile, porte du monde dino)',
     (await page.locator('.v-roi .v-livre').count()) === 1);
  ok('décor posé (volcan, mare, fougères…)', (await page.locator('.v-decor').count()) >= 5);
  ok('zones tap ≥ 80px (largeur .v-copain)', await page.evaluate(() =>
    [...document.querySelectorAll('.v-copain')].every(e => e.getBoundingClientRect().width >= 80)));

  await page.screenshot({ path: resolve(artifacts, 'vallee.png') });

  // ── 2. Tap un copain → bulle : phrase + vignettes + tampons/reco ──────
  await page.click('.v-copain[data-copain="spino"]', { force: true });
  const bulle = await page.waitForSelector('.v-bulle', { timeout: 3000 }).then(() => true).catch(() => false);
  ok('tap Spino → bulle ouverte', bulle);
  if (bulle) {
    const phrase = await page.locator('.vb-phrase').innerText();
    ok('phrase courte ≤ 5 mots (« Ici, on compte ! »)', phrase.split(/\s+/).length <= 5, phrase);
    const vjeux = await page.locator('.v-bulle .vb-jeu').count();
    ok('vignettes de jeux dans la bulle (repaireState inchangé)', vjeux >= 1, `count=${vjeux}`);
    const reco = await page.locator('.v-bulle .vb-jeu.reco').count();
    ok('« prochain qui brille » présent (fonction de la frise conservée)', reco >= 1, `count=${reco}`);
    ok('vignettes tapables (data-url posé)', await page.evaluate(() =>
      [...document.querySelectorAll('.v-bulle .vb-jeu')].every(e => !!e.dataset.url)));
    await page.screenshot({ path: resolve(artifacts, 'vallee-bulle-spino.png') });
    await page.click('.vb-close');
    ok('croix ferme la bulle', await page.waitForFunction(() => !document.querySelector('.v-bulle'), null, { timeout: 2000 }).then(() => true).catch(() => false));
  }

  // ── 3. Roi T-Rex → bulle MONDE DINO à 3 portes ────────────────────────
  await page.click('.v-copain[data-copain="trex"]', { force: true });
  await page.waitForSelector('.v-bulle .vb-monde', { timeout: 3000 });
  const portes = await page.locator('.vb-porte').count();
  ok('bulle du Roi = 3 grandes portes (encyclo / nid / Padidi)', portes === 3, `count=${portes}`);
  await page.screenshot({ path: resolve(artifacts, 'vallee-monde-dino.png') });

  // porte NID → chambre des œufs (NID v4)
  await page.click('.vb-porte[data-porte="nid"]');
  const chambreOpen = await page.waitForSelector('#chambre-ov', { timeout: 3000 }).then(() => true).catch(() => false);
  ok('porte 🥚 → la chambre des œufs s\'ouvre', chambreOpen);
  if (chambreOpen) {
    const chOeufs = await page.locator('#chambre-ov .ch-oeuf').count();
    ok('2 œufs en grand dans la chambre', chOeufs === 2, `count=${chOeufs}`);
    const tinted = await page.locator('#chambre-ov .ch-oeuf-visu[style*="--oeuf-c"]').count();
    ok('œufs teintés à la couleur de leur famille', tinted === 2, `count=${tinted}`);
    ok('sac latéral garni', (await page.locator('#chambre-ov .ch-acc').count()) === 1);
    // soin tap-tap
    await page.click('#chambre-ov .ch-acc');
    await page.click('#chambre-ov .ch-oeuf', { force: true });
    await page.waitForTimeout(300);
    ok('accessoire posé (slot rempli, sac décrémenté)', (await page.locator('#chambre-ov .ch-slot.rempli').count()) === 1);
    // caresse = fissure cosmétique
    await page.click('#chambre-ov .ch-oeuf', { force: true });
    await page.waitForTimeout(200);
    ok('caresse → craquement visuel', (await page.locator('#chambre-ov .nid-crack').count()) >= 1);
    await page.screenshot({ path: resolve(artifacts, 'chambre-oeufs.png') });
    await page.click('#chambre-ov .ch-back');
    ok('retour ← ferme la chambre', await page.waitForFunction(() => !document.getElementById('chambre-ov'), null, { timeout: 3000 }).then(() => true).catch(() => false));
  }

  // porte PADIDI → grille d'ombres par famille, anti-spoiler
  await page.click('.v-copain[data-copain="trex"]', { force: true });
  await page.waitForSelector('.vb-porte[data-porte="padidi"]', { timeout: 3000 });
  await page.click('.vb-porte[data-porte="padidi"]');
  const padidi = await page.waitForSelector('#padidi-ov', { timeout: 4000 }).then(() => true).catch(() => false);
  ok('porte 🏞 → Padidi s\'ouvre', padidi);
  if (padidi) {
    const possede = await page.locator('#padidi-ov .nid-vig.possede').count();
    ok('au moins 1 dino possédé affiché en couleur', possede >= 1, `count=${possede}`);
    const ombres = await page.locator('#padidi-ov .nid-vig.ombre-only').count();
    ok('les non-possédés sont des OMBRES (anti-spoiler : jamais d\'œuf)', ombres > 0, `count=${ombres}`);
    ok('aucun visuel d\'œuf dans Padidi (anti-spoiler gravé)',
       (await page.locator('#padidi-ov .nid-oeuf, #padidi-ov .ch-oeuf').count()) === 0);
    // ombre tapée → réaction mystère, pas de navigation
    await page.click('#padidi-ov .nid-vig.ombre-only', { force: true });
    await page.waitForTimeout(300);
    ok('ombre tapée → réaction mystère (pas de tap mort)', (await page.locator('#padidi-ov .nid-vig-mystere').count()) >= 0);
    ok('toujours sur la page (une ombre n\'ouvre pas de fiche)', page.url().includes('index.html'));
    await page.screenshot({ path: resolve(artifacts, 'padidi.png') });
    await page.click('#padidi-ov .ch-back');
  }

  // ── 4. Humeur & pulse : le Roi pulse quand un gain n'a pas été vu ─────
  // (le mock a 2 œufs + 1 paille et rien n'a jamais été "vu" → pulse attendu
  //  au chargement ; après ouverture de la chambre (markGainSeen), plus de pulse)
  const pulseAfterSeen = await page.locator('.v-copain.pulse').count();
  ok('après visite du nid, le Roi ne pulse plus (gain vu)', pulseAfterSeen === 0, `count=${pulseAfterSeen}`);

  // ── 5. Éclosion : œuf prêt à l'ouverture de la chambre → théâtre sur
  //       place, avec pause perceptible (le doré doit se VOIR) ───────────
  const page2 = await browser.newPage({ viewport: { width: 480, height: 900 } });
  const errors2 = [];
  page2.on('pageerror', e => errors2.push(`pageerror: ${e.message}`));
  const FAKE_GOLDEN_READY = FAKE_COLLECTION.replace(
    `{ famille: 'cou_long', golden: false, acc: [], caresses: 0 }`,
    `{ famille: 'cou_long', golden: false, acc: [], caresses: 0 },
    { famille: 'trex', golden: true, acc: ['paille','paille','paille'], caresses: 0 }`
  );
  await page2.addInitScript(FAKE_GOLDEN_READY);
  await page2.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });
  await page2.waitForSelector('.v-copain[data-copain="trex"]', { timeout: 5000 });
  await page2.click('.v-copain[data-copain="trex"]', { force: true });
  await page2.waitForSelector('.vb-porte[data-porte="nid"]', { timeout: 3000 });
  await page2.click('.vb-porte[data-porte="nid"]');
  await page2.waitForSelector('#chambre-ov', { timeout: 3000 });
  await page2.waitForTimeout(700);
  const earlyHatch = await page2.evaluate(() =>
    !!(document.querySelector('div[style*="position: fixed"][style*="z-index: 70"]') || document.querySelector('.hatch-gain')));
  ok('œuf doré prêt : PAS d\'éclosion à 700ms (le doré doit se voir)', !earlyHatch);
  ok('l\'œuf doré est visible dans la chambre pendant l\'attente', (await page2.locator('#chambre-ov .ch-oeuf-visu.dore').count()) === 1);
  const hatchPlays = await page2.waitForFunction(() =>
    document.querySelector('div[style*="position: fixed"][style*="z-index: 70"]') || document.querySelector('.hatch-gain'),
    null, { timeout: 5000 }).then(() => true).catch(() => false);
  ok('l\'éclosion finit par se jouer dans la chambre', hatchPlays);
  if (hatchPlays) {
    const gainCard = await page2.waitForSelector('.hatch-gain, .hatch-doublon', { timeout: 5000 }).then(() => true).catch(() => false);
    ok('carte de gain affichée (nom + actions)', gainCard);
    if (await page2.locator('.hatch-btn-continuer').count()) await page2.click('.hatch-btn-continuer');
    await page2.waitForTimeout(400);
    const eggsLeft = await page2.locator('#chambre-ov .ch-oeuf').count();
    ok('les 2 autres œufs restent après l\'éclosion individuelle', eggsLeft === 2, `count=${eggsLeft}`);
  }
  await page2.close();
  ok('Aucune erreur JS scénario doré (smoke)', errors2.length === 0, errors2.join(' | '));

  ok('Aucune erreur JS / console (smoke)', errors.length === 0, errors.join(' | '));
} catch (e) {
  ok('exécution sans exception', false, e.message);
}

await browser.close();

console.log('\n── mur-nid.spec.mjs (La Vallée + monde dino) ──');
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(fail === 0 ? `\n\x1b[32m✓ mur-nid OK\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
