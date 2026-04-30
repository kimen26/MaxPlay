// ─── Feedback & UI Utilities ───

let fbTimer = null;

/**
 * Affiche un feedback visuel (⭐ ou 💪)
 * @param {boolean} ok - true = succès, false = échec
 */
function showFB(ok) {
  const el = document.getElementById('fbOverlay');
  if (!el) return;
  el.textContent = ok ? '⭐' : '💪';
  el.classList.add('show');
  if (fbTimer) clearTimeout(fbTimer);
  fbTimer = setTimeout(() => el.classList.remove('show'), 700);
}

/**
 * Feedback complet (visuel + sonore)
 * @param {boolean} ok - true = succès, false = échec
 */
function feedback(ok) {
  showFB(ok);
  if (ok) sndDing(); else sndBuzz();
}

/**
 * Animation de confetti
 */
function confetti() {
  const colors = ['#ffe066', '#ff82b4', '#00c47a', '#0064B1', '#F58443', '#B43C95', '#75CE89', '#E52421'];
  for (let i = 0; i < 18; i++) {
    const d = document.createElement('div');
    d.className = 'confetti-piece';
    d.style.left = Math.random() * 100 + 'vw';
    d.style.top = '0';
    d.style.background = colors[i % colors.length];
    d.style.animationDelay = (Math.random() * 0.4) + 's';
    d.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 1600);
  }
}

/**
 * Confetti rain (plus dense que confetti()) — WAAPI, self-contained
 * Utilisé pour les écrans de victoire (bravo, parade, fin de partie)
 * @param {number} count - Nombre de pièces (défaut 50)
 * @param {Array<string>} colors - Couleurs (défaut palette RATP)
 */
function confettiBurst(count = 50, colors) {
  const palette = colors || ['#E2001A','#0064B1','#008C59','#ffe066','#B43C95','#FF82B4','#CEC92A','#8D653A'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.style.cssText = `position:fixed;top:-20px;left:${Math.random() * 100}vw;width:10px;height:10px;background:${palette[i % palette.length]};border-radius:${Math.random() > 0.5 ? '50%' : '0'};pointer-events:none;z-index:999;`;
      document.body.appendChild(c);
      c.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${(Math.random() - 0.5) * 200}px,${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], { duration: 2000 + Math.random() * 2000, easing: 'ease-in' }).onfinish = () => c.remove();
    }, i * 45);
  }
}

/**
 * Shake horizontal self-contained (WAAPI, pas de CSS requis)
 * @param {HTMLElement} el - Élément à secouer
 * @param {number} duration - Durée ms (défaut 350)
 * @param {number} amplitude - Pixels max (défaut 7)
 */
function shakeEl(el, duration = 350, amplitude = 7) {
  if (!el || !el.animate) return;
  el.animate([
    { transform: 'translateX(0)' },
    { transform: `translateX(-${amplitude}px)`, offset: 0.2 },
    { transform: `translateX(${amplitude}px)`, offset: 0.4 },
    { transform: `translateX(-${amplitude * 0.55}px)`, offset: 0.6 },
    { transform: `translateX(${amplitude * 0.55}px)`, offset: 0.8 },
    { transform: 'translateX(0)' }
  ], { duration, easing: 'ease' });
}

/**
 * Mélange un tableau (Fisher-Yates)
 * @param {Array} array - Tableau à mélanger
 * @returns {Array} Nouveau tableau mélangé
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Tire n éléments aléatoires d'un tableau
 * @param {Array} array - Tableau source
 * @param {number} n - Nombre d'éléments
 * @returns {Array} Nouveau tableau avec n éléments
 */
function pickRandom(array, n) {
  return shuffle(array).slice(0, n);
}

/**
 * Défilé de bus en victoire — buses scroll across screen left→right with klaxon
 * @param {Array} lines - Tableau de lignes { num, color, textColor } à afficher
 *   Si non fourni, utilise LIGNES de data.js
 * @param {Function} [onDone] - Callback appelé quand le défilé est terminé
 */
function busParade(lines, onDone) {
  const pool = (lines && lines.length) ? lines : (typeof LIGNES !== 'undefined' ? shuffle([...LIGNES]) : []);
  if (!pool.length) { if (onDone) onDone(); return; }

  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;';
  document.body.appendChild(container);

  const rows = Math.min(pool.length, 5);
  const rowH = 100 / rows;

  pool.slice(0, rows).forEach((line, i) => {
    const delay = i * 300;
    const duration = 1800 + Math.random() * 400;
    const yPct = rowH * i + rowH * 0.2 + Math.random() * rowH * 0.3;

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `position:absolute;top:${yPct}%;left:-160px;transition:left ${duration}ms linear;`;
    wrapper.innerHTML = typeof busSVG === 'function'
      ? busSVG(line.color, line.textColor, line.num, 120)
      : `<div style="background:${line.color};color:${line.textColor || '#fff'};border-radius:8px;padding:6px 14px;font-weight:900;font-size:1.2rem;">${line.num}</div>`;
    container.appendChild(wrapper);

    setTimeout(() => {
      wrapper.style.left = (window.innerWidth + 160) + 'px';
      sndKlaxon();
    }, delay);

    setTimeout(() => wrapper.remove(), delay + duration + 100);
  });

  const totalDuration = (rows - 1) * 300 + 2400;
  setTimeout(() => {
    container.remove();
    if (onDone) onDone();
  }, totalDuration);
}
