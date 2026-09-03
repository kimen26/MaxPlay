// Genere le bundle UI d'une langue :
//   studio/dino/content/i18n/<lang>/ui.json -> site/js/i18n/dino-ui-strings.<lang>.js
// Frontiere DEC-GED-001 : le site ne lit jamais studio/, tout descend par ce generateur.
// Une cle absente de ui.json n'est PAS ecrite : dino-ui.js retombe alors sur le FR.
// Usage : node _gen-ui-bundle.cjs <lang>
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');
const lang = process.argv[2];
if (!lang) { console.error('usage: node _gen-ui-bundle.cjs <lang>'); process.exit(2); }

const src = path.join(ROOT, 'studio/dino/content/i18n', lang, 'ui.json');
const outDir = path.join(ROOT, 'site/js/i18n');
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `dino-ui-strings.${lang}.js`);

// Pas de ui.json : on ecrit quand meme un bundle VIDE. Sans lui, la page part
// chercher un fichier absent et le 404 pollue la console (et fait echouer la recette).
let data = {};
if (fs.existsSync(src)) {
  data = JSON.parse(fs.readFileSync(src, 'utf8'));
  delete data._meta;
} else {
  console.warn(`(pas de ${src} — bundle vide, la langue restera en FR)`);
}

fs.writeFileSync(out,
  `// GENERE par studio/dino/content/scripts/export/_gen-ui-bundle.cjs — ne pas editer a la main.\n` +
  `// Source : studio/dino/content/i18n/${lang}/ui.json\n` +
  `window.DINO_UI_STRINGS = ${JSON.stringify(data, null, 1)};\n`, 'utf8');
console.log(`${out} : ${Object.keys(data).length} cles`);
