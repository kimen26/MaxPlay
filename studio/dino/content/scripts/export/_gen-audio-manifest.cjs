#!/usr/bin/env node
// Régénère les Sets de site/js/dinos-audio-manifest.js en scannant les MP3 réels
// de site/audio/dinos/<lang>/. Le fichier se disait « GENERE » sans qu'aucun script
// ne le génère : la note disait « re-executer la commande du commit ». (2026-07-20)
//
// Usage : node studio/dino/content/scripts/export/_gen-audio-manifest.cjs
//
// Ne touche QUE les lignes de Sets — le reste du fichier (helpers playDinoNom /
// playDinoFunfact / playPeriode) est du code écrit à la main qu'on préserve tel quel.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../../..');
const AUDIO_DIR = path.join(ROOT, 'site', 'audio', 'dinos');
const MANIFEST = path.join(ROOT, 'site', 'js', 'dinos-audio-manifest.js');

// Un bloc = un suffixe de fichier ; chaque bloc a sa variable de Set dans le manifest.
// `sousDossier` optionnel : scanne audio/dinos/<lang>/<sousDossier>/ au lieu du plat
// (cas des périodes : <lang>/periodes/<slug>.mp3, slug = nom du fichier sans extension).
const BLOCS = [
  { suffixe: '.mp3', variable: 'DINO_NOM_AUDIO_BY_LANG', sousDossier: 'noms' },
  { suffixe: '-funfact.mp3', variable: 'DINO_FUNFACT_AUDIO_BY_LANG' },
  { suffixe: '.mp3', variable: 'DINO_PERIODE_AUDIO_BY_LANG', sousDossier: 'periodes' },
];

const langues = fs.readdirSync(AUDIO_DIR, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .sort();

let manifest = fs.readFileSync(MANIFEST, 'utf8');
let modifs = 0;

for (const { suffixe, variable, sousDossier } of BLOCS) {
  for (const lang of langues) {
    const dir = sousDossier ? path.join(AUDIO_DIR, lang, sousDossier) : path.join(AUDIO_DIR, lang);
    if (!fs.existsSync(dir)) continue; // langue sans ce sous-dossier : rien à écrire
    const ids = fs.readdirSync(dir)
      .filter(f => f.endsWith(suffixe))
      .map(f => f.slice(0, -suffixe.length))
      .sort();

    // Notation crochets si la langue n'est pas un identifiant JS valide (ex. pt-br).
    const acces = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(lang) ? `.${lang}` : `[${JSON.stringify(lang)}]`;
    const ligne = `window.${variable}${acces} = new Set(${JSON.stringify(ids)});`;
    const accesEchappe = acces.replace(/[.*+?^${}()[\]\\]/g, '\\$&');
    const motif = new RegExp(`^window\\.${variable}${accesEchappe} = new Set\\(.*\\);$`, 'm');

    if (motif.test(manifest)) {
      const avant = manifest;
      manifest = manifest.replace(motif, ligne);
      if (manifest !== avant) modifs++;
      console.log(`${variable}.${lang} : ${ids.length} ids`);
    } else if (ids.length > 0) {
      // Langue absente du manifest : insertion après la ligne d'init `window.<variable> = {};`
      const ancre = new RegExp(`^window\\.${variable} = \\{\\};$`, 'm');
      if (!ancre.test(manifest)) { console.log(`${variable}.${lang} : ANCRE INTROUVABLE, à ajouter à la main`); continue; }
      manifest = manifest.replace(ancre, (m) => `${m}\n${ligne}`);
      modifs++;
      console.log(`${variable}.${lang} : ${ids.length} ids (inséré)`);
    }
  }
}

fs.writeFileSync(MANIFEST, manifest);
console.log(`\n${modifs} ligne(s) mise(s) à jour dans ${path.relative(ROOT, MANIFEST)}`);

// Passe de nettoyage : supprime les lignes de Set dont la langue n'existe plus sur
// le disque (ex. es remplacé par es-es/es-mx le 2026-08-11 — sans ça la ligne
// survivait et la langue 404ait). Ajouté le 2026-08-11.
{
  let manifestNet = fs.readFileSync(MANIFEST, 'utf8');
  let suppr = 0;
  for (const { variable } of BLOCS) {
    const motifLigne = new RegExp(`^window\\.${variable}(?:\\.([A-Za-z_$][A-Za-z0-9_$]*)|\\["([^"]+)"\\]) = new Set\\(.*\\);$`, 'gm');
    manifestNet = manifestNet.replace(motifLigne, (ligne, ident, crochet) => {
      const lang = ident || crochet;
      if (langues.includes(lang)) return ligne;
      suppr++;
      console.log(`${variable}.${lang} : SUPPRIMÉ (langue absente du disque)`);
      return '';
    });
  }
  // Compacte les lignes vides créées par les suppressions
  manifestNet = manifestNet.replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(MANIFEST, manifestNet);
  if (suppr) console.log(`${suppr} ligne(s) obsolète(s) supprimée(s)`);
}
