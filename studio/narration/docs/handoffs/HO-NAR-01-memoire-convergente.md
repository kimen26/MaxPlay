# HO-NAR-01 — Mémoire convergente pôle NARRATION

**Statut :** pret
**Depend de :** vague 1 commitée (HO-G02, HO-G06 : skill `narration-craft` désormais dans `~/.claude/skills/`)

## Objectif
`studio/narration/memory/` est le quintette du pôle ; `pmo/` n'existe plus ; le PROCESS a une seule source ; l'INBOX est vide ; le CLAUDE.md du pôle tient en 80 lignes.

## Contexte a lire d'abord
- `docs/handoffs/HO-POLE-memoire-convergente-COMMUN.md` (socle)
- `memory/DECISIONS.md` racine § D-004
- `memory/audits/2026-09-03-archi-claude-infra.md` § 3 points 5-7, 11
- État actuel : `studio/narration/{CLAUDE.md,INDEX.md,AGENTS.md,README.md,INBOX.md}`, `pmo/{INVARIANTS,decisions,sprint-log,backlog,audit-trail,roadmap,matiere-a-distiller,INDEX}.md`, `pmo/archive/` (déjà une rotation H1 avec INDEX — modèle à réutiliser), `pmo/audits/`, `memory/state.md`, `memory/business/`, `equipe/PROCESS.md` (418 l., source du process), `equipe/lecons-vivantes.md`, `inbox/`

## Fichiers autorises
- `studio/narration/**` SAUF : `stories/**`, `scripts/**`, `docs/handoffs/**`, `equipe/memoire-*.md`, `equipe/ORGANIGRAMME.md` (HO-G12)

## Hors perimetre
- `.claude/**`, `CLAUDE.md` racine, autres pôles. Aucune commande git.

## Travail (en plus du socle commun)
1. `pmo/decisions.md` fait encore 3 706 lignes malgré la rotation H1 : appliquer la même rotation → `memory/archive/decisions-2026-07.md` (entrées de juillet) verbatim ; `memory/DECISIONS.md` garde ≥ 2026-08-01 + index des structurantes (casting V1, patte B+D+C, univers implicite, DEC-AUDIO-PRODUCTION-001, 14 writers, direction Nono…). `pmo/archive/*` → `memory/archive/*` tel quel, INDEX fusionné.
2. `pmo/backlog.md` (157 l.) → `memory/TODO.md` (ouvert) + `archive/backlog-fermes-2026.md` (fermé) ; leçons `L-xxx` + `equipe/lecons-vivantes.md` : **`lecons-vivantes.md` est du craft narratif vivant, pas des leçons process** → il reste dans `equipe/` ; seules les leçons process (« ne plus faire X ») vont dans `memory/LESSONS.md`. Dire dans le rapport ce qui a été jugé craft vs process.
3. `pmo/sprint-log.md` (468 l.) → `memory/archive/sprint-log-2026-H2.md` verbatim ; 3 dernières sessions dans `MEMORY.md § Journal`.
4. `pmo/roadmap.md` → `memory/TODO.md § Roadmap` (lanes saisons/arcs) ; `pmo/matiere-a-distiller.md` → distiller ce qui se distille en 1 ligne (TODO/DECISIONS), le reste → `memory/archive/matiere-a-distiller-2026-07.md`. `pmo/INDEX.md` supprimé (l'INDEX du pôle suffit). `memory/state.md` fusionne dans `MEMORY.md`. `memory/business/` (vide ?) → supprimer si vide, sinon `archive/`.
5. `INBOX.md` (305 l., 13 sections, 5 non distillées : voix narrateur vs perso, challenges C-3..C-6, tickets UNIVERS-004/005, top 15 prénoms par pays, brainstorm saison 1) : chaque section → 1 à 3 lignes dans TODO / DECISIONS / archive, marquer `✅ Distillé 2026-09-03`, puis tout le corps part verbatim en `memory/archive/INBOX-2026-04-05.md`. `INBOX.md` = en-tête seul. `inbox/` : lister les fichiers (PNG 580 Ko, `culture*.md`, `report.md`) avec verdict traité/non traité pour HO-G10 (ne pas supprimer).
6. `CLAUDE.md` du pôle (169 l.) ≤ 80 lignes : le bloc « PROCESS militaire 11 étapes » recopié → une ligne pointant `equipe/PROCESS.md` + `.claude/rules/stories-process.md` ; la « Table de routage NARRATION » se garde mais pointe le quintette (`memory/INVARIANTS.md` etc.) ; les blocs audio → pointer `.claude/rules/audio.md` + skills globaux ; craft → `~/.claude/skills/narration-craft/` (nouveau chemin). Corriger le lien `../game/CLAUDE.md` (n'existe plus : `../minijeux/CLAUDE.md`). Garder casting V1 (5 lignes), principes, INBOX, pointeurs.
7. `equipe/PROCESS.md` : ajouter en tête « Source unique du process. `.claude/rules/stories-process.md` et `CLAUDE.md` du pôle ne font que pointer ici. »
8. `AGENTS.md`, `INDEX.md`, `README.md` : chemins à jour. `README.md` et `INDEX.md` font-ils doublon ? Si oui, README = 10 lignes qui pointent INDEX (dire ce qui a été fait).
9. Scripts (`scripts/` hors périmètre) qui lisent `pmo/` : `grep -n "pmo" studio/narration/scripts/*` → lister pour HO-G07.

## Portes de verification
Celles du socle avec `P=studio/narration`, plus :
```bash
ls studio/narration/memory/            # INVARIANTS DECISIONS TODO LESSONS MEMORY CHANGELOG archive/ audits/
grep -c "^## " studio/narration/INBOX.md    # 0
wc -l studio/narration/memory/DECISIONS.md  # ≤ 400
grep -n "PROCESS militaire 11" studio/narration/CLAUDE.md | wc -l   # ≤ 1 (pointeur seul)
grep -n "\.\./game/" studio/narration/CLAUDE.md | wc -l              # 0
node studio/narration/scripts/check-compteurs.js ; echo "exit=$?"    # si le script pointe pmo/, exit ≠ 0 est attendu : le dire, ne pas le corriger
```

## Rapport attendu
Fichiers créés/déplacés/supprimés, ce qui est craft vs process, distillation INBOX section par section, pointeurs extérieurs et scripts à corriger (HO-G07), sortie des portes (avant/après liens cassés), questions ouvertes.
