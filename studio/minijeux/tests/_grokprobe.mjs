import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('grok.com'))||await b.contexts()[0].newPage();
await g.goto('https://grok.com/',{waitUntil:'domcontentloaded'}); await g.waitForTimeout(2500); await g.bringToFront();
const box=g.locator('textarea, div[contenteditable="true"]').first();
await box.click(); await box.fill('Sticker mascotte : bébé pachycéphalosaure mignon, style cubiste facettes low-poly, gros contour noir, 3-4 couleurs franches beige-orangé, fond blanc uni plat, chibi de face, grosse tête en dôme osseux bombé avec petites pointes, joyeux. Logo vectoriel plat.'); await g.waitForTimeout(300); await g.keyboard.press('Enter');
console.log('envoyé pachy, attente max 100s…');
const s=Date.now(); let got=null;
while(Date.now()-s<100000){ const im=await g.locator('img[src*="/generated/"]').last().evaluate(i=>(i&&i.naturalWidth>=700)?i.src:null).catch(()=>null); if(im){got=im;break;} process.stdout.write('.'); await g.waitForTimeout(4000); }
if(got){ const {writeFileSync}=await import('fs'); const r=await g.request.get(got); writeFileSync('C:/tmp/pachy_test.png', await r.body()); console.log('\nGROK OK en '+Math.round((Date.now()-s)/1000)+'s'); }
else console.log('\nGROK vide/lent (pas d image en 100s)');
await b.close();
