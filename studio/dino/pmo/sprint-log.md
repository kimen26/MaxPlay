# Sprint-log — Pôle DINO

> Journal des sessions (plus récent en haut). Tenu par `dino-pmo`.

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
