# Lystrosaure — Script audio (Narrateur H + Wex)

> Avant les dinosaures (synapside herbivore, famille `volant`), Permien · 250 millions d'années · Afrique du Sud, Antarctique, Inde, Chine, Russie, Mongolie.
> Chiffres data (`site/js/dinos-data.js` id `lystrosaurus`) : 0,7 m long · 0,35 m haut · 0,017 t (< 1 t → « 17 kilos ») · **vitesse_kmh: 5** (ajouté par l'orchestrateur, confiance moyenne). Comparaisons = sortie EXACTE de `_compLong(0.7)` / `_compHaut(0.35)` / `_compPoids(0.017)` / `_compVitesse(5)`, exécutées node 2026-09-05 : `comme un gros chat allongé !` / `il t'arrivait aux genoux !` / `aussi lourd qu'un enfant de 4 ans !` / `aussi vite que toi quand tu marches !`.
> Étymologie conforme à `nom_etym` + `_ETYMO-RACINES-50.md` : grec *lystron* = la pelle, la bêche + *sauros* = lézard → « le lézard-pelle » (museau large et plat, comme une petite pelle).
> Fact-check (Grokipedia, 2026-09-05) : Lystrosaurus murrayi, Permien terminal / Trias précoce (~250 Ma), présent sur presque tous les continents actuels (Afrique du Sud, Antarctique, Inde, Chine — et RUSSIE + MONGOLIE, ajoutés HO-009/010, cohérents avec Pangée réunie) — preuve historique majeure de la dérive des continents. **PAS un dinosaure** : synapside herbivore, bec corné comme une tortue. Un des rares survivants terrestres de la plus grande extinction de masse de l'histoire de la Terre (extinction Permien-Trias, ~252 Ma), au point de représenter jusqu'à 9 animaux terrestres à 4 pattes sur 10 retrouvés à certains endroits juste après.
> Prononciation : « Lis-tro-saure » (lexique §2, y→i).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.

## Lystrosaure — Lystrosaurus murrayi

### BLOC A — Présentation

**NARRATEUR H** [curious] : Lis-tro-saure. « Lystron », en grec, c'est la pelle, la bêche. [serious] Et « saure », le lézard.
**WEX** [confident] : Le lézard-pelle ?
**NARRATEUR H** [happily] : Voilà — à cause de son museau, large et tout plat, comme une petite pelle. Il vivait il y a 250 millions d'années — [amazed] avant les dinosaures.
**WEX** [curious] : Il vivait où ?
**NARRATEUR H** [amazed] : Partout, ou presque : en Afrique du Sud, en Antarctique, en Inde, en Chine, en Russie, en Mongolie. [serious] À cette époque, toutes les terres étaient collées [confident] en un seul morceau.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 0 virgule 7 mètre de long — comme un gros chat allongé ! [amazed] Debout, il faisait 0 virgule 35 mètre de haut — il t'arrivait aux genoux ! Et il pesait 17 kilos — [serious] aussi lourd qu'un enfant de 4 ans ! [curious] Les savants pensent qu'il pouvait avancer à 5 kilomètres à l'heure — aussi vite que toi quand tu marches.
**WEX** [playful] : Petit, mais costaud ?
**NARRATEUR H** [chuckles] : Petit, mais costaud, oui — [proud] et surtout, incroyablement résistant.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Il coupait les plantes basses avec son bec, et vivait en très, très grand nombre. [confident] Juste après la plus grosse catastrophe de l'histoire de la Terre, [calm] presque plus aucun chasseur ne restait pour le menacer.
**WEX** [curious] : Une catastrophe, c'est-à-dire ?
**NARRATEUR H** [gently] : La plus terrible extinction que la Terre ait connue. [warmly] Presque tous les animaux ont disparu — mais pas lui.

### BLOC D — Le truc fou

**NARRATEUR H** [amazed] : Juste après cette catastrophe, à certains endroits, presque tous les animaux à quatre pattes qu'on retrouve, [serious] ce sont des Lystrosaures — [proud] parfois neuf sur dix.
**WEX** [gasps] : Neuf sur dix, rien que lui ?
**NARRATEUR H** [softly] : Rien que lui. Le grand survivant, [proud] celui qui a tenu quand presque tout le reste s'est éteint.

---

## Vérification avant livraison

- [x] 1 dino, 4 blocs A/B/C/D.
- [x] Étymologie conforme (`nom_etym`) : pelle + lézard.
- [x] Chiffres = sortie exacte `_compLong(0.7)`/`_compHaut(0.35)`/`_compPoids(0.017)` exécutées node 2026-09-05 ; poids < 1 t en kilos.
- [x] Vitesse (nouveau, demandé par l'orchestrateur) : `vitesse_kmh: 5` dit en bloc B avec `_compVitesse(5)` exact = « aussi vite que toi quand tu marches », formulé en estimation (« les savants pensent »), « ! » devenu « . ».
- [x] Tous les lieux de `region` cités (6 : Afrique du Sud, Antarctique, Inde, Chine, Russie, Mongolie).
- [x] « PAS un dinosaure » dit clairement en bloc A, Permien nommé.
- [x] Bloc D 100 % neuf (proportion 9/10 après extinction), aucun doublon avec A/B/C.
- [x] On écoute : 0 « regarde ». Grep interdits : 0 match.
- [x] Wex jamais de `!`, questions variées.
- [x] Tags conformes doctrine.
