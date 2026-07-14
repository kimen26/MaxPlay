# 🔒 MJ-13a — Le premier bus — Décisions figées

> Validé Papa Yann **2026-06-02/03** (rollout difficulté — catégorie 🧩 Logique).
> Chaque ligne 🔒 = LOI. ❌ 🔒 = régression interdite.

## Méca (rappel)
Un panneau affiche N bus avec leur temps d'attente → toucher **celui qui arrive en premier** (temps le plus court). 8 manches.

## Contrat de difficulté 🔒
- 🔒 **5 paliers**. Niveau = `Stars.get('mj-13a') + 1`. Charger `catalog.js` + `stars.js`.
- 🔒 Axe = **nombre de bus + écart horaire** :

  | Niveau | Bus | Écart |
  |--------|-----|-------|
  | N1 | 2 | net (≥3 min) |
  | N2 | 3 | net |
  | N3 | 4 | net |
  | N4 | 5 | serré (≥1 min) |
  | N5 | 6 | minutes proches (≥1 min) |

- 🔒 **N1 = 2 bus, écart net** (point d'entrée). ❌ 🔒 ne pas redémarrer à 3-6 bus aléatoires (l'ancien défaut).
- 🔒 **Manche mixte** = 8 questions : 4 au palier courant + 4 plus faciles (mélangées).
- 🔒 Étoile = **manche à 100% sans révélation** (`endSession(score, 8)` + `logAnswer`). maxStars = 5. Retry QcmRetry ; révélation après 3 essais = pas d'étoile.

## Technique 🔒
- 🔒 Bandeau **« Niveau X »** (`#levelbar`). Bus via `busSVG()`.

## Test
`studio/minijeux/tests/mj-13a.spec.mjs` — N1 = 2 bus + Niveau 1 + tap gagnant. Vert avant push.

> 🔄 2026-07-14 — DÉCISION PAPA YANN (passage global 3★) : 5 paliers → 3 niveaux (N0=ex-P1-2 · N1=ex-P3 · N2=ex-P4-5), maxStars 5→3 au catalog. Mapping réel : N0=2 bus/écart net · N1=4 bus/écart net · N2=6 bus/écart serré (≥1 min). Les autres lignes 🔒 restent en vigueur.
