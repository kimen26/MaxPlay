---
name: cheikh-maxplay
description: "Audit spécifique MaxPlay — vérifie les règles métier bus, la matrice tracker/jeux, les flux de fin de partie, la cohérence LIGNES/ratp-colors.json, et les fichiers lab orphelins. Complément du skill global cheikh."
origin: custom
---

# Cheikh MaxPlay — Audit spécifique projet

Extension du skill global `cheikh` pour les règles métier de MaxPlay. À invoquer après `cheikh` ou seul pour un audit rapide MaxPlay.

---

## Check 1 — Matrice tracker × jeux

Construire la matrice complète de tous les jeux.

```bash
# Tous les jeux HTML
ls game-html/mj-*.html | sort -V

# tracker.js inclus ?
for f in game-html/mj-*.html; do
  has=$(grep -c "tracker.js" "$f" 2>/dev/null || echo 0)
  end=$(grep -c "Tracker.endSession" "$f" 2>/dev/null || echo 0)
  echo "$f — tracker:$has endSession:$end"
done

# GAME_META dans tracker.js
grep "mj-" game-html/js/tracker.js
```

Résultat attendu — matrice complète :

| Jeu | tracker.js | endSession | Type fin |
|-----|-----------|-----------|----------|
| mj-01 | ✅ | ✅ | showEndScreen |
| mj-02 | ✅ | ✅ | showEndScreen |
| mj-03 | ✅ | ✅ | showEndScreen |
| mj-04 | ✅ | ❌ | jeu infini (OK) |
| mj-05 | ✅ | ✅ | showEndScreen |
| mj-06 | ✅ | ✅ | showEndScreen |
| mj-07 | ✅ | ✅ | showEndScreen |
| mj-08 | ✅ | ✅ | parkedCount === total |
| mj-09 | ✅ | ✅ | rangedCount >= total |
| mj-10 | ✅ | ❌ | sandbox (OK) |
| mj-11 | ✅ | ✅ | showVictory |
| mj-12 | ✅ | ❌ | sandbox (OK) |
| mj-13 | ✅ | ✅ | showVictory |
| mj-14 | ✅ | ✅ | showEnd |
| mj-15 | ✅ | ✅ | showEnd |
| mj-16 | ✅ | ✅ | showEnd |
| mj-17 | ✅ | ✅ | showEnd |

Chaque jeu doit aussi être dans `GAME_META` de tracker.js.

---

## Check 2 — Règle bus SVG (non-négociable)

```bash
# Chercher tout usage interdit d'emoji bus ou div coloré
grep -rn "🚌\|background.*#.*bus\|class.*bus.*color" game-html/mj-*.html | grep -v "busSVG\|bus-svg"

# Vérifier que busSVG est bien utilisé
grep -n "busSVG\|busSVGHidden" game-html/mj-*.html | wc -l
```

❌ Toute représentation de bus sans `busSVG()` est une violation.

---

## Check 3 — Cohérence LIGNES / ratp-colors.json

```bash
# Couleurs dans data.js
grep "color:" game-html/js/data.js | grep -oP "#[0-9A-Fa-f]{6}" | sort -u

# Couleurs dans ratp-colors.json (source de vérité)
grep -oP '"color":\s*"#[0-9A-Fa-f]{6}"' docs/ratp-colors.json | sort -u
```

Toute couleur dans `data.js` doit être présente dans `ratp-colors.json`.

```bash
# Numéros de lignes dans data.js
grep "num:" game-html/js/data.js | grep -oP "'[^']+'" | sort

# Vérifier que les pools dans les jeux référencent des numéros existants
grep -n "162\|172\|185\|V2\|V3\|V4\|N15" game-html/mj-*.html | grep "POOL\|filter\|includes" | head -20
```

---

## Check 4 — Fichiers lab / proto orphelins

```bash
# Fichiers HTML présents
ls game-html/*.html

# Fichiers référencés dans index.html
grep 'href=".*\.html"' game-html/index.html | grep -oP 'href="[^"]*"'
```

Fichiers connus comme labs/protos (OK d'être orphelins) :
- `mj-13-proto.html`, `mj-13a.html`, `mj-13b.html`, `mj-13c.html`
- `dev-lab.html`, `dev-dinos.html`, `design-mockups.html`

Tout autre HTML non référencé = ⚠️ à qualifier.

---

## Check 5 — Ordre des scripts dans les jeux

L'ordre correct est :
1. `sounds.js` (si utilisé)
2. `feedback.js` (si utilisé)
3. `data.js`
4. `bus-svg.js`
5. `victory-sounds.js`
6. `tracker.js` ← toujours en dernier

```bash
# Vérifier l'ordre dans chaque jeu
for f in game-html/mj-*.html; do
  echo "=== $f ==="
  grep '<script src="js/' "$f" | grep -oP 'js/[^"]*'
done
```

---

## Check 6 — Cohérence index.html × fichiers

```bash
# Cartes dans le menu
grep 'href="mj-' game-html/index.html | grep -oP 'mj-\d+'

# Fichiers réels
ls game-html/mj-*.html | grep -oP 'mj-\d+'
```

Tout jeu déployé doit avoir une carte dans le menu. Tout fichier mj-XX doit être soit dans le menu soit qualifié comme lab/proto.

---

## Check 7 — Sons référencés vs fichiers présents

```bash
# Sons référencés dans le code
grep -roh "sounds/[^'\"]*" game-html/mj-*.html game-html/js/*.js | sort -u

# Sons présents sur disque
ls game-html/sounds/
```

Diff entre les deux → sons manquants (erreur silencieuse) ou fichiers orphelins (poids inutile).

---

## Check 8 — MEMORY.md cohérence rapide

Vérifier les 3 chiffres clés qui bougent à chaque session :

```bash
# Nombre de jeux déclaré dans MEMORY.md
grep "jeux\|mj-01" memory/MEMORY.md | head -5

# Nombre réel
ls game-html/mj-*.html | wc -l

# Date dernière session dans MEMORY.md
grep "session\|2026" memory/MEMORY.md | head -3
```

---

## Rapport Cheikh MaxPlay — format de sortie

```
## Cheikh MaxPlay — [date]

### Matrice tracker
✅ 17/17 jeux trackés (mj-04/10/12 = sandboxes, endSession non requis)
❌ mj-XX : tracker.js absent

### Règle bus SVG
✅ Aucun emoji 🚌 ni div coloré détecté

### Cohérence LIGNES
✅ Toutes les couleurs de data.js présentes dans ratp-colors.json
⚠️ Ligne XX dans data.js mais absente de ratp-colors.json

### Orphelins
⚠️ [liste des fichiers non référencés]

### Ordre scripts
✅ Tous les jeux respectent l'ordre
❌ mj-XX : tracker.js pas en dernier

### Sons
⚠️ sounds/foo.mp3 référencé mais absent
⚠️ sounds/bar.mp3 présent mais jamais chargé

### MEMORY.md
✅ 18 jeux déclarés = 17 mj-*.html + max-adventure ✅

### Actions prioritaires
1. ...
```
