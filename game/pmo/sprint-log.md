# Sprint Log — PMO Game

> Journal de bord des sessions.
> **En cas de reboot :** lire la dernière entrée (haut du fichier), section "État au reboot".
> Les entrées les plus récentes sont en haut.
>
> Équivalent côté Narration : [`../../studio/narration/pmo/sprint-log.md`](../../studio/narration/pmo/sprint-log.md).
> Créé 2026-05-13 (extraction depuis `memory/state.md` lors de l'harmonisation Game ↔ Narration).

---

## 2026-06-01 — [DINOS] Filtrage 60→50 + Reclassement scientifique = Phase figée EP-039

**Owner** : Papa Yann

**Décision gravée** :
1. **Filtrage 10 dinos redondants** : Maiasaura (homonyme) + 9 cératopsiens quasi-identiques
2. **Apatosaure bi-nom** : « Apatosaure (Brontosaure) »
3. **Reclassement scientifique** : Suchomimus/Baryonyx → trex · Dimétrodon → volant
4. **Hiérarchie 1 niveau** : 8 familles simple (trex, cou_long, arme, cornu, bec, raptor, volant, bizarre)
5. **Textes explic 3-pôles validés** : Grok/Kimi/DeepSeek 2026-06-01
6. **UI enrichie** : DINO_FAMILLES_INTRO + bouton 🔊 "C'est quoi ce nom ?"
7. **RÈGLE FIGÉE** : zéro Wex/univers dans encyclopédie (factuel seul)

**État** : 50 dinos finalisées, prêtes TTS production (49 restants après Parasaurolophus).

**Fichiers touchés** :
- `game/web/js/dinos-data.js` : 50 fiches
- `game/web/dev-dinos.html` : UI familles + INTRO
- `pmo/decisions.md` : entrée figée
- `pmo/INVARIANTS.md` : "50 fiches finale"

**Prochaine étape** : TTS audio DUO 49 fiches (processus 3-passes validé 2026-05-17/30).

---

## Prochaine action (priorité courante)

**⏳ Au reboot 2026-05-31** :

1. **🔥 URGENTE** — **EP-035 + EP-036** (header compact + encoding) : signalé critique par Papa Yann 2026-05-14 (traîne 14j). Assigner à `game-dev` ou `game-mj-pmo` + deadline fin semaine. User-facing, UX debt.

2. **🔥 URGENTE** — **EP-038 Playwright** (T-380/381/382/383/384) : pilote livré 2026-05-16, plus gros levier optimisation (60% reduction commits). Généraliser 1 spec/MJ actif en parallèle EP-035/036.

3. **📅 HAUTE** — **EP-037** (figeage 20 MJ restants) : rétro-fit system figeage (gravé 2026-05-15 mj-21 only). Inclure comme tasks T-xxx annexe à EP-038 ou batch script.

4. **📌 Pédago** — **EP-039 progression** : 39 dinos restants en TTS live navigateur (reste d'année). Pas urgent.

---

## 2026-05-30 — [DINOS] Parasaurolophus audio V2 complet — PROCESS pédagogique 3-passes validé

**Owner** : Papa Yann + game-conseiller + narration-conseiller + panel lecteur enfants 2 (Léo 8/10, Jade 9/10 émotion)

**Livré** (committée + pushée master, commit 6be120ed) :
1. **Parasaurolophus V2 refondu** : 4 blocs + ping-pong étymologique avec Wex co-chercheur
   - **Bloc A (Son histoire)** : **ping-pong Wex** (Wex pose question, Narrateur décompose racines). Pa-ra-sau-ro-lo-phus : saurus=lézard, lophus=crête creuse. "Para" abstrait retiré → 2 racines imagées uniquement
   - Bloc B (Sa taille) : conservé
   - Bloc C (Sa vie) : chanteur du troupeau (crête = protection vocale)
   - Bloc D (Truc fou) : "savants"→"scientifiques" + "machine chanta pour première fois" + "premier dino-musicien"
   - **Fin dé-doublée** : Narrateur « il chante encore » + Wex « pour toujours »
2. **Panel enfants 2-personnes validation** : Léo (8) 8/10 émotion (touchant, pas triste), Jade (9) 10/10 (fin tendre captée). Friction mineure : Bloc A étymologie trop lourde oral → RESOLUE ping-pong/syllabique
3. **4 blocs MP3 + récap générés** ElevenLabs text-to-dialogue DUO (~2389 car., budget restant 20498/122867, reset 11 juin)
4. **Validation 3-passes figée** :
   - Pass 1 (game-conseiller) : étymo fact-check + narratif OK ✅
   - Pass 2 (narration-conseiller) : voice-meta v3 tags OK ✅
   - Pass 3 (panel enfants) : pédago engagement OK ✅
   - Workflow : corrections appliquées → 1 re-gen audio → testée avant push

**Décisions figées** :
- Ping-pong Wex = pattern écriture audio DUO efficace (co-chercheur explicite)
- Découpage syllabique Pa-ra-sau-ro-lo-phus = lecture enfant-friendly
- Fin dé-doublée = pattern clôture émotion

**Leçons** :
- **L-060** : Ping-pong Wex comme pattern d'écriture audio DUO — co-chercheur explicite active attention enfant + simplifie étymologie complexe
- **L-061** : Panel enfants 2-3 personnes rapide = suffisant pour validation pédago/émotion (économise temps sans perte qualité)

**État au reboot** :
- ✅ EP-039 CLÔTURE PILOTE — Parasaurolophus audio V2 déployée, PROCESS pédagogique 3-passes validé
- 22/60 dinos en audio EL premium (11 originaux + 10 cornes + Parasaurolophus)
- 39 dinos restants : TTS live navigateur (bonne qualité, pas bloquant, itération future si demande)
- PROCESS RÉUTILISABLE : ping-pong Wex + panel 2-3 enfants pour tous les blocs audio futurs

---

## 2026-05-17 — [DINOS] Audio V1 refondue 4-blocs + audio top 11 + process validation 3-passes
⏰ CLÔTURE EP-039 (pilote) — encyclopédie complète + audio DUO intégré.

**Owner** : Papa Yann + game-conseiller + narration-conseiller + panel lecteur (7 enfants, moy 7.5-8.5/10)

**Livré** (committée + pushée master, commits c74db61d + d33dac3b) :
1. **50 scripts audio réécrits 4-blocs** : boucle fermée (question Wex → réponse Narrateur obligatoire)
   - **Bloc A (Son histoire)** : **mécanique racines** (décompose nom : "tri=trois, cérat=corne, ops=face → face à trois cornes"), étymologie fact-checkée
   - Bloc B (Sa taille) : 3 comparateurs Max validés (bus/dino/objet familier)
   - Bloc C (Sa vie de dino) : régime + comportement
   - Bloc D (Le truc fou) : fun-fact unique
   - **Recap audio** (button "Écoute tout") : 4 blocs concaténés + loudnorm ffmpeg
2. **Validation contenu 3-passes figée** :
   - Pass 1 : game-conseiller (étymo fact-check + narratif)
   - Pass 2 : narration-conseiller (voix-meta check + tags v3 audios)
   - Pass 3 : panel lecteur enfants (pédago + engagement)
   - Corrections appliquées, stats qualité gravées dans `_ETYMO-RACINES-50.md`
3. **Audio top 11 généré** (ElevenLabs text-to-dialogue DUO) : 44 MP3 (11 dinos × 4 blocs)
   - Tritri (Tricératops) = préféré Max + 10 stars (Ankylosaure, Stégosaure, Vélociraptor, T-Rex, Diplodocus, Parasaurolophus, Iguanodon, Spinosaure, Ptérodactyle, Compsognathus)
   - 39 autres dinos = TTS live navigateur (fallback)
4. **Charte dino FIGÉE** : noms latin/grec gardés · prédation vraie OK (os qui craquent) · PAS gore · PAS cannibalisme (Coelophysis corrigé)

**Décisions figées** :
- Structure audio = 4 blocs (était 6) + recap
- Process validation = 3 passes (game-conseiller + narration-conseiller + panel lecteur) AVANT prod audio
- Mécanique racines en Bloc A = source pédago étymologie
- Tritri = surnom affectueux Tricératops (Max le préfère)

**Leçons** :
- **L-058** : Audio multi-voix = figeage texte amont obligatoire (coût itération ElevenLabs)
- **L-059** : Découpage agents parallèles efficace (9-11 agents) → RE-GREP anti-patterns + count blocs après (risque oubli)

**État au reboot** :
- ✅ EP-039 **CLÔTURÉ** — encyclopédie V1 avec audio top 11 déployée
- Dinos testables par Max 2026-05-17
- Audio roadmap pour 39 autres dinos : TTS live pour 2026-05-17, DUO complétude = future itération (non bloquant)

---

## 2026-05-16 — [PMO] REX MJ-21 — 33 commits, 5 causes racines, leçons process

**Owner** : game-pmo (signal utilisateur : "REX grave les leçons")

**Trigger** : Papa Yann demande REX sur MJ-21 "Peins les bus!" — 33 commits (≈40 allers-retours) en 3 jours. Trouve ça énorme, veut conclusions pour ne plus reproduire.

**Fait** :
- ✅ Création `game/pmo/PIPELINE-MEMORY-MJ.md` — entrée datée REX, 5 causes racines, propositions process, mesures
- ✅ Création L-032 à L-037 (6 leçons) dans `backlog.md`
- ✅ Création EP-038 (Harnais jsdom) — priorité 🔥 URGENTE, plus gros levier (~20 commits/chantier)
- ✅ Extraction 4 axes optimisation : A. Harnais headless, B. Règle 2-strikes cause-racine, C. Design amont + figeage (L-055), D. Figeage (✅ déjà déployé)

**5 causes racines identifiées** :
1. Harnais test humain (PP) = tueur vélocité #1 → EP-038 jsdom
2. Chasse symptômes au lieu causes (7 commits mixer) → 2-strikes rule (pattern, pas de L-xxx assigné)
3. Bus en haut/bas : régression sans figeage → L-050 (figeage ok)
4. Tube vide : clipPath id dupliqué → L-052 (SVG id-check)
5. Layout refait 5× : pas design amont → L-055 (design amont obligatoire)

**Bugs pédago tardifs** : 3 (recette RGB, addCouleur, mécanique) → L-053/L-054.

**Potentiel optimisation** : ~20 commits (52% réduction si EP-038+process appliqués).

**État au reboot** :
- Leçons gravées pour prochains MJ
- Système figeage ✅ (déjà live, mj-21 protégé)
- Design amont proposé comme processus (pas exécuté, attente appel next MJ)
- Harnais jsdom = chantier T-380 à T-384 (priorisation haute)

---

## 2026-05-14 — [MJ GABARIT] Header compact + fix encoding emojis (tous les MJ)

**Owner** : Papa Yann (signal utilisateur)
**Trigger** : Papa Yann signale 2 problèmes systématiques à travers TOUS les mini-jeux HTML :
1. Caractères foireux / encoding cassé (textes + emojis)
2. Bandeau titre + message mise à jour + bouton retour au menu **trop gros** — veut gabarit compacté comme mj-20 (commit e1bcd42a)

**Fait** :
- ✅ Classification : DÉCISION (gabarit canonique) + TODO (encoding + gabarit) + LEÇON (pattern unifié)
- ✅ Création EP-035 (fix encoding emojis)
- ✅ Création EP-036 (appliquer gabarit header compact mj-20 à tous les MJ)
- ✅ Création L-033 (gabarit header canonique unifié = règle non-négociable)

**État au reboot** :
- Backlog mises à jour (EP-035, EP-036, L-033)
- Décision figée : header unifié + compact = obligation futurs MJ + retro-fit existants

---

## 2026-05-13 — [ARCHITECTURE CLAUDE] Refonte 3 niveaux + path-scoped rules

**Owner** : refonte doc Anthropic (main agent + validation Papa Yann)
**Trigger** : consolidation structure CLAUDE.md après harmonisation Game↔Narration phase précédente.

**Fait** :
- ✅ Refonte CLAUDE.md racine : 219 → 107 lignes (synopsis pôles + commandes trans)
- ✅ Création `game/CLAUDE.md` (113 l) : PMO+Archiviste auto + règles d'or LimeZu + équipe agents + pointeurs
- ✅ Création `.claude/rules/tile-tools.md` (80 l) : paths: `game/web/tile-tools/**`, `game/web/tools/**` — mnémonique 2/8/14/15 + Sidewalk_1 mapping + vocab.py source unique + brique avant macro
- ✅ Création `.claude/rules/mini-jeux.md` (103 l) : paths: `game/web/mj-*.html`, `game/web/index.html` — UX zéro-pénalité, feedback <200ms, zones tap 80px, busSVG obligatoire, couleurs IDFM LIGNES
- ✅ Création `.claude/rules/` 4 fichiers Narration symétriques : stories-process, personnages, univers, audio (183 l total)
- ✅ Hook UserPromptSubmit : auto-rappel `/game-pmo` ou `/narration-pmo` si signal détecté

**Décisions prises** : voir `decisions.md` § "Refonte archi CLAUDE.md 3 niveaux".

**État au reboot** :
- Archi CLAUDE.md alignée doc Anthropic officielle (nested + path-scoped)
- Zéro coût contexte tant que fichier sous `game/` ou `studio/narration/` non touché
- Source de vérité 1/N préservée (INVARIANTS ← rules ← skills)
- Commandes `/game-pmo-audit` et `/narration-pmo-audit` préfixées automatiquement en signal détection

---

## 2026-05-13 — [PMO+ARCHIVISTE] Harmonisation Game ↔ Narration (mode militaire full)

**Owner** : game-pmo (avec création game-archiviste) + propagation main agent.
**Trigger** : auteur demande symétrie pôle Game avec pôle Narration (refondu 2026-05-12).

**Fait** :
- ✅ Création `game/pmo/` dossier dédié (5 fichiers : INVARIANTS, audit-trail, decisions, sprint-log [ce fichier], backlog)
- ✅ Création `game-archiviste` agent (Haiku, AUTO signal structure)
- ✅ MAJ `game-pmo.md` (binôme avec archiviste)
- ✅ Préfixage commandes strict net : `/narration-pmo-audit`, `/narration-archiviste-audit`, `/game-pmo-audit`, `/game-archiviste-audit`
- ✅ Refonte `game/INDEX.md` + création `game/EQUIPE.md`
- ✅ MAJ `CLAUDE.md` racine (section Game enrichie)
- ✅ Migration `memory/state.md` réduit aux sources statiques
- ✅ Migration `tasks/BACKLOG.md` → `pmo/backlog.md`

**Décisions prises** : voir `decisions.md` entrée 2026-05-13.

**État au reboot** :
- Pôle JEU symétrique avec pôle Narration : PMO + Archiviste proactifs (binôme FOND/FORME) + INVARIANTS + audit-trail
- Toutes les commandes sont préfixées par pôle : `<pôle>-<agent>-<action>`
- 5 trous critiques côté Game fermés
- 6 questions self-challenge Narration gravées en queue dans `studio/narration/pmo/decisions.md`

---

## 2026-05-12 — Session 2 phases (matin route v3 + après-midi pivot brique-avant-macro)

### Phase 1 matin — Pipeline route v3 validé

**Fait** :
- ✅ 3 recettes route validées par pipeline ET visuellement par Papa Yann :
  - `test_route_h_7rows_v3.py` (14×7 route H 3-chaussées)
  - `test_route_v_7cols_v3.py` (7×14 route V 3-chaussées)
  - `test_papa_route_large.py` (17×9 compo Papa référence)
- ⚠️ 4 recettes virages 13×13 validées par pipeline (9/10 reviewer) mais **invalidées visuellement** par Papa Yann l'après-midi
- ✅ `builders.py` v3 : `route_h()/route_v()` macrifiées, alternance `_VOIE_POOL` cycle 3, anti-mono activé
- ✅ `vocab.py` source unique constantes tiles (validation auto)
- ✅ `vocab-playground.html` synchronisé

### Phase 2 après-midi — Pivot brique-avant-macro

**Découverte critique** : pipeline simplifier→designer→reviewer a validé des recettes virages techniquement correctes mais visuellement ratées. Cause : `vocab.py` contenait des constantes inventées (`COIN_INT_SE = sw_1` etc.) jamais validées visuellement.

**Refonte complète** :
- ✅ `brick-explorer.html` créé : page interactive pour valider chaque tile candidate isolée (mini-render 3×3, vote courbe/point/autre/rejeté)
- ✅ Mapping LimeZu SW_1 ↔ SW_2-6 figé : 10 positions (#11-#20) décalées, table figée dans `styles.py`
- ✅ `styles.py` créé : module 6 styles (blanc/beige/gris_bleu/jaune/bleu/gris) + résolution auto SW_1
- ✅ Méthode "planche comparative" validée : `scripts/compare_tilesets*.py` (5 scripts)
- ✅ `tile-picker.html` refondu : 9811 tiles (vs 3525, 36% → 100% couverture)
- ✅ `build_tile_picker_data.py` : scan PIL lit vraies dimensions (3040 unitaires + 6473 sprites + 298 planches)
- ✅ `test_ref_papa_4virages.py` : RÉFÉRENCE CANONIQUE virages 14×14 (source de vérité reconstruction future)

**Décisions prises** : voir `decisions.md` § "Pivot Brique-avant-Macro" + "Mapping LimeZu SW_1" + "vocab.py source unique".

**Leçons gravées (game-tile-pmo)** :
- LESSONS.md : Corrections 9-12 (4 leçons)
- PIPELINE-MEMORY.md : F-008/F-009 (frictions), P-008/P-009/P-010 (patterns)
- backlog.md : L-029 à L-032 + EP-VIRAGES-V2 à créer

**État au reboot** :
- 3 recettes route OK, 4 virages invalidés (à refaire post-pivot)
- EP-VOCAB clôturé (phases 1-2 complètes, phases 3-5 annulées)
- EP-VIRAGES-V2 à créer pour refonte depuis `test_ref_papa_4virages.py`

---

## 2026-05-11 (suite) — EP-VOCAB phases 1-2 + pivot

**Contexte** : Papa Yann cadre l'epic "ingénierie tile-tools" pour résoudre cause racine (galère sur "route droite propre", briefs complexes impossibles). Plein pouvoir donné.

**Livré** (commit `feat(tile-tools): EP-VOCAB phases 1+2`) :
- ✅ `game/web/tile-tools/vocab.py` : 46 constantes nommées français, validation auto au boot
- ✅ `game/web/tile-tools/builders.py` : macros `route_h()` + `route_v()` testées + **SHA256 byte-identique** aux PNG existants
- ✅ `game/web/tile-tools/RESEARCH-INSPIRATIONS.md` : 60+ liens capitalisés (LDtk, WFC, DualTilemap, Bitmask, Phaser, LimeZu)
- ✅ Fix en passant : `test_voie_bus_v6.py` (`_15` SALE → `_8` PROPRE, oubli correction 5)
- ✅ 2 recettes v2 exemple : `test_route_h_5rows_v2.py` + `test_route_v_5cols_v2.py`

**🔀 Pivot Papa Yann (fin de session, validé)** :
- Découverte : coder des macros (`virage`, `carrefour`…) = **inventer comment composer**. Or les recettes actuelles ne plaisent pas visuellement à Papa Yann → on reproduirait le défaut.
- Nouvelle direction : **collecter des références visuelles** (screenshots LimeZu officiel, maps Pokemon, samples LDtk) → reproduire fidèlement → la "macro" devient une recette de référence validée.
- EP-VOCAB phases 3-5 (macros virages/carrefour/T/refactor 13 recettes) **ANNULÉES**.
- **EP-REFS ajouté au BACKLOG** (banque refs visuelles, à lancer en session dédiée).

**Nettoyage effectué (clôture)** :
- ✅ `cartography.json` marqué **DEPRECATED**
- ✅ `game/web/tools/tile-library.html` + `tile-library-v2.html` → archivés
- ✅ `__pycache__/` purgés (gitignore créé)
- ✅ `game/web/tile-tools/_archive/` créé avec inventaire candidats futurs
- ⏳ Scripts debug + recettes passages piétons : pas touchés (Q-ouvertes #3 et #4 dans decisions.md)

**Vérifications passées** :
- EP-022 MJ-04 "boucle infinie" : faux bug — code conforme depuis (compteur 10 tours + showEndScreen + playEndSound présents)
- mj-pose-tiles `_14`/`_15` SALE : corrigé par swap vers `_2`/`_8` propres (L-013 respectée)
- mj-12 scope : tranché Papa Yann — dashboard sonore (L-024)

---

## 2026-05-11 (architecture équipe) — Refonte hiérarchique pôle JEU

**Décision** : architecture 3 sous-domaines avec PMO niveau pôle + 2 sous-PMO enfants + Wexworld Phase 2.

**Créé** :
- `game-mj-pmo` (Haiku, sous-spé mini-jeux)
- `game-conseiller` (Opus, transverse 3 sous-domaines)
- `game-mj-reviewer` (Haiku, validateur 5 sections)

**Détails** : voir `decisions.md` § "Architecture équipe pôle JEU".

---

## 2026-05-08 → 2026-05-10 — EP-TILES + EP-MJPOSE

**Livré** :
- ✅ Skill `~/.claude/skills/maxplay-tiles/` : SKILL.md (566 l) + LESSONS.md (30+ entrées)
- ✅ Agent dédié `.claude/agents/game-tile-pmo.md` (Haiku)
- ✅ `game/web/tools/` : hub + tile-picker (matrice drag&drop, 5 catégories, multi-tiles vraies dimensions, `?recipe=X.py`), tile-library-v3, mockups-routes (6 patterns échelle uniforme + bouton 🎨 Éditer)
- ✅ `mj-pose-tiles.html` : 🦺🚧 mini-jeu kids (8×8 tactile, 5 catégories, bouton Lisser)
- ✅ 13 recettes Python validées + 13 PNG (routes, virages, carrefour, rond-point, quartier, parking, voie bus, passages piétons)
- ✅ Cartographie LimeZu corrigée — L-013 à L-018
- ✅ Workflow Propose → Édite → Apprend opérationnel

---

## 2026-05-03 — EP variés (vocab + Duolingo + multi-touch)

**Livré** :
- ✅ EP-021 vocab : MJ-08 "Au centre bus" / MJ-17 "Le garage" partout
- ✅ EP-027 MJ-20 : progression Duolingo par langue + paliers + localStorage
- ✅ EP-029 MJ-19 : 50-80 bus (avec doublons) au lieu de 20-30
- ✅ EP-031 MJ-15 : niveau D (roues colorées) + niveau E (combo couleur+numéro)
- ✅ EP-032 MJ-09 : multi-touch 2 doigts (Pointer Events + Map)
- ✅ EP-033 : TTS annonce titre désactivé (laggait le démarrage)
