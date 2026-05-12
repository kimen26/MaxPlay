# Audit Trail — Pôle Narration

> Trace des audits PMO + analyses cause racine. À lire pour comprendre **pourquoi** on a accumulé de la dette de coordination.

---

## 2026-05-12 — Audit complet post-session Voice Design

### Findings traités

| # | Action | Statut | Fichier(s) |
|---|--------|--------|------------|
| 1 | MAJ `stories/INDEX.md` (ajout STORY-002) | ✅ | `stories/INDEX.md` |
| 2 | MAJ `pmo/INDEX.md` (canon=1, prochaine=trancher Q-002, ajout statut voix) | ✅ | `pmo/INDEX.md` |
| 3 | Suppression fichier fantôme `infra/mcp/nul` | ✅ | — |
| 4 | Correction PROCESS.md §Étape 6 (10 versions / 20 lecteurs) | ✅ | `equipe/PROCESS.md` |
| 5 | Nettoyage PROCESS.md §Liens rapides (retrait "à créer" obsolètes) | ✅ | `equipe/PROCESS.md` |
| 6 | Alignement kanban 002 (étape 7 owner=Writer top 1, étape 9 panel 6 transitoire, validation auteur 3e=étape 10) | ✅ | `stories/002-libellule-resonance/kanban.md` |
| 7 | MAJ skill `elevenlabs-voice-design/SKILL.md` (AP#15/16/17 + méthodo v24) | ✅ | `~/.claude/skills/elevenlabs-voice-design/SKILL.md` |
| 8 | MAJ `narration/INDEX.md` (ligne voix-meta complète + AP#17 + skills audio MAJ 2026-05-12) | ✅ | `narration/INDEX.md` |

### Reste à faire (validation auteur requise)

- 🔴 **Q-ouverte STORY-002** : Wex+Polo confirmé ? mare/étang ? libellule objet central ? geste Nono ? — bloque l'étape 4
- ⚪ Doublon méthodo voix v24 (volontairement conservé : `_VOICE-IDS-CASTING.md` = opérationnel, `_SESSION-2026-05-11-RETOUR-EXP.md` = historique). Décision : OK tel quel.
- ⚪ Scission éventuelle `pmo/decisions.md` (38k tokens) — pas urgent

---

## Analyse cause racine : pourquoi tant de désynchros ?

**Question Papa Yann** : « pkoi tout ca n'a pas été fait, ou laissé obsolète etc. y manque quelque chose ou kk'un kkpart nan ? »

### Symptôme observé
Au moment de l'audit (2026-05-12), 8 désynchros structurelles trouvées en parallèle :
- `stories/INDEX.md` mentionnait pas 002
- `pmo/INDEX.md` comptait 2 canon (au lieu de 1)
- `PROCESS.md` mentionnait encore "6 lecteurs / 8 versions" alors que décision = 20 / 10
- Skill `elevenlabs-voice-design` n'avait pas absorbé AP#15/16/17 créés le même jour
- Kanban 002 désaligné avec PROCESS (owner étape 7, numéro 3e validation auteur)
- Fichier fantôme `infra/mcp/nul`
- Mentions "à créer" dans PROCESS pour fichiers qui existent
- 4 fichiers voix-meta absents de l'INDEX racine

### Cause racine (hypothèse PMO)

**Il manque un agent / un hook qui maintient les INDEX et les méta-fichiers à jour quand on travaille sur un sous-domaine.**

Quand on a créé STORY-002 le 2026-05-11, on a :
- ✅ Créé le dossier et tous les fichiers de fabrication
- ✅ Mis à jour `pmo/decisions.md`
- ❌ **Pas mis à jour** `stories/INDEX.md` (parce qu'on était focus sur le contenu)
- ❌ **Pas mis à jour** `pmo/INDEX.md` (idem)
- ❌ **Pas mis à jour** `narration/INDEX.md`

Quand on a créé les voice_id et le retour d'expérience le 2026-05-11/12 :
- ✅ Créé les fichiers dans voix-meta/
- ✅ Mis à jour `voix-meta/README.md`
- ❌ **Pas propagé** vers le skill `elevenlabs-voice-design` (zone "globale userSettings", oubliée)
- ❌ **Pas propagé** vers `narration/INDEX.md` (juste un texte de 2 lignes à mettre à jour)

Quand on a fait la refonte PROCESS le 2026-05-08 :
- ✅ Réécrit PROCESS.md
- ❌ **Pas propagé** les nouveaux chiffres "10 / 20" dans toutes les sections du PROCESS (étape 6 restée à 6 lecteurs)
- ❌ **Pas mis à jour** le kanban-template avec les nouveaux owners

### Pattern qui se répète

**Travail sur un sous-domaine → INDEX et fichiers transverses oubliés.**

C'est un pattern classique en gestion de projet : la **dette de coordination** s'accumule quand un agent (humain ou IA) :
1. A un focus précis (créer une voix, écrire une histoire, refondre un process)
2. Termine son livrable
3. Passe au suivant **sans propager les changements vers les INDEX/méta**

### Ce qui manque

**1 hook + 1 règle**.

#### Hook proposé
`PostToolUse` sur Write/Edit dans `narration/**/*.md` ou `~/.claude/skills/**/*.md` :
- Détecte le **type de changement** (nouveau dossier histoire ? nouveau skill ? nouvelle décision ?)
- **Bloque la fin de session** tant que les INDEX correspondants ne sont pas mis à jour
- OU émet un **rappel automatique** "INDEX impacté : X, Y, Z — penser à propager"

#### Règle proposée
Avant chaque `/strategic-compact` ou fin de session, le hook `Stop` (déjà partiellement présent) :
- Vérifie que `git status` ne contient pas de "fichier orphelin" (nouveau fichier non référencé dans un INDEX)
- Vérifie la cohérence chiffres clés : "10 versions" / "20 lecteurs" / casting voix actuel
- Liste les fichiers qui ont été **modifiés sans que leur INDEX parent ait été touché dans la même session**

#### Sous-agent PMO en mode "garde-fou"

L'agent `narration-pmo` existe (Haiku, scope strict). Mais il est **passif** (on l'appelle pour des tâches précises). Il devrait être **proactif** :
- Hook `SessionStart` sur narration/ → lit `audit-trail.md`, signale les findings ouverts
- Hook `Stop` sur narration/ → fait un mini-audit (INDEX cohérents ? voice_ids cohérents ? chiffres cohérents ?)

### Décision (auteur à confirmer)

**Option A — Hook automatique + règle dure**
Mettre en place le hook `PostToolUse` pour rappel + le hook `Stop` pour mini-audit.
Coût : 30 min config. Bénéfice : zéro dette de coordination future.

**Option B — Sous-agent PMO proactif**
Modifier `narration-pmo.md` pour qu'il soit invoqué automatiquement à chaque tour incluant un signal narration (comme `game-pmo` côté JEU).
Coût : 10 min modif agent + hook session. Bénéfice : audit continu, pas besoin de demander.

**Option C — Cadence d'audit**
Garder le système actuel mais imposer un audit PMO toutes les 5 sessions de travail.
Coût : 0. Bénéfice : audit régulier mais dette s'accumule entre 2 audits.

**Reco PMO** : Option B (sous-agent proactif), avec règle "à chaque tour incluant narration → narration-pmo invoqué pour mini-check + propagation". Cohérent avec ce qui existe déjà côté JEU (`game-pmo` invoqué à chaque tour).

### ✅ Décision tranchée 2026-05-12 — Option B appliquée

- ✅ `narration-pmo.md` refondu : description + paragraphe d'ancrage proactif + signaux déclencheurs
- ✅ `INVARIANTS.md` et `audit-trail.md` ajoutés en Première action OBLIGATOIRE
- ✅ Checklist remise main enrichie (propagation INVARIANTS + 6 INDEX vérifiés + fichiers orphelins)
- ✅ Mode AUDIT formalisé (5 sections, déclenché sur demande "audit/fais le tour/range la chambre")
- ✅ Table fichiers PMO enrichie d'une colonne "Tu le lis quand"
- ✅ `CLAUDE.md` racine : section "⚙️ PMO Narration proactif" ajoutée au pôle NARRATION

Mécanique en place pour éviter la dette de coordination identifiée plus haut.

---

## Apprentissages structurels

1. **Le travail sur un sous-domaine génère naturellement de la dette transverse**. Ce n'est pas une faute, c'est la nature du focus créatif.
2. **L'INDEX n'est pas une corvée** : c'est le **point de découverte unique** pour qui reprend après reboot. Un INDEX désynchronisé = un agent qui reprend rate l'histoire active.
3. **Un skill global (userSettings) est plus difficile à maintenir** qu'un skill projet (projectSettings) car il est "loin" du focus session. Mécanisme dédié nécessaire pour le tenir à jour.
4. **Les chiffres clés (10 versions / 20 lecteurs / N voix)** doivent vivre **dans un fichier source de vérité unique** référencé par tous les autres. Sinon dérive garantie.

→ Action consolidée : créer `narration/pmo/INVARIANTS.md` avec les chiffres clés + sources de vérité, et faire pointer le reste vers lui.

---

## 2026-05-12 (soir) — Audit pmo-challenge complet + fixes liens cassés

### Méthodologie
Skill `pmo-challenge` (6 étapes) appliqué. Délégation Explore pour cartographie + liens cassés. Simulation 5 scénarios par main agent.

### Findings (8 liens cassés trouvés)

| # | Fichier | Référence cassée | Niveau |
|---|---------|------------------|--------|
| 1 | `.claude/agents/narration-writer-claude-libre.md` L.11 | `workshop/<titre>/` | 🔴 CRITIQUE |
| 2 | `.claude/agents/narration-writer-claude-libre.md` L.17 | `workshop/<titre>/version-[x].md` | 🔴 CRITIQUE |
| 3 | `.claude/agents/narration-writer-claude-libre.md` L.58 | `Jérem` (prénom hors casting V1) | 🟡 HAUTE |
| 4 | `.claude/agents/narration.md` L.16 | `patte-john.md` (n'existe pas) | 🔴 CRITIQUE |
| 5 | `.claude/agents/narration.md` L.38/72 | `workshop/<titre>/decision.md` + `rewrite.md` | 🔴 CRITIQUE |
| 6 | `.claude/agents/narration-lecteur.md` L.47 | `workshop/<titre>/reactions-enfant-[N].md` | 🔴 CRITIQUE |
| 7 | `.claude/agents/narration-lecteur-dyade.md` L.61 | `workshop/<titre>/reactions-dyade-[N].md` | 🔴 CRITIQUE |
| 8 | `narration/equipe/patte-narrative-maxplay.md` L.141 | "9 étapes" → 11 | 🟡 HAUTE |
| 9 | `narration/equipe/patte-narrative-maxplay.md` L.143 | `exemples-canoniques.md` (jamais créé) | 🟡 HAUTE |
| 10 | `narration/equipe/patte-narrative-maxplay.md` L.146 | `../arcs/` (dossier n'existe pas) | 🟡 HAUTE |

### Fixes appliqués

| # | Action | Statut |
|---|--------|--------|
| 1 | `narration-writer-claude-libre.md` — chemins workshop/ → stories/<NNN>/briefs/ + versions-writers/<angle>.md | ✅ |
| 2 | `narration-writer-claude-libre.md` — `Jérem` → `Madie` (casting V1 figé) | ✅ |
| 3 | `narration.md` — réécriture intégrale alignée PROCESS 11 étapes + suppression refs workshop/ + correction `patte-john.md` → `patte-papa-yann.md` + clarification owners étapes 3/6/7/10 + règle 2026-05-08 (writer top 1 garde main rewrite) | ✅ |
| 4 | `narration-lecteur.md` — chemin workshop/ → stories/<NNN>/lecteurs-temoins/enfant-[N].md + mention panel 10/20 versions + lien profils-lecteurs.md | ✅ |
| 5 | `narration-lecteur-dyade.md` — idem dyade-[N].md + panel 10/20 + profils-lecteurs.md | ✅ |
| 6 | `patte-narrative-maxplay.md` — "9 étapes" → "11 étapes (refonte 2026-05-08)" + suppression refs cassées (`exemples-canoniques.md`, `../arcs/`) + ajout `lecons-vivantes.md` + lien `saisons/saison-1/` | ✅ |

### Reste à faire (validation auteur)

- 🔴 **Q-ouvertes STORY-002** : Wex+Polo confirmé ? mare/étang ? libellule centre ? geste Nono ? — SLA dépassé
- 🟢 Stratégie filles voix (dérive `little guy` vs `little girl`) — pas urgent

### Apprentissages méta

1. **Les agents `.claude/agents/*.md` sont des angles morts du PMO**. Quand la refonte 2026-04-30 (`workshop/` → `stories/`) a été faite, les INDEX + PROCESS ont été mis à jour, mais **les agents qui référencent ces chemins n'ont pas été audités**. → **Nouvelle règle PMO** : après toute refonte structurelle, scanner `.claude/agents/narration-*.md` pour références obsolètes (voir checklist remise main agent narration-pmo).
2. **Refonte agent = opportunité d'alignement total**. `narration.md` réécrit intégralement = bénéficie de 6 mois d'apprentissages (writer top 1 garde rewrite, 10 versions, 20 lecteurs, INVARIANTS, lecons-vivantes, templates, kanban). Pattern à reproduire : refonte agent quand >30% obsolète.
3. **Validation cross-référence post-fix obligatoire**. Quand je corrige une référence cassée, je dois vérifier que la nouvelle cible existe (j'ai trouvé 2 cassés de plus en cours de fix dans `patte-narrative-maxplay.md`).

---

## Prochain audit

Recommandé après :
- Validation Q-ouvertes STORY-002 + lancement étape 4 (test E2E grandeur nature des agents writer/lecteur refaits)
- Création voix filles (Mimi/Madie/Juju)
- Toute refonte d'INDEX ou PROCESS majeure
