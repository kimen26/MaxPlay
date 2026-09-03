---
paths:
  - "studio/narration/stories/**"
---

# PROCESS militaire NARRATION — règles auto-chargées sur stories/**

> Chargé automatiquement dès qu'un fichier sous `studio/narration/stories/` est lu OU édité.
> Source de vérité complète : [`studio/narration/equipe/PROCESS.md`](../../studio/narration/equipe/PROCESS.md) (11 étapes détaillées, inputs/outputs/points de reprise). Gabarit dossier vivant : [`stories/_gabarit/`](../../studio/narration/stories/_gabarit/).

## 11 étapes (0 à 10) — résumé

Dump idée → **1** Pitch+plan (`narration-conseiller`, valide auteur) → **2** Brainstorm boss (PY+Conseiller) puis équipe (Kimi+DeepSeek+Grok) → **3** Briefs (`narration`) → **4** 14 versions writers (6 Claude + 4 Kimi + 2 DeepSeek + 2 Grok) → **5** 20 lecteurs témoins → **6** Sélection (`narration`, valide auteur) → **7** Rewrite top 1 (plafond 1) → **8** GateKeeper (PASS ou corrections rapides, ne réécrit pas) → **9** Panel relit le rewrite → **10** Canon + leçons (`narration`+`narration-pmo`, valide auteur).

Détail complet (owners, outputs, conditions de passage) : `equipe/PROCESS.md` § chaque étape.

## Règles MILITAIRES

1. **Préfixes obligatoires** : tout fichier dans `stories/<id>/` préfixé `N-` (0, 1, 3-10). Pas de `pitch.md` nu.
2. **Étapes 1 et 3** exigent la lecture de [`personnages/theorie/pedagogie-enfance/`](../../studio/narration/personnages/theorie/pedagogie-enfance/README.md) (boussole 4-5 ans) + ennéatypes pertinents.
3. **14 writers ≠ 14 textes identiques** — leviers de variance (angle/POV/ouverture/longueur/température) figés dans [`memory/INVARIANTS.md`](../../studio/narration/memory/INVARIANTS.md) § *Leviers de variance*.
4. **Rewrite plafond 1** par story. Au-delà → recommencer étape 1 (cause racine à analyser).
5. **Canon = source de vérité** : `10-texte.md` figé après validation. Toute évolution = nouvelle story ou `_archive/`.
6. **Note d'intention writer** : en fin de fichier writer (après `---`), jamais un fichier séparé.

## Anti-patterns

❌ Sauter une étape · ❌ Plus d'un rewrite · ❌ `10-texte.md` modifié sans archiver l'ancien · ❌ Writer sans note d'intention · ❌ Prénom hors casting V1 · ❌ Briefs sans lecture pédagogie/ennéatypes.

---

_Refonte 2026-05-13, allégée HO-G07 (2026-09-03) : table 11 étapes et gabarit dossier ASCII retirés (déjà sources uniques dans `equipe/PROCESS.md` et `stories/_gabarit/`, non recopiés ici), chemin `pmo/` → `memory/`._
