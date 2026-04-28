# Organigramme — Équipe Éditoriale MaxPlay

> Référence permanente. Mis à jour si l'équipe évolue.
> Dernière mise à jour : 2026-04-28

---

## Vue d'ensemble

```
AUTEUR (toi)
  │
  ├── dump brut → input-idees/
  │
  ▼
PMO [narration-pmo · Haiku · AUTONOME]
  ├── Scanne input-idees/, crée tickets, ferme tickets
  ├── Peut interroger n'importe quel agent directement
  ├── Alerte auteur si blocage / dérive
  └── Source de vérité projet : backlog · decisions · sprint-log
  │
  ▼
DIRECTEUR ÉDITORIAL [narration · Opus]
  ├── Challenge les idées, produit les 3 briefs
  ├── Consulte un panel externe sur des idées/angles (pas de simulation — avis lecteur)
  ├── Archive les sessions (archive/)
  │
  ├── Consultation panel (si doute ou besoin d'un regard extérieur — pas à bloc)
  │     ├── Science     : Grok + Claude + Kimi  (quick pass)
  │     ├── Sensibilité : Grok + Claude + Kimi  (quick pass)
  │     └── Lecture / angle : Kimi + Grok (avis de lecteur, pas simulation)
  │
  ├── WRITERS (8 parallèles, indépendants, angles assignés)
  │     ├── Kimi 1          [externe · stateless · no reasoning]  — SOBRE / Kishōtenketsu
  │     ├── Kimi 2          [externe · stateless · no reasoning]  — SENSORIEL / poésie du concret
  │     ├── DeepSeek 1      [externe · stateless · no reasoning]  — SOBRE / structure
  │     ├── DeepSeek 2      [externe · stateless · no reasoning]  — SENSORIEL / atmosphère
  │     ├── Grok            [externe · stateless · no reasoning]  — DYNAMIQUE / dialogues / rythme
  │     ├── Claude Libre    [Sonnet  · stateless]  — angle libre, suit son instinct
  │     ├── Claude Dialogue [Sonnet  · stateless]  — DIALOGUE PUR, narration minimale
  │     └── Claude Ancré    [Sonnet  · AVEC MÉMOIRE]  — continuité, patterns validés
  │
  ├── Directeur synthétise → version de travail
  │
  └── RELECTURE (Kimi + Claude, notes / remarques / idées)
        Kimi    [externe · stateless]
        Claude  [Sonnet  · avec mémoire]
              ↓
        Directeur intègre → choix final + rédaction Claude
  │
  ├── LECTEURS TÉMOINS (optionnel — voir règles ci-dessous)
  │     narration-lecteur (Sonnet) + profils externes
  │     narration-lecteur-dyade (Sonnet) — lecture parent-enfant
  │
  ├── SHOWRUNNER (si série en cours ou audit tous les 3)
  │     narration-showrunner (Sonnet) — cohérence série, arcs, callbacks
  │
  ▼
KEEPER [narration-keeper · Haiku]  (fin de cycle uniquement · Claude)
  Ennéagramme · Univers · Prénoms · lookup.yml → PASS / FAIL
  │
  ▼
stories/<NNN-titre>/texte.md  (CANON)
  │
  ▼
AUDIO [narration-audio · Sonnet]  (après canonisation, avant enregistrement)
  Brief audio : rythme, pauses, intonation, voix ElevenLabs
  │
  ▼
LOCALISATION [narration-localisation · Sonnet]  (quand variante culturelle demandée)
  Adaptation cross-country : prénoms, lieux, rituels
  │
  ▼
ARCHIVISTE [narration-archiviste · Haiku · Claude]  (toutes les 5 histoires canon, ou si décision importante)
  Régénère _index/, vérifie structure, met à jour equipe/brief-univers.md
```

---

## Agents — responsabilités et mémoire

### Claude (internes)

| Agent | Modèle | Rôle | Mémoire propre | Partagée |
|-------|--------|------|----------------|----------|
| `narration-pmo` | Haiku | PMO autonome — tickets, décisions, reprise | — | `pmo/` |
| `narration` | Opus | Directeur — challenge, briefs, synthèse, rédaction finale | `memoire-dir.md` | `INDEX.md` · `univers/` · `personnages/` |
| `narration-writer-claude-libre` | Sonnet | Writer libre — angle instinctif, stateless | — | `INDEX.md` · `personnages/` |
| `narration-writer-claude-ancre` | Sonnet | Writer ancré — angle mémoire, continuité | `memoire-writer-ancre.md` | `INDEX.md` · `personnages/` |
| `narration-keeper` | Haiku | Gardien univers (fin de cycle) | `memoire-keeper.md` | `lookup.yml` · `univers/INDEX.md` |
| `narration-archiviste` | Haiku | Index, structure dossiers | — | `_index/` · `lookup.yml` |
| `narration-lecteur` | Sonnet | Lecteur témoin — incarne un profil injecté par le Directeur | — | `equipe/profils-lecteurs.md` |
| `narration-lecteur-dyade` | Sonnet | Lecteur dyade — lecture parent-enfant à voix haute | — | `equipe/profils-lecteurs.md` |
| `narration-showrunner` | Sonnet | Cohérence de série, arcs longs, callbacks | `memoire-showrunner.md` | `stories/INDEX.md` |
| `narration-audio` | Sonnet | Brief audio par histoire | — | `equipe/voix/` |
| `narration-localisation` | Sonnet | Adaptation culturelle cross-country | — | `personnages/prénoms-par-origine.md` |
| `narration-science` | Haiku | Validation faits | `memoire-science.md` | `equipe/sources-sciences.md` |
| `narration-sensibilite` | Sonnet | Détection topics sensibles | `memoire-sensibilite.md` | `equipe/sources-sensibilite.md` |

### Externes stateless

> Aucune mémoire persistante. Contexte injecté à chaque appel par le Directeur.
> Output loggé dans `workshop/<titre>/`.

| Modèle | Version cible | Angle assigné | Rôle principal | Rôle secondaire |
|--------|--------------|---------------|----------------|-----------------|
| **Kimi 1** | 2.6+ (no reasoning) | Sobre / Kishōtenketsu | Writer | Science/Sensibilité légère |
| **Kimi 2** | 2.6+ (no reasoning) | Sensoriel / poésie | Writer | Relecteur |
| **DeepSeek 1** | latest (no reasoning) | Sobre / structure | Writer | — |
| **DeepSeek 2** | latest (no reasoning) | Sensoriel / atmosphère | Writer | — |
| **Grok** | latest (no reasoning) | Dynamique / dialogues | Writer | Science/Sensibilité légère |

---

## Chaîne de commandement

```
Auteur
  ├──→ PMO          (tickets, organisation)
  └──→ Directeur    (décisions éditoriales)

PMO [autonome]
  ├──→ Directeur    (escalade · arbitrage)
  └──→ tous agents  (questions directes)

Directeur
  ├──→ Writers × 8  (brief → 8 versions parallèles avec angles)
  ├──→ Validation légère (Grok + Claude + Kimi si doute)
  ├──→ Relecteurs  (Kimi + Claude après synthèse)
  ├──→ Lecteurs Témoins (si obligatoire — voir règles)
  ├──→ Showrunner  (si série en cours)
  └──→ Keeper      (version finale)

Keeper
  └──→ Directeur   (PASS → canon · FAIL → retour)

Canon
  ├──→ Audio       (brief narration)
  ├──→ Localisation (variantes culturelles)
  └──→ Archiviste  (index, structure)
```

---

## Modèle de mémoire

```
MÉMOIRE PARTAGÉE (tous lisent)
  docs/narration/INDEX.md
  docs/narration/univers/INDEX.md
  docs/narration/personnages/INDEX.md + lookup.yml
  docs/narration/stories/INDEX.md

MÉMOIRE PROPRE (par agent Claude)
  equipe/memoire-dir.md            ← Directeur
  equipe/memoire-writer-ancre.md   ← Writer Ancré uniquement  ← VARIANCE STABLE
  equipe/memoire-keeper.md         ← Keeper
  equipe/memoire-showrunner.md     ← Showrunner
  equipe/memoire-science.md        ← Science
  equipe/memoire-sensibilite.md    ← Sensibilité

MÉMOIRE PROJET (PMO · source de vérité)
  pmo/backlog.md · pmo/decisions.md · pmo/sprint-log.md

AUCUNE MÉMOIRE (stateless — contexte injecté à chaque appel)
  Kimi 1/2 · DeepSeek 1/2 · Grok · Claude Libre · Claude Dialogue
  → output loggé dans workshop/<titre>/version-X.md + relecture.md
```

> **Principe de variance :**
> 7 writers arrivent frais à chaque histoire (aucun biais de session).
> 1 writer (Claude Ancré) porte la continuité éditoriale et les apprentissages.
> C'est cette tension stateless / avec-mémoire qui génère la vraie diversité.

---

## Workflow complet

```
[PHASE 0 — INTAKE]
Auteur dumpe → input-idees/
      ↓
PMO scanne → crée ticket → pmo/backlog.md + sprint-log.md

[PHASE 1 — BRIEF]
Directeur lit ticket + personnages/INDEX + univers/INDEX + memoire-dir.md
      ↓ (si doute science/sensibilité/angle)
Directeur consulte panel → Kimi + Grok + Claude (quick pass)
      ↓
Archiviste crée le module histoire depuis le gabarit :
  stories/<NNN-slug>/README.md   ← frontmatter pré-rempli (titre, persos, date)  [OBLIGATOIRE]
  stories/<NNN-slug>/texte.md    ← vide                                           [OBLIGATOIRE]
  (orchestration.md, archives/, comite-lecture/ → créés si besoin, pas par défaut)
      ↓
Directeur produit 3 fichiers dans workshop/<titre>/ :
  brief-univers.md   ← copie de equipe/brief-univers.md (inchangée) + physique optionnelle
  brief-personnages.md  ← rempli depuis equipe/brief-personnages-template.md
  brief-histoire.md     ← rempli depuis equipe/brief-histoire-template.md (avec angles assignés)
      ↓
PMO log → sprint-log.md

[PHASE 2 — ÉCRITURE × 8 (parallèle)]
Directeur injecte les 3 briefs aux 8 writers simultanément
  Kimi 1 (Sobre)      → workshop/<titre>/version-kimi-1.md
  Kimi 2 (Sensoriel)  → workshop/<titre>/version-kimi-2.md
  DeepSeek 1 (Sobre)  → workshop/<titre>/version-deepseek-1.md
  DeepSeek 2 (Sensoriel) → workshop/<titre>/version-deepseek-2.md
  Grok (Dynamique)    → workshop/<titre>/version-grok.md
  Claude Libre        → workshop/<titre>/version-claude-libre.md
  Claude Dialogue     → workshop/<titre>/version-claude-dialogue.md
  Claude Ancré        → workshop/<titre>/version-claude-ancre.md
      ↓
PMO log → sprint-log.md

[PHASE 3 — SYNTHÈSE]
Directeur lit 8 versions → sélectionne, combine
      ↓
Directeur produit → workshop/<titre>/synthese.md
      ↓
PMO log → sprint-log.md

[PHASE 4 — RELECTURE]
Directeur envoie synthese.md à Kimi + Claude relecteur (style/rythme/émotion)
  → workshop/<titre>/relecture.md
Directeur intègre → workshop/<titre>/version-finale.md
      ↓
PMO log → sprint-log.md

[PHASE 4b — LECTEURS TÉMOINS]
Directeur injecte version-finale.md + profil dans narration-lecteur (Claude)
  ou utilise templates equipe/prompts-externes/lecteurs/ pour Kimi/Grok
  → workshop/<titre>/lecteurs-temoins.md
      ↓
Lecteur Dyade (OBLIGATOIRE pour P2) → simulation lecture parent-enfant
  → workshop/<titre>/lecteur-dyade.md
      ↓
PMO log → sprint-log.md

[PHASE 4c — SHOWRUNNER (si série en cours)]
Showrunner audit version-finale → cohérence série, arcs, callbacks
  → workshop/<titre>/showrunner-audit.md
      ↓
PMO log → sprint-log.md

[PHASE 5 — PRÉ-VALIDATION]
Directeur lance scripts/pre-keeper.js sur version-finale.md
  → vérification auto : longueur, casting, dialogues, morale explicite
      ↓
PMO log → sprint-log.md

[PHASE 6 — KEEPER]
Keeper valide version-finale.md
  ✅ PASS → canon
  ❌ FAIL → retour Directeur (motif) → retour phase 3 ou 4
      ↓
PMO log → sprint-log.md

[PHASE 7 — CANON + CLÔTURE]
Directeur écrit → stories/<NNN-slug>/texte.md  (CANON)
Directeur complète → stories/<NNN-slug>/orchestration.md (qui/où/quoi/Kishōtenketsu final)
      ↓
Scripts de validation :
  → scripts/validate-frontmatter.js sur README.md
  → scripts/generate-index.js (régénère _index/ + stories/INDEX.md)
      ↓
Archiviste :
  → remplit stories/<NNN-slug>/README.md YAML final (mots, keeper_passed, themes...)
  → crée archives/v1-YYYY-MM-DD.md SEULEMENT si V2 prévue ou comité de lecture prévu
  (si histoire N° multiple de 5 → met aussi à jour equipe/brief-univers.md)
      ↓
Mémoires mises à jour :
  → memoire-dir.md (Directeur)
  → memoire-writer-ancre.md (Writer Ancré)
  → memoire-keeper.md (Keeper)
  → memoire-showrunner.md (Showrunner, si appelé)
      ↓
PMO ferme ticket → backlog.md · decisions.md · sprint-log.md
      ↓
Directeur archive session → archive/YYYY-MM-DD-<titre>.md
```

---

## Règles du comité de lecture

### Quand est-ce OBLIGATOIRE ?

| Situation | Comité obligatoire ? |
|-----------|---------------------|
| Première histoire d'une série | ✅ Oui |
| Nouveau personnage principal | ✅ Oui |
| Sujet sensible (complotisme, polarisation, anxiété, exclusion) | ✅ Oui |
| Histoire N° multiple de 5 (001, 005, 010...) | ✅ Oui (audit global) |
| Histoire suite dans une série connue | ❌ Non (optionnel) |
| Mêmes personnages, sujet léger | ❌ Non (optionnel) |

### Quels profils minimum ?

Si comité obligatoire :
- **Lecteur Dyade** (parent-enfant à voix haute) — TOUJOURS
- **Enfant 4 ans** (Max, référence) — TOUJOURS
- **Éditeur jeunesse** — TOUJOURS
- **Filtre culturel** (au moins 2 cultures) — si cross-country envisagé

### Quels profils optionnels ?

- Fille 9 ans / Garçon 9 ans (si histoire plus longue ou nuancée)
- Philosophe (si tension éthique)
- Prof français (si richesse langagière à valider)

---

## Règles de la mémoire (non-négociables)

1. Chaque agent Claude **lit sa mémoire propre en premier** à chaque session
2. **Writer Ancré uniquement** a une mémoire entre les histoires — les autres 7 writers reset
3. **Showrunner** enrichit sa mémoire à chaque audit de série
4. Les décisions de sensibilité sont **enregistrées avec raison** — jamais OUI/NON seul
5. Les relecteurs externes n'ont **aucune mémoire** — le Directeur porte la continuité
6. Une session archivée **n'est jamais effacée**
7. `input-idees/` **n'est jamais supprimé** — transit seulement

---

## Intégration technique des externes

### Court terme — prompts templates (à copier dans leurs interfaces)

```
Kimi 1/2 / DeepSeek 1/2 / Grok / Claude Libre / Claude Dialogue — WRITER
  → Reçoivent : brief-univers.md + brief-personnages.md + brief-histoire.md (avec angle assigné)
  → Produisent : texte brut (pas de commentaires, pas de titre)

Kimi — RELECTEUR
  → Reçoit : brief-univers.md + brief-histoire.md + synthese.md
  → Produit : 3-5 remarques prioritaires (ton · rythme · émotion · dialogues)

Kimi / Grok — CONSULTATION PANEL (science ou sensibilité)
  → Reçoivent : texte + question ciblée (science OU sensibilité)
  → Produisent : verdict + raison en 2-3 lignes

Kimi / Grok — CONSULTATION PANEL (angle / lecture)
  → Reçoivent : brief-histoire.md + idée ou direction à évaluer
  → Produisent : avis de lecteur (pas de simulation de personnage)
```

### MCP tools — opérationnels (2026-04-28)

`ask_kimi`, `ask_deepseek`, `ask_grok` dans `~/.claude.json` (global).
Serveur : `mcp/server.ts` (bun). Headers Claude Code requis pour Kimi. Pas de `max_tokens` — chaque modèle utilise sa limite native.

> **Note :** Kimi MCP non fonctionnel le 2026-04-28 (2 appels = vide). Fix headers appliqué. À tester.

### Briefs — fichiers de référence

| Fichier | Qui le crée | Fréquence | Injecté à |
|---------|------------|-----------|-----------|
| `equipe/brief-univers.md` | Archiviste | Toutes les 5 histoires canon | tous les writers + relecteurs |
| `workshop/<titre>/brief-personnages.md` | Directeur | Chaque histoire | tous les writers |
| `workshop/<titre>/brief-histoire.md` | Directeur | Chaque histoire | tous les writers |

---

## Scripts de validation

| Script | Quand le lancer | Que fait-il |
|--------|----------------|-------------|
| `scripts/pre-keeper.js <version-finale.md>` | Phase 5 — avant Keeper | Vérifie longueur (400-700 mots), casting, dialogues (min 3), morale explicite |
| `scripts/validate-frontmatter.js [README.md]` | Phase 7 — après canonisation | Vérifie cohérence YAML (numéro, slug, statut, mots, ennéatype) |
| `scripts/generate-index.js` | Phase 7 — après canonisation | Régénère `_index/` + `stories/INDEX.md` |
| `scripts/archive-story.js <workshop-name>` | Phase 7 — clôture | Promouvoir workshop → stories/ + archive |
| `scripts/new-story.js <NNN> <slug>` | Phase 1 — création | Copie gabarit → nouveau dossier histoire |

---

## État ARCHI-004 (soldé 2026-04-28)

- [x] `narration-writer-claude-libre.md` créé
- [x] `narration-writer-claude-ancre.md` créé
- [x] `equipe/memoire-writer-ancre.md` créé
- [x] Briefs stateless : `equipe/brief-univers.md` · `brief-personnages-template.md` · `brief-histoire-template.md`
- [x] MCP tools Kimi/DeepSeek/Grok opérationnels (serveur `mcp/server.ts`)
- [x] Supprimer/archiver `narration-writer-a/b/c.md` (remplacés)
- [x] `equipe/prompts-externes/relecteur-kimi.md` (templates copier-coller)
- [x] `equipe/prompts-externes/validation-legere.md`
- [x] Mémoires mises à jour (dir, keeper, writer-ancre)
- [x] Fourchette P2 figée : 400-700 mots
- [x] Agent Directeur réécrit (process 8 writers)
- [x] `skills-map.md` mis à jour
- [x] `archive-story.js` corrigé (pas de préfixe WIP)
- [x] `generate-index.js` écrit aussi dans `stories/INDEX.md`
- [x] `pre-keeper.js` créé
- [x] `validate-frontmatter.js` créé
- [x] Agents créés : `narration-showrunner`, `narration-audio`, `narration-lecteur-dyade`, `narration-localisation`
- [x] ORGANIGRAMME réécrit (règles comité, 8 writers, scripts)
- [ ] Tester MCP Kimi après fix headers
- [ ] Distiller les 7 fichiers `input-idees/`
