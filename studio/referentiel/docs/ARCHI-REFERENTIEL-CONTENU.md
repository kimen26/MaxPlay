# Référentiel unique de contenu — plan d'architecture

> **Statut : PROPOSITION — non validée, rien n'est implémenté.**
> Transverse (JEU · DINO · NARRATION · LUNII). Rédigé 2026-08-10 sur demande Papa Yann.
> Décision attendue sur les questions § 8 avant tout lot.

---

## 1. Problématique

### 1.1 Le constat

Un même contenu existe aujourd'hui en **plusieurs versions indépendantes**, écrites à la main
séparément, sans lien déclaré entre elles. Cas mesuré sur un seul dino (Tyrannosaure) :

| Canal | Où vit le texte | Nature |
|---|---|---|
| Écran | `site/js/dinos-data.js` (13 champs/dino) | Écrit à la main |
| TTS navigateur (fiche) | Recomposé **inline** dans `site/dev-dinos.html` | Assemblage à la volée de 2-4 champs + connecteurs codés en dur |
| TTS navigateur (mini-jeu) | Recomposé **inline** dans `site/mj-31.html` | **Autre** assemblage, autres connecteurs, du même contenu |
| MP3 ElevenLabs | `studio/dino/content/scripts-audio/fr/V3/` | Réécriture complète (dialogue Narrateur/Wex, tags v3) |
| Lunii | `studio/lunii/assets/audio/` | Aucun texte propre — remix du MP3 EL |
| Anglais | — | N'existe pas (lexique de prononciation seul) |

### 1.2 La preuve que la dérive est réelle, pas théorique

La refonte des paliers de poids du **2026-08-03** a changé le référentiel de comparaison.
Aujourd'hui, pour le Tyrannosaure :

- l'**écran** dit « 4 rhinocéros » (calcul vivant depuis `dinos-data.js`) ✅
- le **TTS de secours** dit « 4 rhinocéros » (même calcul vivant) ✅
- le **MP3 réellement joué** dit encore « 3 hippopotames » (script figé au 2026-07-25) ❌
- le **pack Lunii** dit « 3 hippopotames » (il hérite du MP3) ❌

Deux canaux sur quatre énoncent un chiffre périmé. **Rien dans le pipeline ne l'a signalé.**
Le pont censé synchroniser (`_BLOC-B-CANONIQUE.md`) est bien régénéré, mais personne ne le
reporte vers les scripts EL, et aucun contrôle ne compare le produit au canon.
Ticket ouvert : `EP-D-AUDIO-DRIFT-COMPPOIDS`.

### 1.3 Une deuxième dérive du même type, déjà présente

Le lexique de prononciation FR (`studio/dino/content/i18n/lexiques-prononciation/fr.md`)
est **complet (70/70)** et grave par exemple `Archaeoptéryx → Ar-ké-op-té-rix`.
Il est appliqué au canal **ElevenLabs uniquement**. Le TTS navigateur, lui, reçoit `d.name`
brut — le moteur du navigateur prononce ce qu'il veut. Le savoir existe, il n'atteint qu'un
canal sur deux, faute de lien déclaré entre « le lexique » et « les canaux qui parlent ».

### 1.4 Pourquoi ça va empirer

Le problème est déjà transverse, et chaque axe de croissance le multiplie :

- **Volume** : ce ne sont pas que les dinos. Menu, titres et descriptions du catalogue,
  consignes, panneaux de règles, phrases de victoire, textes des œufs et du nid, annonces
  système — tout cela est du texte écrit à la main, dispersé inline dans chaque page.
- **Langues** : chaque langue ajoutée multiplie le nombre de versions à tenir cohérentes.
- **Canaux** : Lunii est arrivé sans texte propre ; un canal futur (montre, enceinte,
  export vidéo) héritera de la même dispersion.
- **Internalisation** : le sujet immédiat — savoir *quoi* internaliser suppose de savoir
  *où est* chaque texte et *ce qu'on en attend*. Aujourd'hui, personne ne peut répondre.

### 1.5 Le vrai manque (ce n'est pas un problème de stockage)

Mettre les quatre versions dans une base de données donnerait un endroit unique où **regarder**,
mais quelqu'un devrait toujours éditer quatre colonnes à la main quand un chiffre change —
même fragilité, autre interface. Ce qui manque n'est pas un entrepôt, c'est :

1. un **contrat** par contenu (quels canaux sont attendus, quelles langues, quoi traduire) ;
2. une **lignée** déclarée (ce MP3 dérive de ces champs-là) ;
3. une **détection de dérive** automatique quand la source bouge ;
4. un **acte humain de décision** — propager, ou déclarer sans impact — tracé.

---

## 2. Vision

> **Un contenu = une clé stable, un contrat explicite, une lignée traçable.
> Quand la source bouge, tous les canaux qui en dérivent lèvent une dette,
> et un humain tranche : je propage, ou c'est sans impact.**

Cinq principes :

1. **La clé est stable, le texte est mouvant.** On ne référence jamais un contenu par son
   texte, toujours par une clé (`dino.tyrannosaurus.taille`). Le texte peut changer, la clé non.
2. **La réécriture EL reste un choix éditorial assumé.** On ne génère pas le dialogue
   Narrateur/Wex depuis un gabarit — il est réécrit, c'est ce qui fait sa qualité.
   Ce qu'on trace, ce sont les **faits** qu'il doit respecter (les chiffres, les noms),
   pas la formulation.
3. **Le TTS de secours n'est pas un contenu, c'est une dérivation.** Il ne doit jamais être
   improvisé inline dans deux pages différentes ; il découle de la clé source.
4. **Alerter juste.** Une dette ne se lève que si le contenu dont on dépend *réellement*
   a changé. Un changement de `proies` ne doit pas marquer le MP3 « taille » comme périmé,
   sinon le tableau de bord devient rouge en permanence et plus personne ne le lit.
5. **Zéro nouvelle infrastructure tant qu'un script suffit.** Le projet a déjà le précédent
   qui marche : `_gen-etat-dinos.cjs` → `pmo/_ETAT-DINOS.md`, un script de lecture seule qui
   produit un état. On étend ce pattern avant d'envisager une base.

---

## 3. Besoin fonctionnel

| # | Besoin |
|---|---|
| **B1** | Savoir, pour tout contenu du projet, **où il vit** et **dans quels canaux il existe** |
| **B2** | Déclarer **ce qu'on attend** de chaque contenu : affiché ? lu en TTS ? enregistré en EL ? porté sur Lunii ? à traduire ? |
| **B3** | Détecter automatiquement qu'un canal est **en retard** sur sa source |
| **B4** | Présenter la dette sous forme de **checklist par canal**, à valider pas à pas |
| **B5** | Permettre de clore une ligne en **« sans impact »** sans régénérer — et que ça reste clos |
| **B6** | Qu'un mini-jeu consommateur sache que le **référentiel qu'il consomme a bougé** |
| **B7** | Un **tableau de bord simple** : ce qui est à jour, ce qui est en dette, ce qui manque |
| **B8** | Que l'ajout d'une langue soit **une colonne de plus**, pas une refonte |

---

## 4. Ne pas réinventer la roue

Le problème est un classique de la gestion de contenu localisé. Quatre patterns établis
couvrent l'essentiel ; on les emprunte au lieu d'inventer.

| Pattern | D'où il vient | Ce qu'on en prend |
|---|---|---|
| **Drapeau *fuzzy*** | gettext / PO, repris par Weblate, Crowdin, Lokalise | Quand la source change, la traduction n'est pas supprimée : elle est **marquée à revoir**. Un humain la relit et la « défuzzifie » — en la corrigeant **ou** en la validant telle quelle. C'est exactement la dette + l'acquittement demandés. |
| **Péremption par empreinte des entrées déclarées** | Systèmes de build (Make, Bazel, Nix) | Chaque artefact produit enregistre l'empreinte des entrées **qu'il déclare consommer**. Entrée modifiée → artefact périmé. Le fait que les dépendances soient *déclarées* et *fines* est ce qui évite de tout invalider à chaque édition. |
| **Catalogue de ressources à clé stable** | ICU MessageFormat, Rails i18n, Fluent | La clé est un identifiant, jamais le texte source. Permet de changer un texte sans casser les références, et de porter les langues comme des colonnes. |
| **Catalogue de données & lignée** | Gouvernance de données (MDM, data catalog) | Le registre porte le **contrat** et la **lignée**, pas nécessairement la charge utile. Un catalogue peut pointer vers la donnée là où elle vit, au lieu de la ré-héberger — beaucoup moins invasif à mettre en place. |

Ce qu'on **n'emprunte pas** : la mémoire de traduction et les outils de TMS complets
(Crowdin & co) — hors sujet tant qu'on est mono-langue, et lourds pour le volume concerné.

---

## 5. Architecture proposée

### 5.1 L'unité de base : la clé

```
<domaine>.<entité>.<bloc>

dino.tyrannosaurus.taille
dino.tyrannosaurus.nom
dino.famille.trex.accroche
jeu.mj-31.consigne
jeu.mj-31.extinction.slide-a
jeu.commun.victoire.sans-faute
systeme.menu.accueil
```

### 5.2 Les canaux

| Canal | Ce que c'est | Produit |
|---|---|---|
| `ecran` | Texte affiché | `dinos-data.js`, HTML |
| `tts` | Texte donné au moteur du navigateur (**respellé**) | dérivé |
| `el` | Script avec tags v3 — **réécriture éditoriale assumée** | `scripts-audio/…` |
| `mp3` | L'artefact audio produit | `site/audio/…` |
| `lunii` | Pack conteuse | hérite de `mp3` |

### 5.3 La fiche d'une clé

```
clé          : dino.tyrannosaurus.taille
domaine      : dino
source       : → site/js/dinos-data.js (champs taille_m, hauteur_m, poids_t, comp_*)
contrat      : ecran=requis · tts=dérivé · el=réécrit · mp3=requis · lunii=hérité
               langues=[fr]  (en=prévu, non requis)
dépend de    : taille_m, hauteur_m, poids_t, comp_poids, comp_taille, comp_hauteur
consommée par: dev-dinos.html (fiche) · mj-31.html (annonce)
lignée       :
   el   → V3/json/_seg-tyrannosaurus-taille.json   empreinte-source: a1b2…  produit: 2026-07-25
   mp3  → site/audio/dinos/fr/tyrannosaurus-taille.mp3                      produit: 2026-07-25
   lunii→ studio/lunii/assets/audio/recits-dino/tyrannosaurus.mp3           produit: 2026-08-02
```

Le point critique est la ligne **« dépend de »**. Elle est déclarée **par bloc**, pas par dino.
C'est ce qui fait qu'un changement de `proies` marque le bloc « régime » et **pas** le bloc
« taille ». Sans cette finesse, tout devient rouge et le dispositif meurt d'indifférence.

### 5.3 bis — Typologie : il n'y a PAS de schéma unique (révision 2026-08-10)

Le modèle naïf « 1 identifiant = 1 texte + 1 texte TTS + 1 MP3 TTS + 1 texte EL taggué + 1 MP3 EL »
ne tient pas à l'épreuve du contenu réel, et Papa Yann l'a dit avant qu'on s'y casse les dents :
certains sons n'ont **ni texte ni équivalent ElevenLabs**, d'autres sont **aléatoires**, d'autres
sont des **briques réutilisées partout**, d'autres encore se **composent**.

La réponse n'est pas d'élargir le schéma jusqu'à ce qu'il absorbe tout — on obtiendrait une fiche
avec vingt champs vides sur trente. C'est de reconnaître **cinq types**, chacun avec sa propre
forme de contrat. Le champ `type` devient la première chose qu'on lit sur une clé, parce qu'il
détermine tout le reste.

| Type | Exemples | Texte source | Canal EL | Traduction | Aléatoire |
|---|---|---|---|---|---|
| **1. Bruitage** | klaxon, fanfare, porte de bus, cri de bébé dino | un **prompt EN** de génération, pas une phrase | non (moteur SFX) | **aucune** — invariant | non |
| **2. Réserve d'humeur** | bravo, super, oups, presque | pas de texte canonique : une **intention** + N variantes | oui, par variante | **ré-invention** par culture | **oui**, c'est le principe |
| **3. Réplique fixe** | « Quel bus arrive en premier ? », noms de lieux | oui, canonique et stable | oui | traduction | non |
| **4. Atome composable** | chiffres, sons de lettres, noms de dinos, époques, familles | oui, court | oui | traduction **+ gabarits** | non |
| **5. Bloc narré** | blocs de fiche dino, récits d'époque | oui, long | oui, **réécrit** | **réécriture**, pas traduction | non |

Trois conséquences qui ne sautent pas aux yeux :

- Le type **2** n'a **pas de texte de référence unique** : demander « quel est le texte de
  `encouragement.positif` ? » n'a pas de sens, c'est un ensemble. Ce qu'on grave, c'est l'**intention**
  (« féliciter chaleureusement ») et l'inventaire des variantes. C'est aussi pour ça qu'il ne se
  traduit pas : on ne traduit pas « waouh », on cherche ce qu'un adulte dirait spontanément à un
  enfant de 4 ans dans cette langue-là.
- Le type **1** n'a rien à traduire mais a quand même une source à tracer : le **prompt anglais**
  qui l'a produit. Sans lui, un bruitage n'est pas plus reproductible qu'une voix.
- Le type **4** est le seul qui porte, en plus de son texte, un **gabarit d'assemblage** — et c'est
  là que tout se joue (§ 5.3 ter).

### 5.3 ter — La composition : pré-génération, jamais de concaténation

L'exemple donné par Papa Yann : « X millions d'années, c'est le Crétacé » = trois morceaux, et
pourtant tout doit sonner ElevenLabs, d'un seul tenant.

La tentation est de coller trois MP3 bout à bout à l'exécution. **Le projet l'a déjà interdit**
(décision Papa Yann 2026-07-28, `site/js/say-nombres.js`) : on pré-génère des **gabarits complets**
(`il-en-manque-<n>`, `<n>-oeufs` pour 1-10) parce que l'assemblage mot à mot s'entend — pauses
mécaniques, intonations qui ne s'enchaînent pas, accent tonique au mauvais endroit.

**L'internationalisation durcit cette règle au lieu de l'assouplir**, et c'est le point important :

- **L'ordre des mots change.** Un gabarit `[nombre] + [unité] + [période]` valide en français ne
  l'est pas ailleurs : plusieurs langues placent le classificateur ou le verbe autrement. Une
  concaténation correcte en FR produit une phrase agrammaticale en JA ou en TR.
- **Les accords changent avec la valeur du slot.** En russe, `1 год / 2 года / 5 лет` : le mot
  qui suit le nombre dépend du nombre. Aucune concaténation à slot fixe ne survit à ça.
- Donc **le gabarit appartient à la langue**, pas au contenu. Chaque langue déclare ses propres
  gabarits, son propre ordre, ses propres formes.

**Contrainte à assumer** : un gabarit n'est viable que si le domaine de son slot est **fini et
petit**. Les nombres 1 à 10, les onze familles, les huit époques : oui. Un nombre quelconque, un
nom de dino parmi soixante-dix combiné à cinq phrases : l'explosion combinatoire rend la
pré-génération absurde. Pour ces cas-là, deux issues honnêtes — soit une **tournure neutre** qui
évite l'accord (« le Crétacé — soixante-six millions d'années » en deux blocs séparés plutôt
qu'une phrase liée), soit le **repli TTS** assumé.

### 5.3 quater — Ce qu'il faut stocker pour TOUT audio produit

C'est le manque le plus coûteux découvert au Lot 0, et il traverse les cinq types. Pour chaque
fichier audio produit, il faut garder :

- le **texte verbatim** effectivement envoyé, **tags v3 compris** ;
- la **voix** (par rôle, jamais par identifiant en dur) et le **modèle** ;
- les **réglages** (stability…) et le **traitement** appliqué (loudnorm, padding 250 ms) ;
- pour un bruitage : le **prompt anglais** à la place du texte.

Sans ça, on ne peut **ni régénérer à l'identique, ni traduire, ni vérifier** ce que l'enfant
entend — il faut écouter les fichiers un par un. C'est exactement la situation des 109 fichiers
de `site/sounds/voix/` : ils sont bien documentés dans `site/sounds/_BANQUE-SONS.md` (rôle, voix,
méthode), mais le texte exact n'est nulle part, et les textes de repli dispersés aux points
d'appel **divergent déjà entre eux** — un même slug y est appelé avec deux phrases différentes.

### 5.3 quinquies — La langue est une DIMENSION, pas une colonne

Cible : **une vingtaine de langues**. Toute formulation du genre « on ajoutera une colonne pour
l'anglais » est à écarter — elle suppose que le schéma grandit avec chaque langue, ce qui devient
ingérable à vingt et casse dès la première langue qui ne se comporte pas comme le français.

Le modèle : **ajouter une langue = ajouter des fichiers.** Jamais toucher au schéma, jamais
toucher aux autres langues, jamais modifier une clé existante. Une langue absente n'est pas une
erreur, c'est une **couverture partielle** qui se lit dans le tableau de bord.

Et « traduire » ne veut pas dire la même chose selon le type :

| Type | Ce que « faire la langue L » signifie réellement |
|---|---|
| Bruitage | **rien** — un seul fichier sert toutes les langues |
| Réserve d'humeur | **ré-inventer** le pool : ce qu'on dit spontanément à un enfant dans cette culture |
| Réplique fixe | traduire, puis enregistrer |
| Atome composable | traduire l'atome **et** écrire les gabarits propres à la langue |
| Bloc narré | **réécrire** éditorialement, avec la même vérité mais pas la même prose |

Enfin, une couche transverse existe déjà et doit être généralisée : les **lexiques de
prononciation** par langue (`studio/dino/content/i18n/lexiques-prononciation/<lang>.md`). Ce sont
des **transformations**, pas des textes : « Archaeoptéryx » → « Ar-ké-op-té-rix ». Aujourd'hui ils
sont déclarés « pour ElevenLabs » et n'alimentent que lui — le TTS du navigateur reçoit le nom brut
et l'écorche. Cette couche doit servir **tous les canaux qui parlent**, dans toutes les langues.

### 5.4 Catalogue ou entrepôt : la réponse dépend du domaine

Le registre doit-il **détenir** les textes, ou **pointer** vers eux ? Les deux, selon le cas —
même schéma, même moteur, seule la nature du champ `source` change.

| Domaine | Situation actuelle | Rôle du registre |
|---|---|---|
| **DINO** | Les textes ont déjà un domicile clair et déployé (`dinos-data.js`), et la doctrine « frontière autoring/produit » l'impose comme source unique du produit | **Catalogue** — il pointe, ajoute le contrat, la lignée et l'empreinte. Zéro migration, zéro risque de doublon. |
| **JEU** (menu, consignes, règles, victoires, œufs) | Les textes n'ont **aucun** domicile : ils sont dispersés inline dans chaque `mj-XX.html` | **Entrepôt** — il les détient et génère un fichier de chaînes consommé par les pages. C'est là qu'il apporte le plus, puisqu'il crée un domicile qui n'existe pas. |

Cette asymétrie est **volontaire** : elle permet de démarrer sur DINO sans rien migrer,
et de traiter le pôle JEU quand on y arrive, avec le même outillage.

### 5.5 Dérivation entre clés

Un mini-jeu qui annonce un dino ne détient pas un contenu propre : il **dérive** d'une clé
du référentiel. On le déclare explicitement :

```
jeu.mj-31.annonce-dino     dérive-de → dino.<id>.nom
```

Conséquence directe : un changement sur `dino.<id>.nom` lève une dette **sur mj-31 aussi**,
et pas seulement sur les MP3 dino. C'est la réponse au besoin B6 — le mini-jeu n'a pas à
surveiller le référentiel, c'est le référentiel qui le prévient.

### 5.6 Le flux

```
                 ┌──────────────────────────┐
                 │   SOURCE (le fait)       │
                 │  dinos-data.js · registre│
                 └───────────┬──────────────┘
                             │  empreinte des champs déclarés
        ┌────────────────┬───┴────────┬──────────────────┐
        ▼                ▼            ▼                  ▼
   ecran (direct)   tts (dérivé)  el (réécrit)    clés dérivées
                    + respelling   à la main       (mini-jeux)
                                       │
                                       ▼
                                     mp3  ──►  lunii
                             
   À chaque canal : empreinte-source stockée au moment de la production.
   Empreinte stockée ≠ empreinte actuelle  →  DETTE
```

---

## 6. Le moteur de dette

### 6.1 Détection

Un script de contrôle recalcule l'empreinte des champs déclarés de chaque clé et la compare
à celle enregistrée par chaque canal au moment de sa production. Empreinte de **contenu**,
pas horodatage — les dates de fichiers mentent dès qu'on change de branche git.

### 6.2 Les états d'une ligne (clé × canal)

| État | Sens |
|---|---|
| `à jour` | Empreintes identiques |
| `en dette` | La source a bougé depuis la production — **à challenger** |
| `manquant` | Le contrat exige ce canal, il n'existe pas |
| `hors contrat` | L'artefact existe alors que rien ne l'exige (orphelin) |

### 6.3 L'acquittement — le cœur du dispositif

Une dette ne se résout **jamais** toute seule. Un humain (ou un agent, en session) tranche
entre deux issues, et les deux clôturent la ligne :

- **Propagé** — le canal est régénéré ou réécrit ; la nouvelle empreinte est enregistrée.
- **Sans impact** — le changement de source ne remet pas le canal en cause (exemple : une
  correction de ponctuation à l'écran ne justifie pas de refaire un MP3). L'empreinte est
  **re-calée** sur la valeur actuelle, avec la raison et la date.

C'est l'exact équivalent du « défuzzifier sans modifier la traduction » de gettext. **Sans
cette seconde issue, le tableau de bord reste rouge à vie et devient du bruit.**

### 6.4 Le tableau de bord

Une vue par domaine, une ligne par clé, une colonne par canal, une pastille par état — plus
la liste des dettes ouvertes en tête, avec ce qui a changé et depuis quand.

Précédent qui marche et qu'on étend : `_ETAT-DINOS.md`, généré, jamais tenu à la main.

---

## 7. Découpage en lots

Chaque lot livre une valeur seule et ne présuppose pas le suivant. Aucun big-bang.

### Lot 0 — **Voir** (instrumentation, zéro refactor)
Inventorier l'existant et produire l'état, **sans rien déplacer ni réécrire**.
Le contrat de chaque clé est déduit de ce qui existe déjà, puis relu.
- **Livrable** : registre généré + rapport d'état (dettes, manquants, orphelins)
- **Valeur immédiate** : on voit enfin l'ampleur réelle de la dérive poids, et tout le reste
- **Critère de fin** : le rapport signale la dérive T-Rex déjà connue — s'il ne la voit pas, l'outil est faux
- **Effort** : 1 session · précédent direct `_gen-etat-dinos.cjs`

### Lot 1 — **Alerter** (moteur de dette, pilote DINO)
Empreintes de référence enregistrées, script de contrôle, commande d'acquittement,
branchement dans `/dino-pmo-audit`.
- **Livrable** : dette calculée + acquittable, contrôle joué à chaque audit
- **Effort** : 1 session

### Lot 2 — **Fermer la boucle DINO**
- Le TTS de secours cesse d'être improvisé inline dans deux pages — il devient une dérivation déclarée
- Le respelling FR alimente **aussi** le TTS navigateur (corrige le défaut § 1.3)
- Régénération des MP3 réellement en dérive (portée issue du lot 0)
- **Effort** : 1-2 sessions

### Lot 3 — **Étendre au pôle JEU**
Menu, catalogue, consignes, règles, victoires, œufs — le registre devient **entrepôt** pour
ces textes et génère le fichier de chaînes consommé par les pages.
- **Effort** : 2-3 sessions · lot le plus lourd, à découper par famille de texte
- **Attention** : ne pas toucher au cadre `mj-shell.js` ni aux figées MJ sans décision

### Lot 4 — **Ouvrir la langue**
L'anglais devient une colonne. Le contrat dit déjà quelles clés sont à traduire ; la
plomberie de surcharge existe déjà (`site/js/dinos-i18n.js`, dossier cible vide à ce jour).
- **Effort** : proportionnel au volume à traduire, mais **structurellement gratuit**

---

## 7 bis. Idée notée — encouragements multi-voix et multi-langues

Demande Papa Yann du 2026-08-10, à chiffrer avant tout engagement.

**Constat de départ** : les réactions de fin de partie n'ont que **3 voix** (narratrice, narrateur,
Wex) × 22 mots. À l'usage ça tourne vite en rond et ça s'entend.

**Deux évolutions demandées :**

1. **Cinq voix ou plus**, mélange assumé du casting, pour que ça sonne humain plutôt que robotique.
2. **Doublon multilingue** : le français, puis **immédiatement** la même intention dans une autre
   langue — brésilien, anglais, japonais, chinois, italien, espagnol — avec le **drapeau du pays
   affiché dans un coin au même moment. Jamais du mot à mot : la même volonté d'encourager.**

**Pourquoi ça tombe juste** : c'est le type « réserve d'humeur », donc chaque langue **ré-invente**
son pool au lieu de traduire — la contrainte technique et l'intention pédagogique coïncident. Et
l'exposition passive à plusieurs langues sur un moment de joie (la victoire) colle au profil.

**Ordre de grandeur à arbitrer AVANT de lancer quoi que ce soit** : 22 mots × 5 voix × 7 langues
≈ **770 fichiers**, contre 69 aujourd'hui. Questions ouvertes : toutes les langues sur tous les
mots, ou un pool réduit pour les langues invitées ? Les 6 mots « doux » (consolation) méritent-ils
le doublon, ou seulement les 16 positifs ? Cinq voix dans chaque langue, ou deux suffisent hors
français ? Le drapeau est un élément d'interface à synchroniser sur la piste audio.

**Dépendance** : `VOIX-002` (identifiants des 2 narrateurs) et `VOIX-003` (identifiants des 10
personnages) sont encore à faire côté narration — élargir le casting de voix en dépend.

---

## 8. Décisions à trancher (Papa Yann)

| # | Question | Recommandation |
|---|---|---|
| **Q1** | DINO : catalogue (le registre pointe) ou entrepôt (le registre détient) ? | **Catalogue.** `dinos-data.js` reste maître — conforme à la doctrine frontière autoring/produit, et zéro migration. |
| **Q2** | Où vit le registre : fichiers git ou Supabase ? | **Fichiers git.** Contenu statique livré avec l'app = artefact de build. Git donne l'historique, le diff et la relecture gratuitement, et les pages locales ne peuvent pas faire de `fetch`. Supabase reste pour le mutable (annotations, progression). |
| **Q3** | Tableau de bord : rapport généré local, ou page déployée consultable au téléphone ? | **Rapport d'abord** (lot 0), page déployée au lot 2 si le besoin se confirme — précédent `duel.html` / `lecture.html`. |
| **Q4** | Acquittement : commande en session, ou clic dans un tableau de bord ? | **Commande en session.** L'acquitteur est presque toujours l'agent qui vient de régénérer. Le clic imposerait un chemin d'écriture pour un gain faible. |
| **Q5** | Maille de l'empreinte : le bloc (nom / taille / régime / funfact) ? | **Oui, le bloc** — c'est déjà la maille des MP3 et des segments. Plus fin serait ingérable, plus gros ferait tout clignoter. |
| **Q6** | Périmètre du lot 0 : DINO seul, ou DINO + JEU d'emblée ? | ~~DINO seul~~ → **tranché : DINO + JEU**, décision Papa Yann 2026-08-10. |
| **Q7** | Périmètre et coût du doublon multilingue des encouragements (§ 7 bis) | À arbitrer : ~770 fichiers au maximum théorique. Réduire d'abord le périmètre (mots positifs seuls ? deux voix hors français ?) avant de chiffrer les crédits. |
| **Q8** | Les gabarits de composition dont le slot est **non borné** (§ 5.3 ter) | Deux issues honnêtes : tournure neutre qui évite l'accord, ou repli TTS assumé. À trancher cas par cas, pas globalement. |

---

## 9. Garde-fous

- ❌ **Ne pas générer le texte EL depuis un gabarit.** La réécriture Narrateur/Wex est un
  choix éditorial validé — on trace les **faits** qu'elle doit respecter, jamais sa formulation.
- ❌ **Ne pas lever de dette sur une dépendance non déclarée.** Alerte fausse = tableau de
  bord mort en trois semaines.
- ❌ **Ne pas supprimer un texte existant** en migrant (doctrine : on désigne le canon, on
  ne supprime jamais — `feedback_narration_info_loss`).
- ❌ **Ne pas commencer par le pôle JEU** : gros volume, textes sans domicile, figées MJ
  sensibles. Le pilote doit être là où le problème est déjà prouvé.
- ❌ **Ne pas construire de base de données** avant d'avoir montré qu'un script généré ne
  suffit pas.
- ⚠️ **Zéro chiffre en dur dans ce document** au-delà des faits datés — les counts vivent
  dans les INVARIANTS des pôles.

---

_Rédigé 2026-08-10. Déclencheur : question Papa Yann sur l'internalisation et la
multiplication des variantes de texte (fiche / TTS / EL / Lunii / traduction).
Constat fondateur : dérive poids T-Rex détectée le même jour (`EP-D-AUDIO-DRIFT-COMPPOIDS`)._
