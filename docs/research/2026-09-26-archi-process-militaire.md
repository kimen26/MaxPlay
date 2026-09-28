# Process militaire JEU + DINO — diagnostic et plan

> **Demande de Papa Yann (2026-09-26)** : « quand je propose un jeu ou un dinosaure, tout doit être clair et automatique : images, textes, scripts, audio, tests… plus de faute, plus de pas vu pas pensé ». Périmètre : les mini-jeux, l'encyclopédie dino et tout ce qui les nourrit (visuel, audio, pédagogie, gameplay, narration, interaction).
> **Statut** : proposition. **Vague 0 tranchée le 2026-09-28** : D-014 (360 px, réponse de Papa Yann) et D-015 (le reste, tranché par Claude, réversible) dans `memory/DECISIONS.md`. La liste de questions du § 8 est gardée pour l'historique ; elle était trop technique (L-013). Rien de structurel n'a été changé. Trois défauts de contenu visibles par Max ont été corrigés en route (T-Rex, Minmi, Scélidosaure).
> **Détail** des 23 recommandations (fichiers, preuves, ce qu'elles suppriment, statut de vérification) et gabarit de brief DoR/DoD : [`2026-09-26-archi-recommandations.md`](2026-09-26-archi-recommandations.md).

## En bref

L'environnement fait bien tout ce qu'un script vérifie. Il rate ce qui ne tient qu'à une phrase : une règle dans un agent, un rappel dans un CLAUDE.md, une ligne de mémoire. Les « 20 % » manquants sont là, et trois exemples sont sortis en trois jours :

- le T-Rex a perdu l'étymologie de son nom, parce qu'un exemple de brief contredisait la règle de l'agent ;
- Minmi racontait le dernier repas d'un autre animal, sous un tampon « CONFIRMÉ » ;
- le Scélidosaure n'avait plus de bouton audio depuis trois semaines, alors que l'état le disait complet.

La réponse n'est pas d'écrire plus de règles, c'est d'en écrire moins. **Toute règle vérifiable devient une porte, c'est-à-dire un script qui coûte 0 token, et la prose ne garde que le jugement.** À la fin, Papa Yann n'a plus que trois arrêts par dino (taxonomie, GO crédits, images) et deux par jeu (cadrage, test sur le téléphone).

## 1. Comment on l'a mesuré

| Étape | Qui | Résultat |
|---|---|---|
| Cartographie | 6 lecteurs en parallèle : agents et hooks, mémoire, pipeline dino, pipeline jeu, handoffs et tests, tokens | 88 constats avec fichier et ligne, dont 17 critiques |
| Sonde « portes » | 1 agent Sonnet qui lance toutes les portes pour de vrai | ce qui est rouge, ce qui est vert sans rien prouver |
| Sonde « ajoute le Minmi » | 1 agent Sonnet, la skill suivie à la lettre, en lecture seule | doublon non détecté, fait faux, `--preview` qui écrit sur le disque |
| Sonde « nouveau mini-jeu » | 1 agent Sonnet dans un worktree isolé, qui construit vraiment mj-60 (le loup) | 8 trous de pipeline, dont un outil destructeur |
| Architectures | 3 propositions indépendantes (portes d'abord, process d'abord, mémoire d'abord), notées par 3 juges | « portes d'abord » gagne chez les trois juges (20, 21 et 22 sur 25) |
| Synthèse | 1 architecte | 19 recommandations et un plan en 7 vagues |
| Réfutation | prévue : 2 réfuteurs par recommandation | **échouée**, plafond de dépense atteint. Remplacée par une vérification sur le disque faite par le main agent, notée recommandation par recommandation |

## 2. Ce que les sondes ont trouvé

| Défaut | Preuve | Statut |
|---|---|---|
| Étymologie du T-Rex amputée dans l'audio | L-D-84 | script corrigé le 24/09, MP3 en attente de GO crédits |
| Minmi : le « dernier repas dans le ventre » est celui de *Kunbarrasaurus* | L-D-85, trois sources | texte corrigé en 4 langues le 26/09, 8 MP3 et 1 image en attente |
| Scélidosaure sans bouton audio ni galerie depuis le 3/09 | absent des trois tables de `dev-dinos.html` | câblé et vérifié à 360 et 320 px le 27/09 ; cause racine ouverte (R03) |
| « Ajoute le Minmi » relancerait un dino qui existe déjà | aucune porte « existe déjà ? » | R04, R14 |
| L'outil qui extrait le texte FR des règles effacerait celui des 35 autres jeux | `_extract-mj-regles.mjs`, l.76 et l.125 | R20 |
| Un jeu peut passer toutes les portes et s'afficher en français pour un joueur anglais | le bundle i18n n'est régénéré par rien d'automatique | R07 |
| Copier le gabarit officiel casse sa propre porte | `mj-template.html` sans manifest ni `sw-register.js` | R21 |
| Le gameplay réel des 36 jeux (9 minutes) ne bloque jamais la mise en ligne | la CI ne lance que `npm run check` | R08 |
| Une animation jouée derrière le panneau règle reste invisible | trouvée seulement en ouvrant une capture | R06 |
| Le zoom est bloqué sur les 36 jeux, l'encyclopédie et trois pages d'adulte (compte parent, vie privée, espace auteur) | `user-scalable=no`, aucune décision écrite ; la règle globale dit « jamais de zoom bloqué » | arbitrage 1 |
| Cible tactile : 80, 60 ou 48 px selon le fichier | STANDARD-MJ, rule mini-jeux l.26 et l.48, règle globale | arbitrage 2 |
| Les agents démarrent en lisant des fichiers qui n'existent plus | 11 chemins morts dans 5 agents sur 9 | R12, R17 |
| `dino-conseiller` prescrit le « running gag » Tritri que la figée a abrogé | agent l.24, figée re-figée le 2026-09-11 | R12 |
| `game-test-audio` et `game-test-secu` ne sont jamais lancés par la chaîne prévue | le reviewer censé les invoquer n'a pas l'outil Agent | R15, R17 |
| `game-dev` décrit un autre projet | Phaser, 1024×768, MJ-01 à MJ-20, menu `index.html` | R17 |
| Le hook de fin de tour accepte un simple `cat` du TODO comme trace | `pmo-check.ps1` l.75-81 | R10 |
| La figée dino entière (19,5 Ko) est réinjectée à chaque édition sous `studio/dino/`, même une ligne de TODO | `pre-tool.ps1` l.44 ; 65 commits sur ce TODO en 30 jours | R11 |
| 250 liens morts sous `studio/` | la porte ne regarde que `docs/` | R12 |
| Les INVARIANTS dino disent « 9 langues, FIGÉE » ; D-013 dit « deux langues servies » | contradiction vivante | R19 |

## 3. Pourquoi 80 % et pas 100 %

Trois mécanismes reviennent partout.

1. **Une règle en prose perd contre un exemple ou un vieux texte.** Le brief HO-011 montrait un T-Rex amputé, et les agents l'ont copié. `dino-conseiller` garde une consigne abrogée depuis 16 jours, donc il écrit contre la loi. Aucune porte ne compare le texte des agents aux figées.
2. **Les portes vérifient la forme, jamais le fond.** `_verif-scripts-audio` contrôle les tags et la structure, pas l'étymologie ni la provenance d'un fait. `_ETAT-DINOS` compte des fichiers, pas le câblage. `check-mj-coherence` vérifie la clé de traduction source, pas ce que le jeu lit vraiment. Tout est vert pendant que Max entend un fait faux.
3. **« Fait » n'est relié à rien de visible.** Aucune définition de « fini » n'exige la capture 360/320 ouverte, la porte rejouée dans le tour ou la recette sur le téléphone. Le seul hook bloquant exige une trace en mémoire, pas un test.

La mémoire s'empile pour la même raison : écrire une leçon ne coûte rien. La cartographie a classé 212 leçons et décisions ; 73 relèvent d'un script et 45 sont des doublons. Une leçon sans porte se relit, puis s'oublie, puis se refait.

## 4. Le principe : portes d'abord, prose ensuite, humain à trois arrêts

**Quatre strates, pas plus.**

| Strate | Ce que c'est | Règle |
|---|---|---|
| LOI | les figées : `studio/dino/figees/encyclopedie.md` et `studio/minijeux/docs/jeux/figees/mj-XX.md` | seul Papa Yann les change ; elles sont injectées en résumé (lignes 🔒 et ❌) et seulement quand on touche un fichier de contenu |
| PORTES | `npm run check` (statique, quelques secondes), les specs Playwright à 360 et 320 px, et les portes rapides rejouées par le hook juste après chaque édition | tout ce qu'un programme peut vérifier y descend et disparaît de la prose |
| ORCHESTRATEURS | `npm run dino:new -- <id>` et `npm run mj:new -- mj-XX`, sans fichier d'état : le disque est l'état | ils affichent « PROCHAINE ACTION » et ne s'arrêtent qu'aux arrêts humains nommés |
| JUGEMENT | 5 agents Sonnet réécrits sur le repo réel : fact-check, script audio, code de jeu, revue figée + captures, sécurité | ils reçoivent un résumé, jamais la bibliothèque ; des portes garantissent zéro chemin mort et zéro contradiction avec une figée |

**Une règle vit à un seul endroit, sous la forme la moins chère qui la fait respecter** : script, puis hook, puis rule, puis skill, puis agent, puis mémoire. Les autres endroits pointent vers elle.

**Règle d'entrée contre le ré-empilement** : une leçon ne s'écrit qu'avec son marqueur `Porte :`, `Rule :`, `Hook :`, `Figée :` ou `Archive :`, et un hook refuse le reste (R10). « Une leçon sans porte sera refaite » devient mécanique.

## 5. Ce que ça change pour toi

Les chiffres des deux scénarios sont des exemples.

**« Ajoute le Carnotaure »**
1. `dino:new carnotaurus` dit d'abord s'il existe déjà. « Ajoute le Minmi » répondrait : « il existe ; il lui manque un combat. Je complète ? »
2. `dino-conseiller` fait le fact-check, avec l'URL et la phrase citées pour chaque fait (R22).
3. **Arrêt 1, taxonomie** : « abélisauridé, famille trex, 8 m, 1,3 t ; le poids est discuté entre 1,3 et 2 t, je garde 1,3. Je continue ? »
4. Le main écrit la fiche ; le hook lance la porte et affiche la liste de ce qui manque.
5. `dino-fiche-writer` écrit le script ; la porte refuse un bloc A sans chaque racine du nom et sa langue.
6. **Arrêt 2, crédits** : « script vert ; l'audio coûte 1 480 caractères, 0,9 % du mois. Je lance ? »
7. L'audio est généré puis vérifié (5 fichiers, durées, silence de tête), et le bouton est câblé par un générateur.
8. **Arrêt 3, images** : « 10 images, 2 douteuses (la scène Paris a trois pattes avant). Je regénère ces deux ? »
9. Le rendu est vérifié à 360 et 320 px, les captures sont ouvertes, la porte dit « 0 manque », puis push.
10. Le dernier message pose 2 ou 3 questions de recette précises pour le P30 Pro.

**« Un jeu où le loup compte les moutons »**
1. Le main cherche une mécanique existante à ré-habiller et le prochain numéro libre.
2. **Arrêt 1, cadrage** : 8 lignes (mécanique, paliers, titre, consigne, audio). « OK ? »
3. `mj:new` pose les 9 emplacements conformes avant la première ligne de jeu.
4. `game-dev` code ; chaque édition relance l'audit du gabarit dans le tour.
5. La spec tourne à 360 et 320 px : cibles mesurées, fin de partie atteinte, une seule voix à la fois, 2 captures ouvertes.
6. `game-mj-reviewer` juge la figée et les captures, puis le main lance `game-test-secu`.
7. Les portes passent, push ; la CI complète tourne avant la mise en ligne.
8. **Arrêt 2, playtest** : 3 questions. Ton retour devient une ligne 🔒 et un test, dans le même tour.

Ce qui disparaît : « as-tu pensé au catalogue, aux langues, à la spec, à la figée, au 360 px, au push ? ». Chaque oubli devient une ligne rouge d'un script.

## 6. Délégation et tokens

**Qui fait quoi**
1. Un **script** fait tout ce qui se compte, se compare ou se mesure. Jamais un agent pour vérifier qu'un fichier existe.
2. Le **main agent** décide et garantit : il écrit la DoR, pose les arrêts en texte, rejoue les portes, ouvre les captures, grave la mémoire dans le tour et vérifie tout ce que rendent les sous-agents (`git diff`, sorties brutes).
3. Un **sous-agent Sonnet nommé** prend une tâche qui demande du jugement et produit un fichier : fact-check, script audio, mécanique, revue, sécurité. Il ne touche jamais à git et rend un rapport vérifiable.
4. Un **sous-agent Sonnet ou Haiku** prend l'exploration large, les sondes et les inventaires, tout ce qui salirait le contexte principal.
5. Un sous-agent n'en lance jamais un autre : c'est le main qui enchaîne.
6. Un **Workflow multi-agents** ne sert qu'à un vrai éventail (N dinos, 3 lentilles de lecture), une fois les portes en place, et il se coupe aux arrêts humains. Il se borne en taille : celui de cet audit (51 agents) a percuté le plafond de dépense pendant sa dernière phase.
7. Les **PMO** ne servent plus qu'aux audits. Un chiffre se lit dans un fichier généré.

**Gains mesurés**

| Poste | Aujourd'hui | Après |
|---|---|---|
| Figée dino réinjectée à chaque édition sous `studio/dino/` | 19,5 Ko par édition, même pour une ligne de TODO | résumé des lignes 🔒 et ❌, sur les fichiers de contenu seulement |
| Rappel `signal-detector` | 563 octets à chaque prompt, avec une référence morte | une ligne de routage |
| Lectures obligatoires de `dino-fiche-writer` | au moins 85 Ko de fichiers, deux dossiers entiers et un fichier mort | un résumé d'environ 40 lignes et la fiche du dino |
| Vérifications faites en relisant | nombreuses, à chaque tour | 0 token, par script |
| Relances de Papa Yann | une quinzaine par jeu (cartographie) | 2 arrêts par jeu, 3 par dino |

## 7. Le plan par vagues

Chaque vague se livre seule, se vérifie par ses portes et se défait par un revert. Les durées sont des ordres de grandeur, en journées de travail d'agents vérifié par le main.

| Vague | Contenu | Recos | Durée | Attend ta réponse ? |
|---|---|---|---|---|
| 0 | Arbitrages (§ 8) | — | 10 minutes pour toi | oui |
| 1 | Brancher ce qui existe : portes dans `check`, CI Playwright avant Pages, hooks durcis, figée injectée en résumé, extracteur FR réparé, gabarit conforme, `--preview` inoffensif | R01, R05, R08, R10, R11, R20, R21, R23 | ½ journée | seulement la partie zoom de R05 |
| 2 | Portes de fond : étymologie, provenance des faits, chemins et figées dans les agents, langues alignées sur D-013 | R02, R07, R12, R22 | 1 journée | non |
| 3 | Générer au lieu de recopier, prouver le rendu : tables dino générées, « fini » dino par id, tests à 360/320/48 px, spec dino, portes rejouées dans le tour | R03, R04, R06, R09, R13 | 1,5 journée | non |
| 4 | Orchestrateurs et gabarit : `dino:new`, `mj:new`, skill `nouveau-jeu`, skill `nouveau-dino` réduite, brief unique avec DoR et DoD | R14, R15, R16 | 2 journées | non |
| 5 | Agents, docs, mémoire : 9 agents réécrits, rules et CLAUDE.md fusionnés, INVARIANTS ramenés aux valeurs arbitrées, mémoire auto purgée après archive | R17, R18, R19 | 1,5 journée | oui, pour les défigeages |
| 6 | Premier vrai passage : un dino neuf et un jeu neuf de bout en bout, arrêts chronométrés. Un Workflow n'est ajouté que si le main oublie encore d'enchaîner | — | 1 journée | oui, la recette |

**Critère de fin du chantier** : zéro « as-tu pensé à » sur les deux passages de la vague 6.

## 8. Vague 0 : tes arbitrages

Ma recommandation est la première option à chaque question.

1. **Zoom.** Je propose : les jeux, l'encyclopédie, la lecture et l'armoire restent verrouillés, avec la raison écrite (un pincement involontaire d'un enfant de 4 ans casse la partie). Les trois pages d'adulte (compte parent, vie privée, espace auteur) redeviennent zoomables, comme l'accueil et le suivi. Ou tout dézoomer, comme le dit la règle globale ?
2. **Cible tactile.** Je propose 80 px pour les cibles de jeu de l'enfant, déjà la norme du STANDARD, et 48 px en plancher partout, mesurés par la porte ; le « 60 » de la rule disparaît. Ou 48 partout ?
3. **Largeur de conception 360 px**, en abrogeant le « 1024×768 paysage » des INVARIANTS jeu. OK ?
4. **Silence de tête de 250 ms partout**, en abrogeant le « 80 ms » des fiches. OK ?
5. **Voyage = 12 récits**, ce qui est sur le disque, en corrigeant la figée qui dit encore 8 par endroits. OK ?
6. **Langues** : aligner les INVARIANTS dino sur D-013 (français et anglais servis et bloquants ; espagnol et portugais produits, non bloquants). OK ?
7. **Jeu neuf avant ton playtest** : figée marquée 🟡 PROVISOIRE, sans aucune ligne 🔒 que tu n'as pas vue. OK ?
8. **Jeu sans dino (loup, bus)** : une zone neutre sur le Mur, ou chez le copain dont c'est la matière ?
9. **Chiffres dino** : la ligne 🔒 « les chiffres vivent dans INVARIANTS » pointe désormais vers l'état généré `_ETAT-DINOS.md`. C'est un défigeage de DEC-GED-001. OK ?
10. **Silhouettes** : `ombres/` devient la seule source, et le « STOP 3 zones » est levé. OK ?

Sans réponse, les vagues 1 à 4 avancent quand même. Seuls le zoom (vague 1) et les défigeages (vague 5) attendent.

## 9. Là où le main corrige la synthèse

La synthèse automatique est solide ; elle est corrigée sur quatre points.

- **Zoom** : elle proposait de le débloquer partout par un remplacement sur 36 jeux. Pour un enfant de 4 ans, c'est une décision de produit, pas un nettoyage : c'est l'arbitrage 1.
- **Cible tactile** : elle proposait 48 px partout. Pour l'enfant, 80 est plus sûr et c'est déjà la norme ; 48 reste le plancher.
- **Garde avant push** : exiger la suite Playwright complète, soit 9 minutes, avant chaque push ralentirait tes tests sur le téléphone. En local : `check` et les specs des jeux touchés. La suite complète tourne en CI avant la mise en ligne.
- **Provenance des faits** : elle en était absente. R22 l'ajoute après Minmi : un fait de fiche ne passe qu'avec son URL et sa phrase citées.

Les sondes ajoutent aussi R20 (extracteur FR destructeur), R21 (gabarit conforme) et R23 (`--preview` qui écrit).

## 10. Limites

- La réfutation automatique n'a pas tourné. Les faits qui portent 19 recommandations sur 23 ont été revérifiés sur le disque le 2026-09-27, dont 3 en partie. Les 4 autres reposent encore sur la cartographie ou une sonde ; l'annexe les marque « à revérifier en DoR », et leur vague commence par là.
- Les durées sont des ordres de grandeur, pas des engagements.
- Le prototype mj-60 (le loup) reste dans le worktree `.claude/worktrees/agent-a57ceb7f1ee5ddf08`. L'idée n'est pas validée ; il ne sera pas fusionné sans ton cadrage.
- Hors de ce chantier, des générations attendent un GO crédits : les MP3 du T-Rex (nom, régime, récap), ceux de Minmi (fait et récap, 4 langues) et l'image `Minmi_funfact.webp`.
