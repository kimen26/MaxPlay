// ─────────────────────────────────────────────────────────────────────────
//  mur.js — MODULE LOGIQUE du menu enfant (Mur v2 « La Vallée », spec
//  studio/minijeux/docs/specs/2026-07-29-mur-v2-la-vallee.md, VALIDÉE PY).
//
//  Depuis 2026-07-30 ce fichier ne rend PLUS le menu : la scène vit dans
//  js/mur-scene.js (la vallée). Ici : les DONNÉES et CONTRATS réutilisés —
//  COPAINS (6 identités, dont l'hôte des jeux dino résolu dynamiquement
//  §4.3), repaireState (séquence 2★ inchangée), entry/vignetteHtml, étoiles,
//  humeurs (délaissé/nouveau, ex-Découverte), et l'espace parents (gate).
//
//  HO-R09 (2026-09-12, D-012) : plus AUCUN id `mj-*` en dur ici. La liste des
//  jeux de chaque copain, leur ordre de déblocage, leur libellé et leur
//  vignette viennent de `site/js/catalog.js` (champs zone/murOrder/
//  libelleMur/vignette/libre) — voir jeuxDeZone() plus bas.
//
//  Défigés par PY 2026-07-29 : la file verticale (POC v1-file 2026-07-22),
//  le drag-to-enter (choix PY 2026-07-22) — le tap redevient le geste unique.
//  #repaire-view et le bloc Découverte disparaissent : leurs fonctions
//  survivent dans la bulle du copain (vignettes + tampons) et la bulle-pensée.
//
//  API : window.MUR = { init, refresh, showParents, showMur, entry, starsOf,
//    vignetteHtml, starsHtml, copains, repaireState, playsOf,
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

  // HO-R09 (décision PY, D-012) : ce fichier ne contient PLUS AUCUN id
  // `mj-*` en dur. Chaque copain ne porte plus que son identité (nom, avatar,
  // coin de la vallée, bulle) — la liste de ses jeux et leur ordre viennent
  // du champ `zone`/`murOrder` de `site/js/catalog.js` (voir jeuxDeZone() et
  // repaireState() plus bas). Ajouter un jeu au Mur = lui donner un `zone` +
  // `murOrder` dans catalog.js, plus jamais toucher ce fichier.
  var COPAINS = [
    {
      id: 'spino', nom: 'Spino', domaine: 'compter', avatar: 'spino',
      coin: 'mare', bulle: 'Ici, on compte !'
    },
    {
      id: 'galli', nom: 'Galli', domaine: 'lire', avatar: 'galli',
      coin: 'arbre', bulle: 'Ici, on lit !'
    },
    {
      id: 'troudi', nom: 'Troudi', domaine: 'casse-têtes', avatar: 'velo',
      coin: 'grotte', bulle: 'Ici, on réfléchit !'
    },
    {
      id: 'volta', nom: 'Volta', domaine: 'couleurs & monde', avatar: 'ptero',
      // Volta plane au-dessus du PIC ROCHEUX (échange de coins avec l'hôte
      // dino, retour PY 2026-07-31) : un ptéranodon perche sur un promontoire,
      // il ne niche pas dans un volcan en éruption.
      coin: 'pic', vole: true, bulle: 'Ici, on voyage !'
    },
    {
      // L'hôte des jeux dino — avatar/nom résolus au rendu (dinoHost()).
      id: 'dino', nom: 'Tritri', domaine: 'les jeux dino', avatar: 'tritri',
      // L'hôte dino (avatar du joueur) prend le VOLCAN (retour PY 2026-07-31) :
      // le coin le plus spectaculaire de la vallée revient au dino du joueur.
      coin: 'volcan', bulle: 'Viens voir les dinos !'
    },
    {
      // Roi T-Rex : IMMOBILE avec son livre — porte du MONDE DINO
      // (encyclo + nid + Padidi), bulle à 3 vignettes (spec §6).
      id: 'trex', nom: 'Roi T-Rex', domaine: 'le monde dino', avatar: 'trex',
      coin: 'trone', monde: true, bulle: 'Je te raconte les dinos !'
    }
  ];

  // Jeux d'une zone (copain), triés par murOrder croissant — source unique :
  // catalog.js. `MAXPLAY_CATALOG` brut (pas catalogVisible()) : le filtrage
  // retire:true se fait dans visibleIds(), appelé par repaireState().
  function jeuxDeZone(zoneId) {
    return (global.MAXPLAY_CATALOG || [])
      .filter(function (e) { return e.zone === zoneId; })
      .sort(function (a, b) { return (a.murOrder || 0) - (b.murOrder || 0); })
      .map(function (e) { return e.id; });
  }

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

  // ── Entrées catalogue + locale ─────────────────────────────────────
  // Titre/vignette : catalog.js fait foi (libelleMur/vignette), avec repli
  // sur titre/vignette générique quand un jeu n'a pas encore les siens.
  function entry(id) {
    if (LOCAL_META[id]) return LOCAL_META[id];
    var e = (global.MAXPLAY_CATALOG || []).find(function (x) { return x.id === id; });
    if (!e) return null;
    return { id: e.id, titre: e.libelleMur || e.titre, url: e.url, maxStars: e.maxStars || 0, retire: !!e.retire };
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
    var zoneJeux = jeuxDeZone(copain.id);
    // libre:true (catalog.js) = toujours visible, hors chaîne 2★ (ex. coloriage)
    var isLibre = {};
    zoneJeux.forEach(function (id) {
      var e = (global.MAXPLAY_CATALOG || []).find(function (x) { return x.id === id; });
      if (e && e.libre) isLibre[id] = 1;
    });
    var chain = zoneJeux.filter(function (id) { return !isLibre[id] && vis[id]; });
    var visibleChain = [];
    for (var i = 0; i < chain.length; i++) {
      if (adminUnlockAll() || i === 0 || starsOf(chain[i - 1]) >= unlockStars()) visibleChain.push(chain[i]);
      else break;
    }
    var libres = zoneJeux.filter(function (id) { return isLibre[id] && vis[id]; });
    var hasNext = visibleChain.length < chain.length;
    return {
      games: visibleChain.concat(libres).map(entry).filter(Boolean),
      lastChain: visibleChain.length ? entry(visibleChain[visibleChain.length - 1]) : null,
      hasNext: hasNext
    };
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
    var e = (global.MAXPLAY_CATALOG || []).find(function (x) { return x.id === id; });
    return (e && e.vignette) || '<div class="vig"></div>';
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

  // Langues proposées aux parents = celles qui ont du contenu dino traduit (strings + UI).
  // Source de vérité de la langue active : js/lang.js (localStorage maxplay_lang, ?lang=).
  var LANGUES = [
    { code: 'fr', label: 'Français' }, { code: 'en', label: 'English' },
    { code: 'es-es', label: 'Español' }, { code: 'pt-br', label: 'Português' }
  ];
  function renderLangs() {
    var row = $('lang-row');
    if (!row) return;
    var cur = (global.Lang && global.Lang.current()) || 'fr';
    row.innerHTML = LANGUES.map(function (l) {
      return '<button type="button" class="lang-btn' + (l.code === cur ? ' active' : '') + '" data-lang="' + l.code + '">' + l.label + '</button>';
    }).join('');
  }

  var parentsRendered = false;
  function renderParents() {
    renderLangs();
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
      // tuile Paramètres : déplie langue + jeux cachés
      var pbtn = ev.target.closest('#parents-params');
      if (pbtn) {
        var panel = $('parents-params-panel');
        if (panel) { panel.hidden = !panel.hidden; pbtn.classList.toggle('active', !panel.hidden); }
        return;
      }
      // choix de langue : lang.js persiste puis recharge la page
      var lbtn = ev.target.closest('.lang-btn[data-lang]');
      if (lbtn) { if (global.Lang) global.Lang.set(lbtn.dataset.lang); return; }
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
    entry: entry, starsOf: starsOf,
    vignetteHtml: vignetteHtml, starsHtml: starsHtml,
    copains: COPAINS, dinoHost: dinoHost, repaireState: repaireState,
    humeurs: humeurs, playsOf: playsOf, lastPlayedOf: lastPlayedOf,
    unlockStars: unlockStars, avatarMood: avatarMood,
    openEncyclo: openEncyclo,
    _fillBus: fillBusVignettes
  };
})(window);
