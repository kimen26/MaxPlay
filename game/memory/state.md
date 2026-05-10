---
name: État jeux MaxPlay
description: État condensé du pôle jeu — jeux déployés, bugs actifs, règles critiques, backlog
type: project
---

> Charger ce fichier au démarrage de toute session JEU. Puis lire `game/tasks/BACKLOG.md` pour le détail.

## État déploiement (2026-05-03)

**22 jeux actifs** : mj-01, mj-04–06, mj-08–09, mj-11–13 (a/b/c), mj-14–20, max-adventure, **mj-pose-tiles** (🆕 kids 2026-05-10)
**Retirés du menu** : mj-02, mj-03, mj-07, mj-10 (consolidés)
**GitHub Pages** : `kimen26.github.io/MaxPlay/` — CI via `.github/workflows/deploy.yml`

## Session 2026-05-08 → 2026-05-10 (EP-TILES + EP-MJPOSE)

- ✅ Skill `~/.claude/skills/maxplay-tiles/` : SKILL.md (566 l) + LESSONS.md (30+ entrées)
- ✅ Agent dédié `.claude/agents/tile-pmo.md` (Haiku) — à invoquer après correction user, découverte, fin session
- ✅ `game/web/tools/` : hub + tile-picker (matrice drag&drop, 5 catégories, multi-tiles vraies dimensions, `?recipe=X.py`), tile-library-v3, mockups-routes (6 patterns échelle uniforme + bouton 🎨 Éditer)
- ✅ `mj-pose-tiles.html` : 🦺🚧 mini-jeu kids (8×8 tactile, 5 catégories, bouton Lisser)
- ✅ 13 recettes Python validées + 13 PNG (routes, virages, carrefour, rond-point, quartier, parking, voie bus, passages piétons)
- ✅ Cartographie LimeZu corrigée — L-013 à L-018 (voir BACKLOG)
- ✅ Workflow Propose → Édite → Apprend opérationnel

## Session 2026-05-03

- ✅ EP-021 vocab : MJ-08 "Au centre bus" / MJ-17 "Le garage" partout
- ✅ EP-027 MJ-20 : progression Duolingo par langue + paliers + localStorage
- ✅ EP-029 MJ-19 : 50-80 bus (avec doublons) au lieu de 20-30
- ✅ EP-031 MJ-15 : niveau D (roues colorées) + niveau E (combo couleur+numéro)
- ✅ EP-032 MJ-09 : multi-touch 2 doigts (Pointer Events + Map)
- ✅ EP-033 : TTS annonce titre désactivé (laggait le démarrage)

## Bugs actifs

Aucun. Max Adventure tourne en prod (vérifié 2026-05-03 : `kimen26.github.io/MaxPlay/max-adventure/` charge phaser-*.js et index-*.js correctement).

## Backlog prioritaire

| EP | Titre |
|----|-------|
| EP-TILES | Pipeline tile-tools : intégrer le quartier 16×12 dans Phaser (remplace grosse croix max-adventure), étendre à 24×18 puis 32×24 |
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
| `game/docs/ratp-colors.json` | Source de vérité couleurs+terminus |
| `game/memory/stack.md` | Architecture complète + règles déploiement |
| `game/memory/rules.md` | Règles UX/péda + designs validés |
| `game/tasks/BACKLOG.md` | Source de vérité épics |

## Agents à appeler

| Agent | Modèle | Rôle |
|-------|--------|------|
| **`game-dev`** | Sonnet | Développement, correction, amélioration jeu (HTML vanilla + Phaser) |
| **`game-pmo`** | Haiku | **PMO pôle JEU** — garant `state.md` + `BACKLOG.md`. À invoquer à chaque tour incluant un signal JEU. Orchestre les sous-spé. |
| **`game-tile-pmo`** | Haiku | Sous-spé PMO pipeline tile-tools LimeZu (parent : game-pmo). Scope strict 5 fichiers : LESSONS, cartography.json, patterns.js, recipes_data.js, PIPELINE-MEMORY.md. |
| **`game-tile-simplifier`** | Sonnet | Sachant tile #1/3 — image/desc → ANALYSE structurée |
| **`game-tile-designer`** | Sonnet | Sachant tile #2/3 — ANALYSE → recette Python + PNG |
| **`game-tile-reviewer`** | Haiku | Sachant tile #3/3 — verdict PASS/FAIL avec issues |

**Hiérarchie + pipeline** (refonte 2026-05-11) :
- **PMO** : main → game-pmo → game-tile-pmo (synthèse remontée, pas de cross-pôle)
- **Sachants** : main invoque simplifier → designer → reviewer (max 5 iter) → user → game-tile-pmo grave leçon
- Boucle d'apprentissage : LESSONS technique + PIPELINE-MEMORY méta-process + auto-memory transverse
