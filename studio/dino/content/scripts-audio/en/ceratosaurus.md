# Ceratosaurus — audio script (Narrator M + Wex), English localization

> Localized from FR canon `scripts-audio/fr/V3/ceratosaurus.md` (HO-013) — native rewrite, not a translation.
> Data (`site/js/dinos-data.js` id `ceratosaurus`): 6 m long · 2 m tall · **0.9 t** (HO-010 correction, was 0.7 t) · speed 25 km/h. Weight + region + speed are the fields HO-010 changed.
> **⚠️ Scale drift caught and fixed**: `strings.json` still has `comp_poids: "as heavy as a cow!"` (matching the OLD weight of 0.7 t / old FR comp "aussi lourd qu'une vache"). Since HO-010 the FR canon now uses `_compPoids(0.9)` = "aussi lourd qu'une petite voiture" (small-car bucket, same bucket used elsewhere in strings.json as "as heavy as a small car!"). Recalculated for EN using that existing bucket: `as heavy as a small car!`. Flagged in NOTES.md — strings.json needs the same fix.
> **Region update**: FR now reads "Amérique du Nord (et peut-être l'Europe, au Portugal)" — the Portugal find is a hedge, not confirmed. Localized as "North America (and maybe Europe, in Portugal)" to preserve the hedge, matching the FR's "peut-être" and the fact-check note in FR canon that the Portuguese fossils are attributed "cf. Ceratosaurus," not 100% certain.
> Speed is NEW: `_compVitesse(25)` = "aussi vite qu'un vélo qui roule bien" → localized "as fast as a bike going fast", 25 km/h ≈ 16 mph.
> Name in speech: scientific form "Ceratosaurus" — no hyphenated syllables outside bloc A ("Seh… rat… oh… saurus").
> "Papa" → "Dad". Wex: American 4-year-old register, no "!", questions end in "?".
> Grep-forbidden OK.

## Ceratosaurus — Ceratosaurus nasicornis

### BLOC A — Présentation

**NARRATEUR H** [excited] : Seh… rat… oh… saurus. [curious] "Cerato," in Greek, means horn. [playful] And "saurus" means lizard. The horned lizard!
**WEX** [amazed] : A real horn, on its nose, like a rhino?
**NARRATEUR H** [happily] : Exactly right, the horned lizard. It lived in North America, [confident] and maybe Europe too, in Portugal, [amazed] one hundred fifty million years ago.
**WEX** [curious] : A horn, like a unicorn?
**NARRATEUR H** [playful] : Almost! [proud] The only big carnivore of its time with a horn on its nose.

### BLOC B — Taille

**NARRATEUR H** [excited] : It was 6 meters long — as long as a road is wide, it takes up the whole street! [quickly] Standing up, it was 2 meters tall — as tall as a front door! And it weighed 900 kilos — [amazed] as heavy as a small car! [serious] And it could run about 16 miles an hour — as fast as a bike going fast.
**WEX** [amazed] : Smaller than the big carnivore kings?
**NARRATEUR H** [confident] : Yes, but fast and nimble. [proud] Its horn made it one of a kind.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : It was a carnivore. It ate small dinosaurs and fish. [calm] It mostly lived alone. [nervous] Allosaurus, much bigger, could attack it.
**WEX** [curious] : Was it scared of Allosaurus?
**NARRATEUR H** [gently] : Probably, a little. [confident] But it was fast, [playful] and its horn could scare off a hesitant attacker.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Besides its big horn, [playful] it had small horns above its eyes too, like a dragon. [amazed] And its thin teeth were perfect for catching slippery fish.
**WEX** [gasps] : A fishing dragon.
**NARRATEUR H** [playful] : A carnivorous, fishing unicorn. [proud] There was nothing else quite like it.
