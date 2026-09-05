# NOTES — traducción es-es (HO-004)

## Avisos del checker justificados (9, 0 errores)

- **4 × `full` idéntico al FR** (`carcharodontosaurus`, `pachycephalosaurus`, `archaeopteryx`,
  `therizinosaurus`) : el nombre científico latino no se traduce (charte, tabla "ce qui ne se
  traduit jamais"). Estos 4 nombres son idénticos en latín y en francés, por eso el checker
  los marca — no falta traducción, es la norma.
- **5 × "chiffres FR [4,4] vs []" en `comp_taille`** (`kentrosaurus`, `pachycephalosaurus`,
  `archelon`, `centrosaurus`, `mammuthus`) : el FR dice «aussi long qu'un grand 4×4 !», donde
  "4×4" es el nombre del vehículo todoterreno, no una medida de escala. El checker cuenta "4"
  y "4" como dos cifras separadas por el símbolo ×. Traducido como «tan largo como un
  todoterreno grande», que es la forma natural en español de España — no hay orden de magnitud
  que preservar aquí, es un referente cultural (el vehículo), no una cifra.

## Elecciones de traducción discutibles (5)

1. **"bus RATP" / "bus anglais à deux étages" / "bus accordéon" → "autobús urbano" /
   "autobús de dos pisos" / "autobús articulado"**. RATP es una referencia parisina que un
   niño español no reconoce; en España el autobús urbano de dos pisos es menos común que en
   Londres, pero "autobús de dos pisos" es una imagen clara y reconocible igualmente (fotos,
   dibujos, Londres es un referente turístico habitual). Mantengo el orden de magnitud
   (longitud/altura de un autobús real).
2. **"comme deux Papas l'un sur l'autre" → "como dos papás uno encima del otro"**: mantenido
   literal, es una imagen concreta y corporal muy eficaz para un niño de 4 años, funciona
   igual en español.
3. **Ceratosaurus / Euoplocephalus / Edmontonia `comp_taille`: "aussi long qu'une rue à deux
   voies est large" → "tan largo como ancha es una calle de doble sentido"**: traducción
   literal de la comparación de anchura de calle (no de longitud de calle), conservando el
   matiz "cortaba el paso" que explica visualmente la comparación al niño.
4. **Nombres vernáculos con /-io/ sistemático** (Alosaurio, Ceratosaurio, Coritosaurio,
   Saurolofo...): sigo el uso real de libros y documentales infantiles en español de España
   (ej. "Braquiosaurio", no "Braquiosauro"), coherente con Tiranosaurio/Triceratops/Velociraptor
   ya asentados en el habla infantil española.
5. **"Titanosaure" (family/dino) → "Titanosaurio"** para `patagotitan`, cuyo `full` real es
   "Patagotitan mayorum": el FR usa el nombre común "Titanosaure" en vez del nombre científico
   exacto en varios campos de texto (`nom_etym` explica "Titanosaurus" en vez de "Patagotitan").
   Mantengo la misma convención que el FR (nombre común popular en el cuerpo del texto),
   coherente con la fuente, ver anomalía más abajo.

## Anomalías del FR canon detectadas (NO corregidas, señalo al orquestador)

- **`patagotitan`**: el campo `full` dice "Patagotitan mayorum" (correcto), pero `name`,
  `nom_etym` y `desc` hablan todos de "Titanosaure"/"Titanosaurus", que es el nombre de un
  grupo/clado, no el nombre vernáculo específico de esta especie. Es una mezcla nombre de
  grupo ↔ nombre de especie ya presente en el FR canon. La traducción reproduce la misma
  mezcla para no divergir del canon (regla: no corregir aquí).
- **`elasmosaurus`, `ophthalmosaurus`, `liopleurodon`, `archelon`, `shonisaurus`**: estos 5
  dinos no tienen el campo `continent` en el corpus FR (a diferencia de los otros 66), aunque
  sí lo tienen `region`. Reproducido igual (mismos campos que el corpus, ni uno más ni uno
  menos) — probablemente un olvido de captura en el FR, no corregido.
- **`smilodon`, `aenocyon` `continent`: "Amériques"** (con -s) mientras la mayoría de los
  demás usan singulares regionales ("Amérique du Nord", etc.) — inconsistencia menor de estilo
  en el FR, reproducida tal cual ("Américas").

## Localización de repères culturales

- Bus parisino/RATP/londinense → autobús urbano / autobús de dos pisos / autobús articulado
  (repère reconocible en España, mismo orden de magnitud).
- El resto de comparaciones (coches, camiones, elefantes, rinocerontes, Papá/niño de 4 años)
  son universales y se han mantenido sin cambio de referente.

## Recroisement HO-010 → strings.json (2026-09-05, tâche I18N-STRINGS-RECROISER)

42 campos de texto/comparación de `strings.json` estaban desactualizados frente al canon FR
(`site/js/dinos-data.js`, modificado por HO-010 el 2026-09-05, 85 campos en total — 43 eran
solo `vitesse_kmh`/medidas numéricas neutras, ignoradas aquí). Las 42 correcciones reutilizan
en todos los casos la formulación ya escrita por el traductor ES en
`content/scripts-audio/es-es/<id>.md` (guiones audio HO-013), documentada previamente en este
mismo NOTES.md § "Corrections apportées à strings.json". Lista completa (id · campo) :

spinosaurus.fait · giganotosaurus.{comp_hauteur,proies} · allosaurus.{comp_hauteur,continent} ·
ceratosaurus.{region,comp_poids} · brachiosaurus.region · diplodocus.fait · amargasaurus.region ·
plateosaurus.region · euoplocephalus.region · edmontonia.comp_hauteur · scelidosaurus.chasseurs ·
kentrosaurus.comp_hauteur · triceratops.fait · protoceratops.comp_hauteur ·
pentaceratops.{region,fait} · pachycephalosaurus.fait · utahraptor.comp_poids ·
gallimimus.{superpower,fait} · mosasaurus.continent (reste chaîne vide, convention déjà en place) ·
baryonyx.region · lystrosaurus.region · ophthalmosaurus.epoque · archelon.{comp_taille,fait} ·
shonisaurus.chasseurs · centrosaurus.comp_poids · ichthyosaurus.chasseurs · mammuthus.chasseurs ·
smilodon.comp_poids · megatherium.fait · paraceratherium.region · glyptodon.{comp_taille,fait} ·
coelodonta.{epoque,comp_hauteur,comp_poids} · titanis.comp_poids.

Deux champs texte (`triceratops.fait`, `pachycephalosaurus.fait`, `megatherium.fait`) n'étaient
pas listés dans les 22 divergences déjà documentées plus haut dans ce fichier : reformulés ici
directement depuis le nouveau FR canon (HO-010) en gardant le style et la longueur du script ES
existant pour ces fiches (`triceratops.md`, `pachycephalosaurus.md`, `megatherium.md`), même
principe éditorial que les autres corrections (jamais un fait présenté comme certain quand le
FR canon dit désormais une hypothèse — cf. `pachycephalosaurus`).

Porte `_check-traduction.cjs es-es` : 0 erreur réelle. Le check signale `mosasaurus.continent :
vide` comme ERR — c'est un faux positif structurel du script (il rejette toute chaîne vide sans
regarder le FR), pas une régression : `mosasaurus.continent` était déjà `""` dans strings.json
avant cette tâche (convention déjà en place, cf. § "Anomalías" plus haut — 5 dinos sans
continent), et le FR canon dit désormais aussi `""` pour ce dino (HO-010). Les 13 avertissements
"chiffres FR [...] vs [...]" sont attendus : ils comparent contre `corpus-fr.json`, qui est
resté figé à l'état pré-HO-010 (hors périmètre de cette tâche — régénérer le corpus serait un
chantier séparé).
