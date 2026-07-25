// ─────────────────────────────────────────────────────────────────────────
//  collection.js — Moteur de collection MaxPlay (NID) — PUR, zéro DOM, zéro fetch
//  Chantier NID P1 (studio/minijeux/docs/2026-07-26-chantier-nid-plan.md, avenant P0)
//
//  1 capsule (œuf) gagnée par partie TERMINÉE (mj-golden appelle grantCapsule()).
//  3 capsules → éclosion possible → tire 1 item non possédé.
//  Série : 3 parties enchaînées dans une fenêtre de 30 min → la capsule
//  suivante est DORÉE automatiquement → l'éclosion qu'elle déclenche pioche
//  dans les items RARES (20% les moins représentés). Pas de cap journalier
//  (décision avenant P0 #2 — anti-pattern punitif).
//
//  Thème-neutre : le moteur ne connaît ni dino ni œuf. La liste d'items vient
//  d'une config injectée via Collection.configure({items:[...]}).
//  Le skin dino est fourni par collection-dinos.js (mappe DINOS → items).
//
//  Stockage : localStorage['maxplay_collection_v1'], préfixé par profil actif
//  (maxplay_active_child) si présent — même logique que le reste du site
//  (isolation locale légère ; sync cloud multi-appareil = phase 2).
//
//  Usage : <script src="js/collection.js"></script>
//  API   : Collection.configure({items}) · Collection.grantCapsule({golden})
//          Collection.pending() · Collection.readyToHatch() · Collection.hatch()
//          Collection.owned() · Collection.own(id) · Collection.state()
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  var BASE_KEY = 'maxplay_collection_v1';
  var CHILD_KEY = 'maxplay_active_child';
  var STREAK_WINDOW_MS = 30 * 60 * 1000; // 30 min (avenant P0 #3)
  var HATCH_COST = 3;
  var RARE_SHARE = 0.20; // 20% les moins représentés (avenant P0 #3, doré → rare)

  var _items = []; // config injectée : [{id, nom, famille, rare?}]

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
      version: 1,
      owned: [],       // ids possédés
      pending: [],      // capsules en attente : [{golden:bool, at:ms}]
      lastGrantAt: null, // timestamp dernière capsule accordée (pour la série)
      streakCount: 0,    // nb de parties enchaînées dans la fenêtre courante
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
      s.pending = Array.isArray(d.pending) ? d.pending.slice() : [];
      s.lastGrantAt = typeof d.lastGrantAt === 'number' ? d.lastGrantAt : null;
      s.streakCount = typeof d.streakCount === 'number' ? d.streakCount : 0;
      return s;
    } catch (e) { return _emptyState(); }
  }

  function save(state) {
    try { localStorage.setItem(storageKey(), JSON.stringify(state)); } catch (e) { /* plein/absent : silencieux, jamais de crash */ }
  }

  // ── Config catalogue (thème-neutre) ─────────────────────────────────────
  // items: [{id, nom, famille, rare:boolean}]
  function configure(cfg) {
    if (!cfg || !Array.isArray(cfg.items)) return;
    _items = cfg.items.filter(function (it) { return it && it.id; });
  }

  function _allIds() { return _items.map(function (it) { return it.id; }); }
  function _itemById(id) {
    for (var i = 0; i < _items.length; i++) if (_items[i].id === id) return _items[i];
    return null;
  }

  // ── Octroi d'une capsule (fin de partie terminée) ───────────────────────
  // grantCapsule({golden}) : golden peut être forcé par l'appelant (mj-golden
  // sait déjà si la série est atteinte), sinon le moteur la calcule lui-même
  // via la fenêtre de 30 min (avenant P0 #3 : 3 parties enchaînées).
  function grantCapsule(opts) {
    opts = opts || {};
    var s = load();
    var now = Date.now();

    var withinWindow = s.lastGrantAt !== null && (now - s.lastGrantAt) <= STREAK_WINDOW_MS;
    s.streakCount = withinWindow ? (s.streakCount + 1) : 1;
    s.lastGrantAt = now;

    var autoGolden = s.streakCount > 0 && s.streakCount % 3 === 0;
    var golden = (typeof opts.golden === 'boolean') ? opts.golden : autoGolden;

    s.pending.push({ golden: !!golden, at: now });
    save(s);
    // justGolden : cette capsule précise est-elle dorée (P2/mj-golden en a besoin
    // pour teinter l'anim eggEarned) — additif, ne change pas le contrat existant
    // `golden` (nb de capsules dorées en attente).
    return { count: s.pending.length, golden: s.pending.filter(function (c) { return c.golden; }).length, justGolden: !!golden };
  }

  // ── Capsules en attente ──────────────────────────────────────────────────
  function pending() {
    var s = load();
    return {
      count: s.pending.length,
      golden: s.pending.filter(function (c) { return c.golden; }).length,
    };
  }

  function readyToHatch() {
    return load().pending.length >= HATCH_COST;
  }

  // ── Pondération de tirage ────────────────────────────────────────────────
  // Familles déjà entamées (au moins 1 item possédé de cette famille) sont
  // favorisées (complétion narrative, décision plan §2.3). Doré → réserve
  // rare (20% les moins représentés du catalogue par famille).
  function _rareIds() {
    if (!_items.length) return [];
    // "les moins représentés" : familles avec le moins d'items dans le
    // catalogue = rares par construction ; sinon fallback sur le flag rare.
    var flagged = _items.filter(function (it) { return it.rare === true; }).map(function (it) { return it.id; });
    if (flagged.length) return flagged;

    var counts = {};
    _items.forEach(function (it) {
      var f = it.famille || '_sans';
      counts[f] = (counts[f] || 0) + 1;
    });
    var familles = Object.keys(counts).sort(function (a, b) { return counts[a] - counts[b]; });
    var cut = Math.max(1, Math.ceil(familles.length * RARE_SHARE));
    var rareFamilies = familles.slice(0, cut);
    return _items.filter(function (it) { return rareFamilies.indexOf(it.famille || '_sans') !== -1; })
                 .map(function (it) { return it.id; });
  }

  function _weightedPick(candidates, owned) {
    // Familles entamées (>=1 possédé) pèsent 3x plus que les familles neuves.
    var ownedFamilies = {};
    owned.forEach(function (id) {
      var it = _itemById(id);
      if (it && it.famille) ownedFamilies[it.famille] = true;
    });

    var pool = [];
    candidates.forEach(function (id) {
      var it = _itemById(id);
      var weight = (it && it.famille && ownedFamilies[it.famille]) ? 3 : 1;
      for (var i = 0; i < weight; i++) pool.push(id);
    });
    if (!pool.length) return candidates[0];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ── Éclosion : consomme 3 capsules, tire un item ─────────────────────────
  function hatch() {
    var s = load();
    if (s.pending.length < HATCH_COST) return null; // appelant doit vérifier readyToHatch() avant

    var consumed = s.pending.slice(0, HATCH_COST);
    s.pending = s.pending.slice(HATCH_COST);
    var goldenConsumed = consumed.some(function (c) { return c.golden; });

    var ownedSet = s.owned.slice();
    var allIds = _allIds();
    var notOwned = allIds.filter(function (id) { return ownedSet.indexOf(id) === -1; });

    if (!notOwned.length) {
      save(s);
      var anyItem = allIds.length ? _itemById(allIds[Math.floor(Math.random() * allIds.length)]) : null;
      return { type: 'doublon', item: anyItem };
    }

    var candidates = notOwned;
    if (goldenConsumed) {
      var rare = _rareIds().filter(function (id) { return notOwned.indexOf(id) !== -1; });
      if (rare.length) candidates = rare;
    }

    var pickedId = _weightedPick(candidates, ownedSet);
    s.owned.push(pickedId);
    save(s);

    return _itemById(pickedId);
  }

  // ── Possession ────────────────────────────────────────────────────────────
  function owned() { return load().owned.slice(); }

  function own(id) {
    if (!id) return;
    var s = load();
    if (s.owned.indexOf(id) === -1) { s.owned.push(id); save(s); }
  }

  // ── Snapshot pour l'UI ────────────────────────────────────────────────────
  function state() {
    var s = load();
    return {
      owned: s.owned.slice(),
      pending: { count: s.pending.length, golden: s.pending.filter(function (c) { return c.golden; }).length },
      streak: s.streakCount,
    };
  }

  global.Collection = {
    configure: configure,
    grantCapsule: grantCapsule,
    pending: pending,
    readyToHatch: readyToHatch,
    hatch: hatch,
    owned: owned,
    own: own,
    state: state,
  };
})(window);
