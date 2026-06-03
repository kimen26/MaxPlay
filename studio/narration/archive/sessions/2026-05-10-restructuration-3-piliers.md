---
date: 2026-05-10
sujet: Restructuration narration/ en 3 piliers (personnages / univers / cross-culture) + saisons + nettoyage stubs
acteur: Auteur (Papa Yann) + assistant Claude
statut: complet
---

# 2026-05-10 — Restructuration majeure narration/ en 3 piliers

## Contexte

L'utilisateur a ouvert une crise de structure : *« Au niveau des personnages, de l'ennéagramme, les voix, les gestes, les cultures, les prénoms : c'est le bazard. Ce qui est figé, ce qui est en cours… j'aimerai un audit complet. »*

Audit révèle :
1. **4 erreurs casting V1** dans `personnages/catalogue-prenoms/INDEX.md` (mention de l'ancien « Jérem ← Jérémie » au lieu de « Madie ← Madeleine » T4, et « Polo ← Salomon/Solal » au lieu de « Polo ← Paul »)
2. **Désynchronisation** `enneagramme/README.md` qui décrit des fichiers inexistants
3. **Liens cassés** depuis `notation-types.md` et `lookup.yml` vers des stubs orphelins
4. **3 stubs morts** à la racine de `personnages/` (redirections obsolètes)
5. **9 stubs morts** dans `enneagramme/personnages/` (redirections vers `personnages/type-NN/`)
6. **Doublon de hiérarchie** entre `personnages/` (incarné) et `enneagramme/` (théorique) qui aurait dû être fusionné
7. **3e pilier cross-culture éclaté** entre `personnages/catalogue-prenoms/`, `univers/meta/architecture-cross-culture.md`, `equipe/onomatopees-cross-culture.md`, sans dossier dédié

## Décisions tranchées par l'auteur

1. **Structure cible = 3 piliers narratifs + 1 plan éditorial + opérationnel** :
   - `personnages/` (qui sont les persos + théorie sur l'humain : ennéa + pédagogie 4-5 ans)
   - `univers/` (le monde : lois, cycles, transports, sensibilités globales)
   - `cross-culture/` (variantes par culture : prénoms, onomatopées, faune/flore, lieux, coutumes, saisons climat)
   - `saisons/` (plan éditorial : saison-1/arc-N/INDEX.md liant les stories) — remplace `arcs/` à la racine
   - opérationnel inchangé : `stories/`, `equipe/`, `pmo/`, `scripts/`, `archive/`

2. **Modèle hybride invariant/variant** :
   - Personnages = invariant universel (ennéatype, voix-signature, gestes/attitudes/habitudes, sensibilité, relations)
   - Cross-culture = variant par pays (prénom local, prononciation, décors locaux, voix-overrides)
   - L'auteur garde un point d'entrée visuel unique par perso (`personnages/type-NN/README.md` agrège les liens vers tous les castings construits)

3. **Pédagogie d'enfance** = théorie sur l'humain au même titre que l'ennéagramme → fond dans `personnages/theorie/pedagogie-enfance/`. Référencée obligatoirement dans le workflow PROCESS étapes 1-3.

4. **Catalogue prénoms** = tout reste en « réserve » pour l'instant (aucune promotion en casting V2 — décision reportée au moment où un 2e casting national se lance).

5. **Stubs morts** = suppression définitive (pas d'archivage d'objets disparus, juste traçage de la décision avec explication — ce fichier).

6. **`enneagramme/`** = fondu dans `personnages/theorie/enneagramme/`. Le dossier `enneagramme/` à la racine est supprimé.

7. **Saison/arcs** = nouvelle structure `saisons/saison-N/arc-X/fiche.md + INDEX.md`. Le dossier `arcs/` à la racine est déplacé.

## Fichiers touchés

### Corrections (Phase 1)
- `personnages/catalogue-prenoms/INDEX.md` : 4 corrections (Jérem→Madie ×2, Salomon→Paul, Jérémie→Madeleine)
- `personnages/catalogue-prenoms/par-culture/hebreu.md` : 2 corrections (Jérémie→Madeleine dans intro + dans liste V1)
- `personnages/lookup.yml` : exemple commentaire « Jérem » → « Madie »
- `equipe/templates/brief-writer-libre.template.md` : « Jérem » → « Madie » dans liste surnoms
- `~/.claude/projects/.../memory/MEMORY.md` + `feedback_prenoms_personnages.md` : casting V1 actualisé

### Déplacements (Phase 2 — création cross-culture/)
- `personnages/catalogue-prenoms/` → `cross-culture/prenoms/`
- `univers/meta/architecture-cross-culture.md` → `cross-culture/doctrine.md`
- `equipe/onomatopees-cross-culture.md` → `cross-culture/onomatopees/catalogue-onomatopees.md`
- `personnages/type-01..09/pays/fr/identite.md` (×9) → `cross-culture/castings-nationaux/fr/type-01..09.md`
- `personnages/wex/pays/fr/identite.md` → `cross-culture/castings-nationaux/fr/wex.md`
- Dossiers `pays/` supprimés sous `personnages/type-NN/`

### Déplacements (Phase 3 — fusion enneagramme/ dans personnages/theorie/)
- `enneagramme/ressources/*.md` → `personnages/theorie/enneagramme/`
- `enneagramme/situations/interactions.md` → `personnages/theorie/enneagramme/interactions-9x9.md`
- `enneagramme/situations/emotions-universelles.md` → `personnages/theorie/enneagramme/`
- `enneagramme/symbolique.md` → `personnages/theorie/enneagramme/`
- `enneagramme/casting-mapping.md` → `personnages/casting-mapping.md`
- `enneagramme/README.md` → réécrit comme `personnages/theorie/enneagramme/README.md`
- `equipe/sources-pedagogie-enfance.md` → `personnages/theorie/pedagogie-enfance/sources-pedagogie-enfance.md`
- Dossier `enneagramme/` supprimé entièrement (vide)

### Suppressions définitives (Phase 4)
- `personnages/prénoms-brainstorm-cultures.md` (stub redirect, contenu déjà migré dans `personnages/archive/`)
- `personnages/prénoms-candidats.md` (stub redirect, idem)
- `personnages/prénoms-par-origine.md` (stub redirect, idem)
- `enneagramme/personnages/type-01..09-*.md` (9 stubs redirect vers `personnages/type-NN/`)

**Pourquoi suppression et pas archivage** : ces fichiers ne contenaient que des notes de redirection vers le nouvel emplacement. Aucune information narrative. Conforme à la règle auteur 2026-05-10 : *« archiver un truc qui a disparu c'est pas utile, archiver une décision de changer le prénom c'est utile avec explication »* → ce fichier-ci EST la trace de la décision.

### Création (Phase 5)
- `cross-culture/INDEX.md` + 7 sous-INDEX (prenoms, castings-nationaux, onomatopees, faune-flore, lieux-locaux, coutumes-jeux-aliments, saisons-climat)
- `personnages/theorie/README.md` + `pedagogie-enfance/README.md` + `enneagramme/README.md` (réécrit)
- `saisons/INDEX.md` + `saison-1/INDEX.md` + 4 arcs (ex `arcs/arc-N/` déplacé)
- `personnages/INDEX.md` réécrit
- `narration/INDEX.md` réécrit (4 piliers + opérationnel)
- `CLAUDE.md` mis à jour (pôle NARRATION)

## Recâblages

- `personnages/notation-types.md` : lien `prénoms-par-origine.md` supprimé (cible disparue)
- `personnages/lookup.yml` : commentaire de tête actualisé (chemin identite désormais dans `cross-culture/castings-nationaux/`)
- `cross-culture/prenoms/INDEX.md` : liens rebasés (+1 niveau de profondeur)
- Refs `pedagogie-enfance` ajoutées dans `equipe/PROCESS.md`, `equipe/templates/brief-histoire.template.md`, `.claude/agents/narration-conseiller.md`, `narration-architecte.md`

## Validation

- L'auteur a validé la structure cible avant exécution (réponse « OK POUR TOUT » du 2026-05-10)
- Les 11 occurrences résiduelles de « Jérem » sont toutes dans `archive/` (traces historiques légitimes) ou `pmo/sprint-log.md`/`decisions.md` (historique daté). Aucune dans un fichier actif de production narrative.

## Liens

- Décisions PMO : [`../../pmo/decisions.md`](../../pmo/decisions.md)
- Sprint log : [`../../pmo/sprint-log.md`](../../pmo/sprint-log.md)
- Index racine narration : [`../../INDEX.md`](../../INDEX.md)
