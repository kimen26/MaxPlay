// ─────────────────────────────────────────────────────────────────────────
//  mur.js — « Le Mur des Copains » (menu enfant MaxPlay, spec 2026-07-19)
//
//  Remplace le menu accordéon d'index v2 (conservé pour l'espace parents).
//  - « La file » (choix PY 2026-07-22, POC v1-file) : les copains sont des
//    RANGÉES compactes empilées. Entrée au repaire = DRAG UNIQUEMENT :
//    on attrape le dino de la rangée et on le tire vers la droite (il se
//    dandine et grossit) — pas de tap, le geste EST le bouton.
//  - Avatar du profil = hôte du haut (bulle guide) ; Tritri n'est plus hôte.
//  - T-Rex = dernière rangée dorée ; le portail encyclo vit dans son repaire
//    (plus de bannière doublon en bas du Mur).
//  - Découverte (délaissé · nouveau · mise en avant, rotation par date) +
//    Préférés (pins.js). Vignettes CSS/SVG animées (zéro image générée).
//  - Repaires : séquence 2★ (ORDRE local au repaire — diffère des catégories
//    de catalog.js, donc pas Unlock.isUnlocked ici). Le flag admin et le
//    seuil ★ restent lus depuis unlock.js (Unlock.isAdminUnlockAll/UNLOCK_STARS)
//    pour rester source unique — pas une 2e copie de la règle globale.
//  - Jeux non débloqués = CACHÉS + phrase d'ouverture en bas du repaire.
//  - AUCUN audio/TTS/voix dans les menus (attente GO parent).
//
//  API : window.MUR = { init, refresh, openRepaire, showMur, showParents,
//                       entry, starsOf, isVisible }
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  // ── Méta locale des jeux absents de catalog.js ─────────────────────
  // (vide depuis 2026-07-20 : mj-14 a retrouvé sa vraie entrée catalogue.
  //  Pattern conservé pour un futur jeu hors catalogue.)
  var LOCAL_META = {};

  // ── Les 5 copains + Tritri (hôte) ──────────────────────────────────
  // Décision PY 2026-07-21 : scènes de jeu = AVATARS low-poly uniquement
  // (jamais les sprites réalistes). Résolution via le manifeste avatars.js.
  function avatarTete(id) {
    var a = (global.MAXPLAY_AVATARS || []).find(function (x) { return x.id === id; });
    var f = a && a.moods && a.moods.joyeux && a.moods.joyeux[0];
    return f ? (global.MAXPLAY_AVATARS_BASE || 'img/avatars/') + f : '';
  }
  var TRITRI = { tete: avatarTete('tritri') };

  var COPAINS = [
    {
      id: 'spino', nom: 'Spino', domaine: 'compter',
      tete: avatarTete('spino'),
      phrase: 'Splish splash ! Avec moi, on compte les poissons, les caisses et plein de trésors !',
      floats: 'chiffres',
      jeux: ['mj-46', 'mj-47', 'mj-48', 'mj-49']
    },
    {
      id: 'galli', nom: 'Galli', domaine: 'lire',
      tete: avatarTete('galli'),
      phrase: 'Vite vite ! Les lettres dansent, attrape-les et lis tes premiers mots !',
      floats: 'lettres',
      jeux: ['mj-50', 'mj-51', 'mj-52', 'mj-53']
    },
    {
      id: 'velo', nom: 'Vélo', domaine: 'casse-têtes',
      tete: avatarTete('velo'),
      phrase: 'Chhht… un vrai détective réfléchit doucement. Tu viens résoudre mes énigmes ?',
      floats: 'puzzle',
      jeux: ['mj-15', 'mj-13a', 'mj-14', 'mj-19', 'mj-17', 'mj-18', 'mj-34']
    },
    {
      id: 'para', nom: 'Para', domaine: 'couleurs & monde',
      tete: avatarTete('paras'),
      phrase: 'Tadada ! Je chante les couleurs et je voyage autour du monde. Tu m\'accompagnes ?',
      floats: 'drapeaux',
      jeux: ['mj-21', 'mj-20', 'mj-22', 'mj-33', 'mj-12']
    },
    {
      // T-Rex = DERNIÈRE rangée (dorée) : son repaire porte le portail encyclo
      id: 'trex', nom: 'Roi T-Rex', domaine: 'les dinos',
      tete: avatarTete('trex'),
      phrase: 'Grrr… bienvenue dans mon royaume ! Ici, on part à la chasse aux dinosaures !',
      floats: 'ombres',
      ency: true, // portail encyclopédie aussi en tête de repaire
      jeux: ['mj-24', 'mj-28', 'mj-31', 'mj-30', 'mj-32']
    }
  ];

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
    'mj-17': 'Le garage',
    'mj-18': 'Les potions',
    'mj-34': 'Le dépôt bloqué',
    'mj-21': 'L\'atelier peinture',
    'mj-20': 'Compte avec le monde',
    'mj-22': 'Où est le pays ?',
    'mj-33': 'Le memory',
    'mj-12': 'Le coin écoute'
  };

  // ── Vignettes de jeux (CSS/SVG pur, zéro emoji) ────────────────────
  var OMBRE = 'img/dinos/ombres/';
  function de3() { return '<div class="vig-de"><i class="d1"></i><i class="d3"></i><i class="d5"></i></div>'; }
  function de6() { return '<div class="vig-de de2"><i class="d1"></i><i class="d2"></i><i class="d6"></i><i class="d7"></i><i class="d4"></i><i class="d5"></i></div>'; }
  var VIGNETTES = {
    'mj-24': '<div class="vig vig-ombre"><img src="' + OMBRE + 'Triceratops_ombre.png" alt=""></div>',
    'mj-28': '<div class="vig vig-lampe"><img src="' + OMBRE + 'Gallimimus_ombre.png" alt=""></div>',
    'mj-31': '<div class="vig vig-temps"><span class="v-aiguille"></span><span class="v-aiguille a2"></span></div>',
    'mj-30': '<div class="vig vig-tailles"><img src="' + OMBRE + 'Velociraptor_ombre.png" alt=""><img src="' + OMBRE + 'Triceratops_ombre.png" alt=""><img src="' + OMBRE + 'Diplodocus_ombre.png" alt=""></div>',
    'mj-32': '<div class="vig"><img class="v-img" src="img/dinos/paleoart/Triceratops_coloriage.webp" alt=""></div>',
    'mj-46': '<div class="vig vig-oeufs"><i></i><i></i><i></i></div>',
    'mj-47': '<div class="vig vig-constel"><i></i><i></i><i></i><i></i></div>',
    'mj-48': '<div class="vig vig-bus vig-monte" data-bus="162"></div>',
    'mj-49': '<div class="vig vig-barq"><span class="dix">10</span></div>',
    'mj-50': '<div class="vig vig-son-lettre"><span class="vig-lettre">m</span><i class="w1"></i><i class="w2"></i></div>',
    'mj-51': '<div class="vig vig-lettres"><span class="vig-lettre">a</span><span class="vig-lettre script">a</span></div>',
    'mj-52': '<div class="vig vig-boitemot"><span class="s1">pa</span><span class="sep"></span><span class="s2">pa</span></div>',
    'mj-53': '<div class="vig vig-mot"><span>lis !</span></div>',
    'mj-23': '<div class="vig vig-mot"><span>loup</span></div>',
    'mj-06': '<div class="vig vig-phrase"><i></i><i></i><i></i></div>',
    'mj-15': '<div class="vig vig-intrus"><i></i><i></i><i class="autre"></i><i></i></div>',
    'mj-13a': '<div class="vig vig-bus" data-bus="162,185"></div>',
    'mj-14': '<div class="vig vig-grille"><i></i><i class="rond"></i><i></i><i class="rond"></i><i></i><i class="rond"></i><i></i><i class="rond"></i><i class="vide"></i></div>',
    'mj-19': '<div class="vig vig-cible"></div>',
    'mj-17': '<div class="vig vig-rouage"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="#c3d0e8" d="M50 14l5 8a28 28 0 0 1 9 4l9-3 7 12-7 6a28 28 0 0 1 0 9l7 6-7 12-9-3a28 28 0 0 1-9 4l-5 8H41l-5-8a28 28 0 0 1-9-4l-9 3-7-12 7-6a28 28 0 0 1 0-9l-7-6 7-12 9 3a28 28 0 0 1 9-4l5-8z"/><circle cx="50" cy="45" r="12" fill="#14161d"/></svg></div>',
    'mj-18': '<div class="vig vig-tubes"><div class="vig-tube"><i style="background:#e0655a"></i><i style="background:#4d9de0"></i></div><div class="vig-tube"><i style="background:#ffd166"></i><i style="background:#e0655a"></i></div><div class="vig-tube"><i style="background:#4d9de0"></i><i style="background:#ffd166"></i></div></div>',
    'mj-34': '<div class="vig vig-blocs"><i class="bus"></i><i class="b2"></i><i></i><i class="b3"></i><i></i><i></i><i class="b2"></i><i></i><i></i><i class="b3"></i><i></i><i></i></div>',
    'mj-21': '<div class="vig vig-peinture"><i class="b-r"></i><i class="b-j"></i><i class="b-b"></i></div>',
    'mj-20': '<div class="vig vig-drapeaux"><span class="f-flag france"></span><span class="f-flag bresil"></span><span class="f-flag espagne"></span></div>',
    'mj-22': '<div class="vig vig-carte"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="#2fbf8f" d="M18 30c10-8 22-10 32-6 12 5 24 2 32-6v44c-8 8-20 11-32 6-10-4-22-2-32 6z" opacity=".9"/><path fill="#e0655a" d="M50 18c-8 0-14 6-14 13 0 10 14 25 14 25s14-15 14-25c0-7-6-13-14-13z"/><circle cx="50" cy="31" r="6" fill="#fff"/></svg></div>',
    'mj-33': '<div class="vig vig-memory"><div class="vig-carte-m dos"></div><div class="vig-carte-m"><img src="' + OMBRE + 'Parasaurolophus_ombre.png" alt=""></div></div>',
    'mj-12': '<div class="vig vig-son"><i></i><i></i><i></i><i></i><i></i></div>'
  };

  // ── Éléments flottants des rangées copains (discrets, derrière) ────
  var FLOAT_SLOTS = [
    { left: '36%', top: '14%' }, { left: '56%', top: '58%' },
    { left: '72%', top: '20%' }, { left: '26%', top: '62%' }
  ];
  function floatHtml(kind, i) {
    var slot = FLOAT_SLOTS[i % FLOAT_SLOTS.length];
    var style = 'left:' + slot.left + ';top:' + slot.top + ';';
    var inner = '';
    if (kind === 'chiffres') {
      inner = '<span class="f-chiffre">' + ['1', '3', '5', '2', '7', '4'][i % 6] + '</span>';
    } else if (kind === 'lettres') {
      inner = '<span class="f-lettre">' + ['a', 'm', 's', 'o', 'l', 'i'][i % 6] + '</span>';
    } else if (kind === 'ombres') {
      inner = '<img class="f-ombre" src="' + OMBRE + ['Gallimimus_ombre.png', 'Velociraptor_ombre.png', 'Triceratops_ombre.png', 'Parasaurolophus_ombre.png'][i % 4] + '" alt="">';
    } else if (kind === 'puzzle') {
      var cols = ['#ffd166', '#4d9de0', '#2fbf8f', '#e0655a'];
      inner = '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="' + cols[i % 4] + '" d="M10 3a2.5 2.5 0 0 1 5 0h4v4a2.5 2.5 0 0 1 0 5v4h-5v-3a2 2 0 1 0-4 0v3H5v-5H2.5a2.5 2.5 0 1 1 0-5H5V3z" transform="rotate(' + (i * 35) + ' 12 12)"/></svg>';
    } else if (kind === 'drapeaux') {
      inner = '<span class="f-flag ' + ['france', 'bresil', 'italie', 'espagne'][i % 4] + '"></span>';
    }
    return '<span class="c-float f' + ((i % 6) + 1) + '" style="' + style + '">' + inner + '</span>';
  }

  // ── Entrées catalogue + locale ─────────────────────────────────────
  // entry(id) : lookup BRUT par id (résout même un jeu retire:true — nécessaire
  // pour un lien direct/parental). Le filtrage retire:true pour l'AFFICHAGE se
  // fait en aval via catalogVisible() (repaireState ci-dessous), jamais ici.
  function entry(id) {
    if (LOCAL_META[id]) return LOCAL_META[id];
    var e = (global.MAXPLAY_CATALOG || []).find(function (x) { return x.id === id; });
    if (!e) return null;
    return { id: e.id, titre: TITRES[e.id] || e.titre, url: e.url, maxStars: e.maxStars || 0, retire: !!e.retire };
  }

  function maxStarsOf(id) { var e = entry(id); return e ? e.maxStars : 0; }

  // Étoiles : Stars.js pour le catalogue ; repli local pour mj-14
  // (même règle : sessions à 100% dans maxplay_progress).
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

  // ── Séquence 2★ LOCALE au repaire ──────────────────────────────────
  // Jeux non-libres : le 1er est ouvert, chaque suivant s'ouvre à 2★ sur
  // le précédent. Un jeu verrouillé est CACHÉ (et tout ce qui suit).
  // Les jeux libres (coloriage, coin écoute) sont toujours visibles.
  // Règles GLOBALES (flag admin, seuil ★) : source unique = unlock.js.
  // Seule la SÉQUENCE (ordre copain, caché vs grisé) reste locale au Mur.
  function adminUnlockAll() { return !!(global.Unlock && Unlock.isAdminUnlockAll()); }
  function unlockStars() { return (global.Unlock && Unlock.UNLOCK_STARS) || 2; }
  // ids gardés au menu enfant, dérivés de catalogVisible() (source unique de
  // filtrage retire:true, catalog.js) — évite de refiltrer à la main ici.
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

  // Tous les jeux visibles et jouables du Mur (pour Découverte)
  function allVisibleGames() {
    var seen = {}, out = [];
    COPAINS.forEach(function (c) {
      repaireState(c).games.forEach(function (g) {
        if (!seen[g.id] && g.maxStars > 0) { seen[g.id] = 1; out.push(g); }
      });
    });
    return out;
  }

  // ── Rotation déterministe par date (même principe que pins.js) ─────
  function dayIndex(n) {
    if (!n) return 0;
    var day = Math.floor(new Date().getTime() / 86400000);
    return ((day % n) + n) % n;
  }
  function pickDaily(pool, exclude) {
    var cand = pool.filter(function (g) { return exclude.indexOf(g.id) === -1; });
    if (!cand.length) return null;
    return cand[dayIndex(cand.length)];
  }

  function decouverte() {
    var pool = allVisibleGames();
    var picks = [], used = [];
    // 1. Délaissé : peu d'étoiles, puis le plus anciennement joué (fenêtre de 5)
    var delaisses = pool.slice().sort(function (a, b) {
      var sa = starsOf(a.id), sb = starsOf(b.id);
      if (sa !== sb) return sa - sb;
      return lastPlayedOf(a.id) - lastPlayedOf(b.id);
    }).slice(0, 5);
    var d1 = pickDaily(delaisses, used);
    if (d1) { picks.push({ g: d1, label: 'Rejoue avec lui !', cls: '' }); used.push(d1.id); }
    // 2. Nouveau débloqué : jamais joué
    var nouveaux = pool.filter(function (g) { return playsOf(g.id) === 0; });
    var d2 = pickDaily(nouveaux, used);
    if (d2) { picks.push({ g: d2, label: 'Nouveau !', cls: 'nouveau' }); used.push(d2.id); }
    // 3. Mise en avant du jour : n'importe quel jeu visible
    var d3 = pickDaily(pool, used);
    if (d3) { picks.push({ g: d3, label: 'À l\'honneur', cls: '' }); used.push(d3.id); }
    return picks;
  }

  // ── Rendu ──────────────────────────────────────────────────────────
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

  function miniCardHtml(g, label, cls) {
    return '<div class="mur-mini ' + (cls || '') + '" data-url="' + g.url + '" role="button" aria-label="' + g.titre + '">' +
      vignetteHtml(g.id) +
      '<div class="m-label">' + (label || '') + '</div>' +
      '<div class="m-stars">' + starsHtml(g.id) + '</div>' +
    '</div>';
  }

  function renderDecouverte() {
    var row = $('decouverte-row');
    if (!row) return;
    row.innerHTML = decouverte().map(function (p) { return miniCardHtml(p.g, p.label, p.cls); }).join('');
  }

  function renderPreferes() {
    var wrap = $('preferes-wrap'), row = $('preferes-row');
    if (!wrap || !row) return;
    var ids = [];
    if (global.Pins) {
      try { ids = Pins.rowIds().filter(isVisible).slice(0, 3); } catch (e) { ids = []; }
    }
    if (!ids.length) { wrap.style.display = 'none'; return; }
    wrap.style.display = '';
    row.innerHTML = ids.map(function (id) {
      var g = entry(id);
      return g ? miniCardHtml(g, '', '') : '';
    }).join('');
  }

  function copainStars(c) {
    var st = repaireState(c), got = 0;
    st.games.forEach(function (g) { got += starsOf(g.id); });
    return got;
  }

  function renderCopains() {
    var grid = $('copains-grid');
    if (!grid) return;
    grid.innerHTML = COPAINS.map(function (c) {
      var floats = '';
      for (var i = 0; i < 4; i++) floats += floatHtml(c.floats, i);
      var stars = copainStars(c);
      var apercuJeux = repaireState(c).games.slice(0, 3).map(function (g) { return g.id; }).join(',');
      return '<div class="copain' + (c.ency ? ' or' : '') + '" data-copain="' + c.id + '" data-jeux="' + apercuJeux + '" aria-label="' + c.nom + ' — ' + c.domaine + '">' +
        floats +
        '<img class="c-tete" src="' + c.tete + '" alt="' + c.nom + '" draggable="false">' +
        '<div class="c-qui">' +
          '<span class="c-nom">' + c.nom + '</span>' +
          '<span class="c-domaine">' + c.domaine + '</span>' +
          (stars ? '<span class="c-stars">★ ' + stars + '</span>' : '') +
        '</div>' +
        '        <span class="c-piste">›››</span>' +
      '</div>';
    }).join('');
    // Entrée au repaire = DRAG UNIQUEMENT : tirer le dino vers la droite.
    Array.prototype.forEach.call(grid.querySelectorAll('.copain'), function (el) {
      armDrag(el.querySelector('.c-tete'), el, el.dataset.copain);
    });
  }

  // Le geste signature : on attrape le dino, on le tire → il se dandine
  // (rotation oscillante + petits sauts) et grossit. Passé ~30 % de la
  // rangée, il gambade hors de l'écran et le repaire s'ouvre. Sinon,
  // retour élastique. Aucun tap n'ouvre un repaire (choix PY 2026-07-22).
  function armDrag(dino, rang, copainId) {
    if (!dino) return;
    var x0 = null, dx = 0, raf = null;
    function render() {
      var wobble = Math.sin(dx * 0.05) * Math.min(12, dx * 0.07);
      var grow = 1 + Math.min(0.8, dx / 220);
      var lift = Math.abs(Math.sin(dx * 0.05)) * Math.min(10, dx * 0.06);
      dino.style.transform = 'translate(' + dx + 'px,' + (-lift) + 'px) rotate(' + wobble + 'deg) scale(' + grow + ')';
      dino.style.zIndex = 5;
    }
    dino.addEventListener('pointerdown', function (e) {
      x0 = e.clientX; dx = 0;
      dino.classList.add('drag');
      try { dino.setPointerCapture(e.pointerId); } catch (err) {}
    });
    dino.addEventListener('pointermove', function (e) {
      if (x0 === null) return;
      dx = Math.max(-16, e.clientX - x0);
      if (!raf) raf = requestAnimationFrame(function () { render(); raf = null; });
    });
    function fin() {
      if (x0 === null) return;
      var seuil = rang.clientWidth * 0.30;
      x0 = null; dino.classList.remove('drag');
      if (dx > seuil) {
        dino.style.transition = 'transform .3s ease-in';
        dino.style.transform = 'translate(' + rang.clientWidth + 'px,0) rotate(10deg) scale(1.8)';
        setTimeout(function () { openRepaire(copainId); }, 240);
        setTimeout(function () { dino.style.transition = ''; dino.style.transform = ''; dino.style.zIndex = ''; }, 700);
      } else {
        dino.style.transition = 'transform .35s cubic-bezier(.3,1.6,.5,1)';
        dino.style.transform = ''; dino.style.zIndex = '';
        setTimeout(function () { dino.style.transition = ''; }, 380);
      }
      dx = 0;
    }
    dino.addEventListener('pointerup', fin);
    dino.addEventListener('pointercancel', fin);
    dino.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }

  // Portail encyclopédie (bannière spéciale) — cible = dev-dinos.html?v=7,
  // verrouillage par code TRITRI géré par unlock.js (flux inchangé).
  function portailHtml(unlocked) {
    return '<img src="' + avatarTete('trex') + '" alt="Roi T-Rex">' +
      '<div class="grow">' +
        '<div class="p-titre">L\'encyclopédie du Roi T-Rex</div>' +
        '<div class="p-sub">' + (unlocked ? '50 dinos · 6 familles · le grand voyage' : 'Demande le mot magique à un grand') + '</div>' +
      '</div>' +
      '<div class="p-go">' + (unlocked ? '›' : '🔒') + '</div>';
  }

  function renderPortails() {
    var unlocked = false;
    try { unlocked = global.Unlock && Unlock.isUnlocked('dinos'); } catch (e) {}
    ['rep-portail-trex'].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.classList.add('portail');
      el.innerHTML = portailHtml(unlocked);
      el.dataset.unlocked = unlocked ? '1' : '';
    });
  }

  function renderRepaire(c) {
    var st = repaireState(c);
    $('rep-tete').src = c.tete;
    $('rep-tete').className = 'r-tete' + (c.rond ? ' rond' : '');
    $('rep-nom').textContent = c.nom;
    $('rep-domaine').textContent = c.domaine;
    $('rep-phrase').textContent = c.phrase;
    $('rep-portail-trex').style.display = c.ency ? '' : 'none';
    $('rep-jeux').innerHTML = st.games.map(function (g) {
      var foot = g.maxStars
        ? '<div class="j-stars">' + starsHtml(g.id) + '</div>'
        : '<div class="j-libre">Jeu libre — pas d\'étoiles, que du fun !</div>';
      return '<div class="rep-jeu" data-url="' + g.url + '" role="button" aria-label="' + g.titre + '">' +
        vignetteHtml(g.id) +
        '<div class="grow"><div class="j-titre">' + g.titre + '</div>' + foot + '</div>' +
      '</div>';
    }).join('');
    var ouverture = $('rep-ouverture');
    if (st.hasNext && st.lastChain) {
      var etoiles = new Array(unlockStars() + 1).join('★');
      ouverture.textContent = 'Obtiens ' + etoiles + ' sur « ' + st.lastChain.titre + ' » pour ouvrir un nouveau jeu !';
    } else if (!st.hasNext && st.games.length > 1) {
      ouverture.textContent = 'Bravo ! Tu as ouvert tous les jeux de ce repaire !';
    } else {
      ouverture.textContent = '';
    }
    // Frise-chemin (NID P3) : si NidUI est chargé, elle REMPLACE le rendu
    // grille ci-dessus dans #rep-jeux (fait=tampon, prochain=grand/brille,
    // suivants=atténués mais tapables — accès libre, la frise guide).
    if (global.NidUI && typeof global.NidUI.renderFrise === 'function') {
      global.NidUI.renderFrise(st.games);
    }
  }

  // ── Navigation Mur ↔ Repaire ↔ Parents (sans recharger) ───────────
  var current = null;

  function show(view) {
    $('mur-view').style.display = view === 'mur' ? '' : 'none';
    $('repaire-view').style.display = view === 'repaire' ? '' : 'none';
    $('parents-view').style.display = view === 'parents' ? '' : 'none';
    window.scrollTo(0, 0);
  }

  function showMur() { current = null; refresh(); show('mur'); }

  function openRepaire(id) {
    var c = COPAINS.find(function (x) { return x.id === id; });
    if (!c) return;
    current = c;
    renderRepaire(c);
    renderPortails();
    fillBusVignettes();
    show('repaire');
  }

  function showParents() { renderParents(); show('parents'); }

  // ── Espace parents : catalogue complet (ancien accordéon v2) ───────
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
    // catalogVisible() = source unique de filtrage (retire:true exclu), catalog.js.
    var CAT = (global.catalogVisible ? global.catalogVisible() : global.MAXPLAY_CATALOG) || [];
    var board = $('parents-board');
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

  // ── Styles hérités des lignes .game (v2) injectés ici pour l'espace
  //    parents (les classes .game/.cat-stars vivaient dans index v2). ──
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
  function refresh() {
    renderDecouverte();
    renderPreferes();
    renderCopains();
    renderPortails();
    if (current) renderRepaire(current);
    fillBusVignettes();
    if (global.NidUI && typeof global.NidUI.refresh === 'function') global.NidUI.refresh();
  }

  function fillBusVignettes() {
    // Vignettes bus dessinées avec bus-svg.js (un seul modèle visuel de bus)
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

  function init(hooks) {
    injectParentStyles();
    renderCopains();
    renderDecouverte();
    renderPreferes();
    renderPortails();
    fillBusVignettes();
    loadNidUi();
    // deep-link de test : index.html#repaire=velo ouvre directement un repaire
    var m = /repaire=(\w+)/.exec(location.hash || '');
    if (m && COPAINS.some(function (c) { return c.id === m[1]; })) openRepaire(m[1]);
    else show('mur');

    document.addEventListener('click', function (ev) {
      // (copain → repaire : PAS de tap — entrée par drag du dino uniquement,
      //  voir armDrag. Choix PY 2026-07-22.)
      // retour au Mur
      if (ev.target.closest('.rep-back')) { showMur(); return; }
      // portail encyclopédie (Mur + repaire T-Rex)
      var por = ev.target.closest('.portail');
      if (por) {
        if (por.dataset.unlocked) { location.href = 'dev-dinos.html?v=7'; return; }
        if (hooks && hooks.onCodeNeeded) hooks.onCodeNeeded();
        return;
      }
      // vignette jeu (Mur, repaire ou frise-chemin NID) → lancement direct
      var jeu = ev.target.closest('.rep-jeu, .mur-mini, .frise-jeu');
      if (jeu && jeu.dataset.url) { location.href = jeu.dataset.url; return; }
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
        if (prow.dataset.reason === 'code') { if (hooks && hooks.onCodeNeeded) hooks.onCodeNeeded(); return; }
        prow.classList.remove('shake'); void prow.offsetWidth; prow.classList.add('shake');
        if (hooks && hooks.onLocked) hooks.onLocked();
        return;
      }
    });

    // Re-render au retour sur le menu : bfcache (retour navigateur mobile) ou
    // changement de déblocage fait ailleurs (console parent suivi.html, autre
    // onglet). Sans ça le menu reste figé — les cadenas persistent alors que
    // maxplay_admin.unlockAll est passé à true. (Bug déblocage mobile 2026-07-23.)
    global.addEventListener('pageshow', function (ev) { if (ev.persisted) refresh(); });
    global.addEventListener('storage', function (ev) {
      if (ev.key === 'maxplay_admin' || ev.key === 'maxplay_unlocks' || ev.key === null) refresh();
    });
  }

  // ── NID (chantier P3, 2026-07-26) : chargement dynamique — index.html
  //    ne charge pas nid-ui.js par défaut (pôle jeu vs nid encore optionnel
  //    tant que collection.js/P1 n'existe pas). Défensif : si le fichier ou
  //    Collection est absent, NidUI.init() ne fait rien, zéro erreur. ─────
  function loadNidUi() {
    if (global.NidUI || document.querySelector('script[src$="js/nid-ui.js"]')) { startNid(); return; }
    var s = document.createElement('script');
    s.src = 'js/nid-ui.js';
    s.onload = startNid;
    s.onerror = function () {}; // jamais bloquer le Mur
    document.head.appendChild(s);
  }
  function startNid() {
    if (global.NidUI && typeof global.NidUI.init === 'function') global.NidUI.init();
  }

  global.MUR = {
    init: init, refresh: refresh,
    openRepaire: openRepaire, showMur: showMur, showParents: showParents,
    entry: entry, starsOf: starsOf, isVisible: isVisible,
    vignetteHtml: vignetteHtml,
    _fillBus: fillBusVignettes
  };
})(window);
