// ─────────────────────────────────────────────────────────────────────────────
// repliques.mjs — phrases fixes réutilisées (consignes de jeu, noms de lieux)
//
// Type `replique` : un texte canonique, stable, rejoué à l'identique à plusieurs
// endroits. Se traduit (contrairement à la réserve d'humeur, qui se ré-invente).
//
// ⚠️ texte_verifie: false PARTOUT. Deux origines, aucune n'est une preuve :
//   · `repli` — le texte passé en 2ᵉ argument de SoundPool.phrase() au point
//     d'appel. Il ne se déclenche QUE si le MP3 échoue : il dit l'intention du
//     développeur, pas ce que le MP3 contient. Incident du 2026-08-10 : un même
//     slug appelé avec deux replis différents, dont un qui ne correspond pas.
//   · `slug` — reconstruit depuis le nom de fichier. Plausible, non prouvé.
// Ces textes deviendront vrais à la première régénération faite DEPUIS ce fichier.
// ─────────────────────────────────────────────────────────────────────────────

const consigne = (slug, texte, origine, consommee_par = [], tags = []) => ({
  cle: `jeu.consigne.${slug}`,
  type: 'replique',
  i18n: 'traduction',
  slug,
  texte,
  tags,
  origine_texte: origine, // 'repli' (relevé au point d'appel) | 'slug' (reconstruit)
  texte_verifie: false,
  production: { voix: 'narrateur_h', usage: 'replique' },
  fichier: `sounds/voix/phrases/${slug}.mp3`,
  consommee_par,
});

export const REPLIQUES = [
  // ── textes relevés au point d'appel (origine 'repli') ─────────────────────
  consigne('quel-bus-arrive-en-premier', 'Quel bus arrive en premier ?', 'repli', ['mj-13a']),
  consigne('compte-les-un-par-un', 'Compte les bus AVANT le bus demandé, un par un.', 'repli', ['mj-13c']),
  consigne('cherche-bien', "Non ce n'est pas ça. Cherche bien.", 'repli', ['mj-22']),
  consigne('qu-est-ce-qui-vient-ensuite', "Qu'est-ce qui vient ensuite ?", 'repli', ['mj-16']),
  consigne('lequel-ne-va-pas', 'Lequel ne va pas avec les autres ?', 'repli', ['mj-15']),
  consigne('quel-bus-manque', 'Quel bus manque dans la grille ?', 'repli', ['mj-14']),
  consigne('qu-est-ce-qui-manque', "Qu'est-ce qui manque dans la grille ?", 'repli', ['mj-14']),
  consigne('regardons-ensemble', 'Regardons ensemble !', 'repli', ['mj-30']),
  consigne('compte-encore', 'Compte encore !', 'repli', ['mj-26']),

  // ── textes reconstruits depuis le slug (origine 'slug') ───────────────────
  consigne('a-toi-de-jouer', 'À toi de jouer !', 'slug'),
  consigne('cest-parti', "C'est parti !", 'slug'),
  consigne('combien-de-dinos', 'Combien de dinos ?', 'slug', ['mj-26']),
  consigne('ecoute-le-premier-son', 'Écoute le premier son.', 'slug'),
  consigne('encore-une-fois', 'Encore une fois !', 'slug'),
  consigne('fais-monter-les-passagers', 'Fais monter les passagers.', 'slug'),
  consigne('gros-niveau-regroupe', 'Gros niveau : regroupe !', 'slug'),
  consigne('il-en-faut-beaucoup', 'Il en faut beaucoup !', 'slug'),
  consigne('il-vivait-quand', 'Il vivait quand ?', 'slug', ['mj-31']),
  consigne('le-son-quon-entend', "Le son qu'on entend.", 'slug'),
  consigne('mode-libre-encore-une-caisse', 'Mode libre : encore une caisse !', 'slug'),
  consigne('ouvre-bien-les-yeux', 'Ouvre bien les yeux !', 'slug'),
  consigne('premier-son-l-ou-r', "Premier son : L ou R ?", 'slug'),
  consigne('range-dans-la-bonne-boite', 'Range dans la bonne boîte.', 'slug'),
  consigne('range-les-des', 'Range les dés.', 'slug'),
  consigne('regroupe-les-points', 'Regroupe les points.', 'slug'),
  consigne('remplis-chaque-caisse', 'Remplis chaque caisse.', 'slug'),
  consigne('terminus-fais-les-descendre', 'Terminus ! Fais-les descendre.', 'slug'),
  consigne('trouve-le-meme-dino', 'Trouve le même dino !', 'slug', ['mj-25']),
];

// ─────────────────────────────────────────────────────────────────────────────
// Consignes générées le 2026-08-10 DEPUIS ce catalogue — donc `texte_verifie: true`.
// Ce sont les premières entrées prouvées : le MP3 sort exactement de ce texte.
//
// Leur slug est la SLUGIFICATION du texte, ce qui les rend jouables sans qu'aucun
// jeu ne déclare rien : `slugConsigne()` dans site/js/mj-shell.js recalcule le même
// slug au moment de dire la consigne. Changer un de ces textes fait perdre son MP3
// au jeu (repli TTS) — le référentiel le signalera comme manquant.
//
// ⚠️ Toute modification ici oblige à régénérer le MP3, sinon l'écran et l'oreille
// divergent. C'est exactement la dette que ce référentiel existe pour attraper.
// ─────────────────────────────────────────────────────────────────────────────
const genere = (texte, consommee_par) => ({
  ...consigne(
    texte.toLowerCase()
      .replace(/œ/g, 'oe').replace(/æ/g, 'ae')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[’']/g, ' ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
    texte, 'genere', consommee_par, ['warmly'],
  ),
  texte_verifie: true,
});

export const CONSIGNES_GENEREES = [
  genere('Quel mot manque dans la phrase ?', ['mj-06']),
  genere('Combien de dinos ? Compte-les !', ['mj-26']),
  genere('Quel dino se cache dans le noir ?', ['mj-28']),
  genere('Trouve l’ombre et son dino !', ['mj-33']),
  genere('Trouve 2 tuiles avec le même dino !', ['mj-41']),
  genere('Combien d’œufs ?', ['mj-46']),
  genere('Combien en tout ?', ['mj-47']),
  genere('Combien d’œufs en tout ?', ['mj-49']),
  genere('Deux boîtes pleines… combien en tout ?', ['mj-49']),
  genere('La boîte est pleine. Il faut encore combien d’œufs ?', ['mj-49']),
  genere('Touche la lettre qui fait ce son !', ['mj-50']),
  genere('Construis le mot !', ['mj-52']),
  genere('Complète la grille : les 4 symboles partout !', ['mj-54']),
  genere('Un dino par ligne, colonne et enclos… jamais collés !', ['mj-56']),
  genere('Continue à faire éclore les œufs !', ['mj-57']),
  genere('Tape pour sauter par-dessus les cactus !', ['mj-58']),
];

// ─────────────────────────────────────────────────────────────────────────────
// Lignes nommées jouées dans les trois voix (SoundPool.voiceLine).
// Ce ne sont pas des pools : le texte est fixe, seule la voix varie.
// ─────────────────────────────────────────────────────────────────────────────
export const LIGNES_NOMMEES = ['narrateur_f', 'narrateur_h', 'wex'].map((voix) => ({
  cle: `jeu.ligne.etoile-gagnee.${voix}`,
  type: 'replique',
  i18n: 'traduction',
  slug: 'etoile-gagnee',
  texte: 'Tu as gagné une étoile !',
  tags: ['triumphant'],
  origine_texte: 'banque', // texte gravé dans site/sounds/_BANQUE-SONS.md
  texte_verifie: false,
  production: { voix, usage: 'reaction' },
  fichier: `sounds/voix/${voix === 'narrateur_f' ? 'f' : voix === 'narrateur_h' ? 'h' : 'wex'}/etoile-gagnee.mp3`,
  consommee_par: ['mj-golden.js (vol d’étoile + 3e étoile)'],
  note: "Joué aussi à la 3e étoile (mj-golden.js) — décision actée 2026-08-10 : ligne unique "
    + "« Tu as gagné une étoile ! », le repli TTS du code a été aligné sur ce message (plus de "
    + "ligne `tu-maitrises` séparée).",
}));

// ─────────────────────────────────────────────────────────────────────────────
// Noms de lieux des deux hubs. Même zone, deux habillages (bus / fusée).
// Joués par speakLieu() à l'entrée d'une zone. Voix narratrice.
// ─────────────────────────────────────────────────────────────────────────────
const ZONES = [
  { id: 'dodo', bus: 'Le centre des bus', fusee: 'La base de repos' },
  { id: 'garage', bus: 'Le garage', fusee: "L'atelier" },
  { id: 'lettres', bus: 'Les lettres', fusee: 'La planète des lettres' },
  { id: 'monde', bus: 'Le monde', fusee: 'La planète bleue' },
  { id: 'dinos', bus: 'Les dinos', fusee: 'La planète des dinos' },
  { id: 'roulotte', bus: 'La roulotte', fusee: 'La navette' },
];

export const LIEUX = ZONES.flatMap((z) =>
  ['bus', 'fusee'].map((hub) => ({
    cle: `jeu.lieu.${hub}.${z.id}`,
    type: 'replique',
    i18n: 'traduction',
    slug: `${hub}-${z.id}`,
    texte: z[hub],
    tags: ['warmly'],
    origine_texte: 'slug',
    texte_verifie: false,
    production: { voix: 'narrateur_f', usage: 'replique' },
    fichier: `sounds/voix/lieux/${hub}-${z.id}.mp3`,
    consommee_par: [hub === 'bus' ? 'index2 (hub bus)' : 'index3 (hub fusée)'],
    note: "Vocabulaire de Max : centre des bus = dodo · garage = réparation. Ne pas confondre.",
  })),
);
