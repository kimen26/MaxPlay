# TODO — Pôle JEU

> Tickets ouverts uniquement, 1 ligne + DoD par lane. Détail complet et tickets fermés : `archive/backlog-fermes-2026.md` (avant 2026-09-03) et `git log`. Rotation 2026-09-12 (HO-R02) : les tickets clos ont été condensés en capacités livrées dans `CHANGELOG.md`, le fait/l'obsolète (28 mj fantômes purgés le 2026-08-10) a été supprimé.
> Revue 2026-09-25 (chaque ticket confronté au code) : fermés car faits — EP-109 (36/36 figées), EP-073 (`regle-info` via `mj-shell`), EP-072 (88 avatars), EP-042 (check 404 dans `run.mjs`), EP-038 (36/36 specs), EP-035/036/037 (0 mojibake), asset `Scelidosaurus_coloriage.webp`, bandeau REMPLACÉE de la spec Mur v2. Retirés car caducs — EP-079/080 (mj-01/08 supprimés), EP-078 (mj-43/44/45 supprimés), EP-050 (`voices-manifest.js` supprimé), EP-005 (remplacé par armoire + nid), EP-143 (écarts actés dans le dossier brainstorm), REC-D1 (doublon, suivi côté DINO).
> Vagues de correction 2026-09-25 (commits `970ec8b8` + suivant) : soldés REC-C1/C3/C4/C5/C7, REC-H1/H2/H3, REC-M1, HO-MJ-22 (cases dans l'armoire v8), HO-MJ-16 (globe animé), bouton retour unifié (23 jeux), EP-134 (`nid-e2e.spec` réécrit), EP-074, noms de lignes/accessoires traduits.
> Statuts : `[ ]` à faire · `[~]` en cours · `[!]` bloqué · `[?]` question ouverte pour Papa Yann.

## Lane — Recette complète FR/EN 2026-09-19 (rapport `memory/audits/2026-09-19-recette-complete.md`)

**DoD** : les 3 crashs corrigés + specs étendues jusqu'à la fin de partie ; l'EN ne montre plus de français à l'écran (victoire, menu, pages, 7 titres).

- [?] **REC-C2** — mj-40 tangram : figure 2 non chargée en recette transverse ; NON reproduit le 2026-09-25 avec un vrai drag Playwright (figures 1 et 2 jouées). À rejouer sur le P30 Pro si Papa Yann le revoit.
- [!] **REC-H4** — mj-31 : titre corrigé (retour à la ligne, `mp-theme.css`) ; reste `audio/dinos/en/periodes/` inexistant (13 × 404) — bloqué crédits ElevenLabs.
- [!] **REC-M2** — reste mj-55 MP3 consigne FR manquant — bloqué crédits ElevenLabs (mj-18, mj-39 et `mur-nid.spec` corrigés le 2026-09-25).

## Lane — L'Armoire : nouvel accueil enfant (HO-MJ-12 assets + HO-MJ-13 page, 2026-09-15)

**Décision Papa Yann 2026-09-15** : « VIRE le menu actuel avec les perso qui bougent, ça a toujours été un échec, je ne veux plus le voir. » L'accueil devient une armoire en bois (fronton / grille de casiers / socle à tiroirs), structure en HTML/CSS, images GPT découpées en pièces répétables (`studio/minijeux/inbox/decoupe/`). Contrainte : **jamais d'ascenseur** sur ce menu, quel que soit le téléphone ; poids et perfs maximaux (tuiles/pattern qui se répètent).
**DoD** : `index.html` = armoire plein écran sans scroll de 320×568 à 1280×720, objets reliés aux jeux (mapping simple, aléatoire assumé), portes vertes, recette Papa Yann sur GitHub Pages.
**2026-09-18** : la lane repart sur HO-MJ-19 (v6). Les v2 à v5 ont échoué sur la même cause racine — chaque pièce rendue responsive séparément (D-027, L-138).

- [~] HO-MJ-12 — découpe des pièces (`site/img/armoire/*.webp` ≤ 350 Ko, script `tools/armoire-decoupe.py`, planche-contact)
- [x] HO-MJ-13 — page armoire (v1 en ligne 2026-09-15, commit b17b525e) (`armoire.js` / `armoire.css`, suppression `mur-scene.js`, élagage `mur.js`/`mur.css`, spec 7 viewports « jamais d'ascenseur », SW precache)
- [ ] Recette Papa Yann sur P30 Pro de l'accueil en v8 (HO-MJ-22 livré 2026-09-25 : 15 cases + 2 tiroirs posés sur les planches du kit, globe qui fait un tour au tap puis ouvre l'encyclo).
- [ ] Specs autonomes (`armoire`, `mur-nid`, `nid-e2e`, `index`, `collection`, `armoire-meuble`, `i18n-dinos`) hors `run-all.mjs` : aucune n'est lancée automatiquement, c'est comme ça que `nid-e2e` est resté rouge sans alerte. Les brancher dans `npm run check` ou un `run-autonomes.mjs`.
- [ ] Après recette : brancher la chaîne 2★ (`repaireState`) sur les casiers ou l'abandonner explicitement ; décider si les objets tournent au hasard à chaque chargement (v1) ou restent fixes
- [ ] Objet non placé : `obj-dino.webp` (mascotte) — à réserver pour l'écran dino (étagère encyclo, voir `studio/dino/memory/TODO.md`). `obj-livres-jeux.webp` est posé depuis HO-MJ-19 (tiroir droit).
- [x] Portes et lumière : réglés par HO-MJ-19 (portes en rotation 3D CSS à tous les écrans, halo en `radial-gradient`).
- [x] HO-MJ-14 — Armoire v2 « trois zones » (livrée 2026-09-15, recette PY à faire sur le P30 Pro) sur le modèle de `inbox/decoupe/…00_25_01.png` (décision PY 2026-09-15 après la v1) : vitrine haute à 2 étagères (Dinos, Monde, Œufs, Album) avec portes ouvertes, casiers de jeux au milieu, compartiment bas à portes avec 2 tiroirs décoratifs. Marges de pièce 3-5 % (mur + tapis CSS), safe-area, avatar derrière le fronton mordu à 15 %, juste le prénom en haut. « L'important c'est le visuel de l'armoire : propre, modulable, modulaire, léger. »
- [!] HO-MJ-14 REJETÉE visuellement par PY 2026-09-16 (« t'en es très loin, pas fluide ») : cause = tuiles venues d'images différentes + proportions de la v1. Leçon : maquette statique validée AVANT le code (L-à graver en clôture).
- [x] HO-MJ-15 — Carcasse v3 en tuiles (livrée 2026-09-17, recette PY sur P30 Pro à faire ; reliquats : avatar posé au-dessus de l'arche plutôt que mordu, tiroirs décoratifs, ménage des tuiles v1 inutilisées) découpées dans LA référence (`tools/armoire-compose.py` = spec, maquettes validées par PY le 2026-09-17 : panneaux latéraux continus, étagères DANS l'armoire, portes entières en calque, tiroirs à fleur, sans feuille, prénom seul, étoiles hors de l'arche). Objets = calque au-dessus. ~65 Ko de tuiles.
- [!] HO-MJ-15 recettée par PY le 2026-09-17 : vingt points (corps trop étroit et trop vertical, raccords visibles entre tuiles = « effet puzzle », côtés « mécaniques », portes plates, fronton mince, planches trop fines, tiroirs trop petits, socle disparu, pieds perdus, bois incohérent, lumière trop dure). Architecture imposée : kit de sprites (fond, fronton, 1 planche, 1 montant, 1 porte, 1 tiroir, 1 spot) + ombres/halos/profondeur en CSS.
- [x] HO-MJ-17 (v4) et HO-MJ-18 (v5) ABANDONNÉS 2026-09-18 : le prototype v4 n'a jamais été validé, la v5 (kit de 10 images GPT) est sortie cassée. Briefs, rapports, captures, sprites et outils supprimés — pas archivés, ils ne documentaient qu'une impasse.
- [x] HO-MJ-19 — **Armoire v6, livrée 2026-09-18** : repère de design fixe 911 × 1480, scène mise à l'échelle d'un bloc par une ligne de CSS, zéro handler de resize (D-027, L-138). 3 sprites (`img/armoire/v6/`), halo des spots en CSS, portes en `rotateY` 3D à 116°, 17 cases (12 jeux derrière les portes + Dinos/Monde/Œufs en niche + Album et un 13e jeu dans les tiroirs). `armoire.spec.mjs` vert sur 8 viewports, dont un test de proportions identiques entre 320 px et 1280 px. **Recette PY sur le P30 Pro à faire.**
- [x] HO-MJ-19 passe 2 (2026-09-18, recette du designer) : plancher tactile sorti de la géométrie (calque `.tap`, L-140), vantaux ramenés sous 90° avec charnière sur le montant extérieur (L-141), plus d'ouverture automatique, 12 jeux, tiroirs nus qui sont leurs propres boutons, masse visuelle des objets égalisée par la mesure (`tools/armoire-objets.py`), étiquettes en bois, objets posés sur les planches, avatar sans médaillon (D-028).
- [x] HO-MJ-20 — **Armoire v8, kit découpé dans la référence, livrée 2026-09-19** (la v7 assemblée depuis les pièces GPT a été rejetée par PY le soir même : six défauts fondés, D-030/L-145 ; v8 = `ref-ouverte.png` au pixel, fermé = `ref-fermee.png` avec charnières ; passes 5-6 : vantaux ouverts entiers (bord extérieur mesuré sur toutes les colonnes), coins de carcasse reconstruits, charnières fermé/ouvert alignées par remappage, images versionnées `?v=` contre le cache (L-146) ; **VALIDÉE par PY le 2026-09-21** (« c'est bon ! et les étages sont bons aussi ») sur `dev-armoire.html` en ligne, passe 7 = gonds identiques fermé/ouvert ; passe 8 = montant entre les tiroirs + tiroirs qui se tirent au tap, demande PY 2026-09-21) (ouvert 2026-09-19, demande PY « fabrique cette armoire, déjà juste vide, ouvert/fermé, logique et modulable » à partir des 8 pièces GPT du 17/09 : carcasse vide, planche, montant, porte fermée, porte ouverte, tiroir, spot, halo). Meuble vide sur `site/dev-armoire.html`, composant `ArmoireMeuble` (config = données), repère 911 × 1480 conservé, `index.html` reste en v6 jusqu'à validation. Brief : `docs/handoffs/HO-MJ-20-armoire-v7-kit-modulaire.md`. Suite : HO-MJ-22 = y remettre les 15 cases + 2 tiroirs.
- [!] Volcan animé : **le fichier `inbox/tSg9A.webp` a été supprimé par erreur le 2026-09-18** pendant le ménage HO-MJ-19 (pris pour un reliquat de test). Papa Yann doit le redéposer s'il veut la piste ; sinon on garde le volcan statique `obj-volcan.webp`.
- [x] inbox : les 20 PNG racine et `decoupe/` supprimés le 2026-09-18 (consommés par HO-MJ-12, plus rien à en tirer). Les trois seules images qui comptaient sont promues en références stables : `docs/refs/armoire/ref-ouverte.png`, `ref-fermee.png`, `ref-casiers-12.png`.

## Lane — Mur piloté par le catalogue : validations Papa Yann (HO-R09, 2026-09-12)

- [ ] Zonage des 9 jeux réapparus au Mur (mj-06, 09, 13c, 35, 37, 38, 39, 40, 42) : suivi la catégorie catalogue, en fin de chaîne de zone ; à challenger (ex. mj-42 chez Troudi plutôt que Volta ?).
- [ ] Vignettes CSS/SVG des 9 jeux : dessinées a minima, non revues à l'œil au-delà d'une capture 360 px.
- [ ] `check-mj-coherence` vérifie la présence d'une entrée référentiel par jeu, pas la complétude des clés : chantier séparé si voulu.

## Lane — Coloriage mj-32 : reste ouvert

**DoD** : stickers posables livrés et branchés, recette faite sur le vrai P30 Pro de Max, plus aucune spec instable connue.

- [ ] STICKERS de plantes posables au tap dans le dessin (`{type:'sticker'}` dans l'historique) — idée PY 2026-09-08, jamais commencée
- [ ] Recette sur le VRAI P30 Pro : tout le chantier coloriage n'a été vu qu'en navigateur (360/320 px), jamais sur l'appareil de Max
- [ ] Dette perf : remplissage du fond entier ~400 ms (calcul JS pur) — à traiter si le 1er tap paraît lent sur P30 Pro
- [ ] Patcher les linearts à brèche côté pôle dino (Cryolophosaure #6389) pour pouvoir baisser le rayon anti-fuite
- [ ] Dette assumée (pas de correction spéculative ; `run-all` 36/36 vert deux fois de suite le 2026-09-25) : `waitForTimeout` fixe dans une boucle de progression, présent dans 47 fichiers de `studio/minijeux/tests/` (recompté 2026-09-25, dont mj-09, 30, 31, 48-54, 56) — à corriger au cas par cas si l'un tombe (méthode : L-133 dans LESSONS.md, attendre le fait pas la durée)

## Lane — EPIC i18n mini-jeux (décision PY 2026-09-05 : tout traduire — règles, menus, actions)

**DoD** : 36/36 jeux jouables en fr/en/es-es/pt-br, consignes parlées EN en MP3 (pas seulement repli TTS).

- [!] **VOIX-MJ-EN-AUDIO** — Générer les 81 MP3 anglais des consignes (voix maison STS) dans `site/sounds/voix/en/…`, ≈ 23k crédits EL (3/81 présents au 2026-09-25, bloqué crédits). Outillage prêt : `node studio/dino/content/scripts/audio/_md2json-hors-fiche.cjs en studio/minijeux/i18n/en/scripts-voix.md --out=studio/minijeux/i18n/en/json`
- [~] **LANG-MINI-JEUX** — `lang.js` est désormais injecté par `mj-shell.js` (plus aucun `mj-*.html` ne le charge en dur, cf. REC-C7 pour l'ordre de chargement) ; reste es-es/pt-br des chaînes de jeu (hors panneau règle, déjà livré) et audio es/pt (repli TTS navigateur pour l'instant)
- [ ] Contenu FR conservé par décision PY 2026-09-05 : mj-50/51/52/53 (lecture/phonétique, refonte péda par langue trop lourde pour l'instant)

## Lane — Montée de niveau par compétence (EP-112)

**DoD** : les 13 figées restantes propagées OU explicitement abandonnées après ressenti Max sur le pilote mj-04.

- [~] Pilote mj-04 livré (2026-07-29), propagation aux 13 autres figées attend validation ressenti Max
- [?] SPEC montée de niveau (défigeage `niveau = Stars+1`) attend 7 décisions Papa Yann (D1..D7) — détail `../docs/_archive/2026-07/2026-07-28-spec-montee-niveau.md` (archivée par HO-R01 alors que les décisions restent ouvertes)

## Lane — Design System v1 : validations en attente Papa Yann (EP-079..083)

**DoD** : chaque question tranchée par Papa Yann, ticket fermé ou converti en chantier.

- [?] EP-081/082/083 — finalStar cinematic mj-34/38/39 (mj-36 supprimé), ambiances hardcodées (arbitrage L-094, à confirmer clos), bus-défilé header index — jamais explicitement clos

## Lane — Gouvernance figées / dette (EP-109/110/074/076)

**DoD** : chaque figée sourcée (phrase Papa Yann ou code), zéro figée inventée.

- [ ] EP-110 — Famille « quiz legacy » (mj-13a/14/15 — mj-01 et mj-16 supprimés) : victoire score-% vs standard 3★, modernisation non urgente
- [!] EP-076 — Revoir le process PMO figeage (checklist mini-audit) + appliquer aux figées ouvertes restantes, suite à l'incident L-072/L-073/L-074 (figées inventées 2026-07-05, déjà corrigées)

## Lane — Fusion bibliothèque savoir-faire (EP-101)

**DoD** : décision Papa Yann tranchée (fusionner mj-13a+mj-13c ou non).

- [?] EP-101 — Fusion F1 (mj-13a+mj-13c) remise à décision Papa Yann — friction refonte menu vs gains maintenance x2 long-terme

## Lane — Gouvernance process/qualité (EP-043)

**DoD** : zéro figée non sourcée, vérifié par script.

- [~] EP-043 — `check-mj-coherence.mjs` signale (avertissement) les lignes 🔒 sans source : 319/620 au 2026-09-25. Reste : sourcer ou retirer ces lignes figée par figée (Papa Yann), puis passer le contrôle en bloquant.

## Lane — Narration audio dinos (EP-039)

**DoD** : les 5 fiches phares en ping-pong Wex livrées, ou décision explicite de rester en TTS live.

- [~] Pilote Parasaurolophus V2 clôturé (2026-05-30), 22/60 dinos en audio EL premium — reste généraliser à 5 fiches phares + option compléter le reste (TTS live navigateur en attendant, non bloquant)

## Lane — Renouvellement thématique (EP-041/047)

**DoD** : décision Papa Yann sur la priorisation, dépend du retour Max.

- [?] EP-041 — Piste thème dino (tri-couleur/quiz/duel) pour lutter contre la lassitude bus — dépend retour Max sur prototype
- [?] EP-047 — Shortlist 7 candidats jeux addictifs (Simon, Block Blast, Tangram dino, Mahjong dino, MJ-18 Expert, Shisima, Picross) — priorisation Papa Yann à trancher

## Lane — Cloud/compte (EP-048/049/069/075)

**DoD** : parcours compte→sync recetté par Papa Yann en conditions réelles avant usage enfants.

- [ ] EP-048 — Recette réelle parcours compte→sync (login → partie → sync → récup profil autre appareil) — BLOQUANTE avant usage réel enfants
- [ ] EP-049 — Resend SMTP + `{{ .Token }}` dans template Magic Link (domaine custom)
- [~] EP-069/075 — Phase 1 cloud déployée (`compte.html` + `cloud.js`), reste test e2e réel puis Phase 2 (codes cadeaux, voix premium, RGPD) + dettes Supabase (storage `mj32_galerie`, RLS tables 001, validation client)

## Lane — Récompenses : le nid perd les gains (retour Papa Yann 2026-09-19) → HO-MJ-21

**DoD** : sur un jeu de calcul, un œuf gagné a une famille et son éclosion donne un dino ; recette Papa Yann avec Max.

- [x] EP-130 — **CAUSE RACINE** : `mj-shell.js` ne charge pas `dinos-data.js`, donc sur 29 jeux sur 36 le nid tourne sans catalogue. Œufs gris (`famille:"_sans"`) ET éclosion qui DÉTRUIT l'œuf sans rien donner (`doublon`). C'est ce qui a vidé le nid et le sac de Max — L-143. Brief HO-MJ-21.
- [x] EP-133 — Pertes silencieuses : `load()`/`save()` avalent tout ; profil enfant activé ou resynchronisé après des gains = nid orphelin (clé `__<childId>`), quota plein = écran qui célèbre un gain non écrit. Dans HO-MJ-21.
- [?] EP-129 — Anti-farm 3 étoiles : Papa Yann a tranché le principe (« il a le droit de farm, c'est s'entraîner », 2026-09-19) mais pas la règle de remplacement. N'était PAS la cause de l'incident. À arbitrer : supprimer, ou seulement freiner la répétition du MÊME jeu 3× de suite.
- [ ] EP-131 — Nid plein à 3 œufs (`MAX_EGGS = 3`) : au-delà, tout gain devient accessoire. Pas la cause ici, mais à remonter (5-6 ?). Hors HO-MJ-21.
- [ ] EP-132 — Message « déjà toutes les étoiles ici » (`mj-golden.js:395`) : plus en cursive, mais toujours deux phrases de texte, illisible à 4 ans. Signal visuel à la place. Hors HO-MJ-21.

## Lane — Retours Papa Yann 2026-09-08 (nid, œufs, MJ-28) : reste ouvert

**DoD** : EP-123 tranché (bug réel ou non), EP-128 statué.

- [!] EP-123 — Un MJ terminé n'a déclenché ni célébration ni écran de fin (Troodon/Spinosaure signalés) — 18 parties jouées en enquête (L-119), non reproduit, cause non identifiée : throttling CPU réel du P30 Pro et TTS réel jamais testés en headless
- [ ] EP-128 — mj-32 (atelier coloriage) n'appelle aucun `G.showEnd()` — choix assumé pour un atelier libre, mais à trancher explicitement : pas de Tracker, pas de capsule/œuf, pas d'écran replay

## Autres tickets isolés anciens (jamais avancés, statut à confirmer avec Papa Yann)

- [ ] EP-026 — TTS ElevenLabs pré-générés (MP3 statiques noms de jeux) — reporté, speechSynthesis natif en fallback

## Lane — Brainstorm 2026-09-19 : péage, récompenses, capteurs, écran de fin (dossier `docs/research/2026-09-19-brainstorm-mj-dino.md`)

**DoD** : Papa Yann a tranché les 3 décisions du dossier ; les tickets retenus passent en briefs HO.

- [ ] EP-135 — Écran de fin normé (les 4 boutons existent déjà dans `showEnd()`, leurs positions varient) : 4 emplacements FIXES `[Encore vert] [Au nid] [La suite BLEU #4d9de0] [Armoire]`, un bouton absent laisse un trou ; pictogramme armoire à la place de la maison ; audio au tap-down par bouton (pas de consigne lue). 1 fichier `mj-golden.js showEnd()`, 36 jeux d'un coup. À graver STANDARD-MJ Pilier 5.
- [ ] EP-136 — Micro-jeu « tourniquet » avant fiche dino : question 6-10 s, 2 réponses, la fiche s'ouvre QUOI QU'IL ARRIVE (bonne = tout de suite, mauvaise = on montre la bonne puis ouverture 1 s après, silence 8 s = ouverture seule). Jamais sur une fiche jamais vue, 1 fiche sur 3, jamais 2 de suite, exemption 60 premières s. Interrupteur parent dans compte.html. Formats : son initial du nom (son, jamais nom de lettre) > compter le concret (cornes) > addition dessinée. Arbitrage DINO requis (code dans dev-dinos.html).
- [ ] EP-137 — MJ « L'appel des noms » : 3 ombres dino, voix dit le son initial, taper la bonne ; assets ombres + MP3 `*-nom` existent. MÊME moteur que EP-136 → faire en premier. Brief prêt : `docs/handoffs/HO-MJ-24-appel-des-noms.md`, attend le feu vert Papa Yann.
- [ ] EP-138 — Capsules attachées au dino (vidéo/berceuse/histoire) : UNE seule monnaie = l'œuf, la capsule arrive AVEC le dino qui éclot, jamais tirée au sort, jamais promise (D-003), rejouable depuis l'album (tiroir gauche armoire, D-028). Bloqué par recette HO-MJ-21 avec Max. Ordre prod : berceuses par famille (6-8, EL compose) > 4 vidéos existantes (câblage) > histoire (pilote narration).
- [ ] EP-139 — Règle capteurs à graver : « un capteur est un raccourci joyeux, jamais une condition de réussite » (toute action capteur reste déclenchable au tap, cf. mj-21 shake + bouton). Interrupteur vibration/capteurs dans compte.html.
- [ ] EP-140 — Vibration `navigator.vibrate` comme indice « tu chauffes » dans mj-28 (lampe du dino), liée au doigt, jamais surprise. Coût S.
- [ ] EP-141 — Easter egg « retourner la tablette = le dino dort » (deviceorientation, écran noir + berceuse, on retourne = réveil). Coût S.
- [ ] EP-142 — Prototype « souffler sur la poussière du fossile » (getUserMedia + AnalyserNode, filtre énergie < 500 Hz, permission micro donnée 1 fois par le parent) : révèle plus ou moins vite, ne peut pas rater. Prototype AVANT engagement.
- [ ] EP-144 — Idées MJ neuves : Depann2000 bus en panne (appariement pièce/trou, S) · compteur de la ligne 185 (passage 9→10, 99→100, 999→1000, S-M) · le terminus (garer le bus sur la place numérotée, S) · le loup compte les moutons (SOUSTRACTION, seul trou du catalogue, M) · drapeau à finir (S) · ligne de bus à reconstituer (ordinal, tap-tap pas drag, M) · nid qui chante (répond à Simon EP-047, S-M).
