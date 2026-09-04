# Invariants Pôle JEU — Source de Vérité Unique

> **Tout chiffre clé ou règle structurelle vit ICI.** Le reste du pôle pointe vers ce fichier.
> Si tu trouves un chiffre divergent ailleurs → ce fichier gagne, l'autre est obsolète.
>
> Équivalent côté Narration : [`../../studio/narration/memory/INVARIANTS.md`](../../narration/memory/INVARIANTS.md).
> Créé 2026-05-13 lors de l'harmonisation Game ↔ Narration (Phase A1).

---

## Architecture CLAUDE.md (source de vérité structure — 2026-05-13)

| Niveau | Fichier | Rôle | Coût contexte |
|--------|---------|------|---------------|
| **Racine** | [`../../CLAUDE.md`](../../../CLAUDE.md) | Synopsis pôles (JEU, NARRATION, COMMUN), commandes trans | Toujours chargé |
| **Pôle JEU** | [`CLAUDE.md`](../CLAUDE.md) (nested) | Mémoire quintette, INVARIANTS, ÉQUIPE agents, workflow | Auto si fichier `studio/minijeux/**` touché |
| **Contexte MJ** | `.claude/rules/mini-jeux.md` | UX zéro-pénalité, feedback <200ms, zones tap 80px, busSVG, couleurs IDFM | Auto si `site/mj-*.html` touché |

**Principe** : source de vérité dans INVARIANTS.md (ce fichier) → rules répètent pour chargement contexte auto → skills LESSONS.md capitalisent leçons vécues. Pas de duplication : INVARIANTS au sommet.

**Détails** : voir `memory/DECISIONS.md` + `memory/archive/decisions-2026-H1.md` § "Refonte archi CLAUDE.md 3 niveaux".

---

## Doctrine transverse MaxPlay

**Lire [`../../../memory/DECISIONS.md`](../../../memory/DECISIONS.md) § Doctrine — 3 principes figés (D-001 pédagogie = produit, D-002 zéro pénalité, D-003 pas de récompense promise).**

---

## Règles UX/péda non-négociables (cible Max 3.5-4 ans)

| Métrique | Valeur | Source |
|----------|--------|--------|
| Résolution | 1024×768 landscape | `docs/STANDARD-MJ.md` |
| Zone tap minimum | 80×80 px | `docs/STANDARD-MJ.md` |
| Feedback maximum | < 200 ms | `docs/STANDARD-MJ.md` |
| Durée session cible | 3-8 min | `docs/STANDARD-MJ.md` |
| Pénalité | **Zéro** (jamais) | `docs/STANDARD-MJ.md` |

---

## État déploiement (mis à jour à chaque ajout/retrait MJ)

| Métrique | Valeur | Source |
|----------|--------|--------|
| MJ déployés au menu | **Jeux au menu enfant + 1 wip (encyclo dinos)**. Liste = source unique [`site/js/catalog.js`](../../../site/js/catalog.js), ne jamais recopier la liste ni un chiffre ici. Vérif : `node tests/audit-gabarit.mjs` | `site/js/catalog.js` |
| MJ retirés du menu | **PURGE 2026-08-10 (décision PY)** : un jeu retiré est **supprimé de `site/`** (« on garde l'idée, rien de codé pour rien »). 23 jeux supprimés ce jour (18 retirés C0 + mj-58 + 4 orphelins mj-01/13b/gold-a/gold-b). Trace raisons+dates : `memory/archive/backlog-fermes-2026.md` · figées archivées : `docs/jeux/_archive/figees-jeux-purges-2026-08-10/` | `memory/archive/backlog-fermes-2026.md` |
| Encyclopédie dinos | **Count ≠ ce pôle** → source unique [`studio/dino/memory/INVARIANTS.md`](../../dino/memory/INVARIANTS.md) (le dino a sa mémoire propre). Ne pas recopier un count ici. | `site/js/dinos-data.js` |
| Couleurs RATP IDFM | 26 lignes actives + 362 référencées | `docs/ratp-colors.json` |
| **maxStars catalog (changé 2026-07-14)** | **3** (changement règle figée : 5→3 niveaux global, 17 jeux impactés dont 10 remappés 5-paliers→3-niveaux). Décision Papa Yann « tout le monde en 3 étoiles ». | `site/js/catalog.js` + figées/mj-XX.md datées 2026-07-14 |
| **Libs JavaScript réutilisables** | **3 déployées + 1 suspendue** (2026-07-14) : `js/mj-dice.js` (PIP_LAYOUT) · `js/dinos-ombres.js` (pool ombres dino) · `js/mj-compte.js` (1-moteur-N-peaux) testées pilotes. `js/panneau-led.js` suspendu (fusion en question ouverte, voir `memory/TODO.md`). Étape -1 workflow nouvelle (check libs amont). | `docs/MECANIQUES.md` + `site/js/` |

**Production URL** : `https://kimen26.github.io/MaxPlay/` (CI via `.github/workflows/deploy.yml`).

---

## Invariants techniques (code)

| Règle | Source |
|-------|--------|
| **Gabarit mini-jeux unique** : `mj-shell.js` charge thème + golden + règles + tracking + cloud + celebrations (depuis 2026-07-14 FIGÉ) | `.claude/rules/mini-jeux.md` § LE GABARIT |
| Bus toujours `busSVG()` / `busSVGHiddenNum()` depuis `site/js/bus-svg.js` — **JAMAIS** emoji 🚌 ni div CSS coloré | `docs/STANDARD-MJ.md` |
| Quiz multi-couleurs : `selectDistinctColors(pool, n, minDist=80)` | `docs/STANDARD-MJ.md` |
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
| Déploiement | GitHub Pages via `.github/workflows/deploy.yml` (assemble dans `_site/` gitignored) |

Détails complets : [`../docs/STACK.md`](../docs/STACK.md).

---

## Architecture équipe agents (refonte 2026-05-13)

| Niveau | Agent | Modèle | Mode |
|--------|-------|--------|------|
| 1 PMO unifié | `game-pmo` (FOND+FORME — fusion 2026-07-19, ex archiviste/mj-pmo) | Sonnet | Clôture session · audit · RECHERCHE |
| 3 Conseiller | `game-conseiller` | Opus | Manuel — question produit |
| 4 Sachant dev | `game-dev` | Sonnet | Manuel |
| 4 Validateur MJ | `game-mj-reviewer` | Haiku | Manuel |

Détails : [`../EQUIPE.md`](../EQUIPE.md) (équivalent studio/narration/equipe/ORGANIGRAMME.md).

---

## Règles d'or structurelles (quintette mémoire, depuis 2026-09-03 HO-MJ-01)

1. **`memory/MEMORY.md`** = état courant + journal de session (3 dernières résumées) — modifié à chaque clôture
2. **`memory/DECISIONS.md`** = décisions structurantes toujours en vigueur + designs validés (détail historique → `memory/archive/`)
3. **`memory/TODO.md`** = tickets ouverts (EP-xxx) condensés en 1 ligne
4. **`memory/LESSONS.md`** = leçons L-xxx (process, REX, patterns)
5. **`memory/CHANGELOG.md`** = capacités livrées, point de vue utilisateur
6. **`memory/INVARIANTS.md`** (ce fichier) = source de vérité chiffres clés et règles non-négociables
7. **`memory/archive/`** = sprint-log, decisions et backlog historiques, verbatim

**Règle dure** : `MEMORY.md` ne contient qu'un état condensé (≤ 80 lignes) — le détail historique vit dans `memory/archive/`.

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
