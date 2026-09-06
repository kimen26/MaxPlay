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

- **2026-09-06 — HO-MJ-07** : packs es-es et pt-br des 36 mini-jeux livrés (texte seul, 0 crédit EL), mj-30 en pieds/livres en EN, `plural` multilingue. Reste au quota EL : 81 consignes parlées EN (VOIX-MJ-EN-AUDIO), es/pt sans audio (repli TTS navigateur).
- **2026-09-05 — Espace parents 4 tuiles + sélecteur de langue ; EPIC i18n mini-jeux ouvert** (session DINO/JEU) : `site/index.html` parents = Statistiques / Paramètres (langue, jeux cachés) / Compte / Retours ; audit i18n des 36 jeux (`docs/i18n/AUDIT-I18N-MJ-2026-09-05.md`, 6 lots) ; lots 0 à 4 livrés (HO-MJ-02/03/04) : plomberie `mj-i18n.js`, panneau règle des 36 jeux + chrome, chaînes de jeu de 33 jeux en anglais, 81 consignes parlées traduites (repli TTS, MP3 au quota). Reste : es-es/pt-br des mini-jeux ; mj-50-53 gardent leur contenu FR (décision PY). Détail `memory/TODO.md` § EPIC i18n.

- 2026-09-03 — Refonte infra Claude : audit transverse, ouverture handoff « mémoire convergente » (pmo/ → memory/ quintette).
- 2026-08-11 — Factorisation briques voix : `TTS.hasVoiceFor()` + `DinoOmbres.annoncer()` mutualisées (mj-24/19/20), YAGNI assumé sur 2 patterns mineurs, harnais verts.
- 2026-08-10 (suite) — 7 annotations Papa Yann traitées (mj-57/28/30/31/32 réparations + mj-24/19/14/15 features), règle zéro ascenseur auditée 36/36 jeux OK.

## Équipe agents (référence rapide)

Détail complet : [`../EQUIPE.md`](../EQUIPE.md).

## Commandes audit

`/game-pmo-audit` → `game-pmo` Mode AUDIT (FOND + FORME en un passage).
