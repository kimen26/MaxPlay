// ─────────────────────────────────────────────────────────────────────────
//  unlock.js — Accès au contenu MaxPlay (abstraction swappable local → serveur)
//  Dépend de : catalog.js (window.MAXPLAY_CATALOG) + stars.js (window.Stars)
//
//  3 modes (champ catalog.access) :
//    'sequence' : chaîne de mini-jeux. Le 1er est ouvert ; chaque jeu ouvre le
//                 SUIVANT quand le précédent a UNLOCK_STARS ★ (parties à 100%).
//                 Bâcler n'ouvre RIEN — le déblocage se mérite ; l'aide passe par
//                 des explications/indices DANS le jeu, jamais par un déblocage gratuit.
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
  const UNLOCK_STARS = 2; // 2 parties à 100% sur le jeu précédent pour ouvrir le suivant
                          // (décision Papa Yann 2026-06-01 : le déblocage se mérite).

  const catalog = () => global.MAXPLAY_CATALOG || [];
  const entry = (id) => catalog().find(e => e.id === id) || null;
  const sequence = () => catalog().filter(e => e.access === 'sequence'); // ordonnée
  const S = () => global.Stars;

  function loadUnlocks() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function saveUnlocks(data) { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }

  function isUnlocked(id) {
    const e = entry(id);
    if (!e) return false;
    // Console parent (suivi.html) : { unlockAll:true } ouvre TOUT (jeux + dinos)
    try { if ((JSON.parse(localStorage.getItem('maxplay_admin')) || {}).unlockAll) return true; } catch (e2) {}
    if (e.access === 'free') return true;
    if (e.access === 'code') return !!loadUnlocks()[(e.unlock && e.unlock.bundle) || e.id];
    if (e.access === 'sequence') {
      const seq = sequence();
      const i = seq.findIndex(s => s.id === id);
      if (i <= 0) return true;                       // 1er jeu (ou introuvable) = ouvert
      const prev = seq[i - 1].id;
      return (S() ? S().get(prev) : 0) >= UNLOCK_STARS; // se mérite : 2★ sur le précédent
    }
    return false;
  }

  function lockedReason(id) {
    const e = entry(id);
    if (!e || isUnlocked(id)) return null;
    if (e.access === 'code') return 'code';                // → demander le mot-clé à un adulte
    if (e.access === 'sequence') return 'finish-previous'; // → gagner 2★ au jeu précédent
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

  global.Unlock = { isUnlocked, lockedReason, redeem, all, UNLOCK_STARS };
})(window);
