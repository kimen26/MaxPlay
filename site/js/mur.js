// ─────────────────────────────────────────────────────────────────────────
//  mur.js — MODULE LOGIQUE du menu enfant (Mur v2 « La Vallée », spec
//  studio/minijeux/docs/specs/2026-07-29-mur-v2-la-vallee.md, VALIDÉE PY).
//
//  Depuis 2026-07-30 ce fichier ne rend PLUS le menu : la scène vit dans
//  js/mur-scene.js (la vallée). Ici : les DONNÉES et CONTRATS réutilisés —
//  COPAINS (6, dont l'hôte des jeux dino résolu dynamiquement §4.3),
//  repaireState (séquence 2★ inchangée), entry/TITRES/VIGNETTES, étoiles,
//  humeurs (délaissé/nouveau, ex-Découverte), et l'espace parents (gate).
//
//  Défigés par PY 2026-07-29 : la file verticale (POC v1-file 2026-07-22),
//  le drag-to-enter (choix PY 2026-07-22) — le tap redevient le geste unique.
//  #repaire-view et le bloc Découverte disparaissent : leurs fonctions
//  survivent dans la bulle du copain (vignettes + tampons) et la bulle-pensée.
//
//  API : window.MUR = { init, refresh, showParents, showMur, entry, starsOf,
//    isVisible, vignetteHtml, starsHtml, copains, repaireState, playsOf,
//    lastPlayedOf, unlockStars, _fillBus }
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  var LOCAL_META = {};

  // ── Résolution avatars (assets low-poly, décision PY 2026-07-21) ────
  function avatarTete(id) {
    var a = (global.MAXPLAY_AVATARS || []).find(function (x) { return x.id === id; });
    var f = a && a.moods && a.moods.joyeux && a.moods.joyeux[0];
    return f ? (global.MAXPLAY_AVATARS_BASE || 'img/avatars/') + f : '';
  }
  function avatarMood(id, mood) {
    var a = (global.MAXPLAY_AVATARS || []).find(function (x) { return x.id === id; });
    var f = a && a.moods && a.moods[mood] && a.moods[mood][0];
    return f ? (global.MAXPLAY_AVATARS_BASE || 'img/avatars/') + f : avatarTete(id);
  }

  // ── Les 6 habitants de la vallée (casting VALIDÉ v0.5, spec §4.3) ───
  // Troudi (ex-Vélo) = Troodon : AUCUN asset troodon n'existe → il porte
  // l'asset ex-velo (petit raptor, silhouette compatible), principe 5 de la
  // spec : zéro nouvelle génération d'images pour le menu.
  // Volta (ex-Para) = Ptéranodon : asset `ptero` existant.
  // L'hôte des jeux dino est RÉSOLU DYNAMIQUEMENT (dinoHost() ci-dessous) :
  // l'avatar du joueur, repli Tritri si l'avatar EST un copain fixe.
  var FIXED_AVATARS = { spino: 1, galli: 1, velo: 1, ptero: 1, trex: 1 };

  var COPAINS = [
    {
      id: 'spino', nom: 'Spino', domaine: 'compter', avatar: 'spino',
      coin: 'mare', bulle: 'Ici, on compte !',
      jeux: ['mj-46', 'mj-47', 'mj-48', 'mj-49']
    },
    {
      id: 'galli', nom: 'Galli', domaine: 'lire', avatar: 'galli',
      coin: 'arbre', bulle: 'Ici, on lit !',
      jeux: ['mj-50', 'mj-51', 'mj-52', 'mj-53']
    },
    {
      id: 'troudi', nom: 'Troudi', domaine: 'casse-têtes', avatar: 'velo',
      coin: 'grotte', bulle: 'Ici, on réfléchit !',
      jeux: ['mj-15', 'mj-13a', 'mj-14', 'mj-19', 'mj-18', 'mj-34']
    },
    {
      id: 'volta', nom: 'Volta', domaine: 'couleurs & monde', avatar: 'ptero',
      coin: 'volcan', vole: true, bulle: 'Ici, on voyage !',
      jeux: ['mj-21', 'mj-20', 'mj-22', 'mj-33', 'mj-12']
    },
    {
      // L'hôte des jeux dino — avatar/nom résolus au rendu (dinoHost()).
      id: 'dino', nom: 'Tritri', domaine: 'les jeux dino', avatar: 'tritri',
      coin: 'fougeres', bulle: 'Viens voir les dinos !',
      jeux: ['mj-24', 'mj-28', 'mj-31', 'mj-30', 'mj-32']
    },
    {
      // Roi T-Rex : IMMOBILE avec son livre — porte du MONDE DINO
      // (encyclo + nid + Padidi), bulle à 3 vignettes (spec §6).
      id: 'trex', nom: 'Roi T-Rex', domaine: 'le monde dino', avatar: 'trex',
      coin: 'trone', monde: true, bulle: 'Je te raconte les dinos !',
      jeux: []
    }
  ];

  // Hôte des jeux dino (règle §4.3) : l'avatar choisi par l'enfant, SAUF si
  // c'est déjà un habitant fixe → repli Tritri (exception : Tritri lui-même).
  function dinoHost() {
    var c = COPAINS.find(function (x) { return x.id === 'dino'; });
    var av = null;
    try { av = global.Avatar && Avatar.get(); } catch (e) {}
    if (av && !FIXED_AVATARS[av]) {
      var meta = (global.MAXPLAY_AVATARS || []).find(function (x) { return x.id === av; });
      c.avatar = av;
      c.nom = (meta && meta.name) || 'Mon dino';
      c.isPlayerAvatar = true;
    } else {
      c.avatar = 'tritri';
      c.nom = 'Tritri';
      c.isPlayerAvatar = false;
    }
    return c;
  }

  // Jeux « libres » (toujours visibles, hors séquence 2★)
  var LIBRES = { 'mj-32': 1, 'mj-12': 1 };

  // Titres d'affichage (noms de la spec, pas ceux de catalog.js)
  var TITRES = {
    'mj-24': 'Le cache-cache des dinos',
    'mj-28': 'La lampe magique',
    'mj-31': 'La machine à voyager dans le temps',
    'mj-30': 'Du plus petit au plus grand',
    'mj-32': 'L\'atelier coloriage',
    'mj-46': 'Les œufs surprises',
    'mj-47': 'Les constellations',
    'mj-48': 'Tout le monde monte !',
    'mj-49': 'Les barquettes de 10',
    'mj-50': 'Trouve la lettre',
    'mj-51': 'Le tri des lettres',
    'mj-52': 'La boîte à mots',
    'mj-53': 'Lis et fais',
    'mj-23': 'Lis le mot',
    'mj-06': 'Lis la phrase',
    'mj-15': 'L\'intrus',
    'mj-13a': 'La course des bus',
    'mj-14': 'Les cases mystères',
    'mj-19': 'Trouve-le !',
    'mj-18': 'Les potions',
    'mj-34': 'Le dépôt bloqué',
    'mj-21': 'L\'atelier peinture',
    'mj-20': 'Compte avec le monde',
    'mj-22': 'Où est le pays ?',
    'mj-33': 'Le memory',
    'mj-12': 'Le coin écoute'
  };

  // ── Vignettes de jeux (CSS/SVG pur, zéro emoji) — réutilisées telles
  //    quelles dans les bulles de la vallée (spec §5). ──────────────────
  var OMBRE = 'img/dinos/ombres/';
  var VIGNETTES = {
    'mj-24': '<div class="vig vig-ombre"><img src="' + OMBRE + 'Triceratops_ombre.png" alt=""></div>',
    'mj-28': '<div class="vig vig-lampe"><img class="vl-dino" src="' + OMBRE + 'Gallimimus_ombre.png" alt=""></div>',
    'mj-31': '<div class="vig vig-temps"><span class="v-aiguille"></span><span class="v-aiguille a2"></span></div>',
    'mj-30': '<div class="vig vig-tailles"><img src="' + OMBRE + 'Velociraptor_ombre.png" alt=""><img src="' + OMBRE + 'Triceratops_ombre.png" alt=""><img src="' + OMBRE + 'Diplodocus_ombre.png" alt=""></div>',
    'mj-32': '<div class="vig"><img class="v-img" src="img/dinos/paleoart/Triceratops_coloriage.webp" alt=""></div>',
    'mj-46': '<div class="vig vig-oeufs"><i></i><i></i><i></i></div>',
    'mj-47': '<div class="vig vig-constel"><i></i><i></i><i></i><i></i></div>',
    'mj-48': '<div class="vig vig-bus vig-monte" data-bus="162"></div>',
    'mj-49': '<div class="vig vig-barq"><span class="dix">10</span></div>',
    'mj-50': '<div class="vig vig-son-lettre"><span class="vig-lettre">m</span><i class="w1"></i><i class="w2"></i></div>',
    'mj-51': '<div class="vig vig-tri"><div class="tri-case c1"><span class="vig-lettre">a</span></div><div class="tri-case c2"><span class="vig-lettre script">a</span></div><span class="tri-fleche">→</span></div>',
    'mj-52': '<div class="vig vig-boitemot"><div class="boite"><span class="s1">pa</span><span class="sep"></span><span class="s2">pa</span></div></div>',
    'mj-53': '<div class="vig vig-lisfais"><span class="vig-lettre lf-mot">pa</span><span class="lf-fleche">→</span><div class="mjk-oeuf-mini"></div></div>',
    'mj-23': '<div class="vig vig-mot"><span>loup</span></div>',
    'mj-06': '<div class="vig vig-phrase"><i></i><i></i><i></i></div>',
    'mj-15': '<div class="vig vig-intrus"><i></i><i></i><i class="autre"></i><i></i></div>',
    'mj-13a': '<div class="vig vig-bus" data-bus="162,185"></div>',
    'mj-14': '<div class="vig vig-grille"><i></i><i class="rond"></i><i></i><i class="rond"></i><i></i><i class="rond"></i><i></i><i class="rond"></i><i class="vide"></i></div>',
    'mj-19': '<div class="vig vig-cible"></div>',
    'mj-18': '<div class="vig vig-tubes"><div class="vig-tube"><i style="background:#e0655a"></i><i style="background:#4d9de0"></i></div><div class="vig-tube"><i style="background:#ffd166"></i><i style="background:#e0655a"></i></div><div class="vig-tube"><i style="background:#4d9de0"></i><i style="background:#ffd166"></i></div></div>',
    'mj-34': '<div class="vig vig-blocs"><i class="bus"></i><i class="b2"></i><i></i><i class="b3"></i><i></i><i></i><i class="b2"></i><i></i><i></i><i class="b3"></i><i></i><i></i></div>',
    'mj-21': '<div class="vig vig-peinture"><i class="b-r"></i><i class="b-j"></i><i class="b-b"></i></div>',
    'mj-20': '<div class="vig vig-drapeaux"><span class="f-flag france"></span><span class="f-flag bresil"></span><span class="f-flag espagne"></span></div>',
    'mj-22': '<div class="vig vig-carte"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="#2fbf8f" d="M18 30c10-8 22-10 32-6 12 5 24 2 32-6v44c-8 8-20 11-32 6-10-4-22-2-32 6z" opacity=".9"/><path fill="#e0655a" d="M50 18c-8 0-14 6-14 13 0 10 14 25 14 25s14-15 14-25c0-7-6-13-14-13z"/><circle cx="50" cy="31" r="6" fill="#fff"/></svg></div>',
    'mj-33': '<div class="vig vig-memory"><div class="vig-carte-m dos"></div><div class="vig-carte-m"><img src="' + OMBRE + 'Parasaurolophus_ombre.png" alt=""></div></div>',
    'mj-12': '<div class="vig vig-son"><i></i><i></i><i></i><i></i><i></i></div>'
  };

  // ── Entrées catalogue + locale ─────────────────────────────────────
  function entry(id) {
    if (LOCAL_META[id]) return LOCAL_META[id];
    var e = (global.MAXPLAY_CATALOG || []).find(function (x) { return x.id === id; });
    if (!e) return null;
    return { id: e.id, titre: TITRES[e.id] || e.titre, url: e.url, maxStars: e.maxStars || 0, retire: !!e.retire };
  }

  function maxStarsOf(id) { var e = entry(id); return e ? e.maxStars : 0; }

  function starsOf(id) {
    if (global.Stars && Stars.max(id) > 0) return Stars.get(id);
    var max = maxStarsOf(id);
    if (!max || !global.Tracker) return 0;
    try {
      var g = Tracker.getStats().games[id];
      if (!g || !Array.isArray(g.history)) return 0;
      var n = g.history.filter(function (h) {
        return (h.questions > 0 && h.correct >= h.questions) ||
               (h.maxScore > 0 && h.score >= h.maxScore);
      }).length;
      return Math.min(max, n);
    } catch (e) { return 0; }
  }

  function playsOf(id) {
    try {
      var g = Tracker.getStats().games[id];
      return g ? (g.plays || 0) : 0;
    } catch (e) { return 0; }
  }
  function lastPlayedOf(id) {
    try {
      var g = Tracker.getStats().games[id];
      return g && g.lastPlayed ? Date.parse(g.lastPlayed) || 0 : 0;
    } catch (e) { return 0; }
  }

  // ── Séquence 2★ LOCALE au copain (contrat INCHANGÉ, spec §5) ────────
  function adminUnlockAll() { return !!(global.Unlock && Unlock.isAdminUnlockAll()); }
  function unlockStars() { return (global.Unlock && Unlock.UNLOCK_STARS) || 2; }
  function visibleIds() {
    var vis = global.catalogVisible ? global.catalogVisible() : (global.MAXPLAY_CATALOG || []);
    var set = {};
    vis.forEach(function (e) { set[e.id] = 1; });
    return set;
  }

  function repaireState(copain) {
    var vis = visibleIds();
    var chain = copain.jeux.filter(function (id) { return !LIBRES[id] && vis[id]; });
    var visibleChain = [];
    for (var i = 0; i < chain.length; i++) {
      if (adminUnlockAll() || i === 0 || starsOf(chain[i - 1]) >= unlockStars()) visibleChain.push(chain[i]);
      else break;
    }
    var libres = copain.jeux.filter(function (id) { return LIBRES[id] && vis[id]; });
    var hasNext = visibleChain.length < chain.length;
    return {
      games: visibleChain.concat(libres).map(entry).filter(Boolean),
      lastChain: visibleChain.length ? entry(visibleChain[visibleChain.length - 1]) : null,
      hasNext: hasNext
    };
  }

  function isVisible(id) {
    return COPAINS.some(function (c) {
      return repaireState(c).games.some(function (g) { return g.id === id; });
    });
  }

  // ── Humeurs (ex-Découverte, spec §4.4) : données pour la scène ──────
  // délaissé = le copain dont le jeu le moins récemment joué est le plus
  // ancien (au moins 1 jeu joué dans la vallée, sinon personne ne boude un
  // enfant qui n'a encore rien fait) · nouveau = copain avec un jeu visible
  // jamais joué (sparkle).
  function humeurs() {
    var anyPlay = false;
    var out = {};
    COPAINS.forEach(function (c) {
      if (c.monde) return; // le Roi ne boude jamais, il lit
      var st = repaireState(c);
      var last = 0, hasNew = false, mostLeft = null;
      st.games.forEach(function (g) {
        if (!g.maxStars) return;
        var p = playsOf(g.id);
        if (p > 0) { anyPlay = true; last = Math.max(last, lastPlayedOf(g.id)); }
        if (p === 0) { hasNew = true; if (!mostLeft) mostLeft = g; }
        if (!mostLeft && starsOf(g.id) < g.maxStars) mostLeft = g;
      });
      out[c.id] = { last: last, hasNew: hasNew, pense: mostLeft || st.games[0] || null };
    });
    var delaisse = null, oldest = Infinity;
    Object.keys(out).forEach(function (id) {
      if (out[id].last > 0 && out[id].last < oldest) { oldest = out[id].last; delaisse = id; }
    });
    return { parCopain: out, delaisse: anyPlay ? delaisse : null };
  }

  // ── Rendu helpers partagés ──────────────────────────────────────────
  function $(id) { return document.getElementById(id); }

  function starsHtml(id) {
    var max = maxStarsOf(id);
    if (!max) return '';
    var got = starsOf(id), s = '';
    for (var i = 0; i < max; i++) s += i < got ? '★' : '<span class="off">★</span>';
    return s;
  }

  function vignetteHtml(id) {
    return VIGNETTES[id] || '<div class="vig"></div>';
  }

  function fillBusVignettes() {
    if (typeof global.busSVG !== 'function') return;
    document.querySelectorAll('.vig-bus').forEach(function (el) {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      var nums = (el.dataset.bus || '162').split(',');
      el.innerHTML = nums.slice(0, 2).map(function (n) {
        return global.busSVG('#E2001A', '#fff', n.trim(), 120);
      }).join('');
    });
  }

  // ── Navigation vallée ↔ parents ─────────────────────────────────────
  function show(view) {
    var mur = $('mur-view'), par = $('parents-view');
    if (mur) mur.style.display = view === 'mur' ? '' : 'none';
    if (par) par.style.display = view === 'parents' ? '' : 'none';
    window.scrollTo(0, 0);
  }
  function showMur() { refresh(); show('mur'); }
  function showParents() { renderParents(); show('parents'); }

  // ── Espace parents : catalogue complet (inchangé) ───────────────────
  function gameRowHtml(e) {
    var unlocked = Unlock.isUnlocked(e.id);
    var reason = Unlock.lockedReason(e.id);
    var lockTxt = reason === 'code' ? '🔑 Code' : '🔒 ' + Unlock.UNLOCK_STARS + '★ au jeu d\'avant';
    var stars = '';
    if (unlocked && e.maxStars && global.Stars) {
      var got = Stars.get(e.id);
      for (var i = 0; i < e.maxStars; i++) stars += i < got ? '★' : '<span class="off">★</span>';
    }
    var foot = unlocked
      ? (e.maxStars ? '<span class="mp-g-stars">' + stars + '</span>' : '<span class="g-lock">🎮 Libre</span>')
      : '<span class="g-lock">' + lockTxt + '</span>';
    return '<div class="game ' + (unlocked ? '' : 'locked') + '" data-parent-id="' + e.id + '" data-url="' + e.url + '" data-reason="' + (reason || '') + '" role="button">' +
      '<span class="g-emoji">' + e.emoji + '</span>' +
      '<span class="g-title grow">' + e.titre + '</span>' + foot + '</div>';
  }

  var parentsRendered = false;
  function renderParents() {
    if (parentsRendered) return;
    parentsRendered = true;
    var cats = global.MAXPLAY_CATEGORIES || [];
    var CAT = (global.catalogVisible ? global.catalogVisible() : global.MAXPLAY_CATALOG) || [];
    var board = $('parents-board');
    if (!board) return;
    board.innerHTML = cats.map(function (c) {
      var items = CAT.filter(function (e) { return e.category === c.id && e.id !== 'dinos'; });
      if (!items.length) return '';
      var got = 0, max = 0;
      items.forEach(function (e) { if (e.maxStars && global.Stars) { max += e.maxStars; got += Stars.get(e.id); } });
      return '<div class="mp-drawer" data-cat="' + c.id + '">' +
        '<div class="mp-drawer-head" data-toggle="' + c.id + '">' +
          '<span style="font-size:26px">' + c.emoji + '</span>' +
          '<b class="grow" style="font-size:16.5px">' + c.label + '</b>' +
          (max ? '<span class="cat-stars">⭐ ' + got + ' / ' + max + '</span>' : '') +
          '<span class="mp-chevron">›</span>' +
        '</div>' +
        '<div class="col drawer-body" style="padding:0 10px 12px; gap:6px; display:none">' +
          items.map(gameRowHtml).join('') +
        '</div></div>';
    }).join('');
  }

  function injectParentStyles() {
    var css = '.cat-stars{color:var(--gold);font-weight:900;font-size:13px;flex-shrink:0}' +
      '.game{display:flex;align-items:center;gap:10px;background:var(--card-2);border-radius:12px;padding:12px 13px;cursor:pointer}' +
      '.game .g-emoji{font-size:22px;flex-shrink:0}' +
      '.game .g-title{font-weight:900;font-size:13.5px}' +
      '.game.locked{opacity:.5}' +
      '.game .g-lock{font-size:11px;font-weight:900;color:var(--ink-3);flex-shrink:0}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ── Init ───────────────────────────────────────────────────────────
  var _hooks = null;
  function refresh() {
    if (global.MurScene && typeof global.MurScene.refresh === 'function') global.MurScene.refresh();
    fillBusVignettes();
    if (global.NidUI && typeof global.NidUI.refresh === 'function') global.NidUI.refresh();
  }

  function init(hooks) {
    _hooks = hooks || null;
    injectParentStyles();
    if (global.MurScene && typeof global.MurScene.init === 'function') global.MurScene.init();
    loadNidUi();
    show('mur');

    document.addEventListener('click', function (ev) {
      // retour depuis l'espace parents
      if (ev.target.closest('.rep-back')) { showMur(); return; }
      // tiroir parents : un seul ouvert à la fois
      var head = ev.target.closest('.mp-drawer-head');
      if (head && head.closest('#parents-board')) {
        var d = head.parentElement, was = d.classList.contains('open');
        document.querySelectorAll('#parents-board .mp-drawer').forEach(function (x) {
          x.classList.remove('open');
          var b = x.querySelector('.drawer-body'); if (b) b.style.display = 'none';
        });
        if (!was) {
          d.classList.add('open');
          var b = d.querySelector('.drawer-body'); if (b) b.style.display = '';
        }
        return;
      }
      // jeu du catalogue parents (logique unlock.js complète)
      var prow = ev.target.closest('.game[data-parent-id]');
      if (prow) {
        if (Unlock.isUnlocked(prow.dataset.parentId)) { location.href = prow.dataset.url; return; }
        if (prow.dataset.reason === 'code') { if (_hooks && _hooks.onCodeNeeded) _hooks.onCodeNeeded(); return; }
        prow.classList.remove('shake'); void prow.offsetWidth; prow.classList.add('shake');
        if (_hooks && _hooks.onLocked) _hooks.onLocked();
        return;
      }
    });

    global.addEventListener('pageshow', function (ev) { if (ev.persisted) refresh(); });
    global.addEventListener('storage', function (ev) {
      if (ev.key === 'maxplay_admin' || ev.key === 'maxplay_unlocks' || ev.key === null) refresh();
    });
  }

  // encyclopédie : flux code TRITRI inchangé (unlock.js). La scène appelle
  // MUR.openEncyclo() depuis la bulle du Roi T-Rex.
  function openEncyclo() {
    var unlocked = false;
    try { unlocked = global.Unlock && Unlock.isUnlocked('dinos'); } catch (e) {}
    if (unlocked) { location.href = 'dev-dinos.html?v=7'; return; }
    if (_hooks && _hooks.onCodeNeeded) _hooks.onCodeNeeded();
  }

  function loadNidUi() {
    if (global.NidUI || document.querySelector('script[src$="js/nid-ui.js"]')) { startNid(); return; }
    var s = document.createElement('script');
    s.src = 'js/nid-ui.js';
    s.onload = startNid;
    s.onerror = function () {}; // jamais bloquer le menu
    document.head.appendChild(s);
  }
  function startNid() {
    if (global.NidUI && typeof global.NidUI.init === 'function') global.NidUI.init();
  }

  global.MUR = {
    init: init, refresh: refresh,
    showMur: showMur, showParents: showParents,
    entry: entry, starsOf: starsOf, isVisible: isVisible,
    vignetteHtml: vignetteHtml, starsHtml: starsHtml,
    copains: COPAINS, dinoHost: dinoHost, repaireState: repaireState,
    humeurs: humeurs, playsOf: playsOf, lastPlayedOf: lastPlayedOf,
    unlockStars: unlockStars, avatarMood: avatarMood,
    openEncyclo: openEncyclo,
    _fillBus: fillBusVignettes
  };
})(window);
