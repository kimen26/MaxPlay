# HO-MJ-09 — Coloriage dino (mj-32) · nom en lettres creuses coloriables + sous-menu Décors

> Statut : pret · Ouvert le 2026-09-08 · Exécutant : 1 sous-agent Sonnet · Orchestrateur : session principale.
> Origine : deux idées de Papa Yann le 2026-09-08, tranchées le même jour.
> Prérequis : HO-MJ-08 (halo blanc + audio de fin) est livré et poussé — partir de `master` à jour.

## Les deux demandes (mots de Papa Yann)

1. « Quand on sélectionne un dino à colorier, qu'on écrive le nom en bas par exemple, et qu'on puisse
   colorier les lettres de son nom. »
2. « Ça serait cool de pouvoir ajouter des plantes ou un fond paysage, désert, nature, montagne, neige,
   dans un sous-menu s'il veut. »

## Décisions déjà tranchées — ne pas les rouvrir

| Sujet | Décision Papa Yann (2026-09-08) |
|---|---|
| Casse du nom | **MAJUSCULES uniquement.** Lettres creuses (contour épais, intérieur blanc) dans lesquelles Max peut colorier ou écrire au doigt. |
| Choix des décors | **Tous les fonds proposés pour tous les dinos.** Aucun filtre par biome ni par époque. |

## Périmètre

Deux chantiers, à livrer **dans cet ordre**, le premier étant autonome :

### Chantier A — le nom en lettres creuses

Sous le dino, dans le **même canvas**, le nom du dino en majuscules creuses. Chaque lettre est une zone
fermée, donc coloriable par le flood fill existant, sans aucune mécanique nouvelle.

- Le texte est dessiné **avant** que `buildContourMask` ne tourne, pour que les lettres entrent dans le
  masque de contour comme le reste du dessin. C'est le point clé : dessiner après casserait tout.
- Tracé : `ctx.strokeText` avec un trait épais, jamais `fillText` — il faut du creux, pas du plein.
- Le nom vient de `currentDino.name`, donc il suit déjà la langue du site.
- **Lettres à trous** (O, A, R, P, D, B) : le trou est une zone séparée, c'est voulu et c'est bien.
- **Dimensions** (contrainte parents/P30 Pro, recette à 360 px) : hauteur de lettre ≥ 56 px à l'échelle du
  canvas, trait ≥ 6 px, pour qu'un doigt de 4 ans atteigne l'intérieur d'un O sans rater.
- **Noms longs** : PACHYCEPHALOSAURE fait 17 lettres. À 360 px de large, une seule ligne est illisible.
  Couper sur deux lignes, ou réduire la taille jusqu'à un plancher, jamais en dessous du plancher.
  Mesurer avec `ctx.measureText` et vérifier le cas le plus long du catalogue.
- Le canvas grandit en hauteur pour accueillir le nom. Vérifier que l'atelier **ne gagne pas d'ascenseur**
  (règle transverse zéro scroll, déjà testée par `mj-32.spec.mjs`).
- La galerie et la réédition doivent continuer de marcher : les fills sont en coordonnées normalisées,
  donc un canvas plus haut change les proportions. **Vérifier qu'une œuvre sauvegardée AVANT ce chantier
  se rouvre toujours correctement**, ou décider explicitement (et le dire dans le rapport) que les
  anciennes œuvres se rouvrent sans le nom.

Option à évaluer, **pas à figer** : « écrire dedans » peut aussi vouloir dire suivre le tracé au doigt
(geste de graphisme, pas de remplissage). Ce serait une mécanique nouvelle. L'exécutant livre le
coloriage des lettres, et **signale dans son rapport** ce que coûterait le tracé au doigt, sans le faire.

### Chantier B — le sous-menu Décors

Un bouton dans l'atelier ouvre un choix de fonds. Un fond choisi est composé **derrière** le dino, puis
le masque de contour est recalculé sur l'ensemble : le décor devient coloriable comme le reste.

- 5 fonds au trait : désert, forêt, montagne, neige, volcan. Tous proposés pour tous les dinos.
- Un fond = un lineart, trait épais, grandes zones (ciel, sol, montagne, arbres) — c'est justement la
  grande surface à remplir qui plaît.
- **Inventaire déjà fait par l'orchestrateur — partir de là, ne rien générer avant de l'avoir regardé :**

  | Ressource | Où | État |
  |---|---|---|
  | 14 PNG de décor détourés, fond transparent : `cactus`, `fougere`, `palmier`, `sapin`, `rocher`, `volcan_fumant`, `cratere`, `geyser`, `nuage_blanc`, `nuage_gris`, `buisson_fleurs`, `etoile_filante`, `meteorite_feu`, `arret_bus` | `site/img/decor/` | Existent. Leur README les décrit comme « réserve indexée pour un futur usage (décors mini-jeux) » — c'est exactement ce chantier. |
  | Consommateur de ces PNG | `site/js/decor.js` (`Decor.html(id, opts)`) | Existe, ex-consommateur `index2.html` abandonné. |
  | 19 plantes documentées (fiches, images photo) | `site/js/dinos-plantes.js`, `site/img/dinos/plantes/` | Existent, mais ce sont des **images de fiche**, pas des linearts à colorier. |

  **La question des assets est tranchée et RÉSOLUE (2026-09-08).** Papa Yann a retenu la voie 3 : de vrais
  fonds au trait. Ils sont **déjà produits, vérifiés et commités** — rien à générer :

  | Fond | Fichier |
  |---|---|
  | Désert | `site/img/dinos/paleoart/fond_desert_coloriage.webp` |
  | Forêt | `site/img/dinos/paleoart/fond_foret_coloriage.webp` |
  | Montagne | `site/img/dinos/paleoart/fond_montagne_coloriage.webp` |
  | Neige | `site/img/dinos/paleoart/fond_neige_coloriage.webp` |
  | Volcan | `site/img/dinos/paleoart/fond_volcan_coloriage.webp` |

  Ils sont en 1536x1024 (format paysage, alors que les coloriages de dinos sont carrés), en RGB, noir et
  blanc pur vérifié au pixel (aucune couleur, plus de 92 % de blanc, gris résiduel limité à l'anti-aliasing
  du trait). Chacun a le **centre volontairement vide** : c'est là que le dino se pose. Les PNG couleur de
  `site/img/decor/` ne servent PAS à ce chantier, les laisser où ils sont.
- **Composition : le fond est en paysage (1536x1024), le coloriage de dino est carré (environ 1254x1254).**
  Les deux ne se superposent donc pas tels quels. C'est la principale décision technique du chantier, à
  trancher et à justifier dans le rapport. Deux pistes raisonnables : garder le canvas carré et poser le
  fond centré en le recadrant, ou passer le canvas au format paysage et centrer le dino dedans. Attention
  dans les deux cas : le masque de contour, l'historique des remplissages en coordonnées normalisées et la
  galerie dépendent des dimensions du canvas. Vérifier explicitement qu'une œuvre déjà sauvegardée se
  rouvre toujours correctement, ou trancher et le dire.
- Le dino doit rester **au-dessus** du fond : là où les deux traits se croisent, c'est celui du dino qui
  doit gagner, sinon sa silhouette se perd dans le décor.
- Changer de fond en cours de route : décider ce qui arrive aux couleurs déjà posées et le dire. Le plus
  simple et le plus honnête pour un enfant est de demander confirmation si le dessin n'est pas vierge.
- L'entrée du décor doit être **sauvegardée dans l'œuvre** (`{dinoId, decorId, fills}`), sinon la
  réédition depuis la galerie ne retrouve pas le décor et le rejeu des fills tombe à côté.
- Les stickers plantes posés au tap (entrée `{type:'sticker'}` dans l'historique) sont une **étape
  ultérieure**, hors de ce handoff. Ne pas les commencer.

## Fichiers possédés

- `site/mj-32.html`
- `studio/minijeux/i18n/**` et les bundles `site/js/i18n/mj-strings.*.js` si une chaîne nouvelle apparaît
  (libellé du bouton Décors, noms des fonds) — dans les 4 langues, via les outils existants.
- Les assets de décor, seulement s'ils existent déjà ou après accord de l'orchestrateur.

Pas de `git commit`, pas de `git push`, pas de `git add` global : l'orchestrateur commite. Le working tree
est partagé avec d'autres sessions.

## Portes

```
cd studio/minijeux/tests && node audit-gabarit.mjs mj-32 && npm run mj:test mj-32
```

`mj:test mj-32` doit rester à 27/27 assertions fonctionnelles. Un seul FAIL est toléré, celui du smoke
console, causé par un asset absent du repo (`Scelidosaurus_coloriage.webp`) sans rapport avec ce chantier.
Tout nouveau FAIL est un vrai échec.

Playwright, à 360 px de large, **captures ouvertes et regardées une par une** :

1. Un dino à nom court, un à nom long (PACHYCEPHALOSAURE) : le nom tient, lisible, sans débordement.
2. Colorier trois lettres de couleurs différentes, dont l'intérieur d'un O : chaque lettre se remplit
   seule, la couleur ne bave pas d'une lettre à l'autre.
3. Aucun ascenseur dans l'atelier, ni à 360 px ni à 320 px.
4. Un décor appliqué : le ciel se colorie, le dino reste indépendant du fond.
5. Sauvegarder, rouvrir depuis la galerie : nom et décor reviennent, couleurs identiques.
6. `?lang=en` : le nom affiché et les libellés du menu Décors sont en anglais.

Attention méthode, leçon L-112 : le canvas écoute `pointerdown`. Un `MouseEvent('mousedown')` synthétique
ne déclenche rien et produit des mesures qui décrivent une page vierge. Utiliser un vrai clic Playwright,
et fermer le panneau de règle avant de cliquer dans le dessin.

## Rapport attendu

`studio/minijeux/docs/handoffs/rapports/HO-MJ-09-rapport.md` : ce qui a changé, chemins des captures,
comportement retenu pour les anciennes œuvres de la galerie, assets de décor trouvés ou manquants, coût
estimé du tracé au doigt (sans l'implémenter), et tout ce qui n'a pas pu être vérifié.

Tout chiffre de performance annoncé doit être mesuré sur un vrai clic et reproductible (L-112).
