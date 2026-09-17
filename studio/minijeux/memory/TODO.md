# TODO — Pôle JEU

> Tickets ouverts uniquement, 1 ligne + DoD par lane. Détail complet et tickets fermés : `archive/backlog-fermes-2026.md` (avant 2026-09-03) et `git log`. Rotation 2026-09-12 (HO-R02) : les tickets clos ont été condensés en capacités livrées dans `CHANGELOG.md`, le fait/l'obsolète (28 mj fantômes purgés le 2026-08-10) a été supprimé.
> Statuts : `[ ]` à faire · `[~]` en cours · `[!]` bloqué · `[?]` question ouverte pour Papa Yann.

## Lane — L'Armoire : nouvel accueil enfant (HO-MJ-12 assets + HO-MJ-13 page, 2026-09-15)

**Décision Papa Yann 2026-09-15** : « VIRE le menu actuel avec les perso qui bougent, ça a toujours été un échec, je ne veux plus le voir. » L'accueil devient une armoire en bois (fronton / grille de casiers / socle à tiroirs), structure en HTML/CSS, images GPT découpées en pièces répétables (`studio/minijeux/inbox/decoupe/`). Contrainte : **jamais d'ascenseur** sur ce menu, quel que soit le téléphone ; poids et perfs maximaux (tuiles/pattern qui se répètent).
**DoD** : `index.html` = armoire plein écran sans scroll de 320×568 à 1280×720, objets reliés aux jeux (mapping simple, aléatoire assumé), portes vertes, recette Papa Yann sur GitHub Pages.
**2026-09-18** : la lane repart sur HO-MJ-19 (v6). Les v2 à v5 ont échoué sur la même cause racine — chaque pièce rendue responsive séparément (D-027, L-138).

- [~] HO-MJ-12 — découpe des pièces (`site/img/armoire/*.webp` ≤ 350 Ko, script `tools/armoire-decoupe.py`, planche-contact)
- [x] HO-MJ-13 — page armoire (v1 en ligne 2026-09-15, commit b17b525e) (`armoire.js` / `armoire.css`, suppression `mur-scene.js`, élagage `mur.js`/`mur.css`, spec 7 viewports « jamais d'ascenseur », SW precache)
- [ ] Après recette : brancher la chaîne 2★ (`repaireState`) sur les casiers ou l'abandonner explicitement ; décider si les objets tournent au hasard à chaque chargement (v1) ou restent fixes
- [ ] Objet non placé : `obj-dino.webp` (mascotte) — à réserver pour l'écran dino (étagère encyclo, voir `studio/dino/memory/TODO.md`). `obj-livres-jeux.webp` est posé depuis HO-MJ-19 (tiroir droit).
- [x] Portes et lumière : réglés par HO-MJ-19 (portes en rotation 3D CSS à tous les écrans, halo en `radial-gradient`).
- [ ] Spec Mur v2 (`docs/specs/2026-07-29-mur-v2-la-vallee.md`) : à marquer REMPLACÉE par l'armoire (pas supprimée, archive), §9 notes techniques périmées
- [x] HO-MJ-14 — Armoire v2 « trois zones » (livrée 2026-09-15, recette PY à faire sur le P30 Pro) sur le modèle de `inbox/decoupe/…00_25_01.png` (décision PY 2026-09-15 après la v1) : vitrine haute à 2 étagères (Dinos, Monde, Œufs, Album) avec portes ouvertes, casiers de jeux au milieu, compartiment bas à portes avec 2 tiroirs décoratifs. Marges de pièce 3-5 % (mur + tapis CSS), safe-area, avatar derrière le fronton mordu à 15 %, juste le prénom en haut. « L'important c'est le visuel de l'armoire : propre, modulable, modulaire, léger. »
- [!] HO-MJ-14 REJETÉE visuellement par PY 2026-09-16 (« t'en es très loin, pas fluide ») : cause = tuiles venues d'images différentes + proportions de la v1. Leçon : maquette statique validée AVANT le code (L-à graver en clôture).
- [x] HO-MJ-15 — Carcasse v3 en tuiles (livrée 2026-09-17, recette PY sur P30 Pro à faire ; reliquats : avatar posé au-dessus de l'arche plutôt que mordu, tiroirs décoratifs, ménage des tuiles v1 inutilisées) découpées dans LA référence (`tools/armoire-compose.py` = spec, maquettes validées par PY le 2026-09-17 : panneaux latéraux continus, étagères DANS l'armoire, portes entières en calque, tiroirs à fleur, sans feuille, prénom seul, étoiles hors de l'arche). Objets = calque au-dessus. ~65 Ko de tuiles.
- [!] HO-MJ-15 recettée par PY le 2026-09-17 : vingt points (corps trop étroit et trop vertical, raccords visibles entre tuiles = « effet puzzle », côtés « mécaniques », portes plates, fronton mince, planches trop fines, tiroirs trop petits, socle disparu, pieds perdus, bois incohérent, lumière trop dure). Architecture imposée : kit de sprites (fond, fronton, 1 planche, 1 montant, 1 porte, 1 tiroir, 1 spot) + ombres/halos/profondeur en CSS.
- [x] HO-MJ-17 (v4) et HO-MJ-18 (v5) ABANDONNÉS 2026-09-18 : le prototype v4 n'a jamais été validé, la v5 (kit de 10 images GPT) est sortie cassée. Briefs, rapports, captures, sprites et outils supprimés — pas archivés, ils ne documentaient qu'une impasse.
- [x] HO-MJ-19 — **Armoire v6, livrée 2026-09-18** : repère de design fixe 911 × 1480, scène mise à l'échelle d'un bloc par une ligne de CSS, zéro handler de resize (D-027, L-138). 3 sprites (`img/armoire/v6/`), halo des spots en CSS, portes en `rotateY` 3D à 116°, 17 cases (12 jeux derrière les portes + Dinos/Monde/Œufs en niche + Album et un 13e jeu dans les tiroirs). `armoire.spec.mjs` vert sur 8 viewports, dont un test de proportions identiques entre 320 px et 1280 px. **Recette PY sur le P30 Pro à faire.**
- [x] HO-MJ-19 passe 2 (2026-09-18, recette du designer) : plancher tactile sorti de la géométrie (calque `.tap`, L-140), vantaux ramenés sous 90° avec charnière sur le montant extérieur (L-141), plus d'ouverture automatique, 12 jeux, tiroirs nus qui sont leurs propres boutons, masse visuelle des objets égalisée par la mesure (`tools/armoire-objets.py`), étiquettes en bois, objets posés sur les planches, avatar sans médaillon (D-028).
- [ ] HO-MJ-16 (après recette HO-MJ-15) — Globe animé déposé par PY (`inbox/globe-webapp-animation/`, web component `<animated-globe>`, 12 frames webp 640 px = 740 Ko, trop lourd tel quel) : réduire les frames à 256 px (~150 Ko), au tap sur le globe de l'armoire = 1 tour (11 frames, 9 fps) PUIS navigation vers le Voyage. Idle : léger flottement seulement, jamais de tour automatique (le README de PY le dit lui-même : « évite que l'armoire entière bouge »).
- [!] Volcan animé : **le fichier `inbox/tSg9A.webp` a été supprimé par erreur le 2026-09-18** pendant le ménage HO-MJ-19 (pris pour un reliquat de test). Papa Yann doit le redéposer s'il veut la piste ; sinon on garde le volcan statique `obj-volcan.webp`.
- [x] inbox : les 20 PNG racine et `decoupe/` supprimés le 2026-09-18 (consommés par HO-MJ-12, plus rien à en tirer). Les trois seules images qui comptaient sont promues en références stables : `docs/refs/armoire/ref-ouverte.png`, `ref-fermee.png`, `ref-casiers-12.png`.

## Lane — Mur piloté par le catalogue : validations Papa Yann (HO-R09, 2026-09-12)

- [ ] Zonage des 9 jeux réapparus au Mur (mj-06, 09, 13c, 35, 37, 38, 39, 40, 42) : suivi la catégorie catalogue, en fin de chaîne de zone ; à challenger (ex. mj-42 chez Troudi plutôt que Volta ?).
- [ ] Vignettes CSS/SVG des 9 jeux : dessinées a minima, non revues à l'œil au-delà d'une capture 360 px.
- [ ] `check-mj-coherence` vérifie la présence d'une entrée référentiel par jeu, pas la complétude des clés : chantier séparé si voulu.
- [ ] Bouton retour unifié : 23 mj gardent un `<a href="index.html">` en dur parce que `back-button.js` ne matche que `.back`/`#hdr` (HO-R10) ; brief à ouvrir pour poser `class="back"` sur ces 23 et retirer les liens.

## Lane — Coloriage mj-32 : reste ouvert

**DoD** : stickers posables livrés et branchés, recette faite sur le vrai P30 Pro de Max, plus aucune spec instable connue.

- [ ] STICKERS de plantes posables au tap dans le dessin (`{type:'sticker'}` dans l'historique) — idée PY 2026-09-08, jamais commencée
- [ ] Recette sur le VRAI P30 Pro : tout le chantier coloriage n'a été vu qu'en navigateur (360/320 px), jamais sur l'appareil de Max
- [ ] Asset manquant : `site/img/dinos/paleoart/Scelidosaurus_coloriage.webp` — bloqué sur Papa Yann (Chromium dédié port 9225 connecté à un compte tiers)
- [ ] Dette perf : remplissage du fond entier ~400 ms (calcul JS pur) — à traiter si le 1er tap paraît lent sur P30 Pro
- [ ] Patcher les linearts à brèche côté pôle dino (Cryolophosaure #6389) pour pouvoir baisser le rayon anti-fuite
- [ ] Dette assumée (pas de correction spéculative) : `waitForTimeout` fixe dans une boucle de progression, présent dans ~12 specs (mj-09, 30, 31, 48-54, 56) — à corriger au cas par cas si l'un tombe (méthode : L-133 dans LESSONS.md, attendre le fait pas la durée)

## Lane — EPIC i18n mini-jeux (décision PY 2026-09-05 : tout traduire — règles, menus, actions)

**DoD** : 36/36 jeux jouables en fr/en/es-es/pt-br, consignes parlées EN en MP3 (pas seulement repli TTS).

- [!] **VOIX-MJ-EN-AUDIO** — Générer les 81 MP3 anglais des consignes (voix maison STS) dans `site/sounds/voix/en/…`, ≈ 23k crédits EL. Outillage prêt : `node studio/dino/content/scripts/audio/_md2json-hors-fiche.cjs en studio/minijeux/i18n/en/scripts-voix.md --out=studio/minijeux/i18n/en/json`
- [~] **LANG-MINI-JEUX** — Sélecteur de langue global mais seuls 8/36 jeux chargeaient `js/lang.js` à l'origine ; absorbé par l'EPIC i18n (33/36 en anglais aujourd'hui), reste es-es/pt-br des chaînes de jeu (hors panneau règle, déjà livré) et audio es/pt (repli TTS navigateur pour l'instant)
- [ ] Contenu FR conservé par décision PY 2026-09-05 : mj-50/51/52/53 (lecture/phonétique, refonte péda par langue trop lourde pour l'instant)
- [ ] Données FR résiduelles signalées mais non traitées : `PALETTE[].name`, `getLineDisplayName()` de `data.js`

## Lane — Montée de niveau par compétence (EP-112)

**DoD** : les 13 figées restantes propagées OU explicitement abandonnées après ressenti Max sur le pilote mj-04.

- [~] Pilote mj-04 livré (2026-07-29), propagation aux 13 autres figées attend validation ressenti Max
- [?] SPEC montée de niveau (défigeage `niveau = Stars+1`) attend 7 décisions Papa Yann (D1..D7) — détail `../docs/2026-07-28-spec-montee-niveau.md`

## Lane — Design System v1 : validations en attente Papa Yann (EP-079..083)

**DoD** : chaque question tranchée par Papa Yann, ticket fermé ou converti en chantier.

- [?] EP-079/080 — Specs mj-14 rouge préexistant (Stars.get=0) et exception design mj-08 — mj-01/mj-08 supprimés depuis (purge 2026-08-10), probablement caducs, à confirmer
- [?] EP-081/082/083 — finalStar cinematic mj-34/36/38/39, ambiances hardcodées (arbitrage L-094, à confirmer clos), bus-défilé header index — jamais explicitement clos

## Lane — Gouvernance figées / dette (EP-109/110/074/076)

**DoD** : chaque figée sourcée (phrase Papa Yann ou code), zéro figée inventée.

- [ ] EP-109 — 18 jeux du menu sans figée — à revérifier après la purge du 2026-08-10 (liste d'origine à recompter sur `site/js/catalog.js`)
- [ ] EP-110 — Famille « quiz legacy » (mj-13a/14/15/16 — mj-01 supprimé) : victoire score-% vs standard 3★, modernisation non urgente
- [!] EP-074 — Harnais Playwright mj-01/index obsolète : mj-01 supprimé depuis (purge 2026-08-10), ticket probablement caduc — à confirmer et clore
- [!] EP-076 — Revoir le process PMO figeage (checklist mini-audit) + appliquer aux figées ouvertes restantes, suite à l'incident L-072/L-073/L-074 (figées inventées 2026-07-05, déjà corrigées)

## Lane — Fusion bibliothèque savoir-faire (EP-101)

**DoD** : décision Papa Yann tranchée (fusionner mj-13a+mj-13c ou non).

- [?] EP-101 — Fusion F1 (mj-13a+mj-13c) remise à décision Papa Yann — friction refonte menu vs gains maintenance x2 long-terme

## Lane — MJ-45 dominos (EP-078)

**DoD** : brainstorm/design validé avant tout code.

- [ ] EP-078 — Chaîne de dominos (bout-à-bout même valeur) — priorité basse, pas de code avant retours terrain MJ-43/44/45

## Lane — Norme bouton règles + avatars (EP-072/073)

**DoD** : bouton (i) sur tous les MJ vivants, avatars chibi livrés ou abandonnés.

- [~] EP-073 — Composant bouton règles (i) `regle-info.js` — reste roll-out sur les MJ restants (vérifier lesquels après la purge 2026-08-10, plusieurs cibles d'origine ont été supprimées)
- [ ] EP-072 — Avatars chibi dinos × 3 humeurs (30 images) — pipeline ChatGPT Dinosaure XXL, jamais démarré

## Lane — Gouvernance process/qualité (EP-042/043)

**DoD** : script d'audit qui tourne en CI, zéro figée non sourcée.

- [ ] EP-042 — Check auto assets dans `run.mjs` (404 prévention prod, asset gitignoré mais référencé)
- [ ] EP-043 — Audit automatisé figées : chaque ligne 🔒 sourcée Papa Yann ou code (`check-figees.mjs`)

## Lane — Narration audio dinos (EP-039)

**DoD** : les 5 fiches phares en ping-pong Wex livrées, ou décision explicite de rester en TTS live.

- [~] Pilote Parasaurolophus V2 clôturé (2026-05-30), 22/60 dinos en audio EL premium — reste généraliser à 5 fiches phares + option compléter le reste (TTS live navigateur en attendant, non bloquant)

## Lane — Harnais de test (EP-038)

**DoD** : 1 spec Playwright par MJ actif.

- [~] Pilote livré 2026-05-16 validé Papa Yann — reste généraliser aux MJ actifs restants (vérifier la liste après purge 2026-08-10)

## Lane — Gabarit/encodage rétro-fit (EP-035/036/037)

**DoD** : les MJ concernés encore vivants sont conformes ; ceux purgés le 2026-08-10 sont retirés du ticket.

- [ ] EP-035/036/037 — Fix encoding UTF-8, gabarit header compact, figeage — cibles d'origine à recompter contre `site/js/catalog.js` (plusieurs jeux visés ont été supprimés depuis)

## Lane — Renouvellement thématique (EP-041/047)

**DoD** : décision Papa Yann sur la priorisation, dépend du retour Max.

- [?] EP-041 — Piste thème dino (tri-couleur/quiz/duel) pour lutter contre la lassitude bus — dépend retour Max sur prototype
- [?] EP-047 — Shortlist 7 candidats jeux addictifs (Simon, Block Blast, Tangram dino, Mahjong dino, MJ-18 Expert, Shisima, Picross) — priorisation Papa Yann à trancher

## Lane — Cloud/compte (EP-048/049/069/075)

**DoD** : parcours compte→sync recetté par Papa Yann en conditions réelles avant usage enfants.

- [ ] EP-048 — Recette réelle parcours compte→sync (login → partie → sync → récup profil autre appareil) — BLOQUANTE avant usage réel enfants
- [ ] EP-049 — Resend SMTP + `{{ .Token }}` dans template Magic Link (domaine custom)
- [~] EP-069/075 — Phase 1 cloud déployée, reste test e2e réel puis Phase 2 (codes cadeaux, voix premium, RGPD) + dettes Supabase (storage `mj32_galerie`, RLS tables 001, validation client)

## Lane — Voix/audio production (EP-050)

**DoD** : au moins 1 clip produit et validé.

- [ ] EP-050 — Production premiers clips voix (`voices-manifest.js` vide) — jamais démarré

## Lane — Retours Papa Yann 2026-09-08 (nid, œufs, MJ-28) : reste ouvert

**DoD** : EP-123 tranché (bug réel ou non), EP-128 statué.

- [!] EP-123 — Un MJ terminé n'a déclenché ni célébration ni écran de fin (Troodon/Spinosaure signalés) — 18 parties jouées en enquête (L-119), non reproduit, cause non identifiée : throttling CPU réel du P30 Pro et TTS réel jamais testés en headless
- [ ] EP-128 — mj-32 (atelier coloriage) n'appelle aucun `G.showEnd()` — choix assumé pour un atelier libre, mais à trancher explicitement : pas de Tracker, pas de capsule/œuf, pas d'écran replay

## Autres tickets isolés anciens (jamais avancés, statut à confirmer avec Papa Yann)

- [ ] EP-005 — Système de progression (flotte + carte) — jamais développé
- [ ] EP-026 — TTS ElevenLabs pré-générés (MP3 statiques noms de jeux) — reporté, speechSynthesis natif en fallback
