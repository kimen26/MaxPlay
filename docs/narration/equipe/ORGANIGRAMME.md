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
  ├── Experts internes (consultés à la demande)
  │     ├── narration-science  [Haiku]
  │     └── narration-sensibilite  [Sonnet]
  │
  ├── Writers internes (en parallèle, indépendants)
  │     ├── Writer A  [Sonnet]  — sobre · Kishōtenketsu classique
  │     ├── Writer B  [Sonnet]  — sensoriel · poétique
  │     └── Writer C  [Sonnet]  — dynamique · dialogue
  │
  ├── Directeur synthétise → version finale + notes
  │
  └── COMITÉ DE RELECTURE EXTERNE (optionnel, sur décision Directeur)
        ├── Kimi  [externe · stateless]  — Grand Lecteur narratif
        ├── Grok  [externe · stateless]  — Avocat du diable / critique
        └── DeepSeek  [externe · stateless]  — Cohérence structurelle
              ↓  retours loggés dans workshop/<titre>/relecture-externe.md
  │
  ▼
KEEPER [narration-keeper · Haiku]  (fin de cycle uniquement)
  Ennéagramme · Univers · Prénoms · lookup.yml → PASS / FAIL
  │
  ▼
stories/<NNN-titre>/texte.md  (CANON)
  │
  ▼
ARCHIVISTE [narration-archiviste · Haiku]  (sur demande)
  Régénère _index/, vérifie structure, reconstitue variantes culturelles
```

---

## Agents — responsabilités et mémoire

### Agents Claude (internes)

| Agent | Modèle | Rôle | Mémoire propre | Mémoire partagée |
|-------|--------|------|----------------|-----------------|
| `narration-pmo` | Haiku | PMO autonome — tickets, décisions, reprise | — | `pmo/backlog.md` · `pmo/decisions.md` · `pmo/sprint-log.md` |
| `narration` | Opus | Directeur Éditorial — challenge, briefs, synthèse | `memoire-dir.md` | INDEX.md · univers/ · personnages/ |
| `narration-writer-a` | Sonnet | Writer sobre / Kishōtenketsu classique | `memoire-writer-a.md` | INDEX.md · personnages/ |
| `narration-writer-b` | Sonnet | Writer sensoriel / poétique | `memoire-writer-b.md` | INDEX.md · personnages/ |
| `narration-writer-c` | Sonnet | Writer dynamique / dialogue | `memoire-writer-c.md` | INDEX.md · personnages/ |
| `narration-science` | Haiku | Fact-check sciences et biologie | `memoire-science.md` | `sources-sciences.md` |
| `narration-sensibilite` | Sonnet | Détection topics sensibles / conspirationnistes | `memoire-sensibilite.md` | `sources-sensibilite.md` |
| `narration-keeper` | Haiku | Gardien univers + ennéagramme (fin de cycle) | `memoire-keeper.md` | `personnages/lookup.yml` · `univers/INDEX.md` |
| `narration-archiviste` | Haiku | Index, structure dossiers, lookup.yml | — | `_index/` · `lookup.yml` · `stories/INDEX.md` |

### Relecteurs externes (stateless)

> Ces modèles n'ont **aucune mémoire persistante**. Le Directeur leur injecte le contexte à chaque appel (brief + version finale + règles univers). Leur output est loggé dans `workshop/<titre>/relecture-externe.md`.

| Modèle | Force | Rôle dans l'équipe | Commandé par | Quand |
|--------|-------|-------------------|--------------|-------|
| **Kimi** | Grande capacité contexte · narration | Grand Lecteur — challenge qualité littéraire, lit tout le corpus si besoin | Directeur Éditorial | Après synthèse, avant Keeper (optionnel) |
| **Grok** | Critique acerbe · regard extérieur | Avocat du diable — angles faibles, incohérences émotionnelles, ce qui "ne passe pas" | Directeur Éditorial | Après synthèse, avant Keeper (optionnel) |
| **DeepSeek** | Analyse structurelle | Relecteur cohérence — structure Kishōtenketsu, transitions, arcs logiques | Directeur Éditorial | Après synthèse, avant Keeper (optionnel) |

---

## Chaîne de commandement

```
Auteur
  │ (ordres stratégiques, validation)
  ├──→ PMO          (peut donner des ordres directs)
  └──→ Directeur    (validation éditoriale)

PMO
  │ (alerte, organise, tickets)
  └──→ Directeur    (escalade si blocage ou décision éditoriale)
  └──→ tous agents  (peut poser des questions directement)

Directeur
  ├──→ Writers A/B/C   (brief → 3 versions indépendantes)
  ├──→ Science         (consultation fact-check)
  ├──→ Sensibilité     (consultation topic sensible)
  ├──→ Kimi/Grok/DeepSeek  (relecture après synthèse — optionnel)
  └──→ Keeper          (envoi version finale)

Keeper
  └──→ Directeur   (PASS → canon · FAIL → retour pour correction)
```

---

## Modèle de mémoire

```
MÉMOIRE PARTAGÉE (tous les agents lisent)
  docs/narration/INDEX.md
  docs/narration/univers/INDEX.md
  docs/narration/personnages/INDEX.md + lookup.yml
  docs/narration/stories/INDEX.md

MÉMOIRE PROPRE (agent × 1)
  equipe/memoire-dir.md          ← Directeur
  equipe/memoire-writer-a.md     ← Writer A uniquement
  equipe/memoire-writer-b.md     ← Writer B uniquement
  equipe/memoire-writer-c.md     ← Writer C uniquement
  equipe/memoire-science.md      ← Science
  equipe/memoire-sensibilite.md  ← Sensibilité
  equipe/memoire-keeper.md       ← Keeper

MÉMOIRE PROJET (PMO · source de vérité)
  pmo/backlog.md
  pmo/decisions.md
  pmo/sprint-log.md

AUCUNE MÉMOIRE (stateless — contexte injecté à chaque appel)
  Kimi · Grok · DeepSeek
  → output loggé dans workshop/<titre>/relecture-externe.md
```

---

## Workflow complet

```
Auteur dumpe → input-idees/YYYY-MM-DD-<sujet>.md
      ↓
PMO scanne → crée tickets dans pmo/backlog.md
      ↓
Auteur (ou PMO autonome) choisit un ticket
      ↓
Directeur challenge, consulte experts si besoin
      ↓
Décision → PMO logue pmo/decisions.md + pmo/sprint-log.md
      ↓
Directeur crée brief → workshop/<titre>/brief.md
      ↓
Writers A · B · C (indépendants, en parallèle) → 3 versions
      ↓
Directeur synthétise → version finale + notes éditoriaux
      ↓ [optionnel selon ticket]
Comité externe : Kimi + Grok + DeepSeek → relecture-externe.md
Directeur intègre les retours → ajustement si nécessaire
      ↓
Keeper valide → PASS → stories/<NNN-titre>/texte.md (CANON)
      ↓
PMO ferme ticket + Archiviste met à jour _index/
      ↓
Archive → archive/YYYY-MM-DD-<sujet>.md
```

---

## Règles de la mémoire (non-négociables)

1. Chaque agent Claude **lit sa mémoire propre en premier** à chaque session
2. Chaque agent Claude **met à jour sa mémoire** après chaque décision importante
3. Les mémoires des writers sont **strictement séparées** — le feedback à A n'affecte pas B ou C
4. Les décisions de sensibilité sont **enregistrées avec raison** — jamais OUI/NON seul
5. Les relecteurs externes n'ont **aucune mémoire** — c'est le Directeur qui porte la continuité
6. Une session archivée **n'est jamais effacée**
7. `input-idees/` **n'est jamais supprimé** — transit seulement

---

## Intégration technique des relecteurs externes

### Court terme — prompts templates

Le Directeur prépare un prompt standard à copier dans l'interface Kimi/Grok/DeepSeek.
Chaque modèle a son angle :

```
Kimi  → "Tu es un grand lecteur sensible. Lis cette histoire enfantine + brief.
          Évalue la qualité narrative, l'émotion, le rythme. Sois direct."

Grok  → "Joue l'avocat du diable sur cette histoire pour enfants.
          Qu'est-ce qui ne fonctionne pas ? Quels angles sont manqués ?"

DeepSeek → "Analyse la structure de cette histoire (Kishōtenketsu 4 actes).
             Les transitions sont-elles logiques ? Les arcs cohérents ?"
```

### Moyen terme — MCP tools

Ajouter dans `.mcp.json` des outils `kimi-review`, `grok-review`, `deepseek-review`
appelables directement depuis le Directeur via l'API de chaque modèle.
