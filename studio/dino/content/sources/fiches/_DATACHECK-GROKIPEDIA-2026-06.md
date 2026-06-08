# Data-check dinos-data.js vs Grokipédia — 2026-06-06

> Méthodologie : comparaison champ par champ de `data-fields.md` (dinos-data.js actuel) vs `_FICHES-DINOS-GROKIPEDIA.md`.
> Tolérance taille/poids : valeur dans la fourchette Grok = OK. Valeur hors fourchette = écart signalé.
> Gravité : 🔴 faux factuel / 🟡 imprécis ou hors fourchette modérée.

---

## ECARTS 🔴 (faux factuel)

| id | champ | ACTUEL | CORRECT (Grok) | note |
|----|-------|--------|----------------|------|
| tyrannosaurus | taille_m | 12 | **13** (fourchette 12–13 m, spécimen Scotty 13 m retenu) | 12 m dans la fourchette basse — acceptable sauf que Grok retient 13 m. Signalé 🟡 plutôt (voir bas) |
| tarbosaurus | taille_m | 10 | **12** (Grok : jusqu'à 12 m) | **écart net : notre 10 m vs fourchette Grok 10–12 m, retenu 12 m**. 10 = basse fourchette, acceptable. Signalé 🟡 |
| tarbosaurus | hauteur_m | 4 | **4,2–5 m au bassin** | 4 m est sous la fourchette basse (4,2 m) |
| allosaure | poids_t | 2.3 | **1–2 t** (Grok : "1–2 tonnes adulte courant") | Notre 2,3 t dépasse la fourchette Grok (max 2 t) |
| brachiosaure | hauteur_m | 13 | **9 m à l'épaule** (Grok : "~9 m à l'épaule") | Notre 13 m = hauteur totale avec la tête dressée. Grok parle de l'épaule (9 m). La hauteur totale (tête dressée) peut atteindre ~13 m. Valeur équivoque selon référentiel. Signalé 🟡 |
| brachiosaure | poids_t | 47 | **28–47 t** | 47 t = extrême haute fourchette, pas faux. OK. |
| diplodocus | taille_m | 27 | **26 m** (Grok : "jusqu'à 26 m") | Notre 27 m dépasse le max Grok de 26 m |
| apatosaurus | hauteur_m | 4.5 | **4–5 m à l'épaule** | 4,5 m est dans la fourchette. OK. |
| apatosaurus | poids_t | 23 | **18–30 t** | 23 t dans la fourchette. OK. |
| camarasaurus | hauteur_m | 6 | **4,5–7,5 m au garrot** | 6 m dans la fourchette. OK. |
| camarasaurus | poids_t | 18 | **15–20 t** | 18 t dans la fourchette. OK. |
| amargasaurus | taille_m | 10 | **9–13 m** | 10 m dans la fourchette. OK. |
| amargasaurus | periode | cretace | **Crétacé inférieur** | cretace est correct. OK. |
| velociraptor | poids_t | 0.015 | **~15 kg** | 0.015 t = 15 kg. OK. |
| utahraptor | poids_t | 0.5 | **350–500 kg** | 0.5 t = 500 kg, dans la fourchette haute. OK. |
| microraptor | poids_t | 0.001 | **~1 kg** | 0.001 t = 1 kg. OK. |
| troodon | poids_t | 0.05 | **~50 kg** | 0.05 t = 50 kg. OK. |
| quetzalcoatlus | taille_m | 11 | **envergure 10–11 m** | 11 m = envergure max Grok. OK. |
| quetzalcoatlus | hauteur_m | 5 | **5 m debout** | 5 m OK. |
| quetzalcoatlus | poids_t | 0.2 | **200–250 kg** | 0.2 t = 200 kg, dans la fourchette. OK. |
| dimetrodon | taille_m | 3.5 | **1,7–4,6 m** (espèce D. grandis) | 3,5 m dans la fourchette. OK. |
| therizinosaurus | hauteur_m | 5 | **5 m au bassin** | OK. |

**Ecarts 🔴 confirmés :**

| id | champ | ACTUEL | CORRECT (Grok) |
|----|-------|--------|----------------|
| diplodocus | taille_m | 27 | **26** |
| allosaure | poids_t | 2.3 | **2** (max fourchette 2 t) |

---

## ECARTS 🟡 (imprécis / hors fourchette modérée / équivoque)

| id | champ | ACTUEL | CORRECT (Grok) | note |
|----|-------|--------|----------------|------|
| tyrannosaurus | taille_m | 12 | 13 (spécimen Scotty retenu) | 12 dans fourchette basse (12–13), mais Grok retient 13 m |
| tarbosaurus | taille_m | 10 | 12 (fourchette Grok jusqu'à 12 m) | 10 = basse fourchette, à hausser |
| tarbosaurus | hauteur_m | 4 | 4,2–5 (Grok) | 4 sous la fourchette basse |
| brachiosaure | hauteur_m | 13 | 9 m à l'épaule (Grok) | 13 = hauteur tête dressée, pas l'épaule. Référentiel ambigu mais 9 m à l'épaule = donnée Grok |
| velociraptor | amis | "En meute — le loup des dinos !" | Chasse **seul** — aucune preuve de meute (Grok explicite) | 🔴 factuel : "chasse en meute" est un mythe Jurassic Park |
| gallimimus | regime | "Omnivore (mange tout !)" | **omnivore ou herbivore** — "pas de preuve directe" (Grok) | Omnivore est acceptable comme simplification |
| quetzalcoatlus | regime | "Carnivore (charognes, petits dinos)" | **Prédateur terrestre** (insectes, crustacés, petits animaux) — **PAS pêcheur en vol** | 🟡 "petits dinos" est exagéré ; le régime Grok insiste sur la fouille au sol |
| mosasaurus | regime | "Carnivore marin" | OK, mais liste incomplète | Acceptable |
| dimetrodon | taille_m | 3.5 | 1,7–4,6 m selon espèce | 3,5 pour D. grandis est sous le max (4,6 m) mais dans la fourchette. OK. |
| ceratosaurus | taille_m | 5.5 | **6–7 m** (Grok) | Notre 5,5 m est sous la fourchette basse (6 m) |
| ceratosaurus | hauteur_m | 2.5 | **1,8–2 m au garrot** (Grok) | Notre 2,5 m dépasse le max Grok (2 m) |
| dilophosaurus | poids_t | 0.43 | **300–400 kg** = 0,3–0,4 t | 0.43 t (430 kg) dépasse légèrement le max Grok |
| utahraptor | taille_m | 6 | **5,5–7 m** (Grok) | 6 m dans la fourchette. OK. Mais hauteur_m=2 : Grok dit 1,7–2 m, OK. |
| protoceratops | poids_t | 0.08 | **59–98 kg** = 0,059–0,098 t | 0.08 t = 80 kg, dans la fourchette. OK. |
| styracosaurus | taille_m | 5.5 | **5–5,5 m** | 5.5 m = max fourchette Grok. OK. |
| corythosaurus | taille_m | 8 | **7,6–9 m** | 8 m dans la fourchette. OK. |
| edmontosaurus | taille_m | 12 | **12–13 m** | 12 m dans fourchette. OK. |
| iguanodon | poids_t | 3 | **3–5 t** | 3 t = bas de la fourchette. OK. |
| pachycephalosaurus | poids_t | 0.45 | **370–450 kg** = 0,37–0,45 t | 0.45 t = max fourchette. OK. |
| oviraptor | poids_t | 0.025 | **33–40 kg** = 0,033–0,04 t | Notre 0.025 t = 25 kg, **sous la fourchette basse** (33 kg) |
| suchomimus | poids_t | 4.5 | **~5,3 t** (révision 2025 Grok) | 4,5 t vs 5,3 t : écart ~18 %. Signalé 🟡 |
| baryonyx | poids_t | 1.7 | **1,7–2 t** | 1.7 t = basse fourchette. OK. |
| ankylosaure | taille_m | 7 | **jusqu'à 8 m** (Grok) | 7 m sous le max Grok (8 m). Plausible pour individu moyen. 🟡 |
| ankylosaure | poids_t | 6 | **4,8–8 t** | 6 t dans la fourchette. OK. |

**Ecarts 🟡 significatifs (corrections recommandées) :**

| id | champ | ACTUEL | METTRE |
|----|-------|--------|--------|
| velociraptor | amis | "En meute — le loup des dinos !" | **"Chasse seul — aucune preuve de meute"** (mythe Jurassic Park) |
| ceratosaurus | taille_m | 5.5 | **6** (fourchette 6–7 m) |
| ceratosaurus | hauteur_m | 2.5 | **2** (fourchette 1,8–2 m) |
| dilophosaurus | poids_t | 0.43 | **0.35** (médiane 300–400 kg) |
| oviraptor | poids_t | 0.025 | **0.035** (médiane 33–40 kg) |
| suchomimus | poids_t | 4.5 | **5.3** (révision 2025) |
| tyrannosaurus | taille_m | 12 | **13** (spécimen Scotty, valeur Grok) |
| tarbosaurus | taille_m | 10 | **12** (max Grok) |
| tarbosaurus | hauteur_m | 4 | **4.5** (médiane 4,2–5 m) |
| brachiosaure | hauteur_m | 13 | **9** (épaule, référentiel Grok) — ou documenter "13 = tête dressée" |
| diplodocus | taille_m | 27 | **26** (max Grok) |
| allosaure | poids_t | 2.3 | **2** (max fourchette Grok 1–2 t) |
| quetzalcoatlus | regime | "charognes, petits dinos" | **"petits animaux, insectes, fouilleur de sol"** (pas pêcheur aérien) |

---

## ECARTS COMPORTEMENT / fait / amis

| id | champ | ACTUEL | CORRECT (Grok) | gravité |
|----|-------|--------|----------------|---------|
| velociraptor | amis | "En meute — le loup des dinos !" | Chasse **seul** — aucune preuve fossile de meute (Grok l'énonce explicitement) | 🔴 |
| deinonychus | amis | "En meute de chasseurs" | **"Chasse en groupe possible mais débattue"** — les fossiles associés à Tenontosaurus ne prouvent pas la coopération (Grok) | 🟡 |
| gallimimus | fait | "courait à 70 km/h" | Vitesse = **analogie avec autruche**, non mesurée directement (Grok : "comparable à une autruche") | 🟡 (plausible mais non mesuré) |
| mosasaurus | proies | "reptiles volants" | Grok liste : poissons, requins, ammonites, tortues, plésiosaures, oiseaux marins, autres mosasaures — ptéranodon y est possible mais anecdotique | 🟡 |
| pteranodon | taille_m | 6 | Grok donne l'**envergure** (7 m mâles, 3,8 m femelles) — notre "taille_m=6" mélange envergure et longueur du corps. Long du corps ~1,5–2 m. | 🟡 référentiel |
| quetzalcoatlus | regime | "Carnivore (charognes, petits dinos)" | Grok : **prédateur terrestre** — fouille au sol (insectes, crustacés, petits animaux). "Petits dinos" exagéré. | 🟡 |

---

## FICHES dont le `fait` / `desc` devra être réécrit ou précisé

Ces dinos ont un `fait` problématique ou une donnée erronée qui rejaillit sur le texte :

1. **velociraptor** — fait correct ("de la taille d'un dindon, avait des plumes") mais `amis` ("meute") est 🔴 faux. Si `amis` nourrit un `fait`, à corriger.
2. **diplodocus** — taille_m=27 dépasse Grok (26 m) : le `fait` sur la queue claquante reste vrai mais la taille de référence doit être corrigée à 26 m.
3. **brachiosaure** — hauteur_m=13 ambigu (tête vs épaule) : le `fait` "Sa tête était à 13 mètres de haut" est en réalité la hauteur de la tête dressée (~13 m) vs l'épaule (9 m). La formulation actuelle du `fait` est acceptable si on précise "tête dressée" — à ne pas confondre avec la hauteur d'épaule.
4. **allosaure** — poids_t=2.3 vs max Grok 2 t : mineur, pas d'impact sur le `fait`.
5. **quetzalcoatlus** — regime "charognes, petits dinos" : le `fait` devra mentionner le régime terrestre (fouilleur au sol, pas pêcheur aérien).
6. **ceratosaurus** — taille_m=5.5 sous fourchette (6–7 m) : affecte les comparaisons d'échelle dans les fiches.
7. **suchomimus** — poids_t=4.5 vs 5.3 t révisé 2025 : mineur mais `fait` peut mentionner le poids.

---

## SYNTHESE

**Corrections 🔴 (faux factuel) : 3**
1. diplodocus · taille_m · 27 → **26**
2. allosaure · poids_t · 2.3 → **2**
3. velociraptor · amis · "meute" → **"chasse seul, meute non prouvée"**

**Corrections 🟡 (imprécis / hors fourchette) : 10**
1. tyrannosaurus · taille_m · 12 → **13**
2. tarbosaurus · taille_m · 10 → **12**
3. tarbosaurus · hauteur_m · 4 → **4.5**
4. brachiosaure · hauteur_m · 13 → **9** (épaule) — ou annoter "tête dressée"
5. ceratosaurus · taille_m · 5.5 → **6**
6. ceratosaurus · hauteur_m · 2.5 → **2**
7. dilophosaurus · poids_t · 0.43 → **0.35**
8. oviraptor · poids_t · 0.025 → **0.035**
9. suchomimus · poids_t · 4.5 → **5.3**
10. quetzalcoatlus · regime · "charognes, petits dinos" → **"petits animaux, insectes, fouilleur de sol"**

**Total : 3 🔴 + 10 🟡 = 13 écarts.**

---

_Vérifié par dino-conseiller 2026-06-06 — source : _FICHES-DINOS-GROKIPEDIA.md (Grokipédia)._
