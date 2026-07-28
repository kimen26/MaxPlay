# SPEC — La montée de niveau (le jeu suit l'enfant)

> **Demande Papa Yann (2026-07-28)** : « si les 2 premières réponses sont correctes, on augmente un peu ; si niveau 2 est moyennement maîtrisé on retente le 1 mais il aura sûrement 1 étoile quand même… là faut vraiment concevoir, imaginer, ça doit être défini, expliqué, la meilleure manière. »
>
> **Statut** : CONCEPTION — rien n'est codé. Attend le GO de Papa Yann sur les 7 points ci-dessous.
> **Lève l'arbitrage B** du plan de remise au propre (`2026-07-28-plan-remise-au-propre.md` §3).
> **Remplace** la règle figée `niveau = Stars.get(id) + 1` — voir §7 pour la formulation exacte des amendements.

---

## Le problème en une phrase

Aujourd'hui l'enfant ne peut monter d'un niveau **qu'en faisant une partie entière sans une seule erreur**.
Tant qu'il n'y arrive pas, il rejoue **exactement le même niveau 1**, indéfiniment.

C'est un piège à deux verrous :

- **Verrou 1** — l'étoile exige la perfection (toutes les réponses du premier coup). Une seule hésitation sur 4 questions et la partie ne compte pas pour la progression.
- **Verrou 2** — le niveau est *dérivé* de l'étoile. Pas d'étoile = pas de niveau. Il n'existe aucun autre chemin.

Résultat concret : un enfant qui répond juste à 7 questions sur 8, trois parties de suite, est objectivement bon au niveau 1 — et le jeu lui redonne le niveau 1 une quatrième fois. Il s'ennuie, et l'ennui à cet âge se traduit par « il ne veut plus jouer à ce jeu ».

**Le principe qu'on pose** : l'étoile reste la récompense de la perfection, mais elle cesse d'être la **seule porte** vers le niveau suivant. On ouvre une deuxième porte : **savoir faire**.

---

## 1. Intra-partie ou inter-parties ? — TRANCHÉ : les deux, mais pas pour la même chose

C'est la question la plus importante, et l'intuition de Papa Yann (« 2 bonnes réponses → on augmente ») est **juste sur le fond, mais dangereuse telle quelle**. Voici pourquoi, et ce qu'on en garde.

### Ce que dit la recherche

La règle classique en difficulté adaptative pour jeunes enfants est **3 réussites d'affilée → on monte d'un cran** (skill `game-design-enfant` §5). Pas 2. La raison est arithmétique : sur un choix à 3 ou 4 réponses, un enfant qui répond **au hasard** a environ 1 chance sur 9 à 1 sur 16 de réussir 2 fois de suite. Ça arrive tout le temps. À 3 réussites, on tombe à 1 chance sur 27 à 1 sur 64 — là, ce n'est plus de la chance, c'est de la compétence.

Deux bonnes réponses, ça ne prouve rien. Trois, si.

L'autre point vient de Vygotski (zone proximale) et du flow : ce qui fait progresser, c'est **une difficulté qui monte juste au-dessus du niveau actuel, et qui reste stable assez longtemps pour qu'on s'y installe**. Une difficulté qui change toutes les deux questions ne laisse jamais l'enfant s'installer. Il ne construit pas de méthode, il subit.

### Le vrai risque de l'adaptation intra-partie « pure »

Si le jeu durcit en cours de partie dès que ça va bien, on crée mécaniquement ce que les chercheurs appellent une **spirale de punition invisible** :

> Max répond bien → le jeu devient plus dur → Max se trompe → le jeu redevient facile → Max répond bien → ça redurcit…

Du point de vue de l'enfant, la logique perçue est terrible : **« quand je réussis, ça devient plus dur ; quand je rate, ça devient plus facile »**. À 4 ans, il ne verbalise pas ça, mais il le ressent. C'est exactement l'inverse du message qu'on veut faire passer, et ça contredit frontalement la règle « zéro pénalité punitive ». Le succès ne doit jamais avoir l'air d'être puni.

Deuxième problème : **la partie devient illisible**. Aujourd'hui une partie = 4, 6 ou 8 questions et une piste de billes qui dit où on en est. Si le niveau bouge au milieu, deux billes côte à côte ne veulent plus dire la même chose, et l'écran de fin ne peut plus dire honnêtement « tu as réussi le niveau 2 » — parce que la partie n'aura pas eu *un* niveau.

### La décision

| Échelle | Ce qui bouge | Pourquoi |
|---|---|---|
| **Entre les parties** | **Le niveau** (1 → 2 → 3). Décidé une fois, au démarrage de la partie, et **il ne bouge plus jusqu'à la fin.** | Stabilité : l'enfant s'installe, la piste de billes garde son sens, l'écran de fin reste vrai. |
| **Pendant la partie** | **Le mélange des questions** (combien de faciles / combien de dures dans la manche), déjà prévu par la règle figée. Plus une aide qui se déclenche à la 2e erreur consécutive. | On peut soulager ou relancer un enfant sans jamais changer l'étiquette de la partie. |

**Ce qu'on garde de l'intuition de Papa Yann** : oui, on réagit vite. Mais on ne réagit pas en changeant le niveau — on réagit en changeant **quelles questions on tire dans le sac**. Le résultat ressenti est le même (« ça s'ajuste tout de suite »), sans aucun des dégâts.

Concrètement, dans une manche de 8 questions au niveau 2 (4 questions niveau 2 + 4 questions plus faciles, règle figée mj-04) :

- Si les **3 premières réponses sont justes du premier coup** → les questions restantes qui devaient être « faciles » sont remplacées par des questions du niveau courant. La manche devient plus dense sans changer d'étiquette. C'est la réponse directe à « on augmente un peu ».
- Si **2 erreurs arrivent coup sur coup** → l'inverse : les questions restantes basculent vers le niveau du dessous, et l'aide (indice de méthode) se déclenche plus tôt. La partie se termine sur une réussite, comme l'exige la règle « finir sur un succès ».

Dans les deux cas, **le titre de la partie ne change pas**, la piste garde son sens, et l'enfant ne voit qu'une chose : ça colle à ce qu'il sait faire.

---

## 2. La formule

### Le principe fondateur

> **Le niveau = le meilleur des deux : ce que les étoiles ont prouvé, ou ce que la compétence récente montre.**
> Jamais moins que les étoiles. Jamais de retour en arrière.

L'étoile devient un **plancher acquis à vie**. La compétence devient un **ascenseur** qui peut faire monter plus vite. Aucune des deux ne peut faire descendre.

### Le signal retenu : le taux de premier coup

On mesure **la proportion de questions réussies du premier coup**, sur les **3 dernières parties terminées**.

Pourquoi celui-là, et pas un autre :

| Signal candidat | Retenu ? | Raison |
|---|---|---|
| **Réussi du premier coup (oui/non)** | ✅ **OUI** | C'est déjà exactement ce que le jeu enregistre pour colorer les billes (vert = 1er coup). Zéro nouvelle mesure à inventer. Et c'est le seul signal qui distingue « il sait » de « il a fini par trouver ». |
| Nombre total d'essais | ❌ non | Un enfant qui tape deux fois par maladresse tactile serait puni pour un problème de doigt, pas de tête. |
| Vitesse de réponse | ❌ non | À 4 ans, la vitesse mesure l'attention du moment, pas la compétence. Un enfant qui regarde par la fenêtre puis répond juste sait la réponse. Et mesurer la vitesse pousse à se dépêcher, ce que la règle « pas de chrono qui stresse » interdit. |
| Réponse finale correcte | ❌ non | Trop généreux : avec le système de réessai, presque tout finit correct. Ça ne discrimine rien. |

### Les seuils

| Fenêtre | 3 dernières parties **terminées** du jeu (peu importe le niveau joué) |
|---|---|
| **Monter d'un niveau** | Au moins **3 parties** jouées **et** au moins **80 % de réponses du premier coup** sur ces 3 parties |
| **Ne pas descendre** | Jamais. Le niveau atteint est un plancher définitif. |
| **Plafond** | Niveau 3 (`maxStars` = 3). On y reste. |
| **Plancher** | Le nombre d'étoiles + 1 (la règle actuelle, qui devient le sol et non plus le plafond) |

**Pourquoi 3 parties et pas 2** : la première partie d'un jeu ne dit rien du tout. L'enfant découvre l'écran, cherche où taper, comprend la consigne. Ses erreurs sont des erreurs d'interface, pas de compétence. Compter cette partie-là, c'est mesurer autre chose que ce qu'on veut mesurer. (Ce point était déjà tranché dans l'avenant NID — on le confirme.)

**Pourquoi 80 %** : c'est la barre qui laisse le droit à l'erreur sans ouvrir la porte à n'importe qui. Sur une partie de 8 questions, 80 % veut dire **au maximum une hésitation et demie par partie**. Un enfant qui se trompe une fois par partie, trois parties de suite, sait manifestement faire — il mérite la marche suivante. Un enfant qui se trompe deux ou trois fois par partie ne l'a pas encore. La barre est aussi cohérente avec le seuil « maîtrisé » que `tracker.js` utilise déjà (85 %) — on la met légèrement plus bas parce qu'ici on ne récompense pas, on **ouvre une porte**, et une porte trop haute ne s'ouvre jamais.

**Pourquoi on ne descend jamais** : c'est la même raison qui a fait écrire « jamais de perte d'étoile » dans `stars.js`. Un niveau qui recule est une punition, quoi qu'on en dise, et l'enfant le vit comme « on m'a repris quelque chose ». Interdit.

### Ce que ça donne en pratique

| Situation de Max | Avant (règle actuelle) | Après |
|---|---|---|
| 3 parties à 7/8 du premier coup, jamais de sans-faute | Niveau 1 à vie | **Niveau 2** — la compétence a ouvert la porte |
| 1 sans-faute dès la 1re partie | Niveau 2 | **Niveau 2** — inchangé, l'étoile marche toujours |
| 3 parties poussives (4/8, 5/8) | Niveau 1 | **Niveau 1** — normal, il n'y est pas encore |
| Passé niveau 2, puis 3 mauvaises parties | Niveau 2 | **Niveau 2** — on ne redescend pas |

---

## 3. Le cas « niveau 2 moyennement maîtrisé » — la réponse à la question de Papa Yann

Reformulé : *Max est monté au niveau 2. Il s'y débrouille moyennement. Qu'est-ce qui se passe ? Est-ce qu'on le renvoie au niveau 1 ?*

**Réponse : non, on ne le renvoie nulle part. Le niveau 2 devient plus doux de l'intérieur.**

Voici exactement ce qui se produit, et pourquoi ce n'est ni une punition ni une perte.

### Le mécanisme : le sac de questions se rééquilibre

Une manche de niveau 2 contient déjà, par règle figée, **un mélange** : des questions du niveau 2 et des questions plus faciles. Ce mélange n'est pas fixe — c'est lui qu'on module.

| Comment ça se passe pour Max | Composition de la manche suivante |
|---|---|
| Il cartonne au niveau 2 (≥ 80 % du premier coup) | **6 questions niveau 2 + 2 plus faciles** — dense, ça pousse |
| Il est moyen (entre 50 % et 80 %) | **4 + 4** — l'équilibre standard, celui de la règle actuelle |
| Il rame (< 50 % du premier coup) | **2 questions niveau 2 + 6 plus faciles** — il reste au niveau 2, mais il passe l'essentiel de son temps sur du terrain qu'il maîtrise |

Dans le dernier cas, **il joue une manche à dominante niveau 1, sous l'étiquette niveau 2**. C'est exactement ce que Papa Yann décrit par « on retente le 1 » — sauf que rien n'a été retiré. Le niveau affiché n'a pas bougé, aucune étoile n'a été perdue, et personne ne lui a dit qu'il avait échoué.

### Et l'étoile dans tout ça ?

C'est la deuxième moitié de la phrase de Papa Yann : *« il aura sûrement 1 étoile quand même »*. Et c'est vrai, mécaniquement :

- Une manche à dominante facile est **plus facile à réussir sans faute**.
- Donc un enfant en difficulté au niveau 2 a **de bonnes chances de décrocher son étoile** sur une de ces manches allégées.
- Cette étoile est légitime : elle récompense une manche réellement terminée sans erreur.
- Et elle **verrouille son niveau 2** comme plancher définitif, via la règle « le niveau est au minimum étoiles + 1 ».

Autrement dit : **la difficulté baisse pour lui permettre de gagner, et la victoire consolide sa position.** C'est le contraire d'une punition. C'est un filet qui remonte l'enfant.

### Pourquoi c'est pédagogiquement solide

Trois raisons, toutes déjà dans les règles gravées :

1. **« Finir sur un succès »** — un enfant qui rame doit terminer sa partie sur une réussite, sinon la trace mémoire de ce jeu devient négative et il n'y reviendra pas. Le rééquilibrage garantit ça.
2. **Zone proximale (Vygotski)** — on ne l'abandonne pas au niveau 1, on garde 2 questions dures dans chaque manche. Il continue de frotter contre la difficulté, à une dose supportable.
3. **Difficultés désirables / interleaving (Bjork)** — mélanger du facile et du dur dans la même manche donne une meilleure rétention que faire des blocs homogènes. Le mélange n'est pas une concession, c'est la bonne façon de faire.

---

## 4. Ce que l'enfant voit — TRANCHÉ : rien sur la difficulté, tout sur la progression

C'est une vraie tension et il faut la nommer :

- **La règle interdit d'annoncer une difficulté.** Dire « attention, niveau plus dur ! » à un enfant de 4 ans, c'est fabriquer de l'anxiété avant même la première question. Un enfant qui s'attend à échouer échoue plus.
- **Mais la règle d'or n°10 exige la progression visible.** Un enfant qui ne perçoit aucun changement ne se sent pas grandir. C'est le moteur principal du sentiment de compétence (SDT).

La sortie de cette tension tient en une phrase : **on ne montre jamais la difficulté à venir, on montre toujours le chemin parcouru.**

### Ce qu'on montre

| Quoi | Quand | Formulation |
|---|---|---|
| **La récompense de fin** | Au moment où le niveau vient de monter | Une célébration franche, dans le registre du **grade gagné**, pas du défi annoncé : « **Tu sais faire ! On passe à la suite.** » |
| **Les étoiles** | En permanence, comme aujourd'hui | Inchangé. C'est le marqueur d'accomplissement déjà compris. |
| **La piste de billes** | Pendant la partie, comme aujourd'hui | Inchangé. |

### Ce qu'on ne montre jamais

- ❌ Aucun « Niveau 2 » écrit avant ou pendant la partie. Le mot « niveau » est un mot d'adulte qui annonce une épreuve.
- ❌ Aucun pourcentage, aucun taux, aucune jauge de compétence. C'est du langage de tableau de bord parental — sa place est dans l'écran de suivi, pas devant l'enfant.
- ❌ Aucun message quand la difficulté **baisse**. C'est le point le plus important de tout ce document : **si l'enfant apprend qu'on a baissé la difficulté pour lui, on a détruit la valeur de sa victoire.** Le rééquilibrage vers le bas doit être totalement silencieux et invisible. C'est le modèle Thinkrolls, cité comme référence dans le skill : la difficulté s'adapte, l'enfant ne le sait jamais.

### La règle asymétrique à retenir

> **La montée se célèbre. La descente est invisible.**

Ce n'est pas de la dissimulation, c'est du respect : on lui donne le crédit de ses réussites et on lui épargne le compte-rendu de ses difficultés.

**Le décor** : la question « est-ce qu'on change le décor selon le niveau ? » revient souvent. Réponse : **oui, mais seulement vers le haut et jamais en arrière** — par exemple un fond qui s'enrichit d'un élément au passage de niveau, et qui ne le reperd jamais. Un décor qui régresserait dirait à l'enfant « tu as reculé ». À traiter comme un chantier séparé, pas dans cette spec.

---

## 5. Le risque principal

### Le pire scénario

> **Max monte au niveau 2 par la porte « compétence », se retrouve en difficulté, ne décroche plus jamais d'étoile, et se décourage — alors qu'avant il gagnait des étoiles au niveau 1.**

C'est le scénario à redouter parce qu'il est **paradoxal** : on aurait cassé quelque chose qui marchait en voulant l'améliorer. Il se produit si la montée est trop généreuse et l'atterrissage trop brutal.

### Les quatre garde-fous

| Garde-fou | Ce qu'il empêche |
|---|---|
| **1. Le rééquilibrage automatique du sac (§3)** | C'est le garde-fou principal. Un enfant en difficulté au niveau 2 se retrouve mécaniquement avec des manches à dominante facile → il regagne des étoiles. Le scénario noir ne peut pas s'installer. |
| **2. Le seuil à 80 % sur 3 parties** | On ne monte pas sur un coup de chance. Il faut une performance nette, répétée, mesurée sur un volume suffisant. |
| **3. Le plancher étoiles inchangé** | La nouvelle règle ne peut **que** monter le niveau. Si tout le reste échoue, on retombe sur le comportement d'aujourd'hui — qui est frustrant, mais jamais cassé. Le pire cas de la nouvelle règle est le cas normal de l'ancienne. |
| **4. Les paliers restent proches** | Les niveaux sont conçus pour se chevaucher (mj-04 : niveau 1 = 2–8 passagers, niveau 2 = 6–12). Une marche de niveau n'est pas une falaise. |

### Les risques secondaires, et leur réponse

| Risque | Réponse |
|---|---|
| **Un adulte joue quelques parties « pour montrer »** et fait monter le niveau artificiellement | Assumé. Le niveau ne descend pas, mais le rééquilibrage du sac le ramène en douceur à une difficulté vivable. Pas de correctif spécifique. |
| **Un jeu où l'écart entre niveaux est trop grand** rend la montée brutale | Se détecte au test. Correctif : ajuster les paliers du jeu concerné, pas la formule générale. |
| **Deux enfants sur la même tablette** | Problème préexistant, indépendant de cette spec (traité par les profils enfants côté compte). |

---

## 6. Comment on le teste

Papa Yann a demandé « codé **et testé** ». Le harnais Playwright existant (`studio/minijeux/tests/`) sait déjà dérouler une partie complète et lire l'état stocké. Il suffit de scénarios qui manipulent l'historique.

**Point d'appui technique** : tout le calcul de niveau passe par **une seule fonction**, `starsOf()` dans `site/js/mj-golden.js` (lignes 45-50). C'est le seul endroit à modifier, et donc le seul à tester. Tous les jeux en héritent d'un coup.

### Les scénarios (tous sur mj-04, le jeu pilote)

| # | Nom | Ce qu'on prépare | Ce qu'on vérifie | Ce que ça prouve |
|---|---|---|---|---|
| **T1** | **La montée par compétence** | Historique fabriqué : 3 parties, 7 bonnes du premier coup sur 8, **aucun sans-faute** | Au chargement, le jeu démarre au **niveau 2** | ✅ **Le cœur de la demande** : on progresse sans jamais avoir été parfait |
| **T2** | **Pas de montée sur performance moyenne** | 3 parties à 5/8 du premier coup | Le jeu reste au **niveau 1** | La porte ne s'ouvre pas toute seule |
| **T3** | **Pas de montée sur 2 parties** | 2 parties parfaites en premier coup, mais seulement 2 | Reste au **niveau 1** | La règle des 3 parties tient |
| **T4** | **Jamais de descente** | Niveau 3 atteint, puis 3 parties catastrophiques | Reste au **niveau 3** | Aucune régression possible |
| **T5** | **L'étoile reste un plancher** | 2 étoiles, historique récent mauvais | Niveau ≥ 3 | La règle historique n'est pas cassée |
| **T6** | **Le sac se rééquilibre vers le bas** | Niveau 2, historique < 50 % du premier coup | Sur une manche de 8 : **au plus 2 questions du niveau courant** | Le mécanisme « moyennement maîtrisé » de Papa Yann fonctionne |
| **T7** | **Le sac se rééquilibre vers le haut** | Niveau 2, 3 premières réponses justes du 1er coup **dans la partie en cours** | Les questions suivantes se durcissent | L'intuition « 2-3 bonnes → on augmente » est bien livrée |
| **T8** | **Silence sur la baisse** | Le cas T6 | **Aucun texte** à l'écran mentionnant niveau, difficulté ou aide | La règle « la descente est invisible » est tenue |
| **T9** | **Non-régression totale** | Aucun historique (enfant neuf) | Niveau 1, 4 questions, comportement identique à aujourd'hui | Les 42 jeux déployés ne bougent pas d'un pixel pour un nouveau joueur |

**T9 est le test le plus important pour la sérénité** : il prouve qu'on n'a rien cassé sur l'existant.

### Rollout proposé

1. **mj-04 seul** (le pilote désigné par la figée), les 9 scénarios verts, puis Papa Yann le teste avec Max en vrai.
2. Seulement après validation du ressenti → propagation. Comme tout passe par `mj-golden.js`, la propagation est automatique pour les jeux qui utilisent la brique commune ; les jeux à code maison suivent le lot C1 du plan de remise au propre.

---

## 7. Impact sur les décisions figées (LOI)

⚠️ **Ces fichiers font LOI. Rien de ce qui suit n'est appliqué sans un « OK je défige » explicite de Papa Yann.**

### Fichiers concernés

**14 fichiers figés** portent la formule à amender : `mj-01` · `mj-04` · `mj-05` · `mj-09` · `mj-13a` · `mj-13c` · `mj-14` · `mj-15` · `mj-16` · `mj-18` · `mj-19` · `mj-23` · `mj-34` · `mj-51`.
Plus deux documents de référence : `docs/jeux/_PALIERS-DIFFICULTE.md` et `docs/STANDARD-MJ.md`.

Bonne nouvelle : **13 de ces 14 fichiers portent exactement la même ligne**, à l'identifiant du jeu près. Un seul amendement, répété.

### Amendement A — la ligne du niveau (13 fichiers)

**Texte actuel** (dans mj-01, mj-05, mj-09, mj-13a, mj-13c, mj-14, mj-15, mj-16, mj-18, mj-19, mj-23) :

> 🔒 **5 paliers**. Niveau = `Stars.get('mj-XX') + 1`. Charger `catalog.js` + `stars.js`.

**Texte de remplacement proposé** :

> 🔒 **Niveau = le plus élevé des deux : `Stars.get('mj-XX') + 1` (plancher acquis, ne descend jamais) OU le niveau ouvert par la compétence mesurée** (≥ 80 % de réponses du premier coup sur les 3 dernières parties terminées). Plafonné à `maxStars`. **Le niveau ne descend JAMAIS.** Charger `catalog.js` + `stars.js`.
> _Amendé le 2026-07-28 (décision Papa Yann) — motif : la formule d'origine enfermait l'enfant au niveau 1 tant qu'il n'avait pas fait un sans-faute._

### Amendement B — mj-04, le pilote (2 lignes)

`figees/mj-04.md` porte le contrat de référence. Deux lignes à toucher.

**Ligne 8, actuelle** :
> 🔒 **Niveau courant = `Stars.get(id) + 1`** (dérivé des étoiles, plafonné à `maxStars`). Aucun stockage en plus.

**Remplacement** : le texte de l'amendement A ci-dessus, en conservant « Aucun stockage en plus » (la compétence se calcule à partir de l'historique que `tracker.js` enregistre déjà — rien de nouveau n'est stocké).

**Ligne 9, actuelle** :
> 🔒 **Manche = 8 questions : 4 au niveau courant + 4 tirées au hasard sur les niveaux inférieurs**, mélangées. Niveau 1 → 8 faciles. **JAMAIS « que dur d'un coup ».**

**Remplacement proposé** :
> 🔒 **Manche mixte, jamais « que du dur »** : les questions se répartissent entre le niveau courant et les niveaux inférieurs, mélangées. Le dosage s'ajuste automatiquement à la performance récente et à la partie en cours — **6/2** si l'enfant maîtrise, **4/4** par défaut, **2/6** s'il est en difficulté. Niveau 1 → 8 faciles. **JAMAIS « que dur d'un coup »**, et l'ajustement vers le bas est **totalement silencieux** (aucun message à l'écran).
> _Amendé le 2026-07-28 — le 4/4 fixe devient le cas par défaut d'un dosage adaptatif._

### Amendement C — mj-34 (formulation différente)

`figees/mj-34.md` ligne 7 utilise `Stars.get('mj-34') + 1` comme **palier de départ**, avec une sauvegarde de position propre. Même remplacement que A, en gardant intacte la partie « position dans le palier sauvegardée » et la régression interdite associée.

### Documents de référence à mettre à jour

| Fichier | Ce qui change |
|---|---|
| `docs/jeux/_PALIERS-DIFFICULTE.md` | Le rappel du contrat en tête de fichier (ligne 9) : reprendre le texte de l'amendement A + le dosage adaptatif. |
| `docs/STANDARD-MJ.md` | Le tableau « Système d'étoiles & niveaux » : la colonne « Étoiles acquises → Niveau » devient « **Niveau = le plus haut des deux (étoiles, compétence)** ». |
| `site/js/mj-golden.js` | Le bandeau de commentaire lignes 9-11 dit aujourd'hui « FORMULE FIGÉE LOI — NE PAS TOUCHER, défigeage en attente de validation Papa Yann ». À réécrire une fois le GO donné. |

### Ce qui NE change PAS (et doit rester intact)

- ❌ **L'étoile reste le sans-faute.** Aucune dilution. Une étoile se gagne toujours en réussissant toute la manche du premier coup.
- ❌ **Jamais de perte d'étoile** (`stars.js`).
- ❌ **Jamais de descente de niveau.**
- ❌ **Aucun stockage supplémentaire** — la compétence se lit dans l'historique existant de `tracker.js` (20 sessions par jeu, avec `correct` et `questions`).
- ❌ **Le nombre de questions par niveau reste 4 / 6 / 8.**
- ❌ **maxStars reste à 3.**

---

## 8. Les décisions attendues de Papa Yann

| # | Question | Ce que je recommande |
|---|---|---|
| **D1** | La compétence ouvre-t-elle une 2e porte vers le niveau suivant, l'étoile restant le plancher ? | **Oui** — c'est tout l'objet de la spec |
| **D2** | Seuil : **3 parties minimum** et **80 % de réponses du premier coup** ? | **Oui**. 2 parties, c'est trop peu pour distinguer la chance de la compétence |
| **D3** | L'adaptation en cours de partie porte sur **le mélange des questions**, jamais sur le niveau affiché ? | **Oui** — sinon on fabrique « quand je réussis, ça devient plus dur » |
| **D4** | « Niveau 2 moyennement maîtrisé » = **manche allégée sous étiquette niveau 2**, pas un retour au niveau 1 ? | **Oui** — et il regagne son étoile ainsi, exactement comme tu l'as anticipé |
| **D5** | **La montée se célèbre, la baisse est invisible** ? | **Oui**, et c'est non négociable pour moi |
| **D6** | On défige les **14 fichiers** avec les formulations du §7 ? | Sur ton GO uniquement |
| **D7** | Pilote sur **mj-04 seul**, validation avec Max, puis propagation ? | **Oui** — c'est le jeu désigné pilote par la figée |

---

## Annexe — pourquoi c'est peu risqué techniquement

- Le calcul du niveau vit dans **une seule fonction** : `starsOf()`, `site/js/mj-golden.js` lignes 45-50. Un seul point de modification pour tous les jeux qui utilisent la brique commune.
- La donnée nécessaire **existe déjà** : `tracker.js` conserve les 20 dernières sessions par jeu avec `correct` et `questions`. Rien à collecter de neuf, rien à migrer.
- Le comportement pour un enfant sans historique est **strictement identique à aujourd'hui** (scénario T9).
- Aucune modification de `stars.js` : les étoiles restent exactement ce qu'elles sont.

---

_Spec rédigée par `game-conseiller` le 2026-07-28, sur demande explicite de conception argumentée de Papa Yann. Aucun code écrit. Lève l'arbitrage B du plan de remise au propre._
