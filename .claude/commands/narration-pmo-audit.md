---
description: Audit COMPLET du pôle NARRATION via narration-pmo unifié (FOND + FORME en un passage, 6 sections). Remplace l'ancien duo /narration-pmo-audit + /narration-archiviste-audit (fusion 2026-07-19).
---

Tu invoques l'agent `narration-pmo` en **Mode AUDIT** sur l'ensemble du pôle NARRATION.

Depuis la fusion 2026-07-19, un seul passage couvre FOND ET FORME — procédure 6 sections gravée dans [`.claude/agents/narration-pmo.md`](../agents/narration-pmo.md) § Mode AUDIT :

1. Découvrabilité INDEX + orphelins + refs cassées
2. Cohérence PROCESS (11 étapes 0-10 partout, casting writers aligné, owners = agents réels)
3. État histoires (kanban = état réel, SLA 3 jours étapes 1/6/10, statuts INDEX)
4. **Cohérence sémantique kanban ⇄ INDEX ⇄ INVARIANTS ⇄ decisions** (désynchros de FOND — bug 2026-05-13 : « prochaine action » périmée passée 3 audits)
5. Gabarit stories + préfixes étapes + lookup.yml (zéro doublon token)
6. Lean (doublons, obsolètes, décisions non écrites)

**Rappels au lancement** :
- Anti-faux-positif : `ls`/Glob avant tout « manquant/orphelin » (incident 2026-05-21 : `scripts/` déclaré absent avec 8 fichiers).
- Post-refonte : scanner aussi `.claude/agents/narration-*.md` + `studio/narration/scripts/*.js` (angles morts).
- Livrable : entrée datée dans `studio/narration/pmo/audit-trail.md`.
- Le rapport se termine par `Fichiers modifiés :` — vérifier par `git diff` avant de croire.
