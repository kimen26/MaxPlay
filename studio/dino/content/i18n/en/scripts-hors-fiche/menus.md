# Scripts audio EN — Menus hors fiche (accroches familles, régimes, onglets)

> Localized from FR canon (HO-018 lot A). Native rewrite, not translation. Voice: Narrateur H (mono) for families/regimes/tabs, single voice — no Wex in this file except where a tab intro naturally needs a beat (none do here, family/regime hooks stay single-voice like the FR canon: Narrateur H only reads these, per `_ACCROCHES-MENU-FAMILLES-REGIMES.md`).
> Tags per `_verif-scripts-audio.cjs` TAGS_OK, density rules applied (>70 char -> 2 tags incl. 1 mid; >140 -> 3).
> Names: plain English form from `i18n/lexiques-prononciation/en.md` (no syllable hyphens outside audio-only context — these are UI accroches, plain form kept).

---

## Familles (11) — menu-fam-<id>

### menu-fam-trex
**NARRATEUR H** [excited] : Theropods! [curious] "Thero" means wild beast, [pauses] "pod" means foot. [happily] The two-legged hunter kings — nothing but meat on the menu!

### menu-fam-cou_long
**NARRATEUR H** [excited] : Sauropods! [curious] "Sauro" means lizard, [pauses] "pod" means foot. [amazed] The giants with necks longer than a giraffe, munching away way up high!

### menu-fam-arme
**NARRATEUR H** [excited] : Thyreophorans! [curious] "Thyreo" means shield, [pauses] "phore" means carrier. [playful] Knights in armor… who only eat plants!

### menu-fam-cornu
**NARRATEUR H** [excited] : Ceratopsians! [curious] "Cerat" means horn, [pauses] "ops" means face. [confident] The horned ones — experts at skewering trouble!

### menu-fam-bec
**NARRATEUR H** [excited] : Ornithopods! [curious] "Ornitho" means bird, [pauses] "pod" means foot. [happily] Duck-billed grazers who travel in great big herds!

### menu-fam-raptor
**NARRATEUR H** [excited] : Dromaeosaurs! [curious] "Dromaeo" means fast runner, [pauses] "saur" means lizard. [playful] The little claw-footed ninjas — smart and quick!

### menu-fam-pterosaures
**NARRATEUR H** [excited] : Pterosaurs! [curious] "Ptero" means wing, [pauses] "saur" means lizard. [amazed] Wings of skin like giant bats — the biggest one, as wide as a small plane!

### menu-fam-enaliosaures
**NARRATEUR H** [excited] : Enaliosaurs! [curious] "Enalio" means of the sea, [pauses] "saur" means lizard. [serious] Not dinosaurs at all — giant reptiles of the OCEAN!

### menu-fam-volant
**NARRATEUR H** [excited] : Before the dinosaurs! [curious] This one, Dimetrodon, lived way BEFORE the dinosaurs — [amazed] a cousin of mammals, just like you!

### menu-fam-mammiferes
**NARRATEUR H** [happily] : Mammals! [curious] Furry animals whose moms make milk — [amazed] just like you! [pauses] Here: the mammoth and the saber-tooth cat!

### menu-fam-oiseaux
**NARRATEUR H** [happily] : Birds! [curious] The little cousins of the dinosaurs — [amazed] the only ones still around! [pauses] Meet Titanis, the terror bird!

---

## Régimes (4) — menu-regime-<cat>

### menu-regime-carnivores
**NARRATEUR H** [serious] : The… MEAT-EATERS! [pauses] "Carni," in Latin, means meat. [curious] "Vore" means to devour! [mischievously] The meat devourers!

### menu-regime-herbivores
**NARRATEUR H** [happily] : The plant-eaters! [curious] "Herbi" means grass, plants. [pauses] "Vore" means to devour! [playful] Giant salad devourers — gulp, whole leaves and all!

### menu-regime-piscivores
**NARRATEUR H** [excited] : The fish-eaters! [curious] "Pisci," in Latin, means fish! [amazed] Splash — they gulp down fish whole, no fork needed!

### menu-regime-omnivores
**NARRATEUR H** [happily] : The eat-everything ones! [curious] "Omni" means everything! [pauses] They eat a bit of everything… [amazed] just like little humans. Just like YOU!

---

## Onglets (6) — menu-<mode>

> 4 accroches déjà en MP3 FR (`menu-accueil`, `menu-regime`, `menu-familles`, `menu-voyage`) + 2 nouvelles (époques, dico) jamais produites en FR — texte source = `T('menu_epoque_intro')` / `tts_fallback_dico`, adapté en dialogue accroche.

### menu-accueil
> ⚠️ AMBIGUÏTÉ DE SOURCE : `menu-accueil.mp3` existe côté FR (`site/audio/dinos/fr/menu-accueil.mp3`) mais aucun texte source FR n'est présent nulle part dans le repo (ni `MENU_FALLBACK`, ni scripts-audio, ni git history — cherché). Le mode `accueil` n'est même plus appelé par `setMode()` dans le code actuel (seuls regime/famille/periode/epoque/dico le sont). Probable orphelin d'une ancienne version du menu. NON ÉCRIT — voir rapport.

### menu-regime
**NARRATEUR H** [happily] : Dinosaurs didn't all eat the same thing! [curious] Meat-eaters ate meat. [pauses] Plant-eaters ate plants.

### menu-familles
**NARRATEUR H** [excited] : The great dinosaur families!

### menu-voyage
**NARRATEUR H** [excited] : The great journey through time! [amazed] We're going way, way back, [pauses] all the way from the first life on Earth to today.

### menu-epoques
**NARRATEUR H** [happily] : Dinosaurs didn't all live at the same time! [curious] We sort them by time period, [pauses] from the oldest all the way to today.

### menu-dico
**NARRATEUR H** [curious] : Dino names are made of little science words! [happily] Tap a word [pauses] to hear it.
