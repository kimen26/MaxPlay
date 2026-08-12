// ─────────────────────────────────────────────────────────────────────────────
// phonemes.mjs — le SON de chaque lettre (site/sounds/phonemes/, 21 fichiers)
//
// Type `atome` : la plus petite brique parlée du domaine lecture, rejouée
// partout via MJKit.sayPhoneme (mj-50/51/52…). Jamais le NOM de la lettre :
// son-se, son-fe… et c/k/q partagent `son-ke` (h muet n'a pas de MP3).
//
// ⚠️ texte_verifie: false PARTOUT. Le texte est celui de la table PHONEMES de
// site/js/mj-kit.js — mais c'est le texte du REPLI TTS, pas la preuve de ce que
// le MP3 dit (le script de génération du 2026-07-28 n'est pas conservé). Le
// fix « E accent grave f » (mj-50, retour PY 2026-07-27) montre que MP3 et
// repli ont déjà divergé en sens inverse : ici c'est le MP3 qui fait foi.
// ─────────────────────────────────────────────────────────────────────────────

// Mêmes graphies que PHONEMES dans site/js/mj-kit.js (source du repli TTS).
// slug du fichier → texte du repli. Une SEULE occurrence par son : la
// répétition x3 (mmm/sss…) fait bafouiller le TTS FR (retour PY 2026-07-21).
const SONS = [
  ['a', 'a'], ['eu', 'eu'], ['i', 'i'], ['o', 'o'], ['u', 'u'], ['ou', 'ou'],
  ['me', 'èm'], ['se', 'ès'], ['fe', 'èf'], ['le', 'èl'], ['re', 'èr'],
  ['ve', 'èv'], ['je', 'jeu'], ['ze', 'èz'], ['ne', 'èn'],
  ['be', 'be'], ['de', 'de'], ['pe', 'pe'], ['te', 'te'],
  ['ke', 'ke'], ['gue', 'gue'],
];

export const PHONEMES_SONS = SONS.map(([slug, texte]) => ({
  cle: `atome.phoneme.son-${slug}`,
  type: 'atome',
  i18n: 'traduction',
  famille: 'phoneme',
  texte,
  tags: [],
  origine_texte: 'repli', // table PHONEMES de mj-kit.js — repli TTS, non prouvé
  texte_verifie: false,
  production: { voix: 'narrateur_h', usage: 'atome' },
  fichier: `sounds/phonemes/son-${slug}.mp3`,
  consommee_par: ['mj-kit.js (MJKit.sayPhoneme)', 'mj-44 (PHONEME_SRC local)', 'mj-50', 'mj-51', 'mj-52'],
  note: 'Le MP3 dit le SON, jamais le nom de la lettre. c/k/q partagent son-ke ; '
    + 'h muet : pas de MP3 (TTS seul). son-ou n\'est consommé que par mj-44 (table locale).',
}));
