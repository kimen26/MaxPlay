# MaxPlay — Glossaire (vocabulaire unique, PARTOUT)

> Document **normatif** : ces mots sont ceux qu'on emploie dans les docs, les agents, les commits,
> les noms de fichiers et l'interface. Un autre mot pour la même chose = une dérive à corriger.
> Ouvert le 2026-09-04 à la demande de Papa Yann (« le même vocabulaire sémantique PARTOUT »).
> Statut : **brouillon à valider** — les termes ✅ sont ceux dictés par Papa Yann, les ❓ sont
> des propositions à trancher.

## Le produit

| Terme | Définition | Ne pas dire |
|---|---|---|
| **MaxPlay** ✅ | L'application complète : Mini-jeux + Encyclopédie + Histoires (à venir). PWA déployée depuis `site/`. | « le site », « la plateforme » |
| **Mini-jeux** ✅ | Les petits jeux, à gauche et à droite du menu. Pôle `studio/minijeux/`, pages `site/mj-XX.html`. | « MJ » hors identifiant technique `mj-XX` |
| **Encyclopédie** ✅ (alias **Fiches dinos**, **Dino de Max**) | Les fiches dino, les familles, ce qu'il manque, le Voyage (époques). Pôle `studio/dino/`, page `site/dev-dinos.html` (à renommer). | « dev-dinos », « module dino » |
| **Histoires** ✅ (alias **Narration**) | Ce qui se raconte : WexWorld + histoires dino (techniques : regroupement de familles, époques ; narratives : dinos qui se battent ou coopèrent). Rien de sorti. Pôle `studio/narration/`. | « contes », « stories » (hors nom de dossier existant) |

## L'univers

| Terme | Définition | Ne pas dire |
|---|---|---|
| **WexWorld** ✅ | Le monde : écosystème, 10 personnages, 2 narrateurs. Héros sans l'être : Wex. | « Wex World » (deux mots), « l'univers narratif » |
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

## Termes fréquents à définir ❓ (tu tranches)

Métier : **Voyage** (onglet époques, 8 récits) · **Famille** (taxo + onglet) · **Dico / racines** (4ᵉ onglet) · **Époque** · **Accroche** (menu 2-7 s) · **Récit d'époque** · **Tile / Max Adventure** (3ᵉ sous-domaine JEU, absent de ta liste : c'est un Mini-jeu ? un 4ᵉ produit ?) · **Lunii / pack** (canal de distribution) · **Collection** (bandeau dinos) · **Paléoart / hero / silhouette / coloriage** (les images d'une fiche) · **Avatar** · **Saison / arc** (Histoires) · **Casting** (les 10 personnages).

Outillage (peu visible de toi, à garder tel quel sauf avis) : pôle · PMO · figée · INVARIANTS · gabarit · lane · handoff · référentiel · catalogue · réplique · dérive · empreinte · quintette · GED.
