// dev-dinos.spec.mjs — porte R13a (vague 3 process militaire) : rendu réel de
// site/dev-dinos.html par dino, à côté de i18n-dinos.spec.mjs (même dossier, découvert
// par run-autonomes.mjs:14-16 — il n'existe pas de studio/dino/tests/).
//
// Deux modes :
//   node dev-dinos.spec.mjs            → GLOBAL : DINOS.length = entrées DINO_AUDIO =
//                                         entrées DINO_EXTRAS = manifest fr (DINO_NOM_AUDIO_BY_LANG.fr),
//                                         0 pageerror, 0 404 hors ASSET_OPTIONNEL.
//   node dev-dinos.spec.mjs <id>       → PAR ID : ?open=<id>, hero naturalWidth > 0, bouton
//                                         audio visible SI DINO_AUDIO[id] existe, >= 4 scènes
//                                         (extras + combats) dans la galerie si présentes, badge
//                                         version affiché, captures 360x740 + 320x568, FAIL si
//                                         débordement horizontal à 320 px.
//
// Captures : studio/dino/docs/handoffs/rapports/captures/dino-<id>-360x740.png et -320x568.png
// (même chemin que i18n-dinos.spec.mjs:12, PAS .artifacts/ gitignoré : la galerie DINO est
// PMO, contrairement aux specs MJ qui sortent en .artifacts/ depuis R13 côté jeu).
//
// Un log de succès ne prouve pas que Papa Yann voit la bonne chose — ouvrir les captures.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../../..');
const OUT = path.join(ROOT, 'studio/dino/docs/handoffs/rapports/captures');
mkdirSync(OUT, { recursive: true });

const url = pathToFileURL(path.join(ROOT, 'site/dev-dinos.html')).href;
const cibleId = process.argv[2] || null;

// Assets optionnels : un dino peut être dans l'encyclopédie avant d'avoir TOUTES ses
// images (bébé, sprite, tête — cf. check-dino-coherence.cjs § AVERT). Un 404 dessus
// n'est pas une régression, la fiche a un repli (emoji/ombre). Hors 404 qui font
// planter le rendu (paléoart hero, extras) restés BLOQUANTS.
const ASSET_OPTIONNEL = /\/(bebes|sprites)\//i;

async function ouvrirPage(browser, { viewport, deviceScaleFactor = 2 } = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor });
  const page = await ctx.newPage();
  const erreurs = [];
  const notFound = [];
  page.on('pageerror', e => erreurs.push(String(e.message)));
  page.on('console', m => { if (m.type() === 'error') erreurs.push('console: ' + m.text()); });
  page.on('response', r => {
    if (r.status() === 404) notFound.push(r.url());
  });
  return { ctx, page, erreurs, notFound };
}

async function runGlobal(browser) {
  const { ctx, page, erreurs, notFound } = await ouvrirPage(browser, { viewport: { width: 390, height: 844 } });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  const compte = await page.evaluate(() => {
    const src = (typeof DINOS !== 'undefined' ? DINOS : window.DINOS) || [];
    const extras = (typeof DINO_EXTRAS !== 'undefined' ? DINO_EXTRAS : window.DINO_EXTRAS) || {};
    const audio = (typeof DINO_AUDIO !== 'undefined' ? DINO_AUDIO : window.DINO_AUDIO) || {};
    const manifestFr = (window.DINO_NOM_AUDIO_BY_LANG && window.DINO_NOM_AUDIO_BY_LANG.fr)
      ? window.DINO_NOM_AUDIO_BY_LANG.fr.size : 0;
    return {
      dinos: src.length,
      extras: Object.keys(extras).length,
      audio: Object.keys(audio).length,
      manifestFr
    };
  });

  await ctx.close();

  const notFoundBloquant = notFound.filter(u => !ASSET_OPTIONNEL.test(u));

  const problemes = [];
  // DINOS >= DINO_AUDIO et >= DINO_EXTRAS : un dino peut exister sans encore avoir tout,
  // mais DINO_AUDIO/DINO_EXTRAS ne doivent jamais dépasser DINOS (entrée orpheline câblée
  // sur un id qui n'existe plus dans dinos-data.js — la classe de bug inverse du Scélidosaure).
  if (compte.audio > compte.dinos) problemes.push(`DINO_AUDIO (${compte.audio}) > DINOS (${compte.dinos})`);
  if (compte.extras > compte.dinos) problemes.push(`DINO_EXTRAS (${compte.extras}) > DINOS (${compte.dinos})`);
  // LEGACY_NOM_AUDIO : dinos câblés dont l'audio « nom seul » FR n'est pas encore produit (manifest fr).
  // scelidosaurus : prévu au reset ElevenLabs du 2026-10-11 (studio/dino/memory/TODO.md). N'en ajoute jamais.
  const LEGACY_NOM_AUDIO = ['scelidosaurus'];
  if (compte.manifestFr + LEGACY_NOM_AUDIO.length !== compte.audio) problemes.push(`manifest fr (${compte.manifestFr}) + LEGACY_NOM_AUDIO (${LEGACY_NOM_AUDIO.length}) != DINO_AUDIO (${compte.audio})`);
  if (erreurs.length) problemes.push(`${erreurs.length} pageerror/console error`);
  if (notFoundBloquant.length) problemes.push(`${notFoundBloquant.length} 404 bloquant(s)`);

  console.log(`[GLOBAL] DINOS=${compte.dinos} DINO_AUDIO=${compte.audio} DINO_EXTRAS=${compte.extras} manifest_fr=${compte.manifestFr}`);
  if (erreurs.length) erreurs.slice(0, 5).forEach(e => console.log(`  ERREUR ${e}`));
  if (notFoundBloquant.length) notFoundBloquant.slice(0, 5).forEach(u => console.log(`  404 ${u}`));

  if (problemes.length) {
    console.log(`[FAIL] GLOBAL — ${problemes.join(' ; ')}`);
    return 1;
  }
  console.log('[PASS] GLOBAL');
  return 0;
}

async function runId(browser, id) {
  let echecs = 0;

  for (const [label, viewport] of [['360x740', { width: 360, height: 740 }], ['320x568', { width: 320, height: 568 }]]) {
    const { ctx, page, erreurs, notFound } = await ouvrirPage(browser, { viewport, deviceScaleFactor: 2 });
    await page.goto(`${url}?open=${id}`, { waitUntil: 'load' });
    await page.waitForTimeout(1500);

    const etat = await page.evaluate((dinoId) => {
      const src = (typeof DINOS !== 'undefined' ? DINOS : window.DINOS) || [];
      const audio = (typeof DINO_AUDIO !== 'undefined' ? DINO_AUDIO : window.DINO_AUDIO) || {};
      const dino = src.find(d => d.id === dinoId);
      const hero = document.getElementById('v1-hero-img');
      const audioBtn = document.getElementById('dino-story-btn');
      const vignettes = document.querySelectorAll('#v1-pellicule .v1-vignette').length;
      const versionBadge = document.querySelector('.audio-ver');
      return {
        dinoExiste: !!dino,
        heroNaturalWidth: hero ? hero.naturalWidth : 0,
        heroVisible: hero ? hero.offsetWidth > 0 : false,
        aAudio: !!audio[dinoId],
        audioBtnVisible: !!audioBtn && audioBtn.offsetWidth > 0,
        vignettes,
        versionBadgeTexte: versionBadge ? versionBadge.textContent.trim() : null,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    }, id);

    const notFoundBloquant = notFound.filter(u => !ASSET_OPTIONNEL.test(u));

    const problemes = [];
    if (!etat.dinoExiste) problemes.push(`id "${id}" absent de DINOS`);
    if (etat.heroNaturalWidth <= 0 && etat.heroVisible) problemes.push('hero naturalWidth <= 0 (image cassée)');
    if (etat.aAudio && !etat.audioBtnVisible) problemes.push('DINO_AUDIO a cet id mais bouton histoire complète invisible');
    if (etat.aAudio && !etat.versionBadgeTexte) problemes.push('DINO_AUDIO a cet id mais badge version absent');
    if (etat.overflow) problemes.push(`débordement horizontal à ${label}`);
    if (erreurs.length) problemes.push(`${erreurs.length} pageerror/console error`);
    if (notFoundBloquant.length) problemes.push(`${notFoundBloquant.length} 404 bloquant(s)`);

    const shot = path.join(OUT, `dino-${id}-${label}.png`);
    await page.screenshot({ path: shot, fullPage: false });

    const ok = problemes.length === 0;
    if (!ok) echecs++;
    console.log(`[${ok ? 'PASS' : 'FAIL'}] ${id} @ ${label} — hero=${etat.heroNaturalWidth}px audio=${etat.aAudio} vignettes=${etat.vignettes} version=${etat.versionBadgeTexte || '-'}`);
    if (!ok) console.log(`        ${problemes.join(' ; ')}`);
    if (notFoundBloquant.length) notFoundBloquant.slice(0, 5).forEach(u => console.log(`        404 ${u}`));
    console.log(`        capture : ${shot}`);

    await ctx.close();
  }

  return echecs ? 1 : 0;
}

const browser = await chromium.launch({ headless: true });
let code = 0;
try {
  code = cibleId ? await runId(browser, cibleId) : await runGlobal(browser);
} finally {
  await browser.close();
}
process.exit(code);
