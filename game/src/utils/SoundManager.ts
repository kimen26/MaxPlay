import Phaser from 'phaser';
import { SynthSounds } from './SynthSounds';

/**
 * SoundManager - Gestionnaire de sons hybride
 * 
 * Utilise:
 * - Les fichiers MP3 s'ils existent
 * - Sinon, génère les sons procéduralement avec Web Audio API
 */

export class SoundManager {
  private scene: Phaser.Scene;
  private sounds: Map<string, Phaser.Sound.BaseSound> = new Map();
  private engineSound?: Phaser.Sound.HTML5AudioSound;
  private synth: SynthSounds;
  private useSynth: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.synth = new SynthSounds();
  }

  /**
   * Précharger tous les sons au démarrage
   * À appeler dans preload() de la scene
   */
  static preload(scene: Phaser.Scene): void {
    // Sons avec gestion d'erreur silencieuse
    const soundFiles = [
      ['horn', 'assets/sounds/bus/horn.mp3'],
      ['air-brake', 'assets/sounds/bus/air-brake.mp3'],
      ['door', 'assets/sounds/bus/door.mp3'],
      ['engine', 'assets/sounds/bus/engine.mp3'],
      ['coin', 'assets/sounds/retro/coin.mp3'],
      ['win', 'assets/sounds/retro/win.mp3'],
      ['jump', 'assets/sounds/retro/jump.mp3'],
      ['dog', 'assets/sounds/animals/dog.mp3'],
      ['cat', 'assets/sounds/animals/cat.mp3'],
      ['fart', 'assets/sounds/cartoon/fart.mp3'],
      ['boing', 'assets/sounds/cartoon/boing.mp3'],
    ];

    soundFiles.forEach(([key, path]) => {
      scene.load.audio(key as string, path).on('fileerror', () => {
        // Le fichier n'existe pas, on utilisera le synthétiseur
        console.log(`🔇 Fichier ${key} non trouvé, utilisation du son synthétisé`);
      });
    });
  }

  /**
   * Initialiser les sons (à appeler dans create())
   */
  init(): void {
    // Vérifier si des fichiers ont été chargés
    const loadedSounds = [
      'horn', 'air-brake', 'door', 'engine',
      'coin', 'win', 'jump', 'dog', 'cat', 'fart', 'boing'
    ];

    let loadedCount = 0;
    loadedSounds.forEach(name => {
      if (this.scene.cache.audio.exists(name)) {
        this.sounds.set(name, this.scene.sound.get(name));
        loadedCount++;
      }
    });

    this.useSynth = loadedCount === 0;
    if (this.useSynth) {
      console.log('🎵 Mode synthèse audio activé (pas de fichiers MP3 trouvés)');
    } else {
      console.log(`✅ ${loadedCount} sons chargés depuis les fichiers`);
    }
  }

  /**
   * Réveiller l'audio après une interaction utilisateur
   * (nécessaire pour Chrome/Edge)
   */
  resumeAudio(): void {
    this.synth.resume();
  }

  // ===== BUS SOUNDS =====

  /** Klaxon du bus */
  honk(): void {
    if (this.sounds.has('horn')) {
      this.play('horn', { volume: 0.5 });
    } else {
      this.synth.honk();
    }
  }

  /** Freins à air (pshhh) */
  airBrake(): void {
    if (this.sounds.has('air-brake')) {
      this.play('air-brake', { volume: 0.4 });
    } else {
      this.synth.airBrake();
    }
  }

  /** Portes qui s'ouvrent/ferment */
  door(): void {
    if (this.sounds.has('door')) {
      this.play('door', { volume: 0.4 });
    } else {
      this.synth.door();
    }
  }

  /** Démarrer le son du moteur (en boucle) - seulement si fichier existe */
  startEngine(): void {
    if (this.sounds.has('engine')) {
      try {
        this.engineSound = this.scene.sound.add('engine', {
          loop: true,
          volume: 0.15,
        }) as Phaser.Sound.HTML5AudioSound;
        this.engineSound.play();
      } catch (e) {
        console.log('Moteur non disponible');
      }
    }
    // Pas de fallback synthétique pour le moteur (trop complexe en loop)
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
      try {
        const normalizedSpeed = Math.min(speed / 200, 1);
        this.engineSound.setVolume(0.1 + normalizedSpeed * 0.15);
      } catch (e) {}
    }
  }

  // ===== GAME SOUNDS =====

  /** Passager collecté (ding) */
  collect(): void {
    if (this.sounds.has('coin')) {
      this.play('coin', { volume: 0.4 });
    } else {
      this.synth.coin();
    }
  }

  /** Victoire ! */
  victory(): void {
    if (this.sounds.has('win')) {
      this.play('win', { volume: 0.5 });
    } else {
      this.synth.victory();
    }
  }

  /** Saut */
  jump(): void {
    if (this.sounds.has('jump')) {
      this.play('jump', { volume: 0.4 });
    } else {
      this.synth.jump();
    }
  }

  // ===== ANIMAL SOUNDS =====

  /** Aboiement */
  dogBark(): void {
    if (this.sounds.has('dog')) {
      this.play('dog', { volume: 0.4 });
    } else {
      this.synth.dogBark();
    }
  }

  /** Miaulement */
  catMeow(): void {
    if (this.sounds.has('cat')) {
      this.play('cat', { volume: 0.4 });
    } else {
      this.synth.catMeow();
    }
  }

  // ===== FUN SOUNDS =====

  /** Prout ! */
  fart(): void {
    if (this.sounds.has('fart')) {
      this.play('fart', { volume: 0.5 });
    } else {
      this.synth.fart();
    }
  }

  /** Boing cartoon */
  boing(): void {
    if (this.sounds.has('boing')) {
      this.play('boing', { volume: 0.4 });
    } else {
      this.synth.boing();
    }
  }

  // ===== HELPER =====

  private play(key: string, config?: Phaser.Types.Sound.SoundConfig): void {
    try {
      const sound = this.sounds.get(key);
      if (sound) {
        sound.play(config);
      } else if (this.scene.cache.audio.exists(key)) {
        this.scene.sound.play(key, config);
      }
    } catch (e) {
      // Ignore
    }
  }
}
