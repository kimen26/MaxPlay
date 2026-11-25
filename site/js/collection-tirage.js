// ─────────────────────────────────────────────────────────────────────────
//  collection-tirage.js — Tirage des cadeaux du NID v5 (HO-MJ-25, D-041)
//  PUR : zéro DOM, zéro localStorage, zéro Date. Le hasard est injecté (rng).
//  Séparé de collection.js (règle < 400 lignes). Charger AVANT collection.js.
//
//  État manipulé (copie, jamais l'état stocké) :
//    { nids:[{cailloux, lit:[{variante,rare}], peints:[{variante}], oeuf:null|{...,habits:[]}}],
//      sac:[{type:'lit'|'habit', id, variante, rare}], dry, lastDouble, lastGift }
//  Cadeau : {type:'cailloux'|'oeuf'|'lit'|'habit'|'peint', id, variante, rare, n?, nid}
//    cailloux : id 'cailloux', variante = forme ('1'..'3')
//    oeuf     : id 'oeuf', variante = famille (+ famille, naissance, golden)
//    lit      : id 'lit', variante = brindilles|fougere|mousse|plumes|plume-doree
//    habit    : id = bonnet|echarpe|cape, variante = rouge|bleu|loup|…
//    peint    : id 'peint', variante = etoile|coeur|…
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  var DEFAUT = {
    nbNids: 3,
    cailloux: 6,        // cailloux pour fermer un nid
    poignee: 2,         // cailloux par cadeau (hors tout premier : 6 d'un coup)
    sacMax: 3,          // places du sac (lits + habits), on ne jette jamais rien
    peintsMax: 4,       // cailloux peints décoratifs par nid
    habitsEclosion: 2,  // habits pour éclore (1 pour le tout premier œuf)
    habitsParType: 2,   // jamais 3 fois le même type d'habit sur un œuf
    formes: ['1', '2', '3'],
    lits: { commun: ['brindilles', 'fougere', 'mousse', 'plumes'], rare: ['plume-doree'] },
    habits: {
      bonnet:  { commun: ['rouge', 'bleu'],       rare: ['loup', 'bus'] },
      echarpe: { commun: ['rayee', 'pois'],       rare: ['bresil', 'france'] },
      cape:    { commun: ['ecossaise', 'nuage'],  rare: ['etoiles', 'empreintes'] },
    },
    peints: ['etoile', 'coeur', 'raye', 'pois', 'arcenciel'], // tous rares
    emoji: { lit: '🪺', bonnet: '🧢', echarpe: '🧣', cape: '🧥' },
    noms: { lit: 'un lit', bonnet: 'un bonnet', echarpe: 'une écharpe', cape: 'une cape' },
    chance: 0.5, chanceSansFaute: 0.7, chanceDouble: 0.1, secheresseMax: 2,
    chanceRareSansFaute: 0.5, // un sans-faute donne une variante rare une fois sur deux (mastered : toujours)
  };

  // Fusion superficielle clé par clé : un habit ou une liste fournie remplace le défaut.
  function catalogue(over) {
    var c = {};
    Object.keys(DEFAUT).forEach(function (k) { c[k] = DEFAUT[k]; });
    if (over && typeof over === 'object') Object.keys(over).forEach(function (k) { if (over[k] != null) c[k] = over[k]; });
    return c;
  }

  function cloner(x) { return JSON.parse(JSON.stringify(x)); }
  function pick(arr, rng) { return arr[Math.min(arr.length - 1, Math.floor(rng() * arr.length))]; }
  function meme(a, b) { return !!(a && b && a.type === b.type && a.id === b.id && a.variante === b.variante); }
  function cle(g) { return g ? g.type + '|' + g.id + '|' + g.variante : null; }

  function habitsRequis(cat, hatchCount) { return hatchCount === 0 ? 1 : cat.habitsEclosion; }
  function nidFerme(n, cat) { return n.cailloux >= cat.cailloux; }
  function compte(sac, type) { return sac.filter(function (s) { return s.type === type; }).length; }

  function premierCadeau(st) {
    return st.nids.every(function (n) { return n.cailloux === 0 && !n.oeuf && !n.lit.length; });
  }

  // Ce dont les nids ont besoin, dans l'ordre : lit AVANT habits.
  function besoins(st, cat, hatchCount) {
    var out = [], sacPlein = st.sac.length >= cat.sacMax;
    var sacLits = compte(st.sac, 'lit'), sacHabits = compte(st.sac, 'habit');
    var req = habitsRequis(cat, hatchCount);
    if (!sacPlein && !sacLits && st.nids.some(function (n) { return n.oeuf && !n.lit.length; })) out.push('lit');
    if (!sacPlein) {
      var credit = sacLits, manque = 0;
      st.nids.forEach(function (n) {
        if (!n.oeuf) return;
        var eligible = n.lit.length > 0 || (credit > 0 && credit--);
        if (eligible) manque += Math.max(0, req - n.oeuf.habits.length);
      });
      if (manque > sacHabits) out.push('habit');
    }
    if (st.nids.some(function (n) { return nidFerme(n, cat) && !n.oeuf; })) out.push('oeuf');
    // Cailloux = agrandir le terrain : seulement quand chaque nid fermé a déjà
    // son œuf (D-041, recette 2026-11-25 : tirés à égalité avec l'œuf, ils
    // ont retardé le 1er œuf jusqu'à la 13e partie simulée).
    var nidLibre = st.nids.some(function (n) { return nidFerme(n, cat) && !n.oeuf; });
    if (!nidLibre && st.nids.some(function (n) { return !nidFerme(n, cat); })) out.push('cailloux');
    if (!out.length && st.nids.some(function (n) { return n.peints.length < cat.peintsMax; })) out.push('peint');
    return out;
  }

  function nidCible(st, cat, type) {
    var best = -1, bestV = null;
    st.nids.forEach(function (n, i) {
      var v = null;
      if (type === 'cailloux') v = nidFerme(n, cat) ? null : -n.cailloux;            // le plus avancé
      else if (type === 'oeuf') v = (nidFerme(n, cat) && !n.oeuf) ? 0 : null;       // premier libre
      else if (type === 'lit') v = (n.oeuf && !n.lit.length) ? 0 : null;
      else if (type === 'habit') v = n.oeuf ? n.oeuf.habits.length : null;          // le moins habillé
      else if (type === 'peint') v = n.peints.length < cat.peintsMax ? n.peints.length : null;
      if (v !== null && (bestV === null || v < bestV)) { best = i; bestV = v; }
    });
    return best;
  }

  function liste(pool, rare) {
    var l = rare ? pool.rare : pool.commun;
    return (l && l.length) ? l : (rare ? pool.commun : pool.rare) || [];
  }

  // Options (cadeaux candidats) pour un besoin. Le rare dépend du sans-faute.
  function options(type, st, cat, ctx, last) {
    var rare = !!ctx.rare, res = [];
    if (type === 'cailloux') {
      cat.formes.forEach(function (f) { res.push({ id: 'cailloux', variante: f, rare: false }); });
    } else if (type === 'lit') {
      liste(cat.lits, rare).forEach(function (v) { res.push({ id: 'lit', variante: v, rare: rare }); });
    } else if (type === 'habit') {
      Object.keys(cat.habits).forEach(function (k) {
        liste(cat.habits[k], rare).forEach(function (v) { res.push({ id: k, variante: v, rare: rare }); });
      });
    } else if (type === 'peint') {
      cat.peints.forEach(function (v) { res.push({ id: 'peint', variante: v, rare: true }); });
    } else if (type === 'oeuf') {
      var o = ctx.nouvelOeuf(last && last.type === 'oeuf' ? last.variante : null);
      if (o) res.push({ id: 'oeuf', variante: o.famille, rare: false, extra: o });
    }
    return res;
  }

  function choisir(st, cat, ctx, last, force) {
    var bs = besoins(st, cat, ctx.hatchCount), cand = [];
    bs.forEach(function (b) {
      var opts = options(b, st, cat, ctx, last);
      var ok = opts.filter(function (o) { return !meme({ type: b, id: o.id, variante: o.variante }, last); });
      cand.push({ type: b, opts: ok, tous: opts });
    });
    var avec = cand.filter(function (c) { return c.opts.length; });
    var c, o;
    if (avec.length) { c = pick(avec, ctx.rng); o = pick(c.opts, ctx.rng); }
    else if (force) {
      var tous = cand.filter(function (x) { return x.tous.length; });
      if (!tous.length) return null;
      c = pick(tous, ctx.rng); o = pick(c.tous, ctx.rng);
    } else return null;
    var g = { type: c.type, id: o.id, variante: o.variante, rare: !!o.rare, nid: nidCible(st, cat, c.type) };
    if (c.type === 'cailloux') g.n = Math.min(cat.poignee, cat.cailloux - st.nids[g.nid].cailloux);
    if (c.type === 'oeuf') { g.famille = o.extra.famille; g.naissance = o.extra.naissance; g.golden = !!o.extra.golden; }
    return g;
  }

  function appliquer(st, g, cat, now) {
    var n = st.nids[g.nid];
    if (g.type === 'cailloux') n.cailloux = Math.min(cat.cailloux, n.cailloux + (g.n || 1));
    else if (g.type === 'oeuf') n.oeuf = { famille: g.famille, golden: !!g.golden, at: now || 0, naissance: g.naissance || null, caresses: 0, habits: [] };
    else if (g.type === 'peint') n.peints.push({ variante: g.variante });
    else st.sac.push({ type: g.type, id: g.id, variante: g.variante, rare: !!g.rare });
  }

  // Tirage d'une partie terminée. Rend {st, gifts, double} sur une COPIE de l'état.
  // ctx : {rng, perfect, mastered, hatchCount, now, nouvelOeuf(avoid)→{famille,naissance,golden}}
  function tirer(etat, cat, ctx) {
    var st = cloner(etat), gifts = [], double = false, g;
    if (premierCadeau(st)) {
      g = { type: 'cailloux', id: 'cailloux', variante: cat.formes[0], rare: false, n: cat.cailloux, nid: 0 };
      appliquer(st, g, cat, ctx.now);
      st.dry = 0; st.lastDouble = false; st.lastGift = { type: g.type, id: g.id, variante: g.variante };
      return { st: st, gifts: [g], double: false };
    }
    // Rare : toujours si maîtrise, une fois sur deux si sans-faute (D-041, réglage du 2026-11-25)
    ctx.rare = !!ctx.mastered || (!!ctx.perfect && ctx.rng() < cat.chanceRareSansFaute);
    var force = !!ctx.mastered || st.dry >= cat.secheresseMax;
    var chance = ctx.perfect ? cat.chanceSansFaute : cat.chance;
    var donne = force || ctx.rng() < chance;
    g = donne ? choisir(st, cat, ctx, st.lastGift, force) : null;
    if (!g) { st.dry += 1; st.lastDouble = false; return { st: st, gifts: [], double: false }; }
    appliquer(st, g, cat, ctx.now); gifts.push(g); st.dry = 0;
    if (!st.lastDouble && ctx.rng() < cat.chanceDouble) {
      var g2 = choisir(st, cat, ctx, g, false);
      if (g2) { appliquer(st, g2, cat, ctx.now); gifts.push(g2); double = true; }
    }
    st.lastDouble = double;
    var dernier = gifts[gifts.length - 1];
    st.lastGift = { type: dernier.type, id: dernier.id, variante: dernier.variante };
    return { st: st, gifts: gifts, double: double };
  }

  global.CollectionTirage = {
    DEFAUT: DEFAUT, catalogue: catalogue, tirer: tirer, besoins: besoins,
    habitsRequis: habitsRequis, nidFerme: nidFerme, cle: cle, meme: meme,
  };
})(window);
