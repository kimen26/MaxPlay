# Index des Histoires

> Maintenu manuellement à chaque canonisation. Dernière mise à jour : 2026-06-14 (PROCESS 11 étapes 0-10 + préfixes étapes).

---

## Histoires canonisées

| # | Titre | Statut | Mots | Personnages | Thème principal |
|---|-------|--------|------|-------------|-----------------|
| 001 | [Le Pont Cassé](001-le-pont-casse/README.md) | canon (refonte 2026-05-08, ex-003-le-pont-casse-v2) | ~540 | Wex, Raph, Pierrot | promesse du titre tenue · soin collectif sans réparation |

---

## Histoires en production

| # | Titre | Statut PROCESS | Owner courant | Personnages | Prochaine action |
|---|-------|----------------|---------------|-------------|------------------|
| 002 | [La Libellule impossible](002-libellule-resonance/README.md) | **Étape 4 VAGUE 6** (lancée 2026-07-10 sur décision Papa Yann — briefs goût v6, 14 writers relancés ; vague 5 complète archivée `_archive/vague-5/` : versions + panel v2 + sélection v2 + gatekeeper) | Directeur | Wex, Juju, Nono | Étape 5 vague 6 : **lecture annotée Papa Yann** (`site/lecture.html`, instrument principal DEC-DOCTRINE-INSTRUMENT-LECTURE) + panel v2 12 calls. |

---

## Réinitialisation 2026-05-08 (Papa Yann)

Refonte complète du catalogue narratif. Décisions :

- **001 nouveau** = ex-`003-le-pont-casse-v2` (kimi-rewrite-v2 canonisé). Auteur top 1 = Kimi K2.
- **Suppressions définitives** (rm -rf) : ancien 001 (canon V1 Monsieur Ferretti + V2 correction), 002 (Le Rire qui reste), 004 (Pont Cassé Températures — test variance), 003-la-confidence (workshop abandonné), `series/`, `ultime_debrief.md`, `ultime_relecture.md`, `SYNTHESE-2026-05-06.md`.
- **Conservé** : `_gabarit/` (modèle), `axes-histoires-en-stock.md` (stock d'idées pour brainstorm 005+).
- **Justification** : base propre pour repartir avec la BONNE structure (PROCESS 11 étapes, panel 20 lecteurs, casting writers 14, lecons-vivantes vivant).

Les patterns observés sur les histoires supprimées sont consolidés dans [`equipe/lecons-vivantes.md`](../equipe/lecons-vivantes.md) (P1-P7, G1-G6, axes 1-6).

---

## Stock pour prochaines histoires

Voir [axes-histoires-en-stock.md](axes-histoires-en-stock.md) — 10 unitaires + 5 transversaux.

Prochaine histoire après 002 = **003** (renumérotation séquentielle, l'ancien 003-la-confidence ayant été supprimé). Brainstorm sujet/perso à venir.

---

## Workflow par histoire

Voir [`equipe/PROCESS.md`](../equipe/PROCESS.md) — **11 étapes** (0 à 10 ; étape 2 = Brainstorm depuis 2026-05-15).

### Convention préfixes fichiers (depuis 2026-05-12)

Tout fichier ou dossier dans `stories/<NNN>/` est préfixé par le numéro de l'étape qui le produit :
- `1-pitch-plan.md` (étape 1)
- `3-briefs/` (étape 3 — 2 fichiers : brief-personnages, brief-histoire — system prompt WexWorld dans `_writer-system.md` par arc)
- `4-versions-writers/` (étape 4)
- `5-lecteurs-temoins/` + `5-synthese-lecteurs.md` (étape 5)
- `6-selection.md` (étape 6)
- `7-rewrite/` (étape 7)
- `8-gatekeeper-verdict.md` (étape 8)
- `9-relecture-rewrite/` (étape 9)
- `10-texte.md` + `10-synthese-finale.md` (étape 10 — CANON)

**Fichiers transverses sans préfixe** : `README.md`, `kanban.md`.
