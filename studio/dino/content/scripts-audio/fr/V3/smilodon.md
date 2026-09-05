# Smilodon — Script audio (Narrateur H + Wex)

> Mammifère (famille `mammiferes`), PAS un dinosaure — il vit APRÈS la météorite. Cénozoïque · Âge de glace · il y a 1 million d'années · Amérique du Nord et du Sud.
> Chiffres data (`site/js/dinos-data.js` id `smilodon`) : 1,75 m long · 1 m haut · 0,22 t. Comparaisons = sortie EXACTE de `_compLong(1.75)` / `_compHaut(1)` / `_compPoids(0.22)`, exécutées node 2026-09-05 : `comme un grand Papa allongé par terre !` / `aussi grand qu'un enfant de 4 ans !` / `aussi lourd qu'un lion !` (poids ré-audité HO-009/010 : 0,22 t, pas 0,25 t — le poids « tigre » de l'ancien script est faux, corrigé ici).
> Pas de `vitesse_kmh` dans la data → aucune vitesse chiffrée dite.
> Étymologie conforme `_ETYMO-RACINES-50.md` : grec *smilē* = couteau/lame + *odous* = dent → « la dent-couteau ».
> Fact-check (Grokipedia, 2026-09-05) : Smilodon fatalis, âge de glace, Amériques, proies bisons/chevaux sauvages/jeunes paresseux géants (cohérent avec Mégathère/Glyptodon du même lot — cohabitation continentale correcte, pas de cohabitation directe affirmée). Chasse possiblement en groupe = hypothèse (data dit « peut-être »), formulée en hypothèse. Canines ~18-20 cm, vérifié. Piège de goudron (La Brea) où des milliers de Smilodons ont été retrouvés = fait fort, vérifié.
> Prononciation : « Smilodon » se lit bien tel quel (lexique §3, aucun piège).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.
> **Révision densité tags (2026-09-05, retour orchestrateur/Papa Yann)** : tags répartis au fil des phrases, Wex ponctué systématiquement (`?` sur les questions).

## Smilodon — Smilodon fatalis

### BLOC A — Présentation

**NARRATEUR H** [excited] : Smi-lo-don. En grec, « smilo » veut dire couteau, et « odon » veut dire dent. [proud] La dent-couteau.
**WEX** [confident] : Le tigre à dents de sabre ?
**NARRATEUR H** [happily] : C'est son surnom, mais ce n'était pas un tigre — [serious] et il ne vivait pas avec les dinosaures non plus. Il est arrivé bien après, à l'Âge de glace, [pauses] il y a 1 million d'années.
**WEX** [curious] : Il vivait où ?
**NARRATEUR H** [confident] : En Amérique du Nord et du Sud, dans le froid, [warmly] aux côtés du Loup terrible.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 1 mètre 75 de long — comme un grand Papa allongé par terre ! Debout, il faisait 1 mètre de haut — [amazed] aussi grand qu'un enfant de 4 ans ! Et il pesait 220 kilos — [proud] aussi lourd qu'un lion !
**WEX** [curious] : Pas très grand, alors ?
**NARRATEUR H** [confident] : Non, mais trapu et tout en muscles. [proud] Un vrai bloc de force.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : C'était un carnivore. Il chassait les bisons, les chevaux sauvages et [amazed] les jeunes paresseux géants. [hesitant] Peut-être en groupe, comme les lions — les savants ne savent pas encore avec certitude.
**WEX** [nervous] : Qui osait l'attaquer ?
**NARRATEUR H** [warmly] : Presque personne. [confident] Avec des canines pareilles, on le laissait tranquille.

### BLOC D — Le truc fou

**NARRATEUR H** [whispers] : Ses deux canines du dessus mesuraient presque 20 centimètres — [amazed] plus longues que ta main entière.
**WEX** [gasps] : Plus longues que ma main ?
**NARRATEUR H** [amazed] : Oui. Et on en a retrouvé des milliers, coincés ensemble [slowly] dans un immense piège de goudron collant, en Amérique.

---

## Vérification avant livraison

- [x] 1 animal, 4 blocs A/B/C/D. Pas un dinosaure, vit après la météorite (dit explicitement en A).
- [x] Étymologie conforme `_ETYMO-RACINES-50.md` : smilē + odous = « la dent-couteau ».
- [x] Chiffres B = sortie exacte `_compLong(1.75)`/`_compHaut(1)`/`_compPoids(0.22)` exécutées node — poids corrigé (0,22 t, pas l'ancien 0,25 t/« tigre »).
- [x] Chasse en groupe formulée en hypothèse (« peut-être », « ne savent pas encore »).
- [x] Pas de Tritri.
- [x] Bloc D neuf : canines 20 cm + piège de goudron (aucun doublon avec A/B/C).
- [x] Wex sans `!`, FR standard, chaque réplique ponctuée.
- [x] Grep interdits : 0 match.
