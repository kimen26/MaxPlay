---
name: performance-opt
description: Performance et optimisation pour MaxPlay – Phaser.js sur tablet. Auditer design/code/assets sous l'angle performance, prévenir les problèmes, techniques d'experts. Texture atlas, object pooling, draw calls, audio sprites.
triggers:
  - optimisation jeu
  - performance phaser
  - texture atlas
  - draw calls
  - object pooling
  - audio sprite
  - gc pauses
---

# Performance Optimization – Philosophie des vieux roublards

> "Premature optimization is the root of all evil" (Knuth) — MAIS connaître les règles avant de coder évite de les violer par ignorance.

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
Viser 30fps confort / 60fps stretch goal pour MaxPlay (jeu enfant).

---

## Règle n°1 : Texture Atlas = tout dans un seul fichier image

**Pourquoi c'est critique** : Le GPU ne peut rendre qu'une texture à la fois dans un batch. Chaque changement de texture = flush du batch = 1 draw call.

```
Sans atlas : 50 sprites × 50 textures = 50 draw calls
Avec atlas : 50 sprites × 1 atlas    = 1 draw call  ← 50× plus rapide
```

**Règle MaxPlay** :
- 1 atlas par scène (hub-atlas, mini-jeu-atlas)
- Tous les bus, arrêts, icônes, UI d'une même scène dans le même atlas
- Outils : Free Texture Packer (gratuit), TexturePacker (~30€)

```typescript
// Chargement atlas
this.load.atlas('hub', 'assets/hub.png', 'assets/hub.json');

// Usage — tous ces sprites = 1 draw call
const bus1 = this.add.sprite(100, 100, 'hub', 'bus-line-2');
const bus2 = this.add.sprite(200, 100, 'hub', 'bus-line-4');
```

---

## Règle n°2 : Palette Swap via Tint

Problème : bus en 7 couleurs de lignes.  
Solution naïve : 7 fichiers PNG.  
Solution expert : 1 sprite blanc/gris + `setTint()`.

```typescript
const bus = this.add.sprite(x, y, 'atlas', 'bus-base');
bus.setTint(0xFFD700);  // Ligne 1 jaune
bus.setTint(0x0055A4);  // Ligne 2 bleu
bus.setTint(0xCC0000);  // Ligne 4 rouge
```

**Gains : 7× moins d'assets, 7× moins de mémoire GPU.**

---

## Règle n°3 : Object Pooling — zéro new en runtime

Tout objet créé en cours de jeu = potentiel GC pause = stutter.

```typescript
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
      const dot = this.pool.get(x, y, 'atlas', 'confetti-dot');
      if (!dot) return; // Pool épuisé = pas de crash
      dot.setActive(true).setVisible(true);
      // Tween + retour au pool à la fin
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

Le game loop tourne 60× par seconde. Chaque `new`, `[]`, `{}`, `.filter()`, `.map()` = pression sur le GC.

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

## Règle n°5 : Container vs Layer vs Group

| | Container | Layer | Group |
|--|-----------|-------|-------|
| Rendu | Oui, matriciel | Oui, isolé | Non (logique) |
| Transform hérité | Oui | Non | Non |
| Coût CPU | Moyen-élevé | Faible | Quasi zéro |

**Règle MaxPlay** : préférer `Layer` pour les couches (fond/jeu/UI). Éviter les `Container` imbriqués profonds.

```typescript
const bgLayer   = this.add.layer().setDepth(0);   // Fond
const gameLayer = this.add.layer().setDepth(10);  // Gameplay
const uiLayer   = this.add.layer().setDepth(100); // Interface
```

---

## Pipeline de compression assets

```
Source PNG brut (Inkscape/Aseprite)
  → pngquant --quality=85-95 (PNG8 indexé, -70% taille)
  → optipng -o2 (compression additionnelle)
  → Packer dans atlas (Free Texture Packer)
  → Résultat : asset prêt GPU, 1/3 de la taille originale
```

**Audio** :
```
WAV source → OGG Vorbis q5 (navigateurs modernes)
           → MP3 128kbps (fallback Safari)
Phaser charge les deux : this.load.audio('key', ['son.ogg', 'son.mp3'])
```

---

## Budget draw calls tablet

| Plateforme | Budget confort | Limite avant jank |
|------------|---------------|-------------------|
| Tablet low-end | 50–100 | 200 |
| Tablet mid | 100–300 | 500 |
| Tablet high | 300–700 | 1000 |
| Desktop | 1000–3000 | 5000+ |

**Pour MaxPlay** : viser < 50 draw calls/frame.

---

## Audio Sprites — la texture atlas de l'audio

```typescript
const sfx = new Howl({
  src: ['sounds/sfx.webm', 'sounds/sfx.mp3'],
  sprite: {
    'success-chime': [0,    400],   // 0ms → 400ms
    'try-again':     [600,  250],
    'bus-honk':      [1000, 300],
    'star-collect':  [1500, 200],
  }
});
sfx.play('success-chime');
```

**Pourquoi** : 1 requête HTTP au lieu de N, 1 déverrouillage audio iOS.

---

## Checklist proactive

1. **Draw calls** : cet asset est-il dans le bon atlas ?
2. **Palette swap** : peut-on faire X variantes avec tint ?
3. **Pooling** : cet objet sera-t-il créé/détruit souvent ?
4. **Update loop** : y a-t-il des allocations dans le hot path ?
5. **Lazy load** : cet asset est-il nécessaire dès le démarrage ?

---

## Correspondance Rétro → Web

| NeoGeo / Rétro | Phaser.js / Web | Principe |
|----------------|-----------------|----------|
| VRAM / sprite banks | Texture atlases | 1 texture = 1 état GPU |
| Palette de couleurs | `setTint()` | 1 sprite × N couleurs |
| Object pool (sprite slots) | `Group` pooling | Zéro allocation en runtime |
| Compression ROM | gzip/brotli + PNG | Assets compressés |

> Pre-allocate everything. Batch similar operations. Never allocate in the game loop.
