# Centrosaurus — audio script (Narrator M + Wex), English localization

> Localized from FR canon `scripts-audio/fr/V3/centrosaurus.md` (HO-013) — native rewrite, not a translation.
> Data (`site/js/dinos-data.js` id `centrosaurus`): 5.5 m long · 1.8 m tall · 1.8 t · `vitesse_kmh: 25`.
> **HO-010 drift found and recalculated**: `poids_t` moved 2.5 → 1.8 t. FR `comp_poids` moved from "aussi lourd que 5 chevaux" to "aussi lourd qu'un rhinocéros" (the `_compPoids` 1.8 t bucket). `strings.json`'s EN-W4 extract ALREADY carries the corrected value ("as heavy as 5 horses!" is what an older draft would say — but the extract handed to me says "as heavy as 5 horses!" for comp_poids, which does NOT match the current FR "un rhinocéros"). **Fixed here to "as heavy as a rhino!"** — checked against every other 1.8 t-range dino's EN comparison in `strings.json` (rhino bucket used consistently for ~1.7-2.2 t animals elsewhere in the file, e.g. pachycephalosaurus-adjacent weight bands use "horse" only below ~0.5 t) — no new bucket invented, matches the FR canon's post-HO-010 rhino referent one-for-one. **strings.json's `comp_poids` for centrosaurus needs the same fix** (still says the stale "5 horses").
> `vitesse_kmh: 25` → `_compVitesse(25)` = "vélo qui roule bien" → 25 × 0.621 ≈ 15.5 → **16 mph**, "as fast as a bike going fast" (same bucket as protoceratops/pentaceratops this lot).
> Name in speech: scientific form "Centrosaurus". Bloc A spells it out with ellipses: "SEN… troh… SOR… us".
> "Papa" → "Dad". Wex: American 4-year-old register, no "!", questions end in "?".
> Grep-forbidden OK.

## Centrosaurus — Centrosaurus apertus

### BLOC A — Présentation

**NARRATEUR H** [excited] : SEN… troh… SOR… us. [curious] In Greek, "kentron" means point, sharp spike. And "saurus" is lizard.
**WEX** [playful] : The spiked lizard.
**NARRATEUR H** [happily] : Exactly. His whole frill was lined with little spikes. [warmly] He lived in Canada, seventy-five million years ago.
**WEX** [nervous] : Did he have a hunter chasing him around?
**NARRATEUR H** [serious] : Yes, Gorgosaurus, a cousin of T. rex.

### BLOC B — Taille

**NARRATEUR H** [excited] : He was 5 meters 50 long — as long as a big SUV! 1 meter 80 tall — [quickly] as tall as Dad standing up! And 1,800 kilos — [amazed] as heavy as a rhino! Scientists think he could run about 16 miles an hour — as fast as a bike going fast.
**WEX** [gasps] : As tall as Dad.
**NARRATEUR H** [confident] : Yes, with a beautiful curved horn on his nose, like a crescent moon.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : He was a herbivore. He grazed on plants in herds. [confident] When Gorgosaurus got close, [calm] the Centrosaurus would huddle together, tight.
**WEX** [curious] : How many were in the herd?
**NARRATEUR H** [playful] : Thousands, maybe. [amazed] When they all bunched up together, no hunter dared come close.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Scientists found the bones of THOUSANDS of Centrosaurus, all together, in one spot. [pauses] They really did travel in giant herds.
**WEX** [gasps] : Thousands of horned dinosaurs.
**NARRATEUR H** [mischievously] : Picture the sound of all those steps: thud, thud, thud.
