// Test E2E dev-dinos.html — GitHub Pages
// Viewport mobile 390×844, screenshots dans /c/tmp/dino-test/
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = '/c/tmp/dino-test';
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
});

// ── 1. Page initiale (menu)
console.log('\n── STEP 1 : chargement page initiale ──');
await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/01-menu-initial.png`, fullPage: false });
console.log('  screenshot 01-menu-initial.png sauvegardé');

// Lister tous les boutons visibles
const btns = await page.$$eval('button, [role="button"], .v1-btn, .mode-btn', els =>
  els.map(el => ({ text: el.textContent?.trim(), id: el.id, cls: el.className }))
);
console.log('  Boutons trouvés:', JSON.stringify(btns, null, 2));

// ── 2. Clic sur "Les familles"
console.log('\n── STEP 2 : clic bouton familles ──');
// Chercher le bouton par texte
const famillesBtn = page.locator('button, .v1-btn, .mode-btn').filter({ hasText: /famille|familles/i }).first();
const famillesBtnAlt = page.locator('text=/famille/i').first();

let clicked = false;
try {
  await famillesBtn.waitFor({ timeout: 5000 });
  await famillesBtn.click();
  clicked = true;
  console.log('  Cliqué sur bouton familles (locator 1)');
} catch {
  try {
    await famillesBtnAlt.click();
    clicked = true;
    console.log('  Cliqué sur bouton familles (locator texte)');
  } catch (e2) {
    console.log('  WARN: bouton familles non trouvé:', e2.message);
  }
}
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/02-mode-familles.png`, fullPage: false });
console.log('  screenshot 02-mode-familles.png sauvegardé');

// ── 3. Clic sur une catégorie (herbivores ou carnivores)
console.log('\n── STEP 3 : clic sur une catégorie ──');
// Chercher catégories visibles
const cats = await page.$$eval('[class*="cat"], [class*="family"], [class*="group"], .v1-category, .v1-cat', els =>
  els.map(el => ({ text: el.textContent?.trim().slice(0, 40), cls: el.className }))
);
console.log('  Catégories trouvées:', JSON.stringify(cats));

// Essayer des sélecteurs larges
const catBtn = page.locator('button, .v1-btn').filter({ hasText: /carnivore|herbivore|omnivore|théropode|sauropode|cératopsien/i }).first();
let catClicked = false;
try {
  await catBtn.waitFor({ timeout: 4000 });
  const catText = await catBtn.textContent();
  console.log('  Catégorie trouvée:', catText?.trim());
  await catBtn.click();
  catClicked = true;
} catch {
  // Fallback : cliquer sur le premier élément cliquable visible après step 2
  console.log('  Fallback: cherche premier élément cliquable visible...');
  const allClickable = page.locator('button:visible, [onclick]:visible, [class*="item"]:visible').first();
  try {
    await allClickable.click();
    catClicked = true;
    console.log('  Cliqué fallback (premier cliquable)');
  } catch (e3) {
    console.log('  WARN: aucune catégorie cliquable:', e3.message);
  }
}
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/03-grille-dinos.png`, fullPage: false });
console.log('  screenshot 03-grille-dinos.png sauvegardé');

// Analyser la grille : scroll possible ?
const gridInfo = await page.evaluate(() => {
  // Chercher conteneur avec overflow scroll/auto
  const candidates = Array.from(document.querySelectorAll('*')).filter(el => {
    const s = window.getComputedStyle(el);
    return (s.overflowY === 'auto' || s.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 5;
  });
  return candidates.map(el => ({
    tag: el.tagName,
    id: el.id,
    cls: el.className?.slice(0, 60),
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    scrollable: el.scrollHeight > el.clientHeight + 5,
  }));
});
console.log('  Éléments scrollables détectés:', JSON.stringify(gridInfo, null, 2));

// Compter les dinos affichés
const dinoCount = await page.$$eval('[class*="dino"], [class*="card"], [class*="grid"] > *, .v1-dino-card, .v1-card', els => els.length);
console.log(`  Nombre de cartes dino visibles: ${dinoCount}`);

// ── 4. Clic sur le premier dino de la grille
console.log('\n── STEP 4 : clic sur premier dino ──');
const dinoCard = page.locator('[class*="dino"], [class*="card"], .v1-dino-card, .v1-card, [class*="grid"] > *').first();
try {
  await dinoCard.waitFor({ timeout: 4000 });
  const dinoText = await dinoCard.textContent();
  console.log('  Premier dino:', dinoText?.trim().slice(0, 50));
  await dinoCard.click();
} catch (e) {
  console.log('  WARN: pas de carte dino cliquable:', e.message);
}
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/04-fiche-detail.png`, fullPage: false });
console.log('  screenshot 04-fiche-detail.png sauvegardé');

// Screenshot full page pour voir tout le contenu de la fiche
await page.screenshot({ path: `${OUT}/04b-fiche-detail-full.png`, fullPage: true });
console.log('  screenshot 04b-fiche-detail-full.png (fullPage) sauvegardé');

// ── 5. Chercher les boîtes rouges (background #ff0000)
console.log('\n── STEP 5 : analyse boîtes rouges ──');
const redBoxes = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('*'));
  return all.filter(el => {
    const s = window.getComputedStyle(el);
    const bg = s.backgroundColor;
    // rgb(255, 0, 0) = #ff0000
    return bg === 'rgb(255, 0, 0)' || bg === 'rgba(255, 0, 0, 1)';
  }).map(el => ({
    tag: el.tagName,
    id: el.id,
    cls: el.className?.slice(0, 60),
    text: el.textContent?.trim().slice(0, 40),
    visible: el.offsetParent !== null,
  }));
});
console.log(`  Boîtes rouge #ff0000 trouvées: ${redBoxes.length}`);
if (redBoxes.length > 0) {
  console.log('  Détails:', JSON.stringify(redBoxes, null, 2));
} else {
  console.log('  AUCUNE boîte rouge #ff0000 détectée (peut-être pas sur la fiche visible)');
}

// Chercher .v1-list-box spécifiquement
const listBoxes = await page.$$eval('[class*="list-box"], [class*="listbox"], .v1-list-box', els =>
  els.map(el => {
    const s = window.getComputedStyle(el);
    return {
      cls: el.className,
      bg: s.backgroundColor,
      visible: el.offsetParent !== null,
      text: el.textContent?.trim().slice(0, 60),
    };
  })
);
console.log(`  Éléments .v1-list-box ou similaires: ${listBoxes.length}`);
if (listBoxes.length > 0) console.log('  Détails:', JSON.stringify(listBoxes, null, 2));

// ── Rapport erreurs JS
console.log('\n── RAPPORT ERREURS JS ──');
if (jsErrors.length === 0) {
  console.log('  Aucune erreur JS (pageerror)');
} else {
  jsErrors.forEach(e => console.log('  ERROR:', e));
}

// Console errors
const consoleErrors = consoleMsgs.filter(m => m.startsWith('[error]'));
if (consoleErrors.length === 0) {
  console.log('  Aucune erreur console');
} else {
  consoleErrors.forEach(m => console.log('  CONSOLE:', m));
}

await browser.close();
console.log('\n── Tests terminés. Screenshots dans /c/tmp/dino-test/ ──\n');
