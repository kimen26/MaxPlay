# Lystrosaurus — audio script (Narrator M + Wex), English localization

> Localized from FR canon `scripts-audio/fr/V3/lystrosaurus.md` (HO-013) — native rewrite, not a translation.
> **Post-HO-010 change, RECALCULATED**: FR `region` gained Russia and Mongolia (was Afrique du Sud/Antarctique/Inde/Chine only — now 6 countries, all consistent with a reunited Pangaea). EN bloc A now names all 6 per the "cite every region" rule: South Africa, Antarctica, India, China, Russia, Mongolia. The extracted strings.json subset only carries the old 4-country region text — **strings.json needs the same fix**.
> **New field this id, `vitesse_kmh: 5` (added by the orchestrator, medium confidence)**: `_compVitesse(5)` = "aussi vite que toi quand tu marches" (the bottom bucket, < 5.5 km/h — a child's own walking speed, addressed directly to "you"). Converted: 5 km/h × 0.621 = 3.1 mph → "3 miles an hour." Localized to "as fast as you when you walk" — the direct-address form the FR bucket itself uses (not "a kid running," which is the NEXT bucket up, 8.5-12.5 km/h — that speed would overstate this animal by a full band). No prior EN convention existed for this exact bottom-of-ladder bucket in strings.json (the only speed text there belonged to other ids); this establishes it for future waves confronting `vitesse_kmh` under 5.5.
> Other scale fields (`taille_m`/`hauteur_m`/`poids_t`) unaffected by HO-010. Comparisons carried from `i18n/en/strings.json` (validated HO-006): `like a big cat stretched out!` / `it would come up to your knees!` / `as heavy as a 4-year-old!`.
> Not a dinosaur — a synapsid, one of the great survivors of the Permian-Triassic mass extinction, the worst in Earth's history.
> Name in speech: scientific form "Lystrosaurus". Bloc A spells it out: "LIS… troh… SOR… us".
> "Papa" → "Dad". Wex: American 4-year-old register, no "!", questions end in "?".
> Grep-forbidden OK.

## Lystrosaurus — Lystrosaurus murrayi

### BLOC A — Présentation

**NARRATEUR H** [curious] : LIS… troh… SOR… us. "Lystron," in Greek, means shovel. [serious] And "saurus," lizard.
**WEX** [confident] : The shovel lizard?
**NARRATEUR H** [happily] : That's the one — because of his snout, [serious] wide and flat, like a little shovel. He lived two hundred fifty million years ago — [amazed] before the dinosaurs.
**WEX** [curious] : Where did he live?
**NARRATEUR H** [amazed] : Almost everywhere: South Africa, Antarctica, India, China, Russia, Mongolia. [serious] Back then, all the land was stuck together [confident] in one single piece.

### BLOC B — Taille

**NARRATEUR H** [excited] : He was 0.7 meters long — like a big cat stretched out! [amazed] Standing up, it would come up to your knees! And he weighed 17 kilos — [serious] as heavy as a 4-year-old! [curious] Scientists think he could move about 3 miles an hour — as fast as you when you walk.
**WEX** [playful] : Small, but tough?
**NARRATEUR H** [chuckles] : Small, but tough, yes — [proud] and above all, incredibly hardy.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : He snipped low plants with his beak, and lived in enormous numbers. [confident] Right after the biggest disaster in Earth's history, [calm] almost no hunters were left to threaten him.
**WEX** [curious] : A disaster, like what?
**NARRATEUR H** [gently] : The worst extinction Earth has ever seen. [warmly] Almost every animal disappeared — but not him.

### BLOC D — Le truc fou

**NARRATEUR H** [amazed] : Right after that disaster, in some places, almost every four-legged animal you find, [serious] it's a Lystrosaurus — [proud] sometimes nine out of ten.
**WEX** [gasps] : Nine out of ten, just him?
**NARRATEUR H** [softly] : Just him. The great survivor, [proud] the one who held on when almost everything else went extinct.
