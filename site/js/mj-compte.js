// ─────────────────────────────────────────────────────────────────────────
//  mj-compte.js — MOTEUR « Compte les … » (pilote « 1 moteur, N peaux »)
//
//  Rôle : factoriser ce qui est IDENTIQUE entre mj-04 (Compte les passagers,
//  peau bus) et mj-26 (Compte les dinos, peau dino) :
//    - tirage de la quantité N à compter, selon le niveau/palier du jeu
//    - génération de distracteurs PROCHES (±1..±3) autour de N (vrai défi
//      de comptage, jamais "le plus grand")
//    - boucle de manche (question → réponse → callback) via QcmRetry
//    - enchaînement question suivante / fin de manche
//
//  Ce qui reste dans CHAQUE jeu (la PEAU, pas dans ce moteur) :
//    - le système de progression/niveau (mj-04 = bandeau "Niveau X/N" maison
//      dérivé de Stars.get ; mj-26 = Golden.setup/pips standard) — les deux
//      jeux avaient déjà des systèmes de niveau DIFFÉRENTS avant le pilote,
//      on ne les fusionne pas ici (risque de changement de comportement) ;
//    - le rendu de la scène (bus+passagers SVG vs silhouettes dino)
//    - les boutons de réponse (style, layout, classes CSS)
//    - les textes de consigne / TTS / MP3
//    - les sons/animations de feedback (waveAll, recount, etc.)
//
//  Contrat de peau (ce que chaque jeu doit fournir à MJCompte.init) :
//    niveaux   : [{min,max}, …]           — 1 entrée par niveau/palier
//    getLevel()                            → index de niveau (0-based) à utiliser
//                                             pour LA PROCHAINE question (peut varier
//                                             d'une question à l'autre, ex. manche mixte)
//    nQuestions                            — nombre total de questions de la manche
//    onQuestion(n, index)                  — appelé avec la quantité tirée `n` et
//                                             l'index de question (0-based) : la peau
//                                             doit rendre la scène + les boutons de choix
//                                             (elle appelle answer() elle-même au clic)
//    onDone()                              — appelé quand la manche est terminée
//                                             (la peau affiche son propre écran de fin)
//
//  API exposée à la peau pour chaque question :
//    const q = MJCompte.nextValue(niveaux[levelIdx])   // tire N dans le palier
//    const opts = MJCompte.distractors(n, {max})       // options mélangées avec N dedans
//    const qcm = MJCompte.beginQuestion()               // = QcmRetry.create()
//    MJCompte.answer(qcm, isCorrect) → même contrat que QcmRetry.handle()
//
//  Comment ajouter un 3ᵉ thème (ex. "Compte les voitures") :
//    1. Définir ses paliers `niveaux` (mêmes bornes que les 2 autres, ou pas — libre)
//    2. Écrire son propre système de niveau (ou réutiliser Golden.setup si le jeu
//       est un jeu "standard" au catalogue étoiles 4/6/8)
//    3. À chaque question : appeler MJCompte.nextValue(palier) pour tirer N,
//       MJCompte.distractors(N) pour les 3 boutons, rendre SA scène (voitures),
//       et gérer le clic avec MJCompte.answer(qcm, isCorrect)
//    Effort estimé : ~30-60 min (surtout le rendu SVG/asset de la peau ; le
//    moteur ne bouge pas).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  function _shuffle(a) {
    if (typeof global.shuffle === 'function') return global.shuffle(a);
    return a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
  }

  const MJCompte = {
    // Tire une quantité aléatoire dans [min, max] (bornes incluses) pour un palier donné.
    nextValue(level) {
      return level.min + Math.floor(Math.random() * (level.max - level.min + 1));
    },

    // Génère les distracteurs PROCHES de `correct` (jamais loin/triviaux).
    // `opts.count`  = nombre total d'options (correct compris), défaut 4 (mj-04 : 4 boutons).
    // `opts.min`    = plancher des valeurs possibles (défaut 1).
    // `opts.max`    = plafond des valeurs possibles (défaut : aucun).
    // `opts.spread` = distance max autour de `correct` explorée pour les voisins (défaut 3).
    distractors(correct, opts) {
      opts = opts || {};
      const count = opts.count || 4;
      const floor = (opts.min != null) ? opts.min : 1;
      const ceil = (opts.max != null) ? opts.max : Infinity;
      const spread = opts.spread || 3;
      const inRange = v => v >= floor && v <= ceil && v !== correct;
      const near = [];
      for (let d = 1; d <= spread; d++) { near.push(correct - d, correct + d); }
      const candidates = near.filter(inRange);
      const distract = _shuffle([...new Set(candidates)]).slice(0, count - 1);
      // Complète si le palier est trop bas/étroit pour fournir assez de voisins proches.
      let n = correct + spread + 1;
      while (distract.length < count - 1 && n <= ceil + spread + 10) {
        if (inRange(n) && !distract.includes(n)) distract.push(n);
        n++;
      }
      return _shuffle([correct, ...distract]);
    },

    // Démarre l'état de retry d'une question (alias QcmRetry.create()).
    beginQuestion() {
      return global.QcmRetry.create();
    },

    // Traite une réponse (alias QcmRetry.handle()) — même contrat outcome/points/attempts.
    answer(qcmState, isCorrect) {
      return global.QcmRetry.handle(qcmState, isCorrect);
    },

    // Boucle de manche générique optionnelle : gère l'incrémentation et l'arrêt.
    // La peau garde la main sur le rendu (onQuestion) et la fin (onDone) ;
    // ce helper évite juste de dupliquer le "if (i >= n) fin; else question suivante".
    runRound(cfg) {
      let i = 0;
      function step() {
        if (i >= cfg.nQuestions) { cfg.onDone(); return; }
        const levelIdx = cfg.getLevel(i);
        const level = cfg.niveaux[levelIdx];
        const n = MJCompte.nextValue(level);
        const index = i;
        i++;
        cfg.onQuestion(n, index);
      }
      return { step };
    },
  };

  global.MJCompte = MJCompte;
})(window);
