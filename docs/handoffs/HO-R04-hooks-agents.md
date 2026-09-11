# HO-R04 — Gouvernance : hooks consolidés, agents JEU/DINO sans point d'entrée

**Statut :** pret
**Depend de :** vague 3 commitée (les hooks tournent pendant le travail des autres lanes : on les change tard)
**Vague :** 4 · **Exécutant :** sous-agent Sonnet

## Objectif
Un seul processus par événement hook, testé ; chaque agent JEU/DINO a un point d'entrée déclaré ou disparaît.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P5
- `.claude/settings.json` § hooks, `.claude/hooks/*`, `.kimi-code/hooks/*`, `.claude/agents/README.md`, `scripts/gen-agents-readme.mjs`

## Fichiers autorises
- `.claude/hooks/**`, `.claude/settings.json` (clé `hooks` uniquement), `.kimi-code/**`
- `.claude/agents/README.md`, `.claude/agents/{game-*,dino-*,quick}.md` (frontmatter et ligne « invoqué par » seulement)
- `studio/minijeux/CLAUDE.md`, `studio/dino/CLAUDE.md` (section « agents du pôle » seulement), `scripts/gen-agents-readme.mjs`

## Hors perimetre
- Tout agent `narration-*`, `studio/narration/**` (D-011). Aucune commande git.

## Travail
1. Un dispatcher PowerShell par événement : `pre-tool.ps1` (figees-injector + garde-git-add selon l'outil), `post-tool.ps1` (sync-agents-md porté en PS + rappel Kimi). `signal-detector` et `pmo-check` : logique inchangée, lecture du transcript bornée.
2. `hooks/tests/run.ps1` : rejoue 5 payloads JSON et compare la sortie attendue.
3. `.kimi-code/hooks/stop-payload.jsonl` supprimé ; `.kimi-code/hooks/*.kimi.ps1` réalignés sur les dispatchers.
4. Agents sans point d'entrée (`game-test-audio`, `game-test-secu`, `dino-fiche-writer`, `quick`) : proposer pour chacun « ligne “invoqué par …” dans le CLAUDE.md du pôle » ou « suppression ». L'orchestrateur tranche avant application ; `quick` supprimé si rien ne l'appelle.

## Portes de verification
```powershell
.\.claude\hooks\tests\run.ps1                       # vert
Measure-Command { <payload Edit hors mj> | .\.claude\hooks\pre-tool.ps1 }   # 1 seul processus, < 400 ms
# garde-git-add bloque toujours `git add -A` (test) ; sync-agents-md régénère AGENTS.md identique
```

## Definition of done
Tests hooks verts, un processus par événement mesuré, agents tranchés et appliqués, rapport dans `docs/handoffs/rapports/HO-R04.md`.

## Rapport attendu
Table événement → dispatcher → durée, proposition par agent, questions.
