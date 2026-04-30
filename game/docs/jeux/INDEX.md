# Jeux — Index agent

> **Charger ce fichier en premier.** Lire les sous-fichiers seulement si la tâche le nécessite.

---

## État du projet

| Quoi | Statut |
|------|--------|
| Jeux déployés | MJ-01 à MJ-20 — voir [tasks/BACKLOG.md](../../tasks/BACKLOG.md) pour détail par jeu |
| Jeux actifs (menu) | MJ-01, 04–06, 08–09, 11–17, 20 (MJ-02, 03, 07, 10 retirés du menu) |
| Stack | HTML vanilla · `game/web/js/` partagé · GitHub Pages |
| Audit technique | ✅ fait (2026-04-22) — voir `../audit/` |

---

## Règles non-négociables

1. **Bus** : toujours `busSVG()` / `busSVGHiddenNum()` de [`game/web/js/bus-svg.js`](../../web/js/bus-svg.js). Jamais d'emoji 🚌, jamais de div CSS colorée.
2. **Couleurs** : toujours depuis [`game/web/js/data.js`](../../web/js/data.js) → `LIGNES`. Jamais de hex hardcodé.
3. **Pool multi-couleurs** : `selectDistinctColors(pool, n)` — anti-doublons visuels.
4. **UX** : zéro pénalité punitive · feedback < 200ms · zones tap min 80px · sessions 3–8 min.

---

## Carte des fichiers

### Specs & design

| Fichier | Quand le lire |
|---------|--------------|
| [GAMES_SPECS.md](GAMES_SPECS.md) | **Avant toute modif d'un jeu** — objectif péda, mécanique, pool de lignes |
| [game-ideas.md](game-ideas.md) | Backlog créatif brut (non priorisé) |
| [MENU-MAP-VILLEJUIF.md](MENU-MAP-VILLEJUIF.md) | Plan menu hybride carte Villejuif + grille jeux (non implémenté) |

### Assets

| Fichier | Contenu |
|---------|---------|
| [ASSETS.md](ASSETS.md) | Assets visuels — SVG bus, sprites, règles `temp/` vs `game/public/assets/` |
| [AUDIO_ASSETS.md](AUDIO_ASSETS.md) | Sons validés (liens Pixabay) : bus, animaux, cartoon, UI |
| [ASSETS_INVENTORY.md](ASSETS_INVENTORY.md) | Métadonnées pack Modern Exteriors (40k PNG, référence uniquement) |

### Historique

| Fichier | Contenu |
|---------|---------|
| [IMPROVEMENTS.md](IMPROVEMENTS.md) | Log de fixes sessions MJ-01→14 (historique, suivi maintenant dans BACKLOG) |
| [ITERATION_NOTES.md](ITERATION_NOTES.md) | Journal de dev MJ-07 Phaser sandbox (sprints 1-4 terminés) |

### Audit (dossier séparé)

| Fichier | Contenu |
|---------|---------|
| [../audit/INDEX.md](../audit/INDEX.md) | **Point d'entrée** — 4 livrables d'audit (avril 2026) |
| [../audit/jeux-2026-04.md](../audit/jeux-2026-04.md) | Verdict keep/refactor/retire par jeu |
| [../audit/factorisation.md](../audit/factorisation.md) | Plan factorisation CSS/JS partagé |
| [../audit/roadmap-technique.md](../audit/roadmap-technique.md) | Roadmap court/moyen/long terme |

---

## Architecture déploiement

```
GitHub Pages → kimen26.github.io/MaxPlay/
├── /              ← game/web/index.html (menu)
├── /mj-XX.html    ← HTML vanilla (source: game/web/)
└── /mj-07/        ← Phaser build (CI uniquement)
```

CI : `.github/workflows/deploy.yml` assemble dans `_site/` (non commité).

---

## Profil cible

Max, 3.5–4 ans. Voir [docs/MAX_PROFILE.md](../MAX_PROFILE.md) pour passions, lignes connues, contraintes tactile.
