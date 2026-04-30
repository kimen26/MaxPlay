// ─────────────────────────────────────────────────────────────────────────────
// TTS — Web Speech API partagé (phase 1, 100% live)
// Usage :
//   <script src="js/tts.js"></script>
//   TTS.speak("Bonjour");                              // defaults: fr-FR, rate 0.9, cancel-then-speak
//   TTS.speak("Salut",  {rate:0.85, pitch:1.1});        // opts per appel
//   TTS.speak("Queued", {priority:false});              // ne cancel pas la file
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

  function speak(text, opts) {
    if (!synth || !text) return;
    opts = opts || {};
    const lang     = opts.lang     || 'fr-FR';
    const rate     = opts.rate     != null ? opts.rate     : 0.9;
    const pitch    = opts.pitch    != null ? opts.pitch    : 1.0;
    const volume   = opts.volume   != null ? opts.volume   : 1.0;
    const priority = opts.priority !== false; // default true (cancel-then-speak)
    if (priority) synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
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

  function supported() {
    return !!synth;
  }

  window.TTS = { speak, cancel, supported };
})();
