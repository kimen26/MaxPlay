import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants/config';
import { UI_COLORS, BUS_LINE_COLORS } from '../constants/colors';

/**
 * HubScene : le Dépôt de MaxPlay.
 * Écran principal depuis lequel l'enfant choisit un mini-jeu.
 * Chaque bus dans son box = un mini-jeu.
 */
export class HubScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HubScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);

    this.createTitle();
    this.createBusSlots();
    this.createSandboxButton();
  }

  private createTitle(): void {
    this.add.text(GAME_WIDTH / 2, 60, 'Le Dépôt de MaxPlay', {
      fontFamily: 'Nunito',
      fontSize: '40px',
      fontStyle: 'bold',
      color: '#1A1A1A',
    }).setOrigin(0.5);
  }

  private createBusSlots(): void {
    // Mini-jeux disponibles (à développer progressivement)
    const minigames = [
      { key: 'MiniGameBonBus', label: 'Le Bon Bus', color: BUS_LINE_COLORS['162'], lineNum: '162' },
      { key: 'MiniGameColorieLigne', label: 'Colorie la Ligne', color: BUS_LINE_COLORS['185'], lineNum: '185' },
      { key: 'MiniGameCompteArrets', label: 'Compte les Arrêts', color: BUS_LINE_COLORS['172'], lineNum: '172' },
    ];

    const startX = 160;
    const spacing = 240;
    const y = GAME_HEIGHT / 2;

    minigames.forEach((mg, i) => {
      const x = startX + i * spacing;
      this.createBusButton(x, y, mg.color, mg.lineNum, mg.label, mg.key, i);
    });
  }

  private createBusButton(
    x: number, y: number,
    color: number, lineNum: string,
    label: string, sceneKey: string,
    index: number = 0
  ): void {
    // Corps du bus (rectangle arrondi)
    const bus = this.add.rectangle(x, y, 160, 100, color, 1)
      .setInteractive({ cursor: 'pointer' });

    // Numéro de ligne
    this.add.text(x, y, String(lineNum), {
      fontFamily: 'Nunito',
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#FFFFFF',
    }).setOrigin(0.5);

    // Label sous le bus
    this.add.text(x, y + 80, label, {
      fontFamily: 'Nunito',
      fontSize: '22px',
      color: '#1A1A1A',
    }).setOrigin(0.5);

    // Interaction
    bus.on('pointerdown', () => {
      this.tweens.add({
        targets: bus,
        scaleY: 0.9,
        duration: 100,
        yoyo: true,
        onComplete: () => {
          // TODO: lancer le mini-jeu quand les scènes existent
          console.log(`Lancer ${sceneKey}`);
        },
      });
    });

    // Idle animation
    this.tweens.add({
      targets: bus,
      y: y - 8,
      duration: 1500 + Math.random() * 500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: index * 300,
    });
  }

  // Bouton temporaire sandbox – à retirer après validation du game feel
  private createSandboxButton(): void {
    const btn = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 60, 280, 56, 0xFF8A65)
      .setInteractive({ cursor: 'pointer' })
      .setStrokeStyle(3, 0xE64A19);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 60, '🧪 Sandbox T-031', {
      fontFamily: 'Nunito',
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#FFFFFF',
    }).setOrigin(0.5);

    btn.on('pointerdown', () => this.scene.start('SandboxScene'));
  }
}
