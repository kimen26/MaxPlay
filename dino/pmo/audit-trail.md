# Audit-trail — Pôle DINO

> Traces des audits FOND (`dino-pmo`) et FORME (`dino-archiviste`). Entrée datée par audit.

## 2026-06-03 — Création + audit de cohérence initial

**Contexte** : création du pôle (déplacement contenu + gouvernance).

**Findings traités** :
- ✅ Move `dino-encyclopedie/` → `dino/content/` sans perte (217 fichiers, rename git, historique préservé).
- ✅ Chemins relatifs des 2 scripts code-couplés corrigés (`../../../web` → `../../game/web`), résolution testée.
- ✅ Hook figeage étendu (dino/** + code game/web/ dino → `dino/figees/encyclopedie.md`), testé OK.
- ✅ Refs internes de la figée corrigées (`../dino-encyclopedie/` → `../content/`, `../../web` → `../../game/web`).

**À surveiller (reste ouvert)** :
- 🟡 Count dinos : INVARIANTS dit 50 (réel `DINOS.length`), ancien INDEX disait 60 → EP-D01.
- 🟡 Refs externes résiduelles vers `dino-encyclopedie` dans `game/pmo/backlog.md` + `narration/pmo/` (historiques, non bloquantes) — à nettoyer si on y repasse.
- 🟡 `content/INDEX.md` (ancien) coexiste avec le nouveau `dino/INDEX.md` : l'ancien décrit le dossier content, le nouveau est le catalogue du pôle. Pas un doublon (scopes différents) mais à vérifier au prochain audit forme.

**Verdict** : pôle opérationnel, structure saine. Prochain audit forme : vérifier orphelins dans `content/` + cohérence count.
