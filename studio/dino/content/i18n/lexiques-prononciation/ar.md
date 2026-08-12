# Lexique de prononciation — noms de dinos en ARABE (العربية) pour ElevenLabs (eleven_v3)

> **Langue cible : arabe standard moderne (العربية الفصحى).** Voix TTS : **Native Arabic**.
> **Méthode : écriture native arabe** — nom établi dans la littérature/médias jeunesse arabes quand il existe (ex. تيرانوصور, ترايسيراتوبس), sinon translittération standard en alphabet arabe.
> **Ce lexique sert à générer l'AUDIO TTS avec une voix native arabe. Le texte parlé (arabe) n'est JAMAIS affiché à l'écran** — c'est uniquement l'entrée que lit la voix.
> **PAS de tirets de syllabation** (décision projet : les voix natives n'en ont pas besoin). Pas de tashkeel par défaut, sauf si une voyelle lève une ambiguïté.
> Forgé sur le gabarit des lexiques [`en.md`](en.md) / [`zh.md`](zh.md).
> **Statut : draft LLM validé par croisement (DeepSeek V4-Pro × Grok), relecture native humaine à prévoir.** Date : 2026-08-11.

---

## 1. Règles de conversion (racine grec/latin → arabe)

L'arabe n'a pas de tradition de « traduction sémantique » des dinos comme le chinois : il **translittère le nom scientifique** en alphabet arabe, avec quelques suffixes stabilisés par l'usage. Correspondances appliquées dans toute la table :

| Racine savante | Rendu arabe usuel | Exemple |
|----------------|-------------------|---------|
| `-saurus` / `-saure` | **صور** (ṣawr) | ألوصور (Allosaurus) |
| `-taurus` | **توروس** | كارنوتوروس (Carnotaurus) |
| `-ceratops` | **سيراتوبس** | ترايسيراتوبس (Triceratops) |
| `-raptor` | **رابتور** | فيلوسيرابتور (Velociraptor) |
| `-mimus` | **ميموس** | غاليميموس (Gallimimus) |
| `-don` / `-odon` | **دون** / **ودون** | إغوانودون (Iguanodon) |
| `-nyx` / `-onyx` | **نيكس** | باريونيكس (Baryonyx) |
| `ptero-` / `-pteryx` | **بتير** / **بتريكس** (le p reste muet à la source mais s'écrit) | بتيرانودون (Pteranodon) |
| `ch` (grec, /k/) | **ك** | أركيوبتركس (Archaeopteryx) |
| `ph` | **ف** | دايلوفوصور (Dilophosaurus) |
| `th` | **ث** | كوريثوصور (Corythosaurus) |
| `y` (grec) | **ي** | أنكيلوصور (Ankylosaurus) |
| `x` final | **كس** | ديبلودوكس (Diplodocus) |
| `ae` / `oe` | voyelle simple (sans digramme) | سيلودونتا (Coelodonta) |
| `g` | **ج** ou **غ** selon l'usage du mot | جيغانوتوصور / إغوانودون |
| `v` | **ف** | فيلوسيرابتور |
| `qu` (nahuatl) | **كو** | كويتزالكواتلس (Quetzalcoatlus) |
| voyelle initiale | **همزة** (أ/إ) | أباتوصور, إدمونتوصور |
| voyelle longue a/o/u/i | **ا / و / ي** | تيرانوصور |

**Points de vigilance natifs :**
- L'arabe écrit sans voyelles courtes : la voix TTS native lit la forme consonnantique en MSA sans problème. On évite le tashkeel sauf ambiguïté réelle.
- Les voyelles longues (ا و ي) portent toute la structure du mot : elles sont **obligatoires** et font foi dans cette table.
- ج/غ pour le « g » latin : les deux coexistent dans l'usage arabe (غيتار، إغوانا). On garde la forme la plus courante mot par mot.
- Pour la mégafaune non-dino (mammouth, smilodon…), l'arabe a parfois un **nom commun établi** (ماموث) plus naturel qu'une translittération savante : on le signale en note.

---

## 2. Table des 70 dinos — forme arabe (lue par le TTS) + note

> **Donner au moteur TTS la colonne « Écrire pour le TTS »** (alphabet arabe, sans tirets). « à relire natif » = à faire valider par un humain natif avant prod (voir §3).

| id | Nom scientifique | Écrire pour le TTS | note |
|----|------------------|--------------------|------|
| aenocyon | Aenocyon | إينوسايون | — à relire natif : genre très rare en jeunesse ; l'animal est souvent désigné par son nom commun الذئب الرهيب (« dire wolf ») |
| albertosaurus | Albertosaurus | ألبرتوصور | |
| allosaurus | Allosaurus | ألوصور | forme établie |
| amargasaurus | Amargasaurus | أمارجاصور | |
| ankylosaurus | Ankylosaurus | أنكيلوصور | |
| apatosaurus | Apatosaurus | أباتوصور | |
| archaeopteryx | Archaeopteryx | أركيوبتركس | ch→ك, x→كس |
| archelon | Archelon | أركيلون | tortue marine géante, non-dino |
| baryonyx | Baryonyx | باريونيكس | |
| brachiosaurus | Brachiosaurus | براكيوصور | |
| camarasaurus | Camarasaurus | كاماراصور | |
| carcharodontosaurus | Carcharodontosaurus | كاركارودونتوصور | ch→ك deux fois |
| carnotaurus | Carnotaurus | كارنوتوروس | variante كارنوتاوروس (Grok) ; forme retenue = usage établi (wiki arabe) |
| centrosaurus | Centrosaurus | سنتروصور | |
| ceratosaurus | Ceratosaurus | سيراتوصور | |
| coelodonta | Coelodonta | سيلودونتا | — à relire natif : le rhinocéros laineux est plus connu sous وحيد القرن الصوفي |
| corythosaurus | Corythosaurus | كوريثوصور | — à relire natif : th→ث, usage jeunesse à confirmer |
| cryolophosaurus | Cryolophosaurus | كريولوفوصور | ph→ف |
| deinonychus | Deinonychus | داينونيكس | ch→ك |
| dilophosaurus | Dilophosaurus | دايلوفوصور | ph→ف |
| dimetrodon | Dimetrodon | ديميترودون | — à relire natif : synapside permien, pas un dino ; translittération sans usage établi |
| diplodocus | Diplodocus | ديبلودوكس | forme établie |
| edaphosaurus | Edaphosaurus | إدافوصور | — à relire natif : synapside permien, pas un dino |
| edmontonia | Edmontonia | إدمونتونيا | |
| edmontosaurus | Edmontosaurus | إدمونتوصور | |
| elasmosaurus | Elasmosaurus | إلاسموصور | plésiosaure, non-dino |
| euoplocephalus | Euoplocephalus | يوبلوسيفالوس | variante يوبلوكيفالوس (Grok, c grec→ك) ; forme retenue pour cohérence avec باكيسيفالوصور |
| gallimimus | Gallimimus | غاليميموس | g→غ (usage courant pour /g/) |
| giganotosaurus | Giganotosaurus | جيغانوتوصور | |
| glyptodon | Glyptodon | جليبتودون | — à relire natif : mammifère blindé, usage jeunesse rare |
| gorgonops | Gorgonops | جورجونوبس | — à relire natif : gorgonopsien permien, pas un dino |
| hatzegopteryx | Hatzegopteryx | هاتزيغوبتريكس | — à relire natif : ptérosaure géant, graphie du lieu roumain Hațeg à confirmer |
| ichthyosaurus | Ichthyosaurus | إكتيوصور | reptile marin, non-dino |
| iguanodon | Iguanodon | إغوانودون | g→غ comme dans إغوانا (iguane) |
| kentrosaurus | Kentrosaurus | كنتوروصور | |
| liopleurodon | Liopleurodon | ليوبليورودون | pliosaure, non-dino |
| lystrosaurus | Lystrosaurus | ليستروصور | — à relire natif : synapside, survivant du Permien |
| maiasaura | Maiasaura | ماياصورا | — à relire natif : -saura féminin rendu صورا |
| mammuthus | Mammuthus | ماموث | nom commun établi (correction Grok), plus naturel pour un enfant que ماموثوس |
| megatherium | Megatherium | ميغاثيريوم | — à relire natif : paresseux terrestre géant, usage rare |
| microraptor | Microraptor | ميكرورابتور | |
| minmi | Minmi | مينمي | — à relire natif : nom de lieu australien, pas de racine grecque |
| mosasaurus | Mosasaurus | موساصور | reptile marin, non-dino ; forme établie |
| moschops | Moschops | موسكوبس | — à relire natif : thérapside permien, ch→ك |
| ophthalmosaurus | Ophthalmosaurus | أوفثالموصور | — à relire natif : ph→ف, th→ث ; normalisé en صور final (draft DeepSeek : أوفثالموسورس) |
| oviraptor | Oviraptor | أوفيرابتور | |
| pachycephalosaurus | Pachycephalosaurus | باكيسيفالوصور | ch→ك, ph→ف |
| paraceratherium | Paraceratherium | باراسيراثيريوم | — à relire natif : rhinocéros géant, usage jeunesse rare |
| parasaurolophus | Parasaurolophus | باراصورولوفوس | ph→ف |
| patagotitan | Patagotitan | باتاغوتيتان | g→غ (Patagonie ≈ باتاغونيا) |
| pentaceratops | Pentaceratops | بنتاسيراتوبس | |
| plateosaurus | Plateosaurus | بلاتيوصور | |
| protoceratops | Protoceratops | بروتوسيراتوبس | |
| pteranodon | Pteranodon | بتيرانودون | ptérosaure, non-dino |
| quetzalcoatlus | Quetzalcoatlus | كويتزالكواتلس | correction Grok (usage établi pour Quetzalcoatl : كويتزالكواتل) ; variante DeepSeek كيتزالكواتلس |
| saurolophus | Saurolophus | سورولوفوس | — à relire natif : ⚠ piège oral ≠ باراصورولوفوس (Parasaurolophus) |
| scutellosaurus | Scutellosaurus | سكوتيلوصور | — à relire natif : variante Grok سكوتيلوسور (سور final) ; صور retenu pour cohérence de la table |
| shonisaurus | Shonisaurus | شونيصور | — à relire natif : ichthyosaure géant peu médiatisé en arabe |
| smilodon | Smilodon | سمايلودون | mammifère (tigre à dents de sabre) |
| spinosaurus | Spinosaurus | سبينوصور | forme établie |
| stegosaurus | Stegosaurus | ستيجوصور | forme établie |
| tarbosaurus | Tarbosaurus | تاربوصور | |
| therizinosaurus | Therizinosaurus | ثيريزينوصور | th→ث |
| titanis | Titanis | تيتانيس | — à relire natif : « terror bird », genre rare hors littérature scientifique |
| torosaurus | Torosaurus | توروصور | |
| triceratops | Triceratops | ترايسيراتوبس | forme ultra-établie (Tritri de Max) |
| troodon | Troodon | ترودون | |
| tyrannosaurus | Tyrannosaurus | تيرانوصور | forme ultra-établie |
| utahraptor | Utahraptor | يوتارابتور | variante Grok يوتاه رابتور (deux mots) ; un seul mot retenu, plus fluide au TTS |
| velociraptor | Velociraptor | فيلوسيرابتور | forme établie |

---

## 3. ⚠️ Incertitudes — à faire valider par un natif arabophone avant prod audio de masse

Méthode : draft DeepSeek V4-Pro, croisé et corrigé par Grok ; les désaccords ont été tranchés vers l'usage le plus courant de la littérature jeunesse arabe (voir §2, notes). Restent à valider humainement :

1. **Entrées marquées « à relire natif » (19)** : aenocyon, coelodonta, corythosaurus, dimetrodon, edaphosaurus, glyptodon, gorgonops, hatzegopteryx, lystrosaurus, maiasaura, megatherium, minmi, moschops, ophthalmosaurus, paraceratherium, saurolophus, scutellosaurus, shonisaurus, titanis. Ce sont pour l'essentiel des **non-dinosaures obscurs** (synapsides permiens, mégafaune cénozoïque, genres rares) sans forme arabe établie en jeunesse — translittérations propres mais non attestées.
2. **Désaccords LLM tranchés** (détail des deux positions en note §2) : carnotaurus (كارنوتوروس retenu), euoplocephalus (يوبلوسيفالوس retenu), mammuthus (ماموث retenu, nom commun), quetzalcoatlus (كويتزالكواتلس retenu), scutellosaurus (سكوتيلوصور retenu), utahraptor (يوتارابتور retenu).
3. **Noms communs vs scientifiques pour la mégafaune** : ماموث (mammouth) a été préféré à la translittération savante. Même question ouverte pour le rhinocéros laineux (وحيد القرن الصوفي) et le dire wolf (الذئب الرهيب) si le projet préfère le nom commun — décision éditoriale à trancher avec un natif.
4. **ج vs غ pour le « g » latin** : l'usage varie selon les pays arabophones (غ dominant au Machrek pour /g/, ج ailleurs). La table mixe les deux selon l'usage le plus courant de chaque mot — un natif peut vouloir harmoniser.

> **Garde-fou process (comme zh.md §4)** : générer **1 seul MP3 court** (voix Native Arabic) énonçant les 70 formes d'affilée → écoute unique par un natif → corriger cette table → puis prod de masse. Coût : 1 clip vs 70 ratés.

---

_Créé 2026-08-11. Draft LLM validé par croisement (DeepSeek V4-Pro × Grok), relecture native humaine à prévoir. Méthode : écriture native arabe, noms établis quand ils existent, sinon translittération MSA standard. Sert d'entrée au TTS voix Native Arabic ; le texte parlé n'est jamais affiché._
