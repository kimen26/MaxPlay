# docs/ — Carte de la documentation MaxPlay

> Ce dossier contient toute la documentation du projet : jeux, narration, univers, profil Max.  
> **Il ne contient aucun fichier déployé** (les jeux sont dans `game/web/`).

> **Deux pôles distincts** : voir le routing en tête de [CLAUDE.md](../CLAUDE.md).
> - **JEU** → [jeux/](jeux/)
> - **NARRATION / UNIVERS** → [narration/](narration/)

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
│   ├── INDEX.md               ← Point d'entrée agent jeux (charger en premier)
│   ├── GAMES_SPECS.md         ← Specs par jeu (source de vérité)
│   ├── ASSETS.md · AUDIO_ASSETS.md ← Assets visuels et sons
│   ├── game-ideas.md          ← Idées brutes de nouveaux jeux
│   └── IMPROVEMENTS.md · ITERATION_NOTES.md ← Historique
│
└── narration/                 ← Projet narratif — histoires pour Max
    ├── INDEX.md               ← Point d'entrée agent narration (charger en premier)
    ├── INBOX.md               ← Dump brut sessions (hook commit auto)
    ├── pmo/                   ← Gestion de projet (backlog, decisions, sprint-log)
    ├── personnages/           ← Tableau des 9 + prénoms
    │   ├── INDEX.md           ← Casting + état de validation prénoms
    │   ├── notation-types.md
    │   ├── prénoms-candidats.md
    │   ├── prénoms-par-origine.md
    │   └── prénoms-brainstorm-cultures.md
    ├── univers/               ← Carte du monde post-Éveil
    │   ├── INDEX.md           ← Vue d'ensemble univers
    │   ├── monde.md · systemes.md · grand-cycle.md
    │   ├── vibration.md · compagnons.md · baron.md
    │   ├── nom-candidats.md   ← 5 finalistes nom de l'univers
    │   └── directions-brainstorm.md
    ├── stories/               ← Catalogue des récits (1 dossier par histoire)
    │   ├── INDEX.md           ← Catalogue (auto-généré)
    │   ├── _gabarit/          ← Dossier-modèle à copier
    │   ├── 001-le-pont-casse/ ← V1 complète + comité lu + archives
    │   └── axes-histoires-en-stock.md
    ├── enneagramme/            ← Système ennéagramme complet
    │   ├── README.md
    │   ├── personnages/       ← 9 fiches type-01 à type-09
    │   ├── situations/        ← émotions-universelles · interactions
    │   └── ressources/        ← fondements · guide-auteur · references · supplement
    ├── reference/             ← Matière de fond (analyses manga/Pokémon, Riso-Hudson)
    │   ├── INDEX.md
    │   ├── analyse-personnages-manga-enneagramme.md
    │   ├── analyse-personnages-pokemon-enneagramme.md
    │   ├── analyse-pokemon-eux-memes-enneagramme.md
    │   └── enneagramme-9-niveaux-riso-hudson.md
    ├── equipe/                ← Mémoires agents + organigramme éditorial
    │   ├── ORGANIGRAMME.md
    │   ├── memoire-conseiller.md · memoire-architecte.md · memoire-dir.md · memoire-gatekeeper.md
    │   ├── memoire-science.md · memoire-sensibilite.md
    │   ├── profils-lecteurs.md
    │   └── sources-sciences.md · sources-sensibilite.md
    ├── INBOX.md           ← Zone de dump brut idées narration
    └── archive/               ← Matière archivée
```

---

## Points d'entrée par intention

| Tu veux... | Aller dans... |
|-----------|--------------|
| Comprendre qui est Max | `MAX_PROFILE.md` |
| Écrire une histoire avec les personnages | `narration/INDEX.md` |
| Trouver la fiche d'un personnage (Wex, Melki, Juju...) | `narration/personnages/INDEX.md` |
| Comprendre l'univers macro (monde, histoire, rituels) | `narration/univers/INDEX.md` |
| Vérifier les couleurs d'une ligne de bus | `ratp-colors.json` |
| Voir les specs d'un mini-jeu | `jeux/GAMES_SPECS.md` |
| Ajouter des idées de jeux | `jeux/game-ideas.md` |

---

## Règle simple

- **`narration/`** = les personnages, leurs psychologies, comment les écrire, l'univers
- **`jeux/`** = la partie technique et game design des mini-jeux HTML
- **La racine `docs/`** = les fichiers transversaux (Max, vision, couleurs RATP)
