# HO-G04 — Auto-memory : dédoublonnage + chemins morts

**Statut :** pret
**Depend de :** —

## Objectif
L'auto-memory de MaxPlay ne répète plus ce que CLAUDE.md impose déjà, ne pointe plus de chemins morts, et `MEMORY.md` repasse sous 100 lignes.

## Contexte a lire d'abord
- Doc officielle : l'auto-memory est ce que **Claude** apprend (préférences, corrections, contexte non dérivable) ; elle doit SAUTER ce que CLAUDE.md dit déjà. Index `MEMORY.md` chargé sur 200 lignes / 25 KB max, une ligne par mémoire, le détail dans les topic files.
- `CLAUDE.md` racine, `studio/*/CLAUDE.md`, `.claude/rules/*.md` (lecture seule : ce qu'ils imposent n'a rien à faire en auto-memory)
- `memory/audits/2026-09-03-archi-claude-infra.md` § 3 point 12

## Fichiers autorises
- `C:/Users/kimen/.claude/projects/c--ProjetsPerso-Claude-Projects-MaxPlay/memory/**`

## Hors perimetre
- Tout fichier du repo MaxPlay. Aucune commande git.

## Travail
1. Pour chaque topic file (61) : si son contenu est déjà une règle de CLAUDE.md / rules (bus SVG, AskUserQuestion, figées, commit+push, Tritri, capture immédiate, Grokipedia…), remplacer le corps par 2 lignes : « Règle imposée par `<fichier>` § … — voir là-bas. Contexte de l'incident : <1 ligne> » (on garde l'historique de l'incident, on retire la règle dupliquée). Si le fichier ne contient QUE la règle dupliquée sans incident, le supprimer et retirer sa ligne de l'index.
2. Corriger les chemins morts : `game/docs/` → `studio/minijeux/docs/`, `game/web/` → `site/`, `tasks/BACKLOG.md` → `studio/minijeux/pmo/backlog.md` (deviendra `memory/TODO.md` en vague 2 : écrire « `studio/minijeux/pmo/backlog.md` (→ `memory/TODO.md` après convergence 2026-09) »), `narration/pmo/` → `studio/narration/pmo/`, `docs/jeux/` → `studio/minijeux/docs/jeux/`.
3. Supprimer les mémoires périmées : `todo_max_adventure_bus_svg.md` et `todo_skill_name_sonority_check.md` (les TODO vivent dans `memory/TODO.md` du projet, pas en auto-memory — reporter leur contenu en 1 ligne chacune dans le rapport pour que l'orchestrateur les recopie), `project_dino_tritri` s'il existe encore (corrigé par feedback_tritri).
4. Réécrire `MEMORY.md` (index) : une ligne par mémoire restante, groupes courts, ≤ 100 lignes, sans contenu (que des pointeurs + hook de 10 mots). Garder en tête les 3 lignes « Papa Yann / ne pas appeler John » et le pointeur vers l'état réel du projet.
5. Ajouter une mémoire `project_convergence_memoire_2026-09.md` (type project) : « Depuis 2026-09-03 : quintette memory/ par pôle + transverse, handoffs dans docs/handoffs/, audit de référence memory/audits/2026-09-03-archi-claude-infra.md ».

## Portes de verification
```bash
cd "C:/Users/kimen/.claude/projects/c--ProjetsPerso-Claude-Projects-MaxPlay/memory"
wc -l MEMORY.md                                  # <= 100
grep -lE "game/docs|game/web|^.*\btasks/BACKLOG\b|docs/jeux/" *.md   # 0 fichier (hors mention « → memory/TODO.md »)
ls *.md | wc -l ; grep -c "^- \[" MEMORY.md      # chaque topic file a sa ligne dans l'index (écart expliqué dans le rapport)
for f in *.md; do head -1 "$f" | grep -q '^---' || echo "SANS FRONTMATTER $f"; done   # seul MEMORY.md
```

## Rapport attendu
Table fichier → action (gardé / réduit / supprimé / corrigé), les 2 TODO à recopier, sortie des portes.
