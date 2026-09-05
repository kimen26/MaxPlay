# Iguanodon — Script audio (Narrateur H + Wex)

> Ornithopode (famille `bec`, clé technique dinos-data.js), Crétacé · 125 millions d'années · Europe et Amérique du Nord.
> Chiffres data (`site/js/dinos-data.js` id `iguanodon`) : 10 m long · 2,7 m haut · 3 t. Comparaisons = sortie EXACTE de `_compLong(10)` / `_compHaut(2.7)` / `_compPoids(3)`, exécutées node 2026-09-05 : `aussi long qu'un camion !` / `aussi haut qu'un but de foot !` / `aussi lourd qu'un hippopotame !` (identique data — **10 m = « camion », PAS « bus de Paris »**, correctif du finding 🟡 relecture 2026-06-15, 17 % d'écart hors tolérance).
> Étymologie conforme `_ETYMO-COMPLET-60.md` : *iguano* (mot caribéen, l'iguane) + grec *odon* = dent → « la dent d'iguane » (ses dents ressemblaient à celles d'un iguane).
> Fact-check Grokipedia 2026-09-05 : Iguanodon bernissartensis, gisements de Bernissart (Belgique) et Angleterre, Europe + Amérique du Nord (Crétacé inférieur, ~125 Ma). Un des tout premiers dinosaures découverts et nommés (1825, Gideon Mantell). Chassé par des théropodes contemporains (Baryonyx en Europe).
> **Registre `_SCENES-VIGNETTES.md` respecté** : « pique sur le pouce (crû être un nez) » = vignette PROPRIÉTÉ de l'Iguanodon, réemployée ici. **« Les savants se trompent » NE DOIT PLUS être ajouté** (motif épuisé ×5-6 occurrences) → bloc D reformulé sans cette phrase : le fait est raconté (erreur historique de reconstruction), la morale n'est plus assénée en formule toute faite.
> Prononciation « I-goua-no-don » : lexique §2 confirmé (aucun piège caché, graphie « goua » gardée).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> Pas de `vitesse_kmh` dans la data → aucune mention de vitesse.

## Iguanodon — Iguanodon bernissartensis

### BLOC A — Présentation

**NARRATEUR H** [excited] : I-goua-no-don. [curious] « Iguano » vient de l'iguane, un gros lézard. Et « odon », en grec, c'est la dent.
**WEX** [confident] : La dent d'iguane.
**NARRATEUR H** [happily] : Exactement, [warmly] ses dents leur ressemblaient beaucoup. Il vivait en Europe et en Amérique du Nord, il y a 125 millions d'années.
**WEX** [curious] : C'est un des tout premiers dinosaures trouvés ?
**NARRATEUR H** [proud] : Oui, un des tout premiers. [amazed] Découvert en Belgique, il y a très longtemps.

### BLOC B — Taille

**NARRATEUR H** [excited] : 10 mètres de long — aussi long qu'un camion ! 2 mètres 70 de haut — [quickly] aussi haut qu'un but de foot ! Et 3 mille kilos — [amazed] aussi lourd qu'un hippopotame !
**WEX** [gasps] : Aussi haut qu'un but de foot ?
**NARRATEUR H** [confident] : Oui, au niveau des épaules. [warmly] Avec une longue queue, et un gros bec de canard.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un herbivore. Il broutait en troupeau, [confident] marchait sur 4 pattes, mais pouvait se lever sur 2 pour courir vite quand il avait peur.
**WEX** [playful] : Comme un kangourou.
**NARRATEUR H** [happily] : Exactement. Quatre pattes au calme, [pauses] deux pattes pour la course. Le Baryonyx le surveillait de loin.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Sur son pouce, il avait une pique osseuse pointue. [whispers] Au tout début, les savants l'avaient placée sur son nez, comme une corne.
**WEX** [gasps] : Une corne qui n'en était pas une ?
**NARRATEUR H** [chuckles] : Voilà. En fait, [confident] c'était une arme secrète, cachée sur le pouce, pour se défendre.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie conforme : iguano + odon = « dent d'iguane ».
- [x] Chiffres = sortie exacte `_compLong(10)`/`_compHaut(2.7)`/`_compPoids(3)` — camion (PAS bus, correctif finding 🟡) / but de foot / hippopotame.
- [x] Vignette pique-sur-le-pouce conforme au registre, propriété Iguanodon.
- [x] « Les savants se trompent » NON réemployé (motif épuisé, reformulé sans la formule toute faite).
- [x] Wex jamais de `!`, aucun écho.
- [x] Pas de vitesse (absente de la data).
- [x] Grep interdits : 0 match attendu.
