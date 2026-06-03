// ─────────────────────────────────────────────────────────────────────────
//  stars.js — Étoiles de progression MaxPlay (DÉRIVÉES, lecture seule)
//  1 étoile = une partie validée à 100% (un palier réussi). maxStars (catalog.js)
//  = trophée "MAXIMUM". Jamais de perte d'étoile.
//
//  ⭐ ZÉRO édition des jeux : les étoiles se déduisent de la progression que
//  tracker.js enregistre DÉJÀ dans localStorage['maxplay_progress']
//  (parties + historique des sessions avec correct/questions ou score/maxScore).
//
//  Usage : <script src="js/catalog.js"></script> puis <script src="js/stars.js"></script>
//  API   : Stars.get(id) · Stars.max(id) · Stars.isComplete(id) · Stars.plays(id)
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  const PROGRESS_KEY = 'maxplay_progress'; // écrit par tracker.js

  const maxOf = (id) => {
    const e = (global.MAXPLAY_CATALOG || []).find(c => c.id === id);
    return e && e.maxStars ? e.maxStars : 0;
  };

  function progress() { try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch (e) { return {}; } }
  function rec(id) { const d = progress(); return (d.games && d.games[id]) || null; }

  function plays(id) { const g = rec(id); return g ? (g.plays || 0) : 0; }

  // Sessions parfaites = palier validé à 100% (deux signaux possibles selon le jeu)
  function perfectCount(id) {
    const g = rec(id);
    if (!g || !Array.isArray(g.history)) return 0;
    return g.history.filter(h =>
      (h.questions > 0 && h.correct >= h.questions) ||
      (h.maxScore > 0 && h.score >= h.maxScore)
    ).length;
  }

  function get(id) { const m = maxOf(id); return m ? Math.min(m, perfectCount(id)) : 0; }
  function max(id) { return maxOf(id); }
  function isComplete(id) { const m = maxOf(id); return m > 0 && get(id) >= m; }

  global.Stars = { get, max, isComplete, plays };
})(window);
