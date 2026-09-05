# Ptéranodon — dialogue audio V3 (Narrateur H + Wex)

> Ptérosaure (famille `pterosaures`, clé technique dinos-data.js) — **PAS un dinosaure, un reptile volant**, à dire explicitement. Crétacé · 85 millions d'années · Amérique du Nord (Kansas).
> Chiffres data (`site/js/dinos-data.js` id `pteranodon`) : `taille_vol: true` → `taille_m` = envergure (6 m), dit « d'un bout de l'aile à l'autre ». `comp_taille` déjà hardcodée dans la data (pas une longueur au sol, pas de fonction générique) : « ses ailes ouvertes étaient larges comme une voiture et demie ». `_compHaut(1.8)` / `_compPoids(0.025)`, exécutées node 2026-09-05 : `aussi grand que Papa debout !` / `aussi lourd qu'un chien !`.
> Vitesse : `vitesse_kmh: 32` en data — **vitesse de VOL** (à préciser, pas de course au sol). `_compVitesse(32)` exécutée node : `aussi vite qu'un cheval au petit galop !`. Ajoutée en fin de bloc B, formulée en estimation, dite pour le vol.
> Étymologie conforme à `_ETYMO-RACINES-50.md` + `nom_etym` : grec *pteron* = aile + grec *an-* = sans + grec *odous* = dent → « l'aile sans dents ».
> Fact-check Grokipedia + Wikipedia (2026-09-05) : Pteranodon longiceps, craie de Niobrara (Kansas, Amérique du Nord). Ptérosaure — reptile volant, PAS un dinosaure (les ptérosaures forment un groupe de reptiles volants distinct des dinosaures, contemporains d'eux). Grand bec sans dents (fait distinctif du nom), crête osseuse à l'arrière du crâne (rôle débattu : gouvernail de vol ou signal visuel — traité en hypothèse). Piscivore, pêchait en vol/plongée. Mosasaurus (marin) cité comme menace potentielle dans les eaux où il pêchait — fait-checké plausible (contemporains, même mer intérieure de l'Ouest américain).
> Prononciation : « Ptéranodon » se lit bien tel quel, aucun respelling nécessaire (Pt initial marqué naturellement).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> Tritri : aucune touche — Amérique du Nord mais 85 Ma, avant le Crétacé final du Tricératops — pas contemporains.

## Ptéranodon — Pteranodon longiceps

### BLOC A — Présentation

**NARRATEUR H** [excited] : Pté-ra-no-don. En grec, « ptér » veut dire l'aile. « An », ça veut dire sans. [serious] Et « odon », c'est la dent. [curious] Alors, ça donne quoi ?
**WEX** [confident] : L'aile sans dents.
**NARRATEUR H** [happily] : Exactement, un grand bec sans une seule dent. [proud] Il vivait en Amérique du Nord, il y a 85 millions d'années.
**WEX** [gasps] : C'est un dinosaure, lui aussi ?
**NARRATEUR H** [serious] : Non, justement. [amazed] Ce n'est pas un dinosaure — c'est un reptile volant, un ptérosaure.

### BLOC B — Taille

**NARRATEUR H** [excited] : Ses ailes ouvertes faisaient 6 mètres d'un bout de l'aile à l'autre — larges comme une voiture et demie ! Mises bout à bout, ça fait [quickly] aussi long qu'une rue à deux voies est large — il barrait la route ! Debout, il faisait 1 virgule 8 mètre de haut — [proud] aussi grand que Papa debout ! Et il pesait 25 kilos — aussi lourd qu'un chien. [amazed] Et en vol, les savants pensent qu'il pouvait filer à 32 kilomètres à l'heure — aussi vite qu'un cheval au petit galop.
**WEX** [curious] : Et sa drôle de crête, [gasps] derrière la tête ?
**NARRATEUR H** [confident] : Elle l'aidait peut-être à guider son vol, [slowly] comme un gouvernail.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Il mangeait des poissons et des calmars. [confident] Il planait longtemps sans effort, puis plongeait dans la mer pour pêcher.
**WEX** [curious] : Et dans l'eau, quelque chose pouvait l'attraper ?
**NARRATEUR H** [confident] : Un grand reptile marin, le Mosasaure, [gently] chassait dans les mêmes eaux. [serious] Une fois posé sur l'eau pour pêcher, le Ptéranodon devait rester sur ses gardes.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Il vivait en colonies sur les falaises, [pauses] comme les mouettes aujourd'hui, mais géantes.
**WEX** [amazed] : Une falaise pleine de Ptéranodons.
**NARRATEUR H** [softly] : Des centaines, peut-être, [proud] tous prêts à planer d'un coup vers la mer pour pêcher.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Ptérosaure = reptile volant, PAS un dinosaure, dit explicitement en A.
- [x] `taille_vol` géré : envergure dite « d'un bout de l'aile à l'autre », comp_taille repris tel quel de la data (pas de fonction générique appliquée).
- [x] Étymologie conforme : pteron = aile + an- = sans + odous = dent. Wex devine.
- [x] Chiffres = `comp_taille` data + `_compHaut(1.8)` / `_compPoids(0.025)` — exécutées node 2026-09-05.
- [x] Vitesse `_compVitesse(32)` exécutée, précisée « en vol » (pas au sol), formulée en estimation.
- [x] Proies ≠ dangers : Mosasaurus cité comme menace potentielle dans l'eau, pas une proie inventée.
- [x] Wex : réactions variées, aucun `!` final.
- [x] Grep interdits OK.
- [x] Tags ≤ 2 collés en tête, densité Narrateur 2-4, Wex 1-2.
