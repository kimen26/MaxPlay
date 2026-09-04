<!-- MIROIR de CLAUDE.md — point d'entrée Kimi Code (AGENTS.md) et autres agents non-Claude.
     CLAUDE.md reste la SOURCE : toute modif se fait là-bas, puis régénérer ce fichier à l'identique
     (seul ce bandeau diffère). GÉNÉRÉ par .claude/hooks/sync-agents-md.py — ne pas éditer à la main. -->

# MaxPlay — Jeu éducatif & Univers narratif pour Max (3.5-4 ans)

## ACTION OBLIGATOIRE — avant toute réponse

**Étape 1 — Identifier le pôle :**

| Mots dans la demande | Pôle | Lire ensuite |
|----------------------|------|-------------|
| jeu · MJ · mini-jeu · bus · mj-XX · déploiement · `site` | **JEU** | [`studio/minijeux/CLAUDE.md`](studio/minijeux/CLAUDE.md) → [`studio/minijeux/INDEX.md`](studio/minijeux/INDEX.md) |
| dino · dinosaure · encyclopédie · voyage (époque) · récit dino · famille dino · Tritri · dev-dinos | **DINO** | [`studio/dino/CLAUDE.md`](studio/dino/CLAUDE.md) → [`studio/dino/INDEX.md`](studio/dino/INDEX.md) |
| narration · histoire · personnage · univers · ennéagramme · cross-culture · saison · arc · Wex/Melki/Mimi/Dadou/Madie/Lulu/Pierrot/Raph/Juju/Nono | **NARRATION** | [`studio/narration/CLAUDE.md`](studio/narration/CLAUDE.md) → [`studio/narration/INDEX.md`](studio/narration/INDEX.md) |
| lunii · boîte à histoires · pack · STUdio · transfert appareil · conteuse | **LUNII** | [`studio/lunii/CLAUDE.md`](studio/lunii/CLAUDE.md) (canal de distribution, léger) |
| référentiel de contenu · dette de contenu · dérive texte/audio · quel texte est lu où · contrat TTS/EL/Lunii · tableau de bord contenu | **TRANSVERSE** | [`studio/referentiel/README.md`](studio/referentiel/README.md) → plan [`studio/referentiel/docs/ARCHI-REFERENTIEL-CONTENU.md`](studio/referentiel/docs/ARCHI-REFERENTIEL-CONTENU.md) |
| idée brute · dump · brainstorm sans contexte clair | **?** | Demander : "C'est pour le jeu, les dinos ou les histoires ?" |

> ⚠️ **DINO est transverse** : code déployé depuis `site/` (dev-dinos.html, dinos-data.js, audio/dinos, img/dinos), gouvernance dans `studio/dino/`. La rule [`.claude/rules/dino.md`](.claude/rules/dino.md) charge les règles dino où que vive le fichier.

> 🏛️ **Modèle : 1 plateforme · N domaines autonomes.** MaxPlay = une app de restitution (PWA `site/` → GitHub Pages) qui héberge des domaines indépendants à GED/PMO propres : mini-jeux, dino (déployé dans site/), narration (descendra dans site/ quand prête). Tenant déployé ailleurs = pôle d'autoring + rule path-scoped (pattern dino). INBOX 2 boîtes (game, narration), triées par domaine.

**Étape 2 — Annoncer avant d'agir :** *"Mode [JEU/NARRATION] — je charge [fichier] puis j'agis."*

> `studio/minijeux/CLAUDE.md` et `studio/narration/CLAUDE.md` sont chargés automatiquement dès qu'un fichier de leur sous-arbre est touché. Sous Kimi Code, l'équivalent est le `AGENTS.md` du pôle — le lire explicitement. Ce fichier racine est le SEUL re-injecté après compaction.

---

<!-- Signaux → agents auto : enforced de façon déterministe par le hook UserPromptSubmit (signal-detector.ps1). Voir .claude/settings.json (Claude Code) et ~/.kimi-code/config.toml (Kimi Code). -->

## Arborescence

```
MaxPlay/
├── CLAUDE.md             ← source de vérité du routage (Claude Code)
├── AGENTS.md             ← ce fichier (miroir pour Kimi Code & autres agents)
├── site/                 ← LE site déployé (GitHub Pages) — index, mini-jeux, dino
├── studio/               ← pôles d'autoring (non déployés)
│   ├── minijeux/         ← PÔLE JEU → studio/minijeux/CLAUDE.md (code déployé dans site/)
│   ├── dino/             ← PÔLE DINO → studio/dino/CLAUDE.md (code déployé dans site/, lié par rules/dino.md)
│   ├── narration/        ← PÔLE NARRATION → studio/narration/CLAUDE.md
│   ├── lunii/            ← distribution Lunii (STUdio) → studio/lunii/CLAUDE.md (léger, sans PMO)
│   └── referentiel/      ← TRANSVERSE : registre des textes/sons + détection de dérive (lecture seule)
├── infra/                ← bot Telegram + serveur MCP llm-copains
├── memory/               ← transverse : MEMORY, MAX_PROFILE, VISION
├── _archive/             ← cadavres préservés (avec INDEX expliquant chaque entrée)
├── .claude/
│   ├── agents/           ← sous-agents (PMO, sachants, reviewers, conseillers — count : `ls .claude/agents/`)
│   ├── hooks/            ← scripts hooks déterministes
│   ├── rules/            ← règles path-scoped (chargées quand fichier match)
│   └── settings.json     ← config hooks + permissions
```

## Profil Max

3.5-4 ans · chiffres jusqu'aux milliers · lecture phonétique · tablette tactile.
Passions : bus Villejuif, animaux, drapeaux, loups, Tayo, Totoro/Ghibli, Stitch.
Origines brésiliennes. Détails : [`memory/MAX_PROFILE.md`](memory/MAX_PROFILE.md).

## Principes transverses

- **Simplicity First** · **No Laziness** · **Minimal Impact** · Plan mode pour 3+ étapes
- **JAMAIS de formulaire dynamique de questions** (AskUserQuestion) — questions **en texte dans la réponse** (« Tu préfères A ou B ? »), le picker ne se relaie pas sur le bot Telegram
- Toujours lire l'INDEX du pôle avant de répondre sur un sujet de fond · jamais de mémoire sur un chiffre/casting/voice_id → PMO en mode RECHERCHE
- Après correction utilisateur → leçon dans `memory/LESSONS.md` (transverse) ou `studio/<pôle>/memory/LESSONS.md` (pôle)

## Workflow

```
Plan → TodoWrite → Dev (subagents) → Verify → Commit → Docs
```

## Fichiers transversaux

| Fichier | Rôle |
|---------|------|
| [`memory/MEMORY.md`](memory/MEMORY.md) / [`TODO.md`](memory/TODO.md) / [`DECISIONS.md`](memory/DECISIONS.md) / [`LESSONS.md`](memory/LESSONS.md) / [`CHANGELOG.md`](memory/CHANGELOG.md) | Quintette transverse : où on en est / quoi ensuite / pourquoi (D-NNN) / erreur à ne pas refaire (L-NNN) / ce qui est sorti |
| [`memory/MAX_PROFILE.md`](memory/MAX_PROFILE.md) / [`VISION.md`](memory/VISION.md) / [`audits/`](memory/audits/) | Profil Max / vision produit / audits datés |
| [`infra/supabase/README.md`](infra/supabase/README.md) / [`infra/bot/index.ts`](infra/bot/index.ts) / [`infra/mcp/server.ts`](infra/mcp/server.ts) | Supabase Phase 1 / bot Telegram / MCP llm-copains |
| [`_archive/INDEX.md`](_archive/INDEX.md) | Cadavres préservés (avec date + raison) |

## Portes de vérification (rappel)

| Domaine | Porte |
|---------|-------|
| Mini-jeu avant push | `cd studio/minijeux/tests && node audit-gabarit.mjs mj-XX && npm run mj:test mj-XX` |
| Liens `.md` | script de vérif de liens cassés (voir handoffs infra) |
| Compteurs narration | `node studio/narration/scripts/check-compteurs.js` |
| État dinos | `node studio/dino/content/scripts/export/_gen-etat-dinos.cjs` |
| Hooks actifs | `.claude/settings.json` § `hooks` (pmo-check, figees-injector, garde-git-add, signal-detector) |

## Commandes audit (rappel)

`/game-pmo-audit` (JEU) · `/narration-pmo-audit` (NARRATION) · `/dino-pmo-audit` (DINO) · skill `env-compat-check` (bi-outil Claude ↔ Kimi).

_Refonte 2026-05-13 : CLAUDE.md à 3 niveaux (racine + pôles + rules path-scoped), conforme [`docs.anthropic.com`](https://code.claude.com/docs/en/memory). Racine ≤ 100 lignes, seul re-injecté après `/compact`. Miroir AGENTS.md créé 2026-07-18 pour Kimi Code._
