# Archéoptéryx — dialogue audio V3 (Narrateur H + Wex)

> Premier oiseau connu, rangé dans la famille app « Dromæosaures » par simplification (clé technique `raptor`, dinos-data.js) — **ne pas dire « c'est un dromæosaure »**, dire « un des premiers oiseaux ». Jurassique · 150 millions d'années · Europe (Allemagne).
> Chiffres data (`site/js/dinos-data.js` id `archaeopteryx`) : 0,5 m long · 0,3 m haut · 1 kg. Comparaisons = sortie EXACTE de `_compLong(0.5)` / `_compHaut(0.3)` / `_compPoids(0.001)`, exécutées node 2026-09-05 : `comme un gros chat allongé !` / `il t'arrivait aux genoux !` / `léger comme un petit oiseau !`.
> Pas de `vitesse_kmh` en data → non mentionnée.
> Étymologie conforme à `_ETYMO-RACINES-50.md` + `nom_etym` : grec *arkhaios* = ancien + grec *pteryx* = aile → « l'aile ancienne ».
> Fact-check Grokipedia + Wikipedia (2026-09-05) : Archaeopteryx lithographica, calcaire de Solnhofen (Bavière, Allemagne), Jurassique supérieur. **🔒 Taxo honnête (fact-check 2026-06-15, gravée) : n'est PAS « l'ancêtre de tous les oiseaux »** — le `desc` data dit encore « ancêtre de tous les oiseaux », formulation à ne PAS reprendre dans ce script (fait signalé, non corrigé en data, hors périmètre W2). On dit « un des tout premiers oiseaux connus », formulation honnête. A des plumes de vol structurées comme un oiseau moderne, ET des dents, une longue queue osseuse, des griffes aux ailes — mélange archaïque bien documenté (11 spécimens fossiles connus). Débat scientifique réel sur sa capacité de vol actif vs planeur — traité en hypothèse.
> Prononciation : « Archéoptéryx » respellé **Ar-ké-op-té-rix** (ae→é, ch→k, y→i, x, lexique §2, déjà gravé).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> Tritri : aucune touche — Europe et Jurassique (150 Ma), bien avant le Tricératops (Crétacé final, Amérique du Nord) — aucun croisement possible.

## Archéoptéryx — Archaeopteryx lithographica

### BLOC A — Présentation

**NARRATEUR H** [excited] : Ar-ké-op-té-rix. En grec, « arkhaios » veut dire ancien, très vieux. [serious] Et « ptéryx », c'est l'aile. [curious] Alors, ça donne quoi ?
**WEX** [confident] : L'aile ancienne.
**NARRATEUR H** [happily] : Voilà. [proud] Il vivait en Europe, en Allemagne, il y a 150 millions d'années — c'est un des tout premiers oiseaux qu'on connaisse.
**WEX** [gasps] : Un oiseau qui vivait avec les dinosaures ?
**NARRATEUR H** [serious] : Exactement. [amazed] Et il n'était pas encore tout à fait un oiseau comme aujourd'hui.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 0 virgule 5 mètre de long — [quickly] comme un gros chat allongé ! Debout, il ne faisait que 0 virgule 3 mètre de haut — il t'arrivait aux genoux ! Et il pesait à peine 1 kilo — [gently] léger comme un petit oiseau.
**WEX** [curious] : Petit comme ça, il pouvait vraiment voler ?
**NARRATEUR H** [hesitant] : Les savants en débattent encore. [gently] Il avait de vraies plumes de vol, mais peut-être qu'il volait mal, ou juste sur de courtes distances.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un carnivore. [confident] Il chassait de petits insectes et de petits lézards, tout seul.
**WEX** [curious] : Il avait des dents, un oiseau ?
**NARRATEUR H** [amazed] : Oui. [pauses] C'est ça, le plus étrange : des plumes comme un oiseau, mais des dents et des griffes comme un dinosaure.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Son fossile est un des plus précieux du monde entier. [slowly] On y voit à la fois des plumes parfaitement dessinées, une longue queue osseuse, [pauses] et des dents pointues dans son bec.
**WEX** [amazed] : Moitié dinosaure, moitié oiseau.
**NARRATEUR H** [softly] : Exactement. [proud] C'est un peu le chaînon qui relie les deux mondes — un des tout premiers oiseaux, avec encore beaucoup de dinosaure en lui.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Taxo honnête : « un des premiers oiseaux » utilisé partout, JAMAIS « l'ancêtre de tous les oiseaux » (fact-check 2026-06-15 respecté malgré `desc` data non corrigée — signalé dans le rapport).
- [x] Étymologie conforme : arkhaios = ancien + pteryx = aile. Wex devine.
- [x] Chiffres = sortie exacte `_compLong(0.5)` / `_compHaut(0.3)` / `_compPoids(0.001)` — exécutées node 2026-09-05.
- [x] Pas de `vitesse_kmh` → aucune vitesse mentionnée.
- [x] Capacité de vol traitée en hypothèse débattue, pas en fait.
- [x] Respelling Ar-ké-op-té-rix appliqué.
- [x] Wex : réactions variées, aucun `!` final.
- [x] Grep interdits OK.
- [x] Tags ≤ 2 collés en tête, densité Narrateur 2-4, Wex 1-2.
