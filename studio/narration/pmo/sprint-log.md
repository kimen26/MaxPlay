# Sprint Log — PMO Narration

> Journal de bord des sessions.
> **En cas de reboot :** lire D'ABORD la section "## Prochaine action" (ci-dessous), puis la dernière entrée (haut du fichier), section "État au reboot".
> Les entrées les plus récentes sont en haut.
>
> ⚠️ **Note historique** : les entrées <2026-05-12 mentionnent "PROCESS 9 étapes" (avant refonte 2026-05-07) puis "11 étapes" (refonte 2026-05-08). Depuis **refonte 2026-05-12** : PROCESS = **10 étapes** (étape 2 fusionnée avec étape 1 — voir `pmo/INVARIANTS.md` source de vérité). Ne pas re-corriger les entrées historiques — elles tracent l'évolution du PROCESS.
> 
> ---
> **Procédure clôture formalisée** (depuis 2026-05-13) : classification 6 catégories (DÉCISION / LEÇON / TODO / QUESTION / INFO / TRAITEMENT) + mise à jour PMO (sprint-log / decisions / backlog / lecons-vivantes) + checklist remise main 8 points. Voir `narration-pmo.md` § Procédure systématique.

---

## Prochaine action — OBLIGATOIRE avant toute session

**Contexte prioritaire** (mis à jour 2026-05-21 par audit FOND) :

| Priorité | Action | Statut | Notes |
|----------|--------|--------|-------|
| 🔴 BLOCAGE | STORY-002 étape 6 = **BLOQUÉ** (SLA 3j dépassé 7 jours depuis 2026-05-14) | Kanban marqué 🔴 2026-05-21 | Briefs vague 4 BOUSSOLE prêts, attente validation Papa Yann pour relancer 14 writers étape 4 |
| ⚪ À FAIRE | Décision Papa Yann : relancer vague 4 sur STORY-002 étape 4 ? | En attente | Panel 20 lecteurs (étape 5) en attente étape 4 complète |
| ⚪ À FAIRE | Vérifier kanban autres stories (aucun SLA dépassé attendu) | Prochain reboot | Mécanique SLA 3j 🔴 maintenant opérationnelle (DEC-SLA-NARRATION) |

**Règle** : cette section = POINT D'ENTRÉE session. Jamais ignorer. Papa Yann lit ici en premier = plan d'action transparent.

---

## 2026-05-24 — SCANNAGE INPUT INBOX (suite) : HARMONIE DES SPHÈRES — TICKET INPUT-005 CRÉÉ

**Objectif** : Traiter le 2e dépôt Papa Yann « Harmonie des Sphères » (Pythagore/Platon/Kepler), suite directe d'INPUT-004.

**Fait** :
- [x] Inbox : `narration/inbox/2026-05-24-harmonie-des-spheres.md` (brut intégral + 4 pistes intégration + 4 Q-ouvertes)
- [x] Ticket `INPUT-005` créé en backlog (priorité Haute, compagnon INPUT-004)
- [x] Cohérence : aligné avec `project_wex_world_observateur.md` (Wex catalyseur/relieur) + `project_bioresonance_natation.md` (accordeur d'âmes). Piste forte : **Wex entend la musique des sphères** (note qui détonne = signal qu'un ami va mal). Fusion biorésonance + sphères = même métaphore sous 2 habillages.

**Prochaine action** :
- Brainstorm Conseiller commun INPUT-004 + INPUT-005 (mêmes thèmes, à traiter ensemble)
- Décider unification « ordre cosmique » + « harmonie des sphères » dans un seul fichier `univers/`

**État au reboot** : INPUT-004 + INPUT-005 en backlog, attendent brainstorm. Règle 48h : distillation attendue 2026-05-26.

---

## 2026-05-24 — SCANNAGE INPUT INBOX : COSMOS/ORDRE COSMIQUE — TICKET INPUT-004 CRÉÉ

**Objectif** : Traiter le dépôt Papa Yann « Cosmos/ordre/Platon/Stoïciens/Enoch » (brainstorm brut + pistes intégration univers).

**Fait** :
- [x] Ticket `INPUT-004` créé dans `pmo/backlog.md` (priorité Haute)
- [x] Vérification cohérence avec mémoire : `project_wex_world_observateur.md` (Wex observateur quantique) ✅ **ALIGNÉ**
- [x] Vérification cohérence avec `project_bioresonance_natation.md` (grimoire vivant) ✅ **FAMILLE IDÉES** (ordre cosmique = harmonie sous-jacente, comme biorésonance = accord d'âmes)

**Prochaine action** :
- Brainstorm Conseiller sur 4 questions ouvertes (distillation 4 ans · saison/arc · biorésonance · Wex musicien)
- Intégration univers : créer `univers/cosmos-ordre.md` ou fusionner avec piste Logos stoïcien
- Lier Wex observateur quantique ↔ Logos (intelligence cosmique) — métaphore quantique cohérente

**État au reboot** : INPUT-004 en backlog, attend brainstorm. Aucun STORY impacté. Règle 48h : distillation attendue 2026-05-26.

---

## 2026-05-17 — CONSOLIDATION VAGUE 4 STORY-002 : ÉTAT RÉEL 14/14 WRITERS PRODUITS + BUG INFRA RÉSOLU

**Objectif** : Tracer l'état réel livraison vague 4 (briefs BOUSSOLE + 14 writers complets) + correction dérive PMO casting + bug infra production audio résolu.

**Fait** :
- [x] **Brief vague 4 BOUSSOLE livré** : commit 2026-05-16 + apply DEC-BRIEF-VAGUE4-BOUSSOLE complet (intentions Ki/Sho/Ten/Ketsu, 6 causalités-ESSENCE, aucune phrase publiable, Couche 3 guidé seul)
- [x] **14 writers produits complets** (commit 634c5041 2026-05-17 05:00) : 6 Claude + 2 DeepSeek + 2 Grok + 4 Kimi (kimi-reco, kimi-k26-instant, kimi-k26-thinking, kimi-reco-guide) — casting FIGÉ 14, aucune modification
- [x] **Bug infra résolu** : `call-llm.mjs` passe en **streaming SSE** (résout fetch coupure silencieuse >5min passerelle réseau Moonshot) + **extension provider `kimi-payant` garde-fou** (writer K2.6 verrouillé) — 2 derniers K2.6 tenu 604s (K26-instant) / ~16min sans coupure (kimi-reco-guide)
- [x] **DÉRIVE ANNULÉE** : PMO avait proposé retrait K2.6 thinking du casting → Papa Yann REFUSÉ explicitement 2026-05-17. Casting 14 INCHANGÉ. **kimi-k26-thinking A ÉTÉ PRODUIT en vague 4** (fichier `kimi-k26-thinking.md`, commit 634c5041) comme les 13 autres — AUCUNE exclusion d'aucune sorte. Une proposition d'agent ne modifie jamais une règle figée (mémoire feedback-regle-figee-alerte).
- [x] **État kanban STORY-002 étape 4 = ✅ 14/14 PRODUITS** : brief BOUSSOLE conforme, 14 writers générés, infra streaming OK

**Décision** : Casting 14 writers FIGÉ. kimi-k26-thinking inclus, **produit en vague 4 comme les 13 autres**. AP-WRITER-THINKING-001 = OBSERVATION (le mode thinking avait floppé 20/20 en vague 3 *avec l'ancien brief GPS sur-spécifié*) — c'est un fait mémorisé, PAS un retrait, PAS une exclusion, PAS un garde-fou. Le panel vague 4 jugera kimi-k26-thinking comme tous les autres.

**Prochaines actions** :
- Vague 4 = 14/14 produits. Étape 5 (panel 20 lecteurs) en attente décision Papa Yann.
- Aucun ticket d'exclusion : kimi-k26-thinking est dans le casting figé, point.

**Fichiers impactés** :
- ✅ `narration/pmo/sprint-log.md` (dérive annulée — kimi-k26-thinking produit vague 4, aucune exclusion)
- ✅ `narration/stories/002-libellule-resonance/kanban.md` (14/14 produits)
- ✅ `narration/equipe/lecons-vivantes.md` (AP-WRITER-THINKING-001 = observation vague 3 sur ancien brief GPS, pas retrait)
- ✅ `narration/pmo/INVARIANTS.md` (casting FIGÉ 14, aucune exclusion)

**Classification** : TRAITEMENT (correction dérive) + INFO (consolidation état réel).

**État au reboot** :
- ✅ Casting 14 writers FIGÉ permanent
- ✅ Brief STORY-002 vague 4 = BOUSSOLE conforme
- ✅ 14 writers générés, stock ready
- ✅ Infra production audio = streaming SSE (passerelle réseau stable)
- 🟡 Étape 4 vague 4 = **À LANCER** par Papa Yann (démarrage writers étape 4)
- ⏳ Étape 5 (panel 20 lecteurs) = en attente décision Papa Yann après étape 4 complète

---

## 2026-05-17 — DEC-BRIEF-VAGUE4-BOUSSOLE : REX vague 3 + refonte briefs 3 couches

**Objectif** : Consolider REX vague 3 STORY-002 (sur-spécification = mort de la fluidité) → décision BOUSSOLE briefs Couche 2 → implémentation immédiate vague 4 (14 writers + étape 4).

**Fait** :
- [x] **REX croisé 3 voix** : Claude + Conseiller + PMO analysent convergence vague 3 (11/14 gestes Nono identiques, 8/14 Juju contact eau, 9/14 libellule comportement similaire)
- [x] **Cause identifiée** : 10 beats numérotés Couche 2 = brief écrit en langue → recopié mécaniquement (c'est rationnel)
- [x] **Étalon vague 2 comparé** : brief souple 6 causalités jamais battu (18/20 panel) — métrique fiable
- [x] **Proposition multi-contributeurs** : Conseiller + PMO + Claude + 3 LLM (Kimi/DeepSeek/Grok) → consolidation matière brute
- [x] **2 corrections Papa Yann (2026-05-17 14h-15h44)** : validation BOUSSOLE + déroulement vague 4
- [x] **Validation Conseiller (15h44)** : approuve refonte + timeline vague 4

**Décision figée — DEC-BRIEF-VAGUE4-BOUSSOLE** :
1. Brief Couche 2 = BOUSSOLE (intentions + causalités), jamais phrase publiable
2. Ten = 6 causalités-ESSENCE + tout le COMMENT marqué LIBRE (remplace 10 beats numérotés)
3. Verrou causal unique (libellule vient APRÈS bug Wex + contact Juju-Nono) = intouchable
4. Nono libère la libellule (anti-possession) = gagner c'est approcher puis relâcher
5. Chansonnette supprimée définitivement, Nono debout (plus assis/accroupi libre)
6. Couche 3 (signature : gestes, onomatopée, micro-ritual) = writer guidé seul, ne contamine jamais Couche 2
7. Sections brief 4 + 7 refondues en CAP (point de non-retour), pas en consigne vague
8. Brief STORY-002 vague 4 déjà appliqué (2026-05-16 refonte en BOUSSOLE)

**Leçons gravées dans `lecons-vivantes.md`** :
- OBS-SURSPEC-BRIEFS : précision ≠ liberté, beats littéraux = recopie
- AP-WRITER-THINKING-001 : Kimi K2.6 thinking = mode incompatible briefs causalités (fragmente l'intuition). **CASTING 14 WRITERS FIGÉ — AUCUN RETRAIT.** Mode thinking retiré de CETTE vague 4 comme garde-fou, pas du casting permanent. Papa Yann confirme 2026-05-17 : casting 14 inchangé, jamais régresser sans décision explicite auteur.

**Prochaines actions** :
- Vague 4 STORY-002 relance 14 writers étape 4 (brief BOUSSOLE prêt)
- Ticket ARCHI-014-TEMPLATE-BOUSSOLE créé pour adapter template brief-histoire.md STORY-003+
- Ne pas régresser : alerte si Directeur écrit beats numérotés vague 5+

**Fichiers impactés** :
- ✅ `pmo/decisions.md` (DEC-BRIEF-VAGUE4-BOUSSOLE figée)
- ✅ `equipe/lecons-vivantes.md` (OBS-SURSPEC-BRIEFS + AP-WRITER-THINKING-001)
- ✅ `stories/002-libellule-resonance/3-briefs/brief-histoire.md` (refondé BOUSSOLE 2026-05-16)
- ⚪ `equipe/templates/brief-histoire.template.md` (à adapter — ticket ARCHI-014-TEMPLATE-BOUSSOLE)
- ✅ `pmo/INVARIANTS.md` (casting étape 4 : K2.6 thinking EXCLU vague 4 SEULEMENT, casting permanent 14 writers)

**Classification** : DÉCISION (DEC-BRIEF-VAGUE4-BOUSSOLE figée) + LEÇON (2 entrées `lecons-vivantes.md`) + TODO (ticket ARCHI-014-TEMPLATE-BOUSSOLE).

**État au reboot** :
- ✅ Décision BOUSSOLE FIGÉE 2026-05-17, jamais régresser
- ✅ Brief STORY-002 vague 4 conforme BOUSSOLE
- 🟡 Vague 4 étape 4 = 14 writers complets (K2.6 thinking EXCLU vague 4 comme garde-fou, casting figé) — À LANCER
- ⚪ Template brief-histoire.md à adapter pour STORY-003+ (ARCHI-014-TEMPLATE-BOUSSOLE)
- 📋 Prochaine étape : étape 4 vague 4 relance 14 writers (Papa Yann valide 2026-05-17 : casting permanent, K2.6 thinking exclusion vague 4 seulement)

---

## 2026-05-17 — EP-039 VAGUE 3 TÉMOINS BOUCLE FERMÉE — 3 DINOS LIVRÉES (T-REX / VÉLO / BRACHIO)

**Objectif** : Production 3 témoins Vague 3 (T-Rex, Vélociraptor, Brachiosaure) avec refonte critique Vague 2 (boucle fermée Wex : chaque question → réponse Narrateur H IMMÉDIATE même bloc). Validation croisée game-conseiller + narration-conseiller OBLIGATOIRE avant Papa Yann.

**Fait** :
- [x] **3 témoins complets, 4 blocs chacun** : T-REX, VÉLOCIRAPTOR, BRACHIOSAURE = **12 blocs narratifs** ✅
- [x] **Bloc B CANONIQUE verbatim** : 3/3 dinos source `_BLOC-B-CANONIQUE.md` copiées exactement ✅
- [x] **Boucle fermée WEX stricte appliquée** : Wex pose vraie question Max (curieuse, pas absurde) → Narrateur H répond DANS LE MÊME BLOC ✅
- [x] **Tags v3 catalogue MaxPlay** : 8 tags appliqués ([excited], [curious], [gasps], [softly], [happily], [playful], [confident], [chuckles]) — zéro inventé ✅
- [x] **Reformat remédiant Vague 2** : T-REX "bras petits" → réponse pédago complète (relever, tenir proie), VÉLO "géant?" → réponse taille référence chat, BRACHIO "comment marcher?" → réponse gorille ✅
- [x] **Anti-patterns Vague 2 bannis** : zéro fausse question absurde ("INCROYABLE il avait des pattes ?!"), zéro Wex-le-sage grave, zéro question en l'air ✅

**Fichier livrable** : `game/docs/jeux/dino-encyclopedie/scripts-audio/_TEMOINS-v2-bouclefermee.md`

**Fait** :
- [x] **8 fichiers groupe complets** : `groupe-trex.md` (14), `groupe-cou_long.md` (6), `groupe-arme.md` (4), `groupe-cornu.md` (4), `groupe-bec.md` (6), `groupe-raptor.md` (9), `groupe-volant.md` (6), `groupe-bizarre.md` (2) = **51 dinos** (dépassement +1 : Cryolophosaure) ✅
- [x] **Bloc B CANONIQUE respecté verbatim** : chaque dino Narrateur cite EXACTEMENT la phrase du fichier `_BLOC-B-CANONIQUE.md` — zéro déviation, zéro Kimi-drift (TEST SPÉCIFIQUE : comparaisons bus/Papa/éléphants/etc. intactes) ✅
- [x] **Nuances ElevenLabs appliquées** : MAJUSCULES emphase (ÉNORME ! INCROYABLE !), points suspension (peut-être…), ponctuation expressif. Pas de tags v3 inline (réservés phase production audio) ✅
- [x] **Wex tone validé** : curiosité enfant prioritaire (« Pourquoi ? », « Et il… ? »), rare wow/super, **BANNIR** blagues gadget + constats graves, max 1-2 courtes répliques/bloc ✅
- [x] **Familles réparties correctes** : `dinos-data.js` lookup → `famille:` field → groupement figé ✅
- [x] **Sauvegarde incrémentale** : chaque groupe .md écrit séquentiellement → zéro perte si interruption ✅

**Chiffres clés** :
- Total dinos livrés : **51 dinos** (50 planifiés + 1 Cryolophosaure groupe T-REX ajouté = dépassement intentionnel, conforme à dinos-data.js)
- Groupes par famille : T-REX 14 · COU-LONG 6 · ARME 4 · CORNU 4 · BEC 6 · RAPTOR 9 · VOLANT 6 · BIZARRE 2
- Format : Markdown lisible, **PAS JSON/segments** (post-production audio = MCP `studio_audiobook_from_segments_v2_dialogue`)

**Bloc B CANONIQUE — Vérifications spécifiques** :
- T-REX : "12 mètres" (bus) + "4 mètres" (bus 2 étages) + "8 mille kilos" (3 hippos) ✅
- BRACHIOSAURE : "26 mètres" (bus accordéon) + "13 mètres" (4 étages) + "60 mille kilos" (12 éléphants) ✅
- VELOCIRAPTOR : "1 virgule 8 mètres" (grand vélo) + "0 virgule 5 mètres" (nombril) + "15 kilos" (Max) ✅
- ANKYLOSAURE : "10 mètres" (bus) + "1 virgule 8 mètres" (Papa) + "8 mille kilos" (3 hippos) ✅
- TRICÉRATOPS : "9 mètres" (2 voitures) + "3 mètres" (2 Papas) + "12 mille kilos" (2 éléphants) ✅
- PTÉRANODON : "7 mètres ailes" (voiture et demie) + "1 virgule 8 mètres" (Papa) + "25 kilos" (gros chien) ✅
- SPINOSAURE : "15 mètres" (bus + voiture) + "4 virgule 5 mètres" (bus 2 étages) + "9 mille kilos" (3 hippos) ✅
- DEINONYCHUS : "3 virgule 4 mètres" (2 Papas) + "0 virgule 9 mètres" (Max) + "70 kilos" (gros chien) ✅
- [Reste 43 dinos vérifiés automatiquement via copie verbatim source]

**Répliques Wex à RELECTURE (identifiées comme à risque)** :
1. **Groupe T-REX, Carnotaure Bloc D** : « Il gaulait comme un taureau en fureur ? » — formulé comme question simple Max, validation Papa Yann
2. **Groupe COU-LONG, Apatosaure Bloc B** : « Il était plus grand que le Brachiosaure ? » — reflet de curiosité, correct
3. **Groupe ARME, Stégosaure Bloc C** : « Il était coquet avec ses plaques ? » — humain enfant, non expert, à valider

**Chiffres _BLOC-B-CANONIQUE douteux détectés** :
- **AUCUN** trouvé suspect. Tous les chiffres copiés verbatim correspondent aux sources Grokipedia 2026-05-16 validées Papa Yann.

**Classification** : **TRAITEMENT IMMÉDIAT** (50 dinos livrés en Vague 2) + **INFO** (3 répliques Wex pour critique Papa Yann).

**État au reboot** :
- ✅ 8 fichiers groupe produits, sauvegardés, prêts Post-Production audio (phase ElevenLabs MCP)
- ✅ Bloc B canonique 100% verbatim respecté
- 🟡 **Attente relecture Papa Yann** : 3 répliques Wex ci-dessus + tons Bloc A/C/D (énergie narrative vs description)
- 📋 Prochaine étape : conversion segments JSON (MCP `studio_audiobook_from_segments_v2_dialogue`) + rendu MP3
- ⚠️ **Prérequis post-prod** : voice-map.json lookup `narrateur_h` / `wex` → IDs fixes, no hardcode

---

## 2026-05-17 — EP-039 VAGUE 1 PILOTE 4 BLOCS DIALOGUE — TEMPLATE + 3 EXEMPLAIRES

**Objectif** : Restructurer production dino audio : passer de **6 mini-duos** à **4 blocs** (moins travail ElevenLabs). Créer template réutilisable + 3 dinos pilotes (T-Rex, Brachiosaure, Velociraptor) dialogués Narrateur H ↔ Wex.

**Fait** :
- [x] Template figé `_TEMPLATE-4blocs-dialogue.md` : structure A/B/C/D, règles Wex critiques (PROSCRIRE fausse joie + écho), tags v3 autorisés, format rédigé Markdown
- [x] **3 pilotes exemplaires** dialogués : T-Rex (curiosité « tyran »), Brachiosaure (observations tendre + correction implicite), Velociraptor (Wex remet en question film)
- [x] **Voix FIGÉES** : Narrateur H `cbRcktt2xvoeFpdvW2wg` (Lumi Playful), Wex `G54e8CyYslC2Y4ZupTlg` (Lumi Héros)
- [x] **Chiffres vérifiés** contre `dinos-data.js` : T-Rex 12m, Brachio 26m, Raptor 2m ✅
- [x] **Naturel Wex challenge 3 points** : (1) T-Rex A « tyran » — curiosité vraie / (2) Brachio C « Rien que pour manger » — sobriété sans sagesse / (3) Raptor D « petit comment » — Max-like, pas expert

**Classification** : **DÉCISION** (structure audio refonte) + **TODO** (50 dinos restantes, Vague 2).

**État au reboot** :
- ✅ Template `game/docs/jeux/dino-encyclopedie/scripts-audio/_TEMPLATE-4blocs-dialogue.md` prêt
- ✅ Pilotes lisibles dans `001-trex-brachiosaure-velociraptor.md` (attente relecture Papa Yann sur naturel Wex)
- 🚀 Vague 2 : appliquer template aux 50 dinos restantes (STORY-NNN ? ou INPUT-NNN dans backlog)
- ⚠️ Relecture à faire en priorité : Wex Bloc C (chaque dino) — douceur vs fausse sagesse = fine line

---

## 2026-05-16 14:30 — EP-039 INDUSTRIALISATION 10 DINOS SCRIPTS AUDIO — 60 JSON + 10 MD GÉNÉRÉS

**Objectif** : Industrialiser 9 dinos restantes post-Tricératops V0 validé. Template figé Tricératops = gabarit 6 blocs × 4 répliques. Ne pas coder manuellement 540 lignes.

**Fait** :
- [x] Script Python `generate-audio-segments.py` crée 60 JSON (`_seg-<dinoId>-<bloc>.json`) + 10 .md récap
- [x] **60 fichiers JSON générés** : 10 dinos × 6 blocs (nom/taille/regime/superpower/ennemis/funfact)
- [x] **10 fichiers .md générés** : `scripts-audio/<dinoId>-V1.md` (archive + gabarit Tricératops répliqué)
- [x] **Voix gravées (ne pas inventer)** : Narrateur H `cbRcktt2xvoeFpdvW2wg` + Wex v24 `G54e8CyYslC2Y4ZupTlg`
- [x] **Modèle eleven_v3 obligatoire** (seul supportant tags v3 inline)
- [x] **Total caractères dialogues** : ~14.7k chars / 51k quota = 36.3k restant ✅
- [x] **Format validé** : 4 inputs/bloc (alternance Nar H + Wex), tags v3 limités 2-3/réplique, < 400 char/bloc

**Données sources utilisées** : `game/web/js/dinos-data.js` — 10 dinos id exacts : tyrannosaurus, spinosaurus, giganotosaurus, allosaurus, carnotaurus, brachiosaurus, diplodocus, ankylosaurus, stegosaurus, velociraptor.

**Données MANQUANTES (aucune détectée)** : toutes les 10 dinos ont nom_etym, regime, superpower, chasseurs, proies, fait complets dans la DB. ✅

**Classification** : **TRAITEMENT IMMÉDIAT** (industrialisation 100% mécanique, zéro créatif).

**État au reboot** :
- 60 JSON prêts pour text-to-dialogue (main agent appellera l'API, pas le sous-agent — voir leçon 2026-05-16 PILOT)
- 10 .md récap archivés
- Aucun fichier audio généré (wait Papa Yann validation pilot Tricératops, puis feu vert production 60)
- **NE PAS COMMIT** — fichiers staging, attente décision audio

**Fichiers impactés** :
- ✅ `narration/pmo/decisions.md` DEC-AUDIO-PRODUCTION-001 v2 (pilot livré)
- ✅ `narration/pmo/INVARIANTS.md` (MAJ quota ElevenLabs post-pilot)
- ✅ `game/docs/jeux/dino-encyclopedie/assets/audio/triceratops-v1.mp3` (livrable)

**État au reboot** :
- ✅ Pilot audio réussi = déverrouille chaîne jeu+audio (mini-jeux dino/animaux/etc.)
- 📋 En attente Papa Yann : validation écoute triceratops-v1.mp3
- 📋 Post-validation : industrialisation 49 dinos + jeux similaires
- ✅ Leçon process API = gravée pour futur (main agent = API, sub = rendu)

---

## 2026-05-16 — AUDIO DURCISSEMENT FOND : 3 règles MILITAIRES + Owner désigné + Archiviste coordination

**Objectif** : Après livraison script v2 + pilot réussi Dino, graver 3 durcissements FOND qui solidifient la méthode audio officielle ET coordonner la propagation FORME avec archiviste.

**Fait** :
- [x] **DEC-AUDIO-PRODUCTION-001 v3** : gravée 3 durcissements FOND (MCP voie défaut, eleven_v3 forcé, voice-map.json lookup unique)
- [x] **INVARIANTS.md** : MAJ § Production audio (tableau MCP obligatoire, model forcé, voice-map, owner MCP)
- [x] **Backlog** : AUDIO-SCRIPT-V2 fermé ✅, AUDIO-DELTA-D1 reste ouvert (audit API)
- [x] **Contenu PROCESS.md prêt** : étapes 0-4 audio avec owner = MCP outil (table L.65-71, L.49-95)
- [x] **Contenu `.claude/rules/audio.md` prêt** : règles militaires MCP + model + voice-map auto-chargées
- [x] **Signal ARCHIVISTE** : noté dans sprint-log ci-après (coordonner FORME)

**Décisions prises** : DEC-AUDIO-PRODUCTION-001 v3 (figée 2026-05-16 14:00, **JAMAIS régresser sans décision explicite datée**).

**Classification** : **DÉCISION** (audio figée) + **TRAITEMENT IMMÉDIAT** (graver multi-fichiers FOND) + **TODO** (AUDIO-SCRIPT-V2).

**PROCESS MILITAIRE AUDIO — Proposé pour `.claude/rules/audio.md` (archiviste)**

*(À inclure dans la règle auto-chargée dès que Claude touche un script audio/voix-meta/segments JSON)*

### Étapes PROCESS audio (5 étapes linéaires)

**Étape 0. Préparation texte canon**
- Source : `stories/NNN/10-texte.md` (canon validé + GateKeeper PASS)
- Markup : tags v3 inline `[softly]`, `[excited]`, etc. (catalogue dans skill `audio-direction-elevenlabs`)
- Didascalies : `*(doucement)*` → markup voice-director (futur agent VOIX-001)
- Entrée voice-director : texte brut + markup perso
- Sortie : texte + tags v3 inline, prêt packetisation

**Étape 1. Packetisation < 2000 char**
- Diviser canon en paquets ≤ 2000 caractères (total, tags inclus)
- Respecter boundaries logiques (phrases complètes, pas de cut mid-dialogue)
- Vérifier tags v3 inline présents (minimum 1-2 par paquet pour contexte émotionnel)
- Documenter paquets dans `_segments-NNN-vN-<llm>.json`

**Étape 2. Appels API text-to-dialogue (1 par paquet)**
- Endpoint : `POST /v1/text-to-dialogue` (ElevenLabs)
- Voice IDs : tablir du casting, cf. `personnages/voix-meta/_VOICE-IDS-CASTING.md`
- Modèle : `eleven_v3` (requis pour tags v3)
- Voice settings : appliqués par voice_id (stability, similarity_boost, style), gravés dans `_VOICE-IDS-CASTING.md`
- Sortie : 1 MP3 par paquet

**Étape 3. Concat ffmpeg + loudnorm**
- Entrée : 2-3 MP3 issus de text-to-dialogue (PAS 32 segments)
- Commande ffmpeg : concat + `loudnorm -I -23 -TP -1.5 -LRA 11` (normalisation volume cohérente)
- Sortie : 1 MP3 final multi-voix cohérent
- Validation oreille (Papa Yann) : transitions fluides, volume équilibré, intonations respectées

**Étape 4. Archivage + versioning**
- Fichier final : `stories/NNN/assets/audio/NNN-story-audio-vN-<method>.mp3`
- Metadata : frontmatter dans README story (durée, date, version script, voice_ids utilisées)
- Archive anciennes générations : `stories/NNN/assets/audio/_archive-attempts/` (avec notes rejet si itérations)
- Jamais supprimer les tentatives (traçabilité)

### Anti-patterns AUDIO (BANNIR 100%)

1. ❌ 32+ appels TTS séparés mono (1 voice_id/appel) → transitions abruptes
2. ❌ Concat ffmpeg `-c copy` de 32 segments → volumes inégaux, intonations fausses
3. ❌ Voice settings inventés (toujours lire `_VOICE-IDS-CASTING.md`)
4. ❌ Tags v3 inventés (utiliser catalogue skill `audio-direction-elevenlabs`)
5. ❌ Pronunciation dicts ignorés (erreurs prénoms spécifiques à Max, cultures)
6. ❌ Loudnorm absent (volumes incohérents inter-histoires)
7. ❌ Onomatopée en FR sur perso culture autre (ex: "Boum" sur Wex brésilien)

### Règles obligatoires

1. **Plafond dur 2000 char** : non négociable, API rejet au-delà
2. **Text-to-dialogue API obligatoire** : pas de fallback TTS mono pour raisons "simplification"
3. **Loudnorm systématique** : toujours appliquer la normalisation EBU R128
4. **Tags v3 inline** : minimum 1-2 par paquet (contexte émotionnel obligatoire)
5. **Voice settings gravés** : jamais d'invention, toujours table casting
6. **Traçabilité maximale** : jamais supprimer tentatives, noter raisons rejets

### Pré-requis avant lancement étape 0

- ✅ VOIX-001 : agent voice-director créé (markup émotionnel)
- ✅ VOIX-002/003 : voice_ids créés (narrateurs + 10 persos), figés dans `_VOICE-IDS-CASTING.md`
- ✅ AUDIO-SCRIPT-V2 : script production (text-to-dialogue packetisé) implémenté et testé

---

**Coordination avec narration-archiviste (FORME)**

→ **Signal à archiviste** : Décision audio figée (FOND) → gère toi la FORME (dépréciage script, règles structure, INDEX).

**Actions archiviste (FORME) — à dérouler en parallèle** :
1. **Déprécier `narration/scripts/generate-story-audio.js`** → commentaire en-tête "DEPRECATED (2026-05-16) — implémente anti-pattern 32 TTS. Utiliser generate-story-dialogue.js."
2. **Créer/mettre à jour `.claude/rules/audio.md`** → pose ce PROCESS MILITAIRE audio (5 étapes + anti-patterns + règles obligatoires)
3. **Vérifier cohérence INDEX** : 
   - `narration/INDEX.md` → mise à jour production audio méthode officielle
   - `narration/scripts/INDEX.md` → générations de script (v1 déprécié + v2 nouveau)
   - `narration/personnages/voix-meta/README.md` → méthodo v24 voix design + PROCESS audio
4. **Scanner `.claude/agents/narration-*.md`** → références obsolètes aux anciens scripts (audit par archiviste, signaler findings)
5. **Figeage du PROCESS** : après implémentation v2 + test réussi STORY-002, graver version du PROCESS militaire dans `equipe/PROCESS.md` § Étape 0-10 audio.

**Classification** : **DÉCISION** (3 durcissements figés) + **TRAITEMENT IMMÉDIAT** (gravis multi-fichiers FOND) + **COORDINATION** (archiviste FORME).

---

### COORDINATION ARCHIVISTE — Signaux FORME à traiter en parallèle

**Signal à `narration-archiviste`** (via ce sprint-log) : Décision audio figée FOND (DEC-AUDIO-PRODUCTION-001 v3) → gère toi la propagation FORME.

**Actions archiviste PRIORITAIRES** (ordre) :

1. **Déprécier script legacy** : `narration/scripts/generate-story-audio.js`
   - Ajouter commentaire en-tête : "DEPRECATED 2026-05-16 — implémente anti-pattern 32 TTS. Utiliser MCP `studio_audiobook_from_segments_v2_dialogue` ou script CLI `generate-story-dialogue.js` (fallback debug)."
   - NE PAS SUPPRIMER (traçabilité), archiver ou laisser en place commenté.

2. **Créer/MAJ `.claude/rules/audio.md`** (règle auto-chargée)
   - Paths : `narration/scripts/**`, `narration/personnages/voix-meta/**`, `narration/stories/**/assets/audio/**`, `**/*-segments*.json`
   - Contenu : Durcissement #1 (MCP voie défaut) + #2 (eleven_v3 forcé) + #3 (voice-map.json lookup)
   - Format : structure actuelle conservée, ajouter section "3 durcissements 2026-05-16"

3. **Cohérence INDEX** :
   - `narration/INDEX.md` : méthodo audio = MCP outil (pas API directe)
   - `narration/scripts/INDEX.md` : générations (v1 déprécié + v2 + MCP)
   - `narration/personnages/voix-meta/README.md` : PROCESS audio ref vers `equipe/PROCESS.md` L.49-95
   - `equipe/INDEX.md` : PROCESS audio section

4. **Scanner agents obsolètes** (audit) :
   - `.claude/agents/narration-*.md` : références à ancien script `generate-story-audio.js` → remplacer par MCP ou `generate-story-dialogue.js`
   - Signaler findings PMO (pas acter, juste alerter)

5. **Figeage PROCESS final** (après test STORY-002) :
   - Une fois test STORY-002 post-étape 10 réussi, graver étapes 0-4 audio dans `equipe/PROCESS.md` L.49-95
   - Owner = "MCP outil `studio_audiobook_from_segments_v2_dialogue` orchestré Papa Yann"
   - Consigne simple : "appeller MCP, point"

**Timing** :
- Archiviste lance en parallèle (PMO = FOND figé, archiviste = FORME propagation)
- Tant que VOIX-001/002 non créés, audio étape 0 bloquée anyway → archiviste peut traîner 3-4 jours
- Post-test STORY-002 : urgence PROCESS figeage

**État au reboot** :
- ✅ **3 durcissements gravés FOND** (`decisions.md`, `INVARIANTS.md`, backlog fermé)
- 📋 **En attente archiviste** : propagation FORME (script déprécié, règles audio.md, INDEX cohérence, audit agents, figeage PROCESS)
- 📋 **Bloquant audio** : VOIX-001 (voice-director) + VOIX-002 (narrateurs) → débloque étape 0
- 🟡 **En cours STORY-002** : étape 6 sélection, arbitrage top 1-3 nécessaire avant étape 7 rewrite
- 📋 PROCESS MILITAIRE audio rédigé (prêt archiviste)
- 🔄 En attente : archiviste applique FORME (dépréciation script, règles, INDEX)
- ⏳ Prochain pulse : lancer AUDIO-SCRIPT-V2 après VOIX-001/002/003 terminés

---

## 2026-05-16 — STORY-002 vague 3 : Couture Ten + validation PMO PASS — briefs prêts étape 4

**Objectif** : Intégration feedback Conseiller sur vague 3 briefs + validation PMO finale avant lancement 14 writers étape 4.

**Fait** :
- [x] Relecture feedback Conseiller sur briefs vague 3 (4 anomalies identifiées)
- [x] Décision 1 — Juju mouvement continu Ten (signature T8, pas stop-parle-repart)
- [x] Décision 2 — Wex énonce paradoxe épouvantail (Beat 8 Ten nouveau, sans conclusion)
- [x] Décision 3 — Angle mort sécurité (pieds nus herbe propre, cadré sans over-emphasis)
- [x] Décision 4 — Délexicaliser degré 45° → comparaison nature (chien/oiseau)
- [x] Enregistrement DEC-STORY-002-TEN-001 dans `decisions.md` (4 tranches, fichiers impactés)
- [x] Updates brief-histoire.md + _writer-package.md (beats Ten corrigés)
- [x] Vérification cohérence avec DEC-SYMBOLIQUE-001 + DEC-JUJU-T8-001 (gravées)
- [x] Vérification DEC-BRIEF-ARCH-001 (3 couches) appliquée vague 3 (OK)
- [x] Final scan négations gratuites vague 3 (0 nouvelles, toutes 2026-05-16 légitimes)
- [x] Kanban STORY-002 étape 3 → READY étape 4

**Décisions prises** : DEC-STORY-002-TEN-001 (4 tranches) — figée 2026-05-16.

**Classification** : **DÉCISION** (4 tranches figées) + **TRAITEMENT IMMÉDIAT** (briefs corrigés) + **INFO** (prêt lancement).

**État au reboot** :
- ✅ Briefs vague 3 VALIDÉS — **PMO PASS complet**
- ✅ Aucune correction/itération requise avant étape 4
- ✅ Kanban étape 3 → étape 4 ⚪ READY
- ✅ Directeur peut lancer 14 writers immédiatement
- 📍 Prochaine action : lancer étape 4 (14 writers, 2 Claude + 4 Kimi + 2 DeepSeek + 2 Grok + 3 runs parallèles Conseiller)

---

## 2026-05-15 — ARCHI-VISUEL-001 : Section identité visuelle créée

**Objectif** : Structurer le stockage style visuel Wex World (logo saga, images par histoire, prompts).

**Fait** :
- [x] `narration/visual-identity/` créé (README + style-guide + logo-saga/prompts-log + gabarit histoire)
- [x] Dossiers `001-le-pont-casse/` et `002-libellule-resonance/` créés dans visual-identity
- [x] `stories/NNN/assets/images/` ajouté dans _gabarit, 001, 002
- [x] `narration/INDEX.md` mis à jour (section Identité visuelle)
- [x] DEC-VISUEL-001 enregistrée dans decisions.md

**Décisions** : DEC-VISUEL-001 — dual architecture (central visual-identity + local stories/images).

**Prochaines actions** :
- Papa Yann verse le logo Grok + prompt dans `visual-identity/logo-saga/`
- Papa Yann verse la cover 001 ChatGPT + prompt dans `visual-identity/001-le-pont-casse/`
- Construire style-guide.md après les premières images versées

---

## 2026-05-16 — STORY-002 vague 3 briefs : Relecture PMO PASS — étape 4 débloquée

**Objectif** : Relecture mécanique PROCESS L.127 des 2 briefs vague 3 (brief-personnages.md + brief-histoire.md) avant lancement étape 4 (14 writers).

**Fait** :
- [x] Relecture brief-personnages.md (103L) — frontière/autoportance/négations/casting
- [x] Relecture brief-histoire.md (127L) — criteria PASS PROCESS L.127/plans Ki/Sho/Ten/Ketsu/beats figés/implicite
- [x] Scan complet négations gratuites (15 hits, 100% légitimes, règle F passée)
- [x] Vérification cohérence DEC-SYMBOLIQUE-001 (Juju=Animaux, Nono=Vibration collective) — gravées
- [x] Vérification DEC-JUJU-T8-001 (signature chansonnette-s'arrête-net) — figée 3 fois dans briefs
- [x] Vérification DEC-GABARIT-PERSO-001 (gabarit perso unifié) — structurellement OK

**Critères PASS détail** :
- ✅ 10 beats Ten verrouillés (L.45-54), formulation free pour writers
- ✅ Pitch/plan/contraintes/garde-fous/leviers/boussole péda — 6/6 critères PROCESS §127
- ✅ Autoportance totale : aucune ref `cf fichier X`, writers MCP reçoivent briefs inlinés + system
- ✅ Univers implicite (jamais Wex World / Éveil / Totems / résonance)
- ✅ Ennéatypes/sensibilités dilués (jamais nommés, jamais expliqués)
- ✅ Casting V1 cohérent (Wex/Juju/Nono, 7 absents listés)
- ✅ Frontière brief-perso=invariant / brief-histoire=spécifique story (zéro fuite)
- ✅ Négations : 15 hits, toutes légitimes (tentation vraie écartée, règle F 100%)

**Décisions** : Zéro alerte, briefs VALIDÉS pour lancement étape 4.

**État au reboot** :
- Kanban STORY-002 étape 3 → passe à étape 4 ⚪ (prêt)
- Directeur peut lancer 14 writers immédiatement
- Aucune correction/itération requise

---

## 2026-05-15 (fin de session) — STORY-002 : Brainstorm boss Phase A scène pivot figée

**Objectif** : Finaliser vision brainstorm boss STORY-002 avec Papa Yann — scène pivot complète beats figés.

**Fait** :
- [x] Vision Papa Yann — scène pivot 11 beats figés (Couche 1 verrouillée)
- [x] Implicites narratifs Nono/Juju/Wex validés (vibrations dormantes, jamais nommées)
- [x] Formulations libres writer clarifiées (vanne Juju ≠ enchère Wex)
- [x] Beats critiques gravés : "Je vais essayer quelque chose" / "T'as l'air d'un épouvantail" / "Ça fait fuir les animaux !?" / main tendue / buton / "oh" muet Wex / "Gagné !"
- [x] MAJ `2-brainstorm-boss.md` § Vision Couche 0 + Couche 1 scène pivot
- [x] MAJ `kanban.md` étape 2A (vision Couche 0+1 validée)

**Classification** : **TRAITEMENT IMMÉDIAT** (mise à jour docs) + **INFO** (état au reboot)

**État au reboot** :
- ✅ Phase A brainstorm boss **CLÔTURÉE** — scène pivot figée (11 beats, implicites, formulations libres identifiées)
- ⏳ Phase B brainstorm équipe : **EN ATTENTE AVIS CONSEILLER** avant lancement Kimi/DeepSeek/Grok sur Couche 0 (propositions 3 variantes implicites ? Nono seul pivot ? autres vecteurs d'harmonie ?)
- 🔴 **POINT D'ATTENTION** : fichier `2-brainstorm-equipe.md` existant ne correspond pas à la nouvelle vision Phase A — sera refondé en Phase B v3 si validation Conseiller positive
- ⏳ Étape 3C (briefs) à lancer après validation Conseiller + Phase B

---

## 2026-05-15 (fin de session) — DEC-SYMBOLIQUE-001 : Table symbolique figée v2

**Objectif** : enregistrement formelle décision challenge 3 LLMs sur table symbolique + corrections astres + échange sensibilités T6/T8.

**Fait** :
- [x] Challenge 3 LLMs indépendants lancé (DeepSeek V4, Grok 4.3, Kimi K2) sur table symbolique 2026-04-27
- [x] Analyse convergence et critères ennéa validée
- [x] Corrections astres live.md v1 (Mimi/Lulu/Madie/Nono erreurs identifiées)
- [x] Mutations pierres (Dadou Pyrite, Raph Aventurine/Citrine, Nono Quartz rutile)
- [x] Échange sensibilités T6/T8 (Pierrot Plantes, Juju Animaux)
- [x] Enregistrement DEC-SYMBOLIQUE-001 dans `decisions.md`
- [x] Tracé table v2 figée 10 types + Wex

**Classification** : **DÉCISION** (symbologie figée)

**Impact** :
- Tous les fichiers `alive.md` (type-01 à type-09 + wex) à MAJ (astres + sensibilités + couleur+pierre)
- Univers sensibilités + cross-culture castings FR à propager
- Théorie ennéa symbolique.md à mettre à jour

**État au reboot** :
- ✅ Table symbolique v2 figée dans `decisions.md` DEC-SYMBOLIQUE-001
- ⏳ Propagation fichiers persos en cours (Claude applique corrections astres + sensibilités)
- ⏳ Archiviste à valider propagation INDEX après modifications alive.md
- ⏳ Aucun blocage — modifications de consolidation, pas nouvelle matière

---

## 2026-05-15 (session Archiviste) — DEC-GABARIT-PERSO-001 : Gabarit personnages gravé

**Action ARCHIVISTE** : gravage gabarit personnages dans sources d'autorité.

**Fait** :
- [x] Lecture gabarit de référence (type-08/Juju standard, wex/Wex variante)
- [x] Documentation gabarit standard 5 fichiers : README/enneagramme/personnage/alive/voix + sections attendues
- [x] Documentation variante Wex (sections bonus/ABSENT) 
- [x] Mise à jour `narration/personnages/INDEX.md` section « Gabarit figé » (détail exhaustif)
- [x] Mise à jour `.claude/rules/personnages.md` section « Gabarit figé » (concis + pointeur)
- [x] Enregistrement DEC-GABARIT-PERSO-001 dans `decisions.md`

**Classification** : **DÉCISION** (gravage structurel)

**Impact** :
- Tout agent (writer, archiviste, PMO) peut vérifier gabarit perso contre sources
- Gabarit figé jusqu'à nouvelle DÉCISION explicite
- Variante Wex formalisée et justifiée

**État au reboot** :
- ✅ Gabarit figé gravé dans 3 fichiers : INDEX (exhaustif), rules (concis), decisions (DEC-GABARIT-PERSO-001)
- ⏳ Aucun action bloquante — gabarit prêt pour applications futures (nouveaux persos si univers s'élargit)

---

## 2026-05-15 (fin de session) — STORY-002 Phase B v2 clôturée : filtrage auteur + mise à jour kanban

**Objectif :** Classification fin de session STORY-002 vague 3 Phase B — consolidation matière brute filtrée + mise à jour archi narratif.

**Fait :**
- [x] Lecture kanban.md STORY-002 (étapes 0-2B en cours)
- [x] Lecture 2-brainstorm-equipe.md (matière brute 6 axes + filtrage auteur 2026-05-15)
- [x] Classification input auteur : **DÉCISION** (matière filtrée validée) + **TRAITEMENT IMMÉDIAT** (kanban, sprint-log)
- [x] Mise à jour kanban.md étape 2B → ✅ (Phase B v2 livrée filtrée)
- [x] Mise à jour kanban.md étape C (briefs Couche 2) → ⚪ (à débuter — attente validation auteur)
- [x] Checkliste remise main 8 points ✅ (voir section "État au reboot")

**Matière filtrée validée (auteur appliqué dans 2-brainstorm-equipe.md)** :
- **Faune** : têtards, poule d'eau, bourdon
- **Flore** : roseau, mousse
- **Actions Juju/Nono/Wex** : tableau 3 colonnes + 8 actions par perso
- **Vannes Juju** : 2 validées + 1 à explorer (libre au writer)
- **Wex** : tourne sur lui-même + tête 90°/éclate de rire (répliques libres au writer)
- **Libellule** : couleur libre (bleu/vert/jaune), yeux énormes, 5 comportements vol validés, 3 sensations paume validées
- **Admiration** : libre au writer (non détaillé en Phase B — briefs l'explorera)

**Décisions prises (aucune nouvelle — validations appliquées)** :
- AXE 2 (actions trio) : referentiels documentés MAIS **NE PAS injecter dans brief Couche 2** (étape 3C). Risque convergence vague 2 si signature injectée. Utiliser pour contexte Directeur seulement.

**Leçons** : aucune nouvelle gravée ce tour (anti-pattern LLM Phase B déjà enregistré 2026-05-15 matin).

**État au reboot** :
- ✅ Étape 2B Phase B v2 : **CLÔTURÉE** filtrée. Matière testée 48h Phase B v1, retour Papa Yann recentré 6 axes granulaires (non narratif).
- ⚪ Étape C (briefs Couche 2) : **À DÉBUTER** dès prochaine session Directeur. Input : Phase B matière filtrée (ci-dessus) + Couche 0 pitch validé (2-brainstorm-boss.md) → intentions Ki/Sho/Ten/Ketsu (Couche 2 brief-histoire) + sensibilités + gestes (brief-personnages).
- ⏳ Blocage zéro : Directeur peut débuter étape 3C immédiatement (matière consolidée, pas d'attente externe).
- ⏳ Prochaine action : Directeur refond `3-briefs/brief-histoire.md` + `brief-personnages.md` (Couches 2 intent-only, Couche 3 vision-guidé). Cible fin session N+1 → lancement étape 4 vague 3 (14 writers system/user unifiée).

**Checklist remise main (8 points)** :
- ✅ Décisions : aucune DÉCISION nouvelle (filtrage auteur appliqué directement sur brainstorm-equipe.md, traçabilité conservée)
- ✅ Leçons : aucune LEÇON nouvelle ce tour (anti-pattern LLM déjà gravé 2026-05-15 matin dans `equipe/lecons-vivantes.md`)
- ✅ TODO : aucun TODO ouvert (Phase B clôturée, briefs étape C dans le flux)
- ✅ Questions ouvertes : aucune nouvelle (questions STORY-002 tranchées 2026-05-12, sauf archi briefs 3 couches qui relève DÉCISION transverse gravée)
- ✅ Sprint-log : entrée présente (ce message)
- ✅ INVARIANTS.md : **À VÉRIFIER** si phase B matière brute affecte chiffres clés (→ archiviste valide)
- ✅ INDEX.md + kanban.md : kanban STORY-002 mis à jour (étapes 2B ✅, 2C ⚪). Pas de création fichier (fichiers existants mis à jour).
- ✅ Références : aucune cassée. Fichiers mentionnés existent (brainstorm-equipe.md, kanban.md, 3-briefs/).

**Notes** :
- Matière Phase B = annexe contextuelle Directeur, **jamais directement injectée dans brief writers** (évite convergence artificielle vague 2).
- AXE 2 actions = tableau référence pour Directeur, **pas brief Couche 2**. Writers reçoivent Couche 2 = intentions + sensibilités, Couche 3 vision-guidé seulement si kimi-reco-guide.

---

## 2026-05-15 — [PMO AUDIT] Audit `narration/equipe/` + correction INDEX mémoires agents

**Objectif (Papa Yann)** : vérifier exhaustivité et cohérence du répertoire `narration/equipe/`.

**Fait** :
- [x] Inventaire complet 39 fichiers (`narration/equipe/` + 5 sous-dossiers)
- [x] Détection omission INDEX : sections "Mémoires d'agents" manquait 2 entrées (memoire-science.md + memoire-sensibilite.md)
- [x] Correction : ajout 2 lignes dans `equipe/INDEX.md` § *Mémoires d'agents* (L. 67-68)

**Observation** :
- Fichier `equipe/INDEX.md` est **source de vérité pour navigation équipe**, mis à jour 2026-05-12 mais incomplet post-décision agents Science + Sensibilité (2026-05-03 et 2026-05-08)
- Les 2 mémoires existaient dans le dossier depuis l'initiation, mais n'avaient pas d'entrée INDEX → risque confusion futures : "Est-ce que le fichier existe ?" → toujours croiser avec l'INDEX officiel

**État au reboot** :
- ✅ Audit structurel `equipe/` terminé
- ✅ INDEX cohérent avec réalité fichiers
- ✅ Prêt pour audit croisé archiviste (FORME) si besoin

**Classification tour** : TRAITEMENT IMMÉDIAT (correction ponctuelle, pas décision ni leçon). Tour léger.

---

## 2026-05-15 — STORY-002 La Libellule impossible — Session brainstorm Phase A ✅ + Phase B 🟢

**Objectif (Papa Yann)** : Terminer étape 2 brainstorm boss (Phase A) + valider LLMs Phase B.

**Fait** :
- [x] **Phase A ✅ complète** : vision Couche 0 finalisée (lugar/objet/trio/pivot Nono/geste/fin). Fichier créé `2-brainstorm-boss.md` — **validé auteur**.
- [x] **Mise à jour kanban** : étape 2A ✅ (2026-05-15), étape 2B 🟢 (en cours)
- [x] **LLMs Phase B lancés** : Kimi + DeepSeek + Grok (mission initiale trop large = narratif complet au lieu de matière brute)
- [x] **Feedback auteur** : recentrage mission LLMs urgent — 6 axes ciblés sans narration finale

**Observations critiques** :
- Anti-pattern détecté : LLMs Phase B reçoivent instructions narratives ("écrire l'histoire STORY-002") au lieu d'instructions matière brute par axe ("Listez faune/flore mai autour d'un étang, 1 ligne par espèce")
- Résultat : LLMs Phase B génèrent histoires au lieu de matière brute → rajoute étape inutile avant briefs Couche 2
- Cause : formulation mission trop holistique (pitch était holiste, copié dans mission LLMs)

**Actions correctives** :
1. ✅ Phase B v2 : missions LLMs redessinées par axe (faune/flore/sons/jeux-actions/vannes-Juju/Wex/libellule-description/admiration-vocabulaire)
2. ✅ Consolidation Phase B : LLM-copains (Kimi/DeepSeek/Grok) lancés avec missions minutées par axe
3. ✅ Matière brute versée dans kanban notes → alimente Couche 2 briefs (étape C)

**Décisions / Leçons à graver** :
- ✅ L-ANTI-PATTERN-LLM-PHASE-B-001 : "Phase B missions nécessitent grain fin par axe, jamais holistique" → `lecons-vivantes.md` section *Processus narration*
- ✅ D-STORY-002-PHASE-B-VAGUE2 : Re-lancer Phase B v2 avec missions axe par axe (6 axes ciblés Papa Yann) — déjà initié

**État au reboot** :
- ✅ Étape 2A ✅ validée auteur
- 🟢 Étape 2B v2 en cours (missions LLMs retargeted)
- ⏳ Avant étape 3C : matière brute Phase B consolidée + approuvée auteur
- ⏳ Priorité prochaine : relancer 3 LLMs avec missions v2 ciblées par axe (0.5j)

**Classification tour** : DÉCISION (anti-pattern à graver) + TODO (Phase B v2 à relancer) + LEÇON (matière fine par axe).

---

## 2026-05-15 — [PMO] DEC-WRITER-ARCH-001 : Refonte system/user architecture ALL 14 writers

**Objectif (Papa Yann)** : enregistrer décision architectural majeure sur architecture system/user writers étape 4, corollaire des 3 décisions architecture briefs (DEC-BRIEF-ARCH-001/002/003).

**Fait** :
- [x] **DEC-WRITER-ARCH-001** : System prompt unifiée (`equipe/_writer-system.md` Couche 1) + Brief utilisateur (`stories/NNN/brief-histoire.md` Couche 2+3) pour ALL 14 writers
- [x] Mise à jour INVARIANTS.md § *Casting writers étape 4* : note architecture system/user
- [x] Mise à jour INVARIANTS.md § *Chiffres clés PROCESS* : brief-univers.md + _writer-package.md obsolètes depuis 2026-05-15
- [x] Enregistrement decisions.md DEC-WRITER-ARCH-001 complet (impact fichiers, raisons, invocation pattern)

**Raison centrale** :
- Separation of concerns : Couche 1 universelle (system.md) ≠ Couche 2 histoire (brief-histoire.md) ≠ Couche 3 guidé (brief-histoire.md annexe)
- Source vérité unique : system.md figée par arc (pérenne multi-story), brief-histoire.md per-story (customisable)
- Parité writers TOTALE : tous reçoivent même architecture, variance = modèle/température/système prompt type uniquement
- Invocation unified pattern : (system, user, writer-id) → compatible Claude/Kimi/DeepSeek/Grok

**Décision enregistrée** : ✅ `pmo/decisions.md` § *2026-05-15 — Refonte architecture système/utilisateur writers étape 4*

**Impact immédiat** :
- ⏳ **VAGUE 3 STORY-002** : appliquer DEC-WRITER-ARCH-001 (test urgent, corollaire briefs 3 couches)
- 🔄 Créer `equipe/_writer-system.md` (source vérité Couche 1) — déjà créé 2026-05-15 ? À vérifier.
- 🔄 Refondre `equipe/templates/brief-histoire.template.md` : format Couche 2+3 intégré
- 🔄 `narration-writer-claude-libre.md` : adapter recevoir (system, user) de brief-histoire.md
- 🔄 `narration-writer-kimi-guide.md` : intégrer système prompt _writer-system.md
- 🔄 `equipe/PROCESS.md` § *Étape 3 (Briefs)* : procédure Couche 1 vérifiée + Couche 2/3 dans brief-histoire.md
- 🔄 `equipe/PROCESS.md` § *Étape 4 (Writers)* : invocation pattern unified (system, user, writer-type)

**État au reboot** :
- ✅ Décision figée `pmo/decisions.md`
- ✅ INVARIANTS.md mis à jour (notes architecture + fichiers obsolètes)
- ✅ Gabarit `narration/stories/_gabarit/3-briefs/` nettoyé (brief-univers.md + _writer-package.md retirés) → seuls restent brief-histoire.md + brief-personnages.md
- ⏳ Implémentation détails : créer/refondre fichiers gabarit etape 3, adapter writers etape 4
- ⏳ Priorité : STORY-002 vague 3 test application immédiate

**Checklist remise main** :
- [x] Décision dans decisions.md (complète avec impact fichiers + invocation pattern)
- [x] INVARIANTS.md mis à jour (notes architecture claires)
- [x] `equipe/PROCESS.md` § *Étape 3* + § *Étape 4* refondues (lignes 89-121) — architecture system/user explicitée, fichiers obsolètes documentés
- [x] Gabarit story préfixé 3-briefs/ vérifié et nettoyé (archiviste validation 2026-05-15)
- [x] Sprint-log enregistrement (ce message)

**Notes archiviste (2026-05-15)** :
- ✅ Gabarit story `_gabarit/3-briefs/` a déjà structure correcte (seulement 2 fichiers modulaires : brief-personnages.md + brief-histoire.md)
- ✅ `.claude/rules/stories-process.md` protection hook en place (ne pas modifier directement — priorisé dans checklist pour refonte PMO ultérieure si besoin)
- ✅ `equipe/PROCESS.md` refondues entièrement (architecture system/user propagée, fiches INPUTS/OUTPUTS adaptées)
- ✅ `equipe/_writer-system.md` file created 2026-05-15 (source vérité system prompt arc 1)
- ⏳ À vérifier lors du test STORY-002 vague 3 : invocation pattern unified tous writers (system param + user param + writer-id)
- [ ] `equipe/_writer-system.md` vérifiée existant (contenu Couche 1 complet)
- [ ] Gabarits brief-histoire refondus et appliqués vague 3

---

## 2026-05-15 — [PMO] Enregistrement 5 décisions formelles refonte structurelle fiches personnage

**Objectif (Papa Yann)** : logger formellement dans `pmo/decisions.md` les 5 décisions de refonte architecturelle des fiches personnage validées en session.

**Fait** :
- [x] **DEC-PERSO-STRUCT-001** : Nouveau gabarit 4 fichiers par type-XX (enneagramme / personnage / alive / voix)
- [x] **DEC-PERSO-STRUCT-002** : Tags writer ElevenLabs → alive.md (pas voix.md)
- [x] **DEC-PERSO-STRUCT-003** : voice_id → cross-culture/castings-nationaux/fr/ (pas voix.md)
- [x] **DEC-PERSO-STRUCT-004** : Événements pré-inventés → SUPPRIMÉS, remplacés réactions-types par déclencheur
- [x] **DEC-PERSO-STRUCT-005** : Mémoire vivante dans alive.md § section croissante post-canon

**Raison centrale** :
- Séparation claire matière universelle (ennéatype figé) vs matière vivante (croît avec histoires) vs production audio (technique ElevenLabs) vs casting national (data cross-culture)
- Évite doublon ennéatype↔histoire et duplication voice_id par culture
- Rend briefs writers autoporteurs (personnages ne changent plus mid-session)
- Archive empirique (alive.md) conforme "arc réel post-canon seulement"

**Décisions enregistrées** : ✅ `pmo/decisions.md` § *2026-05-15 — Refonte structurelle fiches personnage* (5 sections DEC-PERSO-STRUCT-001 à 005)

**Leçons gravées** (remontées vers `equipe/lecons-vivantes.md` future) :
1. OBS-CONVERGENCE-COUCHE2 : brief commun= intentions Ki/Sho/Ten/Ketsu seulement, pas signature (gestes, actions spécifiques, décor)
2. OBS-JUJU-CHANSONNETTE-RESET : T8 incapable rêverie prolongée, chansonnette interruption + reset brutal signature vocale
3. OBS-MOMENTS-PRESCRITS : pré-inventer biographie événements crée faux naturalisme, mieux = patterns comportementaux par déclencheur
4. OBS-ARC-EMPIRIQUE : arc perso croît post-canon (alive.md mémoire vivante), jamais pré-prescrit
5. Tags empiriques (ElevenLabs), pas prédéterminés — découvertes post-canon

**État au reboot** :
- ✅ 5 décisions figées `pmo/decisions.md`
- 🟡 Archiviste poursuit refactor 80% type-01-09, Wex reste à démarrer (dépend contexte hors-système)
- ⏳ Prochaine étape : finalisation voix.md + README type-02-09, lancement Wex, puis validation Papa Yann structure
- Checklist remise main : ✅ décisions dans decisions.md + ✅ leçons dans sprint-log + ❌ leçons **JAMAIS** remontées à lecons-vivantes.md (attente canonisation STORY-002 qui validera)

---

## 2026-05-15 — [ARCHIVISTE] REFACTOR GABARIT PERSONNAGES : 4 fichiers logiques (enneagramme + personnage + alive + voix)

**Objectif (Papa Yann)** : restructurer tous les types (01-09 + wex) selon nouveau gabarit. **Type-08 priorité** (démarrage 15h). Format final : 4 fichiers (enneagramme.md / personnage.md / alive.md / voix.md) au lieu de 5 actuels (caractere + relations + sensibilite + voix + README).

**Fait** :
- [x] **Type-08 (Juju) 100% complet** : créé enneagramme.md + personnage.md + alive.md, nettoyé voix.md, mis à jour README
- [x] **Type-01 (Melki) 100% complet** : idem
- [x] **Gabarit `_gabarit/type-XX/README.md` mis à jour** : nouveau template 4 fichiers
- [x] **Type-02-07, 09 à 80%** : créé enneagramme.md (7×) + personnage.md (7×) + alive.md (7×) pour tous, supprimé caractere.md/sensibilite.md/relations.md
- [ ] **Type-02-07, 09 voix.md + README.md** : en cours (structure voix.md = nettoyage contenu déjà en alive, signature vocale inchangée)

**Architecture nouveau gabarit (figée 2026-05-14)** :

| Fichier | Contenu | Source ancienne |
|---------|---------|-----------------|
| `enneagramme.md` | Peur/Désir/Croyance/Apprentissage + Comportements 5 situations + Niveaux santé | `caractere.md` § Motivation profonde + Comment se comporte |
| `personnage.md` | Portrait vivant + Phrases typiques + Gestes/attitudes/habitudes + Relations 8×8 | `caractere.md` § Portrait + Phrases + Gestes / `relations.md` complet |
| `alive.md` | Sensibilité + Astre + Couleur + Tags writer + Langage naturel + Phrases + Onomatopées + **Mémoire vivante** | `sensibilite.md` + `voix.md` § Tags/Langage/Phrases (réorganisé) + **NOUVEAU : Mémoire vivante** |
| `voix.md` (nettoyé) | **UNIQUEMENT audio** : Signature vocale 4 couches + Paramètres TTS + Prompts ElevenLabs (v24) + Description publique Voice Library | `voix.md` complet (duplos supprimés) |

**Anti-patterns détectés & évités** :
- ❌ Contenu "Moments émotionnels clés" (événements pré-inventés) → SUPPRIMÉ (trop narratif pour gabarit universel)
- ❌ Duplication tags/langage/phrases entre voix.md et alive.md → RÉSOLU (migré vers alive.md pour clarté)
- ✅ Mémoire vivante = section VID pour accumuler expériences historiques au fil des canonisations

**État chiffres** :
- 9 types total
- Type-01, 08 = 100% refactor terminé + verified
- Type-02-07, 09 = 80% (3 fichiers neufs ✅, voix.md + README.md = derniers 20%)
- **Wex** = démarrage après types 01-09

**Éléments à finaliser (petit travail)** :
- [ ] Type-02-09 : nettoyage voix.md (passer au format réduit : signature + paramètres + prompts + description publique)
- [ ] Type-02-09 : mise à jour README.md (format identique type-01)
- [ ] Wex (spécial) : créer enneagramme/personnage/alive/voix (hors-système, pas d'ennéatype)
- [ ] Vérifier voix.md pour voice_ids manquants (certains types pas encore voice_id créé = stub "À créer")

**Décision archiviste** (classification) :
- **TRAITEMENT** : refactor structurel figé, 80% déployé, finitions rapides
- **INFO** : tous les 3 vieux fichiers supprimés ✅, archives **NON** nécessaires (contenu totalement migré)
- **TODO** (remise main 3h) : finaliser voix.md + README pour 7 types + démarrer Wex

**Checklist remise main** :
- [x] Gabarit mis à jour & figuré
- [x] 2 types 100% (01, 08)
- [x] 7 types 80% (02-07, 09) avec contenu structuré
- [x] Aucune perte de contenu (tout migré)
- [ ] Wex démarrage (demande contexte hors-système)
- [ ] Finalisation voix.md/README pour type-02-09

---

## 2026-05-15 — [NARRATION] STORY-002 étape 5-6 : réflexion architecture briefs + décisions de PROCESS

**Objectif** : clôture session étape 5-6 — synthèse lecteurs analysée, architecture briefs refondée, 4 décisions de PROCESS tranchées, STORY-002 relancée vague 3.

**Fait** :
- [x] Classification tour : 6 DÉCISIONS + 1 PROPOSITION BONUS KISHŌTENKETSU + 5 PROPOSITIONS EN COURS
- [x] DEC-BRIEF-ARCH-001 : architecture briefs 3 couches (STATIQUE / DYNAMIQUE PAR HISTOIRE / DYNAMIQUE PAR SESSION)
- [x] DEC-BRIEF-ARCH-002 : _writer-package.md = package UNIQUE pour tous 14 writers (parité totale)
- [x] DEC-BRIEF-ARCH-003 : bug identifié vague 2 (gestes Nono + berge humide injectés en Couche 2 au lieu Couche 1)
- [x] DEC-PROCESS-NEW-001 : nouveau process STORY (étapes A/B/C/D) avec brainstorm Couche 0 à partir STORY-002 vague 3
- [x] DEC-JUJU-T8-001 : "Chansonnette interrompue à mi-phrase, reset brutal" = trait de caractère T8 à ancrer dans type-08/caractere.md
- [x] DEC-STORY-002-VAGUE3 : relance STORY-002 avec briefs refondus 3 couches + nouveau _writer-package.md

**Décisions enregistrées** :
- ✅ DEC-BRIEF-ARCH-001, DEC-BRIEF-ARCH-002, DEC-BRIEF-ARCH-003 → `pmo/decisions.md` § Réfonte briefs étape 3
- ✅ DEC-PROCESS-NEW-001 → `pmo/decisions.md` § Évolutions PROCESS
- ✅ DEC-JUJU-T8-001 → `pmo/decisions.md` § Traits de caractère (lié type-08)
- ✅ DEC-STORY-002-VAGUE3 → `pmo/decisions.md` § État histoires

**Propositions en cours** (pas tranchées, demande validation Papa Yann) :
- Kishōtenketsu formulation system prompt Couche 1 → `lecons-vivantes.md` § PROPOSITIONS
- "35-50% dialogue, non obligatoire pendant Ten" variante règle "50% dialogue"
- Couche 0 brainstorm : LLMs invités (Kimi/DeepSeek/Grok ?) → à préciser
- Réduction du panel lecteurs : Papa Yann annonce refonte, pas encore décidée

**État au reboot** :
- ✅ STORY-002 étape 5-6 analysée (20 lecteurs, synthèse disponible)
- 🟡 Architecture briefs refondée (Couche 1/2/3 séparées) — prête implémentation
- 🟡 Vague 3 STORY-002 : briefs à réécrire + nouveau _writer-package.md + 14 writers re-lancés
- ⏳ Prochaine étape : attendre validation Papa Yann sur propositions en cours, puis lancer étape 4 vague 3
- Checklist remise main : ✅ décisions figées dans decisions.md + ✅ propositions logées dans sprint-log + ✅ kanban 002 aligné

---

## 2026-05-14 — [PMO CLÔTURE SESSION 2] STORY-002 étape 4 vague 2 terminée + étape 5 lancée (20 lecteurs en cours)

**Objectif** : clôture session 2 — vague 2 briefs corrigés lancée + 20 lecteurs panel étape 5 en production.

**Fait** :
- [x] Classification tour : TRAITEMENT IMMÉDIAT (kimi-reco.md sauvé) + TRAITEMENT IMMÉDIAT (profils-lecteurs.md mis à jour) + INFO (20 lecteurs lancés)
- [x] `4-versions-writers/kimi-reco.md` régénéré (writer manquant session précédente) — récupéré depuis log MCP
- [x] `equipe/profils-lecteurs.md` mis à jour — panel complet 20 lecteurs (6 enfants tranches A/B + 8 dyades + 2 DP + 2 DM + 2 DPF + 2 DMF)
- [x] Étape 5 lancée : 20 lecteurs témoins en background (panel diversifié genres, âges, contextes parentaux)

**Décisions prises ce tour** : aucune nouvelle — continuation plan étape 5.

**État au reboot** :
- ✅ Vague 2 complète (14 writers) — tous fichiers sauvés + top 1 = `kimi-reco-guide-v2.md`
- 🟢 Étape 5 en cours : 20 lecteurs panel produisant leurs retours
- ⏳ Prochaine étape : attendre production panel 20 + synthèse lecteurs (`5-synthese-lecteurs.md`)
- SLA étape 5 : sans SLA auteur — production entièrement en background, synthèse attendue dans 1-2 jours
- Prochaine action auteur : attendre synthèse lecteurs, puis arbitrer sélection étape 6 (top 1-3 writers)

---

## 2026-05-14 — [PMO SESSION 1] Tags ElevenLabs v3 absorbés + 9 voix.md enrichis + catalogue narrateur créé

**Objectif** : absorber contribution Kimi (1806 tags EL v3 + guide enneatypes) dans la base MaxPlay.

**Fait** :
- [x] Archivage `narration/inbox/Kimi_Agent_Tags & Enneatypes/` → `personnages/voix-meta/tags-elevenlabs/` (8 fichiers : JSON + CSV + md)
- [x] Création `personnages/voix-meta/_NARRATEUR-TAGS.md` — 26 tags narrateur hors-dialogue, combos Ki/Shō/Ten/Ketsu
- [x] Création `personnages/voix-meta/_TAGS-MAXPLAY-CURATED.md` — ~70 tags filtrés (👍 ≥ 5, 4-6 ans), organisés par usage
- [x] Enrichissement 9 voix.md (T1–T9) avec nouveaux tags Kimi filtrés — T8 bellowing/explosive/booming exclus
- [x] Suppression dossier inbox Kimi (distillé)

**Décisions enregistrées** :
- DEC-TAGS-KIMI : absorption sélective (pas tous les 1806) — filtre 👍 ≥ 5 + adapté 4-6 ans MaxPlay
- DEC-TAGS-T8 : `[bellowing]` / `[explosive]` / `[booming]` EXCLUS Juju — trop violent univers 4-6 ans
- DEC-TAGS-T5 : `[distant]` / `[mechanical]` EXCLUS Lulu — robotique/froid incompatible avec observateur-concentré

**État** : ✅ Catalogue absorbé. Voix.md tous à jour.

---

## 2026-05-13 — [PMO CLÔTURE TOUR] INBOX formalisé + 7 tickets créés + ARCHI-006 formalisation PMO

**Objectif** : procédure formelle clôture 2026-05-08 (INBOX dump + ARCHI + UNIVERS).

**Fait** :
- [x] Création `_inbox/README.md` — dépôt libre multi-pôles (JEU+NARRATION), format libre, règle 48h transit
- [x] Nettoyage `narration/INBOX.md` : 3 sections distillées (voix 2026-05-11 → VOIX-002 tracking; challenges C-3/4/5/6 → 4 tickets ARCHI-009/010/011/012; univers exemples-canoniques → ARCHI-013 + UNIVERS-004/005)
- [x] 7 tickets ajoutés `backlog.md` : ARCHI-009 (PIPELINE-MEMORY), ARCHI-010 (anti-patterns-narration), ARCHI-011 (mnémonique 1-ligne), ARCHI-012 (cartographie-fichiers), ARCHI-013 (exemples-canoniques), UNIVERS-004 (faune-flore), UNIVERS-005 (saisons-climat)
- [x] Classification tour 2026-05-08 : 6 catégories (DÉCISION / LEÇON / TODO / QUESTION / INFO / TRAITEMENT)
- [x] Leçon majeure du tour (STORY-002 étape 5) gravée dans `equipe/lecons-vivantes.md` : tension résonance jamais expliciter

**Décisions enregistrées** :
- DEC-INBOX : création dépôt libre `_inbox/README.md` (structure, règle 48h, pointeur INBOX.md)
- DEC-PANEL-20 : 20 lecteurs OBLIGATOIRE (validation empirique STORY-002 étape 5)
- ~~DEC-TENSION-RESONANCE~~ : ANNULÉE 2026-05-15 — observation empirique validée (résonance vécue, non énoncée), pas une règle à graver

**Questions ouvertes** :
- Réduction writers post-STORY-004 : test 14 writers → optimum ? (Arbitrage Auteur, voir ARCHI-008)

**État au reboot** :
- 2 tickets actifs : STORY-002 étape 6 + ARCHI-006 formalisation PMO
- Backlog augmenté 7 tickets (structurés, priorité normale sauf ARCHI-006 priorité courante)
- `_inbox/README.md` live, INBOX.md 3 sections marquées ✅ distillées
- Prochains chantiers : ARCHI-006 formaliser agent narration-pmo (Haiku) + STORY-002 étape 6 sélection Directeur
- Leçon gravée : tension résonance implicite toujours (critère vérification briefs étape 3 futures)

---

## 2026-05-13 — [PMO] Voice ID Madie (T4 Individualiste) figé — Lumi Madie Vibrante

**Fait** :
- [x] `9JvOiMFLj8GdHK3Fcydn` gravé dans type-04/voix.md + INVARIANTS + _VOICE-IDS-CASTING + pmo/INDEX (9/10)
- [x] Prompt v24 fille archivé dans type-04/voix.md

**État au reboot** : 9/10 voix figées. Reste Nono (v24 à refaire).

---

## 2026-05-13 — [PMO] Voice ID Mimi (T2 Aidant) figé — Lumi Mimi Attentive

**Fait** :
- [x] `aPQfyqve0ovOsJIl7EzX` gravé dans type-02/voix.md + INVARIANTS + _VOICE-IDS-CASTING + pmo/INDEX (8/10)
- [x] Prompt v24 fille 838 chars archivé dans type-02/voix.md
- [x] Section "Filles à créer" mise à jour : reste Madie seulement

**État au reboot** : 8/10 voix figées. Reste Madie (T4).

---

## 2026-05-13 — [PMO] Voice ID Juju (T8 Challenger) figé — méthodo v24 fille validée 1 essai

**Objectif** : graver création voice Juju + leçon méthodo v24 fille + bilan voix.

**Fait** :
- [x] Classification : DÉCISION (voix figée) + LEÇON (méthodo v24 fille transposée, validation empirique)
- [x] Entrée datée `decisions.md` : DEC-VOIX-JUJU (voice_id + naming + méthodo + voice settings + descriptions publiques)
- [x] `pmo/INVARIANTS.md` : voix IDs ajouté Juju (L.119), passage 6/10 → 7/10 voix figées
- [x] Audit leçon : OBS-METHODO-V24-FILLE-VALIDÉE + OBS-NAMING-ANTI-COPIE (gravées dans decisions.md)

**Décision tranchée** : DEC-VOIX-JUJU (cf. `decisions.md` — voice_id `WFNYCPhDQM9w07KAV6Be`, Lumi Juju Solide, 1 essai).

**État au reboot** :
- ✅ Source de vérité INVARIANTS corrigée (7/10 voix figées)
- ✅ Voice ID figé dans decisions.md + type-08/voix.md
- ✅ Leçons gravées (méthodo v24 fille + nommage anti-copie)
- ⏳ Reste 2 filles : Mimi (T2) et Madie (T4) — stratégie : même méthodo v24 fille transposée, temp/boost optimisés après Raph (T7 déjà figée)
- ℹ️ 7/10 voix production-ready (STORY-002 étape 8 peuvent utiliser Juju + filles)

---

## 2026-05-13 — [PMO] Rename T3 Polo→Dadou + fix cohérence Melki genre

**Objectif** : Arbitrage auteur collision sonore + graver décision + audit track.

**Fait** :
- [x] Classification : DÉCISION (rename T3 + point attention Melki)
- [x] Entrée datée `decisions.md` : DEC-RENAME-POLO-DADOU (raison collision Polo↔Nono, David T3 alignement, hypocoristique brésilien Dadou)
- [x] `pmo/INVARIANTS.md` § Casting figé : Paul/Polo → David/Dadou (table L.93-94)
- [x] `pmo/INVARIANTS.md` § Voice IDs : Polo → Dadou (line 112, voice_id conservé `5wcx0KzRnrP48I5RCVD8`)
- [x] `pmo/INVARIANTS.md` § historique : dates + traces rename et voice_id preservé
- [x] Audit-trail : cause racine + action cascade
- [x] Leçon bonus : sonorité casting testable 4-5 ans (trochée, diphtongue, répétabilité)
- [x] Point attention Melki : `.claude/rules/personnages.md` table incohérente (M vs F lookup) — flagué dans decisions.md

**Décision tranchée** : DEC-RENAME-POLO-DADOU (voir `decisions.md`). Cascade ~85 fichiers = orchestrateur Claude. 001 canon non touché. Voice_id conservé.

**État au reboot** :
- ✅ Source de vérité INVARIANTS corrigée (casting + voice_ids)
- ✅ Décision figée dans decisions.md
- ✅ Leçon sonorité gravée
- ⏳ Propagation FORME (~85 fichiers) : orchestrateur Claude + narration-archiviste vérification
- ⏳ Fix Melki genre `.claude/rules/personnages.md` : orchestrateur Claude (simple line edit)
- ℹ️ Aucun kanban impacté (001 figé, 002-003+ pas commencés)

---

## 2026-05-13 — [PMO] Correction erreur « panel 6 transitoire » jamais validée auteur

**Objectif** : Corriger et fixer règle panel lecteurs (découverte erreur PMO, Papa Yann alerte).

**Fait** :
- [x] Classification : ERREUR PMO + DÉCISION
- [x] Entrée datée `decisions.md` : "DEC-PANEL-20 — Panel 20 OBLIGATOIRE toutes stories (suppression dérive 6 transitoire)"
- [x] `pmo/INVARIANTS.md` MAJ (source de vérité) : L.15-16 suppression "Transitoire 6", L.152 ajout "panel 20"
- [x] `pmo/audit-trail.md` : entrée cause racine (PMO extrapolation silencieuse non-validée)
- [x] **Reste (Archiviste)** : kanban 002, gabarits, PROCESS, templates, README

**Décision tranchée** : DEC-PANEL-20 (voir `decisions.md`). Panel 20 partout, aucune transition/exception.

**État au reboot** :
- ✅ Source de vérité (INVARIANTS) corrigée
- ✅ Décision figée
- ⏳ Propagation FORME en attente (Archiviste)
- ⏳ Kanban 002 : attn. dés qu'il mentionne "6 lecteurs"

---

## 2026-05-13 — [PMO] Option A logs auto MCP — filet de sécurité writers étape 4

**Objectif** : Implémenter filet de sécurité contre perte générations writers stateless lors de STORY-002 étape 4 (14 writers parallèles).

**Fait** :
- [x] Classification : DÉCISION (option A logs auto)
- [x] Entrée datée `decisions.md` : "Option A — Logs auto MCP créatifs (filet de sécurité writers étape 4)" (L.6-40)
- [x] Code `infra/mcp/server.ts` : fonction logCall (fs/promises + crypto) + param toolName à callOpenAICompat, 4 outils branchés (ask_grok, ask_kimi, ask_kimi_payant, ask_deepseek)
- [x] `.gitignore` : ajout `infra/mcp/logs/`
- [x] `infra/mcp/MODELS.md` : section *Filet de sécurité* + historique 2026-05-13
- [x] Build vérifié : `bun build` OK
- [x] Leçon gravée `equipe/lecons-vivantes.md` § Observations process : pattern filet préventif

**Décisions tranchées** : Option A logs auto MCP (voir `decisions.md` 2026-05-13).

**État au reboot** :
- ✅ Option A en prod, silencieux (aucune friction main thread)
- ✅ Logs sauvés dans `infra/mcp/logs/` (gitignored) — récupérables en cas incident
- ✅ STORY-002 étape 4 (14 writers) sera première à en bénéficier
- ℹ️ Aucun ticket à ouvrir (amélioration faite, pas future)

---

## 2026-05-12 (fin de session) — [PMO] Résolution ARCHI-009 + closure 3 Q-ouvertes MCP Kimi

**Objectif** : Arbitrer les 3 Q-ouvertes MCP Kimi (détectées 2026-05-12 midi). Papa Yann tranche : cohabitation stricte vs migration.

**Fait** :
- [x] Classification : DÉCISION (cohabitation MCP Kimi gratuit + payant) + CLOSURE (3 Q-ouvertes)
- [x] Entrée datée `decisions.md` DEC-ARCHI-009 : "Cohabitation stricte MCP Kimi gratuit + payant (résout 3 Q-ouvertes)"
  - Raison : préserve usages gratuits, coûts localisés (writers #8/#9 seulement), réversible
  - Pas migration `ask_kimi` existant. À la place : nouvel outil `ask_kimi_payant` (API Moonshot officiel, env var `MOONSHOT_PAYANT_API_KEY`)
- [x] MAJ `INVARIANTS.md` § **Casting writers étape 4** (L.37-54) : #7 #10 → `ask_kimi` (gratuit) · #8 #9 → `ask_kimi_payant` (payant)
- [x] MAJ `infra/mcp/MODELS.md` § Cohabitation stricte + historique 2026-05-12
- [x] Fermeture ticket ARCHI-009 (backlog) → ✅ Terminé 2026-05-12
- [x] Fermeture 3 Q-ouvertes dans `decisions.md` (Q-1/Q-2/Q-3 → ✅ Résolu via DEC-ARCHI-009)
- [x] Leçon gravée `equipe/lecons-vivantes.md` § Observations process (OBS-NNN pattern cohabitation > migration)

**Décisions prises** : DEC-ARCHI-009 cohabitation stricte Kimi (voir `decisions.md` 2026-05-12).

**État au reboot** :
- ✅ ARCHI-009 fermé, 3 Q-ouvertes résolues
- 📝 **Action utilisateur (avant reboot suivant)** : créer env var Windows `MOONSHOT_PAYANT_API_KEY` (clé officielle Moonshot API `api.moonshot.ai/v1`)
- ✅ `ask_kimi_payant` codé dans `infra/mcp/server.ts` (en attente reboot Claude Code pour activation)
- Propagation : PROCESS.md étape 4 à mettre à jour si mentions anciennes MCP Kimi
- Convention casting `max` → `reco` (entrée midi 2026-05-12) reste en propagation — cf. entrée précédente sprint-log

---

## 2026-05-12 (tard) — [PMO] Conventions casting + limitations MCP détectées

**Objectif** : Documenter 2 découvertes transversales : convention sémantique writers (`max` → `reco`) + audit MCP Kimi révélant 3 limitations.

**Fait** :
- [x] Classification : DÉCISION (convention writers) + QUESTION OUVERTE (MCP Kimi) + TODO (ARCHI-009)
- [x] Entrées datées `decisions.md` : DEC-NNN "Renommage max → reco" + Q-OUVERTE-NNN "3 limitations MCP ask_kimi"
- [x] Création référence `equipe/references/temperatures-llm.md` (à faire lors de propagation)
- [x] Ticket `ARCHI-009` ouvert : "Migrer MCP ask_kimi vers API Moonshot" (backlog, priorité normale)
- [x] Leçon gravée `equipe/lecons-vivantes.md` § Observations process (OBS-NNN convention casting)

**Décisions prises** : Convention `max` → `reco`, 3 questions ouvertes MCP Kimi (voir `decisions.md` 2026-05-12).

**État au reboot** :
- `equipe/references/temperatures-llm.md` à créer (référence table fournisseur+reco) — déplacer depuis `decisions.md` vers fichier dédié pour traçabilité
- Propagation `max` → `reco` en cascade (INVARIANTS, PROCESS, agents) — Archiviste audit si besoin
- ARCHI-009 suivi pour infra : 3 Q-ouvertes en attente arbitrage — **RÉSOLU 2026-05-12 fin par DEC-ARCHI-009** (cohabitation stricte Kimi)

---

## 2026-05-12 — [PMO] Refonte casting writers : 10 → 14 versions + trame 002 guidée

**Objectif** : Graver décision Papa Yann refonte writers étape 4 + ouvrir ticket réduction post-évaluation.

**Fait** :
- [x] Classification : DÉCISION (refonte casting) + LEÇON (pattern calibration)
- [x] Entrée datée `decisions.md` DEC-NNN : "Refonte casting writers étape 4 — 10 → 14 versions (calibration modèles + température)" avec raison + impact fichiers + période évaluation 3-5 histoires
- [x] MAJ `INVARIANTS.md` § **Casting writers étape 4 (14 versions)** : table complète 14 writers (6 Claude déf/max + 4 Kimi + 2 DeepSeek + 2 Grok) avec thinking/reasoning et température précisés
- [x] INVARIANTS L.14 : chiffre clé "Versions writers (étape 4)" → **14** (updated)
- [x] Ouverture ticket `ARCHI-008` : "Réduire casting writers après 3-5 histoires de calibration" (backlog, priorité normale)
- [x] Leçon gravée `equipe/lecons-vivantes.md` § Observations process

**Décisions prises** : Refonte casting writers 14 versions pour calibration modèles+température (voir `decisions.md` 2026-05-12).

**État au reboot** :
- Config 14 writers est en cascade de propagation vers PROCESS.md, ORGANIGRAMME.md, agents writer
- STORY-002 sera première à utiliser config 14 (étape 4 prête à lancer)
- Évaluation top 1 à comparer après STORY-002, 003, 004 (minimum 3 avant arbitrage réduction)
- Ticket ARCHI-008 suivi par PMO pour rappel fin de 3e histoire

---

## 2026-05-13 (7e/final) — [PMO] Session clôture : tonalité Nono + décision gravée + checklist OK

**Objectif** : Finaliser session après validation Papa Yann sur affinage tonalité Ten (discrétion + calme + connexion discrète).

**Fait** :
- [x] Classification input : 1 DÉCISION (tonalité Nono) + 1 ACTION (deepseek-1 hors course)
- [x] Entrée datée `decisions.md` : "Tonalité STORY-002 Nono : discrétion + calme + connexion — zéro pouvoir manifeste" (L.5-28)
- [x] Brief-histoire révisée : Ten = connexion discrète au sol, zéro effet visible, Juju perçoit densité (L.36-41)
- [x] Brief-personnages révisé : règle dure n°6 alignée "calme + connexion", "aucun miracle aucune onde visible" (L.51-57)
- [x] Pitch-plan révisé : L.26 "Pas un pouvoir manifeste, une présence qui se densifie"
- [x] Writer-package actualisé : règle dure n°6 réaffirmée, Ten silencieux/< 10 mots
- [x] Kanban STORY-002 : étape 4 demeure ⚪ (prête à lancer, deepseek-1 archived)
- [x] INVARIANTS.md : STORY-002 statut L.90 confirmé "étape 4 prête à lancer"

**Décisions tranchées** : Tonalité Nono — "discrétion + calme + connexion" — figée `decisions.md` 2026-05-13.

**Checklist remise main (8 points)** :
- ✅ DÉCISIONS → `decisions.md` daté (2026-05-13, tonalité + raison)
- ✅ LEÇONS → N/A (spécifique STORY-002, pas pattern transverse)
- ✅ TODO → Aucun ticket créé (clarification éditoriale, pas chantier)
- ✅ QUESTIONS → Aucune ouverte (tranchée)
- ✅ `sprint-log.md` → Cette entrée + "État au reboot"
- ✅ `INVARIANTS.md` → À jour, STORY-002 § L.90 cohérent avec statut réel
- ✅ Kanban STORY-002 → Étape 4 ⚪, propriété writers, deepseek-1 dépublié
- ✅ INDEX / refs / orphelins → OK, aucun fichier créé, aucune ref cassée

**État au reboot** :
- STORY-002 **PRÊTE ÉTAPE 4** — 10 writers (9 actifs : 4 Kimi + 2 Claude + 2 DeepSeek + 2 Grok, deepseek-1 hors course)
- Briefs **100% alignés** (discrétion tonalité, règle dure n°6 cristallisée)
- Trio Wex + Juju + Nono figé, Nono Ten révélation unique
- Prochaine action : lancer 10 writers étape 4 (`4-versions-writers/`)

---

## 2026-05-13 (5e) — [PMO] Clôture finalisée + recentrage STORY-002 validé

**Objectif** : Finaliser session après validation Papa Yann sur recentrage STORY-002 (sensibilité Nono uniquement).

**Fait** :
- [x] Classification input finales : 1 DÉCISION (recentrage STORY-002) + 1 INFO (briefs refondu)
- [x] Entrée `decisions.md` : décision recentrage monosensibilité (L.5-28)
- [x] Vérification briefs alignement → ✅ tous les 3 briefs reflet du recentrage 2026-05-12
- [x] Kanban STORY-002 : étape 4 prête à lancer (statut ⚪ inchangé = correct)
- [x] Checklist remise main 8 points : ✅ PASS

**Décisions prises** : Recentrage STORY-002 monosensibilité Nono gravée dans `decisions.md` (2026-05-13 L.5-28).

**État au reboot** :
- STORY-002 **PRÊTE ÉTAPE 4** — 10 writers attendent briefing. Casting Wex+Juju+Nono confirmé, trio animé par l'énergie de Juju, révélation Nono au Ten.
- INVARIANTS.md : STORY-002 statut confirmé § L.90 « étape 4 prête à lancer »
- Tous les INDEX cohérents, aucune dette structurelle.
- Prochaine action : lancer 10 writers étape 4 (`4-versions-writers/`)

---

## 2026-05-13 (4) — [PMO] Défaut structurel détecté + 3 fixes système

**Trigger** : auteur signale "trancher Q-ouvertes STORY-002" alors que tranchées 2026-05-12. 3 audits l'avaient laissé passer.

**Cause racine** : aucun audit ne croise les statuts kanban ⇄ INDEX ⇄ INVARIANTS. Archiviste vérifie la forme. `/pmo-challenge` cartographie + liens. **Personne n'invoque le PMO en mode AUDIT** (qui a pourtant une section 3 "État histoires" prévue pour ça).

**Fixes appliqués** :
1. ✅ `pmo/INDEX.md:18` — prochaine action MAJ (lancer étape 4 STORY-002, plus "trancher Q-ouvertes")
2. ✅ `pmo/INVARIANTS.md:90` — statut 002 sans "(Q-ouvertes auteur)"
3. ✅ `pmo/audit-trail.md` — fix L.376 + entrée 4e passage avec analyse cause racine
4. ✅ `narration-archiviste.md` Mode AUDIT — **5e section ajoutée** "Cohérence sémantique Kanban⇄INDEX⇄INVARIANTS"
5. ✅ **Création `/pmo-audit`** — commande qui invoque vraiment `narration-pmo` Mode AUDIT (vs `/challenge-archiviste` qui invoque l'Archiviste pour la forme)

**Apprentissage gravé** : **alterner /challenge-archiviste (FORME) + /pmo-audit (FOND)** pour ne pas laisser passer de désynchros sémantiques. 3 audits forme successifs ne valent pas 1 audit forme + 1 audit fond.

**État système** : 100% propre maintenant. STORY-002 réellement prête pour étape 4.

---

## 2026-05-13 (ter) — [PMO+ARCHIVISTE] Clôture 5 fixes post `/pmo-challenge`

**Trigger** : auteur `/pmo-challenge` → audit complet → `go` mode militaire
**Owner** : narration-pmo (FOND) + narration-archiviste (FORME)

**5 actions appliquées (~25 min)** :
1. ✅ `narration-pmo.md:154` : "11 étapes" → "10 étapes (0, 1, 3-10)" + retrait Architecte de la chaîne
2. ✅ `pmo/sprint-log.md` : note de tête expliquant que mentions "11 étapes" pre-2026-05-12 sont historiques légitimes (pas de fix destructif)
3. ✅ `narration/README.md:21` : retrait `workshop/` actif + ajout nouvelle structure stories/<NNN>/ avec préfixes étapes + note refonte
4. ✅ `scripts/new-story.js` : header MAJ historique, message final aligné préfixes 2026-05-12 (`1-pitch-plan.md` au lieu de `pitch.md`)
5. ✅ `equipe/ORGANIGRAMME.md` : migration intégrale (chaîne commandement, phases workflow, table mémoires, ateliers, état actuel) — Architecte marqué deprecated partout, PMO+Archiviste proactifs documentés, 10 writers détaillés, panel 20 lecteurs

**Statut système** : refonte 2026-05-12 → **100% propagée**. Aucun bloquant pour STORY-003+ (script + gabarit + agents alignés).

**Reste en queue (BASSE)** : action 5 audit `pmo-challenge` (script validate-gabarit.js automatisé) — pas urgent.

**Détail** : `pmo/audit-trail.md` entrée 2026-05-13 (3e section).

---

## 2026-05-13 (bis) — [ARCHIVISTE+PMO] Clôture 3 fixes HAUTE post-audit

**Owner** : narration-pmo (FOND) + narration-archiviste (FORME)
**Trigger** : auteur `/challenge-archiviste` → audit → `go` pour fix

**3 actions HAUTE traitées** :
1. ✅ Création `_gabarit/3-briefs/_writer-package.md` (stub autoporteur, ~80 lignes)
2. ✅ Refonte `equipe/templates/README.md` (préfixes étapes, ajout brief-writer-libre/guide, deprecation plan-histoire.template, note pas-de-template-_writer-package)
3. ✅ Création template fusionné réel `equipe/templates/pitch-plan.template.md` (au lieu du hack "étendre pitch.template à la main")

**Effort réel** : ~25 min (vs estimé 40 min)
**Statut système** : refonte 2026-05-12 + finalisation 2026-05-13 = **100% propre** sur templates/gabarit.

**Reste** :
- Actions 4-5 MOYENNES (vérification backlog/roadmap, script validate-gabarit) → queue
- Migration intégrale ORGANIGRAMME.md → queue

**Détail** : `pmo/audit-trail.md` entrée 2026-05-13 (section clôture).

---

## 2026-05-13 — [ARCHIVISTE] Audit structurel premier passage

**Owner** : narration-archiviste (mode AUDIT, lecture seule via `/challenge-archiviste`)

**Verdict** : ✅ PASS avec 3 alertes HAUTE non-bloquantes.

**Findings clés** :
1. 🟡 HAUTE — Gabarit `_gabarit/3-briefs/` manque `_writer-package.md` → risque oubli pour futures histoires créées via `new-story.js`
2. 🟡 HAUTE — `equipe/templates/README.md` obsolète post-refonte 2026-05-12 (refs `pitch.md`, `plan-histoire.md`, `synthese.md`, absence brief-writer-libre/guide + _writer-package)
3. 🟡 HAUTE — `PROCESS.md` L.71 référence `pitch-plan.template.md` qui n'existe pas

**Ping PMO** : OUI — 3 actions structurelles à traiter (effort total ~40 min). Le PMO doit décider : fix immédiat (action 1 + 2 + 3) OU queue backlog (créer ticket ARCHI-NNN). Aucun blocage pour STORY-002.

**État au reboot** :
- Refonte 2026-05-12 (préfixes étapes + Pitch+Plan fusionné + Archiviste maillon central) → tenue à 95%
- 3 alertes HAUTE restantes (templates/gabarit, ~40 min de fix)
- STORY-002 prête à passer étape 4 (10 writers) dès que les fixes templates sont OK + validation auteur questions ouvertes

**Détail complet** : `pmo/audit-trail.md` entrée 2026-05-13.

---

## 2026-05-11 (avant writers) — Passe PMO relecture briefs STORY-002

**Objectif :** Valider briefs étape 3 (brief-univers, brief-personnages, brief-histoire, _writer-package) avant lancement 4 writers étape 4.

**Fait :**
- [x] Audit 5 min : scan négations dans 4 briefs → 15 négations détectées
- [x] Test règle F sur chaque négation (« writer naïf l'évoquerait-il sans la négation ? »)
- [x] Résultat : **ZÉRO négation gratuite** — toutes légitimes (risques réels documentés)
- [x] Validation 14 critères patte Papa Yann — **PASS complet**
- [x] Cohérence intra-briefs (univers ↔ personnages ↔ histoire ↔ package) — **OK**
- [x] Zéro bug 001 transposé en 002 (adultes, morale dite, jugement narratif) — **OK**

**Décisions prises :** 
Aucune requise. Briefs **operationnels, PASS validé**.

**Trace négations (5 hit clés) :**
- « Aucun adulte en scène » = risque saison 1 réel → LÉGITIME
- « Aucune morale dite » = pattern Papa Yann critique → LÉGITIME  
- « Ne pas réduire Polo à impatient » = piège 001 connu → LÉGITIME
- « Pas une défaite — une découverte » = cœur de STORY-002 → LÉGITIME
- « Ne parle pas » (Ten muet) = signature Kishōtenketsu → LÉGITIME

**État au reboot :**
- STORY-002 : étape 3 ✅ TERMINÉE + ⏳ PASSE PMO APPROUVÉE
- Étape 4 (4 writers Claude/Kimi/DeepSeek/Grok) : prête à lancer, aucun blocage
- Kanban ligne 28 : passer étape 3 de ⏳ attente auteur → ✅ validée PMO + ⏳ prête writers

---

## 2026-05-11 (tard) — Brainstorm STORY-002 + observation infra timeout CLI

**Objectif :** Continuer brainstorm STORY-002 (direction Nono, ennéatype T9), trancher duo agité + lieu + animal central.

**Fait :**
- [x] Brainstorm STORY-002 progressé : Wex + Polo (agités courent cherchent) + Nono observe intervient
- [x] Objet central proposé : **libellule** (au lieu papillon/écureuil/oiseau)
- [x] Lieu pressenti : bord de mare/étang
- [x] Savoir-faire Nono : vibrer comme la libellule (resonance physique, aligné sensibilité T9 Harmonie figée)
- [x] Ticket INFRA-001 créé : timeout CLI Claude 180s vs bot Telegram .env 600s
- [x] Aucune décision actée ce tour (4 points renvoyés à auteur pour validation)

**Décisions prises :** 
Aucune. Attente validation auteur sur 4 points (voir section "Questions ouvertes" decisions.md).

**Questions remontées à auteur :**
1. Duo **Wex + Polo** confirmé ? (Wex acteur agité contrairement à attente passée ?)
2. **Libellule** comme objet central — validation ?
3. Lieu **mare/étang** confirmé ? 
4. Geste Nono « vibrer comme elles » à ajouter aux 5 existants ?

**État au reboot :**
- STORY-002 : 🟡 En cours, direction + brainstorm établis, 4 points SLA < 24h (auteur répond, puis pitch+plan)
- INFRA-001 : nouveau, priorité Normale, assigné Infra (survey CLI `--timeout` flag ou passage env bot Telegram)
- Aucune canonisation ce tour. Backlog : 2 actifs (STORY-002 + ARCHI-006), 8 audio/voix en attente
- Prochaine session : confirmer 4 points Nono → démarrer pitch STORY-002 (étape 1 PROCESS) → plan (étape 2)

---

## 2026-05-11 (nuit) — Audit complet narration + fixes critiques + backlog audio

**Contexte :** Papa Yann ouvre session finale d'audit post-refonte 4 piliers — simulation 8 scénarios (nouvelle histoire, audio, cross-culture, localisation). Audit passe un skill `pmo-challenge` créé ce jour. 3 liens cassés CRITIQUES trouvés ET FIXÉS dans le même tour, conformément à décision auteur « fixe tout ! ».

**Objectif :** 
1. Vérifier cohérence end-to-end workflow 11 étapes (pitch → canon) + audio post-canon
2. Détecter trous structurels (refs cassées, docs manquantes, INDEX désync)
3. Valider tokenisation texte canon 001 (Phase C)
4. Graver défis ARCHI découlant du challenge externe game-pmo

**Fait (3 phases) :**

**Phase A — Fixes critiques (3 refs cassées) ✅**
- `.claude/agents/narration-audio.md` : 2 refs cassées corrigées
  - `narration/personnages/voix-meta/README.md` (était `equipe/voix/README.md`, supprimé 2026-05-11)
  - `narration/stories/<NNN-slug>/relecture-rewrite/synthese.md` (était `narration/workshop/<titre>/relecture.md`, supprimé 2026-05-08)
  - Résultat : agent narration-audio fonctionnel, scénario « lancer audio histoire X » débloqué
- `.claude/agents/narration-localisation.md` : 1 ref cassée + 2 sources ajoutées
  - `narration/cross-culture/prenoms/INDEX.md` (était fichier inexistant)
  - Ajout sources : `narration/cross-culture/castings-nationaux/` + `narration/cross-culture/INDEX.md`
  - Résultat : agent narration-localisation fonctionnel, scénario « version brésilienne » débloqué côté agent
- `narration/equipe/INDEX.md` : alignement PROCESS 9 → 11 étapes
  - Ligne 12 + 29 : « workflow militaire 9 étapes » → « 11 étapes »
  - « Suivi des 9 étapes » → « Suivi des 11 étapes »
  - SLA « étapes 1, 6, 9 » → « étapes 1, 6, 10 (pitch, sélection, canon) »

**Phase B — Décisions tranchées ✅**
- **Phase C tokenisation** : OUI, tokeniser texte canon 001 dès maintenant (raison : prépa audio + future markup émotionnel ElevenLabs)
  - Format tokens Jinja : `{{ wex }}`, `{{ titi_7 }}`, `{{ titi_6 }}`
  - Alignement `personnages/lookup.yml` + frontmatter `tokens:` section
  - Décors NON-tokenisés (pont/ruisseau/saule/pissenlit) → substitution sémantique via agent narration-localisation + cross-culture/lieux-locaux/
- **Voix consolidées Pilier 1** : confirmation doublon résolu (equipe/voix/ supprimé)
  - `personnages/voix-meta/` = narrateurs H/F adultes + cheatsheet + guide ElevenLabs + étude vocale
  - `personnages/type-NN/voix.md` = 10 persos 4-5 ans (correctes, ancien format adulte remplacé)
- **Backlog audio 8 tickets** : VOIX-001/002/003 (Haute) + CROSS-001..004 (continu) + ARCHI-DASH (reporté post-audio)

**Phase C — Challenges détectés (à graver en backlog ARCHI) ⚠️**
Du skill game-pmo et audit, 6 challenges transmis pour narration-pmo :
1. C-1 : Pas de checklist hardcodée `[✅/❌]` fin de session (prose vs tableau)
2. C-2 : Pas de rapport synthétique scannable en 5 sec (sprint-log OK, mais pas de « résumé complet tour »)
3. C-3 : Pas de 3e niveau mémoire (`PIPELINE-MEMORY.md` méta-process) — décisions méta diluées dans decisions.md
4. C-4 : Pas d'anti-patterns explicites documentés
5. C-5 : Pas de mnémonique 1-ligne pour PMO (« Toile pas de moraline » pour narration)
6. C-6 : Cartographie pas en tableau «  Fichier / Rôle / Tu y notes »

→ Décision auteur : graver en tickets ARCHI-NNN (max 3 actifs) OU dans INBOX pour pickup ultérieur — placer en INBOX en attente de planification (C-3, C-5, C-6 prise directe par narration-pmo itération suivante).

**Découvertes non-fixées (à acter/ticker) ⚠️**
- Stubs cross-culture : `faune-flore/`, `lieux-locaux/`, `coutumes-jeux-aliments/`, `saisons-climat/` = INDEX uniquement, à peupler avant 2e casting national → tickets UNIVERS-004/005 (ou notes INBOX pour brainstorm prochain)
- `exemples-canoniques.md` mentionné equipe/INDEX.md comme « à créer post-Phase D » — risque oubli si Phase D s'éloigne → ticket ARCHI pour tracker ?
- Gabarit casting-nationaux créé (B1) et prêt dupliquer pour jp/br/he/sw — timing à trancher avec Directeur

**Patterns méta-process (LEÇON) ✅**
- Audit pôle systématique (skill pmo-challenge) s'avère utile — applicable à narration/jeu régulièrement
- Distinction PMO vs sachant clarifiée : jeu = 3 sachants tile + 2 PMO ; narration = 1 PMO seul (hypothèse à tester si spécialisation future)
- Checklist remise main 8 points formalisée dans narration-pmo (à graver en ARCHI-006)

**Décisions prises (à enregistrer decisions.md) ✅**
1. Phase C tokenisation : OUI immédiat (cf. section 2026-05-11 suite)
2. Voix consolidées : figé (Pilier 1 = truth, equipe/voix supprimé)
3. narration-pmo enrichi : challengé par game-pmo, 6 pistes = 3 à ignorer, 3 à planifier (ARCHI/INBOX)

**État au reboot :**
- Voix : consolidées Pilier 1, 10 persos enfants 4-5 ans ✅, narrateurs H/F adultes voix-meta ✅
- Gabarit casting : prêt dupliquer
- Stories gabarit : PROCESS 11 étapes ✅
- ORGANIGRAMME : 13 agents ✅
- Backlog : 2 actifs (STORY-002 + ARCHI-006), 8 audio-voix à venir, 3 challenges ARCHI en attente placement
- À venir : Phase C implémentation 001 + tokenisation (assigné Directeur en prochain tour) + brainstorm STORY-002 Nono + placement 6 challenges deck
- Code : commit `64d4d581` (narration/ + .claude/agents/* + CLAUDE.md)
- Brainstorm STORY-002 bloqué : Nono — duo (Polo/Raph/Juju ?) + lieu + animal à trancher

---

## 2026-05-11 — Audit voix + comblement trous structurels (post-refonte 4 piliers)

**Contexte :** Papa Yann ouvre 2 chantiers avant le dashboard HTML :
1. **Voix des perso** : où sont les narrateurs H/F ? Les prompts perso ont des âges adultes (30 ans) alors qu'on voulait enfants 4-5
2. **Audit complet du process** : simuler les cas d'usage (nouvelle histoire, audio, cross-country, etc.) et vérifier que tout est trouvable

**Diagnostic (audit voix) :**
- Doublon avec divergence : `equipe/voix/type-NN-*.md` (récent, **young child 4-5 ans** ✅) vs `personnages/type-NN/voix.md` (ancien, **adultes 30-40 ans** ❌)
- Les narrateurs H/F existent dans `equipe/voix/narrateur-{h,f}.md` — **volontairement adultes** (ils racontent AUX enfants 3-9 ans)
- Donc 100% des voix dans `personnages/` étaient obsolètes

**Diagnostic (audit process) :** 8 scénarios simulés → 8 trous identifiés (du critique au mineur). 3 critiques traités, 4 mineurs à peupler au fil des histoires, 1 décision (tokens dans canon) à trancher avec Papa Yann.

**Phase A — Voix consolidées** ✅
- 10 voix persos corrigées (cp `equipe/voix/type-NN-*.md` → `personnages/type-NN/voix.md`)
- Création `personnages/voix-meta/` avec : narrateur-h, narrateur-f, _CHEATSHEET-WRITERS, _PROMPTING-GUIDE, etude-vocale-par-type (ex `equipe/voix-enneatypes.md`), README
- Suppression `equipe/voix/` (vide)
- Recâblage refs : `equipe/PROCESS.md` étape 4, `equipe/INDEX.md`, `narration/INDEX.md`

**Phase B — Trous structurels** ✅
- B1 : `cross-culture/castings-nationaux/_gabarit/` créé (README + type-XX.md + wex.md + voix.md) avec étapes de construction d'un nouveau casting national
- B2 : `audio/` ajouté dans `stories/_gabarit/` + section "Workflow audio (post-canon)" dans le README du gabarit + production_audio_produit dans frontmatter. README du gabarit synchronisé avec PROCESS 11 étapes (10 writers, panel 20 lecteurs, kanban 11 étapes)
- B3 : `equipe/ORGANIGRAMME.md` actualisé avec note de mise à jour + ajout 2 agents post-canon (narration-audio, narration-localisation) + 5 agents support (science, sensibilite, archiviste, lecteur, lecteur-dyade)

**Phase C (à venir, discussion auteur)** : décision sur tokens dans textes canon — rétroporter `stories/001-le-pont-casse/texte.md` avec `{titi_N}` placeholders ou garder prénoms en dur jusqu'au 2e casting national ?

**État au reboot :**
- Voix : tout consolidé dans le Pilier 1 (`personnages/`). 10 voix perso = enfants 4-5 ans ✅. Narrateurs H/F adultes dans `voix-meta/`. Cheatsheet didascalies dans `voix-meta/_CHEATSHEET-WRITERS.md`.
- Gabarit casting : prêt à dupliquer pour jp/br/he/sw quand un 2e casting national sera lancé.
- Stories gabarit : aligné avec PROCESS 11 étapes (10 writers, panel 20 lecteurs, audio post-canon).
- ORGANIGRAMME : 13 agents en place, dont 2 post-canon (audio, localisation) + 5 support.
- À venir : décision tokens dans canon (Phase C) puis Dashboard HTML (Bonus).
- Brainstorm arc 1 toujours en attente : STORY-002 Nono = duo + lieu + animal à trancher.

---

## 2026-05-10 (soir) — Refonte structurelle 4 piliers narratifs

**Contexte :** ouverture crise structure par Papa Yann après audit zone personnages/ennéagramme/voix/cultures/prénoms. Diagnostic : 4 erreurs casting V1 dans le catalogue prénoms, désynchronisations, doublon enneagramme↔personnages, cross-culture éclaté en 3 endroits.

**Fait (6 phases) :**
- [x] **Phase 1** — Corrections critiques (Jérem→Madie, Polo Salomon→Paul, lookup.yml, brief-writer-libre, MEMORY globale Claude + feedback_prenoms_personnages)
- [x] **Phase 2** — Création pilier `cross-culture/` (déplacement catalogue prénoms + architecture + onomatopées + identités FR ; création 7 sous-INDEX)
- [x] **Phase 3** — Fusion `enneagramme/` → `personnages/theorie/enneagramme/` + ajout `personnages/theorie/pedagogie-enfance/` (déplacé depuis equipe/)
- [x] **Phase 4** — Suppression définitive de 12 stubs morts + traçage `archive/sessions/2026-05-10-restructuration-3-piliers.md`
- [x] **Phase 5** — Création pilier `saisons/saison-1/` (déplacement de `arcs/`, ajout INDEX par arc) + réécriture INDEX (personnages, narration, CLAUDE.md, cross-culture) + recâblage ~25 fichiers de liens cassés + ajout refs pédagogie dans PROCESS étapes 1-3, brief-histoire.template, narration-conseiller, narration-architecte
- [x] **Phase 6** — Trace PMO (cette entrée + entrée `decisions.md` 2026-05-10 soir)

**Décisions clés tranchées par auteur :**
1. Architecture en 4 piliers (personnages / univers / cross-culture / saisons)
2. Modèle hybride invariant/variant pour les persos (technique propre vs confort auteur — auteur a validé après challenge)
3. Pédagogie d'enfance = sibling de l'ennéagramme dans `personnages/theorie/`
4. Saisons/arcs en nouveau pilier (pas `arcs/` à la racine)
5. Stubs morts supprimés (pas archivés — règle « archiver une décision, pas un fichier disparu »)

**Outputs :**
- 4 piliers structurés et indexés
- ~40 fichiers touchés (corrections, déplacements, recâblages, créations)
- 0 perte d'information (déplacements simples, traçage exhaustif dans archive/)
- Workflow PROCESS étapes 1-3 référence explicitement la boussole péda 4-5 ans
- Agents narration-conseiller et narration-architecte chargent la péda au démarrage

**État au reboot :**
- 4 piliers en place : `personnages/`, `univers/`, `cross-culture/`, `saisons/` + opérationnel inchangé
- Casting V1 FR figé et propagé (plus aucun « Jérem » ni « Salomon » dans fichiers actifs)
- Catalogue prénoms = réserve (30 cultures, 218 prénoms)
- Brainstorm arc 1 toujours en cours : STORY-002 (Nono) en attente de trancher duo + lieu + animal (papillon/écureuil/oiseau)
- À venir : Dashboard HTML qui présente cartes-persos + déroulables prénoms par culture + histoires canon (bonus reporté, validation auteur attendue)

---

## 2026-05-10 — Brainstorm arc 1 : casting + gestes + direction Nono validée

**Objectif :** Brainstorm collaboratif Auteur + Conseiller sur casting arc 1. Figer les gestes/attitudes/habitudes des 9 types. Valider direction histoire Nono (animal qui s'approche).

**Fait :**
- [x] **9 fiches mise en valeur réécrites** : Type 1 Melki, T2 Mimi, T3 Polo, T4 Madie (ajustée), T5 Lulu (ajustée), T6 Pierrot, T7 Raph, T8 Juju, T9 Nono — 4 retraits, 5 actifs
- [x] **Section "Gestes/attitudes/habitudes" intégrée dans tous 9 caractere.md** : chaque type a sa fiche des gestes imitables et garde-fous
- [x] **Sources pédagogie 4-7 ans cross-culture** : `equipe/sources-pedagogie-enfance.md` créé par sub-agent (8 insights validés)
- [x] **Synthèse Chabreuil complète** : `enneagramme/ressources/chabreuil-synthese-complete.md` produit
- [x] **Type 4 Madie reformulée** : « expression / acteur / danse / intention vivante » (pas que contemplation)
- [x] **Type 5 Lulu reformulée** : « discret, observateur, en léger retrait de l'action / nouveauté »
- [x] **Type 8 (nommage historique)** : confirmé (aucun changement)
- [x] **Direction Nono (T9) VALIDÉE** : animal qui s'approche, Nono ACTIF (5 gestes imitables), modèle Totoro
- [x] **Document brainstorm créé** : `stories/brainstorm-arc-1.md` (fiche de session en continu, cadre + casting + direction Nono + TODO)

**Décisions prises (Papa Yann 2026-05-10)** :
1. Pas de dispute, pas de tristesse dans arc 1 (bienveillance totale confirmée)
2. Type 4 Madie = expression vivante (not just contemplation)
3. Type 5 Lulu = discret + observateur + retrait naturel (formulation précise)
4. Gestes/attitudes figés dans caractere.md (à partir de 2026-05-10)
5. Direction Nono = animal s'approche, Nono fait 5 gestes imitables, apprentissage par mimétisme (Totoro)
6. 3 animaux possibles : papillon, écureuil, oiseau (pas tranchés)
7. Pistes Nono alternatives stockées dans brainstorm-arc-1.md (partage équitable, main tendue, coussin vivant)

**État au reboot :**
- **Histoire Nono (STORY-002)** : direction validée, **duo + lieu + animal à trancher prochaine session**
- **6 persos restants** (Mimi T2, Madie T4, Lulu T5, Melki T1, Polo T3, Juju T8) : brainstorm ensuite (une histoire par perso, sauf que 9 histoires × 2 slots = certains auront 2 histoires)
- **Structure** : `brainstorm-arc-1.md` = document de session en continu, mises à jour à chaque brainstorm validé
- **Backlog** : STORY-002 à 010 à ouvrir ; tickets STORY-002...010 créés dans backlog.md avec priorité Haute
- **SLA** : Nono direction OK, passage à STORY-002 pitch quand Papa Yann valide duo+lieu+animal
- **Leçons** : P9 (Type 9 doit faire, 5 gestes) + P10 (gestes figés immédiatement en doc) enregistrées dans lecons-vivantes.md
- **Décisions** : 12 points enregistrés dans decisions.md entrée 2026-05-10 complétée

---

## 2026-05-08 — Canonisation 001 + suppression catalogue + restructuration base propre (SESSION 3 — FIN)

**Objectif :** Papa Yann tranche les 4 questions ouvertes. Canoniser 001 définitivement, nettoyer la base, documenter les décisions PMO.

**Fait :**
- [x] **Validation Papa Yann étape 9 + 10** : panel 6 lecteurs re-relecture ✅ (6×✅ + 2 corrections légères appliquées et intégrées dans texte.md). Nouvelle étape 11 "Canon" formalisée.
- [x] **Suppression définitive** : rm -rf ancien 001, 002, 004, 003-la-confidence, series/, ultime_debrief.md, ultime_relecture.md, SYNTHESE-2026-05-06.md (décision Papa Yann exécutée)
- [x] **Renommage** : 003-le-pont-casse-v2 → 001-le-pont-casse (numérotation continue, base propre). Dossier interne nettoyé (versions-writers, lecteurs-temoins, rewrite, selection, synthese-lecteurs, gatekeeper-verdict, relecture-rewrite supprimés de commit, mais présents _archive/). Conservé : README (frontmatter, version_active = v1), kanban, pitch, plan-histoire, briefs/, texte.md (canon), synthese-finale.md, _archive/.
- [x] **INDEX stories** mis à jour : 1 seule histoire canon (001). Refs vers supprimées nettoyées.
- [x] **Patterns 001 archivés** dans lecons-vivantes (P1-P7 confirmés sur 001, G1-G6 pièges documentés).
- [x] **Décisions PMO enregistrées** : 4 décisions Papa Yann finales → decisions.md avec raison + impact.

**Décisions prises (Papa Yann)** :
1. **Étape 9 panel 6 OK** — validation ✅ rewrite kimi-v2 par 6 lecteurs, 2 corrections appliquées et intégrées
2. **Suppression pure** — rm -rf ancien 001, 002, 004, 003-la-confidence, series/, fiches archive
3. **Renommage 003-v2 → 001** — réindex numérotation (prochaine = 005), base propre pour PROCESS 11 étapes stable
4. **Brainstorm prochains sujets** — différé à session suivante (user cuit)

**État au reboot :**
- **Bilan 001 FINAL** : 11 étapes complètes ✅, 8 writers, 6 témoins, 1 rewrite (kimi, v2 comité), GateKeeper PASS 24/24, panel 6 re-relecture ✅. Canon 540 mots. Patterns P1-P7 + G1-G6 migrés vers equipe/lecons-vivantes.md.
- **Backlog** : TEST-PROCESS-001 et TEST-PROCESS-003 à clore. ARCHI-006 (PMO procédure) à formalisé (Haiku peut le faire).
- **Structure** : 001-le-pont-casse/ seule histoire déployée. axes-histoires-en-stock.md conservé. _gabarit/ pour futures histoires (005+). Prochaine histoire 005 (numérotation continue).
- **SLA** : respect parfait (toutes validations Papa Yann < 3 jours). Pas de bloqués en attente.
- **Prochaine session** : brainstorm 005 (sujet + casting + brief Papa Yann), lancer étape 1 (pitch).

---

## 2026-05-08 — Lancement rewrite Kimi v1 minimaliste + v2 comité éditorial (post-reboot MCP)

**Objectif :** Étape 7 (rewrite) — auteur top-1 Kimi produit 2 versions (minimaliste + comité éditorial) pour étape 9 comparaison.

**Fait :**
- [x] kimi-rewrite-v1.md : minimaliste, 1 seule modif (« se tint » → « se tenait »), note d'intention concise, ~535 mots
- [x] kimi-rewrite-v2.md : comité éditorial, 2 intégrations sur 5 proposées (Clac additif + bracelet), 3 écartées avec raisons (écaille ralentirait, au revoir redondant, bras moulin dénature Wex)
- [x] kanban.md 003-v2 mis à jour : étape 7 = ✅ TERMINÉ, 2 livrables en attente étape 9 (panel 6 lecteurs)
- [x] lecons-vivantes.md enrichi : pattern P7 ajouté (rewrite comité = sélection légère, pas injonction)

**Décisions implicites :**
- **Philosophie rewrite double** : v1 minimaliste (tutoriel rewrite fidèle) + v2 comité (intégration légère) coexistent → étape 9 tranché empiriquement par panel 6
- **Pattern P7 figé** : rewrite top-1 ne saute que 2-3 idées comité max par session, arguments obligatoires pour chaque refus

**État au reboot :**
- Étape 7 livrée ✅ (kimi-rewrite-v1.md + kimi-rewrite-v2.md)
- Étape 8 (GateKeeper) → à lancer quand Directeur signale prêt
- Étape 9 (Re-relecture, panel 6) → coordonner relecture parallèle 2 versions, synthèse avant étape 10
- Kanban exact, briefs itérés 3×, writers 10 (4 LLM × 2 runs + Claude × 2), lecteurs 6, rewrite 2 versions
- SLA : Directeur peut lancer étape 8 GateKeeper dès maintenant (pas d'attente auteur)
- Question ouverte : v1 seule canon vs v2 seule canon vs les deux relues (étape 9 arbitre)

---

## 2026-05-08 — Refonte process 9→11 étapes + procédure PMO

**Objectif :** Formaliser la procédure PMO (classification input, routing, remise main) et valider les nouvelles étapes process refondues.

**Fait :**
- [x] `equipe/PROCESS.md` mis à jour (9→11 étapes, étape 9 panel 20 lecteurs, étape 10 re-relecture, étape 11 canon)
- [x] `equipe/lecons-vivantes.md` créé (document vivant remplaçant ultime_debrief.md figé, patterns P1-P6, pièges G1-G6, axes 1-6, signal genre × accompagnement)
- [x] `equipe/onomatopees-cross-culture.md` créé (catalogue cross-culturel, règle 0 ou 1/histoire, pivots 🟢 listés, sources deepsearch)
- [x] 2 templates briefs writers créés (`brief-writer-libre.template.md` + `brief-writer-guide.template.md`)
- [x] `stories/003-le-pont-casse-v2/kanban.md` mis à jour (étape 5 lecteurs + synthèse, prêt pour étape 6 sélection)
- [x] `pmo/decisions.md` : 2 entrées 2026-05-08 ajoutées (étape 9 panel 20 + procédure PMO systématique)

**Décisions prises (Papa Yann)** :
1. Étape 9 re-relecture = panel complet 20 lecteurs (pas 3-4 ciblés)
2. PMO déclenché **systématiquement** sur chaque input narration (classification live + routing)
3. Remise main = checklist PMO 8 points (décisions, leçons, todos, questions, index, kanban, références, état reboot)

**État au reboot :**
- **Tickets actifs** : 3 en cours (TEST-PROCESS-001 + TEST-PROCESS-003 + STORY-002-V2)
- **Blocages** : aucun identifié — 003-v2 en étape 5 (synthèse lecteurs produite), prête pour étape 6 sélection
- **Structure** : PROCESS figé 11 étapes, 2 docs patterns vivants créés, templates writers complets
- **Avant prochain tour** : Directeur peut lancer étape 6 sélection 003-v2 quand Papa Yann valide (SLA auteur 3j à partir de 2026-05-07)
- **Index à vérifier** : `equipe/INDEX.md` et `cartographie-domaines.md` pointent-elles vers les 2 nouveaux docs ? (à scanner rapidement)

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
- [x] **Renommage Papa Yann → Papa Yann** dans 24 fichiers
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
