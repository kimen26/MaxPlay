---
paths:
  - "game/web/mj-*.html"
  - "game/web/index.html"
  - "game/web/js/**"
  - "game/docs/jeux/**"
---

# Mini-jeux HTML — règles auto-chargées

> Chargé automatiquement dès que Claude touche un mini-jeu HTML, ses assets JS, ou ses specs.
> Source de vérité : [`game/pmo/INVARIANTS.md`](../../game/pmo/INVARIANTS.md) + [`game/memory/rules.md`](../../game/memory/rules.md) + [`game/memory/stack.md`](../../game/memory/stack.md).

## Règles UX NON NÉGOCIABLES (cible 3.5-4 ans)

1. **Zéro pénalité punitive** — pas de "perdu", pas de "raté", pas de chronos qui stressent.
2. **Feedback < 200 ms** — toute action de Max → réaction visuelle/sonore immédiate.
3. **Zones tap min 80×80 px** — doigts d'enfant, marge d'erreur large.
4. **Sessions 3-8 min** — pas de jeu chronophage. Fin courte et gratifiante.
5. **Phonétique uniquement** — Max lit phonétique, pas le silencieux (pas de "Champ-Élysées").

## Règles bus SVG (gravée incident session 6)

- **TOUJOURS** utiliser `busSVG()` ou `busSVGHiddenNum()` de [`game/web/js/bus-svg.js`](../../game/web/js/bus-svg.js)
- **JAMAIS** d'emoji 🚌 dans un mini-jeu
- **JAMAIS** de `<div>` CSS coloré qui imite un bus
- Pour quiz multi-couleurs : `selectDistinctColors(pool, n)` — garantit lisibilité

## Règles couleurs IDFM

- **TOUJOURS** utiliser `LIGNES` de [`game/web/js/data.js`](../../game/web/js/data.js)
- **JAMAIS** de hex couleur hardcodé dans le HTML/JS du jeu
- Source de vérité IDFM : [`game/docs/ratp-colors.json`](../../game/docs/ratp-colors.json) (26 actives + 362 réf)

## Règles HTML local (gravée 2026-05)

- HTML local (file://) **ne peut PAS** faire de `fetch()`
- Pour data : utiliser `<script src="data.js">` qui assigne `window.NAME`
- **Jamais** de `fetch('./data.json')` dans un mini-jeu local

## Workflow MJ

```
1. game-conseiller  → challenge l'idée (binôme créatif Opus)
2. game-dev         → code HTML vanilla (Sonnet)
3. game-mj-reviewer → checklist 5 sections : Bus/couleurs · UX 3.5-4 · Audio · Technique · Vocab/péda
4. user valide      → game-mj-pmo grave (PIPELINE-MEMORY-MJ.md)
```

Max 5 itérations reviewer ↔ dev.

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
      padding:8px 12px; flex-shrink:0;
      background:rgba(0,0,0,0.25);
      border-bottom:1px solid rgba(255,255,255,0.08);
    }
    .hdr a {
      color:#fff; text-decoration:none; font-size:1.3rem;
      background:rgba(255,255,255,0.12); border-radius:8px;
      padding:4px 10px; font-weight:900; flex-shrink:0;
    }
    .hdr a:active { background:rgba(255,255,255,0.25); }
    .htitle { flex:1; font-size:1.05rem; font-weight:900; }
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

**Règle header MILITAIRE** : copier le gabarit `.hdr` ci-dessus à la lettre. Ne jamais créer `.game-header`, `.header-text`, `.header-title`, `.header-sub` ou tout autre variante inventée. Le header fait ~40px de hauteur — pas plus.

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
