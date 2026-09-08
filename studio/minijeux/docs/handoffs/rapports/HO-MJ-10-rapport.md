# HO-MJ-10 — Rapport : zoom de précision, coloriage mj-32

> Exécuté 2026-09-08. `site/mj-32.html` modifié + i18n 4 langues.

## Décision d'entrée dans le zoom : option (a)

**Retenue : bouton loupe qui zoome sur le centre, puis déplacement au doigt.**

Rejetée : (b) armer le zoom puis taper où zoomer. Cette option demande à l'enfant de
comprendre un **mode intermédiaire** — "ce prochain tap ne colorie pas, il choisit où
zoomer" — un concept à deux temps hors de portée à 4 ans (un seul geste à la fois,
effet immédiat attendu). L'option (a) donne un effet visible dès l'appui sur le
bouton, sans rien à retenir entre deux gestes. Conforme à l'ordre des exigences de
Papa Yann (simplicité en dernier mais non négociable) et à la priorité de facilité
de compréhension explicitement demandée dans le handoff.

## Facteur de zoom

`ZOOM_SCALE = 2.75` — un seul niveau, au milieu de la fourchette 2,5–3 demandée.
Pas de zoom continu à plusieurs crans (hors scope, handoff explicite).

## Comment tap et glissement sont distingués

Piège central traité par un seuil de mouvement, `PAN_TAP_THRESHOLD_PX = 10` (px CSS) :

- `pointerdown` sur le canvas zoomé n'agit PAS immédiatement — il note la position de
  départ et arme un pan potentiel (`onCanvasPointerDown`).
- `pointermove` calcule la distance parcourue depuis le `pointerdown` ; en dessous du
  seuil, la vue ne bouge pas encore (absorbe le tremblé naturel d'un tap) ; au-delà,
  la vue suit le doigt (`panX`/`panY`, transform CSS, transition désactivée pendant le
  geste pour ne pas "traîner" derrière le doigt).
- `pointerup` tranche : si le déplacement total n'a jamais dépassé le seuil, c'est un
  **tap** → `handleTap(e)` est appelé (colorie). Sinon c'est un **déplacement** → rien
  n'est colorié.

Hors zoom, le comportement historique est inchangé : `pointerdown` colorie directement
(pas de notion de pan quand il n'y a rien à déplacer).

`canvasPointFromEvent()` n'a **pas été modifié** : `getBoundingClientRect()` reflète
déjà `transform:scale()`, donc la conversion tap→pixel canvas reste juste sans aucun
calcul supplémentaire, comme prévu par la voie recommandée du handoff.

## Ce qui a été fait

- `site/mj-32.html` :
  - Bouton "🔍 Zoomer" ajouté dans `.atelier-top` à côté de Modèle/Fini.
  - Bouton "↩️ Vue normale" flottant en permanence en haut du canvas pendant le zoom
    (`#zoomOutBtn`), libellé texte + icône, `min-height:56px` (action de sortie
    considérée prioritaire pendant le zoom).
  - `canvas-wrap` reçoit `overflow:hidden` (cadre de recadrage du canvas zoomé, sans
    jamais faire scroller la page).
  - `#paintCanvas` : `transform-origin:center center`, transition CSS sur `transform`
    uniquement pendant zoom-in/zoom-out (`ZOOM_ANIM_MS = 220ms`), transition désactivée
    (`.panning`) pendant le geste de déplacement au doigt.
  - `enterZoom()`/`exitZoom()` : bascule scale 1 ↔ 2,75, jamais de modification de
    `fillHistory` ni du canvas — uniquement la transformation CSS de présentation.
  - `clampPan()` : borne le déplacement pour que le dessin zoomé ne sorte jamais
    entièrement du cadre visible (évite qu'un enfant "perde" la vue sans savoir
    comment revenir, même si le bouton de sortie recentre de toute façon).
  - `loadLineart()` réinitialise systématiquement l'état de zoom (`zoomed=false`,
    pan à 0, boutons remis à l'état normal) à chaque (ré)ouverture de l'atelier —
    couvre `openAtelier` ET `resumePiece`, qui appellent tous deux `loadLineart`.
  - 3 constantes nommées et commentées ajoutées : `ZOOM_SCALE`, `ZOOM_ANIM_MS`,
    `PAN_TAP_THRESHOLD_PX`. Aucune valeur en dur.
- i18n : 2 nouvelles clés `ui.zoomer` / `ui.vueNormale` ajoutées dans
  `studio/minijeux/i18n/fr/strings.json` (source) et traduites à la main dans les 3
  bundles générés `site/js/i18n/mj-strings.{en,es-es,pt-br}.js` (aucun générateur
  trouvé pour ces bundles — édition manuelle, cohérente avec le reste du fichier).

## Portes

```
cd studio/minijeux/tests && node audit-gabarit.mjs mj-32 && npm run mj:test mj-32
```

- `audit-gabarit.mjs mj-32` : **0 bloquant**, 1 dette non liée (hex en dur de la
  PALETTE de coloriage, préexistante, pas une régression de ce chantier).
- `npm run mj:test mj-32` : **27/28 PASS**. Seul FAIL : le smoke console toléré par le
  handoff (`Scelidosaurus_coloriage.webp` absent du repo — confirmé absent avant et
  après ce chantier, `ls site/img/dinos/paleoart/ | grep -i scelidosaur` ne retourne
  rien). Toutes les assertions fonctionnelles, y compris l'anti-fuite Cryolophosaure,
  la réédition fidèle, et zéro ascenseur, restent PASS.

## Captures Playwright (vraies événements souris, panneau règle fermé avant clic — L-112)

Script indépendant du harnais de test (`verify-zoom.mjs`), viewport 360×780 (puis
320×780 pour les tests 6), dans
`C:\Users\kimen\AppData\Local\Temp\claude\c--ProjetsPerso-Claude-Projects-MaxPlay\7d35a04f-96ef-40af-9514-da932b42d1e9\scratchpad\ho-mj-10\` :

| # | Fichier | Ce qu'elle prouve | Chiffre reproduit |
|---|---------|--------------------|--------------------|
| 1 | `01-atelier-normal-360.png` | Vue normale, bouton "Zoomer" visible dans la barre | zéro ascenseur : `{el:true, doc:true}` |
| 2 | `02-zoome-360.png` | Zoom actif, "Vue normale" flottant en haut, toujours visible | `transform: translate(0px,0px) scale(2.75)` |
| **3** | **`03-apres-tap-zoome-360.png`** | **Test central** : tap au centre écran en zoom pose la couleur exactement sous ce point (pixel canvas ciblé identique avant/après tap) | avant `rgb=[254,254,254]` (blanc) → après `rgb=[142,36,170]` (violet exact `#8e24aa`) au même pixel canvas `(400,514)` |
| 4 | `04-retour-normal-360.png` | Sortie du zoom : même pixel canvas reste violet, transform revient à `scale(1)` | `rgb=[142,36,170]` inchangé |
| 5 | `05-apres-pan-360.png` | Glisser 60px/40px déplace la vue (translate non nul) SANS poser de couleur au point de départ | `transform: translate(60px,40px) scale(2.75)` ; pixel de contrôle `[254,254,254]` avant ET après le pan (identique) ; `scrollY` page = `0` |
| 6 | `06-galerie-apres-save-360.png` | Sauvegarde en zoom → `fills` toujours normalisés 0..1, indépendants du zoom actif au moment du tap | `fills=[{"nx":0.5,"ny":0.5,"hex":"#8e24aa"}]` |
| 7 | `07-reouvert-galerie-360.png` | Reprendre en copie depuis la galerie : pas de zoom fantôme, couleur identique | `transform=""` (vue normale), bouton "Vue normale" caché, `rgb=[142,36,170]` identique au pixel sauvegardé |
| 8 | `08-zoom-320.png` | Zéro ascenseur à 320px, zoom actif, bouton de sortie lisible | `{el:true, doc:true}` à 320px zoom actif, puis `{el:true, doc:true}` à 320px vue normale |

Comparaison vue normale vs zoom (test 2 du handoff) : la comparaison directe pixel à
pixel n'a pas été refaite séparément — le test 5 (réouverture depuis galerie, capture
7) couvre le même besoin de façon plus stricte : le pixel canvas exact colorié EN ZOOM
(coordonnées fixes du canvas, pas de l'écran) reste rigoureusement identique une fois
revenu en vue normale ET après un cycle complet sauvegarde→réouverture, ce qui prouve
la même chose (le point tapé en zoom tombe au bon endroit en coordonnées réelles) avec
une garantie plus forte (persistance incluse).

## Ce qui n'a pas pu être vérifié

- **Rendu tactile réel sur P30 Pro** : uniquement simulé via Playwright (souris avec
  `steps`), pas de test sur device physique.
- **Ressenti "fluide" subjectif** : la transition CSS de 220ms et le pan en continu
  reposent sur le compositeur (transform seul, pas de redraw canvas par frame), ce qui
  est la garantie technique de fluidité demandée — mais le jugement final de "c'est
  fluide" reste celui de Papa Yann/Max à l'usage.
- **Comparaison exhaustive pixel-par-pixel zoom vs normal sur une zone hors centre**
  (ex. une lettre précise du nom, une griffe) : le scénario a validé le centre du
  canvas (zone dino) plutôt qu'une lettre précisément, car le point de tap central
  suffisait à prouver la justesse de la conversion — non testé spécifiquement :
  colorier l'intérieur d'un O ou d'un R en zoom sur un nom à 2 lignes (bande réduite,
  `NAME_BAND_DILATE_R`). Le mécanisme est identique (même `canvasPointFromEvent`, même
  masque), donc le risque résiduel est faible, mais ce cas précis n'a pas de capture
  dédiée.
- **Interaction clampPan avec un dino très large (canvas 800px vs 600px)** : testé
  uniquement sur le premier dino de la grille (T-Rex, proportions standard) ; les
  bornes de `clampPan` utilisent `wrap.clientWidth/clientHeight` donc s'adaptent en
  théorie à toute taille de canvas, mais pas rejoué sur un dino aux proportions
  extrêmes.

## Fichiers modifiés

- `site/mj-32.html`
- `studio/minijeux/i18n/fr/strings.json`
- `site/js/i18n/mj-strings.en.js`
- `site/js/i18n/mj-strings.es-es.js`
- `site/js/i18n/mj-strings.pt-br.js`
