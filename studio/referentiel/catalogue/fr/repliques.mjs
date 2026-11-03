// ─────────────────────────────────────────────────────────────────────────────
// repliques.mjs — phrases fixes réutilisées (consignes de jeu)
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
//   · `stt` — relevé par transcription du MP3 (aucune autre source).
// Depuis le 2026-11-03, `transcriptions.json` dit ce que chaque MP3 dit RÉELLEMENT :
// lib/catalogue.mjs y passe texte_verifie à true quand le verdict est « conforme ».
// Les textes `slug` et `repli` ci-dessous ont été réalignés sur le son ce jour-là.
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
  consigne('cherche-bien', 'Cherche bien.', 'repli', ['mj-22']),
  consigne('qu-est-ce-qui-vient-ensuite', "Qu'est-ce qui vient ensuite ?", 'repli', ['mj-16']),
  consigne('lequel-ne-va-pas', 'Lequel ne va pas avec les autres ?', 'repli', ['mj-15']),
  consigne('quel-bus-manque', 'Quel bus manque dans la grille ?', 'repli', ['mj-14']),
  // Audit 2026-11 : l'ÉCRAN de mj-14 disait « Qu'est-ce qui manque ? » (clé consigneFormes)
  // alors que ce MP3 dit « …dans la grille ? » — écran aligné sur le son (4 packs). Preuve
  // du texte du MP3, sans STT payant : texte du point d'appel à la création du MP3
  // (commit 2b370ca9) + durée 1,93 s, cohérente avec 37 car. (« Qu'est-ce qui vient ensuite ? »,
  // 29 car. = 1,45 s) et non avec 22 car. Reste texte_verifie:false (pas d'écoute/STT).
  consigne('qu-est-ce-qui-manque', "Qu'est-ce qui manque dans la grille ?", 'repli', ['mj-14']),
  // Généré HO-N01 (2026-09-12) DEPUIS ce texte exact (bug réel corrigé, cf. banque
  // § « Sons générés » — le MP3 sort de ce texte, vérifié à l'oreille + STT).
  { ...consigne('quel-dino-manque', 'Quel dino manque dans la grille ?', 'repli', ['mj-14']),
    texte_verifie: true },
  consigne('regardons-ensemble', 'Regardons ensemble !', 'repli', ['mj-30']),
  consigne('compte-encore', 'Compte encore !', 'repli', ['mj-26']),

  // ── textes reconstruits depuis le slug (origine 'slug') ───────────────────
  consigne('a-toi-de-jouer', 'À toi de jouer !', 'slug'),
  consigne('cest-parti', "C'est parti !", 'slug'),
  consigne('combien-de-dinos', 'Combien de dinos ? Compte-les !', 'slug', ['mj-26']),
  consigne('ecoute-le-premier-son', 'Écoute bien le premier son du mot.', 'slug'),
  consigne('encore-une-fois', 'Encore une fois !', 'slug'),
  consigne('fais-monter-les-passagers', 'Fais monter les passagers dans le bus.', 'slug'),
  consigne('gros-niveau-regroupe', 'Gros niveau : regroupe 3 dés ou 2 dominos !', 'slug'),
  consigne('il-en-faut-beaucoup', 'Il en faut beaucoup. Regroupe bien !', 'slug'),
  consigne('il-vivait-quand', 'Il vivait quand ?', 'slug', ['mj-31']),
  consigne('le-son-quon-entend', "Le son qu'on entend : « ou » ou bien « a » ?", 'slug'),
  consigne('mode-libre-encore-une-caisse', 'Mode libre : encore une caisse !', 'slug'),
  consigne('ouvre-bien-les-yeux', 'Ouvre bien les yeux !', 'slug'),
  consigne('premier-son-l-ou-r', 'Premier son : « le » ou bien « re » ?', 'slug'),
  consigne('range-dans-la-bonne-boite', 'Range chaque mot dans la bonne boîte.', 'slug'),
  consigne('range-les-des', 'Range les dés dans la bonne caisse.', 'slug'),
  consigne('regroupe-les-points', 'Regroupe les points pour remplir la caisse.', 'slug'),
  consigne('remplis-chaque-caisse', "Remplis chaque caisse jusqu'au bon compte.", 'slug'),
  consigne('terminus-fais-les-descendre', 'Terminus pour certains, fais-les descendre !', 'slug'),
  consigne('trouve-le-meme-dino', 'Trouve le même dino !', 'slug', ['mj-25']),

  // ── MP3 présents sans entrée : texte relevé par transcription (STT 2026-11-03) ──
  consigne('fais-un-territoire-pour-chaque-pierre', 'Fais un territoire pour chaque pierre.', 'stt'),
  consigne('il-en-faut-combien-pour-faire-10', 'Il en faut combien pour faire 10 ?', 'stt'),
  consigne('il-en-manque-combien-pour-remplir-la-boite', 'Il en manque combien pour remplir la boîte ?', 'stt'),
  consigne('range-les-du-plus-leger-au-plus-lourd', 'Range-les du plus léger au plus lourd.', 'stt'),
  consigne('range-les-du-plus-petit-au-plus-grand', 'Range-les du plus petit au plus grand.', 'stt'),
  consigne('tous-les-oeufs-ont-eclos', 'Tous les œufs ont éclos !', 'stt'),
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
const slugifier = (texte) => texte.toLowerCase()
  .replace(/œ/g, 'oe').replace(/æ/g, 'ae')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’']/g, ' ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const genere = (texte, consommee_par) => ({
  ...consigne(slugifier(texte), texte, 'genere', consommee_par, ['warmly']),
  texte_verifie: true,
});

// ─────────────────────────────────────────────────────────────────────────────
// Consignes jouées par le jeu SANS MP3 (repli TTS seul) — audit 2026-11. Même slug
// que `slugConsigne()` de mj-shell.js : dès que le MP3 sera généré DEPUIS ce texte
// (puis `texte_verifie: true`), le jeu le jouera sans toucher au code.
//   · mj-55 : consigneSimple (39 car.) et consigneAvecEquilibre (67 car.)
//   · mj-48 : toucheLeOrdinal — un gabarit COMPLET par rang (2e à 5e : rand(2, q≤5)),
//     jamais « Touche le » + ordinal assemblés (décision 2026-07-28).
// ─────────────────────────────────────────────────────────────────────────────
const aGenerer = (texte, consommee_par) =>
  consigne(slugifier(texte), texte, 'repli', consommee_par, ['warmly']);

export const CONSIGNES_A_GENERER = [
  aGenerer('Complète la grille : jamais 3 pareils !', ['mj-55']),
  aGenerer('Complète la grille : jamais 3 pareils, autant de dinos que d’œufs !', ['mj-55']),
  ...['deuxième', 'troisième', 'quatrième', 'cinquième']
    .map((ord) => aGenerer(`Touche le ${ord} de la file !`, ['mj-48'])),
];

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

