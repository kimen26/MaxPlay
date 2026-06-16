# Sprint-log — Pôle DINO

> Journal des sessions (plus récent en haut). Tenu par `dino-pmo`.

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
