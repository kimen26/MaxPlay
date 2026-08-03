# Audit exhaustif des fiches dino — assets croisés

**Date : 2026-08-02** · 70 dinos (DINOS de `site/js/dinos-data.js`) · croisement disque `site/img/dinos/`, `site/audio/dinos/fr/`, sources `studio/dino/content/sources/`.

> Régénéré par `node studio/dino/content/scripts/export/_audit-fiches-complet.cjs`. État PMO de référence : `_ETAT-DINOS.md` (régénéré le même jour : **70 dinos · 70 complets · 0 incomplets** sur ses 8 axes).

> ✅ **RÉSOLUTION 2026-08-03** — les anomalies de cet audit ont été traitées (détail : `sprint-log.md` 2026-08-03 + `audit-trail.md`) : menu-fam Cénozoïque générés (EP-D-GED-08 clos) · dico 76/76 sans fallback · emblèmes 11/11 · staging `_new-*` purgé + XXL archivés · README/INVARIANTS corrigés. **2 erreurs de cet audit corrigées** : les `Amargasaurus_hypo-*` sont des slides de fiche RÉFÉRENCÉES (`dev-dinos.html:1627`), pas des orphelins ; `menu-regime.mp3` est l'intro active de l'onglet régime, pas un legacy. Reste ouvert : textes sources des 26 dinos (EP-DINO-SOURCES-TEXTES-26).

## Synthèse

- **Dinos 100% complets (hors trace, réservée au top 15) : 44/70**
- Fiches src (Grokipédia consolidé) : 46/70 · étymo : 53/70 · mesures : 46/70
- Audio fiche 5 blocs : 70/70 · nom vocal (noms/) : 70/70
- hero : 70/70
- headshot : 70/70
- manger : 70/70
- paris : 70/70
- ecosys : 70/70
- funfact : 70/70
- coloriage : 70/70
- ombre : 70/70
- sprite : 70/70
- tete : 70/70
- trace : 15/70 (top 15 : Ankylosaurus, Brachiosaurus, Carnotaurus, Diplodocus, Giganotosaurus, Mammuthus, Mosasaurus, Parasaurolophus, Pteranodon, Smilodon, Spinosaurus, Stegosaurus, Triceratops, Tyrannosaurus, Velociraptor)

## Tableau par dino (70)

Colonnes : src = fiche/étymo/mesures sources · A5 = 5 blocs audio fiche · NV = nom vocal · img = hero/head/mang/paris/eco/fun/col · ombre · spr/tete · trace (⚪ = hors top 15).

| # | id | nom | fiche | étymo | mes. | A5 | NV | hero | head | mang | paris | éco | fun | col | ombre | spr | tête | trace |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | tyrannosaurus | T-Rex | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2 | spinosaurus | Spinosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3 | giganotosaurus | Giganotosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4 | carcharodontosaurus | Carcharodontosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 5 | allosaurus | Allosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 6 | tarbosaurus | Tarbosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 7 | albertosaurus | Albertosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 8 | ceratosaurus | Cératosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 9 | dilophosaurus | Dilophosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 10 | carnotaurus | Carnotaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 11 | cryolophosaurus | Cryolophosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 12 | brachiosaurus | Brachiosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 13 | diplodocus | Diplodocus | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 14 | apatosaurus | Apatosaure (Brontosaure) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 15 | camarasaurus | Camarasaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 16 | amargasaurus | Amargasaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 17 | plateosaurus | Plateosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 18 | ankylosaurus | Ankylosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 19 | euoplocephalus | Euoplocéphale | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 20 | edmontonia | Edmontonia | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 21 | minmi | Minmi | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 22 | scutellosaurus | Scutellosaure | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 23 | stegosaurus | Stégosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 24 | kentrosaurus | Kéntrosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 25 | triceratops | Tricératops | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 26 | torosaurus | Torosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 27 | protoceratops | Protocératops | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 28 | pentaceratops | Pentacératops | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 29 | parasaurolophus | Parasaurolophus | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 30 | corythosaurus | Corythosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 31 | maiasaura | Maiasaura | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 32 | saurolophus | Saurolophe | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 33 | edmontosaurus | Edmontosaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 34 | iguanodon | Iguanodon | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 35 | pachycephalosaurus | Pachycéphalosaure | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 36 | velociraptor | Vélociraptor | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 37 | deinonychus | Deinonychus | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 38 | utahraptor | Utahraptor | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 39 | microraptor | Microraptor | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 40 | troodon | Troodon | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 41 | gallimimus | Gallimimus | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 42 | oviraptor | Oviraptor | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 43 | pteranodon | Ptéranodon | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 44 | quetzalcoatlus | Quetzalcoatlus | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 45 | hatzegopteryx | Hatzegopteryx | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 46 | archaeopteryx | Archaeoptéryx | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 47 | mosasaurus | Mosasaure | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 48 | baryonyx | Baryonyx | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 49 | therizinosaurus | Therizinosaurus | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 50 | dimetrodon | Dimétrodon | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 51 | edaphosaurus | Édaphosaure | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 52 | gorgonops | Gorgonops | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 53 | lystrosaurus | Lystrosaure | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 54 | moschops | Moschops | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 55 | elasmosaurus | Élasmosaure | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 56 | ophthalmosaurus | Ophthalmosaure | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 57 | liopleurodon | Liopleurodon | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 58 | archelon | Archélon | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 59 | shonisaurus | Shonisaure | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 60 | patagotitan | Titanosaure | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 61 | centrosaurus | Centrosaure | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 62 | ichthyosaurus | Ichtyosaure | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 63 | mammuthus | Mammouth | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 64 | smilodon | Smilodon | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 65 | megatherium | Mégathérium | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 66 | paraceratherium | Paracérathérium | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 67 | glyptodon | Glyptodon | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 68 | aenocyon | Loup terrible | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 69 | coelodonta | Rhino laineux | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |
| 70 | titanis | Titanis | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ |

## (a) Dinos avec au moins un ❌ (hors traces)

- **edmontonia** (Edmontonia) : fiche-src, etymo-src, mesures-src
- **minmi** (Minmi) : fiche-src, mesures-src
- **scutellosaurus** (Scutellosaure) : fiche-src, mesures-src
- **maiasaura** (Maiasaura) : fiche-src
- **pachycephalosaurus** (Pachycéphalosaure) : mesures-src
- **hatzegopteryx** (Hatzegopteryx) : fiche-src, etymo-src, mesures-src
- **edaphosaurus** (Édaphosaure) : mesures-src
- **gorgonops** (Gorgonops) : fiche-src, mesures-src
- **lystrosaurus** (Lystrosaure) : fiche-src, mesures-src
- **moschops** (Moschops) : fiche-src, mesures-src
- **elasmosaurus** (Élasmosaure) : fiche-src, etymo-src, mesures-src
- **ophthalmosaurus** (Ophthalmosaure) : fiche-src, etymo-src, mesures-src
- **liopleurodon** (Liopleurodon) : fiche-src, etymo-src, mesures-src
- **archelon** (Archélon) : fiche-src, etymo-src, mesures-src
- **shonisaurus** (Shonisaure) : fiche-src, etymo-src, mesures-src
- **patagotitan** (Titanosaure) : fiche-src, etymo-src, mesures-src
- **centrosaurus** (Centrosaure) : fiche-src
- **ichthyosaurus** (Ichtyosaure) : fiche-src, etymo-src, mesures-src
- **mammuthus** (Mammouth) : fiche-src, etymo-src, mesures-src
- **smilodon** (Smilodon) : fiche-src, etymo-src, mesures-src
- **megatherium** (Mégathérium) : fiche-src, etymo-src, mesures-src
- **paraceratherium** (Paracérathérium) : fiche-src, etymo-src, mesures-src
- **glyptodon** (Glyptodon) : fiche-src, etymo-src, mesures-src
- **aenocyon** (Loup terrible) : fiche-src, etymo-src, mesures-src
- **coelodonta** (Rhino laineux) : fiche-src, etymo-src, mesures-src
- **titanis** (Titanis) : fiche-src, etymo-src, mesures-src

## (b) Staging `_new-*` — contenu et action recommandée

### _new-coloriage (10)

- `Corythosaurus_coloriage.png` → dino : corythosaurus · existe déjà : paleoart/Corythosaurus_coloriage.webp
- `Edaphosaurus_coloriage.png` → dino : edaphosaurus · existe déjà : paleoart/Edaphosaurus_coloriage.webp
- `Gorgonops_coloriage.png` → dino : gorgonops · existe déjà : paleoart/Gorgonops_coloriage.webp
- `Hatzegopteryx_coloriage.png` → dino : hatzegopteryx · existe déjà : paleoart/Hatzegopteryx_coloriage.webp
- `Lystrosaurus_coloriage.png` → dino : lystrosaurus · existe déjà : paleoart/Lystrosaurus_coloriage.webp
- `Maiasaura_coloriage.png` → dino : maiasaura · existe déjà : paleoart/Maiasaura_coloriage.webp
- `Minmi_coloriage.png` → dino : minmi · existe déjà : paleoart/Minmi_coloriage.webp
- `Moschops_coloriage.png` → dino : moschops · existe déjà : paleoart/Moschops_coloriage.webp
- `Saurolophus_coloriage.png` → dino : saurolophus · existe déjà : paleoart/Saurolophus_coloriage.webp
- `Scutellosaurus_coloriage.png` → dino : scutellosaurus · existe déjà : paleoart/Scutellosaurus_coloriage.webp

### _new-headshots (10)

- `Corythosaurus_headshot.png` → dino : corythosaurus · existe déjà : paleoart/Corythosaurus_headshot.jpg
- `Edaphosaurus_headshot.png` → dino : edaphosaurus · existe déjà : paleoart/Edaphosaurus_headshot.jpg
- `Gorgonops_headshot.png` → dino : gorgonops · existe déjà : paleoart/Gorgonops_headshot.jpg
- `Hatzegopteryx_headshot.png` → dino : hatzegopteryx · existe déjà : paleoart/Hatzegopteryx_headshot.jpg
- `Lystrosaurus_headshot.png` → dino : lystrosaurus · existe déjà : paleoart/Lystrosaurus_headshot.jpg
- `Maiasaura_headshot.png` → dino : maiasaura · existe déjà : paleoart/Maiasaura_headshot.jpg
- `Minmi_headshot.png` → dino : minmi · existe déjà : paleoart/Minmi_headshot.jpg
- `Moschops_headshot.png` → dino : moschops · existe déjà : paleoart/Moschops_headshot.jpg
- `Saurolophus_headshot.png` → dino : saurolophus · existe déjà : paleoart/Saurolophus_headshot.jpg
- `Scutellosaurus_headshot.png` → dino : scutellosaurus · existe déjà : paleoart/Scutellosaurus_headshot.jpg

### _new-ombre (1)

- `Saurolophus_ombre.png` → dino : saurolophus · existe déjà : ombres/Saurolophus_ombre.png

### _new-xxl (13)

- `Dilophosaurus_manger.png` → dino : dilophosaurus · à qualifier (xxl)
- `Gallimimus_paris.png` → dino : gallimimus · à qualifier (xxl)
- `Giganotosaurus_meute_argentino.png` → dino : giganotosaurus · à qualifier (xxl)
- `Giganotosaurus_meute_diplo.png` → dino : giganotosaurus · à qualifier (xxl)
- `Mosasaurus_ecosysteme.png` → dino : mosasaurus · à qualifier (xxl)
- `Mosasaurus_manger.png` → dino : mosasaurus · à qualifier (xxl)
- `Parasaurolophus_paris.png` → dino : parasaurolophus · à qualifier (xxl)
- `Plateosaurus_paris.png` → dino : plateosaurus · à qualifier (xxl)
- `Saurolophus.png` → dino : saurolophus · à qualifier (xxl)
- `Saurolophus_ecosysteme.png` → dino : saurolophus · à qualifier (xxl)
- `Saurolophus_funfact.png` → dino : saurolophus · à qualifier (xxl)
- `Saurolophus_manger.png` → dino : saurolophus · à qualifier (xxl)
- `Saurolophus_paris.png` → dino : saurolophus · à qualifier (xxl)

## (c) Fichiers orphelins (id ne matchant aucun dino)

- paleoart : `Amargasaurus_hypo-epines.jpg`, `Amargasaurus_hypo-voile.jpg`
- ombres : aucun
- sprites : aucun
- traces : aucun
- audio fiche (5 blocs) : aucun
- audio noms/ : aucun
- grok/ : `compsognathus_lot2_1_environnement.jpg`, `compsognathus_lot2_1_sa_vie.jpg`, `gorgosaurus_inbox2_5_environnement.jpg`, `psittacosaurus_lot2_1_environnement.jpg`, `psittacosaurus_lot2_1_sa_vie.jpg`, `styracosaurus_inbox2_1_taille.jpg`, `styracosaurus_inbox2_2_sa_vie.jpg`, `styracosaurus_inbox2_3_environnement.jpg`, `styracosaurus_inbox2_4_environnement.jpg`, `styracosaurus_inbox2_5_sa_vie.jpg`, `styracosaurus_lot2_1_sa_vie.jpg`, `suchomimus_lot2_1_environnement.jpg`, `suchomimus_lot2_1_sa_vie.jpg`

> NB grok/ : les 13 « orphelins » correspondent à des dinos du **dico des racines hors DINOS** (compsognathus, gorgosaurus, psittacosaurus, styracosaurus, suchomimus — présents dans `dinos-racines.js`) — galerie gelée, pas une erreur. Les 2 `Amargasaurus_hypo-*` de paleoart sont des variantes d'hypothèse (épines vs voile), à documenter ou ranger.

## (d) Audio — couverture EL vs fallback TTS

- Fichiers totaux audio/dinos/fr/ : 454 mp3 (+ 70 dans noms/)
- 5 blocs fiche : 70/70 dinos complets → 350/350 segments
- noms/ (bonus jeux, voix courte) : 70/70
- récits : 8/8 ✅ (recit-cretace.mp3, recit-extinction.mp3, recit-glace-mammouth.mp3, recit-intro.mp3, recit-jurassique.mp3, recit-mammiferes.mp3, recit-paleo.mp3, recit-trias.mp3)
- menu-fam-* : 9/11 → **manquants : menu-fam-mammiferes.mp3, menu-fam-oiseaux.mp3** (fallback TTS navigateur)
- menu-ep-* : 8 (menu-ep-cretace.mp3, menu-ep-extinction.mp3, menu-ep-glace-mammouth.mp3, menu-ep-intro.mp3, menu-ep-jurassique.mp3, menu-ep-mammiferes.mp3, menu-ep-paleo.mp3, menu-ep-trias.mp3)
- autres menu-* : 8 (menu-accueil.mp3, menu-familles.mp3, menu-regime-carnivores.mp3, menu-regime-herbivores.mp3, menu-regime-omnivores.mp3, menu-regime-piscivores.mp3, menu-regime.mp3, menu-voyage.mp3)
- dico-* (racines étymo) : 65
- special-* : 6 (special-extinction-a.mp3, special-extinction-b.mp3, special-extinction-c.mp3, special-extinction-d.mp3, special-extinction-recap.mp3, special-pangee-recap.mp3)
- manifeste DINO_NOM_AUDIO_BY_LANG.fr : 70 ids · disque noms/ : 70 · delta manifeste−disque : ∅ · delta disque−manifeste : ∅
- manifeste DINO_FUNFACT_AUDIO_BY_LANG.fr : 70 ids · delta vs disque *-funfact.mp3 : ∅
- dico : DINO_RACINES déclare 76 racines · DICO_VOICE (dev-dinos.html) en mappe 61 · fichiers disque 65 · mappés sans fichier : ∅ · fichiers non mappés : dico-alberto.mp3, dico-edmonto.mp3, dico-mosa.mp3, dico-utah.mp3 → **15 racines sans MP3 (fallback voix « dame » TTS)**

## (e) Emblèmes familles

- DINO_FAMILLES : 11 familles · emblèmes présents : 9
- **manquants : mammiferes (Mammifères), oiseaux (Oiseaux)**

## (f) Écarts README/INVARIANTS vs disque

- sprites/README annonce « top 15 » → réalité : **70/70 dinos ont leurs 2 sprites** (140 fichiers). Doc obsolète.
- traces/ « top 15 » : confirmé, 15 fichiers (Ankylosaurus, Brachiosaurus, Carnotaurus, Diplodocus, Giganotosaurus, Mammuthus, Mosasaurus, Parasaurolophus, Pteranodon, Smilodon, Spinosaurus, Stegosaurus, Triceratops, Tyrannosaurus, Velociraptor).
- grok/ : 118 fichiers couvrant 27 dinos · wiki/ : 50 fichiers couvrant 25 dinos.
- special-* : 6 fichiers sur disque (brief en attendait 2) — 5 extinction + 1 pangée.
- menu-ep-* : 8 fichiers (brief en attendait 7) — inclut menu-ep-paleo.
- Sous-dossiers audio : `packets/pkt-00.mp3` (1) et `periodes/` (5 mp3 : trias, jurassique, cretace, cenozoique, pangee) — hors comptage des 457.

## Actions recommandées

1. **_new-coloriage, _new-headshots, _new-ombre** : les 21 PNG staging ont TOUS leur équivalent converti en prod (paleoart .webp/.jpg, ombres .png) → **purger** (ou archiver) ; ne pas oublier les `_PROGRESS.tsv`.
2. **_new-xxl** (13 PNG) : variantes XXL de slots déjà pourvus en paleoart (tous les dinos concernés ont déjà hero/manger/paris/ecosysteme/funfact en .jpg) + 2 inédits `Giganotosaurus_meute_*` (pas de slot fiche correspondant) → **décision PMO requise** : convertir en remplacement HD ou purger.
3. **Audio menu-fam manquants** (mammiferes, oiseaux) : générer les 2 MP3 EL pour supprimer le fallback TTS — cohérent avec les 9 autres familles et les 2 emblèmes manquants.
4. **Emblèmes familles** mammiferes + oiseaux à produire (9/11 présents).
5. **Dico** : 11 racines de DINO_RACINES non mappées dans DICO_VOICE (76−65) → fallback voix « dame » ; 4 MP3 disque non mappés (alberto, edmonto, mosa, utah) → les brancher ou confirmer l'écart.
6. **Sprites README** : mettre à jour « top 15 » → 70/70.
7. **Sources textes** : 24 fiches Grokipédia manquantes (batch mégalofaune + marin + 6 dinos classiques), 17 étymos et 24 mesures absentes des fichiers consolidés — voir section (a).
