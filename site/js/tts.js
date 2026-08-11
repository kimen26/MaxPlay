// ─────────────────────────────────────────────────────────────────────────────
// TTS — Web Speech API partagé (phase 1, 100% live)
// Usage :
//   <script src="js/tts.js"></script>
//   TTS.speak("Bonjour");                              // defaults: fr-FR, rate 0.9, cancel-then-speak
//   TTS.speak("Salut",  {rate:0.85, pitch:1.1});        // opts per appel
//   TTS.speak("Queued", {priority:false});              // ne cancel pas la file
//   TTS.hasVoiceFor("ja-JP");                            // true si une voix navigateur existe
//   TTS.cancel();
//
// Phase 2 prévue : phrases non-dynamiques (victoire/défaite/encouragement/histoires)
// passeront en audio pré-généré (Qwen3 TTS) avec fallback sur TTS.speak.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  let voices = [];

  function refreshVoices() {
    if (synth) voices = synth.getVoices() || [];
  }

  if (synth) {
    refreshVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = refreshVoices;
    }
  }

  function pickVoice(lang) {
    if (!voices.length) refreshVoices();
    const prefix = (lang || '').split('-')[0];
    return voices.find(v => v.lang === lang)
        || (prefix && voices.find(v => v.lang.startsWith(prefix)))
        || null;
  }

  // ── Respelling FR des noms savants (lexique-fr.js, généré depuis ─────────
  // studio/dino/content/i18n/lexiques-prononciation/fr.md). Appliqué ICI, au
  // moment de construire l'utterance, JAMAIS avant : la clé de lookup des
  // clips pré-enregistrés (voice.js) reste le texte brut. Frontières Unicode
  // (lookarounds) plutôt que \b — « L'Édaphosaure » doit matcher malgré l'apostrophe.
  let respellRe = null, respellMap = null;
  function respellFr(text) {
    const lex = window.LEXIQUE_FR;
    if (!lex) return text;
    if (!respellRe) {
      const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      respellMap = {};
      Object.keys(lex).forEach(k => { respellMap[k.toLowerCase()] = lex[k]; });
      respellRe = new RegExp(
        '(?<![\\p{L}\\p{N}])(' + Object.keys(lex).map(esc).join('|') + ')(?![\\p{L}\\p{N}])',
        'giu'
      );
    }
    return text.replace(respellRe, m => respellMap[m.toLowerCase()] || m);
  }

  function speak(text, opts) {
    if (!synth || !text) return;
    opts = opts || {};
    const lang     = opts.lang     || (window.Lang ? window.Lang.bcp47() : 'fr-FR');
    const rate     = opts.rate     != null ? opts.rate     : 0.9;
    const pitch    = opts.pitch    != null ? opts.pitch    : 1.0;
    const volume   = opts.volume   != null ? opts.volume   : 1.0;
    const priority = opts.priority !== false; // default true (cancel-then-speak)
    if (priority) synth.cancel();
    const spoken = (lang || '').toLowerCase().startsWith('fr') ? respellFr(text) : text;
    const u = new SpeechSynthesisUtterance(spoken);
    u.lang = lang; u.rate = rate; u.pitch = pitch; u.volume = volume;
    const v = pickVoice(lang);
    if (v) u.voice = v;
    if (typeof opts.onEnd === 'function') {
      u.onend = opts.onEnd;
      u.onerror = opts.onEnd;
    }
    synth.speak(u);
  }

  function cancel() {
    if (synth) synth.cancel();
  }

  // Une voix navigateur existe-t-elle pour cette langue ? (exacte ou préfixe :
  // "ja-JP" matche "ja", "pt-BR" matche "pt-PT"). Factorisé 2026-08-11 depuis
  // mj-24/mj-20 qui dupliquaient chacun leur voices.find(...) maison.
  function hasVoiceFor(lang) {
    if (!synth || !lang) return false;
    return !!pickVoice(lang);
  }

  function supported() {
    return !!synth;
  }

  window.TTS = { speak, cancel, supported, hasVoiceFor, respellFr };
})();
