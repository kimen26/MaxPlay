# Plan régénération images Grok — Encyclopédie dinosaure

> Source de vérité unique pour la regen Grok. Mis à jour 2026-05-20.
> 51 dinos dans le jeu · 19 ont des images Grok actuellement · 32 dinos sans aucune image Grok.

---

## 🎯 Règles MaxPlay verrouillées (à mettre dans CHAQUE prompt Grok)

1. **Style** : illustration réaliste douce, adaptée enfant 4 ans, lumière naturelle. Pas de gore, pas de sang abondant.
2. **Format** : portrait ou paysage, 1 sujet principal lisible.
3. **PROPORTIONS DE TAILLE COHÉRENTES** (règle Papa Yann 2026-05-20) — c'est la règle la plus violée. À répéter dans chaque prompt :
   - Adulte/petit doivent avoir des proportions réalistes (pas un bébé géant)
   - Si comparaison avec humain : enfant ~1 m, adulte ~1,8 m
   - Si plusieurs dinos : leurs tailles relatives doivent respecter la réalité (T-Rex 4 m de haut vs Tricératops 3 m vs un sauropode 13 m, etc.)
4. **Herbivores** (règle Papa Yann 2026-05-20) : sur la vue **"Sa vie"**, **AUCUN carnivore visible** même en arrière-plan. Scène = broutage, troupeau, défense seul, allaitement, marche.
5. **4e vue "Qui le chasse"** (nouveauté 2026-05-20) — uniquement pour herbivores et omnivores : scène de bagarre face au vrai prédateur historique de l'espèce. Cohabitation époque/continent obligatoire (pas de T-Rex face à un Stégosaure : différentes périodes !).
6. **Signature anatomique** : la spécificité de l'espèce DOIT être visible (collerette, cornes, voile, plaques, épines, dôme, etc.).
7. **Pas de confusion d'espèce** : un Cératosaure n'est pas un cératopsien ; un Pachycéphalosaure est bipède pas quadrupède ; etc.

---

## 📋 Les 4 vues par dino

| Vue | Carnivore | Herbivore/Omnivore |
|---|---|---|
| **1. Sa taille** | Dino + enfant ~1m, échelle claire | Idem |
| **2. Son environnement** | Le dino dans son habitat | Idem |
| **3. Sa vie** | Action (chasse, course, rugissement) | Broutage, troupeau, soins jeunes — **JAMAIS de prédateur** |
| **4. Qui le chasse** *(nouveau)* | (vide — c'est lui le chasseur) | Scène de bagarre face au prédateur historique cohérent |

---

# Section A — Regen URGENT sur dinos déjà couverts (qualité KO)

## A.1 — Carnivores 3/3 KO (mauvaise espèce totale)

### `tarbosaurus` (Tarbosaure)
- **Vues à regen** : taille, environnement, chasse
- **Problème actuel** : herbivores génériques au museau arrondi sans dents
- **Prompt** : "Tarbosaurus bataar, large Asian tyrannosaurid, **massive skull with huge teeth**, tiny 2-fingered arms, horizontal bipedal posture, scaly grey-brown skin. Late Cretaceous Mongolia setting (arid). Realistic illustration for a children encyclopedia. Proper anatomical proportions."

### `ceratosaurus` (Cératosaure)
- **Vues à regen** : taille, environnement, chasse
- **Problème actuel** : confondu avec un cératopsien quadrupède (énorme erreur pédagogique)
- **Prompt** : "Ceratosaurus, **bipedal theropod carnivore** from Late Jurassic, **single nasal horn**, row of small osteoderms along the back, 4-fingered hands, sharp teeth in long jaws. NOT a horned ceratopsian, NOT quadrupedal. Realistic style. Proper proportions."

### `euoplocephalus` (Euoplocéphale)
- **Vues à regen** : taille, environnement, chasse
- **Problème actuel** : chimères avec tête de prédateur + massue détachée flottante
- **Prompt** : "Euoplocephalus, ankylosaurid dinosaur, **low quadrupedal armored body**, **bony club firmly attached at end of tail** (not floating), short blunt herbivore head with no teeth visible. NOT a theropod head. Bony plates cover the back. Proper proportions."

### `kentrosaurus` (Kentrosaure)
- **Vues à regen** : taille, environnement, chasse
- **Problème actuel** : ornithopodes bipèdes au lieu de stégosauridé
- **Prompt** : "Kentrosaurus, African stegosaurid, **quadrupedal**, small bony plates on shoulders+back, **paired long sharp spikes on the hips and tail**, one shoulder spike, small head low to the ground, herbivore. NOT bipedal."

### `pachycephalosaurus` (Pachycéphalosaure)
- **Vues à regen** : taille, environnement, chasse
- **Problème actuel** : dôme rendu en carapace de tortue + posture quadrupède
- **Prompt** : "Pachycephalosaurus, **bipedal** dinosaur, **thick smooth rounded bone dome on top of skull** (NOT textured like a turtle shell), small bony knobs around the rim of the dome, long balancing tail held horizontal, walking on two legs. Cretaceous setting."

## A.2 — Regen partielles (1-2 vues KO seulement)

| Dino | Vue à refaire | Raison |
|---|---|---|
| `gorgosaurus` | taille + environnement | Herbivores génériques (chasse OK) |
| `albertosaurus` | environnement | Herbivore générique (taille+chasse OK) |
| `amargasaurus` | environnement + chasse + "Sa vie" (sans prédateur) | Double rangée d'épines absente |
| `plateosaurus` | taille | Morphologie sauropode (env+chasse OK) |
| `diplodocus` | taille | Silhouette brachiosaure |
| `stegosaurus` | taille + "Sa vie" (sans prédateur) | Hybride cératopsien |
| `styracosaurus` | environnement + "Sa vie" (sans prédateur) | Pointes trop courtes |
| `giganotosaurus` | chasse | Meutes confuses, lot4 entier difforme |
| `carcharodontosaurus` | chasse | Fausse voile dorsale (confusion Spinosaure) |

---

# Section B — Herbivores : nouvelle règle "Sa vie" SANS carnivore

Sur **7 herbivores actuellement validés**, la vue "chasse" contient un prédateur et doit être regen en "Sa vie" propre.

| Dino | À regen comme "Sa vie" | Scène à demander |
|---|---|---|
| `ankylosaurus` | sans T-Rex | Ankylosaure seul, broutant plantes basses, massue posée. |
| `triceratops` (Tritri !) | sans T-Rex | Tritri seul ou en troupeau familial (adulte + petit), broutage. |
| `styracosaurus` | sans T-Rex | Troupeau marchant paisiblement. |
| `stegosaurus` | sans théropode | Seul ou en couple, broute fougères, thagomizer visible. |
| `amargasaurus` | (déjà listé A.2) | Amargasaure broute, **double rangée d'épines** OBLIGATOIRE. |
| `brachiosaurus_lot1_3` | sans rien à corriger côté carnivore | Pattes avant plus longues (signature), atteignant cime d'un arbre. |
| `camarasaurus_lot3_3` | théropode en arrière-plan à virer | Tête trapue boxy, museau court (signature vs diplodocus). |

---

# Section C — 4e vue "Qui le chasse" (NOUVEAU)

Scène de bagarre **prédateur historique × herbivore**, cohérence époque/continent obligatoire.

| Herbivore | Prédateur cohérent | Justif scientifique |
|---|---|---|
| triceratops | **T-Rex** | Crétacé sup. Amérique N. — combat documenté (os de T-Rex avec marques de cornes !) |
| torosaurus | **T-Rex** | Idem Tricératops |
| styracosaurus | **Gorgosaure** ou **Albertosaure** | Crétacé Canada |
| protoceratops | **Vélociraptor** | Crétacé Mongolie — fossile "combattants" célèbre |
| ankylosaurus | **T-Rex** | Crétacé Amérique N. |
| euoplocephalus | **Gorgosaure** | Crétacé Canada |
| stegosaurus | **Allosaure** | Jurassique Amérique N. — duo canonique |
| kentrosaurus | **Allosaure** (proche cousin africain) | Jurassique Afrique |
| brachiosaurus | **Allosaure** | Jurassique Amérique N. |
| diplodocus | **Allosaure** | Idem |
| apatosaurus | **Allosaure** | Idem |
| camarasaurus | **Allosaure** | Idem |
| amargasaurus | **Giganotosaure** ou autre carcharodontosauridé sud-américain | Crétacé Argentine |
| plateosaurus | aucun grand prédateur (Trias) — option : laisser sans 4e vue ou montrer un petit Cœlophysoïde | |
| parasaurolophus | T-Rex | Crétacé sup. Amérique N. |
| corythosaurus | Daspletosaure / Gorgosaure | Crétacé Canada |
| edmontosaurus | **T-Rex** | Crétacé sup. — fossile avec morsure de T-Rex |
| maiasaura | Troodon ou petit théropode | Maman protège ses petits |
| iguanodon | Néovénator / Baryonyx | Crétacé Europe |
| pachycephalosaurus | T-Rex | Crétacé sup. Amérique N. |
| therizinosaurus | Tarbosaure | Crétacé Mongolie |
| psittacosaurus | petits dromaeosauridés | Crétacé Asie |

**Prompt type "Qui le chasse"** :
"[Predator name] confronting [prey name] in [setting]. **Realistic size proportions** between the two animals ([predator] ~Xm tall, [prey] ~Ym tall). Dynamic standoff posture, not gory, no blood, child-friendly illustration. Both anatomies correct with proper signatures visible. [Prey] in defensive stance."

**Pour omnivores** (Troodon, Gallimimus, Oviraptor) : leurs propres prédateurs (T-Rex, Tarbosaure, dromaeosauridés selon époque/continent).

**Pour piscivores** (Suchomimus, Baryonyx, Spinosaure) : option = scène où ils croisent un grand carnivore terrestre cohabitant (ex. Spino vs Carcharodontosaure en Afrique du Nord).

---

# Section D — Dinos SANS AUCUNE image Grok (32 dinos)

À générer 3 vues (taille / environnement / Sa vie) + 4e vue "Qui le chasse" si herbivore/omnivore.

## Carnivores sans grok (8)
- `acrocanthosaurus`, `carnotaurus`, `cryolophosaurus`
- `velociraptor`, `deinonychus`, `utahraptor`, `coelophysis`, `compsognathus`

## Piscivores sans grok (2)
- `suchomimus`, `baryonyx`

## Herbivores sans grok (10)
- `protoceratops`, `psittacosaurus`
- `parasaurolophus`, `corythosaurus`, `edmontosaurus`, `maiasaura`, `iguanodon` (becs)
- `kentrosaurus` (cf. A.1 ; aussi 0 image)
- `euoplocephalus` (cf. A.1)
- `pachycephalosaurus` (cf. A.1)
- `therizinosaurus`

## Volants + marins + Dimétrodon (6)
- `microraptor`, `pteranodon`, `quetzalcoatlus`, `archaeopteryx`
- `mosasaurus`
- `dimetrodon` (PAS un dino — ancêtre des mammifères, voile dorsale signature)

## Omnivores (3)
- `troodon`, `gallimimus`, `oviraptor`

---

# 📊 Comptage volumétrique

| Catégorie | Dinos | Vues totales (3 par dino + 1 si herb/omni) |
|---|---|---|
| Carnivores sans grok | 8 | 24 vues |
| Piscivores sans grok | 2 | 6 vues |
| Herbivores sans grok | 10 | 40 vues (3 + 1 "qui le chasse") |
| Volants/marins/Dimetro | 6 | 18 vues (Dimetro+oiseaux pas chassés) |
| Omnivores sans grok | 3 | 12 vues (3 + 1) |
| **A.1 carnivores 3/3 KO** | 5 | 15 vues |
| **A.2 partielles** | 9 | ~12 vues |
| **B. Herbivores "Sa vie"** | 7 | 7 vues |
| **C. 4e vue "qui le chasse" (déjà couverts)** | ~12 | 12 vues |
| **TOTAL à générer** | | **~146 vues** |

À 1 image/30s Grok ≈ ~1h15 de génération étalée.

---

# ✅ Ce qui est OK et ne bouge pas

19 dinos avec grok, dont **12 quasi parfaits** :
- Carnivores : tyrannosaurus, allosaurus (sauf chasse), giganotosaurus (sauf chasse), carcharodontosaurus (sauf chasse)
- Sauropodes : brachiosaurus, diplodocus (sauf taille), apatosaurus, camarasaurus
- Cératopsiens : triceratops (vues taille+env OK), torosaurus (3/3 OK)
- Autres : dilophosaurus (1 vue OK), spinosaurus (5/6 OK)
