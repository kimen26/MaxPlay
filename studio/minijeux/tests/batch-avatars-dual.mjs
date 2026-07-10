// Batch avatars DUAL-moteur : Grok (fast-fail) -> fallback ChatGPT. Trio par le même moteur (cohérence).
// Anti-spam : 1 download/image, hash unique global. Variant-aware via make_avatars_batch.py après.
import { chromium } from 'playwright';
import fs from 'fs';
import crypto from 'crypto';
const hashFile = f => { try { return crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex'); } catch { return null; } };
const GIMG='img[src*="/generated/"]';
const LIMIT_RE=/plus de crédit|réessayez plus tard|try again later|rate limit|usage limit|reached your limit/i;
const OUTDIR='C:/tmp/avatars_raw';
const PROG='C:/tmp/avatars_progress.json';
const GROK_MS=140000, GPT_MS=190000;  // prompts COURTS = Grok génère ~40s (pas de mode réflexion lent)

// PROMPTS COURTS impératif : les prompts longs/verbeux font basculer Grok en mode réflexion lent (>200s).
const BASE=(name,palette,sig)=>`Sticker mascotte : bébé ${name} mignon, style cubiste à facettes, gros contour noir, 3-4 couleurs franches (${palette}), fond blanc uni plat, chibi de face, ${sig}, expression joyeuse. Logo vectoriel plat.`;
const ENERVE=`Le même dinosaure, même style et couleurs, fond blanc uni — mais expression grognon/boudeur mignonne (sourcils un peu froncés, moue), pas méchant.`;
const ORIGINAL=`Le même dinosaure, même style et couleurs, fond blanc uni — mais expression farceuse : il tire la langue, un œil qui cligne, espiègle.`;

const DINOS=[
 {id:'trex',name:'Tyrannosaure Rex',palette:'brun-sable chaud, brun foncé, beige (ventre et dents)',sig:'GROSSE tête, petits bras, quelques dents visibles mais mignon'},
 {id:'stego',name:'Stégosaure',palette:'vert olive, vert foncé, crème (plaques et pointes)',sig:'petite tête, dos avec grandes plaques triangulaires et pointes sur la queue'},
 {id:'brachio',name:'Brachiosaure',palette:'violet lavande, violet foncé, crème (ventre)',sig:'TRÈS long cou vertical, toute petite tête, gros corps rond'},
 {id:'velo',name:'Vélociraptor',palette:'turquoise, turquoise foncé, crème',sig:'svelte, gueule fine, griffe en faucille relevée bien visible sur les pattes arrière'},
 {id:'spino',name:'Spinosaure',palette:'rouge-orangé, bordeaux, crème (voile et ventre)',sig:'grande VOILE dorsale en éventail, museau allongé de crocodile'},
 {id:'anky',name:'Ankylosaure',palette:'gris-vert, gris foncé, beige',sig:'trapu et bas, dos couvert de plaques, grosse MASSUE au bout de la queue'},
 {id:'ptero',name:'Ptéranodon',palette:'bleu ciel, bleu foncé, crème (bec et crête)',sig:'grande CRÊTE pointue à l’arrière du crâne, grandes ailes repliées, bec sans dents'},
 {id:'diplo',name:'Diplodocus',palette:'vert mousse, vert foncé, crème (ventre)',sig:'cou immense et queue en fouet très longue, toute petite tête'},
 {id:'paras',name:'Parasaurolophus',palette:'jaune-orangé, orange foncé, crème (ventre)',sig:'longue CRÊTE tubulaire courbée vers l’arrière, bec de canard'},
 {id:'tritri',name:'Tricératops',palette:'vert vif, vert foncé, crème (3 cornes et collerette)',sig:'3 cornes (2 grandes frontales + 1 nasale), large collerette osseuse derrière la tête'},
 // ── 5 nouveaux (2026-07-09, à générer quand Grok revient) ──
 {id:'theri',name:'Therizinosaure',palette:'brun-plume, brun foncé, crème',sig:'gros ventre rond emplumé, petite tête, énormes griffes recourbées aux mains (sa signature), herbivore paisible'},
 {id:'pachy',name:'Pachycéphalosaure',palette:'beige-orangé, brun, crème',sig:'grosse tête en dôme osseux bombé avec petites pointes autour, bipède trapu'},
 {id:'centro',name:'Centrosaure',palette:'vert-brun, vert foncé, crème',sig:'une grande corne sur le nez, collerette à crochets recourbés vers l’avant'},
 {id:'dilo',name:'Dilophosaure',palette:'vert-jaune, vert foncé, crème',sig:'deux crêtes semi-circulaires en éventail sur la tête, svelte'},
 {id:'mammouth',name:'Mammouth laineux',palette:'brun-roux, brun foncé, crème',sig:'grosse fourrure laineuse, longues défenses courbées, trompe, petites oreilles'},
 {id:'smilodon',name:'Tigre à dents de sabre',palette:'fauve-orangé, brun foncé, crème',sig:'deux longues canines en sabre qui dépassent, museau court félin'},
 {id:'meteorite',name:'Météorite',palette:'gris pierre, gris foncé, orange (traînée)',sig:'gros rocher rond cratérisé avec un petit visage rigolo, courte traînée de feu derrière'},
 {id:'volcan',name:'Volcan',palette:'brun-gris, brun foncé, orange-rouge (lave)',sig:'petit volcan trapu avec un visage rigolo, un peu de lave et de fumée au sommet'},
 // ── 3 nouveaux (2026-07-10) ──
 {id:'galli',name:'Gallimimus',palette:'jaune sable, brun foncé, crème (ventre)',sig:'svelte comme une autruche, petite tête sans dents, longues pattes fines de coureur'},
 {id:'allo',name:'Allosaure',palette:'gris-bleu, gris foncé, crème (ventre)',sig:'grosse tête avec petites crêtes au-dessus des yeux, gueule pleine de dents, bras courts à 3 griffes'},
 {id:'cerato',name:'Cératosaure',palette:'rouge brique, brun foncé, crème (ventre)',sig:'une corne courte sur le nez, rangée de petites bosses osseuses sur le dos, queue haute et fine'},
];

const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx=b.contexts()[0];
const allHashes=new Set();
try{ for(const f of fs.readdirSync(OUTDIR)) if(f.endsWith('.png')){const h=hashFile(OUTDIR+'/'+f); if(h)allHashes.add(h);} }catch(e){}
const downloaded=new Set();
let prog={}; try{prog=JSON.parse(fs.readFileSync(PROG,'utf8'));}catch(e){}

// ───────── GROK ─────────
async function grokPage(){ let p=ctx.pages().find(x=>x.url().includes('grok.com')); if(!p)p=await ctx.newPage(); return p; }
async function grokNew(p){ await p.goto('https://grok.com/',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(2500); }
async function grokSend(p,prompt){ const box=p.locator('textarea, div[contenteditable="true"]').first(); await box.click(); await box.fill(prompt); await p.waitForTimeout(300); await p.keyboard.press('Enter'); }
async function grokGet(p,out){
  const start=Date.now(); let lastSrc=null;
  while(Date.now()-start<GROK_MS){
    const t=await p.evaluate(()=>document.body.innerText).catch(()=> ''); if(LIMIT_RE.test(t)) return null;
    const src=await p.locator(GIMG).last().evaluate(i=>(i&&i.naturalWidth>=700)?i.src:null).catch(()=>null);
    if(src&&src===lastSrc&&!downloaded.has(src)){ downloaded.add(src);
      // download via request.get (fiable) : sur image STABLE+full-res la qualité est complète (le bouton download ne déclenche plus d'event depuis restart Brave)
      try{ const r=await p.request.get(src); if(r.status()===200){ fs.writeFileSync(out, await r.body());
        const h=hashFile(out); if(!allHashes.has(h)){ allHashes.add(h); return h; } } }catch(e){}
    }
    lastSrc=src; process.stdout.write('g'); await p.waitForTimeout(3500);
  }
  return null;
}

// ───────── CHATGPT ─────────
async function gptPage(){ let p=ctx.pages().find(x=>x.url().includes('chatgpt.com')); if(!p)p=await ctx.newPage(); return p; }
async function gptNew(p){ await p.goto('https://chatgpt.com/',{waitUntil:'domcontentloaded'}); await p.locator('#prompt-textarea').waitFor({timeout:20000}); await p.waitForTimeout(800); }
async function gptSend(p,prompt){ const box=p.locator('#prompt-textarea'); await box.click(); await p.keyboard.type(prompt,{delay:1}); await p.waitForTimeout(500);
  const send=p.locator('[data-testid="send-button"],button[data-testid="composer-send-button"]').first();
  if(await send.count()) await send.click({force:true}).catch(()=>{}); else await p.keyboard.press('Enter'); }
async function gptGet(p,out){
  const start=Date.now(); let lastSrc=null;
  while(Date.now()-start<GPT_MS){
    const src=await p.evaluate(()=>{ const bad=s=>!s||s.startsWith('data:')||s.includes('auth0')||s.includes('avatar');
      const t=document.querySelectorAll('[data-message-author-role="assistant"]'); const last=t[t.length-1]; if(!last)return null;
      const im=[...last.querySelectorAll('img')].map(i=>({src:i.src,w:i.naturalWidth})).filter(i=>!bad(i.src)&&i.w>=400)[0]; return im?im.src:null;
    }).catch(()=>null);
    if(src&&src===lastSrc&&!downloaded.has(src)){ downloaded.add(src);
      try{ const r=await p.request.get(src); if(r.status()===200){ fs.writeFileSync(out,await r.body()); const h=hashFile(out); if(!allHashes.has(h)){allHashes.add(h); return h;} } }catch(e){}
    }
    lastSrc=src; process.stdout.write('c'); await p.waitForTimeout(4000);
  }
  return null;
}

// ───────── trio par moteur ─────────
async function trioGrok(d){ const gp=await grokPage();
  await grokNew(gp); await grokSend(gp,BASE(d.name,d.palette,d.sig)); if(!await grokGet(gp,`${OUTDIR}/${d.id}_joyeux.png`)) return false;
  await grokSend(gp,ENERVE); if(!await grokGet(gp,`${OUTDIR}/${d.id}_enerve.png`)) return 'partial';
  await grokSend(gp,ORIGINAL); if(!await grokGet(gp,`${OUTDIR}/${d.id}_original.png`)) return 'partial'; return true; }
async function trioGpt(d){ const gp=await gptPage();
  await gptNew(gp); await gptSend(gp,BASE(d.name,d.palette,d.sig)); if(!await gptGet(gp,`${OUTDIR}/${d.id}_joyeux.png`)) return false;
  await gptNew(gp); await gptSend(gp,BASE(d.name,d.palette,d.sig)+' '+ENERVE); if(!await gptGet(gp,`${OUTDIR}/${d.id}_enerve.png`)) return 'partial';
  await gptNew(gp); await gptSend(gp,BASE(d.name,d.palette,d.sig)+' '+ORIGINAL); if(!await gptGet(gp,`${OUTDIR}/${d.id}_original.png`)) return 'partial'; return true; }

for(const d of DINOS){
  if(prog[d.id]==='done'){ console.log('SKIP',d.id); continue; }
  console.log('\n=== '+d.id+' ('+d.name+') ===');
  let r=await trioGrok(d);
  if(r===true){ console.log('✓✓ '+d.id+' via GROK'); prog[d.id]='done'; }
  else{ console.log('… Grok KO ('+r+') -> ChatGPT'); r=await trioGpt(d);
    if(r===true){ console.log('✓✓ '+d.id+' via CHATGPT'); prog[d.id]='done'; }
    else{ console.log('✗ '+d.id+' échoué sur les 2 moteurs ('+r+')'); prog[d.id]='fail'; } }
  fs.writeFileSync(PROG,JSON.stringify(prog));
}
console.log('\n=== FIN DUAL ===', JSON.stringify(prog));
await b.close();
