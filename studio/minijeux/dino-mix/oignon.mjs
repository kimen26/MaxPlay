// Pelure d'oignon Dino-Mix : toutes les images d'un cycle superposées en transparence + courbe du bout de
// chaque pied (rouge = jambe proche, bleu = jambe du fond). Sert à juger la trajectoire et la boucle.
// Usage : node studio/minijeux/dino-mix/oignon.mjs <sortie.png> <url page jambes>
import { createRequire } from 'module';
import { writeFileSync } from 'node:fs';
const require = createRequire(new URL('../../../package.json', import.meta.url));
const { chromium } = require('playwright');
const [OUT, URL_] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage();
const errors = []; p.on('pageerror', e => errors.push(String(e)));
await p.goto(URL_); await p.waitForFunction(() => window.__jambes && window.__jambes.ready);
const data = await p.evaluate(() => {
  const FEET = ['nus', 'baskets', 'rollers', 'ressorts'], N = 32, W = 520, H = 460;
  const cv = document.createElement('canvas'); cv.width = W * 2; cv.height = H * 2;
  const c = cv.getContext('2d'); c.fillStyle = '#fbf6ea'; c.fillRect(0, 0, cv.width, cv.height);
  FEET.forEach((f, k) => {
    const ox = (k % 2) * W, oy = Math.floor(k / 2) * H, gx = ox + W / 2, gy = oy + H - 40;
    c.strokeStyle = '#bbb'; c.beginPath(); c.moveTo(ox, gy); c.lineTo(ox + W, gy); c.stroke();
    const tr = []; window.__trace = tr;
    c.globalAlpha = 0.1;
    for (let i = 0; i < N; i++) window.__jambes.draw(c, gx, gy, 300, i / N, f);
    c.globalAlpha = 1; window.__trace = null;
    [true, false].forEach(far => {
      const pts = tr.filter(t => t.far === far);
      c.strokeStyle = far ? '#2a6df4' : '#e0332a'; c.lineWidth = 2; c.beginPath();
      pts.concat([pts[0]]).forEach((q, i) => i ? c.lineTo(q.x, q.y) : c.moveTo(q.x, q.y)); c.stroke();
      pts.forEach((q, i) => { c.fillStyle = i === 0 ? '#000' : (far ? '#2a6df4' : '#e0332a'); c.beginPath(); c.arc(q.x, q.y, i === 0 ? 5 : 3, 0, 7); c.fill(); });
    });
    c.fillStyle = '#000'; c.font = '20px sans-serif'; c.fillText(f, ox + 10, oy + 26);
  });
  return cv.toDataURL();
});
writeFileSync(OUT, Buffer.from(data.split(',')[1], 'base64'));
console.log('ok', OUT, 'errors', JSON.stringify(errors)); await b.close();
