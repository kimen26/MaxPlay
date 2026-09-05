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

// ── Doublon multilingue (idée Papa Yann 2026-08-10) ─────────────────────────
// Après un encouragement français, la même voix félicite parfois dans une autre
// langue, drapeau affiché. Ce ne sont PAS des traductions : chaque langue a ses
// propres mots, ceux qu'un adulte de cette culture dit vraiment à un enfant.
// Catalogue : studio/referentiel/catalogue/fr/humeur.mjs § HUMEUR_INVITEE.
const LANGUES_INVITEES = [
  { code: 'pt-BR', drapeau: '🇧🇷', mots: ['muito-bem', 'isso-ai', 'boa', 'arrasou', 'que-legal'] },
  { code: 'en', drapeau: '🇬🇧', mots: ['well-done', 'awesome', 'you-did-it', 'brilliant', 'way-to-go'] },
  { code: 'ja', drapeau: '🇯🇵', mots: ['sugoi', 'yatta-ne', 'jouzu', 'erai', 'dekita-ne'] },
  { code: 'zh', drapeau: '🇨🇳', mots: ['tai-bang-le', 'zhen-bang', 'zuo-de-hao', 'hao-lihai', 'ni-zhen-xing'] },
  { code: 'it', drapeau: '🇮🇹', mots: ['bravissimo', 'che-forte', 'benissimo', 'grande', 'ce-lhai-fatta'] },
  { code: 'es', drapeau: '🇪🇸', mots: ['muy-bien', 'genial', 'lo-lograste', 'eso-es', 'que-crack'] },
];

// Une fois sur deux : assez pour que ça surprenne, pas assez pour lasser.
const CHANCE_DOUBLON = 0.5;

function _afficherDrapeau(drapeau) {
  try {
    const el = document.createElement('div');
    el.textContent = drapeau;
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = 'position:fixed;right:14px;bottom:14px;font-size:44px;z-index:9999;'
      + 'pointer-events:none;opacity:0;transition:opacity .25s ease;'
      + 'filter:drop-shadow(0 2px 6px rgba(0,0,0,.45))';
    document.body.appendChild(el);
    requestAnimationFrame(() => { el.style.opacity = '1'; });
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 300);
    }, 1900);
  } catch (e) {}
}

function _doublonInvite(dir, volume) {
  if (Math.random() > CHANCE_DOUBLON) return;
  const langue = _pickRandom(LANGUES_INVITEES, 'langue-invitee');
  const mot = _pickRandom(langue.mots, 'mot-' + langue.code);
  // `dir` vaut « sounds/voix/h » → on garde la même voix, dans le dossier de langue.
  const voix = dir.split('/').pop();
  const src = `sounds/voix/${langue.code}/${voix}/${mot}.mp3`;
  // Décalé pour laisser finir le français, jamais superposé.
  setTimeout(() => {
    try {
      const a = new Audio(src);
      a.volume = volume;
      // Le drapeau ne s'affiche QUE si le son part vraiment : pas de drapeau muet.
      a.play().then(() => _afficherDrapeau(langue.drapeau)).catch(() => {});
    } catch (e) {}
  }, 1150);
}

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

// ── Référentiel de contenu (Lot 3 allégé, 2026-08-10) ────────────────────────
// js/textes-jeux.js (généré depuis studio/referentiel/) porte, par slug, le
// texte canonique FR. Un repli inline absent OU divergent est ignoré : la table
// gagne (le MP3 dit ce qu'elle dit, pas ce que le point d'appel imaginait —
// incident « Tu maîtrises ce jeu ! » du 2026-08-10). Divergence → log console,
// pour traquer les appels obsolètes sans casser les 56 pages.
//
// HO-MJ-06 : cette table n'a QU'UNE langue (FR). En langue non-FR, imposer le
// texte FR de la table ferait entendre du français en ?lang=en. Le canon FR ne
// s'applique donc qu'en FR (ou langue absente). En langue non-FR, on cherche
// plutôt le texte du pack i18n (studio/minijeux/i18n/<lang>/strings.json, exposé
// par MJi18n.voix — jeu puis _commun) : il gagne sur le fallback de l'appelant,
// même logique « la table gagne » que le canon FR mais sur le pack de la langue
// active — utile même si l'appelant (ex. regle-info.js) n'est pas encore mis à
// jour pour construire lui-même un fallback traduit. Pack absent pour ce slug ->
// le fallback de l'appelant est gardé tel quel (déjà traduit ou pas, on ne perd
// jamais le son : TTS parlera dans tous les cas).
function _normTxt(t) {
  return String(t || '')
    .replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
}
function _langActive() {
  return (typeof window !== 'undefined' && window.Lang && window.Lang.current)
    ? window.Lang.current() : 'fr';
}
function _repliCanonique(slug, fallbackText) {
  const lang = _langActive();
  if (lang !== 'fr') {
    const viaPack = (typeof window !== 'undefined' && window.MJi18n && window.MJi18n.voix)
      ? window.MJi18n.voix(undefined, slug, null) : null;
    return viaPack || fallbackText;
  }
  const t = (typeof window !== 'undefined' && window.TEXTES_JEUX)
    ? window.TEXTES_JEUX[slug] : null;
  if (!t || !t.tts) return fallbackText;
  if (fallbackText && _normTxt(fallbackText) !== _normTxt(t.tts)
      && typeof console !== 'undefined' && console.warn) {
    console.warn('[textes-jeux] repli divergent pour « ' + slug + ' » — table : « '
      + t.tts + ' », point d\'appel : « ' + fallbackText + ' » (la table gagne)');
  }
  return t.tts;
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
   *  ton = 'positif' | 'doux'
   *
   *  Sur un « positif », la MÊME voix enchaîne parfois avec un encouragement
   *  dans une autre langue et le drapeau s'affiche — le même ami qui parle une
   *  deuxième langue, pas un inconnu. Jamais sur un « doux » : on n'allonge pas
   *  un moment de frustration (décision Papa Yann 2026-08-10). */
  voice(ton = 'positif', volume = 0.9) {
    const lines = VOICE_LINES[ton] || VOICE_LINES.positif;
    const dir = _pickRandom(VOICE_DIRS, 'voice-dir');
    const line = _pickRandom(lines, 'voice-' + ton);
    const audio = _playFile(`${dir}/${line}.mp3`, volume);
    if (ton === 'positif') _doublonInvite(dir, volume);
    return audio;
  },
  /** Phrase d'instruction préenregistrée (sounds/voix/phrases/<slug>.mp3),
   *  fallback TTS navigateur si absent. Slugs : trouve-le-meme-dino,
   *  combien-de-dinos, compte-encore, regardons-ensemble, il-vivait-quand,
   *  cest-parti, a-toi-de-jouer, cherche-bien, encore-une-fois,
   *  ouvre-bien-les-yeux. */
  /** Ligne vocale nommée, tirée au hasard parmi les 3 voix du casting
   *  (sounds/voix/{f,h,wex}/<slug>.mp3), fallback TTS. Slugs : etoile-gagnee.
   *
   *  HO-MJ-06 : en langue non-FR, le MP3 FR ne doit JAMAIS jouer (l'enfant
   *  entendrait du français en ?lang=en) — on cherche le MP3 dans le pack de
   *  la langue active (sounds/voix/<lang>/{f,h,wex}/<slug>.mp3, même convention
   *  que le doublon multilingue _doublonInvite ci-dessus) ; absent -> TTS direct,
   *  jamais de repli sur le fichier FR. */
  voiceLine(slug, fallbackText, volume = 0.95) {
    fallbackText = _repliCanonique(slug, fallbackText);
    const lang = _langActive();
    try {
      const dir = _pickRandom(VOICE_DIRS, 'voice-dir');
      const src = (lang === 'fr') ? `${dir}/${slug}.mp3`
        : `sounds/voix/${lang}/${dir.split('/').pop()}/${slug}.mp3`;
      const a = new Audio(src);
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
    fallbackText = _repliCanonique(slug, fallbackText);
    const lang = _langActive();
    try {
      const src = (lang === 'fr') ? `sounds/voix/phrases/${slug}.mp3`
        : `sounds/voix/${lang}/phrases/${slug}.mp3`;
      const a = new Audio(src);
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
  /** Repli canonique d'un slug selon la table textes-jeux (la table gagne,
   *  log console si divergence). Exposé pour les chemins TTS directs
   *  (mj-shell say, regle-info speak) qui ne passent pas par phrase(). */
  repliCanonique: _repliCanonique,
};

// Un `const` top-level ne se publie PAS sur window (environnement lexical
// global ≠ propriété) — or mj-shell, mj-golden, regle-info et plusieurs pages
// gardent leurs appels par `window.SoundPool && …`. Sans cette ligne ces
// gardes sont mortes et ni les MP3 ni la table textes-jeux ne sont consultés.
if (typeof window !== 'undefined') window.SoundPool = SoundPool;

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
