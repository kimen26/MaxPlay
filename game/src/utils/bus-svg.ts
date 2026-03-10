/**
 * bus-svg.ts
 * Génère dynamiquement les SVG de bus avec la bonne couleur et le bon numéro de ligne.
 * Les SVG sont des templates avec {{COLOR}} et {{LINE}} comme placeholders.
 *
 * Usage HTML  : busContainer.innerHTML = createBusSvg('162', '#0064B1', 'right');
 * Usage Phaser: this.add.image(...).setTexture(loadBusTexture(scene, '162', 'right'));
 */

import { BUS_LINE_COLORS } from '../constants/colors';

export type BusDirection = 'right' | 'left';

// ─── Templates ───────────────────────────────────────────────────────────────

const RIGHT_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
  <rect x="5" y="10" width="150" height="45" rx="4" fill="{{COLOR}}"/>
  <rect x="5" y="40" width="150" height="15" fill="#ecf0f1"/>
  <rect x="5" y="48" width="150" height="6" fill="#7f8c8d"/>
  <rect x="62" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="70" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="130" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="138" y="14" width="8" height="37" fill="#7f8c8d" stroke="#111" stroke-width="1.5"/>
  <rect x="5" y="10" width="150" height="45" rx="4" fill="none" stroke="#111" stroke-width="2"/>
  <rect x="10" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="36" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="84" y="14" width="40" height="21" fill="{{COLOR}}" stroke="#111" stroke-width="1.5"/>
  <text x="104" y="29" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#fff" text-anchor="middle">{{LINE}}</text>
  <rect x="150.5" y="14" width="5" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1"/>
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

const LEFT_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
  <rect x="5" y="10" width="150" height="45" rx="4" fill="{{COLOR}}"/>
  <rect x="5" y="40" width="150" height="15" fill="#ecf0f1"/>
  <rect x="5" y="48" width="150" height="6" fill="#7f8c8d"/>
  <rect x="4.5" y="14" width="5" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1"/>
  <rect x="14" y="14" width="16" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="36" y="14" width="40" height="21" fill="{{COLOR}}" stroke="#111" stroke-width="1.5"/>
  <text x="56" y="29" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#fff" text-anchor="middle">{{LINE}}</text>
  <rect x="82" y="14" width="16" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="103" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="129" y="14" width="21" height="21" fill="#458bba" fill-opacity="0.82" stroke="#111" stroke-width="1.5"/>
  <rect x="5" y="10" width="150" height="45" rx="4" fill="none" stroke="#111" stroke-width="2"/>
  <line x1="5" y1="24" x2="11" y2="24" stroke="#111" stroke-width="2" stroke-linecap="round"/>
  <rect x="2" y="20" width="6" height="10" rx="1" fill="#111"/>
  <circle cx="45" cy="54" r="10" fill="#333" stroke="#111" stroke-width="2"/>
  <circle cx="45" cy="54" r="6" fill="#666"/>
  <circle cx="45" cy="54" r="2" fill="#111"/>
  <circle cx="115" cy="54" r="10" fill="#333" stroke="#111" stroke-width="2"/>
  <circle cx="115" cy="54" r="6" fill="#666"/>
  <circle cx="115" cy="54" r="2" fill="#111"/>
  <rect x="5" y="48" width="4" height="5" fill="#FFCC00"/>
  <rect x="151" y="48" width="4" height="5" fill="#FF4444"/>
</svg>`;

// ─── API publique ─────────────────────────────────────────────────────────────

/** Retourne une chaîne SVG avec la couleur et le numéro de ligne injectés. */
export function createBusSvg(line: string, color: string, dir: BusDirection = 'right'): string {
  const tpl = dir === 'right' ? RIGHT_TEMPLATE : LEFT_TEMPLATE;
  return tpl.replace(/\{\{COLOR\}\}/g, color).replace(/\{\{LINE\}\}/g, line);
}

/** Data URL utilisable dans un <img src="..."> ou Phaser this.load.image() */
export function createBusDataUrl(line: string, color: string, dir: BusDirection = 'right'): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(createBusSvg(line, color, dir))}`;
}

/**
 * Pour Phaser PreloadScene : pré-charge toutes les textures de bus connues.
 * Clé générée : "bus-162-right", "bus-162-left", etc.
 */
export function preloadAllBusTextures(scene: Phaser.Scene): void {
  const lines = Object.keys(BUS_LINE_COLORS) as Array<keyof typeof BUS_LINE_COLORS>;
  lines.forEach(line => {
    const color = `#${BUS_LINE_COLORS[line].toString(16).padStart(6, '0')}`;
    (['right', 'left'] as BusDirection[]).forEach(dir => {
      const key = `bus-${line}-${dir}`;
      if (!scene.textures.exists(key)) {
        scene.load.image(key, createBusDataUrl(line, color, dir));
      }
    });
  });
}
