# Invariants Pôle JEU — Source de Vérité Unique

> **Tout chiffre clé ou règle structurelle vit ICI.** Le reste du pôle pointe vers ce fichier.
> Si tu trouves un chiffre divergent ailleurs → ce fichier gagne, l'autre est obsolète.
>
> Équivalent côté Narration : [`../../studio/narration/pmo/INVARIANTS.md`](../../narration/pmo/INVARIANTS.md).
> Créé 2026-05-13 lors de l'harmonisation Game ↔ Narration (Phase A1).

---

## Architecture CLAUDE.md (source de vérité structure — 2026-05-13)

| Niveau | Fichier | Rôle | Coût contexte |
|--------|---------|------|---------------|
| **Racine** | [`../../CLAUDE.md`](../../../CLAUDE.md) | Synopsis pôles (JEU, NARRATION, COMMUN), commandes trans | Toujours chargé |
| **Pôle JEU** | [`CLAUDE.md`](../CLAUDE.md) (nested) | PMO+Archiviste auto, INVARIANTS, ÉQUIPE agents, workflow | Auto si fichier `game/**` touché |
| **Contexte tile** | `~/.claude/rules/tile-tools.md` | Mnémonique 2/8/14/15, Sidewalk_1 mapping, vocab.py, brique avant macro | Auto si `site/tile-tools/**` touché |
| **Contexte MJ** | `~/.claude/rules/mini-jeux.md` | UX zéro-pénalité, feedback <200ms, zones tap 80px, busSVG, couleurs IDFM | Auto si `site/mj-*.html` touché |

**Principe** : source de vérité dans INVARIANTS.md (ce fichier) → rules répètent pour chargement contexte auto → skills LESSONS.md capitalisent leçons vécues. Pas de duplication : INVARIANTS au sommet.

**Détails** : voir `pmo/decisions.md` § "Refonte archi CLAUDE.md 3 niveaux".

---

## Règles UX/péda non-négociables (cible Max 3.5-4 ans)

| Métrique | Valeur | Source |
|----------|--------|--------|
| Résolution | 1024×768 landscape | `memory/rules.md` |
| Zone tap minimum | 80×80 px | `memory/rules.md` |
| Feedback maximum | < 200 ms | `memory/rules.md` |
| Durée session cible | 3-8 min | `memory/rules.md` |
| Pénalité | **Zéro** (jamais) | `memory/rules.md` |

---

## Casting tile LimeZu (mnémonique « 2 propre H · 8 propre V · 14 sale H · 15 sale V »)

| Variante | Asphalt | Usage |
|----------|---------|-------|
| `Asphalt_1_Variation_2` | Marquage Horizontal **propre** | Routes H par défaut |
| `Asphalt_1_Variation_8` | Marquage Vertical **propre** | Routes V par défaut |
| `Asphalt_1_Variation_14` | Marquage H **sale** | À éviter sauf intention |
| `Asphalt_1_Variation_15` | Marquage V **sale** | À éviter sauf intention |

**Source** : `~/.claude/skills/maxplay-tiles/SKILL.md` + `site/tile-tools/vocab.py` (source unique).

**Règle générale** :
- Surfaces béton (trottoir/asphalte) = **tile unique uniforme** par défaut, variations max 10%
- Surfaces nature (herbe) = variations OK

---

## État déploiement (mis à jour à chaque ajout/retrait MJ)

| Métrique | Valeur | Source |
|----------|--------|--------|
| MJ déployés au menu | **42 live + 1 wip (encyclo dinos)** : mj-04/05/06, mj-08/09, mj-11/12, mj-13a/13c, mj-15–21, mj-23–45 (43 total - mj-01/13b/14 retirés menu = 40 affichés), max-adventure, mj-pose-tiles — vérifié par node audit-gabarit.mjs 2026-07-14 (41/44 migrés sur mj-shell.js + harnais 41/42 vert) | `site/js/catalog.js` count status:live + audit-gabarit.mjs check |
| MJ retirés du menu | **7 consolidés** : mj-02, mj-03, mj-07, mj-10 (historiques) + mj-01, mj-13b, mj-14 (par-cœur bus, décision Papa Yann 2026-07-06). ⚠️ mj-21, mj-23 et mj-34..42 sont LIVE (une version PMO 2026-07-07 les avait déclarés retirés à tort — corrigé) | `memory/state.md` + sprint-log 2026-07-06/07 |
| Encyclopédie dinos | **50 fiches finale** (filtrage 60→50 validé 2026-06-01, 10 redondants/inconnus retirés, Apatosaure bi-nom, reclassement scientifique appliqué) | `site/js/dinos-data.js` |
| Recettes tile validées | **20** (`test_*.py` dans `recipes/` — routes h/v × 3 générations, virages × 4, carrefour × 2, rond-point, quartier, parking, voie bus, passages piétons × 2, refs papa × 3) | `site/tile-tools/recipes/test_*.py` |
| Scripts utilitaires tile (all) | **30+** (20 recettes validées + utilitaires build/render/debug dans `scripts/`) | `site/tile-tools/recipes/` + `scripts/` |
| Référence canonique virages | `test_ref_papa_4virages.py` (14×14 compo Papa Yann tile-picker) | `site/tile-tools/recipes/` |
| Couleurs RATP IDFM | 26 lignes actives + 362 référencées | `docs/ratp-colors.json` |
| Tiles LimeZu inventoriées | 9811 (3040 unitaires + 6473 sprites + 298 planches) | `site/tile-tools/build_tile_picker_data.py` |

**Production URL** : `https://kimen26.github.io/MaxPlay/` (CI via `.github/workflows/deploy.yml`).

---

## Invariants techniques (code)

| Règle | Source |
|-------|--------|
| **Gabarit mini-jeux unique** : `mj-shell.js` charge thème + golden + règles + tracking + cloud + celebrations (depuis 2026-07-14 FIGÉ) | `.claude/rules/mini-jeux.md` § LE GABARIT |
| Bus toujours `busSVG()` / `busSVGHiddenNum()` depuis `site/js/bus-svg.js` — **JAMAIS** emoji 🚌 ni div CSS coloré | `memory/rules.md` |
| Quiz multi-couleurs : `selectDistinctColors(pool, n, minDist=80)` | `memory/rules.md` |
| Sons fins de partie : `victory-sounds.js` (4 mélodies par couleur métal/or/argent/bronze) | `site/js/victory-sounds.js` |
| AudioContext singleton : `sounds.js` | `site/js/sounds.js` |
| Suivi progression : `tracker.js` (localStorage `mj_xx_*`) | `site/js/tracker.js` |
| **Audit gabarit** : script `audit-gabarit.mjs` vérifie cloud.js/mp-theme/charset/header/spec (à rendre bloquant CI) | `.claude/rules/mini-jeux.md` § Batterie test 2 vitesses |

---

## Vocabulaire Max (lieux — ne pas confondre)

| Vocab Max | Réel | Usage |
|-----------|------|-------|
| **dodo** | Centre bus Villejuif | MJ-08 "Au centre bus" |
| **réparation** | Garage | MJ-17 "Le garage" |
| **terminus** | Village des bus | Réservé (futur) |

---

## Stack technique

| Couche | Stack |
|--------|-------|
| Mini-jeux HTML | Vanilla HTML + CSS + JS (sans framework) |
| Phaser | Phaser 3 + Vite + TypeScript strict |
| Build Phaser | `npm run build` dans `studio/max-adventure/` → `dist/` |
| Déploiement | GitHub Pages via `.github/workflows/deploy.yml` (assemble dans `_site/` gitignored) |

Détails complets : [`../memory/stack.md`](../memory/stack.md).

---

## Architecture équipe agents (refonte 2026-05-13)

| Niveau | Agent | Modèle | Mode |
|--------|-------|--------|------|
| 1 PMO | `game-pmo` | Haiku | AUTO chaque signal JEU |
| 1 Archiviste | `game-archiviste` 🆕 | Haiku | AUTO chaque signal structure |
| 2 Sous-PMO | `game-mj-pmo` | Haiku | Sur signal MJ par parent |
| 2 Sous-PMO | `game-tile-pmo` | Haiku | Sur signal tile par parent |
| 2 Sous-PMO | `game-wexworld-pmo` ⏳ | Haiku | Phase 2 |
| 3 Conseiller | `game-conseiller` | Opus | Manuel — question produit |
| 4 Sachant dev | `game-dev` | Sonnet | Manuel |
| 4 Pipeline tile | `game-tile-simplifier` | Sonnet | Manuel — étape 1/3 |
| 4 Pipeline tile | `game-tile-designer` | Sonnet | Manuel — étape 2/3 |
| 4 Pipeline tile | `game-tile-reviewer` | Haiku | Manuel — étape 3/3 |
| 4 Validateur MJ | `game-mj-reviewer` | Haiku | Manuel |

Détails : [`../EQUIPE.md`](../EQUIPE.md) (équivalent studio/narration/equipe/ORGANIGRAMME.md).

---

## Règles d'or structurelles

1. **`memory/state.md`** = état déploiement statique (jeux actifs, retirés, bugs critiques) — modifié rarement
2. **`pmo/sprint-log.md`** = journal sessions chronologiques (plus récent en haut)
3. **`pmo/decisions.md`** = décisions figées + questions ouvertes (datées + raison + impact)
4. **`pmo/backlog.md`** = tickets actifs (EP-xxx + Leçons L-xxx)
5. **`pmo/audit-trail.md`** = traces audits PMO + analyses cause racine
6. **`pmo/INVARIANTS.md`** (ce fichier) = source de vérité chiffres clés et règles non-négociables

**Règle dure** : `state.md` ne contient PLUS de log de session (migré dans `sprint-log.md` 2026-05-13).

---

## Comment utiliser ce fichier

**Quand consulter** :
- Avant d'écrire un chiffre clé dans un kanban / MJ / spec
- Avant de valider une décision qui touche aux règles UX/péda
- En cas de doute "c'est variation 2 ou 8 ?", "C'est 80 ou 90 px de tap ?"

**Quand mettre à jour** :
- Toute décision qui modifie un chiffre clé → MAJ ici **avant** de propager ailleurs
- Toute nouvelle MJ déployée/retirée → MAJ section état déploiement
- Toute nouvelle recette tile validée → MAJ count + référence

**Règle** : ce fichier est court par design (~150 lignes). Si tu veux ajouter une section longue → la mettre ailleurs et pointer ici.
