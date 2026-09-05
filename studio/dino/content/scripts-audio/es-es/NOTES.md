# NOTES — Scripts audio ES-ES (HO-013)

> Choix de traduction/localisation non évidents, écarts corrigés par rapport à `i18n/es-es/strings.json` (le FR canon `fr/V3/<id>.md` prime toujours), et endroits où le FR canon semble discutable.

## Corrections apportées à strings.json (le fichier n'est PAS modifié — hors périmètre HO-013 ; ces divergences sont documentées ici pour une future passe i18n)

Les 85 champs modifiés par HO-010 (`docs/handoffs/rapports/HO-010-champs-modifies.json`) n'avaient pas encore été recroisés dans `strings.json`. Pour chaque dino où le script ES devait s'écarter de `strings.json`, l'échelle a été recalculée avec le même style de comparaison que `strings.json` utilise déjà ailleurs (jamais une comparaison inventée hors registre existant) :

- **giganotosaurus** : `comp_hauteur` périmé ("autobús de dos pisos", ancien 4 m) → "como dos papás uno encima del otro" (3,3 m). `proies` périmé (Argentinosaurus, non contemporain) → Andesaurus.
- **allosaurus** : `comp_hauteur` périmé ("como dos papás uno encima del otro", ancien 3,5 m) → "tan alto como un autobús de dos pisos" (4 m). Swap exact inverse de giganotosaurus — piège classique de confusion entre les deux fiches.
- **ceratosaurus** : `comp_poids` périmé ("vaca", 0,7 t) → "un coche pequeño" (0,9 t). `region` périmé (Norteamérica, África) → Norteamérica (y quizá Europa, en Portugal).
- **baryonyx** : `region` incomplet (Inglaterra seule) → Inglaterra, España, Portugal.
- **brachiosaurus** : `region`/`continent` faux (incluait África) → Norteamérica seule (Giraffatitan africain = genre distinct, Taylor 2009).
- **plateosaurus** : `region` imprécis ("Europa" seule) → Alemania, Francia, Suiza.
- **patagotitan** : `chasseurs`/`fait`/`desc` affirment une cohabitation Giganotosaurio/Mapusaurio FAUSSE (formations séparées de 5-8 Ma) → aucun prédateur nommé, absence de marques de morsure dite comme fait fort.
- **edmontonia** : `comp_hauteur` périmé (1,5 m) → "tan alto como una puerta" (2 m).
- **scelidosaurus** : `chasseurs` cite "Dracoraptor" (anachronisme, écart 5-7 Ma) → chasseurs anonymes non nommés.
- **centrosaurus** : `comp_poids` périmé ("5 caballos", 2,5 t) → "un rinoceronte" (1,8 t).
- **pentaceratops** : `fait` périmé ("más de 2 metros") → "más de 3 metros" (crâne).
- **pachycephalosaurus** : `fait` présente les coups de tête comme un FAIT établi → reformulé en hypothèse ("los científicos creen que").
- **protoceratops** : `comp_hauteur` périmé ("culete", 0,6 m) → "al ombligo" (0,75 m).
- **ophthalmosaurus** : `epoque` périmée (160 Ma) → 150 Ma.
- **ichthyosaurus** : `chasseurs` cite "Liopleurodon" (anachronisme, 30-40 Ma d'écart) → "los grandes pliosaurios de su época, como el Rhomaleosaurio".
- **archelon** : `comp_taille`/`fait` périmés (4,6 m, mention "Brigitta") → 4 m, sans Brigitta.
- **shonisaurus** : `chasseurs` cite "Cymbospondylus" (anachronisme) → aucun prédateur adulte connu.
- **lystrosaurus** : `region` incomplet (4 lieux) → 6 lieux (+ Rusia, Mongolia).
- **smilodon** : `comp_poids` périmé ("tigre", 0,25 t) → "un león" (0,22 t).
- **glyptodon** : `comp_taille` périmé ("coche pequeño", 3,3 m) → "tres niños de 4 años" (3 m).
- **coelodonta** : `epoque`/`comp_hauteur`/`comp_poids` périmés (100 000 años, 1,9 m, 2,5 t) → 50 000 años, 1,5 m, 1,75 t.
- **titanis** : `comp_poids` périmé ("2 burros", 0,3 t) → "un asno" (0,15 kg).
- **mammuthus** : `chasseurs` cite "leones de las cavernas" en plus des humains (non sourcé) → hommes préhistoriques seuls.

## 5 choix de localisation les plus discutables

1. **Vitesse — repères ES** : le brief demandait de garder le km/h et de localiser le comparateur (`papá corriendo`, `una bici`, `un caballo al galope/trote`, `un coche en la ciudad`, `un guepardo`). Choix retenu : mapping direct sur l'équivalent FR sans réinventer — "aussi vite qu'un chien qui court" → "un perro corriendo", "aussi vite qu'un cheval au petit galop" → "un caballo al trote" (trote = galop lent en espagnol, plus juste que "medio galope"). Discutable : "trote" est objectivement plus lent qu'un vrai petit galop, léger arrondi pédagogique assumé.
2. **Quetzalcoatlus/Hatzegopteryx — "casi tan rápido como un guepardo"** : le FR dit "presque aussi vite qu'un guépard", repère culturellement neutre gardé tel quel (le guépard est aussi connu en Espagne qu'en France) plutôt que d'inventer un repère "typiquement espagnol".
3. **Noms de dinos en bloc A — syllabation** : le lexique ES marque la syllabe tonique en MAJUSCULES (ex. `Ti-ra-no-SAU-rio`). Choix : appliqué partout en bloc A avec points de suspension entre syllabes (`Ti… ra… no… SAU… rio`), conforme à la consigne "points de suspension, pas de tirets". Génère des avertissements CAPS bénins sur mot court (SAU, CE, LO, TE...) — laissés tels quels, c'est la convention voulue du lexique, pas une erreur.
4. **"Papá" pour "Papa"** : appliqué systématiquement (papá corriendo, papá de pie, papá caminando rápido, papá tumbado...) — jamais "padre", registre familier enfant conservé partout, y compris dans les comparaisons héritées de strings.json qui utilisaient déjà "papá".
5. **Ceratosaurus bloc B — comparaison de largeur de rue** : `strings.json` dit "tan largo como de ancho una calle de doble sentido, cortaba el paso" (calque direct du FR "aussi long qu'une rue à deux voies est large — il barrait la route"). Gardé tel quel malgré sa lourdeur syntaxique car déjà validé/relu dans strings.json — un auteur natif l'aurait sans doute raccourci, mais la consigne demande de reprendre `comp_*` mot pour mot.

## Endroits où le FR canon semble fautif (signalés, non corrigés — hors périmètre)

- **patagotitan** : le FR canon signale déjà lui-même (dans son en-tête) que `dinos-data.js` garde la cohabitation Giganotosaurio/Mapusaurio non confirmée — le script ES suit le FR (corrigé), mais `dinos-data.js` lui-même reste à corriger dans une future passe (hors HO-013).
- **carnotaurus** : le FR signale un écart entre le champ texte `superpower`/`fait` (56 km/h) et le champ structuré `vitesse_kmh` (52). Le script ES suit le FR (52 km/h), l'écart dans `dinos-data.js` reste non corrigé.
- **ceratosaurus** bloc B : la comparaison de largeur de rue ("aussi long qu'une rue à deux voies est large") est une tournure francophone (rue à double sens = concept d'urbanisme français) qui reste un peu abstraite pour un enfant de 4 ans, FR comme ES — signalé, non retouché car hors périmètre de changer `comp_*`.

## Lexique de prononciation ES

Voir section relecture ci-dessous — toutes les entrées "à validar por un nativo" ont été tranchées dans `i18n/lexiques-prononciation/es.md`.
