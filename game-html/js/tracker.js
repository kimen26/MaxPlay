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
    'mj-03': { name: 'Compte les passagers',  emoji: '👥', skill: 'Dénombrement' },
    'mj-04': { name: 'Lis le mot',            emoji: '📖', skill: 'Lecture' },
    'mj-05': { name: 'Quel bus pour aller où ?', emoji: '🗺️', skill: 'Trajets' },
    'mj-06': { name: 'Au garage !',           emoji: '🚌', skill: 'Tri / drag-drop' },
    'mj-07': { name: 'La journée de Max',     emoji: '🎮', skill: 'Sandbox Phaser' },
    'mj-08': { name: 'Au garage le soir',     emoji: '🌙', skill: 'Tri / drag-drop' },
    'mj-09': { name: 'Trie les bus !',        emoji: '🔀', skill: 'Tri / classement' },
    'mj-10': { name: 'Tableau de bord',       emoji: '🎵', skill: 'Sons / exploration' },
    'mj-11': { name: 'Quel pays ?',           emoji: '🌍', skill: 'Drapeaux / géographie' },
    'mj-12': { name: 'Nouveaux sons',         emoji: '🎶', skill: 'Sons / exploration' },
    'mj-13': { name: 'L\'arrêt de bus',       emoji: '🚏', skill: 'Lecture panneau RATP' },
    'mj-14': { name: 'La grille',             emoji: '🔲', skill: 'Logique / patterns' },
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
    return GAME_META[file] ? file : null;
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

  return { startSession, endSession, logAnswer, getStats: load, exportJSON, importJSON, GAME_META };
})();
