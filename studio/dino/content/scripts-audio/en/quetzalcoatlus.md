# Quetzalcoatlus — audio script (Narrator M + Wex), English localization

> Localized from FR canon `scripts-audio/fr/V3/quetzalcoatlus.md` (HO-013) — native rewrite, not a translation.
> Pterosaur (family `pterosaures`, dinos-data.js) — **NOT a dinosaur, a flying reptile**, stated explicitly, matching FR.
> Data (`site/js/dinos-data.js` id `quetzalcoatlus`): `taille_vol: true` → `taille_m` = wingspan (11 m), said "wingtip to wingtip." `comp_taille` already hardcoded in data: FR says "large comme un bus de Paris" (a Paris city bus). Localized for a US audience as "a city bus" — `strings.json`'s existing convention for city-bus-scale comparisons uses "school bus" or plain "bus" (checked: no other id uses "Paris bus" literally, since that referent is FR-specific street furniture, per the charter's rule to swap the cultural referent, never the scale — a Paris RATP bus and a US city bus are the same order of magnitude, ~11-12 m). `_compHaut(5)` / `_compPoids(0.2)` carried from `i18n/en/strings.json` (validated HO-006, no drift): "almost as tall as three Dads standing on each other's shoulders!" / "as heavy as a lion!".
> Speed is a NEW field (HO-010/011, absent from strings.json): `vitesse_kmh: 90` — a FLIGHT speed. `_compVitesse(90)` = "presque aussi vite qu'un guépard" → localized "almost as fast as a cheetah," converted 90 km/h ≈ 56 mph, phrased for flying.
> Name in speech: scientific form "Quetzalcoatlus." Bloc A spells it out with ellipses: "ket… sal… koh… AT… lus" (per lexicon respelling **ket-sal-koh-AT-lus**, Nahuatl root kept close to Spanish/Nahuatl sound rather than anglicized further, per the FR's own choice to keep the god's name recognizable).
> "Papa" → "Dad." **Tritri crossover KEPT** (the only dino in this lot where FR allows it) — North America, late Cretaceous, plausible overlap with Triceratops, per FR's explicit note.
> Grep-forbidden OK.

## Quetzalcoatlus — Quetzalcoatlus northropi

### BLOC A — Présentation

**NARRATEUR H** [excited] : ket… sal… koh… AT… lus. This name comes from a god! [serious] Quetzalcoatl is the great feathered serpent god of the Aztecs, a people from Mexico. [curious] Quite a name for quite an animal, huh?
**WEX** [amazed] : The dinosaur of the feathered serpent god.
**NARRATEUR H** [serious] : Careful, [gently] it's actually not a dinosaur at all — it's a flying reptile, a pterosaur. [proud] It lived in North America, sixty-eight million years ago.
**WEX** [gasps] : Was that Tritri's time?
**NARRATEUR H** [warmly] : Yes, the very end of the Cretaceous — [amazed] Quetzalcoatlus may have flown right over Triceratops's head.

### BLOC B — Taille

**NARRATEUR H** [excited] : Its open wings spanned 11 meters wingtip to wingtip — as wide as a city bus! [quickly] Laid end to end, as long as a city bus too. Standing up, it was 5 meters tall — [proud] almost as tall as three Dads standing on each other's shoulders! And it weighed 200 kilos — as heavy as a lion. [amazed] And flying, scientists think it could go 56 miles an hour — almost as fast as a cheetah.
**WEX** [gasps] : Standing tall like a giraffe?
**NARRATEUR H** [proud] : Exactly. [amazed] And yet, this animal could fly.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Unlike other flying reptiles that fished, [confident] this one mostly hunted on the ground — small animals, insects. [slowly] It walked really well on all four legs.
**WEX** [curious] : And could anything catch it?
**NARRATEUR H** [confident] : In the air, nobody. [warmly] On the ground, it stayed careful, [pauses] like everyone back then — even if it crossed paths with Triceratops, in the same region.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : It's one of the biggest flying creatures in the whole history of Earth. [pauses] No bird, no bat has ever been that size.
**WEX** [amazed] : The king of the sky.
**NARRATEUR H** [softly] : The king of the sky, yes — [proud] and nobody up there ever came to challenge his place.
