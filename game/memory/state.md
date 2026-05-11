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

## Session 2026-05-11 (suite) — EP-VOCAB phases 1-2 + pivot

**Contexte** : Papa Yann a cadré l'epic "ingénierie tile-tools" pour résoudre cause racine (galère sur "route droite propre", briefs complexes impossibles). Plein pouvoir donné.

**Livré** (commit `feat(tile-tools): EP-VOCAB phases 1+2`) :
- ✅ `game/web/tile-tools/vocab.py` : 46 constantes nommées français, validation auto au boot
- ✅ `game/web/tile-tools/builders.py` : macros `route_h()` + `route_v()` testées + **SHA256 byte-identique** aux PNG existants
- ✅ `game/web/tile-tools/RESEARCH-INSPIRATIONS.md` : 60+ liens capitalisés (LDtk, WFC, DualTilemap, Bitmask, Phaser, LimeZu)
- ✅ Fix en passant : `test_voie_bus_v6.py` (`_15` SALE → `_8` PROPRE, oubli correction 5)
- ✅ 2 recettes v2 exemple : `test_route_h_5rows_v2.py` + `test_route_v_5cols_v2.py`

**🔀 Pivot Papa Yann (fin de session, validé)** :
- Découverte : coder des macros (`virage`, `carrefour`…) = **inventer comment composer**. Or les recettes actuelles ne plaisent pas visuellement à Papa Yann → on reproduirait le défaut.
- Nouvelle direction : **collecter des références visuelles** (screenshots LimeZu officiel, maps Pokemon, samples LDtk) → reproduire fidèlement → la "macro" devient une recette de référence validée.
- EP-VOCAB phases 3-5 (macros virages/carrefour/T/refactor 13 recettes) **ANNULÉES**.
- **EP-REFS ajouté au BACKLOG** (banque refs visuelles, à lancer en session dédiée).

**Nettoyage effectué (clôture)** :
- ✅ `cartography.json` marqué **DEPRECATED** (champ `_DEPRECATED` dans le JSON)
- ✅ `game/web/tools/tile-library.html` + `tile-library-v2.html` → archivés dans `tools/_archive/` + card index retirée
- ✅ `__pycache__/` purgés (gitignore créé)
- ✅ `game/web/tile-tools/_archive/` créé avec inventaire candidats futurs (scripts debug, recettes non-auditées)
- ⏳ Pas touché : scripts debug (render_debug, render_tmj, zoom_index, build_rondpoint_tmj, recolor_house) — à vérifier dépendances en session dédiée
- ⏳ Pas touché : recettes passages piétons (non-auditées visuellement)

**Fichier clé créé** : `game/web/tile-tools/vocab.py` = source UNIQUE pour les paths de tiles. Remplace cartography.json.

---

## Session 2026-05-12 (intégration EP-VOCAB clôture + suite pipeline tile)

**Synthèse game-tile-pmo (simplifier→designer→reviewer) :**

**Fait** :
- ✅ **5 recettes validées** par pipeline (9/10 reviewer) :
  - `test_route_h_7rows_v3.py` (14×7 route H 3-chaussées)
  - `test_route_v_7cols_v3.py` (7×14 route V 3-chaussées)
  - `test_papa_route_large.py` (17×9 compo Papa référence)
  - `test_virage_gauche.py` / `_droit.py` / `_haut_gauche.py` / `_haut_droit.py` (4× 13×13 virages, carré intersection 7×7)
- ✅ **`builders.py` v3** opérationnel : `route_h()/route_v()` macrifiées, alternance `_VOIE_POOL` cycle 3, anti-mono activé
- ✅ **`vocab.py`** source unique constantes tiles (validation auto)
- ✅ **`vocab-playground.html`** synchronisé
- ✅ **Workflow pipeline** validé : 1 cycle complet ≈8 min, verdict PASS 9/10

**Leçons gravées** (LESSONS.md + PIPELINE-MEMORY.md maj) :
- **L-025** : Géométrie virage 3-chaussées (carré 7×7 + table 4 coins critiques)
- **L-026** : Anti-mono pool 3 + décalage cycle modulo

**EP-VOCAB clôturé** `[x]` (phases 1-2 complètes, phases 3-5 → EP-REFS)

---

## Bugs actifs

Aucun. Max Adventure tourne en prod (vérifié 2026-05-03 : `kimen26.github.io/MaxPlay/max-adventure/` charge phaser-*.js et index-*.js correctement).

**Vérifications 2026-05-11 (Session 14)** :
- EP-022 MJ-04 "boucle infinie" : **faux bug** — code conforme depuis (compteur 10 tours + showEndScreen + playEndSound présents). BACKLOG désync corrigée.
- mj-pose-tiles `_14`/`_15` SALE : **corrigé** par swap vers `_2`/`_8` propres (L-013 respectée).
- mj-12 scope : **tranché Papa Yann** — dashboard sonore / découverte libre, pas un jeu à mécanique. Pas de refonte (L-024).

**Convention pôle JEU à acter** : 2 types de MJ — (1) jeux à mécanique avec compteur + showEndScreen, (2) dashboards / découvertes libres (mj-12 1er du genre). game-mj-reviewer à enrichir avec reconnaissance du type (`data-mp-type="dashboard"` ?).

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
| **`game-conseiller`** | Opus | **Binôme créatif transverse** — voix de Papa Yann, challenge, force de proposition, pont entre les 3 sous-domaines |
| **`game-mj-pmo`** | Haiku | Sous-spé PMO mini-jeux HTML (parent : game-pmo). Scope strict : rules.md, stack.md, PIPELINE-MEMORY-MJ.md, docs/jeux/ |
| **`game-mj-reviewer`** | Haiku | Sachant validateur MJ pré-livraison — checklist hardcodée 5 sections, verdict PASS/FAIL |

**Architecture cible pôle JEU** (refonte 2026-05-11, Phase 1) :
```
game-pmo (parent)
├── game-tile-pmo (sous-spé maps tile)        ✅
├── game-mj-pmo (sous-spé mini-jeux HTML)     ✅ (créé 2026-05-11)
└── game-wexworld-pmo (sous-spé Phaser)        ⏳ Phase 2

Sachants :
- game-conseiller (Opus, transverse)            ✅ (créé 2026-05-11)
- game-dev (Sonnet, dev général)                ✅
- game-mj-reviewer (Haiku, validateur MJ)       ✅ (créé 2026-05-11)
- game-tile-{simplifier,designer,reviewer}      ✅
- game-wexworld-{designer,tester}                ⏳ Phase 2
```

**Boucle d'apprentissage** : 3 niveaux de mémoire par sous-spé (technique : LESSONS / rules / stack · méta-process : PIPELINE-MEMORY-* · transverse : auto-memory + VISION-LONG-TERME)

**Vision long terme** : voir [`memory/VISION-LONG-TERME.md`](./VISION-LONG-TERME.md) (Phase 2 WexWorld Pokemon-like, pont narration↔jeu, app mobile, diffusion grand public).
