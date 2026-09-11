# Leçons — Pôle JEU

> Convention de numérotation (fixée 2026-05-21) : **L-000..L-049** sont réservées aux leçons tile (skill `maxplay-tiles/LESSONS.md`) ; **L-050+** = leçons mini-jeux (process, REX, patterns). Contenu VERBATIM déplacé depuis l'ancien dossier pmo (§ « Leçons du pôle MJ ») le 2026-09-03 (HO-MJ-01). Numéros L-NNN jamais renumérotés.

> **Rotation 2026-09-12 (HO-R02)** : les leçons datées, dupliquées ou couvertes par une correction plus récente sont passées verbatim dans [`archive/lessons-2026-H1.md`](archive/lessons-2026-H1.md). Ce fichier garde les leçons encore générales — méthodo de diagnostic récente + règles fondatrices en vigueur.

Synthèse REX MJ-21 « Peins les bus! » — 33 commits, 5 causes racines (2026-05-16). Détail complet : [`archive/PIPELINE-MEMORY-MJ.md`](archive/PIPELINE-MEMORY-MJ.md).

### L-050 – Figeage par mini-jeu = protection régression
**Constat** : MJ-21 saga "bus en haut/bas" — 10 répétitions Papa Yann sans enregistrement → régression structurelle à chaque `/compact`. **Cause** : aucune décision figée dans code source, pas de priorité mécanique.
**Fix** : système figeage (commit 565f98cb) — `studio/minijeux/docs/jeux/figees/mj-XX.md` + hook PreToolUse `figees-injector.ps1` + game-mj-reviewer Section 0. État : ✅ déployé, mj-21 protégé.

### L-058 – Audio multi-voix = figeage texte amont obligatoire
**Dinos audio (2026-05-17)** : chantier DUO Narrateur H + Wex sur 50 fiches, coût itération ElevenLabs important (loudness + timing + clarté entre voix = 2-3 tries min).
**Processus figé** : figeage script (3-passes validation) + challenge Papa Yann AVANT envoi ElevenLabs. Validation 1 fiche test (Tricératops) avant généraliser (49 autres). Application réussie : 44 MP3 top 11 en 1 pass, zéro itération post-prod.

### L-059 – Découpage agents parallèles efficace → RE-GREP anti-patterns après
**Dinos (2026-05-17)** : 9-11 agents parallèles (étymo fact-check, game-conseiller, narration-conseiller, panel lecteur) = efficace pour grosse tâche d'écriture/correction. **Piège** : un agent oublie Gallimimus, un autre n'écrase pas le bon Bloc Coelophysis (éditions en conflit).
**Leçon** : après découpage agents parallèles, toujours RE-GREP anti-patterns + count blocs/dinos avant merge. Outil : `grep -c "Bloc A" _ETYMO-RACINES-50.md` → doit = 50, `grep "Gallimimus"` → doit être présent.

### L-092 – Design System Unique = source de vérité CSS centralisée refonte cohérence (2026-07-13)
**Design System v1 (2026-07-13)** : 40 MJ convertis v1 (CSS .hdr locals) → v2 (styles mp-theme.css). **Leçon** : gabarit header MJ **v1 REMPLACÉ** v2 DÉFINITIF. Impact futur : tout nouveau MJ doit respecter `site/css/mp-theme.css` obligation structurelle + `site/js/mp-theme.js` chargement localStorage ambiance. Zéro CSS local .hdr tolérés à partir de ce commit (91ef327b). **Bénéfice** : refonte design = 1 fichier CSS (mp-theme.css) vs 40 fichiers MJ · cohérence enfant max (pas jeu multicolore disparate) · maintenance future 80% plus rapide. **Validation** : tout MJ nouveau passe par game-mj-reviewer section 4 (Design).

### L-080 – Banque sons = doc maître unique, API centralisée immuable
**Audio (2026-07-06)** : refonte système sonore complet. **Leçon** : source de vérité = `site/sounds/_BANQUE-SONS.md` (lire AVANT générer/brancher audio — carte des dossiers + API + process + reste). API statique : `victory-sounds.js` (SoundPool.play/voice/phrase, chargé par tous les MJ → 1 fichier upgrade tout) + `dinos-audio-manifest.js` (playDinoNom). Tout branchement MJ utilise ces 2 fichiers + garde un fallback TTS. Zéro chiffre audio en dur ailleurs.
**MJ-28..33 (2026-07-05)** : 2 agents piégés (mj-29 fabrique noms étymo, mj-32 coloriage flood fill) par erreur `DINOS is not defined`. Root cause : script utilise `const DINOS` en scope module, pas `window.DINOS`. **Leçon** : pour partage données inter-scripts vanilla, hoister constante à niveau global AVANT premier usage (ou assigner explicite `window.DINOS = {...}`). Valider avec `console.log(window.DINOS)` au démarrage.

### L-109 – Jamais nommer Max dans le contenu livré — profil = calibrage interne, pas personnalisation
**Audit audio 2026-07-17** : détecté 2 violations (mj-22 « Bravo Max ! Tu as trouvé tous les pays ! » + catalog.js mj-34 « libère celui de Max »). **Leçon critique** : profil Max (3.5-4 ans, passions dino/bus, brésilien, literie, doigts) = DATA INTERNE CALIBRAGE, JAMAIS listé/adressé dans contenu produit livré. Anti-pattern établi MEMORY.md 2026-05-11 (incident cœur menu), réactivé cette session audit. **Processus** : avant toute production audio/texte MJ, grep "Max" dans briefs + code → vérifier zéro mention nominative enfant. **Fix appliqué** : mj-22.html l.254 réécriture « Bravo ! Tu connais l'Europe par cœur ! », catalog.js mj-34 reformulation « libère le tien ! ». **Raison pédago** : la parole doit adresser TOUS les enfants qui jouent (Max n'est pas seul), jamais nommer une personne particulière dans le jeu (rupture contrat confiance : jeu = pour toi, pas toi en particulier). Règle gravée : `game-mj-reviewer` Section 5 (vocab pédago) = checklist « aucune mention "Max" » · `game-conseiller` briefs = relecture systématique mention enfants nominatifs · audit tex audio préproduction = grep "Max" obligatoire.

### L-111 – Jamais deux voix en même temps, la victoire n'est pas une exception
2026-09-08, coloriage mj-32 (HO-MJ-08). À la sauvegarde d'un dessin partaient ensemble : la fanfare, une voix MP3 du casting français (`SoundPool.voice`, via `playEndSound`), et une phrase TTS dans la langue du site. Retour Papa Yann : « le son de la victoire plus 2 audios dans 2 langues, absolument pas clair ». Cause : deux couches écrites à des moments différents (la voix du pool est dans `playEndSound`, partagée par 36 jeux ; le TTS nominatif est propre au jeu) sans que personne ne vérifie ce que ça donne à l'oreille une fois réunies. Règle : une seule voix à la fois, y compris à la victoire — soit une voix, soit un enchaînement strict via la fin de l'audio précédent. Quand un jeu ajoute sa propre phrase, il coupe explicitement celle du pool (`playEndSound(..., {voice:false, onFanfareEnd})`).

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

### L-124 – Un style INLINE en JS bat la feuille : corriger le CSS ne sert à rien
**Constat** : `.mp-ghost-back` passé à 48px dans `mp-theme.css`, mesure après coup : toujours 42. **Cause** : `back-button.js` pose `width:42px` en `style.cssText` à la création du bouton — spécificité inline > feuille, le CSS n'avait aucun effet. Le savant fou, lui, n'a pas de style inline et a obéi tout de suite : c'est l'écart entre les deux qui a mis sur la piste.
**Fix** : corriger là où la valeur est réellement posée (le JS), et mettre à jour le commentaire d'en-tête du fichier qui annonçait encore « 42px ». **Règle** : une correction de dimension se VÉRIFIE par `getBoundingClientRect()` sur la page réelle, jamais en relisant le CSS — un composant injecté par JS peut se styler lui-même.

### L-125 – Une sonde d'image ratée n'est pas une panne : le smoke doit distinguer les deux
**Constat** : mj-32 rouge sur 41 `ERR_FILE_NOT_FOUND` alors que les 33 assertions métier passaient. **Cause** : le catalogue de coloriage sonde `<base>_coloriage.webp` pour les 71 dinos et les 19 plantes et retire de la grille celles qui manquent (`img.onerror`) — c'est du contrôle de flux VOULU, et 13 plantes sur 19 n'ont pas encore de lineart. Le smoke de `run.mjs` comptait chacune de ces sondes comme erreur console.
**Fix** : liste `ASSET_OPTIONNEL` dans `run.mjs`, qui tolérait déjà les consignes MP3 pour la même raison ; seul le suffixe `_coloriage.webp` est ajouté, tout autre asset manquant reste bloquant. **Règle** : avant de « réparer » un smoke rouge, lister les URL réellement en échec — la TODO annonçait 1 cause (Scelidosaurus), il y en avait 14, dont 13 par conception.

### L-127 – Le damier d'un coloriage n'était visible qu'une fois le décor derrière
**Constat** : recette de l'atelier avec décor — le dino apparaît sur un rectangle de damier gris au milieu du désert. Premiers réflexes tous faux : canal alpha du WebP (aucun, `yuv420p`), motif dessiné par le jeu (aucun `createPattern`), élément superposé (le canvas est seul), transparence du canvas (mesurée : 0 %).
**Cause** : le damier de transparence de l'éditeur a été APLATI dans le fichier source à la génération — des pixels gris 235-251 alternés avec du blanc sur 34 à 42 % de l'image, sur 6 coloriages. Sur fond blanc il est invisible ; c'est la composition sur décor qui l'a révélé, des mois après.
**Fix** : `blanchit-damier.py` ramène les pixels clairs ET neutres au blanc pur, laisse le trait noir, vérifie l'étanchéité après coup. **Règle** : un défaut d'asset peut dormir jusqu'à ce qu'une nouvelle fonctionnalité change le contexte d'affichage — et une mesure qui dit « 0 % de transparence » ne contredit pas un damier VISIBLE, elle dit seulement qu'on mesure la mauvaise chose.

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

### L-135 – Corrige L-133 : mj-55 n'était pas une histoire de temps, mais un `findIndex` à -1
**Constat** : L-133 concluait que mj-55 échouait sur une attente fixe de 80 ms, « un test sans aléa ne peut varier que par le temps ». Le raisonnement était séduisant et FAUX sur sa prémisse : cette spec contient bien un aléa — la grille de départ est tirée au hasard. Après le correctif d'attente, elle tombait encore 1 passage sur 4.
**Cause réelle** : `s0.given[0].findIndex(v => v === 0)` cherchait une case vide sur la PREMIÈRE LIGNE seulement. Quand les indices tirés la remplissaient entièrement, `findIndex` rendait -1 ; l'assertion `emptyIdx !== -1` le constatait mais le test CONTINUAIT, puis se bloquait 30 s sur `.eq-cell[data-c="-1"]`, un sélecteur qui ne peut pas exister. Même motif un peu plus bas, ligne 49, sur le bloc « conflit trio » — qui ne testait alors rien, en silence.
**Fix** : chercher la case vide dans toute la grille, sortir immédiatement s'il n'y en a aucune, et viser la ligne la plus libre pour le conflit trio. 10/10 sous charge artificielle, là où il tombait avant.
**Règle** : une assertion qui CONSTATE une précondition doit aussi ARRÊTER le test quand elle échoue — sinon l'échec réel est masqué par un timeout à 30 s trois lignes plus loin, et le diagnostic part vers le temps. Et avant d'affirmer « ce test n'a pas d'aléa », vérifier la génération des données, pas seulement les appels de test : `setDifficulty` forçait le niveau, pas le tirage de la grille.
