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
