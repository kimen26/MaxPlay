# Max Adventure — source Phaser (membre du pôle JEU)

> Ce dossier est la **source Phaser TS + Vite** de Max Adventure. Il **appartient au pôle JEU** : sa gouvernance vit dans [`../minijeux/`](../minijeux/CLAUDE.md) (PMO, archiviste, INVARIANTS, décisions). Ce fichier n'est qu'un **panneau d'aiguillage** — pas un pôle autonome.
> ⚠️ Non re-injecté après `/compact`. Recharge au prochain contact d'un fichier `studio/max-adventure/`.

## Où je suis dans l'archi

```
studio/max-adventure/     ← CE dossier (source Phaser, non déployé tel quel)
├── src/                  ← scènes Phaser (HubScene, SandboxScene…)
├── public/assets/        ← tiles LimeZu, sprites, sons
├── index.html · vite.config.ts · tsconfig.json · package.json
└── dist/                 ← build (gitignored, motif `dist/`)

Build CI : studio/max-adventure/ → dist/ → copié dans _site/max-adventure/ → /max-adventure/
Splash : site/max-adventure.html (→ ./max-adventure/)
```

## Règles (héritées du pôle JEU)

- **Gouvernance** : [`../minijeux/CLAUDE.md`](../minijeux/CLAUDE.md) + [`../minijeux/INDEX.md`](../minijeux/INDEX.md). PMO/archiviste = `game-pmo` / `game-archiviste`.
- **Stack & déploiement** : [`../minijeux/memory/stack.md`](../minijeux/memory/stack.md) (Phaser 3, Vite, TS strict, 1024×768, OGG+MP3, SVG bus).
- **Tiles LimeZu** : pipeline `game-tile-simplifier → designer → reviewer` ; les tiles arrivent ici via `import_themes.py` (`studio/minijeux` scripts → `public/assets/tiles/`).
- **Bus** : jamais d'emoji 🚌, toujours SVG (règle pôle JEU).
- **CI** : [`../../.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) (`working-directory: studio/max-adventure`).

## État

🔄 En cours (Phaser, HubScene + SandboxScene). Bug actif éventuel : voir [`../minijeux/memory/state.md`](../minijeux/memory/state.md).

---

_Créé 2026-06-04 (audit `/pmo-challenge`) : clôt la zone grise « max-adventure sans gouvernance propre ». Reste un membre du pôle JEU, pas un pôle autonome — ré-héberger seulement si le Phaser RPG (Phase 2 WexWorld) prend de l'ampleur._
