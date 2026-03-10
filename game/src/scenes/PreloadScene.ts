import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants/config';
import { UI_COLORS } from '../constants/colors';

/**
 * PreloadScene : charge tous les assets du jeu.
 * Affiche une barre de chargement avec Max le bus.
 */
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    this.createLoadingUI();

    // Sprites bus
    this.load.image('bus-side', 'assets/sprites/bus-side-neutral.png');

    this.load.on('progress', (value: number) => {
      this.updateLoadingBar(value);
    });
  }

  create(): void {
    this.scene.start('HubScene');
  }

  private createLoadingUI(): void {
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;

    // Fond
    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);

    // Texte MaxPlay
    this.add.text(cx, cy - 80, 'MaxPlay', {
      fontFamily: 'Nunito',
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#1A1A1A',
    }).setOrigin(0.5);

    // Barre de chargement fond
    this.add.rectangle(cx, cy + 20, 400, 20, 0xE0E0E0).setOrigin(0.5);

    // Barre de chargement remplissage
    this._loadingBar = this.add.rectangle(cx - 200, cy + 20, 0, 20, UI_COLORS.BUTTON_PRIMARY)
      .setOrigin(0, 0.5);
  }

  private updateLoadingBar(value: number): void {
    this._loadingBar.width = 400 * value;
  }

  private _loadingBar!: Phaser.GameObjects.Rectangle;
}
