// gen-avatars-manifest.mjs — genere site/js/avatars.js depuis site/img/avatars/<id>_<mood>_<n>.png
// (variant-aware). Reecrit depuis gen_avatars_manifest.py (HO-R01, 2026-09-12 : seul Python du repo JS).
// Lancer depuis la racine du repo : node studio/minijeux/scripts/gen-avatars-manifest.mjs
import { readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../../'); // studio/minijeux/scripts -> racine repo
const AV = path.join(ROOT, 'site/img/avatars');
const OUT = path.join(ROOT, 'site/js/gen/avatars.js');

// id -> [surnom, sous-titre] ; ordre = ordre d'affichage historique
const NAMES = {
  tritri: ['Tritri', 'Tricératops'], trex: ['Rex', 'T-Rex'], stego: ['Stégo', 'Stégosaure'],
  brachio: ['Brachi', 'Brachiosaure'], velo: ['Vélo', 'Vélociraptor'], spino: ['Spino', 'Spinosaure'],
  anky: ['Anky', 'Ankylosaure'], ptero: ['Ptéro', 'Ptéranodon'], diplo: ['Diplo', 'Diplodocus'],
  paras: ['Paras', 'Parasaurolophus'], theri: ['Théri', 'Therizinosaure'],
  pachy: ['Pachy', 'Pachycéphalosaure'], centro: ['Centro', 'Centrosaure'], dilo: ['Dilo', 'Dilophosaure'],
  galli: ['Galli', 'Gallimimus'], allo: ['Allo', 'Allosaure'],
  oeuf: ['Coco', 'Œuf de dino'], libellule: ['Libelle', 'Libellule géante'], ammonite: ['Ammo', 'Ammonite'],
  mosa: ['Mosa', 'Mosasaure'], plesio: ['Plési', 'Plésiosaure'], cory: ['Cory', 'Corythosaure'],
  vague: ['Vague', 'La grande vague'], cendre: ['Cendro', 'Nuage de cendre'], lave: ['Lava', 'Goutte de lave'],
  mammouth: ['Mammouth', 'Mammouth laineux'], smilodon: ['Smilo', 'Dent de sabre'],
  meteorite: ['Météo', 'Météorite'], volcan: ['Volcan', 'Volcan'],
};
const MOODS = ['joyeux', 'enerve', 'original'];
const rx = /^([a-z]+)_(joyeux|enerve|original)_(\d+)\.png$/;

const found = {};
for (const f of readdirSync(AV).sort()) {
  const m = rx.exec(f);
  if (!m) { console.log('IGNORE', f); continue; }
  const [, id, mood] = m;
  if (!found[id]) found[id] = Object.fromEntries(MOODS.map(mm => [mm, []]));
  found[id][mood].push(f);
}

const data = [];
for (const [id, [name, sub]] of Object.entries(NAMES)) {
  if (!found[id]) { console.log('ABSENT (aucun fichier):', id); continue; }
  data.push({ id, name, sub, moods: found[id] });
}
const unknown = Object.keys(found).filter(id => !(id in NAMES));
if (unknown.length) console.log('SANS NOM (a ajouter a NAMES):', unknown);

const js = `// GÉNÉRÉ par studio/minijeux/scripts/gen-avatars-manifest.mjs — ne pas éditer. Manifest avatars (Variant-aware).\n`
  + `window.MAXPLAY_AVATARS_BASE = "img/avatars/";\n`
  + `window.MAXPLAY_AVATARS = ${JSON.stringify(data, null, 1)};\n`;
writeFileSync(OUT, js, 'utf8');

const total = data.reduce((n, d) => n + Object.values(d.moods).flat().length, 0);
console.log('OK:', data.length, 'creatures,', total, 'fichiers ->', OUT);
