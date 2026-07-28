// Capture toutes les vignettes VIGNETTES{} de mur.js à taille réelle (~80px)
// pour jugement visuel avant/après refonte. Script jetable (tests/_scratch).
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', '..', 'site');
const INDEX = resolve(SITE, 'index.html');
const OUT = __dir;
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
await page.addInitScript(() => { localStorage.setItem('maxplay_admin', JSON.stringify({ unlockAll: true })); });
await page.goto(pathToFileURL(INDEX).href, { waitUntil: 'networkidle' });

await page.evaluate(() => { if (window.MUR) window.MUR.showMur(); });

const copainIds = await page.evaluate(() => {
  var els = document.querySelectorAll('.copain');
  return Array.from(els).map(function (e) { return e.dataset.copain; });
});
console.log('Copains:', copainIds);

let html = '<html><body style="background:#0a1226;display:flex;flex-wrap:wrap;gap:20px;padding:20px;font-family:sans-serif">';

const seen = {};
const collected = [];
for (const cid of copainIds) {
  await page.evaluate((id) => { if (window.MUR) window.MUR.openRepaire(id); }, cid);
  await page.waitForTimeout(200);
  const jeux = await page.evaluate(() => {
    var els = document.querySelectorAll('#rep-jeux .rep-jeu, .frise .frise-jeu');
    return Array.from(els).map(function (e) {
      return { url: e.dataset.url, titre: (e.querySelector('.j-titre,.frise-titre') || {}).textContent || '', html: (e.querySelector('.vig') || {}).outerHTML || '' };
    });
  });
  for (const j of jeux) {
    if (!j.html || seen[j.url]) continue;
    seen[j.url] = 1;
    collected.push(j);
  }
}
console.log('Vignettes collectées:', collected.length);
for (const j of collected) {
  html += `<div style="text-align:center;color:#fff;font-size:11px;width:110px">
    <div class="vig-wrap" style="width:80px;height:80px;border-radius:16px;overflow:hidden;margin:0 auto 4px">${j.html}</div>
    <div>${j.url}</div><div style="opacity:.6">${j.titre}</div>
  </div>`;
}
html += '</body></html>';

const page2 = await browser.newPage({ viewport: { width: 1400, height: 1400 } });
await page2.setContent(html, { waitUntil: 'load' });
await page2.addStyleTag({ path: resolve(SITE, 'css/mur.css') }).catch(() => {});
await page2.addScriptTag({ path: resolve(SITE, 'js/bus-svg.js') }).catch(() => {});
await page2.evaluate(() => {
  document.querySelectorAll('.vig-bus').forEach(function (el) {
    if (typeof window.busSVG !== 'function') return;
    var nums = (el.dataset.bus || '162').split(',');
    el.innerHTML = nums.slice(0, 2).map(function (n) { return window.busSVG('#E2001A', '#fff', n.trim(), 120); }).join('');
  });
});
await page2.waitForTimeout(300);
await page2.screenshot({ path: resolve(OUT, 'vignettes-grid.png'), fullPage: true });
console.log('Saved', resolve(OUT, 'vignettes-grid.png'));

await browser.close();
