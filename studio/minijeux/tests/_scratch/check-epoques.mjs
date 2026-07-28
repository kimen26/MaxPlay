import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(__dirname, '../../../../site');
const url = 'file://' + SITE.split(String.fromCharCode(92)).join('/') + '/dev-dinos.html';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
const errs = []; const bad404 = [];
page.on('pageerror', e => errs.push(String(e)));
page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
page.on('response', r => { if (r.status() === 404) bad404.push(r.url()); });
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(300);

// Ouvre l'onglet epoque
await page.click('#mp-pill-epoque');
await page.waitForTimeout(300);
await page.screenshot({ path: path.resolve(__dirname, 'onglet-epoques.png') });

// Verifie l'ordre chronologique affiche (labels dans le DOM, dans l'ordre)
const labels = await page.evaluate(() => Array.from(document.querySelectorAll('#menu-scroll .fam-label')).map(e => e.textContent.trim()));
console.log('Ordre affiche:', labels);

// Clique la 1re carte epoque (Permien) -> grille
await page.click('#menu-scroll .fam-card');
await page.waitForTimeout(300);
await page.screenshot({ path: path.resolve(__dirname, 'onglet-epoques-grille.png') });
const gridTitle = await page.evaluate(() => document.getElementById('grid-title').textContent);
console.log('Titre grille apres clic:', gridTitle);

// Clique un dino -> fiche
const anyCard = await page.$('#grid-scroll .dino-card');
if (anyCard) {
  await anyCard.click();
  await page.waitForTimeout(500);
  const ficheTitle = await page.evaluate(() => document.getElementById('fiche-hdr-name').textContent);
  console.log('Fiche ouverte:', ficheTitle);
  await page.screenshot({ path: path.resolve(__dirname, 'onglet-epoques-fiche.png') });
}

console.log('Console errors:', errs.length ? errs : 'aucune');
console.log('404s:', bad404.length ? bad404 : 'aucun');
await browser.close();
