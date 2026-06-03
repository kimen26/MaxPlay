// ─── intro-splash.js — Splash d'intro pour mini-jeux MaxPlay ───
//
// Règles MaxPlay appliquées :
//   - Pas de TTS au démarrage (EP-033, désactivé car laggait)
//   - Texte JAMAIS seul → icône + titre + animation (rules.md ligne 14)
//   - Finir sur succès (le splash sort sans frustration)
//   - Sessions courtes : splash 1.5s max, skippable au tap
//
// API :
//   <script src="js/intro-splash.js"></script>
//   <script>
//     MaxPlayIntro.show({
//       emoji: '🚌',
//       title: 'Quiz Bus',
//       hint: 'Touche le bon bus !',     // optionnel
//       duration: 1500,                   // optionnel, défaut 1500ms
//       onDone: () => startGame()         // optionnel
//     });
//   </script>
//
// Si tap pendant le splash → skip immédiat (respect agentivité Max).

(function () {
  'use strict';

  let currentSplash = null;

  function show(opts) {
    opts = opts || {};
    const emoji = opts.emoji || '🎮';
    const title = opts.title || 'Mini-jeu';
    const hint = opts.hint || '';
    const duration = typeof opts.duration === 'number' ? opts.duration : 1500;
    const onDone = typeof opts.onDone === 'function' ? opts.onDone : null;

    // Évite multi-splash
    if (currentSplash) {
      currentSplash.remove();
      currentSplash = null;
    }

    const overlay = document.createElement('div');
    overlay.className = 'mp-intro-splash';
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:9999',
      'background:linear-gradient(160deg,#1a2a3a 0%,#0d3b5e 100%)',
      'display:flex',
      'flex-direction:column',
      'align-items:center',
      'justify-content:center',
      'gap:20px',
      'opacity:0',
      'transition:opacity 200ms ease',
      'cursor:pointer',
      'touch-action:manipulation',
      '-webkit-tap-highlight-color:transparent',
    ].join(';');

    overlay.innerHTML = `
      <div class="mp-splash-emoji" style="
        font-size: 6rem;
        animation: mpSplashBounce 800ms ease-in-out infinite alternate;
        line-height: 1;
      ">${emoji}</div>
      <div class="mp-splash-title" style="
        font-family: 'Nunito', sans-serif;
        font-size: 2rem;
        font-weight: 900;
        color: #ffe066;
        text-align: center;
        padding: 0 24px;
      ">${title}</div>
      ${hint ? `
        <div class="mp-splash-hint" style="
          font-family: 'Nunito', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          opacity: 0.85;
          text-align: center;
          padding: 0 24px;
          line-height: 1.4;
        ">${hint}</div>
      ` : ''}
      <div class="mp-splash-skip" style="
        position: absolute;
        bottom: 24px;
        font-family: 'Nunito', sans-serif;
        font-size: 0.85rem;
        color: #fff;
        opacity: 0.4;
      ">Touche pour commencer</div>
    `;

    // Inject keyframes (idempotent)
    if (!document.getElementById('mpSplashStyle')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'mpSplashStyle';
      styleEl.textContent = `
        @keyframes mpSplashBounce {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-12px) scale(1.05); }
        }
      `;
      document.head.appendChild(styleEl);
    }

    document.body.appendChild(overlay);
    currentSplash = overlay;

    // Fade in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    let dismissed = false;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      overlay.style.opacity = '0';
      setTimeout(() => {
        if (overlay.parentNode) overlay.remove();
        currentSplash = null;
        if (onDone) onDone();
      }, 220);
    }

    // Auto-dismiss après duration
    const timer = setTimeout(dismiss, duration);

    // Skip au tap (zéro pénalité, respect agentivité)
    overlay.addEventListener('click', () => {
      clearTimeout(timer);
      dismiss();
    });
    overlay.addEventListener('touchstart', () => {
      clearTimeout(timer);
      dismiss();
    }, { passive: true });

    return { dismiss };
  }

  // Auto-init : si le <body> contient data-mp-intro-title, déclenche au DOMContentLoaded
  function autoInit() {
    const body = document.body;
    if (!body) return;
    const title = body.getAttribute('data-mp-intro-title');
    if (!title) return;
    const emoji = body.getAttribute('data-mp-intro-emoji') || '🎮';
    const hint = body.getAttribute('data-mp-intro-hint') || '';
    const durationAttr = body.getAttribute('data-mp-intro-duration');
    const duration = durationAttr ? parseInt(durationAttr, 10) : 1500;
    show({ emoji, title, hint, duration });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  window.MaxPlayIntro = { show };
})();
