# HO-R09 — Mur piloté par le catalogue, `check-mj-coherence`, gabarit source de mini-jeu

**Statut :** pret
**Depend de :** HO-R08
**Vague :** 3 · **Exécutant :** sous-agent Sonnet

## Objectif
Livrer un mini-jeu est un process contrôlé : un gabarit à copier, un catalogue qui pilote le menu et le Mur, un contrôle bloquant en CI qui refuse tout jeu incomplet (D-012).

## Contexte a lire d'abord
- `memory/DECISIONS.md` D-012 ; `memory/audits/2026-09-12-archi-ged-site-studio.md` § P3
- `site/js/{catalog,mur,mj-shell}.js`, `studio/minijeux/docs/STANDARD-MJ.md`, `studio/minijeux/tests/audit-gabarit.mjs`

## Fichiers autorises
- `site/js/{mur,catalog}.js`, `site/css/mur.css`, `site/_template/**` (nouveau)
- `studio/minijeux/tests/check-mj-coherence.mjs` (nouveau), `studio/minijeux/tests/{index,mur-nid}.spec.mjs`
- `.github/workflows/deploy.yml` (étape check), `package.json` (script `check` : ajout d'une ligne)
- `studio/minijeux/docs/STANDARD-MJ.md`, `studio/minijeux/CLAUDE.md` (section livraison)

## Hors perimetre
- `site/mj-*.html` (HO-R10 en parallèle). Aucune commande git.

## Travail
1. Chaque entrée de `MAXPLAY_CATALOG` reçoit les champs que `mur.js` code en dur (zone, vignette, libellé Mur). `mur.js` ne contient plus aucun id `mj-` : il itère sur `catalogVisible()`. `mj-58` disparaît ; les 9 jeux absents apparaissent ou sont explicitement `parental`/`retire` avec raison.
2. `site/_template/mj-template.html` : squelette complet (head, dépendances dans l'ordre canonique, `.hdr`, `MJ.init`, `G.buildPips`, `G.showEnd`, section i18n, commentaire « comment livrer »).
3. `check-mj-coherence.mjs` : pour chaque jeu du catalogue vérifie html, figée, spec Playwright, 4 `strings.json`, clés référentiel, entrée `textes-jeux` ; pour chaque `mj-*.html` sur disque une entrée catalogue. **Bloquant** dans `npm run check` et dans `deploy.yml`.
4. `STANDARD-MJ.md` + `CLAUDE.md` minijeux : le process de livraison tient en une page : copier le gabarit → coder → `npm run test:mj` → `npm run check` → figée → commit.

## Portes de verification
```bash
node studio/minijeux/tests/check-mj-coherence.mjs     # 0 erreur sur 36 jeux
npm run test:mj -- index && node studio/minijeux/tests/run.mjs mur-nid
# capture du Mur à 360 px ouverte et lue : 36 jeux visibles ou justifiés dans le rapport
```

## Definition of done
Portes vertes, gabarit présent, process écrit en une page, rapport dans `docs/handoffs/rapports/HO-R09.md`.

## Rapport attendu
Diff des champs ajoutés au catalogue, liste des 9 jeux réapparus (ou raison), sortie du check, capture, questions.
