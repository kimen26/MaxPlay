# TODO — Pôle JEU

> Tickets ouverts uniquement, condensés en 1 ligne chacun (détail complet non recopié ici, mais préservé verbatim dans `archive/backlog-fermes-2026.md` pour les tickets qui ont une partie close, et dans l'historique git pour le reste). Extrait le 2026-09-03 (HO-MJ-01) depuis l'ancien `pmo/backlog.md` (supprimé, contenu distillé dans ce fichier + `LESSONS.md` + `archive/backlog-fermes-2026.md`).
> Statuts : `[ ]` à faire · `[~]` en cours · `[!]` bloqué · `[?]` question ouverte.

## Lane — Coloriage mj-32 : retours PY 2026-09-08 (2e vague)

- [x] Sons de victoire du 2026-09-05 (victoire-v1 a v4) ajoutes au pool `victory`. Au passage : le repli d'enchainement de la voix etait fixe a 4 s alors que victoire-v4 dure 5,3 s, la voix serait repartie PAR-DESSUS la fanfare — repli desormais cale sur la duree reelle du son
- [x] Largeur telephone verifiee a 360 et 320 px : aucun debordement de page, aucun ascenseur. DEFAUT TROUVE ET CORRIGE : les boutons Decors et Zoomer ajoutes le meme jour portaient la barre a 409 px de large sur 360 — « Autre dino » sortait a gauche et surtout « Fini ! » sortait a droite, donc l'enfant ne pouvait plus terminer son dessin. La barre passe desormais a la ligne
- [x] DECISION PY 2026-09-08 : la 2e langue a la victoire n'est PAS un defaut, « c'est style meme pour les dessins ». Ne PAS revenir a une seule langue. La regle « jamais deux voix EN MEME TEMPS » (L-111) reste entiere : c'est la simultaneite qui etait le probleme, pas le bilinguisme
- [~] PLANTES : 6 coloriages au trait PRODUITS et commites (araucaria, fougere arborescente, prele geante, ginkgo, cycas, palmier) dans `site/img/dinos/plantes/*_coloriage.webp`, descriptions tirees du champ `feuille` des fiches, noir et blanc pur verifie. Script : `.claude/skills/dino-images-lunii/scripts/batch-plante-coloriage.mjs`. RESTE : le branchement dans mj-32 (sous-agent lance le 2026-09-08 en fin de session, rapport attendu `docs/handoffs/rapports/HO-MJ-12-rapport.md`) — a verifier et commiter
- [x] Menu des FAMILLES livre 2026-09-08 : 11 cartes issues de `DINO_FAMILLES` (emoji, couleurs de l'encyclopedie), puis les dinos de la famille, bouton retour. Une famille sans coloriage chargeable est retiree. 33 assertions au vert

### Reste ouvert apres la session du 2026-09-08

- [x] Brancher les 6 plantes dans mj-32 : FAIT 2026-09-10. Carte "Les plantes" au niveau familles, 6 plantes coloriables, les 13 sans lineart retirees toutes seules, `isPlante` porte la resolution du bon dossier a la reprise. Portes rejouees, capture relue (prele geante coloriee sans bavure). Au passage : le smoke comptait les sondes d'images du catalogue comme des pannes alors que c'est du controle de flux voulu (L-125)
- [ ] STICKERS de plantes posables au tap dans le dessin (`{type:'sticker'}` dans l'historique) — idee PY du 2026-09-08, jamais commencee, distincte des plantes coloriables livrees
- [ ] Recette sur le VRAI P30 Pro : rien de tout ce qui a ete livre aujourd'hui n'a ete vu sur l'appareil de Max, seulement en navigateur a 360 et 320 px
- [x] Cibles tactiles de l'en-tete : FAIT 2026-09-10, chantier transverse aux 36 jeux. DEUX boutons etaient sous la norme, pas un : le savant fou a 46 et le RETOUR a 42. Les deux passent a 48x48 sans grossir le dessin. Le retour resistait au CSS parce que `back-button.js` posait sa taille en style INLINE (L-124). Mesure a 360 et 320 px sur 4 jeux, 6 specs au vert
- [x] FAUX POSITIF referme 2026-09-10 : `applyDinoStrings()` s'auto-appelle par `document.write` a la fin de `dinos-i18n.js`, invisible a un grep de callers. Mesure en `?lang=en` : "T-Rex" devient "T. rex", "Dicroidium" perd son trema, familles et plantes traduites. Rien a corriger (L-126)
- [!] Asset toujours absent : `site/img/dinos/paleoart/Scelidosaurus_coloriage.webp`. Ce n'etait PAS la seule cause du FAIL smoke (13 plantes sondees en plus, cf. L-125) et le smoke est desormais vert sans lui. BLOQUE sur Papa Yann : le Chromium dedie (port 9225, profil `c:/tmp/chromium-dino`) est connecte a un compte TIERS, verifie a nouveau le 2026-09-10
- [x] Les 71 dinos x 4 langues : FAIT 2026-09-10, et OUTILLE plutot que verifie a l'oeil — `node studio/minijeux/tools/_check-catalogue-dino-i18n.mjs` charge la vraie page dans les 4 langues et compare les tableaux apres fusion. Resultat : 71 dinos + 19 plantes + 11 familles, **zero nom manquant** dans les 4 langues. Les noms IDENTIQUES au FR (22 en anglais, 21 en espagnol, 6 en portugais) sont des noms scientifiques latins (Diplodocus, Minmi, Troodon, Ginkgo) : les traduire serait le vrai defaut. La porte sort en exit 1 si un nom vient a manquer

## Lane — Coloriage dino mj-32 : retours PY 2026-09-08 (HO-MJ-08)

- [x] Halo blanc de ~7 px autour de chaque trait : corrigé (passe d'extension dans la bande + garde `traitMask`), anti-fuite #6389 toujours vert → HO-MJ-08 (fait 2026-09-08)
- [x] Fin « Fini ! » : une seule voix — fanfare puis phrase nominative après sa fin (`playEndSound(..., {voice:false, onFanfareEnd})`) → HO-MJ-08 (fait 2026-09-08)
- [x] Idée PY 2026-09-08 : nom du dino en lettres creuses (outline) sous le dessin, dans le canvas, chaque lettre coloriable au flood fill (même historique JSON, même galerie). Police grasse ≥ 56 px, trait ≥ 6 px, 2 lignes si nom long, langue du site. À lancer après HO-MJ-08 TRANCHE PY 2026-09-08 : MAJUSCULES uniquement, lettres creuses dans lesquelles Max peut ecrire au doigt / colorier. FAIT 2026-09-08 : livre et pousse, mise en page sur 2 lignes calibree sur le plus long nom du catalogue, lettres coloriables une par une sans bavure, dilatation quasi nulle sur la bande du nom (sinon l'interieur des petites lettres etait mure).
- [x] Idée PY 2026-09-08 : sous-menu « Décor » dans l'atelier coloriage : 5 fonds lineart (désert, forêt, montagne, neige, volcan) composés derrière le dino avant le masque de contour (même flood fill), puis stickers plantes (fougère, prêle, palmier, fleur) posés au tap, entrée `{type:'sticker'}` dans l'historique JSON. Réutiliser la flore du pôle dino (`dinos-plantes.js`, `img/dinos/_new-plantes/`). Fonds d'abord, stickers ensuite. TRANCHE PY 2026-09-08 : TOUS les fonds proposes pour TOUS les dinos, aucun filtre par biome. VOIE 3 retenue (PY 2026-09-08) : produire 5 VRAIS fonds au trait, pas les PNG couleur de site/img/decor/. Script pret : `node .claude/skills/dino-images-lunii/scripts/batch-fond-coloriage.mjs` (calque du batch coloriage dino, meme charte de style). FAIT 2026-09-08 : les 5 fonds sont generes, regardes un par un, verifies en noir et blanc pur (zero couleur, >92% de blanc) et convertis en webp dans site/img/dinos/paleoart/. Reste a brancher le sous-menu Decors dans mj-32 (chantier B de HO-MJ-09). FAIT 2026-09-08 : sous-menu Decors livre, canvas bascule en paysage quand un decor est actif, anti-fuite Cryolophosaure verifiee AVEC decor par l'orchestrateur. Stickers plantes toujours a faire (etape ulterieure, jamais commencee).
- [x] Idee PY 2026-09-08 : ZOOM dans le coloriage pour les clics de precision (petites zones). Exigences PY : fluide et simple, plus un bouton pour revenir en vue "normale". Attention : mj-32 pose user-scalable=no, donc le zoom natif est bloque et le zoom maison doit tout couvrir. Piege connu : le flood fill travaille en pixels canvas, la conversion tap -> pixel (canvasPointFromEvent) doit tenir compte du facteur de zoom et du decalage, sinon la couleur tombe a cote. Voir HO-MJ-10 FAIT 2026-09-08 : zoom CSS x2,75, bouton loupe, deplacement au doigt avec capture du pointeur, bouton Vue normale. Deux defauts corriges par l'orchestrateur (borne calculee sur la fenetre au lieu du canvas, pan interrompu quand le doigt sort) qui rendaient la bande du nom inatteignable.
- [~] Cosmetique fonds de coloriage : MESURE 2026-09-10, le constat d'origine etait sous-estime. Le trait touche
  le bord GAUCHE ET DROIT sur les CINQ fonds (marge 0, pas 9 ou 15 px), et le desert perd 383 px de vide blanc en
  bas, le volcan 188 px : c'est un probleme de CADRAGE, pas de marge. **Sans consequence sur le coloriage** :
  simulation de remplissage depuis les 4 coins sur les 5 fonds, le pire remplissage fait 59% (le ciel de la
  montagne, normal), aucune zone n'avale l'image, donc toutes les formes sont fermees. Reste cosmetique, a
  corriger le jour ou on regenere (demander une marge blanche au bord dans le prompt de batch-fond-coloriage.mjs)

- [x] DAMIER DE TRANSPARENCE trouve et corrige 2026-09-10, defaut voisin mais BIEN PLUS visible : six coloriages
  (Tyrannosaurus, Albertosaurus, Ophthalmosaurus, Tarbosaurus, Torosaurus, Pentaceratops) portaient un damier gris
  aplati dans le fichier sur 34 a 42% de leur surface. Invisible sur fond blanc, il sautait aux yeux depuis que
  l'atelier compose le dino sur un decor. Corrige par `studio/dino/content/scripts/etancheite/blanchit-damier.py`,
  etancheite des six revalidee, anti-fuite de l'atelier au vert (L-127)

- [ ] HARNAIS CI INSTABLE (constat 2026-09-10, L-128) : le job « Test mini-jeux » est rouge a chaque push depuis
  plusieurs commits, avec des coupables DIFFERENTS a chaque passage (passe 1 aucun, passe 2 mj-21 + mj-55, un
  autre passage mj-19 + mj-46) — tous verts lances seuls. `run-all.mjs` lance 36 Chromium a la suite et l'un
  d'eux depasse ses delais sous charge. A traiter (relance automatique du jeu en echec avant de le declarer
  casse, ou moins de parallelisme machine). Le deploiement GitHub Pages n'est PAS concerne : workflow separe
  exprès, vert sur tous les commits du jour
- [ ] Dette perf pré-existante mj-32 : le remplissage du FOND ENTIER coûte ~400 ms (déjà avant HO-MJ-08, calcul JS pur, le canvas n'y est pour rien). À traiter si le 1er tap paraît lent sur P30 Pro
- [ ] Après HO-MJ-08 : patcher les linearts à brèche côté pôle dino (Cryolophosaure #6389) pour pouvoir baisser R (durable)

## Lane — EPIC i18n mini-jeux (décision PY 2026-09-05 : « évidemment tous les mini-jeux devront être traduits, les règles, les menus, les actions »)

- **EPIC-I18N-MJ / AUDIT** [x] — FAIT 2026-09-05 : `docs/i18n/AUDIT-I18N-MJ-2026-09-05.md`. Constat : le panneau règle (`regle-info.js`) reçoit du texte FR en dur depuis chaque `mj-XX.html` ; ≈ 27 k caractères écran + les 36 consignes parlées `regle-mj-XX` de `textes-jeux.js` (crédits EL). 6 lots : 0 plomberie (`mj-i18n.js` + `mj-strings.<lang>.js` générés depuis `studio/minijeux/i18n/<lang>/strings.json`, contrat `regle-info.js` par clés — BLOQUANT) · 1 les 5 jeux dino déjà i18n · 2 bus/couleurs (7) · 3 casse-têtes (11) · 4 comptage à pièges pluriel/ordinaux (6) · 5 lecture/phonétique FR = refonte péda par langue (4) · 6 cas particuliers mj-20/22/42. Prochaine étape : briefs handoffs lot 0 puis lots 1-3.
- **EPIC-I18N-MJ / LOT 0** [x] — FAIT 2026-09-05 (HO-MJ-02) : plomberie `site/js/mj-i18n.js` + pack généré `site/js/i18n/mj-strings.<lang>.js` depuis `studio/minijeux/i18n/<lang>/strings.json` (outils `tools/_extract-mj-regles.mjs`, `_check-mj-traduction.cjs`, `_gen-mj-strings-bundle.cjs`), injection dans `mj-shell.js` (zéro édition des 36 HTML), panneau règle des 36 jeux en anglais (36/36, checker 0 erreur, 0 pageerror, gabarit mj-14/48 sain). FR canon en dur inchangé, repli FR si pack absent.
- **EPIC-I18N-MJ / LOTS 1-2 + t()** [x] — FAIT 2026-09-05 (HO-MJ-03) : `MJi18n.t()` / `plural()` / `titre()`, 12 jeux traduits (117 clés ui), checker étendu, 24 runs Playwright 0 erreur, gabarit 12/12 sain. Non branché (documenté) : mj-06 `PHRASES[]` (phonétique FR, lot 5), `il-vivait-quand.mp3`, `getLineDisplayName()` de `data.js`, conversion impériale des mesures dino de mj-30. Historique : étendre `mj-i18n.js` d'une fonction `MJi18n.t(gameId, cle, frFallback, params)` pour les chaînes hors panneau règle (titres, boutons, toasts, consignes `setConsigne`, `SoundPool.phrase` texte de repli, données courtes) puis traduire en anglais les 12 jeux des lots 1 (mj-24/28/30/31/32) et 2 (mj-06/09/13a/13c/18/21/34). Agent Sonnet en cours.
- **REGLE-INFO-CHROME-I18N** [x] — FAIT 2026-09-06 dans HO-MJ-04. Historique : Constat capture HO-MJ-03 : le chrome du panneau règle vit dans `regle-info.js` en FR (« La règle », « Avis », « Écoute toutes les règles », « J'ai compris ! ») et reste FR en `?lang=en`. À passer par `MJi18n.t('_commun', …)` avec un bloc `_commun` dans les packs (petit lot, prioritaire avant lot 3).
- **EPIC-I18N-MJ / CHROME + LOTS 3-4** [x] — FAIT 2026-09-06 (HO-MJ-04) : chrome du panneau règle en `_commun` (25 clés, bug `MJi18n.t` sur `_commun` corrigé), 17 jeux traduits, ordinaux/pluriels par langue, checker 37/37 0 erreur, gabarit 17/17, Playwright 34 runs 0 erreur. Historique : chrome du panneau règle (`_commun`) + 17 jeux (lot 3 casse-têtes, lot 4 comptage pluriel/ordinaux). Agent Sonnet en cours.
- **EPIC-I18N-MJ / LOT 6 + CONSIGNES** [~] — HO-MJ-05 FAIT 2026-09-06 (mj-20/22/42 + titre mj-14, checker 0 erreur, gabarit 4/4, Playwright 8 runs) → 33/36 jeux en anglais ; HO-MJ-06 FAIT 2026-09-06 : 81 phrases parlées (36 `regle-mj-XX` + 45 partagées) traduites en anglais oral, `MJi18n.voix()`, `victory-sounds.js` ne joue plus le MP3 FR hors langue FR (cherche `sounds/voix/<lang>/…`, repli TTS), scripts EN tagués `studio/minijeux/i18n/en/scripts-voix.md` (11 663 car. ≈ 23 k crédits STS), checker 0 erreur, Playwright OK. Détail HO-MJ-05 = lot 6 (mj-20 noms de langues + TTS forcé fr-FR, mj-22 30 pays à article genré → clé `pays[].nom` par langue sans article FR, mj-42 Shisima) + titre d'en-tête de mj-14 (« Les cases mystères » encore FR en EN) ; HO-MJ-06 = traduction EN des 36 consignes parlées `regle-mj-XX` de `site/js/textes-jeux.js` en clé `voix` des packs (texte de repli TTS en anglais tout de suite, MP3 STS au quota). 2 agents Sonnet.
- **VOIX-MJ-EN-AUDIO** [!] — Générer les 81 MP3 anglais des consignes (voix maison via STS) dans `site/sounds/voix/en/…` au quota du mois prochain (≈ 23 k crédits). Outillage prêt 2026-09-06 : `node studio/dino/content/scripts/audio/_md2json-hors-fiche.cjs en studio/minijeux/i18n/en/scripts-voix.md --out=studio/minijeux/i18n/en/json` (l'option `--out` est obligatoire pour un .md hors dino, sinon refus — L-101).
- **EPIC-I18N-MJ / ES-PT + MJ-30** [x] — FAIT 2026-09-06 (HO-MJ-07, GO PY « termine toutes ces tâches ») : packs `es-es` et `pt-br` des 37 entrées (36 jeux + `_commun`, titre/règle/ui/voix), check 0 erreur 0 avertissement × 2, bundles `site/js/i18n/mj-strings.{es-es,pt-br}.js`, Playwright 4 jeux × 2 langues 0 erreur, captures relues. `MJi18n.plural` : pluriel dès n ≠ 1 hors FR. mj-30 : mesures en pieds / livres quand la langue est `en` (`fmtTaille` / `fmtPoids`, chiffres ronds, données métriques inchangées), pack EN `lb` / `pounds`. Contenu phonétique de mj-50/51/52/53 laissé en FR (décision PY 2026-09-05).
- **EPIC-I18N-MJ / RESTE** [ ] — 2026-09-06 : 33 jeux sur 36 en anglais (règles 36/36 + chrome, chaînes de jeu lots 1-4 et 6, consignes parlées EN en repli TTS). Reste : lot 5 mj-50/51/52/53 = contenu FR conservé (décision PY 2026-09-05) ; consignes parlées `textes-jeux.js` (36 `regle-mj-XX`, crédits EL, STS) ; es-es / pt-br des packs mini-jeux ; données FR résiduelles signalées dans les rapports HO-MJ-03/04 (`PALETTE[].name`, `getLineDisplayName()` de data.js, mesures dino mj-30 en impérial). Plan initial : lot 1 (5 jeux dino, S) · lot 2 bus/couleurs (7) · lot 3 casse-têtes (11) · lot 4 comptage pluriel/ordinaux (6, fonction plural() par langue) · lot 5 lecture/phonétique (4, refonte péda par langue — décision PY) · lot 6 mj-20/22/42 ; + consignes parlées `textes-jeux.js` (36 `regle-mj-XX`, crédits EL, STS) + es-es/pt-br des panneaux règle.
- **EPIC-I18N-MJ** [~] — 36 mini-jeux, cibles en / es-es / pt-br, même plomberie que dino (`js/lang.js` + packs de chaînes générés depuis `studio/`). Étape 1 : audit (chaînes UI, règles, consignes TTS/MP3, jeux déjà i18n = 8 chargent `js/lang.js`) → rapport + découpage en lots → briefs handoffs. Audio des consignes : voix maison via STS, au quota EL des mois suivants.

## Lane — Plateforme : espace parents + langue (2026-09-05, demande PY)

- **PARENTS-4-TUILES** [x] — FAIT 2026-09-05 (session DINO) : `site/index.html` + `js/mur.js` + `css/mur.css` — espace parents = 4 tuiles Statistiques / Paramètres / Compte / Retours, jeux cachés déplacés sous Paramètres, sélecteur de langue (fr, en, es-es, pt-br) via `js/lang.js`.
- **LANG-MINI-JEUX** [~] (absorbé par EPIC-I18N-MJ) — Le sélecteur de langue est global (localStorage `maxplay_lang`) mais seuls 8 mini-jeux sur 36 chargent `js/lang.js` : les 28 autres restent en français quelle que soit la langue choisie. Chiffrer puis brancher (ou afficher un badge « FR seulement » dans le menu enfant).

## Lane — Montée de niveau par compétence (EP-112)

- **ABANDON Max Adventure + tiles + WexWorld JEU** [x] — lane « Pipeline tile-tools » (EP-REFS, EP-MACRO-VIRAGE, EP-TILES) fermée avec elle, sans suite ; — décision Papa Yann 2026-09-05 (« ça ne marche pas du tout, on arrête ») : archivé `studio/max-adventure/`, `site/max-adventure*`, `mj-pose-tiles`, `tools/tile-tools`, skill `maxplay-tiles`, agent `game-tile`, rule `tile-tools.md` dans `_archive/` (jamais supprimé) ; retiré du catalogue et des docs (HO-G13, 2026-09-05).

- **EP-112** [~] — Montée de niveau par compétence : PILOTE mj-04 LIVRÉ, propagation aux 13 autres figées attend validation ressenti Max (2026-07-29)
- **T-C6b** [x] — Banque audio nombres/gabarits V1 LIVRÉE (100 MP3) — à faire écouter à Papa Yann (2026-07-29)
- **EP-112 (spec)** [?] — SPEC montée de niveau (défigeage `niveau = Stars+1`) — attend 7 décisions Papa Yann D1..D7, spec dans `../docs/2026-07-28-spec-montee-niveau.md` (2026-07-28)
- **L-XXX** (leçon non classée, pas encore renumérotée L-0xx) — Deux moteurs de vérité = même bug qui revient (unlock.js/mur.js dupliquaient flag admin + seuil ★, refactor commit 48fefc25) (2026-07-23)

## Lane — Design System v1 : validations en attente Papa Yann (EP-079..083)

- **EP-079** [?] — Specs mj-01 & mj-14 rouges PRÉEXISTANT — Stars.get=0 après victoire parfaite (statut à confirmer, dépend EP-070)
- **EP-080** [?] — mj-08 exception design clair volontaire — conserver ?
- **EP-081** [?] — mj-34/36/38/39 finalStar cinematic sur dernier palier — validation 48h (attente jusqu'à 2026-07-15 approx, jamais close explicitement)
- **EP-082** [?] — Ambiances par défaut hardcodées vs. choix enfant UI centralisée
- **EP-083** [?] — Bus-défilé header index supprimé — cosmétique, à valider

## Lane — Gouvernance figées / audit-gabarit (EP-109/110)

- **EP-109** [ ] — 18 jeux du menu SANS figée (mj-08,11,17,20,27,28,29,30,33,34,35,36,37,38,39,40,41,42) — plus gros trou de gouvernance, à planifier avec Papa Yann
- **EP-110** [ ] — Famille « quiz legacy » (mj-01/13a/14/15/16) : victoire score-% vs standard 3★ — modernisation cosmétique non urgente

## Lane — Fusion/bibliothèque savoir-faire (EP-100/101)

- **EP-100** [~] — Bibliothèque savoir-faire 3/4 LIVRÉE (3 libs extraites : mj-dice.js, dinos-ombres.js, mj-compte.js) — reste panneau-led.js suspendu (EP-101)
- **EP-101** [?] — Fusion F1 (mj-13a+mj-13c) REMISE À DÉCISION Papa Yann — friction refonte menu vs gains maintenance x2 long-terme, trancher NOW (v0.5) ou Phase 2

## Lane — MJ-43/44/45 post-création (EP-077 ×2 [collision d'ID] / EP-078)

- **EP-077 (session challenge)** [x] — Session challenge conseiller 2026-07-13 (6h30) — MJ-43/44 durcis + MJ-45 créé — Terminé 2026-07-13, harnais vert mj-43/44, MJ-45 spécifications stables « attente code » (statut à confirmer : MJ-45 lui-même reste non codé d'après ce ticket)
- **EP-077 (validation ressenti)** [~] — MJ-43 + MJ-44 créés 2026-07-13 (maths dominos + phonologie sons) — EN COURS, harnais vert, reste validation ressenti Papa Yann (T-770/771/772 : sessions GitHub Pages, corrections mineures, déploiement définitif + MAJ INVARIANTS) — ⚠️ collision d'ID avec EP-077 "session challenge" ci-dessus, deux tickets distincts dans le fichier source
- **EP-078** [~] — Chaîne de dominos (bout-à-bout même valeur) — priorité BASSE, en attente brainstorm/design amont, pas de code avant retours terrain MJ-43/44/45

## Lane — Audit specs / dettes figeage (EP-074 [harnais], EP-076)

- **EP-074 (harnais)** [!] — Audit specs harnais Playwright (mj-01, index) — specs obsolètes — BLOQUÉ, harnais test permanent FAIL sur mj-01/index, décision Papa Yann attendue (garder/refondre/réinventer mj-01) — ⚠️ collision d'ID avec EP-074 "Composants UI partagés mp-theme.css" (celui-ci FAIT, voir archive)
- **EP-076** [!] — Figeages validées 2026-07-07 (MJ-24/25/26/31) — audit contenu vs code — AUDIT RÉTROACTIF, 4 figées rétro-corrigées, reste : revoir process PMO figeage + checklist mini-audit + appliquer à toutes figées ouvertes (EP-070+)

## Lane — Norme bouton règles (i) + avatars (EP-072/073)

- **EP-073** [~] — Composant bouton règles (i) regle-info.js — implémentation lancée 2026-07-08, reste roll-out sur mj-04..33 (16 MJ rétroactifs)
- **EP-072** [ ] — Avatars chibi dinos × 3 humeurs (30 images) — pipeline ChatGPT Dinosaure XXL, timeline après refonte menu

## Lane — Gouvernance process/qualité (EP-042/043)

- **EP-042** [ ] — Check auto assets dans run.mjs (404 prévention prod, asset gitignoré mais référencé)
- **EP-043** [ ] — Audit automatisé figés : chaque ligne 🔒 sourcée Papa Yann ou code (`check-figees.mjs`)

## Lane — Narration audio dinos (EP-039)

- **EP-039** [~] — Narration audio DUO Narrateur H + Wex sur encyclopédie Dinos — pilote Parasaurolophus V2 clôturé 2026-05-30, 22/60 dinos en audio EL premium, reste généraliser ping-pong Wex à 5 fiches phares + option compléter 39 dinos restants (TTS live navigateur en attendant, non bloquant)

## Lane — Harnais de test (EP-038)

- **EP-038** [~] — Harnais de test headless mini-jeux (Playwright) — pilote livré 2026-05-16 validé Papa Yann, reste généraliser 1 spec/MJ actif (T-382→T-384)

## Lane — Gabarit/encodage rétro-fit (EP-035/036/037)

- **EP-035** [ ] — Fix encoding emojis tous les mini-jeux HTML (charset UTF-8 + vérification, 21 fichiers)
- **EP-036** [ ] — Gabarit header compact unifié tous les MJ (rétro-fit 20 fichiers)
- **EP-037** [ ] — Rétro-fit figeage 20 MJ restants (protection régression)

## Lane — Renouvellement thématique dino (EP-041, EP-047)

- **EP-041** [?] — Renouvellement mini-jeux — lassitude bus, exploration piste thème dino (tri-couleur/quiz/duel) — piste/exploration signalée 2026-06-08, dépend retour Max sur prototype
- **EP-047** [?] — SHORTLIST jeux addictifs : 7 candidats (Simon, Block Blast, Tangram dino, Mahjong dino, MJ-18 Expert, Shisima, Picross) — priorisation Papa Yann à trancher post-test MJ-34/35/36

## Lane — Recette cloud/compte (EP-048/049/069, EP-075)

- **EP-048** [ ] — Recette réelle parcours compte→sync (Papa Yann e2e test complet : login → partie → sync → récup profil autre appareil) — BLOQUANTE avant usage réel enfants
- **EP-049** [ ] — Resend SMTP + `{{ .Token }}` dans template Magic Link (custom domain MaxPlay)
- **EP-069** [~] — EPIC Système comptes/profils + cloud sync — Phase 1 légère déployée, reste e2e test réel (T-690/691/692) puis Phase 2 (codes cadeaux, voix premium unlock, analytics RGPD)
- **EP-075** [~] — Dettes Supabase — RLS + architecture cloud complète — phase 1 (migrations 003-005) livrée, reste : audit mj32_galerie storage, harmonisation golden_stars_*, RLS dettes tables 001, validation client Supabase

## Lane — Voix/audio production (EP-050, EP-051 [ancien], EP-052 [ancien])

- **EP-050** [ ] — Production premiers clips voix (voices-manifest.js vide, générer 10-12 phrases × 3 voix ElevenLabs)
- **EP-051 (voix/TTS)** [~] — MJ-33 · Noms de dinos uniquement (TTS noms uniquement, pas détail) — VALIDÉ par Papa Yann 2026-07-07, reste implémentation (T-510/511/512) — ⚠️ collision d'ID avec l'EP-051 "Migrer 6 pages TTS.speak" ci-dessous, sources distinctes dans le fichier d'origine
- **EP-052 (voix/TTS)** [~] — MJ-31 · Intro trop long + registre voix TTS — VALIDÉ par Papa Yann 2026-07-07, reste implémentation (T-520/521/522/523) — ⚠️ collision d'ID avec l'EP-052 "Dette gabarit entête 8 MJ" ci-dessous

## Lane — Retours revue Papa Yann 2026-07-07 (batch MJ-04..30, EP-053..068, EP-051/052 gabarit)

- **EP-053** [!] — MJ-32 · BUG CRITIQUE zone noire non-recolorable + features galerie/trophées/likes
- **EP-054** [ ] — MJ-04 · Refonte visuelle (« pas moche ») — (statut à confirmer : très probablement dépassé par EP-112 golden pilote 2026-07-29, jamais explicitement clos)
- **EP-055** [ ] — MJ-05 · Refonte complète mécanique/visuelle (« très laid mais l'idée est bonne »)
- **EP-056** [ ] — MJ-06 · Diversifier emojis (dino, voyage)
- **EP-057** [ ] — MJ-23 · Diversifier emojis (dino, voyage, terre, espace)
- **EP-058** [ ] — MJ-15 · Variantes intrus + ombres dinos colorées (pas stigmatisant)
- **EP-059** [!] — MJ-16 · Portrait responsive (« ne rentre pas en portrait ») — bloquant UX
- **EP-060** [ ] — MJ-08 & MJ-09 · Refonte doublon → tri multi-thème (ombres dinos + emojis)
- **EP-061** [ ] — MJ-12 · Ajouter nouveaux sons (banque audio)
- **EP-062** [ ] — MJ-25 · Créer progression difficulté (« zéro difficulté, but incompris »)
- **EP-063** [!] — MJ-26 · BUG dino hors cadre (noir sur noir) + répétition niveau 1 — bloquant
- **EP-064** [ ] — MJ-27 · Cliquer chaque syllabe et entendre son son (feature audio pédago)
- **EP-065** [ ] — MJ-28 · Lampe éclaire mieux (amélioration visuelle)
- **EP-066** [ ] — MJ-29 · Cliquer mot → place + lit (amélioration interaction)
- **EP-067** [ ] — MJ-30 · Dire nom dino à affichage ou image alternative
- **EP-068** [ ] — NORME : Bouton (i) règles sur chaque MJ + explication audio (21 fichiers)
- **EP-051 (gabarit)** [ ] — Migrer 6 pages en TTS.speak (mj-19, 20, 22, dev-dinos, index2, index3) — ⚠️ collision d'ID, voir lane Voix/audio ci-dessus
- **EP-052 (gabarit)** [ ] — Dette gabarit entête 8 MJ (mj-12, 13a-c, 14-17) — cosmétique, protégée figeage, effort > bénéfice — ⚠️ collision d'ID, voir lane Voix/audio ci-dessus

## Autres tickets isolés

- **EP-005** [ ] — Système de progression (flotte + carte) — table statuts historique, jamais développé plus loin dans le fichier source
- **EP-026** [ ] — TTS ElevenLabs pré-générés (MP3 statiques pour noms de jeux) — infra + agent voice-director + pipeline narration, jamais démarré (reporté, speechSynthesis natif en fallback)

## Lane — Retours Papa Yann 2026-09-08 (nid, œufs, longueur des parties, MJ-28)

- **EP-120** [x] (fait 2026-09-09) — Fin de partie · quand un œuf ou un objet est gagné, la célébration doit offrir un bouton « Aller dans le nid » (accès direct depuis l'écran de fin, pas seulement via le menu).
  - Fait 2026-09-09 : bouton « Au nid » sur l'ecran de fin (mj-golden.js), ouvre la chambre via index.html?open=nid. Libelle traduit dans les 4 langues. Recette : 4 boutons tiennent a 360px sur deux rangs.
- **EP-121** [x] (fait 2026-09-09) — Ouverture d'œuf · le dino qui sort est décalé par rapport à la matrice des œufs, et sombre sur sombre : invisible. Recentrer sur l'œuf ouvert + fond clair ou halo derrière le dino.
  - Fait 2026-09-09 : DEUX bugs empiles. (1) transformation fantome WAAPI non annulee apres le gel ; (2) surtout, l'ancre de MaxFX.hatch etait `oeuf`, element DEJA RETIRE du DOM a l'etape 4 — rect orphelin, halo et sprite poses loin de la case. Ancre = case cible de l'album. Halo elargi (x1.35) et eclairci pour le contraste. Mesure finale dx=0.0 dy=0.0 sur deux passes.
- **EP-122** [x] (fait 2026-09-09) — Fiche dino gagnée · le bouton retour mène à une page vide avec un seul bouton retour ; le second retour tombe sur la page famille. Le retour doit ramener à la liste des dinos d'où l'œuf a été ouvert.
  - Fait 2026-09-09 : le deep-link resout `dino.famille` et pose currentMode/currentCatId AVANT showFiche2, donc le retour retrouve sa grille. Les 3 grilles signalent leurs erreurs (console.error + showMenu) au lieu d'echouer en silence. Verifie : retour = grille Ceratopsiens avec Triceratops.
- **EP-123** [!] — Un mini-jeu terminé n'a déclenché ni célébration ni écran de fin (Troodon ou Spinosaure — à identifier : auditer tous les MJ à thème dino sur la présence d'un `finPartie`/célébration).
- **EP-124** [x] (fait 2026-09-09) — Longueur des parties · le modèle 4/6/8 manches est épuisant sur les jeux longs : Max quitte en voyant l'écran. Augmenter la difficulté au lieu du nombre de manches, et raccourcir les parties longues.
  - Fait : `Golden.setup(id, { questions:[a,b,c] })` + relais par `cfg.questions` dans `mj-shell.js`
    (le shell rappelait setup et ecrasait la table du jeu — c'etait la vraie cause). Defaut [4,6,8]
    inchange, mj-24 et mj-46 non regresses. MJ-28 passe a [3,4,5] avec cousins de meme famille des le
    niveau 2 au lieu du 3 (moins de manches, pas plus facile). Table invalide = refus bruyant + defaut.
  - Etoile : TRANCHE le 2026-09-09 (D-024) — Papa Yann accepte que l'etoile reste le sans-faute a
    3 manches comme a 8. Aucun code a ecrire : `isPerfect()` compare deja `_firstTry` a `totalQ`.
  - **ARBITRAGE Papa Yann 2026-09-09 : option B retenue.** `QS_PER_LEVEL` devient paramétrable par jeu — `Golden.setup('mj-28', { questions: [3,4,5] })`, défaut `[4,6,8]` INCHANGÉ pour tout jeu qui ne déclare rien. Les jeux à manche longue passent à moins de manches AVEC une difficulté qui monte plus vite (demande littérale : « augmenter la difficulté sans faire 8 parties »).
  - Portée réelle : seuls 3 jeux utilisent Golden — mj-24, mj-28, mj-46. `mj-golden.js:42` (`QS_PER_LEVEL = [4, 6, 8]`) est le point d'entrée ; la règle du 2026-06-11 documentée en tête de `mj-golden.js` doit être amendée (elle n'est plus la LOI universelle, elle devient le DÉFAUT).
  - Cas d'usage n°1 = MJ-28 : manche à ~15-20 s de funfact audio → 8 manches ≈ 4 min dont la moitié en écoute passive. C'est là que Max sort.
  - ⚠️ RESTE À TRANCHER (posé à Papa Yann, sans réponse à ce jour) : sur un jeu à 3/4/5 manches, l'étoile s'obtient-elle toujours SANS FAUTE ? À 3 manches elle devient bien plus facile qu'à 8. Deux voies : (a) accepter, le jeu est plus dur par ailleurs ; (b) garder le sans-faute mais n'accorder l'étoile qu'au niveau max. NE PAS implémenter l'étoile sans cet arbitrage.
- **EP-125** [x] (fait 2026-09-09) — Jeux d'écriture · rien qu'aux icônes Max n'a pas envie d'y aller. Revoir les vignettes/icônes des MJ d'écriture (visuel plus attirant, moins scolaire).
  - Fait : le defaut n'etait pas les icones du catalogue mais les 4 vignettes du repaire de Galli
    (mj-50/51/52/53), qui partageaient le MEME fond vert-sombre et formaient un bloc uniforme de lettres.
    Chacune a desormais son univers (jungle / terre / nuit / ciel) et mj-50 montre Galli qui chante.
    Recette a 360px : capture des 4 cote a cote, bloc casse, aucune lettre ne chevauche le dino.
  - Reste ouvert : les emojis du catalogue (`catalog.js:89-93`, notamment 🔠 pour mj-51) ne s'affichent
    que dans l'ecran parental — impact nul sur Max, basse priorite. Renommage des titres non fait
    (touche les 4 bundles i18n, a grouper avec un autre chantier de traduction).
- **EP-126** [x] (fait 2026-09-09) — MJ-28 (La lampe du dino) · beaucoup de noms de dinos débordent de leur case ; le tap sur l'icône « écouter » attrape souvent la case à la place (zone tactile à séparer, 48x48 minimum).
  - Fait 2026-09-09 : .name-btn restructure (space-between, plus de font-size fixe), .label avec overflow-wrap/hyphens et clamp, .say en pastille ronde 48x48 separee, une seule colonne sous 360px. Verifie a 320 et 360px avec les 3 noms les plus longs : aucun debordement, cible 48px.
- **EP-127** [x] (fait 2026-09-09) — MJ-28 · le nom du dino est dit par une voix différente (homme/femme) du reste du texte. Uniformiser la voix.
  - Fait 2026-09-09 : cause = TTS systeme (voix machine) pour le nom vs banque MP3 ElevenLabs pour le reste. Le TTS ne dit plus que « Bravo ! », le nom vient de la banque MP3 et le funfact s'enchaine en callback — une seule voix a la fois.
- **EP-128** [ ] — MJ-32 (atelier coloriage) · seul MJ à n'appeler aucun `G.showEnd()` (mj-32.html:1375, `MaxFX.finalStar` brut). Choix assumé pour un atelier libre `maxStars:0`, mais à trancher : pas de Tracker, pas de capsule/œuf, pas d'écran replay. Trouvé en enquêtant sur EP-123, ce n'est PAS le bug rapporté.
- **EP-129** [x] (verifie 2026-09-09) — Chambre des œufs à 360px · sur la capture de recette EP-120 (`studio/minijeux/tests/.artifacts/ep120-2-chambre-ouverte-360.png`), un panneau clair occupe le tiers droit de l'écran et coupe la vue de la chambre. À trancher : tiroir en cours d'ouverture figé par le timing de la capture, ou vrai défaut de layout à 360px. Vérifier sur le vrai téléphone.
  - NON REPRODUIT 2026-09-09 : le « panneau clair » du tiers droit est `.ch-sac`, le sac a dos, large de 88px et VOULU (mur.css). Aucun debordement, aucun scroll horizontal a 360px. La capture d'origine avait ete prise pendant le didacticiel premiere-visite. Rien a corriger.
- **EP-130** [x] (verifie 2026-09-09) — Chambre des œufs · le titre « La chambre des œufs » et les vignettes de dinos du fond sont très sombres sur fond sombre (contraste < 4.5:1 probable). Même famille que EP-121. Mesurer et remonter le contraste.
  - NON REPRODUIT 2026-09-09 : les oeufs sont bien creme (#fff7e0) et or, opacite 1, aucun voile ; le titre mesure 19.76:1, tres au-dessus des 4.5:1. Le noir observe venait de `#nid-intro-ov`, le didacticiel de premiere visite, pose sur document.body (HORS de #chambre-ov, d'ou son absence des mesures) et qui assombrit la chambre pendant 6 s. Capture apres sa fermeture : chambre parfaitement lisible. Rien a corriger.
- **EP-131** [x] (fait 2026-09-09) — `nid-e2e.spec.mjs` · le check « au moins 1 jeu tamponne » (section 7, bulle copain dino) echoue avec count=0. Passe par `MUR.playsOf()` puis `Tracker.getStats()`, chemin disjoint de l eclosion — probablement pre-existant, mais NON PROUVE tel (impossible de comparer avec l arbre propre, working tree partage entre sessions). A investiguer : soit le tracker n enregistre plus les parties, soit le spec attend une cle obsolete.
  - Fait 2026-09-09 : le tracker n'avait RIEN de casse — `playsOf('mj-24')` vaut bien 1 sur le Mur apres une partie. Cause : la bulle du copain dino ne propose plus mj-24 mais mj-57 et mj-32, et le spec cherchait un tampon sur des jeux jamais joues. Assertion reecrite sur la REGLE (joue = tamponne, jamais joue = reco) au lieu d'un jeu code en dur, donc elle survivra a la prochaine recomposition du repaire. 32/32.
