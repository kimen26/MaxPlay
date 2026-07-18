---
name: phaser-tech
description: "Patterns Phaser.js 3 + performance tablet + manette 8BitDo FC30 pour MaxPlay (scenes, texture atlas, tint, object pooling, draw calls, audio sprites, Web Gamepad API, dual-input). Charger pour coder/optimiser du Phaser (max-adventure) ou brancher la manette. Active sur mots-clés phaser, atlas, pooling, draw calls, fps, manette, gamepad, 8bitdo."
---

# Phaser Tech — patterns, performance, manette

> Consolidé 2026-07-19 depuis 3 anciens skills (phaser-framework, performance-opt, gamepad-inputs — originaux : `_archive/2026-07-19-skills-connaissance-ecc/`).
> **Contexte actuel** : les mini-jeux `site/mj-*.html` sont en **vanilla HTML/JS** (pas Phaser). Phaser = `studio/max-adventure/` uniquement (build → `site/max-adventure/`, cassé EP-024). Ce skill sert quand Phaser revit ou pour un nouveau jeu riche.

## 1. Architecture des scènes

```
BootScene → PreloadScene (tous les assets) → HubScene → MiniGame*Scene → VictoryScene (réutilisable)
```

```typescript
export class MyScene extends Phaser.Scene {
  constructor() { super({ key: 'MyScene' }); }
  init(data: SceneData): void { /* paramètres */ }
  preload(): void { /* assets propres à la scène */ }
  create(): void { /* setup */ }
  update(): void { /* game loop — garder LÉGER, voir §3.4 */ }
}
```

- `Phaser.Scale.FIT` + `CENTER_BOTH` (toutes résolutions tablet).
- `setDepth()` / Layers pour l'ordre de rendu, pas l'ordre de création.
- Assets : précharger en PreloadScene (zéro freeze en jeu) ; convention `bus-line-2`, `stop-gare`, `icon-play`.

## 2. Tactile enfant (règles 80px : skill `game-design-enfant`)

```typescript
// Hitbox élargie au-delà du visuel
gameObject.setInteractive(
  new Phaser.Geom.Rectangle(-10, -10, width + 20, height + 20),
  Phaser.Geom.Rectangle.Contains
);
// Feedback < 200 ms au pointerdown
gameObject.on('pointerdown', () => {
  this.tweens.add({ targets: gameObject, scale: 0.92, duration: 100, yoyo: true });
});
```

Centraliser `playSuccess(x,y)` / `playTryAgain(x,y)` dans un composant Feedback réutilisable.

## 3. Performance tablet — le savoir des vieux roublards

**Budget : 60 fps = 16.67 ms/frame** (JS ~4-6 · render ~3-4 · GPU ~2-3 · browser ~2-3 · marge ~2). Tablet = GPU lent : viser 30 fps confort, 60 stretch. **Budget draw calls MaxPlay : < 50/frame** (tablet low-end jank à ~200).

### 3.1 Texture atlas = 1 draw call
Chaque changement de texture = flush batch = 1 draw call. 50 sprites/50 textures = 50 calls ; 50 sprites/1 atlas = 1.
Règle : **1 atlas par scène**, tout dedans (bus, arrêts, UI). Outil : Free Texture Packer.
```typescript
this.load.atlas('hub', 'assets/hub.png', 'assets/hub.json');
this.add.sprite(100, 100, 'hub', 'bus-line-2'); // même atlas = même batch
```

### 3.2 Palette swap via tint — 1 sprite, N couleurs
```typescript
const bus = this.add.sprite(x, y, 'atlas', 'bus-base'); // sprite blanc/gris
bus.setTint(0x0055A4); // la couleur de ligne vient de LIGNES (data.js), jamais en dur
```

### 3.3 Object pooling — zéro `new` en runtime
Créer/détruire en jeu = GC pause = stutter. Pré-allouer AVANT le gameplay :
```typescript
this.pool = scene.add.group({ classType: Phaser.GameObjects.Image, maxSize: 60 });
this.pool.createMultiple({ key: 'atlas', frame: 'confetti-dot', quantity: 60, active: false, visible: false });
// get() → animer → onComplete: this.pool.kill(dot). Pool épuisé → return, pas de crash.
```

### 3.4 Jamais d'allocation dans update()
Chaque `new`, `[]`, `{}`, `.filter()`, `.map()` à 60 Hz = pression GC.
```typescript
// BON : buffers pré-alloués réutilisés
private _actifs: GameObject[] = [];
private _vec = new Phaser.Math.Vector2();
update() {
  this._actifs.length = 0;            // clear sans réallouer
  this._vec.set(this.vx, this.vy);    // réutilise l'objet
}
```

### 3.5 Container vs Layer vs Group
`Layer` = couches de rendu pas chères (fond/jeu/UI via setDepth 0/10/100) · `Group` = logique pure, quasi gratuit · `Container` = transform hérité mais coût CPU — éviter les imbrications profondes.

### 3.6 Assets et audio
```
PNG → pngquant --quality=85-95 → optipng -o2 → atlas   (≈ 1/3 du poids)
WAV → OGG q5 + MP3 128k fallback : this.load.audio('k', ['s.ogg','s.mp3'])
```
**Audio sprites** (Howler ou Phaser) : 1 fichier, N marqueurs → 1 requête HTTP, 1 déverrouillage audio iOS. ⚠️ Tout SFX court : padding 250 ms de silence en tête (règle gravée `reference_sfx_silence_padding`).

### Checklist proactive
1. Cet asset est-il dans le bon atlas ? 2. Variante possible par tint ? 3. Objet fréquent → pool ? 4. Allocation dans le hot path ? 5. Asset nécessaire au démarrage ou lazy ?

## 4. Manette — 8BitDo FC30/NES30 + Web Gamepad API

**Matériel** : Bluetooth 4.0 + USB-C. Modes firmware : START+B = X-input (Windows) · **START+A = Android = meilleur pour Chrome** · START+X = D-input · START+Y = Mac. 1 LED fixe = connecté.

```typescript
// Config Phaser : input: { gamepad: true }
update(): void {
  const pad = this.input.gamepad?.getPad(0);
  if (!pad) return;                       // pas de manette → tap prend le relais
  if (pad.left  || pad.axes[0] < -0.3) { /* gauche */ }
  if (pad.right || pad.axes[0] >  0.3) { /* droite */ }
  if (pad.A) { /* interagir */ }
}
```

Mapping mode Android (varie selon firmware — TOUJOURS logger `pad.id` et tester) : D-pad = axes[0/1] ±0.5 ou buttons[12-15] · A = buttons[0] (interagir) · B = buttons[1] (annuler) · Start = buttons[9] (pause/hub).

**Règle d'or : dual-input permanent** — gamepad ET touch actifs en parallèle, jamais exclusifs. Pas de manette détectée → le tap marche toujours.

**Progression enfant** (jamais forcer, tap reste roi) : 0 tap only → 1 D-pad G/D seul → 2 D-pad 4 dir → 3 +1 bouton A → 4 +2 boutons. Introduire en mode découverte (l'adulte montre).

**Setup projecteur/canapé** : FC30 en USB sur PC → mode X-input (ou Android si non détecté) → vérifier `navigator.getGamepads()` en console → Chromecast l'onglet Chrome.

---

_Consolidé 2026-07-19 (nettoyage input-context). Si max-adventure est refondu, relire EP-024 + `studio/max-adventure/` avant d'appliquer._
