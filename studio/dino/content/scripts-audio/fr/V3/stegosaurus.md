# Stégosaure — Script audio (Narrateur H + Wex)

> Thyréophore à plaques (famille `arme`), Jurassique · 155 millions d'années · Amérique du Nord, Europe.
> Chiffres data (`dinos-data.js` id `stegosaurus`) : 9 m long · 2,8 m haut · 4 t · vitesse 7 km/h. Sorties EXACTES exécutées node : `_compLong(9)` = « aussi long qu'un camion ! » · `_compHaut(2.8)` = « aussi haut qu'un panier de basket ! » · `_compPoids(4)` = « aussi lourd que 2 rhinocéros ! » · `_compVitesse(7)` = « comme Papa qui marche vite ! ».
> Étymologie (`_ETYMO-RACINES-50.md`) : *stégo-/stegos* (grec) = toit + *-saurus/-saure* = lézard → « le lézard à toit » (le savant croyait ses plaques couchées à plat comme des tuiles ; on sait aujourd'hui qu'elles étaient dressées). Nom lu tel quel.
> Fact-check Grokipedia (agent dino-conseiller, 2026-09-05) : Formation Morrison, prédateur principal Allosaure. Thagomizer confirmé à 4 piques caudales. *S. stenops* = espèce la mieux connue ; *S. ungulatus* (nom data) reste une espèce valide distincte, pas un synonyme obsolète.
> Vignette registre `_SCENES-VIGNETTES.md` : motif « jamais attaquer par derrière » — **Kéntrosaure garde ce motif** (fiche kentrosaurus.md) ; Stégosaure trouve une autre image (queue = arme visée, pas motif « par derrière ») pour ne pas dupliquer.
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.

## Stégosaure — Stegosaurus ungulatus

### BLOC A — Présentation

**NARRATEUR H** [excited] : Sté-go-saure. [curious] En grec, « stégo », ça veut dire le toit.
**WEX** [curious] : Le lézard à toit ?
**NARRATEUR H** [happily] : Oui — le savant qui l'a trouvé croyait que ses grandes plaques étaient couchées à plat sur le dos, [amazed] comme les tuiles d'un toit. [calm] Il vivait en Amérique du Nord et en Europe, il y a 155 millions d'années.
**WEX** [curious] : Et elles étaient couchées, ses plaques ?
**NARRATEUR H** [confident] : Non ! [pauses] On a découvert plus tard qu'elles étaient dressées bien droites, sur toute la longueur du dos.

### BLOC B — Taille

**NARRATEUR H** [excited] : 9 mètres de long — [amazed] aussi long qu'un camion. Debout, 2 virgule 8 mètres de haut — [curious] aussi haut qu'un panier de basket. Et 4 mille kilos — [proud] aussi lourd que 2 rhinocéros. [calm] Il marchait tranquille : 7 kilomètres à l'heure, [pauses] comme Papa qui marche vite.
**WEX** [gasps] : Il n'était pas très rapide, alors.
**NARRATEUR H** [confident] : Non — [serious] il n'en avait pas besoin. Sa queue faisait le travail.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Herbivore, peut-être en petit groupe. [calm] Ses grandes plaques colorées servaient sans doute de radiateur, [pauses] pour se réchauffer ou se refroidir.
**WEX** [curious] : Et pour se défendre ?
**NARRATEUR H** [confident] : Sa queue avait 4 longues piques au bout. [serious] L'Allosaure devait faire très attention en s'approchant.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Son cerveau était minuscule — [pauses] à peu près la taille d'une noix, pour un animal aussi grand.
**WEX** [amazed] : Une si petite tête pour un si gros corps.
**NARRATEUR H** [softly] : Oui, mais sa queue à piques, elle, visait juste — [proud] elle pouvait percer la peau d'un Allosaure imprudent.

---

## Vérification avant livraison

- [x] 4 blocs A/B/C/D, ~1 650 caractères.
- [x] Bloc B = sortie exacte des 3 fonctions + vitesse dite avec `_compVitesse(7)`.
- [x] Motif « jamais attaquer par derrière » NON repris ici (réservé Kéntrosaure) — remplacé par « visait juste » (piques comme arme précise).
- [x] Grep interdits : 0 match.
