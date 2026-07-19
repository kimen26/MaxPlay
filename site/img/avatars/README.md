# img/avatars/ — avatars chibi du compte enfant

87 PNG, convention `<id>_<mood>_<n>.png` (moods : `joyeux` / `enerve` / `original`).

- **Manifest** : `site/js/avatars.js` (généré — ne pas éditer à la main).
- **Générateur du manifest** : `studio/minijeux/scripts/gen_avatars_manifest.py` (rapatrié de `c:/tmp` le 2026-07-19).
- **Consommateur** : `site/js/avatar-picker.js` (sélecteur d'avatar du compte).
- **Pipeline images** : Grok low-poly facetté → bouton Télécharger → `make_avatar.py` (découpe fond) — cf. mémoire `reference_pipeline_avatars_dinos`.
- **Ajout d'un avatar** : générer les 3 moods → déposer ici → relancer `gen_avatars_manifest.py`.

_Créé 2026-07-19 (audit GED — dossier auparavant non indexé)._
