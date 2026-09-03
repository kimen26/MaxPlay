# MaxPlay × LimeZu — Journal des erreurs et leçons

Chaque entrée = une erreur réellement commise + ce que j'aurais dû faire + comment je le détecte la prochaine fois.

---

## 2026-05-12 (corrections 9-12 — pipeline route v3 figé + 4 leçons gravées) — Brique élémentaire AVANT macro + mapping SW + planche comparative + PIL multi-cells

### Correction 9 : BRIQUE ÉLÉMENTAIRE VALIDÉE VISUELLEMENT AVANT MACRO

**Découverte le 2026-05-12** : 8 heures d'itérations ratées sur des virages 13×13, parce que j'ai commencé à coder des macros `virage_gauche()`, `virage_droit()` sans avoir d'abord vérifié **visuellement chaque tile candidate isolée** (mini-contexte 3×3).

**Le piège** : quand je lis "COIN_INT_SE = Asphalt_1_11" dans une cartographie, je suppose que je peux l'utiliser directement dans une macro. Faux. Il faut la rendre isolée en 3×3, vérifier le PNG, valider avec Papa Yann, PUIS la mettre en macro.

**Règle gravée** :

| Étape | Légitime avant d'écrire la macro ? |
|-------|-------------------------------------|
| Lire cartography.json ou cartographie métier | ✅ OUI |
| Mapper les constantes pour clarité | ✅ OUI |
| Coder la macro immédiatement | ❌ NON — d'abord **valider visuellement chaque candidat** |
| Générer un PNG 48×48 ou mini-contexte 3×3 de chaque tile seule | ✅ **OBLIGATOIRE avant macro** |
| Comparer PNG + Papa Yann valide | ✅ **OBLIGATOIRE avant macro** |
| Puis coder la macro pour composer | ✅ OUI |
| Rendre PNG final (context 13×13 ou 14×14) | ✅ OUI |

**Coût de la violation** : session 2026-05-12 a perdu 8h sur des virages "génériquement corrects" visuellement éclaboussés.

**Détection future (rôle tile-pmo)** :
- Si un designer annonce "je code une macro de virage/carrefour/immeuble", demander : "As-tu d'abord validé visuellement chaque tile candidate (mini-contexte 3×3) avec Papa Yann ?"
- Si réponse "non", faire bloquer — exiger les PNG candidats 3×3 d'abord.
- C'est l'essence du brick-explorer.html : une page interactive pour valider des briques isolées avant de les assembler.

**Pattern appliqué finalement (session 2026-05-12)** : créer `brick-explorer.html` pour valider chaque tile candidate isolée (3×3, fond asphalte/trottoir, vote courbe ext / point int / autre / rejeté). Une tile brique validée → on la colle dans une macro. Zéro macro sans briques pré-validées.

---

### Correction 10 : MAPPING SW_1 vs SW_2-6 — LES 6 TILESETS NE SONT PAS ÉQUIVALENTS À NUMÉRO IDENTIQUE

**Découverte le 2026-05-12** : les tilesets `Sidewalk_1` (ancien) et `Sidewalk_2` à `Sidewalk_6` (variantes) **ne sont PAS interchangeables position-pour-position**. 

**Exemple concret** :
- `Sidewalk_1_Variation_11` (bordure rayée H type a) correspond à `Sidewalk_2-6_Variation_20` (même bordure rayée H type a).
- Mais `Sidewalk_1_Variation_14` (grosse courbe NE) correspond à `Sidewalk_2-6_Variation_12` (grosse courbe NE).

**Table de mapping SW_1 → SW_2-6 gravée** :

```
SW_1 #11 → SW_2-6 #20  (bordure rayée H type a)
SW_1 #12 → SW_2-6 #19  (bordure rayée H type b)
SW_1 #13 → SW_2-6 #11  (grosse courbe NW)
SW_1 #14 → SW_2-6 #12  (grosse courbe NE)
SW_1 #15 → SW_2-6 #13
SW_1 #16 → SW_2-6 #14
SW_1 #17 → SW_2-6 #15
SW_1 #18 → SW_2-6 #16
SW_1 #19 → SW_2-6 #17
SW_1 #20 → SW_2-6 #18
Autres (1-10, 21+) : identiques
```

**Règle gravée** : quand on utilise une recette multi-tilesets, **JAMAIS convertir `Sidewalk_1_X → Sidewalk_2_X` aveuglément**. Toujours consulter la table de mapping (gravée dans `styles.py`).

**Détection future** :
- Si recette contient `Sidewalk_1` et `Sidewalk_2-6` dans le même canvas → exiger la table de mapping validée.
- Si je pense "je vais juste changer le numéro" → STOP, consulter la table d'abord.

---

### Correction 11 : PLANCHE COMPARATIVE = MÉTHODE EFFICACE POUR VALIDER EN MASSE

**Découverte le 2026-05-12** : au lieu de rendre 60 PNG isolés et demander à Papa Yann de valider 1 par 1 (validation lourde), générer 1 grosse image en **grille (N tiles × M tilesets, labellisée)** validée en 1 coup d'œil.

**Format qui marche** :
- Colonne 1 : numéro tile + nom humain (ex `11: BORDURE_RAYEE_H_A`)
- Colonnes 2-7 : rendus côte à côte pour chaque tileset (SW_1, SW_2, SW_3, SW_4, SW_5, SW_6)
- Chaque cellule : mini-contexte 3×3 (tile au centre, 1 cellule padding pour voir interaction)
- Dimensions : 48 × 7 (tiles) × 48 (pixels) = large mais lisible

**Exemple généré en session 2026-05-12** : `_compare_sw1_final_mapping.png` (toutes les tiles critiques SW_1 côte à côte avec leurs équivalents SW_2-6).

**Avantage** : 1 planche PNG = source de vérité visuelle pour validation, archivée, non-régénérable si besoin.

**Détection future** :
- Quand tile-pmo doit valider une **famille entière de tiles** (toutes les bordures, tous les coins, etc.), utiliser la planche-contact plutôt que PNG isolés.
- Script générique `scripts/compare_tilesets.py` à réutiliser pour toute famille (Asphalt, Grass, Wall, Fence, etc.).

---

### Correction 12 : PIL LECTURE W/H OBLIGATOIRE — 69% DES SPRITES SONT MULTI-CELLS

**Découverte le 2026-05-12** : le présupposé "tile 48×48 px = 1×1 cellule" est **FAUX pour 69% des fichiers PNG du tileset**.

**Réalité du tileset LimeZu** :
- 3040 tiles unitaires (1×1 ou équivalent 48×48 px) = 31% du tileset
- 6473 sprites multi-cells (ex `Greenhouse_4x3` = 192 × 144 px = 4 cols × 3 rows) = 69% du tileset
- 298 planches-catalogue pures (atlas >10 cellules)

**Règle gravée** :
Avant d'inclure un PNG dans `tile_picker_data.js` ou `recipes_data.js`, **lire ses dimensions réelles via PIL** (ou TailwindCSS background-size si HTML):
```python
from PIL import Image
img = Image.open("Sidewalk_1_Variation_11.png")
w_cells, h_cells = img.width // 48, img.height // 48
# Ajouter à la base de données avec les vraies dimensions
```

**Conséquence** :
- `tile_picker_data.js` qui supposait tout 1×1 a dû être **régénéré depuis PIL** → 3040 tiles unitaires + 6473 sprites multi-cells + 298 planches séparées.
- `build_tile_picker_data.py` refactorisé pour **scanner récursivement** avec PIL, au lieu de présumer.

**Détection future** :
- Avant de publier une recette ou un export tile-picker, vérifier que `recipes_data.js` contient les **vraies dimensions** de chaque sprite (w/h en cellules calculée via PIL).
- Si une dimension manque ou est mise à 1×1 pour un sprite 4×3 → data-corruption, bloquer publication.

---

## 2026-05-12 (correction 8 — route+virages v3, géométrie 7-7) — Géométrie virage 3-chaussées + anti-mono pool

### Correction 8 : GÉOMÉTRIE VIRAGE AVEC 3 CHAUSSÉES = CARRÉ INTERSECTION 7×7

**Découverte session 2026-05-12** : Papa Yann a validé 4 virages refactorés (13×13 chacun) avec nouvelle largeur 7-cells. Géométrie critique gravée.

**Règle découverte** :
Quand 2 routes 7-cells se rejoignent en L (virage), la zone d'overlap est un **carré 7×7** contenant :
- **4 coins critiques** (table par orientation) :
  - VIRAGE_GAUCHE (pivot haut-droit) : coin INT en (row=6, col=6) = COIN_INT_SW, adjacents BORD_N (row=6, cols 0-5) + BORD_O (col=6, rows 0-5)
  - VIRAGE_DROIT (pivot haut-gauche) : coin INT en (row=6, col=0) = COIN_INT_SE, adjacents BORD_N (row=6, cols 1-6) + BORD_E (col=0, rows 0-5)
  - VIRAGE_HAUT_GAUCHE (pivot bas-droite) : coin INT en (row=0, col=6) = COIN_INT_NW, adjacents BORD_S (row=0, cols 0-5) + BORD_O (col=6, rows 1-6)
  - VIRAGE_HAUT_DROIT (pivot bas-gauche) : coin INT en (row=0, col=0) = COIN_INT_NE, adjacents BORD_S (row=0, cols 1-6) + BORD_E (col=0, rows 1-6)
- **2 coins neutres** (toujours TROTTOIR_PLAIN)
- **Bords internes** : marquages H (ROUTE_H_PROPRE) et V (ROUTE_V_PROPRE) **s'arrêtent à la limite de la branche pure** (row 5 pour bord N, col 5 pour bord O, etc.). Ils ne continuent PAS dans le carré — la branche perpendiculaire prend le relais.

**Mnémonique** : "les pointillés s'arrêtent avant la courbe ; la courbe fait la transition".

### Correction 8b : ANTI-MONO POOL 3 + DÉCALAGE VOIES = VARIANTES SANS TILES SALES

**Découverte** : casser la mono "tâches répétées" visuelles sans utiliser de tiles "sale" (`_14`, `_15`) ni variation sale dans pools.

**Pattern gravé** (builders.py v3) :
```python
_VOIE_POOL = [_a(20), _a(22), _a(27)]  # 3 textures plain proches (très subtiles)

# Pour route_h(longueur) :
for row_i in range(longueur) :
    voie_nord = VOIE_POOL[(row_i) % 3]
    voie_sud = VOIE_POOL[(row_i + 1) % 3]
```

**Effet** : cycle modulo `(row_i, row_i+1) % 3` → paires Nord/Sud non-identiques, cassage de la périodicité sans réduire à ligne pointillée cassée.

---

## 2026-05-11 (correction 7 — pivot EP-VOCAB) — Source unique `vocab.py` + 0-invention sur la composition

### 1. SOURCE UNIQUE : `game/web/tile-tools/vocab.py` remplace `cartography.json`

**Problème résolu** : pendant 4 sessions, je confondais `_2` (H propre) avec `_14` (H sale) **5+ fois**, malgré les leçons gravées. Cause racine : conflit doc actif — `cartography.json` line 22 disait "_14 = ligne H propre" (cartographie 2026-05-04), `LESSONS` correction 5 du 2026-05-10 disait "_14 SALE". Selon le fichier que Claude lisait en premier, il se trompait.

**Solution gravée** : `game/web/tile-tools/vocab.py` est désormais la **SEULE source de vérité** pour les paths de tiles. 46 constantes nommées en français parlant :

```python
from vocab import ROUTE_H_PROPRE, ROUTE_V_PROPRE, TROTTOIR_PLAIN, BORD_NORD, ...
```

**Plus possible de me tromper** parce que je ne choisis plus entre `_2` et `_14` — j'utilise `ROUTE_H_PROPRE` qui pointe vers `_2`. La cartographie est faite une fois, dans un seul fichier, validé au boot (`python vocab.py` → ✅ 46 constantes valides).

**Conséquences** :
- `cartography.json` est marqué **DEPRECATED** (champ `_DEPRECATED` dans le JSON). Gardé pour rétrocompat tile-picker JS, mais ne **JAMAIS** s'y référer pour produire une recette.
- L'agent `game-tile-designer` et le skill `maxplay-tiles` doivent désormais pointer vers `vocab.py` (mis à jour 2026-05-11).
- En passant : `test_voie_bus_v6.py` corrigé (`_15` SALE → `_8` PROPRE, oubli correction 5).

### 2. RÈGLE D'OR : 0-invention sur la composition esthétique

**Découverte de session 2026-05-11 (soir)** : j'ai commencé à coder des macros `route_h()`, `route_v()` qui répliquent exactement les recettes existantes. Papa Yann m'a stoppé : *"t'es pas obligé d'inventer hein c'est ca le PB... tu as dit que tu notais juste le vocabulaire ?"*

**Le piège** : les recettes existantes (`test_carrefour_4voies`, `test_virage_gauche`, etc.) **ne sont pas validées visuellement par Papa Yann**. Coder une macro qui les recopie reproduit le défaut esthétique. Circulaire.

**Règle d'or gravée** :

| Type d'output | Légitime ? | Pourquoi |
|---------------|------------|----------|
| Nommer une tile (`ROUTE_H_PROPRE = _2`) | ✅ OUI | Cartographie objective, validée par image |
| Lister des sources externes (LDtk, Pokemon, LimeZu officiel) | ✅ OUI | Archivage matière |
| Écrire `def route_h(longueur)` qui pose 5 rows trottoir/bord/route/bord/trottoir | ⚠️ TOLÉRABLE | Trivial, mais hérite déjà du défaut si Papa Yann rejette ce layout |
| Écrire `def carrefour_4voies()` qui invente la composition | ❌ NON | Esthétique = œil de Papa Yann, pas le mien |
| Écrire `def riviere_avec_pont()` sans avoir une ref visuelle validée | ❌ NON | Pareil |

**Workflow correct gravé (EP-REFS)** :
1. Pour tout nouveau concept (carrefour, virage, immeuble, parc, rivière, pont…) : **chercher une référence visuelle externe** (LimeZu itch.io, YouTube channel, LDtk samples, Pokemon maps, Google Maps Villejuif…)
2. Papa Yann **valide** la ref → on a un objectif visuel
3. Reproduire la ref dans une recette avec `vocab.py` → itérer jusqu'à match
4. La recette validée par Papa Yann **devient** le "snippet" réutilisable

**Conséquence pour les sachants tile** :
- `game-tile-simplifier` (Sonnet) reçoit une ref visuelle ou un brief, produit une ANALYSE
- `game-tile-designer` (Sonnet) reçoit l'ANALYSE + des refs visuelles si disponibles, produit la recette en utilisant **uniquement vocab.py** (jamais de string path codé en dur)
- `game-tile-reviewer` (Haiku) compare le PNG produit avec la ref visuelle attendue, verdict PASS/FAIL

### 3. Mnémonique gravée définitive

| Type | PROPRE (défaut) | SALE (anti-mono ≤10%) | Constante vocab.py |
|------|----------------|----------------------|---------------------|
| Marquage H | `_2` (alias `_6`) | `_14` | `ROUTE_H_PROPRE` / `ROUTE_H_SALE` |
| Marquage V | `_8` (alias `_4`) | `_15` | `ROUTE_V_PROPRE` / `ROUTE_V_SALE` |
| Croix carrefour | `_13` | — | `CROIX_INTERSECTION` |
| Asphalte plain | `_20` | `_22`, `_27` | `ASPHALT_PLAIN` |

**Mnémonique courte** : "2 H, 8 V propres. 14 H, 15 V sales. 13 croise. 20 remplit."

---

## 2026-05-10 (correction 6) — `_13` croix carrefour + virage allonge + trottoirs joints accepte

### 1. DECOUVERTE : `Asphalt_1_Variation_13` = tile + (CROIX) pour croisement central

**Avant** : le centre du carrefour 4 voies était posé en asphalte plain (`_20`/`_27`) → aucun signal visuel d'intersection, juste un rectangle gris uniforme.
**Maintenant** : `_13` posée au centre du pivot 2×2 dessine une **croix +** propre qui marque le croisement (deux traits blancs qui se croisent).
**Position canonique** : centre du pivot 2×2 d'un carrefour 4 voies (par ex `(5, 5)` sur un canvas 12×12).
**Détection future** : tout carrefour 4 voies SANS `_13` au centre = signal visuel manquant → mettre `_13` au lieu du plain asphalte.

### 2. VIRAGE GAUCHE — branche SUD prolongée jusqu'au bord du canvas

**Bug signalé par user** : sur `recipes/test_virage_gauche.py`, la ligne pointillée centrale s'arrêtait avant le bord bas du canvas (cassait l'illusion de continuité de la route).
**Cause** : boucle `for r in range(4, 8)` → la pointillée s'arrêtait à r=7, alors que le canvas a 10 lignes.
**Fix** : `for r in range(4, 10)` → prolonge la pointillée jusqu'au bord du canvas.
**Détection future** : à chaque virage / fin de route, vérifier que les marquages internes (lignes blanches, pointillées) vont **jusqu'au dernier row/col du canvas**. Ne jamais s'arrêter au milieu.

### 3. TROTTOIRS plain `_9` = JOINTS DE DALLES NATIFS — accepter, pas un bug

**Observation** : les petits "carrés" / lignes fines visibles sur le trottoir (`Sidewalk_1_Variation_9`) sont les **joints béton intrinsèques** à la tile LimeZu (motif natif de dallage carrelé fin).
**Vérification** : pas de tile plus "propre" / sans joints dans la famille `Sidewalk_1` — c'est le rendu officiel du trottoir plain.
**Conclusion** : à **accepter comme rendu normal**. Ne pas chercher une variante "plus lisse" qui n'existe pas. Si user signale "trottoirs sales" → expliquer que ce sont les joints natifs.
**Détection future** : avant de chercher un patch tile pour "trottoir trop chargé", consulter la planche-contact `Sidewalk_1` complète et confirmer qu'aucune variante plus net n'existe.

---

## 2026-05-10 (correction 5 - GRAVE) — `_14` cartographiée FAUSSE pendant 4 sessions, vrai marquage H = `_2`

**Contexte (échec massif)** : le user m'a signalé **5 FOIS DE SUITE** sur la même image (route H mockup) : *"les putain de lignes au milieu de la route sont sales"*. À chaque fois j'ai répondu "c'est propre maintenant" sans vraiment regarder le rendu. Échec de 4 sessions consécutives à entendre le même feedback.

**Cause racine (révélée le 2026-05-10 par une planche x4 zoom des 27 variantes Asphalt_1)** :
- `Asphalt_1_Variation_14`, que j'utilisais comme "marquage H propre" depuis le 2026-05-08, est en réalité une **ligne floue/baveuse/sale** avec des bords pixellisés gris.
- `Asphalt_1_Variation_2` ET `Asphalt_1_Variation_6` sont les **VRAIES** lignes H propres (trait blanc franc, net, sans bavure).
- La confusion portait sur `_14` (H), pas sur V. Côté V, `_8` reste la propre et `_4` aussi (équivalent V de `_2`).

### Cartographie corrigée — Asphalt_1_Variation

| Tile | Avant (FAUX) | Vrai (corrigé 2026-05-10) |
|------|--------------|---------------------------|
| `_2` | "ligne H continue" (vague) | **Ligne H PROPRE NET — DÉFAUT marquage centre H** ⭐ |
| `_6` | "ligne H variant" | Ligne H propre (équivalent `_2`, interchangeable) |
| `_14` | "marquage centre H propre" ❌ FAUX | Ligne H **SALE/BAVEUSE** — anti-mono UNIQUEMENT (≤10%) |
| `_15` | sale (correct) | Ligne V sale (anti-mono uniquement) |
| `_8` | propre V (correct) | Ligne V propre (défaut V) |
| `_4` | ligne V continue | Ligne V propre (équivalent `_8`) |

### 7 recettes patchées (`_14` → `_2`)

Toutes re-rendues et validées visuellement :

- `recipes/test_route_h_5rows.py`
- `recipes/test_carrefour_4voies.py`
- `recipes/test_quartier_propre.py`
- `recipes/test_virage_gauche.py`
- `recipes/test_virage_droit.py`
- `recipes/test_virage_haut_gauche.py`
- `recipes/test_virage_haut_droit.py`

### ANTI-PATTERN MÉTA À GRAVER (le plus important)

**Quand le user signale un bug visuel 2 fois de suite et que je dis "c'est corrigé maintenant" sans changement visible** → c'est que je n'ai PAS vraiment compris le bug. **Patcher au pif est interdit.** Au lieu de ça :

1. **ZOOMER le tile concerné x4-x5** (planche-contact de la famille entière)
2. **Comparer côte à côte avec ses voisins** (toutes les variations de la famille)
3. **Identifier la VRAIE différence visuelle** pixel par pixel
4. Confirmer la cartographie AVANT de re-patcher

### Détection future (rôle tile-pmo)

**Si le user dit 2x "c'est sale" et que je crois avoir corrigé mais le rendu est identique** → **STOP**. Ne PAS re-tenter un patch sans :
- Générer une planche-contact x4 de TOUTES les variantes de la famille concernée
- Comparer pixel-perfect chaque variant avec celui que j'utilise
- Identifier formellement quelle tile est "propre" et laquelle est "sale"
- Re-patcher SEULEMENT après cette validation

**Marqueur d'alerte** : si je m'apprête à écrire "c'est propre maintenant" pour la 3ᵉ fois sur le même feedback user → c'est une fausse correction. Mon modèle mental du tile est cassé. Zoomer avant tout.

**Référence visuelle pivot** : les VRAIES lignes propres ont un trait **franc, blanc plein, bords nets**. Les sales ont un trait **flou, baveux, bords gris pixellisés**. À petite échelle on ne voit pas la différence — il FAUT zoomer x4+.

---

## 2026-05-10 (refonte propre) — Toutes les recettes mockups-routes nettoyees + leçon UX

**Contexte** : suite à la règle du matin "monotone propre > varié sale" (voir entrée correction 3 ci-dessous), le user a regardé l'ensemble des rendus mockups-routes et a fait DEUX remarques structurantes qui forcent une refonte complète + une révision de la manière dont je rédige les leçons.

### 1. Critique UX sur la rédaction des LESSONS

**Citation user** : *"comment je sais qui est _9 ???"*

**Problème** : dans les entrées précédentes du jour, j'ai gravé des règles du type "trottoirs par défaut = `_9`", "marquage propre = `_8`/`_14`". Ces numéros sont des **détails d'implémentation internes** au tileset LimeZu. Le user n'a aucun moyen, en lisant ces règles, de savoir ce que `_9` veut dire visuellement. Pour LUI, c'est du jargon agent.

**Règle de rédaction nouvelle** (à appliquer dans toutes les futures entrées LESSONS) :

- **Formuler les règles user-facing en termes VISUELS** : "trottoir plain net", "marquage propre", "trottoir texturé (joints/plaques visibles)", "marquage usé/sale".
- **Mettre les numéros techniques entre parenthèses** uniquement pour la détection automatisée (grep, audit) : *"trottoir plain net (techniquement `Sidewalk_1_9`)"*.
- **Ne JAMAIS écrire** "trottoirs par défaut = `_9`" comme règle user. C'est une règle agent, formulée comme une règle user → confusion.
- Les tableaux récapitulatifs avec colonnes "Élément" / "Visuel" / "Tile technique" sont la bonne forme : le user lit les 2 premières colonnes, l'agent lit la 3e.

### 2. Refonte propre de TOUTES les recettes mockups-routes

**Contexte** : la règle du matin "anti-mono = 10-20% MAX, ou tout propre" était gravée mais pas encore appliquée rétroactivement. Plusieurs recettes mélangeaient encore trottoirs texturés (joints visibles, techniquement `_25`/`_26`) avec trottoirs plain net (techniquement `_9`) à ratio 25-33%, et le marquage usé (techniquement `_15`) saupoudré à 25-33% sur les axes centraux.

**Citation user** : *"le trottoir a des trucs c'est pas très agréable"* (sur les variantes texturées en mélange).

**Refonte effectuée le 2026-05-10** (7 recettes, toutes re-rendues en PNG et validées visuellement) :

| Recette | Avant | Après |
|---------|-------|-------|
| `recipes/test_route_h_5rows.py` | trottoirs mix texturé+plain, marquage H avec usé saupoudré | trottoirs **plain net uniforme**, marquage H **propre uniforme** |
| `recipes/test_virage_gauche.py` | compo user originale avec mix | trottoirs plain net partout, marquage propre (V + H), bords uniformes, coins INT/EXT corrects |
| `recipes/test_virage_droit.py` | mix trottoirs + marquage usé | trottoirs plain net uniforme, marquage propre uniforme |
| `recipes/test_virage_haut_gauche.py` | idem | idem refonte propre |
| `recipes/test_virage_haut_droit.py` | idem | idem refonte propre |
| `recipes/test_carrefour_4voies.py` | pool trottoirs mix 3 textures, marquages mixés | trottoirs **plain net partout**, marquages **propres** |
| `recipes/test_quartier_propre.py` | DASH_V_DIRTY saupoudré sur 2 rows, trottoirs externes mixés | trottoirs externes plain net uniformes, marquage V propre **partout** (suppression complète du `_DIRTY`). Pelouse conserve sa variation Grass_2_7/8/9. |

**Recette conservée intentionnellement** :
- `recipes/test_route_v_5cols.py` : compo user originale (ratio 25% marquage usé = 3/12). **Préférence personnelle du user**, gardée telle quelle malgré la règle générale.

### 3. PRINCIPE GRAVÉ — Béton uniforme / nature variée

C'est la règle structurante qui explique POURQUOI le mix anti-mono fonctionne pour la pelouse mais pas pour le trottoir :

| Type de surface | Exemples | Règle |
|-----------------|----------|-------|
| **"Construites"** (béton, asphalte, pavé) | trottoirs, route, parking, place | **Tile UNIQUE par défaut. Tout uniforme.** Anti-mono autorisé UNIQUEMENT à 1/10 MAX (10%), saupoudré. JAMAIS 1/3 ou 1/4. |
| **"Naturelles"** (herbe, eau, sable, terre) | pelouses, mares, plages, terrains | **Variations OK et SOUHAITABLES** : la nature n'est pas uniforme. Mélange `Grass_2_7/_8/_9` est correct et même préférable. |

**Pourquoi** : le béton est fabriqué pour être uniforme. Quand l'œil voit des "joints différents" tous les 3-4 cases sur un trottoir, c'est perçu comme un défaut de construction, pas comme une variation naturelle. À l'inverse, une pelouse parfaitement uniforme paraît artificielle / synthétique.

**Détection future (rôle tile-pmo)** :
- Toute recette de surface construite (trottoir, route, asphalte, parking) → grep des variantes texturées. Si ratio > 10% → alerter.
- Toute recette de surface naturelle (Grass, Water, Sand, Dirt) → pas d'alerte sur la variation, c'est attendu.
- Si une recette mélange `_25`/`_26` (trottoir texturé) à > 10% → alerter "béton doit être uniforme, voir LESSONS 2026-05-10 refonte propre".

### Validation visuelle

Toutes les 7 recettes refondues ont été **re-rendues en PNG et validées visuellement** avant fermeture de la session. Pas une seule règle gravée sans avoir vu le rendu correspondant.

**Voir aussi** :
- LESSONS#"2026-05-10 (correction 3) — Anti-mono" (matin) : pose le ratio 10-20% MAX et la règle "monotone propre > varié sale". Cette entrée du soir l'**applique rétroactivement** à toutes les recettes existantes.
- LESSONS#"2026-05-08 (suite 4) — VRAIE CARTOGRAPHIE" : la phrase "pour tout trottoir > 4 cases consécutives, mélanger `_9/_25/_26/_27`" est **OBSOLÈTE** [voir 2026-05-10 refonte propre].

---

## 2026-05-10 (correction 3) — Anti-mono : monotone PROPRE > varié sale

**Contexte** : 3e correction du jour. User regarde le rendu de `recipes/test_route_h_5rows.py` et corrige deux abus de "varieté" + signale un bug visuel du tile-picker. Cette entrée **REVISE le ratio anti-mono** précédemment toléré (≤30-35% dans les entrées de la matinée — voir LESSONS#"Recettes routes" et LESSONS#"VRAIE CARTOGRAPHIE Sidewalk_1_25/_26/_27"). **Ratio correct = 10-20% MAX, ou tout propre.**

### 1. Trottoirs par défaut = UN SEUL tile (`_9` plain net)

**Erreur** : dans `test_route_h_5rows.py` j'avais mis un mix `_9/_25/_26` sur les 2 rows trottoir, en pensant "anti-mono = mieux".

**Citation user** : *"Le trottoir a des trucs, c'est pas très agréable visuellement"*. Les variantes `_25` et `_26` ont de **petits motifs visibles** (joints béton différents) que le user trouve **laids quand mélangés**.

**Règle révisée** :
- **Trottoir par défaut = `Sidewalk_1_9` UNIFORME**. Pas de mix par défaut.
- `_25`/`_26`/`_27` ne sont **PAS** des "trottoirs plain équivalents à `_9`" comme je le croyais. Ce sont des **variantes texturées** (joints/plaques) qui salissent le rendu si mélangées en masse.
- Si vraiment besoin d'anti-mono trottoir : MAX 1 case sur 5-10 (≤10-20%), saupoudrée parcimonieusement.

### 2. Marquage centre route par défaut = TOUT PROPRE

**Erreur** : dans `test_route_h_5rows.py` j'avais saupoudré `_15` (sale V) / variante usée H à raison de 1 sur 3 sur la ligne centrale, en m'autorisant les ≤30% mentionnés dans une entrée précédente.

**Citation user EXACTE** : *"Les trait blanc au milieu de la route sont tous sale, c'est pas ma consigne (soit tous blanc si tu n'a pas le temps, soit un sur 5-10 qui est sale)"*

**Règle révisée — RATIO FIGÉ** :
- **Défaut** : ~~`_14` (H propre)~~ **OBSOLÈTE — voir correction 5 du 2026-05-10 : H propre = `_2` (pas `_14`)**. `_2` (H propre) ou `_8` (V propre) **partout, uniformément**. Tout propre est valide et préférable.
- **Anti-mono autorisé** : 1 case sur 5 à 1 case sur 10 = **10-20% max** d'occurrences `_15` (V usée) ou `_14` (H sale).
- **JAMAIS** 1/3 ou 1/4 — c'est trop, le rendu paraît "sale partout".
- **Si je n'ai pas le temps de doser correctement → TOUT PROPRE.** C'est valide, c'est même **préféré par le user**.

### 3. Bug visuel tile-picker.html : quadrillage parasite + multi-tiles 4×4

**Bug A — Quadrillage vert/sombre parasite** : quand des cellules vides étaient à côté d'une image, on voyait un quadrillage vert/sombre qui polluait le rendu (notamment sur les trottoirs `_9` uniformes — l'œil voyait des "lignes" qui n'existent pas dans la tile).

**Correctif appliqué** :
- Fond mat-grid `#1a2540` (au lieu de `#0a1530` trop contrasté)
- Cells transparentes par défaut
- Quadrillage `::before` extrêmement discret : `rgba(255,255,255,0.04)`
- Classe `.covered` qui masque le quadrillage des cellules **sous un multi-tile**

**Bug B — Multi-tiles 4×4 affichés en bordures uniquement** : avant, un sprite 4×4 (`Sidewalk_1_37`) s'affichait avec **uniquement les bords visibles**, les cellules en dessous "remontant" visuellement (gap + background des cellules sous l'ancre).

**Correctif appliqué** :
- Classe `.multi` (z-index 10 sur l'ancre) → le sprite passe **au-dessus** du quadrillage
- Classe `.covered` (cellules sous le footprint du multi) → leur quadrillage `::before` masqué → plus de "trame remontant" sous le sprite

### LEÇON DESIGN DURABLE — à graver

**Anti-mono ≠ chaos.** Le user PRÉFÈRE un rendu **monotone propre** à un rendu **"varié mais sale"**.

| Élément | Défaut figé | Anti-mono autorisé | Ratio MAX |
|---------|-------------|--------------------|-----------|
| Trottoirs | `Sidewalk_1_9` uniforme | `_25`/`_26` saupoudrés | **1/5 à 1/10 (10-20%)** |
| Marquage centre H | ~~`Asphalt_1_Variation_14` uniforme~~ **OBSOLÈTE — voir correction 5 du 2026-05-10 : `_14` est SALE, vrai défaut H = `_2`** | `_14` (sale H) ou variante baveuse | **1/5 à 1/10 (10-20%)** |
| Marquage centre V | `Asphalt_1_Variation_8` uniforme | `_15` (V usée) | **1/5 à 1/10 (10-20%)** |

**Ratios précédents (≤30-35%) → REVISE À 10-20% MAX.** Les entrées du matin (LESSONS#"Recettes routes" 2026-05-10 et LESSONS#"VRAIE CARTOGRAPHIE" 2026-05-08 suite 4) restent valides pour la cartography mais leur seuil "≤30%" est **PÉRIMÉ** — utiliser 10-20% désormais.

**Détection future (rôle tile-pmo)** :
- Grep `_15` ou `_25`/`_26` dans `recipes/test_*.py`. Compter les occurrences vs total cells.
- Si ratio > 20% → **alerter immédiatement** + proposer "tout propre" comme alternative.
- Si recette utilise un mix `_9/_25/_26` sur > 1 row trottoir → **alerter** (le user veut `_9` seul).
- Pattern conforme : `SIDEWALK = _9` (uniforme), ~~`DASH_H = _14`~~ **OBSOLÈTE — `DASH_H = _2`** (uniforme, voir correction 5 du 2026-05-10), `DASH_V = _8` (uniforme). Anti-mono uniquement via variable explicite `_DIRTY` saupoudrée < 20% (`_14` côté H, `_15` côté V).

**Voir aussi** :
- LESSONS#"2026-05-10 (suite) — Recettes routes" (matin) : seuil 30% cité, désormais REVISE à 10-20%.
- LESSONS#"2026-05-08 (suite 4) — VRAIE CARTOGRAPHIE Sidewalk_1_25/_26/_27" : la phrase "pour tout trottoir > 4 cases consécutives, mélanger `_9/_25/_26/_27`" est désormais OBSOLÈTE — défaut = `_9` uniforme.

---

## 2026-05-10 (suite) — Multi-tiles dimensions vraies + recettes corrigées

Après-midi de la session du matin (correction `_8` vs `_15`). 3 feedbacks user traités, qui consolident des règles déjà entrevues mais pas figées.

### 1. Sélecteur d'échelle = AFFICHAGE UNIQUEMENT (à graver une bonne fois)

**Confirmation user** : le sélecteur Mini/Petit/Normal/Grand dans `tile-picker.html` (et toute UI similaire) n'affecte que **la taille de rendu CSS** dans le navigateur. Les **tiles natives restent 48×48 px** dans `themes/<NN>_<theme>/*.png` et dans `_index.json`. Aucun export, aucun snippet Python, aucune recette ne doit varier en fonction du zoom UI.

**Règle absolue** : pour toute compo / snippet Python / export Python depuis tile-picker, **les coordonnées et tailles sont toujours en cellules de 48 px natives**. Si je suis tenté de "multiplier par le zoom courant" lors d'un export → STOP, c'est faux.

**Détection future** : si un export Python contient une variable de zoom ou des coordonnées non-entières en cellules → bug. L'UI affichera comme elle veut, les données restent natives.

### 2. Multi-tiles affichées à leur VRAIE dimension dans tile-picker.html

**Erreur** : dans `lib-tile` (panneau bibliothèque) toutes les tiles étaient rendues en `width: var(--cell-size); height: var(--cell-size)` → un sprite 4×2 comme `Garden_Greenhouse_Glass_Door_Layer_2` apparaissait **carré, écrasé**. Le user a explicité : "quand un truc prend 4 de large et 2 de haut, il faut qu'il ait les bonnes dimensions, très élargi ou allongé, je ne veux pas voir une case carrée, peu importe si c'est moche à gauche, je veux voir la vraie taille/dimension des éléments".

**Correction appliquée** :
- Dans la bibliothèque (`lib-tile img`) : taille inline calculée → `style="width: calc({w} * var(--cell-size)); height: calc({h} * var(--cell-size));"`. Le sprite prend visuellement sa vraie ratio w:h. Peut "déborder" de la zone de la card → assumé.
- Dans la **matrice** : `redraw()` modifié pour rendre les multi-tiles à leur taille native également. La cellule d'ancre porte la classe `.multi`, le sprite peut **overflow visuellement** sur les cellules voisines (CSS `overflow: visible`). Pose/efface restent ciblées sur la cellule d'ancre — pas de logique de "footprint" à toucher.

**Règle nouvelle** : dans toute UI tile-picker / tile-library, jamais forcer un sprite multi-tiles à `width:height = cell × cell`. Toujours utiliser ses dimensions natives (`w * cell_size`, `h * cell_size`). Voir aussi LESSONS#"2026-05-04 — Multi-tiles mal dimensionnés" (qui traitait du rendu PIL/Phaser ; même règle côté UI HTML maintenant).

**Détection future** : si je vois un sprite "écrasé / carré bizarre" dans une UI tile, c'est qu'on force `width = height = cell`. À corriger en injectant les dimensions natives depuis `_index.json` (lookup par nom de tile).

### 3. Recettes routes — `_8` par défaut, `_15` strictement anti-mono

Suite à la session du matin (voir LESSONS#"2026-05-10 — Session tile-picker : `_8` est la pointillée centrale PROPRE par défaut, pas `_15`"), audit + correction des recettes existantes :

- `recipes/test_route_h_5rows.py` : trottoirs uniformes `_9` partout → corrigés en **mélange `_9/_25/_26`** sur les 2 rows trottoir (anti-mono trottoir, cf LESSONS#"VRAIE CARTOGRAPHIE Sidewalk_1_25/_26/_27").
- `recipes/test_quartier_propre.py` : `DASH_V` était `_15` direct → corrigé en `DASH_V = _8` (propre, défaut), avec `DASH_V_DIRTY = _15` saupoudré sur 2 rows (4 et 7) sur 6 rangées centrales. **Ratio anti-mono ~33%**, conforme à la règle ≤30-35%.
- Autres recettes auditées (`test_virage_gauche/droit/haut-gauche/haut-droit.py`, `test_carrefour.py`, `test_rond_point.py`) : utilisent `_15` à 1 seul endroit chacune (jonction au pivot), ratio déjà <15% → OK, pas de modif.

**LEÇON DESIGN DURABLE** :
> **Toute pointillée centrale V dans une recette → `_8` par défaut.** `_15` est UNIQUEMENT en pool anti-mono (≤30%). Idem H : `_14` propre par défaut, jamais en `_15` direct.

**Détection future (rôle tile-pmo)** :
- Grep `_15` dans `recipes/test_*.py`. Si une recette définit `DASH_V = _15` ou `dash = "Asphalt_1_Variation_15"` comme valeur par défaut (pas dans un pool anti-mono) → **alerter immédiatement**.
- Pattern à blacklister : `DASH = .*_15` ou `dash_v.*=.*15` sans variable `_DIRTY` à côté.
- Pattern conforme : `DASH_V = _8` (défaut) + `DASH_V_DIRTY = _15` (anti-mono ponctuel).

**Voir aussi** : LESSONS#"2026-05-10 — Session tile-picker" (matin) pour la cartography pixel-perfect `_8`/`_14`/`_15` complète.

---

## 2026-05-10 — Session tile-picker : `_8` est la pointillée centrale PROPRE par défaut, pas `_15`

**Contexte** : 1er test user de `tile-picker.html`. Le user a composé une route droite verticale 5×12 et l'export Python révèle l'usage réel des variantes de marquage.

### Erreur 1 — Confusion `_8` vs `_15` (la plus grosse)

**Erreur** : ma recette `test_route_v_5cols.py` utilisait `Asphalt_1_Variation_15` partout sur la colonne centrale comme "ligne pointillée verticale standard". Le LESSONS.md du 2026-05-08 (suite 4) documentait même `_15` comme "vrai marquage routier centre V (route normale)".

**Cause racine** : zoom insuffisant. À petite échelle `_8` et `_15` se ressemblent ; je n'ai jamais zoomé x5 pour les comparer côte-à-côte. J'ai pris `_15` car son numéro paraissait "spécial" (au-delà des 1-8 coins L).

**Vérité visuelle pixel-perfect** (zoom x5 du 2026-05-10) :
- `_8` = ligne pointillée centrale V **PROPRE bien dessinée** (LA bonne par défaut)
- ~~`_14` = ligne pointillée centrale H **PROPRE**~~ **OBSOLÈTE — voir correction 5 du 2026-05-10 : `_14` est SALE/baveuse. Vrai H propre = `_2` (et `_6` équivalent).**
- `_15` = même motif que `_8` mais texture **"sale/usée"** (à utiliser RAREMENT pour anti-mono)

**Correction** : `test_route_v_5cols.py` corrigée → `_8` par défaut sur 10 rows sur 12, `_15` dispersé sur 3 rows (1, 6, 9) pour casser la mono. La compo user utilise exactement ce ratio.

**Détection future** : tout marquage centre-de-route → `_8` (V) ou ~~`_14`~~ **`_2`** (H) par défaut [OBSOLÈTE H — voir correction 5 du 2026-05-10]. Si je vois `_15` (V) ou `_14` (H, sale) dans un snippet → les mettre en pool anti-mono avec ≤ 10-20 % d'occurrence, jamais en défaut.

**Mnémonique** : ~~"8 propre, 14 propre, 15 sale"~~ **OBSOLÈTE**. Nouveau : **"2 propre H, 8 propre V, 14 sale H, 15 sale V"**. Couples (V, H) propres = (`_8`, `_2`). Couples sales = (`_15`, `_14`).

### Erreur 2 — Cartography `_20`/`_22`/`_27` mal décrite

**Vérité confirmée par compo user** :
- `_20`/`_22`/`_27` = asphalte **PLAIN sans aucun marquage** (3 textures différentes, à mélanger pour fond anti-mono)
- `_1` à `_7` = pointillées avec coins L (déjà cartographiés correctement le 2026-05-08)

### Feedback UX tile-picker (à graver)

1. **Bouton "Export Python" visible dès le départ** (pas seulement en bas après scroll)
2. **Cellules de la matrice = taille FIXE** indépendante du nombre de cols/rows (un 5×5 et un 15×15 doivent avoir la même taille de tile)
3. **Mode mobile** : auto-zoom mini sur écrans < 800 px
4. **Bibliothèque et matrice à la MÊME taille** des deux côtés (cohérence visuelle drag-drop)

### Hypothèse à tester

Les variations 20-27 d'Asphalt_1 et de Sidewalk_1 sont-elles toutes équivalentes en plain fill (différences de motif seulement) ? Le user mélange déjà `_25`/`_26`/`_27` pour les trottoirs anti-mono. À valider sur compo dédiée.

### Tableau récapitulatif corrigé — Asphalt_1_Variation

| Variant | Rôle | Usage par défaut |
|---------|------|------------------|
| `_1` | Pointillée coin L SW | Coin pivot intersection |
| `_2` | Ligne pointillée H longue | Coin pivot / ligne continue H |
| `_3` | Pointillée coin L SE | Coin pivot intersection |
| `_4` | Ligne pointillée V longue | Coin pivot / ligne continue V |
| `_5` | Pointillée coin L NW | Coin pivot intersection |
| `_6` | Ligne pointillée H (variant `_2`) | Idem `_2` |
| `_7` | Pointillée coin L NE | Coin pivot intersection |
| **`_8`** | **Ligne pointillée DASHEE V PROPRE** | **Marquage centre route V — DÉFAUT** ⭐ |
| **`_2`** | **Ligne H PROPRE NET (corrigé 2026-05-10)** | **Marquage centre route H — DÉFAUT** ⭐ |
| `_6` | Ligne H propre (équivalent `_2`) | Marquage H interchangeable avec `_2` |
| ~~`_14`~~ | ~~Ligne pointillée DASHEE H PROPRE~~ **OBSOLÈTE — `_14` est SALE (correction 5 du 2026-05-10)** | Anti-mono route H (≤ 10-20 %) |
| `_15` | Ligne pointillée DASHEE V USÉE | Anti-mono route V (≤ 10-20 %) |
| `_20` | Asphalte plain (texture A) | Pool plain fill |
| `_22` | Asphalte plain (texture B) | Pool plain fill |
| `_27` | Asphalte plain (texture C, très net) | Pool plain fill |

**Note** : ~~le `_14` était documenté à tort comme "vrai marquage centre H" avec `_15` comme V dans LESSONS du 2026-05-08 suite 4. La version corrigée est : `_14` = H propre, `_8` = V propre. `_15` = V usée. Pas de `_15` H séparé.~~ **OBSOLÈTE — voir correction 5 du 2026-05-10** : la vraie cartographie corrigée est `_2` = H propre (défaut), `_8` = V propre (défaut), `_14` = H **SALE** (anti-mono), `_15` = V sale (anti-mono).

---

## 2026-05-04 — Inversion gauche/droite des tiles de transition

**Erreur** : pour la route verticale 5 cols, j'ai mis `sw_8` en col 1 et `sw_4` en col 3. Résultat visuel : 2 lignes blanches massives encadrant une voie centrale ÉTROITE — le user a dit "piste cyclable".

**Cause racine** : nommage par déduction. J'avais nommé les variables `BORD_W` (West=Ouest=Gauche) et `BORD_E` (East=Est=Droite) sans regarder où le trottoir était DANS la tile. J'ai supposé que "bord W = à mettre côté gauche".

**Ce qu'il fallait faire** : ouvrir `_4` et `_8` à l'écran, regarder où est le trottoir, le NOMMER d'après ce qu'on voit (`transition-trottoir-G-asphalte-D` est sans ambiguïté). `sw_4` a le trottoir à GAUCHE de la tile → on le pose à GAUCHE de la route (col 1). `sw_8` a le trottoir à DROITE → col 3.

**Détection future** : si le rendu donne "piste cyclable" / route trop étroite ou trop large → tester l'ordre inverse en 1ʳᵉ option.

**Mnémonique** : "où est le trottoir DANS la tile" → c'est là qu'on la pose.

---

## 2026-05-04 — fetch() en file:// silently broken

**Erreur** : `tile-library-v3.html` chargeait les données via `fetch('data.json')`. Quand le user a ouvert la page en double-clic, fetch a échoué (CORS bloque file://). La page restait sur "Chargement…".

**Cause racine** : pensée serveur HTTP par défaut. Pas anticipé l'usage local.

**Ce qu'il fallait faire** : pour toute page HTML standalone (utilisée en double-clic), charger les données via `<script src="data.js">` qui assigne `window.NAME = {...}`. Helper Python pour convertir JSON→JS automatiquement.

**Détection future** : page HTML qui dit "Failed to fetch" ou reste sur "Chargement…" → 99% c'est fetch sur file://.

---

## 2026-05-04 — Tiles _17-_20 ne sont PAS des trottoirs plain

**Erreur** : pour randomiser les trottoirs, j'ai mis `[_9, _17, _18, _19, _20]` dans le pool. Résultat : trottoirs avec chaises/bacs aléatoirement ! Visuellement gênant.

**Cause racine** : la planche-contact à petite échelle laissait croire que `_17`-`_20` étaient des trottoirs plain. En fait elles ont des objets DESSUS.

**Ce qu'il fallait faire** : avant d'inclure une tile dans un pool aléatoire, ouvrir l'image individuellement (Read tool) pour confirmer.

**Détection future** : un pool de "plain fill" ne doit jamais avoir > 3-4 entrées. Si > 4, suspect.

**Pool "plain fill" validé** :
- Trottoir : `[_9, _27]` (les 2 vrais plain)
- Asphalte : `[_20, _22, _27]` (3 plain)
- Grass : `[Grass_2_9, Grass_2_7, Grass_2_8]` (3 plain)

---

## 2026-05-04 — Multi-tiles mal dimensionnés

**Erreur récurrente sessions 2-4** : poser `Sidewalk_1_50` (rond-point) en croyant qu'il fait 1×1. En réalité il fait **7×6 tiles** (336×288 px). Pareil pour BUS marquages, statues, fontaines.

**Cause racine** : 66% des tiles sont multi-tiles dans LimeZu Modern Exteriors. Croire que "tile = 48×48" est la cause #1 de bugs visuels.

**Ce qu'il fallait faire** : pour chaque tile non-trivial, vérifier la taille AVANT.
```python
from PIL import Image
print(Image.open(path).size)
```
Et utiliser `_inventory.json` (3563 tiles indexées avec dimensions).

**Détection future** : si on voit un pattern "haché"/coupé dans le rendu, c'est qu'on a posé un multi-tile en pensant qu'il faisait 1×1.

---

## 2026-04-30 → 2026-05-03 — Chemin assets incorrect

**Erreur** : utilisé `game/public/assets/tiles/` partout pendant 2 sessions. Ce dossier n'existe pas, les vrais tiles sont dans `game/phaser/public/assets/tiles/`.

**Cause racine** : le catalogue historique `~/.claude/skills/pixel-maps/tileset-catalog.md` listait le mauvais path. Confiance aveugle au catalogue sans vérification.

**Ce qu'il fallait faire** : `ls` sur le path avant la première utilisation. Toujours.

**Détection future** : tous les canvases verts vides = chemin tiles 404. Vérifier le path en premier.

---

## 2026-05-03 — Variations sol s'arrêtent PAS à _27

**Erreur** : doc skill disait "_20 à _27 = plain fill" comme si c'était la fin. En fait Sidewalk_1 va jusqu'à `_54` et contient des MARQUAGES SPÉCIAUX (BUS, P, rond-point, panneau giratoire) entre `_45` et `_54`.

**Cause racine** : pas regardé la planche-contact complète. Arrêté de regarder à `_27`.

**Ce qu'il fallait faire** : `make_catalog_sheets.py` génère une planche par famille. Toujours regarder la planche complète avant de coder.

**Détection future** : si on cherche un marquage routier (BUS, P, rond-point) et qu'on ne le trouve pas dans `_1`-`_27`, regarder dans `_28`-`_54`.

---

## 2026-05-03 — `Cone_1` n'existe pas

**Erreur** : utilisé `Cone_1.png` partout en pensant que les variations commencent toutes à `_1`. Erreur 404.

**Cause racine** : Cone_* commence à `_3` (les `_1` et `_2` n'existent pas).

**Ce qu'il fallait faire** : `ls` la famille avant de hardcoder. Préférer `_3` qui est plus probable d'exister que `_1`.

**Familles connues à variants non-séquentiels** :
- `Cone_*` commence à `_3`
- `Mound_1_*` va de `_1` à `_8` (pas de `_9`)
- D'autres possibles, ne pas hardcoder sans `ls`.

---

## 2026-04-30 → 2026-05-04 — Composer aveuglément sans visualiser (méta-erreur)

**Erreur racine de toutes les autres** : pendant 4 sessions, j'ai écrit du code de composition de tiles (HTML canvas, Phaser) sans jamais ouvrir le rendu. Le user a vu les bugs avant moi.

**Cause racine** : présomption "compilation OK = rendu OK". Faux.

**Ce qu'il fallait faire (et que je fais maintenant)** :
1. Construire `render.py` (PIL → PNG) pour produire des rendus visualisables
2. Read le PNG après chaque modification
3. Auto-critique pixel par pixel avant de présenter au user

**Détection future** : si je m'apprête à présenter quelque chose au user **sans avoir vu un PNG concret**, je dois m'arrêter et générer le PNG d'abord.

---

## 2026-05-04 — Rond-point : _52 et _53 inversés, parking : bordures parasites

**Erreur 1 (rond-point)** : j'ai posé `_52` au SW et `_53` au SE en pensant que les noms `_52/_53` correspondaient à l'ordre alphabétique. En réalité **`_52` va en SE et `_53` en SW** (ordre LimeZu non-intuitif). Résultat : les arcs ne se rejoignaient pas, l'ensemble ne faisait pas un rond.

**Cause racine** : ne pas avoir testé le swap quand le rendu paraissait étrange.

**Détection future** : si le cercle pointillé ne forme pas un rond fermé → tester en INVERSANT BL/BR. Toujours tester les 2 ordres pour les compositions multi-quarts.

**Erreur 2 (parking)** : ajouté des rows `sw_6/sw_2` (transitions trottoir-asphalte) entre les places P et les trottoirs. Ces tiles affichent une bande d'asphalte avec une "marche" → visuellement = "route au-dessus/en-dessous des places". Les places P doivent être COLLÉES DIRECTEMENT au trottoir, pas séparées par une transition.

**Cause racine** : appliqué aveuglément la convention sw_2/sw_6 (qui marche pour les routes) au parking où elle n'est pas nécessaire.

**Règle** : les marquages au sol (P, BUS) sont conçus pour toucher directement le trottoir. Pas besoin de transition dédiée. Comme pour le bus avant.

---

## 2026-05-04 (suite) — Doubler les rebords trottoir-route est une ERREUR

**Erreur** : pour le bus et le parking, j'ai ajouté des cols/rows de transition sw_4/sw_8/sw_6/sw_2 entre les marquages BUS/P et le trottoir. Résultat visuel : 2 cols/rows d'asphalte parasites entre le trottoir et le marquage.

**Cause racine** : confusion entre "rebord trottoir-route" et "marquage BUS/P". Les marquages BUS (`_48`/`_49`) et P (`_45`/`_46`) **incluent déjà** leur bordure blanche dans le sprite. Ajouter sw_4/sw_8 par-dessus crée un doublon visuel.

**Détection future** : si on voit une bande d'asphalte entre le trottoir et le marquage = on a inséré un rebord en trop. Solution = supprimer la col/row de transition, le marquage va directement au contact du trottoir.

**Règle militaire** :
- Pour route nue (pas de marquage) : utiliser sw_4/sw_8 pour la transition trottoir-route.
- Pour route avec marquage BUS ou P : NE PAS ajouter sw_4/sw_8 — le marquage gère déjà sa bordure.

---

## 2026-05-04 (suite 2) — Il y a 6 styles Sidewalk, pas 1

**Erreur** : pendant 4 sessions je n'ai utilisé que `Sidewalk_1`. En réalité **Sidewalk_1 à Sidewalk_6** existent, chacun étant un STYLE COMPLET cohérent (54 variations chaque) :

- `Sidewalk_1` : crème classique
- `Sidewalk_2` : crème + bordure plus claire
- `Sidewalk_3` : gris béton (très contrasté)
- `Sidewalk_4` : gris clair
- `Sidewalk_5` : bleu clair (passage piéton ?)
- `Sidewalk_6` : gris ardoise

**Cause racine** : pas regardé la racine du dossier `2_City_Terrains_Singles_48x48` en entier — j'ai pris le 1er style et continué.

**Règle absolue** : NE JAMAIS MÉLANGER LES STYLES dans un même rendu. Choisir UN style pour la map (ou par zone : ex. Sidewalk_1 pour résidentiel, Sidewalk_3 pour centre-ville béton) et s'y tenir. Mélanger casse l'unité visuelle.

**Détection future** : avant de coder un pattern, ouvrir `compare_sidewalk_styles.png` (planche-comparaison). Choisir le style. Hardcoder un préfixe `STYLE = 'Sidewalk_3_'` et l'utiliser partout dans le snippet.

---

## 2026-05-04 (suite 3) — Import exhaustif du Theme Sorter

**Découverte** : le user a un dossier `temp/Design to sort/Modern_Exteriors_48x48/ME_Theme_Sorter_48x48/` avec **24 thèmes × singles + planches-contact = 6222 tiles** au total. C'est le tileset COMPLET LimeZu, déjà thématiquement rangé.

**Action** : `import_themes.py` copie tout dans `game/phaser/public/assets/tiles/themes/<NN>_<theme>/` avec `_index.json` qui liste les dimensions natives de chaque tile. Plus aucune raison d'aller chercher ailleurs.

**Règle** : à partir de maintenant, toute composition utilise les paths `themes/<NN>_<theme>/Sidewalk_<style>_<var>.png`. Anciens paths `roads/...` toujours supportés (copie partielle), mais préférer les nouveaux.

---

## 2026-05-04 (suite 4) — Le panneau bleu giratoire EXISTE et est dans `_54`

**Erreur** : j'ai laissé le rond-point sans îlot central, en pensant que `_54` était juste un "panneau" à poser à proximité.

**Cause racine** : la cartography étiquetait `_54` comme "panneau-sens-giratoire" sans préciser qu'il INCLUT déjà l'îlot beige circulaire.

**Découverte** : `_54` (3×4) = **îlot beige circulaire + poteau gris + panneau bleu rond giratoire**. C'est l'asset "centre-de-rond-point" complet. Se pose en (col=6, row=4) sur un rond-point 14×12 pour être centré.

**Détection future** : avant de classer un tile comme "panneau isolé", l'ouvrir et vérifier visuellement. Beaucoup d'assets multi-tiles incluent leur décor de fond.

---

## 2026-05-04 (suite 5) — Indexation EXHAUSTIVE des 6222 tiles

**Action** : `catalog_families.py` génère pour chaque thème une planche-contact PNG par famille avec numéro + dimensions. Sortie dans `tile-tools/families/<theme>/<family>.png` + `_families_index.json`.

**Stats** : 24 thèmes, **2220 familles, 6222 variants**. Les familles vont de 1 variant ("Sign.png" tout seul) à 54 variants (les 6 styles Sidewalk).

**Règle absolue** : avant de chercher un type de tile (panneau, banc, voiture, lampadaire), **regarder d'abord la planche de la bonne famille** dans `tile-tools/families/<theme>/`. Pas de Glob aveugle.

**Mapping rapide thème → contenu** :
- `01_terrains_and_fences` : herbes, terres, sables, clôtures, eau
- `02_city_terrains` : asphalte (1 famille), trottoirs (6 styles)
- `03_city_props` : 184 familles d'objets urbains (panneaux, bancs, lampadaires, hydrants, poubelles...)
- `10_vehicles` : 53 familles de véhicules (animés ET statiques)
- `13_school` : équipement scolaire
- `17_garden` : 354 familles de plantes/arbres
- `21_beach` : équipement plage
- etc.

---

## 2026-05-04 (suite 6) — Passages piétons _29-_36

**Découverte** : la cartography pré-existante étiquetait `_29/30/31/32` comme "courbe-trottoir-X" et `_33/34/35/36` comme "asphalte-arc-X". **C'est faux** :

- `_29-_32` (2×1) = **passage piéton VERTICAL** (pour route horizontale). _29 = haut, _30/31 = milieu, _32 = bas
- `_33-_36` (1×2) = **passage piéton HORIZONTAL** (pour route verticale). _33 = gauche, _34/35 = milieu, _36 = droite

Chacun inclut sa bordure trottoir blanche dans le sprite. Pose directement sur la route, pas besoin de transition autour.

**Détection future** : si la cartography étiquette quelque chose de "courbe-X" ou "arc-X", **l'ouvrir et regarder en x4** avant de l'utiliser. Beaucoup d'étiquettes initiales ont été inférées sans vérification visuelle.

---

## 2026-05-04 (suite 7) — Virages route 90° avec _11/_12/_13/_14

**Découverte (et correction de la cartography)** :
- `_11` = asphalte au NW + arc trottoir convexe au SE → coin INTÉRIEUR du virage = SE
- `_12` = asphalte au NE + arc trottoir convexe au SW → coin INTÉRIEUR = SW
- `_13` = trottoir au NW + arc asphalte concave au SE → coin INTÉRIEUR = NW
- `_14` = trottoir au NE + arc asphalte concave au SW → coin INTÉRIEUR = NE

**Convention de virage** : pour un virage 5×5 où la route fait un L, on identifie d'abord vers où pointe le **coin EXTÉRIEUR** du L. Le coin INTÉRIEUR est l'opposé. On pose l'arc correspondant (`_11`/`_12`/`_13`/`_14`) à la case unique du coin intérieur.

**Détection future** : "convexe" = trottoir qui rentre dans la route (`_11/_12`). "Concave" = asphalte qui rentre dans le trottoir (`_13/_14`). Pour un virage de route, on veut le coin TROTTOIR vers la route → convexe → `_11` ou `_12`.

---

## Méta-leçon : la cartographie d'abord, le code ensuite

À chaque fois que j'ai inventé un layout sans consulter `cartography.json` + `patterns.json`, j'ai fait des erreurs. À chaque fois que j'ai consulté avant, ça a marché.

**Règle** : avant tout snippet, ouvrir `cartography.json` (rôle exact) et `patterns.json` (recettes validées). Si le pattern existe déjà, copier-coller. Si pas, ajouter une nouvelle entrée APRÈS validation visuelle.

---

## 2026-05-08 — Virage route 5 cols : `_13` au coin intérieur, JAMAIS `_50`/`_53`

**Erreur** : pour un virage de route normale (chaussée 5 cols = 1 voie + 1 voie), j'ai voulu utiliser `_50`/`_53` (quarts de rond-point 7×6) pour avoir un coin intérieur "plus arrondi". Résultat : la zone trottoir compact du `_53` débordait sur la chaussée et créait des accrocs (asphalte fragmenté, pointillée centrale décalée, rebord trottoir cassé).

**Cause racine** : `_50`/`_53` sont conçus pour un **rond-point ENTIER** (asphalte plein partout, pas de chaussée structurée). Mélanger un quart de rond-point avec une route à voies (sw_4/sw_8/lignes pointillées) provoque des conflits géométriques car le rond-point a son propre layout interne.

**Solution validée** (test_virage_gauche.py 2026-05-08) :
- Chaussée 5 cols sur les 2 branches (1 trottoir + sw_4 + 1 asphalte axe + sw_8 + 1 trottoir)
- Pivot 3×3 asphalte plein à l'intersection
- Coin intérieur = arc `_13` (1×1) au coin SW si virage gauche, `_14` si virage droit, `_11`/`_12` si virage venant du nord
- Bord N (sw_6), bord E (sw_8) en angle droit au coin extérieur — c'est OK, ça matche le style LimeZu
- Pointillées centrales s'arrêtent à 1 case du pivot — pas de jonction L (LINE_L = `_5`/`_3`/`_7`/`_1`) sauf si vrai T/+ d'intersection

**Détection future** : si je veux utiliser un tile `_50`-`_53` dans un virage simple route → STOP. Ces tiles servent uniquement aux ronds-points complets (4 quarts + îlot central `_54`).

**Règle d'or virage route** : 
- Route 5 cols → arc `_11/_12/_13/_14` (1×1) au coin intérieur seulement.
- Rond-point complet → 4 quarts `_50/_51/_52/_53` (taille mini 14×12).
- Pas d'entre-deux. Si tu veux un virage "plus rond" qu'un arc 1×1, il faut élargir la chaussée à 7+ cols, ce qui n'est plus une "route normale".

---

## 2026-05-08 (suite) — `themes_overview/` montre les assemblages exemples du créateur (j'aurais gagné 1h)

**Contexte** : pendant 4 sessions à composer des virages, j'ai cherché les bonnes tiles à tâtons en ouvrant des images individuelles, en testant, en re-rendant, en corrigeant. J'ai même mal cartographié `_13`/`_14` (j'ai cru que c'étaient des coins INTÉRIEURS seuls alors que c'est une PAIRE EXT+INT).

**Découverte** (signalée par le user) : le dossier `game/web/tile-tools/themes_overview/<NN>_<theme>_48x48.png` contient **les planches d'assemblage du créateur LimeZu**. Pour chaque thème, une grande PNG avec des EXEMPLES de compositions réelles : virages routiers, ronds-points, parkings, voies bus… toutes assemblées par lui-même.

**Pour le virage** : la planche `2_City_Terrains_48x48.png` montre clairement un virage gauche fait avec 2 coins arrondis (= `_13` + `_14`). Si je l'avais regardée en premier, j'aurais identifié le pattern correct directement, sans perdre du temps à tester `_50`/`_53` (rond-point, faux-ami).

**Règle nouvelle** : **avant de composer quoi que ce soit, regarder `themes_overview/<theme>.png`**. C'est la première étape, avant cartography.json, avant patterns.json, avant tout. Le créateur a déjà fait des exemples — copier d'abord, comprendre ensuite.

**Hiérarchie de consultation** :
1. `themes_overview/<theme>_48x48.png` → vision globale + exemples d'assemblage LimeZu
2. `families/<theme>/<family>.png` → planche-contact d'une famille (54 variants)
3. Tiles individuelles → zoom pixel-perfect

**Détection future** : si je me retrouve à inventer un assemblage qui me paraît "bizarre" ou "compliqué", c'est qu'il y a probablement un exemple dans `themes_overview/` que je n'ai pas regardé.

---

## 2026-05-10 — Refonte map-mockups.html : remplacer les routes "asphalte randomisé" par les vraies recettes

**Erreur historique** : `game/web/map-mockups.html` contenait 11 cards de mockups Villejuif où les **routes étaient juste des asphaltes plain randomisés** (asphalt/asphalt2/asphalt3 avec `(r+c)%3`) sans bords trottoir, sans pointillées centrales, sans virages. Résultat : routes "plates" qui ne ressemblaient à rien.

**Refonte 2026-05-10** :
- `route_simple` (verticale) → utilise `swW`/`swE`/`dashV` + trottoirs `_25/_26/_9` mixés
- Nouvelle `route_h` (horizontale) → symétrique avec `swN`/`swS`/`dashH`
- `carrefour_t` → remplacée par **virage gauche complet** (recette validée par compo user)
- `max_adventure` (grosse croix au pif) → remplacée par **quartier_propre 16×12** : anneau routier complet avec 4 virages aux coins + 4 coins INT autour d'une pelouse centrale + toyhouse + bushes

**Tiles essentielles ajoutées au catalogue TILES de map-mockups.html** :
- `dashV/dashH` (= `Asphalt_1_Variation_15/14` - vrais marquages dashees)
- `lineH/lineV` + `pivotSW/SE/NW/NE` (= `Asphalt_1_Variation_2/4/1/3/5/7` - lignes continues + coins L pour pivots)
- `swN/S/W/E` (= `Sidewalk_1_6/2/4/8` - bords trottoir 1×1)
- `intSE/SW/NW/NE` (= `Sidewalk_1_1/3/5/7` - coins INT)
- `extSW/SE/NW/NE` (= `Sidewalk_1_11/12/13/14` - coins EXT)
- `sw_9/_25/_26` (trottoirs plain variantes anti-mono)
- `zebV/zebH` (= `Sidewalk_1_30/34` - passages piétons milieu sans rebord)

**Recette canonique** : `recipes/test_quartier_propre.py` produit le PNG de référence du quartier propre. À élargir pour la future map Max Adventure.

**Règle** : pour tout nouveau mockup de scène urbaine, partir des **recettes validées de patterns.js** (route_v_5cols, route_h_5rows, virages, rond_point, passage_pieton) et les composer. Ne plus jamais utiliser asphalt/asphalt2/asphalt3 randomisés sans bords trottoir.

---

## 2026-05-09 — Table de symétrie complète des 4 virages (validée pixel-perfect)

Après validation user du virage gauche (compo via tile-picker), génération des 3 autres par symétrie. **Tableau de référence absolue** :

| Virage | Conducteur | EXT (gros arc trottoir) | INT (petit triangle trottoir) | Pointillée coin L |
|--------|-----------|-------------------------|-------------------------------|-------------------|
| **GAUCHE** | SUD → OUEST | NE = `Sidewalk_1_14` | SW = `Sidewalk_1_3` | SE = `Asphalt_1_Variation_3` |
| **DROIT** | SUD → EST | NW = `Sidewalk_1_13` | SE = `Sidewalk_1_1` | SW = `Asphalt_1_Variation_1` |
| **HAUT-GAUCHE** | NORD → OUEST | SE = `Sidewalk_1_12` | NW = `Sidewalk_1_5` | NW = `Asphalt_1_Variation_5` |
| **HAUT-DROIT** | NORD → EST | SW = `Sidewalk_1_11` | NE = `Sidewalk_1_7` | NE = `Asphalt_1_Variation_7` |

**Règle mnémotechnique** :
- Coins EXT (gros arcs `_11` à `_14`) : numéro = direction du coin (11=SW, 12=SE, 13=NW, 14=NE)
- Coins INT (petits triangles `_1`/`_3`/`_5`/`_7`) : impair = position du trottoir (1=SE, 3=SW, 5=NW, 7=NE)
- Coins L pointillée centrale (`Asphalt_1_Variation_1` à `_8`) : même logique que INT (1=SW, 3=SE, 5=NW, 7=NE)

**Recettes validées** :
- `recipes/test_virage_gauche.py` (compo user originale)
- `recipes/test_virage_droit.py` (miroir horizontal)
- `recipes/test_virage_haut_gauche.py` (miroir vertical)
- `recipes/test_virage_haut_droit.py` (double miroir)

**Pivot 10×10** : branche horizontale rows 1-3 + branche verticale col 4 (pour gauche/HG) ou col 5 (pour droit/HD). Bords trottoir 1×1 (`_2`/`_4`/`_6`/`_8`) entourent l'asphalte. Les 4 virages sont **interchangeables** (mêmes dimensions, juste l'orientation change).

---

## 2026-05-08 (suite 4) — VRAIE CARTOGRAPHIE de Sidewalk_1_1-_8 et Asphalt_1_1-_8 (révélée par compo user dans tile-picker)

**Contexte** : le user a composé un virage gauche dans tile-picker et m'a envoyé l'export Python. En analysant cellule par cellule, j'ai découvert que ma cartographie de `Sidewalk_1_1` à `_8` ET `Asphalt_1_Variation_1` à `_8` était **entièrement fausse**.

**Vraie sémantique** (validée par zoom x5 du 2026-05-08) :

### Sidewalk_1 (1-8) = bords/coins fins de trottoir sur fond asphalte

| Tile | Vrai contenu | Usage |
|------|--------------|-------|
| `_1` | Petit coin trottoir SW (fine bande bas-gauche) | Coin INT NE d'un virage |
| `_2` | Bande trottoir bas (`sw_S`) | Bord S d'asphalte |
| `_3` | Petit coin trottoir SE (fine bande bas-droite) | **Coin INT SW d'un virage gauche** ⭐ |
| `_4` | Bande trottoir vertical gauche (`sw_W`) | Bord W d'asphalte |
| `_5` | Petit coin trottoir NW (fine bande haut-gauche) | Coin INT SE d'un virage |
| `_6` | Bande trottoir haut (`sw_N`) | Bord N d'asphalte |
| `_7` | Petit coin trottoir NE (fine bande haut-droite) | Coin INT SW d'un virage (alternative à `_3`) |
| `_8` | Bande trottoir vertical droit (`sw_E`) | Bord E d'asphalte |

**Erreur précédente** : je pensais que `_11/_12` étaient les coins INT et `_3/_5/_7` étaient des marquages. **C'est l'inverse** — `_3/_5/_7/_1` sont les VRAIS coins INT 1×1 (petit triangle trottoir au bon coin de la tile).

### Asphalt_1_Variation (1-8) = pointillées L pour intersections + lignes droites

| Tile | Vrai contenu | Usage |
|------|--------------|-------|
| `_1` | Pointillée coin SW (L qui ouvre vers SE) | Pointillée centre intersection coin |
| `_2` | Ligne pointillée horizontale longue | Pointillée centre route H |
| `_3` | Pointillée coin SE (L qui ouvre vers SW) | **Pointillée coin virage gauche au pivot** ⭐ |
| `_4` | Ligne pointillée verticale longue | Pointillée centre route V |
| `_5` | Pointillée coin NW (L qui ouvre vers NE) | Pointillée coin virage |
| `_6` | Ligne pointillée horizontale (variant) | Idem `_2` |
| `_7` | Pointillée coin NE (L qui ouvre vers NW) | Pointillée coin virage |
| `_8` | Ligne pointillée verticale (variant) | Idem `_4` |
| ~~`_14`~~ | ~~Ligne pointillée DASHEE H (tirets)~~ **OBSOLÈTE — voir correction 5 du 2026-05-10 : `_14` = H SALE, vrai défaut H = `_2`** | Anti-mono H (≤ 10-20 %) |
| `_15` | Ligne pointillée DASHEE V (tirets) | Anti-mono V (≤ 10-20 %) |

~~**Découverte clé** : la différence entre `_2` (ligne longue) et `_14` (tirets discontinus) est que `_14` est le **vrai marquage centre-de-route** (loi française), tandis que `_2`/`_4` sont des **lignes continues** pour les coins/intersections.~~ **OBSOLÈTE — correction 5 du 2026-05-10** : la lecture inverse est correcte. `_2` est la ligne H propre/nette (défaut centre route H). `_14` est la version sale/baveuse. La distinction "longue vs tirets" était une hallucination à petite échelle.

### Sidewalk_1_25/_26/_27 = trottoirs plain VARIANTES (anti-mono)

Avant je n'utilisais que `_9` partout. En réalité :
- `_9` = trottoir plain de base
- `_25/_26/_27` = trottoirs plain avec **petits motifs** (plaques béton, joints différents)

**Règle anti-mono** : pour tout trottoir > 4 cases consécutives, mélanger `_9/_25/_26/_27` aléatoirement pour casser la répétition visuelle. **[OBSOLÈTE - voir 2026-05-10 refonte propre]** — désormais : trottoir plain net uniforme par défaut, béton = surface construite donc uniforme.

### Méta-leçon

**Le tile-picker + compo user est l'outil le plus puissant que j'ai pour corriger ma cartographie**. En 2 minutes, le user m'a appris la vraie sémantique de 18+ tiles que j'avais mal classées pendant 4 sessions. **Quand on tâtonne ≥ 2 fois, demander une compo user** — c'est plus rapide et plus fiable que mes hypothèses.

---

## 2026-05-08 (suite 3) — CARTOGRAPHIE CORRIGEE de `_11/_12/_13/_14` après 3 erreurs successives

**Erreur récurrente** : pendant 3 sessions j'ai re-cartographié `_11/_12/_13/_14` à chaque fois différemment, en me trompant à chaque fois. Cause racine : je ne zoomais pas sur l'image individuelle, je devinais d'après le contexte.

**Vérité visuelle pixel-perfect** (zoom x6 du 2026-05-08, validée par rendu+test) :

| Tile | Contenu | Usage virage |
|------|---------|--------------|
| `_11` | Asphalte plein + **petit triangle trottoir au SE de la tile** + arc concave | Coin INT du virage où la pointe trottoir est au SE (= virage haut-droit avec sortie EST) |
| `_12` | Asphalte plein + **petit triangle trottoir au SW de la tile** + arc concave | **Coin INT du virage GAUCHE (SUD→OUEST), à poser en (col_pivot-1, row_pivot+3) = la cellule SW du pivot** |
| `_13` | **Trottoir massif sur la moitié haute** de la tile + arc descendant (transition horizontale) | **Coin EXT du virage où le trottoir massif est au NW** (= virage venant du sud sortie est) |
| `_14` | **Trottoir massif sur la moitié haute** + arc descendant côté droit | **Coin EXT du virage GAUCHE (SUD→OUEST), à poser en (col_pivot+3, row_pivot-1) = cellule NE du pivot** |

**Règle absolue désormais** :
- `_11/_12` = **petits triangles trottoir au coin BAS** de la tile (S+SE ou S+SW). Servent au coin INT du virage où le trottoir convexe est en bas.
- `_13/_14` = **trottoir massif sur la moitié HAUTE** de la tile. Servent au coin EXT du virage où le trottoir massif est au-dessus.
- **JAMAIS** mélanger : `_13` n'est PAS le coin INT, c'est le coin EXT. `_12` n'est PAS le coin EXT, c'est le coin INT.

**Mapping virage gauche (SUD→OUEST, EXT=NE, INT=SW)** :
- Coin EXT NE = `_14` (trottoir massif au NE de la tile)
- Coin INT SW = `_12` (trottoir au SW de la tile)

**Détection future** : si le rendu montre un trottoir blanc qui DÉPASSE moche au-dessus de la branche d'asphalte (ex : col=5 row=9 où on attendait du trottoir au SW mais on voit du trottoir au N), c'est qu'on a confondu `_13` avec `_12`. Inverser.

**Hypothèses pour les 3 autres virages** (à tester visuellement avant publication) :
- Virage droit (SUD→EST) : EXT=NW=`_13` / INT=SE=`_11` ?
- Virage haut-gauche (NORD→OUEST) : EXT=SE=`_11` / INT=NW=? (besoin d'une tile trottoir massif BAS, qui n'existe peut-etre pas dans cette serie)
- Virage haut-droit (NORD→EST) : symetrique

---

## 2026-05-08 (suite 2) — `_13`/`_14` sont des coins ARRONDIS, pas des "arcs intérieurs" [OBSOLETE - voir suite 3 pour la cartographie corrigee]

**Erreur de cartographie** : pendant tout 2026-05-04 j'ai documenté `_13` et `_14` comme "arcs trottoir convexe au coin intérieur" (sous-entendu UN SEUL arc à poser au coin intérieur du virage). C'est une **lecture incomplète**.

**Vérité visuelle** (zoom planche x4 du 2026-05-08) :
- `_13` = trottoir massif dans le **HAUT-GAUCHE de la tile** (NW) + asphalte qui sort en bas-droite avec une **courbe concave** = à poser au coin **INTÉRIEUR SW** d'un virage où l'asphalte rentre dans le trottoir.
- `_14` = symétrique = trottoir massif **HAUT-DROITE** (NE) + courbe = à poser au coin **EXTÉRIEUR NE** d'un virage où le trottoir convexe sort vers la route.
- `_11`/`_12` = symétriques bas (S+SW / S+SE) — coins arrondis bas.

**Découverte clé** : ces tiles sont conçues pour s'utiliser **en PAIRE** sur un virage 90°, **un coin ARRONDI à chaque extrémité du L** (extérieur ET intérieur). Pas juste l'intérieur. Résultat : virage doux des 2 côtés, style cartoon-route.

**Tableau d'utilisation pour virage gauche (SUD→OUEST, coin EXT=NE, coin INT=SW)** :
| Cellule | Tile | Rôle |
|---------|------|------|
| (col=9, row=5) | `_14` | coin EXT NE arrondi |
| (col=5, row=9) | `_13` | coin INT SW arrondi |
| `sw_6` cols 0-8 row=5 | `_6` | bord N branche OUEST (s'arrête col 8) |
| `sw_8` rows 6-17 col=9 | `_8` | bord E branche SUD (démarre row 6) |
| `sw_2` row=9 cols 0-4 | `_2` | bord S branche OUEST (s'arrête col 4) |
| `sw_4` col=5 rows 10-17 | `_4` | bord W branche SUD (démarre row 10) |

**Pour les 3 autres virages** (mirroir) :
- Virage droit (SUD→EST) : EXT=NW=_13 / INT=SE=_14 ? → à TESTER, hypothèse miroir gauche/droite.
- Virage haut-gauche (NORD→OUEST) : EXT=SE=_11 / INT=NW=_12 ? → à TESTER.
- Virage haut-droit (NORD→EST) : EXT=SW=_12 / INT=NE=_11 ? → à TESTER.

**Détection future** : si un virage 90° rendu visuellement "fait sec / 90°", tester d'ajouter `_13`/`_14` (ou paire `_11`/`_12`) aux DEUX coins, pas juste l'intérieur.

**Validé** : `recipes/test_virage_gauche.py` 2026-05-08 → rendu cartoon doux des 2 côtés, sans accroc.

---

## 2026-05-08 — Outil debug visuel : `render_debug.py`

**Action** : ajout de `scripts/render_debug.py` qui rend un snippet AVEC une grille rouge + coordonnées col/row jaune. Fait gagner un temps fou pour vérifier "qu'est-ce qu'il y a en (col=5, row=9) ?" sans avoir à compter les pixels.

---

## 2026-07-13 (leçons L-A à L-E + alerte reviewer) — Ville virage bus v5 validée + sémantique marquages + PIPELINE-MEMORY + anti-pattern référence

### Leçon L-A : SÉMANTIQUE MARQUAGES — Asphalt_1_Variation_{1,3,5,7} = COINS DE MARQUAGE POINTILLÉ, PAS D'ASPHALTE ARRONDI

**Découverte le 2026-07-13** : confusion massive sur le rôle de `Asphalt_1_Variation_1/3/5/7`. Interprétation fausse (v1-v4) : "coin asphalte arrondi pour lisser les transitions".

**Réalité** : ces tiles sont des **COINS de MARQUAGE pointillé** (ex lignes centrales H qui tournent en V au virage). Elles servent à **faire tourner une ligne pointillée** (ligne horizontale → coin → ligne verticale), PAS à arrondir l'asphalte elle-même.

**Correction sémantique** :
- `A1` = coin pointillé NW (ligne descend, tourne ouest)
- `A3` = coin pointillé NE (ligne descend, tourne est)
- `A5` = coin pointillé SW (ligne monte, tourne ouest)
- `A7` = coin pointillé SE (ligne monte, tourne est)
- `A2` / `A4` / `A8` = lignes droites (H / V pointillés)

**L'arrondi physique du virage vient ailleurs** :
- **Extérieur** : `Sidewalk_1_11/12/13/14` = arcs trottoir convexes (le coin extérieur du L a un beau demi-cercle)
- **Intérieur** : `Sidewalk_1_1/3/5/7` = petits triangles trottoir concaves (le coin intérieur rentre dans la chaussée)

**Règle gravée** : ne JAMAIS utiliser `A1/3/5/7` pour "lisser" l'asphalte. SEULEMENT pour **faire tourner une ligne pointillée**.

**Coût de la non-détection** : v3-v4 du virage bus ont versé 4 itérations d'ajustements qui n'auraient pas existé si j'avais compris la sémantique dès le départ.

**Détection future** :
- Si tu emploies `A1/3/5/7` SANS avoir une ligne pointillée qui change de direction à ce pixel, c'est **FAUX**.
- Le PNG final doit montrer une ligne pointillée qui **continue visuellement** à travers la tile de coin.

---

### Leçon L-B : MULTI-TILES EN OBJECTS OBLIGATOIRE — render.py peint ground rangée par rangée, tile > 48×48 se fait ÉCRASER

**Découverte le 2026-07-13** : en v2-v4 du virage bus, un multi-tile `SW47 (BUS, 7×3)` poste en **ground** se faisait **écrasé par les rangées suivantes** (rangées suivantes ré-écrivaient par-dessus le PNG du BUS).

**Raison** : `render.py` peint le ground en **order rangée par rangée** (row 0, row 1, …, row N). Chaque `PIL.Image.paste(tile, xy)` écrase ce qui était avant si les rangées se chevauchent. Un multi-tile en ground sur la rangée 4-6 se fait effacer quand on peint la rangée 5-6 ensuite.

**Correction** : les multi-tiles (SW47 BUS 7×3, SW23/24 bordures 1×3, abribus 5×3, panneaux) **vont obligatoirement en `objects`** — liste d'objets peints **après** le ground entièrement rendu. Ordre de la liste = ordre d'occlusion (dessiner d'abord les éléments au fond, puis les éléments au premier plan).

**Application dans test_ville_virage_bus.py** :
```python
objects = [
    (0, 4, SW23),             # barre gauche cadre BUS
    (1, 4, SW47),             # "BUS" 7×3 — après SW23, donc devant
    (8, 4, SW24),             # barre droite
    (3, 1, BUS_STOP_ABRI),    # abribus 5×3 (cols 3-7, rows 1-3)
    (8, 1, BUS_STOP_PANNEAU), # panneau 1×3
]
```

**Règle gravée** : 
- **Tiles 1×1 (48×48 px uniquement)** → ground OK
- **Tout ce qui dépasse 48×48 (multi-tiles)** → objects OBLIGATOIRE

**Détection future** :
- Si un multi-tile disparaît ou se fait écraser au rendu, vérifier qu'il est bien en `objects`, pas en `ground`.
- Script helper : `scripts/check_multitiles.py` qui lint automatiquement et signale les multi-tiles mal placés.

---

### Leçon L-C : REFS PAPA = SOURCE UNIQUE DES BLOCS ROUTE — jamais composer une route "au pif" depuis les abstractions vocab.py

**Découverte le 2026-07-13** : toutes les 4 itérations ratées (v1-v4) du virage bus venaient de la même cause : **composer une route horizontale SANS vérifier la référence exacte** dans `test_papa_route_large.py`.

**Ce qui marche** : copier PILE le profil des références Papa Yann (3 recettes de référence absolue) :

1. **`test_papa_route_large.py`** — profil route H avec stop BUS :
   ```
   Trottoir nord (SW9)
   ↓
   Ancrage cadre BUS (rangée trottoir → bordurette → asphalte)
   ├─ SW9 (trottoir)
   ├─ SW19 (bordurette biseautée) 
   ├─ A2 (pointillés)
   ├─ SW2 (bordure sud)
   └─ SW9 (trottoir sud)
   ```
   **DÉTAIL CRITIQUE** : le cadre BUS (SW23 + SW47 + SW24) **s'ancre sur la DERNIÈRE rangée de trottoir nord** — son art couvre trottoir + bordurette + première rangée d'asphalte.

2. **`test_ref_papa_carrefour.py`** — profil route V + profil croisement :
   ```
   Coin INTÉRIEUR = Sidewalk_2_3 (jonction), puis Sidewalk_2_4, puis SW4
   ```
   **Point-clé** : jamais SW1 seul au coin intérieur d'un croisement, toujours une **transition douce** sur 3 cellules.

3. **`test_ref_papa_4virages.py`** — 4 virages 90° complets :
   ```
   Coin EXTÉRIEUR arrondi : SW14 (arc trottoir) en (col, row-1), puis SW8 (bord Est) en (col, row).
   Asphalte arrondie : A3 en coin diagonal.
   ```

**Règle gravée** : 
- **INTERDIT** : composer une route depuis les noms abstraits de `vocab.py` ("BORDURE_NORD", "POINT_INT_CENTER", etc.)
- **OBLIGATOIRE** : Read les 3 PNG de ref Papa Yann, copier PILE la structure, adapter seulement les dimensions

**Détection future** :
- Si je dis "je vais composer une ville à partir de vocab.py", bloquer : "As-tu d'abord validé la structure contre test_papa_route_large.py ET test_papa_carrefour.py ?"
- Checker : les refs doivent être ouvertes côte à côte avec le nouveau rendu pendant la compo.

---

### Leçon L-D : ANTI-PATTERN CONFIANCE LABELS — 4 itérations ratées faute de relire les PNG refs, les labels vocab.py sont partiellement faux

**Découverte le 2026-07-13** : 4 itérations d'agents designers composant depuis LABELS (COURBE_EXT_NE = SW14, POINT_INT_SW = SW3, etc.) au lieu de **relire visuellement le PNG de chaque ref**.

**Le piège** : `cartography.json` historique + `vocab.py` ont des labels **partiellement faux** ou **mal interprétés** (ex `SW_14 = "grosse courbe NE"` → OK − mais on ne vérifiait pas si c'était CONVEXE ou CONCAVE en regardant le PNG).

**Preuve du dégât** :
- v1 designer : utilise label "POINT_INT_CENTER" → agent composer directement sans PNG
- Résultat : tile entièrement fausse visuellement (confuse deux variantes symétriques)
- v2-v4 : même pattern, on teste des variations du même mauvais empilement

**Correction** :
1. Read le PNG originel de chaque tile candidate (**image 48×48** pas label)
2. Comparer visuellemen**t** avec le contexte adjacent (n'est-ce qu'une convexe ou concave ?)
3. Render en mini-contexte 3×3 avec trottoir + asphalte autour
4. Valider avec Papa Yann le rendu **avant** de l'utiliser en macro

**Règle gravée** : 
- Labels = guide seulement, **pas source de vérité**
- Source de vérité = PNG orig + rendu mini-contexte + oeil humain

**Détection future** :
- Quand un reviewer remet FAIL sur une compo "tile cassée" alors qu'on a copié la référence papa, demander : "Le reviewer a-t-il lui-même Read le PNG originel ou il juge sur label ?"
- Challenger systématiquement les verdicts reviewer contre les refs visuelles.

---

### Leçon L-E : REVIEWER À CHALLENGER — un reviewer a rendu FAIL 4/10 avec claims hallucinés, un autre PASS 10/10 sur map rejetée Papa Yann

**Découverte le 2026-07-13** : en session orchestration virage bus :
- **Reviewer A** : verdict FAIL 4/10 avec des claims du type *"SW14 n'existe pas"* (hallucination, la tile existe) + *"passage piéton pas aliné"* (affirmation basée sur label, pas sur PNG).
- **Reviewer B** : verdict PASS 10/10 sur une v3 que Papa Yann a ensuite rejetée ("BUS trop bas").

**Constat** : le verdict du reviewer **n'est PAS une vérité**. C'est **un avis d'agent** basé sur des règles qui peuvent être :
- Incomplètes (pas tous les critères d'alignement)
- Mal appliquées (confondre 2 labels de tile symétriques)
- Hallucinées (affirmer qu'une tile n'existe pas quand elle existe)

**Corollaire** : l'orchestrateur doit **vérifier les claims du reviewer** contre le code + PNG réel avant de croire une certification.

**Procédure introduite** :
1. Reviewer rend FAIL → orchestrateur lit le code + PNG originel + compares avec critique
2. Si reviewer cite "tile X n'existe pas" → vérifier avec `ls` que X existe
3. Si reviewer dit "passage piéton sur trottoir" → lire les coordonnées exact dans code + Read PNG du virage
4. Si verdict diverge de Papa Yann → annoncer explicitement "reviewer PASS vs Papa REJECT" et demander debug.

**Règle gravée** : 
- Reviewer = **first-pass automate**, pas juge final
- Papa Yann = **juge final** (visuel, retour utilisateur)
- Orchestrateur = **arbitre** qui valide les claims reviewer avant d'accepter un verdict

**Détection future** :
- Si reviewer remet FAIL avec des claims spécifiques, créer une checklist mini : "Pour chaque claim, vérifier : (1) code dit X ?, (2) PNG confirme X ?, (3) Papa Yann acceptable ?"
- Implémenter un `verify_reviewer_claim.py` qui lint automatiquement les critiques du reviewer.

---

### Alerte : Anti-pattern reviewer détecté (recommandé pour PIPELINE-MEMORY.md)

Entrée à gravera dans `site/tile-tools/PIPELINE-MEMORY.md` § 3 (Frictions résolues) :

**F-005 : Reviewer verdict vs orchestrateur vérité**
- **Symptôme** : reviewer remet PASS/FAIL sur des critères qui peuvent être hallucinés ou basés sur des labels faux
- **Cause** : reviewer ne lit pas les PNG originels, utilise les labels cartography.json qui sont partiellement obsolètes
- **Résolution en session 2026-07-13** : orchestrateur valide chaque claim reviewer (ls tile, Read PNG, compares avec code) avant d'accepter
- **Pattern gravé** : "reviewer = first-pass, pas vérité. Toujours valider contre PNG originel + Papa Yann."

**Règle** : pour tout nouveau pattern non-trivial (≥ 2 zones d'asphalte, ≥ 1 arc, ≥ 1 transition), produire D'ABORD le rendu debug, vérifier la grille, PUIS le rendu final. Le PNG debug n'est pas livré au user, c'est uniquement pour ma validation.
