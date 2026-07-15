import { chromium } from 'playwright';
const b = await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx = b.contexts()[0];
const p = ctx.pages().find(pg => pg.url().includes('chatgpt.com'));
const all = await p.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')].map(i=>({src:(i.src||'').slice(0,70),w:i.naturalWidth,h:i.naturalHeight}));
  const roles = [...document.querySelectorAll('[data-message-author-role]')].map(e=>e.getAttribute('data-message-author-role'));
  const body = document.body.innerText;
  return { nImg:imgs.length, imgs:imgs.filter(i=>i.w>80), roles, tail: body.slice(-1200) };
});
console.log('roles messages:', JSON.stringify(all.roles));
console.log('images >80px:', JSON.stringify(all.imgs,null,1));
console.log('--- BAS DE PAGE (texte visible) ---\n', all.tail);
await p.screenshot({path:'C:/tmp/gpt_state.png', fullPage:false});
await b.close();
