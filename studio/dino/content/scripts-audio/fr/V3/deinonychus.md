# Deinonychus — dialogue audio V3 (Narrateur H + Wex)

> Dromæosaure (famille `raptor`, clé technique dinos-data.js), Crétacé · 115 millions d'années · Amérique du Nord.
> Chiffres data (`site/js/dinos-data.js` id `deinonychus`) : 3,4 m long · 0,9 m haut · 80 kg. Comparaisons = sortie EXACTE de `_compLong(3.4)` / `_compHaut(0.9)` / `_compPoids(0.08)`, exécutées node 2026-09-05 : `comme une petite voiture !` / `aussi grand qu'un enfant de 4 ans !` / `aussi lourd que Papa !`.
> Vitesse : `vitesse_kmh: 30` en data. `_compVitesse(30)` exécutée node : `aussi vite qu'un cheval au petit galop !`. Ajoutée en fin de bloc B, formulée en estimation (« les savants pensent »).
> Étymologie conforme à `_ETYMO-RACINES-50.md` + `nom_etym` : grec *deinos* = terrible (même racine que « dinosaure ») + grec *onyx* = griffe → « la griffe terrible ».
> Fact-check Grokipedia + Wikipedia (2026-09-05) : Deinonychus antirrhopus, formation Cloverly, Amérique du Nord. 🔒 **Le `desc` data cite encore « Jurassic Park » — INTERDIT dans ce script (ticket ALERTE-JP)** : la démystification passe sans jamais nommer la franchise. C'est LUI (pas le Vélociraptor, plus petit) que les films ont pris comme modèle des grands raptors féroces — fait vrai, dit sans citer le nom du film. Griffe rétractable d'environ 13 cm, arme d'accroche. Chasse en groupe débattue (bonebed associé à un Tenontosaurus, Ostrom 1969) — formulée en hypothèse.
> Prononciation : « Deinonychus » respellé **Daï-no-ni-kuss** (ch→k, y→i, -us→-uss, règles §1, déjà gravé lexique §2).
> Grep-interdits OK (aucune franchise nommée). Wex FR standard, aucun tic écrit, jamais de `!` final.
> Tritri : aucune touche — Amérique du Nord mais 115 Ma (Crétacé précoce), bien avant le Tricératops (Crétacé final) — pas contemporains, pas de croisement forcé.

## Deinonychus — Deinonychus antirrhopus

### BLOC A — Présentation

**NARRATEUR H** [excited] : Daï-no-ni-kuss. En grec, « deinos » veut dire terrible — [serious] c'est la même racine que le mot « dinosaure » ! Et « onyx », c'est la griffe. [curious] Alors, ça donne quoi ?
**WEX** [confident] : La griffe terrible.
**NARRATEUR H** [happily] : Voilà. [proud] Il vivait en Amérique du Nord, il y a 115 millions d'années.
**WEX** [curious] : C'est lui, [gasps] le grand raptor qui fait peur dans les films ?
**NARRATEUR H** [serious] : Oui, en vrai [gently] c'est plutôt lui qui a inspiré ces images-là — pas le petit Vélociraptor. Mais lui aussi avait des plumes.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 3 virgule 4 mètres de long — [quickly] comme une petite voiture ! Debout, il faisait 0 virgule 9 mètre de haut — aussi grand qu'un enfant de 4 ans ! Et il pesait 80 kilos — [proud] aussi lourd que Papa. [amazed] Et les savants pensent qu'il pouvait courir à 30 kilomètres à l'heure — aussi vite qu'un cheval au petit galop.
**WEX** [curious] : Et sa fameuse griffe, [gasps] elle mesurait combien ?
**NARRATEUR H** [confident] : Environ 13 centimètres. [serious] Recourbée, tranchante — une vraie arme pour accrocher sa proie.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un carnivore. Il chassait des dinosaures bien plus gros que lui, [confident] comme l'Iguanodon, et peut-être pas tout seul.
**WEX** [curious] : Pas tout seul ?
**NARRATEUR H** [hesitant] : Les savants en débattent encore. [slowly] On a retrouvé plusieurs Deinonychus près d'une même grosse proie — [pauses] peut-être qu'ils chassaient en groupe pour s'attaquer à plus gros qu'eux.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Sa griffe recourbée servait à s'accrocher, [amazed] comme un grappin. [slowly] Il sautait sur sa proie, plantait sa griffe, et tenait bon avec ses bras aux longues plumes, le temps que ses dents fassent le reste.
**WEX** [gasps] : Un grappin vivant.
**NARRATEUR H** [softly] : Exactement. [proud] C'est cette griffe-là qui a donné son nom à toute la famille des raptors.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie conforme : deinos = terrible + onyx = griffe. Wex devine.
- [x] Chiffres = sortie exacte `_compLong(3.4)` / `_compHaut(0.9)` / `_compPoids(0.08)` — exécutées node 2026-09-05.
- [x] Vitesse `_compVitesse(30)` exécutée, formulée en estimation, présente en bloc B.
- [x] 🔒 « Jurassic Park » jamais nommé — démystification tient sans citer la franchise (« c'est lui qui a inspiré ces images-là »), conforme au ticket ALERTE-JP.
- [x] Chasse en groupe formulée en hypothèse (« les savants en débattent encore »), jamais comme un fait.
- [x] Respelling Daï-no-ni-kuss appliqué au nom prononcé en tête.
- [x] Anti-doublon : griffe mentionnée en A (survolée) puis détaillée avec chiffre en B, puis usage en D (mécanisme, pas le chiffre) — pas de redite du chiffre.
- [x] Wex : réactions variées, aucun `!` final.
- [x] Grep interdits OK.
- [x] Tags ≤ 2 collés en tête, densité Narrateur 2-4, Wex 1-2.
