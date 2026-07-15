import { chromium } from 'playwright';
import fs from 'fs';
const REF=process.argv[2], PROMPT=process.argv[3], OUT=process.argv[4];
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx=b.contexts()[0];
let p=ctx.pages().find(x=>x.url().includes('chatgpt.com'));
if(!p) p=await ctx.newPage();
await p.goto('https://chatgpt.com/',{waitUntil:'domcontentloaded'});
await p.locator('#prompt-textarea').waitFor({timeout:20000});
await p.bringToFront();
await p.locator('input[type="file"]').first().setInputFiles(REF);
console.log('✓ réf uploadée, attente vignette…');
// attendre que la vignette d image apparaisse dans le composer
await p.waitForTimeout(7000);
const box=p.locator('#prompt-textarea');
await box.click();
await p.keyboard.type(PROMPT, {delay:1});
await p.waitForTimeout(500);
const send=p.locator('[data-testid="send-button"], button[data-testid="composer-send-button"]').first();
for(let i=0;i<20 && !(await send.isEnabled().catch(()=>false));i++){await p.waitForTimeout(500);}
if(await send.count()) await send.click({force:true}); else await p.keyboard.press('Enter');
console.log('✓ envoyé, attente image générée…');
const start=Date.now(); let src=null;
while(Date.now()-start<200000){
  src=await p.evaluate(()=>{
    const bad=s=>!s||s.startsWith('data:')||s.includes('auth0')||s.includes('avatar');
    const t=document.querySelectorAll('[data-message-author-role="assistant"]');
    const last=t[t.length-1]; if(!last) return null;
    const im=[...last.querySelectorAll('img')].map(i=>({src:i.src,w:i.naturalWidth})).filter(i=>!bad(i.src)&&i.w>=400)[0];
    return im?im.src:null;
  }).catch(()=>null);
  if(src) break;
  process.stdout.write('.'); await p.waitForTimeout(3000);
}
console.log('');
if(!src){console.log('✗ timeout gen ChatGPT');await b.close();process.exit(3);}
let ok=false;
try{const r=await p.request.get(src);if(r.status()===200){fs.writeFileSync(OUT,await r.body());ok=true;}}catch(e){}
console.log(ok?('✓ → '+OUT):'✗ dl échec ('+src.slice(0,50)+')');
await b.close();process.exit(ok?0:3);
