# Directive — Réécriture Bloc A des 50 dinos : mécanique RACINES (EP-039)

Papa Yann veut que le Bloc A (Présentation) explique le nom **morceau par morceau** puis le **recompose**, façon petit savant. Source des racines VÉRIFIÉE : `game/docs/jeux/dino-encyclopedie/_ETYMO-RACINES-50.md` (à utiliser VERBATIM pour les racines — ne JAMAIS inventer une racine).

## Structure imposée du NOUVEAU Bloc A (boucle fermée)

3 répliques (Narrateur → Wex → Narrateur), schéma type :

```
**NARRATEUR H** [excited] : Le <Nom> ! Écoute bien son nom. « <racine1> », ça veut dire <sens1>. Et « <racine2> », ça veut dire <sens2> ! Alors « <Nom> »...
**WEX** [curious] : ...ça veut dire « <recomposition> » ?!
**NARRATEUR H** [happily] : EXACTEMENT ! Tu as trouvé tout seul, comme un vrai petit savant ! <+ 1 phrase : où/quand il vivait, courte>
```

Variantes autorisées (pour ne pas être 50× identique) :
- Si 3 racines : Narrateur en donne 2-3, Wex recompose.
- Si nom = lieu/personne (ex Albertosaurus = Alberta, Utahraptor = Utah) : « <Lieu>, c'est un endroit <où> » + « -saurus, ça veut dire lézard » → Wex recompose « le lézard de <Lieu> ! ».
- Wex peut parfois deviner FAUX une racine de façon mignonne et le Narrateur corrige gentiment (1 dino sur 4 max, pas systématique) — reste une boucle fermée.
- Le « comme un petit savant » : varier (« comme un vrai paléontologue ! », « tu parles déjà grec ancien ! », « bravo le savant ! ») — ne pas répéter mot pour mot.

## Règles FIGÉES (rappel — ne pas violer)
- Racines = VERBATIM depuis `_ETYMO-RACINES-50.md`. Dire la langue (grec/latin) simplement (« en grec ancien », « en latin »).
- Garder le nom scientifique complet quelque part dans le Bloc A (ex « son grand nom de savant, c'est Triceratops horridus »).
- Tritri : pour le Tricératops, garder « ton ami Tritri » (surnom affectueux, dino préféré de Max).
- Tags v3 uniquement : [excited][curious][happily][gasps][serious][confident][chuckles][softly][playful]. Emphase = MAJUSCULES.
- Narrateur H `cbRcktt2xvoeFpdvW2wg`, Wex `G54e8CyYslC2Y4ZupTlg`. Wex en FR standard.
- NE TOUCHER QUE le Bloc A. Les Blocs B (verbatim canonique), C, D restent EXACTEMENT inchangés.
- Format ligne strict : `**NARRATEUR H** [tag] : texte` / `**WEX** [tag] : texte`. Garder `### BLOC A — Présentation` comme entête.

## Cas nom_etym faux (info — ne pas bloquer dessus, suivre _ETYMO-RACINES-50.md qui est corrigé)
spinosaurus (mixte), iguanodon (iguana ≠ grec), microraptor (mixte), gallimimus (mixte), amargasaurus (+saurus). La table étymo a déjà la bonne version → l'utiliser.
