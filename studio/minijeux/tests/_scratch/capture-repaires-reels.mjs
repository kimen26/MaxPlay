// Capture les repaires RÉELS (dans le contexte index.html, chemins corrects)
// vue Mur (rangées copains) + chaque repaire en plein écran mobile 390x844.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', '..', 'site');
const INDEX = resolve(SITE, 'index.html');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await page.addInitScript(() => { localStorage.setItem('maxplay_admin', JSON.stringify({ unlockAll: true })); });
await page.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

await page.screenshot({ path: resolve(__dir, 'reel-mur.png') });

const copainIds = await page.evaluate(() => Array.from(document.querySelectorAll('.copain')).map(e => e.dataset.copain));
for (const cid of copainIds) {
  await page.evaluate((id) => { if (window.MUR) window.MUR.openRepaire(id); }, cid);
  await page.waitForTimeout(300);
  await page.screenshot({ path: resolve(__dir, `reel-repaire-${cid}.png`) });
}

await browser.close();
console.log('done');
