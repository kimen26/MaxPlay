// Batch COLORIAGE — 1 image line art par dino, style cartoon mignon pour mini-jeu de coloriage.
// Base sur batch-dino-headshot.mjs (memes fonctions fiche, champs, etc.)
//
// Usage: node batch-dino-coloriage.mjs <id1> [id2] [id3] ...
//        node batch-dino-coloriage.mjs --grok <id1> [id2] ...

import { readFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const SKILL = '.claude/skills/dino-images-lunii/scripts';
const FIELDS = SKILL + '/dino-fields.mjs';
const FICHES = ROOT + '/studio/dino/content/sources/fiches/_FICHES-DINOS-GROKIPEDIA.md';

const USE_GROK = process.argv.includes('--grok');
const GEN = USE_GROK ? SKILL + '/grok-gen-dino.mjs' : SKILL + '/gpt-gen-dino.mjs';
const GPTS = 'https://chatgpt.com/g/g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project';

const OUTD = ROOT + '/site/img/dinos/_new-coloriage';
const PROGRESS = OUTD + '/_PROGRESS.tsv';
mkdirSync(OUTD, { recursive: true });

const ids = process.argv.slice(2).filter(a => !a.startsWith('--'));
const fichesTxt = existsSync(FICHES) ? readFileSync(FICHES, 'utf8') : '';

// Signatures morphologiques manuelles pour les dinos sans fiche.
const MORPHO = {
  saurolophus: "dinosaure a bec de canard, et surtout une CORNE d'os DROITE et COURTE plantee sur l'arriere du crane, qui pointe vers l'ARRIERE et vers le HAUT en prolongeant la ligne du museau (comme une petite pointe de fleche) ; museau plat de canard, longue queue epaisse",
  corythosaurus: "dinosaure a bec de canard, et surtout une GRANDE CRETE en forme de CASQUE ROND ET HAUT posee sur le dessus de la tete, aussi large que le crane, arrondie sur le dessus comme un casque de pompier vu de profil ; museau plat de canard, dos et flancs LISSES en grandes zones vides, longue queue epaisse",
  hatzegopteryx: "reptile volant, grandes ailes de PEAU tendues sur un long doigt, long bec pointu SANS dents, cou COURT et EPAIS, marche a quatre pattes en repliant ses ailes",
  elasmosaurus: "cou immense d'environ 7 m, petite tete, corps en tonneau, 4 grandes nageoires en pagaie",
  ophthalmosaurus: "corps fuselé de dauphin, yeux enormes d'environ 23 cm, museau court et fin",
  liopleurodon: "pliosaure trapu, tete enorme avec machoires puissantes, 4 grandes nageoires",
  archelon: "tortue marine geante, carapace bombée, immenses nageoires en forme d'aile",
  shonisaurus: "ichtyosaure geant de 15 m, museau long, 4 nageoires fines",
  patagotitan: "titanosaure colossal de 37 m, tres long cou et queue, 4 pattes-piliers",
  centrosaurus: "ceratopsien avec une seule grande corne nasale, collerette osseuse bordee de crochets",
  ichthyosaurus: "reptile marin en forme de dauphin, museau long, grands yeux",
  tyrannosaurus: "grand carnivore bipede, grosse tete, et surtout de tout PETITS bras avec seulement DEUX doigts a chaque main (jamais trois), longue queue",
  tarbosaurus: "grand carnivore bipede type T-Rex, grosse tete, petits bras a seulement DEUX doigts par main (jamais trois), longue queue",
  torosaurus: "ceratopsien a immense collerette avec DEUX grands TROUS ovales bien visibles dedans (des fenetres, pas une collerette pleine), 3 cornes, bec de perroquet",
  ophthalmosaurus: "reptile marin en forme de dauphin, yeux ENORMES, et une queue verticale en forme de CROISSANT de lune (pas une queue plate de poisson), une nageoire dressee sur le dos, 4 nageoires",
  pentaceratops: "ceratopsien a immense collerette, avec CINQ cornes : deux grandes cornes au-dessus des yeux, une sur le nez, et deux petites cornes pointues sur les joues, bec de perroquet",
};

function getFields(id) {
  return JSON.parse(execFileSync('node', [FIELDS, id], { encoding: 'utf8' }));
}
// ⚠️ Deux pièges corrigés 2026-07-30 (le bloc n'était JAMAIS trouvé) :
//  - dans une string, '[\s\S]' s'écrase en '[sS]' — il faut '[\\s\\S]' ;
//  - le délimiteur de fin est le caractère ❓, pas '?' ;
//  - '\\b' devant le nom, sinon Saurolophus attrape la fiche Parasaurolophus.
function ficheBlock(d) {
  const keys = [d.full, d.name].filter(Boolean);
  for (const k of keys) {
    const base = k.split(/[ (]/)[0];
    const re = new RegExp('## .*\\b' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?### ❓', 'i');
    const m = fichesTxt.match(re);
    if (m) return m[0].replace(/### ❓[\s\S]*$/, '').trim();
  }
  return null;
}
function fichePuce(d, label) {
  const b = ficheBlock(d);
  if (!b) return '';
  const line = b.split('\n').find(l => new RegExp('\\*\\*' + label + '\\*\\*', 'i').test(l));
  if (!line) return '';
  return line
    .replace(/^[-\s]*\*\*[^*]+\*\*\s*:?\s*/i, '')
    .replace(/\*\*/g, '')
    .replace(/\s*—.*$/, '')
    .replace(/[^.;,]*\b(?:pas|uniquement|plutôt|probables?|possibles?|ne\s)\b[^.;,]*/gi, '')
    .replace(/\s+/g, ' ').trim();
}
function ficheSignature(d) {
  const b = ficheBlock(d);
  if (!b) return '';
  const lines = b.split('\n').filter(l => /⭐\s*\*\*Signature/i.test(l));
  if (!lines.length) return '';
  return lines[0].replace(/^[-\s]*⭐\s*\*\*Signature\*\*\s*:?\s*/i, '').replace(/\*\*/g, '').trim();
}
function cleanPuce(line) {
  return line
    .replace(/^[-\s]*\*\*[^*]+\*\*\s*:?\s*/i, '')
    .replace(/\*\*/g, '')
    .replace(/\s*—.*$/, '')
    .replace(/[^.;,]*\b(?:pas|uniquement|plutôt|probables?|possibles?|ne\s)\b[^.;,]*/gi, '')
    .replace(/\s+/g, ' ').trim();
}
function descPhysique(d) {
  const out = [];
  const seen = new Set();
  for (const label of ['Silhouette', 'Tête', 'Dents', 'Peau', 'Pieds', 'Bras']) {
    const p = fichePuce(d, label);
    if (p && !seen.has(p)) { seen.add(p); out.push(p); }
  }
  return out;
}
function mesuresGlobales(d) {
  const p = [];
  if (parseFloat(d.taille_m)) p.push(`${String(d.taille_m).replace('.', ',')} m de long`);
  if (parseFloat(d.hauteur_m)) p.push(`${String(d.hauteur_m).replace('.', ',')} m de haut`);
  if (parseFloat(d.poids_t)) p.push(`${String(d.poids_t).replace('.', ',')} tonnes`);
  return p.join(', ');
}

const PREVIEW = process.argv.includes('--preview');
function gen(prompt, outName, firstOfDino) {
  if (PREVIEW) { console.log(`\n--- [${outName}] ---\n${prompt}`); return 0; }
  const args = [GEN, prompt, OUTD + '/' + outName];
  if (firstOfDino) args.push(...(USE_GROK ? ['--new'] : ['--url', GPTS]));
  try {
    const out = execFileSync('node', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
    process.stdout.write(out);
    return 0;
  } catch (e) {
    const code = e.status || 1;
    if (code === 5) { console.log('⛔ ARRÊT : limite/crédits. Reprends plus tard.'); process.exit(5); }
    console.log(`(échoué code=${code} pour ${outName})`);
    return code;
  }
}

function logProgress(id, scene, status) {
  appendFileSync(PROGRESS, `${new Date().toISOString()}\t${id}\t${scene}\t${status}\n`);
}

// Pause aléatoire entre 5 et 10 secondes pour éviter le rate limit de ChatGPT
function sleepRandom() {
  const ms = Math.floor(Math.random() * 5000) + 5000; // 5000-10000ms
  console.log(`  (pause ${(ms/1000).toFixed(1)}s avant prochaine image...)`);
  const start = Date.now();
  while (Date.now() - start < ms) {
    // spinlock synchrone
  }
}

const ENTETE = `CONTEXTE : illustration pour un mini-jeu de coloriage pour enfant de 4 ans.
RÔLE : illustrateur de stickers et coloriages, style cartoon mignon et très lisible.`;

// « Fond transparent » faisait rendre un fond GRIS FONCÉ (incoloriable, et les 60 coloriages
// existants sont en RGB fond BLANC) ; les « pas de couleur / pas de gris / pas d'ombre » sont
// du Streisand banni. Reformulé en positif : page blanche + trait noir. Corrigé 2026-07-30.
const STYLE_COLORIAGE = `STYLE : dessin au trait pour livre de coloriage, style cartoon mignon. L'image est une PAGE ENTIÈREMENT BLANCHE sur laquelle l'animal est dessiné uniquement avec des CONTOURS NOIRS ÉPAIS ET NETS, comme au feutre noir. L'intérieur de l'animal reste BLANC, vide, prêt à être colorié aux crayons ; le fond autour de lui est BLANC PUR lui aussi, du blanc de la page. Seulement deux valeurs dans toute l'image : le blanc de la page et le noir du trait. Grandes zones blanches simples et bien fermées. Formes arrondies et douces, yeux grands et expressifs, petite bouche souriante. Très simple, très lisible, parfait pour qu'un enfant de 4 ans colorie. Pas de texte ni de chiffre dans l'image.`;

function buildColoriagePrompt(d, id) {
  const regimeMot = d.regime ? d.regime.replace(/[^\p{L}\s]/gu, '').trim().toLowerCase() : '';
  const epoqueMot = d.epoque ? d.epoque.split('·')[0].trim() : 'son époque';
  
  const lignes = [
    ENTETE,
    `OBJECTIF : dessiner un ${d.name} en entier, de profil ou 3/4, très reconnaissable et mignon pour un mini-jeu de coloriage.`,
    `LE DINOSAURE : ${d.name}${d.full && d.full !== d.name ? ` (${d.full})` : ''}, ${regimeMot} du ${epoqueMot}.`,
  ];
  
  // Caractéristiques anatomiques reconnaissables
  const puces = descPhysique(d);
  if (puces.length) {
    lignes.push(`CARACTÉRISTIQUES (à simplifier mais garder reconnaissables) :`);
    puces.forEach(p => lignes.push(`- ${p}.`));
  } else if (MORPHO[id]) {
    lignes.push(`SILHOUETTE : ${MORPHO[id]}.`);
  }
  
  const sig = ficheSignature(d);
  if (sig) lignes.push(`DÉTAIL LE PLUS RECONNAISSABLE : ${sig}.`);
  
  const mg = mesuresGlobales(d);
  if (mg) lignes.push(`Taille : ${mg}.`);
  
  lignes.push(`CAMÉRA : plan moyen, dinosaure entier visible, bien centré, avec de l'espace autour. Posture naturelle et paisible.`);
  lignes.push(STYLE_COLORIAGE);
  
  return lignes.join('\n');
}

for (const id of ids) {
  const d = getFields(id);
  const baseName = d.png.replace(/^grok\//, '').replace(/\.(jpg|png)$/i, '');
  console.log(`\n========== ${id} (${d.name}) — COLORIAGE ==========`);
  
  logProgress(id, 'coloriage', 'start');
  const prompt = buildColoriagePrompt(d, id);
  
  if (PREVIEW) {
    console.log(`\n--- [${baseName}_coloriage.png] ---\n${prompt}`);
  } else {
    gen(prompt, `${baseName}_coloriage.png`, true);
    sleepRandom(); // pause 2-7s entre chaque image
  }
  
  logProgress(id, 'coloriage', 'done');
  console.log(`---------- ${id} coloriage terminé ----------`);
}
console.log('\n✅ Batch coloriage terminé pour:', ids.join(', '));
