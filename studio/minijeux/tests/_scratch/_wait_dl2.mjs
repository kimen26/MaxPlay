import { chromium } from 'playwright';
import fs from 'fs';
const b = await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx = b.contexts()[0];
const p = ctx.pages().find(pg => pg.url().includes('chatgpt.com'));
const deadline = Date.now() + 160000;
let found = null;
while (Date.now() < deadline) {
  const info = await p.evaluate(() => {
    const bad = s => !s || s.startsWith('data:') || s.includes('auth0') || s.includes('avatar');
    const imgs = [...document.querySelectorAll('img')]
      .map(i=>({src:i.src,w:i.naturalWidth,h:i.naturalHeight}))
      .filter(i=>!bad(i.src) && i.w>=256 && i.h>=256);
    const streaming = !!document.querySelector('[data-testid="stop-button"]');
    return { imgs, streaming };
  });
  if (info.imgs.length) { found = info.imgs[0].src; console.log('\nIMAGE', info.imgs[0].w+'x'+info.imgs[0].h, found.slice(0,70)); break; }
  process.stdout.write(`\r[${Math.round((Date.now()-(deadline-160000))/1000)}s] stream=${info.streaming}`);
  await p.waitForTimeout(4000);
}
if (!found) { console.log('\nENCORE PAS D IMAGE'); await b.close(); process.exit(3); }
const resp = await p.request.get(found);
fs.writeFileSync('C:/tmp/tritri_cubist.png', await resp.body());
console.log('TÉLÉCHARGÉ', fs.statSync('C:/tmp/tritri_cubist.png').size, 'octets');
await b.close();
