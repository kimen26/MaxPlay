// ─────────────────────────────────────────────────────────────────────────
//  mj-kit.js — BIBLIOTHÈQUE DE DESSIN & D'ACTIONS partagée des mini-jeux
//  (décision Papa Yann 2026-07-21 : « bibliothèques d'actions ou de dessin »)
//
//  Complète la pile standard : mj-shell (cadre) · mj-golden (piste) ·
//  celebrations/MaxFX (récompenses) · qcm-retry (retry) — ce kit factorise
//  les ÉLÉMENTS DE SCÈNE dupliqués entre jeux. Styles : css/mj-kit.css.
//
//  API (window.MJKit) :
//    oeuf(px, tint?)                  → élément œuf CSS (mj-46/49/53)
//    pastille(n)                      → pastille jaune numérotée de comptage
//    qcm(container, opts)             → gros boutons-chiffres + boucle QcmRetry
//         opts: { options:[..], correct, onCorrect(attempts, btn),
//                 onReveal(okBtn), onWrong(btn)?, big?:true }
//         gère ok/ko/disabled/révélation — le jeu ne câble plus rien.
//    calcLine(el, sentence, say?)     → affiche la phrase du calcul (+ TTS)
//    calcReset(el)                    → cache la phrase
//    avatarPool(exclusSupp?)          → chemins avatars « créatures » (manifeste
//         avatars.js, humeur joyeux, sans volcan/lave/œuf/vague/cendre/météorite)
//    decor(sceneEl, names?)           → pose des décors low-poly (img/decor/)
//         dans les coins libres de la scène, pointer-events none.
//         names ex ['volcan','fougere-g','fougere-d'] — défaut jungle douce.
//  Étendre = enrichir CE fichier (jamais de copie locale dans un jeu).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  // ── Dessins ──────────────────────────────────────────────────────────
  function oeuf(px, tint) {
    const e = document.createElement('div');
    e.className = 'mjk-oeuf';
    if (px) { e.style.width = px + 'px'; e.style.height = Math.round(px * 1.24) + 'px'; }
    if (tint) e.style.background = tint; // dégradé custom (œufs colorés mj-53)
    return e;
  }

  function pastille(n) {
    const p = document.createElement('span');
    p.className = 'mjk-pastille';
    p.textContent = n;
    return p;
  }

  // ── Actions : QCM gros boutons-chiffres (boucle QcmRetry complète) ───
  function qcm(container, opts) {
    container.innerHTML = '';
    container.classList.add('mjk-choices');
    container.classList.remove('hidden');
    const state = global.QcmRetry.create();
    let locked = false;
    (opts.options || []).forEach(v => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mjk-choice';
      b.textContent = v;
      if (v === opts.correct) b.dataset.correct = '1';
      b.addEventListener('click', () => {
        if (locked || b.disabled) return;
        const res = global.QcmRetry.handle(state, v === opts.correct);
        if (res.outcome === 'ignored') return;
        if (res.outcome === 'correct') {
          b.classList.add('ok');
          try { sndDing(); } catch (e) {}
          locked = true;
          opts.onCorrect && opts.onCorrect(res.attempts, b);
        } else if (res.outcome === 'reveal') {
          b.classList.add('ko'); b.disabled = true;
          try { sndBuzz(); } catch (e) {}
          const okEl = global.QcmRetry.revealCorrect(container);
          locked = true;
          opts.onReveal && opts.onReveal(okEl);
        } else {
          b.classList.add('ko'); b.disabled = true;
          try { sndBuzz(); } catch (e) {}
          opts.onWrong && opts.onWrong(b);
        }
      });
      container.appendChild(b);
    });
    return { get locked() { return locked; } };
  }

  // ── Phrase du calcul (« 10 et 4, ça fait 14 ! ») ─────────────────────
  function calcLine(el, sentence, say) {
    el.classList.add('mjk-calc');
    el.textContent = sentence;
    el.classList.add('show');
    if (say !== false) {
      try {
        if (global.TTS && TTS.speak) TTS.speak(sentence, { priority: true });
      } catch (e) {}
    }
  }
  function calcReset(el) {
    el.classList.remove('show');
    el.textContent = '';
  }

  // ── Avatars : pool « créatures » (scènes de jeu = avatars, règle 🔒) ─
  const AV_EXCLUS = ['oeuf', 'vague', 'cendre', 'lave', 'meteorite', 'volcan'];
  function avatarPool(exclusSupp) {
    const ban = AV_EXCLUS.concat(exclusSupp || []);
    return (global.MAXPLAY_AVATARS || [])
      .filter(a => ban.indexOf(a.id) === -1 && a.moods && a.moods.joyeux && a.moods.joyeux.length)
      .map(a => (global.MAXPLAY_AVATARS_BASE || 'img/avatars/') + a.moods.joyeux[0]);
  }

  // ── Décors low-poly (img/decor/) posés dans les coins libres ─────────
  // Chaque nom = { fichier, position } prédéfinis ; noms custom acceptés :
  // { src, style } bruts. Défaut : ambiance jungle douce.
  const DECORS = {
    'volcan':    { src: 'img/decor/volcan_fumant.png',  style: 'top:4px; right:-14px; width:clamp(90px,20vmin,150px); opacity:.85;' },
    'fougere-g': { src: 'img/decor/fougere.png',        style: 'bottom:-4px; left:-12px; width:clamp(60px,12vmin,100px); opacity:.9;' },
    'fougere-d': { src: 'img/decor/fougere.png',        style: 'bottom:-4px; right:-12px; width:clamp(60px,12vmin,100px); opacity:.9; transform:scaleX(-1);' },
    'cactus':    { src: 'img/decor/cactus.png',         style: 'bottom:-2px; right:2px; width:clamp(46px,10vmin,80px); opacity:.9;' },
    'nuage':     { src: 'img/decor/nuage_blanc.png',    style: 'top:8px; left:4px; width:clamp(60px,13vmin,110px); opacity:.7;' },
    'etoile':    { src: 'img/decor/etoile_filante.png', style: 'top:6px; right:8px; width:clamp(50px,11vmin,90px); opacity:.8;' },
    'buisson':   { src: 'img/decor/buisson_fleurs.png', style: 'bottom:-2px; left:-8px; width:clamp(54px,11vmin,90px); opacity:.9;' },
  };
  function decor(sceneEl, names) {
    (names || ['fougere-g', 'fougere-d']).forEach(n => {
      const d = DECORS[n] || (typeof n === 'object' ? n : null);
      if (!d) return;
      const img = document.createElement('img');
      img.className = 'mjk-decor';
      img.src = d.src;
      img.alt = '';
      img.style.cssText = d.style || '';
      sceneEl.appendChild(img);
    });
  }

  global.MJKit = { oeuf, pastille, qcm, calcLine, calcReset, avatarPool, decor };
})(window);
