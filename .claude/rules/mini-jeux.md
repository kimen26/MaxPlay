---
paths:
  - "site/mj-*.html"
  - "site/index.html"
  - "site/js/**"
  - "studio/minijeux/docs/jeux/**"
---

# Mini-jeux HTML — règles auto-chargées

> Chargé dès que Claude touche un mini-jeu HTML, ses assets JS, ou ses specs.
> Source de vérité : [`studio/minijeux/memory/INVARIANTS.md`](../../studio/minijeux/memory/INVARIANTS.md) + [`studio/minijeux/docs/STANDARD-MJ.md`](../../studio/minijeux/docs/STANDARD-MJ.md) (CONTRAT MJ v2, gabarit mj-shell, API briques, règle cloud.js) + [`studio/minijeux/docs/STACK.md`](../../studio/minijeux/docs/STACK.md).

## ⛔ AVANT DE MODIFIER UN mj-XX.html — LECTURE OBLIGATOIRE

1. Lire [`figees/mj-XX.md`](../../studio/minijeux/docs/jeux/figees/) s'il existe (réinjecté par le hook `figees-injector.ps1` — le lire, pas l'ignorer).
2. **🔒 = LOI**. **❌ 🔒 = régression déjà commise, INTERDITE.**
3. Contredit une ligne 🔒 → **STOP**, demande à Papa Yann de défiger explicitement.
4. Comportement validé par Papa Yann sans fichier figé → le créer TOI-MÊME (sinon perdu au `/compact`).
5. Papa Yann fige une décision → graver IMMÉDIATEMENT mot pour mot dans `figees/mj-XX.md` (toi-même ou `game-pmo`).

> Triple verrou (incident MJ-21, 2026-05-15) : hook PreToolUse + cette règle + `studio/minijeux/CLAUDE.md`.

## Règles UX NON NÉGOCIABLES (cible 3.5-4 ans)

Zéro pénalité punitive · feedback < 200 ms · zones tap ≥ 80×80 px · sessions 3-8 min · phonétique uniquement (Max ne lit pas le silencieux).

## Bus SVG et couleurs (gravé incident session 6)

- **TOUJOURS** `busSVG()`/`busSVGHiddenNum()` de [`site/js/bus-svg.js`](../../site/js/bus-svg.js) — **JAMAIS** d'emoji 🚌 ni de `<div>` CSS colorée.
- Couleurs IDFM **TOUJOURS** via `LIGNES` de [`site/js/data.js`](../../site/js/data.js) — jamais de hex en dur.
- HTML local ne peut PAS `fetch()` : data via `<script src="data.js">` (assigne `window.NAME`).

## 🧪 Harnais de test OBLIGATOIRE avant tout push (EP-038)

```
cd studio/minijeux/tests && node audit-gabarit.mjs mj-XX && npm run mj:test mj-XX
```

Vert → push autorisé. Rouge → corriger d'abord. Règle 2-strikes : 2e fix sur le même symptôme → ajouter un cas qui reproduit le bug dans le spec avant de recorriger. Batterie complète (sécurité/audio/UX/perf) sur demande : agents `game-test-secu`/`game-test-audio`/`game-mj-reviewer`.

## Workflow MJ

`MECANIQUES.md` (re-skin avant code neuf) → `game-conseiller` (cadrage validé PY) → figeage initial → `game-dev` (code + spec Playwright) → harnais VERT → `game-mj-reviewer` → Papa Yann juge le RESSENTI → graver figées + backlog.

## Anti-patterns

❌ Emoji bus/hex en dur · ❌ `fetch()` local · ❌ chrono stressant/"perdu" · ❌ tap < 60px · ❌ session > 10 min · ❌ texte silencieux sans son.

## Cross-références

État jeux / count : `memory/INVARIANTS.md` § État déploiement + `site/js/catalog.js` · Bugs : `memory/MEMORY.md` § Bugs · Specs par jeu : `docs/jeux/INDEX.md` · PMO : [`.claude/agents/game-pmo.md`](../agents/game-pmo.md)

---

_Refonte 2026-05-13, allégée HO-G07 (2026-09-03) : contrat MJ v2 + gabarit mj-shell + règle cloud.js déplacés dans `STANDARD-MJ.md` (source unique), chemins `pmo/` → `memory/`._
