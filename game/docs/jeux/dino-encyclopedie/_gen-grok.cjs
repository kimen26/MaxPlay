const fs=require('fs'),path=require('path');
const DIR='c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/img/dinos/grok';
const OUT='c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/js/dinos-images-grok.js';
// KO exclus (verdicts agents revue visuelle 2026-05-17)
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
]);
// torosaurus exclu entièrement (hors-jeu)
const SKIP_DINO = new Set([]); // torosaurus ajoute au jeu 2026-05-17
const VUE = { taille:'Sa taille', environnement:'Son environnement', chasse:'Sa vie' };
const files = fs.readdirSync(DIR).filter(f=>f.endsWith('.jpg')).sort();
const map = {};
for (const f of files) {
  const m = f.match(/^([a-z_]+)_lot(\d+)_(\d+)_([a-z]+)\.jpg$/);
  if (!m) { console.log('SKIP regex:',f); continue; }
  const [,id,,,vue]=m;
  const key = f.replace('.jpg','');
  if (SKIP_DINO.has(id)) continue;
  if (KO.has(key)) continue;
  (map[id]=map[id]||[]).push({ url:`img/dinos/grok/${f}`, label:`${VUE[vue]||vue}`, type:'grok' });
}
let out='// Images dino — générées par IA (Grok), libres de droit.\n';
out+='// Filtrées par revue visuelle agents 2026-05-17 (KO anatomiques exclus).\n';
out+='// Généré automatiquement — ne pas éditer à la main.\n\n';
out+='const DINO_GROK = '+JSON.stringify(map,null,2)+';\n';
fs.writeFileSync(OUT,out,'utf8');
const totDino=Object.keys(map).length, totImg=Object.values(map).reduce((a,b)=>a+b.length,0);
console.log('Dinos avec images OK:',totDino,'| Images OK:',totImg,'/ 100');
