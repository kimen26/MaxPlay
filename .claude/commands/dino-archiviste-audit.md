---
description: Audit structurel du pôle DINO via l'Archiviste (FORME) — vérifie gabarit studio/dino/, refs cassées, fichiers orphelins, cohérence audio (recit/menu/blocs) vs data, png vs dinos. Surveille aussi le code déployé dans site/. Complémentaire à /dino-pmo-audit (FOND). Communique findings au dino-pmo.
---

Tu invoques l'agent `dino-archiviste` en **mode AUDIT** sur l'ensemble du pôle DINO.

L'Archiviste vérifie **la structure** (équivalent du PMO côté forme).

> ⚠️ Particularité : le code dino vit **hors du dossier studio/dino/** (déployé dans `site/`). L'audit couvre les **deux** : `studio/dino/**` ET `site/{dev-dinos.html, js/dinos-data.js, audio/dinos/, img/dinos/}`.

## Procédure (5 sections obligatoires)

### 1. Préfixes et conventions de nommage
- Audio nommé `recit-<id>.mp3`, `menu-<id>.mp3`, `<dino>-{recap,nom,taille,regime,funfact}.mp3` ?
- Scripts `content/scripts/{audio,images-grok,export}/` respectent leur convention (`_gen-*`, `_md2json*`, etc.) ?
- Frontmatter agents `dino-*.md` : pas de `:` interne, pas d'em-dash, pas de `x` multiplication dans description non quotée ?

### 2. Gabarit respecté
- Structure `studio/dino/` conforme : `CLAUDE.md`, `INDEX.md`, `pmo/`, `figees/`, `content/` ?
- `studio/dino/pmo/` contient bien les 5 fichiers : INVARIANTS, decisions, sprint-log, backlog, audit-trail ?
- `studio/dino/figees/encyclopedie.md` présent ?

### 3. Refs cassées
- Tous les liens markdown `[texte](chemin)` dans `studio/dino/**/*.md` pointent vers des fichiers existants ?
- Les scripts code-couplés `content/scripts/export/{_blocB-canonique-50,_export-fiches,_etymo2racines}.cjs` résolvent-ils bien leur source (`../../../../../site/js/dinos-data.js` ou `../../sources/etymo/…`) ? Et `content/scripts/audio/_md2json*.cjs` → `../../scripts-audio/` ?
- Le hook `figees-injector.ps1` pointe bien vers `studio/dino/figees/encyclopedie.md` ?
- La rule `.claude/rules/dino.md` couvre bien les chemins du code (dev-dinos, dinos-data, audio/dinos, img/dinos) + studio/dino/** ?

### 4. Fichiers orphelins
- Chaque `.md` de `studio/dino/content/**` (sources/, scripts-audio/, inbox/) est-il référencé par un INDEX (`content/INDEX.md` hub + sous-INDEX) ou un autre fichier ?
- **Chaque audio `recit-*`/`menu-*`/bloc dans `site/audio/dinos/` est-il référencé par le code** (`DINO_AUDIO`, `JOURNEY`, `MENU_VOICE`) ? Inversement, chaque audio référencé existe-t-il ?
- Chaque `png` de dino (`dinos-data.js`) existe-t-il dans `img/dinos/` ?

### 5. Cohérence sémantique
- Le count dinos/familles/régimes dans `INVARIANTS.md` ⇄ **data réelle** `dinos-data.js` est-il cohérent ?
- Les noms de familles (9, noms scientifiques) cohérents INVARIANTS ⇄ data ⇄ figée ?
- Le casting voix cohérent INVARIANTS ⇄ `voice-map.json` ⇄ figée ?
- ⚠️ **Anti-faux-positif** : avant de crier « manquant/orphelin », vérifier l'existence réelle (`ls`/Glob). Scans partiels = angles morts.

## Livrable attendu

1. Rapport markdown structuré **CRITIQUE/HAUTE/MOYENNE/BASSE** par finding
2. **Liste d'actions concrètes** (chemin exact + correctif suggéré)
3. **Ping `dino-pmo`** si action de fond (logged `[ARCHIVISTE]` dans `studio/dino/pmo/sprint-log.md`)
4. Entrée datée dans `studio/dino/pmo/audit-trail.md`

## Contraintes

- **Lecture seule** par défaut
- Si l'auteur dit `/dino-archiviste-audit fix` → corriger les findings BASSE/MOYENNE auto-fixables (renommer, lien cassé évident, doublon)
- CRITIQUE/HAUTE → toujours validation auteur
- Cite chemins exacts, reste factuel

## Quand utiliser vs /dino-pmo-audit

| Commande | Cible | Trigger |
|----------|-------|---------|
| `/dino-archiviste-audit` | FORME (gabarit, refs, orphelins audio/png, préfixes) | Après ajout studio/dino/audio, modif structurelle |
| `/dino-pmo-audit` | FOND (décisions, figées respectées, INVARIANTS ⇄ data) | Après plusieurs sessions, avant livraison |

**Règle d'or** : alterner FORME + FOND pour ne pas accumuler de désynchros sémantiques.
