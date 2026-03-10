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
