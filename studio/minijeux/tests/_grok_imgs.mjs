import { chromium } from 'playwright';
const b = await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx = b.contexts()[0];
const p = ctx.pages().find(pg => pg.url().includes('grok.com'));
if(!p){console.log('pas de tab grok');process.exit(2);}
const imgs = await p.evaluate(() => [...document.querySelectorAll('img')]
  .map(i=>({src:i.src, srcset:(i.srcset||'').slice(0,200), w:i.naturalWidth, h:i.naturalHeight}))
  .filter(i=>i.w>=200));
console.log('URL courante:', p.url());
console.log(JSON.stringify(imgs,null,1));
// boutons de telechargement eventuels
const dl = await p.evaluate(()=>[...document.querySelectorAll('button,a')]
  .map(e=>e.getAttribute('aria-label')||e.textContent||'').filter(t=>/download|télécharg|save/i.test(t)).slice(0,5));
console.log('affordances DL:', JSON.stringify(dl));
await b.close();
