# img/decor/ — images de contexte (décors)

14 PNG détourés : `arret_bus` · `buisson_fleurs` · `cactus` · `cratere` · `etoile_filante` · `fougere` · `geyser` · `meteorite_feu` · `nuage_blanc` · `nuage_gris` · `palmier` · `rocher` · `sapin` · `volcan_fumant`.

- **Convention** : `<id>.png`, fond transparent.
- **Consommateur** : `site/js/decor.js` (`Decor.html(id, opts)`) — même pool pour la ligne du bus et les planètes de la fusée (`index2.html`).
- **Régénération** : pipeline avatars/décors (Grok low-poly, cf. mémoire `reference_pipeline_avatars_dinos`) ; batch : `batch-decor-gpt.mjs` (cité dans `decor.js`).
- **Ajout d'un décor** : générer → détourer → déposer ici → ajouter l'id dans `decor.js`.

_Créé 2026-07-19 (audit GED — dossier auparavant non indexé)._
