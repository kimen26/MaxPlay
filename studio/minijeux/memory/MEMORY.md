---
name: État pôle JEU MaxPlay
description: Où on en est — état déploiement, bugs actifs, journal des dernières sessions.
type: project
---

> Quintette mémoire pôle JEU (depuis 2026-09-03, HO-MJ-01) : `INVARIANTS` (chiffres) · `DECISIONS` (pourquoi) ·
> `TODO` (quoi ensuite) · `LESSONS` (erreur à ne pas refaire) · `MEMORY` (ce fichier, où on en est) · `CHANGELOG` (livré).

## Quelle question → quel fichier

| Question | Fichier |
|---|---|
| Un chiffre clé (zone tap, maxStars, count MJ) ? | `memory/INVARIANTS.md` |
| Pourquoi c'est comme ça ? | `memory/DECISIONS.md` (+ `archive/decisions-2026-H1.md` pour le détail) |
| Quoi faire ensuite ? | `memory/TODO.md` |
| Quelle erreur ne pas refaire ? | `memory/LESSONS.md` |
| Qu'est-ce qui est sorti ? | `memory/CHANGELOG.md` |
| Règles UX/audio/gabarit MJ ? | `docs/STANDARD-MJ.md` (source unique) |
| Mécaniques/libs réutilisables ? | `docs/MECANIQUES.md` |
| Stack technique ? | `docs/STACK.md` |

## État déploiement

**Jeux au menu enfant + 1 wip (encyclo dinos)** — liste = source unique `site/js/catalog.js` (ne jamais recopier de chiffre ailleurs).

**PURGE 2026-08-10** (décision PY « on garde l'idée, rien de codé pour rien ») : 23 jeux supprimés de `site/` (18 retirés tri C0 2026-07-28 + retraits PY 2026-07-21 + mj-58 + 4 orphelins hors catalogue). Trace : `memory/archive/backlog-fermes-2026.md` · figées archivées : `docs/jeux/_archive/figees-jeux-purges-2026-08-10/`.

**Production** : `https://kimen26.github.io/MaxPlay/` — CI via `.github/workflows/deploy.yml`.
**Artefact GitHub Pages** : 545 Mo / 1 Go limite (audio 191M + paleoart 122M). Ticket régime minceur à anticiper.

## Bugs critiques en cours

Aucun bug critique actif (vérifié 2026-07-05 après clôture MJ-28..33).

Faux bugs vérifiés : EP-022 MJ-04 "boucle infinie" (code conforme) · L-068 11 dinos sans image (résolu commit 941faa30).

## Fichiers clés jeu

| Fichier | Rôle |
|---------|------|
| `site/js/bus-svg.js` | SVG bus — lire avant tout |
| `site/js/data.js` | LIGNES (26 actives), DESTINATIONS |
| `site/js/tracker.js` | Suivi progression localStorage |
| `site/js/mj-shell.js` | Gabarit unique tout MJ |
| `docs/ratp-colors.json` | Source de vérité couleurs IDFM |

## Journal (3 dernières sessions)

- **2026-09-12 — HO-R02** : rotation mémoire du pôle (campagne refonte GED). `LESSONS.md` 70 Ko → 20 Ko (74 leçons datées/dupliquées/superseded déplacées verbatim dans `archive/lessons-2026-H1.md`, 18 gardées) ; `TODO.md` 39 Ko → 9 Ko (fait/obsolète retiré — 28 mj fantômes purgés le 2026-08-10 identifiés, lanes fermées condensées dans `CHANGELOG.md`).
- **2026-09-08/10 — Coloriage mj-32 (HO-MJ-08 à HO-MJ-12)** : décors, zoom, nom coloriable, damier/halo corrigés, harnais CI stabilisé (cause réelle : image d'ombre manquante, pas de l'instabilité). Détail `memory/TODO.md` § Coloriage mj-32.
- **2026-09-05/06 — EPIC i18n mini-jeux** : espace parents 4 tuiles + sélecteur de langue ; 33/36 jeux en anglais, packs es-es/pt-br des chaînes de jeu. Reste : 81 consignes parlées EN en MP3 (quota EL), audio es/pt. Détail `memory/TODO.md` § EPIC i18n.

## Équipe agents (référence rapide)

Détail complet : [`../EQUIPE.md`](../EQUIPE.md).

## Commandes audit

`/game-pmo-audit` → `game-pmo` Mode AUDIT (FOND + FORME en un passage).
