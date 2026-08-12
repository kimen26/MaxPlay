// lang.js — source de vérité de la langue active (plomberie i18n, P2-A).
// Charger AVANT tout script audio/data. FR par défaut : comportement identique à avant.
// Résolution : ?lang= (URL, force + persiste) → localStorage → 'fr'.
(function () {
  var SUPPORTED = ['fr', 'en', 'pt-br', 'es-es', 'es-mx', 'it', 'ar', 'ru', 'zh', 'ja', 'de', 'hi'];
  var BCP47 = {
    fr: 'fr-FR', en: 'en-US', 'pt-br': 'pt-BR', 'es-es': 'es-ES', 'es-mx': 'es-MX', it: 'it-IT',
    ar: 'ar-SA', ru: 'ru-RU', zh: 'zh-CN', ja: 'ja-JP', de: 'de-DE', hi: 'hi-IN'
  };
  var qs = null;
  try { qs = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  var stored = null;
  try { stored = localStorage.getItem('maxplay_lang'); } catch (e) {}
  var cur = qs || stored || 'fr';
  if (SUPPORTED.indexOf(cur) < 0) cur = 'fr';
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
