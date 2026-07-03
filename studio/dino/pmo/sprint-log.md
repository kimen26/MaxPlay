# Sprint-log — Pôle DINO

> Journal des sessions (plus récent en haut). Tenu par `dino-pmo`.

## 2026-07-03 — TÂCHE AUTONOME : Ajout Edmontonia (60e dino) — commit 4354ac68

**Livré** :
- **1 dino Crétacé intégrée** : Edmontonia (nodosauridé, armure dorsale), id `edmontonia`, famille `arme`, **periode `cretace`**.
- **Taille/poids honnête** : 6,6 m / 3 tonnes (Wikipedia EN). Fonction `_compLong/_compHaut/_compPoids` appliquées.
- **Dialogues V3 écrits** : 4 blocs (Bloc A étymologie « edmont- », Bloc B tailles comparées, Bloc C vie/groupe, Bloc D « truc fou »), narrateur_h + Wex, tags v3, **4 segments JSON prêts** (`_seg-edmontonia-*.json` dans attente V3/json/).
- **Grep-interdits passé** ✅ (0 max/doudou/peluche/bus).
- **INVARIANTS maj** : dinos **59→60**, famille `arme` **4→5** dinos (Stégosaure, Ankylosaure, Nodosaure, Euoplocéphale → **+Edmontonia**). Autres counts OK (11 familles, 4 régimes, 5 périodes).

**État** :
- ✅ Edmontonia data + dialogues V3 + 4 segments JSON prêts
- ⏳ **Audio MP3 + image paléoart** en attente (inclus dans EP-D19 quota EL reset ~9 juillet)
- ✅ **Count réel vérifié disque** : 60 dinos total, répartition trex 13, raptor 8, cou_long 7, enaliosaures 7, mammiferes 7, cornu 6, arme 5, bec 3, pterosaures 2, oiseaux 1, volant 1.

---

## 2026-07-03 — SESSION FAMILLE MAMMIFÈRES + OISEAUX : Cénozoïque mégafaune intégrée (commit ab818798)

**Livré** :
- **2 familles créées** : `mammiferes` (5 dinos) + `oiseaux` (3 dinos). Pass 9→11 familles.
- **8 dinos Cénozoïque intégrées** : Mammuthus, Smilodon, Megatherium, Paraceratherium, Glyptodon, Aenocyon (loup terrible), Coelodonta (rhino laineux), Titanis (oiseau terrifiant). Pass 51→59 dinos.
- **1 nouvelle période** : `cenozoique` (66 Ma → aujourd'hui) ajoutée `DINO_PERIODES`.
- **Fact-check validé** : 7/8 Grokipedia + 1 Wikipedia (Titanis). Chiffres honnêtes taille/poids/régime, échelle _compLong/_compHaut/_compPoids sortie exacte.
- **Dialogues V3 écrits** : `studio/dino/content/scripts-audio/V3/megafaune.md` (8 bêtes × 4 blocs, Narrateur H + Wex). **32 segments JSON générés** dans `V3/json/` : `_seg-mammuthus-*.json`, `_seg-smilodon-*.json`, etc. Grep-interdits passé ✅ (0 max/doudou/peluche/bus).
- **Images inbox rangées** : `/studio/dino/content/sources/megafaune/_refs-visuelles/` (28 PNG domaine public, non déployées).
- **INVARIANTS maj** : counts 51→59 dinos, 9→11 familles, 4→5 périodes. Clé 🔒 gravée : 2 catégories nom-pas-1-seule (Mammifère/Oiseau, honnêteté taxo).

**Décisions Papa Yann gravées (decisions.md)** :
- Q-DINO-nouvelle : Cénozoïque = fiches individuelles onglet Familles (PAS 9e épisode Voyage, tranché « pas besoin »).
- 2 catégories UI : « Mammifère » + « Oiseau » (honnêteté taxo).
- Titanis : 1,9 m (corrigé inbox 2,5 m → Wikipedia).

**EN ATTENTE (ticket ouvert)** :
- **EP-D19** (ou numéro libre) : **AUDIO MP3 BLOQUÉ** — quota ElevenLabs épuisé (118055/122630 char restant ~4575). 32 segments JSON prêts, audio en pause jusqu'au reset ~9 juillet. Alors : MCP `studio_audiobook_from_segments_v2_dialogue` batch + loudnorm + câblage `DINO_AUDIO` dev-dinos.html.
- **Images paléoart** : 8 bêtes × 5 scènes attendues (skill dino-paleoart). Pngs data Mammuthus/Smilodon/Megatherium/Paraceratherium/Glyptodon/Aenocyon/Coelodonta/Titanis (casse exacte). En-attente, onerror masque images (pas rendu cassé).

**Leçon gravée (L-D18)** : « **Sous-agents qui sous-délèguent en no-op** ». REX 2026-07-03 : 2 sous-agents (archiviste + conseiller) ont chacun annoncé faire le travail au 1er tour sans l'exécuter + 1 sub-agent factcheck imbriqué pareil. Pattern : relancer EXPLICITE « exécute toi-même, tu n'as pas de sous-agent » → tous ont produit du travail. Le système reste fiable parce que main agent vérifie et relance — ne JAMAIS prendre « je vais faire X » pour argent comptant, exiger le livrable.

**Correctif mineure** : 1 MP4 « Pierre et le Loup » 68 Mo committé par mégarde (git add -A inbox) → dépasse limite GitHub 50 Mo (warning, non-bloquant). À nettoyer/gitignorer futur.

**État au reboot** :
- ✅ **59 dinos, 11 familles, 5 périodes** (INVARIANTS maj)
- ✅ **Cénozoïque = section onglet Familles**, fiches individuelles (pas épisode Voyage)
- ✅ **32 segments JSON V3 prêts**, audio EN ATTENTE quota EL reset
- ✅ **8 images paléoart attendues** (futures)
- ⏳ **EP-D19 ouvert** (audio post-reset 9 juillet)


---

## 2026-07-03 — SESSION AUDIT IMAGES (supra méga audit complet)

**Livré** :
- **Audit 1 294 images** dans 19 répertoires — inventaire structuré + hash MD5 + vérification technique + audit visuel sémantique.
- **Rapport complet** : `studio/dino/pmo/audit-images-RAPPORT.md` avec synthèse, findings, recommandations, index proposé.
- **Fichiers d'audit** : INVENTAIRE.json (index), DINOS-REF.json (59 espèces), TECHNIQUE.json (problèmes).

**Findings** :
- **179 fichiers timeout** à nettoyer (captures d'erreur, pas des images dinos)
- **33 groupes doublons hash** — dont 6 inter-espèces (Carcharodontosaurus/Centrosaurus = erreur batch)
- **8 dinos Cénozoïque sans images XXL** (normal, ajout récent)
- **Qualité globale** : ⭐⭐⭐⭐⭐ — paléoarts XXL excellents
- **12 images "fort potentiel vidéo"** identifiées (écossystème, funfact, Paris)

**Décisions** :
- Aucune suppression effectuée (rapport seul, validation utilisateur requise)
- Index centralisé proposé (JSON mapping image ↔ espèce ↔ scène ↔ qualité)

**EN ATTENTE** :
- **EP-D20** : Nettoyage timeout + regénération doublons + images Cénozoïque
- **EP-D21** : Test vidéo à partir des 12 images coups de cœur

**État au reboot** :
- ✅ Audit images complet livré
- ⏳ EP-D20 ouvert (nettoyage + regénération)
- ⏳ EP-D21 ouvert (test vidéo)

---

## 2026-07-03 - [ARCHIVISTE] Audit FORME complet (5 sections)

**État** : ✅ Fait. VERT — pôle = 100 % conforme.

**Résumé** : audit structure (préfixes, gabarit, refs, orphelins, cohérence). Zéro CRITIQUE/HAUTE. Actions JAUNE : images `_new-xxl/` à inventorier, inbox à cataloguer. Détail `audit-trail.md`.

---

## 2026-07-03 — SESSION IMAGES : câblage hero, Ichthyosaurus aquarium, format JPEG/WebP décidé, compression 86%

**Fait :**
- **Câblage hero Torosaurus + Pentaceratops** : pointaient encore vers vieilles images `grok/*.jpg` → re-câblés sur paléoart (code `site/js/dinos-data.js`).
- **Image manquante générée** : `Ichthyosaurus_paris.jpg` (scène aquarium). DÉCISION Papa Yann validée : dino 100% marin = aquarium (enfant debout AU SEC devant vitre, ichtyosaure nage derrière), pas avenue RATP (animal aquatique ne tient pas trottoir). Plongeur adulte rejeté (no échelle enfant). Version aquarium gardée, brut plongeur archivé `_new-xxl/Ichthyosaurus_paris-plongeur.png`.
- **Format images figé** : JPEG q85 (ffmpeg -q:v 4) pour photos paléoart (compat universelle). WebP q90 pour coloriages N&B+transparence (préserve traits, pas bavure JPEG). Résultat : dossier paleoart 771 Mo → 108 Mo (-86%). Repo ~113 Mo images au lieu de 1,6 Go.
- **Refs code mises à jour** : `dinos-data.js` champ `png:` → `.jpg`, `dev-dinos.html` EXTRAS → `.jpg`. 308 JPEG + 51 WebP déployés, 0 PNG.
- **Zones staging gitignore** : `site/img/dinos/_new-xxl/`, `_new-coloriage/`, `_new-headshots/`, `_new-ombre/`, `coloriage-test/` gitignorées (bruts HD ChatGPT/Grok, retouches locales, non déployés).
- **État final DÉCLARÉ TERMINÉ** par Papa Yann : chantier images app dino clôturé. Reste juste "quelques ombres chinoises à voir demain" (dossier `_new-ombre/` staging).

**Leçon grave (REX)** :
- **L-D16 — Staging concurrent cassé** (confirmé à nouveau) : mon `git commit` a affichté "no changes" car session concurrente a emporté fichiers stagés avant. Poussé via chemin démarche (stager/commiter vite, vérifier HEAD, pas se fier au message), contenu bien en production (vérif : `git show HEAD` = 308 JPEG + 51 WebP, code en .jpg). Rappel pattern : ne pas solo-commit sans vérif finale HEAD.

**Correctifs archiviste appliqués (2026-07-03, commit cc2c95f3)** :
- **Casse fichiers paleoart** : 82 fichiers en minuscule (ex `albertosaurus_manger.jpg`) alors que code cherchait Majuscule → 404 GitHub Pages (Linux casse-sensible, invisible Windows). Renommés min→Maj.
- **Vignettes racine** : ajout `img/dinos/Pentaceratops.jpg` + `Torosaurus.jpg` (menu/dico/chrono utilisent `img/dinos/${d.png}` sans préfixe paleoart/, manquaient pour ces 2 ex-grok).
- **Résultat** : 0 ref EXTRAS orpheline (casse exacte validée), 51/51 vignettes racine présentes.
- **REX audit** : archiviste a remonté "43 vignettes manquantes" = **FAUX POSITIF sur la cause** (files existaient, HTTP 200 local) MAIS a correctement flairé **vrai problème = CASSE FS**. Confirme `feedback_verifier_claims_agents` : vérifier claims avec git/ls/curl. Son claim "audio 58-60 vs 51 dinos" = HORS PÉRIMÈTRE session (aucun audio touché) → backlogue ultérieur, pas blocker.
- → **L-D17 gravée** (casse FS Windows vs Linux, toujours tester casse exacte sur GitHub Pages).

**Purge cératopsiens orphelins (commit 992c85ca — decision Papa Yann)** :
- **7 cératopsiens rejetés** : anchiceratops, chasmosaurus, diabloceratops, einiosaurus, kosmoceratops, pachyrhinosaurus, utahceratops (jamais intégrés dinos-data.js).
- **Suppression orphelins** : 35 MP3 (`site/audio/dinos/`) + 10 images grok (`site/img/dinos/grok/`) purgés.
- **Régénération nettoyée** : `dinos-images-grok.js` via `_gen-grok.cjs` (32 dinos, 138 images, 0 ref résiduelle).
- **Résultat** : finding CRITIQUE audit archiviste "audio 58-60 vs 51" → **RÉSOLU** (surplus = orphelins). Compte audio dino = **51 par bloc** (figé).

**État au reboot (2026-07-03 FINAL)** :
- ✅ **255 images paléoart** (100%) + **51 images coloriages** déployées GitHub Pages
- ✅ **Format figé** : JPEG q85 paléoart, WebP q90 coloriages
- ✅ **Compression validée** : 771 Mo → 108 Mo images, repo ~113 Mo total
- ✅ **Casse fichiers corrigée** : 82 min→Maj, 51/51 vignettes OK
- ✅ **Orphelins purgés** : 7 cératopsiens + 35 MP3 + 10 images supprimés
- ✅ **EP-D18 CLÔTURÉ DÉFINITIF** (2026-07-01 + correctifs 2026-07-03 + purge 992c85ca)
- ✅ **Chantier images + nettoyage TERMINÉ**, Papa Yann déclaré fini
- **Ticket suivant** : ombres chinoises (voir demain)

---

## 2026-07-01 — SESSION FINALE images paléoart (16 dinos restants, 80 images, 100%)

**Fait :**
- **Production finale** : 16 dinos restants complétés (80 images PNG) sur 2 canaux ChatGPT + Grok.
- **Total atteint** : **51 dinos complets** (5/5 scènes chacun) = **255 images PNG** déployées dans `site/img/dinos/paleoart/`.
  - Scènes par dino : `taille` (échelle enfant 1m), `manger` (régime alimentaire), `paris` (écosystème), `funfact` (anecdote paléo), `ecosystem` (variante écosystème).
- **DINO_EXTRAS mis à jour** dans `dev-dinos.html` : mapping complet des 51 dinos × 5 scènes.
- **Vérification disque** : `ls site/img/dinos/paleoart/` confirme 255 PNG, 0 manquant, 0 parasite.
- **Ticket EP-D18 clôturé** : passage de « 73% — 16 dinos restants » → ✅ **TERMINÉ**.

**État au reboot :**
- ✅ **255 images paléoart déployées** (100% des 51 dinos)
- ✅ **DINO_EXTRAS à jour** dans `dev-dinos.html`
- ✅ **EP-D18 TERMINÉ 2026-07-01**
- **Pôle DINO images paléoart = PRODUCTION FINALE ATTEINTE**

---

## 2026-06-28 — SESSION MARATHON images paléoart (35 dinos complets, 187 images, 73%)

**Fait :**
- **Production massive** sur 2 canaux : ChatGPT (22 dinos) + Grok (13 dinos).
- **187 images PNG** générées et déployées dans `site/img/dinos/paleoart/`.
- **35 dinos complets** (5/5 scènes) : Albertosaurus, Allosaurus, Amargasaurus, Ankylosaurus, Apatosaurus, Archaeopteryx, Archelon, Baryonyx, Brachiosaurus, Camarasaurus, Carcharodontosaurus, Carnotaurus, Centrosaurus, Ceratosaurus, Cryolophosaurus, Deinonychus, Dilophosaurus, Dimetrodon, Diplodocus, Edmontosaurus, Elasmosaurus, Euoplocephalus, Gallimimus, Giganotosaurus, Iguanodon, Kentrosaurus, Liopleurodon, Microraptor, Pachycephalosaurus, Parasaurolophus, Patagotitan, Plateosaurus, Protoceratops, Pteranodon, Quetzalcoatlus.
- **Bug corrigé** : faux positif limite ChatGPT — le script `gpt-gen-dino.mjs` lisait `document.body.innerText` qui incluait la sidebar avec l'historique des chats (contenant "Limite de génération d'image" — titre d'un ancien chat). Corrigé pour cibler uniquement la zone de contenu principale (`main` ou `[data-testid="conversation-turn-3"]`).
- **Quota observé** : ChatGPT ~15-20 images/session (lots de 3-4 dinos), Grok ~10-15 images/session (lots de 2-3 dinos).
- **Stratégie** : alterner ChatGPT et Grok quand un canal est en limite. ChatGPT = plus rapide (images HD ~3Mo), Grok = plus stable mais images plus petites (~400Ko).

**Reste à faire** (16 dinos = 80 images) :
- Ophthalmosaurus, Oviraptor, Pentaceratops, Shonisaurus, Spinosaurus, Stegosaurus, Tarbosaurus, Therizinosaurus, Torosaurus, Triceratops, Troodon, Tyrannosaurus, Utahraptor, Velociraptor
- + Ichthyosaurus funfact, Mosasaurus paris+funfact

**État au reboot :**
- ✅ **187 images déployées** dans `site/img/dinos/paleoart/`
- ✅ **Skill `dino-paleoart` mis à jour** (quota, bug corrigé, bilan session)
- ✅ **Backlog EP-D18 mis à jour** (73% faits, 16 dinos restants)
- **À faire** : reprise quand crédits ChatGPT/Grok rechargés

---

## 2026-06-19 — Production images paléoart XXL + pipeline prompting consolidé (fin session)

**CONSOLIDATION FINALE :**
- ✅ **Pipeline paléoart finalisé** (après nombreux réglages avec Papa Yann) : **prompt STRUCTURÉ EN SECTIONS** = CONTEXTE · RÔLE · OBJECTIF · LE DINOSAURE (specs chiffrées) · L'ENFANT · DÉCOR riche · CAMÉRA · STYLE. Skill `dino-paleoart` (user-level). **Validé visuellement sur Diplodocus.**

- ✅ **4 LEÇONS DE PROMPTING gravées** (réutilisables tout contenu image) :
  1. **ZÉRO consigne négative** « Streisand » (ne jamais nommer ce qu'on ne veut pas → le modèle le produit). Tout formuler en positif.
  2. **DONNER LES VALEURS chiffrées** (longueur, hauteur, cou, queue…), jamais « très longue queue ». Hauteur fiche Grokipedia prime.
  3. **Échelle = enfant 1 m EST le repère**, pas de règle graduée. Donner les mesures exactes, laisser LLM caler ratio, ne pas sur-instruire.
  4. **Décor soigné 2-3 lignes** (flore/régime, sol, petite faune) · **Caméra** : voir animal en ENTIER + nature bords · **Couleur en LIBERTÉ** (teintes + motifs au choix, on connaît pas vraies couleurs).

- ✅ **DEUX CANAUX consolidés**, toujours viser le PROJET (jamais chat lambda ni GPTs custom) :
  - **ChatGPT** : projet « Dinosaure » `g-p-6a2c67ebc22c8191971eecf695ec5fec`
  - **Grok** : projet « Dinosaures » `89187fb9-a866-4373-82c4-cd136bb6905c` (option `--grok` du batch)
  - Note Grok : image sur assets.grok.com/.../generated/, téléchargée via page.request.get (fetch page = 403).

- ✅ **ÉTAT production** : 18 ✅ complets (5/5 scènes) · 3 partiels (1 scène manquante) · 2 bloqués modération ChatGPT (Carcho/Dilo crus) · ~28 pas encore faits. **Limite crédits images ChatGPT + Grok atteinte → reprise pilotée depuis Telegram.** Tout prêt (scripts node --check OK, `_REPRISE.md` à jour avec commandes + ordre 51 dinos + ids).

- ✅ **110 PNG batch 1** (via GPTs custom ancien, avant pipeline finalisé) : GARDÉS mais seront repassés avec pipeline finalisé si temps.

- **Q-DINO-12 rappel** : galerie 5 scènes vs 1 vignette dans l'UI dino → décision Papa Yann.

**État au reboot :**
- ✅ **Skill `dino-paleoart` finalisé** (prompts structurés SECTIONS, leçons gravées)
- ✅ **Scripts batch validés** (node --check OK, `_REPRISE.md` ordre 51 dinos)
- ✅ **Production = EN PAUSE crédits**, tout documenté pour reprise
- **Q-DINO-12 ouverte** : galerie ou vignette

## 2026-06-17 (suite 3) — Clarification DÉCISION : images Lunii FOND NOIR NATIF (pas inversion post)

**Fait :**
- **Clarification décision Papa Yann** : le processus précédent (fond clair généré + inversion post) n'était qu'un pis-aller. La **vraie bonne charte** = **régénérer les images conçues d'emblée pour fond noir** (composition pensée sombre = meilleur rendu Lunii).
- **Raison** : une inversion simple n'est pas vraiment « belle ». Sujet blanc sur noir « brille » mieux quand l'image est composée pour sombre d'emblée.
- **Ticket EP-D17 créé** : action à démarrer « régénérer 10 images (couverture + 9 emblèmes) en fond noir natif ». Specs : skill `dino-images-lunii/` + brief GPT « fond noir d'emblée, pas fond clair à inverser ». Critère done : PNG 320×240 16 gris validés Papa Yann, sombre natif.
- **Charte INDEX.md mise à jour** : `studio/dino/content/lunii/INDEX.md` corrections lignes 9, 33 (« fond gris clair » → « fond noir natif », « inversion » → « natif »).
- **Décision gravée** : `decisions.md` entrée datée 2026-06-17 (suite) clarifiée contexte + raison + impact EP-D17.
- **Figée confirmée** : `figees/encyclopedie.md` § IMAGES LUNII déjà correcte (fond noir/sujet blanc), juste besoin de clarifier prompts GPT dès la conception.

**État au reboot :**
- ✅ **Décision clarifiée** : fond noir natif (pas inversion)
- ✅ **Ticket EP-D17 en backlog** : régénérer 10 images
- ✅ **Charte INDEX mise à jour**
- **À faire** : lancer skill `dino-images-lunii/` avec brief « fond noir d'emblée »

## 2026-06-17 (suite 2) — Inversion charte images Lunii : fond noir + sujet blanc (validée Papa Yann)

**Fait :**
- **Décision inversion visuelle appliquée** : charte images Lunii passe de « fond gris clair UNI » → « **INVERSÉ : fond NOIR, sujet BLANC** ». Meilleur rendu écran Lunii (sujet brille sur noir, vide devient logiquement noir).
- **Processus production :** génération toujours sur fond clair via ChatGPT (zéro coût, sans rappeler GPT) → conversion pipeline to-lunii.sh inverse automatiquement en sortie (fond noir + trait blanc, posterise 16 gris, letterbox noir).
- **9 emblèmes + 1 couverture re-dérivés** depuis sources HD (gratuit, pas de coût GPT) et remplacés dans `studio/dino/content/lunii/familles/` + `cover/`.
- **Règle figée mise à jour** : `figees/encyclopedie.md` § « IMAGES LUNII » modifiée, titre complété « (FIGÉ 2026-06-17, inversé 2026-06-17) ».
- **Décision gravée** : entrée `decisions.md` datée 2026-06-17 (suite) + texte complet raison/impact.

**État au reboot :**
- ✅ **Charte images Lunii inversée et gravée**
- ✅ **9 emblèmes + couverture remplacés (fond noir/sujet blanc)**
- ✅ **Skill `dino-images-lunii/` maintenu à jour (to-lunii.sh assure conversion)**
- **Packs Lunii prêts pour composition finale** (images finales + 51 MP3 V3 bloc)

## 2026-06-17 — Skill global « Dino Images Lunii » + 9 Emblèmes de familles validés

**Fait :**
- **Création skill global `~/.claude/skills/dino-images-lunii/`** : pipeline prouvé pour générer images Lunii. Contient : SKILL.md (doc) · EMBLEMES.md (charte + mapping 9 familles) · 3 scripts (launch-brave.ps1, gpt-gen.mjs, to-lunii.sh) · image de référence figée (Théropodes V3 PNG 320×240). Workflow : ChatGPT logué via Brave + Playwright CDP 9222 → conversion ffmpeg format Lunii (320×240, 16 gris, fond gris clair UNI, sans alpha → BMP RLE4 STUdio).
- **9 emblèmes de familles + 1 couverture produits & validés Papa Yann**. Rangés `studio/dino/content/lunii/` : familles/ (PNG finaux) · _sources-hd/ (sources HD couleur) · INDEX.md (mapping). Mapping : 01 Théropodes (griffures+viande+pattes) · 02 Sauropodes (cou+feuille) · 03 Thyréophores (plaques+massue) · 04 Cératopsiens (tête ornée+cornes+collerette) · 05 Ornithopodes (crête Parasaurolophus+bec+main Iguanodon pouce-poignard) · 06 Dromæosaures (patte emplumée+griffe-faucille+griffures) · 07 Ptérosaures (ailes déployées) · 08 Énaliosaures (cou+nageoire vagues) · 09 Avant les dinos (Dimétrodon à voile). Couverture = scène groupe 4:3 « toutes les familles ».
- **Charte de style figée (style C)** : dessin BD contour net + ombrage gris simple, **fond gris clair UNI** (jamais de cercle/médaillon/cadre autour), emblème-CONCEPT (signature famille, pas portrait dino-star), centré, sans texte. Réf = Théropodes V3.
- **2 règles figées nouvelles gravées** : ✅ **Griffures = prédateurs uniquement** (Théropodes, Dromæosaures) ; jamais sur herbivore. ✅ **Piège ChatGPT anti-cadre** : ajoute souvent médaillon → exiger « fond gris uni, SANS cadre/cercle ».
- **Format Lunii fixé** : 320×240, 16 niveaux gris, sans alpha. Couverture = 4:3 (sinon letterbox).
- **Specs par dino précis** → lire `studio/dino/content/sources/fiches/_FICHES-DINOS-GROKIPEDIA.md` (source vérité, ne pas réinventer).

**Décidé :**
- Skill global =  source de vérité pipeline Lunii (réutilisable dans d'autres projets).
- Emblèmes figés = réutilisables comme vignettes menu / cartes / décoratives du site future. Non déployées site/ pour l'instant (composants Lunii seuls).
- Prochaine étape : intégrer images dans packs Lunii (ex « Famille Théropodes » avec images+audio).

**État au reboot :**
- ✅ **Skill `dino-images-lunii/` en place et documenté**
- ✅ **9 emblèmes + couverture en `studio/dino/content/lunii/`**
- ✅ **2 règles images figées gravées**
- 📍 Étape suivante : création packs complets « famille + récit » (blend images + 51 MP3 V3)

## 2026-06-15 (suite 3 — PRODUCTION AUDIO V3 FINALISÉE — 51 DINOS, 255 MP3)

**Fait :**
- **Pipeline production créé et validé** : `studio/dino/content/scripts/audio/_md2json-v3.cjs` (lit 7 scripts V3, dérive id depuis nom latin titre, génère 204 segments JSON `text-to-dialogue` dans `scripts-audio/V3/json/`). Robuste CRLF/LF.
- **Batch production audio complète** : MCP `studio_audiobook_from_segments_v2_dialogue` (eleven_v3, voice_ids narrateur_h + wex via voice-map), loudnorm ffmpeg post-prod. **51 dinos × 5 blocs = 255 MP3** générés → `site/audio/dinos/` (durées : 15-28 s/bloc, recap 80-90 s). Pilote Tricératops validé en premier (15:18 → 15:45 UTC), puis batch 50 autres en 6 vagues.
- **2 nouveaux dinos câblés** dans `DINO_AUDIO` (dev-dinos.html) : **patagotitan** (nouveau dino data 2026-06-15, Patagotitan 35 m sauropode) · **ichthyosaurus** (dinos-data.js entrée créée, ichthyosaurus communis reptile marin). Tous les 51 dinos maintenant en `DINO_AUDIO` avec clé 'V3'.
- **Badge déploiement** : `DINO_AUDIO_VERSION` en 'V3' visible sur le bouton violet audio (tous les 51). Déploiement GitHub Pages pousse automatiquement (commit 59e55169).
- **Test Chromium final** : 51 dinos, tous avec audio, tous V3 ✅, patagotitan + ichthyosaurus chargent, 0 erreur JS, `DINOS.length === 51` ✅.
- **Budget ElevenLabs** : tenu dans les limites. Restant 34 321 / 122 630 chars (reset ~9 juillet). Pas de rachat nécessaire.
- **REX qualité agent batch** : sous-agent narration-audio a produit un tableau récapitulatif avec NOMS dinos hallucés (argentinosaurus, styracosaurus, supersaurus, etc.) mais vérification disque réelle confirme les 51 BONS dinos avec 5 MP3 chacun, générés aujourd'hui ~15:xx UTC, 0 manquant, 0 parasite. **Leçon L-D14 gravée** : toujours vérifier les claims agent batch sur disque (git/ls), ne pas croire au tableau récap.

**Bloquants résolus :**
- ✅ **EP-D04 (V2 inachevée)** → RÉSOLU : tout l'audio est en V3 synchronisé avec dinos-data.js corrigé 2026-06-15 (fact-check paléo appliqué).
- ✅ **EP-D05 (désync data)** → RÉSOLU : idem, tous les 51 MP3 en V3.

**Question tranchée :**
- ✅ **Q-DINO-11** (Liopleurodon poids 5t vs 1,8t débat scientifique) → **TRANCHÉ** : Papa Yann « on garde 5t, on s'en tape », comparaison script « 2 hippos » inchangée. Valeur haute documentée acceptée.

**État au reboot :**
- **51 dinos × 5 blocs = 255 MP3** générés, déployés, testés ✅
- **DINO_AUDIO V3 complet**, tous les dinos câblés
- **EP-D04/D05 RÉSOLUS** (remplacés par V3 complète)
- **EP-ARCH-01/D16 restent ouverts** (archivage session relecture + indexation factchecks)
- **Pôle DINO audio = PRODUCTION FINALE ATTEINTE**

## 2026-06-15 (suite 2) — FACT-CHECK PALÉO APPLIQUÉ + ARCHIVAGE PLANIFIÉ

**Fait :**
- **Fact-check paléontologue complet** : 51 fiches audio V3 + 3 nouveaux dinos passés au crible scientifique (Wikipedia EN source, Grokipedia 403). **Verdict : 43 ✅ / 6 ⚠️ / 4 🔴**.
- **CORRECTIONS PALÉO APPLIQUÉES** (Papa Yann a dit "corrige tout") :
  - 🔴 **Cryolophosaure** : « forêt tropicale chaude » FAUX (climat Antarctique Jurassique = tempéré 17°C doux) → script BLOC A/C corrigé « forêts, il faisait doux ». Date 194→190 Ma alignée dinos-data.js.
  - 🔴 **Centrosaure** : poids 3 t hors tolérance 10% vs Gregory Paul 2010 (2,5 t) → dinos-data.js ajusté 2,5 t. _compPoids mise à jour, « 2 rhinos » conservé comparaison.
  - 🔴 **Archéoptéryx** : « l'ancêtre de TOUS les oiseaux » faux (Anchiornis + avialiens plus anciens) → BLOC D corrigé « l'un des ancêtres ».
  - 🔴 **Dimétrodon** : voile « 1 m 50 » surestimé (D. grandis ~1-1,2 m) → BLOC B corrigé « un mètre ».
  - ⚠️ **Patagotitan** : hauteur « 12 m » OK mais manque précision « cou dressé » → BLOC B ajout « cou levé vers ciel, comme 4 étages ».
  - ⚠️ **Brachiosaure gastrolithes** : hypothèse débattue, pas fait établi → BLOC D changé « Certains savants pensent que… ».
  - ⚠️ **Protocératops** : « ancêtre des Tricératops » = groupe-frère pas ancêtre direct → BLOC A corrigé « l'un des tout premiers dinos à cornes, cousin lointain ».
  - ⚠️ **Quetzalcoatlus régime** : « insectes + crustacés » moins précis qu'actuel consensus (petits animaux sol, lézards) → BLOC C neutralisé « comme une cigogne géante ».
- **POINT OUVERT LAISSÉ** : Liopleurodon poids 5 t (data + script « 2 hippos ») vs Wikipedia ~1,8 t — débat 1,8-5 t selon méthode. NON corrigé (changerait « 2 hippos » → « 1 rhino », gros impact récit). **Q-DINO-11 nouvelles ouverte** : Papa Yann décide.
- **VÉRIFS FINALES** : dinos-data.js JS valide (`node --check`), count 51 ✅, grep-interdits 0 (max/doudou/peluche/nounours/regarde/réf-adulte/tropical), Tritri = 3 fiches OK co-localisées Crétacé.
- **CRÉDITS EL** : 52 828 / 122 630 chars utilisés (~69 800 dispo, reset ~9 juillet). Suffisant batch 51 MP3.
- **AUDIT ARCHIVISTE** (dino-archiviste constat) : pas fusion urgente fichiers (phases distinctes), 2 trous index notés : relectures V3+factcheck pas content/INDEX.md ; scripts-audio/ sans INDEX global. **RECO ARCHIVAGE** : 8 fichiers _RELECTURE + _FACTCHECK V3 vers `_archive/sessions/2026-06-15-relecture-v3/` APRÈS clôture (pas avant). **Inventaire factchecks existants** : `sources/fiches/_FICHES-DINOS-GROKIPEDIA.md` (référentiel durable), `_DATACHECK-GROKIPEDIA-2026-06.md` (snapshot appliqué), `_FACTCHECK-9-CERATOPSIENS.md` (table vérité 2026-05-22).

**État au reboot :**
- 51 dinos fiches V3 = **CORPS FINAL VALIDÉ scientifiquement** avant prod audio
- Q-DINO-7/8/9/10 = TRANCHÉ/RÉSOLU · Q-DINO-11 = NOUVELLE (Liopleurodon poids)
- 2 tickets PMO créés : EP-ARCH-01 (archiver session relecture V3) + EP-D16 (créer scripts-audio/INDEX.md + indexer factchecks content/INDEX.md)
- 2 leçons : L-D13 (fact-check paléo = passe distincte ; un fait peut être daté/réfuté même si chiffre dans data)
- Corpus prêt MCP `studio_audiobook_from_segments_v2_dialogue` (feu vert production)

## 2026-06-15 (suite) — CORRECTIONS V3 APPLIQUÉES + 2 RÈGLES FIGÉES GRAVÉES

**Fait :**
- **EP-D13 (bloquants) FAIT** : typos corrigées (« cœur alone » → « à lui seul », « un torpille » → « une torpille », accents ENORME/FENETRES) ; échelles recalculées (Shonisaure 2 m « panier basket »→« porte » via _compLong ; 5 autres dinos comparaisons RATP-doublées corrigées via fonctions canoniques) ; poids Tricé/Torosaure recalés (_compPoids) ; 3 dinos ajoutés dinos-data.js (Patagotitan, Centrosaure, Ichthyosaurus communis) avec chiffres Grokipedia. Count 48→**51**. INVARIANTS MAJ.
- **EP-D14 (Tritri) FAIT** : Q-DINO-7 = OUI tranché → 3 touches légères injectées ceratopsiens.md (Tricé bloc A « C'est Tritri », Tricé bloc C « Tritri se défendait », Toro bloc A « cousin de Tritri »), fluides via Wex sans 4e mur. Aide Kimi CLI (gratuit).
- **EP-D15 (patterns craft) FAIT** : « réfléchissait à deux fois » réduit 5→1 occurrence (gardée Pentacé, 3 variantes ailleurs) ; réfs adultes RETIRÉES (Elvis, Ferrari, Jurassic Park, vroum) → images concrètes enfant. Rédaction Kimi.
- **2 RÈGLES FIGÉES gravées** (Papa Yann 2026-06-15) dans `figees/encyclopedie.md` (déjà en place) : 🔒 **PAS de référence adulte** (chanteur/marque/film/onomatopée) — image enfant à hauteur. 🔒 **PRÉDATION vraie, jamais gore** (manger/chasser/se défendre = normal, on le dit ; images physiques OK mais sans s'attarder ; 0 sang/torture/agonie).
- **Grep-interdits final PASSÉ** : 0 max/doudou/peluche/nounours/« bus » hors échelle restants sur 7 scripts. Textes figés audio V3.

**État au reboot :**
- 51 dinos fiches V3 = CORPS FINAL avant prod audio
- All Q-DINO-7/8/9/10 = TRANCHÉ/RÉSOLU
- 2 leçons gravées : L-D10 (Tritri responsabilité narrative) + L-D11 (bloquants pré-audio)
- Corpus prêt MCP `studio_audiobook_from_segments_v2_dialogue`

## 2026-06-15 — RELECTURE EXTERNE V3 (4 étapes, 8 livrables, 51 fiches)

**Fait :**
- **Relecture complète corpus V3** lancée par Papa Yann — 4 étapes (dino-conseiller FACTUEL/ÉCHELLE + narration-conseiller CRAFT + 2 lecteurs témoin enfants + 4 dyades parent-enfant).
- **8 livrables produits** (studio/dino/content/scripts-audio/V3/) : _RELECTURE-dino-conseiller.md (94 pages) · _RELECTURE-narration-conseiller.md (25 pages) · _RELECTURE-lecteur-G-A1.md (enfant 4 ans) · _RELECTURE-lecteur-F-A2.md (enfant 5 ans) · _RELECTURE-dyade-DPG-A.md (papa+garçon 4 ans) · _RELECTURE-dyade-DMF-A.md (maman+fille 4 ans) + 2 dyades âgées 7-8 ans (à lire séparé).
- **Findings majeurs gravés** (cf sections ci-dessous).

**BLOQUANTS PRIORITÉ ROUGE (avant prod audio)** :
- 🔴 **Tritri ABSENT** : running gag Wex totalement manquant des 51 fiches, même Tricératops traité en dino lambda → alerte Fig1
- 🔴 **3 fautes typo audio** : « cœur alone » (Titanosaure) / « un torpille » (Ichtyosaure) / accents ENORME/FENETRES
- 🔴 **3 dinos sans entrée dinos-data.js** : Titanosaure/Patagotitan · Centrosaure · Ichtyosaure → trou source
- 🔴 **Shonisaure hauteur 2 m comparée "panier de basket" (3,05 m)** = 52 % écart, dépassant tolérance 10 %

**PRIORITÉ HAUTE (avant prod)** :
- 🟡 **Poids Tricératops/Torosaure** : scripts disent « éléphant »/« 1 hippo » vs data _compPoids donne « 3 hippos » → divergence
- 🟡 **Patterns récurrents "bus de Paris" pour dinos 10 m** (5+ fiches) : dépasse tolérance 10 % vs bus RATP 12 m
- 🟡 **« dino-bus » (Edmontosaure)** : bus en narration (métaphore) vs règle figée (bus interdit hors échelle) → à trancher
- 🟡 **Passages sensibilité enfant** : T-Rex « os miettes » (signalé DMF-A) · Mosasaure saut (F-A2 inconfort) · Tarbosaure « corde-dino » (DMF-A tension)

**PRIORITÉ MOYENNE (polissage craft)** :
- 🟢 **Patterns clonés à doser** : « réfléchissait à deux fois » ×5 · bloc D « savants se trompent » ×5-6 · T-Rex prédateur omniprésent Crétacé
- 🟢 **Référence adulte non captée 4 ans** : Elvis (Cryolophosaure) · Ferrari (Gallimimus) · Jurassic Park (Deinonychus, Vélociraptor)

**État au reboot :**
- 8 fichiers relecture à jour sur disque
- Décision Tritri + Shonisaure + poids Tricé/Toro attendue Papa Yann
- Backlog complété : 7 tickets EP-D créés ou maj + 2 leçons L-D nouvelles
- Corpus sonore 51 fiches = BLOQUÉ en attente corrections ↔ déploiement

## 2026-06-12 — Vague 5 « Armure & Cornes » + questions Papa Yann

**Fait :**
- **5 dialogues audio Bloc A + Bloc B figés** (dino-conseiller) : Euoplocéphale · Kéntrosaure · Torosaure · Protocératops · Pachycéphalosaure. Livrable [`studio/dino/content/scripts-audio/_VAGUE-armure-cornes.md`](../content/scripts-audio/_VAGUE-armure-cornes.md).
- **Thématique** : chevaliers en armure / béliers / fossile combat (Protocératops/Vélociraptor 1971, Mongolie = fait vérifiable).
- **Comparaisons Bloc B** : sourcées **exactement** depuis `dinos-data.js` fonctions `_compLong`/`_compHaut`/`_compPoids` (aucune inventée).
- **Nouvelles règles détectées** : (1) terme savant "thyréophore" expliqué dans Bloc A Kéntrosaure ; (2) piège étymologique Torosaure signalé texte même ("toro" ≠ taureau ici) ; (3) théorie Torosaure = Tricératops adulte (débat Scanella & Horner 2010) présentée comme non résolu.
- **Grep interdits validé** : 0 max / 0 doudou / 0 peluche / 0 bus. ✅ propre.
- **Tailles chars** : 1552–1639 (tous dans fenêtre 1500-1900 OK).

**Questions Papa Yann (3 points douteux signalés en fin du livrable)** :
- **A** : Pachycéphalosaure crâne 25 cm (dinos-data.js) vs 22 cm (Grokipedia) ? Retenu 25 pour cohérence fiche.
- **B** : Torosaure = Tricératops adulte ? Niveau de nuance 4 ans validé ?
- **C** : Euoplocéphale ~1571 chars (légèrement sous cible). Étoffer si souhaite Papa Yann.

**Décidé :** dialogue format canon (2 voix narrateur_f/Wex, tags v3, loudnorm) — reste à générer audio après question Papa Yann (peut démarrer production immédiatement si réponses A/B OK).

**État au reboot :** textes figés en attente validation Papa Yann sur 3 points. Prêt pour pipeline `_md2json` + `text-to-dialogue` dès le feu vert.

## 2026-06-12 — Premier pack Lunii « Tritri le Tricératops »

**Fait :**
- **Nouveau canal de distribution** : pôle `studio/lunii/` créé (STUdio 0.4.2 + JDK 17 installés, doc complète `studio/lunii/README.md`). La Lunii de Max = **v2** (terrain sûr, validé Papa Yann).
- **Pack Tritri construit** : script rejouable [`studio/lunii/scripts/build-tritri-pack.mjs`](../../lunii/scripts/build-tritri-pack.mjs) — cover (image 320x240 + bloc nom) → récit complet (5 blocs site/audio/dinos/triceratops-*.mp3 concat + **loudnorm**, 44.1kHz mono, ≈4 min) → retour cover. UUIDs figés (rebuild stable). Zip déposé dans `~/.studio/library/`, **vérifié lu par l'API STUdio** (titre + vignette OK).
- Réutilise les MP3 ElevenLabs existants tels quels (zéro régénération, process audio respecté).

**Décidé :** packs Lunii = assemblage d'audio déjà canon, jamais de contenu neuf hors process. Prochain candidat : pack « Histoires de Wex » (001+002).

**État au reboot :** pack en bibliothèque STUdio locale, en attente du transfert USB par Papa Yann (Lunii branchée + Luniistore fermé → glisser-déposer).

## 2026-06-09 — Banque de silhouettes dino (assets/)

**Fait :**
- **9 planches SVG** (tracés monochromes, déposées inbox) extraites → **215 silhouettes PNG** noir/transparent, détourées, despeckle (préserve multi-parties : squelettes en traits, paires d'empreintes).
- **Rangé par famille** : `content/assets/silhouettes/<famille>/` — theropode 56 · trex 40 · sauropode 44 · stegosaure 17 · ankylosaure 8 · **ceratopsien 20 (Tritri 🦕)** · hadrosaure 12 · pterosaure 11 · divers 7 (non-dinos : plésiosaures, plantes, squelettes, empreintes).
- **Nommage traçable** `famille-sNNrRcC.png` (sheet/ligne/colonne). `_INDEX.md` + `manifest.json` (lecture machine, pioche par famille). SVG sources archivés `_sources/` + sortis de l'inbox.
- Pipeline rejouable : render Chromium (Playwright `studio/minijeux/tests`) → découpe grille → seuillage → bbox → despeckle.

**Décidé :** classement **famille = fiable**, **espèce = approximative** (à valider `dino-conseiller` avant usage pédagogique nommé). Spinosaures à dos voilé rangés sous `theropode/`.

**État au reboot :** banque visuelle dispo pour mini-jeux (`content/assets/silhouettes/`). 20 tricératops dispos pour Tritri. Aucun impact code déployé (site/ inchangé). content/INDEX.md MAJ (ligne `assets/`).

## 2026-06-08 — Réorg `studio/dino/content/` + features backlog

**Fait :**
- **Réorg content/** : 5 dossiers thématiques (sources/ data/ scripts/ scripts-audio/ inbox/), clarté par rôle. `__dirname` corrigés dans scripts. Régen-diff = non-régression prouvée.
- **Nouveau `data/racines.json`** : 69 racines grec/latin (généré depuis `sources/etymo/_ETYMO-RACINES-50.md` par `scripts/export/_etymo2racines.cjs`), réutilisable 3 features (Dico, Quiz, compares).
- **INDEX refondus** : hub `content/INDEX.md` + sous-INDEX sources/data/scripts. Refs MAJ studio/dino/INDEX.md + CLAUDE.md + rule dino.md.
- **Features backlog** : 5 tickets EP (Duel, Forces/faiblesses, Dico Latin/Grec, Quiz, Mini-jeu tri) — voir backlog.md.

**Décidé :** DEC-2026-06-08 réorg + flags A/B ouverts (canon périmé, brouillon 001-trex à confirmer suppression).

**État au reboot :** `studio/dino/content/` restructuré, clair et maintenable. Code non affecté (GitHub Pages identique). Prêt pour nouvelles features (data+racines.json disponibles pour consommation).

## 2026-06-03 — Refonte UI + audio + création du pôle

**Fait :**
- **UI dev-dinos** : familles en liste verticale (titres = noms scientifiques + surnom + origine grecque dite en entrant) ; intro familles courte (impact) ; onglet « Où il vivait » retiré ; « Ce qu'il mange » = 4 régimes alimentaires purs ; bouton audio fiche masqué si pas d'audio ; voyage = vignettes décoratives + indicateur d'avancement (reset session) ; ordre onglets : Familles (défaut) / Ce qu'il mange / Le voyage.
- **Familles** : « Volants & Marins » scindé → Ptérosaures + « Pas des dinosaures ! » ; Archaeoptéryx → Dromæosaures. 9 familles.
- **Audio** : 4 accroches menu en voix réelle (2-7 s) ; `recit-intro` régénéré sans « Max/doudou » ; Mosasaure « ptérosaure »→« reptile volant comme le Ptéranodon » + « bus géant »→« deux voitures ».
- **Process** : figée `encyclopedie.md` créée (Tritri, audio, UI) + hook figeage étendu (dev-dinos/dinos-data/audio/dino) + process militaire grep-interdits avant audio.
- **Pôle DINO** : créé (transverse). Contenu `game/docs/jeux/dino-encyclopedie/` → `dino/content/` ; figée → `dino/figees/encyclopedie.md`. Gouvernance pmo/ + 3 agents + rule path-scoped.

**Décidé :** voir `decisions.md` (pôle, Tritri, scission familles, régimes alimentaires, voix menus).

**État au reboot :** pôle DINO opérationnel. Code dans site/ (déployé). 50 dinos / 9 familles / 4 régimes. Tout commité + poussé (GitHub Pages).
