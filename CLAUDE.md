# MaxPlay — Jeu éducatif & Univers narratif pour Max (3.5-4 ans)

## ACTION OBLIGATOIRE — avant toute réponse

**Étape 1 — Identifier le pôle :**

| Mots dans la demande | Pôle | Lire ensuite |
|----------------------|------|-------------|
| jeu · MJ · mini-jeu · bus · Phaser · mj-XX · tile · LimeZu · déploiement · `game/web` | **JEU** | [`game/CLAUDE.md`](game/CLAUDE.md) → [`game/INDEX.md`](game/INDEX.md) |
| narration · histoire · personnage · univers · ennéagramme · cross-culture · saison · arc · Wex/Melki/Mimi/Polo/Madie/Lulu/Pierrot/Raph/Juju/Nono | **NARRATION** | [`narration/CLAUDE.md`](narration/CLAUDE.md) → [`narration/INDEX.md`](narration/INDEX.md) |
| idée brute · dump · brainstorm sans contexte clair | **?** | Demander : "C'est pour le jeu ou pour les histoires ?" |

**Étape 2 — Annoncer avant d'agir :**
*"Mode [JEU/NARRATION] — je charge [fichier] puis j'agis."*

> **Note loading** : `game/CLAUDE.md` et `narration/CLAUDE.md` sont **chargés automatiquement** par Claude Code dès qu'un fichier de leur sous-arbre est touché. Ce CLAUDE.md racine reste le SEUL re-injecté après `/compact`.

---

## 🚨 Signaux qui déclenchent les agents auto

**Règle MILITAIRE** : tout tour incluant un signal **invoque automatiquement** l'agent correspondant.

### Pôle JEU
| Signal détecté | Agent auto invoqué |
|----------------|---------------------|
| mini-jeu · MJ · mj-XX · bus-svg · victory-sounds · tile · recipe · LimeZu · cartography · patterns · rules.md · stack.md · Phaser · max-adventure · déploiement | [`game-pmo`](.claude/agents/game-pmo.md) (FOND) |
| création/modif/suppression fichier · dossier · INDEX · gabarit · refs cassées · recipe · LESSONS | [`game-archiviste`](.claude/agents/game-archiviste.md) (FORME) |

### Pôle NARRATION
| Signal détecté | Agent auto invoqué |
|----------------|---------------------|
| personnage · histoire · voix · ElevenLabs · brief · kanban · décision · équipe · univers · saison · arc · ennéagramme · cross-culture · pitch · rewrite · GateKeeper · lecteur · casting · INBOX dump | [`narration-pmo`](.claude/agents/narration-pmo.md) (FOND) |
| création/modif/suppression fichier · dossier · gabarit · refs · préfixes étapes | [`narration-archiviste`](.claude/agents/narration-archiviste.md) (FORME) |

> Un hook `UserPromptSubmit` rappelle ces déclencheurs à chaque prompt — voir [`.claude/hooks/signal-detector.ps1`](.claude/hooks/signal-detector.ps1).

---

## Arborescence

```
MaxPlay/
├── CLAUDE.md             ← ce fichier (routage + commun)
├── game/                 ← PÔLE JEU → game/CLAUDE.md (auto-loaded)
├── narration/            ← PÔLE NARRATION → narration/CLAUDE.md (auto-loaded)
├── infra/                ← bot Telegram + serveur MCP llm-copains
├── memory/               ← transverse : MEMORY, MAX_PROFILE, VISION
├── _archive/             ← cadavres préservés (avec INDEX expliquant chaque entrée)
├── .claude/
│   ├── agents/           ← 21 sous-agents (PMO, sachants, reviewers)
│   ├── hooks/            ← scripts hooks déterministes
│   ├── rules/            ← règles path-scoped (chargées quand fichier match)
│   └── settings.json     ← config hooks + permissions
```

---

## Profil Max

3.5-4 ans · chiffres jusqu'aux milliers · lecture phonétique · tablette tactile.
Passions : bus Villejuif, animaux, drapeaux, loups, Tayo, Totoro/Ghibli, Stitch.
Origines brésiliennes. Détails : [`memory/MAX_PROFILE.md`](memory/MAX_PROFILE.md).

---

## Principes transverses

- **Simplicity First** · **No Laziness** · **Minimal Impact** · Plan mode pour 3+ étapes
- Toujours lire l'INDEX du pôle avant de répondre sur un sujet de fond
- Ne jamais répondre de mémoire sur un chiffre/casting/voice_id — invoquer le PMO en mode RECHERCHE
- Après correction utilisateur → leçon dans `game/pmo/backlog.md` (JEU) ou `narration/pmo/decisions.md` (NARRATION)

---

## Workflow

```
Plan → TodoWrite → Dev (subagents) → Verify → Commit → Docs
```

---

## Fichiers transversaux

| Fichier | Rôle |
|---------|------|
| [`memory/MEMORY.md`](memory/MEMORY.md) | Mémoire projet dense (archi, décisions historiques) |
| [`memory/MAX_PROFILE.md`](memory/MAX_PROFILE.md) | Profil complet Max |
| [`memory/VISION.md`](memory/VISION.md) | Vision produit jeu |
| [`memory/workflow.md`](memory/workflow.md) | Workflow session |
| [`memory/skills-map.md`](memory/skills-map.md) | Agents, skills, commandes |
| [`infra/bot/index.ts`](infra/bot/index.ts) | Bot Telegram — routing agents, permissions |
| [`infra/mcp/server.ts`](infra/mcp/server.ts) | MCP llm-copains (Grok, Kimi, ElevenLabs) |
| [`_archive/INDEX.md`](_archive/INDEX.md) | Cadavres préservés (avec date + raison) |

---

## Commandes audit (rappel)

- `/game-pmo-audit` + `/game-archiviste-audit` — pôle JEU
- `/narration-pmo-audit` + `/narration-archiviste-audit` — pôle NARRATION
- `/audit-claude-archi` — méta-audit archi Claude (CLAUDE.md, rules, skills, hooks)

---

_Refonte 2026-05-13 : architecture CLAUDE.md à 3 niveaux (racine léger + pôles + rules path-scoped). Conforme [`docs.anthropic.com`](https://code.claude.com/docs/en/memory). Racine < 100 lignes, seul re-injecté après `/compact`._
