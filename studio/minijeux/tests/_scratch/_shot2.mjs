import { chromium } from 'playwright';
try{
  const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
  const ctx=b.contexts()[0];
  let g=ctx.pages().find(p=>p.url().includes('grok.com'));
  if(!g){ g=await ctx.newPage(); await g.goto('https://grok.com/',{waitUntil:'domcontentloaded'}); await g.waitForTimeout(3000); }
  await g.bringToFront(); await g.waitForTimeout(1000);
  await g.screenshot({path:'C:/tmp/grok_composer.png', fullPage:false});
  console.log('OK screenshot, url=', g.url());
  await b.close();
}catch(e){ console.log('ERR:', e.message); }
