import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants/config';

/**
 * MJ-07 SandboxScene V2 - Bac à sable ville MaxPlay
 * 
 * CONTRÔLES (adaptés 4 ans):
 * MODE A - TAP (défaut): Tape où tu veux aller, le bus roule tout seul
 * MODE B - FLÈCHES: Pour les plus grands (maintenir flèches)
 * ESPACE = Klaxon
 * 
 * OBJECTIF: Collecter les passagers 🧍 sur les trottoirs
 * FEEDBACK: Compteur "Passagers: 3/5" bien visible
 */

const TILE_SIZE = 48;
const BUS_SPEED = 200;
const WORLD_WIDTH = 1600;
const WORLD_HEIGHT = 1200;

interface Passenger {
  sprite: Phaser.GameObjects.Container;
  collected: boolean;
}

export class SandboxScene extends Phaser.Scene {
  // Bus
  private bus!: Phaser.GameObjects.Sprite;
  private busVelocity: Phaser.Math.Vector2;
  private busDirection: number = 0;
  private isHonking = false;
  private targetPoint: Phaser.Math.Vector2 | null = null;
  private targetIndicator!: Phaser.GameObjects.Arc;

  // Input
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { [key: string]: Phaser.Input.Keyboard.Key };
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private useTapMode = true; // Mode par défaut pour 4 ans

  // Passagers
  private passengers: Passenger[] = [];
  private passengersCollected = 0;
  private totalPassengers = 5;

  // UI
  private passengerText!: Phaser.GameObjects.Text;
  private controlsHint!: Phaser.GameObjects.Text;
  private modeText!: Phaser.GameObjects.Text;


  constructor() {
    super({ key: 'SandboxScene' });
    this.busVelocity = new Phaser.Math.Vector2(0, 0);
  }

  create(): void {
    this.createWorld();
    this.createBus();
    this.createPassengers();
    this.createNPCCars();
    this.createInput();
    this.createUI();
    this.setupCamera();
    this.createTargetIndicator();
  }

  // === WORLD ===
  
  private createWorld(): void {
    const cols = Math.ceil(WORLD_WIDTH / TILE_SIZE);
    const rows = Math.ceil(WORLD_HEIGHT / TILE_SIZE);
    
    // Grille ville
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = x * TILE_SIZE + TILE_SIZE / 2;
        const py = y * TILE_SIZE + TILE_SIZE / 2;
        
        const isMainRoad = y >= 10 && y <= 14;
        const isCrossRoad = x >= 18 && x <= 22;
        
        if (isMainRoad || isCrossRoad) {
          this.add.image(px, py, 'road-asphalt').setOrigin(0.5);
          if (isMainRoad && !isCrossRoad && x % 3 === 0) {
            this.add.rectangle(px, py, 24, 4, 0xFFFFFF, 0.7).setOrigin(0.5);
          }
        } else {
          const nearRoad = (y >= 9 && y <= 15) || (x >= 17 && x <= 23);
          
          if (nearRoad) {
            this.add.image(px, py, 'sidewalk').setOrigin(0.5);
          } else {
            this.add.image(px, py, 'grass').setOrigin(0.5);
            
            if (Math.random() < 0.06) {
              this.add.image(px, py - 16, 'tree').setOrigin(0.5, 1).setScale(1.2);
            }
            
            if (Math.random() < 0.04 && x > 5 && x < cols - 5 && y > 5 && y < rows - 5) {
              this.createBuilding(px, py);
            }
          }
        }
      }
    }
    
    this.createBusStop(20 * TILE_SIZE, 9 * TILE_SIZE, '162');
    this.createBusStop(25 * TILE_SIZE, 14 * TILE_SIZE, '380');
    this.createCityProps();
  }
  
  private createBuilding(x: number, y: number): void {
    const type = Math.random() > 0.5 ? 'building-condo' : 'building-shop';
    const building = this.add.image(x, y, type).setOrigin(0.5, 0.8);
    building.setScale(1.5);
    building.setDepth(y);
  }
  
  private createBusStop(x: number, y: number, lineNumber: string): void {
    this.add.image(x, y, 'bus-stop-sign').setOrigin(0.5, 1).setScale(1.2);
    
    this.add.text(x, y - 60, lineNumber, {
      fontFamily: 'Nunito',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#0064B1',
      backgroundColor: '#FFFFFF',
      padding: { x: 8, y: 4 },
    }).setOrigin(0.5).setDepth(1000);
    
    this.add.image(x + 30, y, 'bench').setOrigin(0.5, 1);
  }
  
  private createCityProps(): void {
    const lampPositions = [
      { x: 15, y: 9 }, { x: 25, y: 9 },
      { x: 15, y: 15 }, { x: 25, y: 15 },
      { x: 17, y: 6 }, { x: 23, y: 6 },
      { x: 17, y: 18 }, { x: 23, y: 18 },
    ];
    
    lampPositions.forEach(pos => {
      this.add.image(pos.x * TILE_SIZE, pos.y * TILE_SIZE, 'streetlamp')
        .setOrigin(0.5, 1).setScale(1.1);
    });
    
    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(5, 28) * TILE_SIZE;
      const y = Phaser.Math.Between(5, 20) * TILE_SIZE;
      this.add.image(x, y, 'trashcan').setOrigin(0.5, 0.8);
    }
  }

  // === BUS ===
  
  private createBus(): void {
    const spawnX = WORLD_WIDTH / 2;
    const spawnY = 12 * TILE_SIZE;
    
    this.bus = this.add.sprite(spawnX, spawnY, 'bus-anim')
      .setScale(1.8) // Encore plus gros pour un 4 ans !
      .setOrigin(0.5, 0.7);
    
    this.bus.play('bus-idle-down');
    
    // Ombre
    const shadow = this.add.ellipse(spawnX, spawnY + 10, 60, 25, 0x000000, 0.2)
      .setOrigin(0.5);
    
    this.events.on('update', () => {
      shadow.x = this.bus.x;
      shadow.y = this.bus.y + 15;
      shadow.setDepth(this.bus.y - 1);
      this.bus.setDepth(this.bus.y);
    });
  }

  // === PASSAGERS ===
  
  private createPassengers(): void {
    // Créer 5 passagers sur les trottoirs
    const positions = [
      { x: 16 * TILE_SIZE, y: 9 * TILE_SIZE },
      { x: 28 * TILE_SIZE, y: 9 * TILE_SIZE },
      { x: 16 * TILE_SIZE, y: 15 * TILE_SIZE },
      { x: 28 * TILE_SIZE, y: 15 * TILE_SIZE },
      { x: 20 * TILE_SIZE, y: 18 * TILE_SIZE },
    ];
    
    positions.forEach((pos, i) => {
      const container = this.add.container(pos.x, pos.y);
      
      // Emoji passager
      const body = this.add.text(0, 0, '🧍', { fontSize: '36px' })
        .setOrigin(0.5, 1);
      
      // Halo de sélection
      const halo = this.add.circle(0, -20, 30, 0xFFD700, 0.3)
        .setVisible(false);
      
      // Animation idle (sautille)
      this.tweens.add({
        targets: body,
        y: -5,
        duration: 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.inOut',
        delay: i * 100,
      });
      
      container.add([halo, body]);
      container.setDepth(pos.y);
      
      this.passengers.push({ sprite: container, collected: false });
    });
  }
  
  private checkPassengerCollection(): void {
    this.passengers.forEach((p, i) => {
      if (p.collected) return;
      
      const dist = Phaser.Math.Distance.Between(
        this.bus.x, this.bus.y,
        p.sprite.x, p.sprite.y
      );
      
      if (dist < 50) {
        this.collectPassenger(p, i);
      }
    });
  }
  
  private collectPassenger(p: Passenger, _index: number): void {
    p.collected = true;
    this.passengersCollected++;
    
    // Animation de collecte
    this.tweens.add({
      targets: p.sprite,
      scale: 0,
      y: p.sprite.y - 50,
      duration: 500,
      ease: 'Back.in',
      onComplete: () => p.sprite.destroy(),
    });
    
    // Feedback positif
    this.showCelebration(p.sprite.x, p.sprite.y);
    this.updatePassengerUI();
    
    // Son (à ajouter)
    // this.sound.play('ding');
    
    // Victoire ?
    if (this.passengersCollected >= this.totalPassengers) {
      this.showVictory();
    }
  }
  
  private showCelebration(x: number, y: number): void {
    // Étoiles
    for (let i = 0; i < 5; i++) {
      const star = this.add.text(x, y, '⭐', { fontSize: '24px' })
        .setOrigin(0.5);
      
      const angle = (i / 5) * Math.PI * 2;
      this.tweens.add({
        targets: star,
        x: x + Math.cos(angle) * 40,
        y: y + Math.sin(angle) * 40 - 30,
        alpha: 0,
        scale: 0.5,
        duration: 800,
        ease: 'Power2',
        onComplete: () => star.destroy(),
      });
    }
    
    // Texte +1
    const plus = this.add.text(x, y - 40, '+1 🧍', {
      fontFamily: 'Nunito',
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#4CAF50',
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: plus,
      y: y - 80,
      alpha: 0,
      duration: 1000,
      onComplete: () => plus.destroy(),
    });
  }
  
  private showVictory(): void {
    // Écran de victoire
    this.add.rectangle(
      GAME_WIDTH / 2, GAME_HEIGHT / 2,
      GAME_WIDTH, GAME_HEIGHT,
      0x000000, 0.7
    ).setScrollFactor(0).setDepth(20000);
    
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, 
      '🎉 BRAVO! 🎉', {
      fontFamily: 'Nunito',
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#FFD700',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20001);
    
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30,
      'Tu as transporté tous les passagers!', {
      fontFamily: 'Nunito',
      fontSize: '24px',
      color: '#FFFFFF',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20001);
    
    // Confettis
    for (let i = 0; i < 50; i++) {
      const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCF7F', '#4D96FF'];
      const confetti = this.add.circle(
        GAME_WIDTH / 2, GAME_HEIGHT / 2,
        Phaser.Math.Between(4, 8),
        Phaser.Display.Color.HexStringToColor(colors[i % 5]).color
      ).setScrollFactor(0).setDepth(19999);
      
      this.tweens.add({
        targets: confetti,
        x: GAME_WIDTH / 2 + Phaser.Math.Between(-400, 400),
        y: GAME_HEIGHT / 2 + Phaser.Math.Between(-300, 300),
        rotation: Phaser.Math.Between(0, 360),
        duration: 2000,
        ease: 'Power2',
      });
    }
    
    // Rejouer
    this.time.delayedCall(4000, () => {
      this.scene.restart();
    });
  }

  // === TRAFIC ===
  
  private createNPCCars(): void {
    for (let i = 0; i < 3; i++) {
      const car = this.add.sprite(
        Phaser.Math.Between(100, WORLD_WIDTH - 100),
        11 * TILE_SIZE + (i % 2) * TILE_SIZE * 2,
        'car-blue'
      ).setScale(1.2);
      
      car.play('car-blue-drive');
      
      const direction = i % 2 === 0 ? 1 : -1;
      car.setFlipX(direction < 0);
      
      this.tweens.add({
        targets: car,
        x: direction > 0 ? WORLD_WIDTH + 100 : -100,
        duration: Phaser.Math.Between(10000, 15000),
        ease: 'Linear',
        repeat: -1,
        onRepeat: () => {
          car.x = direction > 0 ? -100 : WORLD_WIDTH + 100;
        }
      });
    }
  }

  // === INPUTS ===
  
  private createInput(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as { [key: string]: Phaser.Input.Keyboard.Key };
    this.spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // Mode switch (M)
    this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.M).on('down', () => {
      this.useTapMode = !this.useTapMode;
      this.modeText.setText(this.useTapMode ? 'Mode: TAP 👆' : 'Mode: FLÈCHES ⌨️');
    });
    
    // TAP mode - click/touch
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (!this.useTapMode) return;
      
      // Convertir en coordonnées monde
      const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
      this.setTargetPoint(worldPoint.x, worldPoint.y);
    });
  }
  
  private createTargetIndicator(): void {
    this.targetIndicator = this.add.circle(0, 0, 20, 0x4CAF50, 0.3)
      .setStrokeStyle(3, 0x4CAF50)
      .setVisible(false)
      .setDepth(1000);
  }
  
  private setTargetPoint(x: number, y: number): void {
    this.targetPoint = new Phaser.Math.Vector2(x, y);
    this.targetIndicator.setPosition(x, y).setVisible(true).setScale(0);
    
    this.tweens.add({
      targets: this.targetIndicator,
      scale: 1,
      duration: 200,
    });
  }

  // === UI ===
  
  private createUI(): void {
    // Compteur passagers (gros et visible!)
    this.passengerText = this.add.text(20, 20, 
      `🧍 Passagers: 0/${this.totalPassengers}`, {
      fontFamily: 'Nunito',
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#1A1A1A',
      backgroundColor: '#FFFFFFDD',
      padding: { x: 15, y: 10 },
    }).setScrollFactor(0).setDepth(10000);

    // Mode actuel
    this.modeText = this.add.text(20, 80, 'Mode: TAP 👆', {
      fontFamily: 'Nunito',
      fontSize: '18px',
      color: '#666666',
      backgroundColor: '#FFFFFFAA',
      padding: { x: 10, y: 5 },
    }).setScrollFactor(0).setDepth(10000);

    // Contrôles
    this.controlsHint = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 50, 
      '👆 Tape où tu veux aller  |  ESPACE Klaxon  |  M changer mode', {
      fontFamily: 'Nunito',
      fontSize: '18px',
      color: '#666666',
      backgroundColor: '#FFFFFFCC',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setScrollFactor(0).setDepth(10000);
    
    // Fade out hint
    this.time.delayedCall(6000, () => {
      this.tweens.add({
        targets: this.controlsHint,
        alpha: 0.4,
        duration: 1000,
      });
    });
  }
  
  private updatePassengerUI(): void {
    this.passengerText.setText(
      `🧍 Passagers: ${this.passengersCollected}/${this.totalPassengers}`
    );
    
    // Flash vert
    this.tweens.add({
      targets: this.passengerText,
      scale: 1.2,
      duration: 200,
      yoyo: true,
    });
  }
  
  private setupCamera(): void {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.startFollow(this.bus, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.3);
  }

  // === UPDATE ===
  
  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    
    if (this.useTapMode) {
      this.updateTapMovement(dt);
    } else {
      this.updateKeyboardMovement(dt);
    }
    
    this.updateHonk();
    this.checkPassengerCollection();
    this.checkBounds();
  }
  
  private updateTapMovement(dt: number): void {
    if (!this.targetPoint) {
      this.busVelocity.scale(0.9);
      this.updateBusAnimation();
      this.applyVelocity(dt);
      return;
    }
    
    const dx = this.targetPoint.x - this.bus.x;
    const dy = this.targetPoint.y - this.bus.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 10) {
      // Arrivé!
      this.targetPoint = null;
      this.targetIndicator.setVisible(false);
      this.busVelocity.set(0, 0);
    } else {
      // Se diriger vers target
      this.busVelocity.x = (dx / dist) * BUS_SPEED;
      this.busVelocity.y = (dy / dist) * BUS_SPEED;
    }
    
    this.updateBusAnimation();
    this.applyVelocity(dt);
  }
  
  private updateKeyboardMovement(dt: number): void {
    let dx = 0;
    let dy = 0;
    
    if (this.cursors.left?.isDown || this.wasd.left?.isDown) dx = -1;
    if (this.cursors.right?.isDown || this.wasd.right?.isDown) dx = 1;
    if (this.cursors.up?.isDown || this.wasd.up?.isDown) dy = -1;
    if (this.cursors.down?.isDown || this.wasd.down?.isDown) dy = 1;
    
    if (dx !== 0 && dy !== 0) {
      dx *= 0.707;
      dy *= 0.707;
    }
    
    if (dx !== 0 || dy !== 0) {
      this.busVelocity.x = dx * BUS_SPEED;
      this.busVelocity.y = dy * BUS_SPEED;
    } else {
      this.busVelocity.scale(0.9);
    }
    
    this.updateBusAnimation();
    this.applyVelocity(dt);
  }
  
  private updateBusAnimation(): void {
    const speed = this.busVelocity.length();
    
    if (speed > 10) {
      // Déterminer direction
      let anim = '';
      if (Math.abs(this.busVelocity.x) > Math.abs(this.busVelocity.y)) {
        anim = this.busVelocity.x > 0 ? 'bus-drive-right' : 'bus-drive-left';
        this.busDirection = this.busVelocity.x > 0 ? 3 : 2;
      } else {
        anim = this.busVelocity.y > 0 ? 'bus-drive-down' : 'bus-drive-up';
        this.busDirection = this.busVelocity.y > 0 ? 0 : 1;
      }
      
      if (this.bus.anims.currentAnim?.key !== anim) {
        this.bus.play(anim, true);
      }
    } else {
      // Idle
      if (this.bus.anims.isPlaying) {
        this.bus.stop();
      }
      // Frame idle selon direction
      const idleFrames = [0, 3, 6, 9];
      this.bus.setFrame(idleFrames[this.busDirection]);
    }
  }
  
  private applyVelocity(dt: number): void {
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
    
    this.tweens.add({
      targets: this.bus,
      scaleX: 2,
      scaleY: 1.6,
      duration: 100,
      yoyo: true,
    });
    
    const shockwave = this.add.circle(this.bus.x, this.bus.y, 30, 0xFFD700, 0.5);
    this.tweens.add({
      targets: shockwave,
      scale: 5,
      alpha: 0,
      duration: 600,
      onComplete: () => shockwave.destroy(),
    });
    
    const beep = this.add.text(this.bus.x, this.bus.y - 60, '📢 BEEP BEEP!', {
      fontFamily: 'Nunito',
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#FF6B00',
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: beep,
      y: beep.y - 50,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        beep.destroy();
        this.isHonking = false;
      },
    });
  }
  
  private checkBounds(): void {
    this.bus.x = Phaser.Math.Clamp(this.bus.x, 30, WORLD_WIDTH - 30);
    this.bus.y = Phaser.Math.Clamp(this.bus.y, 30, WORLD_HEIGHT - 30);
    
    // Target aussi dans les limites
    if (this.targetPoint) {
      this.targetPoint.x = Phaser.Math.Clamp(this.targetPoint.x, 30, WORLD_WIDTH - 30);
      this.targetPoint.y = Phaser.Math.Clamp(this.targetPoint.y, 30, WORLD_HEIGHT - 30);
    }
  }
}
