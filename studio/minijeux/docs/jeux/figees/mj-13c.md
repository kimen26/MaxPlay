# 🔒 MJ-13c — Combien avant ? — Décisions figées

> Validé Papa Yann **2026-06-02/03** (rollout difficulté — catégorie 🔢 Compter).
> Chaque ligne 🔒 fait **LOI**. Toute ligne ❌ 🔒 = régression interdite.

## Méca (rappel)
Un panneau d'arrêt affiche N bus avec leur temps d'attente. Question : **combien de bus passent AVANT** le bus demandé ? Boutons 0..N-1. **8 manches**.

## Contrat de difficulté 🔒
- 🔒 **5 paliers**. Niveau = `Stars.get('mj-13c') + 1`. Charger `catalog.js` + `stars.js` avant l'inline.
- 🔒 Axe = **taille de la file** (`LV_FILE = [3,5,6,8,10]`) :

  | Niveau | Bus sur le panneau |
  |--------|--------------------|
  | N1 | 3 |
  | N2 | 5 |
  | N3 | 6 |
  | N4 | 8 |
  | N5 | 10 |

- 🔒 **N1 = 3 bus** (point d'entrée 3,5 ans). ❌ 🔒 ne pas redémarrer à 4-6 bus aléatoires (l'ancien défaut).
- 🔒 **Manche mixte** = 8 questions : **4 au palier courant + 4 tirées sur les paliers inférieurs** (mélangées). Niveau 1 → 8 faciles.
- 🔒 Boutons réponses = **0..(taille de file − 1)** (jamais plafonnés à 5 — sinon la bonne réponse peut manquer).
- 🔒 Étoile = **manche à 100% sans révélation** (`endSession(score, 8)` + `logAnswer` correct/reveal → dérivation). maxStars = 5.
- 🔒 Sur erreur : **indice de méthode** ("Compte les bus AVANT… un par un"), **jamais la réponse**. Révélation seulement après 3 essais (QcmRetry) = pas d'étoile.

## Technique 🔒
- 🔒 Bandeau **« Niveau X »** dans le header.
- 🔒 Bus via `busSVG()` ; couleurs via les lignes (jamais hex en dur ailleurs).

## Test
`game/tests/mj-13c.spec.mjs` — N1 = 3 bus + réponse correcte → Bravo. Vert avant push.
