# Kéntrosaure — Script audio (Narrateur H + Wex)

> Thyréophore à piques (famille `arme`), Jurassique · 155 millions d'années · Afrique (Tanzanie, Formation Tendaguru).
> Chiffres data (`dinos-data.js` id `kentrosaurus`) : 4,5 m long · 1,8 m haut · 1,1 t · vitesse 7 km/h. Sorties EXACTES exécutées node : `_compLong(4.5)` = « aussi long qu'un grand 4×4 ! » · `_compHaut(1.8)` = « aussi grand que Papa debout ! » · `_compPoids(1.1)` = « aussi lourd qu'une petite voiture ! » (corrigé — poids_t = 1.1, jamais 1.2, pour rester dans la tolérance des 10 % au repère petite voiture ~1 t) · `_compVitesse(7)` = « comme Papa qui marche vite ! ».
> Étymologie (`_ETYMO-RACINES-50.md`) : *kentro-/kentron* (grec) = pointe, aiguillon + *-saurus/-saure* = lézard → « le lézard à pointes ». Nom lu tel quel.
> Fact-check Grokipedia (agent dino-conseiller, 2026-09-05) : **CONFIRMÉ contemporain de Giraffatitan** (le sauropode africain, cousin du Brachiosaure), même faune de Tendaguru, ~155-150 Ma. Piques confirmées sur le milieu du dos, les hanches et la queue (jusqu'à 70 cm sur la queue) — position d'une paire avant du corps DISPUTÉE (épaules ou hanches selon les auteurs) → formulée prudemment, pas d'affirmation catégorique « épaules ».
> Vignette registre `_SCENES-VIGNETTES.md` : motif « jamais attaquer par derrière » — **Kéntrosaure GARDE ce motif** (Stégosaure trouve une autre image, cf. stegosaurus.md).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.

## Kéntrosaure — Kentrosaurus aethiopicus

### BLOC A — Présentation

**NARRATEUR H** [excited] : Kén-tro-saure. [curious] En grec, « kentron », ça veut dire une pointe, un aiguillon qui pique.
**WEX** [curious] : Le lézard à pointes ?
**NARRATEUR H** [happily] : Voilà — il en avait partout sur le dos. [calm] Il vivait en Afrique, en Tanzanie, il y a 155 millions d'années.
**WEX** [curious] : Il connaissait le Brachiosaure, alors ?
**NARRATEUR H** [amazed] : Son cousin africain, le Giraffatitan, [proud] vivait exactement dans le même coin, à la même époque.

### BLOC B — Taille

**NARRATEUR H** [excited] : 4 virgule 5 mètres de long — [amazed] aussi long qu'un grand 4×4. Debout, 1 virgule 8 mètres de haut — [curious] aussi grand que Papa debout. Et 1 virgule 1 tonne — [proud] aussi lourd qu'une petite voiture. [calm] Il marchait tranquille : 7 kilomètres à l'heure, [pauses] comme Papa qui marche vite.
**WEX** [gasps] : Aussi grand que Papa.
**NARRATEUR H** [confident] : Oui — [playful] mais bien plus piquant que lui.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Herbivore, peut-être en troupeau. [amazed] Des piques sur le milieu du dos, sur les hanches, [pauses] et jusqu'à 70 centimètres sur la queue.
**WEX** [curious] : Et les carnivores osaient s'approcher ?
**NARRATEUR H** [confident] : Par devant, peut-être. [serious] Mais jamais par derrière : sa queue à piques frappait trop fort.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Le Kéntrosaure avait encore plus de piques que son cousin le Stégosaure — [pauses] jusque sur les hanches.
**WEX** [amazed] : Le plus piquant de la famille.
**NARRATEUR H** [softly] : Exactement. [proud] Un petit dinosaure, mais une vraie forêt d'épines à ne surtout pas approcher par derrière.

---

## Vérification avant livraison

- [x] 4 blocs A/B/C/D, ~1 700 caractères.
- [x] poids_t = 1.1 (confirmé data + correction orchestrateur) → `_compPoids(1.1)` = petite voiture, tolérance respectée.
- [x] Bloc B = sortie exacte des 3 fonctions + vitesse dite avec `_compVitesse(7)`.
- [x] Cohabitation Giraffatitan/Tendaguru fact-checkée et confirmée.
- [x] Position piques formulée prudemment (dos/hanches/queue confirmés, pas d'affirmation catégorique sur une paire avant disputée).
- [x] Motif « jamais attaquer par derrière » conservé ici (propriétaire), retiré de Stégosaure.
- [x] Grep interdits : 0 match.
