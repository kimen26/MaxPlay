---
description: Audit COMPLET du pôle JEU via game-pmo unifié (FOND + FORME en un passage, 6 sections). Remplace l'ancien duo /game-pmo-audit + /game-archiviste-audit (fusion 2026-07-19).
---

Tu invoques l'agent `game-pmo` en **Mode AUDIT** sur l'ensemble du pôle JEU.

Depuis la fusion 2026-07-19, un seul passage couvre FOND (décisions, chiffres, statuts) ET FORME (conventions, refs, orphelins, gabarit) — la procédure 6 sections est gravée dans [`.claude/agents/game-pmo.md`](../agents/game-pmo.md) § Mode AUDIT :

1. Découvrabilité INDEX + orphelins + refs cassées
2. Cohérence chiffres INVARIANTS ⇄ state ⇄ decisions (count MJ, casting tile)
3. État production réel (bugs vrais, sessions loguées)
4. Leçons L-xxx consolidées vers SKILL/LESSONS/figées
5. Conventions + gabarit (mj-NN.html, test_*.py, PNG associés)
6. Lean (doublons, obsolètes non archivés, décisions non écrites)

**Rappels au lancement** :
- Anti-faux-positif : vérifier l'existence réelle (`ls`/Glob) avant tout « manquant/orphelin ».
- Ignorer les fichiers `*dino*` de `site/` (pôle DINO voisin).
- Livrable : entrée datée dans `studio/minijeux/pmo/audit-trail.md` + findings critiques/moyens/cosmétiques.
- Le rapport se termine par `Fichiers modifiés :` (liste exacte) — vérifier par `git diff` avant de croire.
