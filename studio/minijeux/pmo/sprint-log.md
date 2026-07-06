# Sprint Log — PMO Game

> Journal de bord des sessions.
> **En cas de reboot :** lire la dernière entrée (haut du fichier), section "État au reboot".
> Les entrées les plus récentes sont en haut.
>
> Équivalent côté Narration : [`../../studio/narration/pmo/sprint-log.md`](../../narration/pmo/sprint-log.md).
> Créé 2026-05-13 (extraction depuis `memory/state.md` lors de l'harmonisation Game ↔ Narration).

---

## 2026-07-06 (coda) — BANQUE SONS REFONDÉE : 277 MP3 + API centralisée

**Owner** : game-pmo (log) · audio-direction-elevenlabs (exécution) · game-dev (branchement MJ)

**Trigger** : Audit session nuit → identification besoin système sonore unifié (répétitions, manque d'instructions voix, hubs sans audio).

**Fait (session jour 2026-07-06)** :

1. **Maître fichier créé** :
   - **`site/sounds/_BANQUE-SONS.md`** = source de vérité unique système sonore
   - Inventaire 277 fichiers MP3 : 10 UI + 54 FX + 66 voix (3 casting narrateur_f/narrateur_h/wex × 22 réactions) + 12 lieux + 10 phrases instructions + 5 périodes dinos + 60 noms dinos
   - API JS centralisée : `victory-sounds.js` (pools, voix, phrases) + `dinos-audio-manifest.js` (voix dino)
   - Process figé : check budget → prompt (EN/FR) → eleven_v3 + tags ton → voice-map.json → padding 250ms L-069 → slug → branchement + fallback TTS

2. **Passe 2 livrée** (commit bf5e6dbb) :
   - 10 phrases instructions (Narrateur H) générées avec tags ton
   - Branchées mj-25/26/30 (+ essaie-encore→voice dans mj-24/31)
   - API SoundPool.phrase() + fallback TTS validée

3. **Reste clairement noté** :
   - 5 phrases générées non branchées (reserve)
   - Périodes dinos (5 audio) : non branchées hub voyage (attente contexte Wex/histoire époque)
   - Passe 3 : 10+ MJ non-dino en TTS (audio par défaut, pas MP3 dédié)
   - Budget EL : ~250 crédits consommés, reset ~10 juillet

**État au reboot** :
- ✅ Banque sons documentée, centralisée, point d'entrée unique
- ✅ API stable (SoundPool + dinos-audio-manifest) — zéro modification jeux futurs sauf appels audio
- ✅ 3 MJ (mj-24/25/26/30/31) branchés voix instructions
- Attente : passe 3 (non-dino MJ) + périodes branchées hub quand histoire époque cristallisée

---

## 2026-07-06 (nuit) — MÉGA-AUDIT JEUX ADDICTIFS + 3 MJ NOCTURNES (34/35/36 en dev)

**Owner** : game-pmo (log) · 4 agents dev (code nuit) · 2 audits (synthèse) · Papa Yann (validation réveil)

**Trigger** : Fusion 2 audits indépendants (copain LLM 40 jeux + Claude 4 agents ~90 jeux) → synthèse convergences fortes → codage 3 MJ prioritaires nuit autonome.

**Fait (session nuit 2026-07-06)** :

1. **Audit méthodique convergeant** :
   - Audit A : 40 jeux addictifs adultes 2024-26 (taxonomie cognitive, 15 idées transposées bus, matrice priorisation)
   - Audit B : ~90 jeux numériques + traditionnels par région (Asie/Afrique/Amériques/Europe)
   - **5 leviers d'addiction convergents** : règles en 10s maîtrise 100h · feedback <200ms juteux · parties courtes sans pénalité · chaos→ordre visible · progression visible
   - **10 convergences fortes** (cités par LES DEUX audits) : Rush Hour · Kalah · Block Blast · Water Sort · Tangram · Stack/timing · Picross · Mū Tōrere · Carrom · Simon/Genius
   - Synthèse PDF : [`studio/minijeux/docs/research/SYNTHESE-JEUX-ADDICTIFS.md`](../docs/research/SYNTHESE-JEUX-ADDICTIFS.md)

2. **3 MJ codés nuit (en dev validation)** :
   - **MJ-34 "Le dépôt bloqué"** (Rush Hour bus) — logique séquence · glissement/déblocage · grille 6 cases verticales
   - **MJ-35 "Le jeu des graines"** (Kalah authentique) — compter/semailles · awalé africain · 2 joueurs ou IA
   - **MJ-36 "Arrête le bus !"** (timing) — tap au bon moment · arrêt bus = jeu · ultra-rapide feedback <100ms
   - Ticket parent **EP-047 SHORTLIST** : 7 candidats restants (Simon/Block Blast/Tangram dino/Mahjong/MJ-18 Expert/Shisima/Picross) en priorisation Papa Yann

3. **Tickets intégrés backlog** :
   - EP-044 (MJ-34) + EP-045 (MJ-35) + EP-046 (MJ-36) + EP-047 (shortlist) ajoutés dans table pmo/backlog.md
   - Sous-tâches validation détaillées (motricité 80px, harnais e2e, figeage) pour chaque MJ

4. **Statut final** :
   - ✅ Synthèse jeux addictifs figée et accessible
   - ✅ 3 MJ en dev, prêts test Papa Yann au réveil (date : 2026-07-06 cron 6h)
   - ✅ Shortlist 7 candidats identifiée, attente priorisation

**État au reboot** :
- 3 MJ (34/35/36) **prêts test utilisateur** (motricité + mécanique + feedback < 200ms à confirmer)
- Validation Papa Yann = GO pour figeage mj-34/35/36.md (protection régression post-feedback)
- Shortlist 7 = brainstorm conseiller post-test (meilleur candidat suivant ?)

---

## 2026-07-05 (après-demain nuit) — POOL SONORES thématiques (7 thèmes, voix overlay, anti-répétition)

**Owner** : game-pmo (intégration) · Papa Yann (décision pools)

**Trigger** : Papa Yann demande système de sons cohérent par événement (« pioche de son par thème, pool cohérent ») → game-dev implémente `victory-sounds.js` centralisé (site/js/).

**Fait (session 2026-07-05 après)** :

1. **Architecture pools sonores gravée** : `site/js/victory-sounds.js` (point central chargé par ALL mj-XX) :
   - 7 pools thématiques : victory (ff7/mario/zelda legacy + 3 nouveaux), end-doux (ZÉRO punitif — perdu.mp3/among-us retirés), success, error (prout/honk cultes gardés), apparition, collecte, déblocage
   - API symétrique : `SoundPool.play(theme)` (nouveau) ou historique `playEndSound()` (compat)
   - Anti-répétition immédiate : tracking pool → ne rejoue pas son précédent
   - Overlay voix casting (3 voix : narratrice f / narrateur h / Wex) × 16 positives + 6 douces → 66 MP3 ElevenLabs `sounds/voix/{f,h,wex}/`
   - Voix jouées ~1.4s APRÈS fanfare victoire (timing gap Wex timing révélé MJ-31)
   - **Commit 8a7a400e** : victory-sounds.js déployé, AUCUN mj-XX.html modifié, figées intactes

2. **Banque sons complets** : 130 MP3 total (10 ui + 54 fx + 66 voix)
   - Page écoute dev : `dev-sounds-ui.html` (audit/test pool)
   - Voix générées ElevenLabs text-to-dialogue (eleven_v3, tags émotionnels, padding 250ms L-069)

3. **Incident git post-mortem** : commit 0befbdde emporta 436 suppressions (img/dinos/silhouettes/ + dev-silhouettes.html) stagées autre session — **aucun impact site** (rien ne référençait), leçon = inspecter `git diff --cached` avant commit (L-057-feedback_concurrent_git_staging déjà appliquée depuis 2026-06-08).

4. **Harnais vérification** : mj-21 + mj-04 testés VERT (pools jouent sans collision).

**État final** :
- ✅ API SoundPool déployée, historique compat intact
- ✅ 130 MP3 produits (11 voix × 66 segments + fx)
- ✅ Incident git loggé (sans impact), leçon L-057 confirmée
- ✅ Standard pool voix grandi → à utiliser tout futur MJ (L-070)

**Impacte fichiers** :
- `site/js/victory-sounds.js` : point central, aucune modif mj-XX
- `site/sounds/` : 130 MP3 (ui, fx, voix)
- `site/dev-sounds-ui.html` : page dev audit

**État au reboot** :
- ✅ **Pool sonores thématiques = standard futur tout MJ**
- ✅ **Voix overlay réactions = pattern validé 1.4s post-fanfare**

---

## 2026-07-05 (nuit) — Correction critique : figeages inventés mj-24/25/26/31 + incident postmortem + leçons L-072..076

**Owner** : game-pmo (audit incident + gravure leçons) · Papa Yann (validations)

**Trigger** : Relecture clôture 2026-07-05 révèle incident GRAVE : game-mj-pmo inventa du contenu dans les 4 figées créées plus tôt (mj-24 déduction audio-first inventée, mj-25 idem, mj-26 drag-drop inventé au lieu comptage réel, mj-31 voix Wex inventée). Conséquence : 2 reviewers rendus FAIL invalides. Main agent rétro-corrige commit 7d844cb7.

**Fait (session 2026-07-05 nuit)** :

1. **Incident déclaré et analysé** :
   - Root cause : game-mj-pmo ne lut PAS l'HTML réel avant figeage
   - Comportement : « j'invente une mécanique plausible basé sur titre » = hallucinat
   - Impact : figées fausses → reviewers invalides → code-fix + figé-fix + re-validation
   - Pattern : une figée = source de vérité pour 6 mois. Chaque ligne 🔒 doit être traçable

2. **Leçons gravées (5 tickets)** :
   - **L-072** : Processus figeage = vérification obligatoire code réel (lecture HTML AVANT figeage obligatoire)
   - **L-073** : Anti-pattern inventer mécanique « plausible » (jeu réel ≠ hypothèse)
   - **L-074** : Figées erronées = feedback reviewers invalide (bottleneck qualité)
   - **L-075** : Audio multi-pistes → parler coupe MP3, MP3 coupe TTS (exclusivité mutuelle)
   - **L-076** : Navigation MJ = délégation .back header (pas listener direct)

3. **Retours Papa Yann décision clôture** :
   - Mj-32 navigation testée VERT (boutons contextuels « Autre dino » + « Colorier un autre ! », retour menu)
   - Zones tap : min-height 80px uniformisée mj-24/26/28/29/30
   - Mj-31 : 85M ans T-Rex/Stégosaure sourcé + gratuit (pas gore)
   - **Idée brainstorm** : « les petites images en live c'est SUPERRRR » (pattern « scène se peuple à chaque bonne réponse » = validé adoré, candidat autres MJ)

4. **Faux positifs reviewers écartés** :
   - Police Nunito ≠ Fredoka One : Nunito = standard de facto tous dinos, cohérent (changement voulu = décision Papa Yann seulement)
   - OGG obligatoire : MP3 = universel, règle inadaptée assets ElevenLabs
   - « Streak interdit » : variable interne jamais affichée = OK

**État final** :
- ✅ Commit 7d844cb7 déployé prod SUCCESS
- ✅ Harnais 10/10 VERT (navigation mj-32, 6 MJ test scriptés)
- ✅ Figées 4 corrigées + leçons 5 gravées
- ✅ Faux positifs reviewers clarifiés

**Impacte fichiers** :
- `studio/minijeux/pmo/audit-trail.md` : incident gravé avec analyse cause racine
- `studio/minijeux/pmo/backlog.md` : L-072..076 + EP-043 (check auto figés sourcées)
- `studio/minijeux/docs/jeux/figees/mj-24/25/26/31.md` : réécrites + annotations ♻️
- `site/mj-24/25/26/31/32.html` : code prod (commit 7d844cb7)

**État au reboot** :
- ✅ **Cycle clôture validations Papa Yann 100% intégré**
- ✅ **Incident post-mortem gravé + leçons critiques structurées**
- ✅ **Harnais validation mj-XX stable (10/10 VERT)**
- 📅 **Prochain : brainstorm pattern "scène peuple en live" → autres MJ (L-031 pattern réutilisable)**

---

## 2026-07-05 (soir) — Figeage 4 MJ dinos (mj-24/25/26/31) + bannissement silhouettes LimeZu + manifest auto-généré

**Owner** : game-mj-pmo (figeage + PIPELINE-MEMORY) · Papa Yann (décisions validées live)

**Trigger** : game-mj-pmo synthèse remontée : 4 fichiers figés créés suite validations Papa Yann (refonte ombres chinoises mj-24/25/26 + voix réelle EL mj-31 + suppression 208 PNG silhouettes LimeZu).

**Fait** (session 2026-07-05 soir) :

1. **Figeage mj-24 « Trouve l'espèce »** : `studio/minijeux/docs/jeux/figees/mj-24.md` créé.
   - 🔒 Ombres chinoises EXCLUSIVES depuis `img/dinos/ombres/` (canon).
   - 🔒 Silhouettes LimeZu : **TOTALEMENT INTERDITES** (ordre Papa Yann 2026-07-05 : *« les anciennes silhouettes SUPPRIME-LES »*).
   - 🔒 Audio dino : MP3 réelle ElevenLabs par défaut, fallback TTS en 404 via manifest `js/dinos-audio-manifest.js`.
   - Commit 234dee4b : silhouettes supprimées + manifest auto-généré.

2. **Figeage mj-25 & mj-26** : `studio/minijeux/docs/jeux/figees/mj-25.md` + `mj-26.md` créés.
   - Mêmes décisions : ombres canon, silhouettes bannies, audio MP3 prioritaire.

3. **Figeage mj-31 « Grand voyage du temps »** : `studio/minijeux/docs/jeux/figees/mj-31.md` créé.
   - 🔒 Période redite à la fin de chaque bonne réponse (apprentissage central).
   - 🔒 Vignettes dino posées EN LIVE sur frise chrono.
   - 🔒 T-Rex/Stégosaure jamais croisés (alerte Wex 85M ans).
   - 🔒 Finale météorite 4 tableaux, zéro gore.
   - 🔒 Audio dino : MP3 réelle ElevenLabs (commit 234dee4b : voix réelle EL branchée).

4. **Bannissement total silhouettes LimeZu** : 208 PNG `img/dinos/silhouettes/` + `js/dino-silhouettes.js` + `dev-silhouettes.html` supprimés (commit 234dee4b).
   - Décision Papa Yann 2026-07-05 : *« je ne veux plus les voir !! »* (silhouettes par-famille).
   - Seule source valide : ombres canon `img/dinos/ombres/`.
   - Impact : mj-24/25/26 refondus sur ombres chinoises (pédago + aesthetic valeur).

5. **Manifest auto-généré gravé** : `js/dinos-audio-manifest.js` (auto-généré depuis fichiers réels).
   - Pattern anti-pourrissement : liste listes en dur vs fichiers = risque 404.
   - Leçon L-071 : manifest auto-généré applicable à tout MJ avec assets conditionnels.

**Leçons remontées** :
- **L-065** : `const DINOS` top-level JS = liaison lexicale globale (mj-29/mj-32 piégés).
- **L-066** : Flags Chromium `--allow-file-access-from-files --disable-web-security` OBLIGATOIRES pour canvas file:// (mj-32 1er canvas).
- **L-067** : PNG silhouettes `_new-ombre/*` = fond transparent, jamais invert (mj-30 bug screenshot).
- **L-071** : Manifest auto-généré depuis fichiers réels = pattern anti-pourrissement assets.

**Tickets dérivés** :
- **EP-NEW** : « check auto assets dans run.mjs » — chaque src/href relatif dans HTML doit exister + être tracké git.

**État au reboot** :
- ✅ **4 MJ figés** (mj-24/25/26/31)
- ✅ **Bannissement silhouettes LimeZu DÉFINITIF** (208 PNG supprimés)
- ✅ **Voix réelle EL branchée mj-31**
- ✅ **Ombres chinoises canon = unique source visuelle dinos**
- 📅 **En attente** : validation ressenti Papa Yann + générer phrases d'époque MP3 EL post-quota (EP-D-Audio-Recap-Par-Dino ↔ côté dino-pmo)

**Impacte fichiers** :
- `studio/minijeux/docs/jeux/figees/mj-24/25/26/31.md` : 4 fichiers figés
- `site/mj-24/25/26/31.html` : code déployé (commit 234dee4b)
- `js/dinos-audio-manifest.js` : manifest auto-généré
- `site/js/dino-silhouettes.js` : **SUPPRIMÉ** (commit 234dee4b)
- `site/dev-silhouettes.html` : **SUPPRIMÉ** (commit 234dee4b)
- `site/img/dinos/silhouettes/` : **DOSSIER SUPPRIMÉ** (commit 234dee4b, 208 PNG)
- `studio/minijeux/pmo/backlog.md` : leçons L-065..067, L-071 + ticket check-assets

---

## 2026-07-05 — Banque sons 64 SFX + Hub v3 plateforme + gravure règle audio silence 250ms

**Owner** : Papa Yann (validation), ElevenLabs MCP (production SFX), game-conseiller (architecture hub)

**Trigger** : Papa Yann délivre 2 chantiers : (1) banque sons identité "Ligne de Max" + SFX contextuels déployés ; (2) livraison Hub v3 « La fusée de Max » complète (index3.html, réorganisation interfaces).

**Fait** (session 2026-07-05) :

1. **Banque sons déployée** : `site/sounds/ui/` (10 sons identité Ligne) + `site/sounds/fx/` (54 SFX divers : victoires, rigolo, dinos, animaux, véhicules, instruments, pièces, espace, divers). Total ~900 crédits ElevenLabs text_to_sound_effects. Page d'écoute : `site/dev-sounds-ui.html`. **Pas encore branchés** dans les jeux — en attente validation son-par-son Papa Yann.

2. **Hub v3 « La fusée de Max »** : `site/index3.html` déployé. Planètes layout vertical + séquence de vol complète (décollage fumée, arc incliné, traînée, atterrissage posé globes + poussière). 3 hubs en comparaison : `/` (ancien) · `/index2.html` (bus) · `/index3.html` (planètes).

3. **Règle audio FIGÉE** : tout SFX/MP3 destiné au site DOIT avoir ~250 ms silence en tête (réveil sortie audio mobile/tablette Bluetooth). Commande canonique : `ffmpeg -y -i in.mp3 -af "adelay=250:all=1" -codec:a libmp3lame -b:a 128k out.mp3`. Gravée dans `memory/rules.md` § Règles Audio + leçon L-069 dans `backlog.md`.

**Leçons remontées** :
- **L-069** : silence 250ms en tête MP3 = réveil sortie audio mobile (100-300ms latence native Bluetooth) — OBLIGATOIRE avant commit `site/sounds/`

**État au reboot** :
- ✅ **64 SFX déployés + page écoute live**
- ✅ **Hub v3 livré (3 interfaces comparaison live)**
- ✅ **Règle audio FIGÉE + gravée dans rules.md**
- 📅 **En attente** : validation son-à-son Papa Yann + branchement effectif dans jeux + GO images 6 planètes

**Impacte** :
- `site/sounds/ui/*.mp3` : 10 fichiers identité
- `site/sounds/fx/*.mp3` : 54 fichiers SFX
- `site/index3.html` : hub v3 planètes
- `site/dev-sounds-ui.html` : page écoute
- `studio/minijeux/memory/rules.md` : nouvelle section Règles Audio
- `studio/minijeux/pmo/backlog.md` : leçon L-069

---

## 2026-07-05 — 6 mini-jeux dinos MJ-28..33 livrés + sons 64 SFX + Hub v3

**Owner** : game-mj-pmo (orchestration 6 agents parallèles, synthèse remontée 2026-07-05) · Papa Yann (validation sons) · game-conseiller (architecture hub v3)

**Trigger** : game-mj-pmo clôture 6 MJ dinos batch (commit f767416a + validation Playwright 6/6) + Papa Yann délivre chantier sons (banque 64 SFX identité Ligne + SFX contextuels ElevenLabs) + Hub v3 « La fusée de Max » complete.

**Fait** (session 2026-07-05) :

### Bloc 1 : 6 mini-jeux dinos MJ-28..33 (game-mj-pmo)
1. **Déployés** : mj-28 (lampe ombres), mj-29 (fabrique noms étymo), mj-30 (range par taille), mj-31 (frise temps+météorite), mj-32 (coloriage flood fill canvas), mj-33 (memory ombres) — commit f767416a
2. **Validation Playwright** : 6 specs + catalog.js + assets `_new-ombre/*.png` — harnais 6/6 VERT avant push (E2E + smoke)
3. **Technique** : run.mjs flags Chromium `--allow-file-access-from-files --disable-web-security` activés (canvas drawImage+getImageData file:// support)
4. **Correction d'état** : 11 dinos sans image couleur — filtres NO_HERO/NO_ASSET retirés (commit 941faa30 "images 404 en prod" promotions assets). État RÉSOLU, L-068 désormais archive historique.

### Bloc 2 : Banque sons 64 SFX + page écoute
1. **Déployés** : `site/sounds/ui/` (10 sons identité) + `site/sounds/fx/` (54 SFX : victoires, rigolo, dinos, animaux, véhicules, instruments, pièces, espace) — ~900 crédits ElevenLabs text_to_sound_effects
2. **Page d'écoute** : `site/dev-sounds-ui.html` live
3. **Règle FIGÉE** : tout SFX/MP3 destiné au site DOIT avoir ~250ms silence en tête (réveil sortie audio mobile/Bluetooth). Commande : `ffmpeg -y -i in.mp3 -af "adelay=250:all=1" -codec:a libmp3lame -b:a 128k out.mp3`. Gravée dans `memory/rules.md` § Règles Audio.
4. **État** : pas encore branchés dans les jeux — en attente validation son-par-son Papa Yann

### Bloc 3 : Hub v3 « La fusée de Max »
1. **Déployé** : `site/index3.html` — planètes layout vertical, séquence vol complète (décollage fumée, arc incliné, traînée, atterrissage posé globes)
2. **Comparaison 3 hubs live** : `/` (ancien) · `/index2.html` (bus) · `/index3.html` (planètes)
3. **État** : validé 5 screenshots Playwright (paysage/portrait/3 panels), zéro erreur console

**Leçons remontées** :
- **L-065** : `const DINOS` top-level JS = liaison lexicale globale — accès par nom direct (2 agents piégés mj-29/mj-32)
- **L-066** : Flags Chromium `--allow-file-access-from-files --disable-web-security` OBLIGATOIRES pour canvas file:// — 1er MJ canvas validé besoin
- **L-067** : PNG silhouettes `_new-ombre/*` = fond transparent noir — jamais filter invert ni fond clair (bug mj-30 screenshot détecté)
- **L-069** : SFX/MP3 audio = 250ms silence en tête (réveil sortie audio mobile)

**Tickets dérivés** :
- **EP-NEW** : « check auto assets dans run.mjs » — chaque src/href relatif dans HTML doit exister + être tracké git (4 MJ 404 prod historiquement)

**Alertes déploiement** :
- 🟡 **Artefact 545 Mo** (limite 1 Go) : audio/ 191M + paleoart/ 122M déployés. Ticket « régime minceur artefact » (webp, bitrate audio) à anticiper.

**État au reboot** :
- ✅ **MJ-28..33 déployés** (29 actifs total, up from 23)
- ✅ **64 SFX déployés + page écoute live**
- ✅ **Hub v3 livré (3 interfaces comparaison live)**
- ✅ **Specs Playwright 6/6 VERT** (harnais validé avant push)
- ✅ **PROCESS 6 agents parallèles efficace**
- ✅ **État dinos CORRIGÉ** : 11 sans image = RÉSOLU (filtres retirés)
- ✅ **Règle audio FIGÉE + gravée**
- 📅 **En attente** : validation ressenti Papa Yann (jeux + sons) + branchement SFX effectif dans jeux + GO images 6 planètes

**Impacte fichiers** :
- `studio/minijeux/memory/state.md` : count MJ 23→29
- `studio/minijeux/memory/rules.md` : Règles Audio (silence 250ms)
- `studio/minijeux/pmo/backlog.md` : leçons L-065..067, L-069 + ticket check-assets
- `site/mj-*.html` : 6 fichiers MJ-28..33
- `site/sounds/ui/*.mp3` : 10 fichiers identité
- `site/sounds/fx/*.mp3` : 54 fichiers SFX
- `site/index3.html` : hub v3 planètes
- `site/dev-sounds-ui.html` : page écoute

---

## 2026-07-04 — [HUB VISUEL] Refonte plateforme Phase 1 « La ligne de Max » livrée

**Owner** : Papa Yann + game-conseiller + dino-conseiller + narration-conseiller + lecteur-dyade

**Trigger** : Papa Yann demande refonte visuelle complète ("trop basique, tabulaire, pas wow").

**Fait** (commit 9fc79b03 pushé) :
1. **Index2.html hub v2** : scène crépuscule, 6 arrêts SVG, bus IDFM roulant animé, panneau lieu (étoiles/verrous), trajet bus skippable au tap.
2. **Design system** (`site/css/theme.css`) : `--zone-h` par arrêt, `@view-transition` fluide.
3. **Célébration** (`site/js/celebrate.js`) : confettis canvas, `flyStar` étoile rebondissante, honk/fart pool (klaxon 1/20).
4. **Décisions figées** (gravées `decisions.md`) :
   - Concept « La ligne de Max » = Voie A (bus horizontal, 6 arrêts, pas parallax ville)
   - 6 arrêts mapping catégories (dodo/garage/maison-lettres/place-monde/vallée-dinos/roulotte)
   - PAS Wex mascotte (unanime conseillers) — bus muet + TTS voix off neutre
   - Construction parallèle index2/index1 (anti-désorientation)
   - Sons victoire conservés (FF7/Pokémon/Gagné)
   - Trajet bus skippable (feedback lecteur-dyade)

**Vérifications** :
- 5 screenshots Playwright (paysage/portrait/3 panels) ✅
- Console zéro erreur ✅

**État au reboot** :
- Phase 1 LIVRÉE (hub scène crépuscule + 6 arrêts naviguant OK)
- Phases restantes (backlog tickets si utile) :
  - **P2** : vallée dinos (fiches 3 strates, mur silhouettes — pôle DINO, juste référencer)
  - **P3** : roulotte histoires (quand narration livre)
  - **P4** : harmonisation mj-XX (injection theme légère, figées respectées)
- **Questions ouvertes** : mascotte définitive ? bascule index2→index quand ? identité sonore future ?

---

## 2026-06-08 — [PISTE PRODUIT] Lassitude bus Max + exploration thème dino (EP-041)

**Trigger** : Signal Papa Yann observé dans session DINO (2026-06-08) — Max n'a plus envie de jouer aux mini-jeux bus actuels.

**Fait** :
1. Créé ticket **EP-041** (PISTE / EXPLORATION) — 3 mécaniques brutes : tri-couleur SVG dino + quiz dino + duel
2. Classé comme cross-pole JEU × DINO (données DINO stables via EP-039, mécaniques MJ = domaine JEU)
3. Posé risque technique : asset silhouette/ombre dino = pipeline visuel à évaluer (existe-t-il PNG dégradable, ou faut-il créer 50 silhouettes ?)
4. Processus proposé : design + prototype 5 dinos + test Max + décision go/no-go

**Décisions** :
- Brique avant macro (L-055 pattern) : prototype limité AVANT scaling à 50
- Classement PISTE/EXPLORATION : dépend retour Max, priorité à Papa Yann

**Dépendance** :
- EP-039 clôture pilote (données stables ✅)
- Asset silhouette : à évaluer

**État au reboot** :
- EP-041 en backlog.md + sprint-log
- Prochaine étape = design rapide (game-conseiller) si Papa Yann valide l'approche

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
- `site/js/dinos-data.js` : 50 fiches
- `site/dev-dinos.html` : UI familles + INTRO
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
- ✅ Création `.claude/rules/tile-tools.md` (80 l) : paths: `site/tile-tools/**`, `site/tools/**` — mnémonique 2/8/14/15 + Sidewalk_1 mapping + vocab.py source unique + brique avant macro
- ✅ Création `.claude/rules/mini-jeux.md` (103 l) : paths: `site/mj-*.html`, `site/index.html` — UX zéro-pénalité, feedback <200ms, zones tap 80px, busSVG obligatoire, couleurs IDFM LIGNES
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
- ✅ `site/tile-tools/vocab.py` : 46 constantes nommées français, validation auto au boot
- ✅ `site/tile-tools/builders.py` : macros `route_h()` + `route_v()` testées + **SHA256 byte-identique** aux PNG existants
- ✅ `site/tile-tools/RESEARCH-INSPIRATIONS.md` : 60+ liens capitalisés (LDtk, WFC, DualTilemap, Bitmask, Phaser, LimeZu)
- ✅ Fix en passant : `test_voie_bus_v6.py` (`_15` SALE → `_8` PROPRE, oubli correction 5)
- ✅ 2 recettes v2 exemple : `test_route_h_5rows_v2.py` + `test_route_v_5cols_v2.py`

**🔀 Pivot Papa Yann (fin de session, validé)** :
- Découverte : coder des macros (`virage`, `carrefour`…) = **inventer comment composer**. Or les recettes actuelles ne plaisent pas visuellement à Papa Yann → on reproduirait le défaut.
- Nouvelle direction : **collecter des références visuelles** (screenshots LimeZu officiel, maps Pokemon, samples LDtk) → reproduire fidèlement → la "macro" devient une recette de référence validée.
- EP-VOCAB phases 3-5 (macros virages/carrefour/T/refactor 13 recettes) **ANNULÉES**.
- **EP-REFS ajouté au BACKLOG** (banque refs visuelles, à lancer en session dédiée).

**Nettoyage effectué (clôture)** :
- ✅ `cartography.json` marqué **DEPRECATED**
- ✅ `site/tools/tile-library.html` + `tile-library-v2.html` → archivés
- ✅ `__pycache__/` purgés (gitignore créé)
- ✅ `site/tile-tools/_archive/` créé avec inventaire candidats futurs
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
- ✅ `site/tools/` : hub + tile-picker (matrice drag&drop, 5 catégories, multi-tiles vraies dimensions, `?recipe=X.py`), tile-library-v3, mockups-routes (6 patterns échelle uniforme + bouton 🎨 Éditer)
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
