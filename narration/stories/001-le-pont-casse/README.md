---
numero: "001"
slug: le-pont-casse
titre: Le Pont Cassé
statut: canon
version_active: v1
date_creation: 2026-05-02
date_canonisation: 2026-05-08
gatekeeper_passed: true

editorial:
  structure: Kishotenketsu
  antagoniste: false
  mots: 540
  palier: P2
  duree_lecture: 5min
  patte: B+D+C

personnages:
  liste: [wex, raph, pierrot]
  enneatypes: [7, 6]
  enneatype_heros: null

themes:
  principal: promesse-du-titre-tenue
  secondaires: [soin-collectif, signalisation-douce, traversee-attentive]

univers:
  magic_level: none
  saison: printemps
  meteo: ensoleille
  moment: matinee

arc:
  rattachement: arc-1-objet-decor
  fiche: arcs/arc-1-objet-decor/fiche.md

variantes:
  base: christ
  disponibles: [christ]

production:
  writers_total: 8
  lecteurs_total: 6
  rewrite_cycles: 1
  rewrite_philosophie: comite-editorial
  writer_top1: kimi-k2.6
  rewrite_integrations: 2 (Clac additif + bracelet)
  re-relecture_etape9: 6 lecteurs (panel transitoire)
  re-relecture_verdict: 6×✅ + 2 corrections légères appliquées

relations:
  serie: null
  references: []
---

# Le Pont Cassé — Canon (2026-05-08)

> **Statut :** ✅ canon · 540 mots · P2 (5 min)
> **Patte :** Kishōtenketsu noyau (B) + voix tranche de vie (D) + cycle d'arc (C)
> **Texte canon :** [`texte.md`](texte.md)

---

## Résumé

Wex, Raph et Pierrot découvrent, en chemin, un pont avec une planche cassée. Plutôt que de le réparer, ils plantent un drapeau-pissenlit pour signaler le trou aux suivants, puis traversent avec précaution. Le pont reste cassé, marqué par la fleur jaune qui dit attention.

---

## Pourquoi cette histoire ?

- **Arc rattaché :** arc-1-objet-decor (signalisation douce)
- **Persos mis en valeur :** Wex (héros invariant) + Raph (T7 fille) + Pierrot (T6 garçon)
- **Objet titre :** le pont cassé — au centre du début à la fin (promesse du titre tenue)
- **Qualité promue :** soin collectif sans réparation forcée

---

## Origine — refonte 2026-05-08

Cette histoire est née de la refonte complète du catalogue MaxPlay le 2026-05-08. Ex-`003-le-pont-casse-v2`, elle a été promue **canon 001** après suppression définitive de l'ancien 001 (canon V1 Monsieur Ferretti) et de toutes les autres histoires en chantier (002, 004, 003-la-confidence).

Test grandeur nature du PROCESS militaire 11 étapes appliqué intégralement (panel writers transitoire à 8 + panel lecteurs transitoire à 6 ; les casts standard 10 writers + 20 lecteurs s'appliquent à partir de 005).

---

## Carte du dossier (post-restauration 2026-05-12)

```
001-le-pont-casse/
├── README.md                   ← ce fichier (carte vivante)
├── kanban.md                   ← état final des 11 étapes (toutes ✅)
├── pitch.md                    ← étape 1
├── plan-histoire.md            ← étape 2
├── briefs/                     ← étape 3
│   ├── brief-univers.md
│   ├── brief-personnages.md
│   ├── brief-histoire.md
│   └── _writer-package.md      ← brief autoporteur 8 runs
├── versions-writers/           ← étape 4 (8 drafts + 8 notes intention)
│   ├── claude-run1.md / run2.md
│   ├── kimi-run1.md / run2.md
│   ├── deepseek-run1.md / run2.md
│   ├── grok-run1.md / run2.md
│   └── _notes-intention/
├── lecteurs-temoins/           ← étape 5 (6 fiches panel transitoire)
│   ├── enfant-fille.md / enfant-garcon.md
│   └── dyade-(maman|papa)-(fille|garcon).md
├── synthese-lecteurs.md        ← étape 5bis (consolidation)
├── selection.md                ← étape 6 (base kimi-run1 validée auteur)
├── rewrite/                    ← étape 7
│   ├── claude-rewrite-v1.md   ← régression (archive)
│   └── _prompt-kimi-rewrite.md ← prompt utilisé
├── texte.md                    ← VERSION CANON (étape 10 — kimi-rewrite-v2 finalisé)
├── synthese-finale.md          ← compilation pipeline + décisions + patterns
├── variantes-culturelles/      ← multi-culture (christ FR produit)
│   └── fr/texte.md
├── assets/                     ← illustrations, audio TTS
└── _archive/
    └── v1-ferretti/            ← pré-histoire V1 canon Ferretti (avant refonte 2026-05-08)
        ├── lecteurs-temoins/papa-yann-relecture-2026-04-30.md  (source patte-papa-yann.md)
        └── rewrite/v2-correction.md
```

> **Restauration 2026-05-12** : la fabrication complète a été restaurée via git (commit `37cda252`) après détection d'un bug d'exécution sur le commit `58b491ed` (canonisation 2026-05-08) qui avait supprimé la matière au lieu de l'archiver. La décision tranchée 2026-05-08 (`pmo/decisions.md` Décision C) prévoyait pourtant : « présence en `_archive/` pour traçabilité ».
>
> **Manquants définitifs** (n'ont jamais été commit en tant que fichiers standalone) :
> - `gatekeeper-verdict.md` étape 8 → verdict PASS 24/24 tracé dans `kanban.md` + `synthese-finale.md`
> - `relecture-rewrite/` étape 9 → verdicts 6×✅ tracés dans `kanban.md` + `synthese-finale.md`
> - `kimi-rewrite-v1.md` / `kimi-rewrite-v2.md` séparés → la v2 finalisée = `texte.md` canon
>
> Patterns narratifs extraits dans [`equipe/lecons-vivantes.md`](../../equipe/lecons-vivantes.md).

---

## Liens process

- Workflow complet : [`../../equipe/PROCESS.md`](../../equipe/PROCESS.md) (11 étapes)
- Patterns narratifs : [`../../equipe/lecons-vivantes.md`](../../equipe/lecons-vivantes.md)
- Onomatopées : [`../../cross-culture/onomatopees/catalogue-onomatopees.md`](../../cross-culture/onomatopees/catalogue-onomatopees.md)
- Patte narrative : [`../../equipe/patte-narrative-maxplay.md`](../../equipe/patte-narrative-maxplay.md)
- Décisions tranchées : [`../../pmo/decisions.md`](../../pmo/decisions.md)
