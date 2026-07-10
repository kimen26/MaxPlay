import { chromium } from 'playwright';
const OUT = process.argv[2];
const IMG='img[src*="/generated/"]';
const b = await chromium.connectOverCDP('http://127.0.0.1:9222');
const p = b.contexts()[0].pages().find(pg => pg.url().includes('grok.com'));
await p.bringToFront();
// attendre que la derniere image generee soit pleine reso
const start=Date.now(); let dims=null;
while(Date.now()-start<60000){
  dims = await p.locator(IMG).last().evaluate(i=>({w:i.naturalWidth,h:i.naturalHeight,src:i.src.slice(-40)})).catch(()=>null);
  if(dims && dims.w>=700){break;}
  process.stdout.write('.'); await p.waitForTimeout(2500);
}
const n = await p.locator(IMG).count();
console.log('\nimages generees:',n,'derniere:',JSON.stringify(dims));
const last = p.locator(IMG).last();
await last.scrollIntoViewIfNeeded(); await last.hover(); await p.waitForTimeout(700);
const btn = p.getByRole('button',{name:/télécharger|download/i}).last();
const [dl]=await Promise.all([p.waitForEvent('download',{timeout:20000}), btn.click({force:true})]);
await dl.saveAs(OUT);
console.log('✓ →',OUT);
await b.close();
