# MaxPlay — Glossaire (vocabulaire unique, PARTOUT)

> Document **normatif** : ces mots sont ceux qu'on emploie dans les docs, les agents, les commits,
> les noms de fichiers et l'interface. Un autre mot pour la même chose = une dérive à corriger.
> Ouvert le 2026-09-04 à la demande de Papa Yann (« le même vocabulaire sémantique PARTOUT »).
> Statut : termes ✅ = dictés ou validés par Papa Yann (2026-09-04/05) ; ❓ = encore à trancher.

## Le produit

| Terme | Définition | Ne pas dire |
|---|---|---|
| **MaxPlay** ✅ | L'application complète : Mini-jeux + Encyclopédie + Histoires (à venir). PWA déployée depuis `site/`. | « le site », « la plateforme » |
| **Mini-jeux** ✅ | Les petits jeux, à gauche et à droite du menu. Pôle `studio/minijeux/`, pages `site/mj-XX.html`. | « MJ » hors identifiant technique `mj-XX` |
| **Encyclopédie** ✅ (alias **Dino de Max**) | Tout le domaine dino : les Fiches dinos, les Familles, ce qu'il manque, le Voyage, le Dico. « Dino de Max » = l'ensemble, pas seulement les fiches. Pôle `studio/dino/`, page `site/dev-dinos.html` (à renommer `dinos.html`). | « dev-dinos », « module dino » |
| **Histoires** ✅ (alias **Narration**) | Ce qui se raconte : WexWorld + histoires dino (techniques : regroupement de familles, époques ; narratives : dinos qui se battent ou coopèrent). Rien de sorti. Pôle `studio/narration/`. | « contes », « stories » (hors nom de dossier existant) |

## L'univers

| Terme | Définition | Ne pas dire |
|---|---|---|
| **WexWorld** ✅ | Le monde des Histoires : écosystème, le Casting (10 personnages), 2 narrateurs. Héros sans l'être : Wex. **Un seul sens** : le concept « WexWorld » côté JEU (jeu Phaser Phase 2) est abandonné le 2026-09-05, archivé. | « Wex World » (deux mots), « l'univers », « univers narratif » |
| **Wex** ✅ | Garçon de 4 ans. Interagit et commente parfois dans l'application. | « le petit », « l'enfant » (ambigu avec l'enfant qui joue) |
| **Narrateur H** / **Narrateur F** ✅ | Les deux voix ElevenLabs qui racontent, font les menus, les fiches et les histoires. Identifiants techniques `narrateur_h` / `narrateur_f`. | « narratrice » seul, « voix off », « voix cloud » |
| **Tritri** | Le Tricératops préféré de Wex, running gag. | « Max », « doudou », « peluche » (figé) |

## La fiche dino (3 couches)

| Terme | Définition | Où ça vit | Ne pas dire |
|---|---|---|---|
| **Fiche dino** ✅ | La carte d'un dinosaure dans l'Encyclopédie. | `site/js/dinos-data.js` (1 entrée par `id`) | « carte », « page dino » |
| **Texte fiche** ✅ | Le texte affiché sur la fiche. | champs `desc`, `explic`, … de `dinos-data.js` | « description », « contenu » |
| **Script audio** ✅ | Le texte qui sera transformé en voix par ElevenLabs (avec ses tags). | `studio/dino/content/scripts-audio/<langue>/` (❓ aujourd'hui « V3 », « segments JSON ») | « script V3 », « segments », « dialogue » |
| **Audio** ✅ | Le MP3 produit par ElevenLabs à partir du Script audio. | `site/audio/dinos/<langue>/` | « son », « voix », « MP3 » seul |

## L'Encyclopédie (Dino de Max)

| Terme | Définition | Ne pas dire |
|---|---|---|
| **Famille** ✅ | Une famille de dinos (sauropodes, cératopsiens, théropodes…). Onglet par défaut. | « catégorie », « groupe » |
| **Voyage** ✅ | Le parcours à travers les époques des dinos (8 récits d'époque). Onglet. | « chrono », « frise » (sauf la frise de mj-31), « épisode » |
| **Récit d'époque** ✅ | Une des 8 histoires du Voyage, racontée par le Narrateur F. Appartient à l'Encyclopédie, pas aux Histoires. | « épisode », « conte » |
| **Dico** ✅ (alias **Racines**) | L'extraction des racines latines ou grecques des noms de dinos. Onglet. | « étymo » hors nom de fichier, « lexique » (réservé à la prononciation) |
| **Lunii** ✅ | La boîte à histoires : un appareil où on dépose des Histoires, des Fiches dinos, le Voyage. Canal de distribution, pôle `studio/lunii/`. | « la conteuse », « STUdio » (c'est l'outil de transfert) |

## Les images d'une Fiche dino ✅ (définitions vérifiées dans `site/img/dinos/README.md` + `studio/dino/content/INDEX-IMAGES.md`)

| Terme | C'est quoi | Fichier | Où on le voit |
|---|---|---|---|
| **Paléoart** | Les images réalistes « en pleine nature » : 5 scènes par dino (taille, manger, Paris, écosystème, funfact). Générées ChatGPT/Grok, JPEG. | `site/img/dinos/paleoart/<Id>_<scène>.jpg` | Le corps de la Fiche dino |
| **Hero** | Le portrait réaliste du dino, image principale de la fiche (un paléoart cadré tête/buste, fond de nature, PAS détouré). | `site/img/dinos/paleoart/<Id>.jpg` (+ `_headshot`) | Tête de fiche, menu, dico, chrono, repli si la silhouette manque |
| **Sprite** | Le dino **détouré proprement** sur fond transparent, en 2 versions : entier et tête. Réserve pour les Mini-jeux. | `site/img/dinos/sprites/<Id>_sprite.png`, `<Id>_tete.png` | Mini-jeux (collection, quiz) |
| **Silhouette** ✅ (alias **Ombre**) | L'ombre chinoise noire du dino, fond transparent. | `site/img/dinos/ombres/<Id>_ombre.png` (+ banque `content/assets/silhouettes/`, 3 zones, gelée) | Vignettes rondes des grilles (inversées en blanc), jeux de devinette |
| **Coloriage** | Le dessin au trait à colorier. Prévu, pas encore produit. | `site/img/dinos/paleoart/<Id>_coloriage.webp` | Fiche (futur) |
| **Trace** | L'empreinte de pas du dino (15 dinos). Réserve Mini-jeux. | `site/img/dinos/traces/<Id>_trace.png` | Mini-jeux (futur) |
| **Avatar** | Le dino **chibi low-poly facetté**, avec une humeur (joyeux, grognon, farceur). Ce n'est PAS une image de la fiche : c'est l'image de profil que l'enfant choisit dans « Qui joue ? ». 10 dinos, plusieurs variantes. | `site/img/avatars/<id>_<humeur>_<n>.png` | Écran « Qui joue ? », en-tête des Mini-jeux |

Donc : low-poly = **Avatar** (profil de l'enfant) · détouré = **Sprite** (jeux) · ombre chinoise = **Silhouette** · pleine nature = **Paléoart**, dont le portrait = **Hero**.

## Les Histoires

| Terme | Définition | Ne pas dire |
|---|---|---|
| **Casting** ✅ | Les 10 personnages des Histoires (WexWorld). Figé dans `rules/personnages.md`. | « les persos », « casting V1 » (numéro) |
| **Saison** ✅ | Un ensemble d'Histoires publié d'un bloc. | « batch », « lot » |
| **Arc** ✅ | Le fil qui relie plusieurs Histoires d'une Saison. | « intrigue », « série » |

## Abandonné (2026-09-05, Papa Yann : « ça ne marche pas du tout, on arrête »)

- **Max Adventure** (le jeu Phaser) et **Tiles / LimeZu** (les briques pour construire un RPG) : sortis de MaxPlay, archivés dans `_archive/`. Ne plus les citer comme sous-domaine JEU.
- **WexWorld côté JEU** (Phaser Phase 2) : concept abandonné. WexWorld = le monde des Histoires, rien d'autre.

## Dérives repérées (relevé 2026-09-04 sur 71 docs de gouvernance)

| Concept | Ce qu'on trouve aujourd'hui | Proposition |
|---|---|---|
| MaxPlay | Nulle part défini comme « Mini-jeux + Encyclopédie + Histoires ». Le routage racine présente 5 pôles techniques (JEU/DINO/NARRATION/LUNII/TRANSVERSE), `VISION.md` dit « jeu éducatif ». | Ajouter la définition produit en tête de `CLAUDE.md` et `VISION.md`. Les pôles restent des dossiers, pas des noms de produit. |
| Mini-jeux | `MJ`/`mj-XX` (281 occurrences) domine « mini-jeu » (199). | Garder `mj-XX` comme identifiant technique seulement ; « Mini-jeux » dans toute phrase. |
| Encyclopédie | Désignée par son fichier `dev-dinos` (24 fois) autant que par son nom. « Dino de Max » : 0 occurrence. | Renommer `dev-dinos.html` → `dinos.html` (ticket EP-D-GED-08 existant, à remonter en priorité). Trancher l'alias : « Encyclopédie » seul ou « Dino de Max » ? |
| Histoires | « narration » (280) écrase « histoire » (129) ; dossier `stories/` ; « récit » (46) pour les récits d'époque dino. | Produit = **Histoires**. « Narration » reste le nom du pôle/dossier. « Récit d'époque » = une histoire dino du Voyage (à confirmer). |
| WexWorld | **Deux sens incompatibles** : le monde narratif ET un jeu Phaser « Phase 2 » du pôle JEU (`game-conseiller.md`, `minijeux/CLAUDE.md:70`). « univers » (86) est le mot réellement employé ; `rules/univers.md:29` dit « nom univers non tranché ». | WexWorld = le monde, point. Le jeu Phaser prend un autre nom (❓ « Max Adventure » existe déjà : c'est lui ?). Remplacer « univers » par « WexWorld » quand on parle du monde. |
| Wex | Jamais décrit comme « garçon de 4 ans » ; qualifié « hors-système », « observateur quantique ». Aussi nom de voix EL et clé `role`. | Définition canon dans `rules/personnages.md` : garçon de 4 ans qui interagit et commente dans l'application. |
| Narrateur H/F | 3 graphies : `narrateur_h`, `Narrateur H`, `NARRATEUR H` ; plus « voix réelle », « voix cloud », « narratrice ». | Prose : **Narrateur H** / **Narrateur F**. Code et fichiers : `narrateur_h` / `narrateur_f`. Bannir « voix cloud ». |
| Texte fiche | Appelé `ecran`, « texte affiché », « texte canonique ». | Prose : **Texte fiche**. Clé technique `ecran` gardée. |
| Script audio | Appelé « script V3 », « dialogue », « segments », « blocs A-D », « texte verbatim ». Le référentiel compte 5 couches (affiché / TTS navigateur / script EL / MP3 / pack Lunii). | Prose : **Script audio**. « Segments » = le découpage technique d'un Script audio, « bloc » = une partie du Script audio. Le dossier `scripts-audio/fr/V3/` perd son `V3` (canon sans numéro, doctrine GED). Les 2 couches en plus (TTS navigateur, pack Lunii) sont des **replis/canaux**, pas des couches de la fiche. |
| Audio | « MP3 », « audio », « son », `tts`. | Prose : **Audio**. Clé technique `mp3`. « Son » réservé aux bruitages. |
| Fiche dino | « fiche » désigne aussi la fiche source Grokipedia et la « fiche audio ». | **Fiche dino** = la carte. Source de fact-check = « source Grokipedia ». « Fiche audio » disparaît : c'est le Script audio + l'Audio d'une fiche. |

## Termes encore à définir ❓

Métier : **Accroche** (menu, 2-7 s) · **Collection** (bandeau dinos gagnés) · **Époque** (une période géologique du Voyage) · **Ce qu'il mange** (onglet régimes) · **Ce qu'il manque** (❓ = la checklist « dino complet » ?). Proposition : je définis, tu corriges.

Outillage (peu visible de toi, à garder tel quel sauf avis) : pôle · PMO · figée · INVARIANTS · gabarit · lane · handoff · référentiel · catalogue · réplique · dérive · empreinte · quintette · GED.
