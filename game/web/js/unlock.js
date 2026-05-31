// ─────────────────────────────────────────────────────────────────────────
//  unlock.js — Accès au contenu MaxPlay (abstraction swappable local → serveur)
//  Dépend de : catalog.js (window.MAXPLAY_CATALOG) + stars.js (window.Stars)
//
//  3 modes (champ catalog.access) :
//    'sequence' : chaîne de mini-jeux. Le 1er est ouvert ; chaque jeu ouvre le
//                 SUIVANT dès que le précédent a 1★ (une partie 100%) — option B :
//                 on débloque tôt, maxStars reste le trophée. Garde-fou anti-blocage :
//                 ouvert aussi après UNLOCK_TRIES essais (Max n'est jamais coincé).
//    'free'     : toujours accessible (bacs à sable : Max Adventure, Pose-tiles, sons).
//    'code'     : déverrouillé par un mot-clé. V0 = validation LOCALE ; V-final = serveur
//                 (activation/anti-partage) — redeem() est ASYNC pour que seul l'intérieur
//                 change le jour du serveur.
//  Store codes : localStorage['maxplay_unlocks'] = { [bundle]: true }
//
//  API : Unlock.isUnlocked(id) · Unlock.lockedReason(id) · await Unlock.redeem(code) · Unlock.all()
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  const KEY = 'maxplay_unlocks';
  const UNLOCK_STARS = 1; // étoile(s) sur le jeu précédent pour ouvrir le suivant (option B)
  const UNLOCK_TRIES = 4; // ...OU nb d'essais (garde-fou : jamais de cul-de-sac pour Max)

  const catalog = () => global.MAXPLAY_CATALOG || [];
  const entry = (id) => catalog().find(e => e.id === id) || null;
  const sequence = () => catalog().filter(e => e.access === 'sequence'); // ordonnée
  const S = () => global.Stars;

  function loadUnlocks() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function saveUnlocks(data) { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }

  function isUnlocked(id) {
    const e = entry(id);
    if (!e) return false;
    if (e.access === 'free') return true;
    if (e.access === 'code') return !!loadUnlocks()[(e.unlock && e.unlock.bundle) || e.id];
    if (e.access === 'sequence') {
      const seq = sequence();
      const i = seq.findIndex(s => s.id === id);
      if (i <= 0) return true;                           // 1er jeu (ou introuvable) = ouvert
      const prev = seq[i - 1].id;
      const stars = S() ? S().get(prev) : 0;
      const tries = S() ? S().plays(prev) : 0;
      return stars >= UNLOCK_STARS || tries >= UNLOCK_TRIES;
    }
    return false;
  }

  function lockedReason(id) {
    const e = entry(id);
    if (!e || isUnlocked(id)) return null;
    if (e.access === 'code') return 'code';                // → demander le mot-clé à un adulte
    if (e.access === 'sequence') return 'finish-previous'; // → jouer le jeu précédent
    return 'locked';
  }

  // ASYNC dès le départ. V0 : validation locale contre les codes du catalogue.
  // V-FINAL : remplacer le bloc "validation locale" par un fetch serveur — la
  //           signature (Promise<{ok,bundle}>) et tout le reste ne changent pas.
  async function redeem(code) {
    const norm = String(code || '').trim().toUpperCase();
    const target = catalog().find(e =>
      e.access === 'code' && e.unlock && String(e.unlock.code).toUpperCase() === norm);
    if (!target) return { ok: false, reason: 'invalid' };
    const bundle = target.unlock.bundle || target.id;
    saveUnlocks({ ...loadUnlocks(), [bundle]: true });     // immutable
    return { ok: true, bundle };
  }

  function all() {
    return catalog().map(e => ({
      id: e.id, access: e.access,
      unlocked: isUnlocked(e.id), reason: lockedReason(e.id),
    }));
  }

  global.Unlock = { isUnlocked, lockedReason, redeem, all, UNLOCK_STARS, UNLOCK_TRIES };
})(window);
