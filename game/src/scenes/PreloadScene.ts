import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants/config';
import { UI_COLORS } from '../constants/colors';

/**
 * PreloadScene : charge tous les assets 48x48 Modern Exteriors
 * Barre de progression + bus animé qui charge
 */
export class PreloadScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    this.createLoadingUI();

    // === TILES 48x48 MODERN EXTERIORS ===
    
    // Routes et terrains
    this.load.image('road-asphalt', 'assets/tiles/roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_1.png');
    this.load.image('road-concrete', 'assets/tiles/roads/ME_Singles_City_Terrains_48x48_Concrete_1_Variation_1.png');
    this.load.image('sidewalk', 'assets/tiles/roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_Variation_1.png');
    this.load.image('grass', 'assets/tiles/roads/ME_Singles_Terrains_and_Fences_48x48_Ground_1_Variation_1.png');
    
    // Props urbains
    this.load.image('streetlamp', 'assets/tiles/props/ME_Singles_City_Props_48x48_Street_Lamp_1.png');
    this.load.image('bench', 'assets/tiles/props/ME_Singles_City_Props_48x48_Bench_1.png');
    this.load.image('trashcan', 'assets/tiles/props/ME_Singles_City_Props_48x48_Black_Closed_Trash_Can.png');
    this.load.image('bus-stop-sign', 'assets/tiles/props/ME_Singles_City_Props_48x48_Danger_Sign_1.png');
    this.load.image('tree', 'assets/tiles/parks/ME_Singles_Garden_48x48_Bush_1.png');
    
    // Bâtiments
    this.load.image('building-condo', 'assets/tiles/buildings/ME_Singles_Generic_Building_48x48_Condo_1_1.png');
    this.load.image('building-shop', 'assets/tiles/buildings/ME_Singles_Floor_Modular_Building_48x48_Ground_Floor_Shop_1.png');
    
    // === VÉHICULES ANIMÉS 48x48 ===
    // Bus spritesheets (4 directions)
    this.load.spritesheet('bus-anim', 'assets/tiles/animated/vehicles/Buses_48x48_1.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('bus-anim-2', 'assets/tiles/animated/vehicles/Buses_48x48_2.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    
    // Voitures
    this.load.spritesheet('car-blue', 'assets/tiles/animated/vehicles/Car_classic_blue_complete_48x48.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('car-red', 'assets/tiles/animated/vehicles/Car_classic_red_complete_48x48.png', {
      frameWidth: 48,
      frameHeight: 48,
    });

    // Progress
    this.load.on('progress', (value: number) => {
      this.updateLoadingBar(value);
    });
  }

  create(): void {
    // Créer les animations bus
    this.createBusAnimations();
    this.createCarAnimations();
    
    // Lancer le jeu après 500ms
    this.time.delayedCall(500, () => {
      this.scene.start('SandboxScene');
    });
  }

  private createLoadingUI(): void {
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;

    // Fond
    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);

    // Titre MaxPlay
    this.add.text(cx, cy - 100, '🚌 MaxPlay', {
      fontFamily: 'Nunito',
      fontSize: '56px',
      fontStyle: 'bold',
      color: '#1A1A1A',
    }).setOrigin(0.5);

    // Sous-titre
    this.add.text(cx, cy - 40, 'Chargement de la ville...', {
      fontFamily: 'Nunito',
      fontSize: '24px',
      color: '#666666',
    }).setOrigin(0.5);

    // Barre de chargement fond
    this.add.rectangle(cx, cy + 40, 400, 24, 0xE0E0E0).setOrigin(0.5);

    // Barre de chargement remplissage
    this.loadingBar = this.add.rectangle(cx - 200, cy + 40, 0, 24, UI_COLORS.BUTTON_PRIMARY)
      .setOrigin(0, 0.5);

    // Petit bus qui roule en bas
    this.add.text(cx, cy + 100, '🚍', { fontSize: '48px' }).setOrigin(0.5);
  }

  private updateLoadingBar(value: number): void {
    this.loadingBar.width = 400 * value;
  }

  private createBusAnimations(): void {
    // Animations bus (frames dépendent du spritesheet)
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
    // Voiture bleue
    this.anims.create({
      key: 'car-blue-drive',
      frames: this.anims.generateFrameNumbers('car-blue', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    // Voiture rouge
    this.anims.create({
      key: 'car-red-drive',
      frames: this.anims.generateFrameNumbers('car-red', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
