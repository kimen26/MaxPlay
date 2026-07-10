import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('grok.com'));
await g.bringToFront();
const exp=g.getByRole('button',{name:/^Expert$/i}).first();
console.log('bouton Expert trouvé:', await exp.count());
await exp.click({force:true}).catch(e=>console.log('clic err',e.message));
await g.waitForTimeout(1200);
// dump du menu ouvert
const opts=await g.evaluate(()=>[...document.querySelectorAll('[role="menuitem"],[role="option"],[role="menuitemradio"],li,button')]
  .map(x=>((x.textContent||'').trim().replace(/\s+/g,' ')).slice(0,40)).filter(t=>/expert|auto|rapide|fast|instant|standard|normal|pensée|thinking|réfléch|défaut|image|grok\s*\d/i.test(t)));
console.log('OPTIONS:', JSON.stringify([...new Set(opts)]));
await g.screenshot({path:'C:/tmp/grok_menu.png'});
await b.close();
