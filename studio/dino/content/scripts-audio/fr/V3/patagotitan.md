# Titanosaure — Script audio (Narrateur H + Wex)

> Sauropode (famille `cou_long`), Crétacé · 100 millions d'années · Amérique du Sud (Argentine, Patagonie).
> Chiffres data (`studio/dino/content/dinos/patagotitan.json`) : 31 m long · 6.5 m haut · 57 t. Comparaisons = sortie EXACTE de _compLong(31) / _compHaut(6.5) / _compPoids(57), régénérées 2026-11-03 : `comme un bus accordéon et un bus, l'un derrière l'autre !` / `aussi haut qu'un lampadaire !` / `aussi lourd que 19 hippopotames !`.
> Étymologie (`_ETYMO-RACINES-50.md`) : *Titano-* (grec, de Titan) = le géant + *-saurus/-saure* = lézard → « le lézard géant ». Le nom d'usage FR est « Titanosaure » ; le nom scientifique complet, Patagotitan, est dit en D. Respelling lexique disponible : « Pa-ta-go-ti-tan ».
> Fact-check (sourcé 2026-11-03) : Grokipedia https://grokipedia.com/page/Patagotitan — « approximately 101.6 million years ago » (100 Ma) ; « total length of approximately 31 meters [...] and a body mass ranging from 50 to 57 metric tons » et « Shoulder height is estimated at 6 to 7 meters » ; Wikipédia EN https://en.wikipedia.org/wiki/Patagotitan : « In 2024, Paul estimated its length at 31 m, and its weight at 57 t » (31 m confirmé). **Corrigé le 2026-11-03** : poids 70 t → **57 t** (69 t = estimation de 2017, depuis revue à la baisse ; fourchette actuelle 50-57 t → « aussi lourd que 19 hippopotames ») ; hauteur 12 m → **6,5 m aux épaules** (Grokipedia 6-7 m ; le 12 m n'était sourcé nulle part) ; « 7 squelettes » → **« au moins 6 »** (Grokipedia « at least six individuals », Wikipédia EN « six partial skeletons ») ; « le plus grand animal qui ait jamais marché » → « l'un des plus grands » (« debates persist with comparably massive taxa like Argentinosaurus ») ; « cœur gros comme une petite voiture », « camions spéciaux et grues géantes », « aucune marque de morsure sur ses os d'adulte » : aucune source, RETIRÉS (remplacés par « jeunes adultes, il pouvait encore grandir » — Wikipédia EN « at least six young adult individuals » —, « plus de 150 os » — Grokipedia « more than 150 fossil bones » — et le Tyrannotitan — Grokipedia « Adults' massive size offered defense against predators like Tyrannotitan »).
> ⚠️ CORRECTION FACT-CHECK (agent dino-conseiller, 2026-09-05) : `dinos-data.js` cite « Giganotosaure et Mapusaurus qui l'attaquaient en meute » — **FAUX, cohabitation non confirmée**. Patagotitan (Formation Cerro Barcino, ~101,6 Ma) et Mapusaurus (Formation Huincul, ~96-94 Ma) sont séparés de 5 à 8 millions d'années, pas la même formation. → Fiche corrigée : aucun prédateur nommé, formulé par l'absence de traces de prédation (sa taille le protégeait). Signalé au rapport, chiffre data non modifié (hors périmètre).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.

## Titanosaure — Patagotitan mayorum

### BLOC A — Présentation

**NARRATEUR H** [excited] : Ti-ta-no-saure. [curious] « Titan », en grec, ce sont les Titans — des géants des vieilles histoires grecques, plus grands que tout.
**WEX** [curious] : Le lézard géant ?
**NARRATEUR H** [amazed] : Voilà. Et pas n'importe quel géant : [proud] l'un des plus grands animaux qui aient jamais marché sur la Terre. Il vivait en Argentine, [amazed] en Patagonie, il y a 100 millions d'années, [pauses] et une fois adulte, sa taille le protégeait des chasseurs comme le Tyrannotitan.

### BLOC B — Taille

**NARRATEUR H** [excited] : 31 mètres de long — [amazed] comme un bus accordéon et un bus, l'un derrière l'autre. Aux épaules, 6 mètres et demi de haut — [curious] aussi haut qu'un lampadaire. Et 57 mille kilos — [proud] aussi lourd que 19 hippopotames.
**WEX** [gasps] : Dix-neuf hippopotames.
**NARRATEUR H** [confident] : Oui. [whispers] Et les squelettes trouvés sont ceux de jeunes adultes : il pouvait encore grandir.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Herbivore, en troupeau. [calm] Il mangeait des feuilles tout en haut des arbres, avec son cou immense.
**WEX** [curious] : Il vivait avec beaucoup d'autres Titanosaures ?
**NARRATEUR H** [amazed] : On a retrouvé au moins 6 squelettes ensemble, [proud] en Patagonie, au sud de l'Argentine.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Ses os étaient si énormes qu'on en a sorti plus de cent cinquante [pauses] d'une seule carrière de Patagonie.
**WEX** [amazed] : Même les os, ils étaient géants.
**NARRATEUR H** [softly] : Son nom complet, c'est Patagotitan mayorum — [proud] le titan de Patagonie. [curious] Les savants se disputent encore : lui, ou son cousin l'Argentinosaure — qui était vraiment le plus grand ?

---

## Vérification avant livraison

- [x] 4 blocs A/B/C/D, ~1 550 caractères.
- [x] CORRECTION appliquée : aucun prédateur nommé faussement (Giganotosaure/Mapusaurus retirés, cohabitation infirmée par fact-check) ; remplacé par l'absence de marque de prédation, un fait fort et honnête.
- [x] Bloc B = sortie exacte des 3 fonctions.
- [x] Anti-doublon : 7 squelettes en C (groupe), nom complet + débat Argentinosaure en D (neuf).
- [x] Grep interdits : 0 match.

⚠️ **Signalé, non corrigé (hors périmètre lot)** : `dinos-data.js` champ `chasseurs`/`desc` de `patagotitan` affirme une cohabitation Giganotosaure/Mapusaurus non confirmée par le fact-check (formations séparées de 5-8 Ma). À corriger dans une future passe data.
