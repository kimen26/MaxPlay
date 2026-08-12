// ─────────────────────────────────────────────────────────────────────────────
// pieces-echecs.mjs — voicelines d'intro des pièces (site/sounds/pieces/, 6)
//
// Type `replique` : une phrase fixe par pièce, jouée à sa découverte dans
// mj-37 (échecs pour 4 ans : croquer les goûters).
//
// ⚠️ texte_verifie: false PARTOUT. Les textes sont conservés VERBATIM dans
// PIECE_VOICELINES (site/mj-37.html), chacun en regard de son `file:` — mieux
// qu'un slug reconstruit, mais tant qu'on n'a pas écouté, rien ne prouve que
// le MP3 dit exactement cette phrase (génération 2026-07-13, script non
// conservé). Origine 'repli' par honnêteté, pas par doute sur la source.
// ─────────────────────────────────────────────────────────────────────────────

// Mêmes textes que PIECE_VOICELINES dans site/mj-37.html.
const PIECES = [
  ['fou', 'Moi je file en diagonale, zioup !'],
  ['tour', 'Moi j’avance droit devant, vroum !'],
  ['cavalier', 'Et hop, je saute en L !'],
  ['dame', 'Je peux aller absolument partout !'],
  ['roi', 'Doucement, un petit pas à la fois.'],
  ['pion', 'Je suis petit mais je croque bien !'],
];

export const PIECES_ECHECS = PIECES.map(([id, texte]) => ({
  cle: `jeu.piece.${id}`,
  type: 'replique',
  i18n: 'traduction',
  slug: `${id}-intro`,
  texte,
  tags: [],
  origine_texte: 'repli', // PIECE_VOICELINES (mj-37.html), en regard du fichier
  texte_verifie: false,
  production: { voix: 'narrateur_h', usage: 'replique' },
  fichier: `sounds/pieces/${id}-intro.mp3`,
  consommee_par: ['mj-37 (PIECE_VOICELINES)'],
  note: 'La pièce parle à la première personne — registre assumé du jeu, à garder en régénération.',
}));
