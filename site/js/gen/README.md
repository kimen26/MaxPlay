# `site/js/gen/` — fichiers générés

Tout ce qui vit ici est écrit par un script sous `studio/**/scripts/**` (ou équivalent) et
**ne se modifie jamais à la main** : la prochaine régénération (`npm run build`, racine du
repo) écrase le fichier. Une modification manuelle disparaît sans avertissement.

Chaque fichier porte un en-tête `// GÉNÉRÉ par <chemin du script> — ne pas éditer`. Ce README
en est la table des matières.

| Fichier | Généré par | Source |
|---|---|---|
| `avatars.js` | `studio/minijeux/scripts/gen-avatars-manifest.mjs` | `site/img/avatars/<id>_<mood>_<n>.png` (scan disque) |
| `dinos-assets.js` | `studio/dino/scripts/gen-dinos-assets.mjs` | `site/img/dinos/{ombres,sprites,paleoart}/`, `site/img/avatars/` (scan disque) |
| `dinos-audio-manifest.js` | `studio/dino/content/scripts/export/_gen-audio-manifest.cjs` | `site/audio/dinos/<lang>/` (scan disque ; ne réécrit que les lignes de `Set`, le reste du fichier — helpers `playDinoNom`/`playDinoFunfact`/`playPeriode` — est écrit à la main et préservé) |
| `dinos-images-grok.js` | `studio/dino/content/scripts/images-grok/_gen-grok.cjs` | `site/img/dinos/grok/` (scan disque) |
| `dinos-plantes.js` | `studio/dino/content/scripts/export/_gen-plantes.cjs` | `studio/dino/content/sources/flore/plantes.json` |
| `dinos-racines.js` | `studio/dino/content/scripts/export/_etymo2racines.cjs` | `studio/dino/content/sources/etymo/_ETYMO-RACINES-50.md` |
| `lexique-fr.js` | `studio/dino/content/scripts/i18n/_gen-lexique-site.mjs` | `studio/dino/content/i18n/lexiques-prononciation/fr.md` (§2 + §2bis) |
| `textes-jeux.js` | `studio/referentiel/generer/_gen-textes-site.mjs` | `studio/referentiel/catalogue/` (textes canoniques, slugs, MP3) |

## Régénérer

```bash
npm run build     # régénère tous les fichiers ci-dessus, dans l'ordre
npm run check      # vérifie que le fichier commité est à jour (dinos-assets.js --check) + audit-gabarit + référentiel + liens md
```

## Cas particuliers restés hors de ce dossier

- `site/js/dinos-images-local.js` porte un en-tête historique « généré » mais **aucun
  générateur n'a été retrouvé** (audit HO-R08, 2026-09-12) : il reste dans `site/js/`,
  entretenu à la main, marqueur retiré.
- `site/js/dinos-data.js` reste dans `site/js/` : deviendra généré en HO-R12 (fiche canon dino).
- `site/js/dinos-i18n.js` et `site/js/mj-i18n.js` sont des surcouches écrites à la main — elles
  ne sont PAS elles-mêmes générées, mais elles chargent des fichiers générés dans
  `site/js/i18n/*.js` (bundles de traduction, 3 générateurs distincts : `_gen-ui-bundle.cjs`,
  `_gen-strings-bundle.cjs`, `_gen-mj-strings-bundle.cjs`, tous dans `studio/{dino,minijeux}/`).
- `site/lecture-data.js` reste à la racine de `site/` : narration hors périmètre de cette
  campagne (D-011).
