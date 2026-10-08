# Paracérathérium — Script audio (Narrateur H + Wex)

> Mammifère (famille `mammiferes`), PAS un dinosaure — il vit APRÈS la météorite. Cénozoïque · il y a 30 millions d'années · Asie (Pakistan, Chine, Mongolie).
> Chiffres data (`studio/dino/content/dinos/paraceratherium.json`) : 7.4 m long · 5 m haut · 17 t. Comparaisons = sortie EXACTE de _compLong(7.4) / _compHaut(5) / _compPoids(17), régénérées 2026-09-12 : `comme deux voitures l'une derrière l'autre !` / `presque trois Papas l'un sur l'autre !` / `aussi lourd que 6 hippopotames !`.
> Pas de `vitesse_kmh` dans la data → aucune vitesse chiffrée dite.
> **Registre anti-redite** : « Personne ne l'attaquait » est ÉPUISÉ et déjà attribué à ce dino dans l'ancienne version (`_SCENES-VIGNETTES.md`). Reformulé ici autrement : l'idée de sécurité par la taille est dite une seule fois, différemment (« aucun chasseur de son époque n'était assez costaud »), sans reprendre le motif figé.
> Étymologie conforme `_ETYMO-RACINES-50.md` : grec *para-* = à côté de/proche + *a-* = sans + *keras* = corne + *thèrion* = bête → « proche de la bête sans corne » (les savants le croyaient cousin de l'Acérathérium, la bête sans corne).
> Fact-check (sourcé 2026-10-08) : Grokipedia https://grokipedia.com/page/Paraceratherium — « during the Oligocene epoch, roughly 34 to 23 million years ago » (~30 Ma dans la fourchette) ; « from Pakistan's Bugti Hills to China's Linxia Basin and Kazakhstan » + Gobi mongol (expéditions 1923) (Pakistan/Chine/Mongolie confirmés) ; « gigantic, hornless rhinoceros relative » ; « 7.4 meters in length, nearly 5 meters tall at the shoulder, and up to 20 metric tons » (data 7,4 m / 17 t cohérentes) ; « long neck and legs adapted for reaching treetops ». **DOUTEUX (x3)** : (1) le script dit « le plus grand animal à poils qui ait jamais marché » alors que la source dit « one of the largest terrestrial mammals to have ever lived » (superlatif absolu non confirmé) ; (2) « sa tête montait à 5 mètres » : les 5 m sont la hauteur à l'ÉPAULE, pas à la tête ; (3) « en petits groupes » : la source dit « likely lived a solitary life ».
> Prononciation : « Pa-ra-cé-ra-té-rioum » (lexique §2bis, th→t).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> **Révision densité tags (2026-09-05, retour orchestrateur/Papa Yann)** : tags répartis au fil des phrases, Wex ponctué systématiquement (`?` sur les questions).

## Paracérathérium — Paraceratherium

### BLOC A — Présentation

**NARRATEUR H** [excited] : Pa-ra-cé-ra-té-rioum. [curious] Quatre petits morceaux, tous en grec. [pauses] « Para », ça veut dire à côté de, proche de. Et le tout petit bout après, ça veut dire « sans ».
**WEX** [curious] : Proche de... sans quoi ?
**NARRATEUR H** [playful] : « Céras », c'est la corne. Et « thérium », la bête.
**WEX** [amazed] : Proche de la bête sans corne.
**NARRATEUR H** [warmly] : En entier, oui — un cousin du rhinocéros, mais sans une seule corne. Il vivait en Asie, [amazed] au Pakistan, en Chine et en Mongolie, [pauses] il y a 30 millions d'années — bien après les dinosaures.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 7 mètres 40 de long — comme deux voitures l'une derrière l'autre ! Debout, il faisait 5 mètres de haut — [amazed] presque trois Papas l'un sur l'autre ! Et il pesait 17 mille kilos — [proud] aussi lourd que 6 hippopotames !
**WEX** [gasps] : Six hippopotames ?
**NARRATEUR H** [amazed] : Oui. C'est le plus grand animal à poils [proud] qui ait jamais marché sur la Terre.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un herbivore. [amazed] Avec son long cou, il attrapait les feuilles tout en haut des arbres, [gently] là où personne d'autre ne pouvait manger. Il vivait tranquille, en petits groupes.
**WEX** [curious] : Il craignait quel chasseur ?
**NARRATEUR H** [confident] : Aucun chasseur de son époque n'était assez costaud pour s'en prendre à lui — [warmly] sa taille suffisait.

### BLOC D — Le truc fou

**NARRATEUR H** [slowly] : Sa tête, tout en haut de son long cou, [pauses] montait à 5 mètres de haut.
**WEX** [gasps] : Plus haut qu'une girafe ?
**NARRATEUR H** [amazed] : Plus haut qu'une girafe, oui. [proud] Un rhinocéros sans corne, mais grand comme un immeuble.

---

## Vérification avant livraison

- [x] 1 animal, 4 blocs A/B/C/D. Pas un dinosaure, vit après la météorite (dit explicitement en A).
- [x] Étymologie conforme `_ETYMO-RACINES-50.md` : para- + a- + keras + thèrion = « proche de la bête sans corne ».
- [x] Chiffres B = sortie exacte `_compLong(7.4)`/`_compHaut(5)`/`_compPoids(17)` exécutées node — chiffre ré-audité (7,4 m).
- [x] Motif « Personne ne l'attaquait » ÉVITÉ (reformulé « aucun chasseur... assez costaud »), registre respecté.
- [x] 3 lieux cités (Pakistan, Chine, Mongolie), conforme `region`.
- [x] Pas de Tritri.
- [x] Bloc D neuf : hauteur 5 m + comparaison girafe (aucun doublon interne au script).
- [x] Wex sans `!`, FR standard, chaque réplique ponctuée.
- [x] Grep interdits : 0 match.
