import Phaser from 'phaser';

/**
 * BootScene : premier écran chargé.
 * Configure le jeu et lance le PreloadScene.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Charger uniquement le logo / loading bar assets ici
    // Assets complets chargés dans PreloadScene
  }

  create(): void {
    this.scene.start('PreloadScene');
  }
}
