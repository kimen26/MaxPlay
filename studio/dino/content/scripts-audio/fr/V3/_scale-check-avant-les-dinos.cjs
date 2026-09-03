// Wrapper CommonJS : dinos-data.js n'a pas de module.exports, et vm.runInContext
// n'attache pas les const top-level. On compile le source + export explicite.
const fs = require('fs');
const path = require('path');
const Module = require('module');

const file = path.join(__dirname, '../../../../../../site/js/dinos-data.js');
const src = fs.readFileSync(file, 'utf8');
const m = new Module('dinos-data-wrapper');
m._compile(src + '\nmodule.exports = { _compLong, _compHaut, _compPoids, DINOS };', file);
const { _compLong, _compHaut, _compPoids, DINOS } = m.exports;

const ids = ['edaphosaurus', 'gorgonops', 'lystrosaurus', 'moschops'];
for (const id of ids) {
  const d = DINOS.find(x => x.id === id);
  console.log(`=== ${d.name} (${id}) ===`);
  console.log(`data: taille_m=${d.taille_m} hauteur_m=${d.hauteur_m} poids_t=${d.poids_t}`);
  console.log(`_compLong(${d.taille_m})   -> ${d.comp_taille}`);
  console.log(`_compHaut(${d.hauteur_m})  -> ${d.comp_hauteur}`);
  console.log(`_compPoids(${d.poids_t})  -> ${d.comp_poids}`);
  console.log(`re-exec: ${_compLong(d.taille_m)} / ${_compHaut(d.hauteur_m)} / ${_compPoids(d.poids_t)}`);
}
