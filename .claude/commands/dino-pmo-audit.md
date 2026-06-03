---
description: Audit FOND du pôle DINO via dino-pmo (Mode AUDIT 5 sections). Complémentaire à /dino-archiviste-audit (FORME). Vérifie cohérence sémantique : décisions vs INVARIANTS vs figées vs sprint-log vs data réelle. À utiliser en alternance avec /dino-archiviste-audit pour couvrir forme + fond côté pôle DINO.
---

Tu invoques l'agent `dino-pmo` en **Mode AUDIT** sur l'ensemble du pôle DINO.

Le PMO vérifie **le FOND** (décisions, statuts, cohérence sémantique) — complémentaire à `/dino-archiviste-audit` (FORME : refs, orphelins, gabarit).

> ⚠️ Pôle **transverse** : le code vit dans `site/` (dev-dinos.html, dinos-data.js, audio/dinos, img/dinos), la gouvernance dans `studio/dino/`. L'audit couvre les deux.

## Procédure (5 sections obligatoires — depuis `dino-pmo.md` Mode AUDIT)

### 1. Architecture / Découvrabilité
- `studio/dino/INDEX.md` à jour (pointe le code site/ + le contenu studio/dino/content/) ?
- Fichiers `studio/dino/content/` orphelins (non référencés par l'INDEX) ?
- Liens markdown cassés dans `studio/dino/**` ?

### 2. Cohérence chiffres clés
- `studio/dino/pmo/INVARIANTS.md` ⇄ **data réelle** `site/js/dinos-data.js` : count dinos (`DINOS.length`), count familles (`DINO_FAMILLES`), count régimes (`DINO_CATEGORIES`) cohérents ?
- Échelle référentiel (enfant 1 m … bus accordéon 18 m) cohérente entre INVARIANTS et `_compLong/_compHaut/_compPoids` du code ?
- Casting voix (narrateur_h / narrateur_f / wex) cohérent INVARIANTS ⇄ voice-map.json ⇄ figée ?
- **EP-D01** : count réel (50 ?) vs ancien « 60 » — tranché ?

### 3. État production (le fond critique)
- Audio référencé dans le code (`DINO_AUDIO`, `recit-*`, `menu-*`) = présent sur disque ? Inversement, pas d'orphelin ?
- Les décisions figées (`studio/dino/figees/encyclopedie.md`) sont-elles respectées dans le code réel (Tritri jamais Max/doudou, 3 onglets, régimes alimentaires purs) ?
- Sessions récentes loguées dans `studio/dino/pmo/sprint-log.md` ? Prochaine action identifiable ?

### 4. Connaissances / Skills
- Skills liés (`ecriture-audio-enfants`, `audio-direction-elevenlabs`) à jour avec les apprentissages récents ?
- Les **leçons L-Dxx** de `studio/dino/pmo/backlog.md` sont-elles consolidées vers le skill / la figée quand c'est une règle ?
- Mémoire globale (`reference_audio_kit_enfant`, `feedback_dialogue_naturel`) cohérente avec les décisions récentes ?

### 5. Lean / Anti-patterns
- Doublons (2 fichiers qui disent la même chose, ex `studio/dino/INDEX.md` vs `studio/dino/content/INDEX.md`) ?
- Refs résiduelles vers l'ancien chemin `game/docs/jeux/dino-encyclopedie` (dans game/pmo, studio/narration/pmo, commentaires data) ?
- Décisions tranchées en session non écrites dans `studio/dino/pmo/decisions.md` ?
- **Cohérence sémantique** : la « prochaine action » du sprint-log est-elle la vraie ?

## Livrable attendu

1. Rapport markdown structuré **CRITIQUE/HAUTE/MOYENNE/BASSE** par finding
2. **Liste d'actions concrètes** (chemin exact + correctif suggéré)
3. **Croisement avec le dernier audit Archiviste** (ce que la forme a raté que le fond attrape)
4. Entrée datée dans `studio/dino/pmo/audit-trail.md` préfixée `[PMO MODE AUDIT]`

## Contraintes

- **Lecture seule** par défaut
- Si l'auteur dit `/dino-pmo-audit fix` → corriger les findings BASSE/MOYENNE auto-fixables (MAJ INVARIANTS si chiffre changé, MAJ statut, prochaine action)
- CRITIQUE/HAUTE → toujours validation auteur
- Cite chemins exacts, reste factuel

## Quand utiliser vs /dino-archiviste-audit

| Commande | Cible | Trigger |
|----------|-------|---------|
| `/dino-archiviste-audit` | FORME (gabarit, refs, orphelins audio/png, préfixes) | Après ajout studio/dino/audio, modif structurelle, doute orphelin |
| `/dino-pmo-audit` | FOND (décisions, figées respectées, INVARIANTS ⇄ data) | Après plusieurs sessions, avant livraison, quand « tout a l'air OK » |
| `/pmo-challenge` (skill global) | LARGE (cartographie + obsolescence + simulations) | Refonte majeure |

**Règle d'or** : alterner FORME + FOND pour ne pas accumuler de désynchros.
