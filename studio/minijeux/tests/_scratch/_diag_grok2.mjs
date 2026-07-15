import { chromium } from 'playwright';
try{
  const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
  const ctx=b.contexts()[0];
  const pages=ctx.pages();
  console.log('onglets:', pages.map(p=>p.url().slice(0,45)));
  let g=pages.find(p=>p.url().includes('grok.com'));
  if(!g){ console.log('AUCUN onglet grok'); process.exit(0);}
  await g.bringToFront();
  const signin=await g.getByRole('button',{name:/sign in|se connecter|log in/i}).count();
  const box=await g.locator('textarea, div[contenteditable="true"]').count();
  const bodyTail=await g.evaluate(()=>document.body.innerText.slice(-600)).catch(()=> '');
  console.log('bouton connexion présent:', signin, '| zone saisie:', box);
  console.log('--- bas de page Grok ---\n', bodyTail);
  await b.close();
}catch(e){ console.log('ERREUR CDP:', e.message); }
