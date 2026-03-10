# MaxPlay – Jeu éducatif bus pour Max (3.5-4 ans)

## Workflow Orchestration

### 1. Plan Node Default
- Entrer en plan mode pour TOUTE tâche non-triviale (3+ étapes ou décision archi)
- Si ça déraille, STOP et re-planifier immédiatement – ne pas continuer dans le mur
- Utiliser le plan mode pour les étapes de vérification, pas seulement pour construire
- Écrire des specs détaillées en amont pour réduire l'ambiguïté

### 2. Subagent Strategy
- Utiliser les subagents pour garder la fenêtre de contexte principale propre
- Déléguer la recherche, l'exploration et l'analyse parallèle aux subagents
- Pour les problèmes complexes, multiplier la puissance via les subagents
- Un sujet par subagent pour une exécution focalisée

**Types de subagents disponibles** (via `Agent` tool) :
| Type | Quand l'utiliser |
|------|-----------------|
| `general-purpose` | Tâches multi-étapes autonomes, recherche complexe |
| `Explore` | Exploration codebase, recherche de fichiers/keywords |
| `Plan` | Conception d'architecture, plans d'implémentation |
| `claude-code-guide` | Questions sur Claude Code, API, Agent SDK |

**Agents spécialisés** (everything-claude-code, dans `~/.claude/agents/`) :
`architect` · `planner` · `chief-of-staff` · `code-reviewer` · `security-reviewer`
`tdd-guide` · `refactor-cleaner` · `doc-updater` · `build-error-resolver` · `loop-operator`

### 3. Self-Improvement Loop
- Après TOUTE correction de l'utilisateur : mettre à jour les leçons dans `tasks/BACKLOG.md`
- Écrire des règles pour ne pas reproduire la même erreur
- Itérer sans pitié sur ces leçons jusqu'à ce que le taux d'erreur baisse
- Relire les leçons au début de chaque session

### 4. Verification Before Done
- Ne jamais marquer une tâche terminée sans prouver que ça marche
- Comparer le comportement avant/après les changements quand c'est pertinent
- Se demander : "Est-ce qu'un senior dev validerait ça ?"
- Lancer les tests, vérifier les logs, démontrer la correction

### 5. Demand Elegance (Balanced)
- Pour les changements non-triviaux : pause et "y a-t-il une façon plus élégante ?"
- Si un fix semble hacky : "Sachant tout ce que je sais, implémenter la solution élégante"
- Skip for simple obvious fixes – don't over-engineer
- Challenger son propre travail avant de le présenter

### 6. Autonomous Bug Fixing
- Quand un bug est identifié : le corriger. Pas de questions inutiles.
- Pointer vers logs, erreurs, tests qui échouent – puis les résoudre
- Zéro context-switching requis de l'utilisateur
- Corriger les CI qui échouent sans être guidé

## Task Management

1. **Plan First** : Écrire le plan dans `tasks/BACKLOG.md` avec items cochables
2. **Verify Plan** : Valider avec l'utilisateur avant l'implémentation
3. **Track Progress** : Utiliser `TodoWrite` pour tracker les tâches en cours session
4. **Explain Changes** : Résumé haut-niveau à chaque étape
5. **Document Results** : Ajouter une section review dans `tasks/BACKLOG.md`
6. **Capture Lessons** : Mettre à jour les leçons après corrections
7. **Persist Knowledge** : Sauvegarder en `memory/MEMORY.md` ce qui doit survivre entre sessions

### Todo tracking (TodoWrite)
- Utiliser `TodoWrite` dès qu'une tâche a 2+ sous-étapes
- Marquer `completed` immédiatement quand c'est fait – ne pas batcher
- États : `pending` → `in_progress` (1 seul à la fois) → `completed`

### Mémoire persistante
- `memory/MEMORY.md` : chargé automatiquement à chaque session
- `~/.claude/projects/.../memory/` : mémoire auto inter-projets
- Sauvegarder : patterns confirmés, décisions archi, préférences utilisateur, solutions récurrentes
- Ne PAS sauvegarder : état session, TODO en cours, infos non vérifiées

## Core Principles

- **Simplicity First** : Chaque changement aussi simple que possible. Impact minimal.
- **No Laziness** : Trouver les root causes. Pas de fixes temporaires. Standards senior.
- **Minimal Impact** : Toucher uniquement ce qui est nécessaire. Ne pas introduire de bugs.

---

## Project Context

**Qui** : Max, 3.5-4 ans, passionné de bus – lignes, couleurs, numéros, itinéraires.
Connait les chiffres jusqu'aux milliers. Commence à lire les syllabes. Interaction tactile (tablet).
Voir `docs/MAX_PROFILE.md` pour le profil complet.

**Stack** : Phaser.js 3 · Vite · TypeScript strict · Assets SVG/PNG

**Règles jeu enfant** (non-négociables) :
- Zones interactives minimum 80×80 px
- Feedback visuel + sonore sous 200 ms
- Zéro pénalité punitive – toujours des encouragements
- Sessions 3–8 min max

### Skills disponibles

#### Skills projet (`.claude/skills/` – invoquer via `Skill` tool)

| Dossier | Skill | Utiliser quand |
|---------|-------|----------------|
| `game-dev/` | `game-mechanics` | Concevoir mécaniques, level design, boucle de jeu |
| `game-dev/` | `phaser-js` | Code Phaser, patterns scenes |
| `game-dev/` | `optimization` | **Auditer tout choix design/code/asset sous l'angle perf** |
| `game-dev/` | `gamepad` | Manette 8BitDo FC30, Web Gamepad API, dual-input manette+tactile |
| `design/` | `visual-2d` | Style visuel, palette, création assets 2D |
| `design/` | `animation` | Animation personnages, véhicules, effets |
| `education/` | `child-pedagogy` | Valider l'apprentissage, calibrer la difficulté |
| `narrative/` | `kids-storytelling` | Scénarios, personnages, univers, dialogues |
| `ux/` | `kids-ux` | UX enfant, gratification, systèmes de progression |

**Règle optimization** : consulter `game-dev/optimization` PROACTIVEMENT sur tout choix d'asset, de design ou de feature. Signaler quand quelque chose est sous-optimal.

#### Skills globaux (`~/.claude/skills/` – everything-claude-code)

Skills transverses disponibles pour ce projet et tous les projets :

| Catégorie | Skills clés |
|-----------|-------------|
| Engineering | `tdd-workflow` · `e2e-testing` · `security-review` · `api-design` |
| Frontend | `frontend-patterns` · `coding-standards` |
| Architecture | `backend-patterns` · `deployment-patterns` · `database-migrations` |
| AI/LLM | `agentic-engineering` · `autonomous-loops` · `eval-harness` |
| Process | `continuous-learning` · `verification-loop` · `search-first` |

Chemin complet : `~/.claude/skills/<nom-skill>/`

#### Commandes slash (`~/.claude/commands/`)

Commandes disponibles via `/` :
`/code-review` · `/checkpoint` · `/build-fix` · `/e2e` · `/eval`
`/learn` · `/loop-start` · `/loop-status` · `/security-scan` · `/evolve`

#### Règles globales (`~/.claude/rules/`)

Règles appliquées automatiquement (common + TypeScript) :
`coding-style` · `git-workflow` · `security` · `testing` · `patterns` · `performance` · `agents` · `hooks`

### Fichiers clés

| Fichier | Rôle |
|---------|------|
| `tasks/BACKLOG.md` | Source de vérité : épics, tâches, décisions, leçons |
| `docs/VISION.md` | Vision du jeu – options ouvertes, pas décisions figées |
| `docs/REFERENCES.md` | Ressources et liens centralisés |
| `memory/MEMORY.md` | Connaissance projet – chargé automatiquement |
| `docs/MAX_PROFILE.md` | Profil complet de Max (lignes bus, couleurs, passions) |

### Ressources globales Claude (`~/.claude/`)

| Chemin | Contenu |
|--------|---------|
| `~/.claude/rules/` | 14 règles auto-appliquées (common + TypeScript) |
| `~/.claude/agents/` | 16 agents spécialisés (everything-claude-code) |
| `~/.claude/commands/` | 40 commandes slash |
| `~/.claude/skills/` | 65 skills transverses |
| `~/.claude/projects/.../memory/MEMORY.md` | Mémoire auto inter-sessions |
