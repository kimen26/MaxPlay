# 004 — Le Pont Cassé (test températures)

**Titre travaillé :** *Le Pont Cassé*
**Trio :** Wex · Raph · Pierrot
**Lieu :** un pont en bois au-dessus d'un ruisseau, printemps
**Statut :** ⏳ étape 4 — versions writers en cours
**Démarrage :** 2026-05-05

---

## Objectif particulier de cette histoire

Test de la **variance par température réelle** des LLM (paramètre `temperature` exposé via le serveur MCP llm-copains, patché 2026-05-04).

8 runs writers = 4 LLM × 2 températures, brief strictement identique. La seule variance vient de la température LLM, pas de consignes différentes.

Lecteurs témoins vierges (pas de connaissance d'autres versions de cette histoire).

---

## Structure

```
004-pont-casse-temperatures/
├── README.md              ← ce fichier
├── kanban.md              ← état des 9 étapes
├── briefs/
│   └── _writer-package.md ← package autoporteur (strict identique 8 runs)
├── versions-writers/
│   ├── claude-run1.md … grok-run2.md
│   └── _notes-intention/
├── lecteurs-temoins/
│   ├── enfant-garcon.md
│   ├── enfant-fille.md
│   └── dyade-{papa|maman}-{garcon|fille}.md
├── rewrite/
└── _archive/
```
