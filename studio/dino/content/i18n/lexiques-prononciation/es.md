# Léxico de pronunciación — nombres de dinos para ElevenLabs (eleven_v3)

> **Idioma cible : Español (España).** Voz TTS : *Native Spanish (Spain)*.
> **Método : respelling al español** (reescritura fonética). El español es casi 100 % fonético : lo que se escribe se lee. Por eso el respelling consiste sobre todo en **usar la forma española establecida del nombre** (Tiranosaurio, Braquiosaurio…) y, cuando hace falta, marcar las sílabas y la **tilde de acento** para guiar el TTS.
> **Este texto SIRVE AL AUDIO TTS con voz nativa — el texto hablado NUNCA se muestra en pantalla.** Se puede deformar la grafía sin escrúpulo: solo cuenta cómo SUENA.
> Forma de referencia estructural : el léxico FR [`fr.md`](fr.md).

---

## 1. Reglas de conversión (raíces griego/latín → español)

El español ya tiene una tradición fija de castellanizar los nombres de dinosaurios. La regla maestra es **`-saurus` → `-saurio`** (Tyrannosaurus → Tiranosaurio). Lo demás son ajustes ortográficos para que la voz nativa acierte.

| Grafía sabia | Suena | Escribir en español |
|--------------|-------|---------------------|
| `-saurus` / `-saure` (final) | «sáurio» | **-saurio** — Tira-no-**SAU**-rio |
| `ch` (griego, = /k/) ante a/o/u | «k» | **qu** ante e/i, **c** ante a/o/u — Bra**qu**io, Car**ca**rodonto |
| `ch` (griego) ante consonante | «k» | **c** — Icti-o (Ichthyo) |
| `ph` | «f» | **f** — Dilo**f**o, Paqui-ce**f**alo, O**f**talmo |
| `th` | «t» | **t** — Icti-o, O**f**-**t**almo |
| `y` (griego) | «i» | **i** — Pa**qu**i, Bar**i**onix, Anquilo |
| `x` final | «ks» | **-nix** (sonido /niks/) — Bario-**nix**, Ar**qu**eop-te-**rix** |
| `ll` | «y» / «λ» (España) | evitar — usar **-lo-** simple (Alosaurio, no *Allosaurio*) |
| `qu` | «k» (la u es muda) | Que-tzal → **Ket-sal** ; **qu**io → «kio» |
| `c` ante e/i (España) | «θ» (ceceo) | dejar **c** (Trice-ratops = /triθe-/) — es la norma nativa |
| `z` | «θ» (España) | dejar **z** (Quetzal → **Kets-al**) |
| `g` ante e/i | «j» (jota, /x/) | **gu** si debe sonar /g/ (I-**gu**a-no-donte) |
| `j` | jota /x/ | raro en estos nombres |
| `ae` / `oe` | «e» | **e** — Ar**qu**e-op-te-rix (archae→arque) |
| `-us` final (latín, sin -saurus) | «us» clara | mantener **-us** (Diplo-do-**cus**, Trо-o-**don** no lleva -us) |
| `h` inicial/muda | muda | se puede quitar para el TTS (no cambia el sonido) |
| `oo` (doble o) | dos «o» | separar **-o-o-** (Tro-**o**-don) |

**+ notas de grafía :** el acento tónico en español es predecible, pero para nombres largos conviene **marcar la tilde** en la sílaba fuerte (`-SAU-rio` lleva el acento; se puede escribir *saurio* sin tilde porque las llanas terminadas en vocal no la necesitan, pero para el TTS marcar **MAYÚSCULAS o guiones** en la sílaba tónica ayuda). Evitar mayúsculas en palabras muy cortas.

---

## 2. Tabla de los 70 dinos

> Columna **«Escribir para el TTS»** = forma exacta a poner en el texto hablado. Sílabas separadas por guiones cuando conviene guiar la voz. La forma española establecida se usa siempre que existe.

| id | Nombre científico | Escribir para el TTS | Piège / nota |
|----|-------------------|----------------------|--------------|
| aenocyon | *Aenocyon* | **E-no-ci-on** | ae→e, y→i ; género poco fijado en ES → ver incertidumbres |
| albertosaurus | *Albertosaurus* | **Al-ber-to-SAU-rio** | forma directa |
| allosaurus | *Allosaurus* | **A-lo-SAU-rio** | ll→l (evitar sonido «y») |
| amargasaurus | *Amargasaurus* | **A-mar-ga-SAU-rio** | nombre hispano (Amarga, Argentina) — natural |
| ankylosaurus | *Ankylosaurus* | **An-qui-lo-SAU-rio** | ky→qui |
| apatosaurus | *Apatosaurus* | **A-pa-to-SAU-rio** | forma directa |
| archaeopteryx | *Archaeopteryx* | **Ar-que-óp-te-rix** | archae→arque, y→i, x→ks |
| archelon | *Archelon* | **Ar-que-lon** | ch→qu |
| baryonyx | *Baryonyx* | **Ba-ri-ó-nix** | y→i, x→ks |
| brachiosaurus | *Brachiosaurus* | **Bra-quio-SAU-rio** | ch→qu |
| camarasaurus | *Camarasaurus* | **Ca-ma-ra-SAU-rio** | forma directa |
| carcharodontosaurus | *Carcharodontosaurus* | **Car-ca-ro-don-to-SAU-rio** | ch→c ante a |
| carnotaurus | *Carnotaurus* | **Car-no-TAU-ro** | -taurus→-tauro (no lleva -saurio) |
| centrosaurus | *Centrosaurus* | **Cen-tro-SAU-rio** | c ante e = /θ/ (España), norma nativa |
| ceratosaurus | *Ceratosaurus* | **Ce-ra-to-SAU-rio** | c ante e = /θ/ |
| coelodonta | *Coelodonta* | **Ce-lo-don-ta** | oe→e |
| corythosaurus | *Corythosaurus* | **Co-ri-to-SAU-rio** | th→t, y→i (Coritosaurio) — tranchado 2026-09-05 : forma natural, ningún hablante nativo dudaría de «Coritosaurio» |
| cryolophosaurus | *Cryolophosaurus* | **Crio-lo-fo-SAU-rio** | y→i, ph→f |
| deinonychus | *Deinonychus* | **Dei-no-ni-cus** | ch→c, y→i, -us clara |
| dilophosaurus | *Dilophosaurus* | **Di-lo-fo-SAU-rio** | ph→f |
| dimetrodon | *Dimetrodon* | **Di-me-tro-don** | forma directa |
| diplodocus | *Diplodocus* | **Di-plo-do-cus** | -us clara (no se avala en ES) |
| edaphosaurus | *Edaphosaurus* | **E-da-fo-SAU-rio** | ph→f (Edafosaurio) ; sinápsido pérmico, no es dino — tranchado 2026-09-05 : «Edafosaurio» se lee y suena natural, sin trampa |
| edmontonia | *Edmontonia* | **Ed-mon-to-nia** | forma directa |
| edmontosaurus | *Edmontosaurus* | **Ed-mon-to-SAU-rio** | forma directa |
| elasmosaurus | *Elasmosaurus* | **E-las-mo-SAU-rio** | forma directa |
| euoplocephalus | *Euoplocephalus* | **Eu-o-plo-CÉ-fa-lo** | ph→f, -us→-lo (Euoplocéfalo) |
| gallimimus | *Gallimimus* | **Ga-li-MI-mus** | ll→l, -us clara |
| giganotosaurus | *Giganotosaurus* | **Gui-ga-no-to-SAU-rio** | gi→gui para sonar /g/ (no jota) |
| glyptodon | *Glyptodon* | **Glip-to-don** | y→i |
| gorgonops | *Gorgonops* | **Gor-GO-nops** | g fuerte ; gorgonópsido pérmico, no es dino — tranchado 2026-09-05 : la g siempre suena fuerte ante o, sin ambigüedad para un locutor nativo |
| hatzegopteryx | *Hatzegopteryx* | **A-tse-gop-TE-rix** | h muda, tz→ts, y→i, x→ks ; pterosaurio gigante — tranchado 2026-09-05 : «tse» se lee de forma natural en español, sin necesidad de otra grafía |
| ichthyosaurus | *Ichthyosaurus* | **Ic-tio-SAU-rio** | ch→c, th→t, y→i (Ictiosaurio) |
| iguanodon | *Iguanodon* | **I-gua-no-don** | gua natural en ES |
| kentrosaurus | *Kentrosaurus* | **Ken-tro-SAU-rio** | k se mantiene |
| liopleurodon | *Liopleurodon* | **Lio-pleu-ro-don** | forma directa |
| lystrosaurus | *Lystrosaurus* | **Lis-tro-SAU-rio** | y→i (Listrosaurio) ; sinápsido pérmico, no es dino — tranchado 2026-09-05 : «Listrosaurio» es la lectura evidente, sin alternativa posible |
| maiasaura | *Maiasaura* | **Ma-ia-SAU-ra** | -saura femenina, forma directa (Maiasaura) — tranchado 2026-09-05 : se lee igual que se escribe, ningún hiato problemático |
| mammuthus | *Mammuthus* | **Ma-MUT** | forma establecida: **Mamut** (más natural que «mamutus») — ver nota |
| megatherium | *Megatherium* | **Me-ga-TE-rio** | th→t, forma ES = Megaterio |
| microraptor | *Microraptor* | **Mi-cro-rap-tor** | forma directa |
| minmi | *Minmi* | **Min-mi** | nombre de lugar australiano (Minmi Crossing), sin raíz grecolatina — tranchado 2026-09-05 : dos sílabas simples, cero riesgo de mala lectura |
| mosasaurus | *Mosasaurus* | **Mo-sa-SAU-rio** | forma directa |
| moschops | *Moschops* | **Mos-KOPS** | ch→k (khi griego de *moschos*) ; terápsido pérmico, no es dino — tranchado 2026-09-05 : «Moscops» evita la lectura /tʃ/ que un lector daría a «ch» en español |
| ophthalmosaurus | *Ophthalmosaurus* | **Of-tal-mo-SAU-rio** | ph→f, th→t |
| oviraptor | *Oviraptor* | **O-vi-rap-tor** | forma directa |
| pachycephalosaurus | *Pachycephalosaurus* | **Pa-qui-ce-fa-lo-SAU-rio** | ch→qu, y→i, ph→f |
| paraceratherium | *Paraceratherium* | **Pa-ra-ce-ra-TE-rio** | th→t (Paraceraterio) |
| parasaurolophus | *Parasaurolophus* | **Pa-ra-sau-RÓ-lo-fo** | ph→f, -us→-fo (Parasaurolofo) |
| patagotitan | *Patagotitan* | **Pa-ta-go-ti-TÁN** | nombre hispano (Patagonia) — natural |
| pentaceratops | *Pentaceratops* | **Pen-ta-CE-ra-tops** | c ante e = /θ/ |
| plateosaurus | *Plateosaurus* | **Pla-te-o-SAU-rio** | forma directa |
| protoceratops | *Protoceratops* | **Pro-to-CE-ra-tops** | c ante e = /θ/ |
| pteranodon | *Pteranodon* | **Pte-ra-no-don** | Pt inicial se pronuncia en ES |
| quetzalcoatlus | *Quetzalcoatlus* | **Ket-sal-co-A-tlus** | náhuatl ; qu→k, tz→ts |
| saurolophus | *Saurolophus* | **Sau-RÓ-lo-fo** | ph→f, -us→-fo (Saurolofo) ; ⚠️ trampa oral: SIN prefijo «para-» (≠ Parasaurolophus) — tranchado 2026-09-05 : confirmado, la trampa real es la confusión con Parasaurolophus, no la pronunciación en sí |
| scutellosaurus | *Scutellosaurus* | **Es-cu-te-lo-SAU-rio** | sc inicial líquida → «es», ll→l (Escutelosaurio) — tranchado 2026-09-05 : «Escutelosaurio» suena natural, sin sonido /ʎ/ o /j/ parásito |
| shonisaurus | *Shonisaurus* | **Cho-ni-SAU-rio** | sh→ch (el español no tiene /ʃ/) |
| smilodon | *Smilodon* | **Es-mi-lo-don** | s inicial líquida → «es» en ES |
| spinosaurus | *Spinosaurus* | **Es-pi-no-SAU-rio** | s inicial líquida → «es» (Espinosaurio) |
| stegosaurus | *Stegosaurus* | **Es-te-go-SAU-rio** | s inicial líquida → «es» (Estegosaurio) |
| tarbosaurus | *Tarbosaurus* | **Tar-bo-SAU-rio** | forma directa |
| therizinosaurus | *Therizinosaurus* | **Te-ri-si-no-SAU-rio** | th→t, z→s (o /θ/ en España) |
| titanis | *Titanis* | **Ti-TA-nis** | forma directa |
| torosaurus | *Torosaurus* | **To-ro-SAU-rio** | forma directa |
| triceratops | *Triceratops* | **Tri-CE-ra-tops** | c ante e = /θ/ (España) |
| troodon | *Troodon* | **Tro-o-don** | doble o separada |
| tyrannosaurus | *Tyrannosaurus* | **Ti-ra-no-SAU-rio** | y→i, nn→n (Tiranosaurio) |
| utahraptor | *Utahraptor* | **U-ta-rap-tor** | h muda, Utah→«Uta» |
| velociraptor | *Velociraptor* | **Ve-lo-ci-rap-tor** | c ante i = /θ/, forma establecida |

---

## 3. Nombres que se leen BIEN tal cual (con la castellanización estándar)

Estos ya tienen forma española fija y el TTS nativo los dice bien sin más ajuste que `-saurio` / la tilde natural :

Alosaurio · Espinosaurio · Estegosaurio · Giganotosaurio · Tarbosaurio · Albertosaurio · Ceratosaurio · Carnotauro · Apatosaurio · Camarasaurio · Amargasaurio · Plateosaurio · Anquilosaurio · Kentrosaurio · Triceratops · Torosaurio · Protoceratops · Pentaceratops · Edmontosaurio · Velociraptor · Utahraptor · Microraptor · Oviraptor · Dimetrodon · Elasmosaurio · Liopleurodon · Iguanodonte · Diplodocus · Mosasaurio · Braquiosaurio · Espinosaurio.

> En caso de duda → aplicar el respelling de la tabla §2, no cuesta nada. Un **preview agrupado** (un solo MP3 que enuncia todos los nombres de riesgo seguidos) permite validar antes de la producción en masa.

---

## 4. Relectura nativa — decisiones tranchadas (HO-013, 2026-09-05)

Las 8 entradas que quedaban abiertas se zanjan aquí, como lo haría un redactor nativo de español de España. Ningún nombre inventado ; se elige siempre la forma que un adulto hispanohablante leería en voz alta sin dudar ni una vez.

- **`aenocyon`** — **Zanjado: «E-no-ci-on»**, con la «c» como /θ/ (ceceo peninsular, norma nativa de España, coherente con el resto del léxico: Triceratops, Centrosaurio, etc. ya se leen con /θ/). Acento llano natural, sin tilde necesaria. Usado tal cual en `aenocyon.md`.
- **`mammuthus`** — **Zanjado: «Mamut»**, la forma popular. Un niño español conoce «mamut» de sus cuentos y documentales; «Mamutus» sonaría a traducción forzada y rompería el efecto nativo del guion. Usado en `mammuthus.md` («Ma… MUT»).
- **`quetzalcoatlus`** — **Zanjado: «Ket-sal-co-A-tlus»**, con el grupo «-tlus» pronunciado en un solo golpe silábico (como en «Popocatépetl», ya familiar a un oído español por la cultura general). No se fuerza una pausa entre «co-a» y «tlus»: la voz nativa une el diptongo. Usado en `quetzalcoatlus.md`.
- **`patagotitan`** — **Zanjado: acentuación aguda «Pa-ta-go-ti-TÁN»**, como «titán» en español (nunca llana). Es la lectura que cualquier hispanohablante da de forma espontánea al reconocer la palabra «titán» dentro del nombre. Usado en `patagotitan.md`.
- **`titanis`** — **Zanjado: llana «Ti-TA-nis»**, coherente con el patrón de «Titanes» pero sin la fuerza aguda de «titán» (nombre distinto, terminación en -is que en español tira a llana, como «tenis», «lápis» dialectal). Usado en `titanis.md` («Ti… TA… nis»).
- **`carcharodontosaurus`** — **Zanjado: «Car-ca-ro-don-to-SAU-rio»** con «ca» /ka/ clara, nunca /tʃa/. Un lector nativo de España lee «ch» como /tʃ/ solo si sigue una vocal en un patrón reconocible de palabra española (chaqueta, chico); aquí la sílaba completa "carca" remite de inmediato a "carcaj"/"cascar" y no genera esa lectura errónea. Sin necesidad de forzar una grafía con «k». Usado en `carcharodontosaurus.md`.
- **`therizinosaurus`** — **Zanjado: «Te-ri-si-no-SAU-rio»** con «s», no «z» peninsular. Elegido por seguridad de lectura en voz alta para un narrador que pueda no ser de España (evita toda ambigüedad θ/s), y porque «si» suena más suave al oído de un niño que el «zi» silbante. Usado en `therizinosaurus.md`.
- **`coelodonta`** — **Zanjado: «Ce-lo-don-ta»** (oe→e, sin diptongo). Es la única lectura natural: un hispanohablante nunca pronuncia «coe-» como diptongo al leer en voz alta, lee «ce-» de forma instintiva. Usado en `coelodonta.md`.

Regla de oro conservada para futuras entradas: ante la menor duda real (no ya presente en este lote), generar el **preview agrupado** (§3) antes de producción en masa.

---

_Creado 2026-07-08. Método : respelling al español (voz Native Spanish España). Fuente de autoridad de pronunciación dino en español. Todo generador de audio dino en ES lo aplica ANTES de ElevenLabs. Estructura espejo del léxico FR `fr.md`._
