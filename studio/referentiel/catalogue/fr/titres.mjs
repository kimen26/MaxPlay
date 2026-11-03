// ─────────────────────────────────────────────────────────────────────────────
// titres.mjs — le titre de chaque jeu, DIT au toucher d'une carte de l'accueil
// (site/js/titre-jeu.js, PY 2026-11-03 : Max a 4 ans, il ne lit pas).
//
// Type `replique`, une entrée par (jeu × langue fr/en). AUCUN texte recopié ici :
//   · FR : `titreParle` s'il existe dans site/js/catalog.js, sinon `titre`
//     (champ optionnel : à renseigner si un titre contient un id technique ou un emoji) ;
//   · EN : `titreParle` puis `titre` du pack studio/minijeux/i18n/en/strings.json.
// Un jeu sans titre EN n'a pas d'entrée EN (le site dit alors rien plutôt que du français).
//
// Fichier : sounds/voix/<lang>/titres/<id-jeu>.mp3 (le site retombe sur le TTS
// navigateur tant qu'il n'existe pas). Voix narrateur_h, eleven_v3, padding 250 ms.
// texte_verifie: false : les MP3 n'existent pas encore.
// Jeux couverts = ceux qui ont une case à thème (`armoire`) et ne sont pas retirés.
// ─────────────────────────────────────────────────────────────────────────────
import path from 'node:path';
import vm from 'node:vm';
import { SITE, STUDIO, lireJson, lireTexte } from '../../lib/socle.mjs';

const LANGUES = ['fr', 'en'];

function lireCatalogue() {
  const bac = { window: {} };
  vm.createContext(bac);
  vm.runInContext(lireTexte(path.join(SITE, 'js', 'catalog.js')), bac);
  return bac.window.MAXPLAY_CATALOG.filter((e) => e.armoire && !e.retire);
}

function titreDit(jeu, lang, packEn) {
  if (lang === 'fr') return jeu.titreParle || jeu.titre;
  const p = packEn[jeu.id];
  return p ? (p.titreParle || p.titre) : null;
}

const packEn = lireJson(path.join(STUDIO, 'minijeux', 'i18n', 'en', 'strings.json')) || {};

export const TITRES_JEUX = lireCatalogue().flatMap((jeu) => LANGUES.map((lang) => {
  const texte = titreDit(jeu, lang, packEn);
  if (!texte) return null;
  return {
    cle: `jeu.titre.${lang}.${jeu.id}`,
    type: 'replique',
    i18n: 'traduction',
    langue: lang,
    slug: jeu.id,
    texte,
    tags: ['warmly'],
    origine_texte: 'catalogue',
    texte_verifie: false,
    production: { voix: 'narrateur_h', usage: 'replique' },
    fichier: `sounds/voix/${lang}/titres/${jeu.id}.mp3`,
    consommee_par: ['index.html (armoire, titre-jeu.js)'],
  };
})).filter(Boolean);
