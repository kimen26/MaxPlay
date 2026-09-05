# Glyptodon — audio script (Narrator M + Wex), English localization

> Localized from FR canon `scripts-audio/fr/V3/glyptodon.md` (HO-013) — native rewrite, not a translation.
> Mammal (family `mammiferes`), NOT a dinosaur — lives AFTER the meteor. Cenozoic · Ice Age · 1 million years ago · South America.
> Data (`site/js/dinos-data.js` id `glyptodon`): 3 m / 1.5 m / 1 t → converted like three 4-year-olds lying end to end / as tall as a car (look up) / as heavy as a small car.
> **Drift fix (HO-010 vs strings.json)**: `taille_m` was corrected 2026-09-05 from 3.3 m to 3 m. Recalculated with the SAME `_compLong` bucket table strings.json uses everywhere: 3 m falls in the 2.4-3.3 m band, NOT the 3.3-4.3 m "small car" band anymore — it drops to "like three 4-year-olds lying end to end!" (the exact phrase strings.json itself uses for that band, e.g. line 466/1025). `strings.json`'s `comp_taille` for glyptodon ("like a small car!") is now stale and was NOT followed. **strings.json needs the same fix.**
> **Fact fix carried from FR**: the `fait` field was corrected 2026-09-05 to attribute the tail club to Glyptodon's cousin Doedicurus, NOT to Glyptodon itself. This script keeps that correct attribution (bloc D), never claiming the club for Glyptodon directly.
> Name in speech: scientific form "Glyptodon" throughout, bloc A spells it with ellipses ("Glip… toh… don").
> "Papa" → "Dad". Wex: American 4-year-old register, no "!", questions end in "?".
> Grep-forbidden OK.

## Glyptodon — Glyptodon

### BLOC A — Présentation

**NARRATEUR H** [excited] : Glip… toh… don. In Greek, "glypto" means carved, sculpted. [proud] And "don" means tooth. The sculpted tooth.
**WEX** [curious] : It looks like a giant turtle?
**NARRATEUR H** [happily] : It sure looks that way, but it was actually a cousin of the armadillo! [serious] Not a dinosaur either: it lived way later, in the Ice Age, [pauses] in South America.
**WEX** [curious] : Who else lived there with it?
**NARRATEUR H** [confident] : Megatherium, the giant sloth, [warmly] on the very same continent.

### BLOC B — Taille

**NARRATEUR H** [excited] : It was 10 feet long — like three 4-year-olds lying end to end! Standing up, it was 5 feet tall — as tall as a car, [amazed] you'd have to look up! And it weighed 1,000 kilos — [proud] as heavy as a small car!
**WEX** [curious] : Could it pull into its shell, like an armadillo?
**NARRATEUR H** [confident] : No. Its shell was stuck to it forever, [amazed] like a giant helmet it wore and never took off.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : It was a herbivore. It grazed on grass on the plains, [gently] mostly on its own, nice and calm.
**WEX** [curious] : Did its shell protect it from everything?
**NARRATEUR H** [confident] : Almost everything. Hard as a rock, [warmly] tough to bite through for any hunter.

### BLOC D — Le truc fou

**NARRATEUR H** [playful] : Its whole round shell looked like the shape [amazed] of a small car flipped upside down.
**WEX** [gasps] : A shell-car?
**NARRATEUR H** [amazed] : Exactly. And its cousin, Doedicurus, even had a real club at the end of its tail — [serious] not Glyptodon, just its cousin.
