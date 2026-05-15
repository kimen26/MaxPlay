# Organigramme — Équipe Éditoriale MaxPlay

> **Ce fichier est la référence technique complète.**
> **Pour le déroulé humain étape par étape, voir `PROCESS.md`.**
> Référence permanente. Mis à jour 2026-05-13 (post-refonte 2026-05-12 + propagation intégrale).
>
> **État système 2026-05-13** :
> - PROCESS = **10 étapes** (0, 1, 3-10). Étape 2 (Plan) supprimée par fusion avec étape 1 (Pitch+Plan).
> - Conseiller produit `1-pitch-plan.md` (intègre matière statique ex-Architecte : Kishōtenketsu + boussole 4-5 ans).
> - **Architecte deprecated** — agent en standby, conservé pour traçabilité. Ne pas l'invoquer.
> - **PMO + Archiviste proactifs** (binôme FOND/FORME) — invoqués auto à chaque tour narration.
> - **Source de vérité chiffres clés** : `pmo/INVARIANTS.md`.
> Dernière mise à jour : 2026-05-11 (ajout narration-audio + narration-localisation + 10 writers + panel 20 lecteurs)

---

## Évolution post-refonte 2026-05-08

Depuis le PROCESS militaire 10 étapes (2026-05-08, refonte casting v2 2026-05-12) :
- **Writers : 14** (refonte v2 2026-05-12 — calibration multi-modèles) — 6 Claude (Opus/Sonnet/Haiku × déf/reco) + 4 Kimi (déf/reco/thinking/guidé) + 2 DeepSeek (déf/reco) + 2 Grok (déf/reco). "**reco**" = température recommandée créatif officielle par fournisseur (pas "max" — au-delà = incohérence narrative). Référence : [`references/temperatures-llm.md`](references/temperatures-llm.md). Période d'évaluation : 3-5 histoires, puis réduction (ticket ARCHI-008). Détail INVARIANTS § *Casting writers étape 4*.
- **Panel lecteurs : 20** (et non 4) — 10 profils × 2 tranches d'âge (3-5 et 6-7 ans). Exception : STORY-001 conserve panel historique 6 lecteurs ; panel 20 obligatoire pour TOUTES stories actives à partir de STORY-002.
- **2 agents post-canon** : `narration-audio` (production TTS ElevenLabs) + `narration-localisation` (portage cross-country)
- **Agents support** : `narration-science` (validation factuelle), `narration-sensibilite` (topics sensibles), `narration-archiviste` (cohérence docs), `narration-lecteur` (enfant solo simulé), `narration-lecteur-dyade` (parent-enfant simulé)

Détails dans `PROCESS.md` (source canonique des 10 étapes).

---

---

## Vue d'ensemble

```
AUTEUR (toi)
  │
  ├──→ CONSEILLER NARRATIF [narration-conseiller · Opus]
  │       ├── Binôme créatif : challenge, brainstorm, raffine
  │       ├── Produit `1-pitch-plan.md` (étape 1, fusion Pitch+Plan depuis 2026-05-12)
  │       ├── Intègre la matière statique de l'ex-Architecte (Kishōtenketsu + boussole 4-5 ans)
  │       └── Maintient la CARTE NARRATIVE (arcs, saisons, personnages, mémoire équipe)
  │
  ├──→ ⚠️ ARCHITECTE [narration-architecte · DEPRECATED 2026-05-12]
  │       └── Étape 2 supprimée. Matière intégrée au Conseiller. Agent en standby.
  │
  └──→ DIRECTEUR ÉDITORIAL [narration · Opus]
          ├── Owner étapes 3 (briefs) + 6 (sélection) + 10 (canon)
          ├── Sélectionne la meilleure version parmi les 10 drafts (étape 6)
          ├── Pilote le rewrite (mais writer top 1 garde la main, Directeur en repli) — étape 7
          └── Canonise la version finale (étape 10)

PMO [narration-pmo · Haiku · PROACTIF depuis 2026-05-12]
  ├── Invoqué automatiquement à chaque tour incluant un signal narration
  ├── Garant FOND : INVARIANTS, decisions, backlog, sprint-log, audit-trail
  ├── Binôme avec Archiviste (FORME)
  └── Alerte si blocage / oubli / incohérence documentaire

ARCHIVISTE [narration-archiviste · Haiku · PROACTIF depuis 2026-05-12]
  ├── Maillon central de la STRUCTURE (équivalent PMO côté forme)
  ├── Crée les dossiers stories/<NNN-slug>/ depuis le gabarit unifié
  ├── Vérifie gabarit respecté, préfixes étapes, refs cassées, orphelins
  ├── Mode AUDIT déclenchable via /challenge-archiviste
  └── Communique au PMO via sprint-log si blocage de fond

WRITERS × 14 (parallèles, stateless, refonte v2 2026-05-12 — calibration multi-modèles, "reco" = température créatif officielle)
  ├── Claude × 6                — agent narration-writer-claude-libre
  │     ├── opus-def + opus-reco       (`claude-opus-4-7`, low, défaut/1.0)
  │     ├── sonnet-def + sonnet-reco   (`claude-sonnet-4-6`, low, défaut/1.0)
  │     └── haiku-def + haiku-reco     (`claude-haiku-4-5`, low, défaut/1.0)
  ├── Kimi × 4                  — 2 MCP distincts (cohabitation stricte)
  │     ├── kimi-reco                — `ask_kimi` gratuit (`kimi-for-coding`, temp 0.6 reco Instant)
  │     ├── kimi-k26-instant         — `ask_kimi_payant` (`kimi-k2.6`, thinking: disabled)
  │     ├── kimi-k26-thinking        — `ask_kimi_payant` (`kimi-k2.6`, thinking: enabled = défaut K2.6)
  │     └── kimi-reco-guide          — agent narration-writer-kimi-guide → `ask_kimi` gratuit (GUIDÉ : axes 1-6 + trame story)
  ├── DeepSeek × 2              — MCP ask_deepseek
  │     └── deepseek-def (défaut API=0.3 modèle) + deepseek-reco (1.5 creative)
  └── Grok × 2                  — MCP ask_grok (`reasoning_effort: low`)
        └── grok-def + grok-reco       (défaut/1.2)
  → Chacun livre : 1 version complète (400-700 mots) + 1 note d'intention créative
  → Référence températures : equipe/references/temperatures-llm.md
  → Détail INVARIANTS.md § Casting writers étape 4. Évaluation : ticket ARCHI-008 réduction post 3-5 histoires.

LECTEURS TÉMOINS — Panel 20 (refonte 2026-05-08, décision 2026-05-13 : obligatoire dès STORY-002)
  ├── 10 profils × 2 tranches âge (3-5 ans + 6-7 ans)
  ├── Enfants seuls × 12 + Dyades parent-enfant × 8
  └── Exception : STORY-001 conserve panel 6 lecteurs historique (ne pas refaire)

GATEKEEPER [narration-gatekeeper · Haiku]
  └── Validation technique finale (prénoms, règles, longueur) → PASS ou corrections

VOICE-DIRECTOR / AUDIO [narration-audio · Sonnet] (post-canon)
  ├── Extrait les didascalies FR du texte canon
  ├── Convertit en tags ElevenLabs v3
  ├── Choisit narrateur H ou F selon ton de l'histoire
  └── Produit fichiers audio dans stories/<NNN>/audio/

LOCALISATION [narration-localisation · Sonnet] (post-canon)
  ├── Porte un texte canon FR vers un autre casting national (jp, br, he, sw...)
  ├── Résout les tokens {titi_N_pays} via lookup.yml
  ├── Substitue décors locaux (cross-culture/lieux-locaux/, faune-flore/, saisons-climat/)
  └── Trace dans stories/<NNN>/variantes-culturelles/<pays>/

AGENTS SUPPORT (consultés au besoin)
  ├── narration-science [Haiku]         — validation factuelle (biologie, physique, écologie)
  ├── narration-sensibilite [Sonnet]    — détection topics conspirationnistes / polarisants
  ├── narration-archiviste [Haiku]      — cohérence docs, index, structure
  ├── narration-lecteur [Sonnet]        — enfant 4-6 ans solo simulé
  └── narration-lecteur-dyade [Sonnet]  — parent + enfant simulé (dyade)
```

---

## Chaîne de commandement

```
Auteur
  ├──→ Conseiller   (brainstorm, pitch+plan, carte narrative)
  ├──→ Directeur    (sélection, rewrite, canon)
  ├──→ PMO          (fond : décisions, backlog, sprint-log)
  └──→ Archiviste   (forme : dossiers, gabarit, INDEX)

Conseiller
  ├──→ Auteur       (propose, challenge, affûte)
  └──→ Directeur    (transmet pitch+plan validé via stories/<NNN>/1-pitch-plan.md)

⚠️ Architecte — DEPRECATED 2026-05-12 (étape 2 supprimée, matière intégrée Conseiller)

Directeur
  ├──→ Writers × 4  (brief + angles)
  ├──→ Lecteurs × 4 (les 4 versions à lire)
  ├──→ Writer gagnant (brief de rewrite)
  └──→ GateKeeper   (version finale)

GateKeeper
  └──→ Directeur    (PASS → canonise / corrections → applique)

PMO
  ├──→ Tous agents  (crée dossiers, met à jour index)
  └──→ Auteur       (alerte si besoin)
```

---

## Mémoires — qui met quoi à jour

### Mémoires partagées (tous lisent)

| Fichier | Contenu | Mis à jour par |
|---------|---------|----------------|
| `narration/INDEX.md` | Pointeurs globaux | PMO |
| `narration/stories/INDEX.md` | Catalogue histoires | PMO (après canonisation) |
| `narration/univers/INDEX.md` | Règles du monde | Archiviste (toutes les 5 histoires) |
| `narration/personnages/INDEX.md` | Casting | PMO (si évolution) |
| `narration/personnages/lookup.yml` | Prénoms/genres | PMO (source de vérité) |

### Mémoires propres (1 agent = 1 mémoire)

| Fichier | Agent | Contenu | Fréquence |
|---------|-------|---------|-----------|
| `equipe/memoire-conseiller.md` | Conseiller | Arcs, saisons, feedback lecteurs, patterns validés | Après chaque session |
| `equipe/memoire-dir.md` | Directeur | Décisions de sélection, ce qui a fonctionné | Après chaque histoire |
| `equipe/memoire-architecte.md` | ⚠️ Architecte (deprecated 2026-05-12) | Conservé pour traçabilité — non maintenu | — |
| `equipe/memoire-gatekeeper.md` | GateKeeper | Erreurs récurrentes, patterns à surveiller | Après chaque validation |

### Mémoire projet (PMO)

| Fichier | Contenu |
|---------|---------|
| `pmo/backlog.md` | Tickets en cours, idées en attente |
| `pmo/decisions.md` | Décisions structurantes avec date et raison |
| `pmo/sprint-log.md` | Log chronologique de chaque session |

> **Règle :** Une mémoire jamais mise à jour = un agent qui n'apprend pas. Le PMO vérifie.

---

## Workflow complet

### PHASE 0 — INTAKE (étape 0 PROCESS)

```
Auteur dumpe une idée → INBOX.md (section ## YYYY-MM-DD — sujet)
    ↓
PMO (proactif) scanne INBOX → crée ticket dans backlog si action requise
    ↓
Archiviste (sur demande) crée le dossier stories/<NNN-slug>/ depuis _gabarit/
    (préfixes étapes appliqués automatiquement par duplication du gabarit)
```

### PHASE 1 — PITCH+PLAN (étape 1 PROCESS — refonte 2026-05-12)

```
Conseiller lit pitch+plan inputs (INBOX, INVARIANTS, decisions, personnages, univers, saisons, pmo)
    ↓
Conseiller produit → stories/<NNN-slug>/1-pitch-plan.md
    (depuis equipe/templates/pitch-plan.template.md)
    (inclut : 4 cases pitch + plan léger Kishōtenketsu + boussole 4-5 ans)
    ↓
✅ AUTEUR VALIDE (validation #1 sur 3 obligatoires)
    ↓
PMO log + Archiviste vérifie kanban à jour
```

> **Étape 2 recréée 2026-05-15** (DEC-PROCESS-002) — Brainstorm boss + Brainstorm équipe. Voir PROCESS.md § Étape 2.

### PHASE 1b — BRAINSTORM (étape 2 PROCESS — créée 2026-05-15)

```
Phase A — Brainstorm boss
Papa Yann + Conseiller définissent : lieu / objet / trio / intention
    ↓
✅ AUTEUR VALIDE (4 paramètres)
    ↓
Phase B — Brainstorm équipe
Directeur orchestre Kimi + DeepSeek + Grok + Conseiller (MCP en parallèle)
    system = _writer-system.md · user = pitch + paramètres boss
    ↓
Matière brute briefs → alimente étape 3
```

### PHASE 2 — ÉCRITURE × 10 (parallèle) (étape 4 PROCESS)

> Étape 3 = Briefs produits par le Directeur (3-briefs/ : personnages, histoire). System prompt WexWorld → `_writer-system.md` par arc (Couche 1 pérenne).

```
Directeur injecte à tous les writers (system + user) :
  - Claude libre × 2  (agent narration-writer-claude-libre — system intégré dans .md, reçoit briefs en message)
  - Kimi libre × 3    (MCP ask_kimi — system= _writer-system.md, user= briefs personnages+histoire)
  - Kimi guidé × 1    (agent narration-writer-kimi-guide, annexe AXES 1-6)
  - DeepSeek × 2      (MCP ask_deepseek — system= _writer-system.md, user= briefs personnages+histoire)
  - Grok × 2          (MCP ask_grok — system= _writer-system.md, user= briefs personnages+histoire)

Chaque writer produit :
  → stories/<NNN-slug>/4-versions-writers/<llm>-<id>.md (texte complet 400-700 mots)
  → + note d'intention créative en fin de fichier

Note d'intention attendue (exemple) :
> "J'ai choisi la saison automnale parce que le vent porte les mots sans
> qu'on ait besoin de crier. La couleur orange du personnage n'est pas
> hasardeuse : elle réchauffe la fin sans le dire. J'ai fait référence
> au pont cassé de 001 parce que la réparation comme acte d'amitié est
> un fil que j'aime bien tirer."

PMO log
```

### PHASE 3 — LECTEURS TÉMOINS

```
Directeur envoie les 4 versions aux lecteurs témoins :
  - Enfant seul #1 → reactions-enfant-1.md
  - Enfant seul #2 → reactions-enfant-2.md
  - Dyade #1 → reactions-dyade-1.md
  - Dyade #2 → reactions-dyade-2.md

Chaque lecteur lit les 4 versions et donne un retour texte libre.
Format : "J'ai aimé... / J'ai pas compris... / Je retiens..."

PMO log
```

### PHASE 4 — SÉLECTION

```
Directeur lit les 4 versions + les réactions lecteurs
    ↓
Directeur produit → stories/<NNN-slug>/decision.md
  - Version choisie comme base (et pourquoi)
  - Éléments à récupérer des autres versions
  - Réactions lecteurs à prendre en compte
  - Brief de réécriture

L'auteur valide ou ajuste la décision.
```

### PHASE 5 — RÉÉCRITURE

```
Directeur (ou writer gagnant) produit → stories/<NNN-slug>/rewrite.md
  - Basé sur la version choisie
  - Intègre le brief de réécriture
  - Tient compte des réactions lecteurs

1 cycle de rewrite maximum. Pas de rewrite sur rewrite.
Si le rewrite ne convient pas → retour en Phase 4 (nouvelle décision).

PMO log
```

### PHASE 6 — VALIDATION TECHNIQUE (GateKeeper)

```
Directeur envoie rewrite.md au GateKeeper
    ↓
GateKeeper checklist rapide :
  □ Prénoms corrects (lookup.yml)
  □ Longueur 400-700 mots
  □ Dialogues : 2 répliques min par perso
  □ Pas de morale explicite
  □ Pas d'univers nommé
  □ Surnoms 4/5 du temps
    ↓
Statut : ✅ PASS → Phase 7
         ❌ CORRECTIONS → Directeur applique les corrections rapides → PASS
```

> Le GateKeeper ne réécrit pas. Il pointe des corrections précises.
> Si un problème structurel majeur est découvert → retour au Conseiller (rare).

### PHASE 7 — VERSION FINALE + CLÔTURE

```
Directeur écrit → stories/<NNN-slug>/texte.md
Directeur complète → stories/<NNN-slug>/orchestration.md
    ↓
PMO lance les scripts :
  → scripts/validate-frontmatter.js (README.md)
  → scripts/generate-index.js (_index/ + stories/INDEX.md)
    ↓
Mémoires mises à jour :
  → memoire-conseiller.md (Conseiller)
  → memoire-dir.md (Directeur)
  → memoire-gatekeeper.md (GateKeeper)
  → (memoire-architecte.md : non maintenu, agent deprecated 2026-05-12)
    ↓
PMO ferme ticket → backlog.md + decisions.md + sprint-log.md
    ↓
Archive : session résumée dans archive/YYYY-MM-DD-<titre>.md
```

---

## Les 4 angles narratifs — levier de variance

> ⚠️ **Ce sont 4 ANGLES (levier de variance), pas 4 writers.** La répartition réelle est **10 writers** (2 Claude + 4 Kimi dont 1 guidé + 2 DeepSeek + 2 Grok). Voir [`../pmo/INVARIANTS.md`](../pmo/INVARIANTS.md) § *Casting writers étape 4*.
> Le Directeur Éditorial peut imposer un angle à un writer via `brief-histoire.md` (section *TON ANGLE / TA VARIANCE*).

| Angle | Affinité modèle | Ce qu'il privilégie | Note d'intention |
|-------|-----------------|---------------------|------------------|
| **A — Sobre** | Kimi / DeepSeek | Structure Kishōtenketsu rigoureuse, gestes précis, silence actif | Obligatoire : pourquoi cette structure ? |
| **B — Sensoriel** | Kimi / DeepSeek | Poésie du concret, textures, matières, lumière, odeurs | Obligatoire : quel détail sensoriel porte l'histoire ? |
| **C — Dynamique** | Grok | Dialogues vifs, rythme, échanges rapides, répartie | Obligatoire : pourquoi le dialogue ici ? |
| **D — Instinct** | Claude | Angle libre, surprise, ton auteur | Obligatoire : quelle a été ton intention personnelle ? |

> Chaque version écrite est **complète** (400-700 mots) avec **note d'intention créative** (pas technique). Les 4 angles peuvent être distribués librement sur les 10 writers — ou laissés non assignés (variance native).

---

## Lecteurs Témoins — profils

| Profil | Nombre | Format | Ce qu'il regarde |
|--------|--------|--------|------------------|
| Enfant seul | 2 | Texte libre | Émotion, compréhension, images retenues |
| Dyade parent-enfant | 2 | Voix enfant + voix parent | Réaction enfant + rythme de lecture, vocabulaire |

> Pas de profil "prof de français" ni "philosophe".
> Pas de grille de notation.
> Audio (lecture voix ElevenLabs) : à tester plus tard.

---

## Règles du comité de lecture

### Quand est-ce OBLIGATOIRE ?

| Situation | Lecteurs témoins obligatoires ? |
|-----------|--------------------------------|
| Première histoire d'une série | ✅ Oui |
| Nouveau personnage principal | ✅ Oui |
| Sujet sensible (complotisme, polarisation, anxiété, exclusion) | ✅ Oui |
| Histoire N° multiple de 5 (005, 010...) | ✅ Oui (audit global) |
| Suite dans une série connue | ❌ Non (optionnel) |
| Mêmes personnages, sujet léger | ❌ Non (optionnel) |

> À terme, on vise des lecteurs témoins **systématiques** sur toutes les histoires.

---

## Scripts et outils

| Script | Quand le lancer | Que fait-il |
|--------|----------------|-------------|
| `narration/scripts/new-story.js NNN <titre>` | Phase 0 | Crée le dossier `stories/NNN-slug/` depuis le gabarit unifié `stories/_gabarit/` |
| `narration/scripts/validate-frontmatter.js [README.md]` | Phase 7 | Vérifie le YAML du README |
| `narration/scripts/generate-index.js` | Phase 7 | Régénère `_index/` + `stories/INDEX.md` |
| `narration/scripts/archive-story.js <workshop-name>` | Phase 7 | Promouvoir workshop → stories/ + archive |
| `narration/scripts/pre-gatekeeper.js <rewrite.md>` | Phase 6 (optionnel) | Vérification auto avant GateKeeper (longueur, dialogues) |

---

## Glossaire

| Terme | Définition |
|-------|------------|
| **Plan d'Histoire** | Le squelette avant écriture : 4 temps, persos, lieu, contraintes |
| **Version finale** | Le texte validé, prêt à être canonisé (on ne dit plus "canon") |
| **GateKeeper** | Validation technique finale (checklist), pas un relecteur créatif |
| **Note d'intention** | Ce que le writer a voulu faire, pourquoi il a fait ces choix créatifs |
| **Dyade** | Lecture à voix haute parent-enfant |

---

## Cérémonies

| Cérémonie | Qui | Quand | Data pull du Conseiller |
|-----------|-----|-------|------------------------|
| **Atelier Univers** | Toi + Conseiller | Régulier (pas lié à une histoire) | Univers, personnages, histoires précédentes, feedback lecteurs |
| **Brainstorm Pitch+Plan** | Toi + Conseiller | Quand tu as une idée brute | INBOX.md, mémoire-conseiller.md, casting, boussole 4-5 ans |
| **Sélection** | Toi + Directeur | Après les 20 lecteurs témoins | 10 versions + 20 réactions + synthese-lecteurs.md |
| **Review Finale** | Toi seul | Après GateKeeper PASS + re-relecture PASS | 7-rewrite/<llm>-rewrite-v1.md |
| **Rétro** | Conseiller seul | Après canonisation | Tout le dossier stories/<NNN>/ |

## Kanban

- **Global** : `pmo/KANBAN.md` — toutes les histoires + sujets univers. Mis à jour par le PMO.
- **Par histoire** : `stories/<NNN-slug>/kanban.md` — étapes détaillées + boucles. Mis à jour par le responsable de l'étape.

## État actuel

- [x] Conseiller narratif réécrit (vrai binôme, produit `1-pitch-plan.md` depuis 2026-05-12 — intègre matière Architecte)
- [x] ~~Architecte créé~~ ⚠️ **DEPRECATED 2026-05-12** (étape 2 supprimée, matière intégrée Conseiller)
- [x] GateKeeper créé
- [x] Directeur réécrit (briefs + sélection + canon — owner étapes 3/6/7-repli/10)
- [x] Lecteurs témoins réécrits (texte libre, panel 20 OBLIGATOIRE dès STORY-002 — décision 2026-05-13)
- [x] PMO refondu proactif (2026-05-12) — invoqué auto à chaque tour narration
- [x] Archiviste élevé maillon central proactif (2026-05-12) — binôme PMO côté forme
- [x] Workflow 8 writers → 4 writers
- [x] Terminologie mise à jour (Plan d'Histoire, Version finale, GateKeeper)
- [x] Kanban global + kanban par histoire créés
- [x] PROCESS.md avec DoD, responsables, cérémonies
- [ ] Tester le workflow sur l'histoire 004
- [x] Créer le gabarit unifié `stories/_gabarit/` (workshop/ supprimé 2026-04-30)
