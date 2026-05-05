import Phaser from 'phaser';

/**
 * Joystick virtuel touch — base + thumb sur l'écran, fixe en overlay.
 *
 * Usage :
 *   this.joystick = new VirtualJoystick(this, 140, this.scale.height - 140);
 *   // dans update : const v = this.joystick.delta;  (delta.x/.y dans [-1, 1])
 *
 * Multi-touch supporté : un seul pointer "owner" actif à la fois sur ce joystick.
 * D'autres pointers (klaxon, etc.) ne perturbent pas la prise.
 */
export class VirtualJoystick {
  readonly delta: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);

  private base: Phaser.GameObjects.Arc;
  private thumb: Phaser.GameObjects.Arc;
  private centerX: number;
  private centerY: number;
  private radius: number;
  private activePointerId: number | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number, radius = 80) {
    this.centerX = x;
    this.centerY = y;
    this.radius = radius;

    this.base = scene.add.circle(x, y, radius, 0x1976D2, 0.55)
      .setStrokeStyle(5, 0xffffff, 0.95)
      .setScrollFactor(0).setDepth(10000);
    this.thumb = scene.add.circle(x, y, radius * 0.5, 0xffffff, 0.98)
      .setStrokeStyle(3, 0x1976D2, 1)
      .setScrollFactor(0).setDepth(10001);

    scene.input.addPointer(3);  // multi-touch
    scene.input.on('pointerdown', this.onDown, this);
    scene.input.on('pointermove', this.onMove, this);
    scene.input.on('pointerup', this.onUp, this);
    scene.input.on('pointerupoutside', this.onUp, this);
  }

  /** Repositionne le joystick (pour resize). */
  setCenter(x: number, y: number): void {
    this.centerX = x;
    this.centerY = y;
    this.base.setPosition(x, y);
    if (this.activePointerId === null) this.thumb.setPosition(x, y);
  }

  private onDown(p: Phaser.Input.Pointer): void {
    if (this.activePointerId !== null) return;
    const dx = p.x - this.centerX;
    const dy = p.y - this.centerY;
    // Zone d'activation = 1.6× le rayon (plus tolérant pour gros doigts)
    if (Math.hypot(dx, dy) <= this.radius * 1.6) {
      this.activePointerId = p.id;
      this.updateThumb(p);
    }
  }

  private onMove(p: Phaser.Input.Pointer): void {
    if (this.activePointerId !== p.id) return;
    this.updateThumb(p);
  }

  private onUp(p: Phaser.Input.Pointer): void {
    if (this.activePointerId !== p.id) return;
    this.activePointerId = null;
    this.thumb.setPosition(this.centerX, this.centerY);
    this.delta.set(0, 0);
  }

  private updateThumb(p: Phaser.Input.Pointer): void {
    let dx = p.x - this.centerX;
    let dy = p.y - this.centerY;
    const dist = Math.hypot(dx, dy);
    if (dist > this.radius) {
      dx = (dx / dist) * this.radius;
      dy = (dy / dist) * this.radius;
    }
    this.thumb.setPosition(this.centerX + dx, this.centerY + dy);
    this.delta.set(dx / this.radius, dy / this.radius);
  }

  destroy(): void {
    this.base.destroy();
    this.thumb.destroy();
  }
}
