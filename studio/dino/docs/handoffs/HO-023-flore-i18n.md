# HO-023 — Flore : i18n en / es-es / pt-br

**Statut :** brouillon
**Depend de :** HO-020 + HO-021 (merge `S.plantes` en place).

## Objectif
Traduire les champs texte de `DINO_PLANTES` (name, nom_etym, region, comp_hauteur recalculée en unités cibles, environnement, feuille, graines, mangee_comment, superpower, fait, vivant) selon `_CHARTE-TRADUCTION.md`, ajouter `plantes` au corpus + aux bundles `site/js/i18n/dinos-strings.<lang>.js`.

## Fichiers autorisés
- `content/i18n/_corpus/**`, `content/i18n/<lang>/strings.json`, `content/scripts/export/_extract-corpus-i18n.cjs`, `_gen-strings-bundle.cjs`, `site/js/i18n/dinos-strings.*.js`

## Portes
```bash
for l in en es-es pt-br; do node content/scripts/export/_check-traduction.cjs $l; done
```
