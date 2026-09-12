# Rapport HO-R04 — Hooks consolidés + agents JEU/DINO sans point d'entrée

**Statut brief :** rapport reçu

## 1. Table événement → dispatcher → durée

| Événement | Avant (dispatchers) | Après (dispatcher unique) | Durée mesurée (1 process) |
|---|---|---|---|
| `PreToolUse` (Edit\|Write) | `figees-injector.ps1` | `pre-tool.ps1` (fonction `Invoke-FigeesInjector`) | 256-374 ms (5 runs, moy. ~300 ms) |
| `PreToolUse` (Bash\|PowerShell) | `garde-git-add.ps1` | `pre-tool.ps1` (fonction `Invoke-GardeGitAdd`) | 262-338 ms |
| `PostToolUse` (Edit\|Write) | `sync-agents-md.py` (Python) + hook bash INBOX narration (2 process) | `post-tool.ps1` (1 process PowerShell, logique fusionnée) | 307-382 ms |
| `Stop` | `pmo-check.ps1` | `pmo-check.ps1` (inchangé, lecture transcript bornée `-Tail 2000`) | non remesuré (logique inchangée) |
| `UserPromptSubmit` | `signal-detector.ps1` | `signal-detector.ps1` (inchangé — déjà seul sur l'événement, payload petit, rien à borner) | non remesuré (logique inchangée) |

Toutes les mesures < 400 ms, un seul processus `powershell.exe` par appel (vérifié par construction : `pre-tool.ps1`/`post-tool.ps1` font tout le routage en dot-sourcing interne, aucun sous-processus lancé).

## 2. Tests `hooks/tests/run.ps1`

5 payloads rejoués contre `pre-tool.ps1` (édition mj sans figées / édition hors périmètre / `git add -A` bloqué / `git status` laissé passer / `git stash` bloqué) :

```
[PASS] pre-tool: Edit mj-99 (pas de figees) (attendu exit=0, obtenu exit=0)
[PASS] pre-tool: Edit hors perimetre figees (attendu exit=0, obtenu exit=0)
[PASS] pre-tool: garde-git-add bloque "git add -A" (attendu exit=2, obtenu exit=2)
[PASS] pre-tool: garde-git-add laisse passer "git status" (attendu exit=0, obtenu exit=0)
[PASS] pre-tool: garde-git-add bloque "git stash" (attendu exit=2, obtenu exit=2)

Tous les tests sont VERTS (5/5).
```

Aucune commande git réelle n'a été exécutée : les payloads simulent l'appel du hook avec `tool_input.command = "git add -A"` / `"git stash"` en entrée JSON, exactement comme le ferait le harness — sans jamais lancer la commande elle-même.

## 3. `Measure-Command` sur `pre-tool.ps1` (5 runs, payload Edit mj)

```
338.3873 ms
272.3642 ms
374.7257 ms
262.0714 ms
256.0551 ms
```

1 seul processus par appel, toutes les mesures < 400 ms (dominées par le coût de démarrage `powershell.exe` en PowerShell 5.1, pas par la logique du script).

## 4. `sync-agents-md` — régénération identique

Le portage Python → PowerShell (`post-tool.ps1`) a été comparé à l'ancien `sync-agents-md.py` en régénérant `AGENTS.md` avec les deux, puis `diff` :

```
IDENTIQUE
```

Aucune différence octet près (hors le bandeau `GÉNÉRÉ par` mis à jour intentionnellement pour refléter le nouveau générateur — seule ligne qui change, comme documenté dans le script lui-même).

## 5. Décision appliquée par agent (point 4 du brief)

Décisions déjà tranchées par l'orchestrateur, appliquées telles quelles :

| Agent | Décision | Application |
|---|---|---|
| `game-test-audio` | ligne « invoqué par » | Ajoutée dans `.claude/agents/game-test-audio.md` (corps, après frontmatter) : « Invoqué par : `game-mj-reviewer` avant livraison / `/game-pmo-audit`. » + résumé dans `studio/minijeux/CLAUDE.md` § Équipe agents. |
| `game-test-secu` | ligne « invoqué par » | Idem, même ligne dans `.claude/agents/game-test-secu.md` + `studio/minijeux/CLAUDE.md`. |
| `dino-fiche-writer` | ligne « invoqué par » | Ajoutée dans `.claude/agents/dino-fiche-writer.md` : « Invoqué par : `nouveau-dino` phase scripts audio et retours d'écoute Lunii. » + ligne dans `studio/dino/CLAUDE.md` § Mémoire/PMO/Conseiller. |
| `quick` | suppression | `grep -rn "\bquick\b"` sur `.claude`, `studio`, `docs`, `CLAUDE.md`, `AGENTS.md` : aucun appel réel dans le périmètre JEU/DINO (seuls matches : mot anglais "quick" dans du contenu i18n/audio narration, et une mention historique dans `studio/narration/equipe/INDEX.md` hors périmètre D-011, plus des mentions dans des archives figées qui ne se réécrivent pas). `.claude/agents/quick.md` supprimé, `.claude/agents/README.md` régénéré via `node scripts/gen-agents-readme.mjs` (19 agents, 0 avertissement). |

## 6. Fichiers créés / modifiés / supprimés

**Créés**
- `.claude/hooks/pre-tool.ps1` — dispatcher PreToolUse unique (figees-injector + garde-git-add).
- `.claude/hooks/post-tool.ps1` — dispatcher PostToolUse unique (sync-agents-md porté en PS + rappel/commit INBOX narration).
- `.claude/hooks/tests/run.ps1` — 5 payloads JSON rejoués, vert.

**Modifiés**
- `.claude/settings.json` — clé `hooks` uniquement : `PreToolUse` et `PostToolUse` réduits chacun à une seule entrée pointant vers le dispatcher correspondant. Bascule faite en un seul edit, après tests verts sur les nouveaux scripts en place à côté de l'existant.
- `.claude/hooks/pmo-check.ps1` — logique inchangée, lecture transcript bornée aux 2000 dernières lignes (`Get-Content -Tail 2000`) au lieu du fichier entier.
- `.claude/agents/game-test-audio.md`, `.claude/agents/game-test-secu.md`, `.claude/agents/dino-fiche-writer.md` — ligne « invoqué par » ajoutée (frontmatter non touché sauf lecture).
- `.claude/agents/README.md` — régénéré (`node scripts/gen-agents-readme.mjs`) : `quick` disparu, 19 agents restants, 0 avertissement.
- `studio/minijeux/CLAUDE.md` — section « Équipe agents » : ligne ajoutée pour `game-test-audio`/`game-test-secu`.
- `studio/dino/CLAUDE.md` — section mémoire/PMO/conseiller : ligne ajoutée pour `dino-fiche-writer`.
- `.kimi-code/hooks/figees-injector.kimi.ps1` — commentaire d'en-tête mis à jour (référence désormais `pre-tool.ps1` côté Claude, logique métier déjà identique — vérifié par diff des blocs de matching).
- `AGENTS.md` — effet de bord attendu du test réel de `post-tool.ps1` sur `CLAUDE.md` : bandeau régénéré (seule ligne qui change, contenu identique bit à bit à ce que produisait `sync-agents-md.py` sinon).

**Supprimés**
- `.claude/hooks/figees-injector.ps1`, `.claude/hooks/garde-git-add.ps1`, `.claude/hooks/sync-agents-md.py` — logique absorbée dans `pre-tool.ps1`/`post-tool.ps1`, plus référencés nulle part.
- `.claude/agents/quick.md` — aucun point d'entrée réel, décision orchestrateur appliquée.
- `.kimi-code/hooks/stop-payload.jsonl` — fichier de log de la sonde de portage, obsolète.
- `.kimi-code/hooks/stop-probe.kimi.ps1` — sonde de portage devenue morte : `pmo-check.kimi.ps1` (portage fidèle) est déjà en place et déjà seul référencé dans `~/.kimi-code/config.toml` (vérifié par grep — fichier hors périmètre, non modifié).

## 7. Questions pour l'orchestrateur

Aucune. Le brief tranchait déjà le point 4 (agents sans point d'entrée), et le reste du travail rentrait sans ambiguïté dans le périmètre déclaré. Un seul point à signaler, pas une question : `AGENTS.md` a été modifié comme conséquence directe du test réel du nouveau hook `post-tool.ps1` sur `CLAUDE.md` (nécessaire pour prouver la régénération avant bascule) — la diff est d'une ligne (bandeau `GÉNÉRÉ par`), contenu vérifié identique par ailleurs.

## Résumé (10 lignes max)

Un seul processus PowerShell par événement `PreToolUse` (`pre-tool.ps1`) et `PostToolUse` (`post-tool.ps1`), testés à côté de l'existant puis basculés en un seul edit atomique de `.claude/settings.json`. `garde-git-add` continue de bloquer `git add -A`/`stash`/`checkout --`/`reset`/`clean`, vérifié par payload JSON simulé, jamais par exécution réelle. `sync-agents-md` porté en PowerShell, régénération vérifiée octet-identique à l'ancien script Python. `pmo-check.ps1` inchangé sauf lecture transcript bornée à 2000 lignes. `.kimi-code/hooks/stop-payload.jsonl` et la sonde `stop-probe.kimi.ps1` supprimés (obsolètes, `pmo-check.kimi.ps1` déjà porté et seul actif dans `config.toml`). Décisions orchestrateur appliquées : `game-test-audio`/`game-test-secu` invoqués par `game-mj-reviewer`/`/game-pmo-audit`, `dino-fiche-writer` par `nouveau-dino`, `quick` supprimé (0 appelant réel dans le périmètre JEU/DINO). `README.md` des agents régénéré via le script officiel (19 agents, 0 avertissement). Tests hooks 5/5 verts, `pre-tool.ps1` mesuré 256-374 ms sur 5 runs. Zéro commande git exécutée. Zéro fichier touché hors périmètre du brief.
