# HO-012 — Relecture croisée, moitié 1 (43 fiches)

> Relecteur : `dino-conseiller`. Périmètre : W2 (Raptors + Ptérosaures, 11), W4 (Cératopsiens + Ornithopodes, 12), W5 (Marins + Avant les dinosaures, 11), W6 (Mégafaune, 8) — voir liste exacte dans le brief HO-012.
> Méthode : lecture à voix haute mentale (papa sur Lunii avec un enfant de 4 ans) sur les 43 `.md`, grep interdits sur le texte des répliques (pas les commentaires), vérification tags hors liste v3, vérification `!` final Wex, vérification des paliers `_compLong`/`_compHaut` officiels de `dinos-data.js` pour les cas limites.

## Verdict global

**43 PASS / 0 CORRIGER.**

Aucun défaut bloquant relevé sur les 43 fiches. Le corpus HO-011 tient sa promesse : chiffres exécutés et non réinventés, taxo honnête partout (« cousin des raptors » jamais « c'est un dromæosaure », ptérosaures explicitement pas des dinosaures, synapsides explicitement pas des dinosaures), proies jamais présentées comme dangers, prédation dite sans gore, inquiétude de Wex toujours rassurée par du vrai, aucun tag hors la liste v3 autorisée, aucun `!` final chez Wex, aucun « regarde », aucun « max/doudou/peluche/nounours » dans le texte lu, tous les usages de « bus » confinés au bloc B (échelle, autorisé).

Point méthodologique vérifié et écarté : j'ai d'abord soupçonné un problème d'échelle sur `shonisaurus` (14 m comparé à « bus RATP » = 16,7 % d'écart si on raisonne en pourcentage linéaire). Vérification faite sur la fonction réelle `_compLong()` de `site/js/dinos-data.js` : le système fonctionne par **paliers fixes**, pas par plus proche voisin — la bande `≥ 11 m` couvre tout jusqu'à 16 m et rend bien « bus RATP » pour 14 m. La sortie est donc EXACTE et conforme à la porte mécanique. Ce n'est pas un défaut, c'est le comportement voulu du système ; je le documente pour éviter qu'un futur relecteur retombe dans le même faux-positif.

## Détail par dino (aucune correction requise, notes de lecture)

**W2 — Raptors + Ptérosaures**
- `velociraptor` PASS — démystification cinéma sans nommer la franchise, fait fort « Fighting Dinosaurs » neuf et fact-checké.
- `deinonychus` PASS — chasse en groupe bien formulée en hypothèse, jamais assénée.
- `utahraptor` PASS — meute en hypothèse prudente, griffe chiffrée sans redite.
- `microraptor` PASS — distinction planer/voler pédagogique claire, fait fort (4 ailes) inédit.
- `troodon` PASS — hypothèse « dinosauroïde » clairement traitée comme pure spéculation datée.
- `gallimimus` PASS — vitesse mythique 70 km/h corrigée en 50, aucune référence Ferrari/vroum.
- `oviraptor` PASS — boucle narrative A→D (nom injuste résolu) efficace et honnête.
- `archaeopteryx` PASS — taxo tenue (« un des tout premiers oiseaux », jamais « l'ancêtre de tous »).
- `pteranodon` PASS — Mosasaure cité comme vrai danger, pas de proie inventée.
- `quetzalcoatlus` PASS — seul dino du lot où Tritri est justifié (contemporain confirmé), touche légère et non forcée.
- `hatzegopteryx` PASS — motif « Personne ne l'attaquait » retiré (épuisé au registre) et remplacé par l'angle « double vie chasseur à pied/en vol », neuf et fact-checké.

**W4 — Cératopsiens + Ornithopodes**
- `triceratops` PASS — LA fiche Tritri : running gag posé par Wex lui-même, aucune méta-explication adulte, marques de dents T-Rex correctement orientées (jamais l'inverse).
- `torosaurus` PASS — doublon « champion de la grosse tête » proprement retiré au profit de l'image des « fenêtres » de la collerette.
- `protoceratops` PASS — scène Fighting Dinosaurs correctement laissée à Vélociraptor (W2), fait fort alternatif solide (centaines de squelettes).
- `pentaceratops` PASS — « réfléchissait à deux fois » consommé en dernier usage autorisé, conforme au registre.
- `centrosaurus` PASS — bonebed fact-checké, onomatopée finale « boum boum boum » image mimable et neuve.
- `pachycephalosaurus` PASS — combat de têtes bien formulé en hypothèse débattue, taxo honnête (« cousin des dinos à cornes »).
- `parasaurolophus` PASS — 10 m correctement rendu « camion » (pas bus), contraste explicite avec Saurolophe tenu.
- `corythosaurus` PASS — poids corrigé (2 rhinocéros vs ancien « hippopotame » stale), Tritri à raison non forcé (écart 10 Ma).
- `maiasaura` PASS — Egg Mountain fact-checkée, vignette maternelle inédite au registre.
- `saurolophus` PASS — crête pleine jamais confondue avec la crête creuse musicale du Parasaurolophus, poids corrigé en tête de fichier.
- `edmontosaurus` PASS — bus RATP légitime (12 m exact, 0 % d'écart), 1000 dents fact-checké.
- `iguanodon` PASS — « les savants se trompent » retiré (motif épuisé), fait raconté sans la formule toute faite.

**W5 — Marins + Avant les dinosaures**
- `mosasaurus` PASS — capture de ptérosaure en vol, fait fort neuf, super-prédateur jamais présenté comme dangereux gratuitement.
- `elasmosaurus` PASS — bourde Cope 1868 racontée avec respect (« un vrai savant », pas moqué).
- `ophthalmosaurus` PASS — Liopleurodon cité comme vrai danger contemporain plausible, pas de proie inventée.
- `liopleurodon` PASS — démystification du mythe des 25 m sans nommer l'émission, motif « personne ne l'attaquait » reformulé.
- `archelon` PASS — vignette « carapace molle coriace » bien la sienne (pas un doublon), Tylosaure + requins fact-checkés.
- `shonisaurus` PASS — aucun prédateur adulte inventé, hypothèse d'échouage collectif clairement une hypothèse.
- `ichthyosaurus` PASS — prédateur corrigé (Rhomaleosaurus contemporain, pas Liopleurodon anachronique), inquiétude de Wex bien rassurée.
- `dimetrodon` PASS — « pas un dinosaure » dit clairement, thermorégulation en hypothèse dominante.
- `edaphosaurus` PASS — contraste voile/régime avec Dimétrodon, vignette neuve et pédagogique (« la forme ne dit pas tout »).
- `gorgonops` PASS — inquiétude Wex sur les canines bien rassurée par le fait qu'il n'en reste plus aujourd'hui.
- `lystrosaurus` PASS — 6 lieux de `region` tous cités, extinction Permien-Trias racontée sans effrayer.
- `moschops` PASS — « champion de la grosse tête » évité (motif réservé Torosaure/Pentacératops), formulation différente centrée comportement.

**W6 — Mégafaune**
- `mammuthus` PASS — île Wrangel + pyramides, fait fort neuf et vérifié.
- `smilodon` PASS — poids corrigé (0,22 t vs ancien 0,25 t), chasse en groupe en hypothèse.
- `megatherium` PASS — 3,5 m explicitement présenté comme hauteur dressée (pas naturelle), image du tabouret à trois pieds neuve.
- `paraceratherium` PASS — motif « personne ne l'attaquait » reformulé, 3 lieux de région cités.
- `glyptodon` PASS — massue caudale correctement attribuée au cousin Doedicurus, jamais au Glyptodon lui-même.
- `aenocyon` PASS — révélation ADN 2021 neuve, Smilodon présenté comme rival de chasse, pas comme un danger pour le Loup lui-même.
- `coelodonta` PASS — chiffres ré-audités, peintures rupestres fact-checkées.
- `titanis` PASS — taxo honnête (oiseau, pas mammifère), seul terror bird ayant migré en Amérique du Nord, fait neuf.

## Top 10 des corrections

Aucune — 0 fiche en CORRIGER. À défaut d'un vrai top 10 de défauts, voici les 10 points de vigilance les plus proches d'une limite (tous jugés PASS, mais à surveiller si le corpus continue de grandir) :

1. **Motif « personne ne pouvait l'attraper / aucun chasseur assez costaud »** revient sous forme reformulée sur plusieurs fiches de fin de chaîne alimentaire (`mosasaurus`, `shonisaurus`, `paraceratherium`, `megatherium`, `gorgonops`) — chacune est fact-checkée et reformulée différemment (conforme à la règle anti-redite du registre), mais l'idée-mère reste proche. Pas un défaut au sens de la grille (le registre l'autorise tant que la formule change), mais un motif à budgéter avec soin pour la 2e moitié du corpus.
2. Le tandem « Wex nerveux → Narrateur rassure par le vrai » est très bien exécuté partout, mais commence à avoir un rythme un peu prévisible sur 3-4 fiches consécutives de mégafaune (`aenocyon`→`coelodonta`→`titanis`) — aucune n'est un doublon de motif, juste une cadence répétitive. À aérer si possible côté audio (durée/rythme), pas côté texte.
3. `quetzalcoatlus` cumule deux comparaisons-bus dans la même phrase de bloc B (« large comme un bus de Paris » puis « aussi long qu'un bus RATP ») — les deux sont légitimes (envergure hardcodée + longueur mise bout à bout) mais la densité du mot « bus » sur une seule réplique est haute ; à vérifier à l'oreille en génération audio, pas un problème de fond.
4. `torosaurus` et `edaphosaurus` introduisent chacun un cousin (Doedicurus / le Dimétrodon comme voisin) pour porter un fait — bien fait, fact-checké, mais ce pattern « le cousin a ce que LUI n'a pas » commence à être un petit tic de structure sur 2 fiches ; à surveiller sur la 2e moitié.
5. `pteranodon`/`quetzalcoatlus`/`hatzegopteryx` (les 3 ptérosaures) partagent tous les trois la mention explicite « pas un dinosaure, un reptile volant » — nécessaire et juste à chaque fois (taxo honnête), mais à l'écoute d'affilée le triplet peut sonner répétitif ; l'ordre de lecture dans l'app amortit ce risque (pas d'obligation d'écoute consécutive).
6. `dimetrodon`/`edaphosaurus`/`gorgonops`/`moschops` (Permien) partagent tous la formule d'ouverture « pas un dinosaure/pas du tout — il vivait X millions d'années avant » — répétition structurelle nécessaire au sein d'une même famille pédagogique (le point est important et doit être redit à chaque fiche indépendamment écoutée), mais à noter si un jour on regroupe ces 4 fiches en séquence.
7. `centrosaurus` (« boum boum boum ») et `moschops` (mouflons qui se cognent) utilisent tous deux une onomatopée/image sonore forte en bloc D — bien différenciées dans le fond, aucun doublon, juste noté pour mémoire de densité d'images mimables dans le lot.
8. `saurolophus` et `parasaurolophus` sont bien contrastés dans le texte (crête pleine vs creuse) mais reposent l'un sur l'autre pour leur fait fort — dépendance narrative correcte et voulue (contraste explicite demandé par HO-011), à garder telle quelle.
9. Les vitesses ajoutées HO-011 (`deinonychus`, `troodon`, `protoceratops`, `pentaceratops`, `centrosaurus`, `pteranodon`, `quetzalcoatlus`, `hatzegopteryx`, `lystrosaurus`, `titanis`) sont toutes bien formulées en estimation (« les savants pensent »), mais avec 10/43 fiches du lot qui en portent une, le tic de phrase « les savants pensent qu'il pouvait courir/filer à X km/h » revient souvent — normal (nouvelle consigne HO-011 appliquée uniformément), à watcher côté variation de formulation si un futur lot en ajoute encore.
10. `elasmosaurus` et `liopleurodon` racontent chacun une « bourde/mythe corrigé par la science » (Cope 1868 / BBC 25 m) — les deux sont fact-checkés, différents dans le fond (erreur d'assemblage vs exagération médiatique) et c'est un excellent ressort pédagogique, juste noté que le lot en compte deux à peu de distance.

## Motifs répétés relevés dans les 43 fiches (mot/image vu 3+ fois)

- **« pas un dinosaure »** (ptérosaures + synapsides + mammifères/oiseau du Cénozoïque) — 17 occurrences sur ce lot. Nécessaire à chaque fois (taxo honnête, contexte différent), pas un défaut.
- **« les savants pensent »** (formule d'estimation de vitesse, doctrine HO-011) — 10 occurrences. Conforme à la consigne, formule volontairement stable pour signaler l'estimation.
- **« aussi lourd que Papa / que N chevaux / que N rhinocéros / que N éléphants »** — omniprésent par construction (bloc B, sortie exacte des fonctions), pas un motif narratif, un mécanisme.
- **« Personne ne l'attaquait / aucun chasseur assez costaud / presque personne »** — motif transverse déjà signalé comme épuisé par le registre `_SCENES-VIGNETTES.md` ; ce lot le reformule correctement à chaque usage (`mosasaurus`, `shonisaurus`, `paraceratherium`, `megatherium`, `gorgonops`), jamais la formule figée elle-même. Voir point de vigilance n°1 ci-dessus.
- **« Wex nerveux → Narrateur rassure par [warmly]/[gently]/[confident] »** — le patron doctrinal HO-011 lui-même (obligatoire), présent dans la quasi-totalité des 43 fiches par construction. Pas un défaut, c'est la règle appliquée.
- **Bus (bloc B uniquement)** — 5 fiches (`quetzalcoatlus`, `edmontosaurus`, `mosasaurus`, `elasmosaurus`, `shonisaurus`). Toutes légitimes (échelle de taille, jamais en récit narré), sorties exactes de `_compLong`.
- **Motif « la forme ne dit pas tout »** (`edaphosaurus`) et **« champion de la grosse tête »** (`pentaceratops`, retiré ailleurs) — usages uniques/tranchés, pas de doublon relevé.

## Notes mécaniques

- 0 tag hors la liste v3 autorisée détecté sur les 43 fiches (grep exhaustif des `[...]`).
- 0 `!` final en réplique Wex.
- 0 « regarde » en réplique.
- 0 « max/doudou/peluche/nounours » en réplique (uniquement présents dans les commentaires de traçabilité, où ils servent à documenter l'absence).
- Tous les usages de « bus » confinés au bloc B (échelle), conforme à la règle figée.
- Faux-positif d'échelle vérifié et écarté sur `shonisaurus` (voir § Verdict global) — le système `_compLong` fonctionne par paliers, pas par plus-proche-voisin en pourcentage ; documenté ici pour la prochaine relecture.
