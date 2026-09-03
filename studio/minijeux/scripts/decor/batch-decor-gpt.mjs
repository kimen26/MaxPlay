// Batch DÉCOR via ChatGPT — items de décor réutilisables (land du bus + planètes fusée).
// Même style que les avatars (cubiste facettes low-poly) mais SANS visage = décor pur.
// Chats de 3 items (cohérence style, évite le timeout des chats trop longs).
// Détection page entière estuary + anti-spam + hash unique (leçons batch-avatars-gpt.mjs).
import { chromium } from 'playwright';
import fs from 'fs';
import crypto from 'crypto';
const hashFile=f=>{try{return crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex');}catch{return null;}};
const OUTDIR='C:/tmp/decor_raw';
const PROG='C:/tmp/decor_progress.json';
const GET_MS=300000;
fs.mkdirSync(OUTDIR,{recursive:true});

const STYLE='style cubiste à facettes low-poly, gros contour noir, 3-4 couleurs franches, fond blanc uni plat, sans visage, sans personnage, sans texte. Élément de décor vectoriel plat.';
const ITEMS=[
 {id:'volcan_fumant',desc:'petit volcan trapu brun-gris avec coulées de lave orange et panache de fumée grise au sommet'},
 {id:'meteorite_feu',desc:'météorite : rocher gris cratérisé avec traînée de feu orange derrière, en diagonale'},
 {id:'nuage_gris',desc:'gros nuage gris dodu, arrondi'},
 {id:'nuage_blanc',desc:'petit nuage blanc-crème dodu, arrondi'},
 {id:'palmier',desc:'palmier préhistorique : tronc brun incliné, grandes palmes vertes'},
 {id:'fougere',desc:'fougère géante préhistorique verte, frondes recourbées'},
 {id:'sapin',desc:'conifère préhistorique : sapin vert foncé triangulaire, tronc brun'},
 {id:'rocher',desc:'gros rocher gris anguleux avec un peu de mousse verte'},
 {id:'cactus',desc:'cactus vert à deux bras avec petites fleurs'},
 {id:'arret_bus',desc:'poteau d’arrêt de bus : mât gris, panneau rond jaune avec silhouette de bus'},
 {id:'buisson_fleurs',desc:'buisson vert rond avec petites fleurs colorées'},
 {id:'cratere',desc:'cratère lunaire vu de trois quarts, bord surélevé gris, intérieur plus sombre'},
 {id:'etoile_filante',desc:'étoile filante jaune dorée avec traînée en dégradé'},
 {id:'geyser',desc:'petit geyser : monticule de pierre beige avec jet d’eau bleu clair et vapeur'},
];
const PROMPT=d=>`Sticker élément de décor : ${d.desc}, ${STYLE}`;
const FOLLOW=d=>`Super ! Maintenant, dans exactement le même style (mêmes facettes, même contour noir, même fond blanc uni), dessine un autre élément de décor : ${d.desc}. Toujours sans visage, sans personnage, sans texte.`;

const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx=b.contexts()[0];
let p=ctx.pages().find(x=>x.url().includes('chatgpt.com')); if(!p)p=await ctx.newPage();
const allHashes=new Set();
try{for(const f of fs.readdirSync(OUTDIR))if(f.endsWith('.png')){const h=hashFile(OUTDIR+'/'+f);if(h)allHashes.add(h);}}catch(e){}
const downloaded=new Set();
let prog={}; try{prog=JSON.parse(fs.readFileSync(PROG,'utf8'));}catch(e){}

async function gptNew(){ await p.goto('https://chatgpt.com/',{waitUntil:'domcontentloaded'}); await p.bringToFront(); await p.locator('#prompt-textarea').waitFor({timeout:20000}); await p.waitForTimeout(800); }
async function gptSend(prompt){ const box=p.locator('#prompt-textarea'); await box.click(); await p.keyboard.type(prompt,{delay:1}); await p.waitForTimeout(500);
  const send=p.locator('[data-testid="send-button"],button[data-testid="composer-send-button"]').first();
  if(await send.count()) await send.click({force:true}).catch(()=>{}); else await p.keyboard.press('Enter'); }
async function gptGet(out){
  const start=Date.now(); let lastSrc=null;
  while(Date.now()-start<GET_MS){
    const src=await p.evaluate(()=>{ const imgs=[...document.querySelectorAll('img')].map(i=>({s:i.src,w:i.naturalWidth}))
      .filter(i=>i.s&&(i.s.includes('estuary')||i.s.includes('backend-api'))&&!i.s.startsWith('data:')&&i.w>=700);
      return imgs.length?imgs[imgs.length-1].s:null; }).catch(()=>null);
    if(src&&src===lastSrc&&!downloaded.has(src)){ downloaded.add(src);
      try{ const r=await p.request.get(src); if(r.status()===200){ fs.writeFileSync(out,await r.body()); const h=hashFile(out); if(!allHashes.has(h)){allHashes.add(h); return h;} } }catch(e){}
    }
    lastSrc=src; process.stdout.write('.'); await p.waitForTimeout(4000);
  }
  return null;
}

// groupes de 3 : 1er = prompt complet, 2-3 = followups même chat (style cohérent, chat court)
const todo=ITEMS.filter(d=>prog[d.id]!=='done');
for(let i=0;i<todo.length;i+=3){
  const group=todo.slice(i,i+3);
  await gptNew();
  for(let j=0;j<group.length;j++){
    const d=group[j];
    console.log('\n=== '+d.id+' ===');
    await gptSend(j===0?PROMPT(d):FOLLOW(d));
    const ok=await gptGet(`${OUTDIR}/${d.id}.png`);
    prog[d.id]=ok?'done':'fail'; fs.writeFileSync(PROG,JSON.stringify(prog));
    console.log(ok?(' ✓ '+d.id):(' ✗ '+d.id));
    if(!ok) break; // chat cassé/limite -> nouveau chat au groupe suivant
  }
}
console.log('\n=== FIN DECOR ===', JSON.stringify(prog));
await b.close();
