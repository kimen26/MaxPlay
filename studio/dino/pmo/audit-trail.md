# Audit-trail — Pôle DINO

> Traces des audits FOND (`dino-pmo`) et FORME (`dino-archiviste`). Entrée datée par audit.

## 2026-06-15 (suite) — Logging corrections V3 appliquées (PMO FOND)

**Décision Papa Yann 2026-06-15** : toutes les corrections relecture V3 appliquées LIVE.

**Findings appliqués** :
- ✅ **EP-D13 FAIT** : typos audio (« alone »/« un torpille »/accents) corrigées sur 7 scripts · échelles recalculées _compLong/_compHaut (Shonisaure + 5 « bus RATP ») · poids _compPoids (Tricé/Toro) · 3 dinos data (Patagotitan/Centrosaure/Ichthyosaurus communis). Count 48→51, INVARIANTS MAJ.
- ✅ **EP-D14 FAIT** : Q-DINO-7=OUI → Tritri 3 touches ceratopsiens, Wex, fluides.
- ✅ **EP-D15 FAIT** : patterns « réfléchissait » résorption · réfs adultes (Elvis/Ferrari/JP/vroum) RETIRÉES.
- ✅ **2 règles figées nouvelles** : 🔒 PAS référence adulte, 🔒 PRÉDATION vraie jamais gore. Gravées figees/encyclopedie.md (déjà en place).
- ✅ **Grep-interdits final** : 0 max/doudou/peluche/nounours/bus-hors-échelle sur 7 scripts.
- ✅ **Q-DINO-7/8/9/10 tous TRANCHÉ/RÉSOLU** : Tritri oui, 3 dinos data créées, sensibilité retraitée, bus corrigés.

**État post-corrections** : **51 fiches V3 FINAL** prêtes production audio MCP. Leçons L-D10/L-D11/L-D12 gravées backlog.md.

**Verdict** : pôle DINO = **corpus final validé 2026-06-15**, prêt pour `studio_audiobook_from_segments_v2_dialogue`.

---

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
