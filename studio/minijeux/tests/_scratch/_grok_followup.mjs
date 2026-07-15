// Envoie un prompt de SUITE dans le chat Grok courant + télécharge la NOUVELLE image via le bouton Télécharger.
import { chromium } from 'playwright';
const PROMPT = process.argv[2], OUT = process.argv[3];
const IMG='img[src*="/generated/"]';
const b = await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx = b.contexts()[0];
const p = ctx.pages().find(pg => pg.url().includes('grok.com'));
if(!p){console.log('pas de tab grok');process.exit(2);}
await p.bringToFront();
const n0 = await p.locator(IMG).count();
const box = p.locator('textarea, div[contenteditable="true"]').first();
await box.click(); await box.fill(PROMPT); await p.waitForTimeout(300);
await p.keyboard.press('Enter');
console.log('✓ suite envoyée, attente nouvelle image (n0='+n0+')…');
const start=Date.now(); let ok=false;
while(Date.now()-start<180000){
  const n = await p.locator(IMG).count();
  if(n>n0){ await p.waitForTimeout(3500); ok=true; break; }
  process.stdout.write('.'); await p.waitForTimeout(2500);
}
console.log('');
if(!ok){console.log('✗ timeout nouvelle image');await b.close();process.exit(3);}
// télécharger la DERNIÈRE image générée via son bouton Télécharger
const last = p.locator(IMG).last();
await last.scrollIntoViewIfNeeded(); await last.hover(); await p.waitForTimeout(600);
const btn = p.getByRole('button',{name:/télécharger|download/i}).last();
const [dl]=await Promise.all([p.waitForEvent('download',{timeout:20000}), btn.click({force:true})]);
await dl.saveAs(OUT);
console.log('✓ →',OUT);
await b.close();
