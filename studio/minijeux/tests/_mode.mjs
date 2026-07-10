import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('grok.com'));
await g.goto('https://grok.com/',{waitUntil:'domcontentloaded'}); await g.waitForTimeout(2500);
// lister tous les boutons proches de la zone de saisie (mode toggles)
const btns=await g.evaluate(()=>{
  return [...document.querySelectorAll('button')].map(x=>({
    txt:(x.textContent||'').trim().slice(0,24),
    al:(x.getAttribute('aria-label')||'').slice(0,24),
    pressed:x.getAttribute('aria-pressed'),
  })).filter(x=> x.txt || x.al).filter(x=>/expert|auto|fast|rapide|grok|think|rais|mode|image|créer|create|dessin/i.test(x.txt+x.al));
});
console.log(JSON.stringify(btns,null,1));
await b.close();
