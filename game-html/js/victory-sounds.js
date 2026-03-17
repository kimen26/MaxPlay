// ─── Sons victoire / défaite / erreur (MP3 réels) ───────────────────────────
// Nécessite que la page soit dans game-html/ (chemins relatifs)

// ── Sons de victoire (bon score ≥ 50%) ──────────────────────────────────────
const VICTORY_SOUNDS = [
  'sounds/ff7_victory.mp3',
  'sounds/victory-mario-series-hq-super-smash-bros.mp3',
  'sounds/zelda-tresor.mp3',
  'sounds/Gagné.mp3',
  'sounds/super-max.mp3',
];

// ── Sons de défaite (<50% bonnes réponses) ───────────────────────────────────
const DEFEAT_SOUNDS = [
  'sounds/perdu.mp3',
  'sounds/motus-boule-noire_cTY2JG4.mp3',
  'sounds/among-us-role-reveal-sound.mp3',
];

// ── Sons d'erreur (mauvaise réponse / mauvais classement) ────────────────────
const ERROR_SOUNDS = [
  'sounds/perfect-fart.mp3',
  'sounds/honk-sound.mp3',
  'sounds/pew.mp3',
];

function _pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let _currentVictoryAudio = null;

/**
 * Joue un son de fin selon le score.
 * @param {number} score   - points obtenus
 * @param {number} maxScore - points max possibles (ex: 50 pour 5 questions × 10)
 */
function playEndSound(score, maxScore) {
  const src = (score / maxScore) >= 0.5
    ? _pickRandom(VICTORY_SOUNDS)
    : _pickRandom(DEFEAT_SOUNDS);
  _currentVictoryAudio = new Audio(src);
  _currentVictoryAudio.volume = 0.85;
  _currentVictoryAudio.play().catch(() => {});
}

/**
 * Joue un son d'erreur aléatoire (prout / klaxon / pew).
 */
function playErrorSound() {
  const a = new Audio(_pickRandom(ERROR_SOUNDS));
  a.volume = 0.7;
  a.play().catch(() => {});
}

/**
 * Stoppe le son de victoire/défaite en cours (ex: quand on rejoue).
 */
function stopEndSound() {
  if (_currentVictoryAudio) {
    _currentVictoryAudio.pause();
    _currentVictoryAudio.currentTime = 0;
    _currentVictoryAudio = null;
  }
}
