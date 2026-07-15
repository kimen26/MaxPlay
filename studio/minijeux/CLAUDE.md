# PÔLE JEU — Règles auto-chargées

> Ce fichier (gouvernance) est **chargé automatiquement** dès qu'un fichier sous `studio/minijeux/` est lu/édité (nested CLAUDE.md, [doc Anthropic](https://code.claude.com/docs/en/memory#how-claude-md-files-load)). ⚠️ Le **code déployé** (`site/mj-*.html`, `site/js/`) charge la **rule** [`.claude/rules/mini-jeux.md`](../../.claude/rules/mini-jeux.md), **pas ce fichier** — la rule porte les règles ops (bus, figées, harnais), ce CLAUDE.md = navigation/gouvernance.
> Pour la **navigation humaine** (catalogue fichiers/équipe/déploiement), voir [`INDEX.md`](INDEX.md).
> ⚠️ Ce fichier **n'est PAS re-injecté après `/compact`** — il rechargera quand Claude touchera un fichier de `studio/minijeux/`.

---

## Principes pôle JEU (non négociables)

- **Simplicity First** · **No Laziness** · **Minimal Impact** · Plan mode pour 3+ étapes
- **Bus** : toujours `busSVG()` / `busSVGHiddenNum()` de [`site/js/bus-svg.js`](../../site/js/bus-svg.js). Jamais d'emoji 🚌, jamais de div CSS colorée.
- **Couleurs** : toujours via `LIGNES` de [`site/js/data.js`](../../site/js/data.js). Jamais de hex hardcodé.
- **UX** : zéro pénalité punitive · feedback < 200 ms · zones tap min 80 px · sessions 3-8 min.
- **Décisions figées par jeu** : [`docs/jeux/figees/mj-XX.md`](docs/jeux/figees/) fait **LOI**. Jamais modifier un `mj-XX.html` sans l'avoir lu (hook `figees-injector.ps1` le réinjecte). Jamais contredire une ligne 🔒. Seul Papa Yann défige. Détail : [`../.claude/rules/mini-jeux.md`](../../.claude/rules/mini-jeux.md) § ⛔ AVANT DE MODIFIER.

---

## ⚙️ PMO + Archiviste proactifs

`game-pmo` (FOND) et `game-archiviste` (FORME) sont **invoqués automatiquement** à chaque tour incluant leur signal. Voir tableau dans [`../CLAUDE.md`](../../CLAUDE.md) racine.

| Source de vérité | Fichier |
|------------------|---------|
| Chiffres clés (règles UX, casting tile, count MJ, recipes) | [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) |
| Décisions figées + questions ouvertes | [`pmo/decisions.md`](pmo/decisions.md) |
| Journal sessions chronologique | [`pmo/sprint-log.md`](pmo/sprint-log.md) |
| Tickets EP-xxx + leçons L-xxx | [`pmo/backlog.md`](pmo/backlog.md) |
| Traces audits + cause racine | [`pmo/audit-trail.md`](pmo/audit-trail.md) |
| État déploiement statique (jeux actifs/retirés, bugs) | [`memory/state.md`](memory/state.md) |

## 📥 Zones INBOX (2 canaux, checkés par game-pmo à chaque session)

| Zone | Qui dépose | Format | PMO action |
|------|-----------|--------|------------|
| [`inbox/`](inbox/) | **Papa Yann** — fichiers manuels (idées, articles, captures, notes brutes) | Libre | Lit → ticket EP-NNN → brainstorm avec Conseiller → distille |
| [`INBOX.md`](INBOX.md) | **Bot Telegram + digests Claude** | Sections `## YYYY-MM-DD` | Idem |

**Règle 48h** : tout fichier dans `inbox/` ou section dans `INBOX.md` doit être distillé ou tickété dans les 48h.

---

## Lecture obligatoire avant toute modif

1. [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) — chiffres clés
2. [`memory/state.md`](memory/state.md) — état déploiement
3. [`memory/rules.md`](memory/rules.md) — règles UX/péda
4. [`memory/stack.md`](memory/stack.md) — stack + règle SVG
5. [`pmo/sprint-log.md`](pmo/sprint-log.md) — dernière session

---

## Équipe agents (résumé — détail dans [`EQUIPE.md`](EQUIPE.md))

| Niveau | Agent | Modèle | Mode |
|--------|-------|--------|------|
| 1 PROACTIF | `game-pmo` (FOND) · `game-archiviste` (FORME) | Haiku | **AUTO** sur signal |
| 2 SOUS-PMO | `game-tile-pmo` · `game-mj-pmo` · `game-wexworld-pmo` ⏳ | Haiku | Invoqué par parent |
| 3 CONSEILLER | `game-conseiller` | Opus | Manuel |
| 4 SACHANTS | Pipeline tile : `simplifier` → `designer` → `reviewer` · MJ : `game-dev` → `game-mj-reviewer` | Sonnet/Haiku | Manuel |

**Règle hiérarchie** : main → game-pmo → sous-spé. Communication enfant → parent. Jamais cross-pôle direct.

---

## Règles d'or LimeZu (résumé — détail dans `.claude/rules/tile-tools.md`)

- **Mnémonique tile** : `Asphalt_1_Variation_2` propre H · `_8` propre V · `_14` sale H · `_15` sale V.
- **Sidewalk_1 ≠ Sidewalk_2-6** (mapping figé, voir [`memory/MEMORY.md`](../../memory/MEMORY.md) → `reference_tile_mapping_sw1.md`).
- **Surfaces béton** (trottoir/asphalte) = tile unique uniforme par défaut. Variations max 10%.
- **Surfaces nature** (herbe) = variations OK.
- **vocab.py** = source unique constantes tiles depuis 2026-05-12 (`cartography.json` deprecated).
- **Toute composition tiles DOIT passer par render.py → PNG → Read → critique** avant soumission.
- **Brique élémentaire avant macro** : valider chaque tile candidate isolée avant toute composition.

**Skill associé** : [`~/.claude/skills/maxplay-tiles/SKILL.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/SKILL.md) + [`LESSONS.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/LESSONS.md) (30+ leçons gravées).

---

## Workflow boucles d'apprentissage

**Pipeline TILE** (3 étapes) :
1. `game-tile-simplifier` → ANALYSE structurée
2. `game-tile-designer` → recette `.py` + render PNG + auto-critique
3. `game-tile-reviewer` → verdict PASS/FAIL (max 5 iter)
4. User valide → `game-tile-pmo` grave leçons (LESSONS.md + PIPELINE-MEMORY.md)

**Pipeline MJ** :
1. `game-conseiller` (challenge) → `game-dev` (code) → `game-mj-reviewer` (checklist 5 sections) → user → `game-mj-pmo` grave (PIPELINE-MEMORY-MJ.md)

---

## Stack & déploiement

GitHub Pages → `kimen26.github.io/MaxPlay/`
- `/` → [`site/index.html`](../../site/index.html) (menu par catégories, source de vérité [`site/js/catalog.js`](../../site/js/catalog.js))
- `/mj-XX.html` → HTML vanilla
- `/max-adventure/` → Phaser TS+Vite build (CI uniquement)
- `/mj-pose-tiles.html` → mini-jeu kids tileset

CI : [`../.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) (assemble dans `_site/` gitignored).

**Count / liste des mini-jeux** : ne jamais recopier un chiffre ici → source unique [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) § État déploiement + [`site/js/catalog.js`](../../site/js/catalog.js). Bugs critiques : [`memory/state.md`](memory/state.md).

> ⚠️ **Locataire DINO dans `site/`** : `dev-dinos.html`, `js/dinos-data.js`, `audio/dinos/`, `img/dinos/`, `js/dinos-images-*.js` sont **déployés depuis `site/` mais appartiennent au pôle DINO** (`../dino/`, depuis 2026-06-03). Pour y toucher → règles auto-chargées via [`../../.claude/rules/dino.md`](../../.claude/rules/dino.md) + figée [`../dino/figees/encyclopedie.md`](../dino/figees/encyclopedie.md). Ne PAS appliquer les règles MJ (bus SVG, figées mj-XX) au dino. `game-pmo`/`game-archiviste` ne gèrent pas le dino → `dino-pmo`/`dino-archiviste`.

---

## Commandes audit

- `/game-pmo-audit` — FOND (décisions, statuts, cohérence sémantique INVARIANTS ⇄ state ⇄ sprint-log)
- `/game-archiviste-audit` — FORME (gabarit, refs, orphelins, préfixes)

---

## Pointeurs

- Catalogue navigable : [`INDEX.md`](INDEX.md)
- Équipe détaillée : [`EQUIPE.md`](EQUIPE.md)
- Vision long terme (Phase 2 WexWorld) : [`memory/VISION-LONG-TERME.md`](memory/VISION-LONG-TERME.md)
- Pôle voisin : [`../studio/narration/CLAUDE.md`](../narration/CLAUDE.md)

---

_Refonte 2026-05-13 : extrait de l'ancien CLAUDE.md racine. Section PMO+Archiviste auto + règles d'or LimeZu déplacées ici (chargement on-demand). Voir [`pmo/audit-trail.md`](pmo/audit-trail.md) pour la trace._
