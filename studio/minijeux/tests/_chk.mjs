import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const p=b.contexts()[0].pages().find(x=>x.url().includes('chatgpt.com'));
const imgs=await p.evaluate(()=>[...document.querySelectorAll('img')].map(i=>({w:i.naturalWidth,s:i.src.slice(0,45)})).filter(i=>i.w>=400&&(i.s.includes('estuary')||i.s.includes('backend-api'))));
const tail=await p.evaluate(()=>document.body.innerText.slice(-450)).catch(()=> '');
console.log('imgs estuary/backend >=400:', JSON.stringify(imgs));
console.log('--- bas page ---\n', tail);
await b.close();
