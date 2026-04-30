// Script de génération idfm.js avec champs family + known
// Exécuter : node temp/gen-idfm.js

const fs = require('fs');
const path = require('path');

// ─── Lire le fichier source ───
const srcPath = path.join(__dirname, '../game-html/js/idfm.js');
const src = fs.readFileSync(srcPath, 'utf8');

// Extraire le tableau JSON brut (entre [ et ] du const IDFM_REFERENTIEL)
const match = src.match(/const IDFM_REFERENTIEL\s*=\s*(\[[\s\S]*?\]);/);
if (!match) { console.error('Tableau IDFM_REFERENTIEL introuvable'); process.exit(1); }
const data = JSON.parse(match[1]);
console.log(`Lignes parsées : ${data.length}`);

// ─── Listes couleurs par famille ───
const FAMILY_COLORS = {
  bleu:          ['#0064B1','#006EB8','#000091','#216EB4','#0055C8','#5291CE','#0064B0','#6EC4E8','#99D4D8','#5B9BD5'],
  vert:          ['#008C59','#75CE89','#6ECA97','#007852','#00814F','#006633','#00A092'],
  orange_jaune:  ['#F58443','#DCAC27','#C2A000','#CEC92A','#9B9839','#FFCD00','#FFCE00','#F4C932','#E3B32A','#FF7E2E','#F28E42','#C9910D','#9F9825','#FFBE00','#FFBE02','#FFCD02','#FFC107'],
  violet_rose:   ['#652C90','#B43C95','#C9A2CD','#FF82B4','#FA9ABA','#9C27B0','#62259D','#662483','#C5A3CD','#C04191','#E91E63'],
  rouge:         ['#E3051C','#A50034','#B90845'],
  brun:          ['#8D653A','#704B1C','#8D5E2A'],
};

// Map couleur → famille (insensible à la casse)
const colorToFamily = {};
for (const [fam, colors] of Object.entries(FAMILY_COLORS)) {
  for (const c of colors) {
    colorToFamily[c.toUpperCase()] = fam;
  }
}

// ─── Fallback HSL ───
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1,3), 16) / 255;
  let g = parseInt(hex.slice(3,5), 16) / 255;
  let b = parseInt(hex.slice(5,7), 16) / 255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0)
        : max === g ? (b - r) / d + 2
        : (r - g) / d + 4;
  return [h * 60, s * 100, l * 100];
}

function getFamilyByHsl(hex) {
  const [h, s, l] = hexToHsl(hex);
  if (s < 15) return 'brun';
  if (h >= 20 && h < 55 && l < 42) return 'brun';
  if (l < 16) return 'brun';
  if ((h >= 320 || h < 10) && l < 48) return 'rouge';
  if (h < 20) return 'rouge';
  if (h < 55) return 'orange_jaune';
  if (h < 80) return 'orange_jaune';
  if (h < 175) return 'vert';
  if (h < 265) return 'bleu';   // cyan et bleu ensemble
  if (h < 355) return 'violet_rose';
  return 'rouge';
}

function getFamily(hex) {
  const key = hex.toUpperCase();
  if (colorToFamily[key]) return colorToFamily[key];
  return getFamilyByHsl(hex);
}

// ─── Lignes known de Max (type bus uniquement dans idfm.js) ───
const KNOWN_NUMS = new Set([
  '47','125','131','132','162','172','180','184','185','186',
  '286','323','380','2234','N15','N22',
  'V2','V3','V4','V5','V6','V7','TVM'
]);

// ─── Enrichissement ───
const counts = { bleu:0, vert:0, orange_jaune:0, violet_rose:0, rouge:0, brun:0, undefined:0 };
let knownCount = 0;
let undefinedFamilies = [];

const enriched = data.map(entry => {
  const family = getFamily(entry.color);
  const known = KNOWN_NUMS.has(entry.num);
  if (!family) {
    counts['undefined']++;
    undefinedFamilies.push(entry);
  } else {
    counts[family] = (counts[family] || 0) + 1;
  }
  if (known) knownCount++;
  return { ...entry, family, known };
});

// ─── Rapport ───
console.log('\nRépartition par famille :');
for (const [fam, n] of Object.entries(counts)) console.log(`  ${fam}: ${n}`);
console.log(`\nknown=true : ${knownCount}`);
if (undefinedFamilies.length > 0) {
  console.warn('\nATTENTION — family undefined pour :');
  undefinedFamilies.forEach(e => console.warn(`  num=${e.num} color=${e.color}`));
}

// ─── Génération du fichier ───
const lines = enriched.map(e => {
  const known = e.known ? 'true' : 'false';
  return `  { num:${JSON.stringify(e.num)}, color:${JSON.stringify(e.color)}, textColor:${JSON.stringify(e.textColor)}, type:${JSON.stringify(e.type)}, family:${JSON.stringify(e.family)}, known:${known} }`;
});

const output = `// ─── IDFM Référentiel complet — ${enriched.length} lignes Île-de-France ───
// Généré depuis docs/ratp-colors.json
// Champs : num, color, textColor, type, family, known
const IDFM_REFERENTIEL = [
${lines.join(',\n')}
];
`;

const destPath = path.join(__dirname, '../game-html/js/idfm.js');
fs.writeFileSync(destPath, output, 'utf8');
console.log(`\nFichier écrit : ${destPath} (${enriched.length} lignes)`);
