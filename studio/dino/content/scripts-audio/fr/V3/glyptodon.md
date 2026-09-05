# Glyptodon — Script audio (Narrateur H + Wex)

> Mammifère (famille `mammiferes`), PAS un dinosaure — il vit APRÈS la météorite. Cénozoïque · Âge de glace · il y a 1 million d'années · Amérique du Sud.
> Chiffres data (`site/js/dinos-data.js` id `glyptodon`) : 3 m long · 1,5 m haut · 1 t (ré-audité HO-009/010 : 3 m, pas l'ancien 3,3 m). Comparaisons = sortie EXACTE de `_compLong(3)` / `_compHaut(1.5)` / `_compPoids(1)`, exécutées node 2026-09-05 : `comme trois enfants de 4 ans allongés !` / `aussi haut qu'une voiture — il fallait lever la tête !` / `aussi lourd qu'une petite voiture !`.
> Pas de `vitesse_kmh` dans la data → aucune vitesse chiffrée dite.
> **Point important (consigne orchestrateur)** : la massue caudale n'est PAS celle du Glyptodon lui-même — c'est celle de son cousin le Doedicurus. Le script le dit correctement (« son cousin » a la massue), jamais attribuée au Glyptodon directement.
> **Vignette registre** : « carapace-voiture retournée ; cousins à massue » appartient au Glyptodon (`_SCENES-VIGNETTES.md`) — utilisée en bloc D, conforme.
> Étymologie conforme `_ETYMO-RACINES-50.md` : grec *glyptos* = sculpté/gravé + *odous* = dent → « la dent sculptée » (ses molaires ont des sillons gravés).
> Fact-check (Grokipedia, 2026-09-05) : Glyptodon, Amérique du Sud, Âge de glace, cousin géant du tatou, carapace fixe non-rétractable (contrairement au tatou qui peut se rouler). Doedicurus (cousin) = seul genre de la famille des Glyptodontidae à porter une vraie massue caudale, confirmé.
> Prononciation : « Gli-pto-don » (lexique §2/§2bis, y→i, validé Papa Yann à l'oreille 2026-07-28).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> **Révision densité tags (2026-09-05, retour orchestrateur/Papa Yann)** : tags répartis au fil des phrases, Wex ponctué systématiquement (`?` sur les questions).

## Glyptodon — Glyptodon

### BLOC A — Présentation

**NARRATEUR H** [excited] : Gli-pto-don. En grec, « glypto » veut dire sculpté, gravé. [proud] Et « don » veut dire dent. La dent sculptée.
**WEX** [curious] : Il ressemble à une tortue géante ?
**NARRATEUR H** [happily] : On dirait, mais c'était en fait un cousin du tatou ! [serious] Pas un dinosaure non plus : il vivait bien après, à l'Âge de glace, [pauses] en Amérique du Sud.
**WEX** [curious] : Avec qui, là-bas ?
**NARRATEUR H** [confident] : Avec le Mégathérium, le paresseux géant, [warmly] sur le même continent.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 3 mètres de long — comme trois enfants de 4 ans allongés ! Debout, il faisait 1 mètre 50 de haut — aussi haut qu'une voiture — [amazed] il fallait lever la tête ! Et il pesait 1 000 kilos — [proud] aussi lourd qu'une petite voiture !
**WEX** [curious] : Il pouvait rentrer dans sa carapace, comme le tatou ?
**NARRATEUR H** [confident] : Non. Sa carapace était collée à lui pour toujours, [amazed] comme un casque géant qu'il portait sans jamais l'enlever.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un herbivore. Il broutait l'herbe des plaines, [gently] plutôt seul, bien tranquille.
**WEX** [curious] : Sa carapace le protégeait de tout ?
**NARRATEUR H** [confident] : Presque de tout. Dure comme une pierre, [warmly] difficile à croquer pour n'importe quel chasseur.

### BLOC D — Le truc fou

**NARRATEUR H** [playful] : Sa carapace toute ronde ressemblait à la coque [amazed] d'une petite voiture retournée sur le dos.
**WEX** [gasps] : Une carapace-voiture ?
**NARRATEUR H** [amazed] : Exactement. Et son cousin, le Doedicurus, avait en plus une vraie massue au bout de la queue — [serious] pas le Glyptodon, lui, juste son cousin.

---

## Vérification avant livraison

- [x] 1 animal, 4 blocs A/B/C/D. Pas un dinosaure, vit après la météorite (dit explicitement en A).
- [x] Étymologie conforme `_ETYMO-RACINES-50.md` : glyptos + odous = « la dent sculptée ».
- [x] Chiffres B = sortie exacte `_compLong(3)`/`_compHaut(1.5)`/`_compPoids(1)` exécutées node — chiffre ré-audité (3 m).
- [x] Massue caudale correctement attribuée au COUSIN Doedicurus, jamais au Glyptodon lui-même.
- [x] Vignette registre respectée : carapace-voiture retournée + cousins à massue, en bloc D.
- [x] Pas de Tritri.
- [x] Wex sans `!`, FR standard, chaque réplique ponctuée.
- [x] Grep interdits : 0 match.
