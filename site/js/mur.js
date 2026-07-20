// ─────────────────────────────────────────────────────────────────────────
//  mur.js — « Le Mur des Copains » (menu enfant MaxPlay, spec 2026-07-19)
//
//  Remplace le menu accordéon d'index v2 (conservé pour l'espace parents).
//  - 5 copains-domaines, vignettes CSS/SVG animées (zéro image générée).
//  - Tritri, hôte : bloc Découverte (délaissé · nouveau · mise en avant,
//    rotation déterministe par date) + bloc Préférés (pins.js).
//  - Repaires : séquence 2★ (logique LOCALE au repaire — l'ordre diffère
//    des catégories de catalog.js, donc on n'utilise pas Unlock ici,
//    sauf pour l'encyclopédie, qui reste en access 'code' TRITRI).
//  - Jeux non débloqués = CACHÉS + phrase d'ouverture en bas du repaire.
//  - AUCUN audio/TTS/voix dans les menus (attente GO parent).
//
//  API : window.MUR = { init, refresh, openRepaire, showMur, showParents,
//                       entry, starsOf, isVisible }
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  // ── Méta locale des jeux absents de catalog.js ─────────────────────
  // mj-14 (cases mystères, matrices de Raven) : le fichier existe et
  // tourne, mais l'entrée catalogue a été retirée → méta déclarée ici.
  var LOCAL_META = {
    'mj-14': { id: 'mj-14', titre: 'Les cases mystères', url: 'mj-14.html', maxStars: 3 }
  };

  // ── Les 5 copains + Tritri (hôte) ──────────────────────────────────
  var TRITRI = { tete: 'img/dinos/sprites/Triceratops_tete.png' };

  var COPAINS = [
    {
      id: 'trex', nom: 'Roi T-Rex', domaine: 'les dinos',
      tete: 'img/dinos/sprites/Tyrannosaurus_tete.png',
      phrase: 'Grrr… bienvenue dans mon royaume ! Ici, on part à la chasse aux dinosaures !',
      floats: 'ombres',
      ency: true, // portail encyclopédie aussi en tête de repaire
      jeux: ['mj-24', 'mj-28', 'mj-31', 'mj-30', 'mj-32']
    },
    {
      id: 'spino', nom: 'Spino', domaine: 'compter',
      tete: 'img/dinos/sprites/Spinosaurus_tete.png',
      phrase: 'Splish splash ! Avec moi, on compte les poissons, les caisses et plein de trésors !',
      floats: 'chiffres',
      jeux: ['mj-43']
    },
    {
      id: 'galli', nom: 'Galli', domaine: 'lire',
      tete: 'img/dinos/paleoart/Gallimimus_headshot.jpg', rond: true,
      phrase: 'Vite vite ! Les lettres dansent, attrape-les et lis tes premiers mots !',
      floats: 'lettres',
      jeux: ['mj-09', 'mj-23', 'mj-06']
    },
    {
      id: 'velo', nom: 'Vélo', domaine: 'casse-têtes',
      tete: 'img/dinos/sprites/Velociraptor_tete.png',
      phrase: 'Chhht… un vrai détective réfléchit doucement. Tu viens résoudre mes énigmes ?',
      floats: 'puzzle',
      jeux: ['mj-15', 'mj-13a', 'mj-14', 'mj-19', 'mj-17', 'mj-18', 'mj-34']
    },
    {
      id: 'para', nom: 'Para', domaine: 'couleurs & monde',
      tete: 'img/dinos/sprites/Parasaurolophus_tete.png',
      phrase: 'Tadada ! Je chante les couleurs et je voyage autour du monde. Tu m\'accompagnes ?',
      floats: 'drapeaux',
      jeux: ['mj-21', 'mj-20', 'mj-22', 'mj-33', 'mj-12']
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
    'mj-43': 'Remplis la caisse',
    'mj-09': 'Le tri des lettres',
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
    'mj-43': '<div class="vig vig-des">' + de3() + de6() + '</div>',
    'mj-09': '<div class="vig vig-lettres"><span class="vig-lettre">a</span><span class="vig-lettre script">a</span></div>',
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

  // ── Éléments flottants des vignettes copains ───────────────────────
  var FLOAT_SLOTS = [
    { left: '7%',  top: '10%' }, { left: '76%', top: '7%'  },
    { left: '4%',  top: '55%' }, { left: '79%', top: '50%' },
    { left: '10%', top: '33%' }, { left: '74%', top: '30%' }
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
  function entry(id) {
    if (LOCAL_META[id]) return LOCAL_META[id];
    var e = (global.MAXPLAY_CATALOG || []).find(function (x) { return x.id === id; });
    if (!e) return null;
    return { id: e.id, titre: TITRES[e.id] || e.titre, url: e.url, maxStars: e.maxStars || 0 };
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
  var UNLOCK_STARS = 2; // aligné sur unlock.js
  function repaireState(copain) {
    var chain = copain.jeux.filter(function (id) { return !LIBRES[id]; });
    var visibleChain = [];
    for (var i = 0; i < chain.length; i++) {
      if (i === 0 || starsOf(chain[i - 1]) >= UNLOCK_STARS) visibleChain.push(chain[i]);
      else break;
    }
    var libres = copain.jeux.filter(function (id) { return LIBRES[id]; });
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
      for (var i = 0; i < 6; i++) floats += floatHtml(c.floats, i);
      var stars = copainStars(c);
      return '<div class="copain" data-copain="' + c.id + '" role="button" aria-label="' + c.nom + ' — ' + c.domaine + '">' +
        floats +
        '<img class="c-tete' + (c.rond ? ' rond' : '') + '" src="' + c.tete + '" alt="' + c.nom + '">' +
        '<span class="c-nom">' + c.nom + '</span>' +
        '<span class="c-domaine">' + c.domaine + '</span>' +
        (stars ? '<span class="c-stars">★ ' + stars + '</span>' : '') +
      '</div>';
    }).join('');
  }

  // Portail encyclopédie (bannière spéciale) — cible = dev-dinos.html?v=7,
  // verrouillage par code TRITRI géré par unlock.js (flux inchangé).
  function portailHtml(unlocked) {
    return '<img src="img/dinos/sprites/Tyrannosaurus_tete.png" alt="Roi T-Rex">' +
      '<div class="grow">' +
        '<div class="p-titre">L\'encyclopédie du Roi T-Rex</div>' +
        '<div class="p-sub">' + (unlocked ? '50 dinos · 6 familles · le grand voyage' : 'Demande le mot magique à un grand') + '</div>' +
      '</div>' +
      '<div class="p-go">' + (unlocked ? '›' : '🔒') + '</div>';
  }

  function renderPortails() {
    var unlocked = false;
    try { unlocked = global.Unlock && Unlock.isUnlocked('dinos'); } catch (e) {}
    ['ency-portail', 'rep-portail-trex'].forEach(function (id) {
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
      ouverture.textContent = 'Obtiens ★★ sur « ' + st.lastChain.titre + ' » pour ouvrir un nouveau jeu !';
    } else if (!st.hasNext && st.games.length > 1) {
      ouverture.textContent = 'Bravo ! Tu as ouvert tous les jeux de ce repaire !';
    } else {
      ouverture.textContent = '';
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
    var CAT = global.MAXPLAY_CATALOG || [];
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
    // deep-link de test : index.html#repaire=velo ouvre directement un repaire
    var m = /repaire=(\w+)/.exec(location.hash || '');
    if (m && COPAINS.some(function (c) { return c.id === m[1]; })) openRepaire(m[1]);
    else show('mur');

    document.addEventListener('click', function (ev) {
      // copain → repaire
      var cop = ev.target.closest('.copain');
      if (cop && cop.dataset.copain) { openRepaire(cop.dataset.copain); return; }
      // retour au Mur
      if (ev.target.closest('.rep-back')) { showMur(); return; }
      // portail encyclopédie (Mur + repaire T-Rex)
      var por = ev.target.closest('.portail');
      if (por) {
        if (por.dataset.unlocked) { location.href = 'dev-dinos.html?v=7'; return; }
        if (hooks && hooks.onCodeNeeded) hooks.onCodeNeeded();
        return;
      }
      // vignette jeu (Mur ou repaire) → lancement direct
      var jeu = ev.target.closest('.rep-jeu, .mur-mini');
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
  }

  global.MUR = {
    init: init, refresh: refresh,
    openRepaire: openRepaire, showMur: showMur, showParents: showParents,
    entry: entry, starsOf: starsOf, isVisible: isVisible,
    _fillBus: fillBusVignettes
  };
})(window);
