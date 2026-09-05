# Woolly Rhino — audio script (Narrator M + Wex), English localization

> Localized from FR canon `scripts-audio/fr/V3/coelodonta.md` (HO-013) — native rewrite, not a translation.
> Mammal (family `mammiferes`), NOT a dinosaur — lives AFTER the meteor. Cenozoic · Ice Age · 50,000 years ago (corrected from 100,000) · Europe and Asia (cold regions).
> Data (`site/js/dinos-data.js` id `coelodonta`): 3.5 m / 1.5 m / 1.75 t → converted like a small car / as tall as a car (look up) / as heavy as a small car and a cow together. No `vitesse_kmh` → no speed mentioned.
> **Drift fixes (HO-010 vs strings.json), several fields, this id is one of the two densest in the lot**:
> 1. `epoque` corrected from "100,000 years ago" to "50,000 years ago" — this script states 50,000.
> 2. `hauteur_m` corrected from 1.9 m to 1.5 m. Recalculated with the SAME `_compHaut` bucket table: 1.5 m falls in the 1.25-1.7 m band ("aussi haut qu'une voiture — il fallait lever la tête"), NOT the 1.9-2.1 m "front door" band anymore. `strings.json`'s `comp_hauteur` ("as tall as a front door!") is stale and was NOT followed — fixed here to "as tall as a car — you'd have to look up!" (exact phrase strings.json uses elsewhere for that band, e.g. line 431/449). **strings.json needs the same fix.**
> 3. `poids_t` corrected from 2.5 t to 1.75 t. Recalculated with the SAME `_compPoids` bucket table: 1.75 t falls in the 1.45-1.8 t band ("aussi lourd qu'une petite voiture et une vache ensemble"), NOT the 2.3-2.8 t "5 horses" band anymore. `strings.json`'s `comp_poids` ("as heavy as 5 horses!") is stale and was NOT followed — fixed here to "as heavy as a small car and a cow put together!" (exact phrase strings.json uses elsewhere, e.g. line 267/973). **strings.json needs the same fix.**
> Name in speech: scientific form "Coelodonta" throughout, bloc A spells it with ellipses ("SEE… loh… DON… tah").
> "Papa" → "Dad". Wex: American 4-year-old register, no "!", questions end in "?".
> Grep-forbidden OK.

## Woolly Rhino — Coelodonta antiquitatis

### BLOC A — Présentation

**NARRATEUR H** [excited] : SEE… loh… DON… tah. In Greek, "coelo" means hollow, [serious] and "donta" means teeth. The hollow tooth.
**WEX** [curious] : A rhino covered in fur?
**NARRATEUR H** [happily] : Exactly, people call it the Woolly Rhino. [serious] Not a dinosaur: it lived way later, in the Ice Age, [pauses] fifty thousand years ago, in the cold of Europe and Asia.
**WEX** [curious] : Who shared the cold with it?
**NARRATEUR H** [confident] : The Woolly Mammoth, right nearby. [warmly] Both built for the snow.

### BLOC B — Taille

**NARRATEUR H** [excited] : It was 11.5 feet long — like a small car! Standing up, it was about 5 feet tall — as tall as a car, [amazed] you'd have to look up! And it weighed 1,750 kilos — [proud] as heavy as a small car and a cow put together!
**WEX** [curious] : What was its horn for?
**NARRATEUR H** [confident] : Like a broom. [playful] It pushed the snow aside to find the grass hidden underneath.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : It was a herbivore. It grazed on grass on the cold plains, [gently] mostly on its own.
**WEX** [curious] : Who could hunt it?
**NARRATEUR H** [confident] : Only prehistoric humans, and very carefully — [warmly] its horn made it dangerous to get close to.

### BLOC D — Le truc fou

**NARRATEUR H** [whispers] : The very first humans painted the Woolly Rhino [pauses] on the walls of their caves, tens of thousands of years ago.
**WEX** [gasps] : Painted on a wall?
**NARRATEUR H** [amazed] : Yes — [proud] one of the very first animals a human being ever painted.
