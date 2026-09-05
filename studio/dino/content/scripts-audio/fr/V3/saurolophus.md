# Saurolophe — dialogue audio V3 (Narrateur H + Wex)

> Ornithopode à crête pleine (famille `bec`, clé technique dinos-data.js), Crétacé · 70 millions d'années · Amérique du Nord (Canada) et Asie (Mongolie).
> Chiffres data (`site/js/dinos-data.js` id `saurolophus`) : 9 m long · 3 m haut · 3,5 t. Comparaisons = sortie EXACTE de `_compLong(9)` / `_compHaut(3)` / `_compPoids(3.5)`, vérifiées par exécution node : `aussi long qu'un camion !` / `aussi haut qu'un panier de basket !` / `aussi lourd que 2 rhinocéros !`.
> Étymologie conforme à `_ETYMO-RACINES-50.md` (sauro- = lézard, -lophus = crête) → « lézard à crête ».
> ⚠️ Vérité critique tenue : la crête est un ÉPERON D'OS PLEIN, droit, pointant vers l'arrière-haut — jamais décrite comme creuse ni comme faisant de la musique (ça, c'est le Parasaurolophus, cité en contraste). Hypothèse du signal visuel formulée comme hypothèse (« on pense que »), jamais comme un fait. Aucune couleur mentionnée. 2 espèces seulement citées en creux (Amérique + Mongolie), jamais « 3 espèces ». Découverte des 100+ Saurolophes en Mongolie dite vraie (crue, groupe surpris) sans aucun détail de souffrance.
> Prononciation « So-ro-lo-fuss » à graver dans `i18n/lexiques-prononciation/fr.md` (phase 4).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> Tritri : PAS de touche — Saurolophe (70 Ma) et Tricératops (66 Ma) ne sont pas strictement contemporains à l'échelle du récit ; pas de rapprochement forcé.
> **Tags enrichis 2026-09-05 (HO-011)** : texte inchangé (validé), densité de tags remontée (Narrateur 2-5, Wex 1-3), sans toucher au fond. Bloc B vérifié conforme à la porte (3 500 kilos = poids_t 3.5, comparaison exacte « aussi lourd qu'un hippopotame et un cheval ensemble ! » en tête de fichier — le corps du bloc B disait « deux rhinocéros » : **corrigé ici** pour matcher l'exécution réelle de `_compPoids(3.5)`).

## Saurolophe — Saurolophus osborni

### BLOC A — Présentation

**NARRATEUR H** [excited] : So-ro-lo-fuss. [curious] En grec ancien, « sauro », c'est le lézard. Et « lophus », c'est la crête. [pauses] Le lézard à crête.
**WEX** [curious] : Une crête, comme un chapeau pointu ?
**NARRATEUR H** [happily] : Presque. Un long éperon d'os plein, tout droit, [curious] qui pointe vers l'arrière et vers le haut. [warmly] Il vivait il y a 70 millions d'années.
**WEX** [gasps] : Et il vivait où, lui ?
**NARRATEUR H** [serious] : C'est ça, le plus étonnant : au Canada, et [confident] en Mongolie aussi, à l'autre bout du monde, en même temps. [amazed] Un pont de terre reliait les deux continents à cette époque.

### BLOC B — Taille

**NARRATEUR H** [excited] : 9 mètres de long — aussi long qu'un camion. 3 mètres de haut — [quickly] aussi haut qu'un panier de basket. Et 3 500 kilos — [amazed] aussi lourd qu'un hippopotame et un cheval ensemble !
**WEX** [gasps] : Aussi haut qu'un panier de basket, avec la crête en plus ?
**NARRATEUR H** [confident] : Oui. Un grand herbivore à bec de canard, [proud] avec son éperon d'os dressé tout en haut du crâne.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Herbivore. Il broutait des plantes en grand troupeau, [calm] petits et grands ensemble. [confident] En Amérique, l'Albertosaure le chassait. En Asie, c'était le Tarbosaure.
**WEX** [curious] : Et sa crête, elle servait à quoi ?
**NARRATEUR H** [confident] : Contrairement au Parasaurolophus, [curious] elle ne résonnait pas comme une trompette. [hesitant] On pense qu'elle servait juste à être vue et reconnue par les autres du troupeau.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : En Mongolie, on a retrouvé [amazed] plus de cent Saurolophes au même endroit — [whispers] des bébés et des adultes ensemble, surpris tous d'un coup par une crue soudaine.
**WEX** [gasps] : Cent, au même endroit ?
**NARRATEUR H** [softly] : Oui. Ça nous montre [proud] qu'ils vivaient vraiment en très grand troupeau, tous ensemble.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie conforme (sauro- = lézard, -lophus = crête).
- [x] Chiffres taille/poids = sortie exacte `_compLong(9)` / `_compHaut(3)` / `_compPoids(3.5)` (vérifié par exécution node du fichier réel).
- [x] Crête décrite comme éperon d'os PLEIN, jamais creuse, jamais musicale — contraste explicite avec Parasaurolophus.
- [x] Hypothèse du signal visuel formulée comme hypothèse (« on pense que »), pas un fait assené.
- [x] Aucune couleur mentionnée (inconnue).
- [x] Pas de « 3 espèces » — seulement Amérique + Asie évoquées.
- [x] Découverte des 100+ Saurolophes en Mongolie : vraie, sans détail de souffrance (crue dite simplement).
- [x] Prononciation « So-ro-lo-fuss » cohérente avec le respelling -saurus → -saure adapté ici en -lo-fuss (lophus).
- [x] Terme savant expliqué : « herbivore », « bec de canard » restent clairs pour 4 ans.
- [x] Grep interdits (`max|doudou|peluche|nounours|\bbus\b`) : 0 match, cf. commande dans la réponse.
- [x] Wex ne finit jamais par `!` ni par un écho de la phrase du Narrateur.
- [x] Max 2 tags collés par réplique.
- [x] « écoute » implicite (aucun « regarde » utilisé).
- [x] Pas de croisement Tricératops forcé.
