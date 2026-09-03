---
name: maxplay-tiles
description: Règles non-négociables pour utiliser le tileset LimeZu Modern Exteriors dans MaxPlay (jeu Phaser + map-mockups + tile-library). Auto-trigger sur tile, tileset, map, LimeZu, pixel-map, mockup, Modern Exteriors, asphalt, sidewalk, toyhouse, bus stop tile, sandbox scene, max adventure render.
---

# MaxPlay — Tileset LimeZu Modern Exteriors : règles vécues

Ce skill consigne les **erreurs déjà commises** sur le projet MaxPlay et les **règles à appliquer aveuglément** pour ne plus les refaire.

---

## ⭐ RÈGLE #1 — Utiliser `vocab.py` comme SOURCE UNIQUE (depuis 2026-05-11, EP-VOCAB)

Avant de produire la moindre recette `test_*.py` :

```python
# ✅ FAIRE
from vocab import ROUTE_H_PROPRE, ROUTE_V_PROPRE, TROTTOIR_PLAIN, BORD_NORD, BORD_SUD, ...

ground = [
    [TROTTOIR_PLAIN] * cols,
    [BORD_NORD] * cols,
    [ROUTE_H_PROPRE] * cols,
    ...
]

# ❌ NE PLUS FAIRE (jusqu'à 2026-05-10, source d'erreurs systématiques)
ASPH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
```

**Pourquoi** : `cartography.json` contient des erreurs historiques (deprecated 2026-05-11). Les noms cryptiques `_2`/`_14`/`_8`/`_15` provoquent des confusions à répétition (voir LESSONS correction 5 + correction 7). `vocab.py` est la **seule** source à jour, validée au boot (`python vocab.py`).

**Fichier** : [`game/web/tile-tools/vocab.py`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tile-tools/vocab.py)

Pour les routes droites simples uniquement, on peut utiliser les macros : [`game/web/tile-tools/builders.py`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tile-tools/builders.py) (`route_h()`, `route_v()`).

⚠️ **Pour les compositions complexes** (carrefour, virage, immeuble, parc, rivière, pont…), **ne pas inventer** — voir Règle #2.

---

## ⭐ RÈGLE #2 — 0-invention sur la composition esthétique (depuis 2026-05-11)

**Quand Papa Yann demande "fais-moi un carrefour" ou "un immeuble + parc + rivière"** :

1. **Chercher d'abord une référence visuelle externe** — screenshots LimeZu officiel (itch.io), tutos YouTube LimeZu, maps Pokemon, samples LDtk, Google Maps Villejuif, photos terrain
2. **Proposer 2-3 refs à Papa Yann pour validation** avant de toucher au code
3. **Reproduire fidèlement la ref validée** dans une recette utilisant `vocab.py`
4. La recette devient le snippet réutilisable, validée par Papa Yann visuellement

**Pourquoi cette règle existe** : tenter d'inventer "comment doit-être un beau carrefour" reproduit l'œil de Claude, pas celui de Papa Yann. Les recettes existantes (`test_carrefour_4voies`, `test_virage_*`, etc.) sont **pas OK visuellement** selon Papa Yann (verdict 2026-05-11 nuit). On ne peut donc pas les copier comme références.

**EP-REFS** (backlog) : banque de références visuelles tile-tools à constituer en session dédiée.

**Pattern gravé** : "on copie ce qui marche déjà et que l'utilisateur valide, on n'invente pas le beau".

---

## 🎨 OUTIL : tile-picker.html (bibliothèque visuelle catégorisée + matrice 10×10)

Quand le user dit "je veux une composition X" et que je ne suis pas sûr des bonnes tiles à utiliser, **lui demander de composer la matrice via tile-picker.html** :
- [`game/web/tools/tile-picker.html`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tools/tile-picker.html) (path 2026-05-10 : déplacé dans `tools/`)
- **5 catégories** : 🛣️ Rue · 🌳 Parc · 🌸 Jardin · 🏠 Building · 🌲 Forêt — onglets en haut de la biblio
- ~3500 tiles indexés depuis `roads/`, `parks/`, `buildings/`, `props/`, `stations/`
- Filtre par numéro/nom + filtre catégorie cumulatifs
- Matrice configurable (10×10 par défaut) avec drag&drop ou click cellule
- Bouton "Export Python" → produit le code `ground = [[...]]` à coller dans une recipe `test_X.py`. Les paths exportés sont **relatifs au dossier `tiles/`** (ex `'parks/foo.png'`), compatibles avec `render.py`.
- Click droit sur cellule = efface

## 🦺 MINI-JEU KIDS : mj-pose-tiles.html (pour Max)

[`game/web/mj-pose-tiles.html`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/mj-pose-tiles.html) — version simplifiée du tile-picker pensée pour enfant 4 ans :
- Grille 8×8, tap-friendly (cellules 60×60+)
- 5 catégories avec icônes emoji
- Palette réduite (5-6 tiles par cat) pour ne pas saturer
- Bouton 🦺 "Lisser" qui pose automatiquement sw_2/4/6/8 autour des asphaltes posées
- Bouton 🚧 "Effacer" + bouton 🎉 "Fini !" avec animation
- Persistence localStorage

**Quand l'utiliser** :
- User veut un nouveau pattern et l'agencement n'est pas évident
- User dit "ce n'est pas la bonne tile" 2x de suite → arrêter de tâtonner, demander une composition
- Validation rapide d'une hypothèse de cartographie (poser la tile, voir le résultat sans coder)

---

## 🧱 PATTERN MODULAIRE — bas / milieu / haut (logique LimeZu universelle)

LimeZu structure la plupart des assets en **3 morceaux empilables** :
- **Bord NORD/HAUT** : termine en haut (rebord supérieur, toit)
- **MILIEU** : répétable autant de fois qu'on veut (tronc, étage, milieu de chaussée)
- **Bord SUD/BAS** : termine en bas (rebord inférieur, sol)

### Exemples vérifiés

| Pattern | Bord N | Milieu (répété) | Bord S |
|---------|--------|-----------------|--------|
| Passage piéton vertical (route H) | `_29` (avec rebord) ou rien | `_30` ou `_31` | `_32` (avec rebord) ou rien |
| Passage piéton horizontal (route V) | `_33` (gauche) ou rien | `_34` ou `_35` | `_36` (droite) ou rien |
| Bâtiment (à confirmer) | toit | étage répété | sol/porte |
| Voie BUS verticale | extrémité | `_48`/`_49` répétés | extrémité |

### Règle d'application

**Avant d'utiliser un asset multi-tiles**, identifier les 3 morceaux :
1. Le **milieu propre** (souvent celui dont les rebords sont neutres) → c'est lui qu'on RÉPÈTE.
2. Si l'asset doit être au contact direct d'un trottoir/route, **omettre les bords N/S** (le milieu se raccorde directement).
3. Si l'asset est isolé sur fond asphalte sans contact trottoir, alors poser N + milieu + S.

**Détection** : si une composition affiche un **rebord blanc qui dépasse moche** au contact d'un trottoir, c'est qu'on a posé un bord N/S inutile. Remplacer par du milieu propre.

---

## 🧭 RÈGLE D'OR DE CARTOGRAPHIE — raisonnement géométrique systématique

**Avant de poser une tile dans une cellule du canvas**, toujours dérouler ce raisonnement explicitement :

1. **Quelle cellule** dans le canvas ? Coordonnées `(col, row)` précises.
2. **Que doit contenir cette cellule** visuellement ?
   - Quelle moitié/coin doit être en TROTTOIR (extérieur de la map / extérieur du L) ?
   - Quelle moitié/coin doit être en ASPHALTE (chaussée) ?
3. **Quelle tile a cette répartition exacte** ?
   - Ouvrir la tile candidate en zoom (Read + zoom x6) **avant** de l'écrire dans le code.
   - Si je ne vois pas clairement où est le trottoir et l'asphalte dans la tile, je n'ai pas le droit de l'utiliser.
4. **Vérifier après render** : la tile posée fait-elle exactement ce que mon raisonnement prévoyait ?

### Exemple concret — coin INTÉRIEUR SW d'un virage gauche

```
Cellule canvas    : (col=5, row=9) - juste sous le pivot, à gauche de la branche SUD
Trottoir attendu  : SW de la tile (vers l'extérieur du L = bas-gauche)
Asphalte attendu  : NE de la tile (vers la chaussée = haut-droite)
Tile recherchée   : trottoir en BAS-GAUCHE + asphalte en HAUT-DROITE avec arc concave
                  → c'est _12 (PAS _13 qui est trottoir massif EN HAUT)
```

**Ne JAMAIS** poser une tile en se basant uniquement sur son numéro ou son nom dans la cartography. La cartography peut être fausse — l'image individuelle, elle, ne ment pas.

### Règle de VOISINAGE — chaque tile doit raccorder visuellement avec ses 4 voisines

Pour chaque cellule `(c, r)`, lister explicitement ce qu'il y a dans :
- `(c, r-1)` voisin **NORD** : qu'est-ce qui touche le bord HAUT de ma tile ?
- `(c, r+1)` voisin **SUD** : qu'est-ce qui touche le bord BAS ?
- `(c-1, r)` voisin **OUEST** : qu'est-ce qui touche le bord GAUCHE ?
- `(c+1, r)` voisin **EST** : qu'est-ce qui touche le bord DROIT ?

Pour chaque côté de ma tile candidate :
- Si voisin = trottoir plain → mon bord doit être trottoir.
- Si voisin = asphalte plain → mon bord doit être asphalte.
- Si voisin = transition (ex `sw_4` = trottoir-G/asphalte-D) → mon bord doit raccorder pile sur la couleur que touche ce voisin.

**Le trottoir doit être LISSE et CONTINU** — pas de pic, pas d'éperon, pas de bave qui dépasse. Si je vois un pixel blanc isolé qui sort du trottoir vers la chaussée, c'est qu'une frontière de tile est cassée.

**Détection de bug** : si je dois "expliquer" pourquoi un débordement est normal, c'est qu'il n'est pas normal. Le LimeZu est designé pour s'assembler proprement — si le rendu paraît cassé, c'est qu'on a posé la mauvaise tile, pas que le tileset est cassé.

### Méthode RECETTES de validation visuelle (séquence à dérouler avant de soumettre)

1. **Tracer le contour de la chaussée** : fait-il un L ou un T ou un + propre, sans débordement ?
2. **Vérifier la continuité du trottoir** : si je suis le pourtour de la map en suivant la chaussée, le trottoir est-il continu ou a-t-il des trous/pics ?
3. **Vérifier les pointillées centrales** : centrées sur l'axe ? S'arrêtent-elles à la bonne distance du pivot ?
4. **Zoomer sur chaque coin/jonction** : le pixel-art doit être pixel-perfect. Aucune transition ne doit "baver".
5. **Comparer à la planche `themes_overview/<theme>.png`** : si LimeZu a un exemple, le rendu doit lui ressembler.

Si une seule case n'est pas validée → **ne pas soumettre**, itérer.

### Anti-pattern fondamental à fuir (cartographie)

**"J'ai cartographié _13 comme coin INT, donc je le pose au coin INT."** → FAUX. La cartographie peut avoir été établie sur une mauvaise lecture visuelle. **Re-zoomer la tile à chaque utilisation** si on n'est pas 100% sûr de sa géométrie.

**Détection** : si après render je vois un trottoir blanc qui DÉPASSE moche dans la chaussée, ou un asphalte qui mange un trottoir, c'est presque toujours qu'on a confondu deux tiles symétriques (`_11`↔`_12`, `_13`↔`_14`, `_4`↔`_8`).

---

## 🔄 WORKFLOW "Propose → Édite → Apprend"

Pour les compositions complexes (mockups de scènes urbaines, virages, intersections, quartiers), utiliser cette boucle :

1. **PROPOSE** (agent) — créer une recette `recipes/test_X.py`, la rendre en PNG, l'afficher dans [`tools/mockups-routes.html`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tools/mockups-routes.html) à échelle uniforme.
2. **ÉDITE** (user) — clique 🎨 Éditer sur la card → ouvre `tile-picker.html?recipe=test_X.py` qui pré-remplit la matrice → user modifie → clique "📤 Export Python" → copie le résultat → me l'envoie.
3. **APPREND** (agent) — remplace `recipes/test_X.py` avec l'export user, re-render le PNG, **invoquer tile-pmo** pour graver les leçons :
   - Quelles tiles a changé le user et pourquoi (si ça révèle une mauvaise cartographie de ma part).
   - Quel pattern le user a confirmé (`validated_by_user: true` dans `patterns.js`).
   - Régénérer `recipes_data.js` (`python scripts/export_recipes_to_js.py`) pour que le picker reste à jour.

**Bénéfice cumulatif** : à chaque cycle, ma cartographie se précise. Je perds moins de temps à tâtonner. Le user fait moins de finition, l'agent en fait plus.

**Règle** : si je propose une compo et que le user la corrige, **j'invoque tile-pmo** pour capturer la correction. Pas de leçon perdue.

---

## 📋 PMO obligatoire — invoquer `tile-pmo` à 4 moments

**Agent dédié** : `.claude/agents/tile-pmo.md` (Haiku, gratuit/rapide). Capture systématiquement les leçons pour ne rien perdre.

Invoquer `tile-pmo` via `Task` tool dans ces cas :
1. **Après correction user** : le user vient de pointer un bug ou de valider une compo → leçon à graver immédiatement.
2. **Après découverte** : nouvelle tile identifiée, nouveau pattern, nouvelle règle de symétrie.
3. **Fin de session tile** : avant de rendre la main au user, recap court.
4. **Avant commit tile-tools** : vérifier que LESSONS et patterns sont à jour.

Le PMO met à jour : `LESSONS.md`, `patterns.js`, `cartography.json`. Il **ne** compose pas de tiles.

**Règle d'or PMO** : une leçon non-capturée = une erreur à refaire. Si je termine une session sans avoir invoqué tile-pmo au moins une fois, j'ai probablement perdu un apprentissage.

---

## 🎖️ MÉTHODE MILITAIRE — séquence obligatoire pour CHAQUE snippet

**Règle d'or** : pas un seul layout ne sort de cet outil sans avoir été rendu en PNG et vérifié pixel par pixel par moi-même. Si je n'ai pas le PNG sous les yeux, je n'ai rien produit.

### Séquence stricte (ne pas sauter d'étape)

```
1. EXPLORER  → ls + Read images individuelles pour CHAQUE tile que je veux utiliser
2. VÉRIFIER  → noter les dimensions natives (`Image.open(path).size`) — 66% sont multi-tiles
3. DÉSAMBIGUÏSER → si le rôle d'une tile n'est pas évident à 100%, tester L'ORDRE _4/_8 (G/D)
4. CODER     → écrire le module Python `test_X.py` avec SNIPPET = {cols, rows, ground, objects}
5. RENDER    → `python render.py test_X.py` → produit `test_X.png`
6. REGARDER  → Read tool sur le PNG + auto-critique pixel-par-pixel
7. ITÉRER    → corriger, re-render, re-regarder. Pas de validation sans visualisation.
8. SOUMETTRE → présenter le PNG au user pour validation finale
9. CARTOGRAPHIER → mettre à jour cartography.json/patterns.json + skill avec leçon apprise
```

### Test de validation pour chaque PNG produit

Avant de soumettre, me poser ces questions visuelles :

- [ ] **Continuité** : les transitions trottoir↔asphalte sont-elles propres (pas de pixel manquant) ?
- [ ] **Symétrie** : ce qui doit être symétrique (route 2 voies) l'est-il ? Pas inversé G/D ?
- [ ] **Bonne tile, bon emplacement** : le contenu DANS chaque tile est-il à la bonne position dans la grille ?
- [ ] **Largeur cohérente** : la route a la bonne largeur (pas "piste cyclable" 7 cols quand 5 suffisent) ?
- [ ] **Marquages alignés** : les "BUS", "P", lignes pointillées sont-ils centrés/alignés ?
- [ ] **Pas de blocs énigmatiques** : aucun objet "qu'est-ce que c'est ?" (chaise sur trottoir, arche au sol, etc.)
- [ ] **Anti-répétition** : pas de séquence identique > 4 tiles en ligne/colonne
- [ ] **Multi-tiles déposés correctement** : un tile 7×6 occupe bien 7×6 cases sans sortir du cadre

Si une seule case n'est pas cochée → on ne soumet pas, on itère.

### Quand le user pointe un bug

1. **NE PAS deviner** — ouvrir l'image cassée, lire les fichiers PNG concernés, comprendre AVANT de proposer une correction
2. **Tester le swap** — si symétrie possible (G/D, N/S), tester les 2 ordres avant de trancher
3. **Re-render après chaque modification** — pas de "ça devrait marcher maintenant"
4. **Documenter dans la cartographie** — la leçon va dans cartography.json + skill, sinon je referai la même erreur

### Anti-pattern fondamental à fuir

**"J'ai écrit donc ça marche."** C'est l'erreur racine de toutes les autres. La compilation TypeScript et l'absence d'erreur Python ne disent rien sur le rendu visuel. Le seul juge = un humain (moi en first pass, le user en second) regardant un PNG concret.

---

## 🚫 NE JAMAIS UTILISER `fetch()` POUR CHARGER UN JSON LOCAL DANS UN HTML STANDALONE

**Erreur vécue (2026-05-04)** : page `tile-library-v3.html` chargeait `cartography.json` + `patterns.json` via `fetch()`. Quand le user a ouvert le fichier en double-clic (protocole `file://`), tous les `fetch()` ont échoué silencieusement avec **"Failed to fetch"** car les navigateurs bloquent les requêtes XHR/fetch sur `file://` pour raisons de sécurité (CORS).

**Règle absolue** : pour les pages HTML que le user ouvre en local (sans serveur HTTP), TOUJOURS charger les données via `<script src="data.js">` qui assigne à `window.NAME = {...}`.

```bash
# Helper de conversion JSON → JS (à utiliser systématiquement quand on génère un JSON consommé en HTML local)
python -c "
import json
for name in ['cartography', 'patterns']:
    with open(f'{name}.json') as f: data = f.read()
    with open(f'{name}.js', 'w', encoding='utf-8') as f:
        f.write(f'window.{name.upper()} = ' + data + ';')
"
```

```html
<!-- ❌ MAUVAIS : ne marche qu'avec serveur HTTP -->
<script>
fetch('data.json').then(r => r.json()).then(data => render(data));
</script>

<!-- ✅ BON : fonctionne aussi en file:// -->
<script src="data.js"></script>
<script>render(window.DATA);</script>
```

**Détecter le bug rapidement** : si une page HTML local affiche "Erreur: Failed to fetch" ou reste bloquée sur "Chargement…", c'est presque toujours un fetch sur `file://`. Pas la peine de chercher ailleurs.

**Alternatives possibles si le user a un serveur** : `python -m http.server 8000` puis ouvrir `http://localhost:8000/page.html`. Mais c'est UNE FRICTION pour le user. Préférer la version `.js` standalone par défaut.

---

## 🗺️ CARTOGRAPHIE & PATTERNS — toujours partir de là

**Avant d'écrire le moindre layout** : consulter
- [`game/web/tools/tile-picker.html`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tools/tile-picker.html) — 🆕 **BIBLIOTHÈQUE VISUELLE + MATRICE 10×10 DRAG&DROP** : 81 tiles (27 Asphalt_1 + 54 Sidewalk_1) sélectionnables, matrice configurable, export Python. **Quand l'agencement n'est pas évident, demander au user de composer dans tile-picker** — il glisse les tiles, exporte en Python, je transcris dans une recette `test_X.py`. Plus de devinette.
- [`game/web/tile-tools/themes_overview/`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tile-tools/themes_overview/) — **PLANCHES D'ASSEMBLAGE LIMEZU** : pour chaque thème (City Terrains, Vehicles, Garden…), une grande PNG avec exemples d'assemblages réalisés par le créateur du tileset. **À regarder EN PREMIER** quand on cherche à composer quelque chose : les exemples y montrent quelles tiles vont ensemble (virages, ronds-points, bus, etc.). Ça évite de perdre 30 minutes à inventer un mauvais assemblage quand le créateur en a déjà fourni un correct.
- [`game/web/tile-tools/cartography.json`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tile-tools/cartography.json) — rôle exact de chaque variation Asphalt_1 (1-27) et Sidewalk_1 (1-54)
- [`game/web/tile-tools/patterns.json`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tile-tools/patterns.json) — recettes validées par cas d'usage (route verticale stylée, voie bus 2 sens, parking N+S, rond-point complet…)
- [`game/web/tools/tile-library-v3.html`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tools/tile-library-v3.html) — vue navigable patterns + cartographie

**Hiérarchie de consultation** :
1. **tile-picker.html** → si je tâtonne ≥ 2 fois sur un agencement, demander au user de composer
2. `themes_overview/<theme>.png` → vision globale + exemples d'assemblage du créateur
3. `families/<theme>/<family>.png` → planche-contact d'une famille (54 variants Sidewalk_1)
4. Tiles individuelles pour zoom pixel-perfect

### Patterns prêts à l'emploi (validés visuellement et confirmés par le user)

| Cas d'usage | Layout | Tiles clés | PNG | Status |
|-------------|--------|------------|-----|--------|
| **Route verticale 5 cols** | `[trottoir | sw_4 | asph_15 | sw_8 | trottoir]` | sw_9 + sw_4/_8 + asph_15 | `test_route_v_5cols.png` | ✅ user-validated 2026-05-04 |
| **Route horizontale 5 rows** | `rows: [trottoir | sw_6 | asph_14 | sw_2 | trottoir]` | symétrique | `test_route_h_5rows.png` | ✅ user-validated 2026-05-04 |
| Voie bus 2 sens | 9×12, BUS collé au trottoir (sans transition) | sw_9 + asph + sw_48/_49 | `test_voie_bus_v6.png` | ⏳ |
| Parking 2 rangées | 12×8, places P collées au trottoir (sans transition) | sw_9 + asph + sw_45/_46 | `test_parking_v4.png` | ⏳ |
| Rond-point complet | 14×12, 4 quarts + îlot+panneau bleu central | sw_50/51/52/53 + sw_54 ilot+panneau | `test_rond_point_v9.png` | ⏳ |
| Passage piéton route V | 5×12, 3 tiles 1×2 alignées dans la route | sw_33/_34/_36 | `test_passage_pieton_route_v.png` | ⏳ |
| Passage piéton route H | 12×5, 3 tiles 2×1 alignées dans la route | sw_29/_30/_32 | `test_passage_pieton_route_h.png` | ⏳ |
| Virages 4 sens | 14×14 (4 virages 5×5), L asphalte + arc trottoir au coin INT | sw_11/_12/_13/_14 | `test_virages_4sens_v3.png` | ⏳ |

**Status legend** : ✅ user-validated · ⏳ rendu OK mais user pas encore validé · ❌ cassé

### Layout 5 cols pour route verticale — RÈGLE D'OR

```
col 0 : trottoir 100%        (sw_9 ou sw_27, varier aléatoirement pour anti-mono)
col 1 : sw_4                 (trottoir À GAUCHE de la tile, asphalte commence au milieu droit)
col 2 : asph_15 (pointillée) (varier 70/30 avec asph_4 ou asph_8 solide pour casser la mono)
col 3 : sw_8                 (asphalte à gauche, trottoir À DROITE de la tile)
col 4 : trottoir 100%
```

**Mnémonique anti-inversion** : la position du trottoir DANS la tile (gauche/droite) doit correspondre au côté de la route où elle est posée. `sw_4` a le trottoir à GAUCHE → on le met à GAUCHE de la route (col 1). `sw_8` a le trottoir à DROITE → col 3 (à droite).

⚠️ **Erreur déjà commise (sessions 4-5)** : nommer ces tiles "bord_W"/"bord_E" par déduction (W=west=gauche) sans regarder le contenu. Le naming "transition-trottoir-G-asphalte-D" est moins ambigu.

### Conventions critiques sidewalk_1 (TRANSITIONS asphalte ↔ trottoir)

⚠️ **Erreur classique** : confondre "bord W/E" (où est le trottoir par rapport à la tile) avec "où placer la tile dans la grille". Ce qui compte : **où est le trottoir DANS la tile elle-même**.

Pour une route verticale 5 cols `[trottoir | T1 | ligne | T2 | trottoir]` :
- **`sw_4`** = trottoir à GAUCHE de la tile, asphalte à droite → utiliser en **col 1** (transition trottoir→route)
- **`sw_8`** = asphalte à gauche, trottoir à DROITE de la tile → utiliser en **col 3** (transition route→trottoir)
- `sw_2` = trottoir en BAS de la tile, asphalte au-dessus → bord N d'une route horizontale
- `sw_6` = trottoir en HAUT de la tile, asphalte en dessous → bord S d'une route horizontale
- `sw_9` = trottoir 100% plain (à utiliser pour toute zone trottoir pure)

**Virages route 90° (1×1 chacun)** :
- `sw_11` = arc trottoir convexe SE (le coin INTÉRIEUR du virage est SE, ie route arrive du nord et tourne vers ouest)
- `sw_12` = arc trottoir convexe SW (coin INT = SW)
- `sw_13` = arc trottoir convexe NW (coin INT = NW)
- `sw_14` = arc trottoir convexe NE (coin INT = NE)

**Passages piétons** (les tiles sont déjà alignées avec leurs bords trottoir blancs intégrés) :
- `sw_29/30/31/32` (2×1) = passage piéton VERTICAL (pour route horizontale). _29 = haut, _30/31 = milieu, _32 = bas
- `sw_33/34/35/36` (1×2) = passage piéton HORIZONTAL (pour route verticale). _33 = gauche, _34/35 = milieu, _36 = droite

**Marquages routiers spéciaux** :
- `sw_42/43/44` (3×5) = place de parking individuelle avec lettre P (pas un parking grand format)
- `sw_45/46` (5×2) = parking grand format (rangée de places côte à côte)
- `sw_47` (7×3) = marquage BUS horizontal (pour route horizontale)
- `sw_48` (3×6) = marquage BUS vertical, **cadre fermé à GAUCHE → voie GAUCHE**
- `sw_49` (3×6) = marquage BUS vertical, **cadre fermé à DROITE → voie DROITE**
- `sw_50/51/52/53` (7×6 chacun) = quarts NW/NE/SE/SW d'un rond-point complet (assemblés = 14×12). **ATTENTION** : `_52` va en SE et `_53` en SW (ordre LimeZu non-intuitif)
- `sw_54` (3×4) = îlot beige circulaire + panneau bleu giratoire — **se pose au CENTRE du rond-point**, en (col=6, row=4) sur un rond-point 14×12

⚠️ **Tous les marquages au sol (P, BUS, passages piétons) incluent déjà leurs bordures blanches**. Ne PAS ajouter de transition sw_2/sw_4/sw_6/sw_8 entre la route et ces marquages — ils se posent directement au contact du trottoir.

### Conventions Asphalt_1

- `_14` = ligne pointillée HORIZONTALE (centre route horizontale)
- `_15` = ligne pointillée VERTICALE (centre route verticale)
- `_4`, `_8` = lignes blanches solides verticales
- `_20`, `_22`, `_27` = plain fill (mixer pour anti-répétition)
- `_1` à `_13` = carrefours, T-junctions, intersections

---

## 🔁 WORKFLOW OBLIGATOIRE — render → regarde → itère

**Erreur #0 (la plus grave) — composer aveuglément sans visualiser le résultat.**

Tant que tu n'as pas un **PNG du rendu sous les yeux**, tu ne sais pas si ton snippet marche. Phaser et HTML5 canvas ne montrent les bugs qu'au runtime.

**Procédure** :
1. Toute composition de tiles passe par [`game/web/tile-tools/render.py`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tile-tools/render.py) — un script PIL qui prend un module Python avec `SNIPPET = {cols, rows, ground[][], objects[(c,r,key,...)]}` et produit un PNG.
2. Après chaque render : **lire le PNG** (Read tool) pour vérifier le résultat **avant** de coder le snippet final dans tile-library.html ou Phaser.
3. Itérer. Pas de "j'ai écrit donc ça marche".

**Tests validés disponibles** (référence) :
- `test_route_v.py` → route verticale propre 5×7 avec ligne pointillée
- `test_route_h.py` → route horizontale 7×5
- `test_rond_point4.py` → rond-point complet 14×12 (4 quarts + îlot)
- `test_voie_bus2.py` → voie de bus avec marquage "BUS" lisible
- `test_parking.py` → parking 2 places marquées "P"

**Visual catalog** : `python make_catalog_sheets.py` régénère 24 planches-contact PNG par catégorie/famille. Index visuel dans [`game/web/tile-library-v2.html`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tile-library-v2.html).

---

## 📐 DIMENSIONS NATIVES — 66% DES TILES SONT MULTI-TILES

Sur 3 563 tiles inventoriés (`game/web/tile-tools/_inventory.json`), **2 380 font plus de 48×48 px** (66 % !). Croire qu'une tile est 48×48 sans vérifier = bug visuel garanti.

**Toujours vérifier la taille native avant de poser** :
```python
from PIL import Image
img = Image.open(path)
print(img.size[0]//48, 'x', img.size[1]//48, 'tiles')
```

**Tailles surprises rencontrées** :
- `Sidewalk_1_47` (BUS horizontal) = **7×3 tiles** (pas 1×1)
- `Sidewalk_1_48` / `_49` (BUS vertical) = **3×6 chacun** (mot BUS complet, pas une lettre)
- `Sidewalk_1_50/51/52/53` (rond-point quarts) = **7×6 chacun** → rond-point complet = 14×12
- `Sidewalk_1_45/46` (P parking) = **5×2 chacun**
- `Sidewalk_1_54` (panneau giratoire) = **3×4**
- `Angel_Statue_1` = **5×7** (240×336 px)
- `Toy_House_*` = **4×5** (192×240 px)
- `Fountain_1_1` = **2×3** (96×144)
- Bus animated frames = **142×75 tiles** (méga-spritesheets, pas une simple frame)

**Workflow** : pour tout tile non trivial, **ouvrir l'image avant** d'écrire le code de pose.

---

## 🚨 CHEMIN DES ASSETS (erreur #1, perdu 2 sessions)

**Les tiles vivent sous `game/phaser/public/assets/tiles/`, JAMAIS `game/public/assets/tiles/`.**

- Depuis `game/web/*.html`  → `T = '../phaser/public/assets/tiles/'`
- Depuis Phaser (PreloadScene.ts) → `assets/tiles/...` (relatif au public)
- Le catalogue `~/.claude/skills/pixel-maps/tileset-catalog.md` historique listait le mauvais path → toujours **vérifier l'existence du fichier** avant d'écrire un path dans le code.

```bash
# Avant d'utiliser un tile, toujours valider :
ls "c:/ProjetsPerso/Claude_Projects/MaxPlay/game/phaser/public/assets/tiles/<dossier>/<file>.png"
```

---

## 🎨 VARIATIONS ASPHALT/SIDEWALK/GRASS (erreur #2 — visible dans tile-library)

Les tiles de sol vont jusqu'à **54 variations** par famille (pas seulement 27 — erreur initiale). Elles ne sont PAS interchangeables :

| Variation | Contenu | Usage |
|-----------|---------|-------|
| `_1` à `_19` | **Bords, coins, lignes blanches, marquages, transitions autotile** | Décorer les bords d'une zone, jamais le centre |
| `_20` à `_27` | **Plain fill** (texture pleine sans marques) | Remplir le centre d'une zone |
| `_28` à `_44` | **Variantes décoratives** (fissures, pavés, joints, taches, etc.) | Optionnel — accent visuel ponctuel |
| `_45` à `_54` (Sidewalk_1) | **MARQUAGES SPÉCIAUX** : "P", "BUS" horizontal/vertical, ronds-points (4 quarts), panneau giratoire | Placer DIRECTEMENT au-dessus de l'asphalte/trottoir comme marquage au sol |

**⚠️ ATTENTION** : avant de dire "telle tile n'existe pas", **TOUJOURS** lister toute la famille avec `ls`. La numérotation va loin et chaque variante a un sens visuel précis.

### Marquages chaussée Sidewalk_1 (référence rapide)
- `_46` = "P" parking (à poser sur place de stationnement)
- `_47` = "BUS" horizontal (couloir bus 1 tile)
- `_48` + `_49` = "BUS" vertical (haut + bas, à poser ensemble = 1 tile×2)
- `_50` `_51` `_52` `_53` = quarts NO/NE/SO/SE d'un rond-point complet 2×2 ou 3×3 (avec arc en pointillés)
- `_54` = panneau "sens giratoire" (à poser sur trottoir près du rond-point)

**Règle absolue** : pour le **remplissage central** d'une zone (route, trottoir, herbe), utiliser uniquement `_20` à `_27`. Sinon des "T blancs" / lignes / damiers apparaissent au milieu de la route.

```javascript
// ❌ MAUVAIS — asph_v9 a une ligne blanche au bord
asphalt_center: T + 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_9.png'

// ✅ BON — variation 20+ = plain fill
asphalt:  T + 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
asphalt2: T + 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_22.png'
asphalt3: T + 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_27.png'
```

Pour grass : `Grass_2_9.png` est OK (la convention diffère par famille). Pour sidewalk : `_27` partout.

---

## 📏 DIMENSIONS NATIVES DES TILES (erreur #3 — bus tronqué)

**Tous les tiles ne font PAS 48×48.** Il faut connaître la dimension native pour les positionner :

| Tile | Dim native (px) | En tiles | Anchor | Note |
|------|----------------|----------|--------|------|
| Asphalt / sidewalk / grass | 48×48 | 1×1 | top-left | OK pour `drawTile` 48×48 |
| `bush*` | 48×48 | 1×1 | top-left | Arbre vue dessus |
| `flower_*_Small` | 48×48 | 1×1 | top-left | Fleur au sol |
| `flower_*_Big` | 48×96 | 1×2 | top-left | Sauf `Big_Light_Blue_Flower` qui est 48×48 (exception) |
| **`Toy_House_*`** | **192×240** | **4×5** | top-left | Carte mini 6×7 minimum pour 1 maison |
| `condo_m*`, `bakery_m*`, `ice_m*` | 48×144 | 1×3 | row=0 | Façade modulaire, ancrer sur sidewalk |
| `bench_city` | 96×96 | 2×2 | top-left | Banc rue |
| `bench_h` (parc) | 96×48 | 2×1 | top-left | |
| `bench_v` (parc) | 48×96 | 1×2 | top-left | |
| `big_bench_h` | 144×48 | 3×1 | top-left | Banc XL parc |
| `electric_pole` | 48×192 | 1×4 | top-left | Lampadaire/poteau, dépasse vers le haut |
| `parking_m` | 48×96 | 1×2 | top-left | Parcomètre |
| `atm_prop` | 96×144 | 2×3 | top-left | Distributeur |
| `metro_stairs` | 144×96 | 3×2 | top-left | Escalier métro (note : espace dans le filename !) |
| `clock_tower` | 96×192 | 2×4 | top-left | Tour horloge |
| `fountain_p` | 96×96 | 2×2 | top-left | Fontaine de parc |
| `arch` | 96×96 | 2×2 | top-left | Arche végétale (entrée parc, PAS sol) |
| `flag` | 48×96 | 1×2 | top-left | Drapeau (mât dépasse) |
| `bus animated frames` | 48×48 par frame | 1×1 chaque | — | 6 frames d'animation, NE FONT PAS un bus 2 tiles. Pour un bus 96×48 il faut un sprite séparé. |

**Règle de canvas HTML** : utiliser `ctx.drawImage(img, x, y, w, h)` avec **`w` et `h` = dimension native** pour les objets multi-tiles, **PAS** 48×48 forcé.

```javascript
// ❌ MAUVAIS — toyhouse rétrécie en 48×48
ctx.drawImage(get('toyhouse1'), 2*48, 0, 48, 48);

// ✅ BON — taille native 192×240
ctx.drawImage(get('toyhouse1'), 2*48, 0, 192, 240);
```

**Règle Phaser** : `this.add.image(x, y, key).setOrigin(0, 0)` — la dimension native est respectée automatiquement. Toujours `setOrigin(0, 0)` pour aligner sur grille tile.

---

## 🔢 NUMÉROTATION DES VARIANTES (erreur #4 — Cone_1 n'existe pas)

**Toutes les familles ne commencent pas à `_1`.** Certaines (Cone) commencent à `_3`.

```bash
# Toujours lister avant d'utiliser :
ls "props/" | grep "Cone_"  # → Cone_3.png, Cone_4.png, etc. (pas de _1, _2)
```

Familles connues à variants non-séquentiels :
- `Cone_*` : commence à `_3`
- Certains `Flower_Bush_*` : sauter des numéros possibles
- `Mound_1_*` : `_1` à `_8` mais pas `_9`

**Règle** : ne jamais hardcoder `_1` sans vérifier `ls`. Préférer `_3` ou tester par script.

---

## 🚧 RÈGLES DE TRANSITION (déjà dans map-design-rules)

- **Jamais asphalt directement adjacent à grass** → toujours sidewalk de transition (1 tile minimum)
- **Toyhouse jamais sur asphalt** → grass ou sidewalk uniquement
- **Bushes jamais sur asphalt** → arbres ne poussent pas sur la route

---

## 🎯 ANTI-RÉPÉTITION & RANDOMISATION

- Maximum **4 tiles identiques** consécutifs en ligne ou colonne
- Toujours mixer 3 variantes d'asphalt sur une grande zone
- Mixer grass1/2/3 dans un parc (formula : `[(r*7+c*3)%3]` donne un mix non périodique)
- Au moins 3 types de bâtiments différents par map

### Pattern Python pour randomisation reproductible

```python
import random
random.seed(42)  # reproductible — même seed = même résultat à chaque render

# Pool de variantes "plain" (purement décoratives, interchangeables)
TROTTOIRS = ['sw_9.png', 'sw_27.png']  # 2 motifs très subtils
ASPH_PLAIN = ['asph_20.png', 'asph_22.png', 'asph_27.png']

# Pool de "casseurs de mono" (à utiliser avec faible probabilité)
LIGNE_NORMALE = 'asph_15.png'
LIGNE_CASSEE = ['asph_4.png', 'asph_8.png']  # solides

for r in range(rows):
    # 70% normal, 30% cassé
    centre = LIGNE_NORMALE if random.random() < 0.7 else random.choice(LIGNE_CASSEE)
    tg = random.choice(TROTTOIRS)
    td = random.choice(TROTTOIRS)
    ground.append([tg, BORD_W, centre, BORD_E, td])
```

⚠️ **Attention au pool de variantes** : `_17`-`_20` ont des objets DESSUS (chaises, bacs) — pas du plain ! Ne pas les inclure dans le pool "trottoirs plain". Vérifier visuellement chaque variante avec Read avant de l'inclure dans un pool aléatoire.

### Niveau de randomisation par couche

| Couche | Stratégie |
|--------|-----------|
| Trottoir | 100% aléatoire dans `[_9, _27]` (2 plain) |
| Asphalte plain | Aléatoire dans `[_20, _22, _27]` (3 plain) |
| Ligne centrale | 70% pointillée, 30% cassée (solide) |
| Bushes/fleurs | Position aléatoire mais densité contrôlée (max 1 par 3×3) |
| Bâtiments | Pas aléatoire — placement délibéré, mais varier les types |

---

## 🔍 PROCESS DE DEBUG QUAND UN SNIPPET EST CASSÉ

1. **Canvas vide / vert** → image 404. Vérifier path et existence du fichier.
2. **Erreur `Failed to execute drawImage`** → image null (404 ou onerror). Le `get(key)` retourne `null`.
3. **Tile rétrécie/déformée** → drawImage forcé à 48×48 alors que tile native est plus grande.
4. **Marquages inattendus au milieu** → variation de bord (`_1`-`_19`) utilisée comme remplissage.
5. **Tile décalée** → oublié `setOrigin(0, 0)` en Phaser, ou anchor center par défaut.

**Toujours tester en parallèle dans `tile-library.html`** avant d'intégrer dans Max Adventure : la lib charge les images en raw, donc si le tile s'affiche pas là, c'est le path qui cloche.

---

## 📂 FICHIERS DE RÉFÉRENCE PROJET

| Fichier | Rôle |
|---------|------|
| [`game/web/tile-library.html`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tile-library.html) | Catalogue visuel + 10 snippets |
| [`game/web/map-mockups.html`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/map-mockups.html) | Maps d'apprentissage (10+ mockups) |
| [`game/phaser/src/scenes/PreloadScene.ts`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/phaser/src/scenes/PreloadScene.ts) | Source de vérité des tiles chargés en jeu |
| [`game/phaser/src/scenes/SandboxScene.ts`](c:/ProjetsPerso/Claude_Projects/MaxPlay/game/phaser/src/scenes/SandboxScene.ts) | Render tile-based de Max Adventure |
| `~/.claude/skills/pixel-maps/` | Skill pipeline simplifier→designer→reviewer |

---

## ✅ CHECKLIST AVANT DE COMMIT UNE NOUVELLE MAP/SNIPPET

- [ ] Tous les paths vérifiés via `ls` (pas de fichier 404)
- [ ] Toutes les variations sol = `_20` à `_27` au centre des zones
- [ ] Dimensions natives respectées dans `drawImage(..., w, h)` ou Phaser auto
- [ ] Aucun asphalt directement adjacent à grass
- [ ] Mix de variantes (asphalt 1/2/3, grass 1/2/3, sidewalk 1/2)
- [ ] Testé visuellement dans le navigateur avant de réintégrer ailleurs
- [ ] Si Phaser : `npx tsc --noEmit` passe vert
