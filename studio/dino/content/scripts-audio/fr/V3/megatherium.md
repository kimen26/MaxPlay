# Mégathérium — Script audio (Narrateur H + Wex)

> Mammifère (famille `mammiferes`), PAS un dinosaure — il vit APRÈS la météorite. Cénozoïque · Âge de glace · il y a 1 million d'années · Amérique du Sud.
> Chiffres data (`site/js/dinos-data.js` id `megatherium`) : 6 m long · 3,5 m haut · 4 t. Comparaisons = sortie EXACTE de `_compLong(6)` / `_compHaut(3.5)` / `_compPoids(4)`, exécutées node 2026-09-05 : `aussi long qu'une rue à deux voies est large — il barrait la route !` / `comme deux Papas l'un sur l'autre !` / `aussi lourd que 2 rhinocéros !`.
> Pas de `vitesse_kmh` dans la data → aucune vitesse chiffrée dite.
> **Point important (consigne orchestrateur)** : le champ `hauteur_m` = 3,5 m est la hauteur DEBOUT sur les pattes arrière (dressé), pas la hauteur naturelle à 4 pattes. Le champ `fait` de la data précise même « 4 mètres » dressé contre un arbre — écart mineur avec `hauteur_m` (3,5) gardé tel quel côté data (hors périmètre, signalé dans le rapport), le script dit 3,5 m (`_compHaut` exécutée sur le chiffre data) et précise bien que c'est la posture dressée.
> Étymologie conforme `_ETYMO-RACINES-50.md` : grec *megas* = grand + *thèrion* = bête → « la grande bête ».
> Fact-check (Grokipedia, 2026-09-05) : Megatherium americanum, Amérique du Sud, paresseux terrestre géant, se dressait sur ses pattes arrière pour atteindre les feuilles hautes. Cohabitation avec le Glyptodon (même continent, même lot) plausible et cohérente (tous deux Amérique du Sud, Âge de glace) — dite en hypothèse de voisinage géographique, pas de scène commune inventée.
> Prononciation : « Mé-ga-té-rioum » (règle th→t, lexique §2bis, doute levé — considéré OK sans risque réel selon le lexique).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> **Révision densité tags (2026-09-05, retour orchestrateur/Papa Yann)** : tags répartis au fil des phrases, Wex ponctué systématiquement (`?` sur les questions).

## Mégathérium — Megatherium americanum

### BLOC A — Présentation

**NARRATEUR H** [excited] : Mé-ga-té-rioum. En grec, « méga » veut dire grand, énorme. [proud] Et « térioum » veut dire la bête. La grande bête.
**WEX** [curious] : Un dinosaure géant ?
**NARRATEUR H** [happily] : Non, pas un dinosaure — [serious] il est arrivé bien après, à l'Âge de glace, [pauses] il y a 1 million d'années. C'était un paresseux géant, en Amérique du Sud.
**WEX** [gasps] : Un paresseux ?
**NARRATEUR H** [confident] : Le plus grand paresseux qui ait jamais existé — [amazed] grand comme un éléphant, pas comme celui qui dort dans son arbre.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 6 mètres de long — aussi long qu'une rue à deux voies est large — il barrait la route ! Dressé debout sur ses pattes arrière, il montait jusqu'à 3 mètres 50 de haut — [amazed] comme deux Papas l'un sur l'autre ! Et il pesait 4 mille kilos — [proud] aussi lourd que 2 rhinocéros !
**WEX** [curious] : Il se dressait pour quoi faire ?
**NARRATEUR H** [confident] : Pour attraper les feuilles tout en haut des arbres, [warmly] là où personne d'autre ne pouvait manger.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un herbivore. Il mangeait des feuilles et des branches, [gently] plutôt seul, bien tranquille.
**WEX** [curious] : Personne ne l'embêtait ?
**NARRATEUR H** [confident] : Presque personne. Sa taille énorme le protégeait toute seule — [hesitant] sauf peut-être ses tout petits, que le Smilodon aurait pu approcher.

### BLOC D — Le truc fou

**NARRATEUR H** [playful] : Pour manger, il se mettait debout sur ses pattes arrière, appuyé sur sa grosse queue, [amazed] comme sur un tabouret à trois pieds.
**WEX** [gasps] : Un tabouret à trois pieds ?
**NARRATEUR H** [amazed] : Exactement. Et ses griffes avant étaient longues comme ton avant-bras, [slowly] pour tirer les branches vers lui.

---

## Vérification avant livraison

- [x] 1 animal, 4 blocs A/B/C/D. Pas un dinosaure, vit après la météorite (dit explicitement en A).
- [x] Étymologie conforme `_ETYMO-RACINES-50.md` : megas + thèrion = « la grande bête ».
- [x] Chiffres B = sortie exacte `_compLong(6)`/`_compHaut(3.5)`/`_compPoids(4)` exécutées node ; 3,5 m explicitement dit « dressé debout » (posture, pas hauteur naturelle).
- [x] Prédateur potentiel sur les petits = Smilodon, formulé en hypothèse (« peut-être »), jamais présenté comme un vrai ennemi direct de l'adulte.
- [x] Pas de Tritri.
- [x] Bloc D neuf : image du tabouret + griffes avant-bras (aucun doublon).
- [x] Motif « Personne ne l'attaquait » ÉPUISÉ (registre) → évité, reformulé « presque personne ».
- [x] Wex sans `!`, FR standard, chaque réplique ponctuée.
- [x] Grep interdits : 0 match.
