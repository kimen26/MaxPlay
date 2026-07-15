import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('grok.com'));
await g.bringToFront(); await g.waitForTimeout(800);
await g.screenshot({path:'C:/tmp/grok_composer.png'});
console.log('viewport:', JSON.stringify(g.viewportSize()));
await b.close();
