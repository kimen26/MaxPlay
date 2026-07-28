import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(__dirname, '../../../../site');
const url = 'file://' + SITE.split(String.fromCharCode(92)).join('/') + '/dev-dinos.html';

const cases = [
  { id: 'saurolophus', label: 'composite-na-asie' },
  { id: 'mammuthus', label: 'composite-eurasie-na' },
  { id: 'smilodon', label: 'composite-ameriques' },
  { id: 'coelodonta', label: 'composite-eurasie' },
];

const browser = await chromium.launch();
for (const c of cases) {
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
  page.on('pageerror', err => console.log('PAGEERROR', c.label, String(err)));
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  await page.evaluate((id) => {
    const d = DINOS.find(x => x.id === id);
    showScreen('fiche');
    buildFiche(d);
  }, c.id);
  await page.waitForTimeout(300);
  const el = await page.$('.wmap-svg');
  await el.screenshot({ path: path.resolve(__dirname, `mapv3-${c.label}.png`) });
  console.log('OK', c.label);
  await page.close();
}
await browser.close();
