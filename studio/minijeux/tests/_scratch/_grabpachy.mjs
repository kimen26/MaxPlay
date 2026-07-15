import { chromium } from 'playwright';
import fs from 'fs';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const p=b.contexts()[0].pages().find(x=>x.url().includes('chatgpt.com'));
const src=await p.evaluate(()=>{ const imgs=[...document.querySelectorAll('img')].map(i=>({s:i.src,w:i.naturalWidth}))
  .filter(i=>i.s&&(i.s.includes('estuary')||i.s.includes('backend-api'))&&!i.s.startsWith('data:')&&i.w>=700);
  return imgs.length?imgs[imgs.length-1].s:null; });
if(!src){console.log('pas trouvé');process.exit(1);}
const r=await p.request.get(src); fs.writeFileSync('C:/tmp/pachy_joyeux.png', await r.body());
console.log('pachy grabbé:', fs.statSync('C:/tmp/pachy_joyeux.png').size,'o');
await b.close();
