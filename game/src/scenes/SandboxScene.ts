import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, ANIM, MIN_TAP_SIZE } from '../constants/config';

/**
 * SandboxScene – T-031
 * Prototype top-down pour valider le game feel avant de coder le mini-jeu.
 *
 * Ce qu'on teste ici :
 * - Max (personnage carré) se déplace par TAP sur la carte
 * - Un bus 162 arrive à l'arrêt, attend, repart
 * - Max peut TAP sur le bus pour "monter" → feedback positif
 * - Pas de pédagogie – juste voir si ça donne envie
 *
 * Contrôles Phase 1 (Max n'a jamais touché de manette) : TAP ONLY.
 * Drag et joystick = Phase 2 quand Max est prêt.
 */

// États du bus
type BusState = 'arriving' | 'waiting' | 'departing' | 'gone';

// Constantes sandbox
const TILE = 32;            // taille d'une case en pixels (grille pixel art)
const MAX_SPEED = 120;      // px/sec pour le personnage
const BUS_SPEED = 60;       // px/sec pour le bus
const BUS_WAIT_MS = 4000;   // durée d'attente à l'arrêt
const ROAD_Y = GAME_HEIGHT / 2 + 40;  // Y de la route
const DPAD_DEADZONE = 0.3;             // seuil analogique gamepad

export class SandboxScene extends Phaser.Scene {
  // Personnage Max
  private maxChar!: Phaser.GameObjects.Rectangle;
  private maxLabel!: Phaser.GameObjects.Text;
  private maxTarget: Phaser.Math.Vector2 | null = null;
  private isOnBus = false;

  // Gamepad
  private gpAWasDown = false;

  // Bus
  private bus!: Phaser.GameObjects.Container;
  private busBody!: Phaser.GameObjects.Rectangle;
  private busState: BusState = 'arriving';
  private busWaitTimer = 0;

  // UI
  private hintText!: Phaser.GameObjects.Text;
  private tapIndicator!: Phaser.GameObjects.Arc;

  // Arrêt de bus (position X fixe)
  private readonly STOP_X = GAME_WIDTH / 2;

  constructor() {
    super({ key: 'SandboxScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0xE8F5E9);

    this.drawStreet();
    this.drawBusStop();
    this.createBus();
    this.createMaxChar();
    this.createHint();
    this.createTapIndicator();
    this.setupInput();
  }

  // ─── Décor ───────────────────────────────────────────────────────────────

  private drawStreet(): void {
    // Trottoir haut
    this.add.rectangle(GAME_WIDTH / 2, ROAD_Y - 60, GAME_WIDTH, 40, 0xC8E6C9);
    // Chaussée
    this.add.rectangle(GAME_WIDTH / 2, ROAD_Y, GAME_WIDTH, 80, 0x9E9E9E);
    // Ligne blanche centrale pointillée
    for (let x = 0; x < GAME_WIDTH; x += 60) {
      this.add.rectangle(x + 20, ROAD_Y, 30, 4, 0xFFFFFF, 0.6);
    }
    // Trottoir bas
    this.add.rectangle(GAME_WIDTH / 2, ROAD_Y + 60, GAME_WIDTH, 40, 0xC8E6C9);

    // Quelques "immeubles" décoratifs en haut
    const buildings = [
      { x: 80,  w: 100, h: 120, c: 0xEFEFEF },
      { x: 220, w: 80,  h: 90,  c: 0xE0E0E0 },
      { x: 420, w: 120, h: 110, c: 0xF5F5F5 },
      { x: 650, w: 90,  h: 100, c: 0xEEEEEE },
      { x: 850, w: 110, h: 95,  c: 0xE8E8E8 },
    ];
    buildings.forEach(b => {
      this.add.rectangle(b.x, ROAD_Y - 120 - b.h / 2, b.w, b.h, b.c)
        .setStrokeStyle(1, 0xBDBDBD);
    });
  }

  private drawBusStop(): void {
    const x = this.STOP_X;
    const y = ROAD_Y - 60;
    // Poteau
    this.add.rectangle(x, y - 10, 4, 50, 0x607D8B);
    // Panneau arrêt
    this.add.rectangle(x, y - 40, 50, 28, 0x0064B1)
      .setStrokeStyle(2, 0xFFFFFF);
    // Numéro "162" sur le panneau
    this.add.text(x, y - 40, '162', {
      fontFamily: 'Nunito',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#FFFFFF',
    }).setOrigin(0.5);

    // Zone de tap de l'arrêt (invisible mais grande pour le tap)
    this.add.rectangle(x, y + 10, MIN_TAP_SIZE, MIN_TAP_SIZE, 0x000000, 0)
      .setInteractive();
  }

  // ─── Bus ─────────────────────────────────────────────────────────────────

  private createBus(): void {
    this.bus = this.add.container(-200, ROAD_Y - 20);

    // Sprite pixel art (fond blanc supprimé par script Python)
    const sprite = this.add.image(0, -8, 'bus-side')
      .setDisplaySize(180, 92);

    this.busBody = this.add.rectangle(0, 0, 180, 92, 0x000000, 0);

    // Zone interactive large (min 80px pour enfant)
    const hitArea = this.add.rectangle(0, 0, 180, 100, 0x000000, 0)
      .setInteractive({ cursor: 'pointer' });
    hitArea.on('pointerdown', this.onBusTap, this);

    this.bus.add([sprite, this.busBody, hitArea]);

    // Démarrer l'arrivée
    this.tweens.add({
      targets: this.bus,
      x: this.STOP_X,
      duration: (this.STOP_X + 160) / BUS_SPEED * 1000,
      ease: 'Linear',
      onComplete: () => {
        this.busState = 'waiting';
        this.busWaitTimer = BUS_WAIT_MS;
        this.showHint('Monte dans le bus ! Tape dessus !');
        this.animateBusIdle();
      },
    });
  }

  private animateBusIdle(): void {
    if (this.busState !== 'waiting') return;
    this.tweens.add({
      targets: this.bus,
      y: ROAD_Y - 4 - 3,
      duration: 600,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  private onBusTap(): void {
    if (this.busState !== 'waiting') return;
    if (this.isOnBus) return;

    // Max doit être assez proche de l'arrêt
    const distToStop = Math.abs(this.maxChar.x - this.STOP_X);
    if (distToStop > 200) {
      this.showHint('Approche-toi de l\'arrêt !');
      this.flashMaxChar();
      return;
    }

    this.boardBus();
  }

  private boardBus(): void {
    this.isOnBus = true;
    this.busState = 'departing';
    this.tweens.killTweensOf(this.bus);

    this.showHint('');

    // Max saute dans le bus (feedback succès)
    this.tweens.add({
      targets: this.maxChar,
      scaleX: 0,
      duration: ANIM.MICRO,
      ease: 'Power2',
      onComplete: () => {
        this.maxChar.setVisible(false);
        this.maxLabel.setVisible(false);
        this.celebrateBoarding();
      },
    });
  }

  private celebrateBoarding(): void {
    // Étoiles de célébration
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const star = this.add.text(
        this.bus.x + Math.cos(angle) * 60,
        this.bus.y + Math.sin(angle) * 40,
        '⭐', { fontSize: '24px' }
      ).setOrigin(0.5);

      this.tweens.add({
        targets: star,
        y: star.y - 50,
        alpha: 0,
        duration: 800,
        delay: i * 80,
        ease: 'Power2',
        onComplete: () => star.destroy(),
      });
    }

    // Bus part après la fête
    this.time.delayedCall(1000, () => {
      this.tweens.add({
        targets: this.bus,
        x: GAME_WIDTH + 200,
        duration: 3000,
        ease: 'Linear',
        onComplete: () => {
          this.busState = 'gone';
          this.showHint('Super ! Tu as pris le bus 162 !');
          this.time.delayedCall(2000, () => this.resetScene());
        },
      });
    });
  }

  // ─── Personnage Max ───────────────────────────────────────────────────────

  private createMaxChar(): void {
    const startX = 100;
    const y = ROAD_Y - 60;

    this.maxChar = this.add.rectangle(startX, y, TILE, TILE, 0xFF8A65)
      .setStrokeStyle(2, 0xE64A19);

    this.maxLabel = this.add.text(startX, y - TILE, 'MAX', {
      fontFamily: 'Nunito',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#E64A19',
    }).setOrigin(0.5);
  }

  private flashMaxChar(): void {
    this.tweens.add({
      targets: this.maxChar,
      alpha: 0.3,
      duration: 100,
      yoyo: true,
      repeat: 3,
    });
  }

  // ─── Input ────────────────────────────────────────────────────────────────

  private setupInput(): void {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.isOnBus) return;
      // Tap sur la zone trottoir → Max se déplace
      if (pointer.y < ROAD_Y + 40) {
        this.setMaxTarget(pointer.x, ROAD_Y - 60);
        this.showTapIndicator(pointer.x, pointer.y);
      }
    }, this);
  }

  private setMaxTarget(x: number, y: number): void {
    this.maxTarget = new Phaser.Math.Vector2(
      Phaser.Math.Clamp(x, TILE, GAME_WIDTH - TILE),
      y,
    );
  }

  // ─── TTS ──────────────────────────────────────────────────────────────────

  private speak(text: string): void {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR';
    u.rate = 0.85;
    u.pitch = 1.2;
    window.speechSynthesis.speak(u);
  }

  // ─── UI ───────────────────────────────────────────────────────────────────

  private createHint(): void {
    this.hintText = this.add.text(GAME_WIDTH / 2, 40, 'Tape sur la rue pour marcher !', {
      fontFamily: 'Nunito',
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#1A1A1A',
      backgroundColor: '#FFFFFF',
      padding: { x: 16, y: 8 },
    }).setOrigin(0.5).setDepth(10);
    this.speak('Tape sur la rue pour marcher !');
  }

  private showHint(msg: string): void {
    this.hintText.setText(msg);
    this.hintText.setVisible(msg.length > 0);
    if (msg.length > 0) this.speak(msg);
  }

  private createTapIndicator(): void {
    this.tapIndicator = this.add.circle(0, 0, 20, 0xFFFFFF, 0.4)
      .setStrokeStyle(2, 0xFFFFFF)
      .setDepth(5)
      .setVisible(false);
  }

  private showTapIndicator(x: number, y: number): void {
    this.tapIndicator.setPosition(x, y).setVisible(true).setScale(1).setAlpha(0.6);
    this.tweens.add({
      targets: this.tapIndicator,
      scale: 2,
      alpha: 0,
      duration: 400,
      onComplete: () => this.tapIndicator.setVisible(false),
    });
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  update(_time: number, delta: number): void {
    this.updateMaxMovement(delta);
    this.updateBusTimer(delta);
    this.updateGamepad();
  }

  // ─── Gamepad (8BitDo FC30 – mode Android) ────────────────────────────────

  private updateGamepad(): void {
    if (this.isOnBus) return;
    const pads = navigator.getGamepads();
    const gp = pads[0];
    if (!gp) return;

    // D-pad via axes[0] (gauche/droite) ou buttons[14]/[15]
    const axisX = gp.axes[0] ?? 0;
    const dpadLeft  = (gp.buttons[14]?.pressed) || axisX < -DPAD_DEADZONE;
    const dpadRight = (gp.buttons[15]?.pressed) || axisX >  DPAD_DEADZONE;

    if (dpadLeft || dpadRight) {
      const dir = dpadLeft ? -1 : 1;
      const targetX = Phaser.Math.Clamp(
        this.maxChar.x + dir * 80,
        TILE,
        GAME_WIDTH - TILE,
      );
      this.setMaxTarget(targetX, ROAD_Y - 60);
    }

    // Bouton A (index 0) = interagir avec le bus
    const aDown = gp.buttons[0]?.pressed ?? false;
    if (aDown && !this.gpAWasDown) {
      this.onBusTap();
    }
    this.gpAWasDown = aDown;
  }

  private updateMaxMovement(delta: number): void {
    if (!this.maxTarget || this.isOnBus) return;

    const dx = this.maxTarget.x - this.maxChar.x;
    if (Math.abs(dx) < 4) {
      this.maxChar.x = this.maxTarget.x;
      this.maxTarget = null;
      return;
    }

    const step = MAX_SPEED * (delta / 1000);
    this.maxChar.x += Math.sign(dx) * Math.min(Math.abs(dx), step);
    this.maxLabel.x = this.maxChar.x;

    // Hint dynamique : si Max s'approche du bus
    if (this.busState === 'waiting') {
      const dist = Math.abs(this.maxChar.x - this.STOP_X);
      if (dist < 120) this.showHint('Tape sur le bus !');
    }
  }

  private updateBusTimer(delta: number): void {
    if (this.busState !== 'waiting') return;
    this.busWaitTimer -= delta;
    if (this.busWaitTimer <= 0) {
      // Le bus repart sans Max
      this.busState = 'departing';
      this.tweens.killTweensOf(this.bus);
      this.showHint('Oh non ! Le bus est reparti sans toi...');
      this.tweens.add({
        targets: this.bus,
        x: GAME_WIDTH + 200,
        duration: 3000,
        ease: 'Linear',
        onComplete: () => {
          this.busState = 'gone';
          this.time.delayedCall(2000, () => this.resetScene());
        },
      });
    }
  }

  private resetScene(): void {
    this.isOnBus = false;
    this.maxTarget = null;
    this.scene.restart();
  }
}

