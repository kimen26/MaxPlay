// Test E2E dev-dinos.html — GitHub Pages — v2 avec sélecteurs exacts
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = 'C:/tmp/dino-test';
mkdirSync(OUT, { recursive: true });

const URL = 'https://kimen26.github.io/MaxPlay/dev-dinos.html';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

const jsErrors = [];
const consoleMsgs = [];
page.on('pageerror', e => jsErrors.push(`pageerror: ${e.message}`));
page.on('console', m => {
  const txt = `[${m.type()}] ${m.text()}`;
  consoleMsgs.push(txt);
  if (m.type() === 'error') console.error('  CONSOLE ERROR:', m.text());
  if (m.type() === 'warn') console.warn('  CONSOLE WARN:', m.text());
});

// ── 1. Page initiale (menu) — mode "régime" actif par défaut
console.log('\n── STEP 1 : chargement page initiale ──');
await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/01-menu-initial.png`, fullPage: false });
console.log('  screenshot 01-menu-initial.png');

// Inspecter la structure visible initiale
const initView = await page.evaluate(() => {
  const screens = ['#screen-menu', '#screen-categories', '#screen-grid', '#screen-detail', '#screen-carousel'];
  return screens.map(sel => {
    const el = document.querySelector(sel);
    if (!el) return { sel, exists: false };
    const s = window.getComputedStyle(el);
    return { sel, exists: true, display: s.display, visibility: s.visibility, opacity: s.opacity };
  });
});
console.log('  Écrans initiaux:', JSON.stringify(initView, null, 2));

// ── 2. Clic sur "🦖 Les familles"
console.log('\n── STEP 2 : clic bouton familles ──');
await page.locator('#mode-btn-famille').click();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/02-mode-familles.png`, fullPage: false });
console.log('  screenshot 02-mode-familles.png');

// Vérifier quel écran est visible
const afterFamilleView = await page.evaluate(() => {
  const screens = ['#screen-menu', '#screen-categories', '#screen-grid', '#screen-detail'];
  return screens.map(sel => {
    const el = document.querySelector(sel);
    if (!el) return { sel, exists: false };
    const s = window.getComputedStyle(el);
    return { sel, display: s.display, visibility: s.visibility };
  });
});
console.log('  Écrans après clic familles:', JSON.stringify(afterFamilleView, null, 2));

// ── 3. Clic sur la première catégorie (Les T-Rex)
console.log('\n── STEP 3 : clic sur catégorie "Les T-Rex" ──');
const firstCat = page.locator('.cat-card').first();
const firstCatText = await firstCat.textContent().catch(() => '?');
console.log('  Première catégorie:', firstCatText?.trim().slice(0, 40));
await firstCat.click();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/03-grille-dinos.png`, fullPage: false });
console.log('  screenshot 03-grille-dinos.png');

// Analyser grille dinos
const gridAnalysis = await page.evaluate(() => {
  // Chercher le conteneur de grille
  const gridContainers = ['#screen-grid', '.grid-container', '.dino-grid', '[class*="grid"]'];
  const results = {};

  for (const sel of gridContainers) {
    const el = document.querySelector(sel);
    if (el) {
      const s = window.getComputedStyle(el);
      results[sel] = {
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        overflowY: s.overflowY,
        isScrollable: el.scrollHeight > el.clientHeight + 5,
        childCount: el.children.length,
      };
    }
  }

  // Chercher TOUS les scrollables
  const allScrollable = Array.from(document.querySelectorAll('*')).filter(el => {
    const s = window.getComputedStyle(el);
    return (s.overflowY === 'auto' || s.overflowY === 'scroll');
  }).map(el => {
    const s = window.getComputedStyle(el);
    return {
      tag: el.tagName,
      id: el.id,
      cls: el.className?.slice(0, 50),
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      overflowY: s.overflowY,
      scrollable: el.scrollHeight > el.clientHeight + 5,
    };
  });

  // Compter les cartes dino dans la grille
  const dinoCards = document.querySelectorAll('.dino-card, [class*="dino-card"]');

  return { gridContainers: results, allScrollable, dinoCardCount: dinoCards.length };
});
console.log('  Analyse grille:');
console.log('    Conteneurs:', JSON.stringify(gridAnalysis.gridContainers, null, 2));
console.log('    Éléments overflow scroll/auto:', JSON.stringify(gridAnalysis.allScrollable, null, 2));
console.log(`    Cartes .dino-card: ${gridAnalysis.dinoCardCount}`);

// ── 4. Clic sur le premier dino de la grille
console.log('\n── STEP 4 : clic sur premier dino ──');

// D'abord trouver quels éléments existent dans la grille
const gridItems = await page.$$eval('.dino-card, [class*="dino-card"], #screen-grid img, #screen-grid .card', els =>
  els.slice(0, 5).map(el => ({ tag: el.tagName, cls: el.className, text: el.textContent?.trim().slice(0, 30) }))
);
console.log('  Items grille trouvés:', JSON.stringify(gridItems));

const firstDino = page.locator('.dino-card, [class*="dino-card"]').first();
try {
  await firstDino.waitFor({ timeout: 5000 });
  const dinoText = await firstDino.textContent();
  console.log('  Clic sur:', dinoText?.trim().slice(0, 40));
  await firstDino.click();
} catch (e) {
  console.log('  WARN dino-card non trouvé, tentative fallback...');
  // Inspecter le DOM de la grille
  const gridDOM = await page.evaluate(() => {
    const grid = document.querySelector('#screen-grid, .grid-screen, [id*="grid"]');
    if (!grid) return 'grid non trouvé';
    return grid.innerHTML.slice(0, 500);
  });
  console.log('  DOM grille:', gridDOM);
}
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/04-fiche-detail.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/04b-fiche-detail-full.png`, fullPage: true });
console.log('  screenshots 04-fiche-detail.png + 04b-fiche-detail-full.png');

// ── 5. Analyse boîtes rouges + v1-list-box
console.log('\n── STEP 5 : analyse boîtes rouges et v1-list-box ──');
const colorAnalysis = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('*'));

  // Boîtes rouge exactement #ff0000
  const redBoxes = all.filter(el => {
    const s = window.getComputedStyle(el);
    return s.backgroundColor === 'rgb(255, 0, 0)';
  }).map(el => ({
    tag: el.tagName, id: el.id, cls: el.className?.slice(0, 60),
    text: el.textContent?.trim().slice(0, 40),
    visible: el.offsetParent !== null,
  }));

  // Tout élément avec background rouge (toutes teintes)
  const anyRed = all.filter(el => {
    const bg = window.getComputedStyle(el).backgroundColor;
    if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') return false;
    const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return false;
    const [, r, g, b] = match.map(Number);
    // Rouge dominant : r > 180, g < 100, b < 100
    return r > 180 && g < 100 && b < 100;
  }).map(el => ({
    tag: el.tagName, id: el.id, cls: el.className?.slice(0, 60),
    bg: window.getComputedStyle(el).backgroundColor,
    text: el.textContent?.trim().slice(0, 40),
  }));

  // v1-list-box
  const listBoxes = Array.from(document.querySelectorAll('[class*="list-box"]')).map(el => ({
    cls: el.className,
    bg: window.getComputedStyle(el).backgroundColor,
    border: window.getComputedStyle(el).border,
    visible: el.offsetParent !== null,
    text: el.textContent?.trim().slice(0, 60),
  }));

  // Fiche détail DOM
  const detail = document.querySelector('#screen-detail, .detail-screen, [id*="detail"]');
  const detailDom = detail ? detail.innerHTML.slice(0, 800) : 'non trouvé';

  return { redBoxes, anyRed, listBoxes, detailDom };
});
console.log(`  Boîtes rouge #ff0000 exactes: ${colorAnalysis.redBoxes.length}`);
if (colorAnalysis.redBoxes.length > 0) console.log('  Détail:', JSON.stringify(colorAnalysis.redBoxes, null, 2));
console.log(`  Éléments avec teinte rouge: ${colorAnalysis.anyRed.length}`);
if (colorAnalysis.anyRed.length > 0) console.log('  Détail:', JSON.stringify(colorAnalysis.anyRed, null, 2));
console.log(`  Éléments [class*=list-box]: ${colorAnalysis.listBoxes.length}`);
if (colorAnalysis.listBoxes.length > 0) console.log('  Détail:', JSON.stringify(colorAnalysis.listBoxes, null, 2));
console.log('  DOM fiche détail (800 chars):', colorAnalysis.detailDom);

// ── Rapport final erreurs JS
console.log('\n── RAPPORT ERREURS JS ──');
if (jsErrors.length === 0) {
  console.log('  Aucune erreur pageerror');
} else {
  jsErrors.forEach(e => console.log('  PAGEERROR:', e));
}
const consoleErrors = consoleMsgs.filter(m => m.startsWith('[error]'));
if (consoleErrors.length === 0) {
  console.log('  Aucune erreur console.error');
} else {
  consoleErrors.forEach(m => console.log('  CONSOLE ERROR:', m));
}

// Afficher tous les messages console pour contexte
console.log(`\n  Total messages console: ${consoleMsgs.length}`);
if (consoleMsgs.length > 0 && consoleMsgs.length <= 30) {
  consoleMsgs.forEach(m => console.log('  >', m));
}

await browser.close();
console.log('\n── Tests terminés. Screenshots dans /c/tmp/dino-test/ ──\n');
