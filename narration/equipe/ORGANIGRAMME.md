# Organigramme — Équipe Éditoriale MaxPlay

> **Ce fichier est la référence technique complète.**
> **Pour le déroulé humain étape par étape, voir `PROCESS.md`.**
> Référence permanente. Mis à jour si l'équipe évolue.
> Dernière mise à jour : 2026-04-29

---

## Vue d'ensemble

```
AUTEUR (toi)
  │
  ├──→ CONSEILLER NARRATIF [narration-conseiller · Opus]
  │       ├── Binôme créatif : challenge, brainstorm, raffine
  │       ├── Génère les pitches
  │       └── Maintient la CARTE NARRATIVE (arcs, saisons, personnages, mémoire équipe)
  │
  ├──→ ARCHITECTE [narration-architecte · Sonnet]
  │       └── Transforme le pitch validé en Plan d'Histoire
  │
  └──→ DIRECTEUR ÉDITORIAL [narration · Opus]
          ├── Sélectionne la meilleure version parmi les 4 drafts
          ├── Pilote le rewrite (brief + corrections)
          └── Valide la version finale avant GateKeeper

PMO [narration-pmo · Haiku · AUTONOME]
  ├── Crée les dossiers stories/<NNN-slug>/ depuis le gabarit unifié
  ├── Tient le backlog, les sprint-logs, les decisions
  ├── Génère les index et met à jour les mémoires partagées
  └── Alerte si blocage / oubli / incohérence documentaire

WRITERS × 4 (parallèles, stateless, angles assignés)
  ├── Writer A (Sobre)          — Kishōtenketsu rigoureux, gestes, narration sobre
  ├── Writer B (Sensoriel)      — Textures, matières, poésie du concret
  ├── Writer C (Dynamique)      — Dialogues vifs, rythme, échanges rapides
  └── Writer D (Instinct/Libre) — Angle libre, surprise, ton auteur
  → Chacun livre : 1 version complète (400-700 mots) + 1 note d'intention créative

LECTEURS TÉMOINS (simulés, texte libre)
  ├── Enfant seul × 2           — réaction émotionnelle pure
  └── Dyade parent-enfant × 2   — réaction enfant + observations parent

GATEKEEPER [narration-gatekeeper · Haiku]
  └── Validation technique finale (prénoms, règles, longueur) → PASS ou corrections
```

---

## Chaîne de commandement

```
Auteur
  ├──→ Conseiller   (brainstorm, pitch, carte narrative)
  ├──→ Directeur    (sélection, rewrite, validation)
  └──→ PMO          (organisation, documents, index)

Conseiller
  ├──→ Auteur       (propose, challenge, affûte)
  ├──→ Architecte   (valide le pitch avant plan)
  └──→ Directeur    (transmet la mémoire et les contraintes)

Architecte
  └──→ Workshop     (produit le Plan d'Histoire)

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
| `equipe/memoire-architecte.md` | Architecte | Plans qui ont bien/mal fonctionné | Après chaque histoire |
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

### PHASE 0 — INTAKE

```
Auteur dumpe une idée → INBOX.md (section ## YYYY-MM-DD — sujet)
    ↓
Conseiller lit + discute avec l'auteur
    ↓
Binôme valide un pitch → stories/<NNN-slug>/pitch.md
    ↓
PMO crée le dossier stories/<NNN-slug>/ + log dans sprint-log.md
```

### PHASE 1 — PLAN D'HISTOIRE

```
Architecte lit le pitch + mémoires + histoires précédentes
    ↓
Architecte produit → stories/<NNN-slug>/plan-histoire.md
    (inclut : personnages, structure Kishōtenketsu, contraintes)
    ↓
Conseiller valide la cohérence avec la carte narrative
    ↓
PMO log
```

### PHASE 2 — ÉCRITURE × 4 (parallèle)

```
Directeur injecte à 4 writers simultanément :
  - plan-histoire.md (inclut personnages, structure, contraintes)
  - brief-univers.md (copie standard)
  - Angle assigné + consigne spécifique

Chaque writer produit :
  → stories/<NNN-slug>/version-{a,b,c,d}.md (texte complet 400-700 mots)
  → + note d'intention créative dans le fichier

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
  → memoire-architecte.md (Architecte)
  → memoire-gatekeeper.md (GateKeeper)
    ↓
PMO ferme ticket → backlog.md + decisions.md + sprint-log.md
    ↓
Archive : session résumée dans archive/YYYY-MM-DD-<titre>.md
```

---

## Les 4 Writers — angles assignés

| Writer | Source | Angle | Ce qu'il privilégie | Note d'intention |
|--------|--------|-------|---------------------|------------------|
| **A — Sobre** | Kimi / DeepSeek | Structure Kishōtenketsu rigoureuse | Gestes précis, narration sobre, silence actif | Obligatoire : pourquoi cette structure ? |
| **B — Sensoriel** | Kimi / DeepSeek | Poésie du concret | Textures, matières, lumière, odeurs | Obligatoire : quel détail sensoriel porte l'histoire ? |
| **C — Dynamique** | Grok | Dialogues vifs, rythme | Échanges rapides, répartie, silences comiques | Obligatoire : pourquoi le dialogue ici ? |
| **D — Instinct** | Claude (Sonnet) | Angle libre, surprise | Ton auteur, ce qui est vrai pour cette histoire | Obligatoire : quelle a été ton intention personnelle ? |

> Chaque writer écrit **une version complète** (400-700 mots). Pas d'extrait.
> Chaque writer ajoute une **note d'intention créative** (pas technique).

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
| **Brainstorm Pitch** | Toi + Conseiller | Quand tu as une idée brute | INBOX.md, mémoire-conseiller.md, casting |
| **Revue de Plan** | Conseiller + Architecte | Après l'Architecte | personnages/INDEX.md, univers/INDEX.md, histoires précédentes |
| **Sélection** | Toi + Directeur | Après les lecteurs témoins | 4 versions + réactions |
| **Review Finale** | Toi seul | Après GateKeeper PASS | rewrite.md |
| **Rétro** | Conseiller seul | Après canonisation | Tout le dossier workshop |

## Kanban

- **Global** : `pmo/KANBAN.md` — toutes les histoires + sujets univers. Mis à jour par le PMO.
- **Par histoire** : `stories/<NNN-slug>/kanban.md` — étapes détaillées + boucles. Mis à jour par le responsable de l'étape.

## État actuel

- [x] Conseiller narratif réécrit (vrai binôme, questions ouvertes, construction d'univers)
- [x] Architecte créé
- [x] GateKeeper créé
- [x] Directeur réécrit (sélection + rewrite)
- [x] Lecteurs témoins réécrits (texte libre, 4 versions)
- [x] Workflow 8 writers → 4 writers
- [x] Terminologie mise à jour (Plan d'Histoire, Version finale, GateKeeper)
- [x] Kanban global + kanban par histoire créés
- [x] PROCESS.md avec DoD, responsables, cérémonies
- [ ] Tester le workflow sur l'histoire 004
- [x] Créer le gabarit unifié `stories/_gabarit/` (workshop/ supprimé 2026-04-30)
