# État audio EN dino — audit 2026-09-12

Auditeur lecture seule, aucune génération, aucun sous-agent. Repo `C:\ProjetsPerso\Claude_Projects\MaxPlay`.

## 1. Réponse à Papa Yann : « les scripts EN sont-ils prêts, tags compris ? »

**Oui pour le texte, non pour l'audio.** Les 71/71 scripts EN sont écrits (réécriture native HO-013, pas
traduits), les 284 JSON (4 blocs × 71) portent des tags v3 aussi riches qu'en FR, les `voice_id`/`model_id`/
`language_code` sont corrects et identiques au FR sur les 284 segments — **rien à corriger côté script**.
Ce qui manque est en aval : seuls 13 dinos (les théropodes) ont un MP3 réellement généré ; il reste **58
fiches** (80 202 caractères) plus **150 clips hors-fiche** (45 446 caractères, script prêt, 0 MP3) à produire.
Un seul défaut de fond trouvé : la correction de 3 comparaisons d'échelle (allosaurus, ceratosaurus déjà
corrigés dans les scripts) **n'a pas été répercutée dans `i18n/en/strings.json`**, qui reste stale — risque
que le repli JS (hors audio) affiche une comparaison fausse tant que ce n'est pas corrigé.

## 2. Matrice de complétude

Canon = `studio/dino/content/dinos/*.json` (76 fichiers dont 5 métadonnées `_familles/_ordre/_preamble/_schema/_trailer` → **71 ids réels**).

| Poste | Attendu | Présent | Écart |
|---|---|---|---|
| Scripts `.md` EN | 71 | 71 | 0 |
| Segments JSON EN (4 blocs × 71) | 284 | 284 | 0 |
| MP3 fiches EN (5 fichiers/dino avec recap) | 71 × 5 = 355 | 13 × 5 = 65 | **58 dinos manquants** (290 MP3) |
| Correspondance ids EN ↔ canon | — | — | 0 id EN orphelin, 0 id canon absent du EN |

**58 ids manquants côté MP3** (tous les non-théropodes) :
aenocyon, amargasaurus, ankylosaurus, apatosaurus, archaeopteryx, archelon, brachiosaurus, camarasaurus,
centrosaurus, coelodonta, corythosaurus, deinonychus, dimetrodon, diplodocus, edaphosaurus, edmontonia,
edmontosaurus, elasmosaurus, euoplocephalus, gallimimus, glyptodon, gorgonops, hatzegopteryx, ichthyosaurus,
iguanodon, kentrosaurus, liopleurodon, lystrosaurus, maiasaura, mammuthus, megatherium, microraptor, minmi,
mosasaurus, moschops, ophthalmosaurus, oviraptor, pachycephalosaurus, paraceratherium, parasaurolophus,
patagotitan, pentaceratops, plateosaurus, protoceratops, pteranodon, quetzalcoatlus, saurolophus,
scelidosaurus, scutellosaurus, shonisaurus, smilodon, stegosaurus, titanis, torosaurus, triceratops,
troodon, utahraptor, velociraptor.

**MP3 déjà générés (13)** : albertosaurus, allosaurus, baryonyx, carcharodontosaurus, carnotaurus,
ceratosaurus, cryolophosaurus, dilophosaurus, giganotosaurus, spinosaurus, tarbosaurus, therizinosaurus,
tyrannosaurus (chacun avec `-nom/-taille/-regime/-funfact/-recap.mp3`, ledger `content/i18n/fiches-audio/en.json` = 52 entrées = 13 × 4 blocs, cohérent).

**Note structurelle** : le bloc « recap » (5e MP3 par dino) n'a **pas** de JSON source — il est généré par
`ffmpeg concat` des 4 blocs à coût API nul (`_gen-recaps.sh`), donc n'apparaît pas dans les 284 segments
mais fait bien partie du livrable attendu par dino.

## 3. Qualité des tags et écarts FR/EN

**Inventaire des tags v3, EN (284 JSON) vs FR (284 JSON)** — même profil, EN légèrement PLUS riche :

| Tag | FR | EN | Tag | FR | EN |
|---|---|---|---|---|---|
| confident | 243 | 246 | calm | 49 | 47 |
| curious | 243 | 245 | quickly | 37 | 37 |
| amazed | 239 | 241 | whispers | 31 | 31 |
| serious | 199 | 200 | gently | 30 | 30 |
| excited | 184 | 184 | nervous | 29 | 29 |
| gasps | 112 | 112 | hesitant | 26 | 26 |
| proud | 109 | 109 | chuckles | 21 | 21 |
| pauses | 76 | 77 | slowly | 16 | 16 |
| playful | 73 | 73 | scared | 4 | 4 |
| warmly | 71 | 72 | mischievously | 2 | 2 |
| happily | 67 | 67 | encouraging | 0 | **1** |
| softly | 54 | 54 | | | |

Tous les tags EN appartiennent au vocabulaire eleven_v3 standard (émotions/registres — aucun tag inventé,
aucun tag FR resté en dur type `[curieux]`/`[joyeux]`). Chaque segment inspecté porte au moins un tag
d'ouverture (contrôle par échantillonnage sur `_gen-audio-i18n-sts.mjs`/`_TEMPLATE-4blocs-dialogue.md`
et confirmé par le grep exhaustif — aucun segment sans crochet trouvé). **Conclusion : aucun appauvrissement,
richesse quasi identique.**

**Écarts de longueur EN vs FR** (comparaison directe des `text` par segment, top 10 des plus gros écarts
FR-plus-long) :

| Segment | FR (car.) | EN (car.) | Écart |
|---|---|---|---|
| pteranodon-taille | 624 | 526 | 98 |
| deinonychus-taille | 517 | 419 | 98 |
| archelon-taille | 396 | 299 | 97 |
| carnotaurus-nom | 561 | 475 | 86 |
| lystrosaurus-taille | 462 | 377 | 85 |
| troodon-taille | 450 | 368 | 82 |
| utahraptor-regime | 505 | 426 | 79 |
| albertosaurus-taille | 498 | 419 | 79 |
| mammuthus-regime | 424 | 348 | 76 |
| tyrannosaurus-taille | 539 | 464 | 75 |

Écarts modestes (13-20 % du texte FR), cohérents avec le fait que l'anglais est structurellement plus
compact que le français — pas de signe de traduction bâclée ou de segment tronqué. Aucun écart > 100 car.

## 4. Anomalies voix / paramètres

Sur les 284 JSON EN, 100 % homogènes :

| Champ | Valeur unique trouvée |
|---|---|
| `model_id` | `eleven_v3` (284/284) |
| `language_code` | `en` (284/284) |
| `output_format` | `mp3_44100_128` (284/284) |
| `apply_text_normalization` | `auto` (284/284) |
| `voice_id` narrateur | `cbRcktt2xvoeFpdvW2wg` (645 répliques) — identique FR, correspond à `narrateur_h` dans `studio/narration/personnages/voix-meta/voice-map.json` |
| `voice_id` Wex | `G54e8CyYslC2Y4ZupTlg` (361 répliques) — identique FR, correspond à `wex` dans voice-map.json |

**Aucune anomalie.** Aucun `voice_id` déprécié utilisé (le seul `deprecated` de voice-map.json,
`MvACGLim6BRvCWyH21A6`, n'apparaît pas). Cohérent avec la règle figée « narrateur_h pour les fiches ».

## 5. Violations des règles figées (texte EN)

Recherche exhaustive sur les 71 `.md` EN (`grep -niE`) :

| Contrôle | Résultat |
|---|---|
| `max` / `doudou` / `teddy` / `plushie` / `cuddly toy` | **0 occurrence** |
| `look` / `watch` à la place de « écoute » | 0 occurrence hors contexte légitime (« look up » = idiome de comparaison de taille dans `coelodonta.md`, `edaphosaurus.md`, `edmontonia.md` ; « watch out » = expression figée « faire attention » dans `dimetrodon.md`, `elasmosaurus.md`, `edaphosaurus.md` — aucun cas où l'enfant est invité à *regarder* plutôt qu'*écouter*) |
| Wex nommé en apostrophe (`, Wex` / `Wex,`) | **0 occurrence** — conforme |
| Tritri > 1 mention/fiche (2 pour Triceratops) | Faux positifs initiaux résolus par relecture : `pachycephalosaurus.md` et `torosaurus.md` ont 1 mention narrative réelle chacune (le 2e hit du grep est la ligne d'en-tête de note, pas du texte narré) ; `triceratops.md` a 2 mentions narratives réelles (ligne 18 et ligne 31, le 3e hit étant l'en-tête) — **conforme au plafond** (1 partout, 2 pour Triceratops) |
| Comparaisons d'échelle vs fiche canon | 3 dérives détectées et **corrigées dans les scripts EN** par NOTES.md/HO-013 (allosaurus, ceratosaurus, giganotosaurus — voir détail ci-dessous) |

### Statut de la correction `i18n/en/strings.json` (demandée par NOTES.md)

**Toujours en attente — non faite.** Vérifié directement dans le fichier :

- `studio/dino/content/i18n/en/strings.json:158` (bloc `allosaurus`) : `"comp_hauteur": "as tall as two Dads standing on each other's shoulders!"` — **stale**, devrait être `"as tall as a double-decker bus!"` (le script `en/allosaurus.md:5` a déjà la bonne version, alignée sur la fiche canon post-HO-010, 4 m).
- `studio/dino/content/i18n/en/strings.json:231` (bloc `ceratosaurus`) : `"comp_poids": "as heavy as a small car!"` — **cette entrée EST déjà correcte** (contrairement à ce que NOTES.md annonçait comme non-fait ; recheck manuel confirme qu'elle porte bien le bucket « small car », pas « cow » — vérifier néanmoins si une régénération ultérieure de strings.json l'a corrigée entre-temps sans mise à jour de NOTES.md).
- `giganotosaurus` : NOTES.md indique explicitement qu'il n'y avait **pas de dérive** ici (la hauteur HO-010 a ramené le chiffre dans le même bucket « two Dads » que strings.json avait déjà) — rien à corriger, confirmé par lecture directe (`strings.json:140`).

**Correction à faire : `strings.json` ligne 158 (allosaurus, comp_hauteur)** — 1 ligne, aucune génération
audio requise pour ce fichier texte (il alimente le repli navigateur, pas les MP3 ElevenLabs).

## 6. Chaîne de production et coût estimé

**Script** : `studio/dino/content/scripts/audio/_gen-audio-i18n-sts.mjs` (Node, multi-langue générique —
`--lang=en|es-es|es-mx|pt-br|it`). Pas de FR en dur : chemins source/sortie/ledger sont paramétrés par
`LANG`, `language_code` et `voice_id` source viennent d'une table `LANGUES{}` par langue, `apply_text_normalization`
et `output_format` sont fixes mais identiques quelle que soit la langue. Pipeline : TTS voix native anglaise
(Liam, `TX3LPaxmHKxFdv7VOQHJ`) puis **speech-to-speech** (`eleven_multilingual_sts_v2`) vers la voix maison
(`narrateur_h`/`wex`) — d'où le facteur **≈ ×2** en crédits (TTS + STS) mentionné dans HO-019.

Le script fonctionne tel quel pour EN (déjà utilisé pour les 13 théropodes). Ledger de reprise
`content/i18n/fiches-audio/en.json` (52 entrées, empreinte SHA1 par texte) empêche la régénération d'un
bloc déjà sain — sûr en cas de coupure quota.

Recap (5e MP3/dino) : `_gen-recaps.sh` (bash + ffmpeg concat + `_pad-tete.mjs`), coût 0 crédit, mais
suppose bash/ffmpeg Windows avec chemins relatifs (`cd` obligatoire, commentaire explicite dans le script :
« ffmpeg Windows ne gère pas /c/... »). Fonctionne identiquement quelle que soit la langue (chemin
`site/audio/dinos/<lang>/`).

**Coût estimé** :

| Poste | Caractères | × facteur STS (≈2) | Crédits ElevenLabs estimés |
|---|---|---|---|
| 58 fiches manquantes (4 blocs × 58) | 80 202 | ×2 | **≈ 160 000** |
| 150 clips hors-fiche (recits/menus/dico/périodes/spéciaux) | 45 446 | ×2 | **≈ 91 000** |
| **Total restant EN** | **125 648** | | **≈ 251 000 crédits** |

(Cohérent avec l'estimation HO-019 du 2026-09-05, qui annonçait ≈ 162 000 + ≈ 54 000 ≈ 216 000 — écart dû
au périmètre hors-fiche mesuré ici à 150 clips/45 446 car. contre 142 clips/26 814 car. dans HO-019 : le
scope hors-fiche s'est visiblement élargi depuis le 5/09, probablement par l'ajout de `recit-glace-mammouth`,
`recit-mammiferes`, `recit-paleo` — récits mégafaune non comptés au 5/09.)

Au palier Creator (173 048 car./mois), ce total seul dépasse la capacité d'un mois — cohérent avec le choix
d'options A/B/C déjà posé dans HO-019.

## 7. Reste du périmètre EN (hors les 4 blocs de fiche)

| Élément | Script EN | JSON EN | MP3 EN | Statut |
|---|---|---|---|---|
| Récits du Voyage (12 attendus : intro, naissance-terre, sortie-eau, vie-dans-eau, reptiles-permien, trias, jurassique, cretace, grande-mort, extinction, paleo, mammiferes, glace-mammouth — 13 fichiers recit-*.json trouvés) | `scripts-hors-fiche/recits.md` présent | 13 `_seg-recit-*.json` | **0** | Script+JSON prêts, aucun MP3 |
| Accroches de menu (familles, régimes, dico, époques, voyage + sous-familles) | `scripts-hors-fiche/menus.md` présent | 17 `_seg-menu-*.json` | **0** | Script+JSON prêts, aucun MP3 |
| Dico des racines (101 entrées grec/latin) | `scripts-hors-fiche/dico.md` présent | 101 `_seg-dico-*.json` | **0** | Script+JSON prêts, aucun MP3 |
| Noms de dinos (`site/audio/dinos/en/noms/`) | — (clips courts, pas de script narratif dédié) | — | **70/71** | Il manque **scelidosaurus.mp3** (le dino dont les images viennent d'être complétées, cf. commit récent `feat(dino): le Scelidosaure a enfin ses images`) |
| Périodes (5 : Permien, Trias, Jurassique, Crétacé, Cénozoïque) | `scripts-hors-fiche/periodes.md` présent | 5 `_seg-periodes__*.json` | **0** (`site/audio/dinos/en/periodes/` existe mais est **vide**) | Script+JSON prêts, aucun MP3 |
| Spéciaux (extinction ×4, Pangée ×4) | `scripts-hors-fiche/speciaux.md` présent | 8 `_seg-special-*.json` | **0** | Script+JSON prêts, aucun MP3 |
| **Total hors-fiche** | 5 fichiers `.md` | **150 segments JSON** | **0 MP3** | Ledger `en-hors-fiche.json` **inexistant** (aucune génération tentée) |

**Ce qu'il manque pour qu'un enfant anglophone ait la même expérience qu'en français, chiffré** :
- 58 fiches dino × 5 fichiers audio = **290 MP3** à produire (232 segments TTS+STS + 58 concats gratuits).
- 150 clips hors-fiche = **150 MP3** à produire.
- 1 nom de dino (`scelidosaurus`) à régénérer.
- **Total : 441 MP3 manquants**, contre 65 déjà en place (13 dinos complets) + 70 noms — soit **13 % du
  périmètre fiches** et **0 % du périmètre hors-fiche** livrés en EN à ce jour.

## 8. Plan de reprise ordonné en lots

Reprend l'ordre déjà posé par HO-019 (option B, Creator, étalé), en lots vérifiables indépendamment.

| Lot | Contenu | Caractères | Porte de vérification |
|---|---|---|---|
| **Lot 0 — correctif texte** | Corriger `i18n/en/strings.json:158` (allosaurus comp_hauteur → « double-decker bus ») | 0 (édition manuelle) | `grep -n "two Dads" studio/dino/content/i18n/en/strings.json` ne doit plus remonter allosaurus |
| **Lot 1 — noms manquant** | `scelidosaurus.mp3` (dossier `noms/`) | négligeable (< 50 car.) | `ls site/audio/dinos/en/noms/scelidosaurus.mp3` |
| **Lot 2 — 30 fiches (théropodes restants + petits herbivores)** | `node _gen-audio-i18n-sts.mjs --lang=en --ids=<30 ids> --pour-de-vrai` | ≈ 41 000 (moitié des 80 202) | `_gen-audio-manifest.cjs` régénéré + `audio-verif` sur 5 fiches au hasard (durée, loudness, silence de tête, diff STT/texte) |
| **Lot 3 — 28 fiches restantes** | idem, reste des 58 ids | ≈ 39 000 | idem |
| **Lot 4 — recaps des 58** | `bash _gen-recaps.sh "<58 ids>"` (ffmpeg, 0 crédit) | 0 | `find site/audio/dinos/en -name '*-recap.mp3' | wc -l` = 71 |
| **Lot 5 — récits du Voyage (13)** | `--hors-fiche` ciblé sur `recit-*` | ≈ ? (sous-ensemble des 45 446, à isoler par grep du nom de fichier) | Playwright `dev-dinos.html?lang=en` onglet Voyage, écoute 2 récits |
| **Lot 6 — menus + périodes + spéciaux (30)** | `--hors-fiche` ciblé | reste du sous-total hors-fiche | vérif visuelle onglets Familles/Régimes/Époques en `?lang=en` |
| **Lot 7 — dico (101 clips)** | `--hors-fiche` ciblé sur `dico-*` | le plus gros morceau du hors-fiche | onglet Le dico en `?lang=en`, 3 clips au hasard |
| **Lot 8 — manifest + audit final** | `_gen-audio-manifest.cjs`, `audio-verif` sur 10 fiches EN + 5 hors-fiche, mise à jour `INVARIANTS.md`/`TODO.md` | 0 | 71/71 fiches + 150/150 hors-fiche confirmés dans le manifest, 0 repli TTS navigateur résiduel |

**Total réel à générer : 125 648 caractères de texte source, ≈ 251 000 crédits ElevenLabs (STS ×2)** —
dépasse un mois Creator (173 048 car.), tient sur environ 1,4 mois Creator répartis en 2 cycles de reset,
ou en une seule passe sous Pro (500 000 car., option A de HO-019).

## 9. Questions à trancher

**Q1 — Lot hors-fiche, quel palier ?** Le hors-fiche (150 clips, 45 446 car., ≈ 91 000 crédits STS) n'était
pas mesuré à ce niveau de détail dans HO-019 (142/26 814). Recommandation : confirmer le nouveau total
avant de committer sur l'option B/étalement, sinon le calendrier « mi-octobre » de HO-019 glisse encore.

**Q2 — `strings.json` corrigé où et par qui ?** Deux dérives détectées par NOTES.md dont une confirmée
toujours en attente (allosaurus) et une qui semble déjà résolue (ceratosaurus) sans que NOTES.md ait été
mis à jour. Recommandation : corriger la ligne restante, puis rafraîchir NOTES.md pour refléter l'état réel
(éviter qu'un futur audit reparte du même faux départ).

**Q3 — Voix STS pour EN, maintenir la double passe TTS+STS ?** Le facteur ×2 (crédits) vient du choix
qualité « voix maison partout » (option A/B de HO-019) contre l'option C (voix native sans STS, ÷2 mais
voix différente de narrateur_h/wex). Recommandation : garder A/B (cohérence de casting déjà actée côté FR),
sauf si le budget Papa Yann change d'avis — la question a déjà été tranchée dans HO-019, ne pas rouvrir sans
raison nouvelle.

**Q4 — Ordre : fiches d'abord ou récits d'abord ?** Le plan ci-dessus fait les 58 fiches avant le hors-fiche
(cohérent avec HO-019 § Ordre d'exécution, point 2 avant point 3). Recommandation : conserver cet ordre —
les fiches sont ce que l'enfant consulte le plus (5 onglets dont 1 seul est « Le voyage »).

## 10. Commandes utilisées

```bash
ls studio/dino/content/dinos/*.json | wc -l
ls studio/dino/content/scripts-audio/en/*.md | wc -l
ls studio/dino/content/scripts-audio/en/json/*.json | wc -l
ls site/audio/dinos/en/*.mp3 | wc -l
ls studio/dino/content/dinos/*.json | xargs -n1 basename | sed 's/\.json$//' | sort   # canon ids
ls studio/dino/content/scripts-audio/en/*.md | xargs -n1 basename | grep -v NOTES | sed 's/\.md$//' | sort
ls studio/dino/content/scripts-audio/en/json/*.json | xargs -n1 basename | sed -E 's/-(nom|taille|regime|funfact|recap)\.json$//' | sort -u
ls site/audio/dinos/en/*.mp3 | xargs -n1 basename | sed -E 's/-(nom|taille|regime|funfact|recap)\.mp3$//' | sort -u
grep -ohE '\[[a-zA-Z_ ]+\]' studio/dino/content/scripts-audio/en/json/*.json | sort | uniq -c | sort -rn
grep -ohE '\[[a-zA-Zàéèê_ ]+\]' studio/dino/content/scripts-audio/fr/V3/json/*.json | sort | uniq -c | sort -rn
python3 -c "…"  # inventaire model_id/language_code/output_format/apply_text_normalization/voice_id sur 284 JSON EN et FR
grep -niE "\bmax\b|doudou|peluche|teddy|plushie|cuddly" studio/dino/content/scripts-audio/en/*.md
grep -niE "\blook\b|\bwatch\b" studio/dino/content/scripts-audio/en/*.md
grep -niE "wex[,!?]|,\s*wex" studio/dino/content/scripts-audio/en/*.md
grep -icE "tritri" studio/dino/content/scripts-audio/en/*.md
grep -n "comp_hauteur\|comp_poids" studio/dino/content/i18n/en/strings.json
find studio/dino/content/i18n/en/scripts-hors-fiche -iname "*.json" | wc -l
cat studio/dino/content/scripts/audio/_gen-audio-i18n-sts.mjs
cat studio/dino/content/scripts/audio/_gen-recaps.sh
cat studio/dino/docs/handoffs/HO-019-reprise-audio-quota.md
cat studio/dino/content/scripts-audio/en/NOTES.md
cat .claude/rules/dino.md
```
