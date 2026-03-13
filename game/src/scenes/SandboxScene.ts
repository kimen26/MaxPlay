import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants/config';
import { SoundManager } from '../utils/SoundManager';

const BUS_SPEED = 220;
const WORLD_WIDTH = 2400;
const WORLD_HEIGHT = 1600;

interface Passenger {
  x: number;
  y: number;
  collected: boolean;
  sprite?: Phaser.GameObjects.Text;
}

export class SandboxScene extends Phaser.Scene {
  private bus!: Phaser.GameObjects.Sprite;
  private busVelocity: Phaser.Math.Vector2;
  private targetPoint: Phaser.Math.Vector2 | null = null;
  private targetMarker!: Phaser.GameObjects.Arc;

  private passengers: Passenger[] = [];
  private passengersCollected = 0;
  private totalPassengers = 5;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private passengerText!: Phaser.GameObjects.Text;
  private soundManager!: SoundManager;

  constructor() {
    super({ key: 'SandboxScene' });
    this.busVelocity = new Phaser.Math.Vector2(0, 0);
  }

  create(): void {
    this.soundManager = new SoundManager(this);
    this.soundManager.init();
    
    this.createCleanWorld();
    this.createBus();
    this.createPassengers();
    this.createInput();
    this.createUI();
    this.setupCamera();
    
    // Démarrer le moteur
    this.soundManager.startEngine();
  }

  private createCleanWorld(): void {
    // Herbe
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, WORLD_WIDTH, WORLD_HEIGHT, 0x81C784);

    // Route horizontale
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, WORLD_WIDTH, 140, 0x616161);
    for (let x = 50; x < WORLD_WIDTH; x += 100) {
      this.add.rectangle(x, WORLD_HEIGHT / 2, 50, 6, 0xFFFFFF);
    }

    // Route verticale
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, 140, WORLD_HEIGHT, 0x616161);
    for (let y = 50; y < WORLD_HEIGHT; y += 100) {
      this.add.rectangle(WORLD_WIDTH / 2, y, 6, 50, 0xFFFFFF);
    }

    // Trottoirs
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2 - 85, WORLD_WIDTH, 30, 0xBDBDBD);
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2 + 85, WORLD_WIDTH, 30, 0xBDBDBD);
    this.add.rectangle(WORLD_WIDTH / 2 - 85, WORLD_HEIGHT / 2, 30, WORLD_HEIGHT, 0xBDBDBD);
    this.add.rectangle(WORLD_WIDTH / 2 + 85, WORLD_HEIGHT / 2, 30, WORLD_HEIGHT, 0xBDBDBD);

    // Arrêts de bus
    this.createBusStop(300, WORLD_HEIGHT / 2 - 105, '162');
    this.createBusStop(1200, WORLD_HEIGHT / 2 - 105, 'M7');
    this.createBusStop(WORLD_WIDTH - 300, WORLD_HEIGHT / 2 + 105, '380');

    // Arbres (répartis sur la grande carte)
    const trees = [
      { x: 200,  y: 200  }, { x: 500,  y: 300  }, { x: 800,  y: 150  },
      { x: 1400, y: 250  }, { x: 1900, y: 200  }, { x: 2200, y: 300  },
      { x: 200,  y: 1300 }, { x: 600,  y: 1400 }, { x: 1200, y: 1350 },
      { x: 1800, y: 1400 }, { x: 2100, y: 1300 },
    ];
    trees.forEach(t => {
      this.add.rectangle(t.x, t.y, 12, 30, 0x5D4037);
      this.add.circle(t.x, t.y - 25, 35, 0x4CAF50);
      this.add.circle(t.x - 12, t.y - 20, 22, 0x66BB6A);
      this.add.circle(t.x + 12, t.y - 20, 22, 0x66BB6A);
    });

    // Bâtiments (répartis)
    this.createBuilding(250, 280, 0xFFCC80);
    this.createBuilding(1900, 350, 0xEF9A9A);
    this.createBuilding(280, 1250, 0xB39DDB);
    this.createBuilding(1950, 1280, 0xA5D6A7);
    this.createBuilding(700, 250, 0x80DEEA);
    this.createBuilding(1600, 300, 0xFFAB91);

    // Lampadaires
    [400, 800, 1200, 1600, 2000].forEach(x => {
      this.createLamp(x, WORLD_HEIGHT / 2 - 105);
      this.createLamp(x, WORLD_HEIGHT / 2 + 105);
    });
  }

  private createBusStop(x: number, y: number, line: string): void {
    this.add.rectangle(x, y, 6, 50, 0x424242);
    this.add.rectangle(x, y - 35, 50, 30, 0x1976D2).setStrokeStyle(2, 0xFFFFFF);
    this.add.text(x, y - 35, line, {
      fontFamily: 'Nunito', fontSize: '16px', fontStyle: 'bold', color: '#FFFFFF',
    }).setOrigin(0.5);
    this.add.rectangle(x + 40, y, 40, 15, 0x8D6E63);
    this.add.rectangle(x + 30, y + 10, 6, 15, 0x5D4037);
    this.add.rectangle(x + 50, y + 10, 6, 15, 0x5D4037);
  }

  private createBuilding(x: number, y: number, color: number): void {
    this.add.rectangle(x, y, 100, 80, color).setStrokeStyle(2, 0x424242);
    this.add.rectangle(x, y + 20, 30, 40, 0x5D4037);
    this.add.rectangle(x - 25, y - 15, 30, 30, 0x81D4FA).setStrokeStyle(1, 0x424242);
    this.add.rectangle(x + 25, y - 15, 30, 30, 0x81D4FA).setStrokeStyle(1, 0x424242);
  }

  private createLamp(x: number, y: number): void {
    this.add.rectangle(x, y, 6, 40, 0x424242);
    this.add.circle(x, y - 25, 12, 0xFFEB3B, 0.8);
    this.add.circle(x, y - 25, 40, 0xFFEB3B, 0.1);
  }

  private createBus(): void {
    const spawnX = WORLD_WIDTH / 2;
    const spawnY = WORLD_HEIGHT / 2;
    
    this.bus = this.add.sprite(spawnX, spawnY, 'bus-topdown', 24)
      .setScale(0.6) // 210x0.6 = 126px, bonne taille
      .setOrigin(0.5, 0.5);
    
    // Ombre
    const shadow = this.add.ellipse(spawnX, spawnY + 10, 90, 40, 0x000000, 0.2);
    
    this.events.on('update', () => {
      shadow.x = this.bus.x;
      shadow.y = this.bus.y + 10;
      shadow.setDepth(this.bus.y - 1);
      this.bus.setDepth(this.bus.y);
    });

    this.targetMarker = this.add.circle(0, 0, 25, 0x4CAF50, 0.3)
      .setStrokeStyle(3, 0x4CAF50)
      .setVisible(false)
      .setDepth(1000);
  }

  private createPassengers(): void {
    // Positions sur les trottoirs (trottoir H nord: y=315, trottoir H sud: y=485)
    const TROT_N = WORLD_HEIGHT / 2 - 85; // trottoir nord de la route H
    const TROT_S = WORLD_HEIGHT / 2 + 85; // trottoir sud de la route H
    const positions = [
      { x: 400,  y: TROT_N },
      { x: 900,  y: TROT_N },
      { x: 1500, y: TROT_N },
      { x: 600,  y: TROT_S },
      { x: WORLD_WIDTH - 400, y: TROT_S },
    ];

    positions.forEach((pos, i) => {
      const body = this.add.text(pos.x, pos.y, '🧍', { fontSize: '40px' })
        .setOrigin(0.5, 1)
        .setDepth(pos.y);
      
      this.tweens.add({
        targets: body, y: pos.y - 8, duration: 400, yoyo: true, repeat: -1, ease: 'Sine.inOut', delay: i * 100,
      });

      this.passengers.push({ x: pos.x, y: pos.y, collected: false, sprite: body });
    });
  }

  private createInput(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    let audioStarted = false;
    
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Réveiller l'audio au premier clic (Chrome/Edge)
      if (!audioStarted) {
        this.soundManager.resumeAudio();
        audioStarted = true;
      }
      
      const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
      this.setTargetPoint(worldPoint.x, worldPoint.y);
    });
  }

  // Routes : H (y ∈ [330, 470]), V (x ∈ [530, 670])
  private readonly ROAD_H = { yMin: WORLD_HEIGHT / 2 - 70, yMax: WORLD_HEIGHT / 2 + 70 };
  private readonly ROAD_V = { xMin: WORLD_WIDTH / 2 - 70, xMax: WORLD_WIDTH / 2 + 70 };

  private snapToRoad(x: number, y: number): { x: number; y: number } {
    const onH = y >= this.ROAD_H.yMin && y <= this.ROAD_H.yMax;
    const onV = x >= this.ROAD_V.xMin && x <= this.ROAD_V.xMax;
    if (onH || onV) return { x, y };

    // Point le plus proche sur route H (clamp y, garder x)
    const nearH = {
      x,
      y: Math.abs(y - WORLD_HEIGHT / 2) < Math.abs(y - this.ROAD_H.yMin)
        ? WORLD_HEIGHT / 2
        : y < WORLD_HEIGHT / 2 ? this.ROAD_H.yMin : this.ROAD_H.yMax,
    };
    // Point le plus proche sur route V (clamp x, garder y)
    const nearV = {
      x: Math.abs(x - WORLD_WIDTH / 2) < Math.abs(x - this.ROAD_V.xMin)
        ? WORLD_WIDTH / 2
        : x < WORLD_WIDTH / 2 ? this.ROAD_V.xMin : this.ROAD_V.xMax,
      y,
    };
    const distH = Math.hypot(x - nearH.x, y - nearH.y);
    const distV = Math.hypot(x - nearV.x, y - nearV.y);
    return distH <= distV ? nearH : nearV;
  }

  private setTargetPoint(rawX: number, rawY: number): void {
    const snapped = this.snapToRoad(
      Phaser.Math.Clamp(rawX, 50, WORLD_WIDTH - 50),
      Phaser.Math.Clamp(rawY, 50, WORLD_HEIGHT - 50)
    );
    this.targetPoint = new Phaser.Math.Vector2(snapped.x, snapped.y);
    this.targetMarker.setPosition(this.targetPoint.x, this.targetPoint.y).setVisible(true).setScale(0);
    this.tweens.add({ targets: this.targetMarker, scale: 1, duration: 200 });
  }

  private createUI(): void {
    this.passengerText = this.add.text(20, 20, '🧍 0 / 5', {
      fontFamily: 'Nunito', fontSize: '32px', fontStyle: 'bold', color: '#1A1A1A',
      backgroundColor: '#FFFFFFDD', padding: { x: 20, y: 12 },
    }).setScrollFactor(0).setDepth(10000);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 40, '👆 Clique pour conduire   |   ESPACE Klaxon', {
      fontFamily: 'Nunito', fontSize: '18px', color: '#666666', backgroundColor: '#FFFFFFCC', padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setScrollFactor(0).setDepth(10000);
  }

  private setupCamera(): void {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.startFollow(this.bus, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.5);
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    this.updateBusMovement(dt);
    this.updateHonk();
    this.checkPassengers();
  }

  private updateBusMovement(dt: number): void {
    // Tap mode
    if (this.targetPoint) {
      const dx = this.targetPoint.x - this.bus.x;
      const dy = this.targetPoint.y - this.bus.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 15) {
        this.targetPoint = null;
        this.targetMarker.setVisible(false);
        this.busVelocity.set(0, 0);
      } else {
        this.busVelocity.x = (dx / dist) * BUS_SPEED;
        this.busVelocity.y = (dy / dist) * BUS_SPEED;
      }
    } else {
      this.busVelocity.scale(0.9);
    }

    // Clavier override
    let kx = 0, ky = 0;
    if (this.cursors.left?.isDown) kx = -1;
    if (this.cursors.right?.isDown) kx = 1;
    if (this.cursors.up?.isDown) ky = -1;
    if (this.cursors.down?.isDown) ky = 1;
    
    if (kx !== 0 || ky !== 0) {
      this.targetPoint = null;
      this.targetMarker.setVisible(false);
      if (kx !== 0 && ky !== 0) { kx *= 0.707; ky *= 0.707; }
      this.busVelocity.x = kx * BUS_SPEED;
      this.busVelocity.y = ky * BUS_SPEED;
    }

    // Choisir sprite selon direction
    this.updateBusFrame();

    // Mettre à jour le son du moteur
    this.soundManager.updateEngine(this.busVelocity.length());

    this.bus.x += this.busVelocity.x * dt;
    this.bus.y += this.busVelocity.y * dt;
    this.bus.x = Phaser.Math.Clamp(this.bus.x, 50, WORLD_WIDTH - 50);
    this.bus.y = Phaser.Math.Clamp(this.bus.y, 50, WORLD_HEIGHT - 50);
  }

  private updateBusFrame(): void {
    const speed = this.busVelocity.length();
    if (speed < 10) return;

    const angle = Math.atan2(this.busVelocity.y, this.busVelocity.x) * 180 / Math.PI;
    
    // Convertir angle en frame (0-48, 7x7 grid)
    // 0° = droite, 90° = bas, -90° = haut, 180° = gauche
    // Grid: row 0 = haut, row 6 = bas, col 0 = gauche, col 6 = droite
    
    let frame = 24; // default down
    
    if (angle >= -22.5 && angle < 22.5) frame = 27; // right
    else if (angle >= 22.5 && angle < 67.5) frame = 28; // down-right
    else if (angle >= 67.5 && angle < 112.5) frame = 24; // down
    else if (angle >= 112.5 && angle < 157.5) frame = 20; // down-left
    else if ((angle >= 157.5 && angle <= 180) || (angle >= -180 && angle < -157.5)) frame = 21; // left
    else if (angle >= -157.5 && angle < -112.5) frame = 16; // up-left
    else if (angle >= -112.5 && angle < -67.5) frame = 17; // up
    else if (angle >= -67.5 && angle < -22.5) frame = 18; // up-right
    
    this.bus.setFrame(frame);
  }

  private updateHonk(): void {
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.soundManager.resumeAudio(); // Réveiller l'audio si besoin
      this.soundManager.honk();
      this.tweens.add({ targets: this.bus, scaleX: 0.65, scaleY: 0.65, duration: 100, yoyo: true });
      
      const beep = this.add.text(this.bus.x, this.bus.y - 50, '📢 BEEP!', {
        fontFamily: 'Nunito', fontSize: '24px', fontStyle: 'bold', color: '#FF6B00',
      }).setOrigin(0.5);
      
      this.tweens.add({ targets: beep, y: beep.y - 40, alpha: 0, duration: 800, onComplete: () => beep.destroy() });
    }
  }

  private checkPassengers(): void {
    this.passengers.forEach(p => {
      if (p.collected || !p.sprite) return;
      
      const dist = Phaser.Math.Distance.Between(this.bus.x, this.bus.y, p.x, p.y);
      if (dist < 70) {
        this.collectPassenger(p);
      }
    });
  }

  private collectPassenger(p: Passenger): void {
    p.collected = true;
    this.passengersCollected++;
    
    // Son de collecte
    this.soundManager.collect();
    
    if (p.sprite) {
      this.tweens.add({ targets: p.sprite, scale: 0, y: p.sprite.y - 50, duration: 400, onComplete: () => p.sprite?.destroy() });
    }

    const plus = this.add.text(p.x, p.y - 40, '+1 🧍', {
      fontFamily: 'Nunito', fontSize: '28px', fontStyle: 'bold', color: '#4CAF50',
    }).setOrigin(0.5);
    
    this.tweens.add({ targets: plus, y: p.y - 80, alpha: 0, duration: 800, onComplete: () => plus.destroy() });

    this.passengerText.setText(`🧍 ${this.passengersCollected} / ${this.totalPassengers}`);
    
    if (this.passengersCollected >= this.totalPassengers) {
      this.soundManager.victory();
      this.showVictory();
    }
  }

  private showVictory(): void {
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.7)
      .setScrollFactor(0).setDepth(20000);
    
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, '🎉 BRAVO! 🎉', {
      fontFamily: 'Nunito', fontSize: '52px', fontStyle: 'bold', color: '#FFD700',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20001);
    
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, 'Tu as collecté tous les passagers!', {
      fontFamily: 'Nunito', fontSize: '24px', color: '#FFFFFF',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20001);

    this.time.delayedCall(4000, () => this.scene.restart());
  }
}
