# Jobaria — dialogue audio V3 (Narrateur H + Wex)

> Sauropode à cou relativement court (famille `cou_long`, clé technique dinos-data.js), Jurassique · 165 millions d'années · Afrique (Niger, Sahara). Format 4 blocs A/B/C/D (5e MP3 `-recap` = concat automatique ffmpeg des 4 blocs, pas de texte à écrire).
> Chiffres data (`studio/dino/content/dinos/jobaria.json`) : 17 m long · 4.5 m haut · 16 t. Comparaisons = sortie EXACTE de _compLong(17) / _compHaut(4.5) / _compPoids(16), exécutées node le 2026-11-08 : `aussi long qu'un bus accordéon !` / `aussi haut qu'un bus anglais à deux étages !` / `aussi lourd que 8 rhinocéros !`.
> Étymologie : PAS de racine grecque ni latine. « Jobaria » vient du Jobar, géant du folklore touareg (champ `nom_etym` data) ; *tiguidensis* = « des falaises de Tiguidi » (non repris, trop savant). Wex tente « le grec » en premier, le Narrateur corrige. Prononciation « Jo-ba-ri-a » = lexique `i18n/lexiques-prononciation/fr.md` (§ vague 2026-11-08).
> Fact-check (sourcé 2026-11-08, base `sources/fiches/_FACTCHECK-vague-2026-11.md` recoupée) : Grokipedia https://grokipedia.com/page/Jobaria et Wikipédia EN https://en.wikipedia.org/wiki/Jobaria — Niger, falaises de Tiguidi (Formation de Tiourarén), Sereno et al. 1999 ; Jurassique ~165 Ma retenu (datation débattue : Crétacé inférieur en 1999, réinterprétée Jurassique moyen-supérieur, non racontée à l'enfant) ; « plus de 95 % du squelette », jeunes et adultes ; cou court (12 cervicales) pour un sauropode, dents en cuillère ; milieu de plaine alluviale avec lacs (Sahara non désertique à l'époque). Troupeau = HYPOTHÈSE (« peut-être »), chasse de l'Afrovénator sur les jeunes = HYPOTHÈSE (« sans doute »). Hauteur 4,5 m = Grokipedia seule (non recoupée).
> Cohabitation vérifiée : Jobaria et Afrovénator = même formation (Tiourarén), même époque. Le chasseur est cité comme DANGER (carnivore → herbivore), jamais l'inverse. Aucun herbivore listé comme ennemi.
> Anti-doublon : A = nom/lieu/époque · B = chiffres · C = dents, cou, troupeau, chasseur · D = 95 % du squelette + Sahara vert (rien de A-C redit).
> Vignette attaque/défense : aucune (rien d'étayé pour Jobaria ; le danger des petits suffit). Registre `_SCENES-VIGNETTES.md` : ligne ajoutée.
> Tritri : PAS de touche — Jobaria (165 Ma) et Tricératops (66 Ma) ne sont pas contemporains.
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.

## Jobaria — Jobaria tiguidensis

### BLOC A — Présentation
**NARRATEUR H** [excited] : Jo-ba-ri-a. [curious] Ce nom-là est un peu spécial.
**WEX** [curious] : Il vient du grec, comme les autres ?
**NARRATEUR H** [playful] : Pas cette fois. [warmly] Il vient d'Afrique : les Touaregs, un peuple du désert, racontaient l'histoire du Jobar, un animal géant.
**WEX** [confident] : Et en trouvant ses énormes os, on a pensé à ce géant.
**NARRATEUR H** [happily] : Exactement. [confident] Il vivait au Niger, il y a 165 millions d'années, [pauses] au Jurassique.

### BLOC B — Taille
**NARRATEUR H** [excited] : 17 mètres de long — aussi long qu'un bus accordéon. [quickly] 4 virgule 5 mètres de haut — aussi haut qu'un bus anglais à deux étages. Et 16 mille kilos — [amazed] aussi lourd que 8 rhinocéros.
**WEX** [amazed] : Huit rhinocéros, et tout ça sur quatre pattes.
**NARRATEUR H** [confident] : Oui. [proud] Des pattes solides comme des piliers.

### BLOC C — Comment il vivait
**NARRATEUR H** [serious] : Herbivore. Il coupait feuilles et branches avec ses dents en forme de cuillère. [confident] On a trouvé des grands et des petits Jobaria ensemble, [curious] alors il vivait peut-être en troupeau.
**WEX** [curious] : Il avait un cou aussi long que le Diplodocus ?
**NARRATEUR H** [confident] : Un peu plus court. [softly] Mais assez long pour brouter bien au-dessus du sol. [nervous] Et un chasseur rôdait par là, l'Afrovénator : [serious] les adultes étaient sans doute trop gros pour lui, mais les petits devaient se méfier.

### BLOC D — Le truc fou
**NARRATEUR H** [excited] : On a retrouvé plus de 95 pour cent de son squelette. [amazed] Presque TOUS ses os, enterrés dans le sable du Sahara.
**WEX** [curious] : Dans le désert ? Mais il mangeait quoi, là-bas ?
**NARRATEUR H** [softly] : À son époque, ce n'était pas un désert. [excited] Il y avait des rivières, des lacs et plein de plantes. [warmly] Le sable est arrivé bien plus tard.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie conforme à `nom_etym` data : géant Jobar du folklore touareg, explicitement « pas du grec » ; Wex devine puis déduit.
- [x] Chiffres taille/poids = sortie exacte `_compLong(17)` / `_compHaut(4.5)` / `_compPoids(16)` (exécution node 2026-11-08, bloc B mot pour mot).
- [x] Prononciation « Jo-ba-ri-a » = lexique existant, pas d'invention.
- [x] Espèces citées contemporaines : Afrovénator (même formation, même époque) ✓ ; Diplodocus cité seulement comme repère de cou (pas comme voisin).
- [x] Aucun herbivore présenté comme ennemi ; le chasseur est le carnivore.
- [x] Hypothèses formulées comme telles (« peut-être en troupeau », « sans doute trop gros »).
- [x] Bloc D = 100 % neuf (95 % du squelette, Sahara vert) ; « Sahara » absent de A (A dit « désert » côté Touaregs) pour ne pas redire.
- [x] Wex : réactions variées ([curious] ×3, [confident], [amazed]), jamais de `!` final, une question utile (« il mangeait quoi, dans le désert ? »).
- [x] Grep interdits exécuté : 0 match (cf. rapport).
- [x] Pas de Tritri ; « bus » seulement dans le bloc B.
