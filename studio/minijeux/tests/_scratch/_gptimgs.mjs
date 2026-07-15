import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx=b.contexts()[0];
console.log('onglets:', ctx.pages().map(p=>p.url().slice(0,45)));
const g=ctx.pages().find(p=>p.url().includes('chatgpt.com'));
if(!g){console.log('pas de tab chatgpt');process.exit(0);}
const imgs=await g.evaluate(()=>{ const bad=s=>!s||s.startsWith('data:')||s.includes('auth0')||s.includes('avatar');
  return [...document.querySelectorAll('img')].map(i=>({src:i.src,w:i.naturalWidth,h:i.naturalHeight})).filter(i=>!bad(i.src)&&i.w>=400); });
console.log('images ChatGPT >=400px:', JSON.stringify(imgs.map(i=>({w:i.w,h:i.h,s:i.src.slice(0,50)})),null,1));
await b.close();
