import Phaser from 'phaser';
import { UI_COLORS } from '../constants/colors';
import { SoundManager } from '../utils/SoundManager';

export class PreloadScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    this.createLoadingUI();

    // Bus top-down spritesheet (7x7 = 49 directions) — gardé comme fallback
    this.load.spritesheet('bus-topdown', 'assets/sprites/vehicles/bus/BUS_CLEAN_ALLD0000-sheet.png', {
      frameWidth: 210,
      frameHeight: 210,
    });

    // Bus SVG profil (ligne 162 par défaut — couleur orange RATP)
    // TODO 2026-04-30: si validé, supprimer le sprite top-down ci-dessus + assets PNG
    const busSvgRight = this.buildBusSVG('#E2001A', '#fff', '162', false);
    const busSvgLeft = this.buildBusSVG('#E2001A', '#fff', '162', true);
    this.load.image('bus-svg-profile', URL.createObjectURL(new Blob([busSvgRight], { type: 'image/svg+xml' })));
    this.load.image('bus-svg-profile-left', URL.createObjectURL(new Blob([busSvgLeft], { type: 'image/svg+xml' })));

    // ─── Tiles LimeZu Modern Exteriors (pour rendu monde) ──────
    const TILE_BASE = 'assets/tiles/';
    const TILES_TO_LOAD: Array<[string, string]> = [
      // Sol
      ['tile-grass1',    `${TILE_BASE}roads/ME_Singles_Terrains_and_Fences_48x48_Grass_2_9.png`],
      ['tile-grass2',    `${TILE_BASE}roads/ME_Singles_Terrains_and_Fences_48x48_Grass_2_7.png`],
      ['tile-grass3',    `${TILE_BASE}roads/ME_Singles_Terrains_and_Fences_48x48_Grass_2_8.png`],
      // Asphalte (variations 20/22/27 = plain fill)
      ['tile-asphalt1',  `${TILE_BASE}roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png`],
      ['tile-asphalt2',  `${TILE_BASE}roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_22.png`],
      ['tile-asphalt3',  `${TILE_BASE}roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_27.png`],
      // Trottoirs
      ['tile-sidewalk1', `${TILE_BASE}roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_27.png`],
      ['tile-sidewalk2', `${TILE_BASE}roads/ME_Singles_City_Terrains_48x48_Sidewalk_2_27.png`],
      ['tile-sidewalk5', `${TILE_BASE}roads/ME_Singles_City_Terrains_48x48_Sidewalk_5_27.png`],
      // Maisons (4×5 = 192×240 px)
      ['tile-toyhouse1', `${TILE_BASE}buildings/ME_Singles_Villas_48x48_Toy_House_1.png`],
      ['tile-toyhouse2', `${TILE_BASE}buildings/ME_Singles_Villas_48x48_Toy_House_2.png`],
      ['tile-toyhouse3', `${TILE_BASE}buildings/ME_Singles_Villas_48x48_Toy_House_3.png`],
      ['tile-toyhouse4', `${TILE_BASE}buildings/ME_Singles_Villas_48x48_Toy_House_4.png`],
      ['tile-toyhouse5', `${TILE_BASE}buildings/ME_Singles_Villas_48x48_Toy_House_5.png`],
      ['tile-toyhouse6', `${TILE_BASE}buildings/ME_Singles_Villas_48x48_Toy_House_6.png`],
      // Variantes recolorées (générées par tile-tools/scripts/recolor_house.py)
      ['tile-toyhouse-blue1',  `${TILE_BASE}buildings/ME_Custom_Villas_48x48_Toy_House_Blue_1.png`],
      ['tile-toyhouse-blue2',  `${TILE_BASE}buildings/ME_Custom_Villas_48x48_Toy_House_Blue_2.png`],
      ['tile-toyhouse-yellow', `${TILE_BASE}buildings/ME_Custom_Villas_48x48_Toy_House_Yellow_1.png`],
      // Pointillés blancs centre route (asph_14 = H, asph_15 = V)
      ['tile-line-h', `${TILE_BASE}roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png`],
      ['tile-line-v', `${TILE_BASE}roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png`],
      // Arbres
      ['tile-bush1', `${TILE_BASE}parks/ME_Singles_Garden_48x48_Bush_1.png`],
      ['tile-bush2', `${TILE_BASE}parks/ME_Singles_Garden_48x48_Bush_2.png`],
      ['tile-bush3', `${TILE_BASE}parks/ME_Singles_Garden_48x48_Bush_3.png`],
      // Mobilier
      ['tile-bench-city',  `${TILE_BASE}props/ME_Singles_City_Props_48x48_Bench_1.png`],
      ['tile-pole',        `${TILE_BASE}props/ME_Singles_City_Props_48x48_Electric_Pole_1.png`],
      ['tile-trash',       `${TILE_BASE}props/ME_Singles_City_Props_48x48_Black_Closed_Trash_Can.png`],
      ['tile-info-sign',   `${TILE_BASE}props/ME_Singles_City_Props_48x48_Info_Sign_1.png`],
      ['tile-mailbox',     `${TILE_BASE}props/ME_Singles_City_Props_48x48_Mailbox_1.png`],
      // Fleurs
      ['tile-flower-r', `${TILE_BASE}parks/ME_Singles_Garden_48x48_Small_Red_Flower.png`],
      ['tile-flower-y', `${TILE_BASE}parks/ME_Singles_Garden_48x48_Small_Yellow_Flower.png`],
      ['tile-flower-p', `${TILE_BASE}parks/ME_Singles_Garden_48x48_Small_Pink_Flower.png`],
    ];
    TILES_TO_LOAD.forEach(([key, path]) => this.load.image(key, path));

    // ─── Tiled tilemap test : rond-point ───────────────────────
    this.load.image('tileset-roads', 'assets/tilesets/roads.png');
    this.load.tilemapTiledJSON('map-rondpoint', 'assets/maps/rondpoint.tmj');

    // Charger les sons
    SoundManager.preload(this);

    this.load.on('progress', (value: number) => {
      this.loadingBar.width = 400 * value;
    });
  }

  create(): void {
    this.createBusAnimations();
    this.time.delayedCall(500, () => this.scene.start('SandboxScene'));
  }

  private createLoadingUI(): void {
    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

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

  private buildBusSVG(destColor: string, textColor: string, num: string, mirror: boolean): string {
    const body = '#1abc9c';
    // On flippe toute la carrosserie via un groupe scale(-1,1), puis on dessine le texte
    // par-dessus dans le bon sens à la position miroir.
    const numX = mirror ? 160 - 104 : 104;
    const groupOpen = mirror ? '<g transform="translate(160,0) scale(-1,1)">' : '<g>';
    return `<svg viewBox="0 0 160 80" width="320" height="160" xmlns="http://www.w3.org/2000/svg">
${groupOpen}
<rect x="5" y="10" width="150" height="45" rx="4" fill="${body}"/>
<rect x="5" y="40" width="150" height="15" fill="#ecf0f1"/>
<rect x="5" y="48" width="150" height="6" fill="#7f8c8d"/>
<rect x="62" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
<rect x="70" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
<rect x="130" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
<rect x="138" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
<rect x="5" y="10" width="150" height="45" rx="4" fill="none" stroke="#111" stroke-width="2"/>
<rect x="10" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
<rect x="36" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
<rect x="84" y="14" width="40" height="21" fill="${destColor}" stroke="#111" stroke-width="1.5"/>
<rect x="150.5" y="14" width="5" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1"/>
<line x1="149" y1="24" x2="155" y2="24" stroke="#111" stroke-width="2" stroke-linecap="round"/>
<rect x="152" y="20" width="6" height="10" rx="1" fill="#111"/>
<circle cx="45" cy="54" r="10" fill="#333" stroke="#111" stroke-width="2"/>
<circle cx="45" cy="54" r="6" fill="#666"/>
<circle cx="45" cy="54" r="2" fill="#111"/>
<circle cx="115" cy="54" r="10" fill="#333" stroke="#111" stroke-width="2"/>
<circle cx="115" cy="54" r="6" fill="#666"/>
<circle cx="115" cy="54" r="2" fill="#111"/>
</g>
<text x="${numX}" y="24.5" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${num}</text>
</svg>`;
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
