# MaxPlay — Jeu éducatif & Univers narratif pour Max (3.5-4 ans)

## ACTION OBLIGATOIRE — avant toute réponse

**Étape 1 — Identifier le pôle :**

| Mots dans la demande | Pôle | Lire ensuite |
|----------------------|------|-------------|
| jeu · MJ · mini-jeu · bus · Phaser · mj-XX · tile · LimeZu · déploiement · `game/web` | **JEU** | [`game/CLAUDE.md`](game/CLAUDE.md) → [`game/INDEX.md`](game/INDEX.md) |
| dino · dinosaure · encyclopédie · voyage (époque) · récit dino · famille dino · Tritri · dev-dinos | **DINO** | [`studio/dino/CLAUDE.md`](studio/dino/CLAUDE.md) → [`studio/dino/INDEX.md`](studio/dino/INDEX.md) |
| narration · histoire · personnage · univers · ennéagramme · cross-culture · saison · arc · Wex/Melki/Mimi/Dadou/Madie/Lulu/Pierrot/Raph/Juju/Nono | **NARRATION** | [`studio/narration/CLAUDE.md`](studio/narration/CLAUDE.md) → [`studio/narration/INDEX.md`](studio/narration/INDEX.md) |
| idée brute · dump · brainstorm sans contexte clair | **?** | Demander : "C'est pour le jeu, les dinos ou les histoires ?" |

> ⚠️ **DINO est transverse** : son code est déployé depuis `game/web/` (dev-dinos.html, dinos-data.js, audio/dinos, img/dinos) mais sa gouvernance vit dans `studio/dino/`. La rule [`.claude/rules/dino.md`](.claude/rules/dino.md) charge les règles dino où que vive le fichier.

> 🏛️ **Modèle : 1 plateforme · N domaines autonomes.** MaxPlay = une **app de restitution** (PWA déployée depuis `game/web/` → GitHub Pages) qui héberge des domaines **indépendants à GED/PMO propres** : mini-jeux (`game/`) · dino (`studio/dino/`, déployé dans game/web/) · narration (`studio/narration/`, descendra dans game/web/ quand prête) · tile/Max Adventure (futur). `game/` porte 2 casquettes — **plateforme** (menu, stars, unlock, CI) **+** domaine **mini-jeux** — OK tant qu'ils dominent ; sinon extraire une couche plateforme. Tenant déployé ailleurs = pôle d'autoring + **rule path-scoped** (pattern dino, validé). **INBOX** : 2 boîtes (game, narration), le PMO d'accueil **trie par domaine → bon backlog**. Pas de prolifération.

**Étape 2 — Annoncer avant d'agir :**
*"Mode [JEU/NARRATION] — je charge [fichier] puis j'agis."*

> **Note loading** : `game/CLAUDE.md` et `studio/narration/CLAUDE.md` sont **chargés automatiquement** par Claude Code dès qu'un fichier de leur sous-arbre est touché. Ce CLAUDE.md racine reste le SEUL re-injecté après `/compact`.

---

<!-- Signaux → agents auto : enforced de façon déterministe par le hook UserPromptSubmit (signal-detector.ps1). Voir .claude/settings.json. -->

## Arborescence

```
MaxPlay/
├── CLAUDE.md             ← ce fichier (routage + commun)
├── game/                 ← PÔLE JEU → game/CLAUDE.md (auto-loaded)
├── studio/               ← pôles d'autoring (non déployés)
│   ├── dino/             ← PÔLE DINO → studio/dino/CLAUDE.md (code déployé dans game/web/, lié par rules/dino.md)
│   └── narration/        ← PÔLE NARRATION → studio/narration/CLAUDE.md (auto-loaded)
├── infra/                ← bot Telegram + serveur MCP llm-copains
├── memory/               ← transverse : MEMORY, MAX_PROFILE, VISION
├── _archive/             ← cadavres préservés (avec INDEX expliquant chaque entrée)
├── .claude/
│   ├── agents/           ← 24 sous-agents (PMO, sachants, reviewers, conseillers)
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
- **JAMAIS de `AskUserQuestion`** (formulaire dynamique), ni en JEU ni en NARRATION — poser les questions **en texte dans la réponse**, façon chatbot (« Tu préfères A ou B ? »). Le picker natif ne se relaie pas sur le bot Telegram.
- Toujours lire l'INDEX du pôle avant de répondre sur un sujet de fond
- Ne jamais répondre de mémoire sur un chiffre/casting/voice_id — invoquer le PMO en mode RECHERCHE
- Après correction utilisateur → leçon dans `game/pmo/backlog.md` (JEU) ou `studio/narration/pmo/decisions.md` (NARRATION)

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

_Refonte 2026-05-13 : architecture CLAUDE.md à 3 niveaux (racine léger + pôles + rules path-scoped). Conforme [`docs.anthropic.com`](https://code.claude.com/docs/en/memory). Audit 2026-05-15 : tableau signaux déplacé en commentaire HTML (enforced par hook, pas advisory). Racine < 90 lignes, seul re-injecté après `/compact`._
