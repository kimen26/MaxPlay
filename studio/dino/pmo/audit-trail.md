# Audit-trail — Pôle DINO

> Traces des audits FOND (`dino-pmo`) et FORME (`dino-archiviste`). Entrée datée par audit.

## 2026-06-03 — Premier audit croisé FOND + FORME (post-création)

**Lancé** via `/dino-pmo-audit` + `/dino-archiviste-audit` (2 agents en parallèle).

**Adjudication (vérité terrain par le main agent)** :
- ⚖️ **Count dinos = 50** (autoritatif `DINOS.length`). Le PMO a **halluciné « 59 »** (grep-comptage des `id:` incluant dinos + familles + catégories) → **faux positif écarté**. L'Archiviste avait raison (50). Leçon : toujours adjuger un claim de count par `DINOS.length`, jamais par grep `id:`.

**Findings traités (fix appliqué)** :
- ✅ EP-D01 / Q-DINO-2 **résolus** : count = 50. Stale corrigés → `dino/content/INDEX.md` (60→50 + liens `../../../web`→`../../site`), header `dinos-data.js` (60→50, `volants_marins` retiré du commentaire).
- ✅ **8 orphelins** `recit-cretace-v2..v9.mp3` supprimés (itérations supersédées, le code ne charge que `recit-cretace.mp3`).
- ✅ **5 scripts** `content/` : chemins `game/docs/jeux/dino-encyclopedie` → `dino/content` corrigés (sortie/lecture après le move).

**Confirmé sain (les 2 agents)** : gabarit `dino/` complet (5 fichiers pmo + figées) · 9 familles noms scientifiques · casting voix cohérent INVARIANTS⇄voice-map⇄figée · audio (8 récits + 4 menus + 2 spéciaux + 22 dinos) présent et référencé · Tritri sans Max/doudou respecté · zéro bus en récit · liens markdown dino/** résolvent.

**Verdict** : pôle **opérationnel et sain**. 0 CRITIQUE réel (le « 59 » était faux), findings BASSE traités. Reste : EP-D02 (audio des ~28 dinos restants) ouvert, basse priorité.

---

## 2026-06-03 — Création + audit de cohérence initial

**Contexte** : création du pôle (déplacement contenu + gouvernance).

**Findings traités** :
- ✅ Move `dino-encyclopedie/` → `dino/content/` sans perte (217 fichiers, rename git, historique préservé).
- ✅ Chemins relatifs des 2 scripts code-couplés corrigés (`../../../web` → `../../site`), résolution testée.
- ✅ Hook figeage étendu (dino/** + code site/ dino → `dino/figees/encyclopedie.md`), testé OK.
- ✅ Refs internes de la figée corrigées (`../dino-encyclopedie/` → `../content/`, `../../web` → `../../site`).

**À surveiller (reste ouvert)** :
- 🟡 Count dinos : INVARIANTS dit 50 (réel `DINOS.length`), ancien INDEX disait 60 → EP-D01.
- 🟡 Refs externes résiduelles vers `dino-encyclopedie` dans `game/pmo/backlog.md` + `narration/pmo/` (historiques, non bloquantes) — à nettoyer si on y repasse.
- 🟡 `content/INDEX.md` (ancien) coexiste avec le nouveau `dino/INDEX.md` : l'ancien décrit le dossier content, le nouveau est le catalogue du pôle. Pas un doublon (scopes différents) mais à vérifier au prochain audit forme.

**Verdict** : pôle opérationnel, structure saine. Prochain audit forme : vérifier orphelins dans `content/` + cohérence count.
