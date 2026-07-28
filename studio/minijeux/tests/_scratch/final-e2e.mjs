import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(__dirname, '../../../../site');
const ART = path.resolve(__dirname, '../.artifacts');
const url = 'file://' + SITE.split(String.fromCharCode(92)).join('/') + '/dev-dinos.html';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
const errs = []; const bad404 = [];
page.on('pageerror', e => errs.push(String(e)));
page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
page.on('response', r => { if (r.status() === 404) bad404.push(r.url()); });

await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(400);

// 1) Onglet Familles (defaut) + carte du monde sur une fiche
await page.screenshot({ path: path.resolve(ART, 'familles.png') });

await page.evaluate(() => {
  const d = DINOS.find(x => x.id === 'spinosaurus');
  showScreen('fiche'); buildFiche(d);
  document.getElementById('fiche-scroll').scrollTop = 260;
});
await page.waitForTimeout(300);
await page.screenshot({ path: path.resolve(ART, 'carte-monde.png') });
await page.evaluate(() => showMenu());
await page.waitForTimeout(200);

// 2) Ce qu'il mange
await page.click('#mp-pill-regime');
await page.waitForTimeout(300);
const regimeOk = await page.$('#menu-scroll .cat-card') !== null;

// 3) Le voyage
await page.click('#mp-pill-periode');
await page.waitForTimeout(300);
const voyageOk = await page.$('#menu-scroll .journey-ep') !== null;

// 4) Les epoques
await page.click('#mp-pill-epoque');
await page.waitForTimeout(300);
await page.screenshot({ path: path.resolve(ART, 'onglet-epoques.png') });
const epoqueLabels = await page.evaluate(() => Array.from(document.querySelectorAll('#menu-scroll .fam-label')).map(e => e.textContent.trim()));

// 5) Le dico
await page.click('#mp-pill-dico');
await page.waitForTimeout(300);
const dicoOk = await page.$('#menu-scroll .dico-card') !== null;

// Retour Familles pour le screenshot final propre + verif image emblemes chargees (pas de fallback emoji visible pour les 9)
await page.click('#mp-pill-famille');
await page.waitForTimeout(300);
const famImgsLoaded = await page.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll('#menu-scroll .fam-thumb img'));
  return imgs.map(img => ({ src: img.getAttribute('src'), complete: img.complete, naturalWidth: img.naturalWidth }));
});

console.log('Regime tab OK:', regimeOk);
console.log('Voyage tab OK:', voyageOk);
console.log('Epoque order:', epoqueLabels);
console.log('Dico tab OK:', dicoOk);
console.log('Famille images:', JSON.stringify(famImgsLoaded, null, 2));
console.log('Console errors:', errs.length ? errs : 'AUCUNE');
console.log('404s:', bad404.length ? bad404 : 'AUCUN');

await browser.close();
