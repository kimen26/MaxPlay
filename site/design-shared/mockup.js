/* ============================================================
   MaxPlay — socle JS commun des mockups jouables (démos 1 phase)
   Usage : <link rel="stylesheet" href="../design-shared/mockup.css">
           <script src="../design-shared/mockup.js"></script>
   Puis : MK.stars(); MK.say('Bravo !'); MK.speak('trouve le a'); …
   ============================================================ */
window.MK = (function () {
  'use strict';

  var FX_BASE = '../sounds/fx/';

  /* Ciel étoilé de fond (à appeler en début de script) */
  function stars(n) {
    n = n || 40;
    for (var s = 0; s < n; s++) {
      var st = document.createElement('div');
      st.className = 'bg-star';
      st.style.left = Math.random() * 100 + 'vw';
      st.style.top = Math.random() * 100 + 'vh';
      st.style.animationDelay = (Math.random() * 2.8) + 's';
      document.body.appendChild(st);
    }
  }

  /* Son d'effet depuis site/sounds/fx/ (nom sans chemin) — silencieux si absent */
  function sfx(name, vol) {
    try {
      var a = new Audio(FX_BASE + name);
      a.volume = (vol == null ? 0.55 : vol);
      a.play().catch(function () {});
    } catch (e) {}
  }

  /* Message feedback dans #message (pop, sans pénalité) */
  function say(text) {
    var m = document.getElementById('message');
    if (!m) return;
    m.textContent = text;
    m.classList.remove('show'); void m.offsetWidth; m.classList.add('show');
  }

  /* TTS démo (fr-FR, lent). Prod = MP3 ElevenLabs — voir NOTES §5.2.
     Délégué au TTS partagé js/tts.js (chargé à la demande s'il est absent). */
  var ttsLoading = false;
  function speak(text, opts) {
    try {
      opts = opts || {};
      if (window.TTS && TTS.speak) {
        TTS.speak(text, { rate: opts.rate || 0.85, pitch: opts.pitch || 1.1 });
        return;
      }
      if (ttsLoading) return;
      ttsLoading = true;
      var s = document.createElement('script');
      s.src = '../js/tts.js';
      s.onload = function () { speak(text, opts); };
      document.head.appendChild(s);
    } catch (e) {}
  }

  /* Epeler un son : 'sss' → prononciation phonétique approximative en démo */
  function speakSound(son) { speak(son, { rate: 0.6, pitch: 1.0 }); }

  /* Micro-animations partagées (rejouables) */
  function replay(el, cls) {
    el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
  }
  function wobble(el) { replay(el, 'wobble'); }
  function pop(el) { replay(el, 'pop'); }

  /* Marque une réponse gagnante + désactive les autres choix d'un conteneur */
  function win(el, container) {
    el.classList.add('win');
    if (container) {
      Array.prototype.forEach.call(container.querySelectorAll('button, .card, .tile'), function (b) {
        if (b !== el) { b.disabled = true; b.style.pointerEvents = 'none'; b.style.opacity = '.45'; }
      });
    }
  }

  /* Erreur douce : wobble + message qui enseigne (jamais punitif) */
  function non(el, texteQuiEnseigne) {
    wobble(el);
    sfx('oups-doux.mp3', 0.4);
    if (texteQuiEnseigne) say(texteQuiEnseigne);
  }

  /* Célébration overlay légère, se ferme au tap */
  function celebrate(text, soundName) {
    sfx(soundName || 'waouh.mp3');
    var d = document.createElement('div');
    d.className = 'mk-celebrate';
    d.textContent = text;
    d.addEventListener('click', function () { d.remove(); });
    document.body.appendChild(d);
    setTimeout(function () { if (d.parentNode) d.remove(); }, 2600);
  }

  /* Chemin avatar dino : MK.avatar('brachio','joyeux',2) → ../img/avatars/brachio_joyeux_2.png */
  function avatar(name, mood, num) {
    return '../img/avatars/' + name + '_' + (mood || 'joyeux') + '_' + (num || 1) + '.png';
  }

  return {
    stars: stars, sfx: sfx, say: say, speak: speak, speakSound: speakSound,
    wobble: wobble, pop: pop, win: win, non: non, celebrate: celebrate, avatar: avatar
  };
})();
