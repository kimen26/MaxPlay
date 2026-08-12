# Лексикон произношения — noms de dinos en RUSSE (русский) pour ElevenLabs (eleven_v3)

> **Langue cible : russe (русский).** Voix TTS : **Native Russian**.
> **Méthode : écriture native cyrillique + nom établi.** Le russe translittère systématiquement les noms scientifiques selon des conventions stables : **`-saurus` → `-завр`** (Tyrannosaurus → **тираннозавр**), `-ceratops` → **-цератопс**, etc. Quelques créatures ont un nom vernaculaire établi (Mammuthus → **мамонт**).
> **Ce lexique sert à générer l'AUDIO TTS avec une voix native russe. Le texte parlé (cyrillique) n'est JAMAIS affiché à l'écran** — c'est uniquement l'entrée que lit la voix.
> **PAS de tirets de syllabation** (décision projet : une voix native russe lit le mot d'un trait, l'accent tonique est géré par le moteur).
> Forgé sur le gabarit FR [`fr.md`](fr.md) et EN [`en.md`](en.md).
> **Draft LLM validé par croisement (DeepSeek V4-Pro ↔ Grok 4.3, 2026-08-11), relecture native humaine à prévoir.**

---

## 1. Règles de conversion (racines grec/latin → cyrillique)

Le russe possède une tradition fixe de translittération des noms paléontologiques. Règle maîtresse : **`-saurus` → `-завр`** (le `-us` final tombe). Le reste suit des correspondances phonétiques stables :

| Graphie savante | Rendu russe | Exemple |
|-----------------|-------------|---------|
| `-saurus` (final) | **-завр** (le -us tombe) | тиранно-**завр**, алло-**завр** |
| `-saura` (féminin) | **-завра** | майа-**завра** |
| `-taurus` | **-тавр** | карно-**тавр** |
| `ch` (grec, = /k/) | **х** | бра**х**иозавр, кар**х**ародонтозавр, ар**х**еоптерикс |
| `ph` | **ф** | дило**ф**озавр, о**ф**тальмозавр |
| `th` | **т** | **т**еризинозавр, мега**т**ерий |
| `y` (grec) | **и** | бар**и**оникс, анк**и**лозавр |
| `c` devant e/i | **ц** (/ts/) | **ц**ентрозавр, три**ц**ератопс, вело**ц**ираптор |
| `c` devant a/o/u | **к** | **к**амаразавр |
| `x` final | **-кс** | бариони-**кс**, археоптери-**кс** |
| `ae` | **э / е** | **э**ноцион, арх**е**о- |
| `oe` | **е** | ц**е**лодонта |
| `eu-` / `-eu-` | **эу** (initial) / **ев** (devant consonne) | **эу**оплоцефал, лиопл**ев**родон |
| `-us` final (hors -saurus) | tombe (muet) | диплодо**к**, дейнони**х**, галлими**м** |
| `-ops` final | **-опс** | трицерат-**опс**, горгон-**опс** |
| `-don` / `-odon` | **-дон** | игуано-**дон**, глипто-**дон** |
| `Pt-` initial | **птер-** (le п SE PRONONCE, contrairement à l'anglais) | **п**теранодон |
| `qu` / `tz` | **к** / **ц** | **к**е**ц**алькоатль |
| `sh` | **ш** | **ш**онизавр |
| `g` | **г** toujours dur (jamais /дж/ comme en anglais) | **г**и**г**анотозавр, **г**ор**г**онопс |
| `h` | **х** (ou amuï) | **х**ацегоптерикс |
| `oo` | **оо** (deux voyelles) | тр**оо**дон |

**Notes de prononciation russe :**
- Le **g est toujours dur** : гиганотозавр se dit « gui-ga-no- », jamais « dji- ». Pas de piège anglais ici.
- **ПТ- initial se prononce entièrement** (п + т), à la différence de l'anglais qui amuït le p de *Pteranodon*.
- L'**accent tonique russe est libre** et non marqué à l'écrit — la voix native le place correctement ; inutile de le forcer (décision projet : pas de tirets ni de majuscules d'accent).
- Quelques noms vernaculaires priment sur la translittération : Mammuthus → **мамонт** (mammouth), jamais « маммутус » dans la littérature jeunesse.

---

## 2. Table des 70 dinos — forme cyrillique (lue par le TTS)

> **Donner au moteur TTS la colonne « Écrire pour le TTS ».** ⚠ = à faire valider par un natif (voir §4).

| id | Nom scientifique | Écrire pour le TTS | note |
|----|------------------|--------------------|------|
| aenocyon | Aenocyon | **эноцион** | ⚠ — à relire natif : loup géant (dire wolf), nom rare sans usage jeunesse stable |
| albertosaurus | Albertosaurus | **альбертозавр** | direct |
| allosaurus | Allosaurus | **аллозавр** | direct |
| amargasaurus | Amargasaurus | **амаргазавр** | nom espagnol (La Amarga) translittéré |
| ankylosaurus | Ankylosaurus | **анкилозавр** | y → и |
| apatosaurus | Apatosaurus | **апатозавр** | direct |
| archaeopteryx | Archaeopteryx | **археоптерикс** | oiseau primitif ; ch → х, x → кс ; ultra-établi |
| archelon | Archelon | **архелон** | tortue marine géante ; ch → х |
| baryonyx | Baryonyx | **барионикс** | y → и, x → кс |
| brachiosaurus | Brachiosaurus | **брахиозавр** | ch → х |
| camarasaurus | Camarasaurus | **камаразавр** | piège graphique : PAS « камеразавр » (coquille fréquente) |
| carcharodontosaurus | Carcharodontosaurus | **кархародонтозавр** | ch → х (2 fois) |
| carnotaurus | Carnotaurus | **карнотавр** | -taurus → -тавр |
| centrosaurus | Centrosaurus | **центрозавр** | c devant e → ц |
| ceratosaurus | Ceratosaurus | **цератозавр** | c devant e → ц |
| coelodonta | Coelodonta | **целодонта** | oe → е ; rhinocéros laineux (mammifère) ; nom du genre, le nom vernaculaire est шерстистый носорог |
| corythosaurus | Corythosaurus | **коритозавр** | th → т, y → и |
| cryolophosaurus | Cryolophosaurus | **криолофозавр** | ph → ф |
| deinonychus | Deinonychus | **дейноних** | ei → ей, -chus → -их |
| dilophosaurus | Dilophosaurus | **дилофозавр** | ph → ф |
| dimetrodon | Dimetrodon | **диметродон** | synapside permien, pas un dino |
| diplodocus | Diplodocus | **диплодок** | -us tombe ; forme russe établie courte |
| edaphosaurus | Edaphosaurus | **эдафозавр** | ph → ф ; synapside permien, pas un dino |
| edmontonia | Edmontonia | **эдмонтония** | lieu canadien translittéré |
| edmontosaurus | Edmontosaurus | **эдмонтозавр** | direct |
| elasmosaurus | Elasmosaurus | **эласмозавр** | plésiosaure (reptile marin) |
| euoplocephalus | Euoplocephalus | **эуоплоцефал** | eu → эу, ph → ф, -us tombe |
| gallimimus | Gallimimus | **галлимим** | -us tombe |
| giganotosaurus | Giganotosaurus | **гиганотозавр** | г dur (PAS « джи- ») |
| glyptodon | Glyptodon | **глиптодон** | y → и ; mammifère cuirassé |
| gorgonops | Gorgonops | **горгонопс** | г dur ; gorgonopsien permien, pas un dino |
| hatzegopteryx | Hatzegopteryx | **хацегоптерикс** | h → х, tz → ц, y → и, x → кс ; ptérosaure géant (Hațeg, Roumanie) |
| ichthyosaurus | Ichthyosaurus | **ихтиозавр** | ch → х, th → т ; reptile marin ; ultra-établi |
| iguanodon | Iguanodon | **игуанодон** | direct |
| kentrosaurus | Kentrosaurus | **кентрозавр** | direct |
| liopleurodon | Liopleurodon | **лиоплевродон** | -eu- → -ев- ; pliosaure (reptile marin) |
| lystrosaurus | Lystrosaurus | **листрозавр** | y → и ; synapside survivant du Permien, pas un dino |
| maiasaura | Maiasaura | **майазавра** | ⚠ — à relire natif : -saura féminin → -завра ; variante concurrente « майязавра » |
| mammuthus | Mammuthus | **мамонт** | nom vernaculaire établi (mammouth) — jamais « маммутус » en littérature jeunesse |
| megatherium | Megatherium | **мегатерий** | th → т, -ium → -ий ; paresseux géant (mammifère) |
| microraptor | Microraptor | **микрораптор** | direct |
| minmi | Minmi | **минми** | nom de lieu australien (Minmi Crossing), translittération directe |
| mosasaurus | Mosasaurus | **мозазавр** | s intervocalique → з ; reptile marin ; ultra-établi |
| moschops | Moschops | **мосхопс** | ch → х ; thérapside permien, pas un dino |
| ophthalmosaurus | Ophthalmosaurus | **офтальмозавр** | ph → ф, th → т ; ichtyosaure à grands yeux |
| oviraptor | Oviraptor | **овираптор** | direct |
| pachycephalosaurus | Pachycephalosaurus | **пахицефалозавр** | ch → х, y → и, ph → ф |
| paraceratherium | Paraceratherium | **парацератерий** | c devant e → ц, th → т, -ium → -ий ; rhinocéros géant (mammifère) |
| parasaurolophus | Parasaurolophus | **паразауролоф** | s → з, ph → ф, -us tombe |
| patagotitan | Patagotitan | **патаготитан** | genre récent (2017), translittération directe |
| pentaceratops | Pentaceratops | **пентацератопс** | c devant e → ц |
| plateosaurus | Plateosaurus | **платеозавр** | direct |
| protoceratops | Protoceratops | **протоцератопс** | c devant e → ц |
| pteranodon | Pteranodon | **птеранодон** | пт- initial SE PRONONCE (contrairement à l'anglais) ; ptérosaure |
| quetzalcoatlus | Quetzalcoatlus | **кетцалькоатль** | ⚠ — à relire natif : racine nahuatl ; variante concurrente « кецалькоатль » |
| saurolophus | Saurolophus | **зауролоф** | ph → ф ; ⚠ piège oral : SANS préfixe « пара- » (≠ паразауролоф) |
| scutellosaurus | Scutellosaurus | **скутеллозавр** | scu → ску, ll → лл |
| shonisaurus | Shonisaurus | **шонизавр** | ⚠ — à relire natif : ichtyosaure peu médiatisé (monts Shoshone) |
| smilodon | Smilodon | **смилодон** | tigre à dents de sabre (mammifère) ; nom vernaculaire : саблезубый тигр |
| spinosaurus | Spinosaurus | **спинозавр** | direct |
| stegosaurus | Stegosaurus | **стегозавр** | direct |
| tarbosaurus | Tarbosaurus | **тарбозавр** | direct |
| therizinosaurus | Therizinosaurus | **теризинозавр** | th → т, z → з |
| titanis | Titanis | **титанис** | ⚠ — à relire natif : oiseau-terreur (terror bird), genre rare sans usage jeunesse établi |
| torosaurus | Torosaurus | **торозавр** | direct |
| triceratops | Triceratops | **трицератопс** | c devant e → ц ; **Tritri de Max** ; ultra-établi |
| troodon | Troodon | **троодон** | oo → оо (deux voyelles) |
| tyrannosaurus | Tyrannosaurus | **тираннозавр** | le classique ; nn → нн |
| utahraptor | Utahraptor | **ютараптор** | Utah → юта, h amuï |
| velociraptor | Velociraptor | **велоцираптор** | c devant i → ц ; ultra-établi |

---

## 3. Récapitulatif par catégorie (pour la voix native)

**-завр « vrais dinosaures » (le -завр porte l'accent) :** альбертозавр, аллозавр, амаргазавр, анкилозавр, апатозавр, брахиозавр, камаразавр, кархародонтозавр, центрозавр, цератозавр, коритозавр, криолофозавр, дилофозавр, эдмонтозавр, гиганотозавр, кентрозавр, пахицефалозавр, платеозавр, скутеллозавр, спинозавр, стегозавр, тарбозавр, теризинозавр, торозавр, тираннозавр, майазавра, карнотавр, трицератопс, пентацератопс, протоцератопс, паразауролоф, зауролоф, игуанодон, диплодок, дейноних, галлимим, эуоплоцефал, минми, микрораптор, овираптор, ютараптор, велоцираптор, троодон, патаготитан, эдмонтония.

**Ptérosaures (reptiles volants, PAS des dinos) :** птеранодон, кетцалькоатль, хацегоптерикс.

**Reptiles marins (PAS des dinos) :** ихтиозавр, офтальмозавр, шонизавр, мозазавр, эласмозавр, лиоплевродон, архелон (tortue).

**Synapsides permiens (PAS des dinos) :** диметродон, эдафозавр, листрозавр, горгонопс, мосхопс.

**Mammifères & oiseaux cénozoïques (noms établis ou translittérés) :** мамонт (Mammuthus), смилодон (Smilodon), целодонта (rhinocéros laineux), парацератерий, мегатерий, глиптодон, эноцион (dire wolf), титанис (terror bird), археоптерикс (oiseau primitif).

> **Comme en chinois, il n'y a PAS de « liste se lisant bien telle quelle en latin »** : le russe ne lit jamais le nom scientifique latin. Toutes les formes ci-dessus sont des **mots cyrilliques natifs**, lisibles sans ambiguïté par une voix russe. Le seul risque de prononciation vient des longs composés translittérés (кархародонтозавр, пахицефалозавр, кетцалькоатль, хацегоптерикс) — ils restent lisibles car l'orthographe russe est quasi phonémique.

---

## 4. ⚠️ Incertitudes — à faire valider par un natif russophone

Aucune forme n'a été inventée : les deux LLM croisés (DeepSeek V4-Pro et Grok 4.3) convergent sur les 70 entrées. Les points ci-dessous restent à confirmer par un humain natif avant prod audio de masse :

1. **aenocyon (эноцион)** — canidé préhistorique (dire wolf) quasi absent de la littérature jeunesse russe. **эноцион** est la translittération standard (ae → э) mais il n'existe pas d'usage populaire stabilisé. Valider.
2. **maiasaura (майазавра)** — la forme **майазавра** est la plus répandue, mais la variante **майязавра** (translittération plus littérale de « Maia ») circule aussi. Trancher à l'écoute.
3. **quetzalcoatlus (кетцалькоатль)** — **кетцалькоатль** est la forme dominante (Wikipédia ru, littérature dino), mais **кецалькоатль** existe. Confirmer la forme retenue.
4. **shonisaurus (шонизавр)** — ichtyosaure peu médiatisé en russophonie ; translittération régulière mais usage à vérifier.
5. **titanis (титанис)** — genre d'« oiseau-terreur » rare ; le groupe a un nom russe (фороракосы) mais le genre précis n'a pas d'usage jeunesse établi. Valider **титанис**.
6. **mammuthus (мамонт)** — décision éditoriale : on a retenu le **nom vernaculaire** мамонт (comme « Mamut » en espagnol), pas la translittération savante маммутус. Si le projet veut le nom scientifique, basculer.
7. **camarasaurus (камаразавр)** — la bonne forme est **камаразавр** ; la coquille « камеразавр » est fréquente en ligne. Point de vigilance de saisie, pas de doute de fond.
8. **coelodonta (целодонта)** — le nom du genre est attesté, mais l'enfant russe connaît surtout **шерстистый носорог** (rhinocéros laineux). Garder целодонта (cohérence « nom du genre ») ou basculer au vernaculaire comme мамонт : à trancher avec la même règle que le point 6.

> **Garde-fou process (comme en FR/EN §4) :** générer **1 seul MP3 court** (voix Native Russian) énonçant les 70 formes d'affilée → écoute unique → corriger toute forme mal accentuée ou variante à changer → mettre à jour cette table → puis prod de masse. Coût : 1 clip vs 70 ratés.

---

_Créé 2026-08-11. Méthode : écriture native cyrillique + noms de paléontologie russes établis (-завр = -saure). Draft LLM validé par croisement (DeepSeek V4-Pro ↔ Grok 4.3), relecture native humaine à prévoir. Sert d'entrée cyrillique au TTS voix Native Russian. Le texte parlé n'est jamais affiché. Toute incertitude (§4) à valider par un natif avant prod audio de masse._
