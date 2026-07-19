// ─── Sons victoire / fin / erreur — POOLS PAR THÈME (MP3 réels) ──────────────
// Nécessite que la page soit dans site/ (chemins relatifs).
//
// Refonte 2026-07-05 : pioche aléatoire dans des POOLS cohérents par événement
// (banque sounds/fx/ + sounds/voix/{f,h,wex}/ générée ElevenLabs, padding 250ms).
// API PUBLIQUE INCHANGÉE : playEndSound / playErrorSound / stopEndSound
// → tous les mj-XX en profitent sans être modifiés (fichiers figés intacts).
// Nouvelle API optionnelle pour les prochains jeux : SoundPool.play(theme).

// ── Pools par thème d'événement ──────────────────────────────────────────────
const SOUND_POOLS = {
  // Fin de partie gagnée (≥ 50%) — mix nouveaux + classiques que Max adore
  victory: [
    'sounds/fx/victoire-grande.mp3',
    'sounds/fx/tada.mp3',
    'sounds/fx/trophee.mp3',
    'sounds/fx/applaudissements.mp3',
    'sounds/fx/trompette-fanfare.mp3',
    'sounds/ui/fanfare-victoire.mp3',
    'sounds/ff7_victory.mp3',                                // classiques conservés
    'sounds/victory-mario-series-hq-super-smash-bros.mp3',
    'sounds/zelda-tresor.mp3',
  ],
  // Fin de partie < 50% — DOUX, jamais punitif (zéro son "perdu")
  'end-doux': [
    'sounds/fx/trombone-oups.mp3',
    'sounds/fx/oups-doux.mp3',
    'sounds/fx/sifflet-glissant.mp3',
  ],
  // Bonne réponse en cours de partie
  success: [
    'sounds/fx/bonne-reponse.mp3',
    'sounds/fx/victoire-petite.mp3',
    'sounds/fx/piece.mp3',
    'sounds/fx/clochette.mp3',
    'sounds/fx/xylophone-monte.mp3',
    'sounds/fx/magie.mp3',
  ],
  // Mauvaise réponse — rigolo ou doux, on dédramatise
  error: [
    'sounds/fx/oups-doux.mp3',
    'sounds/fx/trombone-oups.mp3',
    'sounds/perfect-fart.mp3',                               // culte, reste
    'sounds/honk-sound.mp3',
    'sounds/pew.mp3',
  ],
  // Apparition d'un élément à l'écran
  apparition: [
    'sounds/fx/pop-apparition.mp3',
    'sounds/fx/bulle-pop.mp3',
    'sounds/fx/boing.mp3',
    'sounds/fx/whoosh.mp3',
  ],
  // Récompense / collecte (étoile, pièce, badge)
  collecte: [
    'sounds/fx/piece.mp3',
    'sounds/fx/pluie-pieces.mp3',
    'sounds/ui/etoile.mp3',
    'sounds/fx/magie.mp3',
  ],
  // Déblocage (nouveau jeu, nouveau dino)
  deblocage: [
    'sounds/ui/deblocage.mp3',
    'sounds/fx/roulement-tambour.mp3',
    'sounds/fx/waouh.mp3',
  ],
};

// Réactions vocales — 3 voix du casting × phrases (voir sounds/voix/)
const VOICE_DIRS = ['sounds/voix/f', 'sounds/voix/h', 'sounds/voix/wex'];
const VOICE_LINES = {
  positif: ['super', 'bravo', 'ouiii', 'genial', 'trop-fort', 'champion',
            'parfait', 'waouh', 'bien-joue', 'incroyable', 'encore', 'yes',
            'hourra', 'joli', 'quel-talent', 'oh-la-la'],
  doux:    ['oups', 'presque', 'essaie-encore', 'pas-tout-a-fait',
            'hmm-non', 'tu-y-es-presque'],
};

// ── Moteur de pioche (anti-répétition immédiate par pool) ────────────────────
const _lastPick = {};
function _pickRandom(arr, key) {
  if (arr.length === 1) return arr[0];
  let pick;
  do { pick = arr[Math.floor(Math.random() * arr.length)]; }
  while (key && pick === _lastPick[key]);
  if (key) _lastPick[key] = pick;
  return pick;
}

function _playFile(src, volume) {
  const a = new Audio(src);
  a.volume = volume;
  a.play().catch(() => {});
  return a;
}

// ── API pools (pour les prochains jeux + réutilisable partout) ───────────────
const SoundPool = {
  /** Joue un son au hasard du thème. Thèmes : victory, end-doux, success,
   *  error, apparition, collecte, deblocage. */
  play(theme, volume = 0.8) {
    const pool = SOUND_POOLS[theme];
    if (!pool) return null;
    return _playFile(_pickRandom(pool, theme), volume);
  },
  /** Réaction vocale au hasard : voix (f/h/wex) × phrase du ton demandé.
   *  ton = 'positif' | 'doux' */
  voice(ton = 'positif', volume = 0.9) {
    const lines = VOICE_LINES[ton] || VOICE_LINES.positif;
    const dir = _pickRandom(VOICE_DIRS, 'voice-dir');
    const line = _pickRandom(lines, 'voice-' + ton);
    return _playFile(`${dir}/${line}.mp3`, volume);
  },
  /** Phrase d'instruction préenregistrée (sounds/voix/phrases/<slug>.mp3),
   *  fallback TTS navigateur si absent. Slugs : trouve-le-meme-dino,
   *  combien-de-dinos, compte-encore, regardons-ensemble, il-vivait-quand,
   *  cest-parti, a-toi-de-jouer, cherche-bien, encore-une-fois,
   *  ouvre-bien-les-yeux. */
  /** Ligne vocale nommée, tirée au hasard parmi les 3 voix du casting
   *  (sounds/voix/{f,h,wex}/<slug>.mp3), fallback TTS. Slugs : etoile-gagnee. */
  voiceLine(slug, fallbackText, volume = 0.95) {
    try {
      const dir = _pickRandom(VOICE_DIRS, 'voice-dir');
      const a = new Audio(`${dir}/${slug}.mp3`);
      a.volume = volume;
      a.play().catch(() => {
        if (fallbackText && window.TTS) TTS.speak(fallbackText, { pitch: 1.05, priority: true });
      });
      return a;
    } catch (e) {
      if (fallbackText && window.TTS) TTS.speak(fallbackText, { pitch: 1.05, priority: true });
      return null;
    }
  },
  phrase(slug, fallbackText, volume = 0.95) {
    try {
      const a = new Audio(`sounds/voix/phrases/${slug}.mp3`);
      a.volume = volume;
      a.play().catch(() => {
        if (fallbackText && window.TTS) TTS.speak(fallbackText, { pitch: 1.05, priority: true });
      });
      return a;
    } catch (e) {
      if (fallbackText && window.TTS) TTS.speak(fallbackText, { pitch: 1.05, priority: true });
      return null;
    }
  },
};

// ── API historique (inchangée — utilisée par tous les mj-XX) ─────────────────
let _currentVictoryAudio = null;
let _voiceTimer = null;

/**
 * Joue un son de fin selon le score, puis une petite voix en réaction.
 * @param {number} score    - points obtenus
 * @param {number} maxScore - points max possibles
 */
function playEndSound(score, maxScore) {
  const win = (score / maxScore) >= 0.5;
  _currentVictoryAudio = SoundPool.play(win ? 'victory' : 'end-doux', 0.85);
  // Réaction vocale par-dessus, légèrement décalée (voix ≠ noyée dans la fanfare)
  clearTimeout(_voiceTimer);
  _voiceTimer = setTimeout(() => SoundPool.voice(win ? 'positif' : 'doux'), win ? 1400 : 900);
}

/**
 * Joue un son d'erreur du pool (doux/rigolo — jamais punitif).
 */
function playErrorSound() {
  SoundPool.play('error', 0.7);
}

/**
 * Stoppe le son de fin en cours (ex: quand on rejoue).
 */
function stopEndSound() {
  clearTimeout(_voiceTimer);
  if (_currentVictoryAudio) {
    _currentVictoryAudio.pause();
    _currentVictoryAudio.currentTime = 0;
    _currentVictoryAudio = null;
  }
}
