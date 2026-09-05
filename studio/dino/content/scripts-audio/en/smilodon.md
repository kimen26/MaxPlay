# Smilodon — audio script (Narrator M + Wex), English localization

> Localized from FR canon `scripts-audio/fr/V3/smilodon.md` (HO-013) — native rewrite, not a translation.
> Mammal (family `mammiferes`), NOT a dinosaur — lives AFTER the meteor. Cenozoic · Ice Age · 1 million years ago · North and South America.
> Data (`site/js/dinos-data.js` id `smilodon`): 1.75 m / 1 m / 0.22 t → converted 5.5 feet long / as tall as a 4-year-old / as heavy as a lion. No `vitesse_kmh` → no speed mentioned.
> **Drift fix (HO-010 vs strings.json)**: `poids_t` was corrected 2026-09-05 from 0.25 t to 0.22 t (the old "tiger" weight was wrong). Recalculated with the SAME `_compPoids` bucket table strings.json uses everywhere: 0.22 t falls in the 0.18-0.225 t band → "as heavy as a lion!" (confirmed exact phrase used elsewhere in strings.json, e.g. line 901/919). `strings.json`'s `comp_poids` for smilodon ("as heavy as a tiger!") is now stale and was NOT followed. **strings.json needs the same fix.**
> Name in speech: scientific form "Smilodon" throughout (per HO-013 arbitrage), bloc A spells it with ellipses ("Smy… loh… don").
> "Papa" → "Dad". Wex: American 4-year-old register, no "!", questions end in "?".
> Grep-forbidden OK.

## Smilodon — Smilodon fatalis

### BLOC A — Présentation

**NARRATEUR H** [excited] : Smy… loh… don. In Greek, "smilo" means knife, and "odon" means tooth. [proud] The knife tooth.
**WEX** [confident] : The saber-toothed tiger?
**NARRATEUR H** [happily] : That's its nickname, but it wasn't a tiger — [serious] and it didn't live with the dinosaurs either. It showed up way later, in the Ice Age, [pauses] a million years ago.
**WEX** [curious] : Where did it live?
**NARRATEUR H** [confident] : North and South America, in the cold, [warmly] right alongside the Dire Wolf.

### BLOC B — Taille

**NARRATEUR H** [excited] : It was 5.5 feet long — like a tall Dad lying on the ground! Standing up, it was about 3 feet tall — [amazed] as tall as a 4-year-old! And it weighed 220 kilos — [proud] as heavy as a lion!
**WEX** [curious] : Not that big, then?
**NARRATEUR H** [confident] : No, but stocky, all muscle. [proud] A real block of strength.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : It was a carnivore. It hunted bison, wild horses, and [amazed] young giant sloths. [hesitant] Maybe in groups, like lions — scientists still aren't sure.
**WEX** [nervous] : Who dared attack it?
**NARRATEUR H** [warmly] : Almost nobody. [confident] With fangs like that, everyone left it alone.

### BLOC D — Le truc fou

**NARRATEUR H** [whispers] : Its two top fangs measured almost 8 inches — [amazed] longer than your whole hand.
**WEX** [gasps] : Longer than my hand?
**NARRATEUR H** [amazed] : Yes. And thousands of them got trapped together [slowly] in one huge, sticky tar pit, in America.
