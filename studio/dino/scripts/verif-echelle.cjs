// verif-echelle.cjs — vérifie les comparaisons d'échelle (_compLong/_compHaut/_compPoids) de site/js/dinos-data.js
// Déplacé depuis studio/temp/_comp-runner-ceratopsiens.cjs le 2026-09-03 (HO-G10), généralisé :
// liste de dinos en argument (ids séparés par des virgules) au lieu de la liste "ceratopsiens" codée en dur.
// Wrapper CommonJS : le fichier source utilise des const top-level (vm.runInContext ne les attache pas)
// → on évalue le source dans une Function qui retourne les symboles.
//
// Usage :
//   node verif-echelle.cjs triceratops,torosaurus,protoceratops,pentaceratops,centrosaurus
//   node verif-echelle.cjs                 (sans argument : compare tous les dinos de DINOS)
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '../../../site/js/dinos-data.js'), 'utf8');
const api = new Function(src + '\n;return { _compLong, _compHaut, _compPoids, DINOS };')();

const argIds = process.argv[2];
const ids = argIds ? argIds.split(',').map(s => s.trim()).filter(Boolean) : api.DINOS.map(d => d.id);

for (const id of ids) {
  const d = api.DINOS.find(x => x.id === id);
  if (!d) { console.log(`!! ${id} NOT FOUND`); continue; }
  console.log(`=== ${d.name} (${id}) — ${d.full}`);
  console.log(`  data: taille_m=${d.taille_m} · hauteur_m=${d.hauteur_m} · poids_t=${d.poids_t}`);
  console.log(`  _compLong(${d.taille_m})  → ${api._compLong(d.taille_m)}`);
  console.log(`  _compHaut(${d.hauteur_m}) → ${api._compHaut(d.hauteur_m)}`);
  console.log(`  _compPoids(${d.poids_t}) → ${api._compPoids(d.poids_t)}`);
  console.log(`  [data] comp_taille  = ${d.comp_taille}`);
  console.log(`  [data] comp_hauteur = ${d.comp_hauteur}`);
  console.log(`  [data] comp_poids   = ${d.comp_poids}`);
}
