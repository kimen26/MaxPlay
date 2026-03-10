---
name: phaser-js
description: Patterns et bonnes pratiques Phaser.js 3 pour MaxPlay. Utiliser pour structurer les scènes, gérer les assets, implémenter les interactions tactiles, optimiser les performances sur tablet. Référence technique pour l'implémentation.
---

# Phaser.js 3 – Patterns MaxPlay

## Architecture des scènes

```
BootScene       → configure le jeu, lance PreloadScene
PreloadScene    → charge tous les assets, lance HubScene
HubScene        → écran principal (sélection mini-jeux)
MiniGame*Scene  → chaque mini-jeu dans sa propre scène
VictoryScene    → célébration réutilisable
```

## Pattern de scène standard

```typescript
export class MyScene extends Phaser.Scene {
  constructor() { super({ key: 'MyScene' }); }

  init(data: SceneData): void { /* recevoir paramètres */ }
  preload(): void { /* assets spécifiques à cette scène */ }
  create(): void { /* setup initial */ }
  update(): void { /* game loop - garder léger */ }
}
```

## Interactions tactiles enfant

```typescript
// Toujours setInteractive sur des zones larges
gameObject.setInteractive(
  new Phaser.Geom.Rectangle(-10, -10, width+20, height+20),
  Phaser.Geom.Rectangle.Contains
);

// Feedback visuel immédiat au tap
gameObject.on('pointerdown', () => {
  this.tweens.add({ targets: gameObject, scale: 0.92, duration: 100, yoyo: true });
});
```

## Feedback positif réutilisable

```typescript
// Composant réutilisable à créer dans src/components/Feedback.ts
playSuccess(x: number, y: number): void
playTryAgain(x: number, y: number): void
playAmbient(gameObject: Phaser.GameObjects.GameObject): void
```

## Gestion des assets

- Précharger dans PreloadScene pour éviter les freezes
- Nommer avec convention : `bus-line-2`, `stop-gare`, `icon-play`
- Utiliser des texture atlases pour les sprites animés
- Audio : OGG + MP3 en fallback

## Optimisation tablet

- `Phaser.Scale.FIT` + `CENTER_BOTH` pour adapter toutes les résolutions
- Éviter `update()` lourd – préférer les tweens et events
- `setDepth()` pour contrôler l'ordre de rendu
- Désactiver les fonctionnalités inutiles dans la config Phaser

## Ressources

- Docs Phaser 3 : https://photonstorm.github.io/phaser3-docs/
- Exemples officiels : https://phaser.io/examples
- Forum : https://phaser.discourse.group/
