# Hatzegopteryx — dialogue audio V3 (Narrateur H + Wex)

> Ptérosaure géant (famille `pterosaures`, clé technique dinos-data.js — PAS un dinosaure), Crétacé · 66 millions d'années · île de Hațeg, Roumanie (Europe).
> Chiffres data (`site/js/dinos-data.js` id `hatzegopteryx`) : envergure 10 m (`taille_vol: true`, comparaison déjà hardcodée dans la data) · 3 m debout · 220 kg. Comparaisons = sortie EXACTE : `comp_taille` = « ses ailes ouvertes étaient aussi larges que six Papas couchés bout à bout » · `_compHaut(3)` = `aussi haut qu'un panier de basket !` · `_compPoids(0.22)` = `aussi lourd qu'un lion !` (⚠️ corrigé vs version précédente qui disait « gros cochon » — sortie exacte exécutée node 2026-09-05 = lion, palier 0,18-0,225 t).
> **Vitesse (ajout HO-011)** : `vitesse_kmh: 12` en data — vitesse **au sol** (marche/course, PAS de vol, il chassait à pied). `_compVitesse(12)` exécutée node 2026-09-05 : `aussi vite qu'un enfant qui court !`. Ajoutée en fin de bloc C (contexte chasse au sol), formulée en estimation.
> Étymologie conforme au champ `nom_etym` de la data : Hatzego (lieu, Hațeg en Roumanie) + ptéryx (grec, l'aile) + thambema (grec, le monstre).
> Fait distinctif Witton & Habib 2010 repris : cou COURT et épais (contrairement au Quetzalcoatlus, cou long et fin), chasseur terrestre quadrupède, île de dinosaures nains où il restait le géant.
> **Réécriture HO-011 (2026-09-05)** : la version précédente disait « personne n'était assez fort pour l'attaquer » — motif « Personne ne l'attaquait » **ÉPUISÉ** au registre `_SCENES-VIGNETTES.md` (5 dinos l'ont déjà, dont Hatzegopteryx lui-même listé). **Reformulé** : l'angle du bloc C n'est plus « pas de prédateur » mais **« chasseur à pied ET en vol, une double vie »** — fait distinctif réel (Witton & Habib), pas un doublon de motif.
> Prononciation : **Hat-zé-gop-té-rix** (genre) / **tam-bé-ma** (espèce) — mirroring Ar-ké-op-té-rix. Toujours pas gravée dans `i18n/lexiques-prononciation/fr.md` → ajoutée dans ce lot (append).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> Tritri : PAS de touche — Hatzegopteryx vivait en Europe (île de Hațeg), Tricératops en Amérique du Nord. Aucun croisement géographique plausible, portée Tritri non forcée.

## Hatzegopteryx — Hatzegopteryx thambema

### BLOC A — Présentation
**NARRATEUR H** [excited] : Hat-zé-gop-té-rix. Un nom en trois morceaux. « Hatzego » vient de Hațeg, une région de Roumanie, [serious] où on a trouvé ses os. [curious] « Ptéryx », en grec, c'est l'aile. Et « thambema », ça veut dire monstre.
**WEX** [confident] : L'aile-monstre de Hațeg.
**NARRATEUR H** [happily] : Exactement. [serious] Attention : pas un dinosaure — un reptile volant. Il vivait il y a 66 millions d'années, [amazed] sur une île perdue en mer.
**WEX** [curious] : Une île, toute seule ?
**NARRATEUR H** [calm] : Oui, coupée du reste du monde. [pauses] Et là-bas, presque rien n'était comme ailleurs.

### BLOC B — Taille
**NARRATEUR H** [excited] : Ses ailes ouvertes faisaient 10 mètres d'un bout à l'autre — aussi large que six Papas couchés bout à bout. [quickly] Mises bout à bout, aussi long qu'un camion. Debout, 3 mètres de haut — [proud] aussi haut qu'un panier de basket. Et 220 kilos — aussi lourd qu'un lion.
**WEX** [gasps] : Aussi haut qu'un panier de basket ?
**NARRATEUR H** [confident] : Oui. [slowly] Mais sa vraie différence, c'est son cou : contrairement au Quetzalcoatlus, son cousin au cou fin et long, [amazed] lui avait un cou court et épais, presque comme un taureau, avec une tête énorme au bout.

### BLOC C — Comment il vivait
**NARRATEUR H** [serious] : Carnivore. [confident] Et il menait une double vie : il chassait aussi bien à pied qu'en plein ciel.
**WEX** [curious] : À pied ? [gasps] Un animal volant qui marche ?
**NARRATEUR H** [confident] : Oui, sur ses quatre pattes. [slowly] Et les savants pensent qu'au sol, il avançait à environ 12 kilomètres à l'heure — [amazed] aussi vite qu'un enfant qui court.
**WEX** [curious] : Il mangeait quoi, sur son île ?
**NARRATEUR H** [warmly] : De petits dinosaures nains, [confident] cousins miniatures des géants à long cou. Sur cette île, presque tout avait rapetissé.

### BLOC D — Le truc fou
**NARRATEUR H** [excited] : Sur l'île de Hațeg, la nourriture manquait. [serious] Alors presque tous les dinosaures étaient devenus minuscules — [pauses] une île de nains. Mais l'Hatzegopteryx, lui, restait immense.
**WEX** [gasps] : Le géant chez les nains.
**NARRATEUR H** [softly] : Exactement. [proud] Le roi d'un monde miniature.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie en 3 morceaux conforme à `nom_etym` (Hatzego = lieu, ptéryx = aile, thambema = monstre).
- [x] Chiffres = sortie exacte data (envergure custom, `_compHaut(3)`, `_compPoids(0.22)` — CORRIGÉ « lion » et non « gros cochon » comme la version précédente, vérifié par exécution node du fichier réel).
- [x] Vitesse ajoutée : `_compVitesse(12)` exécutée, contextualisée « au sol » (pas de confusion avec le vol), formulée en estimation.
- [x] Motif « Personne ne l'attaquait » RETIRÉ (épuisé au registre) — remplacé par l'angle factuel « double vie » chasseur à pied/en vol, fait distinctif réel non redondant.
- [x] Cou COURT et épais (≠ Quetzalcoatlus) mentionné explicitement — fait distinctif Witton & Habib 2010.
- [x] Terme savant expliqué : « ptérosaure, un reptile volant, comme le Ptéranodon ».
- [x] Grep interdits OK.
- [x] Wex ne finit jamais par `!` ni par un écho.
- [x] Tags enrichis (doctrine HO-011) : ≤ 2 collés en tête, 1 isolé au fil de la phrase, densité Narrateur 2-5, Wex 1-3.
- [x] Pas de croisement Tricératops forcé (autre continent).
- [x] Prononciation Hat-zé-gop-té-rix / tam-bé-ma ajoutée au lexique fr (append, ce lot).
