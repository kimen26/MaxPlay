// ─── Game Data ───
// Toutes les lignes de bus et données des mini-jeux
// ⚠️  COULEURS = source de vérité : docs/ratp-colors.json
//     Ne pas modifier ici sans mettre à jour le JSON d'abord.

// Lignes actives dans les jeux (actif: true dans ratp-colors.json)
const LIGNES = [
  // Bus Villejuif / quartier Max
  { num: '162',  color: '#0064B1', textColor: '#fff', name: 'Bus 162' },
  { num: '172',  color: '#008C59', textColor: '#fff', name: 'Bus 172' },
  { num: '185',  color: '#F58443', textColor: '#333', name: 'Bus 185' },  // École Montessori 101
  { num: '380',  color: '#75CE89', textColor: '#333', name: 'Bus 380' },  // Même couleur que V6
  { num: '286',  color: '#C9A2CD', textColor: '#333', name: 'Bus 286' },
  { num: '323',  color: '#CEC92A', textColor: '#333', name: 'Bus 323' },
  { num: '125',  color: '#006EB8', textColor: '#fff', name: 'Bus 125' },
  { num: '131',  color: '#8D653A', textColor: '#fff', name: 'Bus 131' },
  { num: '132',  color: '#652C90', textColor: '#fff', name: 'Bus 132' },  // Même couleur que 2234
  { num: '2234', color: '#652C90', textColor: '#fff', name: 'Bus 2234' }, // Même couleur que 132
  { num: '184',  color: '#DCAC27', textColor: '#333', name: 'Bus 184' },
  { num: '186',  color: '#B43C95', textColor: '#fff', name: 'Bus 186' },
  { num: '47',   color: '#FF82B4', textColor: '#333', name: 'Bus 47' },
  { num: '180',  color: '#9B9839', textColor: '#fff', name: 'Bus 180' },
  // Noctilien
  { num: 'N15',  color: '#000091', textColor: '#fff', name: 'Noctilien N15' }, // Même couleur que N22
  { num: 'N22',  color: '#000091', textColor: '#fff', name: 'Noctilien N22' }, // Même couleur que N15
  // Valouettes (lignes Villejuif locales)
  { num: 'V2',   color: '#E91E63', textColor: '#fff', name: 'Valouette V2' }, // Rose/Magenta
  { num: 'V3',   color: '#FFC107', textColor: '#333', name: 'Valouette V3' }, // Jaune
  { num: 'V4',   color: '#9C27B0', textColor: '#fff', name: 'Valouette V4' }, // Violet
  { num: 'V5',   color: '#006633', textColor: '#fff', name: 'Valouette V5' }, // Vert foncé
  { num: 'V6',   color: '#75CE89', textColor: '#333', name: 'Valouette V6' }, // Même couleur que 380
  { num: 'V7',   color: '#E3051C', textColor: '#fff', name: 'Valouette V7' }, // Rouge Coquelicot – chez Valouette
  // Trams (utilisés dans les trajets de Max – MJ-05)
  { num: 'T7',   color: '#704B1C', textColor: '#fff', name: 'Tram T7' },  // Villejuif ↔ Athis-Mons (brun officiel IDFM)
  // Métros (utilisés dans les trajets de Max – MJ-05)
  { num: 'M6',   color: '#6ECA97', textColor: '#333', name: 'Métro 6' },  // chez mamie → Montparnasse
  { num: 'M7',   color: '#FA9ABA', textColor: '#333', name: 'Métro 7' },  // École + mamie + tata Sarah
];

// Lignes quotidiennes de Max (prioritaires pour les premières questions)
// TVM exclu (cas particulier), V7 = valouette orange, M7 = ligne école + mamie
const LIGNES_QUOTIDIENNES = ['162', '172', '185', 'V7', 'M7'];

// Lignes avec couleur unique (pour MJ-02 - pas d'ambiguïté)
const LIGNES_UNIQUES = LIGNES.filter(l => {
  const sameColor = LIGNES.filter(x => x.color === l.color);
  return sameColor.length === 1;
});

// Détecte les lignes ambiguës (même couleur)
function getLignesAmbigues() {
  const colorMap = {};
  LIGNES.forEach(l => {
    if (!colorMap[l.color]) colorMap[l.color] = [];
    colorMap[l.color].push(l);
  });
  return Object.values(colorMap).filter(group => group.length > 1);
}

// Mots simples pour MJ-04 (Phase 1)
const MOTS_SIMPLE = [
  { word: 'MAX',       sylls: ['MAX'] },
  { word: 'PAPA',      sylls: ['PA', 'PA'] },
  { word: 'MAMAN',     sylls: ['MA', 'MAN'] },
  { word: 'BUS',       sylls: ['BUS'] },
  { word: 'YANN',      sylls: ['YANN'] },
  { word: 'CLAUDIA',   sylls: ['CLAU', 'DIA'] },
  { word: 'VALOUETTE', sylls: ['VA', 'LOU', 'ETTE'] },
  { word: 'METRO',     sylls: ['ME', 'TRO'] },
  { word: 'TRAM',      sylls: ['TRAM'] },
  { word: 'POLICE',    sylls: ['PO', 'LICE'] },
  { word: 'POMPIER',   sylls: ['POM', 'PIER'] },
  { word: 'CACA',      sylls: ['CA', 'CA'] },
];

// Arrêts pour MJ-04 (Phase 2) - lignes 185 et M7
const ARRETS_185_M7 = [
  { name: 'Villejuif',      sylls: ['Vil', 'le', 'juif'] },
  { name: 'Louis Aragon',   sylls: ['Lou', 'is', 'A', 'ra', 'gon'] },
  { name: 'Kremlin',        sylls: ['Krem', 'lin'] },
  { name: 'Bicêtre',        sylls: ['Bi', 'cê', 'tre'] },
  { name: 'Italie',         sylls: ['I', 'ta', 'lie'] },
  { name: 'Barbusse',       sylls: ['Bar', 'bus', 'se'] },
  { name: 'Jaurès',         sylls: ['Jau', 'rès'] },
  { name: 'Glacière',       sylls: ['Gla', 'ciè', 're'] },
  { name: 'Corvisart',      sylls: ['Cor', 'vi', 'sart'] },
  { name: 'Denfert',        sylls: ['Den', 'fert'] },
  { name: 'Raspail',        sylls: ['Ras', 'pail'] },
  { name: 'Montparnasse',   sylls: ['Mont', 'par', 'nas', 'se'] },
];

// Destinations pour MJ-05
const DESTINATIONS = [
  { 
    name: 'École Montessori 101', 
    lignes: ['185', 'M7'],
    icon: '🏫',
    contexte: 'Trajet quotidien'
  },
  { 
    name: 'Chez Valouette (marché/piscine)', 
    lignes: ['V7'],
    icon: '🏠',
    contexte: 'Surnom affectif'
  },
  { 
    name: 'Chez mamie → Gare Montparnasse', 
    lignes: ['M7', 'M6'],
    icon: '👵',
    contexte: 'M7 puis M6'
  },
  { 
    name: 'Gare de l\'Est (tata Sarah)', 
    lignes: ['M7'],
    icon: '🚆',
    contexte: 'Trajet vers Strasbourg'
  },
  { 
    name: 'Direction Clamart / Maison Blanche', 
    lignes: ['162'],
    icon: '🏘️',
    contexte: '162 direction sud'
  },
];

// Emojis de personnages pour MJ-03
const PERSONNAGES = ['🧑', '👦', '👧', '👴', '👵', '🧙', '🏴‍☠️', '👑', '🏹', '⚔️'];

// ─── TTS : nom lisible d'une ligne ───
// Règles : M7 → "Métro 7", T9 → "Tram 9", N15 → "Noctilien 15",
//          V6/V7 → "Valouette V6/V7", TVM → "TVM", bus → "Bus 162"
function getLineDisplayName(num) {
  if (num === 'TVM') return 'TVM';
  if (num.startsWith('M') && /^\d/.test(num.substring(1))) return 'Métro ' + num.substring(1);
  if (num.startsWith('T') && /^\d/.test(num.substring(1))) return 'Tram ' + num.substring(1);
  if (num.startsWith('N') && /^\d/.test(num.substring(1))) return 'Noctilien ' + num.substring(1);
  if (num.startsWith('V')) return 'Valouette ' + num;
  return 'Bus ' + num;
}
