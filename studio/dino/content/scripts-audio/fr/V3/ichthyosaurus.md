# Ichtyosaure — Script audio (Narrateur H + Wex)

> Énaliosaure (reptile marin en forme de dauphin, famille `enaliosaures`), Jurassique · 190 millions d'années · Europe (mers peu profondes).
> Chiffres data (`site/js/dinos-data.js` id `ichthyosaurus`) : 2 m long · 0,5 m haut · 0,15 t (< 1 t → « 150 kilos »). Comparaisons = sortie EXACTE de `_compLong(2)` / `_compHaut(0.5)` / `_compPoids(0.15)`, exécutées node 2026-09-05 : `aussi long qu'une moto !` / `il t'arrivait aux fesses !` / `aussi lourd qu'un âne !`.
> Étymologie conforme à `nom_etym` + `_ETYMO-RACINES-50.md` : grec *ikhthus* = poisson + *sauros* = lézard → « le lézard-poisson ».
> Fact-check (Grokipedia, 2026-09-05) : Ichthyosaurus communis, mers peu profondes d'Europe au Jurassique (~190 Ma). Forme de dauphin (convergence évolutive). Naissait vivant dans l'eau, pas d'œufs. Nageoires = doigts palmés modifiés. **Point corrigé HO-009/010** : prédateurs = les grands pliosaures DE SON ÉPOQUE, comme le Rhomaleosaurus (Jurassique inférieur, contemporain plausible) — le Liopleurodon a été retiré : il vivait environ 30 à 40 millions d'années plus tard (Jurassique moyen, ~165 Ma), anachronisme.
> Prononciation : « Ik-ti-o-saure » pour la forme latine dite dans l'étymologie (lexique §2, VALIDÉ Papa Yann à l'oreille 2026-07-28) ; le nom d'usage « Ichtyosaure » se lit bien tel quel (lexique §3). « Rhomaleosaurus » à respeller — pas encore au lexique, ajouté en append : « Ro-ma-lé-o-saure » (forme FR en -saure).
> Grep-interdits OK. Wex FR standard, aucun tic écrit, jamais de `!` final.

## Ichtyosaure — Ichthyosaurus communis

### BLOC A — Présentation

**NARRATEUR H** [curious] : Ik-ti-o-saure. « Ikhthus », en grec, ça veut dire poisson. [serious] Et « saure », le lézard.
**WEX** [confident] : Le lézard-poisson ?
**NARRATEUR H** [happily] : Voilà. Il vivait il y a 190 millions d'années, [amazed] dans les mers peu profondes d'Europe.
**WEX** [curious] : Un lézard qui ressemble à un poisson, ça existe vraiment ?
**NARRATEUR H** [confident] : Ça existait, oui — mais ce n'était pas un poisson du tout. [serious] C'était un vrai reptile, qui avait pris cette forme pour bien nager.

### BLOC B — Taille

**NARRATEUR H** [excited] : Il mesurait 2 mètres de long — aussi long qu'une moto ! [amazed] Debout, il faisait 0 virgule 5 mètre de haut — il t'arrivait aux fesses ! Et il pesait 150 kilos — [serious] aussi lourd qu'un âne !
**WEX** [playful] : Aussi lourd qu'un âne, mais avec des nageoires ?
**NARRATEUR H** [chuckles] : Avec des nageoires, oui — [confident] faites de doigts, comme une grande main plate.

### BLOC C — Comment il vivait

**NARRATEUR H** [serious] : Il chassait les poissons et les calmars, en groupe, un peu comme des dauphins aujourd'hui. [confident] Mais dans sa mer, il y avait plus fort que lui.
**WEX** [scared] : Quoi ?
**NARRATEUR H** [gently] : Les grands pliosaures de son époque, comme le Ro-ma-lé-o-saure. [warmly] Face à eux, l'Ichtyosaure devait rester prudent.

### BLOC D — Le truc fou

**NARRATEUR H** [whispers] : Il ne pondait pas d'œufs sur la terre. [amazed] Il faisait naître ses bébés vivants, directement dans l'eau — [serious] comme les baleines et les dauphins aujourd'hui.
**WEX** [gasps] : Il ne sortait jamais de l'eau, alors ?
**NARRATEUR H** [softly] : Jamais. Toute sa vie, [warmly] du premier au dernier jour, dans la mer.

---

## Vérification avant livraison

- [x] 1 dino, 4 blocs A/B/C/D.
- [x] Étymologie conforme (`nom_etym`) : poisson + lézard.
- [x] Chiffres = sortie exacte `_compLong(2)`/`_compHaut(0.5)`/`_compPoids(0.15)` exécutées node 2026-09-05 ; poids < 1 t dit en kilos.
- [x] Prédateur corrigé : Rhomaleosaurus (contemporain), PAS Liopleurodon (anachronisme retiré, HO-009/010).
- [x] Inquiétude Wex ([scared]) suivie d'une réponse [gently] du Narrateur qui rassure par le vrai (règle doctrine tags).
- [x] Bloc D 100 % neuf (naissance vivante dans l'eau), aucun doublon avec A/B/C.
- [x] On écoute : 0 « regarde ». Grep interdits : 0 match.
- [x] Wex jamais de `!`, questions variées.
- [x] Tags conformes doctrine.

## Ajout lexique

- Lexique `fr.md` : ajouter « Rhomaleosaurus | **Ro-ma-lé-o-saure** | forme FR en -saure, aucun autre piège — ajouté 2026-09-05 (ichthyosaurus.md) ».
