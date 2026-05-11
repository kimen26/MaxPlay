# tile-tools/_archive/

Dossier d'archivage pour fichiers obsolètes mais conservés pour traçabilité.

Vide actuellement (créé EP-VOCAB 2026-05-11).

## Convention

Avant de supprimer un fichier `tile-tools/*`, le déplacer ici avec :
- Date d'archivage
- Raison d'archivage
- Référence à ce qui le remplace (si applicable)

## Inventaire à venir (sessions futures)

Candidats à archiver après vérification d'usage :

- `cartography.json` (marqué DEPRECATED 2026-05-11, mais lu par `cartography.js` côté tile-picker → besoin migration JS avant suppression)
- `scripts/render_debug.py` (debug one-shot)
- `scripts/zoom_index.py` (debug one-shot)
- `scripts/build_rondpoint_tmj.py` + `scripts/render_tmj.py` (format Tiled TMJ — non utilisé en prod)
- `scripts/recolor_house.py` (one-shot ad hoc)
- `recipes/test_passage_pieton_route_h.py` + `.png` (recette pas auditée visuellement par Papa Yann)
- `recipes/test_passage_pieton_route_v.py` + `.png` (idem)

⚠️ Avant de bouger ces fichiers : vérifier qu'aucun outil web (`tools/*.html`) ou doc Markdown ne les référence.
