# Décisions de fond — PMO Game

> **Règle :** Une décision ici est DÉFINITIVE jusqu'à nouvelle décision explicite datée.
> En cas de doute : la dernière décision sur un sujet écrase les précédentes.
>
> Équivalent côté Narration : [`../../narration/pmo/decisions.md`](../../narration/pmo/decisions.md).
> Créé 2026-05-13 (extraction depuis `memory/state.md` lors de l'harmonisation Game ↔ Narration).

---

## 2026-05-13 — Refonte archi CLAUDE.md à 3 niveaux (doc Anthropic 2025)

**Contexte** : auteur aligne la structure CLAUDE.md sur doc Anthropic officielle (nested CLAUDE.md + path-scoped `.claude/rules/`) pour :
1. Réduire gonflement CLAUDE.md racine (219 → 107 lignes)
2. Charger règles contextualisées on-demand (zéro coût tant que fichier non touché)
3. Maintenir source de vérité 1/N (evite duplication décisions × N fichiers)

**Décisions** :
1. **Niveaux CLAUDE.md** : racine (219 l) → racine allégée (107 l, synopsis pôles + commandes trans) + `game/CLAUDE.md` (113 l, chargé auto si fichier sous game/ touché)
2. **Règles path-scoped** : `.claude/rules/` 6 fichiers, load auto si glob matches
   - `tile-tools.md` (80 l) : paths: `game/web/tile-tools/**`, `game/web/tools/**` — mnémonique 2/8/14/15, Sidewalk_1 mapping, vocab.py source unique, brique avant macro
   - `mini-jeux.md` (103 l) : paths: `game/web/mj-*.html`, `game/web/index.html` — UX zéro-pénalité, feedback <200ms, zones tap 80px, busSVG obligatoire, couleurs IDFM LIGNES
3. **Pas de duplication** : INVARIANTS.md sommet → rules répètent pour contexte → skills LESSONS.md capitalisent
4. **Hook UserPromptSubmit** : auto-rappel `/game-pmo` ou `/narration-pmo` si signal JEU/NARRATION détecté

**Impact** :
- `CLAUDE.md` racine : sections équipe agents déplacées vers `.claude/agents/game-pmo.md`, pôles compactées
- `game/CLAUDE.md` : PMO + Archiviste + INVARIANTS + équipe agents résumé
- `narration/CLAUDE.md` : symétrique
- `.claude/rules/` : 6 fichiers créés (tile-tools, mini-jeux, stories-process, personnages, univers, audio)

**Réf doc Anthropic** : [claude.com/docs/memory#how-claude-md-files-load](https://code.claude.com/docs/en/memory#how-claude-md-files-load) (nested CLAUDE.md, path-scoped rules, hook timing).

**Statut** : ✅ acté (3 commits 0ec2964f, 10a9df07, e49527e5).

---

## 2026-05-13 — Refonte structure PMO Game (harmonisation Game ↔ Narration)

**Contexte** : pôle Narration refondu 2026-05-12 (PMO proactif + Archiviste + INVARIANTS + audit-trail). Auteur demande la même rigueur côté JEU.

**Décisions tranchées** :
1. **Création `game/pmo/`** comme dossier dédié (équivalent `narration/pmo/`).
2. **Création `game-archiviste`** (Haiku, AUTO chaque signal structure) — équivalent `narration-archiviste`.
3. **Préfixage commandes strict net** : `/challenge-archiviste` → `/narration-archiviste-audit`, `/pmo-audit` → `/narration-pmo-audit`, création `/game-pmo-audit` et `/game-archiviste-audit`.
4. **`game/memory/state.md` réduit** aux sources de vérité statiques (jeux actifs, règles non-négociables, fichiers clés). Sessions migrées vers `sprint-log.md`, décisions vers `decisions.md` (ce fichier).
5. **`game/tasks/BACKLOG.md` déplacé** vers `game/pmo/backlog.md` (cohérence avec narration/pmo/backlog.md).

**Impact** : voir `audit-trail.md` entrée 2026-05-13.

---

## 2026-05-12 — Pivot Brique-avant-Macro (pipeline tile)

**Contexte** : 4 recettes virages 13×13 ont passé le pipeline (9/10 reviewer) mais ont été **visuellement invalidées** par Papa Yann ("Totalement faux, terrible même"). Cause : `vocab.py` contenait des constantes inventées (`COIN_INT_SE = sw_1` etc.) jamais validées visuellement.

**Décisions** :
- **Ne JAMAIS coder de macro/composition sans valider visuellement chaque tile candidate isolée** (L-029).
- Méthode validée : **planche comparative HTML/PNG** (1 image grille = validation famille entière instantanée).
- **`test_ref_papa_4virages.py`** = RÉFÉRENCE CANONIQUE virages (14×14 compo Papa Yann via tile-picker) — source de vérité pour reconstruction future.
- EP-VIRAGES-V2 à créer pour refonte depuis cette référence avec workflow brique-avant-macro.

**Impact fichiers** :
- `~/.claude/skills/maxplay-tiles/LESSONS.md` Corrections 9-12 (4 leçons gravées)
- `game/web/tile-tools/PIPELINE-MEMORY.md` F-008/F-009 (frictions), P-008/P-009/P-010 (patterns)
- `game/pmo/backlog.md` L-029 à L-032 (4 leçons + EP-VIRAGES-V2)

**Statut** : ✅ acté. EP-VOCAB clôturé. Routes (3 recettes) OK. Virages à refaire.

---

## 2026-05-12 — Mapping LimeZu SW_1 ↔ SW_2-6

**Découverte** : SW_1 a 10 positions (#11-#20) **décalées** vs SW_2-6 sur la même grille tileset.

**Décision** : table de mapping figée dans `game/web/tile-tools/styles.py` + module 6 styles (blanc/beige/gris_bleu/jaune/bleu/gris) avec résolution auto.

**Source unique** : `styles.py` (créé 2026-05-12).

**Statut** : ✅ acté. L-030 gravée.

---

## 2026-05-12 — `vocab.py` source unique tiles (cartography.json deprecated)

**Décision** : `game/web/tile-tools/vocab.py` (46 constantes nommées français + validation auto au boot) remplace définitivement `cartography.json`.

**Impact** :
- `cartography.json` marqué **DEPRECATED** (champ `_DEPRECATED` dans le JSON, conservé pour traçabilité).
- Tous les nouveaux scripts/recettes lisent `vocab.py`.

**Statut** : ✅ acté.

---

## 2026-05-11 — Architecture équipe pôle JEU 3-sous-domaines

**Contexte** : pôle JEU s'organise autour de 3 sous-domaines distincts :
- Mini-jeux HTML vanilla (mj-XX)
- Tile-tools LimeZu (recipes Python, cartography, patterns)
- WexWorld Phaser (Phase 2, RPG-like — à venir)

**Décision architecture** :
```
game-pmo (parent Haiku, AUTO chaque signal JEU)
├── game-tile-pmo (sous-spé maps tile, Haiku)        ✅
├── game-mj-pmo (sous-spé mini-jeux HTML, Haiku)     ✅
└── game-wexworld-pmo (sous-spé Phaser, Haiku)        ⏳ Phase 2

Sachants :
- game-conseiller (Opus, transverse — voix produit)   ✅
- game-dev (Sonnet, dev général)                       ✅
- game-mj-reviewer (Haiku, validateur MJ)              ✅
- game-tile-{simplifier, designer, reviewer}           ✅
- game-wexworld-{designer, tester}                     ⏳ Phase 2
```

**Règle hiérarchie** : main → game-pmo → sous-spé. Communication enfant → parent uniquement. Jamais cross-pôle direct (Game ne call pas Narration sans validation).

**Boucle d'apprentissage 3 niveaux par sous-spé** :
- Technique : `LESSONS.md` / `rules.md` / `stack.md`
- Méta-process : `PIPELINE-MEMORY-*.md`
- Transverse : auto-memory + `VISION-LONG-TERME.md`

**Statut** : ✅ acté 2026-05-11. Refonte 2026-05-13 ajoute `game-archiviste` (Haiku AUTO structure) en binôme avec game-pmo.

---

## 2026-05-11 — Convention 2 types de MJ (à reconnaître par reviewer)

**Contexte** : MJ-12 questionné par Papa Yann — verdict "dashboard sonore / découverte libre, pas un jeu à mécanique".

**Décision** : 2 types de MJ acceptés dans le pôle JEU :
1. **Jeux à mécanique** : compteur (souvent 10 tours) + showEndScreen + playEndSound
2. **Dashboards / découvertes libres** : pas de fin, exploration ouverte (mj-12 1er du genre)

**Impact** : `game-mj-reviewer` à enrichir avec reconnaissance du type (proposition : attribut `data-mp-type="dashboard"` dans le HTML).

**Statut** : ✅ tranché (L-024). À implémenter dans game-mj-reviewer.

---

## 2026-05-08 — Vocab Max lieux (ne pas confondre)

**Décisions** :
- **dodo** = Centre bus Villejuif (jamais "centre bus" hors contexte adulte)
- **réparation** = Garage (MJ-17 "Le garage")
- **terminus** = Village des bus (réservé pour futur usage)

**Impact** : MJ-08 "Au centre bus" / MJ-17 "Le garage" — vocab cohérent dans nom + tutoriels.

**Statut** : ✅ acté EP-021.

---

## Règles techniques non-négociables (gravées 2026-04-30 et avant)

| Règle | Détail |
|-------|--------|
| **Bus invariant** | `busSVG()` / `busSVGHiddenNum()` depuis `web/js/bus-svg.js` — JAMAIS emoji 🚌 ni div CSS coloré |
| **Quiz couleurs** | `selectDistinctColors(pool, n, minDist=80)` |
| **UX tap** | Zones min 80×80 px |
| **Feedback** | < 200 ms |
| **Pénalité** | Zéro, jamais |
| **Sessions** | 3-8 min cible |

**Source détaillée** : `memory/rules.md` + `pmo/INVARIANTS.md`.

---

## Questions ouvertes (à trancher)

| # | Question | Bloquant ? | Fichier |
|---|----------|-----------|---------|
| 1 | EP-022 MJ-04 "boucle infinie" : vérifié faux bug 2026-05-11 (code conforme depuis). À acter clôture définitive du ticket dans backlog ? | Non | `pmo/backlog.md` |
| 2 | `game-mj-reviewer` à enrichir avec reconnaissance du type MJ (mécanique vs dashboard) — attribut `data-mp-type="dashboard"` ? | Non | `.claude/agents/game-mj-reviewer.md` |
| 3 | Recettes passages piétons non-auditées visuellement (depuis 2026-05-11) — vérifier ou archiver ? | Non | `game/web/tile-tools/recipes/` |
| 4 | Scripts debug (`render_debug`, `render_tmj`, `zoom_index`, `build_rondpoint_tmj`, `recolor_house`) — dépendances à vérifier avant archivage éventuel | Non | `game/web/tile-tools/scripts/` |
| 5 | EP-REFS (banque refs visuelles LimeZu officiel + Pokemon + LDtk) — quand lancer la session dédiée ? | Non | `pmo/backlog.md` |
| 6 | Phase 2 WexWorld — quand commencer le scoping (création `game-wexworld-pmo` + `game-wexworld-designer` + `game-wexworld-tester`) ? | Non | `memory/VISION-LONG-TERME.md` |
