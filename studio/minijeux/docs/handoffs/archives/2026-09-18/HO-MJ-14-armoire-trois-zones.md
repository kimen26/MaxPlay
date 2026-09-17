# HO-MJ-14 — L'Armoire v2 : trois zones, portes ouvertes, marges de pièce

> Statut : fait · Ouvert le 2026-09-15 · Exécutant : 1 sous-agent Sonnet · Orchestrateur : session principale.
> Rapport : `rapports/HO-MJ-14-rapport.md` (portes, tableau viewport, captures, écarts).
> Origine : Papa Yann 2026-09-15 après la v1 (HO-MJ-13, en ligne) : « on va sur cette armoire » = la référence `studio/minijeux/inbox/decoupe/ChatGPT Image 15 sept. 2026, 00_25_01.png` (armoire ouverte : vitrine haute à portes, casiers au milieu, compartiment bas à portes avec deux tiroirs). Mots de PY à respecter : « des marges à gauche à droite et au pied de l'armoire pour avoir un fond mur / tapis, pas des km, genre 3-5 % ; quand la porte est ouverte ça masque une légère partie de ça ; gérer les petits bords ou tronçage selon modèle d'écran ; en haut juste le nom de l'enfant, notre avatar en haut à gauche à moitié caché (15 %) par le haut sculpté de l'armoire ; l'œuf reste dedans, dans une case ; l'important c'est le visuel de l'armoire, propre, modulable, modulaire et léger. »

## Objectif (résultat observable)

`site/index.html` montre une armoire à **trois zones** posée dans une pièce (mur + tapis en CSS), avec une marge de 3-5 % autour, ses portes ouvertes débordant légèrement sur cette marge, **jamais d'ascenseur** ni de bord tronqué sur aucun téléphone (encoche, coins arrondis, barre de navigation comprises). Tout le reste de la v1 (mécaniques, tests, poids) tient toujours.

Ouvre la référence (Read) avant de coder et garde-la ouverte : c'est elle qu'on reproduit, pas la v1.

## Les trois zones (de haut en bas)

```
┌─ pièce (mur CSS, safe-area) ─────────────────────────┐
│  [avatar]                                             │
│   ┌──────── fronton chantourné (nom de l'enfant) ────┐│
│ ╱ │  VITRINE : 2 étagères larges, spots              │ ╲   ← portes ouvertes haut
│ ╲ │  (Dinos · Monde / Œufs · Album)                  │ ╱
│   ├───────── traverse épaisse ────────────────────────┤
│   │  CASIERS : 3 colonnes × N rangées (jeux)          │
│   ├───────── traverse épaisse ────────────────────────┤
│ ╱ │  BAS : compartiment, 2 tiroirs (décor)            │ ╲   ← portes ouvertes bas
│ ╲ └───────────────────────────────────────────────────┘ ╱
│      pieds        tapis (ellipse CSS)                  │
└───────────────────────────────────────────────────────┘
```

1. **Fronton** : `fronton.webp` comme en v1. Contenu = **le prénom seulement**, gravé au centre. L'avatar (`#profil-avatar`) est **derrière** le fronton, posé en haut à gauche, de sorte que le bois sculpté cache ~15 % de son bas (`z-index` avatar < fronton, avatar débordant au-dessus de l'arche). Il reste cliquable sur sa partie visible (mini-menu habiller / parents, inchangé). Les étoiles (`#stars-total`) : petite étiquette en bois pendue à droite comme en v1, ou gravée à droite du prénom si ça déborde à 320 px — au choix, une seule ligne.
2. **Vitrine** (haut) : **2 étagères pleine largeur** sans montant intermédiaire, 2 objets par étagère posés côte à côte, un spot au-dessus de chacun. Contenu **fixe** : `Dinos` (`obj-livres-dinos`, encyclo, porte fermée tant que TRITRI non saisi), `Monde` (`obj-globe`, encyclo pour l'instant) sur l'étagère du haut ; `Œufs` (`obj-oeuf`, `NidUI.openChambre()`, **porte les ids `#hdr-oeufs` et `#hdr-oeufs-n`** pour le badge) et `Album` (`obj-carnet`, `NidUI.openPadidi()`, **id `#hdr-padidi`**) sur celle du bas. Les tests existants cliquent ces ids : ils doivent rester sur des `<button>` visibles.
3. **Casiers** (milieu) : grille de jeux comme en v1 (`fond-bois`, montants, planches, spots), **3 colonnes sur téléphone**, `rows` calculé pour tenir (1 rangée si l'écran est court, 2 sinon, jamais plus de 3). Tirage aléatoire par objet inchangé (table `SLOTS` sans les 4 fixes de la vitrine).
4. **Bas** : compartiment fermé en bas de l'armoire avec **2 tiroirs** (`tiroir.webp`) posés dedans, **décoratifs** dans cette version (pas d'action, `aria-hidden`), puis `socle.webp` (pieds).
5. **Portes ouvertes** : `porte-ouverte.webp` à gauche de la vitrine et du bas, la même image en miroir (`transform:scaleX(-1)`) à droite. Elles sont **hors flux** (`position:absolute`), `pointer-events:none`, et débordent sur la marge de la pièce (c'est ce que PY veut : « ça masque une légère partie » du mur). Largeur : ~7 % de l'armoire sous 600 px (on voit surtout la tranche et la charnière), ~12 % au-dessus.
6. **Traverses** : entre les zones, une bande de bois plus épaisse que les planches (`planche.webp` étirée à ~2× la hauteur d'une planche de casier) qui dépasse légèrement en largeur, comme sur la référence.

Séparateurs, montants, traverses : CSS + tuiles existantes. **Aucune nouvelle image n'est nécessaire** ; si une pièce manque vraiment (ex. charnière seule), la crop dans `tools/armoire-decoupe.py` depuis la référence et la lister dans le rapport — pas de génération.

## La pièce autour (mur, tapis, bords d'écran)

- `body` = le mur : dégradé CSS chaud dans l'esprit de la référence (ocre clair au centre, brun aux bords), **aucune image**. Tapis = ellipse CSS sombre et floue sous les pieds.
- L'armoire est centrée dans une boîte `.piece` qui respecte les **safe areas** : `padding: max(3%, env(safe-area-inset-top)) max(4%, env(safe-area-inset-right)) max(4%, env(safe-area-inset-bottom)) max(4%, env(safe-area-inset-left))`. Marge visible cible : 3-5 % de chaque côté et au pied, jamais plus. La meta viewport a déjà `viewport-fit=cover`.
- **Rien de l'armoire ne peut être tronqué** : l'armoire fait `100 %` de la boîte (largeur ET hauteur, `grid-template-rows: auto auto 1fr auto`), la vitrine et le bas ont une hauteur bornée (`max-height` en `dvh`), seuls les casiers absorbent la différence. Les portes ouvertes peuvent mordre la marge, jamais sortir de l'écran (`max-width` calculé sur la marge).
- Sur écran large (≥ 900 px) l'armoire garde un `max-width` (≈ 1100 px) et le mur s'étend : c'est voulu, on ne déforme pas le meuble.

## Poids et perfs (PY : « léger en affichage »)

- Aucune nouvelle requête image par rapport à la v1 sauf `porte-ouverte.webp` (déjà dans le dossier, l'ajouter à `PRECACHE_LIST`). Cible premier affichage à 360 px : **≤ 260 Ko** d'images.
- Pas d'animation en continu. Feedback tap seulement.
- CSS < 220 lignes, JS < 220 lignes ; si tu dépasses, c'est que la structure est trop bavarde.

## Fichiers autorisés

`site/index.html`, `site/js/armoire.js`, `site/css/armoire.css`, `site/sw.js` (+ `node studio/minijeux/scripts/gen-sw-version.mjs`), `studio/minijeux/tests/armoire.spec.mjs`, `studio/minijeux/tests/index.spec.mjs` (seulement si un sélecteur a bougé), `studio/minijeux/tools/armoire-decoupe.py` + `site/img/armoire/**` (uniquement pour une pièce manquante, à justifier), `studio/minijeux/docs/handoffs/rapports/HO-MJ-14-rapport.md` + `rapports/captures/HO-MJ-14-*.png`. Rien d'autre ; `mur.js`, `mur.css`, `nid-ui.js`, `catalog.js` ne bougent pas.

## Portes de vérification

1. `node studio/minijeux/tests/armoire.spec.mjs` sur les 7 viewports de la v1 **plus** `390×844` (iPhone, safe-area simulée : `page.addStyleTag` ne suffit pas, émuler via `--cols` non ; simplement vérifier que `.piece` a un padding ≥ 3 % et que l'armoire + portes tiennent dans `innerWidth`/`innerHeight`) : pas d'ascenseur ; chaque bouton de vitrine et de casier ≥ **80×80** ; portes ouvertes entièrement dans l'écran (`getBoundingClientRect()` ≥ 0 et ≤ innerWidth) ; avatar visible à ≥ 60 % (rect intersecté avec le fronton) ; marge gauche/droite/bas de l'armoire entre 2 % et 8 % de la largeur ; images chargées.
2. `npm run mj:test index` et `node studio/minijeux/tests/mur-nid.spec.mjs` verts sans modification (ids déplacés sur la vitrine).
3. `npm run check` vert.
4. Poids ≤ 260 Ko au premier affichage 360×740.
5. **Ouvrir chaque capture** et comparer à la référence : trois zones lisibles, portes ouvertes des deux côtés, avatar mordu par l'arche, marge visible mais discrète, rien de tronqué à 320×568, armoire pleine (pas de casier vide) à 1280×720.

## Hors périmètre

Globe/volcan animés (autre brief), chaîne 2★, pagination, tout `mj-*.html`, contenu des tiroirs (décor seulement, « après on va voir »).

## Rapport attendu

`rapports/HO-MJ-14-rapport.md` : portes, tableau viewport → rangées de casiers → poids, captures, écarts, questions. Statut `fait` dans ce brief. Pas de commit.
