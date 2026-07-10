// Batch avatars via CHATGPT (quand Grok est vide). Trio en un seul chat (followups) = cohérence.
// Download via request.get sur estuary URL. Anti-spam + hash unique. Variant-aware via make_avatars_batch.py.
import { chromium } from 'playwright';
import fs from 'fs';
import crypto from 'crypto';
const hashFile=f=>{try{return crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex');}catch{return null;}};
const OUTDIR='C:/tmp/avatars_raw';
const PROG='C:/tmp/avatars_progress.json';
const GET_MS=300000;  // ChatGPT lent (Thought + Création image) -> patient

// Chaque humeur = prompt AUTONOME complet (jamais "le même que précédemment" -> ChatGPT refuse pour "similarité").
const MOOD={
  joyeux:'expression joyeuse (yeux arqués, sourire)',
  enerve:'expression grognon et boudeuse mais mignonne (sourcils un peu froncés, petite moue), pas méchant',
  original:'expression farceuse et espiègle : il tire la langue, un œil qui cligne',
};
const PROMPT=(d,mood)=>`Sticker mascotte : bébé ${d.name} mignon, style cubiste à facettes low-poly, gros contour noir, 3-4 couleurs franches (${d.palette}), fond blanc uni plat, chibi de face, ${d.sig}, ${MOOD[mood]}. Logo vectoriel plat.`;

const DINOS=[
 {id:'trex',name:'Tyrannosaure Rex',palette:'brun-sable, brun foncé, beige',sig:'GROSSE tête, petits bras, quelques dents'},
 {id:'stego',name:'Stégosaure',palette:'vert olive, vert foncé, crème',sig:'petite tête, grandes plaques triangulaires sur le dos, pointes sur la queue'},
 {id:'brachio',name:'Brachiosaure',palette:'violet lavande, violet foncé, crème',sig:'très long cou, petite tête, gros corps'},
 {id:'velo',name:'Vélociraptor',palette:'turquoise, turquoise foncé, crème',sig:'svelte, gueule fine, griffe en faucille relevée sur les pattes arrière'},
 {id:'spino',name:'Spinosaure',palette:'rouge-orangé, bordeaux, crème',sig:'grande voile dorsale en éventail, museau de crocodile'},
 {id:'anky',name:'Ankylosaure',palette:'gris-vert, gris foncé, beige',sig:'trapu, dos couvert de plaques, grosse massue au bout de la queue'},
 {id:'ptero',name:'Ptéranodon',palette:'bleu ciel, bleu foncé, crème',sig:'grande crête pointue à l’arrière de la tête, grandes ailes, bec'},
 {id:'diplo',name:'Diplodocus',palette:'vert mousse, vert foncé, crème',sig:'cou immense, queue en fouet, petite tête'},
 {id:'paras',name:'Parasaurolophus',palette:'jaune-orangé, orange foncé, crème',sig:'longue crête tubulaire courbée en arrière, bec de canard'},
 {id:'tritri',name:'Tricératops',palette:'vert vif, vert foncé, crème',sig:'3 cornes (2 grandes + 1 nasale), large collerette derrière la tête'},
 {id:'theri',name:'Therizinosaure',palette:'brun-plume, brun foncé, crème',sig:'gros ventre rond emplumé, petite tête, énormes griffes recourbées aux mains, herbivore paisible'},
 {id:'pachy',name:'Pachycéphalosaure',palette:'beige-orangé, brun, crème',sig:'grosse tête en dôme osseux bombé avec petites pointes autour, bipède trapu'},
 {id:'centro',name:'Centrosaure',palette:'vert-brun, vert foncé, crème',sig:'une grande corne sur le nez, collerette à crochets recourbés vers l’avant'},
 {id:'dilo',name:'Dilophosaure',palette:'vert-jaune, vert foncé, crème',sig:'deux crêtes semi-circulaires en éventail sur la tête, svelte'},
 {id:'mammouth',name:'Mammouth laineux',palette:'brun-roux, brun foncé, crème',sig:'grosse fourrure laineuse, longues défenses courbées, trompe, petites oreilles'},
 {id:'smilodon',name:'Tigre à dents de sabre',palette:'fauve-orangé, brun foncé, crème',sig:'deux longues canines en sabre qui dépassent, museau court félin'},
 {id:'galli',name:'Gallimimus',palette:'gris-bleu clair, gris-bleu foncé, crème',sig:'silhouette d’autruche : long cou, petite tête avec bec sans dents, grandes pattes fines de coureur, longue queue'},
 {id:'allo',name:'Allosaure',palette:'orange-brique, brun foncé, crème',sig:'deux petites crêtes-cornes au-dessus des yeux (sa signature), grosse tête de prédateur, bipède'},
 {id:'meteorite',name:'Météorite',palette:'gris pierre, gris foncé, orange (traînée)',sig:'gros rocher rond cratérisé avec un petit visage rigolo, courte traînée de feu derrière'},
 {id:'volcan',name:'Volcan',palette:'brun-gris, brun foncé, orange-rouge (lave)',sig:'petit volcan trapu avec un visage rigolo, un peu de lave et de fumée au sommet'},
];

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
    // détection PAGE ENTIÈRE (l'image ChatGPT n'est PAS dans [data-message-author-role=assistant]) : estuary/backend-api, full-res
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
// Followups DANS LE MÊME CHAT (ChatGPT garde le personnage = trio cohérent). Formulation naturelle "refais-la ..."
// -> pas de "reproduis EXACTEMENT" (qui déclenche le refus similarité), mais édition en contexte.
const FOLLOW={
  enerve:'Parfait ! Refais la même petite mascotte (même dessin, mêmes couleurs, même fond blanc uni) mais qui fait maintenant une tête grognon et boudeuse : sourcils un peu froncés, petite moue. Toujours mignonne, pas méchante.',
  original:'Génial ! Et maintenant refais la même petite mascotte mais qui fait le clown : elle tire la langue et un œil qui cligne, très espiègle et rigolote.',
};
async function trio(d){
  await gptNew(); await gptSend(PROMPT(d,'joyeux')); if(!await gptGet(`${OUTDIR}/${d.id}_joyeux.png`)) return false; console.log(' joyeux');
  await gptSend(FOLLOW.enerve);   if(!await gptGet(`${OUTDIR}/${d.id}_enerve.png`))   return 'partial'; console.log(' enerve');
  await gptSend(FOLLOW.original); if(!await gptGet(`${OUTDIR}/${d.id}_original.png`)) return 'partial'; console.log(' original'); return true;
}

for(const d of DINOS){
  if(prog[d.id]==='done'){ console.log('SKIP',d.id); continue; }
  console.log('\n=== '+d.id+' ('+d.name+') ===');
  const r=await trio(d);
  prog[d.id]=(r===true)?'done':(r==='partial'?'partial':'fail'); fs.writeFileSync(PROG,JSON.stringify(prog));
  console.log(r===true?('✓✓ '+d.id):('… '+d.id+' '+r));
}
console.log('\n=== FIN GPT ===', JSON.stringify(prog));
await b.close();
