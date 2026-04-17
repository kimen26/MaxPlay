# MaxPlay — Jeu éducatif & Univers narratif pour Max (3.5-4 ans)

## ROUTING — lis ce bloc en premier

Le projet a 2 pôles distincts. Identifie lequel concerne la demande puis lis
**SEULEMENT** le bloc correspondant + le bloc COMMUN à la fin.

- **Mots JEU** : jeu, téléphone, MJ, mini jeu, bus, dinosaure, mécanique, Phaser,
  mj-XX, déploiement, game-html
  → lire bloc `# PÔLE JEU`

- **Mots NARRATION** : narration, histoire, personnage, environnement, univers,
  ennéagramme, Léo/Sam/Élia/Lila/Camille/Victor/Iris/Theo/Noa, post-Éveil
  → lire bloc `# PÔLE NARRATION`

Si ambigu : demande à l'utilisateur avant d'avancer.

---

# PÔLE JEU

## Principes
- **Simplicity First** · **No Laziness** · **Minimal Impact**
- Plan mode pour 3+ étapes
- Toujours `busSVG()` / `busSVGHiddenNum()` de [game-html/js/bus-svg.js](game-html/js/bus-svg.js), jamais 🚌

## Fichiers clés
| Fichier | Rôle |
|---------|------|
| [memory/stack.md](memory/stack.md) | Stack Phaser, archi déploiement, règles SVG |
| [memory/rules-jeu.md](memory/rules-jeu.md) | Règles UX/péda + designs validés |
| [tasks/BACKLOG.md](tasks/BACKLOG.md) | Source de vérité épics jeu |
| [docs/jeux/](docs/jeux/) | Specs, assets, idées |
| [game-html/](game-html/) | Mini-jeux HTML vanilla (mj-01 à mj-17) |
| [game/](game/) | Phaser build (mj-07) |

## Skills jeu
`20-game-tech/` : phaser-framework, gamepad-inputs, performance-opt, game-mechanics

## Stack & déploiement
GitHub Pages → kimen26.github.io/MaxPlay/
- `/`              → game-html/index.html (menu)
- `/mj-XX.html`    → HTML vanilla
- `/mj-07/`        → Phaser build (CI)

CI : [.github/workflows/deploy.yml](.github/workflows/deploy.yml) assemble dans `_site/` (gitignored)

## État jeux (2026-03-21)
MJ-01 à MJ-17 déployés. Voir [tasks/BACKLOG.md](tasks/BACKLOG.md) pour détail.

---

# PÔLE NARRATION

## Principes
- Privilégier **Kishōtenketsu** (sans antagoniste) pour enfants
- Ennéagramme = grille personnages (basée Chabreuil)
- Référence externe : `C:\Users\kimen\SecondBrain\Ressources\Enneagramme\`

## Fichiers clés
| Fichier | Rôle |
|---------|------|
| [docs/narration/INDEX.md](docs/narration/INDEX.md) | **Point d'entrée agent — charger en premier** |
| [docs/narration/INBOX.md](docs/narration/INBOX.md) | Dump brut sessions (hook commit auto) |
| [docs/narration/personnages/INDEX.md](docs/narration/personnages/INDEX.md) | Tableau des 9 + ⚠ prénoms |
| [docs/narration/univers/INDEX.md](docs/narration/univers/INDEX.md) | Carte du monde (monde, systèmes, cycle, vibration, compagnons) |
| [docs/narration/histoires/INDEX.md](docs/narration/histoires/INDEX.md) | Catalogue récits + gabarit |
| [docs/narration/Eneagramme/](docs/narration/Eneagramme/) | Fiches détaillées personnages + situations |
| [docs/narration/reference/INDEX.md](docs/narration/reference/INDEX.md) | Matière de fond (analyses manga/Pokémon, Riso-Hudson) |

## Skills narration
- `10-story/` : storytelling-master, craft-fundamentals
- `11-youth/` : youth-writing
- `12-characters/` : enneagramme-system
- `13-media/` : animation-screenplay

## Personnages (9, ennéagramme)
⚠ **Prénoms en cours de validation** — seul Wex (#7 héros) est confirmé.
Toujours lire [docs/narration/personnages/INDEX.md](docs/narration/personnages/INDEX.md) avant d'écrire.

## Univers
Futur proche post-Éveil. Nom non choisi (5 finalistes → [univers/nom-candidats.md](docs/narration/univers/nom-candidats.md)).
Conscience créative · Compagnons animaux · Gardiens de l'Équilibre · Totems Janus · Grand Cycle 22k ans.

## Histoires écrites
"Le Pont Cassé" (Wex/#7 + Élia/#1 + Sam/#8) — V1 complète, comité de lecture fait

---

# COMMUN (toujours pertinent)

## Profil Max
3.5-4 ans · chiffres jusqu'aux milliers · lecture phonétique · tablet tactile.
Passions : bus Villejuif, animaux, drapeaux, loups, Tayo, Totoro/Ghibli, Stitch.
Origines brésiliennes. Voir [docs/MAX_PROFILE.md](docs/MAX_PROFILE.md).

## Fichiers transversaux
| Fichier | Rôle |
|---------|------|
| [memory/MEMORY.md](memory/MEMORY.md) | État projet — chargé auto |
| [memory/workflow.md](memory/workflow.md) | Workflow session |
| [memory/skills-map.md](memory/skills-map.md) | Agents, skills, commandes |
| [docs/README.md](docs/README.md) | Carte documentation |
| [docs/MAX_PROFILE.md](docs/MAX_PROFILE.md) | Profil complet Max |

## Workflow
```
Plan → TodoWrite → Dev (subagents) → Verify → Commit → Docs
```
Après correction utilisateur → leçon dans [tasks/BACKLOG.md](tasks/BACKLOG.md).
