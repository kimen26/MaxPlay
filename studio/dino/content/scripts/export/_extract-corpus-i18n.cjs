// Extrait le corpus TEXTE a traduire depuis le canon FR (site/js/dinos-data.js).
// Sortie : studio/dino/content/i18n/_corpus/corpus-fr.json (+ un fichier par lot).
// Les champs NEUTRES (mesures, ids, images, couleurs) ne sortent jamais : ils ne se traduisent pas.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');
const src = fs.readFileSync(path.join(ROOT, 'site/js/dinos-data.js'), 'utf8');
eval(src.replace(/^const /gm, 'global.'));

// Champs TEXTE des fiches dino (tout le reste est neutre et reste FR).
const CHAMPS_DINO = ['name', 'full', 'epoque', 'region', 'comp_taille', 'comp_hauteur',
  'comp_poids', 'nom_etym', 'regime', 'superpower', 'chasseurs', 'proies', 'amis',
  'fait', 'desc', 'continent', 'queue_note'];
const CHAMPS_FAMILLE = ['sci', 'label', 'savant', 'desc', 'sci_sens', 'explic'];

const dinos = {};
global.DINOS.forEach(d => {
  const o = {};
  CHAMPS_DINO.forEach(k => { if (typeof d[k] === 'string' && d[k].trim()) o[k] = d[k]; });
  dinos[d.id] = o;
});
const familles = {};
global.DINO_FAMILLES.forEach(f => {
  const o = {};
  CHAMPS_FAMILLE.forEach(k => { if (typeof f[k] === 'string' && f[k].trim()) o[k] = f[k]; });
  familles[f.id] = o;
});

// Periodes et regimes : petites collections, mais visibles partout (fiche, menus).
const CHAMPS_PERIODE = ['label', 'desc'];
const CHAMPS_CATEGORIE = ['label'];
const periodes = {};
(global.DINO_PERIODES || []).forEach(p => {
  const o = {};
  CHAMPS_PERIODE.forEach(k => { if (typeof p[k] === 'string' && p[k].trim()) o[k] = p[k]; });
  periodes[p.id] = o;
});
const categories = {};
(global.DINO_CATEGORIES || []).forEach(c => {
  const o = {};
  CHAMPS_CATEGORIE.forEach(k => { if (typeof c[k] === 'string' && c[k].trim()) o[k] = c[k]; });
  categories[c.id] = o;
});

const out = { _meta: { source: 'site/js/dinos-data.js', genere: new Date().toISOString().slice(0, 10),
  nb_dinos: Object.keys(dinos).length, nb_familles: Object.keys(familles).length },
  familles, periodes, categories, dinos };

const dir = path.join(ROOT, 'studio/dino/content/i18n/_corpus');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'corpus-fr.json'), JSON.stringify(out, null, 2), 'utf8');

// Lots de 10 dinos : un traducteur avale un lot a la fois, jamais 70 d'un coup.
const ids = Object.keys(dinos);
const TAILLE_LOT = 10;
let nbLots = 0;
for (let i = 0; i < ids.length; i += TAILLE_LOT) {
  const lot = {};
  ids.slice(i, i + TAILLE_LOT).forEach(id => { lot[id] = dinos[id]; });
  nbLots++;
  fs.writeFileSync(path.join(dir, `lot-${String(nbLots).padStart(2, '0')}.json`),
    JSON.stringify({ dinos: lot }, null, 2), 'utf8');
}
let chars = 0;
Object.values(dinos).forEach(d => Object.values(d).forEach(v => chars += v.length));
Object.values(familles).forEach(f => Object.values(f).forEach(v => chars += v.length));
console.log(`corpus-fr.json : ${Object.keys(dinos).length} dinos, ${Object.keys(familles).length} familles, ${nbLots} lots, ${chars} caracteres`);
