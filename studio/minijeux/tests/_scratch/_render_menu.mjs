import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:900,height:900}, deviceScaleFactor:2});
const errs=[];
p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); });
p.on('pageerror', e=>errs.push('PAGEERR '+e.message));
await p.goto('file:///C:/ProjetsPerso/Claude_Projects/MaxPlay/site/index3.html',{waitUntil:'networkidle'});
await p.waitForTimeout(1500);
// scroller pour montrer la planete dino (data-zone=dinos)
await p.evaluate(()=>{ const el=document.querySelector('.planet[data-zone="dinos"]'); if(el) el.scrollIntoView({block:'center'}); });
await p.waitForTimeout(1200);
await p.screenshot({path:'C:/tmp/menu_dino.png'});
// et la planete monde
await p.evaluate(()=>{ const el=document.querySelector('.planet[data-zone="monde"]'); if(el) el.scrollIntoView({block:'center'}); });
await p.waitForTimeout(1000);
await p.screenshot({path:'C:/tmp/menu_monde.png'});
console.log('erreurs console:', errs.length? JSON.stringify(errs.slice(0,6)) : 'aucune');
await b.close();
