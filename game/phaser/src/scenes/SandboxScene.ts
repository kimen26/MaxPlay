import Phaser from 'phaser';
import { SoundManager } from '../utils/SoundManager';

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
  private targetPoint: Phaser.Math.Vector2 | null = null;
  private targetMarker!: Phaser.GameObjects.Arc;

  private passengers: Passenger[] = [];
  private passengersCollected = 0;
  private totalPassengers = 15;

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
    const TILE = 48;
    const COLS = Math.ceil(WORLD_WIDTH / TILE);   // 50
    const ROWS = Math.ceil(WORLD_HEIGHT / TILE);  // 34

    // Réseau de routes en grille :
    //   2 routes H : rows 5-7 (nord) + rows 15-17 (centre, traversant le rond-point)
    //   2 routes V : cols 8-10 (ouest) + cols 24-26 (centre, traversant le rond-point)
    // Rond-point central : cols 18-31, rows 10-21 (14×12)
    const isHRoad = (r: number) => (r >= 15 && r <= 17) || (r >= 5 && r <= 7);
    const isVRoad = (c: number) => (c >= 24 && c <= 26) || (c >= 8 && c <= 10);
    const isHSidewalk = (r: number) => r === 14 || r === 18 || r === 4 || r === 8;
    const isVSidewalk = (c: number) => c === 23 || c === 27 || c === 7 || c === 11;
    const isInRondPoint = (c: number, r: number) => c >= 18 && c <= 31 && r >= 10 && r <= 21;

    const grassMix = ['tile-grass1', 'tile-grass2', 'tile-grass3'];
    const asphMix  = ['tile-asphalt1', 'tile-asphalt2', 'tile-asphalt3'];
    const swMix    = ['tile-sidewalk1', 'tile-sidewalk2'];

    // ─── Layer 1 : sol (tile par tile, hors zone rond-point) ────
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (isInRondPoint(c, r)) continue;  // posé après par le rond-point
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

    // ─── Layer 1b : rond-point central (4 quarts + îlot panneau) ──
    // Quarts 7×6 : NW (18,10), NE (25,10), SW (18,16), SE (25,16)
    this.add.image(18 * TILE, 10 * TILE, 'tile-rp-nw').setOrigin(0, 0).setDepth(-100);
    this.add.image(25 * TILE, 10 * TILE, 'tile-rp-ne').setOrigin(0, 0).setDepth(-100);
    this.add.image(18 * TILE, 16 * TILE, 'tile-rp-sw').setOrigin(0, 0).setDepth(-100);
    this.add.image(25 * TILE, 16 * TILE, 'tile-rp-se').setOrigin(0, 0).setDepth(-100);
    // Îlot+panneau 3×4 (col=6, row=5 dans grille rond-point => abs (24, 15))
    this.add.image(24 * TILE, 15 * TILE, 'tile-rp-ilot').setOrigin(0, 0).setDepth(-50);

    // ─── Layer 1c : pointillés blancs au centre des routes ─────
    // Routes H axes : row 6 et row 16 ; Routes V axes : col 9 et col 25
    const isCrossing = (c: number, r: number) => isHRoad(r) && isVRoad(c);
    for (let c = 0; c < COLS; c++) {
      // Pointillé route H nord (row 6) sauf croisements
      if (!isVRoad(c)) {
        this.add.image(c * TILE, 6 * TILE, 'tile-line-h').setOrigin(0, 0).setDepth(-99);
      }
      // Pointillé route H centrale (row 16) sauf rond-point + croisements
      if (!isInRondPoint(c, 16) && !isVRoad(c)) {
        this.add.image(c * TILE, 16 * TILE, 'tile-line-h').setOrigin(0, 0).setDepth(-99);
      }
    }
    for (let r = 0; r < ROWS; r++) {
      // Pointillé route V ouest (col 9) sauf croisements
      if (!isHRoad(r)) {
        this.add.image(9 * TILE, r * TILE, 'tile-line-v').setOrigin(0, 0).setDepth(-99);
      }
      // Pointillé route V centrale (col 25) sauf rond-point + croisements
      if (!isInRondPoint(25, r) && !isHRoad(r)) {
        this.add.image(25 * TILE, r * TILE, 'tile-line-v').setOrigin(0, 0).setDepth(-99);
      }
    }
    void isCrossing;

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

    // ─── Layer 3 : arbres répartis sur les "îlots" entre les routes ──
    const bushKeys = ['tile-bush1', 'tile-bush2', 'tile-bush3'];
    const trees: Array<[number, number]> = [
      // NO (avant route N, à l'ouest de la route V ouest)
      [2, 2], [5, 1], [2, 11], [5, 13],
      // NE (entre route V ouest et rond-point) - SE limité par route H nord
      [14, 1], [16, 13], [14, 9],
      // E (à droite du rond-point, au-dessus de la route H centrale)
      [33, 2], [38, 1], [44, 2], [48, 1],
      [33, 13], [38, 13], [44, 13], [48, 13],
      // SO (à gauche du rond-point, sous route H centrale)
      [2, 22], [5, 22], [14, 22], [16, 22],
      [2, 30], [5, 32], [14, 30], [16, 32],
      // SE (à droite du rond-point, sous route H centrale)
      [33, 22], [38, 22], [44, 22], [48, 22],
      [33, 30], [38, 32], [44, 30], [48, 32],
    ];
    trees.forEach(([c, r], i) => {
      if (isInRondPoint(c, r)) return;
      const key = bushKeys[i % 3];
      this.add.image(c * TILE, r * TILE, key).setOrigin(0, 0).setDepth(r * TILE);
    });

    // ─── Layer 4 : arrêts de bus (3 stratégiques) ────────────────
    // Banc remonté sur le trottoir (y = trottoir_row - 1)
    this.createBusStop(2 * TILE,  13 * TILE, '162');  // trottoir N centrale, ouest extrême
    this.createBusStop(40 * TILE, 13 * TILE, 'M7');   // trottoir N centrale, est
    this.createBusStop(15 * TILE, 18 * TILE, '380');  // trottoir S centrale, milieu-ouest

    // ─── Layer 5 : lampadaires (réduits, hors zone rond-point) ──
    const lamps: Array<[number, number]> = [
      // Le long de la route H centrale (row 13 nord, row 19 sud)
      [4, 13], [15, 13], [37, 13], [44, 13],
      [4, 19], [15, 19], [37, 19], [44, 19],
      // Le long de la route H nord (row 3, row 9)
      [4, 3], [15, 3], [30, 3], [44, 3],
      [4, 9], [15, 9], [30, 9], [44, 9],
    ];
    lamps.forEach(([c, r]) => {
      if (isInRondPoint(c, r)) return;
      // Pole tile = 48×192 → ancré 4 rows au-dessus de la base
      this.add.image(c * TILE, (r - 3) * TILE, 'tile-pole').setOrigin(0, 0).setDepth(r * TILE);
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

    this.targetMarker = this.add.circle(0, 0, 25, 0x4CAF50, 0.3)
      .setStrokeStyle(3, 0x4CAF50)
      .setVisible(false)
      .setDepth(1000);
  }

  private createPassengers(): void {
    // Passagers répartis sur les trottoirs des 4 routes (hors rond-point)
    const positions = [
      // Trottoir N route H nord (y = 4*48 = 192)
      { x: 200, y: 192 }, { x: 600, y: 192 }, { x: 1700, y: 192 }, { x: 2100, y: 192 },
      // Trottoir S route H nord (y = 8*48 = 384)
      { x: 400, y: 384 }, { x: 1200, y: 384 }, { x: 1900, y: 384 },
      // Trottoir N route H centrale, hors rond-point (y = 14*48 = 672)
      { x: 200, y: 672 }, { x: 1700, y: 672 },
      // Trottoir S route H centrale, hors rond-point (y = 18*48 = 864)
      { x: 500, y: 864 }, { x: 1700, y: 864 }, { x: 2100, y: 864 },
      // Trottoir W route V ouest (x = 7*48 = 336)
      { x: 336, y: 1100 }, { x: 528, y: 1300 },
      // Trottoir route V centrale (col 23, x = 1104), hors rond-point
      { x: 1104, y: 1300 },
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

  // Zone interdite : îlot central du rond-point
  // Îlot _54 (3×4) posé en (col=24, row=15) → pixels (1152..1296, 720..912)
  // Buffer ~30px pour la taille du bus
  private readonly ILOT = { xMin: 1152 - 30, xMax: 1296 + 30, yMin: 720 - 20, yMax: 912 + 20 };

  private isInIlot(x: number, y: number): boolean {
    return x >= this.ILOT.xMin && x <= this.ILOT.xMax
        && y >= this.ILOT.yMin && y <= this.ILOT.yMax;
  }

  private setTargetPoint(rawX: number, rawY: number): void {
    let x = Phaser.Math.Clamp(rawX, 50, WORLD_WIDTH - 50);
    let y = Phaser.Math.Clamp(rawY, 50, WORLD_HEIGHT - 50);
    // Si tap dans l'îlot, snap au bord le plus proche
    if (this.isInIlot(x, y)) {
      const cx = (this.ILOT.xMin + this.ILOT.xMax) / 2;
      const cy = (this.ILOT.yMin + this.ILOT.yMax) / 2;
      const dx = x - cx;
      const dy = y - cy;
      // Pousser le tap au-delà du bord le plus proche
      if (Math.abs(dx) > Math.abs(dy)) {
        x = dx > 0 ? this.ILOT.xMax + 40 : this.ILOT.xMin - 40;
      } else {
        y = dy > 0 ? this.ILOT.yMax + 40 : this.ILOT.yMin - 40;
      }
    }
    this.targetPoint = new Phaser.Math.Vector2(x, y);
    this.targetMarker.setPosition(this.targetPoint.x, this.targetPoint.y).setVisible(true).setScale(0);
    this.tweens.add({ targets: this.targetMarker, scale: 1, duration: 200 });
  }

  private createUI(): void {
    const W = this.scale.width;
    const H = this.scale.height;

    this.passengerText = this.add.text(16, 16, '🧍 0 / 15', {
      fontFamily: 'Nunito', fontSize: '28px', fontStyle: 'bold', color: '#1A1A1A',
      backgroundColor: '#FFFFFFDD', padding: { x: 16, y: 10 },
    }).setScrollFactor(0).setDepth(10000);

    this.add.text(W / 2, H - 36, '👆 Touche pour conduire', {
      fontFamily: 'Nunito', fontSize: '16px', color: '#444444', backgroundColor: '#FFFFFFCC', padding: { x: 16, y: 8 },
    }).setOrigin(0.5).setScrollFactor(0).setDepth(10000);
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
    });
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

    const prevX = this.bus.x;
    const prevY = this.bus.y;
    this.bus.x += this.busVelocity.x * dt;
    this.bus.y += this.busVelocity.y * dt;
    this.bus.x = Phaser.Math.Clamp(this.bus.x, 50, WORLD_WIDTH - 50);
    this.bus.y = Phaser.Math.Clamp(this.bus.y, 50, WORLD_HEIGHT - 50);

    // Collision : îlot central du rond-point infranchissable
    if (this.isInIlot(this.bus.x, this.bus.y)) {
      this.bus.x = prevX;
      this.bus.y = prevY;
      this.busVelocity.set(0, 0);
      this.targetPoint = null;
      this.targetMarker.setVisible(false);
    }
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
}
