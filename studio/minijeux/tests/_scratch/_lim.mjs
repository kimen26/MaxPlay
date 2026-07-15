import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('grok.com'));
if(!g){console.log('pas de grok');process.exit(0);}
const tail=await g.evaluate(()=>document.body.innerText.slice(-400)).catch(()=> '');
const imgs=await g.locator('img[src*="/generated/"]').count();
console.log('images sur page:', imgs, '\n--- bas ---\n', tail);
await b.close();
