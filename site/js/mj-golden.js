// ─────────────────────────────────────────────────────────────────────────
//  mj-golden.js — Brique STANDARD GOLDEN MaxPlay (source: studio/minijeux/docs/STANDARD-MJ.md)
//
//  Niveaux par étoiles (validé Papa Yann 2026-06-11) :
//    0 étoile → Niveau 1 : 4 questions (simple)
//    1 étoile → Niveau 2 : 6 questions (plus dur)
//    2+ étoiles → Niveau 3 (MAX) : 8 questions — on y reste ensuite
//  ÉTOILE = SANS FAUTE : toutes les questions réussies du 1er coup (billes vertes).
//
//  Billes : v1 vert (1er coup) · v2 jaune (2e) · v3 orange (3e) · v4 rouge (révélé).
//  Mini-célébrations aléatoires en cours de jeu (confettis / étoile filante).
//  Fin sans-faute : l'étoile fait un tour d'écran, BIZOU = elle remonte et prend
//  TOUT L'ÉCRAN (zoom plein cadre + pop sonore), puis va se ranger dans la zone
//  de 3 badges. Son Mario (MP3 réel), message niveau.
//  Fin avec erreurs : pas d'étoile — écran encourageant, jamais punitif.
//  Pas de "Bravo" parlé à chaque étape : juste sndDing (son de réussite).
//
//  Usage (après catalog.js/stars.js si le jeu est au catalogue) :
//    const G = Golden.setup('mj-24');     // → G.level (0..2), G.totalQ (4/6/8)
//    G.buildPips();                        // construit les billes
//    G.notePip(index, attempts);           // à CHAQUE question terminée (1..3, 4=révélé)
//    G.showEnd({ replayUrl:'mj-24.html', celebrate: fn? });  // écran de fin auto
//  Styles requis : css/style.css (section STANDARD GOLDEN).
// ─────────────────────────────────────────────────────────────────────────
(function (global) {
  const QS_PER_LEVEL = [4, 6, 8];
  const MAX_STARS = 3;

  function inCatalog(id) {
    return !!(global.MAXPLAY_CATALOG || []).find(c => c.id === id && c.maxStars > 0);
  }
  function starsOf(id) {
    try {
      if (global.Stars && inCatalog(id)) return Math.min(MAX_STARS, global.Stars.get(id));
    } catch (e) {}
    return Math.min(MAX_STARS, parseInt(localStorage.getItem('golden_stars_' + id) || '0', 10) || 0);
  }

  const Golden = {
    gameId: null, stars: 0, level: 0, totalQ: 4, _firstTry: 0, _answered: 0,

    setup(gameId) {
      this.gameId = gameId;
      this.stars = starsOf(gameId);
      this.level = Math.min(2, this.stars);
      this.totalQ = QS_PER_LEVEL[this.level];
      this._firstTry = 0;
      this._answered = 0;
      return this;
    },

    buildPips() {
      const box = document.getElementById('pips');
      if (!box) return;
      box.innerHTML = '';
      for (let i = 0; i < this.totalQ; i++) {
        const d = document.createElement('div');
        d.className = 'pip' + (i === 0 ? ' cur' : '');
        d.id = 'pip' + i;
        box.appendChild(d);
      }
    },

    // À appeler quand une question est TERMINÉE. attempts: 1,2,3 ; 4 = révélé.
    notePip(i, attempts) {
      const p = document.getElementById('pip' + i);
      if (p) {
        p.classList.remove('cur');
        p.classList.add('v' + Math.min(attempts, 4));
        const nx = document.getElementById('pip' + (i + 1));
        if (nx) nx.classList.add('cur');
      }
      this._answered++;
      if (attempts === 1) {
        this._firstTry++;
        // mini-celebration ALEATOIRE en cours de jeu (variete avant le bizou final)
        if (this._answered < this.totalQ) this.microCelebrate();
      }
      // Étoile = sans faute → seul le 1er coup compte comme "correct" pour la progression
      try { if (typeof Tracker !== 'undefined') Tracker.logAnswer(attempts === 1); } catch (e) {}
    },

    isPerfect() { return this._firstTry >= this.totalQ; },

    // Petite fete aleatoire pendant le jeu : parfois confettis, parfois etoile filante, parfois rien.
    microCelebrate() {
      const r = Math.random();
      if (r < 0.35) { try { confetti(); } catch (e) {} }
      else if (r < 0.6) this._miniStar();
    },
    _miniStar() {
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

    showEnd(opts) {
      opts = opts || {};
      const app = document.getElementById('app');
      const perfect = this.isPerfect();
      try { if (typeof Tracker !== 'undefined') Tracker.endSession(this._firstTry * 10, this.totalQ * 10); } catch (e) {}

      const newStars = perfect ? Math.min(MAX_STARS, this.stars + 1) : this.stars;
      // Persistance hors-catalogue (jeux de démo) ; au catalogue, stars.js dérive du tracker.
      if (perfect && !inCatalog(this.gameId)) {
        try { localStorage.setItem('golden_stars_' + this.gameId, String(newStars)); } catch (e) {}
      }

      // Zone de 3 badges : pré-remplie avec les étoiles déjà acquises.
      let slots = '';
      for (let i = 0; i < MAX_STARS; i++) {
        slots += '<div class="badge-slot' + (i < this.stars ? ' filled' : '') + '" id="slot' + i + '">★</div>';
      }

      let title, sub;
      if (perfect) {
        title = 'Tu as gagné l’étoile niveau ' + (this.stars + 1) + '&nbsp;!';
        sub = (newStars >= MAX_STARS)
          ? 'Niveau MAXIMUM&nbsp;! Champion&nbsp;!'
          : 'Recommence et essaie de gagner la ' + (newStars + 1) + 'ᵉ étoile&nbsp;!';
      } else {
        title = 'Bien joué Max&nbsp;!';
        sub = 'Fais un sans-faute pour gagner l’étoile&nbsp;!';
      }
      const dly = perfect ? ['3s', '3.2s', '3.4s'] : ['.3s', '.5s', '.7s'];

      app.innerHTML =
        '<div class="end-wrap">'
        + '<div class="badge-zone" id="badgeZone">' + slots + '</div>'
        + '<div class="end-title" style="animation-delay:' + dly[0] + '">' + title + '</div>'
        + '<div class="end-sub" style="animation-delay:' + dly[1] + '">' + sub + '</div>'
        + '<div class="end-btns" style="animation-delay:' + dly[2] + '">'
        + '<a href="' + (opts.replayUrl || location.pathname.split('/').pop()) + '" style="background:#00c47a;">🔄 Rejouer</a>'
        + '<a href="index.html" style="background:#ffffff22;">📋 Menu</a>'
        + '</div></div>';

      if (perfect) {
        this._starFlight(this.stars, opts.celebrate);
      } else {
        try { sndBravo(); } catch (e) {}
        try { confetti(); } catch (e) {}
      }
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
        if (typeof celebrate === 'function') { try { celebrate(); } catch (e) {} }
        else { try { confettiBurst(70); } catch (e) {} }
      };
    },
  };

  global.Golden = Golden;
})(window);
