// ─────────────────────────────────────────────────────────────────────────────
// scan-dino.mjs — inventaire du domaine DINO pour le référentiel de contenu
//
// Rôle CATALOGUE (décision Q1) : dinos-data.js reste le maître des faits, ce
// scanner ne fait que pointer vers lui, déclarer le contrat de chaque bloc,
// tracer la lignée (script EL → MP3 → Lunii) et détecter les écarts.
//
// Deux détections, qui n'attrapent PAS la même chose :
//   1. DÉRIVE DE FAIT — le bloc « taille » a un générateur déterministe
//      (_statsPhrase). On compare fait par fait le texte parlé au texte calculé.
//      Fiable, rétroactif, indépendant des dates.
//   2. AUDIO EN RETARD — le MP3 est plus ancien que le script qui le produit.
//      Attrape « le script a été corrigé, l'audio n'a pas été refait ».
//
// Les blocs réécrits à la main (nom/régime/funfact/récap) ne sont pas vérifiables
// rétroactivement : on pose leur empreinte de référence pour que le Lot 1 détecte
// les changements À VENIR. C'est la façon normale d'enrôler un corpus existant.
// ─────────────────────────────────────────────────────────────────────────────
import path from 'node:path';
import {
  SITE, STUDIO, chargerDinos, empreinteChamps, existe, dateFichier,
  lireJson, texteDuSegment, relatif, datesDeCommit,
} from './lib/socle.mjs';
import { comparerRepere, segmenterParDimension } from './lib/reperes.mjs';

/** Blocs d'une fiche dino et champs de dinos-data.js dont CHACUN dépend réellement. */
const BLOCS = {
  nom: ['name', 'full', 'nom_etym'],
  taille: ['taille_m', 'hauteur_m', 'poids_t', 'taille_vol', 'comp_taille', 'comp_hauteur', 'comp_poids'],
  regime: ['cat', 'regime', 'proies', 'chasseurs', 'amis'],
  funfact: ['superpower', 'fait'],
  recap: ['name', 'full', 'epoque', 'region', 'taille_m', 'hauteur_m', 'poids_t',
    'regime', 'proies', 'superpower', 'fait'],
};

const cheminEl = (id, bloc) =>
  path.join(STUDIO, 'dino', 'content', 'scripts-audio', 'fr', 'V3', 'json', `_seg-${id}-${bloc}.json`);
const cheminMp3 = (id, bloc) => path.join(SITE, 'audio', 'dinos', 'fr', `${id}-${bloc}.mp3`);
const cheminLunii = (id) => path.join(STUDIO, 'lunii', 'assets', 'audio', 'recits-dino', `${id}.mp3`);

/**
 * Vérifie que le texte parlé du bloc « taille » compare l'animal aux MÊMES
 * repères que dinos-data.js aujourd'hui.
 *
 * On compare les repères, pas les phrases : le texte ElevenLabs est réécrit, et
 * « comme un grand 4×4 » vaut « aussi long qu'un grand 4×4 ». Seul un changement
 * de repère (« au nombril » pour « aux fesses », « 3 hippopotames » pour
 * « 4 rhinocéros ») change ce que l'enfant entend.
 */
function verifierFaitsTaille(dino, texteParle) {
  const parDimension = segmenterParDimension(texteParle);
  const attendus = [
    { dimension: 'longueur', valeur: dino.comp_taille },
    { dimension: 'hauteur', valeur: dino.comp_hauteur },
    { dimension: 'poids', valeur: dino.comp_poids },
  ];
  const ecarts = [];
  for (const { dimension, valeur } of attendus) {
    if (!valeur) continue;
    const r = comparerRepere(dimension, valeur, parDimension[dimension]);
    if (r.verdict === 'derive') {
      ecarts.push({ fait: `repère de ${dimension}`, attendu: r.attendu, dit: r.dit });
    }
  }
  return ecarts;
}

/** Construit les entrées de registre du domaine DINO. */
export function scannerDino() {
  const { DINOS } = chargerDinos();
  const dates = datesDeCommit([
    'studio/dino/content/scripts-audio',
    'site/audio/dinos',
    'studio/lunii/assets/audio',
  ]);
  const dateContenu = (chemin) => dates.get(relatif(chemin)) || null;
  const entrees = [];

  for (const dino of DINOS) {
    for (const [bloc, champs] of Object.entries(BLOCS)) {
      const el = cheminEl(dino.id, bloc);
      const mp3 = cheminMp3(dino.id, bloc);
      const lunii = cheminLunii(dino.id);

      const segment = existe(el) ? lireJson(el) : null;
      const texteParle = segment ? texteDuSegment(segment) : '';

      // 1. dérive de fait (bloc « taille » seulement : c'est le seul à générateur)
      let ecarts = [];
      let verifiable = false;
      if (bloc === 'taille' && texteParle) {
        verifiable = true;
        ecarts = verifierFaitsTaille(dino, texteParle);
      }

      // 2. audio en retard sur son script (dates de COMMIT, pas dates de fichiers)
      const dEl = dateContenu(el);
      const dMp3 = dateContenu(mp3);
      const audioEnRetard = Boolean(dEl && dMp3 && dMp3 < dEl);

      // 3. complétude du contrat
      // Le récap n'a PAS de script propre : il est concaténé depuis les quatre
      // autres blocs (content/scripts/audio/_gen-recaps.sh). Réclamer un script
      // pour lui inventerait 70 manques qui n'en sont pas.
      const parConcatenation = bloc === 'recap';
      const manquants = [];
      if (!parConcatenation && !existe(el)) manquants.push('el');
      if (!existe(mp3)) manquants.push('mp3');

      let etat = 'a-jour';
      if (ecarts.length) etat = 'derive';
      else if (audioEnRetard) etat = 'audio-en-retard';
      else if (manquants.length) etat = 'manquant';

      entrees.push({
        cle: `dino.${dino.id}.${bloc}`,
        domaine: 'dino',
        role: 'catalogue',
        source: 'site/js/dinos-data.js',
        depend_de: champs,
        empreinte_source: empreinteChamps(dino, champs),
        contrat: {
          ecran: 'requis',
          tts: 'derive',                                    // recomposé inline aujourd'hui — Lot 2
          el: parConcatenation ? 'concatenation' : 'reecrit', // réécriture éditoriale assumée
          mp3: 'requis',
          lunii: parConcatenation ? 'herite' : 'na',
          langues: ['fr'],
        },
        derive_de: parConcatenation
          ? Object.keys(BLOCS).filter((b) => b !== 'recap').map((b) => `dino.${dino.id}.${b}`)
          : [],
        lignee: {
          el: existe(el) ? { fichier: relatif(el), produit: dateFichier(el) } : null,
          mp3: existe(mp3) ? { fichier: relatif(mp3), produit: dateFichier(mp3) } : null,
          lunii: existe(lunii) ? { fichier: relatif(lunii), produit: dateFichier(lunii) } : null,
        },
        verifiable,
        etat,
        ecarts,
        manquants,
        audio_en_retard: audioEnRetard,
        modifie_el: dEl,
        modifie_mp3: dMp3,
      });
    }
  }

  return entrees;
}

/** Orphelins : artefacts audio dino qu'aucune clé du registre ne réclame. */
export function orphelinsDino(entrees) {
  const attendus = new Set();
  for (const e of entrees) {
    if (e.lignee.el) attendus.add(e.lignee.el);
    if (e.lignee.mp3) attendus.add(e.lignee.mp3);
  }
  return { attendus };
}
