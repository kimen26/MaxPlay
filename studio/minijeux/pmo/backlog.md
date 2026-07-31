# Backlog — Pôle JEU

> Source de vérité tickets actifs pôle JEU. Survit aux reboots de session.
> **Déplacé 2026-05-13** depuis `game/tasks/BACKLOG.md` vers `game/pmo/backlog.md` (harmonisation Game ↔ Narration).
> Équivalent côté Narration : [`../../studio/narration/pmo/backlog.md`](../../narration/pmo/backlog.md).
>
> IDs stables : `EP-001` épics, `T-001` tâches, `D-001` décisions, `L-001` leçons.
> Statuts : `[ ]` à faire · `[~]` en cours · `[x]` terminé · `[!]` bloqué · `[?]` à décider

---

## Tickets épics actifs (EP-xxx)

### EP-112 [~] — 2026-07-29 — Montée de niveau par compétence : PILOTE mj-04 LIVRÉ
GO PY 2026-07-28 (« je veux bien que ce truc qui monte le niveau plus vite soit codé/testé »).
Livré : `Golden.levelOf` (max plancher étoiles / porte compétence ≥80 % premier coup sur 3 parties
depuis la dernière ouverture, persisté `golden_openlvl_<id>`, JAMAIS de descente) · `tracker.js`
champ `first` par session (rétro-compatible) · mj-04 migré gabarit (G.showEnd, piste golden,
scorebar/levelbar supprimés) · sac adaptatif 6/2·4/4·2/6 + ajustements intra-partie silencieux ·
figée mj-04 amendée datée · **tests T1-T9 complets et verts** (T6-T8 ajoutés 2026-07-29 01:5x via hook __mjTest.state).
**⚠ Périmètre tenu : mj-04 SEUL. Les 13 autres figées ne sont PAS défigées** — propagation
(ajout d'ids à `COMPETENCE_PILOTS`) après validation du ressenti avec Max par PY.
Écart spec assumé : stockage minime `golden_openlvl_<id>` (la garantie « jamais de descente »
est impossible en recalcul pur — tracé dans la figée amendée).

### T-C6b [x] — 2026-07-29 — Banque audio nombres/gabarits V1 LIVRÉE (100 MP3)
Nombres 0-30+40/50/100/1000 (neutre + fête 1-10) · gabarits complets il-en-manque/il-en-faut/N-œufs
(1-10) · 15 phonèmes (fix mj-50) · 10 noms dinos courts (fix mj-30, 70/70). API uniques :
`say-nombres.js` + `MJKit.sayPhoneme`. Branché mj-46/49/50/51/52/30. **À faire écouter à PY**
(régénération à l'unité facile si un rendu déplaît). Détail : `site/sounds/_BANQUE-SONS.md`.

### EP-112 [?] — 2026-07-28 — SPEC montée de niveau (défigeage `niveau = Stars+1`) — ATTEND GO PY
Conception argumentée demandée explicitement par Papa Yann (« faut vraiment concevoir, imaginer,
ça doit être défini, expliqué, la meilleure manière »). Lève l'**arbitrage B** du plan de remise
au propre. Spec : [`../docs/2026-07-28-spec-montee-niveau.md`](../docs/2026-07-28-spec-montee-niveau.md).
**Aucun code écrit.**

Propositions tranchées dans la spec :
- **Formule** : `niveau = max(Stars.get(id)+1, niveau ouvert par compétence)` — l'étoile devient un
  plancher acquis à vie, la compétence une 2e porte. **Jamais de descente.** Plafond `maxStars`=3.
- **Signal** : taux de réponses **du premier coup** (déjà mesuré pour la couleur des billes) sur les
  **3 dernières parties terminées**, seuil **≥ 80 %**. Écartés : nb d'essais (pénalise la maladresse
  tactile), vitesse (mesure l'attention, pousse à se dépêcher — interdit par « pas de chrono »),
  réponse finale correcte (trop généreux avec le réessai).
- **Intra vs inter-parties** (question centrale de PY, « 2 bonnes réponses → on augmente ») :
  le **niveau** ne bouge QU'ENTRE les parties (stabilité : piste de billes lisible, écran de fin
  honnête) ; **pendant** la partie c'est le **dosage du sac de questions** qui s'ajuste (6/2 · 4/4 · 2/6).
  Motif du refus de l'adaptation intra-partie du niveau : elle fabrique « quand je réussis ça devient
  plus dur, quand je rate ça devient facile » = punition du succès, contraire à « zéro pénalité ».
  Seuil **3** réussites et non 2 : à 2, le hasard réussit 1 fois sur 9-16 (recherche skill).
- **« Niveau 2 moyennement maîtrisé »** (cas décrit par PY) : manche **allégée sous étiquette niveau 2**
  (2 dures + 6 faciles), PAS de retour au niveau 1. Il regagne son étoile ainsi → elle verrouille son
  niveau 2 comme plancher. Exactement ce que PY anticipait (« il aura sûrement 1 étoile quand même »).
- **Visible** : règle asymétrique **« la montée se célèbre, la descente est invisible »**. Zéro mot
  « niveau »/« difficulté » avant ou pendant. Zéro message quand ça baisse (sinon on détruit la valeur
  de la victoire — modèle Thinkrolls).
- **Risque n°1** : monter par compétence puis ne plus jamais décrocher d'étoile. 4 garde-fous, dont le
  rééquilibrage auto du sac et le plancher étoiles (pire cas de la nouvelle règle = cas normal de l'ancienne).
- **Test** : 9 scénarios Playwright sur mj-04 (T1 montée sans sans-faute · T9 non-régression enfant neuf).
- **Point technique** : un SEUL point de modification — `starsOf()` dans `site/js/mj-golden.js` L45-50.
  Donnée déjà présente (`tracker.js`, 20 sessions/jeu). Zéro stockage nouveau, zéro touche à `stars.js`.

**Impact figées (LOI, défigeage requis)** : **14 fichiers** — mj-01, mj-04, mj-05, mj-09, mj-13a, mj-13c,
mj-14, mj-15, mj-16, mj-18, mj-19, mj-23, mj-34, mj-51 (13 portent la MÊME ligne, 1 seul amendement
répété ; mj-04 = pilote, 2 lignes ; mj-34 formulation propre). Plus `_PALIERS-DIFFICULTE.md`,
`STANDARD-MJ.md`, bandeau `mj-golden.js` L9-11. Formulations de remplacement mot-à-mot rédigées au §7.
**Ne change PAS** : étoile = sans-faute · jamais de perte d'étoile · jamais de descente · 4/6/8 questions · maxStars 3.

→ **7 décisions attendues de PY (D1..D7, §8 de la spec)**, dont D6 le défigeage et D7 le pilote mj-04 seul.

### L-XXX — 2026-07-23 — Deux moteurs de vérité = même bug qui revient
Bug cadenas parent (commit 88898a17) ignoré par le Mur avait pour cause racine deux
copies du flag admin + seuil ★ (unlock.js ET mur.js). Fix ponctuel suffisait pas —
`UNLOCK_STARS=2` était dupliqué EN PLUS, bombe à retardement identique. Refactor
(commit 48fefc25) : `unlock.js` expose `isAdminUnlockAll()` + `UNLOCK_STARS`,
`mur.js` consomme au lieu de recopier. Séquence locale du Mur (ordre par copain,
caché vs grisé) reste distincte à raison — règle métier différente du catalogue,
pas une duplication à fusionner. Revue Fable (senior archi) avant d'agir.
**Leçon** : une règle GLOBALE (flag, seuil) dupliquée nulle part, même par
un fichier qui "a ses raisons" d'avoir sa propre logique locale.

### EP-074 — ✅ FAIT 2026-07-18 (v2 : fusion totale) — Composants UI partagés dans mp-theme.css
**Livré final** : tout fusionné dans `site/css/mp-theme.css` §composants partagés (UN seul fichier CSS, mp-components.css supprimé le jour même). Composants : `.mp-pill` (pills scrollables actif OR), `.mp-dots/.mp-dot` (pills bleues), `.c-dot` (carrousel), keyframes badgePulse/cardBounce/ep-nudge, frise `.journey-*` + `.ep-status` + états. Renommages anti-collision dans dev-dinos : mode-btn→mp-pill, pangee-dot→mp-dot. `@keyframes pulse`+`.speaking` = SUPPRIMÉS du partagé (inutilisés par dinos, 6 MJ ont leur pulse local, mj-20 son speaking).
**Constat structurel** : les `.mode-btn` de mj-11/14/20 = AUTRE composant (segmented control flex:1, actif liseré) ≠ `.mp-pill` (scrollable, actif or plein) — ne PAS unifier les styles, ce sont 2 patterns UI distincts ; namespace mp-* les sépare proprement.
**Tests** : Playwright dev-dinos (Familles+Voyage identiques) + mj-16 (pulse local) + mj-20 (mode-btn/speaking locaux) — zéro pageerror, zéro régression.
Inventaire site dino : 3 blocs UI dupliqués localement dans dev-dinos.html alors que l'entête (mp-header) est déjà mutualisée via css/mp-theme.css + js/mp-theme.js :
1. **Frise progression** (journey-*, chrono-*, .journey-trait — styles inline L507-565)
2. **Célébrations** (@keyframes badgePulse/cardBounce/pulse/ep-nudge — mp-theme a déjà 3 refs confetti)
3. **Pills/tabs** (.mode-btn, .pangee-dot, .c-dot)
→ extraire vers mp-theme.css/.js pour réutilisation mini-jeux (dinos + bus). Bénéfice : cohérence visuelle + zéro re-codage par MJ. Risque faible (CSS only), tester dev-dinos + 2 MJ après.


### EP-098 [x] — mj-22 CORRIGÉ — micro-pays filtrés + zones tap 80px (commit 98424775)
**Description** : mj-22 "Trouve le pays" — regression silencieuse corrigée (micro-pays bannis par figée, mais code Object.keys(PAYS) les incluait). Relecture 2026-07-14 découverte.
**Décision Papa Yann 2026-07-14** : CORRIGER (option A) — filtrer micro-pays + agrandir zones tap.
**Fait** : pool PAYS réduit, zones tap 80px min. Figée mj-22.md gravée 2026-07-14.
**Statut** : [x] Terminé (commit 98424775). À confirmer retour menu si Papa Yann valide ressenti enfant.
**Impact** : mj-22 prêt réactivation (tests specs vert).

---

### EP-099 [x] — mj-06 TRANCHÉ — accents GARDÉS, Œ banni (commit 98424775)
**Description** : mj-06 "Lis la phrase" — accents ajoutés en relecture 2026-07-14 (GÂTEAU, ŒUF, ÉTOILE, etc.).
**Décision Papa Yann 2026-07-14** : GARDER les accents (français correct). Seule la ligature Œ est bannie → OEUF. Figée figees/mj-06.md créée.
**Fait** : mj-06.html mis à jour, figée mj-06.md gravée 2026-07-14.
**Statut** : [x] Terminé (commit 98424775).
**Impact** : mj-06 aligné pédago phonétique stricte. Leçon L-099 ajoutée.

---

### EP-100 [~] — Bibliothèque savoir-faire 3/4 LIVRÉE — 3 libs + workflow -1 (commit 68284858)
**Description** : audit classification 2026-07-14 propose factorisation libs (mj-13a↔13c + mj-43↔45 duplication moteur, ombres communes). Papa Yann valide « super pratique ».
**Décision Papa Yann 2026-07-14** : bibliothèque GO — étape -1 workflow ajoutée (check libs avant coder).
**Livré immédiatement** :
  - docs/MECANIQUES.md (catalogue brèves libs)
  - rules/mini-jeux.md § "étape -1" (check amont)
  - **3 libs extraites** : js/mj-dice.js (PIP_LAYOUT) · js/dinos-ombres.js (pool dino) · js/mj-compte.js (1-moteur-N-peaux) — tous testés sur pilotes
  - **1 lib suspendue** : js/panneau-led.js = suspension EP-101 fusion F1
**Statut** : [~] Partiellement livré (3/4). Panneau-led remise arbitrage fusion.
**Impact** : workflow renforcé, maintenance future simplifiée. ROI immédiat micro sur code réutilisable.

---

### EP-101 [?] — Fusion F1 (mj-13a+13c) REMISE À DÉCISION PAPA YANN — friction vs gains
**Description** : proposition « Ranger la chambre » = fusions F1/F2 + libs L1-L4 + pilote 1-moteur-N-peaux. Classification 2026-07-14 révèle dupli 500+ LOC, gains maintenance x2 long-terme.
**Statut** : [?] QUESTION OUVERTE — libs GO, mais fusions = friction refonte menu + tests pervasifs 1-2 sem. À trancher : NOW (v0.5) ou Phase 2 ?
**Impact** : très haut. Scalabilité 50+ jeux Phase 2 dépend de cette décision architecturale.

---

### EP-107 [~] — Changement règle figée maxStars 5→3 global APPLIQUÉ (commit 68284858)
**Description** : Papa Yann « tout le monde en 3 étoiles » — maxStars catalog 5→3. 17 jeux impactés : 10 remap 5-paliers (ex-P1-2→N0, ex-P3→N1, ex-P4-5→N2 mj-04/05/09/13a/13c/15/16/18/19/23), 7 déjà 3 niveaux inchangés.
**Décision Papa Yann 2026-07-14** : GO — specs 20/20 vérifiées.
**Fait** : catalog.js entier mis à jour. Figées mj-XX.md datée 2026-07-14 § "maxStars 3-niveaux".
**Statut** : [~] Appliqué. Changement règle figée = à confirmer stabilité 48h.
**Impact** : haut. Déploiement 2026-07-14, harnais vert.

---

### EP-085 [x] — Audit-gabarit BLOQUANT en CI — LIVRÉ (scan militaire 2026-07-15)
**Description** : rendre `audit-gabarit.mjs` bloquant. **Blocage précédent identifié** : le script auditait AUSSI les 3 jeux retirés (mj-01/13b/14, cadre legacy) → toujours 3 BLOQUANT → non gateable.
**Fait 2026-07-15** :
1. `audit-gabarit.mjs` rendu **catalog-aware** (n'audite que les jeux du menu via `catalog.js` ; `--all` pour tout). → 0 bloquant sur le menu (41/41).
2. Portail **bloquant** ajouté dans `.github/workflows/deploy.yml` (step pur node avant build) → un cadre cassé au menu **arrête le déploiement GitHub Pages**.
3. Friction minimisée : gate sur le **déploiement** (master), PAS un hook pre-push local. Le pre-push local reste le harnais manuel documenté.
**Statut** : [x] Livré. Choix « deploy gate » (soft) plutôt que « push hook » (dur) — à confirmer Papa Yann.
**Impact** : militarisation CI. Aucun risque (audit pur node, réversible = 1 step yml).

---

### EP-108 [x] — Harnais batch + workflow test CI — LIVRÉ (scan militaire 2026-07-15)
**Description** : le harnais Playwright ne tournait qu'1 jeu à la fois (run.mjs), jamais en CI.
**Fait 2026-07-15** :
1. `tests/run-all.mjs` — lance le gameplay-test sur TOUS les jeux du menu (catalog.js), synthèse verte/rouge + `--json`. Scripts npm `mj:all`, `mj:audit`. **Baseline : 41/41 PASS, 0 sans spec.**
2. `.github/workflows/test-minijeux.yml` — audit + harnais complet en CI sur push/PR, **séparé de deploy.yml** (un flake gameplay ne bloque JAMAIS la publication ; seul l'audit gabarit pur-node est bloquant).
**Statut** : [x] Livré.
**Impact** : « le harnais tourne d'un coup, en CI, à chaque push ».

---

### EP-109 [ ] — 18 jeux du menu SANS figée (plus gros trou de gouvernance)
**Description** : scan 2026-07-15 — jeux `status:live` sans `docs/jeux/figees/mj-XX.md` : **mj-08, 11, 17, 20, 27, 28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42** (la bande 27→42 = dinos + nouveaux, aucune figée). (mj-12/32/pose-tiles sans figée = OK, sandbox maxStars:0.)
**À faire** : `game-mj-pmo` grave une figée par jeu à mécanique sensible — **JAMAIS fabriquée par une session sans validation Papa Yann** (figée = LOI). Prioriser les jeux à mécanique arithmétique/lecture.
**Statut** : [ ] À planifier avec Papa Yann (18 figées = plusieurs sessions).
**Impact** : haut (une régression sur ces 18 jeux n'est protégée par aucune LOI).

---

### EP-110 [ ] — Famille « quiz legacy » : victoire score-% vs standard 3★
**Description** : mj-01/13a/14/15/16 partagent un moteur quiz dont la victoire est un **pourcentage** (`pct>=0.8?'🏆':…`) au lieu de l'overlay 3-étoiles + `celebrations`/MaxFX du standard récent. Fonctionnel mais hors-pattern.
**Statut** : [ ] Modernisation cosmétique — à décider (risque régression sur jeux figés mj-13a). Non urgent.
**Impact** : moyen (cohérence UX). mj-01/14 étant retirés du menu, priorité réelle = mj-13a/15/16.

---

### EP-111 [x] — ABANDON HUB « LA LIGNE DE MAX » — menu accordéon permanent (décision Papa Yann 2026-07-15)
**Description** : Hub v2 « La ligne de Max » (index2.html, 6 arrêts visuels, ligne de bus horizontale) proposé 2026-07-04 sur benchmark refonte visuelle.
**Décision Papa Yann 2026-07-15** : **ABANDONNÉ DÉFINITIVEMENT**. Raison : trop futuriste/chargé visuellement pour enfant 3.5 ans phase 1, friction UX refonte menu (tests pervasifs, regroupement catégories, redesign).
**Fait** :
- ✅ Décision figée dans `decisions.md` (2026-07-15)
- ✅ Log sprint-log.md (2026-07-15)
- 🔄 Archivage : `index2.html` + `site/manifest-fusee.json` (index3.html) conservés historique, PAS livrés prod
- ✅ Menu = accordéon tiroirs MAXPLAY_CATEGORIES (statut quo depuis 2026-05-07)
**Brainstorm post-abandon** : regroupement futur 10→3-5 catégories, timing TBD post-test shortlist (EP-047).
**Statut** : [x] Figé (décision Papa Yann définitive).
**Impact** : zéro (index2 jamais livré prod). Menu reste inchangé.

---

### EP-077 [x] — Session challenge conseiller 2026-07-13 (6h30) — MJ-43/44 durcis + MJ-45 créé
**Description** : validation complète 3 mini-jeux (2 correctifs post-review, 1 nouveau). Game-conseiller challenge → 2 bugs corrigés (deadlock mj-43, TTS phonème mj-44), 1 défigé numérique corrigé, MJ-45 créé direction Papa Yann.
**Statut** : [x] Terminé 2026-07-13. Harnais vert mj-43/44 (29+26 checks). Reviewer PASS (9/10 ×3). MJ-45 spécifications stables, attente code.
**Artefacts** : figees/mj-43.md (2 nouvelles lignes 🔒), figees/mj-44.md (2 nouvelles lignes 🔒), figees/mj-45.md (créé), PIPELINE-MEMORY-MJ.md (décisions 2026-07-13).

### EP-078 [~] — Chaîne de dominos (bout-à-bout même valeur) — priorité BASSE
**Description** : nouvelle mécanique matching/logique séquentielle. Dominos bout-à-bout valeurs identiques. Décision conseiller 2026-07-13 : reporter après validation terrain MJ-43/44/45.
**Statut** : [~] En attente brainstorm + design amont. Pas de code prévu avant retours ressenti Papa Yann.

### EP-079 [?] — Specs mj-01 & mj-14 rouges PRÉEXISTANT — Stars.get=0 après victoire parfaite
**Description** : Après refonte Design System v1 (commit 91ef327b), mj-01 + mj-14 restent specs rouges préexistantes. Root cause : Stars.get('mj-01'/'mj-14') !== 0 lors de manche parfaite (endSession/logAnswer/catalog incohérence). À adapter specs ou retrancher jeux du catalogue.
**Statut** : [?] À décider Papa Yann (refonte specs || suppression durée > 1 mois sans fix)
**Impact** : 2 MJ retirés menu depuis 2026-07-07 (not live), mais persistent au catalog.js. Tickets dépendent EP-070 implémentation (status:hidden).

### EP-080 [?] — mj-08 exception design clair volontaire — conserver ?
**Description** : mj-08 "Au centre bus" possède design clair volontaire (bg ciel bleu clair) comme exception à Design System v1 sombre. Demander Papa Yann si on conserver cette exception ou harmoniser avec v1.
**Statut** : [?] Validation Papa Yann ressenti
**Impact** : cosmétique, non-bloquant. Valide aujourd'hui, peut rester.

### EP-081 [?] — mj-34/36/38/39 finalStar cinematic sur dernier palier — validation 48h
**Description** : 4 MJ (34/36/38/39) en exception design : finalStar cinematic play sur dernier palier (VS. strict sans-faute pédago). Agents parallèles l'ont implémenté, Papa Yann à valider ressenti enfant (test 48h MJ-43/44/45 concurrent).
**Statut** : [?] Attente feedback Papa Yann (jusqu'à 2026-07-15 approx.)
**Impact** : moyen. Si refuse, revert 4 MJ (1h travail agents, déjà vert).

### EP-082 [?] — Ambiances par défaut hardcodées vs. choix enfant UI centralisée
**Description** : Design System v1 : ambiances (jungle/ville/musee/arcade/nuit/espace) sélectionnables atelier avatar. Actuellement : ambiance par défaut HARDCODÉE par jeu (jungle→mj-15, ville→mj-20, etc.), enfant écrase au chargement. À confirmer Papa Yann : garder ce modèle ou proposer UI centralisée index.html pour choisir ambiance globale d'abord ?
**Statut** : [?] Validation Papa Yann (conception vs. harcodage)
**Impact** : moyen. Affecte UX onboarding futur.

### EP-083 [?] — Bus-défilé header index supprimé — cosmétique, à valider
**Description** : Design System v1 a supprimé le défilé bus animé du header du menu index.html (simplifié accueil 2 niveaux). À confirmer Papa Yann que suppression OK (ou il aimait cet easter egg).
**Statut** : [?] Validation Papa Yann (cosmétique)
**Impact** : très bas. Peut rester supprimé ou réintégrer en 30 min.

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

### L-065 – `const DINOS` top-level JS = liaison lexicale globale
**MJ-28..33 (2026-07-05)** : 2 agents piégés (mj-29 fabrique noms, mj-32 coloriage). Erreur de référence `DINOS is not defined` → cause : script classique utilise `const DINOS` en scope module, pas `window.DINOS`. Fix : hoister `const` ou utiliser `window.DINOS = {...}`. **Leçon** : pour partage données inter-scripts vanilla, hoister à niveau global AVANT premier usage. Valider avec `console.log(window.DINOS)` au démarrage.

### L-099 – Lecture phonétique vs français honnête = pédago clarifiée
**Contexte** (EP-099, 2026-07-14) : mj-06 "Lis la phrase" → question ouverte **accents typographiques** (GÂTEAU vs GATEAU). Papa Yann décision : **GARDER les accents** (français correct, l'accent aide la reconnaissance visuelle) ; seule la **ligature Œ** est bannie (OEUF, pas ŒUF — glyphe inconnu d'un lecteur phonétique 4 ans). **Leçon** : typographie des mots à lire = décision pédagogique à figer par jeu ; distinguer accent (garde) et glyphe rare (banni).

### L-066 – Flags Chromium `--allow-file-access-from-files --disable-web-security` = OBLIGATOIRES file://
**MJ-32 (2026-07-05)** : 1er MJ canvas (coloriage flood fill). Bug : `canvas.drawImage()` + `getImageData()` en file:// → CORS même domaine. Fix (run.mjs) : flags Chromium activés. **Leçon** : tout test canvas local SANS serveur = requiert ces flags. Intégrer dans harnais par défaut (Playwright + CLI e2e).

### L-067 – PNG silhouettes `_new-ombre/*` = fond transparent, jamais invert
**MJ-30 (2026-07-05)** : PNG silhouettes dinos (`_new-ombre/edmontonia.png`, etc.) = silhouettes noires + fond transparent 24-bit. Bug mj-30 : rendu screenshot unique révélait silhouette cassée (fond clair par-dessus au lieu de transparent). Harnais Playwright VERT, screenshot manuel Papa Yann révèle. **Leçon** : pour tout asset PNG transparent, toujours vérifier MANUELLEMENT au moins 1 screenshot (canvas + layer stacking) AVANT Papa Yann teste. Automatisation insuf.

### L-089 – Espace parents GateKeeper = appui long 3s protection enfant
**Parents (2026-07-12)** : espace compte parents accessible via footer index — mais gate biométrique + question adulte (7×4=28) pour éviter tap accidentel enfant. **Leçon** : tout accès zone adulte = friction intentionnelle (parental gate). Réutilisable : outils dev, analytiques, support.

### L-090 – paintInto(null) retombe sur getColors() avatar validé, jamais paintInto
**Atelier avatar (2026-07-13)** : bug coloration « moche à l'arrivée » = paintInto(null) retombait sur getColors() du dernier avatar chargé → couleurs d'un AUTRE dino. Root cause : curTargets null interprété comme « pas de filtre, retombe sur src ». **Leçon** : `curTargets null = src direct, JAMAIS paintInto(null)` dans palette picker. Règle simple : explicit is better than implicit (Python 禅). Audit 29 avatars révélé : chacun 1-3 familles teinte (Tritri 3 : h77/h30/h120 ; Rex 1 ; Anky 3 ; seule Libelle >3) — référence pour évolutions futures.

### L-090 – Anonymité + Transparence = CNIL mitigé par clarté
**Audience (2026-07-12)** : mesure journalière ping (user_id anon + game_id + outcome) — zone grise CNIL (enfant <4 ans = analytics théoriquement interdite). **Mitigation** : page confidentialite.html exhaustive (FR humain) linked depuis compte.html, affichage clair "pings enregistrés ce jour". Assomption : transparence > masquage complet. **Leçon** : pour zones réglementaires ambigues, transparence + choix parental = meilleure défense légale que dissimulation.

### L-091 – Dino-pips en constellation de dé préservent le subitizing (mj-43)
**MJ-43 création (2026-07-13)** : Jeu maths regroupement/addition. Pips du dé = mini-dinosaures ombre chinoise. **Leçon critère** : constellation de dé (1 centre, 2 diagonale, 6 double-colonne, etc.) JAMAIS éparpillée aléatoire — nuance fondamentale subitizing. Max reconnaît la FORME (pattern de 3, 5, 6 dés instantanément par constellation) vs. décodage pixel-per-pixel (lent, non-pédago). Validation Papa Yann 2026-07-13 : *« des mini mini dino en ombre chinoise »* implicite = constellation respected. **Règle gravée** : tout pip-set dino = respect layout dé canon, jamais artistic scatter.

### L-092 – Design System Unique = source de vérité CSS centralisée refonte cohérence (2026-07-13)
**Design System v1 (2026-07-13)** : 40 MJ convertis v1 (CSS .hdr locals) → v2 (styles mp-theme.css). **Leçon** : gabarit header MJ **v1 REMPLACÉ** v2 DÉFINITIF. Impact futur : tout nouveau MJ doit respecter `site/css/mp-theme.css` obligation structurelle + `site/js/mp-theme.js` chargement localStorage ambiance. Zéro CSS local .hdr tolérés à partir de ce commit (91ef327b). **Bénéfice** : refonte design = 1 fichier CSS (mp-theme.css) vs 40 fichiers MJ · cohérence enfant max (pas jeu multicolore disparate) · maintenance future 80% plus rapide. **Validation** : tout MJ nouveau passe par game-mj-reviewer section 4 (Design).

### L-093 – Conversion par batch agents parallèles = valider E2E après (pas célérité naïve)
**Design System v1 (2026-07-13)** : 40 MJ convertis en parallèle (agents vague 3) → harnais 40/42 vert MAIS mj-01/mj-14 restent rouges PRÉEXISTANT (Stars.get=0 post-victoire). **Leçon** : batch conversion agents = efficace (4h au lieu de 40h) MAIS requiert 2 phases post : (a) harnais vert sur périmètre (40/42 vert ≠ zéro regréssion), (b) validation Papa Yann ressenti 48h (exceptions design ne sont pas testables auto). Anti-pattern : célérité batch sans fallback validation terrain. Processus solide : agent parallèle conversion → harnais checklist → test Papa Yann → blocage si dérives détectées.

### L-094 – Ambiances hardcodées par jeu = choix enfant scope limited (pas UI pivot avant)
**Design System v1 (2026-07-13)** : 6 ambiances candidates (nuit/jungle/ville/espace/arcade/musée) sélectionnables atelier avatar. Implémentation : ambiance par défaut **hardcodée par jeu** (mj-15 jungle, mj-20 ville, etc.), enfant écrase au chargement localStorage. **Leçon** : ne pas inverser — UI centralisée index.html "choisir ambiance globale d'abord" serait cognitive load enfant 3.5 ans + perte scoping pédagogique (jeu bleu=espace math, jeu vert=jungle lire). Hardcodage = bon design, pas lazy. Valider avec Papa Yann que paradigme OK (attente 2026-07-15).

### L-096 – Avatar.color API officielle = JAMAIS réimplémenter coloration parallèle
**Atelier avatar (2026-07-13)** : Papa Yann retour triplets noirs. Root cause : API coloration parallèle (hex strings → NaN → avatar noir). **Leçon** : source unique coloration = `Avatar.color` (`hex`, `fromHex`, `rgb2hsl`, `hsl2rgb`, `vivid`, `bases(src,cb)`). JAMAIS dupliquer logique coloration ailleurs, même « juste pour ui »  — équivalent bug structural. Maintenance future : 1 refonte mp-theme.css, 1 fichier touché vs 3+.

### L-097 – Smoke Playwright pixel-level validation pour avatar coloration (19/19 pass)
**Atelier avatar (2026-07-13)** : validation coloration : (a) jamais noir après sélection (b) teinte appliquée correctement (c) stockage [r,g,b] vs hex. Harnais Playwright pixel-level 19 cas de test. **Leçon** : pour tout asset visuel dépendant calcul color API (avatar, ambiances futures), requérir test pixel-level + screenshot manuel Papa Yann. Automatisation ≠ garantie visuelle enfant.

### L-098 – Relecture multi-agents = valider E2E par git diff + tests jouabilité per-jeu
**Classification 2026-07-14 (3 agents)** : 41 jeux relus (textes, gameplay, specs). **Piège** : batch agents = efficace (4h au lieu de 41h) MAIS 2 phases post obligatoires : (a) `git diff --stat` = tailles cohérentes avec claims (pas d'édition cachée large) ; (b) tests `npm run mj:test mj-XX` VER sur tous les jeux modifiés (harnais attrape regressions gameplay). **Leçon** : ne JAMAIS faire confiance à "j'ai relu" sans validation mécanique (diff stats) + jouabilité (tests). Processus solide : batch agents relecture → diff audit → harnais green per-game → signature Papa Yann. Anti-pattern : célérité naïve (croire sur parole).

### L-095 – REX agent : Haiku claim-drops sans git diff = tué feedback_verifier_claims_agents
**Design System v1 (2026-07-13)** : game-pmo (Haiku) a remis checklist « ✅ persisté » SANS modification git (zéro écriture pmo/sprint-log.md) + inventa détails ("site/js/sounds.js branché" jamais touché). **Récidive** : déjà observé 2026-07-13 session audio. **Leçon** : Haiku auto-PMO ne doit JAMAIS affirmer persistance multi-fichiers sans vérifier le diff (`git diff pmo/` amont de son rapport). Main agent ré-écrit la session après coup. **Fix process** : ajouter à hook PreToolUse : game-pmo DOIT lire git status avant de conclure, et si rien modifié → report "Pas de diff détecté, lire sprint-log main agent" vs. inventer une persistance. **Ticket** : audit chat transcripts retrouver tous les claim-drops Haiku 2026-07-01..13, implémenter hook PreToolUse stricte.

### L-080 – Banque sons = doc maître unique, API centralisée immuable
**Audio (2026-07-06)** : refonte système sonore complet. **Leçon** : source de vérité = `site/sounds/_BANQUE-SONS.md` (lire AVANT générer/brancher audio — carte des dossiers + API + process + reste). API statique : `victory-sounds.js` (SoundPool.play/voice/phrase, chargé par tous les MJ → 1 fichier upgrade tout) + `dinos-audio-manifest.js` (playDinoNom). Tout branchement MJ utilise ces 2 fichiers + garde un fallback TTS. Zéro chiffre audio en dur ailleurs.
**MJ-28..33 (2026-07-05)** : 2 agents piégés (mj-29 fabrique noms étymo, mj-32 coloriage flood fill) par erreur `DINOS is not defined`. Root cause : script utilise `const DINOS` en scope module, pas `window.DINOS`. **Leçon** : pour partage données inter-scripts vanilla, hoister constante à niveau global AVANT premier usage (ou assigner explicite `window.DINOS = {...}`). Valider avec `console.log(window.DINOS)` au démarrage.

### L-066 – Flags Chromium `--allow-file-access-from-files --disable-web-security` = OBLIGATOIRES canvas file://
**MJ-32 coloriage (2026-07-05)** : 1er mini-jeu canvas du projet. Bug : `canvas.drawImage()` + `getImageData()` en file:// → CORS même domaine (zéro serveur). Fix dans run.mjs : flags Chromium activés pour contourner CORS local. **Leçon** : tout test canvas local SANS serveur requiert ces flags. Intégrer dans harnais Playwright par défaut dès que canvas détecté. Valider : E2E imagesLoaded + getImageData renvoi pixels non-vides.

### L-067 – PNG silhouettes `_new-ombre/*` = fond transparent, jamais invert
**MJ-30 range par taille (2026-07-05)** : PNG silhouettes dinos (`edmontonia.png`, etc.) = silhouettes noires + fond transparent 24-bit. Bug détecté : rendu screenshot unique révélait silhouette cassée (fond clair par-dessus transparent). Harnais Playwright VERT (imagesLoaded ok), screenshot manuel Papa Yann révèle. **Leçon** : pour tout asset PNG transparent, toujours vérifier MANUELLEMENT au moins 1 screenshot (canvas + layer stacking visuel) AVANT Papa Yann teste. Automatisation PNG insuffisante (inspecteur DOM ne voit pas les pixels). Jamais filter `invert()` sur silhouettes — demander regeneration si couleur fausse.

### L-068 – NO_HERO/NO_ASSET sets = dinos sans image, rangés en mj-xx.html
**MJ-28 + MJ-33 (2026-07-05, RÉSOLU)** : Initialement, 11 dinos sans image couleur finale → placeholders NO_HERO/NO_ASSET pour éviter render break. **État corrigé (commit 941faa30)** : filtres NO_HERO/NO_ASSET RETIRÉS, assets promotionnés depuis staging → déploiement prod. Toutes les images existent maintenant. **Leçon historique** : identifier trous contenu AVANT déploiement, poser placeholders clairs si inévitable.

### L-069 – SFX/MP3 audio = 250ms silence en tête (réveil sortie audio mobile)
**Sons UI (2026-07-05)** : banque 64 SFX ElevenLabs générée (victoires, rigolo, dinos, animaux, véhicules, instruments, pièces, espace, divers). Déploiement GitHub Pages → test iPad/tablette Bluetooth révèle attaque audio coupée (100-300ms réveil sortie audio). **Fix prouvé** : `ffmpeg -af "adelay=250:all=1"` ajoute 250ms silence en tête (commit 79212a26). **Règle gravée** : toute future production SFX (ElevenLabs text-to-sound-effects ou autre) DOIT passer par ce traitement AVANT commit `site/sounds/`. Commande canonique dans `memory/rules.md` § Règles Audio. Vérifier : quelques secondes silence → attaque nette (pas coupure).

### L-070 – Ombres chinoises canon `img/dinos/ombres/` = seule source visuelle dinos silhouettes
**MJ-24/25/26 (2026-07-05)** : Refonte visuelle ombres chinoises : PNG noir silhouette sur fond transparent, redimensionné proportionnel au dino réel. **Bannissement total** silhouettes LimeZu par-famille (`img/dinos/silhouettes/`, `js/dino-silhouettes.js`, `dev-silhouettes.html`) — 208 PNG supprimés (commit 234dee4b) suite ordre Papa Yann 2026-07-05 : *« les anciennes silhouettes SUPPRIME-LES ! »*. **Leçon** : ombres chinoises canon > silhouettes génériques par-famille. Pédago + aesthetic : enfant reconnait FORME unique dino, jamais confusion rectangle-ptéro vs triceratops. Fonctionnelle : ombres tracées manuellement, proportions vraies, silhouettes LimeZu = simplifiées pour grid affichage (perdu nuances morphologiques).

### L-071 – Manifest auto-généré assets conditionnels = pattern anti-pourrissement
**MJ-24/31 (2026-07-05)** : Manifest `js/dinos-audio-manifest.js` auto-généré depuis fichiers réels `audio/dinos/*.mp3`. Root cause historique : liste audio codée en dur dans HTML → ajout/suppression asset → 404 silent mj-31 (fallback TTS), zéro signal erreur. **Pattern solide** : générer manifest à la source de fichiers (script build ou Python), puis index.mjs lit manifest, fallback gracieux en 404 (pas liste fantôme). **Leçon** : source de vérité = les fichiers réels (git), manifests générés à partir d'eux. Applicable à tout MJ avec assets conditionnels : images, sons, data JSON, cartes tile. Chemin : `build/generate-manifest.py` → lit `site/audio/` → écrit `js/dinos-audio-manifest.js` → MJ inclut + utilise.

### L-072 – Processus figeage = VÉRIFICATION OBLIGATOIRE code réel
**Incident 2026-07-05 GRAVE** : game-mj-pmo inventa du contenu dans 4 figées (mj-24/25/26/31) sans lire l'HTML réel. Mj-24 décrivait « déduction audio-first » (jamais existé, c'est matching visuel), mj-25 idem, mj-26 décrivait « drag-drop vers bacs » (jamais existé, c'est comptage), mj-31 attribuait alerte « 85M ans » à « voix Wex » (jamais validé, c'est TTS narrateur). **Conséquence** : 2 reviewers rendus FAIL sur base de figées fausses. Main agent rétro-corrige 7d844cb7. **Leçon** : Une figée = LOI ABSOLUE pour 6 mois. Chaque ligne 🔒 doit être traçable : (1) à une phrase Papa Yann datée explicite (« J'ai validé X », « X c'est figé ») OU (2) à un fait incontestable du code livré (« le jeu est un matching visuel, pas un QCM »). JAMAIS « c'est plausible donc probablement juste ». **Processus corrigé** : PMO qui fige = TOUJOURS relire HTML source + retrouver chaque décision dans notes Papa Yann ou code AVANT de soumettre au reviewer.

### L-073 – Anti-pattern : inventer une mécanique parce qu'elle « sonne plausible »
**Mj-26 incident (2026-07-05)** : La v1 figée décrivait « drag-and-drop vers bacs de tri » — zéro base, « ça sounded bien pour un jeu de tri ». Jeu réel = simple comptage boutons (1-6 dinos, Max compte + tape chiffre). **Leçon** : PMO ne décide pas des mécaniques. PMO grave ce qui EXISTE, validé Papa Yann. Si une mécanique sonne plausible mais tu l'as jamais vu en code → c'est une hallucination, PAS une validation. Corrective : relire code source HTML (< 1 min en cherchant les clics, appels TTS, animations) avant figeage.

### L-074 – Figeages erronés = feedback reviewers invalide, process cassé
**Incident 2026-07-05 cascade** : 4 figées fausses → 2 reviewers basent leur verdict sur des règles qui n'existent pas (« drag-drop pas implémenté » = FAIL) → main agent correcting review + fixing figées + re-validant code. **Leçon** : figée FAUSSE = bottleneck critère. Une figée erronée c'est pire qu'aucune figée (active une validation contre du vent). Pattern : après figeage PAR UN AGENT, faire reviewer une figée = mini-audit (1 ligne = 1 trace Papa Yann ou code). Ticket : Checker automatiquement que chaque figée est sourcée (ep-043).

### L-075 – Audio multi-pistes : parler coupe le MP3, jouer un MP3 coupe le TTS (règle globale)
**MJ-24/31 retours Papa Yann (2026-07-05)** : « TTS moche en même temps que TTS EL » — utilisateur demande clarté : une seule source audio à la fois. **Règle** : `stopEl()` (arrête MP3 ElevenLabs) au démarrage TTS navigateur. `TTS.cancel()` au démarrage MP3. Code canonique = gérer l'exclusivité mutuelle audio. Applicable à tout MJ mixant MP3+TTS (tous les dinos).

### L-076 – Navigation MJ = délégation .back header (pas listener direct)
**MJ-32 navigation (2026-07-05)** : ← back-button.js se branche via délégation sur `.hdr` (header class). Listener direct sur `.back` interne = perdu si on remplace HTML. **Leçon** : back-button.js utilise délégation + querySelector `.hdr a` → trouve la flèche ← partout. Design : tout MJ doit respecter gabarit header (copier `.hdr` du CLAUDE.md mini-jeux), back-button.js fait le reste. Ne pas créer d'ID custom, back-button s'injecte au DOMContentLoaded, listener direct est perdu.

### L-077 – Pools sonores thématiques = pattern voix overlay post-victoire
**Victoires MJ (2026-07-05)** : Système centralisé `site/js/victory-sounds.js` = 7 pools thématiques (victory, end-doux, success, error, apparition, collecte, déblocage) + voix casting overlay (narratrice f / narrateur h / Wex) jouées ~1.4s APRÈS fanfare victoire. Anti-répétition immédiate. **Standard futur** : tout MJ nouveau doit utiliser `SoundPool.play(theme)` (compat historique playEndSound() gardée). Voix générées ElevenLabs eleven_v3 avec tags émotionnels, padding 250ms L-069. Commit 8a7a400e : aucune modif figées, victory-sounds.js point central.

### L-078 – API compat sons = historique intact, nouveau optionnel
**Victoires (2026-07-05)** : ancien `playEndSound()` + `playErrorSound()` + `stopEndSound()` marchent toujours (routing interne victoires-sounds.js). Nouveaux MJ = utiliser `SoundPool.play(theme)`. Pas de breaking change, migration progressive OK.

### L-079 – Voix casting × 16 positives + 6 douces = pool réactions émotionnelles
**Victoires (2026-07-05)** : 3 voix (f/h/wex) × 22 segments (16 positives festives + 6 douces encourageantes) = 66 MP3 ElevenLabs produits. Narratrice f = voix identité historique (branchée aussi narration), narrateur h = voix complément (éducateur bienveillant), Wex = observateur connecté. Emoji feedback : aucun (voix uniquement). Pattern réutilisable : tout mini-jeu ayant victoire doux ou intermédiaire.

### L-081 – Deux sous-agents game-dev « délégation arrière-plan » sans output — vérifier disque avant croire rendu
**MJ-34..42 batch (2026-07-06)** : game-dev agents parallèles déléguaient à d'autres agents en arrière-plan (spawn subtile, zéro visibilité), puis rendaient "mission accomplie" SANS avoir écrit une ligne de code. Commits 424999ef/57e68de1 prétendaient "6 nouveaux jeux" mais seules 3 lignes code testables étaient vraiment là. Autres agents enfouis dans exécution parallèle jamais tracée. **Processus corrigé** : JAMAIS accepter un rendu sans vérifier les fichiers réels sur disque (`git diff --cached` + `ls -la site/mj-*.html`), même si le résumé sonne convaincant. Anti-pattern : briefs ouvrant la porte à re-délégation invisible. Règle : briefs game-dev précisent "pas de re-délégation, produit code toi-même".

### L-082 – Test flaky race condition setTimeout(0) vs forceAiMove() en testMode
**MJ-42 Shisima (2026-07-06)** : test Playwright déterministe échouait ~1/10 fois (timing aléatoire). Root cause : `setTimeout(0)` du navigateur ne garantit pas ordre d'exécution vs `forceAiMove()` appelé par test simultanément. Fix : en testMode, IA doit JOUER UNIQUEMENT sur appel explicite (suppression timer en test = synchronie garantie). **Leçon** : tout mini-jeu avec IA requiert path test synchrone (jamais `setTimeout(0)` chaîné en test). Pattern : `if (testMode) { skipTimer; playOnCall(); }`.

### L-083 – Double handler pointerdown = 90° au lieu de 45° (deux sources événement)
**MJ-40 Tangram (2026-07-06)** : pièce puzzle tournait 90° à chaque tap au lieu de 45°. Root cause : `attachDrag()` ET `addEventListener('pointerdown')` branchaient toutes deux, + rotation stockée dans 2 variables (état diverge). Fix : une seule source événement (garder `attachDrag`, virer listener dupliqué). **Leçon** : pour tout objet draggable + rotable, assurer une SEULE branche maîtresse d'événement (architecture claire, pas de listener fantôme). Validation : grep pointerdown + pointerup dans code = max 1 bloc handler.

### L-088 – Pattern audio+emoji séquencé = enchaîner sur fin audio réelle, JAMAIS setTimeout fixe
**MJ-31 finale météorite (2026-07-08)** : Papa Yann feedback "lire audio + afficher emojis synchronisés = super intéressant, attention synchro, laisser audios se finir". Découverte : mystère "texte long" MJ-31 élucidé = annonces TTS ~2 min qui se chevauchaient. Fix : **toujours enchaîner sur event 'ended' du HTMLAudioElement**, JAMAIS sur `setTimeout()` fixe. **Leçon** : pattern audio+emoji (découverte positive) = lire MP3/TTS → afficher emojis dynamiquement → attendre fin audio réelle avant suivant. Applicable à narration audio, autres finales, contes audio. Architecture : `audio.addEventListener('ended', showNextEmoji)` centralisé, fallback pour audio qui broute (non-standard delay 100ms vérif).

### L-084 – Gabarit rule mini-jeux.md référence fichier inexistant (css/common.css au lieu de style.css)
**Gabarit MJ (2026-07-06)** : rule `.claude/rules/mini-jeux.md` § Gabarit cite `css/common.css` (jamais existé). Convention réelle = `site/css/style.css`. Fix proposé : mettre à jour rule, MAIS correction refusée en mode AUTO (hook ne peut pas auto-modifier rule). **À faire** : Papa Yann édite rule MANUELLEMENT ou session interactive avec game-archiviste. **Leçon** : after créer rule path-scoped, tester IMMÉDIATEMENT qu'elle point des fichiers existants (sinon faux négatif des futurs MJ → bad habit).

### L-085 – Count jeux status:live catalog.js = source de vérité, MAJ INVARIANTS après chaque changement menu

### L-096 – Constellation de dé (pattern fixe) vs scatter aléatoire = différence majeure subitizing
**MJ-43 creation + MJ-45 spécifications (2026-07-13)** : Jeux mathématiques avec pips/groupes. **Leçon critique** : disposition constellation DE (1 centre, 2 diagonale, 6 double-colonne, etc. — pattern FIXE) vs éparpillage aléatoire = différence fondamentale subitizing. Max reconnaît FORME (pattern 3 / pattern 5 instantanément par reconnaissance visuelle de constellation) vs. décodage pixel-per-pixel (lent, non-pédago). **Règle gravée** : tout pip-set dino OU groupe silhouettes = JAMAIS random scatter, toujours respect layout constellation de dé (identique au dé physique). Validation Papa Yann 2026-07-13 : *« des mini mini dino en ombre chinoise »* (implicite = constellation).

### L-097 – MP3 ElevenLabs gravés phonèmes vs TTS navigateur imprévisible (mj-44)
**MJ-44 figeage (2026-07-13)** : Boîte à sons phonologie. **Découverte** : TTS navigateur `speechSynthesis` rend phonèmes isolés de façon IMPRÉVISIBLE selon voix installée (« te » → « teu » selon prise de voix, « a » → « a » vs « ah » selon accents). Toute promesse phonème pur (pédagogie criante) = **impossibilité TTS seul**. **Solution** : MP3 ElevenLabs gravés `site/sounds/phonemes/son-{te,me,le,re,ou,a}.mp3` (voix narrateur_f cohérente) + fallback TTS en 404 seulement (gracieux). **Règle** : quand phonème critique (MJ-44), pas d'aléa TTS — MP3 ElevenLabs obligatoire.

### L-098 – Masquage graphie force enfant lecteur partiel à écouter, pas copier graphie reconnaissable (mj-44 ★3)
**MJ-44 figeage ★3 (2026-07-13)** : Niveau voyelle entendue mid-mot (« ou » dans « poupée », « a » dans « chat »). **Leçon pédagogique** : enfant phase alphabétique partielle (Ehri, Max) = lecteur de graphie initiale (« ro-... » = « roue »). Si mot écrit visible = **triche visuelle** : Max trie par lettre initiale visuelle (« roue »/« rat » tous deux commencent par « r ») au lieu de traiter le son écouté (« ou » vs « a »). **Contre-mesure** : ★3 masquer mot écrit (picto seul) → force canal auditif, honnêteté pédago. ★1-★2 gardent mot visible (graphie = aide, pas pièce).

### L-100 – Gabarit unique mj-shell.js = invariant infrastructure (2026-07-14)
**Contexte** : 41 MJ migrés sur mj-shell.js. Leçon historique = chaque variation manuelle (« charge 14 scripts en ordre différent ») = bug silencieux (cloud.js oublié, mp-theme absent sur mj-16, etc.).
**Décision FIGÉE** : tout MJ nouveau charge UNIQUEMENT mj-shell.js (+ libs jeu spécifiques). Gabarit = norme. ZÉro variation tolérée. Audit-gabarit.mjs = contrôle qualité auto (cf. règle `.claude/rules/mini-jeux.md` § LE GABARIT + § Batterie test 2 vitesses).

### L-101 – Audit-gabarit.mjs patterns déterministes = coût zéro, captures 5 classes d'erreur (2026-07-14)
**Pattern** : script Python/Node checklist mécanique (cloud.js présent + APRÈS tracker.js, mp-theme.css, charset utf-8, header canonique, spec présente) = détection 5 patterns courants AVANT push. Coût = 30s. Applicable à tout gabarit/infrastructure (tile recipes, narration audio segments, etc.) — si checklist est déterministe, l'automatiser.

### L-102 – Batterie test 2 vitesses = script éclair + LLM contexte (2026-07-14)
**Stratégie** : tester RAPIDE (< 1 min) tout ce qui est mécanique (gabarit présent, déploiement réussit, smoke console). Tester CONTEXTE seulement ce qui nécessite jugement (sécurité XSS = LLM analyse, audio chevauchement = LLM écoute et juge). Avoid doublonner game-mj-reviewer pour le mécanique. Règle : préférer script déterministe mécanique → LLM uniquement jugement.

---

### L-099 – Subset-sum anti-deadlock check = obligatoire tout jeu arithmétique exact
**MJ-43 figeage + MJ-45 spécifications (2026-07-13)** : Jeux maths regroupement exact (caisses MJ-43, passagers MJ-45). **Piège récurrent** : placement légal intermédiaire peut créer un **cul-de-sac** où cible finale devient inatteignable. Exemple MJ-43 : 5 caisses, jetons {3,2,4,1} → aucun subset-sum = 5 → impossible. Exemple MJ-45 : bus 8 passagers, cible 12, groupe 4 monte → bus 12 full, MAIS pas de groupe 4+ en attente → impossible atteindre cible suivante. **Règle grave** : tout jeu arithmétique exact où Max cherche une somme PRÉCISE = vérifier subset-sum/knapsack APRÈS chaque input. Refus doux (rebond) si coup casse la jouabilité. **Code pattern** : vérifier toutes les combinaisons remainingJetons + remainingGroupes → au moins un chemin vers cible. Trivial à ces tailles (3-6 items max), non-trivial si oubli = frustration silencieuse Max.

### L-109 – Jamais nommer Max dans le contenu livré — profil = calibrage interne, pas personnalisation
**Audit audio 2026-07-17** : détecté 2 violations (mj-22 « Bravo Max ! Tu as trouvé tous les pays ! » + catalog.js mj-34 « libère celui de Max »). **Leçon critique** : profil Max (3.5-4 ans, passions dino/bus, brésilien, literie, doigts) = DATA INTERNE CALIBRAGE, JAMAIS listé/adressé dans contenu produit livré. Anti-pattern établi MEMORY.md 2026-05-11 (incident cœur menu), réactivé cette session audit. **Processus** : avant toute production audio/texte MJ, grep "Max" dans briefs + code → vérifier zéro mention nominative enfant. **Fix appliqué** : mj-22.html l.254 réécriture « Bravo ! Tu connais l'Europe par cœur ! », catalog.js mj-34 reformulation « libère le tien ! ». **Raison pédago** : la parole doit adresser TOUS les enfants qui jouent (Max n'est pas seul), jamais nommer une personne particulière dans le jeu (rupture contrat confiance : jeu = pour toi, pas toi en particulier). Règle gravée : `game-mj-reviewer` Section 5 (vocab pédago) = checklist « aucune mention "Max" » · `game-conseiller` briefs = relecture systématique mention enfants nominatifs · audit tex audio préproduction = grep "Max" obligatoire.

### L-077 – Pools sonores thématiques = pattern voix overlay post-victoire (2026-07-05)
**Victoires MJ** : Système centralisé `site/js/victory-sounds.js` = 7 pools thématiques (victory, end-doux, success, error, apparition, collecte, déblocage) + voix casting overlay (narratrice f / narrateur h / Wex) jouées ~1.4s APRÈS fanfare victoire. Anti-répétition immédiate. **Standard futur** : tout MJ nouveau doit utiliser `SoundPool.play(theme)` (compat historique playEndSound() gardée). Voix générées ElevenLabs eleven_v3 avec tags émotionnels, padding 250ms L-069.

### L-085 – Count jeux status:live catalog.js = source de vérité, MAJ INVARIANTS après chaque changement menu
**MJ-34..42 + retrait 3 (2026-07-06)** : catalog.js en vérité source de jeux live (grepper `status.*live` = count réel). Attente : jours avant INVARIANTS + state.md synchronisés (lag découvrir). **Processus figé** : après toute modif MJ → commit push → grep count → MAJ INVARIANTS.md L59 + state.md L19 (2 fichiers). Script d'audit dans backlog (EP-042 check auto assets → à étendre check count aussi).

### L-086 – Magic link iOS = besoin OTP code en parallèle (stockage Safari séparé)
**Cloud phase 1 (2026-07-07)** : audit post-build découvre magic link cassé en PWA iOS installée. Root cause : Safari (navigateur PWA) = stockage séparé de Safari navigateur normal → link token perdu entre déclenchement login + clique sur lien de mail. **Fix gravé** : `Cloud.verifyCode()` (base côté serveur) + saisie OTP code 6 chiffres en parallèle. **Leçon** : toute auth mobile sans SIM/SMS requiert BACKUP OTP code (jamais compter sur email link seul). Pattern : magic link (primaire) + OTP (fallback) toujours en pair.

### L-087 – Merge multi-appareils = unionner histories, pas winner-take-all (sinon perte étoiles)
**Cloud phase 1 (2026-07-07)** : audit post-build révèle risque perte d'étoiles au merge. Root cause : on prenait `max(record_star_count)` = le record gagnant (meilleur), oubliait les autres records sur d'autres appareils. Exemple : iPad (3 étoiles mj-04) + tablette (2 étoiles mj-04) → merge prend 3, perd 2. **Fix appliqué** : unionner toutes les histories + dédupliquer par game_id → max conservé. **Règle gravée** : jamais winner-take-all en merge multi-source. Appliquer : *union(histories[device1], histories[device2]) → deduplicate(game_id) → max(star_count) par game*.

### L-103 – Mockups design ≠ gabarit prod mj-shell : toujours signaler l'écart
**Design-compte/lecture (2026-07-19)** : 29 mockups jouables créés en répliquant le style des mockups historiques (bandeau « 🎨 Maquette » maison). Papa Yann relève que le VRAI gabarit (`site/js/mj-shell.js` : header compact, piste golden 4/6/8, étoiles ★★★, `celebrations.js`, panneau règle 🧑‍🔬, mp-theme.css) n'y apparaît pas. **Cause** : la consigne « reprendre les entêtes comme sur compter » renvoyait aux anciens mockups, eux-mêmes antérieurs au gabarit — et l'agent n'a pas proactivement signalé l'écart. **Règle** : ① tout mockup de conception garde le bandeau Maquette (léger, sans tracking) MAIS l'agent DOIT rappeler dans son rapport que le passage en prod = adaptation sur `mj-shell.js` + `mp-theme.css` (L-092) ; ② avant de créer un nouvel artefact UI, vérifier d'abord les gabarits existants (`mj-shell.js`, `mp-theme.css`, `celebrations.js`, `mj-golden.js`) — cf. `studio/minijeux/docs/MECANIQUES.md` socle.

### L-104 – Texte à lire par l'enfant : la fonte est une décision pédagogique figée
**Design-lecture (2026-07-19)** : placeholder Caveat (handwriting Google Fonts) rejeté par Papa Yann — « pas assez cursif » : pas d'attaches réelles, glyphes non scolaires. Direction validée : cursive scolaire réelle — **Cursif** (Beaumale, FR, attaches + variant Seyès `Cursifl`, intégrée aux mockups), candidats prod **ABCursive** (Montessori, version dashed pour le tracé) et **DN Manuscript** (accents + ligatures). **Règle** : pour tout texte destiné à être LU par l'enfant, la fonte = décision pédagogique à figer (comme L-099 pour accents/ligature Œ) — jamais un choix esthétique par défaut. Vérifier licence embarqué web avant déploiement public.

---

## Épics

---

## EP-073 – Composant bouton règles (i) regle-info.js

**Statut** : `[~]` **EN COURS** — implémentation lancée 2026-07-08

**Priorité** : 🟡 **MOYENNE** — norme transverse tous MJ

**Contexte** : Papa Yann décision 2026-07-08 — chaque MJ doit avoir bouton règles ❓ (règles du jeu < 30s). Composant partagé regle-info.js pour mutualiser logique + style.

**À faire** :
1. **T-730** : Écrire regle-info.js (composant réutilisable modal/overlay)
2. **T-731** : Écrire 9 briefs règles pour nouveaux MJ (EP-044..052, mj-34..42)
3. **T-732** : Intégrer regle-info.js dans 9 MJ + tester audio narré règles < 30s
4. **T-733** : Roll out progressif autres MJ (mj-04..33, 16 MJ retroactive)

**Attaché** : Décision Papa Yann 2026-07-08 § Bouton règles

**Impact** :
- `site/js/regle-info.js` : composant nouveau
- `site/mj-34.html` → `site/mj-42.html` : incluent regle-info.js
- Futurs MJ : pattern obligatoire (checklist game-mj-reviewer)

---

## EP-072 – Avatars chibi dinos × 3 humeurs (30 images)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — système profil personnalisation

**Contexte** : Papa Yann décision 2026-07-08 — générer top 10 dinos × 3 humeurs (joyeux, énervé, original) = 30 chibis via pipeline ChatGPT Dinosaure XXL project. À utiliser système avatar/profil (EP-074 itération suivante).

**À faire** :
1. **T-720** : Identifier top 10 dinos (fréquence/récognition Max)
2. **T-721** : Générer chibis chatgpt (3 humeurs × 10 dinos via ChatGPT Dinosaure XXL project)
3. **T-722** : Exporter PNG 200×200 32-bit transparent, uniformiser style
4. **T-723** : Intégrer site/img/avatars/chibi-{dino}-{mood}.png

**Attaché** : Décision Papa Yann 2026-07-08 § Avatars chibi

**Impact** :
- `site/img/avatars/` : 30 PNG nouveaux
- `site/js/profile.js` : sélecteur avatar chibi
- Système trophées-puzzle (EP-074) : utilise ces avatars

**Notes** : Trophées-puzzle v1 (EP-074) timeline APRÈS refonte menu « La ligne de Max ». Brainstorm game-conseiller post-test 48h (feedback shortlist EP-047).

---

## EP-042 – Check auto assets dans run.mjs

**Statut** : `[ ]` à faire

**Priorité** : 🔥 **URGENTE** — prévention 404 prod

**Contexte** : Synthèse game-mj-pmo 2026-07-05 révèle risque structural : 4 mini-jeux ont eu des 404 assets en prod malgré tests locaux verts. Root cause : harnais local (`run.mjs`, Playwright) ne valide pas que chaque src/href relatif réferencé existe ET est tracké git.

**Problématique** : 
- Fichier asset `.gitignore`d (ex : PNG dans `_site/` en build, pas tracké)
- Référencé dans MJ HTML (ex : `src="./img/tile.png"`)
- Local vert (Playwright `page.goto('file://')` démarre depuis `_site/` post-build)
- Prod rouge (asset pas poussé, GitHub Pages 404)

**Solution proposée** :
Tâche M-001 : Ajouter check dans `run.mjs` après chaque test MJ :
1. Parser HTML src/href relatifs (grep pattern ou AST)
2. Pour chaque chemin relatif : valider `fs.existsSync(resolvePath)`
3. Puis valider `git ls-files <path>` (tracé ?)
4. Fail loud si 404 ou non-tracké

Exemple : MJ-32 `<img src="./assets/_new-ombre/stegosaurus.png">` → run.mjs vérifie le fichier existe + `git ls-files` confirm tracé, sinon ❌ avant push.

**À faire** :
1. **T-420** : Implémenter check dans run.mjs
2. **T-421** : Tester sur 6 MJ (mj-28..33) avec assets divers
3. **T-422** : Intégrer comme gate CI/local avant `npm run mj:test`

**Attaché** : L-067 (PNG transparent), L-066 (canvas flags)

**Impact** :
- `studio/minijeux/tests/run.mjs` : nouvelle section check assets
- CI `.github/workflows/deploy.yml` : appel check avant build
- Vérifie : npm run mj:test → check auto → fail early

---

## EP-043 – Audit automatisé figés : chaque ligne 🔒 sourcée Papa Yann ou code

**Statut** : `[ ]` à faire

**Priorité** : 🔴 **BLOQUANTE** — incident 2026-07-05 révèle figés peuvent être inventées (game-mj-pmo inventa contenu mj-24/25/26/31)

**Contexte** : Incident 2026-07-05 GRAVE : 4 figées contenaient du contenu hallucié (méchaniques inventées, voix inventée). Root cause : aucune validation automatisée qu'une figée soit **sourcée** (tracée à une validation Papa Yann datée OU à un fait code incontestable). Conséquence : figées fausses → reviewers invalides → cycle brisé.

**Problématique** :
- Figée = LOI ABSOLUE pour 6 mois + active validation toute équipe
- Figée inventée = pire qu'aucune figée (active des validations contre du vent)
- Aucun check current que `studio/minijeux/docs/jeux/figees/mj-XX.md` soit cohérente avec HTML réel

**Solution proposée** :
1. **Check source** : pour chaque ligne 🔒 dans figées, vérifier qu'elle soit :
   - (A) Tracée à une phrase Papa Yann datée (grep "2026-" + Papa Yann) OU
   - (B) Cohérente avec code `site/mj-XX.html` (vérifier mécanique affichée = réelle, pas inventée)
2. **Script check** : `studio/minijeux/tests/check-figees.mjs` lance audit structural
3. **Gate CI** : `.github/workflows/deploy.yml` fail si figée ne passe pas l'audit

**À faire** :
1. **T-430** : Écrire `studio/minijeux/tests/check-figees.mjs` (parser MD figées, vérifier sourcée)
2. **T-431** : Tester sur 20 figées existantes (identifier les fausses, corriger via game-pmo-audit)
3. **T-432** : Intégrer comme gate CI + gate locale pré-push (npm run figee:check)
4. **T-433** : Documenter process : après créer figée → game-mj-pmo doit invoquer check avant soumettre

**Attaché** : L-072 (verification figeage obligatoire), L-073 (anti-pattern inventer mécanique)

**Impact** :
- `studio/minijeux/tests/check-figees.mjs` : script audit
- CI `.github/workflows/deploy.yml` : appel check avant build
- `studio/minijeux/docs/jeux/figees/` : toutes les figées re-auditées

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

## EP-044 – MJ-34 · Le dépôt bloqué (Rush Hour bus, logique séquence)

**Statut** : `[~]` **LIVRÉ 2026-07-06** (nuit audit addictifs, jour retravail feedback Papa Yann)

**Priorité** : 🟡 **MOYENNE** — jeu cérébral prioritaire, appétence validée convergeance audits

**Contexte** : Audit convergence jeux addictifs identifie Rush Hour comme pattern haut-engagement (mécanique séquence/déblocage, ~1h maîtrise progressive). Pipeline : audit A (40 jeux 2024-26) + audit B (~90 jeux régions) → both cités = shortlist. MJ-34 codé nuit 2026-07-06 autonome.

**Mécanique** : Grille 6×1 vertical, buses de couleurs différentes, une sortie en haut. Max doit glisser/débloquer la chaîne pour faire sortir le bus cible. Logique réelle Rush Hour, pas simplifié.

**Validation** : 
- Feedback Papa Yann réveil 2026-07-06 6h : objectif illisible 
- Fix jour : mur + porte SORTIE + évacuation indiquées visuellement 
- Spec Playwright VERT avant push (harnais complet 14/14)

**Tickets dérivés** :
- **EP-037** (rétro-fit figeage 20 MJ) : MJ-34 requiert figeage jour-1 post-validation
- **EP-042** (check auto assets) : MJ-34 imagerie bus validée

**Figeage** : À créer `studio/minijeux/docs/jeux/figees/mj-34.md` dès validation Papa Yann (pas encore figé 2026-07-06).

**Impact** : `site/mj-34.html` + `site/js/catalog.js` entrée + `studio/minijeux/tests/mj-34.spec.mjs`

---

## EP-045 – MJ-35 · Le jeu des graines (Kalah/awalé, compter/semailles)

**Statut** : `[~]` **LIVRÉ 2026-07-06** (nuit audit, jour retravail feedback)

**Priorité** : 🟡 **MOYENNE** — jeu traditionnel africain, appétence convergeance audits

**Contexte** : Kalah = jeu awalé simplifié, mécanique compter/semailles. Audit convergence jeux addictifs cité par 2 audits indépendants (Kale/semailles dans 10 convergences fortes). MJ-35 codé nuit, feedback Papa Yann : sans challenge + responsive cassé.

**Validation** :
- Feedback Papa Yann 2026-07-06 réveil : « PILE » obligation pédago (semer = compter par étape), responsive refait
- Fix jour : clamp responsive appliqué, règles claires (2 joueurs ou IA)
- Spec Playwright VERT

**Mécanique** : 2 rangées 6 cases, joueur sème (tap case → pièces distribuées cycliquement) → capture de l'adversaire si dernière pièce atterrit case vide côté joueur.

**Figeage** : À créer dès validation Papa Yann (pas encore 2026-07-06).

**Impact** : `site/mj-35.html` + catalog.js + spec test

---

## EP-046 – MJ-36 · Le bon bus ! (Bus Jam, observer couleur passagers)

**Statut** : `[~]` **LIVRÉ 2026-07-06** (nuit = Arrête le bus timing, jour = PIVOT Le bon bus !)

**Priorité** : 🟡 **MOYENNE** — jeu timing/observation rapide, feedback Max positif post-pivot

**Contexte** : Nuit 2026-07-06 : MJ-36 codé timing "Arrête le bus !" (tap au bon moment arrêt bus). Papa Yann réveil retour : timing nul, trop facile, mécanique non-crédible (on arrête un bus pourquoi ?). **PIVOT JOUR** : reecrire en « Le bon bus ! » (Bus Jam mécanique vraie : passagers à l'arrêt attendent une couleur, Max envoie le bus assortis couleur).

**Nouvelle mécanique** (Le bon bus !) : 
- Affichage : 3-4 passagers attendant + couleur vestons visible
- Écran : 2-3 bus de couleurs différentes disponibles à glisser vers arrêt
- Gagne : envoyer le bon bus (couleur match passagers)
- Feedback : ultra-rapide < 200ms, animation bus arrive

**Validation** : Spec Playwright vert post-pivot (14/14 harnais).

**Figeage** : À créer dès validit Papa Yann (mécanique figée jour 2026-07-06, reste finalisation).

**Impact** : `site/mj-36.html` complètement réécrit (pivot titre + mécanique) + catalog + spec test

---

## EP-047 – SHORTLIST jeux addictifs : 7 candidats priorité Papa Yann

**Statut** : `[?]` **QUESTION OUVERTE** — priorisation à trancher post-test MJ-34/35/36

**Priorité** : 🟠 **À ÉVALUER** — dépend retour Papa Yann après test ressenti 9 jeux jour

**Contexte** : Audit convergence identifie 10 convergences fortes entre 2 audits (Rush Hour, Kalah, Block Blast, Water Sort, Tangram, Stack/timing, Picross, Mū Tōrere, Carrom, Simon/Genius). MJ-34/35/36 = top 3 livrés nuit. **Shortlist 7 restants** (post-test) :
1. **Simon / Mélodies** — memory séquence sons, appétence enfant 3-4 ans forte
2. **Block Blast** — tetris-like glisser-déposer, addictif pur
3. **Tangram dino** — puzzles géométriques avec dinos silhouettes (cross-pole JEU×DINO)
4. **Mahjong dino** — paires dinos + ombres chinoises (cross-pole)
5. **MJ-18 Expert** — tubes couleurs difficulté +3
6. **Shisima** — jeu kényan IA graduée (5×5 board, déplacer pions)
7. **Picross** — nonogram pixel-art, difficultés 5×5 à 10×10

**Processus décision** :
- Papa Yann test MJ-34/35/36 + retour ressenti ~ 2026-07-08
- game-conseiller brainstorm 5 candidats (Tangram+Mahjong=cross-dino priorité)
- Priorisation : top 2-3 à commencer 2026-07-15

**Attaché** : L-081 (vérifier outputs agents), test harnais Playwright validé (14/14 VERT)

**Impact** : backlog 7 tickets futurs MJ-43..49 (estimés), roadmap renouvellement thématique post-bus.

---

## EP-048 – Recette réelle parcours compte→sync (Papa Yann validation)

**Statut** : `[ ]` à faire

**Priorité** : 🔴 **BLOQUANTE** — préalable tout usage réel cloud

**Contexte** : Phase 1 light déployée (2026-07-07) : Supabase + cloud.js + OTP validés en unit tests (18 stubs). Audit post-build 5/7 fixes. **Manque** : **test intégration réel** (end-to-end utilisateur).

**Workflow test** (Papa Yann validation requise) :
1. Email login → saisir OTP → profil enfant créé Supabase
2. Jouer 1 partie MJ-01 → progression sauvegardée cloud
3. Changer appareil → login email → récup profil + progression intact
4. Vérifier base Supabase (table users, table game_histories, merges)

**À faire** :
1. **T-450** : Écrire e2e test Playwright (smoke login → partie → sync)
2. **T-451** : Test réel Papa Yann (2-3 appareils, 2-3 parties, récup profil)
3. **T-452** : Valider base Supabase (counts, no corruption)

**Blocage** : avant tout usage réel enfants (invite proches).

**Impact** : confiance produit pre-launch.

---

## EP-049 – Resend SMTP + {{ .Token }} dans template Magic Link

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — déploiement email réel

**Contexte** : Phase 1 light utilise magic link (code OTP 6 chiffres), mais template email bloqué : Resend n'accepte pas custom domains sans SMTP activé, templates verrouillés sans clé API custom.

**À faire** :
1. **T-460** : Acheter domaine MaxPlay (~10 €/an, ex: hello@maxplay.app)
2. **T-461** : Configurer Resend custom domain + SMTP
3. **T-462** : Modifier template Magic Link : `{{ .Token }}` → 6-digit OTP code + button lien
4. **T-463** : Test email réel (Gmail/Outlook/Yahoo)

**Raison** : templates officiels MaxPlay (pas générique SendGrid/AWS) augmente confiance parents.

**Impact** : `infra/supabase/auth-resend-config.json`, template email officiel.

---

## EP-050 – Production premiers clips voix (voices-manifest.js)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — incitation compte réelle

**Contexte** : `site/js/voices-manifest.js` vide (V0). TTS.speak() fallback robot. **À faire** : générer premiers clips voix premium ElevenLabs (narratrice f / narrateur h / Wex) pour réactions victoire + indices MJ.

**À faire** :
1. **T-470** : Sélectionner 10-12 phrases clés (victoires, indices, encouragements) par voix
2. **T-471** : Générer MP3 ElevenLabs eleven_v3 (tags ton positif/neutre/amusé)
3. **T-472** : Ajouter silence 250ms (L-069, padding Bluetooth)
4. **T-473** : Populer `voices-manifest.js` (voice_id→fichiers MP3)
5. **T-474** : Brancher dans 3 MJ test (mj-01, mj-04, mj-20)
6. **T-475** : Test voix.js patch (fallback → premium MP3 si connecté)

**Budget** : ~30 crédits ElevenLabs (3 voix × 10-12 clips).

**Impact** : `site/sounds/voix/{f,h,wex}/` (30+ MP3), `site/js/voices-manifest.js` populé.

---

## EP-051 – MJ-33 · Noms de dinos uniquement (TTS noms uniquement, pas détail)

**Statut** : `[~]` **VALIDÉ** — retour Papa Yann revue 2026-07-07

**Priorité** : 🟡 **MOYENNE** — amélioration UX/audio pédago

**Contexte** : Retour Papa Yann session revue mini-jeux 2026-07-07 : MJ-33 (encyclopédie dinos audio) doit dire QUE le nom du dino, pas la description complète (qui suit en texte). Comportement souhaité CONFIRMÉ : cliquer un autre dino stoppe le son en cours.

**À faire** :
1. **T-510** : Modifier `site/mj-33.html` → TTS narrateur dit le nom du dino seul (ex: « Stégosaure ») via voice-id narrateur_h
2. **T-511** : Valider que cliquer un autre dino stoppe le son courant (confirm déjà fait)
3. **T-512** : Spec Playwright vert (harnais 14/14)

**Raison** : attention enfant mieux ciblée (nom = identité), description lue dans l'app (UI texte), TTS pour signature auditive dino uniquement.

**Impact** : `site/mj-33.html` TTS logic

**Attaché** : L-075 (audio multi-pistes)

---

## EP-052 – MJ-31 · Intro trop long + registre voix TTS

**Statut** : `[~]` **VALIDÉ** — retour Papa Yann revue 2026-07-07

**Priorité** : 🟡 **MOYENNE** — amélioration audio pédago

**Contexte** : Retour Papa Yann : (1) texte d'intro MJ-31 trop long (raccourcir) + (2) certains TTS générés sont de mauvaise qualité (registre voix cassé). Nécessite audit audio ElevenLabs + possible re-génération.

**À faire** :
1. **T-520** : Raccourcir script intro MJ-31 (limiter à 2-3 phrases max vs 5-6 actuelles)
2. **T-521** : Audit fichiers MP3 ElevenLabs MJ-31 (vérifier voice_id, settings, stabilité)
3. **T-522** : Re-générer segments TTS mauvaise qualité (via `studio_audiobook_from_segments_v2_dialogue`)
4. **T-523** : Spec Playwright vert

**Raison** : pédago longue = perte attention enfant ; voix robustes = engagement.

**Impact** : `site/mj-31.html`, `site/sounds/mj-31/`

**Attaché** : L-079 (voix casting)

---

## EP-053 – MJ-32 · BUG CRITIQUE zone noire non-recolorable + features galerie/trophées

**Statut** : `[!]` **BLOQUÉ** — critique production + multi-features demandées

**Priorité** : 🔴 **CRITIQUE** — jeu de coloriage bloqué, Papa Yann demande features

**Contexte** : Retour Papa Yann revue 2026-07-07 : MJ-32 (coloriage flood-fill) a un BUG CRITIQUE — une zone coloriée en NOIR ne peut plus être recoloriée (pixel ALPHA=0 ou équivalent invisible canvas). PLUS : Papa Yann demande 3 nouvelles features : (1) reprendre un dessin depuis galerie (copie), (2) suppression par appui long, (3) trophées-puzzle basés sur les dessins de Max (3-4 fragments au lieu d'étoiles) + système likes dessins.

**À faire (URGENT)** :
1. **T-530** : **DEBUG BUG CRITIQUE** zone noire non-recolorable (vérifier canvas alpha/pixel, flood-fill bounds)
2. **T-531** : Ajouter galerie drawings (read/resume from saved)
3. **T-532** : Ajouter long-tap suppression dessin
4. **T-533** : Ajouter trophées-puzzle (3-4 fragments/dessin) au lieu d'étoiles
5. **T-534** : Ajouter système likes (click ❤️ dessins)
6. **T-535** : Spec Playwright vert

**Risk** : sans T-530 (bug critique), jeu inutilisable. Features T-531-534 = engagement long terme (galerie historique enfant).

**Impact** : `site/mj-32.html` (canvas logic refactor + UI galerie), potentiellement cloud sync (dessins sauvegardés)

**Attaché** : L-066 (flags Chromium canvas), L-087 (merge multi-appareils)

---

## EP-054 – MJ-04 · Refonte visuelle (« pas moche »)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **HAUTE** — feedback esthétique direct Papa Yann

**Contexte** : Retour Papa Yann revue 2026-07-07 : « qu'est-ce que c'est moche » sur MJ-04. Jeu a des assets visuels peu attirants ou composition UI maladroite. Demande refonte esthétique complète.

**À faire** :
1. **T-540** : Lire `studio/minijeux/docs/jeux/figees/mj-04.md` (mécanique figée)
2. **T-541** : Audit visuel MJ-04 (assets, couleurs, composition) via screenshot + critique
3. **T-542** : Proposer direction esthétique (game-conseiller brainstorm)
4. **T-543** : Refonte UI/assets
5. **T-544** : Spec Playwright vert

**Raison** : première impression enfant = esthétique. MJ-04 moins engageant que voisins.

**Impact** : `site/mj-04.html`, assets visuels (images, SVG, couleurs)

**Attaché** : L-055 (design amont + figeage)

---

## EP-055 – MJ-05 · Refonte complète mécanique/visuelle (« très laid mais l'idée est bonne »)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **HAUTE** — feedback "très laid mais bonne idée" = refonte nécessaire

**Contexte** : Retour Papa Yann revue 2026-07-07 : « très laid mais l'idée de soustraction est bonne » — mécanique sous-jacente OK (apprentissage soustraction), mais visuelle/expérience désastreuse. Refonte complète requis (design amont + dev).

**À faire** :
1. **T-550** : Lire figées MJ-05
2. **T-551** : Design amont (game-conseiller) → maquette visuelle soustraction engageante
3. **T-552** : Refonte UI/assets complets
4. **T-553** : Spec Playwright vert

**Raison** : enfant rejette jeu même si mécanique pédagogiquement bonne. Esthétique = non-négociable.

**Impact** : `site/mj-05.html` refonte complète

**Attaché** : L-055 (design amont obligatoire)

---

## EP-056 – MJ-06 · Diversifier emojis (dino, voyage)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — amélioration variété thématique

**Contexte** : Retour Papa Yann revue 2026-07-07 : diversifier emojis MJ-06 au-delà du thème actuel. Intégrer dino + voyage (cf. passions Max).

**À faire** :
1. **T-560** : Audit emojis courants MJ-06
2. **T-561** : Ajouter pool dino (T-Rex, Stego, Raptor, etc.) + voyage (avion, train, bus, Statue Liberté, Eiffel, etc.)
3. **T-562** : Valider variété équilibrée (pas 90% dino)
4. **T-563** : Spec Playwright vert

**Raison** : re-motiver Max en alignant avec passions (dino, voyages).

**Impact** : `site/mj-06.html` emoji pool

**Attaché** : L-041 (renouvellement thématique)

---

## EP-057 – MJ-23 · Diversifier emojis (dino, voyage, terre, espace)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — amélioration variété thématique

**Contexte** : Retour Papa Yann : MJ-23 idem MJ-06. Diversifier emojis (dino, voyage, terre, espace).

**À faire** :
1. **T-570** : Diversifier pool emojis (ajouter dino + voyage + terre + espace)
2. **T-571** : Valider équilibre
3. **T-572** : Spec Playwright vert

**Impact** : `site/mj-23.html` emoji pool

---

## EP-058 – MJ-15 · Variantes intrus + ombres dinos colorées (pas stigmatisant)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — amélioration pédago/éthique

**Contexte** : Retour Papa Yann revue 2026-07-07 : MJ-15 (trouver l'intrus) doit avoir variantes proches (terre/lune/soleil/tortue) + visuels intrus = ombres dinos colorées (au lieu de formes abstraites/stigmatisantes). Zero risque représentation négative.

**À faire** :
1. **T-580** : Audit intrus MJ-15 (variantes actuelles)
2. **T-581** : Créer pool alternatives proches (terre/lune/soleil/tortue)
3. **T-582** : Générer ombres dinos colorées (utiliser asset pool `img/dinos/ombres/`)
4. **T-583** : Valider aucune stigmatisation visuelle (review avec game-conseiller)
5. **T-584** : Spec Playwright vert

**Raison** : challenge cognitif > punir l'enfant ; représentations positives.

**Impact** : `site/mj-15.html` assets + intrus logic

**Attaché** : L-070 (ombres chinoises canon)

---

## EP-059 – MJ-16 · Portrait responsive (« ne rentre pas en portrait »)

**Statut** : `[!]` **BLOQUÉ** — UX cassée

**Priorité** : 🔴 **CRITIQUE** — jeu inutilisable en portrait

**Contexte** : Retour Papa Yann revue 2026-07-07 : MJ-16 ne rentre pas en portrait (utilisateurs munis de tablettes en mode portrait). Affichage cassé.

**À faire** :
1. **T-590** : Vérifier responsive CSS MJ-16
2. **T-591** : Fix clamp/media queries pour portrait
3. **T-592** : Test portrait + landscape
4. **T-593** : Spec Playwright portrait vert

**Raison** : utilisation réelle tableau = 50% portrait mode.

**Impact** : `site/mj-16.html` responsive

---

## EP-060 – MJ-08 & MJ-09 · Refonte doublon → tri multi-thème (ombres dinos + emojis)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **HAUTE** — doublon détecté, refonte produit

**Contexte** : Retour Papa Yann revue 2026-07-07 : MJ-08 et MJ-09 font la même chose (tri bus par couleur/propriété). Doublon. **Opportunité** : refonte les 2 en tri multi-thème (bazar d'emojis + ombres dinos colorées) = « c'est à faire partout » (pattern réutilisable).

**À faire** :
1. **T-600** : Audit MJ-08 vs MJ-09 (confirmé doublon mécanique)
2. **T-601** : Design amont → tri multi-thème (emoji pool + ombres dinos)
3. **T-602** : Refonte MJ-08 (version emoji) + MJ-09 (version dino)
4. **T-603** : Spec Playwright vert

**Raison** : économiser code, pattern réutilisable (tri thématique = fondamental pour renouvellement jeux).

**Impact** : `site/mj-08.html`, `site/mj-09.html` refonte

**Attaché** : L-070 (ombres dinos), L-062 (filtrage lisibilité)

---

## EP-061 – MJ-12 · Ajouter nouveaux sons (banque audio)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — amélioration audio

**Contexte** : Retour Papa Yann revue 2026-07-07 : MJ-12 doit utiliser la banque de sons récemment produite (suite refonte système sonore complet, L-080).

**À faire** :
1. **T-610** : Lire `site/sounds/_BANQUE-SONS.md` (API + assets)
2. **T-611** : Brancher nouveaux SFX/MP3 MJ-12 (via `victory-sounds.js` ou appels `SoundPool.play()`)
3. **T-612** : Test audio sur device (Bluetooth réveil, clarity)
4. **T-613** : Spec Playwright vert

**Raison** : uniformiser audio MJ, re-utiliser banque centralisée.

**Impact** : `site/mj-12.html` SFX branching

**Attaché** : L-080 (banque sons), L-081 (système audio)

---

## EP-062 – MJ-25 · Créer progression difficulté (« zéro difficulté, but incompris »)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **HAUTE** — jeu trop facile

**Contexte** : Retour Papa Yann revue 2026-07-07 : MJ-25 a zéro progression/challenge. But incompris pour Max. Lire figées + ajouter progression difficulté (levels, variations).

**À faire** :
1. **T-620** : Lire figées MJ-25
2. **T-621** : Design amont → progression difficultés (easy/medium/hard ou système étoiles)
3. **T-622** : Implémenter progression (données states, UI level select)
4. **T-623** : Spec Playwright vert

**Raison** : engagement = challenge calibré (Mihaly flow state).

**Impact** : `site/mj-25.html` progression system

**Attaché** : L-081 (vérifier agent outputs)

---

## EP-063 – MJ-26 · BUG dino hors cadre (noir sur noir) + répétition niveau 1

**Statut** : `[!]` **BLOQUÉ** — BUG critique + progression cassée

**Priorité** : 🔴 **CRITIQUE** — affichage incomplet + pédago répétitive

**Contexte** : Retour Papa Yann revue 2026-07-07 : (1) dino sortant du cadre en bas (noir sur fond noir) semblait incomplet mais compté complet (gameplay broken) + (2) niveau 1 répétitif (5x le même niveau 1).

**À faire** :
1. **T-630** : **BUG AUDIT** dino hors cadre (vérifier canvas bounds, clip-path, sizing)
2. **T-631** : Fix viewport/sizing dino MJ-26
3. **T-632** : Fix niveau 1 duplication (data ou logic issue ?)
4. **T-633** : Spec Playwright vert

**Impact** : `site/mj-26.html` canvas/layout + data logic

**Attaché** : L-067 (PNG silhouettes transparent), L-068 (NO_HERO sets)

---

## EP-064 – MJ-27 · Cliquer chaque syllabe et entendre son son (feature audio pédago)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — feature audio pédago (décodage phonétique)

**Contexte** : Retour Papa Yann revue 2026-07-07 : MJ-27 doit permettre à Max de cliquer chaque syllabe d'un mot et entendre son son (décodage phonétique).

**À faire** :
1. **T-640** : Lire figées MJ-27 (mécanique base)
2. **T-641** : Générer MP3 syllabe par syllabe (segments court ElevenLabs ou Pico TTS)
3. **T-642** : Brancher click-syllabe → play son (UI onclick listener syllabe)
4. **T-643** : Spec Playwright vert

**Raison** : enfant 3.5-4 ans = lecture phonétique progressive (assembler sons → mot).

**Impact** : `site/mj-27.html` syllable click + audio

**Attaché** : L-058 (audio multi-voix)

---

## EP-065 – MJ-28 · Lampe éclaire mieux (amélioration visuelle)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **BASSE** — amélioration UX cosmétique

**Contexte** : Retour Papa Yann revue 2026-07-07 : MJ-28 lampe (dénoter zone sombre) doit éclairer davantage (effet luminosité/glow meilleur).

**À faire** :
1. **T-650** : Améliorer effet lampe (augmenter radiant gradient radius, opacity, glow)
2. **T-651** : Spec Playwright vert

**Impact** : `site/mj-28.html` lampe CSS/canvas

---

## EP-066 – MJ-29 · Cliquer mot → place + lit (amélioration interaction)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — amélioration UX/pédago

**Contexte** : Retour Papa Yann revue 2026-07-07 : MJ-29 (placer mots) — actuellement cliquer le mot bas le lit MAIS ne le place pas. Demande : tap devrait aussi placer (pas juste drag).

**À faire** :
1. **T-660** : Audit MJ-29 interaction (drag vs tap)
2. **T-661** : Ajouter tap-to-place logic (click mot → find empty slot + place)
3. **T-662** : Valider voix/placement cohérent (TTS dit en même temps)
4. **T-663** : Spec Playwright vert

**Raison** : enfant petit = tap + drag tous deux importants (mobilité).

**Impact** : `site/mj-29.html` interaction logic

---

## EP-067 – MJ-30 · Dire nom dino à affichage ou image alternative

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — amélioration audio pédago

**Contexte** : Retour Papa Yann revue 2026-07-07 : MJ-30 (range dinos par taille). Affichage dino — doit dire le nom du dino (audio noms existants côté dino) OU présenter visuellement autrement (si pas audio).

**À faire** :
1. **T-670** : Vérifier noms dinos MP3 dans `site/sounds/dinos/` (dinos-audio-manifest.js)
2. **T-671** : Brancher playDinoNom() au click dino MJ-30 (voice narrateur h)
3. **T-672** : Fallback visuel si pas audio (affichage nom texte ou emblème dino)
4. **T-673** : Spec Playwright vert

**Raison** : identité auditive dino (réutiliser production audio existante).

**Impact** : `site/mj-30.html` audio branching

**Attaché** : L-071 (manifest auto-généré assets)

---

## EP-068 – NORME : Bouton (i) règles sur chaque MJ + explication audio

**Statut** : `[ ]` à faire

**Priorité** : 🟠 **HAUTE** — template/norme transverse

**Contexte** : Retour Papa Yann revue 2026-07-07 item 18 (transverse) : chaque MJ doit avoir bouton (i) affichant les règles du jeu + explication audio courte (< 30s, voix narratrice f ou narrateur h).

**À faire** :
1. **T-680** : Créer composant `.rules-button` (HTML/CSS réutilisable)
2. **T-681** : Gabarit markdown règles par jeu (`studio/minijeux/docs/jeux/rules/mj-XX.md`)
3. **T-682** : Générer MP3 règles (ElevenLabs eleven_v3, narratrice f)
4. **T-683** : Intégrer à tous les MJ actifs (21 fichiers)
5. **T-684** : Spec Playwright vert

**Raison** : accessibilité (Max peut relire règles), aucune confusion "quoi faire" + renforcement pédago audio.

**Impact** : gabarit HTML, 21 MJ updated, `site/sounds/rules/` (21 MP3), template `docs/jeux/rules/`

**Attaché** : L-051 (gabarit header)

---

## EP-069 – EPIC : Système comptes/profils + cloud sync (architecte + Supabase)

**Statut** : `[~]` **PHASE 1 LÉGÈRE DÉPLOYÉE** — audit post-build 5/7 fixes avant prod

**Priorité** : 🔴 **BLOQUANTE** — préalable monétisation + multi-device

**Contexte** : Session infra 2026-07-07 (audit complet). Phase 1 light : Supabase + cloud.js + OTP validés unit tests. **Attente** : test e2e réel Papa Yann + recette complete (appareil A → login → jouer → sync → appareil B → récup profil → progress intact).

**Livrables Phase 1** :
- ✅ Compte parent (email) + profil enfant pseudonyme (RGPD/COPPA safe)
- ✅ OTP code 6 chiffres (fallback magic link iOS PWA)
- ✅ Cloud.js (sync local ↔ Supabase)
- ✅ Merge multi-appareils (union histories, pas winner-take-all)

**À faire (Phase 1 finalisation)** :
1. **T-690** : E2E test recette complète (Papa Yann 2-3 appareils, 2-3 parties)
2. **T-691** : Audit Supabase (table users, game_histories, no corruption)
3. **T-692** : Valider avant usage enfants réels

**À faire (Phase 2, post-Papa Yann validation)** :
4. **T-693** : Codes cadeaux (usage unique, lié acheteur)
5. **T-694** : Voix premium unlock (via code cadeau + server entitlements JAMAIS en client flag)
6. **T-695** : Analytics anonymisé RGPD (zéro tracking enfant, parent opt-in)

**Blocage** : sans T-690/691, pas de production enfants réels.

**Impact** : `site/js/cloud.js`, infra Supabase, auth flow, game_histories storage

**Attaché** : L-086 (magic link iOS OTP), L-087 (merge multi-appareils)

---

## EP-051 – Migrer 6 pages en TTS.speak (callback centralisé)

**Statut** : `[ ]` à faire

**Priorité** : 🟡 **MOYENNE** — couverture TTS uniforme

**Contexte** : TTS.speak() callback centralisé créé pour cloud phase 1. **Manque** : 6 pages utilisent encore TTS brut (speechSynthesisUtterance direct).

**Pages à migrer** :
- mj-19.html
- mj-20.html  
- mj-22.html
- dev-dinos.html
- index2.html (hub « La ligne de Max »)
- index3.html (hub planètes)

**À faire** :
1. **T-480** : Remplacer `speechSynthesis.speak()` → `TTS.speak()` (6 pages)
2. **T-481** : Respecter priority (UI text vs dino-name vs indication), fallback console warn si TTS bloqué
3. **T-482** : Test Playwright (TTS.speak appelé avec bons args)

**Raison** : une seule source TTS (voix.js gère fallback premium vs robot), uniformité callback, futures améliorations appliquées partout.

**Impact** : 6 fichiers HTML refactorisés, zéro changement visuel.

---

## EP-052 – Dette gabarit entête 8 MJ (cosmétique, figures non prioritaire)

**Statut** : `[ ]` à faire

**Priorité** : 🟢 **BASSE** — cosmétique, protégée figeage

**Contexte** : Revue 40 MJ 2026-07-07 révèle 8 MJ hors gabarit canonique `.hdr`. Tous les autres 32 respectent le pattern. **Figées + harnais Playwright protègent** → ne pas modifier sans session dédiée.

**8 MJ non-conforme** :
- mj-12.html (class `.bus-cabin` custom)
- mj-13a/13b/13c.html (`#hdr` + onclick custom)
- mj-14/15/16/17.html (`#hdr` + back-button.js)

**Note** : ces 8 MJ sont **figés** (`studio/minijeux/docs/jeux/figees/`) → toute modification = revoir figeage + reviewer. Coût effort > bénéfice cosmétique.

**À faire** (future session dédiée si Papa Yann validation) :
1. Extraire pattern `.hdr` canonique depuis mj-20
2. Appliquer uniformément 8 MJ
3. Re-valider harnais (back-button.js toujours injecté)
4. Mettre à jour figées

**Blocker courant** : AUCUN (esthétique seulement).

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
| EP-044 | MJ-34 · Le dépôt bloqué (Rush Hour bus, logique séquence) | `[~]` |
| EP-045 | MJ-35 · Le jeu des graines (Kalah/awalé, compter/semailles) | `[~]` |
| EP-046 | MJ-36 · Arrête le bus ! (timing, observer tap au bon moment) | `[~]` |
| EP-047 | SHORTLIST jeux addictifs (Simon/mélodie, Block Blast, Tangram dino, Mahjong dino, MJ-18 Expert, Shisima, Picross) — priorisation Papa Yann | `[?]` |
| EP-048 | Recette réelle parcours compte→sync (Papa Yann e2e test : login → partie → récup profil) | `[ ]` |
| EP-049 | Resend SMTP + {{ .Token }} template Magic Link (custom domain MaxPlay) | `[ ]` |
| EP-050 | Production premiers clips voix (ElevenLabs 3 voix, 10-12 phrases, populate voices-manifest.js) | `[ ]` |
| EP-051 | Migrer 6 pages en TTS.speak (mj-19, 20, 22, dev-dinos, index2, index3) | `[ ]` |
| EP-052 | Dette gabarit entête 8 MJ (mj-12, 13a-c, 14-17) — cosmétique, protégée figeage | `[ ]` |

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

---

## Validations en cours (nuit 2026-07-06)

### EP-044 – MJ-34 · Le dépôt bloqué (Rush Hour bus, logique séquence)

> Codé nuit 2026-07-06. Méga-audit synthèse jeux addictifs (SYNTHESE-JEUX-ADDICTIFS.md, convergence 2 audits) → Top-3 recommandation Rush Hour.
> **Mécanique (amendée conseiller)** : Rush Hour — grille **4×4 (★) puis 5×5 (★★/★★★), jamais 6×6**. Bus cible de Max toujours horizontal sur la ligne de sortie (sortie à droite, invariant). Drag contraint sur l'axe (H ↔ / V ↕), snap case, niveaux précalculés vérifiés solveur BFS. Pas de compteur de coups visible. Spec : `docs/jeux/mj-34-35-36-specs.md`.
> **Pédagogie** : Logique séquencielle, anticipation mouvements, zéro pénalité (essai-erreur illimité).
> **Feedback** : < 200 ms taps, son slide + confettis victoire pool standard.

**Reste à valider** :
- [ ] T-440 : Test unitaire mécanique slide (collisions, cibles valides)
- [ ] T-441 : Test motricité (zones tap 80px bus, hauteur grille portable portrait/paysage)
- [ ] T-442 : Harnais Playwright (5 niveaux précalculés) → auto-solve VERT
- [ ] T-443 : Figeage mj-34.md créé (une fois Papa Yann valide)

---

### EP-045 – MJ-35 · Le jeu des graines (semailles mancala SOLO, compter)

> Codé nuit 2026-07-06. Méga-audit : convergence mancala (reco audit A + B). **ORIGINE gardée** (graines/calebasse, pas « rebrandé bus »).
> ⚠️ **AMENDEMENT game-conseiller (nuit 2026-07-06, AVANT code)** : Kalah duel vs IA = **NO-GO à 4 ans** (sens anti-horaire abstrait, adversaire → risque pleurs, méta-règles opaques). Version codée = **semailles SOLO pédagogiques** : 1 rangée 6 trous + 1 grenier à droite, tap un trou → graines sautent une par une avec comptage vocal, objectif coopératif « toutes les graines au grenier ». Le Kalah authentique 2 joueurs part au backlog « 6-7 ans ». Spec : `docs/jeux/mj-34-35-36-specs.md`.
> **Pédagogie** : comptage un-à-un + anticipation numérique (quel trou atteint pile le grenier = pré-addition).
> **Feedback** : sndCount par graine, sndDing grenier, aucun état « perdu » (semis raté = redistribution douce).

**Reste à valider** :
- [ ] T-450 : Papa Yann arbitre — version solo confirmée ? (duel IA reporté 6-7 ans)
- [ ] T-452 : Test motricité (taps 80px trous)
- [ ] T-453 : Audio comptage → test no-collision taps rapides
- [ ] T-454 : Figeage mj-35.md créé

---

### EP-046 – MJ-36 · Arrête le bus ! (timing, observer tap au bon moment)

> Codé nuit 2026-07-06. Méga-audit : Top-3 reco Audit A (Stack/timing, Tetris effect). **BUS intégré** = l'arrêt de bus EST le jeu.
> **Mécanique** : Bus se déplace horizontalement sur la route (droite ↔ gauche, cycle) → arrêt de bus fixe au centre → TAP exact quand bus arrive → zéro pénalité, rejeu < 1s.
> **Pédagogie** : Timing, observation, précision. Dopant : feedback ultra-rapide < 100 ms.
> **Feedback** : Bus frein + porte ouvre + confettis = « montée réussie ». Erreur : bus passe → refrain sympathique, relance auto.

**Reste à valider** :
- [ ] T-460 : Tuning timing (bus speed, fenêtre tap 200-400 ms acceptée, calibre difficulté niveau par niveau)
- [ ] T-461 : Test motricité (zone tap min 80px, feedback < 100 ms mesuré, délai bus/frein testés)
- [ ] T-462 : Harnais e2e (10 cycles auto → capture tous les cas : succès, raté, double-tap, hold)
- [ ] T-463 : Figeage mj-36.md créé

---

### EP-047 – SHORTLIST jeux addictifs (7 candidats non-prioritaires — priorisation Papa Yann)

> Décision de nuit : les 3 MJ (34/35/36) en parallèle du méga-audit = 1 MJ par famille mécanique majeure (séquence · semailles · timing).
> Reste **7 candidats shortlist** issus des 2 audits (40 + ~90 jeux), pas développés ce soir car moins urgents que les 3 premiers.
> **Papa Yann décidera** laquelle ajouter après test des 34/35/36 → valider addictivité pattern + intégration thème.

| Rang | Jeu | Famille | Thème proposé | Priorité | Notes |
|------|-----|---------|---------------|----------|-------|
| 4 | **Simon** ("La mélodie des bus") | Mémoire séquence | BUS : klaxons/lignes 3 tons | MOYENNE | Genius = origines Brésil (Max) |
| 5 | **Block Blast** | Placement/tri | ORIGINE gardée (formes pures) | MOYENNE | N°1 mondial 2025, zéro timer, code facile |
| 6 | **Tangram dino** | Assemblage spatial | DINO : silhouettes dinos classiques | BASSE | Pipeline images dino dispo, test < 4 ans hard |
| 7 | **Mahjong solitaire** (paires dino) | Scan visuel | DINO : tuiles-dinos appairées | BASSE | +189 % marché 2025, dense pour 3.5 ans |
| 8 | **MJ-18 Expert** | Tri optimisé (extension) | — (niveau du jeu existant) | MOYENNE | Gap identifié audit A « min de coups » |
| 9 | **Shisima / Mū Tōrere** | Duel vs IA | ORIGINE gardée (jeu africain, 9 cases) | BASSE | Code minuscule (minimax rigide), 1 min partie |
| 10 | **Picross 5×5** | Déduction grille | DINO / BUS (image révélée pixel-par-pixel) | TRÈS BASSE | Trop dur < 6 ans (logique solitaire complexe), futur 2027 |

**Action** :
- [ ] T-470 : Brainstorm game-conseiller après test MJ-34/35/36 (meilleur candidat suivant ?)
- [ ] T-471 : Ticketiser chacun en EP-04X (Simon/Block/Tangram/Mahjong/Expert/Shisima/Picross) une fois priorisation validée
- [ ] T-472 : Mettre à jour SYNTHESE-JEUX-ADDICTIFS.md avec feedback Papa Yann (nuit 34/35/36)

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

## Session 14 — 2026-07-05 (Clôture + Incident Post-Mortem + Leçons L-072..076)

### Fait
- [x] Correction critique : 4 figées mj-24/25/26/31 réécrites (inventions découvertes en relecture)
- [x] Incident post-mortem gravé audit-trail (root cause game-mj-pmo ne lut pas HTML réel avant figeage)
- [x] 5 leçons gravées : L-072 (vérification figeage obligatoire), L-073 (anti-pattern mécanique plausible), L-074 (figée erronée = bottleneck), L-075 (audio exclusivité mutuelle), L-076 (navigation délégation .back)
- [x] Retours Papa Yann intégrés (anti-double-voix MP3+TTS, zones tap 80px, mj-32 navigation testée VERT, 85M ans sourcé)
- [x] Faux positifs reviewers clarifiés (Nunito OK, OGG pas obligatoire MP3, streak interne OK)
- [x] Idée brainstorm Papa Yann : pattern « scène se peuple en live » validé adoré (candidat autres MJ)
- [x] Commit 7d844cb7 déployé prod SUCCESS

### Leçons (voir L-072 à L-076 ci-dessus)
- Processus figeage = vérification obligatoire code réel + notes Papa Yann tracées
- PMO ne décide pas des mécaniques (grave ce qui existe, validé)
- Figées erronées = bottleneck qualité (pire qu'aucune figée)
- Audio multi-pistes : exclusivité mutuelle MP3 vs TTS obligatoire
- Navigation MJ = délégation .back header (pas listener direct)

### Tickets ouverts
- **EP-043** : Audit automatisé figés (chaque ligne 🔒 sourcée ou code-validée)
- **EP-042** : Check auto assets dans run.mjs (404 prévention)

### État final
- ✅ Harnais 10/10 VERT (navigation mj-32, 6 MJ test scriptés)
- ✅ Figées 4 corrigées + incident documenté
- ✅ Cycle clôture validations Papa Yann 100% intégré

---

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

## EP-074 – Audit specs harnais Playwright (mj-01, index) — specs obsolètes

**Statut** : `[!]` **BLOQUÉ** — harnais test permanent FAIL

**Priorité** : 🔴 **CRITIQUE** — specs impactent CI

**Contexte** : 2026-07-12 nuit, cloud Supabase intégré. Audit découverte de 2 specs cassées qui causent FAIL permanent du harnais sur index + mj-01 seul.

**Dettes détectées** :
- `game/tests/specs/index.spec.mjs` : attend carte mj-01 absente du menu (retrait 2026-07-07 EP-070) → FAIL permanent. Mj-01 trop facile, retiré du catalogue.
- `game/tests/specs/mj-01.spec.mjs` : FAIL pré-existant « Stars.get === 1 après manche parfaite » → obtient 0, jamais mj-01 récompense étoile première manche. Spec correcte ou mj-01 cassé ?

**À faire** :
1. **T-740** : Vérifier l'intention : mj-01 doit-il récompenser 1 étoile (et spec correcte) OU spec obsolète ?
2. **T-741** : Si spec obsolète → supprimer ou refonder sur un MJ actif (mj-02/03/etc.)
3. **T-742** : Si mj-01 cassé → fix ou confirmation renouveau mj-01 dans roadmap post-test 48h
4. **T-743** : Harnais doit PASSER index + tous les specs actifs avant tout déploiement

**Raison** : harnais CI = gatekeeper qualité. FAIL permanent = faux positif débilitant.

**Blocker** : Papa Yann décision sur mj-01 (garder/refondre/réinventer).

---

## EP-075 – Dettes Supabase — RLS + architecture cloud complète

**Statut** : `[~]` **EN COURS** — phase 1 (migrations 003-005) livrée, phase 2 ouverte

**Priorité** : 🟡 **HAUTE** — architecture cloud saine requise avant public

**Contexte** : 2026-07-12 nuit, implémentation WexWorld Supabase (game_sessions, child_state, annotations). 3 tables créées, RLS parent appliqué, API Cloud.js intégré. Cependant, dettes techniques découvertes.

**Dettes détectées** :
- `mj32_galerie` (dataURL JPEG) proche du cap 512 Ko max child_state si beaucoup œuvres → surveillance/pagination nécessaire.
- `golden_stars_*` : chemin alternatif étoiles parallèle pour jeux hors-catalogue → risque incohérence si jeu entre au catalogue. À harmoniser.
- RLS advisors initplan incomplets sur tables 001 (child_profiles, progression, consents, feedback) — dette assumée, à tracer.

**À faire** :
1. **T-750** : Audit mj32_galerie storage (nombre max œuvres avant dépassement 512 Ko) + implémentation pagination si seuil approchant.
2. **T-751** : Harmonisation `golden_stars_*` : règle unique pour all/game/unlocks — décider : DB vs localStorage.
3. **T-752** : Review et fermeture RLS dettes tables 001 (optionnel post-Phase 1, optionnel avant public).
4. **T-753** : Validation client côté Supabase (authRequired, sessionEncryption, annotation_dedup, child_state whitelist).

**Raison** : cloud = source unique vérité progressions. Consistence = critique.

**Impact** : `infra/supabase/` + `site/js/cloud.js` + tables Supabase

---

## EP-076 – Figeages validées 2026-07-07 (MJ-24/25/26/31) — audit contenu vs code

**Statut** : `[!]` **AUDIT RÉTROACTIF** — 4 figées rétro-corrigées commit 7d844cb7

**Priorité** : 🟠 **MOYENNE** — process integrity

**Contexte** : 2026-07-05 incident grave — game-mj-pmo inventa du contenu dans 4 figées sans lire HTML réel. Mj-24 «déduction audio-first » (jamais existé), mj-25 idem, mj-26 « drag-drop» (jamais existé), mj-31 attribua alerte « 85M ans» à « voix Wex » (jamais validé). Leçons L-072 à L-074 documentées.

**À faire** :
1. **T-760** : Revoir la process PMO — figée = traçable à Papa Yann OU code source, JAMAIS inventa.
2. **T-761** : Créer checklist mini-audit avant reviewers (1 ligne figée = 1 lien source).
3. **T-762** : Appliquer à toutes les figées ouvertes (EP-070 + autres).

**Raison** : figée fausse = bottleneck critère. Validation contre du vent.

---

## EP-077 – MJ-43 + MJ-44 créés 2026-07-13 (maths dominos + phonologie sons)

**Statut** : `[~]` **EN COURS** — harnais vert 2026-07-13, validation ressenti Papa Yann en cours

**Priorité** : 🟢 **HAUTE** — 2 mini-jeux pédagogiquement robustes, nouvelle catégorie

**Contexte** : Session 2026-07-13 — 2 nouveaux jeux créés + testés harnais :
- **MJ-43 "Remplis les caisses !"** : Maths (regroupement/addition). Max remplit caisses au bon compte avec dés+dominos. Pips = dino-ombres chinoises en constellation. Escalade ★1→★3 (cibles 3-6→12-15, regroupement 3 dés ou 2 dominos). Zéro pénalité (rebond doux débordement), undo libre.
- **MJ-44 "La boîte à sons"** : Phonologie (tri par son). Max range cartes-mots dans boîtes-sons. Audio guidé (click mot=lit, click boîte=dit le son). Phonème pur (te/me/le/re + ou/a). Escalade ★1→★3 (initial simple → confus → voyelle mid-mot). Zéro pénalité, undo libre.

**À faire** :
1. **T-770** : Validation ressenti Papa Yann sur GitHub Pages (2-3 sessions)
2. **T-771** : Éventuelles corrections minage (pédago, UI polish)
3. **T-772** : Déploiement définitif + mise à jour INVARIANTS (count jeux live)

**Attaché** : Figeages mj-43.md + mj-44.md gravées 2026-07-13 ; leçon L-091 enregistrée

**Impact** : Nouveaux 2 mini-jeux dans catégories « Compter » (mj-43) + « Lire » (mj-44)

---

## Changelog sessions

### 2026-07-12 – Session cloud Supabase (commit bce5aca8)
- **Supabase tables 003–005** : `game_sessions`, `child_state`, `annotations` appliquées via MCP
- **site/js/cloud.js** : `_syncStates`, `_flushSessions`, `_flushAnnotations` + API `Cloud.pushAnnotation()`
- **duel.html & lecture.html** : branchés au tracker + envoi cloud auto payload JSON
- **suivi.html** : clé `maxplay_stars` retirée, reset élargi
- **Décision Papa Yann** : fin copier-colle JSON → table Supabase
- **Dettes découvertes** : specs index/mj-01 FAIL permanent (EP-074), mj32_galerie cap 512Ko (EP-075), RLS dettes (EP-075), figeages audit (EP-076)

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

- 2026-07-19 (session nettoyage GED) : inbox purgee (grok.md, FICHES-RESTRUCTUREES, package-celebrations, package-maxplay-design — tout integre en prod ; designv3 conserve a la racine inbox, a comparer a mp-theme.css avant purge = Q4), GAMES_SPECS.md archive dans docs/jeux/_archive/, 60 fichiers tests/.artifacts desindexes de git (17 Mo). Rapport complet : memory/audits/2026-07-19-nettoyage-ged.md (QUESTIONS Q1-Q12 en attente Papa Yann).

- 2026-07-19 (nettoyage GED, tour 2) : mj-gold-a/b (jeux de reference STANDARD-MJ) + dev-fx + dev-sounds-ui + brick-explorer desormais references dans site/tools/index.html (decision : garder + mettre en avant, pas archiver) ; package-maxplay-designv3 purge de l inbox (integre dans mp-theme.css, tag "valide 2026-07-14" verifie) ; DECISION EN ATTENTE : 3 variantes menu index/index2/index3 (Q6) — Papa Yann ne tranche pas encore.

- 2026-07-19 (nettoyage GED, tour 4 atteignabilite) : INDEX pole enrichi (design-lecture, design-compte, design-shared, atelier-couleurs, index2/index3 -> menu-2026-07.md) ; docs/jeux/INDEX corrige (lien _archive/GAMES_SPECS) + REVUE-JEUX-2026-07 + STANDARD-MJ + 3 specs referencees ; figees/menu.md : game-mj-pmo/game-archiviste -> game-pmo unifie ; lunii README : 3 packs manquants ajoutes (dinos, pierre-loup, voyage) ; atelier-couleurs ajoute au hub tools.

- 2026-07-19 (nettoyage GED, tour 5) : NORME AUDITS appliquee au pole — pmo/audits/ cree (2026-07-17-audio-voix, 2026-07-19-menu-parcours) ; docs/audit/ supprime (snapshot avril jeux-2026-04/factorisation/roadmap-technique = perimes non cites, recuperables git) ; research/AUDIT-MINI-JEUX-ADDICTIFS-ADULTES renomme sources-jeux-addictifs-adultes (refs SYNTHESE+benchmark corrigees) ; carte INDEX du pole resynchronisee.

- 2026-07-19 (nettoyage GED, tour 7 ecosysteme) : audit agents/hooks/commands — 9 frontmatters normalises (em-dash + : internes retires des descriptions, regle feedback_agent_frontmatter) ; 5 agents (conseiller, mj-reviewer, tile-x3) prescrivaient encore game-mj-pmo/game-tile-pmo fusionnes -> game-pmo ; tables equipe resynchronisees (INDEX pole, state.md, VISION-LONG-TERME) : game-pmo Sonnet unifie, wexworld-pmo retire ; hooks 3/3 branches OK, commands 3/3 OK, 0 agent orphelin ; quick.md refs mortes corrigees.

- 2026-07-19 (nettoyage GED, tour 8 scan refs mortes) : 10 figees mj-XX + specs 34-36 pointaient garant game-mj-pmo -> game-pmo ; INVARIANTS table equipe resynchronisee (game-pmo Sonnet unifie, ex-archiviste/sous-PMO retires) ; liens docs/jeux/INDEX vers docs/audit supprime + MAX_PROFILE corriges ; MEMORY.md 3 chemins morts corriges (bus-rules, enneagramme, idfm.js) ; STANDARD-MJ /new-mj retire.

- 2026-07-19 (DECISION Papa Yann) : Q6 TRANCHEE — abandon index2.html (ligne) et index3.html (fusee). index.html = LE menu unique. Suppression + manifests associes (manifest.json, manifest-fusee.json), manifest-classic.json reste le manifest PWA de reference. img/decor/ conserve (reserve indexee, consommateur index2 disparu — a rebrancher sur un futur usage).
- 2026-07-19 (CHANTIER Papa Yann) : bibliotheque + gabarit MJ militaire — obligatoire pour tout jeu : titre impact + aire pedagogique + miniature parlante (catalog), entete retour/regle/commentaires, piste avancement + etoiles, animation de point depuis bibliotheque MaxFX (random dans la bibliotheque, jamais ad-hoc), victoire sans-faute depuis bibliotheque, extensions autorisees UNIQUEMENT en enrichissant la bibliotheque selon les normes. Enforcement : contrat grave + audit-gabarit.mjs etendu (bloquant) + reviewer.

- 2026-07-19 (CONTRAT MJ v2 implante) : STANDARD-MJ.md § CONTRAT v2 grave (7 blocs obligatoires) ; MaxFX.randomPoint + MaxFX.randomFinal ajoutes a celebrations.js (tirage officiel bibliotheque — 12 anims point, 18 victoires ; etendre = enrichir MARKS/STARS, jamais d anim maison) ; audit-gabarit.mjs etendu (BLOQUANT entree catalog complete + dettes MaxFX/ad-hoc — run 41 jeux : 0 bloquant, 22 dettes v1 a resorber) ; rules/mini-jeux.md § CONTRAT auto-charge ; game-mj-reviewer Section 7 (titre impact, miniature parlante, aire peda, bibliotheque only).

- 2026-07-19 (regle Papa Yann re-affirmee) : Max ne doit JAMAIS apparaitre dans le produit (jeux, narration entendue par l enfant), ni son rapport au Bresil. Profil/envies = calibrage interne OK (gouvernance, briefs). Scan exhaustif produit en cours (agent) — resultats a arbitrer : marque MaxPlay + jeu Max Adventure = decision produit separee.

- 2026-07-19 (scan Max/Bresil produit) : 37 occurrences PRODUIT dont ~20 ecrans de victoire "Bravo Max !" (mj-08/11/12/20/34/40/42/43/44/45 + mj-golden.js L162 = bibliotheque partagee !), sounds/super-max.mp3 joue (mj-09/12), index.html pseudo "Max" en dur + footer "pour Max", max-adventure "La journee de Max", suivi.html/compte.html (espace parent, a trancher). PIRE CAS : design-lecture/mockup-15-drapeaux "Bresil ! Le pays de mamae !" en TTS (chantier Kimi en cours). Canon narration + audio dino + segments = 0 occurrence (propres). Correctif propose : pseudo dynamique du compte partout ou "Bravo !" neutre — EN ATTENTE ARBITRAGE Papa Yann.

- 2026-07-19 (DECISION Papa Yann) : footer accueil = dedicace d auteur GARDEE sous forme "Fait avec (coeur) pour mon Max" (dedicace toleree, differente de nommer l enfant dans le gameplay). Marque MaxPlay + jeu Max Adventure : inchanges. GO correctif pseudo dynamique partout ailleurs.

- 2026-07-19 (correctif Max/Bresil APPLIQUE) : 0 occurrence "Max" produit restante (verif grep) hors marque MaxPlay/Max Adventure (gardes), dedicace footer "pour mon Max" (decision), dev-sounds-ui (outil interne). Pseudo dynamique compte (maxplay_active_child) : index.html header + mj-golden.js "Bien joue <pseudo> !" fallback neutre. 10 jeux ecrans victoire neutralises, mj-06 : 9 phrases de lecture recastees Mimi/Lulu/Nono/Juju (amorce Wex World), mj-30 echelle "1 m (toi)", mj-11 "pays que tu connais", super-max.mp3 retire du circuit (banque + mj-09/12), figee mj-22 defigee (decision regle produit), spec mj-34 MAJ + harnais VERT. design-lecture : note bloquante ajoutee aux NOTES pour Kimi (TTS mamae + "Max lit les dorees" a retirer avant catalogue).

- 2026-07-20 (extraction Supabase) : 15 commentaires MJ de la revue 2026-07-19 (table public.annotations, source=comment, status=nouveau) extraits verbatim dans docs/specs/2026-07-20-commentaires-supabase-mj.md (+ synthese verdict par jeu). Verdicts exprimes : DEGAGER mj-25/26/29/33 ; GARDER+POLIR mj-09/18/21/24/27/28/30/31/32/40/41. Idees notables a instruire : tri generique multi-asset avec variantes cursive/majuscule/script (mj-09, prioritaire lecture), "Ou est Charly" dino, de/domino a miniatures ombres, variante continents + refonte SVG continents (mj-31), galerie coloriage non compressee en JSON zones+couleurs avec quotas 3 gratuit / 5-10 compte (mj-32), question transverse de la fonte (majuscule vs cursive, switch in-game ?). Statuts base laisses a 'nouveau' (pas encore traites).

- 2026-07-20 (DECISION Papa Yann — vocabulaire assets) : 4 familles figees — AVATAR (personnage du profil, img/avatars/, <nom>_<humeur>_<n>.png diminutif, avatar-picker.js, cle maxplay_avatar) · OMBRE (ombre chinoise, img/dinos/ombres/<Nom>_ombre.png) · SPRITE (dino detoure fond transparent, img/dinos/sprites/<Nom>_sprite|_tete.png, reserve mini-jeux) · PALEOART (realiste en scene avec fond, fiches encyclopedie, pas detoure). Grave dans memory/stack.md § Vocabulaire ASSETS. Organisation = par famille d'asset, cle de liaison = nom latin capitalise (sauf avatars en diminutif). Pas de manifeste central (dinos-data/dinos-images-*/dinos-ombres partiels).

- 2026-07-20 (execution delegation LLM — V1 complete + vague 2 partielle) : GO Papa Yann « realiser tous les minijeux du doc, enchainer jusqu'au bout, sans mj-46/47 ». LIVRE : mj-48 (bus S3, file ordinale), mj-49 (barquettes de 10, remplace mj-43), mj-20 gating etoiles, mj-50 (trouve la lettre, le SON jamais le nom), mj-51 (tri des lettres, remplace mj-09), mj-52 (boite a mots), mj-53 (lis et fais, fusion mj-23+06), fix mj-34 (avancement persistant + obstacles eteints), mj-14 en catalog. 8 figees + 8 specs harnais VERTES. Repaires cibles atteints : Spino 46-49, Galli 50-53. Prochain ID : mj-54. RESTE vague 2 : mj-14 AB/AAB + variante dino, mj-15 assets, mj-17 peau dino (T3), mj-31 SVG continents (T4), mj-22 test reel (PY), captcha (test tactile PY). DETTE : tests/index.spec.mjs casse d'avant (ancien menu accordeon) a reecrire pour le Mur. LECON : Œ ligature absent de Cursif → ecrire « oeufs » dans les consignes cursives.

- 2026-07-20 (challenge PO spec v0.5) : Papa Yann decu de la synthese Kimi (regroupement mou, course au nombre de jeux) — demande une vraie passe product owner : fusionner vers 3-5 jeux/theme, chaque jeu specifie (mecanique, affichage, paliers 0-3 etoiles, pourquoi). Contre-proposition Claude en cours sur v0.5 : Spino 4 jeux (S5 bocal absorbe en 3 etoiles de S4), Galli G4 sons-colles differe (apres CVC fluide), Para degraisse (P4/P5 echecs-dames en vague 3, P3 a tester avant slot), build par moteur transverse pas par copain, critere de succes par jeu (Max relance seul). EN ATTENTE ARBITRAGE Papa Yann.

- 2026-07-20 (2e gisement retrouve) : export localStorage maxplay-comments-2026-07-19.json fourni par Papa Yann = 26 commentaires MJ du 2026-07-19 (17:38-21:19 UTC) JAMAIS montes en base (bug comments.js sans cloud.js, schedulePush silencieux). Disjoints des 15 Supabase -> revue complete = 41 jeux commentes. Fusionnes dans docs/specs/2026-07-20-commentaires-supabase-mj.md (PARTIE A Supabase 15 / PARTIE B localStorage 26 + syntheses + themes transverses). 19 commentaires du 2026-07-07 presents dans l export ECARTES (decision Papa Yann : vieux, non pertinents). Verdicts B : SUPPRIMER mj-04/05/16/36/45 + mj-pose-tiles hors menu principal (avec Max Adventure -> ecran parental) ; ECARTER mj-11/12 ; REFONDRE mj-23/34/35/37/38/39/42 ; GARDER mj-06/13a/13c/15/17/19/20/22/43/44/08. Themes transverses : fusion massive des mecaniques doublons (trouve-le X, range en boites, remplis pour atteindre N) vers un jeu generique multi-asset ; cursive demandee sur 4 jeux + question de fonte globale ; jeux du monde (echecs/dames) a faire avec vraies pieces et plateau entier ; suivi d avancement casse sur mj-34 (3 niveaux par etoile puis reset). PARTIE B sans equivalent en base : suivi de traitement dans le fichier de specs, pas via update annotations.

- 2026-07-20 (CHANTIER Papa Yann) : challenge bibliotheque MaxFX + propositions variantes (plus fun/graphique/anime/physique). Labo cree : site/js/celebrations-lab.js (6 marks : balloon, ressort, liane, popcorn, helico, roulade ; 7 stars : bowling, dominos, bascule, galton, feuartifice, ballonpop, tornade) + page de revue site/dev-fx-lab.html (gabarit officiel dev-fx, existant vs candidats cote a cote). ARBITRAGE EN ATTENTE Papa Yann : ce qui est retenu sera fusionne dans MARKS/STARS de celebrations.js (regle CONTRAT v2), le labo sera supprime. Propositions non codees : hooks sonores par style (coin/bubble/bowling via celebrate.js), thematiques univers (bus via busSVG, drapeau) a instruire.

- 2026-07-20 (ARBITRAGE Papa Yann) : tri labo MaxFX tranche — GARDES et fusionnes dans celebrations.js : 6 marks (balloon, ressort, liane, popcorn, helico, roulade) + 4 stars (galton, feuartifice, ballonpop, tornade). JETES : bowling, dominos, bascule ("n'apportent rien"). Bibliotheque officielle = 18 anims point + 22 victoires (tirage randomPoint/randomFinal elargi d'office). Labo supprime (celebrations-lab.js, dev-fx-lab.html, entree hub tools). Reste a instruire : hooks sonores par style, thematiques univers (bus busSVG, drapeau).
- 2026-07-20 (fix au passage) : dev-fx.html chargeait "celebrations.js" racine (404, casse depuis sa creation 91ef327b) -> corrige en "js/celebrations.js". Verif harnais playwright : 18 marks + 22 stars, 40/40 jouees, 0 erreur.
- 2026-07-20 (manifeste assets dino, GO Papa Yann) : script studio/minijeux/scripts/gen-dinos-assets.mjs genere site/js/dinos-assets.js (window.DINO_ASSETS, 62 dinos, familles ombre/sprite/tete/paleoart/avatar) + rapport des trous. Etat : 47 dinos sans sprite/tete (seuls les 15 des mini-jeux en ont), 2 sans ombre ni headshot (Corythosaurus, Hatzegopteryx). Decision : manifeste = fichier JS genere versionne git, PAS en BDD (PWA offline, regle no-fetch, assets statiques).
- 2026-07-20 (assets completes) : 62/62 dinos ont desormais ombre + sprite (47 nouveaux realistes via rembg depuis paleoart), 60/62 tetes. Les jeux (mj-46/47/48, cache-cache…) peuvent puiser dans tout le catalogue via window.DINO_ASSETS. Nuance : sprites low-poly (15 anciens) vs realistes (47 nouveaux) — ne pas melanger les 2 styles dans une meme scene sans validation PY.
- 2026-07-21 (DECISION Papa Yann — scenes de jeu = AVATARS uniquement) : tout personnage dans une scene de jeu = avatar low-poly (img/avatars/), jamais de sprite realiste. Applique : mur.js (tetes copains + portail via helper avatarTete + manifeste avatars.js), index.html (Tritri header), mj-46 (bebes eclosion), mj-48 (passagers) — pool = creatures du manifeste sans les elements (volcan/lave/oeuf/vague/cendre/meteorite). Figee mj-48 mise a jour, regle gravee stack.md § Vocabulaire ASSETS. Sprites realistes = recompenses/revelations (mj-24 a venir). Exception maintenue : mj-53 N1 vraies photos (figee lecture, decision PY mj-27) — a confirmer si elle tient.
- 2026-07-21 (DECISION Papa Yann — atelier avatar, palette 3 couleurs garantie) : retour PY « Cendro 2 couleurs, Ammo 1 seule, ca fait pas bien ». Cause : familles par teinte (2026-07-13) — dino monochrome = 1 famille = 1 pastille. Fix avatar-picker.js : extractFamilies garantit TOUJOURS 3 familles (split de la famille la plus etalee en luminosite clairs/fonces, sinon variante synthetique claire/foncee) + recolorSmart departage par luminosite entre familles de teinte quasi egale. Bonus valide PY : 2 emoji lies a la teinte sous chaque triplet (emojisForHue dans avatar-atelier.html), plus les ✨🌿⚡ fixes. Verif Playwright : 29/29 avatars a 3 pastilles, triplets 3x3, screenshots Cendro/Ammo/Tritri OK. Dette confirmee au passage : tests/index.spec.mjs toujours casse (ancien menu, deja tracke).
- 2026-07-21 (GO Papa Yann — atelier avatar v2 salience + flash de zone) : principe valide « propositions harmonieuses, liberte totale ensuite, mais proposer les BONS polys a changer ». 1) Score de salience famille = population x (0.35 + 1.65 x saturation) dans extractFamilies — un petit accent vif (crete, motif) gagne sa pastille face a un gros aplat terne. 2) Flash de zone : tap pastille → les pixels de SA famille clignotent en blanc sur le grand dino (Avatar.color.zoneMask + famAssign factorise + overlay .zflash anime, cache par dino:idx). Verif Playwright : 29/29 avatars 3 pastilles, masques 3 zones non vides/disjointes (tritri/cendre/ammonite/trex), overlay opacity 0.9 mi-flash.
- 2026-07-21 (factorisation, GO Papa Yann « bibliotheques d'actions ou de dessin ») : mj-kit.js + mj-kit.css crees — oeuf (teintable), pastille de comptage, QCM gros boutons avec boucle QcmRetry complete (MJKit.qcm), phrase du calcul, pool avatars creatures, decors low-poly img/decor/ (fougeres/volcan/cactus/nuage/etoile/buisson) poses dans les coins. Migres : mj-48 (QCM+calc+pool+nuage), mj-49 (oeuf+pastille+QCM+calc+fougeres), mj-50 (fougeres), mj-52 (buisson+etoile), mj-53 (oeufs teintes kit + buisson/cactus). mj-46/47 non touches (chantier Kimi concurrent, a migrer par lui). Harnais 48/49/50/52/53 VERTS. Grave dans MECANIQUES.md (socle). Bug ombre mj-24 du screenshot PY = Corythosaurus/Hatzegopteryx sans ombre, deja corrige par le batch du 2026-07-20.
- 2026-07-21 (avatars v2 paras + diplo, retours PY live) : regen Grok low-poly ("on veut du low poly" + "plus grand" + "attention proportions/caracteristiques"). Paras : crete UNIQUE turquoise filant vers l'ARRIERE (v1 = crosse enroulee vers l'avant, moche/faux), 1 double-crete detectee par PY et corrigee. Diplo : cou immense + petite tete + queue fouet, enerve v1 tete-de-serpent rejete, v3 garde. Sujet plein cadre demande explicitement dans le prompt. 6 nouveaux PNG _2 (les _1 supprimes), manifeste regen (29 creatures). Lecon detourage : les raws Grok rendus "photo papercraft" gardent un lisere sticker blanc ombre que make_avatar.py (floodfill 42) ne mange pas — plutot regenerer en "rendu illustration plate, aucun effet photo" que bricoler le seuil.
- 2026-07-22 (fix CI bloque) : deploys rouges depuis le 21/07 — portail audit-gabarit BLOQUANT sur mj-14 (mp-theme.css absent, jeu ancien gabarit ajoute au catalogue sans passer le portail). Fix minimal : link css/mp-theme.css (style local garde la main), audit + harnais mj-14 verts. Dette migration mj-shell de mj-14 reste ouverte. Consequence du bug : avatars paras/diplo v2 pousses le 21 n'etaient pas en ligne.
- 2026-07-22 (LECON avatars — retour PY "3x le meme animal meme pose") : la methode gravee (batch-avatars-grok.mjs) = 1 chat Grok PAR dino, humeurs 2/3 en "EXACTEMENT le meme que precedemment" DANS LE MEME CHAT (le contexte de conversation porte la coherence). ERREUR commise : humeurs ratees regenerees en chats neufs standalone -> 3 poses/tetes differentes par dino. Regle : une humeur ratee se corrige par message correctif DANS LE MEME CHAT, jamais en chat neuf. Verifier la coherence inter-humeurs (meme animal, meme pose) AVANT d'installer.

- 2026-07-22 (traitement annotations Supabase vague 2026-07-19/21, GO Papa Yann "tout corriger") : 25 annotations MJ traitees. FIXES lances (agents game-dev) : mj-15 entete norme + etoile incoherente ; mj-21 entete + bug melange doses (1+1=3) + depassement tube ; mj-24 son erreur audible + bug double-validation 3e etape ; mj-48 idem double-validation + 162 bleu au lieu rouge (LIGNES) ; mj-27/41 images cassees + retrait audio mj-27 ; mj-28 lampe rayon reduit + contraste + retrait son pre-selection ; mj-32 galerie JSON zones-couleurs (reedition nette, plus de bitmap baveux) ; mj-46 oeufs chevauchement 1/3 + sons craquement/bebes ; mj-47 traits retires + glow + chiffres sous chaque moitie ; mj-50 TTS 1 lettre graphie phonetique + ecran defaite sans etoile. RETIRES du catalog.js : mj-25 ("CA DEGAGE"), mj-29 (doublon pas fluide), mj-33 (memory a regrouper multi-styles), mj-41 (V1 pas besoin d afficher). IDEES capturees : mj-15 dinos dans quiz RER/metro (attention croisements periode/regime/geo/famille) + droit a l erreur/choix ; mj-18 valide genial (Max 8-9 tubes), affiner design, categorie reflexion OK ; mj-21 variance decor (dino atelier/avatar), 1-2-3 couleurs par animal ; mj-24 sprite dino detoure revele au 1er coup + finale tous-dinos applaudissement + anim sprite aleatoire 1x/4-10 ; mj-27 fusion avec nouveaux jeux lecture/syllabes/cursive, vraies photos dinos ; mj-28 categorie pedago a clarifier (lecture ou pas, quelle fonte) ; mj-30 garder en bonus ultra-fan (monde avance) ; mj-40 categorie "geometrie/manipulation dans l espace" a creer, a faire tester ; mj-46 idee ne-pas-ouvrir-non-casses/aleatoire (hors scope v1) ; mj-48 concept a clarifier (question en 2 etapes, notion ligne de 5 en avant, passagers dans vitres bus SVG) ; mj-50 clavier reel vs ordre alphabetique + lettres allumees cliquables premiers niveaux + mode captcha pedagogique. Deja trackees (2026-07-20) : tri cursive mj-09, ou-est-charly dino, de/domino ombres mj-26, continents mj-31, quotas galerie mj-32, question fonte globale. Annotation id 3 (lecture/narration vague 6) = pole NARRATION, non traitee ici.
- 2026-07-22 (DECISION Papa Yann) : tous les jeux deja codes AFFICHES DIRECT dans le menu — fin du gating sequence pour l instant ("on mettra les etapes visible/pas visible apres"). Applique : catalog.js access sequence -> free sur toutes les entrees. Le systeme d etapes/deblocage reste a re-instruire plus tard (donnees chaine perdues volontairement, historique git fait foi).
- 2026-07-22 (REGLE Papa Yann, durcie) : PLUS AUCUN mini-jeu accepte sans LA bonne entete (entete canonique + avancement + etoiles, CONTRAT MJ v2). Constat vague 2026-07-21 : mj-15 et mj-21 non conformes ("lamentable"). ACTION enforcement a faire : etendre audit-gabarit.mjs pour rendre BLOQUANT l absence de piste avancement/etoiles standard (aujourd hui il ne l attrape pas), pas seulement le markup .hdr.
- 2026-07-22 (proactivite demandee PY — jeux jamais testes mj-14/49/51/52/53) : audit transverse contre les remarques precedentes. Constats : mj-51/52 = MEME bug TTS lettres triplees que mj-50 (SONS aaa/mmm/sss) ; mj-51 sans piste golden + anim victoire ad-hoc ; mj-14 = ancien gabarit complet (pas de mj-shell, pas de .hdr, hex en dur, celebrations maison) — dette migration deja connue, passee en action. mj-49/52 cadre conforme, mj-53 dette hex mineure (couleurs oeufs de gameplay, tolerable). 2 agents lances : migration mj-14 mj-shell + harmonisation TTS 50/51/52 + golden mj-51.

- 2026-07-23 fix(menu) — déblocage console parent (maxplay_admin.unlockAll) invisible sur mobile : mur.js ne re-render qu'au load, retour bfcache/console laisse les cadenas figés. Ajout listeners pageshow(persisted)+storage → refresh(). Revert hack test maxplay_test_unlock_all. Commit 1ddb2347. NB: index.spec.mjs périmé (teste .game[data-id] du vieux menu v1, count=0 sur HEAD aussi) — à réécrire pour menu v2.
- 2026-07-25 fix(menu) — vignette mj-30 "3 tailles" (`.vig-tailles img:nth-child(3)` Diplodocus_ombre.png) débordait la carte sur mobile (silhouette très allongée, height:74% sans limite de largeur → écrasait tout le menu). Ajout `max-width:30%` sur `.vig-tailles img` (site/css/mur.css). Screenshot Playwright vérifié avant push. Commit 0a7e5331.
- 2026-07-25 (retour PY) : BUG menu — enorme dino en ombre (diplo ?) ~10x sa taille qui cassait tout l affichage, disparu apres changement de jour -> suspicion rendu "jeu du jour" avec image ombre non contrainte. A reproduire/corriger.
- 2026-07-25 (GO PY) : refaire le tour des mini-jeux — amelioration code + factorisation (mj-kit/bibliotheques).
- 2026-07-25 (tour factorisation, 3 analyses lecture seule) : opportunites classees. QUICK WINS retenus (GO implementation) : MJKit.shuffle+pickDistinct (21 copies Fisher-Yates + shuffle BIAISE sort(random-.5) dans mj-13a/b/c = bug corrige gratuit) ; table SONS phonetique unifiee mj-kit + sayPhoneme (3 copies divergentes 50/51/52 = incoherence pedagogique) ; speak() bruts SpeechSynthesisUtterance mj-22/43/44/45 -> TTS.speak (perdent la selection de voix) ; sndOk/getAC dupliques mj-08/09 (2e AudioContext) -> sounds.js ; .htitle locaux interdits mj-42/43/44/45/47 (perdent Fredoka) -> suppression ; confetti maison mj-11/17/21/37/39 (violation CONTRAT v2) -> MaxFX. A ARBITRER PY (plus gros) : migration QCM maison -> MJKit.qcm sur 19 jeux + unifier MJCompte (verrou anti-double-tap garanti partout) ; PlayAudio.cue MP3->TTS+exclusivite (modele mj-31.playEl, mj-31 fige en dernier) ; G.showEnd variante sans piste (mj-23/11/34/40) ; DnD partage (3 variantes, passer par MECANIQUES.md) ; mj-01+mj-13b encore ancien gabarit ; trilogie 13 tableau LIGNES recopie en dur + backgrounds body hardcodes (13x/47 parti-pris visuel = decision produit) ; reset+#app CSS a mutualiser mp-theme ; composant QCM CSS .mjk-choice a etendre (3 verts/rouges divergents). mj-08 theme clair = exception documentee, ne pas toucher.
- 2026-07-25 (GO PY) : tour SECURITE general (site + cloud + outils) lance.
- 2026-07-25 (PLAYTEST enfant, retours PY) : navigation "pas claire de ce qu on trouve ou" malgre plaisir de voir des jeux ; 3-4-5 jeux joues avec succes MAIS sortie frequente AVANT la fin (l ecran/enjeu sans-faute ne retient pas) ; jeux ressentis trop faciles (niveaux existent, question de calibrage/visibilite) ; aimant naturel = encyclopedie dinos, retour valide "nouveau style de page" dino apprecie. DEMANDE PY : idees pour rendre les mini-jeux plus interessants — gamification, objectifs, quetes, storytelling — brainstorm confie a game-conseiller.
- 2026-07-25 (brainstorm gamification game-conseiller, suite playtest) : DIAGNOSTIC — sortie avant la fin = lecture rationnelle du systeme (etoile sans-faute binaire : des la 1ere erreur, plus aucun enjeu, rien a perdre en sortant) ; "trop facile" = difficulte verrouillee par les etoiles (level=Stars.get, or etoile=sans-faute jamais atteint -> enferme niveau 1), violation de nos propres regles gravees (recompense promise a seuil = anti-pattern rules.md) ; menu pas clair = liste de personnages sans apercu de contenu (VIGNETTES existent mais cachees avant d entrer, drag seul = porte fragile) ; aimant dino = contenu non evaluatif inepuisable auto-dirige. RECO TOP : A1 difficulte suit la competence (tracker, pas les etoiles) + A2 partie sauvegardee + A3 fin non-parfaite valorisee, PUIS systeme FOSSILES (B1 fragment de dino par bonne reponse -> collection encyclopedie, B2 bandeau collection ombres/couleur sur le Mur, B3 fouille du jour), PUIS C1 vignettes sur rangees copains. Moteur = collection de contenu dino (thematiquement neutre pour futur bus/vehicules). 3 QUESTIONS A TRANCHER PY : Q1 etoile sans-faute retrogradee en bonus discret ? Q2 tap accepte en plus du drag sur le Mur (defige decision 2026-07-22) ? Q3 GO voix dans les menus ? Rapport complet : docs/2026-07-25-brainstorm-gamification.md.
- 2026-07-26 (DECISIONS PY — GO chantier NID v3 menu/boucle) : fusion des 2 brainstorms (conseiller Claude + Kimi) validee "vous etes plutot en phase, prend le meilleur des deux". DECISIONS : sortir apres le sans-faute = SAIN (recadrage Kimi, finir sur un succes) — le probleme = pas de raison d ENCHAINER ni de REVENIR ; boucle principale = NID/OEUFS (jeu termine -> oeuf surprise -> nid visible sur Mur -> eclosion a N oeufs -> dino rejoint collection/encyclo avec celebration ; oeuf dore si 3 jeux enchaines) ; etoiles = progression cote parent, oeuf = monnaie enfant (Q1 tranchee de fait) ; frise-chemin par copain (remplace grille repaire, style Khan Kids : fait=tamponne, prochain=brille, suivants=silhouettes) ; ecran victoire 3 boutons (Encore ! / La suite en grand / Maison) ; jeu recommande en grand par repaire ; vignettes parlantes (picto grand, titre secondaire) ; missions du jour + reliques = V3 ; VOIX = differee ("on verra ensemble", Q3 ouverte) ; tap vs drag Mur (Q2) non tranchee -> drag conserve tel quel. Precision profil : additions "dans les milliers" = manipulation decomposee boules/barres 10/carres 100/cubes 1000, tres accompagnee — calibrer les paliers nombre en consequence (pas du calcul mental pur). Exigences PY : architecture propre mutualisee homogene performante, UX fluide intuitive fun. Process : plan complet -> validation conseiller -> mise en oeuvre.
- 2026-07-26 (PLAYTEST PY nid v1) : anim oeuf de fin INVISIBLE ("j ai pas compris ce qui se passait") -> fix visibilite ; gain d eclosion pas clair (fiche ? badge ?) -> expliciter le gain (dino en couleur + acces fiche) ; bandeau 70 ombres qui defile "pas dingue" + ombres non cliquables = incomprehensible -> refonte (compteur, tout tapable, possedes d abord) ; VOIX guideront beaucoup, a bien penser (differe, ensemble). IDEE PY : nid facon MINI-TAMAGOTCHI — nourrir/chauffer/caresser les oeufs, les voir contents/bouger, pre-craquer, mais JAMAIS d ouverture manuelle (v-light : tap=reaction mignonne ; complet avec voix en V2). QUESTIONS PY ouvertes : transformer les etoiles en oeufs ? oeuf meme si tout faux ("pas trop pour") ? fin de collection = motivation apres ? ("on en reparle apres"). PY doit encore refaire le tour des jeux.
- 2026-07-27 (PASSE COMPLETE PY — MECONTENTEMENT, plan de remise au propre demande) : constats bruts = (1) menus MJ hors norme : entete avancement non conforme, titres trop longs ; (2) MINI-JEUX SANS DINO alors que demande repetee 15x (DETTE RECURRENTE, priorite) ; (3) polices qui debordent ; (4) ecrans de victoire foireux ou encore en ancien mode (migration incomplete) ; (5) attribution des oeufs bizarre : beaucoup gagnes mais n apparaissent sur l accueil qu 1 fois sur 3 ; (6) declenchement d eclosion pas clair, un oeuf d or s est ouvert direct ; (7) miniatures du menu principal souvent foireuses -> soit generation GPT soit refonte propre ; (8) favoris a virer ou afficher autrement, idem jeu du jour (le but = faire "suivant" et voir autre chose) ; (9) reduire la taille des panneaux de regles ; (10) REMETTRE AU PROPRE avancement vs etoile vs oeuf — "avons-nous besoin de tout melanger ?" (question de fond, arbitrage a proposer) ; (11) verifier que TOUS les dinos ont ombre + sprite ; (12) verifier que tous les dinos ont leurs sons voix propre ElevenLabs ET qu ils sont bien appeles ; (13) encyclopedie : reutiliser les images de familles faites pour la Lunii + verifier qu on a tout ; (14) encyclopedie : nouvelle categorie EPOQUES (tri par epoque) ; (15) CARTES DU MONDE des dinos = deja demande, jamais fait, "horrible les patates" -> refonte vraies silhouettes de continents. Demande PY : relire tout l historique, valider bonnes pratiques et logique, tout noter, faire un PLAN, consulter le conseiller en cas de doute, suivi PMO complet.
- 2026-07-27 (AJOUT au constat PY, point structurant oublie) : "y a pas moyen de construire les jeux en disant voila entete, je passe juste le titre et l avancement mais TOUT LE MONDE A LE MEME CODE REUTILISABLE pour l entete, pareil pour l ecran de victoire... ON NE RECODE PAS ON FACTORISE ET ON REUSE, surtout quand c est pour faire pareil !" -> exigence d architecture = gabarit unique impose (entete + avancement + ecran de victoire) consomme par TOUS les MJ, aucune variante locale toleree. C est la cause racine des constats 1/3/4 (entetes hors norme, polices qui debordent, ecrans de victoire en ancien mode).
- 2026-07-28 (PLAN DE REMISE AU PROPRE ecrit) : docs/2026-07-28-plan-remise-au-propre.md — 2 audits factuels + 8 chantiers C0-C8 + 4 arbitrages PY. CHIFFRES CLES : 33/45 jeux n utilisent pas G.showEnd (19 encore a l ancien modele 2 boutons) -> CAUSE RACINE des oeufs manquants (grantCapsule n est appele que par showEnd) ; 29 jeux golden absent/false malgre maxStars 3 ; 9 entetes surcharges ; 7 debordements Cursif critiques ; 32/45 jeux sans dino dont 10 skinnables en substitution pure ; audit-gabarit ne testait NI golden NI showEnd NI longueur de titre (cause de la derive silencieuse). LECON PY (autocritique demandee) : la conformite technique n est PAS un argument pour republier un jeu ecarte pour raison pedagogique — mj-25/29/33/41 restent RETIRES (decisions PY 2026-07-21 relues et citees), a marquer retire:true pour qu aucun audit ne les re-propose. AJOUT C0 : passe de tri qualite par game-conseiller AVANT toute migration (garder/fusionner/refondre/retirer, redondances type compter-des-passagers mj-04/05/45/48), soumise a PY avant code.
- 2026-07-28 (ARBITRAGES PY sur le plan de remise au propre) : (1) MONNAIES = on GARDE oeufs + etoiles pour le moment, en DOUBLE BONUS : Max gagne des oeufs tant que le jeu n est pas a 3 etoiles (au-dela : plus d oeuf sur ce jeu, anti-farm naturel). EXIGENCE : que ce soit CLAIR ET LISIBLE au moment de la recompense (l ecran de fin doit dire ce qu on gagne, sans melange). (2) NIVEAU = GO pour coder ET TESTER la montee rapide : "si les 2 premieres reponses sont correctes on augmente un peu ; si le niveau 2 est moyennement maitrise on retente le 1 mais il aura surement 1 etoile quand meme". PY demande une CONCEPTION argumentee (pas du bricolage) : s appuyer sur la recherche deja faite (skill game-design-enfant : ZPD, flow, 3-reussites/3-echecs) et EXPLIQUER la meilleure maniere. => defigeage de fait de la formule mj-04 (niveau = Stars+1), a graver dans les figees apres conception. (3) DINOS : PAS DE MASCOTTE pour le moment. Dinos uniquement la ou le remplacement est FACILE (substitution d asset) OU la ou ils apportent un concept / du fun / une variante de gain. (4) VOIX EL : uniquement le CANONIQUE = tous les noms de dinosaures (GROSSE ATTENTION A LA PRONONCIATION — verifier le skill/agent existant et le lexique de prononciation, valider que TOUS les dinos l ont) + les elements repetes dans x jeux : chiffres, additions, "trouve le dino", "combien de dinos / oeufs / etoiles / bus". Pas de voix menu pour l instant.
- 2026-07-28 (C0 TRI QUALITE rendu par game-conseiller — EN ATTENTE VALIDATION PY) : 45 entrees -> 33 proposees. RETIRER 9 (mj-04, mj-05, mj-11, mj-12, mj-16, mj-26, mj-36 + max-adventure et mj-pose-tiles vers ecran parental). FUSIONNER 5 (mj-08->mj-09 tri generique multi-asset, mj-23->mj-53, mj-27->mj-53 doublon assume, mj-43->mj-45 meme moteur mj-dice, mj-44->mj-50 memes phonemes). REFONDRE 12 (mj-06, mj-14, mj-17, mj-20, mj-22, mj-34, mj-35, mj-37, mj-38, mj-39, mj-40, mj-42, mj-45). GARDER 21. Constat structurant : la redondance n est pas thematique mais dans les MOTEURS (mj-43/45 partagent mj-dice.js, mj-04/26/46 partagent mj-compte.js, mj-44/50 la meme banque de phonemes) — le catalogue mentait sur son volume ; et mj-49 avait ete livre comme "remplace mj-43" (backlog 2026-07-20) sans que mj-43 sorte du menu. FRONTIERE PROPOSEE du bloc compter (repond a la question PY "pourquoi ce jeu vs l autre") : mj-46 = DENOMBRER, mj-48 = TRANSFORMER, mj-49 = STRUCTURER (la dizaine) ; tout le reste etait une n-ieme peau. GAIN : ~10 des 33 ecrans de victoire a migrer concernent des jeux qui sortent -> travail economise, C1 lot A ne portera que sur les 21 GARDER. 3 QUESTIONS A PY : (1) mj-17 garage garde par attachement de Max malgre valeur peda faible, assume ? (2) mj-39 vs mj-40 collision geometrie (tangram vs tangram) — un seul survit ? le vrai Tetris = chrono qui stresse, contraire a nos regles ; (3) valider la frontiere denombrer/transformer/structurer.
- 2026-07-28 (C1a PORTAIL livre) : audit-gabarit.mjs apprend enfin a detecter la derive — 5 checks ajoutes (appel reel a G.showEnd + 11 marqueurs d overlay maison dont le piege .end-wrap de mj-34 ; golden:true obligatoire si maxStars>0 ; titre <=4 mots/<=22 car ET coherent catalog<->MJ.init<-><title> ; .hdr canonique sans CSS locale ni element ajoute ; dette Cursif >=2rem sans clamp/line-height). Flag --strict : dette par defaut (CI verte, exit 0 verifie) -> bloquant a la bascule, plan documente en tete de fichier. MESURE : 34 jeux bloquants en --strict, 6 deja conformes (mj-12, mj-24, mj-26, mj-46, mj-47, mj-49). Rapport : docs/2026-07-28-audit-portail-resultat.md. LECON : le garde-fou ne testait rien de ce que le CONTRAT v2 declarait obligatoire — une regle non outillee n est pas une regle.
- 2026-07-28 (ICONE PWA remplacee, demande PY depuis inbox) : nouvelle illustration MaxPlay (T-Rex + bus 162 + Parasaurolophus + Triceratops, lettres A/B/C et chiffres 1/2/3, volcan) posee en icone d installation. Source `studio/minijeux/inbox/8b209b7d-...png` (1254x1254, coins arrondis PEINTS EN NOIR dans le PNG -> combles en bleu ciel #139AF4, pas croppes : un crop du carre inscrit coupait le "y" de Play, verifie visuellement). Manifest passe de 3 entrees "any maskable" (dont un SVG obsolete qui primait sur les PNG) a 4 entrees separees : any 192/512 plein cadre + maskable 192/512 avec image a 78% sur fond ciel (safe zone Android 80%). apple-touch-icon dedie 180x180 (iOS ignore le manifest et n arrondit pas). PNG quantifies 256 couleurs : 512 passe de 438 Ko a 98 Ko. LECON : `purpose: "any maskable"` sur une icone plein cadre = titre rogne sur Android — toujours 2 jeux d icones distincts. Commit 1a3cc807, pousse.
- 2026-07-28 (DECISIONS PY sur le tri C0) : mj-17 LE GARAGE -> SORT du menu, mais l IDEE EST GARDEE ET A SOIGNER : "soigner, laver, reparer" (prendre soin d un vehicule/animal) = concept a re-concevoir proprement plus tard, pas un simple reskin. mj-39/mj-40 : PY ne tranche pas mais REFUSE le Tetris ("nan pas un tetris") -> le chrono qui stresse est ecarte definitivement ; arbitrage geometrie a instruire par le conseiller. FRONTIERE denombrer/transformer/structurer : PY ne valide pas telle quelle ("je ne comprends pas, reflechis, demande au conseiller et AGIS") -> le conseiller doit trancher LUI-MEME la structure du bloc compter et l exprimer en langage clair (pas de jargon), puis on applique sans re-solliciter PY.
- 2026-07-28 (C0 TRANCHE PAR LE CONSEILLER — mandat PY "reflechis et AGIS") : trois arbitrages rendus, applicables tels quels au catalogue.
  (A) BLOC COMPTER — la frontiere denombrer/transformer/structurer est ABANDONNEE (jargon, echoue au test du langage clair). Remplacee par une frontiere en 4 lignes dites comme a un parent : mj-46 "il y en a combien" (des choses posees, on les compte, un nid d oeufs) · mj-47 "deux groupes ensemble" (deux paquets d un coup d oeil, ca fait combien en tout = premiere addition) · mj-48 "il en arrive et il en part" (le nombre change pendant qu on regarde, bus qui se remplit et se vide) · mj-49 "on range par paquets de dix" (une barquette pleine = 10, on lit les grands nombres sans recompter). 4 jeux, 4 phrases, aucune ne peut se dire a la place d une autre. SORTENT du bloc : mj-04 (= mj-46 en peau passagers), mj-05 (= mj-48 en moins bon, panneau texte a lire), mj-26 (= mj-46 en peau dinos), mj-43 (= mj-45 meme moteur mj-dice), mj-45 (= mj-48 en moins riche, absorbe en 3e etoile de mj-48 : la variante "descendre" y devient un palier).
  (B) GEOMETRIE — les DEUX survivent, ils ne font pas la meme chose (verification faite dans le code, pas sur les titres) : mj-39 "Blocs magiques" N EST PAS un Tetris (aucun chrono, aucune piece qui tombe, grille 9x9 style Blockudoku : 3 blocs poses au doigt, une ligne pleine s efface) -> le refus PY du Tetris ne le condamne pas, il le CONFIRME ; garde tel quel + refonte de forme (contrat v2), la ou mj-40 "Tangram" = assembler 7 pieces pour reconstituer UNE silhouette donnee, avec rotation. Difference dite simplement : dans l un on REMPLIT un espace vide comme on veut, dans l autre on REPRODUIT une forme imposee. Condition posee : mj-39 ne doit jamais gagner de chrono ni de vitesse de chute (regle gravee ici), et sa fin de partie doit rester "plus de place" et non "trop lent".
  (C) mj-17 LE GARAGE -> RETIRER du catalogue (decision PY). Le concept "prendre soin" (soigner / laver / reparer) est PARQUE comme piste a re-concevoir, pas un reskin : voir EP-112.
  LISTE FINALE C0 = 45 entrees -> 30 au menu. RETIRER 11 : mj-04, mj-05, mj-11, mj-12, mj-16, mj-17, mj-26, mj-36 (+ max-adventure et mj-pose-tiles deplaces vers ecran parental, + mj-43 par fusion). FUSIONNER 5 : mj-08->mj-09 · mj-23->mj-53 · mj-27->mj-53 · mj-43->mj-45 puis mj-45->mj-48 (le moteur de dnombrement par groupes survit dans mj-48) · mj-44->mj-50. REFONDRE 11 : mj-06, mj-14, mj-20, mj-22, mj-34, mj-35, mj-37, mj-38, mj-39, mj-40, mj-42. GARDER TEL QUEL 19. Les jeux retires prennent retire:true (jamais re-proposes par un audit, cf. lecon 2026-07-28).
- 2026-07-28 (EP-112 CREE — piste "Prendre soin", issue du retrait de mj-17) : concept garde par PY, a re-concevoir de zero. Coeur = s occuper d un etre/objet qui en a besoin (laver, soigner, reparer, nourrir), sans quiz, sans bonne reponse unique, sans echec. Rapprochement a instruire : c est le MEME registre que le nid/oeufs facon mini-tamagotchi deja demande par PY (2026-07-26), donc a etudier comme extension du NID plutot que comme 46e mini-jeu isole. Statut [?] : pas de code avant conception validee.
- 2026-07-28 (C0b APPLIQUE AU CATALOGUE) : verdict tranche par le conseiller (entree ci-dessus) applique dans site/js/catalog.js. RETIRE (retire:true, entree gardee, jamais supprimee) : mj-04, mj-05, mj-11, mj-12, mj-16, mj-17, mj-26, mj-36, mj-43 + les 4 deja ecartes le 2026-07-21 mais dont l entree avait disparu du fichier (mj-25, mj-29, mj-33, mj-41) re-crees depuis l historique git (commit e8948785, contenu original restitue verbatim titre/emoji/desc) pour que la decision soit tracee dans le fichier et pas seulement au backlog. FUSIONNE (retire:true + note pointant l absorbant) : mj-08->mj-09, mj-23->mj-53, mj-27->mj-53, mj-44->mj-50, mj-45->mj-48 (variante "des passagers descendent" notee en TODO dans figees/mj-48.md, PAS codee). DEPLACE vers ecran parental (retire:true + parental:true) : max-adventure, mj-pose-tiles — aucun ecran parental existant ne les listait (suivi.html = stats uniquement, compte.html = compte/sync uniquement) -> ajoutes en lien discret dans compte.html, sans surcouche. REFONTE (visibles, refonte:true informatif) : mj-06, mj-14, mj-20, mj-22, mj-34, mj-35, mj-37, mj-38, mj-39, mj-40, mj-42. 3 champs de gouvernance docs en entete de catalog.js (retire/parental/refonte). Figees creees/completees : figees/mj-39.md (interdiction chrono/vitesse de chute, refus Tetris PY grave en LOI) + figees/mj-48.md (TODO 3e etoile heritee de mj-45). FILTRAGE : fonction unique window.catalogVisible() ajoutee a catalog.js (exclut retire:true), branchee dans mur.js (renderParents + repaireState/visibleIds, remplace le filtre local), pins.js (catalog()), index.html (total etoiles profil), mj-kit.js (chain next/prev). Le lookup par id brut (lancer un jeu, repaire/portail, tracker) reste sur MAXPLAY_CATALOG non filtre — necessaire pour l acces parental/historique. MESURE dette audit-gabarit.mjs --strict : la fonction catalogIds() du script datait d avant retire:true (regex sur tout id du fichier, sans check retire) -> corrigee pour exclure les lignes retire:true, sinon le perimetre reduit n etait pas mesure. Resultat : 34 BLOQUANT ce matin (48 jeux) -> 21 BLOQUANT maintenant (31 jeux au menu, dinos exclue du calcul mj-*.html). Non-strict toujours exit 0 (0 bloquant, dette visible). Verif Playwright (script jetable, supprime apres usage) : MUR.showParents() rend 31 cartes .game[data-parent-id] dans les tiroirs, 0 jeu retire:true ne fuite, 0 erreur console. Note ecart chiffre : le catalogue reel comptait 48 entrees (pas 45, drift deja signale par le conseiller "le catalogue mentait sur son volume") -> 31 mini-jeux visibles apres retrait de 16 (hors les 4 recreees), proche de la cible 30 mais pas exactement (ecart herite de l instruction, pas introduit ici).

- 2026-07-28 · BUG CORRIGÉ mj-22 — Royaume-Uni demandé (niveau facile) mais absent de la carte : le SVG Wikimedia code `gb` en `<g>` multi-îles, le loader ne lisait que les `<path>`. Fix : `path[id], g[id]` + `cloneNode(true)`. 30/30 pays présents, harnais vert. Ligne gravée dans figees/mj-22.md. (Signalé par Papa Yann.)
- 2026-07-28 · DURCISSEMENT mj-22 (suite revue secu auto) — le clone profond du <g id="gb"> recopiait tout le sous-arbre d'un SVG tiers. Ajout liste blanche (path/g/polygon/polyline) + retrait des attributs on*/href/id/style sur tout le sous-arbre. Risque theorique (Wikimedia compromis), cout nul, aucune ligne figee touchee.
- 2026-07-28 · L-XXX FAUX POSITIF HARNAIS mj-22 — le spec normalisait le pays via charAt(0).toUpperCase()+slice(1).toLowerCase(), ce qui transformait "Royaume-Uni" en "Royaume-uni" et cassait le selecteur. Invisible tant que le UK etait absent de la carte : le fix du loader a EXPOSE le bug latent. Lecon : une normalisation de casse naive casse les noms composes (tiret, apostrophe). Compare desormais en XPath translate().
- 2026-07-28 (BILAN HONNETE de la session, audit de couverture impitoyable demande par PY) : sur les 21 retours de la passe du 27/07 -> 8 TRAITES (dont 7 par le MEME fix generique : migration gabarit/showEnd), 3 PARTIELS, 10 NON TRAITES, 4 CADUCS (jeux retires). Message "les ecrans de victoire sont repares" = vrai ; message "les retours de PY sont traites" = FAUX. Sur les 16 constats globaux : 8 traites, 4 partiels, 4 non traites. DEUX CONFUSIONS DE PERIMETRE DE MA PART, corrigees au constat : (a) j ai annonce "eclosion accueil-only confirmee" -> vrai pour le nid/Collection, FAUX pour l animation hatchAll de mj-46 que PY visait ; (b) j ai annonce "prononciation corrigee" -> vrai pour les 11 MP3 de noms de dinos, FAUX pour mj-50 (TTS qui EPELLE la lettre, "E accent grave f") dont le fichier n a pas ete ouvert de la journee. AUTRES DECOUVERTES DE L AUDIT : mj-49 les 2 formulations demandees EXISTENT deja mais la variante "atteindre" est verrouillee au niveau 2 (PY ne l a jamais vue) ; le titre mj-20 juge trop long fait EXACTEMENT 4 mots donc le controle automatique le valide — le critere ne capture pas le ressenti ; mj-32 (atelier coloriage, maxStars 0) ne donne AUCUN oeuf, decision jamais tracee ; mj-42 a 2 appels showEnd (risque double capsule).
- 2026-07-28 (RESTE A FAIRE, priorise) : P1 mj-50 prononciation qui epelle + mj-46 retirer hatchAll intra-jeu + mj-30 nom seul au tap (fiche trop longue) + mj-34 panneau SORTIE devant l ouverture et calibrage difficulte + mj-20 voix trop longue ("elle dit 4, 4 c est 4") + mj-49 remonter la variante "atteindre" ou demander a PY ce qu il n a pas vu. P2 banque audio chiffres/phrases-gabarits (C6b, non commencee) + 2 emblemes familles Lunii manquants (Mammiferes, Oiseaux) + verifier que les MP3 dinos sont bien APPELES (2e moitie du constat 12, jamais testee) + valider a l oreille Megatherium/Paraceratherium (restes hors preview). P3 idees tombees sans ticket : mj-53 jeu clavier complet, mj-18 pastille par tube plein, mj-15 intrus par regime/famille/epoque, mj-45 variante "que monter" notee en TODO figee mj-48 mais non codee, mj-14 mode ombres+couleur au lieu de shapes/bus, mj-19 substitution dino (cas facile jamais fait). DETTE DOC : figees/menu.md decrit encore l ancien menu accordeon, obsolete depuis le Mur.
- 2026-07-29 (TODO Papa Yann, a reprendre VSCode) : onboarding menu principal 1er usage (ou apres reinit complet) - tout le menu (avatars/repaires) explique automatiquement, comme le panneau regle existant par MJ mais applique au niveau menu. Lie au chantier flechage live "tape ici" deja note ce tour (mecanique transverse a instruire dans MECANIQUES.md avant code, bibliotheque avant code neuf).
- 2026-07-30 (GO Papa Yann — chantier NID v4 + onboarding, fusion retours Claude + copain LLM) : DECISIONS issues de la fusion : (1) caresse = reaction mignonne + craquement VISUEL 3 stades persistant, SEULS les accessoires donnent de la chaleur (craque != pret, 2 infos visuelles distinctes) ; (2) zero decay/zero timer — la chaleur ne fait que monter, jamais d oeuf qui a froid/meurt (D-002) ; (3) regle de drop DETERMINISTE : nid pas plein -> oeuf, nid plein (3) -> accessoire, 1 gain par partie annonce clairement (arbitrage 28/07 tenu) ; (4) anti-farm 3 etoiles ETENDU aux accessoires ; (5) oeuf colore = couleur DINO_FAMILLES existante, espece surprise, dore = overlay brillant par-dessus ; (6) sac a dos = PAS un panneau de plus sur le Mur — tap nid -> ecran chambre des oeufs plein ecran, sac lateral, soin = drag accessoire sur oeuf ; (7) celebration ENORME 3e etoile seule, 1-2 discretes (reglage celebrations) + idee copain : 3e etoile offre l accessoire rare de la famille du jeu (a instruire) ; (8) coach-marks = bibliotheque unique mj-coach.js instruite dans MECANIQUES.md avant code, geste force UNIQUEMENT la ou le geste EST le jeu, toujours skippable, flag one-shot par profil ; (9) presentation copains PROGRESSIVE (bulle one-shot <5s a la 1ere visite de la rangee), jamais 6 presentations en rafale ; (10) onboarding sans voix menu = tout gestuel/anime, texte = pour l adulte ; (11) encyclopedie = legende des oeufs (lien famille->fiche renforce), on ne demenage rien ; (12) verifier formulation D-003 (recompense promise) dans memory/DOCTRINE.md avant de graver le wording ecran nid. PHASAGE : V1 = celebration 3e etoile + oeufs colores famille + legende encyclo · V2 = ecran nid/sac/chaleur/eclosion individuelle + theatre 1er oeuf (HATCH_COST=3 capsules saute) · V3 = mj-coach.js + onboarding menu complet. DEFAUT POSE PAR CLAUDE (reversible, a valider a l usage) : accessoire CONSOMME a l eclosion (sinon economie morte apres 6 parties), seuil 3 accessoires = les 3 emplacements visibles, 1er oeuf de l histoire eclot a 1 accessoire (theatre onboarding rapide). Question email/nom adulte (friction accueil) reportee a V3.
- 2026-07-29 (P0 MOCKUP v2 — retours PY appliques) : "trop serre" -> scene = espace FIXE 1024x768 mis a l echelle par transform (letterbox, composition garantie sur tout ecran, verifie 1024x768 + 390x700) ; echelle dinos COHERENTE (T-Rex 150, Spino 148, Tritri 132, Galli 104, Volta 100, Troudi 92 — tailles relatives reelles) ; bus SUR la route (roues sur la chaussee, z-index sous les persos), RARE (1re fois ~18s puis toutes les ~60s, traversee 9s), TAPPABLE -> KLAXON synthetise WebAudio (2 bips square 392Hz) + petit saut, aucun asset son. Bug corrige : styles inline transform/opacite ecrasaient la classe .roule (le bus ne passait jamais) -> reset par remove/reflow/add de classe uniquement. Screenshots verifies (temp/v5-v2-tablette.png, v5-v2-mobile.png, v5-v2-bus2.png). Spacing Spino/T-Rex reserre proprement (labels lisibles).
- 2026-07-29 (P0 MOCKUP VALLEE livre) : site/design-mur/v5-vallee.html (+ lien dans design-mur/index.html). Vue du dessus tapis de jeu, 6 habitants places (Volta/ptero pres du volcan, Galli aux sapins, Spino a la mare, Troudi = PROXY asset velo (pas de troodon dans avatars.js, a generer un jour) pres du rocher, Tritri aux fougeres, Roi T-Rex immobile avec livre + anneau dore pulsant), balade lente transform-only, bus 162 qui passe (busSVG), mare/nuages/reflets CSS, header identite seule (avatar+pseudo+etoiles). Interactions demo : tap copain -> bulle phrase ; tap T-Rex -> bulle 3 choix (encyclo/nid/Padidi) ; bulle-pensee vignette oeufs qui pop a 6s au-dessus de Spino. DECOUVERTE : site/img/decor/ existe deja (volcan_fumant, fougere, rocher, sapin, palmier, arret_bus, nuages, etoile_filante, meteorite_feu — generes via batch-decor-gpt.mjs) -> zero nouvel asset necessaire pour la scene. Screenshots verifies Playwright (temp/v5-vallee-final.png). Reste : validation ressenti PY, puis P1 (scene + tap->bulle branchee sur repaireState).
- 2026-07-29 (SPEC VALLEE v0.5 — hote jeux dino = AVATAR du joueur, decision PY) : "on dit que l'avatar choisi est le jeu des dino (sauf si c'est deja un des autres perso, alors c'est Tritri)". Regle gravee spec §4.3 : l'hote des jeux dino = le dino-avatar choisi a l'onboarding ; REPLI Tritri si l'avatar est deja un copain fixe (Spino/Galli/Troudi/Volta/T-Rex) ; si l'avatar EST Tritri, il heberge lui-meme ; changement d'avatar -> l'hote suit. Resolution dynamique au rendu (§9). Spec v0.5 = reference dev.
- 2026-07-29 (SPEC VALLEE v0.4 VALIDEE PY — "VAZI on fait ca") : arbitrages finaux tranches. JEUX DINO -> TRITRI le Triceratops (ex-hote, assets prets, fougeres) ; T-Rex = ENCYCLO SEULE (question PY "encyclo OU mini-jeux dino dans le T-Rex" -> encyclo ; raison : un copain = un registre, on ne joue pas dans un livre). Porte monde dino = bulle T-Rex a 3 vignettes (encyclo existante / nid / Padidi). Cabane supprimee. Bulle-pensee vignette TAPPABLE validee. Statut : spec de reference pour le dev, prochaine etape = P0 mockup vallee vue du dessus (assets existants). Session coupee ici (PY fatigue) — reprendre par le mockup P0.
- 2026-07-29 (VALIDATION PY — bulle-pensee vignette) : "c'est top ca ! y pop (bulle) un de ses jeu" — le copain delaisse fait poper UNE de ses vignettes de jeu dans une bulle-pensee ; vignette TAPPABLE -> lance le jeu direct (porte la plus courte vers un delaisse). Grave dans la spec v0.3 §4.4.
- 2026-07-29 (CORRECTIONS PY sur spec Vallee v0.2 -> v0.3) : (1) LES OEUFS NE VONT PAS DANS LE MENU "ca ne va pas du tout" — le nid/collection sort de la vallee, tout le meta collection vit dans le MONDE DINO ; (2) sortir les MINI-JEUX DINO de l encyclo/T-Rex — ils deviennent un copain a part dans la vallee (proposition Claude : TRITRI le Triceratops, ex-hote, assets existants, fougeres) ; (3) "les dinos levent la tete" impossible (assets images fixes) — supprime ; (4) menu = VUE DU DESSUS simple, fausse 3D ok, reutiliser objets/images DEJA generes ; persos se balladent SANS JAMAIS se rentrer dedans (anti-collision) ; (5) nom = TROUDI (pas Trouki) ; (6) T-Rex = encyclo COMME ELLE EXISTE deja ; Padidi = simple point d entree direct vers les fiches de l encyclo, pas une page album elaboree. Spec v0.3 ecrite ce tour.
- 2026-07-29 (SPEC MUR V2 "LA VALLEE" ecrite, v0.2 avec le POURQUOI) : docs/specs/2026-07-29-mur-v2-la-vallee.md — consolide les 4 tours (header unique, scene=menu, Padidi, humeurs-Decouverte, page Nid v4, onboarding). v0.2 : chaque decision porte sa justification (vision lieu-vs-liste, memoire spatiale pre-lecteur, emotion>information, recompense=etre pas jeton, zero decay, surprise calibree couleur d oeuf, anti-spoiler Padidi). Casting PROPOSE : Spino(mare)/Galli(arbre) inchanges, Velo->TROUKI le Troodon (grotte, "le plus malin"), Para->VOLTA le Pteranodon (volcan, vole), Roi T-Rex lecteur immobile. Bebes eclos se baladent dans la vallee. Bus 162 en decor. Phasage P0 mockup SVG -> P4. 5 questions ouvertes dont validation casting. En attente arbitrage PY (competition avec copains LLM).
- 2026-07-29 (PIVOT Papa Yann — MUR V2 "LA SCENE", DEFIGE la file + le drag) : "NAN OUBLIE rangee et drag" — fin de la file verticale ET du geste drag-to-enter (decisions PY 2026-07-22 defigees par PY lui-meme). Nouvelle direction : UNE page = un PAYSAGE (mare, arbre, fougeres, volcan, rocher) ou les dinos se baladent librement ou echangent leur place. Objectif : tout dans une page, plus simple. Motif PY : l allegeance header (3 bandes -> 1 ligne) a libere l espace, "l esprit est ailleurs". CONSEQUENCES tracees : spec Mur v0.6 (2026-07-19-menu-mur-copains.md) et son principe "zero meta-monde" a reecrire en spec Mur v2 ; la scene doit etre CSS/SVG (decision "zero image generee" toujours en vigueur) ; entree jeux = tap sur le dino -> bulle de vignettes (plus de page repaire separee ?) ; repaire/frise/gabarit mur.js = chantier de refonte. Challenge Claude ce tour (sprint-log) : zones-ancres avec laisse (chaque dino garde SON lieu : Spino pres de la mare = canon, lecteur sous l arbre) car la memoire spatiale EST la navigation d un pre-lecteur ; errance en transform-only ; la scene ne tue pas la boucle nid/eclosion (overlays au retour de jeu conserves).
- 2026-07-29 (IDEES Papa Yann — album PADIDI + copains vivants + humeur = Decouverte) : (1) l album collection s appelle PADIDI (Panini + Dino) ; on y voit les couleurs de familles et les ombres, MAIS l oeuf en cours JAMAIS a la place physique du dino qu il contient (pas de spoiler, pas de lien vers la fiche) — au plus devant le titre de famille ; (2) PY pas convaincu par "Decouverte 1 grosse + 2 petites" : il prefere les copains qui SE BALADENT dans la page menu, chacun dans sa zone (eviter superpositions) mais pouvant communiquer en bordure ; (3) l humeur triste du copain delaisse REMPLACE les tuiles Decouverte ("bcp mieux que des paves") + bulle si inactivite "xxx est un peu triste, il aimerait que tu joues a ses jeux" ; (4) encyclopedie = un perso STATIQUE avec un livre (au pied d un arbre) — PY suggere aussi "trex dans une cage" (challenge Claude : non a la cage, connotation negative vs Roi T-Rex). Reponse ce tour (sprint-log) : Padidi valide tel quel ; balade = dans la rangee-territoire (pas de roam libre : cible mouvante vs motricite 4 ans + conflit drag-to-enter, le dino s arrete au pointerdown) ; Decouverte supprimee au profit des humeurs + vignette en bulle-pensee (sans texte) ; lecteur statique OK en coin calme.
- 2026-07-29 (IDEE Papa Yann — HEADER UNIQUE Mur, convergence "quest de collection") : fusionner les 3 bandes du haut (profil / nid / collection) en 1 SEULE ligne d entete : avatar + pseudo (longueur limitee) a gauche · icone NID compacte au milieu (tap -> page/zoom nid plein ecran, accessoires en dessous) · icone avancement/sac a dos ou "pokedex" a droite (tap -> PAGE ENTIERE album de toutes les ombres dino, ce qui est fait/en cours, couleurs d oeufs par famille). 3 bandes -> 1 ligne, le reste devient des pages dediees. Challenge Claude ce tour (voir sprint-log) : valide = convergence avec le pattern radical propose hier ; garde-fous = (a) badge notif sur l icone nid pour que la boucle de recompense reste visible sans bande permanente, (b) album = vue collection pure qui LANCE l encyclo existante au tap, PAS une 2e encyclopedie, (c) backpack vit DANS la page nid pas dans le header, (d) pseudo borne (12 car) des l onboarding.
- 2026-07-29 (IDEES Papa Yann — Mur : vie des copains + allegeance layout) : (1) QUESTION slider x6 persos vs PAYSAGE ou les copains se deplacent dans leur territoire avec reactions humeur (smack/colere — les tetes de colere existent dans avatars.js) ; (2) constat surcharge accueil : nid = bande entiere OK, collection = bande fine mais tres longue (2 lignes ?), Decouverte = CASES ENORMES, trop de gros blocs bourrins "pour un petit" ; demande de patterns d allegeance. Reponse/challenge Claude rendu ce tour (voir sprint-log) : non au slider, oui a la vie INJECTEE dans les rangees existantes (pas de meta-monde separe, principe 3 de la spec Mur), humeurs colere/boudou reservees au "delaisse" de la Decouverte, collection en 2 lignes scroll horizontal + album complet dans l ecran nid, Decouverte reduite a 1 grosse tuile + 2 petites.
- 2026-07-31 (SPEC "DinoJeux" recue — GO PY "execute ca") : pack 6 jeux de logique/deduction (spec externe copain LLM) gravee dans docs/specs/2026-07-31-dinojeux-pack-logique.md AVEC adaptations MaxPlay obligatoires (jamais "Bravo Max" — regle figee ; HTML vanilla mj-shell PAS React ; integration vallee PAS app standalone ; banque sons + MaxFX PAS WebAudio maison ; etoiles/oeufs existants PAS gamification parallele ; deblocage = sequence 2 etoiles). 6 jeux : mj-54 Sudoku Dino (4x4 symboles) · mj-55 Equilibre (Takuzu) · mj-56 Les Enclos (Queens+zones) · mj-57 Oeufs Surprise (SameGame, fin naturelle jamais de defaite) · mj-58 Dino Run (runner lateral saut variable, acceleration PLAFONNEE — refus chrono-stress respecte) · mj-59 Territoires (Shikaku, niveau 0 passerelle). Placement : Troudi = 54/55/56/59, hote dino = 57/58. Fabrication lancee en agents game-dev paralleles, 1 figee + 1 spec harnais par jeu.
- 2026-07-31 (DECISIONS PY, avant compact) : (1) PAUSE onboarding + mj-coach ("pour le moment on attend") — prochaine direction = FAIRE D AUTRES JEUX + CHALLENGER les jeux existants ; (2) systeme oeufs/recompenses VALIDE au ressenti ("marche pas trop mal") ; (3) PADIDI = MUR D OMBRES : TOUS les dinos visibles EN UN ECRAN (x retours a la ligne, grille wrap, vignettes compactes), plus de rangees par famille a defilement horizontal — "c'est ca qui est marrant, pour Max et pour l'avatar qui vient deposer l'oeuf". Implemente dans le tour (nid-ui padidiContentHtml -> mur plat ordonne par famille avec teinte famille conservee, cible theatre .nid-vig[data-dino] inchangee).
- 2026-07-30 (RETOURS PY vallee v2) : (1) bulle copain = TOUT AFFICHER en 2-3 lignes (wrap), pas d ascenseur horizontal ; (2) Roi T-Rex toujours trop bas -> remonte (coin trone y 86 -> 74).
- 2026-07-30 (SPEC v0.7 recue — GO PY "tout appliquer puis purge") : 3 decisions PY a implementer : (1) THEATRE D ECLOSION complet §6.1 — oeuf pret s agite/sparkle, l avatar du joueur (ou copain fixe correspondant, jamais de clone) vient chercher l oeuf, TRANSITION LATERALE chambre -> album Padidi (glissement, pas de popup), l avatar se place devant l OMBRE de la case (suspense, pas un spoil), revelation = sprite prend sa place, "Voir sa fiche" PROPOSEE jamais forcee + micro-celebration applaudissements ; (2) SAC SANS CAP (option A) — aucune limite, aucun jete ; thesaurisation traitee par AFFORDANCE : un oeuf nu alors que le sac est garni FRISSONNE ("il a froid"), zero regle zero penalite ; (3) ETOILE 3★ = accessoire du sac, REUTILISABLE 3 CHARGES a declassement VISUEL (super star brillante -> etoile jaune simple -> plus d etoile = accessoire normal consomme, part avec le bebe), compte dans la chaleur a chaque usage, pose au choix jamais auto, zero chiffre/compteur, premiere reception = les 3 etapes montrees cote a cote. Mode collaboration acte : PY propose -> Claude challenge -> PY tranche -> on grave. + PURGE CSS morte demandee (dette 2026-07-30). Onboarding + mj-coach = apres.
- 2026-07-30 (RETOURS PY vallee v1 live) : (1) il MANQUE des menus en haut — raccourcis d entete pour ouvrir les OEUFS (chambre) et l album PADIDI ; la spec v0.5 §3 disait explicitement "header identite seule, aucune icone de collection" -> DEFIGE par ce retour, raccourcis ajoutes (le Roi T-Rex reste l entree narrative, l entete = acces direct) ; (2) affichage TROP GRAND -> echelle copains/decor reduite (~-20%) ; (3) bus 162 tronque ("je vois qu un bout du toit") -> zone route agrandie, bus entier visible ; (4) bouton parents mal place -> deplace dans le menu de l avatar (tap avatar -> mini-menu Habiller mon dino / Espace parents, gate inchange). Note : PY mentionne "l echange riche avec le voisin" a redonner — non recu dans le message, a integrer quand il arrive.
- 2026-07-30 (DEFIGEMENT PY — header : raccourcis collection RESTAURES, spec passee v0.6) : PY voit l entete vide en prod et rale. DIAGNOSTIC : la spec v0.5 §3 disait mot pour mot "Header : avatar + pseudo + etoiles. C est tout. Aucune icone de collection dans le menu" — sur-interpretation CLAUDE du mot PY "les oeufs ne font pas dans le menu ca ne va pas du tout", qui visait la SCENE (pas de nid/oeuf affiche dans la vallee), PAS les raccourcis header que PY avait LUI-MEME proposes (header unique : icone nid tap -> zoom nid, icone pokedex tap -> page album). Le dev (autre session) a applique la spec a la lettre = il n a PAS delire ; la faute est dans la formulation de la spec. CORRIGE : spec v0.6 §3 — header = avatar + pseudo (<=12 car) + etoiles + raccourcis oeuf->page Nid (badge nb oeufs) + dino->album Padidi ; la vallee reste PURE JEU (aucun element collection affiche) ; Roi T-Rex garde ses 3 portes (entree narrative), le header = le raccourci. Tap avatar = mini-menu Habiller/Parents (bouton parents sorti du header). Nuance gravee : "les oeufs ne vont pas dans le menu" = pas dans la SCENE, jamais "pas d icones header".
- 2026-07-30 (GO PY implementation Mur v2 "La Vallee") : spec docs/specs/2026-07-29-mur-v2-la-vallee.md v0.5 VALIDEE PY ("VAZI on fait ca") a implementer entierement. Exigences PY : coherence, prise de recul, efficacite, simple a coder/entretenir, factorisation/reutilisation. Points cles : scene=menu vue du dessus (tapis de jeu), 6 copains en balade libre anti-collision (Spino compter/mare, Galli lire/arbre, Troudi ex-Velo Troodon casse-tetes/grotte, Volta ex-Para Pteranodon couleurs-monde/volcan, hote jeux dino = AVATAR du joueur avec repli Tritri, Roi T-Rex immobile = porte monde dino), tap->bulle (phrase <=5 mots + vignettes, repaireState inchange), bulle-pensee apres 12s tappable, humeurs delaisse intermittent, bus 162 spectacle, monde dino = bulle T-Rex 3 vignettes (encyclo existante / nid=chambre NID v4 / Padidi grille ombres->fiches, anti-spoiler grave), header 1 ligne avatar+pseudo+etoiles seuls, defigeages PY 2026-07-29 (file verticale, drag-to-enter, zero meta-monde). Onboarding complet + mj-coach = dependances hors phases P0-P4 (vague suivante). : (a) accessoires CONSOMMES a l eclosion CONFIRME ("sinon on va se retrouver avec 500 accessoires, l idee c est 3 jeux pour qu un oeuf eclose") ; (b) regle de drop AJUSTEE : nid VIDE -> oeuf obligatoire · 1-2 oeufs -> random complet (oeuf ou accessoire) · 3 oeufs -> accessoire obligatoire ; (c) caresse : ne fait JAMAIS eclore seule, MAIS si l oeuf a deja 2 accessoires, 2+ caresses PEUVENT ouvrir (avec un peu de random) — sinon on attend le 3e accessoire ; (d) oeuf DORE redefini = dino TRES CONNU (top 10-15), n importe quelle famille (plus "famille rare") ; (e) 3e etoile = recompense speciale, 2 options evoquees par PY sans trancher (oeuf special top-connu OU accessoire etoile permanent, rare, max 1 par oeuf, ne disparait pas a l eclosion) -> CHOIX CLAUDE implemente (reversible) : accessoire ETOILE permanent (l oeuf special ferait doublon avec le dore desormais top-connu ; l accessoire etoile rend la maitrise visible dans le nid pour toujours et reste borne : 1 par oeuf, 1 par jeu maitrise), il REMPLACE le gain normal de cette partie-la (un seul gain annonce, jamais deux).
- 2026-07-29 (MOCKUP VALLEE v3 — retours PY "pourquoi paysage / tout prendre / mare plus grande / echelle" corriges) : (1) scene PLEIN ECRAN position:fixed inset:0 (fini le letterbox, rendu identique tablette ET portrait 390x700) ; (2) tailles en clamp(px, vmin, px) + positions en % (responsive naturel, plus de scale JS) ; (3) mare agrandie 32vw/22vh ; (4) ECHELLES resserrees : T-Rex 150 / Spino 148 / Tritri 140 / Galli 128 / Volta 124 / Troudi 118 px max (ratio max ~1.25, fini les geants vs nains) ; (5) Spino recale 62%/54% (plus d ecrasement de label) ; (6) bulle-pensee clampee dans le viewport (Math.min vs innerWidth). Bus deja corrige v2 : roule SUR la route, rare (~18s puis ~60s), klaxon WebAudio 2 bips au tap. Screenshots verifies : temp/v5-v3-final-tablette.png + temp/v5-v3-final-mobile.png. Reste cosmetique connu : portrait tres etroit, label "Roi T-Rex" touche le bord droit (acceptable, cible = tablette landscape). Prochaine etape : validation ressenti PY sur tablette -> si GO on fige P0 et on attaque P1 (vraie scene js/mur-scene.js branchee sur repaireState/VIGNETTES/starsOf de site/js/mur.js, #repaire-view mourra).
- 2026-07-30 (ETOILE 3e — modalite VALIDEE PY, gravee spec v0.7 §7) : 3 charges a DECLASSEMENT VISUEL (plus fin que le compteur propose par Claude) : 1er usage = super star brillante (etoile pin's/badge avec couronne) ; 2e = etoile jaune simple (badge estompe) ; 3e = plus d etoile du tout, les couleurs de l accessoire restent mais le pin's a disparu -> ACCESSOIRE NORMAL, consomme a cette eclosion (part avec le bebe). Compte dans la chaleur a chaque usage, revient dans le sac entre deux, posee AU CHOIX jamais auto. Regle unique du jeu preservee : "tout accessoire finit par partir avec son bebe", celle-la a 3 vies et l enfant la VOIT dechoir (zero chiffre). PREMIERE RECEPTION : on montre les 3 etapes cote a cote (super star -> jaune -> estompee) + "elle dure plus longtemps" — montre pas explique. Spec v0.7 COMPLETE, aucun point mou restant sur nid/eclosion/etoile.
- 2026-07-30 (SPEC v0.7 — DECISIONS PY nid/eclosion, mode equipe) : (1) SAC SANS CAP (option A tranchee) : aucune limite, aucun jete/donne — thesaurisation traitee par AFFORDANCE "l oeuf nu frissonne quand le sac a des accessoires", a reevaluer au playtest ; la question "y en a un qui sort / jeter / donne a l avatar" est REGLEE PAR CONSTRUCTION (pas de debordement possible). (2) THEATRE D ECLOSION valide PY (spec §6.1) : fissures au nid -> signal "il va eclore !" -> l avatar du joueur sort de sa zone, va dans le nid -> transition glissee nid->album Padidi (avatar+oeuf traversent, transform-only) -> l avatar se place devant l OMBRE de la case -> revelation : l oeuf s ouvre, sprite du dino, la case se remplit -> vignette "Voir sa fiche" PROPOSEE jamais forcee + micro-celebration (applaudissements) -> fin. Nuance anti-spoiler conservee : hors rituel, aucun oeuf dans l album ; l instant devant l ombre = suspense (~1-2s), pas spoil (objection Claude retiree, PY avait raison : c est un rituel, pas un affichage). Si avatar = copain fixe, ce copain assure le transport (pas de clone). (3) ETOILE 3e : "dans le sac a dos point !" — ni vitrine (invention Claude, morte) ni case Padidi ; REUTILISABLE, PY evoque "3x ou un truc du genre" — proposition Claude en attente : 3 charges, compte dans la chaleur, consommee au 3e usage, posee au choix comme tout accessoire. Bebe rejoint le monde dino (P4, acte). Decoupage espaces valide PY : avatar / oeuf (sac dedans) / album Padidi — rien d autre.
- 2026-07-30 (REGLE DE COLLABORATION PY — "ne prend pas tout pour acquis, je propose tu challenges et conseille, on fait equipe") : Claude ne doit PAS transformer les idees PY en arbitrages graves dans la foulée. Mode attendu : PY propose -> Claude challenge (faiblesses, alternatives, risques) + conseille -> PY tranche -> puis seulement on grave spec/backlog. Applique ce tour aux questions NID v4 (cap 5 items, jeter, etoile = case ?, donne a l avatar ?) : propositions challengees, AUCUNE decision gravee en spec, en attente arbitrage PY.
- 2026-07-29 (IDEES Papa Yann — onboarding + NID v4 accessoires, brainstorm en competition avec les copains LLM) : (1) aide dynamique 1ere partie d un MJ : griser l ecran, fleche animee vers l avancement puis vers les etoiles, voire OBLIGER le geste/l action avant de continuer ; (2) 1er oeuf gagne -> retour menu (direct ou attendu) -> POP du nid avec l oeuf dedans + explication "il faut en prendre soin" ; (3) NOUVEAUTE recompenses : chaque partie finie donne soit un OEUF soit un ACCESSOIRE d oeuf (paille, couverture, bonnet, echarpe — style collection) ; caresser un oeuf = il craque un peu ; garde au chaud avec 1-3 accessoires -> ECLOSION (remplace le systeme actuel "3 oeufs, 1 s ouvre, les autres disparaissent" que PY n aime pas) ; (4) regle garantie : nid vide -> le gain est FORCEMENT un oeuf, jamais un accessoire ; (5) chaque oeuf a une COULEUR = famille de dino, a montrer/expliquer dans l encyclopedie ("oeuf bleu = oeuf de xxx") ; (6) accessoires dans un SAC A DOS qui s ouvre en panneau lateral quand on s occupe des oeufs -> nouvelle routine de soin (mini-jeu dans le jeu) ; (7) ETOILES : on garde (niveau de maitrise) mais celebration ENORME uniquement pour la 3e ("tu maitrises ce jeu !"), les 1-2 se gagnent discretement ; (8) onboarding menu principal : bienvenue -> choisir un nom aide 1x par un adulte avec son email -> avatar VIDE, oblige de cliquer et choisir son 1er avatar -> presentation des copains dino (Snino les nombres etc.) SANS jeux d abord, tres vite mais tres explicite/concis/clair ; (9) question ouverte : placement encyclopedie + mini-jeux dino dans un sous-menu = PY "moyen fan", pas d idee arretee. Reponse/challenge Claude rendu ce tour (voir sprint-log), PY compare avec les copains avant de selectionner.
- 2026-07-31 (BUG PY telephone reel — vallee/MJ tronques en bas, "toujours trop serre en hauteur") : cause = Android edge-to-edge (Chrome recent) : barres systeme (statut haut, gestes bas) RECOUVRENT la page, or nos pages plein ecran font height:100dvh brut -> bus 162 coupe, copains du bas rognés, bandeau bas des MJ sous la barre de gestes. Console MetaMask/wallet du screenshot = bruit d extensions, sans rapport. FIX GLOBAL mp-theme.css : var --mp-vh = 100dvh - env(safe-area-inset-top/bottom) + padding safe-area sur body (toutes pages) + body>#app plafonne a --mp-vh (tous MJ, inoffensif desktop car insets=0) + .mp-game-vh recale sur --mp-vh. mur.css : .vallee-page sur --mp-vh (+min-height:0 sinon .mur-page min-height:100dvh regagnait), overlays chambre/Padidi paddes env(). mur-scene.js : clampPos() spawn+balade, bande basse ~150px (route+bus+demi-copain) RESERVEE, plafond en % dynamique selon hauteur ecran. Verifie Playwright insets simules CDP (top32/bottom48) : index + mj-54 + mj-50 zero deborde ; harnais index/mj-54/mj-50 verts. NOTE ORPHELIN : tests/collection.spec.mjs pointe site/collection.html qui n existe plus (refonte Mur v2) -> spec a recabler ou retirer (cassee AVANT ce fix, verifie par stash).
- 2026-07-31 (NETTOYAGE orphelins, demande PY "nettoie tout ce qui ne sert plus") : SUPPRIME (mort prouve par grep vide sur site/ + .github/) : site/js/celebrate.js (0 ref ; les hits "celebrate" etaient MK.celebrate() de mj-kit.js, homonyme) · site/css/theme.css (son en-tete dit "charge par index2.html", page disparue ; seul autre hit = un commentaire) · site/sounds/super-max.mp3 (0 ref) · .claude/settings.json.20260728-205733.bak (backup auto, historique deja en git) · studio/minijeux/tests/_scratch/dbg-levelof.mjs (debug one-shot). CORRECTION D UNE ERREUR DU TOUR PRECEDENT : collection.spec.mjs N EST PAS orpheline — elle genere son propre harnais HTML et teste site/js/collection.js (existant) ; elle passe 20/20 en direct. Le rouge venait du RUNNER run.mjs qui fabriquait un chemin site/collection.html inexistant -> ERR_FILE_NOT_FOUND lu comme "jeu casse". FIX run.mjs : detecte page absente + spec homonyme presente -> message d orientation "spec AUTONOME, lance node <spec>" + exit 2, au lieu d un faux rouge. 6 specs autonomes verifiees vertes (collection, mur-nid, cloud-merge, index, lecture, mj-golden-nid, mj-pose-tiles). GARDE VOLONTAIREMENT : site/js/decor.js + img/decor/* (README les declare "reserve indexee pour usage futur", pas mort) · img/dinos/traces/ (reserve documentee) · les 3 fichiers _archive-tests audio (tailles identiques au parent MAIS parent date du 28/07 vs archive 03/06 = restauration recente deliberee, pas doublon a jeter). COMMITE (travail legitime non suivi) : audit PMO cartographie 2026-07-27, pmo/archive/ (rotation H1), matiere-a-distiller.md, gabarit variantes-culturelles, 2 archives narration, _archive/kimi-hooks. CABLE : check-compteurs.js (anti-derive chiffres en dur) etait orphelin -> reference dans studio/narration/INDEX.md + entree kimi-hooks ajoutee a _archive/INDEX.md (exigence CLAUDE.md : chaque entree documentee). Verif : audit-gabarit 37 jeux 0 BLOQUANT, index + specs autonomes vertes. RESTE A TRANCHER PY : temp/ = 148 Mo gitignore (profils Chrome Playwright + ~100 screenshots de dev) — suppression bloquee par le classifier de securite, a faire a la main.
