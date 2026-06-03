import Phaser from 'phaser';

/**
 * RondPointScene : Test pipeline Tiled .tmj -> Phaser tilemap.
 *
 * Charge tilesheet roads.png + map rondpoint.tmj (genere par tile-tools/scripts/build_*).
 * Rend la map en 2 tilemap layers (ground + objects) au lieu de N add.image() individuels.
 *
 * Touche ESC pour revenir au Hub.
 */
export class RondPointScene extends Phaser.Scene {
  constructor() {
    super({ key: 'RondPointScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#3d7a3d');

    const map = this.make.tilemap({ key: 'map-rondpoint' });
    const tileset = map.addTilesetImage('roads', 'tileset-roads');

    if (!tileset) {
      this.add.text(20, 20, 'ERREUR : tileset roads introuvable', {
        fontFamily: 'Nunito', fontSize: '18px', color: '#ff0000',
      });
      return;
    }

    map.createLayer('ground', tileset, 0, 0);
    map.createLayer('objects', tileset, 0, 0);

    // Centrer la map dans la fenetre
    const mapW = map.widthInPixels;
    const mapH = map.heightInPixels;
    const offsetX = (this.scale.width - mapW) / 2;
    const offsetY = (this.scale.height - mapH) / 2;
    map.layers.forEach(layer => {
      if (layer.tilemapLayer) {
        layer.tilemapLayer.setPosition(offsetX, offsetY);
      }
    });

    // HUD
    this.add.text(20, 20, 'Rond-point Tiled (.tmj) — ESC pour quitter', {
      fontFamily: 'Nunito', fontSize: '16px', color: '#1A1A1A', backgroundColor: '#FFFFFFCC',
      padding: { left: 8, right: 8, top: 4, bottom: 4 },
    }).setScrollFactor(0).setDepth(1000);

    this.input.keyboard?.once('keydown-ESC', () => {
      this.scene.start('HubScene');
    });
  }
}
