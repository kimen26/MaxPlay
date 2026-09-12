# Rapport HO-R11 — Service worker et politique de cache

**Statut brief :** rapport reçu

## Fichiers créés

- `site/sw.js` — service worker (scope et chemins relatifs, coquille précachée versionnée)
- `site/js/sw-register.js` — enregistrement du SW, no-op en `file://` et sans support SW
- `site/offline.html` — page de repli hors ligne pour une page jamais visitée
- `site/js/gen/sw-version.js` — **GÉNÉRÉ**, hash de la coquille (`self.SW_VERSION`)
- `studio/minijeux/scripts/gen-sw-version.mjs` — calcule ce hash, appelé par `npm run build`

## Fichiers modifiés

- `site/manifest-classic.json` → renommé `site/manifest.json` (référencé par `index.html`, seul fichier qui le citait)
- `site/index.html` — lien manifest mis à jour (`manifest.json`) + `<script src="js/sw-register.js">`
- Les 43 autres `site/*.html` (36 `mj-*.html` + `auteur, avatar-atelier, compte, confidentialite, dev-dinos, lecture, suivi`) — ajout en `<head>` de `<link rel="manifest" href="manifest.json">` + `<script src="js/sw-register.js"></script>`, juste avant `</head>`. Aucune ligne `<script src=".../dinos-data.js">` touchée (territoire HO-R12).
- `package.json` § `build` — une commande ajoutée en fin de chaîne : `node studio/minijeux/scripts/gen-sw-version.mjs`. Les autres commandes inchangées.
- `studio/minijeux/tests/audit-gabarit.mjs` — 2 nouveaux checks BLOQUANT : « manifest.json lié » et « sw-register.js chargé »
- `studio/minijeux/docs/STACK.md` — section « Hors ligne — service worker (HO-R11) » ajoutée

Aucune suppression. Aucune commande git exécutée (le `site/manifest-classic.json` → `site/manifest.json` apparaît en `R` dans `git status` parce que le contenu est identique et git détecte le renommage tout seul — je n'ai fait qu'un déplacement de fichier).

## Stratégie de cache par type

Documentée en tête de `site/sw.js` et dans `STACK.md` :

| Type | Stratégie | Pourquoi |
|---|---|---|
| Coquille (index, css, js runtime menu, catalogue, manifest, icônes, `offline.html`) | **cache-first**, précachée à l'install | Affichage instantané et garanti hors ligne |
| `img/`, `audio/`, `sounds/` déjà vus | **stale-while-revalidate**, plafonné (500 images / 300 audios / 100 sons, éviction FIFO) | Rapidité immédiate + fraîcheur en tâche de fond, sans grossir indéfiniment (790 Mo d'assets ne tiennent pas sur une tablette) |
| Supabase / API distante | **jamais interceptée** (filtre d'origine + filtre hostname) | Les scores/commentaires doivent refléter l'état réseau réel ; `cloud.js` gère déjà le local-first des données |
| Reste (pages non précachées) | **network-first**, repli cache puis `offline.html` pour une navigation | Permet de rouvrir un jeu déjà visité hors ligne sans tout précacher |

Scope et tous les chemins précachés sont **relatifs** (`./…`) : le site est servi sous
`kimen26.github.io/MaxPlay/` (sous-chemin GitHub Pages, confirmé via `deploy.yml` +
`manifest.json` `scope: "./"`), un chemin absolu casserait tout hors racine de domaine.

## Taille du precache

25 fichiers, **≈ 565 Ko** (index, offline, manifest, 2 css, 20 js runtime incl. `gen/avatars.js`
et `gen/sw-version.js`, 5 icônes PNG). Volontairement exclu : `dinos-data.js` (132 Ko, propre à
l'encyclopédie, pas à la coquille du menu), tout `img/dinos/`, `audio/`, `sounds/` (couverts par
le runtime stale-while-revalidate au fil des visites, pas précachés d'office — 790 Mo au total,
impossible à tout précacher).

## Version du SW

`studio/minijeux/scripts/gen-sw-version.mjs` hash le contenu de `sw.js` lui-même + celui de
chaque fichier de `PRECACHE_LIST` (source unique : la liste vit dans `sw.js`, le script la
relit par regex, aucune duplication). Exclut sa propre sortie (`js/gen/sw-version.js`) pour
éviter une auto-référence qui empêcherait toute convergence. Vérifié stable sur 3 exécutions
consécutives sans changement de fichier (`00f0ac3130b6` à chaque fois).

## Tests exécutés (portes de vérification)

### Playwright — hors ligne (serveur HTTP local, `python -m http.server`, viewport 360×740)

Scénario : charger `index.html` en ligne → attendre `serviceWorker.getRegistration().active.state === 'activated'`
→ visiter `mj-46.html` en ligne (mise en cache) → `context.setOffline(true)` → recharger.

1. **Menu rechargé hors ligne** : titre correct, `window.MAXPLAY_CATALOG` chargé (42 entrées),
   la carte « La Vallée » s'affiche entièrement avec ses vignettes de zones (capture
   `offline-menu.png`, ouverte et vérifiée visuellement — voir description ci-dessous).
2. **`mj-46.html` (déjà visité) rechargé hors ligne** : jeu complet rendu, énoncé « Combien
   d'œufs ? », 3 réponses, image de la scène (capture `offline-mj46.png`, ouverte et vérifiée).
3. **`mj-59.html` (jamais visité) hors ligne** : bascule propre sur `offline.html` — titre
   « MaxPlay — Pas de réseau », message et bouton « Retour au menu » (capture
   `offline-mj59-unvisited.png`, ouverte et vérifiée) — comportement voulu, pas une régression :
   le SW ne peut pas inventer une page qu'il n'a jamais vue.

Testé en `file://` au préalable pour confirmer que `sw-register.js` s'y abstient bien
(`navigator.serviceWorker.register` n'est jamais appelé sur ce protocole — vérifié dans le code,
`location.protocol === 'file:'` retourne avant tout appel), donc **aucune régression** sur le
harnais Playwright existant qui tourne en `file://`.

### `audit-gabarit.mjs` (0 BLOQUANT attendu)

```
36 jeux audités
20 cadre conforme · 16 avec dette · 0 BLOQUANT
migration gabarit shell : 36/36
✓ aucun bloquant — cadre sain (les dettes sont à résorber au fil de l'eau)
```

Les 2 nouveaux checks BLOQUANT (« manifest.json lié », « sw-register.js chargé ») sont actifs et
verts sur les 36 `mj-*.html` audités. Note : `audit-gabarit.mjs` audite par construction les
pages `mj-*.html` du catalogue (36), pas les 8 autres pages du site (index, dev-dinos, auteur,
avatar-atelier, compte, confidentialite, lecture, suivi) — total 44 pages avec manifest+SW, mais
seules les 36 mini-jeux passent sous l'audit gabarit. Les 8 autres ont été vérifiées à la main
(`grep -c 'rel="manifest"' *.html` = 1 partout, `grep sw-register.js` présent partout).

### `npm run check` — sans erreur

`audit-gabarit.mjs` (0 BLOQUANT) + `check-mj-coherence.mjs` (36/36 OK, 0 manque) +
`referentiel/build.mjs` (924 clés, 0 dérive de canal, écrit sans erreur) + `check-liens-md.mjs`
(0 lien mort).

### `npm test` — 36/36

```
36 jeux au menu · 36 PASS · 0 FAIL · 0 sans spec
✓ tout le menu passe
```

### `npm run build` — sans erreur, `gen-sw-version.mjs` intégré en dernière étape

```
gen-sw-version : SW_VERSION = 00f0ac3130b6 (27 fichiers précachés) → site\js\gen\sw-version.js
```

## Réponses aux 5 questions de conception

1. **Local ou BDD ?** Local pur (Cache API du navigateur, par origine). Aucune donnée nouvelle
   en BDD ; complète le local-first déjà en place côté données (`cloud.js`/IndexedDB), version
   assets.
2. **Rapidité (poids, requêtes) ?** Coquille 565 Ko chargée une fois à l'install, puis
   cache-first (0 requête réseau pour le menu tant que la version ne change pas). Runtime
   stale-while-revalidate : 1 lecture cache immédiate + 1 requête réseau silencieuse en fond,
   jamais bloquante pour l'affichage.
3. **Réutilisable par un autre pôle ?** Oui : `sw.js` ne connaît aucun chemin dino/narration
   spécifique — les règles sont génériques par dossier (`img/`, `audio/`, `sounds/`) et par
   hostname (Supabase). Un nouveau pôle déployé dans `site/` en bénéficie sans modification.
4. **i18n (langue dans la clé ou le chemin) ?** Sans objet pour le SW lui-même — il cache par
   URL telle quelle, et les bundles i18n (`site/js/i18n/*.js`) suivent déjà leur propre
   convention de chemin (langue dans le nom de fichier), inchangée. Le SW les traite comme tout
   autre asset runtime (network-first, hors precache coquille).
5. **Index ou manifeste nécessaire, et où ?** Le manifeste de la coquille EST `PRECACHE_LIST`
   dans `sw.js`, relu par `gen-sw-version.mjs` pour le hash (pas de second fichier à maintenir).
   Pas de manifeste séparé pour le runtime : le cache API sert lui-même d'index (clé = URL),
   plafonné et évincé en FIFO par `trimCache()`.

## Questions

Aucune — le périmètre du brief a pu être exécuté intégralement avec les fichiers autorisés. Deux
notes pour l'orchestrateur, pas des blocages :

- `site/js/gen/dinos-data.js` est apparu en untracked après `npm run build` (généré par le
  générateur que HO-R12 modifie en parallèle) — non touché, hors de mes fichiers autorisés.
- `audit-gabarit.mjs` ne couvre que les 36 `mj-*.html`, jamais les 8 pages annexes : si une
  régression future retire le lien manifest ou le script SW d'une page annexe, rien ne
  l'attrapera automatiquement. Décision à prendre par l'orchestrateur si une couverture plus
  large est voulue (hors périmètre de ce brief, qui listait `audit-gabarit.mjs` sans en changer
  la portée de fichiers).

## Résumé (10 lignes)

Service worker MaxPlay créé : coquille (565 Ko, 25 fichiers) précachée cache-first et versionnée
par hash (jamais en dur), img/audio/sounds en stale-while-revalidate plafonné, Supabase jamais
intercepté. Manifest renommé et lié, SW enregistré sur les 44 pages HTML du site, sans toucher
aux lignes de script `dinos-data.js` réservées à HO-R12. `package.json` build calcule la version
à chaque régénération. `audit-gabarit.mjs` bloque désormais si manifest ou SW manquent (0
BLOQUANT sur les 36 jeux). Testé en Playwright réel via serveur HTTP local, viewport 360 px :
menu et un jeu déjà visité s'affichent complets hors ligne, une page jamais visitée retombe
proprement sur `offline.html`. `npm run check` et `npm test` (36/36) verts. Aucune commande git,
aucun fichier hors périmètre touché.
