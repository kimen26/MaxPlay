import { chromium } from 'playwright';
import fs from 'fs';
import crypto from 'crypto';
const hashFile = f => { try { return crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex'); } catch { return null; } };
const IMG='img[src*="/generated/"]';
const LIMIT_RE=/plus de crédit|réessayez plus tard|try again later|rate limit|usage limit|reached your limit|out of.*credit/i;
const OUTDIR='C:/tmp/avatars_raw';
const PROG='C:/tmp/avatars_progress.json';

const BASE = (name,palette,sig)=>`Sticker mascotte : bébé ${name} mignon en style CUBISTE façon Picasso — formes géométriques angulaires et facettes, aplats de couleur FRANCS, gros contour noir épais net. Palette de 3-4 couleurs pleines : ${palette}. Vu de face, centré, chibi trapu, ${sig}. Expression JOYEUSE (yeux arqués, sourire). Fond BLANC UNI parfaitement plat, aucun dégradé, aucune ombre portée, aucune texture, aucun décor. Rendu logo vectoriel plat.`;
const ENERVE = `Génère EXACTEMENT le même dinosaure que précédemment — même style cubiste facettes, mêmes couleurs, même contour, même fond blanc, même cadrage. SEULE différence : expression GROGNON / BOUDEUR mais TRÈS MIGNONNE et un peu drôle (sourcils légèrement froncés, petite moue, PAS méchant du tout, reste adorable).`;
const ORIGINAL = `Génère EXACTEMENT le même dinosaure que précédemment — même style, mêmes couleurs, même contour, même fond blanc, même cadrage. SEULE différence : expression RIGOLOTE et FARCEUSE — il tire la langue (petite langue rose), un œil qui cligne ou louche, air espiègle et joueur. Très mignon et drôle.`;

const DINOS=[
 {id:'trex',   name:'Tyrannosaure Rex', palette:'brun-sable chaud, brun foncé, beige (ventre et dents)', sig:'GROSSE tête, petits bras, quelques dents visibles mais mignon'},
 {id:'stego',  name:'Stégosaure',       palette:'vert olive, vert foncé, crème (plaques et pointes)',     sig:'petite tête, dos avec grandes plaques triangulaires et pointes sur la queue'},
 {id:'brachio',name:'Brachiosaure',     palette:'violet lavande, violet foncé, crème (ventre)',          sig:'TRÈS long cou vertical, toute petite tête en haut, gros corps rond'},
 {id:'velo',   name:'Vélociraptor',     palette:'turquoise, turquoise foncé, crème (ventre)',            sig:'svelte, gueule fine, quelques petites plumes stylisées, et surtout sa GRIFFE EN FAUCILLE rétractile bien visible relevée sur chaque patte ARRIÈRE (la griffe-signature du raptor, grande et recourbée)'},
 {id:'spino',  name:'Spinosaure',       palette:'rouge-orangé, bordeaux, crème (voile et ventre)',       sig:'grande VOILE dorsale en éventail, museau allongé de crocodile'},
 {id:'anky',   name:'Ankylosaure',      palette:'gris-vert, gris foncé, beige',                          sig:'trapu et bas, dos couvert de plaques et pointes, grosse MASSUE au bout de la queue'},
 {id:'ptero',  name:'Ptéranodon',       palette:'bleu ciel, bleu foncé, crème (bec et crête)',           sig:'grande CRÊTE pointue à l’arrière du crâne, grandes ailes repliées, bec sans dents'},
 {id:'diplo',  name:'Diplodocus',       palette:'vert mousse, vert foncé, crème (ventre)',               sig:'cou immense et queue en fouet très longue, toute petite tête'},
 {id:'paras',  name:'Parasaurolophus',  palette:'jaune-orangé, orange foncé, crème (ventre)',            sig:'longue CRÊTE tubulaire courbée vers l’arrière de la tête, bec de canard'},
];

const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx=b.contexts()[0];
let page=ctx.pages().find(p=>p.url().includes('grok.com'));
if(!page) page=await ctx.newPage();

const allHashes=new Set();  // tous les avatars déjà pris (unicité globale)
// seed avec les raws déjà produits (évite qu'un dino attrape l'image d'un précédent au redémarrage)
try{ for(const f of fs.readdirSync(OUTDIR)){ if(f.endsWith('.png')){ const h=hashFile(OUTDIR+'/'+f); if(h) allHashes.add(h);} } }catch(e){}
let prog={}; try{prog=JSON.parse(fs.readFileSync(PROG,'utf8'));}catch(e){}

async function send(prompt){
  const box=page.locator('textarea, div[contenteditable="true"]').first();
  await box.click(); await box.fill(prompt); await page.waitForTimeout(300); await page.keyboard.press('Enter');
}
async function dlLast(out){
  const last=page.locator(IMG).last();
  await last.scrollIntoViewIfNeeded().catch(()=>{}); await last.hover().catch(()=>{}); await page.waitForTimeout(600);
  const btn=page.getByRole('button',{name:/télécharger|download/i}).last();
  const [dl]=await Promise.all([page.waitForEvent('download',{timeout:20000}), btn.click({force:true})]);
  await dl.saveAs(out);
}
const downloaded=new Set(); // srcs déjà téléchargés ce run -> JAMAIS re-télécharger (anti-spam)
async function newestSrc(){
  return await page.locator(IMG).last().evaluate(i=> (i && i.naturalWidth>=700) ? i.src : null).catch(()=>null);
}
// N'accepte QUE : un src full-res, STABLE (2 sondages), JAMAIS téléchargé, dont le hash est neuf.
// -> 1 SEUL download par image (fini le spam), filtre partiels (-part-0 qui mute) ET doublons.
async function getNew(out){
  const start=Date.now(); let lastSrc=null;
  while(Date.now()-start<330000){  // Grok parfois lent (mode Expert >200s) -> laisser le temps
    const t=await page.evaluate(()=>document.body.innerText).catch(()=> '');
    if(LIMIT_RE.test(t)) return {limit:true};
    const src=await newestSrc();
    if(src && src===lastSrc && !downloaded.has(src)){    // stable + jamais téléchargé
      downloaded.add(src);
      try{
        await dlLast(out); const h=hashFile(out);
        if(!allHashes.has(h)){ allHashes.add(h); return {hash:h}; }
        // sinon = image d'un mood précédent encore affichée -> on attend la vraie nouvelle
      }catch(e){}
    }
    lastSrc=src;
    process.stdout.write('.'); await page.waitForTimeout(3500);
  }
  return {timeout:true};
}

for(const d of DINOS){
  if(prog[d.id]==='done'){ console.log('SKIP',d.id); continue; }
  console.log('\n=== '+d.id+' ('+d.name+') ===');
  await page.goto('https://grok.com/',{waitUntil:'domcontentloaded'}); await page.waitForTimeout(2500);
  let r;
  await send(BASE(d.name,d.palette,d.sig));
  r=await getNew(OUTDIR+'/'+d.id+'_joyeux.png'); if(r.limit){console.log('\n⛔ LIMITE '+d.id+'/joyeux');break;} if(r.timeout){console.log('\n✗ timeout joyeux');prog[d.id]='timeout';fs.writeFileSync(PROG,JSON.stringify(prog));continue;} console.log('✓ joyeux',r.hash.slice(0,8));
  await send(ENERVE);
  r=await getNew(OUTDIR+'/'+d.id+'_enerve.png'); if(r.limit){console.log('\n⛔ LIMITE '+d.id+'/enerve');break;} if(r.timeout){console.log('✗ timeout enerve');prog[d.id]='partial';fs.writeFileSync(PROG,JSON.stringify(prog));continue;} console.log('✓ enerve',r.hash.slice(0,8));
  await send(ORIGINAL);
  r=await getNew(OUTDIR+'/'+d.id+'_original.png'); if(r.limit){console.log('\n⛔ LIMITE '+d.id+'/original');break;} if(r.timeout){console.log('✗ timeout original');prog[d.id]='partial';fs.writeFileSync(PROG,JSON.stringify(prog));continue;} console.log('✓ original',r.hash.slice(0,8));
  prog[d.id]='done'; fs.writeFileSync(PROG,JSON.stringify(prog));
  console.log('✓✓ '+d.id+' COMPLET');
}
console.log('\n=== FIN BATCH ===', JSON.stringify(prog));
await b.close();
