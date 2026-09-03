# HO-G02 — Mémoire racine → quintette

**Statut :** pret
**Depend de :** —

## Objectif
`memory/` racine devient le quintette de la convention machine (MEMORY · TODO · DECISIONS · LESSONS · CHANGELOG), avec un état vrai, et le CLAUDE.md racine pointe dessus. Tout ce qui est périmé disparaît ou descend en archive.

## Contexte a lire d'abord
- `~/.claude/rules/memoire-projet.md` (la convention)
- `memory/audits/2026-09-03-archi-claude-infra.md` § 3 points 3-4, § 4
- `memory/DOCTRINE.md`, `memory/MEMORY.md`, `memory/workflow.md`, `memory/skills-map.md`, `memory/VISION.md`, `memory/MAX_PROFILE.md`, `memory/notes-brutes-univers.md`, `memory/ARCHI-REFERENTIEL-CONTENU.md`, `memory/audio/PLAN-AUDIO-I18N.md`
- `CLAUDE.md` racine
- `studio/minijeux/pmo/INVARIANTS.md` § État déploiement et `site/js/catalog.js` (pour l'état vrai des jeux : ne JAMAIS recopier un chiffre, pointer)

## Fichiers autorises
- `memory/**` (création, réécriture, suppression, déplacement vers `memory/archive/`)
- `CLAUDE.md` racine (section « Fichiers transversaux » + ligne « Mémoire » des principes ; rien d'autre)
- `studio/minijeux/tasks/BACKLOG.md` (suppression) et le dossier `tasks/` s'il devient vide
- `studio/referentiel/docs/ARCHI-REFERENTIEL-CONTENU.md` (destination du déplacement)

## Hors perimetre
- Les `pmo/` des pôles (vague 2). L'auto-memory `~/.claude/projects/...` (HO-G04). Aucune commande git.

## Travail
1. Créer `memory/DECISIONS.md` : en tête, la section « Doctrine » = contenu de `DOCTRINE.md` recopié **verbatim** (D-001..D-003 + norme audits + convention archive + règle compteurs), puis D-004 : « 2026-09-03 — Convergence mémoire : un quintette par pôle vivant + un transverse ; `pmo/` → `memory/` (mapping INVARIANTS reste · decisions→DECISIONS · backlog→TODO + LESSONS · sprint-log→MEMORY + archive · audit-trail→archive) ; Kimi conservé (miroir AGENTS.md). Pourquoi : deux conventions concurrentes, 4 couches, fichiers PMO > 2 000 lignes (audit du jour). » Supprimer `DOCTRINE.md` ensuite et remplacer chaque pointeur vers `memory/DOCTRINE.md` trouvé par `grep -rl "DOCTRINE.md" --include=*.md .` par `memory/DECISIONS.md § Doctrine` — SAUF dans les fichiers d'archive (`archive/`, `_archive/`, `pmo/`), qui ne se réécrivent pas (lister ces occurrences dans le rapport).
2. Créer `memory/LESSONS.md` (L-001…) : reprendre les leçons transverses (pas de pôle) de `memory/MEMORY.md` actuel et des `feedback_*` de l'auto-memory listées dans `~/.claude/projects/c--ProjetsPerso-Claude-Projects-MaxPlay/memory/MEMORY.md` (lecture seule) : concurrence git staging, vérifier claims des agents, AskUserQuestion interdit, jamais nommer Max dans le contenu, capture immédiate, deux conventions mémoire = confusion (leçon du jour). Une leçon = 2 lignes : quoi + comment appliquer.
3. Créer `memory/TODO.md` : lanes ouvertes = les 5 plans de l'audit avec leurs handoffs (référence `docs/handoffs/README.md`), + TODO déjà connus transverses (recette compte→sync, Resend SMTP, nom de domaine, 6 pages en `SpeechSynthesisUtterance` brut) repris de `memory/MEMORY.md`.
4. Créer `memory/CHANGELOG.md` : sections `v0.x` reconstruites depuis `git log --oneline --since=2026-03-01 | grep -E "^[0-9a-f]+ feat"` regroupées par mois, écrites du point de vue utilisateur (ce que Max/le parent voit). 30 lignes max.
5. Réécrire `memory/MEMORY.md` en ≤ 60 lignes : où on en est (plateforme PWA, 4 pôles, ce qui est live, chantiers en cours) sans aucun chiffre volatil (pointer INVARIANTS / catalog.js), avec la table « quelle question → quel fichier ». Supprimer les sections périmées (21 jeux, session 12/13, tasks/BACKLOG).
6. Supprimer `memory/skills-map.md` et `memory/workflow.md` (leur contenu encore vrai tient en 3 lignes dans MEMORY.md : « agents = `.claude/agents/README.md`, skills = `/skills`, workflow = Plan → Dev → Verify → Commit → graver »).
7. Déplacer `memory/notes-brutes-univers.md` → `memory/archive/notes-brutes-univers.md` avec bandeau archive. Déplacer `memory/ARCHI-REFERENTIEL-CONTENU.md` → `studio/referentiel/docs/ARCHI-REFERENTIEL-CONTENU.md` et corriger le lien dans `studio/referentiel/README.md` (ligne du lien seulement). Déplacer `memory/audio/PLAN-AUDIO-I18N.md` → `memory/archive/` si son contenu est daté et réalisé, sinon le laisser et le dire.
8. Supprimer `studio/minijeux/tasks/BACKLOG.md` (stub).
9. `CLAUDE.md` racine : tableau « Fichiers transversaux » réécrit pour le quintette (MEMORY, TODO, DECISIONS, LESSONS, CHANGELOG, MAX_PROFILE, VISION, audits/) ; retirer les lignes vers workflow.md, DOCTRINE.md, skills-map.md, ARCHI-REFERENTIEL. Ne toucher à rien d'autre dans ce fichier.

## Portes de verification
```bash
ls memory/                                    # exactement : MEMORY.md TODO.md DECISIONS.md LESSONS.md CHANGELOG.md MAX_PROFILE.md VISION.md archive/ audits/
wc -l memory/MEMORY.md                        # <= 60
grep -rn "skills-map\|workflow.md\|DOCTRINE.md\|tasks/BACKLOG\|ARCHI-REFERENTIEL" CLAUDE.md memory/*.md   # 0 résultat
python3 - <<'EOF'
import re,os
for f in ["memory/MEMORY.md","memory/TODO.md","memory/DECISIONS.md","memory/LESSONS.md","CLAUDE.md"]:
    t=open(f,encoding="utf-8").read()
    for l in re.findall(r'\]\(([^)#\s]+?)(?:#[^)]*)?\)',t):
        if l.startswith("http"): continue
        p=os.path.normpath(os.path.join(os.path.dirname(f),l))
        if not os.path.exists(p): print("CASSE",f,l)
print("liens OK")
EOF
```

## Rapport attendu
Fichiers créés/modifiés/supprimés/déplacés, sortie des portes, liste des pointeurs vers DOCTRINE.md laissés en archive, questions ouvertes.
