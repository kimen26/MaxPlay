# MaxPlay — Jeu éducatif & Univers narratif pour Max (3.5-4 ans)

## ACTION OBLIGATOIRE — avant toute réponse

**Étape 1 — Identifier le pôle :**

| Mots dans la demande | Pôle | Lire ensuite |
|----------------------|------|-------------|
| jeu · MJ · mini-jeu · bus · Phaser · mj-XX · déploiement · game-html | **JEU** | `memory/state-jeu.md` → `tasks/BACKLOG.md` |
| narration · histoire · personnage · univers · ennéagramme · Wex/Melki/Mimi/Polo/Jérem/Lulu/Pierrot/Raph/Juju/Nono | **NARRATION** | `docs/narration/pmo/INDEX.md` → `docs/narration/INDEX.md` |
| idée brute · dump · brainstorm sans contexte clair | **?** | Poser la question : "C'est pour le jeu ou pour les histoires ?" |

**Étape 2 — Annoncer avant d'agir :**
Dire en 1 ligne : *"Mode [JEU/NARRATION] — je charge [fichier] puis j'agis."*
Ne jamais répondre sans avoir chargé le contexte du bon pôle.

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
| [game-html/](game-html/) | Mini-jeux HTML vanilla (mj-01 à mj-20) |
| [game/](game/) | Phaser build (max-adventure) |

## Skills jeu
`20-game-tech/` : phaser-framework, gamepad-inputs, performance-opt, game-mechanics

## Stack & déploiement
GitHub Pages → kimen26.github.io/MaxPlay/
- `/`              → game-html/index.html (menu)
- `/mj-XX.html`    → HTML vanilla
- `/mj-07/`        → Phaser build (CI)

CI : [.github/workflows/deploy.yml](.github/workflows/deploy.yml) assemble dans `_site/` (gitignored)

## État jeux
→ [memory/state-jeu.md](memory/state-jeu.md) — déployés, bugs actifs, backlog (toujours à jour)

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
| [docs/narration/stories/INDEX.md](docs/narration/stories/INDEX.md) | Catalogue récits + gabarit |
| [docs/narration/Eneagramme/](docs/narration/Eneagramme/) | Fiches détaillées personnages + situations |
| [docs/narration/reference/INDEX.md](docs/narration/reference/INDEX.md) | Matière de fond (analyses manga/Pokémon, Riso-Hudson) |

## Skills narration
- `10-story/` : storytelling-master, craft-fundamentals
- `11-youth/` : youth-writing
- `12-characters/` : enneagramme-system
- `13-media/` : animation-screenplay

## État narration
→ [memory/state-narration.md](memory/state-narration.md) — histoires, casting, workflow, agents (toujours à jour)

## Personnages
Casting V1 "Christ" **figé** (2026-04-24). Wex (héros hors-système) + 9 compagnons ennéagramme.
Toujours lire [docs/narration/personnages/INDEX.md](docs/narration/personnages/INDEX.md) avant d'écrire.

---

# COMMUN (toujours pertinent)

## Profil Max
3.5-4 ans · chiffres jusqu'aux milliers · lecture phonétique · tablet tactile.
Passions : bus Villejuif, animaux, drapeaux, loups, Tayo, Totoro/Ghibli, Stitch.
Origines brésiliennes. Voir [docs/MAX_PROFILE.md](docs/MAX_PROFILE.md).

## Fichiers transversaux
| Fichier | Rôle |
|---------|------|
| [memory/state-jeu.md](memory/state-jeu.md) | **État jeux** — déployés, bugs, backlog |
| [memory/state-narration.md](memory/state-narration.md) | **État narration** — histoires, casting, agents |
| [memory/MEMORY.md](memory/MEMORY.md) | Mémoire projet dense (archi, décisions historiques) |
| [memory/workflow.md](memory/workflow.md) | Workflow session |
| [memory/skills-map.md](memory/skills-map.md) | Agents, skills, commandes |
| [docs/README.md](docs/README.md) | Carte documentation |
| [docs/MAX_PROFILE.md](docs/MAX_PROFILE.md) | Profil complet Max |
| [bot/index.ts](bot/index.ts) | Bot Telegram — routing agents, permissions Telegram |
| [.claude/agents/](.claude/agents/) | **Équipe narration** : narration-conseiller (Opus) · narration-architecte (Sonnet) · narration (Opus) · narration-writer-claude-libre (Sonnet) · narration-gatekeeper (Haiku) · narration-pmo (Haiku) · science/sensibilite/archiviste (Haiku/Sonnet) · game-dev (Sonnet) · quick (Haiku) |
| [docs/narration/equipe/ORGANIGRAMME.md](docs/narration/equipe/ORGANIGRAMME.md) | Organigramme équipe éditoriale — qui fait quoi |
| [docs/narration/input-idees/](docs/narration/input-idees/) | Zone de dump brut idées narration |
| [docs/narration/pmo/INDEX.md](docs/narration/pmo/INDEX.md) | PMO — tickets, décisions, sprint-log (reprise après reboot) |

## Workflow
```
Plan → TodoWrite → Dev (subagents) → Verify → Commit → Docs
```
Après correction utilisateur → leçon dans [tasks/BACKLOG.md](tasks/BACKLOG.md).
