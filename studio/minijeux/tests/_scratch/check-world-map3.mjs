import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(__dirname, '../../../../site');
const url = 'file://' + SITE.split(String.fromCharCode(92)).join('/') + '/dev-dinos.html';

const cases = [
  { id: 'spinosaurus', label: 'afrique' },
  { id: 'tyrannosaurus', label: 'amnord' },
  { id: 'iguanodon', label: 'europe' },
  { id: 'therizinosaurus', label: 'asie' },
  { id: 'minmi', label: 'oceanie' },
  { id: 'elasmosaurus', label: 'marin' },
];

const browser = await chromium.launch();

for (const c of cases) {
  // Nouvelle page a chaque fois pour eviter tout etat residuel entre cas.
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
  page.on('pageerror', err => console.log('PAGEERROR', c.label, String(err)));
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  await page.evaluate((id) => {
    const d = DINOS.find(x => x.id === id);
    showScreen('fiche');
    buildFiche(d);
  }, c.id);
  await page.waitForTimeout(400);
  const count = await page.evaluate(() => document.querySelectorAll('.wmap-svg').length);
  const el = await page.$('.wmap-svg');
  if (!el) { console.log('NO MAP for', c.label); await page.close(); continue; }
  await el.screenshot({ path: path.resolve(__dirname, `mapv3-${c.label}.png`) });
  console.log('OK', c.label, 'instances:', count);
  await page.close();
}
await browser.close();
