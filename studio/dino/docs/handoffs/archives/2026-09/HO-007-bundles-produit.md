# HO-007 — Generation des bundles produit

**Statut :** pret (outil ecrit, attend HO-006)
**Depend de :** HO-006 (relecture native validee)

## Objectif

Descendre les 3 traductions validees de `studio/` vers `site/js/i18n/dinos-strings.<lang>.js`,
et prouver en navigateur que `?lang=<lang>` affiche bien la langue.

## Fichiers autorises
- `site/js/i18n/dinos-strings.en.js`, `.es-es.js`, `.pt-br.js` (generes)

## Hors perimetre
- `site/js/dinos-data.js` (gele) · `site/js/dinos-i18n.js` (fait en HO-001)
- Les dossiers `studio/dino/content/i18n/<lang>/` (propriete des briefs de traduction)

## Portes de verification
```bash
node studio/dino/content/scripts/export/_gen-strings-bundle.cjs en
node studio/dino/content/scripts/export/_gen-strings-bundle.cjs es-es
node studio/dino/content/scripts/export/_gen-strings-bundle.cjs pt-br
node --check site/js/i18n/dinos-strings.en.js
```
Puis recette VISUELLE Playwright : ouvrir `dev-dinos.html?lang=en`, `?lang=es-es`,
`?lang=pt-br`, capturer, et **ouvrir les captures** — un log vert ne prouve pas que
l'oeil voit la bonne langue. Verifier en plus qu'aucune erreur console n'apparait.
