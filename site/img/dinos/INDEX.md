# Images dino — carte du dossier (déployé)

> Tout ce qui est ici est **déployé sur GitHub Pages** et **référencé par le code**.
> Les sources de travail non déployées vivent dans `studio/dino/content/sources/images/`.

## Dossiers et leur rôle

| Dossier | Contenu | Branché par | Format |
|---------|---------|-------------|--------|
| `.` (racine) | **Portraits hero** de chaque fiche (`<Dino>.png`) | `dinos-data.js` → `d.png` (hero `buildFiche`) | PNG compressé (max 1000px, palette) |
| `paleoart/` | **Séries paléoart** par dino : `_manger`, `_paris`, `_ecosysteme`, `_funfact`, `_dents` | `DINO_EXTRAS` (`dev-dinos.html`) | JPG q82 (max 1200px) |
| `grok/` | Images IA Grok (taille / environnement / chasse) | `dinos-images-grok.js` → `DINO_GROK` | JPG |
| `wiki/` | Illustrations Wikimedia Commons (CC) | `dinos-images-local.js` → `DINO_WIKIMEDIA` | SVG / JPG / PNG |
| `scale/` | Comparaisons de taille (vs enfant/humain) | `DINO_EXTRAS` | PNG |
| `paws/` | Griffes, dents, empreintes (fossiles) | `DINO_EXTRAS` | PNG |
| `variants/` | Variantes (plumes, coloris, cartoon) | `DINO_EXTRAS` | PNG |
| `silhouettes/` | 208 silhouettes noires par famille | `dino-silhouettes.js` (mj-24/25/26, dev-silhouettes) | PNG |

## Galeries de fiche

`buildFiche()` ([dev-dinos.html](../../dev-dinos.html)) fusionne **3 sources** par dino :
`DINO_GROK` + `DINO_EXTRAS` (paleoart/scale/paws/variants) + `DINO_WIKIMEDIA`.

## Compression (politique B1 — mobile léger pour Max)

- Portraits racine : PNG palette, max 1000px (transparence préservée).
- Paléoart : JPG q82, max 1200px.
- Originaux HD **supprimés** après compression (consigne 2026-06-19).
- Essais/sources non déployés → `studio/dino/content/sources/images/`.

## Régénérer

- Paléoart : skill `dino-paleoart` → produit les HD → recompresser (`sharp` resize 1200 + jpeg q82) → `paleoart/`.
- Brancher : ajouter l'entrée dans `DINO_EXTRAS` (`{ folder:'paleoart', file:'<dino>_<suf>.jpg', label:'…' }`).

_Rangé 2026-06-19 : −70 % de poids (509 Mo → 152 Mo), 81 images paléoart branchées dans 21 fiches, 7 portraits marins/géants rattrapés._
