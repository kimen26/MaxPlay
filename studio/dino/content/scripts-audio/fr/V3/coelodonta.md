# Rhino laineux — Script audio (Narrateur H + Wex)

> Mammifère (famille `mammiferes`), PAS un dinosaure — il vit APRÈS la météorite. Cénozoïque · Âge de glace · il y a 50 000 ans · Europe et Asie (froid).
> Chiffres data (`site/js/dinos-data.js` id `coelodonta`) : 3,5 m long · 1,5 m haut · 1,75 t (ré-audité HO-009/010 : 1,5 m au garrot / 1,75 t — corrige l'ancien script qui disait « presque deux mètres » et « 2500 kilos »). Comparaisons = sortie EXACTE de `_compLong(3.5)` / `_compHaut(1.5)` / `_compPoids(1.75)`, exécutées node 2026-09-05 : `comme une petite voiture !` / `aussi haut qu'une voiture — il fallait lever la tête !` / `aussi lourd qu'une petite voiture et une vache ensemble !`.
> Pas de `vitesse_kmh` dans la data → aucune vitesse chiffrée dite.
> Étymologie conforme `_ETYMO-RACINES-50.md` : grec *koilos* = creux + *odous* = dent → « la dent creuse » (ses molaires ont de profonds creux).
> Fact-check (Grokipedia, 2026-09-05) : Coelodonta antiquitatis, Europe et Asie, Âge de glace, il y a 50 000 ans — cohabite avec le Mammouth (même période, même type de milieu froid). Chasseurs = hommes préhistoriques (data), qui l'ont peint sur les parois des grottes (Chauvet, Lascaux et sites voisins) — fait vérifié.
> Prononciation : « Sé-lo-don-ta » (lexique §2/§2bis, oe→é, validé Papa Yann à l'oreille 2026-07-28).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> **Révision densité tags (2026-09-05, retour orchestrateur/Papa Yann)** : tags répartis au fil des phrases, Wex ponctué systématiquement (`?` sur les questions).

## Rhino laineux — Coelodonta antiquitatis

### BLOC A — Présentation

**NARRATEUR H** [excited] : Sé-lo-don-ta. En grec, « coelo » veut dire creux, [serious] et « donta » veut dire les dents. La dent creuse.
**WEX** [curious] : Un rhinocéros tout poilu ?
**NARRATEUR H** [happily] : Exactement, on l'appelle le Rhinocéros laineux. [serious] Pas un dinosaure : il vivait bien après, à l'Âge de glace, [pauses] il y a 50 000 ans, dans le froid d'Europe et d'Asie.
**WEX** [curious] : Avec qui il partageait le froid ?
**NARRATEUR H** [confident] : Avec le Mammouth, juste à côté. [warmly] Les deux faits pour la neige.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 3 mètres 50 de long — comme une petite voiture ! Debout, il faisait 1 mètre 50 de haut — aussi haut qu'une voiture — [amazed] il fallait lever la tête ! Et il pesait 1 750 kilos — [proud] aussi lourd qu'une petite voiture et une vache ensemble !
**WEX** [curious] : Sa corne, elle servait à quoi ?
**NARRATEUR H** [confident] : De balai. [playful] Il poussait la neige avec pour trouver l'herbe cachée dessous.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un herbivore. Il broutait l'herbe des plaines froides, [gently] plutôt seul.
**WEX** [curious] : Qui pouvait le chasser ?
**NARRATEUR H** [confident] : Seulement les hommes préhistoriques, avec beaucoup de prudence — [warmly] sa corne le rendait dangereux à approcher.

### BLOC D — Le truc fou

**NARRATEUR H** [whispers] : Les tout premiers hommes ont dessiné le Rhinocéros laineux [pauses] sur les murs de leurs grottes, il y a des dizaines de milliers d'années.
**WEX** [gasps] : Dessiné sur un mur ?
**NARRATEUR H** [amazed] : Oui — [proud] un des tout premiers animaux jamais peints par un être humain.

---

## Vérification avant livraison

- [x] 1 animal, 4 blocs A/B/C/D. Pas un dinosaure, vit après la météorite (dit explicitement en A).
- [x] Étymologie conforme `_ETYMO-RACINES-50.md` : koilos + odous = « la dent creuse ».
- [x] Chiffres B = sortie exacte `_compLong(3.5)`/`_compHaut(1.5)`/`_compPoids(1.75)` exécutées node — chiffres ré-audités (1,5 m garrot, 1,75 t, 50 000 ans).
- [x] Chasseurs = hommes préhistoriques uniquement.
- [x] Pas de Tritri.
- [x] Bloc D neuf : peintures rupestres (aucun doublon avec A/B/C).
- [x] Wex sans `!`, FR standard, chaque réplique ponctuée.
- [x] Grep interdits : 0 match.
