# Corythosaure — dialogue audio V3 (Narrateur H + Wex)

> Ornithopode à crête-casque (famille `bec`, clé technique dinos-data.js), Crétacé · 76 millions d'années · Amérique du Nord. Format 4 blocs A/B/C/D (5e MP3 `-recap` = concat automatique ffmpeg des 4 blocs, pas de texte à écrire).
> Chiffres data (`site/js/dinos-data.js` id `corythosaurus`) : 9 m long · 2 m haut · 4 t. Comparaisons = sortie EXACTE de `_compLong(9)` / `_compHaut(2)` / `_compPoids(4)`, vérifiées par exécution node (la fonction renvoie littéralement « que un hippopotame » — élision « qu'un » corrigée à l'écrit, précédent déjà appliqué sur Edmontosaure/Stégosaure/Mégathère, mêmes 4 t).
> Étymologie conforme à `_ETYMO-COMPLET-60.md` (corytho = casque, saurus = lézard) + `nom_etym` data (casuarius = casoar, détail non repris ici pour rester simple).
> Prononciation « Co-ri-to-saure » déjà gravée dans `i18n/lexiques-prononciation/fr.md`.
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> Tritri : PAS de touche — Corythosaure (76 Ma) et Tricératops (66 Ma) ne sont pas contemporains (écart ~10 Ma). Portée Tritri strictement limitée : on ne force pas le rapprochement.

## Corythosaure — Corythosaurus casuarius

### BLOC A — Présentation
**NARRATEUR H** [excited] : Co-ri-to-saure. En grec ancien, « corytho », c'est le casque, comme celui d'un guerrier. Et « saure », c'est le lézard. Le lézard à casque.
**WEX** [curious] : Un casque sur la tête.
**NARRATEUR H** [happily] : Exactement. Une grande crête arrondie, creuse à l'intérieur. Il vivait en Amérique du Nord, il y a 76 millions d'années.
**WEX** [curious] : Et il y avait des dangers, par là ?
**NARRATEUR H** [serious] : Oui. Le Gorgosaure et le Daspletosaure, deux cousins du T-Rex, chassaient dans le coin. Alors le Corythosaure ne restait jamais seul.

### BLOC B — Taille
**NARRATEUR H** [excited] : 9 mètres de long — aussi long qu'un camion. 2 mètres de haut — aussi haut qu'une porte. Et 4 mille kilos — aussi lourd qu'un hippopotame.
**WEX** [curious][gasps] : Aussi haut qu'une porte, avec un casque en plus ?
**NARRATEUR H** [confident] : Oui. Un grand herbivore à bec de canard, avec sa crête tout en haut du crâne.

### BLOC C — Comment il vivait
**NARRATEUR H** [serious] : Herbivore. Il broutait des plantes en troupeau, jamais tout seul. Le Gorgosaure et le Daspletosaure rôdaient par là, alors la troupe restait bien groupée.
**WEX** [curious] : Ils se prévenaient comment, d'un danger ?
**NARRATEUR H** [confident] : Avec des cris puissants, qui portaient loin. Tout le troupeau se sauvait ensemble, dès le premier signal.

### BLOC D — Le truc fou
**NARRATEUR H** [excited] : Sa crête était creuse, avec de petits tuyaux d'os à l'intérieur, comme une trompette. En soufflant dedans, sa voix résonnait très loin, pour appeler son troupeau même sans le voir.
**WEX** [gasps] : Une trompette sur la tête.
**NARRATEUR H** [softly] : Oui. Et chaque forme de crête donnait un son un peu différent — comme si chacun avait sa propre voix.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie conforme (corytho = casque, saure = lézard).
- [x] Chiffres taille/poids = sortie exacte `_compLong(9)` / `_compHaut(2)` / `_compPoids(4)` (vérifié par exécution node du fichier réel).
- [x] Prononciation « Co-ri-to-saure » = lexique existant, pas d'invention.
- [x] Terme savant expliqué : « herbivore », « bec de canard » restent clairs pour 4 ans ; pas de jargon non filé.
- [x] Grep interdits (`max|doudou|peluche|nounours|\bbus\b`) : 0 match, cf. commande dans la réponse.
- [x] Wex ne finit jamais par `!` ni par un écho de la phrase du Narrateur.
- [x] Max 2 tags collés par réplique.
- [x] « écoute » implicite (aucun « regarde » utilisé).
- [x] Pas de croisement Tricératops forcé (époques distinctes) — conforme à la portée strictement limitée de Tritri.
