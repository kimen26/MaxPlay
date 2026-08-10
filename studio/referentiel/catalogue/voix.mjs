// ─────────────────────────────────────────────────────────────────────────────
// voix.mjs — rôles de voix autorisés et réglages par usage
//
// Les voice_id ne sont PAS ici : ils vivent dans le résolveur autoritaire
// studio/narration/personnages/voix-meta/voice-map.json (MAJ 2026-05-16), et on
// les résout par rôle au moment de générer. Règle de projet : jamais un voice_id
// en dur ailleurs que dans ce résolveur.
//
// Casting du site : narrateur_h, narrateur_f, wex. Trois voix, pas plus
// (confirmé Papa Yann 2026-08-10).
// ─────────────────────────────────────────────────────────────────────────────

/** Les seuls rôles que le catalogue a le droit de citer. */
export const ROLES = ['narrateur_h', 'narrateur_f', 'wex'];

/** Les trois voix jouent les mêmes réactions : c'est ce qui fait la variété. */
export const TRIO = ['narrateur_f', 'narrateur_h', 'wex'];

/**
 * Réglages par usage. Valeurs gravées dans la doctrine audio du projet
 * (`.claude/rules/audio.md` + `site/sounds/_BANQUE-SONS.md`) — ne pas inventer.
 */
export const REGLAGES = {
  // Réactions courtes et vives : un peu moins de stabilité = plus d'élan.
  reaction: { modele: 'eleven_v3', reglages: { stability: 0.35 } },
  // Consignes et phrases de jeu : posé, intelligible.
  replique: { modele: 'eleven_v3', reglages: { stability: 0.4 } },
  // Briques réutilisées dans des phrases : neutre, pour se raccorder proprement.
  atome: { modele: 'eleven_v3', reglages: { stability: 0.4 } },
};

/** Post-production, dans cet ordre. Le padding évite l'attaque coupée en Bluetooth. */
export const TRAITEMENT = ['loudnorm', 'padding-250ms'];

/**
 * Langues invitées du doublon d'encouragement (décision Papa Yann 2026-08-10).
 * Le français reste la langue porteuse ; l'invitée se joue juste après, avec son
 * drapeau affiché. POSITIFS UNIQUEMENT — on ne redouble pas une consolation,
 * un moment de frustration se passe vite.
 */
export const LANGUES_INVITEES = [
  { code: 'pt-BR', libelle: 'brésilien', drapeau: '🇧🇷' },
  { code: 'en', libelle: 'anglais', drapeau: '🇬🇧' },
  { code: 'ja', libelle: 'japonais', drapeau: '🇯🇵' },
  { code: 'zh', libelle: 'chinois', drapeau: '🇨🇳' },
  { code: 'it', libelle: 'italien', drapeau: '🇮🇹' },
  { code: 'es', libelle: 'espagnol', drapeau: '🇪🇸' },
];
