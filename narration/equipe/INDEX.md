# Équipe éditoriale — INDEX

> **Point d'entrée du dossier `equipe/`.** Charger ce fichier en premier pour savoir quoi lire selon la tâche.
> Dernière mise à jour : 2026-05-12 (PROCESS 10 étapes après fusion pitch+plan, Architecte deprecated, Archiviste élevé au rang de maillon central proactif)

---

## Si tu es perdu : par où commencer ?

| Tu veux… | Lis d'abord |
|---|---|
| Comprendre comment on écrit une histoire | [`PROCESS.md`](PROCESS.md) — workflow militaire 10 étapes |
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
| [`PROCESS.md`](PROCESS.md) | Workflow militaire 10 étapes — owners, I/O, critères PASS, reprise | Directeur + Auteur |
| [`ORGANIGRAMME.md`](ORGANIGRAMME.md) | Vue d'ensemble agents + chaîne de commandement + cérémonies | Directeur |
| [`cartographie-domaines.md`](cartographie-domaines.md) | Où va quelle info, qui décide, invariants | Directeur + Archiviste |
| [`patte-narrative-maxplay.md`](patte-narrative-maxplay.md) | Patte B+D+C : Kishōtenketsu noyau + tranche de vie voix + cycle cadre. Outils E/A doux. F écartée. ✅ Créé 2026-04-30. | Conseiller + Directeur |
| [`patte-papa-yann.md`](patte-papa-yann.md) | **Patte de l'auteur** — 7 reproches récurrents + 14 critères checklist anti-Papa Yann (anti-jugement, anti-littéraire, cohérence stricte, etc.). ✅ Créé 2026-04-30 depuis relectures 001+002+003. | Papa Yann + Directeur + GateKeeper |
| [`../../.claude/agents/README.md`](../../.claude/agents/README.md) | **⚠ Règle frontmatter YAML agents** — interdits `:` interne + em-dash `—` + `×` dans description non quotée. Diagnostic + correctif documenté 2026-05-02. À LIRE avant de créer/modifier un agent. | Tous |

### Templates (gabarits réutilisables)

> Dossier [`templates/`](templates/) — 10 gabarits (8 initiaux 2026-04-30 + 2 briefs writers 2026-05-07)

| Template | Sert à | Lu/rempli par |
|---|---|---|
| `pitch.template.md` | Étape 1 — pitch MOYEN 4 cases | Conseiller |
| `plan-histoire.template.md` | ⚠️ Deprecated 2026-05-12 (étape 2 supprimée par fusion Pitch+Plan). À ne plus utiliser. Utiliser `pitch.template.md` étendu par le Conseiller. | — |
| `brief-univers.template.md` | Étape 3 — règles univers stateless | Directeur |
| `brief-personnages.template.md` | Étape 3 — casting figé + ennéatypes dilués | Directeur |
| `brief-histoire.template.md` | Étape 3 — pitch + plan + contraintes + variance writers | Directeur |
| **`brief-writer-libre.template.md`** | Étape 4 — brief commun aux 9 writers libres (forme uniquement, no contenu imposé) | Directeur |
| **`brief-writer-guide.template.md`** | Étape 4 — brief enrichi pour le 1 writer guidé (Kimi) avec annexe AXES 1-6 | Directeur |
| `selection.template.md` | Étape 6 — sélection Directeur post-lecteurs | Directeur |
| `kanban.template.md` | Suivi des 10 étapes par histoire | PMO + owner d'étape |
| `synthese.template.md` | Étape 9 — compilation analyses | Directeur |

### Configuration LLM

| Fichier | Sert à |
|---|---|
| [`../../infra/mcp/MODELS.md`](../../infra/mcp/MODELS.md) | Source de vérité des modèles LLM utilisés (Grok 4.3, Kimi K2.6, DeepSeek V4-Pro). Dépréciations à surveiller. Historique des changements. |

### Mémoires d'agents

| Fichier | Agent | Contenu | Fréquence MAJ |
|---|---|---|---|
| [`memoire-conseiller.md`](memoire-conseiller.md) | Conseiller (Opus) | Arcs, saisons, feedback lecteurs, patterns validés | Après chaque session |
| [`memoire-architecte.md`](memoire-architecte.md) | ⚠️ Architecte (deprecated 2026-05-12) — fichier conservé pour traçabilité, agent en standby | — |
| [`memoire-dir.md`](memoire-dir.md) | Directeur (Opus) | Décisions de sélection, ce qui a fonctionné | Après chaque histoire |
| [`memoire-gatekeeper.md`](memoire-gatekeeper.md) | GateKeeper (Haiku) | Erreurs récurrentes, patterns à surveiller | Après chaque validation |
| [`memoire-science.md`](memoire-science.md) | Science (Haiku) | Validations scientifiques effectuées, refs vulgarisation enfants | Après chaque validation |
| [`memoire-sensibilite.md`](memoire-sensibilite.md) | Sensibilité (Sonnet) | Décisions topics sensibles enregistrées, posture éditoriale auteur | Après chaque décision |

### Sources documentaires

| Fichier | Contenu | Mis à jour par |
|---|---|---|
| [`sources-narratologie.md`](sources-narratologie.md) | Étude cross-culture, paliers mots/âge, Kishōtenketsu, ToM, modèles narratifs (6 familles) | Conseiller |
| [`sources-sciences.md`](sources-sciences.md) | Refs documentaires (C'est pas sorcier, La Vie…) | Science |
| [`sources-sensibilite.md`](sources-sensibilite.md) | Catalogue topics sensibles / conspirationnistes | Sensibilité |
| [`../personnages/voix-meta/`](../personnages/voix-meta/README.md) | **Voix méta** : narrateurs H/F adultes, cheatsheet didascalies writers, voice_ids casting, étude vocale 18 prompts (déplacé 2026-05-11 dans pilier 1) | Audio |
| 🎙️ Skill global `~/.claude/skills/audio-direction-elevenlabs/` | **PRODUCTION audio multi-voix MaxPlay** (PROCESS MILITAIRE depuis 2026-05-16) : text-to-dialogue API 1 appel/paquet < 2000c + ffmpeg loudnorm final, tags v3 catalogués + verdicts, tricks de graphie (b-bus pédago, 'mot subtle), pronunciation dicts, voice settings, 20+ anti-patterns confirmés, 12 cultures préparées. Auto-trigger sur audio/voix/multi-voix/dialogue/text-to-dialogue. Skill PARENT + 8 sous-fichiers indexés. | Audio + narration-audio + Voice Director |
| [`profils-lecteurs.md`](profils-lecteurs.md) | Fiches profils lecteurs témoins (enfant 4-6, dyade) | Directeur |
| [`../cross-culture/onomatopees/catalogue-onomatopees.md`](../cross-culture/onomatopees/catalogue-onomatopees.md) | **Catalogue 37 onomatopées** enfantines validées cross-langues (FR/EN/JA/ES/PT-BR/DE/AR/ZH). Pivot pour writers : 0 ou 1 onomatopée par histoire, choisie dans cette liste | Conseiller |
| [`../personnages/theorie/pedagogie-enfance/`](../personnages/theorie/pedagogie-enfance/README.md) | **Boussole pédagogique 4-7 ans cross-culture** (Wellman, Tomasello, Vygotsky, Bachelard, Bruner, Thomas & Chess + albums jeunesse). Invariants cognitifs/affectifs, identification narrative, profils d'enfants, best-practices histoires courtes 4-5 ans. **À consulter avant brainstorm/pitch+plan/brief.** | Conseiller (intégré 2026-05-12 — Architecte deprecated) |
| [`../personnages/theorie/enneagramme/chabreuil-synthese-complete.md`](../personnages/theorie/enneagramme/chabreuil-synthese-complete.md) | **Synthèse exhaustive du Grand Livre Chabreuil 2022** (9181 mots, 10 sections). Concepts de base, 9 types détaillés (lumière prioritaire), ailes, flèches, instincts, **interactions 36 paires**, cross-culture, **essence et sublimation**, application MaxPlay (gestes/objets/moments par type, garde-fous anti-biais). | Conseiller |
| [`lecons-vivantes.md`](lecons-vivantes.md) | **Document vivant** des patterns narratifs MaxPlay confirmés (P1-P6), pièges (G1-G6), axes 1-6, signal genre. Mis à jour à chaque canonisation. Lu par Conseiller (étape 1 Pitch+Plan), writers via briefs. | Conseiller + Directeur |

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
├─ Écrire une version (Claude libre, x2)
│   → narration-writer-claude-libre (Opus 4.7)
│
├─ Écrire la version GUIDÉE (Kimi avec annexe AXES 1-6)
│   → narration-writer-kimi-guide (Sonnet orchestre, appelle Kimi K2.6 via MCP)
│
├─ Écrire une version libre via LLM externe (Kimi/DeepSeek/Grok)
│   → MCP llm-copains : ask_kimi / ask_deepseek / ask_grok
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
- Versions writers (10) : 9 libres `versions-writers/{claude-1,claude-2,kimi-1,kimi-2,kimi-3,deepseek-1,deepseek-2,grok-1,grok-2}.md` + 1 guidé `kimi-guide.md`
- Archives : `_archive/vN-YYYY-MM-DD.md` (jamais d'overwrite)

### Statut d'une histoire

Le statut **n'est plus une localisation** (fini `workshop/` vs `stories/`). C'est une **propriété** lisible dans :
- `kanban.md` (étape en cours)
- `README.md` (frontmatter YAML)

Statuts possibles : `pitch` · `plan` · `briefs` · `versions` · `lecteurs` · `selection` · `rewrite` · `gatekeeper` · `canon` · `abandoned`

### SLA et alertes

- **3 jours max** d'attente auteur sur étapes 1, 6, 10 (pitch, sélection, canon — PROCESS 10 étapes)
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
- [`../saisons/INDEX.md`](../saisons/INDEX.md) — plan éditorial (saisons → arcs → stories)
- [`../personnages/INDEX.md`](../personnages/INDEX.md) — casting V1 figé
- [`../univers/INDEX.md`](../univers/INDEX.md) — règles du monde
- [`../stories/INDEX.md`](../stories/INDEX.md) — catalogue des histoires
