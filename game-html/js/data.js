// ─── Game Data ───
// Toutes les lignes de bus et données des mini-jeux

// Lignes de bus IDFM (couleurs officielles)
const LIGNES = [
  { num: '162',  color: '#0064B1', textColor: '#fff', name: 'Bleu RATP' },
  { num: '172',  color: '#008C59', textColor: '#fff', name: 'Vert' },
  { num: '185',  color: '#F58443', textColor: '#333', name: 'Orange' },
  { num: '380',  color: '#75CE89', textColor: '#333', name: 'Vert clair' },
  { num: 'V6',   color: '#75CE89', textColor: '#333', name: 'Vert clair' },  // Même couleur que 380
  { num: '286',  color: '#C9A2CD', textColor: '#333', name: 'Lilas' },
  { num: '323',  color: '#CEC92A', textColor: '#333', name: 'Jaune-vert' },
  { num: '125',  color: '#006EB8', textColor: '#fff', name: 'Bleu' },
  { num: '131',  color: '#8D653A', textColor: '#fff', name: 'Brun' },
  { num: '132',  color: '#652C90', textColor: '#fff', name: 'Violet' },
  { num: '2234', color: '#652C90', textColor: '#fff', name: 'Violet' },  // Même couleur que 132
  { num: '184',  color: '#DCAC27', textColor: '#333', name: 'Jaune-or' },
  { num: '186',  color: '#B43C95', textColor: '#fff', name: 'Rose-violet' },
  { num: '47',   color: '#FF82B4', textColor: '#333', name: 'Rose' },
  { num: '180',  color: '#9B9839', textColor: '#fff', name: 'Olive' },
  { num: 'N15',  color: '#000091', textColor: '#fff', name: 'Bleu nuit' },
  { num: 'N22',  color: '#000091', textColor: '#fff', name: 'Bleu nuit' },  // Même couleur que N15
  { num: 'V7',   color: '#E2001A', textColor: '#fff', name: 'Rouge' },
  { num: 'TVM',  color: '#216EB4', textColor: '#fff', name: 'Bleu TVM' },
];

// Lignes quotidiennes de Max (prioritaires)
const LIGNES_QUOTIDIENNES = ['162', '172', '185', 'V7', 'TVM'];

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
