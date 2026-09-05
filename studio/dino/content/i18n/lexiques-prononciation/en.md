# Dinosaur name pronunciation lexicon — English (for ElevenLabs eleven_v3)

> **Language:** English (voice target: **Native English**).
> **Method:** English **respelling** (how a native English speaker actually says the name). This is spoken text only — it is **fed to the TTS engine, never displayed** on screen. So we may deform the spelling freely to get the right sound.
> **Stress marking:** English is a stress-timed language, so the **stressed syllable is written in CAPITALS**. Syllables are separated by hyphens. Example: Tyrannosaurus → **tie-RAN-oh-SOR-us**.
> Sibling of the FR lexicon `fr.md` (same intent, English conventions).

---

## 1. Conversion rules (apply to every Greek/Latin root)

English inherits the traditional "anglicized Latin/Greek" pronunciation of scientific names. Core substitutions:

| Scholarly spelling | English sound | Respell as | Example |
|--------------------|---------------|------------|---------|
| `-saurus` | "SOR-us" (secondary stress on SOR) | **-SOR-us** | Tyranno-**SOR-us** |
| `ch` (Greek) | hard "k" | **k** | Bra-**k**io, Car-**k**aro |
| `ph` | "f" | **f** | Dilo-**f**o, Pachyce-**f**alo |
| `th` | "th" as in *thin* (unvoiced) | **th** (keep) | Ich-**th**yo, Or-ni-**th** |
| `y` (Greek) | short "i" (as in *hit*) or "eye" when stressed open | **ih** / **eye** | Pak-**ih**, Bar-**eye**-on-iks |
| `x` final | "ks" | **ks** / **iks** | Baryon-**iks**, Archaeopter-**iks** |
| `ae` / `oe` | "ee" or "eh" (traditional English: often "ee") | **ee** / **eh** | Arkee-op, Ee-op-lo |
| `ei` (Greek) | "eye" | **eye** | D-**eye**-non, D-**eye**-metro |
| `-us` final (Latin) | "us" (as in *bus*), never dropped | **-us** | Gallimim-**us** |
| `eu-` initial | "you" | **yoo** | **yoo**-op-lo, **yoo**-oh-plo |
| `oo` (as in Troodon) | two separate o's "TROH-oh" | **-OH-oh-** | TROH-oh-don |
| stress default | Greek/Latin names usually stress the antepenult, but `-saurus` names put primary stress on the syllable **before** "-saurus" | mark in CAPS | tie-RAN-oh-SOR-us |

**Notes on English habits:**
- Silent/soft initial clusters: `Pt-` → the "p" is **silent** in English (Pteranodon → "teh-RAN-oh-don"). `Ps-`, `Gn-`, `Mn-` similarly drop the first consonant.
- `qu` → "kw" or "k" depending on the name (Quetzalcoatlus keeps the Nahuatl-ish "ket-sal").
- Double vowels and hiatus (Troodon, Ouranosaurus) get two beats, not a diphthong.

---

## 2. The 70 species — English respelling table

Stress = CAPS. Hyphens split syllables for the TTS.

| id | scientific name | WRITE FOR TTS (English respelling) | trap |
|----|-----------------|-------------------------------------|------|
| aenocyon | Aenocyon | **ee-NOH-see-on** | ae→ee, cy→see; dire wolf genus, rare name — confirmed 2026-09-05 |
| albertosaurus | Albertosaurus | **al-BUR-toh-SOR-us** | straightforward |
| allosaurus | Allosaurus | **AL-oh-SOR-us** | stress front |
| amargasaurus | Amargasaurus | **ah-MAR-gah-SOR-us** | Spanish-origin "Amarga" |
| ankylosaurus | Ankylosaurus | **ang-KY-loh-SOR-us** (ang-KEE-loh-SOR-us) | y = "ih/ee"; k not "s" |
| apatosaurus | Apatosaurus | **ah-PAT-oh-SOR-us** | stress on PAT |
| archaeopteryx | Archaeopteryx | **ar-kee-OP-ter-iks** | ch→k, ae→ee, final x→iks |
| archelon | Archelon | **AR-keh-lon** | ch→k |
| baryonyx | Baryonyx | **bar-ee-ON-iks** | y→"ih"/"ee", x→iks |
| brachiosaurus | Brachiosaurus | **BRAK-ee-oh-SOR-us** | ch→k |
| camarasaurus | Camarasaurus | **KAM-ah-rah-SOR-us** | stress front |
| carcharodontosaurus | Carcharodontosaurus | **kar-KAR-oh-DON-toh-SOR-us** | ch→k twice |
| carnotaurus | Carnotaurus | **KAR-noh-TOR-us** | -taurus = "TOR-us" |
| centrosaurus | Centrosaurus | **SEN-troh-SOR-us** | c→"s" before e |
| ceratosaurus | Ceratosaurus | **seh-RAT-oh-SOR-us** | c→"s" before e |
| coelodonta | Coelodonta | **see-loh-DON-tah** | oe→"ee" (woolly rhino) — confirmed 2026-09-05 |
| corythosaurus | Corythosaurus | **kor-ih-thoh-SOR-us** | th kept, y→"ih" — confirmed 2026-09-05 |
| cryolophosaurus | Cryolophosaurus | **kry-oh-LOH-foh-SOR-us** (kree-) | ph→f, y→"ih/ee" |
| deinonychus | Deinonychus | **dye-NON-ih-kus** | ei→"eye", ch→k, y→"ih" |
| dilophosaurus | Dilophosaurus | **dye-LOH-foh-SOR-us** (dih-) | ph→f |
| dimetrodon | Dimetrodon | **dye-MET-roh-don** | not a dinosaur but keep std — confirmed 2026-09-05, "eye" form locked as house style (the dominant reading in US kids' science media), the "dih-" alternate dropped |
| diplodocus | Diplodocus | **dih-PLOD-oh-kus** | confirmed 2026-09-05 — house style locked to the traditional stress (PLOD); DIP-loh-DOH-kus dropped as an alternate, matches the most common US children's-media reading |
| edaphosaurus | Edaphosaurus | **ed-ah-foh-SOR-us** | ph→f; Permian synapsid, not a dinosaur — confirmed 2026-09-05, plain stress pattern, no ambiguity for a US reader |
| edmontonia | Edmontonia | **ed-mon-TOH-nee-ah** | straightforward |
| edmontosaurus | Edmontosaurus | **ed-MON-toh-SOR-us** | straightforward |
| elasmosaurus | Elasmosaurus | **ee-LAZ-moh-SOR-us** | s→"z" between vowels |
| euoplocephalus | Euoplocephalus | **YOO-oh-ploh-SEF-ah-lus** | eu→"yoo", ph→f, ce→"se" |
| gallimimus | Gallimimus | **GAL-ih-MY-mus** (GAL-ih-MEE-mus) | -mimus = "MY-mus" |
| giganotosaurus | Giganotosaurus | **jig-ah-NOH-toh-SOR-us** (GIG-) | soft g "j"; NOT "giganTO" |
| glyptodon | Glyptodon | **GLIP-toh-don** | y→"ih" |
| gorgonops | Gorgonops | **gor-GON-ops** | g hard; Permian gorgonopsian, not a dinosaur — confirmed 2026-09-05, matches the standard English zoology-media pronunciation, no rival form in circulation |
| hatzegopteryx | Hatzegopteryx | **HAT-seh-gop-TER-iks** | Romanian Hațeg ≈ "ha-TSEG"; giant pterosaur, y→"ih", x→iks — confirmed 2026-09-05 (HO-013 lot W2): no competing popular English form exists for this rare genus, the mechanical Greek/Romanian-root respelling is the only defensible reading for a US TTS voice |
| ichthyosaurus | Ichthyosaurus | **IK-thee-oh-SOR-us** | ch→k, th kept, y→"ee" |
| iguanodon | Iguanodon | **ig-WAH-noh-don** (ih-GWAH-) | gua→"gwah" |
| kentrosaurus | Kentrosaurus | **KEN-troh-SOR-us** | straightforward |
| liopleurodon | Liopleurodon | **LYE-oh-PLOOR-oh-don** (lee-oh-) | eu→"oor" |
| lystrosaurus | Lystrosaurus | **LIS-troh-SOR-us** | y→"ih"; Permian survivor, not a dinosaur — confirmed 2026-09-05, front stress locked as house style, the alternate "lis-TROH-" dropped (front stress is the more common US science-media reading, keeps parity with how -SOR-us names are stressed elsewhere in this table) |
| maiasaura | Maiasaura | **MY-ah-SOR-ah** | feminine -saura ("good mother lizard") — confirmed 2026-09-05 |
| mammuthus | Mammuthus | **MAM-uh-thus** | th kept (mammoth genus) |
| megatherium | Megatherium | **meg-ah-THEER-ee-um** | th kept; giant ground sloth — confirmed 2026-09-05 |
| microraptor | Microraptor | **MY-kroh-RAP-tor** | micro→"MY-kroh" |
| minmi | Minmi | **MIN-mee** | Australian place name (Minmi Crossing), not Greek/Latin — confirmed 2026-09-05, two flat syllables, no stress ambiguity |
| mosasaurus | Mosasaurus | **MOH-sah-SOR-us** | -us not dropped |
| moschops | Moschops | **MOS-kops** | ch→k (Greek *moschos*); Permian therapsid, not a dinosaur — confirmed 2026-09-05, single plausible reading, no competing form found |
| ophthalmosaurus | Ophthalmosaurus | **off-THAL-moh-SOR-us** | ph→f, th kept |
| oviraptor | Oviraptor | **OH-vih-RAP-tor** | straightforward |
| pachycephalosaurus | Pachycephalosaurus | **PAK-ee-SEF-ah-loh-SOR-us** | ch→k, ph→f, ce→"se", y→"ee" |
| paraceratherium | Paraceratherium | **PA-rah-SEH-rah-THEER-ee-um** | ce→"se", th kept — confirmed 2026-09-05 |
| parasaurolophus | Parasaurolophus | **PA-rah-SOR-OL-oh-fus** (par-ah-saw-ROL-) | ph→f; stress on ROL — see ⚠️ |
| patagotitan | Patagotitan | **PA-tah-goh-TYE-tan** | -titan = "TYE-tan" |
| pentaceratops | Pentaceratops | **PEN-tah-SEH-rah-tops** | ce→"se" |
| plateosaurus | Plateosaurus | **PLAT-ee-oh-SOR-us** (PLAY-tee-) | ate→"at"/"ate" |
| protoceratops | Protoceratops | **proh-toh-SEH-rah-tops** | ce→"se" |
| pteranodon | Pteranodon | **teh-RAN-oh-don** | Pt→silent p |
| quetzalcoatlus | Quetzalcoatlus | **ket-sal-koh-AT-lus** | Nahuatl root; qu→"k", tz→"ts" |
| saurolophus | Saurolophus | **sor-OL-oh-fus** | ph→f; ⚠️ oral trap: NO "para-" prefix (≠ Parasaurolophus) — confirmed 2026-09-05 |
| scutellosaurus | Scutellosaurus | **skoo-TEL-oh-SOR-us** | scu→"skoo", ll→l — confirmed 2026-09-05, only one plausible English reading |
| shonisaurus | Shonisaurus | **SHOH-nih-SOR-us** | sh kept |
| smilodon | Smilodon | **SMY-loh-don** | i→"eye" (sabre-tooth cat) |
| spinosaurus | Spinosaurus | **SPY-noh-SOR-us** (SPEE-noh-) | i→"eye"/"ee" |
| stegosaurus | Stegosaurus | **STEG-oh-SOR-us** | straightforward |
| tarbosaurus | Tarbosaurus | **TAR-boh-SOR-us** | straightforward |
| therizinosaurus | Therizinosaurus | **THER-ih-ZEEN-oh-SOR-us** (theh-RIZ-ih-noh-) | th kept; stress varies — see ⚠️ |
| titanis | Titanis | **tih-TAN-is** | "terror bird" genus, rare — confirmed 2026-09-05 |
| torosaurus | Torosaurus | **TOR-oh-SOR-us** | straightforward |
| triceratops | Triceratops | **try-SEH-rah-tops** | c→"s" before e |
| troodon | Troodon | **TROH-oh-don** | oo = two beats, not "oo" as in *moon* |
| tyrannosaurus | Tyrannosaurus | **tie-RAN-oh-SOR-us** | classic; -us not dropped |
| utahraptor | Utahraptor | **YOO-tah-RAP-tor** | Utah→"YOO-tah" |
| velociraptor | Velociraptor | **veh-LOS-ih-RAP-tor** | ci→"si" |

---

## 3. Names that read well as-is (English speakers usually get them right)

These rarely need respelling — a Native English voice tends to say them correctly from the spelling alone. Still, the table above is safer for the TTS:

Allosaurus · Albertosaurus · Stegosaurus · Kentrosaurus · Tarbosaurus · Edmontosaurus · Torosaurus · Triceratops · Velociraptor · Oviraptor · Microraptor · Mosasaurus · Tyrannosaurus · Brachiosaurus · Ankylosaurus (mostly) · Spinosaurus.

> When in doubt → respell. It costs nothing since the text is never shown. Confirm with a grouped preview clip before mass production.

---

## 4. ⚠️ Uncertainties (flag for a native-speaker human check — do NOT treat as final)

English has **multiple competing "correct" pronunciations** for many dinosaur names (dictionaries, paleontologists, and popular media disagree). The following are the ones I would validate with a human before locking:

- **Therizinosaurus** — stress placement varies widely (**THER-ih-ZEEN-oh-** vs **theh-RIZ-ih-noh-**). Long name, worth a listen test.
- **Giganotosaurus** — very commonly MIS-said as "giganTOsaurus" (confusing with "giganto-"). Correct is **jig-ah-NOH-toh-SOR-us** ("giga-NOTO-", from Greek *notos* = south). Flag so the voice doesn't drift to the wrong one.
- **Ankylosaurus** `y` — I wrote **ang-KY-loh-** ("ky" = "kih/kigh"); the very common casual form is **ang-KEE-loh-**. Either reads fine; pick one.
- **Spinosaurus / Dilophosaurus** initial `i` — English wavers between "eye" (SPY-, DYE-) and "ih/ee" (SPEE-, dih-). I defaulted to the "eye" forms (most common in English media); confirm preference.
- **Quetzalcoatlus** — Nahuatl origin; English speakers approximate it many ways. **ket-sal-koh-AT-lus** is the widely-used anglicization; a purist rendering would differ.

**Rule kept:** where no single established English form exists, I gave the most standard reconstruction AND flagged it here rather than inventing a confident-sounding but unverified pronunciation.

---

_Created for MaxPlay dino encyclopedia — English TTS name lexicon. Spoken text only, never displayed. Validate the ⚠️ list with a native English speaker via a grouped preview clip before mass audio production._
