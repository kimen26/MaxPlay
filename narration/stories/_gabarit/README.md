---
numero: NNN
slug: slug-de-l-histoire
titre: Titre de l'histoire
statut: pitch              # pitch / plan / briefs / versions / lecteurs / selection / rewrite / gatekeeper / canon / abandoned
version_active: null       # v1 / v2 / v3 (post-canon)
date_creation: YYYY-MM-DD
date_validation: null
gatekeeper_passed: false

editorial:
  structure: Kishotenketsu
  antagoniste: false
  mots: 0
  palier: P2               # P1=2-4min / P2=4-6min / P3=6-8min
  duree_lecture: 0min
  patte: B+D+C             # B=Kishōtenketsu noyau · D=tranche de vie voix · C=cycle d'arc

personnages:
  liste: []                # ex: [wex, mimi, pierrot]
  enneatypes: []           # ex: [2, 6]
  enneatype_heros: null    # ex: 6 (jamais nommé dans le texte)

themes:
  principal: null
  secondaires: []
  qualites: {}             # ex: { mimi: partage-sans-demander, pierrot: laisser-glisser }

univers:
  magic_level: none        # none / light (max 2 détails discrets en arc 1)
  lieu: null               # déjà connu de univers/
  saison: null
  meteo: null
  moment: null

arc:
  rattachement: null       # arc-1-objet-decor / arc-2-parole / arc-3-univers-specifique / arc-4-pouvoirs-wex
  fiche: null              # ex: arcs/arc-1-objet-decor/fiche.md

variantes:
  base: christ
  disponibles: [christ]

production:
  writers_planifies: 8     # 4 core + 2 Claude variance + 2 Kimi variance
  writers_produits: 0
  lecteurs_planifies: 4    # 2 enfant + 2 dyade
  lecteurs_produits: 0
  rewrite_cycles: 0        # 1 max
  comite_lecture: false
  retours_v2: 0

relations:
  serie: null              # ex: serie-la-parole (arc-2)
  references: []           # autres histoires citées
---

# Titre de l'histoire

> **Statut :** `pitch` — voir [`kanban.md`](kanban.md) pour l'étape précise.
> **Patte :** Kishōtenketsu noyau (B) + voix tranche de vie (D) + cycle d'arc (C).
> **Texte canon :** [`texte.md`](texte.md) *(produit en étape 9)*

---

## Résumé

_(2-3 lignes, pas de spoiler de fin. Rempli par le Directeur à l'étape 9.)_

---

## Pourquoi cette histoire ?

- **Arc rattaché :** *(arc-1 / arc-2 / arc-3 / arc-4)*
- **Persos mis en valeur :**
- **Objet titre :**
- **Qualité promue (héritée de l'arc) :**

---

## Carte du dossier

```
NNN-slug/
├── README.md              ← ce fichier (carte vivante)
├── kanban.md              ← état des 9 étapes (source de vérité)
├── pitch.md               ← étape 1 (Conseiller)
├── plan-histoire.md       ← étape 2 (Architecte)
├── briefs/                ← étape 3 (Directeur)
│   ├── brief-univers.md
│   ├── brief-personnages.md
│   └── brief-histoire.md
├── versions-writers/      ← étape 4 (8 versions)
│   ├── claude-base.md · kimi-base.md · deepseek-base.md · grok-base.md
│   ├── claude-variance-1-{angle}.md · claude-variance-2-{angle}.md
│   ├── kimi-variance-1-{angle}.md · kimi-variance-2-{angle}.md
│   └── _notes-intention/
├── lecteurs-temoins/      ← étape 5 (4 retours texte libre)
│   ├── enfant-1.md · enfant-2.md
│   └── dyade-1.md · dyade-2.md
├── selection.md           ← étape 6 (Directeur)
├── rewrite/               ← étape 7
│   └── v1.md              ← 1 cycle max
├── gatekeeper-verdict.md  ← étape 8
├── synthese.md            ← étape 9 (Directeur)
├── relecture.md           ← étape 9 (Directeur)
├── texte.md               ← étape 9 — VERSION CANON
├── variantes-culturelles/ ← multi-culture (post-canon)
│   └── christ.patch
├── assets/                ← illustrations, audio TTS
└── _archive/              ← versions abandonnées + anciennes vN
```

---

## Liens process

- Workflow complet : [`../../equipe/PROCESS.md`](../../equipe/PROCESS.md)
- Templates : [`../../equipe/templates/`](../../equipe/templates/)
- Règles tranchées : [`../../pmo/decisions.md`](../../pmo/decisions.md)
- Patte narrative : [`../../equipe/patte-narrative-maxplay.md`](../../equipe/patte-narrative-maxplay.md)
