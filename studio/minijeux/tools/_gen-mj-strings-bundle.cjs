// _gen-mj-strings-bundle.cjs — genere le pack de chaines d'une langue :
//   studio/minijeux/i18n/<lang>/strings.json -> site/js/i18n/mj-strings.<lang>.js
// Miroir de studio/dino/content/scripts/export/_gen-ui-bundle.cjs.
// Une cle absente du strings.json n'est PAS ecrite : mj-i18n.js retombe alors sur le FR
// (repli assume, jamais de trou — principe HO-MJ-02).
// Usage : node _gen-mj-strings-bundle.cjs <lang>
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../..');
const lang = process.argv[2];
if (!lang) { console.error('usage: node _gen-mj-strings-bundle.cjs <lang>'); process.exit(2); }

const src = path.join(ROOT, 'studio/minijeux/i18n', lang, 'strings.json');
const outDir = path.join(ROOT, 'site/js/i18n');
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `mj-strings.${lang}.js`);

let data = {};
if (fs.existsSync(src)) {
  data = JSON.parse(fs.readFileSync(src, 'utf8'));
} else {
  console.warn(`(pas de ${src} — bundle vide, la langue restera en FR)`);
}

fs.writeFileSync(out,
  `// GENERE par studio/minijeux/tools/_gen-mj-strings-bundle.cjs — ne pas editer a la main.\n` +
  `// Source : studio/minijeux/i18n/${lang}/strings.json\n` +
  `window.MJ_STRINGS = ${JSON.stringify(data, null, 1)};\n`, 'utf8');
console.log(`${out} : ${Object.keys(data).length} jeux`);
