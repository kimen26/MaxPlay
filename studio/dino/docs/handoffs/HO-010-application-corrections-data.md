# HO-010 — Application des corrections data (orchestrateur)

**Statut :** bloque par HO-009
**Depend de :** HO-009 (4 rapports JSON)
**Exécutant :** orchestrateur (session principale) — seul propriétaire de `dinos-data.js`.

## Objectif

`site/js/dinos-data.js` dit vrai sur les 71 dinos (mesures, lieux, Texte fiche) et toutes les
comparaisons d'échelle en découlent par exécution des fonctions, jamais à la main.

## Fichiers autorisés

- `site/js/dinos-data.js`
- `studio/dino/content/i18n/{en,es-es,pt-br}/strings.json` — UNIQUEMENT les champs touchés par une correction
  (un chiffre qui change en FR change la comparaison localisée, HO-013 les recroise)
- `site/js/i18n/dinos-strings.*.js` (régénérés par `_gen-strings-bundle.cjs`, jamais à la main)
- `studio/dino/memory/INVARIANTS.md` (count 71 réconcilié, date de vérif mesures)
- `studio/dino/memory/DECISIONS.md` (arbitrages non évidents, ex. hauteur = hanche/épaule)

## Méthode

1. Fusionner les 4 JSON. Appliquer chaque `propose` non nul avec `action: corriger`.
2. Ne JAMAIS toucher `comp_taille/comp_hauteur/comp_poids` à la main — ce sont des appels de fonction sur la valeur.
3. Régénérer et vérifier :

```bash
node studio/dino/content/scripts/export/_verif-comppoids.cjs
node -e "require('./studio/dino/content/scripts/export/_gen-strings-bundle.cjs')" 2>/dev/null || node studio/dino/content/scripts/export/_gen-strings-bundle.cjs
node studio/dino/content/scripts/export/_check-traduction.cjs en && node studio/dino/content/scripts/export/_check-traduction.cjs es-es && node studio/dino/content/scripts/export/_check-traduction.cjs pt-br
node -e "const s=require('fs').readFileSync('site/js/dinos-data.js','utf8');new Function(s+';console.log(DINOS.length)')()"
```
4. Playwright : ouvrir `site/dev-dinos.html`, 0 erreur console, ouvrir 3 fiches corrigées, capture.
5. Commit ciblé `fix(dino): ...` + push.

## Rapport attendu

Tableau des corrections appliquées (id · champ · avant → après · source), sortie brute des 4 commandes,
capture d'une fiche corrigée.
