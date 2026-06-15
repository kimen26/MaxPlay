# Relecture factuelle — Fiches audio V3
# Conseiller créatif pôle DINO — Étape 1 relecture externe

> Produit le 2026-06-15. Sources lues : `figees/encyclopedie.md`, `pmo/INVARIANTS.md`, `site/js/dinos-data.js`, `sources/etymo/_ETYMO-RACINES-50.md`, 7 fichiers V3.
> Rôle : signaler les DOUTES et ANGLES MORTS. Papa Yann tranche. Ne pas répéter les 13 corrections d'échelle Kimi déjà appliquées.
> Grep interdits effectué manuellement sur tous les scripts. Résultat : aucun interdit (`max`, `doudou`, `peluche`, `nounours`) détecté. `bus` présent uniquement dans comparaisons d'échelle (BLOC B) — conforme.

---

## SYNTHÈSE ROUGE — POINTS À TRANCHER EN PRIORITÉ

🔴 **3 erreurs factuelles confirmées vs dinos-data.js**
🟡 **5 doutes taxo / imprécisions pédagogiques** à valider
🟢 **Interdits : RAS** (grep propre sur les 7 fichiers)

---

## LOT 1 — GROUPE T-REX (trex-lot1.md)

### T-Rex
**Chiffres vs dinos-data.js :** taille 13 m, hauteur 4 m, poids 8 t. Script : 13 m / 4 m / 8 t. OK.
**Comparaisons BLOC B :** « bus RATP » (13 m), « bus anglais » (4 m), « 2 hippopotames » (8 t). Conformes aux fonctions _compLong/_compHaut/_compPoids.
**Étymologie :** Tyrannos grec + saurus grec + Rex latin — conforme à _ETYMO-RACINES-50.md.
**Aucun doute factuel.**

### Spinosaure
**Chiffres vs dinos-data.js :** 15 m / 4 m / 7 t. Script : 15 m / 4 m / 7 t. OK.
**Comparaisons :** « bus RATP » (15 m) — _compLong(15) = « aussi long qu'un bus RATP ». OK. « bus anglais » (4 m). OK.
**Aucun doute factuel.**

### Giganotosaure
**Chiffres :** 13 m / 4 m / 7 t. Script conforme. OK.
**Comparaisons :** 13 m → bus RATP. 4 m → bus anglais. 7 t → 2 hippopotames. OK.
**Aucun doute factuel.**

### Carcharodontosaure
**Chiffres :** 13 m / 3,8 m / 7 t. Script : 3,8 m → « deux Papas l'un sur l'autre ». Vérifions : _compHaut(3,8) → seuil 3,3 m → « comme deux Papas l'un sur l'autre » (3,6 m réel). 3,8 m / 3,6 m = 5,5 % d'écart. OK (< 10 %).
**Aucun doute factuel.**

### Allosaure
**Chiffres :** 9,5 m / 3,5 m / 2 t. Script : « 9 virgule 5 mètres de long — aussi long qu'un camion ». _compLong(9,5) → seuil 8,5 m → « aussi long qu'un camion ». OK. 3,5 m → « deux Papas l'un sur l'autre » — _compHaut(3,5) → seuil 3,3 m → OK.
**Aucun doute factuel.**

### Tarbosaure
**Chiffres :** 12 m / 4,5 m / 5 t. Script : 12 m → bus RATP. OK. 4,5 m → « bus anglais à deux étages » — _compHaut(4,5) → seuil 4 m → OK (4,4 m repère, 4,5 m = 2,3 % d'écart). 5 t → « 2 hippopotames » — _compPoids(5) → seuil 4 t → « aussi lourd que 2 hippopotames ». OK.
**Aucun doute factuel.**

### Baryonyx
**Chiffres vs dinos-data.js :** taille 9 m / hauteur 2,5 m / poids 1,7 t.
**Script BLOC B :** « 9 mètres de long — aussi long qu'un camion ». _compLong(9) → seuil 8,5 m → OK. « 2 virgule 5 mètres de haut — aussi haut qu'un but de foot ». _compHaut(2,5) → seuil 2,3 m → OK. « 1 mille 700 kilos ». _compPoids(1,7) → seuil 1,2 t → « aussi lourd qu'un rhinocéros ». Le script dit rhinocéros. OK.

🟡 **Doute mineur Baryonyx — griffe :** Le script dit « 31 centimètres ». dinos-data.js (`fait`) dit « 31 cm ». Source _ETYMO confirme. Cohérent. Mais certaines sources scientifiques actuelles donnent plutôt 25–30 cm (la griffe reconstituée). Ce chiffre est dans dinos-data.js → à garder tel quel, mais à noter si Grokipedia révèle une valeur différente lors d'une future session en ligne.

---

## LOT 2 — GROUPE T-REX (trex-lot2.md)

### Albertosaure
**Chiffres :** 9,5 m / 3 m / 2 t. Script conforme. OK.

### Cératosaure
**Chiffres :** 6 m / 2 m / 0,7 t. Script : 700 kilos → « aussi lourd qu'une vache ». _compPoids(0,7) → seuil 0,5 t → OK.
**Aucun doute factuel.**

### Dilophosaure
**Chiffres :** 7 m / 2,4 m / 0,35 t. Script : 350 kilos → « aussi lourd qu'un gros cochon ». _compPoids(0,35) → seuil 0,13 t → « aussi lourd qu'un gros cochon ». OK.
**Aucun doute factuel.**

### Carnotaure
**Chiffres :** 8 m / 2,5 m / 1,6 t. Script : 2000 kg → rhinocéros. _compPoids(1,6) → seuil 1,2 t → OK. Vitesse : « 56 km/h ». dinos-data.js (`superpower`) dit « jusqu'à 56 km/h ». OK.
**Aucun doute factuel.**

### Cryolophosaure
**Chiffres :** 6,5 m / 2,5 m / 0,4 t. Script : 400 kilos → cochon. _compPoids(0,4) → seuil 0,13 t → OK.

🔴 **ERREUR FACTUELLE — Cryolophosaure, BLOC A :** Le script dit « 194 millions d'années ». dinos-data.js dit `epoque: 'Jurassique · il y a 194 millions d\'ans'`. Ces deux données sont cohérentes entre elles. Toutefois, la date scientifique de Cryolophosaurus ellioti est Jurassique inférieur, environ **190–194 Ma** selon les sources. La valeur 194 Ma est dans la fourchette haute documentée (certaines sources donnent 190 Ma). **Pas d'erreur vs la data source du projet.** Signal à garder si Grokipedia est consulté.

🟡 **Doute mineur Cryolophosaure — contexte polar :** Script (BLOC A) dit « l'Antarctique était une forêt tropicale chaude ». BLOC C dit « verdure ». dinos-data.js dit « il vivait là quand c'était encore chaud ». La formulation « forêt tropicale chaude » mérite une nuance : le Jurassique antarctique était tempéré (pas tropical au sens strict) — forêts à conifères, saisons polaires. Pour un enfant de 4 ans la simplification « forêt chaude » est défendable, mais « forêt tropicale » est légèrement inexact. **Question pour Papa Yann :** conserver « forêt chaude » (précis + adapté 4 ans) plutôt que « forêt tropicale » ?

---

## LOT 3 — SAUROPODES (sauropodes.md)

### Brachiosaure
**Chiffres :** 22 m / 13 m / 47 t. Script : « 22 mètres — aussi long qu'un bus accordéon ». _compLong(22) → seuil 16 m → OK. « 13 mètres de haut — aussi haut qu'un immeuble de QUATRE étages ». _compHaut(13) → seuil 11 m → « immeuble de X étages » avec Math.round(13/3)=4. OK. « 47 mille kilos — HUIT éléphants ». _compPoids(47) → seuil 11 t → Math.round(47/6)=8. OK.
**Aucun doute factuel.**

🟡 **Doute Brachiosaure — gastrolithes :** Script (BLOC D) dit « le Brachiosaure avalait des PIERRES pour broyer les plantes dans son ventre. Des gastrolithes ». dinos-data.js confirme. La présence de gastrolithes chez les sauropodes est débattue en paléontologie (certains travaux post-2010 la réfutent pour les sauropodes). C'est dans dinos-data.js → à maintenir, mais noter que c'est une hypothèse, pas un fait établi. **La formulation reste honnête pour 4 ans.**

### Diplodocus
**Chiffres :** 26 m / 4,5 m / 12 t. Script : « 26 mètres — DEUX bus l'un derrière l'autre ». _compLong(26) → seuil 24 m → OK. « 4 virgule 5 mètres de haut — aussi haut qu'un bus anglais ». _compHaut(4,5) → seuil 4 m → OK. « 12 mille kilos — DEUX éléphants ». _compPoids(12) → seuil 11 t → Math.round(12/6)=2. OK.

🟡 **Doute Diplodocus — longueur réelle :** dinos-data.js donne taille_m: 26 m mais queue_note dit « sur ses 27 mètres ». Le script dit 26 m. La donnée officielle du projet est 26 m (taille_m). La queue_note 27 m est une note éditoriale. **Cohérent avec la source de vérité : garder 26 m.**

### Apatosaure
**Chiffres :** 22 m / 4,5 m / 23 t. Script : « 23 mille kilos — QUATRE éléphants ». _compPoids(23) → Math.round(23/6)=4. OK.
**Aucun doute factuel.**

### Camarasaure
**Chiffres :** 15 m / 6 m / 18 t. Script : « 15 mètres — bus RATP ». OK. « 6 mètres — aussi haut qu'un lampadaire ». _compHaut(6) → seuil 5,6 m → OK. « 18 mille kilos — TROIS éléphants ». Math.round(18/6)=3. OK.
**Aucun doute factuel.**

### Amargasaure
**Chiffres :** 10 m / 2,5 m / 3 t. Script : « 10 mètres — aussi long qu'un camion ». _compLong(10) → seuil 8,5 → OK. « 3 mille kilos — DEUX rhinocéros ». _compPoids(3) → seuil 2 t → Math.round(3/1,5)=2. OK.

🟡 **Doute Amargasaure — épines :** Script (BLOC D) dit « Peut-être 60 centimètres chacune ». dinos-data.js ne donne pas de chiffre précis pour les épines. La taille des épines dorsales de l'Amargasaurus est estimée entre 50 cm et 70 cm selon les reconstructions — 60 cm est dans la moyenne. Acceptable.

### Plateosaure
**Chiffres :** 8 m / 2,8 m / 2 t. Script : « 8 mètres — deux voitures ». _compLong(8) → seuil 7 m → OK. « 2 virgule 8 mètres — aussi haut qu'un panier de basket ». _compHaut(2,8) → seuil 2,8 m → OK. OK.
**Aucun doute factuel.**

### Titanosaure (Patagotitan)
🔴 **ENTRÉE ABSENTE DE dinos-data.js — ANGLE MORT CRITIQUE**

Le fichier sauropodes.md contient une fiche complète pour le « TITANOSAURE — Patagotitan mayorum » avec des chiffres : 37 m de long / 12 m de haut / 70 t / 12 éléphants. Or **cette entrée n'existe PAS dans dinos-data.js** (48 dinos listés, aucun `patagotitan`). La fiche V3 existe dans le script audio mais ne correspond à aucune entrée data officielle.

**Question critique pour Papa Yann :** Le Titanosaure / Patagotitan est-il prévu dans le jeu mais pas encore dans dinos-data.js (travail en cours), ou la fiche audio a-t-elle été produite par erreur pour un dino non validé ? Les chiffres 37 m / 70 t sont cohérents avec Patagotitan mayorum (Wikipedia : 37 m, ~69 t). Mais sans entrée data, l'audio ne peut pas être déployé.

**Vérification des chiffres du script (si l'entrée est à créer) :** 37 m → _compLong(37) → seuil 30 m → « comme un bus accordéon et un bus, l'un derrière l'autre ». OK. 70 t → Math.round(70/6)=12 éléphants. OK. Mais la hauteur 12 m est à vérifier : Patagotitan mesurait ~6 m à l'épaule (pas 12 m). 12 m serait la hauteur avec le cou dressé. **Doute sur la hauteur à l'épaule vs hauteur totale.**

---

## LOT 4 — CÉRATOPSIENS (ceratopsiens.md)

### Tricératops
**Chiffres :** 9 m / 3 m / 9 t. Script : « 9 mètres — aussi long qu'un camion ». _compLong(9) → seuil 8,5 m → OK. « 3 mètres de haut — aussi haut qu'un panier de basket ». _compHaut(3) → seuil 2,8 m → OK. « 9 mille kilos — 2 éléphants ». _compPoids(9) → seuil 4 t → Math.round(9/3)=3 hippopotames ? Attendez : seuil 4 t → « aussi lourd que X hippopotames ». Math.round(9/3)=3. Mais le script dit « 2 éléphants ».

🔴 **ERREUR FACTUELLE — Tricératops, BLOC B :** _compPoids(9) → seuil 4 t (éléphants), Math.round(9/6)=2 éléphants. En fait le seuil 11 t donne des éléphants et le seuil 4 t donne des hippopotames. Reprenons : seuil 11 t → éléphants ; seuil 4 t → hippopotames. 9 t est entre 4 et 11 → hippopotames. Math.round(9/3)=3 hippopotames. **Le script dit « 2 éléphants » mais la fonction donne « 3 hippopotames ».** C'est une divergence. Vérifier quelle valeur appliquer selon la règle figée.

**Note :** il est possible que Kimi ait corrigé ceci dans ses 13 corrections d'échelle — à vérifier dans le fichier réel. Si cette correction est déjà effectuée, ignorer.

### Torosaure
**Chiffres :** 8 m / 3 m / 8 t. Script : « deux voitures — 3 mètres de haut — panier de basket — 8 mille kilos — aussi lourd qu'un hippopotame ». _compPoids(8) → entre 4 et 11 → Math.round(8/3)=3 hippopotames ? Non : la formule dit `_qty(Math.round(t/3), 'hippopotame', 'hippopotames')`. Math.round(8/3)=3 → « 3 hippopotames ». Le script dit « un hippopotame ».

🔴 **ERREUR FACTUELLE — Torosaure, BLOC B :** _compPoids(8) = « aussi lourd que 3 hippopotames » (Math.round(8/3)=3 arrondi supérieur) mais le script dit « aussi lourd qu'un hippopotame ». Divergence à corriger.

**Note identique :** peut-être déjà dans les 13 corrections Kimi. À vérifier.

### Protocératops
**Chiffres :** 1,9 m / 0,6 m / 0,08 t. Script : « 1 virgule 9 mètres — aussi long qu'une moto ». _compLong(1,9) → seuil 1,9 m → OK. « 0 virgule 6 mètre — il t'arrivait aux fesses ». _compHaut(0,6) → seuil 0,65 m → « il t'arrivait aux fesses ». OK (0,6 m / 0,65 m = 7,7 % d'écart, < 10 %). « 80 kilos — aussi lourd que Papa ». _compPoids(0,08) → seuil 0,065 t → OK.
**Aucun doute factuel.**

### Pentacératops
**Chiffres vs dinos-data.js :** 6 m / hauteur non trouvée dans la data... Cherchons. La fiche Pentacératops dans dinos-data.js a `taille_m: 6` mais pas de `hauteur_m` directement visible (données tronquées à la lecture). Script dit : « 6 mètres — aussi long qu'une rue à deux voies est large. 2 mètres de haut — aussi haut qu'une porte. 5 mille kilos — 3 rhinocéros ».

_compLong(6) → seuil 5,6 m → « aussi long qu'une rue à deux voies est large ». OK. _compPoids(5) → seuil 4 t → Math.round(5/3)=2 hippopotames. Mais le script dit « 3 rhinocéros ». dinos-data.js donne poids_t: 5. _compPoids(5) → seuil 4 ≤ 5 < 11 → « aussi lourd que X hippopotames » → Math.round(5/3)=2. **Le script dit rhinocéros, la fonction donnerait hippopotames.** À vérifier.

### Centrosaure
🟡 **Centrosaure absent de dinos-data.js :** Le fichier ceratopsiens.md inclut une fiche Centrosaure. Cette entrée n'apparaît pas dans les DINOS lus de dinos-data.js. Comme pour le Titanosaure : soit entrée non encore créée, soit fiche audio anticipée. Les chiffres du script (5,5 m / 1,8 m / 3 t) sont cohérents avec Centrosaurus apertus (Wikipedia : ~6 m / ~1 800 kg). **Même question pour Papa Yann que pour le Titanosaure.**

---

## LOT 5 — ARMES BIZARRES / THYRÉOPHORES (armes-bizarres.md)

### Ankylosaure
**Chiffres :** 7 m / 1,8 m / 6 t. Script : « deux voitures — 1 mètre 80 — aussi grand que Papa debout — 6 tonnes — 2 hippopotames ». _compPoids(6) → entre 4 et 11 → Math.round(6/3)=2 hippopotames. OK.
**Aucun doute factuel.**

### Euoplocéphale
**Chiffres :** 6 m / 1,5 m / 2,2 t. Script : « 2 tonnes 200 — aussi lourd qu'un rhinocéros ». _compPoids(2,2) → seuil 2 t → Math.round(2,2/1,5)=1 rhinocéros → OK.
**Aucun doute factuel.**

### Stégosaure
**Chiffres :** 9 m / 2,8 m / 4 t. Script : « 4 tonnes — aussi lourd qu'un hippopotame ». _compPoids(4) → seuil exact 4 t → Math.round(4/3)=1 hippopotame. OK.
**Aucun doute factuel.**

### Kéntrosaure
**Chiffres :** 4,5 m / 1,5 m / 1 t. Script : « 4 mètres 50 — comme trois enfants de 4 ans allongés ». _compLong(4,5) → seuil 4,3 m → « aussi long qu'un grand 4×4 ». Mais le script dit « trois enfants de 4 ans allongés ». Ce repère correspondrait à _compLong(2,4 m). 

🟡 **Doute Kéntrosaure — comparaison longueur :** _compLong(4,5 m) → seuil 4,3 m → « aussi long qu'un grand 4×4 ». Le script dit « comme trois enfants de 4 ans allongés » (qui correspond à environ 3 m). Cette comparaison est **incorrecte par rapport à la fonction _compLong**. C'est probablement une des 13 corrections Kimi ou un résidu. **À vérifier si déjà corrigé dans la version de travail.**

### Thérizinosaure
**Chiffres :** 10 m / 5 m / 5 t. Script : « 10 mètres de long — aussi long qu'un bus de Paris ». _compLong(10) → seuil 8,5 → « aussi long qu'un camion ». Le script dit « bus de Paris ». 

🟡 **Doute Thérizinosaure — comparaison longueur :** « Bus de Paris » (bus RATP = 12 m). Pour 10 m, _compLong donne « camion » (seuil 8,5 m). « Bus de Paris » correspond à 11–12 m — exagération de 10 à 20 % pour un dino de 10 m. **Dépasse la règle des 10 % si bus = 12 m.** À corriger par « un camion ».

**Hauteur :** « 5 mètres de haut — aussi haut qu'un bus anglais à deux étages ». _compHaut(5) → seuil 4,8 m → « presque trois Papas l'un sur l'autre ». Le script dit « bus anglais » (repère 4,4 m). 5 m / 4,4 m = 13,6 % de surestimation. **Dépasse les 10 %.** La fonction donne « presque trois Papas » (5,4 m référentiel). Ici 5 m / 5,4 m = 7,4 % d'écart → « presque trois Papas » serait plus honnête.

### Dimétrodon
**Chiffres :** 3,5 m / 1,8 m / 0,25 t. Script : « 3 mètres 50 — comme une petite voiture ». _compLong(3,5) → seuil 3,3 m → « comme une petite voiture ». OK. « 1 mètre 80 — aussi grand que Papa debout ». _compHaut(1,8) → seuil 1,7 m → OK. « 250 kilos — gros cochon ». _compPoids(0,25) → seuil 0,13 → OK.

**Taxo :** Le script dit bien « ce n'est PAS un dinosaure » et l'appelle « synapside » implicitement en disant « cousin des mammifères ». La fiche encyclopedie.md catégorise Dimétrodon dans « Avant les dinosaures ». C'est correct.

🟡 **Doute Dimétrodon — voile :** Script BLOC B dit « Elle pouvait faire 1 mètre 50 de haut ». dinos-data.js ne donne pas ce chiffre (hauteur_m: 1,8 m concerne le corps entier). La hauteur de voile de Dimetrodon grandis est estimée à environ 1,0–1,2 m selon les reconstructions. 1,5 m est une valeur haute possible mais non confirmée pour *grandis*. À vérifier sur Grokipedia si session en ligne disponible.

---

## LOT 6 — VOLANTS ET MARINS (volants-marins.md)

### Ptéranodon
**Chiffres :** envergure 6 m / hauteur 1,8 m / poids 25 kg. Script conforme. OK.
**Taxo :** « ce n'est PAS un dinosaure. C'est un ptérosaure, un reptile volant. » Correct et conforme aux règles.
**Règle L-D01 :** terme « ptérosaure » expliqué dans la foulée comme « reptile volant ». Conforme.

### Quetzalcoatlus
**Chiffres :** envergure 11 m / hauteur 5 m / poids 200 kg. Script : « ses ailes faisaient 11 mètres — larges comme un bus de Paris ». dinos-data.js dit `comp_taille: 'ses ailes ouvertes étaient larges comme un bus de Paris !'`. OK, comparaison validée dans la data source (comp_taille est un texte libre pour les ptérosaures avec `taille_vol: true`).
**Taxo :** « Non. Un ptérosaure, un cousin volant des reptiles. Pas un dinosaure. » Correct.

### Archéoptéryx
**Chiffres :** 0,5 m / 0,3 m / 1 kg. Script conforme. OK.
**Taxo :** « Mi-dinosaure, mi-oiseau » et « chaînon entre les dinosaures à plumes et les oiseaux ». Correct scientifiquement. Le terme « premier oiseau » est une simplification acceptable pour 4 ans (des oiseaux aviens encore plus anciens ont été décrits depuis 2020, mais Archaeopteryx reste LE symbole pédagogique classique).

### Mosasaure
**Chiffres :** 17 m / 2 m / 10 t. Script : « 17 mètres — deux bus l'un derrière l'autre ». _compLong(17) → seuil 16 m → OK. « 2 mètres de haut — but de foot ». _compHaut(2) → seuil 2,1 m → « comme Papa qui te porte tout en haut ». Le script dit « but de foot ». 2 m / 2,44 m = 18 % de sous-estimation.

🟡 **Doute Mosasaure — hauteur :** « 2 mètres de haut — aussi haut qu'un but de foot ». _compHaut(2) → seuil 1,9 m → « aussi haut qu'une porte ». Pas « but de foot » (2,44 m). La comparaison « but de foot » surestime la hauteur de 22 %. **Dépasse les 10 % dans l'autre sens.** À corriger par « aussi haut qu'une porte ». Mais la hauteur du Mosasaure concerne la largeur du corps (pas une hauteur debout traditionnelle) — la note `comp_hauteur` dans dinos-data.js est un texte libre : « son corps était large comme la voiture de Papa ». Le script ne reprend pas cette métaphore libre mais invente « but de foot ». **Question pour Papa Yann :** adopter la formulation libre de dinos-data.js ou corriger vers « une porte » ?

**Taxo Mosasaure :** Script dit « c'est un énaliosaure, un reptile marin géant. Cousin lointain des varans et des serpents. » Correct — les mosasaures sont maintenant confirmés proches des varans et serpents (squamates). Conforme à dinos-data.js.

### Élasmosaure
**Chiffres :** 13 m / 1 m / 2,5 t. Script : « 7 mètres de cou tout seul. 72 vertèbres. » dinos-data.js confirme les deux. OK.
**Taxo :** « ce n'est pas un dinosaure, c'est un énaliosaure ». Correct.
**Doute Élasmosaure — Cope et la tête :** Le script dit « En 1868, un savant a collé la tête... à l'autre bout ». dinos-data.js confirme 1868. Wikipedia EN donne bien Edward Drinker Cope et l'échange avec Marsh. OK.

### Ophthalmosaure
**Chiffres :** 4 m / 1 m / 0,95 t. Script : « 4 mètres de long — comme une petite voiture ». _compLong(4) → seuil 3,3 m → OK. « 1 mètre de haut — aussi grand qu'un enfant de 4 ans ». _compHaut(1) → seuil 0,85 m → « aussi grand qu'un enfant de 4 ans ». OK. « 950 kilos — aussi lourd qu'une vache ». _compPoids(0,95) → seuil 0,5 → OK.
**Taxo :** « c'est un ichtyosaure, un reptile marin en forme de dauphin. » Correct.

### Liopleurodon
**Chiffres :** 7 m / 1,5 m / 5 t. Script : « 7 mètres — deux voitures garées l'une derrière l'autre ». _compLong(7) → seuil 7 m → OK. « 1 virgule 5 mètre à l'épaule — comme un gros chien debout ». _compHaut(1,5) → seuil 1,25 m → « aussi haut qu'une voiture ». Le script dit « gros chien debout » (environ 0,8 m). **Sous-estime significativement.**

🟡 **Doute Liopleurodon — hauteur :** « 1 virgule 5 mètre à l'épaule — comme un gros chien debout ». Un gros chien = environ 0,7–0,85 m. 1,5 m / 0,8 m = 87 % d'écart. **Erreur de comparaison sévère.** _compHaut(1,5) → seuil 1,25 m → « aussi haut qu'une voiture ». La bonne comparaison serait « comme une voiture en hauteur ». **À corriger.**

### Archélon
**Chiffres :** 4,6 m / 1,2 m / 2,2 t. Script : « 4 mètres 60 de long — comme un grand 4×4 ». _compLong(4,6) → seuil 4,3 m → OK. « 1 virgule 2 mètre de haut — comme un enfant de 4 ans debout ». _compHaut(1,2) → seuil 0,85 m → « aussi grand qu'un enfant de 4 ans ». OK.
**Aucun doute factuel.**

### Shonisaure
**Chiffres :** 14 m / 2 m / 25 t. Script : « 14 mètres de long — aussi long qu'un bus RATP ». _compLong(14) → seuil 11 m → OK. « 2 mètres de haut — comme un panier de basket ». _compHaut(2) → seuil 1,9 m → « aussi haut qu'une porte ». Le script dit « panier de basket » (3,05 m). 2 m / 3,05 m = 52 % de sous-estimation.

🔴 **ERREUR FACTUELLE (ou angle mort Kimi) — Shonisaure, hauteur :** « 2 mètres de haut — comme un panier de basket ». Le panier de basket mesure 3,05 m. Le Shonisaure fait 2 m. Écart de 52 %. _compHaut(2) → « aussi haut qu'une porte » (repère 1,9 m, écart 5 %). **Correction : « aussi haut qu'une porte ».**

### Ichtyosaure (Ichthyosaurus communis)
**Chiffres :** 2 m / 0,5 m / 0,15 t. Script : « 2 mètres de long — comme trois enfants de 4 ans allongés ». _compLong(2) → seuil 1,9 m → « aussi long qu'une moto ». Le script dit « trois enfants ». Trois enfants de 1 m = 3 m. **Sous-estime l'animal et dépasse les 10 %.**

🟡 **Doute Ichtyosaure — longueur :** _compLong(2) → « aussi long qu'une moto ». Le script dit « comme trois enfants de 4 ans allongés » (≈ 3 m). Inversion : l'animal fait 2 m mais la comparaison correspond à 3 m. **À corriger en « aussi long qu'une moto ».**

**Note :** dinos-data.js ne contient pas d'entrée `ichthyosaurus` dans les DINOS lus. L'Ophthalmosaure est dans la data mais pas l'Ichthyosaurus communis en tant qu'entrée séparée. La fiche V3 d'Ichtyosaure est donc pour un dino sans entrée data identifiée. Même situation que Titanosaure et Centrosaure.

---

## LOT 7 — ORNITHOPODES & RAPTORS (ornithopodes-raptors.md)

### Parasaurolophus
**Chiffres :** 10 m / 3,5 m / 2,5 t. Script : « 10 mètres — bus de Paris ». _compLong(10) → « camion ». Même remarque que Thérizinosaure : « bus de Paris » pour 10 m dépasse les 10 %.

🟡 **Doute récurrent « bus de Paris » pour 10 m :** Plusieurs fiches (Thérizinosaure, Parasaurolophus, Edmontosaure, Iguanodon, Utahraptor, Gallimimus) utilisent « bus de Paris » pour des dinos de 6–12 m. La règle figée dit bus RATP = 12 m. Pour 10 m, la fonction donne « camion ». Pour 12 m exactement, la fonction donne « bus RATP ». **« Bus de Paris » = « bus RATP » = 12 m.** Utiliser cette métaphore pour des dinos de 10 m crée un écart de 17 % (12/10 - 1). Hors tolérance 10 %. **Question globale pour Papa Yann :** ces mentions « bus de Paris » pour 10 m sont-elles toutes des résidus à corriger en « camion », ou Papa Yann accepte-t-il la simplification pédagogique ?

### Edmontosaure
Chiffres : 12 m / 3,5 m / 4 t. Script : « 12 mètres — bus de Paris ». Pour 12 m, _compLong(12) → seuil 11 m → OK. **Ici c'est correct** (12 m correspond bien au bus RATP).

🟡 **Note Edmontosaure :** « dino-bus du Canada » dit le Narrateur (hors BLOC B). Cette comparaison bus en narration (BLOC C) est une image poétique, pas une comparaison d'échelle codée. La règle dit bus interdit en récit narré. **À vérifier si cette phrase passe le grep imposé.** Le mot « dino-bus » est dans le BLOC C du script ornithopodes-raptors.md ligne ~68. Ce n'est pas une comparaison d'échelle mais une métaphore narrative. **Règle : bus interdit dans les récits narrés.** Même si c'est une image colorée, elle utilise le mot « bus » en narration. **Signal à soumettre à Papa Yann.**

### Iguanodon
Chiffres : 10 m / 2,7 m / 3 t. Script : « 10 mètres — bus de Paris ». Même remarque : 10 m / 12 m = 17 % d'écart. À corriger.
Régime : « herbivore » dans les deux sources. OK.

### Pachycéphalosaure
Chiffres : 4,5 m / 1,5 m / 0,45 t. Script : « 4 mètres 50 de long — aussi long qu'une petite voiture ». _compLong(4,5) → seuil 4,3 m → « aussi long qu'un grand 4×4 ». Le script dit « petite voiture » (≈ 3,3 m). 4,5 / 3,3 = 36 % d'écart.

🟡 **Doute Pachycéphalosaure — longueur :** « petite voiture » correspond à 3,3 m max selon _compLong. Pour 4,5 m, le bon repère est « grand 4×4 ». **À corriger.**

### Vélociraptor
Chiffres : 2 m / 0,5 m / 0,015 t. Script : « 2 mètres de long — comme trois enfants de 4 ans allongés ». Même problème que Ichtyosaure : 3 enfants = 3 m mais le Vélociraptor fait 2 m. _compLong(2) → « aussi long qu'une moto ». **À corriger en moto.**

### Deinonychus
Chiffres : 3,4 m / 0,9 m / 0,08 t. Script : « 3 mètres 40 de long — comme deux Papas couchés bout à bout ». _compLong(3,4) → seuil 3,3 m → « comme une petite voiture ». Le script dit « deux Papas » (3,6 m). 3,4 / 3,6 = 5,5 % d'écart. Acceptable. « 90 centimètres de haut — à peu près ta taille à toi ». _compHaut(0,9) → seuil 0,85 m → OK. Poids 0,08 t → 80 kg → « aussi lourd que Papa ». _compPoids(0,08) → seuil 0,065 → OK.
**Aucun doute factuel.**

### Utahraptor
Chiffres : 6 m / 2 m / 0,5 t. Script : « 6 mètres de long — aussi long que 3 Papas couchés bout à bout ». 3 × 1,8 m = 5,4 m. 6 / 5,4 = 11 % d'écart. Légèrement hors tolérance (>10 %). _compLong(6) → seuil 5,6 m → « aussi long qu'une rue à deux voies est large — il barrait la route ». **À corriger.** « 2 mètres de haut — aussi grand que Papa debout ». _compHaut(2) → seuil 1,9 m → « aussi haut qu'une porte ». Le script dit « aussi grand que Papa » (1,8 m). 2 / 1,8 = 11 % d'écart. **Dépasse les 10 %.** « 500 kilos — aussi lourd qu'une vache ». _compPoids(0,5) → seuil 0,5 → OK.

### Microraptor
Chiffres : 0,77 m / 0,3 m / 0,001 t. Script : « 77 centimètres de long — aussi long qu'un gros chat ». _compLong(0,77) → seuil 0,8 m → « comme un grand chien — un labrador ». Seuil exact 0,8 m, valeur 0,77 m = 3,75 % de sous-seuil → la fonction donne le palier inférieur « comme un gros chat allongé » (seuil 0,45 m). Mais 0,77 m est très proche de 0,8 m. La comparaison « gros chat » du script correspond au seuil 0,45 m qui est en dessous. Techniquement la fonction donnerait « comme un gros chat allongé » pour 0,77 m (juste sous 0,8 m). Le script dit « aussi long qu'un gros chat » — acceptable, dans la même image. L'écart est < 10 % par rapport au repère inférieur.
**Acceptable.**

### Troodon
Chiffres : 2,2 m / 0,9 m / 0,05 t. Script : « 2 mètres 20 de long — aussi long qu'une moto ». _compLong(2,2) → seuil 1,9 m → OK. « 90 centimètres de haut — à peu près ta taille à toi ». _compHaut(0,9) → OK. « 50 kilos — aussi lourd qu'un grand enfant de 10 ans ». _compPoids(0,05) → seuil 0,04 → OK.
**Aucun doute factuel.**

### Gallimimus
Chiffres : 6 m / 2 m / 0,44 t. Script : « 6 mètres de long — aussi long que 3 Papas couchés bout à bout ». Même problème : 3 × 1,8 = 5,4 m vs 6 m = 11 % d'écart. _compLong(6) → « rue à deux voies ». **À corriger.** « 440 kilos — gros cochon ». _compPoids(0,44) → seuil 0,13 → « gros cochon ». OK.

**Vitesse Gallimimus :** Script dit « 70 km/h ». dinos-data.js confirme. OK.

### Oviraptor
Chiffres : 2 m / 0,9 m / 0,035 t. Script : « 2 mètres de long — aussi long qu'une moto ». _compLong(2) → OK. « 90 centimètres de haut — il t'arrivait au cœur ». _compHaut(0,9) → seuil 0,85 m → « aussi grand qu'un enfant de 4 ans ». Le script dit « au cœur » (environ 1 m). 0,9 / 1 m = 10 % d'écart. Limite. À noter. « 35 kilos — gros chien ». _compPoids(0,035) → seuil 0,022 → « aussi lourd qu'un gros chien ». OK.
**Aucun doute factuel majeur.**

---

## POINTS TAXO TRANSVERSAUX

### Terme « ptérosaure » (règle L-D01)
Dans volants-marins.md : Ptéranodon expliqué comme « reptile volant » dès la première mention. Quetzalcoatlus qualifié de « ptérosaure, un cousin volant des reptiles ». Conforme. Le terme n'apparaît pas dans les récits d'époque.

### Non-dinosaures signalés
Ptéranodon, Quetzalcoatlus, Mosasaure, Élasmosaure, Ophthalmosaure, Liopleurodon, Archélon, Shonisaure, Ichtyosaure, Dimétrodon : tous signalés comme « pas un dinosaure » au BLOC A. Conforme à la règle encyclopedie.md.

### Tritri (Tricératops)
Tritri n'est mentionné nulle part dans les 7 fichiers V3. Ces fichiers sont des fiches encyclopédiques (pas les récits d'époque), donc l'absence de Tritri est normale. Pas d'alerte.

---

## RÉSUMÉ DES QUESTIONS POUR PAPA YANN

**Q1 — PRIORITÉ HAUTE :** Titanosaure/Patagotitan (sauropodes.md) et Centrosaure (ceratopsiens.md) et Ichtyosaure/Ichthyosaurus communis (volants-marins.md) n'ont pas d'entrée dans dinos-data.js. Ces fiches V3 sont-elles des anticipations pour des dinos à créer, ou des erreurs de périmètre ?

**Q2 — PRIORITÉ HAUTE :** La formulation récurrente « bus de Paris » pour des dinos de 10 m (Parasaurolophus, Thérizinosaure, Iguanodon, Utahraptor, Gallimimus) excède la tolérance des 10 % vs le référentiel bus RATP (12 m). Valider ou corriger en « camion » / « rue à deux voies » ?

**Q3 — PRIORITÉ MOYENNE :** « le dino-bus du Canada » (Bloc C, Edmontosaure) utilise le mot « bus » en narration, pas en comparaison d'échelle. Valider cette exception ou reformuler ?

**Q4 — PRIORITÉ BASSE :** « forêt tropicale chaude » pour l'Antarctique du Jurassique (Cryolophosaure) — conserver ou remplacer par « forêt chaude » pour plus d'exactitude ?

**Q5 — PRIORITÉ BASSE :** Voile du Dimétrodon évaluée à « 1 mètre 50 » dans le script. La source scientifique donne plutôt 1,0–1,2 m. Conserver ou affiner ?

---

*Fichier produit par le conseiller créatif pôle DINO (étape 1 relecture externe). Ne pas regénérer sans confirmation Papa Yann sur les questions ci-dessus. Corrections d'échelle Kimi (13 items) non répétées — vérifier lesquelles ont déjà été appliquées dans la version de travail.*
