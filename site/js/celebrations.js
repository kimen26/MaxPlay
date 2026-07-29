/* ═══════════════════════════════════════════════════════════════════════
   MaxFX — module de célébrations MaxPlay
   Vanilla JS, zéro dépendance. Sélection validée juillet 2026.

   API :
     MaxFX.markPoint(fromEl, toEl, opts?) → Promise
        opts.style  : 'bounce' | 'lightning' | 'rocket' | 'rainbow' | 'coin'
                    | 'magnet' | 'pinball' | 'teleport' | 'bubble'
                    | 'trampoline' | 'paw' | 'comet' | 'balloon' | 'ressort'
                    | 'liane' | 'popcorn' | 'helico' | 'roulade'
        opts.result : 'green' (1er coup) | 'orange' (après essai) | 'red' (aidé/échec)
        opts.badge  : caractère affiché dans la pastille ('✓' déf., '✗' si red)
        opts.container : élément englobant pour l'overlay (déf. : ancêtre commun)

     MaxFX.finalStar(container, opts?) → Promise
        opts.style  : 'cinematic' | 'rain' | 'supernova' | 'disco'
                    | 'constellation' | 'tracer' | 'aurora' | 'ovation'
                    | 'spiral' | 'billard' | 'moonwalk' | 'breathe' | 'flip'
                    | 'orbit' | 'heartbeat' | 'slingshot' | 'rainbowspin' | 'stardust'
                    | 'galton' | 'feuartifice' | 'ballonpop' | 'tornade'
        opts.label   : texte final ('GAGNÉ !' déf. ; '' = aucun)
        opts.name    : pseudo pour 'ovation' (déf. : aucun prénom en dur)
        opts.avatars : émojis mascottes pour 'ovation' (déf. ['🦖','🦕','🦣','🐣'])
        opts.slotEl  : élément "empreinte" du carnet — pour 'slingshot' et
                       'stardust', l'étoile finit SA course dedans.

     MaxFX.glow(el, opts?) → Animation   (la "respiration" 9e, réutilisable
        sur n'importe quel élément : bouton, carte, pastille…)

   Thème : surcharge possible via variables CSS sur :root —
     --fx-green, --fx-orange, --fx-red, --fx-gold, --fx-accent
   ═══════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  /* ── couleurs ─────────────────────────────────────────────────────── */
  var DEF = { green: '#2fbf8f', orange: '#f2a25c', red: '#e06a5a', gold: '#ffd166', accent: '#7fb4ff' };
  function themeColors() {
    var cs = getComputedStyle(document.documentElement);
    function v(n, fb) { var x = cs.getPropertyValue('--fx-' + n).trim(); return x || fb; }
    return {
      green: v('green', DEF.green), orange: v('orange', DEF.orange),
      red: v('red', DEF.red), gold: v('gold', DEF.gold), accent: v('accent', DEF.accent)
    };
  }

  /* ── helpers DOM ──────────────────────────────────────────────────── */
  function makeOverlay(container) {
    var fixed = (container === document.body);
    if (!fixed && getComputedStyle(container).position === 'static') container.style.position = 'relative';
    var o = document.createElement('div');
    o.style.cssText = 'position:' + (fixed ? 'fixed' : 'absolute') + ';inset:0;pointer-events:none;overflow:hidden;z-index:60;';
    container.appendChild(o);
    return o;
  }
  function center(el, ov) {
    var a = el.getBoundingClientRect(), b = ov.getBoundingClientRect();
    return { x: a.left + a.width / 2 - b.left, y: a.top + a.height / 2 - b.top };
  }
  function mk(ov, css, txt) {
    var d = document.createElement('div');
    d.style.cssText = 'position:absolute;pointer-events:none;' + css;
    if (txt) d.textContent = txt;
    ov.appendChild(d);
    return d;
  }
  function at(x, y, s) {
    return 'left:' + (x - s / 2) + 'px;top:' + (y - s / 2) + 'px;width:' + s + 'px;height:' + s +
      'px;display:flex;align-items:center;justify-content:center;';
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function anim(node, frames, opts) {
    var a = node.animate(frames, opts);
    return a.finished.catch(function () {});
  }
  function commonContainer(a, b) {
    var n = a.parentElement;
    while (n && n !== document.body) { if (n.contains(b)) return n; n = n.parentElement; }
    return document.body;
  }
  /* échantillonne une courbe de Bézier quadratique en keyframes WAAPI */
  function qFrames(p0, c, p1, n, extra) {
    var out = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, m = 1 - t;
      var x = m * m * p0.x + 2 * m * t * c.x + t * t * p1.x;
      var y = m * m * p0.y + 2 * m * t * c.y + t * t * p1.y;
      var f = { transform: 'translate(' + (x - p0.x) + 'px,' + (y - p0.y) + 'px)' + (extra ? extra(t) : '') };
      out.push(f);
    }
    return out;
  }

  /* ── moteur de particules canvas (traînes, gerbes, confettis) ─────── */
  function makeFx(ov) {
    var c = document.createElement('canvas');
    var r = ov.getBoundingClientRect();
    c.width = Math.max(r.width, 10); c.height = Math.max(r.height, 10);
    c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
    ov.appendChild(c);
    var ctx = c.getContext('2d'), parts = [], raf = null;
    function tick() {
      ctx.clearRect(0, 0, c.width, c.height);
      var alive = false;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (p.life <= 0) continue;
        alive = true;
        if (p.kind === 'conf') {
          p.y += p.vy; p.ph += 0.045; p.rot += p.vr; p.life -= p.dl;
          if (p.y > c.height + 20) p.life = 0;
          var x = p.x + Math.sin(p.ph) * p.sw * 0.4;
          ctx.globalAlpha = Math.max(Math.min(p.life * 2, 1), 0) * 0.95;
          ctx.save(); ctx.translate(x, p.y); ctx.rotate(p.rot);
          ctx.scale(1, 0.4 + 0.6 * Math.abs(Math.sin(p.ph * 1.4)));
          ctx.fillStyle = p.col; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
        } else {
          p.x += p.vx; p.y += p.vy;
          p.vy += p.g != null ? p.g : 0.05;
          p.vx *= 0.98; p.life -= p.dl;
          ctx.globalAlpha = Math.max(p.life, 0);
          ctx.fillStyle = p.col;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.4 + p.life * 0.6), 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (alive) raf = requestAnimationFrame(tick); else { raf = null; ctx.clearRect(0, 0, c.width, c.height); }
    }
    function run() { if (!raf) raf = requestAnimationFrame(tick); }
    return {
      el: c,
      burst: function (x, y, n, cols, pow) {
        for (var i = 0; i < n; i++) {
          var a = Math.PI * 2 * i / n + Math.random() * 0.35;
          var v = (pow || 3) * (0.55 + Math.random() * 0.7);
          parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, dl: 0.012 + Math.random() * 0.008, r: 2 + Math.random() * 2.2, col: cols[(Math.random() * cols.length) | 0] });
        }
        run();
      },
      trail: function (x, y, col, n) {
        for (var i = 0; i < (n || 2); i++)
          parts.push({ x: x, y: y, vx: (Math.random() - 0.5) * 1.6, vy: (Math.random() - 0.5) * 1.6, life: 0.55, dl: 0.035, r: 1.6 + Math.random() * 1.6, col: col, g: 0 });
        run();
      },
      fountain: function (x, dir, n, cols) {
        for (var i = 0; i < n; i++)
          parts.push({ x: x + (Math.random() - 0.5) * 16, y: c.height + 8, vx: dir * (0.4 + Math.random() * 1.6), vy: -(7.5 + Math.random() * 3.5), life: 1, dl: 0.007 + Math.random() * 0.004, r: 2 + Math.random() * 2.2, col: cols[(Math.random() * cols.length) | 0] });
        run();
      },
      confetti: function (n, cols) {
        for (var i = 0; i < n; i++)
          parts.push({ kind: 'conf', x: Math.random() * c.width, y: -20 - Math.random() * 240, vy: 1.1 + Math.random() * 1.3, ph: Math.random() * Math.PI * 2, sw: 24 + Math.random() * 30, w: 7 + Math.random() * 5, h: 4 + Math.random() * 3, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.16, life: 1, dl: 0.0035, col: cols[(Math.random() * cols.length) | 0] });
        run();
      },
      stop: function () { if (raf) cancelAnimationFrame(raf); parts.length = 0; }
    };
  }

  /* ── arrivée commune : la pastille "pop" + onde CENTRÉE dessus ────── */
  function arrive(ov, p1, col, badge) {
    var ring = mk(ov, at(p1.x, p1.y, 40) + 'border-radius:50%;border:3px solid ' + col + ';');
    anim(ring, [
      { transform: 'scale(.2)', opacity: 0.95 },
      { transform: 'scale(2.2)', opacity: 0 }
    ], { duration: 550, easing: 'ease-out', fill: 'forwards' });
    var b = mk(ov, at(p1.x, p1.y, 38) + 'border-radius:50%;background:' + col +
      ';color:#fff;font:900 17px/1 system-ui;box-shadow:0 0 16px ' + col + ';', badge);
    return anim(b, [
      { transform: 'scale(0) rotate(-40deg)', opacity: 0 },
      { transform: 'scale(1.35) rotate(8deg)', opacity: 1, offset: 0.55 },
      { transform: 'scale(.92)', offset: 0.75 },
      { transform: 'scale(1)' }
    ], { duration: 550, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'forwards' });
  }

  /* ── les 18 remontées ─────────────────────────────────────────────── */
  var MARKS = {

    /* 6a/7a — jeton physique : gravité + rebonds sur les bords + traîne */
    bounce: function (ov, fxp, p0, p1, col, badge) {
      return new Promise(function (resolve) {
        var W = ov.clientWidth;
        var glyphEl = mk(ov, at(p0.x, p0.y, 32) + 'border-radius:50%;background:' + col +
          ';color:#fff;font:900 16px/1 system-ui;box-shadow:0 0 14px ' + col + ';', badge);
        var j = { x: p0.x, y: p0.y - 20, vx: (Math.random() < 0.5 ? -1 : 1) * (3.2 + Math.random() * 2), vy: -8.6, sq: 0, t0: performance.now() };
        (function step() {
          var age = performance.now() - j.t0;
          j.x += j.vx; j.y += j.vy; j.vy += 0.34; j.sq = Math.max(j.sq - 0.06, 0);
          function hit(nx, ny) { j.sq = 0.45; fxp.burst(j.x, j.y, 10, [col, '#ffffff'], 2.4); }
          if (j.x < 24 && j.vx < 0) { j.vx = -j.vx * 0.72; j.x = 24; hit(1, 0); }
          if (j.x > W - 24 && j.vx > 0) { j.vx = -j.vx * 0.72; j.x = W - 24; hit(-1, 0); }
          if (j.y < 30 && j.vy < 0) { j.vy = -j.vy * 0.6; j.y = 30; hit(0, 1); }
          if (age > 750) {
            var dx = p1.x - j.x, dy = p1.y - j.y, d = Math.hypot(dx, dy);
            if (d < 16 || age > 2200) { glyphEl.remove(); resolve(); return; }
            j.vx += dx / d * 0.75; j.vy += dy / d * 0.75 - 0.34;
            var sp = Math.hypot(j.vx, j.vy);
            if (sp > 8.5) { j.vx *= 8.5 / sp; j.vy *= 8.5 / sp; }
          }
          fxp.trail(j.x, j.y, col);
          glyphEl.style.left = (j.x - 16) + 'px';
          glyphEl.style.top = (j.y - 16) + 'px';
          glyphEl.style.transform = 'scale(' + (1 + j.sq) + ',' + (1 - j.sq) + ')';
          requestAnimationFrame(step);
        })();
      });
    },

    /* 8a — l'éclair : segments jaunes le long du trajet + flash */
    lightning: function (ov, fxp, p0, p1, col) {
      var flash = mk(ov, 'inset:0;background:radial-gradient(circle at ' + p1.x + 'px ' + p1.y + 'px, rgba(255,255,214,.85), transparent 62%);');
      anim(flash, [{ opacity: 0.55 }, { opacity: 0 }], { duration: 450, delay: 220, easing: 'ease-out', fill: 'forwards' });
      var segs = 4, ps = [];
      for (var i = 0; i <= segs; i++) {
        var t = i / segs;
        ps.push({ x: p0.x + (p1.x - p0.x) * t + (i > 0 && i < segs ? (i % 2 ? 14 : -14) : 0), y: p0.y + (p1.y - p0.y) * t });
      }
      ps.forEach(function (p, i) {
        if (!i) return;
        var q = ps[i - 1];
        var len = Math.hypot(p.x - q.x, p.y - q.y), ang = Math.atan2(p.y - q.y, p.x - q.x);
        var seg = mk(ov, 'left:' + q.x + 'px;top:' + q.y + 'px;width:' + len + 'px;height:8px;border-radius:4px;background:#ffe28f;box-shadow:0 0 14px 3px rgba(255,226,143,.8);transform:rotate(' + ang + 'rad);transform-origin:0 50%;opacity:0;');
        anim(seg, [
          { opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }
        ], { duration: 420, delay: (i - 1) * 55, easing: 'ease-out', fill: 'forwards' });
      });
      return wait(360);
    },

    /* 8b — la fusée : tremble au décollage, fumée, monte */
    rocket: function (ov, fxp, p0, p1, col) {
      var r = mk(ov, at(p0.x, p0.y, 30) + 'font-size:26px;', '🚀');
      r.style.transform = 'rotate(-45deg)';
      var dx = p1.x - p0.x, dy = p1.y - p0.y;
      var pr = anim(r, [
        { transform: 'translate(0,0) rotate(-45deg) scale(.8)' },
        { transform: 'translate(-2px,-6px) rotate(-45deg)', offset: 0.1 },
        { transform: 'translate(2px,-9px) rotate(-45deg)', offset: 0.16 },
        { transform: 'translate(-2px,-12px) rotate(-45deg)', offset: 0.22 },
        { transform: 'translate(' + dx * 0.3 + 'px,' + dy * 0.4 + 'px) rotate(-44deg)', offset: 0.62 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(-45deg) scale(.7)' }
      ], { duration: 1300, easing: 'cubic-bezier(.6,0,.7,1)', fill: 'forwards' });
      var smoke = setInterval(function () {
        var b = r.getBoundingClientRect(), o = ov.getBoundingClientRect();
        fxp.trail(b.left + b.width / 2 - o.left, b.top + b.height - o.top, 'rgba(200,210,230,.6)', 3);
      }, 90);
      return pr.then(function () { clearInterval(smoke); r.remove(); });
    },

    /* 8d — le pont arc-en-ciel : les plots colorés se posent, le jeton glisse */
    rainbow: function (ov, fxp, p0, p1, col, badge) {
      var cols = ['#e05a5a', '#f2a25c', '#ffd166', '#7ec850', '#57c6e0', '#c9a4ff'];
      var ctrl = { x: (p0.x + p1.x) / 2 - 70, y: Math.min(p0.y, p1.y) - 60 };
      var n = 6;
      for (var i = 0; i < n; i++) {
        (function (i) {
          var t = (i + 1) / (n + 1), m = 1 - t;
          var x = m * m * p0.x + 2 * m * t * ctrl.x + t * t * p1.x;
          var y = m * m * p0.y + 2 * m * t * ctrl.y + t * t * p1.y;
          var dot = mk(ov, at(x, y, 13) + 'border-radius:50%;background:' + cols[i] + ';box-shadow:0 0 10px ' + cols[i] + ';');
          anim(dot, [
            { transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1.3)', opacity: 1, offset: 0.6 }, { transform: 'scale(1)' }
          ], { duration: 300, delay: i * 90, easing: 'ease-out', fill: 'forwards' });
          anim(dot, [{ opacity: 1 }, { opacity: 0 }], { duration: 400, delay: 1450, fill: 'forwards' });
        })(i);
      }
      var jet = mk(ov, at(p0.x, p0.y, 30) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 15px/1 system-ui;box-shadow:0 0 12px ' + col + ';', badge);
      return wait(560).then(function () {
        return anim(jet, qFrames(p0, ctrl, p1, 14), { duration: 1000, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' });
      }).then(function () { jet.remove(); });
    },

    /* 8e — la pièce d'or : triple pirouette rotateX en montant */
    coin: function (ov, fxp, p0, p1) {
      var C = themeColors();
      var c = mk(ov, at(p0.x, p0.y, 30) + 'border-radius:50%;background:radial-gradient(circle at 35% 30%, #ffe9a8, ' + C.gold + ' 60%, #c8951f);border:2px solid #a87b12;box-shadow:0 0 14px rgba(255,209,102,.5);');
      var dx = p1.x - p0.x, dy = p1.y - p0.y;
      return anim(c, [
        { transform: 'translate(0,0) rotateX(0)' },
        { transform: 'translate(' + dx * 0.2 + 'px,' + dy * 0.62 + 'px) rotateX(540deg)', offset: 0.3 },
        { transform: 'translate(' + dx * 0.35 + 'px,' + dy * 0.76 + 'px) rotateX(720deg)', offset: 0.45 },
        { transform: 'translate(' + dx * 0.5 + 'px,' + dy * 0.66 + 'px) rotateX(720deg)', offset: 0.58 },
        { transform: 'translate(' + dx * 0.9 + 'px,' + dy * 0.93 + 'px) rotateX(1050deg) scale(.9)', offset: 0.8 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) rotateX(1080deg)' }
      ], { duration: 1500, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'forwards' })
        .then(function () { fxp.burst(p1.x, p1.y, 10, [C.gold, '#fff3d1'], 2.2); c.remove(); });
    },

    /* 8f — l'aspiration : le jeton s'étire vers la pastille (sans aimant) */
    magnet: function (ov, fxp, p0, p1, col, badge) {
      var j = mk(ov, at(p0.x, p0.y, 30) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 15px/1 system-ui;box-shadow:0 0 12px ' + col + ';', badge);
      var dx = p1.x - p0.x, dy = p1.y - p0.y;
      var ang = Math.atan2(dy, dx) + Math.PI / 2;
      var rot = 'rotate(' + ang + 'rad)';
      var unrot = 'rotate(' + (-ang) + 'rad)';
      j.style.transform = rot;
      j.firstChild && (j.style.font = '900 15px/1 system-ui');
      var ring = mk(ov, at(p1.x, p1.y, 54) + 'border-radius:50%;border:2px solid ' + col + ';opacity:.6;');
      anim(ring, [{ transform: 'scale(1)', opacity: 0.6 }, { transform: 'scale(.2)', opacity: 0 }], { duration: 700, iterations: 2, easing: 'ease-in' });
      return anim(j, [
        { transform: 'translate(0,0) ' + rot + ' scale(1,1)' },
        { transform: 'translate(' + dx * 0.06 + 'px,' + dy * 0.06 + 'px) ' + rot + ' scale(.85,1.2)', offset: 0.3 },
        { transform: 'translate(' + dx * 0.55 + 'px,' + dy * 0.55 + 'px) ' + rot + ' scale(.4,1.8)', offset: 0.7 },
        { transform: 'translate(' + dx * 0.92 + 'px,' + dy * 0.92 + 'px) ' + rot + ' scale(.3,1.4)', offset: 0.86 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) ' + rot + ' scale(.6,.6)', offset: 0.94 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) ' + rot + ' scale(1,1)' }
      ], { duration: 1300, easing: 'cubic-bezier(.5,0,.8,.5)', fill: 'forwards' })
        .then(function () { ring.remove(); j.remove(); });
    },

    /* 8g — le flipper : 2 bumpers lumineux sur le chemin */
    pinball: function (ov, fxp, p0, p1, col) {
      var C = themeColors();
      var b1 = { x: p0.x - 62, y: p0.y - (p0.y - p1.y) * 0.35 };
      var b2 = { x: p0.x + 62, y: p0.y - (p0.y - p1.y) * 0.62 };
      [b1, b2].forEach(function (b, i) {
        var d = mk(ov, at(b.x, b.y, 30) + 'border-radius:50%;border:3px solid ' + (i ? '#57e6e6' : '#ff7ac8') + ';background:rgba(255,255,255,.06);box-shadow:0 0 12px ' + (i ? '#57e6e6' : '#ff7ac8') + ';opacity:0;');
        anim(d, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
        anim(d, [{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 280, delay: 380 + i * 400, easing: 'ease-out' });
        anim(d, [{ opacity: 1 }, { opacity: 0 }], { duration: 350, delay: 1400, fill: 'forwards' });
      });
      var ball = mk(ov, at(p0.x, p0.y, 26) + 'border-radius:50%;background:radial-gradient(circle at 35% 30%, #fff, #9fb2d6 60%, #46525f);box-shadow:0 0 12px rgba(255,255,255,.5);');
      function seg(from, to) {
        return { x: to.x - p0.x, y: to.y - p0.y };
      }
      var s1 = seg(p0, b1), s2 = seg(p0, b2), s3 = { x: p1.x - p0.x, y: p1.y - p0.y };
      return anim(ball, [
        { transform: 'translate(0,0)' },
        { transform: 'translate(' + s1.x + 'px,' + s1.y + 'px) scale(1.2)', offset: 0.28 },
        { transform: 'translate(' + s2.x + 'px,' + s2.y + 'px) scale(1.2)', offset: 0.56 },
        { transform: 'translate(' + (s3.x - 10) + 'px,' + (s3.y + 8) + 'px)', offset: 0.84 },
        { transform: 'translate(' + s3.x + 'px,' + s3.y + 'px)' }
      ], { duration: 1400, easing: 'linear', fill: 'forwards' })
        .then(function () {
          fxp.burst(p1.x, p1.y, 12, ['#57e6e6', '#fff'], 2.4);
          ball.remove();
        });
    },

    /* 8h — le téléporteur : implosion → pop dans la pastille */
    teleport: function (ov, fxp, p0, p1, col, badge) {
      var C = themeColors();
      var j = mk(ov, at(p0.x, p0.y, 30) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 15px/1 system-ui;box-shadow:0 0 12px ' + col + ';', badge);
      var swirl = mk(ov, at(p0.x, p0.y, 44) + 'border-radius:50%;border:2px dashed #c9a4ff;');
      anim(swirl, [
        { transform: 'rotate(0) scale(1)', opacity: 1 },
        { transform: 'rotate(360deg) scale(0)', opacity: 0 }
      ], { duration: 500, easing: 'ease-in', fill: 'forwards' });
      return anim(j, [
        { transform: 'scale(1) rotate(0)', opacity: 1 },
        { transform: 'scale(0) rotate(360deg)', opacity: 0 }
      ], { duration: 450, easing: 'cubic-bezier(.6,0,.9,.5)', fill: 'forwards' })
        .then(function () {
          j.remove(); swirl.remove();
          var portal = mk(ov, at(p1.x, p1.y, 50) + 'border-radius:50%;border:3px solid #c9a4ff;');
          return anim(portal, [
            { transform: 'scale(.2)', opacity: 0.95 }, { transform: 'scale(1.6)', opacity: 0 }
          ], { duration: 550, easing: 'ease-out', fill: 'forwards' }).then(function () { portal.remove(); });
        });
    },

    /* 8i — la bulle de savon : montée ondulante, POP en gouttelettes */
    bubble: function (ov, fxp, p0, p1, col, badge) {
      var wrap = mk(ov, at(p0.x, p0.y, 46));
      var skin = mk(wrap, 'inset:0;border-radius:50%;border:2px solid rgba(255,255,255,.65);background:radial-gradient(circle at 32% 26%, rgba(255,255,255,.55), rgba(127,180,255,.1) 60%);');
      mk(wrap, at(23, 23, 22) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 12px/1 system-ui;', badge);
      var dx = p1.x - p0.x, dy = p1.y - p0.y;
      var fr = [];
      for (var i = 0; i <= 10; i++) {
        var t = i / 10;
        fr.push({ transform: 'translate(' + (dx * t + Math.sin(t * Math.PI * 3) * 16) + 'px,' + dy * t + 'px)' });
      }
      return anim(wrap, fr, { duration: 2000, easing: 'ease-in-out', fill: 'forwards' })
        .then(function () {
          for (var k = 0; k < 6; k++) {
            var a = Math.PI * 2 * k / 6;
            fxp.trail(p1.x + Math.cos(a) * 6, p1.y + Math.sin(a) * 6, 'rgba(180,215,255,.9)', 2);
          }
          fxp.burst(p1.x, p1.y, 8, ['rgba(180,215,255,.9)', '#ffffff'], 2);
          wrap.remove();
        });
    },

    /* 8j — le trampoline : double impulsion + salto */
    trampoline: function (ov, fxp, p0, p1, col, badge) {
      var tramp = mk(ov, 'left:' + (p0.x - 37) + 'px;top:' + (p0.y + 30) + 'px;width:74px;height:16px;border-radius:50%;background:rgba(24,35,56,.9);border:3px solid ' + themeColors().accent + ';box-sizing:border-box;box-shadow:0 0 12px rgba(127,180,255,.4);');
      anim(tramp, [
        { transform: 'scaleY(1)' }, { transform: 'scaleY(.45)', offset: 0.14 }, { transform: 'scaleY(1.15)', offset: 0.22 },
        { transform: 'scaleY(1)', offset: 0.4 }, { transform: 'scaleY(.4)', offset: 0.46 }, { transform: 'scaleY(1.2)', offset: 0.54 }, { transform: 'scaleY(1)' }
      ], { duration: 1600, fill: 'forwards' });
      anim(tramp, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: 1500, fill: 'forwards' });
      var j = mk(ov, at(p0.x, p0.y, 30) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 15px/1 system-ui;box-shadow:0 0 12px ' + col + ';', badge);
      var dx = p1.x - p0.x, dy = p1.y - p0.y;
      return anim(j, [
        { transform: 'translate(0,0)' },
        { transform: 'translate(0,38px) scale(1.3,.6)', offset: 0.14 },
        { transform: 'translate(0,26px) scale(.9,1.15)', offset: 0.2 },
        { transform: 'translate(0,-30px)', offset: 0.34 },
        { transform: 'translate(0,34px) scale(1.45,.5)', offset: 0.46 },
        { transform: 'translate(0,20px) scale(.85,1.2)', offset: 0.52 },
        { transform: 'translate(' + dx * 0.5 + 'px,' + (dy - 30) + 'px) rotate(360deg)', offset: 0.72 },
        { transform: 'translate(' + dx + 'px,' + (dy + 6) + 'px) scale(1.1,.9) rotate(360deg)', offset: 0.86 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1) rotate(360deg)' }
      ], { duration: 1600, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'forwards' })
        .then(function () { tramp.remove(); j.remove(); });
    },

    /* 7b — les empreintes de patte qui "marchent" jusqu'à la pastille */
    paw: function (ov, fxp, p0, p1, col) {
      var n = 4;
      for (var i = 0; i < n; i++) {
        (function (i) {
          var t = (i + 1) / (n + 1);
          var x = p0.x + (p1.x - p0.x) * t + (i % 2 ? 16 : -16);
          var y = p0.y + (p1.y - p0.y) * t;
          var paw = mk(ov, at(x, y, 24) + 'font-size:18px;filter:hue-rotate(250deg) saturate(1.6) drop-shadow(0 0 6px ' + col + ');', '🐾');
          paw.style.transform = 'rotate(' + (i % 2 ? 12 : -12) + 'deg) scale(0)';
          anim(paw, [
            { transform: 'rotate(' + (i % 2 ? 12 : -12) + 'deg) scale(0)', opacity: 0 },
            { transform: 'rotate(' + (i % 2 ? 6 : -6) + 'deg) scale(1.3)', opacity: 1, offset: 0.6 },
            { transform: 'rotate(' + (i % 2 ? 12 : -12) + 'deg) scale(1)', opacity: 1 }
          ], { duration: 380, delay: i * 240, easing: 'ease-out', fill: 'forwards' });
          anim(paw, [{ opacity: 1 }, { opacity: 0 }], { duration: 500, delay: 1500, fill: 'forwards' });
        })(i);
      }
      return wait(n * 240 + 300);
    },

    /* 7e — la comète : boule lumineuse + traîne de feu, trajectoire courbe */
    comet: function (ov, fxp, p0, p1) {
      var C = themeColors();
      var head = mk(ov, at(p0.x, p0.y, 18) + 'border-radius:50%;background:#fff3d1;box-shadow:0 0 18px 5px rgba(255,209,102,.7);');
      var ctrl = { x: (p0.x + p1.x) / 2 - 70, y: Math.min(p0.y, p1.y) - 90 };
      var fr = qFrames(p0, ctrl, p1, 16, function (t) { return ' scale(' + (1 - t * 0.3) + ')'; });
      var pr = anim(head, fr, { duration: 1100, easing: 'cubic-bezier(.5,0,.6,1)', fill: 'forwards' });
      var iv = setInterval(function () {
        var b = head.getBoundingClientRect(), o = ov.getBoundingClientRect();
        fxp.trail(b.left + b.width / 2 - o.left, b.top + b.height / 2 - o.top, C.gold, 3);
      }, 40);
      return pr.then(function () { clearInterval(iv); head.remove(); });
    },

    /* 10a — le ballon : gonfle, emporte le jeton en ondulant, POP à l'arrivée */
    balloon: function (ov, fxp, p0, p1, col, badge) {
      var wrap = mk(ov, at(p0.x, p0.y, 40));
      var bl = mk(wrap, 'left:-6px;top:6px;width:52px;height:60px;font-size:44px;', '🎈');
      var j = mk(wrap, at(20, 20, 26) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 13px/1 system-ui;box-shadow:0 0 10px ' + col + ';', badge);
      var dx = p1.x - p0.x, dy = p1.y - p0.y;
      var fr = [];
      for (var i = 0; i <= 12; i++) {
        var t = i / 12;
        fr.push({ transform: 'translate(' + (dx * t + Math.sin(t * 7) * 18 * (1 - t)) + 'px,' + (dy * t - Math.sin(t * Math.PI) * 30) + 'px)' });
      }
      anim(bl, [
        { transform: 'scale(.4)' }, { transform: 'scale(1.15)', offset: 0.7 }, { transform: 'scale(1)' }
      ], { duration: 600, easing: 'ease-out', fill: 'backwards' });
      return anim(wrap, fr, { duration: 1900, delay: 250, easing: 'ease-in-out', fill: 'forwards' })
        .then(function () {
          anim(bl, [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(1.6)', opacity: 1, offset: 0.5 },
            { transform: 'scale(2)', opacity: 0 }
          ], { duration: 200, fill: 'forwards' }).then(function () { bl.remove(); });
          fxp.burst(p1.x, p1.y, 12, ['#ff7ac8', '#ffffff'], 2.6);
          return anim(j, [
            { transform: 'translate(0,-8px)' },
            { transform: 'translate(0,4px)', offset: 0.6 },
            { transform: 'translate(0,0)' }
          ], { duration: 380, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'forwards' })
            .then(function () { wrap.remove(); });
        });
    },

    /* 10b — le ressort : compression puis 3 bonds amortis, squash & stretch */
    ressort: function (ov, fxp, p0, p1, col, badge) {
      var j = mk(ov, at(p0.x, p0.y, 30) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 15px/1 system-ui;box-shadow:0 0 12px ' + col + ';transform-origin:50% 100%;', badge);
      var dx = p1.x - p0.x, dy = p1.y - p0.y;
      return anim(j, [
        { transform: 'translate(0,0) scale(1,1)' },
        { transform: 'translate(0,6px) scale(1.4,.45)', offset: 0.12 },
        { transform: 'translate(' + dx * 0.22 + 'px,' + (dy * 0.45 - 60) + 'px) scale(.8,1.3)', offset: 0.32 },
        { transform: 'translate(' + dx * 0.42 + 'px,' + (dy * 0.7 + 14) + 'px) scale(1.3,.6)', offset: 0.46 },
        { transform: 'translate(' + dx * 0.6 + 'px,' + (dy * 0.85 - 40) + 'px) scale(.85,1.25)', offset: 0.62 },
        { transform: 'translate(' + dx * 0.75 + 'px,' + (dy * 0.95 + 10) + 'px) scale(1.25,.65)', offset: 0.74 },
        { transform: 'translate(' + dx * 0.9 + 'px,' + (dy - 24) + 'px) scale(.9,1.15)', offset: 0.88 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1)' }
      ], { duration: 1500, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'forwards' })
        .then(function () { j.remove(); });
    },

    /* 10c — la liane : pendule amorti au bout d'un fil, lâché vers la pastille */
    liane: function (ov, fxp, p0, p1, col, badge) {
      var pivot = { x: p0.x - 60, y: Math.min(p0.y, p1.y) - 60 };
      var len = Math.hypot(p0.x - pivot.x, p0.y - pivot.y);
      var ang0 = Math.atan2(p0.x - pivot.x, p0.y - pivot.y);
      var deg = ang0 * 180 / Math.PI;
      var wrap = mk(ov, 'left:' + pivot.x + 'px;top:' + pivot.y + 'px;width:0;height:0;transform-origin:0 0;transform:rotate(' + deg + 'deg);');
      mk(wrap, 'left:-1px;top:0;width:2px;height:' + len + 'px;background:rgba(255,255,255,.35);border-radius:2px;');
      var j = mk(wrap, at(0, len, 30) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 15px/1 system-ui;box-shadow:0 0 12px ' + col + ';', badge);
      return anim(wrap, [
        { transform: 'rotate(' + deg + 'deg)' },
        { transform: 'rotate(' + (-deg * 0.9) + 'deg)', offset: 0.25 },
        { transform: 'rotate(' + (deg * 0.65) + 'deg)', offset: 0.5 },
        { transform: 'rotate(' + (-deg * 0.45) + 'deg)', offset: 0.72 },
        { transform: 'rotate(' + (-deg * 0.45) + 'deg)', offset: 0.8 }
      ], { duration: 1300, easing: 'ease-in-out', fill: 'forwards' })
        .then(function () {
          var b = j.getBoundingClientRect(), o = ov.getBoundingClientRect();
          var pos = { x: b.left + b.width / 2 - o.left, y: b.top + b.height / 2 - o.top };
          wrap.remove();
          var j2 = mk(ov, at(pos.x, pos.y, 30) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 15px/1 system-ui;box-shadow:0 0 12px ' + col + ';', badge);
          var ctrl = { x: (pos.x + p1.x) / 2, y: Math.min(pos.y, p1.y) - 80 };
          return anim(j2, qFrames(pos, ctrl, p1, 12), { duration: 650, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' })
            .then(function () { j2.remove(); });
        });
    },

    /* 10d — le popcorn : sauts erratiques avec rotation et squash, "tac" à chaque saut */
    popcorn: function (ov, fxp, p0, p1, col, badge) {
      var j = mk(ov, at(p0.x, p0.y, 28) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 14px/1 system-ui;box-shadow:0 0 12px ' + col + ';', badge);
      var dx = p1.x - p0.x, dy = p1.y - p0.y;
      var fr = [{ transform: 'translate(0,0) scale(1) rotate(0)' }];
      var hops = 5;
      for (var i = 1; i <= hops; i++) {
        var t = i / hops;
        fr.push({ transform: 'translate(' + (dx * t) + 'px,' + (dy * t - 34) + 'px) scale(.92,1.15) rotate(' + (i * 130) + 'deg)', offset: t - 0.09 });
        fr.push({ transform: 'translate(' + (dx * t) + 'px,' + (dy * t) + 'px) scale(1.18,.8) rotate(' + (i * 130 + 40) + 'deg)', offset: t });
        (function (k) {
          setTimeout(function () {
            fxp.burst(p0.x + dx * k / hops, p0.y + dy * k / hops, 5, [col, '#ffffff'], 1.6);
          }, 1500 * k / hops);
        })(i);
      }
      return anim(j, fr, { duration: 1500, easing: 'linear', fill: 'forwards' })
        .then(function () { j.remove(); });
    },

    /* 10e — l'hélico : rotor qui prend de la vitesse, décollage hésitant, vol posé */
    helico: function (ov, fxp, p0, p1, col, badge) {
      var wrap = mk(ov, at(p0.x, p0.y, 34));
      var rotor = mk(wrap, 'left:1px;top:-10px;width:32px;height:4px;border-radius:3px;background:rgba(255,255,255,.75);transform-origin:50% 50%;');
      var j = mk(wrap, at(17, 17, 28) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 14px/1 system-ui;box-shadow:0 0 12px ' + col + ';', badge);
      var spin = rotor.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 90, iterations: Infinity });
      spin.playbackRate = 0.4;
      var rate = 0.4;
      var iv = setInterval(function () { rate = Math.min(rate + 0.2, 1); spin.playbackRate = rate; }, 200);
      var dx = p1.x - p0.x, dy = p1.y - p0.y;
      return wait(700).then(function () {
        return anim(wrap, [
          { transform: 'translate(0,0)' },
          { transform: 'translate(-4px,-14px)', offset: 0.12 },
          { transform: 'translate(3px,-8px)', offset: 0.2 },
          { transform: 'translate(' + dx * 0.4 + 'px,' + (dy * 0.5 - 30) + 'px)', offset: 0.55 },
          { transform: 'translate(' + dx * 0.75 + 'px,' + (dy * 0.8 - 12) + 'px)', offset: 0.8 },
          { transform: 'translate(' + dx + 'px,' + dy + 'px)' }
        ], { duration: 1300, easing: 'cubic-bezier(.4,0,.5,1)', fill: 'forwards' });
      }).then(function () {
        clearInterval(iv);
        spin.cancel();
        wrap.remove();
      });
    },

    /* 10f — la roulade : tombe, roule au sol en accélérant (rotation liée), rampe vers la pastille */
    roulade: function (ov, fxp, p0, p1, col, badge) {
      var j = mk(ov, at(p0.x, p0.y, 30) + 'border-radius:50%;background:' + col + ';color:#fff;font:900 15px/1 system-ui;box-shadow:0 0 12px ' + col + ';', badge);
      var floorY = ov.clientHeight - 40;
      var drop = floorY - p0.y;
      var travel = p1.x - p0.x;
      var rise = floorY - p1.y;
      var rotMid = travel / 15 * 60;
      return anim(j, [
        { transform: 'translate(0,0) rotate(0)' },
        { transform: 'translate(0,' + drop + 'px) rotate(90deg) scale(1.2,.8)', offset: 0.22 },
        { transform: 'translate(' + travel * 0.5 + 'px,' + drop + 'px) rotate(' + rotMid * 0.5 + 'deg) scale(1)', offset: 0.5 },
        { transform: 'translate(' + travel * 0.85 + 'px,' + drop + 'px) rotate(' + rotMid * 0.85 + 'deg)', offset: 0.72 },
        { transform: 'translate(' + travel + 'px,' + (drop - rise * 0.5 - 40) + 'px) rotate(' + (rotMid + 120) + 'deg)', offset: 0.88 },
        { transform: 'translate(' + travel + 'px,' + (p1.y - p0.y) + 'px) rotate(' + (rotMid + 160) + 'deg)' }
      ], { duration: 1700, easing: 'cubic-bezier(.45,.05,.5,.95)', fill: 'forwards' })
        .then(function () { fxp.burst(p1.x, p1.y, 8, [col, '#ffffff'], 2); j.remove(); });
    }
  };

  /* ── MaxFX.markPoint ──────────────────────────────────────────────── */
  function markPoint(fromEl, toEl, opts) {
    opts = opts || {};
    var C = themeColors();
    var result = opts.result || 'green';
    var col = C[result] || C.green;
    var badge = opts.badge || (result === 'red' ? '✗' : '✓');
    var container = opts.container || commonContainer(fromEl, toEl);
    var ov = makeOverlay(container);
    var fxp = makeFx(ov);
    var p0 = center(fromEl, ov), p1 = center(toEl, ov);
    var style = MARKS[opts.style] ? opts.style : 'bounce';
    /* petit "pulse" de la carte au départ */
    anim(fromEl, [
      { transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }
    ], { duration: 550, easing: 'cubic-bezier(.34,1.56,.64,1)' });
    fxp.burst(p0.x, p0.y, 16, [col, C.gold], 3);
    return MARKS[style](ov, fxp, p0, p1, col, badge)
      .then(function () { return arrive(ov, p1, col, badge); })
      .then(function () { return wait(700); })
      .then(function () { fxp.stop(); ov.remove(); });
  }

  /* ── helpers étoile ───────────────────────────────────────────────── */
  function starEl(ov, x, y, fs, extraCss) {
    return mk(ov, at(x, y, fs + 24) + 'font-size:' + fs + 'px;filter:drop-shadow(0 0 16px rgba(255,209,102,.65));' + (extraCss || ''), '⭐');
  }
  function labelEl(ov, x, y, txt, col) {
    if (!txt) return null;
    var l = mk(ov, at(x, y, 240) + 'height:40px;font:900 26px/1 "Fredoka One","Nunito",system-ui;color:' + (col || '#fff') + ';text-shadow:0 0 18px rgba(255,209,102,.4);opacity:0;text-align:center;', txt);
    anim(l, [
      { opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 500, easing: 'ease-out', fill: 'forwards' });
    return l;
  }
  var POP = [
    { transform: 'scale(0) rotate(-40deg)', opacity: 0 },
    { transform: 'scale(1.35) rotate(8deg)', opacity: 1, offset: 0.55 },
    { transform: 'scale(.92) rotate(-3deg)', offset: 0.75 },
    { transform: 'scale(1) rotate(0)', opacity: 1 }
  ];

  /* ── les 22 étoiles finales ───────────────────────────────────────── */
  var STARS = {

    /* 5a — la cinématique complète : flash, ondes, étoile, fontaines, confettis */
    cinematic: function (ov, fxp, cx, cy, o, C) {
      var flash = mk(ov, 'inset:0;background:radial-gradient(circle at 50% 40%, rgba(255,246,220,.9), transparent 55%);');
      anim(flash, [{ opacity: 0.55 }, { opacity: 0 }], { duration: 500, easing: 'ease-out', fill: 'forwards' });
      [0, 180, 360].forEach(function (d, i) {
        var ring = mk(ov, at(cx, cy, 120 + i * 30) + 'border-radius:50%;border:3px solid ' + (i === 2 ? 'rgba(127,180,255,.45)' : 'rgba(255,209,102,' + (0.9 - i * 0.3) + ')') + ';');
        anim(ring, [
          { transform: 'scale(.15)', opacity: 0.95 }, { transform: 'scale(2.4)', opacity: 0 }
        ], { duration: 1000, delay: d, easing: 'cubic-bezier(.2,.7,.4,1)', fill: 'forwards' });
      });
      var star = starEl(ov, cx, cy, 100);
      anim(star, POP, { duration: 900, delay: 120, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' });
      setTimeout(function () {
        fxp.burst(cx, cy, 54, [C.gold, '#ffe28f', '#fff3d1'], 5.2);
        fxp.fountain(24, 1, 34, [C.gold, '#ffe28f']);
        fxp.fountain(ov.clientWidth - 24, -1, 34, [C.gold, '#ffe28f']);
        fxp.confetti(70, [C.gold, C.accent, C.green, '#ff7ac8']);
      }, 520);
      setTimeout(function () {
        fxp.fountain(24, 1, 22, [C.gold]); fxp.fountain(ov.clientWidth - 24, -1, 22, [C.gold]);
      }, 1400);
      labelEl(ov, cx, cy + 96, o.label != null ? o.label : 'SANS-FAUTE !');
      return wait(3400);
    },

    /* 8k — la pluie d'étoiles puis LA grande */
    rain: function (ov, fxp, cx, cy, o, C) {
      var W = ov.clientWidth;
      for (var i = 0; i < 8; i++) {
        (function (i) {
          var s = mk(ov, at(20 + (W - 40) * i / 7, 0, 20) + 'font-size:' + (11 + (i % 3) * 4) + 'px;', '⭐');
          anim(s, [
            { transform: 'translateY(-30px) rotate(0)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1, offset: 0.08 },
            { transform: 'translateY(' + (ov.clientHeight + 40) + 'px) rotate(220deg)', opacity: 0.85 }
          ], { duration: 1250, delay: i * 120, easing: 'linear', fill: 'forwards' }).then(function () { s.remove(); });
        })(i);
      }
      var star = starEl(ov, cx, cy, 78);
      anim(star, POP, { duration: 800, delay: 1000, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' });
      setTimeout(function () { labelEl(ov, cx, cy + 88, o.label != null ? o.label : 'GAGNÉ !'); }, 1500);
      return wait(2600);
    },

    /* 8l — la supernova : implosion brillante puis BOOM */
    supernova: function (ov, fxp, cx, cy, o, C) {
      var star = starEl(ov, cx, cy, 76);
      anim(star, [
        { transform: 'scale(1)', filter: 'brightness(1)' },
        { transform: 'scale(.22)', filter: 'brightness(2.6)', offset: 0.3 },
        { transform: 'scale(.22)', filter: 'brightness(3)', offset: 0.36 },
        { transform: 'scale(1.55)', filter: 'brightness(1.7)', offset: 0.55 },
        { transform: 'scale(1.12)', offset: 0.75 },
        { transform: 'scale(1.28)', filter: 'brightness(1.15)' }
      ], { duration: 1600, easing: 'cubic-bezier(.5,0,.5,1)', fill: 'both' });
      setTimeout(function () {
        var flash = mk(ov, 'inset:0;background:radial-gradient(circle at ' + cx + 'px ' + cy + 'px, rgba(255,246,220,.95), transparent 58%);');
        anim(flash, [{ opacity: 0.6 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
        fxp.burst(cx, cy, 36, [C.gold, '#fff3d1'], 5.5);
        [0, 180].forEach(function (d, i) {
          var ring = mk(ov, at(cx, cy, 60 + i * 20) + 'border-radius:50%;border:3px solid ' + (i ? '#fff3d1' : C.gold) + ';');
          anim(ring, [{ transform: 'scale(.2)', opacity: 0.95 }, { transform: 'scale(2.6)', opacity: 0 }], { duration: 800, delay: d, easing: 'ease-out', fill: 'forwards' });
        });
      }, 560);
      return wait(2400);
    },

    /* 8m — l'étoile disco : roue de couleurs + satellites en orbite */
    disco: function (ov, fxp, cx, cy, o, C) {
      var segs = '';
      var dcols = ['rgba(255,122,200,.14)', 'rgba(87,230,230,.14)', 'rgba(255,209,102,.14)', 'rgba(201,164,255,.14)'];
      for (var i = 0; i < 18; i++) segs += dcols[i % 4] + ' ' + i * 20 + 'deg ' + (i * 20 + 20) + 'deg' + (i < 17 ? ',' : '');
      var wheel = mk(ov, at(cx, cy, 216) + 'border-radius:50%;background:conic-gradient(' + segs + ');');
      anim(wheel, [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 3200, iterations: 2, easing: 'linear' });
      [['#ff7ac8', 84, 2200], ['#57e6e6', 70, 2800], [C.gold, 92, 2000], ['#c9a4ff', 62, 3100]].forEach(function (ob) {
        var orb = mk(ov, at(cx, cy, 9) + 'border-radius:50%;background:' + ob[0] + ';box-shadow:0 0 12px ' + ob[0] + ';');
        anim(orb, [
          { transform: 'rotate(0) translateX(' + ob[1] + 'px)' },
          { transform: 'rotate(360deg) translateX(' + ob[1] + 'px)' }
        ], { duration: ob[2], iterations: 3, easing: 'linear' });
      });
      var star = starEl(ov, cx, cy, 66);
      anim(star, [{ transform: 'scale(1)' }, { transform: 'scale(1.22)' }, { transform: 'scale(1)' }], { duration: 460, iterations: 8 });
      labelEl(ov, cx, cy + 108, o.label != null ? o.label : 'CHAMPION !', '#ff7ac8');
      return wait(3600);
    },

    /* 8n — la constellation qui se dessine point à point */
    constellation: function (ov, fxp, cx, cy, o, C) {
      var R = 62;
      var pts = [], order = [0, 2, 4, 1, 3];
      for (var i = 0; i < 5; i++) {
        var a = Math.PI * 2 * i / 5 - Math.PI / 2;
        pts.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R });
      }
      pts.forEach(function (p, i) {
        var s = mk(ov, at(p.x, p.y, 18) + 'font-size:14px;filter:drop-shadow(0 0 6px rgba(255,209,102,.8));', '⭐');
        anim(s, POP, { duration: 350, delay: i * 150, easing: 'ease-out', fill: 'both' });
      });
      for (var k = 0; k < 5; k++) {
        (function (k) {
          var a = pts[order[k]], b = pts[order[(k + 1) % 5]];
          var len = Math.hypot(b.x - a.x, b.y - a.y), ang = Math.atan2(b.y - a.y, b.x - a.x);
          var ln = mk(ov, 'left:' + a.x + 'px;top:' + a.y + 'px;width:' + len + 'px;height:3px;background:linear-gradient(90deg,' + C.gold + ',' + C.accent + ');box-shadow:0 0 8px rgba(255,209,102,.6);transform:rotate(' + ang + 'rad) scaleX(0);transform-origin:0 50%;');
          anim(ln, [
            { transform: 'rotate(' + ang + 'rad) scaleX(0)' },
            { transform: 'rotate(' + ang + 'rad) scaleX(1)' }
          ], { duration: 220, delay: 800 + k * 220, easing: 'ease-out', fill: 'forwards' });
        })(k);
      }
      var star = starEl(ov, cx, cy, 54);
      anim(star, POP, { duration: 700, delay: 2100, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' });
      return wait(3200);
    },

    /* 8r — le traceur de feu : des braises dessinent l'étoile en vol */
    tracer: function (ov, fxp, cx, cy, o, C) {
      var R = 76, d = '';
      for (var i = 0; i < 10; i++) {
        var rr = i % 2 ? R * 0.45 : R;
        var a = Math.PI * i / 5 - Math.PI / 2;
        d += (i ? 'L ' : 'M ') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1) + ' ';
      }
      d += 'Z';
      for (var k = 0; k < 5; k++) {
        (function (k) {
          var s = 10 - k;
          var dot = mk(ov, 'width:' + s + 'px;height:' + s + 'px;border-radius:50%;background:' + (k ? 'rgba(255,209,102,' + (1 - k * 0.16) + ')' : '#fff3d1') + ';box-shadow:0 0 ' + (14 - k * 2) + 'px 3px rgba(255,209,102,.8);offset-path:path("' + d + '");offset-rotate:0deg;');
          anim(dot, [{ offsetDistance: '0%' }, { offsetDistance: '100%' }], { duration: 2100, delay: k * 70, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'forwards' });
        })(k);
      }
      var star = starEl(ov, cx, cy, 62);
      anim(star, POP, { duration: 600, delay: 2150, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' });
      return wait(3200);
    },

    /* 8s — l'aurore boréale : bandes de lumière, l'étoile se lève (sans texte) */
    aurora: function (ov, fxp, cx, cy, o, C) {
      [['rgba(47,191,143,.35)', 2600, 0], ['rgba(87,230,230,.28)', 3200, -800], ['rgba(201,164,255,.3)', 2900, -1600]].forEach(function (b, i) {
        var band = mk(ov, 'left:-20px;top:' + (30 + i * 38) + 'px;width:' + (ov.clientWidth + 60) + 'px;height:54px;border-radius:40px;background:linear-gradient(90deg, transparent, ' + b[0] + ', transparent);filter:blur(10px);');
        anim(band, [
          { transform: 'translateX(-24px) skewX(-14deg)' },
          { transform: 'translateX(24px) skewX(-6deg)' }
        ], { duration: b[1], delay: b[2], iterations: 3, direction: 'alternate', easing: 'ease-in-out' });
      });
      var star = starEl(ov, cx, cy + 20, 52);
      anim(star, [
        { transform: 'translateY(66px) scale(.3)', opacity: 0 },
        { transform: 'translateY(0) scale(1)', opacity: 1 }
      ], { duration: 1700, delay: 300, easing: 'ease-out', fill: 'both' });
      return wait(3200);
    },

    /* 8t — l'ovation : les mascottes sautent, l'étoile tombe et rebondit */
    ovation: function (ov, fxp, cx, cy, o, C) {
      var avatars = (o.avatars && o.avatars.length ? o.avatars.slice() : ['🦖', '🦕', '🦣', '🐣']);
      avatars.sort(function () { return Math.random() - 0.5; });
      var W = ov.clientWidth, H = ov.clientHeight;
      avatars.slice(0, 4).forEach(function (emo, i) {
        var f = mk(ov, at(W * (0.18 + i * 0.21), H - 44, 40) + 'font-size:30px;', emo);
        anim(f, [
          { transform: 'translateY(0)' }, { transform: 'translateY(-26px) rotate(-8deg)', offset: 0.2 },
          { transform: 'translateY(0)', offset: 0.4 }, { transform: 'translateY(-12px) rotate(6deg)', offset: 0.55 },
          { transform: 'translateY(0)', offset: 0.7 }, { transform: 'translateY(0)' }
        ], { duration: 1150, delay: i * 140, iterations: 3, easing: 'ease-in-out' });
      });
      var star = starEl(ov, cx, cy - 20, 60);
      anim(star, [
        { transform: 'translateY(-300px)' },
        { transform: 'translateY(0)', offset: 0.45 },
        { transform: 'translateY(0) scale(1.3,.7)', offset: 0.55 },
        { transform: 'translateY(-60px) scale(1)', offset: 0.7 },
        { transform: 'translateY(0) scale(1.12,.88)', offset: 0.85 },
        { transform: 'translateY(0) scale(1)' }
      ], { duration: 1400, easing: 'cubic-bezier(.5,0,.5,1)', fill: 'both' });
      fxp.confetti(40, [C.gold, C.accent, C.green, '#ff7ac8']);
      var txt = o.label != null ? o.label : ('BRAVO' + (o.name ? ' ' + o.name.toUpperCase() : '') + ' !');
      setTimeout(function () { labelEl(ov, cx, cy + 50, txt); }, 1450);
      return wait(3400);
    },

    /* 9a — la spirale : 3 tours vers le centre, pop immédiat à l'arrivée */
    spiral: function (ov, fxp, cx, cy, o, C) {
      var star = starEl(ov, cx, cy, 58);
      var fr = [];
      for (var i = 0; i <= 30; i++) {
        var t = i / 30;
        var ang = t * Math.PI * 6, rad = 120 * (1 - t);
        fr.push({ transform: 'translate(' + Math.cos(ang) * rad + 'px,' + Math.sin(ang) * rad + 'px) scale(' + (0.4 + t * 0.6) + ')', opacity: t < 0.1 ? t * 10 : 1 });
      }
      return anim(star, fr, { duration: 1900, easing: 'cubic-bezier(.4,.1,.5,1)', fill: 'both' })
        .then(function () {
          fxp.burst(cx, cy, 18, [C.gold, '#fff3d1'], 3.4);
          return anim(star, [{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(.34,1.56,.64,1)' });
        }).then(function () { return wait(500); });
    },

    /* 9b — le billard : rebonds sur les murs, flash blanc au point d'impact */
    billard: function (ov, fxp, cx, cy, o, C) {
      var W = ov.clientWidth;
      var star = starEl(ov, cx, cy, 52);
      var hits = [
        { x: -cx + 26, y: -110, t: 0.2 },
        { x: cx - 26 - cx + W - 52, y: -50, t: 0.48 }
      ];
      var kf = [
        { transform: 'translate(0,-260px) rotate(0) scale(.7)' },
        { transform: 'translate(' + (26 - cx) + 'px,-140px) rotate(-140deg)', offset: 0.18 },
        { transform: 'translate(' + (32 - cx) + 'px,-128px) rotate(-160deg) scale(.75,1.2)', offset: 0.22 },
        { transform: 'translate(' + (W - 26 - cx) + 'px,-60px) rotate(120deg)', offset: 0.46 },
        { transform: 'translate(' + (W - 32 - cx) + 'px,-50px) rotate(140deg) scale(.75,1.2)', offset: 0.5 },
        { transform: 'translate(-40px,-6px) rotate(-40deg)', offset: 0.74 },
        { transform: 'translate(8px,4px) rotate(20deg) scale(1.15,.85)', offset: 0.88 },
        { transform: 'translate(0,0) rotate(0) scale(1)' }
      ];
      setTimeout(function () { fxp.burst(26, cy - 128, 10, ['#ffffff', C.gold], 2.6); }, 380);
      setTimeout(function () { fxp.burst(W - 26, cy - 50, 10, ['#ffffff', C.gold], 2.6); }, 940);
      return anim(star, kf, { duration: 1900, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'both' })
        .then(function () { fxp.burst(cx, cy, 16, [C.gold], 3); return wait(600); });
    },

    /* 9d — le moonwalk : glisse en roulant, repart, revient (sans trait) */
    moonwalk: function (ov, fxp, cx, cy, o, C) {
      var star = starEl(ov, cx, cy, 54);
      return anim(star, [
        { transform: 'translateX(-140px) rotate(0)' },
        { transform: 'translateX(60px) rotate(340deg)', offset: 0.3 },
        { transform: 'translateX(38px) rotate(300deg)', offset: 0.45 },
        { transform: 'translateX(90px) rotate(560deg)', offset: 0.7 },
        { transform: 'translateX(72px) rotate(530deg)', offset: 0.85 },
        { transform: 'translateX(0) rotate(720deg)' }
      ], { duration: 2100, easing: 'ease-in-out', fill: 'both' })
        .then(function () { fxp.burst(cx, cy, 14, [C.gold, C.accent], 2.8); return wait(500); });
    },

    /* 9e — la respiration : gonfle, brille, illumine tout (réutilisable via MaxFX.glow) */
    breathe: function (ov, fxp, cx, cy, o, C) {
      var halo = mk(ov, at(cx, cy, 250) + 'border-radius:50%;background:radial-gradient(circle, rgba(255,209,102,.22), transparent 60%);');
      var star = starEl(ov, cx, cy, 62);
      var frames = [
        { transform: 'scale(1)', filter: 'brightness(1)' },
        { transform: 'scale(1.35)', filter: 'brightness(1.8)' },
        { transform: 'scale(1)', filter: 'brightness(1)' }
      ];
      anim(halo, frames, { duration: 1100, iterations: 3, easing: 'ease-in-out' });
      return anim(star, frames, { duration: 1100, iterations: 3, easing: 'ease-in-out' }).then(function () { return wait(300); });
    },

    /* 9f — la toupie 3D : triple vrille rotateY */
    flip: function (ov, fxp, cx, cy, o, C) {
      var star = starEl(ov, cx, cy, 60);
      return anim(star, [
        { transform: 'rotateY(0) scale(1)' },
        { transform: 'rotateY(540deg) scale(.55)', offset: 0.25 },
        { transform: 'rotateY(1080deg) scale(1.25)', offset: 0.5 },
        { transform: 'rotateY(1080deg) scale(.9)', offset: 0.7 },
        { transform: 'rotateY(1080deg) scale(1)' }
      ], { duration: 1800, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'both' })
        .then(function () { fxp.burst(cx, cy, 14, [C.gold], 3); return wait(500); });
    },

    /* 9j — l'orbite qui rétrécit : satellite → centre, et grossit à la fin */
    orbit: function (ov, fxp, cx, cy, o, C) {
      var star = starEl(ov, cx, cy, 40);
      var fr = [];
      for (var i = 0; i <= 30; i++) {
        var t = i / 30;
        var ang = t * Math.PI * 6, rad = 96 * (1 - t);
        fr.push({ transform: 'translate(' + Math.cos(ang) * rad + 'px,' + Math.sin(ang) * rad * 0.8 + 'px) scale(' + (0.5 + t * 0.5) + ')', opacity: t < 0.08 ? t * 12 : 1 });
      }
      return anim(star, fr, { duration: 2300, easing: 'cubic-bezier(.5,.1,.5,.9)', fill: 'both' })
        .then(function () {
          return anim(star, [
            { transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1.3)' }
          ], { duration: 500, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'forwards' });
        }).then(function () { return wait(500); });
    },

    /* 9k — le battement de cœur : boum-boum + halo (sans emoji cœur) */
    heartbeat: function (ov, fxp, cx, cy, o, C) {
      var halo = mk(ov, at(cx, cy, 230) + 'border-radius:50%;background:radial-gradient(circle, rgba(255,122,200,.16), transparent 60%);');
      var star = starEl(ov, cx, cy, 58);
      var beat = [
        { transform: 'scale(1)' }, { transform: 'scale(1.3)', offset: 0.12 }, { transform: 'scale(1)', offset: 0.24 },
        { transform: 'scale(1.42)', offset: 0.36 }, { transform: 'scale(1)', offset: 0.48 }, { transform: 'scale(1)' }
      ];
      anim(halo, beat, { duration: 1150, iterations: 2 });
      return anim(star, beat, { duration: 1150, iterations: 2 }).then(function () { return wait(300); });
    },

    /* 9l — le lance-pierre : tirée vers le bas, catapultée, atterrit au centre
       (normé : le rangement, c'est le boulot de la ceinture `belt`) */
    slingshot: function (ov, fxp, cx, cy, o, C) {
      var star = starEl(ov, cx, cy + 60, 44);
      var band = mk(ov, 'left:' + (cx - 55) + 'px;top:' + (cy + 96) + 'px;width:110px;height:8px;border-radius:4px;background:rgba(255,255,255,.16);');
      return anim(star, [
        { transform: 'translate(0,0)' },
        { transform: 'translate(0,64px) scale(1.06,.85)', offset: 0.28 },
        { transform: 'translate(0,72px) scale(1.1,.8)', offset: 0.4 },
        { transform: 'translate(0,-170px) scale(.7,1.4)', offset: 0.52 },
        { transform: 'translate(0,-190px) scale(1)', offset: 0.68 },
        { transform: 'translate(0,-140px) scale(1.4)', offset: 0.86 },
        { transform: 'translate(0,-120px) scale(1.6)' }
      ], { duration: 1500, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'forwards' })
        .then(function () {
          band.remove();
          fxp.burst(cx, cy - 60, 18, [C.gold, '#fff3d1'], 3.4);
          return wait(600);
        });
    },

    /* 9m — l'arc-en-ciel tournant : 4 tours, teintes qui défilent */
    rainbowspin: function (ov, fxp, cx, cy, o, C) {
      var star = starEl(ov, cx, cy, 60);
      return anim(star, [
        { transform: 'rotate(0) scale(.2)', opacity: 0, filter: 'hue-rotate(0deg) drop-shadow(0 0 12px rgba(255,209,102,.8))' },
        { opacity: 1, offset: 0.15 },
        { transform: 'rotate(1440deg) scale(1)', opacity: 1, filter: 'hue-rotate(360deg) drop-shadow(0 0 22px rgba(255,209,102,.9))' }
      ], { duration: 2200, easing: 'cubic-bezier(.4,.1,.5,.9)', fill: 'both' })
        .then(function () {
          fxp.burst(cx, cy, 20, ['#ff7ac8', '#57e6e6', C.gold, '#c9a4ff'], 3.4);
          return wait(600);
        });
    },

    /* 9s — la poussière d'étoile : scintille en chemin jusqu'au centre */
    stardust: function (ov, fxp, cx, cy, o, C) {
      var from = { x: 40, y: ov.clientHeight - 60 };
      var to = { x: cx, y: cy };
      var ctrl = { x: (from.x + to.x) / 2 - 40, y: Math.min(from.y, to.y) - 90 };
      var star = starEl(ov, from.x, from.y, 42);
      for (var i = 0; i < 7; i++) {
        (function (i) {
          var t = (i + 1) / 8, m = 1 - t;
          var x = m * m * from.x + 2 * m * t * ctrl.x + t * t * to.x;
          var y = m * m * from.y + 2 * m * t * ctrl.y + t * t * to.y;
          var sp = mk(ov, at(x, y, 18) + 'font-size:' + (12 + (i % 3) * 3) + 'px;', '✨');
          anim(sp, [
            { opacity: 0, transform: 'scale(0) rotate(0)' },
            { opacity: 1, transform: 'scale(1.2) rotate(60deg)', offset: 0.3 },
            { opacity: 0, transform: 'scale(.3) rotate(160deg)' }
          ], { duration: 800, delay: i * 190, easing: 'ease-out', fill: 'forwards' });
        })(i);
      }
      return anim(star, qFrames(from, ctrl, to, 16), { duration: 1700, easing: 'cubic-bezier(.4,.1,.6,.9)', fill: 'forwards' })
        .then(function () {
          fxp.burst(to.x, to.y, 14, [C.gold], 3);
          return wait(600);
        });
    },

    /* 10g — le galton : l'étoile descend en rebondissant sur les picots (pachinko) */
    galton: function (ov, fxp, cx, cy, o, C) {
      var rows = [[-60, 60], [-90, 0, 90], [-60, 60]];
      var pegs = [];
      rows.forEach(function (r, ri) {
        r.forEach(function (off) {
          var pg = mk(ov, at(cx + off, cy - 130 + ri * 55, 10) + 'border-radius:50%;background:' + C.gold + ';box-shadow:0 0 8px ' + C.gold + ';opacity:0;');
          anim(pg, [
            { opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)' }
          ], { duration: 250, delay: ri * 90, fill: 'forwards' });
          pegs.push(pg);
        });
      });
      var star = starEl(ov, cx, cy - 190, 34);
      [450, 820, 1220].forEach(function (ms, i) {
        setTimeout(function () {
          var px = cx + (i % 2 ? 60 : -58), py2 = cy - 130 + i * 55;
          fxp.burst(px, py2, 6, [C.gold, '#ffffff'], 1.8);
        }, ms);
      });
      return wait(400).then(function () {
        return anim(star, [
          { transform: 'translate(0,0)' },
          { transform: 'translate(-58px,60px) scale(1,.8)', offset: 0.2 },
          { transform: 'translate(-30px,80px)', offset: 0.3 },
          { transform: 'translate(88px,115px) scale(1,.8)', offset: 0.5 },
          { transform: 'translate(40px,135px)', offset: 0.62 },
          { transform: 'translate(-58px,170px) scale(1,.8)', offset: 0.8 },
          { transform: 'translate(0,190px) scale(1.2)' }
        ], { duration: 1900, easing: 'cubic-bezier(.4,.1,.6,.9)', fill: 'forwards' });
      }).then(function () {
        fxp.burst(cx, cy, 20, [C.gold, '#fff3d1'], 3.4);
        pegs.forEach(function (pg) {
          anim(pg, [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
        });
        return wait(900);
      });
    },

    /* 10h — le feu d'artifice : montée en traînée dorée, double gerbe, retour au centre */
    feuartifice: function (ov, fxp, cx, cy, o, C) {
      var H = ov.clientHeight;
      var star = starEl(ov, cx, H - 60, 40);
      var top = cy - 130;
      var rise = top - (H - 60);
      var iv = setInterval(function () {
        var b = star.getBoundingClientRect(), r = ov.getBoundingClientRect();
        fxp.trail(b.left + b.width / 2 - r.left, b.top + b.height / 2 - r.top, C.gold, 3);
      }, 45);
      return anim(star, [
        { transform: 'translate(0,0) scale(.8)' },
        { transform: 'translate(6px,' + rise * 0.5 + 'px)', offset: 0.5 },
        { transform: 'translate(0,' + rise + 'px) scale(.9)' }
      ], { duration: 1100, easing: 'cubic-bezier(.3,0,.6,1)', fill: 'forwards' })
        .then(function () {
          clearInterval(iv);
          anim(star, [{ opacity: 1 }, { opacity: 0 }], { duration: 120, fill: 'forwards' });
          fxp.burst(cx, top, 40, [C.gold, '#ffe28f', '#fff3d1'], 5.4);
          setTimeout(function () { fxp.burst(cx, top, 26, ['#ff7ac8', '#57e6e6', '#c9a4ff'], 4.2); }, 220);
          setTimeout(function () { fxp.confetti(36, [C.gold, C.accent, '#ff7ac8']); }, 420);
          var s2 = starEl(ov, cx, cy, 62);
          anim(s2, POP, { duration: 700, delay: 500, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' });
          labelEl(ov, cx, cy + 88, o.label != null ? o.label : 'GAGNÉ !');
          return wait(2200);
        });
    },

    /* 10i — le ballon qui pop : l'étoile gonfle, tremble, explose en confettis, revient brillante */
    ballonpop: function (ov, fxp, cx, cy, o, C) {
      var star = starEl(ov, cx, cy, 56);
      return anim(star, [
        { transform: 'scale(.3)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1, offset: 0.25 },
        { transform: 'scale(1.25)', offset: 0.45 },
        { transform: 'scale(1.45) rotate(3deg)', offset: 0.6 },
        { transform: 'scale(1.55) rotate(-3deg)', offset: 0.7 },
        { transform: 'scale(1.7) rotate(2deg)', offset: 0.78 },
        { transform: 'scale(2.1)', opacity: 1, offset: 0.82 },
        { transform: 'scale(2.6)', opacity: 0 }
      ], { duration: 1800, easing: 'ease-in-out', fill: 'forwards' })
        .then(function () {
          fxp.burst(cx, cy, 44, [C.gold, '#ff7ac8', '#57e6e6', '#c9a4ff'], 5);
          fxp.confetti(30, [C.gold, C.accent, '#ff7ac8']);
          var s2 = starEl(ov, cx, cy, 58);
          anim(s2, POP, { duration: 600, delay: 200, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' });
          return wait(1600);
        });
    },

    /* 10j — la tornade : anneaux d'étincelles qui se resserrent, l'étoile tourne et se pose */
    tornade: function (ov, fxp, cx, cy, o, C) {
      var star = starEl(ov, cx, cy, 54);
      for (var i = 0; i < 10; i++) {
        (function (i) {
          var p = mk(ov, at(cx, cy, 12) + 'font-size:11px;', '✨');
          var a0 = Math.PI * 2 * i / 10;
          var fr = [];
          for (var k = 0; k <= 16; k++) {
            var t = k / 16;
            var ang = a0 + t * Math.PI * 5;
            var rad = 110 * (1 - t * 0.85);
            fr.push({ transform: 'translate(' + Math.cos(ang) * rad + 'px,' + Math.sin(ang) * rad * 0.7 + 'px)', opacity: t < 0.1 ? t * 10 : 1 - t * 0.4 });
          }
          anim(p, fr, { duration: 1700, delay: i * 60, easing: 'linear', fill: 'forwards' })
            .then(function () { p.remove(); });
        })(i);
      }
      return anim(star, [
        { transform: 'rotate(0) scale(.4)', opacity: 0 },
        { opacity: 1, offset: 0.15 },
        { transform: 'rotate(1080deg) scale(1)', opacity: 1 }
      ], { duration: 1900, easing: 'cubic-bezier(.4,.1,.5,.9)', fill: 'both' })
        .then(function () {
          fxp.burst(cx, cy, 18, [C.gold, '#57e6e6'], 3.2);
          return wait(700);
        });
    }
  };

  /* ── la ceinture d'étoiles : descend de sa zone, s'affiche EN GRAND,
     la nouvelle étoile vole se ranger à SA place, on voit ce qui reste ── */
  function beltSequence(ov, fxp, o, C) {
    var earned = Math.max(1, o.belt.earned || 1);
    var total = Math.max(earned, o.belt.total || 3);
    var cx = ov.clientWidth / 2, cy = ov.clientHeight * 0.42;
    /* origine du zoom : la mini-ceinture en haut (à côté de la progression) */
    var anchor = o.belt.anchorEl ? center(o.belt.anchorEl, ov) : { x: ov.clientWidth - 60, y: 44 };
    var scrim = mk(ov, 'inset:0;background:rgba(6,10,22,.72);opacity:0;');
    anim(scrim, [{ opacity: 0 }, { opacity: 1 }], { duration: 350, fill: 'forwards' });
    /* le panneau ceinture : part petit depuis le haut (sa zone) et grossit au centre */
    var slotSize = Math.min(76, (ov.clientWidth - 80) / total - 14);
    var beltW = total * (slotSize + 14) + 26;
    var belt = mk(ov, 'left:' + (cx - beltW / 2) + 'px;top:' + (cy - slotSize / 2 - 20) + 'px;width:' + beltW +
      'px;padding:20px 0;display:flex;justify-content:center;gap:14px;border-radius:24px;' +
      'background:rgba(24,35,56,.92);border:1px solid rgba(255,209,102,.3);box-shadow:0 14px 40px rgba(0,0,0,.5);');
    anim(belt, [
      { transform: 'translate(' + (anchor.x - cx) + 'px,' + (anchor.y - cy) + 'px) scale(.18)', opacity: 0 },
      { transform: 'translate(0,0) scale(1.05)', opacity: 1, offset: 0.8 },
      { transform: 'translate(0,0) scale(1)' }
    ], { duration: 700, easing: 'cubic-bezier(.34,1.2,.5,1)', fill: 'both' });
    var slots = [];
    for (var i = 0; i < total; i++) {
      var filled = i < earned - 1;
      var s = document.createElement('div');
      s.style.cssText = 'width:' + slotSize + 'px;height:' + slotSize + 'px;border-radius:50%;display:flex;align-items:center;justify-content:center;' +
        'font-size:' + (slotSize * 0.58) + 'px;box-sizing:border-box;' +
        (filled
          ? 'background:rgba(255,209,102,.16);border:3px solid ' + C.gold + ';filter:drop-shadow(0 0 10px rgba(255,209,102,.5));'
          : 'border:3px dashed rgba(255,255,255,.28);opacity:.55;');
      if (filled) s.textContent = '⭐';
      belt.appendChild(s);
      slots.push(s);
    }
    var label = mk(ov, 'left:' + (cx - 130) + 'px;top:' + (cy + slotSize / 2 + 34) + 'px;width:260px;height:30px;display:flex;align-items:center;justify-content:center;font:900 21px/1 "Fredoka One","Nunito",system-ui;color:' + C.gold + ';opacity:0;text-shadow:0 2px 8px rgba(0,0,0,.6);');
    label.textContent = earned + ' / ' + total + (earned < total ? '  — encore ' + (total - earned) + ' !' : '  — tout gagné !');
    return wait(720).then(function () {
      /* pas de 2ᵉ étoile qui retombe (on sort déjà d'une animation) :
         la place se remplit directement, pop + gerbe */
      var target = slots[earned - 1];
      var tp = center(target, ov);
      target.textContent = '⭐';
      target.style.borderStyle = 'solid';
      target.style.border = '3px solid ' + C.gold;
      target.style.opacity = '1';
      target.style.background = 'rgba(255,209,102,.16)';
      fxp.burst(tp.x, tp.y, 18, [C.gold, '#fff3d1'], 3.2);
      anim(label, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400, delay: 250, fill: 'forwards' });
      return anim(target, [
        { transform: 'scale(0) rotate(-40deg)' },
        { transform: 'scale(1.4) rotate(8deg)', offset: 0.55 },
        { transform: 'scale(.95)', offset: 0.78 },
        { transform: 'scale(1)' }
      ], { duration: 650, easing: 'cubic-bezier(.34,1.56,.64,1)' })
        .then(function () { return wait(1400); })
        .then(function () {
          /* la ceinture repart se ranger dans sa zone en haut */
          return Promise.all([
            anim(scrim, [{ opacity: 1 }, { opacity: 0 }], { duration: 450, fill: 'forwards' }),
            anim(belt, [
              { transform: 'translate(0,0) scale(1)', opacity: 1 },
              { transform: 'translate(' + (anchor.x - cx) + 'px,' + (anchor.y - cy) + 'px) scale(.18)', opacity: 0 }
            ], { duration: 550, easing: 'cubic-bezier(.5,0,.8,.5)', fill: 'forwards' }),
            anim(label, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' })
          ]);
        });
    });
  }

  /* ── MaxFX.finalStar ──────────────────────────────────────────────── */
  function finalStar(container, opts) {
    opts = opts || {};
    var C = themeColors();
    var ov = makeOverlay(container || document.body);
    var fxp = makeFx(ov);
    var cx = ov.clientWidth / 2, cy = ov.clientHeight * 0.42;
    var style = STARS[opts.style] ? opts.style : 'cinematic';
    return STARS[style](ov, fxp, cx, cy, opts, C)
      .then(function () { return wait(400); })
      .then(function () {
        /* ceinture : opts.belt = { earned:2, total:3 } → la ceinture descend
           en grand, l'étoile se range à sa place, on voit ce qui reste */
        if (opts.belt) return beltSequence(ov, fxp, opts, C);
      })
      .then(function () { fxp.stop(); ov.remove(); });
  }

  /* ── MaxFX.glow — la "respiration" réutilisable sur tout élément ──── */
  function glow(el, opts) {
    opts = opts || {};
    return el.animate([
      { transform: 'scale(1)', filter: 'brightness(1) drop-shadow(0 0 10px rgba(255,209,102,.5))' },
      { transform: 'scale(' + (opts.scale || 1.2) + ')', filter: 'brightness(1.7) drop-shadow(0 0 28px rgba(255,209,102,.95))' },
      { transform: 'scale(1)', filter: 'brightness(1) drop-shadow(0 0 10px rgba(255,209,102,.5))' }
    ], { duration: opts.duration || 1100, iterations: opts.iterations || 3, easing: 'ease-in-out' });
  }

  /* ── MaxFX.hatch — éclosion réutilisable (NID, CONTRAT-MJ : bibliothèque
     enrichie plutôt qu'anim maison par jeu). tremble → craque → révèle une
     image (le dino surprise) à la place de l'œuf → petite fête.
     opts.imgSrc : image du dino révélé (obligatoire pour l'effet complet)
     opts.container : overlay (déf. : ancêtre commun / body)
     opts.label : texte sous la révélation ('' = aucun) ──────────────── */
  function hatch(el, opts) {
    opts = opts || {};
    var C = themeColors();
    var container = opts.container || (function () {
      var n = el.parentElement;
      while (n && n !== document.body) n = n.parentElement;
      return n || document.body;
    })();
    var ov = makeOverlay(container);
    var fxp = makeFx(ov);
    var p = center(el, ov);
    var size = Math.max(el.offsetWidth, el.offsetHeight, 60);
    /* 1. tremble (l'œuf original reste visible, on secoue juste) */
    var shakeAnim = el.animate([
      { transform: 'rotate(0)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(6deg)' },
      { transform: 'rotate(-8deg)' }, { transform: 'rotate(8deg)' }, { transform: 'rotate(-4deg)' },
      { transform: 'rotate(4deg)' }, { transform: 'rotate(0)' }
    ], { duration: 900, iterations: 2, easing: 'ease-in-out' });
    return shakeAnim.finished.catch(function () {}).then(function () {
      /* 2. craque : flash + éclats de coquille qui s'écartent */
      el.style.opacity = '0';
      var flash = mk(ov, 'inset:0;background:radial-gradient(circle at ' + p.x + 'px ' + p.y + 'px, rgba(255,246,220,.9), transparent 55%);');
      anim(flash, [{ opacity: 0.7 }, { opacity: 0 }], { duration: 450, easing: 'ease-out', fill: 'forwards' });
      for (var i = 0; i < 6; i++) {
        var a = Math.PI * 2 * i / 6;
        var shard = mk(ov, at(p.x, p.y, size * 0.32) + 'background:#f5e3c2;clip-path:polygon(50% 0,100% 40%,70% 100%,20% 80%,0 30%);box-shadow:0 3px 8px rgba(0,0,0,.35);');
        anim(shard, [
          { transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 },
          { transform: 'translate(' + (Math.cos(a) * size * 0.9) + 'px,' + (Math.sin(a) * size * 0.9 - 20) + 'px) rotate(' + (i % 2 ? 220 : -220) + 'deg) scale(.4)', opacity: 0 }
        ], { duration: 700, easing: 'cubic-bezier(.3,0,.6,1)', fill: 'forwards' });
      }
      fxp.burst(p.x, p.y, 26, [C.gold, '#fff3d1', '#7fe7c4'], 3.6);
      /* 3. le dino surprise apparaît à la place de l'œuf */
      var reveal = mk(ov, at(p.x, p.y, size) + 'display:flex;align-items:center;justify-content:center;');
      if (opts.imgSrc) {
        var img = document.createElement('img');
        img.src = opts.imgSrc;
        img.alt = '';
        img.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 6px 14px rgba(0,0,0,.5));';
        reveal.appendChild(img);
      }
      reveal.animate(POP, { duration: 700, delay: 260, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' });
      setTimeout(function () {
        fxp.confetti(46, [C.gold, C.accent, C.green, '#ff7ac8']);
      }, 500);
      if (opts.label) labelEl(ov, p.x, p.y + size * 0.62 + 20, opts.label);
      return wait(1600);
    }).then(function () {
      fxp.stop();
      return ov; /* laissé au caller : il retire l'overlay quand il ferme la séquence */
    });
  }

  /* ── MaxFX.eggEarned — capsule gagnée en fin de partie (NID, chantier
     2026-07-26, réécrite v2 suite retour playtest Papa Yann "j'ai joué,
     j'ai pas compris ce qui se passait"). Distinct de MaxFX.hatch (réservée
     à l'ÉCLOSION au 3e œuf, sur le Mur — révèle un dino).
     Ici : GROS œuf plein cadre (~40% de la hauteur), pop d'apparition,
     wobble, texte bref, PUIS il file vers toEl (coin/badge du nid) avec
     une traînée. Séquence ~1.5-2s, un son court (banque existante).
     opts.golden : true → teinte dorée (série de 3, avenant P0 §3).
     opts.toEl : élément-cible où l'œuf s'envole à la fin (déf. : el lui-même,
       vol vertical court — cf. eggEarned appelé sans cible explicite).
     opts.label : texte affiché sous l'œuf ('' = aucun, déf. 'Un œuf pour le nid !').
     Retourne une Promise résolue à la fin de l'anim complète. ─────────── */
  function eggEarned(el, opts) {
    opts = opts || {};
    var C = themeColors();
    var container = document.body;
    var ov = makeOverlay(container);
    var fxp = makeFx(ov);
    var gold = !!opts.golden;
    var W = ov.clientWidth, H = ov.clientHeight;
    var cx = W / 2, cy = H * 0.4;
    var toP = opts.toEl ? center(opts.toEl, ov) : center(el, ov);
    var eggSize = Math.min(W, H) * 0.4;
    // NID v4 (2026-07-30) : opts.color = teinte FAMILLE de l'œuf (le doré
    // reste prioritaire) · opts.emoji = visuel custom (accessoire de soin
    // gagné à la place d'un œuf quand le nid est plein — même théâtre).
    var col = gold ? C.gold : (opts.color || C.accent);

    // son court (banque existante, jamais de nouveau réseau)
    try {
      var snd = new Audio('sounds/fx/pop-apparition.mp3');
      snd.volume = 0.7; snd.play().catch(function () {});
    } catch (e) {}

    // flash doux derrière le gros œuf
    var flash = mk(ov, 'inset:0;background:radial-gradient(circle at ' + cx + 'px ' + cy + 'px, rgba(255,246,220,.55), transparent 60%);');
    anim(flash, [{ opacity: 1 }, { opacity: 0 }], { duration: 500, easing: 'ease-out', fill: 'forwards' });

    // le gros œuf (emoji, cohérent avec le nid sur le Mur)
    var egg = mk(ov, at(cx, cy, eggSize) + 'font-size:' + eggSize + 'px;line-height:1;filter:drop-shadow(0 10px 24px rgba(0,0,0,.5)) drop-shadow(0 0 26px ' + col + ');', opts.emoji || '🥚');
    fxp.burst(cx, cy, gold ? 30 : 18, gold ? [C.gold, '#fff3d1'] : [C.accent, '#ffffff'], 3);

    // Label texte (pas labelEl : sa boîte 240px fixe centre mal un texte
    // court/variable). Ligne pleine largeur, texte centré — toujours bien
    // positionné quel que soit le nombre de caractères.
    var labelTxt = opts.label != null ? opts.label : 'Un œuf pour le nid !';
    var label = null;
    if (labelTxt) {
      label = mk(ov, 'left:0;right:0;top:' + (cy + eggSize * 0.5 + 34) + 'px;width:auto;' +
        'text-align:center;font:900 20px/1.3 "Fredoka One","Nunito",system-ui;' +
        'color:' + (gold ? '#3a2a06' : '#fff') + ';opacity:0;');
      var pill = document.createElement('span');
      pill.textContent = labelTxt;
      pill.style.cssText = 'display:inline-block;background:' + (gold ? 'rgba(255,209,102,.92)' : 'rgba(6,10,22,.78)') +
        ';border-radius:999px;padding:8px 16px;text-shadow:0 0 18px rgba(255,209,102,.4);';
      label.appendChild(pill);
      anim(label, [
        { opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 500, easing: 'ease-out', fill: 'forwards' });
    }

    // 1. POP d'apparition + 2. wobble (vivant, pas statique)
    var popWobble = anim(egg, [
      { transform: 'scale(0) rotate(-18deg)', opacity: 0 },
      { transform: 'scale(1.18) rotate(6deg)', opacity: 1, offset: 0.45 },
      { transform: 'scale(.94) rotate(-4deg)', offset: 0.62 },
      { transform: 'scale(1.04) rotate(3deg)', offset: 0.78 },
      { transform: 'scale(1) rotate(-2deg)', offset: 0.9 },
      { transform: 'scale(1) rotate(0deg)' }
    ], { duration: 900, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'forwards' });

    return popWobble.then(function () { return wait(500); }).then(function () {
      // 3. il file vers le coin/badge avec une traînée
      var dx = toP.x - cx, dy = toP.y - cy;
      var iv = setInterval(function () {
        var b = egg.getBoundingClientRect(), o = ov.getBoundingClientRect();
        fxp.trail(b.left + b.width / 2 - o.left, b.top + b.height / 2 - o.top, col, 3);
      }, 35);
      if (label) anim(label, [{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' });
      return anim(egg, [
        { transform: 'translate(0,0) scale(1)' },
        { transform: 'translate(' + (dx * 0.3) + 'px,' + (dy * 0.3 - 30) + 'px) scale(.7)', offset: 0.4 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.3)', opacity: 0.9 }
      ], { duration: 450, easing: 'cubic-bezier(.5,0,.8,.4)', fill: 'forwards' })
        .then(function () { clearInterval(iv); });
    }).then(function () {
      fxp.stop(); ov.remove();
    });
  }

  /* ── Tirages OFFICIELS bibliothèque (CONTRAT-MJ 2026-07-19) ─────────
     Un jeu ne choisit pas son animation : il pioche dans la bibliothèque.
     randomPoint = anim de point aléatoire · randomFinal = victoire sans-faute
     aléatoire. Ajouter une célébration = l'ajouter à MARKS/STARS ici même
     (elle entre d'office dans le tirage), JAMAIS d'animation ad-hoc en jeu. */
  function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }
  function randomPoint(fromEl, toEl, opts) {
    opts = opts || {};
    if (!MARKS[opts.style]) opts.style = pick(Object.keys(MARKS));
    return markPoint(fromEl, toEl, opts);
  }
  function randomFinal(container, opts) {
    opts = opts || {};
    if (!STARS[opts.style]) opts.style = pick(Object.keys(STARS));
    return finalStar(container, opts);
  }

  global.MaxFX = {
    markPoint: markPoint,
    finalStar: finalStar,
    randomPoint: randomPoint,
    randomFinal: randomFinal,
    glow: glow,
    hatch: hatch,
    eggEarned: eggEarned,
    markStyles: Object.keys(MARKS),
    starStyles: Object.keys(STARS)
  };
})(window);
