---
name: game-mechanics
description: Concevoir des mécaniques de jeu adaptées aux enfants de 3-5 ans pour MaxPlay. Utiliser pour designer mini-jeux, boucles de gameplay, systèmes de difficulté adaptative, interactions tactiles. Présente plusieurs options avec pros/cons – ne tranche pas à la place du designer.
---

# Game Mechanics – 3-5 ans

## Contraintes développementales de l'âge

**Motricité** : gros taps OK, drag court OK, précision millimétrique NON
**Attention** : 3-5 min par activité à 3 ans, 5-10 min à 4-5 ans
**Mémoire de travail** : 2-3 éléments simultanément maximum
**Feedback** : doit être immédiat (< 200ms), visible ET audible

## Catalogue de mécaniques validées pour 3-5 ans

### Matching / Association
Associer deux éléments visuellement liés.
Options d'implémentation : drag-and-drop · tap séquentiel · glisser dans zone
Complexité : facile → difficile selon le nombre de paires (2 → 6)

### Tri / Catégorisation
Classer des objets dans des cases par couleur, forme, taille.
Options : drag vers case · tap pour sélectionner puis tap destination · conveyor belt
Complexité : 2 catégories → 5 catégories

### Séquence / Ordre
Remettre des éléments dans le bon ordre.
Options : tap dans l'ordre · drag pour réarranger · suivre un chemin tracé
Complexité : 3 éléments → 7 éléments

### Exploration / Découverte
Tapper sur des éléments pour les révéler ou déclencher une réaction.
Pas de bon/mauvais – juste de la curiosité récompensée.
Idéal pour introduire un univers ou des personnages.

### Conduite / Navigation simple
Diriger un véhicule sur un trajet prédéfini.
Options : tap gauche/droite · swipe direction · autorun avec obstacles à esquiver
Complexité : chemin droit → carrefours → choix d'itinéraire

### Complétion / Construction
Assembler des pièces pour former quelque chose.
Options : puzzle simple · placer des éléments sur un plan · relier des points
Complexité : 3 pièces → pièces orientables

## Règles de design

- 1 seule mécanique principale par mini-jeu
- Toujours une version "aide" avec indices visuels (flèches, contours lumineux)
- Jamais de timer visible
- Mauvaise réponse = indice supplémentaire, jamais de punition
- La difficulté s'adapte automatiquement (3 réussites = +1 complexité)

## Format de proposition d'un mini-jeu

```
## Nom
Objectif pédagogique : ...
Mécanique principale : ...
Variantes possibles : A) ... B) ... C) ...
Interaction : ...
Feedback réussite : ...
Feedback tentative : ...
Durée estimée : ...
Dépendances assets : ...
```
