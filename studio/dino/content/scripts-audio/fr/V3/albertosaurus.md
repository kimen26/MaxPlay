# Albertosaure — dialogue audio V3 (Narrateur H + Wex)

> Tyrannosauridé (famille `trex`, clé technique dinos-data.js), Crétacé · 70 millions d'années · Canada (Alberta, formation Horseshoe Canyon).
> **Pilote EP-D-29 (2026-08-17)** — réécriture après écoute réelle Papa Yann + enfant. Défauts corrigés : (1) bloc A listait des hadrosaures (Edmontosaure, Parasaurolophus) comme « copains dangereux » alors que ce sont des proies — et que le Parasaurolophus n'était même PAS contemporain ; (2) « 26 squelettes » + « comme des loups » dits en C **et** en D (signalé ×5 dans les relectures 2026-06-15, jamais corrigé) — le bloc D n'apporte plus que du neuf.
> Chiffres data (`site/js/dinos-data.js` id `albertosaurus`) : 9,5 m long · 3 m haut · 2 t. Comparaisons = sortie EXACTE de `_compLong(9.5)` / `_compHaut(3)` / `_compPoids(2)`, exécutées par node le 2026-08-17 : `aussi long qu'un camion !` / `aussi haut qu'un panier de basket !` / `aussi lourd qu'un rhinocéros !`.
> Étymologie conforme à `_ETYMO-RACINES-50.md` + champ `nom_etym` : Alberta (région du Canada) + grec *sauros* = lézard → « le lézard de l'Alberta ». Bonus bloc D : *sarcophagus* = « qui mange la viande » en grec (fact-check Grokipedia : « sarcophagus (Greek for "flesh-eating") »).
> Fact-check cohabitations (Grokipedia + Wikipedia, 2026-08-17) : Albertosaurus = Horseshoe Canyon (~73-68 Ma), superprédateur DOMINANT (« the most common large carnivore in the area », aucun rival — dit comme un fait fort). Gorgosaurus libratus (76,5-73 Ma, Dinosaur Park) et Parasaurolophus walkeri (76,5-73 Ma, Dinosaur Park) = PAS contemporains → retirés de la fiche. Proies citées = Edmontosaure (E. regalis, Horseshoe Canyon ✓) et Saurolophe (S. osborni, Horseshoe Canyon ✓ — cohérent avec saurolophus.md « En Amérique, l'Albertosaure le chassait »).
> Bonebed Dry Island : 26 individus au même endroit, tous âges confondus — hypothèse du groupe/meute (Currie) formulée comme HYPOTHÈSE (« peut-être », « les savants cherchent encore »), débat réel non tranché. Motif « comme les loups » CONSERVÉ (décision PY 2026-08-17 : seul cas étayé par un bonebed — Albertosaure = propriétaire du motif ; à retirer d'Allosaure/Giganotosaure à leur réécriture — voir `_SCENES-VIGNETTES.md`).
> Deux doigts aux pattes avant : fact-checké (Grokipedia « forelimbs short and two-fingered »), signature de la famille, lien T-Rex porté par Wex.
> Prononciation : « Albertosaure » se lit bien tel quel (lexique §3) ; « Sarcophagus » respellé « Sar-ko-fa-guss » (ph→f, -us→-uss, règles §1).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> **Vitesse (ajout 2026-09-05, HO-011)** : `vitesse_kmh: 30` dans dinos-data.js. `_compVitesse(30)` exécutée node : « aussi vite qu'un cheval au petit galop ! ». Ajoutée en fin de bloc B, formulée en estimation (« les savants pensent »).

## Albertosaure — Albertosaurus sarcophagus

### BLOC A — Présentation

**NARRATEUR H** [excited] : Al-ber-to-saure. [curious] « Alberto », ça vient de l'Alberta, une GRANDE région du Canada où on a trouvé ses os. [playful] Et « saure », tu sais ce que ça veut dire ?
**WEX** [confident] : Lézard. Alors... le lézard de l'Alberta.
**NARRATEUR H** [happily] : Exactement. [amazed] Il vivait là-bas, il y a 70 millions d'années. [warmly] Un cousin du T-Rex.
**WEX** [curious] : Et il avait des ennemis ? [nervous] Des chasseurs encore plus forts que lui ?
**NARRATEUR H** [confident] : Non. [warmly] Dans son pays, c'était lui le plus grand chasseur. [proud] Aucun autre carnivore n'était assez costaud pour l'embêter.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 9 virgule 5 mètres de long — aussi long qu'un camion ! [quickly] Debout, il faisait 3 mètres de haut — aussi haut qu'un panier de basket ! Et il pesait 2 mille kilos — aussi lourd qu'un rhinocéros ! [amazed] Et les savants pensent qu'il pouvait courir à 30 kilomètres à l'heure — aussi vite qu'un cheval au petit galop.
**WEX** [curious] : Et ses bras ? [playful] Tout petits, comme le T-Rex ?
**NARRATEUR H** [confident] : Oui, tout pareil : minuscules, [amazed] avec seulement DEUX doigts à chaque patte.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un carnivore. Il chassait les gros mangeurs de plantes de son pays — [confident] l'Edmontosaure, et le Saurolophe avec sa crête. [pauses] Et peut-être qu'il ne chassait pas tout seul : [amazed] on a retrouvé 26 Albertosaures ensemble, au même endroit.
**WEX** [gasps] : 26 ? Alors, ils étaient copains ?
**NARRATEUR H** [playful] : C'est exactement la question que se posent les savants. [mischievously] Peut-être une vraie meute, comme les loups d'aujourd'hui. [curious] Ils cherchent encore la réponse.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : En vrai, les savants l'appellent par son nom en entier : Albertosaurus sarcophagus. [confident] Albertosaurus, tu le connais déjà. [whispers] Et « Sar-ko-fa-guss », en grec, ça veut dire... qui MANGE la viande.
**WEX** [playful] : Carrément écrit dans son nom.
**NARRATEUR H** [softly] : Oui. [amazed] Avec des dents pareilles, le nom était tout trouvé.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie conforme (`_ETYMO-RACINES-50.md` + `nom_etym`) : Alberta + grec *sauros* = lézard. Wex assemble lui-même la traduction (priorité Papa Yann : Wex participe au nom).
- [x] Chiffres taille/poids = sortie exacte `_compLong(9.5)` / `_compHaut(3)` / `_compPoids(2)` — exécutées node 2026-08-17 (trace dans le rapport de session) : camion / panier de basket / rhinocéros. Bloc B repris mot pour mot de `_BLOC-B-CANONIQUE.md`.
- [x] Bloc A corrigé : plus AUCUNE proie présentée comme « copain dangereux » ; aucun rival inventé — superprédominance dit comme un fait fort (fact-check : carnivore le plus commun de Horseshoe Canyon).
- [x] Espèces citées toutes contemporaines vérifiées : Edmontosaure ✓, Saurolophe ✓ (Horseshoe Canyon). Gorgosaure et Parasaurolophus retirés (Dinosaur Park, ~76-73 Ma = pas contemporains).
- [x] Bloc D = 100 % neuf (sens de « sarcophagus ») ; « 26 » et toute image de meute absents de D (doublon historique éliminé).
- [x] Hypothèse meute formulée comme hypothèse (« peut-être », « les savants cherchent encore »), jamais comme un fait.
- [x] Motif « comme les loups » conservé, formulé en hypothèse (Albertosaure = propriétaire du motif, décision PY 2026-08-17 — registre `_SCENES-VIGNETTES.md`).
- [x] Deux doigts fact-checkés (Grokipedia) ; vignette sobre, 1 phrase, portée par la question de Wex.
- [x] Wex : réactions variées ([confident] déduction → [curious] ×2 questions → [gasps] unique sur le 26 → [playful] chute), jamais de `!` final, aucun écho de phrase du Narrateur.
- [x] On écoute : le verbe de vision banni est absent du dialogue (0 occurrence).
- [x] Au plus 1 tag par réplique (2 autorisés). Majuscules : GRANDE / DEUX / MANGE (≥ 4 lettres).
- [x] Noms respellés : Al-ber-to-saure (syllabation), Sar-ko-fa-guss (ph→f, -uss).
- [x] Grep interdits exécuté : 0 match sur le texte parlé (trace dans le rapport de session).
- [x] Dialogue A→D : ~1 580 caractères tags inclus (ajustements PY : nom en entier en D + meute en C) — tient en UN appel text-to-dialogue (≤ ~1800).
