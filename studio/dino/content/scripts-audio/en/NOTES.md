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
