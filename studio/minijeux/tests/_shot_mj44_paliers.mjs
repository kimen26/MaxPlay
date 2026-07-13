// Screenshots ponctuels des 3 paliers de mj-44 (validation visuelle pictos)
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const html = pathToFileURL(resolve(__dir, '..', '..', '..', 'site', 'mj-44.html')).href;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
await page.goto(html, { waitUntil: 'networkidle' });
for (const p of [1, 2, 3]) {
  await page.evaluate(s => window.__mjTest.setDifficulty(s), p);
  await page.waitForTimeout(120);
  await page.screenshot({ path: resolve(__dir, '.artifacts', `mj-44-p${p}.png`) });
}
await browser.close();
console.log('ok');
