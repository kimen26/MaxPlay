// ─────────────────────────────────────────────────────────────────────────
//  collection.js — Moteur de collection MaxPlay (NID v4) — PUR, zéro DOM, zéro fetch
//  v2 du moteur (chantier NID v4, GO Papa Yann 2026-07-30, fusion retours
//  Claude + copain LLM — backlog 2026-07-30). Remplace le modèle « 3 capsules
//  anonymes → 1 éclosion » (illisible : 2 œufs « disparaissaient »).
//
//  NOUVEAU MODÈLE (règles PY live 2026-07-30) :
//  · Chaque partie terminée donne UN gain :
//      nid VIDE → un ŒUF obligatoire · 1-2 œufs → RANDOM complet (œuf ou
//      accessoire) · nid plein (3) → un ACCESSOIRE obligatoire.
//  · Un œuf est un INDIVIDU : il a une FAMILLE (couleur connue dès le gain,
//    l'espèce reste la surprise de l'éclosion) et sa propre progression.
//  · Le soin : on pose des accessoires (paille, couverture, bonnet, écharpe)
//    sur un œuf pour le garder au chaud. Au seuil de chaleur → éclosion de
//    CET œuf, les autres restent. Zéro decay : la chaleur ne fait que monter,
//    jamais d'œuf qui a froid ou qui meurt (D-002). Accessoires CONSOMMÉS à
//    l'éclosion (PY : « sinon on se retrouve avec 500 accessoires — l'idée
//    c'est 3 jeux pour qu'un œuf éclose »).
//  · La caresse est de l'AFFECTION : craquement VISUEL (3 stades, persistant),
//    elle ne fait JAMAIS éclore seule — MAIS si l'œuf a déjà 2 accessoires,
//    à partir de la 2e caresse l'amour PEUT finir le travail (un peu de
//    random, PY 2026-07-30). Sinon on attend le 3e accessoire.
//  · Anti-farm (arbitrage PY 2026-07-28, étendu 2026-07-30) : un jeu à
//    3 étoiles ne donne plus RIEN (ni œuf ni accessoire).
//  · Série : 3 parties enchaînées dans une fenêtre de 30 min → l'œuf suivant
//    est DORÉ = un dino TRÈS CONNU (top items `star`, n'importe quelle
//    famille — redéfini PY 2026-07-30, avant : famille rare). Pas de cap
//    journalier (avenant P0 #2).
//  · 3e étoile d'un jeu (maîtrise) : le gain de CETTE partie est remplacé par
//    l'accessoire ÉTOILE (spec v0.7 : réutilisable 3 charges à déclassement
//    visuel 🌟→⭐→écharpe, max 1 par œuf, une seule source = maîtriser un jeu).
//  · Seuil 3 accessoires (= les 3 emplacements visibles sur l'œuf), le tout
//    PREMIER œuf de l'histoire éclot à 1 accessoire (théâtre d'onboarding).
//
//  Thème-neutre : le moteur ne connaît ni dino ni œuf. Items + familles
//  (avec couleur) injectés via Collection.configure({items, familles}).
//  Le skin dino est fourni par collection-dinos.js.
//
//  Stockage : localStorage['maxplay_collection_v1'], préfixé par profil actif
//  (maxplay_active_child). Migration v1→v2 automatique et silencieuse : les
//  capsules en attente deviennent des œufs (famille tirée au passage).
//
//  API v2 : configure({items, familles, accessoires})
//    grantReward({gameId}) → {granted, type:'oeuf'|'accessoire', ...}
//    eggs() · sac() · warmEgg(i, accId) · caress(i) · hatchEgg(i)
//    hatchThreshold() · readyEggIndex() · familleInfo(id)
//  Compat v1 (specs + appelants existants) : grantCapsule · pending ·
//    readyToHatch · hatch · owned · own · state
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  var BASE_KEY = 'maxplay_collection_v1';
  var CHILD_KEY = 'maxplay_active_child';
  var STREAK_WINDOW_MS = 30 * 60 * 1000; // 30 min (avenant P0 #3)
  var MAX_EGGS = 3;
  var WARMTH_COST = 3;       // accessoires pour éclore (défaut 2026-07-30, à valider avec Max)
  var FIRST_WARMTH_COST = 1; // 1er œuf de l'histoire : éclosion rapide (théâtre)
  var CARESS_STAGES = 3;      // stades de craquement visuel (cosmétique)
  var LOVE_HATCH_CHANCE = 1 / 3; // à 2 accessoires + 2e caresse et plus : l'amour peut ouvrir
  var ACC_ETOILE = 'etoile';  // accessoire de maîtrise (3e étoile d'un jeu), 3 charges

  var _items = [];      // [{id, nom, famille, rare?, star?}] — star = très connu (doré)
  var _familles = [];   // [{id, label, emoji, color}] — méta UI (teinte des œufs)
  // Accessoires de soin par défaut (collection : on les découvre au fil des
  // gains). Thème-neutre : surchargeables via configure({accessoires}).
  // ÉTOILE (spec v0.7, décision PY) : source unique = 3e étoile d'un jeu,
  // JAMAIS dans le tirage aléatoire (special). RÉUTILISABLE 3 CHARGES à
  // déclassement VISUEL, zéro chiffre/compteur — l'enfant la VOIT déchoir :
  //   usage 1 : `etoile`  🌟 super star → revient au sac en `etoile2`
  //   usage 2 : `etoile2` ⭐ étoile simple → revient au sac en `echarpe`
  //   usage 3 : écharpe normale, consommée avec son bébé comme les autres.
  // Une seule règle pour tout le jeu : « tout accessoire finit par partir
  // avec son bébé » — celle-là a juste 3 vies. Max 1 étoile par œuf.
  var _accessoires = [
    { id: 'paille',     nom: 'de la paille',     emoji: '🌾' },
    { id: 'couverture', nom: 'une couverture',   emoji: '🧶' },
    { id: 'bonnet',     nom: 'un bonnet',        emoji: '🧢' },
    { id: 'echarpe',    nom: 'une écharpe',      emoji: '🧣' },
    { id: ACC_ETOILE,   nom: 'une super étoile', emoji: '🌟', special: true },
    { id: 'etoile2',    nom: 'une étoile',       emoji: '⭐', special: true },
  ];
  // déclassement à l'éclosion (usage consommé → ce qui revient au sac)
  var ETOILE_DOWNGRADE = { etoile: 'etoile2', etoile2: 'echarpe' };

  // ── Clé localStorage (préfixée par profil actif si présent) ────────────
  function storageKey() {
    try {
      var raw = localStorage.getItem(CHILD_KEY);
      if (!raw) return BASE_KEY;
      var child = JSON.parse(raw);
      if (child && child.id) return BASE_KEY + '__' + child.id;
      return BASE_KEY;
    } catch (e) { return BASE_KEY; }
  }

  function _emptyState() {
    return {
      version: 2,
      owned: [],
      eggs: [],          // [{famille, golden, at, acc:[accId], caresses}]
      sac: [],           // [accId] — inventaire d'accessoires
      lastGrantAt: null,
      streakCount: 0,
      hatchCount: 0,     // nb d'éclosions déjà vécues (seuil réduit tant que 0)
    };
  }

  function _sanitizeEgg(e) {
    if (!e || typeof e !== 'object') return null;
    return {
      famille: typeof e.famille === 'string' ? e.famille : null,
      golden: !!e.golden,
      at: typeof e.at === 'number' ? e.at : 0,
      acc: Array.isArray(e.acc) ? e.acc.slice(0, WARMTH_COST) : [],
      caresses: typeof e.caresses === 'number' ? e.caresses : 0,
      loveWarm: !!e.loveWarm, // l'amour a fini le travail (2 acc + caresses, random)
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(storageKey());
      if (!raw) return _emptyState();
      var d = JSON.parse(raw);
      if (!d || typeof d !== 'object') return _emptyState();
      var s = _emptyState();
      s.owned = Array.isArray(d.owned) ? d.owned.slice() : [];
      s.lastGrantAt = typeof d.lastGrantAt === 'number' ? d.lastGrantAt : null;
      s.streakCount = typeof d.streakCount === 'number' ? d.streakCount : 0;
      if (d.version === 2) {
        s.eggs = (Array.isArray(d.eggs) ? d.eggs : []).map(_sanitizeEgg).filter(Boolean).slice(0, MAX_EGGS);
        s.sac = Array.isArray(d.sac) ? d.sac.slice() : [];
        s.hatchCount = typeof d.hatchCount === 'number' ? d.hatchCount : 0;
      } else {
        // Migration v1 → v2 : chaque capsule anonyme devient un œuf individuel
        // (famille tirée maintenant — les couleurs apparaissent d'un coup, OK).
        // hatchCount ≈ owned.length : qui a déjà des dinos a déjà éclos → seuil
        // normal ; un nid v1 vierge garde le théâtre du 1er œuf rapide.
        var pending = Array.isArray(d.pending) ? d.pending : [];
        s.hatchCount = s.owned.length;
        s.eggs = pending.slice(0, MAX_EGGS).map(function (c) {
          return {
            famille: _pickFamille(s.owned, !!(c && c.golden)),
            golden: !!(c && c.golden),
            at: (c && typeof c.at === 'number') ? c.at : 0,
            acc: [], caresses: 0, loveWarm: false,
          };
        });
        save(s); // migration écrite une fois, pas re-jouée à chaque load
      }
      return s;
    } catch (e) { return _emptyState(); }
  }

  function save(state) {
    try { localStorage.setItem(storageKey(), JSON.stringify(state)); } catch (e) { /* plein/absent : silencieux, jamais de crash */ }
  }

  // ── Config catalogue (thème-neutre) ─────────────────────────────────────
  function configure(cfg) {
    if (!cfg) return;
    if (Array.isArray(cfg.items)) _items = cfg.items.filter(function (it) { return it && it.id; });
    if (Array.isArray(cfg.familles)) _familles = cfg.familles.filter(function (f) { return f && f.id; });
    if (Array.isArray(cfg.accessoires) && cfg.accessoires.length) _accessoires = cfg.accessoires.slice();
  }

  function _itemById(id) {
    for (var i = 0; i < _items.length; i++) if (_items[i].id === id) return _items[i];
    return null;
  }
  function familleInfo(id) {
    for (var i = 0; i < _familles.length; i++) if (_familles[i].id === id) return _familles[i];
    return null;
  }
  function accessoireInfo(id) {
    for (var i = 0; i < _accessoires.length; i++) if (_accessoires[i].id === id) return _accessoires[i];
    return null;
  }

  // ── Tirage de FAMILLE au moment du gain d'œuf ───────────────────────────
  // (la couleur de l'œuf = la famille, connue tout de suite ; l'espèce reste
  // la surprise de l'éclosion — D-003 : rien n'est promis, tout est surprise).
  // Seules les familles qui ont encore ≥1 espèce non possédée sont éligibles.
  // Famille entamée (≥1 possédé) pèse 3× (complétion d'album, plan §2.3).
  // Doré (PY 2026-07-30) → l'œuf vient d'un dino TRÈS CONNU (items `star`,
  // n'importe quelle famille) : famille tirée parmi celles des stars non
  // possédées, l'éclosion préférera une star de cette famille.
  function _famillesOuvertes(owned) {
    var ownedSet = {};
    owned.forEach(function (id) { ownedSet[id] = 1; });
    var open = {};
    _items.forEach(function (it) {
      if (!ownedSet[it.id]) open[it.famille || '_sans'] = 1;
    });
    return Object.keys(open);
  }
  function _starFamillesOuvertes(owned) {
    var ownedSet = {};
    owned.forEach(function (id) { ownedSet[id] = 1; });
    var open = {};
    _items.forEach(function (it) {
      if (it.star === true && !ownedSet[it.id]) open[it.famille || '_sans'] = 1;
    });
    return Object.keys(open);
  }
  function _pickFamille(owned, golden) {
    var open = _famillesOuvertes(owned);
    if (!open.length) {
      // collection complète : n'importe quelle famille (l'éclosion fera doublon-cadeau)
      open = _items.length ? _items.map(function (it) { return it.famille || '_sans'; }) : ['_sans'];
    }
    if (golden) {
      var stars = _starFamillesOuvertes(owned).filter(function (f) { return open.indexOf(f) !== -1; });
      if (stars.length) open = stars;
    }
    var started = {};
    owned.forEach(function (id) {
      var it = _itemById(id);
      if (it && it.famille) started[it.famille] = true;
    });
    var pool = [];
    open.forEach(function (f) {
      var w = started[f] ? 3 : 1;
      for (var i = 0; i < w; i++) pool.push(f);
    });
    return pool[Math.floor(Math.random() * pool.length)] || null;
  }

  // ── Seuil de chaleur ─────────────────────────────────────────────────────
  function hatchThreshold() {
    return load().hatchCount === 0 ? FIRST_WARMTH_COST : WARMTH_COST;
  }
  function _thresholdOf(state) {
    return state.hatchCount === 0 ? FIRST_WARMTH_COST : WARMTH_COST;
  }

  // ── Gain de fin de partie — règle PY 2026-07-30 ─────────────────────────
  //  « Nid vide → un œuf. 1-2 œufs → surprise (œuf ou accessoire). Nid plein
  //  → un accessoire pour tes œufs. » Anti-farm : jeu déjà à 3 étoiles →
  //  aucun gain, la partie reste valorisée par l'écran de fin.
  //  opts.mastered (3e étoile de CE jeu, une fois dans la vie du jeu) : le
  //  gain de la partie est REMPLACÉ par l'accessoire ÉTOILE (3 charges) —
  //  un seul gain annoncé, jamais deux.
  function grantReward(opts) {
    opts = opts || {};
    if (opts.gameId && global.Stars && typeof global.Stars.get === 'function') {
      var stars = 0;
      try { stars = global.Stars.get(opts.gameId); } catch (e) { stars = 0; }
      if (stars >= 3) {
        var cur = load();
        return { granted: false, type: null, count: cur.eggs.length, golden: _goldenCount(cur), justGolden: false };
      }
    }

    var s = load();
    var now = Date.now();
    var withinWindow = s.lastGrantAt !== null && (now - s.lastGrantAt) <= STREAK_WINDOW_MS;
    s.streakCount = withinWindow ? (s.streakCount + 1) : 1;
    s.lastGrantAt = now;

    if (opts.mastered) {
      s.sac.push(ACC_ETOILE);
      save(s);
      return {
        granted: true, type: 'accessoire', accessoire: accessoireInfo(ACC_ETOILE),
        special: true, golden: _goldenCount(s), justGolden: false,
        count: s.eggs.length, sacCount: s.sac.length,
      };
    }

    // nid vide → œuf obligatoire · plein → accessoire obligatoire ·
    // entre les deux → pile ou face (surprise complète, PY 2026-07-30)
    var giveEgg = s.eggs.length === 0 ? true
      : (s.eggs.length >= MAX_EGGS ? false : Math.random() < 0.5);

    if (giveEgg) {
      var autoGolden = s.streakCount > 0 && s.streakCount % 3 === 0;
      var golden = (typeof opts.golden === 'boolean') ? opts.golden : autoGolden;
      var famille = _pickFamille(s.owned, golden);
      s.eggs.push({ famille: famille, golden: !!golden, at: now, acc: [], caresses: 0, loveWarm: false });
      save(s);
      return {
        granted: true, type: 'oeuf', famille: famille,
        familleMeta: familleInfo(famille),
        golden: _goldenCount(s), justGolden: !!golden,
        count: s.eggs.length,
      };
    }

    // accessoire (l'étoile n'est JAMAIS dans le tirage : source unique = maîtrise)
    var pool = _accessoires.filter(function (a) { return !a.special; });
    var acc = pool[Math.floor(Math.random() * pool.length)];
    s.sac.push(acc.id);
    save(s);
    return {
      granted: true, type: 'accessoire', accessoire: acc,
      golden: _goldenCount(s), justGolden: false,
      count: s.eggs.length, sacCount: s.sac.length,
    };
  }

  function _goldenCount(state) {
    return state.eggs.filter(function (e) { return e.golden; }).length;
  }

  // ── Lecture œufs / sac (copies, jamais l'état interne) ──────────────────
  function eggs() {
    var s = load();
    var th = _thresholdOf(s);
    return s.eggs.map(function (e, i) {
      return {
        index: i,
        famille: e.famille,
        familleMeta: familleInfo(e.famille),
        golden: e.golden,
        acc: e.acc.slice(),
        caresses: e.caresses,
        stage: Math.min(CARESS_STAGES, e.caresses), // stade de craquement visuel
        needed: th,
        ready: e.acc.length >= th || e.loveWarm,
      };
    });
  }

  function sac() {
    var s = load();
    var counts = {};
    s.sac.forEach(function (id) { counts[id] = (counts[id] || 0) + 1; });
    return Object.keys(counts).map(function (id) {
      var info = accessoireInfo(id) || { id: id, nom: id, emoji: '🎁' };
      return { id: id, nom: info.nom, emoji: info.emoji, count: counts[id] };
    });
  }

  // ── Soin : poser un accessoire du sac sur un œuf ────────────────────────
  // La chaleur ne fait que MONTER (zéro decay, D-002). Retourne {ok, ready}.
  function warmEgg(eggIndex, accId) {
    var s = load();
    var egg = s.eggs[eggIndex];
    if (!egg) return { ok: false, ready: false };
    var th = _thresholdOf(s);
    if (egg.acc.length >= th || egg.loveWarm) return { ok: false, ready: true }; // déjà au chaud
    // l'accessoire ÉTOILE (quel que soit son stade) est unique par œuf
    if (accId.indexOf('etoile') === 0 && egg.acc.some(function (a) { return a.indexOf('etoile') === 0; })) {
      return { ok: false, ready: false };
    }
    var pos = s.sac.indexOf(accId);
    if (pos === -1) return { ok: false, ready: false };
    s.sac.splice(pos, 1);
    egg.acc.push(accId);
    save(s);
    return { ok: true, ready: egg.acc.length >= th };
  }

  // ── Caresse : affection — craquement visuel, et l'amour peut FINIR le
  // travail (PY 2026-07-30) : elle ne fait JAMAIS éclore seule, mais sur un
  // œuf qui a déjà 2 accessoires (seuil-1), à partir de la 2e caresse, une
  // chance sur 3 que l'œuf soit assez au chaud. Sinon : 3e accessoire.
  function caress(eggIndex) {
    var s = load();
    var egg = s.eggs[eggIndex];
    if (!egg) return { stage: 0, ready: false };
    egg.caresses = Math.min(30, egg.caresses + 1);
    var th = _thresholdOf(s);
    var loveJustWarmed = false;
    if (!egg.loveWarm && egg.acc.length === th - 1 && th > 1 && egg.caresses >= 2 &&
        Math.random() < LOVE_HATCH_CHANCE) {
      egg.loveWarm = true;
      loveJustWarmed = true;
    }
    save(s);
    return {
      stage: Math.min(CARESS_STAGES, egg.caresses),
      ready: egg.acc.length >= th || egg.loveWarm,
      loveJustWarmed: loveJustWarmed,
    };
  }

  function readyEggIndex() {
    var s = load();
    var th = _thresholdOf(s);
    for (var i = 0; i < s.eggs.length; i++) {
      if (s.eggs[i].acc.length >= th || s.eggs[i].loveWarm) return i;
    }
    return -1;
  }

  // ── Éclosion d'UN œuf (les autres restent — plus jamais de disparition) ──
  // Accessoires CONSOMMÉS avec l'œuf (PY 2026-07-30) — l'ÉTOILE revient au
  // sac DÉCLASSÉE (3 charges, spec v0.7). Espèce : non possédée DANS la famille
  // de l'œuf (doré → parmi les TRÈS CONNUS de la famille d'abord) · famille
  // épuisée → n'importe quelle non possédée · collection complète → doublon.
  function hatchEgg(eggIndex) {
    var s = load();
    var egg = s.eggs[eggIndex];
    if (!egg) return null;
    if (egg.acc.length < _thresholdOf(s) && !egg.loveWarm) return null; // pas assez au chaud

    s.eggs.splice(eggIndex, 1);
    s.hatchCount += 1;
    // l'étoile revient au sac DÉCLASSÉE (🌟→⭐→écharpe normale, spec v0.7) —
    // la 3e vie est une écharpe comme les autres : consommée, rien ne revient.
    egg.acc.forEach(function (id) {
      if (ETOILE_DOWNGRADE[id]) s.sac.push(ETOILE_DOWNGRADE[id]);
    });

    var ownedSet = s.owned.slice();
    var notOwned = _items.filter(function (it) { return ownedSet.indexOf(it.id) === -1; });

    if (!notOwned.length) {
      save(s);
      var anyItem = _items.length ? _items[Math.floor(Math.random() * _items.length)] : null;
      return { type: 'doublon', item: anyItem };
    }

    var inFamille = notOwned.filter(function (it) { return (it.famille || '_sans') === egg.famille; });
    if (egg.golden) {
      var starsInFamille = inFamille.filter(function (it) { return it.star === true; });
      if (starsInFamille.length) inFamille = starsInFamille;
      else {
        var starsAnywhere = notOwned.filter(function (it) { return it.star === true; });
        if (starsAnywhere.length) inFamille = starsAnywhere; // doré = très connu avant tout
      }
    }
    var candidates = inFamille.length ? inFamille : notOwned;
    var picked = candidates[Math.floor(Math.random() * candidates.length)];
    s.owned.push(picked.id);
    save(s);
    return picked;
  }

  // ── Possession ────────────────────────────────────────────────────────
  function owned() { return load().owned.slice(); }
  function own(id) {
    if (!id) return;
    var s = load();
    if (s.owned.indexOf(id) === -1) { s.owned.push(id); save(s); }
  }

  // ── Compat v1 (appelants + specs existants) ───────────────────────────
  function grantCapsule(opts) { return grantReward(opts); }
  function pending() {
    var s = load();
    return { count: s.eggs.length, golden: _goldenCount(s) };
  }
  function readyToHatch() { return readyEggIndex() !== -1; }
  function hatch() {
    var i = readyEggIndex();
    return i === -1 ? null : hatchEgg(i);
  }

  // ── Snapshot pour l'UI ────────────────────────────────────────────────
  function state() {
    var s = load();
    return {
      owned: s.owned.slice(),
      eggs: eggs(),
      sac: sac(),
      pending: { count: s.eggs.length, golden: _goldenCount(s) },
      streak: s.streakCount,
      hatchCount: s.hatchCount,
    };
  }

  global.Collection = {
    configure: configure,
    // v2
    grantReward: grantReward,
    eggs: eggs,
    sac: sac,
    warmEgg: warmEgg,
    caress: caress,
    hatchEgg: hatchEgg,
    hatchThreshold: hatchThreshold,
    readyEggIndex: readyEggIndex,
    familleInfo: familleInfo,
    // compat v1
    grantCapsule: grantCapsule,
    pending: pending,
    readyToHatch: readyToHatch,
    hatch: hatch,
    owned: owned,
    own: own,
    state: state,
  };
})(window);
