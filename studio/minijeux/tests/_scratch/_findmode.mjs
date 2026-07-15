import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('grok.com'))||b.contexts()[0].pages()[0];
await g.goto('https://grok.com/',{waitUntil:'domcontentloaded'}); await g.waitForTimeout(3000);
await g.bringToFront();
// screenshot bas de page (composer)
const h=await g.evaluate(()=>innerHeight), w=await g.evaluate(()=>innerWidth);
await g.screenshot({path:'C:/tmp/grok_bottom.png', clip:{x:0,y:Math.max(0,h-260),width:w,height:260}}).catch(async e=>{ await g.screenshot({path:'C:/tmp/grok_bottom.png'}); });
// dump texte de tous les éléments interactifs
const els=await g.evaluate(()=>[...document.querySelectorAll('button,[role="button"],[role="menuitem"],[role="option"]')]
  .map(x=>((x.textContent||'').trim().replace(/\s+/g,' ')||(x.getAttribute('aria-label')||'')).slice(0,28)).filter(Boolean));
console.log('ELEMS:', JSON.stringify([...new Set(els)]));
await b.close();
