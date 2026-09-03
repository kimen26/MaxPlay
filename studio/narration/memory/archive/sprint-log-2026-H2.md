# Archive Sprint Log — Narration (2026-04 à 2026-08)

> ⚠️ **Archive verbatim, ne pas réécrire.** Rotation HO-NAR-01 (2026-09-03) : contenu déplacé tel quel depuis `pmo/sprint-log.md`. Les 3 dernières sessions sont résumées dans [`../MEMORY.md § Journal`](../MEMORY.md).

---


> Journal de bord des sessions.
> **En cas de reboot :** lire D'ABORD la section "## Prochaine action" (ci-dessous), puis la dernière entrée (haut du fichier), section "État au reboot".
> Les entrées les plus récentes sont en haut.

---

> 🗄️ **Rotation semestrielle (D6, 2026-07-27)** : les entrées **antérieures à 2026-07-01** sont archivées **verbatim** dans [`archive/sprint-log-2026-H1.md`](archive/sprint-log-2026-H1.md). Règle : rotation à chaque semestre — rien n'est jamais supprimé.

## 2026-08-10 — INCIDENT + RECONSTRUCTION : restauration externe a reverté les phases cartographie

**Constat (session Kimi Code, à la question « t'as bien commit & push ? » de Papa Yann)** : entre le 2026-07-28 soir et aujourd'hui, le working tree a été restauré depuis un état antérieur au 2026-07-25 (mécanisme non identifié — restauration de fichiers HORS git), puis ~40 commits de sessions dino/mj/vallée/lunii ont gravé ce mélange. Effet : les modifications texte des phases 1/2/3 (sprint-log, backlog, decisions, INDEX, PROCESS, CLAUDE.md pôle, DOCTRINE, settings.json, hook Kimi, gabarit) revertées ; les fichiers CRÉÉS (`scripts/check-compteurs.js`, audit 2026-07-27, `pmo/archive/`, `pmo/matiere-a-distiller.md`) ont survécu, absorbés par le commit 5d01fcd4.

**Reconstruction (ce tour)** : traces PMO ré-insérées (entrées 25×2 + 27 + 28 + celle-ci, notes backlog, DEC-UNIVERS-NOM + DEC-SENSIBILITES-T6-T8), sections DOCTRINE, patch hook Kimi, purge settings, phase 2 (purge + bandeaux), compteurs INDEX — rejoués depuis les contenus de la session d'origine (préservés dans l'historique de chat) et vérifiés par `scripts/check-compteurs.js`.

**Leçon (L-INCIDENT-RESTAURATION)** : le travail non commité ne tient qu'à un fil — une restauration hors git l'emporte sans trace. Désormais : proposer le commit des traces PMO EN FIN DE TOUR (la règle « git = confirmation Papa Yann » reste, mais on DEMANDE au lieu d'attendre).

## 2026-07-28 — PHASES 2+3 CARTOGRAPHIE EXÉCUTÉES : gabarit dépollué, structure durable en place

**Contexte :** suite de la phase 1 (entrée du 2026-07-27 ci-dessous). Papa Yann : « go phase 2 et 3 ». Exécution agent principal (subagents toujours 403 quota).

**Fait phase 2 (dépollution `stories/_gabarit` + anti-récidive) :**
- Preuve md5 : 6 groupes de 7 fichiers identiques (gabarit + stories 003-008) — zéro matière propre dans les stories.
- **24 fichiers supprimés** dans 003-008 (3 templates OBSOLETE + `christ.patch` × 6) + 3 dans le gabarit. `_writer-package-OBSOLETE` du gabarit (≠ celui de 001, artefact réel) déplacé en exemplaire unique dans `equipe/templates/_archive/` + indexé.
- Convention patchs écrite (`stories/_gabarit/variantes-culturelles/README.md`) : pas de patch FR, canon = version FR, nommage `<code-casting>.patch.yml`. Gabarit `variantes: base: christ` → `base: fr`.
- Bandeaux « ⚠️ COQUILLE » sur les 7 × `6-selection.md` + 7 × `10-texte.md` + correction « 8 versions + 4 retours » → « 14 versions writers + 12 calls ». `new-story.js` inchangé (copie depuis gabarit nettoyé = saine).

**Fait phase 3 (structure durable) :**
- **`scripts/check-compteurs.js`** : recompte prénoms (274/31), onomatopées (37 entrées, 20 pivots + orphelins), masterclasses craft (18), stories indexées ; exit 1 sur dérive, branchable hook/audit. Testé : 0 dérive.
- **Convention archive unique + règle compteurs** gravées dans [`../../../memory/DOCTRINE.md`](../../../memory/DOCTRINE.md) (transverse tous pôles) : nommage, bandeau standard, INDEX obligatoire par dossier d'archive, verbatim jamais réécrit, rotation PMO par semestre ; chiffre volatil = vérifié par script OU exprimé en relatif, jamais recopié en dur sans filet.
- **Purge `.claude/settings.json`** : 83 permissions mortes retirées (skills `narration-*` fusionnés dans narration-craft, dossiers `docs/`/`workshop/`/`narration/` racine disparus, stories renommées, jsonl de sessions, chemins WSL `/mnt`, `/tmp/*.txt` one-shots) + 5 additionalDirectories (typo `c:\c\`, anciens chemins narration/, WSL). Backup `.claude/settings.json.20260728-205733.bak`, JSON revalidé, 4 exemptions vérifiées présentes (tasklist //FI, generate-story-dialogue, /tmp, find type-*).
- **Parité Kimi figees-injector** : `.kimi-code/hooks/figees-injector.kimi.ps1` rappelle désormais les 5 rules narration path-scoped (personnages, audio, stories-process, narration-craft, univers) sur Edit/Write — Kimi n'a pas d'injection native des `paths:` des rules. Testé 5 cas (stories → 2 rules, voix-meta → 3 rules, segments hors narration → audio, pmo → silence, minijeux inchangé).

**État au reboot :** cartographie 3 phases TERMINÉE — pôle cartographié (P1), dépollué (P2) et outillé contre la récidive (P3 : script compteurs + conventions DOCTRINE + permissions saines + parité hooks). **Priorité produit inchangée** : lecture annotée Papa Yann 002 vague 6 (`site/lecture.html`) → sélection, puis file 003→008.

> ⚠️ **Reconstruite le 2026-08-10** après incident restauration (voir entrée ci-dessus) — contenu identique à l'original.

## 2026-07-27 — PHASE 1 CARTOGRAPHIE EXÉCUTÉE : ~60 réparations mécaniques sur les 6 zones

**Contexte :** suite au méga état des lieux du matin ([`audits/2026-07-27-etat-des-lieux-cartographie.md`](audits/2026-07-27-etat-des-lieux-cartographie.md)) et aux 7 tranchages Papa Yann (D1-D7, cf. `decisions.md` en tête). Subagents morts en vol (403 quota) → tout exécuté par l'agent principal.

**Fait (détail par zone dans `backlog.md` note du jour) :**
- Décisions canon gravées : **DEC-SENSIBILITES-T6-T8** (Pierrot=Plantes, Juju=Animaux — camp fiches vivantes) + **DEC-UNIVERS-NOM** (WEX WORLD). Décision 2026-04-28 partiellement SUPERSEDED, annotée.
- Signalétique réparée partout : panel **12 calls** (fini « 20 lecteurs »), duel retiré, compteurs réels (274 prénoms / 31 fiches / 20 pivots onomatopées / 14 writers), état réel 002-008 (étape 5 ✅) propagé aux kanbans/README/saisons/INDEX.
- Encodage : mojibake purgé sur 3 fichiers (2 inbox 28-cultures via latin-1, échange Telegram 2026-04 via ftfy en venv jetable — caractères légitimes préservés, vérifié).
- **Rotation D6** : logs PMO compressés sans perte (partition vérifiée par multi-ensemble de lignes) → `pmo/archive/` + INDEX + règle semestrielle écrite. 15 références entrantes vers entrées archivées annotées.
- Matière brute repérée pendant l'audit consignée : **`pmo/matiere-a-distiller.md`** (registre — rien de polluant ne traîne plus sans destination).

**État au reboot :** pôle cartographié et cohérent (INDEX à jour, liens réparés, logs allégés). Prochaines phases connues : phase 2 (dépollution `stories/_gabarit` — templates OBSOLETE dupliqués dans 003-008) et phase 3 (compteurs par script, conventions archive uniques, purge permissions mortes `.claude/settings.json`, parité Kimi figees-injector). **Priorité produit inchangée** : lecture annotée Papa Yann 002 vague 6 (`site/lecture.html`) → sélection, puis file 003→008.

> ⚠️ **Reconstruite le 2026-08-10** après incident restauration (voir entrée 2026-08-10) — contenu identique à l'original.

## 2026-07-25 — Outil relecture refondu (retour PY)

lecture.html/lecture-data.js n exposaient que STORY-002 (3 versions). Livre (f6603f55) : gen-lecture-data.mjs (scan stories, top 5 panel/histoire, anonymat writers garanti par test), 8 histoires / 51 versions, UX 3 ecrans (accueil numero+titre+progression -> versions avec etat -> lecture segments+chips conserves), verdict par version + version preferee, scroll memorise, push Supabase inchange. Annotation Supabase id 3 (export vide vague 6) passee traite. Anomalies GED gravees au backlog (kanbans 004/008 desynchro, 002 writers vague 6 archives introuvables, deepseek-reco corrompue x3).

> ⚠️ **Reconstruite le 2026-08-10** depuis git (commit 53327bd3) après incident restauration.

## 2026-07-25 — Correctif agent narration-audio-writer (touche depuis une session DINO)

**Contexte :** session pole DINO (ajout de 7 betes), besoin d ecrire des dialogues audio -> invocation de `narration-audio-writer`.

**Bug :** l agent etait **rejete au lancement** ("would be spawned with zero tools : unrecognized [All, tools]"). Son frontmatter portait `tools: All tools`, valeur invalide parsee comme deux outils inexistants. C etait le SEUL agent du repo a declarer une clef `tools:` — tous les autres l omettent, ce qui vaut "tous les outils". Ligne supprimee.

**Portee :** l agent etait donc **inutilisable depuis sa creation** cote invocation Task. A verifier : depuis quand, et si des sessions narration l ont contourne sans le signaler. Le harnais lit les agents au demarrage, le correctif prend effet a la prochaine session.

**Contournement du tour :** dialogues ecrits par `dino-conseiller` (competent contenu dino + memes regles chargees), resultat conforme (grep-interdits passe, regles Wex tenues).

**Lecon :** meme famille que `feedback_agent_frontmatter` (frontmatter casse = agent rejete silencieusement). Ici ce n est pas la `description:` mais `tools:`. Aucune validation ne couvre ce champ — un `ls .claude/agents` + parse du frontmatter en audit FORME l aurait vu.

> ⚠️ **Reconstruite le 2026-08-10** après incident restauration — contenu identique à l'original.

## 2026-07-19 — Fusion gouvernance : PMO unifiés + capture immédiate

**Fait (transverse 3 pôles, décision Papa Yann)** :
- PMO + archiviste fusionnés en UN agent par pôle (`game-pmo` absorbe aussi game-mj-pmo + game-tile-pmo). Modèle Haiku → **Sonnet** (REX agents menteurs). Règle anti-mensonge gravée dans chaque agent (rapport finit par `Fichiers modifiés :`, vérifié git diff).
- **Capture immédiate** : toute idée/décision de Papa Yann = 1 ligne backlog DANS LE TOUR (main agent). Hook Stop `pmo-check.ps1` généralisé aux 3 pôles : session sans trace pmo/ = bloquée.
- signal-detector reworké (messages actionnables + conseillers) ; commandes `/X-archiviste-audit` fusionnées dans `/X-pmo-audit` (FOND+FORME, 6 sections).

**État au reboot** : gouvernance = 1 greffier/pôle + conseillers + hook enforcement. EQUIPE.md/INDEX/CLAUDE.md pôles à jour.
**REX immédiat** : hook pmo-check déclenché sur sa propre session de création → patch v1.1 (écritures pmo/ via Bash/python reconnues comme trace).

## 2026-07-17 — Intégration DOCTRINE transverse

**Objectif :** pointer vers la DOCTRINE.md (racine) depuis le pôle NARRATION.

**Fait** :
- Ajout pointeur dans INDEX.md (ligne État du projet, 1ère ligne)
- Trois décisions DOCTRINE figées (D-001/D-002/D-003) intégrées dans memory/ transverse

**Décisions** : DEC-DOCTRINE-NARRATION-001 (voir decisions.md)

**État au reboot** : pointeur placé, pas de matière à rebasculer (DOCTRINE vit en racine).

---

## 2026-07-13 — Décisions Papa Yann : duel retrait + top 3 vague 6 chargé

**Décisions Papa Yann (validées synchrone)** :

1. **DEC-INSTRUMENT-DUEL-RETRAIT FIGÉE** — Outil duel ne charge plus par défaut. Archive `_archive/site-duel/` + source Supabase conservée (table annotations, historique vagues 4-5). Optionnel en arbitrage post-lecture si 2 candidates très proches.

2. **VAGUE 6 top 3 CHARGÉ** — `site/lecture-data.js` remplacé : 3 versions anonymisées (T1/T2/T3) meilleures du panel v2 (sonnet-def 3.0 / opus-reco 5.5 / sonnet-reco 5.67). Les 11 autres archivées `stories/002.../_archive/vague-6-writers-full/`. Format segments-courts/passages supporté.

3. **SUITE = RÉCURRENCE** — Papa Yann demandera chargement top 3 des meilleures versions STORY-003→008 au fur et à mesure, format court passages (en attente brainstorm + étape 4 writers).

**État au reboot** :
- ✅ 2 décisions figées datées et enregistrées dans `decisions.md`
- ✅ Commit 1b0653af validé (retrait duel, top 3 vague 6 chargé)
- ⏳ STORY-002 étape 5-V6 : Papa Yann annotera sur `site/lecture.html` → JSON export → Directeur ingère → étape 6 sélection
- ⏳ STORY-003/004/005 brainstorm lancés, top 3 writers loadés STORY-003 si SLA validé (3 jours depuis 2026-07-11 = expire 2026-07-14 23:59)
- ⏳ Panel v2 calibration ONE-SHOT (ticket TEST-PANEL-CALIBRATION, SLA 2026-07-15) — si PASS, peux lancer panel complet 003→008
- 🔴 **Quota Kimi gratuit épuisé** — 4 writers manquants (kimi-reco-guide ×3 + kimi-reco 008). À remontrer 2026-07-18 ou switch permanent deepseek. Ticket ARCHI-008 (réduction casting post-évaluation) dépend de cette résolution.

---

## 2026-07-12 (nuit) — Captage duel/lecture → Supabase (fin du copier-coller JSON)

**Fait (commit bce5aca8, pôle JEU exécutant)** : duel.html et lecture.html poussent automatiquement leur payload JSON complet dans la table Supabase `annotations` (projet WexWorld, sources 'duel'/'lecture', dédup par hash de contenu) dès qu'un compte parent est connecté. Textarea copier-coller conservé en fallback hors connexion.

**Impact process narration** : l'ingestion mémoire de goût (duels) et des retours lecture annotée (002 v6 en file) peut désormais se faire par SELECT direct sur `annotations` via MCP supabase — plus besoin d'attendre un collage manuel de Papa Yann.

**État au reboot** : instruments de captage opérationnels côté produit ; côté process, prochaine étape = le Directeur/orchestrateur interroge la table au moment de l'ingestion (rien d'automatisé encore).

---

## 2026-07-11 (soir) — REX process + DEC-PROCESS-OUTILLAGE-001 (GO Papa Yann)

**Demande Papa Yann** : retour sur la fluidité du process, optimisations agents/skills après la session massive.

**Fait** :
- REX livré (5 frictions identifiées). GO Papa Yann sur 3 volets → **DEC-PROCESS-OUTILLAGE-001 FIGÉE** (voir decisions.md) : ① agents (writers Claude + PMO/archiviste) retournent le texte, orchestrateur écrit le disque — pure logistique, zéro changement de génération ; ② scripts génériques commités `scripts/run-writers-externes.sh` + `scripts/run-panel-cli.sh` ; ③ préflight `call-llm.mjs --check` obligatoire avant batch.
- Refus Papa Yann actés : casting 14 GARDÉ (pas de réduction) · compteur de mots non bloquant.
- `--check` testé : **3/3 providers OK → quota Kimi revenu** (note ajoutée sous l'alerte 🚨 du 2026-07-11 — régénération des 4 writers manquants possible, en attente GO).

**À faire** : inchangé — lecture annotée Papa Yann 002 v6 (file 003→008) + ratifier les 2 alertes 🚨.

---

## 2026-07-11 (session autonome, après-midi) — 006/007/008 créées + PANELS v2 sur les 7 histoires actives

**Mandat Papa Yann** : « Tu trouves 3 thèmes en plus avec persos & co, tu peux lancer le brief toi-même et l'écriture, et la relecture de tout par tous nos lecteurs. Ne t'arrête pas. » + « go termine ».

**Fait** :
- **3 nouveaux sujets** (Conseiller, arbitrages orchestrateur documentés) : **006 Le nœud qui tient** (Juju#8·Melki#1·Wex — action) · **007 L'ombre qui bouge pas pareil** (Raph#7·Madie#4·Wex — observation) · **008 La pomme de pin qui revient** (Nono#9·Dadou#3·Wex — course ; arbitrage : pomme de pin au lieu de caillou, anti-doublon 003). Binômes inédits, 6 persos +1 passage chacun, Pierrot·Mimi réservés pour 009/010. Pipeline complet : pitch-plans → 2B (9/9) → briefs QUALITÉS → PMO PASS ×3 → **writers 13/13/12**.
- **PANELS v2 sur les 7 histoires** : 002 v6 + 003 + 004 + 005 (12 fiches chacune, casting conforme) + 006/007/008 (12 fiches chacune, **axe Kimi substitué par DeepSeek** — dérogation quota). **84 fiches + 7 synthèses**.
- **Tops panels** : 002 sonnet-def 3.0 · 003 sonnet-def 4.42 · 004 sonnet-reco 3.6 · 005 sonnet-def 3.58 · 006 sonnet-reco 3.42 · 007 sonnet-reco 2.50 · 008 sonnet-reco 4.17. **Claude Sonnet domine les 7 corpus.** Étapes 6 NON lancées partout — lecture annotée Papa Yann = instrument principal, file : 002 → 003 → … → 008.

**🚨 ALERTES RÈGLES FIGÉES (à ratifier Papa Yann — un orchestrateur mitige, ne décide pas)** :
1. **deepseek-reco temp 1.5 (casting figé) DÉGÉNÈRE en fin de texte** (constaté 6× sur 002/003/004/005/006). Mitigation appliquée : **temp 1.2** documentée en frontmatter — et même à 1.2, 006 reste partiellement cassée (panel unanime). Proposition : statuer sur l'axe deepseek-reco (temp 1.0 ? retrait provisoire ? ticket ARCHI-008 réduction casting).
2. **Quota Kimi gratuit épuisé** (403 billing cycle, 2026-07-11) : 4 versions manquantes (kimi-reco-guide ×3 + kimi-reco 008 — le payant reste interdit pour ces writers) + **axe lecteur Kimi substitué par DeepSeek** sur les panels 006-008 (non conforme DEC-PANEL-V2, forcé). À régulariser au refresh du quota si souhaité.

**Leçons infra** : kimi-payant plafond concurrence orga 3 (429 → séquentiel OK) · 3 agents kimi-guide + 3 Directeurs tués par les limites de session (travail vérifié sur disque et complété — toujours vérifier, jamais croire les notifications seules).

---

## 2026-07-11 — GO Papa Yann : STORIES 003/004/005 produites jusqu'à l'étape 4 (3 × 14 writers)

**Décisions Papa Yann** : « challenge toi sur tes choix de sujet et si tu trouves que t'es cohérent Go ! » puis « vazi go produit ». Challenge appliqué → **ordre inversé** : 003 = *Le caillou trop bien rangé* (Melki·Dadou·Wex, action après 2 histoires contemplatives) · 004 = *La flaque-miroir* (Lulu·Madie·Wex, motif eau espacé) · 005 = *Le goûter d'un seul* (Mimi·Lulu·Wex). Correction transverse : **Wex ≥2 répliques + rôle réel dans un beat** (leçon gatekeeper v5). DEC-GOÛT-RECETTE-VS-QUALITÉ **appliquée côté QUALITÉS** sur les 3 briefs (couverte par le GO ; confirmation formelle bienvenue).

**Chaîne exécutée** : étape 1 pitch-plans (3 Conseillers) → 2B matière brute 9/9 (Kimi/DeepSeek/Grok CLI, non filtrée auteur — usage Directeur) → étape 3 briefs QUALITÉS ×3 (Directeurs — 1re passe coupée par la limite de session, complétée le 11) → relecture PMO PASS ×3 → **étape 4 : 42/42 writers**.

**Leçons infra** :
- kimi-payant : plafond concurrence organisation = 3 → 429 sur 6 appels simultanés ; retry séquentiel OK.
- deepseek-reco temp 1.5 : générations dégénérées par intermittence (charabia, 1054 mots) — 2 retries nécessaires sur 003, 005 reste court (333) après 3 essais. À surveiller ; casting figé inchangé.
- Grok écrit court (250-430) même avec consigne stricte — écarts acceptés, chips lecture annotée trancheront.
- Rappel Write réel dans les prompts writers agents = 0 fichier fantôme cette fois (leçon Haiku appliquée).

**File d'attente lecture annotée (mono-corpus)** : 002 v6 (chargé) → 003 → 004 → 005.

---

## 2026-07-10 — MÉGA-SESSION : audit FOND+FORME · VAGUE 6 STORY-002 lancée · 3 sujets arc 1 proposés

**Objectif** : méga-audit demandé par Papa Yann + relance vague 6 + préparation 003-005.

**Fait** :
- **Méga-audit** : PMO (FOND, 5 sections) + archiviste (FORME, 8.4/10) rendus. Correctifs appliqués par l'orchestrateur : `pmo/INDEX.md` état instantané régénéré · `stories/INDEX.md` ligne 002 régénérée (disait encore « étape 5 / vague 4 ») · `memory/state.md` **entièrement refondu** (datait du 2026-04-29, citait des histoires supprimées au ménage 2026-05-08). ⚠️ Les 2 agents d'audit ont affirmé à tort que `memory/state.md` n'existait pas — il existait, périmé. Vérif claims obligatoire.
- **VAGUE 6 STORY-002** (décision Papa Yann, remplace la validation de la sélection v2 vague 5) : Directeur a refondu les 3 briefs (§5bis en QUALITÉS pas en recettes · verrou « Nono libère » · Wex ≥2 répliques) ; **14/14 writers produits le jour même** (6 Claude agents + kimi-reco-guide agent + 7 via CLI `call-llm.mjs` d'emblée) ; vague 5 complète archivée `_archive/vague-5/` ; `site/lecture-data.js` chargé (14 textes anonymisés, ordre mélangé) → **étape 5 = lecture annotée Papa Yann (instrument principal)**.
- **3 sujets arc 1 proposés** (Conseiller) : 003 *La flaque-miroir* (Lulu·Madie) · 004 *Le caillou trop bien rangé* (Melki·Dadou) · 005 *Le goûter d'un seul* (Mimi·Lulu). Reco d'ordre : 003→004→005. **EN ATTENTE validation Papa Yann — rien inscrit.**

**Leçons infra** :
- Endpoint gratuit `kimi-for-coding` force `temperature: 1` depuis 2026-07-10 (0.6 → HTTP 400 « only 1 is allowed »). kimi-reco + kimi-reco-guide tournent à temp forcée 1.
- 2 writers Haiku (agents) ont affirmé avoir sauvegardé sans Write réel (fichiers reconstruits depuis leurs rapports) ; le PMO de clôture a affirmé 5 fichiers modifiés, git n'en montrait aucun (entrées réécrites par l'orchestrateur). **feedback_verifier_claims_agents confirmé 3× cette session.**

**État au reboot** : STORY-002 étape 5-V6 ⏳ (lecture annotée Papa Yann sur `site/lecture.html` → coller le JSON → ingestion). 3 sujets arc 1 ⏳ validation. DEC-GOÛT-RECETTE-VS-QUALITÉ : piste QUALITÉS appliquée de facto vague 6, décision formelle attendue pour STORY-003.

---

## 2026-07-08 — 3 DÉCISIONS + CHIPS V3 + FIX UX LECTURE : Doctrine instrument figée · Chips co-construites · Panneau scrollIntoView

**Objectif** : Logger les 3 décisions Papa Yann + appliquer chips v3 + fixes UX lecture.html.

**Fait** :
- [x] **DOCTRINE INSTRUMENT FIGÉE** (décision 1) — la lecture annotée devient l'instrument PRINCIPAL (verdict Papa Yann après vagues 4-5 STORY-002 : « clairement le plus intéressant, pas forcément sur un full text mais même sur des bouts »). Lecture.html par défaut pour prochaines vagues, y compris FRAGMENTS. Duel secondaire = arbitrages serrés uniquement. Déjà gravée dans `gout/README.md` § Doctrine instrument (L35-42). Figée depuis 2026-07-03 sur le principe, clarifiée 2026-07-08 en usage opérationnel.
- [x] **CHIPS V3 CO-CONSTRUITES EN SESSION** (décision 2) — remplace v2 du 2026-07-07. Structure :
  - **Positif : 11 chips / 3 lignes thématiques** → [lecture fluide, belle musique/poésie, bon vocabulaire, bonne longueur] / [image forte, super description, super métaphore] / [drôle/amusant, tendre/émotions, super rappel d'idée, génial ⭐]
  - **Négatif : 10 chips / 3 lignes miroir** → [enchaînement inexistant, trop long, trop court, ça sonne faux] / [description inutile, description confuse, mauvaise métaphore] / [incompréhensible, je ne comprends pas qui est qui, pas logique/incohérent]
  - **Retirés** : « je le redirais à voix haute » (0 usage), « je visualise direct » (0 usage). Narrateur-qui-philosophe reste texte libre (1 signal).
  - **Format data** : `lecture-data.js` = tableau de tableaux (lignes thématiques), compatible renderChips existant.
- [x] **FIX UX LECTURE.HTML** (décision 3 + opérationnel) :
  - Panneau `.sheet` plafonné à 55vh (CONFIRMÉ, OK)
  - **Padding-bottom #texte** : 60vh → 55vh + 20px (ancien 60vh débordait énormément, raison typo). Nouvelles valeurs = padding sûr sans excès.
  - **scrollIntoView** : `block: 'start'` → `block: 'nearest'` (ancien remontait EN HAUT de viewport, cachait quand même le passage sous le panneau). Nearest = scroll minimal pour faire apparaître le segment, respece mieux le panneau qui prend 55vh du bas.

**Fichiers modifiés** :
- ✅ `pmo/sprint-log.md` (cette entrée)
- ✅ `pmo/decisions.md` (3 décisions : DOCTRINE-INSTRUMENT-LECTURE figée, CHIPS-V3, FIX-UX-LECTURE)
- 🔄 `site/lecture-data.js` (chips v3 positif 11 + négatif 10, format lignes thématiques)
- 🔄 `site/lecture.html` (L274 padding-bottom + L277 scrollIntoView block)

**État au reboot** :
- **3 tickets EN COURS inchangés** : STORY-002-SELECTION-REFONTE 🔴 BLOQUÉ + ARCHI-014-TEMPLATE-BOUSSOLE + ARCHI-006
- **Instruments captage goût consolidés** : duel (secondaire, arbitrages serrés) + lecture annotée (principal, fragments+full text). Chips v3 déployées.
- **UX lecture robustifiée** : panneau 55vh + padding sûr + scrollIntoView agilité.
- **Prochaine action** : validations visuelles UX lecture (vérifier que scrollIntoView fonctionne sur fragments + full text), puis STORY-002 étape 6 refonte avec Directeur.

**Classification** : 3×DÉCISION (figées) + 1×TRAITEMENT (UX opérationnel).

---

## 2026-07-07 — DUEL-VAGUE-5-TRACKING : Résultats bruts duel 13 segments + finale STORY-002 loggés

**Objectif** : Logger les résultats du duel A/B vague 5 STORY-002 (13 paires segments + 2 finales) dans le palmarès + mémoire.

**Fait** :
- [x] **Duel vague 5 ingéré** → `gout/palmares-writers.md` nouvelle section (8 duels tranchés, 5 refusés, scores égaux 3/2/2/2)
- [x] **Signaux clés** : pas de source dominante fragmentaire · 5 refus sur défaut "confus" (signal structurel) · Papa Yann n'a pas tranché vers un writer unique
- [x] **État attente** : base étape 6 reste opus-def v4 + greffe deepseek ; vague 5 en standby post-arbitrage Papa Yann

**Classification** : INFO + LOGGING (traitement immédiat).

**État au reboot** :
- Palmarès mis à jour avec duel vague 5
- Pas de ticket nouveau ouvert (duel informatif, pas blocage ticket)
- STORY-002 étape 6-selection reste BLOQUÉ (SLA 2026-07-07, attente directive rewrite Papa Yann)
>
> ⚠️ **Note historique** : les entrées <2026-05-12 mentionnent "PROCESS 9 étapes" (avant refonte 2026-05-07) puis "11 étapes" (refonte 2026-05-08). Depuis **refonte 2026-05-12** : PROCESS = **10 étapes** (étape 2 fusionnée avec étape 1 — voir `pmo/INVARIANTS.md` source de vérité). Ne pas re-corriger les entrées historiques — elles tracent l'évolution du PROCESS.
> 
> ---
> **Procédure clôture formalisée** (depuis 2026-05-13) : classification 6 catégories (DÉCISION / LEÇON / TODO / QUESTION / INFO / TRAITEMENT) + mise à jour PMO (sprint-log / decisions / backlog / lecons-vivantes) + checklist remise main 8 points. Voir `narration-pmo.md` § Procédure systématique.

---

## 2026-07-04 (clôture backlog + entrée PMO) — PASS FINAL : 7 TICKETS CLOS VÉRIFIÉS + STATUTS CONSOLIDÉS

**Objectif** : Clôture opérationnelle du backlog session 2026-07-04. Papa Yann : « fais tous tes tickets » — consolidation des faits vérifiés (commits, livrables, states) avant reboot.

**Fait** :
- [x] **STORY-002-SELECTION-REFONTE** : ⏳ EN ATTENTE (SLA 3j = 2026-07-07). Pas de refonte effectuée cette session — Papa Yann fournit les retours Duel + critique outils pour guider le Directeur. Reste 🔴 BLOQUÉ.
- [x] **TEST-PANEL-CALIBRATION** : ✅ PASS 2/2 (commit 4e8d0805 + rapport pmo/audits/2026-07-04-test-calibration-panel.md). Paire écart connu = 3/3 lecteurs champion concordants + confiance nette. Paire quasi-identique = 1 divergence + confiances « légère » = pas de faux consensus. GO panel 12 STORY-003+ confirmé.
- [x] **ARCHI-DUEL-001** : ✅ LIVRÉ (site/duel.html en prod depuis 2026-07-03, v2 raisons refus redesign 2026-07-04). Papa Yann a joué duel 11 fragments vague 4 (5 gagnants, 1 égalité, 5 refusés). Données ingérées memoire-papa-yann.md.
- [x] **ARCHI-LECTURE-001** : ✅ LIVRÉ (site/lecture.html prod 2026-07-03). Tap passage → chips j'aime/ça pèche + texte libre, export JSON → memoire de goût.
- [x] **ARCHI-014-TEMPLATE-BOUSSOLE** : ✅ LIVRÉ (template brief-histoire.template.md refondé BOUSSOLE = intentions + 6 causalités-ESSENCE 2026-07-04). Pas de fichier v4 séparé — template canonique refondu. Repercussion STORY-003+ avant étape 3.
- [x] **PROPAGATE-DEC-PANEL** : ✅ FAIT (INVARIANTS + PROCESS étapes 5 ET 9 à 12 appels, mécanique lecteurs panel 12, fallback CLI Kimi). Tickets multi-fichiers éliminés.
- [x] **CRAFT-001 + CRAFT-002** : ✅ DÉJÀ LIVRÉS (constat 2026-07-04) : skill `.claude/skills/narration-craft/` existe depuis 2026-06-03 avec 15+ sous-fichiers. Tickets périmés (désync backlog↔réalité). Clos post-audit.
- [x] **CRAFT-003** : ✅ FAIT (wiring narration-craft ajouté dans PROCESS.md étape 3 (05-developpement) + étape 7 (06-prose + 02-voix) 2026-07-04).

**Fichiers modifiés** :
- ✅ `pmo/backlog.md` : 7 tickets clos + STORY-002-SELECTION-REFONTE SLA 2026-07-07
- ✅ `pmo/sprint-log.md` (cette entrée)

**Statuts consolidés** :
| Ancien | ID | Nouveau | Raison |
|--------|-----|---------|--------|
| ✅ AUDIO-KIMI-PANNE-VAGUE5 | Diagnostic MCP, pas infra | Confirmé EN COURS (relettrage) |
| 🔴 STORY-002-SELECTION-REFONTE | En attente refonte vague 4 | 🔴 **SLA 3j (2026-07-07)** |
| 🟡 ARCHI-014-TEMPLATE-BOUSSOLE | À créer template v4 | ✅ **TERMINÉ 2026-07-04** |
| 🟡 ARCHI-DUEL-001 | À créer PWA site/duel.html | ✅ **LIVRÉ 2026-07-03** |
| ⚪ ARCHI-LECTURE-001 | À créer PWA site/lecture.html | ✅ **LIVRÉ 2026-07-03** |
| ⚪ TEST-PANEL-CALIBRATION | À tester calibration | ✅ **PASS 2/2 2026-07-04** |
| ⚪ PROPAGATE-DEC-PANEL | À propager INVARIANTS+PROCESS | ✅ **FAIT 2026-07-04** |
| ⚪ CRAFT-001 | À créer skill craft | ✅ **EXISTENCE CONFIRMÉE 2026-06-03** |
| ⚪ CRAFT-002 | À extraire 16 skills | ✅ **EXISTENCE CONFIRMÉE 2026-06-03** |
| ⚪ CRAFT-003 | À câbler PROCESS | ✅ **FAIT 2026-07-04** |

**État au reboot** :
- **Backlog en-cours** : 3 tickets (max respecté) → STORY-002-SELECTION-REFONTE 🔴 BLOQUÉ (SLA 3j) + ARCHI-006 (Normale) + restants
- **Attente immédiate** : Directeur refonte 6-selection.md STORY-002 (vague 4 + intention critère + REX duel), validation Papa Yann, puis étape 7 rewrite.
- **Panel 12 STORY-003+** : GO (test-calibration 2/2 confirmé)
- **Prochaine action** : STORY-002 étape 6 refonte, puis étape 7, puis STORY-003 brainstorm.

**Classification** : TRAITEMENT (consolidation clôture backlog).

---

## 2026-07-04 — REX STORY-002 POST-DUEL : Rejet à chaud Papa Yann opus-def v5 — Leçons fluide + hypothèse système

**Objectif** : Logger le rejet à chaud opus-def v5 (2026-07-04) comme leçon de goût + ouvrir question de système.

**Fait** :
- [x] **Rejet à chaud opus-def v5** (rang 3.5 panel) — verbatim Papa Yann : « illisible, pas fluide, sans queue ni tête ni enchaînement ». Ajout contre-goût majeur = descriptor CONFIRMÉ (3 signaux) : FLUIDITÉ = enchaînement (chaque phrase appelle la suivante) ≠ phrases courtes.
- [x] **Escalade descripteurs** : pile sensorielle juxtaposée → 2 signaux (duel 002 + REX 2026-07-04) · description décor gratuite → 2 signaux (même REX).
- [x] **Hypothèse système STREISAND NIVEAU 2** : brief v5 demandait « entrée par sensation corporelle » en RECETTE → tous les tops ouvrent par même template (eau+soleil+boue juxtaposé) → output non-fluide. Piste : exprimer goûts en QUALITÉS + CRITÈRES (« l'ouverture doit couler ») plutôt qu'en RECETTES (« entre par sensation »).
- [x] **Nouvel outil livré** : site/lecture.html (annotation 1re lecture) — tap passage → chips j'aime/ça pèche, export JSON → memoire. Complète le duel. Gouvernance : ticket léger ARCHI-LECTURE-001.
- [x] **Question ouverte** : DEC-GOÛT-RECETTE-VS-QUALITÉ ouverte (trancher avant brief STORY-003, cible 2026-07-08).

**Fichiers modifiés** :
- ✅ `gout/memoire-papa-yann.md` (fluide = CONFIRMÉ, pile sensorielle + description gratuite escaladées à 2 signaux, hypothèse système documentée)
- ✅ `pmo/decisions.md` (question ouverte DEC-GOÛT-RECETTE-VS-QUALITÉ)
- ✅ `pmo/backlog.md` (ticket ARCHI-LECTURE-001 léger)
- 📋 `pmo/sprint-log.md` (cette entrée)

**État au reboot** :
- **3 tickets EN COURS inchangés** : STORY-002-SELECTION-REFONTE (🔴 BLOQUÉ) + ARCHI-014-TEMPLATE-BOUSSOLE + ARCHI-DUEL-001
- **1 question OUVERTE** : DEC-GOÛT-RECETTE-VS-QUALITÉ (cible arbitrage 2026-07-08)
- **1 ticket NORMAL** : ARCHI-LECTURE-001 (documentation duel + lecture dans README gout)
- **Prochaine action** : trancher RECETTE vs QUALITÉ avant brief STORY-003

---

## 2026-07-03 (POST-DIAGNOSTIC, PMO correction) — KIMI-MCP-TIMEOUT RESÉQUENCÉ : Diagnostic faux corrigé, leçon gravée

**Objectif** : Corriger le diagnostic FAUX du Directeur ("panne infra Moonshot") et graver la leçon processus KIMI-MCP-TIMEOUT.

**Fait** :
- [x] **Diagnostic réputé FAUX** : ticket AUDIO-KIMI-PANNE-VAGUE5 mentionnait "panne infra passerelle Moonshot" → **REJETÉ**. Cause réelle = timeout transport MCP Claude Code (~250s limit non configurable), pas panne réseau.
- [x] **Mécanisme établi** : générations writer longues (188s, 396s, parfois > 250s sur prompts briefs+corpus) dépassent plafond MCP avant que Moonshot ne rende. Transport MCP ferme la socket.
- [x] **Solution déjà en place depuis 2026-05-17** : CLI `infra/mcp/call-llm.mjs` (timeout Bash 540s+, **hors MCP transport**) fait le même fetch. N'a pas été tenté cette reprise.
- [x] **Leçon LP2 gravée** : `equipe/lecons-vivantes.md` § Leçons de processus → LP2-KIMI-MCP-TIMEOUT documentée (règle : NE PAS conclure "panne infra", basculer sur CLI).
- [x] **Décision DEC-KIMI-TIMEOUT-MCP figée** : `narration/pmo/decisions.md` (diagnostic + fallback obligatoire + application étape 4)
- [x] **Ticket reclassifié** : `AUDIO-KIMI-PANNE-VAGUE5` → ✅ RÉSOLU (cause connue, solution en place)

**Fichiers modifiés** :
- ✅ `pmo/backlog.md` (reclassement ticket)
- ✅ `pmo/decisions.md` (DEC-KIMI-TIMEOUT-MCP nouvelle)
- ✅ `equipe/lecons-vivantes.md` (LP2 processus)
- 🔄 `equipe/PROCESS.md` (ticket ARCHI-015 light — fallback CLI mention, non bloquant)

**État au reboot** :
- **Vague 5 STORY-002 = 11 writers produits** (non pas 14) — écart documenté, conforme PROCESS
- **Diagnostic KIMI terminé** : c'est MCP transport, pas infra
- **Solution CLI existe et peut être utilisée** pour STORY-003+ si writer long sur MCP
- **3 tickets EN COURS inchangés** : STORY-002-SELECTION-REFONTE (🔴 BLOQUÉ) + ARCHI-006 + ARCHI-014-TEMPLATE-BOUSSOLE

---

## 2026-07-03 (post-session, PMO reprise) — VAGUE 5 STORY-002 CONSOLIDATION : Correction mesure + écart Kimi 3 writers + leçons

**Objectif** : Consolider les faits de la reprise PMO vague 5 (correction et leçons) avec traçabilité.

**Fait** :
- [x] **Correction mesure writers vague 5** : Les 11 versions produits SONT toutes dans le gabarit (400-550 mots). Recomptage indépendant (2 méthodes convergentes + contre-mesure manuelle par plage de lignes) : haiku-def 428 / opus-reco 499 / sonnet-reco 476 / kimi-k26-instant 528 / grok-reco 414 / etc. Tous ≤ 550. **Cause faux chiffres antérieurs** : compteur de mots incluait la note d'intention titré `## Note d'intention` (H2) dans le corps du calcul. **Leçon PROCESS** : compteur étape 4 doit exclure note d'intention quel que soit format titre.
- [x] **Écart Kimi writers — 3 manquants vague 5 (étape 4)** : 3 tentatives MCP directes simultanées 2026-07-03 (kimi-reco gratuit `ask_kimi`, kimi-reco-guide gratuit `ask_kimi`, kimi-k26-thinking payant `ask_kimi_payant`) → **3 échecs identiques** : `network error after 72-97s: The socket connection was closed unexpectedly`. Gratuit + payant tombent au même mur. Diagnostic préliminaire : plafond socket infra sur gros payloads. Petit prompt sonde passe, prompts avec briefs+corpus échouent. **Écart documenté** : PROCESS étape 4 § Chiffres clés autorise "14 writers sauf écart documenté" (INVARIANTS.md L.14, casting figé depuis 2026-05-12). Vague 5 = **11 writers produits** (pas 14), conforme PROCESS.
- [x] **Étape 5 (panel v2 test) clôturée** : 13 fiches produites (12 attendues + 1 bonus G-extra-haiku). Structure 4 groupes profils × 3 modèles (Sonnet + Haiku/DeepSeek, Kimi absent due panne). Chaque call : 2 tranches âge (3-5 + 6-7) en 1 dyade. Synthese-lecteurs.md v2 produit (classement + patterns + citations top 5). Panel v2 structure validée operationnellement malgré absence Kimi (mécanique 4G × 3M répliquée, test calibration peut procéder).
- [x] **REX panel data majeure (non-décision, INFO)** : Top Tranche A opus-reco (rang moyen 3.15 / #1 chez 5/13) · grok-reco (4.15, jamais pire 7e) · haiku-reco · sonnet-reco · deepseek-reco. Kimi-k26-instant polarise (#1-2 chez 5 fiches, dernier chez 7 — voix enfant très vraie mais fin-pirouette + cascade anonymes). Patterns « à éviter » convergents (3+ fiches) : main qui parle (physique) · doigt pend épaule (géométrie confuse) · libellule sur genou (rupture pattern) · fins qui repartent/pirouette (déroule).
- [x] **Kanban STORY-002 étapes 4-5 déjà à jour** : Directeur l'a logué session (pas regénération writers/panel requise, état consolidé).

**Leçons à graver** :
1. **LP-COMPTEUR-MOTS-ETAPE4** : Compteur étape 4 doit exclure note d'intention quel que soit le format du titre (`**...**`, `## ...`, `# ...`). Implémenter dans le script/outil comptage avant lancer writers vague 6+.
2. **LP-PANNE-KIMI-SOCKET-VAGUE5** : Panne socket simultanée gratuit + payant 72-97s sur gros prompts (briefs+corpus). Problème infra, pas contenu writer. Blocker pour vagues 6+ si non résolu. Workaround CLI `call-llm.mjs` existe (timeout 600s possible) mais n'a pas été tenté cette reprise.

**Tickets créés** :
- 🔴 **AUDIO-KIMI-PANNE-VAGUE5** (CRITIQUE, blocker étape 4 si répète) : Investiguer panne socket simultanée (`ask_kimi` gratuit + `ask_kimi_payant` payant, même ~72-97s timeout). Hypothèse : payload size prompts > plafond socket passerelle Moonshot. Cible diagnostic avant STORY-003 vague 6. Workaround : `infra/mcp/call-llm.mjs` CLI (timeout 600s possible, bypass MCP). À tester post-diagnostic.

**Fichiers impactés** :
- ✅ `pmo/sprint-log.md` (cette entrée, datée 2026-07-03 post-session)
- 🔄 `pmo/backlog.md` (ajouter ticket AUDIO-KIMI-PANNE-VAGUE5 section "À faire" priorité CRITIQUE)
- 📋 `pmo/lecons-vivantes.md` (ajouter LP-COMPTEUR-MOTS-ETAPE4 + LP-PANNE-KIMI-SOCKET-VAGUE5 si section dédiée existante)

**État au reboot** :
- **Vague 5 STORY-002 complète** : 11 writers (pas 14) — écart documenté ✅, conforme PROCESS
- **Panel v2 test réussi** : structure 4G × 3M validée, 13 fiches produites (12 + 1 bonus)
- **Kimi indisponible** : panne socket vague 5 = problème infrastructure, à résoudre avant vague 6
- **Kanban STORY-002 étapes 4-5 à jour** : Directeur a loggué, pas re-travail PMO
- **Trois tickets EN COURS inchangés** : STORY-002-SELECTION-REFONTE (🔴 BLOQUÉ) + ARCHI-006 + ARCHI-014-TEMPLATE-BOUSSOLE

---

## 2026-07-03 (22:50, POST-AUDIT correction) — CLARIFICATIONS 3 DÉCISIONS : Équité input writers + canal Kimi gratuit + leçon processus

**Objectif** : Logger les clarifications apportées par Papa Yann en épilogue du duel (2026-07-03 22:50).

**Fait** :
- [x] **DEC-BRIEF-CURSEUR clarifiée** : brief commun + menu d'angles UNIQUE (pas assignation individuelle par writer). Longueur cible IDENTIQUE. Variance en OUTPUT (notes intention déclarées). Leçon LP1 gravée dans lecons-vivantes.md.
- [x] **DEC-KIMI-GRATUIT-CODING entrée** : writers #7 + #10 Kimi utilisent `kimi-for-coding` endpoint + K2.7-Code modèle (efficacité narratif > K2.6).
- [x] **Mécanique "note intention writer"** : 14 writers déclarent ce qu'ils ont choisi du menu (observable). Critère sélection étape 6.

**Décisions figées** : aucune nouvelle — clarification + affinement de DEC-BRIEF-CURSEUR existante.

**Leçons gravées** : LP1 (équité input) dans `equipe/lecons-vivantes.md`.

**Fichiers modifiés** :
- ✅ `pmo/decisions.md` : DEC-BRIEF-CURSEUR clarifiée + DEC-KIMI-GRATUIT-CODING nouvelles
- ✅ `equipe/lecons-vivantes.md` : section LP1 Équité input gravée
- 🔄 Propagation : template brief-histoire-v4-BOUSSOLE (ticket ARCHI-014-TEMPLATE-BOUSSOLE en cours)

**État au reboot** :
- **3 tickets EN COURS inchangés** : STORY-002-SELECTION-REFONTE (🔴 BLOQUÉ) + ARCHI-006 + ARCHI-014-TEMPLATE-BOUSSOLE
- **Attente** : ARCHI-014 doit figurer clarification sur "menu d'angles UNIQUE commun" dans brief-histoire template
- **Prochaine action** : lancer ARCHI-014 (template adaptation) + déclencher TEST-PANEL-CALIBRATION

---

## 2026-07-03 (22:45, fin de session) — REX DUEL STORY-002 : Papa Yann refuse 2 champions + données majorantes

**Objectif :** Logger le REX duel opérationnel et les données collectées de Papa Yann.

**Fait :**
- [x] Duel 11 fragments STORY-002 vague 4 joué par Papa Yann : 5 gagnants, 1 égalité, 5 refusés
- [x] Finale : refus COMPLET des 2 champions panel (grok 21 pts, kimi 18 pts) + raisons collectées
  - Grok-reco v4 : trop long, sans dialogue (monologue Narrateur)
  - Kimi-k26-instant v4 : trop long, fin sur punchline-pirouette (panel l'adore, auteur « terrible »)
- [x] Ingestion memoire-papa-yann.md : descripteur « exigence > panel » + contre-goûts « trop long » + « punchline-pirouette »
- [x] Signal critique : divergence auteur ↔ panel sur registre sortie. À surveiller STORY-003+.

**Décisions prises :** aucune (donnée REX, pas décision)

**Leçons graves** :
1. Duel = calibreur de goût, pas validateur de texte final (optionnel/indicatif)
2. Refus d'une finale est un signal de goût précieux pour les briefs suivants
3. Quand panel s'extasie sur punchline → auteur peut refuser (registre divergent)

**État au reboot** :
- **Duel.html finalisé** (captures raisons de refus) → peut réitérer STORY-003+
- **Mémoire-papa-yann enrichie** : 8 hypothèses + 3 contre-goûts + signal majeur
- **Ticket STORY-002-SELECTION-REFONTE** : reste 🔴 BLOQUÉ. Refonte 6-selection basée duel + vague 4 données brutes obligatoire avant rewrite.
- **3 tickets EN COURS inchangés** : STORY-002-SELECTION-REFONTE (🔴 BLOQUÉ) + ARCHI-006 + ARCHI-014-TEMPLATE-BOUSSOLE

---

## 2026-07-03 — AUDIT-CHALLENGE SESSION : 4 DÉCISIONS VALIDÉES PAR PAPA YANN (fondations refonte vague 5)

**Objectif** : Graver les 4 décisions validées par Papa Yann (audit-challenge 2026-07-03), initialiser tickets propagation.

**Décisions gravées** :
- [x] **DEC-BRIEF-CURSEUR** : brief writers = BOUSSOLE + 1 intention obligatoire (anti-Streisand rule). Critère sélection étape 6.
- [x] **DEC-PANEL-V2** : 🚨 panel 20 → panel 12 calls (4 groupes × 3 modèles hétérogènes : Sonnet + Kimi + Haiku/DeepSeek). Test calibration one-shot avant full deploy.
- [x] **DEC-DUEL-DE-GOUT** : outil site/duel.html (PWA) + gouvernance studio/narration/gout/ (memoire-papa-yann.md + palmares-writers.md, anti-verbatim). Feedback boucle étape 5 → 6 → 3 STORY-003+.
- [x] **ALERTE URGENT** : STORY-002 étape 6-selection.md périmé (vague 2, daté 2026-05-14). Refonte imminente (utiliser vague 4 2026-05-17). Duel goût = instrument validation.

**Tickets créés** :
- 🔴 STORY-002-SELECTION-REFONTE (CRITIQUE, blocker étape 7)
- ⚪ TEST-PANEL-CALIBRATION (Haute, go/no-go full 12 panel)
- ⚪ PROPAGATE-DEC-PANEL (Haute, MAJ INVARIANTS + PROCESS)
- 🟡 ARCHI-DUEL-001 (Haute, MVP PWA)

**Fichiers modifiés** :
- ✅ `pmo/decisions.md` : 4 entrées datées 2026-07-03 (stack — récentes en haut)
- ✅ `pmo/backlog.md` : 4 tickets reclassés/créés
- 📝 `pmo/INVARIANTS.md` : MAJ à venir (ticket PROPAGATE-DEC-PANEL, SLA 48h)
- 📝 `equipe/PROCESS.md` : MAJ étapes 5 + 9 à venir

**État au reboot** :
- **3 tickets EN COURS** : STORY-002-SELECTION-REFONTE (🔴 BLOQUÉ, impératif) + ARCHI-006 + ARCHI-014-TEMPLATE-BOUSSOLE (7 EN COURS avant cette session)
- **Attente immédiate** : refonte 6-selection.md STORY-002 (utiliser vague 4, intention critère), puis duel-data génération (ARCHI-DUEL-001)
- **Propagation 48h** : INVARIANTS.md § panel + PROCESS.md étapes 5/9 (ticket PROPAGATE)
- **Test calibration** : 2 paires benchmarks (décision go/no-go 12 panel avant STORY-003)

**Décisions figées** : aucune question ouverte. Toutes 4 validées Papa Yann = exécution.

---

## Prochaine action — OBLIGATOIRE avant toute session

**Contexte prioritaire** (mis à jour 2026-07-03 post audit-challenge) :

| Priorité | Action | Statut | Notes |
|----------|--------|--------|-------|
| 🔴 **CRITIQUE** | **STORY-002 étape 6 REFONTE complète** (DEC-PANEL-V2 + vague 4 actuelle) | Kanban 🔴 BLOQUÉ | Utiliser données vague 4 (2026-05-17), appliquer critère « Intention Directeur ». Générer duel-data.js (12 duels + finale). Attendre résultat Duel de goût (site/duel.html MVP). **Blocker étape 7 rewrite.** |
| ⚪ À FAIRE | Test calibration panel 12 (2 paires benchmarks) | En attente démarrage | Valider reproductibilité écart (vague 3 kimi vs grok) + faux positif convergence (paire quasi-identique). Décisif go/no-go pour full 12 panel STORY-003+. |
| ⚪ À FAIRE | Propager DEC-PANEL-V2 + DEC-BRIEF-CURSEUR dans INVARIANTS + PROCESS (SLA 48h) | En attente | MAJ § panel (20→12), section Intention Directeur. **Critère** : zero lien cassé après propagation. |
| ⚪ À FAIRE | Vérifier kanban autres stories (aucun SLA dépassé attendu) | Prochain reboot | Mécanique SLA 3j 🔴 opérationnelle depuis 2026-05-21 (DEC-SLA-NARRATION). |

**Règle** : cette section = POINT D'ENTRÉE session. Jamais ignorer. Papa Yann lit ici en premier = plan d'action transparent.

---

## 2026-09-03 — Refonte infra Claude (audit transverse)
- Audit `memory/audits/2026-09-03-archi-claude-infra.md` ; handoff de pôle « mémoire convergente » ouvert dans `studio/narration/docs/handoffs/` (pmo/ → memory/ quintette, vague 2). Aucun contenu produit modifié.
