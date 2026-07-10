# Lexique de prononciation — noms de dinos (Português BR / portugais brésilien)

> **Langue cible : portugais brésilien (Português do Brasil).**
> **Méthode : respelling à l'oreille brésilienne** (langue latine → on garde souvent la forme portugaise établie « -sauro », et on ré-écrit le reste comme il SONNE en PT-BR).
> **Voix TTS cible : Native Brazilian Portuguese** (ElevenLabs eleven_v3).
> ⚠️ **Ce texte sert UNIQUEMENT à l'audio TTS avec une voix native brésilienne. Il n'est JAMAIS affiché à l'écran.** On peut donc déformer l'orthographe sans scrupule : le seul objectif est que le nom SONNE juste dans la bouche d'un locuteur brésilien.
>
> La forme scientifique reste dans la colonne « nom scientifique » (référence). La colonne « À ÉCRIRE POUR LE TTS » est ce qu'on donne réellement à la voix.
> Tonique marquée en **PETITES CAPITALES** sur la syllabe accentuée (ex : `Ti-ra-no-SAU-ro`).

---

## 1. Règles de conversion (racines grec/latin → portugais brésilien)

Le portugais brésilien a déjà des formes vernaculaires pour la plupart des dinos (« Tiranossauro », « Braquiossauro »…). On s'appuie dessus, puis on respelle pour guider la tonique et éviter les pièges TTS.

| Graphie savante | Se prononce en PT-BR | Respeller en | Exemple |
|-----------------|----------------------|--------------|---------|
| `-saurus` (latin) | « -sáuro » (forme portugaise) | **-SAU-ro** | Tyranno**saurus** → Ti-ra-no-**SAU**-ro |
| `ch` (grec, son « k ») | son « k » | **qu** (devant e/i) / **c**/**k** (devant a/o/u) | Bra**ch**io → Bra-**qui**-o ; Car**ch**aro → Car-**ca**-ro |
| `ph` | son « f » | **f** | Dilo**ph**o → Di-lo-**f**o |
| `th` | son « t » | **t** | Orni**th**o → Or-ni-**t**o ; Th- initial → **T-** |
| `y` (grec) | son « i » | **i** | Pach**y** → Pa-qu**i** ; Bar**y** → Ba-r**i** |
| `x` (final / interne) | son « ks » | **cs** / **x** clair | Baryon**yx** → Ba-ri-o-**nix** ; Archaeopter**yx** → Ar-que-óp-te-**rix** |
| `ae` / `oe` | son « é » | **é** | Ar**cha**e**o** → Ar-qu**e**-o ; Coelo → C**e**-lo |
| `qu` devant a/o | « koua » risque | garder **qua/quo** (koua/kouo) ou clarifier en **cu** | Quetzal → Quét-zal |
| `s` entre voyelles | son « z » | **doubler → ss** pour garder le son « s » dur du grec | -sáuro s'écrit **-ssauro** dans le corps du nom si intervocalique |
| `r` initial | « r » guttural (jota) fort | garder **r-** (le natif le fait seul) | Rex → **Réx** (r guttural) |
| `r` entre voyelles | « r » battu léger | garder **r** simple | Ti-ra-no |
| `on` / `an` / `en` finaux | **nasalisés** en PT-BR | risque de « -õ » / « -ã » nasal | Iguanodon → I-goua-no-**dôn** (on final nasalisé, accepté) |
| `nh` | son « gn » français | **nh** = « gn » | (utile si racine « -gnathus ») |
| `lh` | son « ill » mouillé | **lh** | (rare sur ces noms) |
| `di` / `ti` devant voyelle | palatalisation BR « dji » / « tchi » | phénomène **naturel** du natif, ne pas combattre | Dilo → « Dji-lo » (OK, brésilien) |

**Note tonique (essentiel) :** en portugais, la plupart de ces mots sont **paroxytons** (accent sur l'avant-dernière syllabe) → « -SAU-ro » est tonique sur SAU. Les formes en « -tops » (Triceratops) sont accentuées sur l'avant-dernière aussi : Tri-ce-RÁ-tops. On marque la tonique en petites capitales pour verrouiller.

**Anti-pièges TTS :** ❌ ne pas laisser « -saurus » brut (le natif dira « -saúrus » latinisant) → toujours **-sáuro / -SAU-ro**. ❌ ne pas laisser un `s` intervocalique se voiser en « z » quand le son doit être « s » (Mosasauro sonnerait « Mozazauro ») → **doubler le s** : Mo-za-**SS**au-ro reste un cas — voir table + incertitudes.

---

## 2. Table des 60 dinos

> Colonne « À ÉCRIRE POUR LE TTS » = forme à donner à la voix native brésilienne. Tonique en PETITES CAPITALES.
> Écriture latine (pas de romanisation nécessaire — le PT-BR s'écrit en alphabet latin).

| id | nom scientifique | À ÉCRIRE POUR LE TTS (PT-BR) | Piège éventuel |
|----|------------------|------------------------------|----------------|
| aenocyon | Aenocyon | **E-no-SSÍ-on** | ae→é, c(y)→ss, y→i ; forme rare, voir incertitudes |
| albertosaurus | Albertosaurus | **Al-ber-to-SSAU-ro** | s intervoc.→doubler ss |
| allosaurus | Allosaurus | **A-lo-SSAU-ro** | ll→l simple, ss |
| amargasaurus | Amargasaurus | **A-mar-ga-SSAU-ro** | ss |
| ankylosaurus | Ankylosaurus | **An-qui-lo-SSAU-ro** | y→i, k→qu, ss |
| apatosaurus | Apatosaurus | **A-pa-to-SSAU-ro** | ss |
| archaeopteryx | Archaeopteryx | **Ar-que-óp-te-rix** | ch→qu, ae→é, y→i, x→cs ; forme établie « Arqueópterix » |
| archelon | Archelon | **Ar-que-LON** | ch→qu ; on final nasalisé (accepté) |
| baryonyx | Baryonyx | **Ba-ri-Ô-nix** | y→i (x2), x→cs |
| brachiosaurus | Brachiosaurus | **Bra-qui-o-SSAU-ro** | ch→qu, ss |
| camarasaurus | Camarasaurus | **Ca-ma-ra-SSAU-ro** | ss |
| carcharodontosaurus | Carcharodontosaurus | **Car-ca-ro-don-to-SSAU-ro** | ch→c (devant a), ss |
| carnotaurus | Carnotaurus | **Car-no-TAU-ro** | -taurus→-tauro (pas -sauro !) |
| centrosaurus | Centrosaurus | **Sen-tro-SSAU-ro** | c(e)→s, ss |
| ceratosaurus | Ceratosaurus | **Se-ra-to-SSAU-ro** | c(e)→s, ss |
| coelodonta | Coelodonta | **Se-lo-DON-ta** | oe→é, c(e)→s ; on nasalisé |
| cryolophosaurus | Cryolophosaurus | **Cri-o-lo-fo-SSAU-ro** | y→i, ph→f, ss |
| deinonychus | Deinonychus | **Dei-no-NI-cus** | ch→c, y→i, -us gardé « -cus » |
| dilophosaurus | Dilophosaurus | **Di-lo-fo-SSAU-ro** | ph→f, ss ; « di »→ « dji » naturel |
| dimetrodon | Dimetrodon | **Di-me-tro-DON** | on nasalisé ; « di »→ « dji » naturel |
| diplodocus | Diplodocus | **Di-PLÓ-do-cus** | -us gardé « -cus » ; tonique PLÓ (usage BR) |
| edmontonia | Edmontonia | **Ed-mon-TÔ-ni-a** | on nasalisé |
| edmontosaurus | Edmontosaurus | **Ed-mon-to-SSAU-ro** | ss ; on nasalisé |
| elasmosaurus | Elasmosaurus | **E-laz-mo-SSAU-ro** | s(intervoc.)→z dans « las », puis ss |
| euoplocephalus | Euoplocephalus | **Eu-o-plo-SSÉ-fa-lus** | ph→f, ce→ss é ; -us gardé « -lus » |
| gallimimus | Gallimimus | **Ga-li-MI-mus** | ll→l, -us gardé « -mus » |
| giganotosaurus | Giganotosaurus | **Ji-ga-no-to-SSAU-ro** | g(i)→« ji », ss |
| glyptodon | Glyptodon | **Glip-to-DON** | y→i, on nasalisé |
| ichthyosaurus | Ichthyosaurus | **Ic-ti-o-SSAU-ro** | ch→c, th→t, y→i, ss |
| iguanodon | Iguanodon | **I-goua-no-DON** | gua→« goua », on nasalisé |
| kentrosaurus | Kentrosaurus | **Ken-tro-SSAU-ro** | k gardé, ss |
| liopleurodon | Liopleurodon | **Li-o-pleu-ro-DON** | on nasalisé |
| mammuthus | Mammuthus | **Ma-MU-tus** | th→t, -us gardé « -tus » |
| megatherium | Megatherium | **Me-ga-TÉ-ri-um** | th→t ; -um final |
| microraptor | Microraptor | **Mi-cro-RAP-tor** | r final guttural léger |
| mosasaurus | Mosasaurus | **Mo-za-SSAU-ro** | 1er s intervoc.→z (Mo-za), puis ss |
| ophthalmosaurus | Ophthalmosaurus | **Of-tal-mo-SSAU-ro** | ph→f, th→t, ss |
| oviraptor | Oviraptor | **O-vi-RAP-tor** | r final guttural léger |
| pachycephalosaurus | Pachycephalosaurus | **Pa-qui-se-fa-lo-SSAU-ro** | ch→qu, y→i, ph→f, ce→se, ss |
| paraceratherium | Paraceratherium | **Pa-ra-se-ra-TÉ-ri-um** | ce→se, th→t, -um |
| parasaurolophus | Parasaurolophus | **Pa-ra-sau-RÓ-lo-fus** | ph→f, -us gardé « -fus » |
| patagotitan | Patagotitan | **Pa-ta-go-ti-TÃ** | -tan final nasalisé fort « -tã » (BR) |
| pentaceratops | Pentaceratops | **Pen-ta-se-RÁ-tops** | ce→se, tonique RÁ ; -tops gardé |
| plateosaurus | Plateosaurus | **Pla-te-o-SSAU-ro** | ss |
| protoceratops | Protoceratops | **Pro-to-se-RÁ-tops** | ce→se, tonique RÁ ; -tops gardé |
| pteranodon | Pteranodon | **Pte-ra-no-DON** | Pt- initial articulé, on nasalisé |
| quetzalcoatlus | Quetzalcoatlus | **Quét-zal-co-A-tlus** | aztèque ; -us gardé « -tlus », voir incertitudes |
| shonisaurus | Shonisaurus | **Cho-ni-SSAU-ro** | sh→ch (« ch » français), ss |
| smilodon | Smilodon | **Zmi-lo-DON** | S- initial + m → tend vers « z » en BR ; on nasalisé |
| spinosaurus | Spinosaurus | **Es-pi-no-SSAU-ro** | S+consonne initial→« es- » (BR ajoute e), ss |
| stegosaurus | Stegosaurus | **Es-te-go-SSAU-ro** | St- initial→« Est- » (BR), ss |
| tarbosaurus | Tarbosaurus | **Tar-bo-SSAU-ro** | ss |
| therizinosaurus | Therizinosaurus | **Te-ri-zi-no-SSAU-ro** | Th→T, z gardé, ss |
| titanis | Titanis | **Ti-TÃ-nis** | -tan- nasalisé « tã » ; voir incertitudes |
| torosaurus | Torosaurus | **To-ro-SSAU-ro** | ss |
| triceratops | Triceratops | **Tri-se-RÁ-tops** | c(e)→s, tonique RÁ ; -tops gardé (forme BR « Tricerátops ») |
| troodon | Troodon | **Tro-o-DON** | double o articulé, on nasalisé |
| tyrannosaurus | Tyrannosaurus | **Ti-ra-no-SSAU-ro** | y→i, nn→n, ss (forme BR « Tiranossauro ») |
| utahraptor | Utahraptor | **U-ta-RAP-tor** | h muet, r final guttural léger |
| velociraptor | Velociraptor | **Ve-lo-si-RAP-tor** | c(i)→s, r final guttural léger |

---

## 3. Noms qui se lisent BIEN tels quels (forme portugaise directe, respelling léger)

Le portugais brésilien étant une langue latine, ces noms passent sans piège majeur pour une voix native — on garde la **forme vernaculaire BR** (déjà présente dans la table, colonne TTS) :

Albertossauro · Alossauro · Amargassauro · Apatossauro · Camarassauro · Amargassauro · Tarbossauro · Torossauro · Plateossauro · Ankilossauro · Kentrossauro · Centrossauro · Ceratossauro · Carnotauro · Edmontossauro · Microrraptor · Oviraptor · Velociraptor · Utahraptor · Liopleurodon · Dimetrodon · Iguanodon.

> Pour tous les autres (ch, ph, th, y, S+consonne initial, aztèque, nasales fortes) → respelling **obligatoire** de la table §2. En cas de doute → respeller, ça ne coûte rien.

---

## ⚠️ Incertitudes (à faire valider par un locuteur natif brésilien)

Noms sans forme portugaise clairement établie, ou dont la tonique / le voisement du `s` mérite une écoute. **Je n'ai rien inventé** : ci-dessous la translittération la plus standard proposée + le point à trancher.

- **aenocyon** → `E-no-SSÍ-on` : genre récent (loup de Pluto / dire-wolf), **pas de forme portugaise établie**. Le `c` devant `y` peut se lire « s » (proposé) ou « k » selon l'école latine. Tonique SSÍ à confirmer. **À valider.**
- **titanis** (oiseau-terreur, pas « titan ») → `Ti-TÃ-nis` : le `-tan-` nasalisé « tã » est le réflexe BR, mais la forme savante voudrait « Ti-TÂ-nis » non nasalisé. **Choisir nasal vs non-nasal.**
- **patagotitan** → `Pa-ta-go-ti-TÃ` : même question de nasalisation sur « -titan ». Alternative non-nasale : `Pa-ta-go-TI-tan`. **À trancher à l'écoute.**
- **quetzalcoatlus** → `Quét-zal-co-A-tlus` : origine nahuatl, aucune forme portugaise stable. Le groupe « -oatlus » et la tonique sont incertains (« co-Á-tlus » vs « co-a-TLUS »). **À valider.**
- **euoplocephalus** → `Eu-o-plo-SSÉ-fa-lus` : voyelles initiales « Eu-o » enchaînées difficiles ; risque de fusion en « Ewo ». Séparer avec une micro-pause si le natif les colle. **À écouter.**
- **coelodonta** → `Se-lo-DON-ta` : rhinocéros laineux ; forme BR peu attestée. « oe→é/e » et tonique DON à confirmer. **À valider.**
- **smilodon** → `Zmi-lo-DON` : le « S- » initial suivi de « m » tend vers « z » chez beaucoup de Brésiliens, mais certains gardent « S » net. **Écouter Zmi vs Smi.**
- **`-us` finaux gardés** (Deinonychus→ « -cus », Gallimimus→ « -mus », Diplodocus→ « -cus », Mammuthus→ « -tus », Euoplocephalus→ « -lus », Parasaurolophus→ « -fus », Quetzalcoatlus→ « -tlus ») : contrairement à « -saurus »→ « -sauro », ces noms **n'ont pas de forme « -o » portugaise consacrée**. J'ai gardé le « -us » latin lisible par un natif, mais l'usage BR pourrait préférer « -o » (ex « Diplódoco »). **À arbitrer globalement : garder « -us » latin ou porter en « -o » brésilien ?**
- **Voisement du `s` intervocalique** : partout j'ai **doublé le s** (« -SSAU-ro », « Mo-za-SSAU-ro ») pour forcer le son « s » dur. Reste à vérifier à l'oreille que la voix native ne le durcit pas trop / ne le voise pas quand même. **Preview groupé recommandé.**

---

_Créé pour la production audio dino MaxPlay — voix Native Brazilian Portuguese. Structure calquée sur le lexique FR de référence (`fr.md`). Passer un PREVIEW PHONÉTIQUE GROUPÉ (1 MP3 énonçant tous les noms à risque) avant toute prod de masse, et faire valider la section Incertitudes par un locuteur natif._
