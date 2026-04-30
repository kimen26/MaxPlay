---
name: État jeux MaxPlay
description: État condensé du pôle jeu — jeux déployés, bugs actifs, règles critiques, backlog
type: project
---

> Charger ce fichier au démarrage de toute session JEU. Puis lire `tasks/BACKLOG.md` pour le détail.

## État déploiement (2026-04-29)

**21 jeux actifs** : mj-01, mj-04–06, mj-08–09, mj-11–13 (a/b/c), mj-14–20, max-adventure
**Retirés du menu** : mj-02, mj-03, mj-07, mj-10 (consolidés)
**GitHub Pages** : `kimen26.github.io/MaxPlay/` — CI via `.github/workflows/deploy.yml`

## Bugs actifs

| EP | Jeu | Bug |
|----|-----|-----|
| EP-024 | max-adventure | Cassé — à diagnostiquer |
| EP-022 | MJ-04 | Boucle infinie sans `endSession` |

## Backlog prioritaire

| EP | Titre |
|----|-------|
| EP-023 | Menu carte de Villejuif (plan archivé : `_archive/docs-jeux-cadavres/MENU-MAP-VILLEJUIF.md`) |
| EP-015 | Carnet de Max / Garage progression |
| EP-026 | TTS ElevenLabs (voix clonées, agent voice-director) |

## Règles critiques non-négociables

- **Bus** : `busSVG()` / `busSVGHiddenNum()` depuis `game/web/js/bus-svg.js` — JAMAIS emoji 🚌 ni div CSS
- **Couleurs** : `selectDistinctColors(pool, n, minDist=80)` pour tout quiz multi-couleurs
- **UX** : zones tap min 80×80px · feedback < 200ms · zéro pénalité · sessions 3–8min
- **Sons** : `victory-sounds.js` fins de partie · `sounds.js` AudioContext singleton
- **Vocab Max** : centre bus = dodo · garage = réparation · village des bus = terminus (réservé)

## Fichiers clés jeu

| Fichier | Rôle |
|---------|------|
| `game/web/js/bus-svg.js` | SVG bus — lire avant tout |
| `game/web/js/data.js` | LIGNES (26 actives), DESTINATIONS |
| `game/web/js/tracker.js` | Suivi progression localStorage |
| `docs/ratp-colors.json` | Source de vérité couleurs+terminus |
| `memory/stack.md` | Architecture complète + règles déploiement |
| `memory/rules-jeu.md` | Règles UX/péda + designs validés |
| `tasks/BACKLOG.md` | Source de vérité épics |

## Agent à appeler

**`game-dev`** (Sonnet) — pour tout développement, correction, amélioration jeu.
