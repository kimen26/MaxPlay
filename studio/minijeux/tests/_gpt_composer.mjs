import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const p=b.contexts()[0].pages().find(x=>x.url().includes('chatgpt.com'));
const el=await p.evaluate(()=>{
  const out=[];
  for(const s of ['textarea','[contenteditable="true"]','[role="textbox"]','.ProseMirror','#prompt-textarea','[data-virtualkeyboard]']){
    const n=document.querySelectorAll(s).length; if(n) out.push(s+' ='+n);
  }
  // dump editable-looking elements
  const ce=[...document.querySelectorAll('[contenteditable], textarea, [role=textbox]')].map(e=>({
    tag:e.tagName, id:e.id, cls:(e.className||'').toString().slice(0,50), role:e.getAttribute('role'), ce:e.getAttribute('contenteditable')
  }));
  return {matched:out, editors:ce.slice(0,8), url:location.href};
});
console.log(JSON.stringify(el,null,1));
await b.close();
