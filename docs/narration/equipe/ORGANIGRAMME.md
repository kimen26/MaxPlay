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
  ├── Challenge les idées, produit les briefs
  ├── Consulte un panel externe sur des idées/angles (pas de simulation — avis lecteur)
  ├── Archive les sessions (archive/)
  │
  ├── Consultation panel (si doute ou besoin d'un regard extérieur — pas à bloc)
  │     ├── Science     : Grok + Claude + Kimi  (quick pass)
  │     ├── Sensibilité : Grok + Claude + Kimi  (quick pass)
  │     └── Lecture / angle : Kimi + Grok (avis de lecteur, pas simulation)
  │
  ├── WRITERS (5 parallèles, indépendants)
  │     ├── Kimi 2.6+        [externe · stateless · no reasoning]  — libre
  │     ├── DeepSeek latest  [externe · stateless · no reasoning]  — libre
  │     ├── Grok latest      [externe · stateless · no reasoning]  — libre
  │     ├── Claude Libre     [Sonnet  · stateless]  — angle libre, suit son instinct
  │     └── Claude Ancré     [Sonnet  · AVEC MÉMOIRE]  — angle spécifique, variance stable
  │
  ├── Directeur synthétise → version de travail
  │
  └── RELECTURE (Kimi + Claude, notes / remarques / idées)
        Kimi    [externe · stateless]
        Claude  [Sonnet  · avec mémoire]
              ↓
        Directeur intègre → choix final + rédaction Claude
  │
  ▼
KEEPER [narration-keeper · Haiku]  (fin de cycle uniquement · Claude)
  Ennéagramme · Univers · Prénoms · lookup.yml → PASS / FAIL
  │
  ▼
stories/<NNN-titre>/texte.md  (CANON)
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
| `narration-writer-claude-ancre` | Sonnet | Writer ancré — angle spécifique, **avec mémoire** | `memoire-writer-ancre.md` | `INDEX.md` · `personnages/` |
| `narration-keeper` | Haiku | Gardien univers (fin de cycle) | `memoire-keeper.md` | `lookup.yml` · `univers/INDEX.md` |
| `narration-archiviste` | Haiku | Index, structure dossiers | — | `_index/` · `lookup.yml` |

### Externes stateless

> Aucune mémoire persistante. Contexte injecté à chaque appel par le Directeur.
> Output loggé dans `workshop/<titre>/`.

| Modèle | Version cible | Rôle principal | Rôle secondaire |
|--------|--------------|----------------|-----------------|
| **Kimi** | 2.6+ (no reasoning) | Writer · Relecteur | Science/Sensibilité légère |
| **DeepSeek** | latest (no reasoning) | Writer | — |
| **Grok** | latest (no reasoning) | Writer | Science/Sensibilité légère |

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
  ├──→ Writers × 5  (brief → 5 versions parallèles)
  ├──→ Validation légère (Grok + Claude + Kimi si doute)
  ├──→ Relecteurs  (Kimi + Claude après synthèse)
  └──→ Keeper      (version finale)

Keeper
  └──→ Directeur   (PASS → canon · FAIL → retour)
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

MÉMOIRE PROJET (PMO · source de vérité)
  pmo/backlog.md · pmo/decisions.md · pmo/sprint-log.md

AUCUNE MÉMOIRE (stateless — contexte injecté à chaque appel)
  Kimi · DeepSeek · Grok · Claude Libre
  → output loggé dans workshop/<titre>/version-X.md + relecture.md
```

> **Principe de variance :**
> 4 writers arrivent frais à chaque histoire (aucun biais de session).
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
  brief-univers.md   ← copie de equipe/brief-univers.md (inchangée)
  brief-personnages.md  ← rempli depuis equipe/brief-personnages-template.md
  brief-histoire.md     ← rempli depuis equipe/brief-histoire-template.md
      ↓
PMO log → sprint-log.md

[PHASE 2 — ÉCRITURE × 5 (parallèle)]
Directeur injecte les 3 briefs aux 5 writers simultanément
  Kimi        → workshop/<titre>/version-kimi.md
  DeepSeek    → workshop/<titre>/version-deepseek.md
  Grok        → workshop/<titre>/version-grok.md
  Claude Libre  → workshop/<titre>/version-claude-libre.md
  Claude Ancré  → workshop/<titre>/version-claude-ancre.md
      ↓
PMO log → sprint-log.md

[PHASE 3 — SYNTHÈSE]
Directeur lit 5 versions → sélectionne, combine
      ↓
Directeur produit → workshop/<titre>/synthese.md
      ↓
PMO log → sprint-log.md

[PHASE 4 — RELECTURE]
Directeur envoie synthese.md à Kimi + Claude relecteur
  → workshop/<titre>/relecture.md
Directeur intègre → workshop/<titre>/version-finale.md
      ↓
PMO log → sprint-log.md

[PHASE 5 — KEEPER]
Keeper valide version-finale.md
  ✅ PASS → canon
  ❌ FAIL → retour Directeur (motif) → retour phase 3 ou 4
      ↓
PMO log → sprint-log.md

[PHASE 6 — CANON + CLÔTURE]
Directeur écrit → stories/<NNN-slug>/texte.md  (CANON)
Directeur complète → stories/<NNN-slug>/orchestration.md (qui/où/quoi/Kishōtenketsu final)
      ↓
Archiviste :
  → remplit stories/<NNN-slug>/README.md YAML final (mots, keeper_passed, themes...)
  → régénère _index/ (by-character, by-theme, by-status, stats)
  → vérifie structure (README + texte obligatoires — le reste optionnel)
  → crée archives/v1-YYYY-MM-DD.md SEULEMENT si V2 prévue ou comité de lecture prévu
  (si histoire N° multiple de 5 → met aussi à jour equipe/brief-univers.md)
      ↓
PMO ferme ticket → backlog.md · decisions.md · sprint-log.md
      ↓
Directeur met à jour → stories/INDEX.md
Directeur archive session → archive/YYYY-MM-DD-<titre>.md
```

---

## Règles de la mémoire (non-négociables)

1. Chaque agent Claude **lit sa mémoire propre en premier** à chaque session
2. **Writer Ancré uniquement** a une mémoire entre les histoires — les autres 4 writers reset
3. Les décisions de sensibilité sont **enregistrées avec raison** — jamais OUI/NON seul
4. Les relecteurs externes n'ont **aucune mémoire** — le Directeur porte la continuité
5. Une session archivée **n'est jamais effacée**
6. `input-idees/` **n'est jamais supprimé** — transit seulement

---

## Intégration technique des externes

### Court terme — prompts templates (à copier dans leurs interfaces)

```
Kimi / DeepSeek / Grok / Claude Libre — WRITER
  → Reçoivent : brief-univers.md + brief-personnages.md + brief-histoire.md
  → Produisent : texte brut (pas de commentaires, pas de titre)

Kimi — RELECTEUR
  → Reçoit : brief-univers.md + brief-histoire.md + synthese.md
  → Produit : 3-5 remarques prioritaires (ton · rythme · émotion)

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

### Briefs — fichiers de référence

| Fichier | Qui le crée | Fréquence | Injecté à |
|---------|------------|-----------|-----------|
| `equipe/brief-univers.md` | Archiviste | Toutes les 5 histoires canon | tous les writers + relecteurs |
| `workshop/<titre>/brief-personnages.md` | Directeur | Chaque histoire | tous les writers |
| `workshop/<titre>/brief-histoire.md` | Directeur | Chaque histoire | tous les writers |

---

## État ARCHI-004 (soldé 2026-04-28)

- [x] `narration-writer-claude-libre.md` créé
- [x] `narration-writer-claude-ancre.md` créé
- [x] `equipe/memoire-writer-ancre.md` créé
- [x] Briefs stateless : `equipe/brief-univers.md` · `brief-personnages-template.md` · `brief-histoire-template.md`
- [x] MCP tools Kimi/DeepSeek/Grok opérationnels (serveur `mcp/server.ts`)
- [ ] Supprimer/archiver `narration-writer-a/b/c.md` (remplacés — à faire)
- [ ] `equipe/prompts-externes/relecteur-kimi.md` (templates copier-coller — à faire)
- [ ] `equipe/prompts-externes/validation-legere.md` (à faire)
