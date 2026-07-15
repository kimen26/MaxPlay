import { chromium } from 'playwright';
import fs from 'fs';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx=b.contexts()[0];
let p=ctx.pages().find(x=>x.url().includes('chatgpt.com')); if(!p)p=await ctx.newPage();
await p.goto('https://chatgpt.com/',{waitUntil:'domcontentloaded'});
await p.bringToFront();                       // onglet au premier plan
await p.locator('#prompt-textarea').waitFor({timeout:20000}); await p.waitForTimeout(1000);
const box=p.locator('#prompt-textarea'); await box.click();
await p.keyboard.type('Sticker mascotte : bébé Pachycéphalosaure mignon, style cubiste à facettes low-poly, gros contour noir, 3-4 couleurs franches beige-orangé, fond blanc uni plat, chibi de face, grosse tête en dôme osseux bombé, expression joyeuse. Logo vectoriel plat.',{delay:1});
await p.waitForTimeout(500);
const send=p.locator('[data-testid="send-button"],button[data-testid="composer-send-button"]').first();
if(await send.count()) await send.click({force:true}); else await p.keyboard.press('Enter');
console.log('envoyé pachy (onglet focus), attente max 220s…');
const s=Date.now(); let got=null;
while(Date.now()-s<220000){
  const src=await p.evaluate(()=>{ const bad=x=>!x||x.startsWith('data:')||x.includes('auth0')||x.includes('avatar');
    const t=document.querySelectorAll('[data-message-author-role="assistant"]'); const l=t[t.length-1]; if(!l)return null;
    const im=[...l.querySelectorAll('img')].map(i=>({s:i.src,w:i.naturalWidth})).filter(i=>!bad(i.s)&&i.w>=400)[0]; return im?im.s:null;
  }).catch(()=>null);
  if(src){got=src;break;} process.stdout.write('.'); await p.waitForTimeout(4000);
}
if(got){ const r=await p.request.get(got); fs.writeFileSync('C:/tmp/pachy_focus.png', await r.body()); console.log('\nCHATGPT OK en '+Math.round((Date.now()-s)/1000)+'s ! ('+fs.statSync('C:/tmp/pachy_focus.png').size+' o)'); }
else { const roles=await p.evaluate(()=>[...document.querySelectorAll('[data-message-author-role]')].map(e=>e.getAttribute('data-message-author-role'))).catch(()=>[]);
  console.log('\nTOUJOURS RIEN. roles='+JSON.stringify(roles)); }
await b.close();
