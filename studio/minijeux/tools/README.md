# Outils d'auteur (hors prod)

Sorti de `site/` le 2026-09-03 (HO-G10) : ces pages ne sont jamais servies à Max, elles partaient
en prod à chaque déploiement sans raison (le workflow copie `site/*` sans filtre).

- `pages/` — pages de dev/design ponctuelles (`dev-fx.html`, `dev-sounds-ui.html`,
  `design-mockups.html`, `atelier-couleurs.html`).

## Lancer en local

```
npx serve studio/minijeux/tools/pages
```

ou ouvrir directement le fichier `.html` dans un navigateur (pas de build requis).

## Scripts i18n panneau règle (HO-MJ-02)

Exécuter depuis la racine du repo (`node studio/minijeux/tools/<script>`) :

- `_extract-mj-regles.mjs [mj-XX ...]` — ouvre chaque `site/mj-*.html` (Playwright), intercepte
  `RegleInfo.init(cfg.regle)` et écrit `studio/minijeux/i18n/fr/strings.json` (référence FR).
- `_check-mj-traduction.cjs <lang>` — vérifie `studio/minijeux/i18n/<lang>/strings.json` contre
  le FR (clés identiques, nombre d'étapes, chiffres conservés, pas de chaîne vide).
- `_gen-mj-strings-bundle.cjs <lang>` — génère `site/js/i18n/mj-strings.<lang>.js` (`window.MJ_STRINGS`)
  depuis `studio/minijeux/i18n/<lang>/strings.json`. Ne pas éditer le fichier généré à la main.
