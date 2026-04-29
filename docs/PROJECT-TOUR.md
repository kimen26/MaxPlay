# PROJECT-TOUR.md

> Vue d'ensemble du projet MaxPlay pour nouveaux contributeurs et agents.
> Dernière mise à jour : 2026-04-29

---

## Qu'est-ce que MaxPlay ?

MaxPlay est un **écosystème éducatif** pour enfants (3-8 ans) centré sur :
- Un **personnage principal** (Max, 4 ans) et son univers
- Des **mini-jeux** (tri de bus, dépanneuse, dinosaures...)
- Une **narration** (histoires courtes pour enfants)
- Un **bot Telegram** (compagnon de jeu pour Max)

Le projet est découpé en plusieurs modules qui communiquent via des conventions de fichiers.

---

## Structure des dossiers

```
MaxPlay/
├── .claude/agents/          ← Équipe d'agents IA (narration, jeu, etc.)
├── bot/                     ← Bot Telegram (Node.js + TypeScript)
├── docs/                    ← Documentation et narration
│   ├── narration/           ← Univers, histoires, personnages
│   │   ├── equipe/          ← Organigramme, mémoires, briefs
│   │   ├── stories/         ← Histoires canonisées
│   │   ├── workshop/        ← Histoires en cours d'écriture
│   │   ├── input-idees/     ← Dump brut d'idées
│   │   └── pmo/             ← Tickets, backlog, sprint-log
│   ├── jeux/                ← Design des mini-jeux
│   └── audit/               ← Audits passés
├── game/                    ← Jeu web (Vite + TypeScript)
├── game-html/               ← Prototypes HTML/CSS/JS
├── memory/                  ← Mémoire projet, workflow, skills-map
├── scripts/                 ← Scripts Node.js (validation, index...)
└── tasks/                   ← Backlog global
```

---

## Équipe Narration (agents)

| Agent | Rôle | Modèle | Mémoire |
|-------|------|--------|---------|
| `narration-conseiller` | Binôme créatif — challenge, pitch, carte narrative | Opus | `memoire-conseiller.md` |
| `narration-architecte` | Plan d'Histoire — structure, persos, contraintes | Sonnet | `memoire-architecte.md` |
| `narration` | Directeur — sélection, rewrite, validation | Opus | `memoire-dir.md` |
| `narration-writer-claude-libre` | Writer angle libre | Sonnet | — |
| `narration-gatekeeper` | Validation finale checklist | Haiku | `memoire-gatekeeper.md` |
| `narration-pmo` | Gestion projet — tickets, backlog | Haiku | `pmo/` |
| `narration-archiviste` | Index, structure, YAML | Haiku | — |
| `narration-science` | Expert sciences | Haiku | `memoire-science.md` |
| `narration-sensibilite` | Expert sensibilité | Sonnet | `memoire-sensibilite.md` |
| `narration-lecteur` | Lecteur témoin enfant | Sonnet | — |
| `narration-lecteur-dyade` | Lecteur témoin dyade | Sonnet | — |
| `narration-audio` | Brief audio | Sonnet | — |
| `narration-localisation` | Adaptation culturelle | Sonnet | — |

**Workflow narration :**
```
Idée → Conseiller (pitch) → Architecte (Plan) → 4 Writers → Lecteurs → Directeur (sélection + rewrite) → GateKeeper → Version finale
```

---

## Équipe Jeu

| Agent | Rôle |
|-------|------|
| `game-dev` | Développement des mini-jeux |

---

## Points d'entrée

| Tu veux... | Va voir... |
|------------|-----------|
| Comprendre l'équipe narration | `docs/narration/equipe/ORGANIGRAMME.md` |
| Comprendre le process d'écriture | `docs/narration/equipe/PROCESS.md` |
| Dumper une idée | `docs/narration/input-idees/` |
| Voir les histoires existantes | `docs/narration/stories/INDEX.md` |
| Comprendre Max | `docs/MAX_PROFILE.md` |
| Voir le workflow agent | `memory/workflow.md` |
| Voir la carte des agents | `memory/skills-map.md` |
| Voir le backlog | `tasks/BACKLOG.md` |

---

## Règles rapides

- **Rien ne s'efface** — on archive, on ne supprime pas
- **Un INDEX ne contient jamais de contenu** — seulement des pointeurs
- **Les décisions figées vont dans `pmo/decisions.md`**
- **Les idées brutes vont dans `input-idees/YYYY-MM-DD-sujet.md`**
