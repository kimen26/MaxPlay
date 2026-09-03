---
maintenu_par: Directeur (décisions contenu) + Archiviste (structure physique)
mis_a_jour: 2026-05-15
---

> Source de vérité courante : `PROCESS.md` (11 étapes, 0-10) + `memory/INVARIANTS.md`
> Dernières refontes : 2026-05-12 (fusion étape 1+2, Architecte deprecated) · 2026-05-15 (étape 2 recréée Brainstorm boss+équipe, system/user split writers, brief-univers + _writer-package obsolètes)

# Cartographie des domaines — Narration MaxPlay

> **À lire avant de créer ou déplacer un fichier.**
> Ce document répond à : "cette info va où ?" et "qui décide ?".
> Il ne contient pas de contenu narratif — uniquement des pointeurs et des règles.

---

## Vue d'ensemble — qui garantit quoi

| Agent | Modèle | Ce qu'il garantit | Ce qu'il ne fait PAS |
|-------|--------|-------------------|----------------------|
| **PMO** `narration-pmo` | Haiku | Tickets ouverts/fermés · décisions tracées · sprint-log à jour · max 3 tickets actifs | Décisions de contenu · arbitrage narratif |
| **Directeur** `narration` | Opus | Sélection parmi 14 writers · pilotage rewrite consolidé · version finale · décisions contenu ambiguës | Indexation · création dossiers · archivage |
| **Writers × 14** (13 libres + 1 guidé, refonte v2 2026-05-12, "reco" = température créatif officielle par fournisseur) | Claude Opus/Sonnet/Haiku × déf/reco (×6) · Kimi K2.6 déf/reco/thinking/guidé (×4) · DeepSeek V4-Pro déf/reco (×2) · Grok 4.3 déf/reco (×2) | Version complète dans `stories/<NNN-slug>/4-versions-writers/` + note d'intention. Libres = FORME uniquement. Guidé = forme + axes 1-6 + trame story optionnelle (`3-briefs/brief-writer-guide.md`). Référence températures : `equipe/references/temperatures-llm.md`. | Cohérence univers (c'est le GateKeeper qui vérifie) |
| **GateKeeper** `narration-gatekeeper` | Haiku | PASS/FAIL ennéagramme · univers · prénoms | Réécriture · style · contenu créatif |
| **Archiviste** `narration-pmo` (unifié 2026-07-19) | Haiku | Structure dossiers conforme · index à jour · README YAML rempli · lookup.yml cohérent | Décisions de contenu · création narrative |
| **Science** `narration-science` | Haiku | Faits biologiques/physiques/écologiques validés | Style · structure · cohérence univers |
| **Sensibilité** `narration-sensibilite` | Sonnet | Risques conspirationnistes/polarisation détectés + décision OUI/NON enregistrée | Contenu créatif |

---

## Domaine 1 — PERSONNAGES

**Responsable contenu :** Directeur  
**Responsable structure :** Archiviste

| Fichier / Dossier | Contenu | Qui crée | Qui met à jour | Décision si ambigu |
|-------------------|---------|----------|----------------|-------------------|
| `personnages/INDEX.md` | Tableau 9 types + casting V1 figé | Auteur/Directeur | Directeur | Auteur (casting figé — exceptions rares) |
| `personnages/lookup.yml` | Token → prénom par pays | Archiviste | Archiviste (quand new `pays/XX/identite.md`) | Directeur si conflit de token |
| `personnages/notation-types.md` | Convention `TypeN / TitiN × pays` | Directeur | Directeur | Directeur |
| `personnages/type-NN/README.md` | Résumé type, prénom, sensibilité | Archiviste (gabarit) | Directeur | Directeur |
| `personnages/type-NN/caractere.md` | Essence, peurs, désirs | Directeur | Directeur | Directeur |
| `personnages/type-NN/relations.md` | Liens entre types | Directeur | Directeur | Directeur |
| `personnages/type-NN/voix.md` | Registre langage, expressions | Directeur + Writers | Directeur | Directeur |
| `personnages/type-NN/pays/XX/identite.md` | Prénom complet, diminutif, genre par culture | Directeur | Directeur | Auteur (choix prénom culturel) |
| `personnages/archive/` | Candidats rejetés, brainstorm | Archiviste | Archiviste | Ne pas toucher |

**Règle :** toute modification du casting V1 (France) = décision Auteur + entrée `memory/DECISIONS.md`.

---

## Domaine 2 — UNIVERS

**Responsable contenu :** Directeur  
**Responsable structure :** Archiviste

| Fichier | Contenu | Qui crée | Qui met à jour | Décision si ambigu |
|---------|---------|----------|----------------|-------------------|
| `univers/INDEX.md` | Carte des pièces, questions ouvertes | Directeur | Directeur | Directeur |
| `univers/fondements/monde.md` | Éveil, société, rituels | Directeur | Directeur | Directeur |
| `univers/fondements/systemes.md` | Conscience Créative, Janus, Gardiens | Directeur | Directeur | Directeur |
| `univers/fondements/grand-cycle.md` | 22k ans, Yugas | Directeur | Directeur | Directeur |
| `univers/fondements/vibration.md` | Fréquences, égrégores | Directeur | Directeur | Directeur |
| `univers/fondements/sensibilites.md` | 9 sensibilités + attribution persos | Directeur | Directeur | Directeur |
| `univers/vie-quotidienne/compagnons.md` | Animaux hybrides | Directeur | Directeur | Directeur |
| `univers/vie-quotidienne/transport.md` | Jabus, axes verts | Directeur | Directeur | Directeur |
| `univers/vie-quotidienne/ecole.md` | Programme scolaire, cours | Directeur | Directeur | Directeur |
| `univers/vie-quotidienne/geographie.md` | Maille monde, habitat | Directeur | Directeur | Directeur |
| `univers/meta/nom-candidats.md` | 5 finalistes nom du monde | Auteur | Auteur | Auteur (décision finale) |

**Règle :** idée brute non tranchée → `INBOX.md` d'abord, jamais directement dans `univers/`.  
Nouvelle grosse idée cohérente → nouveau fichier thématique. Idée isolée → section dans fichier existant.

---

## Domaine 3 — HISTOIRES

**Responsable contenu :** Directeur  
**Responsable structure :** Archiviste

| Fichier / Dossier | Contenu | Qui crée | Qui met à jour | Décision si ambigu |
|-------------------|---------|----------|----------------|-------------------|
| `stories/INDEX.md` | Catalogue récits | Directeur (après canon) | Directeur | Directeur |
| `stories/_gabarit/` | Modèle vierge | Archiviste | Archiviste | Archiviste |
| `stories/axes-histoires-en-stock.md` | Stock d'axes | Directeur | Directeur | Directeur |
| `stories/NNN-slug/README.md` | Frontmatter YAML | Archiviste (Phase 1, gabarit) | Archiviste (Phase 6, YAML final) | Directeur si champ ambigu |
| `stories/NNN-slug/texte.md` | **CANON** — texte figé post-GateKeeper | Directeur (Phase 6) | Directeur (si V2 décidée) | Auteur (modif = nouvelle version) |
| `stories/NNN-slug/archives/vN-YYYY-MM-DD.md` | Snapshot figé | Archiviste | Jamais modifier | — |
| `stories/NNN-slug/variantes-culturelles/` | Patches par culture | Archiviste | Archiviste | Directeur |

**Règle :** `texte.md` = CANON (GateKeeper-validé). Toute modification → nouvelle version `archives/v2-...md` + mise à jour frontmatter.

---

## Domaine 4 — FABRICATION D'UNE HISTOIRE (workshop fusionné dans stories/)

**⚠ Migration 2026-04-30 :** le dossier `workshop/` a été supprimé. Toute la fabrication d'une histoire vit désormais dans son dossier `stories/<NNN-slug>/`. Le statut (workshop / canon / abandonné) n'est plus une localisation, c'est une **propriété** lisible dans `kanban.md` + `README.md`.

**Responsable :** Directeur (crée et pilote)

| Fichier | Contenu | Qui crée | Étape PROCESS |
|---------|---------|----------|---------------|
| `stories/<NNN-slug>/1-pitch-plan.md` | Pitch+Plan fusionnés (4 cases + Kishōtenketsu léger) | Conseiller | 1 |
| `stories/<NNN-slug>/3-briefs/{brief-personnages,brief-histoire}.md` | Briefs writers per-story (system prompt WexWorld → `_writer-system.md` par arc) | Directeur | 3 |
| `stories/<NNN-slug>/4-versions-writers/*.md` | 14 versions (6 Claude Opus/Sonnet/Haiku × déf/reco + 4 Kimi déf/reco/thinking/guidé + 2 DeepSeek déf/reco + 2 Grok déf/reco) + notes d'intention | Writers | 4 |
| `stories/<NNN-slug>/5-lecteurs-temoins/*.md` | 20 retours lecteurs (panel 20 obligatoire depuis STORY-002, décision 2026-05-13) texte libre | Lecteurs | 5 |
| `stories/<NNN-slug>/6-selection.md` | Choix version base + éléments à récupérer + brief rewrite | Directeur | 6 |
| `stories/<NNN-slug>/7-rewrite/<llm>-rewrite-v1.md` | Rewrite (1 cycle max) | Writer top 1 | 7 |
| `stories/<NNN-slug>/8-gatekeeper-verdict.md` | PASS/CORRECTIONS + motif | GateKeeper | 8 |
| `stories/<NNN-slug>/kanban.md` | Suivi des 11 étapes (source de vérité reprise) | owner d'étape | toutes |
| `stories/<NNN-slug>/5-synthese-lecteurs.md` | Consolidation Directeur des retours lecteurs (étape 5) | Directeur | 5 → 6 |
| `stories/<NNN-slug>/9-relecture-rewrite/` | Panel 20 re-relecture du rewrite (exception STORY-001 : panel 6) | Lecteurs | 9 |
| `stories/<NNN-slug>/10-texte.md` | **CANON** — figé post-GateKeeper PASS + auteur-validé | Directeur | 10 |
| `stories/<NNN-slug>/10-synthese-finale.md` | Synthèse finale Directeur (post-canon) | Directeur | 10 |
| `stories/<NNN-slug>/_archive/` | Versions abandonnées + anciennes vN (jamais d'overwrite) | tous | toutes |

**Règle :** rien n'est effacé. Versions abandonnées → `_archive/`. Post-canon V2/V3 : `texte.md` actuel → `_archive/v1-YYYY-MM-DD.md`, nouveau `texte.md`.

**Référence complète :** [`PROCESS.md`](PROCESS.md) (workflow militaire 11 étapes, 0-10 — étape 2 = Brainstorm depuis 2026-05-15).

---

## Domaine 5 — ÉQUIPE

**Responsable contenu :** Directeur (décisions) + Auteur (nommages, modèles)  
**Responsable structure :** Archiviste

| Fichier | Contenu | Qui crée | Qui met à jour | Décision si ambigu |
|---------|---------|----------|----------------|-------------------|
| `equipe/ORGANIGRAMME.md` | Workflow complet 6 phases | Directeur | Directeur + Auteur | Auteur |
| `equipe/cartographie-domaines.md` | Ce fichier | Directeur | Directeur + Archiviste | Auteur |
| ~~`equipe/brief-univers.md`~~ | **OBSOLÈTE 2026-05-15** — contenu migré dans `saisons/saison-1/arc-1-objet-decor/_writer-system.md` | — | — | — |
| ⚠️ **ARCHIVÉ 2026-06-14** — `equipe/templates/_archive/plan-histoire.template.md` | Template Plan d'Histoire (étape 2 supprimée 2026-05-12) — **Ne plus utiliser.** Contenu fusionné dans `pitch-plan.template.md`. | Architecte (deprecated) | — | — |
| `equipe/templates/selection.template.md` | Template sélection Directeur (ex-decision) | Directeur | Directeur | Directeur |
| `equipe/templates/{pitch,brief-*,kanban,synthese}.template.md` | Templates restants (étapes 1, 3, kanban, 9) | owners respectifs | owners | Directeur |
| `stories/_gabarit/` | Gabarit de dossier histoire (copie de référence) | Archiviste | Archiviste | Archiviste |
| `../.claude/agent-memory/narration/MEMORY.md` | Mémoire Directeur inter-sessions | Directeur | Directeur | Directeur |
| `../.claude/agent-memory/narration-conseiller/MEMORY.md` | Mémoire Conseiller (arcs, saisons, feedback) | Conseiller | Conseiller | Directeur |
| `_archive/memoire-architecte.md` | ⚠️ Mémoire Architecte — **agent supprimé 2026-05-12**, fichier archivé pour traçabilité, non maintenu | — | — | — |
| `../.claude/agent-memory/narration-gatekeeper/MEMORY.md` | Mémoire GateKeeper (erreurs récurrentes) | GateKeeper | GateKeeper | — |
| `equipe/profils-lecteurs.md` | Fiches 7 profils + 8 cultures | Directeur | Directeur | Directeur |
| `equipe/sources-sciences.md` | Références documentaires | Science | Science | Science |
| `equipe/sources-sensibilite.md` | Catalogue topics sensibles | Sensibilité | Sensibilité | Sensibilité |
| `equipe/prompts-externes/` | Templates copy-paste externes | Directeur | Directeur | — |

---

## Domaine 6 — PMO

**Responsable :** PMO exclusivement

| Fichier | Contenu | Qui crée | Qui met à jour | Qui lit |
|---------|---------|----------|----------------|---------|
| `memory/MEMORY.md` | État instantané + règles reprise | PMO | PMO | **Tous — premier fichier à lire après reboot** |
| `memory/TODO.md` | Tickets actifs (max 3) + terminés | PMO | PMO | Directeur + Auteur |
| `memory/DECISIONS.md` | Décisions définitives + questions ouvertes | PMO | PMO | Tous |
| `memory/MEMORY.md` | Journal de sessions | PMO | PMO (fin de chaque phase) | Tous |
| `memory/TODO.md` | Vision 3-6-12 mois | PMO + Auteur | PMO | Directeur + Auteur |

**Ce que le PMO est garanti de savoir :**
- Tout ticket ouvert (une phase = un log PMO)
- Toute décision définitive
- Tout blocage (ligne `🔴 BLOQUÉ`)
- L'état de chaque histoire (statut backlog)

**Ce que le PMO ne décide PAS :** contenu narratif · qualité · style · ordre des writers.

---

## Domaine 7 — INPUTS & ARCHIVE

| Fichier / Dossier | Contenu | Règle |
|-------------------|---------|-------|
| `INBOX.md` | Dump brut session (hook commit auto) — **zone unique** | Vider les sections distillées une fois rangées dans leurs domaines |
| `archive/` | Sessions archivées complètes | **Jamais effacé** |
| `_archive/narration-reference/` (racine) | Analyses manga/Pokémon, Riso-Hudson — matière dormante | Lecture seule — non chargée au quotidien |

---

## Domaine 8 — AGENTS (prompts)

| Fichier | Agent défini | Qui modifie |
|---------|-------------|-------------|
| `.claude/agents/narration-pmo.md` | PMO | Auteur |
| `.claude/agents/narration.md` | Directeur | Auteur |
| `.claude/agents/narration-conseiller.md` | Conseiller Narratif | Auteur |
| `.claude/agents/narration-conseiller.md (architecte absorbé 2026-05-12)` | Architecte | Auteur |
| `.claude/agents/narration-gatekeeper.md` | GateKeeper | Auteur |
| `.claude/agents/narration-writer-claude-libre.md` | Writer Claude Libre (Opus 4.7) | Auteur |
| `.claude/agents/narration-writer-kimi-guide.md` | Writer Kimi Guidé (Sonnet orchestre + Kimi K2.6 via MCP) | Auteur |
| `infra/mcp/MODELS.md` | Configuration LLM (Grok 4.3 / Kimi K2.6 / DeepSeek V4-Pro) — dépréciations + historique | Auteur + PMO |
| `narration/cross-culture/onomatopees/catalogue-onomatopees.md` | Catalogue 37 onomatopées cross-langues (FR/EN/JA/ES/PT-BR/DE/AR/ZH) | Conseiller |
| `narration/equipe/lecons-vivantes.md` | Document vivant des patterns narratifs (P1-P6, G1-G6, axes) — mis à jour à chaque canonisation | Conseiller + Directeur |
| `narration/equipe/templates/brief-writer-libre.template.md` | Brief commun aux 9 writers libres (forme uniquement) — **ACTIF, injecté dans tous les prompts writers étape 4. Pas d'archivage.** | Directeur |
| `narration/equipe/templates/brief-writer-guide.template.md` | Brief enrichi pour 1 writer guidé (annexe AXES 1-6) | Directeur |
| `.claude/agents/narration-pmo.md` | Archiviste | Auteur |
| `.claude/agents/narration-science.md` | Science | Auteur |
| `.claude/agents/narration-sensibilite.md` | Sensibilité | Auteur |

---

## Arbre de décision — "où va cette info ?"

```
Nouvelle info narrative
        │
        ├── Brute, pas encore tranchée ?
        │     → INBOX.md (puis distillée en session)
        │
        ├── Concerne un personnage (essence, voix, relation) ?
        │     → personnages/type-NN/caractere.md ou voix.md
        │
        ├── Concerne l'univers (loi, lieu, système) ?
        │     → univers/<fichier-thématique>.md
        │     → Si nouveau thème : nouveau fichier + entrée dans univers/INDEX.md
        │
        ├── Concerne une histoire en cours ?
        │     → stories/<NNN-slug>/... (fabrication intégrale, statut dans kanban.md)
        │     → stories/NNN-slug/texte.md (canon uniquement post-Keeper)
        │
        ├── Concerne une décision prise (process, casting, règle) ?
        │     → memory/DECISIONS.md
        │
        ├── Concerne un profil lecteur ou une culture ?
        │     → equipe/profils-lecteurs.md
        │
        ├── Concerne un risque de sensibilité validé ?
        │     → equipe/sources-sensibilite.md
        │
        └── Ambigu ? → Directeur décide → PMO log la décision
```

---

## Éléments cross-culture — où va quelle info culturelle

> Pattern moat : **même histoire × N cultures, geste change, ennéatype reste.**
> Cette section trace où ranger la matière culturelle au fil de sa maturité.

| Type d'info | Stade | Fichier cible | Qui maintient |
|-------------|-------|---------------|---------------|
| Sens culturel d'un objet/élément (pluie, feu, repas, silence…) | Note de pattern | `../.claude/agent-memory/narration-conseiller/MEMORY.md` (section "Patterns éditoriaux") | Conseiller |
| Geste/comportement enfant par culture pour un même thème | Catalogue de variations | `stories/NNN-slug/variantes-culturelles/` | Archiviste (structure) + Directeur (contenu) |
| Prénom + diminutif d'un perso dans une culture | Identité | `personnages/type-NN/pays/XX/identite.md` + `personnages/lookup.yml` | Directeur (choix) + Archiviste (lookup) |
| Casting cross-country complet pour une culture | Catalogue | `cross-culture/prenoms/` | Archiviste |
| Profil lecteur d'une culture cible | Brief lecteur | `equipe/profils-lecteurs.md` | Directeur |

**Premier exemple consigné — la pluie :**

| Culture | Sens | Geste enfant |
|---------|------|--------------|
| Sahel | Bénédiction attendue | Danse sous l'orage |
| Tokyo / Europe tempérée | Nuisance douce | S'abritent, observent les flaques |
| São Paulo | Élément quotidien | Continuent, à peine ralentis |
| Bombay / mousson | Saison entière | Jeux dédiés à la mousson |
| Désert | Événement rare, sacré | Sortent exprès, en silence |

→ détail et leçon V2→V3 dans `../.claude/agent-memory/narration-conseiller/MEMORY.md`.

**Règle :** une variation culturelle ne descend dans `stories/.../variantes-culturelles/` qu'une fois la version FR canon. Avant ça → matière de pattern dans la mémoire Conseiller.

---

## Invariants (non-négociables)

1. **Canon = GateKeeper PASS** — aucun texte canon sans PASS GateKeeper
2. **Casting V1 figé** — modification = décision Auteur explicite
3. **Rien n'est effacé** — archive ou déplace, ne supprime pas
4. **INBOX.md** = transit — vider au fil des sessions
5. **lookup.yml** = source de vérité prénoms — Archiviste maintient, Directeur décide en cas de conflit
6. **System prompt writers** = `saisons/saison-1/arc-1-objet-decor/_writer-system.md` (figé par arc) — `brief-univers.md` OBSOLÈTE depuis 2026-05-15
7. **PMO loggé à chaque phase** — sans log PMO, la phase n'est pas traçable
8. **Un dossier workshop = une histoire** — pas de mélange entre titres
9. **Saison 1 = prisme enfant pur** — les parents existent hors-cadre, ne sont **jamais** dans la scène. Pas de dialogue parent ↔ enfant, pas d'intervention parentale dans la résolution. Le foyer peut affleurer (un seuil, une voix au loin), le parent n'entre pas. Le filtre se relâche éventuellement en S2+ (modèle Bluey « bon assez parent »). Décision tranchée 2026-04-29 — voir `../memory/DECISIONS.md`.
10. **Compagnons = ondes / couleurs émotionnelles** — jamais d'animaux, jamais de mascotte. Apparition progressive milieu/fin S1. Voir `../univers/vie-quotidienne/compagnons.md`. Décision tranchée 2026-04-29.
11. **Sensibilité différenciée, pas savoir caché** — chaque perso (les 9 + Wex) perçoit ce que les autres ne perçoivent pas. Pas de hiérarchie « Wex sait, les autres ignorent ». Décision tranchée 2026-04-29.
