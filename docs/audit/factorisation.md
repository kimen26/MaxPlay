# Plan de factorisation — MaxPlay HTML vanilla

> Comment dédupliquer sans casser les jeux déjà validés par Max. Migration **incrémentale, vague par vague**.
> Référence : [jeux-2026-04.md](jeux-2026-04.md) · [roadmap-technique.md](roadmap-technique.md)

## 1. Principes

1. **Zéro régression visible pour Max.** Toute refonte est testée avant push.
2. **Petits lots** : 1 utilitaire extrait = 1 commit = 1 déploiement testé.
3. **Ne pas inventer d'abstraction** pour < 3 usages. La triple occurrence déclenche la factorisation.
4. **Préserver l'indépendance** : chaque MJ reste un `.html` chargeable seul (architecture actuelle du projet).
5. **Pas de bundler** : on reste vanilla + `<script src="js/…">`. Cohérent avec GH Pages simple.

## 2. Doublons recensés (voir [jeux-2026-04.md §3.1/3.2](jeux-2026-04.md#3-dette-technique-par-axe))

### 2.1 JS déjà centralisé (mais mal inclus)
| Util | Fichier | Problème |
|---|---|---|
| `confetti()` | `js/feedback.js` | inline réécrit dans mj-17, mj-11, mj-08 |
| `busParade()` | `js/feedback.js` | sous-utilisé (présent dans 4/18) |
| `showFB/feedback` | `js/feedback.js` | pas inclus dans 13/13a/b/c/14/15/16/17 |
| `sndDing/sndBuzz/sndVictory` | `js/sounds.js` | pas inclus dans 14/15/16/17 |
| `shuffle/pickRandom` | `js/feedback.js` | réécrit inline parfois |

### 2.2 JS à extraire en nouveau module
| Util | Cible | Usages détectés |
|---|---|---|
| `speak(text, lang)` TTS wrapper | `js/tts.js` (nouveau) | mj-11, 13, 17 + 6× inline |
| `shake(el)` animation DOM | → `js/feedback.js` | 8× inline |
| `sparkle(x,y)` burst | → `js/feedback.js` | mj-17, dev-lab |
| `dragDrop({source, targets, onDrop})` | `js/dnd.js` (nouveau) | mj-06, 08, 09, 17 |
| `speakGreeting(code)` | `js/tts.js` | mj-11 seulement (laisser en place) |

### 2.3 CSS à globaliser
| Règle | Cible | Usages |
|---|---|---|
| Reset tactile (`touch-action`, `user-select`, `height:100vh`) | `css/base.css` | 17× |
| `.btn-home` / `.home-link` | `css/ui.css` | 18× |
| `#fbOverlay` + `.show` | `css/ui.css` | 11× |
| `@keyframes pulse/shake/fade-in/confetti-fall` | `css/anim.css` | 10-17× chacun |

## 3. Architecture proposée

```
game-html/
├── css/
│   ├── base.css         ← reset, typo, layout mobile
│   ├── ui.css           ← btn-home, fbOverlay, toast, buttons
│   ├── anim.css         ← keyframes globaux (pulse, shake, fade, confetti)
│   └── game.css         ← (existant, spécifique par jeu si besoin)
├── js/
│   ├── bus-svg.js       ← (déjà OK)
│   ├── data.js          ← (déjà OK, lignes IDFM + mots)
│   ├── feedback.js      ← élargi avec shake, sparkle
│   ├── sounds.js        ← (déjà OK)
│   ├── victory-sounds.js← (déjà OK)
│   ├── qcm-retry.js     ← (déjà OK)
│   ├── tracker.js       ← (déjà OK)
│   ├── tts.js           ← NOUVEAU (speak + speakGreeting)
│   ├── dnd.js           ← NOUVEAU (drag & drop réutilisable)
│   └── common.js        ← NOUVEAU (barrel : charge tout ce qui est "de base")
└── mj-*.html            ← importe css/*.css + js/common.js + specs
```

**`js/common.js`** = simple `document.write` / import des briques les plus communes pour diviser les `<script src>` :
```js
// common.js
// Charge les briques de base en série (à inclure dans chaque MJ)
// Alternative simple : garder N lignes d'imports dans chaque HTML.
// Décision : on NE crée PAS common.js, on standardise l'ordre d'import.
```

> ⚠ Décision : pas de `common.js` barrel (complexité sans gain réel en vanilla sans bundler). On standardise un **ordre d'import canonique** + snippet à coller.

## 4. Snippet d'import canonique

À coller en bas de chaque `mj-*.html` (avant la logique spécifique) :

```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/ui.css">
<link rel="stylesheet" href="css/anim.css">
<!-- game-specific styles restent inline ou en fichier dédié -->

<script src="js/bus-svg.js"></script>
<script src="js/data.js"></script>
<script src="js/sounds.js"></script>
<script src="js/victory-sounds.js"></script>
<script src="js/feedback.js"></script>
<script src="js/tts.js"></script>
<script src="js/qcm-retry.js"></script>
<script src="js/dnd.js"></script>
<script src="js/tracker.js"></script>
```

Si un jeu n'a pas besoin d'un module (ex: MJ-12 n'a pas de quiz), on peut le retirer — mais **tracker.js est obligatoire partout** pour la télémétrie.

## 5. Vagues de migration

### Vague 1 — CSS global (risque bas)
- [ ] Créer `css/base.css`, `css/ui.css`, `css/anim.css` depuis les blocs les plus dupliqués
- [ ] Ajouter les 3 `<link>` dans **mj-14** (test pilote, jeu récent et simple)
- [ ] Supprimer les règles redondantes de `mj-14.html`
- [ ] Vérifier visuellement — commit
- [ ] Répliquer sur **mj-15, mj-16** (même pattern)
- [ ] Étendre aux 14 autres MJ par groupes

### Vague 2 — Uniformiser imports JS
- [ ] Ajouter `tracker.js` à **MJ-17, 13a, 13b, 13c** → stats cohérentes
- [ ] Ajouter `sounds.js` + `feedback.js` à **MJ-14, 15, 16, 17**
- [ ] Remplacer toutes les confettis inline par `confetti()` partagé

### Vague 3 — Extraction TTS
- [ ] Créer `js/tts.js` (copier la version de mj-11 + `speak()`)
- [ ] Migrer mj-11, mj-17 pour utiliser `tts.js`
- [ ] Supprimer les doublons

### Vague 4 — Extraction Drag & Drop
- [ ] Créer `js/dnd.js` avec API `attachDrag({sources, targets, onDrop, onInvalid})`
- [ ] Migrer mj-17 d'abord (plus récent, moins risqué)
- [ ] Puis mj-08, mj-09, mj-06

### Vague 5 — Nettoyage
- [x] Supprimer **mj-13-proto.html** (fait vague 1)
- [ ] Masquer du menu Max les pages dev-only

## 6. Gains estimés

| Métrique | Avant | Après (estim.) | Gain |
|---|---|---|---|
| Total lignes HTML/JS | ~14 100 | ~10 500 | -25 % |
| Lignes CSS inline par MJ | 150-400 | 30-80 | -70 % |
| Taille moyenne `mj-XX.html` | 550 l | 300 l | -45 % |
| Temps pour ajouter un nouveau MJ | ~3h | ~1h30 | -50 % |
| Cohérence UX (home, fb, anim) | 3-5 variantes | 1 | ✅ |

## 7. Risques & mitigations

| Risque | Mitigation |
|---|---|
| Régression silencieuse sur MJ validé par Max | Migration **une vague à la fois**, test manuel post-deploy |
| Ordre d'import des scripts cassé | Snippet canonique documenté (§4) |
| CSS global qui override un style inline spécifique | Specificity faible sur global + `!important` ciblé si nécessaire — ou garder inline |
| Perte de contexte sur origine du code dupliqué | Commit par vague avec message clair "refactor: extract X into js/tts.js" |

## 8. Ce que l'on NE factorise PAS (volontairement)

- Logique métier de chaque jeu — chacun garde ses règles
- SVG complexes spécifiques à un jeu (panneau RATP, drapeaux, décor village)
- `<style>` des mises en scène uniques (arrêt de bus, garage) — restent inline

> Règle : si un style n'est utilisé que dans 1 ou 2 MJ, il reste inline. La règle de 3 avant factorisation.
