# Lessico di pronuncia — nomi di dinosauri per ElevenLabs (eleven_v3) — ITALIANO

> **Lingua** : Italiano (Italiano). **Voce TTS bersaglio** : Native Italian.
> **Metodo** : *respelling* all'italiana + **nome italiano stabilito** quando esiste (il grande pubblico italiano dice *Tirannosauro*, *Brachiosauro*, *Triceratopo*… — sono le forme canoniche dei musei e dei libri per bambini).
> **Uso** : questo testo serve SOLO a generare l'audio (TTS con voce nativa italiana). **Il testo parlato non viene MAI mostrato a schermo** — quindi possiamo deformare la grafia liberamente affinché il nome *suoni giusto* in italiano.
>
> Principio guida: l'italiano è una lingua **molto fonetica** (si legge come si scrive). La forma «da scrivere per il TTS» qui sotto è la forma italiana adattata + una scansione in sillabe con l'accento in **MAIUSCOLO** sulla sillaba tonica, per garantire l'accentazione corretta.

---

## 1. Regole di conversione (da applicare a OGNI nome greco/latino)

Come l'italiano rende le radici greche/latine:

| Grafia dotta | Suono | Scrivere in italiano | Esempio |
|--------------|-------|----------------------|---------|
| `-saurus` (lat.) | «-sàuro» | **-sauro** (accento su -SAU-) | Tyrannosaurus → Tiranno**SAU**ro |
| `ch` (greco, davanti a e/i) | suono «k» | **ch** (in it. `chi`=ki, `che`=ke) | Brachio → Bra**chi**o = /braki̯o/ |
| `ch` (davanti a a/o/u) | suono «k» | **c** basta (`ca`,`co`,`cu`=k) | Carcharo → Car**ca**ro |
| `ph` | suono «f» | **f** | Dilophosaurus → Dilo**f**osauro |
| `th` | suono «t» | **t** | Therizino → **T**erizino |
| `y` (greco) | suono «i» | **i** | Pachy → Pa**chi**, Baryonyx → Bar**i**onice |
| `x` | suono «cs/ks» | **-ce/-cie** finale it. (Baryonyx→Barionice) o **cs** interno | Baryonyx → Barioni**ce** |
| `ae` / `oe` | suono «e» | **e** | Archaeopteryx → Arch**e**opterige |
| `c` + e/i (latino eccl.) | suono «ch» dolce it. | attenzione: `ce`/`ci` in it. = «tche/tchi» | Ceratosaurus → **Ce**ratosauro = /tʃeratosauro/ |
| `g` + e/i | suono «dj» it. | `ge`/`gi` in it. = «dje/dji» | Giganotosaurus → **Gi**ganotosauro = /dʒiga.../ |
| `gh` + e/i | «g» duro | **gh** mantiene la g dura | (raro qui) |
| `sc` + e/i | suono «sh» it. | attenzione: `sce`/`sci` = «she/shi» | (evitare grafia ambigua) |
| `gn` | suono «gn» (ñ) it. | **gn** = ñ (come «gnomo») | Compsognathus → …gna… = /ɲa/ |
| `gli` | suono «lli» (ʎ) it. | attenzione: `gli` = «lli» molle | (evitare — usare «gl-i» separato se serve la G dura) |
| `-us` / `-os` finale | vocale piena in it. | pronunciata **-us / -os** (nessuna S mangiata come in FR/EN) | Diplodocus → Diplo**do**co (forma it.) |
| consonanti doppie | tenute nette | **raddoppiare** dove serve (tenuta netta) | Tira**nn**osauro, A**ll**osauro |

**Note di grafia (specifiche italiane):**
- L'accento tonico è capitale: l'italiano NON ha accento fisso, quindi indico la sillaba tonica in **MAIUSCOLO** (es. *Tiranno-SAU-ro*, *Bra-chi-o-SAU-ro*). La maggior parte dei «-sauro» prende l'accento su **-SAU-**.
- Le **consonanti doppie** vanno tenute (raddoppiamento) — è distintivo in italiano: *Tirannosauro* (nn), *Allosauro* (ll), *Camarasauro* (una sola m/s).
- `ci`/`ce` = suono «tch» (Ceratosauro = *tche-ra-…*); `gi`/`ge` = suono «dj» (Giganotosauro = *dji-…*). NON confondere con la k.
- Nessuna vocale finale «mangiata»: in italiano tutte le vocali si pronunciano (contrariamente al francese/inglese).

---

## 2. Tabella dei 70 dinosauri

Colonne: `id` · nome scientifico · **FORMA DA SCRIVERE PER IL TTS** (forma italiana + scansione con tonica in MAIUSCOLO) · trappola eventuale.

> La «forma da scrivere» è ciò che va messo nel testo parlato. Quando serve disambiguare, uso i trattini per sillabare. La voce nativa italiana leggerà la forma italiana correttamente; la scansione garantisce l'accento.

| id | nome scientifico | Forma da scrivere per il TTS | Trappola |
|----|------------------|------------------------------|----------|
| aenocyon | *Aenocyon* | **Enocione** — E-no-CI-o-ne | ae→e, y→i, on→one; `ci`=«tchi» |
| albertosaurus | *Albertosaurus* | **Albertosauro** — Al-ber-to-SAU-ro | — |
| allosaurus | *Allosaurus* | **Allosauro** — Al-lo-SAU-ro | ll doppia tenuta |
| amargasaurus | *Amargasaurus* | **Amargasauro** — A-mar-ga-SAU-ro | g dura (gar) |
| ankylosaurus | *Ankylosaurus* | **Anchilosauro** — An-chi-lo-SAU-ro | y→i, k→ch(=k); `chi`=ki |
| apatosaurus | *Apatosaurus* | **Apatosauro** — A-pa-to-SAU-ro | — |
| archaeopteryx | *Archaeopteryx* | **Archeopterige** — Ar-che-OP-te-ri-ge | ae→e, ch=k davanti a e→`che`=ke; y→i; x→ge (forma it. stabilita) |
| archelon | *Archelon* | **Archelonte** — Ar-che-LON-te | ch=k (`che`=ke); forma it. stabilita «Archelonte» |
| baryonyx | *Baryonyx* | **Barionice** — Ba-ri-O-ni-ce | y→i (×2), x→«ce» (forma it. stabilita); `ce`=«tche» |
| brachiosaurus | *Brachiosaurus* | **Brachiosauro** — Bra-chi-o-SAU-ro | ch=k → `chi`=ki (Bra-ki-o) |
| camarasaurus | *Camarasaurus* | **Camarasauro** — Ca-ma-ra-SAU-ro | una sola m, una sola r, s semplice |
| carcharodontosaurus | *Carcharodontosaurus* | **Carcarodontosauro** — Car-ca-ro-don-to-SAU-ro | ch=k → «carca-» (no «tch») |
| carnotaurus | *Carnotaurus* | **Carnotauro** — Car-no-TAU-ro | -taurus→-tauro, accento su -TAU- |
| centrosaurus | *Centrosaurus* | **Centrosauro** — Cen-tro-SAU-ro | `ce`=«tchen» (NON «ken») |
| ceratosaurus | *Ceratosaurus* | **Ceratosauro** — Ce-ra-to-SAU-ro | `ce`=«tche» (NON «ke») |
| coelodonta | *Coelodonta* | **Celodonte** — Ce-lo-DON-te | oe→e; `ce`=«tche»; forma it. «Celodonte» |
| corythosaurus | *Corythosaurus* | **Coritosauro** — Co-ri-to-SAU-ro | th→t, y→i — aggiunto 2026-08-10, da validare con un madrelingua |
| cryolophosaurus | *Cryolophosaurus* | **Criolofosauro** — Cri-o-lo-fo-SAU-ro | y→i, ph→f |
| deinonychus | *Deinonychus* | **Deinonico** — Dei-NO-ni-co | ei=dittongo «dèi»; ch=k, y→i, -us→-o (forma it.) |
| dilophosaurus | *Dilophosaurus* | **Dilofosauro** — Di-lo-fo-SAU-ro | ph→f |
| dimetrodon | *Dimetrodon* | **Dimetrodonte** — Di-me-tro-DON-te | forma it. «Dimetrodonte» (-don→-donte) |
| diplodocus | *Diplodocus* | **Diplodoco** — Di-PLO-do-co | -us→-o; c=k (`co`); accento su -PLO- |
| edaphosaurus | *Edaphosaurus* | **Edafosauro** — E-da-fo-SAU-ro | ph→f ; sinapside permiano (non un dino) — aggiunto 2026-08-10, da validare con un madrelingua |
| edmontonia | *Edmontonia* | **Edmontonia** — Ed-mon-TO-ni-a | — (si legge tale e quale) |
| edmontosaurus | *Edmontosaurus* | **Edmontosauro** — Ed-mon-to-SAU-ro | — |
| elasmosaurus | *Elasmosaurus* | **Elasmosauro** — E-la-smo-SAU-ro | — |
| euoplocephalus | *Euoplocephalus* | **Euoplocefalo** — Eu-o-plo-CE-fa-lo | ph→f; `ce`=«tche»; -us→-o |
| gallimimus | *Gallimimus* | **Gallimimo** — Gal-li-MI-mo | ll doppia; -us→-o |
| giganotosaurus | *Giganotosaurus* | **Giganotosauro** — Gi-ga-no-to-SAU-ro | `gi`=«dji» (NON «ghi»); poi g dura in «-ga-» |
| glyptodon | *Glyptodon* | **Gliptodonte** — Glip-to-DON-te | y→i; forma it. «Gliptodonte» |
| gorgonops | *Gorgonops* | **Gorgonops** — Gor-GO-nops | g dura ; gorgonopside permiano (non un dino) — aggiunto 2026-08-10, da validare con un madrelingua |
| hatzegopteryx | *Hatzegopteryx* | **Atsegopterige** — A-tse-gop-TE-ri-ge | h muta, tz→ts, y→i, x→« ge » (modello Archeopterige) ; pterosauro gigante — aggiunto 2026-08-10, da validare con un madrelingua |
| ichthyosaurus | *Ichthyosaurus* | **Ittiosauro** — It-ti-o-SAU-ro | chth→tt (forma it. stabilita «Ittiosauro»); y muta |
| iguanodon | *Iguanodon* | **Iguanodonte** — I-gua-no-DON-te | gua=«gwa»; forma it. «Iguanodonte» |
| kentrosaurus | *Kentrosaurus* | **Kentrosauro** — Ken-tro-SAU-ro | k=k duro (NON «tchen»); mantenere la K |
| liopleurodon | *Liopleurodon* | **Liopleurodonte** — Li-o-pleu-ro-DON-te | eu=dittongo «pleu»; forma it. «-donte» |
| lystrosaurus | *Lystrosaurus* | **Listrosauro** — Li-stro-SAU-ro | y→i ; sinapside permiano (non un dino) — aggiunto 2026-08-10, da validare con un madrelingua |
| maiasaura | *Maiasaura* | **Maiasaura** — Ma-ia-SAU-ra | -saura femminile ; forma diretta — aggiunto 2026-08-10, da validare con un madrelingua |
| mammuthus | *Mammuthus* | **Mammut** — MAM-mut | th→t; forma it. corrente «Mammut» (mm doppia) |
| megatherium | *Megatherium* | **Megaterio** — Me-ga-TE-ri-o | th→t; forma it. «Megaterio» |
| microraptor | *Microraptor* | **Microraptor** — Mi-cro-RAP-tor | c=k (`cro`); «raptor» resta |
| minmi | *Minmi* | **Minmi** — MIN-mi | nome di luogo australiano (Minmi Crossing), nessuna radice greca — aggiunto 2026-08-10, da validare con un madrelingua |
| mosasaurus | *Mosasaurus* | **Mosasauro** — Mo-sa-SAU-ro | s semplici; -us→-o |
| moschops | *Moschops* | **Moschops** — MOS-kops | ch=k devant o → `cho`=ko ; terapside permiano (non un dino) — aggiunto 2026-08-10, da validare con un madrelingua |
| ophthalmosaurus | *Ophthalmosaurus* | **Oftalmosauro** — Of-tal-mo-SAU-ro | ph→f, th→t → «Oftalmo-» |
| oviraptor | *Oviraptor* | **Oviraptor** — O-vi-RAP-tor | «raptor» resta |
| pachycephalosaurus | *Pachycephalosaurus* | **Pachicefalosauro** — Pa-chi-ce-fa-lo-SAU-ro | ch=k→`chi`=ki; y→i; ph→f; `ce`=«tche» |
| paraceratherium | *Paraceratherium* | **Paraceraterio** — Pa-ra-ce-ra-TE-ri-o | `ce`=«tche»; th→t; forma it. «-terio» |
| parasaurolophus | *Parasaurolophus* | **Parasaurolofo** — Pa-ra-sau-RO-lo-fo | ph→f; -us→-o |
| patagotitan | *Patagotitan* | **Patagotitano** — Pa-ta-go-TI-ta-no | g dura (`go`); forma it. «Patagotitano» |
| pentaceratops | *Pentaceratops* | **Pentaceratopo** — Pen-ta-ce-RA-to-po | `ce`=«tche»; -ops→-opo (forma it. come Triceratopo) |
| plateosaurus | *Plateosaurus* | **Plateosauro** — Pla-te-o-SAU-ro | — |
| protoceratops | *Protoceratops* | **Protoceratopo** — Pro-to-ce-RA-to-po | `ce`=«tche»; -ops→-opo |
| pteranodon | *Pteranodon* | **Pteranodonte** — Pte-ra-no-DON-te | Pt- iniziale pronunciato; forma it. «Pteranodonte» |
| quetzalcoatlus | *Quetzalcoatlus* | **Quetzalcoatlo** — Quet-zal-co-A-tlo | azteco; qu=«kw», tz=«ts»; -us→-o |
| saurolophus | *Saurolophus* | **Saurolofo** — Sau-RO-lo-fo | ph→f, -us→-o ; ⚠️ trappola orale: SENZA prefisso «para-» (≠ Parasaurolofo) — aggiunto 2026-08-10, da validare con un madrelingua |
| scutellosaurus | *Scutellosaurus* | **Scutellosauro** — Scu-tel-lo-SAU-ro | sc davanti a u = «sc» dura (/sku/), ll doppia tenuta — aggiunto 2026-08-10, da validare con un madrelingua |
| shonisaurus | *Shonisaurus* | **Shonisauro** — Sho-ni-SAU-ro | sh=«sh» (in it. scritto «sc»+i darebbe «shi»; qui tenere «Sho-» = /ʃo/) |
| smilodon | *Smilodon* | **Smilodonte** — Smi-lo-DON-te | forma it. «Smilodonte» |
| spinosaurus | *Spinosaurus* | **Spinosauro** — Spi-no-SAU-ro | — |
| stegosaurus | *Stegosaurus* | **Stegosauro** — Ste-go-SAU-ro | g dura (`go`) |
| tarbosaurus | *Tarbosaurus* | **Tarbosauro** — Tar-bo-SAU-ro | — |
| therizinosaurus | *Therizinosaurus* | **Terizinosauro** — Te-ri-zi-no-SAU-ro | th→t; z=«ts/dz» it. |
| titanis | *Titanis* | **Titanide** — Ti-TA-ni-de | forma it. corrente «Titanide» (uccello del terrore) |
| torosaurus | *Torosaurus* | **Torosauro** — To-ro-SAU-ro | — |
| triceratops | *Triceratops* | **Triceratopo** — Tri-ce-RA-to-po | `ce`=«tche»; -ops→-opo (forma it. classica «Triceratopo») |
| troodon | *Troodon* | **Troodonte** — Tro-o-DON-te | doppia o (iato «tro-o»); forma it. «Troodonte» |
| tyrannosaurus | *Tyrannosaurus* | **Tirannosauro** — Ti-ran-no-SAU-ro | y→i; nn doppia tenuta; -us→-o |
| utahraptor | *Utahraptor* | **Utahraptor** — U-ta-RAP-tor | h muta (Uta-); «raptor» resta |
| velociraptor | *Velociraptor* | **Velociraptor** — Ve-lo-ci-RAP-tor | `ci`=«tchi» (Velo-tchi-raptor) |

---

## 3. Nomi che si leggono BENE così (nessun respelling particolare)

In italiano si leggono correttamente **tali e quali** (rispettando solo l'accento su -SAU- e le doppie), perché la grafia italiana è già fonetica:

**Albertosauro · Allosauro · Amargasauro · Apatosauro · Camarasauro · Carnotauro · Edmontonia · Edmontosauro · Elasmosauro · Mosasauro · Plateosauro · Spinosauro · Stegosauro · Tarbosauro · Torosauro · Microraptor · Oviraptor · Velociraptor · Utahraptor.**

> In caso di dubbio → sillabare con la tonica in MAIUSCOLO, non costa nulla. Il **preview raggruppato** (§5) decide.

---

## 4. Trappole più insidiose (da controllare all'ascolto)

Queste sono le più a rischio in italiano — la voce nativa può sbagliare se la grafia non è guidata:

| Nome | Rischio | Forma corretta imposta |
|------|---------|------------------------|
| Ceratosauro | `ce` letto «ke» invece di «tche» | **Ce-** = «tche» (come «cena») |
| Centrosauro | idem `ce` | **Cen-** = «tchen» |
| Giganotosauro | `gi` letto «ghi» invece di «dji» | **Gi-** = «dji» (come «gita») |
| Kentrosauro | `ke` va tenuto DURO (K) | **Ken-** = «k» (NON «tchen») — attenzione all'incoerenza con Centrosauro |
| Carcarodontosauro | «ch» greco = k, non «tch» | **Car-ca-ro** (k duro) |
| Velociraptor | `ci` = «tchi» | **Velo-ci-** = «tchi» |
| Ittiosauro | grafia originale `Ichthyo-` illeggibile | forma it. **Ittiosauro** (chth→tt) |
| Enocione | `Aenocyon` esotico | forma it. proposta **Enocione** (vedi ⚠️ §6) |

---

## 5. PREVIEW FONETICO RAGGRUPPATO (garde-fou di processo — prima di ogni produzione di massa)

Come per il francese: invece di scoprire una cattiva pronuncia dino per dino (60 ascolti), si concentra il rischio in **UN solo clip**:

1. Generare **un MP3 corto** (voce nativa italiana) che enuncia di fila tutti i nomi a rischio, nella forma di respelling: *«Tirannosauro. Terizinosauro. Mosasauro. Brachiosauro. Ceratosauro. Giganotosauro. Kentrosauro. Velociraptor. Ittiosauro…»*
2. **Un parlante italiano ascolta una volta** → valida / corregge la grafia di ogni nome sbagliato.
3. Aggiornare questo lessico (§2) con le correzioni.
4. **Poi** lanciare la produzione dei dialoghi completi — i nomi sono garantiti.

Costo: ~1 chiamata corta vs 60 errori possibili. Da rifare a ogni nuovo lotto di dinosauri.

---

## 6. ⚠️ Incertezze (da far validare da un parlante italiano nativo)

Non ho **inventato** nessun nome: dove esiste una forma italiana museale/divulgativa stabilita, l'ho usata. Dove NON ho trovato una forma italiana canonica sicura, propongo la **translitterazione più standard** e la segnalo qui sotto. **Da confermare prima della produzione audio.**

| Nome | Forma proposta | Motivo dell'incertezza |
|------|----------------|------------------------|
| **aenocyon** | *Enocione* (E-no-CI-o-ne) | Genere raro (lupo della fauna glaciale, ex-*Canis dirus*). Non ho una forma divulgativa italiana attestata con certezza. La resa greca `-cyon` → it. «-cione» (cfr. «Cinocione»?) è plausibile ma **da validare**. Alternativa prudente: dire *«Enocìon»* alla latina. |
| **archelon** | *Archelonte* | Forma italiana molto probabile (sul modello di «-onte» come in «Mastodonte»), ma alcuni testi usano semplicemente *Archelon* invariato. Confermare quale suona meglio col pubblico. |
| **titanis** | *Titanide* | «Titanide» è la resa italiana corrente dell'uccello del terrore *Titanis walleri*, ma coesiste con *Titanis* invariato. Da confermare. |
| **patagotitan** | *Patagotitano* | Genere recente (2017). «-titan» → it. «-titano» è coerente (cfr. «Titano»), ma potrebbe circolare anche *Patagotitan* invariato nei testi italiani. Da validare. |
| **coelodonta** | *Celodonte* | Rinoceronte lanoso. Resa «-donta» → «-donte» plausibile; alcuni testi mantengono *Coelodonta* latino. Da confermare. |
| **shonisaurus** | *Shonisauro* (Sho-…) | La sillaba «Sho-» /ʃo/ NON ha grafia italiana nativa pulita (in it. «sci»+vocale dà /ʃ/ solo davanti a e/i: «scio»=/ʃo/ funziona → si potrebbe scrivere **«Scionisauro»** per forzare /ʃo/). Proposta grafica alternativa da testare: *«Scio-ni-SAU-ro»*. Da validare all'ascolto quale rende meglio /ʃo/ con voce nativa. |
| **quetzalcoatlus** | *Quetzalcoatlo* (Quet-zal-co-A-tlo) | Nome azteco: `tz`=«ts», `qu`=«kw». La resa italiana non è standardizzata; il gruppo «-oatl-» è difficile. Da validare all'ascolto (possibile alternativa: *«Quetsalcoàtlo»*). |
| **Kentrosauro vs Centrosauro** | *Ken-* duro / *Cen-* dolce | Coppia insidiosa: due dinosauri distinti la cui iniziale in italiano diverge (K duro vs «tch»). Verificare che la voce non li uniformi. Se la K non passa, forzare **«Kentro-»** con grafia «Chèntro-» (chi/che=k) → *«Chentrosauro»* per la K dura. Da testare. |

> In caso di dubbio residuo → **respellare** e passare dal **preview raggruppato** (§5): è l'orecchio del parlante nativo che decide, non la teoria.

---

_Creato 2026-07-08. Lessico di pronuncia dino — ITALIANO (voce TTS nativa italiana). Struttura mutuata dal lessico FR di riferimento (`fr.md`). Ogni writer/generatore audio dino in italiano lo applica PRIMA di ElevenLabs._
