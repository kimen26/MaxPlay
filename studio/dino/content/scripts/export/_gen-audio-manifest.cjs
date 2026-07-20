#!/usr/bin/env node
// Régénère les Sets de site/js/dinos-audio-manifest.js en scannant les MP3 réels
// de site/audio/dinos/<lang>/. Le fichier se disait « GENERE » sans qu'aucun script
// ne le génère : la note disait « re-executer la commande du commit ». (2026-07-20)
//
// Usage : node studio/dino/content/scripts/export/_gen-audio-manifest.cjs
//
// Ne touche QUE les deux lignes de Sets — le reste du fichier (helpers playDinoNom /
// playDinoFunfact) est du code écrit à la main qu'on préserve tel quel.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../../..');
const AUDIO_DIR = path.join(ROOT, 'site', 'audio', 'dinos');
const MANIFEST = path.join(ROOT, 'site', 'js', 'dinos-audio-manifest.js');

// Un bloc = un suffixe de fichier ; chaque bloc a sa variable de Set dans le manifest.
const BLOCS = [
  { suffixe: '-nom.mp3', variable: 'DINO_NOM_AUDIO_BY_LANG' },
  { suffixe: '-funfact.mp3', variable: 'DINO_FUNFACT_AUDIO_BY_LANG' },
];

const langues = fs.readdirSync(AUDIO_DIR, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .sort();

let manifest = fs.readFileSync(MANIFEST, 'utf8');
let modifs = 0;

for (const { suffixe, variable } of BLOCS) {
  for (const lang of langues) {
    const ids = fs.readdirSync(path.join(AUDIO_DIR, lang))
      .filter(f => f.endsWith(suffixe))
      .map(f => f.slice(0, -suffixe.length))
      .sort();

    const ligne = `window.${variable}.${lang} = new Set(${JSON.stringify(ids)});`;
    const motif = new RegExp(`^window\\.${variable}\\.${lang} = new Set\\(.*\\);$`, 'm');

    if (motif.test(manifest)) {
      const avant = manifest;
      manifest = manifest.replace(motif, ligne);
      if (manifest !== avant) modifs++;
      console.log(`${variable}.${lang} : ${ids.length} ids`);
    } else {
      console.log(`${variable}.${lang} : ABSENT du manifest, à ajouter à la main`);
    }
  }
}

fs.writeFileSync(MANIFEST, manifest);
console.log(`\n${modifs} ligne(s) mise(s) à jour dans ${path.relative(ROOT, MANIFEST)}`);
