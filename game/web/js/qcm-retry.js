// Helper pédagogique pour QCM :
//  1er essai correct → +10  · streak++
//  2e essai correct  → +5   · streak=0
//  3e essai correct  → +1   · streak=0
//  Après 3 erreurs   → révèle la bonne réponse en vert, 0 pt, streak=0
//
// Usage :
//   const qcm = QcmRetry.create();
//   // Rendu des choix : tagger la bonne réponse avec data-correct="1"
//   // Handler click :
//   const res = QcmRetry.handle(qcm, isCorrect);
//   if (res.outcome === 'ignored') return;
//   ...
window.QcmRetry = {
  create() { return { wrongAttempts: 0, locked: false }; },

  handle(state, isCorrect) {
    if (state.locked) return { outcome: 'ignored' };
    if (isCorrect) {
      state.locked = true;
      const pts = state.wrongAttempts === 0 ? 10
                : state.wrongAttempts === 1 ? 5 : 1;
      return {
        outcome: 'correct',
        points: pts,
        streakInc: state.wrongAttempts === 0,
        attempts: state.wrongAttempts + 1
      };
    }
    state.wrongAttempts++;
    if (state.wrongAttempts >= 3) {
      state.locked = true;
      return { outcome: 'reveal', points: 0, attempts: state.wrongAttempts };
    }
    return { outcome: 'wrong', points: 0, attempts: state.wrongAttempts };
  },

  // Trouve et marque la bonne réponse dans un conteneur de choix.
  // Les boutons de bonne réponse doivent avoir data-correct="1".
  revealCorrect(container, okClass = 'ok') {
    if (!container) return null;
    const el = container.querySelector('[data-correct="1"]');
    if (el) el.classList.add(okClass);
    return el;
  }
};
