/**
 * SynthSounds - Générateur de sons procéduraux 8-bit
 * Pas besoin de fichiers MP3 ! Les sons sont créés en temps réel.
 */

export class SynthSounds {
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  /**
   * Ding de collecte (type Mario coin)
   * Fréquence: B5 (987 Hz) montant à E6 (1319 Hz)
   */
  coin(): void {
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(987, now); // B5
    osc.frequency.exponentialRampToValueAtTime(1319, now + 0.08); // E6

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Klaxon de bus (Beep beep)
   * Deux bips aigus
   */
  honk(): void {
    const now = this.audioContext.currentTime;
    
    // Premier beep
    this.playBeep(now, 440, 0.15);
    // Deuxième beep
    this.playBeep(now + 0.2, 440, 0.15);
  }

  private playBeep(startTime: number, freq: number, duration: number): void {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  /**
   * Son de victoire (arpège joyeux)
   * C-E-G-C montant
   */
  victory(): void {
    const now = this.audioContext.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + i * 0.15);

      gain.gain.setValueAtTime(0.2, now + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.4);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.4);
    });
  }

  /**
   * Fanfare de victoire FF7 🎺
   * D-D-D-E-F#-G-A-D (Ré-Ré-Ré-Mi-Fa#-Sol-La-Ré aigu)
   * La fanfare iconique de Final Fantasy 7
   */
  ff7Victory(): void {
    const now = this.audioContext.currentTime;
    
    // Notes: D4, D4, D4, E4, F#4, G4, A4, D5
    const notes = [293.66, 293.66, 293.66, 329.63, 369.99, 392.00, 440.00, 587.33];
    const durations = [0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.3, 0.8]; // La dernière plus longue
    const delays = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.2];
    
    notes.forEach((freq, i) => {
      // Oscillateur principal (sawtooth pour son cuivre/fanfare)
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.type = i < 6 ? 'sawtooth' : 'square'; // Plus brillant sur la fin
      osc.frequency.setValueAtTime(freq, now + delays[i]);
      
      // Enveloppe type fanfare (attack rapide, sustain, release)
      const vol = i === 7 ? 0.25 : 0.15; // Dernier note plus forte
      gain.gain.setValueAtTime(0, now + delays[i]);
      gain.gain.linearRampToValueAtTime(vol, now + delays[i] + 0.02); // Attack
      gain.gain.exponentialRampToValueAtTime(0.01, now + delays[i] + durations[i]);
      
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      
      osc.start(now + delays[i]);
      osc.stop(now + delays[i] + durations[i]);
      
      // Doublon avec octave inférieure pour plus de "corps" (uniquement notes fortes)
      if (i === 0 || i === 3 || i === 7) {
        const osc2 = this.audioContext.createOscillator();
        const gain2 = this.audioContext.createGain();
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq / 2, now + delays[i]);
        
        gain2.gain.setValueAtTime(0, now + delays[i]);
        gain2.gain.linearRampToValueAtTime(vol * 0.4, now + delays[i] + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + delays[i] + durations[i]);
        
        osc2.connect(gain2);
        gain2.connect(this.audioContext.destination);
        
        osc2.start(now + delays[i]);
        osc2.stop(now + delays[i] + durations[i]);
      }
    });
    
    // Petit roulement de tambour (noise burst) au début
    this.playDrumRoll(now);
  }
  
  private playDrumRoll(startTime: number): void {
    // Bruit blanc court pour simuler un roulement de tambour
    const bufferSize = this.audioContext.sampleRate * 0.1;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, startTime);
    
    const gain = this.audioContext.createGain();
    gain.gain.setValueAtTime(0.1, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioContext.destination);
    
    noise.start(startTime);
    noise.stop(startTime + 0.1);
  }

  /**
   * Saut (type Mario)
   * Glissando vers le haut
   */
  jump(): void {
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.3);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Freins à air (Pshhh)
   * Bruit blanc filtré
   */
  airBrake(): void {
    const now = this.audioContext.currentTime;
    const bufferSize = this.audioContext.sampleRate * 0.8; // 0.8 secondes
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Générer du bruit blanc
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;

    // Filtre passe-bas pour faire "mou"
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.8);

    const gain = this.audioContext.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioContext.destination);

    noise.start(now);
    noise.stop(now + 0.8);
  }

  /**
   * Portes de bus (Sshh-klonk)
   * Bruit mécanique
   */
  door(): void {
    const now = this.audioContext.currentTime;
    
    // Glissement
    const osc1 = this.audioContext.createOscillator();
    const gain1 = this.audioContext.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(100, now);
    osc1.frequency.linearRampToValueAtTime(50, now + 0.3);
    gain1.gain.setValueAtTime(0.1, now);
    gain1.gain.linearRampToValueAtTime(0, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(this.audioContext.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    // Claquement à la fin
    const osc2 = this.audioContext.createOscillator();
    const gain2 = this.audioContext.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(80, now + 0.3);
    gain2.gain.setValueAtTime(0.3, now + 0.3);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc2.connect(gain2);
    gain2.connect(this.audioContext.destination);
    osc2.start(now + 0.3);
    osc2.stop(now + 0.4);
  }

  /**
   * Prout ! (Bruit comique)
   * Oscillateur FM qui descend
   */
  fart(): void {
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);

    // Vibrato pour l'effet comique
    const lfo = this.audioContext.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(15, now);
    const lfoGain = this.audioContext.createGain();
    lfoGain.gain.setValueAtTime(50, now);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(now);
    lfo.stop(now + 0.5);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  /**
   * Boing cartoon
   */
  boing(): void {
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Aboiement chien
   */
  dogBark(): void {
    const now = this.audioContext.currentTime;
    
    // Deux aboiements rapides
    this.playBark(now);
    this.playBark(now + 0.25);
  }

  private playBark(time: number): void {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, time);
    osc.frequency.exponentialRampToValueAtTime(250, time + 0.1);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(time);
    osc.stop(time + 0.1);
  }

  /**
   * Miaulement chat
   */
  catMeow(): void {
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'triangle';
    // Contour mélodique miaou
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(800, now + 0.2);
    osc.frequency.linearRampToValueAtTime(500, now + 0.4);
    osc.frequency.linearRampToValueAtTime(600, now + 0.6);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.4);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.6);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  /**
   * Réveiller l'AudioContext (nécessaire après interaction utilisateur)
   */
  resume(): void {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}
