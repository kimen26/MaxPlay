---
name: État narration MaxPlay
description: État condensé du pôle narration — histoires, casting, workflow, agents à appeler
type: project
---

> Charger ce fichier au démarrage de toute session NARRATION. Puis lire `narration/pmo/INDEX.md`.

## État histoires (2026-04-29)

| # | Titre | Statut | Persos |
|---|-------|--------|--------|
| 001 | Le Pont Cassé | ✅ canon | Wex · Melki · Juju |
| 002 | Le Rire qui reste | ✅ canon | Wex · Nono · Dadou |
| 003 | La Confidence | 🟡 workshop | Wex · Madie · Raph |
| 004 | Cartable-à-trou | ⚪ à faire | Dadou · Lulu · Mimi · Wex |
| 005 | Le Mardi | ⚪ à faire | Wex · Pierrot · Melki |
| 006 | Sept à rien | ⚪ à faire | Juju · Mimi · Wex |

**Série "La Parole"** : thème poids des mots — brief dans `archive/inputs-historiques/serie-parole-briefs.md`
**Axes en stock** : 15 (H-01 à H-10 + T-01 à T-05) → `stories/axes-histoires-en-stock.md`
**Prochaine action PMO** : canoniser STORY-003 ou démarrer STORY-004

## Casting V1 figé (2026-04-24)

| Surnom | Prénom complet | Type | Sensibilité |
|--------|---------------|------|-------------|
| **Wex** | Wex | Héros hors-système | — |
| **Melki** | Melchisédech | #1 Perfectionniste | Minéraux |
| **Mimi** | Marie (F) | #2 Aidant | Eau |
| **Dadou** | David | #3 Performeur | Forces |
| **Madie** | Madeleine | #4 Individualiste | Fréquence |
| **Lulu** | Luc | #5 Observateur | Quantique |
| **Pierrot** | Pierre | #6 Loyal | Animaux |
| **Raph** | Raphaëlle (F) | #7 Enthousiaste | Cosmos |
| **Juju** | Judith (F) | #8 Challenger | Plantes |
| **Nono** | Noé | #9 Pacificateur | Vibration |

**Règle prénoms** : diminutif 4/5 du temps · prénom complet = moments formels/solennels

## Règles narratives absolues

- Univers **implicite** : jamais nommé dans les histoires
- Ennéatypes **dilués** : lisibles dans 3-4 micro-réactions, jamais étiquetés
- Structure **Kishōtenketsu** (sans antagoniste)
- Longueur : 400-700 mots · ton sobre · conclusion simple
- Jamais supprimer de matière narrative sans question explicite à l'utilisateur

## Workflow narration

```
INBOX.md → Conseiller → Architecte (Plan) → 4 Writers → Lecteurs témoins
→ Directeur (sélection + brief) → Rewrite → GateKeeper PASS → stories/<NNN>/texte.md
```

## Fichiers clés narration

| Fichier | Rôle |
|---------|------|
| `narration/pmo/INDEX.md` | **État instantané + reprise après reboot** |
| `narration/INDEX.md` | Carte complète projet narration |
| `narration/personnages/INDEX.md` | Casting + tableau des 9 + Wex |
| `narration/univers/INDEX.md` | Carte du monde |
| `narration/stories/INDEX.md` | Catalogue récits |
| `narration/equipe/ORGANIGRAMME.md` | Qui fait quoi — avant d'appeler un agent |

## Agents à appeler selon la tâche

| Tâche | Agent |
|-------|-------|
| Brainstorm / challenger une idée | `narration-conseiller` (Opus) |
| Créer un plan d'histoire | `narration-architecte` (Sonnet) |
| Écrire une version (angle D libre) | `narration-writer-claude-libre` (Sonnet) |
| Sélectionner + rewriter | `narration` (Opus) |
| Validation finale PASS/FAIL | `narration-gatekeeper` (Haiku) |
| Gestion PMO / tickets | `narration-pmo` (Haiku) |
| Questions rapides | `quick` (Haiku) |
