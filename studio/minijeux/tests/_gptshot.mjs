import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const p=b.contexts()[0].pages().find(x=>x.url().includes('chatgpt.com'));
await p.bringToFront(); await p.waitForTimeout(500);
try{ await p.screenshot({path:'C:/tmp/gpt_state2.png', fullPage:false}); console.log('shot OK'); }
catch(e){ console.log('shot err', e.message.slice(0,60)); }
// aussi : dump texte visible bas de page + éventuel bouton régénérer/erreur
const t=await p.evaluate(()=>document.body.innerText.slice(-500)).catch(()=> '');
console.log('--- bas page ---\n', t);
await b.close();
