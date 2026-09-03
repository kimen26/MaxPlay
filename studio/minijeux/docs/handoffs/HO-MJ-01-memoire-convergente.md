# HO-MJ-01 — Mémoire convergente pôle JEU

**Statut :** pret
**Depend de :** vague 1 commitée (HO-G02 : `memory/DECISIONS.md` racine D-004 existe)

## Objectif
`studio/minijeux/memory/` est le quintette du pôle ; `pmo/` n'existe plus ; les règles MJ ont une seule source ; le CLAUDE.md du pôle tient en 80 lignes.

## Contexte a lire d'abord
- `docs/handoffs/HO-POLE-memoire-convergente-COMMUN.md` (socle : cible, règles, portes)
- `memory/DECISIONS.md` racine § D-004
- `memory/audits/2026-09-03-archi-claude-infra.md` § 3 points 5-7, 19
- État actuel : `studio/minijeux/{CLAUDE.md,INDEX.md,AGENTS.md,EQUIPE.md,INBOX.md}`, `pmo/{INVARIANTS,decisions,sprint-log,backlog,audit-trail}.md`, `pmo/audits/`, `pmo/retours/`, `memory/{state,rules,stack,VISION-LONG-TERME}.md`, `docs/STANDARD-MJ.md`, `docs/MECANIQUES.md`

## Fichiers autorises
- `studio/minijeux/**` SAUF : `tests/**`, `docs/handoffs/**`, `docs/jeux/figees/**`, `EQUIPE.md` (HO-G12), `scripts/**`

## Hors perimetre
- `.claude/**`, `site/**`, `CLAUDE.md` racine, autres pôles. Aucune commande git.

## Travail (en plus du socle commun)
1. `backlog.md` fait 2 494 lignes : les tickets fermés (EP fermés, « ✅ », « livré », « abandonné ») partent verbatim en `memory/archive/backlog-fermes-2026.md` ; les leçons `L-xxx` en `memory/LESSONS.md` ; `memory/TODO.md` ne garde que l'ouvert. Si un ticket est ambigu (pas de statut), il reste dans TODO avec la mention `(statut à confirmer)`.
2. `sprint-log.md` (1 562 lignes) → `memory/archive/sprint-log-2026-03-08.md` verbatim ; les 3 dernières sessions résumées en 3 lignes chacune dans `MEMORY.md § Journal`.
3. `decisions.md` (690 lignes) : entrées ≥ 2026-08-01 restent dans `memory/DECISIONS.md` ; le reste → `memory/archive/decisions-2026-H1.md` verbatim ; index des structurantes en tête (contrat MJ v2, système étoiles, figeage, catalog.js source, D-021 vocab lieux, mutualisation UI…).
4. `memory/rules.md` : la section « Règles UX (non-négociables) » et « Règles Audio » font doublon avec `docs/STANDARD-MJ.md` et `.claude/rules/mini-jeux.md`. **Source unique = `docs/STANDARD-MJ.md`** : y fusionner ce qui manque (vérifier ligne à ligne, ne rien perdre), puis les sections « Profil Max », « Mécaniques de lecture », « Maths », « Core Loop », « Architecture cible », « Quick Win », « 10 Règles d'or », « Gamification », « Design validés » → `docs/MECANIQUES.md` (si redondant) ou `memory/DECISIONS.md § Designs validés` (verbatim, daté). Supprimer `memory/rules.md`. Dans le rapport : table section → destination.
5. `memory/stack.md` → `docs/STACK.md` (référence technique, pas de la mémoire). `memory/VISION-LONG-TERME.md` → `docs/VISION-LONG-TERME.md`. `memory/state.md` fusionne dans `MEMORY.md` (état déploiement = pointer `pmo/INVARIANTS` → `memory/INVARIANTS` + `site/js/catalog.js`, bugs actifs listés).
6. `pmo/retours/` (vide ?) et `pmo/audits/` → `memory/audits/`. `pmo/audit-trail.md` → `memory/archive/audit-trail-2026.md`.
7. `INBOX.md` (28 lignes) : distiller ou archiver. `inbox/` : le PNG de 2 Mo est-il traité ? Si aucune référence (`grep -rn "8b209b7d" studio/`), le lister comme à supprimer dans le rapport (ne pas supprimer : HO-G10).
8. `CLAUDE.md` du pôle ≤ 80 lignes (socle règle 5). Les « Règles d'or LimeZu » recopiées → une ligne pointant `.claude/rules/tile-tools.md` + skill `maxplay-tiles`. Le tableau équipe → une ligne pointant `.claude/agents/README.md`. Corriger aussi le lien vers le skill `game-design-enfant` (désormais `~/.claude/skills/game-design-enfant/`) s'il apparaît.
9. `AGENTS.md`, `INDEX.md` : chemins à jour.
10. `docs/STANDARD-MJ.md` : ajouter en tête « Source unique des règles MJ. `.claude/rules/mini-jeux.md` (auto-chargée) ne fait que pointer ici. » (HO-G07 amincira la rule).

## Portes de verification
Celles du socle avec `P=studio/minijeux`, plus :
```bash
ls studio/minijeux/memory/   # INVARIANTS DECISIONS TODO LESSONS MEMORY CHANGELOG archive/ audits/  — rien d'autre
ls studio/minijeux/docs/STANDARD-MJ.md studio/minijeux/docs/STACK.md studio/minijeux/docs/VISION-LONG-TERME.md
test ! -f studio/minijeux/memory/rules.md && test ! -f studio/minijeux/memory/state.md && echo "anciens memory/ purgés"
grep -c "L-" studio/minijeux/memory/LESSONS.md          # > 20
grep -c "^## \|^### " studio/minijeux/INBOX.md           # 0 section restante hors en-tête
```

## Rapport attendu
Fichiers créés/déplacés/supprimés, table section rules.md → destination, pointeurs extérieurs au pôle à corriger (pour HO-G07), scripts touchant pmo/, sortie des portes (avant/après liens cassés), questions ouvertes.
