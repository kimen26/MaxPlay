// Genere le bundle FLORE consomme par le site :
//   studio/dino/content/sources/flore/plantes.json -> site/js/dinos-plantes.js
// Frontiere DEC-GED-001 : le site ne lit jamais studio/, tout descend par ce generateur.
// Usage : node _gen-plantes.cjs
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');

const src = path.join(ROOT, 'studio/dino/content/sources/flore/plantes.json');
const out = path.join(ROOT, 'site/js/dinos-plantes.js');

if (!fs.existsSync(src)) {
  console.error(`ABSENT: ${src}`);
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(src, 'utf8'));
if (!Array.isArray(data)) {
  console.error('plantes.json doit contenir un tableau');
  process.exit(1);
}

fs.writeFileSync(out,
  `// GENERE par studio/dino/content/scripts/export/_gen-plantes.cjs — ne pas editer a la main.\n` +
  `// Source : studio/dino/content/sources/flore/plantes.json\n` +
  `const DINO_PLANTES = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`${out} : ${data.length} plantes`);
