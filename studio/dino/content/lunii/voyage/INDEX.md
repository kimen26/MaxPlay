# 🎒 Images Lunii — Le Voyage (8 récits d'époque)

> Visuels des **8 épisodes du voyage** (encyclopédie dino, conteuse Lunii). Affichés pendant que la Narratrice raconte chaque époque.
> Format 🔒 : **320×240, 16 gris, FOND NOIR NATIF** (écran rétro-éclairé). Produits par skill [`dino-images-lunii`](../../../../../../Users/kimen/.claude/skills/dino-images-lunii/SKILL.md). Entrée tâches Lunii : [`studio/lunii/CLAUDE.md`](../../../../lunii/CLAUDE.md).

---

## ✅ Build câblé — 2026-06-19

Le pack `maxplay-voyage-dinosaures.zip` est construit et déposé dans `~/.studio/library/`.
- **Images** : vraies `ep-*.png` (fond noir natif) utilisées directement (plus de cartons placeholder).
- **Audio** : pad 300ms + loudnorm appliqué à tous les récits.
- **Ordre** : Intro → Trias → Jurassique → Crétacé → Extinction → Mammifères → Glace → Paléontologie (corrigé).
- **Navigation** : Cover/Menu fusionné (squareOne + wheel), pas de double-OK. Autoplay sur les récits → retour menu à la fin.
- Script de build : [`studio/lunii/scripts/build-voyage-pack.mjs`](../../../../lunii/scripts/build-voyage-pack.mjs)

---

## Concept

Deux registres cohérents (blanc qui brille sur noir) :
- **Globes** (la dérive des continents = fil conducteur, c'est ce que dit l'audio) : intro → trias → jurassique → crétacé.
- **Scènes** (le monde après) : extinction → mammifères → glace → paléontologie.

## Mapping épisode → image

| Clé (`ep-<key>`) | Image | Contenu |
|------------------|-------|---------|
| `intro` | [`ep-intro.png`](ep-intro.png) | Globe **Terre primitive** (lave, volcans, météores — il y a 4 Mds d'années). ⚠️ avant 2026-08-03 : Terre actuelle (incohérent avec l'audio « la terre est chaude et vide » — corrigé à la demande de Papa Yann) |
| `trias` | [`ep-trias.png`](ep-trias.png) | Globe **Pangée** (un seul continent) |
| `jurassique` | [`ep-jurassique.png`](ep-jurassique.png) | Globe Pangée **qui se fend** (océan au milieu) |
| `cretace` | [`ep-cretace.png`](ep-cretace.png) | Globe **mi-dérive** (Atlantique jeune et étroit) |
| `extinction` | [`ep-extinction.png`](ep-extinction.png) | Météorite + **vague d'Hokusai** + volcan |
| `mammiferes` | [`ep-mammiferes.png`](ep-mammiferes.png) | **Gros mammifères** (Paraceratherium + co) dans la forêt |
| `glace-mammouth` | [`ep-glace-mammouth.png`](ep-glace-mammouth.png) | **Mammouth laineux** + neige |
| `paleo` | [`ep-paleo.png`](ep-paleo.png) | **Squelette fossile + brosse** (la paléontologie) |

---

_Créé 2026-06-18 : 8 images voyage en fond noir natif (skill dino-images-lunii). Build câblé 2026-06-19._
