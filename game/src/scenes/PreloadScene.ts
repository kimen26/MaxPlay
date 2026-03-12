import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants/config';
import { UI_COLORS } from '../constants/colors';

export class PreloadScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    this.createLoadingUI();

    // Bus top-down spritesheet (7x7 = 49 directions)
    this.load.spritesheet('bus-topdown', 'assets/sprites/vehicles/bus/BUS_CLEAN_ALLD0000-sheet.png', {
      frameWidth: 210,
      frameHeight: 210,
    });

    this.load.on('progress', (value: number) => {
      this.loadingBar.width = 400 * value;
    });
  }

  create(): void {
    this.createBusAnimations();
    this.time.delayedCall(500, () => this.scene.start('SandboxScene'));
  }

  private createLoadingUI(): void {
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;

    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);

    this.add.text(cx, cy - 100, '🚌 MaxPlay', {
      fontFamily: 'Nunito', fontSize: '56px', fontStyle: 'bold', color: '#1A1A1A',
    }).setOrigin(0.5);

    this.add.text(cx, cy - 40, 'Chargement...', {
      fontFamily: 'Nunito', fontSize: '24px', color: '#666666',
    }).setOrigin(0.5);

    this.add.rectangle(cx, cy + 40, 400, 24, 0xE0E0E0).setOrigin(0.5);
    this.loadingBar = this.add.rectangle(cx - 200, cy + 40, 0, 24, UI_COLORS.BUTTON_PRIMARY)
      .setOrigin(0, 0.5);
  }

  private createBusAnimations(): void {
    // 7 lignes, 7 colonnes = 49 frames (toutes les directions)
    // Frame 24 = bas, 0 = haut, etc.
    
    // Direction: Down (frame 24 = centre, ligne 4, col 4)
    this.anims.create({
      key: 'bus-down',
      frames: [{ key: 'bus-topdown', frame: 24 }],
      frameRate: 1,
    });
    
    // Direction: Up (frame 0 = haut-gauche, mais on prend le haut centre = frame 3)
    this.anims.create({
      key: 'bus-up',
      frames: [{ key: 'bus-topdown', frame: 3 }],
      frameRate: 1,
    });
    
    // Direction: Left (frame 21 = gauche)
    this.anims.create({
      key: 'bus-left',
      frames: [{ key: 'bus-topdown', frame: 21 }],
      frameRate: 1,
    });
    
    // Direction: Right (frame 27 = droite)
    this.anims.create({
      key: 'bus-right',
      frames: [{ key: 'bus-topdown', frame: 27 }],
      frameRate: 1,
    });
    
    // Diagonales
    this.anims.create({
      key: 'bus-down-left',
      frames: [{ key: 'bus-topdown', frame: 22 }],
      frameRate: 1,
    });
    
    this.anims.create({
      key: 'bus-down-right',
      frames: [{ key: 'bus-topdown', frame: 26 }],
      frameRate: 1,
    });
    
    this.anims.create({
      key: 'bus-up-left',
      frames: [{ key: 'bus-topdown', frame: 8 }],
      frameRate: 1,
    });
    
    this.anims.create({
      key: 'bus-up-right',
      frames: [{ key: 'bus-topdown', frame: 10 }],
      frameRate: 1,
    });
  }
}
