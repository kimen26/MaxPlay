---
name: Stack et architecture MaxPlay
description: Stack technique, architecture déploiement, règles bus SVG, audio, graphique, animation
type: project
---

## Stack

- **Jeux HTML** : HTML vanilla + JavaScript ES6 (game-html/)
- **Jeu Phaser** : Phaser.js 3 + Vite + TypeScript strict (game/)
- **Assets** : SVG/PNG — jamais d'emoji pour les bus ni pour aucun graphisme de jeu (rendu inconsistant multi-OS)
- **Résolution** : 1024×768 landscape (Phaser), responsive mobile (HTML)

## Architecture déploiement

```
GitHub Pages → kimen26.github.io/MaxPlay/
├── /                    ← game-html/index.html (menu 2 colonnes)
├── /mj-01.html à /mj-13.html  ← jeux HTML vanilla
└── /max-adventure/      ← Phaser build (game/dist/ copié par CI)
    max-adventure.html   ← splash → ./max-adventure/
```

- Source HTML : `game-html/`
- Source Phaser : `game/` (build → `game/dist/`)
- CI : `.github/workflows/deploy.yml` assemble dans `_site/` (non commité)
- `docs/` = uniquement des .md de documentation
- `game/dist/` et `_site/` dans `.gitignore`

## Règle critique bus

**Toujours** utiliser `busSVG()` / `busSVGHiddenNum()` de `game-html/js/bus-svg.js`.
**Jamais** d'emoji 🚌 ni de div CSS coloré pour représenter un bus.
`selectDistinctColors(pool, n)` pour tout quiz multi-couleurs.

## Sons disponibles (modules partagés)

- `playErrorSound()` — erreur (prout/klaxon/pew aléatoire)
- `playEndSound(score, total)` — fin de partie (5 paliers)
- `getAudioContext()` — oscillateur pour sons custom
- `sounds.js` — AudioContext singleton (fix son coupé après clics rapides)
- TTS : `SpeechSynthesisUtterance` lang `fr-FR`, rate 0.9

## Audio — Règles techniques

```javascript
// TOUJOURS charger OGG + MP3 (Phaser pick automatique)
this.load.audio('klaxon', ['sounds/klaxon.ogg', 'sounds/klaxon.mp3']);

// Débloquer l'AudioContext au premier tap (obligatoire mobile)
this.input.once('pointerdown', () => this.sound.resumeAll());
this.sound.play('klaxon', { volume: 0.7 });
```

- OGG : Chrome/Firefox · MP3 : Safari/iOS → **toujours les deux**
- SFX : < 100KB, 96kbps · Musique background : 128kbps
- Phaser audio intégré est suffisant — **pas besoin de Howler.js**

## Bibliothèque sons recommandée

| Type | Source | Licence |
|------|--------|---------|
| SFX jeu général | Pixabay Kids Games (pixabay.com/sound-effects) | Free |
| SFX cartoon | Freesound.org — recherche "cartoon", "children" | CC0 |
| Sons transport | Zapsplat.com — klaxons bus, métro, train | Free |
| Musique loops | Mixkit.co | Free |
| Pack complet 100+ SFX | OpenGameArt.org/content/100-plus-game-sound-effects | CC0 |

## Design sonore Max

| Son | Déclencheur | Effet |
|-----|------------|-------|
| Klaxon bus réaliste | Bonne réponse | Satisfaction authentique |
| Roar distinct par espèce | Collection dino | Renforcement du nom |
| 🎺 **Klaxon prout** (1/20) | Bus aléatoire | Secret découvrable — il en parlera des jours |
| Chime mélodique court | UI générale | Positif non-alarmant |
| Voix française chaleureuse | Instructions | Compréhension sans lecture |
| Ambiance ville | Background | Immersion |

**La règle du prout :** 1 bus sur 20 klaxonne avec un son de prout au lieu du klaxon normal. Découvrable, pas annoncé.

## Graphique — Approches

### SVG (approche actuelle — à conserver pour bus et objets)

```typescript
this.load.svg('bus', 'assets/bus.svg', { scale: 2 });
```
- ✅ Légers, éditables, crisp sur retina
- ✅ Idéal pour objets statiques (bus, drapeaux, trams)
- ⚠️ Résolution fixée au chargement — précharger à 2× la taille affichée
- ❌ Pas d'animation par frames → passer aux spritesheets

### Aseprite — Spritesheet pour personnages animés

Outil : **Aseprite** (~20€, intégration Phaser native)

```typescript
this.load.aseprite('dino', 'dino.png', 'dino.json');
this.anims.createFromAseprite('dino');
sprite.play('walk');
```
- Config Phaser obligatoire : `pixelArt: true` + échelle entière (×3, ×4)
- Meilleure option pour personnages animés (passagers, dinosaures, personnages Hub)

### Tiled / LDtk — Maps scrollantes

**Quand l'utiliser :**
- ✅ Bus qui roule sur une route parisienne scrollante
- ✅ Train avec gares sur un trajet
- ✅ La Ville Hub (monde explorable)
- ❌ Jeux de tri, matching, cartes mémoire → positionnement programmatique

```typescript
// Tiled — export CSV ou Base64 non-compressé obligatoire
this.load.tilemapTiledJSON('map', 'level1.json');
const map = this.make.tilemap({ key: 'map' });
```
**LDtk** = alternative moderne (meilleur UX, JSON plus propre, plugin Phaser communauté)

### Drapeaux

**Twemoji (MIT)** — PNG 72px, consistant multi-OS : `github.com/twitter/twemoji`
**Flag-icons CDN** — 260 drapeaux SVG via classe CSS `fi fi-XX` : `cdn.jsdelivr.net/npm/flag-icons@7.2.3`

## Animation — Feedback "juicy" Phaser

```typescript
// Bonne réponse : bounce
this.tweens.add({
  targets: sprite, scaleX: 1.3, scaleY: 1.3,
  duration: 150, yoyo: true, ease: 'Bounce.Out'
});

// Mauvaise réponse : shake doux (PAS de son punitif)
this.tweens.add({
  targets: sprite, x: sprite.x + 10,
  duration: 50, yoyo: true, repeat: 5, ease: 'Linear'
});

// Idle (le jeu respire)
this.tweens.add({
  targets: sprite, y: sprite.y - 10,
  duration: 800, yoyo: true, repeat: -1, ease: 'Sine.InOut'
});

// Confettis succès (Phaser 3.60+)
const particles = this.add.particles(x, y, 'star', {
  speed: { min: 100, max: 300 }, angle: { min: 0, max: 360 },
  scale: { start: 0.5, end: 0 }, lifespan: 800, emitting: false
});
particles.explode(20);
```

**Easings à privilégier :** `Bounce.Out`, `Elastic.Out`, `Back.Out` — effet physique et tactile.

## Assets gratuits — Sources

| Catégorie | Source | Licence |
|-----------|--------|---------|
| Sprites généraux | OpenGameArt.org | CC0/CC-BY |
| Véhicules 2D | itch.io free vehicles | Varié |
| Dinosaures cartoon | GameArt2D.com freebies | Free |
| Drapeaux (tous pays) | Twemoji (MIT) — PNG 72px | MIT |
| Assets généraux flat | CraftPix.net freebies | Free |

> Bus RATP : aucun asset gratuit exact → approche SVG custom obligatoire.

## État jeux

| Jeu | État | Notes |
|-----|------|-------|
| MJ-01 à MJ-17 | ✅ déployés | voir BACKLOG.md |
| max-adventure | 🔄 en cours | Phaser, HubScene + SandboxScene |
