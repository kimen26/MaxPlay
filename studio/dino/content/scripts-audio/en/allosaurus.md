# Allosaurus — audio script (Narrator M + Wex), English localization

> Localized from FR canon `scripts-audio/fr/V3/allosaurus.md` (HO-013) — native rewrite, not a translation.
> Data (`site/js/dinos-data.js` id `allosaurus`): 9.5 m long · **4 m tall** (HO-010 correction, was 3.5 m) · 2 t · speed 34 km/h. Height + speed are the two fields HO-010 changed.
> **⚠️ Scale drift caught and fixed**: `strings.json` still has `comp_hauteur: "as tall as two Dads standing on each other's shoulders!"` (matching the OLD height of 3.5 m / old FR comp "comme deux Papas l'un sur l'autre"). Since HO-010 the FR canon now uses `_compHaut(4)` = "aussi haut qu'un bus anglais à deux étages" (double-decker bus bucket). Recalculated for EN using the same bucket table as `strings.json` (4 m → double-decker bus, same bucket as T. rex/Spinosaurus): `as tall as a double-decker bus!`. Flagged in NOTES.md — strings.json needs the same fix.
> Speed is NEW: `_compVitesse(34)` = "aussi vite qu'un chien qui court" → localized "as fast as a dog running", 34 km/h ≈ 21 mph.
> Region: both continents cited (`region` data = "North America, Europe"), matching `strings.json`.
> Name in speech: scientific form "Allosaurus" — no hyphenated syllables outside bloc A ("Al… oh… saurus").
> "Papa" → "Dad". Wex: American 4-year-old register, no "!", questions end in "?".
> Grep-forbidden OK.

## Allosaurus — Allosaurus fragilis

### BLOC A — Présentation

**NARRATEUR H** [excited] : Al… oh… saurus. [curious] "Allo," in Greek, means other, different — its bones didn't look like any other dinosaur's. [serious] And "saurus" means lizard.
**WEX** [confident] : The lizard… hello? Like on the phone?
**NARRATEUR H** [chuckles] : Almost the same word, but this one means different, not hi. [serious] The different lizard. It lived in North America, [confident] but also in Europe, [amazed] one hundred fifty-five million years ago.
**WEX** [curious] : On two continents at the same time?
**NARRATEUR H** [confident] : Exactly. [proud] The top hunter of the Jurassic, on both sides of the ocean.

### BLOC B — Taille

**NARRATEUR H** [excited] : It was 9.5 meters long — as long as a truck! [quickly] Standing up, it was 4 meters tall — as tall as a double-decker bus! And it weighed 2,000 kilos — [amazed] as heavy as a rhino! [serious] And scientists think it could run about 21 miles an hour — as fast as a dog running.
**WEX** [amazed] : Smaller than T. rex, then?
**NARRATEUR H** [serious] : Yes, but fast and clever. [confident] And it lived ninety million years [amazed] before T. rex.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : It was a carnivore. It hunted Stegosaurus [confident] and young long-necked dinosaurs.
**WEX** [curious] : Did it hunt all by itself?
**NARRATEUR H** [hesitant] : Maybe not, [confident] some fossils were found close together. [curious] A real mystery, still unsolved.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : It opened its jaw super wide, [quickly] like an axe, to strike its prey. [amazed] And scientists found the bones of more than FORTY Allosaurus mixed together in a single spot, in Utah.
**WEX** [gasps] : Forty in one place?
**NARRATEUR H** [whispers] : A giant fossil graveyard. [curious] Nobody really knows why they're all there.
