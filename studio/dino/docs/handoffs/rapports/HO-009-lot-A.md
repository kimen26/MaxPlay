# HO-009 — Lot A (Théropodes) — Rapport d'audit data

**Date** : 2026-09-05 · **Lot** : A (13 dinos, priorité — gate l'audio) · **Sources** : Grokipedia (WebFetch 403 → contournement `curl -sL -A "Mozilla/5.0"`, comme prévu par le brief) pour les 13 fiches, aucun repli Wikipedia nécessaire.

**Dinos du lot** : tyrannosaurus, spinosaurus, giganotosaurus, carcharodontosaurus, allosaurus, tarbosaurus, albertosaurus, ceratosaurus, dilophosaurus, carnotaurus, cryolophosaurus, baryonyx, therizinosaurus.

**Verdict global : 8 CONFORME / 5 À CORRIGER.**

---

## Les 5 corrections les plus importantes

1. **Giganotosaurus — proie fausse (erreur de fait, pas juste une mesure)** : la data dit qu'il chassait **Argentinosaurus**. Faux — Argentinosaurus vient de la Formation Huincul, **différente et plus jeune** que la Formation Candeleros où vivait Giganotosaurus. Ils n'ont très probablement jamais cohabité. Le vrai grand sauropode contemporain (même formation, même époque) est **Andesaurus** (15-18 m). C'est l'erreur classique reprise des documentaires/jeux vidéo plutôt que de la paléontologie — la plus importante du lot car c'est une fausse cohabitation, pas juste un chiffre à ajuster.
2. **Ceratosaurus — poids sous-estimé de 29 %** : data 700 kg, source Grokipedia « ~980 kg en moyenne adulte » (fourchette réelle 420 kg à 1550 kg selon spécimen). Écart > seuil 10 %, à corriger.
3. **Giganotosaurus — hauteur surestimée de 21 %** : data 4 m, source « hauteur à l'épaule ~3.3 m ». Giganotosaurus est un carcharodontosauridé, gabarit différent d'un tyrannosauridé (hanche vs épaule) — à corriger.
4. **Allosaurus — hauteur sous-estimée de 14 %** : data 3.5 m, source « ~4 m aux hanches ». Juste au-dessus du seuil de 10 %, à corriger.
5. **Ceratosaurus — continent « Afrique » non retrouvé dans les sources** : la data mentionne région « Amérique du Nord, Afrique ». Grokipedia ne cite QUE l'Amérique du Nord (Morrison Fm) + fragments possibles au Portugal (Europe) — aucune Afrique. Possible confusion avec un autre taxon (ex. Ceratosaurus dentisulcatus référé ailleurs, ou erreur historique). Signalé pour vérification par l'orchestrateur, pas assez confiant pour trancher seul (Wikipedia non consulté sur ce point précis).

---

## Tableau par dino

| Dino | Verdict | Écarts notables |
|---|---|---|
| Tyrannosaurus | **CONFORME** | 13m/4m/8t tous dans les fourchettes sources (holotype 12.3m, Scotty 13m/8.87t, hanche 4m). |
| Spinosaurus | CORRIGER (mineur) | Taille/poids conformes (15m dans 12.6-18m ; 7t dans 6-7.4t). Voile dorsale : data dit 2m, source 1.65-1.8m — léger surestimé, correction texte suggérée (formulation « près de 2 mètres »), pas de changement de champ numérique. |
| Giganotosaurus | **CORRIGER** | Hauteur 4m → 3.3m (épaule, -21%). Proie Argentinosaurus → Andesaurus (cohabitation fausse). Taille/poids conformes. |
| Carcharodontosaurus | **CONFORME** | 13m/3.8m/7t tous dans les fourchettes (12-13.5m, hauteur non chiffrée mais cohérente, 6-8t). |
| Allosaurus | **CORRIGER** | Hauteur 3.5m → 4m aux hanches (-14%). Taille/poids conformes (9.5m dans 8-12m, 2t dans 1-2t). |
| Tarbosaurus | **CONFORME** | 12m/4.5m/5t tous dans les fourchettes (10-12m, 4.2-5.0m, 4-5t). |
| Albertosaurus | CORRIGER (mineur, pas de champ numérique) | Mesures conformes (9.5m dans 8-10m, 2t dans 1.3-2.5t). Nuance ajoutée en note : chasse en meute prouvée seulement chez les JEUNES (gisement Dry Island, aucun adulte), pas chez les adultes — data déjà prudente (« peut-être »), rien à changer dans les champs. |
| Ceratosaurus | **CORRIGER** | Poids 0.7t → ~0.9t (-29% par rapport à la moyenne 980kg). Continent « Afrique » à vérifier (source ne le confirme pas). |
| Dilophosaurus | **CONFORME** | 7m/2.4m/0.35t tous dans les fourchettes (6-7m, 300-430kg). Mythe de la « mâchoire faible » (artefact de restauration, démenti en 2020) non repris dans la data — bien. |
| Carnotaurus | **CONFORME** | 8m/2.5m/1.6t tous dans les fourchettes. Vitesse 56km/h confirmée (borne haute de 48-56km/h publié). |
| Cryolophosaurus | **CONFORME** | 6.5m/2.5m/0.4t tous dans les fourchettes (6-7m, 350-465kg). Époque 190Ma cohérente (fourchette réelle 194.6-182Ma). Description de la crête transverse fidèle. |
| Baryonyx | **CONFORME** | 9m/2.5m/1.7t tous dans les fourchettes (9-10m, 1.7-2t). Griffe 31cm et proie Iguanodon (contenu stomacal réel) confirmées. |
| Therizinosaurus | **CONFORME** | 10m/5m/5t tous dans les fourchettes (9-10m, jusqu'à 5m hanche, 5-6t). Griffes 50cm confirmées, chasseur Tarbosaurus confirmé (même formation). |

---

## Vitesse (ajout post-brief demandé par Papa Yann)

| Dino | Fourchette | Retenu | Confiance | Note |
|---|---|---|---|---|
| Tyrannosaurus | 5-11 km/h marche, pointe 20-40 km/h | 20 | moyenne | Le mythe des 80 km/h (Bakker 1970s) est corrigé par la recherche 2020s. |
| Spinosaurus | ~5 km/h terrestre, ~4.3 km/h nage | 4 | moyenne | Lent sur terre ET à la nage — pêcheur à l'affût, pas un poursuivant. |
| Giganotosaurus | ~50 km/h pointe | 50 | moyenne | Risque de fracture fémorale à haute vitesse → sprints courts probables. |
| Carcharodontosaurus | — | null | basse | Aucun chiffre publié trouvé, seulement des qualificatifs. |
| Allosaurus | 10-20 km/h marche, ~34 km/h pointe | 34 | moyenne | Modèle de robotique évolutionnaire (2020s). |
| Tarbosaurus | — | null | basse | Aucun chiffre publié dédié trouvé (malgré la proximité avec T-Rex). |
| Albertosaurus | jusqu'à 30 km/h | 30 | moyenne | Chiffre directement publié. |
| Ceratosaurus | 20-30 km/h | 25 | moyenne | Comparable aux grands oiseaux coureurs actuels. |
| Dilophosaurus | 5-10 (traces peu fiables) à 25 km/h (modèle) | 25 | moyenne | Modèle biomécanique retenu, plus robuste que les traces fossiles. |
| Carnotaurus | 48-56 km/h pointe | 52 | **haute** | Estimation la mieux étayée du lot (fémur + muscles caudaux ossifiés). |
| Cryolophosaurus | — | null | basse | Aucun chiffre publié, seulement « agile »/« cursorial ». |
| Baryonyx | 20-25 km/h terrestre | 22 | basse | Générique par gabarit, pas d'étude dédiée, pas de vitesse de nage chiffrée. |
| Therizinosaurus | 5-10 km/h | 7 | moyenne | Par comparaison avec Nothronychus (genre apparenté mieux documenté). |

---

## Points où les sources se contredisent

- **Spinosaurus, taille** : Ibrahim et al. (2014) donnent plus de 15 m ; Sereno et al. (2022) ramènent l'estimation sous 14 m avec un modèle plus terrestre. J'ai choisi **Grokipedia comme synthèse** (fourchette complète 12.6-18 m citée), conformément à la règle du brief. La data (15 m) reste dans cette fourchette large — conforme, pas de changement.
- **Ceratosaurus, poids** : très variable selon le spécimen (holotype léger 418-670 kg vs grand spécimen MWC1 930-1550 kg). J'ai retenu la valeur de synthèse du genre (« ~980 kg en moyenne adulte ») donnée en tête d'article Grokipedia plutôt qu'un extrême.
- **Tyrannosaurus, vitesse** : très débattu (mythe des 80 km/h vs consensus récent ~20 km/h). Grokipedia documente les deux versions et explique le changement de consensus — retenu la valeur récente (20 km/h).

## Ce qui n'a pas pu être vérifié

- **Hauteur aux hanches** non chiffrée précisément par Grokipedia pour : Spinosaurus, Carcharodontosaurus, Albertosaurus, Ceratosaurus, Dilophosaurus, Cryolophosaurus, Baryonyx. Pour ces 7 dinos, les valeurs de `hauteur_m` dans la data n'ont pas pu être confirmées ni infirmées par une source chiffrée — laissées telles quelles (`action: garder`) faute de preuve contraire, mais leur fiabilité reste plus faible que les autres champs. Un audit dédié (mesure du fémur/tibia par extrapolation proportionnelle depuis les articles de spécialistes, ou consultation de Paul 2016) permettrait de les confirmer plus solidement si Papa Yann le souhaite.
- **Vitesse** : aucune estimation chiffrée publiée trouvée pour Carcharodontosaurus, Tarbosaurus et Cryolophosaurus — laissé `null` plutôt que d'inventer un chiffre par analogie.
- **Ceratosaurus, continent Afrique** : je n'ai pas eu le temps de consulter Wikipedia EN en complément pour trancher cette question précise (Grokipedia ne mentionne aucune Afrique) — signalé comme point ouvert, pas tranché unilatéralement.
- **Baryonyx, vitesse de nage** : aucune étude biomécanique dédiée trouvée (contrairement à Spinosaurus) — seule une estimation terrestre générique par gabarit est disponible.

---

## Porte de vérification (sortie brute)

```
$ node -e "const j=require('./studio/dino/docs/handoffs/rapports/HO-009-lot-A.json'); console.log(j.dinos.length, 'dinos', j.dinos.filter(d=>d.verdict==='CORRIGER').length, 'a corriger')"
13 dinos 5 a corriger
```

Count conforme au lot (13 dinos). Chaque `propose` non nul porte une `source` non vide (vérifié par script Node lors de la construction du JSON).
