---
paths:
  - "studio/minijeux/tools/**"
  - "site/mj-pose-tiles.html"
---

# Tile-tools LimeZu — règles auto-chargées

> Chargé automatiquement dès que Claude touche un fichier du pipeline tile-tools ou des outils tile.
> Source de vérité : [`studio/minijeux/memory/INVARIANTS.md`](../../studio/minijeux/memory/INVARIANTS.md) + skill global [`.claude/skills/maxplay-tiles/LESSONS.md`](../skills/maxplay-tiles/LESSONS.md) (30+ leçons gravées).

## Règles d'or NON NÉGOCIABLES

- **Mnémonique tile** : Asphalt H `_2` propre/`_14` sale · Asphalt V `_8` propre/`_15` sale ("2 propre H, 8 propre V, 14 sale H, 15 sale V").
- **Sidewalk_1 ≠ Sidewalk_2-6** : mapping figé, positions #11-#20 diffèrent. Source unique : `vocab.py`. Anti-pattern : convertir sw_1↔sw_2 aveuglément.
- **Béton** = tile unique uniforme (variations max 10 %). **Nature** = variations recommandées (anti-mono).
- **Source unique des constantes : `vocab.py`** (depuis 2026-05-12). `cartography.json` DEPRECATED — ne plus consulter.

## Boîte de réception Papa Yann (depuis 2026-07-13)

Début de session tile : lire la table Supabase `tile_refs` (MCP) — `select * from tile_refs where status = 'nouveau'`. Après intégration en recette `.py` : `update tile_refs set status = 'integre'`.

## Workflow OBLIGATOIRE (3 étapes)

`game-tile-simplifier` (ANALYSE) → `game-tile-designer` (recette `.py` + render.py PNG + auto-critique) → `game-tile-reviewer` (PASS/FAIL, max 5 itérations). Après PASS → user valide → graver les leçons dans `LESSONS.md` + `PIPELINE-MEMORY.md`.

## Règle BRIQUE avant MACRO (gravée 2026-05-12)

Jamais coder de macro/miroir/composition sans avoir validé visuellement chaque tile candidate isolée (planche comparative HTML/PNG). Anti-pattern : "j'ai écrit donc ça marche" sans render PNG.

## Règles de RENDU

Toute recette `.py` DOIT importer `vocab.py` (jamais de constante en dur), format SNIPPET dict, passer par `scripts/render.py` → PNG, auto-inspection avant handoff reviewer. **PNG invalide = recette invalide, pas d'exception.**

## Outils (hub web `studio/minijeux/tools/web/`)

`index.html` (hub) · `mockups-routes.html` (mockups échelle uniforme + éditer) · `tile-library-v3.html` (patterns prêts) · `tile-picker.html` (9811 tiles, matrice drag&drop, export Python) · `brick-explorer.html` (validation tile par tile).

## Cross-références

- Skill : [`.claude/skills/maxplay-tiles/SKILL.md`](../skills/maxplay-tiles/SKILL.md)
- Pipeline mémoire : [`studio/minijeux/tools/tile-tools/PIPELINE-MEMORY.md`](../../studio/minijeux/tools/tile-tools/PIPELINE-MEMORY.md)
- README pipeline : [`studio/minijeux/tools/tile-tools/README.md`](../../studio/minijeux/tools/tile-tools/README.md)
- PMO unifié JEU (domaine tile inclus) : [`.claude/agents/game-pmo.md`](../agents/game-pmo.md)

---

_Refonte 2026-05-13, allégée HO-G07 (2026-09-03) : chemins `site/tile-tools/` et `site/tools/` → `studio/minijeux/tools/{tile-tools,web}/` (déplacement G10), `pmo/` → `memory/`._
