# 🎒 Images Lunii — Encyclopédie dino (menu « Les familles »)

> Visuels destinés à la **boîte Lunii** (conteuse audio). Affichés à l'écran pendant que la voix raconte, sur les **nœuds de menu « familles »** de l'encyclopédie dino.
> Produits via le skill global [`dino-images-lunii`](../../../../../Users/kimen/.claude/skills/dino-images-lunii/SKILL.md) (pilotage ChatGPT + conversion). Réf de style figée : **Théropodes V3**.

## Format Lunii (contrainte technique)

- **320×240 px**, **16 niveaux de gris** (posterisé), **sans alpha**.
- **FOND NOIR NATIF, sujet BLANC** (figé 2026-06-17) : meilleur rendu sur l'écran Lunii, le sujet « brille » et le vide disparaît. **Les images doivent être CONÇUES pour fond noir dès la dérivation** (pas une inversion post-production). Composition pensée sombre = meilleur contraste.
- La boîte stocke en **BMP RLE4** ; STUdio convertit le PNG au transfert.
- **Conception** : ChatGPT génère un dessin **directement sur fond NOIR** (brief : « fond noir d'emblée, composition sombre »). PNG final 320×240 16 gris = directement bon pour Lunii. Pas d'inversion post.
- `familles/` = PNG finaux (ce que Max verra). `_sources-hd/` = sources couleur HD ChatGPT (pour re-dériver si besoin, gratuit). À REFAIRE avec brief « fond noir natif ».

## Mapping menu → image

Le menu « Les familles » de l'encyclopédie (source noms : [`site/js/dinos-data.js`](../../../../site/js/dinos-data.js)) + une **couverture de section**. Le compte de familles fait foi dans [`memory/INVARIANTS.md`](../../memory/INVARIANTS.md) — toutes ont leur emblème depuis 2026-07-31.

| Nœud menu | Image (320×240) | Famille (nom scientifique) | id data | Emblème |
|-----------|-----------------|----------------------------|---------|---------|
| Couverture « Toutes les familles » | [`familles/00-cover-toutes-familles.png`](familles/00-cover-toutes-familles.png) | — (scène de groupe) | — | 6 dinos de familles différentes, format 4:3 plein cadre |
| Famille 1 | [`familles/01-theropodes.png`](familles/01-theropodes.png) | **Théropodes** | `trex` | 2 grosses pattes griffues + viande à l'os + griffures (prédateur) |
| Famille 2 | [`familles/02-sauropodes.png`](familles/02-sauropodes.png) | **Sauropodes** | `cou_long` | long cou ondulant montant vers une feuille |
| Famille 3 | [`familles/03-thyreophores.png`](familles/03-thyreophores.png) | **Thyréophores** | `arme` | dos à plaques + pics + queue-massue |
| Famille 4 | [`familles/04-ceratopsiens.png`](familles/04-ceratopsiens.png) | **Cératopsiens** | `cornu` | tête ornée, plein de cornes + collerette à pics |
| Famille 5 | [`familles/05-ornithopodes.png`](familles/05-ornithopodes.png) | **Ornithopodes** | `bec` | crête tubulaire Parasaurolophus + bec plat + main Iguanodon à pouce-poignard |
| Famille 6 | [`familles/06-dromaeosaures.png`](familles/06-dromaeosaures.png) | **Dromæosaures** | `raptor` | patte emplumée + griffe-faucille du 2e doigt relevée + griffures (prédateur) |
| Famille 7 | [`familles/07-pterosaures.png`](familles/07-pterosaures.png) | **Ptérosaures** | `pterosaures` | grandes ailes de peau déployées + crête |
| Famille 8 | [`familles/08-enaliosaures.png`](familles/08-enaliosaures.png) | **Énaliosaures** | `enaliosaures` | long cou + nageoire-palette émergeant des vagues |
| Famille 9 | [`familles/09-avant-les-dinos.png`](familles/09-avant-les-dinos.png) | **Avant les dinosaures** | `volant` | Dimétrodon à grande voile dorsale (1 seul membre : pas un dino, cousin des mammifères) |
| Famille 10 | [`familles/10-mammiferes.png`](familles/10-mammiferes.png) | **Mammifères** | `mammiferes` | 2 défenses de mammouth recourbées en croix + touffe de fourrure laineuse + flocons (signe de l'âge de glace) |
| Famille 11 | [`familles/11-oiseaux.png`](familles/11-oiseaux.png) | **Oiseaux** | `oiseaux` | grande plume détaillée croisant une patte écailleuse à griffes (dit la filiation dinosaure → oiseau) |

## Charte de style (figée — voir skill)

- Style C : dessin BD **contour net** + **ombrage gris simple**, emblème centré, sans texte. (Généré **directement sur fond noir natif**, composition pensée sombre — pas d'inversion post.)
- **Emblème-concept** (élément signature de la famille), pas un portrait de dino-star.
- **Griffures** = signature d'énergie réservée aux **prédateurs** (Théropodes, Dromæosaures uniquement).
- **Jamais de cadre/cercle/médaillon** autour (incident récurrent ChatGPT — toujours exiger « fond uni, sans cadre »).

## Ce fichier = CATALOGUE. Le PROCESS vit ailleurs.

> 👉 **Point d'entrée des tâches Lunii** (produire → stocker → assembler → distribuer) : [`studio/lunii/CLAUDE.md`](../../../lunii/CLAUDE.md) (chargé auto par le rule [`.claude/rules/lunii.md`](../../../../.claude/rules/lunii.md)).
> Ici = juste le **catalogue des images** (mapping ci-dessus) + leurs sources.

- Produire/ajouter une image : skill [`dino-images-lunii`](../../../../../Users/kimen/.claude/skills/dino-images-lunii/SKILL.md). Specs par dino : [`../sources/fiches/_FICHES-DINOS-GROKIPEDIA.md`](../sources/fiches/_FICHES-DINOS-GROKIPEDIA.md).
- ⚠️ **EP-D17 en cours** : les `familles/*.png` **00 à 09** sont l'ancien rendu (inversion post). À **régénérer en fond noir NATIF** (voir [`../../memory/TODO.md`](../../memory/TODO.md)).
  **10-mammiferes et 11-oiseaux font exception** : produits le 2026-07-31 directement en fond noir natif (composition pensée sombre dès le prompt), ils sont déjà conformes — les prendre comme référence de style pour régénérer les 9 autres.

---

_Créé 2026-06-17 : 9 emblèmes de familles + couverture pour la Lunii, produits par le skill `dino-images-lunii`. Réf de style figée = Théropodes V3._
