// Test scroll fiche dino — focus sur v1-list-box rouges
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = 'C:/tmp/dino-test';
mkdirSync(OUT, { recursive: true });

const URL = 'https://kimen26.github.io/MaxPlay/dev-dinos.html';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

const jsErrors = [];
page.on('pageerror', e => jsErrors.push(e.message));

await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1000);

// Clic familles
await page.locator('#mode-btn-famille').click();
await page.waitForTimeout(800);

// Clic T-Rex category
await page.locator('.cat-card').first().click();
await page.waitForTimeout(800);

// Clic sur T-Rex dino
await page.locator('.dino-card').first().click();
await page.waitForTimeout(1200);

// Screenshot du haut de fiche
await page.screenshot({ path: `${OUT}/05-fiche-haut.png`, fullPage: false });
console.log('screenshot 05-fiche-haut.png');

// Inspecter le conteneur scrollable de la fiche
const ficheInfo = await page.evaluate(() => {
  const ficheScroll = document.querySelector('#fiche-scroll');
  if (!ficheScroll) return { error: '#fiche-scroll non trouvé' };
  const s = window.getComputedStyle(ficheScroll);
  return {
    display: s.display,
    overflowY: s.overflowY,
    scrollHeight: ficheScroll.scrollHeight,
    clientHeight: ficheScroll.clientHeight,
    scrollTop: ficheScroll.scrollTop,
    isScrollable: ficheScroll.scrollHeight > ficheScroll.clientHeight + 5,
    innerHTML_preview: ficheScroll.innerHTML.slice(0, 200),
  };
});
console.log('Fiche scroll info:', JSON.stringify(ficheInfo, null, 2));

// Chercher le conteneur scrollable visible de la fiche
const scrollableInfo = await page.evaluate(() => {
  // Chercher tous les divs avec overflow scroll/auto ET scrollHeight > clientHeight
  return Array.from(document.querySelectorAll('div')).filter(el => {
    const s = window.getComputedStyle(el);
    return (s.overflowY === 'auto' || s.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 5;
  }).map(el => ({
    id: el.id, cls: el.className?.slice(0, 50),
    scrollHeight: el.scrollHeight, clientHeight: el.clientHeight,
    scrollTop: el.scrollTop,
  }));
});
console.log('Divs vraiment scrollables:', JSON.stringify(scrollableInfo, null, 2));

// Scroller dans #fiche-scroll jusqu'en bas par paliers
for (let i = 1; i <= 4; i++) {
  await page.evaluate((step) => {
    const el = document.querySelector('#fiche-scroll') || document.querySelector('[id*="fiche"]');
    if (el) el.scrollTop += 300;
    else window.scrollBy(0, 300);
  }, i);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/05-fiche-scroll-${i}.png`, fullPage: false });
  console.log(`screenshot 05-fiche-scroll-${i}.png`);
}

// Vérifier les v1-list-box après scroll
const listBoxStatus = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('.v1-list-box')).map(el => {
    const rect = el.getBoundingClientRect();
    const s = window.getComputedStyle(el);
    return {
      text: el.textContent?.trim().slice(0, 50),
      bg: s.backgroundColor,
      border: s.border,
      inViewport: rect.top >= 0 && rect.bottom <= window.innerHeight,
      rectTop: Math.round(rect.top),
      rectBottom: Math.round(rect.bottom),
    };
  });
});
console.log('\nv1-list-box status:', JSON.stringify(listBoxStatus, null, 2));

// Erreurs JS
console.log('\nErreurs JS:', jsErrors.length === 0 ? 'aucune' : jsErrors.join(', '));

await browser.close();
console.log('\nTerminé. Screenshots: C:/tmp/dino-test/');
