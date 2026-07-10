import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const g=b.contexts()[0].pages().find(p=>p.url().includes('grok.com'));
const els=await g.evaluate(()=>{
  const seen=[];
  document.querySelectorAll('button,[role="button"],[role="radio"],[role="tab"],a').forEach(x=>{
    const t=(x.textContent||'').trim().replace(/\s+/g,' ').slice(0,30);
    const al=(x.getAttribute('aria-label')||'').slice(0,30);
    if(t||al) seen.push((t||'∅')+(al?' ['+al+']':'')+(x.getAttribute('aria-pressed')?' p='+x.getAttribute('aria-pressed'):''));
  });
  return seen;
});
console.log(els.join('\n'));
await b.close();
