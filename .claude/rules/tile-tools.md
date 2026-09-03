---
paths:
  - "site/tile-tools/**"
  - "site/tools/**"
  - "site/mj-pose-tiles.html"
---

# Tile-tools LimeZu — règles auto-chargées

> Chargé automatiquement dès que Claude touche un fichier du pipeline tile-tools ou des outils tile.
> Source de vérité : [`studio/minijeux/pmo/INVARIANTS.md`](../../studio/minijeux/pmo/INVARIANTS.md) + skill global [`.claude/skills/maxplay-tiles/LESSONS.md`](.claude/skills/maxplay-tiles/LESSONS.md) (30+ leçons gravées).

## Règles d'or NON NÉGOCIABLES

### Mnémonique tile (gravée 2026-05-08)
- **Asphalt H** : `Asphalt_1_Variation_2` propre · `_14` sale
- **Asphalt V** : `Asphalt_1_Variation_8` propre · `_15` sale
- *"2 propre H, 8 propre V, 14 sale H, 15 sale V"*

### Sidewalk_1 ≠ Sidewalk_2-6
Mapping figé. Positions #11-#20 diffèrent fondamentalement entre sw_1 et sw_2-6.
- **Source unique** : `styles.py` (fonction de résolution)
- **Anti-pattern** : convertir sw_1 ↔ sw_2 aveuglément

### Surfaces
- **Béton** (trottoir/asphalte) = tile unique uniforme par défaut. Variations max 10%.
- **Nature** (herbe, jardin) = variations OK et même recommandées (anti-mono).

### Source unique constantes
- **`vocab.py`** depuis 2026-05-12 — fichier de référence unique pour toutes les constantes tiles
- **`cartography.json`** DEPRECATED — ne plus consulter, ne plus modifier

## Boîte de réception Papa Yann (depuis 2026-07-13)

**En DÉBUT de toute session tile** : lire la table Supabase `tile_refs` (MCP) —
`select * from tile_refs where status = 'nouveau'`. Papa Yann y envoie ses compos
depuis le bouton « ☁️ Envoyer à Claude » du tile-picker (kind `reference` = brique
canonique loi · `carte` = souhait à réaliser). Après intégration en recette .py :
`update tile_refs set status = 'integre'`. Le copier-coller de snippets est aboli.

## Workflow OBLIGATOIRE (3 étapes)

```
1. game-tile-simplifier  → ANALYSE structurée (photo/description → décomposition)
2. game-tile-designer    → recette test_<nom>.py + render.py PNG + AUTO-CRITIQUE PNG
3. game-tile-reviewer    → verdict PASS/FAIL (max 5 itérations)
```

Après PASS → user valide → graver les leçons dans `LESSONS.md` + `PIPELINE-MEMORY.md` (main agent ou `game-pmo` unifié).

## Règles BRIQUE avant MACRO (gravée 2026-05-12)

> "Ne JAMAIS coder de macro/miroir/composition sans avoir validé visuellement chaque tile candidate isolée."

**Méthode validée** : planche comparative HTML/PNG des tiles candidates avant toute composition.

**Anti-pattern** : "j'ai écrit donc ça marche" — sans render PNG = sans validation.

## Règles de RENDU

1. **Toute recette `.py` DOIT** :
   - Importer `vocab.py` (pas de constante en dur)
   - Utiliser format SNIPPET dict
   - Passer par `scripts/render.py` → PNG
   - Auto-inspection PNG par `game-tile-designer` AVANT handoff `game-tile-reviewer`
2. **PNG INVALIDE = recette INVALIDE** — pas d'exception.

## Outils de design (hub web)

| Outil | Usage |
|-------|-------|
| `site/tools/index.html` | **Hub** point d'entrée |
| `site/tools/mockups-routes.html` | Mockups échelle uniforme + bouton "Éditer" → tile-picker |
| `site/tools/tile-library-v3.html` | Patterns prêts à l'emploi |
| `site/tools/tile-picker.html` | 9811 tiles catégorisées + matrice drag&drop + export Python |
| `site/tools/brick-explorer.html` | Validation tile par tile (mini-render 3×3) |

## Cross-références

- Skill : [`.claude/skills/maxplay-tiles/SKILL.md`](.claude/skills/maxplay-tiles/SKILL.md)
- Leçons : [`.claude/skills/maxplay-tiles/LESSONS.md`](.claude/skills/maxplay-tiles/LESSONS.md)
- PMO unifié JEU (domaine tile inclus) : [`.claude/agents/game-pmo.md`](../agents/game-pmo.md)
- Pipeline mémoire : `site/tile-tools/PIPELINE-MEMORY.md`
- README pipeline : [`site/tile-tools/README.md`](../../site/tile-tools/README.md)

---

_Refonte 2026-05-13 : extrait des règles tile du CLAUDE.md racine pour auto-chargement path-scoped._
