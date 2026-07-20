// Screenshot util : ouvre un MJ, ferme le panneau règle, attend, screenshot.
// Usage : node shot.mjs <url-relative-site> <out.png> [waitMs] [evalJs]
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const [, , rel, out, waitMs = '1500', evalJs = ''] = process.argv;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../site');
const url = 'file:///' + path.join(root, rel).replace(/\\/g, '/');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 420, height: 760 } });
const errors = [];
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
await page.goto(url);
try {
  await page.waitForSelector('#ri-panneau.on', { timeout: 4000 });
  await page.click('#ri-ok');
} catch (e) { /* pas de panneau */ }
if (evalJs) await page.evaluate(evalJs);
await page.waitForTimeout(parseInt(waitMs, 10));
await page.screenshot({ path: out });
console.log('OK ' + out);
if (errors.length) { console.log(errors.join('\n')); process.exit(2); }
await browser.close();
