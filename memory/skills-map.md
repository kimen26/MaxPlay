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

### 00-project — Meta
| Skill | Utiliser quand |
|-------|----------------|
| `maxplay-guidelines` | Conventions projet, stack technique, workflow |

### 10-story — Narration générale
| Skill | Utiliser quand |
|-------|----------------|
| `storytelling-master` | Structures narratives (3 actes, Hero's Journey, Save the Cat, Kishōtenketsu), cultures non-occidentales, maîtres du cinéma, Pixar |
| `craft-fundamentals` | Show Don't Tell, subtexte, scènes/séquelles, beats émotionnels, prose |

### 11-youth — Écriture 5-12 ans
| Skill | Utiliser quand |
|-------|----------------|
| `youth-writing` | Psychologie développement (Piaget, Erikson, Bowlby), narration sensorielle, POV enfant, humour par âge |

### 12-characters — Personnages
| Skill | Utiliser quand |
|-------|----------------|
| `enneagramme-system` | 9 profils de personnalité (#1-#9), création personnages cohérents — **PAS DE PRÉNOMS pour l'instant** |

### 13-media — Trans-média
| Skill | Utiliser quand |
|-------|----------------|
| `animation-screenplay` | Scénario animation, 12 principes Disney, narration sans antagoniste, formats court/moyen/long |

### 20-game-tech — Technique jeu
| Skill | Utiliser quand |
|-------|----------------|
| `phaser-framework` | Patterns Phaser.js 3, architecture scènes, interactions tactiles |
| `gamepad-inputs` | Manette 8BitDo FC30, Web Gamepad API, dual-input manette+tactile |
| `performance-opt` | **PROACTIF** — optimisation assets, texture atlas, object pooling, draw calls |
| `game-mechanics` | Mécaniques jeu 3-5 ans, level design, difficulté adaptative |

### Business/Content (existants)
| Skill | Utiliser quand |
|-------|----------------|
| `article-writing` | Rédaction articles, publications |
| `content-engine` | Stratégie contenu, calendrier éditorial |
| `investor-materials` | Pitch deck, fundraising materials |
| `investor-outreach` | Emails investisseurs, networking |
| `market-research` | Recherche marché, competitors |

## Skills globaux (`~/.claude/skills/`)

| Catégorie | Skills |
|-----------|--------|
| Engineering | `tdd-workflow` · `e2e-testing` · `security-review` · `coding-standards` · `python-testing` · `plankton-code-quality` |
| Frontend | `frontend-patterns` · `frontend-slides` |
| Backend | `backend-patterns` · `api-design` |
| Architecture | `deployment-patterns` · `database-migrations` · `docker-patterns` |
| AI/Agents | `agentic-engineering` · `agent-harness-construction` · `autonomous-loops` · `eval-harness` · `continuous-learning-v2` · `enterprise-agent-ops` |
| Process | `verification-loop` · `search-first` · `strategic-compact` · `iterative-retrieval` |

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

## Références externes

| Ressource | Chemin |
|-----------|--------|
| Ennéagramme (Chabreuil) | `C:\Users\kimen\SecondBrain\Ressources\Enneagramme\` |
| Grand Livre complet | `SecondBrain\Ressources\Enneagramme\GrandLivreDeLEnneagramme\` |
