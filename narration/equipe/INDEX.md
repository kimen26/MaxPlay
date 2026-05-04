# Équipe éditoriale — INDEX

> **Point d'entrée du dossier `equipe/`.** Charger ce fichier en premier pour savoir quoi lire selon la tâche.
> Dernière mise à jour : 2026-04-30

---

## Si tu es perdu : par où commencer ?

| Tu veux… | Lis d'abord |
|---|---|
| Comprendre comment on écrit une histoire | [`PROCESS.md`](PROCESS.md) — workflow militaire 9 étapes |
| Savoir qui fait quoi (agents, modèles, rôles) | [`ORGANIGRAMME.md`](ORGANIGRAMME.md) |
| Trouver où ranger une info | [`cartographie-domaines.md`](cartographie-domaines.md) |
| Comprendre la patte narrative MaxPlay | [`patte-narrative-maxplay.md`](patte-narrative-maxplay.md) |
| Comprendre ce que Papa Yann reproche / valide en relecture | [`patte-papa-yann.md`](patte-papa-yann.md) |
| Lancer un brief writer | [`templates/`](templates/) — 8 gabarits prêts |
| Voir les règles tranchées | [`../pmo/decisions.md`](../pmo/decisions.md) |
| Reprendre une histoire après reboot | `stories/<NNN-slug>/kanban.md` (la source de vérité) |

---

## Carte des fichiers `equipe/`

### Documents de cadrage

| Fichier | Rôle | Mis à jour par |
|---|---|---|
| [`PROCESS.md`](PROCESS.md) | Workflow militaire 9 étapes — owners, I/O, critères PASS, reprise | Directeur + Auteur |
| [`ORGANIGRAMME.md`](ORGANIGRAMME.md) | Vue d'ensemble agents + chaîne de commandement + cérémonies | Directeur |
| [`cartographie-domaines.md`](cartographie-domaines.md) | Où va quelle info, qui décide, invariants | Directeur + Archiviste |
| [`patte-narrative-maxplay.md`](patte-narrative-maxplay.md) | Patte B+D+C : Kishōtenketsu noyau + tranche de vie voix + cycle cadre. Outils E/A doux. F écartée. ✅ Créé 2026-04-30. | Conseiller + Directeur |
| [`patte-papa-yann.md`](patte-papa-yann.md) | **Patte de l'auteur** — 7 reproches récurrents + 14 critères checklist anti-Papa Yann (anti-jugement, anti-littéraire, cohérence stricte, etc.). ✅ Créé 2026-04-30 depuis relectures 001+002+003. | Papa Yann + Directeur + GateKeeper |
| [`../../.claude/agents/README.md`](../../.claude/agents/README.md) | **⚠ Règle frontmatter YAML agents** — interdits `:` interne + em-dash `—` + `×` dans description non quotée. Diagnostic + correctif documenté 2026-05-02. À LIRE avant de créer/modifier un agent. | Tous |

### Templates (gabarits réutilisables)

> Dossier [`templates/`](templates/) — 8 gabarits créés 2026-04-30 (Phase A3 ✅)

| Template | Sert à | Lu/rempli par |
|---|---|---|
| `pitch.template.md` | Étape 1 — pitch MOYEN 4 cases | Conseiller |
| `plan-histoire.template.md` | Étape 2 — plan Kishōtenketsu | Architecte |
| `brief-univers.template.md` | Étape 3 — règles univers stateless | Directeur |
| `brief-personnages.template.md` | Étape 3 — casting figé + ennéatypes dilués | Directeur |
| `brief-histoire.template.md` | Étape 3 — pitch + plan + contraintes + variance writers | Directeur |
| `selection.template.md` | Étape 6 — sélection Directeur post-lecteurs | Directeur |
| `kanban.template.md` | Suivi des 9 étapes par histoire | PMO + owner d'étape |
| `synthese.template.md` | Étape 9 — compilation analyses | Directeur |

### Mémoires d'agents

| Fichier | Agent | Contenu | Fréquence MAJ |
|---|---|---|---|
| [`memoire-conseiller.md`](memoire-conseiller.md) | Conseiller (Opus) | Arcs, saisons, feedback lecteurs, patterns validés | Après chaque session |
| [`memoire-architecte.md`](memoire-architecte.md) | Architecte (Sonnet) | Plans qui ont bien/mal fonctionné | Après chaque histoire |
| [`memoire-dir.md`](memoire-dir.md) | Directeur (Opus) | Décisions de sélection, ce qui a fonctionné | Après chaque histoire |
| [`memoire-gatekeeper.md`](memoire-gatekeeper.md) | GateKeeper (Haiku) | Erreurs récurrentes, patterns à surveiller | Après chaque validation |

### Sources documentaires

| Fichier | Contenu | Mis à jour par |
|---|---|---|
| [`sources-narratologie.md`](sources-narratologie.md) | Étude cross-culture, paliers mots/âge, Kishōtenketsu, ToM, modèles narratifs (6 familles) | Conseiller |
| [`sources-sciences.md`](sources-sciences.md) | Refs documentaires (C'est pas sorcier, La Vie…) | Science |
| [`sources-sensibilite.md`](sources-sensibilite.md) | Catalogue topics sensibles / conspirationnistes | Sensibilité |
| [`voix-enneatypes.md`](voix-enneatypes.md) | Étude vocale par ennéatype (18 prompts ElevenLabs F+M × 9 types) | Audio |
| [`profils-lecteurs.md`](profils-lecteurs.md) | Fiches profils lecteurs témoins (enfant 4-6, dyade) | Directeur |

### Ressources vivantes

| Fichier | Rôle |
|---|---|
| [`exemples-canoniques.md`](exemples-canoniques.md) | Mini-scénarios castés MaxPlay validés (référence concrète pour writers) *(à créer post-Phase D — alimenté par les retours critiques de Papa Yann sur 001/002/003)* |

---

## Arbre de décision — quel agent appeler ?

```
Tu veux faire quoi ?
│
├─ Brainstormer une idée, challenger, créer un pitch
│   → narration-conseiller (Opus)
│
├─ Créer un plan d'histoire depuis un pitch validé
│   → narration-architecte (Sonnet)
│
├─ Écrire une version (Claude libre)
│   → narration-writer-claude-libre (Sonnet)
│
├─ Sélectionner la meilleure version + piloter le rewrite
│   → narration (Directeur, Opus)
│
├─ Validation technique finale (PASS/FAIL checklist)
│   → narration-gatekeeper (Haiku)
│
├─ Gérer tickets, sprint-log, decisions, alertes blocage
│   → narration-pmo (Haiku)
│
├─ Indexer, structurer, vérifier cohérence dossiers
│   → narration-archiviste (Haiku)
│
├─ Vérifier un fait scientifique
│   → narration-science (Haiku)
│
├─ Détecter risques conspirationnistes / polarisation
│   → narration-sensibilite (Sonnet)
│
├─ Adapter une histoire à une autre culture
│   → narration-localisation
│
├─ Lecture témoin enfant seul ou dyade
│   → narration-lecteur · narration-lecteur-dyade
│
├─ Audio TTS ElevenLabs
│   → narration-audio
│
└─ Question rapide, recherche simple
    → quick (Haiku)
```

---

## Conventions clés

### Nommage des fichiers histoire

- Dossier : `stories/<NNN-slug>/` (ex: `stories/001-le-pont-casse/`)
- Canon : `stories/<NNN-slug>/texte.md` (la seule version qui compte au final)
- Versions writers : `versions-writers/{claude,kimi,deepseek,grok}-base.md` + `{claude,kimi}-variance-N-{angle}.md`
- Archives : `_archive/vN-YYYY-MM-DD.md` (jamais d'overwrite)

### Statut d'une histoire

Le statut **n'est plus une localisation** (fini `workshop/` vs `stories/`). C'est une **propriété** lisible dans :
- `kanban.md` (étape en cours)
- `README.md` (frontmatter YAML)

Statuts possibles : `pitch` · `plan` · `briefs` · `versions` · `lecteurs` · `selection` · `rewrite` · `gatekeeper` · `canon` · `abandoned`

### SLA et alertes

- **3 jours max** d'attente auteur sur étapes 1, 6, 9
- Au-delà → kanban 🔴 BLOQUÉ + log auto `pmo/sprint-log.md`
- PMO surveille et alerte

### Versionnage

- Pendant la fabrication : versions intermédiaires → `_archive/<étape>-vN-YYYY-MM-DD.md`
- Post-canon V2/V3 : `texte.md` actuel → `_archive/v1-YYYY-MM-DD.md`, nouveau `texte.md`
- Plafond rewrite : 1 cycle max (sinon retour à étape 6 sélection)

---

## Règle de découvrabilité (hook indexation)

Tout fichier créé ou modifié dans `narration/` doit être **indexé**. Quand un fichier est ajouté/déplacé/renommé :

1. Vérifier s'il doit être ajouté à un INDEX (celui-ci, `narration/INDEX.md`, `stories/INDEX.md`, etc.)
2. Vérifier les liens cassés cross-fichiers
3. En bonne intelligence — pas dogme 100%, mais jamais raté

> **Sinon** : un fichier non-indexé est invisible aux agents qui font leur data pull → la décision écrite ne sert à rien.

---

## Liens externes

- [`../INDEX.md`](../INDEX.md) — index racine du projet narration
- [`../pmo/INDEX.md`](../pmo/INDEX.md) — état instantané PMO
- [`../arcs/INDEX.md`](../arcs/INDEX.md) — fiches d'arc (qualité humaine + problématique au niveau arc)
- [`../personnages/INDEX.md`](../personnages/INDEX.md) — casting V1 figé
- [`../univers/INDEX.md`](../univers/INDEX.md) — règles du monde
- [`../stories/INDEX.md`](../stories/INDEX.md) — catalogue des histoires
