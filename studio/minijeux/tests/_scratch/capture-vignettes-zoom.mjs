// Zoom x3 (240px) de chaque vignette pour juger le détail, en gardant le rendu
// réel à 80px comme référence primaire (déjà capturé dans vignettes-grid.png).
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', '..', 'site');
const INDEX = resolve(SITE, 'index.html');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
await page.addInitScript(() => { localStorage.setItem('maxplay_admin', JSON.stringify({ unlockAll: true })); });
await page.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });
await page.evaluate(() => { if (window.MUR) window.MUR.showMur(); });

const copainIds = await page.evaluate(() => Array.from(document.querySelectorAll('.copain')).map(e => e.dataset.copain));

const seen = {};
const collected = [];
for (const cid of copainIds) {
  await page.evaluate((id) => { if (window.MUR) window.MUR.openRepaire(id); }, cid);
  await page.waitForTimeout(200);
  const jeux = await page.evaluate(() => Array.from(document.querySelectorAll('#rep-jeux .rep-jeu, .frise .frise-jeu')).map(e => ({
    url: e.dataset.url, titre: (e.querySelector('.j-titre,.frise-titre') || {}).textContent || '', html: (e.querySelector('.vig') || {}).outerHTML || ''
  })));
  for (const j of jeux) { if (!j.html || seen[j.url]) continue; seen[j.url] = 1; collected.push(j); }
}
console.log('collected', collected.length, collected.map(c => c.url).join(','));

let html = '<html><body style="background:#0a1226;display:flex;flex-wrap:wrap;gap:24px;padding:24px;font-family:sans-serif">';
for (const j of collected) {
  html += `<div style="text-align:center;color:#fff;font-size:14px;width:260px">
    <div style="width:240px;height:240px;border-radius:32px;overflow:hidden;margin:0 auto 6px;transform-origin:top left;">${j.html}</div>
    <div><b>${j.url}</b></div><div style="opacity:.7">${j.titre}</div>
  </div>`;
}
html += '</body></html>';

const page2 = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
await page2.setContent(html, { waitUntil: 'load' });
await page2.addStyleTag({ path: resolve(SITE, 'css/mur.css') }).catch(() => {});
// scale up: la .vig est stylée à taille du parent (width:100%,height:100%), donc
// un conteneur 240px suffit déjà (aspect-ratio:1, box-sizing border-box).
await page2.addScriptTag({ path: resolve(SITE, 'js/bus-svg.js') }).catch(() => {});
await page2.evaluate(() => {
  document.querySelectorAll('.vig-bus').forEach(function (el) {
    if (typeof window.busSVG !== 'function') return;
    var nums = (el.dataset.bus || '162').split(',');
    el.innerHTML = nums.slice(0, 2).map(function (n) { return window.busSVG('#E2001A', '#fff', n.trim(), 120); }).join('');
  });
});
await page2.waitForTimeout(300);
await page2.screenshot({ path: resolve(__dir, 'vignettes-zoom.png'), fullPage: true });
console.log('saved');
await browser.close();
