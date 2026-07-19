<!-- MIROIR de CLAUDE.md — point d'entrée Kimi Code (AGENTS.md) et autres agents non-Claude.
     CLAUDE.md reste la SOURCE : toute modif se fait là-bas, puis régénérer ce fichier à l'identique
     (seul ce bandeau diffère). -->

# MaxPlay — Jeu éducatif & Univers narratif pour Max (3.5-4 ans)

## ACTION OBLIGATOIRE — avant toute réponse

**Étape 1 — Identifier le pôle :**

| Mots dans la demande | Pôle | Lire ensuite |
|----------------------|------|-------------|
| jeu · MJ · mini-jeu · bus · Phaser · mj-XX · tile · LimeZu · déploiement · `site` | **JEU** | [`studio/minijeux/CLAUDE.md`](studio/minijeux/CLAUDE.md) → [`studio/minijeux/INDEX.md`](studio/minijeux/INDEX.md) |
| dino · dinosaure · encyclopédie · voyage (époque) · récit dino · famille dino · Tritri · dev-dinos | **DINO** | [`studio/dino/CLAUDE.md`](studio/dino/CLAUDE.md) → [`studio/dino/INDEX.md`](studio/dino/INDEX.md) |
| narration · histoire · personnage · univers · ennéagramme · cross-culture · saison · arc · Wex/Melki/Mimi/Dadou/Madie/Lulu/Pierrot/Raph/Juju/Nono | **NARRATION** | [`studio/narration/CLAUDE.md`](studio/narration/CLAUDE.md) → [`studio/narration/INDEX.md`](studio/narration/INDEX.md) |
| lunii · boîte à histoires · pack · STUdio · transfert appareil · conteuse | **LUNII** | [`studio/lunii/CLAUDE.md`](studio/lunii/CLAUDE.md) (canal de distribution, léger) |
| idée brute · dump · brainstorm sans contexte clair | **?** | Demander : "C'est pour le jeu, les dinos ou les histoires ?" |

> ⚠️ **DINO est transverse** : son code est déployé depuis `site/` (dev-dinos.html, dinos-data.js, audio/dinos, img/dinos) mais sa gouvernance vit dans `studio/dino/`. La rule [`.claude/rules/dino.md`](.claude/rules/dino.md) charge les règles dino où que vive le fichier.

> 🏛️ **Modèle : 1 plateforme · N domaines autonomes.** MaxPlay = une **app de restitution** (PWA déployée depuis `site/` → GitHub Pages) qui héberge des domaines **indépendants à GED/PMO propres** : mini-jeux (`studio/minijeux/`) · dino (`studio/dino/`, déployé dans site/) · narration (`studio/narration/`, descendra dans site/ quand prête) · tile/Max Adventure (futur). `studio/minijeux/` porte 2 casquettes — **plateforme** (menu, stars, unlock, CI) **+** domaine **mini-jeux** — OK tant qu'ils dominent ; sinon extraire une couche plateforme. Tenant déployé ailleurs = pôle d'autoring + **rule path-scoped** (pattern dino, validé). **INBOX** : 2 boîtes (game, narration), le PMO d'accueil **trie par domaine → bon backlog**. Pas de prolifération.

**Étape 2 — Annoncer avant d'agir :**
*"Mode [JEU/NARRATION] — je charge [fichier] puis j'agis."*

> **Note loading** : `studio/minijeux/CLAUDE.md` et `studio/narration/CLAUDE.md` sont **chargés automatiquement** par Claude Code dès qu'un fichier de leur sous-arbre est touché. Sous Kimi Code, l'équivalent est le `AGENTS.md` du pôle — le lire explicitement. Ce fichier racine reste le SEUL re-injecté après compaction.

---

<!-- Signaux → agents auto : enforced de façon déterministe par le hook UserPromptSubmit (signal-detector.ps1). Voir .claude/settings.json (Claude Code) et ~/.kimi-code/config.toml (Kimi Code). -->

## Arborescence

```
MaxPlay/
├── CLAUDE.md             ← source de vérité du routage (Claude Code)
├── AGENTS.md             ← ce fichier (miroir pour Kimi Code & autres agents)
├── site/                 ← LE site déployé (GitHub Pages) — index, mini-jeux, dino, max-adventure
├── studio/               ← pôles d'autoring (non déployés)
│   ├── minijeux/         ← PÔLE JEU → studio/minijeux/CLAUDE.md (code déployé dans site/)
│   ├── dino/             ← PÔLE DINO → studio/dino/CLAUDE.md (code déployé dans site/, lié par rules/dino.md)
│   ├── narration/        ← PÔLE NARRATION → studio/narration/CLAUDE.md
│   ├── lunii/            ← distribution Lunii (STUdio) → studio/lunii/CLAUDE.md (léger, sans PMO)
│   └── max-adventure/    ← source Phaser (build → site/max-adventure/)
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
- **JAMAIS de formulaire dynamique de questions** (AskUserQuestion), ni en JEU ni en NARRATION — poser les questions **en texte dans la réponse**, façon chatbot (« Tu préfères A ou B ? »). Le picker natif ne se relaie pas sur le bot Telegram.
- Toujours lire l'INDEX du pôle avant de répondre sur un sujet de fond
- Ne jamais répondre de mémoire sur un chiffre/casting/voice_id — invoquer le PMO en mode RECHERCHE
- Après correction utilisateur → leçon dans `studio/minijeux/pmo/backlog.md` (JEU) ou `studio/narration/pmo/decisions.md` (NARRATION)

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
| [`memory/DOCTRINE.md`](memory/DOCTRINE.md) | Doctrine GED transverse (canon sans numéro, zéro chiffre en dur, frontières) — chaque PMO/INDEX de pôle y pointe |
| [`memory/skills-map.md`](memory/skills-map.md) | Agents, skills, commandes |
| [`memory/audits/2026-07-06-infra-business.md`](memory/audits/2026-07-06-infra-business.md) | Audit infra & business 2026 (légal enfants, archi phasée, monétisation) |
| [`infra/supabase/README.md`](infra/supabase/README.md) | Supabase Phase 1 (auth parent, sync progression, voix cloud) |
| [`infra/bot/index.ts`](infra/bot/index.ts) | Bot Telegram — routing agents, permissions |
| [`infra/mcp/server.ts`](infra/mcp/server.ts) | MCP llm-copains (Grok, Kimi, ElevenLabs) |
| [`_archive/INDEX.md`](_archive/INDEX.md) | Cadavres préservés (avec date + raison) |

---

## Commandes audit (rappel)

- `/game-pmo-audit` — pôle JEU (FOND + FORME, fusion 2026-07-19)
- `/narration-pmo-audit` — pôle NARRATION (FOND + FORME)
- `/dino-pmo-audit` — pôle DINO (FOND + FORME)
- skill `env-compat-check` — audit bi-outil Claude ↔ Kimi (config, skills, hooks, miroirs)

---

_Refonte 2026-05-13 : architecture CLAUDE.md à 3 niveaux (racine léger + pôles + rules path-scoped). Conforme [`docs.anthropic.com`](https://code.claude.com/docs/en/memory). Audit 2026-05-15 : tableau signaux déplacé en commentaire HTML (enforced par hook, pas advisory). Racine < 90 lignes, seul re-injecté après `/compact`. Miroir AGENTS.md créé 2026-07-18 pour Kimi Code._
