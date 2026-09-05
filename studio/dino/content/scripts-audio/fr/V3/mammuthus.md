# Mammouth — Script audio (Narrateur H + Wex)

> Mammifère (famille `mammiferes`), PAS un dinosaure — il vit APRÈS la météorite. Cénozoïque · Âge de glace · il y a 100 000 ans · Europe, Asie et Amérique du Nord.
> Chiffres data (`site/js/dinos-data.js` id `mammuthus`) : 5,5 m long · 3,3 m haut · 5 t. Comparaisons = sortie EXACTE de `_compLong(5.5)` / `_compHaut(3.3)` / `_compPoids(5)`, exécutées node 2026-09-05 : `aussi long qu'un grand 4×4 !` / `comme deux Papas l'un sur l'autre !` / `aussi lourd qu'un éléphant !`.
> Pas de `vitesse_kmh` dans la data → aucune vitesse chiffrée dite.
> Étymologie conforme à `_ETYMO-RACINES-50.md` : « Mammuth- » ne vient PAS du grec/latin mais du russe *mamont* (← mansi *mē̮ŋ-ońt*, « corne de la terre ») — les défenses trouvées gelées dans le sol étaient prises pour des cornes. Fait dit simplement (« un très vieux mot »), sans étaler le détail linguistique mansi (hors portée 4 ans).
> Fact-check (Grokipedia, 2026-09-05) : Mammuthus primigenius, Âge de glace, troupeaux comme les éléphants. Chasseurs = les hommes préhistoriques SEULEMENT (aucune mention lion des cavernes dans la data, non sourcé → absent du script). Défenses > 4 m, vérifié. Derniers mammouths sur l'île Wrangel (Sibérie) il y a 4 000 ans : vrai (fact-check croisé), pyramides d'Égypte déjà debout à cette date (~2600 av. J.-C. = il y a ~4 600 ans) — comparaison retenue.
> Prononciation : « Mammouth » se lit bien tel quel (lexique §3, aucun piège).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> **Révision densité tags (2026-09-05, retour orchestrateur/Papa Yann)** : tags répartis au fil des phrases (pas seulement en tête), Wex ponctué systématiquement (`?` sur les questions).

## Mammouth — Mammuthus primigenius

### BLOC A — Présentation

**NARRATEUR H** [excited] : Mam-mouth. [curious] C'est un très vieux mot qui veut dire à peu près « corne de la terre » — les tout premiers chasseurs trouvaient ses défenses gelées dans le sol et [amazed] croyaient que c'était des cornes.
**WEX** [curious] : Un cousin de l'éléphant ?
**NARRATEUR H** [happily] : Un éléphant tout poilu, oui. [serious] Et attention : il ne vivait pas avec les dinosaures. Il est arrivé bien après, à l'Âge de glace, [pauses] il y a 100 000 ans, quand la Terre était toute froide.
**WEX** [gasps] : Après les dinosaures ?
**NARRATEUR H** [confident] : Longtemps après. En Europe, en Asie et [warmly] en Amérique du Nord, là où il faisait glacial.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 5 mètres et demi de long — aussi long qu'un grand 4×4 ! Debout, il faisait 3 mètres 30 de haut — [amazed] comme deux Papas l'un sur l'autre ! Et il pesait 5 mille kilos — [proud] aussi lourd qu'un éléphant !
**WEX** [curious] : Ses défenses, elles servaient à quoi ?
**NARRATEUR H** [confident] : À balayer la neige. [amazed] Ses deux défenses recourbées pouvaient dépasser 4 mètres — plus longues que Papa allongé par terre.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un herbivore. Il mangeait l'herbe et les petites plantes cachées sous la neige. [warmly] Une épaisse fourrure et une grosse couche de graisse le gardaient au chaud, et il vivait en troupeau, [gently] comme les éléphants d'aujourd'hui.
**WEX** [nervous] : Qui pouvait l'attaquer, avec sa fourrure ?
**NARRATEUR H** [confident] : Seulement les hommes préhistoriques. [warmly] Personne d'autre n'osait s'en prendre à une bête aussi grande.

### BLOC D — Le truc fou

**NARRATEUR H** [whispers] : Les tout derniers mammouths de toute la Terre ont survécu sur [pauses] une petite île, tout au nord, très longtemps après les autres.
**WEX** [gasps] : Longtemps comment ?
**NARRATEUR H** [amazed] : Jusqu'à il y a seulement 4 000 ans. [slowly] À cette époque-là, les grandes pyramides d'Égypte étaient déjà construites.

---

## Vérification avant livraison

- [x] 1 animal, 4 blocs A/B/C/D. Pas un dinosaure, vit après la météorite (dit explicitement en A).
- [x] Étymologie : source russe/mansi (pas grec/latin) conforme `_ETYMO-RACINES-50.md`, simplifiée pour 4 ans sans mentir.
- [x] Chiffres B = sortie exacte `_compLong(5.5)`/`_compHaut(3.3)`/`_compPoids(5)` exécutées node.
- [x] Chasseurs = hommes préhistoriques uniquement (aucun lion des cavernes non sourcé ajouté).
- [x] Pas de Tritri (aucun contemporain dino).
- [x] Bloc D neuf : île Wrangel + 4000 ans + pyramides (aucun chiffre déjà dit en A/B/C).
- [x] Wex sans `!`, FR standard, aucun tic écrit, chaque réplique ponctuée (`?` sur question).
- [x] Densité tags : Narrateur 2-5 selon longueur, dont au moins 1 au milieu si > 70 car. ; Wex 1 tag.
- [x] Grep interdits (max/doudou/peluche/nounours/regarde/bus hors B/Elvis-Ferrari-JP-vroum) : 0 match.
