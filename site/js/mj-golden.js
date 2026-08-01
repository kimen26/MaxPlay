// ─────────────────────────────────────────────────────────────────────────
//  mj-golden.js — Brique STANDARD GOLDEN MaxPlay (source: studio/minijeux/docs/STANDARD-MJ.md)
//
//  Niveaux par étoiles (validé Papa Yann 2026-06-11) :
//    0 étoile → Niveau 1 : 4 questions (simple)
//    1 étoile → Niveau 2 : 6 questions (plus dur)
//    2+ étoiles → Niveau 3 (MAX) : 8 questions — on y reste ensuite
//  ÉTOILE = SANS FAUTE : toutes les questions réussies du 1er coup (billes vertes).
//  ⚠️ FORMULE niveau = min(2, Stars) : reste la LOI pour TOUS les jeux SAUF le
//  PILOTE EP-112 (mj-04) — GO Papa Yann 2026-07-28 (« je veux bien que ce truc
//  qui monte le niveau plus vite soit codé/testé »). Spec :
//  studio/minijeux/docs/2026-07-28-spec-montee-niveau.md. La 2e porte
//  « compétence » (levelOf) n'est active QUE pour COMPETENCE_PILOTS ; la
//  propagation aux autres jeux attend la validation du ressenti avec Max.
//
//  Billes : v1 vert (1er coup) · v2 jaune (2e) · v3 orange (3e) · v4 rouge (révélé).
//  Mini-célébrations aléatoires en cours de jeu (confettis / étoile filante).
//  Fin sans-faute : l'étoile fait un tour d'écran, BIZOU = elle remonte et prend
//  TOUT L'ÉCRAN (zoom plein cadre + pop sonore), puis va se ranger dans la zone
//  de 3 badges. Son Mario (MP3 réel), message niveau.
//  Fin avec erreurs : pas d'étoile — écran encourageant, jamais punitif.
//  Pas de "Bravo" parlé à chaque étape : juste sndDing (son de réussite).
//
//  CHANTIER NID (2026-07-26, studio/minijeux/docs/2026-07-26-chantier-nid-plan.md) :
//    A2 — reprise de partie : état {qIndex, résultats pips, niveau} sauvé en
//         localStorage à chaque question, restauré à l'ouverture si <24h.
//    A3 — fin de partie RÉÉCRITE : toute partie TERMINÉE (parfaite ou non)
//         donne 1 capsule (œuf) via Collection.grantCapsule(). Séquence stricte
//         œuf (~1s) PUIS étoile sans-faute éventuelle (jamais en parallèle),
//         puis 3 boutons (Encore/La suite/Maison) tapables en < 3s. Rétro-
//         compatible : conteneurs .end-wrap/.end-btns/#badgeZone conservés.
//
//  Usage (après catalog.js/stars.js si le jeu est au catalogue) :
//    const G = Golden.setup('mj-24');     // → G.level (0..2), G.totalQ (4/6/8)
//    G.buildPips();                        // construit les billes
//    G.notePip(index, attempts);           // à CHAQUE question terminée (1..3, 4=révélé)
//    G.showEnd({ replayUrl:'mj-24.html', celebrate: fn? });  // écran de fin auto
//  Styles requis : css/mp-theme.css (section STANDARD GOLDEN — déplacée de
//  style.css le 2026-08-01, chargée partout par mj-shell).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  const QS_PER_LEVEL = [4, 6, 8];
  const MAX_STARS = 3;
  const RESUME_TTL_MS = 24 * 60 * 60 * 1000; // 24h (avenant P0 §8 : pas de rattrapage rétroactif au-delà)

  function inCatalog(id) {
    return !!(global.MAXPLAY_CATALOG || []).find(c => c.id === id && c.maxStars > 0);
  }
  function starsOf(id) {
    try {
      if (global.Stars && inCatalog(id)) return Math.min(MAX_STARS, global.Stars.get(id));
    } catch (e) {}
    return Math.min(MAX_STARS, parseInt(localStorage.getItem('golden_stars_' + id) || '0', 10) || 0);
  }

  // ── EP-112 — montée de niveau par COMPÉTENCE (spec 2026-07-28, PILOTE) ──
  // Niveau = max(plancher étoiles, niveau OUVERT par la compétence). La porte
  // compétence s'ouvre quand les 3 dernières parties terminées DEPUIS la
  // dernière ouverture totalisent ≥ 80 % de réponses du premier coup
  // (champ `first` de tracker.js ; 3 parties mini = anti-hasard, cf. spec §1).
  // JAMAIS de descente : le niveau ouvert est persisté (golden_openlvl_<id>,
  // monotone) — sans lui, une baisse de forme refermerait la porte. Une seule
  // ouverture par lot de 3 parties (openedAt date la frontière).
  const COMPETENCE_PILOTS = ['mj-04'];
  const _justOpened = {};

  function _firstTryRate(id, sinceTs) {
    try {
      // ⚠ Tracker est un const top-level (PAS sur window) — piège documenté
      // (nid-ui.js) : toujours l'identifiant nu via typeof, jamais global.Tracker.
      const T = (typeof Tracker !== 'undefined') ? Tracker : global.Tracker;
      const g = ((T && T.getStats().games) || {})[id];
      const h = ((g && g.history) || [])
        .filter(s => s.questions > 0 && (!sinceTs || Date.parse(s.date) > sinceTs))
        .slice(-3);
      if (h.length < 3) return null;
      const q = h.reduce((s, x) => s + x.questions, 0);
      const c = h.reduce((s, x) => s + (x.first || 0), 0);
      return q > 0 ? c / q : null;
    } catch (e) { return null; }
  }

  // Niveau 0-based, plafonné à maxLevel (2 pour la brique golden).
  function levelOf(id, maxLevel) {
    const floor = Math.min(maxLevel, starsOf(id));
    if (COMPETENCE_PILOTS.indexOf(id) === -1) return floor;
    let opened = { lvl: 0, at: 0 };
    try {
      const raw = JSON.parse(localStorage.getItem('golden_openlvl_' + id) || 'null');
      if (raw && typeof raw.lvl === 'number') opened = raw;
    } catch (e) {}
    let lvl = Math.max(floor, Math.min(maxLevel, opened.lvl));
    const rate = _firstTryRate(id, opened.at);
    if (rate !== null && rate >= 0.8 && lvl < maxLevel) {
      lvl += 1;
      _justOpened[id] = true;   // la montée se célèbre (spec §4) — le jeu la lit une fois
      try { localStorage.setItem('golden_openlvl_' + id, JSON.stringify({ lvl: lvl, at: Date.now() })); } catch (e) {}
    }
    return lvl;
  }

  function consumeLevelUp(id) {
    const up = !!_justOpened[id];
    _justOpened[id] = false;
    return up;
  }

  // ── A2 — reprise de partie (silencieuse, pas d'UI de choix) ─────────────
  function resumeKey(id) { return 'maxplay_resume_' + id; }

  function loadResume(id) {
    try {
      const raw = localStorage.getItem(resumeKey(id));
      if (!raw) return null;
      const d = JSON.parse(raw);
      if (!d || typeof d !== 'object') return null;
      if (!d.savedAt || (Date.now() - d.savedAt) > RESUME_TTL_MS) return null;
      return d;
    } catch (e) { return null; }
  }

  function saveResume(id, state) {
    try {
      localStorage.setItem(resumeKey(id), JSON.stringify(Object.assign({}, state, { savedAt: Date.now() })));
    } catch (e) { /* plein/absent : silencieux, la partie continue sans reprise */ }
  }

  function clearResume(id) {
    try { localStorage.removeItem(resumeKey(id)); } catch (e) {}
  }

  const Golden = {
    gameId: null, stars: 0, level: 0, totalQ: 4, _firstTry: 0, _answered: 0,
    _pipResults: [], resumed: false,

    setup(gameId) {
      this.gameId = gameId;
      this.stars = starsOf(gameId);
      // levelOf = min(2, stars) pour tous les jeux, SAUF pilotes EP-112
      // (2e porte compétence). Identique à l'historique hors pilote.
      this.level = levelOf(gameId, 2);
      this.totalQ = QS_PER_LEVEL[this.level];
      this._firstTry = 0;
      this._answered = 0;
      this._pipResults = [];
      this.resumed = false;

      // A2 : reprise silencieuse si une partie était en cours (<24h)
      const r = loadResume(gameId);
      if (r && Array.isArray(r.pipResults) && typeof r.level === 'number' && r.level === this.level) {
        this._pipResults = r.pipResults.slice();
        this._answered = this._pipResults.length;
        this._firstTry = this._pipResults.filter(a => a === 1).length;
        this.resumed = true;
      }
      return this;
    },

    // Piste de questions (Design System v1) : pastilles .mp-q — le résultat RESTE affiché.
    // Classes historiques .pip/.cur/.vN conservées (specs harnais + compat CSS).
    buildPips() {
      const box = document.getElementById('pips');
      if (!box) return;
      box.classList.add('mp-track');
      // Plafond d'affichage (EP-C2) : au-delà de 12 pastilles la piste déborde
      // et devient illisible (retour PY sur mj-22 en mode difficile, 25 pays).
      // On garde UNE pastille PAR question (le résultat de chacune doit rester
      // visible et fiable pour la logique existante), mais on compacte le
      // rendu : plus petit + passage à la ligne, jamais de scroll horizontal caché.
      box.classList.toggle('mp-track-dense', this.totalQ > 12);
      box.innerHTML = '';
      for (let i = 0; i < this.totalQ; i++) {
        const d = document.createElement('div');
        d.className = 'pip mp-q ' + (i === 0 ? 'cur current' : 'todo');
        d.id = 'pip' + i;
        d.textContent = String(i + 1);
        box.appendChild(d);
      }
      // étoiles du jeu à droite de la piste (design v3 : elles vivent EN HAUT)
      const spacer = document.createElement('span');
      spacer.className = 'grow';
      box.appendChild(spacer);
      const gs = document.createElement('span');
      gs.className = 'mp-g-stars';
      gs.id = 'track-stars';
      let stars = '';
      for (let i = 0; i < MAX_STARS; i++) stars += i < this.stars ? '★' : '<span class="off">★</span>';
      gs.innerHTML = stars;
      box.appendChild(gs);

      // A2 : redessine la piste restaurée (le contenu de la question courante
      // reste à charge du jeu — ici on ne remet que le VISUEL des billes déjà jouées).
      if (this.resumed && this._pipResults.length) {
        this._pipResults.forEach((attempts, i) => this._paintPip(i, attempts));
        const nx = document.getElementById('pip' + this._pipResults.length);
        if (nx) { nx.classList.add('cur', 'current'); nx.classList.remove('todo'); }
      }
    },

    // Peint UNE bille sans compter les stats (utilisé par notePip ET par la reprise A2).
    _paintPip(i, attempts) {
      const p = document.getElementById('pip' + i);
      if (!p) return;
      const a = Math.min(attempts, 4);
      const state = a === 1 ? 'done-first' : (a === 4 ? 'done-helped' : 'done-retry');
      const badge = a === 4 ? '💡' : '✓';
      p.classList.remove('cur', 'current', 'todo');
      p.classList.add('v' + a, state);
      p.textContent = badge;
    },

    // À appeler quand une question est TERMINÉE. attempts: 1,2,3 ; 4 = révélé.
    // fromEl (optionnel) : élément de la bonne réponse → jeton MaxFX vers la pastille.
    notePip(i, attempts, fromEl) {
      const p = document.getElementById('pip' + i);
      const a = Math.min(attempts, 4);
      // États design system v3 : ✓ VERT = 1er coup (l'or reste aux ★★★) ·
      // ✓ orange = après essai · 💡 rouge doux = révélé/aidé
      const state = a === 1 ? 'done-first' : (a === 4 ? 'done-helped' : 'done-retry');
      const badge = a === 4 ? '💡' : '✓';
      if (p) {
        p.classList.remove('cur', 'current', 'todo');
        p.classList.add('v' + a, state);
        p.textContent = badge;
        const nx = document.getElementById('pip' + (i + 1));
        // Bug transverse (retour PY mj-49) : la pastille suivante ne doit passer
        // en "current" (bleu) qu'APRÈS la fin de l'anim du jeton MaxFX vers la
        // pastille courante — jamais pendant que le jeton vole encore. Sans jeton
        // (fromEl/MaxFX absents), rien à attendre : bascule immédiate comme avant.
        const activateNext = () => { if (nx) { nx.classList.add('cur', 'current'); nx.classList.remove('todo'); } };
        // Jeton MaxFX : part de la bonne réponse vers la pastille (flair, non bloquant)
        if (fromEl && global.MaxFX && global.MaxFX.markPoint) {
          try {
            global.MaxFX.markPoint(fromEl, p, {
              result: a === 1 ? 'green' : (a === 4 ? 'red' : 'orange'),
              badge: badge,
            }).then(activateNext).catch(activateNext);
          } catch (e) { activateNext(); }
        } else {
          activateNext();
        }
      }
      this._answered++;
      this._pipResults[i] = a;
      if (attempts === 1) {
        this._firstTry++;
        // mini-celebration en cours de jeu (si pas déjà le jeton MaxFX)
        if (this._answered < this.totalQ && !(fromEl && global.MaxFX)) this.microCelebrate();
      }
      // Étoile = sans faute → seul le 1er coup compte comme "correct" pour la progression
      try { if (typeof Tracker !== 'undefined') Tracker.logAnswer(attempts === 1); } catch (e) {}

      // A2 : sauve l'état APRÈS chaque question (silencieux). Effacé en fin de partie.
      if (this._answered < this.totalQ) {
        saveResume(this.gameId, { level: this.level, pipResults: this._pipResults.slice() });
      } else {
        clearResume(this.gameId);
      }
    },

    isPerfect() { return this._firstTry >= this.totalQ; },

    // Petite fete aleatoire pendant le jeu : parfois confettis, parfois etoile filante, parfois rien.
    microCelebrate() {
      const r = Math.random();
      if (r < 0.35) { try { confetti(); } catch (e) {} }
      else if (r < 0.6) this._miniStar();
    },
    _miniStar() {
      try { if (typeof SoundPool !== 'undefined') SoundPool.play('apparition', 0.5); } catch (e) {}
      const s = document.createElement('div');
      s.className = 'fly-star mini';
      s.textContent = '★';
      document.body.appendChild(s);
      const W = innerWidth, H = innerHeight;
      const y1 = H * (0.2 + Math.random() * 0.5), y2 = y1 - 60 - Math.random() * 80;
      const fromLeft = Math.random() < 0.5;
      s.animate([
        { transform: 'translate(' + (fromLeft ? -60 : W + 60) + 'px,' + y1 + 'px) scale(.7) rotate(0deg)', opacity: 0.9 },
        { transform: 'translate(' + (fromLeft ? W + 60 : -60) + 'px,' + y2 + 'px) scale(1) rotate(' + (fromLeft ? 360 : -360) + 'deg)', opacity: 0.9 },
      ], { duration: 900, easing: 'ease-out' }).onfinish = () => s.remove();
    },

    // Compliments de PROCESSUS (fin non-parfaite) — jamais de rappel d'étoile
    // promise (anti-pattern gravé, Papa Yann 2026-07-21 : "j'afficherais pas
    // d'étoile" quand ce n'en est pas une gagnée). Variantes courtes.
    _PROCESS_COMPLIMENTS: [
      'Tu as trouvé les plus durs&nbsp;!',
      'Bien joué, tu as bien cherché&nbsp;!',
      'Tu progresses à chaque partie&nbsp;!',
      'Beau travail aujourd’hui&nbsp;!',
    ],

    showEnd(opts) {
      opts = opts || {};
      const app = document.getElementById('app');
      const perfect = this.isPerfect();
      try { if (typeof Tracker !== 'undefined') Tracker.endSession(this._firstTry * 10, this.totalQ * 10); } catch (e) {}
      clearResume(this.gameId); // A2 : partie terminée → plus rien à reprendre

      const newStars = perfect ? Math.min(MAX_STARS, this.stars + 1) : this.stars;
      // Persistance hors-catalogue (jeux de démo) ; au catalogue, stars.js dérive du tracker.
      if (perfect && !inCatalog(this.gameId)) {
        try { localStorage.setItem('golden_stars_' + this.gameId, String(newStars)); } catch (e) {}
      }

      // NID v4 (2026-07-30) : 1 gain par partie TERMINÉE, règle DÉTERMINISTE
      // lisible — nid pas plein → ŒUF (couleur = famille, connue tout de
      // suite) · nid plein → ACCESSOIRE de soin (paille/couverture/bonnet/
      // écharpe, file dans le sac). Anti-farm PY 2026-07-28 étendu : un jeu
      // à 3 étoiles ne donne plus RIEN (ni œuf ni accessoire) — la partie
      // reste valorisée par l'écran de fin. UN seul gain, annoncé clairement
      // (exigence PY 2026-07-28), jamais mélangé avec l'étoile.
      // 3e étoile GAGNÉE À L'INSTANT (maîtrise) : le gain de la partie est
      // remplacé par l'accessoire ÉTOILE permanent (décision 2026-07-30) —
      // toujours UN seul gain annoncé.
      const justMastered = perfect && this.stars < MAX_STARS && newStars >= MAX_STARS;
      let grant = null;
      if (global.Collection && global.Collection.grantCapsule) {
        try { grant = global.Collection.grantCapsule({ gameId: this.gameId, mastered: justMastered }); } catch (e) {}
      }
      const rewardGranted = !!(grant && grant.granted !== false);
      const eggGranted = rewardGranted && grant.type !== 'accessoire';
      const accGranted = rewardGranted && grant.type === 'accessoire';
      const noMoreEggsHere = !!(grant && grant.granted === false);
      const readyToHatch = !!(global.Collection && global.Collection.readyToHatch && (function () {
        try { return global.Collection.readyToHatch(); } catch (e) { return false; }
      })());

      // Zone de 3 badges : pré-remplie avec les étoiles déjà acquises.
      let slots = '';
      for (let i = 0; i < MAX_STARS; i++) {
        slots += '<div class="badge-slot' + (i < this.stars ? ' filled' : '') + '" id="slot' + i + '">★</div>';
      }

      // Célébration d'étoile (décision PY 2026-07-30, fusion brainstorm) :
      // ÉNORME uniquement quand la 3e étoile vient d'être gagnée (« Tu
      // maîtrises ce jeu ! ») — les 1re/2e se gagnent DISCRÈTEMENT (petit vol
      // d'étoile vers le badge, ding, pas de cinématique plein écran).
      let title, sub;
      if (perfect) {
        title = justMastered
          ? 'Tu maîtrises ce jeu&nbsp;!'
          : 'Tu as gagné l’étoile niveau ' + (this.stars + 1) + '&nbsp;!';
        sub = (newStars >= MAX_STARS)
          ? 'Niveau MAXIMUM&nbsp;! Champion&nbsp;!'
          : 'Recommence et essaie de gagner la ' + (newStars + 1) + 'ᵉ étoile&nbsp;!';
      } else {
        // Surnom échappé : donnée saisie (compte parent, demain sync serveur) → jamais en HTML brut
        title = (function(){try{var k=(JSON.parse(localStorage.getItem('maxplay_active_child'))||{}).nickname;if(!k)return 'Bien joué&nbsp;!';var d=document.createElement('div');d.textContent=k;return 'Bien joué '+d.innerHTML+'&nbsp;!';}catch(e){return 'Bien joué&nbsp;!';}})();
        sub = Golden._PROCESS_COMPLIMENTS[(Math.random() * Golden._PROCESS_COMPLIMENTS.length) | 0];
      }
      // Bug 3 (lisibilité, exigence PY 2026-07-28) : jamais mélanger œuf et
      // étoile — d'abord l'œuf (ou le message clair "déjà 3 étoiles ici" s'il
      // n'y en a pas), PUIS l'étoile sans-faute s'il y en a une. Jamais les
      // deux en même temps, jamais d'ambiguïté sur ce qui a été gagné.
      if (noMoreEggsHere) {
        sub = (sub ? sub + ' ' : '') + 'Tu as déjà toutes les étoiles ici&nbsp;! Essaie un autre jeu pour gagner un œuf.';
      }
      // Séquencement (retour playtest Papa Yann 2026-07-26) : l'œuf doit se voir
      // et se jouer AVANT titre/sous-titre/boutons — plus de délai CSS fixe qui
      // les affichait EN PARALLÈLE de l'anim d'œuf (~2s, plein écran). Le délai
      // de base part maintenant après la fin de l'œuf (eggGranted ? ~2s : 0),
      // + la fenêtre étoile (perfect) comme avant.
      const eggDelay = rewardGranted ? 2.1 : 0;
      // Fenêtre étoile : large pour la 3e (cinématique), courte pour les
      // discrètes (petit vol ~1s), nulle sans étoile.
      const starDelay = justMastered ? 3 : (perfect ? 1.2 : 0);
      const dly = [
        (eggDelay + starDelay + .3) + 's',
        (eggDelay + starDelay + .5) + 's',
        (eggDelay + starDelay + .7) + 's',
      ];

      // A3 : 3 boutons rétro-compatibles (.end-btns conservé, data-act ajouté).
      // « La suite » masqué si MJKit.chain indisponible ou pas de jeu suivant.
      const nextUrl = (global.MJKit && global.MJKit.chain) ? (function () {
        try { const c = global.MJKit.chain(Golden.gameId); return c && c.next ? c.next.url : null; } catch (e) { return null; }
      })() : null;
      const replayUrl = opts.replayUrl || location.pathname.split('/').pop();
      const nestBadge = readyToHatch ? '<span class="nid-badge" title="ça bouge dans le nid !">🥚</span>' : '';

      let btns = '<a href="' + replayUrl + '" data-act="replay" style="background:#00c47a;">🔄 Encore&nbsp;!</a>';
      if (nextUrl) {
        btns += '<a href="' + nextUrl + '" data-act="next" class="btn-next-big" style="background:#ffd166;color:#3a2a00;">La suite →' + nestBadge + '</a>';
      }
      btns += '<a href="index.html" data-act="home" aria-label="Maison" style="background:#ffffff22;">🏠' + nestBadge + '</a>';

      app.innerHTML =
        '<div class="end-wrap">'
        + '<div class="badge-zone" id="badgeZone">' + slots + '</div>'
        + '<div class="egg-zone" id="eggZone"></div>'
        + '<div class="end-title" style="animation-delay:' + dly[0] + '">' + title + '</div>'
        + '<div class="end-sub" style="animation-delay:' + dly[1] + '">' + sub + '</div>'
        + '<div class="end-btns" style="animation-delay:' + dly[2] + '">' + btns + '</div>'
        + '</div>';

      // ── Séquencement STRICT (avenant P0 §7, réécrit 2026-07-26) : GROS œuf
      // plein écran (~1.5-2s, MaxFX.eggEarned v2) PUIS étoile éventuelle, jamais
      // en parallèle — et surtout AVANT titre/sous-titre/boutons (dly ci-dessus
      // décalé d'autant). L'œuf vole vers la zone des badges (le "nid" visuel
      // de l'écran de fin), pas vers une mini-pastille invisible.
      const eggZone = document.getElementById('eggZone');
      const badgeAnchor = document.getElementById('badgeZone');
      // Théâtre du gain (œuf teinté FAMILLE ou accessoire de soin) — même
      // séquence MaxFX.eggEarned pour les deux (un seul visuel plein cadre,
      // un seul label : jamais d'ambiguïté sur ce qui a été gagné).
      const runEgg = (rewardGranted && global.MaxFX && global.MaxFX.eggEarned)
        ? (function () {
            const egg = (global.MJKit && global.MJKit.oeuf) ? global.MJKit.oeuf(56) : (function () {
              const d = document.createElement('div'); d.textContent = '🥚'; d.style.fontSize = '40px'; return d;
            })();
            if (eggZone) eggZone.appendChild(egg); else document.body.appendChild(egg);
            egg.style.visibility = 'hidden'; // ancre invisible : le vrai visuel vit dans l'overlay MaxFX
            const fxOpts = { golden: !!grant.justGolden, toEl: badgeAnchor || egg };
            if (accGranted) {
              const acc = grant.accessoire || {};
              fxOpts.emoji = acc.emoji || '🎁';
              const nom = acc.nom || 'un cadeau';
              fxOpts.label = grant.special
                ? 'Une super étoile de champion !'
                : nom.charAt(0).toUpperCase() + nom.slice(1) + ' pour tes œufs !';
              if (grant.special) fxOpts.golden = true; // l'étoile de maîtrise brille or
            } else if (grant.familleMeta && grant.familleMeta.color && !grant.justGolden) {
              fxOpts.color = grant.familleMeta.color; // œuf teinté = famille (surprise l'espèce)
            }
            try {
              return global.MaxFX.eggEarned(egg, fxOpts)
                .then(function () { egg.remove(); });
            } catch (e) { egg.remove(); return Promise.resolve(); }
          })()
        : Promise.resolve();

      // Première réception de l'étoile (spec v0.7) : les 3 étapes MONTRÉES
      // côte à côte (super star → jaune → estompée), une phrase — montré,
      // jamais expliqué. One-shot par profil.
      const runEtoileIntro = () => {
        if (!grant || !grant.special) return Promise.resolve();
        let key = 'maxplay_etoile_intro';
        try {
          const c = JSON.parse(localStorage.getItem('maxplay_active_child'));
          if (c && c.id) key += '__' + c.id;
        } catch (e) {}
        try { if (localStorage.getItem(key)) return Promise.resolve(); localStorage.setItem(key, '1'); } catch (e) { return Promise.resolve(); }
        return new Promise((resolve) => {
          const ov = document.createElement('div');
          ov.className = 'etoile-intro-ov';
          ov.style.cssText = 'position:fixed;inset:0;z-index:72;display:flex;align-items:center;justify-content:center;background:rgba(6,10,22,.8);';
          ov.innerHTML =
            '<div style="background:var(--card,#16233f);border-radius:22px;padding:22px 24px;text-align:center;max-width:320px;">' +
              '<div style="font-size:38px;letter-spacing:6px;">🌟 <span style="opacity:.85">→</span> ⭐ <span style="opacity:.85">→</span> 🧣</div>' +
              '<div style="font-family:\'Fredoka One\',sans-serif;font-size:17px;margin-top:12px;">Elle dure plus longtemps !</div>' +
            '</div>';
          document.body.appendChild(ov);
          let done = false;
          const fin = () => {
            if (done) return;
            done = true;
            ov.style.transition = 'opacity .25s';
            ov.style.opacity = '0';
            setTimeout(() => { ov.remove(); resolve(); }, 260);
          };
          ov.addEventListener('click', fin);
          setTimeout(fin, 6000);
        });
      };

      runEgg.then(runEtoileIntro).then(() => {
        if (perfect && justMastered) {
          // 3e étoile = LA grande fête (cinématique + Mario + « tu maîtrises »).
          if (global.MaxFX && global.MaxFX.finalStar) {
            try { const a = new Audio('sounds/victory-mario-series-hq-super-smash-bros.mp3'); a.volume = 0.85; a.play().catch(() => {}); } catch (e) {}
            global.MaxFX.finalStar(app, {
              style: 'cinematic',
              belt: { earned: newStars, total: MAX_STARS, anchorEl: badgeAnchor },
            }).then(() => {
              const slot = document.getElementById('slot' + this.stars);
              if (slot) slot.classList.add('filled', 'pop');
              try { if (global.SoundPool && SoundPool.voiceLine) SoundPool.voiceLine('etoile-gagnee', 'Tu maîtrises ce jeu !'); } catch (e) {}
              if (typeof opts.celebrate === 'function') { try { opts.celebrate(); } catch (e) {} }
            }).catch(() => {});
          } else {
            this._starFlight(this.stars, opts.celebrate); // fallback historique (BIZOU)
          }
        } else if (perfect) {
          // 1re/2e étoile (ou sans-faute à 3★ déjà acquises) : DISCRET —
          // petit vol direct vers le badge + ding, pas de plein écran.
          this._discreetStar(Math.min(this.stars, MAX_STARS - 1), this.stars < MAX_STARS);
          if (typeof opts.celebrate === 'function') { try { opts.celebrate(); } catch (e) {} }
        } else {
          try { sndBravo(); } catch (e) {}
          // Fin sans étoile : encouragement doux, jamais punitif — confettis discrets seuls.
          try { confetti(); } catch (e) {}
        }
      });
    },

    // Étoile DISCRÈTE (1re/2e, décision PY 2026-07-30) : petit vol direct du
    // centre vers le badge + ding — pas de plein écran, pas de Mario.
    _discreetStar(slotIndex, fillSlot) {
      const star = document.createElement('div');
      star.className = 'fly-star mini';
      star.textContent = '★';
      document.body.appendChild(star);
      const W = innerWidth, H = innerHeight;
      const slot = document.getElementById('slot' + slotIndex);
      const r = slot ? slot.getBoundingClientRect() : { left: W / 2 - 20, top: 60, width: 40, height: 40 };
      try { if (typeof SoundPool !== 'undefined') SoundPool.play('apparition', 0.6); } catch (e) {}
      const anim = star.animate([
        { transform: 'translate(' + (W / 2) + 'px,' + (H * 0.55) + 'px) scale(1.6)', opacity: 0 },
        { transform: 'translate(' + (W / 2) + 'px,' + (H * 0.5) + 'px) scale(2)', opacity: 1, offset: 0.35 },
        { transform: 'translate(' + (r.left + r.width / 2) + 'px,' + (r.top + r.height / 2) + 'px) scale(0.5)', opacity: 1 },
      ], { duration: 950, easing: 'ease-in-out', fill: 'forwards' });
      anim.onfinish = () => {
        star.remove();
        if (fillSlot && slot) slot.classList.add('filled', 'pop');
        try { sndDing && sndDing(); } catch (e) {}
      };
    },

    // L'étoile : tour d'écran → BIZOU (zoom plein écran + pop) → atterrit dans le badge.
    _starFlight(slotIndex, celebrate) {
      const star = document.createElement('div');
      star.className = 'fly-star';
      star.textContent = '★';
      document.body.appendChild(star);

      try { const a = new Audio('sounds/victory-mario-series-hq-super-smash-bros.mp3'); a.volume = 0.85; a.play().catch(() => {}); } catch (e) {}

      const W = innerWidth, H = innerHeight;
      const slot = document.getElementById('slot' + slotIndex);
      const r = slot ? slot.getBoundingClientRect() : { left: W / 2 - 20, top: 60, width: 40, height: 40 };
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;

      // BIZOU = l'etoile remonte et PREND TOUT L'ECRAN (zoom plein cadre), puis file au badge.
      const FULL = (Math.max(W, H) * 1.25) / 64;   // scale pour remplir l'ecran (etoile 64px)
      const kf = [
        { transform: 'translate(' + (W / 2) + 'px,' + (H + 60) + 'px) scale(1) rotate(0deg)', offset: 0 },
        { transform: 'translate(' + (W * 0.85) + 'px,' + (H * 0.62) + 'px) scale(1.15) rotate(25deg)', offset: 0.14 },
        { transform: 'translate(' + (W * 0.82) + 'px,' + (H * 0.16) + 'px) scale(1.2) rotate(-15deg)', offset: 0.3 },
        { transform: 'translate(' + (W * 0.16) + 'px,' + (H * 0.14) + 'px) scale(1.2) rotate(15deg)', offset: 0.45 },
        { transform: 'translate(' + (W * 0.18) + 'px,' + (H * 0.62) + 'px) scale(1.3) rotate(-20deg)', offset: 0.56 },
        { transform: 'translate(' + (W / 2) + 'px,' + (H / 2) + 'px) scale(' + FULL + ') rotate(0deg)', offset: 0.74 },        // BIZOU : plein ecran
        { transform: 'translate(' + (W / 2) + 'px,' + (H / 2) + 'px) scale(' + (FULL * 0.92) + ') rotate(-4deg)', offset: 0.8 }, // smack
        { transform: 'translate(' + cx + 'px,' + cy + 'px) scale(0.45) rotate(0deg)', offset: 1 },                              // file au badge
      ];
      const anim = star.animate(kf, { duration: 2700, easing: 'ease-in-out', fill: 'forwards' });

      // pop sonore au pic du bizou (l'etoile plein ecran)
      setTimeout(() => {
        try { const k = new Audio('sounds/freesound_community-bus-pop-85054.mp3'); k.volume = 0.8; k.play().catch(() => {}); } catch (e) {}
      }, 2000);

      anim.onfinish = () => {
        star.remove();
        if (slot) slot.classList.add('filled', 'pop');
        // Félicitation parlée au moment où l'étoile atterrit (1 des 3 voix)
        try { if (window.SoundPool && SoundPool.voiceLine) SoundPool.voiceLine('etoile-gagnee', 'Tu as gagné une étoile !'); } catch (e) {}
        if (typeof celebrate === 'function') { try { celebrate(); } catch (e) {} }
        else { try { confettiBurst(70); } catch (e) {} }
      };
    },
  };

  // EP-112 : exposés pour les jeux hors brique golden (mj-04 pilote) — UNE seule
  // implémentation de la montée de niveau, jamais de copie locale.
  Golden.levelOf = levelOf;
  Golden.consumeLevelUp = consumeLevelUp;

  global.Golden = Golden;
})(window);
