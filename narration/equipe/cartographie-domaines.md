---
maintenu_par: Directeur (décisions contenu) + Archiviste (structure physique)
mis_a_jour: 2026-04-28
---

# Cartographie des domaines — Narration MaxPlay

> **À lire avant de créer ou déplacer un fichier.**
> Ce document répond à : "cette info va où ?" et "qui décide ?".
> Il ne contient pas de contenu narratif — uniquement des pointeurs et des règles.

---

## Vue d'ensemble — qui garantit quoi

| Agent | Modèle | Ce qu'il garantit | Ce qu'il ne fait PAS |
|-------|--------|-------------------|----------------------|
| **PMO** `narration-pmo` | Haiku | Tickets ouverts/fermés · décisions tracées · sprint-log à jour · max 3 tickets actifs | Décisions de contenu · arbitrage narratif |
| **Directeur** `narration` | Opus | Sélection parmi 10 writers · pilotage rewrite consolidé · version finale · décisions contenu ambiguës | Indexation · création dossiers · archivage |
| **Writers × 10** (9 libres + 1 guidé) | Opus 4.7 (Claude×2) · Kimi K2.6 (×4) · DeepSeek V4-Pro (×2) · Grok 4.3 (×2) | Version complète dans `stories/<NNN-slug>/versions-writers/` + note d'intention. Libres = FORME uniquement. Guidé = forme + annexe AXES 1-6. | Cohérence univers (c'est le GateKeeper qui vérifie) |
| **GateKeeper** `narration-gatekeeper` | Haiku | PASS/FAIL ennéagramme · univers · prénoms | Réécriture · style · contenu créatif |
| **Archiviste** `narration-archiviste` | Haiku | Structure dossiers conforme · index à jour · README YAML rempli · lookup.yml cohérent | Décisions de contenu · création narrative |
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

**Règle :** toute modification du casting V1 (France) = décision Auteur + entrée `pmo/decisions.md`.

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
| `stories/<NNN-slug>/pitch.md` | Pitch MOYEN 4 cases | Conseiller | 1 |
| `stories/<NNN-slug>/plan-histoire.md` | Plan d'Histoire Kishōtenketsu | Architecte | 2 |
| `stories/<NNN-slug>/briefs/{brief-univers,brief-personnages,brief-histoire}.md` | Briefs writers stateless | Directeur | 3 |
| `stories/<NNN-slug>/versions-writers/*.md` | 10 versions (2 Claude Opus + 3 Kimi libre + 1 Kimi guidé + 2 DeepSeek + 2 Grok) + notes d'intention | Writers | 4 |
| `stories/<NNN-slug>/lecteurs-temoins/{enfant-garcon,enfant-fille,dyade-papa-garcon,dyade-papa-fille,dyade-maman-garcon,dyade-maman-fille}.md` | 6 retours lecteurs texte libre | Lecteurs | 5 |
| `stories/<NNN-slug>/selection.md` | Choix version base + éléments à récupérer + brief rewrite | Directeur | 6 |
| `stories/<NNN-slug>/rewrite/v1.md` | Rewrite (1 cycle max) | Directeur | 7 |
| `stories/<NNN-slug>/gatekeeper-verdict.md` | PASS/CORRECTIONS + motif | GateKeeper | 8 |
| `stories/<NNN-slug>/kanban.md` | Suivi des 9 étapes (source de vérité reprise) | owner d'étape | toutes |
| `stories/<NNN-slug>/synthese.md` + `relecture.md` | Compilation + relecture finale Directeur | Directeur | 9 |
| `stories/<NNN-slug>/texte.md` | **CANON** — figé post-GateKeeper PASS + auteur-validé | Directeur | 9 |
| `stories/<NNN-slug>/_archive/` | Versions abandonnées + anciennes vN (jamais d'overwrite) | tous | toutes |

**Règle :** rien n'est effacé. Versions abandonnées → `_archive/`. Post-canon V2/V3 : `texte.md` actuel → `_archive/v1-YYYY-MM-DD.md`, nouveau `texte.md`.

**Référence complète :** [`PROCESS.md`](PROCESS.md) (workflow militaire 9 étapes).

---

## Domaine 5 — ÉQUIPE

**Responsable contenu :** Directeur (décisions) + Auteur (nommages, modèles)  
**Responsable structure :** Archiviste

| Fichier | Contenu | Qui crée | Qui met à jour | Décision si ambigu |
|---------|---------|----------|----------------|-------------------|
| `equipe/ORGANIGRAMME.md` | Workflow complet 6 phases | Directeur | Directeur + Auteur | Auteur |
| `equipe/cartographie-domaines.md` | Ce fichier | Directeur | Directeur + Archiviste | Auteur |
| `equipe/brief-univers.md` | Brief injection stateless | Archiviste (toutes les 5 histoires) | Archiviste | Directeur |
| `equipe/templates/plan-histoire.template.md` | Template Plan d'Histoire | Architecte | Architecte | Directeur |
| `equipe/templates/selection.template.md` | Template sélection Directeur (ex-decision) | Directeur | Directeur | Directeur |
| `equipe/templates/{pitch,brief-*,kanban,synthese}.template.md` | Templates restants (étapes 1, 3, kanban, 9) | owners respectifs | owners | Directeur |
| `stories/_gabarit/` | Gabarit de dossier histoire (copie de référence) | Archiviste | Archiviste | Archiviste |
| `equipe/memoire-dir.md` | Mémoire Directeur inter-sessions | Directeur | Directeur | Directeur |
| `equipe/memoire-conseiller.md` | Mémoire Conseiller (arcs, saisons, feedback) | Conseiller | Conseiller | Directeur |
| `equipe/memoire-architecte.md` | Mémoire Architecte (plans, structures) | Architecte | Architecte | Directeur |
| `equipe/memoire-gatekeeper.md` | Mémoire GateKeeper (erreurs récurrentes) | GateKeeper | GateKeeper | — |
| `equipe/profils-lecteurs.md` | Fiches 7 profils + 8 cultures | Directeur | Directeur | Directeur |
| `equipe/sources-sciences.md` | Références documentaires | Science | Science | Science |
| `equipe/sources-sensibilite.md` | Catalogue topics sensibles | Sensibilité | Sensibilité | Sensibilité |
| `equipe/prompts-externes/` | Templates copy-paste externes | Directeur | Directeur | — |

---

## Domaine 6 — PMO

**Responsable :** PMO exclusivement

| Fichier | Contenu | Qui crée | Qui met à jour | Qui lit |
|---------|---------|----------|----------------|---------|
| `pmo/INDEX.md` | État instantané + règles reprise | PMO | PMO | **Tous — premier fichier à lire après reboot** |
| `pmo/backlog.md` | Tickets actifs (max 3) + terminés | PMO | PMO | Directeur + Auteur |
| `pmo/decisions.md` | Décisions définitives + questions ouvertes | PMO | PMO | Tous |
| `pmo/sprint-log.md` | Journal de sessions | PMO | PMO (fin de chaque phase) | Tous |
| `pmo/roadmap.md` | Vision 3-6-12 mois | PMO + Auteur | PMO | Directeur + Auteur |

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
| `.claude/agents/narration-architecte.md` | Architecte | Auteur |
| `.claude/agents/narration-gatekeeper.md` | GateKeeper | Auteur |
| `.claude/agents/narration-writer-claude-libre.md` | Writer Claude Libre (Opus 4.7) | Auteur |
| `.claude/agents/narration-writer-kimi-guide.md` | Writer Kimi Guidé (Sonnet orchestre + Kimi K2.6 via MCP) | Auteur |
| `infra/mcp/MODELS.md` | Configuration LLM (Grok 4.3 / Kimi K2.6 / DeepSeek V4-Pro) — dépréciations + historique | Auteur + PMO |
| `.claude/agents/narration-archiviste.md` | Archiviste | Auteur |
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
        │     → pmo/decisions.md
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
| Sens culturel d'un objet/élément (pluie, feu, repas, silence…) | Note de pattern | `equipe/memoire-conseiller.md` (section "Patterns éditoriaux") | Conseiller |
| Geste/comportement enfant par culture pour un même thème | Catalogue de variations | `stories/NNN-slug/variantes-culturelles/` | Archiviste (structure) + Directeur (contenu) |
| Prénom + diminutif d'un perso dans une culture | Identité | `personnages/type-NN/pays/XX/identite.md` + `personnages/lookup.yml` | Directeur (choix) + Archiviste (lookup) |
| Casting cross-country complet pour une culture | Catalogue | `personnages/catalogue-prenoms/` | Archiviste |
| Profil lecteur d'une culture cible | Brief lecteur | `equipe/profils-lecteurs.md` | Directeur |

**Premier exemple consigné — la pluie :**

| Culture | Sens | Geste enfant |
|---------|------|--------------|
| Sahel | Bénédiction attendue | Danse sous l'orage |
| Tokyo / Europe tempérée | Nuisance douce | S'abritent, observent les flaques |
| São Paulo | Élément quotidien | Continuent, à peine ralentis |
| Bombay / mousson | Saison entière | Jeux dédiés à la mousson |
| Désert | Événement rare, sacré | Sortent exprès, en silence |

→ détail et leçon V2→V3 dans `equipe/memoire-conseiller.md`.

**Règle :** une variation culturelle ne descend dans `stories/.../variantes-culturelles/` qu'une fois la version FR canon. Avant ça → matière de pattern dans la mémoire Conseiller.

---

## Invariants (non-négociables)

1. **Canon = GateKeeper PASS** — aucun texte canon sans PASS GateKeeper
2. **Casting V1 figé** — modification = décision Auteur explicite
3. **Rien n'est effacé** — archive ou déplace, ne supprime pas
4. **INBOX.md** = transit — vider au fil des sessions
5. **lookup.yml** = source de vérité prénoms — Archiviste maintient, Directeur décide en cas de conflit
6. **`brief-univers.md` stateless** = toujours la version de `equipe/brief-univers.md` du jour — Archiviste recopie en Phase 1, ne pas éditer en workshop
7. **PMO loggé à chaque phase** — sans log PMO, la phase n'est pas traçable
8. **Un dossier workshop = une histoire** — pas de mélange entre titres
9. **Saison 1 = prisme enfant pur** — les parents existent hors-cadre, ne sont **jamais** dans la scène. Pas de dialogue parent ↔ enfant, pas d'intervention parentale dans la résolution. Le foyer peut affleurer (un seuil, une voix au loin), le parent n'entre pas. Le filtre se relâche éventuellement en S2+ (modèle Bluey « bon assez parent »). Décision tranchée 2026-04-29 — voir `../pmo/decisions.md`.
10. **Compagnons = ondes / couleurs émotionnelles** — jamais d'animaux, jamais de mascotte. Apparition progressive milieu/fin S1. Voir `../univers/vie-quotidienne/compagnons.md`. Décision tranchée 2026-04-29.
11. **Sensibilité différenciée, pas savoir caché** — chaque perso (les 9 + Wex) perçoit ce que les autres ne perçoivent pas. Pas de hiérarchie « Wex sait, les autres ignorent ». Décision tranchée 2026-04-29.
