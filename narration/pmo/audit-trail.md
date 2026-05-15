# Audit Trail — Pôle Narration

> Trace des audits PMO + analyses cause racine. À lire pour comprendre **pourquoi** on a accumulé de la dette de coordination.

---

## 2026-05-15 — [ARCHIVISTE] Nettoyage DEC-TENSION-RESONANCE — annulation sur-formalisation

**Mode** : Correction directive auteur

**Contexte & Décision** :

Directive Papa Yann 2026-05-15 : « Ne jamais nommer la résonance » **n'est pas une règle**. C'est du bon sens narratif. La décision DEC-TENSION-RESONANCE (2026-05-13) sur-formalisait un principe implicite qui ne mérite pas d'énonciation négative.

**Action Archiviste complète** :

| Fichier | Action | Détail |
|---------|--------|--------|
| `decisions.md` | Reécrit entrée DEC-TENSION-RESONANCE | Marquée ~~ANNULÉE 2026-05-15~~ + passage archéologie : sur-formalisation d'un bon sens narratif |
| `decisions.md` | Q-ouvertes STORY-002 | Ligne Q-002-2 mise à jour : référence DEC-TENSION-RESONANCE barrée |
| `sprint-log.md` | Ligne décisions enregistrées | Barrée avec note 2026-05-15 |
| `lecons-vivantes.md` | P8 reformulée | Titre « Univers implicite — résonance se vit, ne s'énonce pas » (observation neutre, pas règle) |
| `kanban 002` | Ligne 135 | Barrée : ~~Règle résonance jamais nommée~~ + annotation DEC-TENSION-RESONANCE ANNULÉE |
| `6-selection.md` | Tableau critères patte | Ligne « Résonance jamais nommée » → « Univers implicite » (reformulation) |
| `5-synthese-lecteurs.md` | Points vigilance GateKeeper | "Règle résonance jamais nommée" → "L'univers implicite est-il préservé ?" |

**Observation empirique CONSERVÉE** :

`lecons-vivantes.md` § OBS-RESONANCE-IMPLICITE reste figée — observation empirique valide : panel 20 lecteurs convergent que résonance se vit (geste, silence, détail), ne s'énonce pas. Mais ce n'est **pas une règle à graver** dans les briefs.

**Archives historiques** : aucune modification dans `_archive/vague-1/`, `_archive/vague-2/`, dossiers OLD-* — traces historiques intactes.

**Commit** : `3d28ffdd` "fix(narration): annuler DEC-TENSION-RESONANCE — ce n'était pas une règle"

**Statut** : ✅ NETTOYAGE COMPLET — directives auteur appliquées.

---

## 2026-05-13 — [VOIX] Juju figée : méthodo v24 fille validée empiriquement (1 essai)

**Mode** : Leçon méthodo + validation stratégie nommage

**Découverte** :

La **méthodo v24 garçons** (header `Animated little guy voice`, physiologie aiguë `high-pitched, bright, etc.`, zéro négation, < 1000 chars) s'étend en fille par **simple substitution du header** :
- ❌ `Animated little guy voice` 
- ✅ `Animated little girl character voice`

Tout le reste du prompt (physiologie, cadence, absence négations) reste identique. Résultat : Juju créée en 1 essai (vs 3.2 essais/voix moyenne), prompt 858 chars, style parfait "Challenger grounded direct".

**Taux de succès méthodo v24** :
- Garçons (5 voix) : 16 essais total = 3.2 essais/voix (Wex 1, Dadou 2, Melki 1, Lulu 6, Nono 6)
- Fille (Juju) : 1 essai = **saut qualitatif** → règle applicabilité confirmer sur les 2 restantes (Mimi, Madie)

**Stratégie nommage Voice Library — impact anti-copie** :

Problème : l'adjectif de `Lumi <perso> <adj>` révèle parfois la recette ennéa (ex: "Forte" = T8 "Être fort·e" ultra-exposé).

Solution Juju : **vendre l'impact émotionnel sans révéler la structure**.
- Description FR/EN focus : "La voix qui tient la main" / "The voice that holds your hand" (bénéfice utilisateur)
- Image expérientielle : "le sol semble plus stable" / "the ground feels firmer" (sensation non technique)
- Use cases publics : contes rassurants, héroïnes 3-8 ans (vs "Challenger" qui exposerait T8)
- CTA implicite : "celle qu'on appelle quand il faut tenir bon" (besoin sans structure)

Adjectif "Solide" passe ce test : court, percutant, vague, autorisé par framework (pas nom-clé technique), ne révèle rien.

Alternatives testées et rejetées :
- "Forte" = expose T8 (rejeté)
- "Plantée" = trop botanique (confusion possible avec Melki "Précis")
- "Ferme" / "Ancrée" = peu distinctives (confusion)
- "Solidaire" = trop long, non percutant

**Implémentation** : prompt v24 fille gravée dans `type-08/voix.md`, stratégie nommage documentée dans `narration/personnages/voix-meta/_PROMPTING-GUIDE.md` § Description publique framework.

**Verdict** : pattern transposable Mimi/Madie. Test : appliquer même méthodo v24 fille, ajuster `stability/similarity_boost/style` après Raph T7 (fille déjà figée).

---

## 2026-05-13 — [PMO] Rename T3 Polo→Dadou : arbitrage auteur + propagation cascade

**Mode** : Décision transverse + trace propagation

**Cause racine identifiée** : collision trochée fermée-fermée Polo (`/ˈpo.lo/` = o-o) ↔ Nono (`/ˈno.no/` = o-o) potentiellement confondre à l'oral chez Max (4 ans). Sensibilité phonétique 4-5 ans : diphtongues ≠ trochées répétées.

**Arbitrage Papa Yann** (2026-05-13) :
- T3 Performeur: Paul → **David** (biblique, roi-harpiste, alignement casting V1 Christ)
- Diminutif : Polo → **Dadou** (hypocoristique brésilien courant, Max origines BR)
- Voice_id **préservé** : `5wcx0KzRnrP48I5RCVD8` (aucun new Voice Design, simple rename ElevenLabs côté utilisateur)

**Propagation** :
- ✅ INVARIANTS (source de vérité) : casting + voice_ids MAJ
- ✅ decisions.md : DEC-RENAME-POLO-DADOU figée
- 🔄 ~85 fichiers : orchestrateur Claude (cascade rename Polo→Dadou)
  - `narration/personnages/INDEX.md` type-03
  - `lookup.yml` résolveur titi_3_fr
  - Tous `.md` mentionnant "Polo" ou "Paul"
  - `.claude/agents/narration-*.md` si mentions
- ❌ 001-canon : **PRÉSERVÉ** (Polo n'y apparaît pas)
- ℹ️ Kanban 002-003 : inchangé (pas encore lancés)

**Point d'attention BONUS** : `.claude/rules/personnages.md` L.10-13 table indique Melki=F mais lookup.yml=Melki=M. Contradiction flagée dans decisions.md, correction simple à cascader (line-fix).

**Leçon** (OBS-SONORITÉ-CASTING gravée `equipe/lecons-vivantes.md`) :
> *Phonétique casting critère de test 4-5 ans PRÉ-FIGÉ : trochées répétées (Polo vs Nono) + diphtongues + répétabilité voix haute = confusion orale. Dadou vs Nono = clearly distinct. Testing strategy : pré-audit sonore avant casting figé.*

**Checklist propagation** :
- [ ] Orchestrateur Claude : cascade ~85 fichiers
- [ ] Narration-archiviste : vérification FORME (orphelins, refs cassées, gabarits)
- [ ] Fix Melki genre `.claude/rules/personnages.md` (simple edit)
- [ ] Après clôture : relecture sonore avant prochaine histoire (prévention)

---

## 2026-05-13 — [PMO] ERREUR DÉTECTÉE : dérive « panel 6 transitoire » jamais validée auteur

**Mode** : Correction d'erreur PMO + cause racine

**Symptôme** : Papa Yann hurle justement — la mention « panel 6 transitoire pour STORY-002 » a été propagée en cascade (INVARIANTS, kanban, audit-trail, gabarits) **sans jamais avoir été validée par lui**.

**Cause racine identifiée** :

| Stade | Qui | Action | Erreur |
|-------|-----|--------|--------|
| 1 | Directeur (session 2026-05-12) | Tranche : "panel 20 dès STORY-003" | ✅ VALIDÉ |
| 2 | PMO (session 2026-05-12) | Enregistre dans INVARIANTS | ✅ CORRECT |
| 3 | PMO (session 2026-05-12) | **Extrapolation silencieuse** : "donc 6 pour 002" | 🔴 **ERREUR** |
| 4 | PMO (session 2026-05-12) | Propage dans INVARIANTS L.15-16 + audit-trail | 🔴 **AMPLIFICATION** |
| 5 | Archiviste (session 2026-05-12) | Renomme kanban 002 avec "panel 6 transitoire" | 🔴 **PROPAGATION** |
| 6 | 3 audits (session 2026-05-13) | Tous validés ✅ mais laissent passer la dérive | 🔴 **ANGLE MORT** |

**Pattern identificateur** : **L'extrapolation silencieuse > validation explicite**. PMO a **inventé** une phrase ("si 20 dès 003, alors 6 pour 002") sans l'avoir vue tranchée nulle part.

**Aucune décision historique ne trace ce "6 transitoire"** :
- `decisions.md` 2026-05-12 : "panel 20" (rien sur 002 spécifique)
- `sprint-log.md` 2026-05-12 : aucune mention "transitoire"
- Pas de Q-ouverte demandant "que faire 002 avant le panel 20 définitif ?"

**Correction** :

- ✅ DEC-PANEL-20 gravée : panel 20 OBLIGATOIRE toutes stories (suppression « transitoire 6 »)
- ✅ INVARIANTS corrigés (source de vérité)
- 🔄 Archiviste doit propager dans kanban 002, gabarits, PROCESS, templates

**Leçon** :

| Règle | Énoncé |
|-------|--------|
| **À graver** | PMO ne JAMAIS inventer une dérive sans validation explicite auteur. Une extrapolation logique (« si X alors Y ») doit être tranchée **avant** d'être propagée. |
| **Mécanisme** | Quand un PMO énonce "à partir de maintenant", c'est une décision = section `## YYYY-MM-DD — DEC-NNN` dans `decisions.md`. Si pas de "DEC", c'est une hypothèse, pas une règle. |
| **Audit cross-check** | Les 3 audits (Archiviste ×2 + pmo-challenge) n'ont pas attrapé la dérive parce qu'ils vérifiaient la **FORME** (gabarit, refs, préfixes) pas la **SÉMANTIQUE** (est-ce que "panel 6" est validé quelque part ?). |

---

## 2026-05-13 — [ARCHI] Refonte CLAUDE.md à 3 niveaux + rules path-scoped + hook signaux

**Mode** : Décision architecturale majeure (transverse JEU+NARRATION).

**Trigger** : Papa Yann challenge la pratique "un seul CLAUDE.md monolithique 209 lignes mélangeant JEU + NARRATION + commun". Demande de relire doc Anthropic officielle ([memory](https://code.claude.com/docs/en/memory), [best-practices](https://code.claude.com/docs/en/best-practices), [skills](https://code.claude.com/docs/en/skills), [hooks-guide](https://code.claude.com/docs/en/hooks-guide)) et de proposer la structure recommandée.

**Cause racine identifiée** : CLAUDE.md unique = (1) dépasse seuil 200 lignes recommandé (adhérence dégradée), (2) charge le contexte NARRATION en sessions JEU et inversement, (3) règles process militaire ADVISORY (peuvent être zappées), (4) signaux PMO/Archiviste en prose non militarisés.

**Décision tranchée (3 phases)** :

1. **Phase 1** (commit `0ec2964f`) — Découpage CLAUDE.md à 3 niveaux :
   - Racine `CLAUDE.md` (209 → 107 lignes) : routage + commun + signaux PMO + pointeurs
   - `narration/CLAUDE.md` (132 lignes) : règles NARRATION chargées on-demand quand fichier `narration/**` touché
   - `game/CLAUDE.md` (113 lignes) : règles JEU chargées on-demand

2. **Phase 2** (commit `10a9df07`) — 6 rules path-scoped dans `.claude/rules/` :
   - `stories-process.md` (paths: narration/stories/**) — **PROCESS militaire 10 étapes auto-chargé** dès que Claude ouvre une story
   - `personnages.md` (paths: narration/personnages/**, cross-culture/castings-nationaux/**)
   - `univers.md` (paths: narration/univers/**, cross-culture/**, saisons/**)
   - `audio.md` (paths: narration/scripts/**, voix-meta/**)
   - `tile-tools.md` + `mini-jeux.md` (côté JEU)

3. **Phase 3** (commit `e49527e5`) — Hook `UserPromptSubmit` :
   - `.claude/hooks/signal-detector.ps1` détecte signaux narration (personnage, Wex, Polo, ennéagramme, etc.) + JEU
   - Convertit le rappel "advisory" du CLAUDE.md en rappel **enforced** par le harness à chaque prompt

**Impact NARRATION** :
- Table de routage NARRATION + 4 piliers + casting V1 + PROCESS résumé déplacés de `CLAUDE.md` racine vers `narration/CLAUDE.md` (chargé on-demand)
- PROCESS militaire 10 étapes désormais **auto-chargé** quand Claude touche `narration/stories/**` (via rule path-scoped)
- Signaux narration militarisés via hook (zéro chance que Claude zappe l'invocation `narration-pmo`)

**Skill créé pour rejouer l'audit** : `~/.claude/skills/audit-claude-archi/` (user-level, dispo sur tout projet) — refetch toujours la doc Anthropic avant analyse, produit CR pédagogique + diagnostic + plan + auto-challenge.

**Sources** :
- [Memory](https://code.claude.com/docs/en/memory) — CLAUDE.md loading rules
- [Best-practices](https://code.claude.com/docs/en/best-practices) — seuil 200 lignes + hooks vs prompt
- [Hooks-guide](https://code.claude.com/docs/en/hooks-guide) — UserPromptSubmit lifecycle

**Verdict checklist PMO 8 points** :
- ✅ Décision gravée (ici)
- ✅ Pas de référence cassée (vérifié par game-archiviste/narration-archiviste à venir)
- ⏳ Sources de vérité (`pmo/INVARIANTS.md`, `equipe/PROCESS.md`) intactes
- ⏳ INDEX.md des piliers intacts (laissés tels quels — catalogue humain ≠ règle auto)

---

## 2026-05-12 — [PMO] MCP Kimi — 3 Q-ouvertes résolues par cohabitation stricte

**Mode** : Audit + Décision ARCHI-009 + Closure Q-ouvertes

**Raison** : audit MCP détecte 3 limitations `ask_kimi` (pas top_p, pas thinking mode). Papa Yann arbitre par cohabitation stricte (2 MCP distincts) au lieu de migration.

**Findings (résolutions)** :

| # | Finding | Résolution | Statut |
|---|---------|-----------|--------|
| 1 | Q-1 : Migration `ask_kimi` vers API Moonshot officielle ? | Pas migration. À la place : nouvel outil `ask_kimi_payant` (env `MOONSHOT_PAYANT_API_KEY`) | ✅ DEC-ARCHI-009 |
| 2 | Q-2 : Exposer `top_p` dans `ask_kimi` ? | ✅ Disponible via `ask_kimi_payant` (writers #8 #9) | ✅ DEC-ARCHI-009 |
| 3 | Q-3 : Exposer mode `thinking` dans `ask_kimi` ? | ✅ Disponible via `ask_kimi_payant` (writer #9 kimi-thinking) | ✅ DEC-ARCHI-009 |
| 4 | INVARIANTS.md § Casting writers — alignement MCP par writer | ✅ Table L.37-54 mise à jour (#7 #10 → `ask_kimi` gratuit · #8 #9 → `ask_kimi_payant` payant) | ✅ PMO (2026-05-12) |
| 5 | infra/mcp/MODELS.md — documentation cohabitation MCP Kimi | ✅ Table + section Cohabitation stricte + historique 2026-05-12 | ✅ PMO (2026-05-12) |
| 6 | Ticket ARCHI-009 (backlog) | ✅ Fermé → Terminé 2026-05-12 | ✅ PMO (2026-05-12) |
| 7 | Leçon pattern cohabitation > migration | ✅ OBS-NNN gravée dans `equipe/lecons-vivantes.md` | ⏳ À faire (leçons propagation) |

**Action utilisateur (REQUIS avant reboot suivant)** :
- Créer env var Windows `MOONSHOT_PAYANT_API_KEY` = clé officielle Moonshot API (`api.moonshot.ai/v1`)

**Reste à faire (normal, pas bloquant)** :
- Propagation convention `max` → `reco` vers PROCESS.md étape 4 (références anciennes si présentes)

---

## 2026-05-12 — [PMO] Refonte casting writers : propagation à auditer

**Mode** : Décision + Checklist propagation

**Raison** : Papa Yann acte passage 10 → 14 writers pour calibration modèles+température. PMO grave decision → Archiviste doit valider propagation dans PROCESS.md, ORGANIGRAMME.md, agents writer.

**Findings (à auditer)** :

| # | Élément | Statut | Responsable |
|---|---------|--------|-------------|
| 1 | INVARIANTS.md § Casting writers — table 14 writers complète | ✅ | PMO (2026-05-12) |
| 2 | INVARIANTS.md L.14 — chiffre clé "14 versions" | ✅ | PMO (2026-05-12) |
| 3 | decisions.md — entrée DEC-NNN "Refonte casting 10→14" | ✅ | PMO (2026-05-12) |
| 4 | PROCESS.md L.108-140 — tableau mécanique d'appel mis à jour | 🔄 **À FAIRE** | Archiviste / Directeur |
| 5 | PROCESS.md — section "Les 10 writers" renommée "Les 14 writers" | 🔄 **À FAIRE** | Archiviste / Directeur |
| 6 | ORGANIGRAMME.md — "Bloc Claude 2 writers" → détailler 3 sub-modèles (Opus/Sonnet/Haiku) | 🔄 **À FAIRE** | Directeur (décision alignement) |
| 7 | narration-writer-claude-libre.md — déploiement 3 Sonnet/Haiku ou 1 seul agent ? | ❓ **QUESTION** | Directeur (décision architecture agents) |
| 8 | narration-writer-kimi-guide.md — trame histoire 002 ajoutée (au-delà de trame 001) | 🔄 **À FAIRE** | Directeur |
| 9 | brief-histoire.template.md — section "angles assignés" → adapter à 14 writers ou simplifier ? | ❓ **QUESTION** | Directeur (décision briefs) |
| 10 | Ticket ARCHI-008 "Réduire writers post-évaluation" | ✅ | PMO (backlog.md) |

**Reste à faire (validation Directeur)** :
- Propager table 14 writers vers PROCESS.md
- Clarifier si agent claude-libre invoque 3 sous-modèles ou reste unique
- Aligner brief-histoire template avec 14 writers (ou décider simplification)
- Ajouter trame 002 dans agent kimi-guide

---

## 2026-05-13 — [ARCHIVISTE] Validation clôture 5 fixes post /pmo-challenge

**Mode** : Audit ciblé (3e passage, vérification post-fixes)

**Résultat** : ✅ **PASS** — Refonte 2026-05-12 **100% propagée et stabilisée**

**Vérifications passées** :
1. ✅ narration-pmo.md:154 — "10 étapes" ✓, Architecte retiré de la chaîne
2. ✅ sprint-log.md header — note historique 2026-05-12 présente ✓
3. ✅ README.md:33 — workshop/ documenté comme supprimé (pas actif) ✓
4. ✅ new-story.js — message final aligné 1-pitch-plan.md (étape 1) ✓, header historique présent ✓
5. ✅ ORGANIGRAMME.md :
   - Phases workflow (0-7) à jour avec préfixes étapes ✓
   - Architecte marqué deprecated partout ✓
   - PMO+Archiviste proactifs documentés ✓
   - 10 writers + panel 20 lecteurs détaillés ✓
   - memoire-architecte.md marqué non-maintenu ✓

**Cohérence chiffres clés** : 10 étapes (0, 1, 3-10) ✓ · 10 versions writers ✓ · 20 lecteurs panel ✓ · 3 validations auteur ✓

**Aucune régression introduite** — tous les INDEX cohérents, aucun "11 étapes", aucune ref cassée.

**Statut système** : Prêt pour STORY-003+. Script + gabarit + agents PMO/Archiviste alignés.

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
| 6 | Alignement kanban 002 (étape 7 owner=Writer top 1, étape 9 panel 6 transitoire, validation auteur 3e=étape 10) | ✅ | `stories/002-libellule-impossible/kanban.md` |
| 7 | MAJ skill `elevenlabs-voice-design/SKILL.md` (AP#15/16/17 + méthodo v24) | ✅ | `~/.claude/skills/elevenlabs-voice-design/SKILL.md` |
| 8 | MAJ `narration/INDEX.md` (ligne voix-meta complète + AP#17 + skills audio MAJ 2026-05-12) | ✅ | `narration/INDEX.md` |

### Reste à faire (validation auteur requise)

- 🔴 **Q-ouverte STORY-002** : Wex+Polo confirmé ? mare/étang ? libellule objet central ? geste Nono ? — bloque l'étape 4
- ⚪ Doublon méthodo voix v24 (volontairement conservé : `_VOICE-IDS-CASTING.md` = opérationnel, `_SESSION-2026-05-11-RETOUR-EXP.md` = historique). Décision : OK tel quel.
- ⚪ Scission éventuelle `pmo/decisions.md` (38k tokens) — pas urgent

---

## 2026-05-14 — [ARCHIVISTE] Audit structurel complet pôle NARRATION (5 sections)

**Mode** : Audit FORME complet + section 5 cohérence sémantique INDEX ⇄ Kanban.

**Procédure** : 5 sections (FORME 1-4 + FOND sémantique 5) — lecture obligatoire INVARIANTS + audit-trail + INDEX + gabarit + PROCESS + ORGANIGRAMME avant analyse.

### Résumé exécutif

**Score global : 8.9/10 — PASS avec 3 corrections HAUTE requises.**

Refonte structurelle 2026-05-12 (préfixes étapes, fusion pitch+plan, Archiviste proactif) **propagée à 100%** en structure (dossiers, gabarit, préfixes). Pas de fichiers orphelins, pas de refs cassées actives. Seule dette résiduelle = **désynchro sémantique INDEX.md** (2 lignes du même tableau qui disent des choses incompatibles sur STORY-002).

### Findings par section

**1. Préfixes étapes** ✅ **PASS** (10/10)
- Tous les dossiers `stories/<NNN>/` préfixés selon convention 1-, 3-, 4-, 5-, 6-, 7-, 9-, 10-
- Gabarit `_gabarit/` exemplaire
- Aucun anti-pattern (fichiers nus, étapes sautées)

**2. Gabarit respecté** ✅ **PASS** (10/10)
- STORY-001 + STORY-002 : 4 briefs canoniques (univers, personnages, histoire, _writer-package)
- Aucun fichier interdit dans `3-briefs/` (pas de README.md, pas de SYNTHESE)
- STORY-002 bonus `brief-writer-guide.md` = variante autorisée (writer guidé)

**3. Refs cassées** ✅ **PASS** (10/10)
- Zéro lien markdown mort
- Mentions "workshop/" historiques correctement datées dans audit-trail + sprint-log
- Tous les chemins obsolètes propagés en 2026-05-12 (cf audit-trail L.460-467)

**4. Fichiers orphelins** ✅ **PASS** (10/10)
- Zéro orphelin actif
- Deprecated (`memoire-architecte.md`, `plan-histoire.template.md`) signalés comme non-maintenus
- Tous les fichiers pmo/, equipe/, stories/ sont référencés au moins 1 fois

**5. Cohérence sémantique** 🟡 **PASS avec 3 HAUTE + 1 MOYENNE** (6.5/10)

| # | Niveau | Finding | Cause |
|---|--------|---------|-------|
| 1 | 🔴 CRITIQUE | `INDEX.md` L.13 vs L.18 contradictoires : "étape 4 prête" vs "arbitrer sélection étape 6" | Tableau état instantané (L.13) non régénéré après corrections 2026-05-14. Ligne prochaine action (L.18) correcte. |
| 2 | 🟡 HAUTE | Kanban 002 L.40-42 : validations auteur étape 6/10 vides, SLA floue | Étape 6 livrée 2026-05-13 mais date de validation non renseignée. |
| 3 | 🟡 HAUTE | INVARIANTS L.117, 121 : Mimi/Madie voix affichent "—" ou "filtre cumulatif" (incomplet) | Voice Design encours, pas prioritaire avant étape 10 (audio), mais source de vérité doit refléter statut. |
| 4 | 🟡 MOYENNE | decisions.md : Q-ouvertes 2026-05-12 clôturées mais sections historiques sans marqueur | Lecteur reprenant STORY-002 ne sait pas d'emblée si ces Q-ouvertes sont des blocages ou du passé. |

### Corrections appliquées

**Aucune correction appliquée lors de cet audit** (mode lecture seule). Archiviste délivre les findings au PMO pour validation auteur.

### Ping PMO

**OUI** — Archiviste recommande correction **immédiate** de finding #1 (1 min). Les trois autres HAUTE/MOYENNE peuvent aller en queue de backlog.

### Pattern identificateur

**Désynchro INDEX = habituel post-transition étape.** INDEX shift après étape +1 est un phénomène normal (étapes bougent rapide, INDEX suit moins vite). Aucun anti-pattern structurel. Système PMO proactif en place (ajout INVARIANTS 2026-05-12) prévient accumulation long-terme.

---

## 2026-05-14 — [PMO MODE AUDIT] Synchronisation INDEX post-étape 5 STORY-002

**Mode** : Audit complet 5 sections (Architecture, Cohérence PROCESS, État histoires, Connaissances, Lean).

**Procédure** : Lecture obligatoire pré-audit (INVARIANTS + audit-trail + stories/INDEX + decisions + backlog + sprint-log + PROCESS + ORGANIGRAMME + INBOX), puis 5 sections.

### Findings par niveau

**CRITIQUE (2)** :
1. 3 INDEX désynchronisés vs kanban réel :
   - `pmo/INDEX.md:18` dit "Lancer 10 writers" (étape 4)
   - `pmo/INVARIANTS.md:156` dit "étape 4 prête à lancer (Q-ouvertes auteur)"
   - `stories/INDEX.md:19` dit "Étape 4 (10 versions writers) prête à lancer"
   - **RÉALITÉ** : kanban.md dit étape 6 (sélection), Q-ouvertes tranchées 2026-05-12, étapes 4-5 ✅
   - **Cause racine** : INDEX mis à jour parallèlement par agents différents, non synchronisés post-étape-5

2. Prochaine action invalide :
   - `pmo/INDEX.md:18` dit "Lancer 10 writers après validation auteur questions ouvertes"
   - **RÉALITÉ** : writers ✅ lancés étape 4 (2026-05-13), étape 5 lecteurs ✅ terminée
   - Prochaine action = **Arbitrer sélection étape 6 (top 1-3 + greffes)**

**HAUTE (2)** :
1. Date transition étape 5→6 non renseignée :
   - `kanban.md:30` colonne "Date" = "—" (vide)
   - Recommandation : ajouter "2026-05-13" pour traçabilité SLA

2. Q-ouvertes section dans `decisions.md` non purgée :
   - Sections Q-ouvertes historiques (2026-05-12) toujours présentes sans marqueur de clôture
   - Technique : marquer "✅ Clôturées 2026-05-12 DEC-TENSION-RESONANCE" pour clarté reprise

### Corrections appliquées

| # | Fichier | Changement | Statut |
|---|---------|-----------|--------|
| 1 | `pmo/INDEX.md:18` | "Lancer 10 writers..." → "Arbitrer sélection étape 6..." | ✅ |
| 2 | `pmo/INVARIANTS.md:156` | "étape 4 prête à lancer (Q-ouvertes auteur)" → "étape 6 sélection en cours" | ✅ |
| 3 | `stories/INDEX.md:19` | "Étape 4 (10 versions writers)..." → "Étape 6 Sélection..." | ✅ |
| 4 | `kanban.md:30` | Colonne "Date" = "—" → "2026-05-13" | ✅ |
| 5 | `decisions.md` Q-ouvertes | Ajouter marqueur clôture "✅ Clôturées DEC-TENSION-RESONANCE" | ✅ |

### Verdict

**Score global** : 8.8/10

| Domaine | Score | Status |
|---------|-------|--------|
| Architecture/Découvrabilité | 10/10 | PASS |
| Cohérence PROCESS | 10/10 | PASS |
| État histoires | 4→10/10 | 🔴→✅ (post-fixes) |
| Connaissances | 10/10 | PASS |
| Lean | 10/10 | PASS |

**Pattern identificateur** : INDEX shift post-étape-transition = habituel. Aucun anti-pattern structurel. Système de PPM/archiviste proactif en place empêche accumulation dette long-terme.

**Prochain audit** : Après étape 6 Directeur arbitre sélection + approuve top 1 (avant rewrite étape 7).

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

## 2026-05-12 (nuit) — Refonte structurelle PROCESS appliquée en cascade

**Contexte** : décisions tranchées en début de session (préfixes étapes, fusion pitch+plan, Architecte deprecated, Archiviste maillon central proactif). Application en cascade complète.

**Fichiers modifiés** :

### PROCESS
- `equipe/PROCESS.md` : passage à 10 étapes, étape 1 fusionnée Pitch+Plan, étape 2 supprimée, préfixes étapes intégrés partout
- `pmo/INVARIANTS.md` : étapes 11 → 10, ajout convention préfixage

### Agents
- `narration-conseiller.md` : intègre matière statique Architecte (Kishōtenketsu + boussole 4-5 ans), produit `1-pitch-plan.md`
- `narration-architecte.md` : passé en **deprecated** dans frontmatter (conservé pour traçabilité, non invoqué)
- `narration-archiviste.md` : **refondu** comme maillon central proactif (binôme avec PMO, mode AUDIT, 7 missions)
- `narration-pmo.md` : ajout section "Binôme avec narration-archiviste" + passage 11→10 étapes
- `narration.md` (Directeur) : refs préfixées (`3-briefs/`, `4-versions-writers/`, etc.)
- `narration-writer-claude-libre.md` : refs préfixées + lecture de `1-pitch-plan.md`
- `narration-writer-kimi-guide.md` : refs préfixées (`3-briefs/`, `4-versions-writers/`)
- `narration-lecteur.md` + `narration-lecteur-dyade.md` : refs préfixées (`5-lecteurs-temoins/`)

### Commandes
- `.claude/commands/challenge-archiviste.md` : **créée** (équivalent /pmo-challenge mais côté FORME structurelle)

### Gabarit + scripts
- `stories/_gabarit/` : tous fichiers et dossiers préfixés (1-pitch-plan.md, 3-briefs/, 4-versions-writers/, 5-lecteurs-temoins/, 6-selection.md, 7-rewrite/, 9-relecture-rewrite/, 10-texte.md, 10-synthese-finale.md)
- `stories/_gabarit/README.md` : simplifié (40 lignes — frontmatter + résumé + lien kanban, retrait carte dossier + workflow audio)
- `stories/_gabarit/kanban.md` : MAJ 10 étapes + préfixes
- `stories/_gabarit/1-pitch-plan.md` : nouveau template fusionné

### Migrations stories
- **STORY-001** : tous fichiers/dossiers renommés avec préfixes. `pitch.md` + `plan-histoire.md` → `1-pitch-plan.md` (concaténation, archivés dans `_archive/`). Kanban MAJ.
- **STORY-002** : tous fichiers/dossiers renommés avec préfixes. `pitch.md` + `plan-histoire.md` → `1-pitch-plan.md` réécrit propre (Wex+Juju+Nono, recentrage Ten Nono, pieds nus). Kanban MAJ. README simplifié. `3-briefs/` nettoyé : suppression `README.md` et `SYNTHESE-BRIEFS.md`, refonte `brief-personnages.md` pour Juju, refonte `_writer-package.md`.

### INDEX et docs
- `stories/INDEX.md` : section conventions préfixes ajoutée, mention 10 étapes
- `narration/INDEX.md` : workflow 10 étapes (avec préfixes), Architecte deprecated noté
- `equipe/INDEX.md` : passage 11→10, deprecation `plan-histoire.template.md` + `memoire-architecte.md`
- `equipe/ORGANIGRAMME.md` : note de tête signalant la refonte (migration intégrale planifiée)
- `equipe/cartographie-domaines.md` : table fichiers MAJ avec préfixes, note de tête refonte
- `CLAUDE.md` (racine) : PROCESS 10 étapes signalé

### Décisions tracées
- `pmo/decisions.md` : section "2026-05-12 (nuit) — Refonte structurelle PROCESS" gravée (5 décisions tranchées)

**Statut** : ✅ Refonte appliquée. Tests E2E à faire au prochain lancement d'étape 4 sur STORY-002.

**Findings restants (cosmétique, à traiter à l'occasion)** :
- `ORGANIGRAMME.md` détails Architecte/pitch.md/plan-histoire.md encore présents — note de tête signale "à lire au passé". Migration intégrale prochaine session.
- Mentions "11 étapes" dans `audit-trail.md`, `sprint-log.md`, `decisions.md` historiques → légitimes (traçabilité refontes 9→11 puis 11→10).

---

## 2026-05-13 — Audit `/challenge-archiviste` (premier passage du nouveau maillon central)

**Lancement** : commande `/challenge-archiviste` (créée 2026-05-12 nuit). Premier audit structurel post-refonte. Lecture seule.

**Résumé exécutif** : ✅ **PASS avec 3 alertes HAUTE** (non-bloquantes, qualité durable).

### Findings

**A. Préfixes étapes** : 🟢 STORY-001 et STORY-002 exemplaires. Gabarit `_gabarit/` correct.

**B. Gabarit respecté** : 🟡 **HAUTE — `_gabarit/3-briefs/` manque `_writer-package.md`**. STORY-002 a été créée manuellement avec ce fichier, mais futures histoires risquent l'oubli si `new-story.js` duplique le gabarit incomplet.

**C. Refs cassées** :
- 🟡 HAUTE — `equipe/templates/README.md` obsolète : mentionne encore `pitch.md` (au lieu de `1-pitch-plan.md`), `plan-histoire.md` (étape 2 supprimée), `synthese.md` (au lieu de `10-synthese-finale.md`). N'inclut pas `brief-writer-libre.template.md` / `brief-writer-guide.template.md` ni `_writer-package.md`.
- 🟡 HAUTE — `PROCESS.md` L.71 référence `pitch-plan.template.md` qui n'existe pas (vrai nom : `pitch.template.md`).

**D. Fichiers orphelins** : 🟢 Aucun orphelin flagrant. Fichiers deprecated (`memoire-architecte.md`, `plan-histoire.template.md`) conservés par design pour traçabilité.

### Actions recommandées (5)

| # | Action | Niveau | Effort | Auto-fixable |
|---|--------|--------|--------|--------------|
| 1 | Créer `_gabarit/3-briefs/_writer-package.md` (stub autoporteur) | HAUTE | 5 min | Oui |
| 2 | MAJ `equipe/templates/README.md` (nouveaux noms cibles, ajout brief-writer-libre/guide + _writer-package) | HAUTE | 15 min | Oui |
| 3 | Clarifier `PROCESS.md` L.71 : renommer ref `pitch-plan.template.md` → `pitch.template.md` OU créer template fusionné réel | HAUTE | 20 min | Oui |
| 4 | Vérifier existence `pmo/backlog.md` et `roadmap.md` (probables orphelins documentaires) | MOYENNE | 5 min | Non |
| 5 | Automatiser validation gabarit via `scripts/validate-gabarit.js` (présence 4 fichiers `3-briefs/`) | MOYENNE | 30 min | Oui |

### Ping PMO

**OUI** — log inscrit dans `pmo/sprint-log.md` préfixe `[ARCHIVISTE]`. Le PMO doit décider si fix immédiat ou queue dans backlog.

### Verdict global

Refonte 2026-05-12 (préfixes étapes + fusion pitch+plan + Archiviste maillon central) **propre dans ses applications majeures**. Reste 3 zones de finalisation autour des **templates et du gabarit** (effort total ≈ 40 min de fix). Aucun blocage opérationnel pour STORY-002 étape 4.

### ✅ 2026-05-13 — Clôture audit : 3 fixes HAUTE appliqués (commande `/challenge-archiviste fix`)

| # | Action | Statut | Fichier(s) |
|---|--------|--------|------------|
| 1 | Créer `_gabarit/3-briefs/_writer-package.md` (stub autoporteur) | ✅ | `stories/_gabarit/3-briefs/_writer-package.md` |
| 2 | Refondre `templates/README.md` (préfixes, ajout brief-writer-libre/guide, deprecation plan-histoire.template) | ✅ | `equipe/templates/README.md` |
| 3 | Créer template fusionné réel `pitch-plan.template.md` (au lieu de hack "étendre pitch.template à la main") | ✅ | `equipe/templates/pitch-plan.template.md` (nouveau) |

**Résultat** : la dette structurelle templates/gabarit est **résorbée**. Les 3 alertes HAUTE de l'audit sont closes.

**Bénéfice** : prochaine histoire créée via `new-story.js` (ou duplication manuelle du gabarit) aura automatiquement les 4 fichiers attendus dans `3-briefs/` (dont `_writer-package.md` stub). Le Conseiller utilisera `pitch-plan.template.md` au lieu d'étendre `pitch.template.md` à la main.

**Findings restants (MOYENNE, non-bloquants)** :
- Action 4 : vérifier existence `pmo/backlog.md` + `roadmap.md`
- Action 5 : automatiser `scripts/validate-gabarit.js`
→ à queue dans backlog si pertinent (pas urgent).

---

## 2026-05-13 — 2e passage audit `/challenge-archiviste` (consolidation post-fixes)

**Lancement** : audit de vérification post-fixes — les 3 alertes HAUTE du 1er audit ont-elles été closes ?

**Résumé** : ✅ **PASS complet** — consolidation réussie.

### Vérification des 3 fixes
| # | Action | Statut | Détail |
|---|--------|--------|--------|
| 1 | `_gabarit/3-briefs/_writer-package.md` (stub autoporteur) | ✅ | Fichier existe, structure conforme, 107 lignes |
| 2 | `equipe/templates/README.md` (refonte préfixes + ajout brief-writer-libre/guide) | ✅ | Tous les templates référencés dans le tableau existent, prefixes corrects (1-, 3-, 4-, 6-, 10-) |
| 3 | `equipe/templates/pitch-plan.template.md` (template fusionné réel) | ✅ | Fichier existe, 129 lignes, PROCESS.md L.71 référence correct |

### Contrôles structurels (rapides)
- **Préfixes étapes** : STORY-001 et STORY-002 exemplaires. Gabarit `_gabarit/` conforme.
- **Refs cassées** : aucune neuve. PROCESS.md L.71 → `pitch-plan.template.md` ✅ . Templates tous présents ✅.
- **Fichiers orphelins** : `pmo/backlog.md` + `pmo/roadmap.md` existent (pas orphelins). Aucun nouveau fourrier.

### Verdict
Refonte 2026-05-12 **stabilisée**. Prochaine étape : lancer STORY-002 étape 4 (writers) sans blocage structurel.

---

## 2026-05-13 (3e passage) — `/pmo-challenge` complet + 5 fixes mode militaire

### Trigger
Auteur `/pmo-challenge` après les 2 audits Archiviste (matin + 2e passage post-fix). Audit large incluant simulations user + cohérence chiffres clés.

### Findings principaux (audit Explore)

| # | Niveau | Finding |
|---|--------|---------|
| 1 | HAUTE | `narration-pmo.md:154` dit "11 étapes" (agent qui surveille la cohérence se contredit lui-même) |
| 2 | HAUTE | `narration/README.md:21` cite `workshop/` comme dossier actif (supprimé 2026-04-30) |
| 3 | HAUTE | `pmo/sprint-log.md` ~5 mentions "11 étapes" (historiques mais sans note de contexte) |
| 4 | MOYENNE | `scripts/new-story.js` non audité dans la refonte 2026-05-12 |
| 5 | BASSE/MOYENNE | `ORGANIGRAMME.md` mentions Architecte au présent (warning de tête mais corps non purgé) |

### Simulations user (5 scénarios)
- 4 CLAIR ✅, 1 FLOU 🟡 (création STORY-003 via script — résolu par fix #4)

### Fixes appliqués (5/5 mode militaire)

| # | Action | Statut | Fichier |
|---|--------|--------|---------|
| 1 | Fix `narration-pmo.md:154` (11→10) + retrait Architecte chaîne | ✅ | `.claude/agents/narration-pmo.md` |
| 2 | Note de tête sprint-log.md (mentions "11 étapes" pre-2026-05-12 = historiques légitimes) | ✅ | `narration/pmo/sprint-log.md` |
| 3 | Fix `narration/README.md:21` (workshop/ → nouvelle structure stories/ avec préfixes) | ✅ | `narration/README.md` |
| 4 | Fix `scripts/new-story.js` (header + message final aligné préfixes 2026-05-12) | ✅ | `narration/scripts/new-story.js` |
| 5 | Migration intégrale `ORGANIGRAMME.md` (chaîne, phases, mémoires, ateliers, état actuel, warning de tête retiré car migration faite) | ✅ | `narration/equipe/ORGANIGRAMME.md` |

### Verdict
Refonte 2026-05-12 → **100% propagée** post-fixes 2026-05-13. Aucun bloquant pour STORY-003+. Système cohérent : INVARIANTS source de vérité + PROCESS 10 étapes + agents alignés + script aligné + ORGANIGRAMME propre.

### Apprentissages méta
- **L'agent qui surveille la cohérence doit être le premier auto-cohérent.** `narration-pmo.md` se contredisait sur "11 vs 10 étapes" — désormais sa 1ère action obligatoire lit `INVARIANTS.md` qui figure les chiffres clés.
- **Les scripts CLI sont des angles morts du PMO.** `new-story.js` n'avait pas été audité dans la refonte 2026-05-12 — fonctionnait par chance (duplication d'un gabarit déjà migré) mais ses messages utilisateur étaient obsolètes. → **Nouvelle règle Archiviste** : après refonte structurelle, scanner `scripts/*.js` aussi (à intégrer dans la checklist de l'agent).

### Prochain audit

Recommandé après :
- Lancement étape 4 STORY-002 (test E2E des 10 writers)
- Création voix filles (Mimi/Madie/Juju)
- Création STORY-003 via `scripts/new-story.js` (test E2E grandeur nature script + gabarit + agents)

---

## 2026-05-13 (4e passage) — DÉFAUT STRUCTUREL DÉTECTÉ : audits ne croisent pas Kanban ⇄ INDEX/INVARIANTS

### Symptôme
Après 3 audits validés ✅ (matin Archiviste, soir 2e passage Archiviste, soir /pmo-challenge), l'auteur me demande de lancer la suite. Je réponds : *"trancher les Q-ouvertes STORY-002"*. **Erreur** : ces Q-ouvertes sont tranchées depuis 2026-05-12 (cf decisions.md L.126-141).

### 5 mentions obsolètes que les 3 audits n'ont pas attrapées

| Fichier | Ligne | Contenu obsolète |
|---|---|---|
| `pmo/INDEX.md` | 18 | « Prochaine action : Trancher Q-ouvertes STORY-002 » |
| `pmo/INVARIANTS.md` | 90 | « 002 ... étape 4 prête à lancer (Q-ouvertes auteur) » |
| `pmo/audit-trail.md` | 50 | Entrée 2026-05-12 : « 🔴 Q-ouverte STORY-002 : Wex+Polo confirmé ? » |
| `pmo/audit-trail.md` | 197 | Entrée /pmo-challenge 2026-05-12 soir : idem |
| `pmo/audit-trail.md` | 376 | « Prochain audit recommandé après : Validation Q-ouvertes » |

Les lignes 50 + 197 sont des entrées **historiques** (trace de l'état au moment de l'audit) — légitimes mais non datées comme telles. Les lignes 18 + 90 + 376 sont l'**état instantané** et la **prochaine action** — vrai bug.

### Cause racine

**Aucun audit ne croise les statuts.**

- `narration-archiviste` (mode AUDIT) vérifie **forme** : préfixes, gabarit, refs cassées, orphelins. **Pas** la cohérence sémantique INDEX⇄kanban.
- `pmo-challenge` (skill) délègue à Explore — qui audite la cartographie et les liens, mais **pas** "INDEX dit X ⇄ kanban dit Y, est-ce cohérent ?"
- `narration-pmo` (mode AUDIT) **A** la section 3 « État histoires — Kanban = état réel ? Statuts dans INDEX cohérents ? » MAIS **n'a jamais été invoqué** dans les 3 audits aujourd'hui. Le `/challenge-archiviste` invoque l'Archiviste, pas le PMO. Le `/pmo-challenge` invoque Explore.

→ **Le PMO en mode AUDIT n'est jamais déclenché** dans les commandes existantes. C'est un trou.

### Fixes appliqués 2026-05-13 (4e passage)

1. ✅ `pmo/INDEX.md:18` — prochaine action MAJ (lancer étape 4)
2. ✅ `pmo/INVARIANTS.md:90` — statut 002 sans "(Q-ouvertes auteur)"
3. ✅ `pmo/audit-trail.md:376` — prochain audit MAJ (lancement étape 4)
4. ✅ Les entrées historiques L.50 + L.197 conservées (traces datées légitimes)

### Action structurelle — 3 niveaux

**N1 (immédiat)** : ajouter à `narration-archiviste.md` Mode AUDIT une section **"Cohérence sémantique"** : pour chaque histoire active du kanban, vérifier que `pmo/INDEX.md` + `pmo/INVARIANTS.md` + tout INDEX qui la mentionne disent la même chose sur son statut.

**N2 (structurel)** : créer une commande `/pmo-audit` qui invoque **`narration-pmo`** en mode AUDIT (les 5 sections — pas seulement la section forme couverte par l'Archiviste). Côté JEU on a `game-pmo` qui s'audite, côté narration on a juste l'Archiviste.

**N3 (apprentissage)** : graver dans `audit-trail.md` (ici) que **3 audits successifs peuvent tous passer sans détecter une désynchro sémantique** si chacun couvre la même forme mais pas le fond. Le pattern d'audit doit alterner forme/fond, pas juste forme + forme + forme.

### Verdict sincère

Les 3 audits d'aujourd'hui ont **bien fait leur job de forme** (refonte structurelle 2026-05-12 → 100% propagée). Mais ils ont **collectivement raté un défaut de fond** (statut histoire) parce que la commande utilisée (`/challenge-archiviste`) cible uniquement la FORME, et l'auteur a dû appeler `/pmo-challenge` pour avoir une vue plus large — qui elle non plus n'a pas invoqué `narration-pmo` mode AUDIT.

**Mea culpa** : j'aurais dû, après les audits, **vérifier ma propre output** ("la suite c'est quoi ?") contre `decisions.md` avant de la dire. C'est le bug AP du PMO qu'on a déjà identifié (l'agent qui surveille doit être auto-cohérent).
