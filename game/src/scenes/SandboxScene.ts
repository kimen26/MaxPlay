import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants/config';

// const TILE_SIZE = 48;
const BUS_SPEED = 180;
const WORLD_WIDTH = 1200;
const WORLD_HEIGHT = 800;

interface Passenger {
  x: number;
  y: number;
  collected: boolean;
  sprite?: Phaser.GameObjects.Text;
}

export class SandboxScene extends Phaser.Scene {
  private bus!: Phaser.GameObjects.Sprite;
  private busVelocity: Phaser.Math.Vector2;
  // private busDirection: number = 0;
  private targetPoint: Phaser.Math.Vector2 | null = null;
  private targetMarker!: Phaser.GameObjects.Arc;

  private passengers: Passenger[] = [];
  private passengersCollected = 0;
  private totalPassengers = 5;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private passengerText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'SandboxScene' });
    this.busVelocity = new Phaser.Math.Vector2(0, 0);
  }

  create(): void {
    this.createCleanWorld();
    this.createBus();
    this.createPassengers();
    this.createNPCCars();
    this.createInput();
    this.createUI();
    this.setupCamera();
  }

  private createCleanWorld(): void {
    // Fond vert clair (herbe)
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, WORLD_WIDTH, WORLD_HEIGHT, 0x81C784);

    // Routes simples (rectangles gris)
    // Route horizontale principale
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, WORLD_WIDTH, 120, 0x616161);
    // Ligne blanche pointillée
    for (let x = 50; x < WORLD_WIDTH; x += 100) {
      this.add.rectangle(x, WORLD_HEIGHT / 2, 50, 6, 0xFFFFFF);
    }

    // Route verticale
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, 120, WORLD_HEIGHT, 0x616161);
    // Ligne blanche pointillée verticale
    for (let y = 50; y < WORLD_HEIGHT; y += 100) {
      this.add.rectangle(WORLD_WIDTH / 2, y, 6, 50, 0xFFFFFF);
    }

    // Trottoirs (bordures gris clair)
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2 - 70, WORLD_WIDTH, 20, 0x9E9E9E); // haut
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2 + 70, WORLD_WIDTH, 20, 0x9E9E9E); // bas
    this.add.rectangle(WORLD_WIDTH / 2 - 70, WORLD_HEIGHT / 2, 20, WORLD_HEIGHT, 0x9E9E9E); // gauche
    this.add.rectangle(WORLD_WIDTH / 2 + 70, WORLD_HEIGHT / 2, 20, WORLD_HEIGHT, 0x9E9E9E); // droite

    // Arrêts de bus
    this.createBusStop(200, WORLD_HEIGHT / 2 - 90, '162');
    this.createBusStop(WORLD_WIDTH - 200, WORLD_HEIGHT / 2 + 90, '380');

    // Quelques arbres simples (émojis ou cercles)
    const treePositions = [
      { x: 100, y: 100 }, { x: 300, y: 150 }, { x: 900, y: 100 },
      { x: 100, y: 700 }, { x: 1100, y: 650 }, { x: 950, y: 720 },
    ];
    treePositions.forEach(pos => {
      // Tronc
      this.add.rectangle(pos.x, pos.y, 12, 30, 0x795548);
      // Feuillage
      this.add.circle(pos.x, pos.y - 25, 35, 0x4CAF50);
      this.add.circle(pos.x - 15, pos.y - 20, 25, 0x66BB6A);
      this.add.circle(pos.x + 15, pos.y - 20, 25, 0x66BB6A);
    });

    // Bâtiments simples
    this.createSimpleBuilding(150, 150, 0xFFCC80);
    this.createSimpleBuilding(350, 100, 0x90CAF9);
    this.createSimpleBuilding(1000, 200, 0xEF9A9A);
    this.createSimpleBuilding(100, 600, 0xB39DDB);
    this.createSimpleBuilding(1050, 650, 0xA5D6A7);

    // Lampadaires
    this.createLamp(400, WORLD_HEIGHT / 2 - 90);
    this.createLamp(800, WORLD_HEIGHT / 2 - 90);
    this.createLamp(400, WORLD_HEIGHT / 2 + 90);
    this.createLamp(800, WORLD_HEIGHT / 2 + 90);
  }

  private createBusStop(x: number, y: number, line: string): void {
    // Poteau
    this.add.rectangle(x, y, 6, 50, 0x424242);
    // Panneau
    this.add.rectangle(x, y - 35, 50, 30, 0x1976D2).setStrokeStyle(2, 0xFFFFFF);
    this.add.text(x, y - 35, line, {
      fontFamily: 'Nunito',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#FFFFFF',
    }).setOrigin(0.5);
    // Banc
    this.add.rectangle(x + 40, y, 40, 15, 0x8D6E63);
    this.add.rectangle(x + 30, y + 10, 6, 15, 0x5D4037);
    this.add.rectangle(x + 50, y + 10, 6, 15, 0x5D4037);
  }

  private createSimpleBuilding(x: number, y: number, color: number): void {
    const width = 100;
    const height = 80;
    this.add.rectangle(x, y, width, height, color).setStrokeStyle(2, 0x424242);
    // Porte
    this.add.rectangle(x, y + 20, 30, 40, 0x5D4037);
    // Fenêtre
    this.add.rectangle(x - 25, y - 15, 30, 30, 0x81D4FA).setStrokeStyle(1, 0x424242);
    this.add.rectangle(x + 25, y - 15, 30, 30, 0x81D4FA).setStrokeStyle(1, 0x424242);
  }

  private createLamp(x: number, y: number): void {
    // Poteau
    this.add.rectangle(x, y, 6, 40, 0x424242);
    // Lumière
    this.add.circle(x, y - 25, 12, 0xFFEB3B, 0.8);
    // Halo
    this.add.circle(x, y - 25, 40, 0xFFEB3B, 0.1);
  }

  private createBus(): void {
    const spawnX = WORLD_WIDTH / 2;
    const spawnY = WORLD_HEIGHT / 2;
    
    this.bus = this.add.sprite(spawnX, spawnY, 'bus-anim')
      .setScale(2.5) // GROS bus pour l'enfant
      .setOrigin(0.5, 0.7);
    
    this.bus.play('bus-idle-down');
    
    // Ombre
    const shadow = this.add.ellipse(spawnX, spawnY + 15, 80, 30, 0x000000, 0.2)
      .setOrigin(0.5);
    
    this.events.on('update', () => {
      shadow.x = this.bus.x;
      shadow.y = this.bus.y + 20;
      shadow.setDepth(this.bus.y - 1);
      this.bus.setDepth(this.bus.y);
    });

    // Cercle de destination
    this.targetMarker = this.add.circle(0, 0, 25, 0x4CAF50, 0.3)
      .setStrokeStyle(3, 0x4CAF50)
      .setVisible(false)
      .setDepth(1000);
  }

  private createPassengers(): void {
    const positions = [
      { x: 200, y: WORLD_HEIGHT / 2 - 120 },
      { x: WORLD_WIDTH - 200, y: WORLD_HEIGHT / 2 + 120 },
      { x: WORLD_WIDTH / 2 - 120, y: 150 },
      { x: WORLD_WIDTH / 2 + 120, y: WORLD_HEIGHT - 150 },
      { x: 300, y: WORLD_HEIGHT / 2 - 120 },
    ];

    positions.forEach((pos, i) => {
      const container = this.add.container(pos.x, pos.y);
      
      // Halo
      const halo = this.add.circle(0, -20, 40, 0xFFD700, 0.2).setVisible(false);
      
      // Emoji passager
      const body = this.add.text(0, 0, '🧍', { fontSize: '40px' })
        .setOrigin(0.5, 1);
      
      // Animation saut
      this.tweens.add({
        targets: body,
        y: -8,
        duration: 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.inOut',
        delay: i * 100,
      });

      container.add([halo, body]);
      container.setDepth(pos.y);
      
      this.passengers.push({
        x: pos.x,
        y: pos.y,
        collected: false,
        sprite: body,
      });
    });
  }

  private createNPCCars(): void {
    for (let i = 0; i < 2; i++) {
      const car = this.add.sprite(
        i === 0 ? -50 : WORLD_WIDTH + 50,
        WORLD_HEIGHT / 2 - 40 + i * 80,
        'car-blue'
      ).setScale(1.5);
      
      car.play('car-blue-drive');
      
      const direction = i === 0 ? 1 : -1;
      car.setFlipX(direction < 0);
      
      this.tweens.add({
        targets: car,
        x: direction > 0 ? WORLD_WIDTH + 100 : -100,
        duration: 8000 + i * 2000,
        ease: 'Linear',
        repeat: -1,
        onRepeat: () => {
          car.x = direction > 0 ? -100 : WORLD_WIDTH + 100;
        }
      });
    }
  }

  private createInput(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
      this.setTargetPoint(worldPoint.x, worldPoint.y);
    });
  }

  private setTargetPoint(x: number, y: number): void {
    this.targetPoint = new Phaser.Math.Vector2(
      Phaser.Math.Clamp(x, 50, WORLD_WIDTH - 50),
      Phaser.Math.Clamp(y, 50, WORLD_HEIGHT - 50)
    );
    this.targetMarker.setPosition(this.targetPoint.x, this.targetPoint.y).setVisible(true).setScale(0);
    
    this.tweens.add({
      targets: this.targetMarker,
      scale: 1,
      duration: 200,
    });
  }

  private createUI(): void {
    this.passengerText = this.add.text(20, 20, 
      '🧍 0 / 5', {
      fontFamily: 'Nunito',
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#1A1A1A',
      backgroundColor: '#FFFFFFDD',
      padding: { x: 20, y: 12 },
    }).setScrollFactor(0).setDepth(10000);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 40, 
      '👆 Clique pour conduire   |   ESPACE Klaxon', {
      fontFamily: 'Nunito',
      fontSize: '18px',
      color: '#666666',
      backgroundColor: '#FFFFFFCC',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setScrollFactor(0).setDepth(10000);
  }

  private setupCamera(): void {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.startFollow(this.bus, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.1);
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    this.updateBusMovement(dt);
    this.updateHonk();
    this.checkPassengers();
  }

  private updateBusMovement(dt: number): void {
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

    // Input clavier override
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

    // Animation
    const speed = this.busVelocity.length();
    if (speed > 10) {
      let anim = '';
      if (Math.abs(this.busVelocity.x) > Math.abs(this.busVelocity.y)) {
        anim = this.busVelocity.x > 0 ? 'bus-drive-right' : 'bus-drive-left';
      } else {
        anim = this.busVelocity.y > 0 ? 'bus-drive-down' : 'bus-drive-up';
      }
      if (this.bus.anims.currentAnim?.key !== anim) {
        this.bus.play(anim, true);
      }
    } else {
      this.bus.stop();
    }

    this.bus.x += this.busVelocity.x * dt;
    this.bus.y += this.busVelocity.y * dt;
    
    this.bus.x = Phaser.Math.Clamp(this.bus.x, 40, WORLD_WIDTH - 40);
    this.bus.y = Phaser.Math.Clamp(this.bus.y, 40, WORLD_HEIGHT - 40);
  }

  private updateHonk(): void {
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.tweens.add({
        targets: this.bus,
        scaleX: 2.8,
        scaleY: 2.3,
        duration: 100,
        yoyo: true,
      });
      
      const beep = this.add.text(this.bus.x, this.bus.y - 60, '📢 BEEP!', {
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
        onComplete: () => beep.destroy(),
      });
    }
  }

  private checkPassengers(): void {
    this.passengers.forEach(p => {
      if (p.collected || !p.sprite) return;
      
      const dist = Phaser.Math.Distance.Between(this.bus.x, this.bus.y, p.x, p.y);
      if (dist < 60) {
        this.collectPassenger(p);
      }
    });
  }

  private collectPassenger(p: Passenger): void {
    p.collected = true;
    this.passengersCollected++;
    
    if (p.sprite) {
      this.tweens.add({
        targets: p.sprite,
        scale: 0,
        y: p.sprite.y - 50,
        duration: 400,
        onComplete: () => p.sprite?.destroy(),
      });
    }

    // +1
    const plus = this.add.text(p.x, p.y - 40, '+1 🧍', {
      fontFamily: 'Nunito',
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#4CAF50',
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: plus,
      y: p.y - 80,
      alpha: 0,
      duration: 800,
      onComplete: () => plus.destroy(),
    });

    this.passengerText.setText(`🧍 ${this.passengersCollected} / ${this.totalPassengers}`);
    
    if (this.passengersCollected >= this.totalPassengers) {
      this.showVictory();
    }
  }

  private showVictory(): void {
    this.add.rectangle(
      GAME_WIDTH / 2, GAME_HEIGHT / 2,
      GAME_WIDTH, GAME_HEIGHT,
      0x000000, 0.7
    ).setScrollFactor(0).setDepth(20000);
    
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, '🎉 BRAVO! 🎉', {
      fontFamily: 'Nunito',
      fontSize: '52px',
      fontStyle: 'bold',
      color: '#FFD700',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20001);
    
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30,
      'Tu as collecté tous les passagers!', {
      fontFamily: 'Nunito',
      fontSize: '24px',
      color: '#FFFFFF',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20001);

    this.time.delayedCall(4000, () => this.scene.restart());
  }
}
