// ─────────────────────────────────────────────────────────────────────────
//  tracker.js — Suivi de progression MaxPlay
//  Stockage : localStorage['maxplay_progress']
//  Usage    : inclure ce script dans chaque jeu APRÈS les autres scripts
//             <script src="js/tracker.js"></script>
//
//  API publique :
//    Tracker.startSession(gameId)          → appeler au début d'une partie
//    Tracker.endSession(score, maxScore)   → appeler à la fin d'une partie
//    Tracker.logAnswer(correct)            → appeler à chaque réponse
//    Tracker.getStats()                    → renvoie tout le JSON
//    Tracker.exportJSON()                  → télécharge le JSON
// ─────────────────────────────────────────────────────────────────────────

const Tracker = (() => {
  const STORAGE_KEY = 'maxplay_progress';

  // Métadonnées des jeux (pour l'affichage dans suivi.html)
  const GAME_META = {
    'mj-01': { name: 'Quelle couleur ?',      emoji: '🎨', skill: 'Couleurs des lignes' },
    'mj-02': { name: 'Quel numéro ?',         emoji: '🔢', skill: 'Numéros des lignes' },
    'mj-03': { name: 'Devine le numéro',      emoji: '🔢', skill: 'Numéros / écoute' },
    'mj-04': { name: 'Compte les passagers',  emoji: '👥', skill: 'Dénombrement' },
    'mj-05': { name: 'La bonne place',        emoji: '🪑', skill: 'Soustraction' },
    'mj-06': { name: 'Lis la phrase',         emoji: '📖', skill: 'Lecture' },
    'mj-07': { name: 'Max Adventure',     emoji: '🎮', skill: 'Sandbox Phaser' },
    'mj-08': { name: 'Au centre bus',         emoji: '🅿️', skill: 'Tri / drag-drop' },
    'mj-09': { name: 'Trie les bus !',        emoji: '🔀', skill: 'Tri / classement' },
    'mj-10': { name: 'Tableau de bord',       emoji: '🎵', skill: 'Sons / exploration' },
    'mj-11': { name: 'Quel pays ?',           emoji: '🌍', skill: 'Drapeaux / géographie' },
    'mj-12': { name: 'Nouveaux sons',         emoji: '🎶', skill: 'Sons / exploration' },
    'mj-13': { name: 'L\'arrêt de bus',       emoji: '🚏', skill: 'Lecture panneau RATP' },
    'mj-13a': { name: 'Arrêt — mode écoute',  emoji: '🚏', skill: 'Lecture panneau RATP' },
    'mj-13b': { name: 'Arrêt — mode temps',   emoji: '🚏', skill: 'Lecture panneau RATP' },
    'mj-13c': { name: 'Arrêt — mode bus',     emoji: '🚏', skill: 'Lecture panneau RATP' },
    'mj-14': { name: 'La grille',             emoji: '🔲', skill: 'Logique / patterns' },
    'mj-15': { name: 'L\'intrus',             emoji: '🔍', skill: 'Catégorisation / logique' },
    'mj-16': { name: 'Complète la suite',    emoji: '📈', skill: 'Logique / suites' },
    'mj-17': { name: 'Le garage',             emoji: '🔧', skill: 'Réparation / causalité' },
    'mj-18': { name: 'Tubes de couleurs',     emoji: '🧪', skill: 'Logique / planification' },
    'mj-19': { name: 'Trouve le bus',         emoji: '🎯', skill: 'Attention visuelle' },
    'mj-20': { name: 'Compte en huit langues', emoji: '🌐', skill: 'Langues / nombres' },
    // tool:true = outil PARENT (tracké pour le cloud, EXCLU du dashboard
    // progression de Max — tour de garde game-conseiller 2026-07-12)
    'lecture': { name: 'Lecture', emoji: '📖', skill: 'Outil parent', tool: true },
  };

  // ── Lecture / écriture localStorage ────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : _emptyStore();
    } catch(e) {
      return _emptyStore();
    }
  }

  function save(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
    // Sync cloud si compte parent + profil actif (no-op sinon — cloud.js optionnel)
    try { window.Cloud && window.Cloud.schedulePush(); } catch(e) {}
  }

  function _emptyStore() {
    return { version: 1, games: {}, sessions: [] };
  }

  function _emptyGame() {
    return {
      plays: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      totalScore: 0,
      maxScore: 0,
      firstPlayed: null,
      lastPlayed: null,
      mastery: 'nouveau', // 'nouveau' | 'en-cours' | 'maîtrisé'
      history: [],        // dernières 20 sessions
    };
  }

  // ── Détection du jeu courant ────────────────────────────────────────────
  function _detectGameId() {
    const path = window.location.pathname;
    const file = path.split('/').pop().replace('.html', '');
    if (!file) return null;
    // Détection élargie : tout jeu du catalogue ou tout mj-* (corrige le trou
    // GAME_META qui s'arrêtait à mj-20 → mj-21/22 n'étaient pas suivis).
    const inCatalog = (window.MAXPLAY_CATALOG || []).some(c => c.id === file);
    return (GAME_META[file] || inCatalog || /^mj-/.test(file) || file === 'max-adventure') ? file : null;
  }

  // ── État de session en cours ────────────────────────────────────────────
  let _session = null;

  function startSession(gameId) {
    const id = gameId || _detectGameId();
    if (!id) return;
    _session = {
      gameId: id,
      startTime: Date.now(),
      questions: 0,
      correct: 0,
    };
    // TTS du titre désactivé : laggue le démarrage (D-024 2026-05-03)
  }

  function _announceTitle(id) {
    const meta = GAME_META[id];
    if (!meta || !('speechSynthesis' in window)) return;
    try {
      const speakNow = () => {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(meta.name);
        u.lang = 'fr-FR';
        u.rate = 0.95;
        u.pitch = 1.05;
        const voices = speechSynthesis.getVoices();
        const fr = voices.find(v => v.lang.startsWith('fr'));
        if (fr) u.voice = fr;
        speechSynthesis.speak(u);
      };
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', speakNow, { once: true });
        setTimeout(speakNow, 300);
      } else {
        setTimeout(speakNow, 250);
      }
    } catch (e) {}
  }

  function logAnswer(correct) {
    if (!_session) return;
    _session.questions++;
    if (correct) _session.correct++;
  }

  function endSession(score, maxScore) {
    if (!_session) return;

    const duration = Math.round((Date.now() - _session.startTime) / 1000); // secondes
    const data = load();
    const id   = _session.gameId;

    if (!data.games[id]) data.games[id] = _emptyGame();
    const g = data.games[id];

    g.plays++;
    g.totalQuestions  += _session.questions;
    g.correctAnswers  += _session.correct;
    g.totalScore      += (score || 0);
    g.maxScore        += (maxScore || 0);
    g.lastPlayed       = new Date().toISOString();
    if (!g.firstPlayed) g.firstPlayed = g.lastPlayed;

    // Calcul maîtrise
    const rate = g.totalQuestions > 0 ? g.correctAnswers / g.totalQuestions : 0;
    if (g.plays >= 3 && rate >= 0.85)      g.mastery = 'maîtrisé';
    else if (g.plays >= 1 || rate >= 0.5)  g.mastery = 'en-cours';
    else                                    g.mastery = 'nouveau';

    // Historique (max 20 entrées)
    g.history.push({
      date: new Date().toISOString(),
      score: score || 0,
      maxScore: maxScore || 0,
      correct: _session.correct,
      questions: _session.questions,
      duration,
    });
    if (g.history.length > 20) g.history.shift();

    // Session globale
    data.sessions.push({
      gameId: id,
      date: new Date().toISOString(),
      duration,
      score: score || 0,
      maxScore: maxScore || 0,
    });
    if (data.sessions.length > 200) data.sessions.shift();

    save(data);
    _session = null;
  }

  // ── Export JSON ─────────────────────────────────────────────────────────
  function exportJSON() {
    const data = load();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `maxplay-progress-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Import JSON ─────────────────────────────────────────────────────────
  function importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result);
          save(data);
          resolve(data);
        } catch(err) { reject(err); }
      };
      reader.readAsText(file);
    });
  }

  // ── Auto-start ──────────────────────────────────────────────────────────
  // Démarre automatiquement une session dès le chargement de la page
  (function autoInit() {
    const id = _detectGameId();
    if (id) startSession(id);
  })();

  // ── Couche cloud à la demande ───────────────────────────────────────────
  // Charge cloud.js + vraies voix UNIQUEMENT si un profil enfant est actif
  // (compte parent connecté via compte.html). Anonyme = zéro requête, zéro
  // changement — le mode dégradé freemium reste intact.
  (function loadCloudLayer() {
    try {
      // Profil enfant actif OU session parent seule (sb-*) — le parent sans
      // profil sélectionné doit quand même pousser duel/lecture/annotations.
      const hasChild = !!localStorage.getItem('maxplay_active_child');
      const hasParentSession = Object.keys(localStorage).some(k => k.startsWith('sb-'));
      if (!hasChild && !hasParentSession) return;
      if (window.Cloud) return;
      ['js/cloud.js', 'js/voices-manifest.js', 'js/voice.js'].forEach(src => {
        const s = document.createElement('script');
        s.src = src; s.async = false;
        document.head.appendChild(s);
      });
    } catch (e) {}
  })();

  // ── Auto-end ────────────────────────────────────────────────────────────
  // Clôt la session quand la page disparaît, pour les jeux sans fin explicite
  // (MJ-04 compte, MJ-12 sons, MJ-17 garage). Les jeux qui appellent
  // endSession() explicitement ont déjà _session = null → no-op.
  // pagehide est plus fiable que beforeunload sur mobile / iOS Safari.
  window.addEventListener('pagehide', () => {
    if (!_session) return;
    // Ouverture-éclair sans aucune réponse ≠ partie : Max qui tape ← en
    // 5 secondes ne doit pas gonfler plays/maîtrise (garde 2026-07-12).
    const heldMs = Date.now() - _session.startTime;
    if (heldMs < 10000 && _session.questions === 0) { _session = null; return; }
    endSession(_session.correct, _session.questions);
  });

  return { startSession, endSession, logAnswer, getStats: load, exportJSON, importJSON, GAME_META };
})();
