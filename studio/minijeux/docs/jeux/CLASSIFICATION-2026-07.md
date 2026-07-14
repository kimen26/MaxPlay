# CLASSIFICATION 100% DES MINI-JEUX — état des lieux 2026-07-14

> Produit par 3 agents de relecture (1 fiche par jeu, gameplay vérifié dans le code) + synthèse main.
> 41 jeux du catalogue actif (mj-01/13b/14 hidden exclus). Fiches détaillées en annexe.
> Proposition garder/factoriser : § « Ranger la chambre » ci-dessous — **AUCUNE fusion/suppression appliquée, tout est soumis à décision Papa Yann.**

## Vue d'ensemble par famille de mécanique

| Famille | Jeux | Moteur commun ? |
|---------|------|-----------------|
| **Compter / nombres** (8) | mj-04 passagers · mj-05 places (arith) · mj-13c rang · mj-26 dinos · mj-35 mancala · mj-43 caisses (dés) · mj-45 bus (dés ±) · mj-20 multilingue | mj-43/45 : moteur dés+solveur DUPLIQUÉ · mj-04/26 : même QCM-comptage 2 skins |
| **Lecture / phonologie** (4) | mj-06 phrase à trou · mj-23 mot→image · mj-27 syllabes dino · mj-44 boîte à sons (audio-first) | banques de mots séparées, logiques propres — progression cohérente 23→06→27 |
| **QCM reconnaissance** (7) | mj-11 drapeaux · mj-13a premier bus · mj-15 intrus · mj-16 suite logique · mj-24 ombre dino · mj-28 lampe · mj-36 bon bus | mj-13a/13c : moteur panneau LED DUPLIQUÉ · mj-24/25/28/33 : même pool ombres canon |
| **Tri / drag&drop** (6) | mj-08 rangement · mj-09 trie bus · mj-30 tailles · mj-31 frise temps · mj-40 tangram · mj-44 (aussi tri) | mécaniques distinctes, pas de duplication code |
| **Paires / memory** (2) | mj-33 memory ombres · mj-41 mahjong tuiles | patterns proches (shuffle, audio nom exclusif), pas de code partagé |
| **Puzzle plateau + solveur** (7) | mj-34 Rush Hour (BFS) · mj-37 échecs · mj-38 peg-solitaire (BFS) · mj-39 block-blast · mj-42 Shisima (IA) · mj-18 water-sort · mj-21 mélange couleurs | niveaux précalculés/solveurs — chacun unique |
| **Observation / cherche** (2) | mj-19 trouve le bus (mobile) · mj-22 carte Europe | uniques |
| **Libres — 0 étoile** (4) | mj-12 soundboard · mj-32 coloriage · mj-pose-tiles · max-adventure | pas de moteur, par design |
| **Spécial** (1) | mj-17 garage (temps réel/patience) | unique |

## Systèmes de difficulté recensés (4 régimes différents — c'est LE bazar principal)

1. **5 paliers Stars.get+1** (héritage maxStars:5) : mj-04, 05, 09, 13a, 13c, 15, 16, 18, 19 — palier = ce qui change (taille des nombres, nb d'objets, type d'opération, critère).
2. **Golden standard 3 niveaux (★★★)** : tous les jeux dino (24-31, 33, 41) + mj-34, 36, 37, 38, 40, 42, 43, 44, 45 — le régime le plus récent et le plus cohérent.
3. **Jauge/streak session** : mj-39 (lignes effacées), mj-20 (streak par langue).
4. **Fixe / modes manuels** : mj-06 (aucune progression), mj-17 (fixe), mj-11 + mj-22 (choix manuel de niveau).

## Adaptabilité thème (vision V0 : thème interchangeable bus/dino/autre)

- **Transposable FACILE** (mécanique 100% générique) : mj-06, 08, 12, 19, 23, 26, 28, 32, 35, 38, 39, 44 — candidats naturels au « 1 moteur, N peaux ».
- **Transposable MOYEN** (habillage à réécrire) : mj-05, 15, 16, 17, 18, 21, 24, 25, 27, 30, 36, 37, 40, 42, 43, pose-tiles.
- **NON transposable** (le contenu EST le thème) : mj-09 (lignes RATP réelles), 11/20/22 (monde réel), 13a/13c (panneau RATP), 29 (étymologie), 31 (chronologie), 33/34/41/45 (liant central).

## Duplications de code AVÉRÉES (vérifiées dans les fichiers)

1. **mj-13a ↔ mj-13c** : moteur panneau LED complet copié-collé (ledSVG, ficheHTML, poleHeadSVG, ALL_LINES, bus défilants).
2. **mj-43 ↔ mj-45** : constellation de dé (PIP_LAYOUT) + solveur anti-deadlock (compose(), subset-sum canReach/canSolve) quasi identiques.
3. **mj-24/25/28/33** : 4 jeux sur le même pool d'ombres canon — pas de code partagé pour le chargement/pool/audio-nom (chacun refait le sien).

## « Ranger la chambre » — proposition (à valider, rien d'appliqué)

### Garder tel quel (la grande majorité)
Chaque jeu couvre une notion distincte, même dans les familles denses : les 8 jeux de comptage travaillent 8 sous-compétences différentes (dénombrement, arithmétique, rang, subitizing, regroupement, soustraction, anticipation, multilingue). Les 7 puzzles plateau sont tous mécaniquement uniques. **Aucune suppression proposée.**

### Fusions candidates (réduire le nombre d'entrées au menu)
- **F1 — mj-13a + mj-13c → un seul jeu « Le panneau du bus » à 2 modes** (qui arrive en premier / combien avant). Même écran, même moteur déjà dupliqué, même thème, même skill (lecture du panneau). Gain : -1 entrée menu, -~500 lignes dupliquées.
- **F2 (optionnelle) — mj-28 (lampe) devient un MODE de mj-24 (trouve le dino)** : même pool, même QCM de noms, seule l'interaction change (halo vs ombre plein écran). Contre-argument : la lampe est une interaction assez magique pour mériter sa carte. À trancher au feeling.

### Factorisations (libs partagées, zéro changement visible pour Max)
- **L1 — `js/mj-dice.js`** : constellation de dé + solveur anti-deadlock, extrait de mj-43/45. Prépare aussi tout futur jeu de regroupement.
- **L2 — `js/panneau-led.js`** : fiches LED + poteau + défilé (utile même si F1 est refusée).
- **L3 — `js/dinos-ombres.js`** : pool ombres canon + tirage cousins-de-famille + audio nom exclusif, partagé par mj-24/25/26/28/33 (5 jeux).
- **L4 — moteur QCM générique** : étendre `qcm-retry.js` en vrai moteur « manche mixte 8 questions + retry/révélation + paliers » utilisé par ~10 jeux qui le réimplémentent chacun.

### Normalisation difficulté (dépend de la décision 3★ en attente)
Cible : **2 régimes seulement** — golden 3 niveaux pour tout jeu à manches · niveaux précalculés/jauge pour les puzzles. Les 9 jeux « 5 paliers » migreraient vers golden 3 niveaux en regroupant les paliers (1-2→★, 3→★★, 4-5→★★★). ⚠️ Contredit des figées « 5 paliers » (mj-05/09/18) → 🚨 CHANGEMENT DE RÈGLE FIGÉE, GO explicite Papa Yann requis.

### Pilote « 1 moteur, N peaux » (vision V0 thème interchangeable)
Candidat idéal : **mj-04 (compte les passagers) + mj-26 (compte les dinos)** — la paire prouve déjà que la mécanique marche en 2 thèmes. Extraire le moteur de comptage commun, brancher 2 peaux (bus/dino), et le 3ᵉ thème (animaux/espace) devient trivial. Si concluant, généraliser aux 12 jeux « transposable facile ».

---

# ANNEXE — Fiches détaillées par jeu

# Classification — Lot 1 (12 jeux)

## mj-04 — 👥 Compte les passagers
- mécanique : compter (QCM-tap, pilote du contrat de difficulté)
- éducatif : dénombrement 2-22, distracteurs proches (±1..±3), résistance au comptage rapide
- difficulté : 5 paliers dérivés des étoiles (Stars.get+1) — palier 1 = 2-5 passagers, palier 5 = 13-22 ; manche mixte 8 questions (4 palier courant + 4 plus faciles) ; étoile = manche 100% sans révélation
- graphisme : bus SVG (busSVG) + passagers ronds mignons en SVG custom (jamais emoji), scène arrêt de bus stylée (trottoir, poteau BUS)
- thème : bus — transposable : OUI facile (mécanique = compter des personnages ronds, re-skinnable dinos/animaux sans effort)
- recouvrement : proche de mj-05 (compter passagers/places) et mj-13c (compter des bus) ; mécanique de comptage tapotable partagée avec mj-26 (dino, compte les dinos)
- état : OK (aucun défaut trouvé, apostrophes déjà typographiques, texte fidèle au gameplay)

## mj-05 — 🪑 La bonne place
- mécanique : compter (problèmes places/monter/descendre/combo, QCM-tap)
- éducatif : arithmétique simple (soustraction, addition, combo desc+monte), lecture de schéma sièges occupés/libres
- difficulté : 5 paliers par TYPE D'OPÉRATION (pas juste par taille de nombre) — N1 places libres seules, N2 +monter, N3 +descendre, N4 monter/descendre/combo, N5 surtout combos ; manche mixte 8 questions ; étoile = 8/8 sans révélation
- graphisme : bus SVG + sièges (div grille occupé/libre) + passagers SVG ronds ; animation embarquement (sièges qui se remplissent)
- thème : bus — transposable : OUI moyen (le concept "places libres/qui montent/descendent" est bus-spécifique, mais transposable à un thème dino "nids/œufs" avec effort de réécriture des énoncés)
- recouvrement : proche de mj-04 (comptage passagers) ; mécanique de problème arithmétique avec schéma proche d'aucun autre jeu du catalogue directement
- état : textes fixés (1 apostrophe échappée `\'` → typographique dans le hint combo)

## mj-06 — 📖 Lis la phrase
- mécanique : QCM-tap (complétion de phrase à trou)
- éducatif : lecture phonétique de mots simples (noms communs), compréhension de phrase courte, 5 thèmes (animaux/objets, dino, voyage)
- difficulté : fixe — 5 questions par manche, pas de paliers étoile, pas de contrat de difficulté (aucun fichier figée)
- graphisme : texte (mots en majuscules) + emoji d'ambiance comme indice visuel, pas de bus/SVG dédié
- thème : mixte (quotidien + dino + voyage) — transposable : OUI facile (banque de phrases, thème additionnel = juste ajouter des entrées au tableau PHRASES)
- recouvrement : proche de mj-23 (Lis le mot) et mj-27 (Lis le nom du dino) — même famille "lecture phonétique QCM"
- état : textes fixés (accents manquants sur GÂTEAU/ŒUF/ÉTOILE/RIVIÈRE/GRÊLE/FUSÉE/VÉLO/BOÎTE, apostrophes échappées → typographiques, 8 mots corrigés)

## mj-08 — 🧸 Le grand rangement
- mécanique : drag&drop (tri d'objets vers bacs)
- éducatif : catégorisation (nature/ciel-sol/mode de déplacement/couleur), logique d'appartenance à une famille, piège de discrimination visuelle (manche 3)
- difficulté : 3 manches progressives — manche 1 = 2 bacs sans piège, manche 2 = 3 bacs, manche 3 = 3 bacs + objets pièges subtils ; pas d'étoiles golden (progression par manches fixes, pas par Stars.get)
- graphisme : emoji (objets bazar) + PNG silhouettes dino teintées (mask-image) pour le thème couleur ; pas de bus SVG (hors-scope thématique)
- thème : neutre/mixte (nature, espace, déplacement, dino-couleur) — transposable : OUI facile (mécanique de tri générique, déjà multi-thème en interne)
- recouvrement : même mécanique drag&drop que mj-09 (tri bus par couleur) mais objets/critères différents ; proche de mj-41 (tuiles dinos memory) sur le tri catégoriel dino
- état : OK (texte cohérent avec gameplay, pas de fautes trouvées)

## mj-09 — 🗂️ Trie les bus !
- mécanique : drag&drop (tri de véhicules vers boîtes de couleur/famille)
- éducatif : reconnaissance de couleur, catégorisation par famille chromatique (6 familles), démonstration de LIGNES RATP réelles (bus/métro/RER/tram)
- difficulté : 5 paliers dérivés des étoiles — N1 = 2 familles/4 bus, N5 = 6 familles/26 bus ; étoile = tri complet (pas de retry/erreur pénalisante, juste replacement)
- graphisme : bus SVG (busSVG) + boîtes teintées par famille + défilé final (parade) de tous les bus rangés
- thème : bus (avec métro/RER/tram) — transposable : NON directement (spécifique RATP/couleurs de ligne réelles) mais la mécanique tri-par-couleur est réutilisable telle quelle avec d'autres objets (cf mj-08)
- recouvrement : mécanique jumelle de mj-08 (drag&drop tri par catégorie) ; complète mj-21 (peins les bus) sur la reconnaissance couleur
- état : OK (texte cohérent, contrat de difficulté respecté à la lettre)

## mj-11 — 🌍 Quel pays ?
- mécanique : QCM-tap (associer nom de pays à un drapeau affiché dans la fenêtre du bus)
- éducatif : géographie (drapeaux du monde), écoute d'une salutation dans la langue locale (sensibilisation multiculturelle), lecture de noms de pays
- difficulté : 2 modes manuels (pas de paliers étoile) — "Connus de Max" (19 pays) vs "Tous les pays" (~90 pays) ; 10 manches par partie ; retry avec révélation après 3 essais
- graphisme : bus SVG avec fenêtre affichant le drapeau (flag-icons CDN), confettis drapeaux au sans-faute, écran de victoire à paliers de score
- thème : bus + monde — transposable : NON pertinent tel quel (le concept est déjà "monde/pays", pas un jeu bus à re-skinner) mais la mécanique QCM+TTS est générique
- recouvrement : même thématique que mj-22 (Trouve le pays, carte Europe) mais mécanique différente (QCM vs localisation sur carte) ; complète mj-20 (compter en 8 langues) sur l'axe multiculturel
- état : textes fixés (3 apostrophes échappées `\'` → typographiques : Côte d'Ivoire, 2 messages de victoire)

## mj-12 — 🎵 Nouveaux sons
- mécanique : autre-spécial (soundboard / bac-à-sable audio, hors étoiles)
- éducatif : découverte auditive libre (aucune notion pédagogique ciblée — jeu de détente/exploration sonore)
- difficulté : aucune (pas de manche, pas de score, pas de progression — jeu libre)
- graphisme : grille de boutons (emoji icônes) par catégorie, barre de progression audio par bouton, easter egg caché (révélé après 5 taps)
- thème : mixte (bus/synthé, Mario, Pokémon, dino, animaux, espace, fanfare) — transposable : OUI facile (déjà multi-thème, ajouter une section = ajouter des boutons)
- recouvrement : aucun autre jeu du catalogue n'est un soundboard pur ; catégorie "libre" comme max-adventure et mj-pose-tiles mais mécanique totalement différente (pas de gameplay, juste lecture audio)
- état : OK (pas de règles/consigne à valider — jeu sans texte pédagogique, juste labels de boutons corrects)

## mj-13a — 🥇 Le premier bus
- mécanique : QCM-tap (choisir le bus qui arrive en premier parmi N fiches horaires)
- éducatif : comparaison de nombres (le plus petit = premier), lecture d'affichage à compte à rebours façon panneau RATP réel
- difficulté : 5 paliers dérivés des étoiles — N1 = 2 bus/écart net, N5 = 6 bus/écart serré (1 min) ; manche mixte 8 questions ; étoile = 100% sans révélation
- graphisme : bus SVG + fiches panneau LED (chiffres façon affichage digital réel) + bus qui défilent en fond (route animée)
- thème : bus — transposable : NON directement (mécanique = panneau d'arrêt RATP, très bus-spécifique) mais adaptable à un thème "course" générique avec effort
- recouvrement : proche cousin de mj-13c (même moteur panneau/fiches horaires, question différente : "qui arrive en premier" vs "combien avant X")
- état : textes fixés (1 apostrophe échappée `\'` → typographique dans le message de révélation)

## mj-13c — 🔢 Combien avant ?
- mécanique : compter (compter les bus qui passent avant un bus cible dans une file triée)
- éducatif : dénombrement + ordre/rang (position dans une séquence triée), lecture d'affichage horaire
- difficulté : 5 paliers par TAILLE DE FILE — N1 = 3 bus, N5 = 10 bus ; manche mixte 8 questions ; boutons réponse 0..(N-1) jamais plafonnés ; étoile = 100% sans révélation
- graphisme : identique à mj-13a (fiches panneau LED, bus SVG en fond animé)
- thème : bus — transposable : NON directement (même raison que mj-13a, mécanique panneau RATP)
- recouvrement : moteur technique quasi identique à mj-13a (fiches, LED, tick, bus qui défilent) — code très probablement dupliqué entre les deux fichiers (mêmes fonctions ledSVG/ficheHTML/poleHeadSVG/ALL_LINES copiées telles quelles)
- état : textes fixés (1 apostrophe échappée → typographique + hint intro-splash "Compte les voitures" corrigé en "Compte les bus avant" — incohérent avec un jeu de bus sans voiture)

## mj-15 — 🔍 L'intrus
- mécanique : QCM-tap (repérer l'intrus parmi 5 cartes)
- éducatif : discrimination visuelle progressive (couleur → roues → famille de ligne → double critère), catégorisation implicite, aussi 2 sous-thèmes annexes (emoji-groupes thématiques, ombres de dinos teintées)
- difficulté : 5 paliers par CRITÈRE de l'intrus — N1 couleur évidente, N5 double critère subtil ; 5 manches ; retry sans révélation jamais (contrairement à d'autres MJ, ici l'intrus n'est jamais montré même après plusieurs erreurs) ; étoile = 5/5 sans erreur
- graphisme : bus SVG (majorité des niveaux) + emoji (niveau F, groupes thématiques) + PNG silhouettes dino teintées via filtre SVG feColorMatrix (niveau G)
- thème : bus (dominant) + dino/emoji en niveaux annexes — transposable : OUI moyen (la mécanique "1 intrus parmi 5" est générique, déjà mixée avec dino et emoji dans le même fichier)
- recouvrement : aucun autre jeu "trouver l'intrus" dans le catalogue ; le sous-mode dino (ombres teintées) recoupe visuellement mj-33 (memory des ombres, pôle dino) et mj-08 (thème dino_couleur)
- état : textes fixés (2 apostrophes échappées `\'` → typographiques + titre/en-tête "L'intrus" → "L'intrus" typographique)

## mj-16 — 📈 Complète la suite
- mécanique : QCM-tap (prédire l'élément suivant d'une suite logique de 3-4 bus)
- éducatif : reconnaissance de motifs (couleur ABAB/ABC/AABB, taille croissante/décroissante, suite numérique +1/+2 croissante/décroissante, carrosserie)
- difficulté : 5 paliers par TYPE DE MOTIF (du plus concret au plus abstrait) — N1 couleur ABAB seule, N5 motifs combinés ; retry jamais de révélation (la case mystère n'est remplie qu'après la bonne réponse) ; étoile = 5/5 sans erreur
- graphisme : bus SVG + variante locale busSVGBody (carrosserie recolorable) pour les motifs de couleur de carrosserie ; case mystère "?" animée en attente
- thème : bus — transposable : OUI moyen (motifs abstraits couleur/taille/nombre transposables à toute silhouette d'objet, mais le générateur "carrosserie" est bus-spécifique)
- recouvrement : aucun autre jeu "suite logique" dans le catalogue ; partage l'esprit progression-par-motif avec mj-15 (intrus, même structure de paliers et retry-sans-révélation)
- état : textes fixés (3 apostrophes échappées `\'` → typographiques : consigne visible "Qu'est-ce qui vient ensuite", phrase TTS, 2 messages de fin)

## mj-17 — 🔧 Le garage
- mécanique : autre-spécial (drag&drop d'outils vers un bus, jeu continu type "arcade patience" — pas de manches à paliers)
- éducatif : association outil→panne (essence/lavage/pneus/vitre/numéro/couleur), gestion du temps (barre de patience, zéro pénalité si le bus repart), reconnaissance de 6 types de pannes visuelles distinctes
- difficulté : fixe — 8 bus à réparer par partie, 35% de chance de double-panne simultanée par bus, pas de paliers étoile ni de Stars.get
- graphisme : bus SVG modifié dynamiquement (pneus à plat = ellipses, vitre cassée = overlay SVG, jauge essence, taches lavage, warning couleur) + étagère d'outils emoji + confettis
- thème : bus — transposable : OUI moyen (mécanique glisser-outil-vers-objet-en-panne générique, mais les 6 pannes sont conçues spécifiquement pour un bus)
- recouvrement : mécanique drag&drop proche de mj-08/mj-09 (glisser vers cible) mais avec composante temporelle (patience) unique dans le catalogue ; aucun autre jeu "réparation"
- état : OK (aucune apostrophe échappée trouvée, texte fidèle au gameplay — 2 pannes simultanées bien mentionnées dans les étapes)
## mj-18 — 🧪 Tubes de couleurs
- mécanique : autre-spécial (water-sort puzzle : verser un tube dans un autre pour trier les couleurs)
- éducatif : couleurs (nuances IDFM réelles), logique de tri, planification (tubes vides comme aide)
- difficulté : 5 paliers = nombre de couleurs à trier (2→6) + nb de tubes (4→8, toujours +2 vides). Niveau = Stars.get+1. Étoile = puzzle résolu.
- graphisme : SVG custom (tubes + gouttes animées) + bus SVG (busSVG()) dans l'animation de victoire (bus repeints avec la couleur trouvée)
- thème : bus (couleurs IDFM) — transposable : OUI moyen (mécanique water-sort est générique, mais l'animation finale bus/couleur ligne est spécifique bus ; ré-skinnable dino en changeant juste le décor final)
- recouvrement : proche de mj-21 (Peins les bus, mélange de couleurs) et mj-09 (Trie les bus, tri par famille de couleur) mais mécanique de manipulation unique (aucun autre MJ n'a de water-sort). Pas de duplication de code détectée.
- état : OK (textes déjà propres, apostrophes typographiques correctes, aucune correction nécessaire)

## mj-19 — 🎯 Trouve le bus !
- mécanique : observation/cherche (repérer et taper le bon bus parmi N bus en mouvement continu)
- éducatif : reconnaissance de numéros, attention visuelle soutenue, vitesse de réaction sans stress (zéro pénalité)
- difficulté : 5 paliers = nombre de bus (10-12 → 50-80) + vitesse (14-24 → 28-75 px/s). Niveau = Stars.get+1. Étoile = 7/7 manche parfaite.
- graphisme : bus SVG (busSVG()), animation continue (requestAnimationFrame), particules emoji à la capture
- thème : bus — transposable : OUI facile (mécanique = repérer un identifiant parmi des objets mobiles, marche avec dinos/animaux/n'importe quel sprite avec un "numéro" ou trait distinctif)
- recouvrement : proche de mj-25 (Pareil pas pareil, dino) en esprit "repère le bon parmi plusieurs" mais mécanique différente (mobile vs statique). Pas de duplication de code.
- état : OK (textes vrais, apostrophes propres, garde SpeechSynthesisUtterance présente)

## mj-20 — 🌐 Compte en 8 langues
- mécanique : autre-spécial (3 modes : Apprendre/écoute libre par chiffre, Quiz QCM audio→chiffre, Progression/dashboard)
- éducatif : nombres 1-20, prononciation multilingue (FR/EN/ES/PT-BR/DE/RU/ZH/JA), déblocage progressif par palier de maîtrise par langue
- difficulté : paliers par LANGUE (pas globaux) : 4 paliers 1-3/1-5/1-10/1-20, débloqués après 3 bonnes réponses consécutives dans la langue ; pas de système Golden standard (logique propre avec streak localStorage)
- graphisme : drapeaux (flag-icons CDN), grille de boutons chiffres, pas de bus SVG (thème neutre-langues)
- thème : neutre/mixte (langues du monde) — transposable : NON pertinent (mécanique = apprentissage numéral multilingue, pas de lien bus/dino à re-skinner, le concept EST le contenu)
- recouvrement : aucun autre MJ du catalogue ne couvre le multilingue ; proche en esprit de mj-11 (Quel pays, drapeaux) côté visuel drapeaux mais contenu totalement différent (nombres vs géographie)
- état : textes fixés (3 apostrophes droites → typographiques dans les phrases TTS "C'est/C'était" et le message de victoire) — test vert

## mj-21 — 🎨 Peins les bus !
- mécanique : autre-spécial (mélange de couleurs primaires dans un tube, victoire = tube renversé peint le bus cible)
- éducatif : couleurs primaires/mélanges (rouge/jaune/bleu/blanc → hex IDFM exacts), notion de recette/proportion
- difficulté : zone ouverte (non figée) = nb de défis (13 recettes DEFIS, de couleur primaire pure à mélanges complexes lavande/rose pâle) ; pas de paliers étoile Stars.get standard, golden:false
- graphisme : SVG custom (tubes, gouttes, confettis) + bus SVG (busSVG()) coloré à la victoire
- thème : bus (couleurs IDFM, numéros de lignes réels) — transposable : OUI moyen (mélange de couleurs est générique, mais la cible finale "peindre un bus" est spécifique ; substituable par un dino/objet à peindre)
- recouvrement : proche de mj-18 (Tubes de couleurs, même famille "manipulation de couleur"/même animation de victoire tube-qui-verse) et mj-09 (tri par couleur). Pas de duplication de code, mécaniques distinctes.
- état : textes fixés (1 apostrophe échappée → typographique dans l'overlay "C'est du marron !") — test vert, conforme au fichier figé (bus en bas, victoire sans popup, primaire seule = victoire instantanée)

## mj-22 — 🗺️ Trouve le pays !
- mécanique : observation/cherche (carte SVG Europe, taper le pays annoncé en TTS)
- éducatif : géographie Europe, vocabulaire noms de pays + articles (le/la/l'), reconnaissance visuelle de formes de pays
- difficulté : 3 niveaux fixes via query param ?level= (facile 5 pays / moyen 15 / difficile 25), pas de système Stars.get standard
- graphisme : carte SVG réelle (fetch Wikimedia Commons), drapeaux emoji 72px, pas de bus SVG (thème géographie)
- thème : monde/neutre (géographie) — transposable : NON pertinent (contenu = géographie réelle, pas re-skinnable bus/dino)
- recouvrement : proche de mj-11 (Quel pays, drapeaux) et mj-20 (langues du monde) dans la catégorie 🌍. Pas de duplication de code.
- état : ⚠️ problème — le fichier figé `docs/jeux/figees/mj-22.md` liste "micro-pays exclus : Estonie, Lituanie, Lettonie, Chypre, Malte, Luxembourg, Andorre, Monaco, Liechtenstein, Saint-Marin, Vatican, Monténégro" mais le code contient ces pays (`cy`, `lt`, `lv`, `ee`, `me`) dans l'objet PAYS et donc dans `difficile: Object.keys(PAYS)` — violation de la règle 🔒 anti-régression (zone tap < 60px pour micro-pays). Pas touché au gameplay (hors scope du brief) ; textes fixés (2 apostrophes échappées → typographiques dans les phrases TTS) — test harnais vert (le test ne couvre pas ce niveau difficile donc ne détecte pas l'incohérence)

## mj-23 — 🔤 Lis le mot
- mécanique : autre-spécial (lecture pure sans audio : mot écrit en majuscules → choisir la bonne image parmi 4)
- éducatif : lecture/déchiffrage phonétique progressif (graphèmes : réguliers → OU/ON → AI/OI/nasales → EAU/AU), vocabulaire (dinos/voyage/espace inclus)
- difficulté : 5 paliers = longueur du mot + complexité graphémique. Manche mixte 8 questions (4 niveau courant + 4 plus faciles). Étoile = 8/8 sans révélation.
- graphisme : images Twemoji (SVG CDN), texte grand format lettres espacées, pas de bus SVG
- thème : mixte (bus/dino/voyage/espace tous dans la banque de mots) — transposable : OUI facile (mécanique mot→image marche avec n'importe quel vocabulaire imagé)
- recouvrement : proche de mj-06 (Lis la phrase) et mj-27 (Lis le nom du dino, même principe lecture→image mais avec syllabes et vrais dinos). Pas de duplication de code (banques de mots et logique séparées).
- état : OK (règle FIGÉE "pas d'audio/TTS" bien respectée, textes vrais, apostrophes propres)

## mj-24 — 🦕 Trouve le dino
- mécanique : QCM-tap (ombre chinoise annoncée par nom → taper la bonne parmi 3-5 silhouettes)
- éducatif : reconnaissance de noms scientifiques de dinosaures, discrimination visuelle fine (cousins de famille en niveau élevé)
- difficulté : 3 niveaux (NCHOICES 3/4/5), niveau 0 = pool iconique restreint, niveau 2+ = force un cousin de la même famille parmi les choix. Golden standard (pips).
- graphisme : ombres chinoises PNG (img/dinos/ombres/), pas de silhouettes LimeZu (interdit par figé)
- thème : dino — transposable : OUI moyen (mécanique QCM-tap par ombre marche avec bus/animaux, mais le contenu pédagogique — noms scientifiques — est spécifique dino)
- recouvrement : très proche de mj-25 (Pareil pas pareil) et mj-28 (Lampe du paléontologue) — même famille "reconnaissance dino par ombre", mécaniques de sélection différentes (nom→image vs image→image vs halo lumineux). Pas de duplication de code (fichiers distincts, logique propre par jeu).
- état : OK (conforme au fichier figé : ombres canon exclusives, MP3 ElevenLabs avec fallback TTS, pas de score affiché)

## mj-25 — 🔍 Pareil pas pareil
- mécanique : paires/memory (matching visuel : une ombre de référence, retrouver l'identique parmi des distracteurs)
- éducatif : discrimination visuelle fine, notion de familles de dinos (cousins), attention aux détails (couleur/orientation via filtres CSS en niveau élevé)
- difficulté : 3 paliers (★ 2 choix très différents → ★★ cousins de famille → ★★★ même image avec filtre CSS/miroir, distracteur visuel subtil). Golden standard.
- graphisme : ombres chinoises PNG canon, filtres CSS (hue-rotate/scaleX) pour les leurres subtils niveau 3
- thème : dino — transposable : OUI moyen (mécanique matching visuel générique, mais le twist "cousins de famille" est spécifique à la taxonomie dino)
- recouvrement : proche de mj-24 (même pool d'ombres canon, même style QCM) et mj-33 (Memory des ombres, hors lot) — famille "reconnaissance dino par silhouette". Pas de duplication de code.
- état : OK (conforme au figé : ombres canon exclusives, jamais "Regarde" en TTS — vérifié absent du texte parlé, seulement dans le libellé écrit du panneau règle)

## mj-26 — 🔢 Compte les dinos
- mécanique : compter (N ombres de dinos affichées, taper le bon chiffre parmi 3 choix)
- éducatif : dénombrement 1 à 6, vocabulaire nombres, association quantité→chiffre
- difficulté : 3 niveaux = plage de comptage ([1,3]/[1,5]/[2,6]), tirage en "sac mélangé" pour éviter les répétitions de la même quantité. Golden standard.
- graphisme : ombres chinoises PNG canon groupées par famille, pas de silhouettes LimeZu
- thème : dino — transposable : OUI facile (compter des objets identiques est une mécanique universelle bus/animaux/dinos)
- recouvrement : proche de mj-04 (Compte les passagers, thème bus) — même mécanique de comptage QCM, contenu différent. Pas de duplication de code.
- état : OK (conforme au figé : ombres canon exclusives ; bouton "compte avec moi" = tap sur la consigne qui énumère en TTS, cohérent avec le texte)

## mj-27 — 📖 Lis le nom du dino
- mécanique : QCM-tap (lecture pure : nom du dino découpé en syllabes tapables → choisir la bonne image parmi 6)
- éducatif : lecture phonétique par syllabes de noms scientifiques longs, vocabulaire dino avancé
- difficulté : 3 niveaux via ressemblance des intrus (niveau 3 = même famille, force à vraiment lire). NCHOICES fixe à 6. Golden standard.
- graphisme : vraies images couleur des dinos (img/dinos/*.png), syllabes tapables individuellement (TTS courte par syllabe), bouton 🔊 nom entier (MP3 ElevenLabs + fallback TTS)
- thème : dino — transposable : OUI moyen (mécanique syllabes→image marche avec tout vocabulaire, mais le découpage syllabique est câblé pour les noms dino spécifiquement)
- recouvrement : proche de mj-23 (Lis le mot, même principe lecture→image mais mots courts sans syllabes découpées et sans audio du tout). Pas de duplication de code (banque SYLLABES propre à mj-27).
- état : OK (texte "consigne:false — LECTURE PURE, aucun son d'aide auto" respecté, cohérent avec gameplay réel)

## mj-28 — 🔦 La lampe du paléontologue
- mécanique : observation/cherche (halo de lumière suit le doigt dans le noir, révèle une ombre à identifier par QCM de noms)
- éducatif : reconnaissance de silhouettes par indices partiels (formes distinctives : cornes, dos épineux…), noms scientifiques
- difficulté : 2 niveaux (NCHOICES 3/4), niveau 0 = pool iconique, niveau 2+ = force un cousin de famille. Golden standard.
- graphisme : masque CSS radial-gradient sur ombre PNG (effet lampe torche), révélation couleur progressive à la victoire + fait rigolo audio (funfact)
- thème : dino — transposable : OUI facile (mécanique "lampe qui révèle une forme cachée" marche avec n'importe quel visuel à deviner)
- recouvrement : proche de mj-24/25 (même famille reconnaissance par ombre) mais mécanique d'interaction unique (halo tactile, pas de tap direct sur le sujet). Pas de duplication de code.
- état : textes fixés (1 apostrophe échappée → typographique dans la phrase TTS de victoire "C'est le [nom] !") — test harnais vert

## mj-29 — 🧩 La fabrique de noms
- mécanique : autre-spécial (assemblage de racines grecques/latines : briques mélangées à taper dans l'ordre pour reconstruire le nom scientifique)
- éducatif : étymologie des noms de dinosaures (racines grec/latin et leur sens), construction morphologique, vocabulaire savant
- difficulté : 3 niveaux (2 racines sans piège → 3 racines avec 0-1 distracteur → 3 racines avec 2 distracteurs). Golden standard.
- graphisme : slots en pointillés qui se remplissent, briques volantes animées vers leur case, révélation image dino + sens du nom à la fin
- thème : dino — transposable : NON pertinent (mécanique intrinsèquement liée à l'étymologie scientifique des noms dino, pas re-skinnable)
- recouvrement : unique dans le catalogue — aucun autre MJ ne traite l'étymologie/morphologie des noms. Pas de duplication de code.
- état : OK (textes vrais : "j'écoute quel dino construire", "je tape une brique", "plus de morceaux et de pièges" — cohérent avec pickDino/nDistract)

## mj-30 — 📏 Range-les par taille
- mécanique : tri-ordre (glisser/taper les ombres dans des cases du plus petit au plus grand, puis révélation à l'échelle réelle)
- éducatif : notion de taille/poids réels (mètres, tonnes), comparaison et tri, échelle honnête avec référence enfant 1m
- difficulty : 3 niveaux = nb de dinos (3→4) + ratio minimal entre tailles voisines (3.0→1.15, donc écarts de plus en plus subtils) + niveau 2 alterne taille/poids. Golden standard.
- graphisme : ombres chinoises PNG canon, drag & drop (pointer events) + mode tap alternatif, révélation animée avec silhouette enfant de référence
- thème : dino — transposable : OUI moyen (mécanique tri-ordre par taille est générique, mais l'échelle honnête en mètres/tonnes et la référence "enfant 1m" sont pensées pour la pédagogie dino)
- recouvrement : aucun autre MJ du lot ne fait de tri-ordre par taille réelle ; proche en esprit de mj-16 (Complète la suite, tri/logique) hors lot. Pas de duplication de code.
- état : textes fixés (1 apostrophe droite → typographique sur le bouton "C'est bon !") — test harnais vert

## mj-31 — 🌋 Le grand voyage du temps
- mécanique : tri-ordre (placer un dino-mystère sur la bonne bande d'époque d'une frise chronologique)
- éducatif : chronologie géologique (Permien/Trias/Jurassique/Crétacé/Cénozoïque), notion d'échelle de temps (le piège pédagogique T-Rex/Stégosaure jamais croisés, 85M d'années d'écart), extinction K-Pg
- difficulté : 3 niveaux = nb de bandes (4 sans permien → 5 avec permien niveau 2) + pool iconique vs complet + niveau 2 force 50% de questions "piège" (paires cousins éloignés dans le temps). Golden standard.
- graphisme : bandes colorées empilées (frise), ombres chinoises canon posées EN LIVE sur leur bande, finale météorite 4 tableaux plein écran avec voix réelle (Narrateur H + Wex)
- thème : dino — transposable : NON pertinent (mécanique intrinsèquement liée à la chronologie géologique réelle, contenu scientifique daté)
- recouvrement : unique dans le catalogue pour la chronologie ; proche en esprit de mj-13a (Le premier bus, tri temporel) hors lot mais domaine totalement différent. Pas de duplication de code.
- état : textes fixés (7 apostrophes échappées → typographiques dans les phrases de dates/finale météorite : "d'années", "n'a JAMAIS", "s'en vont", "l'écran") — test harnais vert (18 assertions passent, conforme au figé : période toujours redite, frise peuplée en live, T-Rex/Stégosaure jamais croisés, finale 4 tableaux sans gore)

## mj-32 — 🖍️ L'atelier coloriage
- mécanique : soundboard/bac-à-sable (coloriage libre par flood-fill sur canvas, sans étoiles ni échec)
- éducatif : couleurs (palette 12 teintes + gomme), motricité fine (tap pour remplir une zone), pas d'objectif pédagogique chiffré — jeu libre créatif
- difficulté : rien/fixe (golden:false, aucune progression — jeu en libre total, maxStars:0 dans catalog.js)
- graphisme : canvas HTML5 (flood-fill scanline maison), lineart WEBP par dino (img/dinos/paleoart/*_coloriage.webp), galerie localStorage avec miniatures JPEG
- thème : dino — transposable : OUI facile (mécanique flood-fill générique, marche avec n'importe quel lineart bus/animal/dino ; il suffirait de changer le dossier d'images)
- recouvrement : unique dans le catalogue — aucun autre MJ ne propose de coloriage libre. Pas de duplication de code (flood-fill maison spécifique à ce jeu).
- état : textes fixés (2 apostrophes droites → typographiques dans le titre HTML "L'atelier coloriage" ; le JS utilisait déjà la bonne apostrophe) — test harnais vert
# Classification — Lot 3 (mj-33 à mj-45 + mj-pose-tiles)

## mj-33 — 🃏 Memory des ombres
- mécanique : paires/memory
- éducatif : reconnaissance visuelle (ombre chinoise ↔ dino coloré), discrimination fine (familles "cousines" au niveau 2 : triceratops/torosaurus/pentaceratops…), noms de dinos (audio)
- difficulté : golden standard 4/6/8 paires (niveaux 0/1/2) ; niveau 0 = dinos iconiques très distincts, niveau 1 = mélange large, niveau 2 = inclut un groupe de cousins proches (discrimination)
- graphisme : images PNG (dinos couleur + silhouettes ombre PNG dédiées `img/dinos/ombres/`), cartes flip 3D CSS
- thème : dino — transposable : NON (mécanique memory générique oui, mais le contenu ombre-chinoise-dino est spécifique ; re-skinnable vers bus/autre thème avec un nouveau jeu de silhouettes)
- recouvrement : mécanique memory proche de mj-41 (Les tuiles dinos, mahjong-paires) mais résolution différente (2 cartes retournées vs tuiles libres empilées) ; pas de code dupliqué, logique propre
- état : OK

## mj-34 — 🚧 Le dépôt bloqué
- mécanique : autre-spécial (Rush Hour / glisser-bloquer, logique spatiale)
- éducatif : logique spatiale, planification séquentielle, résolution de contraintes (ordre des déplacements)
- difficulté : 3 paliers ★/★★/★★★ = grille 4×4 (2-3 coups) puis 5×5 (3-4 coups) puis 5×5 (5-6 coups) ; niveaux précalculés + vérifiés par solveur BFS ; 3 niveaux gagnés par palier = 1 étoile
- graphisme : bus SVG (`busSVG()`, couleurs `LIGNES`), grille custom avec mur/porte de dépôt dessinés en CSS/DOM
- thème : bus — transposable : NON facilement (le concept "dépôt de bus avec sortie" est le liant narratif ; la mécanique Rush Hour pure serait transposable à tout thème avec des blocs, mais perdrait le liant bus/dépôt)
- recouvrement : aucun autre MJ du catalogue ne fait du glisser-bloquer type Rush Hour ; mécanique unique dans le catalogue
- état : OK

## mj-35 — 🌱 Le jeu des graines
- mécanique : autre-spécial (mancala solo, anticipation numérique / semailles)
- éducatif : comptage, anticipation numérique (calcul mental avant action), addition implicite (distance jusqu'au grenier)
- difficulté : 3 niveaux (distance PILE-able 1-3 puis 3-6 puis 4-6 avec gros tas décoy 8-12) ; 3 "PILE !" réussis valident le palier ; niveau recalculé via stats Tracker (taux de réussite)
- graphisme : canvas/DOM CSS (trous ronds façon calebasse, graines colorées, grenier), pas de bus ni PNG
- thème : neutre (mancala africain) — transposable : OUI facile (mécanique 100% abstraite, seul l'habillage graines/calebasses est spécifique, remplaçable par jetons/bus/dinos sans toucher la logique)
- recouvrement : aucun autre MJ ne fait de mancala ; unique. Doc partagée avec mj-36 : `studio/minijeux/docs/jeux/mj-34-35-36-specs.md`
- état : OK

## mj-36 — 🚏 Le bon bus !
- mécanique : QCM-tap (association couleur + tri rapide, façon "bus jam")
- éducatif : reconnaissance de couleur, association numéro/couleur de ligne, dénombrement de groupes (passagers par lot)
- difficulté : 3 paliers — ★ 2 couleurs/8 passagers, ★★ 3 couleurs/12 passagers, ★★★ 3 couleurs/16 passagers + alternance rapide (groupes plus petits, cadence accrue)
- graphisme : bus SVG (`busSVG()`, `LIGNES` IDFM), décor CSS (garage/route/arrêt), passagers en div CSS colorées
- thème : bus — transposable : OUI moyen (mécanique "reconnaître la bonne couleur/étiquette parmi plusieurs" est générique ; l'habillage garage+route+passagers est bus-spécifique mais remplaçable)
- recouvrement : proche de mj-09 (Trie les bus, tri par couleur) et mj-19 (Trouve le bus, repérage) mais mécanique différente (file d'attente + embarquement séquentiel) ; pas de duplication de code détectée
- état : OK

## mj-37 — ♟️ Croque-échecs !
- mécanique : autre-spécial (déplacements d'échecs + « manger » les cases cibles)
- éducatif : logique spatiale, découverte des règles de déplacement des pièces d'échecs (Fou diagonale, Tour ligne droite, Cavalier en L, Dame, Roi, Pion), raisonnement combinatoire léger (mix 2 pièces)
- difficulté : 3 tiers (Fou&Tour 4×4 → Cavalier&Dame 5×5 → Roi/Pion/Mix 4×4-5×5), 20 niveaux progressifs précalculés, déblocage séquentiel (niveau suivant s'ouvre après le précédent), écran intro pièce (voix + phrase) à la 1ʳᵉ rencontre de chaque pièce
- graphisme : SVG maison (silhouettes plates avec gros yeux, pas d'emoji pièce), emoji goûters (🍎🥐🍪) sur les cases, plateau échiquier CSS
- thème : neutre (échecs) — transposable : OUI moyen (mécanique de déplacement + case-cible générique, réutilisable pour tout thème ; l'habillage "croquer un goûter" est le liant pédagogique actuel)
- recouvrement : aucun autre MJ ne travaille les déplacements d'échecs ; unique dans le catalogue
- état : textes fixés (1 apostrophe échappée `\'` → typographique dans la voiceline de la Tour) — test vert

## mj-38 — 🐑 Saute-mouton !
- mécanique : autre-spécial (peg-solitaire / saute-mouton logique)
- éducatif : logique spatiale, planification de séquence de sauts, anticipation (éviter le blocage)
- difficulté : 9 niveaux précalculés (BFS) répartis en 3 tiers ★/★★/★★★, grille 5×5 fixe, nombre de dodos croissant (2 → 7)
- graphisme : CSS/DOM (cercles radiaux "mouton"/"dodo" avec emoji visage, pas de SVG dédié, pas de bus)
- thème : neutre (moutons qui dorment) — transposable : OUI facile (mécanique peg-solitaire 100% abstraite, l'habillage mouton/dodo est cosmétique)
- recouvrement : aucun autre MJ ne fait de peg-solitaire ; unique
- état : OK

## mj-39 — 🟪 Blocs magiques
- mécanique : autre-spécial (block-blast / puzzle de remplissage de grille façon Tetris-libre)
- éducatif : reconnaissance de formes géométriques (tétromino/pentomino), anticipation spatiale, dénombrement de lignes effacées
- difficulté : paliers par jauge de session (5 / 12 / 25 lignes effacées = ★/★★/★★★), pas de niveaux discrets — la difficulté vient naturellement de la grille 8×8 qui se remplit
- graphisme : grille CSS/DOM 8×8, pièces géométriques colorées dessinées en div, drag&drop pointer events, pas de bus/dino
- thème : neutre — transposable : OUI facile (mécanique 100% abstraite type block-blast générique, aucun habillage thématique à remplacer)
- recouvrement : aucun autre MJ ne fait de block-blast ; unique
- état : OK

## mj-40 — 🦕 Tangram des dinos
- mécanique : tri-ordre (assemblage géométrique / tangram, plus proche de "puzzle-assemblage" que tri-ordre pur — catégorie la plus proche disponible)
- éducatif : géométrie (rotation, formes), reconnaissance de silhouette, persévérance spatiale
- difficulté : 3 paliers ★/★★/★★★ = 3 figures chacun (Œuf, Écaille, Cou de sauropode) avec guidage visuel décroissant (palier 1 = contours pointillés visibles, paliers 2-3 = silhouette pleine sans indice), 9 étoiles au total
- graphisme : SVG géométrique généré en JS (7 pièces tangram classiques, coordonnées vérifiées par script), pas de bus, thème dino en filigrane (silhouettes évoquant œuf/écaille/cou de dino)
- thème : dino — transposable : OUI moyen (le moteur tangram est générique — 7 pièces + solutions géométriques — seules les 3 figures cibles sont dino-spécifiques ; remplaçables par des silhouettes bus/autres)
- recouvrement : aucun autre MJ ne fait de tangram ; unique dans le catalogue (le seul jeu de pure géométrie/assemblage par pièces)
- état : OK

## mj-41 — 🀄 Les tuiles dinos
- mécanique : paires/memory (mahjong solitaire simplifié — variante de memory sans retournement de face)
- éducatif : reconnaissance visuelle de dinos, notion de "libre/coincé" (logique spatiale légère), persévérance (filet anti-blocage)
- difficulté : golden standard, 3 paliers de forme pyramidale (★ 12 tuiles/2 couches, ★★ 20 tuiles/3 couches, ★★★ 32 tuiles/3 couches) ; génération garantie 100% solvable + remélange auto si blocage
- graphisme : images PNG dinos (`img/dinos/`), tuiles avec effet de profondeur (décalage par couche z), overlay remélange animé
- thème : dino — transposable : NON facile (le concept de "tuiles empilées en pyramide, couches qui se libèrent" fonctionne avec n'importe quelle image, donc transposable en soi, mais moteur de génération partagé conceptuellement avec mj-33 — cf recouvrement)
- recouvrement : proche de mj-33 (Memory des ombres) côté "association de paires + audio nom dino", mais mécanique de fond différente (mahjong pyramide libre/coincé vs memory classique 2-cartes-retournées) ; pas de code partagé littéral mais même famille de patterns (shuffle, notePip, playDinoNomExclusive)
- état : textes fixés (description mismatch "elles se retournent" → "elles se désélectionnent", le jeu n'a pas de face cachée contrairement à mj-33) — test vert

## mj-42 — 🦎 Shisima !
- mécanique : autre-spécial (jeu de plateau traditionnel Kenya, alignement stratégique contre IA)
- éducatif : logique stratégique, anticipation (bloquer l'adversaire), notion d'alignement géométrique (ligne droite via le centre), découverte culturelle (jeu traditionnel africain)
- difficulté : 3 paliers ★/★★/★★★ = IA facile (coup aléatoire) / IA moyenne (bloque 1 fois sur 2) / IA attentive (bloque toujours + cherche à gagner) ; 2 victoires requises par palier
- graphisme : SVG plateau octogonal généré en JS (points + pions ronds avec visages), décor CSS (soleil, acacias), pas de bus
- thème : mixte (jeu du monde / Kenya, catégorie "monde") — transposable : OUI moyen (le moteur de plateau/alignement est générique, réutilisable pour d'autres jeux traditionnels ou thèmes, mais la géométrie octogonale + "point d'eau" est spécifique au Shisima)
- recouvrement : aucun autre MJ ne propose de jeu contre IA avec plateau stratégique ; unique dans le catalogue (comparable en esprit à mj-22 "Trouve le pays" pour le tag "monde" mais mécanique totalement différente)
- état : textes fixés (1 apostrophe échappée dans le `texte` de règle — corrigée en typographique ; spec Playwright mise à jour en conséquence) — test vert

## mj-43 — 📦 Remplis les caisses !
- mécanique : compter (regroupement/addition avec jetons dé et domino)
- éducatif : subitizing (constellation de dé), addition par regroupement, notion de "pile au bon compte" (ni plus ni moins), lecture de chiffre sur la caisse
- difficulté : 3 paliers ★/★★/★★★ — ★ cibles 3-6 dés simples, ★★ cibles 7-10 + dominos, ★★★ cibles 12-15 + regroupement 3 dés ou 2 dominos ; solveur anti-deadlock intégré (refuse tout coup qui rendrait le round insoluble) ; mode libre déblocable après les 3 étoiles
- graphisme : SVG maison (pips = mini-dinos en ombre chinoise en constellation, JAMAIS de rond ni d'emoji 🎲), caisses/étagère en CSS, jauge de remplissage non-numérique
- thème : neutre/mixte (dino en clin d'œil via les pips, sans thème visuel dominant) — transposable : OUI moyen (le moteur addition-par-regroupement est générique ; seuls les pips-dino sont un choix esthétique remplaçable par toute autre silhouette)
- recouvrement : moteur de constellation de dé + solveur anti-deadlock partagé conceptuellement avec mj-45 (Le bus qui se remplit) — même logique `PIP_LAYOUT`, `compose()`, subset-sum ; pas de fichier JS commun mais duplication de pattern claire entre les deux jeux
- état : textes fixés (1 apostrophe échappée dans le banner HTML statique) — test vert. Conforme au fichier figé `studio/minijeux/docs/jeux/figees/mj-43.md`.

## mj-44 — 🔤 La boîte à sons
- mécanique : tri-ordre (tri de cartes-mots par phonème dans la bonne boîte)
- éducatif : phonologie, correspondance graphie-phonème (phase alphabétique Ehri/Montessori), discrimination auditive fine (l/r puis voyelle mid-mot)
- difficulté : 3 paliers ★/★★/★★★ — ★ son initial simple (t/m), ★★ sons initiaux proches et confondus (l/r), ★★★ voyelle entendue mid-mot (ou/a) avec mot écrit MASQUÉ (anti-triche graphie-first)
- graphisme : pictos SVG maison (21 mots illustrés, self-contained, pas d'emoji ni CDN), boîtes colorées CSS
- thème : neutre (lecture/phonologie) — transposable : OUI facile (mécanique de tri par catégorie auditive générique, réutilisable pour toute autre discrimination catégorielle — couleurs, formes, etc.)
- recouvrement : aucun autre MJ ne travaille la phonologie pure par le son (mj-06/mj-23 travaillent la lecture visuelle de mots) ; unique dans le catalogue pour l'approche audio-first
- état : textes fixés (coquille "la boîte de son son" → "la boîte du bon son" corrigée dans le HTML ET dans `site/js/catalog.js` pour cohérence menu/jeu ; 2 apostrophes échappées corrigées) — test vert. Conforme au fichier figé `studio/minijeux/docs/jeux/figees/mj-44.md`.

## mj-45 — 🚌 Le bus qui se remplit
- mécanique : compter (addition/soustraction contextualisée par montée/descente de passagers)
- éducatif : comptage, addition par regroupement (montée), soustraction contextualisée (descente), subitizing (constellation de dé pour les groupes)
- difficulté : 3 paliers — ★1 montée simple (bus 6-8, cibles 3-6), ★2 montée plus grande (bus 10-12, cibles 7-12), ★3 descente (bus déjà rempli 8-12, soustraction contextuelle, cibles 2-5) ; refus doux double (débordement + cul-de-sac arithmétique via subset-sum) ; règle du prout 1/20 (easter egg sonore)
- graphisme : bus SVG (`busSVG()`, `LIGNES` IDFM obligatoire), passagers en silhouette SVG maison (tête+corps) en constellation de dé, layout écran divisé bus/arrêt
- thème : bus — transposable : NON facile (le liant "bus RATP qui se remplit/vide" est central au jeu ; la mécanique d'addition/soustraction par regroupement est générique mais perdrait son sens narratif hors contexte transport)
- recouvrement : moteur de constellation de dé + solveur anti-deadlock quasi-identique à mj-43 (Remplis les caisses) — mêmes fonctions `compose()`, subset-sum (`canReach`/`canSolve`), même pattern `PIP_LAYOUT` (dinos vs passagers) ; duplication de logique claire entre les deux jeux, pourrait être factorisée en lib partagée
- état : textes fixés (2 apostrophes échappées "À l'arrêt" → typographique, dans le HTML et le JS) — test vert. Conforme au fichier figé `studio/minijeux/docs/jeux/figees/mj-45.md`.

## mj-pose-tiles — 🦺 Pose-tes-tiles
- mécanique : soundboard/bac-à-sable (construction libre de ville avec tuiles LimeZu)
- éducatif : créativité libre, familiarisation visuelle avec les éléments urbains (route, véhicules, parc, fleurs, déco, maisons), pas d'objectif pédagogique chiffré (bac à sable pur)
- difficulté : rien/fixe — pas de paliers, pas d'étoiles (maxStars:0, access:'free'), grille redimensionnable manuellement (8×8 à 14×14) par l'enfant/parent
- graphisme : images PNG tuiles LimeZu (chargées depuis CDN jsdelivr `studio/max-adventure/public/assets/tiles/`), grille CSS responsive portrait/paysage
- thème : bus/ville (mixte : route, véhicules, parc, maisons) — transposable : OUI moyen (le moteur de pose-sur-grille est générique ; le contenu de tuiles est spécifiquement urbain/LimeZu, remplaçable par un autre tileset)
- recouvrement : aucun autre MJ n'est un bac à sable de construction ; unique dans le catalogue (catégorie "libre" avec mj-12 et max-adventure, mais mécaniques totalement différentes)
- état : OK
