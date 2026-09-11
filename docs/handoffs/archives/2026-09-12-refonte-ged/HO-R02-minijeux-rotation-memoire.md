# HO-R02 — Minijeux : rotation de la mémoire

**Statut :** fait
**Depend de :** HO-R00
**Vague :** 1 · **Exécutant :** sous-agent Sonnet

## Objectif
`studio/minijeux/memory/` redevient un quintette lisible : LESSONS ≤ 20 Ko, TODO ≤ 8 Ko, aucune leçon perdue, archive datée.

## Contexte a lire d'abord
- `~/.claude/rules/memoire-projet.md` (une archive ne se réécrit pas ; L-NNN partagés)
- `memory/DOCTRINE.md` (rotation)
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P4

## Fichiers autorises
- `studio/minijeux/memory/**`

## Hors perimetre
- Tout le reste. Aucune commande git.

## Travail
1. `LESSONS.md` (70 Ko) : garder les leçons encore vraies et générales ; déplacer le reste **verbatim** dans `memory/archive/lessons-2026-H1.md` avec bandeau daté. Numéros L-NNN conservés, jamais renumérotés.
2. `TODO.md` (39 Ko) : supprimer le fait et l'obsolète (croiser `catalog.js`, `git log`, `CHANGELOG.md`) ; regrouper en lanes vivantes avec une ligne de DoD chacune ; les lanes fermées passent dans `CHANGELOG.md` en capacités visibles par l'utilisateur.
3. `INVARIANTS.md` relu, refs `pmo/` corrigées.
4. `MEMORY.md` : état vrai en ≤ 60 lignes.
5. `audits/` : alimenté par les 3 audits de juillet déplacés depuis `memory/audits/` du pôle, ou supprimé si vide.

## Portes de verification
```bash
wc -c studio/minijeux/memory/{MEMORY,TODO,DECISIONS,LESSONS,CHANGELOG}.md
# union des L-NNN (vivant + archive) identique avant/après :
grep -ohE "L-[0-9]{3}" studio/minijeux/memory/LESSONS.md studio/minijeux/memory/archive/*.md | sort -u | wc -l
grep -rl "pmo/" studio/minijeux/memory        # vide
```

## Definition of done
Tailles cibles atteintes, compte de L-NNN identique, rapport dans `docs/handoffs/rapports/HO-R02.md`.

## Rapport attendu
Avant/après en Ko par fichier, liste des L-NNN archivés, lanes fermées passées au CHANGELOG, questions.
