# Titanis — Script audio (Narrateur H + Wex)

> Oiseau (famille `oiseaux`), PAS un dinosaure — il vit APRÈS la météorite. Cénozoïque · il y a 3 millions d'années · Amérique du Nord.
> Chiffres data (`site/js/dinos-data.js` id `titanis`) : 1,9 m long · 1,9 m haut · 0,15 t · `vitesse_kmh: 45` (confiance haute, ajouté à la data par l'orchestrateur en cours de lot). Comparaisons = sortie EXACTE de `_compLong(1.9)` / `_compHaut(1.9)` / `_compPoids(0.15)` / `_compVitesse(45)`, exécutées node 2026-09-05 : `aussi long qu'une moto !` / `aussi haut qu'une porte !` / `aussi lourd qu'un âne !` / `aussi vite qu'un cheval au galop !`.
> Vitesse dite en estimation, en bloc C (courir pour chasser) : « les savants pensent qu'il pouvait courir à 45 kilomètres à l'heure — aussi vite qu'un cheval au galop ».
> Étymologie conforme `_ETYMO-RACINES-50.md` : nommé d'après les Titans, géants de la mythologie grecque → « l'oiseau Titan » (allusion à sa taille).
> Fact-check (Grokipedia, 2026-09-05) : Titanis walleri, terror bird, oiseau incapable de voler, Amérique du Nord, il y a 3 millions d'années — seul terror bird connu à avoir migré depuis l'Amérique du Sud jusqu'en Amérique du Nord (Grand échange américain). C'est un OISEAU, pas un mammifère (décision taxo déjà gravée dans `INVARIANTS.md`, rappelée ici) : le script le dit explicitement.
> Prononciation : « Ti-ta-niss » (lexique §2/§2bis, -is final, validé Papa Yann à l'oreille 2026-07-28).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> **Révision densité tags (2026-09-05, retour orchestrateur/Papa Yann)** : tags répartis au fil des phrases, Wex ponctué systématiquement (`?` sur les questions).

## Titanis — Titanis walleri

### BLOC A — Présentation

**NARRATEUR H** [excited] : Ti-ta-niss. Ça vient des Titans, [proud] des géants tout-puissants dans les vieilles histoires grecques. L'oiseau Titan.
**WEX** [curious] : Un oiseau géant ?
**NARRATEUR H** [happily] : Un vrai oiseau, oui — [serious] mais pas un dinosaure. Il est arrivé bien après, [pauses] il y a 3 millions d'années, en Amérique du Nord.
**WEX** [gasps] : Un oiseau, avec des plumes ?
**NARRATEUR H** [confident] : Avec de vraies plumes, oui. [amazed] Mais bien trop grand et trop lourd pour voler.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 1 mètre 90 de long — aussi long qu'une moto ! Debout, il faisait 1 mètre 90 de haut — [amazed] aussi haut qu'une porte ! Et il pesait 150 kilos — [proud] aussi lourd qu'un âne !
**WEX** [curious] : Haut comme une porte, mais un oiseau ?
**NARRATEUR H** [confident] : Un oiseau sur deux très grandes pattes, oui. [playful] Fait pour courir, pas pour s'envoler.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un carnivore. Il chassait les petits mammifères et les jeunes chevaux, [amazed] en courant, tout seul. [quickly] Les savants pensent qu'il pouvait courir à 45 kilomètres à l'heure — aussi vite qu'un cheval au galop.
**WEX** [curious] : Il attrapait comment, sans mains ?
**NARRATEUR H** [confident] : Avec son bec énorme et crochu, [amazed] plus gros que ta tête.

### BLOC D — Le truc fou

**NARRATEUR H** [amazed] : Titanis est le seul oiseau-terreur qui soit venu jusqu'en Amérique du Nord — [proud] tous ses cousins vivaient plus au sud.
**WEX** [gasps] : Il a voyagé tout seul ?
**NARRATEUR H** [softly] : Un grand voyage à pied, [slowly] pour un oiseau qui ne vole pas.

---

## Vérification avant livraison

- [x] 1 animal, 4 blocs A/B/C/D. PAS un dinosaure, PAS un mammifère (oiseau), vit après la météorite (dit explicitement en A).
- [x] Étymologie conforme `_ETYMO-RACINES-50.md` : Titans → « l'oiseau Titan ».
- [x] Chiffres B = sortie exacte `_compLong(1.9)`/`_compHaut(1.9)`/`_compPoids(0.15)` exécutées node.
- [x] Vitesse dite en estimation (« les savants pensent ») avec chiffre 45 km/h + sortie exacte `_compVitesse(45)` = « aussi vite qu'un cheval au galop », en bloc C, conforme consigne HO-011 vitesse.
- [x] Pas de Tritri.
- [x] Bloc D neuf : migration Amérique du Sud → Nord (aucun doublon avec A/B/C).
- [x] Wex sans `!`, FR standard, chaque réplique ponctuée.
- [x] Grep interdits : 0 match.
