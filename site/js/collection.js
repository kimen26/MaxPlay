// ─────────────────────────────────────────────────────────────────────────
//  collection.js — Moteur de collection MaxPlay (NID v5, v3 du moteur) — PUR, zéro DOM
//  HO-MJ-25, décision D-041 (2026-11-25). Remplace le modèle NID v4 (œufs +
//  accessoires consommés, anti-farm « 3 étoiles = rien »).
//
//  MODÈLE v3 :
//  · 3 NIDS côte à côte. Au départ rien : le 1er cadeau de l'histoire est un tas
//    de 6 cailloux (nid 1). Ensuite les cailloux arrivent par poignée de 2 ; un
//    nid est fermé à 6. Un ŒUF n'arrive que dans un nid fermé et libre.
//  · Un œuf a une FAMILLE (couleur connue dès le gain, espèce = surprise).
//    Il reçoit un LIT (reste au nid après l'éclosion) puis des HABITS (partent
//    avec le bébé). Éclosion : lit + 2 habits (tout 1er œuf : lit + 1 habit).
//    Jamais 3 habits du même type sur un œuf.
//  · Sac de 3 places (lits + habits), on ne jette JAMAIS rien : sac plein →
//    plus de lit ni d'habit tiré. Les 3 nids finis : cailloux peints (décor).
//  · La caresse est de l'affection (cœurs) : elle ne fait plus jamais éclore.
//  · Cadeau pas à chaque partie : voir collection-tirage.js (tirage pur, rng injecté).
//
//  Thème-neutre : le moteur ne connaît ni dino ni œuf. Items + familles injectés
//  via configure({items, familles, nid, rng}) ; le skin dino est collection-dinos.js.
//
//  Stockage : localStorage['maxplay_collection_v1'] (+ __profil), champ version:3.
//  Migration v1 → v2 → v3 automatique, silencieuse, écrite une fois.
//
//  API v3 : nids() · sac() · poser(nid, itemSac) · caresser(nid) · eclore(nid)
//    readyNidIndex() · grantReward({gameId, perfect, mastered}) · familleInfo(id)
//  Compat v2 (nid-ui.js, armoire.js, specs) : eggs · warmEgg · caress · hatchEgg
//    hatchThreshold · readyEggIndex · grantCapsule · pending · readyToHatch
//    hatch · owned · own · state
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  var BASE_KEY = 'maxplay_collection_v1';
  var CHILD_KEY = 'maxplay_active_child';
  var STREAK_WINDOW_MS = 30 * 60 * 1000; // 30 min : 3 parties enchaînées → œuf doré
  var NB_NIDS = 3;
  var CARESS_STAGES = 3;
  var T = global.CollectionTirage;

  var _items = [];      // [{id, nom, famille, rare?, star?, naissance?}]
  var _familles = [];   // [{id, label, emoji, color}]
  var _cat = T ? T.catalogue() : null;
  var _rng = function () { return Math.random(); };
  function R() { return _rng(); }

  // ── Clé localStorage (préfixée par profil actif si présent) ────────────
  function storageKey() {
    try {
      var raw = localStorage.getItem(CHILD_KEY);
      if (!raw) return BASE_KEY;
      var child = JSON.parse(raw);
      return (child && child.id) ? BASE_KEY + '__' + child.id : BASE_KEY;
    } catch (e) { return BASE_KEY; }
  }

  function _nidVide() { return { cailloux: 0, lit: [], peints: [], oeuf: null }; }
  function _emptyState() {
    var nids = [];
    for (var i = 0; i < NB_NIDS; i++) nids.push(_nidVide());
    return {
      version: 3, owned: [], nids: nids, sac: [],
      lastGrantAt: null, streakCount: 0, hatchCount: 0,
      dry: 0, lastDouble: false, lastGift: null,
    };
  }

  function _san(o) { return (o && typeof o === 'object') ? o : {}; }
  function _sanPiece(p) {
    p = _san(p);
    return { variante: typeof p.variante === 'string' ? p.variante : '', rare: !!p.rare };
  }
  function _sanHabit(h) {
    h = _san(h);
    return { id: typeof h.id === 'string' ? h.id : 'bonnet', variante: typeof h.variante === 'string' ? h.variante : '', rare: !!h.rare };
  }
  function _sanSac(s) {
    s = _san(s);
    var h = _sanHabit(s);
    return { type: s.type === 'lit' ? 'lit' : 'habit', id: s.type === 'lit' ? 'lit' : h.id, variante: h.variante, rare: h.rare };
  }
  function _sanOeuf(e) {
    if (!e || typeof e !== 'object') return null;
    return {
      famille: typeof e.famille === 'string' ? e.famille : null,
      golden: !!e.golden, at: typeof e.at === 'number' ? e.at : 0,
      naissance: typeof e.naissance === 'string' ? e.naissance : null,
      caresses: typeof e.caresses === 'number' ? e.caresses : 0,
      habits: (Array.isArray(e.habits) ? e.habits : []).map(_sanHabit),
    };
  }
  function _sanNid(n) {
    n = _san(n);
    return {
      cailloux: Math.max(0, Math.min(_cat.cailloux, typeof n.cailloux === 'number' ? n.cailloux : 0)),
      lit: (Array.isArray(n.lit) ? n.lit : []).slice(0, 1).map(_sanPiece),
      peints: (Array.isArray(n.peints) ? n.peints : []).slice(0, 12).map(_sanPiece),
      oeuf: _sanOeuf(n.oeuf),
    };
  }

  // ── Migration v2 → v3 (accessoires v2 → lit / habits) ───────────────────
  var ACC_V2 = {
    paille:     { type: 'lit',   id: 'lit',    variante: 'fougere',   rare: false },
    bonnet:     { type: 'habit', id: 'bonnet', variante: 'rouge',     rare: false },
    echarpe:    { type: 'habit', id: 'echarpe', variante: 'rayee',    rare: false },
    couverture: { type: 'habit', id: 'cape',   variante: 'ecossaise', rare: false },
    etoile:     { type: 'habit', id: 'cape',   variante: 'etoiles',   rare: true },
    etoile2:    { type: 'habit', id: 'cape',   variante: 'etoiles',   rare: true },
  };
  function _accV2(id) { return Object.assign({}, ACC_V2[id] || ACC_V2.bonnet); }

  function _depuisV2(d, s) {
    var req = T.habitsRequis(_cat, s.hatchCount);
    var eggs = (Array.isArray(d.eggs) ? d.eggs : []).slice(0, NB_NIDS);
    eggs.forEach(function (e, i) {
      e = _san(e);
      var items = (Array.isArray(e.acc) ? e.acc : []).map(_accV2);
      var lits = items.filter(function (a) { return a.type === 'lit'; });
      var habits = items.filter(function (a) { return a.type === 'habit'; });
      var nid = s.nids[i];
      nid.cailloux = _cat.cailloux;
      nid.lit = lits.length ? [{ variante: lits[0].variante, rare: false }] : [];
      lits.slice(1).forEach(function (l) { s.sac.push(l); });          // rien ne se perd
      var gardes = habits.slice(0, 2);
      habits.slice(2).forEach(function (h) { s.sac.push(h); });
      if (e.loveWarm) { // l'amour avait fini le travail : l'œuf reste prêt à éclore
        if (!nid.lit.length) nid.lit.push({ variante: 'fougere', rare: false });
        while (gardes.length < req) gardes.push(_accV2('bonnet'));
      }
      var oeuf = _sanOeuf(e);
      oeuf.habits = gardes.map(_sanHabit);
      nid.oeuf = oeuf;
    });
    (Array.isArray(d.sac) ? d.sac : []).forEach(function (id) { s.sac.push(_accV2(id)); });
    // Nid v2 vide mais des dinos déjà possédés : nid 1 fermé d'office (pas de retour à zéro)
    if (!eggs.length && s.owned.length) s.nids[0].cailloux = _cat.cailloux;
  }

  function _migrateFromBaseKey(profiledKey) {
    if (profiledKey === BASE_KEY) return null;
    try {
      var baseRaw = localStorage.getItem(BASE_KEY);
      if (!baseRaw) return null;
      var b = JSON.parse(baseRaw);
      if (!b || typeof b !== 'object') return null;
      var hasNid = (Array.isArray(b.eggs) && b.eggs.length) || (Array.isArray(b.pending) && b.pending.length) ||
        (Array.isArray(b.owned) && b.owned.length) || (Array.isArray(b.sac) && b.sac.length) ||
        (Array.isArray(b.nids) && b.nids.some(function (n) { return n && (n.cailloux || n.oeuf); }));
      if (!hasNid) return null;
      localStorage.setItem(profiledKey, baseRaw);
      localStorage.removeItem(BASE_KEY); // déplacement, jamais une copie (HO-MJ-21)
      return baseRaw;
    } catch (e) { return null; }
  }

  function load() {
    try {
      var key = storageKey();
      var raw = localStorage.getItem(key);
      if (!raw) raw = _migrateFromBaseKey(key);
      if (!raw) return _emptyState();
      var d = JSON.parse(raw);
      if (!d || typeof d !== 'object') return _emptyState();
      var s = _emptyState();
      s.owned = Array.isArray(d.owned) ? d.owned.slice() : [];
      s.lastGrantAt = typeof d.lastGrantAt === 'number' ? d.lastGrantAt : null;
      s.streakCount = typeof d.streakCount === 'number' ? d.streakCount : 0;
      if (d.version === 3) {
        for (var i = 0; i < NB_NIDS; i++) s.nids[i] = _sanNid((d.nids || [])[i]);
        s.sac = (Array.isArray(d.sac) ? d.sac : []).map(_sanSac);
        s.hatchCount = typeof d.hatchCount === 'number' ? d.hatchCount : 0;
        s.dry = typeof d.dry === 'number' ? d.dry : 0;
        s.lastDouble = !!d.lastDouble;
        s.lastGift = d.lastGift && typeof d.lastGift === 'object' ? d.lastGift : null;
        return s;
      }
      if (d.version === 2) {
        s.hatchCount = typeof d.hatchCount === 'number' ? d.hatchCount : 0;
      } else {
        // v1 : chaque capsule anonyme devient d'abord un œuf v2 (famille tirée maintenant)
        s.hatchCount = s.owned.length;
        d = { eggs: (Array.isArray(d.pending) ? d.pending : []).slice(0, NB_NIDS).map(function (c) {
          return { famille: _pickFamille(s.owned, !!(c && c.golden)), golden: !!(c && c.golden), at: (c && typeof c.at === 'number') ? c.at : 0, acc: [], caresses: 0 };
        }), sac: [] };
      }
      _depuisV2(d, s);
      save(s); // migration écrite une fois, pas re-jouée à chaque load
      return s;
    } catch (e) { return _emptyState(); }
  }

  // HO-MJ-21 : save() rend un booléen — l'appelant ne doit jamais annoncer un gain non écrit.
  function save(state) {
    try { localStorage.setItem(storageKey(), JSON.stringify(state)); return true; }
    catch (e) { return false; }
  }

  // ── Config catalogue (thème-neutre) ─────────────────────────────────────
  function configure(cfg) {
    if (!cfg) return;
    if (Array.isArray(cfg.items)) _items = cfg.items.filter(function (it) { return it && it.id; });
    if (Array.isArray(cfg.familles)) _familles = cfg.familles.filter(function (f) { return f && f.id; });
    if (cfg.nid && T) _cat = T.catalogue(cfg.nid);
    if (typeof cfg.rng === 'function') _rng = cfg.rng;
  }

  function _itemById(id) {
    for (var i = 0; i < _items.length; i++) if (_items[i].id === id) return _items[i];
    return null;
  }
  function familleInfo(id) {
    for (var i = 0; i < _familles.length; i++) if (_familles[i].id === id) return _familles[i];
    return null;
  }

  // ── Famille / espèce de l'œuf ───────────────────────────────────────────
  function _ouvertes(owned, starSeule) {
    var open = {};
    _items.forEach(function (it) {
      if (owned.indexOf(it.id) === -1 && (!starSeule || it.star === true)) open[it.famille || '_sans'] = 1;
    });
    return Object.keys(open);
  }
  // Mode de NAISSANCE (œuf / aquarium / tanière) : tiré avec la famille, l'éclosion s'y tient.
  function _naissanceOf(it) { return (it && it.naissance) || 'oeuf'; }
  function _candidatsNaissance(famille, owned, golden) {
    var inFam = _items.filter(function (it) { return (it.famille || '_sans') === famille; });
    var libres = inFam.filter(function (it) { return owned.indexOf(it.id) === -1; });
    var pool = libres.length ? libres : inFam;
    if (golden) {
      var stars = pool.filter(function (it) { return it.star === true; });
      if (stars.length) pool = stars;
    }
    return pool;
  }
  function _pickNaissance(famille, owned, golden) {
    var pool = _candidatsNaissance(famille, owned, golden);
    return pool.length ? _naissanceOf(pool[Math.floor(R() * pool.length)]) : 'oeuf';
  }
  function _naissanceParDefaut(famille) {
    var n = {}, best = 'oeuf', max = 0;
    _items.forEach(function (it) {
      if ((it.famille || '_sans') === famille) { var k = _naissanceOf(it); n[k] = (n[k] || 0) + 1; }
    });
    Object.keys(n).forEach(function (k) { if (n[k] > max) { max = n[k]; best = k; } });
    return best;
  }
  function _naissanceEgg(e) { return e.naissance || _naissanceParDefaut(e.famille); }

  // Famille entamée pèse 3× (complétion d'album) ; `avoid` = famille du cadeau précédent.
  function _pickFamille(owned, golden, avoid) {
    var open = _ouvertes(owned, false);
    if (!open.length) open = _items.length ? _items.map(function (it) { return it.famille || '_sans'; }) : ['_sans'];
    if (golden) {
      var stars = _ouvertes(owned, true).filter(function (f) { return open.indexOf(f) !== -1; });
      if (stars.length) open = stars;
    }
    if (avoid && open.some(function (f) { return f !== avoid; })) open = open.filter(function (f) { return f !== avoid; });
    var started = {};
    owned.forEach(function (id) { var it = _itemById(id); if (it && it.famille) started[it.famille] = true; });
    var pool = [];
    open.forEach(function (f) { for (var i = 0; i < (started[f] ? 3 : 1); i++) pool.push(f); });
    return pool[Math.floor(R() * pool.length)] || null;
  }

  // ── Prêt à éclore : lit + habits requis (1 pour le tout 1er œuf, sinon 2) ─
  function _requis(s) { return T.habitsRequis(_cat, s.hatchCount); }
  function _pret(nid, s) { return !!(nid.oeuf && nid.lit.length && nid.oeuf.habits.length >= _requis(s)); }
  function hatchThreshold() { return _requis(load()); }

  function _nbOeufs(s) { return s.nids.filter(function (n) { return n.oeuf; }).length; }
  function _nbDores(s) { return s.nids.filter(function (n) { return n.oeuf && n.oeuf.golden; }).length; }

  // ── Cadeau de fin de partie ──────────────────────────────────────────────
  // grantReward({gameId, perfect, mastered}) → {granted, gifts, double, type, count, …}
  // Plus d'anti-farm : un jeu à 3 étoiles suit la même règle (D-041).
  function _refus(s, saveFailed) {
    var l = saveFailed ? load() : s;
    return { granted: false, type: null, gifts: [], double: false, rien: !saveFailed, saveFailed: !!saveFailed,
      count: _nbOeufs(l), golden: _nbDores(l), justGolden: false };
  }

  function grantReward(opts) {
    opts = opts || {};
    if (!T) { console.warn('[collection] collection-tirage.js absent — aucun cadeau.'); return _refus(load(), false); }
    var s = load(), now = Date.now();
    var dansFenetre = s.lastGrantAt !== null && (now - s.lastGrantAt) <= STREAK_WINDOW_MS;
    s.streakCount = dansFenetre ? s.streakCount + 1 : 1;
    s.lastGrantAt = now;
    var golden = (typeof opts.golden === 'boolean') ? opts.golden : (s.streakCount % 3 === 0);
    var r = T.tirer(s, _cat, {
      rng: R, perfect: !!opts.perfect, mastered: !!opts.mastered, hatchCount: s.hatchCount, now: now,
      nouvelOeuf: function (avoid) {
        var f = _pickFamille(s.owned, golden, avoid);
        return { famille: f, naissance: _pickNaissance(f, s.owned, golden), golden: golden };
      },
    });
    s.nids = r.st.nids; s.sac = r.st.sac; s.dry = r.st.dry; s.lastDouble = r.st.lastDouble; s.lastGift = r.st.lastGift;
    // HO-MJ-21 : jamais granted:true si l'écriture a échoué (le théâtre célébrerait du vide)
    if (!save(s)) return _refus(s, true);
    if (!r.gifts.length) { var vide = _refus(s, false); vide.rien = true; return vide; }
    var g0 = r.gifts[0];
    var res = {
      granted: true, gifts: r.gifts, double: r.double, type: g0.type,
      count: _nbOeufs(s), golden: _nbDores(s), justGolden: !!(g0.type === 'oeuf' && g0.golden), sacCount: s.sac.length,
    };
    if (g0.type === 'oeuf') { res.famille = g0.famille; res.naissance = g0.naissance; res.familleMeta = familleInfo(g0.famille); }
    return res;
  }

  // ── Lecture (copies, jamais l'état interne) ─────────────────────────────
  function _oeufVue(nid, i, s) {
    var e = nid.oeuf;
    return {
      index: i, famille: e.famille, familleMeta: familleInfo(e.famille), naissance: _naissanceEgg(e),
      golden: e.golden, habits: e.habits.map(function (h) { return Object.assign({}, h); }),
      acc: e.habits.map(function (h) { return h.id; }), caresses: e.caresses,
      stage: Math.min(CARESS_STAGES, e.caresses), needed: _requis(s), ready: _pret(nid, s),
    };
  }

  function nids() {
    var s = load();
    return s.nids.map(function (n, i) {
      return {
        index: i, cailloux: n.cailloux, ferme: T.nidFerme(n, _cat),
        lit: n.lit.map(function (l) { return Object.assign({}, l); }),
        peints: n.peints.map(function (p) { return Object.assign({}, p); }),
        oeuf: n.oeuf ? _oeufVue(n, i, s) : null, ready: _pret(n, s),
      };
    });
  }

  function _nomObjet(it) {
    var nom = (_cat.noms && _cat.noms[it.type === 'lit' ? 'lit' : it.id]) || it.id;
    try { if (global.MJi18n) nom = global.MJi18n.t('_collection', 'acc.' + it.id, nom); } catch (e) {}
    return nom;
  }
  function sac() {
    return load().sac.map(function (it, i) {
      var k = it.type === 'lit' ? 'lit' : it.id;
      return {
        index: i, type: it.type, id: it.id, variante: it.variante, rare: it.rare, count: 1,
        key: it.type + ':' + it.id + ':' + it.variante, nom: _nomObjet(it),
        emoji: (_cat.emoji && _cat.emoji[k]) || '🎁',
      };
    });
  }

  function eggs() {
    var s = load(), out = [];
    s.nids.forEach(function (n, i) { if (n.oeuf) out.push(_oeufVue(n, i, s)); });
    return out;
  }

  // ── Poser un objet du sac sur un nid ─────────────────────────────────────
  // Refus (jamais d'erreur affichée : l'objet reste au sac) : inexistant · ouvert ·
  // lit · oeuf · type (3e habit du même type) · save.
  function poser(nidIndex, itemIndex) {
    var s = load(), nid = s.nids[nidIndex], it = s.sac[itemIndex];
    var non = function (why) { return { ok: false, ready: false, refus: why }; };
    if (!nid || !it) return non('inexistant');
    if (it.type === 'lit') {
      if (!T.nidFerme(nid, _cat)) return non('ouvert');
      if (nid.lit.length) return non('lit');
      nid.lit.push({ variante: it.variante, rare: it.rare });
    } else {
      if (!nid.oeuf) return non('oeuf');
      var memeType = nid.oeuf.habits.filter(function (h) { return h.id === it.id; }).length;
      if (memeType >= _cat.habitsParType) return non('type');
      nid.oeuf.habits.push({ id: it.id, variante: it.variante, rare: it.rare });
    }
    s.sac.splice(itemIndex, 1);
    if (!save(s)) return non('save');
    return { ok: true, ready: _pret(nid, s), refus: null };
  }

  function caresser(nidIndex) {
    var s = load(), nid = s.nids[nidIndex];
    if (!nid || !nid.oeuf) return { stage: 0, ready: false, loveJustWarmed: false };
    nid.oeuf.caresses = Math.min(30, nid.oeuf.caresses + 1);
    save(s);
    return { stage: Math.min(CARESS_STAGES, nid.oeuf.caresses), ready: _pret(nid, s), loveJustWarmed: false };
  }

  function readyNidIndex() {
    var s = load();
    for (var i = 0; i < s.nids.length; i++) if (_pret(s.nids[i], s)) return i;
    return -1;
  }

  // ── Éclosion : le nid et son lit RESTENT, les habits partent avec le bébé ──
  function eclore(nidIndex) {
    var s = load(), nid = s.nids[nidIndex];
    if (!nid || !_pret(nid, s)) return null;
    // HO-MJ-21 : catalogue absent → ne RIEN consommer, l'œuf reste intact
    if (!_items.length) return null;
    var egg = nid.oeuf;
    nid.oeuf = null;
    s.hatchCount += 1;
    var notOwned = _items.filter(function (it) { return s.owned.indexOf(it.id) === -1; });
    if (!notOwned.length) {
      if (!save(s)) return null;
      return { type: 'doublon', item: _items[Math.floor(R() * _items.length)] };
    }
    var mode = _naissanceEgg(egg);
    var memeMode = notOwned.filter(function (it) { return _naissanceOf(it) === mode; });
    var inFamille = memeMode.filter(function (it) { return (it.famille || '_sans') === egg.famille; });
    if (egg.golden) { // doré = très connu avant tout
      var stars = inFamille.filter(function (it) { return it.star === true; });
      if (stars.length) inFamille = stars;
      else { var any = memeMode.filter(function (it) { return it.star === true; }); if (any.length) inFamille = any; }
    }
    var candidates = inFamille.length ? inFamille : (memeMode.length ? memeMode : notOwned);
    var picked = candidates[Math.floor(R() * candidates.length)];
    s.owned.push(picked.id);
    return save(s) ? picked : null;
  }

  // ── Possession ────────────────────────────────────────────────────────
  function owned() { return load().owned.slice(); }
  function own(id) {
    if (!id) return;
    var s = load();
    if (s.owned.indexOf(id) === -1) { s.owned.push(id); save(s); }
  }

  // ── Compat v2 (nid-ui.js, armoire.js, specs) ────────────────────────────
  // warmEgg(nid, ref) : ref = key, id ou variante de l'objet du sac (1er qui correspond).
  function warmEgg(nidIndex, ref) {
    var items = sac().filter(function (a) { return a.key === ref || a.id === ref || a.variante === ref; });
    if (!items.length) return { ok: false, ready: false };
    return poser(nidIndex, items[0].index);
  }
  function pending() { var s = load(); return { count: _nbOeufs(s), golden: _nbDores(s) }; }
  function state() {
    var s = load();
    return {
      owned: s.owned.slice(), nids: nids(), eggs: eggs(), sac: sac(),
      pending: pending(), streak: s.streakCount, hatchCount: s.hatchCount,
    };
  }

  global.Collection = {
    configure: configure,
    // v3
    grantReward: grantReward, nids: nids, sac: sac, poser: poser, caresser: caresser,
    eclore: eclore, readyNidIndex: readyNidIndex, familleInfo: familleInfo,
    // compat v2
    eggs: eggs, warmEgg: warmEgg, caress: caresser, hatchEgg: eclore,
    hatchThreshold: hatchThreshold, readyEggIndex: readyNidIndex,
    grantCapsule: grantReward, pending: pending,
    readyToHatch: function () { return readyNidIndex() !== -1; },
    hatch: function () { var i = readyNidIndex(); return i === -1 ? null : eclore(i); },
    owned: owned, own: own, state: state,
  };
})(window);
