// ─── back-button.js — Composant retour menu unifié ───
//
// Flèche ← simple et sobre, header compact (~36px).
// Auto-init au DOMContentLoaded : remplace tout élément .back / .back-mj / .back-btn.

(function () {
  'use strict';

  function createBackButton(href, ariaLabel) {
    href = href || 'index.html';
    ariaLabel = ariaLabel || 'Retour au menu';

    const btn = document.createElement('a');
    btn.href = href;
    btn.className = 'mp-back-btn';
    btn.setAttribute('aria-label', ariaLabel);
    btn.textContent = '←';

    btn.style.cssText = [
      'display:inline-flex',
      'align-items:center',
      'justify-content:center',
      'width:44px',
      'height:44px',
      'padding:0',
      'color:#fff',
      'font-size:19px',
      'font-weight:900',
      'background:rgba(255,255,255,0.09)',
      'border:none',
      'border-radius:50%',
      'cursor:pointer',
      'text-decoration:none',
      'flex-shrink:0',
      'touch-action:manipulation',
      '-webkit-tap-highlight-color:transparent',
      'transition:background 150ms ease',
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
