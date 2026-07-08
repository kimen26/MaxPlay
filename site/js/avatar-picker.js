// avatar-picker.js — Picker léger local « Choisis ton dino ».
// Auto-injecte un badge avatar (haut du menu) + une modale grille des 10 dinos.
// Choix stocké en localStorage (maxplay_avatar). Aucune dépendance compte/cloud.
// L'humeur affichée est piochée au hasard à chaque chargement = variété (voulu par Papa Yann).
// Requiert : js/avatars.js (window.MAXPLAY_AVATARS).
(function () {
  'use strict';
  var BASE = window.MAXPLAY_AVATARS_BASE || 'img/avatars/';
  var LIST = window.MAXPLAY_AVATARS || [];
  var KEY = 'maxplay_avatar';

  var Avatar = {
    all: function () { return LIST; },
    byId: function (id) { return LIST.filter(function (a) { return a.id === id; })[0] || null; },
    get: function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set: function (id) { try { localStorage.setItem(KEY, id); } catch (e) {} },
    rand: function (arr) { return arr[Math.floor(Math.random() * arr.length)]; },
    // fichier d'un dino : humeur imposée ou aléatoire, variante aléatoire
    file: function (id, mood) {
      var a = this.byId(id); if (!a) return null;
      var moods = mood ? [mood] : Object.keys(a.moods).filter(function (m) { return a.moods[m] && a.moods[m].length; });
      if (!moods.length) return null;
      var m = this.rand(moods), list = a.moods[m];
      if (!list || !list.length) return null;
      return BASE + this.rand(list);
    }
  };
  window.Avatar = Avatar;

  if (!LIST.length) return; // pas de manifest → on ne fait rien

  // ── styles ──────────────────────────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent = [
    '#av-badge{position:fixed;top:calc(8px + env(safe-area-inset-top));left:10px;z-index:9998;',
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
    '.av-cell .an{color:#fff;font-weight:900;font-size:.82rem}',
    '.av-close{display:block;margin:16px auto 0;background:rgba(255,255,255,.12);color:#fff;border:none;',
    '  border-radius:14px;padding:10px 22px;font-weight:800;font-size:1rem;cursor:pointer;font-family:inherit}',
    '@keyframes avpop{0%{transform:scale(.4);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}',
    '#av-badge img.pop{animation:avpop .4s ease-out}',
    '@media(prefers-reduced-motion:reduce){#av-badge img.pop{animation:none}}'
  ].join('');
  document.head.appendChild(css);

  // ── badge ───────────────────────────────────────────────────────────────
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
      badge.innerHTML = '<img src="' + f + '" alt="">';
      if (pop) badge.firstChild.classList.add('pop');
    } else {
      badge.innerHTML = '<span class="av-q">🦕</span><span class="av-plus">+</span>';
    }
  }

  // ── modale ──────────────────────────────────────────────────────────────
  var ov = document.createElement('div');
  ov.id = 'av-ov';
  var grid = LIST.map(function (a) {
    var thumb = BASE + (a.moods.joyeux[0] || (a.moods.enerve[0]) || a.moods.original[0]);
    return '<div class="av-cell" data-id="' + a.id + '"><img src="' + thumb + '" alt=""><span class="an">' + a.name + '</span></div>';
  }).join('');
  ov.innerHTML = '<div id="av-box"><h3>🦕 Choisis ton dino !</h3><p>Ce sera ton copain dans le menu</p>' +
    '<div id="av-grid">' + grid + '</div><button class="av-close">Fermer</button></div>';
  document.body.appendChild(ov);

  function open() { markSel(); ov.classList.add('show'); }
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
    if (cell) {
      Avatar.set(cell.getAttribute('data-id'));
      paintBadge(true);
      markSel();
      setTimeout(close, 260);
    }
  });

  paintBadge(false);
})();
