# Lexique de prononciation — noms de dinos (arabe · العربية) pour ElevenLabs (eleven_v3)

> **Langue cible : arabe standard moderne (الفصحى).** Voix TTS : **Native Arabic**.
> **Méthode : ÉCRITURE NATIVE ARABE** (ce que la voix lit) **+ translittération latine** (repère humain, jamais donnée à la voix).
> **⚠️ Sert à l'AUDIO TTS** avec une voix native arabe : le but est que le nom SONNE juste dans la bouche d'un locuteur arabe. **Le texte parlé n'est JAMAIS affiché** — on peut donc l'adapter sans scrupule à la phonologie arabe.
> **⚠️ RTL** : l'arabe s'écrit et se lit **de droite à gauche**. Dans les tables ci-dessous, la colonne « forme arabe » contient du texte RTL ; ne pas la réordonner. Chaque nom arabe est isolé dans sa cellule, ce qui protège le sens de lecture.

---

## 1. Règles de conversion (racines grec/latin → arabe)

L'arabe n'a **ni /p/ ni /v/ ni /g/ dur** dans son inventaire standard (الفصحى). On rend :

| Son savant (grec/latin) | En arabe standard | Lettre / graphie | Exemple |
|--------------------------|-------------------|------------------|---------|
| **/p/** (pas de son /p/) | → **/b/** | **ب** (parfois پ en dialecte, **à éviter** en fصحى) | *Para-* → **با** /bā/ ; *Ptéro-* → **بت** |
| **/v/** (pas de son /v/) | → **/f/** | **ف** | *Vélociraptor* → **ف**يلوسيرابتور |
| **/g/** dur (comme « gare ») | → **/g/** ou /ǧ/ selon dialecte | **غ** (approx.) / **ج** (Égypte = /g/ dur !) / **ك+** | *Giganoto-* → **غ**يغانوتو / **ج**يجانوتو |
| **ch** (grec = son « k ») | → **/k/** | **ك** | *Brachio-* → **ب**را**ك**يو ; *Carcharo-* → **ك**ار**ك**ارو |
| **ph** | → **/f/** | **ف** | *Dilopho-* → دايلو**ف**و |
| **th** (grec) | → **/t/** | **ت** (parfois **ث** /θ/) | *Ornitho-* → أورنيتو |
| **y** (grec = son « i ») | → **/ī/** | **ي** | *Baryonyx* → بار**ي**ونيكس |
| **x** | → « ks » | **كس** | *Baryonyx* → باريوني**كس** |
| **ae / oe** | → « é/i » | **ي** ou **ا** | *Archaeo-* → آر**كي**و |
| **c** dur (k) | → **/k/** | **ك** | *Camara-* → **ك**امارا |
| **c** doux (s), *ce/ci* | → **/s/** | **س** | *Cera-* → **س**يرا / **س**يراتو |
| **-saurus / -saure** | → **-ṣūr** | **ـصور** | *-saurus* → ـ**صور** |
| **-saurus** (forme longue) | → **-ṣūrus** | **ـصورس** (option savante) | rarement utile pour l'oral enfant |
| **-don** (odon, don) | → **-dūn / -dun** | **ـدون** | *Iguano-don* → إغوانو**دون** |
| **-tops** (cera-tops) | → **-tubs** | **ـتوبس** | *Tricera-tops* → تراي**سيراتوبس** |

**Conventions figées pour ce lexique :**
- **« dinosaure » = ديناصور** /daynāṣūr/ (forme arabe ultra-établie). C'est le modèle : le suffixe **ـصور** /-ṣūr/ rend systématiquement **-saurus/-saure**.
- On privilégie la **prononciation « à l'anglaise/scientifique »** que les documentaires arabes (National Geographic Abu Dhabi, chaînes enfants) ont popularisée, PAS une reconstruction gréco-latine puriste.
- Les **voyelles longues** (ا و ي) portent la syllabe accentuée. Elles guident la voix TTS ; ne pas les retirer.
- **ت** (et non ث) pour rendre « th » : la voix native lit **ث** comme /θ/ anglais, ce qui déforme ; **ت** est plus sûr pour l'oral enfant.

---

## 2. Table des 60 dinos

> Colonne 3 = **ce que la voix lit** (arabe natif). Colonne 4 = translittération latine (repère). Colonne 5 = piège.
> ✅ = nom arabe **établi/attesté** dans les médias arabes. 🟡 = **translittération standard** (pas de nom arabe figé trouvé) → à faire valider par un natif (voir § incertitudes).

| id | nom scientifique | forme arabe (voix lit) | translittération | piège |
|----|------------------|------------------------|------------------|-------|
| aenocyon | Aenocyon (dire wolf) | إينوسيون | ʾaynūsyūn | 🟡 genre récent (loup géant) ; *ae*→i, *cy*→si |
| albertosaurus | Albertosaurus | ألبرتوصور | ʾalbirtūṣūr | ✅ ـصور ; *p* absent ici |
| allosaurus | Allosaurus | ألوصور | ʾallūṣūr | ✅ « allo »=ألو |
| amargasaurus | Amargasaurus | أمارغاصور | ʾamārḡāṣūr | 🟡 *g* dur → غ (ou ج en Égypte) |
| ankylosaurus | Ankylosaurus | أنكيلوصور | ʾankīlūṣūr | ✅ *y*→ي |
| apatosaurus | Apatosaurus | أباتوصور | ʾabātūṣūr | ✅ |
| archaeopteryx | Archaeopteryx | آركيوبتيريكس | ʾārkyūbtīrīks | *ch*→ك, *ae*→ي, *pt*→بت, *y*→ي, *x*→كس |
| archelon | Archelon | آركيلون | ʾārkīlūn | *ch*→ك |
| baryonyx | Baryonyx | باريونيكس | bāryūnīks | *y*→ي, *x*→كس |
| brachiosaurus | Brachiosaurus | براكيوصور | brākyūṣūr | ✅ *ch*→ك |
| camarasaurus | Camarasaurus | كاماراصور | kāmārāṣūr | *c* dur→ك |
| carcharodontosaurus | Carcharodontosaurus | كاركارودونتوصور | kārkārūdūntūṣūr | *ch*→ك (×2), long |
| carnotaurus | Carnotaurus | كارنوتوروس | kārnūtūrus | ✅ *-taurus*→توروس (taureau) |
| centrosaurus | Centrosaurus | سنتروصور | sintrūṣūr | *ce*→س |
| ceratosaurus | Ceratosaurus | سيراتوصور | sīrātūṣūr | *ce*→س |
| coelodonta | Coelodonta (rhinocéros laineux) | سيلودونتا | sīlūdūntā | 🟡 *oe*→ي ; genre peu médiatisé en AR |
| cryolophosaurus | Cryolophosaurus | كرايولوفوصور | krāyūlūfūṣūr | *cry*→كراي, *ph*→ف |
| deinonychus | Deinonychus | داينونيكوس | dāynūnīkus | *ei*→اي, *ch*→ك, *y*→ي |
| dilophosaurus | Dilophosaurus | دايلوفوصور | dāylūfūṣūr | *ph*→ف |
| dimetrodon | Dimetrodon | ديميترودون | dīmītrūdūn | non-dino (synapside) ; *-odon*→ودون |
| diplodocus | Diplodocus | ديبلودوكوس | dīblūdūkus | ✅ *p*→ب, *c*→ك |
| edmontonia | Edmontonia | إدمونتونيا | ʾidmūntūnyā | 🟡 translit. directe |
| edmontosaurus | Edmontosaurus | إدمونتوصور | ʾidmūntūṣūr | ✅ |
| elasmosaurus | Elasmosaurus | إلاسموصور | ʾilāsmūṣūr | ✅ |
| euoplocephalus | Euoplocephalus | يوأوبلوسيفالوس | yūʾūblūsīfālus | *eu*→يو, *p*→ب, *ce/ph*→سي/ف |
| gallimimus | Gallimimus | غاليميموس | ḡālīmīmus | 🟡 *g* dur→غ (ou ج Égypte) |
| giganotosaurus | Giganotosaurus | غيغانوتوصور | ḡīḡānūtūṣūr | 🟡 *g* dur ×2 ; ⚠️ ≠ Giganto |
| glyptodon | Glyptodon | غليبتودون | ḡlībtūdūn | 🟡 *g* dur, *y*→ي, *p*→ب, *-odon*→ودون |
| ichthyosaurus | Ichthyosaurus | إكتيوصور | ʾiktyūṣūr | *ch*→ك, *th*→ت, *y*→ي |
| iguanodon | Iguanodon | إغوانودون | ʾiḡwānūdūn | ✅ *gu*→غوا, *-odon*→ودون |
| kentrosaurus | Kentrosaurus | كنتروصور | kintrūṣūr | *k*→ك |
| liopleurodon | Liopleurodon | ليوبليورودون | lyūblyūrūdūn | *p*→ب, *-odon*→ودون |
| mammuthus | Mammuthus (mammouth) | ماموث | māmūṯ | ✅ « mammouth »=ماموث très établi ; *th*→ث ici OK |
| megatherium | Megatherium | ميغاتيريوم | mīḡātīryūm | 🟡 *g* dur→غ, *th*→ت |
| microraptor | Microraptor | مايكرورابتور | māykrūrābtūr | *p*→ب (raptor→رابتور) |
| mosasaurus | Mosasaurus | موزاصور | mūzāṣūr | ✅ attention *S* intervoc.→ز |
| ophthalmosaurus | Ophthalmosaurus | أوفتالموصور | ʾūftālmūṣūr | *ph*→ف, *th*→ت |
| oviraptor | Oviraptor | أوفيرابتور | ʾūfīrābtūr | *v*→ف, *p*→ب |
| pachycephalosaurus | Pachycephalosaurus | باكيسيفالوصور | bākīsīfālūṣūr | *p*→ب, *ch*→ك, *y*→ي, *ce/ph*→سي/ف |
| paraceratherium | Paraceratherium | باراسيراتيريوم | bārāsīrātīryūm | *p*→ب, *ce*→سي, *th*→ت |
| parasaurolophus | Parasaurolophus | باراصورولوفوس | bārāṣūrūlūfus | *p*→ب, *ph*→ف |
| patagotitan | Patagotitan | باتاغوتيتان | bātāḡūtītān | *p*→ب, *g* dur→غ |
| pentaceratops | Pentaceratops | بنتاسيراتوبس | bintāsīrātubs | *p*→ب, *ce*→سي, *-tops*→توبس |
| plateosaurus | Plateosaurus | بلاتيوصور | blātyūṣūr | *p*→ب |
| protoceratops | Protoceratops | بروتوسيراتوبس | brūtūsīrātubs | *p*→ب, *ce*→سي, *-tops*→توبس |
| pteranodon | Pteranodon | تيرانودون | tīrānūdūn | *Pt-*→ت (le /p/ muet à l'oral), *-odon*→ودون |
| quetzalcoatlus | Quetzalcoatlus | كيتزالكواتل | kītzālkwātil | ✅ nahuatl ; forme AR≈« quetzal » connue |
| shonisaurus | Shonisaurus | شونيصور | šūnīṣūr | *sh*→ش |
| smilodon | Smilodon (tigre à dents de sabre) | سميلودون | smīlūdūn | *-odon*→ودون |
| spinosaurus | Spinosaurus | سبينوصور | sbīnūṣūr | ✅ TRÈS établi (origine Égypte) ; *p*→ب |
| stegosaurus | Stegosaurus | ستيغوصور | stīḡūṣūr | ✅ *g* dur→غ |
| tarbosaurus | Tarbosaurus | تاربوصور | tārbūṣūr | *p* absent ; simple |
| therizinosaurus | Therizinosaurus | ثيريزينوصور | ṯīrīzīnūṣūr | *Th-*→ث (ou ت) ; long |
| titanis | Titanis (oiseau-terreur) | تيتانيس | tītānīs | 🟡 genre peu médiatisé en AR |
| torosaurus | Torosaurus | توروصور | tūrūṣūr | simple |
| triceratops | Triceratops | تراي‑سيراتوبس | trāy-sīrātubs | ✅ TRÈS établi ; *ce*→سي, *-tops*→توبس |
| troodon | Troodon | ترودون | trūdūn | double *o*→و long, *-odon*→ودون |
| tyrannosaurus | Tyrannosaurus | تيرانوصور | tīrānnūṣūr | ✅ « T-Rex » = تي‑ريكس aussi ; *y*→ي |
| utahraptor | Utahraptor | يوتارابتور | yūtārābtūr | *Utah*→يوتا, *p*→ب |
| velociraptor | Velociraptor | فيلوسيرابتور | fīlūsīrābtūr | ✅ *v*→ف, *ci*→سي, *p*→ب |

---

## 3. Noms arabes ÉTABLIS (attestés dans les médias/documentaires arabes)

Ceux-ci ont une forme arabe **reconnue et diffusée** (chaînes enfants, docs NatGeo Abu Dhabi, Wikipédia AR). On les prononce sans crainte :

- **ديناصور** /daynāṣūr/ = « dinosaure » (le modèle du suffixe ـصور)
- **تيرانوصور** /tīrānūṣūr/ — Tyrannosaurus, aussi **تي‑ريكس** /tī-rīks/ (« T-Rex »)
- **تراي‑سيراتوبس** /trāy-sīrātubs/ — Triceratops
- **فيلوسيرابتور** /fīlūsīrābtūr/ — Vélociraptor
- **سبينوصور** /sbīnūṣūr/ — Spinosaurus (découvert en Égypte, TRÈS ancré)
- **براكيوصور** /brākyūṣūr/ — Brachiosaurus
- **ستيغوصور** /stīḡūṣūr/ — Stegosaurus
- **أنكيلوصور** /ʾankīlūṣūr/ — Ankylosaurus
- **ديبلودوكوس** /dīblūdūkus/ — Diplodocus
- **أباتوصور** /ʾabātūṣūr/ — Apatosaurus
- **ألوصور** /ʾallūṣūr/ — Allosaurus
- **موزاصور** /mūzāṣūr/ — Mosasaurus
- **إغوانودون** /ʾiḡwānūdūn/ — Iguanodon
- **كارنوتوروس** /kārnūtūrus/ — Carnotaurus
- **ماموث** /māmūṯ/ — Mammuthus (mammouth)
- **إدمونتوصور** /ʾidmūntūṣūr/ — Edmontosaurus
- **إلاسموصور** /ʾilāsmūṣūr/ — Elasmosaurus
- **ألبرتوصور** /ʾalbirtūṣūr/ — Albertosaurus

> Le suffixe **ـصور** /-ṣūr/ est le patron productif : n'importe quel « -saurus » nouveau se dit spontanément **…صور** pour une voix arabe. C'est le levier le plus fiable de tout ce lexique.

---

## 4. ⚠️ Incertitudes — à faire valider par un locuteur natif arabe

Je n'ai **pas inventé** de noms : quand aucune forme arabe figée n'existe, j'ai donné la **translittération standard la plus proche** de la prononciation scientifique internationale, et je la signale ici. À confirmer par un natif (surtout pour le choix **غ vs ج vs گ** pour le /g/ dur, très variable selon le pays).

### 4a. Le son /g/ dur (غ / ج / گ) — décision de pays à trancher
L'arabe standard n'a pas de /g/ dur pur. Trois rendus coexistent selon la région ; **il faut choisir selon l'accent de la voix TTS** :
- **غ** (ghayn, /ɣ/) — rendu « lettré » le plus courant à l'écrit.
- **ج** (jīm) — se lit **/g/ dur en Égypte** (donc parfait si voix égyptienne), mais /ǧ/ ailleurs.
- **گ** (kaf perse) — /g/ dur exact, mais **hors alphabet arabe standard** (à éviter pour une voix fصحى).

Concernés : **Amargasaurus, Gallimimus, Giganotosaurus, Glyptodon, Megatherium, Patagotitan, Stegosaurus, Iguanodon**. → **Demander : la voix TTS est-elle égyptienne (→ ج) ou standard/Golfe (→ غ) ?**

### 4b. Genres peu ou pas médiatisés en arabe (translittération 🟡, à valider)
Aucune forme arabe grand public trouvée ; translittération proposée par prudence :
- **Aenocyon** (إينوسيون) — genre récent (renommage du dire wolf) ; *ae* et *cy* incertains.
- **Coelodonta** (سيلودونتا) — rhinocéros laineux ; peu cité en AR.
- **Edmontonia** (إدمونتونيا) — ankylosaure moins connu que son cousin.
- **Titanis** (تيتانيس) — oiseau-terreur ; quasi inexistant dans les médias AR.
- **Megatherium** (ميغاتيريوم) — paresseux géant ; forme non figée.
- **Glyptodon** (غليبتودون) — cumul /g/ dur + /p/ ; à écouter.
- **Paraceratherium** (باراسيراتيريوم) — long, non médiatisé ; découpage syllabique à valider.

### 4c. Choix « th » = ت vs ث (à trancher à l'écoute)
J'ai mis **ت** /t/ par défaut (Therizinosaurus, Ichthyosaurus, Ophthalmosaurus, Megatherium…) pour éviter que la voix lise /θ/ « à l'anglaise ». **Mammuthus** (ماموث) fait exception car « mammouth » avec **ث** est déjà l'usage établi. → À confirmer : la voix arabe rend-elle mieux ces noms avec ت ou ث ?

### 4d. Le /p/ initial rendu ب (à écouter)
*Plateosaurus, Protoceratops, Pentaceratops, Pachycephalosaurus, Parasaurolophus, Patagotitan, Paraceratherium* commencent tous par **ب** /b/ (pas de /p/ en fصحى). C'est correct phonologiquement mais peut surprendre une oreille habituée au /p/ ; si la voix TTS supporte **پ**, on POURRAIT l'utiliser — **mais je déconseille** (hors standard). À valider : ب suffit-il ?

### 4e. Pteranodon — le /p/ muet
*Pteranodon* : j'ai rendu **تيرانودون** /tīrānūdūn/ en supprimant le /p/ initial (comme le fait le français « ptéranodon » où le p s'entend à peine, et l'arabe ne le porte pas). Alternative plus littérale : **بتيرانودون** /btīrānūdūn/. → À valider à l'écoute : garder le ب initial ou pas ?

---

## 5. Preview phonétique groupé (garde-fou process — avant prod de masse)

Même principe que le lexique FR : avant de produire 60 fiches audio, générer **UN seul MP3 court** (voix Native Arabic) qui énonce d'affilée les noms **à risque** — surtout ceux marqués 🟡 et les cas /g/ dur, /p/, /th/ — puis faire écouter à un locuteur arabe pour valider/corriger la graphie. Coût : 1 clip vs 60 ratés possibles. Mettre à jour ce lexique avec les corrections, puis lancer la prod complète.

Ordre suggéré du clip de test (les plus risqués) :
> غيغانوتوصور · أمارغاصور · غاليميموس · باتاغوتيتان · إغوانودون · ثيريزينوصور · إكتيوصور · أوفتالموصور · تيرانودون · إينوسيون · سيلودونتا · تيتانيس · باراسيراتيريوم · ميغاتيريوم · غليبتودون

---

_Créé 2026-07-08. Méthode : écriture native arabe + translittération. Noms établis privilégiés, sinon translittération standard signalée en § incertitudes. Sert à l'audio TTS voix Native Arabic — texte parlé jamais affiché. À valider par un locuteur natif (surtout /g/ dur غ/ج et th ت/ث)._
