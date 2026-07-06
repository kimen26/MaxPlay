// ─────────────────────────────────────────────────────────────────────────
//  voice.js — Vraies voix pour les connectés, dame robot pour les autres
//
//  Concrétise la "Phase 2" annoncée dans tts.js : les phrases pré-générées
//  (ElevenLabs/Qwen3) remplacent la synthèse Web Speech ("la dame") quand :
//    1. un compte parent est connecté avec un profil enfant actif, ET
//    2. le MP3 de la phrase existe dans le manifest.
//  Sinon → fallback TTS.speak inchangé. Mode dégradé freemium intact.
//
//  ZÉRO modification des jeux : ce script PATCHE window.TTS.speak de façon
//  transparente. L'inclure APRÈS tts.js et cloud.js :
//    <script src="js/tts.js"></script>
//    <script src="js/cloud.js"></script>
//    <script src="js/voices-manifest.js"></script>  ← généré, window.MAXPLAY_VOICES
//    <script src="js/voice.js"></script>
//
//  Manifest (voices-manifest.js) : { "<clé normalisée>": "audio/voix/xxx.mp3" }
//  Clé = texte minuscule, sans accents ni ponctuation, espaces simples.
//
//  API : Voice.premiumActive() · Voice.hasClip(text) · Voice.normalize(text)
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  const TTS = global.TTS;
  if (!TTS) return; // tts.js absent → rien à patcher

  const _origSpeak  = TTS.speak.bind(TTS);
  const _origCancel = TTS.cancel.bind(TTS);
  let _audio = null;

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // accents
      .replace(/[^a-z0-9 ]+/g, ' ')                      // ponctuation
      .replace(/\s+/g, ' ').trim();
  }

  function premiumActive() {
    try { return !!(global.Cloud && global.Cloud.hasActiveChild()); }
    catch (e) { return false; }
  }

  function clipFor(text) {
    const m = global.MAXPLAY_VOICES;
    return (m && m[normalize(text)]) || null;
  }

  function hasClip(text) { return !!clipFor(text); }

  function stopClip() {
    if (_audio) { try { _audio.pause(); } catch (e) {} _audio = null; }
  }

  // ── Patch transparent de TTS.speak ──────────────────────────────────────
  TTS.speak = function (text, opts) {
    opts = opts || {};
    const clip = premiumActive() ? clipFor(text) : null;
    if (!clip) return _origSpeak(text, opts); // la dame robot, comme avant

    if (opts.priority !== false) { _origCancel(); stopClip(); }
    _audio = new Audio(clip);
    _audio.volume = opts.volume != null ? opts.volume : 1.0;
    if (typeof opts.onEnd === 'function') {
      _audio.onended = opts.onEnd;
      _audio.onerror = () => { _audio = null; _origSpeak(text, opts); }; // MP3 KO → fallback
    } else {
      _audio.onerror = () => { _audio = null; _origSpeak(text, opts); };
    }
    _audio.play().catch(() => _origSpeak(text, opts)); // autoplay bloqué → fallback
  };

  TTS.cancel = function () { stopClip(); _origCancel(); };

  global.Voice = { premiumActive, hasClip, normalize };
})(window);
