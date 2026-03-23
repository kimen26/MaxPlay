// ─── Bibliothèque Dinosaures ───
// API :
//   DINOS        → array de 10 dinos
//   png présent  → utiliser <img src="img/dinos/{png}"> (assets OpenGameArt CC0)
//   emoji présent → utiliser l'emoji Unicode
//   sinon         → dinoSVG(id, size)
//   dinoSVG(id, size) → SVG string ou null
//   drawDinoPixel(ctx, x, y, ps, frame) → pixel-art T-Rex pour le mini-jeu

const DINOS = [
  {
    id: 'trex',
    name: 'T-Rex',
    full: 'Tyrannosaurus Rex',
    epoque: 'Crétacé · 66 M ans',
    regime: '🥩 Carnivore',
    taille: '12 m de long',
    fait: 'Ses dents mesuraient 20 cm — plus longues que ta main !',
    png: 'T-Rex.png',
    color: '#4a8a4a',
    textColor: '#fff',
  },
  {
    id: 'apato',
    name: 'Apatosaure',
    full: 'Apatosaurus ajax',
    epoque: 'Jurassique · 150 M ans',
    regime: '🥗 Herbivore',
    taille: '23 m de long',
    fait: 'Son cou mesurait 6 m — il pouvait manger les feuilles tout en haut des arbres !',
    png: 'Apatosaurus.png',
    color: '#4a7a8a',
    textColor: '#fff',
  },
  {
    id: 'tricera',
    name: 'Tricératops',
    full: 'Triceratops horridus',
    epoque: 'Crétacé · 68 M ans',
    regime: '🥗 Herbivore',
    taille: '9 m de long',
    fait: 'Ses 3 cornes servaient à se défendre du T-Rex !',
    png: 'Triceratops.png',
    color: '#c07820',
    textColor: '#fff',
  },
  {
    id: 'stego',
    name: 'Stégosaure',
    full: 'Stegosaurus ungulatus',
    epoque: 'Jurassique · 155 M ans',
    regime: '🥗 Herbivore',
    taille: '9 m de long',
    fait: 'Les plaques sur son dos lui servaient à réguler sa température !',
    png: 'Stegosaurs.png',
    color: '#6a8a3a',
    textColor: '#fff',
  },
  {
    id: 'ptero',
    name: 'Ptérodactyle',
    full: 'Pteranodon longiceps',
    epoque: 'Crétacé · 85 M ans',
    regime: '🐟 Piscivore',
    taille: '7 m d\'envergure',
    fait: 'Pas un vrai dino — c\'était un reptile volant ! Sa crête guidait son vol.',
    png: 'Pterodactyl.png',
    color: '#7a4a9a',
    textColor: '#fff',
  },
  {
    id: 'velo',
    name: 'Vélociraptor',
    full: 'Velociraptor mongoliensis',
    epoque: 'Crétacé · 75 M ans',
    regime: '🥩 Carnivore',
    taille: '2 m de long',
    fait: 'Moins gros qu\'un chien, mais ultra-rapide et super malin !',
    png: 'Raptor.png',
    color: '#c06030',
    textColor: '#fff',
  },
  {
    id: 'ankylo',
    name: 'Ankylosaure',
    full: 'Ankylosaurus magniventris',
    epoque: 'Crétacé · 66 M ans',
    regime: '🥗 Herbivore',
    taille: '10 m de long',
    fait: 'Son dos était recouvert d\'une armure osseuse — le char d\'assaut des dinos !',
    emoji: null,
    color: '#6a6a6a',
    textColor: '#fff',
  },
  {
    id: 'spino',
    name: 'Spinosaure',
    full: 'Spinosaurus aegyptiacus',
    epoque: 'Crétacé · 95 M ans',
    regime: '🐟 Piscivore',
    taille: '14 m de long',
    fait: 'Plus grand que le T-Rex ! Il adorait nager pour attraper des poissons.',
    emoji: null,
    color: '#3a5a8a',
    textColor: '#fff',
  },
  {
    id: 'diplo',
    name: 'Diplodocus',
    full: 'Diplodocus longus',
    epoque: 'Jurassique · 150 M ans',
    regime: '🥗 Herbivore',
    taille: '27 m de long',
    fait: 'Sa queue faisait un bruit de fouet en claquant — BOOM !',
    emoji: null,
    color: '#7a8a4a',
    textColor: '#fff',
  },
  {
    id: 'para',
    name: 'Parasaurolophus',
    full: 'Parasaurolophus walkeri',
    epoque: 'Crétacé · 76 M ans',
    regime: '🥗 Herbivore',
    taille: '10 m de long',
    fait: 'Sa crête faisait office de klaxon — il poussait des cris très forts !',
    emoji: null,
    color: '#8a3a3a',
    textColor: '#fff',
  },
];

/* ─── SVGs ─── */

function _svgTricera(w) {
  return `<svg viewBox="0 0 120 85" width="${w}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="52" cy="55" rx="30" ry="22" fill="#c07820"/>
    <ellipse cx="76" cy="40" rx="18" ry="16" fill="#c07820" opacity="0.8"/>
    <ellipse cx="90" cy="50" rx="16" ry="12" fill="#c07820"/>
    <polygon points="80,26 76,6 86,24" fill="#8b5010"/>
    <polygon points="94,28 92,8 102,26" fill="#8b5010"/>
    <polygon points="104,46 120,42 106,52" fill="#8b5010"/>
    <circle cx="96" cy="44" r="3.5" fill="white"/><circle cx="97" cy="44" r="2" fill="#111"/>
    <rect x="30" y="72" width="10" height="14" rx="4" fill="#a06010"/>
    <rect x="46" y="72" width="10" height="14" rx="4" fill="#a06010"/>
    <rect x="62" y="72" width="10" height="14" rx="4" fill="#a06010"/>
    <rect x="76" y="72" width="10" height="14" rx="4" fill="#a06010"/>
    <path d="M22,62 Q8,70 6,80 Q18,70 24,64" fill="#a06010"/>
  </svg>`;
}

function _svgStego(w) {
  return `<svg viewBox="0 0 130 85" width="${w}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="58" cy="58" rx="36" ry="22" fill="#6a8a3a"/>
    <ellipse cx="96" cy="56" rx="16" ry="12" fill="#6a8a3a"/>
    <circle cx="104" cy="50" r="3" fill="white"/><circle cx="105" cy="50" r="2" fill="#111"/>
    <polygon points="38,38 32,14 46,36" fill="#4a6a2a"/>
    <polygon points="52,32 48,8 62,30" fill="#4a6a2a"/>
    <polygon points="66,30 64,6 76,28" fill="#4a6a2a"/>
    <polygon points="78,34 78,12 88,32" fill="#4a6a2a"/>
    <polygon points="24,56 14,58 20,64 28,60" fill="#8a5a2a"/>
    <polygon points="26,62 16,66 22,70 30,66" fill="#8a5a2a"/>
    <rect x="36" y="74" width="10" height="14" rx="4" fill="#4a6a2a"/>
    <rect x="54" y="74" width="10" height="14" rx="4" fill="#4a6a2a"/>
    <rect x="70" y="74" width="10" height="14" rx="4" fill="#4a6a2a"/>
    <rect x="84" y="74" width="10" height="14" rx="4" fill="#4a6a2a"/>
  </svg>`;
}

function _svgPtero(w) {
  return `<svg viewBox="0 0 130 80" width="${w}" xmlns="http://www.w3.org/2000/svg">
    <path d="M65,40 Q20,20 0,10 Q30,18 58,36" fill="#7a4a9a"/>
    <path d="M65,40 Q110,20 130,10 Q100,18 70,36" fill="#7a4a9a"/>
    <path d="M65,40 Q30,50 10,70 Q36,54 62,44" fill="#5a3a7a"/>
    <path d="M65,40 Q100,50 118,70 Q94,54 68,44" fill="#5a3a7a"/>
    <ellipse cx="65" cy="40" rx="12" ry="10" fill="#7a4a9a"/>
    <path d="M72,34 Q86,28 90,32 Q82,36 72,38" fill="#5a3a7a"/>
    <path d="M72,38 Q84,38 88,42 Q80,44 72,42" fill="#5a3a7a"/>
    <circle cx="76" cy="34" r="3" fill="white"/><circle cx="77" cy="34" r="2" fill="#111"/>
    <rect x="62" y="48" width="6" height="12" rx="3" fill="#5a3a7a"/>
    <path d="M59,58 L54,64 M68,58 L72,64" stroke="#5a3a7a" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

function _svgVelo(w) {
  return `<svg viewBox="0 0 90 100" width="${w}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="60" rx="20" ry="26" fill="#c06030"/>
    <ellipse cx="52" cy="40" rx="14" ry="18" fill="#c06030"/>
    <path d="M46,20 Q62,16 72,24 Q76,32 68,40 Q58,44 46,40 Q40,34 46,20" fill="#c06030"/>
    <path d="M48,38 Q64,42 70,40 Q72,46 68,50 Q58,52 48,48 Z" fill="#a04020"/>
    <circle cx="64" cy="26" r="3.5" fill="white"/><circle cx="65" cy="26" r="2" fill="#111"/>
    <path d="M54,52 L46,58 L42,62 M46,58 L48,64" stroke="#a04020" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M44,56 L38,50 L34,46 M38,50 L34,52" stroke="#a04020" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <rect x="28" y="82" width="13" height="20" rx="5" fill="#a04020"/>
    <rect x="44" y="80" width="13" height="22" rx="5" fill="#a04020"/>
    <path d="M22,72 Q10,82 12,90 Q20,80 26,74" fill="#a04020"/>
    <path d="M28,100 Q24,103 20,102 M36,100 Q34,104 38,105" stroke="#8a3010" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`;
}

function _svgAnkylo(w) {
  return `<svg viewBox="0 0 140 80" width="${w}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="65" cy="55" rx="44" ry="24" fill="#6a6a6a"/>
    <ellipse cx="65" cy="45" rx="40" ry="18" fill="#888"/>
    <ellipse cx="96" cy="52" rx="14" ry="10" fill="#6a6a6a"/>
    <circle cx="102" cy="48" r="3" fill="white"/><circle cx="103" cy="48" r="2" fill="#111"/>
    <circle cx="40" cy="36" r="5" fill="#555"/><circle cx="52" cy="30" r="5" fill="#555"/>
    <circle cx="65" cy="28" r="5" fill="#555"/><circle cx="78" cy="30" r="5" fill="#555"/>
    <circle cx="88" cy="36" r="4" fill="#555"/>
    <path d="M118,52 Q126,48 132,50 Q128,56 134,60 Q126,58 118,54" fill="#666"/>
    <path d="M122,48 L130,42 M122,56 L132,62" stroke="#555" stroke-width="4" stroke-linecap="round"/>
    <rect x="30" y="72" width="12" height="12" rx="4" fill="#555"/>
    <rect x="50" y="74" width="12" height="10" rx="4" fill="#555"/>
    <rect x="72" y="74" width="12" height="10" rx="4" fill="#555"/>
    <rect x="90" y="72" width="12" height="12" rx="4" fill="#555"/>
    <path d="M20,62 Q8,68 6,76 Q18,68 22,64" fill="#555"/>
  </svg>`;
}

function _svgSpino(w) {
  return `<svg viewBox="0 0 90 110" width="${w}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="42" cy="68" rx="22" ry="28" fill="#3a5a8a"/>
    <path d="M20,64 Q8,78 10,90 Q18,78 24,68" fill="#3a5a8a"/>
    <ellipse cx="52" cy="44" rx="14" ry="18" fill="#3a5a8a"/>
    <path d="M42,20 Q62,16 74,26 Q80,36 72,46 Q62,52 46,48 Q38,40 42,20" fill="#3a5a8a"/>
    <path d="M46,46 Q64,50 72,46 Q74,54 68,58 Q58,60 46,56 Z" fill="#2a4a7a"/>
    <circle cx="66" cy="26" r="4" fill="white"/><circle cx="67" cy="26" r="2.5" fill="#111"/>
    <path d="M38,28 L34,18 M44,24 L42,12 M50,22 L50,10 M56,24 L58,12 M62,28 L66,18"
          stroke="#2a4a7a" stroke-width="4" stroke-linecap="round"/>
    <rect x="28" y="90" width="14" height="22" rx="5" fill="#2a4a7a"/>
    <rect x="46" y="88" width="14" height="24" rx="5" fill="#2a4a7a"/>
    <rect x="50" y="56" width="8" height="4" rx="2" fill="#2a4a7a"/>
  </svg>`;
}

function _svgDiplo(w) {
  return `<svg viewBox="0 0 160 80" width="${w}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="58" rx="46" ry="18" fill="#7a8a4a"/>
    <path d="M110,50 Q120,30 124,16 Q122,10 118,8 Q112,10 116,24 Q112,40 108,52" fill="#7a8a4a"/>
    <ellipse cx="118" cy="8" rx="8" ry="6" fill="#7a8a4a"/>
    <circle cx="122" cy="6" r="2.5" fill="white"/><circle cx="123" cy="6" r="1.5" fill="#111"/>
    <path d="M34,58 Q20,62 8,72 Q22,66 36,62" fill="#6a7a3a"/>
    <path d="M8,72 Q2,76 4,80 Q10,76 10,72" fill="#5a6a2a"/>
    <rect x="52" y="72" width="11" height="12" rx="4" fill="#6a7a3a"/>
    <rect x="68" y="72" width="11" height="12" rx="4" fill="#6a7a3a"/>
    <rect x="84" y="72" width="11" height="12" rx="4" fill="#6a7a3a"/>
    <rect x="100" y="72" width="11" height="12" rx="4" fill="#6a7a3a"/>
  </svg>`;
}

function _svgPara(w) {
  return `<svg viewBox="0 0 110 90" width="${w}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="52" cy="60" rx="30" ry="22" fill="#8a3a3a"/>
    <ellipse cx="76" cy="48" rx="16" ry="20" fill="#8a3a3a"/>
    <ellipse cx="84" cy="50" rx="14" ry="12" fill="#8a3a3a"/>
    <path d="M80,32 Q86,16 92,10 Q82,14 78,28" fill="#6a2a2a"/>
    <path d="M86,34 Q90,20 98,14 Q88,18 84,32" fill="#7a3030"/>
    <ellipse cx="90" cy="55" rx="12" ry="8" fill="#6a2a2a"/>
    <circle cx="96" cy="46" r="3.5" fill="white"/><circle cx="97" cy="46" r="2" fill="#111"/>
    <path d="M96,62 Q102,66 98,70 Q94,66 94,62" fill="#6a2a2a"/>
    <rect x="32" y="76" width="11" height="14" rx="4" fill="#6a2a2a"/>
    <rect x="48" y="76" width="11" height="14" rx="4" fill="#6a2a2a"/>
    <rect x="64" y="76" width="11" height="14" rx="4" fill="#6a2a2a"/>
    <rect x="78" y="76" width="11" height="14" rx="4" fill="#6a2a2a"/>
    <path d="M22,66 Q8,74 6,84 Q18,74 24,68" fill="#6a2a2a"/>
  </svg>`;
}

/**
 * Retourne le SVG d'un dino par id et taille.
 * Retourne null pour les dinos qui utilisent un emoji (trex, brachio).
 */
function dinoSVG(id, size = 100) {
  switch (id) {
    case 'tricera': return _svgTricera(size);
    case 'stego':   return _svgStego(size);
    case 'ptero':   return _svgPtero(size);
    case 'velo':    return _svgVelo(size);
    case 'ankylo':  return _svgAnkylo(size);
    case 'spino':   return _svgSpino(size);
    case 'diplo':   return _svgDiplo(size);
    case 'para':    return _svgPara(size);
    default: return null;
  }
}

/* ─── T-Rex pixel art pour le mini-jeu ─── */
// Grille 14×16, 2 frames de marche + 1 frame de saut
// X = pixel rempli, . = vide, O = œil (blanc)
const DINO_PIXEL_WALK_0 = [
  '......XXXXX.',
  '.....XXXXXXX',
  '....XXXXXXXX',
  '...XXXXXXXXX',
  '...XXXXXXXOX',
  '...XXXXXXXX.',
  '..XXXXXXXXX.',
  '.XXXXXXXXXX.',
  '..XXXXXXXXX.',
  '...XXXXXXX..',
  '....XXXXXX..',
  '....XX..XX..',
  '....XXX.XX..',
  '...XXXX.XXX.',
  '..XXXXX.XXX.',
  '.XXXXX..XXX.',
];
const DINO_PIXEL_WALK_1 = [
  '......XXXXX.',
  '.....XXXXXXX',
  '....XXXXXXXX',
  '...XXXXXXXXX',
  '...XXXXXXXOX',
  '...XXXXXXXX.',
  '..XXXXXXXXX.',
  '.XXXXXXXXXX.',
  '..XXXXXXXXX.',
  '...XXXXXXX..',
  '....XXXXXX..',
  '....XX..XX..',
  '....XX.XXX..',
  '...XXX.XXXX.',
  '..XXX..XXXXX',
  '.XXX...XXXXX',
];
const DINO_PIXEL_JUMP = [
  '......XXXXX.',
  '.....XXXXXXX',
  '....XXXXXXXX',
  '...XXXXXXXXX',
  '...XXXXXXXOX',
  '...XXXXXXXX.',
  '..XXXXXXXXX.',
  '.XXXXXXXXXX.',
  '..XXXXXXXXX.',
  '...XXXXXXX..',
  '....XXXXXX..',
  '....XXXXX...',
  '...XXXXX....',
  '..XX..XXX...',
  '.XX....XXX..',
  'XX......XXX.',
];

/**
 * Dessine le T-Rex pixel-art sur un Canvas 2D.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x, y - position du coin supérieur gauche
 * @param {number} ps   - taille d'un pixel (ex: 4)
 * @param {number} frame - 0, 1 (marche) ou 2 (saut)
 * @param {string} color - couleur du dino
 */
function drawDinoPixel(ctx, x, y, ps, frame, color = '#333') {
  const grids = [DINO_PIXEL_WALK_0, DINO_PIXEL_WALK_1, DINO_PIXEL_JUMP];
  const grid = grids[frame] || grids[0];
  grid.forEach((row, gy) => {
    [...row].forEach((px, gx) => {
      if (px === 'X') {
        ctx.fillStyle = color;
        ctx.fillRect(x + gx * ps, y + gy * ps, ps, ps);
      } else if (px === 'O') {
        ctx.fillStyle = 'white';
        ctx.fillRect(x + gx * ps, y + gy * ps, ps, ps);
      }
    });
  });
}
