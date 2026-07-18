---
name: animation
description: Animer des personnages et véhicules 2D dans MaxPlay. Utiliser pour définir les animations nécessaires, choisir la technique (tween, spritesheet, spine), créer des effets visuels satisfaisants pour un enfant. Plusieurs approches selon le style choisi.
---

# Animation 2D – MaxPlay

## Techniques d'animation dans Phaser.js

### 1. Tweens Phaser (le plus simple – pas besoin d'assets)
Animations procédurales via l'API Phaser. Parfait pour commencer.
```typescript
// Bus qui flotte (idle)
this.tweens.add({ targets: bus, y: '-=10', duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
// Saut de victoire
this.tweens.add({ targets: bus, scaleY: 1.3, scaleX: 0.85, duration: 200, yoyo: true });
```
Avantage : zéro asset, très rapide à implémenter.
Limite : ne fait pas de vraie animation de personnage.

### 2. Spritesheet (frames dessinées)
Dessiner chaque frame dans Aseprite, exporter en spritesheet PNG.
Phaser charge et joue les frames en séquence.
```typescript
this.anims.create({ key: 'bus-drive', frames: this.anims.generateFrameNumbers('bus-sheet', { start: 0, end: 7 }), frameRate: 12, repeat: -1 });
```
Avantage : animation fluide et expressive.
Coût : il faut dessiner chaque frame.

### 3. Animation squelettale – Spine / DragonBones
Rigging d'un personnage 2D avec des os, animation des os.
- **Spine** : standard industrie, plugin Phaser officiel, ~70€
- **DragonBones** : gratuit, plugin Phaser dispo
Avantage : 1 dessin → animations infinies. Idéal pour personnages expressifs.
Coût : courbe d'apprentissage plus élevée.

## Animations prioritaires pour MaxPlay

| Animation | Technique recommandée | Priorité |
|-----------|----------------------|----------|
| Bus idle (flottement) | Tween | P0 – dès le début |
| Bus tap feedback | Tween scale | P0 – dès le début |
| Confettis victoire | Particles Phaser | P0 |
| Bus qui roule (roues) | Spritesheet simple | P1 |
| Personnage guide expressif | Spine ou Spritesheet | P2 |
| Bus klaxonne | Tween + son | P1 |

## Effets particules Phaser (confettis, étoiles)

```typescript
// Système de particules Phaser 3.60+
const particles = this.add.particles(x, y, 'confetti-particle', {
  speed: { min: 100, max: 300 },
  angle: { min: 240, max: 300 },
  scale: { start: 1, end: 0 },
  lifespan: 1500,
  quantity: 30,
  tint: [0xFF0000, 0xFFD700, 0x4CAF50, 0x2196F3],
});
particles.explode(40);
```

## Ressources

- Aseprite tutorials : https://www.aseprite.org/docs/
- DragonBones (gratuit) : https://dragonbones.github.io/
- Phaser particles doc : https://newdocs.phaser.io/docs/3.87.0/Phaser.GameObjects.Particles
- Spritesheet packer gratuit : https://www.codeandweb.com/free-sprite-sheet-packer
