// Recette VISUELLE i18n dino — vérifie que ?lang=<lang> affiche bien la langue.
// Un log vert ne prouve pas que l'oeil voit la bonne langue : ce test capture aussi
// des PNG à ouvrir. Local (file://) car les bundles ne sont pas encore déployés.
//
// Usage : node studio/minijeux/tests/i18n-dinos.spec.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../../..');
const OUT = path.join(ROOT, 'studio/dino/docs/handoffs/rapports/captures');
mkdirSync(OUT, { recursive: true });

// Un marqueur par langue : un mot qui ne peut PAS venir du FR.
// `ui` verifie le CHASSIS (onglets, titres) : les donnees peuvent etre traduites
// alors que l'interface reste en francais — c'est exactement le bug qu'on traque.
const CAS = [
  { lang: 'fr', attendu: /dinosaure|Familles/i, interdit: null,
    ui: /^Les familles$/, uiTitre: /^Les Dinosaures$/ },
  { lang: 'en', attendu: /\b(the|hunter|lizard|plant-eaters|king)\b/i, interdit: /dinosaure\b/i,
    ui: /famil/i, uiInterdit: /^Les familles$/ },
  { lang: 'es-es', attendu: /\b(lagarto|el rey|dinosaurios|cuernos)\b/i, interdit: /dinosaure\b/i,
    ui: /famili/i, uiInterdit: /^Les familles$/ },
  { lang: 'pt-br', attendu: /\b(lagarto|o rei|dinossauros|chifres)\b/i, interdit: /dinosaure\b/i,
    ui: /famíli|famil/i, uiInterdit: /^Les familles$/ },
];

const url = pathToFileURL(path.join(ROOT, 'site/dev-dinos.html')).href;
const browser = await chromium.launch({ headless: true });
let echecs = 0;

for (const cas of CAS) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const erreurs = [];
  page.on('pageerror', e => erreurs.push(String(e.message)));
  page.on('console', m => { if (m.type() === 'error') erreurs.push('console: ' + m.text()); });

  await page.goto(`${url}?lang=${cas.lang}`, { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  // On lit les DONNÉES réellement fusionnées, pas seulement le DOM :
  // c'est ce que le merger a produit qui compte.
  const echantillon = await page.evaluate(() => {
    const src = (typeof DINOS !== 'undefined' ? DINOS : window.DINOS) || [];
    const trex = src.find(d => d.id === 'tyrannosaurus') || {};
    return { total: src.length, desc: trex.desc || '', name: trex.name || '' };
  });

  // Le CHASSIS : premier onglet + titre d'ecran, lus dans le DOM rendu.
  const ui = await page.evaluate(() => ({
    onglet: (document.querySelector('#mp-pill-famille')?.textContent || '').replace(/[^\p{L}\s'’-]/gu, '').trim(),
    titre: (document.querySelector('.mp-title')?.textContent || '').replace(/[^\p{L}\s'’-]/gu, '').trim()
  }));

  const texte = echantillon.desc;
  const okAttendu = cas.attendu.test(texte);
  const okInterdit = !cas.interdit || !cas.interdit.test(texte);
  const okUI = !cas.ui || cas.ui.test(ui.onglet);
  const okUIInterdit = !cas.uiInterdit || !cas.uiInterdit.test(ui.onglet);
  const ok = okAttendu && okInterdit && okUI && okUIInterdit
             && erreurs.length === 0 && echantillon.total > 0;
  if (!ok) echecs++;

  await page.screenshot({ path: path.join(OUT, `dino-${cas.lang}.png`), fullPage: false });

  console.log(`[${ok ? 'PASS' : 'FAIL'}] ${cas.lang} — ${echantillon.total} dinos`);
  console.log(`        T-Rex : "${texte.slice(0, 90)}"`);
  console.log(`        UI    : onglet "${ui.onglet}" · titre "${ui.titre}"`);
  if (!okAttendu) console.log(`        ATTENDU non trouvé : ${cas.attendu}`);
  if (!okInterdit) console.log(`        MOT FR RÉSIDUEL détecté`);
  if (!okUI) console.log(`        UI non traduite : onglet attendu ${cas.ui}`);
  if (!okUIInterdit) console.log(`        UI RESTÉE EN FRANÇAIS`);
  erreurs.slice(0, 3).forEach(e => console.log(`        ERREUR ${e}`));
  await ctx.close();
}

await browser.close();
console.log(`\ncaptures : ${OUT}`);
console.log(echecs ? `${echecs} langue(s) en échec` : 'toutes les langues OK');
process.exit(echecs ? 1 : 0);
