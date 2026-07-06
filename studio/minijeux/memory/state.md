---
name: État pôle JEU MaxPlay
description: État statique du pôle jeu — jeux déployés, bugs critiques en cours. Sessions et décisions migrées vers game/pmo/.
type: project
---

> **Refonte 2026-05-13** : ce fichier ne contient plus que les **sources de vérité statiques** (état déploiement, fichiers clés, bugs critiques en cours).
>
> Sessions chronologiques → [`../pmo/sprint-log.md`](../pmo/sprint-log.md)
> Décisions figées → [`../pmo/decisions.md`](../pmo/decisions.md)
> Backlog tickets → [`../pmo/backlog.md`](../pmo/backlog.md)
> Audits traçabilité → [`../pmo/audit-trail.md`](../pmo/audit-trail.md)
> Chiffres clés → [`../pmo/INVARIANTS.md`](../pmo/INVARIANTS.md)

---

## État déploiement (mis à jour à chaque ajout/retrait MJ)

**40 jeux status:live** (39 live + 1 wip=dinos) : mj-04–06, mj-08–09, mj-11–13a/c, mj-15–21, mj-23–42, max-adventure, mj-pose-tiles, dinos-encyclopedie. **Mise à jour 2026-07-06** : +9 MJ jour (mj-34..42 : Rush Hour, Kalah, Bus Jam, Échecs, Dames, Block Blast, Tangram, Mahjong, Shisima), -3 MJ jour (mj-01/14/13b retirés), +3 MJ nuit retravaillés (mj-34/35/36).

**Retirés du menu** : mj-01, mj-02, mj-03, mj-07, mj-10, mj-13b, mj-14 (conservés fichiers)

**Production** : `https://kimen26.github.io/MaxPlay/` — CI via `.github/workflows/deploy.yml` (72460ab2 : 10 MJ dinos validés, GitHub Pages SUCCESS)

**Artefact GitHub Pages** : 545 Mo total (limite 1 Go). Compositions : audio/ 191M + paleoart/ 122M. ⚠️ Ticket « régime minceur artefact » à anticiper (webp conversion, audio bitrate reduction).

---

## Bugs critiques en cours

**Aucun bug critique actif** (vérifié 2026-07-05 après clôture MJ-28..33).

Max Adventure tourne en prod (vérifié 2026-05-03 : `kimen26.github.io/MaxPlay/max-adventure/` charge phaser-*.js et index-*.js correctement).

Faux bugs récemment vérifiés :
- EP-022 MJ-04 "boucle infinie" : code conforme (compteur 10 tours + showEndScreen + playEndSound présents). Cf. `pmo/decisions.md` Q-ouverte #1 sur clôture définitive.
- L-068 (11 dinos sans image) : RÉSOLU (commit 941faa30, filtres NO_HERO/NO_ASSET retirés)

---

## Fichiers clés jeu (référence)

| Fichier | Rôle |
|---------|------|
| `site/js/bus-svg.js` | SVG bus — lire avant tout |
| `site/js/data.js` | LIGNES (26 actives), DESTINATIONS |
| `site/js/tracker.js` | Suivi progression localStorage |
| `site/js/victory-sounds.js` | Mélodies fin de partie (4 par couleur) |
| `site/js/sounds.js` | AudioContext singleton |
| `docs/ratp-colors.json` | Source de vérité couleurs IDFM (26 actives + 362 référencées) |
| `site/tile-tools/vocab.py` | Source unique constantes tiles (depuis 2026-05-12, remplace cartography.json deprecated) |
| `site/tile-tools/styles.py` | Module 6 styles + mapping SW_1 ↔ SW_2-6 (depuis 2026-05-12) |
| `site/tile-tools/recipes/test_ref_papa_4virages.py` | RÉFÉRENCE CANONIQUE virages (14×14 compo Papa Yann) |
| `memory/stack.md` | Architecture complète + règles déploiement |
| `memory/rules.md` | Règles UX/péda + designs validés |
| `memory/VISION-LONG-TERME.md` | Vision Phase 2 WexWorld + pont narration↔jeu + app mobile |
| `pmo/INVARIANTS.md` | **Source de vérité chiffres clés + casting tile** |
| `pmo/decisions.md` | Décisions figées + questions ouvertes |
| `pmo/sprint-log.md` | Journal sessions |
| `pmo/backlog.md` | Tickets actifs (EP-xxx + L-xxx) |
| `pmo/audit-trail.md` | Traces audits PMO |

---

## Équipe agents (référence rapide)

| Agent | Modèle | Niveau | Mode |
|-------|--------|--------|------|
| `game-pmo` | Haiku | 1 (parent) | **AUTO** signal JEU |
| `game-archiviste` | Haiku | 1 (parent) | **AUTO** signal structure |
| `game-mj-pmo` | Haiku | 2 (enfant) | Invoqué par game-pmo |
| `game-tile-pmo` | Haiku | 2 (enfant) | Invoqué par game-pmo |
| `game-wexworld-pmo` | Haiku | 2 (enfant) | ⏳ Phase 2 |
| `game-conseiller` | Opus | 3 | Manuel — question produit |
| `game-dev` | Sonnet | 4 | Manuel — code |
| `game-tile-simplifier` | Sonnet | 4 | Manuel — étape 1/3 tile |
| `game-tile-designer` | Sonnet | 4 | Manuel — étape 2/3 tile |
| `game-tile-reviewer` | Haiku | 4 | Manuel — étape 3/3 tile |
| `game-mj-reviewer` | Haiku | 4 | Manuel — validateur MJ |

Détails complets : [`../EQUIPE.md`](../EQUIPE.md).

---

## Commandes audit

| Commande | Invoque | Cible |
|----------|---------|-------|
| `/game-pmo-audit` | `game-pmo` Mode AUDIT | FOND (décisions, statuts, cohérence sémantique) |
| `/game-archiviste-audit` | `game-archiviste` Mode AUDIT | FORME (structure, refs, gabarit, orphelins) |
