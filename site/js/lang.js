// lang.js — source de vérité de la langue active (plomberie i18n, P2-A).
// Charger AVANT tout script audio/data. FR par défaut : comportement identique à avant.
// Résolution : ?lang= (URL, force + persiste) → localStorage → 'fr'.
(function () {
  // Seules les langues REELLEMENT servies (PY 2026-09-13) : fr et en ont les 71 fiches dino.
  // es-es et pt-br s'arretent a 13 fiches, les 8 autres (de, es-mx, it, ru, ja, zh, ar, hi)
  // n'ont jamais eu que les noms courts — une langue a moitie vide se lit comme un bug.
  // Les rouvrir = remettre le code ici ET dans mj-shell.js ET dans LANGUES de mur.js.
  var SUPPORTED = ['fr', 'en'];
  var BCP47 = {
    fr: 'fr-FR', en: 'en-US', 'pt-br': 'pt-BR', 'es-es': 'es-ES', 'es-mx': 'es-MX', it: 'it-IT',
    ar: 'ar-SA', ru: 'ru-RU', zh: 'zh-CN', ja: 'ja-JP', de: 'de-DE', hi: 'hi-IN'
  };
  var qs = null;
  try { qs = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  var stored = null;
  try { stored = localStorage.getItem('maxplay_lang'); } catch (e) {}
  var cur = qs || stored || 'fr';
  if (SUPPORTED.indexOf(cur) < 0) {
    // Langue retiree depuis la derniere visite : on retombe sur FR et on purge le stockage,
    // sinon le rattrapage rejoue a chaque chargement sur une valeur morte.
    cur = 'fr';
    try { localStorage.removeItem('maxplay_lang'); } catch (e) {}
  }
  if (qs && SUPPORTED.indexOf(qs) >= 0) {
    try { localStorage.setItem('maxplay_lang', qs); } catch (e) {}
  }
  window.Lang = {
    current: function () { return cur; },
    bcp47: function () { return BCP47[cur] || 'fr-FR'; },
    set: function (c) {
      if (SUPPORTED.indexOf(c) < 0) return;
      try { localStorage.setItem('maxplay_lang', c); } catch (e) {}
      location.reload();
    }
  };
  // Préfixe du pack audio dino de la langue active (parole uniquement — les SFX restent plats).
  window.AUDIO_DINOS = 'audio/dinos/' + cur + '/';
})();
