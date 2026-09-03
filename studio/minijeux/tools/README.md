# Outils d'auteur (hors prod)

Sorti de `site/` le 2026-09-03 (HO-G10) : ces pages ne sont jamais servies à Max, elles partaient
en prod à chaque déploiement sans raison (le workflow copie `site/*` sans filtre).

- `tile-tools/` — bibliothèque de tiles LimeZu, picker, mockups (skill `maxplay-tiles`).
- `web/` — hub `index.html` + petites démos (`brick-explorer.html`, `vocab-playground.html`...).
- `pages/` — pages de dev/design ponctuelles (`dev-fx.html`, `dev-sounds-ui.html`,
  `design-mockups.html`, `map-mockups.html`, `atelier-couleurs.html`).

## Lancer en local

```
npx serve studio/minijeux/tools/pages
```

ou ouvrir directement le fichier `.html` dans un navigateur (pas de build requis).
