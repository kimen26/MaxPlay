// ─── Bus SVG Utilities ───
// Génère des SVG de bus dynamiques avec couleur et numéro variables

/**
 * Génère un SVG de bus (vue latérale)
 * @param {string} color - Couleur hex (ex: '#0064B1')
 * @param {string} textColor - Couleur du texte (ex: '#fff')
 * @param {string} num - Numéro de ligne (ex: '162')
 * @param {number} width - Largeur en pixels
 * @returns {string} SVG en string
 */
function busSVG(color, textColor, num, width = 200) {
  return `<svg viewBox="0 0 160 80" width="${width}" class="bus-svg" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="10" width="150" height="45" rx="4" fill="#1abc9c"/>
  <rect x="5" y="40" width="150" height="15" fill="#ecf0f1"/>
  <rect x="5" y="48" width="150" height="6" fill="#7f8c8d"/>
  <rect x="62" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="70" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="130" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="138" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="5" y="10" width="150" height="45" rx="4" fill="none" stroke="#111" stroke-width="2"/>
  <rect x="10" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="36" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="84" y="14" width="40" height="21" fill="${color}" stroke="#111" stroke-width="1.5"/>
  <rect x="150.5" y="14" width="5" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1"/>
  <text x="104" y="29" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="${textColor}" text-anchor="middle">${num}</text>
  <line x1="149" y1="24" x2="155" y2="24" stroke="#111" stroke-width="2" stroke-linecap="round"/>
  <rect x="152" y="20" width="6" height="10" rx="1" fill="#111"/>
  <circle cx="45" cy="54" r="10" fill="#333" stroke="#111" stroke-width="2"/>
  <circle cx="45" cy="54" r="6" fill="#666"/>
  <circle cx="45" cy="54" r="2" fill="#111"/>
  <circle cx="115" cy="54" r="10" fill="#333" stroke="#111" stroke-width="2"/>
  <circle cx="115" cy="54" r="6" fill="#666"/>
  <circle cx="115" cy="54" r="2" fill="#111"/>
  <rect x="5" y="48" width="4" height="5" fill="#FF4444"/>
  <rect x="151" y="48" width="4" height="5" fill="#FFCC00"/>
  </svg>`;
}

/**
 * Génère un SVG de bus avec numéro masqué (pour MJ-02)
 * @param {string} color - Couleur hex
 * @param {string} textColor - Couleur du texte
 * @param {string} num - Numéro de ligne (sera caché)
 * @param {number} width - Largeur en pixels
 * @returns {string} SVG en string
 */
function busSVGHiddenNum(color, textColor, num, width = 200) {
  return `<svg viewBox="0 0 160 80" width="${width}" class="bus-svg" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="10" width="150" height="45" rx="4" fill="#1abc9c"/>
  <rect x="5" y="40" width="150" height="15" fill="#ecf0f1"/>
  <rect x="5" y="48" width="150" height="6" fill="#7f8c8d"/>
  <rect x="62" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="70" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="130" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="138" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="5" y="10" width="150" height="45" rx="4" fill="none" stroke="#111" stroke-width="2"/>
  <rect x="10" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="36" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="84" y="14" width="40" height="21" fill="${color}" stroke="#111" stroke-width="1.5"/>
  <rect x="150.5" y="14" width="5" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1"/>
  <!-- Numéro masqué -->
  <rect x="86" y="16" width="36" height="17" fill="#fff" stroke="#111" stroke-width="1"/>
  <text x="104" y="29" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="${textColor}" text-anchor="middle" opacity="0">${num}</text>
  <line x1="149" y1="24" x2="155" y2="24" stroke="#111" stroke-width="2" stroke-linecap="round"/>
  <rect x="152" y="20" width="6" height="10" rx="1" fill="#111"/>
  <circle cx="45" cy="54" r="10" fill="#333" stroke="#111" stroke-width="2"/>
  <circle cx="45" cy="54" r="6" fill="#666"/>
  <circle cx="45" cy="54" r="2" fill="#111"/>
  <circle cx="115" cy="54" r="10" fill="#333" stroke="#111" stroke-width="2"/>
  <circle cx="115" cy="54" r="6" fill="#666"/>
  <circle cx="115" cy="54" r="2" fill="#111"/>
  <rect x="5" y="48" width="4" height="5" fill="#FF4444"/>
  <rect x="151" y="48" width="4" height="5" fill="#FFCC00"/>
  </svg>`;
}

/**
 * Révèle le numéro sur un SVG de bus (animation simple)
 * @param {HTMLElement} container - Élément contenant le SVG
 * @param {string} num - Numéro à afficher
 */
function revealBusNumber(container, num) {
  const svg = container.querySelector('svg');
  if (!svg) return;
  
  // Créer un élément texte qui apparaît
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', '104');
  text.setAttribute('y', '29');
  text.setAttribute('font-family', 'Arial,sans-serif');
  text.setAttribute('font-size', '14');
  text.setAttribute('font-weight', 'bold');
  text.setAttribute('fill', '#333');
  text.setAttribute('text-anchor', 'middle');
  text.textContent = num;
  text.style.opacity = '0';
  text.style.transition = 'opacity 0.3s';
  
  svg.appendChild(text);
  
  // Animer
  requestAnimationFrame(() => {
    text.style.opacity = '1';
  });
}
