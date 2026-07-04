// ─────────────────────────────────────────────────────────────────────────
//  celebrate.js — Couche célébration partagée MaxPlay
//  Confettis canvas + sons (klaxon 1/20 = prout, règle culte) + étoile volante.
//
//  Usage : <script src="js/celebrate.js"></script>
//  API   : Celebrate.confetti(opts) · Celebrate.honk() · Celebrate.victory()
//          Celebrate.flyStar(fromEl, toEl, done)
//
//  Sons : réutilise site/sounds/ existants (Max les connaît — décision 2026-07-04,
//  identité sonore conservée). Aucun son fort soudain sans action de l'enfant.
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  const SND = {
    honk:    'sounds/honk-sound.mp3',
    fart:    'sounds/perfect-fart.mp3',       // klaxon-prout 1/20
    victory: 'sounds/Gagné.mp3',
    coin:    'sounds/mario coin hit.mp3',
    doors:   'sounds/freesound_community-bus-doors-sound-effect-44034.mp3',
    pop:     'sounds/freesound_community-bus-pop-85054.mp3',
  };

  const pool = {};
  function play(name, volume = 1) {
    try {
      if (!SND[name]) return;
      if (!pool[name]) { pool[name] = new Audio(SND[name]); pool[name].preload = 'auto'; }
      const a = pool[name];
      a.currentTime = 0;
      a.volume = volume;
      a.play().catch(() => {}); // autoplay policy : silencieux si pas d'interaction
    } catch (e) { /* audio jamais bloquant */ }
  }

  // ─── Confettis canvas (léger : 1 canvas jetable, transform/opacity only) ──
  const COLORS = ['#ffe066', '#00c47a', '#ff7043', '#5ed4ff', '#a044ff', '#ff4455'];

  function confetti(opts = {}) {
    const count = opts.count || 90;
    const dur = opts.duration || 1800;
    const cv = document.createElement('canvas');
    cv.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998';
    cv.width = innerWidth;
    cv.height = innerHeight;
    document.body.appendChild(cv);
    const ctx = cv.getContext('2d');

    const parts = Array.from({ length: count }, () => ({
      x: Math.random() * cv.width,
      y: -20 - Math.random() * cv.height * 0.4,
      w: 7 + Math.random() * 7,
      h: 5 + Math.random() * 5,
      vy: 2.2 + Math.random() * 3.2,
      vx: -1.4 + Math.random() * 2.8,
      rot: Math.random() * Math.PI,
      vr: -0.12 + Math.random() * 0.24,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const t0 = performance.now();
    (function frame(t) {
      const el = t - t0;
      ctx.clearRect(0, 0, cv.width, cv.height);
      const fade = el > dur * 0.7 ? 1 - (el - dur * 0.7) / (dur * 0.3) : 1;
      ctx.globalAlpha = Math.max(0, fade);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (el < dur) requestAnimationFrame(frame);
      else cv.remove();
    })(t0);
  }

  // ─── Klaxon d'arrivée — 1 fois sur 20 c'est le prout (règle culte) ───────
  function honk() {
    if (Math.random() < 0.05) play('fart', 0.9);
    else play('honk', 0.7);
  }

  // ─── Victoire complète : confettis + son ─────────────────────────────────
  function victory(opts = {}) {
    confetti(opts);
    play('victory', 0.9);
  }

  // ─── Étoile qui vole d'un élément vers un autre (compteur) ──────────────
  function flyStar(fromEl, toEl, done) {
    const a = fromEl.getBoundingClientRect();
    const b = toEl.getBoundingClientRect();
    const s = document.createElement('div');
    s.textContent = '★';
    s.style.cssText =
      'position:fixed;z-index:9999;pointer-events:none;font-size:2.4rem;' +
      'color:#ffd633;filter:drop-shadow(0 0 12px #ffd633aa);' +
      `left:${a.left + a.width / 2}px;top:${a.top + a.height / 2}px;` +
      'transform:translate(-50%,-50%);transition:all .8s cubic-bezier(.3,-0.2,.4,1)';
    document.body.appendChild(s);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      s.style.left = (b.left + b.width / 2) + 'px';
      s.style.top = (b.top + b.height / 2) + 'px';
      s.style.fontSize = '1rem';
    }));
    setTimeout(() => { s.remove(); if (done) done(); }, 850);
  }

  global.Celebrate = { confetti, honk, victory, flyStar, play };
})(window);
