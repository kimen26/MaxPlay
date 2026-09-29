# HO-A04 — Hooks : auto-régénération sw-version + garde site/js/gen/

**Statut :** fait (2026-09-30, tests 36/36 verts)
**Depend de :** —

## Objectif
Deux comportements de hooks ajoutés au dispatcher unique existant (`pre-tool.ps1` /
`post-tool.ps1`, 1 seul processus par événement, principe conservé) :
1. Editer un fichier précaché par le service worker régénère automatiquement
   `site/js/gen/sw-version.js` (évite un hash périmé, cause de L-148 côté cache).
2. Editer directement un fichier sous `site/js/gen/` (généré) est refusé avec le
   générateur à relancer à la place — évite une modif manuelle écrasée sans
   avertissement à la prochaine régénération.

## Contexte a lire d'abord
- `.claude/hooks/pre-tool.ps1` et `.claude/hooks/post-tool.ps1` (dispatchers existants,
  lus intégralement avant modif)
- `.claude/settings.json` § `hooks` (câblage PreToolUse/PostToolUse, un seul process chacun)
- `.claude/hooks/tests/run.ps1` (harnais de tests, payloads JSON rejoués contre les scripts)
- `studio/minijeux/memory/LESSONS.md` § L-148 (pourquoi le hash de version existe)
- `site/js/gen/README.md` (table fichier généré → générateur, source de vérité pour le
  message d'erreur du refus d'écriture)
- `studio/minijeux/scripts/gen-sw-version.mjs` (script déjà existant, appelé tel quel)

## Fichiers autorises
- `.claude/hooks/pre-tool.ps1`
- `.claude/hooks/post-tool.ps1`
- `.claude/hooks/tests/run.ps1`
- `docs/handoffs/HO-A04-hooks-sw-gen.md` (ce fichier, mise à jour du statut/rapport)

## Hors perimetre
- `.claude/skills/` et `.claude/agents/` : agents en parallèle dessus, ne pas y toucher.
- Aucune commande git (pas de commit).
- `.claude/settings.json` : le câblage (1 entrée PreToolUse, 1 entrée PostToolUse) existe
  déjà et pointe sur ces deux scripts — pas d'entrée à ajouter, sauf preuve du contraire
  à la lecture.

## Travail

### 1. PostToolUse — régénération sw-version (post-tool.ps1)
Ajouter une route : si le `path` édité (Edit|Write) est dans `PRECACHE_LIST` de
`site/sw.js`, ou est `site/sw.js` lui-même, lancer
`node studio/minijeux/scripts/gen-sw-version.mjs`. Silencieux si le fichier n'est pas
dans la liste (0 octet stdout). Pas de blocage si le script échoue : logger l'erreur en
`additionalContext` (cohérent avec les routes R09 existantes) mais exit 0 — un hook
PostToolUse ne bloque jamais.
Pour matcher `PRECACHE_LIST` sans dupliquer la liste en dur dans le hook (source unique
= `site/sw.js`, comme le fait déjà `gen-sw-version.mjs`), extraire dynamiquement la
liste depuis `site/sw.js` par la même regex `const PRECACHE_LIST = \[([\s\S]*?)\];` puis
comparer le chemin relatif à `site/`.

### 2. PreToolUse — garde site/js/gen/ (pre-tool.ps1)
Ajouter une route dans le bloc `^(Edit|Write)$` : si le `path` normalisé matche
`site/js/gen/` (le dossier lui-même, y compris `site/js/gen/i18n/`), refuser avec
exit 2 et un message qui nomme le générateur à lancer à la place, lu depuis
`site/js/gen/README.md` (table fichier → générateur) — au minimum reproduire la ligne
correspondante si le nom de fichier édité matche une ligne de la table ; sinon message
générique renvoyant au README. Les écritures faites par un générateur lui-même passent
par Bash/node (pas par l'outil Edit/Write), donc restent autorisées — aucun changement
nécessaire côté Bash.

### 3. Tests (`.claude/hooks/tests/run.ps1`)
Ajouter des cas :
- PostToolUse Edit sur un fichier de `PRECACHE_LIST` (ex. `site/css/mp-theme.css`) →
  `gen-sw-version.mjs` s'exécute (vérifier que `site/js/gen/sw-version.js` a changé de
  contenu, ou au moins que le process a tourné sans erreur) ; nécessite un repo/racine
  jetable comme pour la garde push (R08), ou adaptation via `MAXPLAY_HOOK_ROOT` si le
  script le supporte — sinon tester en pointant vers le vrai `site/sw.js` en lecture
  seule (le hook ne fait que lire ce fichier pour la liste, il n'écrit que
  `sw-version.js`).
- PostToolUse Edit sur un fichier hors `PRECACHE_LIST` (ex. `site/mj-99.html`) → 0 octet,
  script non appelé.
- PreToolUse Edit sur `site/js/gen/avatars.js` → exit 2, message contient le générateur
  `gen-avatars-manifest.mjs`.
- PreToolUse Edit sur `site/js/gen/i18n/dinos-strings.fr.js` → exit 2, message pointe
  vers `_gen-strings-bundle.cjs`.
- PreToolUse Edit sur un fichier hors `site/js/gen/` → passe (exit 0), non-régression.
Faire passer aussi tous les cas déjà présents dans `run.ps1` (non-régression complète).

## Portes de verification
```bash
powershell -NoProfile -ExecutionPolicy Bypass -File .claude/hooks/tests/run.ps1
```
Tous les tests VERTS (existants + nouveaux).

## Rapport attendu
Fichiers modifiés (chemins absolus), sortie complète de `run.ps1`, démonstration des 2
comportements (extrait de payload + sortie observée) : régénération sw-version sur un
fichier précaché, refus d'écriture sous `site/js/gen/` avec le bon générateur nommé.
