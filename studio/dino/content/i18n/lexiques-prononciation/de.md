# Lexique de prononciation — noms de dinos en ALLEMAND (Deutsch) pour ElevenLabs (eleven_v3)

> **Langue cible : allemand (Deutsch).** Voix TTS : **Native German**.
> **Méthode : forme allemande établie, en alphabet latin.** L'allemand a une tradition bien établie : les **noms de genres scientifiques sont utilisés tels quels** dans la littérature jeunesse (Brachiosaurus, Tyrannosaurus, Triceratops…) et la voix native allemande les prononce correctement d'après l'orthographe. Les seules substitutions sont les **noms vernaculaires allemands dominants** (Mammut, Wollnashorn, Säbelzahntiger…).
> **Ce texte SERT À GÉNÉRER L'AUDIO TTS — il n'est JAMAIS affiché à l'écran.** Pas de tirets de syllabation : la voix native gère seule la segmentation (décision projet).
> Date : 2026-08-11 — **draft LLM validé par croisement (DeepSeek V4-Pro × Grok), relecture native humaine à prévoir.**
> Gabarit structurel : [`en.md`](en.md) (référence canonique des 70 ids).

---

## 1. Règles de conversion (nom scientifique latin → forme allemande)

La règle maîtresse est différente du français ou de l'espagnol : **l'allemand ne reforme PAS les noms de genres**. *Tyrannosaurus* reste *Tyrannosaurus*, *Brachiosaurus* reste *Brachiosaurus*. On écrit donc le nom scientifique tel quel au TTS dans ~64 cas sur 70. Les vrais choix éditoriaux sont :

| Cas | Règle | Exemples |
|-----|-------|----------|
| Dinosaures (genres) | **Garder le nom scientifique latin inchangé** | Allosaurus, Ankylosaurus, Stegosaurus |
| Mammifères de l'ère glaciaire | **Nom vernaculaire allemand dominant** dans les livres jeunesse | Mammuthus → **Mammut** ; Coelodonta → **Wollnashorn** ; Smilodon → **Säbelzahntiger** ; Aenocyon → **Schreckenswolf** |
| Ptérosaures / reptiles marins / synapsides | Nom scientifique inchangé (pas de vernaculaire de genre établi) | Pteranodon, Ichthyosaurus, Mosasaurus, Dimetrodon |
| Noms de groupes en `-saurier` | **Ne PAS les utiliser** pour un genre précis : *Ichthyosaurier*, *Mosasaurier*, *Pterosaurier* désignent le groupe, pas le genre | Ichthyosaurus ≠ Ichthyosaurier |
| Noms propres géographiques | Inchangés, prononcés à l'allemande | Edmontonia, Utahraptor, Minmi, Patagotitan |

**Points de prononciation allemande (pour contrôle humain, rien à écrire) :**
- `ch` grec → /k/ (Brachiosaurus = « Brakiosaurus »), `ph` → /f/, `th` → /t/.
- `y` grec → /yː/ (« ü » long) en allemand traditionnel : Tyrannosaurus ≈ « Türannosaurus ». La voix native le fait seule.
- `-saurus` final : l'allemand dit « -zaurus » (s sonore) ; normal, laisser faire.
- `Pt-` initial (Pteranodon) : le P est muet en allemand comme en anglais ; la voix native le sait.
- Quelques variantes vernaculaires coexistent mais restent **moins dominantes** que le nom scientifique chez l'enfant allemand : *Urvogel* (Archaeopteryx), *Riesenfaultier* (Megatherium), *Riesennashorn* (Paraceratherium). On garde le nom de genre, l'alternative est signalée en note.

---

## 2. Table des 70 dinos — forme allemande pour le TTS

> **Donner au moteur TTS la colonne « Écrire pour le TTS ».** ⚠ / « à relire natif » = à faire valider par un humain natif (voir §4).

| id | Nom scientifique | Écrire pour le TTS | note |
|----|------------------|--------------------|------|
| aenocyon | Aenocyon | **Schreckenswolf** | nom vernaculaire établi du « dire wolf » ; le nom de genre Aenocyon est rare — à relire natif |
| albertosaurus | Albertosaurus | **Albertosaurus** | inchangé |
| allosaurus | Allosaurus | **Allosaurus** | inchangé |
| amargasaurus | Amargasaurus | **Amargasaurus** | inchangé (nom de lieu argentin) |
| ankylosaurus | Ankylosaurus | **Ankylosaurus** | inchangé |
| apatosaurus | Apatosaurus | **Apatosaurus** | inchangé |
| archaeopteryx | Archaeopteryx | **Archaeopteryx** | inchangé ; alternative vernaculaire « Urvogel » courante mais le genre reste dominant |
| archelon | Archelon | **Archelon** | inchangé ; tortue marine géante, pas de vernaculaire allemand — à relire natif |
| baryonyx | Baryonyx | **Baryonyx** | inchangé |
| brachiosaurus | Brachiosaurus | **Brachiosaurus** | inchangé |
| camarasaurus | Camarasaurus | **Camarasaurus** | inchangé |
| carcharodontosaurus | Carcharodontosaurus | **Carcharodontosaurus** | inchangé |
| carnotaurus | Carnotaurus | **Carnotaurus** | inchangé |
| centrosaurus | Centrosaurus | **Centrosaurus** | inchangé |
| ceratosaurus | Ceratosaurus | **Ceratosaurus** | inchangé |
| coelodonta | Coelodonta | **Wollnashorn** | nom vernaculaire dominant (rhinocéros laineux) ; aussi « Wollhaarnashorn », forme longue |
| corythosaurus | Corythosaurus | **Corythosaurus** | inchangé — ajouté 2026-08-10 au canon |
| cryolophosaurus | Cryolophosaurus | **Cryolophosaurus** | inchangé |
| deinonychus | Deinonychus | **Deinonychus** | inchangé |
| dilophosaurus | Dilophosaurus | **Dilophosaurus** | inchangé |
| dimetrodon | Dimetrodon | **Dimetrodon** | inchangé ; synapside, pas un dinosaure |
| diplodocus | Diplodocus | **Diplodocus** | inchangé |
| edaphosaurus | Edaphosaurus | **Edaphosaurus** | inchangé ; synapside permien, peu médiatisé — à relire natif |
| edmontonia | Edmontonia | **Edmontonia** | inchangé (nom de lieu canadien) |
| edmontosaurus | Edmontosaurus | **Edmontosaurus** | inchangé |
| elasmosaurus | Elasmosaurus | **Elasmosaurus** | inchangé ; plésiosaure |
| euoplocephalus | Euoplocephalus | **Euoplocephalus** | inchangé |
| gallimimus | Gallimimus | **Gallimimus** | inchangé |
| giganotosaurus | Giganotosaurus | **Giganotosaurus** | inchangé |
| glyptodon | Glyptodon | **Glyptodon** | inchangé ; mammifère — à relire natif (peu médiatisé) |
| gorgonops | Gorgonops | **Gorgonops** | inchangé ; gorgonopsien permien, peu médiatisé — à relire natif |
| hatzegopteryx | Hatzegopteryx | **Hatzegopteryx** | inchangé ; nom roumain (Hațeg), prononcé à l'allemande — à relire natif |
| ichthyosaurus | Ichthyosaurus | **Ichthyosaurus** | inchangé ; « Ichthyosaurier » = le GROUPE, pas le genre — ne pas substituer |
| iguanodon | Iguanodon | **Iguanodon** | inchangé |
| kentrosaurus | Kentrosaurus | **Kentrosaurus** | inchangé |
| liopleurodon | Liopleurodon | **Liopleurodon** | inchangé ; pliosaure |
| lystrosaurus | Lystrosaurus | **Lystrosaurus** | inchangé ; synapside, peu médiatisé — à relire natif |
| maiasaura | Maiasaura | **Maiasaura** | inchangé (« bonne mère lézard ») |
| mammuthus | Mammuthus | **Mammut** | nom vernaculaire ultra-dominant (mammouth) |
| megatherium | Megatherium | **Megatherium** | inchangé ; alternative « Riesenfaultier » existe mais moins usitée pour le genre |
| microraptor | Microraptor | **Microraptor** | inchangé |
| minmi | Minmi | **Minmi** | inchangé (nom de lieu australien) |
| mosasaurus | Mosasaurus | **Mosasaurus** | inchangé ; « Mosasaurier » = le GROUPE — ne pas substituer |
| moschops | Moschops | **Moschops** | inchangé ; thérapside permien, peu médiatisé — à relire natif |
| ophthalmosaurus | Ophthalmosaurus | **Ophthalmosaurus** | inchangé ; ichthyosaure |
| oviraptor | Oviraptor | **Oviraptor** | inchangé |
| pachycephalosaurus | Pachycephalosaurus | **Pachycephalosaurus** | inchangé |
| paraceratherium | Paraceratherium | **Paraceratherium** | inchangé ; alternative « Riesennashorn » moins usitée pour le genre |
| parasaurolophus | Parasaurolophus | **Parasaurolophus** | inchangé |
| patagotitan | Patagotitan | **Patagotitan** | inchangé (Patagonie + Titan) |
| pentaceratops | Pentaceratops | **Pentaceratops** | inchangé |
| plateosaurus | Plateosaurus | **Plateosaurus** | inchangé ; dinosaure « national » allemand (fossiles abondants en Allemagne) |
| protoceratops | Protoceratops | **Protoceratops** | inchangé |
| pteranodon | Pteranodon | **Pteranodon** | inchangé ; P initial muet à l'oral |
| quetzalcoatlus | Quetzalcoatlus | **Quetzalcoatlus** | inchangé (racine nahuatl) |
| saurolophus | Saurolophus | **Saurolophus** | inchangé ; ⚠ piège oral : SANS préfixe « Para- » (≠ Parasaurolophus) |
| scutellosaurus | Scutellosaurus | **Scutellosaurus** | inchangé ; peu médiatisé — à relire natif |
| shonisaurus | Shonisaurus | **Shonisaurus** | inchangé ; « Sh » ≈ « Sch » à l'allemande, la voix native gère |
| smilodon | Smilodon | **Säbelzahntiger** | nom vernaculaire dominant en littérature jeunesse ; « Säbelzahnkatze » = forme scientifiquement préférée |
| spinosaurus | Spinosaurus | **Spinosaurus** | inchangé |
| stegosaurus | Stegosaurus | **Stegosaurus** | inchangé |
| tarbosaurus | Tarbosaurus | **Tarbosaurus** | inchangé |
| therizinosaurus | Therizinosaurus | **Therizinosaurus** | inchangé |
| titanis | Titanis | **Titanis** | inchangé ; oiseau-terreur, genre peu médiatisé — à relire natif |
| torosaurus | Torosaurus | **Torosaurus** | inchangé |
| triceratops | Triceratops | **Triceratops** | inchangé ; **Tritri de Max** |
| troodon | Troodon | **Troodon** | inchangé ; ancienne orthographe allemande « Troödon » abandonnée |
| tyrannosaurus | Tyrannosaurus | **Tyrannosaurus** | inchangé ; « Tyrannosaurus rex » / « T-Rex » très courants à l'oral |
| utahraptor | Utahraptor | **Utahraptor** | inchangé |
| velociraptor | Velociraptor | **Velociraptor** | inchangé |

---

## 3. Noms qui se lisent bien tels quels

Particularité de l'allemand : **quasiment tous** les noms se lisent tels quels — c'est la norme de la langue pour les taxons. La voix native allemande prononce correctement depuis l'orthographe latine. Les seuls noms où on **ne donne PAS** le nom scientifique au TTS sont les 4 vernaculaires dominants :

**Mammut** (Mammuthus) · **Wollnashorn** (Coelodonta) · **Säbelzahntiger** (Smilodon) · **Schreckenswolf** (Aenocyon).

> En cas de doute → garder le nom scientifique inchangé, c'est l'usage allemand. Un **preview groupé** (1 seul MP3 énonçant les 70 noms) permet à un natif de tout valider en une écoute avant la prod de masse.

---

## 4. ⚠️ Incertitudes — à faire valider par un natif germanophone

Aucun nom n'a été inventé : le draft LLM a été croisé entre deux modèles (DeepSeek V4-Pro puis vérification Grok). Les désaccords ont été tranchés (voir §5). Points restant à confirmer par un humain :

- **aenocyon → Schreckenswolf** — tranché contre « Schattenwolf » (proposé par le 1er LLM, non établi). « Schreckenswolf » est la forme attestée (Wikipédia DE, médias). Reste à confirmer que le projet préfère le vernaculaire au nom de genre Aenocyon.
- **smilodon → Säbelzahntiger** — tranché contre « Säbelzahnkatze » (zoologiquement plus juste, mais « Säbelzahntiger » domine nettement en littérature jeunesse). Choix éditorial à valider.
- **archelon / edaphosaurus / glyptodon / gorgonops / hatzegopteryx / lystrosaurus / moschops / scutellosaurus / titanis** — taxons peu médiatisés en Allemagne ; le nom scientifique inchangé est la seule option réaliste, mais vérifier qu'aucun vernaculaire établi n'existe dans les encyclopédies jeunesse allemandes (Was ist Was, Kosmos…).
- **archaeopteryx** — « Urvogel » est très connu en Allemagne (le pays de Solnhofen !). On garde le nom de genre par cohérence avec les 64 autres, mais c'est le candidat n°1 si le projet veut un 5e vernaculaire.
- **mammuthus → Mammut** — si l'encyclopédie veut le nom scientifique, ce serait « Mammuthus » (rare à l'oral enfant). Choix tranché : Mammut, ultra-dominant.
- **coelodonta → Wollnashorn** — variante longue « Wollhaarnashorn » possible ; « Wollnashorn » est la forme jeunesse courante.

> **Garde-fou process (comme les autres lexiques) :** générer 1 MP3 court (voix Native German) énonçant les 70 formes → écoute unique par un natif → corriger → prod de masse.

---

## 5. Désaccords LLM tranchés (traçabilité)

| Entrée | DeepSeek (draft) | Grok (croisement) | Tranché | Raison |
|--------|------------------|-------------------|---------|--------|
| aenocyon | Schattenwolf | Schreckenswolf | **Schreckenswolf** | « Schattenwolf » n'est pas attesté ; « Schreckenswolf » = forme établie (dewiki, médias) |
| smilodon | Säbelzahnkatze | Säbelzahntiger | **Säbelzahntiger** | dominant en littérature jeunesse ; l'alternative zoologique est notée |
| ichthyosaurus / mosasaurus | genre + groupe mentionnés | genre seul | **genre seul** | « Ichthyosaurier/Mosasaurier » = noms de groupes, pas de genres |
| megatherium / paraceratherium | genre + alternatives vernaculaires | genre seul | **genre seul** | les vernaculaires (Riesenfaultier, Riesennashorn) désignent plutôt les groupes/proches parents |

---

_Créé 2026-08-11. Méthode : draft DeepSeek V4-Pro (3 chunks de ~24 noms) croisé avec Grok (mêmes chunks), désaccords tranchés sur l'usage de la littérature jeunesse allemande. Relecture native humaine à prévoir avant prod audio de masse. Le texte parlé n'est jamais affiché à l'écran._
