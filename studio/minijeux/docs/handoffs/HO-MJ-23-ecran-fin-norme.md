# HO-MJ-23 — Écran de fin normé : quatre emplacements fixes, bleu pour La suite, armoire à la place de la maison

> Statut : **prêt, en attente de la décision de Papa Yann** (question 3 du dossier
> `docs/research/2026-09-19-brainstorm-mj-dino.md`). Ticket EP-135.
> Fichier possédé : `site/js/mj-golden.js` (`showEnd()`, l.412-445) + le CSS `.end-btns`
> (`site/css/mp-theme.css` ou équivalent, à localiser) + 5 MP3 courts dans `site/sounds/`.
> Portée : les 36 mini-jeux d'un coup, aucun `mj-XX.html` touché.
> Portes : `npm run mj:test` (36/36), `audit-gabarit.mjs`, captures 360 × 640 et 320 × 568
> de l'écran de fin dans les 4 cas (avec/sans gain × avec/sans suite).

## 1. Pourquoi

Aujourd'hui « Au nid » et « La suite » sont conditionnels. Le bouton Maison n'est donc
jamais au même endroit d'un écran de fin à l'autre. Pour une main de 4 ans qui apprend
un geste par répétition, c'est le défaut principal, avant les couleurs. Ensuite, le bouton
jaune « La suite » partage l'écran avec les billes jaunes qui, elles, veulent dire
« deuxième essai » : deux sens pour une couleur. Enfin, le pictogramme maison ment
depuis que l'accueil est une armoire (D-025) : la miniature doit montrer ce qu'on va voir.

## 2. Ce qui change

| Emplacement | Bouton | Couleur | Pictogramme | Toujours affiché ? |
|---|---|---|---|---|
| 1 (gauche) | Encore | `#00c47a` vert, inchangé | 🔄 | oui, action principale, 56 px de haut minimum |
| 2 | Au nid | `#ff8fb8` rose, inchangé | œuf (jamais le meuble) | seulement si gain ; sinon **trou vide de même largeur** |
| 3 | La suite | **`#4d9de0` bleu**, texte `#ffffff` | → | seulement si jeu suivant ; sinon trou vide |
| 4 (droite) | Armoire | `#ffffff22`, inchangé | **petite armoire fermée** (sprite `site/img/armoire/`) | oui, le plus discret |

Règles :
- Un bouton absent laisse un trou et ne décale pas ses voisins : grille CSS 4 colonnes
  fixes, pas de flex qui recompacte.
- Chaque bouton = couleur distincte + pictogramme distinct + texte. Jamais texte seul.
- Le badge 🥚 décoratif (`nestBadge`) garde sa logique actuelle (posé sur Suite et
  Armoire seulement quand un œuf attend d'une visite précédente sans gain cette partie).
- Audio : **au tap-down** de chaque bouton, un MP3 court dit son mot (« Encore ! »,
  « Au nid ! », « La suite ! », « L'armoire ! »), le relâché navigue. Pas de consigne lue
  à l'affichage : elle casserait la célébration (EP-033). Padding 250 ms en tête de
  chaque MP3, un seul son à la fois (couper le son de victoire en cours au tap-down).
- Contraste ≥ 4.5:1 sur chaque couple fond/texte (vérifier le bleu avec texte blanc :
  `#4d9de0` sur blanc est à ~3.2:1, donc **texte sombre `#0b2a4a`** ou bleu plus
  foncé `#2f7fc4`). À mesurer, pas à deviner.
- Largeur 360 px : 4 colonnes de 80 px minimum, gouttière 8 px, ça tient. À 320 px les
  libellés passent sur 2 lignes sans hauteur fixe.

## 3. Ce qui ne change pas

Le séquencement œuf puis étoile puis boutons, les délais `dly`, la piste de billes, les
compliments de processus, les URLs (`index.html?open=nid`, `index.html`), `data-act`
(les specs Playwright s'en servent).

## 4. À graver après livraison

- STANDARD-MJ Pilier 5 : « Les quatre emplacements de l'écran de fin sont fixes. Bleu =
  la suite, vert = encore. L'icône nid montre l'œuf, l'icône accueil montre l'armoire. »
- Figée transverse (nouvelle ligne 🔒 dans la figée commune, pas par jeu).
- i18n : 4 clés `_commun` (`encoreBoutonFin`, `nidBoutonFin` existe, `suiteBoutonFin`,
  `armoireBoutonFin`) × 4 `strings.json`.

## 5. Recette

Captures Playwright 360 × 640 et 320 × 568 pour les 4 combinaisons, ouvrir chaque
capture. Puis Papa Yann sur P30 Pro : trois jeux de suite, le doigt trouve « Encore »
sans regarder à la 3ᵉ partie.
