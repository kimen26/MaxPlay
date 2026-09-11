# Scripts (pôle JEU)

Générateurs de contenu + outils d'auteur, pas des tests — rangés hors de `tests/` depuis le
2026-09-03 (HO-G10). Fusion `tools/` → `scripts/` le 2026-09-12 (HO-R01) : un seul dossier,
plus de frontière `tools/` vs `scripts/` à retenir.

## Génération de contenu

- `audio/` — génération des MP3 jeu (consignes, règles, nombres, phonèmes) via `studio/referentiel/`
  (voir `studio/referentiel/README.md` pour le contrat "constater vs générer").
- `avatars/` — `batch-avatars-{dual,gpt,grok}.mjs`, génération des avatars dino (Playwright + Grok/ChatGPT).
- `decor/` — `batch-decor-gpt.mjs`, génération des éléments de décor (mur/fusée).
- `gen-avatars-manifest.mjs` — génère `site/js/avatars.js` depuis `site/img/avatars/<id>_<mood>_<n>.png`
  (variant-aware). Réécrit en `.mjs` le 2026-09-12, remplace l'ancien `gen_avatars_manifest.py`
  (seul Python du repo JS).

## Outils i18n panneau règle (HO-MJ-02)

Exécuter depuis la racine du repo (`node studio/minijeux/scripts/<script>`) :

- `_extract-mj-regles.mjs [mj-XX ...]` — ouvre chaque `site/mj-*.html` (Playwright), intercepte
  `RegleInfo.init(cfg.regle)` et écrit `studio/minijeux/i18n/fr/strings.json` (référence FR).
- `_check-mj-traduction.cjs <lang>` — vérifie `studio/minijeux/i18n/<lang>/strings.json` contre
  le FR (clés identiques, nombre d'étapes, chiffres conservés, pas de chaîne vide).
- `_gen-mj-strings-bundle.cjs <lang>` — génère `site/js/i18n/mj-strings.<lang>.js` (`window.MJ_STRINGS`)
  depuis `studio/minijeux/i18n/<lang>/strings.json`. Ne pas éditer le fichier généré à la main.

## Pages de dev/design (hors prod)

Sorties de `site/` le 2026-09-03 (HO-G10) : ces pages ne sont jamais servies à Max, elles partaient
en prod à chaque déploiement sans raison (le workflow copie `site/*` sans filtre).

- `pages/` — pages de dev/design ponctuelles (`dev-fx.html`, `dev-sounds-ui.html`,
  `design-mockups.html`, `atelier-couleurs.html`).

Lancer en local : `npx serve studio/minijeux/scripts/pages` ou ouvrir directement le `.html`
dans un navigateur (pas de build requis).

## Scripts dino (frontière de pôle)

Les scripts qui manipulent des données/assets DINO vivent dans `studio/dino/scripts/`, pas ici
(déplacés le 2026-09-12, HO-R01) : `gen-dinos-assets.mjs`, `_check-catalogue-dino-i18n.mjs`,
`_check-ombres-dino.mjs`.

## Lancer

Scripts Node purs : `node studio/minijeux/scripts/audio/<script>.mjs` (dry-run par défaut, flag
`--pour-de-vrai` pour un vrai appel API — jamais lancé sans validation explicite).
Scripts `avatars/`, `decor/`, `pages/`, i18n : nécessitent Playwright installé
(`npm i` dans `studio/minijeux/tests/`).
