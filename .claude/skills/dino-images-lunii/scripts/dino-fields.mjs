// Extrait proprement les champs d'un dino (par id) depuis site/js/dinos-data.js.
// Usage: node dino-fields.mjs <id>            -> imprime JSON {name,png,...}
//        node dino-fields.mjs --list          -> liste tous les id\tname\tpng
import { readFileSync } from 'node:fs';
const SRC = readFileSync('c:/ProjetsPerso/Claude_Projects/MaxPlay/site/js/dinos-data.js', 'utf8');

// Bloc DINOS uniquement (après "const DINOS = [")
const DBLOCK = SRC.slice(SRC.indexOf('const DINOS = ['));

function fieldFrom(block, name) {
  // valeur en quotes simples, gère \' échappé
  const re = new RegExp(name + ":\\s*'((?:[^'\\\\]|\\\\.)*)'");
  const m = block.match(re);
  if (m) return m[1].replace(/\\'/g, "'");
  // fallback : valeur numérique non quotée (ex: taille_m: 13, hauteur_m: 0.5)
  const reNum = new RegExp(name + ":\\s*([0-9]+(?:\\.[0-9]+)?)");
  const mn = block.match(reNum);
  return mn ? mn[1] : '';
}

function getBlock(id) {
  const needle = `id: '${id}'`;
  const idx = DBLOCK.indexOf(needle);
  if (idx < 0) return null;
  const objStart = DBLOCK.lastIndexOf('{', idx);
  const rest = DBLOCK.slice(idx);
  const endRel = rest.search(/\n  \},/) >= 0 ? rest.search(/\n  \},/) : rest.search(/\n  \}/);
  return DBLOCK.slice(objStart, idx + endRel + 4);
}

function allIds() {
  const ids = [];
  const re = /\n  \{\s*[\s\S]*?id: '([^']+)'/g;
  let m;
  while ((m = re.exec(DBLOCK))) ids.push(m[1]);
  return ids;
}

const arg = process.argv[2];
if (arg === '--list') {
  for (const id of allIds()) {
    const b = getBlock(id);
    console.log([id, fieldFrom(b, 'name'), fieldFrom(b, 'png')].join('\t'));
  }
  process.exit(0);
}
if (!arg) { console.log('usage: node dino-fields.mjs <id> | --list'); process.exit(1); }
const b = getBlock(arg);
if (!b) { console.error('id introuvable:', arg); process.exit(2); }
const out = {};
for (const f of ['id', 'name', 'full', 'famille', 'cat', 'epoque', 'region', 'taille_m', 'hauteur_m', 'poids_t', 'regime', 'superpower', 'proies', 'amis', 'fait', 'desc', 'png', 'continent', 'periode']) {
  out[f] = fieldFrom(b, f);
}
// Volants : taille_m est l'ENVERGURE, pas la longueur du corps. Booléen, donc lu à part
// (fieldFrom ne récupère que les chaînes quotées et les nombres).
out.taille_vol = /taille_vol:\s*true/.test(b);
console.log(JSON.stringify(out, null, 0));
