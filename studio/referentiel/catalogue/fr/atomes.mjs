// ─────────────────────────────────────────────────────────────────────────────
// atomes.mjs — briques réutilisées partout, et gabarits qui les assemblent
//
// Type `atome` : une brique courte (une époque, une famille, une durée) rejouée
// dans plusieurs contextes. Type `gabarit` : un patron à trous qui les combine.
//
// 🔒 RÈGLE CENTRALE — jamais de concaténation à l'exécution.
// Décision Papa Yann 2026-07-28 (site/js/say-nombres.js) : on pré-génère des
// PHRASES ENTIÈRES, on ne colle pas des MP3 bout à bout. L'assemblage s'entend :
// pauses mécaniques, intonation qui ne s'enchaîne pas, accent au mauvais endroit.
//
// L'internationalisation DURCIT cette règle au lieu de l'assouplir :
//   · l'ordre des mots dépend de la langue — un patron valide en français devient
//     agrammatical ailleurs ;
//   · les accords dépendent de la VALEUR du trou — en russe, 1 год / 2 года /
//     5 лет : le mot qui suit le nombre change avec le nombre.
// Donc le gabarit appartient à la LANGUE, pas au contenu. Ce fichier ne déclare
// que les patrons FRANÇAIS ; chaque langue écrira les siens.
// ─────────────────────────────────────────────────────────────────────────────

const atome = (famille, id, texte, extra = {}) => ({
  cle: `atome.${famille}.${id}`,
  type: 'atome',
  i18n: 'traduction',
  famille,
  texte,
  tags: [],
  texte_verifie: false,
  production: { voix: 'narrateur_h', usage: 'atome' },
  ...extra,
});

/** Les 4 périodes portées par dinos-data.js (champ `periode`). */
export const EPOQUES = [
  atome('epoque', 'trias', 'le Trias'),
  atome('epoque', 'jurassique', 'le Jurassique'),
  atome('epoque', 'cretace', 'le Crétacé'),
  atome('epoque', 'cenozoique', 'le Cénozoïque'),
];

/**
 * Durées utilisées avec les époques. Domaine VOLONTAIREMENT court : ce sont les
 * repères que l'encyclopédie énonce, pas une plage continue. C'est cette brièveté
 * qui rend la pré-génération possible (voir la règle de viabilité plus bas).
 */
export const DUREES = [
  atome('duree', '250-millions', 'Il y a 250 millions d’années'),
  atome('duree', '200-millions', 'Il y a 200 millions d’années'),
  atome('duree', '145-millions', 'Il y a 145 millions d’années'),
  atome('duree', '66-millions', 'Il y a 66 millions d’années'),
];

// ─────────────────────────────────────────────────────────────────────────────
// Gabarits FRANÇAIS
//
// `patron` porte des trous {nom}. `trous` associe chaque trou à une famille
// d'atomes. Le planificateur rend le produit cartésien et génère une phrase
// entière par combinaison — jamais un collage.
//
// RÈGLE DE VIABILITÉ (vérifiée par valider.mjs) : le nombre de rendus doit rester
// sous PLAFOND_RENDUS. Au-delà, la pré-génération n'a plus de sens et il faut
// choisir : soit une tournure NEUTRE qui évite l'accord (« le Crétacé — soixante-
// six millions d'années », deux blocs séparés), soit le repli TTS assumé.
// ─────────────────────────────────────────────────────────────────────────────
export const GABARITS = [
  {
    cle: 'gabarit.epoque-datee',
    type: 'gabarit',
    langue: 'fr',
    // C'est l'exemple donné par Papa Yann : « X millions d'années, c'est le Crétacé ».
    // Trois morceaux à l'écrit, UNE phrase générée d'un seul tenant à l'oral.
    patron: '{duree}, c’est {epoque} !',
    trous: { duree: 'duree', epoque: 'epoque' },
    tags: ['excited'],
    production: { voix: 'narrateur_h', usage: 'atome' },
    dossier: 'sounds/epoques',
    // 4 durées × 4 époques = 16 rendus. Toutes les combinaisons ne sont pas
    // justes historiquement : le planificateur ne fait que proposer, l'appariement
    // réel se décide au moment de valider le plan.
    note: 'Apparier durée et époque avant génération — le produit cartésien contient des couples faux.',
  },
];

export const ATOMES = [...EPOQUES, ...DUREES];
