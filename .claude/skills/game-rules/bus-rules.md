---
name: MaxPlay Bus Rules
description: Règles immuables sur le rendu bus, les pools de lignes, et le protocole de modification — à consulter avant tout changement impliquant les bus
type: project-skill
---

# MaxPlay — Règles Bus (source de vérité)

> Consulter ce fichier avant tout changement impliquant : couleurs, terminus, pools de lignes, rendu SVG.
> Source de vérité des données : `docs/ratp-colors.json`

## Règle 1 — Rendu SVG (CRITIQUE, jamais d'exception)

**TOUJOURS** utiliser `busSVG()` ou `busSVGHiddenNum()` depuis `game-html/js/bus-svg.js`.

```
✅ busSVG(color, textColor, num, width)
✅ busSVGHiddenNum(color, textColor, num, width)
❌ emoji 🚌
❌ <div> coloré CSS
❌ image PNG/SVG statique
```

**Pourquoi :** cohérence visuelle garantie, couleur contrôlée par `data.js`, pas de dispersion.

Structure fixe du bus SVG :
- Carrosserie : toujours turquoise #1abc9c
- Fenêtre destination : `color` variable (c'est ici que la couleur de ligne s'affiche)
- Numéro : texte dans la fenêtre, `textColor` variable

## Règle 2 — Source de vérité couleurs

**TOUJOURS** lire les couleurs depuis `LIGNES` dans `game-html/js/data.js`.
**JAMAIS** hardcoder une couleur hex dans un mini-jeu.

```javascript
// ✅ Correct
const ligne = LIGNES.find(l => l.num === '162');
busSVG(ligne.color, ligne.textColor, ligne.num);

// ❌ Incorrect
busSVG('#0064B1', '#fff', '162');
```

## Règle 3 — Sélection multi-couleurs

Pour tout quiz affichant plusieurs bus simultanément, utiliser :

```javascript
selectDistinctColors(pool, n, minDist = 80)
```

**Pourquoi :** évite d'afficher N15 et N22 ensemble (même couleur), ou V6 et 380, ou 132 et 2234.

## Règle 4 — Pools par contexte

| Pool | Lignes | Usage |
|------|--------|-------|
| **LIGNES** (26) | Toutes les lignes actives (data.js) | Pool complet connu de Max |
| **LIGNES_UNIQUES** (21) | Exclut N15/N22, V6/380, 132/2234 | Paires de même couleur ambiguës |
| **IDFM_REFERENTIEL** (362) | Toutes les lignes IDFM (idfm.js) | Pool élargi pour distracteurs |
| **MJ-01** | LIGNES sauf TVM | TVM exclu (cas particulier) |
| **MJ-02** | LIGNES sauf V6/2234/N22/TVM | Exclut ambiguïtés couleur |
| **MJ-03** | Bonne réponse = LIGNES, distracteurs = IDFM_REFERENTIEL (362) | TTS — numéro entendu |
| **MJ-08** | LIGNES + IDFM_REFERENTIEL fusionnés, 6 via selectDistinctColors | Garage drag & drop |
| **MJ-09** | LIGNES + IDFM_REFERENTIEL (362 bus) | Tri par famille couleur |

## Règle 5 — TTS (Text-to-Speech)

**TOUJOURS** utiliser `getLineDisplayName(num)` pour prononcer un numéro de ligne.

```
M7  → "Métro 7"
T7  → "Tram 7"
N15 → "Noctilien 15"
V6  → "Valouette V6"
162 → "Bus 162"
TVM → "TVM"
```

## Règle 6 — Conventions pédagogiques (décisions intentionnelles)

Ces valeurs s'écartent du référentiel IDFM officiel — c'est **intentionnel** :

| Ligne | Couleur jeu | Couleur IDFM | Raison |
|-------|------------|--------------|--------|
| N15/N22 | `#000091` bleu nuit | `#FFBE00` jaune | Convention "nuit" plus lisible pour Max |
| 125 | `#006EB8` | `#0055C8` | Différenciation volontaire avec 162 |
| 162 | `#0064B1` | `#0055C8` | Différenciation volontaire avec 125 |
| 185 | `#F58443` | `#FF5A00` | Version plus douce de l'orange |

**Ne pas "corriger" ces valeurs sans décision explicite.**

## Protocole de modification d'une règle

Avant tout changement sur un bus (couleur, terminus, pool, rendu) :

1. **Documenter ce qu'on change** : valeur avant / valeur après
2. **Documenter pourquoi** : bug, mise à jour IDFM, décision pédagogique
3. **Lister ce qu'on perd** : ex. changer N15 vers jaune = perd la cohérence "nuit"
4. **Lister ce qu'on gagne** : ex. fidélité IDFM
5. **Mettre à jour** : `docs/ratp-colors.json` + `game-html/js/data.js` + `memory/MEMORY.md`
6. **Vérifier tous les jeux** qui utilisent cette ligne (MJ-01 à MJ-08)

## Données complètes

Voir `docs/ratp-colors.json` pour :
- Couleurs et terminus de toutes les lignes actives
- Couleurs de tout le réseau IDFM (référentiel complet)
- Historique des décisions
