// ─── Sounds (Web Audio API) ───
// Sons optimisés pour enfant 4 ans

function getAC() { 
  return new (window.AudioContext || window.webkitAudioContext)(); 
}

// Klaxon de bus (amélioré)
function sndKlaxon() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    
    // Double coup de klaxon
    [0, 0.25].forEach(delay => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      const f = ac.createBiquadFilter();
      
      o.connect(f);
      f.connect(g);
      g.connect(ac.destination);
      
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(350, t + delay);
      o.frequency.exponentialRampToValueAtTime(280, t + delay + 0.15);
      
      f.type = 'lowpass';
      f.frequency.value = 1200;
      
      g.gain.setValueAtTime(0, t + delay);
      g.gain.linearRampToValueAtTime(0.4, t + delay + 0.02);
      g.gain.exponentialRampToValueAtTime(0.01, t + delay + 0.2);
      
      o.start(t + delay);
      o.stop(t + delay + 0.25);
    });
  } catch (e) {}
}

// Son "Bravo" (arpège joyeux)
function sndBravo() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Do Mi Sol Do
    
    notes.forEach((freq, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      
      o.connect(g);
      g.connect(ac.destination);
      
      o.type = 'sine';
      o.frequency.value = freq;
      
      g.gain.setValueAtTime(0, t + i * 0.08);
      g.gain.linearRampToValueAtTime(0.3, t + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.01, t + i * 0.08 + 0.4);
      
      o.start(t + i * 0.08);
      o.stop(t + i * 0.08 + 0.5);
    });
  } catch (e) {}
}

// Son de victoire (fanfare courte)
function sndVictory() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    
    // Accord majeur final
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      
      o.connect(g);
      g.connect(ac.destination);
      
      o.type = i < 2 ? 'triangle' : 'sine';
      o.frequency.value = freq;
      
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.25 - i * 0.05, t + 0.1);
      g.gain.exponentialRampToValueAtTime(0.01, t + 1.5);
      
      o.start(t);
      o.stop(t + 1.5);
    });
  } catch (e) {}
}

// Rire enfant (synthétisé)
function sndRire() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    
    // Ha ha ha
    for (let i = 0; i < 3; i++) {
      const o = ac.createOscillator();
      const g = ac.createGain();
      
      o.connect(g);
      g.connect(ac.destination);
      
      o.type = 'sine';
      o.frequency.setValueAtTime(400 + Math.random() * 100, t + i * 0.25);
      o.frequency.exponentialRampToValueAtTime(300 + Math.random() * 100, t + i * 0.25 + 0.15);
      
      g.gain.setValueAtTime(0, t + i * 0.25);
      g.gain.linearRampToValueAtTime(0.3, t + i * 0.25 + 0.05);
      g.gain.exponentialRampToValueAtTime(0.01, t + i * 0.25 + 0.2);
      
      o.start(t + i * 0.25);
      o.stop(t + i * 0.25 + 0.25);
    }
  } catch (e) {}
}

// Moteur qui démarre (amélioré)
function sndMoteur() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    
    const o = ac.createOscillator();
    const g = ac.createGain();
    const f = ac.createBiquadFilter();
    
    o.connect(f);
    f.connect(g);
    g.connect(ac.destination);
    
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(60, t);
    o.frequency.exponentialRampToValueAtTime(120, t + 0.8);
    
    f.type = 'lowpass';
    f.frequency.setValueAtTime(400, t);
    f.frequency.linearRampToValueAtTime(2000, t + 0.8);
    
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.3, t + 0.1);
    g.gain.exponentialRampToValueAtTime(0.01, t + 1.0);
    
    o.start(t);
    o.stop(t + 1.0);
  } catch (e) {}
}

// Ding de succès (court et joyeux)
function sndDing() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      
      o.connect(g);
      g.connect(ac.destination);
      
      o.type = 'sine';
      o.frequency.value = freq;
      
      g.gain.setValueAtTime(0, t + i * 0.06);
      g.gain.linearRampToValueAtTime(0.25, t + i * 0.06 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.01, t + i * 0.06 + 0.3);
      
      o.start(t + i * 0.06);
      o.stop(t + i * 0.06 + 0.35);
    });
  } catch (e) {}
}

// Buzz d'erreur (doux, pas agressif)
function sndBuzz() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    
    const o = ac.createOscillator();
    const g = ac.createGain();
    
    o.connect(g);
    g.connect(ac.destination);
    
    o.type = 'triangle';
    o.frequency.setValueAtTime(200, t);
    o.frequency.linearRampToValueAtTime(150, t + 0.3);
    
    g.gain.setValueAtTime(0.2, t);
    g.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    
    o.start(t);
    o.stop(t + 0.3);
  } catch (e) {}
}

// Prout (Easter egg)
function sndProut() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    const o = ac.createOscillator();
    const g = ac.createGain();
    
    o.connect(g);
    g.connect(ac.destination);
    
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(80, t + 0.4);
    
    g.gain.setValueAtTime(0.4, t);
    g.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
    
    o.start(t);
    o.stop(t + 0.5);
  } catch (e) {}
}

// Pneu qui crisse
function sndTschh() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    
    const buf = ac.createBuffer(1, ac.sampleRate * 0.3, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    }
    
    const src = ac.createBufferSource();
    const f = ac.createBiquadFilter();
    const g = ac.createGain();
    
    src.buffer = buf;
    src.connect(f);
    f.connect(g);
    g.connect(ac.destination);
    
    f.type = 'bandpass';
    f.frequency.value = 3000;
    f.Q.value = 1;
    
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    
    src.start(t);
  } catch (e) {}
}

// Sirène police/pompier
function sndPinpon() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    
    for (let i = 0; i < 3; i++) {
      ['sawtooth', 'square'].forEach((type, j) => {
        const o = ac.createOscillator();
        const g = ac.createGain();
        
        o.connect(g);
        g.connect(ac.destination);
        
        o.type = type;
        o.frequency.value = 600 + j * 200;
        
        g.gain.setValueAtTime(0, t + i * 0.4 + j * 0.2);
        g.gain.linearRampToValueAtTime(0.15, t + i * 0.4 + j * 0.2 + 0.05);
        g.gain.exponentialRampToValueAtTime(0.01, t + i * 0.4 + j * 0.2 + 0.18);
        
        o.start(t + i * 0.4 + j * 0.2);
        o.stop(t + i * 0.4 + j * 2 + 0.2);
      });
    }
  } catch (e) {}
}

// Son de comptage (tic tac)
function sndCount() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    
    const o = ac.createOscillator();
    const g = ac.createGain();
    
    o.connect(g);
    g.connect(ac.destination);
    
    o.type = 'sine';
    o.frequency.value = 800;
    
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.15, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
    
    o.start(t);
    o.stop(t + 0.1);
  } catch (e) {}
}

// Porte de bus qui s'ouvre
function sndPorte() {
  try {
    const ac = getAC();
    const t = ac.currentTime;
    const buf = ac.createBuffer(1, ac.sampleRate * 0.5, ac.sampleRate);
    const d = buf.getChannelData(0);
    
    for (let i = 0; i < d.length; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.sin(i / d.length * Math.PI);
    }
    
    const src = ac.createBufferSource();
    const f = ac.createBiquadFilter();
    const g = ac.createGain();
    
    src.buffer = buf;
    src.connect(f);
    f.connect(g);
    g.connect(ac.destination);
    
    f.type = 'lowpass';
    f.frequency.setValueAtTime(200, t);
    f.frequency.linearRampToValueAtTime(800, t + 0.3);
    
    g.gain.setValueAtTime(0.2, t);
    g.gain.linearRampToValueAtTime(0.01, t + 0.5);
    
    src.start(t);
  } catch (e) {}
}
