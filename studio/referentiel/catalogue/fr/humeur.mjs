// ─────────────────────────────────────────────────────────────────────────────
// humeur.mjs — réserve d'humeur FR + pools multilingues invités
//
// Type `humeur` : ce qui compte n'est pas le mot mais l'INTENTION et la VARIÉTÉ.
// Il n'y a pas de « texte de humeur.positif » : c'est un ensemble tiré au sort.
//
// ⚠️ texte_verifie: false sur tout le FR — ces textes sont RECONSTRUITS depuis les
// slugs des MP3 déjà en place (site/sounds/voix/{f,h,wex}/). Plausibles, pas
// prouvés : personne ne les a réécoutés. Ils deviendront vrais à la première
// régénération faite DEPUIS ce catalogue. Ne pas s'en servir pour affirmer ce que
// l'enfant entend aujourd'hui.
// ─────────────────────────────────────────────────────────────────────────────
import { TRIO } from '../voix.mjs';

export const HUMEUR = [
  {
    cle: 'humeur.positif',
    type: 'humeur',
    i18n: 'reinvention',
    intention: "Féliciter chaleureusement un enfant de 4 ans qui vient de réussir",
    voix: TRIO,
    doublon_multilingue: true, // décision PY 2026-08-10 : les positifs seulement
    consommee_par: ['tous les mini-jeux (fin de partie, via SoundPool.voice)'],
    variantes: [
      { slug: 'bravo', texte: 'Bravo !', tags: ['excited'] },
      { slug: 'super', texte: 'Super !', tags: ['excited'] },
      { slug: 'genial', texte: 'Génial !', tags: ['delighted'] },
      { slug: 'ouiii', texte: 'Ouiii !', tags: ['triumphant'] },
      { slug: 'trop-fort', texte: 'Trop fort !', tags: ['amazed'] },
      { slug: 'champion', texte: 'Champion !', tags: ['proud'] },
      { slug: 'parfait', texte: 'Parfait !', tags: ['delighted'] },
      { slug: 'waouh', texte: 'Waouh !', tags: ['amazed'] },
      { slug: 'bien-joue', texte: 'Bien joué !', tags: ['proud'] },
      { slug: 'incroyable', texte: 'Incroyable !', tags: ['amazed'] },
      { slug: 'encore', texte: 'Encore !', tags: ['cheerfully'] },
      { slug: 'yes', texte: 'Yes !', tags: ['triumphant'] },
      { slug: 'hourra', texte: 'Hourra !', tags: ['triumphant'] },
      { slug: 'joli', texte: 'Joli !', tags: ['cheerfully'] },
      { slug: 'quel-talent', texte: 'Quel talent !', tags: ['proud'] },
      { slug: 'oh-la-la', texte: 'Oh là là !', tags: ['amazed'] },
    ],
  },
  {
    cle: 'humeur.doux',
    type: 'humeur',
    i18n: 'reinvention',
    intention: "Consoler sans juger un enfant de 4 ans qui vient de se tromper, et le relancer",
    voix: TRIO,
    // Pas de doublon multilingue (PY 2026-08-10) : on ne rallonge pas un moment
    // de frustration, on le passe vite.
    doublon_multilingue: false,
    consommee_par: ['tous les mini-jeux (erreur, via SoundPool.voice)'],
    variantes: [
      { slug: 'oups', texte: 'Oups !', tags: ['sheepish'] },
      { slug: 'presque', texte: 'Presque !', tags: ['encouraging'] },
      { slug: 'essaie-encore', texte: 'Essaie encore !', tags: ['encouraging'] },
      { slug: 'pas-tout-a-fait', texte: 'Pas tout à fait !', tags: ['gently'] },
      { slug: 'hmm-non', texte: 'Hmm, non !', tags: ['gently'] },
      { slug: 'tu-y-es-presque', texte: 'Tu y es presque !', tags: ['encouraging'] },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Pools invités — le FR est joué, puis IMMÉDIATEMENT la même intention dans une
// autre langue, drapeau affiché (idée PY 2026-08-10).
//
// `i18n: 'reinvention'` pris au mot : ce ne sont PAS les traductions des 16 mots
// français. Ce sont les mots qu'un adulte de cette culture dit spontanément à un
// enfant de 4 ans qui réussit. Un pool court suffit : il se combine à un tirage
// français différent à chaque fois, la variété vient du couple.
//
// DIMENSIONNEMENT (à valider) : 5 variantes × 3 voix × 6 langues = 90 fichiers.
// L'alternative « les 16 mots dans les 6 langues » donnait ~770 fichiers pour un
// gain de variété que l'oreille ne perçoit pas, le FR portant déjà la diversité.
//
// ⚠️ AUCUN de ces textes n'est validé par un locuteur natif. C'est du contenu
// destiné à un enfant : faire relire chaque langue AVANT de générer. Les tickets
// i18n du pôle dino imposent déjà cette validation pour l'arabe et le chinois.
// ─────────────────────────────────────────────────────────────────────────────
export const HUMEUR_INVITEE = [
  {
    langue: 'pt-BR',
    cle: 'humeur.positif',
    variantes: [
      { slug: 'muito-bem', texte: 'Muito bem!', tags: ['excited'] },
      { slug: 'isso-ai', texte: 'Isso aí!', tags: ['triumphant'] },
      { slug: 'boa', texte: 'Boa!', tags: ['cheerfully'] },
      { slug: 'arrasou', texte: 'Arrasou!', tags: ['amazed'] },
      { slug: 'que-legal', texte: 'Que legal!', tags: ['delighted'] },
    ],
  },
  {
    langue: 'en',
    cle: 'humeur.positif',
    variantes: [
      { slug: 'well-done', texte: 'Well done!', tags: ['proud'] },
      { slug: 'awesome', texte: 'Awesome!', tags: ['amazed'] },
      { slug: 'you-did-it', texte: 'You did it!', tags: ['triumphant'] },
      { slug: 'brilliant', texte: 'Brilliant!', tags: ['delighted'] },
      { slug: 'way-to-go', texte: 'Way to go!', tags: ['cheerfully'] },
    ],
  },
  {
    langue: 'ja',
    cle: 'humeur.positif',
    variantes: [
      { slug: 'sugoi', texte: 'すごい！', translitteration: 'sugoi', tags: ['amazed'] },
      { slug: 'yatta-ne', texte: 'やったね！', translitteration: 'yatta ne', tags: ['triumphant'] },
      { slug: 'jouzu', texte: '上手！', translitteration: 'jōzu', tags: ['proud'] },
      { slug: 'erai', texte: 'えらい！', translitteration: 'erai', tags: ['delighted'] },
      { slug: 'dekita-ne', texte: 'できたね！', translitteration: 'dekita ne', tags: ['cheerfully'] },
    ],
  },
  {
    langue: 'zh',
    cle: 'humeur.positif',
    variantes: [
      { slug: 'tai-bang-le', texte: '太棒了！', translitteration: 'tài bàng le', tags: ['amazed'] },
      { slug: 'zhen-bang', texte: '真棒！', translitteration: 'zhēn bàng', tags: ['excited'] },
      { slug: 'zuo-de-hao', texte: '做得好！', translitteration: 'zuò de hǎo', tags: ['proud'] },
      { slug: 'hao-lihai', texte: '好厉害！', translitteration: 'hǎo lìhai', tags: ['amazed'] },
      { slug: 'ni-zhen-xing', texte: '你真行！', translitteration: 'nǐ zhēn xíng', tags: ['delighted'] },
    ],
  },
  {
    langue: 'it',
    cle: 'humeur.positif',
    variantes: [
      { slug: 'bravissimo', texte: 'Bravissimo!', tags: ['proud'] },
      { slug: 'che-forte', texte: 'Che forte!', tags: ['amazed'] },
      { slug: 'benissimo', texte: 'Benissimo!', tags: ['delighted'] },
      { slug: 'grande', texte: 'Grande!', tags: ['triumphant'] },
      { slug: 'ce-lhai-fatta', texte: "Ce l'hai fatta!", tags: ['cheerfully'] },
    ],
  },
  {
    langue: 'es',
    cle: 'humeur.positif',
    variantes: [
      { slug: 'muy-bien', texte: '¡Muy bien!', tags: ['excited'] },
      { slug: 'genial', texte: '¡Genial!', tags: ['delighted'] },
      { slug: 'lo-lograste', texte: '¡Lo lograste!', tags: ['triumphant'] },
      { slug: 'eso-es', texte: '¡Eso es!', tags: ['cheerfully'] },
      { slug: 'que-crack', texte: '¡Qué crack!', tags: ['amazed'] },
    ],
  },
];
