// ─── Bus SVG Utilities ───
//
// RÈGLE ABSOLUE (non-négociable) :
//   Le bus a UN seul modèle visuel. La carrosserie est TOUJOURS turquoise RATP.
//   Seuls 2 éléments varient selon la ligne :
//     1. La couleur de fond de la fenêtre destination (rect x="84")
//     2. Le numéro affiché dans cette fenêtre
//   RIEN d'autre ne change jamais.
//
// API :
//   busSVG(color, textColor, num, width)         → bus normal, numéro visible
//   busSVGHiddenNum(color, textColor, num, width) → bus MJ-02, numéro caché
//   revealBusNumber(container)                   → révèle le numéro (MJ-02)
//   colorDistance(hex1, hex2)                    → distance colorimétrique RGB
//   selectDistinctColors(pool, n, minDist)       → sélection anti-doublons

// Couleur fixe de la carrosserie — turquoise RATP standard
const BUS_BODY_COLOR = '#1abc9c';

/**
 * Génère le SVG du bus.
 * @param {string} color      - Couleur de fond de la fenêtre destination (ex: '#E2001A')
 * @param {string} textColor  - Couleur du numéro dans la fenêtre (ex: '#fff')
 * @param {string} num        - Numéro de ligne (ex: '162')
 * @param {number} width      - Largeur en pixels
 * @returns {string} SVG string
 */
function busSVG(color, textColor, num, width = 200) {
  return _busSVGTemplate(color, textColor, num, width, false);
}

/**
 * Génère un SVG de bus avec numéro masqué (pour MJ-02).
 * Même rendu que busSVG, mais le numéro est opacity="0".
 * Appeler revealBusNumber() pour le révéler après réponse.
 */
function busSVGHiddenNum(color, textColor, num, width = 200) {
  return _busSVGTemplate(color, textColor, num, width, true);
}

/**
 * Fonction interne commune — NE PAS appeler directement.
 * Toute la définition visuelle du bus est ici et nulle part ailleurs.
 */
function _busSVGTemplate(destColor, textColor, num, width, hidden) {
  const body = BUS_BODY_COLOR; // carrosserie toujours identique
  const numOpacity = hidden ? '0' : '1';
  const numClass = hidden ? 'class="num-text"' : '';
  return `<svg viewBox="0 0 160 80" width="${width}" class="bus-svg" xmlns="http://www.w3.org/2000/svg">
  <!-- Carrosserie — couleur fixe turquoise RATP -->
  <rect x="5" y="10" width="150" height="45" rx="4" fill="${body}"/>
  <!-- Bas de caisse -->
  <rect x="5" y="40" width="150" height="15" fill="#ecf0f1"/>
  <rect x="5" y="48" width="150" height="6" fill="#7f8c8d"/>
  <!-- Séparateurs verticaux -->
  <rect x="62" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="70" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="130" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="138" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <!-- Contour carrosserie -->
  <rect x="5" y="10" width="150" height="45" rx="4" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Fenêtres passagers -->
  <rect x="10" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="36" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <!-- Fenêtre destination — couleur de la ligne -->
  <rect x="84" y="14" width="40" height="21" fill="${destColor}" stroke="#111" stroke-width="1.5"/>
  <!-- Fenêtre mini droite -->
  <rect x="150.5" y="14" width="5" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1"/>
  <!-- Numéro dans la fenêtre destination -->
  <text ${numClass} x="104" y="24.5" font-family="Arial,sans-serif" font-size="13" font-weight="bold"
        fill="${textColor}" text-anchor="middle" dominant-baseline="central" opacity="${numOpacity}">${num}</text>
  <!-- Rétroviseur -->
  <line x1="149" y1="24" x2="155" y2="24" stroke="#111" stroke-width="2" stroke-linecap="round"/>
  <rect x="152" y="20" width="6" height="10" rx="1" fill="#111"/>
  <!-- Roues -->
  <circle cx="45" cy="54" r="10" fill="#333" stroke="#111" stroke-width="2"/>
  <circle cx="45" cy="54" r="6" fill="#666"/>
  <circle cx="45" cy="54" r="2" fill="#111"/>
  <circle cx="115" cy="54" r="10" fill="#333" stroke="#111" stroke-width="2"/>
  <circle cx="115" cy="54" r="6" fill="#666"/>
  <circle cx="115" cy="54" r="2" fill="#111"/>
  <!-- Feux -->
  <rect x="5" y="48" width="4" height="5" fill="#FF4444"/>
  <rect x="151" y="48" width="4" height="5" fill="#FFCC00"/>
  </svg>`;
}

/**
 * Révèle le numéro sur un bus MJ-02 (animation fade-in).
 * @param {HTMLElement} container - Élément contenant le SVG
 */
function revealBusNumber(container) {
  const svg = container.querySelector('svg');
  if (!svg) return;
  const text = svg.querySelector('.num-text');
  if (text) {
    text.style.transition = 'opacity 0.4s';
    requestAnimationFrame(() => { text.style.opacity = '1'; });
  }
}

/**
 * Distance colorimétrique euclidienne RGB entre deux couleurs hex.
 * @param {string} hex1  ex: '#E2001A'
 * @param {string} hex2  ex: '#0064B1'
 * @returns {number} 0 = identique, ~441 = maximum
 */
function colorDistance(hex1, hex2) {
  const parse = h => {
    const c = h.replace('#', '');
    return [parseInt(c.slice(0,2),16), parseInt(c.slice(2,4),16), parseInt(c.slice(4,6),16)];
  };
  const [r1,g1,b1] = parse(hex1);
  const [r2,g2,b2] = parse(hex2);
  return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);
}

/**
 * Sélectionne N lignes depuis un pool en évitant les couleurs trop proches.
 * @param {Array}  pool    - Lignes {color, ...}
 * @param {number} n       - Nombre à sélectionner
 * @param {number} minDist - Distance minimum (défaut 80)
 * @returns {Array}
 */
function selectDistinctColors(pool, n, minDist = 80) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const selected = [];
  for (const candidate of shuffled) {
    if (selected.length >= n) break;
    const tooClose = selected.some(s => colorDistance(s.color, candidate.color) < minDist);
    if (!tooClose) selected.push(candidate);
  }
  // Fallback : seuil réduit si pas assez de candidats distincts
  if (selected.length < n) {
    for (const candidate of shuffled) {
      if (selected.length >= n) break;
      if (!selected.includes(candidate)) selected.push(candidate);
    }
  }
  return selected;
}
