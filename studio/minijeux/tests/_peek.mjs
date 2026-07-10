import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('grok.com'));
if(!g){console.log('pas de grok');process.exit(0);}
const imgs=await g.locator('img[src*="/generated/"]').evaluateAll(e=>e.map(x=>({w:x.naturalWidth,src:x.src.slice(-22)})));
const tail=await g.evaluate(()=>document.body.innerText.slice(-350)).catch(()=> '');
console.log('images générées:', JSON.stringify(imgs));
console.log('--- bas de page ---\n', tail);
await b.close();
