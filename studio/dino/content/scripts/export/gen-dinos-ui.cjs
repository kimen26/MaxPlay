#!/usr/bin/env node
// gen-dinos-ui.cjs — génère site/js/gen/dinos-ui.js (window.DINO_EXTRAS, window.DINO_AUDIO,
// window.DINO_AUDIO_VERSION) à partir du disque, sur le modèle de gen-dinos-assets.mjs.
//
// Remplace les 3 maps littérales tenues à la main dans site/dev-dinos.html — cause racine
// de l'oubli du Scélidosaure (absent des 3 tables alors que ses 5 MP3 + 9 images existaient,
// corrigé à la main le 2026-09-27, commit 5dab25fb). R03, vague 3 process militaire.
//
// Sources :
//   - studio/dino/content/dinos/<id>.json (liste des ids + `png` = base des fichiers image)
//   - site/img/dinos/paleoart/<Base>_{headshot,manger,paris,ecosysteme,funfact}.{webp,jpg}
//   - site/audio/dinos/fr/<id>-{nom,taille,regime,funfact,recap}.mp3
//
// Usage :
//   node studio/dino/content/scripts/export/gen-dinos-ui.cjs           → écrit le fichier
//   node studio/dino/content/scripts/export/gen-dinos-ui.cjs --check   → exit 1 si périmé
//
// À relancer après tout ajout/suppression d'image paléoart ou de MP3 dino.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../../..');
const SITE = path.join(ROOT, 'site');
const DINOS_DIR = path.join(ROOT, 'studio/dino/content/dinos');
const PALEOART_DIR = path.join(SITE, 'img/dinos/paleoart');
const AUDIO_DIR = path.join(SITE, 'audio/dinos/fr');
const OUT_PATH = path.join(SITE, 'js/gen/dinos-ui.js');

// ── Exceptions non dérivables du disque (éditoriales, documentées ici) ──────────────
// Maiasaura = seule fiche au label féminin (« Maiasaura » = « bonne mère lézard »,
// convention éditoriale FR) — rien sur le disque ne porte le genre grammatical.
const LABEL_FEMININ = new Set(['maiasaura']);
// Albertosaure = seule fiche réécrite en V4 (EP-D-29, pilote 2026-08-19) — aucun marqueur
// de version n'existe dans les .md scripts-audio/fr/V3/*.md (la spec R03 prévoyait un
// marqueur « > version: » à lire dans l'en-tête ; il n'existe sur AUCUN fichier à ce jour).
// Défaut V3 pour tout le reste, tel que dans la table à la main d'origine.
const VERSION_OVERRIDE = { albertosaurus: 'V4' };
// Amargasaurus = seul dino avec 2 scènes hypothèse (épines nues / voile de peau, débat
// scientifique réel sur sa fonction) EN PLUS des 5 scènes standard. Les fichiers portent
// un suffixe `hypo-*` non standard ; labels éditoriaux non dérivables du nom de fichier.
const SCENES_SUPPLEMENTAIRES = {
  amargasaurus: [
    { suffix: 'hypo-epines', label: 'Peut-être des piques…' },
    { suffix: 'hypo-voile', label: '…ou une voile colorée ?' },
  ],
};

const has = (p) => fs.existsSync(p);
const paleoartFile = (base, suffix) => {
  const webp = path.join(PALEOART_DIR, `${base}_${suffix}.webp`);
  const jpg = path.join(PALEOART_DIR, `${base}_${suffix}.jpg`);
  if (has(webp)) return `${base}_${suffix}.webp`;
  if (has(jpg)) return `${base}_${suffix}.jpg`;
  return null;
};

// ── charge les ids + base image (champ png, comme gen-dinos-assets.mjs) ────────────
const dinoFiles = fs.readdirSync(DINOS_DIR).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
const dinos = dinoFiles
  .map((f) => JSON.parse(fs.readFileSync(path.join(DINOS_DIR, f), 'utf8')))
  .map((d) => ({ id: d.id, base: d.png ? d.png.replace(/\.(jpg|jpeg|webp|png)$/i, '') : d.id.charAt(0).toUpperCase() + d.id.slice(1) }))
  .sort((a, b) => a.id.localeCompare(b.id));

// ── DINO_EXTRAS : scènes paléoart par dino (headshot optionnel + 4 scènes) ─────────
const SCENES = [
  { suffix: 'headshot', label: 'Gros plan' },
  { suffix: 'manger', label: (id) => (LABEL_FEMININ.has(id) ? "Ce qu'elle mange" : "Ce qu'il mange") },
  { suffix: 'paris', label: 'Dans Paris !' },
  { suffix: 'ecosysteme', label: 'Son monde' },
  { suffix: 'funfact', label: 'Le savais-tu ?' },
];

const dinoExtras = {};
for (const { id, base } of dinos) {
  const scenes = [];
  for (const s of SCENES) {
    const file = paleoartFile(base, s.suffix);
    if (file) {
      const label = typeof s.label === 'function' ? s.label(id) : s.label;
      scenes.push({ folder: 'paleoart', file, label });
    }
    // Scènes supplémentaires nommées insérées juste après le headshot (ordre observé
    // dans la table à la main d'origine, ex. Amargasaurus hypo-epines/hypo-voile).
    if (s.suffix === 'headshot' && SCENES_SUPPLEMENTAIRES[id]) {
      for (const extra of SCENES_SUPPLEMENTAIRES[id]) {
        const extraFile = paleoartFile(base, extra.suffix);
        if (extraFile) scenes.push({ folder: 'paleoart', file: extraFile, label: extra.label });
      }
    }
  }
  if (scenes.length) dinoExtras[id] = scenes;
}

// ── DINO_AUDIO : dino avec les 5 MP3 fr présents (nom/taille/regime/funfact/recap) ─
// `_audioSet` était définie à la main dans dev-dinos.html (l.2388) ; elle vit maintenant
// ici, seul point qui la génère, puisque DINO_AUDIO en dépend et doit être autosuffisant
// (chargé avant le script inline de dev-dinos.html).
const BLOCS4 = ['nom', 'taille', 'regime', 'funfact'];
const audioFiles = has(AUDIO_DIR) ? new Set(fs.readdirSync(AUDIO_DIR)) : new Set();
const dinoAudioIds = [];
for (const { id } of dinos) {
  const complet = [...BLOCS4, 'recap'].every((b) => audioFiles.has(`${id}-${b}.mp3`));
  if (complet) dinoAudioIds.push(id);
}

// ── DINO_AUDIO_VERSION : V3 par défaut pour tout dino dans DINO_AUDIO, override nommé ─
const dinoAudioVersion = {};
for (const id of dinoAudioIds) dinoAudioVersion[id] = VERSION_OVERRIDE[id] || 'V3';

// ── rendu (même style littéral que dinos-assets.js, une ligne par entrée pour un diff lisible) ─
function renderExtras() {
  const lines = ['const DINO_EXTRAS = {'];
  for (const [id, scenes] of Object.entries(dinoExtras)) {
    lines.push(`  ${id}:[`);
    for (const sc of scenes) {
      const labelJs = sc.label.replace(/'/g, "\\'");
      lines.push(`    {folder:'${sc.folder}',file:'${sc.file}',label:'${labelJs}'},`);
    }
    lines.push('  ],');
  }
  lines.push('};');
  return lines.join('\n');
}

function renderAudio() {
  const lines = ['const DINO_AUDIO = {'];
  for (const id of dinoAudioIds) lines.push(`  ${id}: _audioSet('${id}'),`);
  lines.push('};');
  return lines.join('\n');
}

function renderAudioVersion() {
  const lines = ['const DINO_AUDIO_VERSION = {'];
  for (const [id, v] of Object.entries(dinoAudioVersion)) lines.push(`  ${id}: '${v}',`);
  lines.push('};');
  return lines.join('\n');
}

const AUDIO_SET_FN = "function _audioSet(id) {\n"
  + "  const o = { recap: window.AUDIO_DINOS + '' + id + '-recap.mp3' };\n"
  + "  ['nom','taille','regime','funfact'].forEach(b => { o[b] = window.AUDIO_DINOS + '' + id + '-' + b + '.mp3'; });\n"
  + "  return o;\n"
  + "}\n";

const out = '// dinos-ui.js — GÉNÉRÉ par studio/dino/content/scripts/export/gen-dinos-ui.cjs — NE PAS ÉDITER À LA MAIN.\n'
  + '// DINO_EXTRAS (scènes paléoart par dino) + DINO_AUDIO (dinos avec 5 MP3 fr) + DINO_AUDIO_VERSION\n'
  + '// (texte V3 par défaut, override nommé pour les rares réécritures). R03, vague 3 process militaire —\n'
  + "// remplace les 3 maps tenues à la main dans dev-dinos.html (cause racine de l'oubli du Scélidosaure).\n"
  + '// Régénérer après tout ajout/suppression d\'image paléoart ou de MP3 dino : node studio/dino/content/scripts/export/gen-dinos-ui.cjs\n'
  + '// `_audioSet` (ex-dev-dinos.html l.2388) vit ici : DINO_AUDIO en dépend et ce fichier doit être\n'
  + '// autosuffisant, chargé AVANT le script inline de dev-dinos.html.\n\n'
  + AUDIO_SET_FN + '\n'
  + renderExtras() + '\n'
  + renderAudio() + '\n'
  + renderAudioVersion() + '\n'
  + 'window.DINO_EXTRAS = DINO_EXTRAS;\n'
  + 'window.DINO_AUDIO = DINO_AUDIO;\n'
  + 'window.DINO_AUDIO_VERSION = DINO_AUDIO_VERSION;\n';

const CHECK = process.argv.includes('--check');
if (CHECK) {
  const before = has(OUT_PATH) ? fs.readFileSync(OUT_PATH, 'utf8') : null;
  if (before !== out) {
    console.error('✗ dinos-ui.js : sortie différente du fichier commité — lancer `npm run build`.');
    process.exit(1);
  }
  console.log('✓ dinos-ui.js à jour.');
} else {
  fs.writeFileSync(OUT_PATH, out);
  console.log(`→ site/js/gen/dinos-ui.js écrit (DINO_EXTRAS: ${Object.keys(dinoExtras).length}, DINO_AUDIO: ${dinoAudioIds.length} ids).`);
}
