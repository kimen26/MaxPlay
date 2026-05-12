# Invariants Narration — Source de Vérité Unique

> **Tout chiffre clé ou règle structurelle vit ICI.** Le reste du projet pointe vers ce fichier.
> Si tu trouves un chiffre divergent ailleurs (ex: "8 versions" dans un kanban) → ce fichier gagne, l'autre est obsolète.

---

## Chiffres clés PROCESS (refonte 2026-05-08)

| Métrique | Valeur | Notes |
|----------|--------|-------|
| Étapes PROCESS | **11** (0 à 10) | Owner / Inputs / Outputs / Critères PASS définis par étape |
| Versions writers (étape 4) | **10** | 2 Claude + 4 Kimi (dont 1 guidé) + 2 DeepSeek + 2 Grok |
| Panel lecteurs (étape 5) | **20** dès STORY-003. Transitoire **6** pour 002 (commencé avant la décision panel 20) |
| Panel re-relecture (étape 9) | **20** dès STORY-003. Transitoire **6** pour 002 |
| Validations auteur obligatoires | **3** : Étape 1 (Pitch), Étape 6 (Sélection), Étape 10 (Canon) |
| Plafond rewrite (étape 7) | **1 cycle max** par histoire |
| SLA "EN ATTENTE AUTEUR" | **3 jours** → au-delà : kanban 🔴 BLOQUÉ |
| Max tickets actifs PMO | **3** simultanés |

---

## Casting figé (V1 Christ FR)

10 persos (9 + Wex), figé 2026-04-24, ajusté 2026-05-05.

| Type | Prénom complet | Diminutif | Sexe |
|------|----------------|-----------|------|
| 0 hors-système | Wex | Wex | invariant cross-culture |
| 1 Perfectionniste | Melchisédech | Melki | M |
| 2 Aidant | Marie | Mimi | F |
| 3 Performeur | Paul | Polo | M |
| 4 Individualiste | Madeleine | Madie | F |
| 5 Observateur | Luc | Lulu | M |
| 6 Loyal | Pierre | Pierrot | M |
| 7 Enthousiaste | Raphaëlle | Raph | F |
| 8 Challenger | Judith | Juju | F |
| 9 Pacificateur | Noé | Nono | M |

Bilan : **4F / 5M + Wex**. Source : [`../personnages/INDEX.md`](../personnages/INDEX.md).

---

## Voice IDs ElevenLabs (état 2026-05-12)

| Perso | Voice ID | Méthodo | Naming bibliothèque |
|-------|----------|---------|---------------------|
| Wex | `G54e8CyYslC2Y4ZupTlg` | v24 | Lumi Wex Héros |
| Polo | `5wcx0KzRnrP48I5RCVD8` | v2 | Lumi Polo Fier |
| Melki | `sWfumkYiI1QERQ5INqRQ` | v1 | Lumi Melki Précis |
| Pierrot | `ukIKjXqbiGGkqIz0SW5c` | pré-v24 | (conservé) |
| Raph | `Te5RKnm9ebwdEvZ1S5pS` | — | — |
| Lulu | `1XwHANMW4m2pxt7buPmQ` | filtre cumulatif vaincu | Lumi Lulu Léger |
| Nono | `f3w48h8ngnWWnhO9XGb3` | v1 (companion) | Lumi Nono Paisible |
| Mimi, Madie, Juju | ⏳ à créer (filles) | — | — |

Détail complet : [`../personnages/voix-meta/_VOICE-IDS-CASTING.md`](../personnages/voix-meta/_VOICE-IDS-CASTING.md).

---

## Patte narrative

**B+D+C** : Kishōtenketsu + tranche de vie + cycle.

Source : [`../equipe/patte-narrative-maxplay.md`](../equipe/patte-narrative-maxplay.md).

---

## Règles d'or structurelles

1. **Casting V1 figé** — ne pas inventer de prénoms hors casting
2. **Surnoms 4/5 du temps** dans les histoires — prénom complet réservé au solennel
3. **Ennéatype DILUÉ** — jamais nommé explicitement dans le texte
4. **Univers IMPLICITE** — pas d'exposition, montrer en touches légères
5. **Parents hors-scène** — jamais d'adulte sauveur, l'histoire se résout entre enfants
6. **Pas de morale** — la promesse du titre se tient, le lecteur infère
7. **Onomatopées 0 ou 1** par histoire, choisie dans `cross-culture/onomatopees/catalogue-onomatopees.md`
8. **Writer du top 1 garde la main au rewrite** (règle 2026-05-08) — pas de greffes externes
9. **Conservation matière fabrication** — `versions-writers/`, `lecteurs-temoins/`, etc. NE SONT JAMAIS SUPPRIMÉS après canonisation
10. **Zéro négation dans Voice Design ElevenLabs** (AP#16)

---

## Histoires (état production)

| # | Titre | Statut | Owner courant |
|---|-------|--------|---------------|
| 001 | Le Pont Cassé | ✅ canon (refonte 2026-05-08) | — |
| 002 | Libellule Résonance | 🟢 étape 4 prête à lancer (Q-ouvertes auteur) | Directeur |
| 003+ | À démarrer | ⚪ — | — |

---

## Comment utiliser ce fichier

**Quand consulter** :
- Avant d'écrire un chiffre clé dans un kanban / pitch / brief
- Avant de valider une décision qui touche au PROCESS
- En cas de doute "c'est 6 ou 20 lecteurs ?"

**Quand mettre à jour** :
- Toute décision qui modifie un chiffre clé → MAJ ici **avant** de propager ailleurs
- Toute création d'un voice_id → ajouter ici **et** dans `_VOICE-IDS-CASTING.md`
- Toute évolution casting → ici + `personnages/INDEX.md`

**Règle** : ce fichier est court par design (~100 lignes). Si tu veux ajouter une section longue → la mettre ailleurs et pointer ici.
