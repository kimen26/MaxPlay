// ─────────────────────────────────────────────────────────────────────────
//  mur-scene.js — LA VALLÉE (Mur v2, spec 2026-07-29-mur-v2-la-vallee.md §3-6)
//
//  La scène EST le menu : un tapis de jeu vu du dessus où les copains se
//  baladent. Tap unique partout (drag défigé PY 2026-07-29). Ce module ne
//  porte AUCUNE logique de jeux : il consomme window.MUR (copains,
//  repaireState, vignettes, humeurs) et window.NidUI (chambre, Padidi).
//
//  Règles gravées ici :
//  · Balade libre, anti-collision stricte (« on ne se touche pas ») : cibles
//    choisies loin des autres + un seul marcheur à la fois — pas de physique.
//  · Transform-only (WAAPI) ; TOUT s'arrête au pointerdown, reprend après.
//  · Assets = images FIXES : la vie vient du déplacement, jamais de la
//    déformation (flip horizontal selon la direction, c'est tout).
//  · Humeur « délaissé » : tête boudeuse PAR INTERMITTENCE (D-002 : une
//    invitation, jamais une culpabilisation).
//  · Bulle-pensée après ~12 s d'inactivité : une vignette de jeu dans une
//    bulle au-dessus du copain délaissé, TAPPABLE → lance le jeu.
//  · Bus 162 : passe en bordure de temps en temps (busSVG), pur spectacle.
//  · Roi T-Rex immobile avec son livre → bulle 3 vignettes (encyclo/nid/
//    Padidi). Il PULSE quand un gain (œuf/accessoire) n'a pas encore été vu.
//
//  API : window.MurScene = { init, refresh }
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var DECOR = 'img/decor/';
  // Coins de prédilection (% de la scène) — chaque copain revient flâner
  // près de son décor sans y être enchaîné (spec §4.2).
  var COINS = {
    volcan:   { x: 18, y: 22 },
    arbre:    { x: 78, y: 30 },
    mare:     { x: 30, y: 56 },
    grotte:   { x: 72, y: 62 },
    fougeres: { x: 22, y: 82 },
    trone:    { x: 62, y: 74 }
  };
  var WANDER_R = 16;     // rayon de flânerie autour du coin (%)
  var MIN_DIST = 16;     // distance mini entre deux copains (%) — « on ne se touche pas »
  var IDLE_PENSEE_MS = 12000;
  var BUS_EVERY_MS = 45000;

  var _scene = null;
  var _actors = {};      // id → {el, img, x, y, anim, copain}
  var _paused = false;
  var _idleTimer = null;
  var _mood = { delaisse: null, timer: null };

  function $(id) { return document.getElementById(id); }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  // ── décor : vue du dessus « tapis de jeu » — assets img/decor existants ──
  function decorHtml() {
    return '' +
      '<img class="v-decor v-volcan" src="' + DECOR + 'volcan_fumant.png" alt="">' +
      '<img class="v-decor v-arbre" src="' + DECOR + 'palmier.png" alt="">' +
      '<div class="v-decor v-mare"></div>' +
      '<img class="v-decor v-grotte" src="' + DECOR + 'rocher.png" alt="">' +
      '<img class="v-decor v-fougere f1" src="' + DECOR + 'fougere.png" alt="">' +
      '<img class="v-decor v-fougere f2" src="' + DECOR + 'fougere.png" alt="">' +
      '<img class="v-decor v-buisson" src="' + DECOR + 'buisson_fleurs.png" alt="">' +
      '<img class="v-decor v-sapin" src="' + DECOR + 'sapin.png" alt="">' +
      '<div class="v-route" id="v-route"></div>';
  }

  // ── acteurs ─────────────────────────────────────────────────────────
  function moodSrc(c, mood) {
    return global.MUR.avatarMood(c.avatar, mood || 'joyeux');
  }

  function spawnActors() {
    var host = global.MUR.dinoHost(); // résout avatar/nom de l'hôte dino
    global.MUR.copains.forEach(function (c) {
      var coin = COINS[c.coin] || { x: 50, y: 50 };
      var el = document.createElement('div');
      el.className = 'v-copain' + (c.monde ? ' v-roi' : '') + (c.vole ? ' v-vole' : '');
      el.dataset.copain = c.id;
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', c.nom + ' — ' + c.domaine);
      el.innerHTML =
        '<span class="v-sparkle">✨</span>' +
        '<img draggable="false" alt="">' +
        (c.monde ? '<span class="v-livre">📖</span>' : '') +
        '<span class="v-nom">' + c.nom + '</span>';
      _scene.appendChild(el);
      var a = { el: el, img: el.querySelector('img'), copain: c, x: coin.x + rnd(-6, 6), y: coin.y + rnd(-4, 4), anim: null, flip: false };
      a.img.src = moodSrc(c, 'joyeux');
      place(a);
      _actors[c.id] = a;
    });
    // l'avatar du joueur en hôte dino : recolorisé comme dans le header
    var da = _actors['dino'];
    if (da && host.isPlayerAvatar && global.Avatar && Avatar.paintInto) {
      try {
        var f = Avatar.file(host.avatar, 'joyeux');
        if (f) Avatar.paintInto(da.img, f);
      } catch (e) {}
    }
  }

  function place(a) {
    a.el.style.left = a.x + '%';
    a.el.style.top = a.y + '%';
  }

  // ── balade libre + anti-collision (spec §4.2) ───────────────────────
  // Un SEUL marcheur à la fois (calme + croisements impossibles), cible
  // rejetée si < MIN_DIST de tout autre copain. Le Roi ne bouge jamais.
  var _walking = false;

  function othersTooClose(id, x, y) {
    return Object.keys(_actors).some(function (k) {
      if (k === id) return false;
      var o = _actors[k];
      var dx = o.x - x, dy = o.y - y;
      return Math.sqrt(dx * dx + dy * dy) < MIN_DIST;
    });
  }

  function pickTarget(a) {
    var coin = COINS[a.copain.coin] || { x: 50, y: 50 };
    for (var i = 0; i < 12; i++) {
      // 70 % près du coin de prédilection, 30 % ailleurs dans la vallée
      var nearHome = Math.random() < 0.7;
      var x = nearHome ? coin.x + rnd(-WANDER_R, WANDER_R) : rnd(12, 88);
      var y = nearHome ? coin.y + rnd(-WANDER_R * 0.7, WANDER_R * 0.7) : rnd(16, 88);
      x = Math.max(8, Math.min(92, x));
      y = Math.max(12, Math.min(90, y));
      if (!othersTooClose(a.copain.id, x, y)) return { x: x, y: y };
    }
    return null; // trop de monde : on reste où on est (jamais de contact)
  }

  function wanderTick() {
    if (_paused || _walking || document.hidden) { schedule(); return; }
    var movers = Object.keys(_actors).filter(function (k) { return !_actors[k].copain.monde; });
    var a = _actors[movers[(Math.random() * movers.length) | 0]];
    var t = pickTarget(a);
    if (!t) { schedule(); return; }
    var dx = t.x - a.x, dy = t.y - a.y;
    var distPx = Math.sqrt(dx * dx + dy * dy) / 100 * _scene.clientWidth;
    var dur = Math.max(2400, distPx * 40); // lent, calme
    a.flip = dx < 0;
    a.img.style.transform = a.flip ? 'scaleX(-1)' : '';
    a.el.classList.add('marche');
    _walking = true;
    // WAAPI sur left/top interdit (layout) → on anime un translate ADDITIF
    // puis on pose la position finale : transform-only pendant le mouvement.
    var pxX = dx / 100 * _scene.clientWidth;
    var pxY = dy / 100 * _scene.clientHeight;
    a.anim = a.el.animate([
      { transform: 'translate(-50%,-50%)' },
      { transform: 'translate(calc(-50% + ' + pxX + 'px), calc(-50% + ' + pxY + 'px))' }
    ], { duration: dur, easing: a.copain.vole ? 'ease-in-out' : 'linear', fill: 'forwards' });
    a.anim.onfinish = function () {
      a.x = t.x; a.y = t.y;
      place(a);
      try { a.anim.cancel(); } catch (e) {}
      a.anim = null;
      a.el.classList.remove('marche');
      _walking = false;
    };
    schedule();
  }

  var _wanderTimer = null;
  function schedule() {
    clearTimeout(_wanderTimer);
    _wanderTimer = setTimeout(wanderTick, rnd(2500, 7000)); // pauses longues
  }

  // tout s'arrête dès qu'un doigt touche (spec §2.3) ; reprend 1,5 s après
  function pauseAll() {
    _paused = true;
    Object.keys(_actors).forEach(function (k) {
      var a = _actors[k];
      if (a.anim) { try { a.anim.pause(); } catch (e) {} }
    });
    var route = $('v-route');
    if (route) route.getAnimations({ subtree: true }).forEach(function (an) { an.pause(); });
  }
  var _resumeTimer = null;
  function resumeSoon() {
    clearTimeout(_resumeTimer);
    _resumeTimer = setTimeout(function () {
      if (document.querySelector('.v-bulle') || $('chambre-ov') || $('padidi-ov')) { resumeSoon(); return; }
      _paused = false;
      Object.keys(_actors).forEach(function (k) {
        var a = _actors[k];
        if (a.anim) { try { a.anim.play(); } catch (e) {} }
      });
      var route = $('v-route');
      if (route) route.getAnimations({ subtree: true }).forEach(function (an) { an.play(); });
    }, 1500);
  }

  // ── humeurs (spec §4.4) ─────────────────────────────────────────────
  function applyHumeurs() {
    var h = global.MUR.humeurs();
    _mood.delaisse = h.delaisse;
    Object.keys(_actors).forEach(function (k) {
      var a = _actors[k];
      if (a.copain.monde) return;
      a.el.classList.toggle('nouveau', !!(h.parCopain[k] && h.parCopain[k].hasNew));
    });
    // tête boudeuse PAR INTERMITTENCE : 4 s toutes les ~20 s, jamais en continu
    clearInterval(_mood.timer);
    if (_mood.delaisse) {
      _mood.timer = setInterval(function () {
        var a = _actors[_mood.delaisse];
        if (!a || _paused) return;
        var painted = a.copain.id === 'dino' && a.copain.isPlayerAvatar; // recoloré : pas de swap simple
        if (painted) return;
        a.img.src = moodSrc(a.copain, 'enerve');
        setTimeout(function () { a.img.src = moodSrc(a.copain, 'joyeux'); }, 4000);
      }, 20000);
    }
    // pulse du Roi : un gain (œuf/accessoire) pas encore vu dans le monde dino
    var roi = _actors['trex'];
    if (roi) roi.el.classList.toggle('pulse', hasUnseenGain());
  }

  // snapshot « vu » : comparé à l'état réel de la collection — posé par
  // NidUI quand on ouvre la chambre (source unique : localStorage).
  function gainSnapshot() {
    try {
      var s = global.Collection ? global.Collection.state() : null;
      if (!s) return '';
      var acc = 0; s.sac.forEach(function (a) { acc += a.count; });
      return s.eggs.length + '/' + acc + '/' + s.owned.length;
    } catch (e) { return ''; }
  }
  function hasUnseenGain() {
    var cur = gainSnapshot();
    if (!cur || cur === '0/0/0') return false;
    try { return localStorage.getItem(seenKey()) !== cur; } catch (e) { return false; }
  }
  function seenKey() {
    try {
      var c = JSON.parse(localStorage.getItem('maxplay_active_child'));
      return 'maxplay_nid_vu' + (c && c.id ? '__' + c.id : '');
    } catch (e) { return 'maxplay_nid_vu'; }
  }
  function markGainSeen() {
    try { localStorage.setItem(seenKey(), gainSnapshot()); } catch (e) {}
    var roi = _actors['trex'];
    if (roi) roi.el.classList.remove('pulse');
  }

  // ── bulle-pensée après inactivité (spec §4.4, validée PY) ───────────
  function armIdle() {
    clearTimeout(_idleTimer);
    _idleTimer = setTimeout(showPensee, IDLE_PENSEE_MS);
  }
  function showPensee() {
    if (_paused || document.querySelector('.v-bulle, .v-pensee')) { armIdle(); return; }
    var h = global.MUR.humeurs();
    var id = h.delaisse || 'spino';
    var a = _actors[id];
    var g = h.parCopain[id] && h.parCopain[id].pense;
    if (!a || !g) { armIdle(); return; }
    var p = document.createElement('div');
    p.className = 'v-pensee';
    p.dataset.url = g.url;
    p.innerHTML = global.MUR.vignetteHtml(g.id);
    a.el.appendChild(p);
    global.MUR._fillBus();
    setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); armIdle(); }, 9000);
  }

  // ── bus 162 : pur spectacle en bordure (spec §4.5) ──────────────────
  function busPass() {
    var route = $('v-route');
    if (!route || _paused || typeof global.busSVG !== 'function') return;
    var b = document.createElement('div');
    b.className = 'v-bus';
    b.innerHTML = global.busSVG('#E2001A', '#fff', '162', 130);
    route.appendChild(b);
    var W = _scene.clientWidth;
    var ltr = Math.random() < 0.5;
    if (!ltr) b.style.transform = 'scaleX(-1)';
    b.animate([
      { transform: 'translateX(' + (ltr ? -160 : W + 160) + 'px)' + (ltr ? '' : ' scaleX(-1)') },
      { transform: 'translateX(' + (ltr ? W + 160 : -160) + 'px)' + (ltr ? '' : ' scaleX(-1)') }
    ], { duration: 9000, easing: 'linear' }).onfinish = function () { b.remove(); };
  }

  // ── bulle d'un copain : phrase ≤5 mots + vignettes (spec §5) ────────
  function closeBulle() {
    var b = document.querySelector('.v-bulle');
    if (b) b.remove();
  }

  function vignetteCard(g) {
    var done = global.MUR.starsOf(g.id) >= (g.maxStars || 0) && g.maxStars > 0;
    var played = global.MUR.playsOf(g.id) > 0;
    return '<div class="vb-jeu' + (played ? ' fait' : ' reco') + '" data-url="' + g.url + '" role="button" aria-label="' + g.titre + '">' +
      global.MUR.vignetteHtml(g.id) +
      (played ? '<span class="vb-tampon">✓</span>' : '') +
      '<div class="vb-stars">' + (g.maxStars ? global.MUR.starsHtml(g.id) : '') + '</div>' +
    '</div>';
  }

  function openBulle(copainId) {
    closeBulle();
    var c = global.MUR.copains.find(function (x) { return x.id === copainId; });
    if (!c) return;
    var a = _actors[copainId];
    if (a) { // réaction joyeuse immédiate (< 200 ms)
      a.el.classList.remove('coucou'); void a.el.offsetWidth; a.el.classList.add('coucou');
    }
    var b = document.createElement('div');
    b.className = 'v-bulle';
    var inner;
    if (c.monde) {
      // LE MONDE DINO : 3 grandes vignettes (spec §6)
      inner =
        '<div class="vb-monde">' +
          '<div class="vb-porte" data-porte="encyclo" role="button"><span class="vb-p-emoji">📖</span><span class="vb-p-txt">L\'encyclopédie</span></div>' +
          '<div class="vb-porte" data-porte="nid" role="button"><span class="vb-p-emoji">🥚</span><span class="vb-p-txt">Le nid</span></div>' +
          '<div class="vb-porte" data-porte="padidi" role="button"><span class="vb-p-emoji">🏞</span><span class="vb-p-txt">Padidi</span></div>' +
        '</div>';
    } else {
      var st = global.MUR.repaireState(c);
      var ouverture = '';
      if (st.hasNext && st.lastChain) {
        var etoiles = new Array(global.MUR.unlockStars() + 1).join('★');
        ouverture = '<div class="vb-ouverture">' + etoiles + ' sur « ' + st.lastChain.titre + ' » ouvre un nouveau jeu !</div>';
      }
      inner = '<div class="vb-jeux">' + st.games.map(vignetteCard).join('') + '</div>' + ouverture;
    }
    b.innerHTML =
      '<div class="vb-head">' +
        '<img src="' + moodSrc(c, 'joyeux') + '" alt="">' +
        '<span class="vb-phrase">' + c.bulle + '</span>' +
        '<button type="button" class="vb-close" aria-label="Fermer">✕</button>' +
      '</div>' + inner;
    _scene.parentNode.appendChild(b);
    global.MUR._fillBus();
    // l'hôte dino recoloré : repeindre la tête de bulle aussi
    if (c.id === 'dino' && c.isPlayerAvatar && global.Avatar && Avatar.paintInto) {
      try { var f = Avatar.file(c.avatar, 'joyeux'); if (f) Avatar.paintInto(b.querySelector('.vb-head img'), f); } catch (e) {}
    }
  }

  // ── interactions ────────────────────────────────────────────────────
  function bindEvents() {
    document.addEventListener('pointerdown', function () {
      pauseAll(); resumeSoon(); armIdle();
    }, { passive: true });

    document.addEventListener('click', function (ev) {
      // bulle-pensée : vignette tappable → lance le jeu directement
      var pensee = ev.target.closest('.v-pensee');
      if (pensee && pensee.dataset.url) { location.href = pensee.dataset.url; return; }
      // fermer la bulle (croix ou tap hors bulle/copain)
      if (ev.target.closest('.vb-close')) { closeBulle(); return; }
      var jeu = ev.target.closest('.vb-jeu');
      if (jeu && jeu.dataset.url) { location.href = jeu.dataset.url; return; }
      var porte = ev.target.closest('.vb-porte');
      if (porte) {
        var p = porte.dataset.porte;
        closeBulle();
        if (p === 'encyclo') { global.MUR.openEncyclo(); return; }
        // markGainSeen est posé par NidUI à l'ouverture (source unique)
        if (p === 'nid' && global.NidUI && global.NidUI.openChambre) { global.NidUI.openChambre(); return; }
        if (p === 'padidi' && global.NidUI && global.NidUI.openPadidi) { global.NidUI.openPadidi(); return; }
        return;
      }
      var cop = ev.target.closest('.v-copain');
      if (cop) { openBulle(cop.dataset.copain); return; }
      // tap ailleurs → ferme la bulle éventuelle
      if (!ev.target.closest('.v-bulle')) closeBulle();
    });
  }

  // ── init / refresh ──────────────────────────────────────────────────
  function init() {
    _scene = $('vallee');
    if (!_scene || !global.MUR) return;
    _scene.innerHTML = decorHtml();
    spawnActors();
    applyHumeurs();
    bindEvents();
    schedule();
    armIdle();
    setInterval(busPass, BUS_EVERY_MS);
    setTimeout(busPass, 6000); // un premier passage pas trop tard (la joie)
    setInterval(applyHumeurs, 60000);
  }

  function refresh() {
    if (!_scene) return;
    applyHumeurs();
    // la bulle ouverte se rafraîchit (étoiles/déblocages changés ailleurs)
    var open = document.querySelector('.v-bulle');
    if (open) closeBulle();
  }

  global.MurScene = { init: init, refresh: refresh, markGainSeen: markGainSeen };
})(window);
