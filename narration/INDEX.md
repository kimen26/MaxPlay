# Narration — Index racine

> **Charger ce fichier en premier.** Lire les sous-fichiers seulement si la tâche le nécessite.
> Architecture en **4 piliers narratifs + opérationnel** (refonte 2026-05-10).

---

## État du projet

| Quoi | Statut |
|------|--------|
| **Casting V1** | ✅ figé 2026-04-24 (4F/5M+Wex) — Wex + Melki/Mimi/Polo/**Madie**/Lulu/Pierrot/Raph/Juju/Nono |
| **Univers** | post-Éveil, Printemps de l'Éveil — distillé dans `univers/` |
| **Direction narrative** | monde sobre, merveilleux discret (vu à travers l'enfant né dedans) · patte B+D+C (Kishōtenketsu + tranche de vie + cycle) |
| **Histoires** | 001 *Le Pont Cassé* (canon 540 mots, 2026-05-08). Brainstorm arc 1 en cours (002-010). Direction Nono validée. Arc 2 (Parole) en pause. |
| **Nom univers** | non tranché — voir [`univers/meta/nom-candidats.md`](univers/meta/nom-candidats.md) |

---

## Architecture

```
narration/
├── personnages/     ← Pilier 1 : qui sont les persos (+ théorie sur l'humain)
├── univers/         ← Pilier 2 : le monde où ils vivent
├── cross-culture/   ← Pilier 3 : variantes par culture (prénoms, onomatopées, lieux, faune, coutumes, saisons climat)
├── saisons/         ← Pilier 4 : plan éditorial (saison → arc → stories)
├── stories/         ← contenu produit
├── equipe/, pmo/, scripts/, archive/, memory/   ← opérationnel
└── README.md, INBOX.md, INDEX.md
```

---

## Pilier 1 — Personnages

| Fichier | Quand le lire |
|---------|---------------|
| [`personnages/INDEX.md`](personnages/INDEX.md) | **Toujours — avant d'écrire un perso** (casting V1 figé) |
| [`personnages/notation-types.md`](personnages/notation-types.md) | Convention `TypeN/TitiN @origine` dans les textes |
| [`personnages/lookup.yml`](personnages/lookup.yml) | Résolveur token → prénom (toutes cultures) |
| [`personnages/casting-mapping.md`](personnages/casting-mapping.md) | Pont théorie ↔ casting V1 |
| [`personnages/type-NN/`](personnages/) | 9 fiches incarnées (caractere, voix, relations, sensibilite) |
| [`personnages/wex/`](personnages/wex/) | Fiche Wex (hors-système, invariant cross-culture) |
| [`personnages/theorie/enneagramme/`](personnages/theorie/enneagramme/README.md) | Théorie ennéagramme (Chabreuil, guide auteur, interactions 9×9, émotions 9×9) |
| [`personnages/theorie/pedagogie-enfance/`](personnages/theorie/pedagogie-enfance/README.md) | **Boussole pédagogique 4-5 ans** (à consulter avant brainstorm/plan/brief) |

---

## Pilier 2 — Univers

| Fichier | Contenu |
|---------|---------|
| [`univers/INDEX.md`](univers/INDEX.md) | Carte du pilier |
| [`univers/fondements/monde.md`](univers/fondements/monde.md) | Événement fondateur, nature, société, rituels, spiritualité |
| [`univers/fondements/systemes.md`](univers/fondements/systemes.md) | Conscience Créative, Totems Janus, Égregores, Gardiens |
| [`univers/fondements/grand-cycle.md`](univers/fondements/grand-cycle.md) | Cycle 22k ans, Yugas adaptés, Ombre Éternelle |
| [`univers/fondements/vibration.md`](univers/fondements/vibration.md) | Fréquence/amplitude, égrégores, lien Janus |
| [`univers/fondements/sensibilites.md`](univers/fondements/sensibilites.md) | Doctrine des 9 sensibilités |
| [`univers/vie-quotidienne/`](univers/vie-quotidienne/) | Compagnons, école, géographie, transport, soin bioélectrique |
| [`univers/meta/nom-candidats.md`](univers/meta/nom-candidats.md) | 5 finalistes pour nommer le monde |

---

## Pilier 3 — Cross-culture

| Fichier | Contenu |
|---------|---------|
| [`cross-culture/INDEX.md`](cross-culture/INDEX.md) | **Toujours — point d'entrée pilier 3** |
| [`cross-culture/doctrine.md`](cross-culture/doctrine.md) | Doctrine cross-culture (bulles, croisements, anti-cliché) |
| [`cross-culture/prenoms/INDEX.md`](cross-culture/prenoms/INDEX.md) | 218 prénoms qualifiés / 30 cultures (réserve) |
| [`cross-culture/castings-nationaux/`](cross-culture/castings-nationaux/INDEX.md) | Castings attribués (FR figé, jp/br/he/sw… à venir) |
| [`cross-culture/onomatopees/`](cross-culture/onomatopees/INDEX.md) | Catalogue 37 onomatopées validées |
| [`cross-culture/faune-flore/`](cross-culture/faune-flore/INDEX.md) | À peupler (animaux/plantes par culture) |
| [`cross-culture/lieux-locaux/`](cross-culture/lieux-locaux/INDEX.md) | À peupler (équivalents pont/rivière/talus par culture) |
| [`cross-culture/coutumes-jeux-aliments/`](cross-culture/coutumes-jeux-aliments/INDEX.md) | À peupler (gestes culturels du quotidien) |
| [`cross-culture/saisons-climat/`](cross-culture/saisons-climat/INDEX.md) | À peupler (saisons locales) |

---

## Pilier 4 — Saisons (plan éditorial)

| Fichier | Contenu |
|---------|---------|
| [`saisons/INDEX.md`](saisons/INDEX.md) | Roadmap globale (S1 en cours, S2/S3 à venir) |
| [`saisons/saison-1/INDEX.md`](saisons/saison-1/INDEX.md) | Saison 1 — 4 arcs (cadre, fil rouge) |
| [`saisons/saison-1/arc-1-objet-decor/`](saisons/saison-1/arc-1-objet-decor/) | Arc 1 — priorité actuelle (10 épisodes) |
| [`saisons/saison-1/arc-2-parole/`](saisons/saison-1/arc-2-parole/) | Arc 2 — en pause |
| [`saisons/saison-1/arc-3-univers-specifique/`](saisons/saison-1/arc-3-univers-specifique/) | Arc 3 — pas avant |
| [`saisons/saison-1/arc-4-pouvoirs-wex/`](saisons/saison-1/arc-4-pouvoirs-wex/) | Arc 4 — fil rouge de fin de saison |

---

## Contenu produit

| Fichier | Contenu |
|---------|---------|
| [`stories/INDEX.md`](stories/INDEX.md) | **Catalogue** des histoires |
| [`stories/001-le-pont-casse/`](stories/001-le-pont-casse/) | Canon complet (540 mots, 11 étapes PROCESS) |
| [`stories/brainstorm-arc-1.md`](stories/brainstorm-arc-1.md) | Fiche brainstorm arc 1 (002-010) en cours |
| [`stories/axes-histoires-en-stock.md`](stories/axes-histoires-en-stock.md) | Stock d'axes (10 unitaires + 5 transversaux) |
| [`stories/_gabarit/`](stories/_gabarit/) | Dossier modèle à copier pour une nouvelle histoire |

---

## Équipe éditoriale (process & agents)

| Fichier | Rôle |
|---------|------|
| [`equipe/INDEX.md`](equipe/INDEX.md) | **Toujours — index équipe, arbre de décision agents** |
| [`equipe/PROCESS.md`](equipe/PROCESS.md) | Workflow militaire 11 étapes (refonte 2026-05-08) |
| [`equipe/patte-narrative-maxplay.md`](equipe/patte-narrative-maxplay.md) | Patte B+D+C (Kishōtenketsu + tranche de vie + cycle) |
| [`equipe/lecons-vivantes.md`](equipe/lecons-vivantes.md) | Document vivant des patterns confirmés (P1-P10, G1-G6) |
| [`equipe/templates/`](equipe/templates/) | 10 gabarits réutilisables (pitch, plan, briefs, sélection, kanban, synthèse) |
| [`equipe/ORGANIGRAMME.md`](equipe/ORGANIGRAMME.md) | Qui fait quoi |
| [`equipe/cartographie-domaines.md`](equipe/cartographie-domaines.md) | Où va quelle info · qui décide · invariants |
| [`equipe/profils-lecteurs.md`](equipe/profils-lecteurs.md) | Profils lecteurs témoins |
| [`equipe/sources-sciences.md`](equipe/sources-sciences.md) | Refs documentaires sciences |
| [`equipe/sources-sensibilite.md`](equipe/sources-sensibilite.md) | Catalogue topics sensibles / conspirationnistes |
| [`equipe/sources-narratologie.md`](equipe/sources-narratologie.md) | Étude narratologique cross-culture |
| [`personnages/voix-meta/`](personnages/voix-meta/README.md) | **Voix méta** : narrateurs H/F + cheatsheet didascalies + preview-texts + alias-tags catalog + **`_VOICE-IDS-CASTING.md` (source de vérité méthodo v24)** + **`_SESSION-2026-05-11-RETOUR-EXP.md`** + étude vocale 18 prompts + playbook MaxPlay |
| 🎙️ **Skills audio globaux** (auto-triggered) | `~/.claude/skills/elevenlabs-voice-design/` (CRÉATION voix — **MAJ 2026-05-12 avec AP#15/16/17**) · `~/.claude/skills/audio-direction-elevenlabs/` (**PRODUCTION** multi-voix : text-to-dialogue, tags v3, tricks graphie, dicts, voice settings, **17 anti-patterns**, 12 cultures) |
| [`equipe/memoire-*.md`](equipe/) | Mémoires décentralisées par agent |

---

## PMO (gestion de projet)

| Fichier | Rôle |
|---------|------|
| [`pmo/INDEX.md`](pmo/INDEX.md) | État instantané + règles de reprise après reboot |
| [`pmo/backlog.md`](pmo/backlog.md) | Tickets actifs (max 3 en cours) |
| [`pmo/decisions.md`](pmo/decisions.md) | Décisions définitives + questions ouvertes |
| [`pmo/sprint-log.md`](pmo/sprint-log.md) | Journal de sessions |
| [`pmo/roadmap.md`](pmo/roadmap.md) | Vision moyen terme |

---

## Inputs & archive

| Fichier | Rôle |
|---------|------|
| [`INBOX.md`](INBOX.md) | Zone unique de dump brut — hook commit auto |
| [`archive/`](archive/) | Sessions archivées (rien d'effacé) |
| [`archive/sessions/2026-05-10-restructuration-3-piliers.md`](archive/sessions/2026-05-10-restructuration-3-piliers.md) | Trace de la refonte 2026-05-10 (4 piliers) |

---

## Workflow narratif (11 étapes)

```
0.  Auteur          → INBOX.md (idée brute)
1.  Conseiller      → pitch.md                                     ✅ valide auteur
2.  Architecte      → plan-histoire.md
3.  Directeur       → briefs/{univers, personnages, histoire}.md
4.  10 Writers      → versions-writers/ (2 Claude + 4 Kimi (dont 1 guidé) + 2 DeepSeek + 2 Grok)
5.  20 Lecteurs     → lecteurs-temoins/ + synthese-lecteurs.md
6.  Directeur       → selection.md (base + greffes)                ✅ valide auteur
7.  Writer top 1    → rewrite/<llm>-rewrite-v1.md
8.  GateKeeper      → gatekeeper-verdict.md
9.  3-4 Lecteurs    → relecture-rewrite/ (sous-panel léger)
10. Directeur+PMO   → texte.md (CANON) + maj lecons-vivantes.md    ✅ valide auteur
```

**Règles obligatoires étapes 1-3** : lecture de [`personnages/theorie/pedagogie-enfance/`](personnages/theorie/pedagogie-enfance/README.md) + ennéatypes pertinents.

---

**Règle :** un INDEX ne contient jamais de contenu canon, seulement des pointeurs.
Un fichier stable > 400 lignes → on scinde thématiquement.
