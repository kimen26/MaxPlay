# MaxPlay — Jeu éducatif bus pour Max (3.5-4 ans)

## Principes (non-négociables)

- **Simplicity First** · **No Laziness** · **Minimal Impact**
- Plan mode pour toute tâche 3+ étapes ou décision archi
- Subagents pour garder le contexte principal propre
- Docs à jour = session terminée (BACKLOG.md + memory/)

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `memory/MEMORY.md` | État projet — chargé automatiquement |
| `memory/stack.md` | Stack, archi déploiement, règles bus SVG |
| `memory/rules-jeu.md` | Règles UX/péda non-négociables + designs validés |
| `memory/workflow.md` | Workflow session, doc update protocol |
| `memory/skills-map.md` | Agents, skills, commandes disponibles |
| `tasks/BACKLOG.md` | Source de vérité : épics, tâches, leçons |
| `docs/MAX_PROFILE.md` | Profil complet de Max |

## Skills disponibles

Architecture `.claude/skills/` organisée par domaine :

```
00-project/
└── maxplay-guidelines/        # Conventions projet, stack, workflow

10-story/                       # 🎭 Narration générale
├── storytelling-master/        # Structures (3 actes, Hero's Journey, Kishōtenketsu)
│                               # + cultures non-occidentales + maîtres + Pixar
└── craft-fundamentals/         # Show Don't Tell, subtexte, beats, prose

11-youth/                       # 👶 Spécifique 5-12 ans
└── youth-writing/              # Piaget, Erikson, Bowlby + sensoriel + POV + comédie

12-characters/                  # 🎭 Personnages
└── enneagramme-system/         # 9 profils (#1-#9), sans prénoms
                                # Basé sur Chabreuil — référence : SecondBrain

13-media/                       # 🎬 Trans-média
└── animation-screenplay/       # Scénario animation, 12 principes Disney

20-game-tech/                   # 🎮 Technique jeu
├── phaser-framework/           # Patterns Phaser.js 3
├── gamepad-inputs/             # 8BitDo FC30, Web Gamepad API, dual-input
├── performance-opt/            # Texture atlas, object pooling, draw calls
└── game-mechanics/             # Mécaniques adaptées 3-5 ans
```

**Règle d'utilisation** : Toujours préférer les skills projets (contexte MaxPlay) aux skills globaux.

## Workflow rapide

```
Plan → TodoWrite → Dev (subagents) → Verify → Commit → Docs
```

Après toute correction utilisateur → leçon dans `tasks/BACKLOG.md`.

## Rappels contextuels

- **Ennéagramme** : 9 profils numérotés (#1-#9), pas de prénoms définis pour l'instant
- **SecondBrain** : Référence ennéagramme complète dans `C:\Users\kimen\SecondBrain\Ressources\Enneagramme\`
- **Narration** : Privilégier Kishōtenketsu (structure sans antagoniste) pour histoires enfants
