import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx=b.contexts()[0];
let p=ctx.pages().find(x=>x.url().includes('chatgpt.com'));
if(!p){console.log('pas de tab chatgpt');process.exit(2);}
await p.goto('https://chatgpt.com/',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(3000);
const info=await p.evaluate(()=>({
  fileInputs: document.querySelectorAll('input[type="file"]').length,
  composer: !!document.querySelector('#prompt-textarea, div[contenteditable="true"]'),
  sendBtn: !!document.querySelector('[data-testid="send-button"], button[aria-label*="Envoyer"], button[data-testid="composer-send-button"]'),
}));
console.log(JSON.stringify(info));
await b.close();
