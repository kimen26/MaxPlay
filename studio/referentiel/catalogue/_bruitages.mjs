// ─────────────────────────────────────────────────────────────────────────────
// _bruitages.mjs — sons sans texte, HORS LANGUE
//
// Type `bruitage` : pas de texte, pas de voix, rien à traduire — un klaxon reste
// un klaxon dans les vingt langues. C'est pour ça que ce fichier est à la racine
// du catalogue et non sous une langue.
//
// Mais un bruitage a quand même une SOURCE à tracer : le prompt anglais qui l'a
// produit (`text_to_sound_effects` attend de l'anglais, cf. _BANQUE-SONS.md § 3).
// Sans lui, un bruitage n'est pas plus reproductible qu'une voix dont on aurait
// perdu le texte.
//
// ⚠️ Les prompts ci-dessous sont RECONSTRUITS depuis le nom du fichier et son rôle
// documenté : les prompts d'origine n'ont pas été conservés. Ils deviendront vrais
// à la première régénération faite depuis ce fichier. Le reste de la banque
// (sounds/fx/, cris de bébés dinos, etc.) reste à enrôler de la même façon.
// ─────────────────────────────────────────────────────────────────────────────

const bruitage = (id, prompt_en, fichier, note) => ({
  cle: `sfx.${id}`,
  type: 'bruitage',
  i18n: 'invariant',
  prompt_en,
  prompt_verifie: false,
  fichier,
  production: { moteur: 'text_to_sound_effects', traitement: ['padding-250ms'] },
  ...(note ? { note } : {}),
});

export const BRUITAGES = [
  bruitage('moteur-bus', 'friendly city bus engine starting, warm and soft, cartoon style, short',
    'sounds/ui/moteur-bus.mp3', "Identité sonore du hub « Ligne de Max »."),
  bruitage('klaxon', 'short friendly bus horn, warm, cartoon, not aggressive',
    'sounds/ui/klaxon.mp3'),
  bruitage('porte-bus', 'city bus doors opening with a soft pneumatic hiss, short',
    'sounds/ui/porte-bus.mp3'),
  bruitage('tap', 'soft rounded UI tap, gentle, child friendly, very short',
    'sounds/ui/tap.mp3'),
  bruitage('fanfare-victoire', 'short cheerful fanfare, bright, playful, child friendly',
    'sounds/ui/fanfare-victoire.mp3'),
  bruitage('etoile', 'magical twinkling star chime, bright and short',
    'sounds/ui/etoile.mp3'),
  bruitage('deblocage', 'positive unlock chime, ascending, rewarding, short',
    'sounds/ui/deblocage.mp3'),
  bruitage('voyage-temps', 'time travel whoosh, dreamy, soft, not scary',
    'sounds/ui/voyage-temps.mp3', "Onglet Voyage de l'encyclopédie."),
  bruitage('veilleuse', 'very soft night light hum, calm, reassuring, loopable',
    'sounds/ui/veilleuse.mp3'),
  bruitage('ambiance-nuit', 'calm night ambience, soft crickets, reassuring, seamless loop',
    'sounds/ui/ambiance-nuit.mp3', 'Boucle — vérifier le raccord avant/après.'),
];
