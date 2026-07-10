import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:412,height:900}, deviceScaleFactor:2}); // mobile
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///C:/ProjetsPerso/Claude_Projects/MaxPlay/site/index3.html',{waitUntil:'networkidle'});
await p.waitForTimeout(1200);
for(const [zone,file] of [['garage','C:/tmp/menu_garage.png'],['lettres','C:/tmp/menu_lettres.png']]){
  await p.evaluate(z=>{const el=document.querySelector(`.planet[data-zone="${z}"]`); if(el) el.scrollIntoView({block:'center'});}, zone);
  await p.waitForTimeout(900);
  await p.screenshot({path:file});
}
console.log('mobile erreurs:', errs.length?JSON.stringify(errs.slice(0,4)):'aucune');
await b.close();
