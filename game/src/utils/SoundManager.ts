import Phaser from 'phaser';

/**
 * SoundManager - Gestionnaire de sons pour MaxPlay
 * 
 * Sons disponibles:
 * - bus/horn.mp3 : Klaxon
 * - bus/air-brake.mp3 : Pshhh freins
 * - bus/door.mp3 : Portes
 * - bus/engine.mp3 : Moteur (loop)
 * - retro/coin.mp3 : Collecte passager
 * - retro/win.mp3 : Victoire
 * - animals/dog.mp3 : Chien
 * - animals/cat.mp3 : Chat
 * - cartoon/fart.mp3 : Prout
 * - cartoon/boing.mp3 : Boing
 */

export class SoundManager {
  private scene: Phaser.Scene;
  private sounds: Map<string, Phaser.Sound.BaseSound> = new Map();
  private engineSound?: Phaser.Sound.HTML5AudioSound;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Précharger tous les sons au démarrage
   * À appeler dans preload() de la scene
   */
  static preload(scene: Phaser.Scene): void {
    // Bus
    scene.load.audio('horn', 'assets/sounds/bus/horn.mp3').on('fileerror', () => console.log('Son horn.mp3 non trouvé'));
    scene.load.audio('air-brake', 'assets/sounds/bus/air-brake.mp3').on('fileerror', () => {});
    scene.load.audio('door', 'assets/sounds/bus/door.mp3').on('fileerror', () => {});
    scene.load.audio('engine', 'assets/sounds/bus/engine.mp3').on('fileerror', () => {});
    
    // Retro
    scene.load.audio('coin', 'assets/sounds/retro/coin.mp3').on('fileerror', () => {});
    scene.load.audio('win', 'assets/sounds/retro/win.mp3').on('fileerror', () => {});
    scene.load.audio('jump', 'assets/sounds/retro/jump.mp3').on('fileerror', () => {});
    
    // Animals
    scene.load.audio('dog', 'assets/sounds/animals/dog.mp3').on('fileerror', () => {});
    scene.load.audio('cat', 'assets/sounds/animals/cat.mp3').on('fileerror', () => {});
    
    // Cartoon
    scene.load.audio('fart', 'assets/sounds/cartoon/fart.mp3').on('fileerror', () => {});
    scene.load.audio('boing', 'assets/sounds/cartoon/boing.mp3').on('fileerror', () => {});
  }

  /**
   * Initialiser les sons (à appeler dans create())
   */
  init(): void {
    // Créer les objets son
    const soundNames = [
      'horn', 'air-brake', 'door', 'engine',
      'coin', 'win', 'jump',
      'dog', 'cat',
      'fart', 'boing'
    ];

    soundNames.forEach(name => {
      if (this.scene.sound.get(name)) {
        this.sounds.set(name, this.scene.sound.get(name));
      }
    });
  }

  // ===== BUS SOUNDS =====

  /** Klaxon du bus */
  honk(): void {
    this.play('horn', { volume: 0.7 });
  }

  /** Freins à air (pshhh) */
  airBrake(): void {
    this.play('air-brake', { volume: 0.6 });
  }

  /** Portes qui s'ouvrent/ferment */
  door(): void {
    this.play('door', { volume: 0.5 });
  }

  /** Démarrer le son du moteur (en boucle) */
  startEngine(): void {
    if (!this.engineSound && this.scene.cache.audio.exists('engine')) {
      try {
        this.engineSound = this.scene.sound.add('engine', {
          loop: true,
          volume: 0.2,
        }) as Phaser.Sound.HTML5AudioSound;
        this.engineSound.play();
      } catch (e) {
        // Engine sound not available
      }
    }
  }

  /** Arrêter le moteur */
  stopEngine(): void {
    if (this.engineSound) {
      this.engineSound.stop();
    }
  }

  /** Faire varier le volume du moteur selon la vitesse */
  updateEngine(speed: number): void {
    if (this.engineSound && this.engineSound.isPlaying) {
      // speed entre 0 et 200
      const normalizedSpeed = Math.min(speed / 200, 1);
      try {
        this.engineSound.setVolume(0.1 + normalizedSpeed * 0.2);
      } catch (e) {}
    }
  }

  // ===== GAME SOUNDS =====

  /** Passager collecté (ding) */
  collect(): void {
    this.play('coin', { volume: 0.6 });
  }

  /** Victoire ! */
  victory(): void {
    this.play('win', { volume: 0.8 });
  }

  /** Saut */
  jump(): void {
    this.play('jump', { volume: 0.5 });
  }

  // ===== ANIMAL SOUNDS =====

  /** Aboiement */
  dogBark(): void {
    this.play('dog', { volume: 0.5 });
  }

  /** Miaulement */
  catMeow(): void {
    this.play('cat', { volume: 0.5 });
  }

  // ===== FUN SOUNDS =====

  /** Prout ! */
  fart(): void {
    this.play('fart', { volume: 0.7 });
  }

  /** Boing cartoon */
  boing(): void {
    this.play('boing', { volume: 0.5 });
  }

  // ===== HELPER =====

  private play(key: string, config?: Phaser.Types.Sound.SoundConfig): void {
    try {
      const sound = this.sounds.get(key);
      if (sound) {
        sound.play(config);
      } else {
        // Fallback: créer à la volée si pas préchargé
        if (this.scene.cache.audio.exists(key)) {
          this.scene.sound.play(key, config);
        } else {
          // Son non trouvé, on ignore silencieusement
          // console.log(`Son '${key}' non chargé (normal si pas encore téléchargé)`);
        }
      }
    } catch (e) {
      // Ignore les erreurs de son
    }
  }
}
