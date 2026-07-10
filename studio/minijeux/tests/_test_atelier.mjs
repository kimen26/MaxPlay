import { chromium } from 'playwright';
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:900,height:820},deviceScaleFactor:2});
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
await p.goto('http://localhost:8137/atelier-couleurs.html',{waitUntil:'networkidle'});
await p.waitForTimeout(1200);
console.log('créature affichée:', await p.locator('#cname').textContent());
console.log('swatches détectés:', await p.locator('.sw').count());
console.log('cellules galerie:', await p.locator('#grid .cell').count());
await p.screenshot({path:'C:/tmp/atelier_1.png'});
// cliquer un preset (bleu) pour tester le recolor
await p.locator('#presets .preset').first().click(); await p.waitForTimeout(400);
await p.screenshot({path:'C:/tmp/atelier_2_bleu.png'});
// changer de créature (smilodon) + humeur farceur
const cells=await p.locator('#grid .cell').all();
for(const c of cells){ if((await c.getAttribute('data-id'))==='smilodon'){ await c.click(); break; } }
await p.waitForTimeout(500);
await p.locator('#moods button[data-m="original"]').click(); await p.waitForTimeout(600);
await p.locator('#presets .preset').nth(3).click(); await p.waitForTimeout(400); // violet
await p.screenshot({path:'C:/tmp/atelier_3_smilo.png'});
console.log('erreurs JS:', errs.length?JSON.stringify(errs.slice(0,4)):'aucune');
await b.close();
