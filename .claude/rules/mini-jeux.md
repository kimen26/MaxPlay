---
paths:
  - "site/mj-*.html"
  - "site/index.html"
  - "site/js/**"
  - "studio/minijeux/docs/jeux/**"
---

# Mini-jeux HTML — règles auto-chargées

> Chargé automatiquement dès que Claude touche un mini-jeu HTML, ses assets JS, ou ses specs.
> Source de vérité : [`studio/minijeux/pmo/INVARIANTS.md`](../../studio/minijeux/pmo/INVARIANTS.md) + [`studio/minijeux/memory/rules.md`](../../studio/minijeux/memory/rules.md) + [`studio/minijeux/memory/stack.md`](../../studio/minijeux/memory/stack.md).

## ⛔ AVANT DE MODIFIER UN mj-XX.html — LECTURE OBLIGATOIRE

Avant **TOUT** `Edit`/`Write` sur `site/mj-XX.html` :

1. Lire [`studio/minijeux/docs/jeux/figees/mj-XX.md`](../../studio/minijeux/docs/jeux/figees/) s'il existe (le hook `figees-injector.ps1` le réinjecte automatiquement dans le contexte — le lire, pas l'ignorer).
2. Chaque ligne **🔒 est LOI**. Chaque ligne **❌ 🔒 est une régression déjà commise — INTERDITE**.
3. Si ton changement contredit une ligne 🔒 → **STOP**, demande à Papa Yann de défiger explicitement. Tu ne défiges JAMAIS de toi-même.
4. Si le fichier n'existe pas et que tu codes un comportement **validé par Papa Yann** → le créer via `game-mj-pmo` (sinon perdu au prochain `/compact`).
5. Quand Papa Yann dit « OK c'est figé / validé / on fige / ne change plus X » → invoquer `game-mj-pmo` IMMÉDIATEMENT pour graver la décision **mot pour mot** dans `figees/mj-XX.md`.

> Système créé 2026-05-15 suite incident MJ-21 (décision « bus en bas » répétée >10× puis régressée). Triple verrou : hook PreToolUse + cette règle + ligne LOI dans `studio/minijeux/CLAUDE.md`. Vérification : `game-mj-reviewer` Section 0.

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
- Source de vérité IDFM : [`studio/minijeux/docs/ratp-colors.json`](../../studio/minijeux/docs/ratp-colors.json) (26 actives + 362 réf)

## Règles HTML local (gravée 2026-05)

- HTML local (file://) **ne peut PAS** faire de `fetch()`
- Pour data : utiliser `<script src="data.js">` qui assigne `window.NAME`
- **Jamais** de `fetch('./data.json')` dans un mini-jeu local

## 🧪 HARNAIS DE TEST OBLIGATOIRE avant tout push d'un mj-XX (EP-038)

> Créé 2026-05-16 suite REX MJ-21 (33 commits, ~20 d'essais à l'aveugle). Papa Yann n'est plus le débogueur — la machine teste, lui juge le produit.

**Avant CHAQUE `git push` touchant `site/mj-XX.html`** :

```
cd studio/minijeux/tests && npm run mj:test mj-XX
```

- **Vert** → push autorisé. **Rouge** → NE PAS pusher, corriger d'abord.
- Stack : Playwright 1.60+ + Chromium (réel, headless). Pas jsdom (n'attrape pas SVG/animation).
- 1 spec par MJ : `studio/minijeux/tests/mj-XX.spec.mjs` (~30-50 lignes : smoke console + chemin gagnant scripté + 1 assert par ligne 🔒 du fichier figé). Modèle : `mj-21.spec.mjs`.
- Un MJ sans spec qui passe au harnais = un MJ qu'on ne pushe pas (sauf tweak cosmétique trivial).
- **Règle 2-strikes** : 2e commit-fix sur le même symptôme → ajouter d'abord un cas qui reproduit le bug dans le spec (on ne teste pas un bug qu'on ne comprend pas → force la cause racine).

## Workflow MJ

```
0. game-conseiller  → cadrage 1 écran (layout+méca+péda) validé par Papa Yann AVANT code
1. game-mj-pmo      → figeage initial studio/minijeux/docs/jeux/figees/mj-XX.md
2. game-dev         → code HTML vanilla + studio/minijeux/tests/mj-XX.spec.mjs (ensemble)
3. harnais          → cd studio/minijeux/tests && npm run mj:test mj-XX  (VERT obligatoire avant push)
4. game-mj-reviewer → Section 0 (figé) + checklist 5 sections + Section 6 (couverture spec)
5. Papa Yann valide → juge le RESSENTI (plus le débogueur) → game-mj-pmo grave
```

Voie express (patch/bugfix MJ existant) : lire figé → fix → harnais vert → push. Tweak cosmétique : direct (hook figeage = filet). Max 5 itérations reviewer ↔ dev.

## Structure d'un mini-jeu — LE GABARIT `js/mj-shell.js` (décision Papa Yann 2026-07-14)

**UNE inclusion charge tout le cadre standard** (thème, golden, panneau 🧑‍🔬, tracking, cloud, célébrations) dans le bon ordre — plus JAMAIS la liste de 14 scripts à la main :

```html
<body>
<div id="app"><!-- markup du jeu (le .hdr/#pips/consigne sont créés par le gabarit s'ils manquent) --></div>
<script src="js/bus-svg.js"></script>   <!-- libs SPÉCIFIQUES au jeu seulement -->
<script src="js/data.js"></script>
<script src="js/mj-shell.js"></script>  <!-- LE GABARIT -->
<script>
MJ.ready(function () {
  const shell = MJ.init({
    id: 'mj-XX', emoji: '🎯', titre: 'Titre du jeu',
    golden: true,              // piste 4/6/8 + étoiles dans la piste (sinon false)
    consigne: true,            // barre consigne (texte centré, tap = réécouter, audio AUTO)
    onRepeat: fn,              // optionnel : audio custom au tap consigne (MP3 voix réelle)
    regle: { picto, texte, etapes: [{t, d}…] }   // panneau savant fou 🧑‍🔬 (v3)
  });
  shell.setConsigne('…');      // met à jour + lit tout seul (false en 2e arg = silencieux)
  // gameplay : shell.G.notePip(i, attempts, fromEl) · shell.G.showEnd({replayUrl})
});
</script>
</body>
```

- Le gabarit garantit `cloud.js` après `tracker.js` (règle 🚨) → avis 💬 → table Supabase `annotations`.
- Panneau règle : s'ouvre TOUT SEUL à la 1ʳᵉ partie. Les specs harnais doivent le fermer (`#ri-ok`) avant de dérouler le jeu.
- ⚠ Le CONTENU du jeu (mécanique, aides 💡, difficulté par étoile) demande une réflexion cohérente PAR JEU — le gabarit ne norme que le cadre.

### Ancien gabarit (référence, avant 2026-07-14)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>MJ-XX — Nom</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Fredoka+One&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/mp-theme.css">
  <style>
    /* --- GABARIT DESIGN SYSTEM v1 (juillet 2026) ---
       Le header .hdr est stylé par mp-theme.css (compat) : NE PAS redéclarer
       .hdr/.htitle en local. NE PAS mettre de background sur body :
       le fond vient de l'AMBIANCE (data-ambiance posé par mp-theme.js). */
    * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; user-select:none; }
    body { font-family:'Fredoka One',sans-serif; color:var(--ink); display:flex; flex-direction:column; height:100dvh; overflow:hidden; }
    #app { display:flex; flex-direction:column; height:100dvh; max-width:680px; margin:0 auto; width:100%; }
  </style>
</head>
<body>
<div id="app">

  <!-- HEADER — markup canonique, changer uniquement l'emoji et le titre.
       Style fourni par mp-theme.css (← rond 44px, titre Fredoka).
       regle-info.js ajoute ❓, comments.js ajoute 💬 automatiquement. -->
  <div class="hdr">
    <a href="index.html">&#8592;</a>
    <span class="htitle">🎯 Titre du jeu</span>
  </div>

  <!-- contenu du jeu -->

</div>
  <script src="js/bus-svg.js"></script>
  <script src="js/data.js"></script>
  <script src="js/tracker.js"></script>
  <script src="js/cloud.js"></script>      <!-- APRÈS tracker.js — sync Supabase (💬 + progression). SANS lui, comments.js pousse dans le vide. -->
  <script src="js/comments.js"></script>   <!-- bulle 💬 : appelle Cloud.schedulePush() → EXIGE cloud.js chargé avant -->
  <script src="js/sounds.js"></script>
  <script src="js/victory-sounds.js"></script>
  <script src="js/mp-theme.js"></script>
  <script src="js/celebrations.js"></script>
  <script>
    // jeu inline
  </script>
</body>
</html>
```

> 🚨 **Règle cloud.js NON NÉGOCIABLE** (gravée 2026-07-14, audit Supabase) : toute page qui charge `comments.js` (bulle 💬) OU appelle `Cloud.schedulePush()` DOIT charger `js/cloud.js` **après** `js/tracker.js`. La garde `window.Cloud && …` ne crash pas si cloud.js manque — elle **avale l'échec en silence** : les commentaires restent en localStorage et ne remontent JAMAIS en base. Incident : 32 mini-jeux + index.html + lecture.html avaient la bulle 💬 sans cloud.js → 0 commentaire poussé depuis le début. Vérif : `grep -L cloud.js $(grep -rl comments.js site/*.html)` doit être VIDE.

**Règle header MILITAIRE** (v2, Design System juillet 2026 — remplace le gabarit inline v1 sur décision Papa Yann, package `studio/minijeux/inbox/package-maxplay-design/`) : garder le markup `.hdr` ci-dessus à la lettre, **zéro règle CSS `.hdr` locale** (mp-theme.css fait autorité). Ne jamais créer `.game-header`, `.header-text`, `.header-title`, `.header-sub` ou toute autre variante inventée. `back-button.js` injecte automatiquement la flèche ← ronde 44px — ne pas créer un gros bouton bus manuellement.

## Design System v1 (source de vérité : `site/css/mp-theme.css` + `site/js/mp-theme.js`)

- 4 rôles couleur : fond+carte (sombres, viennent de l'AMBIANCE), `--accent` (clair, teinte avatar), `--gold` (or fixe, étoiles UNIQUEMENT).
- 6 ambiances `data-ambiance="nuit|jungle|ville|espace|arcade|musee"` — choisies dans l'atelier avatar, posées automatiquement par mp-theme.js. **Jamais de background body hardcodé** dans un MJ.
- Piste de questions `.mp-track`/`.mp-q` : ★ or = 1er coup · ✓ orange = après essai · 💡 rouge doux = aidé. Le résultat RESTE affiché. Gérée par mj-golden.js pour les jeux GOLDEN.
- Célébrations : `js/celebrations.js` (MaxFX) — `markPoint` à chaque bonne réponse, `finalStar` en fin de jeu (`cinematic` UNIQUEMENT sans-faute) + `belt` (rangement étoile normé). Micro-célébration ≤ 2 s, jamais punitif.

## État jeux

- **22 mini-jeux actifs** (MJ-01 à MJ-20 + max-adventure + mj-pose-tiles)
- **Retirés du menu** : MJ-02/03/07/10 (voir [`studio/minijeux/memory/state.md`](../../studio/minijeux/memory/state.md))
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

- État déploiement : [`studio/minijeux/memory/state.md`](../../studio/minijeux/memory/state.md)
- Règles UX détaillées : [`studio/minijeux/memory/rules.md`](../../studio/minijeux/memory/rules.md)
- Stack technique : [`studio/minijeux/memory/stack.md`](../../studio/minijeux/memory/stack.md)
- Specs jeu par jeu : [`studio/minijeux/docs/jeux/INDEX.md`](../../studio/minijeux/docs/jeux/INDEX.md)
- Sous-PMO MJ : [`.claude/agents/game-mj-pmo.md`](../agents/game-mj-pmo.md)

---

_Refonte 2026-05-13 : extrait des règles MJ du CLAUDE.md racine pour auto-chargement path-scoped._
