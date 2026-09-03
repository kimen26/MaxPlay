# Emblèmes des 9 familles dino (charte figée)

> Système iconographique pour les images de familles Lunii. Style C (voir [`SKILL.md`](SKILL.md)).
> Référence visuelle figée : **Théropodes V3** (`reference/theropode-v3.png`).

Chaque famille = **un élément signature fort** (+ indice de contexte) qui dit le concept, pas un dino identifiable.
Titres = noms scientifiques (source `site/js/dinos-data.js`).

| # | Famille | Emblème-concept | Griffure ? |
|---|---------|-----------------|------------|
| 1 | **Théropodes** (chasseur 2 pattes) | 2 grosses cuisses/pattes griffues type T-Rex + morceau de viande sur os + 3 griffures en arrière-plan ✅ **RÉFÉRENCE V3** | ✅ prédateur |
| 2 | **Sauropodes** (long cou) | un long cou qui ondule et monte vers une feuille/branche tout en haut | ❌ herbivore |
| 3 | **Thyréophores** (armure) | un dos bardé de plaques + pics finissant en massue (forme de bouclier) | ❌ herbivore |
| 4 | **Cératopsiens** (cornus) | une tête à 3 cornes + collerette, vue de face (c'est Tritri 🔒) | ❌ herbivore |
| 5 | **Ornithopodes** (bec canard) | crête tubulaire creuse du Parasaurolophus + bec plat + main d'Iguanodon à pouce-poignard (les 3 traits remarquables) | ❌ herbivore |
| 6 | **Dromæosaures** (raptor) | UNE patte emplumée avec la griffe-faucille du 2e doigt relevée + griffures | ✅ prédateur |
| 7 | **Ptérosaures** (volant) | de grandes ailes de peau déployées + crête de tête | ❌ |
| 8 | **Énaliosaures** (mer) | un long cou + une nageoire-palette qui émerge des vagues (SANS cadre) | ❌ |
| 9 | **Avant les dinos** (Dimétrodon) | silhouette de Dimétrodon à grande voile dorsale (PAS de sablier) | ❌ |

> **Finaux Lunii 2026-06-17** rangés dans [`studio/dino/content/lunii/familles/`](../../../../ProjetsPerso/Claude_Projects/MaxPlay/studio/dino/content/lunii/) + couverture 4:3 « toutes les familles ». INDEX : `studio/dino/content/lunii/INDEX.md`.
> 🔒 **FOND NOIR NATIF** (figé 2026-06-17, clarifié Papa Yann) : composer **directement sur fond noir** (sujet clair/blanc qui brille), PAS générer fond clair puis inverser. **L'inversion post n'est pas belle** — on demande à ChatGPT un fond noir dès le départ. `to-lunii.sh` ne fait plus que le redimensionnement 320×240 / 16 gris (pas d'inversion).
> ⚠️ **Piège ChatGPT récurrent** : il ajoute souvent un **cercle/médaillon** autour (vu sur énaliosaure + ornithopode). Toujours exiger « fond noir uni, SANS cadre, SANS cercle ».

## Prompt-type (remplacer le SUJET)

> Crée une image. Pictogramme d'encyclopédie pour enfants, style dessin au contour net et clair sur **FOND NOIR UNI**, ombrage en niveaux de gris, le sujet en blanc/gris clair qui ressort sur le noir, AUCUNE couleur (niveaux de gris uniquement), sans texte, emblème centré. Sujet : **<SUJET de la famille>**. PAS de dinosaure entier identifiable, juste l'emblème. Composition simple, lisible, pensée pour un petit écran basse résolution. Fond noir uni, SANS cadre, SANS cercle, SANS médaillon.

Pour une **série cohérente** : générer dans le même chat ChatGPT, et préfixer les prompts suivants par « même style exactement que la première image ».
