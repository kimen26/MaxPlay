import Phaser from 'phaser';
import { SoundManager } from '../utils/SoundManager';
import { VirtualJoystick } from '../controls/VirtualJoystick';

const BUS_SPEED = 220;
const WORLD_WIDTH = 2400;
const WORLD_HEIGHT = 1600;

// Toggle test 2026-04-30 : bus SVG profil "MaxPlay" vs sprite top-down d'origine
// TODO: redemander à l'utilisateur dans qq heures si on supprime le top-down
const USE_SVG_BUS = true;

interface Passenger {
  x: number;
  y: number;
  collected: boolean;
  sprite?: Phaser.GameObjects.Text;
}

export class SandboxScene extends Phaser.Scene {
  private bus!: Phaser.GameObjects.Sprite;
  private busVelocity: Phaser.Math.Vector2;
  private joystick!: VirtualJoystick;
  private honkButton!: Phaser.GameObjects.Container;

  private passengers: Passenger[] = [];
  private passengersCollected = 0;
  private totalPassengers = 15;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private passengerText!: Phaser.GameObjects.Text;
  private soundManager!: SoundManager;
  private version: string = '';

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
    this.loadVersion();

    // Démarrer le moteur
    this.soundManager.startEngine();
  }

  private createCleanWorld(): void {
    const TILE = 48;
    const COLS = Math.ceil(WORLD_WIDTH / TILE);   // 50
    const ROWS = Math.ceil(WORLD_HEIGHT / TILE);  // 34

    // Croisement central : route H rows 15-17, route V cols 24-26 (3 tiles chacune)
    // Trottoirs : rows 14 et 18 (H), cols 23 et 27 (V)
    const isHRoad = (r: number) => r >= 15 && r <= 17;
    const isVRoad = (c: number) => c >= 24 && c <= 26;
    const isHSidewalk = (r: number) => r === 14 || r === 18;
    const isVSidewalk = (c: number) => c === 23 || c === 27;

    const grassMix = ['tile-grass1', 'tile-grass2', 'tile-grass3'];
    const asphMix  = ['tile-asphalt1', 'tile-asphalt2', 'tile-asphalt3'];
    const swMix    = ['tile-sidewalk1', 'tile-sidewalk2'];

    // ─── Layer 1 : sol (tile par tile) ──────────────────────────
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        let key: string;
        if (isHRoad(r) || isVRoad(c)) {
          key = asphMix[(r + c) % 3];
        } else if (isHSidewalk(r) || isVSidewalk(c)) {
          key = swMix[(r + c) % 2];
        } else {
          key = grassMix[(r * 7 + c * 3) % 3];
        }
        this.add.image(c * TILE, r * TILE, key).setOrigin(0, 0).setDepth(-100);
      }
    }

    // ─── Layer 1b : pointillés blancs au centre des routes ─────
    // Route H axe central = row 16 ; Route V axe central = col 25
    const INTERSECTION_R = (r: number) => r >= 15 && r <= 17;
    const INTERSECTION_C = (c: number) => c >= 24 && c <= 26;
    for (let c = 0; c < COLS; c++) {
      // Pointillés H sur row 16, sauf intersection
      if (!INTERSECTION_C(c)) {
        this.add.image(c * TILE, 16 * TILE, 'tile-line-h').setOrigin(0, 0).setDepth(-99);
      }
    }
    for (let r = 0; r < ROWS; r++) {
      // Pointillés V sur col 25, sauf intersection
      if (!INTERSECTION_R(r)) {
        this.add.image(25 * TILE, r * TILE, 'tile-line-v').setOrigin(0, 0).setDepth(-99);
      }
    }

    // ─── Layer 2 : maisons (toyhouse 4×5 = 192×240 px) ──────────
    // 4 quadrants, chacun avec 1-2 maisons sur grass
    const houses: Array<[number, number, string]> = [
      // Mix maisons rouges + bleues + jaune pour diversité visuelle
      // Quadrant NO
      [3 * TILE,  3 * TILE,  'tile-toyhouse1'],       // rouge
      [12 * TILE, 4 * TILE,  'tile-toyhouse-blue1'],  // bleue
      // Quadrant NE
      [33 * TILE, 3 * TILE,  'tile-toyhouse-blue2'],  // bleue
      [42 * TILE, 4 * TILE,  'tile-toyhouse6'],       // rouge
      // Quadrant SO
      [3 * TILE,  22 * TILE, 'tile-toyhouse-yellow'], // jaune
      [12 * TILE, 23 * TILE, 'tile-toyhouse5'],       // rouge
      // Quadrant SE
      [33 * TILE, 22 * TILE, 'tile-toyhouse4'],       // rouge
      [42 * TILE, 23 * TILE, 'tile-toyhouse-blue1'],  // bleue
    ];
    houses.forEach(([x, y, key]) => {
      this.add.image(x, y, key).setOrigin(0, 0).setDepth(y);
    });

    // ─── Layer 3 : arbres répartis sur grass ────────────────────
    const bushKeys = ['tile-bush1', 'tile-bush2', 'tile-bush3'];
    const trees: Array<[number, number]> = [
      [9, 1], [11, 9], [20, 2], [22, 11],
      [29, 1], [31, 9], [40, 2], [47, 11],
      [9, 21], [11, 28], [20, 23], [22, 30],
      [29, 21], [31, 28], [40, 23], [47, 30],
      [16, 9], [37, 9], [16, 23], [37, 23],
    ];
    trees.forEach(([c, r], i) => {
      const key = bushKeys[i % 3];
      this.add.image(c * TILE, r * TILE, key).setOrigin(0, 0).setDepth(r * TILE);
    });

    // ─── Layer 4 : arrêts de bus (poteau + abri) ────────────────
    // Positions : 3 arrêts inspirés du jeu original
    // Bus stop : banc remonté sur le trottoir (y = trottoir_row - 1 pour ancrer la base sur le trottoir)
    this.createBusStop(6 * TILE,  13 * TILE, '162');  // trottoir N, ouest
    this.createBusStop(20 * TILE, 13 * TILE, 'M7');   // trottoir N, milieu
    this.createBusStop(40 * TILE, 18 * TILE, '380');  // trottoir S, est (déjà OK)

    // ─── Layer 5 : lampadaires (electric_pole 1×4 = 48×192) ─────
    const lamps: Array<[number, number]> = [
      [8, 13], [15, 13], [29, 13], [36, 13], [43, 13], // nord
      [8, 19], [15, 19], [29, 19], [36, 19], [43, 19], // sud
    ];
    lamps.forEach(([c, r]) => {
      // Pole tile = 48×192 → ancré 4 rows au-dessus de la base
      this.add.image(c * TILE, (r - 3) * TILE, 'tile-pole').setOrigin(0, 0).setDepth(r * TILE);
    });

    // ─── Layer 6 : décorations (poubelles, panneaux, fleurs) ────
    this.add.image(10 * TILE, 14 * TILE, 'tile-trash').setOrigin(0, 0).setDepth(14 * TILE);
    this.add.image(34 * TILE, 18 * TILE, 'tile-trash').setOrigin(0, 0).setDepth(18 * TILE);
    this.add.image(25 * TILE, 14 * TILE, 'tile-info-sign').setOrigin(0, 0).setDepth(14 * TILE);
    this.add.image(25 * TILE, 18 * TILE, 'tile-mailbox').setOrigin(0, 0).setDepth(18 * TILE);

    const flowerKeys = ['tile-flower-r', 'tile-flower-y', 'tile-flower-p'];
    const flowers: Array<[number, number]> = [
      [8, 8], [16, 7], [25, 6], [35, 8], [45, 7],
      [8, 25], [16, 26], [25, 27], [35, 25], [45, 26],
    ];
    flowers.forEach(([c, r], i) => {
      this.add.image(c * TILE, r * TILE, flowerKeys[i % 3]).setOrigin(0, 0).setDepth(r * TILE);
    });
  }

  private createBusStop(x: number, y: number, line: string): void {
    // Banc d'attente (tile bench_city = 96×96 ancré top-left)
    this.add.image(x, y, 'tile-bench-city').setOrigin(0, 0).setDepth(y);

    // Panneau d'arrêt : rectangle bleu RATP avec numéro de ligne (au-dessus du banc)
    const signX = x + 24;       // centré sur le banc
    const signY = y - 32;
    this.add.rectangle(signX, signY, 6, 40, 0x424242).setOrigin(0.5, 0).setDepth(y);  // mât
    this.add.rectangle(signX, signY, 50, 22, 0x1976D2)
      .setStrokeStyle(2, 0xFFFFFF)
      .setOrigin(0.5, 0)
      .setDepth(y);
    this.add.text(signX, signY + 11, line, {
      fontFamily: 'Nunito', fontSize: '14px', fontStyle: 'bold', color: '#FFFFFF',
    }).setOrigin(0.5).setDepth(y + 1);
  }

  private createBus(): void {
    const spawnX = WORLD_WIDTH / 2;
    const spawnY = WORLD_HEIGHT / 2;
    
    if (USE_SVG_BUS) {
      // Bus SVG profil — toujours vue de côté (pas de rotation par direction)
      this.bus = this.add.sprite(spawnX, spawnY, 'bus-svg-profile')
        .setScale(0.7)
        .setOrigin(0.5, 0.5);
    } else {
      this.bus = this.add.sprite(spawnX, spawnY, 'bus-topdown', 24)
        .setScale(0.6)
        .setOrigin(0.5, 0.5);
    }
    
    // Ombre
    const shadow = this.add.ellipse(spawnX, spawnY + 10, 90, 40, 0x000000, 0.2);
    
    this.events.on('update', () => {
      shadow.x = this.bus.x;
      shadow.y = this.bus.y + 10;
      shadow.setDepth(this.bus.y - 1);
      this.bus.setDepth(this.bus.y);
    });

  }

  private createPassengers(): void {
    const TROT_N = WORLD_HEIGHT / 2 - 85; // trottoir nord de la route H
    const TROT_S = WORLD_HEIGHT / 2 + 85; // trottoir sud de la route H
    const TROT_E = WORLD_WIDTH / 2 + 85;  // trottoir est de la route V
    const TROT_W = WORLD_WIDTH / 2 - 85;  // trottoir ouest de la route V
    const positions = [
      // Trottoir nord
      { x: 300,  y: TROT_N }, { x: 600,  y: TROT_N }, { x: 950,  y: TROT_N },
      { x: 1300, y: TROT_N }, { x: 1650, y: TROT_N }, { x: 2000, y: TROT_N },
      // Trottoir sud
      { x: 450,  y: TROT_S }, { x: 800,  y: TROT_S }, { x: 1100, y: TROT_S },
      { x: 1500, y: TROT_S }, { x: 1900, y: TROT_S },
      // Trottoirs verticaux
      { x: TROT_W, y: 350 }, { x: TROT_E, y: 500 },
      { x: TROT_W, y: 900 }, { x: TROT_E, y: 1100 },
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
    this.input.on('pointerdown', () => {
      if (!audioStarted) {
        this.soundManager.resumeAudio();
        audioStarted = true;
      }
    });

    // Joystick bas-gauche
    const W = this.scale.width;
    const H = this.scale.height;
    this.joystick = new VirtualJoystick(this, 180, H - 150, 80);

    // Bouton klaxon bas-droite — gros, contrasté
    const btnX = W - 110;
    const btnY = H - 150;
    const btnBg = this.add.circle(0, 0, 60, 0xE53935, 0.92)
      .setStrokeStyle(5, 0xffffff, 1);
    const btnIcon = this.add.text(0, 0, '📢', { fontSize: '52px' }).setOrigin(0.5);
    this.honkButton = this.add.container(btnX, btnY, [btnBg, btnIcon])
      .setSize(120, 120)
      .setScrollFactor(0)
      .setDepth(10000)
      .setInteractive({ useHandCursor: true });
    this.honkButton.on('pointerdown', () => this.triggerHonk());
  }

  private createUI(): void {
    const W = this.scale.width;
    const H = this.scale.height;

    this.passengerText = this.add.text(16, 16, '🧍 0 / 15', {
      fontFamily: 'Nunito', fontSize: '28px', fontStyle: 'bold', color: '#1A1A1A',
      backgroundColor: '#FFFFFFDD', padding: { x: 16, y: 10 },
    }).setScrollFactor(0).setDepth(10000);

    this.add.text(W / 2, 24, '🕹️ Joystick pour conduire · 📢 pour klaxonner', {
      fontFamily: 'Nunito', fontSize: '16px', color: '#444444', backgroundColor: '#FFFFFFCC', padding: { x: 16, y: 8 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(10000);

    this.add.text(W - 16, H - 16, `v${this.version}`, {
      fontFamily: 'Nunito', fontSize: '14px', color: '#666666', backgroundColor: '#FFFFFFAA', padding: { x: 8, y: 4 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(10000);
  }

  private setupCamera(): void {
    const W = this.scale.width;
    const H = this.scale.height;
    const zoom = Math.max(W / WORLD_WIDTH, H / WORLD_HEIGHT, 0.45);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.startFollow(this.bus, true, 0.08, 0.08);
    this.cameras.main.setZoom(zoom);

    this.scale.on('resize', () => {
      const w = this.scale.width;
      const h = this.scale.height;
      this.cameras.main.setZoom(Math.max(w / WORLD_WIDTH, h / WORLD_HEIGHT, 0.45));
      if (this.joystick) this.joystick.setCenter(180, h - 150);
      if (this.honkButton) this.honkButton.setPosition(w - 110, h - 150);
    });
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    this.updateBusMovement(dt);
    this.updateHonk();
    this.checkPassengers();
  }

  private updateBusMovement(dt: number): void {
    // Joystick prioritaire (deadzone 0.15)
    const j = this.joystick.delta;
    const jMag = Math.hypot(j.x, j.y);

    if (jMag > 0.15) {
      this.busVelocity.x = j.x * BUS_SPEED;
      this.busVelocity.y = j.y * BUS_SPEED;
    } else {
      // Clavier backup
      let kx = 0, ky = 0;
      if (this.cursors.left?.isDown) kx = -1;
      if (this.cursors.right?.isDown) kx = 1;
      if (this.cursors.up?.isDown) ky = -1;
      if (this.cursors.down?.isDown) ky = 1;

      if (kx !== 0 || ky !== 0) {
        if (kx !== 0 && ky !== 0) { kx *= 0.707; ky *= 0.707; }
        this.busVelocity.x = kx * BUS_SPEED;
        this.busVelocity.y = ky * BUS_SPEED;
      } else {
        this.busVelocity.scale(0.85);
      }
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
    if (USE_SVG_BUS) {
      // SVG profil : swap texture (carrosserie miroir, numéro lisible) selon direction X
      if (this.busVelocity.x < -10 && this.bus.texture.key !== 'bus-svg-profile-left') {
        this.bus.setTexture('bus-svg-profile-left');
      } else if (this.busVelocity.x > 10 && this.bus.texture.key !== 'bus-svg-profile') {
        this.bus.setTexture('bus-svg-profile');
      }
      return;
    }
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
      this.triggerHonk();
    }
  }

  private triggerHonk(): void {
    this.soundManager.resumeAudio();
    this.soundManager.honk();
    this.tweens.add({ targets: this.bus, scaleX: 0.65, scaleY: 0.65, duration: 100, yoyo: true });

    const beep = this.add.text(this.bus.x, this.bus.y - 50, '📢 BEEP!', {
      fontFamily: 'Nunito', fontSize: '24px', fontStyle: 'bold', color: '#FF6B00',
    }).setOrigin(0.5);
    this.tweens.add({ targets: beep, y: beep.y - 40, alpha: 0, duration: 800, onComplete: () => beep.destroy() });
  }

  private checkPassengers(): void {
    this.passengers.forEach(p => {
      if (p.collected || !p.sprite) return;
      
      const dist = Phaser.Math.Distance.Between(this.bus.x, this.bus.y, p.x, p.y);
      if (dist < 110) {
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
    const W = this.scale.width;
    const H = this.scale.height;
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.7)
      .setScrollFactor(0).setDepth(20000);

    this.add.text(W / 2, H / 2 - 50, '🎉 BRAVO! 🎉', {
      fontFamily: 'Nunito', fontSize: '52px', fontStyle: 'bold', color: '#FFD700',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20001);

    this.add.text(W / 2, H / 2 + 30, 'Tu as collecté tous les passagers!', {
      fontFamily: 'Nunito', fontSize: '24px', color: '#FFFFFF',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20001);

    this.time.delayedCall(4000, () => this.scene.restart());
  }

  private async loadVersion(): Promise<void> {
    try {
      const response = await fetch('/version.txt');
      this.version = (await response.text()).trim();
    } catch {
      this.version = 'unknown';
    }
  }
}
