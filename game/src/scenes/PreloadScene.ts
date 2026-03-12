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

    // === VÉHICULES ANIMÉS (seuls assets externes fiables) ===
    this.load.spritesheet('bus-anim', 'assets/tiles/animated/vehicles/Buses_48x48_1.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    
    this.load.spritesheet('car-blue', 'assets/tiles/animated/vehicles/Car_classic_blue_complete_48x48.png', {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.on('progress', (value: number) => {
      this.loadingBar.width = 400 * value;
    });
  }

  create(): void {
    this.createBusAnimations();
    this.createCarAnimations();
    
    this.time.delayedCall(500, () => {
      this.scene.start('SandboxScene');
    });
  }

  private createLoadingUI(): void {
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;

    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);

    this.add.text(cx, cy - 100, '🚌 MaxPlay', {
      fontFamily: 'Nunito',
      fontSize: '56px',
      fontStyle: 'bold',
      color: '#1A1A1A',
    }).setOrigin(0.5);

    this.add.text(cx, cy - 40, 'Chargement...', {
      fontFamily: 'Nunito',
      fontSize: '24px',
      color: '#666666',
    }).setOrigin(0.5);

    this.add.rectangle(cx, cy + 40, 400, 24, 0xE0E0E0).setOrigin(0.5);
    this.loadingBar = this.add.rectangle(cx - 200, cy + 40, 0, 24, UI_COLORS.BUTTON_PRIMARY)
      .setOrigin(0, 0.5);

    this.add.text(cx, cy + 100, '🚍', { fontSize: '48px' }).setOrigin(0.5);
  }

  private createBusAnimations(): void {
    this.anims.create({
      key: 'bus-idle-down',
      frames: [{ key: 'bus-anim', frame: 0 }],
      frameRate: 1,
      repeat: -1,
    });
    
    this.anims.create({
      key: 'bus-drive-down',
      frames: this.anims.generateFrameNumbers('bus-anim', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'bus-drive-up',
      frames: this.anims.generateFrameNumbers('bus-anim', { start: 3, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'bus-drive-left',
      frames: this.anims.generateFrameNumbers('bus-anim', { start: 6, end: 8 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'bus-drive-right',
      frames: this.anims.generateFrameNumbers('bus-anim', { start: 9, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  private createCarAnimations(): void {
    this.anims.create({
      key: 'car-blue-drive',
      frames: this.anims.generateFrameNumbers('car-blue', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
