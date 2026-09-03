# État des lieux cartographique — Pôle NARRATION

> Audit complet 2026-07-27 (session Kimi Code, 6 zones explorées en parallèle).
> Objectif Papa Yann : « tout à sa place, retrouvable en 1-2-3 clics via des INDEX bien placés ».
> Méthode : inventaire + référencement croisé (grep) + vérification de liens + compteurs réels vs déclarés.
> Détail brut des 6 rapports de zone : fichier de sortie AgentSwarm de la session (tool-results).

---

## 0. Verdict global

Le pôle est **structurellement sain dans son ossature** (4 piliers + PMO + PROCESS + rules + agents + skills : tout existe, tout est déclaré) mais **dérégulé dans ses métadonnées** : compteurs faux propagés en chaîne, INDEX incomplets, backlog doublonné, 2 forks de contenu canon non tranchés, et une couche de docs mortes (duel, panel 20, roadmap) jamais enterrées après décisions.

**L'ossature tient. La signalétique ment.** Conséquence concrète : un agent qui suit les INDEX lit des chiffres faux (218 prénoms, 20 lecteurs, 15 masterclasses, « 002 brainstorm en cours ») et peut écrire sur des bases contradictoires (sensibilités T6/T8).

Échelle : ~679 fichiers audités côté stories/equipe, 108 personnages/univers, 70 cross-culture/saisons, 26 agents, 9 rules, 19 fichiers craft, 18+ archives.

---

## 1. 🔴 Décisions Papa Yann requises (bloquantes — fond, pas forme)

| # | Sujet | Le conflit | Fichiers en jeu |
|---|-------|-----------|-----------------|
| D1 | **Fork sensibilités T6/T8** | Camp A (INDEX personnages, casting-mapping, theorie, décision 2026-04-28) : Pierrot=**Animaux**, Juju=**Plantes**. Camp B (fiches vivantes type-06/08 README+alive, univers/sensibilites.md) : Pierrot=**Plantes**, Juju=**Animaux**. Même date (2026-06-03), impossible à trancher par métadonnées. La décision formelle 2026-04-28 = camp A, mais les writers lisent le camp B. | 9 fichiers listés §3.1 |
| D2 | **WEX WORLD** | Décision du 2026-07-19 gravée uniquement en note de backlog. `INDEX.md`, `pmo/INDEX.md` disent encore « non tranché », ticket UNIVERS-001 ouvert, nom-candidats.md non mis à jour. → Graver dans decisions.md + clore UNIVERS-001 ? | decisions.md, 2 INDEX, backlog, nom-candidats |
| D3 | **Canon 001 — chaîne perdue** | `7-rewrite/kimi-rewrite-v2.md` (source du canon !), `8-gatekeeper-verdict.md`, contenu `9-relecture-rewrite/` : **absents du disque** alors que le kanban revendique PASS 24/24. Et `v1-2026-04-24.md` perdu (jamais commité). → Restaurer depuis git si possible, sinon documenter la perte. | stories/001/, decisions.md:2864 |
| D4 | **002 vague 6 — 14 versions** | 6 références disent « 11 versions archivées dans `_archive/vague-6-writers-full/` » (dossier inexistant). Réalité : les 14 versions sont au niveau courant dans `4-versions-writers/`. → Recréer l'archive ou corriger les 6 refs ? | kanban 002, decisions, sprint-log, pmo/INDEX |
| D5 | **Wex sensibilité** | NARR-003 dit « à définir », mais `wex/personnage.md` + `univers/fondements/sensibilites.md` l'affichent déjà « Vibration transversale ». → Officialiser (et fermer NARR-003) ou remettre au conditionnel ? | 3 fichiers + backlog |
| D6 | **Rotation des logs PMO** | decisions.md = 239 Ko / 3680 l., sprint-log = 164 Ko / 2308 l., audit-trail = 63 Ko. Aucune rotation prévue. → Rotater (ex. par semestre, archives datées) ou assumer l'append-only géant ? | pmo/ |
| D7 | **Prénoms brésiliens** | `prenoms/INDEX.md:182` demande une fiche « brésilien lusophone moderne » — mais 10 prénoms lusophones modernes sont déjà dans `bresilien-tupi-orisha.md`. → Fiche séparée ou fusion actée ? | prenoms/ |

---

## 2. ✅ Ce qui est SAIN (ne pas toucher)

- **Rules** : 9/9 path-scoped, 36/36 chemins déclenchés valides, ~50 liens internes OK. Doublon rule↔PROCESS assumé et balisé.
- **Agents** : 13/13 narration référencés dans ORGANIGRAMME. 26 fichiers total, frontmatters propres.
- **Skill narration-craft** : 18/18 sous-fichiers couverts par SKILL.md.
- **Hooks** : 4/4 scripts settings.json présents, 3/3 hooks Kimi déclarés et branchés, logique Claude/Kimi identique.
- **INDEX racine narration** : 70 cibles testées, 0 lien mort.
- **lookup.yml ↔ casting figé** : 10/10 frontmatters FR cohérents. voice-map.json ↔ voix.md T6/T7 ✓.
- **univers/INDEX.md** : complétude bidirectionnelle parfaite (modèle à copier).
- **9 fiches type-NN** : 45 fichiers, toutes sections du gabarit présentes.
- **onomatopees** : 37 entrées exactes, bien référencé.
- **gout/memoire-papa-yann.md + palmares-writers.md** : vivants, à jour (2026-07-08).
- **INVARIANTS chiffres writers** : 14 writers ✓ = disque, 12 calls ✓ cohérent DEC-PANEL-V2.
- **Stories 003-008** : 14 writers + 12 lecteurs + synthèses bien sur disque partout.
- **002/_archive** : seul archive bien README-tée (4 README datés avec raisons).
- Pas de mojibake dans personnages/, univers/, cross-culture/, saisons/, .claude/.

---

## 3. 🔴 Problèmes de FOND (hors décisions §1)

### 3.1 Panel 20 → 12 calls JAMAIS propagé (ticket PROPAGATE-DEC-PANEL, 3 semaines de retard)
Source de vérité INVARIANTS OK. Contredisent : `equipe/profils-lecteurs.md` (titre « Panel 20 OBLIGATOIRE »), `ORGANIGRAMME.md:47,86`, `PROCESS.md` (L36, 40, 237-241, 245, 312-313, 317), **`.claude/rules/stories-process.md:20,24` (auto-injectée à chaque touch stories/** !)**, `stories/_gabarit/README.md:47` (`lecteurs_planifies: 20` → propagé à chaque nouvelle story), libellés kanbans 003/004/005/007/008.

### 3.2 Duel de goût mort, docs vivantes
Décision « duel on vire » 2026-07-13 (decisions.md:39, _archive/INDEX:23). Pointe encore comme outil actif dans : `gout/README.md:25,27,52`, `PROCESS.md:255`, `narration/INDEX.md:135`, `memory/state.md:33`.

### 3.3 `_writer-system.md` en 3 copies « source de vérité »
`saisons/saison-1/arc-1/_writer-system.md` et `equipe/_writer-system.md` se déclarent tous deux « source de vérité » (corps identique au caractère) ; le pipeline lit la copie equipe. 3ᵉ copie dans `.claude/agents/narration-writer-claude-libre.md`.

### 3.4 Kanbans / statuts stories désynchronisés
- 004, 005 (étape 5 marquée ⚪, faite sur disque), 008 (étapes 4 ET 5 ⚪, faites).
- README 003-008 : `statut: pitch/briefs` alors qu'étape 5 terminée partout (sauf 001 canon, 002 lecteurs).
- `stories/INDEX.md` : « prochaine = 003 » (réalité : 009), date d'en-tête périmée, « P1-P7 » vs P1-P10 réel.

### 3.5 État production figé dans les sources de vérité
- `INVARIANTS.md:249-253` : « 003+ à démarrer » (faux : étape 5 terminée ×6).
- `saisons/INDEX.md:13`, `saison-1/INDEX.md:12`, `arc-1/INDEX.md:14-15`, `arc-1/fiche.md:109-115` : « 002 brainstorm en cours, 003-010 à venir ».
- `memory/state.md` (2026-07-10) : 002 « étape 4 », ignore 006-008.
- `pmo/roadmap.md` : entièrement périmé (2026-04-29, STORY-001-V2, arc 2).
- `equipe/arcs-narratifs.md:52` : arc 2 « en cours 1/5 canon » (en pause, 0 histoire).

### 3.6 Compteurs prénoms en cascade
Réel mesuré : **274 prénoms / 31 fiches**. Déclaré « 218 / 30 » dans : `prenoms/INDEX.md` (+ contradictions internes 28/30), propagé dans `cross-culture/INDEX.md:84`, `narration/INDEX.md:83`, `personnages/INDEX.md:118`, `cross-culture/README.md`. `france.md` (29 prénoms) **orphelin total**. Écarts : japonais 14→31, bresilien 14→24.

### 3.7 Craft count
« 15 masterclasses » (narration/INDEX:55, CLAUDE.md:105) / « 16 » (INVARIANTS:208) / réalité **18**. `16-oralite` marqué « gap à créer » dans CLAUDE.md:113 alors qu'il existe. Rule narration-craft.md omet `18-execution` (duplique la liste au lieu de pointer — cause de la désync).

### 3.8 Backlog.md pollué
- 5 tickets ✅ restés dans « En cours » (viole règle max 3 + « terminés en bas »).
- IDs dupliqués : TEST-PANEL-CALIBRATION (à faire ET terminé), ARCHI-006 (×2), ARCHI-009 (2 sujets différents même ID), ARCHI-014 vs ARCHI-014-TEMPLATE-BOUSSOLE, ARCHI-DUEL-001, ARCHI-LECTURE-001, CRAFT-001/002/003.
- Tickets morts ouverts : VOIX-001/002/003 (faits mai 2026), STORY-003..010 (formulation « après 002 validé » + IDs ne matchent plus les histoires réelles).
- Doublons sémantiques : CROSS-002↔UNIVERS-004, CROSS-003/004↔UNIVERS-005.
- Encodage CRLF + CR isolés (seul fichier du pôle dans cet état).

### 3.9 Règle 48h INBOX violée massivement
- `INBOX.md` : ~7 sections brutes 2026-04-26/27 non marquées distillées (contenu déjà dans univers/ via INPUT-001) + pied de fichier contradictoire « INBOX vide ».
- `inbox/` : INPUT-004/005 tickétés mai, jamais exécutés. **Lot 28-cultures (~900 Ko, 5 fichiers) SANS ticket** depuis 6 semaines. 2 fichiers en mojibake (503 et 532 occurrences), noms avec espaces non datés (convention `YYYY-MM-DD-sujet.md` non tenue).

### 3.10 Contradictions diverses
- `equipe/brief-univers.md` : « vivant » (INDEX) vs « OBSOLÈTE 2026-05-15 » (cartographie-domaines).
- `equipe/_archive/README.md` : dit templates « à archiver plus tard » (fait 2026-06-14) + classe un template ACTIF parmi les obsolètes.
- `_VOICE-IDS-CASTING.md` : Lulu « figé » (L72) vs « bloqué » (L117, L145) — répercuté dans voix-meta/README.
- `arc-2-parole/fiche.md` : « histoires intactes » (L107) vs « supprimées définitivement » (L87).
- `equipe/INDEX.md` : Conventions « 10 versions writers » + canon `texte.md` (réalité : 14, `10-texte.md`) ; « 10 gabarits » (réalité 8+3) ; justification arcs-narratifs mensongère ; entrée `exemples-canoniques.md` → vide.
- `onomatopees/catalogue` : 17 pivots déclarés / 19 listés / 20 réels.
- `lecons-vivantes.md` : P8 et P9 en double (P1-P10 → P1-P13 réel), 2 caractères NEL.
- `tags-elevenlabs/0_SYNTHESE.md` : « Généré 17 juin 2025 » vs extraction 2026.
- `castings-nationaux/INDEX.md` : impose decor-local.md + lexique.md absents de fr/.

---

## 4. 🟠 Problèmes de CARTOGRAPHIE (le cœur de ta demande)

### 4.1 INDEX incomplets (complétude bidirectionnelle rompue)
| INDEX | Manque |
|-------|--------|
| `personnages/INDEX.md` | `voix-meta/` (20 fichiers !) et `_gabarit/` absents de l'arbre ; gabarit alive.md en retard (sections Pierre, Phrases types) ; Wex « enneagramme.md ABSENT » (il existe, stub) |
| `voix-meta/README.md` | 4 entrées manquantes (_NARRATEUR-TAGS, _TAGS-MAXPLAY-CURATED, voice-map.json, tags-elevenlabs/) ; « 11 persos » faux ; « Lulu bloqué » périmé |
| `prenoms/INDEX.md` | france.md absent + compteurs faux (§3.6) |
| `stories/INDEX.md` | brainstorm-arc-1.md absent (référencé par 3 autres INDEX) |
| `equipe/INDEX.md` | _writer-system.md, references/temperatures-llm.md, prompts-externes/, _archive/README absents |
| `pmo/INDEX.md` | audits/ absent de la table ; « 10 versions/20 lecteurs » doublement faux |
| `archive/README.md` | **liste 0 entrée sur 18 fichiers** (norme projet non tenue) |
| `gout/README.md` | retours/ non documenté (1 JSON orphelin, matière première de la mémoire de goût) |
| `_archive/narration-reference/INDEX.md` | baron.md absent de la table |
| `saisons/INDEX.md` | _gabarit-arc/ non listé |
| `studio/narration/INDEX.md` | diagramme omet inbox/, gout/, visual-identity/ ; archive/sessions partiel |

### 4.2 Orphelins notables (hors archives)
- `cross-culture/prenoms/par-culture/france.md` (29 prénoms, 0 référence)
- `personnages/_gabarit/` (orphelin + cassé : 4 templates manquants, liens morts)
- `voix-meta/tags-elevenlabs/0_SYNTHESE.md` + `enneatypes_narration.json` (index du cluster injoignable)
- `memory/business/livre-histoire-multinationaux.md` (50 Ko brut, 0 INDEX dans le pôle)
- `scripts/archive-story.js` (concept mort), `test-graphique-cris.js`, `test-wex-advanced.js` (one-shots)
- `gout/retours/2026-07-05-lecture-002-v5.json`
- `equipe/prompts-externes/_archives/` (5 prompts lecteurs)
- 7 × `stories/00N/variantes-culturelles/christ.patch` (placeholder propagé par gabarit)
- 001 : `001-studio-import.txt`, `concat-list.txt`, `_segments-001.json` (artefacts build)
- `.kimi-code/hooks/stop-probe.kimi.ps1` + `stop-payload.jsonl` (résidus sonde remplacée)

### 4.3 Gabarit stories auto-polluant
`_gabarit/_archive/` contient 3 templates OBSOLETE copiés tels quels dans les 6 stories 003-008 → **21 fichiers = 3 contenus uniques** (md5 prouvé), dont 9 copies du pitch-template et 9 du brief-univers comptant templates/_archive. Idem `6-selection.md` (vide, identique ×6), `10-texte.md` (placeholder ×7), `christ.patch` (×7), `_OLD-pitch-template.md` (×6).

### 4.4 Liens morts (hors §1) — ~35 au total
- `univers/vie-quotidienne/soin-bioelectrique.md` : 5 liens (monde.md ×2, systemes.md, INDEX, architecture-cross-culture→doctrine)
- `cross-culture/doctrine.md` : 5 liens (sensibilites, soin-bioelectrique ×2, catalogue-prenoms ×2 + compteurs périmés)
- `personnages/` : notation-types→prénoms-par-origine (→ archive/), type-06/07/voix.md → caractere/relations/sensibilite.md (fusionnés 2026-05-14), _ALIAS-TAGS-CATALOG, _PROMPTING-GUIDE, pedagogie-enfance→agent inexistant (mauvaise profondeur + agent supprimé)
- `PROCESS.md:292` → equipe/onomatopees-cross-culture.md (vrai : cross-culture/onomatopees/catalogue)
- `.claude/agents/narration-audio-writer.md:14` → skill 11-youth inexistant (absorbé par narration-craft)
- Chemins `~/.claude/` vs projet confondus : minijeux/INVARIANTS:17 (tile-tools), _archive/INDEX:86 + backlog:30 (narration-craft)
- En-têtes Usage des 5 scripts : `narration/scripts/` au lieu de `studio/narration/scripts/`
- `project_bioresonance_natation.md` : 4 références, 0 fichier
- `_archive/INDEX` et permissions settings.json (~50 allow morts — bruit)

### 4.5 Encodage / technique
- **`.claude/hooks/signal-detector.ps1` : UTF-8 sans BOM** → ~12 keywords accentués SILENCIEUSEMENT MORTS côté Claude (PS 5.1 parse en ANSI). Versions Kimi OK (BOM présent).
- BOM UTF-8 sur 16 fichiers md de la zone stories/equipe + type-03/voix.md (casse l'ancre).
- Mojibake : `inbox/culture faune et flore.md` (503), `inbox/culture jeu et repas.md` (532), `archive/inputs-historiques/2026-04-13-20-echange-telegram.md` (146).
- NEL (U+0085) ×2 dans lecons-vivantes.md.
- Résidus : 8 `.gitkeep` dans dossiers non vides ; marqueurs hétérogènes `_OLD-/OBSOLETE-/PERIME-/PRE-/ANNULE-` ; conventions `archive/` vs `_archive/` mélangées.
- Gap parité Kimi : les 5 rules narration n'ont AUCUN rappel côté Kimi (figees-injector ne couvre que mini-jeux + dino).
- `equipe/INDEX.md` : narration-audio-writer absent de l'arbre de décision.

---

## 5. 🎯 Cartographie cible proposée

Principe directeur (déjà dans DOCTRINE) : **« pointe, ne recopie pas »**. Chaque donnée a UNE source canonique ; tout le reste pointe.

### 5.1 Matrice des sources canoniques (à graver dans pmo/INVARIANTS ou DOCTRINE)
| Donnée | Source canonique UNIQUE | Pointeurs actuels en dérive |
|--------|------------------------|------------------------------|
| Chiffres PROCESS (14 writers, 12 calls, étapes) | `pmo/INVARIANTS.md` | CLAUDE.md, pmo/INDEX, PROCESS, rules, gabarit, ORGANIGRAMME, profils-lecteurs |
| Casting + sensibilités | `personnages/INDEX.md` (table) + `lookup.yml` (tokens) | casting-mapping, theorie/README, type-NN/README, sensibilites.md |
| Compteurs prénoms | `prenoms/INDEX.md` (générés, pas en dur — voir 5.3) | 4 INDEX en cascade |
| État stories | `stories/INDEX.md` (régénéré par script) | saisons/*, memory/state.md, INVARIANTS §Histoires, kanbans, README stories |
| Nombre masterclasses craft | `narration-craft/SKILL.md` | CLAUDE.md, INDEX, INVARIANTS, rule |
| Nom de l'univers | `pmo/decisions.md` (DEC) | INDEX, pmo/INDEX, backlog, nom-candidats |
| _writer-system | `saisons/saison-1/arc-1/_writer-system.md` OU equipe (trancher) | 3 copies |

**Règle d'écriture** : tout chiffre volatil (compteurs, statuts, étapes) est soit généré par script, soit exprimé en relatif (« voir X »), jamais recopié en dur.

### 5.2 Plan d'exécution en 3 phases

**Phase 1 — Réparations mécaniques** (aucune décision, ~60 micro-fixes)
1. Réparer les ~35 liens morts (cibles exactes identifiées par zone).
2. Propager panel 12 (7 fichiers dont la rule auto-injectée + le gabarit).
3. Enterrer le duel (4 fichiers) ; corriger PROCESS.md:255.
4. Backlog : purger doublons, déplacer ✅ en Terminés, clore tickets morts, convertir LF.
5. Synchroniser kanbans 004/005/008 + statuts README 003-008 + stories/INDEX (prochaine 009, brainstorm-arc-1).
6. Compteurs prénoms (274/31, france.md) + propagation 4 INDEX.
7. Craft count → pointer vers SKILL.md (zéro chiffre en dur) + rule 18-execution.
8. Compléter les INDEX : personnages (voix-meta, _gabarit), voix-meta/README (4 entrées), equipe (4 entrées + conventions), pmo/INDEX (audits), gout (retours/), _archive/narration-reference (baron), saisons (_gabarit-arc).
9. Encodage : BOM signal-detector.ps1, mojibake ×3 fichiers, NEL ×2, BOM type-03/voix.md, CR isolés backlog.
10. Résidus : stop-probe + stop-payload → _archive ; .gitkeep ×8 ; agent narration-audio-writer dans arbre équipe ; fix agent audio-writer (skill 11-youth → narration-craft/05).
11. archive/README → INDEX 18 entrées ; corriger equipe/_archive/README.
12. Scripts : en-têtes Usage + sort archive-story.js ; INVARIANTS §Histoires + calibration ; decisions.md queue (Q panel ⏳→✅, Q4 memoire-architecte) ; INBOX.md marquer distillé + fixer le pied.
13. Créer ticket INPUT-006 (lot 28-cultures) + renommer fichiers inbox selon convention.

**Phase 2 — Décisions gravées + canon** (après tes tranchages D1-D7)
- Graver WEX WORLD (decisions.md) + aligner INDEX/pmo-INDEX + clore UNIVERS-001 + nom-candidats.
- Aligner le camp perdant T6/T8 + Wex sensibilité.
- Trancher _writer-system source unique ; 002 vague-6 (archive ou refs) ; canon 001 (restauration git ou perte documentée) ; v1-2026-04-24.
- Dépolluer `_gabarit/` (sortir les OBSOLETE, statut de 6-selection/10-texte/christ.patch) + nettoyer les 21 copies md5-identiques (README pointeurs ou suppression selon règle « rien n'est effacé »).

**Phase 3 — Structure durable** (anti-récidive)
- `scripts/generate-index.js` étendu : régénérer compteurs (prénoms, craft, stories) dans les INDEX — ou hook pre-commit.
- Convention unique archive : `_archive/` partout + README obligatoire (daté + raison) + marqueur unique `OBSOLETE-YYYY-MM-DD`.
- Rotation logs PMO (si D6 = oui).
- Parité Kimi : étendre figees-injector.kimi.ps1 aux paths narration (ou documenter le non-portage).
- env-compat-check : couvrir .claude/hooks/ (check BOM).
- settings.json : purge des ~50 permissions mortes (cosmétique).
- pmo/roadmap.md : réécrire ou supprimer.

---

## 6. Trace PMO

- Décision autonomie agent (début de session) : backlog.md note 2026-07-27.
- Cet audit : `pmo/audits/2026-07-27-etat-des-lieux-cartographie.md`.
