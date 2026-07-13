// ─────────────────────────────────────────────────────────────────────────
//  mp-theme.js — Applique le Design System MaxPlay v1 (mp-theme.css)
//  1. Ambiance : localStorage['maxplay_ambiance'] → <body data-ambiance="…">
//     (6 ambiances : nuit·jungle·ville·espace·arcade·musee — défaut : nuit)
//  2. Teinte avatar : --h-avatar = teinte (hue) de la couleur la PLUS SATURÉE
//     des 3 couleurs de l'avatar (maxplay_avatar_cfg via Avatar.getColors()
//     ou lecture directe du localStorage si avatar-picker.js absent).
//  Usage : <script src="js/mp-theme.js"></script> après mp-theme.css.
//  API : window.MPTheme = { setAmbiance(a), refresh(), AMBIANCES }
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  var AMBIANCES = ['nuit', 'jungle', 'ville', 'espace', 'arcade', 'musee'];
  var KEY_AMB = 'maxplay_ambiance';

  function storedAmbiance() {
    try {
      var a = localStorage.getItem(KEY_AMB);
      return AMBIANCES.indexOf(a) >= 0 ? a : 'nuit';
    } catch (e) { return 'nuit'; }
  }

  function avatarColors() {
    // via avatar-picker.js si chargé, sinon lecture directe (même format)
    try {
      if (global.Avatar && global.Avatar.getColors) return global.Avatar.getColors();
      var c = JSON.parse(localStorage.getItem('maxplay_avatar_cfg') || 'null');
      return (c && c.targets && c.targets.length) ? c.targets : null;
    } catch (e) { return null; }
  }

  // hue (0-360) de la couleur la plus saturée d'une liste de hex
  function dominantHue(hexList) {
    var best = null, bestSat = -1;
    (hexList || []).forEach(function (hex) {
      var m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
      if (!m) return;
      var n = parseInt(m[1], 16);
      var r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
      var mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
      var l = (mx + mn) / 2;
      var s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
      if (s <= bestSat) return;
      var h = 0;
      if (d > 0) {
        if (mx === r) h = ((g - b) / d) % 6;
        else if (mx === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h = Math.round(h * 60); if (h < 0) h += 360;
      }
      bestSat = s; best = h;
    });
    return best;
  }

  function refresh() {
    var body = document.body;
    if (body && !body.hasAttribute('data-ambiance-lock')) {
      body.setAttribute('data-ambiance', storedAmbiance());
    }
    var hue = dominantHue(avatarColors());
    if (hue !== null && hue !== undefined) {
      document.documentElement.style.setProperty('--h-avatar', String(hue));
    }
  }

  function setAmbiance(a) {
    if (AMBIANCES.indexOf(a) < 0) return;
    try { localStorage.setItem(KEY_AMB, a); } catch (e) {}
    refresh();
  }

  if (document.body) refresh();
  else document.addEventListener('DOMContentLoaded', refresh);

  global.MPTheme = { setAmbiance: setAmbiance, refresh: refresh, AMBIANCES: AMBIANCES, dominantHue: dominantHue };
})(window);
