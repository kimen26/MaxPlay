import Phaser from 'phaser';

/**
 * Joystick virtuel touch — base + thumb sur l'écran, fixe en overlay.
 *
 * Important : scrollFactor(0) en Phaser 3 ignore scroll ET zoom de la caméra.
 * Donc base.x/y sont déjà en coords écran (= mêmes coords que pointer.x/y).
 * Pas besoin de multiplier par camera.zoom.
 *
 * Multi-touch supporté : un seul pointer "owner" actif à la fois sur ce joystick.
 */
export class VirtualJoystick {
  readonly delta: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);

  private base: Phaser.GameObjects.Arc;
  private thumb: Phaser.GameObjects.Arc;
  private debugRing: Phaser.GameObjects.Arc;
  private centerX: number;
  private centerY: number;
  private radius: number;
  private hitRadius: number;
  private activePointerId: number | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number, radius = 80) {
    this.centerX = x;
    this.centerY = y;
    this.radius = radius;
    this.hitRadius = radius * 1.3;

    this.debugRing = scene.add.circle(x, y, this.hitRadius, 0xff0000, 0)
      .setStrokeStyle(0)
      .setScrollFactor(0).setDepth(9999);

    this.base = scene.add.circle(x, y, radius, 0x1976D2, 0.55)
      .setStrokeStyle(5, 0xffffff, 0.95)
      .setScrollFactor(0).setDepth(10000);
    this.thumb = scene.add.circle(x, y, radius * 0.5, 0xffffff, 0.98)
      .setStrokeStyle(3, 0x1976D2, 1)
      .setScrollFactor(0).setDepth(10001);

    scene.input.addPointer(3);
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
    this.debugRing.setPosition(x, y);
    if (this.activePointerId === null) this.thumb.setPosition(x, y);
  }

  private onDown(p: Phaser.Input.Pointer): void {
    if (this.activePointerId !== null) return;
    const dx = p.x - this.centerX;
    const dy = p.y - this.centerY;
    if (Math.hypot(dx, dy) <= this.hitRadius) {
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
    this.debugRing.destroy();
  }
}
