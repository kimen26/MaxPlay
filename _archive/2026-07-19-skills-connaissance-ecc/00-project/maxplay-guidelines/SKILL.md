---
name: maxplay-guidelines
description: Guidelines et conventions du projet MaxPlay — stack technique, structure des dossiers, workflow de développement, conventions de nommage.
triggers:
  - maxplay guidelines
  - stack technique
  - structure projet
  - conventions maxplay
  - workflow
---

# MaxPlay Guidelines — Conventions du Projet

## 🏗️ Architecture des Skills

### Structure actuelle

```
.claude/skills/
├── 00-project/
│   └── maxplay-guidelines/         # Ce fichier — conventions projet
│
├── 10-story/
│   ├── storytelling-master/        # Structures narratives, cultures, maîtres, Pixar
│   └── craft-fundamentals/         # Show don't tell, subtexte, beats, prose
│
├── 11-youth/
│   └── youth-writing/              # Psychologie 5-12 ans, sensoriel, POV, comédie
│
├── 12-characters/
│   └── enneagramme-system/         # 9 profils — Profil #1 à #9 (sans prénoms)
│
├── 13-media/
│   └── animation-screenplay/       # Scénario animation, 12 principes Disney
│
└── 20-game-tech/
    ├── phaser-framework/           # Patterns Phaser.js 3
    ├── gamepad-inputs/             # Manette 8BitDo, Web Gamepad API
    ├── performance-opt/            # Optimisation, texture atlas, pooling
    └── game-mechanics/             # Mécaniques 3-5 ans, game design
```

---

## ⚙️ Stack Technique

### Frontend
- **Phaser.js 3** — Moteur de jeu HTML5
- **TypeScript** — Typage statique
- **Vite** — Build tool rapide

### Assets
- **PNG** — Sprites (optimisés avec pngquant)
- **OGG + MP3** — Audio (fallback)
- **Texture Atlases** — Free Texture Packer

### Plateformes cibles
- **Tablet** : iPad Air, Samsung Tab A (priorité)
- **Desktop** : Chrome, projecteur + manette
- **Mobile** : Chrome mobile (fallback)

---

## 🎯 Conventions de Nommage

### Assets
```
# Sprites
bus-line-{number}.png      # bus-line-2, bus-line-4
stop-{name}.png            # stop-gare, stop-ecole
icon-{action}.png          # icon-play, icon-pause

# Audio
sfx-{action}.ogg           # sfx-success, sfx-tap
bgm-{context}.ogg          # bgm-hub, bgm-minigame

# Atlases
{scene}-atlas.{png,json}   # hub-atlas, bus-game-atlas
```

### Code TypeScript
```typescript
// Classes : PascalCase
class BusMiniGame extends Phaser.Scene { }

// Variables : camelCase
private busSpeed: number = 100;

// Constantes : UPPER_SNAKE_CASE
const MAX_BUSES = 64;

// Interfaces : PascalCase + I optionnel
interface GameConfig { }

// Scènes : suffixe Scene
class HubScene extends Phaser.Scene { }
```

---

## 🔄 Workflow de Développement

### Structure des scènes Phaser
```typescript
export class MyScene extends Phaser.Scene {
  constructor() { super({ key: 'MyScene' }); }

  init(data: SceneData): void { /* recevoir paramètres */ }
  preload(): void { /* assets spécifiques */ }
  create(): void { /* setup initial */ }
  update(): void { /* game loop - garder léger */ }
}
```

### Architecture des scènes
```
BootScene       → configure le jeu
PreloadScene    → charge tous les assets
HubScene        → écran principal (sélection)
MiniGame*Scene  → chaque mini-jeu
VictoryScene    → célébration réutilisable
```

---

## 📏 Standards de Performance

### Budgets
- **Draw calls** : < 50 par frame
- **Objets actifs** : < 500 par scène
- **Mémoire JS heap** : < 100MB
- **FPS** : 30 minimum (60 idéal)

### Checklist avant commit
- [ ] Pas d'allocation dans update()
- [ ] Assets dans atlas par scène
- [ ] Palette swap utilisé si variantes de couleur
- [ ] Object pooling pour effets récurrents
- [ ] Audio sprite pour les petits sons

---

## 🎨 Conventions Narratives

### Personnages
- **Profil #1 à #9** : 9 types ennéagramme (sans prénoms pour l'instant)
- **Âge cible** : 5-12 ans (progression sur plusieurs saisons)
- **Pas de méchant** : Conflits internes, situations, pas d'antagoniste externe

### Histoires
- **Format** : Épisodes 5-11 minutes
- **Structure** : Kishōtenketsu ou 3 actes adapté
- **Thèmes** : Amitié, courage, différence sans moralisme explicite

---

## 🔗 Liens Utiles

- **Phaser 3 Docs** : https://photonstorm.github.io/phaser3-docs/
- **Phaser Examples** : https://phaser.io/examples
- **Grand Livre Ennéagramme** (Chabreuil) : Référence personnages
- **SecondBrain** : `C:\Users\kimen\SecondBrain\Ressources\Enneagramme`

---

*MaxPlay Guidelines — Conventions et workflow du projet*
