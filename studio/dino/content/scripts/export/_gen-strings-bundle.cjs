// Genere le bundle produit d'une langue : studio/dino/content/i18n/<lang>/strings.json
// -> site/js/i18n/dinos-strings.<lang>.js (consomme par site/js/dinos-i18n.js).
// Frontiere DEC-GED-001 : le site ne lit jamais studio/, tout descend par ce generateur.
// Usage : node _gen-strings-bundle.cjs <lang>
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');
const lang = process.argv[2];
if (!lang) { console.error('usage: node _gen-strings-bundle.cjs <lang>'); process.exit(2); }
const src = path.join(ROOT, 'studio/dino/content/i18n', lang, 'strings.json');
if (!fs.existsSync(src)) { console.error(`ABSENT: ${src}`); process.exit(1); }
const data = JSON.parse(fs.readFileSync(src, 'utf8'));
const payload = {
  dinos: data.dinos || {}, familles: data.familles || {}, racines: data.racines || {},
  periodes: data.periodes || {}, categories: data.categories || {},
  pangee: data.pangee || {}, extinction: data.extinction || {}, eres: data.eres || {}
};
const outDir = path.join(ROOT, 'site/js/i18n');
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `dinos-strings.${lang}.js`);
fs.writeFileSync(out,
  `// GENERE par studio/dino/content/scripts/export/_gen-strings-bundle.cjs — ne pas editer a la main.\n` +
  `// Source : studio/dino/content/i18n/${lang}/strings.json\n` +
  `window.DINO_STRINGS = ${JSON.stringify(payload, null, 1)};\n`, 'utf8');
console.log(`${out} : ${Object.keys(payload.dinos).length} dinos, ${Object.keys(payload.familles).length} familles, ${Object.keys(payload.periodes).length} periodes, ${Object.keys(payload.categories).length} regimes, ${Object.keys(payload.racines).length} racines, pangee=${Object.keys(payload.pangee).length ? 'oui' : 'non'}, extinction=${Object.keys(payload.extinction).length ? 'oui' : 'non'}`);
