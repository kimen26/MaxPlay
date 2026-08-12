// ─────────────────────────────────────────────────────────────────────────────
// nombres.mjs — banque C6 des nombres (site/sounds/nombres/, 75 fichiers)
//
//   · n-<n>.mp3            le nombre seul, 0-30 + 40/50/100/1000 — type `atome`
//   · n-<n>-fete.mp3       variante réussite, 1-10                 — type `atome`
//   · il-en-manque-<n>.mp3 · il-en-faut-<n>.mp3 · <n>-oeufs.mp3    — type `replique`
//     (1-10, phrases-gabarits COMPLÈTES — jamais d'assemblage mot-à-mot,
//      décision Papa Yann 2026-07-28, cf. atomes.mjs)
//
// ⚠️ texte_verifie: false PARTOUT. Le script de génération (`gen-banque.mjs`,
// cité par site/sounds/_BANQUE-SONS.md §1) N'EST PAS conservé dans le dépôt :
// les textes sont reconstruits depuis les textes de repli de `site/js/say-nombres.js`
// (origine 'repli') — plausibles, non prouvés. Les tags, eux, sont documentés
// par la banque : [warmly] pour le neutre, [cheerful] pour la fête.
// ─────────────────────────────────────────────────────────────────────────────

// Mêmes mots que MOTS dans site/js/say-nombres.js (source du repli TTS).
const MOTS = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
  'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt',
  'vingt-et-un', 'vingt-deux', 'vingt-trois', 'vingt-quatre', 'vingt-cinq', 'vingt-six', 'vingt-sept',
  'vingt-huit', 'vingt-neuf', 'trente'];
MOTS[40] = 'quarante'; MOTS[50] = 'cinquante'; MOTS[100] = 'cent'; MOTS[1000] = 'mille';

const NOMBRES_SEULS = Object.keys(MOTS).map(Number); // 0-30, 40, 50, 100, 1000
const UN_A_DIX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CONSOMMATEURS = ['say-nombres.js (SayNombres.say/manque/faut/oeufs)', 'mj-46', 'mj-49'];

const atomeNombre = (n, fete) => ({
  cle: `atome.nombre.n-${n}${fete ? '-fete' : ''}`,
  type: 'atome',
  i18n: 'traduction',
  famille: 'nombre',
  texte: MOTS[n],
  tags: [fete ? 'cheerful' : 'warmly'], // gravé dans _BANQUE-SONS.md §1
  origine_texte: 'repli',
  texte_verifie: false,
  production: { voix: 'narrateur_h', usage: 'atome' },
  fichier: `sounds/nombres/n-${n}${fete ? '-fete' : ''}.mp3`,
  consommee_par: CONSOMMATEURS,
  note: fete ? 'Variante fête : réservée aux réussites/gros gains (règle anti-lassitude).' : undefined,
});

const repliqueNombre = (slug, texte) => ({
  cle: `jeu.nombre.${slug}`,
  type: 'replique',
  i18n: 'traduction',
  slug,
  texte,
  tags: [],
  origine_texte: 'repli',
  texte_verifie: false,
  production: { voix: 'narrateur_h', usage: 'replique' },
  fichier: `sounds/nombres/${slug}.mp3`,
  consommee_par: CONSOMMATEURS,
});

export const NOMBRES = [
  ...NOMBRES_SEULS.map((n) => atomeNombre(n, false)),
  ...UN_A_DIX.map((n) => atomeNombre(n, true)),
  ...UN_A_DIX.map((n) => repliqueNombre(`il-en-manque-${n}`, `Il en manque ${MOTS[n]} !`)),
  ...UN_A_DIX.map((n) => repliqueNombre(`il-en-faut-${n}`, `Il en faut ${MOTS[n]} en tout !`)),
  ...UN_A_DIX.map((n) => repliqueNombre(`${n}-oeufs`, `${MOTS[n]} ${n === 1 ? 'œuf' : 'œufs'} !`)),
];
