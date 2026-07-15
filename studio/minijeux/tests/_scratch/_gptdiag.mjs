import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('chatgpt.com'));
await g.bringToFront();
const info=await g.evaluate(()=>{
  const roles=[...document.querySelectorAll('[data-message-author-role]')].map(e=>e.getAttribute('data-message-author-role'));
  const asst=document.querySelectorAll('[data-message-author-role="assistant"]');
  const last=asst[asst.length-1];
  const allImgs=[...document.querySelectorAll('img')].map(i=>({w:i.naturalWidth,s:i.src.slice(0,45)})).filter(i=>i.w>=200);
  const asstImgs=last?[...last.querySelectorAll('img')].map(i=>({w:i.naturalWidth,s:i.src.slice(0,45)})):[];
  return { url:location.href, roles, lastText:last?last.innerText.slice(0,500):'(pas de msg assistant)', allImgs, asstImgs };
});
console.log('url:', info.url.slice(0,50));
console.log('roles:', JSON.stringify(info.roles));
console.log('imgs page (>=200):', JSON.stringify(info.allImgs));
console.log('imgs dans dernier assistant:', JSON.stringify(info.asstImgs));
console.log('--- texte dernier assistant ---\n', info.lastText);
await b.close();
