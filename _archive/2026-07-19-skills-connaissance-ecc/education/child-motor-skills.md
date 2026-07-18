---
name: child-motor-skills
description: Motricité fine et contrôles pour MaxPlay. Utiliser pour calibrer les tailles de zones interactives, choisir les gestes appropriés par âge, planifier la progression manette. Basé sur études développementales (Piaget, Vygotski, Hourcade 2013, AAP).
---

# Motricité fine enfant 3-5 ans – Contrôles & Interaction tactile

## Développement moteur 3-4 ans (Max)

À 3.5-4 ans, l'enfant est en **période préopératoire** (Piaget). La motricité fine est en développement actif :
- Préhension en pince mature (~3 ans) mais précision limitée
- Coordination œil-main : bonne pour mouvements larges, imprécise pour cibles petites
- Inhibition motrice immature : les gestes "dépassent" la cible (overshoot)
- Attention soutenue : 5-10 min max sur une tâche

## Tableau des gestes tactiles par âge de maîtrise

| Geste | Âge de maîtrise | Notes pour MaxPlay |
|-------|----------------|-------------------|
| **Tap simple** | 2-2.5 ans | ✅ OK maintenant — geste naturel |
| **Tap sur cible ≥ 80px** | 3 ans | ✅ Notre MIN_TAP_SIZE = 80px est bon |
| **Tap sur cible 48-80px** | 4-4.5 ans | ⚠️ Attendre Phase 2 |
| **Drag court (< 150px)** | 3.5-4 ans | ⚠️ Possible mais frustrant — Phase 2 |
| **Drag long / précis** | 5-5.5 ans | ❌ Trop tôt |
| **Swipe directionnel** | 4-4.5 ans | ⚠️ Phase 2 |
| **Double-tap** | 4-4.5 ans | ⚠️ Confusant, éviter |
| **Pinch / zoom** | 4.5-5 ans | ❌ Hors scope |
| **Multi-touch** | 5+ ans | ❌ Hors scope |

Sources : Hourcade et al. (2013) *Preschool children's use of touch screens* ; Apple HIG Child guidelines ; Google Material Design accessibility

## Recommandations taille zones interactives

| Recommandation | Valeur | Source |
|----------------|--------|--------|
| Min tap zone enfant 3-4 ans | **80×80 px** | Hourcade 2013 |
| Recommandé Apple HIG (adulte) | 44×44 pt | Apple |
| Recommandé Android (adulte) | 48×48 dp | Google |
| **MaxPlay MIN_TAP_SIZE actuel** | **80px** | ✅ Correct |
| Espacement minimum entre zones | **20px** | Éviter fausses frappes |
| Zone "confortable" enfant 3-4 ans | 96-120px | Idéal si possible |

→ **MIN_TAP_SIZE = 80px est le minimum absolu. Viser 96px quand possible.**

## Progression contrôles recommandée pour Max

### Phase 0 – Maintenant (3.5-4 ans) : TAP ONLY
- Tap sur gros objets (≥ 80px)
- Un seul type d'interaction par écran
- Réponse immédiate (< 200ms) — indispensable
- Pas de drag, pas de swipe
- Interface statique ou animations lentes

### Phase 1 – 4-4.5 ans : TAP + DRAG SIMPLE
- Drag court sur axe unique (gauche/droite uniquement)
- Swipe directionnel simple
- Cibles peuvent descendre à 64px
- D-pad manette : gauche/droite seulement

### Phase 2 – 4.5-5 ans : MOUVEMENT LIBRE
- Drag toutes directions
- D-pad 4 directions
- 1 bouton action (A sur manette)
- Cibles à 48px acceptables

### Phase 3 – 5-5.5 ans : COMPLEXITÉ
- D-pad + 2 boutons
- Interactions simultanées légères
- Temps limités acceptables (avec feedback visuel)

## Application directe à la SandboxScene

```typescript
// config.ts – valeurs calibrées pour Max 3.5 ans
export const MIN_TAP_SIZE = 80;         // minimum absolu
export const IDEAL_TAP_SIZE = 96;       // idéal
export const MIN_TAP_SPACING = 20;      // entre deux zones
export const MAX_DRAG_DISTANCE = 150;   // Phase 1 uniquement
export const FEEDBACK_MAX_MS = 200;     // réponse visuelle obligatoire
```

## Signaux d'alerte pendant le jeu

| Signal | Interprétation | Action |
|--------|---------------|--------|
| Max tape à côté > 3 fois | Zone trop petite | Augmenter à 96-120px |
| Max abandonne après 30 sec | Trop difficile | Simplifier le geste |
| Max répond en < 0.5 sec sans regarder | Trop facile | Enrichir l'interaction |
| Max regarde ses doigts en tapant | Normal à 3-4 ans | Ne pas s'inquiéter |

## Note sur la manette 8BitDo FC30

Max n'a jamais touché de manette. Ordre d'introduction recommandé :
1. Laisser Max tenir la manette sans but (découverte libre)
2. Un seul bouton A → interaction simple
3. D-pad gauche/droite seulement
4. D-pad 4 directions
5. D-pad + A (standard Phase 2)

**Ne jamais forcer.** Si Max préfère le tap, c'est parfait.
