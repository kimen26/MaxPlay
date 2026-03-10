// ─── Sounds (Web Audio API) ───

function getAC() { 
  return new (window.AudioContext || window.webkitAudioContext)(); 
}

// Klaxon de bus
function sndKlaxon() {
  try {
    const ac = getAC();
    const g = ac.createGain();
    g.connect(ac.destination);
    g.gain.setValueAtTime(0.4, 0);
    [0, 0.18].forEach((delay, i) => {
      const o = ac.createOscillator();
      o.connect(g);
      o.frequency.value = i === 0 ? 370 : 440;
      o.type = 'square';
      o.start(ac.currentTime + delay);
      o.stop(ac.currentTime + delay + 0.14);
    });
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.45);
  } catch (e) {}
}

// Pneu qui crisse
function sndTschh() {
  try {
    const ac = getAC();
    const buf = ac.createBuffer(1, ac.sampleRate * 0.35, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
    const src = ac.createBufferSource();
    src.buffer = buf;
    const filt = ac.createBiquadFilter();
    filt.type = 'highpass';
    filt.frequency.value = 2000;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.6, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.35);
    src.connect(filt);
    filt.connect(g);
    g.connect(ac.destination);
    src.start();
  } catch (e) {}
}

// Easter egg
function sndProut() {
  try {
    const ac = getAC();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g);
    g.connect(ac.destination);
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(180, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(60, ac.currentTime + 0.4);
    g.gain.setValueAtTime(0.5, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.45);
    o.start();
    o.stop(ac.currentTime + 0.45);
  } catch (e) {}
}

// Sirène police/pompier
function sndPinpon() {
  try {
    const ac = getAC();
    const g = ac.createGain();
    g.connect(ac.destination);
    g.gain.value = 0.4;
    for (let i = 0; i < 3; i++) {
      const o1 = ac.createOscillator();
      o1.connect(g);
      o1.frequency.value = 600;
      o1.type = 'sawtooth';
      o1.start(ac.currentTime + i * 0.4);
      o1.stop(ac.currentTime + i * 0.4 + 0.2);
      const o2 = ac.createOscillator();
      o2.connect(g);
      o2.frequency.value = 800;
      o2.type = 'sawtooth';
      o2.start(ac.currentTime + i * 0.4 + 0.2);
      o2.stop(ac.currentTime + i * 0.4 + 0.4);
    }
  } catch (e) {}
}

// Moteur qui démarre
function sndMoteur() {
  try {
    const ac = getAC();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g);
    g.connect(ac.destination);
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(55, ac.currentTime);
    o.frequency.linearRampToValueAtTime(90, ac.currentTime + 0.5);
    g.gain.setValueAtTime(0.3, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.6);
    o.start();
    o.stop(ac.currentTime + 0.6);
  } catch (e) {}
}

// Bip d'alerte
function sndBip() {
  try {
    const ac = getAC();
    const g = ac.createGain();
    g.connect(ac.destination);
    g.gain.value = 0.35;
    for (let i = 0; i < 3; i++) {
      const o = ac.createOscillator();
      o.connect(g);
      o.type = 'sine';
      o.frequency.value = 880;
      o.start(ac.currentTime + i * 0.25);
      o.stop(ac.currentTime + i * 0.25 + 0.15);
    }
  } catch (e) {}
}

// Ding de succès (arpège)
function sndDing() {
  try {
    const ac = getAC();
    [523, 659, 784].forEach((freq, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.connect(g);
      g.connect(ac.destination);
      o.type = 'sine';
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.3, ac.currentTime + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.12 + 0.25);
      o.start(ac.currentTime + i * 0.12);
      o.stop(ac.currentTime + i * 0.12 + 0.25);
    });
  } catch (e) {}
}

// Buzz d'erreur
function sndBuzz() {
  try {
    const ac = getAC();
    [330, 220].forEach((freq, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.connect(g);
      g.connect(ac.destination);
      o.type = 'sawtooth';
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.25, ac.currentTime + i * 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.15 + 0.2);
      o.start(ac.currentTime + i * 0.15);
      o.stop(ac.currentTime + i * 0.15 + 0.2);
    });
  } catch (e) {}
}
