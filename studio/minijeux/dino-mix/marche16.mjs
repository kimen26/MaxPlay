import { createRequire } from 'module';
const require = createRequire(new URL('../../../package.json', import.meta.url));
const { chromium } = require('playwright');
const [OUT, PAGE] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 900, height: 600 } });
const errors = []; p.on('pageerror', e => errors.push(String(e)));
await p.goto(PAGE); await p.waitForFunction(() => window.__jambes && window.__jambes.ready);
// 16 images du cycle de marche, en grand, pour juger la boucle (la 17e = la 1re).
const url = await p.evaluate(() => {
  const cv = document.createElement('canvas'); cv.width = 8 * 180; cv.height = 2 * 230;
  const c = cv.getContext('2d'); c.fillStyle = '#fbf6ea'; c.fillRect(0, 0, cv.width, cv.height);
  for (let i = 0; i < 16; i++) { c.strokeStyle = '#ccc'; c.beginPath(); c.moveTo(0, 215 + Math.floor(i / 8) * 230); c.lineTo(cv.width, 215 + Math.floor(i / 8) * 230); c.stroke();
    window.__jambes.draw(c, (i % 8) * 180 + 90, 215 + Math.floor(i / 8) * 230, 120, i / 16, 'nus'); c.fillStyle = '#000'; c.fillText(String(i), (i % 8) * 180 + 5, 12 + Math.floor(i / 8) * 230); }
  return cv.toDataURL();
});
(await import('node:fs')).writeFileSync(OUT, Buffer.from(url.split(',')[1], 'base64'));
console.log('errors', JSON.stringify(errors)); await b.close();
