// Régénère un trio v2 par chat COURT (joyeux → grognon → farceur), specs affinées.
import { chromium } from 'playwright';
import fs from 'fs'; import crypto from 'crypto';
const hashFile=f=>{try{return crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex');}catch{return null;}};
const OUT='C:/tmp/avatars_raw'; const GET_MS=300000;
const PROMPT=(name,pal,sig)=>`Sticker mascotte : bébé ${name} mignon, style cubiste à facettes low-poly, gros contour noir, 3-4 couleurs franches (${pal}), fond blanc uni plat, chibi de face, ${sig}, expression joyeuse (yeux arqués, sourire). Logo vectoriel plat.`;
const GROGNON=`Parfait ! Refais la même petite mascotte (même dessin, mêmes couleurs, même fond blanc uni) mais qui fait maintenant une tête grognon et boudeuse : sourcils un peu froncés, petite moue. Toujours mignonne, pas méchante.`;
const FARCEUR=`Génial ! Et maintenant refais la même petite mascotte mais qui fait le clown : elle tire la langue et un œil qui cligne, très espiègle et rigolote.`;
const DINOS=[
 // Paras RONDELET (choix Papa Yann) : corps dodu bien rond + crête tubulaire courbée arrière + bec canard
 {id:'paras',name:'Parasaurolophus',pal:'jaune-orangé, orange foncé, crème (ventre)',sig:'corps trapu et bien DODU tout rond (gros bidon rebondi mignon), longue crête tubulaire creuse courbée vers l’arrière (sa signature), museau plat de canard, bipède potelé'},
 // Galli nouvelles variantes : silhouette autruche, long cou, bec, pattes fines coureur, longue queue
 {id:'galli',name:'Gallimimus',pal:'gris-bleu clair, gris-bleu foncé, crème',sig:'silhouette d’autruche : long cou fin, petite tête avec bec sans dents, grandes pattes fines de coureur rapide, longue queue horizontale, bras courts à plumes'},
];
const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx=b.contexts()[0]; let p=ctx.pages().find(x=>x.url().includes('chatgpt.com'))||await ctx.newPage();
const allH=new Set();
for(const dir of [OUT, OUT+'/_done']){ try{for(const f of fs.readdirSync(dir))if(f.endsWith('.png')){const h=hashFile(dir+'/'+f);if(h)allH.add(h);}}catch(e){} }
const dl=new Set();
async function gnew(){await p.goto('https://chatgpt.com/',{waitUntil:'domcontentloaded'});await p.bringToFront();await p.locator('#prompt-textarea').waitFor({timeout:20000});await p.waitForTimeout(800);}
async function gsend(t){const bx=p.locator('#prompt-textarea');await bx.click();await p.keyboard.type(t,{delay:1});await p.waitForTimeout(500);const s=p.locator('[data-testid="send-button"],button[data-testid="composer-send-button"]').first();if(await s.count())await s.click({force:true}).catch(()=>{});else await p.keyboard.press('Enter');}
async function gget(out){const st=Date.now();let last=null;while(Date.now()-st<GET_MS){const src=await p.evaluate(()=>{const im=[...document.querySelectorAll('img')].map(i=>({s:i.src,w:i.naturalWidth})).filter(i=>i.s&&(i.s.includes('estuary')||i.s.includes('backend-api'))&&!i.s.startsWith('data:')&&i.w>=700);return im.length?im[im.length-1].s:null;}).catch(()=>null);if(src&&src===last&&!dl.has(src)){dl.add(src);try{const r=await p.request.get(src);if(r.status()===200){fs.writeFileSync(out,await r.body());const h=hashFile(out);if(!allH.has(h)){allH.add(h);return true;}}}catch(e){}}last=src;process.stdout.write('.');await p.waitForTimeout(4000);}return false;}
for(const d of DINOS){
  console.log('\n=== '+d.id+' ('+d.name+') ===');
  await gnew(); await gsend(PROMPT(d.name,d.pal,d.sig));
  if(!await gget(`${OUT}/${d.id}_joyeux.png`)){console.log(' ✗ joyeux');continue;} console.log(' joyeux');
  await gsend(GROGNON);
  if(!await gget(`${OUT}/${d.id}_enerve.png`)){console.log(' ✗ grognon');continue;} console.log(' ✓ GROGNON');
  await gsend(FARCEUR);
  if(!await gget(`${OUT}/${d.id}_original.png`)){console.log(' ✗ farceur');continue;} console.log(' ✓ FARCEUR');
}
console.log('\nFIN'); await b.close();
