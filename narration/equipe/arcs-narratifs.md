---
maintenu_par: Conseiller Narratif (concept) + Directeur (validation arcs) + PMO (suivi avancement)
mis_a_jour: 2026-04-29
---

# Arcs narratifs — Concept éditorial

> Concept introduit par l'auteur le 2026-04-29.
> Un **arc** structure plusieurs histoires autour d'un axe précis. Plusieurs arcs cohabitent par saison.

---

## Définition

Un **arc narratif** = **suite de 3 à 7 histoires** (typiquement 3, 5 ou 7) liées par un **axe / fil rouge précis**.

- L'arc n'est **pas une saison** — une saison contient plusieurs arcs.
- L'arc n'est **pas une série fermée** — c'est une cohérence thématique, pas un feuilleton.
- L'arc est **invisible pour le jeune lecteur** — chaque histoire se lit isolément. Le fil rouge se révèle à la relecture / au cumul.

### Caractéristiques d'un arc valide

1. **Axe explicite** formulable en une phrase (ex : *« ce qu'on dit ou ne dit pas a des conséquences réelles »*).
2. **3-7 histoires** — en dessous c'est un duo, au-dessus c'est une saison.
3. **Couverture casting raisonnée** — un arc traverse plusieurs ennéatypes, pas un seul.
4. **Règles transversales** documentées (ce qui se répète, ce qui ne doit jamais arriver).
5. **Indépendance des histoires** — chaque texte se tient seul (pas de cliffhanger entre histoires P2).

---

## Arc « La Parole » (en cours — exemple de référence)

**Axe** : Ce qu'on dit (ou ne dit pas) a des conséquences réelles.

| # | Titre | Statut | Personnages | Ressort « parole » |
|---|-------|--------|-------------|---------------------|
| 002 | Le Rire qui reste | ✅ canon | Wex · Nono · Polo | Une moquerie qui colle |
| 003 | La Confidence | 🟡 workshop | Wex · Madie · Raph | Confidence répétée |
| 004 | Cartable-à-trou | ⚪ pitch | Polo · Lulu · Mimi · Wex | Surnom qui colle |
| 005 | Le Mardi | ⚪ pitch | Wex · Pierrot · Melki | Promesse oubliée |
| 006 | Sept à rien | ⚪ pitch | Juju · Mimi · Wex | Mot dit en colère |

**Règles transversales** :
- Pas d'adulte qui résout
- Pas de morale dite
- Pas de réconciliation rapide
- Wex jamais sauveur
- Le geste > le mot

**Couverture casting** : 8/9 compagnons (Nono, Polo, Madie, Raph, Lulu, Mimi, Pierrot, Melki, Juju) + Wex circule en témoin. Manque : Pierrot apparaît en secondaire, à confirmer.

**Source** : `../archive/inputs-historiques/serie-parole-briefs.md` (archivé) · `../stories/series/001-la-parole.md`.

---

## Arcs en stock (pistes à structurer)

> Quand un faisceau d'idées émerge autour d'un axe, le Conseiller le promeut ici. Quand 3-5 pitches sont stables, on ouvre l'arc officiellement.

| Axe candidat | Statut | Histoires possibles |
|--------------|--------|---------------------|
| *(à remplir au fil des sessions)* | — | — |

---

## Arcs et saisons — emboîtement

```
SAISON
  ├── Arc A (3-7 histoires)
  ├── Arc B (3-7 histoires)
  ├── Arc C (3-7 histoires)
  └── Histoires hors-arc (autonomes)
```

Une saison peut contenir :
- **Plusieurs arcs en parallèle** (les histoires alternent — l'arc « La Parole » coexiste avec d'autres en S1)
- **Des histoires hors-arc** (one-shots qui n'appartiennent à aucun fil rouge)

Une histoire **n'est pas obligée** d'appartenir à un arc.

### Emboîtement en S1 (en cours)

| Arc | Statut | Histoires |
|-----|--------|-----------|
| Arc « La Parole » | 🟡 actif (1/5 canon) | 002-006 |
| *(autres arcs S1)* | ⚪ à émerger | — |
| Histoires hors-arc S1 | ⚪ à venir | 001 (Pont Cassé) est hors-arc |

**Note S1** : l'apparition progressive des compagnons (ondes-couleurs) en milieu/fin S1 sera elle-même un **mini-arc d'introduction** — à formaliser quand les premières histoires post-« Parole » seront pitchées.

---

## Lien avec le pipeline éditorial

| Phase | Lien arc |
|-------|---------|
| **Phase 0 — Pitch (Conseiller)** | Identifier si le pitch s'inscrit dans un arc existant ou ouvre un arc nouveau |
| **Phase 1 — Plan d'Histoire (Architecte)** | Le plan mentionne l'arc d'appartenance et rappelle les règles transversales |
| **Phase 2-5 — Écriture / Décision / Rewrite** | Les writers reçoivent les règles transversales de l'arc dans le brief |
| **Phase 6 — GateKeeper** | Vérifie que les règles transversales sont respectées (pas d'adulte qui résout, etc.) |
| **Phase 7 — Canon** | L'histoire est tagguée avec son arc dans `stories/INDEX.md` |

→ Voir `ORGANIGRAMME.md` pour les phases complètes.

---

## Comment ouvrir un nouvel arc

1. **Conseiller détecte** un axe émergent (3+ pitches qui partagent un fil rouge).
2. **Brief auteur** : le Conseiller formule l'axe en une phrase + propose 3-5 pitches alignés.
3. **Validation auteur + Directeur** : axe validé, arc ouvert.
4. **Création** : un fichier `stories/series/NNN-<slug>.md` est créé avec axe, règles transversales, casting visé.
5. **Tracking** : l'arc apparaît dans la table « Arcs en stock » ci-dessus, puis se déplace vers une section « Arcs en cours ».

---

## Pour aller plus loin

- `../stories/INDEX.md` — table des séries actuelles
- `../stories/series/001-la-parole.md` — fichier de l'arc « La Parole »
- `../pmo/roadmap.md` — vision de la structure des saisons
- `memoire-conseiller.md` — patterns transversaux et arcs en gestation
