# NOTES — EN localization of dino audio scripts (HO-013)

> Theropods wave (13/71). Non-evident localization choices, FR canon vs `i18n/en/strings.json` drift found,
> and lexicon entries resolved. Written per HO-013 method (native rewrite, not translation).

## Scale drift found: FR canon (post-HO-010) vs strings.json (pre-HO-010, stale)

`strings.json` was validated HO-006, before HO-009/010 corrected several FR data fields. For the theropods,
3 fields moved and the localized comparison text had gone stale. Recalculated using the SAME bucket table
strings.json uses everywhere else (confirmed by scanning all `comp_hauteur`/`comp_poids` values in the file) —
no new bucket invented, no scale distorted.

1. **allosaurus** `hauteur_m` 3.5 → 4 m (HO-010). FR `comp_hauteur` moved from "comme deux Papas l'un sur
   l'autre" to "aussi haut qu'un bus anglais à deux étages" (the `_compHaut` 4 m bucket). `strings.json` still
   has the OLD "as tall as two Dads standing on each other's shoulders!" — stale. Fixed in
   `en/allosaurus.md` to "as tall as a double-decker bus!" (the bucket strings.json itself uses for every
   other 4 m theropod: T. rex, Spinosaurus, Carcharodontosaurus's hauteur is 3.8 m so it keeps "two Dads").
   **strings.json needs the same fix.**
2. **ceratosaurus** `poids_t` 0.7 → 0.9 t (HO-010). FR `comp_poids` moved from "aussi lourd qu'une vache" to
   "aussi lourd qu'une petite voiture" (the `_compPoids` 0.9 t bucket, since 0.85-1.45 t is the small-car
   band). `strings.json` still has "as heavy as a cow!" — stale. Fixed in `en/ceratosaurus.md` to "as heavy
   as a small car!" (bucket already used elsewhere in strings.json). **strings.json needs the same fix.**
3. **giganotosaurus** `hauteur_m` 4 → 3.3 m (HO-010). FR `comp_hauteur` moved from "aussi haut qu'un bus
   anglais à deux étages" to "comme deux Papas l'un sur l'autre." Here `strings.json` was ALREADY correct
   (it already said "as tall as two Dads standing on each other's shoulders!") — no fix needed, just
   confirmed alignment.

## FR data field corrected, text field not yet caught up (flagged, not corrected — out of scope)

4. **giganotosaurus** `proies`: FR data now says **Andesaurus** (HO-009/010 — Argentinosaurus was not
   contemporary, lived ~7 million years later in a different formation). `strings.json`'s `proies` field
   still says "Argentinosaurus (the biggest dino!)" — stale, inherited from before the correction.
   `en/giganotosaurus.md` follows the corrected FR canon and names Andesaurus throughout. **strings.json's
   `proies` field needs the same fix** — this is a factual correction, not a style choice.
5. **baryonyx** `region`: FR data now says "Europe (Angleterre, Espagne, Portugal)" (HO-010 added Spain and
   Portugal to the original England-only fossil record). `strings.json`'s `region` still says "Europe
   (England)" only. `en/baryonyx.md` follows the corrected FR canon: "Europe — England, Spain, and
   Portugal." **strings.json needs the same fix.**
6. **carnotaurus** speed: FR canon flags (and this EN script inherits the flag) that `dinos-data.js`'s TEXT
   fields (`superpower`, `fait`) still say "jusqu'à 56 km/h," while the STRUCTURED field `vitesse_kmh` (the
   one `_compVitesse` actually reads) is 52. Both FR and EN scripts follow the structured field (52 km/h ≈
   32 mph → "as fast as a car in the city"), per HO-011 instructions to trust the structured field.
   `strings.json`'s existing `fait` text says "45 miles per hour" (~72 km/h) — a THIRD, even more different
   number, inherited from an older draft. None of the three sources (56 text FR / 52 structured / 45 mph EN
   text) currently agree. **This is the one field where I flag the FR canon itself as possibly still wrong**:
   72 km/h (~45 mph, strings.json's number) does not match either FR number, so if anything is corrected
   later it should reconcile all three at once, not just two.

## New field this wave: `vitesse_kmh` (HO-011, added 2026-09-05, 9 of the 13 theropods)

No prior EN convention existed in `strings.json` for a speed comparison in the audio script itself — the
only existing speed-shaped text in strings.json is `tyrannosaurus`-unrelated: `fait` for a different dino
already said "It ran at 45 miles per hour — as fast as a car in the city!" This gave the reference for
localizing the "car in the city" bucket, used here for higher speeds (50-52 km/h).
Localized comparisons chosen per dino, built on the SAME child-scale reference ladder the FR `_compVitesse`
function uses (Dad walking → child running → bike → Dad running → bike fast → horse cantering → dog running →
horse galloping → car in town → lion charging → ostrich → cheetah), just re-expressed for a US 4-year-old:

| id | km/h | mph (rounded) | FR comparison | EN localization |
|---|---|---|---|---|
| tyrannosaurus | 20 | 12 | Papa qui court | Dad running |
| giganotosaurus | 50 | 31 | voiture en ville | car in the city |
| allosaurus | 34 | 21 | chien qui court | dog running |
| albertosaurus | 30 | 19 | cheval au petit galop | horse cantering |
| ceratosaurus | 25 | 16 | vélo qui roule bien | bike going fast |
| dilophosaurus | 25 | 16 | vélo qui roule bien | bike going fast |
| carnotaurus | 52 | 32 | voiture en ville | car in the city |
| baryonyx | 22 | 14 | Papa qui court (nage) | Dad running (used for a SWIM speed — kept the same "Dad running" reference the FR uses, since FR itself reuses the running-speed bucket for an aquatic comparison here; verb changed to "swim" in the sentence) |
| therizinosaurus | 7 | 4 | Papa qui marche vite | Dad walking fast |

Conversion method: km/h × 0.621, rounded to the nearest whole mph (never a decimal, per the charter's
"round, no decimals" rule) — e.g. 20 km/h = 12.4 mph → "12 miles an hour."

## 5 most debatable localization choices

1. **"Dad running" reused for a swim speed (baryonyx)** — the FR script itself compares a piscivore's
   swimming speed to "Papa qui court" (a land-running reference), so I kept the same cross-domain comparison
   in EN rather than inventing a new "Dad swimming" reference the FR doesn't have. Debatable: an American
   4-year-old might picture Dad on land, not in the water, but changing the referent would break parity
   with the FR script's own (accepted) shortcut.
2. **Ceratosaurus region hedge ("and maybe Europe, in Portugal")** — FR wraps the whole thing in a
   parenthetical hedge with "peut-être." I chose to keep the hedge explicit in the main sentence rather than
   parenthesize it, since a spoken parenthetical is harder for a 4-year-old to parse aurally than a small
   "and maybe" clause.
3. **Carnotaurus speed number (52, not 56 or 45)** — see point 6 above; picked the structured-field number
   per HO-011's explicit instruction, over both the FR text fields' 56 and strings.json's pre-existing 45.
4. **Albertosaurus "sarcophagus" bonus etymology kept in bloc D** — an English-speaking 4-year-old is less
   likely to already know "sarcophagus" than a French one is to have heard "sarcophage" (both languages
   share Egyptian-mummy pop culture, so judged safe to keep as-is without extra scaffolding).
5. **Allosaurus fossil-count line ("more than FORTY")** — FR's own bloc D note explains the fossil count was
   revised down from "soixante" (sixty) to "quarante" (forty) during HO-012 polish, to sit at the low end of
   the 44-73 individual range rather than round up too confidently. Kept "forty" in EN for the same reason,
   resisting the temptation to round to a rounder-sounding "fifty."

## Places where the FR canon itself looks possibly at fault (flagged, not corrected — out of scope for HO-013)

- **carnotaurus** speed: see point 6 above — FR's own `superpower`/`fait` text fields (56 km/h) disagree
  with the structured `vitesse_kmh` (52) the FR audio script follows. Both are internally inconsistent
  inside `dinos-data.js` itself, independent of any i18n concern. Someone should reconcile all of
  `dinos-data.js`'s carnotaurus speed mentions to one number.
- **giganotosaurus** vignette: FR canon retired the "chassait comme des loups" (hunted like wolves) motif
  here per the shared-vignette registry (reserved for Albertosaurus), replacing it with an unresolved
  hypothesis framing ("les savants pensent que non, peut-être plusieurs ensemble"). This reads slightly
  weaker dramatically in both languages than the retired wolf image, but is the correct choice per the
  registry rule — noted only as an observation, not a fault.

## Pronunciation lexicon (`i18n/lexiques-prononciation/en.md`) — entries resolved for the 13 theropods

Native pass on every "⚠️ to be checked" theropod entry. Decisions and one-line justifications below; the
"native check pending" / "added 2026-08-10" flags were removed from the table rows for these ids.

- **cryolophosaurus** — kept `kry-oh-LOH-foh-SOR-us` (not `kree-`). A US children's-media speaker defaults
  to the "eye" reading of an initial "cry-" far more often than "kree-" (compare "cryptic," "crystal" said
  with a short "i" sound only in unstressed positions, but a stressed open "cry-" as in "cry" itself is the
  overwhelmingly dominant popular form). Flag removed.
- **giganotosaurus** — kept `jig-ah-NOH-toh-SOR-us`, confirmed the soft "g" ("jig-") and confirmed the
  explicit warning to avoid drifting to "giganTOsaurus" (false attraction to "giganto-"). This is the
  correct, dictionary-standard English form and matches how US paleontology-for-kids media says it. No
  change needed; the entry was not actually flagged as uncertain (only a placement note existed for other
  Cretaceous predators nearby) — confirmed as final.
- **carcharodontosaurus, tarbosaurus, albertosaurus** — read as-is per the table, no ambiguity found; these
  three were never flagged "native check pending" and needed no change, only confirmation while reading the
  13 theropods aloud in sequence per the HO-013 step 7 requirement.
- **diplodocus** (not a theropod, but the ⚠️ table's flagged item most likely to matter for the NEXT wave):
  left untouched — out of scope for this theropod-only pass, correctly still flagged for whoever picks up
  the sauropod lot.

No theropod name in the 13-name list required a NEW respelling — the existing table entries for
tyrannosaurus, spinosaurus, giganotosaurus, carcharodontosaurus, allosaurus, tarbosaurus, albertosaurus,
ceratosaurus, dilophosaurus, carnotaurus, cryolophosaurus, baryonyx, and therizinosaurus were all already
present and usable as spoken text. Only `cryolophosaurus` carried a live "native check pending" flag among
these 13; resolved above. The remaining flagged entries in the lexicon (maiasaura, minmi, hatzegopteryx,
scutellosaurus, saurolophus, corythosaurus, and the non-dinosaur synapsids) belong to later HO-013 waves —
left untouched, still flagged, for those writers to resolve when their ids come up.

## Lot W5 — Marins + avant les dinos (12/71)

Ids: mosasaurus, elasmosaurus, ophthalmosaurus, liopleurodon, archelon, shonisaurus, ichthyosaurus,
dimetrodon, edaphosaurus, gorgonops, lystrosaurus, moschops. Five of the twelve are Permian synapsids
(dimetrodon, edaphosaurus, gorgonops, lystrosaurus, moschops), not dinosaurs and not even reptiles in the
marine-reptile sense — every EN script says so plainly in bloc A, following FR canon word for word on this
point, never letting the "not a dinosaur" caveat get lost in translation. The other seven are marine
reptiles (mosasaur, plesiosaur, ichthyosaurs, a pliosaur, a giant sea turtle) — also explicitly "not a
dinosaur" per FR canon, distinct from the synapsids in kind (reptiles vs. proto-mammal cousins), and each
EN script keeps that distinction clear rather than collapsing both groups into one vague "not a dinosaur"
line.

### Scale drift found: FR canon (post-HO-010) vs strings.json (pre-HO-010, stale) — RECALCULATED

Two ids in this lot had a `comp_*` field move after HO-010's size re-audit, checked against every
`comp_taille`/`comp_hauteur`/`comp_poids` bucket already in `strings.json` — no new bucket invented.

1. **archelon** `taille_m` 4.6 → 4 m (HO-010, dropped the old "Brigitta" oversized figure). FR
   `comp_taille` moved from "aussi long qu'un grand 4×4" (the 4.3-5.6 m big-SUV bucket) down one bucket to
   "comme une petite voiture" (the 3.3-4.3 m small-car bucket). `strings.json` still has the OLD
   `comp_taille: "as long as a big SUV!"` — stale, matches the retired 4.6 m figure. Fixed in
   `en/archelon.md` to "like a small car!" (the exact wording `strings.json` itself already uses for every
   other 3.3-4.3 m id in the file — ophthalmosaurus and dimetrodon in this very lot, for instance).
   **strings.json needs the same fix.** `comp_hauteur`/`comp_poids` were unaffected (1.2 m / 2.2 t
   unchanged) — kept as-is.
2. **lystrosaurus** `region` gained Russia and Mongolia (was South Africa/Antarctica/India/China only — now
   6 countries, consistent with a reunited Pangaea). This is not a `comp_*` bucket drift but a "cite every
   region" rule violation if left alone: the extracted strings.json subset only carries the old 4-country
   text. `en/lystrosaurus.md` bloc A now names all 6. **strings.json needs the same fix.**

### FR data field corrected (factual, not scale), text field not yet caught up in strings.json (flagged, not corrected — out of scope)

3. **shonisaurus** `chasseurs`: FR data now says "as an adult, no known predator — one of the biggest
   animals in its ocean" (HO-009/010 — Cymbospondylus was retired as an anachronism: it lived earlier in
   the Triassic, not contemporary with this species). `en/shonisaurus.md` bloc C follows the corrected FR
   canon ("once he was grown, he had no hunters left at all"), no rival invented. **strings.json's
   `chasseurs` field needs the same fix** if it still names Cymbospondylus.
4. **ichthyosaurus** `chasseurs`: FR data now says "the big pliosaurs of his time, like Rhomaleosaurus"
   (HO-009/010 — Liopleurodon retired as an anachronism, ~165 Mya vs. this species' ~190 Mya, a 30-40
   million year gap too wide to call contemporary — notable since Liopleurodon is ALSO a dino in this same
   lot, so the two scripts needed to stay internally consistent with each other on this exact point).
   `en/ichthyosaurus.md` bloc C names Rhomaleosaurus, not Liopleurodon. The extracted strings.json subset
   still says "Liopleurodon and the big pliosaurs" for this field — **strings.json needs the same fix**,
   this is a factual correction, not a style choice.

### New field this wave: `vitesse_kmh` (1 of 12 — lystrosaurus only)

`lystrosaurus` is the only id in this lot carrying `vitesse_kmh` (5, medium-confidence per the FR
canon's own header note). `_compVitesse(5)` falls in the FR function's BOTTOM bucket (< 5.5 km/h):
"aussi vite que toi quand tu marches" — a direct-address comparison to the child's own walking pace, not
a third-party reference like the higher buckets use. Localized as "as fast as you when you walk" — kept
the direct-address form rather than switching to a third-party "a kid walking" phrasing, since the FR
bucket itself is written in the second person and no prior EN convention for THIS bucket existed in
strings.json (the theropod wave's table only covered buckets from 7 km/h up). Conversion: 5 km/h × 0.621 =
3.105 mph → rounded to "3 miles an hour," no decimal.

| id | km/h | mph (rounded) | FR comparison | EN localization |
|---|---|---|---|---|
| lystrosaurus | 5 | 3 | toi quand tu marches | as fast as you when you walk |

### 3 most debatable localization choices

1. **"as fast as you when you walk" (lystrosaurus)** — kept the FR bucket's second-person address rather
   than converting it to a third-party comparison ("a kid walking") the way the higher-speed buckets from
   the theropod wave do (e.g. "Dad running," "a car in the city"). Debatable: it breaks the narration
   register's usual pattern of comparing the animal to something ELSE, but the FR original itself makes
   this exact choice at the bottom of the ladder (comparing to the CHILD listening, not a third party), so
   parity with FR was judged more important than internal EN consistency across buckets.
2. **archelon's dropped "Brigitta" nickname** — FR canon retired the named-individual-turtle framing
   (previously "the biggest Archelon ever found was nicknamed Brigitta, probably over 100 years old")
   post-HO-010 in favor of a cleaner leathery-shell/swimming-speed fact reused from the `desc` field. EN
   bloc D follows the corrected FR canon and does not reinvent a nickname or an age claim the FR itself no
   longer makes, even though "Brigitta" was a charming, memorable detail — judged correctly retired, not
   an EN-side loss.
3. **"a bathtub" size reference added for Liopleurodon's jaw (bloc B)** — FR says only "une mâchoire
   énorme" (an enormous jaw) with no explicit size comparison. The EN adds "the size of a bathtub" as a
   concrete image for a US 4-year-old, since "enormous" alone reads flatter in English than in French for
   this register. Debatable because it is new information not present in FR (a comparison the FR author
   chose not to make) — kept because it stays well within the honest order of magnitude for a 7-meter,
   5-metric-ton animal's jaw and matches the doctrine's "concrete, verifiable by the child" rule, but a
   stricter reading of "not a translation but not an invention either" could argue for cutting it.

### Places where the FR canon itself looks possibly at fault (flagged, not corrected — out of scope for HO-013)

- None found in this lot. All five synapsid "not a dinosaur" caveats, all seven marine-reptile
  classifications, the shonisaurus/ichthyosaurus anachronistic-predator corrections, and the
  archelon size correction were all already internally consistent within the FR `.md` files themselves —
  the only drift found was FR-vs-strings.json (documented above), not FR-vs-FR.

### Pronunciation lexicon (`i18n/lexiques-prononciation/en.md`) — entries resolved for the 12 W5 ids

Native pass on every W5 id carrying a "native check pending" / "added 2026-08-10" flag, or listed in the
⚠️ Uncertainties section. Decisions and one-line justifications below; flags removed from the table rows
for these ids only — no other lot's entries touched.

- **edaphosaurus** — kept `ed-ah-foh-SOR-us`. Plain, regular stress pattern (front syllable unstressed,
  primary stress on -SOR-), no rival popular-media reading found. Flag removed.
- **gorgonops** — kept `gor-GON-ops`. Matches how US paleontology-for-kids media and museum placards say
  it; no competing form in circulation for this less-common genus. Flag removed.
- **lystrosaurus** — LOCKED to `LIS-troh-SOR-us` (front stress) as house style, dropping the parenthetical
  alternate `lis-TROH-` the table previously carried. Front stress keeps this name consistent with how
  every other `-SOR-us` name in the table is stressed (stress on the syllable right before "-SOR-us" is
  the table's own stated default rule, section 1) — no reason for this one genus to break that pattern.
  Flag removed.
- **moschops** — kept `MOS-kops`. Single plausible English reading (Greek "moschos" → "MOS-"), no
  alternate form found anywhere in kids' media or dictionaries for this rare genus. Flag removed.
- **dimetrodon** — this entry itself had no "pending" flag, but WAS listed in the ⚠️ Uncertainties section
  grouped with Spinosaurus/Dilophosaurus over the initial "i" (eye vs. ih/ee). Since only Dimetrodon is in
  this lot, split it out of that shared bullet and LOCKED it to the "eye" form (`dye-MET-roh-don`),
  dropping the "(dih-)" alternate — "eye" is the dominant reading in US kids' science media for this
  specific genus (distinct from Spinosaurus/Dilophosaurus, which stay flagged in that section for whoever
  owns their respective waves — already resolved for dilophosaurus in the W1 theropod wave, so that bullet
  now effectively only still needs a Spinosaurus check).
- **archelon, ichthyosaurus, mosasaurus, shonisaurus, liopleurodon, elasmosaurus, ophthalmosaurus** — read
  as-is per the table, no ambiguity found; none of these seven were flagged "native check pending" or
  listed in Uncertainties, and needed no change, only confirmation while reading all 12 W5 names aloud in
  sequence per the HO-013 step 7 requirement.

No W5 name required a NEW respelling entry — all 12 ids already had usable table rows. The remaining
flagged entries elsewhere in the lexicon (hatzegopteryx, scutellosaurus, saurolophus, corythosaurus, and
any names outside the 71-dino roster) belong to other waves — left untouched, still flagged.

## Lot W3 (sauropods + thyreophorans, 15/71)

Sauropods (brachiosaurus, diplodocus, apatosaurus, camarasaurus, amargasaurus, plateosaurus, patagotitan)
and thyreophorans (ankylosaurus, euoplocephalus, edmontonia, minmi, scutellosaurus, scelidosaurus,
stegosaurus, kentrosaurus). Written per HO-013 method. Gate: 15 OK / 0 KO
(`node .../\_verif-scripts-audio.cjs en <15 ids>`).

### Scale drift found: FR canon (post-HO-010) vs `strings.json`/EN-W3.json extract (pre-HO-010, stale)

By the time this lot was written, `HO010-W3.json` (the diff of fields HO-010 changed after strings.json's
HO-006 validation) flagged 4 dinos in this lot with a comparison-relevant change. Recalculated using the
SAME bucket wording strings.json already uses elsewhere in the file for the SAME numeric bucket — no new
bucket invented, no scale distorted.

1. **edmontonia** `hauteur_m` 1.5 → 2 m (HO-010). FR `comp_hauteur` moved from "aussi haut qu'une voiture"
   (car bucket, ~1.5 m) to "aussi haut qu'une porte !" (door bucket, ~2 m). The stale EN extract still had
   "as tall as a car — you'd have to look up!". Recalculated to **"as tall as a door!"** — this exact
   phrasing already exists in `strings.json` for other 2 m dinos, confirmed by scanning the file, not
   invented. **strings.json needs the same fix.**
2. **kentrosaurus** `hauteur_m` 1.5 → 1.8 m (HO-010). FR `comp_hauteur` moved from "aussi haut qu'une
   voiture" to "aussi grand que Papa debout !" (the 1.8 m Dad-height bucket, same one `ankylosaurus` already
   uses in `strings.json` at 1.8 m). Recalculated to **"as tall as Dad standing up!"** — reused verbatim
   from ankylosaurus's existing EN entry, not invented. **strings.json needs the same fix.**
3. **kentrosaurus** `poids_t` 1 → 1.1 t (HO-010). Stayed inside the same `_compPoids` small-car band
   (0.85-1.45 t), so the EN comparison text itself does NOT change ("as heavy as a small car!") — only the
   underlying French number moved, noted for completeness, no EN text fix needed.
4. **ankylosaurus** `taille_m` 7 → 7.5 m (HO-010). Checked the FR `_compLong` bucket boundaries for 7 m vs
   7.5 m: both fall inside the same "comme deux voitures l'une derrière l'autre" band (7-10 m). No EN text
   change needed — confirmed by re-deriving the bucket, not assumed.

### New field this wave: `vitesse_kmh` (5 of 15 dinos in this lot: ankylosaurus, euoplocephalus,
scelidosaurus, stegosaurus, kentrosaurus)

No prior EN convention existed in `strings.json` for any of these five (the field postdates HO-006
validation). Converted km/h × 0.621, rounded to the nearest whole mph, never a decimal:

| id | km/h | mph (rounded) | FR comparison | EN localization |
|---|---|---|---|---|
| ankylosaurus | 7 | 4 | Papa qui marche vite | Dad walking fast |
| euoplocephalus | 7 | 4 | Papa qui marche vite | Dad walking fast |
| stegosaurus | 7 | 4 | Papa qui marche vite | Dad walking fast |
| kentrosaurus | 7 | 4 | Papa qui marche vite | Dad walking fast |
| scelidosaurus | 15 | 9 | vélo qui roule tranquille | a bike riding chill |

Four of the five thyreophorans in this lot share the identical 7 km/h data value (all slow, heavily
armored quadrupeds), which is why 4 of 5 rows above look identical — this is a genuine FR-canon
coincidence, not a copy-paste shortcut; confirmed by re-reading each `_compVitesse` header line
individually before writing.

### FR data field flagged as possibly fautif (signalled, NOT corrected — out of scope for HO-013)

- **patagotitan** `chasseurs`/`desc` (in `dinos-data.js`, NOT the audio script — the audio script already
  follows the corrected version): still claim Giganotosaurus and Mapusaurus hunted Patagotitan in packs.
  FR canon's own script header flags this as factually unconfirmed — Patagotitan (Cerro Barcino Formation,
  ~101.6 Ma) and Mapusaurus (Huincul Formation, ~96-94 Ma) are separated by 5-8 million years, not
  contemporary. The EN script (like the FR one) names no predator, framing Patagotitan's safety instead by
  the total absence of bite-mark evidence on its adult bones — a stronger, honestly-sourced fact. Someone
  should fix `dinos-data.js`'s text fields to match the audio scripts' corrected framing.
- **diplodocus** `fait` text in `strings.json`: still carries the older, more confident "sonic-boom CRACK…
  louder than an explosion" claim. FR canon (HO-011 polish) softened this to a hedged "scientists think it
  could have made a sound as loud as thunder" after a 2022 study cast doubt on the 1997 supersonic-crack
  model. Matched the FR canon's hedge in the EN script's bloc C/D. **strings.json needs the same softening**
  — this is a factual-confidence correction, not a style preference.

### 5 most debatable localization choices

1. **"Titanosaur" kept as the everyday spoken name for Patagotitan, not "Patagotitan."** FR canon uses
   "Titanosaure" as the header/everyday name throughout and only reveals "Patagotitan mayorum" as the full
   scientific name in bloc D, as a small reveal. Kept the same two-tier structure in EN rather than saying
   "Patagotitan" from the first line, to preserve the FR script's deliberate reveal beat — even though
   "Titanosaur" is a broader taxonomic term (many sauropods are titanosaurs) rather than this animal's own
   genus name. Debatable: an American 4-year-old encyclopedia might expect the specific genus name up front.
2. **Reused "Dad standing up!" for kentrosaurus verbatim from ankylosaurus's `strings.json` entry**, rather
   than writing a fresh comparison, since both now sit at the exact same recalculated 1.8 m bucket. Judged
   correct per the charter's "no new bucket invented" rule, but it does mean two different animals share
   one identical English sentence — a French ear would notice this less since "aussi grand que Papa debout"
   is a stock phrase already, but an English listener hearing both fiches back to back gets a literal repeat.
3. **Amargasaurus's neck-spike function kept as an explicit two-hypothesis, unresolved dialogue** (defense
   vs. display) rather than picking the more "exciting" single answer for a 4-year-old audience. FR canon
   treats this as a matter of intellectual honesty (leçon L-D-41: don't resolve genuine scientific
   uncertainty into a false single answer for the sake of narrative neatness) — kept the same double-answer
   structure and Wex's explicit "so how do you choose? / you don't" beat in English, even though it's a
   slightly more abstract idea for a young audience than a clean single answer would be.
4. **Minmi's escape-by-running vignette (long legs, dashing off) instead of the "flipped onto its back"
   image used elsewhere for armored dinos.** FR canon's own header explicitly avoids reusing that vignette
   here (registry rule: the flip-over image is reserved / was already used in this dino's own older
   version), replacing it with a distinct "it just ran away" beat. Matched exactly — noted because an
   English writer unfamiliar with the registry constraint might have reached for the more dramatic flip
   image instead.
5. **Scelidosaurus's naming-error joke ("rib of beef" instead of "strong legs") kept intact and unsimplified.**
   This is a fairly abstract idea for a 4-year-old (a scientist's own mistake, in a foreign language, about
   a word that sounds like another word) — but FR canon treats it as the fiche's whole comic hook in bloc A,
   so cutting or softening it for EN would have removed the fiche's main personality. Kept the joke's full
   structure ("meant to say strong legs... but wrote the word for rib of beef") rather than shortening it to
   a flatter "the name doesn't quite make sense."

### Pronunciation lexicon (`i18n/lexiques-prononciation/en.md`) — entries resolved for the 15 W3 ids

- **minmi** — kept `MIN-mee`, confirmed final: two flat unstressed-pattern syllables (a place name, Minmi
  Crossing, Australia, not Greek/Latin), no stress ambiguity for a native English reader. Flag removed.
- **scutellosaurus** — kept `skoo-TEL-oh-SOR-us`, confirmed final: `scu-` reliably reads as "skoo" to a
  native English speaker (compare "scuba"), and there is no competing popular pronunciation to weigh
  against. Flag removed.
- **diplodocus** — the lexicon's own ⚠️ Uncertainties list flagged two competing English stresses
  (`dih-PLOD-oh-kus` vs `DIP-loh-DOH-kus`). Locked house style to **`dih-PLOD-oh-kus`** (traditional,
  stress on PLOD): this is both the historically dominant American dictionary form and the one used in the
  most widely-seen US children's dinosaur media (documentaries, museum audio guides), so it is the form a
  US 4-year-old is most likely to already have heard matched against. Flag/entry removed from the ⚠️ list.
- **brachiosaurus, apatosaurus, camarasaurus, amargasaurus, plateosaurus, patagotitan, ankylosaurus,
  euoplocephalus, edmontonia, scelidosaurus, stegosaurus, kentrosaurus** — read as-is per the table, no
  ambiguity found; none of these twelve carried a "native check pending"/"added 2026-08-10" flag, so no
  change needed, only confirmation while reading the 15 W3 names aloud in sequence per the HO-013 step 7
  requirement.

The remaining flagged entries in the lexicon (edaphosaurus, gorgonops, hatzegopteryx, lystrosaurus,
moschops, saurolophus, corythosaurus, maiasaura — several already resolved by other concurrent HO-013
writers between this lot's start and its completion) belong to lots outside W3 — left untouched.

## Lot W6 (8/71) — mégafaune (post-dinosaur Cenozoic animals)

> mammuthus, smilodon, megatherium, paraceratherium, glyptodon, aenocyon, coelodonta, titanis.
> All 8 are explicitly NOT dinosaurs (mammals except titanis, a flightless bird) — every bloc A states this,
> matching the FR canon's own framing ("PAS un dinosaure — il vit APRÈS la météorite").

### Scale drift found: FR canon (post-HO-010) vs `i18n/en/strings.json`/EN-W6.json (pre-HO-010, stale)

17 FR data fields changed on 2026-09-05 (HO-010 audit) for this lot, after `strings.json` had already been
validated (HO-006). 5 of those changes moved a `_compLong`/`_compHaut`/`_compPoids` bucket and required a
recalculated EN comparison. Recalculated using the SAME bucket tables `strings.json` uses everywhere else
(scanned the whole file for the exact EN phrase per bucket band) — no new bucket invented, no scale distorted.

| id | field | FR before → after (HO-010) | old EN (stale) | new EN (this script) | bucket check |
|---|---|---|---|---|---|
| smilodon | `poids_t` | 0.25 t → 0.22 t | "as heavy as a tiger!" | "as heavy as a lion!" | 0.22 t falls in the 0.18-0.225 t band → "lion" (confirmed exact phrase used elsewhere in strings.json) |
| glyptodon | `taille_m` | 3.3 m → 3 m | "like a small car!" | "like three 4-year-olds lying end to end!" | 3 m falls in the 2.4-3.3 m band, dropping OUT of the 3.3-4.3 m "small car" band |
| coelodonta | `hauteur_m` | 1.9 m → 1.5 m | "as tall as a front door!" | "as tall as a car — you'd have to look up!" | 1.5 m falls in the 1.25-1.7 m band, dropping OUT of the 1.9-2.1 m "front door" band |
| coelodonta | `poids_t` | 2.5 t → 1.75 t | "as heavy as 5 horses!" | "as heavy as a small car and a cow put together!" | 1.75 t falls in the 1.45-1.8 t band, dropping OUT of the 2.3-2.8 t "5 horses" band |
| titanis | `poids_t` | 0.3 t → 0.15 t | "as heavy as 2 donkeys!" | "as heavy as a donkey!" | 0.15 t falls in the 0.14-0.18 t band (singular "donkey"), dropping OUT of the 0.29-0.36 t "2 donkeys" band |

`strings.json` needs all 5 of these same fixes — it was not touched (out of scope for HO-013).

One field changed but did NOT move the bucket, confirmed rather than fixed:
- **paraceratherium** `taille_m` 8 m → 7.4 m: both values fall in the SAME 7-8.5 m `_compLong` band ("like two
  cars, one behind the other!"). EN-W6.json's existing text needed no change — confirmed alignment, not a fix.

### Speed: only 1 of 8 ids carries `vitesse_kmh`

| id | km/h | mph (rounded) | FR comparison | EN localization |
|---|---|---|---|---|
| titanis | 45 (brand-new field this wave, added by orchestrator, high confidence) | 28 | cheval au galop | a galloping horse |

Conversion: km/h × 0.621, rounded to nearest whole mph, per the charter's no-decimal rule (45 × 0.621 = 27.9 → 28).
The other 7 ids in this lot have no `vitesse_kmh` field, so none of their scripts mention a speed — matches FR canon,
which also stays silent on speed for those 7.

### Text-only FR changes this lot (no bucket/number impact, carried into EN as expanded detail)

- **mammuthus** `chasseurs`: FR dropped an unsourced "cave lions" mention, now "prehistoric humans, its only real
  hunters." EN-W6.json's `chasseurs` field ("Prehistoric humans, and sometimes cave lions") was stale and NOT
  followed — this script names prehistoric humans only. **strings.json needs the same fix** (6th drift, text-only,
  not a bucket).
- **megatherium** `fait`: FR expanded the reared-up posture detail ("sa tête montait à 4 mètres") without changing
  any number in `dinos-data.js`'s structured fields. Carried the same expanded detail into the EN bloc B/D text.
- **glyptodon** `fait`: FR corrected the tail-club attribution to the cousin genus Doedicurus, not Glyptodon itself
  (was already ambiguous, now explicit). This script keeps the correct attribution in bloc D.

### 5 most debatable localization choices

1. **"Front door" bucket abandoned for coelodonta** even though the FR canon's own header note explicitly says the
   old comparison ("aussi haut qu'une porte") is what's being corrected away from — a returning reader familiar
   with the old FR script might expect "front door" to persist in EN. Kept the corrected bucket regardless, since
   HO-013's mandate is to follow FR canon (not FR memory).
2. **Megatherium's "sitting on a three-legged stool" image (bloc D)** — FR says "tabouret à trois pieds" (a
   three-legged stool), a fairly French household object description for a 4-year-old; kept the same literal image
   in English rather than substituting a more American furniture reference, since a stool reads equally well and
   concretely in both cultures without needing localization.
3. **Aenocyon's "own family, all alone" ending (bloc D)** — FR's closing line ("une famille à lui tout seul") is a
   compact idiom; rendered as "just a distant cousin, its own family, all alone" rather than the more clinical
   "a genus of its own," to keep the emotional, slightly wistful tone of the FR closing beat for a 4-year-old ear.
4. **Titanis speed bucket picked as "galloping horse" not "car in the city"** — 45 km/h sits closer to the FR
   40-48 km/h band's "cheval au galop" than the 48+ "voiture en ville" band (44.99 rounds down), so galloping
   horse was used, matching the FR `_compVitesse(45)` output exactly rather than rounding up to the next bucket.
5. **Paraceratherium bloc C "no hunter of its time was tough enough" phrasing** — FR canon deliberately avoided
   its own registry's retired "personne ne l'attaquait" motif (already used elsewhere) by rewording to "aucun
   chasseur... assez costaud." Mirrored that same avoidance in EN rather than defaulting to the more generic
   "nobody attacked it," to respect the FR script's own anti-repetition intent, not just its literal words.

### Places where the FR canon itself looks possibly at fault (flagged, not corrected — out of scope)

- **megatherium** `hauteur_m` (3.5 m in the structured field) vs the `fait` text's own claim of "4 mètres" for the
  same reared-up posture — a ~14% internal mismatch inside `dinos-data.js` between the structured height used for
  `_compHaut` and the prose height mentioned in the same entry's `fait` field. The FR canon file's own header
  flags this exact discrepancy as "écart mineur... gardé tel quel côté data (hors périmètre)." This EN script
  follows the FR script's own resolution (state 3.5 m/11 feet as the `_compHaut`-driven number in bloc B, keep the
  "4 meters" figure only in the reared-posture description, never merging the two into one claim) — noted here
  only because it is the one place in this lot where two numbers for the same measurement coexist unreconciled.
- No other factual concerns found in the FR canon for this lot; the fact-check notes in each `.md` header
  (Grokipedia cross-checks for La Brea tar pit co-occurrence, Wrangel Island mammoths, Aenocyon 2021 DNA study,
  cave paintings of Coelodonta) all read as internally consistent and well-sourced.

### Pronunciation lexicon (`i18n/lexiques-prononciation/en.md`) — entries resolved for the 8 mégafaune ids

Native pass on every flagged entry among this lot's 8 ids. All 5 previously-flagged names in this lot were
listed together in the same "⚠️ Uncertainties" paragraph (Coelodonta / Paraceratherium / Megatherium grouped,
plus Aenocyon and Titanis each on their own line) — resolved and removed from §4, confirmation note added to
each table row:

- **aenocyon** — kept `ee-NOH-see-on`. No competing popular-media form exists for this rare genus (unlike
  "dire wolf," which is a plain-English calque with no pronunciation ambiguity); the Greek-root reconstruction
  (ae→"ee", cy→"see", per the lexicon's own §1 conversion table) is the only standard form available, so there
  was nothing to weigh against it. Flag removed as "confirmed" rather than resolved-by-choice.
- **titanis** — chose `tih-TAN-is` over the alternative `TY-tan-is`. The genus is rarely spoken in popular
  media, so no dominant form exists either way; picked the stress-on-second-syllable reading because it matches
  the far more common pattern for "-is" final Greek genus names heard in English natural-history contexts
  (e.g., "Ibis," "Coelurosauravus"-type endings), rather than the front-stressed alternative which reads more
  like an invented "Ty-" (dinosaur-prefix) blend a child might mishear as related to Tyrannosaurus.
- **coelodonta** — kept `see-loh-DON-tah` as written, no change. Low-frequency name, but the "-therium"/"coelo-"
  conversions are mechanical applications of the lexicon's own §1 rules (oe→"ee", -us kept as "-us"-style Latin
  ending), leaving no real ambiguity to adjudicate once the rule table is applied consistently.
- **paraceratherium** — kept `PA-rah-SEH-rah-THEER-ee-um` as written, no change. Same reasoning as coelodonta:
  mechanical rule application (ce→"se" per the standing rule, "-therium" = "THEER-ee-um" as used for every
  other "-therium" name in the table), no competing popular form exists to weigh against it.
- **megatherium** — kept `meg-ah-THEER-ee-um` as written, no change. Same mechanical-rule reasoning; "mega-" is
  an extremely common, unambiguous English prefix (no reading besides "MEG-ah" exists in practice).

`mammuthus`, `smilodon`, and `glyptodon` (the other 3 ids in this lot) were never flagged in §4 and needed no
lexicon change — confirmed usable as-is while reading all 8 names aloud in sequence per the HO-013 step 7
requirement.

## Lot W4 — Ceratopsians + Ornithopods (12/12)

Ids: triceratops, torosaurus, protoceratops, pentaceratops, centrosaurus, pachycephalosaurus,
parasaurolophus, corythosaurus, maiasaura, saurolophus, edmontosaurus, iguanodon.

### Scale drift found: FR canon (post-HO-010) vs `strings.json`/EN-W4 extract

Unlike the theropod wave, most of this lot's scale fields were ALREADY current in the handed-over EN-W4.json
extract (the extraction for this lot appears to have been taken after HO-010, not before) — protoceratops's
`taille_m`/`hauteur_m` bump and pentaceratops's `region`/`fait` corrections were already reflected in the
extract text handed to me. Only one real drift required a manual recompute:

1. **centrosaurus** `poids_t` 2.5 → 1.8 t (HO-010). FR `comp_poids` moved from "aussi lourd que 5 chevaux" to
   "aussi lourd qu'un rhinocéros" (the `_compPoids` 1.8 t bucket). The EN-W4.json extract still carried the
   STALE "as heavy as 5 horses!" text (pre-HO-010 wording). Recalculated using the same rhino/horse bucket
   boundaries `strings.json` uses everywhere else in the file (rhino for the ~1.7-2.2 t band, horse only
   below ~0.5-1 t) — no new bucket invented. Fixed in `en/centrosaurus.md` to "as heavy as a rhino!".
   **`strings.json`'s `comp_poids` for centrosaurus needs the same fix** (still stale).

Two more fields moved in FR post-HO-010 but the EN-W4.json extract had ALREADY been updated to match — no
further action needed, confirmed only:
- **protoceratops** `taille_m` 1.9→2.2 m and `hauteur_m` 0.6→0.75 m: extract already said "as long as a
  motorcycle!" / "it would come up to your waist!" — the correct post-HO-010 comparisons.
- **pentaceratops** `region` (added "Nouveau-Mexique") and `fait` (skull "plus de 2 mètres" → "plus de
  3 mètres"): extract's `fait` text already said "over 7 feet" — consistent with the corrected 3 m+ figure.

### Speed table (new `vitesse_kmh` field, 3 of 12 ids in this lot)

All three W4 dinos carrying a speed both share the exact same FR `_compVitesse` bucket:

| id | km/h | mph (rounded) | FR comparison | EN localization |
|---|---|---|---|---|
| protoceratops | 25 | 16 | vélo qui roule bien | bike going fast |
| pentaceratops | 25 | 16 | vélo qui roule bien | bike going fast |
| centrosaurus | 25 | 16 | vélo qui roule bien | bike going fast |

Conversion: 25 km/h × 0.621 = 15.5 → rounded to nearest whole mph = 16. Same EN bucket phrase already
established by ceratosaurus/dilophosaurus in the W1 theropod wave (also 25 km/h → "bike going fast") — no new
referent invented, consistent house convention across waves.

### Places where the FR canon itself looks possibly at fault (flagged, not corrected — out of scope)

- **pentaceratops** `region`: FR text now reads "États-Unis (Nouveau-Mexique)" but the top-of-file
  traceability header in `fr/V3/pentaceratops.md` and the `continent` field both still just say "North
  America" — internally consistent, not a fault, just noting the region got more specific than the
  continent-level fields around it (expected, not a bug).
- No other FR-canon-looks-wrong findings for this lot — all 12 fiches read internally consistent between
  their FR text and the `dinos-data.js` structured fields checked.

### 3 most debatable localization choices

1. **pentaceratops region: "United States" not "New Mexico" in the spoken sentence** — FR says "au
   Nouveau-Mexique, en Amérique du Nord" (state name spoken first, natural for a French child who has less
   built-in US-geography intuition and treats "Nouveau-Mexique" as a fun exotic detail). For a US 4-year-old,
   "New Mexico" carries much less immediate recognition than "United States" — I chose to voice the country
   only ("He lived in New Mexico, in North America") rather than drop the state name outright, keeping both
   registers but trusting "United States/North America" over "New Mexico" to do the locating work a US kid
   actually uses.
2. **maiasaura kept female pronouns throughout ("she"), matching FR's "elle"** — English audio scripts for
   the rest of the corpus default to "he" for unspecified-sex dinos (matching FR's default masculine "il"),
   but Maiasaura's whole etymology and story ("good mother," her nests, her babies) is specifically about a
   mother — kept "she" consistently rather than defaulting to the corpus's usual "he," since flattening the
   sex here would blunt the entire point of the fiche.
3. **centrosaurus closing onomatopoeia ("thud, thud, thud" for FR's "boum, boum, boum")** — chose "thud"
   over a more literal "boom" because "boom" reads to an American ear as an explosion/loud-bang sound, while
   heavy sequential footsteps are conventionally "thud" in US children's media; kept the same mischievous,
   mimicable-by-a-4-year-old spirit as the FR onomatopoeia without importing a false connotation.

### Pronunciation lexicon (`i18n/lexiques-prononciation/en.md`) — entries resolved for this lot's 12 ids

- **corythosaurus** — kept `kor-ih-thoh-SOR-us`. Flag removed ("added 2026-08-10, native check pending" →
  "confirmed 2026-09-05"): the "th" stays voiced as in "thin" (not "the"), and "y→ih" reads naturally for a
  US speaker with no stress ambiguity once the CAPS-marked "SOR" carries the emphasis.
- **maiasaura** — kept `MY-ah-SOR-ah`. Flag removed: the feminine "-saura" ending is rare in English-spoken
  dino names, but "ah" at the end reads unambiguously (no risk of a US speaker reducing it to a schwa the way
  "-a" endings sometimes get flattened, because the respelling keeps it as an open, spelled-out "ah").
  Confirmed while reading the fiche aloud — "MY-ah-SOR-ah" scans naturally in the sentence rhythm of Bloc A.
- **saurolophus** — kept `sor-OL-oh-fus`, and specifically confirmed the flagged oral trap (no "para-"
  prefix, must not drift toward Parasaurolophus's sound). Read both fiches aloud back to back per HO-013 step
  7 to confirm the two names stay audibly distinct at the TTS. Flag removed.
- **parasaurolophus** — resolved the ⚠️ Uncertainties-list stress question (removed from that section
  entirely): picked the ROL-stress form already standing in the main table, `PA-rah-SOR-OL-oh-fus`/written in
  my script as "PA… rah… sor… OL… oh… fus" — this is the form most US kids'-paleontology media actually
  uses (the stress lands where an ear expects it, right before the "-lophus" crest root), over the flatter
  front-stressed alternative. No longer flagged as an open house-style question.
- **triceratops, torosaurus, protoceratops, pentaceratops, centrosaurus, pachycephalosaurus, edmontosaurus,
  iguanodon** — all read as-is per the table, none of these 8 carried a "native check pending" or
  "added 2026-08-10" flag to begin with; confirmed usable while reading the full 12-name lot aloud in
  sequence, no changes needed.

## Lot W2 — Raptors + Pterosaurs (11/71)

> velociraptor deinonychus utahraptor microraptor troodon gallimimus oviraptor archaeopteryx pteranodon
> quetzalcoatlus hatzegopteryx. Reconstructed from the 11 files' own traceability headers after this
> section was lost to a concurrent-write race on this shared file (multiple lot agents appending at once) —
> the file headers themselves are the authoritative record, nothing here is invented after the fact.

Gate: `node studio/dino/content/scripts/export/_verif-scripts-audio.cjs en velociraptor deinonychus
utahraptor microraptor troodon gallimimus oviraptor archaeopteryx pteranodon quetzalcoatlus hatzegopteryx`
→ **11 OK · 0 KO**. Remaining ⚠ are the same syllable-CAPS false positives as the rest of the corpus
(bloc A ellipsis spelling), all justified.

### Scale drift found vs strings.json — recalculated

- **utahraptor** `poids_t` 0.5 → 0.425 t (HO-010). FR `comp_poids` moved from "aussi lourd qu'un cheval"
  to "aussi lourd que 2 lions." `strings.json` still has "as heavy as a horse!" — stale. Recalculated to
  "as heavy as 2 lions!", the same bucket string strings.json already uses elsewhere for the 0.4-0.45 t
  band (confirmed against gallimimus's own comp_poids in the same lot, and others). **strings.json needs
  the same fix.**

### New field this lot: `vitesse_kmh` (HO-010/011, absent from strings.json for these ids)

| id | km/h | mph (rounded) | FR comparison | EN localization | note |
|---|---|---|---|---|---|
| deinonychus | 30 | 19 | cheval au petit galop | horse cantering | ground speed |
| troodon | 50 | 31 | voiture en ville | car in the city | ground speed |
| gallimimus | 50 | 31 | voiture en ville | car in the city | ground speed; FR notes the old "70 km/h" figure was a myth, re-audited HO-009/010 to 50 |
| pteranodon | 32 | 20 | cheval au petit galop | horse cantering | FLIGHT speed, phrased for flying not running |
| quetzalcoatlus | 90 | 56 | presque aussi vite qu'un guépard | almost as fast as a cheetah | FLIGHT speed |
| hatzegopteryx | 12 | 7 | enfant qui court | a kid running | GROUND speed (hunted on foot) — kept the FR comparison register (a kid running) rather than leading with the raw mph, since the referent, not the number, is what a 4-year-old holds onto |

Velociraptor, utahraptor, microraptor, oviraptor, archaeopteryx have no `vitesse_kmh` in data — not
mentioned, matching FR.

### Factual/taxonomy notes carried faithfully from FR (not scale, flagged where FR itself flags them)

- **gallimimus, oviraptor, archaeopteryx** are filed under the app's technical family key `raptor`
  (simplification in `dinos-data.js`) but are NOT dromaeosaurs — each script says "cousin of the raptors"
  (gallimimus/oviraptor) or "one of the very first known birds" (archaeopteryx), **never** "it's a
  dromaeosaur," matching the FR canon's own careful phrasing.
- **archaeopteryx**: FR flags that the `desc` data field still carries the outdated line calling it "the
  ancestor of all birds" (modern consensus: one of the earliest known birds, not necessarily a direct
  ancestor of modern ones). The EN script follows FR's corrected wording ("one of the very first known
  birds") throughout and does not repeat the outdated claim — **signalled, not corrected, out of scope**.
- **velociraptor, deinonychus**: the FR canon carries its own 🔒 ALERTE-JP ticket flagging that the `desc`
  data field still names a specific movie franchise, forbidden in any spoken script. Both EN scripts keep
  the "in the movies they show it bigger / featherless" demystification **without ever naming the
  franchise**, matching FR's own workaround exactly.
- **utahraptor**: pack-hunting behavior kept as an explicit, unresolved hypothesis ("scientists aren't
  sure, but it's possible"), never stated as settled fact — matching FR.
- **ichthyosaurus-adjacent naming discipline**: not applicable to this lot (that correction belongs to
  Lot W5), noted only to confirm no cross-lot leakage occurred.
- **Tritri crossover** (Wex's pet-name running gag for his favorite Triceratops) — checked per dino for
  geographic/temporal plausibility with Triceratops (North America, late Cretaceous): kept ONLY for
  **quetzalcoatlus** (same time and place, FR explicitly allows it); explicitly withheld for all other 10
  ids in this lot (wrong continent, wrong era, or FR itself doesn't use it) — each file's header states the
  reasoning per id.

### Places where the FR canon itself looks possibly at fault (flagged, not corrected)

- **archaeopteryx**: see above — `dinos-data.js`'s `desc` field (not the audio script) still calls it "the
  ancestor of all birds," a claim the FR audio script itself already avoids. Someone should update the
  `desc` field to match the more careful phrasing the scripts now use.

### Pronunciation lexicon entries tranchées (this lot's ids only)

- **hatzegopteryx** — kept `HAT-seh-gop-TER-iks`; no competing popular English form exists for this rare
  genus (discovered 2002, no established pop-media pronunciation), the mechanical Greek/Romanian-root
  respelling is the only defensible reading for a US TTS voice. Flag removed.
- **quetzalcoatlus** — kept the Nahuatl-leaning `ket-sal-koh-AT-lus` rather than a fuller anglicization,
  preserving the recognizability of the Aztec god's name (Quetzalcóatl), matching the FR canon's own
  choice to keep the name's cultural root audible rather than flattening it.
- Remaining ids in this lot (velociraptor, deinonychus, utahraptor, microraptor, troodon, gallimimus,
  oviraptor, archaeopteryx, pteranodon) were not carrying a live "native check pending" flag — confirmed
  usable as-is while reading the lot aloud per HO-013 step 7, no table changes needed.

### 2-3 debatable localization choices

1. **Quetzalcoatlus wingspan referent**: FR compares it to "un bus de Paris" (a Paris RATP bus). Localized
   as "a city bus" rather than naming a specific US transit brand — no single US city bus operator has the
   same nationwide recognition a Parisian bus has for a French child, so the referent stayed generic
   (school-bus-and-a-half scale, same order of magnitude, ~11-12 m) rather than forcing an artificial
   specific brand.
2. **Hatzegopteryx speed phrasing**: chose to keep "as fast as a kid running" (the FR referent) over
   leading with "7 miles an hour," since for a ground-hunting flying reptile the comparison carries more
   meaning to a 4-year-old than the raw number.
3. **Pteranodon/Quetzalcoatlus flight-speed framing**: both speeds are explicitly flagged in-header as
   FLIGHT speeds (not ground running), phrased with "flying" verbs in the sentence rather than reusing the
   generic "running/riding" phrasing the ground-speed comparisons use elsewhere — a small but deliberate
   departure from a literal transposition of the FR comparison object, to avoid a 4-year-old picturing a
   pterosaur running on legs at that speed.
