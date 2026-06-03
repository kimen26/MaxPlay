---
paths:
  - "site/mj-*.html"
  - "site/index.html"
  - "site/js/**"
  - "game/docs/jeux/**"
---

# Mini-jeux HTML — règles auto-chargées

> Chargé automatiquement dès que Claude touche un mini-jeu HTML, ses assets JS, ou ses specs.
> Source de vérité : [`game/pmo/INVARIANTS.md`](../../game/pmo/INVARIANTS.md) + [`game/memory/rules.md`](../../game/memory/rules.md) + [`game/memory/stack.md`](../../game/memory/stack.md).

## ⛔ AVANT DE MODIFIER UN mj-XX.html — LECTURE OBLIGATOIRE

Avant **TOUT** `Edit`/`Write` sur `site/mj-XX.html` :

1. Lire [`game/docs/jeux/figees/mj-XX.md`](../../game/docs/jeux/figees/) s'il existe (le hook `figees-injector.ps1` le réinjecte automatiquement dans le contexte — le lire, pas l'ignorer).
2. Chaque ligne **🔒 est LOI**. Chaque ligne **❌ 🔒 est une régression déjà commise — INTERDITE**.
3. Si ton changement contredit une ligne 🔒 → **STOP**, demande à Papa Yann de défiger explicitement. Tu ne défiges JAMAIS de toi-même.
4. Si le fichier n'existe pas et que tu codes un comportement **validé par Papa Yann** → le créer via `game-mj-pmo` (sinon perdu au prochain `/compact`).
5. Quand Papa Yann dit « OK c'est figé / validé / on fige / ne change plus X » → invoquer `game-mj-pmo` IMMÉDIATEMENT pour graver la décision **mot pour mot** dans `figees/mj-XX.md`.

> Système créé 2026-05-15 suite incident MJ-21 (décision « bus en bas » répétée >10× puis régressée). Triple verrou : hook PreToolUse + cette règle + ligne LOI dans `game/CLAUDE.md`. Vérification : `game-mj-reviewer` Section 0.

## Règles UX NON NÉGOCIABLES (cible 3.5-4 ans)

1. **Zéro pénalité punitive** — pas de "perdu", pas de "raté", pas de chronos qui stressent.
2. **Feedback < 200 ms** — toute action de Max → réaction visuelle/sonore immédiate.
3. **Zones tap min 80×80 px** — doigts d'enfant, marge d'erreur large.
4. **Sessions 3-8 min** — pas de jeu chronophage. Fin courte et gratifiante.
5. **Phonétique uniquement** — Max lit phonétique, pas le silencieux (pas de "Champ-Élysées").

## Règles bus SVG (gravée incident session 6)

- **TOUJOURS** utiliser `busSVG()` ou `busSVGHiddenNum()` de [`site/js/bus-svg.js`](../../site/js/bus-svg.js)
- **JAMAIS** d'emoji 🚌 dans un mini-jeu
- **JAMAIS** de `<div>` CSS coloré qui imite un bus
- Pour quiz multi-couleurs : `selectDistinctColors(pool, n)` — garantit lisibilité

## Règles couleurs IDFM

- **TOUJOURS** utiliser `LIGNES` de [`site/js/data.js`](../../site/js/data.js)
- **JAMAIS** de hex couleur hardcodé dans le HTML/JS du jeu
- Source de vérité IDFM : [`game/docs/ratp-colors.json`](../../game/docs/ratp-colors.json) (26 actives + 362 réf)

## Règles HTML local (gravée 2026-05)

- HTML local (file://) **ne peut PAS** faire de `fetch()`
- Pour data : utiliser `<script src="data.js">` qui assigne `window.NAME`
- **Jamais** de `fetch('./data.json')` dans un mini-jeu local

## 🧪 HARNAIS DE TEST OBLIGATOIRE avant tout push d'un mj-XX (EP-038)

> Créé 2026-05-16 suite REX MJ-21 (33 commits, ~20 d'essais à l'aveugle). Papa Yann n'est plus le débogueur — la machine teste, lui juge le produit.

**Avant CHAQUE `git push` touchant `site/mj-XX.html`** :

```
cd game/tests && npm run mj:test mj-XX
```

- **Vert** → push autorisé. **Rouge** → NE PAS pusher, corriger d'abord.
- Stack : Playwright 1.60+ + Chromium (réel, headless). Pas jsdom (n'attrape pas SVG/animation).
- 1 spec par MJ : `game/tests/mj-XX.spec.mjs` (~30-50 lignes : smoke console + chemin gagnant scripté + 1 assert par ligne 🔒 du fichier figé). Modèle : `mj-21.spec.mjs`.
- Un MJ sans spec qui passe au harnais = un MJ qu'on ne pushe pas (sauf tweak cosmétique trivial).
- **Règle 2-strikes** : 2e commit-fix sur le même symptôme → ajouter d'abord un cas qui reproduit le bug dans le spec (on ne teste pas un bug qu'on ne comprend pas → force la cause racine).

## Workflow MJ

```
0. game-conseiller  → cadrage 1 écran (layout+méca+péda) validé par Papa Yann AVANT code
1. game-mj-pmo      → figeage initial game/docs/jeux/figees/mj-XX.md
2. game-dev         → code HTML vanilla + game/tests/mj-XX.spec.mjs (ensemble)
3. harnais          → cd game/tests && npm run mj:test mj-XX  (VERT obligatoire avant push)
4. game-mj-reviewer → Section 0 (figé) + checklist 5 sections + Section 6 (couverture spec)
5. Papa Yann valide → juge le RESSENTI (plus le débogueur) → game-mj-pmo grave
```

Voie express (patch/bugfix MJ existant) : lire figé → fix → harnais vert → push. Tweak cosmétique : direct (hook figeage = filet). Max 5 itérations reviewer ↔ dev.

## Structure d'un mini-jeu

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>MJ-XX — Nom</title>
  <link rel="stylesheet" href="css/common.css">
  <style>
    /* --- GABARIT HEADER CANONIQUE (ne pas inventer, copier tel quel) --- */
    * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; user-select:none; }
    body { background:#1a1a2e; font-family:'Fredoka One',sans-serif; color:#fff; display:flex; flex-direction:column; height:100dvh; overflow:hidden; }
    #app { display:flex; flex-direction:column; height:100dvh; max-width:680px; margin:0 auto; width:100%; }
    .hdr {
      display:flex; align-items:center; gap:10px;
      padding:6px 12px; flex-shrink:0;
      background:rgba(0,0,0,0.25);
      border-bottom:1px solid rgba(255,255,255,0.08);
    }
    .hdr a {
      color:#fff; text-decoration:none; font-size:1.3rem;
      background:rgba(255,255,255,0.12); border-radius:8px;
      padding:4px 10px; font-weight:900; flex-shrink:0;
    }
    .hdr a:active { background:rgba(255,255,255,0.25); }
    .htitle { flex:1; font-size:1rem; font-weight:900; }
    /* --- FIN GABARIT HEADER --- */
  </style>
</head>
<body>
<div id="app">

  <!-- HEADER — copier tel quel, changer uniquement l'emoji et le titre -->
  <div class="hdr">
    <a href="index.html">&#8592;</a>
    <span class="htitle">🎯 Titre du jeu</span>
  </div>

  <!-- contenu du jeu -->

</div>
  <script src="js/bus-svg.js"></script>
  <script src="js/data.js"></script>
  <script src="js/tracker.js"></script>
  <script src="js/sounds.js"></script>
  <script src="js/victory-sounds.js"></script>
  <script>
    // jeu inline
  </script>
</body>
</html>
```

**Règle header MILITAIRE** : copier le gabarit `.hdr` ci-dessus à la lettre. Ne jamais créer `.game-header`, `.header-text`, `.header-title`, `.header-sub` ou tout autre variante inventée. Le header fait **~30px de hauteur** (`padding:6px 12px`). `back-button.js` injecte automatiquement la flèche ← sobre — ne pas créer un gros bouton bus manuellement.

## État jeux

- **22 mini-jeux actifs** (MJ-01 à MJ-20 + max-adventure + mj-pose-tiles)
- **Retirés du menu** : MJ-02/03/07/10 (voir [`game/memory/state.md`](../../game/memory/state.md))
- **Bugs critiques** : voir state.md (EP-024 Max Adventure, EP-022 MJ-04 boucle)

## Anti-patterns sur mini-jeux

- ❌ Emoji 🚌 ou div CSS colorée pour un bus
- ❌ Hex couleur hardcodé (`#FFCC00` au lieu de `LIGNES.M1.couleur`)
- ❌ `fetch()` dans HTML local
- ❌ Chrono qui stresse / messages "perdu"
- ❌ Zones tap < 60 px
- ❌ Session > 10 min (Max décroche)
- ❌ Texte silencieux non phonétique sans bouton son

## Cross-références

- État déploiement : [`game/memory/state.md`](../../game/memory/state.md)
- Règles UX détaillées : [`game/memory/rules.md`](../../game/memory/rules.md)
- Stack technique : [`game/memory/stack.md`](../../game/memory/stack.md)
- Specs jeu par jeu : [`game/docs/jeux/INDEX.md`](../../game/docs/jeux/INDEX.md)
- Sous-PMO MJ : [`.claude/agents/game-mj-pmo.md`](../agents/game-mj-pmo.md)

---

_Refonte 2026-05-13 : extrait des règles MJ du CLAUDE.md racine pour auto-chargement path-scoped._
