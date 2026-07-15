// ─────────────────────────────────────────────────────────────────────────
//  pins.js — Rangée « ⭐ Tes jeux » : favoris épinglés + jeu du jour
//  Figée : studio/minijeux/docs/jeux/figees/menu.md (MENU v2, 2026-07-16)
//  Stockage : localStorage['maxplay_pins'] = ["mj-18","mj-31",…] (max 5)
//
//  Dépend (souple, tout optionnel) : window.MAXPLAY_CATALOG, Stars, Tracker, Unlock.
//  API :
//    Pins.list()            → ids épinglés valides (existants + débloqués), cap 5
//    Pins.has(id) / .add(id) / .remove(id) / .toggle(id)
//    Pins.full()            → true si 5 épinglés (add refusé)
//    Pins.rowIds()          → ce qu'affiche la rangée : épinglés, ou fallback récents
//    Pins.gameOfDay()       → 1 id « jeu du jour » (délaissé prioritaire), stable/jour
// ─────────────────────────────────────────────────────────────────────────

window.Pins = (function () {
  var KEY = 'maxplay_pins';
  var CAP = 5;

  function catalog() { return window.MAXPLAY_CATALOG || []; }
  function entry(id) { return catalog().find(function (e) { return e.id === id; }); }

  // Un jeu est « proposable » (rangée/jeu du jour) s'il existe, est live, jouable
  // (a des étoiles → un mini-jeu, pas l'encyclopédie), et débloqué.
  // « showable » : peut figurer dans la rangée (existe, live, a des étoiles →
  // un mini-jeu, pas l'encyclopédie ni un bac à sable).
  function showable(e) {
    return !!(e && e.status === 'live' && e.maxStars);
  }
  // « playable » : showable ET débloqué → lançable directement. Réservé au jeu du
  // jour (qui doit être jouable). Un jeu ÉPINGLÉ verrouillé reste affiché (choix
  // du parent) — le clic montrera le cadenas comme dans le tiroir.
  function playable(e) {
    if (!showable(e)) return false;
    try { if (window.Unlock && !Unlock.isUnlocked(e.id)) return false; } catch (x) {}
    return true;
  }

  function read() {
    try { var a = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(a) ? a : []; }
    catch (x) { return []; }
  }
  function write(a) {
    try { localStorage.setItem(KEY, JSON.stringify(a.slice(0, CAP))); } catch (x) {}
    try { window.Cloud && window.Cloud.schedulePush(); } catch (x) {}
  }

  // Liste nettoyée : ids encore présents au catalogue (garde même si re-verrouillé
  // temporairement — l'affichage filtrera). Dédupliquée, plafonnée.
  function list() {
    var seen = {};
    return read().filter(function (id) {
      if (seen[id] || !entry(id)) return false;
      seen[id] = 1; return true;
    }).slice(0, CAP);
  }

  function has(id) { return list().indexOf(id) !== -1; }
  function full() { return list().length >= CAP; }

  function add(id) {
    if (!entry(id) || has(id) || full()) return false;
    var a = list(); a.push(id); write(a); return true;
  }
  function remove(id) {
    var a = list().filter(function (x) { return x !== id; });
    write(a); return true;
  }
  function toggle(id) { return has(id) ? (remove(id), false) : add(id); }

  function stars(id) { try { return window.Stars ? Stars.get(id) : 0; } catch (x) { return 0; } }
  function lastPlayed(id) {
    try {
      var st = window.Tracker && Tracker.getStats();
      var g = st && st.games && st.games[id];
      return g && g.lastPlayed ? Date.parse(g.lastPlayed) || 0 : 0;
    } catch (x) { return 0; }
  }

  // Ce qu'affiche la rangée : les épinglés valides (playable) ; à défaut (aucun
  // épinglé — reset / nouvelle tablette) fallback sur les derniers joués, pour ne
  // JAMAIS montrer une rangée vide.
  function rowIds() {
    var pinned = list().filter(function (id) { return showable(entry(id)); });
    if (pinned.length) return pinned;
    return catalog()
      .filter(playable)
      .filter(function (e) { return lastPlayed(e.id) > 0; })
      .sort(function (a, b) { return lastPlayed(b.id) - lastPlayed(a.id); })
      .slice(0, 4)
      .map(function (e) { return e.id; });
  }

  // Seed stable sur la journée (sans Date.now piégé : new Date() est OK en browser).
  function dayIndex(n) {
    if (!n) return 0;
    var d = new Date();
    var day = Math.floor(d.getTime() / 86400000);   // n° de jour depuis epoch
    return ((day % n) + n) % n;
  }

  // Jeu du jour : priorité aux DÉLAISSÉS (peu d'étoiles d'abord, puis les plus
  // anciennement joués / jamais joués), tiré de façon stable sur la journée.
  // But : ramener Max vers les vieux jeux, pas vers ses favoris déjà rodés.
  function gameOfDay() {
    var pool = catalog().filter(playable);
    if (!pool.length) return null;
    var NOW = new Date().getTime();
    pool.sort(function (a, b) {
      var sa = stars(a.id), sb = stars(b.id);
      if (sa !== sb) return sa - sb;                        // moins d'étoiles = prioritaire
      var la = lastPlayed(a.id) || 0, lb = lastPlayed(b.id) || 0;
      return (NOW - lb) - (NOW - la);                       // plus vieux / jamais joué d'abord
    });
    // Fenêtre des ~5 plus délaissés, rotation quotidienne dedans (varie jour à jour
    // sans retomber toujours sur le pire).
    var head = pool.slice(0, Math.min(5, pool.length));
    return head[dayIndex(head.length)].id;
  }

  return {
    list: list, has: has, add: add, remove: remove, toggle: toggle, full: full,
    rowIds: rowIds, gameOfDay: gameOfDay, CAP: CAP
  };
})();
