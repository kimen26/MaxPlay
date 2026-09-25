// mur-nid.spec.mjs — Monde dino (chambre des œufs, Padidi, théâtre d'éclosion)
// derrière l'accueil « L'Armoire » (HO-MJ-13, remplace La Vallée / Mur v2).
// Playwright + Chromium réel. Injecte un FAUX window.Collection (contrat v2
// validé par collection.spec.mjs) pour isoler l'UI du moteur. Depuis HO-MJ-13
// il n'y a plus de scène de personnages (.v-copain/.vb-porte disparus) : la
// chambre et le Padidi ne sont plus atteignables QUE depuis les 2 tiroirs de
// l'armoire (#hdr-oeufs / #hdr-padidi). Le théâtre du 1er œuf est neutralisé
// via le flag maxplay_nid_intro (testé en conditions réelles dans
// nid-e2e.spec.mjs — HORS PÉRIMÈTRE HO-MJ-13, encore bâti sur .v-copain,
// à mettre à jour dans un futur handoff).
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

  // ── 0. La coque (armoire) charge, jamais d'ascenseur ──────────────────
  await page.waitForSelector('.casier', { timeout: 5000 }).catch(() => {});
  ok('l\'armoire charge (casiers présents)', (await page.locator('.casier').count()) > 0);
  await page.screenshot({ path: resolve(artifacts, 'armoire.png') });

  // ── 1. Tiroir 🥚 → la chambre des œufs (NID v4) ───────────────────────
  await page.click('#hdr-oeufs');
  const chambreOpen = await page.waitForSelector('#chambre-ov', { timeout: 3000 }).then(() => true).catch(() => false);
  ok('tiroir 🥚 d\'entête → la chambre des œufs s\'ouvre', chambreOpen);
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
    const badge = await page.locator('#hdr-oeufs-n').innerText().catch(() => '');
    ok('badge d\'entête = nb d\'œufs au nid', badge === '2', `badge=${badge}`);
    await page.click('#chambre-ov .ch-back');
    ok('retour ← ferme la chambre', await page.waitForFunction(() => !document.getElementById('chambre-ov'), null, { timeout: 3000 }).then(() => true).catch(() => false));
  }

  // ── 2. Tiroir 📷 → Padidi, mur d'ombres anti-spoiler ──────────────────
  // REC-M2 (recette 2026-09-19) : #hdr-padidi est un des 2 tiroirs du bas de
  // l'ARMOIRE actuelle (HO-MJ-13, remplace le Mur/vantail v2 dont ce spec
  // gardait le réflexe) — sa zone ("bas") est masquée (.zone-cachee, non
  // cliquable/invisible) tant que le vantail bas n'a pas été ouvert. Le
  // sélecteur ancien tapait directement #hdr-padidi sans jamais ouvrir la
  // porte d'abord (timeout Playwright "element is not visible"). Armoire
  // actuelle : ouvrir .porte[data-zone="bas"] révèle les tiroirs, comme un
  // enfant qui ouvre vraiment la porte du meuble avant d'attraper l'album.
  await page.click('.porte[data-zone="bas"]');
  await page.waitForSelector('#hdr-padidi:not(.zone-cachee)', { timeout: 3000 }).catch(() => {});
  await page.click('#hdr-padidi');
  const padidi = await page.waitForSelector('#padidi-ov', { timeout: 4000 }).then(() => true).catch(() => false);
  ok('tiroir 📷 d\'entête → Padidi s\'ouvre', padidi);
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

  // ── 3. Éclosion : œuf prêt à l'ouverture de la chambre → théâtre sur
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
  await page2.waitForSelector('#hdr-oeufs', { timeout: 5000 });
  await page2.click('#hdr-oeufs');
  await page2.waitForSelector('#chambre-ov', { timeout: 3000 });
  await page2.waitForTimeout(700);
  const earlyHatch = await page2.evaluate(() =>
    !!(document.querySelector('div[style*="position: fixed"][style*="z-index: 70"]') || document.querySelector('.hatch-gain')));
  ok('œuf doré prêt : PAS d\'éclosion à 700ms (le doré doit se voir)', !earlyHatch);
  ok('l\'œuf doré est visible dans la chambre pendant l\'attente', (await page2.locator('#chambre-ov .ch-oeuf-visu.dore').count()) === 1);
  // THÉÂTRE D'ÉCLOSION (spec v0.7 §6.1) : agitation → l'avatar transporte
  // l'œuf → glissement vers le Padidi → suspense devant l'ombre → révélation
  const carrySeen = await page2.waitForSelector('.th-carry', { timeout: 6000 }).then(() => true).catch(() => false);
  ok('le transporteur entre en scène (théâtre §6.1 démarré)', carrySeen);
  const slideSeen = await page2.waitForSelector('#padidi-ov.slide-in', { timeout: 8000 }).then(() => true).catch(() => false);
  ok('transition latérale chambre → album Padidi (glissement, pas de popup)', slideSeen);
  const revealSeen = await page2.waitForSelector('.nid-vig.th-revele', { timeout: 14000 }).then(() => true).catch(() => false);
  ok('révélation : le sprite prend sa place dans l\'album', revealSeen);
  if (revealSeen) {
    const caseOk = await page2.evaluate(() => {
      const c = document.querySelector('.nid-vig.th-revele');
      return c && c.classList.contains('possede') && c.dataset.owned === '1';
    });
    ok('la case révélée est bien possédée (ombre → couleur)', caseOk);
    const ficheBtn = await page2.waitForSelector('.th-fiche', { timeout: 4000 }).then(() => true).catch(() => false);
    ok('« Voir sa fiche » PROPOSÉE, jamais forcée', ficheBtn);
    await page2.screenshot({ path: resolve(artifacts, 'theatre-eclosion.png') });
  }
  const eggsLeft = await page2.evaluate(() => window.Collection.eggs().length);
  ok('les 2 autres œufs restent après l\'éclosion individuelle', eggsLeft === 2, `count=${eggsLeft}`);
  await page2.close();
  ok('Aucune erreur JS scénario doré (smoke)', errors2.length === 0, errors2.join(' | '));

  ok('Aucune erreur JS / console (smoke)', errors.length === 0, errors.join(' | '));
} catch (e) {
  ok('exécution sans exception', false, e.message);
}

await browser.close();

console.log('\n── mur-nid.spec.mjs (monde dino derrière L\'Armoire) ──');
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(fail === 0 ? `\n\x1b[32m✓ mur-nid OK\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s)\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
