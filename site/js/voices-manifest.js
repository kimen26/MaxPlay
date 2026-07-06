// ─────────────────────────────────────────────────────────────────────────
//  voices-manifest.js — Catalogue des phrases pré-générées (vraies voix)
//  Clé : texte normalisé (minuscules, sans accents/ponctuation) — voir
//  Voice.normalize() dans voice.js. Valeur : chemin MP3 relatif au site.
//
//  V0 : vide — la structure est en place, les clips arriveront au fil de la
//  production audio (ElevenLabs pour narration/dino, Qwen3 pour phrases MJ).
//  Générer les clés : Voice.normalize("Bravo Max !") → "bravo max"
// ─────────────────────────────────────────────────────────────────────────
window.MAXPLAY_VOICES = {
  // "bravo": "audio/voix/bravo.mp3",
  // "quelle couleur": "audio/voix/quelle-couleur.mp3",
};
