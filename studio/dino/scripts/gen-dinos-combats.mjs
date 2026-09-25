// gen-dinos-combats.mjs — génère site/js/gen/dinos-combats.js : les scènes de combat
// (pire ennemi, meilleure proie ou rival) de chaque animal, pour la galerie de sa fiche.
//
// Source de vérité : studio/dino/content/sources/combats/combats.json (qui affronte qui).
// Une scène n'entre dans le manifeste que si son image VALIDÉE est rangée dans
// site/img/dinos/paleoart/<Nom>_<type>.webp : ce qui n'a pas passé la vérification
// n'est jamais montré.
//
// Usage : node studio/dino/scripts/gen-dinos-combats.mjs [--check]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const SOURCE = resolve(REPO, 'studio/dino/content/sources/combats/combats.json');
const PALEO = resolve(REPO, 'site/img/dinos/paleoart');
const DATA = resolve(REPO, 'site/js/gen/dinos-data.js');
const OUT_PATH = resolve(REPO, 'site/js/gen/dinos-combats.js');

// Nom de fichier d'un animal = clé `png` de dinos-data.js sans extension (norme clé d'assets).
const data = readFileSync(DATA, 'utf8');
const nomFichier = id => {
  const m = data.match(new RegExp(`id: '${id}'[\\s\\S]*?png: '([A-Za-z]+)\\.`));
  if (!m) throw new Error(`id sans png dans dinos-data.js : ${id}`);
  return m[1];
};

const nomAffiche = id => (data.match(new RegExp(`id: '${id}'[\\s\\S]*?name: '((?:[^'\\\\]|\\\\.)*)'`)) || [])[1];
// Libellé court de l'adversaire pour la galerie : le nom de sa fiche s'il en a une,
// sinon le texte de combats.json sans son apposition (« Onchopristis, un poisson-scie géant »).
const libelle = s => (s.adversaire_id && nomAffiche(s.adversaire_id)) || s.adversaire.split(',')[0].replace(/^Un /, 'un ').trim();

const table = JSON.parse(readFileSync(SOURCE, 'utf8'));
const combats = {};
let montrees = 0, attendues = 0;
for (const [id, entree] of Object.entries(table)) {
  const nom = nomFichier(id);
  for (const s of entree.scenes) {
    attendues++;
    const file = `${nom}_${s.type}.webp`;
    if (!existsSync(resolve(PALEO, file))) continue;
    (combats[id] ||= []).push({ file, type: s.type, meme_espece: s.adversaire_id === id, adversaire: libelle(s), adversaire_latin: s.adversaire_latin });
    montrees++;
  }
}
console.log(`combats : ${montrees}/${attendues} scènes validées et rangées.`);

const out = '// dinos-combats.js — GÉNÉRÉ par studio/dino/scripts/gen-dinos-combats.mjs — NE PAS ÉDITER À LA MAIN.\n'
  + '// Scènes de combat par animal (pire ennemi, proie ou rival), seulement celles validées et rangées dans img/dinos/paleoart/.\n'
  + 'window.DINO_COMBATS = ' + JSON.stringify(combats, null, 1) + ';\n';

if (process.argv.includes('--check')) {
  const avant = existsSync(OUT_PATH) ? readFileSync(OUT_PATH, 'utf8') : null;
  if (avant !== out) {
    console.error('✗ dinos-combats.js : sortie différente du fichier commité — lancer `npm run build`.');
    process.exit(1);
  }
} else {
  writeFileSync(OUT_PATH, out);
}
