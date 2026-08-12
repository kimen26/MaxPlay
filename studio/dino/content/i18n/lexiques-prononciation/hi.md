# Lexique de prononciation — noms de dinos en HINDI (हिन्दी) pour ElevenLabs (eleven_v3)

> **Langue cible : hindi (हिन्दी, devanagari).** Voix TTS : **Native Hindi**.
> **Méthode : écriture native + translittération établie.** Contrairement au chinois (qui traduit le sens), l'hindi **translittère** les noms de dinosaures depuis l'anglais/le latin scientifique : *Tyrannosaurus* → **टायरानोसॉरस**, *Triceratops* → **ट्राइसेराटॉप्स**. Quelques créatures non-dino ont un **nom hindi courant** (mammouth = **मैमथ**) qu'on préfère à la translittération du genre.
> **Ce lexique sert à générer l'AUDIO TTS avec une voix native hindi. Le texte parlé (devanagari) n'est JAMAIS affiché à l'écran** — c'est uniquement l'entrée que lit la voix.
> Forgé sur les gabarits [`en.md`](en.md) (référence canonique, même ordre des 70 ids) et [`zh.md`](zh.md) (langue à écriture non latine).
> **Draft LLM validé par croisement (DeepSeek draft → Grok révision), relecture native humaine à prévoir.**

---

## 1. Règles de conversion (latin/grec/anglais → devanagari)

L'hindi n'a pas de tradition de traduction sémantique des noms de dinosaures : on translittère la prononciation anglaise dominante. Correspondances appliquées à toute la table :

| Racine / son savant | Rendu devanagari | Exemple |
|---------------------|------------------|---------|
| `-saurus` final | **सॉरस** (sɔːrəs, avec ॉ — forme standard harmonisée, validée Grok) | एलो-**सॉरस** |
| `-tops` (ceratops) | **टॉप्स** | ट्राइसेरा-**टॉप्स** |
| `-raptor` | **रैप्टर** (ॅ pour le « a » anglais) | वेलोसि-**रैप्टर** |
| `-nyx` / `-nix` final | **निक्स** | बैरियो-**निक्स** |
| `-don` / `-odon` | **डॉन** / **डोन** | इगुआनो-**डोन** |
| `-don` (Dimetrodon, Troodon) | **डॉन** | डाइमेट्रो-**डॉन**, ट्रो-**डॉन** |
| `ch` grec (= /k/) | **क** | ब्रै**कि**योसॉरस, आर्**कि**योप्टेरिक्स |
| `ph` (= /f/) | **फ** (फ़ si on veut le f pur — les deux se rencontrent) | डाइलो**फो**सॉरस |
| `th` anglais | **थ** (l'hindi n'a pas le θ anglais ; la voix native le rend /t̪ʰ/) | कोरि**थो**सॉरस |
| `x` final (= /ks/) | **क्स** | आर्कियोप्टेरि**क्स** |
| `ae-` initial (= /iː/) | **ई** | **ई**नोसायन |
| `eu-` initial (= /juː/) | **यू** | **यू**ओप्लोसेफालस |
| « a » anglais ouvert (/æ/) | **ॅ** (chandra) | र**ै**प्टर → रैप्टर, ब**ै**रियोनिक्स |
| « o » anglais (/ɔ/) | **ॉ** (nukta-matra) | स**ॉ**रस, ट**ॉ**प्स |
| `z` des emprunts | **ज़** (nukta) | क्वेट्**ज़**ालकोट्लस, थेरि**ज़**िनोसॉरस |
| `Pt-` initial (ptérosaures) | p **muet** (usage anglais suivi) | **टे**रानोडोन (Pteranodon) |
| voyelles longues anglaises « i/y » (= /aɪ/) | **आइ** | ड**ाइ**नोनिकस, ट**ाइ**टेनिस |
| stress anglais | non marqué (décision projet : pas de tirets ni majuscules, la voix native place l'accent) | — |

**Points de vigilance natifs :**
- **Harmonisation सॉरस** : le draft brut mélangeait सोरस et सॉरस ; la forme **सॉरस** (avec ॉ, plus proche de l'anglais « -saurus ») est retenue partout, conformément à la révision Grok et à l'usage jeunesse majoritaire.
- L'hindi standard évite les groupes de consonnes exotiques : on les simplifie pour la lisibilité TTS (हात्सेगोप्टेरिक्स plutôt que हाट्ज़ेगोप्टेरिक्स).
- Les créatures **non-dino** (mammifères, synapsides, reptiles marins, ptérosaures) gardent la translittération du nom scientifique, sauf quand un **nom hindi courant** existe et parle à un enfant de 4 ans : मैमथ (mammouth). Pour le rhinocéros laineux, ऊनी गैंडा existe mais on garde le genre (सीलोडोंटा) pour la cohérence encyclopédique — décision à confirmer (§4).

---

## 2. Table des 70 dinos — devanagari (lu par le TTS)

> **Donner au moteur TTS la colonne « Écrire pour le TTS ».** ⚠ = à faire valider par un natif (voir §4). Ordre = celui de `en.md`.

| id | Nom scientifique | Écrire pour le TTS | note |
|----|------------------|--------------------|------|
| aenocyon | *Aenocyon* | ईनोसायन | ⚠ genre rare (dire wolf) ; DeepSeek एनोसायन, Grok एएनोसायन — retenu ईनोसायन (ae→ई) — à relire natif |
| albertosaurus | *Albertosaurus* | अल्बर्टोसॉरस | direct |
| allosaurus | *Allosaurus* | एलोसॉरस | direct |
| amargasaurus | *Amargasaurus* | अमार्गासॉरस | nom de lieu argentin, translit. directe |
| ankylosaurus | *Ankylosaurus* | एंकिलोसॉरस | variante एंकाइलोसॉरस entendue ; retenu एंकिलो- (accord DS+Grok) |
| apatosaurus | *Apatosaurus* | एपेटोसॉरस | direct |
| archaeopteryx | *Archaeopteryx* | आर्कियोप्टेरिक्स | ch→क, x→क्स |
| archelon | *Archelon* | आर्केलॉन | tortue marine géante, non-dino |
| baryonyx | *Baryonyx* | बैरियोनिक्स | x→क्स |
| brachiosaurus | *Brachiosaurus* | ब्रैकियोसॉरस | ch→क |
| camarasaurus | *Camarasaurus* | कैमारासॉरस | direct |
| carcharodontosaurus | *Carcharodontosaurus* | कार्चारोडोंटोसॉरस | ch→क deux fois |
| carnotaurus | *Carnotaurus* | कार्नोटॉरस | -taurus → टॉरस |
| centrosaurus | *Centrosaurus* | सेंट्रोसॉरस | c→स devant e |
| ceratosaurus | *Ceratosaurus* | सेराटोसॉरस | c→स devant e |
| coelodonta | *Coelodonta* | सीलोडोंटा | ⚠ rhinocéros laineux (mammifère) ; Grok proposait कोएलोडोंटा — retenu la forme proche de la prononciation anglaise ; nom courant ऊनी गैंडा possible — à relire natif |
| corythosaurus | *Corythosaurus* | कोरिथोसॉरस | ⚠ th→थ — à relire natif |
| cryolophosaurus | *Cryolophosaurus* | क्रायोलोफोसॉरस | ph→फ |
| deinonychus | *Deinonychus* | डाइनोनिकस | ch→क |
| dilophosaurus | *Dilophosaurus* | डाइलोफोसॉरस | ph→फ |
| dimetrodon | *Dimetrodon* | डाइमेट्रोडॉन | synapside à voile, non-dino |
| diplodocus | *Diplodocus* | डिप्लोडोकस | direct |
| edaphosaurus | *Edaphosaurus* | एडाफोसॉरस | ⚠ synapside permien, non-dino — à relire natif |
| edmontonia | *Edmontonia* | एडमोंटोनिया | lieu canadien, translit. directe |
| edmontosaurus | *Edmontosaurus* | एडमोंटोसॉरस | सॉरस harmonisé (correction Grok) |
| elasmosaurus | *Elasmosaurus* | एलास्मोसॉरस | plésiosaure marin, non-dino ; सॉरस harmonisé |
| euoplocephalus | *Euoplocephalus* | यूओप्लोसेफालस | ⚠ eu→यू, ph→फ ; nom long peu médiatisé en hindi — à relire natif |
| gallimimus | *Gallimimus* | गैलिमिमस | direct |
| giganotosaurus | *Giganotosaurus* | गिगानोटोसॉरस | piège oral : ne pas dire « गिगांटो » (giganto-) ; giganoto- = « géant du Sud » |
| glyptodon | *Glyptodon* | ग्लिप्टोडोन | mammifère cuirassé, non-dino |
| gorgonops | *Gorgonops* | गोर्गोनोप्स | ⚠ gorgonopsidé permien, non-dino — à relire natif |
| hatzegopteryx | *Hatzegopteryx* | हात्सेगोप्टेरिक्स | ⚠ ptérosaure géant ; Hațeg roumain ≈ « hatseg » ; Grok proposait हाट्ज़ेगो (cluster dur) — retenu la forme lisible — à relire natif |
| ichthyosaurus | *Ichthyosaurus* | इक्थियोसॉरस | reptile marin, non-dino ; ch→क, th→थ |
| iguanodon | *Iguanodon* | इगुआनोडोन | direct |
| kentrosaurus | *Kentrosaurus* | केन्ट्रोसॉरस | सॉरस harmonisé |
| liopleurodon | *Liopleurodon* | लियोप्लूरोडोन | ⚠ pliosaure marin, non-dino — à relire natif |
| lystrosaurus | *Lystrosaurus* | लिस्ट्रोसॉरस | ⚠ synapside (survivant du Permien), non-dino — à relire natif |
| maiasaura | *Maiasaura* | मायासॉरा | ⚠ -saura féminin (« bonne mère lézard ») — à relire natif |
| mammuthus | *Mammuthus* | मैमथ | ⚠ nom hindi courant du mammouth, plus parlant pour un enfant ; si on veut le genre latin : मैमूथस — décision éditoriale à relire natif |
| megatherium | *Megatherium* | मेगाथेरियम | paresseux terrestre géant, mammifère |
| microraptor | *Microraptor* | माइक्रोरैप्टर | direct |
| minmi | *Minmi* | मिन्मी | ⚠ nom de lieu australien (Minmi Crossing), pas de racine grecque — à relire natif |
| mosasaurus | *Mosasaurus* | मोसासॉरस | reptile marin géant, non-dino |
| moschops | *Moschops* | मॉस्कॉप्स | ⚠ thérapside permien, non-dino ; ch→क (grec *moskhos*) — à relire natif |
| ophthalmosaurus | *Ophthalmosaurus* | ऑफ़्थैल्मोसॉरस | ⚠ ichthyosaure marin ; ph→फ़, th→थ — à relire natif |
| oviraptor | *Oviraptor* | ओविरैप्टर | direct |
| pachycephalosaurus | *Pachycephalosaurus* | पैकीसेफालोसॉरस | ⚠ ch→क, ph→फ ; nom long — à relire natif |
| paraceratherium | *Paraceratherium* | पैरासेराथेरियम | rhinocéros géant sans corne, mammifère |
| parasaurolophus | *Parasaurolophus* | पैरासॉरोलोफस | ⚠ ph→फ ; à distinguer de saurolophus à l'oral — à relire natif |
| patagotitan | *Patagotitan* | पैटागोटाइटन | genre récent (2017), translit. Patagonia + titan |
| pentaceratops | *Pentaceratops* | पेंटासेराटॉप्स | « cinq cornes » |
| plateosaurus | *Plateosaurus* | प्लेटियोसॉरस | ⚠ -teo- rendu टियो (plateyo-) — à relire natif |
| protoceratops | *Protoceratops* | प्रोटोसेराटॉप्स | direct |
| pteranodon | *Pteranodon* | टेरानोडोन | ptérosaure (reptile volant), non-dino ; Pt→ट (p muet, usage anglais) |
| quetzalcoatlus | *Quetzalcoatlus* | क्वेट्ज़ालकोट्लस | ⚠ origine nahuatl ; ज़ (nukta) gardé pour le z (standard hindi des emprunts) ; Grok proposait क्वेट्जालकोट्लस sans nukta — à relire natif |
| saurolophus | *Saurolophus* | सॉरोलोफस | ⚠ piège oral : SANS préfixe « para- » (≠ पैरासॉरोलोफस) — à relire natif |
| scutellosaurus | *Scutellosaurus* | स्कुटेलोसॉरस | ⚠ सॉरस harmonisé (correction Grok) — à relire natif |
| shonisaurus | *Shonisaurus* | शोनिसॉरस | ichthyosaure géant, marin ; सॉरस harmonisé |
| smilodon | *Smilodon* | स्मिलोडोन | tigre à dents de sabre, mammifère |
| spinosaurus | *Spinosaurus* | स्पिनोसॉरस | सॉरस harmonisé |
| stegosaurus | *Stegosaurus* | स्टेगोसॉरस | सॉरस harmonisé |
| tarbosaurus | *Tarbosaurus* | टार्बोसॉरस | सॉरस harmonisé |
| therizinosaurus | *Therizinosaurus* | थेरिज़िनोसॉरस | th→थ, z→ज़ |
| titanis | *Titanis* | टाइटेनिस | ⚠ « terror bird » (oiseau géant), genre rare — à relire natif |
| torosaurus | *Torosaurus* | टोरोसॉरस | direct |
| triceratops | *Triceratops* | ट्राइसेराटॉप्स | variante courante ट्रिसेराटॉप्स ; **Tritri de Max** — nom ultra-établi |
| troodon | *Troodon* | ट्रोडॉन | Grok : ट्रोडॉन plus fidèle à l'anglais « TROH-oh-don » que ट्रूडन (DeepSeek) — retenu Grok |
| tyrannosaurus | *Tyrannosaurus* | टायरानोसॉरस | classique ; forme complète courante टायरानोसॉरस रेक्स |
| utahraptor | *Utahraptor* | यूटारैप्टर | Utah→यूटा |
| velociraptor | *Velociraptor* | वेलोसिरैप्टर | direct |

---

## 3. Récapitulatif par catégorie (pour la voix native)

**Translittérations directes, zéro piège (la voix les lit bien tels quels) :** अल्बर्टोसॉरस, एलोसॉरस, अमार्गासॉरस, एपेटोसॉरस, ब्रैकियोसॉरस, कैमारासॉरस, कार्नोटॉरस, सेंट्रोसॉरस, सेराटोसॉरस, क्रायोलोफोसॉरस, डाइलोफोसॉरस, डिप्लोडोकस, एडमोंटोनिया, एडमोंटोसॉरस, गैलिमिमस, इगुआनोडोन, केन्ट्रोसॉरस, मोसासॉरस, ओविरैप्टर, पेंटासेराटॉप्स, प्रोटोसेराटॉप्स, स्पिनोसॉरस, स्टेगोसॉरस, टार्बोसॉरस, टोरोसॉरस, ट्राइसेराटॉप्स, टायरानोसॉरस, यूटारैप्टर, वेलोसिरैप्टर, माइक्रोरैप्टर, पैटागोटाइटन.

**Noms hindi courants (non-dino) :** मैमथ (mammouth).

**Marins / volants / synapsides / mammifères (translittération conservée, statut « pas un dinosaure » noté en §2) :** आर्केलॉन, एलास्मोसॉरस, इक्थियोसॉरस, लियोप्लूरोडोन, शोनिसॉरस, ऑफ़्थैल्मोसॉरस, टेरानोडोन, क्वेट्ज़ालकोट्लस, हात्सेगोप्टेरिक्स (volants/marins) · डाइमेट्रोडॉन, एडाफोसॉरस, गोर्गोनोप्स, लिस्ट्रोसॉरस, मॉस्कॉप्स (synapsides) · सीलोडोंटा, ग्लिप्टोडोन, मेगाथेरियम, पैरासेराथेरियम, स्मिलोडोन, ईनोसायन, टाइटेनिस (mammifères/oiseaux Cénozoïque).

> Pas de « respelling » comme en anglais/français : le devanagari se lit tel quel. Le seul risque TTS est la **segmentation des groupes de consonnes** (स्कुटेलोसॉरस, क्वेट्ज़ालकोट्लस) — à valider sur un clip groupé.

---

## 4. ⚠️ Incertitudes — à faire valider par un natif hindi avant prod audio de masse

Aucun nom n'a été inventé : translittération de la prononciation anglaise dominante, croisée entre deux LLM (DeepSeek draft → Grok révision). Restent à valider :

1. **aenocyon (ईनोसायन)** — genre canin rare ; DeepSeek donnait एनोसायन, Grok एएनोसायन (forme douteuse, double voyelle non standard). Retenu ईनोसायन (ae→ई, comme l'anglais « ee-NOH-see-on »). Aucun usage jeunesse hindi établi.
2. **coelodonta (सीलोडोंटा)** — désaccord : DeepSeek सीलोडोंटा (prononciation anglaise « see-lo-DON-ta ») vs Grok कोएलोडोंटा (collé à l'orthographe). Retenu DeepSeek (le TTS parle, il n'affiche pas). Option éditoriale : le nom courant **ऊनी गैंडा** (« rhino laineux ») serait plus parlant pour un enfant — à trancher.
3. **mammuthus (मैमथ)** — choix du nom courant hindi plutôt que la translittération du genre (मैमूथस). Cohérent avec l'usage enfant, mais à confirmer si l'encyclopédie veut uniformiser « nom de genre translittéré » partout.
4. **quetzalcoatlus (क्वेट्ज़ालकोट्लस)** — désaccord nukta : Grok voulait क्वेट्जालकोट्लस (sans ज़). Retenu le ज़ avec nukta, standard hindi pour le /z/ des emprunts (ज़ीरो, ज़ू). À valider à l'écoute.
5. **hatzegopteryx (हात्सेगोप्टेरिक्स)** — désaccord : Grok proposait हाट्ज़ेगो (cluster ट्ज़ difficile). Retenu la forme lisible हात्सेगो. Genre très peu médiatisé en hindi.
6. **troodon (ट्रोडॉन)** — désaccord : DeepSeek ट्रूडन (calque d'une mauvaise lecture anglaise « TROO-don ») vs Grok ट्रोडॉन. Retenu Grok, fidèle à « TROH-oh-don ».
7. **euoplocephalus, liopleurodon, moschops, ophthalmosaurus, pachycephalosaurus, parasaurolophus, plateosaurus, minmi, titanis** — espèces peu ou pas médiatisées en hindi : translittérations propres mais sans consensus d'usage vérifiable.
8. **saurolophus (सॉरोलोफस)** — vérifier à l'écoute que la voix ne glisse pas vers पैरासॉरोलोफस (paire à risque, comme en anglais).
9. **corythosaurus, edaphosaurus, gorgonops, lystrosaurus, maiasaura, scutellosaurus** — entrées ajoutées récemment au canon (2026-08-10) ; translittérations standard, pas d'usage jeunesse hindi repérable.

> **Garde-fou process (comme les autres langues) :** générer **1 seul MP3 court** (voix Native Hindi) énonçant les 70 noms d'affilée → écoute unique → corriger les segmentations fautives ou variantes → mettre à jour cette table → puis prod de masse.

---

_Créé 2026-08-11. Méthode : translittération devanagari de l'usage anglais dominant (suffixes harmonisés : सॉरस, टॉप्स, रैप्टर). Draft LLM validé par croisement (DeepSeek → Grok), relecture native humaine à prévoir. Sert d'entrée devanagari au TTS voix Native Hindi. Le texte parlé n'est jamais affiché. Les entrées ⚠ (§4) sont à valider par un natif avant prod audio de masse._
