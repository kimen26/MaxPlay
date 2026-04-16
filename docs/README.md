# docs/ — Carte de la documentation MaxPlay

> Ce dossier contient toute la documentation du projet : jeux, narration, univers, profil Max.  
> **Il ne contient aucun fichier déployé** (les jeux sont dans `game-html/`).

> **Deux pôles distincts** : voir le routing en tête de [CLAUDE.md](../CLAUDE.md).
> - **JEU** → [jeux/](jeux/)
> - **NARRATION / UNIVERS** → [narration/](narration/) et [univers/](univers/)

---

## Structure

```
docs/
│
├── README.md                  ← cette carte
│
├── MAX_PROFILE.md             ← Profil complet de Max (âge, passions, lignes connues)
├── VISION.md                  ← Décisions prises + questions ouvertes (jeux)
├── ratp-colors.json           ← Source de vérité couleurs IDFM (26 actives + 362 référentiel)
│
├── jeux/                      ← Documentation technique des mini-jeux
│   ├── GAMES_SPECS.md         ← Specs par jeu
│   ├── IMPROVEMENTS.md        ← Idées d'amélioration
│   ├── ITERATION_NOTES.md     ← Notes de sessions de dev
│   ├── game-ideas.md          ← Idées brutes de nouveaux jeux
│   ├── ASSETS.md              ← Inventaire assets visuels
│   ├── ASSETS_INVENTORY.md    ← Inventaire détaillé
│   └── AUDIO_ASSETS.md        ← Sons disponibles
│
├── narration/                 ← Projet narratif — histoires pour Max
│   ├── SYNTHESE.md            ← Vue d'ensemble du projet narration (point d'entrée)
│   ├── Eneagramme/            ← Système ennéagramme complet
│   │   ├── README.md          ← Guide du dossier ennéagramme
│   │   ├── personnages/       ← 9 fiches personnages (type-01 à type-09)
│   │   ├── situations/        ← 9 situations × 9 types (émotions universelles)
│   │   └── ressources/        ← Fondements, guide auteur, références
│   ├── analyse-personnages-manga-enneagramme.md   ← 24 persos manga analysés
│   ├── analyse-personnages-pokemon-enneagramme.md ← 30+ persos Pokémon
│   ├── analyse-pokemon-eux-memes-enneagramme.md   ← Les Pokémon eux-mêmes
│   └── enneagramme-9-niveaux-riso-hudson.md       ← 9 types × 9 niveaux de santé
│
├── univers/                   ← L'univers narratif (macro-monde des histoires)
│   ├── UNIVERS-NOTES-BRUTES.md ← Matière brute du brainstorm (session 2026-04-13)
│   └── UNIVERS-DECISIONS.md   ← (à créer) Choix actés une fois les décisions prises
│
└── (racine — fichiers historiques)
    ├── BACKLOG.md             ← Ancien backlog (source de vérité = tasks/BACKLOG.md)
    └── REFERENCES.md          ← Références externes
```

---

## Points d'entrée par intention

| Tu veux... | Aller dans... |
|-----------|--------------|
| Comprendre qui est Max | `MAX_PROFILE.md` |
| Écrire une histoire avec les personnages | `narration/SYNTHESE.md` |
| Trouver la fiche d'un personnage (Léo, Sam...) | `narration/Eneagramme/personnages/` |
| Comprendre l'univers macro (monde, histoire, rituels) | `univers/UNIVERS-NOTES-BRUTES.md` |
| Vérifier les couleurs d'une ligne de bus | `ratp-colors.json` |
| Voir les specs d'un mini-jeu | `jeux/GAMES_SPECS.md` |
| Ajouter des idées de jeux | `jeux/game-ideas.md` |

---

## Règle simple

- **`narration/`** = les personnages, leurs psychologies, comment les écrire
- **`univers/`** = le monde dans lequel ils vivent, son histoire, ses règles
- **`jeux/`** = la partie technique et game design des mini-jeux HTML
- **La racine `docs/`** = les fichiers transversaux (Max, vision, couleurs RATP)
