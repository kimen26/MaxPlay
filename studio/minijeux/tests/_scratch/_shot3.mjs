import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx=b.contexts()[0];
const g=ctx.pages().find(p=>p.url().includes('grok.com')) || ctx.pages()[0];
await g.screenshot({path:'C:/tmp/grok_composer.png'});
console.log('OK', g.url().slice(0,40));
b.close();
