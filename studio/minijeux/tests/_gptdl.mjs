import { chromium } from 'playwright';
import fs from 'fs';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('chatgpt.com'));
const srcs=await g.evaluate(()=>{ const bad=s=>!s||s.startsWith('data:')||s.includes('auth0')||s.includes('avatar');
  return [...document.querySelectorAll('img')].map(i=>i.src).filter(s=>!bad(s)&&s.includes('estuary')); });
let i=0;
for(const s of [...new Set(srcs)]){ i++;
  try{ const r=await g.request.get(s); if(r.status()===200){ fs.writeFileSync(`C:/tmp/gpt_img_${i}.png`, await r.body()); console.log('img',i,'OK',fs.statSync(`C:/tmp/gpt_img_${i}.png`).size,'o'); } else console.log('img',i,'status',r.status()); }
  catch(e){ console.log('img',i,'err',e.message.slice(0,50)); }
}
await b.close();
