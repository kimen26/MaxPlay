---
description: Audit COMPLET du pôle DINO via dino-pmo unifié (FOND + FORME en un passage, 6 sections). Remplace l'ancien duo /dino-pmo-audit + /dino-archiviste-audit (fusion 2026-07-19).
---

Tu invoques l'agent `dino-pmo` en **Mode AUDIT** sur l'ensemble du pôle DINO.

Depuis la fusion 2026-07-19, un seul passage couvre FOND ET FORME — procédure 6 sections gravée dans [`.claude/agents/dino-pmo.md`](../agents/dino-pmo.md) § Mode AUDIT :

1. Découvrabilité INDEX
2. Cohérence chiffres INVARIANTS ⇄ data réelle (`DINOS.length`, familles — sources : `site/js/dinos-data.js` + `_ETAT-DINOS.md` généré)
3. État production (audio dispo, déploiement, code ⇄ assets : MP3/PNG référencés existent, pas d'orphelins)
4. Leçons L-Dxx consolidées vers figées/skill
5. Refs cassées + conventions (audio `recit-<id>.mp3` etc.) + gabarit pôle
6. Lean (doublons, décisions non écrites)

**Rappels au lancement** :
- Dette de contenu : lancer `node studio/referentiel/build.mjs` et lire la section « Dettes ouvertes » de `studio/referentiel/_ETAT-CONTENU.md` — toute dette DINO ouverte y figure, à acquitter (`acquitter.mjs --propage` / `--sans-impact`).
- Particularité DINO : code déployé dans `site/` (dev-dinos.html, dinos-data.js, audio/dinos, img/dinos) mais gouvernance dans `studio/dino/` — auditer les DEUX.
- Anti-faux-positif : `ls`/Glob avant tout « manquant ».
- Livrable : entrée datée dans `studio/dino/pmo/audit-trail.md`.
- Le rapport se termine par `Fichiers modifiés :` — vérifier par `git diff` avant de croire (REX dino-pmo menteur 2026-07).
