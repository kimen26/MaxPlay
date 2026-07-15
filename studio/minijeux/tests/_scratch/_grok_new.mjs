import { chromium } from 'playwright';
const PROMPT=process.argv[2], OUT=process.argv[3];
const IMG='img[src*="/generated/"]';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
let p=b.contexts()[0].pages().find(x=>x.url().includes('grok.com'));
if(!p) p=await b.contexts()[0].newPage();
await p.goto('https://grok.com/',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(2500);
await p.bringToFront();
const before=await p.locator(IMG).evaluateAll(e=>e.map(x=>x.src));
const box=p.locator('textarea, div[contenteditable="true"]').first();
await box.click(); await box.fill(PROMPT); await p.waitForTimeout(300); await p.keyboard.press('Enter');
console.log('✓ envoyé Grok, attente image pleine réso…');
const start=Date.now(); let target=null;
while(Date.now()-start<180000){
  const cur=await p.locator(IMG).evaluateAll(e=>e.map(x=>({src:x.src,w:x.naturalWidth})));
  const fresh=cur.find(u=>!before.includes(u.src) && u.w>=700);
  if(fresh){target=fresh.src; await p.waitForTimeout(1500); break;}
  process.stdout.write('.'); await p.waitForTimeout(2500);
}
console.log('');
if(!target){console.log('✗ timeout');await b.close();process.exit(3);}
const last=p.locator(`img[src="${target}"]`).first();
await last.scrollIntoViewIfNeeded(); await last.hover(); await p.waitForTimeout(700);
const btn=p.getByRole('button',{name:/télécharger|download/i}).last();
const [dl]=await Promise.all([p.waitForEvent('download',{timeout:20000}), btn.click({force:true})]);
await dl.saveAs(OUT); console.log('✓ →',OUT);
await b.close();
