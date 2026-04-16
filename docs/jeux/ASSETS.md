# MaxPlay – Catalogue des Assets

> Source de vérité pour tous les assets graphiques du projet.
> Les fichiers bruts complets restent dans `temp/` (non versionné).
> Seuls les assets sélectionnés sont dans `game/public/assets/`.

---

## Structure des assets

```
game/public/assets/
├── bus/                          ← Bus vue latérale (side-view SVG templates)
│   ├── bus-right.svg             ← Template → {{COLOR}} et {{LINE}} injectés dynamiquement
│   └── bus-left.svg              ← Même template, direction opposée
│
└── sprites/
    ├── vehicles/
    │   ├── bus/                  ← Bus vue de dessus (top-down, MJ-07 sandbox)
    │   │   ├── bus-white-all.png ← ★ BASE → setTint() pour toutes les couleurs IDFM
    │   │   ├── bus-blue-all.png
    │   │   ├── bus-green-all.png
    │   │   ├── bus-red-all.png
    │   │   └── bus-yellow-all.png
    │   ├── special/              ← Easter eggs + décor sandbox
    │   │   ├── police-all.png
    │   │   ├── ambulance-all.png
    │   │   └── taxi-all.png
    │   └── cars/                 ← Trafic de rue (décor sandbox)
    │       ├── sedan-black-all.png
    │       ├── sedan-blue-all.png
    │       └── sedan-red-all.png
    └── characters/               ← Personnages-passagers (quiz MJ-03, décor)
        ├── archer-walk.png       ← Un archer qui prend le bus — Max adore
        ├── archer-idle.png
        ├── king-walk.png         ← Un roi dans le bus !
        ├── king-idle.png
        ├── knight-walk.png
        ├── knight-idle.png
        ├── musketeer-walk.png
        ├── musketeer-idle.png
        ├── pirate-walk.png       ← Un pirate dans le 185 !
        ├── pirate-idle.png
        ├── wizard-walk.png
        └── wizard-idle.png
```

---

## Format des sprite sheets

### Véhicules topdown (`vehicles/`)

Tous issus du même pack (cohérence visuelle garantie).

- **Format** : PNG transparent, sprite sheet composite "All Directions"
- **Contenu** : 8 directions × N frames par direction, organisées en grille
- **Directions** : N, NE, E, SE, S, SW, W, NW
- **Usage Phaser** :
  ```typescript
  this.load.spritesheet('bus-topdown', 'assets/sprites/vehicles/bus/bus-white-all.png', {
    frameWidth: <à mesurer>,
    frameHeight: <à mesurer>
  });
  // Ensuite : sprite.setTint(0x0064B1) pour la couleur de la ligne 162
  ```
- **Astuce couleurs IDFM** : utiliser `bus-white-all.png` + `setTint()` = 1 sprite pour 20 lignes

### Personnages (`characters/`)

Pack "Free Character Sprites" — style RPG fantasy side-scrolling.

- **Vue** : profil (latérale) — adapté aux jeux quiz, PAS à la sandbox top-down
- **Format** : PNG transparent, sprite sheet (frames sur une ligne)
- **Animations disponibles** : walk, idle (+ d'autres dans `temp/`)
- **Thème** : archer, roi, chevalier, mousquetaire, pirate, magicien
  → Passagers insolites dans le bus = fun garanti pour Max !
- **Usage** : icônes de passagers dans MJ-03 (compter), personnages de fond dans MJ-06

---

## Bus side-view (SVG dynamique)

Voir `game/src/utils/bus-svg.ts` pour l'API complète.

```typescript
import { createBusDataUrl } from '../utils/bus-svg';

// Bus 162 bleu, vers la droite → data URL utilisable partout
const url = createBusDataUrl('162', '#0064B1', 'right');

// Injection HTML directe
img.src = url;

// Dans Phaser (PreloadScene)
this.load.image('bus-162-right', url);
```

---

## Ce qui reste dans `temp/` (non copié)

| Dossier | Contenu | Pourquoi pas copié |
|---------|---------|-------------------|
| `BUS TOPDOWN/Black,Brown,Magenta` | 3 couleurs de bus non prioritaires | Tint sur White suffit |
| `*/MOVE/*/SEPARATED/` | Frames individuelles (12+ par direction) | Sprite sheet suffit |
| `AMBULANCE|POLICE|TAXI/MOVE/*/` | Directions individuelles | ALLD sheet suffit |
| `BOX TRUCK,CAMPER,COUPE,...` | 15 types de véhicules | Non utilisés en V0 |
| `MINIVAN,PICKUP,MUSCLECAR,...` | Idem | Non utilisés en V0 |
| `LIMO,LUXURY,SUPERCAR,SPORT` | Idem | Non utilisés en V0 |
| `Wreckage/` | Épaves de véhicules | Pas adapté jeu enfant |
| `Free Character Sprites/knight (old version)` | Version obsolète | Doublon |
| `image_samples/` | Références visuelles initiales | Archivé |

> **Note** : tous les fichiers de `temp/` peuvent être supprimés une fois que
> les assets en production sont validés. Ne pas les versionner.

---

## Lacunes identifiées (à sourcer)

| Besoin | Où trouver |
|--------|------------|
| Personnages top-down (piétons sandbox) | itch.io "top down character" (free) |
| Fond de carte Villejuif | OpenStreetMap tiles ou dessiné |
| Sons (klaxon, portes, moteur) | freesound.org |
| TTS voix FR enfant | Web Speech API (gratuit) ou ElevenLabs |
