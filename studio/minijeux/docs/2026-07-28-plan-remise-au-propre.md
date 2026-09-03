# PLAN DE REMISE AU PROPRE — après la passe complète de Papa Yann (2026-07-27)

> GO PY : « relis tout ce qu'on s'est dit, valide les bonnes pratiques et la bonne logique, note tout,
> fais un plan, si t'as des doutes conseiller, pour tout bien suivre PMO ».
> Retours bruts : `studio/minijeux/memory/audits/retours/2026-07-27-passe-complete-py.json` (21) + base Supabase (ids 6303-6323).

## 0. Le constat chiffré (2 audits factuels, 2026-07-28)

| Sujet | Réalité mesurée |
|---|---|
| Écrans de victoire | **33 jeux sur 45** n'utilisent PAS `G.showEnd` — dont **19 encore à l'ancien modèle 2 boutons** « Rejouer / Menu » |
| Piste d'avancement | **29 jeux** ont `golden` absent ou `false` alors que le catalogue leur promet 3 étoiles |
| Conséquence NID | ces 33 jeux ne donnent **JAMAIS d'œuf** (`Collection.grantCapsule` n'est appelé que par `G.showEnd`) → **c'est LA cause du « j'en gagne énormément mais ça n'apparaît qu'1 fois sur 3 »** |
| Entêtes surchargés | 9 jeux ajoutent levelbar/score dans `.hdr` → le titre est écrasé (`flex:1` partagé) puis tronqué |
| Débordement police | 7 points **critiques** identifiés (Cursif à 2.4-3.4rem dans des boîtes fixes) — mj-50, mj-51, mj-52, mj-53 |
| Dinos | **32 jeux sur 45 sans aucun dino**, dont **10 skinnables par simple substitution d'asset** |
| Assets dino | ombres 69/70, sprites 69/70, sons **70/70 et tous correctement appelés** — seul trou : le Saurolophe (aucune image) |
| Images familles | **9/11** (manquent Mammifères et Oiseaux), sources Lunii HD couleur 1254² réutilisables |
| Cartes du monde | 6 polygones de 7-10 points, **53 points pour la planète**, 0 courbe, Océanie/Groenland absents |
| Jeux orphelins | mj-25/29/33/41 **conformes mais absents du catalogue** (invisibles) · mj-01/13b non conformes, candidats archivage |
| Garde-fou | `audit-gabarit.mjs` **ne teste ni `golden`, ni `G.showEnd`, ni la longueur du titre** → c'est pour ça que la dérive a duré des mois |

## 1. La cause racine (exigence PY : « on ne recode pas, on factorise et on réuse »)

Le gabarit `mj-shell.js` + `mj-golden.js` EXISTE et fait déjà tout : entête canonique, piste 4/6/8, étoiles,
écran de fin 3 boutons, octroi de l'œuf, chaînage « La suite ». **Tous les jeux le chargent** — mais 33 ne
l'utilisent pas pour la fin, et 29 pas pour la progression : ils ont gardé leur code maison d'avant.
Rien à réinventer : **il faut brancher l'existant et interdire les variantes**.

## 2. Les 5 chantiers

### C1 — GABARIT UNIQUE (la fondation, tout le reste en dépend)
1. `audit-gabarit.mjs` devient **BLOQUANT** sur : `golden:true` si `maxStars>0` · usage de `G.showEnd` (interdiction des overlays maison : `#end-screen`, `.victory-overlay`, `.fin-overlay`, `#victoryScreen`, `showEndScreen`) · titre ≤ 4 mots ET aligné catalogue↔`MJ.init`↔`<title>` · aucun élément ajouté dans `.hdr` · aucun `.hdr`/`.htitle` en CSS local.
2. Migration en 3 lots (le portail refuse tout retour en arrière) : **lot A** 19 jeux « ancien modèle 2 boutons » · **lot B** 9 jeux « 1 bouton » · **lot C** entêtes maison (levelbar/score-badge/pistes concurrentes).
3. Piège relevé : `mj-34` réutilise la classe `.end-wrap` du vrai écran golden → faussement conforme, à traiter en premier.
4. Effet immédiat : les 33 jeux se mettent à donner des œufs, la progression et les étoiles s'affichent partout pareil.

### C2 — LISIBILITÉ / RESPONSIVE
1. Titres : 8 à raccourcir/aligner (mj-20 catalogue≠init, mj-14 3 titres différents, mj-28, mj-31, mj-27, mj-45, mj-48, mj-43).
2. Cursif : passer les 7 points critiques en `clamp()` + `line-height` ≥ 1.3 + `overflow` géré. Le bon pattern existe déjà (`mj-40` utilise `clamp(1.4rem,5vmin,2.2rem)`) → le généraliser en règle CSS partagée, pas jeu par jeu.
3. mj-53 : le mot syllabé (`vé·lo·ci·rap·tor`) et les phrases longues débordent → `word-break` + taille fluide.
4. Hauteur d'écran (retour mj-51 « sensation d'ascenseur », « le dessin est trop petit, penser à l'entête») : hauteur de jeu = `100dvh - entête - piste`, en variable CSS partagée.
5. Panneau de règles : réduire (demande PY).

### C3 — RÉCOMPENSES : REMETTRE À PLAT (arbitrage PY requis, voir §3)
Bugs à corriger quoi qu'il arrive :
- œufs manquants sur 33 jeux → réglé par C1 ;
- **œuf d'or ouvert immédiatement** (bug : la série déclenche l'éclosion au lieu de teinter la capsule) ;
- **éclosion illisible** : elle doit se produire UNIQUEMENT sur l'accueil, jamais dans un jeu (retour mj-46 : « je ne ferais pas éclore les œufs, c'est un truc de l'écran d'accueil ! ») ;
- avancement qui passe au bleu pendant l'animation du jeton au lieu du tour suivant (retour mj-49, transverse).

### C4 — DINOS PARTOUT (dette répétée 15×)
- **Vague 1 (substitution pure, 10 jeux)** : mj-49, mj-44, mj-23, mj-06, mj-42, mj-38, mj-18, mj-05, mj-04, mj-35 — le code existe déjà (mj-48 fait les passagers dino, mj-46 les œufs).
- **Vague 2 (adaptation)** : mj-14 (ombres dino dans la grille), mj-16 (suites par famille/taille), mj-19, mj-34, mj-17 (dino-mascotte).
- **À NE PAS skinner** : mj-09/21/36 (les couleurs de lignes IDFM sont la valeur pédagogique), mj-11/22/20 (drapeaux/carte), mj-39/37 (la forme géométrique EST la mécanique), mj-13a/13c (l'ordre temporel des bus est le sens du jeu). Compromis : dino en décor/mascotte.
- Variantes demandées par PY : famille · régime alimentaire · époque (mj-15, mj-14).

### C5 — CONTENU DINO & ENCYCLOPÉDIE
1. **Cartes du monde** (ma dette) : remplacer les 6 polygones par de vraies silhouettes. Deux sources déjà dans le repo : cartes paléogéographiques Scotese (déjà affichées dans le carrousel Pangée de la même page !) et le pattern `mj-22 loadSvgMap()` qui sait charger un vrai SVG et en extraire les paths. Ajouter Océanie/Groenland, allumer correctement chaque dino.
2. **Familles** : réutiliser les sources Lunii HD (1254² couleur) + produire les 2 manquantes (Mammifères, Oiseaux).
3. **Onglet Époques** : tri par période (Trias/Jurassique/Crétacé/avant/après) — donnée `periode` déjà présente sur les 70 dinos.
4. **Saurolophe** : générer son paléoart + régénérer le manifeste (sinon il reste invisible).
5. Têtes manquantes : Corythosaure, Hatzégoptéryx.

### C6 — AUDIO (nouvelle demande PY)
Banque ElevenLabs de nombres et phrases-gabarits :
- nombres 0-30 (+ 40/50/100/1000) en isolé ;
- phrases-gabarits complètes par nombre (« il en manque N », « il en faut N en tout », « N œufs ! ») — **jamais d'assemblage mot-à-mot** (effet robot) ;
- 2-3 couleurs d'intonation par item via tags v3 (`[calm]` consigne · `[cheerful]` réussite · `[excited]` gros gain), modèle `eleven_v3`, tags en début de ligne, jamais empilés, dictionnaire de prononciation pour les chiffres ;
- **une seule fonction partagée** `say(n)` / `sayTemplate(...)` avec repli TTS — pas d'implémentation par jeu ;
- règle anti-lassitude : le neutre chaleureux est le défaut, l'émotion réservée aux fins de partie/œufs/éclosion ;
- échantillons soumis à PY avant production complète.
- Corrige au passage : mj-50 (« E accent grave f » = graphie phonétique lue littéralement) et mj-20 (« elle dit 4, 4 c'est 4… trop long »).

### C7 — MENU & MINIATURES
- Miniatures ratées : refonte (SVG propre ou génération assistée) — critère : lisible à 80px, sans texte.
- Favoris / jeu du jour : repenser l'affichage (« le but est de faire suivant et de voir autre chose »).
- ❌ **mj-25/29/33/41 : NE PAS remettre au menu.** Retirés sur décision explicite PY du 2026-07-21 (mj-25 « 0 difficulté, aucun gain pédagogique, CA DEGAGE » · mj-29 « on en a déjà un qui fait ça, pas fluide » · mj-33 « à regrouper dans un mémory générique multi-styles » · mj-41 « pas compris la difficulté, V1 pas besoin d'afficher »). Leur **conformité technique n'est PAS un argument de republication** — erreur de raisonnement de l'audit, corrigée par PY : « on ne fait pas du nombre mais de la qualité ». À marquer `retire: true` dans le catalogue pour qu'aucun audit futur ne les re-propose. mj-01/mj-13b : archivage.

### C8 — RETOURS INDIVIDUELS (les 21, un par un)
mj-49 formulation « il en manque / il en faut » · mj-45 game design monter/descendre + boutons superposés · mj-30 fiche trop longue au tap (juste le nom) · mj-52 mot sur une ligne + lettres équilibrées · mj-34 difficulté + sortie affichée devant · mj-53 clavier complet (nouveau jeu ?) · mj-18 pastille par tube plein + coloriage dino par couleurs trouvées · mj-21 coloriage progressif d'un dino · mj-17 indices · mj-14 thèmes/difficulté · mj-51 lettres trop basses.

## 3. Les arbitrages qui appartiennent à Papa Yann

- **A. Monnaies** : garde-t-on les 3 (avancement de manche · étoile sans-faute · œuf) ? Proposition : **l'avancement reste dans le jeu** (piste), **l'œuf devient la seule récompense visible de fin**, **l'étoile passe en trophée discret côté parent**. Une seule chose à comprendre pour l'enfant.
- **B. Défigeage niveau** (toujours en attente) : `niveau = max(étoiles, compétence mesurée)` — la règle actuelle enferme au niveau 1.
- **C. Skin dino** : valider la liste « à ne pas skinner » (bus IDFM, drapeaux, échecs) — décor/mascotte à la place.
- **D. Voix dans les menus** : toujours en attente ; la banque audio C6 la rendrait facile.

## 3bis. C0 — PASSE DE TRI QUALITÉ (AVANT toute migration) — exigence PY 2026-07-28

> « Remettre des jeux pour remettre des jeux, ce n'est pas le but. N'ont-ils pas été écartés à raison ?
> Sont-ils pertinents, pas redondants, éducatifs, pédagogiques, bien designés ? On ne fait pas du nombre
> mais de la qualité. »

Migrer 33 écrans de victoire dont certains sur des jeux à supprimer = **travail jeté**. Donc :
`game-conseiller` passe les 45 jeux du catalogue en revue AVANT C1, et rend pour chacun un verdict
**GARDER / FUSIONNER / REFONDRE / RETIRER**, argumenté sur : valeur pédagogique réelle · redondance
(ex. compter des passagers : mj-04, mj-05, mj-45, mj-48 — PY a lui-même écrit sur mj-48 « pourquoi ce
jeu vs l'autre qui compte aussi ? ») · qualité de design · signaux déjà donnés par PY dans ses retours
(mj-17 « vieux jeu », mj-34 « trop simple », mj-45 « pas clair »).
La liste est **soumise à PY** avant tout code. Seuls les jeux GARDER/REFONDRE entrent dans C1.

## 4. Ordre d'exécution proposé

0. **C0 tri qualité** (conseiller) → validation PY. Aucun code avant.
1. **C1 portail + lot A** (écrans de victoire des jeux retenus) — débloque les œufs, c'est le retour n°1.
2. **C3 bugs récompenses** (œuf d'or, éclosion, avancement bleu) — dans la foulée, même zone de code.
3. **C2 lisibilité** (titres + Cursif + hauteur) — visible immédiatement pour PY.
4. **C4 vague 1 dinos** (10 jeux, substitution) — la dette la plus ancienne.
5. **C5 cartes + familles + époques** — pôle DINO, en parallèle.
6. **C6 audio** — après validation des échantillons.
7. **C7 menu/miniatures** puis **C8 retours individuels**.

Chaque lot : harnais vert + `audit-gabarit` sans bloquant AVANT push. Traces PMO à chaque étape.
