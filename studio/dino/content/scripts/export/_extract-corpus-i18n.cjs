// Extrait le corpus TEXTE a traduire depuis le canon FR (site/js/dinos-data.js + dinos-racines.js).
// Sortie : studio/dino/content/i18n/_corpus/corpus-fr.json (+ un fichier par lot).
// Les champs NEUTRES (mesures, ids, images, couleurs) ne sortent jamais : ils ne se traduisent pas.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');
const src = fs.readFileSync(path.join(ROOT, 'site/js/dinos-data.js'), 'utf8');
eval(src.replace(/^const /gm, 'global.'));
const plantesPath = path.join(ROOT, 'site/js/dinos-plantes.js');
if (fs.existsSync(plantesPath)) eval(fs.readFileSync(plantesPath, 'utf8').replace(/^const /gm, 'global.'));
const racinesSrc = fs.readFileSync(path.join(ROOT, 'site/js/dinos-racines.js'), 'utf8');
eval(racinesSrc.replace(/^const /gm, 'global._RACINES_'));

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
const CHAMPS_PERIODE = ['label', 'desc', 'range'];
const CHAMPS_CATEGORIE = ['label'];
const periodes = {};
(global.DINO_PERIODES || []).forEach(p => {
  const o = {};
  CHAMPS_PERIODE.forEach(k => { if (typeof p[k] === 'string' && p[k].trim()) o[k] = p[k]; });
  periodes[p.id] = o;
});
const CHAMPS_ERE = ['label', 'surnom', 'bornes', 'accroche'];
const eres = {};
(global.DINO_ERES || []).forEach(e => {
  const o = {};
  CHAMPS_ERE.forEach(k => { if (typeof e[k] === 'string' && e[k].trim()) o[k] = e[k]; });
  eres[e.id] = o;
});
const categories = {};
(global.DINO_CATEGORIES || []).forEach(c => {
  const o = {};
  CHAMPS_CATEGORIE.forEach(k => { if (typeof c[k] === 'string' && c[k].trim()) o[k] = c[k]; });
  categories[c.id] = o;
});

// Plantes (flore du Mesozoique, onglet Les epoques). Champs NEUTRES exclus :
// id, type, periodes, emoji, png, hauteur_m, mangee_par (des ids de dinos, pas du texte).
const CHAMPS_PLANTE = ['name', 'full', 'nom_etym', 'region', 'comp_hauteur', 'environnement',
  'feuille', 'graines', 'mangee_comment', 'superpower', 'fait', 'vivant'];
const plantes = {};
(global.DINO_PLANTES || []).forEach(p => {
  const o = {};
  CHAMPS_PLANTE.forEach(k => { if (typeof p[k] === 'string' && p[k].trim()) o[k] = p[k]; });
  plantes[p.id] = o;
});

// Racines du dico (sens des racines grecques/latines + noms propres) : site/js/dinos-racines.js.
const racines = {};
(global._RACINES_DINO_RACINES.racines || []).forEach(r => {
  if (typeof r.sens === 'string' && r.sens.trim()) racines[r.cle] = { sens: r.sens };
});

// Pangee et Extinction : objets uniques (pas des collections par id), sortis a plat +
// leurs sous-listes indexees par periode/id (memes cles que la fusion dinos-i18n.js).
const CHAMPS_PANGEE = ['titre', 'soustitre', 'intro', 'credit', 'fun_fact', 'pourquoi'];
const CHAMPS_PANGEE_ETAPE = ['label', 'ma', 'titre', 'texte'];
const pangee = {};
CHAMPS_PANGEE.forEach(k => { if (typeof global.PANGEE[k] === 'string' && global.PANGEE[k].trim()) pangee[k] = global.PANGEE[k]; });
pangee.etapes = {};
(global.PANGEE.etapes || []).forEach(e => {
  const o = {};
  CHAMPS_PANGEE_ETAPE.forEach(k => { if (typeof e[k] === 'string' && e[k].trim()) o[k] = e[k]; });
  pangee.etapes[e.periode] = o;
});

const CHAMPS_EXTINCTION = ['titre', 'soustitre', 'fun_fact'];
const CHAMPS_EXTINCTION_HYPOTHESE = ['titre', 'texte', 'label_certitude'];
const extinction = {};
CHAMPS_EXTINCTION.forEach(k => { if (typeof global.EXTINCTION[k] === 'string' && global.EXTINCTION[k].trim()) extinction[k] = global.EXTINCTION[k]; });
extinction.hypotheses = {};
(global.EXTINCTION.hypotheses || []).forEach(h => {
  const o = {};
  CHAMPS_EXTINCTION_HYPOTHESE.forEach(k => { if (typeof h[k] === 'string' && h[k].trim()) o[k] = h[k]; });
  extinction.hypotheses[h.id] = o;
});

const out = { _meta: { source: 'site/js/dinos-data.js + site/js/dinos-racines.js', genere: new Date().toISOString().slice(0, 10),
  nb_dinos: Object.keys(dinos).length, nb_plantes: Object.keys(plantes).length, nb_familles: Object.keys(familles).length, nb_racines: Object.keys(racines).length },
  familles, periodes, categories, eres, dinos, plantes, racines, pangee, extinction };

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
Object.values(plantes).forEach(p => Object.values(p).forEach(v => chars += v.length));
console.log(`corpus-fr.json : ${Object.keys(dinos).length} dinos, ${Object.keys(plantes).length} plantes, ${Object.keys(familles).length} familles, ${Object.keys(racines).length} racines, ${nbLots} lots, ${chars} caracteres`);
