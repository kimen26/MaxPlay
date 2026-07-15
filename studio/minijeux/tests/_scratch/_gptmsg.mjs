import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('chatgpt.com'));
const txt=await g.evaluate(()=>{ const t=document.querySelectorAll('[data-message-author-role="assistant"]'); const last=t[t.length-1]; return last?last.innerText.slice(0,700):'(rien)'; }).catch(()=> 'err');
console.log('--- dernier message assistant ---\n', txt);
await b.close();
