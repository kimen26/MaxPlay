// ─────────────────────────────────────────────────────────────────────────────
// reperes.mjs — identification du REPÈRE d'une comparaison de taille
//
// Pourquoi ne pas comparer les phrases : le texte ElevenLabs est une RÉÉCRITURE
// éditoriale assumée (décision Papa Yann). « comme un grand 4×4 » et « aussi long
// qu'un grand 4×4 » disent le même fait avec deux tournures — ce n'est PAS une
// dérive, et le signaler ferait fuir tout le monde du tableau de bord.
//
// Ce qui compte, c'est le REPÈRE : l'objet auquel on compare l'animal, et son
// nombre. « aux fesses » contre « au nombril », ou « 3 hippopotames » contre
// « 4 rhinocéros », voilà de vraies dérives — le fait énoncé à l'enfant a changé.
//
// Même technique que content/scripts/export/_verif-comppoids.cjs, étendue aux
// trois dimensions. Tables ordonnées : le motif le plus spécifique d'abord.
// ─────────────────────────────────────────────────────────────────────────────
import { normaliser } from './socle.mjs';

const LONGUEUR = [
  [/bus accordéon et un bus/i, 'bus accordéon + bus'],
  [/deux bus/i, '2 bus'],
  [/bus accordéon/i, 'bus accordéon'],
  [/bus/i, 'bus'],
  [/camion/i, 'camion'],
  [/deux voitures/i, '2 voitures'],
  [/rue à deux voies/i, 'rue à deux voies'],
  [/4\s*[×x]\s*4/i, 'grand 4x4'],
  [/petite voiture/i, 'petite voiture'],
  [/enfants de 4 ans allongés|trois enfants/i, '3 enfants allongés'],
  [/moto/i, 'moto'],
  [/papa allongé|grand papa/i, 'Papa allongé'],
  [/vélo/i, 'vélo'],
  [/labrador|grand chien/i, 'grand chien'],
  [/gros chat/i, 'gros chat'],
  [/poulet/i, 'poulet'],
];

const HAUTEUR = [
  [/immeuble de (\d+) étages/i, 'immeuble N étages'],
  [/immeuble de trois étages/i, 'immeuble 3 étages'],
  [/lampadaire/i, 'lampadaire'],
  [/trois papas/i, '3 Papas'],
  [/bus anglais/i, 'bus anglais'],
  [/deux papas/i, '2 Papas'],
  [/panier de basket/i, 'panier de basket'],
  [/but de foot/i, 'but de foot'],
  [/épaules/i, 'épaules de Papa'],
  [/porte/i, 'porte'],
  [/papa debout|aussi grand que papa/i, 'Papa debout'],
  [/voiture/i, 'voiture'],
  [/enfant de 4 ans/i, 'enfant de 4 ans'],
  [/nombril/i, 'nombril'],
  [/fesses/i, 'fesses'],
  [/genoux/i, 'genoux'],
];

// Poids : le nombre fait partie du repère (3 hippopotames ≠ 4 rhinocéros).
const POIDS = [
  [/petite voiture et une vache/i, 'petite voiture + vache'],
  [/hippopotame et un cheval/i, 'hippopotame + cheval'],
  [/éléphant et un rhinocéros/i, 'éléphant + rhinocéros'],
  [/(\d+) éléphants/i, 'éléphants'],
  [/un éléphant/i, '1 éléphant'],
  [/(\d+) hippopotames/i, 'hippopotames'],
  [/un hippopotame/i, '1 hippopotame'],
  [/(\d+) rhinocéros/i, 'rhinocéros'],
  [/un rhinocéros/i, '1 rhinocéros'],
  [/(\d+) chevaux/i, 'chevaux'],
  [/un cheval/i, '1 cheval'],
  [/(\d+) ânes/i, 'ânes'],
  [/un âne/i, '1 âne'],
  [/(\d+) lions/i, 'lions'],
  [/un lion/i, '1 lion'],
  [/petite voiture/i, 'petite voiture'],
  [/une vache/i, 'vache'],
  [/un tigre/i, 'tigre'],
  [/un cochon/i, 'cochon'],
  [/que papa/i, 'Papa'],
  [/un kangourou/i, 'kangourou'],
  [/un loup/i, 'loup'],
  [/enfant de 10 ans/i, 'enfant de 10 ans'],
  [/un chien/i, 'chien'],
  [/un enfant de 4 ans/i, 'enfant de 4 ans'],
  [/un gros chat/i, 'gros chat'],
  [/petit oiseau/i, 'petit oiseau'],
];

const TABLES = { longueur: LONGUEUR, hauteur: HAUTEUR, poids: POIDS };

/**
 * Marqueurs qui rattachent une phrase à une dimension.
 *
 * Indispensable : un bloc « taille » énonce les trois mesures à la suite. Chercher
 * le repère de HAUTEUR dans tout le texte attraperait « petite voiture » venue de
 * la phrase de LONGUEUR, et inventerait une dérive qui n'existe pas.
 */
const MARQUEURS = {
  longueur: /de long|d'un bout à l'autre|mesurait|de longueur/i,
  hauteur: /de haut|debout|t'arrivait|aussi grand|aussi haut|de hauteur/i,
  poids: /kilos?\b|pesait|lourd|léger/i,
};

/** Découpe le texte parlé et rend, par dimension, les seules phrases concernées. */
export function segmenterParDimension(texteParle) {
  const phrases = normaliser(texteParle).split(/(?<=[.!?])\s+/).filter(Boolean);
  const parDimension = { longueur: [], hauteur: [], poids: [] };
  for (const phrase of phrases) {
    for (const [dimension, marqueur] of Object.entries(MARQUEURS)) {
      if (marqueur.test(phrase)) parDimension[dimension].push(phrase);
    }
  }
  return {
    longueur: parDimension.longueur.join(' '),
    hauteur: parDimension.hauteur.join(' '),
    poids: parDimension.poids.join(' '),
  };
}

/**
 * Repère cité par une phrase, pour une dimension donnée.
 * Rend `null` si la phrase ne cite aucun repère connu.
 */
export function repereDe(dimension, phrase) {
  const texte = normaliser(phrase);
  if (!texte) return null;
  for (const [motif, nom] of TABLES[dimension]) {
    const trouve = texte.match(motif);
    if (trouve) return trouve[1] ? `${trouve[1]} ${nom}` : nom;
  }
  return null;
}

/**
 * Compare le repère attendu (calculé depuis dinos-data.js) à celui réellement
 * énoncé dans le texte parlé.
 *
 * Trois issues :
 *   · `conforme`      — même repère, quelle que soit la tournure
 *   · `derive`        — la phrase cite un AUTRE repère : le fait a changé
 *   · `non-enonce`    — la phrase ne cite aucun repère de cette dimension
 *                       (le bloc ne parle pas de cette mesure : rien à conclure)
 */
export function comparerRepere(dimension, phraseAttendue, texteParle) {
  const attendu = repereDe(dimension, phraseAttendue);
  if (!attendu) return { verdict: 'non-enonce' };
  const dit = repereDe(dimension, texteParle);
  if (!dit) return { verdict: 'non-enonce', attendu };
  return dit === attendu
    ? { verdict: 'conforme', attendu }
    : { verdict: 'derive', attendu, dit };
}
