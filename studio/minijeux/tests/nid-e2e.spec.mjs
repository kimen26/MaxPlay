// nid-e2e.spec.mjs — CHANTIER NID, preuve d'intégration bout-en-bout, EN
// CONDITIONS RÉELLES. Playwright + Chromium réel, AUCUN mock (contrairement
// à mur-nid.spec.mjs qui injecte un faux window.Collection pour isoler
// l'UI) : ici, vrais fichiers, vraie navigation file:// entre l'armoire
// (site/index.html) et un jeu golden (site/mj-24.html), vrai localStorage
// persistant entre les pages (même origine file://), vrai moteur
// site/js/collection.js.
//
// RÉÉCRIT le 2026-09-25 (EP-134) : l'ancien fichier pilotait encore la
// scène « La Vallée » (.v-copain/.vb-porte), remplacée par L'Armoire depuis
// HO-MJ-13 (2026-09-15) puis par le meuble v8 (HO-MJ-22) — 16 sélecteurs
// morts, rouge en silence depuis (`run-all.mjs` ne lance pas les specs
// autonomes, découvert HO-MJ-21). Repris sur le squelette de
// mur-nid.spec.mjs (sélecteurs .am-porte/.am-tiroir/#hdr-oeufs à jour), en
// gardant ce qui fait la valeur PROPRE de ce fichier : zéro mock, un vrai
// gain d'œuf via une vraie partie gagnée, un vrai localStorage qui
// traverse deux pages.
//
// Scénario :
//   1. Armoire vierge → nid vide (Collection.eggs().length === 0)
//   2. Partie complète mj-24 (chemin gagnant scripté) → œuf réel persisté
//   3. Retour à l'armoire → badge 🥚 = 1, chambre réelle affiche cet œuf
//   4. Seuil du tout 1er œuf = 1 accessoire (FIRST_WARMTH_COST, collection.js) ;
//      le sac est vide après une seule partie (grantReward ne pousse un
//      accessoire que si le nid n'est ni vide ni plein — ici il vient de
//      passer de vide à 1). On fige donc le sac à 1 accessoire par
//      localStorage (même fixture explicite que HO-MJ-19/mj-golden-nid :
//      on ne mock RIEN, collection.js relit cet état réel, on évite juste
//      de dépendre d'un tirage 50/50 pour un scénario déterministe).
//   5. Soin tap-tap RÉEL dans la chambre → œuf prêt → théâtre d'éclosion
//      (transporteur → glissement Padidi → révélation → fiche proposée)
//   6. Un dino réellement ajouté à Collection.owned(), œuf + sac consommés
//   7. Zéro erreur console (hors 404 ombres/paléoart pré-existants, listés)
//
// Usage : cd studio/minijeux/tests && node nid-e2e.spec.mjs
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
const KNOWN_404 = []; // 404 ombres/paleoart pré-existants tolérés, remplis en marchant si observés
const errors = [];

function url(mj) { return pathToFileURL(resolve(SITE, `${mj}.html`)).href; }

// Joue une partie mj-golden COMPLÈTE (chemin gagnant scripté, sans-faute) sur
// un jeu à choix (.dino-tile[data-correct]) — mj-24 partage ce pattern.
async function playPerfectDinoTileGame(page) {
  const panneau = page.locator('#ri-panneau.on');
  if (await panneau.count()) { await page.click('#ri-ok'); await page.waitForTimeout(200); }
  for (let i = 0; i < 8; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 6000 }).catch(() => {});
    await page.click('.dino-tile[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.waitForSelector('.end-wrap', { timeout: 8000 });
}

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });
const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
// Chromium loggue "Failed to load resource: net::ERR_FILE_NOT_FOUND" en console.error
// SANS l'URL (le detail vit dans l'évènement network 'requestfailed'). On corrèle :
// un requestfailed sur une IMAGE (png/jpg/webp) juste avant = 404 pré-existant connu
// (ombres/paleoart dino manquants, cf memory/state.md) → toléré, mais LISTÉ, jamais
// avalé en silence. Tout le reste (JS, JSON, erreur logique) reste bloquant.
let lastImage404 = null;
page.on('requestfailed', r => {
  if (/net::ERR_FILE_NOT_FOUND/i.test(r.failure()?.errorText || '') && /\.(png|jpg|jpeg|webp)$/i.test(r.url())) {
    lastImage404 = r.url();
    KNOWN_404.push(`404 image pré-existant : ${r.url()}`);
  }
});
page.on('console', m => {
  if (m.type() !== 'error') return;
  const t = m.text();
  if (/Failed to load resource.*net::ERR_FILE_NOT_FOUND/i.test(t) && lastImage404) {
    lastImage404 = null; // consommé — corrélé au requestfailed juste précédent
    return;
  }
  errors.push(`console.error: ${t}`);
});

try {
  // ═══ 1. CONTEXTE VIERGE — l'armoire, nid vide ═══════════════════════════
  await page.goto(url('index'), { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  await page.waitForSelector('.casier', { state: 'attached', timeout: 5000 });
  ok('l\'armoire charge (casiers présents)', (await page.locator('.casier').count()) > 0);
  await page.waitForFunction(() => !!window.Collection, null, { timeout: 5000 }).catch(() => {});
  ok('Collection.js chargé sur l\'armoire (moteur nid)', await page.evaluate(() => !!window.Collection));

  const eggsAtStart = await page.evaluate(() => window.Collection.eggs().length);
  ok('nid vide au départ (0 œuf)', eggsAtStart === 0, `count=${eggsAtStart}`);

  const badgeAtStart = await page.locator('#hdr-oeufs-n').evaluate(el => getComputedStyle(el).display).catch(() => 'none');
  ok('badge 🥚 masqué quand le nid est vide', badgeAtStart === 'none', `display=${badgeAtStart}`);

  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-1-armoire-vierge.png') });

  // ═══ 2. PARTIE COMPLÈTE — mj-24 (golden simple, .dino-tile), VRAI gain ══
  await page.goto(url('mj-24'), { waitUntil: 'networkidle' });
  await playPerfectDinoTileGame(page);

  ok('écran de fin affiché (.end-wrap)', (await page.locator('.end-wrap').count()) === 1);
  ok('3 boutons data-act présents (replay/home + next si dispo)',
     (await page.locator('[data-act="replay"]').count()) === 1 &&
     (await page.locator('[data-act="home"]').count()) === 1);

  // Nid vide → le gain de la 1re partie est FORCÉMENT un œuf, individuel,
  // avec sa famille (couleur connue dès le gain) — logique réelle de
  // collection.js grantReward(), pas un mock.
  const capsule1 = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw) : null;
  });
  ok('œuf réel persisté (eggs[] individuel avec famille)',
     !!capsule1 && capsule1.eggs.length === 1 && !!capsule1.eggs[0].famille,
     JSON.stringify(capsule1));

  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-2-fin-oeuf.png') });

  // ═══ 3. RETOUR À L'ARMOIRE → badge 🥚 = 1, chambre affiche l'œuf ═══════
  await page.goto(url('index'), { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.Collection, null, { timeout: 5000 }).catch(() => {});

  const badge1 = await page.locator('#hdr-oeufs-n').innerText().catch(() => '');
  ok('badge 🥚 d\'entête = 1 après le gain', badge1 === '1', `badge=${badge1}`);

  await page.click('#hdr-oeufs');
  const chambreOpen = await page.waitForSelector('#chambre-ov', { timeout: 3000 }).then(() => true).catch(() => false);
  ok('tap sur la case 🥚 → la chambre des œufs s\'ouvre', chambreOpen);
  if (chambreOpen) {
    ok('1 œuf réel affiché dans la chambre', (await page.locator('#chambre-ov .ch-oeuf').count()) === 1);
    ok('le sac est vide (une seule partie jouée, pas d\'accessoire tiré)',
       (await page.locator('#chambre-ov .ch-acc').count()) === 0);
    await page.screenshot({ path: resolve(artifacts, 'nid-e2e-3-chambre-1-oeuf.png') });
    await page.click('#chambre-ov .ch-back');
    await page.waitForFunction(() => !document.getElementById('chambre-ov'), null, { timeout: 3000 }).catch(() => {});
  }

  // ═══ 4. FIXTURE EXPLICITE — sac garni d'une paille ═══════════════════════
  // Seuil du tout 1er œuf = 1 accessoire (FIRST_WARMTH_COST, collection.js) :
  // le soin lui-même reste RÉEL (tap-tap dans l'UI, warmEgg() de vrai
  // collection.js) — on fige seulement l'ALÉA du tirage d'accessoire, comme
  // mj-golden-nid.spec.mjs et l'ancien nid-e2e le faisaient déjà, pour ne
  // pas dépendre d'un 50/50 sur combien de parties il faut jouer.
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('maxplay_collection_v1'));
    s.sac = ['paille'];
    localStorage.setItem('maxplay_collection_v1', JSON.stringify(s));
  });
  const ownedBeforeHatch = await page.evaluate(() => JSON.parse(localStorage.getItem('maxplay_collection_v1')).owned.length);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.Collection, null, { timeout: 5000 }).catch(() => {});

  await page.click('#hdr-oeufs');
  await page.waitForSelector('#chambre-ov', { timeout: 4000 });
  ok('chambre ouverte, sac réel garni (1 paille)', (await page.locator('#chambre-ov .ch-acc').count()) === 1);

  // ═══ 5. SOIN TAP-TAP RÉEL → ÉCLOSION (seuil 1er œuf = 1) ═══════════════
  await page.click('#chambre-ov .ch-acc');
  await page.click('#chambre-ov .ch-oeuf', { force: true });

  // THÉÂTRE D'ÉCLOSION : transporteur → glissement Padidi → révélation
  const hatchOverlaySeen = await page.waitForSelector('.th-carry', { timeout: 8000 }).then(() => true).catch(() => false);
  ok('théâtre d\'éclosion démarré (transporteur en scène)', hatchOverlaySeen);
  const slideOk = await page.waitForSelector('#padidi-ov.slide-in', { timeout: 8000 }).then(() => true).catch(() => false);
  ok('glissement latéral chambre → album Padidi', slideOk);
  const reveleOk = await page.waitForSelector('.nid-vig.th-revele', { timeout: 15000 }).then(() => true).catch(() => false);
  ok('révélation : le dino prend sa place dans l\'album', reveleOk);
  if (reveleOk) await page.screenshot({ path: resolve(artifacts, 'nid-e2e-4-eclosion.png') });

  const ficheBtn = await page.waitForSelector('.th-fiche', { timeout: 5000 }).then(() => true).catch(() => false);
  ok('« Voir sa fiche » proposée après la révélation (jamais forcée)', ficheBtn);
  await page.waitForFunction(() => {
    const b = document.querySelector('#padidi-ov .ch-back');
    return b && b.style.display !== 'none' && !document.querySelector('.th-carry');
  }, null, { timeout: 6000 }).catch(() => {});
  const possedeDansAlbum = await page.locator('#padidi-ov .nid-vig.possede').count();
  ok('l\'album montre le dino révélé en couleur', possedeDansAlbum >= 1, `count=${possedeDansAlbum}`);
  await page.click('#padidi-ov .ch-back').catch(() => {});
  await page.waitForTimeout(300);

  // ═══ 6. ÉTAT RÉEL APRÈS ÉCLOSION ═════════════════════════════════════════
  const stateAfterHatch = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw) : null;
  });
  ok('un dino a été réellement ajouté à la collection',
     !!stateAfterHatch && stateAfterHatch.owned.length > ownedBeforeHatch,
     `avant=${ownedBeforeHatch} après=${stateAfterHatch && stateAfterHatch.owned.length}`);
  ok('l\'œuf éclos est consommé (accessoire compris) — nid vide, sac vide',
     !!stateAfterHatch && stateAfterHatch.eggs.length === 0 && stateAfterHatch.sac.length === 0,
     JSON.stringify({ eggs: stateAfterHatch && stateAfterHatch.eggs.length, sac: stateAfterHatch && stateAfterHatch.sac.length }));
  ok('hatchCount incrémenté (le prochain œuf demandera 3 accessoires)',
     !!stateAfterHatch && stateAfterHatch.hatchCount === 1, `hatchCount=${stateAfterHatch && stateAfterHatch.hatchCount}`);

  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-5-apres-eclosion.png') });

  // ═══ 7. Bilan erreurs console ═══════════════════════════════════════════
  ok('Aucune erreur JS/console non-404-connue sur tout le parcours', errors.length === 0, errors.join(' | '));
  if (KNOWN_404.length) {
    console.log(`\n  ℹ ${KNOWN_404.length} 404 ombres/paleoart pré-existants tolérés (non bloquants) :`);
    [...new Set(KNOWN_404)].slice(0, 10).forEach(e => console.log(`      - ${e}`));
  }
} catch (e) {
  ok('exécution sans exception', false, e.stack || e.message);
}

await browser.close();

console.log('\n── nid-e2e.spec.mjs (intégration bout-en-bout, sans mock) ──');
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(fail === 0 ? `\n\x1b[32m✓ nid-e2e OK (${checks.length} checks)\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s) / ${checks.length} checks\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
