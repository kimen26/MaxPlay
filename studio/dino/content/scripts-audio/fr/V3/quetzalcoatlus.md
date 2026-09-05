# Quetzalcoatlus — dialogue audio V3 (Narrateur H + Wex)

> Ptérosaure (famille `pterosaures`, clé technique dinos-data.js) — **PAS un dinosaure, un reptile volant**, à dire explicitement. Crétacé · 68 millions d'années · Amérique du Nord.
> Chiffres data (`site/js/dinos-data.js` id `quetzalcoatlus`) : `taille_vol: true` → `taille_m` = envergure (11 m), dit « d'un bout de l'aile à l'autre ». `comp_taille` déjà hardcodée dans la data : « ses ailes ouvertes étaient larges comme un bus de Paris ». `_compHaut(5)` / `_compPoids(0.2)`, exécutées node 2026-09-05 : `presque trois Papas l'un sur l'autre !` / `aussi lourd qu'un lion !`.
> Vitesse : `vitesse_kmh: 90` en data — **vitesse de VOL** (à préciser). `_compVitesse(90)` exécutée node : `presque aussi vite qu'un guépard !`. Ajoutée en fin de bloc B, formulée en estimation, dite pour le vol.
> Étymologie conforme à `_ETYMO-RACINES-50.md` + `nom_etym` : nom aztèque *Quetzalcoatl* (dieu serpent à plumes) + suffixe latin *-us* → « le Quetzalcoatl » (nom donné au plus grand animal volant connu).
> Fact-check Grokipedia + Wikipedia (2026-09-05) : Quetzalcoatlus northropi, formation Javelina (Texas, Amérique du Nord), Crétacé final (~68-66 Ma) — **contemporain du Tricératops** (même région, même fin de Crétacé, Amérique du Nord). Un des plus grands animaux volants jamais connus, envergure ~10-11 m. Marchait aussi bien qu'il volait (quadrupède au sol, membres antérieurs robustes) — chassait probablement de petits animaux au sol plutôt qu'en pêchant, contrairement au Ptéranodon.
> Tritri : **AUTORISÉ ici** (seul de ce lot) — Amérique du Nord, Crétacé final, contemporain plausible du Tricératops. Touche légère en bloc C/D, running gag Wex, jamais de familiarité déplacée.
> Prononciation : « Quetzalcoatlus » respellé **Kèt-zal-ko-atluss** (mot aztèque, dur, lexique §2, déjà gravé).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.

## Quetzalcoatlus — Quetzalcoatlus northropi

### BLOC A — Présentation

**NARRATEUR H** [excited] : Kèt-zal-ko-atluss. Ce nom vient d'un dieu ! [serious] Quetzalcoatl, c'est le grand serpent à plumes des Aztèques, un peuple ancien du Mexique. [curious] Un sacré nom pour un sacré animal, non ?
**WEX** [amazed] : Le dinosaure du dieu serpent à plumes.
**NARRATEUR H** [serious] : Attention, [gently] ce n'est justement pas un dinosaure — c'est un reptile volant, un ptérosaure. [proud] Il vivait en Amérique du Nord, il y a 68 millions d'années.
**WEX** [gasps] : C'était l'époque de Tritri, ça ?
**NARRATEUR H** [warmly] : Oui, la toute fin du Crétacé — [amazed] le Quetzalcoatlus volait peut-être au-dessus de la tête du Tricératops.

### BLOC B — Taille

**NARRATEUR H** [excited] : Ses ailes ouvertes faisaient 11 mètres d'un bout de l'aile à l'autre — larges comme un bus de Paris ! [quickly] Mises bout à bout, aussi long qu'un bus RATP. Debout, il faisait 5 mètres de haut — [proud] presque trois Papas l'un sur l'autre ! Et il pesait 200 kilos — aussi lourd qu'un lion. [amazed] Et en vol, les savants pensent qu'il pouvait filer à 90 kilomètres à l'heure — presque aussi vite qu'un guépard.
**WEX** [gasps] : Debout comme une girafe ?
**NARRATEUR H** [proud] : Exactement. [amazed] Et pourtant, cet animal-là volait.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Contrairement à d'autres reptiles volants qui pêchaient, [confident] lui chassait plutôt au sol — de petits animaux, des insectes. [slowly] Il marchait très bien sur ses quatre pattes.
**WEX** [curious] : Et qui pouvait l'attraper, lui ?
**NARRATEUR H** [confident] : Dans les airs, personne. [warmly] Au sol, il restait prudent, [pauses] comme tout le monde à cette époque — même s'il croisait peut-être le Tricératops, dans la même région.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : C'est un des plus grands êtres volants de toute l'histoire de la Terre. [pauses] Aucun oiseau, aucune chauve-souris n'a jamais fait sa taille.
**WEX** [amazed] : Le roi du ciel.
**NARRATEUR H** [softly] : Le roi du ciel, oui — [proud] et personne, là-haut, ne venait lui disputer sa place.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Ptérosaure = reptile volant, PAS un dinosaure, dit explicitement en A.
- [x] `taille_vol` géré : envergure « d'un bout de l'aile à l'autre », comp_taille repris tel quel de la data.
- [x] Étymologie conforme : Quetzalcoatl (dieu aztèque) — origine non grec/latin correctement présentée comme telle.
- [x] Chiffres = `comp_taille` data + `_compHaut(5)` / `_compPoids(0.2)` — exécutées node 2026-09-05.
- [x] Vitesse `_compVitesse(90)` exécutée, précisée « en vol », formulée en estimation.
- [x] Tritri : seul dino du lot où c'est justifié (Crétacé final, Amérique du Nord) — touche légère, running gag respecté, jamais de familiarité déplacée.
- [x] Wex : réactions variées, aucun `!` final.
- [x] Grep interdits OK.
- [x] Tags ≤ 2 collés en tête, densité Narrateur 2-4, Wex 1-3.
