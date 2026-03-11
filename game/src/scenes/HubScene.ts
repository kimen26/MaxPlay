import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants/config';
import { UI_COLORS } from '../constants/colors';

/**
 * HubScene : Le Dépôt de MaxPlay.
 * Écran principal avec les 7 mini-jeux (quiz HTML) + sandbox Phaser.
 * Les jeux HTML sont servis par le plugin Vite sur /game-html/*.
 */

const QUIZ_GAMES = [
  { label: 'Quelle\ncouleur ?',      emoji: '🎨', color: 0x0064B1, url: '/game-html/mj-01.html' },
  { label: 'Quel\nnuméro ?',         emoji: '🔢', color: 0xF58443, url: '/game-html/mj-02.html' },
  { label: 'Compte\nles passagers',  emoji: '👥', color: 0x008C59, url: '/game-html/mj-03a.html' },
  { label: 'La bonne\nplace',        emoji: '🪑', color: 0xB43C95, url: '/game-html/mj-03b.html' },
  { label: 'Lis\nle mot',            emoji: '📖', color: 0x652C90, url: '/game-html/mj-04.html' },
  { label: 'Quel\nbus ?',            emoji: '🚏', color: 0x75CE89, url: '/game-html/mj-05.html' },
  { label: 'Au\ngarage !',           emoji: '🏠', color: 0x8D653A, url: '/game-html/mj-06.html' },
] as const;

// Layout : 4 cartes ligne 1, 3 cartes ligne 2
const CARD_W = 210;
const CARD_H = 120;
const GAP = 18;
const ROW1_Y = 265;
const ROW2_Y = 415;

export class HubScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HubScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);
    this.createTitle();
    this.createGameCards();
    this.createSandboxButton();
  }

  private createTitle(): void {
    this.add.text(GAME_WIDTH / 2, 55, 'Le Dépôt de MaxPlay', {
      fontFamily: 'Nunito',
      fontSize: '38px',
      fontStyle: 'bold',
      color: '#1A1A1A',
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, 100, 'Choisis ta mission, petit conducteur !', {
      fontFamily: 'Nunito',
      fontSize: '20px',
      color: '#555555',
    }).setOrigin(0.5);
  }

  private createGameCards(): void {
    // Rang 1 : 4 cartes centrées
    const row1Count = 4;
    const row1TotalW = row1Count * CARD_W + (row1Count - 1) * GAP;
    const row1StartX = (GAME_WIDTH - row1TotalW) / 2 + CARD_W / 2;

    QUIZ_GAMES.slice(0, 4).forEach((game, i) => {
      const x = row1StartX + i * (CARD_W + GAP);
      this.createCard(x, ROW1_Y, game.color, game.emoji, game.label, game.url, i);
    });

    // Rang 2 : 3 cartes centrées
    const row2Count = 3;
    const row2TotalW = row2Count * CARD_W + (row2Count - 1) * GAP;
    const row2StartX = (GAME_WIDTH - row2TotalW) / 2 + CARD_W / 2;

    QUIZ_GAMES.slice(4).forEach((game, i) => {
      const x = row2StartX + i * (CARD_W + GAP);
      this.createCard(x, ROW2_Y, game.color, game.emoji, game.label, game.url, 4 + i);
    });
  }

  private createCard(
    x: number, y: number,
    color: number, emoji: string, label: string,
    url: string, animIndex: number
  ): void {
    const container = this.add.container(x, y);

    // Ombre portée
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.1);
    shadow.fillRoundedRect(-CARD_W / 2 + 4, -CARD_H / 2 + 6, CARD_W, CARD_H, 16);

    // Corps de la carte
    const bg = this.add.graphics();
    bg.fillStyle(color, 1);
    bg.fillRoundedRect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, 16);

    // Emoji (côté gauche)
    const emojiText = this.add.text(-62, -4, emoji, { fontSize: '36px' }).setOrigin(0.5);

    // Label (côté droit)
    const labelText = this.add.text(18, 0, label, {
      fontFamily: 'Nunito',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#FFFFFF',
      align: 'left',
      lineSpacing: 4,
    }).setOrigin(0, 0.5);

    // Zone interactive
    const hitZone = this.add.rectangle(0, 0, CARD_W, CARD_H, 0xffffff, 0)
      .setInteractive({ cursor: 'pointer' });

    container.add([shadow, bg, emojiText, labelText, hitZone]);

    // Hover / tap
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

    // Idle float
    this.tweens.add({
      targets: container,
      y: y - 6,
      duration: 1800 + animIndex * 180,
      ease: 'Sine.InOut',
      yoyo: true,
      repeat: -1,
      delay: animIndex * 140,
    });
  }

  private createSandboxButton(): void {
    const btnY = GAME_HEIGHT - 65;
    const btnW = 360;
    const btnH = 58;

    const gfx = this.add.graphics();
    gfx.fillStyle(0xFF8A65, 1);
    gfx.fillRoundedRect(GAME_WIDTH / 2 - btnW / 2, btnY - btnH / 2, btnW, btnH, 29);
    gfx.lineStyle(3, 0xE64A19, 1);
    gfx.strokeRoundedRect(GAME_WIDTH / 2 - btnW / 2, btnY - btnH / 2, btnW, btnH, 29);

    this.add.text(GAME_WIDTH / 2, btnY, '🗺️  La journée de Max  →', {
      fontFamily: 'Nunito',
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#FFFFFF',
    }).setOrigin(0.5);

    const hit = this.add.rectangle(GAME_WIDTH / 2, btnY, btnW, btnH, 0xffffff, 0)
      .setInteractive({ cursor: 'pointer' });

    hit.on('pointerover', () => {
      this.tweens.add({ targets: gfx, scaleX: 1.03, scaleY: 1.03, duration: 100 });
    });
    hit.on('pointerout', () => {
      this.tweens.add({ targets: gfx, scaleX: 1, scaleY: 1, duration: 100 });
    });
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
