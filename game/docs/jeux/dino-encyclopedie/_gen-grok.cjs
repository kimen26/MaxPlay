// Génère game/web/js/dinos-images-grok.js depuis game/web/img/dinos/grok/
// Naming attendu (2 formes acceptées) :
//   <id>_lot<N>_<n>_<vue>.jpg       (lots Grok originaux)
//   <id>_<vue>.jpg                  (nouvelle livraison simple)
// Vues : taille | environnement | sa_vie | qui_le_chasse | chasse (legacy = mappé sur 'sa_vie')
const fs=require('fs'),path=require('path');
const DIR='c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/img/dinos/grok';
const OUT='c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/js/dinos-images-grok.js';

// KO exclus (verdicts agents revue visuelle 2026-05-17 + revue herbivores 2026-05-20)
const KO = new Set([
 'spinosaurus_lot2_2_environnement',
 'giganotosaurus_lot1_3_chasse','giganotosaurus_lot2_3_chasse','giganotosaurus_lot4_1_taille','giganotosaurus_lot4_2_environnement',
 'carcharodontosaurus_lot2_3_chasse',
 'tarbosaurus_lot1_1_taille','tarbosaurus_lot1_2_environnement','tarbosaurus_lot1_3_chasse',
 'albertosaurus_lot1_2_environnement',
 'gorgosaurus_lot1_1_taille','gorgosaurus_lot1_2_environnement',
 'ceratosaurus_lot1_1_taille','ceratosaurus_lot1_2_environnement','ceratosaurus_lot1_3_chasse',
 'diplodocus_lot1_1_taille','diplodocus_lot2_1_taille',
 'amargasaurus_lot1_2_environnement','amargasaurus_lot1_3_chasse',
 'plateosaurus_lot1_1_taille',
 'euoplocephalus_lot1_1_taille','euoplocephalus_lot1_2_environnement','euoplocephalus_lot1_3_chasse',
 'stegosaurus_lot1_1_taille',
 'kentrosaurus_lot1_1_taille','kentrosaurus_lot1_2_environnement','kentrosaurus_lot1_3_chasse',
 'styracosaurus_lot1_2_environnement',
 'pachycephalosaurus_lot1_1_taille','pachycephalosaurus_lot1_2_environnement','pachycephalosaurus_lot1_3_chasse',
 // Revue 2026-05-20 (nouvelle règle herbivores sans prédateur)
 'ankylosaurus_lot1_3_chasse',           // T-Rex présent
 'triceratops_lot1_3_chasse',            // T-Rex présent (Tritri à regen)
 'styracosaurus_lot1_3_chasse',          // T-Rex présent
 'stegosaurus_lot1_3_chasse',            // théropode présent
 'camarasaurus_lot3_3_chasse',           // théropode en arrière-plan + tête diplodocoïde
 'brachiosaurus_lot1_3_chasse',          // pattes avant pas plus longues + bébés disproportionnés
]);
const SKIP_DINO = new Set([]);

// Labels FR par vue
const VUE = {
  taille:'Sa taille',
  environnement:'Son environnement',
  sa_vie:'Sa vie',
  qui_le_chasse:'Qui le chasse',
  chasse:'Sa vie', // legacy lot Grok mai 2026 (= broutage/action, pas prédateur)
};

const files = fs.readdirSync(DIR).filter(f=>/\.(jpg|png|jpeg|webp)$/i.test(f)).sort();
const map = {};
let skipped=0;
for (const f of files) {
  // Pattern 1 : <id>_lot<N>_<n>_<vue>.jpg  (lots originaux Grok mai)
  let m = f.match(/^([a-z_]+)_lot(\d+)_(\d+)_(taille|environnement|chasse|sa_vie|qui_le_chasse)\.(jpg|png|jpeg|webp)$/i);
  let id, vue;
  if (m) { id=m[1]; vue=m[4].toLowerCase(); }
  // Pattern 2 : <id>_inbox2_<N>_<vue>.jpg  (livraison inbox2 avec vue)
  if (!m) { m = f.match(/^([a-z_]+)_inbox2_(\d+)_(taille|environnement|chasse|sa_vie|qui_le_chasse)\.(jpg|png|jpeg|webp)$/i);
            if (m) { id=m[1]; vue=m[3].toLowerCase(); } }
  // Pattern 3 : <id>_inbox2_<N>.jpg → IGNORÉ pour l'instant (en attente de classement par vue dino par dino)
  // Pattern 4 : <id>_<vue>.jpg  (nouvelle livraison simple)
  if (!m) { m = f.match(/^([a-z_]+?)_(taille|environnement|chasse|sa_vie|qui_le_chasse)\.(jpg|png|jpeg|webp)$/i);
            if (m) { id=m[1]; vue=m[2].toLowerCase(); } }
  if (!m) { console.log('SKIP regex:',f); skipped++; continue; }
  const key = f.replace(/\.(jpg|png|jpeg|webp)$/i,'');
  if (SKIP_DINO.has(id)) continue;
  if (KO.has(key)) continue;
  const label = vue==='generique' ? 'Image' : (VUE[vue]||vue);
  (map[id]=map[id]||[]).push({ url:'img/dinos/grok/'+f, label, type:'grok' });
}

// Ordre stable des vues dans la galerie
const ORDER = ['Sa taille','Son environnement','Sa vie','Qui le chasse'];
for (const id of Object.keys(map)) {
  map[id].sort((a,b) => {
    const ai = ORDER.indexOf(a.label); const bi = ORDER.indexOf(b.label);
    return (ai<0?99:ai) - (bi<0?99:bi);
  });
}

let out='// Images dino — générées par IA (Grok), libres de droit.\n';
out+='// Filtrées par revue visuelle agents (KO anatomiques + herbivores sans prédateur).\n';
out+='// Généré automatiquement par _gen-grok.cjs — ne pas éditer à la main.\n\n';
out+='const DINO_GROK = '+JSON.stringify(map,null,2)+';\n';
fs.writeFileSync(OUT,out,'utf8');
const totDino=Object.keys(map).length, totImg=Object.values(map).reduce((a,b)=>a+b.length,0);
console.log('Dinos avec images OK:',totDino,'| Images OK:',totImg,'| Skipped (regex):',skipped);
