# Organigramme — Équipe Éditoriale MaxPlay

> **Référence : QUI fait quoi (agents + chaîne de commandement + mémoires).**
> Le **déroulé étape par étape** (inputs/outputs/PASS) vit dans [`PROCESS.md`](PROCESS.md) — source unique du workflow.
> Les **chiffres clés** (nombre d'étapes, de writers, de lecteurs) vivent dans [`../pmo/INVARIANTS.md`](../pmo/INVARIANTS.md) — source unique. Ce fichier ne les répète pas (anti-désync).
>
> Dernière mise à jour : 2026-06-14 (dégraissage : suppression des sections PHASE 0-7 / 4 angles / glossaire / état — qui dupliquaient PROCESS.md avec des chiffres périmés).

---

## Vue d'ensemble des agents

```
AUTEUR (Papa Yann)
  │
  ├──→ CONSEILLER NARRATIF [narration-conseiller · Opus]
  │       ├── Binôme créatif : challenge, brainstorm, raffine
  │       ├── Produit `1-pitch-plan.md` (étape 1)
  │       ├── Co-pilote le Brainstorm boss (étape 2A) + synthétise le Brainstorm équipe (2B)
  │       └── Intègre la matière statique de l'ex-Architecte (Kishōtenketsu + boussole 4-5 ans)
  │
  └──→ DIRECTEUR ÉDITORIAL [narration · Opus]
          ├── Owner étapes 3 (briefs) · 6 (sélection) · 10 (canon)
          ├── Orchestre le Brainstorm équipe (2B), les writers (4), les lecteurs (5, 9)
          ├── Pilote le rewrite (writer top 1 garde la main, Directeur en repli) — étape 7
          └── Tranche la sélection et canonise

PMO [narration-pmo · Sonnet · PROACTIF]
  ├── Invoqué automatiquement à chaque tour incluant un signal narration
  ├── Garant FOND : INVARIANTS, decisions, backlog, sprint-log, audit-trail
  ├── Relit les briefs writers (étape 3→4) : négations gratuites
  └── Binôme avec Archiviste (FORME)

ARCHIVISTE [narration-pmo (unifié 2026-07-19) · Sonnet · PROACTIF]
  ├── Garant STRUCTURE : crée les dossiers stories/ depuis le gabarit, vérifie préfixes/refs/orphelins
  ├── Mode AUDIT via /narration-pmo-audit
  └── Communique au PMO via sprint-log

WRITERS (parallèles, stateless — casting + chiffre dans INVARIANTS.md § Casting writers étape 4)
  ├── Claude    — agent narration-writer-claude-libre (1 invocation / couple modèle+température)
  ├── Kimi      — MCP ask_kimi (gratuit) + ask_kimi_payant (K2.6) + agent narration-writer-kimi-guide (guidé)
  ├── DeepSeek  — MCP ask_deepseek
  └── Grok      — MCP ask_grok
  → Chacun livre : 1 version (400-700 mots) + note d'intention en fin de fichier.
  → Tous reçoivent system = `_writer-system.md` (figé par arc) + user = briefs personnages/histoire.

LECTEURS TÉMOINS — Panel 20 (10 profils × 2 tranches d'âge 3-5 / 6-7)
  ├── narration-lecteur — mode ENFANT (seul) + mode DYADE (parent-enfant), fusionné 2026-09-03
  ├── Profils + codes + slugs writers : `profils-lecteurs.md`
  └── Exception : STORY-001 conserve son panel 6 historique (ne pas refaire)

GATEKEEPER [narration-gatekeeper · Haiku]
  └── Validation technique binaire (prénoms, règles, longueur) → PASS ou corrections

AUDIO [narration-audio · Sonnet] (post-canon)
  ├── Canon → adaptation orale (délègue à narration-audio-writer si dense) + pose tags v3
  ├── Produit segments JSON [{role, text}] < 2000 char
  └── Lance MCP studio_audiobook_from_segments_v2_dialogue → MP3 multi-voix (méthode figée)

LOCALISATION [narration-localisation · Sonnet] (post-canon)
  └── Porte un canon FR vers un casting national (jp/br/he/sw…) via lookup.yml + cross-culture/

AGENTS SUPPORT (consultés au besoin)
  └── narration-audio-writer [Sonnet] — réécriture orale anti-molesse (délégué par narration-audio)
```

> ⚠️ **narration-science et narration-sensibilite ARCHIVÉS** (2026-09-03, HO-G12 — 0 usage tracé dans les mémoires du pôle). Récupérables verbatim dans `_archive/agents-2026-09-03/`. Si un besoin de fact-check scientifique ou de détection de sensibilité éditoriale se représente, ré-instancier depuis l'archive plutôt que réinventer.

> ⚠️ **Architecte SUPPRIMÉ** (deprecated 2026-05-12 — l'étape 2 d'origine a été fusionnée puis remplacée par le Brainstorm). Ne pas l'invoquer. Sa matière statique vit chez le Conseiller. `equipe/_archive/memoire-architecte.md` archivé.

---

## Chaîne de commandement

```
Auteur
  ├──→ Conseiller   (brainstorm, pitch+plan, carte narrative)
  ├──→ Directeur    (briefs, sélection, rewrite, canon)
  ├──→ PMO          (fond : décisions, backlog, sprint-log)
  └──→ Archiviste   (forme : dossiers, gabarit, INDEX)

Conseiller ──→ Auteur (propose, challenge) · ──→ Directeur (transmet 1-pitch-plan.md validé)

Directeur
  ├──→ Writers           (system _writer-system.md + briefs)
  ├──→ Lecteurs × 20     (les versions à lire)
  ├──→ Writer top 1      (brief de rewrite)
  ├──→ GateKeeper        (rewrite à valider)
  └──→ Audio             (canon à produire en MP3)

GateKeeper ──→ Directeur (PASS → canonise / corrections → applique)
PMO        ──→ Tous agents (crée dossiers, met à jour index) · ──→ Auteur (alerte)
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

### Mémoires propres (1 agent = 1 mémoire officielle `memory: project`, depuis 2026-09-03)

| Fichier | Agent | Contenu | Fréquence |
|---------|-------|---------|-----------|
| `.claude/agent-memory/narration-conseiller/MEMORY.md` (+ `TOPIC-historique.md`) | Conseiller | Arcs, saisons, feedback lecteurs, patterns | Après chaque session |
| `.claude/agent-memory/narration/MEMORY.md` | Directeur | Décisions de sélection, ce qui a fonctionné | Après chaque histoire |
| `.claude/agent-memory/narration-gatekeeper/MEMORY.md` | GateKeeper | Erreurs récurrentes, patterns à surveiller | Après chaque validation |

### Mémoire projet (PMO)

| Fichier | Contenu |
|---------|---------|
| `pmo/INVARIANTS.md` | Chiffres clés + casting + voice_ids + règles d'or (source unique) |
| `pmo/backlog.md` | Tickets actifs (max 3) |
| `pmo/decisions.md` | Décisions structurantes (date + raison) |
| `pmo/sprint-log.md` | Log chronologique de chaque session |

> **Règle :** une mémoire jamais mise à jour = un agent qui n'apprend pas. Le PMO vérifie.

---

## Scripts

| Script | Quand | Rôle |
|--------|-------|------|
| `scripts/new-story.js NNN <titre>` | Phase 0 | Crée `stories/NNN-slug/` depuis le gabarit `stories/_gabarit/` |
| `scripts/validate-frontmatter.js [README.md]` | Étape 10 | Vérifie le YAML du README |
| `scripts/generate-index.js` | Étape 10 | Régénère `stories/INDEX.md` |
| `scripts/pre-gatekeeper.js <rewrite.md>` | Étape 8 (optionnel) | Pré-check longueur/dialogues avant GateKeeper |
| `scripts/generate-story-dialogue.js` | Audio (debug) | Fallback CLI de la production audio — la voie par défaut est le MCP |

---

## Cérémonies

| Cérémonie | Qui | Quand |
|-----------|-----|-------|
| **Atelier Univers** | Auteur + Conseiller | Régulier (hors histoire) |
| **Brainstorm Pitch+Plan** | Auteur + Conseiller | Quand l'auteur a une idée brute |
| **Sélection** | Auteur + Directeur | Après les 12 calls lecteurs témoins |
| **Review Finale** | Auteur seul | Après GateKeeper PASS + re-relecture PASS |
| **Rétro** | Conseiller seul | Après canonisation |
