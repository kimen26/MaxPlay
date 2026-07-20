// gen-dinos-assets.mjs — génère site/js/dinos-assets.js (manifeste unique des
// familles d'assets dino : ombre / sprite / tete / paleoart / avatar) + rapport
// des trous. Vocabulaire figé 2026-07-20 (memory/stack.md § Vocabulaire ASSETS).
//
// Usage : node studio/minijeux/scripts/gen-dinos-assets.mjs
// À relancer après tout ajout/suppression dans site/img/dinos/ ou img/avatars/.
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../site');
const dir = p => (existsSync(resolve(ROOT, p)) ? readdirSync(resolve(ROOT, p)) : []);

// Diminutif avatar → Nom latin (les ids fantaisie — lave, volcan, oeuf… — n'ont pas de dino)
const AVATAR_ALIAS = {
  allo: 'Allosaurus', anky: 'Ankylosaurus', brachio: 'Brachiosaurus', centro: 'Centrosaurus', cory: 'Corythosaurus',
  dilo: 'Dilophosaurus', diplo: 'Diplodocus', galli: 'Gallimimus', mammouth: 'Mammuthus',
  mosa: 'Mosasaurus', pachy: 'Pachycephalosaurus', paras: 'Parasaurolophus',
  ptero: 'Pteranodon', smilodon: 'Smilodon', spino: 'Spinosaurus', stego: 'Stegosaurus',
  theri: 'Therizinosaurus', trex: 'Tyrannosaurus', tritri: 'Triceratops', velo: 'Velociraptor',
};

const assets = {}; // Nom latin → { ombre, sprite, tete, avatar, paleoart:{...} }
const A = n => (assets[n] ||= { ombre: null, sprite: null, tete: null, avatar: null, paleoart: {} });

for (const f of dir('img/dinos/ombres')) {
  const m = f.match(/^([A-Z][A-Za-z]+)_ombre\.png$/);
  if (m) A(m[1]).ombre = 'img/dinos/ombres/' + f;
}
for (const f of dir('img/dinos/sprites')) {
  let m = f.match(/^([A-Z][A-Za-z]+)_sprite\.png$/);
  if (m) { A(m[1]).sprite = 'img/dinos/sprites/' + f; continue; }
  m = f.match(/^([A-Z][A-Za-z]+)_tete\.png$/);
  if (m) A(m[1]).tete = 'img/dinos/sprites/' + f;
}
for (const f of dir('img/dinos/paleoart')) {
  const m = f.match(/^([A-Z][A-Za-z]+?)(?:_([a-z]+))?\.(jpg|webp|png)$/);
  if (!m) continue;
  A(m[1]).paleoart[m[2] || 'hero'] = 'img/dinos/paleoart/' + f;
}
// Avatars : présence par diminutif (fichiers <id>_<humeur>_<n>.png)
const avatarIds = new Set(dir('img/avatars').map(f => (f.match(/^([a-z]+)_/) || [])[1]).filter(Boolean));
for (const [id, nom] of Object.entries(AVATAR_ALIAS)) {
  if (avatarIds.has(id) && assets[nom]) assets[nom].avatar = id; // id → fichiers via MAXPLAY_AVATARS
}

// ── Rapport des trous ──
const noms = Object.keys(assets).sort();
const manque = k => noms.filter(n => !assets[n][k]);
console.log(`${noms.length} dinos référencés.`);
for (const k of ['ombre', 'sprite', 'tete', 'avatar']) {
  const m = manque(k);
  console.log(`  sans ${k} : ${m.length}${m.length ? ' → ' + m.join(', ') : ''}`);
}
const sansHero = noms.filter(n => !assets[n].paleoart.hero);
const sansHead = noms.filter(n => !assets[n].paleoart.headshot);
console.log(`  sans paleoart hero : ${sansHero.length}${sansHero.length ? ' → ' + sansHero.join(', ') : ''}`);
console.log(`  sans headshot : ${sansHead.length}${sansHead.length ? ' → ' + sansHead.join(', ') : ''}`);
const fantaisie = [...avatarIds].filter(id => !AVATAR_ALIAS[id]);
console.log(`  avatars fantaisie (sans dino) : ${fantaisie.join(', ')}`);

// ── Écriture du manifeste (window.*, jamais de fetch — règle HTML local) ──
const out = '// dinos-assets.js — GÉNÉRÉ par studio/minijeux/scripts/gen-dinos-assets.mjs — NE PAS ÉDITER À LA MAIN.\n'
  + '// Manifeste des familles d\'assets par dino (vocabulaire figé 2026-07-20 : ombre / sprite / tete / paleoart / avatar).\n'
  + '// avatar = diminutif (fichiers via window.MAXPLAY_AVATARS de avatars.js). Régénérer après tout ajout d\'image.\n'
  + 'window.DINO_ASSETS = ' + JSON.stringify(assets, null, 1) + ';\n';
writeFileSync(resolve(ROOT, 'js/dinos-assets.js'), out);
console.log('→ site/js/dinos-assets.js écrit (' + noms.length + ' entrées).');
