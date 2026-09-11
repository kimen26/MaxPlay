# HO-MJ-10 — Coloriage dino (mj-32) · zoom pour les clics de précision

> Statut : pret · Ouvert le 2026-09-08 · Exécutant : 1 sous-agent Sonnet · Orchestrateur : session principale.
> Origine : demande de Papa Yann le 2026-09-08.
> Prérequis : HO-MJ-08 livré. HO-MJ-09 chantier A (nom en majuscules coloriables) touche le MÊME fichier —
> attendre qu'il soit commité avant de lancer celui-ci. Ne jamais faire tourner les deux en parallèle.

## La demande (mots de Papa Yann)

« J'aimerais bien qu'il puisse zoomer dans son dino et faire des clics de précision pour remplir les
couleurs de certains, mais il faut que ce soit fluide et simple, avec un bouton pour sortir du zoom
en normal. »

Trois exigences, dans cet ordre : **précision**, **fluidité**, **simplicité**. Plus un **bouton de retour
à la vue normale**, explicitement demandé.

## Le contexte à connaître avant de coder

- Le coloriage vise un enfant de 4 ans sur un P30 Pro. Certaines zones (griffes, dents, petites écailles,
  et depuis HO-MJ-09 l'intérieur des lettres) sont plus petites qu'un doigt : c'est le problème à résoudre.
- `site/mj-32.html` pose `user-scalable=no` dans sa balise viewport, donc **le zoom natif du navigateur est
  bloqué**. Max ne peut pas pincer pour agrandir. Le zoom maison doit donc suffire à lui seul. Ne pas
  retirer cette balise sans mesurer ce que ça casse : `touch-action:none` sur le canvas et le pincement
  natif se marchent dessus.
- L'atelier ne doit **jamais** gagner d'ascenseur (règle transverse, déjà testée).

## La voie recommandée (vérifiée par l'orchestrateur avant d'écrire ce handoff)

**Zoomer en CSS, pas en redimensionnant le canvas.**

`canvasPointFromEvent` convertit un tap en pixel du dessin via `getBoundingClientRect()`, qui reflète déjà
toute transformation CSS appliquée à l'élément. Donc un `transform: scale()` sur le canvas rend le tap
juste **sans toucher au calcul**, et le flood fill continue de travailler dans les pixels d'origine. C'est
la solution la plus simple qui marche, et elle évite le piège classique du décalage entre le doigt et la
couleur posée.

À l'inverse, agrandir le canvas lui-même (`canvas.width`) invaliderait le masque de contour, l'historique
des remplissages et la galerie. **Ne pas faire ça.**

Conséquences à traiter :
- Le canvas zoomé dépasse de son cadre. Il faut un conteneur qui recadre (`overflow:hidden`) et permette
  de déplacer la vue, sans jamais faire scroller la page elle-même.
- Se déplacer dans le dessin zoomé : au doigt (glisser) est le plus naturel. Mais **glisser sert déjà à
  rien aujourd'hui, et taper sert à colorier** — il faut donc distinguer un tap d'un glissement. Règle
  simple et éprouvée : si le doigt a bougé de moins d'un petit seuil, c'est un tap, donc on colorie ;
  au-delà, c'est un déplacement, donc on ne colorie pas. Sinon Max déplacera la vue et repeindra sans
  le vouloir.

## Décision de conception laissée à l'exécutant, à justifier dans le rapport

Comment on entre dans le zoom. Deux options, **choisir la plus simple à comprendre pour un enfant de
4 ans**, et dire pourquoi :

- **(a) Un bouton loupe qui zoome sur le centre**, puis on déplace au doigt. Très simple, peu de gestes.
- **(b) Un bouton loupe qui arme le zoom, puis le prochain tap zoome à cet endroit.** Plus précis, mais
  demande de comprendre un mode.

Dans les deux cas, **un seul niveau de zoom** suffit (autour de 2,5 à 3 fois). Ne pas construire un zoom
continu à plusieurs crans : c'est de la complexité que la demande n'exige pas.

Le **bouton de sortie est obligatoire** et doit être visible en permanence pendant le zoom, pas caché dans
un coin. Libellé explicite, pas seulement une icône.

## Contraintes non négociables

- Cible tactile 48x48 px minimum, 56 px pour l'action principale. Recette à 360 px de large, rien ne casse
  à 320 px.
- Le zoom ne change **rien** aux données : `fillHistory` reste en coordonnées normalisées, une œuvre
  coloriée en zoom se rouvre identique en vue normale. À vérifier explicitement.
- Sortir du zoom ne doit **jamais** effacer une couleur posée.
- Fluidité : le zoom et le déplacement passent par une transformation CSS, donc par le compositeur. Ne pas
  redessiner le canvas à chaque mouvement de doigt.
- Aucune valeur en dur : facteur de zoom, seuil de déplacement et durée d'animation sont des constantes
  nommées, commentées.

## Fichiers possédés

- `site/mj-32.html`
- `studio/minijeux/i18n/**` et bundles `site/js/i18n/mj-strings.*.js` pour les libellés nouveaux
  (bouton loupe, bouton retour), dans les 4 langues via les outils existants.

Pas de git : le working tree est partagé entre sessions, l'orchestrateur commite.

## Portes

```
cd studio/minijeux/tests && node audit-gabarit.mjs mj-32 && npm run mj:test mj-32
```

Les assertions fonctionnelles doivent toutes rester PASS. Un seul FAIL est toléré, le smoke console, causé
par un asset absent du repo (`Scelidosaurus_coloriage.webp`), sans rapport avec ce chantier.

Playwright à 360 px, **captures ouvertes et regardées une par une** :

1. Zoomer, puis colorier une petite zone (une griffe, une dent, ou l'intérieur d'une lettre) : la couleur
   tombe exactement sous le doigt. C'est le test central, celui qui prouve que la conversion est juste.
2. Comparer la même zone coloriée en vue normale et en zoom : même zone remplie, au pixel près.
3. Se déplacer dans le dessin zoomé sans poser de couleur par accident.
4. Le bouton de sortie ramène à la vue normale, toutes les couleurs intactes.
5. Sauvegarder une œuvre coloriée en zoom, la rouvrir depuis la galerie : identique.
6. Aucun ascenseur, ni à 360 px ni à 320 px, zoom actif ou non.
7. La page elle-même ne bouge pas quand le doigt glisse sur le canvas zoomé.

Piège de méthode, leçon L-112 : le canvas écoute `pointerdown`. Un `MouseEvent('mousedown')` synthétique
ne déclenche rien et produit des mesures décrivant une page vierge. Utiliser de vrais événements Playwright,
et fermer le panneau de règle avant de cliquer dans le dessin. Tout chiffre annoncé doit être reproductible.

## Rapport attendu

`studio/minijeux/docs/handoffs/rapports/HO-MJ-10-rapport.md` : l'option d'entrée dans le zoom retenue et
pourquoi, le facteur de zoom choisi, comment tap et glissement sont distingués, les captures, et tout ce
qui n'a pas pu être vérifié.
