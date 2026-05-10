# PIPELINE-MEMORY — Mémoire méta-process du pipeline tile-tools

> **Quoi** : journal des décisions de design, frictions résolues, retours user sur la **boucle elle-même** du pipeline tile-tools.
> Pas un journal des tiles (ça c'est `~/.claude/skills/maxplay-tiles/LESSONS.md`).
> Pas un journal projet (ça c'est `game/tasks/BACKLOG.md`).
> **C'est le journal de comment notre système d'agents tile évolue.**
>
> **Garant** : [`game-tile-pmo`](../../../.claude/agents/game-tile-pmo.md) — ajoute une entrée datée à chaque session où le pipeline lui-même change.
>
> **À lire** au démarrage de toute session où on touche aux agents tile (création, refonte, debug), pas pour une simple compo tile.

---

## 1. Architecture actuelle (snapshot 2026-05-11)

```
Main agent (Sonnet/Opus)
  └─ game-pmo (Haiku) [PMO niveau pôle JEU]
      • scope : state.md + BACKLOG.md
      • classifie inputs (6 catégories DÉCISION/LEÇON/TODO/QUESTION/INFO/TRAITEMENT)
      └─ game-tile-pmo (Haiku) [sous-spé pipeline tile]
          • scope strict : LESSONS.md + cartography.json + patterns.js + recipes_data.js + PIPELINE-MEMORY.md (ce fichier)
          • remonte synthèse 5-10 lignes à game-pmo
          • NE TOUCHE PAS state.md ni BACKLOG.md

[Sachants tile à créer — design en cours validation user 2026-05-11]
  game-tile-simplifier (Sonnet) → analyse scène, applique règles
  game-tile-designer  (Sonnet) → recette Python + PNG
  game-tile-reviewer  (Haiku)  → verdict PASS/FAIL avec checklist hardcodée
  → boucle d'apprentissage : correction user → game-tile-pmo → LESSONS + ce fichier
```

**Skills mobilisés** :
- `~/.claude/skills/maxplay-tiles/` (technique LimeZu, 30+ leçons cartographie)
- `~/.claude/skills/multi-agent-pmo/` (template PMO normé, créé 2026-05-10)

---

## 2. Décisions de design (chronologique)

### 2026-05-10 — Création de `tile-pmo` (version 1, supprimée le même jour)

**Décision** : créer un agent PMO Haiku pour capturer les leçons tile.
**Raison** : 30+ leçons accumulées éparpillées dans LESSONS.md uniquement, invisibles au reboot.
**Résultat** : agent créé mais **n'écrivait que dans LESSONS.md** → invisible au reboot, ne touchait pas BACKLOG ni state.md.

### 2026-05-10 — Audit user "tu fais pas ton job de garant"

**Décision** : refonte complète avec **cartographie 8 fichiers** + checklist 8 cases.
**Résultat** : fiche poste enrichie mais toujours **agent unique tile-pmo** sans hiérarchie. Confondait scope pôle (state.md, BACKLOG.md) et scope tile (LESSONS, cartography).

### 2026-05-10 — Refonte hiérarchique : game-pmo + game-tile-pmo

**Trigger user** : *"pkoi il est pas agent de Game ? et on peut avoir une sous spécialisation Tile si tu veux"*
**Décision** : 2 agents : `game-pmo` (parent niveau pôle) + `game-tile-pmo` (sous-spé scope strict 4 fichiers).
**Raison** (validée par deepsearch Feb-May 2026) :
- Memory isolation problem (Hindsight mai 2026) : sous-agents siloed, doivent graver dans fichiers projet
- Hierarchical decomposition (Google ADK) : parent → enfant uniquement, jamais cross-pôle
- Coordination substrate pattern : state.md + BACKLOG.md comme source de vérité partagée
**Résultat** : architecture testable, scope strict par agent, format synthèse remontée standardisé.

### 2026-05-10 — Création skill `multi-agent-pmo`

**Trigger user** : *"je veux bien en faire un skill de ton deepsearch pmo stp"*
**Décision** : capitaliser le pattern PMO multi-agent en skill global `~/.claude/skills/multi-agent-pmo/`.
**Contenu** : template 12 sections + 5 trouvailles deepsearch + 8 anti-patterns + checklist création + sources.
**Résultat** : réutilisable pour d'autres pôles (ex futur si on segmente narration-pmo) ou autres projets.

### 2026-05-11 — Constat manque sachant tile

**Trigger user** : *"j'ai pas de sachant en tile, un mec je lui donne une image y sait me la mettre en mode tile"*
**Constat** : on avait créé **2 PMO comptables** mais **0 sachant**. game-dev ne connaît pas LimeZu en profondeur. Les `pixel-map-simplifier/designer/reviewer` globaux **étaient pile pour ça** mais sont sur une version fossile :
- Format de sortie : JS `MAP_NOM` au lieu de Python `recipes/*.py`
- Tileset catalog : `~/.claude/skills/pixel-maps/tileset-catalog.md` (ancien) au lieu de `cartography.json` (actuel)
- Pas de connaissance des 30 leçons MaxPlay (anti-mono, `_2`/`_8` propres, croix `_13`, INT/EXT corners)
- Pas connectés à game-tile-pmo (pas de boucle d'apprentissage)
**Décision** : créer 3 agents projet-scopés `game-tile-simplifier`, `game-tile-designer`, `game-tile-reviewer` qui :
- Lisent skill maxplay-tiles + LESSONS + cartography.json (sources de vérité actuelles)
- Sortent en format Python `recipes/*.py`
- Bouclent avec game-tile-pmo (qui grave les corrections user en L-xxx)
**Statut** : design validé, implémentation à faire.

### 2026-05-11 — Création de ce fichier PIPELINE-MEMORY.md

**Trigger user** : *"tout ce qu'on a vu dans cette discussion mes corrections et challenge ca va remonter où ?"*
**Décision** : créer un journal méta-process distinct de LESSONS (tile technique) et BACKLOG (projet).
**Garant** : game-tile-pmo (ajouter ce fichier à son scope strict).

---

## 3. Frictions résolues

### F-001 : PMO ne gravait que dans 1 fichier
- **Symptôme** : leçons invisibles au reboot, user devait re-expliquer
- **Cause** : confusion garant vs secrétaire, pas de cartographie multi-fichiers
- **Résolution** : refonte fiche poste avec cartographie 8 fichiers explicite + checklist
- **Anti-pattern gravé** : "un PMO qui ne grave que dans 1 fichier n'est pas un PMO, c'est un journal intime"

### F-002 : Confusion scope pôle vs scope tile
- **Symptôme** : tile-pmo (v1) écrivait dans state.md → confusion avec scope global JEU
- **Cause** : pas de hiérarchie, agent monolithique
- **Résolution** : split parent (game-pmo) / enfant (game-tile-pmo) avec scope strict + format synthèse remontée
- **Pattern gravé** : "sous-spé ne touche jamais aux fichiers du parent — remonte une synthèse formatée"

### F-003 : 2 PMO mais 0 sachant tile
- **Symptôme** : couverture comptable complète, mais personne pour transformer une image en tile
- **Cause** : focus initial sur la persistance, oubli du métier
- **Résolution** : 3 agents sachants à créer (simplifier/designer/reviewer)
- **Pattern gravé** (skill multi-agent-pmo, anti-pattern #5) : "pour chaque domaine structuré, prévoir PMO ET sachant — sinon il manque un côté"

### F-004 : pixel-map-* globaux non réutilisables
- **Symptôme** : les agents existaient mais inutilisables tels quels pour MaxPlay actuel
- **Cause** : tileset-catalog ancien, format JS, déconnectés de cartography/LESSONS
- **Résolution** : créer des équivalents projet-scopés (game-tile-*), garder pixel-map-* globaux pour d'autres projets potentiels
- **Pattern gravé** : "ne pas modifier un agent global pour les besoins d'un projet — créer un équivalent projet"

---

## 4. Patterns user observés (collaboration)

### P-001 : Propositions concrètes > questions multi-choix abstraites
- **Observation** : *"pas une recherche rapide en ligne un deep search"* + rejet d'une AskUserQuestion 3-choix
- **Conséquence** : préférer **1 proposition détaillée + question simple de validation** plutôt qu'une menu 3-options
- **Application** : à graver aussi en auto-memory feedback pour persistance cross-sessions

### P-002 : User répète calmement quand on ne comprend pas
- **Observation** : *"je te l'ai dit calmement 5x de suite"* sur `_14` sale
- **Conséquence** : si user signale 2x la même chose sans amélioration visible → STOP, zoomer, comparer (L-016 gravée dans LESSONS)
- **Application** : règle déjà active côté tile-pmo

### P-003 : User pointe le manque avec une question rhétorique
- **Observation** : *"j'ai pas de sachant en tile, t'es bien conscient ?"*
- **Conséquence** : reconnaître le manque immédiatement avant de proposer ("Tu as raison à 200%")
- **Application** : pas de défense, on confirme le constat puis on propose

### P-004 : User veut une boucle d'apprentissage positive
- **Observation** : *"on a une boucle d'apprentissage et positive"*
- **Conséquence** : chaque correction user doit enrichir le système (LESSONS, PIPELINE-MEMORY, cartography) pour que les futures sessions soient meilleures
- **Application** : c'est l'objectif central du pipeline 3-sachants + game-tile-pmo

---

## 5. Hypothèses à tester (suivi)

| Hypothèse | À tester quand | Critère |
|-----------|----------------|---------|
| Reviewer en Haiku suffit (verdict structuré rapide) | 1ère session pipeline complet | < 5 itérations pour PASS sur compo simple |
| Designer en Sonnet vs Opus | 1ère session sur scène complexe (carrefour 4 voies + bâtiments) | Sonnet capable de respecter les 6 règles d'or sans dériver |
| Simplifier nécessaire ou fusionnable avec designer | Après 3 sessions | Si simplifier sort toujours "passez à designer" sans valeur ajoutée, fusionner |
| Auto-déclenchement game-tile-pmo à chaque PASS reviewer | Après 1ère boucle complète | Pas de leçon perdue entre PASS et next session |

---

## 6. Sources externes & inspirations

- **Skill** : [`~/.claude/skills/multi-agent-pmo/SKILL.md`](C:/Users/kimen/.claude/skills/multi-agent-pmo/SKILL.md) (template normé)
- **Skill** : [`~/.claude/skills/maxplay-tiles/SKILL.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/SKILL.md) (règles LimeZu + 30 LESSONS)
- **PMO modèle** : [`.claude/agents/narration-pmo.md`](../../../.claude/agents/narration-pmo.md) (classification 6 catégories, autonomie 3 niveaux)
- **Agents globaux abandonnés** : `~/.claude/agents/pixel-map-simplifier.md`, `pixel-map-designer.md`, `pixel-map-reviewer.md` (version fossile, format JS, non connectés cartography.json)
- **Deepsearch Feb-May 2026** :
  - Memory isolation (Hindsight mai 2026)
  - Coordination substrate (claude-progress.txt pattern)
  - Hierarchical decomposition (Google ADK + Anthropic engineering)
  - « 1 goal/input/output/handoff » (Anthropic blog)

---

## 7. Comment alimenter ce fichier

À chaque session où **le pipeline lui-même** change, `game-tile-pmo` ajoute :
- Une entrée dans § 2 (Décisions de design) si nouveau agent / refonte / suppression
- Une entrée dans § 3 (Frictions) si problème résolu sur la boucle
- Une entrée dans § 4 (Patterns user) si nouveau tic de collaboration observé
- Une entrée dans § 5 (Hypothèses) si nouvelle expérimentation à suivre

**Ne pas ajouter ici** :
- Les leçons sur les tiles individuelles → `LESSONS.md`
- Les bugs/features projet → `BACKLOG.md`
- Les sessions tile sans changement de pipeline → ailleurs (state.md via game-pmo)
