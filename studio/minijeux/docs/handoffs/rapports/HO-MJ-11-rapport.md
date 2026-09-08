# HO-MJ-11 — Niveau familles dans l'écran de choix de mj-32

> Demande Papa Yann : « peut etre ajouter un menu des famille à dessiner ? dans le truc des dessin,
> 71 dino en ligne c'est dur ! »

## Ce qui a été fait

Ajout d'un premier niveau de choix par FAMILLE dans l'écran de choix de `site/mj-32.html`
(l'atelier coloriage), avant la grille des dinos. L'enfant tape une carte famille (emoji + label
+ dégradé, données `DINO_FAMILLES` de `site/js/dinos-data.js`, réutilisées telles quelles, aucune
donnée réinventée), puis voit la grille des dinos de cette famille uniquement.

- **11 familles** affichées (`DINO_FAMILLES`), chacune avec son `emoji`, son `label` et son `bg`
  (dégradé) déjà définis — cohérent visuellement avec le reste de l'encyclopédie.
- **Grille dino filtrée** par `d.famille === familyId` (champ déjà présent sur les 71 dinos,
  aucune donnée manquante trouvée).
- **Bouton retour dédié** `#backFamilyBtn` (« 🔙 Les familles »), 56px de haut, visible seulement
  dans la sous-vue dino. Le bouton `←` du header (`.hdr`) fait aussi ce même geste en un tap
  (délégation étendue à 3 niveaux : grille dino → familles → menu principal).
- **`backToChoice()`** (appelé par "Autre dino" en atelier et "Colorier un autre dino !" en
  galerie) revient à la grille dino de la MÊME famille si une famille était active, sinon aux
  familles — cas courant : l'enfant recolorie un autre dino du même groupe sans repasser par
  l'écran des familles.

## Familles sans coloriage : sort choisi

**Aucune des 11 familles n'est actuellement vide** — comptage exact (asset
`_coloriage.webp` présent sur disque, par famille) :

```
trex 13/13 · cou_long 7/7 · arme 7/8 · cornu 6/6 · bec 6/6 · raptor 8/8
pterosaures 3/3 · enaliosaures 7/7 · volant 5/5 · mammiferes 7/7 · oiseaux 1/1
```

(Le seul manquant, Scelidosaurus dans "arme", laisse cette famille à 7/8 — toujours non vide.)

Mais le cas défensif est codé quand même, car ça arrivera (nouveau dino sans coloriage encore
généré) : `markFamilyAvailability()` précharge en tâche de fond le coloriage de chaque dino
(`new Image()`, silencieux) et **retire la carte famille du DOM** si aucun de ses dinos n'a de
coloriage chargeable. La grille familles s'affiche d'abord de façon optimiste (les 11 cartes),
puis se corrige dès que le préchargement répond — jamais de blocage de l'écran de choix pour ce
test, jamais d'écran blanc sans explication.

Vérifié par un test manuel (route Playwright interceptant les 3 coloriages de la famille
`pterosaures` en échec réseau) : la carte `pterosaures` disparaît bien de la grille dans ce cas,
les 10 autres restent.

## Piège de méthode déjà rencontré, évité ici

Le layout `.family-grid` utilise `display:grid` avec `repeat(auto-fill, minmax(140px,1fr))` —
pas de `flex` sans `wrap` (piège documenté en commentaire dans le CSS de mj-32.html même,
lignes 63-70, rencontré le jour même sur `.atelier-top`). Mesuré, pas supposé : voir section
captures ci-dessous, `getBoundingClientRect()` de chaque carte à 360px ET 320px, aucune ne
déborde (`left >= 0` et `right <= innerWidth` pour les 11 cartes, aux deux largeurs).

## Fichiers modifiés

- `site/mj-32.html` — CSS `.family-grid`/`.family-card`/`#backFamilyBtn`, markup 2 sous-vues
  dans `#screenChoice` (`#familyView` / `#dinoView`), JS : `buildGrid(familyId)` (paramétré,
  avant sans argument), `buildFamilyGrid()`, `markFamilyAvailability()`, `openFamily()`,
  `backToFamilies()`, `backToChoice()` étendu, délégation header étendue, `applyStaticUi()`
  complété (2 nouvelles clés).
- `studio/minijeux/tests/mj-32.spec.mjs` — scénario adapté : ouverture explicite de la famille
  "trex" (celle du Cryolophosaure, cas de brèche déjà testé) avant d'accéder à `#grid`, + 5
  nouvelles assertions (grille familles affichée, dino-grid pas encore affichée, cartes dans le
  viewport, famille trex présente, bouton retour visible).
- `studio/minijeux/i18n/{fr,en,es-es,pt-br}/strings.json` — 2 nouvelles clés
  `mj-32.ui.choisisUneFamille` et `mj-32.ui.lesFamilles`. Les noms de famille eux-mêmes
  (`DINO_FAMILLES[].label`) ne sont **pas** traduits ici : ils viennent de `dinos-data.js` et
  sont déjà couverts par le mécanisme `dinos-i18n.js` (`DINO_STRINGS.familles`) — non touché.
- `site/js/i18n/mj-strings.{en,es-es,pt-br}.js` — régénérés via
  `node studio/minijeux/tools/_gen-mj-strings-bundle.cjs <lang>` (pas de bundle FR, le FR est le
  fallback en dur du code).

## Portes

```
cd studio/minijeux/tests
node audit-gabarit.mjs mj-32
  → 0 BLOQUANT, 1 dette pré-existante (hex palette couleurs coloriage, sans rapport)

npm run mj:test mj-32
  → 32 PASS / 33 assertions
  → 1 FAIL : "Aucune erreur JS / console (smoke)" — ERR_FILE_NOT_FOUND, asset
    Scelidosaurus_coloriage.webp absent du repo. Pré-existant (déjà signalé dans
    docs/jeux/figees/mj-32.md § Test : "hors 6 ERR_FILE_NOT_FOUND pré-existants"),
    exactement le FAIL toléré annoncé dans la consigne, sans rapport avec ce chantier.
```

## Captures (Playwright, vrais événements, panneau règle fermé avant mesure — L-112)

Dossier scratchpad de session (non commité) :
`ho-mj-11/w360-1-familles.png` — écran familles, 360px, 11 cartes visibles (5 pleines lignes +
1 entamée), dégradés/emojis identiques à l'encyclopédie.
`ho-mj-11/w360-2-famille-ouverte.png` — famille "trex" ouverte, bouton "🔙 Les familles" visible.
`ho-mj-11/w360-3-retour-familles.png` — retour aux familles via le bouton, identique à l'écran 1.
`ho-mj-11/w320-*.png` — mêmes 3 écrans à 320px : la grille passe naturellement à 1 colonne
(`auto-fill, minmax(140px,1fr)`), rien ne déborde, bouton retour toujours ≥48×48 (mesuré 147×56).

Mesures `getBoundingClientRect()` executées et vérifiées (pas juste "page ne défile pas") :
- 360px : 11 cartes, aucune avec `left<0` ou `right>360`.
- 320px : 11 cartes (1 colonne), aucune avec `left<0` ou `right>320`.
- `#backFamilyBtn` : 147×56px, toujours dans le viewport aux deux largeurs.

## Ce que je n'ai pas pu / pas dû vérifier

- **Autres langues (en/es-es/pt-br) à l'écran** : je n'ai pas capturé de screenshot en langue
  non-FR. Le mécanisme `applyDinoStrings()` qui traduirait `DINO_FAMILLES[].label` **n'est
  actuellement appelé nulle part dans mj-32.html** (vérifié par grep : zéro appel dans tout
  `site/`, seule la définition dans `dinos-i18n.js`) — donc les noms de famille resteront en FR
  même si le site est en `en`/`es-es`/`pt-br`, comme c'est déjà le cas aujourd'hui pour les
  76 noms de dinos affichés sous chaque vignette (`d.name`). C'est un état préexistant, hors du
  périmètre de ce chantier (fichiers autorisés : écran de choix, pas le pipeline i18n dino) —
  je le signale plutôt que de le corriger sans mandat.
- Je n'ai pas relancé le harnais complet (`run-all.mjs`) sur l'ensemble des mini-jeux : seul
  mj-32 était dans mon périmètre, et `audit-gabarit.mjs`/`mj:test` ciblés sur mj-32 sont les
  portes demandées.
- Le canvas de l'atelier, le zoom, les décors et le nom du dino n'ont pas été touchés
  (périmètre respecté) — leurs 24 assertions du spec existant restent inchangées et passent.
