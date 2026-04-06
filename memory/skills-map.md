---
name: Skills et agents disponibles MaxPlay
description: Carte de tous les skills, agents et commandes disponibles et quand les utiliser
type: reference
---

## Agents spécialisés (`~/.claude/agents/`)

| Agent | Utiliser quand |
|-------|----------------|
| `planner` | Feature complexe, refactoring multi-fichiers |
| `architect` | Décision archi, nouvelle structure |
| `code-reviewer` | Après chaque écriture de code |
| `tdd-guide` | Nouveau feature ou bug fix |
| `security-reviewer` | Avant commit, code sensible |
| `build-error-resolver` | Build cassé, erreurs TS |
| `refactor-cleaner` | Nettoyage code mort |
| `e2e-runner` | Tests critiques utilisateur |
| `doc-updater` | Mise à jour docs en fin de session |
| `chief-of-staff` | Orchestration sessions complexes |
| `loop-operator` | Loops autonomes |

## Skills projet (`.claude/skills/`)

| Skill | Utiliser quand |
|-------|----------------|
| `game-dev/game-mechanics` | Mécaniques, level design, boucle de jeu |
| `game-dev/phaser-js` | Code Phaser.js, patterns scenes |
| `game-dev/optimization` | **PROACTIF** — tout choix d'asset/design/feature |
| `game-dev/gamepad` | Manette 8BitDo FC30, Web Gamepad API |
| `design/visual-2d` | Style visuel, palette, assets 2D |
| `design/animation` | Animations personnages, véhicules, effets |
| `education/child-pedagogy` | Valider apprentissage, calibrer difficulté |
| `narrative/kids-storytelling` | Scénarios, personnages, dialogues |
| `ux/kids-ux` | UX enfant, gratification, progression |

## Skills globaux (`~/.claude/skills/`)

| Catégorie | Skills |
|-----------|--------|
| Engineering | `tdd-workflow` · `e2e-testing` · `security-review` · `coding-standards` |
| Frontend | `frontend-patterns` · `frontend-slides` |
| Architecture | `backend-patterns` · `deployment-patterns` · `database-migrations` · `docker-patterns` |
| AI/Agents | `agentic-engineering` · `autonomous-loops` · `eval-harness` · `continuous-learning-v2` |
| Process | `verification-loop` · `search-first` · `strategic-compact` |

## Commandes slash (`~/.claude/commands/`)

| Commande | Usage |
|----------|-------|
| `/plan` | Planification feature |
| `/tdd` | Workflow TDD |
| `/code-review` | Review du code écrit |
| `/build-fix` | Réparer le build |
| `/e2e` | Tests E2E Playwright |
| `/learn` | Extraire patterns session |
| `/verify` | Vérification complète |
| `/checkpoint` | Point de contrôle session |
| `/loop-start` · `/loop-status` | Loops autonomes |
| `/evolve` | Analyser et faire évoluer les instincts |
| `/security-scan` | Audit sécurité config Claude |
