# Lexique de prononciation — noms de dinos en CHINOIS MANDARIN (中文) pour ElevenLabs (eleven_v3)

> **Langue cible : chinois mandarin (中文, Pǔtōnghuà).** Voix TTS : **Native Mandarin Chinese**.
> **Méthode : écriture native + nom établi** (PAS de translittération phonétique). Le chinois nomme les dinosaures de façon **sémantique**, avec le suffixe **龙 (lóng, « dragon ») ≈ « -saure »**. Ex : *Tyrannosaurus* n'est pas « ta-i-ra-no », c'est **霸王龙** (bàwánglóng, « dragon roi-tyran »).
> **Ce lexique sert à générer l'AUDIO TTS avec une voix native mandarin. Le texte parlé (hanzi) n'est JAMAIS affiché à l'écran** — c'est uniquement l'entrée que lit la voix. La colonne pinyin sert au contrôle humain, pas au TTS (on donne les **hanzi** au moteur).
> Forgé sur le gabarit FR [`fr.md`](fr.md).

---

## 1. Comment le chinois rend les racines grec/latin

Le chinois **ne transcrit pas les sons** grec/latin : il **traduit le sens** de la racine et colle **龙** (dragon) à la fin. Il n'y a donc **rien à « respeller »** — on choisit le **hanzi établi** de la paléontologie chinoise. Table des correspondances de racines les plus fréquentes :

| Racine savante | Sens | Rendu chinois usuel | Exemple |
|----------------|------|---------------------|---------|
| `-saurus` / `-saure` | lézard/reptile | **龙** (lóng, dragon) | 剑龙 jiànlóng (Stégosaure) |
| `-tops` (ceratops) | face/corne | **角龙** (jiǎolóng, dragon à cornes) | 三角龙 sānjiǎolóng |
| `-raptor` | voleur/rapace | **盗龙** (dàolóng, dragon voleur) | 伶盗龙 língdàolóng |
| `-mimus` (imitateur) | imite | **鸟龙 / 似…龙** (semblable à…) | 似鸡龙 sìjīlóng (Gallimimus) |
| `-don` / `-odon` (dent) | dent | **齿龙 / 龙** (齿 chǐ = dent) | 禽龙 qínlóng (Iguanodon) |
| `-nyx` / `-onyx` (griffe) | griffe | **爪龙** (zhǎolóng, dragon à griffes) | 重爪龙 zhòngzhǎolóng (Baryonyx) |
| `ptero-` (aile) | aile | **翼龙** (yìlóng, dragon ailé = ptérosaure) | 无齿翼龙 wúchǐyìlóng (Pteranodon) |
| `-suchus` (crocodile) | crocodile | rare ; sinon **龙** | — |
| préfixe couleur/forme | descriptif | traduit littéralement | 双脊龙 shuāngjǐlóng (Dilophosaure = « à deux crêtes ») |
| créatures marines (non-dino) | poisson/reptile marin | **鱼龙** yúlóng (ichthyosaures), **蛇颈龙** shéjǐnglóng (plésiosaures), **沧龙** cānglóng (mosasaures) | voir table |
| mammifères de l'ère glaciaire (non-dino) | pas de 龙 | nom mammalien réel | 猛犸象 měngmǎxiàng (mammouth), 剑齿虎 jiànchǐhǔ (Smilodon) |

**Points de vigilance natifs :**
- Beaucoup de dinos ont **DEUX noms chinois** : un **sémantique** (剑龙 « dragon-épée ») et parfois un **phonétique savant** (rare, ex. 迷惑龙 míhuòlóng pour Apatosaure = « dragon trompeur », traduction du sens grec). On donne le **plus courant / grand public**.
- 龙 se prononce **lóng** (2e ton). Les composés se lisent d'un trait : 霸王龙 = bà-wáng-lóng.
- Les **créatures marines et les mammifères glaciaires ne sont PAS des « 龙 »** en usage strict, mais l'enfant chinois les rencontre sous 鱼龙/沧龙 (marins) et sous leur vrai nom mammalien (mammouth, tigre à dents de sabre). On respecte l'usage réel.

---

## 2. Table des 60 dinos — hanzi (lu par le TTS) + pinyin + sens

> **Donner au moteur TTS la colonne « hanzi ».** Pinyin = contrôle humain. ⚠ = à faire valider par un natif (voir §4).

| id | nom scientifique | HANZI (pour le TTS) | pinyin (tons) | sens littéral | piège |
|----|------------------|---------------------|---------------|---------------|-------|
| aenocyon | *Aenocyon dirus* (loup géant) | 恐狼 | kǒngláng | « loup terrible » (dire wolf) | ⚠ non-dino ; 恐狼 = usage jeu vidéo/pop, terme zoologique = 恐狼/致命狼 |
| albertosaurus | *Albertosaurus* | 阿尔伯托龙 | ā'ěrbótuōlóng | translittération d'Alberta + 龙 | phonétique (nom propre géographique) |
| allosaurus | *Allosaurus* | 异特龙 | yìtèlóng | « dragon différent/étrange » | aussi 跃龙 yuèlóng (Taïwan) |
| amargasaurus | *Amargasaurus* | 阿马加龙 | āmǎjiālóng | translit. La Amarga + 龙 | phonétique (lieu argentin) |
| ankylosaurus | *Ankylosaurus* | 甲龙 | jiǎlóng | « dragon cuirassé/à armure » | 甲 = armure |
| apatosaurus | *Apatosaurus* | 迷惑龙 | míhuòlóng | « dragon trompeur » (sens grec apatē) | aussi 雷龙 léilóng (ex-Brontosaure), ne pas confondre |
| archaeopteryx | *Archaeopteryx* | 始祖鸟 | shǐzǔniǎo | « oiseau ancêtre primordial » | ⚠ PAS de 龙 — c'est un **oiseau** (鸟 niǎo). Nom ultra-établi |
| archelon | *Archelon* (tortue géante) | 古巨龟 | gǔjùguī | « tortue géante antique » | ⚠ non-dino, 龟 guī = tortue (pas 龙) |
| baryonyx | *Baryonyx* | 重爪龙 | zhòngzhǎolóng | « dragon à lourdes griffes » | 爪 zhǎo = griffe |
| brachiosaurus | *Brachiosaurus* | 腕龙 | wànlóng | « dragon-bras/avant-bras » | 腕 wàn = poignet/bras |
| camarasaurus | *Camarasaurus* | 圆顶龙 | yuándǐnglóng | « dragon à tête ronde/voûtée » | aussi 隅龙 |
| carcharodontosaurus | *Carcharodontosaurus* | 鲨齿龙 | shāchǐlóng | « dragon à dents de requin » | 鲨 shā = requin, 齿 chǐ = dent |
| carnotaurus | *Carnotaurus* | 食肉牛龙 | shíròuniúlóng | « dragon-taureau carnivore » | souvent abrégé 牛龙 niúlóng (« dragon-taureau ») |
| centrosaurus | *Centrosaurus* | 尖角龙 | jiānjiǎolóng | « dragon à corne pointue » | ne pas confondre avec 戟龙 (Styracosaure) |
| ceratosaurus | *Ceratosaurus* | 角鼻龙 | jiǎobílóng | « dragon à corne nasale » | 鼻 bí = nez |
| coelodonta | *Coelodonta* (rhino laineux) | 披毛犀 | pīmáoxī | « rhinocéros à toison » | ⚠ non-dino, mammifère ; 犀 xī = rhinocéros |
| cryolophosaurus | *Cryolophosaurus* | 冰脊龙 | bīngjǐlóng | « dragon à crête de glace » | 冰 bīng = glace, 脊 jǐ = crête |
| deinonychus | *Deinonychus* | 恐爪龙 | kǒngzhǎolóng | « dragon à griffes terribles » | 恐 kǒng = terrible/effrayant |
| dilophosaurus | *Dilophosaurus* | 双脊龙 | shuāngjǐlóng | « dragon à deux crêtes » | 双 shuāng = deux/paire ; aussi 双嵴龙 |
| dimetrodon | *Dimetrodon* | 异齿龙 | yìchǐlóng | « (reptile) à dents différentes » | ⚠ non-dino (synapside) ; homonyme possible — souvent 异齿龙, aussi 基龙-famille. À valider |
| diplodocus | *Diplodocus* | 梁龙 | liánglóng | « dragon-poutre » | 梁 liáng = poutre/pont |
| edmontonia | *Edmontonia* | 埃德蒙顿甲龙 | āidéméngdùnjiǎlóng | « dragon cuirassé d'Edmonton » | phonétique (lieu) + 甲龙 ; ⚠ parfois juste 埃德蒙顿龙 |
| edmontosaurus | *Edmontosaurus* | 埃德蒙顿龙 | āidéméngdùnlóng | « dragon d'Edmonton » | phonétique (lieu canadien) |
| elasmosaurus | *Elasmosaurus* | 薄板龙 | báobǎnlóng | « dragon à fines plaques » | ⚠ reptile marin (plésiosaure), pas dino ; usage 龙 ok ici |
| euoplocephalus | *Euoplocephalus* | 包头龙 | bāotóulóng | « dragon à tête blindée/enveloppée » | 包 bāo = envelopper |
| gallimimus | *Gallimimus* | 似鸡龙 | sìjīlóng | « dragon semblable au coq » | 似 sì = ressembler à, 鸡 jī = poule/coq |
| giganotosaurus | *Giganotosaurus* | 南方巨兽龙 | nánfāngjùshòulóng | « dragon-bête géant du Sud » | 巨兽 jùshòu = bête géante ; long mais standard |
| glyptodon | *Glyptodon* | 雕齿兽 | diāochǐshòu | « bête à dents sculptées » | ⚠ non-dino, mammifère ; 兽 shòu = bête (pas 龙) |
| ichthyosaurus | *Ichthyosaurus* | 鱼龙 | yúlóng | « dragon-poisson » | ⚠ reptile marin ; 鱼 yú = poisson. 鱼龙 = genre ET groupe |
| iguanodon | *Iguanodon* | 禽龙 | qínlóng | « dragon-oiseau/gibier » | 禽 qín = oiseau/volaille (choix historique du traducteur) |
| kentrosaurus | *Kentrosaurus* | 钉状龙 | dīngzhuànglóng | « dragon en forme de clou/pointe » | 钉 dīng = clou ; aussi 肯氏龙 (phonétique) |
| liopleurodon | *Liopleurodon* | 滑齿龙 | huáchǐlóng | « dragon à dents lisses » | ⚠ reptile marin (pliosaure) ; 滑 huá = lisse |
| mammuthus | *Mammuthus* (mammouth) | 猛犸象 | měngmǎxiàng | « éléphant mammouth » | ⚠ non-dino, mammifère ; 象 xiàng = éléphant. Ultra-établi |
| megatherium | *Megatherium* (paresseux géant) | 大地懒 | dàdìlǎn | « paresseux terrestre géant » | ⚠ non-dino, mammifère ; 懒 lǎn = paresseux |
| microraptor | *Microraptor* | 小盗龙 | xiǎodàolóng | « petit dragon voleur » | 小 xiǎo = petit, 盗 dào = voler |
| mosasaurus | *Mosasaurus* | 沧龙 | cānglóng | « dragon des mers/de la Meuse » | ⚠ reptile marin ; 沧 cāng = mer vaste. 沧龙 = genre ET groupe |
| ophthalmosaurus | *Ophthalmosaurus* | 大眼鱼龙 | dàyǎnyúlóng | « ichthyosaure à grands yeux » | ⚠ marin ; 眼 yǎn = œil. Rend « ophthalmo » par le sens (œil) |
| oviraptor | *Oviraptor* | 窃蛋龙 | qièdànlóng | « dragon voleur d'œufs » | 窃 qiè = voler, 蛋 dàn = œuf |
| pachycephalosaurus | *Pachycephalosaurus* | 肿头龙 | zhǒngtóulóng | « dragon à tête enflée/épaisse » | 肿 zhǒng = enflé, 头 tóu = tête |
| paraceratherium | *Paraceratherium* | 巨犀 | jùxī | « rhinocéros géant » | ⚠ non-dino, mammifère ; 犀 xī = rhinocéros. Aussi 副巨犀 |
| parasaurolophus | *Parasaurolophus* | 副栉龙 | fùzhìlóng | « dragon à crête (en peigne), para- » | 栉 zhì = peigne ; aussi 副龙栉龙 fùlóngzhìlóng (plus complet) |
| patagotitan | *Patagotitan* | 巴塔哥泰坦龙 | bātǎgētàitǎnlóng | translit. Patagonie + Titan + 龙 | ⚠ récent (2017) ; phonétique. Aussi 巴塔哥巨龙 bātǎgējùlóng |
| pentaceratops | *Pentaceratops* | 五角龙 | wǔjiǎolóng | « dragon à cinq cornes » | 五 wǔ = cinq, 角 jiǎo = corne |
| plateosaurus | *Plateosaurus* | 板龙 | bǎnlóng | « dragon-plaque/plat » | 板 bǎn = planche/plaque |
| protoceratops | *Protoceratops* | 原角龙 | yuánjiǎolóng | « dragon à cornes primitif/originel » | 原 yuán = originel/primitif |
| pteranodon | *Pteranodon* | 无齿翼龙 | wúchǐyìlóng | « ptérosaure sans dents » | ⚠ ptérosaure (reptile volant) ; 翼 yì = aile, 无齿 wúchǐ = sans dents |
| quetzalcoatlus | *Quetzalcoatlus* | 风神翼龙 | fēngshényìlóng | « ptérosaure dieu-du-vent » | ⚠ ptérosaure ; 风神 fēngshén = dieu du vent (rend Quetzalcoatl, dieu aztèque) |
| shonisaurus | *Shonisaurus* | 秀尼鱼龙 | xiùníyúlóng | « ichthyosaure de Shoshone (秀尼) » | ⚠ marin ; 秀尼 = translit. Shoshone + 鱼龙 |
| smilodon | *Smilodon* (tigre à dents de sabre) | 剑齿虎 | jiànchǐhǔ | « tigre à dents-épées » | ⚠ non-dino, mammifère ; 虎 hǔ = tigre, 剑齿 = dents-sabre |
| spinosaurus | *Spinosaurus* | 棘龙 | jílóng | « dragon-épine » | 棘 jí = épine/ronce (l'épine dorsale = « voile ») |
| stegosaurus | *Stegosaurus* | 剑龙 | jiànlóng | « dragon-épée » | 剑 jiàn = épée (les plaques dorsales) |
| tarbosaurus | *Tarbosaurus* | 特暴龙 | tèbàolóng | « dragon terrifiant/violent particulier » | 暴 bào = violent (cousin du T-rex 暴龙) |
| therizinosaurus | *Therizinosaurus* | 镰刀龙 | liándāolóng | « dragon-faux/faucille » | 镰刀 liándāo = faucille (les griffes) |
| titanis | *Titanis* (oiseau-terreur) | 骇鸟 | hàiniǎo | « oiseau terrifiant » (terror bird) | ⚠ non-dino, oiseau géant ; 骇鸟 = nom du groupe « terror birds ». À valider pour le genre précis |
| torosaurus | *Torosaurus* | 牛角龙 | niújiǎolóng | « dragon à cornes de taureau » | 牛 niú = bœuf/taureau ; ne pas confondre avec 牛龙 (Carnotaure) |
| triceratops | *Triceratops* | 三角龙 | sānjiǎolóng | « dragon à trois cornes » | 三 sān = trois. **Tritri de Max.** Nom ultra-établi |
| troodon | *Troodon* | 伤齿龙 | shāngchǐlóng | « dragon à dents blessantes » | 伤 shāng = blesser, 齿 chǐ = dent |
| tyrannosaurus | *Tyrannosaurus rex* | 霸王龙 | bàwánglóng | « dragon roi-tyran » | aussi 暴龙 bàolóng (« dragon violent ») ; 霸王 = grand public en Chine |
| utahraptor | *Utahraptor* | 犹他盗龙 | yóutādàolóng | « dragon voleur de l'Utah » | 犹他 = translit. Utah + 盗龙 |
| velociraptor | *Velociraptor* | 伶盗龙 | língdàolóng | « dragon voleur agile/vif » | 伶 líng = agile/vif ; aussi 迅猛龙 xùnměnglóng (grand public, films) |

---

## 3. Récapitulatif par catégorie (pour la voix native)

**龙 « vrais dinosaures » (à lire d'un trait, ton lóng final) :** 异特龙, 甲龙, 迷惑龙, 重爪龙, 腕龙, 圆顶龙, 鲨齿龙, 食肉牛龙, 尖角龙, 角鼻龙, 冰脊龙, 恐爪龙, 双脊龙, 梁龙, 埃德蒙顿龙, 包头龙, 似鸡龙, 南方巨兽龙, 禽龙, 钉状龙, 小盗龙, 窃蛋龙, 肿头龙, 副栉龙, 五角龙, 板龙, 原角龙, 棘龙, 剑龙, 特暴龙, 镰刀龙, 牛角龙, 三角龙, 伤齿龙, 霸王龙, 犹他盗龙, 伶盗龙, 阿尔伯托龙, 阿马加龙, 埃德蒙顿甲龙, 巴塔哥泰坦龙.

**翼龙 ptérosaures (reptiles volants, PAS des dinos) :** 无齿翼龙 (Pteranodon), 风神翼龙 (Quetzalcoatlus).

**鱼龙 / 沧龙 / 蛇颈龙 reptiles marins (PAS des dinos) :** 鱼龙 (Ichthyosaurus), 大眼鱼龙 (Ophthalmosaurus), 秀尼鱼龙 (Shonisaurus), 沧龙 (Mosasaurus), 薄板龙 (Elasmosaurus), 滑齿龙 (Liopleurodon).

**鸟 / 龟 oiseaux & tortue (PAS des dinos-龙) :** 始祖鸟 (Archaeopteryx), 骇鸟 (Titanis), 古巨龟 (Archelon).

**Mammifères & synapsides (aucun 龙 — vrais noms mammaliens) :** 猛犸象 (Mammuthus), 剑齿虎 (Smilodon), 披毛犀 (Coelodonta), 巨犀 (Paraceratherium), 大地懒 (Megatherium), 雕齿兽 (Glyptodon), 恐狼 (Aenocyon), 异齿龙 (Dimetrodon — synapside, garde 龙 par tradition).

> **Il n'y a PAS de « liste se lisant bien telle quelle » comme en français** : le chinois ne lit jamais le latin. Tous les noms ci-dessus sont des **hanzi natifs**, chacun se lit sans ambiguïté par une voix mandarin. Le seul « risque » de prononciation vient des composés phonétiques longs (阿尔伯托龙, 埃德蒙顿甲龙, 巴塔哥泰坦龙, 秀尼鱼龙) — ils restent lisibles caractère par caractère.

---

## 4. ⚠️ Incertitudes — à faire valider par un natif / paléontologue chinois

Je n'invente aucun hanzi ; les points ci-dessous sont ceux où le **choix du nom** (variante concurrente, terme rare, ou entité peu médiatisée en Chine) mérite confirmation d'un humain natif avant prod audio de masse :

1. **aenocyon (恐狼)** — « dire wolf ». 恐狼 est très répandu (jeux/séries) mais le terme zoologique chinois pour *Aenocyon dirus* peut varier (致命犬/恐狼). À confirmer pour un usage encyclopédique.
2. **dimetrodon (异齿龙)** — synapside, PAS un dinosaure. 异齿龙 est courant mais **homonyme** possible avec d'autres « dragons à dents différentes ». Vérifier qu'aucune ambiguïté ne gêne l'enfant.
3. **titanis (骇鸟)** — 骇鸟 désigne le **groupe** des « terror birds » (Phorusrhacidae) ; le **genre** *Titanis* précis n'a pas de nom chinois grand public stable. Valider si on garde 骇鸟 (générique) ou un translit. de genre.
4. **patagotitan (巴塔哥泰坦龙 / 巴塔哥巨龙)** — genre récent (2017). Deux formes coexistent (phonétique « Titan » vs sémantique « 巨龙 géant »). Choisir la plus lisible à l'oral pour un enfant.
5. **shonisaurus (秀尼鱼龙)** — reptile marin peu médiatisé en Chine ; 秀尼 est la translit. de « Shoshone ». Confirmer l'orthographe hanzi retenue.
6. **archelon (古巨龟)** — 古巨龟 (« tortue géante antique ») est attesté ; vérifier que c'est le nom retenu vs une translit. phonétique d'Archelon.
7. **coelodonta / megatherium / paraceratherium / glyptodon** — mégafaune non-dino ; les noms (披毛犀, 大地懒, 巨犀, 雕齿兽) sont attestés mais moins « grand public » que mammouth/smilodon. Confirmer qu'ils ne dérouteront pas la voix ni l'enfant.
8. **Variantes « films » vs « science »** — Velociraptor : 伶盗龙 (scientifique) vs 迅猛龙 (films/grand public) ; Apatosaure : 迷惑龙 vs 雷龙 (ex-Brontosaure). J'ai retenu la forme **scientifique établie** ; si l'encyclopédie MaxPlay privilégie la forme grand public entendue par les enfants chinois, basculer sur 迅猛龙 / 雷龙 (décision éditoriale à trancher).

> **Garde-fou process (comme en FR §4) :** générer **1 seul MP3 court** (voix Native Mandarin) énonçant les 60 hanzi d'affilée → écoute unique → corriger tout caractère mal segmenté ou toute variante à changer → mettre à jour cette table → puis prod de masse. Coût : 1 clip vs 60 ratés.

---

_Créé 2026-07-08. Méthode : écriture native + noms de paléontologie chinois établis (龙 = -saure). Sert d'entrée hanzi au TTS voix Native Mandarin. Le texte parlé n'est jamais affiché. Toute incertitude (§4) à valider par un natif avant prod audio de masse._
