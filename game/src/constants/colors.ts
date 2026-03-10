// Palette des lignes de bus de Max – couleurs officielles IDFM Villejuif
// Source : docs/MAX_PROFILE.md – couleurs validées par l'utilisateur
export const BUS_LINE_COLORS: Record<string, number> = {
  '162':  0x0064B1, // Bleu RATP
  '172':  0x008C59, // Vert
  '185':  0xF58443, // Orange – ligne école
  '380':  0x75CE89, // Vert clair
  '286':  0xC9A2CD, // Lilas
  '323':  0xCEC92A, // Jaune-vert
  '125':  0x006EB8, // Bleu
  '131':  0x8D653A, // Brun
  '132':  0x652C90, // Violet
  'V7':   0xE2001A, // Rouge (à confirmer)
  'V6':   0x75CE89, // Vert clair
  '186':  0xB43C95, // Rose-violet
  '47':   0xFF82B4, // Rose
  '180':  0x9B9839, // Olive
  '184':  0xDCAC27, // Jaune-or
  '2234': 0x652C90, // Violet – ligne Marriott Marne-la-Vallée
  'N15':  0x000091, // Nuit – bleu marine
  'N22':  0x000091, // Nuit – bleu marine
  'TVM':  0x216EB4, // Trans-Val-de-Marne
};

// Palette UI
export const UI_COLORS = {
  BACKGROUND:        0xFFFDE7,
  PANEL:             0xFFFFFF,
  PANEL_SECONDARY:   0xF5F5F5,
  BUTTON_PRIMARY:    0x4CAF50,
  BUTTON_INFO:       0x2196F3,
  BUTTON_NEUTRAL:    0xFF9800,
  TEXT_PRIMARY:      0x1A1A1A,
  TEXT_SECONDARY:    0x555555,
  SUCCESS:           0x4CAF50,
  TRY_AGAIN:         0xFF9800,
} as const;

// Syllabes colorées (alternance pour la lecture)
export const SYLLABLE_COLORS = ['#2196F3', '#FF6B00'];
