# Handoffs GLOBAUX — refonte infra Claude 2026-09-03

> Usine transverse (plans A, C, D, E + nettoyage de l'audit `memory/audits/2026-09-03-archi-claude-infra.md`).
> Les handoffs de PÔLE (plan B mémoire convergente) vivent dans `studio/<pôle>/docs/handoffs/`.
> Protocole : `~/.claude/skills/nouveau-projet/references/protocole-handoffs.md`.

## Rôles

- **Orchestrateur** : session principale (Claude Fable). Rédige les briefs, lance les exécutants, rejoue les portes, commite, grave.
- **Exécutants** : sous-agents Sonnet, un brief chacun, jamais hors de leurs fichiers autorisés, **jamais de commande git**.

## Registre

| ID | Titre | Vague | Fichiers possédés | Statut |
|----|-------|-------|-------------------|--------|
| HO-G01 | BOM + plugin telegram + hook InstructionsLoaded diag | 1 (orchestrateur) | `.claude/rules/audio.md`, `.claude/rules/personnages.md`, `studio/narration/CLAUDE.md` (encodage seul), `~/.claude/settings.json` | fait (telegram déjà off ; diag InstructionsLoaded actif jusqu à HO-G07) |
| HO-G02 | Mémoire racine → quintette | 1 | `memory/**`, `CLAUDE.md` racine, `studio/minijeux/tasks/**`, `studio/referentiel/docs/**` | fait |
| HO-G03 | Liens cassés config active + settings purge + figees-injector | 1 | `.claude/skills/maxplay-tiles/**`, `.claude/rules/tile-tools.md`, `.claude/rules/lunii.md`, `studio/minijeux/CLAUDE.md` + `INDEX.md` (lignes de liens seulement), `site/PIPELINE-MEMORY-MJ.md`, `.claude/hooks/figees-injector.ps1`, `.claude/settings.json` (clé `permissions.allow` seulement) | fait |
| HO-G04 | Auto-memory : dédoublonnage + chemins morts | 1 | `~/.claude/projects/c--ProjetsPerso-Claude-Projects-MaxPlay/memory/**` | fait |
| HO-G05 | Inventaire nettoyage (lecture seule) | 1 | `docs/handoffs/rapports/HO-G05-inventaire.md` | fait |
| HO-G06 | Skills craft → global + flags effets de bord | 1 | `.claude/skills/{narration-craft,game-design-enfant,lunii-sync,dino-paleoart,dino-images-lunii}/**`, `~/.claude/skills/{narration-craft,game-design-enfant}/**`, `.claude/rules/narration-craft.md` | fait |
| HO-MJ-01 | Pôle JEU : mémoire convergente | 2 | `studio/minijeux/**` sauf `tests/`, `docs/handoffs/` | fait |
| HO-DINO-008 | Pôle DINO : mémoire convergente | 2 | `studio/dino/{pmo,figees,CLAUDE.md,INDEX.md,AGENTS.md}` | bloque : session concurrente ecrit dans studio/dino/pmo/ (22:54) — lancer quand elle est close |
| HO-NAR-01 | Pôle NARRATION : mémoire convergente | 2 | `studio/narration/**` sauf `stories/`, `scripts/`, `docs/handoffs/` | fait |
| HO-G08 | Skills globaux `tts-pipeline` + `audio-verif` | 2 | `~/.claude/skills/tts-pipeline/**`, `~/.claude/skills/audio-verif/**` | fait |
| HO-G09 | Skills globaux `i18n-contenu` + `browser-pilot` | 2 | `~/.claude/skills/i18n-contenu/**`, `~/.claude/skills/browser-pilot/**` | fait |
| HO-G07 | Hooks + rules amincies + CLAUDE.md racine (post-vague 2) | 3 | `.claude/hooks/**`, `.claude/rules/**`, `CLAUDE.md`, `.kimi-code/hooks/**` | fait |
| HO-G10 | Nettoyage exécution + prod propre (post-G05 validé) | 3 | selon rapport G05 validé : `temp/`, `studio/temp/`, `studio/minijeux/tests/{_scratch,batch-*,test-dinos*}`, `site/{tile-tools,tools,design-*,dev-*.html,index-v2-archive.html,atelier-couleurs.html,map-mockups.html,design-mockups.html}`, `site/img/dinos/{wiki,grok,sprites}`, `.github/workflows/deploy.yml`, `studio/referentiel/**` | fait (reste : 12 sons lieux, INDEX minijeux) |
| HO-G12 | Agents : `memory: project`, archivage des inutilisés, README généré | 3 | `.claude/agents/**`, `_archive/agents-2026-09-03/**`, `studio/narration/equipe/memoire-*.md`, `studio/minijeux/EQUIPE.md`, `studio/narration/equipe/ORGANIGRAMME.md` | en cours |

Vagues : 1 → 2 → 3, chaque vague commitée par l'orchestrateur avant la suivante.

## Règles non négociables

- **Ownership par fichier.** Deux briefs actifs de la même vague ne partagent jamais un fichier.
- **Zéro git côté exécutant.** L'orchestrateur commite avec `git add <chemins>` explicites (index partagé entre sessions).
- **Une archive ne se réécrit pas** : rotation = déplacement verbatim + bandeau + INDEX daté (convention `memory/DOCTRINE.md`).
- **Kimi Code reste utilisé** : les `AGENTS.md` miroirs restent, `sync-agents-md.py` reste. Le racine est régénéré par hook ; ceux de pôle se mettent à jour à la main quand le CLAUDE.md du pôle change.
- Un doute = on bloque et on écrit la question dans le rapport, jamais « je corrige au passage ».
- Le rapport d'un brief = sortie des portes collée + liste exacte des fichiers créés/modifiés/supprimés.
