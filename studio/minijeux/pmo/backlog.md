# Backlog — Pôle JEU

> Source de vérité tickets actifs pôle JEU. Survit aux reboots de session.
> **Déplacé 2026-05-13** depuis `game/tasks/BACKLOG.md` vers `game/pmo/backlog.md` (harmonisation Game ↔ Narration).
> Équivalent côté Narration : [`../../studio/narration/pmo/backlog.md`](../../narration/pmo/backlog.md).
>
> IDs stables : `EP-001` épics, `T-001` tâches, `D-001` décisions, `L-001` leçons.
> Statuts : `[ ]` à faire · `[~]` en cours · `[x]` terminé · `[!]` bloqué · `[?]` à décider

---

## Leçons du pôle MJ (L-xxx)

**Convention de numérotation** (fixée 2026-05-21) :
- **L-000..L-049** : leçons tile (réservées pour skill `maxplay-tiles/LESSONS.md`)
- **L-050+** : leçons mini-jeux/MJ (process, REX, patterns)

Synthèse REX MJ-21 « Peins les bus! » — 33 commits, 5 causes racines (2026-05-16). Détail complet : [`PIPELINE-MEMORY-MJ.md`](PIPELINE-MEMORY-MJ.md).

### L-050 – Figeage par mini-jeu = protection régression
**Constat** : MJ-21 saga "bus en haut/bas" — 10 répétitions Papa Yann sans enregistrement → régression structurelle à chaque `/compact`. **Cause** : aucune décision figée dans code source, pas de priorité mécanique.
**Fix** : système figeage (commit 565f98cb) — `studio/minijeux/docs/jeux/figees/mj-XX.md` + hook PreToolUse `figees-injector.ps1` + game-mj-reviewer Section 0. État : ✅ déployé, mj-21 protégé.

### L-051 – Gabarit header compact = norme obligatoire
**Contexte** : Papa Yann signale bandeau titre trop gros dans **tous** les MJ HTML. Pattern correct = mj-20 (commit e1bcd42a).
**Action** : décision 2026-05-14 gravée — EP-036 rétro-fit tous les MJ + EP-035 encoding UTF-8 unifié.

### L-052 – SVG id uniqueness = leçon visuelle
**Saga MJ-21** : bug "tube vide à la victoire" — 4 commits avant diagnostic. Root cause : `<clipPath id="tc">` dupliqué entre tube vrai + clone animation → `url(#tc)` résolvait vers le mauvais clipPath → remplissage clone invisible.
**Leçon** : SVG id duplicate = bug silencieux (zéro erreur console) — **check obligatoire si glitch post-animation**. Outils : `grep id= <file>` ou inspection DOM navigateur.

### L-053 – Recettes couleur = validation RGB amont
**Pédago tardive MJ-21** : "vert clair" contre-intuitif (jaune:1 bleu:3). Fix : jaune:1 bleu:1 blanc:1.
**Règle** : chaque recette RGB → **préview PNG amont** avant déploiement pédago. Outils : Canvas simple ou Python PIL.

### L-054 – Mutations structure tube = unitaires obligatoires
**Bug MJ-21** : `addCouleur()` après mix vidait le tube entier — oubli réinitialisation `doses`.
**Action** : L-054 → unitaires obligatoires sur mutation structure tube (ajout/reset/mix/blend). Couvrir les cas mixtes.

### L-055 – Design amont + figeage = obligatoire multi-mécanique
**Pattern MJ-21** : layout codé 5 fois en parallèle conversation (5 commits refactor). Root cause : pas de screen mockup validé par Papa Yann AVANT dev.
**Processus** : brève → **appel `game-conseiller` (Opus) 30 min** → layout proposé + mécanique + pédago → validation Papa Yann → figeage git (`studio/minijeux/docs/jeux/figees/mj-XX.md`) → dev contre design figé. Bénéfice : 4–5 commits layout évités.

### L-057 – Éditions multiples = risque suppression fonctions appelées ailleurs
**Dinos (2026-05-16)** : bug critique `showFiche is not defined` (ReferenceError l.786) — fonction supprimée lors édition antérieure de dinos-data.js, empêchait ouverture TOUTE fiche.
**Leçon** : avant refonte ou suppression massive, mapper toutes les FONCTIONS APPELÉES vs DÉFINIES (grep ou AST) — valider aucune appelante orpheline. Outil : `grep -rn "showFiche" .` avant commit.

### L-058 – Audio multi-voix = figeage texte amont obligatoire
**Dinos audio (2026-05-17)** : chantier DUO Narrateur H + Wex sur 50 fiches, coût itération ElevenLabs important (loudness + timing + clarté entre voix = 2-3 tries min).
**Processus figé** : figeage script (3-passes validation) + challenge Papa Yann AVANT envoi ElevenLabs. Validation 1 fiche test (Tricératops) avant généraliser (49 autres). Application réussie : 44 MP3 top 11 en 1 pass, zéro itération post-prod.

### L-059 – Découpage agents parallèles efficace → RE-GREP anti-patterns après
**Dinos (2026-05-17)** : 9-11 agents parallèles (étymo fact-check, game-conseiller, narration-conseiller, panel lecteur) = efficace pour grosse tâche d'écriture/correction. **Piège** : un agent oublie Gallimimus, un autre n'écrase pas le bon Bloc Coelophysis (éditions en conflit).
**Leçon** : après découpage agents parallèles, toujours RE-GREP anti-patterns + count blocs/dinos avant merge. Outil : `grep -c "Bloc A" _ETYMO-RACINES-50.md` → doit = 50, `grep "Gallimimus"` → doit être présent.

### L-060 – Ping-pong Wex = pattern écriture audio DUO efficace
**Dinos (2026-05-30)** : Parasaurolophus V2 Bloc A (étymologie Pa-ra-sau-ro-lo-phus). V1 lourd oral → pivot ping-pong (Wex pose question, Narrateur décompose racines). **Résultat** : attention enfant captée, étymologie vivante (dialogue vs exposé), Wex participe au mystère dino-musicien. Réutilisable : tout bloc complexe (étymologie, concept sci, histoire) → co-chercheur explicite active pédago.

### L-061 – Panel enfants 2-3 personnes = validation pédago/émotion rapide
**Dinos (2026-05-30)** : itération Parasaurolophus V2. Crainte panel 7 enfants lourd. Test : Léo (8/10) + Jade (10/10 fin tendre captée). Friction Bloc A résolue ping-pong. **ROI** : 2-3 enfants âge cible = feedback pédagogiquement actionnable sans perte qualité, 15 min vs 90 min. Pattern solide pour validations futures.

### L-062 – Filtrage scientifique (homonymes + quasi-doublons) = lisibilité enfant max
**Dinos (2026-06-01)** : 60→50 fiches. 10 retirés : Maiasaura (sonne "Mosasaure"), 9 cératopsiens quasi-identiques (Kosmocératops, Pachyrhinosaure, Psittacosaure, etc.). **Leçon** : encyclopédie dense < lisibilité enfant. Pas besoin 9 cornus au talon quasi-pareils. Filtrage validé Papa Yann = qualité > quantité.

### L-063 – Reclassement scientifique (théropodes terrestres vs marins) = validité + clarté
**Dinos (2026-06-01)** : Suchomimus/Baryonyx (terr terrestres, cousins Spino) passent volant → trex. Dimétrodon (pas vraiment dino) passe bizarre → volant. **Leçon** : arborescence 1-niveau (pas Saurischien) + classification réelle > affichage = pédago honnête.

### L-064 – Apatosaure bi-nom (Apatosaure/Brontosaure) = honnêteté étymologie
**Dinos (2026-06-01)** : 2 noms historiques pour 1 dinosaure. Plutôt que choisir, expliciter ("les savants l'appelaient Brontosaure, maintenant c'est Apatosaure"). **Leçon** : science c'est corriger. Enfants 3.5-4 ans acceptent "on a changé d'avis" si clair.

---

## Épics

---

## EP-039 – Narration audio DUO Narrateur H + Wex sur encyclopédie Dinos

**Statut** : `[~]` **CLÔTURE PILOTE 2026-05-30** — Parasaurolophus V2 audio déployée, PROCESS 3-passes validé

**Priorité** : 🟡 **MOYENNE** — enrichissement pédago post-déploiement MJ dinos (progression continue)

**Contexte** : MJ encyclopédie dinos (mj-dinos) déployé avec 60 fiches. Audio narration riche = profondeur pédago. Stratégie : duo Narrateur H (exposition) + Wex (co-chercheur, questions catalyseur).

**Pilote délivré (2026-05-30)** :
- ✅ **Parasaurolophus V2** : 4 blocs + ping-pong Wex + fin dé-doublée
- ✅ **Validation 3-passes** : game-conseiller (étymo/narratif) + narration-conseiller (voix v3) + panel enfants 2 (Léo+Jade, 8/10-10/10)
- ✅ **4 MP3 DUO** : générés ElevenLabs text-to-dialogue, commit 6be120ed
- ✅ **PROCESS RÉUTILISABLE** : L-060 (ping-pong Wex pattern) + L-061 (panel 2-3 enfants rapide)

**Phase figée (2026-06-01)** :
- ✅ **50 dinos finale** : filtrage 60→50 (scientifique + homonymes), reclassement (théropodes, marins), Apatosaure bi-nom
- ✅ **8 familles hiérarchie 1-niveau** : trex, cou_long, arme, cornu, bec, raptor, volant, bizarre
- ✅ **Textes explic validés** : 3-pôles Grok/Kimi/DeepSeek 2026-06-01
- ✅ **UI enrichie** : DINO_FAMILLES_INTRO + bouton 🔊 "C'est quoi ce nom ?"
- ✅ **RÈGLE FIGÉE** : zéro Wex/univers dans encyclopédie (factuel seul)
- ⏳ **Production TTS DUO** : 49 fiches (Parasaurolophus déjà en prod)

**État progression** :
- 22/60 dinos en audio EL premium (11 originaux + 10 cornes + Parasaurolophus)
- 39 dinos restants : TTS live navigateur (bonne qualité, pas bloquant, future itération)

**À faire (progression)** :
1. **T-405** : Généraliser ping-pong Wex à 5 fiches phares (Stégosaure, Vélociraptor, T-Rex, Ptérodactyle, Diplodocus) — valider process à plus grande échelle
2. **T-406** : (Optionnel) Compléter 39 dinos restants si temps/budget ElevenLabs — sinon TTS live suffisant
3. **T-407** : Documentation PROCESS audio DUO réutilisable dans skill `audio-direction-elevenlabs/`

**Leçons attachées** : L-060, L-061

**Impact** : `studio/dino/content/scripts-audio/parasaurolophus-V2.md`, `site/audio/dinos/parasaurolophus-*.mp3`, DEV-DINOS.html étendu.

**Dépendance** : Aucune — MJ dinos opérationnel, audio enrichissement progressif.

---

## EP-038 – Harnais de test headless mini-jeux (Playwright)

**Statut** : `[~]` **pilote livré 2026-05-16** — Papa Yann a validé (priorité sécurité : Playwright 1.60 + Chromium 148 à jour, pas de version épinglée vieille). `studio/minijeux/tests/` opérationnel, `mj-21.spec.mjs` VERT sur HEAD / ROUGE sur commit buggé `bf5f5cde` (preuve rétro faite). Reste : généraliser 1 spec/MJ actif (T-382→T-384).

**Priorité** : 🔥 **URGENTE** — plus gros levier optimisation (REX MJ-21 : ~60% des allers-retours évitables).

**Contexte** : MJ-21 a consommé ~20 commits du pattern « j'ai changé à l'aveugle, dis-moi si ça marche ». Cause racine : le main agent ne peut pas tester le mini-jeu lui-même → Papa Yann = harnais de test humain.

**Concept** : Playwright headless (Chromium réel), PAS jsdom. **jsdom rejeté par game-conseiller** : pas de rendu SVG ni `requestAnimationFrame` → n'aurait attrapé qu'1 des 3 sagas MJ-21 (le crash), pas « tube vide » (clipPath) ni « mixer » (timing) → faux sentiment de sécurité. Playwright déjà utilisé dans le projet (cf. T-240/T-254) + agent `e2e-runner` + skill `e2e-testing` réutilisables.

**Spec minimale par MJ** (~30-50 lignes, < 15s, ne PAS sur-construire) :
1. **Smoke** : page charge, `pageerror`/`console.error` ⇒ échec immédiat _(aurait tué la saga « Object.entries »)_
2. **Chemin nominal scripté** : simuler les clics de la partie gagnante → asserter l'élément de victoire **visible et non vide** (`boundingBox()` non nul + screenshot) _(aurait tué la saga « tube vide »)_
3. **1 assert par ligne 🔒** du fichier figé _(double filet avec le figeage)_

**À faire** :
1. **T-380** : `npm run mj:test mj-XX` (Playwright) — runner + 1 spec par MJ
2. **T-381** : Pilote rétro-actif `mj-21.spec.js` — doit être ROUGE sur les commits buggés, VERT sur HEAD (valide que le harnais aurait attrapé les 3 sagas)
3. **T-382** : Si pilote concluant → généraliser (1 spec/MJ actif)
4. **T-383** : game-dev lance `mj:test` AVANT chaque push (gate locale, pas de push si rouge)
5. **T-384** : game-mj-reviewer Section 6 « le spec couvre victoire + chaque ligne 🔒 ? »

**Bénéfice** : Papa Yann passe de _débogueur_ à _juge produit_. ~60% des allers-retours supprimés.

> ⚠️ **Note FORME (à traiter par game-archiviste)** : les leçons gravées L-032/L-034 par game-pmo entrent en collision de numérotation avec des L-032/L-034 tile préexistants (2026-05-12). Renuméroter les leçons MJ de ce REX.

**Impact** : `site/js/test-helper.js`, `studio/minijeux/tests/`, CI config.

---

## EP-035 – Fix encoding emojis tous les mini-jeux HTML

**Statut** : `[ ]` à faire

**Contexte** : Papa Yann signale caractères foireux / encoding cassé dans textes + emojis partout dans les MJ HTML.

**À faire** :
1. Audit tous les MJ : vérifier charset UTF-8 `<meta charset="utf-8">`
2. Vérifier tous les emojis encoded correctement (pas de fallback broken)
3. Centraliser encoding + créer gabarit HTML standard (voir EP-036)

**Impact** : 21 fichiers `site/mj-*.html` + `site/index.html`.

---

## EP-036 – Gabarit header compact unifié tous les mini-jeux (rétro-fit)

**Statut** : `[ ]` à faire

**Contexte** : Papa Yann signale bandeau titre trop gros dans tous les MJ. Commit e1bcd42a (mj-20 "header compact") montre le pattern : header une seule ligne, compact, petit.

**À faire** :
1. Figer gabarit `.hdr` canonique basé sur mj-20 fix (commit e1bcd42a)
2. Appliquer à tous les MJ existants : mj-01–06, 08–09, 11–21, max-adventure (20 fichiers cibles — mj-20 déjà bon)
3. Docs : ajouter gabarit obligatoire dans `memory/rules.md`

**Raison** : uniformité UX + économise espace pour contenu jeu (sessions 3-8 min zéro perte).

**Impact** : 21 fichiers `site/mj-*.html`, potentiellement `site/index.html` menu.

---

## EP-037 – Rétro-fit figeage 20 MJ restants (protection régression)

**Statut** : `[ ]` à faire

**Priorité** : 🔥 **URGENTE** (prévention, sécurité production)

**Contexte** : Système figeage gravé 2026-05-15 (commit 565f98cb) — `studio/minijeux/docs/jeux/figees/mj-XX.md` + hook PreToolUse `figees-injector.ps1` + game-mj-reviewer Section 0. Actuellement **seul mj-21 protégé**. Les 20 autres MJ actifs exposés à regressions type "bus en haut/bas" (REX MJ-21, 10 répétitions sans enregistrement).

**À faire** :
1. **Rétro-fit template** : copier `studio/minijeux/docs/jeux/figees/mj-21.md` → `studio/minijeux/docs/jeux/figees/mj-{01,04,05,06,08,09,11,12,13a,13b,13c,14,15,16,17,18,19,20,22,max-adventure}.md`
2. **Figer décisions visuelles/mécanique** pour chaque MJ (lire `site/mj-XX.html` + brève Papa Yann du moment du déploiement initial)
3. **Valider hook** : `figees-injector.ps1` doit charger `.md` pour chaque MJ avant édition
4. **Documentation** : mettre à jour `memory/rules.md` § figeage obligatoire (non-négociable pour tout nouveau MJ)

**Raison** : figeage = seule protection contre regressions silencieuses entre sessions (incidents 2026-05-13 à 2026-05-16). Coût : 30 min batch script ou 1h rétro-fit manuel.

**Impact** : `studio/minijeux/docs/jeux/figees/` (20 fichiers créés), hook config, documentation.

---

## EP-VOCAB – Module vocab.py + pivot "refs visuelles" pour pipeline tile-tools

**Statut** : `[x]` **clôturé 2026-05-12** (phases 1-2 terminées, phases 3-5 → EP-REFS)

### Cause racine (diagnostic 2026-05-11)

1. Conflit documentaire : `cartography.json` ("_14 propre H") contredit `LESSONS.md` correction 5 ("_14 SALE")
2. Info éparpillée sur 3 fichiers (cartography.json + LESSONS.md + recettes) → relecture complète à chaque session
3. Noms cryptiques (`Asphalt_1_Variation_2` vs `_14`) → mémorisation impossible
4. Pas de cartographie bâtiments/végétation/eau → briefs riches impossibles

### 🔀 PIVOT 2026-05-11 (session nuit, validé Papa Yann)

**Découverte** : coder des macros (`route_h`, `virage`, etc.) revient à **inventer comment composer une scène**. Or Papa Yann trouve les recettes existantes **pas OK visuellement** → coder un builder qui les recopie reproduit le défaut.

**Nouvelle approche** : ne pas inventer. **Collecter des références visuelles** (screenshots LimeZu officiel, maps Pokemon, samples LDtk, refs trouvées dans deepsearch) → reproduire fidèlement → la "macro" devient une recette de référence validée par Papa Yann, pas une fonction inventée.

### Livrables phase 1+2 (LIVRÉS ✅)

- **`site/tile-tools/vocab.py`** : 46 constantes nommées français (validation auto au boot), source UNIQUE pour les paths de tiles. Anti-erreur radical : plus de choix entre `_2` et `_14`.
- **`site/tile-tools/builders.py`** : `route_h()` + `route_v()` (les 2 seuls cas où "ligne droite trivial" ≠ invention). Tests assertions + **SHA256 byte-identique** aux PNG existants → macros validées techniquement.
- **`site/tile-tools/recipes/test_route_h_5rows_v2.py`** + `test_route_v_5cols_v2.py` : recettes exemple utilisant les macros.
- **Fix passing** : `test_voie_bus_v6.py` Variation_15 (sale) → Variation_8 (propre) — bug oublié lors correction 5.
- **`site/tile-tools/RESEARCH-INSPIRATIONS.md`** : 60+ liens capitalisés (LDtk, WFC, Dual Tilemap, bitmask, Phaser tutos, LimeZu officiel, AI tools).
- **`site/tile-tools/cartography.json`** : marqué DEPRECATED dans le JSON (champ `_DEPRECATED`).
- **`site/tools/_archive/`** : tile-library.html + tile-library-v2.html archivés (legacy, URLs cassées).
- **`site/tile-tools/_archive/`** : créé avec README pour futurs déplacements ciblés.

### Phases abandonnées (suite au pivot)

- **P3-5 ❌ ANNULÉES** : pas de macros inventées (virages/carrefour/T/passages/parking/refactor). Sera remplacé par EP-REFS (ci-dessous).
- **P6 ✅ partielle** : tile-library legacy archivé, cartography.json DEPRECATED. Reste à faire en session dédiée (scripts/render_debug.py, render_tmj.py, build_rondpoint_tmj.py, recolor_house.py, zoom_index.py — à vérifier dépendances avant suppression).
- **P7 ✅** : skill `maxplay-tiles` + agent `game-tile-designer` MAJ pour pointer vers vocab.py + nouvelle approche refs.
- **P8 ✅** : commit clôture + handoff PMO.

### Clés de succès rétroactives

✅ Conflit doc résolu (vocab.py = vérité, cartography.json deprecated)
✅ Mnémonique gravée (2/8 propre, 14/15 sale)
✅ Tests visuels SHA256 (route_h + route_v identiques au pixel près)
❌ Briefs complexes ("immeuble 3 étages, parc, rivière, pont") **PAS RÉSOLUS** → reportés en EP-REFS

---

## EP-REFS – Banque de références visuelles tile-tools (post-EP-VOCAB)

**Origine** : pivot Papa Yann 2026-05-11. Coder des macros = inventer ; on doit copier ce qui marche.

**Objectif** : constituer une **banque de PNG de référence** par concept (carrefour, virage, trottoir, immeuble, rivière, pont, parc, arrêt de bus) à reproduire fidèlement avec notre vocab.py.

**Sources possibles** (issues de RESEARCH-INSPIRATIONS.md) :
1. LimeZu officiel (itch.io screenshots du tileset)
2. LimeZu YouTube channel (tutos = ses propres maps)
3. LDtk samples
4. Pokemon Rouge/Bleu (via `peterhajas/pokemon_map_generator`)
5. opengameart LPC 4-Seasons
6. Photos Papa Yann (Google Maps Villejuif, photos terrain)

**Workflow proposé** :
1. Pour chaque concept manquant : collecter 2-3 refs → Papa Yann valide visuellement
2. Stocker dans `site/tile-tools/references/<concept>/ref-001.png` + `ref-001.md` (source URL, ce qui plaît)
3. Reproduire dans une recette utilisant `vocab.py`, itérer jusqu'à match visuel
4. La recette validée devient le "snippet" réutilisable

**Status** : `[ ]` non démarré (à lancer en session dédiée, idée option b proposée à Papa Yann 2026-05-11 nuit).

**Première recette cible probable** : un carrefour propre, parce que c'est le concept clé (Villejuif), et c'est celui où les recettes actuelles sont rejetées par Papa Yann.

---

## EP-041 – Renouvellement mini-jeux — lassitude bus, exploration piste thème dino

**Statut** : `[?]` **PISTE / EXPLORATION** — signalé par Papa Yann 2026-06-08 (session DINO)

**Priorité** : 🟠 **À ÉVALUER** — dépend retour Max sur prototype

**Contexte** : Max (4 ans) montre lassitude envers les mini-jeux bus actuels (thème répétitif, 23 jeux déployés depuis 2026-03). Piste : renouvellement thématique vers **dino** (Max adore les dinos, cf. encyclopédie 50 fiches + audio en cours, EP-039).

**Idées brutes (non figées)** :
1. **Mini-jeu tri-couleur dino** : regrouper dinos par couleur (silhouettes/SVG + ombres ou dégradés) — mécanique tri/glisser — rythme rapide (3-8 min)
2. **Quiz dino** : amélioration lecture phonétique (noms dinos) — associer fiche + nom audio — feedback positif
3. **Duel dino X vs Y** : comparer 2 dinos (plus gros/plus rapide/etc.) — apprentissage comparative + traits dino

**État données** : 
- Dino-data existant dans `site/js/dinos-data.js` (50 dinos finales, propriétés `color`, `png`, `taille`, `régime`)
- Nouveau dictionnaire racines future dans `studio/dino/content/data/racines.json` (non encore intégré à site/)

**Risque technique** : 
- Tri-couleur SVG/silhouette = **besoin asset visuel par dino** (silhouette + ombre ou dégradé) — pas encore inventorié ; à évaluer si possible partir de PNG existants en post-prod (silhouette dégradée)

**Classification** : 
- **Cross-pole JEU × DINO** — données DINO bien avancées (EP-039), mécaniques MJ = domaine JEU
- **Brique avant macro** : prototype tri-couleur avec 3-5 dinos d'abord, tester sur Max, valider l'engagement AVANT scaling

**À faire (si approuvé)** :
1. **T-408** : Conception rapide (15 min, game-conseiller) → écran mockup tri-couleur + règles claires
2. **T-409** : Prototype 1 MJ (mj-dino-tri-couleur) avec 5 dinos test + code tri simple (drag/drop ou boutons color-zone)
3. **T-410** : Test Max + retour engagement (2-3 jours de jeu libre). Si verdict "plus envie", pivoter vers autre mécanique
4. **T-411** : Si go, généraliser à 50 dinos + refine asset pipeline (silhouettes ou dégradés uniformes)

**Leçons** : Écho de L-055 (design amont + figeage = obligatoire) et L-062 (filtrage = lisibilité max) — ici il s'agit de re-motiver un enfant, not just code quality.

**Impact** : Potentiellement 1-3 nouveaux MJ (mj-XX-dino-*), nouvelles assets visuelles (silhouettes dino), intégration `site/js/dinos-data.js`.

**Dépendance** : EP-039 (dino-data stable) ; optionnel (enrichissement long terme, pas bloquant pour prod actuelle).

---

| ID | Titre | Statut |
|----|-------|--------|
| EP-001 | Infrastructure & config Claude | `[x]` |
| EP-002 | Direction artistique & univers | `[x]` |
| EP-003 | Scaffold Phaser.js | `[x]` |
| EP-007 | Config Claude avancée (hooks) | `[x]` |
| EP-010 | Assets & outils graphiques | `[x]` |
| EP-004 | Architecture V0 (HTML quiz + Phaser sandbox) | `[x]` |
| EP-MJ01 | MJ-01 · Quelle couleur ? | `[x]` |
| EP-MJ02 | MJ-02 · Quel numéro ? | `[x]` |
| EP-MJ03 | MJ-03 · Devine le numéro (TTS) | `[x]` |
| EP-MJ04 | MJ-04 · Compte les passagers | `[x]` |
| EP-MJ05 | MJ-05 · La bonne place (soustraction) | `[x]` |
| EP-MJ06 | MJ-06 · Lis la phrase | `[x]` |
| EP-MJ07 | MJ-07 · Terminus | `[x]` |
| EP-MJ08 | MJ-08 · Au garage ! | `[x]` |
| EP-MJ09 | MJ-09 · Trie les bus ! | `[x]` |
| EP-MJ10 | MJ-10 · Tableau de bord (sons) | `[x]` |
| EP-MJ11 | MJ-11 · Quel pays ? (drapeaux) | `[x]` |
| EP-MJ13 | MJ-13 · L'arrêt de bus (panneau RATP) | `[x]` |
| EP-MAXADV | Max Adventure · La journée de Max (sandbox Phaser) | `[x]` |
| EP-005 | Système de progression (flotte + carte) | `[ ]` |
| EP-021 | Renommage cohérence vocab Max (Centre bus / Garage / Village) | `[x]` |
| EP-033 | Désactivation TTS annonce titre au lancement (laggue) | `[x]` |
| EP-022 | MJ-04 → ajouter fin de partie (10 tours + endSession + playEndSound) | `[x]` |
| EP-023 | Menu hybride : Carte de Villejuif (haut) + grille classique (bas) | `[x]` |
| EP-024 | Fix Max Adventure (cassé actuellement) | `[x]` |
| EP-025 | Max Adventure responsive (portrait mobile) | `[x]` |
| EP-026 | TTS ElevenLabs pré-générés (MP3 statiques pour noms de jeux) | `[ ]` |
| EP-027 | MJ-20 · Système de niveaux par langue (cartes intermédiaires, progression mot par mot) | `[x]` |
| EP-028 | MJ-18 · Tubes de couleurs : contrôle nb de tubes vides + palette élargie | `[x]` |
| EP-029 | MJ-19 · Trouve le bus : 2-3× plus de bus (pool avec doublons) | `[x]` |
| EP-030 | MJ-17 · Le garage : 10 icônes en 2 lignes droites | `[x]` |
| EP-031 | MJ-15 · L'intrus : niveau D roues colorées + intrus couleur+numéro wrong | `[x]` |
| EP-032 | MJ-09 · Trie les bus : déplacer 2 bus simultanément (multi-touch 2 doigts) | `[x]` |
| EP-035 | Fix encoding emojis tous les mini-jeux HTML (UTF-8 + vérification) | `[ ]` |
| EP-036 | Gabarit header compact unifié tous les MJ (rétro-fit 20 fichiers) | `[ ]` |
| EP-038 | Harnais de test headless mini-jeux (Playwright headless, 1 spec/MJ) | `[~]` pilote livré |
| EP-039 | Narration audio DUO Narrateur H + Wex sur encyclopédie Dinos (60 fiches) | `[~]` clôture pilote |
| EP-TILES | Pipeline tile-tools LimeZu (cartographie + recettes + mockups-routes + tile-picker + tile-pmo) | `[~]` |
| EP-MJPOSE | MJ · Pose-tes-tiles (kids éditeur de map simplifié) | `[x]` |
| EP-VOCAB | Module vocab.py + pivot "refs visuelles" pour pipeline tile-tools (anti-erreurs, source unique) | `[x]` |
| EP-MACRO-VIRAGE | Macro `virage(direction, ...)` dans builders.py (DRY consolidation 4 recettes manuelles, basse priorité) | `[ ]` |
| EP-REFS | Banque de références visuelles tile-tools (post-EP-VOCAB, briefs complexes) | `[ ]` |
| EP-041 | Renouvellement mini-jeux — lassitude bus, exploration piste thème dino (tri-couleur, quiz, duel) | `[?]` PISTE |

---

## Architecture V0 – Option C (validée 2026-03-10)

```
MaxPlay V0
├── site/index.html     ← Menu 2 colonnes (14 mini-jeux + Max Adventure)
│   ├── mj-01.html · Quelle couleur ?
│   ├── mj-02.html · Quel numéro ?
│   ├── mj-03.html · Devine le numéro (TTS) — pool 362 lignes IDFM
│   ├── mj-04.html · Compte les passagers
│   ├── mj-05.html · La bonne place
│   ├── mj-06.html · Lis la phrase
│   ├── mj-07.html · Terminus
│   ├── mj-08.html · Au garage ! — pool 362 lignes IDFM
│   ├── mj-09.html · Trie les bus ! — pool 362 lignes IDFM
│   ├── mj-10.html · Tableau de bord — 12 boutons sons sandbox
│   ├── mj-11.html · Quel pays ? — drapeaux + TTS + confettis
│   ├── mj-12.html · Nouveaux sons — tableau de bord 22 sons + easter egg
│   ├── mj-13.html · L'arrêt de bus — panneau RATP + fiches LED
│   ├── max-adventure.html · splash → ./max-adventure/
│   └── js/
│       ├── data.js    ← LIGNES (26 actives), source de vérité
│       ├── idfm.js    ← IDFM_REFERENTIEL (362 lignes complètes)
│       ├── bus-svg.js ← busSVG(), busSVGHiddenNum(), selectDistinctColors()
│       ├── sounds.js  ← Web Audio API
│       └── feedback.js ← feedback visuel/sonore + busParade()
└── game/                    ← Sandbox Phaser.js (Max Adventure)
    └── Max Adventure · La journée de Max
```

**Principe** : HTML pour les jeux quiz (simple, livrable vite), Phaser pour la sandbox/action.
**Déploiement** : static file, zéro serveur. GitHub Pages ou Netlify.

---

## Fiches mini-jeux V0

### MJ-01 · Quelle couleur ?

| | |
|--|--|
| **But pédagogique** | Mémoriser les couleurs des lignes — Max les connait déjà par cœur |
| **Mécanique** | Numéro affiché seul (ex : "**162**") → 4 swatches de couleur → tap la bonne |
| **Ce qui est caché** | La couleur n'est JAMAIS visible avant la réponse |
| **Pool lignes** | **Toutes les 20 lignes connues de Max** — y compris les centaines (172, 185, 2234...) |
| **TVM** | Cas particulier → exclu pour l'instant |
| **Ambiguïtés** | 380=V6 (vert clair), 132=2234 (violet), N15=N22 (bleu nuit) → **les 2 réponses acceptées** |
| **Feedback ambiguïté** | Message "Les deux sont [couleur] !" + les deux bus s'affichent |
| **Progression** | Commence par les 5 lignes du quotidien → toutes les lignes |
| **Feedback** | Bus apparaît dans sa couleur + son klaxon |
| **Tech** | HTML · SVG template bus-svg.ts |

---

### MJ-02 · Quel numéro ?

| | |
|--|--|
| **But pédagogique** | Mémorisation inverse : retrouver le numéro depuis la couleur |
| **Mécanique** | Bus affiché avec sa couleur, numéro caché → 4 choix de numéros → tap le bon |
| **Ce qui est caché** | Le numéro sur le panneau est masqué (recto blanc) |
| **⚠️ Lignes excluses** | **380/V6, 132/2234, N15/N22** — mêmes couleurs = question ambiguë |
| **Règle** | Une question ne doit JAMAIS avoir 2 bonnes réponses possibles |
| **Distracteurs** | Choisir des numéros de couleurs proches → vraie mémorisation |
| **Feedback** | Numéro se révèle sur le bus avec animation + son |
| **Tech** | HTML · SVG template |

---

### MJ-03a · Compte les passagers

| | |
|--|--|
| **But pédagogique** | Dénombrement 1–10, notion de groupe (subitizing) |
| **Mécanique** | Passagers arrivent par groupes → "Combien en tout ?" → choisir le chiffre |
| **Visuel GROUPÉ** | **PAS 8 bonhommes en ligne** → groupements visuels : 2+3+3 ou 2+2+4 |
| **Progression** | Niveau 1 : 1–5 · Niveau 2 : 1–10 · Niveau 3 : groupements plus complexes |
| **Personnages** | Pirate, magicien, roi, archer… passagers insolites = fun |
| **Feedback** | Chaque bonhomme fait un son en montant dans le bus |
| **Tech** | HTML · sprites/characters/ |

---

### MJ-03b · La bonne place (soustraction)

| | |
|--|--|
| **But pédagogique** | Arithmétique appliquée, soustraction, logique |
| **Contexte** | Max a déjà réussi ce type de problème et **demandait plus de difficulté** |
| **Mécanique** | "Le bus a 8 places. 5 sont occupées. 4 personnes attendent. Combien peuvent monter ?" |
| **Variantes** | Places libres / Passagers qui descendent / Combinaisons + et - |
| **Calibrage** | **Max est très bon** → monter vite en difficulté (jusqu'à 20+ places) |
| **Niveaux** | Facile: places ≤ 10 · Moyen: places ≤ 20 · Difficile: 2 étapes (descendre puis monter) |
| **Feedback** | Animation passagers qui montent / s'assoient / restent sur le trottoir |
| **Tech** | HTML |

---

### MJ-04 · Lis le mot

| | |
|--|--|
| **But pédagogique** | Lecture phonétique, syllabe manquante |
| **Mécanique** | Mot affiché avec une syllabe en "?" → 4 syllabes proposées → tap la bonne → voix lit le mot complet |
| **Pool PRIORITAIRE (Phase 1)** | Mots simples que Max sait déjà lire : **CACA, BUS, PAPA, MAMAN, MAX, YANN, CLAUDIA, VALOUETTE, METRO, TRAM, POLICE, POMPIER** |
| **Pool ARRÊTS (Phase 2)** | VIL·LE·JUIF, LOU·IS A·RA·GON, KRE·MLIN, MA·RNE, GUY·AUMARD... |
| **Limite géo** | **Lignes 185 et M7 uniquement** — territoires connus de Max |
| **Ordre** | Mots simples d'abord (5-10 mots), noms d'arrêts ensuite |
| **Feedback** | Voix lit le mot entier + syllabe complétée s'illumine |
| **Tech** | HTML · Web Speech API |

---

### MJ-05 · Quel bus pour aller où ?

| | |
|--|--|
| **But pédagogique** | Logique, géographie locale, mémoire des itinéraires réels de Max |
| **Mécanique** | Destination avec icône → 4 bus proposés → lequel prend-on ? |
| **Situations réelles de Max** | |

| Destination | Bonne réponse | Contexte |
|---|---|---|
| École Montessori 101 | **185** ou **M7** | Trajet quotidien |
| Chez Valouette (marché / piscine / médiathèque Georgette) | **V7** | Surnom affectif |
| Chez mamie → Gare Montparnasse | **M7** puis **M6** | Trajet connu |
| Gare de l'Est (tata Sarah → Strasbourg) | **M7** | Trajet connu |
| Direction Clamart / Maison Blanche | **162** | Max connaît |
| 162 direction Clamart | **Maison Blanche** | Terminus connu |

| | |
|--|--|
| **Feedback** | Mini-animation trajet sur carte stylisée |
| **Tech** | HTML |

---

### MJ-06 · Au garage le soir !

| | |
|--|--|
| **But pédagogique** | Association numéro/place, tri, motricité drag & drop |
| **Mécanique** | Les bus rentrent au centre bus le soir → **drag chaque bus vers sa place numérotée au sol** |
| **Visuel garage** | Cases avec numéro peint au sol (simple, pas de 3D) |
| **Début** | 3 bus, 3 places bien distinctes → jusqu'à 6–8 bus |
| **Détail** | Numéro visible sur le bus ET au sol → Max fait correspondre |
| **Feedback** | Son moteur qui ralentit + porte de garage qui se ferme + lumière qui s'éteint |
| **Cibles** | Min 80×80 px pour la motricité 3-4 ans |
| **Tech** | HTML · Canvas 2D ou CSS drag |

---

### MJ-07 · La journée de Max *(Phaser sandbox)*

| | |
|--|--|
| **But pédagogique** | Exploration libre, logique d'itinéraire, zéro pression |
| **Mécanique** | Carte top-down de Villejuif · Max part de chez lui (Feuillantines) · 3 missions par journée |
| **Flux** | Marcher jusqu'à l'arrêt → identifier le bon bus → monter → trajet → arriver |
| **Missions exemples** | Aller à l'école (185), aller chez Valouette (V7), rentrer chez mamie (M7) |
| **Progression** | Jour 1 : flèches guide · Jour 2 : moins d'aide · Jour 3 : libre |
| **Récompense** | Chaque journée terminée débloque un bus dans la flotte de collection |
| **Assets** | sprites/vehicles/bus/bus-white-all.png + setTint · sprites/vehicles/special/ pour décor |
| **Lacune** | Pas de sprites piétons top-down → à sourcer (itch.io) ou formes simples en attendant |
| **Base existante** | SandboxScene.ts déjà codée → à faire évoluer |
| **Tech** | Phaser.js 3 + TypeScript |

---

### MJ-10 · Tableau de bord

| | |
|--|--|
| **But** | Sandbox libre — explorer les sons du bus sans objectif |
| **Mécanique** | 12 boutons thématiques : klaxon, moteur, porte, freins, sirène, bravo, victoire, ding, buzz, rire, tic-tac + easter egg prout caché (révélé après 5 taps) |
| **UX** | Glow coloré par catégorie, animation flash au tap |
| **Easter egg** | Bouton prout semi-transparent, révélé après 5 taps totaux |
| **Sons** | Web Audio API via sounds.js (singleton AudioContext depuis fix session 10) |
| **Tech** | HTML vanilla · sounds.js |

---

### MJ-11 · Quel pays ?

| | |
|--|--|
| **But pédagogique** | Reconnaissance des drapeaux du monde, géographie |
| **Mécanique** | Drapeau affiché dans la fenêtre destination du bus → 4 choix texte (nom du pays) → TTS lit le nom |
| **Drapeaux** | `flag-icons` CDN (260 drapeaux SVG) via CSS `fi fi-XX` |
| **Affichage** | Drapeau en `background-size:contain` + fond noir (pillarbox) — inset 2px pour voir le contour |
| **Pool** | Mode ⭐ (19 pays connus de Max) ou 🌍 (90+ pays) |
| **Pays connus de Max** | France, Espagne, Royaume-Uni, Italie, Tunisie, Brésil, Suisse, États-Unis, Chine, Japon, Russie, Allemagne, Égypte, Thaïlande, Maroc, Argentine, Pays-Bas, Luxembourg, Cambodge |
| **TTS** | Bouton "🔊 Écouter" — texte fixe (ne révèle jamais le nom). Lu auto à chaque question + après la réponse |
| **Score** | 10 tours, barre de score colorée |
| **Victoire** | 5 paliers selon score : 10/10 confettis drapeaux + son victoire · 8-9 bravo · 6-7 bien joué · 4-5 pas mal · 0-3 encouragements |
| **Confettis** | 40 emojis drapeaux animés Canvas — UNIQUEMENT au 10/10 sans-faute |
| **Tech** | HTML vanilla · flag-icons CDN · bus-svg.js · sounds.js |

---

### MJ-13 · L'arrêt de bus

| | |
|--|--|
| **But pédagogique** | Simuler l'attente à un arrêt de bus avec affichage RATP réaliste |
| **Univers** | Poteau gris RATP standard, fiches LED pour affichage des lignes |
| **Layout** | Flexbox column (body) : header (48px) · panel-zone (flex:1) · road (80px) |
| **Poteau** | Gris (#4a4a4a) avec cercle turquoise BUS (#00c5a0) dans header |
| **Fiches LED** | Panneau RATP classique : 2/3 largeur pour lignes, 1/3 pour "sec" (seconde) |
| **Buses animés** | Route scrollante avec 2-3 buses circulant (sprites ou SVG selon mode) |
| **Modes A/B/C** | 3 variantes mélangées dans 1 seul fichier — différences : animations, timing |
| **Décompte** | Secondes affichées · tick ~5s · freeze à 0 (arrivée bus) |
| **Feedback** | Changement couleur fiches, son Pikachu aléatoire (2 cris possibles) |
| **Score** | Points selon rapidité réaction ou choix correcte |
| **Tech** | HTML vanilla · Flexbox · SVG buses · sounds.js |

---

## Tâches actives

### EP-021 – Renommage cohérence vocab Max ✅
> Vocabulaire Max validé 2026-04-26 : Centre bus = dodo des bus · Garage = réparation · Village des bus = terminus
- [x] T-210 : MJ-08 "Au garage !" → "Au centre bus" (titre, header, commentaires)
- [x] T-211 : MJ-17 "Village des bus" → "Le garage" (titre, header, commentaires)
- [x] T-212 : tracker.js GAME_META à jour
- [x] T-213 : "Village des bus" libéré pour future idée terminus

### EP-033 – TTS annonce titre désactivé ✅
> Au lancement de chaque MJ, `tracker.startSession()` lançait `_announceTitle()` (TTS du nom du jeu). Cause des lags au démarrage. Désactivé 2026-05-03 — l'utilisateur n'en a pas besoin, les jeux gardent leurs TTS pédagogiques en cours de partie.
- [x] T-330 : Commenter l'appel `_announceTitle(id)` dans `tracker.startSession()`

### EP-022 – MJ-04 fin de partie [!] **FAUX BUG ARCHIVÉ 2026-05-21**
> ~~Aujourd'hui MJ-04 boucle infinie sans `endSession`.~~ Code conforme depuis (date inconnue, audit 2026-05-11 a découvert que les 3 sous-tâches étaient implémentées sans coche). Désync sommaire ↔ détail corrigée. **Jamais exécuté comme bug** (était pédago-fantôme, non-bloquant).
- [!] T-220 : Compteur 10 tours DÉJÀ IMPLÉMENTÉ
- [!] T-221 : Écran fin de partie DÉJÀ IMPLÉMENTÉ
- [!] T-222 : Sonnerie victoire DÉJÀ IMPLÉMENTÉ

**Clôture 2026-05-21** : faux bug confirmé, jamais exécuté. Archivé pour traçabilité (Leçon méthodologique : audit pmo-challenge doit **vérifier le code** d'un ticket avant de le relayer). Supprimé de backlog actif.

### EP-023 – Menu hybride Carte de Villejuif ✅
> Page d'accueil = map Villejuif (haut) + grille classique (bas). Implémenté dans `site/index.html` avec `.map-hotspot`, tooltips et liens vers chaque MJ.
- [x] T-230 : Valider emplacements V1 avec utilisateur
- [x] T-231 : Layout map (dimensions, échelle, choix illustration vs tileset LimeZu)
- [x] T-232 : Coordonnées x,y des emojis hotspots
- [x] T-233 : Intégration index.html (map en haut, grille en bas, pas de toggle)
- [x] T-234 : Test motricité (hotspots min 60×60 px)

### EP-024 – Fix Max Adventure (RÉSOLU)
> Root cause : `vite.config.ts` `base: '/MaxPlay/mj-07/'` mais CI déploie sous `/max-adventure/`. Mismatch → 404 JS Phaser → écran noir prod.
- [x] T-240 : Reproduit via Playwright sur prod (écran noir, 404 phaser-*.js et index-*.js)
- [x] T-241 : Diagnostic — `base` Vite pas mis à jour quand le dossier de déploiement a été renommé en session 9
- [x] T-242 : Fix `base: '/MaxPlay/max-adventure/'` + commit + push CI (commit 98923b60)
- [x] T-243 : Re-test prod : OK, jeu se charge

### EP-026 – TTS ElevenLabs (MP3 statiques) — JEU + NARRATION
> Aujourd'hui annonce nom de jeu via `speechSynthesis` natif (voix robotique). Décidé 2026-04-26 : pré-générer les MP3 via MCP ElevenLabs (option B) — zéro clé exposée, zéro coût récurrent.
> **Voix : générées ou clonées (PAS les voix par défaut)**. Cible : voix enfant-friendly avec nuances émotionnelles fortes (joie, suspense, douceur, surprise…).
> Champ d'application : **JEU** (annonces, retours, victoires) **ET NARRATION** (lecture des histoires Wex/Christ avec dialogues incarnés).
> Reportée : ne pas faire maintenant, on garde speechSynthesis comme fallback.

**Infra TTS**
- [ ] T-260 : Setup MCP ElevenLabs dans `~/.claude/settings.json` (clé API utilisateur)
- [ ] T-261 : Sélection / clonage de voix (3-5 voix : narrateur doux, voix enfant joyeuse, voix grave/calme, voix vive/excitée…)
- [ ] T-262 : Script de génération bouclant sur `GAME_META` → `site/sounds/titles/mj-XX.mp3`
- [ ] T-263 : Modifier `tracker.js._announceTitle` : si MP3 existe → `new Audio()`, sinon fallback `speechSynthesis`
- [ ] T-264 : Régénération à la demande quand un jeu est renommé
- [ ] T-265 : Pipeline narration : 1 histoire → découpe par voix → MP3 par segment → lecteur audio web

**Agent éditorial voix (nouveau)**
- [ ] T-266 : Spec d'un nouvel agent `voice-director` : prend un texte brut (annonce de jeu, dialogue d'histoire) et l'enrichit en SSML/markup ElevenLabs (émotions, pauses, emphases, prononciation, voix par personnage)
- [ ] T-267 : Définir le vocabulaire d'émotions : joyeux, doux, suspense, mystérieux, déçu, fier, complice…
- [ ] T-268 : Mapper personnages (casting Christ : Wex, Melki, Mimi, Dadou…) → voix ElevenLabs
- [ ] T-269 : Tester sur un texte court de chaque type (annonce jeu courte, victoire, dialogue narration)

### EP-025 – Max Adventure responsive (portrait mobile)
> Constat user 2026-04-26 : sur Xiaomi 15 Ultra en portrait avec barre navigateur, paysage = trop peu de place. Veut rester en portrait.
- [x] T-250 : `game/index.html` — `#game-container` 1024x768 fixe → 100vw/100vh (commit c9b2de3f)
- [x] T-251 : `PreloadScene` — UI centrée via `this.scale.width/height` au lieu des constantes fixes
- [x] T-252 : `SandboxScene.setupCamera` — zoom = max(W/WORLD_W, H/WORLD_H, 0.45) → garantit que le monde remplit le viewport quel que soit l'orientation (commit ab5bbee3)
- [x] T-253 : Listener `scale.on('resize')` pour recalculer le zoom en cas de rotation
- [x] T-254 : Test Playwright mobile portrait 430x932 → canvas plein viewport, pas de bande vide

### EP-010 – Assets & outils graphiques ✅
- [x] T-070 : SVG bus side-view (droite + gauche) avec template {{COLOR}}/{{LINE}}
- [x] T-071 : Utilitaire bus-svg.ts (createBusSvg, createBusDataUrl, preloadAllBusTextures)
- [x] T-072 : Sprite sheets topdown sélectionnés (bus 5 couleurs, police, ambulance, taxi, 3 sedans)
- [x] T-073 : Sprites personnages (archer, king, knight, musketeer, pirate, wizard – walk + idle)
- [x] T-074 : docs/ASSETS.md créé (catalogue complet + lacunes identifiées)

### EP-004 – Architecture V0
- [x] T-031 : Sandbox codée – SandboxScene.ts (prototype top-down)
- [x] T-080 : Supprimer `site/index.html` v1 (version pédagogiquement cassée) → backup dans `temp/`
- [x] T-081 : Créer nouvelle structure `site/` avec composants partagés (SVG bus, feedback, score)
- [x] T-082 : Composant partagé BusCard (SVG + ligne + couleur + état masqué/révélé)
- [x] T-083 : Composant partagé FeedbackOverlay (succès / erreur / encouragement)
- [x] T-084 : Hub menu principal (7 mini-jeux, accès direct)

### EP-MJ01 – MJ-01 · Quelle couleur ?
- [x] T-101 : Données lignes (20 lignes, couleurs, cas ambigus 380/V6, 132/2234, N15/N22)
- [x] T-102 : UI question + 4 swatches
- [x] T-103 : Logique réponse (cas ambigus acceptés, message "Les deux sont...")
- [x] T-104 : Progression niveaux (5 quotidiennes → toutes les lignes)
- [x] T-105 : Feedback + TTS

### EP-MJ02 – MJ-02 · Quel numéro ?
- [x] T-111 : Filtrer les lignes ambiguës (exclure 380/V6, 132/2234, N15/N22)
- [x] T-112 : UI bus affiché + numéro masqué + 4 choix
- [x] T-113 : Logique + feedback révélation

### EP-MJ03A – MJ-03a · Compte les passagers
- [x] T-121 : Système de génération de groupes (2-3 bonhommes max par groupe)
- [x] T-122 : Rendu visuel groupements (2+3+3, pas 8 en ligne)
- [x] T-123 : Choix numérique + feedback son par passager

### EP-MJ03B – MJ-03b · La bonne place
- [x] T-131 : Moteur de problèmes (places total, occupées, attente, places libres)
- [x] T-132 : Génération texte problème + visuel bus intérieur
- [x] T-133 : Calibrage difficulté (Max est très bon → monter vite à 20+ places)
- [x] T-134 : Variantes 2 étapes (descendre puis monter) — type `combo` ajouté au niveau 3 dans mj-05

### EP-MJ04 – MJ-04 · Lis le mot
- [x] T-141 : Base de données mots prioritaires (CACA, BUS, PAPA...)
- [x] T-142 : Base de données arrêts 185/M7 (Villejuif, Louis Aragon...)
- [x] T-143 : UI mot avec syllabe manquante
- [x] T-144 : 4 choix de syllabes + logique
- [x] T-145 : TTS lecture du mot complet après réponse

### EP-MJ05 – MJ-05 · Quel bus pour aller où ?
- [x] T-151 : Base de données destinations (école, Valouette, mamie, tata Sarah...)
- [x] T-152 : UI destination + 4 bus proposés
- [x] T-153 : Feedback fin de partie → `busParade()` (défilé de bus en victoire)

### EP-MJ06 – MJ-06 · Au garage le soir !
- [x] T-161 : Bus SVG IDFM (vraies lignes, vraies couleurs) — plus de div CSS colorés
- [x] T-162 : Drag & drop bus → colonne garage droite (cibles min 80px)
- [x] T-163 : 6 lignes quotidiennes Max (162, 185, 380, V7, 131, 125)
- [x] T-164 : Porte de garage animée (height 0→100% depuis bas) + sons

### EP-MJ07 – MJ-07 · La journée de Max (Phaser)
- [x] T-171 : Carte Villejuif top-down (routes H+V, trottoirs, arbres, bâtiments)
- [x] T-172 : Bus topdown avec sprite sheet 7×7 + tap-to-move + 8 directions
- [x] T-173 : 5 passagers à collecter sur les trottoirs
- [x] T-174 : Snap à la route (tap herbe → point le plus proche sur la route)
- [x] T-175 : Déploiement CI : Phaser build → _site/mj-07/ + redirect depuis mj-07.html

### EP-001 – Infrastructure (terminé)
- [x] T-001 : Créer CLAUDE.md format opérationnel
- [x] T-002 : Créer skills organisés en sous-dossiers
- [x] T-003 : Créer docs/VISION.md + REFERENCES.md
- [x] T-004 : Créer tasks/BACKLOG.md
- [x] T-005 : Créer memory/MEMORY.md
- [x] T-006 : Initialiser scaffold Phaser.js (scenes Boot/Preload/Hub)

### EP-002 – Direction artistique ✅
- [x] T-010 : Direction artistique → Flat design arrondi (Toca Boca / Tayo style)
- [x] T-011 : Univers → Ville réaliste Villejuif + vie secrète des bus
- [x] T-012 : Progression → Collection de bus + carte Villejuif qui se dévoile
- [x] T-014 : Bus side-view SVG fourni par l'utilisateur + rangé dans assets

### EP-003 – Scaffold Phaser.js ✅
- [x] T-020 : package.json + tsconfig + vite.config
- [x] T-021 : BootScene + PreloadScene + HubScene squelette
- [x] T-022 : constants/colors.ts + constants/config.ts (vraies couleurs IDFM)
- [x] T-023 : npm install, tsc 0 erreur, Vite 5 fonctionnel

### EP-007 – Config Claude avancée ✅
- [x] T-040 : Hook PostToolUse Edit/Write → tsc --noEmit automatique
- [x] T-042 : Hooks actifs dans settings.local.json

---

## Décisions prises

| ID | Date | Décision | Raison |
|----|------|----------|--------|
| D-001 | 2026-03-07 | Stack : Phaser.js 3 + Vite + TypeScript | Navigateur, pas d'install, itération rapide |
| D-002 | 2026-03-07 | Zéro pénalité punitive | Enfant 3-4 ans : frustration = abandon |
| D-003 | 2026-03-07 | Sessions max 3-8 min | Capacité d'attention à cet âge |
| D-004 | 2026-03-08 | Direction artistique : **flat design arrondi** (Toca Boca / Tayo) | Rapide, lisible, accessible sans dessinateur |
| D-005 | 2026-03-08 | Univers : ville Villejuif + vie secrète des bus | Ancrage affectif + liberté créative |
| D-006 | 2026-03-08 | POV : immersion avec le bus (pas guide extérieur) | Max vit l'aventure avec le bus |
| D-007 | 2026-03-08 | Progression : flotte de bus + carte Villejuif | Double satisfaction visuelle |
| D-008 | 2026-03-08 | Sandbox d'abord avant de figer la mécanique | Sentir les mouvements, décider le game feel |
| D-009 | 2026-03-10 | Bus side-view = SVG template dynamique ({{COLOR}}/{{LINE}}) | 1 fichier pour 20 lignes, couleur changeble par code |
| D-010 | 2026-03-10 | Bus topdown = sprite sheet White + setTint() Phaser | 1 sprite sheet pour toutes les couleurs IDFM |
| D-011 | 2026-03-10 | Architecture V0 Option C : HTML pour quiz + Phaser pour sandbox | HTML = livrable rapide · Phaser = valeur ajoutée sandbox |
| D-012 | 2026-03-10 | MJ-01 : lignes ambiguës (380=V6, 132=2234, N15=N22) → 2 réponses acceptées | Pédagogie honnête, pas d'ambiguïté trompeuse |
| D-013 | 2026-03-10 | MJ-02 : lignes à couleur identique exclues | Question sans réponse unique = pas pédagogique |
| D-014 | 2026-03-10 | VISION.md corrigé : pixel art → flat design (D-004 fait foi) | Incohérence détectée entre les deux docs |
| D-015 | 2026-03-10 | MJ-03a : groupements visuels (2+3+3) pas alignement linéaire | Max compte mieux avec des groupes qu'en ligne |
| D-016 | 2026-03-10 | MJ-03b : calibrage haut — Max est très avancé en soustraction | Ne pas sous-estimer, monter vite en difficulté |
| D-017 | 2026-03-10 | MJ-04 : Phase 1 = mots simples (CACA, BUS, PAPA...) avant arrêts | Max sait lire ces mots, commencer par l'acquis |
| D-018 | 2026-03-10 | MJ-05 : trajets réels uniquement (185 école, V7 Valouette, M7+M6 mamie) | Ancrage affectif maximal |
| D-019 | 2026-03-10 | MJ-06 : place au sol numérotée, pas garage 3D | Plus lisible pour 3-4 ans |
| D-021 | 2026-04-26 | Vocab Max : Centre bus = dodo · Garage = réparation · Village des bus = terminus (réservé) | Cohérence avec le vocabulaire que Max utilise |
| D-022 | 2026-04-26 | Menu hybride : carte Villejuif (haut) + grille classique (bas), pas de toggle | Découverte map sans casser le fallback rapide |
| D-023 | 2026-04-26 | Backup progression : reste localStorage seul. Pas d'API/n8n maintenant | Site = HTML simple, pas de complexité prématurée |

---

## Leçons apprises

| ID | Date | Leçon | Contexte |
|----|------|-------|---------|
| L-001 | 2026-03-07 | Ne pas décider le scénario/style à la place du designer – présenter des options | Setup initial trop prescriptif |
| L-002 | 2026-03-07 | Skills = ouvrir des possibilités, pas fermer des choix | Skills v1 trop opinionated |
| L-003 | 2026-03-07 | CLAUDE.md = instructions opérationnelles Claude, pas de la doc projet | Confusion format initial |
| L-004 | 2026-03-08 | Le prénom de l'enfant est Max, pas Tom | Correction critique session 2 |
| L-005 | 2026-03-08 | Sandbox avant de coder le mini-jeu – le game feel se décide en jouant | EP-004 |
| L-006 | 2026-03-10 | Afficher la réponse dans la question = zéro défi pédagogique (ex: couleur visible dans le quiz couleur) | Jeux v1 site cassés pédagogiquement |
| L-007 | 2026-03-10 | Toujours vérifier les incohérences entre docs (VISION vs BACKLOG ici) avant chaque session | Pixel art vs flat design, même date, deux docs différents |
| L-008 | 2026-03-10 | Max est très avancé – ne pas sous-estimer. Il connaît 20 lignes par cœur, chiffres jusqu'aux milliers, lecture phonétique | Calibrage MJ-01/02/03b |
| L-009 | 2026-03-15 | Sidewalk 1–6 = 6 STYLES différents (textures distinctes), pas des orientations. Utiliser 1 seul style par zone + sidewalk2 pour varier max 2–3 points | map-mockups pipeline |
| L-010 | 2026-03-15 | Anti-répétition : >6 tiles identiques consécutifs = issue HAUTE. Briser avec sidewalk2 aux positions des props. Asphalt : mixer asphalt/asphalt2/asphalt3 | map-mockups M2 FAIL fix |
| L-011 | 2026-03-15 | bench_city = sprite 96×96 (2×2 tiles). Ancrer top-left. Tous les 4 pixels du footprint doivent être sur sidewalk, jamais sur asphalt | map-mockups M5 MOYENNE-01 |
| L-012 | 2026-03-15 | Transition obligatoire : asphalt → sidewalk → bâtiment. Jamais asphalt adjacent direct à un bâtiment | Règle fondamentale tileset |
| L-013 | 2026-05-10 | **Marquage centre route** : `Asphalt_1_Variation_2` (H propre) / `_8` (V propre). JAMAIS `_14` / `_15` (sales). Mnémonique : "2 propre H, 8 propre V, 14 sale H, 15 sale V" | 4 sessions d'erreur, 30+ leçons dans LESSONS.md du skill |
| L-014 | 2026-05-10 | **Béton uniforme / nature variée** : trottoir et asphalte = tile UNIQUE par défaut, anti-mono max 10%. Herbe/terre = variations OK | Refonte propre 7 recettes 2026-05-10 |
| L-015 | 2026-05-10 | **Workflow Propose → Édite → Apprend** : agent propose une recette dans `mockups-routes.html` → user clique 🎨 Éditer → tile-picker pré-rempli via `?recipe=X.py` → user exporte → agent intègre + invoque `tile-pmo` pour graver les leçons | Pipeline collaboratif tile-tools |
| L-016 | 2026-05-10 | **Anti-pattern méta** : si user dit 2× "c'est sale" et que je crois avoir corrigé sans changement visible → STOP, zoomer la tile x5, comparer planche-contact entière, identifier différence pixel-perfect AVANT de patcher | Erreur de 4 sessions sur `_14` |
| L-017 | 2026-05-10 | **Multi-tiles à vraies dimensions** : un sprite 4×2 doit s'afficher rectangle 4×2 dans tile-picker, pas carré 1×1 déformé. CSS inline `width: calc(w * --cell-size); height: calc(h * --cell-size)` | Bug visuel tile-picker corrigé |
| L-018 | 2026-05-10 | **Tile `Asphalt_1_Variation_13` = croix `+` pour intersection centrale** d'un carrefour 4 voies. Sans elle, le pivot est juste de l'asphalte plain sans signal visuel d'intersection | Cartographie révélée |
| L-019 | 2026-05-11 | **Composant partagé `js/back-button.js`** (80×80 + mini-bus SVG + auto-replace 3 patterns) > 19 boutons inline duplicate. Injecté dans 18 MJ. CSS `.back` fallback upgraded 48→80. | Session refactor 5 dim (`PIPELINE-MEMORY-MJ.md` § 3 F-006) |
| L-020 | 2026-05-11 | **Composant partagé `js/intro-splash.js`** avec convention déclarative `data-mp-intro-emoji/title/hint` sur `<body>`. Auto-init au DOMContentLoaded, skippable au tap, pas de TTS (EP-033 respecté) | Session refactor 5 dim (`PIPELINE-MEMORY-MJ.md` § 3 F-007) |
| L-021 | 2026-05-11 | **`.scorebar` neutralisée par défaut** dans CSS partagé (DOM reste pour compat code, affichage masqué). Ajout `.progressbar` alternative non-numérique. Règle "pas de score < 6 ans" enfin appliquée sur 7 MJ | Session refactor 5 dim (`PIPELINE-MEMORY-MJ.md` § 3 F-005) |
| L-022 | 2026-05-11 | **`mj-pose-tiles` consomme `Asphalt_1_Variation_14` et `_15` SALE** (lignes 123-124) — violait L-013. ✅ Corrigé 2026-05-11 (nuit) : swap vers `_2` (H propre) et `_8` (V propre), L-013 respectée | Audit MJ 2026-05-11, corrigé même jour |
| L-023 | 2026-05-11 | **Audit `pmo-challenge` doit vérifier le code** d'un ticket avant de le relayer comme bug actif. Lire BACKLOG seul = risque de "bugs fantômes" (cas EP-022 mj-04 : 3 sous-tâches implémentées sans coche, audit l'a relayé comme actif) | Anti-pattern méta gravé Session 14 |
| L-024 | 2026-05-11 | **mj-12 = plage de sons / tableau de bord, PAS un jeu** (décision Papa Yann 2026-05-11). Pas de mécanique gagnant, pas de refonte en quiz. Concept = "explore les sons" (bus, Mario, Pokémon, sons secrets). Garder tel quel, l'intro splash actuelle "Joue avec les sons / Touche les boutons pour écouter" reflète bien ce scope | Décision auteur, clôture point out-of-scope Session 14 |
| L-029 | 2026-05-12 | **Brique élémentaire validée visuellement AVANT macro** : ne jamais écrire de macro de composition (virage, carrefour, intersection) sans avoir d'abord validé chaque tile candidate isolée (mini-render 3×3) avec Papa Yann. Anti-pattern fatal : inventer des constantes `COIN_INT_SE = sw_X` sans avoir vérifié visuellement. Coût de violation : 8h ratées sur virages 13×13. Méthode validée : `brick-explorer.html` (page interactive vote courbe/point/autre) | Session 2026-05-12 LESSONS L-009 (skill maxplay-tiles) |
| L-030 | 2026-05-12 | **Mapping LimeZu SW_1 ↔ SW_2-6 figé** : les 6 tilesets Sidewalk NE SONT PAS équivalents à numéro identique. SW_1 a 10 positions (#11-#20) décalées vs SW_2-6. Table de mapping dans `site/tile-tools/styles.py` (fonction `tile_for_form(style, n_ref)` applique le remap auto). Anti-pattern fatal : convertir `Sidewalk_1_X → Sidewalk_2_X` aveuglément = artefact garanti positions 11-20 | Session 2026-05-12 LESSONS L-010 + script `compare_tilesets_final.py` |
| L-031 | 2026-05-12 | **Méthode "planche comparative"** validée : au lieu de rendre 60 PNG isolés (validation lourde), générer 1 grosse image grille (N tiles × M tilesets, labellisée). Validation Papa Yann en 1 coup d'œil au lieu de 22 cycles. Pattern à généraliser sur toutes familles (Asphalt/Grass/Wall/...). Scripts : `scripts/compare_tilesets*.py` | Session 2026-05-12 LESSONS L-011 |
| L-032 | 2026-05-12 | **PIL lecture w/h obligatoire** avant inclusion dans `tile_picker_data.js` : 69% des PNG sont multi-cells (sprites meubles 2×3, voitures 4×2, façades 5×6, atlas 18×16). Présupposé "tile 48×48 = 1×1 cellule" = FAUX. Refonte `scripts/build_tile_picker_data.py` lit dimensions réelles, catégorie `planches` dédiée pour >10 cellules | Session 2026-05-12 LESSONS L-012, tile-picker passé 36% → 100% couverture (3525 → 9811 tiles) |
| L-033 | 2026-05-14 | **Gabarit header `.hdr` canonique unifié** obligation tous les MJ HTML (existants + futurs). Pattern figé depuis mj-20 (commit e1bcd42a) : header une ligne, compact, petit. Raison : uniformité UX + économise espace contenu jeu (3-8 min sessions, zéro perte). Rétro-fit : 20 MJ cibles sauf mj-20 | Signal Papa Yann 2026-05-14, décision figée (EP-036 créé) |

---

## Session 14 — 2026-05-11 (équipe pôle JEU complète + refactor MJ 5 dim)

### Fait (Phase 1)
- ✅ Création 3 agents : `game-conseiller` (Opus transverse) · `game-mj-pmo` (Haiku sous-spé) · `game-mj-reviewer` (Haiku validateur)
- ✅ `site/PIPELINE-MEMORY-MJ.md` créé (méta-process MJ, 3 niveaux mémoire)
- ✅ `game/memory/VISION-LONG-TERME.md` créé (Phase 2 WexWorld + pont narration↔jeu + hypothèses)
- ✅ Skill global `pmo-design` renommé depuis `multi-agent-pmo` + nouveau skill `pmo-challenge` (~/.claude/skills/)
- ✅ Challenge réciproque narration-pmo : 5/5 retenus, patchs appliqués (OBS-1 à OBS-5)

### Fait (refactor MJ 5 dimensions)
- ✅ Audit 19 MJ via pmo-challenge (skill Explore)
- ✅ Composant `js/back-button.js` (80×80, mini-bus SVG, auto-replace 3 patterns)
- ✅ Composant `js/intro-splash.js` (auto-init via data-mp-intro-*)
- ✅ CSS partagé : `.scorebar` neutralisée, `.back` 48→80, ajout `.progressbar`
- ✅ 18 MJ : injection back-button.js (mj-pose-tiles patché à part)
- ✅ 7 MJ : score badges inline masqués
- ✅ 7 MJ : intro splash + data-mp-intro-* (mj-04/05/12/13a/b/c/17)
- ✅ mj-pose-tiles : audio + confettis + son victoire dans `celebrer()`

### Leçons (voir L-019 à L-022 ci-dessus)

### Out of scope (à acter prochain tour) — TOUS RÉSOLUS ✅
- ✅ ~~mj-04 boucle infinie EP-022~~ — **découvert résolu 2026-05-11** : code conforme, BACKLOG désync corrigée. Leçon L-023 gravée.
- ✅ ~~mj-pose-tiles utilise `_14`/`_15` SALE~~ — **corrigé 2026-05-11** : swap vers `_2`/`_8` propres
- ✅ ~~mj-12 scope (lecteur audio vs quiz)~~ — **tranché 2026-05-11 par Papa Yann** : *"c'est bien, garder comme plage de son tableau de bord, pas de jeu"*. Leçon L-024 gravée.

## Session 13 — 2026-05-08 → 2026-05-10 (pipeline tile-tools + EP-TILES)

### Fait
- [x] Skill `~/.claude/skills/maxplay-tiles/` créé avec SKILL.md (566 lignes) + LESSONS.md (30+ entrées datées)
- [x] Agent `.claude/agents/tile-pmo.md` créé (Haiku, capture systématique des leçons tile)
- [x] Dossier `site/tools/` créé : hub `index.html` + déplacement tile-library-v3 + tile-picker
- [x] **tile-picker.html** : bibliothèque 81 tiles + matrice 10×10 drag&drop + 5 catégories (Rue/Parc/Jardin/Building/Forêt) + sélecteur d'échelle (Mini/Petit/Normal/Grand) + multi-tiles à vraies dimensions + import via `?recipe=X.py` + auto-copy clipboard sur Export
- [x] **mockups-routes.html** : 6 patterns à échelle uniforme (route V/H, virage gauche, carrefour, rond-point, quartier) + bouton 🎨 Éditer → ouvre tile-picker pré-rempli
- [x] **mj-pose-tiles.html** : mini-jeu enfant "petit ouvrier" 🦺🚧 — 8×8 tactile, 5 catégories simplifiées, bouton "Lisser" auto-bords, localStorage
- [x] 13 recettes Python validées : routes V/H, 4 virages, carrefour 4 voies, rond-point, quartier, parking, voie bus, 2 passages piétons
- [x] Cartographie corrigée : `Asphalt_1_Variation_2/8` = propres, `_14/_15` = sales, `_13` = croix carrefour, `_3/_5/_7/_1` = coins INT, `_11-_14` = coins EXT, `_9` = trottoir plain
- [x] Script `scripts/export_recipes_to_js.py` : génère `recipes_data.js` pour tile-picker

### Leçons (voir L-013 à L-018)
- Marquage propre = `_2` (H) / `_8` (V), pas `_14`/`_15` (sale)
- Béton uniforme / nature variée (anti-mono ≤10% pour le béton)
- Workflow Propose → Édite → Apprend
- Anti-pattern méta : 2× "sale" sans amélioration visible = STOP, zoomer, comparer
- Tile-pmo à invoquer après correction user / découverte / fin session

### EP-TILES — Pipeline tile-tools LimeZu *(en cours)*

**Statut** : 13 recettes propres, 6 patterns affichés dans mockups-routes, tile-picker fonctionnel avec import. Workflow Propose→Édite→Apprend opérationnel.

**Reste à faire** :
- [ ] Intégrer le quartier propre 16×12 comme nouvelle scène Phaser (remplace la "grosse croix" actuelle de max-adventure)
- [ ] Étendre le quartier vers 24×18 (vrai carrefour 4 branches au centre) puis 32×24
- [ ] Ajouter passages piétons sur les routes principales du quartier
- [ ] Tester d'autres tiles "+ alternatives" pour intersections (cherche tile 4-voies plain ou ronds-points compacts)

---

## Session 12 — 2026-04-12

### Fait
- [x] MJ-14 créé : La grille des bus — Matrices de Raven, 2 modes (Formes / Bus), 3 niveaux (ligne → colonne → les deux)
- [x] MJ-15 créé : L'intrus — 5 bus, 1 ne va pas, 3 niveaux (couleur / pair-impair / famille de ligne)
- [x] MJ-16 créé : Complète la suite — 4 cases, pattern couleurs/tailles/mixte
- [x] MJ-17 créé : L'ombre du bus — silhouette noire 3 niveaux (nette / floutée / partielle)
- [x] tracker.js créé : suivi progression localStorage, maîtrise Montessori (nouveau/en-cours/maîtrisé)
- [x] suivi.html créé : dashboard parent, stats globales, sparklines, export/import JSON
- [x] tracker.js intégré dans MJ-01 à MJ-17 (tous les jeux)

---

## Session 10 — 2026-03-17

### Fait
- [x] MJ-10 créé : Tableau de bord — 12 boutons sons sandbox + easter egg prout caché
- [x] MJ-11 créé : Quel pays ? — drapeaux dans bus, TTS, 4 choix texte, confettis 10/10
- [x] sounds.js : AudioContext singleton (fix son qui coupait après clics rapides)
- [x] MJ-11 drapeau : pillarbox noir (contain) pour ratio correct dans la fenêtre bus
- [x] MJ-11 TTS : bouton texte fixe "Écouter" (ne révèle plus jamais le nom du pays)
- [x] MJ-11 victoire : 5 paliers de phrases selon score, confettis uniquement au 10/10
- [x] index.html : cartes MJ-10 et MJ-11 ajoutées dans la grille

### Leçons
- `AudioContext` doit être un singleton — créer un nouveau contexte à chaque son épuise le pool navigateur (limite ~6) et coupe le son. Toujours réutiliser + `.resume()` si suspendu.
- La fenêtre destination du bus SVG (w=40 h=21 / viewBox 160×80) a un ratio ≈1.9, trop large pour les drapeaux (ratio ≈1.5). Solution : `background-size:contain` + fond noir pour pillarbox automatique.
- Ne jamais afficher la réponse dans le bouton d'aide TTS — texte fixe uniquement.

---

## Session 9 — 2026-03-16

### Fait
- [x] Renommage complet : mj-02b/03a/03b/04/05/06/07/08 → mj-03 à mj-09 + max-adventure
- [x] Menu index.html refait en 2 colonnes — Max Adventure pleine largeur, badge ★
- [x] CI deploy.yml : mj-07/ → max-adventure/
- [x] Valouettes V2/V3/V4/V5 ajoutées (data.js + ratp-colors.json + idfm.js)
- [x] idfm.js créé : 362 lignes IDFM complètes accessibles dans les jeux
- [x] MJ-03/08/09 : pool élargi aux 362 lignes IDFM
- [x] MJ-09 : mapping HSL auto → famille couleur pour les nouvelles lignes
- [x] MJ-09 : #C2A000 retiré d'orange_jaune, #704B1C (T7) ajouté à brun
- [x] docs/ratp-colors.json : 26 lignes actives (+ V2-V5), 362 en référentiel

### Leçons
- Jamais de `cp` en chaîne quand les noms de destination chevauchent les sources — toujours passer par /tmp
- idfm.js doit être régénéré depuis ratp-colors.json (node script) à chaque ajout de ligne

---

## Session 7 — 2026-03-16

### Fait
- [x] Inventaire complet des bus et jeux (fiche produit)
- [x] Créé docs/ratp-colors.json — couleurs+terminus IDFM officiels, 22 lignes
- [x] Créé .claude/skills/game-rules/bus-rules.md — skill règles bus immuables
- [x] Corrigé T7 couleur #C2A000 → #704B1C dans data.js
- [x] Corrigé 2234 terminus dans mj-05.html (Massy → Chessy)
- [x] MJ-04 : 90 phrases génériques, sans prénom, emoji=answer
- [x] MJ-06 layout mobile : slots min-height 60px, buses ne débordent plus en bas
- [x] MJ-08 layout mobile : boîtes min-height 55px, box-parked overflow:hidden

### Leçons
- ratp-colors.json doit être créé dès le début, pas référencé en commentaire avant d'exister
- Les terminus de bus doivent être vérifiés via API IDFM officielle (pas sites tiers)
- Les conventions pédagogiques (N15/N22 bleu nuit) doivent être documentées et ne pas être "corrigées" silencieusement
- Sur mobile portrait (<700px hauteur), les zones de jeu draggable doivent réserver de la hauteur pour les UI elements (header, progress, labels)

---

## Changelog sessions

### 2026-03-15 – Session 8 (apprentissage tileset LimeZu — 5 maps atomiques)
- **map-mockups.html** : Reset complet des 12 maps incohérentes. Infrastructure conservée.
- Pipeline pixel-map (simplifier → designer → reviewer) exécuté sur 5 maps :
  - M1 Route simple (7×5) → PASS 8/10 iter 1
  - M2 Parking (7×6) → FAIL iter 1 (7 tiles sidewalk identiques) → PASS 9/10 iter 2
  - M3 Bâtiment (7×7) → PASS 9/10 iter 1
  - M4 Arrêt de bus (9×5) → PASS 8/10 iter 1 (fixé : max 2 styles sidewalk par trottoir)
  - M5 Composite (9×9) → PASS 7/10 iter 1, fix MOYENNE-01 + BASSE-02 → intégré iter 2
- Leçons L-009 à L-012 documentées
- Règles tileset gravées dans drawLayeredMap() inline comments

### 2026-03-15 – Session 7 (busParade + MJ-04 phrases + map-mockups)
- **feedback.js** : `busParade()` ajouté — défilé de bus en victoire (scroll gauche→droite + klaxon)
- **MJ-01/02/02b/05/06** : `busParade()` appelé sur écran fin de partie
- **MJ-04** : Phrases mises à jour — vocabulaire varié (animaux, nature, famille) moins centré transport
- **map-mockups.html** : Outil de preview tiles Modern Exteriors 48×48 — maquettes quartiers Villejuif
- **settings.local.json** : Hook ExitPlanMode ajouté + hook Stop enrichi

### 2026-03-13 – Session 6 (corrections multi-jeux)
- **MJ-01** : Anti-doublons couleurs proches dans les 6 swatches (`selectDistinctColors`)
- **MJ-02** : Bus caisse en couleur ligne + numéro caché (`busSVGHiddenNum`) + anti-doublons
- **MJ-03b** : Emoji 🚌 → vrai SVG IDFM d'une ligne de Max (`busSVG`)
- **MJ-04** : Refonte complète — mots simples à deviner (BUS, TRAM, ROUGE...) + TTS auto + "Écouter"
- **MJ-05** : Filtré sur lignes connues de Max, 125→Porte de Gentilly (terminus corrigé), TTS après bonne réponse
- **MJ-06** : Refonte complète — bus SVG IDFM, garage colonne droite, drag & drop, porte animée
- **SandboxScene.ts** : snap à la route (tap sur l'herbe → point le plus proche), passagers sur les trottoirs
- **style.css** : overlay "🔄 Tourne ton téléphone" en orientation portrait
- **bus-svg.js** : `colorDistance()` + `selectDistinctColors()` ajoutés (utilisés par MJ-01 et MJ-02)

### 2026-03-13 – Session 5
- **Analyse architecture déploiement** : docs/ = 41 MB doublon mort, MJ-07 jamais déployé en prod
- **Refonte déploiement** :
  - `docs/` nettoyé (seuls les .md conservés, -41 MB)
  - `vite.config.ts` : base conditionnel `process.env.CI ? '/MaxPlay/mj-07/' : './'`
  - `site/mj-07.html` : message "localhost" → bouton "Jouer" vers `./mj-07/`
  - `HubScene.ts` : URLs `/site/mj-X.html` → `../mj-X.html` (prod-ready)
  - `deploy.yml` : workflow build Phaser + assemble `_site/` + deploy Pages
  - `.gitignore` : `_site/` ajouté
- **Résultat** : un seul `git push` déploie tout. MJ-07 accessible en ligne. Base solide long terme.

### 2026-03-07 – Session 1
Setup complet infrastructure. EP-001 terminé. Scaffold Phaser.js créé.

### 2026-03-08 – Session 2
- Correction nom Tom → Max dans tous les fichiers
- `docs/MAX_PROFILE.md` créé (19 lignes + couleurs IDFM)
- npm install, tsc 0 erreur, Vite 5 fonctionnel
- Hooks Claude configurés
- EP-002 décidé : flat arrondi · Villejuif + vie secrète · immersion bus · flotte + carte
- SandboxScene.ts codée (top-down prototype)

### 2026-03-10 – Session 3
- Hooks Claude activés (SessionStart confirmé)
- Revue complète architecture + pédagogie
- **Problème identifié** : jeux site v1 pédagogiquement cassés (réponse visible)
- **Architecture V0 décidée** : Option C (HTML quiz + Phaser sandbox)
- SVG bus side-view fourni par l'utilisateur → rangé + template dynamique créé
- `game/src/utils/bus-svg.ts` créé (createBusSvg, createBusDataUrl)
- Assets topdown triés : 27 fichiers utiles extraits de ~30 000
- `docs/ASSETS.md` créé (catalogue complet)
- 7 fiches mini-jeux V0 rédigées et validées
- Incohérence VISION.md (pixel art) vs BACKLOG (flat design) → flat design confirmé

### 2026-03-10 – Session 4 (soir)
- **BACKLOG.md mis à jour** avec les échanges utilisateur
- **Structure site/ nettoyée** – nouvelle architecture propre :
  ```
  site/
  ├── index.html          ← Hub menu (7 mini-jeux)
  ├── css/
  │   └── style.css       ← Styles partagés
  ├── js/
  │   ├── data.js         ← Lignes, mots, destinations
  │   ├── bus-svg.js      ← Générateur SVG bus
  │   ├── sounds.js       ← Web Audio API
  │   └── feedback.js     ← Feedback visuel/sonore
  ├── mj-01.html          ← Quelle couleur ?
  ├── mj-02.html          ← Quel numéro ?
  ├── mj-03a.html         ← Compte les passagers
  ├── mj-03b.html         ← La bonne place
  ├── mj-04.html          ← Lis le mot
  ├── mj-05.html          ← Quel bus ?
  └── mj-06.html          ← Au garage !
  ```
- **Ancien index.html v1** archivé dans `temp/site-v1-backup.html`
- **MJ-01 à MJ-06 fonctionnels** en HTML vanilla
- **MJ-07 (Phaser)** reste dans `game/` avec SandboxScene.ts
  - MJ-01 : Max connait 20 lignes par cœur (centaines incluses), TVM exclu
  - MJ-02 : Exclusion des lignes ambiguës (pas de question piège)
  - MJ-03a : Groupements visuels 2+3+3 (pas alignement linéaire)
  - MJ-03b : Calibrage difficile — Max maîtrise déjà la soustraction
  - MJ-04 : Phase 1 = mots simples (CACA, BUS, PAPA...) avant arrêts
  - MJ-05 : Trajets réels détaillés (Valouette, mamie, tata Sarah...)
  - MJ-06 : Places numérotées au sol, pas garage 3D
- Analyse assets `temp/` → 30k+ fichiers mais essentiels déjà dans `game/public/assets/`
