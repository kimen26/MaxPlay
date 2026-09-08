# HO-MJ-09 Chantier A — rapport

> Exécutant : sous-agent game-dev · 2026-09-08 · Chantier A uniquement (nom du dino en lettres
> creuses coloriables). Chantier B (sous-menu Décors) hors périmètre, non touché.

## Fichier modifié

- `site/mj-32.html` (seul fichier touché, +232/-11 lignes)

## Ce qui a changé

Sous chaque dino, dans le **même canvas**, le nom (`currentDino.name`, donc déjà dans la langue
du site) s'affiche en **MAJUSCULES creuses** (`ctx.strokeText`, jamais `fillText`), coloriables
lettre par lettre par le flood fill existant, sans mécanique nouvelle.

- Le canvas grandit en hauteur pour accueillir une **bande de nom** sous le dino. Le nom est
  dessiné **avant** `buildContourMask()` (point clé du handoff), donc les lettres entrent dans
  le masque de contour comme le reste du lineart.
- **Un mur de séparation** (trait plein largeur, épais) est dessiné entre la zone dino et la
  bande de nom. **Sans lui, le fond blanc du dino et le fond blanc de la bande ne formaient
  qu'une seule zone continue** : colorier n'importe quelle lettre remplissait tout le dino, et
  inversement (bug trouvé en recette Playwright, corrigé avant livraison — voir § Bugs trouvés).
- **Mise en page adaptative** (`layoutDinoName`) : le nom est mesuré avec `ctx.measureText`,
  coupé sur les espaces en au maximum 2 lignes, avec réduction de la taille de police jusqu'à un
  plancher si besoin. Le pire cas réel du catalogue (71 dinos, 4 langues) est
  **"Apatosaurus (Brontosaurus)"** (26 caractères, EN/ES/PT — 24 en FR) : il tient sur 2 lignes
  bien avant le plancher, sans jamais couper un mot au milieu (le cas "couper un mot au milieu"
  existe en filet de sécurité mais n'est déclenché par aucun nom du catalogue actuel).
- **Dimensions** : hauteur de lettre entre `0.072×w` et `0.145×w` (soit 56-116px à w=800),
  conforme au plancher ≥56px du handoff. Trait d'épaisseur `0.09×fontPx` (calibrage empirique,
  voir § Bugs trouvés), avec un plancher absolu de 3px canvas.
- **Zéro ascenseur** : correctif CSS sur `#atelier` (`flex:1` → `height:100%`), voir § Bugs
  trouvés — un bug de layout préexistant, invisible avant ce chantier, que le canvas plus haut a
  révélé.

## Bugs trouvés et corrigés pendant le développement (avant handoff)

Trois bugs réels, tous corrigés et vérifiés par capture Playwright avant de considérer le
chantier terminé — aucun n'a été laissé en l'état :

1. **Débordement du nom hors canvas.** Premher jet : la réduction de police s'arrêtait dès que
   le nombre de lignes était ≤2, sans vérifier que chaque ligne tenait réellement dans la
   largeur. Un nom d'un seul mot sans espace ("CRYOLOPHOSAURE") formait toujours "1 ligne" mais
   débordait largement. Corrigé : le critère d'arrêt de la réduction est la largeur mesurée de
   la ligne la plus large (`widestLine`), pas le nombre de lignes.
2. **Fusion dino/bande de nom** (le plus critique) : sans mur de séparation, le fond blanc du
   dino et celui de la bande de nom formaient une seule zone pour le flood fill — taper une
   lettre remplissait tout le dino. Trouvé par le test d'anti-fuite existant
   (`mj-32.spec.mjs`, cas Cryolophosaure) qui est repassé au rouge pendant le développement.
   Corrigé par l'ajout d'un trait de séparation plein largeur, assez épais pour rester un mur
   même après dilatation.
3. **Lettres fusionnées à taille de police réduite** (nom long sur 2 lignes) : deux causes
   cumulées, trouvées et corrigées séparément :
   - Le trait était calculé en ratio de `w` (fixe, ~16px canvas) au lieu d'un ratio de `fontPx` —
     à police réduite, un trait fixe devient proportionnellement énorme et fusionne les lettres
     voisines (capture `stroke-ratios.png` : calibrage empirique montrant qu'au-delà de
     `0.10×fontPx` les lettres commencent à se toucher, `0.14×fontPx`+ les fusionne
     complètement). Corrigé : trait = `max(3px, 0.09×fontPx)`.
   - Même après ce premier correctif, certaines lettres restaient impossibles à colorier : le
     masque de contour dilate chaque trait de `CONTOUR_DILATE_R=7px` de chaque côté (réglage
     calibré pour boucher les micro-trous de compression du lineart paléoart, cf. figée
     `docs/jeux/figees/mj-32.md`). À taille de police réduite, l'intérieur d'une lettre (le trou
     d'un R, d'un U...) peut être plus petit que ces 14px cumulés — la dilatation avale alors
     tout l'intérieur, rendant la lettre non coloriable bien qu'elle soit visuellement creuse.
     Vérifié par diagnostic direct (distance du point cliqué au trait le plus proche : les points
     qui échouaient étaient tous à ≤7px du trait). Corrigé : dilatation réduite
     (`NAME_BAND_DILATE_R=1`, quasi nulle) spécifiquement pour la bande de nom — le trait
     `strokeText` frais n'a aucun micro-trou de compression, il n'a donc besoin d'aucune
     dilatation de sécurité. **La zone dino garde exactement `CONTOUR_DILATE_R=7` inchangé**
     (le paramètre `nameBandY` de `buildContourMask` ne réduit la dilatation qu'à partir du mur
     de séparation, jamais avant) — zéro régression sur l'anti-fuite Cryolophosaure (#6389).
4. **Ascenseur caché dans l'atelier** : `#atelier` avait `flex:1` mais son parent `#screenAtelier`
   est `display:block` (pas flex) — cette règle CSS n'avait donc **jamais** d'effet, invisible
   tant que le canvas carré (800×800) tenait par coïncidence dans l'espace disponible. Le canvas
   plus haut (jusqu'à ~800×1160 pour un nom long) a fait déborder `#atelier` au-delà de
   `#screenAtelier`, silencieusement clippé par `overflow:hidden` (donc un vrai ascenseur cassé
   par recette, pas visible à l'œil sur un simple screenshot mais détecté par le test
   `scrollHeight > clientHeight`). Corrigé : `#atelier { height:100% }` au lieu de `flex:1`.

## Portes — résultat exact

```
cd studio/minijeux/tests && node audit-gabarit.mjs mj-32 && npm run mj:test mj-32
```

- `audit-gabarit.mjs mj-32` : **0 bloquant** (1 dette non bloquante préexistante : hex couleurs
  en dur dans le JS inline — c'est la palette de coloriage du jeu, pas des couleurs de ligne
  bus, dette déjà présente avant ce chantier).
- `npm run mj:test mj-32` : **27/27 assertions fonctionnelles PASS**. Un seul FAIL, le smoke
  console (`Scelidosaurus_coloriage.webp` absent du repo — asset manquant préexistant, sans
  rapport avec ce chantier, exactement le FAIL toléré annoncé par le handoff). Aucun nouveau
  FAIL.

Deux régressions réelles sont apparues PENDANT le développement (anti-fuite Cryolophosaure et
ascenseur atelier, cf. bugs #2 et #4 ci-dessus) — toutes deux corrigées avant cette mesure
finale, qui est verte.

## Captures Playwright (360px, ouvertes et vérifiées une par une)

Dossier : `C:\Users\kimen\AppData\Local\Temp\claude\c--ProjetsPerso-Claude-Projects-MaxPlay\7d35a04f-96ef-40af-9514-da932b42d1e9\scratchpad\ho-mj-09\`

| Fichier | Vérifie |
|---|---|
| `1-nom-court-allosaure.png` | Nom court ("ALLOSAURE"), 1 ligne, lisible, zéro ascenseur (mesuré : `atelier:true, doc:true`) |
| `2-nom-long-apatosaure.png` | Nom le plus long du catalogue FR ("APATOSAURE (BRONTOSAURE)", 24 car.), 2 lignes, lisible, zéro ascenseur |
| `3-lettres-coloriees.png` | 3 lettres distinctes coloriées de 3 couleurs différentes (rouge/bleu/marron), confirmées par lecture pixel exacte après clic, pas de bavure entre lettres |
| `3b-interieur-du-o.png` | Intérieur d'un O colorié précisément (rose), contenu net, dino et lettres voisines non affectés |
| `4a-galerie-apres-save.png` / `4b-reouverte-depuis-galerie.png` | Sauvegarde puis réouverture depuis la galerie ("Reprendre en copie") : couleurs identiques avant/après (vérifié pixel exact ET visuellement — étoile de fin + couleurs dino/bande reproduites à l'identique) |
| `5-320px-nom-long.png` | Non-régression à 320px (nom long) : zéro ascenseur, palette repliée sur 3 lignes, tout lisible |
| `6-lang-en.png` | `?lang=en` : nom affiché en anglais ("APATOSAURUS (BRONTOSAURUS)", 26 car., pire cas toutes langues), libellés UI traduits ("The Coloring Studio", "Another dino", "Model", "Done!") |

Captures de diagnostic (bugs #1-#4 ci-dessus, conservées pour traçabilité) : `stroke-ratios.png`
(calibrage de l'épaisseur de trait), `zoom-band-full.png`/`grid-overlay.png` (lecture de
coordonnées précises pour localiser des intérieurs de lettres), `line1-test.png`/
`o-interior-test.png` (première preuve manuelle du coloriage lettre par lettre).

## Sort des œuvres déjà en galerie (AVANT ce chantier)

**Tranché explicitement, comme demandé par le handoff en l'absence de solution "gratuite" :**
une œuvre sauvegardée avant ce chantier avait un canvas `w×h` = dimensions du dino seul (pas de
bande de nom). Rejouée après ce chantier, `loadLineart` construit désormais un canvas
`w×(h+bandH)` — les coordonnées normalisées `{nx,ny}` de l'ancienne œuvre ne retombent donc plus
exactement au même endroit visuel (léger décalage vertical, proportionnel à `bandH/(h+bandH)`,
de l'ordre de 15-25% selon la longueur du nom du dino concerné).

**Décision retenue : pas de migration de format.** Une ancienne œuvre reste consultable et
"Reprendre en copie" continue de fonctionner (le rejeu des fills ne plante jamais, `floodFill`
ignore silencieusement un point de départ retombé sur un trait), mais le résultat visuel n'est
plus pixel-identique à la sauvegarde d'origine pour les œuvres antérieures à ce chantier — les
zones remplies peuvent apparaître légèrement décalées par rapport au dessin. Les œuvres créées
APRÈS ce chantier restent, elles, parfaitement fidèles à la réouverture (vérifié : capture
`4a`/`4b`, couleur pixel identique avant/après, dino créé et rouvert dans la même session avec
le nouveau format).

Cette dérive n'a pas été corrigée par une migration de version de données parce que : (a) le
volume concerné est celui du localStorage d'un seul enfant, pas une base partagée ; (b) une
migration aurait nécessité de rejouer et redétecter la géométrie de chaque ancienne œuvre sans
certitude de fidélité (le format actuel ne stocke pas `w,h` d'origine) ; (c) le handoff autorisait
explicitement cette voie ("ou décider explicitement... que les anciennes œuvres se rouvrent sans
le nom" — la décision retenue ici est proche : elles se rouvrent avec le nom mais un léger
décalage possible des couleurs déjà posées, jamais une régression fonctionnelle bloquante).

**Papa Yann n'a pas d'œuvres réelles en jeu actuellement sauf via ses propres tests** — l'impact
utilisateur réel de cette dérive est donc nul au moment de la livraison.

## Coût estimé du tracé au doigt (non implémenté, sur demande explicite du handoff)

Le handoff distingue "colorier une lettre" (livré) de "suivre le tracé au doigt" (geste de
graphisme guidé, mécanique différente). Estimation, sans l'avoir codé :

- **Détection du tracé** : il faudrait un chemin vectoriel (liste de points ordonnés) par lettre,
  pas juste un masque bitmap de contour — `strokeText` ne fournit pas nativement ce chemin
  (canvas 2D n'expose pas les points du glyphe). Deux options : (a) `ctx.getLineDash`/replay
  manuel avec une police vectorielle chargée via `opentype.js` ou équivalent (~30-50 Ko de lib
  supplémentaire, changement de dépendance) pour extraire les points du contour de chaque
  lettre ; (b) une bibliothèque de tracés prédéfinis par lettre (26 lettres × poids modéré, mais
  maintenance manuelle si la police change).
- **Détection du "suivi"** : comparer la position du doigt à la distance au chemin vectoriel
  attendu à chaque `pointermove`, tolérance à définir (repère UX enfant 4 ans : tolérance large,
  20-30px), feedback visuel progressif (segment parcouru qui change de couleur).
- **Ampleur** : nouvelle mécanique de jeu à part entière (pas une extension du flood fill
  existant), probablement 150-250 lignes de JS, plus un test Playwright dédié simulant un tracé
  au doigt en plusieurs `pointermove`. Ordre de grandeur : 1 session de développement complète,
  hors périmètre de ce chantier A.
- **Alternative plus simple** envisageable si le besoin est confirmé : ne pas suivre le tracé
  précisément, mais valider "l'enfant a tapé dans chaque lettre au moins une fois dans l'ordre" —
  complexité largement réduite (repose sur la détection de composantes déjà écrite pour ce
  rapport), mais perd la dimension motrice fine du geste d'écriture.

## Ce qui n'a pas pu être vérifié

- **Rendu réel sur un P30 Pro physique** (contrainte mobile-parents.md) : seule la recette
  Playwright/Chromium headless a été faite, à 360px et 320px de large. La police "Fredoka One"
  chargée depuis Google Fonts peut avoir un rendu marginalement différent (hinting, anti-aliasing)
  sur Chrome Android réel — le calibrage du trait (`0.09×fontPx`) reste donc à confirmer par
  Papa Yann sur l'appareil réel avant de considérer les constantes définitivement figées.
- **Le doigt d'un enfant de 4 ans réel** : la taille des intérieurs de lettre (56-116px canvas,
  soit ~24-50px CSS à 360px selon le ratio canvas/CSS observé) a été calibrée par calcul et
  vérifiée par clic Playwright précis (pixel exact), pas par un test utilisateur avec un doigt
  imprécis de plusieurs mm — le rayon de tolérance "snap vers la zone libre la plus proche"
  (existant, 10px canvas) n'a pas été spécifiquement re-testé pour le cas des lettres.
- **Tous les 71 dinos du catalogue, dans les 4 langues** (284 combinaisons) : seuls le nom le
  plus court testé visuellement ("Allosaure") et le nom le plus long dans chaque langue ont été
  vérifiés par capture. Les noms de longueur intermédiaire n'ont pas été passés en revue un par
  un — le mécanisme de mise en page étant continu (measureText + réduction progressive), le
  risque résiduel est faible mais non nul pour un nom de longueur atypique non anticipée (ex. un
  mot très long sans espace autre que "Cryolophosaure"/"Carcharodontosaure", déjà couverts par
  construction car ce sont les 2e et 3e noms les plus longs).
- **Interaction avec le chantier B (sous-menu Décors)**, non commencé par cette session : le mur
  de séparation dino/nom et le nouveau calcul de `bandH` n'ont pas été pensés en présence d'un
  décor de fond — à valider quand ce chantier démarrera (le décor devra composer en respectant
  la même limite `y=h`, pas juste `y=canvas.height`).
