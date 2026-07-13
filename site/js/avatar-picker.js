// avatar-picker.js — Picker local « Choisis ton dino » + atelier couleurs intégré + animations.
// Badge avatar (haut du menu) → modale grille (triée par nom) → panneau couleurs (3 nuances).
// Choix stocké en localStorage : maxplay_avatar (id, compat) + maxplay_avatar_cfg ({id, targets}).
// L'humeur affichée est piochée au hasard à chaque chargement = variété (voulu par Papa Yann).
// La recoloration canvas préserve contour noir + blancs + ombrage (même algo que atelier-couleurs.html).
// API publique : window.Avatar { get, set, file, getColors, setColors, paintInto, celebrate }
// Événement : window.dispatchEvent(new CustomEvent('maxplay:win')) → célébration auto du badge.
// Requiert : js/avatars.js (window.MAXPLAY_AVATARS).
(function () {
  'use strict';
  var BASE = window.MAXPLAY_AVATARS_BASE || 'img/avatars/';
  var LIST = (window.MAXPLAY_AVATARS || []).slice().sort(function (a, b) { return a.name.localeCompare(b.name, 'fr'); });
  var KEY = 'maxplay_avatar';
  var KEYC = 'maxplay_avatar_cfg';

  // ── util couleur (même algo que atelier-couleurs.html) ───────────────────
  function hex(r, g, b) { return '#' + [r, g, b].map(function (v) { return ('0' + Math.max(0, Math.min(255, v | 0)).toString(16)).slice(-2); }).join(''); }
  function fromHex(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  function dist(a, b) { var dr = a[0] - b[0], dg = a[1] - b[1], db = a[2] - b[2]; return dr * dr + dg * dg + db * db; }
  function rgb2hsl(r, g, b) {
    r /= 255; g /= 255; b /= 255; var mx = Math.max(r, g, b), mn = Math.min(r, g, b), h, s, l = (mx + mn) / 2;
    if (mx === mn) { h = s = 0; } else {
      var d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6;
    } return [h * 360, s, l];
  }
  function hsl2rgb(h, s, l) {
    h /= 360; function f(p, q, t) { if (t < 0) t++; if (t > 1) t--; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; }
    var q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [f(p, q, h + 1 / 3), f(p, q, h), f(p, q, h - 1 / 3)].map(function (v) { return Math.round(v * 255); });
  }
  // pixel gardé tel quel : transparent, contour noir, blanc/crème
  function isKept(r, g, b, a) {
    if (a < 180) return true;
    if (r < 50 && g < 50 && b < 50) return true;
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    return (mx > 235 && (mx - mn) < 22);
  }
  function extractBases(d) {
    var hist = {};
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i], g = d[i + 1], b = d[i + 2];
      if (isKept(r, g, b, d[i + 3])) continue;
      var key = (Math.round(r / 32) * 32) + ',' + (Math.round(g / 32) * 32) + ',' + (Math.round(b / 32) * 32);
      hist[key] = (hist[key] || 0) + 1;
    }
    var arr = Object.keys(hist).map(function (k) { return { c: k.split(',').map(Number), n: hist[k] }; }).sort(function (a, b) { return b.n - a.n; });
    var picked = [];
    for (var j = 0; j < arr.length && picked.length < 3; j++) {
      var ok = true; for (var p = 0; p < picked.length; p++) if (dist(arr[j].c, picked[p]) < 2600) { ok = false; break; }
      if (ok) picked.push(arr[j].c);
    }
    if (!picked.length && arr.length) picked.push(arr[0].c);
    return picked;
  }
  // recolorer un ImageData en place : base la plus proche → décalage préservé
  function recolorData(imgData, bases, targets) {
    var s = imgData.data;
    for (var i = 0; i < s.length; i += 4) {
      var r = s[i], g = s[i + 1], b = s[i + 2];
      if (isKept(r, g, b, s[i + 3])) continue;
      var bi = -1, bd = 1e9;
      for (var k = 0; k < bases.length; k++) { var dd = dist([r, g, b], bases[k]); if (dd < bd) { bd = dd; bi = k; } }
      if (bi < 0 || !targets[bi]) continue;
      var t = targets[bi], base = bases[bi];
      s[i] = Math.max(0, Math.min(255, r - base[0] + t[0]));
      s[i + 1] = Math.max(0, Math.min(255, g - base[1] + t[1]));
      s[i + 2] = Math.max(0, Math.min(255, b - base[2] + t[2]));
    }
    return imgData;
  }
  // couleurs cibles « variance forte » : la base la plus CLAIRE reste telle quelle,
  // les autres deviennent des couleurs vives totalement aléatoires (jamais brun/gris : saturation haute)
  function vividTargets(bases) {
    var lightIdx = 0, best = -1;
    bases.forEach(function (b, i) { var l = rgb2hsl(b[0], b[1], b[2])[2]; if (l > best) { best = l; lightIdx = i; } });
    return bases.map(function (b, i) {
      if (i === lightIdx) return b.slice();
      return hsl2rgb(Math.floor(Math.random() * 360), .65 + Math.random() * .3, .45 + Math.random() * .17);
    });
  }
  // charge un fichier, le recolore, rend un dataURL (ou null si canvas KO).
  // targets : tableau de couleurs, OU une fonction (bases) -> targets (calculée sur l'image chargée)
  function recolorFile(src, targets, cb) {
    var img = new Image();
    img.onload = function () {
      try {
        var cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height;
        var c2 = cv.getContext('2d', { willReadFrequently: true });
        c2.drawImage(img, 0, 0);
        var d = c2.getImageData(0, 0, cv.width, cv.height);
        var bases = extractBases(d.data);
        var t = (typeof targets === 'function') ? targets(bases) : targets;
        c2.putImageData(recolorData(d, bases, t), 0, 0);
        cb(cv.toDataURL('image/png'));
      } catch (e) { cb(null); }
    };
    img.onerror = function () { cb(null); };
    img.src = src;
  }

  // ── API ───────────────────────────────────────────────────────────────────
  var Avatar = {
    all: function () { return LIST; },
    byId: function (id) { return LIST.filter(function (a) { return a.id === id; })[0] || null; },
    get: function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set: function (id) { try { localStorage.setItem(KEY, id); } catch (e) {} },
    getColors: function () {
      try {
        var c = JSON.parse(localStorage.getItem(KEYC) || 'null');
        return (c && c.id === this.get() && c.targets && c.targets.length) ? c.targets : null;
      } catch (e) { return null; }
    },
    setColors: function (targets) {
      try {
        if (targets) localStorage.setItem(KEYC, JSON.stringify({ id: this.get(), targets: targets }));
        else localStorage.removeItem(KEYC);
      } catch (e) {}
    },
    rand: function (arr) { return arr[Math.floor(Math.random() * arr.length)]; },
    // fichier d'un dino : humeur imposée ou aléatoire, variante aléatoire
    file: function (id, mood) {
      var a = this.byId(id); if (!a) return null;
      var moods = mood ? [mood] : Object.keys(a.moods).filter(function (m) { return a.moods[m] && a.moods[m].length; });
      if (!moods.length) return null;
      var m = this.rand(moods), list = a.moods[m];
      if (!list || !list.length) return null;
      return BASE + this.rand(list);
    },
    // peint un fichier dans un <img>, recoloré si des couleurs sont stockées
    paintInto: function (imgEl, file, targets) {
      var t = targets || this.getColors();
      if (!t) { imgEl.src = file; return; }
      recolorFile(file, t, function (url) { imgEl.src = url || file; });
    },
    // célébration : le copain saute + pluie de particules (coeurs / étoiles / feu d'artifice)
    celebrate: function (kind) { celebrate(kind); }
  };
  window.Avatar = Avatar;

  if (!LIST.length) return; // pas de manifest → on ne fait rien

  // ── styles ──────────────────────────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent = [
    // pointer-events:auto obligatoire : .hub-hdr (theme.css) est en pointer-events:none
    '#av-badge{position:fixed;top:calc(8px + env(safe-area-inset-top));left:10px;z-index:9998;pointer-events:auto;',
    '  width:52px;height:52px;border-radius:50%;border:none;cursor:pointer;padding:0;',
    '  background:rgba(255,255,255,.14);box-shadow:0 3px 10px #0005;display:grid;place-items:center;',
    '  -webkit-tap-highlight-color:transparent;overflow:visible;transition:transform .12s;}',
    '#av-badge:active{transform:scale(.9)}',
    '#av-badge.av-inline{position:static;top:auto;left:auto;width:44px;height:44px;flex:0 0 auto;margin-right:4px}',
    '#av-badge.av-inline img{width:38px;height:38px}',
    '#av-badge img{width:46px;height:46px;object-fit:contain;filter:drop-shadow(0 2px 3px #0006)}',
    '#av-badge .av-q{font-size:26px;line-height:1}',
    '#av-badge .av-plus{position:absolute;right:-2px;bottom:-2px;width:20px;height:20px;border-radius:50%;',
    '  background:#ffe066;color:#7a5a00;font-weight:900;font-size:14px;display:grid;place-items:center;box-shadow:0 1px 3px #0006}',
    '#av-ov{position:fixed;inset:0;z-index:10000;background:rgba(8,10,30,.82);backdrop-filter:blur(4px);',
    '  display:none;align-items:center;justify-content:center;padding:18px;-webkit-tap-highlight-color:transparent}',
    '#av-ov.show{display:flex}',
    '#av-box{background:linear-gradient(180deg,#171d44,#0f1435);border:1px solid rgba(255,255,255,.12);',
    '  border-radius:24px;max-width:560px;width:100%;max-height:88vh;overflow-y:auto;padding:20px 16px 22px;',
    '  box-shadow:0 20px 60px #000a;font-family:inherit}',
    '#av-box h3{color:#fff;font-size:1.3rem;font-weight:900;text-align:center;margin:0 0 4px}',
    '#av-box p{color:rgba(255,255,255,.6);text-align:center;font-size:.9rem;margin:0 0 16px}',
    '#av-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:10px}',
    '.av-cell{background:rgba(255,255,255,.05);border:2px solid transparent;border-radius:18px;padding:8px 4px 6px;',
    '  cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;transition:transform .1s,border-color .1s}',
    '.av-cell:active{transform:scale(.94)}',
    '.av-cell.sel{border-color:#ffe066;background:#ffe0661a}',
    '.av-cell img{width:66px;height:66px;object-fit:contain}',
    '.av-cell .an{color:#fff;font-weight:900;font-size:.82rem;text-align:center}',
    '.av-close{display:block;margin:16px auto 0;background:rgba(255,255,255,.12);color:#fff;border:none;',
    '  border-radius:14px;padding:10px 22px;font-weight:800;font-size:1rem;cursor:pointer;font-family:inherit}',
    // ── panneau couleurs ──
    '#av-col{display:none}',
    '#av-col.show{display:block}',
    '#av-grid.hide{display:none}',
    '#av-cv{display:block;margin:0 auto 10px;width:190px;height:190px;background:rgba(255,255,255,.06);border-radius:22px}',
    '#av-sw{display:flex;justify-content:center;gap:14px;margin:0 0 12px}',
    '.av-chip{width:52px;height:52px;border-radius:50%;border:3px solid rgba(255,255,255,.35);position:relative;',
    '  box-shadow:0 3px 8px #0006;overflow:hidden}',
    '.av-chip input{position:absolute;inset:-10px;width:80px;height:80px;opacity:0;cursor:pointer}',
    '#av-pre{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:0 0 12px}',
    '.av-p{width:34px;height:34px;border-radius:50%;border:2px solid rgba(255,255,255,.3);cursor:pointer}',
    '.av-p:active{transform:scale(.9)}',
    '#av-act{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}',
    '#av-act button{background:rgba(255,255,255,.12);color:#fff;border:none;border-radius:14px;padding:10px 16px;',
    '  font-weight:800;font-size:.95rem;cursor:pointer;font-family:inherit}',
    '#av-act button.ok{background:#ffe066;color:#5a4200}',
    // ── animations ──
    '@keyframes avpop{0%{transform:scale(.4);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}',
    '#av-badge img.pop{animation:avpop .4s ease-out}',
    '@keyframes avidle1{0%,100%{transform:translateY(0)}30%{transform:translateY(-7px) rotate(-5deg)}60%{transform:translateY(0) rotate(4deg)}}',
    '@keyframes avidle2{0%,100%{transform:rotate(0)}25%{transform:rotate(-10deg)}75%{transform:rotate(10deg)}}',
    '@keyframes avidle3{0%,100%{transform:scale(1)}50%{transform:scale(1.16)}}',
    '#av-badge img.av-i1{animation:avidle1 .9s ease-in-out}',
    '#av-badge img.av-i2{animation:avidle2 .8s ease-in-out}',
    '#av-badge img.av-i3{animation:avidle3 .7s ease-in-out}',
    '@keyframes avjump{0%,100%{transform:translateY(0) scale(1)}30%{transform:translateY(-14px) scale(1.25)}55%{transform:translateY(0) scale(.95)}75%{transform:translateY(-7px) scale(1.1)}}',
    '#av-badge img.av-joy{animation:avjump 1s ease-in-out}',
    '.av-part{position:fixed;z-index:9999;pointer-events:none;font-size:22px;left:0;top:0;will-change:transform,opacity;',
    '  animation:avpart var(--d,1.1s) ease-out forwards}',
    '@keyframes avpart{0%{transform:translate(var(--x),var(--y)) scale(.4);opacity:1}',
    '  100%{transform:translate(calc(var(--x) + var(--dx)),calc(var(--y) + var(--dy))) scale(1.35);opacity:0}}',
    '@media(prefers-reduced-motion:reduce){#av-badge img.pop,#av-badge img.av-i1,#av-badge img.av-i2,#av-badge img.av-i3,',
    '  #av-badge img.av-joy,.av-part{animation:none}}'
  ].join('');
  document.head.appendChild(css);

  // ── badge ───────────────────────────────────────────────────────────────
  // <body data-av-nobadge> : la page gère elle-même l'affichage de l'avatar
  // (accueil design system v1 : bloc profil) → pas de badge flottant injecté.
  if (document.body && document.body.hasAttribute('data-av-nobadge')) return;
  var badge = document.createElement('button');
  badge.id = 'av-badge';
  badge.setAttribute('aria-label', 'Choisis ton dino');
  // header à barre (ex. fusée .hub-hdr) → badge inline pour ne pas écraser le titre ; sinon fixe.
  var bar = document.querySelector('.hub-hdr');
  if (bar) { badge.classList.add('av-inline'); bar.insertBefore(badge, bar.firstChild); }
  else { document.body.appendChild(badge); }

  function paintBadge(pop) {
    var id = Avatar.get();
    var f = id ? Avatar.file(id) : null;
    if (f) {
      badge.innerHTML = '<img alt="">';
      // ~1 fois sur 6-7 : variance forte surprise (le clair reste clair, le reste en couleurs vives random)
      if (Math.random() < 0.15) recolorFile(f, vividTargets, function (url) { badge.firstChild.src = url || f; });
      else Avatar.paintInto(badge.firstChild, f);
      if (pop) badge.firstChild.classList.add('pop');
    } else {
      badge.innerHTML = '<span class="av-q">🦕</span><span class="av-plus">+</span>';
    }
  }

  // ── animation idle : petit mouvement aléatoire toutes les 5-11 s ─────────
  (function idleLoop() {
    var delay = 5000 + Math.random() * 6000;
    setTimeout(function () {
      var img = badge.querySelector('img');
      if (img && !document.hidden) {
        var cls = 'av-i' + (1 + Math.floor(Math.random() * 3));
        img.classList.add(cls);
        setTimeout(function () { img.classList.remove(cls); }, 1000);
      }
      idleLoop();
    }, delay);
  })();

  // ── célébration : avatar joyeux + particules ─────────────────────────────
  var PARTS = { coeur: ['❤️', '💛', '💙', '💚'], etoile: ['⭐', '🌟', '✨'], feu: ['🎆', '🎇', '✨', '🎉'] };
  function celebrate(kind) {
    var set = PARTS[kind] || PARTS[Avatar.rand(Object.keys(PARTS))];
    var id = Avatar.get();
    // passe le badge en humeur joyeuse pendant la fête
    if (id) {
      var f = Avatar.file(id, 'joyeux');
      if (f && badge.querySelector('img')) Avatar.paintInto(badge.querySelector('img'), f);
    }
    var img = badge.querySelector('img');
    if (img) { img.classList.remove('av-joy'); void img.offsetWidth; img.classList.add('av-joy'); }
    var r = badge.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (var i = 0; i < 12; i++) {
      var s = document.createElement('span');
      s.className = 'av-part'; s.textContent = Avatar.rand(set);
      var ang = Math.random() * Math.PI * 2, d = 55 + Math.random() * 75;
      s.style.setProperty('--x', (cx - 11) + 'px');
      s.style.setProperty('--y', (cy - 11) + 'px');
      s.style.setProperty('--dx', (Math.cos(ang) * d) + 'px');
      s.style.setProperty('--dy', (Math.sin(ang) * d - 30) + 'px');
      s.style.setProperty('--d', (0.9 + Math.random() * 0.6) + 's');
      document.body.appendChild(s);
      setTimeout(function (el) { el.remove(); }.bind(null, s), 1700);
    }
    setTimeout(function () { paintBadge(false); }, 2600); // retour humeur aléatoire
  }
  window.addEventListener('maxplay:win', function (e) { celebrate(e && e.detail && e.detail.kind); });

  // ── modale : vue grille + vue couleurs ────────────────────────────────────
  var ov = document.createElement('div');
  ov.id = 'av-ov';
  var grid = LIST.map(function (a) {
    var thumb = thumbFile(a); // = la même image que la vue couleurs
    return '<div class="av-cell" data-id="' + a.id + '"><img src="' + thumb + '" alt=""><span class="an">' + a.name + '</span></div>';
  }).join('');
  ov.innerHTML = '<div id="av-box"><h3 id="av-title">🦕 Choisis ton dino !</h3><p id="av-sub">Ce sera ton copain dans le menu</p>' +
    '<div id="av-grid">' + grid + '</div>' +
    '<div id="av-col"><canvas id="av-cv" width="360" height="360"></canvas>' +
    '<div id="av-sw"></div><div id="av-pre"></div>' +
    '<div id="av-act"><button id="av-rnd">🎲 Surprise</button><button id="av-org">D\'origine</button>' +
    '<button id="av-ok" class="ok">✓ C\'est bon !</button></div></div>' +
    '<button class="av-close">Fermer</button></div>';
  document.body.appendChild(ov);

  var colState = null; // {id, file, srcData, bases, targets, cv, ctx}
  var PRESETS = [210, 130, 330, 275, 28, 0, 48, 185]; // teintes : bleu vert rose violet orange rouge or cyan

  function showGrid() {
    document.getElementById('av-title').textContent = '🦕 Choisis ton dino !';
    document.getElementById('av-sub').textContent = 'Ce sera ton copain dans le menu';
    document.getElementById('av-grid').classList.remove('hide');
    document.getElementById('av-col').classList.remove('show');
    colState = null;
    markSel();
  }
  // même fichier que la vignette de la grille (dernière variante joyeux) — pas de variante au hasard,
  // sinon l'enfant voit une image différente entre le menu et la vue couleurs (retour Papa Yann)
  function thumbFile(a) {
    var lst = (a.moods.joyeux && a.moods.joyeux.length ? a.moods.joyeux : null) || a.moods.enerve || a.moods.original;
    return (lst && lst.length) ? BASE + lst[lst.length - 1] : null;
  }
  function showColors(id) {
    var a = Avatar.byId(id); if (!a) return;
    var file = thumbFile(a); if (!file) return;
    document.getElementById('av-title').textContent = '🎨 ' + a.name;
    document.getElementById('av-sub').textContent = 'Tape une pastille pour changer ses couleurs !';
    document.getElementById('av-grid').classList.add('hide');
    document.getElementById('av-col').classList.add('show');
    var cv = document.getElementById('av-cv'), c2 = cv.getContext('2d', { willReadFrequently: true });
    var img = new Image();
    img.onload = function () {
      c2.clearRect(0, 0, cv.width, cv.height);
      var rr = Math.min(cv.width / img.width, cv.height / img.height), w = img.width * rr, h = img.height * rr;
      c2.drawImage(img, (cv.width - w) / 2, (cv.height - h) / 2, w, h);
      var srcData = null;
      try { srcData = c2.getImageData(0, 0, cv.width, cv.height); } catch (e) {}
      if (!srcData) { finishPick(id, null); return; } // canvas KO (file://) → choix simple sans couleurs
      var bases = extractBases(srcData.data);
      var stored = null;
      try { var cfg = JSON.parse(localStorage.getItem(KEYC) || 'null'); if (cfg && cfg.id === id) stored = cfg.targets; } catch (e) {}
      var targets = (stored && stored.length === bases.length) ? stored.map(function (c) { return c.slice(); })
        : bases.map(function (c) { return c.slice(); });
      colState = { id: id, srcData: srcData, bases: bases, targets: targets, cv: cv, ctx: c2 };
      repaintCol(); renderSw();
    };
    img.onerror = function () { finishPick(id, null); };
    img.src = file;
  }
  function repaintCol() {
    if (!colState) return;
    var d = colState.ctx.createImageData(colState.srcData.width, colState.srcData.height);
    d.data.set(colState.srcData.data);
    colState.ctx.putImageData(recolorData(d, colState.bases, colState.targets), 0, 0);
  }
  function renderSw() {
    var el = document.getElementById('av-sw'); el.innerHTML = '';
    colState.targets.forEach(function (t, i) {
      var d = document.createElement('div');
      d.className = 'av-chip'; d.style.background = hex(t[0], t[1], t[2]);
      d.innerHTML = '<input type="color" value="' + hex(t[0], t[1], t[2]) + '" data-i="' + i + '">';
      el.appendChild(d);
    });
    el.querySelectorAll('input').forEach(function (inp) {
      inp.addEventListener('input', function () {
        var i = +this.dataset.i; colState.targets[i] = fromHex(this.value);
        this.parentElement.style.background = this.value; repaintCol();
      });
    });
  }
  function finishPick(id, targets) {
    Avatar.set(id);
    Avatar.setColors(targets); // null = couleurs d'origine
    paintBadge(true);
    close();
    setTimeout(function () { celebrate('etoile'); }, 350);
  }

  // presets + boutons du panneau couleurs
  document.getElementById('av-pre').innerHTML = PRESETS.map(function (h, i) {
    return '<div class="av-p" data-i="' + i + '" style="background:' + hex.apply(null, hsl2rgb(h, .7, .5)) + '"></div>';
  }).join('');
  ov.querySelectorAll('.av-p').forEach(function (el) {
    el.addEventListener('click', function () {
      if (!colState) return;
      var h = PRESETS[+this.dataset.i];
      colState.targets = colState.bases.map(function (base) {
        var hsl = rgb2hsl(base[0], base[1], base[2]); return hsl2rgb(h, Math.max(.35, hsl[1]), hsl[2]);
      });
      renderSw(); repaintCol();
    });
  });
  document.getElementById('av-rnd').addEventListener('click', function () {
    if (!colState) return;
    // même logique que la variance forte : clair conservé, le reste en couleurs vives random
    colState.targets = vividTargets(colState.bases);
    renderSw(); repaintCol();
  });
  document.getElementById('av-org').addEventListener('click', function () {
    if (!colState) return;
    colState.targets = colState.bases.map(function (c) { return c.slice(); });
    renderSw(); repaintCol();
  });
  document.getElementById('av-ok').addEventListener('click', function () {
    if (!colState) return;
    var changed = colState.targets.some(function (t, i) { return dist(t, colState.bases[i]) > 30; });
    finishPick(colState.id, changed ? colState.targets : null);
  });

  function open() { showGrid(); ov.classList.add('show'); }
  function close() { ov.classList.remove('show'); }
  function markSel() {
    var cur = Avatar.get();
    ov.querySelectorAll('.av-cell').forEach(function (c) {
      c.classList.toggle('sel', c.getAttribute('data-id') === cur);
    });
  }

  badge.addEventListener('click', open);
  ov.addEventListener('click', function (e) {
    if (e.target === ov || e.target.classList.contains('av-close')) { close(); return; }
    var cell = e.target.closest && e.target.closest('.av-cell');
    if (cell) showColors(cell.getAttribute('data-id'));
  });

  paintBadge(false);
})();
