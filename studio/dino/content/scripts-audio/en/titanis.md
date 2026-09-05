# Titanis — audio script (Narrator M + Wex), English localization

> Localized from FR canon `scripts-audio/fr/V3/titanis.md` (HO-013) — native rewrite, not a translation.
> Bird (family `oiseaux`), NOT a dinosaur, NOT a mammal — lives AFTER the meteor. Cenozoic · 3 million years ago · North America.
> Data (`site/js/dinos-data.js` id `titanis`): 1.9 m / 1.9 m / 0.15 t / `vitesse_kmh: 45` → converted as long as a motorcycle / as tall as a front door / as heavy as a donkey / as fast as a galloping horse.
> **Drift fixes (HO-010 vs strings.json), two fields**:
> 1. `poids_t` corrected from 0.3 t to 0.15 t. Recalculated with the SAME `_compPoids` bucket table: 0.15 t falls in the 0.14-0.18 t band ("aussi lourd qu'un âne," singular), NOT the 0.29-0.36 t "2 donkeys" band anymore. `strings.json`'s `comp_poids` ("as heavy as 2 donkeys!") is stale and was NOT followed — fixed here to "as heavy as a donkey!" (exact singular phrase strings.json uses elsewhere for that band, e.g. line 1220). **strings.json needs the same fix.**
> 2. `vitesse_kmh` is a brand-new field this wave (added 2026-09-05 by the orchestrator, high confidence, absent from strings.json entirely — no prior EN convention existed for this id). Converted 45 km/h × 0.621 ≈ 28 mph, rounded, no decimal. FR's `_compVitesse(45)` = "aussi vite qu'un cheval au galop" → localized "as fast as a galloping horse," matching the child-scale reference ladder used for the theropod wave (NOTES.md table) — the 40-48 km/h band sits between "dog running" and "car in the city," localized here as a galloping horse, the direct English equivalent of the FR bucket at that speed.
> Name in speech: scientific form "Titanis" throughout, bloc A spells it with ellipses ("tih… TAN… is").
> "Papa" → "Dad". Wex: American 4-year-old register, no "!", questions end in "?".
> Grep-forbidden OK.

## Titanis — Titanis walleri

### BLOC A — Présentation

**NARRATEUR H** [excited] : tih… TAN… is. It comes from the Titans, [proud] the all-powerful giants in old Greek stories. The Titan bird.
**WEX** [curious] : A giant bird?
**NARRATEUR H** [happily] : A real bird, yes — [serious] but not a dinosaur. It showed up way later, [pauses] three million years ago, in North America.
**WEX** [gasps] : A bird, with feathers?
**NARRATEUR H** [confident] : With real feathers, yes. [amazed] But way too big and heavy to fly.

### BLOC B — Taille

**NARRATEUR H** [excited] : It was about 6 feet long — as long as a motorcycle! Standing up, it was about 6 feet tall — [amazed] as tall as a front door! And it weighed 150 kilos — [proud] as heavy as a donkey!
**WEX** [curious] : As tall as a door, but a bird?
**NARRATEUR H** [confident] : A bird on two very long legs, yes. [playful] Built for running, not for flying.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : It was a carnivore. It hunted small mammals and young horses, [amazed] running, all on its own. [quickly] Scientists think it could run 28 miles an hour — as fast as a galloping horse.
**WEX** [curious] : How did it catch things, with no hands?
**NARRATEUR H** [confident] : With its huge hooked beak, [amazed] bigger than your whole head.

### BLOC D — Le truc fou

**NARRATEUR H** [amazed] : Titanis is the only terror bird that ever made it all the way to North America — [proud] every one of its cousins stayed further south.
**WEX** [gasps] : It traveled all by itself?
**NARRATEUR H** [softly] : A huge journey on foot, [slowly] for a bird that can't fly at all.
