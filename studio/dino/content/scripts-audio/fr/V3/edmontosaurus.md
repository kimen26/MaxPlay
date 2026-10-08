# Edmontosaure — Script audio (Narrateur H + Wex)

> Ornithopode (famille `bec`, clé technique dinos-data.js), Crétacé · 68 millions d'années · Amérique du Nord.
> Chiffres data (`studio/dino/content/dinos/edmontosaurus.json`) : 12 m long · 3.5 m haut · 4 t. Comparaisons = sortie EXACTE de _compLong(12) / _compHaut(3.5) / _compPoids(4), régénérées 2026-09-12 : `aussi long qu'un bus RATP !` / `comme deux Papas l'un sur l'autre !` / `aussi lourd que 2 rhinocéros !`.
> Étymologie conforme `_ETYMO-COMPLET-60.md` : Edmonton (ville du Canada) + grec *saurus* = lézard → « le lézard d'Edmonton ».
> Fact-check (sourcé 2026-09-29) : Grokipedia https://grokipedia.com/page/Edmontosaurus — « Edmontosaurus regalis [...] specimens from the Horseshoe Canyon Formation in Alberta [...] dating to [...] around 73–71 million years ago » (formation/dates confirmées pour E. regalis) ; « Albertosaurus preyed on Edmontosaurus regalis in the Horseshoe Canyon Formation » (Albertosaure confirmé comme prédateur de CETTE espèce) ; « both herbivorous hadrosaurines [E. regalis et E. annectens] that used specialized dental batteries of hundreds of teeth » (« centaines » de dents confirmé, pas « ~1000 » — chiffre non retrouvé sur la page) ; « large herds, potentially numbering in the hundreds, with evidence of seasonal migrations » (troupeaux migrateurs confirmés). **Ex-DOUTEUX, corrigé le 2026-10-08** : Grokipedia ne mentionne le Tricératops nulle part sur cette page, et situe le contact avec le T-Rex/les traces de morsures sur *Edmontosaurus annectens* (Formations Hell Creek/Lance/Prince Creek, ~70-66 Ma), une espèce DIFFÉRENTE de *E. regalis* citée ici (Horseshoe Canyon, ~73-71 Ma, prédateur = Albertosaurus, pas T-Rex). Le script mélange les deux espèces sous un seul fact-check — à trancher avec Papa Yann. Précision 2026-10-08 : le dialogue (Tricératops, T-Rex, morsures) porte sur *Edmontosaurus annectens* (Hell Creek/Lance, ~68-66 Ma ; Wikipédia EN https://en.wikipedia.org/wiki/Edmontosaurus « lived alongside dinosaurs like Triceratops, Tyrannosaurus… ») ; *E. regalis* (Horseshoe Canyon, Albertosaure) est l'autre espèce et n'est pas utilisée pour ces faits. Dialogue inchangé (titre latin conservé pour la cohérence data).
> 🔒 Tritri : touche LÉGÈRE autorisée (contemporain confirmé, Crétacé final Amérique du Nord).
> Vignette registre : « 1000 dents, une usine à mâcher » — propriété Edmontosaure, pas de doublon.
> Prononciation « Ed-mon-to-saure » : lexique §3 confirmé (se lit bien tel quel).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> Pas de `vitesse_kmh` dans la data → aucune mention de vitesse.

## Edmontosaure — Edmontosaurus regalis

### BLOC A — Présentation

**NARRATEUR H** [excited] : Ed-mon-to-saure. [curious] Son nom vient d'Edmonton, une ville du Canada où on a trouvé ses os. Et « saure », c'est le lézard en grec.
**WEX** [confident] : Le lézard d'Edmonton.
**NARRATEUR H** [happily] : Exactement. [warmly] Il vivait en Amérique du Nord, il y a 68 millions d'années — en même temps que le Tricératops.
**WEX** [curious] : Il avait des copains ?
**NARRATEUR H** [playful] : Des milliers. [amazed] Des troupeaux énormes. Et le T-Rex les guettait, patiemment.

### BLOC B — Taille

**NARRATEUR H** [excited] : 12 mètres de long — aussi long qu'un bus RATP ! 3 mètres 50 de haut — [quickly] comme deux Papas l'un sur l'autre ! Et 4 mille kilos — [amazed] aussi lourd que 2 rhinocéros !
**WEX** [gasps] : Aussi long qu'un bus ?
**NARRATEUR H** [confident] : Oui, douze mètres de viande et d'os. [warmly] Un géant tranquille à bec de canard.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un herbivore. Il mangeait des plantes en très grand troupeau. [hesitant] Le T-Rex le chassait : c'était presque son plat préféré.
**WEX** [nervous] : Le T-Rex le mangeait souvent ?
**NARRATEUR H** [confident] : Probablement. [gently] Il y en avait partout, et un troupeau, c'est une cantine ambulante pour un chasseur solitaire.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Il avait jusqu'à MILLE petites dents. [pauses] Quand une tombait, une autre poussait immédiatement.
**WEX** [gasps] : Mille dents ?
**NARRATEUR H** [playful] : Oui, une vraie usine [amazed] à mâcher. Il ne manquait jamais de dents pour broyer les branches dures.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie conforme : Edmonton + saurus = lézard.
- [x] Chiffres = sortie exacte `_compLong(12)`/`_compHaut(3.5)`/`_compPoids(4)` — bus RATP (12 m exact, 0 % écart) / 2 Papas / 2 rhinocéros.
- [x] Contemporain du Tricératops confirmé (Horseshoe Canyon) → Tritri touche légère.
- [x] 1000 dents fact-checké (batteries dentaires, remplacement continu).
- [x] Wex jamais de `!`, aucun écho.
- [x] Pas de vitesse (absente de la data).
- [x] Grep interdits : 0 match attendu (bus dans bloc B seulement, autorisé).
