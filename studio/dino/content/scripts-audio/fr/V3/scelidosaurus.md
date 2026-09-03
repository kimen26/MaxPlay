# Scélidosaure — dialogue audio V3 (Narrateur H + Wex)

> Thyréophore basal (famille `arme`, clé technique dinos-data.js), Jurassique · 193 millions d'années · Dorset, Angleterre. Format 4 blocs A/B/C/D (5e MP3 `-recap` = concat automatique ffmpeg des 4 blocs, pas de texte à écrire).
> Chiffres data (`site/js/dinos-data.js` id `scelidosaurus`) : 4 m long · 1,2 m haut · 270 kg. Comparaisons = sortie EXACTE de `_compLong(4)` / `_compHaut(1.2)` / `_compPoids(0.27)`, vérifiées par exécution node (petite voiture · enfant de 4 ans · tigre — écarts < 10 % sauf hauteur au bord de palier, conforme au précédent archelon 1,2 m).
> Étymologie conforme au fact-check (Grokipedia + Wikipedia, 2026-08-23) : saurus (grec, lézard) + skelis — Owen voulait dire « grosses pattes » mais a écrit le mot grec qui veut dire « côte de bœuf » (erreur documentée, Steyskal 1970). harrisonii = James Harrison, le découvreur.
> Prononciation : aucun digramme piège (`th/ph/ch/y` grec) → lecture FR directe, respelling syllabé « Scé-li-do-saure » pour la TTS. Absent du lexique `i18n/lexiques-prononciation/fr.md` → à ajouter en §3 (signalé en fin de réponse).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> Vie en groupe : volontairement dite inconnue (« Mystère — personne ne le sait encore ») — aucune preuve grégaire dans les sources, honnêteté fact-check.
> Tritri : PAS de touche — Scélidosaure (Jurassique, 193 Ma) et Tricératops (Crétacé, 66 Ma) très éloignés. Portée Tritri strictement limitée : on ne force pas.

## Scélidosaure — Scelidosaurus harrisonii

### BLOC A — Présentation
**NARRATEUR H** [excited] : Scé-li-do-saure. En grec, « saure », c'est le lézard. Et « scélido », ça voulait dire « grosses pattes », parce qu'il avait des cuisses très fortes.
**WEX** [curious] : Un lézard à grosses pattes.
**NARRATEUR H** [happily] : Oui. Mais écoute ça : le savant qui l'a nommé s'est trompé de mot grec — celui qu'il a écrit veut dire « côte de bœuf ». Sans le vouloir, il l'a appelé le lézard-côte-de-bœuf.
**WEX** [curious] : Et il vivait où, le lézard-côte-de-bœuf ?
**NARRATEUR H** [serious] : En Angleterre, au bord de la mer, il y a 193 millions d'années. Et un chasseur, le Dracoraptor, rôdait dans le même coin.

### BLOC B — Taille
**NARRATEUR H** [excited] : 4 mètres de long — comme une petite voiture. Debout, aussi grand qu'un enfant de 4 ans. Et 270 kilos — aussi lourd qu'un tigre.
**WEX** [curious] : Aussi lourd qu'un tigre, pour un mangeur de plantes ?
**NARRATEUR H** [confident] : Oui. Ce poids, c'était surtout son armure d'os — et ses grosses pattes la portaient sans problème.

### BLOC C — Comment il vivait
**NARRATEUR H** [serious] : Herbivore. Il broutait des plantes basses, des fougères, à quatre pattes. Et dans sa peau, des centaines de petits os étaient plantés, rangés en lignes du cou jusqu'au bout de la queue — comme des boutons.
**WEX** [curious] : Il vivait avec des copains ?
**NARRATEUR H** [confident] : Mystère — personne ne le sait encore. Mais avec son armure, même seul, il n'avait pas peur de grand-chose.

### BLOC D — Le truc fou
**NARRATEUR H** [excited] : Le Scélidosaure est l'un des tout premiers dinosaures trouvés presque ENTIERS. Un ouvrier anglais, James Harrison, a découvert ses os dans une falaise, il y a presque 170 ans.
**WEX** [gasps] : Presque entier, dans une falaise.
**NARRATEUR H** [softly] : Oui. Et son squelette attend encore aujourd'hui dans le grand musée de Londres. On l'a nommé « harrisonii », en cadeau pour celui qui l'avait trouvé.

---

## Vérification avant livraison

- [x] 1 dino couvert, 4 blocs A/B/C/D.
- [x] Étymologie conforme au fact-check : saurus = lézard (racine déjà gravée), skelis = erreur d'Owen (« côte de bœuf » au lieu de « grosses pattes »), harrisonii = James Harrison.
- [x] Chiffres taille/poids = sortie exacte `_compLong(4)` / `_compHaut(1.2)` / `_compPoids(0.27)` (vérifié par exécution node du fichier réel).
- [x] Prononciation : pas de digramme piège → lecture directe, respelling syllabé « Scé-li-do-saure ». À ajouter au lexique §3.
- [x] Termes savants expliqués ou évités : « herbivore » clair pour 4 ans ; « thyréophore » banni à l'antenne ; Dracoraptor présenté comme « un chasseur ».
- [x] Vie en groupe dite inconnue — aucune preuve dans les sources (fact-check).
- [x] Grep interdits (`max|doudou|peluche|nounours|\bbus\b|regarde`) : 0 match sur les lignes de dialogue, cf. commande dans la réponse.
- [x] Wex ne finit jamais par `!` ni par un écho de la phrase du Narrateur.
- [x] Max 2 tags collés par réplique.
- [x] « écoute » utilisé (« écoute ça »), aucun mot de vision adressé à l'enfant.
- [x] Pas de croisement Tricératops forcé (époques très distinctes) — conforme à la portée strictement limitée de Tritri.
