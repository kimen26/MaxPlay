# 🎒 Images Lunii — Le Voyage (8 récits d'époque)

> Visuels des **8 épisodes du voyage** (encyclopédie dino, conteuse Lunii). Affichés pendant que la Narratrice raconte chaque époque.
> Format 🔒 : **320×240, 16 gris, FOND NOIR NATIF** (écran rétro-éclairé). Produits par skill [`dino-images-lunii`](../../../../../../Users/kimen/.claude/skills/dino-images-lunii/SKILL.md). Entrée tâches Lunii : [`studio/lunii/CLAUDE.md`](../../../../lunii/CLAUDE.md).

## Concept

Deux registres cohérents (blanc qui brille sur noir) :
- **Globes** (la dérive des continents = fil conducteur, c'est ce que dit l'audio) : intro → trias → jurassique → crétacé.
- **Scènes** (le monde après) : extinction → mammifères → glace → paléontologie.

## Mapping épisode → image

| Clé (`ep-<key>`) | Image | Contenu |
|------------------|-------|---------|
| `intro` | [`ep-intro.png`](ep-intro.png) | Globe Terre **aujourd'hui** (départ du voyage) |
| `trias` | [`ep-trias.png`](ep-trias.png) | Globe **Pangée** (un seul continent) |
| `jurassique` | [`ep-jurassique.png`](ep-jurassique.png) | Globe Pangée **qui se fend** (océan au milieu) |
| `cretace` | [`ep-cretace.png`](ep-cretace.png) | Globe **mi-dérive** (Atlantique jeune et étroit) |
| `extinction` | [`ep-extinction.png`](ep-extinction.png) | Météorite + **vague d'Hokusai** + volcan |
| `mammiferes` | [`ep-mammiferes.png`](ep-mammiferes.png) | **Gros mammifères** (Paraceratherium + co) dans la forêt |
| `glace-mammouth` | [`ep-glace-mammouth.png`](ep-glace-mammouth.png) | **Mammouth laineux** + neige |
| `paleo` | [`ep-paleo.png`](ep-paleo.png) | **Squelette fossile + brosse** (la paléontologie) |

## ⚠️ À résoudre avant câblage du build (`studio/lunii/scripts/build-voyage-pack.mjs`)

1. **Câblage** : le build génère encore des **cartons couleur + texte** (placeholders). À pointer sur ces `ep-<key>.png`.
2. **Cover** : le menu voyage a besoin de **sa propre image** (en plus des 8). Réutiliser `ep-intro.png` ou en générer une dédiée.
3. 🔴 **Incohérence `paleo`** : le build liste `paleo` = « **Le Paléocène** » en **position 6** (avant mammifères). Mais le récit V5 (`content/sources/recits/_RECITS-EPOQUES-DIALOGUE-V5.md`) dit `paleo` = « **la Paléontologie** », en **dernier**. Notre image = fossile (paléontologie). → décider la source de vérité (V5 ?) avant de câbler/retitrer.

---

_Créé 2026-06-18 : 8 images voyage en fond noir natif (skill dino-images-lunii)._
