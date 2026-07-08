# Lexique de prononciation — noms de dinos (RUSSE / Русский) pour ElevenLabs (eleven_v3)

> **Langue : russe (Русский).** **Méthode : écriture NATIVE cyrillique** (forme lue par la voix TTS), avec colonne de translittération latine pour contrôle humain.
> **Sert à l'audio TTS voix native (Native Russian).** Le texte parlé n'est **jamais affiché** à l'écran — la forme cyrillique n'existe que pour être *prononcée juste* par la voix russe.
> Voix TTS cible : **Native Russian**. Ne jamais donner à la voix russe la graphie latine (`Tyrannosaurus`) : elle la lirait à l'anglaise ou l'épellerait. **Toujours lui donner la forme cyrillique établie.**

---

## 1. Règles de conversion (racines grec/latin → russe)

Le russe a une **tradition paléontologique riche** : la quasi-totalité des noms de dinosaures ont une forme cyrillique **établie et normalisée**. La règle d'or : **utiliser la forme russe consacrée**, pas une translittération maison.

| Graphie savante (latin) | Rendu russe | Cyrillique | Exemple |
|-------------------------|-------------|------------|---------|
| `-saurus` | **-завр** (-zavr), le *-us* latin **tombe** | `-завр` | Tyranno**saurus** → Тиранно**завр** |
| `ch` (grec, son « k ») | **х** (kh) ou **к** (k) selon usage établi | `х` / `к` | Bra**ch**io → Бра**х**ио ; Car**ch**aro → Кар**х**аро |
| `ph` (son « f ») | **ф** (f) | `ф` | Di**ph**yo → Ди**ло**фо ; Pachyce**ph**alo → Пахицефало |
| `th` (son « t ») | **т** (t) | `т` | Or**th**o → Ор**т**о ; Icht**h**yo → Ихти**о** |
| `y` (grec) | **и** (i) | `и` | Pach**y** → Пах**и** ; Bar**y**onyx → Бар**и**оникс |
| `x` | **кс** (ks) | `кс` | Baryony**x** → Барионик**с** ; Ptérodacty**l** |
| `ae` / `oe` | **е** (ie/é) ou **э** | `е` | Ar**chae**opteryx → Ар**хе**оптерикс |
| `c` devant a/o/u | **к** (k) | `к` | **C**arno → **К**арно |
| `c` devant e/i/y | **ц** (ts) — usage russe | `ц` | Tri**ce**ratops → Три**це**ратопс ; Pachy**ce**phalo → Пахи**це**фало |
| `g` (dur) | **г** (g) | `г` | **G**iganoto → **Г**иганото |
| `h` (aspiré, latin) | souvent **х** ou muet | `х` | *variable, suivre l'usage établi* |
| `qu` | **кв** (kv) | `кв` | **Qu**etzal → **Кв**етцаль |
| `ei`/`ai` (diphtongue) | **ей / ай / ай** | `ей`/`ай` | D**ei**nonychus → Д**ей**нонихус |

**Accent tonique (russe = important) :** la voix russe place naturellement l'accent selon la norme du mot. Pour les longs noms en **-завр**, l'accent tombe presque toujours sur le **-о- avant -завр** (ex. ТираннозА́вр → l'accent est sur « за́ »). Je ne marque pas les accents dans la colonne (la voix native les gère), mais les incertitudes d'accent sont signalées en §5.

---

## 2. Table des 60 dinos

Colonne **« À ÉCRIRE POUR LE TTS »** = forme **cyrillique** à donner à la voix russe. Colonne romanisation = translittération latine (contrôle humain, jamais donnée à la voix).

| id | nom scientifique | À ÉCRIRE POUR LE TTS (cyrillique) | romanisation | piège |
|----|------------------|-----------------------------------|--------------|-------|
| aenocyon | Aenocyon (dire wolf) | **Эноцион** | Enotsion | `ae`→э, `c`+i→ц ; forme peu fixée ⚠️ |
| albertosaurus | Albertosaurus | **Альбертозавр** | Albertozavr | -завр |
| allosaurus | Allosaurus | **Аллозавр** | Allozavr | -завр |
| amargasaurus | Amargasaurus | **Амаргазавр** | Amargazavr | -завр |
| ankylosaurus | Ankylosaurus | **Анкилозавр** | Ankilozavr | `y`→и, -завр |
| apatosaurus | Apatosaurus | **Апатозавр** | Apatozavr | -завр |
| archaeopteryx | Archaeopteryx | **Археоптерикс** | Arkheopteriks | `chae`→хе, `x`→кс |
| archelon | Archelon | **Архелон** | Arkhelon | `ch`→х |
| baryonyx | Baryonyx | **Барионикс** | Barioniks | `y`→и, `x`→кс |
| brachiosaurus | Brachiosaurus | **Брахиозавр** | Brakhiozavr | `ch`→х, -завр |
| camarasaurus | Camarasaurus | **Камаразавр** | Kamarazavr | `c`→к, -завр |
| carcharodontosaurus | Carcharodontosaurus | **Кархародонтозавр** | Kharkharodontozavr → Karkharodontozavr | `ch`→х ×2, -завр |
| carnotaurus | Carnotaurus | **Карнотавр** | Karnotavr | `-taurus`→-тавр (taureau, pas -завр) ⚠️ |
| centrosaurus | Centrosaurus | **Центрозавр** | Tsentrozavr | `ce`→це, -завр |
| ceratosaurus | Ceratosaurus | **Цератозавр** | Tseratozavr | `ce`→це, -завр |
| coelodonta | Coelodonta (rhino laineux) | **Целодонта** | Tselodonta | `coe`→це |
| cryolophosaurus | Cryolophosaurus | **Криолофозавр** | Kriolofozavr | `y`→и, `ph`→ф, -завр |
| deinonychus | Deinonychus | **Дейнонихус** | Deynonikhus | `ei`→ей, `ch`→х, `y`→и |
| dilophosaurus | Dilophosaurus | **Дилофозавр** | Dilofozavr | `ph`→ф, -завр |
| dimetrodon | Dimetrodon | **Диметродон** | Dimetrodon | (pas un dino, pélycosaure) |
| diplodocus | Diplodocus | **Диплодок** | Diplodok | `-us` tombe → -док ⚠️ |
| edmontonia | Edmontonia | **Эдмонтония** | Edmontoniya | `E-`→Э |
| edmontosaurus | Edmontosaurus | **Эдмонтозавр** | Edmontozavr | `E-`→Э, -завр |
| elasmosaurus | Elasmosaurus | **Эласмозавр** | Elasmozavr | `E-`→Э, -завр |
| euoplocephalus | Euoplocephalus | **Эуоплоцефал** | Euoplotsefal | `eu`→эу, `ce`→це, `ph`→ф, `-us` tombe ⚠️ |
| gallimimus | Gallimimus | **Галлимим** | Gallimim | `-us` tombe → -мим ⚠️ |
| giganotosaurus | Giganotosaurus | **Гиганотозавр** | Giganotozavr | `g`→г (dur), -завр |
| glyptodon | Glyptodon | **Глиптодон** | Gliptodon | `y`→и |
| ichthyosaurus | Ichthyosaurus | **Ихтиозавр** | Ikhtiozavr | `ch`→х, `th`→т, `y`→и, -завр |
| iguanodon | Iguanodon | **Игуанодон** | Iguanodon | `gua`→гуа |
| kentrosaurus | Kentrosaurus | **Кентрозавр** | Kentrozavr | -завр |
| liopleurodon | Liopleurodon | **Лиоплевродон** | Lioplevrodon | `eu`→ев (usage russe) |
| mammuthus | Mammuthus | **Мамонт** | Mamont | ⚠️ mot russe usuel = « мамонт », PAS translit latine |
| megatherium | Megatherium | **Мегатерий** | Megateriy | `th`→т, `-ium`→-ий |
| microraptor | Microraptor | **Микрораптор** | Mikroraptor | (se lit bien) |
| mosasaurus | Mosasaurus | **Мозазавр** | Mozazavr | -завр |
| ophthalmosaurus | Ophthalmosaurus | **Офтальмозавр** | Oftalmozavr | `ph`→ф, `th`→т, -завр |
| oviraptor | Oviraptor | **Овираптор** | Oviraptor | (se lit bien) |
| pachycephalosaurus | Pachycephalosaurus | **Пахицефалозавр** | Pakhitsefalozavr | `ch`→х, `y`→и, `ce`→це, `ph`→ф, -завр |
| paraceratherium | Paraceratherium | **Парацератерий** | Paratserateriy | `ce`→це, `th`→т, `-ium`→-ий |
| parasaurolophus | Parasaurolophus | **Паразауролоф** | Parazaurolof | `ph`→ф, `-us` tombe → -лоф ⚠️ |
| patagotitan | Patagotitan | **Патаготитан** | Patagotitan | (se lit bien) |
| pentaceratops | Pentaceratops | **Пентацератопс** | Pentatseratops | `ce`→це |
| plateosaurus | Plateosaurus | **Платеозавр** | Plateozavr | -завр |
| protoceratops | Protoceratops | **Протоцератопс** | Prototseratops | `ce`→це |
| pteranodon | Pteranodon | **Птеранодон** | Pteranodon | `Pt-` initial (russe le dit bien) |
| quetzalcoatlus | Quetzalcoatlus | **Кетцалькоатль** | Ketskoatl → Ketzalkoatl | ⚠️ nahuatl ; forme russe usuelle = « Кетцалькоатль » (comme le dieu), le `-us` tombe |
| shonisaurus | Shonisaurus | **Шонизавр** | Shonizavr | `sh`→ш, -завр |
| smilodon | Smilodon | **Смилодон** | Smilodon | (se lit bien) |
| spinosaurus | Spinosaurus | **Спинозавр** | Spinozavr | -завр |
| stegosaurus | Stegosaurus | **Стегозавр** | Stegozavr | `g`→г (dur), -завр |
| tarbosaurus | Tarbosaurus | **Тарбозавр** | Tarbozavr | -завр (genre décrit en URSS, forme sûre) |
| therizinosaurus | Therizinosaurus | **Теризинозавр** | Terizinozavr | `th`→т, -завр |
| titanis | Titanis (oiseau-terreur) | **Титанис** | Titanis | `-is` gardé ⚠️ (peu fixé) |
| torosaurus | Torosaurus | **Торозавр** | Torozavr | -завр |
| triceratops | Triceratops | **Трицератопс** | Tritseratops | `ce`→це |
| troodon | Troodon | **Троодон** | Troodon | double `o` (deux syllabes) |
| tyrannosaurus | Tyrannosaurus | **Тираннозавр** | Tirannozavr | `y`→и, -завр |
| utahraptor | Utahraptor | **Ютараптор** | Yutaraptor | ⚠️ `Utah`→Юта (Юта établi), `h` muet |
| velociraptor | Velociraptor | **Велоцираптор** | Velotsiraptor | `ci`→ци |

---

## 3. Romanisation — rappel des correspondances utilisées

(Colonne « romanisation » de la table = translittération standard type ISO 9 / BGN allégé. **Jamais donnée à la voix.**)

| Cyrillique | Latin | | Cyrillique | Latin |
|-----------|-------|---|-----------|-------|
| завр | zavr | | х | kh |
| ц | ts | | ш | sh |
| ф | f | | ч | ch |
| и | i | | э | e |
| ю | yu | | я | ya |

---

## 4. Noms qui se lisent BIEN une fois en cyrillique (0 piège au-delà de la conversion)

Une fois passés en cyrillique établi, ces noms sont sans surprise pour une voix russe — l'accent naturel tombe bien :

Аллозавр · Спинозавр · Гиганотозавр · Тарбозавр · Альбертозавр · Цератозавр · Апатозавр · Камаразавр · Амаргазавр · Платеозавр · Анкилозавр · Стегозавр · Кентрозавр · Трицератопс · Торозавр · Протоцератопс · Пентацератопс · Эдмонтозавр · Велоцираптор · Микрораптор · Овираптор · Патаготитан · Диметродон · Эласмозавр · Лиоплевродон · Смилодон · Птеранодон · Мозазавр · Спинозавр.

> En cas de doute → **le preview groupé tranche** (voir gabarit FR §4 : générer 1 MP3 court qui énonce tous les noms d'affilée, une écoute native valide/corrige).

---

## 5. ⚠️ Incertitudes (à faire valider par un russophone natif / paléo russe)

Je n'ai **rien inventé** : chaque forme ci-dessous est la translittération russe la plus standard que je connaisse, mais je signale honnêtement les cas où la forme établie n'est pas certaine ou peut varier.

1. **`aenocyon` → Эноцион** — genre récent (dire wolf, ex-*Canis dirus*), rarement translittéré en russe. Alternative possible **Энокион** selon lecture de `cy`. À vérifier ; en pratique la source russe dit souvent juste « ужасный волк » (loup terrible) comme nom vernaculaire.
2. **`carcharodontosaurus` → Кархародонтозавр** — le double `ch`→х est standard, mais on croise aussi **Кархародонтозавр** (répartition des voyelles). Vérifier la voyelle après le 2ᵉ « х ».
3. **`carnotaurus` → Карнотавр** — attention : `-taurus` = *taureau*, rendu **-тавр** (comme минотавр = minotaure), **PAS -завр**. Forme établie « Карнотавр » — confiance haute mais je la signale car c'est un piège de conversion (ne pas « corriger » en Карнотозавр).
4. **`euoplocephalus` → Эуоплоцефал** — nom long, plusieurs conversions coexistent (`eu` en début → Эу- ou Эв-). La forme sans `-us` (Эуоплоцефал) est la plus courante ; **Эуоплокефал** existe aussi (`ce`→ке au lieu de це). À trancher par un natif.
5. **`quetzalcoatlus` → Кетцалькоатль** — d'origine nahuatl. Le russe emprunte la forme du dieu aztèque **Кетцалькоатль** (avec ь final, sans -us). Certaines sources paléo écrivent **Кетцалькоатлюс** (garde le -us). Choisir : forme « dieu » (recommandée, plus naturelle à dire) vs forme savante. À valider.
6. **`utahraptor` → Ютараптор** — `Utah` = l'État, translittéré **Юта** en russe (établi). Donc Ютараптор. Mais certains paléo écrivent **Утараптор** (translit lettre à lettre). Юта- est plus juste phonétiquement ; à confirmer.
7. **`titanis` → Титанис** — oiseau-terreur (*Titanis walleri*), peu présent en russe. `-is` gardé (Титанис). Peu de sources ; forme probable mais non garantie.
8. **`coelodonta` → Целодонта** — rhinocéros laineux. `coe`→це est régulier ; forme **Целодонта** attestée. Confiance moyenne-haute.
9. **`mammuthus` → Мамонт** — j'ai délibérément **traduit** par le mot russe usuel **мамонт** (mammouth) plutôt que de translittérer le latin *Mammuthus*, car pour un enfant russe c'est LE mot connu et la voix le dira parfaitement. Si le produit veut le **nom de genre latin** à l'oral, écrire **Маммутус** — mais je recommande fortement « Мамонт ». À trancher côté produit.
10. **`liopleurodon` → Лиоплевродон** — `eu`→ев suit l'usage russe (Европа = Europe), mais on voit aussi **Лиоплеуродон** (translit directe). Ев- est plus naturel pour une voix russe. À confirmer.
11. **Accent tonique** — pour tous les longs `-завр`, l'accent russe standard tombe sur la syllabe **-за́вр** ou juste avant ; la voix native le gère seule, mais si un nom sonne « plat » au preview, vérifier l'accent (cas à surveiller : Кентрозавр, Целодонта, Патаготитан).

> **Règle appliquée :** aucune forme inventée. Là où l'usage russe est unique et sûr (la majorité des `-завр`), confiance haute. Là où plusieurs graphies coexistent ou la source russe est rare (points 1, 2, 4, 5, 6, 7, 9, 10 ci-dessus), **validation native requise avant prod audio.**

---

_Créé 2026-07-08. Lexique prononciation RUSSE (cyrillique natif) pour TTS voix Native Russian — encyclopédie dino MaxPlay. À valider au preview groupé + relecture russophone pour les 11 incertitudes._
