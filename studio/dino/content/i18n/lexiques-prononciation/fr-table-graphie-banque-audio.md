# Table de graphie — noms de dinos pour prompts ElevenLabs (banque audio à venir)

> Créé 2026-07-28 (plan remise au propre C6a). Destiné aux futurs scripts audio qui disent un nom de dino DANS UNE PHRASE (banque de chiffres, "trouve le dino", "combien de dinos ?"). Source dérivée de [`fr.md`](fr.md) §1/§2/§2bis/§3 — ne pas réinventer, mettre à jour fr.md d'abord si une règle change.
>
> **Format** : `id` (clé technique dinos-data.js) · `name` (nom FR affiché en fiche) · `graphie_audio` (à écrire tel quel dans le texte envoyé à ElevenLabs) · `note`.
> Un script qui génère une phrase du type "Trouve le Tricératops !" doit substituer `name` → `graphie_audio` AVANT l'appel API.

| id | name (fiche) | graphie_audio (à écrire dans le prompt) | note |
|----|--------------|------------------------------------------|------|
| tyrannosaurus | T-Rex | **Ty-ran-no-saure** (si "Tyrannosaure" dit en entier) / **T-Rex** tel quel si le surnom court est utilisé | -us avalé |
| spinosaurus | Spinosaure | Spinosaure | OK tel quel |
| giganotosaurus | Giganotosaure | Giganotosaure | OK tel quel |
| carcharodontosaurus | Carcharodontosaure | **Car-ka-ro-don-to-saure** | ch→k |
| allosaurus | Allosaure | Allosaure | OK tel quel |
| tarbosaurus | Tarbosaure | Tarbosaure | OK tel quel |
| albertosaurus | Albertosaure | Albertosaure | OK tel quel |
| ceratosaurus | Cératosaure | Cératosaure | OK tel quel |
| dilophosaurus | Dilophosaure | **Di-lo-fo-saure** | ph→f |
| carnotaurus | Carnotaure | Carnotaure | OK tel quel |
| cryolophosaurus | Cryolophosaure | **Cri-o-lo-fo-saure** | y→i, ph→f |
| brachiosaurus | Brachiosaure | **Bra-ki-o-saure** | ch→k |
| diplodocus | Diplodocus | **Di-plo-do-kuss** | -us |
| apatosaurus | Apatosaure (Brontosaure) | Apatosaure | OK tel quel |
| camarasaurus | Camarasaure | Camarasaure | OK tel quel |
| amargasaurus | Amargasaure | Amargasaure | OK tel quel |
| plateosaurus | Plateosaure | Plateosaure | OK tel quel |
| ankylosaurus | Ankylosaure | Ankylosaure | OK tel quel |
| euoplocephalus | Euoplocéphale | **Eu-o-plo-cé-fale** | ph→f |
| edmontonia | Edmontonia | **Ed-mon-to-ni-a** | pas de forme -saure, -ia final tel quel |
| minmi | Minmi | Minmi | OK tel quel |
| scutellosaurus | Scutellosaure | Scutellosaure | OK tel quel |
| stegosaurus | Stégosaure | Stégosaure | OK tel quel |
| kentrosaurus | Kéntrosaure | Kéntrosaure | OK tel quel |
| triceratops | Tricératops | Tricératops | OK tel quel |
| torosaurus | Torosaure | Torosaure | OK tel quel |
| protoceratops | Protocératops | Protocératops | OK tel quel |
| pentaceratops | Pentacératops | Pentacératops | OK tel quel |
| parasaurolophus | Parasaurolophus | **Pa-ra-sau-ro-lofe** | ph→f, -us |
| corythosaurus | Corythosaure | **Co-ri-to-saure** | y→i, th→t |
| maiasaura | Maiasaura | Maiasaura | OK tel quel |
| saurolophus | Saurolophe | **So-ro-lo-fuss** | ph→f, -us ; ⚠️ ne pas confondre avec Parasaurolophus à l'oral |
| edmontosaurus | Edmontosaure | Edmontosaure | OK tel quel |
| iguanodon | Iguanodon | **I-goua-no-don** | gua |
| pachycephalosaurus | Pachycéphalosaure | **Pa-ki-cé-fa-lo-saure** | ch→k, y→i, ph→f |
| velociraptor | Vélociraptor | Vélociraptor | OK tel quel |
| deinonychus | Deinonychus | **Daï-no-ni-kuss** | ch→k, y→i, -us |
| utahraptor | Utahraptor | Utahraptor | OK tel quel |
| microraptor | Microraptor | Microraptor | OK tel quel |
| troodon | Troodon | **Tro-o-don** | double o |
| gallimimus | Gallimimus | **Ga-li-mi-muss** | -us |
| oviraptor | Oviraptor | Oviraptor | OK tel quel |
| pteranodon | Ptéranodon | **Pté-ra-no-don** | Pt initial |
| quetzalcoatlus | Quetzalcoatlus | **Kèt-zal-ko-atluss** | aztèque |
| hatzegopteryx | Hatzegopteryx | **Hat-zé-gop-té-rix** | y→i, x |
| archaeopteryx | Archaeoptéryx | **Ar-ké-op-té-rix** | ae→é, ch→k, y→i, x |
| mosasaurus | Mosasaure | **Mo-sa-saure** | -us avalé |
| baryonyx | Baryonyx | **Ba-ri-o-nix** | y→i, x→ks |
| therizinosaurus | Therizinosaurus | **Thé-ri-zi-no-saure** | Th→Thé, -us |
| dimetrodon | Dimétrodon | Dimétrodon | OK tel quel |
| edaphosaurus | Édaphosaure | **É-da-fo-saure** | ph→f |
| gorgonops | Gorgonops | Gorgonops | OK tel quel |
| lystrosaurus | Lystrosaure | **Lis-tro-saure** | y→i |
| moschops | Moschops | **Mos-kops** | ch→k |
| elasmosaurus | Élasmosaure | Élasmosaure | OK tel quel |
| ophthalmosaurus | Ophthalmosaure | **Of-tal-mo-saure** | ph→f, th→t |
| liopleurodon | Liopleurodon | Liopleurodon | OK tel quel |
| archelon | Archélon | **Ar-ké-lon** | ch→k |
| shonisaurus | Shonisaure | **Cho-ni-saure** | sh→ch |
| patagotitan | Titanosaure | **Pa-ta-go-ti-tan** (si le nom latin est dit) / Titanosaure (nom fiche, OK tel quel) | 🟡 doute mineur, taxon peu établi à l'oral |
| centrosaurus | Centrosaure | Centrosaure | OK tel quel |
| ichthyosaurus | Ichtyosaure | **Ik-ti-o-saure** (nom FR déjà francisé « Ichtyosaure » = OK tel quel ; si le LATIN `Ichthyosaurus` est dit, appliquer th→t + y→i) | ✅ validé Papa Yann 2026-07-28, `ichthyosaurus-nom.mp3` régénéré |
| mammuthus | Mammouth | Mammouth | OK tel quel (mot français courant) |
| smilodon | Smilodon | Smilodon | OK tel quel |
| megatherium | Mégathérium | **Mé-ga-té-rium** | th→t |
| paraceratherium | Paracérathérium | **Pa-ra-cé-ra-té-rium** | th→t |
| glyptodon | Glyptodon | **Gli-pto-don** | y→i ; ✅ validé Papa Yann 2026-07-28, `glyptodon-nom.mp3` régénéré |
| aenocyon | Loup terrible | **É-no-si-on** (si le LATIN est dit — le nom d'USAGE reste « Loup terrible ») | ae→é, y→i ; ✅ validé Papa Yann 2026-07-28, `aenocyon-nom.mp3` régénéré |
| coelodonta | Rhino laineux | **Sé-lo-don-ta** (si le LATIN est dit — le nom d'USAGE reste « Rhino laineux ») | oe→é ; ✅ validé Papa Yann 2026-07-28, `coelodonta-nom.mp3` régénéré |
| titanis | Titanis | **Ti-ta-niss** | -is final, S à garantir entendu ; ✅ validé Papa Yann 2026-07-28, `titanis-nom.mp3`/`titanis-funfact.mp3` régénérés |

---

## Utilisation par un script

1. Charger cette table (ou la régénérer depuis `fr.md` si une règle change).
2. Résoudre `id` (dinos-data.js) → `graphie_audio`.
3. Injecter `graphie_audio` dans le texte du prompt à la place du `name` humain.
4. **Ne jamais utiliser `id` brut** (ex. `tyrannosaurus`) ni `full` (nom latin scientifique complet type "Tyrannosaurus Rex") comme texte parlé sans passer par cette table — l'un comme l'autre déclenchent les pièges ch/y/ph/x/-us.
5. Pour les 4 noms marqués ⚠️ non conformes (Aenocyon, Coelodonta, Glyptodon, Ichthyosaurus) — préférer le **nom d'usage FR** (« Loup terrible », « Rhino laineux », etc.) plutôt que le nom latin tant que Papa Yann n'a pas validé le respelling à l'oreille.

---

_Dérivé de [`fr.md`](fr.md) §1-§3 le 2026-07-28. Source de vérité = fr.md ; ce fichier est une VUE exploitable par script, à régénérer si fr.md change._
