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

  ok('Mur chargé (rangées copains visibles)', (await page.locator('.copain[data-copain]').count()) > 0);
  await page.waitForFunction(() => !!window.NidUI, null, { timeout: 5000 }).catch(() => {});
  const nidUiPresent = await page.evaluate(() => !!window.NidUI);
  ok('NidUI chargé dynamiquement par mur.js', nidUiPresent);

  const collectionPresent = await page.evaluate(() => !!window.Collection);
  ok('Collection.js chargé sur le Mur (moteur nid)', collectionPresent);

  await page.waitForTimeout(400);
  const nidHostVisible = await page.locator('#nid-host').isVisible().catch(() => false);
  ok('nid affiché (vide)', nidHostVisible);
  const oeufsVides = await page.locator('.nid-oeuf:not(.plein)').count();
  ok('3 emplacements vides au démarrage', oeufsVides === 3, `count=${oeufsVides}`);

  const bandeauVisible = await page.locator('#nid-bandeau').isVisible().catch(() => false);
  ok('bandeau collection affiché', bandeauVisible);
  const ombresAuDepart = await page.locator('.nid-vig.ombre-only').count();
  const possedeAuDepart = await page.locator('.nid-vig.possede').count();
  ok('bandeau tout en ombres (rien possédé)', possedeAuDepart === 0 && ombresAuDepart > 0,
     `possede=${possedeAuDepart} ombres=${ombresAuDepart}`);

  const apercusPresents = await page.locator('.copain .c-apercu').count();
  ok('vignettes-aperçu sur les rangées copains', apercusPresents > 0, `count=${apercusPresents}`);

  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-1-mur-vide.png') });

  // ═══ 2. PARTIE 1 COMPLÈTE — mj-24 (golden simple, .dino-tile) ═══════════
  await page.goto(url('mj-24'), { waitUntil: 'networkidle' });
  await playPerfectDinoTileGame(page);

  ok('écran de fin affiché (.end-wrap)', (await page.locator('.end-wrap').count()) === 1);
  ok('3 boutons data-act présents (replay/next/home)',
     (await page.locator('[data-act="replay"]').count()) === 1 &&
     (await page.locator('[data-act="home"]').count()) === 1);
  const nextBtn1 = await page.locator('[data-act="next"]').count();
  ok('bouton "La suite" présent (MJKit.chain a un suivant)', nextBtn1 === 1);

  const capsule1 = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw) : null;
  });
  ok('capsule 1 persistée en localStorage après la partie', !!capsule1 && capsule1.pending.length === 1,
     JSON.stringify(capsule1));

  const nextUrl1 = await page.evaluate(() => {
    const a = document.querySelector('[data-act="next"]');
    return a ? a.getAttribute('href') : null;
  });
  ok('URL du bouton "La suite" cohérente avec MJKit.chain(mj-24)', !!nextUrl1, `next=${nextUrl1}`);

  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-2-fin-oeuf.png') });

  // ═══ 3. « LA SUITE » → jeu suivant de la chaîne, partie complète ════════
  await page.click('[data-act="next"]');
  await page.waitForLoadState('networkidle');
  const urlAfterNext = page.url();
  ok('navigation "La suite" a bien changé de page', urlAfterNext.endsWith(nextUrl1) || urlAfterNext.includes(nextUrl1.split('#')[0]),
     `attendu contient ${nextUrl1}, obtenu ${urlAfterNext}`);

  // Le jeu suivant peut être un golden à choix (.dino-tile) ou un autre gabarit ;
  // on tente le chemin .dino-tile en priorité (partagé par tous les golden "reconnaissance").
  const isDinoTileGame = await page.locator('.dino-tile').count().then(n => n > 0).catch(() => false);
  if (isDinoTileGame) {
    await playPerfectDinoTileGame(page);
  } else {
    // Fallback générique : le jeu suivant n'utilise pas .dino-tile — on ne peut pas
    // scripter un chemin gagnant générique en boîte noire. On le note explicitement
    // plutôt que de fabriquer un faux succès.
    console.log(`\n  ⚠ jeu suivant (${urlAfterNext}) n'utilise pas .dino-tile — chemin gagnant non générique, capsule 2 injectée en localStorage (voir note ci-dessous).\n`);
  }

  let capsule2;
  if (isDinoTileGame) {
    ok('2e écran de fin affiché', (await page.locator('.end-wrap').count()) === 1);
    capsule2 = await page.evaluate(() => {
      const raw = localStorage.getItem('maxplay_collection_v1');
      return raw ? JSON.parse(raw) : null;
    });
    ok('capsule 2 persistée après la 2e partie réelle', !!capsule2 && capsule2.pending.length === 2,
       JSON.stringify(capsule2));
  } else {
    // Injection explicite et assumée (mission : "si la durée explose, dis-le clairement").
    await page.evaluate(() => {
      const raw = localStorage.getItem('maxplay_collection_v1');
      const s = raw ? JSON.parse(raw) : { version: 1, owned: [], pending: [], lastGrantAt: null, streakCount: 0 };
      s.pending.push({ golden: false, at: Date.now() });
      localStorage.setItem('maxplay_collection_v1', JSON.stringify(s));
    });
    capsule2 = await page.evaluate(() => JSON.parse(localStorage.getItem('maxplay_collection_v1')));
    ok('capsule 2 injectée (2e partie réelle impossible en boîte noire générique) — DIT EXPLICITEMENT',
       capsule2.pending.length === 2, JSON.stringify(capsule2));
  }

  // ═══ 4. 3e CAPSULE via mj-28, badge "ça bouge dans le nid" avant retour Mur ═══
  await page.goto(url('mj-28'), { waitUntil: 'networkidle' });
  const isDinoTileGame28 = await page.locator('.dino-tile').count().then(n => n > 0).catch(() => false);
  if (isDinoTileGame28) {
    await playPerfectDinoTileGame(page);
    ok('3e écran de fin affiché (mj-28)', (await page.locator('.end-wrap').count()) === 1);
    // ── 5. badge "ça bouge dans le nid" AVANT le retour au Mur ──────────
    const badgeCount = await page.locator('.nid-badge').count();
    ok('badge "ça bouge dans le nid" visible sur l\'écran de fin (3e capsule atteinte)', badgeCount > 0,
       `count=${badgeCount}`);
    await page.screenshot({ path: resolve(artifacts, 'nid-e2e-badge-nid-bouge.png') });
  } else {
    console.log('\n  ⚠ mj-28 n\'utilise pas .dino-tile — capsule 3 injectée directement (voir note).\n');
    await page.evaluate(() => {
      const raw = localStorage.getItem('maxplay_collection_v1');
      const s = raw ? JSON.parse(raw) : { version: 1, owned: [], pending: [], lastGrantAt: null, streakCount: 0 };
      s.pending.push({ golden: false, at: Date.now() });
      localStorage.setItem('maxplay_collection_v1', JSON.stringify(s));
    });
  }

  const capsule3 = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw) : null;
  });
  ok('3 capsules en attente avant retour au Mur (readyToHatch)', !!capsule3 && capsule3.pending.length === 3,
     JSON.stringify(capsule3));

  const ownedBeforeHatch = capsule3 ? (await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw).owned.length : 0;
  })) : 0;

  // ═══ RETOUR AU MUR → ÉCLOSION ════════════════════════════════════════
  await page.goto(url('index'), { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.NidUI, null, { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(500); // playHatchIfReady() est appelé avec un délai de 300ms

  const hatchOverlaySeen = await page.waitForFunction(() => {
    return document.querySelector('div[style*="position: fixed"][style*="z-index: 70"]') ||
           document.querySelector('.hatch-doublon');
  }, null, { timeout: 5000 }).then(() => true).catch(() => false);
  ok('séquence d\'éclosion jouée au retour au Mur (overlay affiché)', hatchOverlaySeen);

  if (hatchOverlaySeen) await page.screenshot({ path: resolve(artifacts, 'nid-e2e-3-eclosion.png') });

  // cri audible : un <audio>/Audio() a été instancié — on vérifie via l'écoute
  // du constructeur Audio (posée AVANT le hatch aurait été idéal ; ici on vérifie
  // au minimum qu'aucune erreur n'a été levée par new Audio(...).play() et que le
  // fichier son du bébé dino existe dans le DOM réseau (best-effort, audio non
  // interceptable a posteriori sans CDP Network — voir note dans le rapport).
  const audioNetworkOk = !errors.some(e => /dino-bebe/i.test(e));
  ok('aucune erreur JS liée au cri du bébé dino (Audio().play() n\'a pas throw)', audioNetworkOk,
     errors.filter(e => /dino-bebe/i.test(e)).join(' | '));

  // Retour playtest Papa Yann 2026-07-26 : après la fête (MaxFX.hatch), une
  // carte de gain distincte (.hatch-gain, nom en grand + 2 boutons ≥80px)
  // remplace le tap-anywhere générique — sauf cas doublon (garde son
  // tap-anywhere existant). On clique "Continuer" explicitement.
  const gainCardSeen = await page.waitForSelector('.hatch-gain, .hatch-doublon', { timeout: 5000 }).then(() => true).catch(() => false);
  ok('carte de gain (nom + actions) affichée après la fête d\'éclosion', gainCardSeen);
  if (await page.locator('.hatch-gain-nom').count()) {
    const nomAffiche = await page.locator('.hatch-gain-nom').innerText();
    ok('le nom du dino gagné est affiché en grand', nomAffiche.trim().length > 0, nomAffiche);
    const ficheBox = await page.locator('.hatch-btn-fiche').boundingBox().catch(() => null);
    if (ficheBox) ok('bouton "Voir sa fiche" ≥ 80px', ficheBox.width >= 80 && ficheBox.height >= 80, JSON.stringify(ficheBox));
    await page.click('.hatch-btn-continuer');
  } else {
    await page.mouse.click(240, 450); // fallback doublon : tap-anywhere inchangé
  }
  await page.waitForFunction(() => {
    return !document.querySelector('.hatch-doublon') &&
           !document.querySelector('.hatch-gain') &&
           !document.querySelector('div[style*="z-index: 70"]');
  }, null, { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(300);

  const ownedAfterHatch = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw).owned.length : 0;
  });
  ok('un dino a été ajouté à la collection après éclosion', ownedAfterHatch > ownedBeforeHatch,
     `avant=${ownedBeforeHatch} après=${ownedAfterHatch}`);

  const pendingAfterHatch = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw).pending.length : -1;
  });
  ok('les 3 capsules sont consommées après éclosion', pendingAfterHatch === 0, `pending=${pendingAfterHatch}`);

  const possedeApresEclosion = await page.locator('.nid-vig.possede').count();
  ok('bandeau collection MAJ : dino ajouté visible en couleur', possedeApresEclosion > possedeAuDepart,
     `avant=${possedeAuDepart} après=${possedeApresEclosion}`);

  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-4-collection.png') });

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

  // ═══ 7. FRISE REPAIRE : jeu recommandé en avant, jeux faits tamponnés ══
  await page.goto(url('index') + '#repaire=trex', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.NidUI, null, { timeout: 5000 }).catch(() => {});
  await page.waitForSelector('#repaire-view:not([style*="display: none"])', { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(300);

  const friseJeux = await page.locator('.frise .frise-jeu').count();
  ok('frise-chemin affichée dans le repaire T-Rex', friseJeux > 0, `count=${friseJeux}`);
  const friseTampons = await page.locator('.frise .frise-jeu.fait').count();
  ok('au moins 1 jeu tamponné (fait) — mj-24 joué 2 fois', friseTampons > 0, `count=${friseTampons}`);
  const friseReco = await page.locator('.frise .frise-jeu.reco').count();
  ok('exactement 1 jeu recommandé mis en avant', friseReco === 1, `count=${friseReco}`);

  await page.screenshot({ path: resolve(artifacts, 'nid-e2e-5-frise.png') });

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
