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
  ├── Simule les lecteurs (profils-lecteurs.md)
  ├── Archive les sessions (archive/)
  │
  ├── Validation légère (consultés si doute — pas à bloc)
  │     ├── Science     : Grok + Claude + Kimi  (quick pass)
  │     └── Sensibilité : Grok + Claude + Kimi  (quick pass)
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
ARCHIVISTE [narration-archiviste · Haiku · Claude]  (sur demande)
  Régénère _index/, vérifie structure, reconstitue variantes culturelles
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
Auteur dumpe → input-idees/
      ↓
PMO scanne → tickets → pmo/backlog.md
      ↓
Directeur challenge + consulte (si doute : Grok + Claude + Kimi léger)
      ↓
Directeur crée brief → workshop/<titre>/brief.md
      ↓
Writers × 5 (parallèles, indépendants) → 5 versions
      ↓
Directeur synthétise → version de travail
      ↓
Relecture : Kimi + Claude → notes dans workshop/<titre>/relecture.md
      ↓
Directeur intègre → choix final + rédaction Claude
      ↓
Keeper valide → PASS → stories/<NNN-titre>/texte.md (CANON)
      ↓
PMO ferme ticket · Archiviste met à jour _index/
      ↓
Archive → archive/YYYY-MM-DD-<sujet>.md
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
Kimi / DeepSeek / Grok — WRITER
  → Reçoivent : brief + règles univers résumées + consigne style libre
  → Produisent : texte brut (pas de commentaires)

Kimi — RELECTEUR
  → Reçoit : brief + version synthétisée
  → Produit : 3-5 remarques prioritaires (ton · rythme · émotion)

Kimi / Grok — VALIDATION LÉGÈRE
  → Reçoivent : texte + question ciblée (science OU sensibilité)
  → Produisent : verdict + raison en 2-3 lignes
```

### Moyen terme — MCP tools

Ajouter dans `.mcp.json` : `kimi-writer`, `deepseek-writer`, `grok-writer`, `kimi-review`
appelables directement depuis Claude Code via l'API de chaque modèle.

---

## À implémenter (ticket ARCHI-004)

- [ ] Créer `narration-writer-claude-libre.md` (agent Sonnet stateless)
- [ ] Créer `narration-writer-claude-ancre.md` (agent Sonnet avec mémoire)
- [ ] Créer `equipe/memoire-writer-ancre.md`
- [ ] Créer `equipe/prompts-externes/writer-brief.md` (template brief → Kimi/DS/Grok)
- [ ] Créer `equipe/prompts-externes/relecteur-kimi.md`
- [ ] Créer `equipe/prompts-externes/validation-legere.md`
- [ ] MCP tools (kimi/deepseek/grok) → `.mcp.json`
- [ ] Supprimer/archiver `narration-writer-a/b/c.md` (remplacés)
