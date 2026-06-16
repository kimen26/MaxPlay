# 🎒 Images Lunii — Encyclopédie dino (menu « Les familles »)

> Visuels destinés à la **boîte Lunii** (conteuse audio). Affichés à l'écran pendant que la voix raconte, sur les **nœuds de menu « familles »** de l'encyclopédie dino.
> Produits via le skill global [`dino-images-lunii`](../../../../../Users/kimen/.claude/skills/dino-images-lunii/SKILL.md) (pilotage ChatGPT + conversion). Réf de style figée : **Théropodes V3**.

## Format Lunii (contrainte technique)

- **320×240 px**, **16 niveaux de gris** (posterisé), **fond gris clair uni**, **sans alpha**.
- La boîte stocke en **BMP RLE4** ; STUdio convertit le PNG au transfert. On conçoit directement en gris contrasté pour maîtriser le rendu.
- `familles/` = PNG finaux (ce que Max verra). `_sources-hd/` = sources couleur HD ChatGPT (pour reconvertir si besoin).

## Mapping menu → image

Le menu « Les familles » de l'encyclopédie (source noms : [`site/js/dinos-data.js`](../../../../site/js/dinos-data.js)) a **9 familles** + une **couverture de section**.

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

## Charte de style (figée — voir skill)

- Style C : dessin BD **contour net** + **ombrage gris simple**, fond gris clair uni, emblème centré, sans texte.
- **Emblème-concept** (élément signature de la famille), pas un portrait de dino-star.
- **Griffures** = signature d'énergie réservée aux **prédateurs** (Théropodes, Dromæosaures uniquement).
- **Jamais de cadre/cercle/médaillon** autour (incident récurrent ChatGPT — toujours exiger « fond uni, sans cadre »).

## Régénérer / ajouter

Voir le skill [`dino-images-lunii`](../../../../../Users/kimen/.claude/skills/dino-images-lunii/SKILL.md) :
`launch-brave.ps1` → `gpt-gen.mjs "<prompt>" out.png` → `to-lunii.sh out.png final.png`.
Spécificités par dino précis : [`../sources/fiches/_FICHES-DINOS-GROKIPEDIA.md`](../sources/fiches/_FICHES-DINOS-GROKIPEDIA.md).

---

_Créé 2026-06-17 : 9 emblèmes de familles + couverture pour la Lunii, produits par le skill `dino-images-lunii`. Réf de style figée = Théropodes V3._
