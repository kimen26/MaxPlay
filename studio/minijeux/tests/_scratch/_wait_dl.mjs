import { chromium } from 'playwright';
import fs from 'fs';
const b = await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx = b.contexts()[0];
const p = ctx.pages().find(pg => pg.url().includes('chatgpt.com'));
if (!p) { console.log('pas de tab chatgpt'); process.exit(2); }
const deadline = Date.now() + 150000;
let found = null;
while (Date.now() < deadline) {
  const info = await p.evaluate(() => {
    const turns = document.querySelectorAll('[data-message-author-role="assistant"]');
    const last = turns[turns.length-1];
    const streaming = !!document.querySelector('[data-testid="stop-button"]');
    if (!last) return { streaming, imgs: [] };
    const imgs = [...last.querySelectorAll('img')].map(i=>({src:i.src,w:i.naturalWidth,h:i.naturalHeight}))
      .filter(i=>i.src && !i.src.startsWith('data:'));
    return { streaming, imgs, text:(last.innerText||'').slice(0,300) };
  });
  const big = (info.imgs||[]).find(i => i.w>=256 && i.h>=256);
  if (big) { found = big.src; console.log('IMAGE:', big.w+'x'+big.h, big.src.slice(0,80)); break; }
  process.stdout.write(`\r[${Math.round((150000-(deadline-Date.now()))/1000)}s] stream=${info.streaming} imgs=${(info.imgs||[]).length} `);
  await p.waitForTimeout(4000);
}
if (!found) { console.log('\nPAS D IMAGE (timeout 150s)'); await b.close(); process.exit(3); }
// télécharger via le contexte (porte les cookies)
const resp = await p.request.get(found);
const buf = await resp.body();
fs.writeFileSync('C:/tmp/tritri_cubist.png', buf);
console.log('\nTÉLÉCHARGÉ c:/tmp/tritri_cubist.png', buf.length, 'octets');
await b.close();
