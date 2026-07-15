import { chromium } from 'playwright';
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const p=b.contexts()[0].pages().find(x=>x.url().includes('grok.com'));
console.log('URL:', p.url());
const info=await p.evaluate(()=>{
  const imgs=[...document.querySelectorAll('img[src*="/generated/"]')];
  const dlBtns=[...document.querySelectorAll('button,a')].filter(e=>/télécharger|download/i.test(e.getAttribute('aria-label')||e.textContent||''));
  // pour chaque image, remonter et chercher un bouton télécharger dans le meme conteneur "message"
  const perImg = imgs.map((im,i)=>{
    let box=im.closest('[class*="message"], article, [data-testid]') || im.parentElement;
    const nDl = box ? box.querySelectorAll('button,a').length : 0;
    return { i, src:im.src.slice(-30), w:im.naturalWidth, boxTag: box?box.tagName+'.'+(box.className||'').toString().slice(0,30):'?' };
  });
  return { nImgs: imgs.length, nDlBtns: dlBtns.length, perImg };
});
console.log(JSON.stringify(info,null,1));
await b.close();
