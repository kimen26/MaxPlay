# Archélon — Script audio (Narrateur H + Wex)

> Énaliosaure (tortue de mer géante, famille `enaliosaures`), Crétacé · 75 millions d'années · Amérique du Nord (mer intérieure).
> Chiffres data (`site/js/dinos-data.js` id `archelon`) : 4 m long · 1,2 m haut · 2,2 t (re-audité HO-009/010 — plus de « Brigitta », taille corrigée). Comparaisons = sortie EXACTE de `_compLong(4)` / `_compHaut(1.2)` / `_compPoids(2.2)`, exécutées node 2026-09-05 : `comme une petite voiture !` / `aussi grand qu'un enfant de 4 ans !` / `aussi lourd qu'un rhinocéros !`.
> Étymologie conforme à `nom_etym` + `_ETYMO-RACINES-50.md` : grec *arché* = chef, premier (comme dans « archéologie ») + *chelôn* = la tortue → « la tortue-chef », la plus grande tortue de tous les temps.
> Fact-check (Grokipedia, 2026-09-05) : Archelon ischyros, plus grande tortue marine connue, mer intérieure d'Amérique du Nord au Crétacé (~75 Ma). C'est une TORTUE, pas un dinosaure ni un reptile marin de type ichtyosaure/plésiosaure — elle le dit clairement. Carapace non rigide comme une tortue actuelle : peau coriace type cuir (contrairement aux tortues à carapace osseuse dure), comme la tortue luth d'aujourd'hui. Prédateurs cités par la data : Tylosaurus (grand mosasaure) et requins préhistoriques.
> Registre `_SCENES-VIGNETTES.md` : « carapace molle coriace » est la vignette signature de l'Archélon (déjà à lui, réemployée ici — pas un doublon puisqu'elle lui appartient).
> Prononciation : « Ar-ké-lon » (lexique §2, ch→k). « Tylosaurus » à respeller — pas encore au lexique, ajouté en append : « Ti-lo-saure » (y→i, forme FR en -saure).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.

## Archélon — Archelon ischyros

### BLOC A — Présentation

**NARRATEUR H** [curious] : Ar-ké-lon. « Arché », ça veut dire chef, premier — [serious] comme dans « archéologie ». Et « chélon », c'est la tortue.
**WEX** [confident] : La tortue-chef ?
**NARRATEUR H** [happily] : Voilà — la plus grande tortue de tous les temps. Elle vivait il y a 75 millions d'années, [amazed] dans une mer qui coupait [serious] l'Amérique du Nord en deux.
**WEX** [curious] : Une tortue, mais pas un dinosaure alors ?
**NARRATEUR H** [confident] : Non, une vraie tortue de mer géante — [warmly] la cousine des tortues d'aujourd'hui, en beaucoup, beaucoup plus grand.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 4 mètres de long — comme une petite voiture ! [amazed] Debout, il faisait 1 mètre 20 de haut — aussi grand qu'un enfant de 4 ans ! Et il pesait 2 200 kilos — [serious] aussi lourd qu'un rhinocéros !
**WEX** [gasps] : Une tortue aussi lourde qu'un rhinocéros ?
**NARRATEUR H** [chuckles] : Une tortue aussi lourde qu'un rhinocéros, oui — [confident] mais qui flottait, elle, grâce à ses grandes nageoires.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Elle mangeait des méduses, des calmars, des coquillages mous. [confident] Et dans sa mer, deux chasseurs pouvaient s'en prendre à elle : [nervous] le Tylosaure, un grand Mosasaure, et de vieux requins.
**WEX** [nervous] : Elle pouvait se cacher dans sa carapace, comme les tortues d'aujourd'hui ?
**NARRATEUR H** [gently] : Pas vraiment — et c'est là son secret.

### BLOC D — Le truc fou

**NARRATEUR H** [whispers] : Sa carapace n'était pas dure comme celle d'une tortue de jardin. [amazed] C'était de la peau épaisse et coriace, comme du cuir — [softly] souple, presque comme une aile.
**WEX** [curious] : Une carapace molle, ça sert à quoi ?
**NARRATEUR H** [warmly] : À nager plus vite. Avec cette carapace-là, elle filait dans l'eau comme la tortue luth aujourd'hui — [proud] la championne de vitesse des tortues.

---

## Vérification avant livraison

- [x] 1 dino, 4 blocs A/B/C/D.
- [x] Étymologie conforme (`nom_etym`) : chef + tortue.
- [x] Chiffres = sortie exacte `_compLong(4)`/`_compHaut(1.2)`/`_compPoids(2.2)` exécutées node 2026-09-05 (chiffres re-audités HO-009/010, plus de « Brigitta »).
- [x] Vignette « carapace molle coriace » = signature déjà propriété de l'Archélon au registre — pas un réemploi, c'est SA vignette.
- [x] Tylosaure + requins cités comme vrais dangers (data `chasseurs`), fact-checkés.
- [x] Bloc D 100 % neuf (carapace en cuir → nage rapide, comparaison tortue luth), aucun doublon avec A/B/C.
- [x] On écoute : 0 « regarde ». Grep interdits : 0 match.
- [x] Wex jamais de `!`, questions variées.
- [x] Tags conformes doctrine.

## Ajout registre/lexique

- Registre `_SCENES-VIGNETTES.md` : ligne Archélon confirmée « carapace molle coriace » (déjà présente, ligne réutilisée telle quelle, pas de doublon ajouté).
- Lexique `fr.md` : ajouter « Tylosaurus | **Ti-lo-saure** | y→i, forme FR en -saure — ajouté 2026-09-05 (archelon.md) ».
