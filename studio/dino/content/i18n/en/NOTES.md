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

## Recroisement HO-010 (2026-09-05) — I18N-STRINGS-RECROISER

Le canon FR (`site/js/dinos-data.js`) a change sur 89 champs le 2026-09-05 (audit HO-009/010,
rapport `studio/dino/docs/handoffs/rapports/HO-010-champs-modifies.json`). 45 de ces champs
sont TEXTE/comparaison (les autres sont `vitesse_kmh`, un champ numerique nouveau, hors
perimetre ici). `strings.json` datait d'avant HO-010 et disait encore l'ancien contenu sur
ces 45 champs — corrige un a un, en reutilisant en priorite la formulation deja ecrite par
le traducteur EN dans `content/scripts-audio/en/<id>.md` (deja localisee, memes reperes
d'echelle valides) plutot que de re-traduire a la main.

Champs mis a jour (id · champ · logique du fix) :

| id | champ | fix |
|---|---|---|
| spinosaurus | fait | "could stand 7 feet tall" -> "could stand almost 7 feet tall" (FR ajoute "près de") |
| giganotosaurus | comp_hauteur | bucket redescendu (hauteur_m 4->3.3m) : "double-decker bus" -> "two Dads standing on each other's shoulders" |
| giganotosaurus | proies | Argentinosaurus (anachronisme retire) -> Andesaurus |
| allosaurus | comp_hauteur | bucket remonte (hauteur_m 3.5->4m) : "two Dads..." -> "double-decker bus" |
| allosaurus | continent | "North America" -> "North America / Europe" |
| ceratosaurus | region | ajout hedge Portugal : "North America (and maybe Europe, in Portugal)" |
| ceratosaurus | comp_poids | bucket remonte (poids_t 0.7->0.9t) : "as heavy as a cow!" -> "as heavy as a small car!" |
| carnotaurus | superpower | vitesse structuree (52 km/h, pas le 56 du texte FR) : "up to 35 mph" -> "up to 32 miles an hour, as fast as a car in the city!" |
| brachiosaurus | region | ajout etats : "North America (Colorado, Wyoming, Utah)" |
| diplodocus | fait | claim "sonic boom" adouci en hypothese scientifique hedgee ("scientists think... as loud as thunder") |
| amargasaurus | region | ajout pays : "South America (Argentina)" |
| plateosaurus | region | ajout pays : "Europe (Germany, France, Switzerland)" |
| euoplocephalus | region | "Canada" -> "Alberta, Canada" |
| edmontonia | comp_hauteur | bucket remonte (hauteur_m 1.5->2m) : "car — look up!" -> "as tall as a door!" |
| scelidosaurus | chasseurs | Dracoraptor retire (anachronisme) -> "small two-legged hunters" generique |
| kentrosaurus | comp_hauteur | bucket remonte (hauteur_m 1.5->1.8m) : "car — look up!" -> "as tall as Dad standing up!" |
| pachycephalosaurus | fait | claim tete-a-tete affirmee -> hedgee ("scientists think it may have...") |
| utahraptor | comp_poids | bucket redescendu (poids_t 0.5->0.425t) : "as heavy as a horse!" -> "as heavy as 2 lions!" |
| gallimimus | superpower, fait | vitesse re-auditee 70->50 km/h (mythe corrige) : "45 mph" -> "31 miles an hour, as fast as a car in the city" |
| archaeopteryx | desc | "ancestor of all birds" (perime) -> "one of the very first birds... today's birds are its cousins" |
| mosasaurus | continent | "Europe" -> "" (FR vidé, aucun continent unique pertinent pour un animal pan-oceanique) |
| baryonyx | region | ajout pays : "Europe (England, Spain, Portugal)" |
| lystrosaurus | region | ajout pays : "..., Russia, Mongolia" |
| ophthalmosaurus | epoque | "160 million years ago" -> "150 million years ago" |
| archelon | comp_taille | bucket redescendu (taille_m 4.6->4m, figure "Brigitta" retiree) : "big SUV" -> "small car" |
| archelon | fait | anecdote "Brigitta" retiree -> carapace en cuir + vitesse de nage (repris du `desc`) |
| shonisaurus | chasseurs | Cymbospondylus retire (anachronisme) -> "no known predator once grown" |
| patagotitan | chasseurs, desc | Giganotosaurus/Mapusaurus en meute retire (non contemporains) -> absence de traces de morsure |
| centrosaurus | comp_poids | bucket redescendu (poids_t 2.5->1.8t) : "5 horses" -> "a rhino" |
| ichthyosaurus | chasseurs | Liopleurodon retire (anachronisme, 30-40 Ma d'ecart) -> Rhomaleosaurus |
| mammuthus | chasseurs | "cave lions" (non sourcé) retire -> humains prehistoriques seuls |
| smilodon | comp_poids | bucket redescendu (poids_t 0.25->0.22t) : "as heavy as a tiger!" -> "as heavy as a lion!" |
| megatherium | fait | precision "sur ses pattes arrière" ajoutee (pas de nouveau chiffre : le "4 metres" vu dans une version intermediaire du rapport HO-010 n'est plus dans le FR deploye au moment du fix — verifie contre `dinos-data.js` directement) |
| paraceratherium | region | ajout pays : "Asia (Pakistan, China, Mongolia)" |
| glyptodon | comp_taille | bucket redescendu (taille_m 3.3->3m) : "small car" -> "three 4-year-olds lying end to end" |
| glyptodon | fait | massue caudale ré-attribuee au cousin Doedicurus, pas a Glyptodon lui-meme |
| coelodonta | epoque | "100,000 years ago" -> "50,000 years ago" |
| coelodonta | comp_hauteur | bucket redescendu (hauteur_m 1.9->1.5m) : "front door" -> "car — look up!" |
| coelodonta | comp_poids | bucket redescendu (poids_t 2.5->1.75t) : "5 horses" -> "small car and a cow put together" |
| titanis | comp_poids | bucket redescendu (poids_t 0.3->0.15t) : "2 donkeys" -> "a donkey" |

Pentaceratops.region ("United States") et pentaceratops.fait, triceratops.fait, protoceratops.comp_hauteur
verifies deja a jour (pas de fix necessaire — la formulation existante correspondait deja au FR post-HO-010,
confirme contre les scripts audio EN correspondants).

Portes : `node -e "JSON.parse(...)"` -> JSON valide. `node .../\_check-traduction.cjs en` -> 0 erreurs,
4 avertissements (therizinosaurus x3 + smilodon.fait, pattern deja documente ci-dessus, non lies a ce fix).
