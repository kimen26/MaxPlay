# Leçons — Pôle JEU

> Convention de numérotation (fixée 2026-05-21) : **L-000..L-049** sont réservées aux leçons tile (skill `maxplay-tiles/LESSONS.md`) ; **L-050+** = leçons mini-jeux (process, REX, patterns). Contenu VERBATIM déplacé depuis `pmo/backlog.md` § "Leçons du pôle MJ (L-xxx)" le 2026-09-03 (HO-MJ-01), dans l'ordre d'apparition d'origine. Numéros dupliqués conservés tels quels (pas de renumérotation, pas de déduplication — choix délibéré).

Synthèse REX MJ-21 « Peins les bus! » — 33 commits, 5 causes racines (2026-05-16). Détail complet : [`archive/PIPELINE-MEMORY-MJ.md`](archive/PIPELINE-MEMORY-MJ.md).

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


### L-100 – Un fichier pack partagé (strings.json) = un seul agent à la fois
2026-09-06, EPIC i18n mini-jeux : deux agents en parallèle (HO-MJ-05 sur 4 jeux, HO-MJ-06 sur les consignes parlées) écrivaient tous deux `studio/minijeux/i18n/{fr,en}/strings.json` et le bundle généré. Rien n'a été perdu cette fois (le second a relu après l'écriture du premier), mais le commit du premier a embarqué les clés du second : paternité mélangée et risque réel d'écrasement lire-modifier-écrire (même mécanique que L-D-73 côté dino). Règle : quand deux chantiers touchent le même fichier pack, les enchaîner, ou donner à chacun son propre fichier fusionné ensuite par l'orchestrateur.

### L-101 – Un outil « emprunté » à un autre pôle écrit chez lui
2026-09-06 : `studio/dino/content/scripts/audio/_md2json-hors-fiche.cjs` accepte un `.md` en argument, donc il a servi pour les consignes parlées des mini-jeux… et a écrit les 81 JSON dans le dossier du dino (supprimés à la main). Avant de réutiliser un outil d'un autre pôle sur du contenu du sien : vérifier où il écrit, ajouter une option de sortie (`--out=`) ou le dupliquer proprement dans `studio/minijeux/tools/`. Ticket VOIX-MJ-EN-AUDIO.

### L-110 – Un correctif anti-fuite qui dilate un masque dégrade le rendu : mesurer le trait avant de choisir le rayon
2026-09-08, coloriage mj-32 (HO-MJ-08). Le masque de contour avait été dilaté de 7 px pour boucher les micro-trous du trait (fuite fond→dino du Cryolophosaure, #6389). Effet de bord jamais vu à l'époque : le flood fill s'arrêtant sur le masque dilaté, il restait une bande blanche de 7 px entre la couleur et le trait — Papa Yann le découvre en regardant les dessins sauvegardés de Max, « c'est moche de ouf ». Le rayon de dilatation avait été choisi sur le seul critère « ça ne fuit plus », sans jamais mesurer l'épaisseur du trait ni regarder un dessin fini. Or le trait fait 3 px de large (médiane, min 1 px) sur la voile du Spinosaure : plus fin que la bande qui l'entoure des deux côtés. Règle : quand un correctif élargit une zone interdite, mesurer d'abord la structure qu'on élargit (ici l'épaisseur du trait), et regarder le rendu FINI, pas seulement l'absence du bug d'origine. Une garde sur la structure réelle (`traitMask` non dilaté) doit toujours doubler une garde sur sa version dilatée.

### L-111 – Jamais deux voix en même temps, la victoire n'est pas une exception
2026-09-08, coloriage mj-32 (HO-MJ-08). À la sauvegarde d'un dessin partaient ensemble : la fanfare, une voix MP3 du casting français (`SoundPool.voice`, via `playEndSound`), et une phrase TTS dans la langue du site. Retour Papa Yann : « le son de la victoire plus 2 audios dans 2 langues, absolument pas clair ». Cause : deux couches écrites à des moments différents (la voix du pool est dans `playEndSound`, partagée par 36 jeux ; le TTS nominatif est propre au jeu) sans que personne ne vérifie ce que ça donne à l'oreille une fois réunies. Règle : une seule voix à la fois, y compris à la victoire — soit une voix, soit un enchaînement strict via la fin de l'audio précédent. Quand un jeu ajoute sa propre phrase, il coupe explicitement celle du pool (`playEndSound(..., {voice:false, onFanfareEnd})`).

### L-112 – Un chiffre de perf annoncé par un sous-agent se remesure avant d'être gravé
2026-09-08, HO-MJ-08. Le rapport du sous-agent annonçait « 12,9 – 29 ms sur le pire cas (fond entier) » après optimisation. Mesure indépendante rejouée par l'orchestrateur : 124 à 492 ms sur ce même cas, et déjà 412 ms sur le code d'AVANT le chantier. Le correctif ne dégradait rien, mais le chiffre servait à prouver qu'une cible (« < 50 ms ») était tenue, alors qu'elle ne l'était pas et ne l'avait jamais été. Même famille que la règle « vérifier les claims d'écriture avec git diff » : un claim de MESURE se rejoue aussi, surtout quand il valide une porte. Corollaire vu ici : mesurer avec un `MouseEvent` synthétique alors que le code écoute `pointerdown` ne déclenche rien et produit des chiffres qui décrivent une page vierge.

### L-113 – Une chaine outillee se lance, elle ne se delegue pas a Papa Yann
2026-09-08, fonds de coloriage (mj-32). Apres avoir ecrit le script de generation des 5 fonds, j'ai rendu la main a Papa Yann avec deux commandes a taper, en croyant que la generation d'images « demandait une action humaine ». Sa reponse : « c'est toi qui lance la generation d'image hein ? ». Il avait raison : le lancement du navigateur est un script (`launch-brave.ps1`), la session ChatGPT est deja loguee et persiste dans son profil, et la skill prevoit meme le repli quand Brave tourne deja (`launch-chromium.ps1`, port 9225, « ne JAMAIS fermer le Brave de l'utilisateur »). Le seul geste humain reel, la premiere connexion au compte, avait deja ete fait il y a des mois. Regle : avant de renvoyer une tache a l'humain, verifier ce que l'outillage sait faire seul — lire le script jusqu'au bout, y compris ses replis. Un prerequis ecrit dans une doc (« session loguee ») decrit un etat, pas forcement une action a redemander.

### L-114 – Trois pieges de la chaine ChatGPT pilotee, tous rencontres d'affilee
2026-09-08, meme session. (1) Brave deja ouvert par l'utilisateur empeche d'ouvrir un second Brave en mode debug : Chromium partage ses processus entre profils. Repli prevu par la skill : `launch-chromium.ps1`. (2) `gpt-gen.mjs` code le port 9222 en dur, mais `gpt-gen-dino.mjs` accepte `CDP_PORT` — verifier lequel on appelle avant de patcher quoi que ce soit. (3) L'URL de la page projet du GPTs (`/project`) plante et n'affiche qu'un bouton « Try again », sans champ de saisie, ce que le generateur remonte en code 3 « composer introuvable ». Contournement : rester dans le CHAT du projet (`/c/<id>`), qui monte normalement. Ne pas conclure au quota sur un code 3.

### L-115 – Un zoom se recette sur ce que l'enfant veut atteindre, pas sur le centre du dessin
2026-09-08, zoom du coloriage (HO-MJ-10). Le sous-agent a livré un zoom fonctionnel et prouvé juste au pixel : un tap en zoom posait la couleur exactement sous le doigt. Il l'avait mesuré au CENTRE du dino, et signalait honnêtement n'avoir pas testé le coloriage d'une lettre du nom. C'était précisément le cas d'usage qui justifie le zoom (l'intérieur d'une petite lettre est plus petit qu'un doigt de 4 ans). Deux défauts s'y cachaient, invisibles au centre : la borne de déplacement se calculait sur la fenêtre au lieu du canvas affiché, laissant le bas 62 px hors champ ; et le déplacement s'interrompait dès que le doigt sortait du canvas, faute de `setPointerCapture`, ce qui laissait encore 45 px inatteignables. Règle : recetter une fonction de navigation sur la CIBLE la plus difficile à atteindre (le bord, le coin, le plus petit élément), jamais sur le centre où tout marche toujours. Corollaire : quand un rapport liste un cas non vérifié qui est justement la raison d'être de la fonction, ce cas se teste avant de commiter, il n'est pas une réserve mineure.

### L-116 – Un bouton ajoute a une barre flex sans wrap pousse ses voisins HORS de l'ecran, en silence
2026-09-08, coloriage mj-32. Les boutons Decors et Zoomer, ajoutes le meme jour par deux chantiers differents, ont porte la barre `.atelier-top` a 409 px de large sur un ecran de 360. « Autre dino » sortait a gauche (x = -49) et surtout « Fini ! » sortait a droite : l'enfant ne pouvait plus terminer son dessin. Aucune porte ne l'a vu, et aucune mesure de `scrollWidth` sur la PAGE non plus, parce qu'un flex sans `flex-wrap` ne fait pas deborder la page : il comprime puis pousse ses enfants hors du cadre, silencieusement. Regle : tout ajout d'un bouton dans une barre existante impose de mesurer la position REELLE de chaque bouton (`getBoundingClientRect`) a 360 et 320 px, et pas seulement de verifier que la page ne defile pas. Correctif applique : `flex-wrap: wrap` sur la barre.

### L-117 – La page /project du GPTs ChatGPT plante ; le CHAT du projet, non
2026-09-08, generation des fonds puis des plantes. L'URL de la page projet du GPTs (`chatgpt.com/g/<id>/project`) rend une page vide avec un seul bouton « Try again » et aucun champ de saisie. Le generateur remonte alors le code 3 (« composer introuvable »), qu'il ne faut pas confondre avec un quota. Papa Yann a du intervenir a la main une fois pour rouvrir `chatgpt.com`. Contournement fiable : ne jamais naviguer vers `/project`, rester dans le CHAT du projet (`/c/<id>`), ou recharger `chatgpt.com` avant de reprendre. Le mode `--preview` des scripts de batch permet de verifier tous les prompts sans consommer un seul credit avant de lancer une serie.

### L-118 – Une animation WAAPI en fill:forwards ecrase tout style.left/top reassigne ensuite
2026-09-08, theatre d'eclosion du nid (EP-121, « le dino qui sort est totalement decalle »).
`moveCarry()` animait la couche de transport avec `Element.animate(..., {fill:'forwards'})`
puis reassignait `carry.style.left/top` pour figer la position. Or `fill:'forwards'` garde la
priorite sur le style inline : le transform anime restait applique par-dessus. A l'etape
suivante, le nouveau `translate(dx,dy)` — calcule comme un delta relatif a la position
supposee courante — s'empilait sur l'ancien transform fantome, cumulant le decalage. Mesure
qui a tranche : `carry.style.left` a -4 px pendant que `getBoundingClientRect().x` valait
-193 px sur un ecran de 360 — le dino sortait de l'ecran. Regle : apres une animation WAAPI
en `fill:'forwards'`, figer la position ET appeler `anim.cancel()` ; `style.transform='none'`
ne suffit pas. Et ne jamais faire coexister deux systemes de coordonnees (un `center()`
relatif a un overlay, un `left/top` calcule a la main) sur le meme element.
Corollaire : une geometrie lue avant un `await` de 1400 ms est perimee au moment de servir.

### L-119 – Un ecran de fin manquant ne se prouve pas au grep, il se joue
2026-09-08, EP-123 (« un minijeu fini n'a pas ouvert de celebration »). Un premier audit
statique a conclu que seul mj-32 n'appelle pas `G.showEnd()` — vrai mais hors sujet, mj-32
est un atelier libre sans manches. La question n'etait pas « qui n'appelle pas showEnd »
mais « chez qui showEnd n'est jamais ATTEINT ». Il a fallu jouer 18 parties reelles
(6 jeux x niveau 1 et 3 x collection vierge et avancee) en ecoutant `pageerror` pour
trancher. Verdict : non reproduit. Regle : pour un bug de sequence, l'audit statique
repond a cote ; il faut derouler la partie et ecouter les erreurs JS. Et un « non reproduit »
honnete vaut mieux qu'un coupable invente — noter alors ce qui n'a PAS ete couvert
(ici : throttling CPU du vrai P30 Pro, et le TTS reel absent en headless, donc le chemin
`onend` naturel jamais teste, seulement le filet de secours ~12 s).

### L-120 – Un element retire du DOM garde un rect fantome : toute animation ancree dessus part ailleurs
2026-09-08, theatre d'eclosion (EP-121, deuxieme couche du meme bug). Apres avoir tue le
transform fantome WAAPI (L-118), le dino sortait toujours au mauvais endroit. Cause reelle :
`hatchTheatre` appelait `MaxFX.hatch(oeuf, ...)` en passant l'oeuf de la CHAMBRE, alors que
la chambre entiere venait d'etre retiree du DOM une etape plus tot (`chambre-ov.remove()`).
`MaxFX.hatch` positionne halo et sprite avec `p = center(el, ov)` : sur un element detache,
`getBoundingClientRect()` ne leve aucune erreur, il rend des coordonnees orphelines. Halo et
dino se posaient donc loin de la case cible, qui restait vide et sombre — exactement le
symptome rapporte. Correctif : ancrer sur `cible || oeuf`, la case de l'album etant deja
transmise de promesse en promesse. **Regle** : quand une sequence retire un conteneur puis
anime quelque chose, verifier que l'ancre de l'animation vit encore dans le DOM ; un rect
d'element detache est silencieux, jamais une exception. Corollaire : une meme plainte
utilisateur peut cacher DEUX bugs empiles — corriger le premier et voir le symptome persister
ne veut pas dire que le premier correctif etait faux.

### L-121 – Mesurer a un instant et capturer a un autre produit une conclusion fausse
2026-09-08, verification d'EP-121. Un agent a rendu un rect (`x≈194, y≈155`) « centre sur la
tuile cible » alors que la capture jointe montrait le halo en bas a droite et la case cerclee
VIDE : la mesure et l'image venaient d'instants differents, et la mascotte Triceratops fixe
de l'ecran avait ete prise pour le dino revele. Sur une animation, un rect n'a de sens que
lu dans le MEME tour d'evenement que le screenshot. **Regle** : pour prouver la position d'un
element anime, echantillonner a chaque frame et rendre rect + capture du meme instant, puis
OUVRIR l'image et la decrire. Un chiffre seul se trompe de cible, une capture seule ne se
mesure pas — il faut les deux, solidaires. Parent : la regle projet « ouvrir la capture ».

- **L-122** — **Quand deux couches appellent le meme initialiseur, c'est la DERNIERE qui gagne : parametrer le jeu ne suffit pas si le shell repasse derriere** (EP-124, 2026-09-09). Ajouter `Golden.setup(id, { questions:[3,4,5] })` dans `mj-28.html` n'a rien change : la piste affichait toujours 4 billes. Le code etait juste, la valeur lue etait `[4,6,8]`. Cause : `mj-shell.js` rappelle `Golden.setup(cfg.id)` **apres** le jeu, sans options, et ecrase la table declaree. Le reflexe « le cache du navigateur, un fichier deploye ailleurs » etait faux — un seul `mj-golden.js` existe dans le repo. **Regle** : quand une valeur parametree revient au defaut, chercher un **second appel** de l'initialiseur avant de soupconner le cache ou un doublon de fichier (`grep` du nom de la fonction sur tout `site/js/`). Corollaire de conception : un parametre de jeu doit transiter par la config que le shell connait (`cfg.questions`), sinon toute couche posterieure le perd. Ce qui a tranche en 30 secondes : lire l'etat reel dans la page (`Golden.qsPerLevel`) au lieu de relire le code — un log de succes prouve qu'un code s'est execute, jamais que la valeur attendue est arrivee.

- **L-123** — **Une capture prise pendant une animation d'accueil documente l'animation, pas l'ecran : trois faux defauts en sont nes** (EP-129/EP-130, 2026-09-09). La chambre des oeufs a ete jugee « coupee au tiers droit » et « tres sombre, contraste insuffisant » sur une capture de recette. Verification : le panneau droit est `.ch-sac`, le sac a dos, voulu et large de 88 px ; les oeufs sont creme `#fff7e0`, opacite 1, sans voile ; le titre mesure 19.76:1. Le noir venait de `#nid-intro-ov`, le didacticiel de premiere visite, qui dure **6 secondes** et assombrit tout. Deux pieges cumules : (1) l'overlay est pose sur `document.body`, **hors** du conteneur inspecte, donc invisible a un balayage de `#chambre-ov *` — un voile absent des mesures peut parfaitement etre a l'ecran ; (2) le seul texte mesurable etait le titre, alors que le defaut portait sur les **oeufs**, qui ne sont pas du texte et echappaient au calcul de contraste. **Regle** : avant de photographier un ecran pour le juger, **fermer explicitement tout didacticiel/intro** et attendre la fin des animations non infinies (`document.getAnimations()`), jamais un `waitForTimeout` au juge ; et quand une mesure ne trouve rien alors que l'oeil voit un defaut, chercher l'element **en dehors** du conteneur mesure avant de conclure que l'oeil se trompe. Cousin de L-D39 (un critere de mesure faux fabrique des defauts inexistants) : ici c'est l'INSTANT de la mesure qui etait faux, la meme famille d'erreur.

### L-124 – Un style INLINE en JS bat la feuille : corriger le CSS ne sert à rien
**Constat** : `.mp-ghost-back` passé à 48px dans `mp-theme.css`, mesure après coup : toujours 42. **Cause** : `back-button.js` pose `width:42px` en `style.cssText` à la création du bouton — spécificité inline > feuille, le CSS n'avait aucun effet. Le savant fou, lui, n'a pas de style inline et a obéi tout de suite : c'est l'écart entre les deux qui a mis sur la piste.
**Fix** : corriger là où la valeur est réellement posée (le JS), et mettre à jour le commentaire d'en-tête du fichier qui annonçait encore « 42px ». **Règle** : une correction de dimension se VÉRIFIE par `getBoundingClientRect()` sur la page réelle, jamais en relisant le CSS — un composant injecté par JS peut se styler lui-même.

### L-125 – Une sonde d'image ratée n'est pas une panne : le smoke doit distinguer les deux
**Constat** : mj-32 rouge sur 41 `ERR_FILE_NOT_FOUND` alors que les 33 assertions métier passaient. **Cause** : le catalogue de coloriage sonde `<base>_coloriage.webp` pour les 71 dinos et les 19 plantes et retire de la grille celles qui manquent (`img.onerror`) — c'est du contrôle de flux VOULU, et 13 plantes sur 19 n'ont pas encore de lineart. Le smoke de `run.mjs` comptait chacune de ces sondes comme erreur console.
**Fix** : liste `ASSET_OPTIONNEL` dans `run.mjs`, qui tolérait déjà les consignes MP3 pour la même raison ; seul le suffixe `_coloriage.webp` est ajouté, tout autre asset manquant reste bloquant. **Règle** : avant de « réparer » un smoke rouge, lister les URL réellement en échec — la TODO annonçait 1 cause (Scelidosaurus), il y en avait 14, dont 13 par conception.

### L-126 – Une TODO vieille de deux jours se vérifie avant d'être exécutée
**Constat** : ticket « `applyDinoStrings()` n'est appelé nulle part dans mj-32 : les noms restent en français ». Mesure sur la page en `?lang=en` : « T-Rex » → « T. rex », « Dicroïdium » → « Dicroidium », familles traduites. **Cause** : `dinos-i18n.js` s'auto-applique par `document.write` à la fin de son propre fichier — un grep de callers ne le voit pas, seule l'exécution le montre.
**Règle** : un ticket écrit par un autre (sous-agent ou session passée) est une hypothèse, pas un fait. Le coût de la mesure est de deux minutes ; celui d'un correctif inutile sur un composant partagé est bien plus élevé.

### L-127 – Le damier d'un coloriage n'était visible qu'une fois le décor derrière
**Constat** : recette de l'atelier avec décor — le dino apparaît sur un rectangle de damier gris au milieu du désert. Premiers réflexes tous faux : canal alpha du WebP (aucun, `yuv420p`), motif dessiné par le jeu (aucun `createPattern`), élément superposé (le canvas est seul), transparence du canvas (mesurée : 0 %).
**Cause** : le damier de transparence de l'éditeur a été APLATI dans le fichier source à la génération — des pixels gris 235-251 alternés avec du blanc sur 34 à 42 % de l'image, sur 6 coloriages. Sur fond blanc il est invisible ; c'est la composition sur décor qui l'a révélé, des mois après.
**Fix** : `blanchit-damier.py` ramène les pixels clairs ET neutres au blanc pur, laisse le trait noir, vérifie l'étanchéité après coup. **Règle** : un défaut d'asset peut dormir jusqu'à ce qu'une nouvelle fonctionnalité change le contexte d'affichage — et une mesure qui dit « 0 % de transparence » ne contredit pas un damier VISIBLE, elle dit seulement qu'on mesure la mauvaise chose.

### L-128 – Le harnais CI est rouge par instabilité, pas par régression
**Constat** : le job « Test mini-jeux » échoue sur chaque push depuis plusieurs commits. Un rouge permanent finit par ne plus être lu, ce qui coûte plus cher que pas de CI du tout.
**Cause** : `run-all.mjs` lance 36 Chromium à la suite ; sous charge, un jeu dépasse ses délais. Trois passages locaux donnent trois listes DIFFÉRENTES (passe 1 : aucun ; passe 2 : mj-21 et mj-55 ; un autre passage : mj-19 et mj-46) — et chacun de ces jeux passe au vert lancé seul. Ce n'est donc jamais le jeu qui casse.
**Règle** : avant de « corriger » un jeu que la CI signale, le relancer SEUL (`npm run mj:test mj-XX`) et rejouer la suite complète deux fois. Des coupables qui changent à chaque passage = instabilité du harnais. Le déploiement, lui, n'est pas concerné : le workflow Pages est séparé exprès et reste vert.

### L-129 – « CI instable » était un diagnostic paresseux : une seule image manquante
**Constat** : correction de L-128, gravée quelques heures plus tôt le même jour. J'y concluais que le harnais était flaky parce que quatre passages donnaient quatre listes de coupables différentes (mj-19+mj-46, aucun, mj-21+mj-55, mj-24), tous verts relancés seuls. Le raisonnement « coupables tournants = instabilité » était faux.
**Cause réelle** : `img/dinos/ombres/Scelidosaurus_ombre.png` n'existe pas. `DinoOmbres.pool()` construisait la liste depuis `DINOS` en supposant qu'un dino déclarant un `png` a forcément son ombre. Les jeux d'ombres tirent au hasard : quand le tirage tombait sur ce dino-là, l'image manquait. D'où des coupables différents à chaque passage — le hasard du tirage, pas la charge machine. **Et l'enfant pouvait tomber sur une carte d'ombre VIDE en jouant.**
**Ce qui a débloqué** : écouter `requestfailed` ET `console` en même temps sur dix lancements successifs, au lieu de raisonner sur la forme des symptômes. L'URL est apparue au 8e.
**Règle** : « intermittent » ne veut pas dire « instable ». Un tirage aléatoire produit exactement la même signature qu'une flakiness de timing. Avant d'accuser l'environnement — le plus commode des coupables, parce qu'il n'oblige à corriger personne — il faut faire apparaître l'URL, la ligne ou l'assertion exacte. `SANS_OMBRE` (dans `dinos-ombres.js`) exclut le dino du tirage, et `_check-ombres-dino.mjs` garde la liste honnête dans les deux sens : entrée à retirer dès que l'ombre existe, id à ajouter si un dino arrive sans la sienne.

### L-130 – Une contrainte géométrique doit se vérifier sur ce que l'enfant VOIT
**Constat** : mj-46 échouait par intermittence sur `maxOverlap=0.71` alors que la limite est 0,70. Simulation du placement hors navigateur : zéro dépassement sur 2800 tirages, pire cas 0,667. Les deux mesures étaient justes et se contredisaient.
**Cause** : le placement évaluait le chevauchement sur l'œuf DROIT, et la rotation (±15°) était tirée juste APRÈS. Or la spec mesure `getBoundingClientRect()`, donc la boîte englobante de l'œuf PENCHÉ — qui vaut jusqu'à 1,52× l'aire de l'œuf droit. Deux œufs « assez visibles » selon le calcul se recouvraient réellement au-delà de la limite. Le test avait raison ; c'est le code qui vérifiait la mauvaise géométrie.
**Fix** : tirer la rotation avant le placement et comparer les boîtes tournées (`boiteTournee()`). 3600 tirages simulés sans dépassement, 5 passages du test au vert, rendu inchangé (capture relue).
**Règle** : quand une contrainte porte sur ce que l'utilisateur perçoit (visible, cliquable, lisible), la vérifier sur la géométrie FINALE — après rotation, échelle, transformation. Vérifier avant la transformation, c'est garantir une propriété que personne ne voit. Et deux mesures contradictoires ne signifient pas qu'une des deux est boguée : le plus souvent elles ne mesurent pas le même objet.

### L-131 – Une expression avec `||` dans un template literal casse toute la page
**Constat** : ajout d'un repli `${(DINO_FAMILLES.find(f => f.id === d.famille) || {}).emoji || cat.emoji}` dans le HTML généré de `dev-dinos.html` → `Unexpected identifier 'cat'`, plus AUCUNE famille affichée. La page entière était morte, pas seulement le hero.
**Cause** : le template literal est lui-même imbriqué dans une chaîne générée ; les `||` et les parenthèses y sont ré-analysés et cassent le parsing. Le défaut ne se voit pas à la relecture — la ligne est valide isolément.
**Fix** : sortir le calcul AVANT le template (`const emojiReplique = …`) et n'y laisser qu'un identifiant nu. **Règle** : dans un `${}`, ne mettre qu'une variable ou un appel simple ; toute logique (`||`, ternaire imbriqué, objet littéral) se calcule au-dessus. Et vérifier une modification de HTML généré en OUVRANT la page, jamais en relisant le diff : une erreur de syntaxe ne casse pas la ligne fautive mais tout ce qui suit.

### L-132 – Une recette de test recopiée depuis le jeu peut être injouable
**Constat** : mj-21 échouait 1 fois sur 8, toujours sur le défi « brun », sans aucune erreur JS. Quatre hypothèses écartées avant d'y arriver : la charge machine, mj-55 (sain, 0/8), la couleur (20 lancements sans échec — mon échantillon ne tirait jamais le brun), puis enfin la bonne.
**Cause** : la spec recopiait les proportions nominales de `DEFIS` — brun = 2 rouge + 2 jaune + 1 bleu, soit 5 doses. Or le tube est plafonné à `TUBE_CAP = 4` (🔒). Le 5e clic est refusé, et la victoire se juge sur la PROPORTION obtenue (`findBestDefi`, distance < 0,55), jamais sur le compte exact. Le test attendait donc une victoire structurellement impossible. Le brun était le seul des 13 défis au-dessus de la capacité.
**Fix** : verser 1+1+1, la meilleure des 3 combinaisons qui tombent sur le brun à 4 doses ou moins (distance 0,267). Ce n'est pas un contournement : c'est ce que fait l'enfant, qui n'a lui non plus que 4 doses. 14 + 6 lancements au vert, capture relue.
**Règle** : une donnée recopiée d'un fichier à l'autre perd ses contraintes d'usage. Avant de recopier une table de référence dans un test, vérifier que chaque entrée reste ATTEIGNABLE — plafond, bornes, capacité. Et un échantillon aléatoire qui ne fait apparaître aucun défaut ne prouve rien tant qu'on n'a pas vérifié qu'il couvre le cas suspect.

### L-133 – Un test SANS aléa qui échoue par intermittence ne peut dépendre que du temps
**Constat** : mj-55 tombait ~1 passage de suite complète sur 2, mais **0 fois sur 20 lancé seul** (8 + 12 mesures). J'avais d'abord conclu « mj-55 est sain » sur la foi des lancements isolés — conclusion prématurée, corrigée par la suite complète.
**Ce qui a orienté le diagnostic** : contrairement à mj-21 (couleur tirée au hasard) et mj-46 (placement aléatoire), cette spec est DÉTERMINISTE — `setTestMode`, `setDifficulty`, chemin gagnant scripté, aucun tirage. Un test sans aléa qui varie ne peut varier que par le temps. C'est ce raisonnement qui a évité de chercher une cause de données pendant des heures.
**Cause** : la boucle de résolution attendait `waitForTimeout(80)` entre deux puzzles. Sous charge, `solveCurrent()` repartait avant que le puzzle suivant soit prêt, et les 8 tours s'épuisaient sans atteindre `.end-wrap`. Le commentaire affirmait que `testMode` ramène le délai à 0 — vrai côté jeu, mais 80 ms restait un pari sur la vitesse de la machine.
**Fix** : attendre le FAIT (`state.qCount` a progressé, ou l'écran de fin existe) au lieu d'une durée.
**Règle** : avant d'enquêter sur un test intermittent, se demander s'il contient un aléa. Avec aléa → chercher le cas de données non couvert (cf. L-132, le défi « brun »). Sans aléa → c'est une attente fixe, chercher `waitForTimeout` dans une boucle. Et ne jamais conclure « sain » depuis des lancements isolés quand l'échec n'a été observé qu'en suite : reproduire dans la CONDITION où le défaut apparaît, pas dans la plus commode.

### L-134 – Corriger une borne sans regarder l'autre casse la contrainte opposée
**Constat** : après L-130 (empêcher qu'un œuf penché en cache un autre), mj-46 est retombé sur l'assertion INVERSE : `maxOverlap=0.00`, les œufs ne se chevauchaient plus du tout. Le test vérifie les deux bornes ; je n'avais lu que celle qui échouait.
**Cause** : la boucle de placement gardait le tirage de plus FAIBLE recouvrement et s'arrêtait au premier acceptable. Elle optimisait donc vers zéro — mathématiquement le meilleur score, visuellement des œufs rangés côte à côte, l'inverse exact de la demande PY (« encore plus les décaler et les faire se chevaucher »). Ma correction avait supprimé le mal en supprimant l'intention.
**Fix** : traiter la règle comme une FOURCHETTE (0,06 à 2/3) et non un minimum — accepter dès qu'on est dedans, garder le plus proche à défaut. 2800 placements simulés : jamais d'œufs séparés, jamais d'œuf caché, de 2 à 20 œufs.
**Règle** : quand une contrainte a une borne haute, chercher la borne basse AVANT de corriger — « pas trop » implique presque toujours un « assez » implicite qui porte l'intention de design. Lire la spec ENTIÈRE, pas seulement l'assertion rouge : les deux bornes y étaient écrites l'une sous l'autre. Un optimum qui rend une mesure parfaite (0,00) doit éveiller le soupçon plutôt que rassurer.

### L-135 – Corrige L-133 : mj-55 n'était pas une histoire de temps, mais un `findIndex` à -1
**Constat** : L-133 concluait que mj-55 échouait sur une attente fixe de 80 ms, « un test sans aléa ne peut varier que par le temps ». Le raisonnement était séduisant et FAUX sur sa prémisse : cette spec contient bien un aléa — la grille de départ est tirée au hasard. Après le correctif d'attente, elle tombait encore 1 passage sur 4.
**Cause réelle** : `s0.given[0].findIndex(v => v === 0)` cherchait une case vide sur la PREMIÈRE LIGNE seulement. Quand les indices tirés la remplissaient entièrement, `findIndex` rendait -1 ; l'assertion `emptyIdx !== -1` le constatait mais le test CONTINUAIT, puis se bloquait 30 s sur `.eq-cell[data-c="-1"]`, un sélecteur qui ne peut pas exister. Même motif un peu plus bas, ligne 49, sur le bloc « conflit trio » — qui ne testait alors rien, en silence.
**Fix** : chercher la case vide dans toute la grille, sortir immédiatement s'il n'y en a aucune, et viser la ligne la plus libre pour le conflit trio. 10/10 sous charge artificielle, là où il tombait avant.
**Règle** : une assertion qui CONSTATE une précondition doit aussi ARRÊTER le test quand elle échoue — sinon l'échec réel est masqué par un timeout à 30 s trois lignes plus loin, et le diagnostic part vers le temps. Et avant d'affirmer « ce test n'a pas d'aléa », vérifier la génération des données, pas seulement les appels de test : `setDifficulty` forçait le niveau, pas le tirage de la grille.
