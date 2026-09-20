# Brainstorm 2026-09-19 — mini-jeux et fiches dino : péage, récompenses, capteurs, écran de fin, idées neuves

> Réflexion demandée par Papa Yann. Trois sources croisées : cartographie du repo (état réel du code, règles figées), `game-conseiller` (pôle JEU) et `dino-conseiller` (pôle DINO). Les deux conseillers ont travaillé à l'aveugle l'un de l'autre ; là où ils divergent, c'est dit, et une proposition de compromis suit.
> Tickets : `studio/minijeux/memory/TODO.md` (EP-135 → EP-144) et `studio/dino/memory/TODO.md` (EP-D17 → EP-D21).
> Dossier Jev à part : [`2026-09-19-jev-typesafe.md`](2026-09-19-jev-typesafe.md).

## 0. Ce qu'il faut savoir avant de trancher

- **Deux livraisons du jour ne sont pas recettées avec Max** : l'armoire v8 (`site/dev-armoire.html`) et la réparation du nid (HO-MJ-21 : 29 jeux sur 36 détruisaient les œufs). Tout ce qui touche aux récompenses doit attendre cette recette. L'écran de fin (piste D), lui, est indépendant.
- **Règles figées qui bornent tout** : zéro pénalité (D-002), jamais de récompense promise (D-003), un seul gain par fin de partie, un seul son à la fois, jamais de chrono ni de pression temporelle (précédent mj-39), zone tap ≥ 80 px, 100 % local sans CDN. Côté dino : cinq onglets et pas un de plus, Voyage sans clic vers les fiches, chemin réel de Max déjà à 5 taps et « tout nouvel écran doit REMPLACER, jamais s'ajouter devant ».
- **Ce qui existe déjà et qu'on croyait à faire** : le bouton « Encore » est déjà vert, le bouton « Au nid » existe, 4 vidéos dino sont déjà branchées dans les fiches, 507 MP3 par dino (nom, taille, régime, fait fou, récap), 11 cris de bébés par famille, ombres de tous les dinos, un dico de 101 racines. Rien en musique. Un seul jeu utilise un capteur (mj-21, secouer pour mélanger la peinture).

---

## A. Micro-jeu avant d'ouvrir une fiche dino

### Les deux lectures

**dino-conseiller : non.** L'encyclopédie est un espace d'exploration libre, on est en train de raccourcir le chemin vers la fiche, et demander « c'est quoi cette lettre ? » à un enfant qui vient de taper sur le T-Rex parce qu'il veut voir le T-Rex punit la curiosité. Les questions dino natives sont une bonne idée, mais leur place est un mini-jeu autonome sur le Mur (variante d'EP-D10) ou l'éclosion au nid, pas un péage.

**game-conseiller : oui, mais ce n'est pas une porte, c'est un tourniquet qui tourne toujours.** La question s'affiche, deux réponses, et la fiche s'ouvre quelle que soit la réponse. Bonne réponse : la constellation se relie, ouverture immédiate. Mauvaise : la bonne s'illumine (« ça va là ! »), ouverture une seconde plus tard. Silence 8 secondes : ouverture seule. Le seul différentiel est le tempo, ce qui est exactement l'intuition de départ (« plus il répond vite, plus ça va vite ») débarrassée du blocage. Zéro pénalité et D-003 respectés. Pédagogiquement, c'est de la récupération active micro-dosée sur un contenu déjà désiré.

### Le compromis proposé

Les deux ont raison sur des points différents. Le tourniquet est acceptable **seulement** avec les garde-fous du game-conseiller, qui répondent point par point aux objections du dino-conseiller :

| Objection dino | Garde-fou |
|---|---|
| Punit la curiosité | Jamais sur une fiche jamais vue. La première ouverture d'un nouveau dino est sacrée. |
| Allonge le chemin | Une fiche sur trois, jamais deux de suite, exemption des 60 premières secondes de session. Sur une session type : une ou deux questions, sur des dinos qu'il connaît. |
| Teste ce qu'on n'a pas donné | Interdit de poser une question dont la réponse est dans la fiche pas encore ouverte. |
| Skip trouvé en deux jours | Pas de bouton skip enfant. Skip automatique à 8 s (attendre coûte plus que répondre). Interrupteur parent dans `compte.html`. |

Durée visée : 6 à 10 secondes, pas 20. Vingt secondes devant une fiche à portée de doigt, c'est une éternité.

### Les formats de question qui marchent à 3,5-4 ans, dans l'ordre

1. **Son initial du nom** : « Tricératops, ça commence par quel son ? », deux lettres géantes, le mot affiché. Toujours le son (« tttt »), jamais le nom de la lettre. Réussite visée 80-90 %. Attention (dino-conseiller) : marche sur les noms courts, biaise le tirage sur les longs.
2. **Compter du concret** : « combien de cornes ? », silhouette sous les yeux.
3. **Addition dessinée** : deux œufs ici, un œuf là. Jamais « 2 + 1 » en chiffres nus.
4. Silhouette → nom, carnivore/herbivore : très robustes, mais la réponse est souvent dans la fiche ; réservés aux fiches déjà vues (c'est le cas par construction).
5. À écarter à 4 ans : époque (abstrait), racine grecque (pour le parent ou 6 ans+), cri (voir C).

### Habillage et coût

Constellation : deux étoiles-réponses, la bonne se relie au dino par un trait lumineux. Vocabulaire maison déjà là (mj-47). Le moteur de question est le même que le mini-jeu « L'appel des noms » (E6) : un développement, deux usages. Coût M. Le code vit dans `showFiche` de `dev-dinos.html`, gouvernance DINO : arbitrage de Papa Yann requis avant toute ligne.

**Décision attendue : tourniquet qui n'arrête jamais, jamais sur une fiche neuve, une sur trois. Oui, ou pas de péage du tout ?**

---

## B. Récompenses au-delà des œufs : vidéo, musique, histoire

### Inventaire réel

| Nature | Possédé | Constat |
|---|---|---|
| Vidéo dino | 4 MP4 (triceratops-combat, tyrannosaurus-attaque, quetzalcoatlus-rencontre, utahraptor-rencontre), déjà branchés dans les fiches | Activation en capsule = câblage. Pas d'outil d'animation dans la stack pour en produire d'autres ; la charte paléoart interdit toute vidéo tierce. |
| Musique dino | Zéro. `sounds/music/` = 1 boucle calme + 4 jingles | Tout à produire. ElevenLabs `compose_music` existe, quota tendu. |
| Histoire dino | Bouton violet « Écoute l'histoire » sur ~40 fiches, 8 récits d'époque (bientôt 12) | Déjà en accès libre : il n'y a rien à débloquer sans casser l'exploration libre. |

### La règle qui tient l'économie (les deux conseillers convergent)

**Une seule monnaie, l'œuf. Pas de deuxième jauge, pas de deuxième sac, pas de deuxième écran.** La surprise porte sur *quoi*, jamais sur *si* : toute éclosion donne un dino, et si ce dino porte une capsule (vidéo, berceuse, plus tard une histoire), elle arrive avec lui, attachée à sa fiche, rejouable depuis l'album (tiroir gauche de l'armoire, D-028). Le contenu est attaché au **dino**, jamais tiré au sort. Conséquences : zéro loot-box, zéro promesse (D-003), zéro nouvelle surface, et un levier de production limpide : produire une capsule = l'attacher à un dino.

Le dino-conseiller va plus loin : dissocier « enrichir la fiche » (accès libre, pour tous les dinos) de « récompenser le jeu » (capsule attachée). Les deux tiennent ensemble : l'ambiance sonore par famille enrichit l'exploration, la berceuse du dino qui éclot est la capsule.

### Ordre de production

1. **Musique d'abord** : zéro possédé, coût le plus bas, un thème par **famille** (6 à 9 morceaux de 10-15 s en boucle douce) couvre le catalogue. Double usage : fond d'exploration dans la grille famille, berceuse-capsule à l'éclosion.
2. **Vidéo ensuite** : rendre les 4 existantes débloquables, observer Max, ne rien produire de plus avant. Pour les autres dinos, l'alternative honnête est un **diaporama Ken Burns** (zoom/pan lent) sur les 5 scènes paléoart déjà produites par dino, synchronisé au récit audio existant : JS pur, zéro asset neuf, ça fait « vidéo » à 4 ans.
3. **Histoire en dernier** : un pilote avec le pôle narration avant d'en promettre.

**Bloquant : recette HO-MJ-21 avec Max (3 parties, le nid se remplit, une éclosion donne un dino visible).**

**Décision attendue : capsule attachée au dino, jamais tirée au sort. Oui ?**

---

## C. Interactions physiques et capteurs

### La règle à graver avant toute ligne de code

> **Un capteur est un raccourci joyeux, jamais une condition de réussite.** Toute action déclenchable par un capteur reste déclenchable par un tap. C'est ce qui rend la piste compatible avec zéro pénalité, avec les appareils sans capteur, et avec un enfant qui n'y arrive pas ce jour-là. mj-21 fait déjà exactement ça (`mixerTube()` par secousse et par bouton).

Deuxième règle, de MAX_PROFILE : réaction forte aux stimuli inattendus. **Jamais de vibration surprise**, toujours liée au doigt qui bouge, et un interrupteur dans `compte.html`.

### Capteur par capteur

| Capteur | PWA Android | Permission | Fiabilité à 4 ans | Verdict | Mécanique proposée |
|---|---|---|---|---|---|
| Vibration (`navigator.vibrate`) | Oui | Aucune | Totale (c'est une sortie) | **Maintenant** | mj-28 La lampe du dino : vibre de plus en plus fort quand la lampe approche du dino caché. « Tu chauffes » sans un mot, sans audio qui se superpose. Coût S. |
| Secouer (`devicemotion`) | Oui, en prod | Aucune | Bonne | **Maintenant** | mj-57 : secouer fait remuer les œufs (cosmétique). Encyclopédie : secouer = tremblement de pas, réservé aux 2-3 vrais géants (Patagotitan, Brachiosaure), bonus du bloc « Sa taille ». Coût S. |
| Inclinaison (`deviceorientation`) | Oui | Aucune | Bonne en binaire, mauvaise en visée continue | **Maintenant, seuil uniquement** | « Penche pour verser » dans mj-18 ou au nid, seuil > 25°, jamais proportionnel. Coût S. |
| Retourner la tablette | Oui | Aucune | Bonne | **Maintenant** | Easter egg : écran face au tapis = « le dino dort », écran noir + berceuse, on retourne, il se réveille. Zéro enjeu. Le genre de chose dont il parle des jours. Coût S. |
| Souffler (`getUserMedia` + `AnalyserNode`) | Oui | Micro (le parent la donne une fois, persistante par origine) | Moyenne : crier déclenche aussi, filtrer sur l'énergie < 500 Hz | **À prototyper** | Souffler sur la poussière qui recouvre un fossile pour révéler le dino. Bon usage d'un capteur imprécis : le souffle ne peut pas rater, il révèle plus ou moins vite. Coût M. Le dino-conseiller y voit un gadget sans valeur pédagogique : à trancher après prototype. |
| Mettre dans le noir (`AmbientLightSensor`) | **Non** : derrière un flag Chrome | | | **Écarté** | mj-28 simule déjà le noir à l'écran, fiable partout. Ne pas payer un capteur, un flag et une permission caméra pour un effet déjà en prod. Côté dino, le fait « nocturne » n'est sourcé que pour une poignée d'espèces. |
| Écouter un cri et deviner | Oui (un MP3) | Aucune | | **Écarté** | On ne connaît pas le cri d'un dinosaure (tissus mous non fossilisés). Tout cri serait une fiction habillée en fait : contradiction frontale avec « Encyclopédie = VRAI ». Récupérable seulement comme hypothèse dite à voix haute, trop fragile à 4 ans. |
| Prononcer un mot (`webkitSpeechRecognition`) | Oui | Micro | **Mauvaise** : service réseau (la PWA se dit hors ligne), latence 1-2 s, modèles adultes, noms latins | **Écarté comme mécanique notée** | Un échec de reconnaissance est une pénalité invisible qu'on ne contrôle pas. Si un jour : mode miroir (« dis le nom » → on affiche ce qu'on a entendu, aucun jugement, bouton suivant toujours là), pas avant 5 ans. Voir aussi le dossier Jev pour une tolérance à l'erreur de transcription. |
| Écouter (l'enfant écoute) | | | | **Déjà fait** | Le nom prononcé lentement existe (bloc 1, bouton 🔊). Rien à ajouter. |

### Synthèse

Côté **jeu**, le geste physique peut être l'apprentissage (compter, trier, verser) : quatre mécaniques faisables maintenant, une à prototyper. Côté **encyclopédie**, le geste décore un savoir déjà transmis par le texte et l'audio : un seul survivant (secouer = pas de géant), en bonus.

**Décision attendue : on pousse vibration mj-28, secouer géants et l'easter egg « dino dort » (3 × S) ? Et on prototype le souffle, ou on ferme ?**

---

## D. Écran de fin de partie normé

### État réel (`site/js/mj-golden.js`, `showEnd()`, l.412-445)

| Bouton | Couleur | Condition |
|---|---|---|
| 🔄 Encore ! | `#00c47a` vert | toujours |
| 🥚 Au nid ! | `#ff8fb8` rose | seulement si gain cette partie |
| La suite → | `#ffd166` jaune | seulement s'il y a un jeu suivant |
| 🏠 Maison | `#ffffff22` translucide | toujours |

Donc « rejouer = vert » est en prod depuis longtemps et le bouton nid existe. Les vrais écarts sont ailleurs.

### Le défaut n° 1 : les positions bougent

« Au nid » et « La suite » sont conditionnels, donc le bouton Maison n'est jamais au même endroit d'un écran de fin à l'autre. Pour une main de 4 ans qui apprend un geste par répétition, c'est le pire défaut, bien avant les couleurs.

→ **Quatre emplacements fixes**, un bouton absent laisse un trou et ne décale pas ses voisins. Ordre gauche → droite, du plus fréquent au plus rare : `[Encore] [Au nid] [La suite] [Armoire]`. « Encore » est l'action principale (56 px de haut minimum, règle mobile parents), Armoire la plus discrète.

### Couleurs : le conflit n'est pas avec les bus, il est avec les billes

Les couleurs IDFM vivent dans `data.js` et l'UI dans `mp-theme.css` : pas de conflit. Mais le vert et le jaune portent déjà un sens gravé dans STANDARD-MJ (bille verte = réussi du premier coup, jaune = deuxième coup, orange = troisième, rouge = raté), et l'écran de fin affiche la piste de billes **et** un bouton jaune sur le même écran.

→ **Bleu pour « La suite »** (`#4d9de0`, déjà dans la palette maison via mj-18), comme le demande Papa Yann. Le jaune sort de l'écran de fin.
→ **Vert pour « Encore »**, assumé : la collision avec la bille verte est bénigne, les deux disent « c'est bien, continue ».

### Lisibilité sans lire

Il ne lit pas « Encore ! » de façon fiable. Chaque bouton doit être identifiable sans lecture : couleur distincte + pictogramme distinct + texte en plus, jamais texte seul. Aujourd'hui « Encore » et « La suite » sont deux rectangles avec une flèche, trop proches de loin.

### Audio : oui, mais pas une consigne

Une phrase lue à l'affichage arrive juste après la célébration et casse l'émotion (EP-033 a déjà coûté cher). → **Chaque bouton dit son mot quand le doigt se pose dessus** (appui = « Encore ! », relâché = on y va). L'audio devient de l'exploration. Cinq MP3 courts, pipeline voix maison. Coût S.

### Maison ou armoire : tranché

**Ni l'un ni l'autre en mot, l'armoire en image.** La maison est un mensonge depuis D-025 (l'accueil est un meuble), et le CONTRAT MJ v2 impose que la miniature montre ce qu'on va voir. Pictogramme : une petite armoire fermée, sprites déjà dans `site/img/armoire/`. Nuance : « Au nid » et « Armoire » mènent à la même page (`index.html?open=nid` vs `index.html`). Ça ne tient que si l'icône nid montre l'œuf, jamais le meuble. C'est le cas aujourd'hui, à préserver dans la figée.

### Coût et portée

Un seul fichier, les 36 jeux d'un coup : le meilleur rapport effort/portée de tout ce dossier. Coût S-M. À graver dans STANDARD-MJ (Pilier 5) + une figée « les quatre emplacements de l'écran de fin sont fixes ».

**Décision attendue : pictogramme armoire à la place de la maison, bleu pour La suite, 4 emplacements fixes. Oui ?**

---

## E. Idées neuves

### Mini-jeux (pôle JEU), hors doublons du TODO

| # | Jeu | Mécanique | Pédagogie | Passion de Max | Coût |
|---|---|---|---|---|---|
| E1 | **Depann2000, le bus en panne** | La dépanneuse arrive, choisir parmi 3 pièces celle dont la silhouette correspond au trou (roue, phare, rétro) | Appariement forme/négatif, vocabulaire technique | La dépanneuse : zéro entrée dans les 36 jeux | S |
| E2 | **Le compteur de la ligne 185** | Le compteur affiche un nombre, taper le suivant parmi 3. Niveaux 8→9→10, 98→99→100, 998→999→1000 | **Franchissement de dizaine/centaine/millier**, rien au catalogue ne le travaille | La ligne de l'école | S-M |
| E3 | **Le terminus** | Garer chaque bus sur la place dont le numéro correspond, numéro dit et écrit | Appariement chiffre/son, nombres à 2-3 chiffres | Le mot « terminus », vocabulaire réservé jamais utilisé | S |
| E4 | **Le loup qui compte les moutons** | Le loup emmène un ou deux moutons, combien il en reste, 3 réponses | **Soustraction contextuelle : le seul trou de compétence du catalogue** (tout est additif) | Le loup, qui le fait frissonner, absent partout. Le loup emmène, ne mange pas à l'écran. | M |
| E5 | **Le drapeau à finir** | Drapeau à moitié peint, compléter la bande parmi 3 couleurs ; niveau haut « c'est quel pays ? » | Discrimination de couleur, mémoire visuelle | Les drapeaux, décor seulement dans mj-20 | S |
| E6 | **L'appel des noms** | 3 ombres de dino, la voix dit le son initial, taper le bon ; au succès le nom s'écrit, première lettre surlignée | Graphème/phonème son-first | Dinos. Ombres et MP3 `*-nom` existent : c'est du montage. **Même moteur que le tourniquet A.** | S |
| E7 | **La ligne de bus à reconstituer** | 4 arrêts dans le désordre, remettre dans l'ordre avec le plan au-dessus ; à la fin le bus parcourt la ligne | Séquence ordinale, lecture de plan. Tap-tap pour échanger, pas de drag | Les itinéraires réels (185, 162, 172) | M |
| E8 | **Le nid qui chante** | 5 œufs, chacun une note ; une mélodie de 3 notes se joue, la rejouer | Mémoire auditive courte, sans texte | Œufs, esthétique Ghibli. Répond au ticket Simon (EP-047). | S-M |

### Enrichissements de fiche (pôle DINO)

| # | Enrichissement | Pédagogie | Coût |
|---|---|---|---|
| D1 | **« Et aujourd'hui ? »** : le descendant vivant le plus proche (oiseaux pour les théropodes, crocodile pour certains archosaures) | Lien passé/présent, très fort à 4 ans, cohérent avec le « ça existe encore ? » de la flore | S-M (texte à fact-checker) |
| D2 | **« Comment on le sait »** : 1-2 phrases, un fossile trouvé où, une empreinte, un moulage | La seule façon honnête d'introduire « on imagine » : enseigne la démarche, pas que des faits. Axe absent des 8 axes actuels. | M-L |
| D3 | Comparaison de taille avec un enfant de 1 m (silhouette superposée) | Rend « 9 mètres » concret | S (valeurs `_compLong` déjà calculées) |
| D4 | Frise « qui vivait en même temps que qui » sur la fiche | Combat le mythe « tous les dinos vivaient ensemble » | M (données `periode`/`epoque` déjà là) |
| D5 | Dinos voisins de la même famille en bas de fiche | Notion de famille sans repasser par le menu | S |
| D6 | Badge « record » (plus grand/rapide/lourd de sa famille) | Superlatifs = mémorisation. Danger : fact-check comparatif rigoureux ou c'est un mensonge d'échelle. | M |
| D7 | Repère humain pour « 66 millions d'années », en plus du vrai chiffre | Le million est un mur d'abstraction | S mais délicat, atelier écriture |
| D8 | Fiche texte pour le parent, hors ligne / imprimable | Rituel du soir sans tablette | S |

Priorité du dino-conseiller : D1 et D2, parce qu'ils servent l'honnêteté scientifique au lieu de décorer, et coûtent du texte, pas des pipelines audio/image déjà sous quota.

---

## F. Ordre proposé

| Rang | Quoi | Pourquoi | Coût |
|---|---|---|---|
| 1 | Recette Max : armoire v8 + nid réparé | Deux livraisons jamais vues par l'enfant, tout le reste en dépend | |
| 2 | D. Écran de fin (EP-135) | Un fichier, 36 jeux, le défaut « les boutons bougent » est réel | S-M |
| 3 | E6. L'appel des noms (EP-137) | Assets déjà là, trou pédagogique son-first, fabrique le moteur du tourniquet | S |
| 4 | A. Tourniquet (EP-136) | Après E6 c'est du câblage. Arbitrage DINO. | M |
| 5 | E4. Le loup, soustraction (EP-144) | Seul vrai trou de compétence | M |
| 6 | C. Vibration mj-28 + secouer géants + dino dort (EP-140/141/EP-D20) | Capteurs les plus fiables, zéro permission | 3 × S |
| 7 | B. Berceuses par famille (EP-138/EP-D18) | Après la recette du nid, jamais avant | M |
| 8 | D1 + D2 fiches (EP-D21) | Honnêteté scientifique | S-M / M-L |

## G. Les décisions attendues de Papa Yann

1. **Péage** : tourniquet qui n'arrête jamais, jamais sur une fiche neuve, une fiche sur trois ; ou pas de péage du tout (position dino-conseiller).
2. **Capsules** : attachées au dino qui éclot, jamais tirées au sort, jamais promises.
3. **Écran de fin** : armoire à la place de la maison, bleu pour La suite, quatre emplacements fixes.
4. **Capteurs** : les trois « S » tout de suite ; prototyper le souffle ou fermer.
5. **Idées neuves** : lesquelles passent en brief parmi E1-E8 et D1-D8.
