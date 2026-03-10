import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from './constants/config';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { HubScene } from './scenes/HubScene';
import { SandboxScene } from './scenes/SandboxScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
  backgroundColor: '#FFFDE7',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    BootScene,
    PreloadScene,
    HubScene,
    SandboxScene,
    // Mini-jeux ajoutés ici au fur et à mesure
  ],
};

new Phaser.Game(config);
