# Commentaires revue mini-jeux du 2026-07-19 (extraction 2026-07-20)

> **41 commentaires MJ**, tous datés du **2026-07-19**, issus de **2 gisements disjoints** (zéro doublon entre les deux) :
>
> | Partie | Gisement | Nb | Plage horaire (UTC) |
> |--------|----------|-----|---------------------|
> | **A** | Supabase `public.annotations` (`source='comment'`, `status='nouveau'`) | 15 | 15:45 → 17:06 |
> | **B** | Export localStorage `maxplay-comments-2026-07-19.json` (jamais synchronisé) | 26 | 17:38 → 21:19 |
>
> Extraction brute, verbatim Papa Yann. Aucun tri/reformulation.
> Écarté : 19 commentaires du **2026-07-07** présents dans l'export local (vieille passe, non pertinents — décision Papa Yann 2026-07-20) + 1 entrée `source='lecture'` (narration, id 3).
>
> **Pourquoi 2 gisements** : bug documenté ([.claude/rules/mini-jeux.md](../../../../.claude/rules/mini-jeux.md)) — 32 MJ chargeaient `comments.js` sans `cloud.js`, donc `Cloud.schedulePush()` échouait en silence. Les commentaires de la partie B sont restés dans le navigateur et n'ont jamais atteint la base.
>
> Rappel process partie A : quand un retour est traité → `update annotations set status='traite', resolution='…+commit', traite_le=now()`.
> La partie B n'a **pas** d'équivalent en base — le suivi de traitement se fait ici, dans ce fichier.

---

# PARTIE A — Supabase `annotations` (15)

## Synthèse rapide

| MJ | id | Verdict exprimé | Idée clé |
|----|-----|-----------------|----------|
| mj-09 | 782 | Garder + prioriser | Tri générique multi-asset ; **variante lettres cursives/majuscules/scriptes** |
| mj-18 | 1056 | Garder | Jeu adoré, affiner game design/style, catégorie dextérité/réflexion |
| mj-21 | 900 | Garder + étendre | Variantes coloriage dino atelier/avatar, 2-3 palettes par dessin |
| mj-24 | 4 | Garder + polir | Son d'erreur (prout), dino détouré en récompense, animation finale |
| mj-25 | 16 | **Dégager** | Trop simple, 0 pédagogie ; garder l'idée « Où est Charly ? » dino |
| mj-26 | 56 | **Dégager** | Pas d'apport ; garder idée dé/domino avec miniatures ombres dino |
| mj-27 | 83 | Fusionner | Découpage syllabes, retirer l'audio, images cassées, vraies photos dino |
| mj-28 | 124 | Garder | Bruit/objets, lampe plus petite+forte, **question de fonte globale** |
| mj-29 | 185 | **Dégager** | Doublon + pas fluide |
| mj-30 | 235 | Garder en bonus | Réservé niveau difficulté/connaissance dino avancé |
| mj-31 | 312 | Garder | Max a ses 3★ ; variante continents ; **SVG continents à refaire** |
| mj-32 | 661 | Garder | Galerie non compressée (JSON zones/couleurs), quotas 3 gratuit / 5-10 compte |
| mj-33 | 388 | **Supprimer** | Garder le principe mémory, regrouper les thèmes ailleurs |
| mj-40 | 475 | À tester | Fonctionne enfin ; catégorie logique/géométrie dans l'espace ? |
| mj-41 | 561 | Garder au chaud | Images cassées, difficulté nulle, pas d'affichage en V1 |

---

## Commentaires verbatim (partie A)

### mj-09 — id 782 · 2026-07-19 16:52 UTC

> oui tri en génral on fera un jeu générique comme ca avec multi asset. on peut AUSSI (très bonne idée) avoir des boite avec une lettre cursibe, et les lettre à trier c'est des cursive des normal simple majuscule etc, tu sais genre le A on peut avoir des A majuscule pointu ou arrondi, des a un rond et un trait, des a comme écrit ici genre un e à l'envers, et des cursive simple ou majuscule ca serait un super moyen d'apprendre et de voir les différence de d b h j k dans les cursif ou non, jeu à mettre en priorité dans la lecture avec le clavier (faut que les jeux soit fun qdm mais c'est très intéressant pour apprendre à reconnaitre ses lettres difficile)

### mj-18 — id 1056 · 2026-07-19 17:06 UTC

> Pareil jeu génial adoré par Max, à revoir si on peut affiner un peu le game design et style mais oui en minigame "sans pédagogie" autre que dextérité, stratégie, reflexion (on peut mettre réflexion en fait). en tout cas cv'est un tres bon jeu, pour adulte et enfant, et max y est arrivé très vite très facilement jusqu'a 8 9 tubes

### mj-21 — id 900 · 2026-07-19 16:53 UTC

> Génial, possibilité de le mettre en variance et de décorrer un dino de l'attelier ou du avatar par exemples; préparer 1 2 3 couleur pour un meme animal/dessin ca serait chouette

### mj-24 — id 4 · 2026-07-19 15:45 UTC

> ouais très bien, c'est sympa d'avoir le son qui continu derrière tant que tu appuie pas sur la bonne réponse. on entend pas bien quand on a fauté, vu le texte par dessus, peut etre mettre un son de prout serai mieux.
>
> En tout cas ce jeu est apprécié de max, facile (on peut augmenter le nombre de case), et sympa, le but de reconnaitre l'ombre est top. Pkoi pas ajouté le dino bien détouré qui s'affiche quand on a trouvé du 1er coup ? ou à la fin l'animation avec tous les dino retrouvé bien détouré qui s'affiche avec un applaudissement

### mj-25 — id 16 · 2026-07-19 15:49 UTC

> Alors nan là y'a 0 difficulté, soit on fait genre un ou est charly et t'en mets plein avec des couleurs ou rayure et sa bouge (un peu comme trouve le bus), soit ca dégage, mais là c'est trop simple et aucun gain pédagogique, comme on est en quete de purge, CA DEGAGE ! (note l'idée d'un où est charly le dino qdm)

### mj-26 — id 56 · 2026-07-19 15:51 UTC

> Alors ca m'a l'air bien simple et pas d'apport de regroupement visuel où autre, je pense qu'on a bien mieux après, et afficher les ombre seulement pour ca n'a pas d'intéret meme si ca rendait bien. j'ai toujours l'idée d'un dé ou domino avec les mignature de dino ombres à la place des points !

### mj-27 — id 83 · 2026-07-19 15:54 UTC

> Alors ouais pkoi pas avec le découpage en syllabe, il serait à fusionner avec les nouveau jeu, écriture cursive, ne pas avoir un bouton pour entendre le son complet (ou alors juste la 1ere syllabe (avec la bonne prononciation)... Attention les images ne s'affichent pas, et je le redis mais l'audio est à retirer. ici plutot image de vrai dino directement ? (du coup surement à fusionner avec

### mj-28 — id 124 · 2026-07-19 15:58 UTC

> Celui la je le trouve génial (dans l'idée... peut etre ajouter du bruit, des object & co, lampe plus petite et plus force c'est possible ? par contre il est sensé pouvoir lire directement les nom des dinos ... pkoi pas ca me va à définir quelle font on mets (il est plus à l'aise sur full majuscule ou normal que les cursives) là c'est question en général, il faut qu'on définissent une logique, partout, que la lecture, possibilité de changer "facilement" ? , in game ?

### mj-29 — id 185 · 2026-07-19 16:29 UTC

> beuuhhh on en a déjà un qui fait ca.. et c'est pas fluide du tout, on dégage

### mj-30 — id 235 · 2026-07-19 16:30 UTC

> Je pense que ca peut etre très intéressant mais dans un monde plus loin dans la difficulté et connaissance des dino (on garde mais en "bonus" ultra fan

### mj-31 — id 312 · 2026-07-19 16:31 UTC

> Celui la est aussi difficile mais max adore, il a déjà ses 3 étoile large !!! ca serait bien d'avoir une variante avec les continents !!! d'ailleur, il faut revoir le svg ou mini représentation des continents les 5 6 patate qu'ons a today sur les fiches c'est vraiment pas ouf !

### mj-32 — id 661 · 2026-07-19 16:41 UTC

> Ca c'est trop top, par contre bien garder en mémoire la galerie, et surtout pas compresser les dessin de la galerie, on a le droit d'en garder que 3 en "gratuit" 5 ou 10 en juste créé un compte. Gros point noir quand on va dans la galerie on doit pouvoir redessiner avec mais il faut pas avoir compresser le dessin, on garde en json ou je sais pas quoi quel couleur dans quel zone, chaque dino à x zone de couleur... c'est pas trop lourd nan ?  (pcq today je retourne dedans le dino était bleu, bah en fait je le change de couleur et le détourage est baveux dégueulasse).
>
> ca c'est un jeu générique y'a pas d'étoile et d'avancement

### mj-33 — id 388 · 2026-07-19 16:33 UTC

> Alors là pour le moment on s'en fou un peu, ou en tout cas on pourra regrouper tous les style et véhicule et animaux, fleure je sais pas quoi là dedans stp. donc on supprime celui là, mais on garde l'idée général du mémory

### mj-40 — id 475 · 2026-07-19 16:35 UTC

> Alors lui n'a jamais fonctionné et là il fonctionne, donc à faire tester pkoi pas, dans des jeux générique ou de logique "manipulation" géométrie dans l'espace (voir une nouvelle catégorie ?)

### mj-41 — id 561 · 2026-07-19 16:36 UTC

> les images ne s'affichent pas, par contre lui j'ai pas compris la difficulté, j'ai bien compris que c'était le Majong c'est surement niveau 1 ou 0, mais c'est juste très simple, et pas sur que ca plaisent... à garder dans un coin, jeu du monde nan ? pour le moment V1 pas besoin d'afficher je pense

---

## Requête d'extraction (partie A)

```sql
select id, game_id, source, status, created_at, resolution, traite_le, text
from public.annotations
order by game_id nulls last, created_at;
```

---
---

# PARTIE B — Export localStorage (26)

> Fichier `maxplay-comments-2026-07-19.json` (export via [site/suivi.html](../../../../site/suivi.html), clé `localStorage['maxplay_comments']`).
> Filtré sur le **2026-07-19** uniquement (17:38 → 21:19 UTC). Les 19 entrées du 2026-07-07 sont écartées.
> **Jamais montés en base** (bug `cloud.js`). Verbatim corrigé du mojibake UTF-8 (`Ã©`→`é`) uniquement — commentaires dictés à la voix, formulations bruitées laissées telles quelles.

## Synthèse rapide (partie B)

| MJ | Heure UTC | Verdict exprimé | Idée clé |
|----|-----------|-----------------|----------|
| mj-04 | 17:38 | **Supprimer maintenant** | Très moche ; les tempêtes faites avec Kimi sont bien mieux |
| mj-13c | 17:42 | Garder + redesigner | Panneau d'affichage, regrouper avec les 2-3 jeux similaires |
| mj-05 | 17:55 | **Supprimer, garder l'idée** | X personnes / X places / combien montent → intégrer ailleurs |
| mj-35 | 17:57 | Garder + refonte totale | Règle très mal expliquée, revoir game design + animation |
| mj-43 | 17:58 | Garder le fond | Remplir avec des blocs ≈ rendre la monnaie ; lignes de 10 |
| mj-45 | 17:58 | **Supprimer** | Même principe que mj-43 (remplir bus/boîte) |
| mj-06 | 18:01 | Garder + enrichir | Ajouter cursives, mixer avec « lis le nom du dino », phrases à impact |
| mj-23 | 18:04 | Refondre | Très répétitif ; cursive + majuscule, syllabes simples, 1 jeu initiatique + 1 dynamique |
| mj-44 | 18:08 | Fusionner | Revient à trier les bus / boîte + lettre ou couleur |
| mj-13a | 19:45 | Garder + corriger | Difficulté 0 ne doit pas être « 0×2 min » ; expliciter les 2 modes |
| mj-15 | 19:46 | Garder | Bon niveau stratégie ; intrus discret (1 herbivore parmi carnivores) ; monter les assets |
| mj-16 | 19:47 | **Supprimer** | Ligne s'affiche mal, pas logique, pas trouvable |
| mj-34 | 19:55 | Garder + refondre UX | Pas clair qu'un seul bus sort ; **suivi d'avancement cassé** (3 niveaux puis reset à zéro) |
| mj-37 | 19:56 | Garder en jeu du monde | **Vraies pièces d'échecs + plateau entier**, pas le bonhomme qui mange des pommes |
| mj-38 | 19:57 | Garder en jeu du monde | Idem : vraies dames + plateau entier + règle expliquée |
| mj-39 | 19:59 | Revoir game design | Tetris confus ; soit tangram à remplir, soit vrai Tetris qui descend |
| mj-19 | 20:00 | Garder (très bien) | Décliner dino/lettres/mouvant ; **fusionner les « trouve le X »** en un grand écran |
| mj-36 | 20:01 | **Supprimer en attendant** | Pas de difficulté/choix ; garder l'idée |
| mj-08 | 20:03 | Fusionner | Rangement en boîtes (lettres/bus/n'importe quoi) — déjà présent ailleurs |
| mj-17 | 20:48 | Garder | Un des préférés de Max (réparer le bus) ; voir adaptation dino |
| mj-11 | 20:51 | **Écarter + noter l'idée** | Préfère les continents ; plusieurs drapeaux, situer, animal du pays, fiches pays |
| mj-22 | 20:52 | À tester | N'a jamais marché donc jamais joué ; montrer le drapeau à la victoire + musique |
| mj-20 | 21:08 | Très bon jeu + corriger | Trop de pays ouverts dès le début, compter jusqu'à 10 direct ; ouvrir 1-2 pays à la fois ; langues plus tard |
| mj-42 | 21:17 | Revoir | Gagné immédiatement en se mettant au milieu ; idée contourner/traverser (style backgammon) à garder |
| mj-12 | 21:18 | **Sans intérêt** | À basculer en jeu libre avec le dessin et les vidéos, juste pour écouter |
| mj-pose-tiles | 21:19 | **Retirer du menu principal** | Avec Max Adventure → écran parental / mot de passe |

---

## Commentaires verbatim (partie B)

### mj-04 — 2026-07-19 17:38 UTC

> C'est très très moche on peut le retirer immédiatement les tempêtes qu'on a fait avec Kimi sont beaucoup mieux avec les regroupements avec les avatars et toutes ces choses qu'on peut supprimer sans aucun souci celui-ci

### mj-13c — 2026-07-19 17:42 UTC

> parle à l'idée est intéressante de ce panneau d'affichage avec les trucs je crois qu'on a deux trois jeux qui vient le plus vite dans combien de temps et cetera.  pour savoir pour combien peut-on il y a aussi un truc qui était direction.  mon courrier des choses à faire mais peut-être c'est regrouper normal que c'est pas trop. On garde mais a redesigner

### mj-05 — 2026-07-19 17:55 UTC

> Par le fond du fond et d'intéressante le fait d'avoir x personnes x place et combien peuvent monter machin je pense ça peut être intéressant mais intégrer dans les autres trucs qu'on avait avec Jimmy du coup le supprimer directement garder l'idee

### mj-35 — 2026-07-19 17:57 UTC

> Alors là on est sur un des mini jeux du monde par contre alors oui la règle est très mal expliqué est-ce qu'à chaque fois qu'on déplace de 1 ça laisse tomber une graine donc en fait faudrait revoir totalement la règle du jeu et l'animation et les petits pots et les machins je pense que c'est intéressant et juste il faut revoir totalement le game design

### mj-43 — 2026-07-19 17:58 UTC

> Là aussi le jeu de l'idée du fond est intéressant de devoir remplir avec plusieurs blocs pour faire un site et de voir que si je mets je m'éclate il reste 2 enfin c'est un peu rendre la monnaie aussi c'est un peu ce style là donc oui le fond est intéressant par contre on va on va retravailler avec les peut-être les lignes de sacre de 10 que son avis avec Timmy mais l'idée de rempli pour atteindre ce nombre et intéressant

### mj-45 — 2026-07-19 17:58 UTC

> Harcèle même que le mini juste avant après les autres remplir le bus de remplir une boîte et de remplir je sais pas quoi avoir c'est intéressant parce que c'est le même principe donc on peut supprimer

### mj-06 — 2026-07-19 18:01 UTC

> Donc ça c'est pas mal il faut ajouter les écritures cursive et juste le petit logo icône c'est pas mal pour retrouver. Oui j'aime bien avoir parce qu'elle a déjà des choses des choses qui ressemblent avec lis le nom du dinosaure donc là on a plus de variance avec les emoji, a certainement mixer et ajouter des phrase percutante pour faire rire ou impressionner avec impact

### mj-23 — 2026-07-19 18:04 UTC

> Très répétitif encore donc avoir donc il faut l'écrire cursive évidemment majuscule pas mal mais peut-être que c'est le premier niveau discuter au lieu de la phrase mettre ça directement juste un mot avec des syllabes simples je pense que le point d'intéresser est-ce que on est sur des silates sainte-martin ou bien mou mon mais c'est comme ça point donc il va falloir regarder pour tous les trucs de lecture avoir un ou deux jeux peut-être un jeu initiatique et un jeu un peu plus dynamique in game

### mj-44 — 2026-07-19 18:08 UTC

> Idée bonne elle a reprises par Kimi aussi mais c'est peut-être mieux de ranger dans les bois d'après ça redevient ça revient à trier les bus soit rentré les lettres sont pris le premier mot de la lettre le son et du coup ben pour revenir à une boîte avec une lettre ou un machin et tu mets soit des lettres soit des couleurs de bus soit des machins

### mj-13a — 2026-07-19 19:45 UTC

> Celui-là est pas mal par contre le numéro de difficulté 0 il faut pas que le premier bus soit 0 fois 2 minutes et pourquoi pas le mélanger avec un autre jeu qui arrive en deuxième ou combien de bus avant le xxx par contre à voir ce mail de styles de jeux dans un jeu au niveau des règles de bien expliciter qu'il y a deux modes de jeux potentiellement ou alors c'est un niveau différent

### mj-15 — 2026-07-19 19:46 UTC

> S'il est bien niveau stratégie casse-tête tout ça bien garder le niveau de difficulté ou c'est pas évident qu'à 5 trucs non à rien truc vert mais quelque chose de discret genre que des carnivores et un végétarien que des pâtes bleues et l'auteur là c'était une roue qui était jaune et l'autre c'était noir donc bref la logique est pas mal juste monter les asset

### mj-16 — 2026-07-19 19:47 UTC

> Joyeux anniversaire du coup tu peux le supprimer la ligne ne s'affiche pas bien et c'est pas logique c'est pas facile à trouver

### mj-34 — 2026-07-19 19:55 UTC

> Et ce mini jeux est intéressant par contre le niveau de difficulté d'incompréhensible et le fait que tous les bus qui sont actifs c'est pas hyper clair qu'il y en a que un qui doit sortir je passerai éteindre les autres ou mettre des cailloux à la place ou je sais pas quoi mais c'est pas clair que il y en a un il doit sortir et ensuite le niveau de difficulté faut reparler et pareil il y a que 3 il y a que trois niveaux par étoile une fois qu'on a fait les trois toile ça repart à zéro ça c'est n'importe quoi le suivi de l'avancement dans ce jeu donc il est intéressant mais retravailler sur l'expérience utilisateur et design

### mj-37 — 2026-07-19 19:56 UTC

> Alors je veux bien niveau 1 des animaux zéro des échecs par contre là le petit bonhomme qui mange des pommes et des machins c'est pas du tout le but non tu mets des vraies pièces d'échec avec un plateau entier d'échec par 4 par 4 ça veut rien dire et après expliquer que chaque pièce fin quand tu as une pièce à jouer tu dis le fou je déplace comme diagonale la tour se déplace que comme ça et voilà c'est tout faut que je sois plus simple et qui est pas un quadrillage au début on avance normalement au niveau de difficulté c'est passé un cheval ou faire de manger deux choses je sais pas mais là le petit bonhomme moche qui mange des pommes vraiment pas donc à garder en tant que jeu du monde mais à revoir totalement le design pas la peine de faire enfantin ça je déchèques ça je défèque pas la peine de faire ou alors on refait tout avec des dinosaures qui a un cheval et Machin mais dans un premier temps juste des pièces d'échec normal

### mj-38 — 2026-07-19 19:57 UTC

> Même remarque que pour les échecs ça je dame en fer jeu de dames on fait pas un jeu de petit bonhomme qui saute par-dessus des trous du cul et qui s'appelle saute-mouton non si c'est des dames et des dames et le plateau entier et cetera on explique la règle du jeu on donne des indices mais un jour d'amour je pars n'importe quoi

### mj-39 — 2026-07-19 19:59 UTC

> J'imagine que tu as voulu faire Tetris pareil le fait de juste remplir je sais pas ça me tente moyen soit tu fais un truc ou pas peut-être plus simple pour commencer en tout cas le niveau 1 un truc qui se ferme tout seul il faut tout remplir et c'est un genre de tangram machin soit tu dois faire des lignes et c'est un Tetris mais du coup ça doit descendre les tu peux pas les enfin je sais pas ça me perturbe si tu veux un peu réfléchir au Game design à X je sais pas pourquoi pas mais là on était on comprend pas ce qu'il faut faire

### mj-19 — 2026-07-19 20:00 UTC

> On a plusieurs jeux où il faut trouver les éléments donc là je trouve qu'il est très bien pourquoi pas mettre la même chose avec les dinosaures même chose avec des lettres la même chose avec des choses comme ça que ça bouge pourquoi pas vraiment je le trouve bien par contre il peut il doit être fusionné plusieurs avec plusieurs autres jeux de trouve le dans un grand écran

### mj-36 — 2026-07-19 20:01 UTC

> Du coup ce jeu-là il est intéressant dans le fond c'est à dire il y a des personnages qui attendent tel bus et du coup faut que le bus arrive mais là le bleu attend bleu enfin j'ai l'impression qu'il y a pas de difficulté ou de stratégie à voir c'est juste faut appeler bah tous les bus qui sont déjà disponible il y a pas donné choix ou d'erreur ça me paraît intéressant garder l'idée mais à retravailler donc supprime ce jour en attendant

### mj-08 — 2026-07-19 20:03 UTC

> Ils sont déjà dit rangement dans les boîtes soit des lettres sur des fibres sur des bus soit des tout n'importe quoi on peut tout faire dedans donc oui à fusionner avec plusieurs autres qui ont déjà ça

### mj-17 — 2026-07-19 20:48 UTC

> Ce mini jeux est-elle un des préférés de Max le fait de pouvoir réparer le bus avec différentes options il a toujours bien aimé après il a un peu perdu de vue à voir si on peut l'adapter au dinosaure ou à d'autres choses mais sinon je le laisser en tant que pure option que des trucs en dur placer toujours au même endroit

### mj-11 — 2026-07-19 20:51 UTC

> Alors celui-là c'était plus un jeu de lecture au final mais pas trop trop accroché faudrait voir je pense qu'il préfère les continents et voir les trucs où sont les pays mais les drapeaux il aime beaucoup mais ouais je parle ça mal pris de t'avoir plus de plusieurs draps en même temps voir où ils sont situés expliquer quel animal est dedans je sais pas peut-être faire des fiches sur les sur les pays peut-être pas dans un premier temps donc tu peux écarter ce jeu et noter l'idée

### mj-22 — 2026-07-19 20:52 UTC

> Alors cela je pense qu'il est intéressant par rapport à ce que je dis sur l'autre il a jamais marché en fait il a jamais joué avec celui qui marche donc avoir à tester et voir la victoire lui a montré le drapeau quand tu gagnes exetera peut-être faire une musique ou quelque chose je sais pas

### mj-20 — 2026-07-19 21:08 UTC

> Parce que il a beaucoup et mets aussi elle a voulu jouer plein de fois mais il savait pas que ça n'est pas bon il y a trop de il y a trop de pays disponibles dès le début et il faut compter jusqu'à 10 tout de suite mais en chinois c'est très dur de couper le caddie tout de suite il faudrait faire différemment plus d'étapes plus de que un ou deux pays d'ouvert une chose comme ça mais.... Donc très bon jeu on verra plus tard les langue differente

### mj-42 — 2026-07-19 21:17 UTC

> J'ai pas compris parce que au démarrage si je me mets au milieu j'ai gagné immédiatement et du coup c'est un peu bizarre de jouer à ça donc le fond du jeu est difficilement compréhensible mais je pense qu'il y a d'autres versions genre un peu backgammon des choses comme ça ou d'autres formes c'est comme dans squid game un genre de trucs comme ça où il faut traverser ou faire le tour des choses comme ça avec je pense que ce genre de jeu ce serait intéressant parce qu'il y a pas grand-chose à comprendre mais la mécanique se fait toute seule au bout d'un moment donc avoir ce jeu-là en tout cas 0 moi essayer de jouer il y a pas de on comprend pas l'intérêt mais l'idée de déplacer de faire le tour de contourner ça intéressant à voir dans un niveau stratégique si tu arrives à trouver ou faire quelque chose

### mj-12 — 2026-07-19 21:18 UTC

> Ça y a pas trop d'intérêt on a qu'à le mettre avec le dessin des vidéos en jeu libre pour juste écouter les trucs tu vois mais il y a aucun intérêt

### mj-pose-tiles — 2026-07-19 21:19 UTC

> Ça et Max adventure on le on le vire de l'écran principal à la limite on peut avoir un écran dans le truc parental ou avec un mot de passe on peut voir comme ça je pourrais débloquer mais l'écran principal de menu principal ça dégage

---

## Couverture de la revue

**41 jeux commentés** le 2026-07-19 :

`mj-04` `mj-05` `mj-06` `mj-08` `mj-09` `mj-11` `mj-12` `mj-13a` `mj-13c` `mj-15` `mj-16` `mj-17` `mj-18` `mj-19` `mj-20` `mj-21` `mj-22` `mj-23` `mj-24` `mj-25` `mj-26` `mj-27` `mj-28` `mj-29` `mj-30` `mj-31` `mj-32` `mj-33` `mj-34` `mj-35` `mj-36` `mj-37` `mj-38` `mj-39` `mj-40` `mj-41` `mj-42` `mj-43` `mj-44` `mj-45` `mj-pose-tiles`

## Thèmes transverses qui reviennent

1. **Fusion massive** — trop de jeux font la même chose : les « trouve le X » (mj-19 + autres), les « range en boîtes » (mj-08, mj-09, mj-44), les « remplis pour atteindre N » (mj-43, mj-45). Une mécanique générique multi-asset (bus / dino / lettres / emoji) plutôt que N jeux quasi identiques.
2. **Écriture cursive** — demandée sur mj-06, mj-09, mj-23, mj-27. Couplée à la **question transverse de la fonte** (mj-28) : majuscule vs script vs cursive, logique unique partout, switch in-game ?
3. **Jeux du monde à faire sérieusement** — échecs (mj-37) et dames (mj-38) : vraies pièces, plateau entier, règle expliquée. Pas de déguisement enfantin.
4. **Purge assumée** — mj-04, mj-05, mj-16, mj-25, mj-26, mj-29, mj-33, mj-36, mj-45 sortent ; l'idée de fond est conservée pour plusieurs.
5. **Assets à monter en gamme** — SVG continents (mj-31), assets de mj-15, images cassées (mj-27, mj-41), détourage baveux de la galerie (mj-32).
6. **Suivi d'avancement défaillant** — mj-34 : 3 niveaux par étoile puis reset à zéro.
7. **Menu principal à nettoyer** — mj-pose-tiles + Max Adventure derrière un écran parental.
