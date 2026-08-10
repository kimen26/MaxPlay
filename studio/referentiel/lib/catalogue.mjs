// ─────────────────────────────────────────────────────────────────────────────
// catalogue.mjs — chargement et mise à plat du catalogue de contenu
//
// Rend une liste homogène d'ENTRÉES quel que soit leur type, plus la résolution
// des voix par rôle. Ne valide rien (c'est le travail de valider.mjs) et
// n'appelle aucune API.
// ─────────────────────────────────────────────────────────────────────────────
import path from 'node:path';
import { STUDIO, lireJson } from './socle.mjs';
import { HUMEUR, HUMEUR_INVITEE } from '../catalogue/fr/humeur.mjs';
import { REPLIQUES, LIEUX, LIGNES_NOMMEES, CONSIGNES_GENEREES } from '../catalogue/fr/repliques.mjs';
import { ATOMES, GABARITS } from '../catalogue/fr/atomes.mjs';
import { BRUITAGES } from '../catalogue/_bruitages.mjs';
import { ROLES, REGLAGES, TRAITEMENT, LANGUES_INVITEES } from '../catalogue/voix.mjs';

export { ROLES, REGLAGES, TRAITEMENT, LANGUES_INVITEES };

/** Au-delà, pré-générer un gabarit n'a plus de sens (§ règle de viabilité). */
export const PLAFOND_RENDUS = 60;

const CHEMIN_VOICE_MAP = path.join(
  STUDIO, 'narration', 'personnages', 'voix-meta', 'voice-map.json',
);

/**
 * Résolveur rôle → voice_id. Source unique et autoritaire : voice-map.json.
 * On ne recopie JAMAIS un voice_id dans le catalogue — il n'existe qu'ici, au
 * moment de fabriquer le plan de génération.
 */
export function chargerVoix() {
  const map = lireJson(CHEMIN_VOICE_MAP);
  if (!map || !map.voices) throw new Error(`voice-map.json illisible : ${CHEMIN_VOICE_MAP}`);
  const alias = map._alias || {};
  return (role) => map.voices[role] || map.voices[alias[role]] || null;
}

/**
 * Met à plat la réserve d'humeur : une entrée par (variante × voix), puisque
 * chaque variante existe dans les trois voix — c'est ce qui fait la variété.
 */
function aplatirHumeur(pool, langue, texteVerifie = false) {
  const entrees = [];
  for (const variante of pool.variantes) {
    for (const voix of pool.voix) {
      const dossier = langue === 'fr'
        ? `sounds/voix/${voix === 'narrateur_f' ? 'f' : voix === 'narrateur_h' ? 'h' : 'wex'}`
        : `sounds/voix/${langue}/${voix === 'narrateur_f' ? 'f' : voix === 'narrateur_h' ? 'h' : 'wex'}`;
      entrees.push({
        // La langue fait partie de la clé : elle est une DIMENSION du contenu.
        // Sans elle, « genial » (FR) et « ¡Genial! » (ES) se percutent — collision
        // relevée par valider.mjs au premier passage.
        cle: `${pool.cle}.${langue}.${variante.slug}.${voix}`,
        cle_pool: pool.cle,
        type: 'humeur',
        langue,
        i18n: pool.i18n,
        intention: pool.intention,
        slug: variante.slug,
        texte: variante.texte,
        translitteration: variante.translitteration || null,
        tags: variante.tags || [],
        texte_verifie: texteVerifie,
        production: { voix, usage: 'reaction' },
        fichier: `${dossier}/${variante.slug}.mp3`,
        consommee_par: pool.consommee_par || [],
      });
    }
  }
  return entrees;
}

/** Rend un gabarit : produit cartésien de ses trous → phrases entières. */
export function rendreGabarit(gabarit, atomes) {
  const noms = Object.keys(gabarit.trous);
  const domaines = noms.map((n) => atomes.filter((a) => a.famille === gabarit.trous[n]));
  if (domaines.some((d) => d.length === 0)) return [];

  let combinaisons = [[]];
  for (const domaine of domaines) {
    const suivant = [];
    for (const debut of combinaisons) for (const a of domaine) suivant.push([...debut, a]);
    combinaisons = suivant;
  }

  return combinaisons.map((combo) => {
    let texte = gabarit.patron;
    const ids = [];
    noms.forEach((nom, i) => {
      texte = texte.replace(`{${nom}}`, combo[i].texte);
      ids.push(combo[i].cle.split('.').pop());
    });
    // Une majuscule en tête si le premier trou a mangé la capitale du patron.
    texte = texte.charAt(0).toUpperCase() + texte.slice(1);
    return {
      cle: `${gabarit.cle}.${ids.join('-')}`,
      cle_gabarit: gabarit.cle,
      type: 'rendu',
      langue: gabarit.langue,
      i18n: 'traduction',
      texte,
      tags: gabarit.tags || [],
      texte_verifie: false,
      production: gabarit.production,
      fichier: `${gabarit.dossier}/${ids.join('-')}.mp3`,
      compose_de: combo.map((a) => a.cle),
    };
  });
}

/** Charge tout le catalogue, mis à plat, prêt à valider ou à planifier. */
export function chargerCatalogue() {
  const entrees = [];

  for (const pool of HUMEUR) entrees.push(...aplatirHumeur(pool, 'fr'));

  for (const invite of HUMEUR_INVITEE) {
    const pool = HUMEUR.find((p) => p.cle === invite.cle);
    if (!pool) continue;
    // Les pools invités ont été GÉNÉRÉS depuis ce catalogue le 2026-08-10 :
    // leur texte est donc prouvé, contrairement au FR hérité qui reste reconstruit.
    entrees.push(...aplatirHumeur(
      { ...pool, variantes: invite.variantes }, invite.langue, invite.genere === true,
    ));
  }

  entrees.push(...REPLIQUES.map((r) => ({ ...r, langue: 'fr' })));
  entrees.push(...CONSIGNES_GENEREES.map((r) => ({ ...r, langue: 'fr' })));
  entrees.push(...LIGNES_NOMMEES.map((r) => ({ ...r, langue: 'fr' })));
  entrees.push(...LIEUX.map((r) => ({ ...r, langue: 'fr' })));
  entrees.push(...ATOMES.map((a) => ({
    ...a, langue: 'fr', fichier: `sounds/atomes/${a.cle.split('.').slice(1).join('-')}.mp3`,
  })));
  entrees.push(...BRUITAGES.map((b) => ({ ...b, langue: null })));

  const rendus = [];
  for (const g of GABARITS) rendus.push(...rendreGabarit(g, ATOMES));
  entrees.push(...rendus);

  return { entrees, gabarits: GABARITS, pools: HUMEUR, poolsInvites: HUMEUR_INVITEE };
}
