# Décisions de fond — PMO Narration

> **Règle :** Une décision ici est DÉFINITIVE jusqu'à nouvelle décision explicite datée.

## 2026-05-13 — DEC-VOIX-JUJU : Voice ID T8 Challenger figé (méthodo v24 fille validée, 1 essai)

**Auteur (Papa Yann)** : création voice_id Juju 2026-05-13 via ElevenLabs Voice Design méthodo v24 transposée fille.

**Contexte** : T8 Challenger (Judith, Juju) — 6/10 voix figées depuis 2026-05-11/12. Restent 2 filles à créer (Mimi T2, Madie T4). Méthodo v24 garçons (header `Animated little guy voice`, physiologie aiguë, zéro négation) transposée fille via simple substitution `Animated little girl character voice` → validation empirique sur Juju en 1 essai.

**Décision tranchée** :

### Voice ID T8 Juju figé — méthodo v24 fille opérationnelle

**Identité voix** :
- **Voice_id** : `WFNYCPhDQM9w07KAV6Be` (créé 2026-05-13, 1 essai)
- **Naming ElevenLabs** : `Lumi Juju Solide` (adjectif "Solide" choisi anti-copie strict — alts testées : Ferme, Plantée, Ancrée, Solidaire, Forte → rejeté "Forte" qui expose ressort T8 "Être fort·e")
- **Méthodo** : v24 fille (header `Animated little girl character voice`, physiologie aiguë `high-pitched, bright, grounded, strong chesty edge`, zéro négation, < 1000 chars)
- **Prompt utilisé** : 858 chars, archivé dans `type-08/voix.md` L.33-36

**Voice settings recommandés** (utilisation TTS) :
```
Stability: 0.75
Similarity Boost: 0.65
Style: 0.50
Speaker Boost: true
```

**Description publique Voice Library** (stratégie impact pur, anti-copie) :
- **FR** (416 chars) : "La voix qui tient la main sans le dire. Une présence qui dit ce qui est, sans détour, et fait tenir ce qui vacille. Vous l'écoutez et le sol semble plus stable sous vos pieds. Conçue pour les contes qui rassurent, les héroïnes qui ne fléchissent pas, les livres illustrés 3-8 ans où la franchise est tendre. Une voix qui protège ceux qui en ont besoin, sans jamais peser. Celle qu'on appelle quand il faut tenir bon."
- **EN** (416 chars) : "The voice that holds your hand without saying so. A presence that says what is, plainly, and steadies what trembles. You listen and the ground feels firmer beneath you. Made for stories that reassure, for heroines who hold their ground, for illustrated books for ages 3-8 where honesty is tender. A voice that protects those who need it, without ever weighing them down. The one you call when you need to stand firm."

**Impact fichiers** :
- ✅ `pmo/INVARIANTS.md` § *Voice IDs* : Juju + voice_id + naming (L.119)
- ✅ `pmo/INVARIANTS.md` § *Casting figé* : passage 6/10 → 7/10 voix figées (L.108)
- ✅ `personnages/type-08/voix.md` : voice_id frontmatter + prompt v24 fille + voice settings + descriptions publiques FR+EN
- ✅ `personnages/voix-meta/_VOICE-IDS-CASTING.md` : section "État du casting filles" (Raph + Juju)
- ✅ `pmo/INDEX.md` : mise à jour statut voix

**Statut** : ✅ Voice_id figé. Prêt pour production audio story 002+ (étape 8 utilisation).

**Leçon gravée** (cf. `equipe/lecons-vivantes.md` § Découvertes méthodo voix) :
> *« OBS-METHODO-V24-FILLE-VALIDÉE : la méthodo v24 garçons (header `Animated little guy voice`, physiologie aiguë, zéro négation) se transpose en fille via seule substitution `Animated little girl character voice`. Validation Juju 1 essai = preuve empirique. À appliquer pour Mimi (T2) et Madie (T4). »*

**Bonus leçon nommage Voice Library** (anti-copie stratégie) :
> *« OBS-NAMING-ANTI-COPIE : adjectif choisi pour vendre l'impact sans révéler la recette ennéa. Juju "Solide" = court + percutant + vague (autorisé par framework description) + ne révèle pas T8 "Être fort·e". Alternatives : "Forte" = exposé direct (rejeté), "Plantée"/"Ancrée" = trop botanique. »*

---

## 2026-05-13 — DEC-RENAME-POLO-DADOU : Rename T3 Polo → Dadou (David, collision sonore Polo↔Nono)

**Auteur (Papa Yann)** : arbitrage direct 2026-05-13 sur collision sonore détectée.

**Contexte** : Polo (`o-o` trochée fermée-fermée) et Nono (`o-o` même trochée) = confusion probable à l'oral chez Max (4 ans). David (biblique, roi-harpiste-héros) = T3 Performeur aligné avec patte "casting V1 Christ" existante.

**Décision tranchée** :

### Rename T3 : Polo (Paul) → Dadou (David)

**Raison** :
- Éviter collision sonore à l'oral (4 ans comprend mieux Dadou vs Nono que Polo vs Nono)
- Dadou = hypocoristique courant brésilien (Davi → Dado/Dadinho/Dadou) — Max origines brésiliennes
- David biblique (T3 Performeur) = alignement casting V1 Christ (apôtres + figures roi)

**Voice_id CONSERVÉ** :
- ID : `5wcx0KzRnrP48I5RCVD8`
- Naming ElevenLabs : "Lumi Polo Fier" → "Lumi Dadou Fier" (renommage simple côté utilisateur, aucun new Voice Design)

**Impact fichiers** :
- ✅ `pmo/INVARIANTS.md` § *Casting figé* : Paul/Polo → David/Dadou
- ✅ `pmo/INVARIANTS.md` § *Voice IDs* : ligne Polo → ligne Dadou (voice_id identique)
- ✅ `narration/personnages/INDEX.md` § Casting V1 : type-03 Paul/Polo → David/Dadou
- ✅ `narration/personnages/lookup.yml` : entrée "titi_3_fr" Polo → Dadou (résolveur)
- 🔄 **~85 fichiers en cascade** (orchestrateur Claude, vérification narration-archiviste)
- ❌ **001-canon figé NON TOUCHÉ** (Polo n'y apparaît pas)

**Statut** : ✅ Décision figée. Propagation orchestrée en cascade.

**Leçon** (bonus gravée `equipe/lecons-vivantes.md` § Observations casting) :
> *« OBS-SONORITÉ-CASTING : collision trochée fermée-fermée (Polo↔Nono) détectable précocement lors du casting via phonétique 4-5 ans. Règle : avant de figer, tester trochées + diphtongues + répétabilité à voix haute. Dadou vs Nono = clair à l'oral. »*

**Point d'attention BONUS** : `.claude/rules/personnages.md` L.10-13 contient contradiction — table affirme "Melki F" mais `lookup.yml` = "Melki M" (source de vérité). À corriger en parallèle comme fix cohérence.

---

## 2026-05-13 — DEC-PANEL-20 : Panel lecteurs 20 OBLIGATOIRE toutes stories (correction erreur PMO dérive « transitoire 6 »)

**Contexte** : découverte erreur PMO 2026-05-13 — la mention « panel 6 transitoire pour STORY-002 » n'a **jamais été validée par l'auteur**. Cette dérive a été propagée en cascade dans INVARIANTS, décisions historiques, kanban 002, et plusieurs gabarits. Elle crée une confusion fondamentale : est-ce 6 ou 20 lecteurs pour STORY-002 ?

**Chaîne causale de l'erreur** :
1. Session 2026-05-12 : decision panel 20 tranchée (STORY-003+)
2. PMO a extrapolé : « si 20 dès 003, alors impliciitement 6 pour 002 » (FAUX)
3. Aucune DEC figée ni validation auteur pour cette dérive
4. Propagée dans INVARIANTS L.15-16, kanban 002, audit-trail mentions multiples
5. Audits 2026-05-13 l'ont laissée passer → auteur doit corriger

**Décision tranchée** :

### Panel 20 lecteurs OBLIGATOIRE pour TOUTES les stories (y compris 002)

**Raison** :
- Règle de cohérence : un standard, une seule courbe d'apprentissage
- STORY-001 canonisée = historique figé (panel observé réel, pas touché)
- STORY-002 + 003+ = panel 20 DÈS MAINTENANT, aucune transition
- « Transitoire 6 » était une dérive sans fondement — l'annuler évite une exception permanente

**Correction immédiate** :
- ✅ `pmo/INVARIANTS.md` L.15-16 : suppression « Transitoire 6 pour 002 »
- ✅ `pmo/INVARIANTS.md` L.152 : ajout « panel 20 lecteurs » dans statut STORY-002
- Propagation FORME (Archiviste) : kanban 002, gabarits, PROCESS, README, templates

**Statut** : ✅ INVARIANTS corrigés (source de vérité). Reste propagation Archiviste.

**Leçon gravée** (cf. `equipe/lecons-vivantes.md`) :
> *« OBS-PANEL-20 : PMO ne JAMAIS inventer une dérive (ex. « transitoire 6 ») sans validation explicite auteur. Quand un chiffre clé bouge, soit il existe une DEC datée + signée, soit il n'existe pas. L'extrapolation silencieuse = accumulation de contradictions. »*

---

## 2026-05-13 — DEC-NNN : Option A — Logs auto MCP créatifs (filet de sécurité writers étape 4)

**Contexte** : Session 2026-05-13 étape 4 STORY-002 — 14 writers lancés en parallèle. Pour les 7 MCP stateless (Kimi×3, DeepSeek×2, Grok×2), main thread reçoit texte via contexte puis fait Write tool. **Risque** : crash/OOM/interruption entre réception et Write → texte perdu.

**Décision tranchée** :

### Implémenter Option A : Logs auto côté `server.ts` (filet de sécurité)

**Raison** :
- Faible coût (~25 lignes code, import node:fs/promises + crypto)
- Faible risque (silent fail, gitignored, aucune exposition filesystem)
- Capture 95% du bénéfice d'une sauvegarde fiable sans l'overhead de permission injection
- Actif silencieusement — main thread continue sans friction

**Mécanique** :
- Chaque appel MCP (ask_grok, ask_kimi, ask_kimi_payant, ask_deepseek) logue **automatiquement** dans `infra/mcp/logs/<YYYY-MM-DD>/<timestamp>-<tool>-<hash>.md`
- Logs gitignored — jamais committés
- Filet capture : générations perdues → récupérables dans logs sur disque

**Impact fichiers** :
- ✅ `infra/mcp/server.ts` (L.82-113, ajout fonction logCall + param toolName à callOpenAICompat)
- ✅ `.gitignore` (ajout `infra/mcp/logs/`)
- ✅ `infra/mcp/MODELS.md` (section *Filet de sécurité* + historique 2026-05-13)

**Statut** : ✅ Implémenté + build `bun build` OK.

**Leçon** (gravée `equipe/lecons-vivantes.md` § Observations process) :
> *« Filet de sécurité préventif > écriture directe LLM. Pattern : quand agent stateless externe génère contenu coûteux passé par contexte, dump auto côté infra (silent fail) plutôt que droit filesystem. Évite prompt injection + écrasement involontaire tout en garantissant récupérabilité. »*

---

## 2026-05-12 — DEC-NNN : Renommage « max » → « reco » dans casting writers (convention sémantique)

**Contexte** : convention initiale du casting writers (étape 4) utilisait `max` pour désigner la température « plafond du fournisseur ». Or chaque fournisseur officiel recommande une valeur **inférieure au plafond** pour la creative writing (ex: Kimi 1.0 max, DeepSeek 1.5 créatif, Grok 1.2 créatif), différente du maximum absolu.

**Décision tranchée** :

### Renommer `max` → `reco` (valeur recommandée fournisseur creative writing)

**Raison** :
- Claude API doc : `temperature` max = 1.0 (= reco créatif et max identiques pour Opus/Sonnet/Haiku)
- Moonshot (Kimi) doc : max = 1.0, reco créatif = 1.0 (⚠️ au-delà = incohérence, + top_p: 0.95 obligatoire)
- DeepSeek API : max = 2.0, **reco créatif = 1.5** (officiel, pas 2.0)
- xAI Grok API : max = 2.0, **reco créatif = 1.2** (au-delà = perte cohérence narrative)

**Nouvelle convention** :
- `*-reco` = valeur **créative writing officielle** du fournisseur
- Ne **jamais** nommer un writer par `max` brut (trop ambigu sémantiquement)
- Référence stable : `narration/equipe/references/temperatures-llm.md` (à créer)

**Impact fichiers** :
- ✅ `equipe/references/temperatures-llm.md` (création) — table fournisseur + reco créatif par modèle
- 🔄 `pmo/INVARIANTS.md` (MAJ § Casting writers étape 4) — renommer colonnes `max` → `reco`
- 🔄 `equipe/PROCESS.md` (MAJ) — si mentions `max` température, renommer `reco`
- 🔄 `equipe/ORGANIGRAMME.md` (si applicable)
- 🔄 Agents writer (claude-libre, kimi-guide) — renommer `max` → `reco` en commentaires

**Statut** : ✅ décision figée, propagation en cours.

**Leçon gravée** (cf. `equipe/lecons-vivantes.md` § Observations process) :
> *« OBS-NNN : Convention casting v2 — "max" était trompeur sémantiquement. Au-delà de la reco créatif officielle = perte de cohérence narrative. À cristalliser : ne JAMAIS nommer un writer par "max" brut, mais par la reco officielle du fournisseur. Référence : equipe/references/temperatures-llm.md. »*

---

## 2026-05-12 — Q-OUVERTE-NNN : 3 limitations MCP `ask_kimi` détectées dans `infra/mcp/server.ts`

**Contexte** : audit du code MCP dans `infra/mcp/server.ts` L.82-113 révèle que l'endpoint utilisé pour Kimi n'expose pas toutes les options officielles Moonshot, bloquant certains designs de writers.

**Questions ouvertes** :

### Q-1 : Migrer `ask_kimi` de `kimi.com/coding` vers `platform.moonshot.ai` (API officielle) ?

**Limitation actuelle** : endpoint `api.kimi.com/coding/v1` + modèle `kimi-for-coding`.
- ✅ Passe-partout (accepte créatif)
- ❌ Pas l'API Moonshot officielle
- ❌ Pas accès à `top_p`, aux modèles K2.6/K2.5 explicites, au mode thinking

**Bénéfice migration** :
- Expose `top_p` (reco Moonshot créatif = `top_p: 0.95` couplé à température)
- Expose mode thinking (instant vs thinking — distinction writer #9 kimi-thinking non réelle aujourd'hui)
- Clarté modèle (K2.6 / K2.5 vs passe-partout `kimi-for-coding`)

**Coût** : modification `infra/mcp/server.ts` + re-déploiement.

**Priorité** : Normale. Bloquant pour writer #9 kimi-thinking être réellement différencié.

---

### Q-2 : Exposer `top_p` dans signature MCP `ask_kimi` ?

**Dépend de** : Q-1 (migration API).

**Bénéfice** : paramètre `top_p` utilisable dans briefs pour fine-tuning créatif selon Moonshot doctrine.

---

### Q-3 : Exposer mode `thinking` (instant vs thinking) dans signature MCP `ask_kimi` ?

**Dépend de** : Q-1 (migration API).

**Bénéfice** : writer #9 kimi-thinking devient réellement distinct (pas juste un alias sans raison).

---

**Statut** : ✅ Résolu 2026-05-12 par DEC-ARCHI-009 (voir ci-dessous).

---

## 2026-05-12 — DEC-ARCHI-009 : Cohabitation stricte MCP Kimi gratuit + payant (résout 3 Q-ouvertes)

**Contexte** : 3 Q-ouvertes sur MCP `ask_kimi` attendaient budget. Papa Yann tranche : **pas de migration**, mais **ajout d'un 2e MCP distinct**.

**Décision tranchée** :

### Ne PAS migrer `ask_kimi` existant — AJOUTER `ask_kimi_payant` distinct

**Raison** :
- Préserve usages gratuits existants (questions tech, exploration)
- Coûts engagés SEULEMENT sur les 2 writers qui en ont vraiment besoin (#8 kimi-reco, #9 kimi-thinking)
- Séparation totale : `ask_kimi` ≠ `ask_kimi_payant`, env var distincte, endpoints distincts
- Réversible facilement si Moonshot baisse les prix

**Nouvelle config** :
- **`ask_kimi`** (gratuit, endpoint `kimi.com/coding/v1`, env `MOONSHOT_API_KEY`) → writers #7 kimi-def + #10 kimi-guide + usage général
- **`ask_kimi_payant`** (officiel, endpoint `api.moonshot.ai/v1`, env `MOONSHOT_PAYANT_API_KEY`) → STRICTEMENT writers #8 kimi-reco (top_p 0.95) + #9 kimi-thinking (mode thinking)

**Impact fichiers** :
- ✅ `infra/mcp/server.ts` (L.82-113) — nouvel outil `ask_kimi_payant`, endpoint `https://api.moonshot.ai/v1`, modèle `kimi-k2.6`
- ✅ `infra/mcp/MODELS.md` — table modèles enrichie, section *Cohabitation stricte* explicitée (historique 2026-05-12 déjà là)
- ✅ `narration/pmo/INVARIANTS.md` (L.37-54) — casting writers étape 4 : #7 #10 → `ask_kimi` · #8 #9 → `ask_kimi_payant`
- 🔄 `narration/equipe/PROCESS.md` (étape 4) — si mentions MCP ancien, préciser distinction `ask_kimi` vs `ask_kimi_payant`
- 📝 **Action utilisateur** : créer env var `MOONSHOT_PAYANT_API_KEY` (clé Moonshot API officielle) au niveau Windows utilisateur

**Statut** : ✅ décision figée, 3 Q-ouvertes fermées.

**Leçon gravée** (cf. `equipe/lecons-vivantes.md` § Observations process) :
> *« OBS-NNN : Cohabitation > migration. Pattern : quand 2 usages divergents du même fournisseur, créer 2 MCP distincts avec env var distincte au lieu de retrofit destructif. Coûts localisés, usages préservés, réversible. Exemple : Kimi gratuit (coding) + payant (Moonshot API). »*

# Décisions de fond — PMO Narration

> **Règle :** Une décision ici est DÉFINITIVE jusqu'à nouvelle décision explicite datée.

## 2026-05-12 — DEC-NNN : Refonte casting writers étape 4 — 10 → 14 versions (calibration modèles + température)

**Contexte** : Papa Yann acte une refonte du casting writers étape 4 pour calibrer la config finale en testant tous les modèles (Opus/Sonnet/Haiku Claude + Kimi avec/sans thinking + DeepSeek/Grok) dans deux régimes de température (défaut vs max créatif).

**Décision tranchée** :

### Passage config writers de 10 à 14 versions — test calibration 3-5 histoires

**Raison** :
- Config 10 writers fixée trop tôt (début projet, avant leçons-vivantes consolidées).
- Pas de comparaison multi-modèles à température variable.
- Hypothèse à valider : top 1 provient-il du modèle le plus cher (Opus) ou peut-on avoir meilleure qualité de DeepSeek/Grok/Sonnet optimisés en température ?
- Test scientifique : 14 versions → comparaison top 1 par modèle → réduction config finale après 3-5 histoires.

**Nouvelle config (14 writers)** :
1-6. Claude : Opus/Sonnet/Haiku × (défaut 0.5, créatif 1.0)
7-10. Kimi : défaut + max + thinking + guidé
11-12. DeepSeek : défaut + max (1.5)
13-14. Grok : défaut + max (2.0)

Détail complet : `narration/pmo/INVARIANTS.md` § **Casting writers étape 4 (14 versions)**.

**Impact fichiers** :
- ✅ `narration/pmo/INVARIANTS.md` L.24-39 (table 14 writers + critères évaluation)
- 🔄 `narration/equipe/PROCESS.md` L.108-140 (tableau mécanique d'appel à adapter)
- 🔄 `narration/equipe/ORGANIGRAMME.md` (cohérence 3 Sonnet + 2 Haiku + adjusted Opus)
- 🔄 `narration/stories/<NNN>/briefs/brief-histoire.template.md` (section "angles assignés" → 14 variants ou simplifiée)
- 🔄 Agents writer : `narration-writer-claude-libre` (déployer 3 sous-modèles ?), `narration-writer-kimi-guide` (trame 002 ajoutée)

**Période d'évaluation** : 3-5 histoires (STORY-002 première à utiliser config 14).

**Réduction finale** : ticket `ARCHI-008` ouvert (voir backlog) pour arbitrage → config 6-8 writers optimaux après évaluation.

**Statut** : ✅ décision figée, config INVARIANTS MAJ, propagation en cours.

---

## 2026-05-13 (tard) — Tonalité STORY-002 Nono : discrétion + calme + connexion (zéro pouvoir manifeste)

**Contexte** : Papa Yann demande d'affiner la tonalité de Nono en STORY-002 pour éviter tout effet spectaculaire. "Je veux bien que le truc de sensibilité vibration, soit discret et lié à la terre, la magie c'est le calme et la 'connexion'".

**Décision tranchée** :

### Tonalité révélation Nono — Connexion discrète (pas de pouvoir manifeste)

**Clarification critère "Sensibilité Nono"** :

- ✅ **Connexion discrète à la terre** : ce que Nono sent (vibration subtile du sol, calme, résonance qu'on capte sans la nommer)
- ✅ **Magie = le calme et la connexion relationnelle** (pas un effet physique/visible)
- ❌ **Zéro pouvoir manifeste** : pas d'onde visible, pas de frémissement déclenché par le geste de Nono, pas d'effet miraculeux sur la libellule ou la terre
- ✅ **Présence qui se densifie** : Juju/Wex perçoivent que Nono est « plus là », plus ancré — effet intérieur/relationnel, pas spectaculaire

**Implication** : Deepseek-1 (version déjà écrite) introduit une onde visible + frémissement → **ne passe pas le contrôle qualité tonalité**. À redéverrouiller avec brief révisé.

**Briefs révisés** :
- `1-pitch-plan.md` L.26 : "Pas un pouvoir manifeste, une présence qui se densifie"
- `3-briefs/brief-histoire.md` L.36-41 : Ten = connexion discrète au sol, zéro effet visible, Juju perçoit une densité nouvelle
- `3-briefs/brief-personnages.md` L.51-57 : "le calme et la résonance qu'on sent sans le dire", "aucun miracle, aucune onde visible — juste une présence plus dense"

**Statut** : ✅ figée, briefs alignés, prêt étape 4 (deepseek-1 hors course, relancer 4 restants + 5 nouveaux = 9 writers libres).

---

## 2026-05-13 — Recentrage STORY-002 : sensibilité révélée Nono uniquement (décision finalisée)

**Contexte** : Papa Yann valide direction "Nono avec la terre" (connexion au sol, vibrations). Demande d'aligner les briefs sur **une seule sensibilité révélée** au lieu de deux (Juju Plantes + Nono Vibration).

**Décision tranchée** :

### Recentrage STORY-002 — Pivot dualité → monosensibilité

**Avant** : « Deux manières de sentir qui se rencontrent. » Juju révèle sa sensibilité aux plantes/racines, Nono révèle sa sensibilité aux vibrations.

**Après** : **Nono seul a sa sensibilité révélée — connexion à la terre (vibrations du sol).** Juju anime le Sho (contact incarné, énergie), est témoin du Ten de Nono. Pas de révélation de sensibilité pour Juju en STORY-002 (elle garde son sensibilité Plantes pour une future histoire).

**Pourquoi** : Trop de révélations simultanées diluait le dénouement. Ten plus lisible, plus discret, plus cohérent. Nono seul = focus narratif claire.

**Impact briefs** :
- ✅ `1-pitch-plan.md` L.24-26 — recentrage Ten sur Nono, geste libre au writer
- ✅ `3-briefs/brief-histoire.md` L.36-41 — Ten = moment Nono, Juju perçoit sans comprendre, pas révélation Juju
- ✅ `3-briefs/brief-personnages.md` L.51-55 — Juju "n'est pas le sujet de STORY-002", animatrice

**Règle archivée** : "Juju a sa propre sensibilité (aux plantes/racines), mais **elle n'est pas le sujet de STORY-002**."

**Statut** : ✅ finalisé, briefs recentrés 2026-05-12, prêt étape 4 (10 writers).

---

## 2026-05-12 (nuit) — Refonte structurelle PROCESS : 4 décisions

**Contexte** : audit post-pmo-challenge a révélé que pitch + plan sont devenus quasi-identiques depuis le passage au "plan léger". Auteur questionne la pertinence du dossier `briefs/`, des fichiers préfixés par étape, du README, et du rôle de l'Architecte.

**Décisions tranchées** :

### 1. Préfixer les fichiers du dossier story par leur étape
- `1-pitch-plan.md` (fusionné)
- `3-briefs/` (étape 2 supprimée car fusionnée à étape 1, mais le préfixe reste 3 pour cohérence PROCESS)
- `4-versions-writers/`
- `5-lecteurs-temoins/`
- `6-selection.md`
- `7-rewrite/`
- `8-gatekeeper-verdict.md`
- `9-relecture-rewrite/`
- `10-texte.md` (canon)

**Pourquoi** : ordre chronologique évident dans le file explorer. À reboot, n'importe quel humain voit où on en est sans lire le kanban.

### 2. Fusionner Pitch + Plan en `1-pitch-plan.md` (Conseiller seul, 1 validation auteur)
- Le plan léger (30-80 lignes) est intégré au pitch.
- 1 seule étape PROCESS au lieu de 2. Plus simple, moins de fichiers.
- 1 seule validation auteur.

**Pourquoi** : depuis la doctrine "plan léger" (2026-05-12), le plan ne contient plus le scénario phrase par phrase. Il contient juste les invariants structurels (Ki/Sho/Ten/Ketsu nommés, recentrage, garde-fous). C'est devenu du contenu de pitch enrichi.

### 3. Supprimer l'Architecte du PROCESS narratif + Élever l'Archiviste au rang de maillon central
- L'Architecte (`narration-architecte`, Sonnet) ne sert plus dans le workflow narratif.
- Sa **matière statique** (Kishōtenketsu, calibrage 4-5 ans) est **intégrée** dans la fiche `narration-conseiller.md` (qui s'en sert pour rappeler les invariants quand pertinent — "il faut penser à...", "attention à...").
- L'agent reste en standby (deprecated dans frontmatter) — pas supprimé pour traçabilité.

**Pourquoi** : la matière narrative que l'Architecte apportait est **statique** (Kishōtenketsu = toujours les mêmes 4 temps, boussole péda 4-5 ans = règles stables). Pas besoin d'un agent dédié à chaque histoire pour la rappeler — le Conseiller l'a intégrée. **Mise à jour ponctuelle ensemble** quand les leçons-vivantes évoluent (pas à chaque histoire).

### 4. Élever Archiviste au rang de **maillon central** du PROCESS militaire (équivalent PMO côté structure)
- L'Archiviste (`narration-archiviste`, Haiku) devient **proactif** comme le PMO (refonte 2026-05-12 Option B).
- **Invocation automatique** à chaque tour incluant un signal narration touchant **structure/fichier/dossier/gabarit**.
- **Binôme PMO ↔ Archiviste** : PMO gère le **fond** (décisions, backlog, sprint-log, INVARIANTS), Archiviste gère la **forme** (structure dossiers, gabarit respecté, INDEX cohérents, refs cassées). Les deux communiquent : Archiviste détecte un fichier orphelin → passe l'info au PMO via sprint-log. PMO détecte une décision impactant la structure → ping Archiviste pour propager.
- Ajout commande `/challenge-archiviste` (à créer comme skill ou simple invocation directe) pour audit structurel à la demande.

**Mission étendue Archiviste** :
- ✅ Création de module (déjà existant)
- ✅ Indexation (déjà existant)
- ✅ Vérification cohérence INDEX/dossiers (déjà existant)
- 🆕 **Vérification gabarit respecté à chaque modif de dossier story** (pas juste sur demande)
- 🆕 **Détection fichiers orphelins** (créés mais non référencés)
- 🆕 **Détection préfixes manquants** (post-décision 2026-05-12 sur préfixes étapes)
- 🆕 **Communication PMO** : passe TODO ou alertes via `sprint-log.md` ou ping direct

**Pourquoi maillon central** : la dette de coordination (audit du 2026-05-12) a montré que les angles morts structurels (workshop/ référencé partout, briefs/ avec fichiers interdits, kanban désaligné) viennent du fait qu'**aucun agent ne surveille la structure en continu**. Avec PMO proactif (fond) + Archiviste proactif (forme), on couvre tout.

### 4. Briefs/ : garder 4 fichiers (3 briefs + `_writer-package.md`)
- Statut quo. Granularité préservée.
- 3 briefs (univers/personnages/histoire) = lus par Claude writers (Read tool filesystem)
- `_writer-package.md` = concaténation autoporteuse pour MCP externes (Kimi/DeepSeek/Grok stateless)
- **Pas de README ni SYNTHESE-BRIEFS dans `briefs/`** (interdiction confirmée).

### 5. README.md du dossier story : simplifier
- Garder le frontmatter YAML (métadonnées : statut, persos, arc, production count)
- Garder le résumé court (2-3 lignes, MAJ par Directeur étape 10)
- Garder le lien vers kanban
- **Retirer** : "Carte du dossier" (duplique gabarit), "Workflow audio" (vit dans agent `narration-audio`)
- Cible : ~40 lignes max

**Impact fichiers à appliquer** :

| Action | Fichier(s) |
|--------|------------|
| Renommer | `stories/<NNN>/pitch.md` + `plan-histoire.md` → `1-pitch-plan.md` |
| Renommer | `stories/<NNN>/briefs/` → `3-briefs/` |
| Renommer | `stories/<NNN>/versions-writers/` → `4-versions-writers/` |
| Renommer | `stories/<NNN>/lecteurs-temoins/` → `5-lecteurs-temoins/` |
| Renommer | `stories/<NNN>/selection.md` → `6-selection.md` |
| Renommer | `stories/<NNN>/rewrite/` → `7-rewrite/` |
| Renommer | `stories/<NNN>/gatekeeper-verdict.md` → `8-gatekeeper-verdict.md` |
| Renommer | `stories/<NNN>/relecture-rewrite/` → `9-relecture-rewrite/` |
| Renommer | `stories/<NNN>/texte.md` → `10-texte.md` |
| Refondre | `equipe/PROCESS.md` (suppression étape 2, fusion étape 1, MAJ inputs/outputs avec préfixes) |
| Refondre | `narration-conseiller.md` (intègre Kishōtenketsu + boussole 4-5 ans) |
| Mettre en standby | `narration-architecte.md` (frontmatter `deprecated: 2026-05-12 + raison`) |
| Refondre | `_gabarit/README.md` (nouvelle arborescence + nouveau README simplifié) |
| Adapter | `scripts/new-story.js` (création préfixes + 1-pitch-plan.md unique) |
| MAJ | `stories/<NNN>/README.md` (simplifier) |
| Migrer | STORY-001 et STORY-002 vers nouvelle structure |
| MAJ | `pmo/INVARIANTS.md` (PROCESS 10 étapes au lieu de 11) |

**Statut :** ✅ tranché. À appliquer en cascade.

---

## 2026-05-12 (soir) — Gravage doctrine PROCESS étapes 2/3/4 (plan léger + qui lit quoi + qui call qui)

**Contexte :** Audit pmo-challenge a révélé des trous structurels dans PROCESS.md sur le degré de détail du plan-histoire (étape 2), la doctrine "qui lit quoi" des briefs (étape 3), et la mécanique d'appel concrète des writers (étape 4 — qui call quel MCP avec quel fichier).

**Décisions gravées dans PROCESS.md** :

1. **Étape 2 — Plan léger imposé** : le plan d'histoire donne les **invariants structurels** (trio, promesse du titre, recentrage Ten, sensibilités, contraintes dures) mais **PAS** le scénario phrase par phrase. Cible volumétrique : **50-80 lignes max**. Raison : si tous les writers connaissent les 4 temps précis, la variance s'effondre. La force d'avoir 10 LLM = chacun apporte son angle natif.

2. **Étape 3 — Doctrine "qui lit quoi" gravée** :
   - 3 briefs canoniques (`brief-univers.md`, `brief-personnages.md`, `brief-histoire.md`) = lus par writers **Claude** (agent local avec Read tool filesystem)
   - 1 fichier `_writer-package.md` = concaténation autoporteuse pour writers **MCP externes** (Kimi/DeepSeek/Grok stateless sans accès filesystem)
   - **Pas de `README.md` ni `SYNTHESE-BRIEFS.md`** dans `briefs/` (doublons à supprimer si trouvés)
   - 4 fichiers max dans `briefs/`

3. **Étape 4 — Mécanique d'appel gravée** :
   - Claude libre ×2 → Agent tool sur `narration-writer-claude-libre`
   - Kimi libre ×3 → **Directeur** call directement MCP `ask_kimi` (pas d'agent intermédiaire — décision : pas besoin de wrapper agent pour les writers libres MCP)
   - Kimi guidé ×1 → Agent tool sur `narration-writer-kimi-guide` (qui call MCP `ask_kimi` avec annexe AXES)
   - DeepSeek ×2 → **Directeur** call directement MCP `ask_deepseek`
   - Grok ×2 → **Directeur** call directement MCP `ask_grok`

**Impact fichiers :**
- `equipe/PROCESS.md` étape 2 enrichi (doctrine plan léger) ✅
- `equipe/PROCESS.md` étape 3 enrichi (qui lit quoi + interdiction README/SYNTHESE) ✅
- `equipe/PROCESS.md` étape 4 enrichi (table mécanique d'appel writers) ✅
- `.claude/agents/narration-writer-kimi-guide.md` corrigé (réf morte `ultime_debrief.md` → `lecons-vivantes.md` + casting V1 figé : `Jérem` → `Madie`) ✅
- `.claude/agents/narration-writer-claude-libre.md` corrigé (casting V1 : `Jérem` → `Madie`) ✅ (fixé en 2026-05-12 matin)

**Statut :** ✅ tranché.

---

## 2026-05-12 — STORY-002 Libellule Résonance : 4 Q-ouvertes tranchées

**Contexte :** SLA dépassé depuis 2026-05-11. Auteur a tranché en bloc le 2026-05-12 (soir).

**Décisions :**
1. **Casting** : pivot **Wex + Juju + Nono** (au lieu de Wex + Polo + Nono initial). Juju (T8 Challenger, sensibilité Plantes/terre) remplace Polo. Justification auteur : "Juju grosse énergie aussi". Trio passe à 1F+2M+Wex (au lieu de 2M+Wex).
2. **Décor** : **Étang amont** (s'ouvre haut, en amont du ruisseau de 001). Continuité géographique avec 001.
3. **Libellule** : **objet central = sensibilité révélée de Nono** (T9 Vibration collective). Pas juste motif récurrent — c'est par elle que la sensibilité de Nono se révèle au lecteur.
4. **Geste signature Nono** : **pieds nus sur la terre** (sent la vibration monter par le sol). Cohérent T9 Pacificateur + sensibilité Vibration collective — la résonance passe par les pieds. **Geste signature Juju** : à voir après le texte (laisser le writer proposer, on observera).

**Impact fichiers :**
- `stories/002-libellule-resonance/pitch.md` → pivot Polo → Juju, ajuster duo, intégrer geste pieds nus
- `stories/002-libellule-resonance/plan-histoire.md` → ajuster 4 temps avec Juju + geste signature
- `stories/002-libellule-resonance/briefs/brief-personnages.md` → casting Wex+Juju+Nono + sensibilités (Plantes Juju + Vibration collective Nono) + geste signature pieds nus Juju
- `stories/002-libellule-resonance/briefs/brief-histoire.md` → ajuster Ten (libellule révèle la résonance de Nono)
- `stories/002-libellule-resonance/briefs/_writer-package.md` → propagation
- `stories/002-libellule-resonance/kanban.md` → étape 3 ❌→✅ (à re-valider après pivot), étape 1 (pitch) validée

**Statut :** ⏳ Le Directeur doit pivoter pitch/plan/briefs avant de relancer étape 4 (10 writers).

---

> En cas de doute : la dernière décision sur un sujet écrase les précédentes.

---

## Questions ouvertes (en attente de tranchage auteur)

| # | Date | Sujet | Contexte | Posée par | État |
|---|------|-------|---------|-----------|------|
| ~~2026-05-11~~ | ~~STORY-002 — Duo agités + lieu + animal~~ | ~~Wex+Polo / mare / libellule / geste Nono~~ | — | ✅ **TRANCHÉ 2026-05-12** : Wex+Juju+Nono / étang amont / libellule = sensibilité Nono / pieds nus Nono. Voir entrée 2026-05-12 plus haut. |
| Q1 | 2026-05-13 | **Self-challenge — narration-architecte deprecated** | Agent en standby depuis 2026-05-12 (fusion Pitch+Plan). Faut-il le supprimer définitivement, l'archiver dans `_archive/`, ou le laisser en deprecated indéfiniment ? | narration-pmo (audit 2026-05-13) | Pas urgent, à trancher avant prochaine session narration |
| Q2 | 2026-05-13 | **Self-challenge — scission `audit-trail.md`** | Fichier ~450 lignes. Scinder en `audit-trail-archive-2026-05.md` + `audit-trail.md` actif ? Ou laisser et signaler ? | narration-pmo (audit 2026-05-13) | Pas urgent, cosmétique |
| Q3 | 2026-05-13 | **Self-challenge — scission `decisions.md`** | Fichier ~1265 lignes (le plus volumineux du pôle). Scission `decisions-archive-YYYY-MM.md` + `decisions-actives.md` ? Risque : casser refs croisées (lecons-vivantes, audit-trail) | narration-pmo (audit 2026-05-13) | Pas urgent mais à prévoir |
| Q4 | 2026-05-13 | **Self-challenge — `memoire-architecte.md` non maintenue** | Agent deprecated → mémoire ne reçoit plus de mises à jour. Archive dans `_archive/equipe/` ou laisse dormir ? | narration-pmo (audit 2026-05-13) | Pas urgent |
| Q5 | 2026-05-13 | **Self-challenge — `narration-conseiller` matière statique** | Le Conseiller a intégré Kishōtenketsu + boussole 4-5 ans depuis le retrait de l'Architecte. Mais la matière vraie vit dans `personnages/theorie/pedagogie-enfance/`. Faut-il graver dans le conseiller (risque dérive si la théorie évolue) ou pointer vers ? Actuellement mixte. | narration-pmo (audit 2026-05-13) | À voir si dérive constatée |
| Q6 | 2026-05-13 | **Self-challenge — auto-déclencher `/narration-pmo-audit`** | Mode AUDIT existe mais n'est jamais invoqué auto. Faut-il un hook (toutes les N sessions) ou laisser sur demande manuelle ? | narration-pmo (audit 2026-05-13) | Pattern à valider après quelques sessions d'usage manuel |

---

## Évolutions du PROCESS (méta-process)

> Section dédiée aux décisions qui modifient le **process lui-même** (étapes, agents, règles d'écriture, panel, casting writers), distinctes des décisions de contenu (univers, persos, arcs, histoires).

| Date | Évolution | Raison | Impact |
|------|-----------|--------|--------|
| 2026-05-12 | **🎙️ Nouveau skill global `audio-direction-elevenlabs`** (parent + 8 sous-fichiers + journal + multi-culture INDEX) | Session production audio 001 : découverte text-to-dialogue API (multi-voix natif Starter+), 14 anti-patterns gravés (stammers KO, Brazilian accent KO, CA→SA, etc.), tricks de graphie validés (b-bus pédago), cartographie 12 cultures préparée | Skill global `~/.claude/skills/audio-direction-elevenlabs/` ; référencé dans `CLAUDE.md`, `memory/skills-map.md`, `narration/INDEX.md`, `personnages/voix-meta/README.md`, `equipe/INDEX.md`. Pour TOUTE prod audio multi-voix MaxPlay |
| 2026-05-12 | **RÈGLE DURE : ne JAMAIS supprimer la matière de fabrication post-canon** | Incident `58b491ed` (canonisation 001) : `rm -rf legacy` de ~80 fichiers de fabrication (001 + 002 + 003-v2 + 004) au lieu de l'archivage prévu par décision 2026-05-08 Décision C. Détecté par Papa Yann 2026-05-12. Restauré via git. | `equipe/PROCESS.md` §Étape 10 enrichi (règle dure + incident référence) ; tout agent canonisant doit relire la règle avant `rm` |
| 2026-05-08 | **PROCESS 9 → 11 étapes** (ajout étape 9 « Re-relecture rewrite » entre GateKeeper et Canon) | Détection trop tardive de régressions post-rewrite ; besoin de lecteurs sur le rewrite avant canonisation | `equipe/PROCESS.md` réécrit, `stories/_gabarit/` aligné, kanban étendu |
| 2026-05-08 | **Writer du top 1 garde la main au rewrite** | Greffes substitutives détectées (claude-rewrite-v1 sur 001) → perte de la voix one-shot | Étape 7 PROCESS, brief-writer-libre.template, agents writer-claude-libre/writer-kimi-guide |
| 2026-05-08 | **Panel lecteurs : 4 → 20** (10 profils × 2 tranches d'âge 3-5 et 6-7) | Cible Max prioritaire + détection anticipée 6-7 ans | Étape 5 PROCESS, agents lecteur/lecteur-dyade, gabarit story production.lecteurs_planifies |
| 2026-05-08 | **Writers : 4 → 10** (2 Claude + 3 Kimi libre + 1 Kimi guidé + 2 DeepSeek + 2 Grok) | Variance maximale, exploration angle natif × 4 LLM | Étape 4 PROCESS, MODELS.md, gabarit story production.writers_planifies |
| 2026-05-10 | **Restructuration 4 piliers** (personnages / univers / cross-culture / saisons) | Audit Papa Yann : « c'est le bazard » — fragmentation cross-culture, doublon enneagramme | Toute la racine narration/ + INDEX + CLAUDE.md |
| 2026-05-11 | **Voix consolidées dans Pilier 1** (`personnages/voix-meta/` + `type-NN/voix.md` corrigées) | Doublon `equipe/voix/` vs `personnages/type-NN/voix.md` avec divergence (adultes vs enfants 4-5) | `personnages/voix-meta/`, suppression `equipe/voix/`, voix persos = 4-5 ans |
| 2026-05-11 | **narration-pmo enrichi** (anti-patterns, mnémonique, tableau cartographie multi-fichiers) | Challenge transmis par game-pmo (5/6 challenges retenus, 1 décliné, 1 reporté) | `.claude/agents/narration-pmo.md` |

> Comment alimenter cette section : à chaque modification du PROCESS, agents, panel, casting writers — **avant** la décision de contenu correspondante. Ligne unique tableau, lien vers le détail si nécessaire dans la section « 2026-MM-DD » plus bas.

---

## 2026-05-11 (nuit) — Voix narrateurs créées + prénom marque « Lumi » + pivot Wex futur

**Voix narrateurs MaxPlay finalisées et prêtes à publier sur Voice Library ElevenLabs** :
- Narrateur H : `Lumi - Playful, Theatrical, Warm` (timbre Pierre et le Loup / Gérard Philipe — interne uniquement)
- Narratrice F : `Lumi - Singing, Tender, Lively` (timbre éveil musical / Virginie Albanese — interne uniquement)
- Prompts ≤ 1000 chars, descriptions FR + EN ≤ 500 chars, **zero recette anti-copie**

**Décision marque** : prénom **Lumi** retenu comme **prénom commun à toutes les voix MaxPlay** publiées sur Voice Library (narrateurs + futurs persos + castings cross-culture).

**Raison** :
- Court, universel FR/EN/IT/ES/JP, genre-neutre
- Évocation « lumière » → lien avec la promesse marketing (« fait briller les histoires »)
- Mémoire associative future : « Lumi Mimi » « Lumi Polo » etc.
- 18 voix Lumi existent ElevenLabs (DE/FI/JA/etc.) mais **aucune en français** → différenciation par langue OK

**Pivot futur tracé** : quand MaxPlay sera **public** (apps déployées, livres publiés, marque visible), **renommer Lumi → Wex** sur Voice Library = asset marketing croisé (« voix officielle des histoires de Wex »). Tant que projet privé, **Lumi protège l'univers** (anti-copie). Trigger : lancement public première story canon sur app mobile ou plateforme livre audio. ElevenLabs permet rename sans perdre voice_id ni historique usage.

**Voice Library Payouts** : monétisation activable (~$0.03/1000 chars générés par autres utilisateurs, Stripe Connect, seuil $10, payout tous les 6-8j, +$11M payés à date côté ElevenLabs). À surveiller dashboard Earnings après publication.

**Anti-copie strict appliqué** :
- Description publique : zéro mot-clé technique (ténor/mezzo/pitch rise/onomatopée/Gérard Philipe/Virginie Albanese)
- Framework impact : bénéfice émotionnel + use cases + CTA implicite uniquement
- Stratégie : vendre la voix, pas la définir

**Lien** : [`personnages/voix-meta/_PROMPTING-GUIDE.md`](../personnages/voix-meta/_PROMPTING-GUIDE.md) (playbook complet : prénom marque, publication step-by-step, monétisation Payouts, anti-patterns, cross-culture, descriptions impact).

---

## 2026-05-11 (suite) — Tokenisation texte canon 001 + backlog audio + audit complet + challenges narration-pmo

**Contexte :** Final audit tour — Papa Yann valide Phase C tokens + découvertes structurel + challenges pmo de game-pmo transféré.

**DÉCISION 1 — Phase C Tokenisation ✅ OUI, IMMÉDIAT**

Raison : préparation production audio + future passe markup émotionnel ElevenLabs.

Action :
- `stories/001-le-pont-casse/texte.md` : tokens `{{ wex }}`, `{{ titi_7 }}`, `{{ titi_6 }}` (Jinja-style, aligné `personnages/lookup.yml`)
- `stories/001-le-pont-casse/variantes-culturelles/fr/texte.md` : version FR résolue (texte canon intact, lisible directement)
- Frontmatter `texte.md` enrichi : section `tokens:` (format, resolution_casting, variantes_disponibles)
- Décors **non-tokenisés** : pont/ruisseau/saule/pissenlit en clair → substitution sémantique via agent narration-localisation + cross-culture/lieux-locaux/

Impact backlog : VOIX-001/002/003 (Haute) ajoutés, CROSS-001..004 (continu), ARCHI-DASH (post-audio).

**DÉCISION 2 — Voix consolidées dans Pilier 1 ✅ FIGÉ**

Voix persos = invariant universel `personnages/type-NN/voix.md` — remplacé versions adultes par **young child 4-5 ans** (correctes, depuis equipe/voix/).
Voix méta dans Pilier 1 aussi : `personnages/voix-meta/` (narrateurs H/F adultes, cheatsheet didascalies writers, guide ElevenLabs, étude vocale).
`equipe/voix/` supprimé (vide). `equipe/voix-enneatypes.md` déplacé → `personnages/voix-meta/etude-vocale-par-type.md`.

Impact : doublon résolu, refs cassées narration-audio.md + narration-localisation.md fixées.

**DÉCISION 3 — Challenges narration-pmo : 3 ignorés, 3 à planifier en INBOX ⚠️**

Game-pmo a transmis 6 challenges pour enrichir narration-pmo (anti-patterns, checklist, mnémonique, cartographie, 3e mémoire). Analyse Papa Yann :
- C-1 (checklist hardcodée) : prise directe itération narration-pmo (ARCHI-006 en cours)
- C-2 (rapport synthétique) : intégré dans structure sprint-log (done ✅)
- C-3 (PIPELINE-MEMORY.md) : à planifier, non urgent (INBOX)
- C-4 (anti-patterns) : à planifier, secondaire (INBOX)
- C-5 (mnémonique 1-ligne) : à planifier, prise directe itération (INBOX)
- C-6 (tableau cartographie) : à planifier, secondaire (INBOX)

→ Résultat : 3 challenges ARCHI ignorés (hors scope PMO turbo), 3 en INBOX pour brainstorm + planification prochain cycle.

---

## 2026-05-11 — Voix consolidées dans Pilier 1 + comblement trous structurels post-refonte

**Contexte :** audit voix ouvert par Papa Yann (« y'avait un homme et une femme on avait préparé un prompt » + « age mid 30 ou teenage… on voulait plus petit nan ??? »).

**Décisions tranchées :**

1. **Voix persos = invariant universel** dans `personnages/type-NN/voix.md` (Pilier 1). Les 10 fichiers obsolètes (versions adultes ~30 ans) remplacés par les versions correctes (**young child around 4 to 5 years old**) qui étaient dans `equipe/voix/`. Plus de doublon.

2. **Voix méta dans Pilier 1 aussi** : `personnages/voix-meta/` rassemble les 2 narrateurs adultes H/F (qui racontent AUX enfants 3-9 ans), la cheatsheet didascalies pour writers, le guide ElevenLabs, et l'étude vocale 18 prompts. Le dossier `equipe/voix/` est supprimé (vide).

3. **`equipe/voix-enneatypes.md` déplacé** dans `personnages/voix-meta/etude-vocale-par-type.md` — c'est de la théorie sur les voix des persos, sa place est dans le Pilier 1 avec les autres voix.

4. **Voix-overrides cross-culture** : la signature voix reste invariante (Pilier 1) avec un placeholder `{native_language}` substitué à la publication. Les overrides spécifiques par culture (si une langue impose un ajustement de prosodie/articulation) vivent dans `cross-culture/castings-nationaux/<pays>/voix.md` (gabarit fourni).

5. **Gabarit casting national** créé : `cross-culture/castings-nationaux/_gabarit/` (README + type-XX.md + wex.md + voix.md). Inclut les 8 étapes de construction d'un nouveau casting (choix prénoms, création fiches, MAJ lookup.yml, trace PMO).

6. **Story gabarit synchronisé avec PROCESS 11 étapes** :
   - `production.writers_planifies` : 10 (et non 8) — 2 Claude + 3 Kimi libre + 1 Kimi guidé + 2 DeepSeek + 2 Grok
   - `production.lecteurs_planifies` : 20 (et non 4) — 10 profils × 2 tranches d'âge. Note transitoire panel 6 pour histoires <005.
   - `production.audio_produit` : champ ajouté
   - `audio/` sous-dossier ajouté avec workflow audio dans README du gabarit (narrateur H/F + dialogues persos + mix complet)

7. **ORGANIGRAMME actualisé** : 13 agents documentés post-refonte (Conseiller, Architecte, Directeur, PMO, Writers ×10, GateKeeper, Audio, Localisation, Science, Sensibilité, Archiviste, Lecteur, Lecteur-dyade).

8. **Phase C reportée à discussion** : faut-il tokeniser le texte canon de `stories/001-le-pont-casse/texte.md` (substituer prénoms par `{titi_N}` placeholders) ou attendre le 2e casting national ? À trancher.

**Lien :** [`../archive/sessions/2026-05-10-restructuration-3-piliers.md`](../archive/sessions/2026-05-10-restructuration-3-piliers.md) (trace refonte initiale) + sprint-log 2026-05-11 (trace ce traitement)

---

## 2026-05-10 (soir) — Refonte structurelle en 4 piliers + cross-culture comme pilier propre

**Contexte** : audit de la zone personnages/ennéagramme/voix/cultures/prénoms ouvert par Papa Yann : *« c'est le bazard, j'aimerai un audit complet… structure claire, hypra claire pour toute l'équipe »*. Audit révèle 4 erreurs casting V1 dans le catalogue prénoms (Jérem au lieu de Madie, Polo « Salomon » au lieu de Paul), désynchronisation enneagramme/README, liens cassés vers stubs orphelins, 3e pilier cross-culture éclaté entre 3 dossiers, doublon enneagramme/ ↔ personnages/.

### Décisions tranchées (autonomie auteur)

1. **Architecture en 4 piliers narratifs + opérationnel** :
   - **Pilier 1 — `personnages/`** : qui sont les persos (identité, voix-signature, gestes, sensibilité, relations) **+ théorie sur l'humain** (ennéagramme fondu en `personnages/theorie/enneagramme/` + pédagogie d'enfance 4-5 ans dans `personnages/theorie/pedagogie-enfance/`)
   - **Pilier 2 — `univers/`** : le monde où ils vivent (lois, cycles, sensibilités, transports, vie quotidienne) — inchangé sauf déplacement architecture-cross-culture
   - **Pilier 3 — `cross-culture/`** : variantes par culture (prénoms, onomatopées, faune-flore, lieux-locaux, coutumes-jeux-aliments, saisons-climat, castings-nationaux + doctrine cross-culture)
   - **Pilier 4 — `saisons/`** : plan éditorial (saison → arc → liens vers stories). Remplace `arcs/` à la racine.
   - **Opérationnel inchangé** : `stories/`, `equipe/`, `pmo/`, `scripts/`, `archive/`, `memory/`

2. **Modèle hybride invariant/variant pour les persos** (tranché après challenge Papa Yann « technique propre vs confort auteur ») :
   - Personnages = invariant universel (ennéatype, voix-signature, gestes, sensibilité). Vit dans `personnages/type-NN/`.
   - Cross-culture = variant par pays (prénom, prononciation, décor local, voix-overrides 1 mot). Vit dans `cross-culture/castings-nationaux/<pays>/type-NN.md`.
   - Voix ElevenLabs : signature universelle + placeholder `{native_language}` substitué à la publication. Pas de duplication de prompt par culture.
   - Trade-off accepté : confort auteur légèrement dégradé sur l'écriture, industrialisation cross-culture grandement facilitée (1 fichier par perso × pays au lieu de tout dupliquer).

3. **Pédagogie d'enfance 4-5 ans = théorie sur le lecteur** (sibling de l'ennéagramme = théorie sur les persos). Vit dans `personnages/theorie/pedagogie-enfance/`. **Référencée obligatoirement** dans :
   - `equipe/PROCESS.md` étapes 1 (Pitch), 2 (Plan), 3 (Briefs) — critères PASS incluent « calibrage 4-5 ans : ressources péda consultées »
   - `equipe/templates/brief-histoire.template.md` — cheat-sheet intégrée + section sources
   - `.claude/agents/narration-conseiller.md` — lecture obligatoire au démarrage
   - `.claude/agents/narration-architecte.md` — lecture obligatoire au démarrage

4. **Catalogue prénoms = tout en réserve** (218 prénoms / 30 cultures). Aucune promotion en « cultures principales V2 » pour l'instant. Décision reportée au lancement effectif d'un 2e casting national.

5. **Stubs morts supprimés définitivement** (12 fichiers : 3 stubs orphelins racine `personnages/` + 9 stubs `enneagramme/personnages/type-NN-*.md`). Conforme règle auteur 2026-05-10 : *« archiver un truc qui a disparu c'est pas utile, archiver une décision avec explication oui »*. Trace dans `archive/sessions/2026-05-10-restructuration-3-piliers.md`.

6. **Saisons/arcs déplacés** : `arcs/` à la racine → `saisons/saison-1/arc-*/`. Question hiérarchisation `stories/saisons/arcs/NNN/` reportée à fin saison 1 (quand >10 histoires).

### Migrations exécutées (Phase 2-5 du plan)

- `personnages/catalogue-prenoms/` → `cross-culture/prenoms/` (218 prénoms intacts)
- `univers/meta/architecture-cross-culture.md` → `cross-culture/doctrine.md`
- `equipe/onomatopees-cross-culture.md` → `cross-culture/onomatopees/catalogue-onomatopees.md`
- `personnages/type-01..09/pays/fr/identite.md` (×10) → `cross-culture/castings-nationaux/fr/type-NN.md`
- `enneagramme/` → fondu dans `personnages/theorie/enneagramme/` (le dossier `enneagramme/` à la racine disparaît)
- `equipe/sources-pedagogie-enfance.md` → `personnages/theorie/pedagogie-enfance/sources-pedagogie-enfance.md`
- `arcs/arc-N-*/` → `saisons/saison-1/arc-N-*/` + INDEX.md ajoutés

### Création nouveaux INDEX

- `narration/cross-culture/INDEX.md` + 7 sous-INDEX (prenoms, castings-nationaux, onomatopees, faune-flore, lieux-locaux, coutumes-jeux-aliments, saisons-climat)
- `narration/saisons/INDEX.md` + `saison-1/INDEX.md` + 4 INDEX d'arc
- `narration/personnages/theorie/README.md` + sous-READMEs (enneagramme, pedagogie-enfance)
- `narration/personnages/INDEX.md` réécrit
- `narration/INDEX.md` réécrit (4 piliers)
- `CLAUDE.md` actualisé (pôle NARRATION)

### Corrections critiques (Phase 1)

- 4 corrections dans `cross-culture/prenoms/INDEX.md` (Jérem→Madie ×2, Salomon→Paul, Jérémie→Madeleine)
- 2 corrections dans `cross-culture/prenoms/par-culture/hebreu.md` (intro + liste V1)
- 1 correction `personnages/lookup.yml` (exemple commentaire)
- 1 correction `equipe/templates/brief-writer-libre.template.md`
- MEMORY globale Claude actualisée (`feedback_prenoms_personnages.md` + `MEMORY.md`)

**Lien :** [`../archive/sessions/2026-05-10-restructuration-3-piliers.md`](../archive/sessions/2026-05-10-restructuration-3-piliers.md) (trace complète + plan d'exécution + checksums)

---

## 2026-05-10 — Précisions cadre arc 1 + ajustements casting (post-deepsearch pédagogie + Chabreuil)

**Décisions complémentaires** au cadre arc 1 du 2026-05-08, après ingestion pédagogie + Chabreuil + brainstorm casting :
- Deepsearch pédagogie 4-7 ans cross-culture → [`personnages/theorie/pedagogie-enfance/sources-pedagogie-enfance.md`](../personnages/theorie/pedagogie-enfance/sources-pedagogie-enfance.md) *(déplacé 2026-05-10 dans la refonte 4 piliers)*
- Synthèse Chabreuil exhaustive → [`personnages/theorie/enneagramme/chabreuil-synthese-complete.md`](../personnages/theorie/enneagramme/chabreuil-synthese-complete.md) *(déplacé 2026-05-10)*
- Brainstorm casting + gestes → `narration/stories/brainstorm-arc-1.md` (document de session en continu)

### Cadre arc 1 (ratification + complément)

1. **Format trio confirmé pour tout l'arc 1** : 2 compagnons + Wex. 9 histoires × 2 = 18 slots → chaque ennéatype valorisé 2 fois. Pas de duo Wex+1 (rejeté).

2. **Longueur 400-650 mots** (centrée 500-550). 001 = 540 = pile bon. *« Si c'est fluide ça passera »* (Papa Yann). Pas trop radin.

3. **Pas de description physique ni dessin des persos**. Identification par prénom + geste signature + attitude + habitude. Préserve la cross-culturalité (l'enfant projette image/culture).

4. **Cross-culture équilibrée** : on soigne tous les types également, pas selon culture cible. Pas de modulation par marché.

5. **Reformulation P8 (équilibre profils)** : pas « héros à parts égales » (faux pour un duo 5+8 qui n'aura pas le même rapport au monde). Bon principe : **chaque ennéatype est épanoui dans sa nature et apporte sa singularité**. Pas de transformation forcée. Le 9 reste médiateur, le 5 reste observateur, le 8 reste protecteur, etc. → figée dans `equipe/lecons-vivantes.md` pattern P8.

6. **Niveau brief writer = mince ; niveau Conseiller-Auteur = épais**. La connaissance Chabreuil + patterns vit dans la doc équipe (lecons-vivantes, chabreuil-synthese, sources-pedagogie). Le writer reçoit l'essentiel : geste, attitude, situation. Pas de double/triple négation explicative.

7. **Anti-pattern brief** :
   - ❌ Empiler négations (« 8 mais pas agressif, mais pas… »)
   - ❌ Forcer un type hors de sa nature
   - ❌ Décrire physiquement
   - ✅ Dire ce que le type EST + son geste

8. **Pas de dispute, pas de tristesse** dans l'arc 1. Bienveillance totale (confirmé cadre 2026-05-08). Validation Papa Yann 2026-05-10 explicite après brainstorm casting.

**Raison** : Papa Yann après lecture des 8 insights pédagogie + extraits Chabreuil. Quote : *« Tu vois on en a pas DU TOUT parlé pour le 001 ça a pourtant DÉJÀ été bien retranscrit donc pas en mettre trop. »*

### Ajustements casting + gestes (brainstorm 2026-05-10)

9. **Type 4 Madie (T4) — reformulation expression vivante** : pas que contemplation passée. Madie est **expression, actrice, danse, intention vivante**. Elle anime sa singularité, elle impressionne par ses idées. Fiches perso type-04/caractere.md mises à jour avec section "Gestes/attitudes/habitudes" — section ajoutée 2026-05-10 à tous les 9 types.

10. **Type 5 Lulu (T5) — formulation discrétion observatrice** : **« discret, observateur, naturellement en léger retrait de l'action / nouveauté »**. Cette formulation remplace la précédente et s'ajoute aux fiches type-05/caractere.md.

11. **Type 9 Nono (T9) — direction histoire validée : l'animal qui s'approche** :
    - **Contexte** : Nono s'assoit, main ouverte, fredonne « mmm ». Fait un signe « viens ». Un autre perso l'imite. Un animal (papillon/écureuil/oiseau) s'approche, peut-être se pose.
    - **Principe** : Nono FAIT quelque chose, pas passif. 5 gestes imitables : s'asseoir / poser paume ouverte / fredonner / faire signe / sourire.
    - **Modèle** : Totoro — petit maître silencieux qui partage un savoir-faire (ralentir, accueillir). L'autre enfant apprend par mimétisme.
    - **À trancher prochaine session** : duo (Polo/Raph/Juju ou autre), lieu, animal exact.
    - **Pistes mises de côté** : partage équitable, main tendue en retour, coussin vivant (à garder en stock pour alternatives).

12. **Intégration des gestes/attitudes/habitudes dans 9 fiches personnages** : section créée 2026-05-10 dans les 9 fichiers `type-NN/caractere.md`. Chaque writer trouvera automatiquement. Remplace la transmission par brief ou par note du Conseiller. Améliore la traçabilité et la réutilisabilité.

**Raison** : Papa Yann brainstorm validé 2026-05-10. Observations pédagogiques (DeepSeek synthèse 4-7 ans) + Chabreuil détail (Madie/Lulu relus ensemble). Pattern P9/P10 enregistrés pour le futur dans lecons-vivantes.md.

---

## 2026-05-08 — Cadre arc 1 tranché (post-canonisation 001)

**Décision** : Cadre définitif de l'arc 1 (priorité actuelle saison 1), tranché par Papa Yann après le ménage du catalogue :

1. **10 épisodes** (001 fait + 9 à venir = 002-010)
2. **Découverte progressive** des 9 ennéatypes + Wex (chaque perso valorisé au moins 1 fois en duo principal)
3. **Extérieur uniquement** — pas d'intérieur
4. **Aucun adulte en scène**
5. **Printemps uniquement**
6. **Bienveillance totale**, zéro tension
7. **Cible 4 ans** (palier P1 ultra-court envisageable, plus court que 001 si possible)
8. **Pas de grille spéculative** — les axes 002-010 sont co-construits avec l'auteur en brainstorm direct, pas pré-définis par un agent

**Raison** : Papa Yann a explicitement supprimé les pistes Conseiller 2026-04-30 qu'il n'avait jamais validées : *« Supprime TOUTES tes propositions on va bosser avec nos retour d'expérience pas avec un truc que t'as bidouillé dans un coin y'a 1 mois j'ai jamais validé ton truc ! »*

**Impact** :
- `arcs/arc-1-objet-decor/fiche.md` : cadre tranché ajouté, pistes spéculatives supprimées
- `stories/axes-histoires-en-stock.md` : grille spéculative arc 1 supprimée + arc 2 nettoyé (histoires supprimées au ménage)
- `arcs/INDEX.md` : statut arcs corrigé
- Arc 3 : « on n'en parle pas encore » (gel jusqu'à nouvel ordre)
- Arc 4 : confirmé fin de saison

**Statut** : ACTIF immédiatement. Brainstorm 002-010 en co-construction.

---

## 2026-05-08 — Étape 7 (rewrite) : philosophie double minimaliste + comité éditorial

**Décision (implicite, figée par exécution)** : L'étape 7 (rewrite) produit **2 versions à comparer** en étape 9 :
1. **V1 minimaliste** = auteur top-1 se relit avec sa note d'intention seule. Aucune injection externe. Fidèle au texte original.
2. **V2 comité éditorial** = auteur top-1 reçoit brief léger avec 5 idées issues d'autres versions (palette, non injonction) et intègre 2-3 max avec justification argumentée.

**Raison** : Test empirique de deux approches. V1 baseline référence. V2 enrichissement très léger pour mesurer si les greffes sélectives améliorent ou diluent. Étape 9 (panel 6 ou 20 selon histoire) arbitre le choix définitif ou demande synthèse des deux.

**Impact** :
- `PROCESS.md` étape 7 = formalisé comme "consolidation légère" (pas refonte, pas fabrication multi-sources)
- `lecons-vivantes.md` pattern P7 ajouté (rewrite comité = sélection légère, pas injonction)
- Kanban.md histoire = 2 livrables étape 7 (v1 minimaliste + v2 comité) en attente étape 9

**Statut** : À appliquer à 003-v2 (juste livrée 2026-05-08), puis 005+ selon besoin.

---

## 2026-05-08 — Étape 9 (re-relecture) : panel complet 20 lecteurs

**Décision** : L'étape 9 du PROCESS militaire (re-relecture du rewrite) se fait avec le **panel complet 20 lecteurs**, pas une sélection ciblée de 3-4.

**Raison** : Papa Yann : *"le 9 relecture je veux bien tout le monde denouveau les 20"* — après le rewrite, valider auprès du panel complet que la version finale tient sur toutes les tranches (3-5 ans tranche A + 6-7 ans tranche B, tous genres + dyades).

**Impact sur `equipe/PROCESS.md`** : étape 9 révisée — output devient 20 fiches (non plus 3-4 + 1 contrôle). Synthèse finale avant étape 10 (canon).

**Statut** : À appliquer à partir de la prochaine histoire réécrite (003-v2 ou 005 selon situation).

---

## 2026-05-08 — Procédure PMO : classification et routing automatiques

**Décision (opérationnelle)** : Le PMO est déclenché **automatiquement et systématiquement** dès que du contenu narration passe en conversation. La procédure suivante s'applique à la fin de chaque salve Directeur/Conseiller :

### Classification (pour chaque input utilisateur)

L'input tombe dans **l'une de ces 6 catégories** :

| Catégorie | Signe | Action PMO |
|-----------|-------|-----------|
| **DÉCISION** | « Je décide que... » / « À partir de maintenant... » / acte volontaire d'arbitrage | → `pmo/decisions.md` + entrée datée + résumé raison + impact fichiers |
| **LEÇON** | Observation du writer / lecteur / test qui révèle un pattern récurrent | → `equipe/lecons-vivantes.md` + section HISTOIRE + ajout pattern/piège/axe |
| **TODO** | Chantier identifié mais non traitée aujourd'hui — dépend d'autre chose ou attend prochaine session | → `pmo/backlog.md` + ticket STORY/PERSO/UNIVERS/ARCHI/INPUT + priorité + assigné |
| **QUESTION OUVERTE** | Arbitrage nécessaire mais pas tranché → reste question, attend réponse explicite | → `pmo/decisions.md` section "Questions ouvertes" + lien fichier source |
| **INFO** | Contexte, état, rapport — rien à décider maintenant | → `pmo/sprint-log.md` section "État au reboot" OU ignored si redondant |
| **TRAITEMENT IMMÉDIAT** | Correction factuelle, refonte opérationnelle, mise à jour structurelle → agir **maintenant** | Agir + documenter action dans `sprint-log.md` |

### Routing (qui fait quoi)

- **DÉCISION** : PMO enregistre. Directeur applique immédiatement ou délègue agent concerné.
- **LEÇON** : PMO enrichit `lecons-vivantes.md`. Conseiller valide la formulation pour futures histoires.
- **TODO** : PMO crée ticket. Auteur décide priorité et assigné à prochaine session.
- **QUESTION** : reste dans backlog § Questions ouvertes jusqu'à Papa Yann tranche.
- **INFO** : PMO note, pas d'action requise.
- **TRAITEMENT** : PMO exécute (edits, créations, mises à jour index), log dans `sprint-log.md`.

### Timing

- **À chaque réponse Directeur/Conseiller** : PMO scanne les outputs narratifs (pitch, plan, briefs, sélection, etc.)
- **Avant de rendre la main à l'auteur** : PMO valide checklist (voir section Remise main ci-dessous)
- **Pas attendre la fin de session** : classification live, mi-session si besoin

### Remise main à l'auteur (checklist PMO avant "fin de session")

Avant de dire "OK on a terminé", le PMO vérifie :

- ✅ Tous les DÉCISIONS de la session → `decisions.md` avec date + raison
- ✅ Tous les LEÇONS → `lecons-vivantes.md` enrichi OU noté dans `sprint-log.md` si trop tôt
- ✅ Tous les TODO → `backlog.md` avec ticket + priorité (jamais plus de 3 actifs)
- ✅ Toutes les QUESTIONS → `decisions.md` § Questions ouvertes OU résolues si Papa Yann a tranché
- ✅ `sprint-log.md` entrée datée avec "État au reboot" (= ce que le prochain agent doit savoir)
- ✅ INDEX.md et cartographie à jour si structure a changé (fichiers créés/supprimés/renommés)
- ✅ Aucun kanban.md désalignés (étapes en cours = correctes vs réalité)
- ✅ Pas de références cassées (fichiers mentionnés dans `decisions.md` ou `PROCESS.md` mais inexistants)

Si un élément manque → flag auteur avant remise main : *"⚠️ PMO — [catégorie] : [ce qui manque] → faire X avant de rendre la main"*.

**Raison** : Papa Yann : *"OK on a livré quoi ? todo à jour les proces équipe blabla index claude tout est bon je te donne la main etc..."* — besoin de checklist systématique, pas de bricolage ad-hoc.

---

## 2026-05-07 — Refonte LLM + casting writers 10 versions (libre + guidé)

**Décisions** :

1. **LLM mis à jour** ([infra/mcp/MODELS.md](../../infra/mcp/MODELS.md)) :
   - Grok : `grok-4-fast-non-reasoning` → `grok-4.3` + `reasoning_effort: "low"` (juste au-dessus de none, évite le thinking long)
   - Kimi : suppression du paramètre `mode` (le mode `story`/moonshot-v1-32k ne marchait plus). Mono-mode `kimi-k2.6` non-thinking sur `api.moonshot.ai`
   - DeepSeek : `deepseek-chat` → `deepseek-v4-pro` non-thinking (défaut), `deepseek-v4-flash` en option. Promo -75% sur V4-Pro **jusqu'au 2026-05-31** (rappel sprint-log)
   - Tous en **non-thinking** : décision Papa Yann "pas de thinking mode" — réponses one-shot, pas de raisonnement qui lisse la créativité
   - Claude writers : `sonnet` → `claude-opus-4-7` (test du saut de modèle pour décaler le rang Claude qui plafonnait à 3-4)

2. **Casting writers passe de 8 à 10 versions** :
   - 2 Claude (Opus 4.7, libres)
   - **3 Kimi libres** + **1 Kimi guidé** (= 4 Kimi total, justifié par domination Kimi en Tour 2/3)
   - 2 DeepSeek (V4-Pro, libres)
   - 2 Grok (4.3, libres) — "deuxième chance" après bottom unanime, saut de génération majeur

3. **Séparation libre / guidé** :
   - **9 writers LIBRES** : reçoivent uniquement règles de FORME (ouverture courte, geste avant parole, fin image, longueur, promesse du titre). **Aucune indication de contenu** (pas d'animal, d'onomatopée, d'objet imposé). Variance native préservée. Template : [`brief-writer-libre.template.md`](../equipe/templates/brief-writer-libre.template.md)
   - **1 writer GUIDÉ** : reçoit en plus l'**Annexe AXES 1-6** issue des 100+ relectures (créature vivante, geste avant parole, onomatopée légère, fin rituel, mystère vs résolution, faute volontaire). Active 2-3 axes max, jamais 4+. Template : [`brief-writer-guide.template.md`](../equipe/templates/brief-writer-guide.template.md). Agent : [`narration-writer-kimi-guide`](../../.claude/agents/narration-writer-kimi-guide.md)

4. **Checklist auto-cohérence en fin de brief (tous writers)** : passe factuelle 30s avant remise (prénoms, lieux, objets cohérents). Pas de réécriture créative — corrige uniquement les bugs. Une 2e passe créative dilue la voix one-shot.

5. **Étape 7 Rewrite formalisée comme consolidation** : pas une réécriture from-scratch — base + 2-3 greffes d'ingrédients gagnants identifiés en sélection. Spine de la base intacte. Pas de Frankenstein. ([`PROCESS.md`](../equipe/PROCESS.md) §7)

6. **Lecteurs témoins** : passe de 4 (2 enfants + 2 dyades) à **6** (2 enfants G+F + 4 dyades papa-G/papa-F/maman-G/maman-F). Reflète le protocole utilisé en Tour 2/3 et la richesse des retours par genre/parent.

**Raison** : Verdict consolidé Tour 2/3 (003-v2 + 004) = Kimi domine (kimi-run1 #1 chez 5/6 lecteurs sur 004), Grok bottom unanime, Claude plafonne 3-4. Le test température réelle (004) a confirmé que la formule structure prime sur l'angle. On exploite cette connaissance via le writer guidé sans casser la créativité des libres.

**À surveiller** :
- Coût DeepSeek-V4-Pro après 2026-05-31 (fin promo) → bascule possible vers V4-Flash
- Kimi K2 series discontinued 2026-05-25 (K2.6 reste OK mais surveiller release notes)
- Si les 4 Kimi convergent trop, perte de variance inter-LLM → à mesurer après 3-5 histoires

**Impact fichiers** :
- Modifié : [`infra/mcp/server.ts`](../../infra/mcp/server.ts), [`PROCESS.md`](../equipe/PROCESS.md), [`narration-writer-claude-libre.md`](../../.claude/agents/narration-writer-claude-libre.md)
- Créé : [`MODELS.md`](../../infra/mcp/MODELS.md), [`narration-writer-kimi-guide.md`](../../.claude/agents/narration-writer-kimi-guide.md), [`brief-writer-libre.template.md`](../equipe/templates/brief-writer-libre.template.md), [`brief-writer-guide.template.md`](../equipe/templates/brief-writer-guide.template.md)
- Mémoire MaxPlay : `feedback_kimi_mode_code.md` mise à jour (mode unique désormais)

---

## 2026-05-05 — Switch casting V1 : Type 4 Jérémie/M → Madeleine/F

**Décision** : Type 4 (Individualiste / Fréquence) passe de **Jérémie (M, diminutif Jérem)** à **Madeleine (F, diminutif Madie)** pour rééquilibrer le casting V1 français de **3F/6M vers 4F/6M**.

**Raison** : Parité plus saine pour identification fillettes + meilleure répartition des profils vocaux TTS multilingues. Archétype féminin Marie-Madeleine (Évangile) cohérent avec lignée "casting Christ" V1.

**Impact** :
- Tous les fiches perso type-04/ : réécriture prénom + pronoms (M→F)
- Fiches type-01 à 09 et Wex : mise à jour pronoms dans relations.md et caractere.md
- Ennéagramme : casting-mapping.md, README.md, guide-auteur.md, situations/emotions-universelles.md, situations/interactions.md
- Univers : sensibilites.md, compagnons.md
- Voix : renommage type-04-jerem.md → type-04-madie.md, README.md, _CHEATSHEET-WRITERS.md
- Token `titi_4_fr` : inchangé

**Phonétique vérifiée** : Madie distinct de tous autres diminutifs (Wex/Melki/Mimi/Polo/Lulu/Pierrot/Raph/Juju/Nono).

---

## 2026-05-04 — Refonte 003-v2 Tour 2 : trio + variance + lecteurs

**Décisions** :
- Trio 003-v2 = **Wex + Raph (T7, fille) + Pierrot (T6, garçon)**. Raph remplace Melki (deux calmes 1+6 ne créaient pas assez de friction lisible en arc 1).
- **Variance writers** abandonnée (Sobre/Sensoriel/Dynamique/Instinct n'ont pas apporté de valeur). Nouveau schéma : **8 runs natifs** = 4 LLM × 2 runs avec températures légèrement différentes. Brief strictement identique pour les 8 runs.
- **Lecteurs étendus à 6** : 2 enfants seuls (garçon + fille) + 4 dyades (papa+garçon, papa+fille, maman+garçon, maman+fille). Objectif secondaire : observer si la narration colle mieux voix féminine ou masculine pour TTS futur.
- **Patte MaxPlay enrichie** : règle « **promesse du titre** » sous pilier B. Le Ten transforme la promesse, le Ketsu la résout — il ne l'élude jamais.
- **Sons-bouche** (floc-floc, glou-glou, tss-tss, tac-tac…) → mémoire Conseiller (pattern sélection), **pas brief writer** (risque fabrication forcée).
- **Brief personnages enrichi** avec exemples concrets de réaction par perso dans une situation-type non-pont (pas de chorégraphie de l'histoire — juste illustration du moteur sans le nommer).

**Pourquoi** : leçons Tour 1 003-v2 (8 versions writers + 4 lecteurs témoins, supprimées). Voir `equipe/memoire-conseiller.md` section *Patterns sélection — observations Tour 1 003-v2*.

---

## 2026-05-03 — PMO devient relecteur des briefs writers (anti-négation gratuite)

**Décision** : avant qu'un brief writer parte aux runs étape 4, le PMO fait une passe mécanique de relecture (grep négations + test règle F : un writer naïf évoquerait-il spontanément le sujet ?). Si non → alerte le Directeur. Tant que des négations gratuites restent, kanban étape 4 = 🔴 BLOQUÉ.

**Pourquoi** : sur 003-v2, plusieurs négations gratuites ont été détectées par Papa Yann lui-même au 3e tour de relecture ("pas de pouvoirs", "pas de bloc séparé", etc.). Ce travail mécanique n'est ni technique ni stratégique → Haiku PMO suffit, soulage Papa Yann, fluidifie le PROCESS.

**Comment** : voir `.claude/agents/narration-pmo.md` section "Relecteur des briefs writers".

---

## 2026-05-03 — Critères patte Papa Yann retirés du brief writer

**Décisions** :
- **Critère 9 (distribution sensorielle)** : retiré du brief writer. **Au choix du writer**, parfois un gros moment sensoriel concentré sert mieux que la distribution. Pas une règle.
- **Critère 13 (épilogue italique / "texte finit là où il finit")** : retiré du brief writer. Négation gratuite (un writer naïf n'y penserait pas). Reste règle de relecture Directeur si jamais un writer en met un.

**Pourquoi** : appliqué règle F sur le writer-package — si un writer naïf n'évoquerait pas spontanément le sujet, on ne le mentionne pas dans le brief.

---

## 2026-05-03 — Patte Papa Yann : refonte critères 6, 7, 13, 14, 15 + suppression mention passé simple et tirets cadratins

**Décisions** :
- Mots forts/sombres : liste explicite d'interdits durs (mort/crever/clochard/pédocriminel/pistolet/pute/enculer + famille) ; tout autre vocabulaire dur passe s'il a un sens.
- Passé simple : pas de règle pour ou contre, affaire de style writer.
- Tirets cadratins : sortis du brief writer (Papa Yann ne les utilise jamais, GateKeeper attrape les usages ambigus).
- Épilogue italique : reformulé en positif ("le texte finit là où il finit").
- Morale : leçon vécue par les personnages OK, leçon dite par narrateur ou explicitée à la fin = NO.
- Critère 15 (négations gratuites) : reste règle interne Architecte/Directeur/notes, pas writer.

**Pourquoi** : un brief writer doit donner des règles digérées et positives. Les exemples de bugs 001/002 polluent le brief sans aider le writer naïf. Application immédiate sur 003-le-pont-casse-v2.

---

## 2026-05-03 — Briefs writers autoporteurs (writer-package)

**Décision :** Pour chaque histoire, le Directeur produit un fichier `briefs/_writer-package.md` **autoporteur, identique pour les 8 runs**. Contenu inliné (pas de "cf fichier X") car Kimi/DeepSeek/Grok via MCP n'ont pas accès au filesystem.

Pour les 4 runs angularisés (2 Claude + 2 Kimi), on envoie le **même** writer-package + 1 ligne d'angle ajoutée à la fin. Aucune autre différence.

**Pourquoi :** équité de traitement entre les 8 runs, comparabilité du test PROCESS, garantie que tous les writers ont la même information de base.

---

## 2026-05-03 — Saison printemps par défaut sur tout arc 1

**Décision :** Tout l'arc 1 (objet/décor bienveillant) se passe au **printemps** par défaut. Décision facilitante.

**Lien :** `arcs/arc-1-objet-decor/fiche.md` (section Cadre cyclique).

---

## 2026-05-03 — Règle Directeur : relire decisions.md avant tout brief

**Décision :** Avant tout brief / livrable / décision proposée, le Directeur relit `pmo/decisions.md`. Si une question a déjà été tranchée, il l'applique — ne la repose pas.

**Pourquoi :** sur le brief 003-v2, le Directeur a reposé la question "Option A vs B variance writers" alors qu'elle était tranchée le 2026-04-30 (8 versions = 4 base + 2 Claude angularisés + 2 Kimi angularisés). Perte de temps + confusion auteur.

---

## 2026-04-30 — Saison 1 : 4 axes narratifs

**Décision :** La saison 1 s'articule autour de **4 axes** (et non 3) :

1. **Arc 1 — histoires-objet / élément de décor** : bienveillantes, simples, fluides. On apprend à connaître les voix des personnages. Que du gentil. **Priorité actuelle.**
2. **Arc 2 — la Parole** : poids des mots, "je veux plus être ton copain", "si c'est comme ça je joue plus avec toi". Résonance directe avec ce que Max vit en ce moment IRL.
3. **Arc 3 — original-dans-le-naturel** : objet ou lieu **spécifique à notre univers** (bus à techno, immeubles raréfiés, plantes/eau au fonctionnement différent, bioélectricité contre allergies, etc.).
4. **Arc 4 (fil rouge transversal) — pouvoirs de Wex** : il prend conscience progressivement qu'il peut voir quand ça ne va pas, projeter le futur proche en semi-transparence sans altérer le présent, revivre/ajuster son comportement et comprendre les conséquences.

**Raison :** Recadrage Papa Yann 2026-04-30 — la "Série La Parole" préexistante est rangée dans l'arc 2. L'arc 1 doit rester ultra-simple/bienveillant pour faire connaître les persos avant tout reste.
**Liens :** `archive/sessions/2026-04-30-brainstorm-arcs-style-gabarit.md`

---

## 2026-04-30 — Arc 1 : format duos

**Décision :** Pour l'arc 1, chaque histoire = **1 objet (titre) + 2 ou 3 persos + Wex présent**.

**Raison :** L'amitié se montre mieux à plusieurs (un perso seul s'explique, à 2 il existe par contraste). Couvre le casting plus vite. Les ennéatypes se révèlent par friction douce, jamais nommée.
**Wex en arc 1 :** présent en témoin silencieux, **pouvoirs PAS encore activés** (l'arc 4 viendra plus tard dans la saison).

---

## 2026-04-30 — STORY-003 à 006 en pause (pas supprimés)

**Décision :** Les histoires 003 *La Confidence* (workshop), 004 *Cartable-à-trou* (pitch), 005 *Le Mardi* (pitch), 006 *Sept à rien* (pitch) sont **mises en pause**, à reprendre quand l'arc 1 sera bouclé. Elles relèvent toutes de l'**arc 2 (Parole)**.

**Raison :** Papa Yann veut prioriser l'arc 1 (rencontre des persos via objet/décor bienveillant) avant de revenir à la tension de la Parole. Aucune suppression — la matière est conservée intacte dans `stories/003-la-confidence/`, `stories/004-cartable-a-trou/`, `stories/005-le-mardi/`, `stories/006-sept-a-rien/` (post-migration workshop→stories du 2026-04-30).

---

## 2026-04-30 — Mode archivage live des sessions brainstorm

**Décision :** Pendant les sessions de brainstorm, l'orchestrateur (Claude principal) tient à jour **en continu** :
- `INBOX.md` : ce qui est en cours, en cours d'arbitrage
- `pmo/decisions.md` : dès qu'un point est tranché par Papa Yann, il y est migré immédiatement
- `archive/sessions/<date>-<sujet>.md` : trace brute complète de la session (toutes les positions et leur évolution)

**Pas attendre la fin** d'une session pour archiver. Toutes les 2-3 réponses, mise à jour.
**Raison :** Papa Yann : *"si on note à la fin on va tout perdre"*.

---

## 2026-04-30 — Patte narrative MaxPlay : B noyau + D voix + C cadre + outils ponctuels

**Décision (chantier 1 — style narration tranché) :**

La patte narrative MaxPlay s'écrit sur 3 piliers, complétés par 2 outils ponctuels et 1 outil reporté :

### Piliers (présents dans toute histoire)

1. **B — Kishōtenketsu (noyau structurel)** : Ki / Sho / Ten / Ketsu. Pas d'antagoniste. Bascule de perception, pas combat. Confirmé pilier absolu.
2. **D — Tranche de vie (voix d'écriture)** : précision sensorielle, gestes ordinaires, dialogues qui sonnent vrai, pas de grandiloquence. Avec **micro-Ten** ajouté pour Max 3.5 ans (le camion qui passe, la lumière qui change) — D pur sans accroche est risqué à cet âge.
   - *Référence interne :* mini-scénario *Le verre de Mimi* (archive 2026-04-30)
3. **C — Cycle (cadre d'arc)** : un même cadre revient sur plusieurs histoires d'un même arc (lieu, moment, type d'objet) pour que la reconnaissance soit du plaisir. Comme Tayo (rituel dépôt→mission→dépôt).

### Outils ponctuels (utilisés à la demande, pas en pilier)

4. **E — Trickster** : un perso fait un truc inattendu, **sans méchanceté ni dégradation**. Raph (T7) = porteur naturel mais n'importe qui peut le porter ponctuellement.
   - **Dosage : avec parcimonie** (Papa Yann : "je suis 7 donc ça m'attire, avec parcimonie")
   - Garde-fou : ne blesse personne, ne dégrade rien
   - *Référence interne :* mini-scénario *Raph et le banc* (archive 2026-04-30)

5. **A doux — Conflit émotionnel (réservé arc Parole)** : pas de violence physique, mais **tristesse / conséquence émotionnelle visible**.
   - À utiliser dans l'arc 2 (Parole), pas dans l'arc 1
   - **PAS** une famille F (morale dite) — c'est un **B avec un Ten lourd = conséquence concrète non commentée**. Le récit montre, ne dit pas. Aucun adulte qui tire la leçon, aucun enfant qui s'excuse vite.
   - *Référence interne :* mini-scénario *Le mot dit* (archive 2026-04-30)

### Outil reporté

6. **Coloration de voix culturelle** : quand un casting culturel autre (BR, JP, etc.) sera ouvert, la **voix narrative** (rythme, structure de phrase, références sensorielles) s'adaptera, mais le **sens du texte reste invariant**. Aujourd'hui casting France seul → aucune décision à prendre maintenant. Décor/biome (mer, montagne, pluie, saison) reste un paramètre libre du brief de chaque histoire.

### Familles écartées

- **F (morale explicite dite)** : écartée définitivement. Aucun narrateur ne tire la leçon, aucun perso ne dit "j'ai compris". Le lecteur (parent qui lit) commente s'il veut.

### Brief writers en 1 phrase

> *"Kishōtenketsu noyau (B) + voix tranche de vie (D) + cadre cyclique de la série (C). Pour l'arc 2 Parole : Ten = conséquence visible jamais commentée."*

**Raison :** Max nourri par Tayo (C+A soft) + Ghibli (B pur) + Stitch (A doux) — sa réceptivité au B est déjà installée. À 3.5 ans, la causalité "parce que" s'installe → le Ten du Kishōtenketsu devient lisible. Mono-fil obligatoire (B-plot impossible avant 6-7 ans).

**Liens :**
- `archive/sessions/2026-04-30-brainstorm-arcs-style-gabarit.md` (matière brute + 5 mini-scénarios castés)
- `equipe/sources-narratologie.md` (panorama 6 familles narratives mondiales + tableau ToM par âge)

---

## 2026-04-30 — Gabarit d'épisode : MOYEN (4 cases) avec qualité/problématique au niveau arc

**Décision (chantier 2 tranché) :**

### Gabarit pitch standard = MOYEN (4 cases)

```
- Objet titre : <le centre de gravité>
- Duo + Wex : <2-3 persos> · Wex présent
- Lieu : <puisé dans univers/, déjà connu>
- Moment d'ouverture (1 phrase, OPTIONNEL si l'objet est fort)
```

### Qualité humaine + problématique implicite = NIVEAU ARC

Ces deux dimensions ne sont **plus dupliquées dans chaque pitch d'histoire**. Elles sont préparées **une fois par arc**, dans la fiche de l'arc, et partagées entre toutes les histoires de l'arc.
- Arc 1 (objet/décor bienveillant) : qualité d'arc à définir (probablement *"présence"* ou *"voir l'autre"* — à trancher quand on prépare l'arc)
- Arc 2 (Parole) : qualité = *"les mots qui blessent ont des conséquences réelles, jamais commentées"* (déjà acté)
- Arc 3 (univers spécifique) : qualité à définir
- Arc 4 (pouvoirs Wex) : qualité à définir

### Statut des pitches existants

- **003 *La Confidence*, 004 *Cartable-à-trou*, 005 *Le Mardi*, 006 *Sept à rien*** : pitches COMPLETS conservés tels quels (sunk cost utile, sont en pause arc 2)
- **Stock `axes-histoires-en-stock.md`** (15 axes H-XX + T-XX) : à convertir au format MOYEN. Colonnes "Qualité humaine" et "Problématique implicite" remontent au niveau arc.

### Règle de révision

Après 5-6 histoires écrites en gabarit MOYEN : point de revue. Si writers tapent à côté trop souvent → ajout du Ten visé. Si ça vole → maintien MOYEN, voire test MINIMAL ponctuel.

**Raison :**
- Le moment d'ouverture en 1 phrase est le vrai filtre éditorial — il dit si une histoire vaut le coup
- COMPLET trahit la patte (D voix tranche de vie demande au writer de trouver le détail vrai dans l'instant, pas d'exécuter un Ten pré-spécifié — leçon V2 *Parapluie oublié*)
- Coût de paramétrage compatible avec la fatigue Papa Yann (5 pitches en 15 min vs 2h en COMPLET)
- Garde-fous délégués aux fiches stables (perso → ennéatype, univers → lieu, arc → motif)

**Liens :** `archive/sessions/2026-04-30-brainstorm-arcs-style-gabarit.md` (mini-scénario comparé *La pierre tiède*)

---

## 2026-04-30 — Cascade documentaire post-décisions (chantiers 1 + 2)

**Décision :** Les décisions stratégiques (`pmo/decisions.md`) doivent **descendre** dans les fichiers opérationnels lus par les agents exécutants (writers, architecte, gatekeeper). Sinon décisions "mortes" en PMO.

### Cascade à appliquer

| Décision | Atterrit dans | Lu par |
|---|---|---|
| Patte B+D+C + brief writers en 1 phrase | `equipe/voix-maxplay.md` *(à créer)* | Writers, Architecte, Dir |
| Outils E (parcimonie) + A doux (Ten lourd arc Parole) + F écartée | `equipe/sources-narratologie.md` (MAJ section "patte MaxPlay") | Conseiller, Architecte |
| 3 mini-scénarios canon (*Verre Mimi*, *Raph banc*, *Mot dit*) | `equipe/exemples-canoniques.md` *(à créer)* | Writers (référence concrète) |
| Décor/biome paramètre libre | `equipe/templates/pitch.template.md` + `stories/_gabarit/pitch.md` (champ optionnel) | Tout pipeline |
| Voix culturelle reportée à 2e casting | `personnages/prénoms-par-origine.md` (note bas) | Future ouverture casting |
| Gabarit MOYEN 4 cases | Réécrire `axes-histoires-en-stock.md` + MAJ `equipe/templates/pitch.template.md` + `stories/_gabarit/pitch.md` | Conseiller, Architecte |
| Qualité/problématique niveau arc | Nouveau dossier `arcs/` (1 fiche par arc) | Conseiller, Architecte |

**Statut :** À exécuter après que Papa Yann aura validé la cascade et le chantier 3 (lecture critique des histoires existantes).

---

## 2026-04-30 — Chantier 3 reformulé : lecture critique avant écriture

**Décision (reformulation chantier 3) :**

Papa Yann n'a **lu aucune des 3 histoires existantes** (001 Pont Cassé canon, 002 Rire qui reste canon, 003 La Confidence workshop). Avant d'écrire toute nouvelle histoire, il veut :
1. Lire les 3 textes existants
2. Critiquer librement (style, voix, dialogues, sensibilité, sobriété, etc.)
3. Nourrir `memoire-conseiller.md` + `memoire-dir.md` avec ses remarques
4. Décider garder / affiner / jeter chacune

**Raison :** Papa Yann : *"je n'ai lu AUCUNE des histoires jusque-là, justement je veux me pencher là-dessus. Si on a déjà des existantes je ferai mes remarques dessus, ça sera toujours utile et précieux. Si c'est nul on repartira de 0, si c'est bien ou presque on affinera sur l'existant."*

→ Plus rigoureux que la proposition initiale d'écrire *La pierre tiède* sans avoir évalué les canon existants.

---

## 2026-04-30 — Renommage Papa Yann → Papa Yann (auteur principal)

**Décision :** L'auteur principal du projet MaxPlay s'appelle **Papa Yann** (pas "Papa Yann" comme erronément écrit dans plusieurs fichiers depuis le début du chantier process militaire). Renommé partout dans `narration/**/*.md` (sauf 2 archives historiques où la trace reste).

**Raison :** Erreur de l'orchestrateur (probable projection automatique). L'auteur s'est manifesté : *"Je ne m'appelle pas Papa Yann c'est Papa Yann remplace everywhere."*

---

## 2026-04-30 — Patte Papa Yann (auteur) : 7 reproches récurrents + checklist GateKeeper renforcée

**Décision :** Création d'un fichier dédié [`equipe/patte-papa-yann.md`](../equipe/patte-papa-yann.md) qui distille la sensibilité personnelle de l'auteur après ses 3 relectures critiques (001, 002, 003) le 2026-04-30.

### 7 reproches récurrents identifiés
1. **Narration jugeante** (anti-superlatif, anti-jugement) — *"comme toujours", "le plus rapide", "trop fort", "inutile"*
2. **Prose qui fait littérature** — passé simple, métaphores doubles, comparaisons obscures
3. **Cohérence narrative de fer** — physique, numérique, référentielle
4. **Univers IMPLICITE strict** — aucun élément non attesté dans `univers/` (ex 003 « Maison Commune » → invention writer rejetée)
5. **Lexique sombre interdit** — pas de "mort", pas de mots adultes abstraits ("communal")
6. **Lecture orale fluide** — pas saccadée, pas de tirets cadratins ambigus, pas d'expression inventée
7. **Distribution sensorielle** — saupoudrée, pas concentrée en bloc

### Règles ajoutées
- **Casting phonétique** : éviter les surnoms phonétiquement proches dans une même histoire (Nono+Polo = bug confirmé sur 002)
- **Âge des persos secondaires** : si les héros ont 3.5-4-5 ans, les "plus petits" qui apparaissent ont 2-3 ans (pas 6)

### Renforcement GateKeeper
La checklist GateKeeper passe de **15 critères techniques** à **15 + 11 = 26 critères** (techniques + patte Papa Yann). Une histoire qui passe la checklist technique mais échoue sur la patte = NON PASS. Voir [`equipe/memoire-gatekeeper.md`](../equipe/memoire-gatekeeper.md).

**Raison :** **003 La Confidence a passé 8/8 critères techniques mais reste mauvaise** selon Papa Yann → preuve que la checklist d'origine ne suffit pas. La patte Papa Yann + cohérence stricte sont nécessaires.

---

## 2026-04-30 — STORY-001 V2 nécessaire (refonte intégrale)

**Décision :** L'histoire 001 *Le Pont Cassé* (canon V1 depuis 2026-04-24) nécessite une **refonte intégrale** via le nouveau PROCESS militaire 9 étapes.

**Raisons :**
- Adulte en scène (Monsieur Ferretti) — viole règle saison 1 actée le 2026-04-29 (postérieure à la canonisation)
- Possible confusion ennéatype Juju/Melki (à vérifier)
- Épilogue italique (règle anti-épilogue actée le 2026-04-28)
- 4 patterns Papa Yann détectés (jugement, lexique adulte, incohérences, lexique sombre)

**Action :** lancer le PROCESS standard. La V1 reste en `_archive/v1-2026-04-24.md`. Idées Papa Yann pour la V2 dans `stories/001-le-pont-casse/lecteurs-temoins/john-relecture-2026-04-30.md`.

---

## 2026-04-30 — STORY-002 V2 nécessaire

**Décision :** L'histoire 002 *Le Rire qui reste* (canon V1 depuis 2026-04-28) nécessite une **V2** via le nouveau PROCESS.

**Raisons critiques :**
- Casting phonétique Nono+Polo = confusion → **un des deux à changer** (celui qui tombe reste garçon)
- Incohérence physique (ballon "chaud du bois du banc" sur les genoux)
- Pronom ambigu (qui lance vers Polo ?)
- Expression inventée ("jouer avec une dent en moins")
- Style trop saccadé pour lecture orale parent
- Détails sensoriels concentrés en bloc (au lieu de distribués)
- Reste rattachée à arc-2 Parole (en pause)

**Action :** la V1 reste canon (la V2 sera traitée à la reprise de l'arc 2). Détails dans `stories/002-le-rire-qui-reste/lecteurs-temoins/john-relecture-2026-04-30.md`.

---

## 2026-05-02 — RÈGLE ABSOLUE : agent manquant = STOP + alerte auteur

**Décision Papa Yann (non-négociable) :**

> *« Quand un truc est manquant ou non fonctionnel dans notre process militaire, tu sors et tu me demandes. TOUJOURS. »*

**Application stricte :**

- L'orchestrateur (Claude principal) ou tout agent **NE DOIT JAMAIS** se substituer à un autre agent indisponible
- Si un agent défini dans `.claude/agents/` n'est pas chargé en session courante → **STOP immédiat**, alerter Papa Yann, proposer redémarrage de session
- Pas de "mode dégradé manuel" sur les rôles process (PMO, Architecte, GateKeeper, Conseiller, Directeur, Writers, Lecteurs, Archiviste, Science, Sensibilité, Localisation, Audio)
- Ce qui peut rester orchestrateur : navigation fichiers, archivage live, exécution scripts, mises à jour techniques (renommages, suppressions validées) — **PAS** le travail créatif/éditorial des agents dédiés

**Raison :** la patte/qualité d'un agent dédié (modèle adapté, prompt système spécifique, mémoire propre) ne peut pas être imitée correctement par l'orchestrateur. Une histoire écrite par "Claude qui imite le Directeur" ne sera pas une histoire MaxPlay validée.

**Cas concret 2026-05-02 :** session courante avait `narration-pmo`, `narration-architecte`, `narration-gatekeeper` non chargés. → Décision Papa Yann : redémarrer la session plutôt que de me laisser faire à leur place.

**Action standard quand un agent manque :**
1. STOP — ne pas tenter de substitution
2. Identifier précisément quel(s) agent(s) manque(nt)
3. Alerter Papa Yann avec le nom exact des agents indisponibles
4. Proposer redémarrage de session (les `.md` étant déjà sur disque)
5. Reprendre où on s'était arrêté à la prochaine session

---

## 2026-05-02 — Suppression définitive STORY-003 / 004 / 005 / 006

**Décision Papa Yann :** suppression **pure et dure** des 4 dossiers d'histoires :
- `stories/003-la-confidence/` (déjà abandonnée le 2026-04-30)
- `stories/004-cartable-a-trou/` (pitch en pause arc 2)
- `stories/005-le-mardi/` (pitch en pause arc 2)
- `stories/006-sept-a-rien/` (pitch en pause arc 2)

**Raison :** *« j'ai lu que 1 et 2, la 3 était terrible, je la supprime pure et dure. Seul 1 et 2 existent pour le moment, rien d'autre niveau story tu peux virer (on a toujours pas validé le style d'une seule histoire, donc en avoir 12 non lues est contre-productif). »*

**Conséquences :**
- **Aucune sauvegarde** des pitches/briefs Kishōtenketsu de 004/005/006 (aucun n'avait été validé par Papa Yann — la matière était présente mais non-canon)
- **Une seule idée conservée** (de la défunte 003) : *concours de dessins en lieu public bienveillant* → noté dans `axes-histoires-en-stock.md` comme matière exploitable pour arc 3
- Le **slot 003 redevient libre** et sera utilisé pour la version *from-scratch* de la 001 (test du nouveau PROCESS militaire)
- La série La Parole (`stories/series/001-la-parole.md`) est désormais réduite à la seule 002 — gardée pour la reprise future de l'arc 2

**État final des stories après suppression :**
- 001 *Le Pont Cassé* (canon V1 — V2 nécessaire)
- 002 *Le Rire qui reste* (canon V1 — V2 nécessaire, en pause arc 2)

---

## 2026-04-30 — STORY-003 ABANDONNÉE

**Décision :** L'histoire 003 *La Confidence* est **abandonnée**. Ne sera pas canonisée.

**Verdict Papa Yann :** *"cette histoire est pas bonne… on va retravailler ça différemment."*

**Raisons :**
- Élément d'univers non attesté ("Maison Commune") = invention writer rejetée
- Métaphores adultes abstraites ("montagnes blanches, vallées d'encre")
- Passé simple littéraire ("naquit au coin")
- Comparaison qui ne marche pas ("blanc comme un doigt")
- Détails techniques non ancrés ("papier kraft")
- Références orphelines ("la maison aux fenêtres" jamais posée)
- Fin opaque ("on dit pas blabla puis ça va")

**Action :**
- Statut `abandoned` dans frontmatter README
- Tous les fichiers de fabrication restent dans le dossier (règle PROCESS : rien n'est effacé)
- Ticket STORY-003 fermé
- **Idées à conserver** pour de futures histoires :
  - Concept "concours de dessins dans un lieu de passage public" (matière potentielle pour arc 3 ou autre)
  - Lieu d'exposition extérieur bienveillant → décision univers à prendre avec Conseiller (à formaliser dans `univers/vie-quotidienne/` à terme)

---

## 2026-04-30 — Comportement Conseiller : 1 sujet à la fois

**Décision :** L'agent `narration-conseiller` doit traiter **un seul chantier à la fois**, poser **une seule question** par salve, ne **pas servir de menu** de solutions. Ouvrir les autres angles seulement après réaction de Papa Yann.

**Implémentation :** Bloc "Règle de conduite brainstorm (NON-NÉGOCIABLE)" ajouté dans `.claude/agents/narration-conseiller.md`.
**Raison :** Papa Yann saturé par les réponses-menu : *"tu me donnes des solutions sur 3 axes et je suis débordé".*

---

## 2026-04-24 — Casting V1 "Christ" figé

**Décision :** Les 9 prénoms + Wex sont définitifs.

| Ennéatype | Prénom complet | Surnom (~80%) | Genre |
|-----------|---------------|---------------|-------|
| Hors-système | Wex | Wex | M |
| Type 1 | Melchisédech | Melki | M |
| Type 2 | Marie | Mimi | F |
| Type 3 | Paul | Polo | M |
| Type 4 | Jérémie | Jérem | M |
| Type 5 | Luc | Lulu | M |
| Type 6 | Pierre | Pierrot | M |
| Type 7 | Raphaël | Raph | M |
| Type 8 | Judith | Juju | F |
| Type 9 | Noé | Nono | M |

**Raison :** Lisibilité validée comité de lecture + cohérence culturelle casting "Christ".
**Liens :** `../personnages/INDEX.md` · `../personnages/prénoms-candidats.md`

---

## 2026-04-24 — Règles d'écriture fondamentales

**Décision :**
- Univers **IMPLICITE** — aucun nom de concept prononcé dans les histoires
- Ennéatypes **DILUÉS** — comportements visibles, jamais étiquetés
- Structure **Kishōtenketsu** — 4 actes, sans antagoniste
- Surnoms **~80%** en dialogue, prénoms complets = moments formels/adultes seulement
- Zéro morale explicitée — la leçon émerge de la situation, jamais dite

**Raison :** Retours comité Pont Cassé + volonté publishing cross-country.

---

## 2026-04-26 — Format et paliers d'âge

**Décision :**
- Format **texte-only** prioritaire (1-2 illus max) — quantité > beauté visuelle

| Palier | Âge | Durée | Mots |
|--------|-----|-------|------|
| P1 | 2-3 ans | 2-3 min | ~150-250 |
| P2 | 4-6 ans | 4-6 min | **400-700** |
| P3 | 6-9 ans | roman court | à définir |

**Raison :** Feedback Max 4 ans + pas de dessinateur, IA image instable.

---

## 2026-04-26 — Univers logistique

**Décision :**
- Enfants seuls dehors dès la maternelle — monde sans danger
- **Zéro nom de ville réelle** (pas Villejuif, pas Paris)
- Lieux géographiques réels OK comme décor (mer, montagne, savane)
- Transport : bus moteur classique **NON** — système de transport à inventer
- Repas : 1-2/jour quand faim — repas en famille/harmonie = moment sacré
- Coutumes locales = touche fine, pas folklore déguisé

**Raison :** Cohérence avec jeu MaxPlay + publishing cross-country.

---

## 2026-04-26 — Règles d'écriture (complément)

**Décision :**
- L'objet du titre = centre de gravité (il agit, il manque, il revient)
- Le monde affleure, ne s'explique pas — un détail suffit
- La conclusion la plus simple est souvent la bonne
- Pas de réflexe "ajoute du lore" en réécriture

**Raison :** Rejet V2 "Parapluie oublié" — trop décorative, sujet perdu.

---

## 2026-04-28 — Sensibilités (liste + attribution)

**Décision :** 9 sensibilités fixes par perso (Option A — comme l'ennéatype, cross-country stable).

| Perso | Sensibilité |
|-------|-------------|
| Wex | Vibration (transversal) + Vision causale (power) |
| Melki | Minéraux |
| Mimi | Eau |
| Polo | Forces |
| Jérem | Fréquence |
| Lulu | Quantique |
| Pierrot | Animaux |
| Raph | Cosmos |
| Juju | Plantes |
| Nono | Vibration collective (Harmonie) |

**Raison :** cohérence cross-country, simplicité éditoriale. Sensibilités = ADN du perso comme l'ennéatype.
**Lien :** `../univers/fondements/sensibilites.md`

---

## 2026-04-28 — Transport : Jabus validé

**Décision :** Nom du véhicule = **Jabus**. Multi-personnes. Technologie non nommée dans l'univers (normal comme l'électricité). Axes verts = coulées végétales avec Jabus silencieux.
**Lien :** `../univers/vie-quotidienne/transport.md`

---

## 2026-04-28 — Prof d'Histoire : Type 7

**Décision :** Prof d'Histoire = Type 7. Enthousiaste, fait des liens vite (même faux), adore le show. Jamais ridiculisé. Prénom à définir.
**Lien :** `../univers/vie-quotidienne/ecole.md`

---

## 2026-04-28 — Structure narrative en saisons

**Décision :**
- **S1 "L'École"** — histoires courtes autonomes P2, 1/semaine, Wex observateur-acteur sans révélation de sa nature
- **S2 "Les Visites"** — Wex chez chacun de ses copains one-on-one, découverte sensibilités

**Lien :** `../univers/fondements/sensibilites.md`

---

## 2026-04-28 — Process éditorial 5 writers + briefs stateless

**Décision :** Workflow en 6 phases (INTAKE → BRIEF → ÉCRITURE × 5 → SYNTHÈSE → RELECTURE → KEEPER → CANON). PMO hub post-phase à chaque étape.

**Briefs injectés aux writers stateless :** *(Surchargé par décision 2026-04-30 PROCESS militaire — voir templates `equipe/templates/brief-{univers,personnages,histoire}.template.md` et étape 3 du PROCESS)*
- ~~`equipe/brief-univers.md` — monde, ton, règles~~
- ~~`workshop/<titre>/plan-histoire.md`~~

**Writers × 4 :** Kimi · DeepSeek · Grok · Claude Libre (stateless). ~~Claude Ancré~~ *(agent historique supprimé le 2026-04-28 — voir ARCHI-005)*.

**Raison :** rodage sur STORY-002 — process validé, GateKeeper PASS au premier essai.

---

## 2026-04-28 — MCP Kimi : headers obligatoires + pas de max_tokens

**Décision :**
- Kimi For Coding nécessite `X-Client-Name: claude-code` + `X-Client-Version: 1.9.0` + `User-Agent: claude-code/1.9.0 (win32; x64)` — sinon `access_terminated_error`
- `max_tokens` supprimé de tous les appels MCP — chaque modèle utilise sa limite native
- Kimi utilise `kimi-for-coding` (reasoning) mais produit du texte narratif de qualité

**Raison :** bug découvert en production STORY-002. Fix appliqué dans `infra/mcp/server.ts`.

---

## 2026-04-29 — Architecture cross-culture du casting

**Décision :** L'univers MaxPlay s'articule autour d'une **structure cross-culture stable** : Wex + 9 ennéatypes invariants, déclinés en plusieurs **castings nationaux**.

### Règle d'architecture

- **Wex** : présent dans **toutes les communautés / toutes les cultures**. **Prénom invariant** (« Wex »). Pas d'ennéatype validé (déjà acté). Wex est un **archetype universel** qui se manifeste partout, avec les gens du pays.
- **Les 9 compagnons** : **mêmes caractéristiques d'ennéatype** dans toutes les versions. Mais :
  - **Vies adaptées au pays / culture** d'incarnation
  - **Légère variance dans l'expression de l'ennéatype** selon culture (le geste change, la structure reste — cf. pattern *même histoire × N cultures*)
  - **9 nouveaux prénoms par culture** — d'où la justification du gros catalogue de prénoms (218 prénoms / 30 cultures dans `personnages/catalogue-prenoms/`)

### Conséquence sur le casting V1

Le casting V1 « Christ » français (Wex + Melki/Mimi/Polo/Jérem/Lulu/Pierrot/Raph/Juju/Nono) **n'est plus le casting unique** : c'est désormais **le casting français**, **un casting parmi N à venir**. Il reste figé dans sa forme française (cf. décision 2026-04-24).

### Conséquence sur le catalogue de prénoms

Les 218 prénoms / 30 cultures du catalogue ne sont plus « matière en réserve » mais **base opérationnelle pour construire les autres castings nationaux**. Chaque culture qualifiée = un casting national potentiel.

### Pistes narratives ouvertes

- **Rencontres cross-culture** : les Wex de différentes cultures peuvent se croiser dans des histoires de jonction (S2+ probable).
- **Question structurelle non tranchée** : Wex est-il « le même » Wex partout (un seul personnage qui apparaît partout) ou « un Wex par culture » (même nom, même rôle d'archetype, mais incarnations distinctes) ? À creuser.

### Précisions stratégiques (2026-04-30)

**Stratégie de déploiement « bulles + croisements »** :
- **Phase 1 — Bulles locales** : chaque pays/culture pense que le casting lui est **propre**. Pas de signal cross-culture au démarrage. L'enfant lit « son » Wex sans savoir que d'autres existent.
- **Phase 2 — Croisements** : 6-12 mois après stabilisation, les communautés se découvrent. S2+ probable.

**Règle de contenu pour les bulles culturelles** :
- ❌ Pas de gros cliché culturel
- ❌ Pas de légende ou figure mythologique locale réécrite
- ❌ Pas de religion locale (univers post-Éveil hors religions historiques)
- ✅ Socle universel : **bienveillance · éveil · sensibilité** — la culture **affleure par les gestes du quotidien**, elle n'est pas le sujet

**Wex — piste actuelle (à confirmer)** : **un Wex par culture, prénom invariant « Wex » partout**. Si Wex voyage plus tard, ça complexifie le système de prénoms — décision laissée ouverte.

**Mémoire entre castings — piste actuelle (à équilibrer avec faisabilité)** : **probablement OUI**, puisque c'est la même histoire archétypale qui se rejoue. Mais charge éditoriale lourde — à arbitrer (cf. UNIVERS-003).

### Comparables prior art (pour info)

- **StoryWeaver / Pratham Books** (Inde) — 25 000 histoires en 270+ langues, adaptation visuelle communautaire
- **Elisavet Arkolaki** — séries *Cousins Forever*, *Where am I from?*, traduites en 50+ langues
- **One Globe Kids** — choose-your-own-adventure photos enfants (Haïti, Burundi, Indonésie, NY, Israël)
- **« I See the Sun »** — séries illustrées Népal/Myanmar/Afghanistan/Chine/Russie
- **Anna Hibiscus** (Atinuke) — héroïne nigérian-canadienne

Aucun ne combine **archétypes universels (ennéatypes) + adaptation culturelle profonde + univers connecté** — la zone de différenciation reste libre.

**Lien :** `../personnages/INDEX.md` · `../personnages/catalogue-prenoms/INDEX.md` · `../univers/meta/architecture-cross-culture.md` · `../equipe/memoire-conseiller.md`

---

## 2026-04-29 — Parents : présents non-présents (S1 = prisme enfant pur)

**Décision :** Les parents existent dans l'univers — confiance, amour, liberté donnée, à dispo si besoin. **Saison 1 = prisme enfant pur** : on ne voit QUE les enfants, ils ne jouent qu'avec leurs semblables. Les parents existent **hors-cadre**, jamais dans la scène.

**Conséquence éditoriale :**
- Aucune scène avec parent visible en S1
- Pas de dialogue parent ↔ enfant en scène
- Pas d'intervention parentale dans la résolution
- Le foyer/logement peut affleurer (un seuil, une voix au loin) mais le parent n'entre pas dans le cadre

**Réintroduction possible :** S2+ — modèle Bluey « bon assez parent » (Winnicott) si un jour un parent entre en scène : imparfait, fatigué, distrait, bienveillant — pas idéalisé.

**Raison :** filtre enfant pur = identification maximale 4-6 ans, monde-bulle cohérent avec l'autonomie déjà actée (« enfants seuls dehors dès la maternelle » — décision 2026-04-26). Évite le piège du parent-résolveur.

**Lien :** `../equipe/sources-narratologie.md` (pépite 1.6 « Bon assez parent »)

---

## 2026-04-29 — Compagnons : forme tranchée (ondes / fluides / éther)

**Décision :** La forme des compagnons est **définitivement** :

- **Ondes / vague / fluide / flux / vapeur / éther** — **PAS d'animaux**, pas de cristaux figés, pas de mascotte
- **Manifestation par couleurs émotionnelles** — exemples de phrasés cibles :
  - *« je t'ai vu devenir rouge »*
  - *« je t'ai vu tellement détendu dans ce nuage bleuté »*
  - *« il a changé de couleur »*
- **Apparition progressive** : milieu / fin de Saison 1
- **Ne parle pas, ne résout pas** (règles provisoires conservées)
- **Détails à affiner** dans les briefs Architecte et au fil des arcs narratifs

**Raison :** la piste « animal hybride » glisse trop vers compagnon-mascotte (codes Pokémon/Totoro déjà saturés). L'onde-couleur reste cohérente avec `vibration.md` (fréquence/amplitude visible) et avec la doctrine d'univers implicite (le compagnon affleure, ne s'explique pas). La couleur émotionnelle = lecture intuitive 4 ans (rouge=colère, bleu=calme).

**Conséquence sur `univers/vie-quotidienne/compagnons.md` :** refonte complète — les sections « animal hybride » deviennent obsolètes.

**Lien :** `../univers/vie-quotidienne/compagnons.md` · `../univers/fondements/vibration.md`

---

## 2026-04-29 — Sensibilité différenciée (correctif narratologie)

**Décision :** Dans MaxPlay, le ressort narratif **n'est PAS** « Wex sait quelque chose que les autres ignorent » (savoir caché). Le bon cadrage est : **chacun des 10 perçoit ce que les autres ne perçoivent pas — c'est de la sensibilité différenciée**.

- **9 compagnons** : chacun a UNE sensibilité fixe (minéraux · eau · forces · fréquence · quantique · animaux · cosmos · plantes · vibration collective) — cf. décision 2026-04-28
- **Wex** : a sa propre sensibilité (à définir précisément — piste : écoute des fausses notes / lien soin-bioélectrique)
- **Complémentarité** : les 10 sensibilités forment un ensemble qui se complète — aucun n'a le monopole de la perception

**Conséquence éditoriale :**
- Pas de hiérarchie « Wex sait, les autres ignorent »
- Les histoires peuvent jouer le malentendu *« je vois X que tu ne vois pas »* dans les deux sens
- Wex n'est pas le sage caché — il est un percepteur parmi d'autres, avec un rôle de témoin du tout

**Correctif explicite à `equipe/sources-narratologie.md` pépite 1.4 :** la Theory of Mind à 4 ans permet ce ressort, mais **pas configuré « savoir caché »** chez nous → configuré « sensibilité différenciée ».

**Raison :** l'univers MaxPlay n'a pas d'élu — il a des sensibilités complémentaires. C'est cohérent avec l'architecture cross-culture (l'enfant timide s'identifie à Lulu, l'extraverti à Raph) et avec la doctrine ennéatypes dilués (chaque type a son angle, pas de hiérarchie).

**Lien :** `../personnages/INDEX.md` · `../univers/fondements/sensibilites.md` · `../equipe/sources-narratologie.md`

---

## 2026-04-29 — Structure des saisons (architecture par âge / découverte univers)

**Décision :** Les saisons MaxPlay s'articulent autour d'une découverte progressive de l'univers et des personnages :

| Saison | Axe | Statut |
|--------|-----|--------|
| **S1 — Enfance pure** | Que enfants, sensibilité peu/pas présente, maîtrise découverte en fin de saison. **Compagnons (ondes-couleurs) apparaissent progressivement milieu/fin S1.** Parents hors-cadre. | 🟡 En cours — arc « La Parole » actif (002-006) |
| **S2 — Définition Wex + visites** | Wex comprend sa sensibilité. Choix de Wex dans son cours de relation sociale → il visite chacun des 9 en 1-1 (chez eux, leur chambre). On apprend leur sensibilité, mise en avant des ennéatypes. | ⚪ À venir |
| **S3** | À définir plus tard | ⚪ Vide |
| **S4 — Décentrement** | Un des 9 devient personnage central (pas Wex). Wex garde son rôle mais histoires où il est secondaire ou absent. **Beaucoup plus d'histoires en volume**, montée en communauté, faire apprécier persos secondaires. | ⚪ À venir |
| **S# — Voyage / échange scolaire** | Cross-culture activé, on croise les persos d'autres castings nationaux. | ⚪ À venir (saison joker, position non figée) |

**Conséquence éditoriale :**
- S1 = filtre enfant pur (parents hors-cadre)
- S2 = chambre/intimité de chaque perso, on entre dans leur monde
- S4 = brise le « tout passe par Wex », monte en communauté
- S# voyage = passerelle vers l'architecture cross-culture (cf. décision 2026-04-29 castings)

**Lien :** `../pmo/roadmap.md` · `../personnages/INDEX.md` · `../univers/meta/architecture-cross-culture.md`

---

## 2026-04-29 — Wex toujours présent dans les histoires (pour le moment)

**Décision :** Wex est présent dans toutes les histoires de la S1. Pas d'absence ponctuelle, pas de remplacement par un autre observateur.

**Raison :** stabilité du dispositif narratif en phase de rodage. Le "témoin hors-système" est un point d'ancrage utile pour les lecteurs et pour les writers stateless. Le retirer demanderait de re-cadrer le rôle d'observateur ailleurs, prématuré à ce stade.

**À reconsidérer :** plus tard, si une histoire l'exige naturellement (ex. moment où un autre perso prend seul un rôle de témoin, ou histoire centrée sur un duo très intime). Pas d'absence par principe — toujours par besoin narratif documenté.

**Lien :** `../equipe/memoire-conseiller.md`

---

## 2026-04-28 — Pas d'épilogue italique à partir de STORY-002

**Décision :** "Le Pont Cassé" avait un épilogue en italique (*Ce qu'on construit à trois…*). À partir de 002, le texte se tient seul — pas d'épilogue. Le Pont Cassé reste tel quel (premier texte, posture de présentation).

**Raison :** retour relecture STORY-002 — l'histoire se termine sur une image, pas besoin de méta-commentaire.

---

## 2026-05-08 — Canonisation 001 + réinitialisation catalogue (FINAL)

**4 décisions Papa Yann (session 3, fin de 001)** :

### Décision A : Validation étape 9 + 10 — 001 CANON

**Décision :** Étape 9 re-relecture par panel 6 lecteurs : **6 × ✅**. Deux corrections légères appliquées dans texte.md final (suppression du mot « proprement » redondant; simplification phrase plantation drapeau). Étape 10 canonisée 2026-05-08.

**Raison :** Panel 6 (2 enfants seuls + 4 dyades) ont validé la version kimi-rewrite-v2 (comité éditorial, 2 intégrations sur 5). Corrections mineures ne demandent pas re-re-relecture.

**Impact :** 001-le-pont-casse/ = CANON (540 mots, Wex+Raph+Pierrot, promesse du titre tenue). Patterns P1-P7 + G1-G6 migrés vers `equipe/lecons-vivantes.md`.

**Statut :** ✅ Exécuté. Texte final dans `stories/001-le-pont-casse/texte.md`.

---

### Décision B : Suppression définitive du catalogue ancien

**Décision :** rm -rf des dossiers/fichiers suivants (aucun n'avait la validation Papa Yann) :
- ancien `stories/001-le-pont-casse/` (V1 Ferretti + V2 correction)
- `stories/002-le-rire-qui-reste/` (en pause arc 2, non supprimé, déplacé en attente)
- `stories/004-cartable-a-trou/`, `stories/005-le-mardi/`, `stories/006-sept-a-rien/` (workshop 003, non validés)
- `stories/003-la-confidence/` (abandon workshop)
- `stories/series/`, `stories/ultime_debrief.md`, `stories/ultime_relecture.md`, `stories/SYNTHESE-2026-05-06.md`

**Raison :** Base propre après test PROCESS 11 étapes. Patterns consolidés dans lecons-vivantes. Aucun reste de la fabrication antérieure n'interfère.

**Impact :** Backlog reconfiguré (TEST-PROCESS-001, TEST-PROCESS-003, STORY-002-V2 fermés). Prochaine histoire = 005 (numérotation continue). INDEX stories/decisions mis à jour.

**Statut :** ✅ Exécuté. Aucune donnée perdue (lecons-vivantes contient les patterns).

---

### Décision C : Renommage 003-v2 → 001 + restructuration base propre

**Décision :** `003-le-pont-casse-v2/` renommé `001-le-pont-casse/`. Dossier interne nettoyé (suppression versions-writers/, lecteurs-temoins/, rewrite/, selection/, synthese-lecteurs/, gatekeeper-verdict/, relecture-rewrite/ du commit, présence en _archive/ pour tracabilité). Conservés : README (frontmatter à jour), kanban.md (histoire rendue), pitch.md, plan-histoire.md, briefs/, texte.md (canon), synthese-finale.md, _archive/.

**Raison :** Une seule histoire canon à ce stade. Numérotation continue (prochaine = 005, non 004). Arborescence claire pour futures histoires.

**Impact :** `stories/INDEX.md` & `stories/_gabarit/` à jour. `narration/INDEX.md` reflète l'état (001 seule), prochaine = 005.

**Statut :** ✅ Exécuté. Kanban mis à jour.

---

### Décision D : Brainstorm prochains sujets — différé à session suivante

**Décision :** Papa Yann lance brainstorm 005 (sujet + casting + brief Papa Yann) **à la prochaine session**. Conseiller + Directeur produisent brief initial.

**Raison :** User cuit après 3 sessions intenses (2026-05-02 → 2026-05-08). Repos conseillé. Matière en attente : `stories/axes-histoires-en-stock.md` (10 unitaires + 5 transversaux).

**Impact :** STORY-005 créé dans backlog (Haute priorité, "À faire"). Éétape 1 (pitch) prête à lancer dès GO Papa Yann.

**Statut :** ⏳ En attente auteur.

---

## 2026-05-11 — Méthodologie Voice Design unifiée pour les garçons (méthodo v24)

**Contexte :** session intensive de création des voix garçons (Wex, Polo, Melki, Lulu, Nono) avec méthodologie commune + tics phonétiques abandonnés.

**Décisions :**
- ✅ **Structure de prompt unifiée** garçons : `Animated little guy voice for animation series` + curseurs (timbre/cadence/rire/énergie) variables par perso. Détails dans `personnages/voix-meta/_VOICE-IDS-CASTING.md`.
- ✅ **Tics phonétiques abandonnés** (Wex) : plus de `ze`, `ouitte`, `é-stylo`, `b-bus` au niveau Voice Design. Si besoin de tics par perso → pronunciation dictionary niveau **génération TTS** (étage 2).
- ✅ **Naming bibliothèque ElevenLabs** : convention `Lumi <prénom> <adjectif>` (ex: `Lumi Wex Héros`, `Lumi Polo Fier`, `Lumi Melki Précis`).
- ✅ **Zéro négation dans Voice Design** (AP#16 confirmé empiriquement) — toujours reformuler en affirmatif.
- ✅ **Pierrot existant conservé** (`ukIKjXqbiGGkqIz0SW5c`) — pas refait dans méthodo v24.
- ⏳ **Lulu bloqué** par filtre Prohibited Use Policy après 9 itérations — à reprendre après cooldown.

**Voice IDs gravés (5/5 garçons complet + Raph) — figés 2026-05-12 :**
| Perso | Voice ID | Méthodo | Naming bibliothèque |
|-------|----------|---------|---------------------|
| Wex | `G54e8CyYslC2Y4ZupTlg` | v24 | Lumi Wex Héros |
| Polo | `5wcx0KzRnrP48I5RCVD8` | v2 | Lumi Polo Fier |
| Melki | `sWfumkYiI1QERQ5INqRQ` | v1 | Lumi Melki Précis |
| Pierrot | `ukIKjXqbiGGkqIz0SW5c` | pré-v24 | (conservé) |
| Lulu | `1XwHANMW4m2pxt7buPmQ` | filtre cumulatif vaincu | Lumi Lulu Léger |
| Nono | `f3w48h8ngnWWnhO9XGb3` | v1 (companion) | Lumi Nono Paisible |
| Raph | `Te5RKnm9ebwdEvZ1S5pS` | existant | — |

**Impact apprentissage :** AP#15 (filtre cumulatif), AP#16 (négations interdites), AP#17 (compteur EL CRLF) ajoutés à `audio-direction-elevenlabs/07-anti-patterns.md`.

---

## Questions ouvertes (à trancher)

| # | Question | Bloquant ? | Fichier |
|---|----------|-----------|---------|
| 1 | Nom de l'univers — lequel parmi 5 finalistes ? | Non | `../univers/meta/nom-candidats.md` |
| 2 | ~~Compagnons — forme exacte ? Quand apparaissent-ils ?~~ **TRANCHÉ 2026-04-29** (ondes/couleurs, milieu/fin S1) | — | `../univers/vie-quotidienne/compagnons.md` |
| 3 | Éléments magiques rares — garder ou écarter ? | Non | — |
| 4 | Baron — garder prénom "Trump" ? | Non | `../univers/baron.md` |
| 5 | Ombre Éternelle — concept actif ou standby ? | Non | — |
| 6 | Modèle Janus — référence discrète ou assumée ? | Non | `../INBOX.md` (rapports JP Petit) |
| 7 | Nom du prof d'Histoire | Non | `../univers/vie-quotidienne/ecole.md` |
| 8 | Nom des axes verts (Coulées ? Glissières ? Axes vivants ?) | Non | `../univers/vie-quotidienne/transport.md` |
| 9 | Ponaire — mécanique précise + lien voyages culturels | Non | `../univers/vie-quotidienne/transport.md` |
| 10 | Nombre de villes max par pays | Non | `../univers/vie-quotidienne/geographie.md` |
| 11 | Liste des Sensibilités — fermer les sous-types (Fréquence/Son/Schumann) | Non | `../univers/fondements/sensibilites.md` |
| 12 | Quand Wex commence à contrôler sa Vision causale ? (S1/S2/S3) | Non | — |
| 13 | Mentor de Wex — qui ? Quel âge ? Quelle sensibilité ? | Non | — |
| 14 | Castings cross-country (Hébreu, Ghibli, Swahili…) — démarrer lequel en premier ? | Oui pour S2 | `../cross-culture/castings-nationaux/INDEX.md` + `../cross-culture/prenoms/INDEX.md` |
| 15 | Tokens `{titi_N}` dans les textes canon — rétroporter `001-le-pont-casse/texte.md` ou attendre le 2e casting national ? | Oui avant 2e casting | `../stories/001-le-pont-casse/texte.md` + `../personnages/lookup.yml` |
| 16 | **Sous-spé narration-pmo future** : si volume grossit (>20 stories, 2+ castings nationaux actifs), faut-il scinder en `narration-stories-pmo` (kanban + SLA) vs `narration-meta-pmo` (PROCESS + decisions + roadmap) ? Hypothèse transmise par game-pmo 2026-05-11. Pas urgent — tient pour l'instant. | Non (hypothèse) | `.claude/agents/narration-pmo.md` |
| 15 | Mémoire narrative des lecteurs — les enfants connaîtront les histoires précédentes et feront des liens. Comment en tenir compte dans l'écriture (callbacks implicites, évolution persos, arcs longs) ? À partir de quelle histoire introduire ce niveau de couche ? | Non | — |
| 16 | Quartier / communauté — nommé (Clairval, Tissé, Hameau de l'Aube, la Ronde…) ou volontairement anonyme ? Décision 26/04 a écarté les villes réelles, mais n'a pas tranché si on nomme la communauté/quartier. Trade-off : ancrage affectif (B) vs universalité cross-culture (A). | Non | `../univers/vie-quotidienne/geographie.md` |
| 17 | ~~**V1 minimaliste vs V2 comité pour 003-v2**~~ **TRANCHÉ 2026-05-08** (V2 comité retenue, canonisée 001) | — | — |
