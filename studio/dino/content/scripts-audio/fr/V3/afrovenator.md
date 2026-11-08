# Afrovénator — dialogue audio V3 (Narrateur H + Wex)

> Théropode mégalosauroïde gracile (famille `trex`, clé technique dinos-data.js), Jurassique · 165 millions d'années · Afrique (Niger, Sahara). Format 4 blocs A/B/C/D (5e MP3 `-recap` = concat automatique ffmpeg des 4 blocs, pas de texte à écrire).
> Chiffres data (`studio/dino/content/dinos/afrovenator.json`) : 7 m long · 1.9 m haut · 0.7 t. Comparaisons = sortie EXACTE de _compLong(7) / _compHaut(1.9) / _compPoids(0.7), exécutées node le 2026-11-08 : `comme deux voitures l'une derrière l'autre !` / `aussi haut qu'une porte !` / `aussi lourd qu'une vache !`.
> Étymologie (latin, champ `nom_etym` data) : *Afer* / afro = d'Afrique + *venator* = chasseur → « le chasseur d'Afrique ». Wex assemble la traduction. Prononciation « A-fro-vé-na-tor » = lexique `i18n/lexiques-prononciation/fr.md`.
> Fact-check (sourcé 2026-11-08, base `sources/fiches/_FACTCHECK-vague-2026-11.md` recoupée) : Grokipedia https://grokipedia.com/page/Afrovenator et Wikipédia EN https://en.wikipedia.org/wiki/Afrovenator — Niger, près d'Abaka (Ténéré), Formation de Tiourarén, Sereno et al. 1994 ; Jurassique ~165 Ma retenu (datation débattue) ; bipède gracile ~7 m, bras longs et forts, 3 doigts griffus, pattes longues ; **dessus du crâne non retrouvé** (crête éventuelle inconnue : aucune crête affirmée ni niée). Proie = HYPOTHÈSE (« sans doute les jeunes Jobaria », aucune preuve directe). 0,7 t = choix d'arrondi tracé dans le fact-check de vague (fourchette 0,45-1 t).
> Cohabitation vérifiée : Afrovénator et Jobaria = même formation, même époque. Qui il chassait (jeunes Jobaria, autres herbivores, hypothèse) ≠ qui l'attaquait (aucun rival connu, non dit comme fait).
> Anti-doublon : A = nom/lieu/époque · B = chiffres · C = proies (hypothèse) + bras griffus · D = dessus de crâne manquant (rien de A-C redit).
> Vignette attaque : bras longs et forts, trois doigts griffus « pour attraper » (1 phrase, dans C). Inédite au registre `_SCENES-VIGNETTES.md` (pas de contraste avec le T-Rex, motif déjà pris). Ligne ajoutée.
> Tritri : PAS de touche — non contemporain (165 Ma vs 66 Ma).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.

## Afrovénator — Afrovenator abakensis

### BLOC A — Présentation
**NARRATEUR H** [excited] : A-fro-vé-na-tor. [curious] Ce nom a deux morceaux, tous les deux en latin. « Afro », ça veut dire d'Afrique. [pauses] Et « venator », c'est le chasseur.
**WEX** [playful] : Le chasseur d'Afrique, donc.
**NARRATEUR H** [happily] : En entier, oui. [confident] Il vivait au Niger, il y a 165 millions d'années, [pauses] au Jurassique.

### BLOC B — Taille
**NARRATEUR H** [excited] : 7 mètres de long — comme deux voitures l'une derrière l'autre. [quickly] 1 virgule 9 mètre de haut — aussi haut qu'une porte. Et 700 kilos — [amazed] aussi lourd qu'une vache.
**WEX** [curious] : Si peu lourd, pour un chasseur ?
**NARRATEUR H** [confident] : Oui, il était mince. [proud] Un chasseur léger, avec de longues pattes.

### BLOC C — Comment il vivait
**NARRATEUR H** [serious] : Carnivore. Les Jobaria adultes, ses voisins, étaient sans doute trop gros pour lui. [confident] Mais les jeunes étaient peut-être au menu, [curious] avec d'autres herbivores.
**WEX** [curious] : Il attrapait avec quoi ?
**NARRATEUR H** [excited] : Avec ses bras. [confident] Longs et forts, avec TROIS doigts griffus, [playful] parfaits pour attraper.

### BLOC D — Le truc fou
**NARRATEUR H** [excited] : On a retrouvé son squelette dans le sable du désert, mais [curious] le dessus de sa tête manque. [whispers] Personne ne sait s'il avait une crête.
**WEX** [curious] : Alors comment on sait à quoi il ressemblait ?
**NARRATEUR H** [warmly] : Les savants comparent avec ses cousins, les chasseurs de sa famille. [softly] Et tant qu'on n'a pas la preuve, ils ne lui dessinent aucune crête.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie conforme à `nom_etym` data : Afro = d'Afrique, venator = chasseur, langue (latin) nommée ; Wex assemble « le chasseur d'Afrique ».
- [x] Chiffres taille/poids = sortie exacte `_compLong(7)` / `_compHaut(1.9)` / `_compPoids(0.7)` (exécution node 2026-11-08, bloc B mot pour mot).
- [x] Prononciation « A-fro-vé-na-tor » = lexique existant.
- [x] Proie formulée en hypothèse (« sans doute ») ; aucun herbivore présenté comme danger pour lui ; aucun rival inventé.
- [x] Aucune crête inventée : le dessus du crâne manquant est le fun fact (D), formulé comme inconnue.
- [x] Bloc D = 100 % neuf (crâne incomplet, comparaison avec les cousins).
- [x] Vignette : 1 phrase (bras longs, 3 doigts griffus), inédite au registre.
- [x] Wex : [playful] déduction du nom, [curious] ×3 dont une question utile (« comment on sait à quoi il ressemblait ? »), jamais de `!` final, aucun écho.
- [x] Grep interdits exécuté : 0 match (cf. rapport).
- [x] Pas de Tritri ; « bus » absent (échelle B = voitures/porte/vache).
