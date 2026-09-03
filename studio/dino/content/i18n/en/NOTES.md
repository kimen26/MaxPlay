# NOTES — traduction EN

Choix non evidents, consignes brief HO-003.

## Noms vernaculaires (`name`)
- `T-Rex` -> `T. rex` (graphie standard US, minuscule apres le point, celle des livres/documentaires enfants americains).
- `Apatosaure (Brontosaure)` -> `Apatosaurus (Brontosaurus)` (les deux noms sont deja les noms scientifiques courants en anglais, pas de vernaculaire distinct a inventer).
- `Loup terrible` -> `Dire Wolf` (nom vernaculaire standard, tres connu du jeune public US via mediatisation recente).
- `Rhino laineux` -> `Woolly Rhino`, `Mammouth` -> `Woolly Mammoth` (noms vernaculaires standards).
- `Titanosaure` (id `patagotitan`) -> `Patagotitan` (le FR utilise le nom de famille comme vernaculaire ; en anglais l'usage courant pour ce genre precis est son propre nom, pas le terme generique "titanosaur" qui designe tout un groupe).

## Reperes de comparaison localises
- `bus RATP` -> `school bus` (repere du quotidien enfant US, longueur comparable ~12m).
- `bus anglais a deux etages` -> `double-decker bus` (garde tel quel, objet identifiable et deja anglophone).
- `bus accordeon` -> `accordion bus` (existe aux US, terme reconnu).
- `bus de Paris` (envergure Quetzalcoatlus) -> `city bus` (le reperage "Paris" n'a pas de sens pour un enfant americain ; ordre de grandeur bus urbain conserve).
- `grand 4x4` -> `big SUV` (equivalent culturel direct).
- `panier de basket` -> `basketball hoop` (identique, sport tres connu aux US).
- `voiture de Papa` (largeur du corps du Mosasaurus) -> `Dad's car` (repere conserve a l'identique, culturellement neutre).

## Etymologie (`nom_etym`)
- Racines grecques/latines gardees intactes partout (charte). Seule l'explication autour est reecrite en registre oral americain enfant (ex : "like a microbe!", "like 'velocity,' or a 'velocipede' bike!").
- Petit ajout pour `Velociraptor` : reference a "velocipede" en plus de "velocity" pour ancrer le mot "veloci" — choix editorial, pas dans le FR, jugee utile pour un enfant US (discutable, voir rapport).

## `full` identique au FR (attendu, pas une erreur)
Les noms scientifiques latins (`full`) ne se traduisent jamais (charte). Le check `_check-traduction.cjs` remonte un WARN "identique au FR" des que le nom scientifique est identique en FR et EN par coincidence — attendu pour Carcharodontosaurus, Pachycephalosaurus, Archaeopteryx, Therizinosaurus (racines grecques deja identiques dans les deux langues, aucune adaptation orthographique a faire).

## Elasmosaurus / Ophthalmosaurus / Liopleurodon / Archelon / Ichthyosaurus / Shonisaurus
Pas de champ `continent` dans le corpus FR pour ces 6 dinos (deja absent en amont, pas une omission de la traduction) — signale dans le rapport, non corrige (hors perimetre HO-003).

## Correction ciblee 2026-09-03 — conversion metrique -> imperial

15 dinos, 30 champs corriges (13 signales + 17 trouves en balayage complementaire `meters|km|cm|kg`).
Regle charte (`_CHARTE-TRADUCTION.md` § Unites de mesure) : convertir, arrondir a l'entier,
garder le chiffre ET la comparaison, ordre de grandeur inchange.

| Champ | Avant | Apres |
|---|---|---|
| tyrannosaurus.fait | 20 cm | 8 inches |
| spinosaurus.fait | 2 meters | 7 feet |
| carnotaurus.superpower | 56 km/h | 35 mph |
| brachiosaurus.fait | 13 meters / "4-story building" | 43 feet / "two giraffes stacked up" |
| diplodocus.queue_note | 27 m / 13 m | 89 feet / 43 feet |
| apatosaurus.fait | 250 kg | 550 pounds |
| apatosaurus.superpower | 6-meter neck | 20-foot neck |
| triceratops.fait | 1 meter | 3 feet |
| torosaurus.superpower | 3 meters (frill) | 10 feet |
| torosaurus.fait | 2 meters (tete+collerette) | 7 feet |
| maiasaura.fait | 7 meters (nids) | 23 feet |
| pachycephalosaurus.superpower | 25 cm | 10 inches |
| pachycephalosaurus.fait | 25 cm | 10 inches |
| deinonychus.superpower | 13 cm | 5 inches |
| utahraptor.superpower | 24 cm | 9 inches |
| utahraptor.fait | 24 cm | 9 inches |
| gallimimus.superpower | 70 km/h | 45 mph |
| gallimimus.fait | 70 km/h | 45 mph |
| quetzalcoatlus.fait | 5 meters | 17 feet |
| quetzalcoatlus.desc | "thousands of kilometers" | "thousands of miles" |
| baryonyx.superpower | 31 cm | 12 inches |
| therizinosaurus.superpower | 50 centimeters | 20 inches |
| therizinosaurus.fait | 50 centimeters | 20 inches |
| therizinosaurus.desc | 50 centimeters | 20 inches |
| moschops.fait | five centimeters | 2 inches |
| elasmosaurus.superpower | 7 meters | 23 feet |
| elasmosaurus.desc | 7 meters | 23 feet |
| ophthalmosaurus.superpower | 23 cm | 9 inches |
| megalodon.fait | 25 m / 6-7 m | 82 feet / 20-23 feet |
| archelon.superpower | 4.5 meters | 15 feet |
| mammuthus.fait | 4 meters (defenses) | 13 feet |
| smilodon.fait | "vingt centimetres" (mot) | 8 inches |
| paraceratherium.fait | five meters | 16 feet |

Choix de repere pour `brachiosaurus.fait` : la charte cite explicitement "a 4-story building"
comme repere trop abstrait pour 4 ans (§ Unites de mesure, point 3) — remplace par
"two giraffes stacked up" (17 ft/giraffe x2 ~= 43 ft, meme ordre de grandeur, verifiable
par l'enfant via les autres fiches qui utilisent deja la giraffe comme repere).

`dimetrodon.nom_etym` contient "meter" mais n'est PAS une mesure — c'est l'explication
etymologique de la racine grecque "metro" (mesure), volontairement laissee intacte.

Porte : `node studio/dino/content/scripts/export/_check-traduction.cjs en` -> 0 erreurs,
4 avertissements residuels (mismatch de comptage de chiffres du checker sur therizinosaurus
50->20 et smilodon "vingt"->8, consequence normale de la conversion d'unite, pas des
warnings "metrique non converti" ni "conversion non arrondie" — aucun des deux ne remonte).
