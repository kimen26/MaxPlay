---
name: kids-ux
description: UX, gratification et systèmes de progression pour MaxPlay. Utiliser pour concevoir des interfaces adaptées à 3-4 ans, des systèmes de récompense sains, des boucles de progression motivantes. Propose des patterns validés avec variantes.
---

# Kids UX & Gratification

## Principes UX non-négociables pour 3-4 ans

- **Zones tap** : minimum 80×80 px, espacement minimum 20 px entre zones
- **Feedback** : visuel + sonore en moins de 200 ms
- **Lisibilité** : texte > 24 px, police arrondie (Nunito, Fredoka One)
- **Navigation** : toujours un bouton "maison" visible, pas de menus imbriqués
- **Audio** : tout texte important est aussi lu à voix haute
- **Pas de timer visible** : crée de l'anxiété

## Patterns de feedback

### Réussite
Animation joyeuse (saut, bounce, étoiles) + son mélodique court (3-5 notes ascendantes)
Options : confettis · bus qui klaxonne · étoiles qui volent · personnage qui danse

### Tentative incorrecte
Oscillation douce de l'élément + note douce descendante (jamais buzzer)
Toujours suivie d'un indice visuel supplémentaire
Options : flèche d'indication · contour lumineux · légère désaturation des mauvaises réponses

### Tap sur décor (zone non-interactive)
Petite réaction amusante pour rendre l'environnement vivant
Options : nuage qui bouge · oiseau qui s'envole · bus qui cligne des yeux
Jamais de son négatif

## Systèmes de progression – options

### Option A : Collection de bus (recommandé)
Chaque mini-jeu terminé débloque un nouveau bus dans une "flotte".
Galerie visuelle satisfaisante à regarder se remplir.
Fort pour Max qui aime les bus.

### Option B : Carte de ville progressive
La ville se dévoile progressivement à mesure que Max joue.
Chaque zone allumée = mini-jeu terminé.
Satisfaisant visuellement, donne un sens de progression global.

### Option C : Étoiles par activité
1-3 étoiles par mini-jeu selon la fluidité.
Simple à comprendre, familier (beaucoup d'apps enfant l'utilisent).
Attention : ne jamais déduire d'étoiles, seulement en ajouter.

### Option D : Badges thématiques
Badges obtenus pour des accomplissements ("Expert des couleurs", "Grand compteur").
Plus long à implémenter, très satisfaisant à moyen terme.

## Structure recommandée d'une session

```
Accueil hub (10 sec) → choix mini-jeu (tap) → intro courte (5-10 sec)
→ gameplay (3-8 min) → victoire célébrée (15-20 sec)
→ récompense débloquée (5 sec) → retour hub
```

## Ce qu'on évite absolument

- Timer visible
- Sons d'échec agressifs (buzzer, alarme)
- Niveaux bloquants sans possibilité de passer
- Score comparatif ou classement
- Mécaniques de frustration (vies limitées, game over)
- Texte sans support audio
- Instructions trop longues avant de jouer
