# Audit MaxPlay — Avril 2026

> ⚠️ **SNAPSHOT HISTORIQUE figé (avril 2026)** — couvre MJ-01→17 uniquement. Le projet est depuis passé à 21 MJ + l'encyclopédie dinosaure (60 dinos). Pour l'**état actuel**, voir [`game/memory/state.md`](../../memory/state.md) et [`game/pmo/`](../../pmo/). Conservé comme photographie d'époque, pas comme doc vivant.

Revue complète des mini-jeux (MJ-01 → MJ-17), plan de factorisation, benchmark externe et roadmap technique.

## 📑 Les 4 livrables

| # | Document | Contenu | Pour qui |
|---|---|---|---|
| 1 | [jeux-2026-04.md](jeux-2026-04.md) | Audit technique par jeu (keep / refactor / retire) | Dev / décision scope |
| 2 | [factorisation.md](factorisation.md) | Plan de factorisation CSS + JS, `common.js` proposé | Dev, migration incrémentale |
| 3 | [../research/benchmark-kids-games.md](../research/benchmark-kids-games.md) | Benchmark apps enfants 3-5 ans (Toca, Sago, Khan Kids, Tayo, …) | Inspiration design & mécaniques |
| 4 | [roadmap-technique.md](roadmap-technique.md) | Possibilités techniques court/moyen/long terme | Cadrage nouveaux chantiers |

## 🔗 Liens transverses

- Source : [`site/`](../../../../site/) — HTML vanilla des 17 mini-jeux
- Utilitaires partagés : [`site/js/`](../../../../site/js) (bus-svg, sounds, feedback, data, qcm-retry, tracker…)
- Backlog vivant : [`tasks/BACKLOG.md`](../../tasks/BACKLOG.md)
- Profil cible : [`memory/MAX_PROFILE.md`](../../../../memory/MAX_PROFILE.md)
- Specs historiques : [`game/docs/jeux/GAMES_SPECS.md`](../jeux/GAMES_SPECS.md)

## 🧭 Ordre de lecture conseillé

1. **jeux-2026-04.md** — savoir ce qu'on a vraiment
2. **factorisation.md** — savoir ce qu'on peut nettoyer sans rien casser
3. **benchmark-kids-games.md** — piocher dans les bonnes pratiques du marché
4. **roadmap-technique.md** — décider la suite

## 🗓 Métadonnées

- **Date** : 2026-04-22 (roadmap ajoutée)
- **Périmètre** : 17 MJ HTML vanilla (MJ-01 → MJ-17) + dev-lab + max-adventure + suivi + menu
- **Volume analysé** : ~14 000 lignes HTML/JS (`wc -l site/**`)
- **Hors périmètre** : Phaser build MJ-07 (hub 2D à revoir séparément)
