---
name: Skills et agents disponibles MaxPlay
description: Carte de tous les skills, agents et commandes disponibles et quand les utiliser
type: reference
---

## Agents spécialisés MaxPlay (`.claude/agents/`)

### Équipe Narrative

| Agent | Modèle | Utiliser quand |
|-------|--------|----------------|
| `narration` | Opus | Directeur éditorial — sélection, rewrite, validation finale |
| `narration-pmo` | Haiku | Gestion projet narration — tickets, backlog, sprint-log, traçabilité |
| `narration-writer-claude-libre` | Sonnet | Writer angle libre, instinctif, stateless |
| `narration-conseiller` | Opus | Binôme créatif — challenge, pitch, carte narrative |
| `narration-architecte` | Sonnet | Plan d'Histoire — structure, persos, contraintes |
| `narration-gatekeeper` | Haiku | Validation finale PASS/FAIL — ennéagramme, univers, prénoms, structure |
| *(narration-archiviste fusionné dans `narration-pmo` le 2026-07-19)* | — | — |
| `narration-science` | Haiku | Expert sciences — biorésonance, physique, validation factuelle |
| `narration-sensibilite` | Sonnet | Expert sensibilité lecteurs — topics sensibles, complotisme, polarisation |
| `narration-lecteur` | Sonnet | Lecteur témoin enfant — réaction émotionnelle pure |
| `narration-lecteur-dyade` | Sonnet | Lecteur témoin dyade parent-enfant — friction, improvisation |
| `narration-audio` | Sonnet | Brief audio par histoire — rythme, pauses, intonation, voix ElevenLabs |
| `narration-lecteur-dyade` | Sonnet | Simulation lecture parent-enfant à voix haute — friction, improvisation |
| `narration-localisation` | Sonnet | Adaptation culturelle — variantes cross-country, prénoms, rituels |

### Équipe Jeu

| Agent | Modèle | Utiliser quand |
|-------|--------|----------------|
| `game-dev` | Sonnet | Développement jeux HTML vanilla + Phaser |
| `game-pmo` | Sonnet | **PMO unifié pôle JEU** (fusion PMO+archiviste+sous-PMO tile/mj 2026-07-19) — FOND + FORME + domaines. Clôture session, audit, mode RECHERCHE. La capture immédiate des idées reste au main agent. |
| `game-tile-simplifier` | Sonnet | **Sachant tile #1/3** — analyste de scène. Image/desc → ANALYSE structurée pour designer. Connaît 30+ LESSONS LimeZu. |
| `game-tile-designer` | Sonnet | **Sachant tile #2/3** — constructeur recettes Python. ANALYSE → `recipes/test_<nom>.py` + PNG render + auto-inspection. |
| `game-tile-reviewer` | Haiku | **Sachant tile #3/3** — contrôleur qualité. Verdict PASS/FAIL avec issues CRITIQUE/HAUTE/MOYENNE/BASSE. Max 5 iter. |
| `game-conseiller` | Opus | **Binôme créatif pôle JEU (transverse)** — ta voix, force de proposition, challenge, pont entre les 3 sous-domaines (MJ, tile, WexWorld). Équivalent narration-conseiller côté jeu. |
| `game-mj-reviewer` | Haiku | **Sachant validateur MJ pré-livraison** — checklist hardcodée 5 sections (Bus & couleurs / UX 3.5-4 ans / Audio / Technique / Vocab & péda). Verdict PASS/FAIL. Max 5 iter. |
| `quick` | Haiku | Questions rapides, status, recherches légères |

### Équipe Dino (pôle transverse — créé 2026-06-03)

> Encyclopédie dino + voyage dans le temps. Code déployé dans `site/` (dev-dinos, dinos-data, audio/dinos, img/dinos), gouvernance dans `studio/dino/`. Lié par [`.claude/rules/dino.md`](../.claude/rules/dino.md). Audit : `/dino-pmo-audit` (FOND + FORME, fusion 2026-07-19).

| Agent | Modèle | Utiliser quand |
|-------|--------|----------------|
| `dino-pmo` | Sonnet | **PMO unifié pôle DINO** (fusion PMO+archiviste 2026-07-19) — FOND + FORME, surveille aussi le code dino déployé dans `site/`. Clôture, audit, RECHERCHE. |
| `dino-conseiller` | Sonnet | **Binôme créatif DINO** — écriture récits/fiches, péda 4 ans, fact-check Grokipedia, taxonomie, écriture audio narrée. |

> **Anciens agents supprimés :** `narration-writer-a`, `narration-writer-b`, `narration-writer-c`, `narration-writer-claude-ancre`, `narration-keeper`, `narration-showrunner`

> Agents globaux disponibles (`~/.claude/agents/`) : planner, architect, code-reviewer, tdd-guide, security-reviewer, build-error-resolver, refactor-cleaner, e2e-runner, doc-updater

## Writers externes (stateless — contexte injecté à chaque appel)

| Angle | Modèle possible | Rôle |
|-------|-----------------|------|
| **A — Sobre** (Kishōtenketsu rigoureux, gestes, narration sobre) | Kimi / DeepSeek | Writer |
| **B — Sensoriel** (textures, matières, poésie du concret) | Kimi / DeepSeek | Writer |
| **C — Dynamique** (dialogues vifs, rythme, échanges rapides) | Grok | Writer |
| **D — Instinct/Libre** (angle libre, surprise, ton auteur) | Claude Libre (`narration-writer-claude-libre`) | Writer |

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
| `maxplay-tiles` | Tileset LimeZu Modern Exteriors — méthode militaire, cartographie, voisinage, pattern modulaire bas/milieu/haut. Outils : [`site/tools/index.html`](../site/tools/index.html) (hub) → mockups-routes (échelle uniforme) + tile-library-v3 (patterns) + tile-picker (matrice drag&drop, supporte `?recipe=X.py`). Workflow Propose → Édite → Apprend avec sous-agent [`game-tile-pmo`](../.claude/agents/game-tile-pmo.md) (parent : [`game-pmo`](../.claude/agents/game-pmo.md)). Mini-jeu kids : [`mj-pose-tiles.html`](../site/mj-pose-tiles.html). |

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
| **🎙️ Audio / Voix ElevenLabs** | **`elevenlabs-voice-design`** (création voix : prompts Voice Design, multilingue, voice cloning) · **`audio-direction-elevenlabs`** (production multi-voix : text-to-dialogue API, tags v3 catalogués, tricks de graphie, pronunciation dicts, voice settings, 14 anti-patterns, 12 cultures préparées) |
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
