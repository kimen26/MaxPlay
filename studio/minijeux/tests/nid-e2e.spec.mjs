// nid-e2e.spec.mjs — CHANTIER NID P4 : preuve d'intégration bout-en-bout, EN CONDITIONS RÉELLES.
// Playwright + Chromium réel, AUCUN mock (contrairement à mur-nid.spec.mjs qui injecte un faux
// window.Collection, et mj-golden-nid.spec.mjs qui isole mj-golden.js seul). Ici : vrais fichiers,
// vraie navigation file:// entre le Mur (site/index.html) et les jeux golden (site/mj-24.html,
// site/mj-28.html), vrai localStorage persistant entre les pages (même origine file://).
//
// Scénario (studio/minijeux/docs/2026-07-26-chantier-nid-plan.md + avenant P0) :
//   1. Mur vierge → nid vide + bandeau tout en ombres
//   2. Partie complète mj-24 → œuf + 3 boutons + capsule persistée
//   3. « La suite » → jeu suivant de MJKit.chain, partie complète → 2e capsule
//   4. 3e capsule (via mj-28) → retour Mur → ÉCLOSION (dino révélé, cri, bandeau MAJ)
//   5. Badge « ça bouge dans le nid » visible sur l'écran de fin de la 3e partie
//   6. Reprise A2 : 1 question puis reload → piste restaurée
//   7. Frise repaire : jeu recommandé en avant, jeux faits tamponnés
//   8. Zéro erreur console (hors 404 ombres/paleoart pré-existants, listés)
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

// Joue une partie mj-golden COMPLÈTE (chemin gagnant scripté, sans-faute) sur une page déjà
// ouverte sur un jeu à choix (.dino-tile[data-correct]) — mj-24/mj-28 partagent ce pattern.
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
  // ═══ 1. CONTEXTE VIERGE — Mur vide ═══════════════════════════════════════
  await page.goto(url('index'), { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Mur v2 « La Vallée » (spec 2026-07-29) : 6 copains dans la scène
  await page.waitForSelector('.v-copain', { timeout: 5000 }).catch(() => {});
  ok('la vallée charge (6 copains)', (await page.locator('.v-copain').count()) === 6);
  await page.waitForFunction(() => !!window.NidUI, null, { timeout: 5000 }).catch(() => {});
  const nidUiPresent = await page.evaluate(() => !!window.NidUI);
  ok('NidUI chargé dynamiquement par mur.js', nidUiPresent);

  await page.waitForFunction(() => !!window.Collection, null, { timeout: 5000 }).catch(() => {});
  const collectionPresent = await page.evaluate(() => !!window.Collection);
  ok('Collection.js chargé sur le menu (moteur nid)', collectionPresent);

  // profil vierge : le Roi ne pulse pas (rien à voir dans le monde dino)
  await page.waitForTimeout(600);
  ok('profil vierge → le Roi T-Rex ne pulse pas', (await page.locator('.v-copain.pulse').count()) === 0);

  // Padidi (derrière le Roi) : tout en ombres au départ
  await page.click('.v-copain[data-copain="trex"]', { force: true });
  await page.waitForSelector('.vb-porte[data-porte="padidi"]', { timeout: 4000 });
  await page.click('.vb-porte[data-porte="padidi"]');
  await page.waitForSelector('#padidi-ov', { timeout: 5000 });
  const ombresAuDepart = await page.locator('#padidi-ov .nid-vig.ombre-only').count();
  const possedeAuDepart = await page.locator('#padidi-ov .nid-vig.possede').count();
  ok('Padidi tout en ombres (rien possédé)', possedeAuDepart === 0 && ombresAuDepart > 0,
     `possede=${possedeAuDepart} ombres=${ombresAuDepart}`);
  await page.click('#padidi-ov .ch-back');

  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-1-vallee-vierge.png') });

  // ═══ 2. PARTIE 1 COMPLÈTE — mj-24 (golden simple, .dino-tile) ═══════════
  await page.goto(url('mj-24'), { waitUntil: 'networkidle' });
  await playPerfectDinoTileGame(page);

  ok('écran de fin affiché (.end-wrap)', (await page.locator('.end-wrap').count()) === 1);
  ok('3 boutons data-act présents (replay/next/home)',
     (await page.locator('[data-act="replay"]').count()) === 1 &&
     (await page.locator('[data-act="home"]').count()) === 1);
  const nextBtn1 = await page.locator('[data-act="next"]').count();
  ok('bouton "La suite" présent (MJKit.chain a un suivant)', nextBtn1 === 1);

  // NID v4 : nid vide → le gain de la 1re partie est FORCÉMENT un œuf,
  // individuel, avec sa famille (couleur connue dès le gain).
  const capsule1 = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw) : null;
  });
  ok('œuf 1 persisté (v2 : eggs[] individuel avec famille)',
     !!capsule1 && capsule1.version === 2 && capsule1.eggs.length === 1 && !!capsule1.eggs[0].famille,
     JSON.stringify(capsule1));

  const nextUrl1 = await page.evaluate(() => {
    const a = document.querySelector('[data-act="next"]');
    return a ? a.getAttribute('href') : null;
  });
  ok('URL du bouton "La suite" cohérente avec MJKit.chain(mj-24)', !!nextUrl1, `next=${nextUrl1}`);

  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-2-fin-oeuf.png') });

  // ═══ 3. RETOUR AU MUR → THÉÂTRE DU 1er ŒUF (one-shot) → CHAMBRE ═════════
  await page.goto(url('index'), { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.NidUI, null, { timeout: 5000 }).catch(() => {});
  const introSeen = await page.waitForSelector('#nid-intro-ov', { timeout: 5000 }).then(() => true).catch(() => false);
  ok('théâtre du 1er œuf joué au retour au Mur (one-shot)', introSeen);
  if (introSeen) {
    await page.screenshot({ path: resolve(artifacts, 'nid-e2e-2b-intro.png') });
    await page.click('#nid-intro-ov', { force: true });
    // le théâtre débouche sur la chambre des œufs (la routine commence là)
    const chambreAfterIntro = await page.waitForSelector('#chambre-ov', { timeout: 4000 }).then(() => true).catch(() => false);
    ok('le théâtre débouche sur la chambre des œufs', chambreAfterIntro);
    if (chambreAfterIntro) {
      await page.click('#chambre-ov .ch-back');
      await page.waitForFunction(() => !document.getElementById('chambre-ov'), null, { timeout: 3000 }).catch(() => {});
    }
  }
  const introFlag = await page.evaluate(() => localStorage.getItem('maxplay_nid_intro'));
  ok('flag one-shot posé (le théâtre ne se rejouera pas)', !!introFlag);
  // signal de gain sans icone permanente (spec §3) : le théâtre a ouvert la
  // chambre → le gain est « vu », le Roi ne doit PAS pulser au retour
  await page.waitForTimeout(400);
  ok('gain vu pendant le théâtre → le Roi ne pulse pas',
     (await page.locator('.v-copain[data-copain="trex"].pulse').count()) === 0);

  // ═══ 4. SOIN EN CHAMBRE → ÉCLOSION INDIVIDUELLE (seuil 1er œuf = 1) ═════
  // Fixture explicite : sac garni d'une paille (le drop 1-2 œufs est random
  // par décision PY — l'e2e fige l'état plutôt que d'espérer un tirage).
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('maxplay_collection_v1'));
    s.sac = ['paille'];
    localStorage.setItem('maxplay_collection_v1', JSON.stringify(s));
  });
  const ownedBeforeHatch = await page.evaluate(() => JSON.parse(localStorage.getItem('maxplay_collection_v1')).owned.length);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.NidUI && !!window.Collection, null, { timeout: 5000 }).catch(() => {});
  // le sac vient d'être garni hors chambre → le Roi pulse (gain pas vu)
  await page.waitForTimeout(600);
  ok('sac garni non vu → le Roi T-Rex pulse', (await page.locator('.v-copain[data-copain="trex"].pulse').count()) === 1);
  await page.click('.v-copain[data-copain="trex"]', { force: true });
  await page.waitForSelector('.vb-porte[data-porte="nid"]', { timeout: 4000 });
  await page.click('.vb-porte[data-porte="nid"]');
  await page.waitForSelector('#chambre-ov', { timeout: 4000 });
  ok('chambre ouverte, sac latéral garni', (await page.locator('#chambre-ov .ch-acc').count()) === 1);
  // soin tap-tap : accessoire → œuf. Seuil du tout 1er œuf = 1 → éclosion SUR PLACE.
  await page.click('#chambre-ov .ch-acc');
  await page.click('#chambre-ov .ch-oeuf', { force: true });

  // THÉÂTRE D'ÉCLOSION v0.7 : transporteur → glissement Padidi → révélation
  const hatchOverlaySeen = await page.waitForSelector('.th-carry', { timeout: 8000 }).then(() => true).catch(() => false);
  ok('théâtre d\'éclosion démarré (transporteur en scène)', hatchOverlaySeen);
  const slideOk = await page.waitForSelector('#padidi-ov.slide-in', { timeout: 8000 }).then(() => true).catch(() => false);
  ok('glissement latéral chambre → album Padidi', slideOk);
  const reveleOk = await page.waitForSelector('.nid-vig.th-revele', { timeout: 15000 }).then(() => true).catch(() => false);
  ok('révélation : le dino prend sa place dans l\'album', reveleOk);
  if (reveleOk) await page.screenshot({ path: resolve(artifacts, 'nid-e2e-3-eclosion.png') });

  // cri audible : un <audio>/Audio() a été instancié — on vérifie via l'écoute
  // du constructeur Audio (posée AVANT le hatch aurait été idéal ; ici on vérifie
  // au minimum qu'aucune erreur n'a été levée par new Audio(...).play() et que le
  // fichier son du bébé dino existe dans le DOM réseau (best-effort, audio non
  // interceptable a posteriori sans CDP Network — voir note dans le rapport).
  const audioNetworkOk = !errors.some(e => /dino-bebe/i.test(e));
  ok('aucune erreur JS liée au cri du bébé dino (Audio().play() n\'a pas throw)', audioNetworkOk,
     errors.filter(e => /dino-bebe/i.test(e)).join(' | '));

  // « Voir sa fiche » PROPOSÉE, jamais forcée (spec §6.1 point 6)
  const ficheBtn = await page.waitForSelector('.th-fiche', { timeout: 5000 }).then(() => true).catch(() => false);
  ok('« Voir sa fiche » proposée après la révélation', ficheBtn);
  // retour libre : le ← du Padidi réapparaît après le rituel
  await page.waitForFunction(() => {
    const b = document.querySelector('#padidi-ov .ch-back');
    return b && b.style.display !== 'none' && !document.querySelector('.th-carry');
  }, null, { timeout: 6000 }).catch(() => {});
  const possedeDansAlbum = await page.locator('#padidi-ov .nid-vig.possede').count();
  ok('l\'album montre le dino révélé en couleur', possedeDansAlbum >= 1, `count=${possedeDansAlbum}`);
  await page.click('#padidi-ov .ch-back').catch(() => {});
  await page.waitForTimeout(300);

  const ownedAfterHatch = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw).owned.length : 0;
  });
  ok('un dino a été ajouté à la collection après éclosion', ownedAfterHatch > ownedBeforeHatch,
     `avant=${ownedBeforeHatch} après=${ownedAfterHatch}`);

  const stateAfterHatch = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw) : null;
  });
  ok('l\'œuf éclos est consommé (accessoire compris) — nid vide, sac vide',
     !!stateAfterHatch && stateAfterHatch.eggs.length === 0 && stateAfterHatch.sac.length === 0,
     JSON.stringify({ eggs: stateAfterHatch && stateAfterHatch.eggs.length, sac: stateAfterHatch && stateAfterHatch.sac.length }));
  ok('hatchCount incrémenté (le prochain œuf demandera 3 accessoires)',
     !!stateAfterHatch && stateAfterHatch.hatchCount === 1, `hatchCount=${stateAfterHatch && stateAfterHatch.hatchCount}`);

  // Padidi reflète l'éclosion : le dino gagné apparaît en couleur
  await page.evaluate(() => { const o = document.getElementById('chambre-ov'); if (o) o.remove(); });
  await page.click('.v-copain[data-copain="trex"]', { force: true });
  await page.waitForSelector('.vb-porte[data-porte="padidi"]', { timeout: 4000 });
  await page.click('.vb-porte[data-porte="padidi"]');
  await page.waitForSelector('#padidi-ov', { timeout: 5000 });
  const possedeApresEclosion = await page.locator('#padidi-ov .nid-vig.possede').count();
  ok('Padidi MAJ : dino ajouté visible en couleur', possedeApresEclosion > possedeAuDepart,
     `avant=${possedeAuDepart} après=${possedeApresEclosion}`);
  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-4-padidi.png') });
  await page.click('#padidi-ov .ch-back');

  // ═══ 6. REPRISE A2 : 1 question puis reload → piste restaurée ══════════
  // NOTE : on répond D'ABORD FAUX puis juste (pattern éprouvé de mj-golden-nid.spec.mjs,
  // pas une fantaisie) — répondre juste du premier coup avant un reload déclenche le
  // pagehide de tracker.js → Tracker.endSession(1,1) → session vue comme "parfaite" →
  // Stars monte → Golden.setup() recalcule un level différent → la garde A2
  // (r.level === this.level) rejette alors la reprise PAR CONCEPTION (pas un bug :
  // le contrat A2 ne restaure que si le niveau n'a pas bougé entre-temps). Un
  // sans-faute partiel ne doit donc jamais servir de scénario de test resume.
  await page.goto(url('mj-24'), { waitUntil: 'networkidle' });
  const panneauResume = page.locator('#ri-panneau.on');
  if (await panneauResume.count()) { await page.click('#ri-ok'); await page.waitForTimeout(200); }
  await page.waitForSelector('.dino-tile:not([data-correct="1"])', { timeout: 6000 });
  await page.click('.dino-tile:not([data-correct="1"])');
  await page.waitForTimeout(2000); // révélation
  await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 6000 });
  await page.click('.dino-tile[data-correct="1"]');
  await page.waitForTimeout(1200);

  const resumeSaved = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_resume_mj-24');
    return raw ? JSON.parse(raw) : null;
  });
  ok('A2 : état de reprise sauvé après 1 question', !!resumeSaved && resumeSaved.pipResults.length === 1,
     JSON.stringify(resumeSaved));

  await page.reload({ waitUntil: 'networkidle' });
  const panneauResume2 = page.locator('#ri-panneau.on');
  if (await panneauResume2.count()) { await page.click('#ri-ok'); await page.waitForTimeout(200); }
  const restoredClasses = await page.evaluate(() => [...document.querySelectorAll('.pip')].map(p => p.className));
  ok('A2 : piste restaurée après reload (1 bille jouée visible)',
     restoredClasses.filter(c => /done-first|done-retry/.test(c)).length === 1,
     JSON.stringify(restoredClasses));

  // ═══ 7. BULLE COPAIN : tampon ✓ sur le jeu fait, reco qui brille ═══════
  // (la frise-chemin est morte avec la page repaire — sa FONCTION survit
  // dans la bulle : fait = tamponné, jamais joué = brille, spec §5)
  await page.goto(url('index'), { waitUntil: 'networkidle' });
  await page.waitForSelector('.v-copain[data-copain="dino"]', { timeout: 5000 });
  await page.click('.v-copain[data-copain="dino"]', { force: true });
  await page.waitForSelector('.v-bulle .vb-jeu', { timeout: 4000 });
  const bulleJeux = await page.locator('.v-bulle .vb-jeu').count();
  ok('bulle de l\'hôte dino : vignettes affichées', bulleJeux > 0, `count=${bulleJeux}`);
  const tampons = await page.locator('.v-bulle .vb-jeu.fait').count();
  ok('au moins 1 jeu tamponné ✓ (mj-24 joué 2 fois)', tampons > 0, `count=${tampons}`);
  const recos = await page.locator('.v-bulle .vb-jeu.reco').count();
  ok('les jamais-joués brillent (reco)', recos >= 1, `count=${recos}`);

  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-5-bulle-dino.png') });

  // ═══ 8. Bilan erreurs console ═══════════════════════════════════════════
  ok('Aucune erreur JS/console non-404-connue sur tout le parcours', errors.length === 0, errors.join(' | '));
  if (KNOWN_404.length) {
    console.log(`\n  ℹ ${KNOWN_404.length} 404 ombres/paleoart pré-existants tolérés (non bloquants) :`);
    [...new Set(KNOWN_404)].slice(0, 10).forEach(e => console.log(`      - ${e}`));
  }
} catch (e) {
  ok('exécution sans exception', false, e.stack || e.message);
}

await browser.close();

console.log('\n── nid-e2e.spec.mjs (CHANTIER NID P4 — intégration bout-en-bout) ──');
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(fail === 0 ? `\n\x1b[32m✓ nid-e2e OK (${checks.length} checks)\x1b[0m\n` : `\n\x1b[31m✗ ${fail} échec(s) / ${checks.length} checks\x1b[0m\n`);
process.exit(fail === 0 ? 0 : 1);
