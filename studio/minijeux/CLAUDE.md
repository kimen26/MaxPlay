# PÔLE JEU — Règles auto-chargées

> Ce fichier (gouvernance) est **chargé automatiquement** dès qu'un fichier sous `studio/minijeux/` est lu/édité (nested CLAUDE.md, [doc Anthropic](https://code.claude.com/docs/en/memory#how-claude-md-files-load)). ⚠️ Le **code déployé** (`site/mj-*.html`, `site/js/`) charge la **rule** [`.claude/rules/mini-jeux.md`](../../.claude/rules/mini-jeux.md), **pas ce fichier** — la rule pointe vers [`docs/STANDARD-MJ.md`](docs/STANDARD-MJ.md) (source unique des règles MJ), ce CLAUDE.md = navigation/gouvernance.
> Pour la **navigation humaine** (catalogue fichiers/équipe/déploiement), voir [`INDEX.md`](INDEX.md).
> ⚠️ Ce fichier **n'est PAS re-injecté après `/compact`** — il rechargera quand Claude touchera un fichier de `studio/minijeux/`.

---

## Principes pôle JEU (non négociables)

- **Simplicity First** · **No Laziness** · **Minimal Impact** · Plan mode pour 3+ étapes
- **Bus** : toujours `busSVG()` / `busSVGHiddenNum()` de [`site/js/bus-svg.js`](../../site/js/bus-svg.js). Jamais d'emoji 🚌, jamais de div CSS colorée.
- **Couleurs** : toujours via `LIGNES` de [`site/js/data.js`](../../site/js/data.js). Jamais de hex hardcodé.
- **UX/audio/gabarit** : source unique [`docs/STANDARD-MJ.md`](docs/STANDARD-MJ.md) (contrat MJ v2, zéro pénalité, feedback <200ms, zones tap 80px, padding audio 250ms).
- **Décisions figées par jeu** : [`docs/jeux/figees/mj-XX.md`](docs/jeux/figees/) fait **LOI**. Jamais modifier un `mj-XX.html` sans l'avoir lu (hook `figees-injector.ps1` le réinjecte). Jamais contredire une ligne 🔒. Seul Papa Yann défige.

---

## Mémoire du pôle (quintette, depuis 2026-09-03)

**Capture immédiate** : toute idée/décision de Papa Yann dans le tour = 1 ligne dans `memory/TODO.md` DANS LE TOUR (main agent). `game-pmo` (unifié FOND+FORME, Sonnet) sert en clôture, audit et mode RECHERCHE.

| Question | Fichier |
|----------|---------|
| Un chiffre clé (règles UX, count MJ) ? | [`memory/INVARIANTS.md`](memory/INVARIANTS.md) |
| Pourquoi c'est comme ça ? | [`memory/DECISIONS.md`](memory/DECISIONS.md) (+ `memory/archive/`) |
| Quoi faire ensuite ? | [`memory/TODO.md`](memory/TODO.md) |
| Quelle erreur ne pas refaire ? | [`memory/LESSONS.md`](memory/LESSONS.md) |
| Où on en est / journal sessions ? | [`memory/MEMORY.md`](memory/MEMORY.md) |
| Ce qui est sorti ? | [`memory/CHANGELOG.md`](memory/CHANGELOG.md) |

## Zones INBOX (2 canaux, checkées par game-pmo à chaque session)

| Zone | Qui dépose | Format |
|------|-----------|--------|
| [`inbox/`](inbox/) | **Papa Yann** — fichiers manuels | Libre |
| [`INBOX.md`](INBOX.md) | **Bot Telegram + digests Claude** | Sections `## YYYY-MM-DD` |

**Règle 48h** : tout dépôt doit être distillé ou tickété dans les 48h.

---

## Équipe agents

Résumé : `game-pmo` (Sonnet, clôture/audit/RECHERCHE) → `game-conseiller` (Opus, manuel) → sachants (`game-dev`, `game-mj-reviewer`). Détail : [`.claude/agents/README.md`](../../.claude/agents/README.md) et [`EQUIPE.md`](EQUIPE.md). Hiérarchie main → game-pmo → sous-spé, jamais cross-pôle direct.

---

## Stack & déploiement

Détail complet : [`docs/STACK.md`](docs/STACK.md). GitHub Pages → `kimen26.github.io/MaxPlay/`, source menu = [`site/js/catalog.js`](../../site/js/catalog.js). **Count / liste des mini-jeux : ne jamais recopier un chiffre ici** → source unique [`memory/INVARIANTS.md`](memory/INVARIANTS.md). Bugs critiques : [`memory/MEMORY.md`](memory/MEMORY.md).

> ⚠️ **Locataire DINO dans `site/`** : `dev-dinos.html`, `js/dinos-data.js`, `audio/dinos/`, `img/dinos/` sont **déployés depuis `site/` mais appartiennent au pôle DINO** (`../dino/`). Règles auto-chargées via [`../../.claude/rules/dino.md`](../../.claude/rules/dino.md). `game-pmo` ne gère pas le dino → `dino-pmo`.

---

## Commandes audit

- `/game-pmo-audit` — FOND + FORME en un passage

## Pointeurs

- Catalogue navigable : [`INDEX.md`](INDEX.md) · Équipe détaillée : [`EQUIPE.md`](EQUIPE.md)
- Pôle voisin : [`../narration/CLAUDE.md`](../narration/CLAUDE.md)

---

_Refonte 2026-09-03 (HO-MJ-01) : `pmo/` → `memory/` quintette. Voir `memory/archive/audit-trail-2026.md` pour la trace antérieure._
