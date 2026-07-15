import { chromium } from 'playwright';
import fs from 'fs';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('grok.com'));
await g.goto('https://grok.com/',{waitUntil:'domcontentloaded'}); await g.waitForTimeout(2500); await g.bringToFront();
const box=g.locator('textarea, div[contenteditable="true"]').first();
await box.click(); await box.fill('Sticker mascotte : bébé T-Rex mignon style cubiste facettes, gros contour noir, 3-4 couleurs franches brun-beige, fond blanc uni plat, chibi de face joyeux. Logo vectoriel plat.'); await g.waitForTimeout(300); await g.keyboard.press('Enter');
console.log('envoyé, attente patiente (max 7min)…');
const start=Date.now(); let got=null;
while(Date.now()-start<420000){
  const im=await g.locator('img[src*="/generated/"]').last().evaluate(i=>(i&&i.naturalWidth>=700)?i.src:null).catch(()=>null);
  if(im){ got=im; break; }
  process.stdout.write(`[${Math.round((Date.now()-start)/1000)}s]`); await g.waitForTimeout(6000);
}
console.log('\n'+(got?('IMAGE OK à '+Math.round((Date.now()-start)/1000)+'s'):'AUCUNE IMAGE à 7min'));
await b.close();
