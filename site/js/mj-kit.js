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
//    shuffle(arr)                     → copie mélangée (Fisher-Yates), ne mute pas
//    pickDistinct(pool, n, excludeFn?)→ n éléments distincts au hasard depuis pool
//         excludeFn(item) → true pour exclure un élément du tirage.
//    PHONEMES                         → table SON (jamais nom de lettre) SUR-ENSEMBLE
//         partagée mj-50/51/52 (source mj-50, la plus complète). Une SEULE
//         occurrence par lettre — la répétition x3 (mmm/sss…) fait bafouiller
//         le TTS FR sur les consonnes non-continues (retour Papa Yann 2026-07-21).
//    sayPhoneme(letter, opts?)        → TTS.speak(PHONEMES[letter]||letter, {rate:0.6,
//         priority:true, ...opts}) — même son partout où une lettre est prononcée.
//  Étendre = enrichir CE fichier (jamais de copie locale dans un jeu).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  // ── Hasard : mélange & tirage (factorisé depuis ~21 jeux, 2026-07-25) ─
  function shuffle(arr) {
    const r = (arr || []).slice();
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  }

  function pickDistinct(pool, n, excludeFn) {
    const src = excludeFn ? (pool || []).filter(item => !excludeFn(item)) : (pool || []);
    return shuffle(src).slice(0, n);
  }

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
    // Verrouille TOUS les boutons de la question (pas seulement celui tapé) :
    // sans ça, un tap rapide (double-tap d'excitation, ou tap juste avant que
    // nextQuestion() ait reconstruit le DOM) peut retomber sur une vieille
    // tuile encore active et valider 2 questions d'un coup (bug remonté par
    // Papa Yann : "la 3e validation, je la refais 2 fois").
    function lockAll() {
      container.querySelectorAll('.mjk-choice').forEach(btn => { btn.disabled = true; });
    }
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
          locked = true;
          lockAll();
          b.classList.add('ok');
          try { sndDing(); } catch (e) {}
          opts.onCorrect && opts.onCorrect(res.attempts, b);
        } else if (res.outcome === 'reveal') {
          locked = true;
          lockAll();
          b.classList.add('ko');
          try { sndBuzz(); } catch (e) {}
          const okEl = global.QcmRetry.revealCorrect(container);
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

  // ── Phonèmes : LE son de chaque lettre (jamais son nom d'école) ──────
  // Source de vérité mj-50 (table la plus complète — voyelles simples,
  // consonnes continues èX, occlusives CV, h muet). mj-51/mj-52 en sont
  // des sous-ensembles harmonisés — même graphie partout (règle d'or).
  const PHONEMES = {
    a: 'a', e: 'eu', i: 'i', o: 'o', u: 'u',
    m: 'èm', s: 'ès', f: 'èf', l: 'èl', r: 'èr', v: 'èv', j: 'jeu', z: 'èz', n: 'èn',
    b: 'be', d: 'de', p: 'pe', t: 'te', c: 'ke', g: 'gue', h: 'h muet', k: 'ke', q: 'ke',
  };

  function sayPhoneme(letter, opts) {
    try {
      if (global.TTS && TTS.speak) {
        TTS.speak(PHONEMES[letter] || letter, Object.assign({ rate: 0.6, priority: true }, opts));
      }
    } catch (e) {}
  }

  // ── chain(id) : jeu précédent/suivant dans l'ordre du catalogue (chantier
  // NID, 2026-07-26). Source UNIQUE = window.MAXPLAY_CATALOG (catalog.js).
  // Ordre = celui des entrées de la MÊME catégorie (category), jeux 'html'
  // 'live' seulement (pas les outils encyclo/phaser/wip). Boucle en fin de
  // catégorie → 1er jeu de la catégorie suivante (wrap global en fin de liste).
  // Défensif : retourne {next:null, prev:null} si catalog absent/jeu absent.
  function chain(id) {
    const cat = global.MAXPLAY_CATALOG;
    if (!Array.isArray(cat) || !cat.length) return { next: null, prev: null };
    const eligible = cat.filter(c => c.type === 'html' && c.status === 'live');
    const i = eligible.findIndex(c => c.id === id);
    if (i === -1) return { next: null, prev: null };
    const n = eligible.length;
    const next = eligible[(i + 1) % n];
    const prev = eligible[(i - 1 + n) % n];
    return {
      next: next && next.id !== id ? next : null,
      prev: prev && prev.id !== id ? prev : null,
    };
  }

  global.MJKit = { shuffle, pickDistinct, oeuf, pastille, qcm, calcLine, calcReset, avatarPool, decor, PHONEMES, sayPhoneme, chain };
})(window);
