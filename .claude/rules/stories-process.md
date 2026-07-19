---
paths:
  - "studio/narration/stories/**"
---

# PROCESS militaire NARRATION — règles auto-chargées sur stories/**

> Cette règle est **chargée automatiquement** dès que Claude lit/édite un fichier sous `studio/narration/stories/`.
> Source de vérité complète : [`studio/narration/equipe/PROCESS.md`](../../studio/narration/equipe/PROCESS.md).

## 11 étapes (0 à 10) — owner par étape

| # | Étape | Owner | Output | ✅ valide auteur |
|---|-------|-------|--------|------------------|
| 0 | Dump idée | Auteur | `studio/narration/INBOX.md` | — |
| 1 | Pitch + plan léger (fusion) | `narration-conseiller` | `1-pitch-plan.md` | OUI |
| 2 | **Brainstorm boss** (Phase A) + **Brainstorm équipe** (Phase B) | Phase A : Papa Yann + Conseiller · Phase B : Kimi + DeepSeek + Grok + Conseiller | Phase A : lieu / objet / trio / intention (dans kanban) · Phase B : matière brute briefs | Phase A : OUI (Papa Yann valide) |
| 3 | Briefs | `narration` (Directeur Éditorial) | `3-briefs/{personnages,histoire}.md` (system prompt WexWorld → `_writer-system.md` par arc) | — |
| 4 | **14 versions writers** (calibration multi-modèles v2 — refonte 2026-05-12) | 6 Claude (Opus/Sonnet/Haiku × déf/reco) + 4 Kimi (kimi-reco, kimi-k26-instant, kimi-k26-thinking, kimi-reco-guide) + 2 DeepSeek (déf/reco) + 2 Grok (déf/reco) | `4-versions-writers/*.md` (chacune avec note d'intention en fin de fichier) | — |
| 5 | 20 lecteurs témoins | `narration-lecteur` (10) + `narration-lecteur-dyade` (10) | `5-lecteurs-temoins/*.md` + `5-synthese-lecteurs.md` | — |
| 6 | Sélection top + greffes | `narration` (Directeur) | `6-selection.md` | OUI |
| 7 | Rewrite top 1 | Writer top 1 OU `narration` (si writer défaillant) | `7-rewrite/<llm>-rewrite-v1.md` | — |
| 8 | GateKeeper | `narration-gatekeeper` | `8-gatekeeper-verdict.md` (PASS/corrections rapides) | — |
| 9 | Panel 20 relit le rewrite | 20 lecteurs | `9-relecture-rewrite/` | — |
| 10 | Canon + maj leçons | `narration` + `narration-pmo` | `10-texte.md` (CANON) + maj `equipe/lecons-vivantes.md` | OUI |

> Étape 2 **recréée 2026-05-15** (DEC-PROCESS-002) : Brainstorm boss (Papa Yann + Conseiller) puis Brainstorm équipe (Kimi + DeepSeek + Grok). Comble le trou entre pitch validé et briefs writers.

## Règles MILITAIRES

1. **Préfixes étapes obligatoires** : tout fichier produit dans `stories/<id>/` doit être préfixé `N-` (0, 1, 3-10). Pas de `pitch.md` nu — c'est `1-pitch-plan.md`.
2. **Étape 1 + 3 obligent lecture** :
   - [`studio/narration/personnages/theorie/pedagogie-enfance/`](../../studio/narration/personnages/theorie/pedagogie-enfance/README.md) — boussole 4-5 ans
   - Ennéatypes pertinents de l'histoire
3. **14 writers ≠ 14 textes identiques** — leviers de variance figés dans [`studio/narration/pmo/INVARIANTS.md`](../../studio/narration/pmo/INVARIANTS.md) § *Leviers de variance* :
   - Angle / POV / ouverture / longueur / température
4. **Rewrite plafond** : 1 rewrite max par story. Au-delà → recommencer depuis étape 1 (cause racine à analyser).
5. **GateKeeper ne réécrit pas** : il valide PASS ou liste corrections rapides. Si grosse réécriture nécessaire → retour étape 7.
6. **Canon = source de vérité** : `10-texte.md` figé après validation. Toute évolution = nouvelle story ou archive `_archive/`.
7. **Note d'intention writer** : chaque writer DOIT joindre une note d'intention créative **en fin de son fichier writer** (après séparateur `---`), expliquant ses choix créatifs. Pas de fichier séparé. *(Refonte 2026-05-13 — l'ancien dossier `_notes-intention/` est obsolète.)*

## Gabarit dossier story (vérifié par `narration-pmo (unifié 2026-07-19)`)

```
studio/narration/stories/<NNN-titre-slug>/
├── 1-pitch-plan.md
├── 3-briefs/
│   ├── brief-personnages.md
│   └── brief-histoire.md
├── 4-versions-writers/
│   ├── claude-libre.md · kimi-guide.md · …
│   └── (note d'intention en fin de chaque fichier writer, après ---)
├── 5-lecteurs-temoins/
│   ├── G-A1.md · F-A2.md · …  (codes profils, voir equipe/profils-lecteurs.md)
│   ├── DPG-A.md · DMF-B.md · …
│   └── 5-synthese-lecteurs.md
├── 6-selection.md
├── 7-rewrite/<llm>-rewrite-v1.md
├── 8-gatekeeper-verdict.md
├── 9-relecture-rewrite/
├── 10-texte.md            ← CANON
├── kanban.md
└── _archive/              ← versions pre-pivot
```

Modèle : [`studio/narration/stories/_gabarit/`](../../studio/narration/stories/_gabarit/).

## Anti-patterns sur stories

- ❌ Sauter une étape (ex : skip lecteurs étape 5)
- ❌ Plus d'un rewrite (cf. plafond)
- ❌ Texte canon `10-texte.md` modifié sans `_archive/` de l'ancien
- ❌ Writer livre sans note d'intention
- ❌ Inventer un prénom hors casting V1 figé (lookup obligatoire)
- ❌ Briefs sans lecture préalable pédagogie 4-5 ans + ennéatypes

## Quand auto-charger

Cette règle se déclenche dès qu'un fichier sous `studio/narration/stories/` est lu OU édité. Inclut : briefs en cours, versions writers, lecteurs, kanban, canon. Tout fichier de production narrative passe sous l'œil de cette règle.

---

_Refonte 2026-05-13 : extrait condensé de `equipe/PROCESS.md` (316 lignes) pour auto-chargement path-scoped. Le PROCESS complet reste source de vérité._
