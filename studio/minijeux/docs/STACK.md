---
name: Stack et architecture MaxPlay
description: Stack technique, architecture déploiement, règles bus SVG, audio, graphique, animation
type: project
---

## Stack

- **Jeux HTML** : HTML vanilla + JavaScript ES6 (site/)
- **Assets** : SVG/PNG — jamais d'emoji pour les bus ni pour aucun graphisme de jeu (rendu inconsistant multi-OS)
- **Résolution** : responsive mobile (HTML)

## Architecture déploiement

```
GitHub Pages → kimen26.github.io/MaxPlay/
├── /                    ← site/index.html (menu par catégories, source site/js/catalog.js)
└── /mj-XX.html          ← jeux HTML vanilla (count + retirés → memory/INVARIANTS.md ; menu → catalog.js)
```

- Source HTML : `site/`
- CI : `.github/workflows/deploy.yml` assemble dans `_site/` (non commité)
- `studio/minijeux/docs/` = specs/audit/recherche (.md)
- `_site/` dans `.gitignore`

## Règle critique bus

**Toujours** utiliser `busSVG()` / `busSVGHiddenNum()` de `site/js/bus-svg.js`.
**Jamais** d'emoji 🚌 ni de div CSS coloré pour représenter un bus.
`selectDistinctColors(pool, n)` pour tout quiz multi-couleurs.

## Sons disponibles (modules partagés)

- `playErrorSound()` — erreur (prout/klaxon/pew aléatoire)
- `playEndSound(score, total)` — fin de partie (5 paliers)
- `getAudioContext()` — oscillateur pour sons custom
- `sounds.js` — AudioContext singleton (fix son coupé après clics rapides)
- TTS : `SpeechSynthesisUtterance` lang `fr-FR`, rate 0.9

## Audio — Règles techniques

- Débloquer l'AudioContext au premier tap (obligatoire mobile) ; une seule voix à la fois.
- SFX : < 100 Ko, 96 kbps · musique de fond : 128 kbps · padding 250 ms en tête des MP3 courts (`.claude/rules/sons.md`).

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

### Drapeaux

**Twemoji (MIT)** — PNG 72px, consistant multi-OS : `github.com/twitter/twemoji`
**Flag-icons CDN** — 260 drapeaux SVG via classe CSS `fi fi-XX` : `cdn.jsdelivr.net/npm/flag-icons@7.2.3`

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
| MJ-01 à MJ-20 | ✅ déployés | voir BACKLOG.md (mj-02/03/07/10 retirés du menu) |

## Vocabulaire ASSETS (validé Papa Yann 2026-07-20 — utiliser CES mots, pas d'autres)

| Terme | C'est quoi | Où | Nommage |
|-------|-----------|-----|---------|
| **Avatar** | le personnage du profil (picker « Choisis ton dino » + atelier couleurs) | `site/img/avatars/` | `<nom>_<humeur>_<n>.png` (diminutif minuscule : `allo_joyeux_1.png`) · piloté par `js/avatar-picker.js` (`window.Avatar`), choix stocké `maxplay_avatar` |
| **Ombre** | ombre chinoise (silhouette noire transparente) | `site/img/dinos/ombres/` (60) | `<Nom>_ombre.png` (latin capitalisé) · lib `js/dinos-ombres.js` · usage mj-47, mj-24, vignettes du Mur |
| **Sprite** | dino proprement détouré (fond transparent, style low-poly) | `site/img/dinos/sprites/` | `<Nom>_sprite.png` (entier) · `<Nom>_tete.png` (tête) · réservés aux mini-jeux (éclosion mj-46, passagers mj-48) |
| **Paleoart** | image réaliste EN SCÈNE avec fond (hero, écosystème, manger, paris, funfact) | `site/img/dinos/paleoart/` | `<Nom>.jpg`, `<Nom>_headshot.jpg`, `_coloriage.webp`… · fiches encyclopédie, PAS détourées |

**🔒 Règle d'usage (décision PY 2026-07-21) : dans les SCÈNES DE JEU, uniquement les AVATARS low-poly** (personnages, passagers, bébés qui éclosent…). Les sprites réalistes détourés = récompenses/révélations (ex : « dino bien détouré » mj-24) et hors-scène. Les ombres restent libres (subitizing, cache-cache). Paleoart = fiches encyclopédie (+ exception figée mj-53 N1 : vraies photos pour la lecture, décision PY mj-27).

**Organisation : par FAMILLE d'asset, pas par dino.** Un même dino est éparpillé dans 4 dossiers ; la clé qui relie tout = le **nom latin capitalisé** (`Triceratops_*`) — SAUF les avatars qui utilisent un **diminutif minuscule** (`allo`, `anky`, `brachio`…, mapping dans `avatar-picker.js`). Référencement : aucun manifeste central — `js/dinos-data.js` (fiches encyclopédie) + `js/dinos-images-local.js`/`-grok.js` (images fiches) + `js/dinos-ombres.js` (pool ombres) ; avatars et sprites sont consommés en chemin direct par les jeux.
