# HO-R08 — `package.json` racine, `site/js/gen/`, `npm run build / check / test`

**Statut :** pret
**Depend de :** HO-R01, HO-R07 (vague 1 commitée)
**Vague :** 2 · **Exécutant :** sous-agent Sonnet · **seul sur `site/` pendant cette vague**

## Objectif
On distingue d'un coup d'œil le code écrit main du code généré ; une seule commande régénère tout, une seule vérifie tout, une seule teste tout, depuis la racine.

## Contexte a lire d'abord
- `memory/DECISIONS.md` D-008
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P2
- `.github/workflows/*.yml`, `studio/minijeux/tests/{package.json,run.mjs,run-all.mjs,audit-gabarit.mjs}`

## Fichiers autorises
- `package.json` (nouveau, racine), `package-lock.json`
- `site/js/**` (déplacements vers `site/js/gen/`), tous `site/*.html` (lignes `<script src>` uniquement)
- Générateurs dans `studio/{dino,minijeux,referentiel}/**/scripts/**` (ligne de chemin de sortie uniquement)
- `.github/workflows/*.yml`, `studio/minijeux/tests/{package.json,run,run-all,audit-gabarit}.mjs`

## Hors perimetre
- `site/lecture-data.js` et `studio/narration/**` (narration hors périmètre : `lecture-data.js` reste à la racine, exception notée dans le README du gen/).
- `site/js/dinos-data.js` reste dans `js/` (devient généré en HO-R12). Aucune commande git.

## Travail
1. Inventorier les 14 fichiers marqués « généré » ; **prouver** pour chacun l'existence du générateur. Avec générateur → `site/js/gen/` + en-tête normalisé `// GÉNÉRÉ par <chemin du script> — ne pas éditer`. Sans générateur → reste dans `js/`, marqueur retiré.
2. `package.json` racine, scripts : `build` (tous les générateurs dans l'ordre des dépendances), `check` (audit-gabarit + référentiel + liens md), `test` (Playwright run-all), `test:mj -- mj-XX`, `gc` (réservé HO-R14). `studio/minijeux/tests/package.json` fusionné (dépendance `playwright` à la racine).
3. CI : `npm ci && npm run check` avant déploiement ; `test-minijeux.yml` utilise `npm test`.
4. `site/js/gen/README.md` : liste fichier → générateur → source.

## Portes de verification
```bash
npm run build && git status --short        # aucun diff hors déplacements : les générateurs sont déterministes et à jour
npm run check                              # vert
npm test                                   # vert (en fond, coller le résumé)
# Playwright : ouvrir site/index.html et site/dev-dinos.html, 0 erreur console, captures jointes
```

## Definition of done
Les 4 portes passent, `site/js/gen/README.md` existe, rapport dans `docs/handoffs/rapports/HO-R08.md`.

## Rapport attendu
Tableau des 14 fichiers (généré par / déplacé ou marqueur retiré), scripts npm, sorties des portes, questions.
