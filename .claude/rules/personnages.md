---
paths:
  - "narration/personnages/**"
  - "narration/cross-culture/castings-nationaux/**"
  - "narration/cross-culture/prenoms/**"
---

# Personnages — règles auto-chargées

> Chargé automatiquement dès que Claude touche un fichier perso/casting/prénom.
> Source de vérité : [`narration/personnages/INDEX.md`](../../narration/personnages/INDEX.md) + [`narration/personnages/lookup.yml`](../../narration/personnages/lookup.yml).

## Casting V1 « Christ » FIGÉ (2026-04-24, ajusté 2026-05-05)

**4F / 5M + Wex.**

| Type | Prénom FR | Genre | Notes |
|------|-----------|-------|-------|
| Wex | Wex | — | **Hors-système, invariant cross-culture** |
| Type 1 | Melki | M | Melchisédech |
| Type 2 | Mimi | F | Marie |
| Type 3 | Dadou | M | David (rename 2026-05-13, ex-Polo/Paul) |
| Type 4 | Madie | F | Madeleine (ajusté 2026-05-05, anciennement "Élia") |
| Type 5 | Lulu | M | Luc |
| Type 6 | Pierrot | M | Pierre |
| Type 7 | Raph | F | Raphaëlle |
| Type 8 | Juju | F | Judith |
| Type 9 | Nono | M | Noé |

**Règle absolue** : ne JAMAIS inventer un prénom. Toujours résoudre via [`personnages/lookup.yml`](../../narration/personnages/lookup.yml).

## Gabarit figé (2026-05-15)

**5 fichiers obligatoires par dossier** (standard ou Wex) — gravé [`narration/personnages/INDEX.md`](../../narration/personnages/INDEX.md) § Gabarit figé.

### Standard (`type-01/` à `type-09/`)
1. **README.md** — En-tête + tableau 4 fichiers + Sensibilité/Astre/Type ennéa + refactor note
2. **enneagramme.md** — Motivation/comportements/santé + note auteur
3. **personnage.md** — Portrait/phrases/gestes/paires/garde-fou/relations 8×8
4. **alive.md** — Sensibilité/astre/couleur/tags writer/langage/onomatopées/mémoire
5. **voix.md** — Voice_id/signature 4 couches/TTS params/prompt/description publique

### Variante Wex
Mêmes 5 fichiers, variantes : README (Statut/Power/hors-système) · enneagramme (ABSENT) · personnage (+ Cercle/Vision/Arcs) · alive (7 tics note) · voix (7 tics tableau).

**Détail complet** : [`narration/personnages/INDEX.md`](../../narration/personnages/INDEX.md) § Gabarit figé.

## Règles d'écriture des persos

### Notation interne
Convention `TypeN/TitiN @origine` dans les brouillons (avant lookup) — voir [`personnages/notation-types.md`](../../narration/personnages/notation-types.md).
Dans le texte canon → prénom final résolu via lookup.

### Surnoms 4/5 du temps
- **80 % surnoms** (Mimi, Dadou, Nono, Raph, Juju, Madie, Melki, Lulu, Pierrot) — c'est le défaut
- **20 % prénoms complets** réservés au formel (présentations, moments solennels, adultes)
- Source : `feedback_narration_surnoms.md`

### Univers IMPLICITE (gravée)
- **JAMAIS** nommer un ennéatype dans le texte ("Pierrot est un Six")
- **JAMAIS** nommer un système ("Conscience Créative", "Totems Janus") sauf dans `univers/`
- Ennéatypes DILUÉS dans le comportement, pas étiquetés

### Wex
- **Hors-système** : pas un ennéatype, pas un personnage central, observateur quantique
- **Invariant cross-culture** : Wex s'appelle Wex partout. Pas de variante par pays.
- Rôle : catalyseur/relieur, pas protagoniste actif

## Cross-culture

### Casting FR
[`narration/cross-culture/castings-nationaux/fr/`](../../narration/cross-culture/castings-nationaux/fr/) — figé (V1).

### Castings nationaux à venir
JP, BR, HE, SW, etc. — voir [`cross-culture/castings-nationaux/INDEX.md`](../../narration/cross-culture/castings-nationaux/INDEX.md).

### Réserve prénoms
218 prénoms qualifiés / 30 cultures — [`cross-culture/prenoms/INDEX.md`](../../narration/cross-culture/prenoms/INDEX.md).

### Anti-pattern
- ❌ "Salo" (seul rejeté validé) — ne pas extrapoler depuis critiques IA externes
- ❌ Variante de "Wex" par culture — Wex est invariant
- ❌ Casting figé modifié sans validation auteur explicite

## Théorie ennéagramme

Source : [`personnages/theorie/enneagramme/`](../../narration/personnages/theorie/enneagramme/README.md) (Chabreuil).
- 9 fiches types incarnées : [`personnages/type-NN/`](../../narration/personnages/)
- Interactions 9×9 : [`theorie/enneagramme/interactions-9x9.md`](../../narration/personnages/theorie/enneagramme/interactions-9x9.md)
- Émotions universelles : [`theorie/enneagramme/emotions-universelles.md`](../../narration/personnages/theorie/enneagramme/emotions-universelles.md)

## Boussole pédagogie 4-5 ans

Lecture **OBLIGATOIRE** avant brainstorm/plan/brief :
[`personnages/theorie/pedagogie-enfance/`](../../narration/personnages/theorie/pedagogie-enfance/README.md)

## Voix-meta (production audio)

Casting de voix ElevenLabs centralisé : [`personnages/voix-meta/_VOICE-IDS-CASTING.md`](../../narration/personnages/voix-meta/_VOICE-IDS-CASTING.md) — méthodo v24 (figée 2026-05-11).
Narrateurs H/F + cheatsheet didascalies + preview-texts + alias-tags catalog.

## Anti-patterns sur personnages

- ❌ Inventer un prénom (toujours lookup obligatoire)
- ❌ Nommer un ennéatype dans le texte
- ❌ Variante de Wex par culture
- ❌ Casting modifié sans validation auteur
- ❌ Surnom utilisé < 80 % du temps (sauf moment formel)
- ❌ Briefs sans lecture pédagogie 4-5 + ennéatypes pertinents

---

_Refonte 2026-05-13 : règles casting/persos extraites pour auto-chargement path-scoped._
