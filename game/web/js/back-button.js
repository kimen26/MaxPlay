// ─── back-button.js — Composant retour menu unifié ───
//
// Règles MaxPlay appliquées :
//   - Zone tap ≥ 80×80 px (rules.md, EP-MJ-AUDIT 2026-05-11)
//   - Forme bus qui rentre au dépôt (rules.md ligne 15)
//   - Feedback < 200ms (transition 150ms + scale 0.92)
//   - Pas d'emoji 🚌 (stack.md règle critique)
//
// API :
//   Auto-init au DOMContentLoaded : remplace tout élément ayant la classe `.back`,
//   `.back-mj` ou les sélecteurs `#hdr a[href*="index.html"]`, `#hdr button[onclick*="index.html"]`.
//
//   Ou injection manuelle : window.injectBackButton(targetSelector, options)
//
// Options:
//   - href: 'index.html' (défaut)
//   - ariaLabel: 'Retour au menu' (défaut)

(function () {
  'use strict';

  // SVG mini bus qui rentre au dépôt (vu de 3/4 face, plus mignon que le profil)
  // Inspiré de bus-svg.js mais simplifié pour bouton 56×56 dans zone tap 80×80
  const BUS_HOME_SVG = `
    <svg viewBox="0 0 60 50" width="40" height="34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Carrosserie turquoise RATP -->
      <rect x="6" y="14" width="42" height="22" rx="4" fill="#1abc9c"/>
      <!-- Pare-brise -->
      <rect x="10" y="18" width="14" height="8" rx="2" fill="#e8f4fa" opacity="0.85"/>
      <!-- Phares -->
      <circle cx="9" cy="33" r="2" fill="#ffe066"/>
      <!-- Roues -->
      <circle cx="15" cy="38" r="4" fill="#1a1a1a"/>
      <circle cx="15" cy="38" r="1.5" fill="#666"/>
      <circle cx="40" cy="38" r="4" fill="#1a1a1a"/>
      <circle cx="40" cy="38" r="1.5" fill="#666"/>
      <!-- Petite flèche dépôt -->
      <path d="M50 22 L54 25 L50 28 L50 26 L46 26 L46 24 L50 24 Z" fill="#fff" opacity="0.9"/>
    </svg>
  `;

  function createBackButton(href, ariaLabel) {
    href = href || 'index.html';
    ariaLabel = ariaLabel || 'Retour au menu';

    const btn = document.createElement('a');
    btn.href = href;
    btn.className = 'mp-back-btn';
    btn.setAttribute('aria-label', ariaLabel);
    btn.innerHTML = BUS_HOME_SVG;

    // Style inline (autosuffisant, pas de dépendance CSS externe)
    btn.style.cssText = [
      'display:inline-flex',
      'align-items:center',
      'justify-content:center',
      'width:80px',
      'height:80px',
      'min-width:80px',
      'min-height:80px',
      'background:linear-gradient(135deg,#00c47a,#00a060)',
      'border:none',
      'border-radius:16px',
      'cursor:pointer',
      'text-decoration:none',
      'box-shadow:0 4px 12px rgba(0,196,122,0.35)',
      'transition:transform 150ms ease,box-shadow 150ms ease',
      'flex-shrink:0',
      'touch-action:manipulation',
      '-webkit-tap-highlight-color:transparent',
    ].join(';');

    btn.addEventListener('touchstart', () => {
      btn.style.transform = 'scale(0.92)';
    }, { passive: true });

    btn.addEventListener('touchend', () => {
      btn.style.transform = 'scale(1)';
    }, { passive: true });

    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'scale(0.92)';
    });

    btn.addEventListener('mouseup', () => {
      btn.style.transform = 'scale(1)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
    });

    return btn;
  }

  // Auto-remplacement des boutons retour existants
  function autoReplace() {
    const selectors = [
      '.back',
      '.back-mj',
      '.back-btn',
      '#hdr a[href*="index.html"]',
      '#hdr button[onclick*="index.html"]',
      'a.back-btn[href*="index.html"]',
      'button.back-btn',
    ];

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((oldEl) => {
        // Évite de remplacer un mp-back-btn déjà injecté
        if (oldEl.classList.contains('mp-back-btn')) return;

        // Récupère le href ou onclick existant
        let href = 'index.html';
        if (oldEl.tagName === 'A' && oldEl.getAttribute('href')) {
          href = oldEl.getAttribute('href');
        } else if (oldEl.tagName === 'BUTTON') {
          const onclick = oldEl.getAttribute('onclick') || '';
          const m = onclick.match(/['"]([^'"]+\.html)['"]/);
          if (m) href = m[1];
        }

        const newBtn = createBackButton(href, oldEl.getAttribute('aria-label') || 'Retour au menu');
        oldEl.parentNode.replaceChild(newBtn, oldEl);
      });
    });
  }

  // Init au DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoReplace);
  } else {
    autoReplace();
  }

  // Expose pour injection manuelle si besoin
  window.MaxPlayBackButton = { create: createBackButton, autoReplace };
})();
