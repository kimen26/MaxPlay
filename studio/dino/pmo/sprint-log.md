# Sprint-log — Pôle DINO

> Journal des sessions (plus récent en haut). Tenu par `dino-pmo`.

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
