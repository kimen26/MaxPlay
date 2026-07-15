import { chromium } from 'playwright';
import fs from 'fs';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('grok.com'));
await g.bringToFront();
const imgs=await g.locator('img[src*="/generated/"]').evaluateAll(e=>e.map(x=>({w:x.naturalWidth,src:x.src.slice(-24)})));
console.log('images sur la page:', JSON.stringify(imgs));
if(!imgs.length){ console.log('AUCUNE image générée sur cette page -> génération a échoué, pas le download'); await b.close(); process.exit(0); }
// tenter le download
const last=g.locator('img[src*="/generated/"]').last();
await last.scrollIntoViewIfNeeded().catch(e=>console.log('scroll err',e.message));
await last.hover().catch(e=>console.log('hover err',e.message));
await g.waitForTimeout(800);
const btnCount=await g.getByRole('button',{name:/télécharger|download/i}).count();
console.log('boutons télécharger visibles:', btnCount);
if(btnCount){
  try{
    const btn=g.getByRole('button',{name:/télécharger|download/i}).last();
    const [dl]=await Promise.all([g.waitForEvent('download',{timeout:15000}), btn.click({force:true})]);
    await dl.saveAs('C:/tmp/_dltest.png');
    console.log('DOWNLOAD OK:', fs.statSync('C:/tmp/_dltest.png').size,'o');
  }catch(e){ console.log('DOWNLOAD ERR:', e.message.slice(0,80)); }
}
await b.close();
