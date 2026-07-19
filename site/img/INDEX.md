# site/img/ — carte des images déployées

> Créé 2026-07-19 (audit nettoyage GED). Chaque sous-dossier a un rôle et un consommateur — un dossier non listé ici = anomalie.

| Dossier | Rôle | Consommateur | Index détaillé |
|---|---|---|---|
| `dinos/` | Toutes les images dino (fiches, galeries, réserves mini-jeux) | `dev-dinos.html` + manifests js | [`dinos/README.md`](dinos/README.md) → carte maîtresse [`studio/dino/content/INDEX-IMAGES.md`](../../studio/dino/content/INDEX-IMAGES.md) |
| `avatars/` | Avatars chibi du compte enfant (87 img, `<id>_<mood>_<n>.png`) | `js/avatars.js` (manifest généré) + `js/avatar-picker.js` | [`avatars/README.md`](avatars/README.md) |
| `decor/` | Images de contexte (arbre, rocher, volcan, nuage…) — ligne de bus ET planètes fusée | `js/decor.js` → `index2.html` | [`decor/README.md`](decor/README.md) |
