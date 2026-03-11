# Vision – MaxPlay

> Document vivant. Les décisions ouvertes restent ouvertes jusqu'à discussion.
> Quand une décision est prise, noter ici + dans BACKLOG.md.

## Concept

Jeu éducatif pour Max, 3.5-4 ans, passionné de bus.
Apprentissage naturel à travers le jeu, sans jamais que ça ressemble à de l'école.

## Ce qu'on sait déjà (décidé)

- **Stack** : Phaser.js 3 + Vite + TypeScript
- **Cible** : tablet et navigateur desktop, paysage 1024×768
- **Philosophie** : zéro pénalité, feedback toujours positif, sessions 3–8 min
- **Thème** : univers des bus – lignes, couleurs, numéros, itinéraires

---

## Décisions EP-002 (2026-03-08)

### ✅ Direction artistique : Flat design arrondi (Toca Boca / Tayo style)
Formes simples arrondies, couleurs vives IDFM, SVG vectoriel pour les bus (zoomable, dynamique).
Bus en SVG template avec couleur et numéro injectés dynamiquement → 1 fichier pour 20 lignes.
Inspirations : Tayo le petit bus, Toca Boca, Peppa Pig.
**Raison** : lisible par un enfant de 3-4 ans, accessible sans compétences en pixel art, SVG idéal pour bus colorés. (D-004, 2026-03-08)
> Note : une décision "pixel art" avait été notée dans ce doc mais contredisait D-004. Flat design fait foi — corrigé en session 3 (2026-03-10).

### ✅ Univers narratif : Ville réaliste + vie secrète des bus
Les vrais bus de Villejuif le jour (ancrage affectif fort pour Max).
Les bus ont une vie, des émotions, parlent entre eux.
Les deux univers coexistent — pas besoin de trancher hard.

### ✅ Personnage / Point de vue : Immersion dans le bus
Pas un guide extérieur. Max EST avec le bus, dedans ou à ses côtés.
Le bus est le héros — personnalité Tayo (expressif, joyeux, bavard).
Max vit les aventures *avec* lui, pas depuis l'extérieur.
→ Liberté de coder ça comme POV conducteur, ami du bus, ou passager selon le mini-jeu.

### ✅ Progression : Collection de bus + carte de ville
- Chaque mini-jeu terminé débloque un nouveau bus dans la flotte
- La carte de Villejuif se dévoile progressivement (zones s'allument)
- Les deux systèmes se renforcent : bus débloqué = zone de carte allumée

### ❓ Premier mini-jeu : sandbox d'abord – vue dessus GTA1/Pokémon

**Concept validé** : vue dessus 2D (top-down), Max est un personnage qui marche.
- Dans le bus pendant les trajets (dedans, fenêtre qui défile)
- Peut descendre aux arrêts et faire des actions dans la rue
- Monte dans différents bus selon la ligne

**Niveau de complexité** : commencer TRÈS simple.
Max n'a jamais touché une manette. Voir section "Motricité enfant" dans BACKLOG.
- Phase 1 : tap pour avancer vers un bus, tap pour monter
- Phase 2 : drag simple pour diriger
- Phase 3 : mouvements libres + interactions aux arrêts

**Prochaine étape = sandbox** : Max marche sur une rue, un bus arrive, il peut monter.
→ Décision de la mécanique pédagogique après avoir vu ça bouger.

---

## Périmètre v1.0

1. Sandbox de mouvement bus (prototype pour sentir le game feel)
2. Premier mini-jeu (décidé après sandbox)
3. Composant Feedback réutilisable
4. Composant Bus de base avec vraies couleurs
5. Hub dépôt avec 3 slots de mini-jeux
