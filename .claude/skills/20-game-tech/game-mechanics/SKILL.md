---
name: game-mechanics
description: Concevoir des mécaniques de jeu adaptées aux enfants de 3-5 ans pour MaxPlay. Designer mini-jeux, boucles de gameplay, systèmes de difficulté adaptative, interactions tactiles.
triggers:
  - mécanique jeu
  - mini-jeu
  - game design enfants
  - interaction tactile
  - difficulté adaptative
  - 3-5 ans gameplay
---

# Game Mechanics – 3-5 ans

## Contraintes développementales de l'âge

| Capacité | 3 ans | 4-5 ans | Impact design |
|----------|-------|---------|---------------|
| **Motricité** | Gros taps OK | Drag court OK | Précision millimétrique NON |
| **Attention** | 3-5 min | 5-10 min | Activités courtes, variées |
| **Mémoire de travail** | 2 éléments | 2-3 éléments | Simplicité des règles |
| **Feedback** | Immédiat | Immédiat | < 200ms, visible ET audible |

---

## Catalogue de mécaniques validées

### Matching / Association
Associer deux éléments visuellement liés.

**Options** : drag-and-drop · tap séquentiel · glisser dans zone  
**Complexité** : 2 paires → 6 paires  
**Exemple** : Associer bus avec leur arrêt de couleur

### Tri / Catégorisation
Classer des objets dans des cases par couleur, forme, taille.

**Options** : drag vers case · tap sélection puis destination · conveyor belt  
**Complexité** : 2 catégories → 5 catégories

### Séquence / Ordre
Remettre des éléments dans le bon ordre.

**Options** : tap dans l'ordre · drag pour réarranger · suivre un chemin tracé  
**Complexité** : 3 éléments → 7 éléments

### Exploration / Découverte
Tapper sur des éléments pour les révéler ou déclencher une réaction.

**Caractéristiques** : Pas de bon/mauvais — curiosité récompensée  
**Usage** : Introduire univers, personnages, concepts

### Conduite / Navigation simple
Diriger un véhicule sur un trajet prédéfini.

**Options** : tap gauche/droite · swipe direction · autorun + obstacles  
**Complexité** : chemin droit → carrefours → choix d'itinéraire

### Complétion / Construction
Assembler des pièces pour former quelque chose.

**Options** : puzzle simple · placer éléments sur plan · relier des points  
**Complexité** : 3 pièces → pièces orientables

---

## Règles de design

- **1 seule mécanique principale** par mini-jeu
- **Toujours une version "aide"** avec indices visuels (flèches, contours lumineux)
- **Jamais de timer visible** (stress inutile)
- **Mauvaise réponse = indice supplémentaire**, jamais de punition
- **Difficulté adaptative automatique** : 3 réussites = +1 complexité

---

## Format de proposition d'un mini-jeu

```markdown
## Nom du mini-jeu

### Objectif pédagogique
Ce que l'enfant apprend (pas juste "s'amuser")

### Mécanique principale
[Matching / Tri / Séquence / Exploration / Conduite / Complétion]

### Variantes possibles
- A) Version facile : ...
- B) Version standard : ...
- C) Version difficile : ...

### Interaction
[Drag / Tap / Swipe / Combinaison]

### Feedback réussite
[Visuel + sonore, durée, intensité]

### Feedback tentative
[Encouragement, indice, pas de punition]

### Durée estimée
[X minutes]

### Dépendances assets
[Liste des sprites/sons nécessaires]
```

---

*Skill game-mechanics — Mécaniques de jeu pour enfants 3-5 ans*
