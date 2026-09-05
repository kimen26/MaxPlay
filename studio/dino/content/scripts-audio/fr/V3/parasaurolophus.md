# Parasaurolophus — Script audio (Narrateur H + Wex)

> Ornithopode à crête creuse (famille `bec`, clé technique dinos-data.js), Crétacé · 76 millions d'années · Amérique du Nord.
> Chiffres data (`site/js/dinos-data.js` id `parasaurolophus`) : 10 m long · 3,5 m haut · 2,5 t. Comparaisons = sortie EXACTE de `_compLong(10)` / `_compHaut(3.5)` / `_compPoids(2.5)`, exécutées node 2026-09-05 : `aussi long qu'un camion !` / `comme deux Papas l'un sur l'autre !` / `aussi lourd que 5 chevaux !` (identique data ; **10 m = « camion », PAS « bus de Paris »** — correction du finding 🟡 relecture 2026-06-15 : « bus RATP » à 12 m aurait créé 17 % d'écart, hors tolérance).
> Étymologie conforme `_ETYMO-COMPLET-60.md` : grec *para* = à côté de/presque pareil + *sauro* = lézard + *lophus* = crête → « presque pareil que le lézard à crête ».
> Fact-check Grokipedia 2026-09-05 : Parasaurolophus walkeri, Formation Dinosaur Park, Alberta (Campanien, ~76,5-75,5 Ma). Chassé par le T-Rex (à cette période plutôt Gorgosaurus/Daspletosaurus, cousins tyrannosauridés — Tyrannosaurus rex lui-même est plus tardif, ~68-66 Ma) : le script garde « le T-Rex » en simplification pédagogique validée par le corpus existant (registre `_SCENES-VIGNETTES.md` : les autres fiches Crétacé N. Amérique utilisent ce raccourci). **Vérité forte tenue** : le tuyau interne de la crête faisait vraiment un son grave, reconstitué par ordinateur, comparable à un trombone (fait Grokipedia confirmé, source de nombreuses études CT-scan).
> Vignette registre : trombone/klaxon/musicien préhistorique — motif propriétaire du Parasaurolophus, jamais réemployé (contraste explicite avec le Saurolophe à crête PLEINE, sans musique).
> Prononciation « Pa-ra-sau-ro-lofe » : lexique §2 confirmé (ph→f).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> Pas de `vitesse_kmh` dans la data → aucune mention de vitesse.

## Parasaurolophus — Parasaurolophus walkeri

### BLOC A — Présentation

**NARRATEUR H** [excited] : Pa-ra-sau-ro-lofe. [curious] « Para », en grec ancien, ça veut dire à côté de, presque pareil que. « Sauro », le lézard. Et « lophus », la crête.
**WEX** [playful] : Presque le lézard à crête.
**NARRATEUR H** [happily] : Exactement. [warmly] Une longue crête creuse, penchée vers l'arrière. Il vivait en Amérique du Nord, il y a 76 millions d'années.
**WEX** [nervous] : Et il y avait des méchants dinosaures, par là ?
**NARRATEUR H** [serious] : Oui. Le T-Rex chassait dans le coin. [confident] Alors son troupeau restait très vigilant.

### BLOC B — Taille

**NARRATEUR H** [excited] : 10 mètres de long — aussi long qu'un camion ! 3 mètres 50 de haut — [quickly] comme deux Papas l'un sur l'autre ! Et 2 500 kilos — [amazed] aussi lourd que 5 chevaux !
**WEX** [gasps] : Cinq chevaux, dans un seul dino.
**NARRATEUR H** [confident] : Oui. Un géant à bec de canard, avec un tuyau sur la tête.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un herbivore. Il broutait des plantes en grand troupeau. [confident] Quand un T-Rex approchait, [quickly] il poussait un cri très grave dans sa crête, pour prévenir les copains.
**WEX** [curious] : Il criait dans sa crête ?
**NARRATEUR H** [playful] : Oui. Sa crête creuse faisait office de gros klaxon naturel. [warmly] Tout le troupeau entendait et se sauvait ensemble.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Les scientifiques ont reconstruit son cri à l'ordinateur. [whispers] En soufflant dans la crête, ça faisait un son grave, comme un trombone.
**WEX** [gasps] : Un dinosaure tromboniste.
**NARRATEUR H** [softly] : Presque. Un musicien préhistorique, qui jouait pour ses amis.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie conforme : para + sauro + lophus = « presque pareil que le lézard à crête ».
- [x] Chiffres = sortie exacte `_compLong(10)`/`_compHaut(3.5)`/`_compPoids(2.5)` — camion (PAS bus, correctif finding 🟡) / 2 Papas / 5 chevaux.
- [x] Crête creuse + son de trombone fact-checké, jamais confondu avec la crête pleine du Saurolophe.
- [x] Wex jamais de `!`, aucun écho.
- [x] Pas de vitesse (absente de la data).
- [x] Grep interdits : 0 match attendu.
