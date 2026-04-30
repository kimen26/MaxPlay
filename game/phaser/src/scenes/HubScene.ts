import Phaser from 'phaser';
import { UI_COLORS } from '../constants/colors';

/**
 * HubScene : Le Dépôt de MaxPlay.
 * Responsive : s'adapte à toutes tailles (portrait mobile, paysage tablette, desktop).
 */

const QUIZ_GAMES = [
  { label: 'Quelle\ncouleur ?',      emoji: '🎨', color: 0x0064B1, url: '../mj-01.html' },
  { label: 'Quel\nnuméro ?',         emoji: '🔢', color: 0xF58443, url: '../mj-02.html' },
  { label: 'Compte\nles passagers',  emoji: '👥', color: 0x008C59, url: '../mj-03a.html' },
  { label: 'La bonne\nplace',        emoji: '🪑', color: 0xB43C95, url: '../mj-03b.html' },
  { label: 'Lis\nle mot',            emoji: '📖', color: 0x652C90, url: '../mj-04.html' },
  { label: 'Quel\nbus ?',            emoji: '🚏', color: 0x75CE89, url: '../mj-05.html' },
  { label: 'Au\ngarage !',           emoji: '🏠', color: 0x8D653A, url: '../mj-06.html' },
] as const;

export class HubScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HubScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);

    const W = this.scale.width;
    const H = this.scale.height;
    const portrait = H > W;

    this.createTitle(W, portrait);
    this.createGameCards(W, H, portrait);
    this.createSandboxButton(W, H, portrait);
  }

  private createTitle(W: number, portrait: boolean): void {
    const titleY = portrait ? 50 : 55;
    const subtitleY = portrait ? 90 : 100;

    this.add.text(W / 2, titleY, 'Le Dépôt de MaxPlay', {
      fontFamily: 'Nunito',
      fontSize: portrait ? '28px' : '38px',
      fontStyle: 'bold',
      color: '#1A1A1A',
    }).setOrigin(0.5);

    this.add.text(W / 2, subtitleY, 'Choisis ta mission, petit conducteur !', {
      fontFamily: 'Nunito',
      fontSize: portrait ? '16px' : '20px',
      color: '#555555',
    }).setOrigin(0.5);
  }

  private createGameCards(W: number, _H: number, portrait: boolean): void {
    // En portrait : 2 colonnes × 4 lignes (7 cartes)
    // En paysage  : 4 colonnes ligne 1 + 3 colonnes ligne 2
    const margin = 12;

    if (portrait) {
      const cols = 2;
      const cardW = (W - margin * (cols + 1)) / cols;
      const cardH = cardW * 0.55;
      const startY = 130;
      const gapY = cardH + 12;

      QUIZ_GAMES.forEach((game, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = margin + col * (cardW + margin) + cardW / 2;
        const y = startY + row * gapY + cardH / 2;
        this.createCard(x, y, cardW, cardH, game.color, game.emoji, game.label, game.url, i);
      });
    } else {
      const CARD_W = 210;
      const CARD_H = 120;
      const GAP = 18;
      const ROW1_Y = 265;
      const ROW2_Y = 415;

      const row1Count = 4;
      const row1TotalW = row1Count * CARD_W + (row1Count - 1) * GAP;
      const row1StartX = (W - row1TotalW) / 2 + CARD_W / 2;

      QUIZ_GAMES.slice(0, 4).forEach((game, i) => {
        const x = row1StartX + i * (CARD_W + GAP);
        this.createCard(x, ROW1_Y, CARD_W, CARD_H, game.color, game.emoji, game.label, game.url, i);
      });

      const row2Count = 3;
      const row2TotalW = row2Count * CARD_W + (row2Count - 1) * GAP;
      const row2StartX = (W - row2TotalW) / 2 + CARD_W / 2;

      QUIZ_GAMES.slice(4).forEach((game, i) => {
        const x = row2StartX + i * (CARD_W + GAP);
        this.createCard(x, ROW2_Y, CARD_W, CARD_H, game.color, game.emoji, game.label, game.url, 4 + i);
      });
    }
  }

  private createCard(
    x: number, y: number, cardW: number, cardH: number,
    color: number, emoji: string, label: string,
    url: string, animIndex: number
  ): void {
    const container = this.add.container(x, y);

    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.1);
    shadow.fillRoundedRect(-cardW / 2 + 4, -cardH / 2 + 6, cardW, cardH, 14);

    const bg = this.add.graphics();
    bg.fillStyle(color, 1);
    bg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 14);

    const emojiText = this.add.text(-cardW * 0.28, -2, emoji, {
      fontSize: `${Math.round(cardH * 0.42)}px`,
    }).setOrigin(0.5);

    const labelText = this.add.text(cardW * 0.08, 0, label, {
      fontFamily: 'Nunito',
      fontSize: `${Math.round(cardH * 0.17)}px`,
      fontStyle: 'bold',
      color: '#FFFFFF',
      align: 'left',
      lineSpacing: 2,
    }).setOrigin(0, 0.5);

    const hitZone = this.add.rectangle(0, 0, cardW, cardH, 0xffffff, 0)
      .setInteractive({ cursor: 'pointer' });

    container.add([shadow, bg, emojiText, labelText, hitZone]);

    hitZone.on('pointerover', () => {
      this.tweens.add({ targets: container, scaleX: 1.05, scaleY: 1.05, duration: 120, ease: 'Sine.Out' });
    });
    hitZone.on('pointerout', () => {
      this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 120, ease: 'Sine.Out' });
    });
    hitZone.on('pointerdown', () => {
      this.tweens.add({
        targets: container,
        scaleX: 0.94, scaleY: 0.94,
        duration: 80, yoyo: true,
        onComplete: () => { window.location.href = url; },
      });
    });

    this.tweens.add({
      targets: container,
      y: y - 5,
      duration: 1800 + animIndex * 180,
      ease: 'Sine.InOut',
      yoyo: true,
      repeat: -1,
      delay: animIndex * 140,
    });
  }

  private createSandboxButton(W: number, H: number, portrait: boolean): void {
    const btnY = H - (portrait ? 50 : 65);
    const btnW = portrait ? Math.min(W - 32, 320) : 360;
    const btnH = portrait ? 52 : 58;

    const gfx = this.add.graphics();
    gfx.fillStyle(0xFF8A65, 1);
    gfx.fillRoundedRect(W / 2 - btnW / 2, btnY - btnH / 2, btnW, btnH, 26);
    gfx.lineStyle(3, 0xE64A19, 1);
    gfx.strokeRoundedRect(W / 2 - btnW / 2, btnY - btnH / 2, btnW, btnH, 26);

    this.add.text(W / 2, btnY, '🗺️  La journée de Max  →', {
      fontFamily: 'Nunito',
      fontSize: portrait ? '18px' : '22px',
      fontStyle: 'bold',
      color: '#FFFFFF',
    }).setOrigin(0.5);

    const hit = this.add.rectangle(W / 2, btnY, btnW, btnH, 0xffffff, 0)
      .setInteractive({ cursor: 'pointer' });

    hit.on('pointerdown', () => {
      this.tweens.add({
        targets: gfx,
        scaleX: 0.97, scaleY: 0.97,
        duration: 80, yoyo: true,
        onComplete: () => this.scene.start('SandboxScene'),
      });
    });
  }
}
