// armoire-shot.mjs — captures de recette de l'accueil « L'Armoire » v6.
//   node studio/minijeux/tools/armoire-shot.mjs [dossier-de-sortie]
// Une capture par viewport, plus une à portes fermées en 360×740.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const INDEX = resolve(__dir, '..', '..', '..', 'site', 'index.html');
const OUT = process.argv[2] || resolve(__dir, '..', 'docs', 'handoffs', 'rapports', 'captures');
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { w: 320, h: 568 }, { w: 360, h: 640 }, { w: 360, h: 740 },
  { w: 412, h: 915 }, { w: 800, h: 600 }, { w: 1280, h: 720 }
];

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.addInitScript(() => { try { localStorage.clear(); } catch (e) {} });
  await page.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });
  const tag = `${vp.w}x${vp.h}`;

  // l'armoire arrive FERMÉE : c'est l'enfant qui ouvre.
  await page.screenshot({ path: resolve(OUT, `armoire-v6-${tag}-ferme.png`) });
  await page.click('.porte-haut.porte-g');
  await page.click('.porte-bas.porte-g');
  await page.waitForTimeout(900);
  await page.screenshot({ path: resolve(OUT, `armoire-v6-${tag}.png`) });

  const m = await page.evaluate(() => {
    const de = document.documentElement;
    const r = [...document.querySelectorAll('.casier, .objet')].map(c => c.getBoundingClientRect());
    return {
      scrollH: de.scrollHeight, innerH: innerHeight,
      scrollW: de.scrollWidth, innerW: innerWidth,
      n: r.length,
      minW: Math.min(...r.map(x => x.width)), minH: Math.min(...r.map(x => x.height))
    };
  });
  console.log(`${tag}  cases=${m.n}  minTap=${m.minW.toFixed(0)}x${m.minH.toFixed(0)}` +
    `  scroll=${m.scrollW}x${m.scrollH} vs ${m.innerW}x${m.innerH}` +
    (errors.length ? `  ERREURS: ${errors.join(' | ')}` : ''));
  await page.close();
}
await browser.close();
console.log('captures →', OUT);
