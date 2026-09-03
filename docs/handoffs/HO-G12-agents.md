# HO-G12 — Agents : `memory: project`, archivage des inutilisés, README généré

**Statut :** bloque par vague 2 (HO-NAR-01 : `equipe/` réorganisé) et HO-G07 (chemins `pmo/` dans les agents déjà corrigés)
**Depend de :** HO-G07 fait

## Objectif
Ne restent en `.claude/agents/` que les agents utilisés ; les conseillers et PMO ont une mémoire officielle (`memory: project`) qui remplace les fichiers `memoire-*.md` maison ; un seul catalogue d'équipe, généré depuis les frontmatters.

## Contexte a lire d'abord
- `memory/audits/2026-09-03-archi-claude-infra.md` § 3 points 10, 19 ; § 5 plan E
- Doc officielle sub-agents : champs `memory` (`project` → `.claude/agent-memory/<nom>/MEMORY.md`, 200 lignes chargées), `skills` (préchargement), `model`, `tools`, budget descriptions 15 000 tokens.
- Usage mesuré (mentions dans tous les sprint-logs, archives comprises) : 0 → `dino-fiche-writer`, `game-tile-designer`, `game-tile-reviewer`, `game-tile-simplifier`, `narration-lecteur`, `narration-lecteur-dyade`, `narration-science`, `narration-sensibilite` ; 1-2 → `game-mj-reviewer`, `game-test-audio`, `game-test-secu`, `narration-gatekeeper`, `narration-writer-kimi-guide`, `quick`. Vérifier toi-même avec `grep -rl "<nom>" studio/*/memory/archive studio/*/memory/*.md` avant de trancher (le compte peut avoir changé après la vague 2).
- `studio/narration/equipe/memoire-{conseiller,dir,gatekeeper,science,sensibilite}.md` (482 l.), `studio/narration/equipe/ORGANIGRAMME.md`, `studio/minijeux/EQUIPE.md`, `.claude/agents/README.md`
- Convention archive : `memory/DECISIONS.md` racine § Doctrine

## Fichiers autorises
- `.claude/agents/**`, `.claude/agent-memory/**` (création)
- `_archive/agents-2026-09-03/**` (création) + `_archive/INDEX.md` (ajout d'une section)
- `studio/narration/equipe/memoire-*.md` (déplacement), `studio/narration/equipe/ORGANIGRAMME.md`, `studio/minijeux/EQUIPE.md`, `studio/narration/equipe/INDEX.md` (lignes pointant ORGANIGRAMME/memoire-*)
- `scripts/gen-agents-readme.mjs` (création, racine `scripts/`)

## Hors perimetre
- Les CLAUDE.md et INDEX de pôle (déjà réécrits ; s'ils pointent EQUIPE.md/ORGANIGRAMME.md, lister). Aucune commande git.

## Travail
1. **Archiver** (déplacer verbatim vers `_archive/agents-2026-09-03/`, section dans `_archive/INDEX.md` avec date + raison « 0 usage tracé, récupérable ») les agents à 0 usage confirmé. Exception : le pipeline tile (`simplifier`/`designer`/`reviewer`) est lié au skill `maxplay-tiles` et à `rules/tile-tools.md` — si le pipeline reste vivant (demander via le rapport si doute), **fusionner** les 3 en un seul `game-tile.md` avec 3 modes (analyse / recette / revue) plutôt que d'archiver. Même logique `narration-lecteur` + `narration-lecteur-dyade` → un `narration-lecteur.md` à 2 modes.
2. **Mémoire officielle** : ajouter `memory: project` à `narration-conseiller`, `game-conseiller`, `dino-conseiller`, `narration-pmo`, `game-pmo`, `dino-pmo`, `narration` (directeur), `narration-gatekeeper`. Créer `.claude/agent-memory/<nom>/MEMORY.md` en y **déplaçant** (verbatim, ≤ 200 lignes ; surplus dans un topic file à côté) le contenu de `equipe/memoire-<rôle>.md` correspondant (conseiller, dir, gatekeeper, science → si science archivé, sa mémoire part en `_archive/`, sensibilite idem). Supprimer les `memoire-*.md` d'origine et corriger les pointeurs dans `equipe/INDEX.md` et les prompts des agents (`grep -rn "memoire-" .claude/agents studio/narration/equipe`).
3. **Frontmatters** : vérifier chaque agent restant : `name` = nom de fichier, `description` sans `:` nu ni em-dash hors guillemets, `model` présent, `tools` restreints quand l'agent est lecture seule (reviewers, tests : `Read, Grep, Glob, Bash`). Ajouter `skills:` de préchargement là où c'est évident (`game-tile` → `maxplay-tiles` ; `narration-audio-writer` → `ecriture-audio-enfants` ; `dino-conseiller` → aucun, il lit à la demande).
4. **Catalogue unique** : `scripts/gen-agents-readme.mjs` lit les frontmatters et écrit `.claude/agents/README.md` (table nom · modèle · pôle (préfixe) · description · mémoire · skills). Supprimer `studio/minijeux/EQUIPE.md` et `studio/narration/equipe/ORGANIGRAMME.md` si tout leur contenu utile (qui fait quoi) est couvert par le README généré + `equipe/PROCESS.md` ; ce qui ne l'est pas (règles de hiérarchie, communication enfant→parent) va dans le CLAUDE.md du pôle… qui est hors périmètre → le mettre dans le rapport pour l'orchestrateur, et ne supprimer les deux fichiers QUE si rien d'unique ne s'y trouve (sinon les réduire à ce qui est unique).

## Portes de verification
```bash
node scripts/gen-agents-readme.mjs && head -30 .claude/agents/README.md
ls .claude/agents/*.md | wc -l          # ≤ 20
ls .claude/agent-memory/                # les agents avec memory: project
grep -l "^memory: project" .claude/agents/*.md | wc -l   # ≥ 8
grep -rn "memoire-" .claude/agents studio/narration/equipe --include=*.md | wc -l   # 0
for f in .claude/agents/*.md; do [ "$(basename $f .md)" = README ] && continue; n=$(grep -m1 '^name:' $f | awk '{print $2}'); [ "$n" = "$(basename $f .md)" ] || echo "NAME≠FILE $f"; grep -m1 '^description:' $f | grep -qE ' — |: [^"]' && echo "DESC RISQUE $f"; done; echo checked
python3 - <<'EOF'
import glob,re
tot=0
for f in glob.glob(".claude/agents/*.md"):
    t=open(f,encoding="utf-8").read(); m=re.search(r'^description:(.*)$',t,re.M)
    if m: tot+=len(m.group(1))
print("chars descriptions:",tot,"(~tokens:",tot//4,") < 15000 tokens")
EOF
ls _archive/agents-2026-09-03/ && grep -n "agents-2026-09-03" _archive/INDEX.md
```

## Rapport attendu
Table agent → gardé / fusionné / archivé (avec le compte d'usage vérifié), mémoires migrées, frontmatters corrigés, contenu unique d'EQUIPE/ORGANIGRAMME à recaser (pour l'orchestrateur), sortie des portes, questions ouvertes.
