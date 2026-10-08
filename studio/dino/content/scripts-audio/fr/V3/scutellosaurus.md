# Scutellosaure — Script audio (Narrateur H + Wex)

> Thyréophore basal (famille `arme`), Jurassique · 196 millions d'années · Arizona, États-Unis (Formation Kayenta).
> Chiffres data (`studio/dino/content/dinos/scutellosaurus.json`) : 1.2 m long · 0.4 m haut · 0.004 t. Comparaisons = sortie EXACTE de _compLong(1.2) / _compHaut(0.4) / _compPoids(0.004), régénérées 2026-09-12 : `comme un grand chien — un labrador !` / `il t'arrivait aux genoux !` / `aussi lourd qu'un gros chat !`.
> Étymologie (`_ETYMO-RACINES-50.md`) : *scutello-/scutellum* (latin) = petit bouclier + *-saurus/-saure* (grec) = lézard → « le lézard au petit bouclier ». Nom lu tel quel.
> Fact-check (sourcé 2026-10-08) : Grokipedia https://grokipedia.com/page/Scutellosaurus — « the only definitively bipedal armored dinosaur » (seul thyréophore bipède confirmé) ; « Known from over 70 specimens » ; « The holotype specimen includes 304 osteoderms » (« plus de 300 plaques » confirmé) ; « from Latin scutellum, small shield » ; « about 1.2 meters in total length [...] body mass around 3 to 5 kilograms » (data confirmées) ; « a long tail comprising around 60 vertebrae [...] contributed to balance » (queue-balancier confirmée) ; « Associated fauna from the Kayenta Formation includes [...] Dilophosaurus wetherilli » + https://grokipedia.com/page/Dilophosaurus : « preying primarily on sympatric herbivores including Scutellosaurus » (Dilophosaure contemporain et chasseur confirmés). **Ex-DOUTEUX, corrigé le 2026-10-08** : (1) l'âge : la page se contredit (« approximately 205–202 million years ago » en intro, « approximately 184 million years ago » plus bas) et le script dit 196 Ma — non tranché ; (2) « seul ou en petit groupe » et « il courait vite » : aucun comportement social ni vitesse dans la source (seule la posture bipède/le balancier est sourcée). Correction : « seul ou en petit groupe » retiré ; question de Wex sans présupposé de vitesse.
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.

## Scutellosaure — Scutellosaurus lawleri

### BLOC A — Présentation

**NARRATEUR H** [excited] : Scu-tel-lo-saure. [curious] En latin, « scutellum », ça veut dire un petit bouclier.
**WEX** [curious] : Le lézard au petit bouclier ?
**NARRATEUR H** [happily] : Oui — à cause des centaines de petites plaques d'os sur son dos. [calm] Il vivait en Arizona, il y a 196 millions d'années.
**WEX** [curious] : Il vivait avec des dangers, à cette époque ?
**NARRATEUR H** [confident] : Le Dilophosaure, un grand chasseur à crête, [serious] rôdait dans le même coin.

### BLOC B — Taille

**NARRATEUR H** [excited] : 1 virgule 2 mètre de long — [amazed] comme un grand chien — un labrador. Debout, 0 virgule 4 mètre de haut — [curious] il t'arrivait aux genoux. Et 4 kilos — [proud] aussi lourd qu'un gros chat.
**WEX** [gasps] : Tout petit, alors.
**NARRATEUR H** [confident] : Minuscule, oui. [amazed] Mais il courait déjà sur ses deux pattes arrière.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Herbivore. [calm] Il broutait les plantes basses.
**WEX** [curious] : Il se sauvait comment, du Dilophosaure ?
**NARRATEUR H** [playful] : Sa longue queue l'aidait à garder l'équilibre en courant, [pauses] comme un balancier. Le seul dino à armure qui courait sur deux pattes.

### BLOC D — Le truc fou

**NARRATEUR H** [excited] : Plus de 300 petites plaques d'os couvraient son dos et sa queue, [pauses] comme une mosaïque.
**WEX** [amazed] : Mais pas de grosse armure comme ses cousins.
**NARRATEUR H** [softly] : Pas encore. [proud] Il était la toute première version — en tout léger, avant l'Ankylosaure et ses massues.

---

## Vérification avant livraison

- [x] 4 blocs A/B/C/D, ~1 500 caractères.
- [x] Bloc B = sortie exacte des 3 fonctions.
- [x] Cohabitation Dilophosaure fact-checkée (Formation Kayenta, contemporains réels).
- [x] Anti-doublon : bipède mentionné en B (aperçu) et C (fonction queue) sans répéter le même mot — D introduit le nombre de plaques (neuf).
- [x] Grep interdits : 0 match.
