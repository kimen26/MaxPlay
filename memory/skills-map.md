---
name: Skills et agents disponibles MaxPlay
description: Carte de tous les skills, agents et commandes disponibles et quand les utiliser
type: reference
---

## Agents spécialisés MaxPlay (`.claude/agents/`)

### Équipe Narrative

| Agent | Modèle | Utiliser quand |
|-------|--------|----------------|
| `narration` | Opus | Directeur éditorial — orchestration narration, histoires, personnages, briefs, synthèse |
| `narration-pmo` | Haiku | Gestion projet narration — tickets, backlog, sprint-log, traçabilité |
| `narration-writer-claude-libre` | Sonnet | Writer angle libre, instinctif, stateless |
| `narration-writer-claude-ancre` | Sonnet | Writer avec mémoire inter-histoires, continuité éditoriale |
| `narration-keeper` | Haiku | Validation finale PASS/FAIL — ennéagramme, univers, prénoms, structure |
| `narration-archiviste` | Haiku | Index, structure dossiers, YAML, génération `_index/` |
| `narration-science` | Haiku | Expert sciences — biorésonance, physique, validation factuelle |
| `narration-sensibilite` | Sonnet | Expert sensibilité lecteurs — topics sensibles, complotisme, polarisation |
| `narration-lecteur` | Sonnet | Lecteur témoin — simule un profil injecté par le Directeur |
| `narration-showrunner` | Sonnet | Cohérence de série — arcs longs, callbacks, évolution personnages |
| `narration-audio` | Sonnet | Brief audio par histoire — rythme, pauses, intonation, voix ElevenLabs |
| `narration-lecteur-dyade` | Sonnet | Simulation lecture parent-enfant à voix haute — friction, improvisation |
| `narration-localisation` | Sonnet | Adaptation culturelle — variantes cross-country, prénoms, rituels |

### Équipe Jeu

| Agent | Modèle | Utiliser quand |
|-------|--------|----------------|
| `game-dev` | Sonnet | Développement jeux HTML vanilla + Phaser |
| `quick` | Haiku | Questions rapides, status, recherches légères |

> **Agents obsolètes (archivés dans `.claude/agents/archive/`) :** `narration-writer-a`, `narration-writer-b`, `narration-writer-c`

> Agents globaux disponibles (`~/.claude/agents/`) : planner, architect, code-reviewer, tdd-guide, security-reviewer, build-error-resolver, refactor-cleaner, e2e-runner, doc-updater

## Writers externes (stateless — contexte injecté à chaque appel)

| Modèle | Version cible | Angle assigné | Rôle principal |
|--------|--------------|---------------|----------------|
| **Kimi 1** | 2.6+ (no reasoning) | Sobre / Kishōtenketsu classique | Writer |
| **Kimi 2** | 2.6+ (no reasoning) | Sensoriel / poétique / textures | Writer |
| **DeepSeek 1** | latest (no reasoning) | Sobre / Kishōtenketsu classique | Writer |
| **DeepSeek 2** | latest (no reasoning) | Sensoriel / atmosphère / matières | Writer |
| **Grok** | latest (no reasoning) | Dynamique / dialogues / rythme | Writer |

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

### Génériques (depuis claude_conf)
| Skill | Utiliser quand |
|-------|----------------|
| `deep-research` | Recherche profonde multi-sources (académique, praticiens, voix non-conventionnelles) |
| `impact` | Pédagogie, storytelling, persuasion, gamification, facilitation, ennéagramme, instructional design |
| `lettre-recommandation` | Générer une lettre de recommandation professionnelle au format Word |
| `linkedin-cv-tech` | Optimiser LinkedIn et CV tech/IA/data/no-code |
| `markdown-lisibilite` | Améliorer la lisibilité visuelle d'un document Markdown |
| `n8n-website` | Générer un site HTML hébergé via webhook n8n |
| `prompt-craft` | Créer, améliorer ou debugger un prompt (générique + Snowflake Cortex Agent) |
| `qwen3-tts` | Utiliser Qwen3 avec TTS / génération audio |

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
