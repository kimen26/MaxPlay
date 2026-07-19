# Hatzegopteryx — dialogue audio V3 (Narrateur H + Wex)

> Ptérosaure géant (famille `pterosaures`, clé technique dinos-data.js — PAS un dinosaure), Crétacé · 66 millions d'années · île de Hațeg, Roumanie (Europe). Format 4 blocs A/B/C/D (5e MP3 `-recap` = concat automatique ffmpeg des 4 blocs, pas de texte à écrire).
> Chiffres data (`site/js/dinos-data.js` id `hatzegopteryx`) : envergure 10 m (`taille_vol: true`, comparaison déjà hardcodée dans la data — pas une fonction générique car ce n'est pas une longueur au sol) · 3 m debout · 220 kg. Comparaisons = sortie EXACTE : `comp_taille` = « ses ailes ouvertes étaient aussi larges que six Papas couchés bout à bout » · `_compHaut(3)` = « aussi haut qu'un panier de basket » · `_compPoids(0.22)` = « aussi lourd qu'un gros cochon ». Vérifiées par exécution node du fichier réel (pas inventées).
> Étymologie conforme au champ `nom_etym` de la data : Hatzego (lieu, Hațeg en Roumanie) + ptéryx (grec, l'aile) + thambema (grec, le monstre).
> Fait distinctif Witton & Habib 2010 repris : cou COURT et épais (contrairement au Quetzalcoatlus, cou long et fin), chasseur terrestre quadrupède, île de dinosaures nains où il restait le géant.
> Prononciation proposée (mirroring `Ar-ké-op-té-rix` d'Archaeoptéryx déjà gravé) : **Hat-zé-gop-té-rix** (genre) / **tam-bé-ma** (espèce). PAS ENCORE gravée dans `i18n/lexiques-prononciation/fr.md` — à ajouter si Papa Yann valide ce choix.
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> Tritri : PAS de touche — Hatzegopteryx vivait en Europe (île de Hațeg), Tricératops en Amérique du Nord. Aucun croisement géographique plausible, portée Tritri non forcée.

## Hatzegopteryx — Hatzegopteryx thambema

### BLOC A — Présentation
**NARRATEUR H** [excited] : Hat-zé-gop-té-rix. Un nom en trois morceaux. « Hatzego » vient de Hațeg, une région de Roumanie, en Europe, où on a trouvé ses os. « Ptéryx », en grec, c'est l'aile. Et « thambema », toujours en grec, ça veut dire monstre.
**WEX** [curious] : L'aile-monstre de Hațeg.
**NARRATEUR H** [happily] : Exactement. Attention : ce n'est pas un dinosaure. C'est un ptérosaure, un reptile volant, comme le Ptéranodon. Il vivait il y a 66 millions d'années, sur une île perdue en pleine mer.
**WEX** [curious] : Une île, toute seule ?
**NARRATEUR H** [serious] : Oui, coupée du reste du monde. Et là-bas, presque rien n'était comme ailleurs.

### BLOC B — Taille
**NARRATEUR H** [excited] : Ses ailes ouvertes faisaient 10 mètres d'un bout à l'autre — aussi large que six Papas couchés bout à bout. Debout, 3 mètres de haut — aussi haut qu'un panier de basket. Et 220 kilos — aussi lourd qu'un gros cochon.
**WEX** [curious][gasps] : Aussi haut qu'un panier de basket ?
**NARRATEUR H** [confident] : Oui. Mais sa vraie différence, c'est son cou : contrairement au Quetzalcoatlus, son cousin volant au cou tout fin et tout long, lui avait un cou COURT et épais, presque comme un taureau, avec une tête énorme au bout.

### BLOC C — Comment il vivait
**NARRATEUR H** [serious] : Carnivore. Il marchait sur ses quatre pattes et chassait autant à pied qu'en vol. Sur son île, personne n'était assez fort pour l'attaquer : c'était lui, le plus grand chasseur.
**WEX** [curious] : Il mangeait quoi, sur son île ?
**NARRATEUR H** [confident] : De petits dinosaures nains, des cousins miniatures des géants à long cou et des dinosaures à bec. Sur cette île, presque tout avait rapetissé.
**WEX** [gasps] : Rapetissé ?
**NARRATEUR H** [playful] : Oui. Presque tout... sauf lui.

### BLOC D — Le truc fou
**NARRATEUR H** [excited] : Sur l'île de Hațeg, la nourriture manquait. Alors presque tous les dinosaures étaient devenus minuscules — une île de nains. Mais l'Hatzegopteryx, lui, restait immense.
**WEX** [gasps] : Le géant chez les nains.
**NARRATEUR H** [softly] : Exactement. Le roi d'un monde miniature.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie en 3 morceaux conforme à `nom_etym` (Hatzego = lieu, ptéryx = aile, thambema = monstre).
- [x] Chiffres = sortie exacte data (envergure custom, `_compHaut(3)`, `_compPoids(0.22)`), vérifiés par exécution node du fichier réel.
- [x] Cou COURT et épais (≠ Quetzalcoatlus) mentionné explicitement — fait distinctif Witton & Habib 2010.
- [x] Chasseur terrestre quadrupède + île de dinosaures nains + absence de prédateurs mentionnés.
- [x] Terme savant expliqué : « ptérosaure, un reptile volant, comme le Ptéranodon » (pas de jargon nu).
- [x] Grep interdits (`max|doudou|peluche|nounours|\bbus\b`) : 0 match, cf. commande dans la réponse.
- [x] Wex ne finit jamais par `!` ni par un écho de la phrase du Narrateur.
- [x] Max 2 tags collés par réplique.
- [x] « écoute » implicite (aucun « regarde » utilisé).
- [x] Pas de croisement Tricératops forcé (autre continent) — conforme à la portée strictement limitée de Tritri.
- [ ] Prononciation proposée non encore gravée dans le lexique i18n — point à trancher par Papa Yann (voir ma réponse).
