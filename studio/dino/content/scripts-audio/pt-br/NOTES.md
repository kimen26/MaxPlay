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

## Lexique — arbitrages finaux (HO-013, 2026-09-05)

Les 10 entrées ci-dessus, tranchées à l'oreille native BR. Flag « à relire natif » retiré de la table
`i18n/lexiques-prononciation/pt-br.md` §2 pour chacune. Une ligne de raison par id :

- **corythosaurus** → `Co-ri-to-SSAU-ro` (Coritossauro). Confirmé tel quel : th→t et y→i sont déjà la
  norme du lexique (ichthyosaurus, ankylosaurus), le respelling sonne comme la forme vernaculaire BR
  attendue. Correspond au flat form déjà utilisé dans `corythosaurus.md` (« Coritossauro »).
- **edaphosaurus** → `E-da-fo-SSAU-ro` (Edafossauro). Confirmé tel quel : ph→f est la règle constante du
  lexique (dilophosaurus, ophthalmosaurus). Correspond au flat form du script (« Edafossauro »).
- **gorgonops** → corrigé de `Gor-go-NOPS` à **`Gor-go-NOP-se`**. Un locuteur BR ne dit jamais la
  terminaison grecque brute « -ops » pour ce genre précis : le terme déjà établi en paléonto BR est
  « Gorgonopse » (avec -e final, comme dans « gorgonopsídeo »). Le script audio (`gorgonops.md`) utilise
  déjà « Gorgonopse » deux fois — le lexique était en décalage avec sa propre production, corrigé pour
  matcher.
- **hatzegopteryx** → `A-tse-gop-TÉ-riks` confirmé tel quel pour la colonne TTS (guide phonétique pur :
  h muet, tz→ts, x→ks). Le flat form du script (« Hatzegoptérix », avec x et h) est volontairement
  différent — même écart que pour archaeopteryx/« Arqueópterix » déjà dans la table §2 : la colonne TTS
  encode le SON, le flat form du script garde une graphie lisible proche du grec. Pas une incohérence,
  c'est la convention du fichier (voir préambule §0).
- **lystrosaurus** → `Lis-tro-SSAU-ro` (Listrossauro). Confirmé tel quel : y→i est la règle constante
  (baryonyx, pachycephalosaurus). Correspond au flat form du script (« Listrossauro »).
- **maiasaura** → `Maia-SSAU-ra` (Maiassaura). Confirmé tel quel : le -a féminin de « -saura » suit le
  même patron que le masculin « -sauro » de toute la table, « ai » diphtongué naturel en BR. Correspond
  au flat form du script (« Maiassaura »).
- **minmi** → `MIN-mi` confirmé tel quel : nom de lieu australien (Minmi Crossing), aucune racine
  grecque à respeller, tonique sur la première syllabe naturelle pour un mot de 2 syllabes en portugais.
  Correspond au flat form du script (« Minmi »).
- **moschops** → corrigé de `Mos-KOPS` à **`Mos-COPS`**. Le « k » latin est une béquille inutile en
  BR : « sc » devant une voyelle arrière (o) se lit déjà « sk » nativement (cf. « escola », « escova »),
  pas besoin de forcer un k. Le script audio (`moschops.md`) utilise déjà « Moscops » trois fois — même
  décalage que gorgonops, corrigé pour matcher.
- **saurolophus** → `Sau-RÓ-lo-fus` (Saurolofo) confirmé tel quel : cohérent avec parasaurolophus déjà
  dans la table (`Pa-ra-sau-RÓ-lo-fus`), le piège oral « pas de para- » est déjà noté en clair dans la
  ligne. Correspond au flat form du script (« Saurolofo »).
- **scutellosaurus** → `Es-cu-te-lo-SSAU-ro` (Escutelossauro) confirmé tel quel : Sc- initial → « Es- »
  est la règle constante du lexique (spinosaurus, stegosaurus), ll→l déjà appliqué ailleurs. Correspond
  au flat form du script (« Escutelossauro »).

Les 2 corrections (gorgonops, moschops) ont été rejouées via
`node studio/dino/content/scripts/export/_verif-scripts-audio.cjs pt-br gorgonops` et
`... moschops` après édition — porte au vert, aucune graphie du script à modifier (les scripts avaient
déjà la bonne forme, seul le lexique était en retard).
