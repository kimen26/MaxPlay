// Dimensions de référence
export const GAME_WIDTH = 1024;
export const GAME_HEIGHT = 768;

// Tailles minimales pour l'accessibilité enfant
export const MIN_TAP_SIZE = 80;
export const MIN_TAP_SPACING = 20;

// Durées d'animation (ms)
export const ANIM = {
  MICRO:    150,
  NORMAL:   300,
  LARGE:    500,
  IDLE:    2000,
} as const;

// Feedback
export const FEEDBACK = {
  SUCCESS_SCALE:    1.2,  // scale peak lors d'un succès
  TAP_SCALE:        0.95, // compression au tap
  FEEDBACK_DELAY:   200,  // ms avant de continuer après feedback
} as const;

// Progression (côté invisible de l'enfant)
export const PROGRESSION = {
  SUCCESS_RATE_INCREASE: 0.80,  // > 80% = augmenter difficulté
  MAX_ATTEMPTS_DECREASE: 3,     // > 3 essais = réduire difficulté
  SESSIONS_BEFORE_CHANGE: 3,    // sessions consécutives avant changement
} as const;
