# NOTES — i18n pt-br des scripts audio (HO-013)

> Choix non évidents, échelles recalculées hors HO-010, entrées de lexique tranchées.
> Ownership : dossier `scripts-audio/pt-br/` uniquement. Format : `**NARRATEUR H**` / `**WEX**` / `### BLOC A-D` conservés tels quels (libellés machine, jamais traduits — piège vu côté ES : `NARRADOR H` casse le parser).

## Échelles recalculées (HO-010 : 85 champs FR modifiés le 2026-09-05, strings.json pas encore mis à jour dessus)

Le FR canon (`fr/V3/<id>.md`) prime sur `strings.json` pour ces champs. Recalcul fait à la main avec le
même repère que `strings.json` utilise ailleurs (cohérence de l'échelle pt-br déjà validée).

| id | champ | strings.json (périmé) | FR canon (nouveau) | pt-br recalculé |
|---|---|---|---|---|
| giganotosaurus | hauteur | 4 m → "da altura de um ônibus de dois andares" | 3,3 m → `_compHaut(3.3)` = "comme deux Papas l'un sur l'autre" | "que nem dois Papais um em cima do outro!" |
| ceratosaurus | poids | 0,7 t → "tão pesado quanto uma vaca" | 0,9 t → `_compPoids(0.9)` = "aussi lourd qu'une petite voiture" | "tão pesado quanto um carro pequeno!" |
| allosaurus | hauteur | 3,5 m → "que nem dois Papais um em cima do outro" | 4 m → `_compHaut(4)` = "aussi haut qu'un bus anglais à deux étages" | "da altura de um ônibus de dois andares!" |
| giganotosaurus | presa | "Argentinosaurus (o maior dino!)" | Andesaurus (contemporain confirmé, Argentinosaurus vivait 7 Ma plus tard) | "Andessauro" (traduction du nom, contemporain gardé) |
| carnotaurus | velocidade | champ absent de strings.json (nouveau `vitesse_kmh`) | 52 km/h → `_compVitesse(52)` = "aussi vite qu'une voiture en ville" | "que nem um carro na cidade" (repère déjà utilisé pour `gallimimus` dans strings.json — cohérence conservée) |

## Table de vitesse pt-br (champ nouveau, aucune référence pré-existante en pt-br)

`strings.json` n'a aucune table de comparaison de vitesse pt-br (le champ `vitesse_kmh` est postérieur à
la traduction initiale HO-006). Construite ici en miroir exact des paliers `_compVitesse` du FR, avec les
mêmes repères déjà utilisés ailleurs en pt-br (`cavalo a galope`, `carro na cidade` trouvés dans
`gallimimus`/`velociraptor`) :

| km/h (FR) | comparaison FR | pt-br retenu |
|---|---|---|
| < 5,5 | aussi vite que toi quand tu marches | que nem você quando anda |
| 5,5-8,5 | comme Papa qui marche vite | que nem o papai andando rápido |
| 8,5-12,5 | aussi vite qu'un enfant qui court | que nem uma criança correndo |
| 12,5-17,5 | comme un vélo qui roule tranquille | que nem andar de bicicleta tranquilo |
| 17,5-22,5 | aussi vite que Papa qui court | que nem o papai correndo |
| 22,5-27,5 | aussi vite qu'un vélo qui roule bien | que nem andar de bicicleta rápido |
| 27,5-32,5 | aussi vite qu'un cheval au petit galop | que nem um cavalo a meio galope |
| 32,5-40 | aussi vite qu'un chien qui court | que nem um cachorro correndo |
| 40-48 | aussi vite qu'un cheval au galop | que nem um cavalo a galope (déjà en strings.json) |
| 48-56 | aussi vite qu'une voiture en ville | que nem um carro na cidade (déjà en strings.json, `gallimimus`) |
| 56-66 | aussi vite qu'un lion qui charge | que nem um leão atacando |
| 66-85 | aussi vite qu'une autruche | tão rápido quanto um avestruz |
| ≥ 85 | presque aussi vite qu'un guépard | quase tão rápido quanto um guepardo |

Utilisée pour : tyrannosaurus (20), giganotosaurus (50), allosaurus (34), albertosaurus (30), ceratosaurus
(25), dilophosaurus (25), carnotaurus (52), baryonyx (22, nage), therizinosaurus (7).
Pas de `vitesse_kmh` dans les données → pas mentionnée : spinosaurus, carcharodontosaurus, tarbosaurus,
cryolophosaurus.

## Choix de localisation (théropodes, 13/13)

- « Papa » → « papai » partout, y compris dans les comparaisons chiffrées (« que nem o papai correndo »).
- « ! » supprimé chez Wex partout (registre imposé), remplacé par « ? » sur les questions.
- Noms de dinos : forme plate du lexique pt-br dé-tirettée dans le texte parlé (« Tiranossauro »,
  « Giganotossauro »…), syllabes détachées avec points de suspension SEULEMENT en bloc A
  (« Ti… ra… no… ssauro Rex »), jamais ailleurs.
- « Andesaurus » → « Andessauro » (même patron de francisation/portugalisation que les autres noms de
  saurópodes du lexique, cohérent avec « Amargassauro », « Apatossauro »…), bien qu'absent du lexique
  §2 (genre non couvert car pas un dino carnivore) — décision : appliquer la règle générale -saurus→-ssauro.
- carnotaurus bloc B : `[excited]` gardé sur la phrase de vitesse (au lieu de `[serious]` en FR) car le
  chiffre 52 km/h est un motif de fierté du texte (« champion de vitesse » en bloc D) — cohérent avec le
  ton déjà `[excited]` du reste du bloc B pt-br, léger réajustement de densité de tags (les autres blocs
  gardent `[serious]`/`[amazed]` comme le FR).

## Endroits où le FR canon semble fautif (signalés, non corrigés)

- **carnotaurus** : le champ texte `superpower`/`fait` de `dinos-data.js` (et donc de `strings.json`) dit
  encore « até 56/jusqu'à 56 km/h », alors que le champ structuré `vitesse_kmh` vaut 52. Déjà signalé par
  le brief FR (HO-011) comme hors périmètre — je le répercute ici : la même incohérence existe dans le
  texte pt-br hérité de `strings.json` (`superpower`), non touchée par ce chantier (fichier hors
  périmètre HO-013).
- **giganotosaurus** bloc A pt-br : « aussi grand qu'un immeuble » traduit ici « do tamanho de um prédio »
  pour l'Andesaurus — pas une comparaison chiffrée exacte (le FR dit aussi « aussi grand qu'un
  immeuble » sans plus de précision), gardé à l'identique, aucun souci d'échelle.

## Lexique de prononciation pt-br — relecture native (théropodes concernés)

Entrées « à relire natif » présentes dans le lexique pour les théropodes de ce lot : aucune parmi les 13
théropodes (toutes les entrées « à relire natif » du lexique concernent des dinos hors théropodes :
corythosaurus, edaphosaurus, gorgonops, hatzegopteryx, lystrosaurus, maiasaura, minmi, moschops,
saurolophus, scutellosaurus). Relecture complète du lexique faite en fin de chantier (58 dinos restants).
