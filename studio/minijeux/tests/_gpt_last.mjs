import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const p=b.contexts()[0].pages().find(x=>x.url().includes('chatgpt.com'));
const s=await p.evaluate(()=>{
  const t=document.querySelectorAll('[data-message-author-role="assistant"]');
  const last=t[t.length-1];
  const streaming=!!document.querySelector('[data-testid="stop-button"]');
  return {roles:t.length, streaming, txt:last?last.innerText.slice(0,400):'(rien)', tail:document.body.innerText.slice(-250)};
});
console.log(JSON.stringify(s,null,1));
await b.close();
