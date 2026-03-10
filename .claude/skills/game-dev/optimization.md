---
name: optimization
description: Performance et optimisation pour MaxPlay – Phaser.js sur tablet. Utiliser pour auditer des choix de design/code/assets sous l'angle performance, prévenir les problèmes avant qu'ils arrivent, et conseiller les techniques d'experts. Intervenir proactivement quand un choix de design, asset ou code peut impacter les perfs.
---

# Optimisation – Philosophie des vieux roublards

> "Premature optimization is the root of all evil" (Knuth) — MAIS connaître les règles
> avant de coder évite de les violer par ignorance. On code proprement dès le départ.

---

## Le budget de frame — la contrainte absolue

**60 fps = 16.67 ms par frame, tout compris.**

```
Budget frame 16.67ms :
├── JS logic (update, physics, input)   ~4-6ms
├── Render (batch construction)          ~3-4ms
├── GPU (draw calls, shaders)            ~2-3ms
├── Composite + browser overhead         ~2-3ms
└── Marge de sécurité                    ~2ms
```

Sur tablet (iPad Air, Samsung Tab A) : GPU plus lent que desktop.
Viser 30fps confort / 60fps stretch goal pour MaxPlay (jeu enfant, pas de FPS critique).

---

## Les concepts rétro et leurs équivalents modernes

C'est le même problème depuis 1990, les outils ont changé.

| NeoGeo / Rétro | Web / Phaser.js | Principe |
|----------------|-----------------|----------|
| **VRAM / sprite banks** | Texture atlas PNG sur GPU | 1 texture chargée = 1 état GPU |
| **Palette de couleurs** | Tint WebGL (`sprite.setTint()`) | 1 sprite × N couleurs = tint, pas N fichiers |
| **Tile maps (VRAM tiles)** | `Phaser.Tilemaps.TilemapLayer` | Tuiles partagées, rendu ultra-efficace |
| **Sprites hardware (limités)** | Draw call budget | Chaque texture switch = 1 draw call |
| **Raster interrupt / scanline** | WebGL shaders GLSL | Effets par ligne/zone via fragment shader |
| **DMA / memcpy rapide** | `Float32Array`, `ArrayBuffer` | Accès mémoire cache-friendly |
| **Object pools fixes** | `Phaser.GameObjects.Group` pooling | Zéro allocation en runtime |
| **Fixed-point math** | `Math.round()`, integer coords | `roundPixels: true` dans Phaser |
| **Compression ROM (RLE/LZ)** | gzip/brotli + PNG optimisé | Assets compressés au transport |
| **Bank switching** | Lazy loading par Scene | Charger/décharger selon le niveau actif |
| **Double buffering** | `requestAnimationFrame` natif | rAF synchronise au vblank du navigateur |

---

## Règle n°1 : Texture Atlas = tout dans un seul fichier image

**Pourquoi c'est critique :**
Le GPU ne peut rendre qu'une texture à la fois dans un batch. Chaque changement de
texture = flush du batch = 1 draw call supplémentaire. Avec 10 sprites de textures
différentes = 10 draw calls. Avec 10 sprites dans 1 atlas = 1 draw call.

```
Sans atlas : 50 sprites × 50 textures = 50 draw calls
Avec atlas  : 50 sprites × 1 atlas    = 1 draw call  ← 50× plus rapide
```

**Règle MaxPlay :**
- 1 atlas par scène (hub-atlas, mini-jeu-atlas)
- Tous les bus, arrêts, icônes, UI d'une même scène dans le même atlas
- Outils : Free Texture Packer (gratuit, preset Phaser), TexturePacker (~30€)

```typescript
// Chargement atlas
this.load.atlas('hub', 'assets/hub.png', 'assets/hub.json');

// Usage — tous ces sprites = 1 draw call
const bus1 = this.add.sprite(100, 100, 'hub', 'bus-line-2');
const bus2 = this.add.sprite(200, 100, 'hub', 'bus-line-4');
const stop = this.add.sprite(300, 100, 'hub', 'bus-stop');
```

---

## Règle n°2 : Palette swap via Tint, pas N fichiers

Problème classique : bus en 7 couleurs de lignes.
Solution naïve : 7 fichiers PNG différents.
Solution expert : 1 sprite blanc/gris + `setTint()`.

```typescript
// 1 sprite de bus gris dans l'atlas
const bus = this.add.sprite(x, y, 'atlas', 'bus-base');

// Palette swap instantané, zéro coût mémoire supplémentaire
bus.setTint(0xFFD700);  // Ligne 1 jaune
bus.setTint(0x0055A4);  // Ligne 2 bleu
bus.setTint(0xCC0000);  // Ligne 4 rouge

// Tint multi-coins (dégradé)
bus.setTintFill(0xFFD700); // Coloration complète (pas de texture, juste couleur)
```

**Gains : 7× moins d'assets, 7× moins de mémoire GPU, même qualité.**

---

## Règle n°3 : Object Pooling — zéro new en runtime

Tout objet créé en cours de jeu = potentiel GC pause = stutter.
Pour les confettis, effets, sons : pool pré-alloué.

```typescript
// Pool de confettis pré-alloué
class ConfettiPool {
  private pool: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene) {
    this.pool = scene.add.group({
      classType: Phaser.GameObjects.Image,
      maxSize: 60,
      runChildUpdate: false,
    });
    // Pré-allouer AVANT le gameplay
    this.pool.createMultiple({
      key: 'atlas', frame: 'confetti-dot',
      quantity: 60, active: false, visible: false,
    });
  }

  burst(x: number, y: number): void {
    for (let i = 0; i < 20; i++) {
      const dot = this.pool.get(x, y, 'atlas', 'confetti-dot') as Phaser.GameObjects.Image;
      if (!dot) return; // Pool épuisé = pas de crash
      dot.setActive(true).setVisible(true).setTint(CONFETTI_COLORS[i % 5]);
      // Tween pour animer, retour au pool à la fin
      scene.tweens.add({
        targets: dot, y: y + 200, alpha: 0, duration: 1000,
        onComplete: () => this.pool.kill(dot),
      });
    }
  }
}
```

---

## Règle n°4 : Jamais d'allocation dans update()

Le game loop tourne 60× par seconde. Chaque `new`, `[]`, `{}`, `.filter()`,
`.map()` dans update() = pression sur le GC = pauses aléatoires.

```typescript
// MAUVAIS — allocation à chaque frame
update() {
  const buses = this.buses.getChildren().filter(b => b.active); // new Array()
  const vec = new Phaser.Math.Vector2(this.vx, this.vy);        // new Object()
}

// BON — pré-allouer en dehors du loop
private _activeBuses: Phaser.GameObjects.GameObject[] = [];
private _vec = new Phaser.Math.Vector2();

update() {
  this._activeBuses.length = 0; // Clear sans réallouer
  const children = this.buses.getChildren();
  for (let i = 0; i < children.length; i++) {
    if (children[i].active) this._activeBuses.push(children[i]);
  }
  this._vec.set(this.vx, this.vy); // Réutilise l'objet existant
}
```

---

## Règle n°5 : Blend modes = briseurs de batch

Chaque changement de blend mode = flush obligatoire du batch.

```typescript
// MAUVAIS — mélange ADD et NORMAL dans la même frame
confetti.setBlendMode(Phaser.BlendModes.ADD);   // Flush!
bus.setBlendMode(Phaser.BlendModes.NORMAL);      // Flush!
star.setBlendMode(Phaser.BlendModes.ADD);        // Flush!

// BON — regrouper les objets par blend mode
// Rendre d'abord tous les NORMAL, puis tous les ADD
// Ou éviter ADD complètement si possible (utiliser alpha à la place)
```

Pour MaxPlay : **éviter ADD** sauf pour les étoiles de victoire.
Grouper les effets ADD ensemble à la fin du rendu.

---

## Règle n°6 : Container vs Layer vs Group

| | Container | Layer | Group |
|--|-----------|-------|-------|
| Rendu | Oui, matriciel | Oui, isolé | Non (logique) |
| Transform hérité | Oui | Non | Non |
| Tri depth isolé | Non | Oui | Non |
| Coût CPU | Moyen-élevé | Faible | Quasi zéro |

**Règle MaxPlay** : préférer `Layer` pour les couches (fond/jeu/UI).
Éviter les `Container` imbriqués profonds — coût matriciel par enfant par frame.

```typescript
// Architecture en couches recommandée
const bgLayer   = this.add.layer().setDepth(0);   // Fond, décors statiques
const gameLayer = this.add.layer().setDepth(10);  // Bus, gameplay
const fxLayer   = this.add.layer().setDepth(20);  // Effets, confettis
const uiLayer   = this.add.layer().setDepth(100); // Interface, boutons
```

---

## Règle n°7 : Assets — pipeline de compression

Avant d'intégrer un asset, le passer par ces étapes :

```
PNG brut (Inkscape/Aseprite)
  → pngquant --quality=85-95 (PNG8 indexé, -70% taille)
  → optipng -o2 (compression additionnelle)
  → Packer dans atlas (Free Texture Packer)
  → Résultat : asset prêt GPU, 1/3 de la taille originale
```

**Audio :**
```
WAV source → OGG Vorbis q5 (navigateurs modernes)
           → MP3 128kbps (fallback Safari vieux)
Phaser charge les deux : this.load.audio('key', ['son.ogg', 'son.mp3'])
```

**Audio sprite** (équivalent texture atlas pour les sons) :
Regrouper tous les petits sons (feedbacks, UI) en 1 fichier avec timestamps JSON.
Économise les requêtes HTTP et la latence d'activation audio.

---

---

## Palette Swap Shader — solution definitif pour les couleurs de bus

**Problème MaxPlay concret** : 10 lignes de bus, 10 couleurs différentes.
Solution naïve : 10 sprites PNG = 10× la mémoire GPU.
Solution expert : **1 sprite gris + palette lookup shader**.

### Niveau 1 : Tint simple (à faire en premier)
```typescript
// 1 sprite 'bus-base' en nuances de gris dans l'atlas
const bus = this.add.sprite(x, y, 'atlas', 'bus-base');
bus.setTint(0xFFD700);  // → bus ligne 1 jaune
bus.setTint(0x0055A4);  // → bus ligne 2 bleu
// Zéro asset supplémentaire. Rendu identique à l'œil.
```
**Quand c'est suffisant** : couleur uniforme sur tout le sprite. Convient pour 90% des cas de MaxPlay.

### Niveau 2 : Palette Texture Shader (pour variantes complexes)
Si on veut recolorer seulement la carrosserie (pas les roues, pas les vitres) :

```glsl
// Fragment shader GLSL (custom pipeline Phaser)
uniform sampler2D uSprite;   // sprite avec index dans canal R (0–255)
uniform sampler2D uPalette;  // texture 256×1 = la palette de couleurs

void main() {
  float index = texture2D(uSprite, vTexCoord).r;        // index 0.0–1.0
  gl_FragColor = texture2D(uPalette, vec2(index, 0.5)); // lookup couleur
}
```

Pour changer de couleur de ligne : **swap la palette** (256×1 px = 1 KB GPU).
10 variantes de bus = 1 sprite (4 MB) + 10 palettes (10 KB) = **400× moins que 10 sprites**.

---

## Pipeline de compression assets — à appliquer AVANT intégration

```
Source PNG brut (Inkscape/Aseprite)
  │
  ├─ mogrify -trim +repage *.png      ← supprimer transparence inutile
  ├─ pngquant --quality=70-85 *.png   ← PNG8 indexé (-50 à -70% taille)
  ├─ oxipng -o max --strip all *.png  ← compression DEFLATE optimale
  │
  └─ Packer dans atlas (Free Texture Packer)
       └─ Résultat : atlas optimisé, prêt GPU

Audio WAV source
  └─ ffmpeg -c:a libopus -b:a 64k    ← Opus 64kbps ≈ MP3 128kbps qualité
       + fallback MP3 pour Safari
       + audiosprite pour regrouper tous les petits sons
```

**Chiffres concrets :**
- 1 atlas 1024×1024 RGBA = **4 MB GPU memory**
- 1 atlas 2048×2048 RGBA = **16 MB GPU memory**
- Budget safe tablet mid-range : **64 MB total textures**
- MaxRects packing efficiency : **85–92%** (vs 60–75% shelf packing)
- Padding anti-bleeding : **1–2 px** par sprite dans l'atlas
- `navigator.deviceMemory` → adapter la qualité en runtime

---

## Chiffres de référence — budget draw calls tablet

| Plateforme | Budget confort | Limite avant jank |
|------------|---------------|-------------------|
| Tablet low-end (vieux Android) | 50–100 | 200 |
| Tablet mid (Samsung Tab A, iPad 9) | 100–300 | 500 |
| Tablet high (iPad Air M1+, S9 Tab) | 300–700 | 1000 |
| Desktop dev | 1000–3000 | 5000+ |

**Pour MaxPlay** : viser < 50 draw calls/frame (jeu enfant simple).
Avec 1 atlas par scène, c'est facilement atteignable.

---

## Audio Sprites — la texture atlas de l'audio

Regrouper tous les petits sons (feedback, UI, effets) en 1 fichier.

```typescript
// Howler.js audio sprite
const sfx = new Howl({
  src: ['sounds/sfx.webm', 'sounds/sfx.mp3'],
  sprite: {
    'success-chime': [0,    400],   // 0ms → 400ms
    'try-again':     [600,  250],
    'bus-honk':      [1000, 300],
    'star-collect':  [1500, 200],
    'confetti-pop':  [2000, 500],
  }
});

sfx.play('success-chime');
```

**Pourquoi :** 1 requête HTTP au lieu de N, 1 déverrouillage audio iOS pour tous les sons.
Laisser **200–500ms de silence** entre chaque son pour éviter les artefacts.

---

## Touch & Input tablet — optimisations critiques

### Passive listeners — débloquer le scroll browser

```typescript
// MAUVAIS — le browser attend le JS avant de scroller (jank tactile)
canvas.addEventListener('touchstart', handleTouch);

// BON — browser peut scroller immédiatement
canvas.addEventListener('touchstart', handleTouch, { passive: true });
canvas.addEventListener('touchmove', handleMove,   { passive: true });

// PointerEvent = API unifiée touch + souris + stylet
canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
canvas.addEventListener('pointermove', onPointerMove, { passive: true });
canvas.addEventListener('pointerup',   onPointerUp);    // non-passive si preventDefault
canvas.addEventListener('pointercancel', onPointerUp);  // important sur tablet !
```

### Cache getBoundingClientRect — jamais dans le game loop

```typescript
// getBoundingClientRect() force un reflow = 2-5ms
// MAUVAIS — appelé à chaque touch event
onPointerDown(e) {
  const rect = canvas.getBoundingClientRect(); // reflow!
  const gameX = e.clientX - rect.left;
}

// BON — caché 1× au startup, mis à jour uniquement au resize
private _canvasRect = { left: 0, top: 0 };

init() {
  this.updateCanvasBounds();
  window.addEventListener('resize', () => this.updateCanvasBounds());
}

updateCanvasBounds() {
  const rect = canvas.getBoundingClientRect();
  this._canvasRect.left = rect.left;
  this._canvasRect.top  = rect.top;
}

onPointerDown(e) {
  const gameX = e.clientX - this._canvasRect.left; // zéro reflow
}
```

### Canvas context options pour tablet

```typescript
// Options qui améliorent les perfs sur tablet
const ctx = canvas.getContext('2d', {
  alpha: false,          // pas de transparence = compositing plus rapide
  desynchronized: true,  // low-latency mode (Chrome, réduit input lag)
});
```

---

## Game Loop — fixed timestep + anti spiral of death

Le pattern professionnel : physique à pas fixe, rendu interpolé.

```typescript
const FIXED_STEP_MS = 1000 / 60;  // 16.667ms
const MAX_FRAME_MS  = 100;        // clamp : empêche la spirale de la mort

let accumulator = 0;
let lastTimestamp = 0;

function gameLoop(timestamp: number): void {
  let frameTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  // Clamp : si l'onglet était caché, on ne saute pas 5 secondes en avant
  if (frameTime > MAX_FRAME_MS) frameTime = MAX_FRAME_MS;

  accumulator += frameTime;

  // Physique à pas fixe : déterministe, reproductible
  while (accumulator >= FIXED_STEP_MS) {
    fixedUpdate(FIXED_STEP_MS / 1000);
    accumulator -= FIXED_STEP_MS;
  }

  // Rendu interpolé : smooth même entre deux pas de physique
  const alpha = accumulator / FIXED_STEP_MS;
  render(alpha);

  requestAnimationFrame(gameLoop);
}

// Pause auto quand onglet caché
document.addEventListener('visibilitychange', () => {
  if (document.hidden) cancelAnimationFrame(rafId);
  else rafId = requestAnimationFrame(gameLoop);
});
```

---

## Métriques à surveiller proactivement

| Métrique | Seuil OK | Seuil problème | Comment mesurer |
|----------|----------|----------------|-----------------|
| Draw calls/frame | < 50 | > 200 | `renderer.drawCount` |
| Objets actifs | < 500 | > 2000 | `scene.children.length` |
| Mémoire JS heap | < 100MB | > 300MB | DevTools Memory |
| FPS | 55-60 | < 30 | `game.loop.actualFps` |
| Taille atlas | < 2048×2048 | > 4096×4096 | Éditeur d'images |
| Taille bundle | < 2MB | > 10MB | Network DevTools |

---

## Checklist proactive — poser ces questions AVANT de coder

Quand un nouveau design/asset/feature est proposé, demander :

1. **Draw calls** : cet asset est-il dans le bon atlas ?
2. **Palette swap** : peut-on faire X variantes avec tint plutôt que X fichiers ?
3. **Pooling** : cet objet sera-t-il créé/détruit souvent ? → Pool
4. **Update loop** : y a-t-il des allocations dans le hot path ?
5. **Blend mode** : y a-t-il un blend mode ADD mélangé avec NORMAL ?
6. **Layers** : cet élément est-il dans la bonne couche ?
7. **Audio** : ce son est-il dans l'audio sprite ?
8. **Lazy load** : cet asset est-il nécessaire dès le démarrage ?

---

## Outils de profiling

- **Chrome DevTools → Performance** : enregistrer 3 secondes de jeu, analyser flame chart, repérer GC pauses (triangles rouges)
- **Chrome DevTools → Memory** : heap snapshot avant/après une session, chercher les fuites
- **Phaser Debug** : `this.physics.world.createDebugGraphic()` pour visualiser les bodies
- **FPS overlay** :
  ```typescript
  // Dans create()
  this.add.text(10, 10, '', { fontSize: '16px', color: '#0f0' })
    .setDepth(999)
    .setScrollFactor(0)
    .update = function() { this.setText(`FPS: ${Math.round(scene.game.loop.actualFps)}`); };
  ```

---

---

## Correspondance Rétro → Web — table de référence rapide

> Ton pote qui fait du NeoGeo et toi Phaser.js, même combat différents outils.

| NeoGeo / Rétro | Phaser.js / Web | Principe commun |
|----------------|-----------------|-----------------|
| VRAM (380 KB) | GPU texture memory (256-512 MB) | Budget mémoire GPU |
| Sprite banks (pages ROM) | Texture atlases (PNG+JSON) | 1 atlas = 1 groupe de draw calls |
| Bank register swap | `scene.start()` / lazy load | Charger seulement ce qui est visible |
| Palette RAM (16×16) | WebGL uniforms + `setTint()` | 1 écriture = recoloriage instantané |
| Palette swap trick | Fragment shader + `setTint()` | Variantes couleur sans assets supplémentaires |
| DMA (ROM → VRAM) | `gl.bufferSubData()` | Upload une fois, référencer N fois |
| Sprite table taille fixe | `TypedArray` + object pool | Zéro allocation pendant le gameplay |
| Sprite attribute table layout | Struct-of-Arrays TypedArrays | Données contiguës = cache-friendly |
| 96 hardware sprites max | Budget ~50 draw calls/frame | Limite → contrainte de design |
| Priorité sprite (register) | `sprite.setDepth(n)` | Tri avant rendu |
| Raster interrupt (mi-scanline) | Post-process pipeline WebGL | `gl_FragCoord.y` dans le shader |
| Fix layer (HUD tiles) | `StaticTilemapLayer` | 1 draw call peu importe la taille |
| Scroll registers | `layer.setScrollFactor()` | Parallax via facteurs de scroll |
| Math fixe (pas de FPU) | Bitwise ops + lookup tables | `x >> 4` au lieu de `x / 16.0` |
| Compression ROM (RLE/LZ) | Brotli HTTP + PNG/WebP | Transparent, configuré côté serveur |
| Object pool (sprite slots) | `Phaser.GameObjects.Group` | Pré-allouer, jamais `new` en game loop |
| Double buffer + vblank | `requestAnimationFrame` | Tout dans le callback rAF |
| Dirty flag (skip VRAM write) | Dirty flag sur les transforms | Recalculer seulement si changement |

**Le principe unificateur** (à garder en tête sur tout ce projet) :
> Pre-allocate everything. Batch similar operations. Defer expensive work.
> Keep hot data contiguous. Know your hard limits. Never allocate in the game loop.

---

## Struct-of-Arrays — données cache-friendly pour les entités

Quand on aura beaucoup d'entités (bus, arrêts, confettis) :

```typescript
// MAUVAIS – Array of Structs, mauvais pour le cache CPU
const buses = [
  { x: 10, y: 20, lineNum: 2, color: 0x0055A4, active: true },
  { x: 30, y: 40, lineNum: 4, color: 0xCC0000, active: true },
];

// BON – Struct of Arrays, style "sprite attribute table" NeoGeo
// Toutes les positions X contiguës = 1 cache line pour tout le lot
const MAX_BUSES = 64;
const busX      = new Float32Array(MAX_BUSES);
const busY      = new Float32Array(MAX_BUSES);
const busLine   = new Uint8Array(MAX_BUSES);
const busActive = new Uint8Array(MAX_BUSES);  // 0/1, comme le flag hardware

// Update loop : touche seulement posX/posY, tient dans L1 cache
function updateBusPositions(dt: number): void {
  for (let i = 0; i < MAX_BUSES; i++) {
    if (!busActive[i]) continue;
    busX[i] += busVX[i] * dt;
    busY[i] += busVY[i] * dt;
  }
}
```

---

## Sources de référence

- Game Programming Patterns (Nystrom) : https://gameprogrammingpatterns.com — object pool, dirty flag, data locality
- Phaser 3 source (pour comprendre le batch renderer) : https://github.com/photonstorm/phaser
- MDN Games anatomy : https://developer.mozilla.org/en-US/docs/Games/Anatomy
- Chrome rendering pipeline : https://web.dev/articles/rendering-performance
