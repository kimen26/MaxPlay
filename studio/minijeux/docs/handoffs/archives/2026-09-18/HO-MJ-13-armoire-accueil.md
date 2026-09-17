# HO-MJ-13 — L'Armoire : nouvel accueil enfant, remplace La Vallée

> Statut : **fait** (2026-09-15) · Rapport : [`rapports/HO-MJ-13-rapport.md`](rapports/HO-MJ-13-rapport.md) · Exécutant : 1 sous-agent Sonnet · Orchestrateur : session principale.
> Origine : décision Papa Yann 2026-09-15 — « VIRE le menu actuel avec les perso qui bougent, ça a toujours été un échec, je ne veux plus le voir ». Le nouvel accueil est une **armoire en bois** : fronton, grille de casiers avec un objet par casier, socle à tiroirs. Le visuel d'abord ; les objets sont reliés aux jeux de façon simple, on affinera ensuite.
> Dépend de : HO-MJ-12 (pièces dans `site/img/armoire/`, dimensions dans `MANIFEST.json`). Si le dossier n'existe pas encore : coder contre les noms du brief HO-MJ-12, et attendre les fichiers avant les captures.

## Objectif (résultat observable)

`site/index.html` affiche une armoire qui **remplit exactement l'écran, sans jamais aucun ascenseur** (vertical ni horizontal), de 320×568 à 1280×720, portrait et paysage. Chaque casier montre un objet ; taper un objet ouvre un jeu, l'encyclopédie, la chambre des œufs ou l'album. Tout ce qui marchait autour (profil, étoiles, porte parents, code TRITRI, langue, deep-link `?open=nid`, service worker) marche encore.

## Ce qui disparaît

- `site/js/mur-scene.js` : **supprimé** (personnages animés, décor, bus qui passe, bulles).
- Dans `site/css/mur.css` : tout le bloc Vallée (`.vallee`, `.v-*`, `.vb-*`, animations des copains). Garder `.modal`, `.toast`, `.parents-*`, `.rep-*`, `.game`, `.mp-drawer`, `.hdr-btn`, `.avatar-menu` — ce que l'espace parents et les modales utilisent encore.
- Dans `site/js/mur.js` : `COPAINS`, `dinoHost()`, `humeurs()`, `avatarTete()`, tout appel à `MurScene`. Garder `repaireState`/`jeuxDeZone` (chaîne 2★, réutilisée plus tard), `show/showMur/showParents`, `renderParents/gameRowHtml/renderLangs`, `openEncyclo`, `init`. `avatarMood` reste (appelé par `nid-ui.js:480`).
- Le header « avatar rond + pseudo + ⭐ + 2 boutons » : remplacé par le fronton (voir plus bas). Les ids `#profil-avatar`, `#profil-pseudo`, `#stars-total`, `#avatar-menu`, `#am-atelier`, `#parents-btn` **restent** (le script inline et les tests s'y accrochent), seul leur habillage change.

## Architecture (HTML/CSS = structure, images = texture)

```html
<div class="armoire" id="armoire">
  <header class="ar-fronton">          <!-- fronton.webp en background, hauteur auto via aspect-ratio du MANIFEST -->
    <div class="avatar" id="profil-avatar">…</div>   <!-- le dino de Max perché en haut à gauche de l'arche -->
    <div class="pseudo" id="profil-pseudo">Champion</div>
    <div class="mp-stars-total" id="stars-total">⭐ 0</div>   <!-- étiquette suspendue à droite -->
  </header>
  <div class="ar-casiers" id="casiers">  <!-- grille : fond-bois.webp en repeat, montants et planches en pseudo-éléments -->
    <button class="casier" data-cible="…"> <img class="obj" src="img/armoire/obj-globe.webp"> <span class="etiquette">Le monde</span> </button>
    …
  </div>
  <footer class="ar-socle">            <!-- socle.webp -->
    <button class="tiroir" id="hdr-oeufs">🥚 <span class="hdr-badge" id="hdr-oeufs-n"></span></button>
    <button class="tiroir" id="hdr-padidi">📷</button>
  </footer>
</div>
```

Règles CSS qui garantissent « jamais d'ascenseur » :

- `html, body { height:100%; overflow:hidden }` ; `.armoire { height:100dvh; display:grid; grid-template-rows:auto 1fr auto }` (repli `100vh` avant `100dvh`).
- `.ar-casiers { display:grid; grid-template-columns:repeat(var(--cols),1fr); grid-auto-rows:1fr; min-height:0 }`. Les casiers sont en `1fr` : ils **rétrécissent**, ils ne poussent jamais la page.
- `.obj { max-width:100%; max-height:100%; object-fit:contain }` dans un casier `display:flex; align-items:flex-end` (l'objet est **posé** sur la planche, pas centré en l'air). Étiquette en dessous, `font-size:clamp(.8rem, 2.8vw, 1rem)`, 1 ligne, jamais de `height` fixe.
- Nombre de colonnes = fonction de la **largeur** : 3 par défaut, 4 à partir de 600 px, 5 à partir de 900 px, 6 à partir de 1200 px (variable `--cols` posée par le JS ou par media queries, au choix, mais UNE seule source).
- Nombre de casiers affichés = `cols × rows` avec `rows` choisi par le JS pour que chaque casier fasse **≥ 96 px de haut** : `rows = clamp(2, floor(hauteurGrille / 96), 4)`. Les objets au-delà de `cols × rows` ne sont pas rendus (pas de 2ᵉ page dans cette version : ils reviendront par rotation aléatoire au prochain chargement, voir « Mapping »). Recalcul sur `resize`/`orientationchange`.
- Cible tactile : chaque casier ≥ 96×96 css px (bien au-dessus des 48 de la règle mobile ; 2 cm NN/G pour un enfant de 4 ans).
- Montants verticaux : `montant.webp` en `repeat-y` via un pseudo-élément par colonne, ou `border-left` en `border-image` — le plus simple qui rend bien. Planches : `planche.webp` en `background-size:100% 100%` sur un pseudo-élément `::after` en bas de chaque casier (hauteur ≈ 6 % de la hauteur du casier, `min-height:8px`).
- Éclairage : `spot.webp` centré en haut de chaque casier + `lumiere.webp` derrière l'objet, `pointer-events:none`, opacité 0,8. **Une seule** requête réseau chacun (même URL), le navigateur cache.
- Portes : `porte.webp` couvre un casier **verrouillé** (jeu `access:'code'` non déverrouillé, c'est-à-dire l'encyclopédie tant que TRITRI n'est pas saisi). Tap sur la porte → `MUR.openEncyclo()` (qui ouvre la modale code). Aucun autre verrou dans cette version (la chaîne 2★ n'est pas branchée sur l'armoire — noté en TODO).
- Feedback tap < 200 ms : `transform:scale(.94)` sur `:active`, jingle 1ᵉʳ clic conservé.
- Fronton : `background:url(fronton.webp) center bottom / 100% auto no-repeat`, `aspect-ratio: w/h` du MANIFEST, `max-height:22dvh`. L'avatar (`Avatar.file(id,'joyeux')`, taille ≈ 18 % de la largeur, max 96 px) est en `position:absolute`, posé sur le bord gauche de l'arche, pieds sur le bois. Pseudo en Fredoka One gravé au centre (`color:#3b2412; text-shadow:0 1px 0 rgba(255,255,255,.35)`). Étoiles = petite étiquette en bois pendue à droite (CSS : rectangle + ficelle, pas d'image).
- Socle : `background:url(socle.webp) center top / 100% auto`, `aspect-ratio` du MANIFEST, `max-height:14dvh`. Les deux tiroirs sont des `<button>` avec `tiroir.webp` en background, largeur ≈ 42 % chacun, contenu emoji + badge centré sur l'anneau. Tap = ouvrir la chambre des œufs / l'album Padidi (même code qu'aujourd'hui).
- Zéro `overflow:hidden` sur du texte, zéro hauteur fixe sur un conteneur de texte (règle mobile-parents). Les étiquettes peuvent passer en `text-overflow: ellipsis` uniquement si elles sont dans un `<span>` d'une ligne dont la hauteur n'est pas contrainte.

## Mapping objets → cibles (`site/js/armoire.js`, table `SLOTS`)

Le fichier expose `window.Armoire = { render, refresh }` et pose `window.MurScene = { markGainSeen(){ Armoire.refresh(); }, refresh(){ Armoire.refresh(); } }` pour que `nid-ui.js` ne casse pas.

Table de départ (Papa Yann : « fait des trucs aléatoires, tu prends une peluche et tu places un jeu derrière ») :

| Objet | Étiquette | Cible |
|---|---|---|
| `obj-livres-dinos` | Les dinos | `MUR.openEncyclo()` (porte fermée tant que non déverrouillé) |
| `obj-globe` | Le monde | `MUR.openEncyclo()` aussi pour l'instant (le Voyage aura son entrée directe plus tard, chantier dino) |
| `obj-oeuf` | Mes œufs | `NidUI.openChambre()` |
| `obj-carnet` | Mon album | `NidUI.openPadidi()` |
| `obj-bus` | Les bus | un jeu au hasard dont `titre` ou `desc` contient « bus » |
| `obj-lettres` | Les lettres | un jeu au hasard parmi `tag:'tts'` de catégorie `compter` (mj-50/51/52/53) |
| `obj-chiffres` | Compter | un jeu au hasard de catégorie `compter` sans `tag` |
| `obj-drapeaux` | Le monde entier | un jeu au hasard de catégorie `monde` |
| `obj-volcan` | Les dinos jouent | un jeu au hasard de catégorie `dinos` (hors encyclo) |
| `obj-meteorite` | Surprise | un jeu au hasard toutes catégories |
| `obj-peluche-tri` | Tritri | un jeu au hasard de catégorie `casse` |
| `obj-peluche-stego` | Copain | un jeu au hasard de catégorie `couleurs` |
| `obj-reveil` | Vite ! | un jeu au hasard de catégorie `casse` |
| `obj-radio` | Écoute | `lecture.html` si la page existe, sinon jeu `tag:'tts'` au hasard |
| `obj-puzzle` | Puzzle | `mj-40.html` (tangram) |
| `obj-livre-ouvert` | Lis | `mj-53.html` |

Règles : le tirage au sort passe **toujours** par `window.catalogVisible()` (jamais `MAXPLAY_CATALOG` brut) ; un jeu n'apparaît qu'une fois sur l'armoire (retirer du pool à chaque tirage) ; l'ordre des 16 objets est **fixe** (celui de la table), les 4 premiers sont toujours visibles (dinos, monde, œufs, album), les suivants sont tronqués à `cols × rows`. Le tirage est refait à chaque chargement de page : Max découvre les jeux par surprise, c'est voulu. Lancer un jeu = `location.href = entry.url` (contrat existant). Étiquettes en français dans `SLOTS` mais passées par `MJi18n.t()` si le module est chargé sur index (vérifier ; sinon FR brut et le noter).

## Fichiers autorisés (ownership exclusif)

- `site/index.html` (réécrit), `site/js/armoire.js` (nouveau, < 250 lignes), `site/css/armoire.css` (nouveau, < 300 lignes)
- `site/js/mur.js`, `site/css/mur.css` (élagage), `site/js/mur-scene.js` (suppression)
- `site/sw.js` : retirer `js/mur-scene.js` de `PRECACHE_LIST`, ajouter `js/armoire.js`, `css/armoire.css` et les pièces d'armoire **structurelles** (fronton, fond-bois, montant, planche, socle, tiroir, spot, lumière, porte) — pas les 16 objets (runtime img/ stale-while-revalidate suffit). Puis `node studio/minijeux/scripts/gen-sw-version.mjs`.
- `studio/minijeux/tests/index.spec.mjs` (réécrit), `studio/minijeux/tests/mur-nid.spec.mjs` (adapté : plus de `.v-copain`, mais chambre/Padidi/théâtre d'éclosion doivent rester atteignables depuis `#hdr-oeufs` / `#hdr-padidi`), `studio/minijeux/tests/armoire.spec.mjs` (nouveau)
- `studio/minijeux/docs/handoffs/rapports/HO-MJ-13-rapport.md` + `rapports/captures/HO-MJ-13-*.png`

## Portes de vérification

1. `armoire.spec.mjs` (Playwright, `npm run mj:test armoire` ou appel direct si run.mjs n'accepte pas ce nom — dans ce cas ajouter le cas dans run.mjs et le dire) : pour CHAQUE viewport `[360×740, 360×640, 320×568, 412×915, 800×600 (paysage), 1024×768, 1280×720]` :
   - `document.documentElement.scrollHeight <= innerHeight + 1` et `scrollWidth <= innerWidth + 1` (**jamais d'ascenseur**) ;
   - chaque `.casier` visible a `getBoundingClientRect()` ≥ 96×96 ;
   - `--cols` = 3 / 3 / 3 / 3 / 4 / 5 / 6 ;
   - aucun `.casier` sans `<img>` chargé (`naturalWidth > 0`) ;
   - capture `rapports/captures/HO-MJ-13-<w>x<h>.png`.
2. `index.spec.mjs` : profil, ⭐, `#hdr-oeufs`, `#hdr-padidi`, gate parents (avatar → `#parents-btn` → 3 s → `28`), porte encyclo → `#code-modal` → `tritri` → toast, deep-link `?open=nid`.
3. `node studio/minijeux/tests/mur-nid.spec.mjs` vert.
4. `npm run check` vert (dont `check-mj-coherence` : ne touche pas `catalog.js`, donc `zone`/`murOrder` restent cohérents).
5. Poids : le premier affichage de `index.html` charge ≤ **600 Ko** d'images (mesurer via `page.on('response')` dans le spec, somme des `content-length` `img/`).
6. **Ouvrir les captures** et juger : les objets sont posés sur la planche, pas flottants ; les montants/planches se raccordent ; rien de tronqué à 320 px ; à 1280×720 l'armoire reste une armoire (pas une bande de bois vide : les 6 colonnes × 2 rangées sont pleines).

## Hors périmètre

- `site/js/catalog.js`, `site/js/nid-ui.js`, `site/js/unlock.js`, `site/js/stars.js`, tout `mj-*.html`, `dev-dinos.html`, `compte.html`.
- Aucune animation de personnage. L'armoire est **immobile** ; seul le feedback tap bouge. (Un objet peut avoir une micro-animation d'accueil plus tard, pas ici.)
- Pas de chaîne de déblocage 2★ sur les casiers, pas de deuxième page/pagination, pas de drag.
- Pas de modification des pièces images (c'est HO-MJ-12 ; une pièce mal découpée = le signaler dans le rapport, ne pas la retoucher).

## Rapport attendu

`rapports/HO-MJ-13-rapport.md` : sortie des 6 portes, tableau viewport → cols × rows → poids images, captures listées, écarts au brief (ex. libellés non traduits), questions pour Papa Yann. Statut passé à `fait` dans ce brief. Pas de commit.
