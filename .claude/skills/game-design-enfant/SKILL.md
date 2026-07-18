---
name: game-design-enfant
description: "Théorie game design et pédagogie 3-5 ans pour MaxPlay (motricité, gestes par âge, UX enfant, Flow/ZPD/SDT, phonique Ehri, maths CRA, répétition espacée, 10 règles d'or). Charger pour concevoir/calibrer un mini-jeu, choisir un geste, valider un aspect pédagogique. Active sur mots-clés design mini-jeu, difficulté, pédagogie, motricité, gestes tactiles, UX enfant, progression."
---

# Game Design Enfant 3-5 ans — théorie MaxPlay

> **Rôle** : le POURQUOI scientifique derrière les règles gravées. Consolidé 2026-07-19 depuis 4 anciens skills (kids-ux, child-motor-skills, child-pedagogy, game-mechanics — originaux : `_archive/2026-07-19-skills-connaissance-ecc/`).
> **Ce skill ne décide rien** : les décisions produit vivent dans les sources de vérité ci-dessous.

## 🔒 Sources de vérité (pointer, jamais recopier)

| Sujet | Source |
|---|---|
| Standard mini-jeu (5 piliers, billes, célébrations) | `studio/minijeux/docs/STANDARD-MJ.md` |
| Bibliothèque de mécaniques réutilisables (obligatoire avant tout nouveau MJ) | `studio/minijeux/docs/MECANIQUES.md` |
| Décisions figées par jeu | `studio/minijeux/docs/jeux/figees/mj-XX.md` |
| Profil Max à jour (niveaux réels) | `memory/MAX_PROFILE.md` — le profil ci-dessous n'est PAS dupliqué ici |
| Pédagogie appliquée à la narration | `studio/narration/personnages/theorie/pedagogie-enfance/` |
| Système progression V0 (étoiles, déblocage) | mémoire `project_maxplay_v0_grand_public` — décidé, ne plus proposer d'alternatives |

---

## 1. Motricité — ce qu'une main de 3-5 ans sait faire

Période préopératoire (Piaget) : pince mature (~3 ans) mais précision limitée, coordination œil-main bonne sur mouvements larges, **overshoot** (le geste dépasse la cible), attention soutenue 5-10 min.

### Gestes par âge de maîtrise (Hourcade 2013, Apple HIG Child, Material)

| Geste | Maîtrise | Design |
|-------|----------|--------|
| Tap simple | 2-2.5 ans | ✅ toujours OK |
| Tap cible ≥ 80px | 3 ans | ✅ le socle MaxPlay |
| Tap cible 48-80px | 4-4.5 ans | ⚠️ seulement quand l'âge y est |
| Drag court (< 150px) | 3.5-4 ans | ⚠️ possible mais frustrant |
| Swipe directionnel | 4-4.5 ans | ⚠️ |
| Drag long/précis · double-tap | 5+ ans | ❌ |
| Pinch/zoom · multi-touch | 4.5-5+ ans | ❌ hors scope |

### Tailles (rappel du pourquoi — les valeurs gravées sont dans MEMORY/rules)

- **80×80 px = minimum absolu** (Hourcade 2013) ; zone confortable 96-120 px → viser 96 quand possible.
- Espacement ≥ 20 px entre zones (fausses frappes).
- Adulte Apple/Google = 44/48 px : NE PAS s'en servir comme référence enfant.

### Progression contrôles (tap → manette)

Phase 0 tap only (≥80px, 1 interaction/écran) → Phase 1 (4-4.5 ans) drag axe unique, cibles 64px → Phase 2 (4.5-5) drag libre, D-pad 4 dir, 1 bouton, cibles 48px → Phase 3 (5+) D-pad + 2 boutons, temps limités tolérés. Détail manette : skill `phaser-tech` §gamepad.

### Signaux d'alerte en observation de jeu

| Signal | Lecture | Action |
|--------|---------|--------|
| Tape à côté > 3 fois | Zone trop petite | 96-120px |
| Abandon après 30 s | Trop difficile | Simplifier le geste |
| Répond < 0.5 s sans regarder | Trop facile | Enrichir |
| Regarde ses doigts en tapant | Normal 3-4 ans | Rien |

---

## 2. UX enfant — non-négociables et feedback

Les non-négociables (zones 80px, feedback < 200 ms visuel+sonore, texte > 24 px police arrondie, tout texte lu à voix haute, bouton maison visible, **pas de timer visible**, zéro pénalité punitive) sont **gravés** dans MEMORY + STANDARD-MJ. Ici, le raisonnement feedback :

- **Réussite** : animation joyeuse + son mélodique court ascendant (3-5 notes).
- **Tentative incorrecte** : oscillation douce + note descendante douce (jamais buzzer agressif), TOUJOURS suivie d'un indice supplémentaire — l'erreur enseigne.
- **Tap sur décor** : petite réaction amusante (monde vivant), jamais de son négatif.
- **À bannir** : timer visible, sons d'échec agressifs, niveaux bloquants, score comparatif, vies limitées/game over, texte sans audio, consignes longues avant de jouer.

Structure de session type : hub (10 s) → choix (tap) → intro courte (5-10 s) → gameplay 3-8 min → victoire célébrée (15-20 s) → récompense → hub.

---

## 3. Pédagogie — psychologie de l'apprentissage

### Zone Proximale de Développement (Vygotski) + Flow (Csikszentmihalyi)
Le sweet spot = légèrement au-dessus du niveau actuel. Trop facile → ennui (réponse < 1 s sans regarder) ; trop dur → anxiété (> 3 échecs même item, abandon). Signes de flow 3-6 ans : absorption, perte du temps, répétition spontanée, résistance à l'interruption → ne pas interrompre, monter la difficulté **incrémentalement**.

### SDT — motivation intrinsèque (Ryan & Deci)
1. **Compétence** : sentir la progression (feedback positif, difficulté adaptative).
2. **Autonomie** : choix structuré (« Bus ou Dino ? »).
3. **Relation** : personnages attachants, co-jeu parent/enfant.
⚠️ **Récompense promise tue la motivation intrinsèque** → récompenses SURPRISES (découverte), jamais promesses.

### Répétition espacée version enfant (≠ Anki)
Re-rencontres naturelles, contextes variés : même concept sous d'autres peaux (compter bus rouges → arrêts → passagers). Protocole : même jour → lendemain → 3-4 jours → 1 semaine.

### Difficultés désirables (Bjork)
Interleaving dès 3 ans : ABCABC >> AAABBBCCC pour la rétention. Ne pas confondre difficulté qui étire et difficulté qui brise.

### Approches (choisir selon contexte)
**A. Implicite** (compétence incorporée dans l'action — défaut, ne pas briser l'immersion) · **B. Scaffolding** (aide max qui s'estompe : flèches+contours → contours → autonomie ; pour introduire du neuf) · **C. Répétition variée** (ancrer l'acquis) · **D. Multisensoriel** (toujours visuel + audio + voix ; jamais texte seul).

---

## 4. Domaines — lecture et maths

### Lecture — phase alphabétique (modèle d'Ehri)
Niveau réel actuel : voir `memory/MAX_PROFILE.md`. Mécaniques qui étendent l'attention au mot ENTIER :
lettre manquante milieu/fin (« TR_IN ») · mot qui disparaît de droite à gauche · **son-first** (taper une lettre = entendre son SON « sss », jamais son nom « S ») · rimes (sons finaux) · mot à compléter avec audio.
Séquence Montessori de référence : conscience phonologique (oral) → lettres rugueuses (tracer+son) → alphabet mobile (construire avant écrire) → lecture phonétique CVC.
**Ne jamais corriger frontalement** — l'environnement invite, l'enfant choisit.

### Maths — toujours contextuelles, jamais « des maths »
Calcul caché dans l'histoire (« Le bus 21 coûte 2 tickets, le 14 en coûte 3 — combien pour les deux ? »). Protocole **CRA** : Concret → Représentation → Abstrait (perles/objets avant chiffres seuls). **Faire enseigner** : expliquer à un jouet = récupération active.

---

## 5. Design de session + 10 règles d'or

- Micro-épisodes 3-5 min variés > un long bloc. Attention dirigée ~6-9 min ; auto-initiée 2-3× plus.
- **Jamais finir en pleine difficulté** — toujours clore sur un succès (encodage émotionnel).
- Annoncer la durée + signal avant la fin → transitions sans conflit.

1. Physique d'abord (concret > abstrait) · 2. Son du succès, pas de l'échec · 3. Complimenter le PROCESSUS (« tu as essayé une nouvelle façon ») · 4. Suivre l'enfant, pas le programme · 5. Narration pour tout · 6. Espacement, pas bachotage · 7. Co-apprentissage (adulte présent = meilleur prédicteur) · 8. Choix dans la structure · 9. Sécurité émotionnelle d'abord · 10. Progression visible.

Feedback pédagogique, pas évaluatif : mauvaise réponse → montrer la bonne (« Ce bus va là ! », pas « Faux ! ») ; difficulté adaptative 3 réussites = +1, 3 échecs = -1 ; pas de compteur d'erreurs visible.

---

## 6. Concevoir un mini-jeu — check final

D'abord la bibliothèque : `MECANIQUES.md` impose de proposer 1-2 mécaniques existantes re-skinnées AVANT du code neuf. Familles théoriques si besoin de neuf : matching · tri · séquence · exploration (sans bon/mauvais) · conduite · complétion — **1 seule mécanique principale par jeu**, toujours une variante « aide ».

Questions de validation avant de coder :
1. Quelle compétence précise est exercée ?
2. Compréhensible sans adulte ?
3. Le feedback enseigne-t-il quelque chose ?
4. Progression atteignable en 1-2 essais ?
5. Audio pour tout texte ?
6. Finit-on sur un succès ?
7. Récompense intrinsèque ou promesse extrinsèque ?

### Apps de référence
Khan Academy Kids (progression narrée) · Numberblocks (nombre incarné) · Alphablocks (son avant graphème) · Thinkrolls (difficulté invisible) · Pok Pok (environnement qui invite).

---

_Consolidé 2026-07-19 (nettoyage input-context). Théorie stable ; toute décision produit nouvelle → gravée côté `studio/minijeux/`, pas ici._
