# Carnotaurus — audio script (Narrator M + Wex), English localization

> Localized from FR canon `scripts-audio/fr/V3/carnotaurus.md` (HO-013) — native rewrite, not a translation.
> Data (`site/js/dinos-data.js` id `carnotaurus`): 8 m long · 2.5 m tall · 1.6 t · **speed 52 km/h** (structured field `vitesse_kmh`, per HO-009/HO-011).
> **⚠️ FR data mismatch flagged, not corrected**: the FR canon script signals that `superpower`/`fait` text fields still say "up to 56 km/h" in `dinos-data.js`, but the structured `vitesse_kmh` field (the one `_compVitesse` reads) is 52. FR canon follows the structured field (52), per HO-011 instructions. This EN script does the same for consistency. `strings.json`'s existing `fait` says "45 miles per hour," which corresponds to ~72 km/h — neither the 52 nor the 56 FR figure. Recalculated cleanly from `vitesse_kmh: 52` → `_compVitesse(52)` = "aussi vite qu'une voiture en ville" → localized "as fast as a car in the city", 52 km/h ≈ 32 mph. Flagged in NOTES.md — strings.json's `fait` field needs review against the correct 52 km/h figure.
> Scale for taille/hauteur/poids from `i18n/en/strings.json` (validated HO-006): `like two cars, one behind the other!` / `as tall as a soccer goal!` / `as heavy as a small car and a cow put together!` — matches current FR values, no drift.
> Name in speech: scientific form "Carnotaurus" — no hyphenated syllables outside bloc A ("Kar… noh… tor… us").
> "Papa" → "Dad". Wex: American 4-year-old register, no "!", questions end in "?".
> Grep-forbidden OK.

## Carnotaurus — Carnotaurus sastrei

### BLOC A — Présentation

**NARRATEUR H** [excited] : Kar… noh… tor… us. [curious] "Carno," in Latin, means meat, flesh. And "taurus" means bull.
**WEX** [playful] : "Carno"… I got the meat part. [hesitant] What's "taurus" again?
**NARRATEUR H** [happily] : The bull! The meat-eating bull. [confident] A real hunting bull, with horns above its eyes. It lived in South America, [amazed] seventy-two million years ago.
**WEX** [curious] : Bull horns, but it ate meat?
**NARRATEUR H** [playful] : Yes. [confident] It hunted the plant-eaters of its territory, medium-sized dinosaurs.

### BLOC B — Taille

**NARRATEUR H** [excited] : It was 8 meters long — like two cars, one behind the other! [quickly] Standing up, it was 2.5 meters tall — as tall as a soccer goal! And it weighed 1,600 kilos — [amazed] as heavy as a small car and a cow put together! [excited] And it could run about 32 miles an hour — as fast as a car in the city!
**WEX** [gasps] : As fast as a car?
**NARRATEUR H** [confident] : Really. [proud] The sprinter of the big carnivores of its time.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : It was a super fast carnivore. It hunted medium-sized dinosaurs, [confident] all alone, on its long, powerful legs.
**WEX** [curious] : Were its arms tiny too?
**NARRATEUR H** [serious] : Even tinier than T. rex's. [warmly] But with horns and legs like that, it didn't need them.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Its arms were so tiny [chuckles] they barely did anything at all. [amazed] But its back legs were true runner's legs.
**WEX** [gasps] : A bull-rocket.
**NARRATEUR H** [playful] : The speed champion among the big carnivores. [chuckles] Not even its tiny arms could slow it down.
