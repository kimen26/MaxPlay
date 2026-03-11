import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants/config';

/**
 * MJ-07 SandboxScene - Bac à sable ville MaxPlay
 * 
 * CONTRÔLES (adaptés 4 ans):
 * - Flèches / WASD = conduire le bus
 * - Espace = klaxon
 * - Le bus roule tout seul si on touche rien (idle animation route)
 * 
 * DESIGN CHOICES:
 * - Tile size: 48x48 (Modern Exteriors)
 * - View: Top-down isométrique léger
 * - Bus grand et visible (72x72 px affiché)
 * - Couleurs vives pour les enfants
 */

const TILE_SIZE = 48;
const BUS_SPEED = 180;        // px/sec
// const BUS_ROTATION_SPEED = 3; // rad/sec (pour futur)
const WORLD_WIDTH = 1600;
const WORLD_HEIGHT = 1200;

export class SandboxScene extends Phaser.Scene {
  // Bus joueur
  private bus!: Phaser.GameObjects.Sprite;
  private busVelocity: Phaser.Math.Vector2;
  private busDirection: number = 0; // 0=down, 1=up, 2=left, 3=right
  private isHonking = false;

  // Monde
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { [key: string]: Phaser.Input.Keyboard.Key };
  private spaceKey!: Phaser.Input.Keyboard.Key;
  
  // Camera suit le bus automatiquement
  
  // Trafic NPC
  private npcCars: Phaser.GameObjects.Sprite[] = [];
  
  // UI
  private speedText!: Phaser.GameObjects.Text;
  private controlsHint!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'SandboxScene' });
    this.busVelocity = new Phaser.Math.Vector2(0, 0);
  }

  create(): void {
    this.createWorld();
    this.createBus();
    this.createNPCCars();
    this.createInput();
    this.createUI();
    this.setupCamera();
    
    // Ambiance sonore (simulée visuellement pour l'instant)
    this.createCityAmbiance();
  }

  // === WORLD GENERATION ===
  
  private createWorld(): void {
    // Grille de la ville
    const cols = Math.ceil(WORLD_WIDTH / TILE_SIZE);
    const rows = Math.ceil(WORLD_HEIGHT / TILE_SIZE);
    
    // Génération procédurale simple d'une ville
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = x * TILE_SIZE + TILE_SIZE / 2;
        const py = y * TILE_SIZE + TILE_SIZE / 2;
        
        // Route principale horizontale (au milieu)
        const isMainRoad = y >= 10 && y <= 14;
        // Route secondaire verticale
        const isCrossRoad = x >= 18 && x <= 22;
        
        if (isMainRoad || isCrossRoad) {
          // Route
          this.add.image(px, py, 'road-asphalt').setOrigin(0.5);
          
          // Lignes blanches sur la route principale
          if (isMainRoad && !isCrossRoad && x % 3 === 0) {
            this.add.rectangle(px, py, 24, 4, 0xFFFFFF, 0.7).setOrigin(0.5);
          }
        } else {
          // Trottoirs autour des routes
          const nearRoad = (y >= 9 && y <= 15) || (x >= 17 && x <= 23);
          
          if (nearRoad) {
            this.add.image(px, py, 'sidewalk').setOrigin(0.5);
          } else {
            // Herbe
            this.add.image(px, py, 'grass').setOrigin(0.5);
            
            // Arbres aléatoires (pas sur les routes!)
            if (Math.random() < 0.08) {
              this.add.image(px, py - 16, 'tree').setOrigin(0.5, 1).setScale(1.2);
            }
            
            // Bâtiments parfois
            if (Math.random() < 0.05 && x > 5 && x < cols - 5 && y > 5 && y < rows - 5) {
              this.createBuilding(px, py);
            }
          }
        }
      }
    }
    
    // Arrêts de bus
    this.createBusStop(20 * TILE_SIZE, 9 * TILE_SIZE, '162');
    this.createBusStop(25 * TILE_SIZE, 14 * TILE_SIZE, '380');
    
    // Props urbains
    this.createCityProps();
  }
  
  private createBuilding(x: number, y: number): void {
    const type = Math.random() > 0.5 ? 'building-condo' : 'building-shop';
    const building = this.add.image(x, y, type).setOrigin(0.5, 0.8);
    building.setScale(1.5);
    building.setDepth(y); // Depth sorting
  }
  
  private createBusStop(x: number, y: number, lineNumber: string): void {
    // Poteau arrêt
    this.add.image(x, y, 'bus-stop-sign').setOrigin(0.5, 1).setScale(1.2);
    
    // Numéro flottant
    this.add.text(x, y - 60, lineNumber, {
      fontFamily: 'Nunito',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#0064B1',
      backgroundColor: '#FFFFFF',
      padding: { x: 8, y: 4 },
    }).setOrigin(0.5).setDepth(1000);
    
    // Banc
    this.add.image(x + 30, y, 'bench').setOrigin(0.5, 1);
  }
  
  private createCityProps(): void {
    // Lampadaires le long des routes
    const lampPositions = [
      { x: 15, y: 9 }, { x: 25, y: 9 },
      { x: 15, y: 15 }, { x: 25, y: 15 },
      { x: 17, y: 6 }, { x: 23, y: 6 },
      { x: 17, y: 18 }, { x: 23, y: 18 },
    ];
    
    lampPositions.forEach(pos => {
      this.add.image(
        pos.x * TILE_SIZE, 
        pos.y * TILE_SIZE, 
        'streetlamp'
      ).setOrigin(0.5, 1).setScale(1.1);
    });
    
    // Poubelles
    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(5, 28) * TILE_SIZE;
      const y = Phaser.Math.Between(5, 20) * TILE_SIZE;
      this.add.image(x, y, 'trashcan').setOrigin(0.5, 0.8);
    }
  }
  
  private createCityAmbiance(): void {
    // Particules "ambiance ville" (pigeons, papillons...)
    // Simplifié pour l'instant
  }

  // === BUS JOUEUR ===
  
  private createBus(): void {
    // Spawn au centre de la route principale
    const spawnX = WORLD_WIDTH / 2;
    const spawnY = 12 * TILE_SIZE;
    
    this.bus = this.add.sprite(spawnX, spawnY, 'bus-anim')
      .setScale(1.5) // Bus bien visible (72x72)
      .setOrigin(0.5, 0.7); // Pivot au centre-bas pour rotation naturelle
    
    this.bus.play('bus-idle-down');
    
    // Collision circulaire simplifiée
    this.physics?.add?.existing(this.bus);
    
    // Ombre sous le bus
    const shadow = this.add.ellipse(spawnX, spawnY + 10, 50, 20, 0x000000, 0.2)
      .setOrigin(0.5);
    
    // Mettre à jour l'ombre avec le bus
    this.events.on('update', () => {
      shadow.x = this.bus.x;
      shadow.y = this.bus.y + 15;
      shadow.setDepth(this.bus.y - 1);
      this.bus.setDepth(this.bus.y);
    });
  }

  // === TRAFIC NPC ===
  
  private createNPCCars(): void {
    // Quelques voitures qui roulent automatiquement
    for (let i = 0; i < 4; i++) {
      const car = this.add.sprite(
        Phaser.Math.Between(100, WORLD_WIDTH - 100),
        11 * TILE_SIZE + (i % 2) * TILE_SIZE * 2,
        'car-blue'
      ).setScale(1.2);
      
      car.play('car-blue-drive');
      
      // Mouvement automatique
      const direction = i % 2 === 0 ? 1 : -1;
      car.setFlipX(direction < 0);
      
      this.tweens.add({
        targets: car,
        x: direction > 0 ? WORLD_WIDTH + 100 : -100,
        duration: Phaser.Math.Between(8000, 12000),
        ease: 'Linear',
        repeat: -1,
        onRepeat: () => {
          car.x = direction > 0 ? -100 : WORLD_WIDTH + 100;
        }
      });
      
      this.npcCars.push(car);
    }
  }

  // === INPUTS ===
  
  private createInput(): void {
    // Flèches
    this.cursors = this.input.keyboard!.createCursorKeys();
    
    // WASD
    this.wasd = this.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as { [key: string]: Phaser.Input.Keyboard.Key };
    
    // Klaxon
    this.spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }
  
  private createUI(): void {
    // Vitesse (debug/info)
    this.speedText = this.add.text(20, 20, '', {
      fontFamily: 'Nunito',
      fontSize: '18px',
      color: '#333333',
      backgroundColor: '#FFFFFFAA',
      padding: { x: 10, y: 5 },
    }).setScrollFactor(0).setDepth(10000);

    // Contrôles
    this.controlsHint = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 60, 
      '⬆️⬇️⬅️➡️ Conduire   |   ESPACE Klaxon 🚌', {
      fontFamily: 'Nunito',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#1A1A1A',
      backgroundColor: '#FFFFFFCC',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setScrollFactor(0).setDepth(10000);
    
    // Fade out du hint après 5s
    this.time.delayedCall(5000, () => {
      this.tweens.add({
        targets: this.controlsHint,
        alpha: 0.5,
        duration: 1000,
      });
    });
  }
  
  private setupCamera(): void {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.startFollow(this.bus, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.2); // Zoom léger pour voir plus loin
  }

  // === UPDATE LOOP ===
  
  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    
    this.updateBusMovement(dt);
    this.updateHonk();
    this.updateUI();
    this.checkBounds();
  }
  
  private updateBusMovement(dt: number): void {
    let dx = 0;
    let dy = 0;
    
    // Input direction
    if (this.cursors.left?.isDown || this.wasd.left?.isDown) dx = -1;
    if (this.cursors.right?.isDown || this.wasd.right?.isDown) dx = 1;
    if (this.cursors.up?.isDown || this.wasd.up?.isDown) dy = -1;
    if (this.cursors.down?.isDown || this.wasd.down?.isDown) dy = 1;
    
    // Normaliser diagonal
    if (dx !== 0 && dy !== 0) {
      dx *= 0.707;
      dy *= 0.707;
    }
    
    // Appliquer vélocité
    if (dx !== 0 || dy !== 0) {
      this.busVelocity.x = dx * BUS_SPEED;
      this.busVelocity.y = dy * BUS_SPEED;
      
      // Déterminer direction pour animation
      let anim = '';
      if (Math.abs(dx) > Math.abs(dy)) {
        anim = dx > 0 ? 'bus-drive-right' : 'bus-drive-left';
        this.busDirection = dx > 0 ? 3 : 2;
      } else {
        anim = dy > 0 ? 'bus-drive-down' : 'bus-drive-up';
        this.busDirection = dy > 0 ? 0 : 1;
      }
      
      if (this.bus.anims.currentAnim?.key !== anim) {
        this.bus.play(anim, true);
      }
    } else {
      // Idle - ralentissement
      this.busVelocity.x *= 0.9;
      this.busVelocity.y *= 0.9;
      
      // Animation idle selon dernière direction
      if (Math.abs(this.busVelocity.x) < 10 && Math.abs(this.busVelocity.y) < 10) {
        const idleAnims = ['bus-idle-down', 'bus-idle-down', 'bus-idle-down', 'bus-idle-down'];
        this.bus.play(idleAnims[this.busDirection], true);
      }
    }
    
    // Appliquer mouvement
    this.bus.x += this.busVelocity.x * dt;
    this.bus.y += this.busVelocity.y * dt;
  }
  
  private updateHonk(): void {
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && !this.isHonking) {
      this.honk();
    }
  }
  
  private honk(): void {
    this.isHonking = true;
    
    // Animation klaxon
    this.tweens.add({
      targets: this.bus,
      scaleX: 1.6,
      scaleY: 1.4,
      duration: 100,
      yoyo: true,
    });
    
    // Onde de choc visuelle
    const shockwave = this.add.circle(this.bus.x, this.bus.y, 30, 0xFFD700, 0.5);
    this.tweens.add({
      targets: shockwave,
      scale: 4,
      alpha: 0,
      duration: 500,
      onComplete: () => shockwave.destroy(),
    });
    
    // Texte "BEEP!"
    const beep = this.add.text(this.bus.x, this.bus.y - 50, '📢 BEEP!', {
      fontFamily: 'Nunito',
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#FF6B00',
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: beep,
      y: beep.y - 40,
      alpha: 0,
      duration: 800,
      onComplete: () => {
        beep.destroy();
        this.isHonking = false;
      },
    });
    
    // Son (à ajouter plus tard)
    // this.sound.play('klaxon');
  }
  
  private updateUI(): void {
    const speed = Math.round(this.busVelocity.length());
    this.speedText.setText(`🚌 ${speed} km/h`);
  }
  
  private checkBounds(): void {
    // Garder dans le monde
    this.bus.x = Phaser.Math.Clamp(this.bus.x, 24, WORLD_WIDTH - 24);
    this.bus.y = Phaser.Math.Clamp(this.bus.y, 24, WORLD_HEIGHT - 24);
  }
}
