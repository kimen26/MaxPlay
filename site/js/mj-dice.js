/*
 * MJDice — moteur partagé "constellation de dé" pour mini-jeux MaxPlay.
 * Rôle    : factoriser la logique dé/dominos commune à MJ-43 (Remplis les
 *           caisses !) et MJ-45 (Le bus qui se remplit) : disposition des
 *           pips en constellation canonique, composition d'une cible en
 *           parts 1..6, et les deux solveurs anti-deadlock utilisés par
 *           chaque jeu (le rendu SVG des pips — dino-ombres pour MJ-43,
 *           silhouettes passagers pour MJ-45 — reste dans chaque fichier,
 *           injecté ici par callback).
 * Jeux client : site/mj-43.html, site/mj-45.html.
 * Invariants  :
 *   - pipLayout() ne retourne QUE des positions canoniques de dé (1 centre,
 *     2 diagonale, 6 double-colonne, etc.) — jamais d'éparpillement aléatoire
 *     (préserve le subitizing, ligne 🔒 des figées mj-43/mj-45).
 *   - compose(target, k) garantit une somme EXACTE de k parts dans 1..6.
 *   - canSolve()/canReach() garantissent qu'un round généré ou un coup joué
 *     reste soluble (anti-deadlock, zéro pénalité punitive : refus doux
 *     géré par le jeu appelant, pas ici).
 */
(function (global) {
  'use strict';

  // Positions canoniques des pips d'un dé (grille 0..100). MJ-43 et MJ-45
  // utilisaient chacun une variante à peine différente du layout à 2 pips
  // (28/72 vs 30/70) — écart cosmétique sans conséquence pédagogique, on
  // unifie sur 28/72 (valeur MJ-43, legerement plus excentrée = meilleure
  // séparation visuelle des 2 silhouettes).
  const PIP_LAYOUT = {
    1: [[50, 50]],
    2: [[28, 28], [72, 72]],
    3: [[26, 26], [50, 50], [74, 74]],
    4: [[30, 30], [70, 30], [30, 70], [70, 70]],
    5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]],
    6: [[26, 21], [74, 21], [26, 50], [74, 50], [26, 79], [74, 79]],
  };

  function pipLayout(val) {
    return PIP_LAYOUT[val] || [];
  }

  function randInt(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Décompose `target` en `k` parts (chacune 1..min(6,target)), somme = target.
  // Identique dans MJ-43 et MJ-45 (byte-for-byte avant extraction).
  function compose(target, k) {
    const maxPart = Math.min(6, target);
    k = Math.max(1, Math.min(k, target));
    while (k * maxPart < target) k++;
    const parts = new Array(k).fill(1);
    let rem = target - k;
    let guard = 0;
    while (rem > 0 && guard < 500) {
      const i = Math.floor(Math.random() * k);
      if (parts[i] < maxPart) { parts[i]++; rem--; }
      guard++;
    }
    return parts;
  }

  // ── Solveur MJ-43 : partition N-way (plusieurs caisses ouvertes) ────────
  // Un placement est légal seulement s'il laisse le round SOLUBLE : les
  // jetons restants doivent pouvoir remplir exactement tous les restes de
  // caisses. Backtracking trivial (≤12 jetons). Cas de non-régression gravé
  // dans mj-43.md : caisses 5/5, jetons {3,2,4,1}.
  function canSolve(residuals, vals) {
    vals = vals.slice().sort((a, b) => b - a); // décroissant = échec rapide
    const rec = (i) => {
      if (i === vals.length) return residuals.every(r => r === 0);
      const v = vals[i];
      const tried = new Set(); // ne pas re-tester deux caisses au même reste
      for (let j = 0; j < residuals.length; j++) {
        if (residuals[j] >= v && !tried.has(residuals[j])) {
          tried.add(residuals[j]);
          residuals[j] -= v;
          if (rec(i + 1)) { residuals[j] += v; return true; }
          residuals[j] += v;
        }
      }
      return false;
    };
    return rec(0);
  }

  // ── Solveur MJ-45 : atteignabilité simple (une seule cible mouvante) ────
  // Un sous-ensemble de `vals` peut-il sommer exactement à `rest` ?
  // Bitmask BigInt (bit i = somme i atteignable). Suffisant ici car MJ-45
  // n'a qu'une cible active à la fois (contrairement aux N caisses de
  // MJ-43) — les deux solveurs répondent à des topologies différentes,
  // volontairement gardés distincts plutôt qu'unifiés de force.
  function canReach(rest, vals) {
    if (rest === 0) return true;
    if (rest < 0) return false;
    let reachable = 1n;
    for (const v of vals) reachable |= (reachable << BigInt(v));
    return ((reachable >> BigInt(rest)) & 1n) === 1n;
  }

  global.MJDice = {
    pipLayout,
    compose,
    canSolve,
    canReach,
    randInt,
    shuffle,
  };
})(window);
