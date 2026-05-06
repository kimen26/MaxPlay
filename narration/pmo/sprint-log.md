# Sprint Log — PMO Narration

> Journal de bord des sessions.
> **En cas de reboot :** lire la dernière entrée (haut du fichier), section "État au reboot".
> Les entrées les plus récentes sont en haut.

---

## RAPPELS DATÉS (à vérifier au passage)

- **2026-05-25** : Kimi K2 series discontinuation officielle. Vérifier que `kimi-k2.6` reste maintenu (cf. `infra/mcp/MODELS.md`).
- **2026-05-31** : Fin de la promo DeepSeek -75% sur V4-Pro. **Vérifier le coût réel** des appels DeepSeek post-31/05 et basculer sur `deepseek-v4-flash` si trop cher (modifier le défaut dans `infra/mcp/server.ts`).
- **2026-07-24** : Dépréciation officielle des noms `deepseek-chat`/`deepseek-reasoner` côté DeepSeek. Déjà migrés vers V4 le 2026-05-07, OK.

---

## 2026-05-07 — Refonte LLM + casting writers 10 versions

**Objectif :** Mettre à jour modèles LLM (Grok 4.3, Kimi K2.6, DeepSeek V4-Pro), passer Claude writers en Opus 4.7, séparer writers libres et guidé.

**Fait :**
- [x] `infra/mcp/server.ts` patché (3 modèles + `reasoning_effort: low` Grok + `thinking: false` DeepSeek + suppression mode `story` Kimi)
- [x] `infra/mcp/MODELS.md` créé (config + dépréciations + historique)
- [x] `narration-writer-claude-libre.md` → Opus
- [x] `narration-writer-kimi-guide.md` créé (orchestrateur Sonnet qui appelle Kimi via MCP avec annexe AXES)
- [x] 2 templates briefs créés (`brief-writer-libre.template.md` + `brief-writer-guide.template.md`)
- [x] `equipe/PROCESS.md` mis à jour (8→10 writers, 4→6 lecteurs, étape 7 = consolidation explicite)
- [x] `pmo/decisions.md` : entrée 2026-05-07 documentée
- [x] Mémoire `feedback_kimi_mode_code.md` mise à jour (mode unique désormais)

**Reste à faire :**
- [ ] Tester casting 10 writers sur la prochaine histoire (005)
- [ ] Reboot Claude Code après ce commit pour recharger MCP avec les nouveaux modèles
- [ ] Vérifier `equipe/INDEX.md` + `cartographie-domaines.md` pointent bien vers les nouveaux templates

---

## 2026-05-06 — Relecture V2 du 001 + synthèse intégrée

**Objectif :** Lire la V2 (`rewrite-v2-correction`) de "Le Pont Cassé" et l'intégrer au classement global.

**Fait :**
- [x] Fiche enfant-fille V2 → `001-le-pont-casse/lecteurs-temoins/enfant-fille-v2-relecture-2026-05-06.md` (note 7,5/10)
- [x] Synthèse globale → `stories/SYNTHESE-2026-05-06.md` (complément à `ultime_debrief.md`)
- [x] Nouvel **AXE 6** identifié : faute volontaire + geste maladroit (= "ATENSION" + triangle de Juju)

**Verdict V2 :**
- **3ème** au classement toutes versions confondues (derrière 003-kimi-run1 et 004-kimi-run2 ex æquo)
- ATENSION = meilleur moment de toutes les versions lues
- Perte de Monsieur Ferretti = perte émotionnelle majeure → **canon V1 conservé**, V2 = variante d'étude

**À faire :**
- [ ] Compléter V2 avec les 5 profils manquants (enfant-garçon + 4 dyades)
- [ ] Décision PMO : ajouter AXE 6 au `ultime_debrief.md` ?
- [ ] Architecte : tester pour 005+ un adulte "présent mais non-résolutif"

**État au reboot :** V2 lue par 1 seul profil sur 6 — pas de canonisation à décider tant que les 5 autres profils ne sont pas lus.

---

## 2026-05-05 — Switch casting V1 : Type 4 Jérémie/M → Madeleine/F

**Objectif :** Rééquilibrer casting V1 français (3F/6M → 4F/6M) en basculant Type 4 de masculin vers féminin.

**Fait :**
- [x] `personnages/type-04/README.md`, `caractere.md`, `relations.md`, `pays/fr/identite.md` — réécriture prénom + tous pronoms
- [x] `personnages/type-01/relations.md` à `type-09/relations.md` — mise à jour pronoms T4 dans chaque relation
- [x] `personnages/wex/caractere.md` et `relations.md` — mise à jour pronoms T4
- [x] `enneagramme/casting-mapping.md`, `README.md` — table casting V1 mise à jour
- [x] `enneagramme/ressources/guide-auteur.md` — tous "Jérem" → "Madie"
- [x] `enneagramme/ressources/supplement-recherches.md` — section Type 4 + arc croissance mise à jour
- [x] `enneagramme/situations/emotions-universelles.md`, `interactions.md` — remplacements exhaustifs
- [x] `equipe/voix/type-04-jerem.md` → `type-04-madie.md` (fichier créé) + `voix/README.md` + `voix/_CHEATSHEET-WRITERS.md`
- [x] `univers/fondements/sensibilites.md`, `univers/vie-quotidienne/compagnons.md` — mises à jour
- [x] `pmo/decisions.md` — entrée 2026-05-05 ajoutée en haut

**Ancienne fiche supprimée :** `narration/equipe/voix/type-04-jerem.md` (remplacée par type-04-madie.md)

**État au reboot :**
- Casting V1 actualisé : **Wex + Melki(1,M) + Mimi(2,F) + Polo(3,M) + Madie(4,F) + Lulu(5,M) + Pierrot(6,M) + Raph(7,F) + Juju(8,F) + Nono(9,M)** = 4F/6M ✅
- Token `titi_4_fr` inchangé
- Toutes fiches perso réalignées, pronoms cohérents

---

## 2026-05-04 — Refonte 003-v2 Tour 2 (trio + variance + lecteurs + promesse du titre)

**Objectif :** suite leçons Tour 1, refonder briefs writers 003-v2 sur trio plus contrasté, abandonner angles imposés, étendre panel lecteurs, enrichir la patte.

**Fait :**
- [x] `equipe/patte-narrative-maxplay.md` — règle « promesse du titre » ajoutée sous pilier B
- [x] `equipe/memoire-conseiller.md` — section *Patterns sélection — observations Tour 1 003-v2* (sons-bouche, comparaisons domestiques, ouvertures courtes, corps qui participe — règles de sélection, pas de brief)
- [x] `personnages/INDEX.md` vérifié — fiche Raph (T7, F, Raphaëlle, Cosmos) cohérente, pas de modif nécessaire
- [x] `stories/003-le-pont-casse-v2/briefs/brief-personnages.md` — refondu : trio Wex+Raph+Pierrot avec exemples concrets situation-type (nid d'oiseau)
- [x] `stories/003-le-pont-casse-v2/briefs/_writer-package.md` — refondu : trio remplacé, règle promesse du titre, variance "8 runs natifs"
- [x] `stories/003-le-pont-casse-v2/briefs/brief-histoire.md` — trio + promesse + variance natifs
- [x] `stories/003-le-pont-casse-v2/briefs/brief-univers.md` — trio + promesse + variance natifs
- [x] `stories/003-le-pont-casse-v2/kanban.md` — étape 4 réinitialisée (🟡), étape 5 réinitialisée (6 témoins), journal Tour 2 ajouté
- [x] `pmo/decisions.md` — entrée 2026-05-04 ajoutée en haut

**À faire (post-validation Papa Yann) :**
- [ ] Étape 4 — lancer 8 runs natifs (4 LLM × 2 runs, températures différentes — ordre à confirmer Papa Yann)
- [ ] Étape 5 — recruter/préparer les 6 lecteurs (2 enfants seuls + 4 dyades)

**État au reboot :**
- Briefs Tour 2 propres et cohérents, en attente GO Papa Yann
- Question ouverte : ordre températures (run #1 basse / run #2 haute, ou inverse)
- Tour 1 supprimé (versions-writers/ et lecteurs-temoins/ vides), leçons capitalisées en mémoire Conseiller

---

## 2026-05-03 — Refonte writer-package + PMO relecteur briefs

**Objectif :** finaliser brief writer 003-le-pont-casse-v2 prêt pour étape 4, ajouter rôle PMO relecteur.

**Fait :**
- [x] 14 corrections package writer appliquées par Directeur (mots interdits explicites, passé simple retiré, tirets cadratins retirés, exemples de bugs 002 retirés, morale reformulée, dialogue 30% ajouté, etc.)
- [x] 3 corrections supplémentaires Papa Yann en direct (3e tour) : "pas de pouvoirs Wex" retiré, "détails sensoriels distribués" retiré (au choix), "le texte finit là où il finit" retiré (négation gratuite)
- [x] `equipe/patte-papa-yann.md` aligné : critères 9 + 13 marqués retirés du brief writer
- [x] `.claude/agents/narration-pmo.md` enrichi : nouveau rôle "Relecteur des briefs writers" (grep négations + test règle F + alerte Directeur, sans corriger soi-même)
- [x] `pmo/decisions.md` : 2 entrées 2026-05-03 ajoutées en haut (PMO relecteur + retrait critères 9/13)
- [x] `pitch.md` 003-v2 : "pas dans ses pouvoirs" → "hors-système"

**À faire (post-validation Papa Yann) :**
- [ ] Étape 4 — lancer 8 runs writers (4 base + 2 Claude angularisés + 2 Kimi angularisés)
- [ ] Test 1 (001 V2 correction) en attente relecture Papa Yann

**État au reboot :**
- writer-package.md propre, validé sur 14 + 3 corrections
- PMO acquiert le rôle de relecteur des briefs writers à partir de la prochaine histoire
- Les passes futures auront 4 niveaux : Conseiller (pitch) → Architecte (plan minimal) → Directeur (briefs) → PMO (passe relecture négations) → Papa Yann (validation finale) → Writers (étape 4)

---

## 2026-05-02 (Phase E ~17h) — Lancement 2 tests PROCESS en parallèle

**Objectif :** démarrer TEST-PROCESS-001 (correction) et TEST-PROCESS-003 (from-scratch) en parallèle, chef d'orchestre PMO.

**Fait :**
- [x] Créé dossier `narration/stories/003-le-pont-casse-v2/` depuis gabarit unifié
- [x] Initié `003-le-pont-casse-v2/README.md` avec frontmatter (numéro 003, statut pitch, arc 1)
- [x] Initié `003-le-pont-casse-v2/kanban.md` (étape 1 EN COURS, owner narration-conseiller, validations Papa Yann après étape 1 ET 3)
- [x] Créé `003-le-pont-casse-v2/pitch.md` (placeholder en attente remplissage Conseiller)
- [x] Mis à jour `001-le-pont-casse/kanban.md` — ajout section V2 tests, validation étape 7 (rewrite) V2 correction
- [x] Ouvert 2 tickets dans `pmo/backlog.md` :
  - `TEST-PROCESS-001` — Directeur seul (correction appliquée sur 001 V1)
  - `TEST-PROCESS-003` — Conseiller + équipe (PROCESS complet 9 étapes, pitch challengé en binôme)
- [x] Mis à jour `stories/INDEX.md` — ajout ligne 003 status pitch

**Décisions autonomes (PMO) :**
- ✅ Tickets ouverts dans backlog (règle : max 3 actifs ne s'applique pas aux tests PROCESS — exceptions explicitées dans `decisions.md` 2026-05-02)
- ✅ Dossier créé + structure fichiers minimale
- ✅ Kanban de 001 marqué V2-correction en cours (étape 7)

**À faire (agents) :**
- [ ] TEST-PROCESS-001 : `narration` applique retours Papa Yann sur 001 V1 → `rewrite/v2-correction.md`
- [ ] TEST-PROCESS-003 : `narration-conseiller` produit pitch en binôme Papa Yann, puis validation Papa Yann explicite, puis relai Architecte étape 2

**État au reboot :**
- 2 tests démarrés 2026-05-02 Phase E
- Dossier 003-v2 créé, structure ready
- TEST-PROCESS-001 : Directeur attendre instructions
- TEST-PROCESS-003 : Conseiller débute pitch (étape 1 🟢 EN COURS)
- Note : question ouverte de Conseiller (fin inachevée douce vs fin qui referme) à trancher sur le from-scratch

---

## 2026-05-02 (suite, ~15h30) — Bug agents résolu + Phase E démarrage imminent

**Contexte :** session interrompue avant lancement des 2 tests à cause de 5 agents non chargés par Claude Code (`narration-pmo`, `narration-architecte`, `narration-audio`, `narration-gatekeeper`, `pixel-map-simplifier`).

**Diagnostic résolu :**
- Cause = caractères `:` interne et em-dash `—` dans `description:` non quotée du frontmatter YAML → rejet silencieux par le parser Claude Code
- Correctif : remplacer `:` par `-` ou `(...)` et `—` par `-` dans descriptions
- Règle documentée dans `.claude/agents/README.md` + lien ajouté dans `equipe/INDEX.md`

**Phase E à démarrer (post-compact) :**
- TEST-PROCESS-001 : 001 V2 chemin CORRECTION (Directeur seul applique retours Papa Yann)
- TEST-PROCESS-003 : 003-le-pont-casse-v2 chemin FROM SCRATCH (PROCESS militaire complet, pitch challengé Conseiller, validation Papa Yann après étape 1 ET 3)

**État au reboot/compact :**
- Tous les agents narration chargés ✅
- Règle frontmatter YAML documentée ✅
- 2 tests prêts à lancer en parallèle via PMO chef d'orchestre
- Reprise post-compact : invoquer `narration-pmo` en premier pour ouvrir tickets + créer dossier `stories/003-le-pont-casse-v2/` depuis gabarit, puis lancer `narration` (Test 1) et `narration-conseiller` (Test 2) en parallèle

---

## 2026-05-02 — Phase D Lecture critique Papa Yann + Suppression 003-006 + Lancement test refonte 001

**Objectif :** valider la lisibilité des 2 premières histoires canon et tester le nouveau PROCESS militaire.

**Fait :**
- [x] Lecture critique Papa Yann des 3 histoires existantes (001 canon, 002 canon, 003 rewrite GateKeeper-PASS)
- [x] Verdict 001 : V2 nécessaire (refonte intégrale via PROCESS — adulte Ferretti à retirer, ennéatype Juju/Melki à vérifier, narration jugeante, épilogue italique)
- [x] Verdict 002 : V2 nécessaire (casting Nono+Polo phonétique, incohérence physique ballon, expression inventée, style saccadé)
- [x] Verdict 003 : ABANDONNÉE puis SUPPRIMÉE
- [x] **Patte Papa Yann formalisée** dans `equipe/patte-papa-yann.md` — 7 reproches récurrents + 14 critères checklist
- [x] **GateKeeper renforcé** : passage de 15 critères techniques à 26 critères (techniques + patte Papa Yann)
- [x] Brief writer mis à jour avec checklist anti-Papa Yann express
- [x] **Renommage John → Papa Yann** dans 24 fichiers
- [x] **Suppression définitive** des dossiers `stories/003-la-confidence/`, `stories/004-cartable-a-trou/`, `stories/005-le-mardi/`, `stories/006-sept-a-rien/` (aucun n'avait été validé par Papa Yann)
- [x] Idée *concours de dessins en lieu public bienveillant* sauvegardée dans `axes-histoires-en-stock.md` (axe A3-06)

**À faire (en cours) :**
- [ ] **Test 1 : 001 V2 chemin CORRECTION** — Directeur seul applique les retours Papa Yann sur la V1 → produit `stories/001-le-pont-casse/rewrite/v2-correction.md`
- [ ] **Test 2 : 001 from scratch** — relancer le PROCESS militaire complet sur le même sujet (pont cassé) → nouveau dossier dans le slot 003. Papa Yann valide après étape 3 (briefs writers complets) AVANT que les writers écrivent.

**État au reboot :**
- 2 histoires existantes : 001 (V2 nécessaire) + 002 (V2 nécessaire, en pause arc 2)
- 2 tests en cours sur 001 (CORRECTION en parallèle de FROM SCRATCH)
- Phase A (cadrage) + B (migration) + C (cascade) + D (lecture critique) toutes terminées

---

## 2026-04-28 — STORY-003 "La Confidence" — Pipeline complet 8 writers

**Objectif :** Lancer STORY-003 avec le nouveau workflow 8 writers + angles assignés.

**Fait :**
- [x] 3 briefs produits (univers + personnages + histoire) dans `workshop/003-la-confidence/`
- [x] 8 versions écrites parallèlement (Kimi 1/2 · DeepSeek 1/2 · Grok · Claude Libre · Claude Dialogue · Claude Ancré)
- [x] Synthèse Directeur : analyse comparative des 8 versions
- [x] version-finale.md rédigée (~520 mots · Wex · Jérem · Raph)
- [x] Relecture simulée (Kimi + Claude) — 5 remarques prioritaires
- [x] Keeper PASS — 8/8 critères validés
- [x] Longueur : ~520 mots (fourchette 400-700 ✅)
- [x] Dialogues : Jérem 6 répliques, Wex 7, Raph 2 ✅

**À faire :**
- [ ] Canonisation (texte.md + README.md + orchestration.md)
- [ ] Comité de lecture (optionnel — 3ème histoire de la série, pas de nouveau perso principal)
- [ ] Mémoires à mettre à jour (conseiller + architecte + dir + gatekeeper)
- [ ] Index à régénérer

**Notes process :**
- Premier test du workflow 8 writers — fonctionnel
- Claude Dialogue très courte (157 mots) mais pertinente comme variant
- Kimi MCP toujours non testé — versions Kimi simulées par le Directeur
- Pattern "objet porteur" confirmé (dessin plié en quatre)
- Pattern "son qui porte" : zip cliqueta, papier craqua

**État au reboot :**
- STORY-003 en attente de canonisation
- 8 versions disponibles dans `workshop/003-la-confidence/`
- version-finale.md prête pour comité ou canon direct

---

## 2026-04-28 — Process complet · Série Parole · STORY-002

**Objectif :** Rodage du workflow éditorial complet. Écriture et canonisation de l'histoire 002.

**Fait :**
- [x] Création agents `narration-writer-claude-libre` + `narration-writer-claude-ancre` + `memoire-writer-ancre.md` *(anciens agents supprimés le 2026-04-28 — voir ARCHI-005)*
- [x] Création briefs stateless : `equipe/brief-univers.md` · `brief-personnages-template.md` · `brief-histoire-template.md` *(remplacés par `workshop/_gabarit/plan-histoire.md` le 2026-04-28 — voir ARCHI-005)*
- [x] ARCHI-004 soldé (process 5 writers — remplacé par ARCHI-005 à 4 writers)
- [x] Tickets STORY-002 à 006 ouverts (série "La Parole")
- [x] STORY-002 "Le Rire qui reste" — process complet : briefs → 5 writers → synthèse → relecture → GateKeeper PASS → canon
- [x] stories/002-le-rire-qui-reste/texte.md canonisé (489 mots · Wex · Nono · Polo)
- [x] STORY-003 "La Confidence" ouvert en cours

**À faire :**
- [ ] STORY-003 La Confidence (Wex · Jérem · Raph) — prochain cycle
- [ ] STORY-004 à 006 en file
- [ ] STORY-001-V2 en attente auteur

**Notes process :**
- Kimi MCP non fonctionnel (2 appels = vide) — à investiguer
- Décision éditoriale : pas d'épilogue italique à partir de 002 (Le Pont Cassé seul avec cette structure)

---

## 2026-04-27 — Architecture + setup PMO

**Objectif :** Nettoyer la structure docs/, créer le rôle PMO, trier les inputs.

**Fait :**
- [x] Pull git — 7 fichiers input-idees reçus (~2000 lignes : ennéatypes symboliques + JP Petit)
- [x] Suppression `histoires/` legacy → `axes-histoires-en-stock.md` migré dans `stories/`
- [x] Archive `UNIVERS-NOTES-BRUTES.md` → `archive/2026-04-13-univers-notes-brutes.md`
- [x] Suppression `docs/univers/` (dossier vide après archivage)
- [x] Création `game/docs/jeux/INDEX.md` (agent-ready)
- [x] Suppression `TODO-EDITORIAL.md` (doublon) + `atelier/` (doublon de `workshop/`)
- [x] Création `narration/pmo/` (INDEX, backlog, decisions, sprint-log, roadmap)
- [x] Création agent `narration-pmo`
- [x] Mise à jour `narration/INDEX.md` + `README.md` + `ORGANIGRAMME.md`
- [x] Agent `narration.md` mis à jour (chemins corrigés)

**À faire (prochaine session) :**
- [ ] INPUT-001 : distiller les 7 fichiers input-idees — trier par thème (ennéagramme symbolique / JP Petit)
- [ ] STORY-001-V2 : appliquer 3 modifs comité sur Pont Cassé
- [ ] Tester workflow PMO → Dir → 4 writers → GateKeeper sur un vrai brief

**État au reboot :**
- PMO opérationnel, structure propre
- 7 fichiers input-idees non distillés — contenu riche (ennéatypes, JP Petit, voix ElevenLabs)
- STORY-001 V2 en attente depuis 2026-04-24

---

## 2026-04-26 — Restructuration narration

**Objectif :** Migrer vers `stories/`, activer pipeline éditorial complet.

**Fait :**
- [x] Structure `stories/`, `workshop/`, `editorial-board/` *(supprimé le 2026-04-28, remplacé par `pmo/`)*, `_index/`
- [x] Template `_gabarit/`
- [x] Migration *Le Pont Cassé* → `stories/001-le-pont-casse/`
- [x] Scripts `new-story.js`, `archive-story.js`, `generate-index.js`
- [x] Mémoires writers + agent `narration-archiviste`
- [x] Premiers index `_index/` générés

**État au reboot :**
- Pipeline actif mais jamais testé end-to-end
- Writers externes + GateKeeper : jamais utilisés sur vrai brief avant le 2026-04-28

---

## 2026-04-24 — Casting V1 + comité Pont Cassé

**Objectif :** Figer casting, valider V1.

**Fait :**
- [x] Casting "Christ" validé (Wex + 9 Titi, prénoms bibliques)
- [x] Comité de lecture V1 — 3 modifs identifiées
- [x] Décision univers implicite + ennéatypes dilués

**État au reboot :**
- Casting figé (voir `decisions.md`)
- STORY-001-V2 ouvert
