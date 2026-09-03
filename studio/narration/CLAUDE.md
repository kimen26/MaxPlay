# PÔLE NARRATION — Règles auto-chargées

> Ce fichier est **chargé automatiquement** dès qu'un fichier sous `studio/narration/` est lu/édité ([doc Anthropic](https://code.claude.com/docs/en/memory#how-claude-md-files-load)).
> Pour la **navigation humaine** (catalogue 4 piliers + équipe + mémoire), voir [`INDEX.md`](INDEX.md).
> ⚠️ Ce fichier **n'est PAS re-injecté après `/compact`** — il rechargera quand Claude touchera un fichier de `studio/narration/`.

---

## Principes pôle NARRATION (non négociables)

- **Patte narrative** : B+D+C = **Kishōtenketsu** (sans antagoniste) + tranche de vie + cycle. Détail [`equipe/patte-narrative-maxplay.md`](equipe/patte-narrative-maxplay.md).
- **Univers IMPLICITE** : jamais nommer un ennéatype, un système, une doctrine dans le texte.
- **Surnoms 4/5 du temps** : prénoms complets réservés au formel.
- **Narration sobre** : objet du titre au centre, monde en touches légères.
- **Jamais inventer** : casting V1 figé + lookup yaml. Ne pas extrapoler depuis IA externes.
- **Casting V1** (2026-04-24, ajusté 2026-05-05) : Wex (hors-système) + Melki/Mimi/Dadou/**Madie**/Lulu/Pierrot/Raph/Juju/Nono. 4F/5M+Wex. Toujours lire [`personnages/INDEX.md`](personnages/INDEX.md) avant d'écrire un perso.
- **Référence externe ennéagramme** : `C:\Users\kimen\SecondBrain\Ressources\Enneagramme\` (Chabreuil).

---

## Table de routage — quelle question → quel fichier

**Règle MILITAIRE** : avant de répondre de mémoire à "combien / quels / où est X", **invoquer `narration-pmo` en mode RECHERCHE**.

| Question | Source autorité |
|----------|-----------------|
| État du projet, journal récent | [`memory/MEMORY.md`](memory/MEMORY.md) |
| Décisions figées + questions ouvertes | [`memory/DECISIONS.md`](memory/DECISIONS.md) |
| Tickets actifs (max 3) + roadmap | [`memory/TODO.md`](memory/TODO.md) |
| Leçons process (pas le craft) | [`memory/LESSONS.md`](memory/LESSONS.md) |
| Chiffres clés (writers, panel, casting, voice_ids) | [`memory/INVARIANTS.md`](memory/INVARIANTS.md) |
| Qui fait quoi | [`equipe/ORGANIGRAMME.md`](equipe/ORGANIGRAMME.md) + [`equipe/PROCESS.md`](equipe/PROCESS.md) |
| Patte narrative (B+D+C, Kishōtenketsu) | [`equipe/patte-narrative-maxplay.md`](equipe/patte-narrative-maxplay.md) |
| Langage naturel / tags voix d'un perso | [`personnages/type-XX/alive.md`](personnages/) |
| PROCESS 11 étapes détaillé | [`equipe/PROCESS.md`](equipe/PROCESS.md), auto-chargé par [`.claude/rules/stories-process.md`](../../.claude/rules/stories-process.md) sur `stories/**` |
| Craft narratif (*comment* écrire) | skill [`~/.claude/skills/narration-craft/SKILL.md`](C:/Users/kimen/.claude/skills/narration-craft/SKILL.md), rappels MaxPlay via [`.claude/rules/narration-craft.md`](../../.claude/rules/narration-craft.md) |
| Production audio | [`.claude/rules/audio.md`](../../.claude/rules/audio.md) + skills `elevenlabs-voice-design`/`audio-direction-elevenlabs` + [`personnages/voix-meta/_VOICE-IDS-CASTING.md`](personnages/voix-meta/_VOICE-IDS-CASTING.md) |
| 4 piliers (personnages/univers/cross-culture/saisons) | [`INDEX.md`](INDEX.md) |

🛑 Cliffhanger/open-loop : OK au milieu, JAMAIS à la fin (patte Kishōtenketsu apaisant).

## ⚙️ Gouvernance proactive

**Capture immédiate (2026-07-19)** : toute idée/décision de Papa Yann = 1 ligne dans `memory/TODO.md` DANS LE TOUR. `narration-pmo` (unifié FOND+FORME, Sonnet) sert en clôture, audit, mode RECHERCHE et relecture briefs. Hook Stop `pmo-check` bloque toute session sans trace mémoire.

## 📥 Zones INBOX (2 canaux, règle 48h)

[`inbox/`](inbox/) (Papa Yann, fichiers manuels) et [`INBOX.md`](INBOX.md) (bot Telegram + digests) — tout dépôt distillé ou tickété sous 48h.

---

## Workflow

```
Plan → TodoWrite → Dev (subagents) → Verify → Commit → Docs
```
Après correction utilisateur → leçon dans [`memory/LESSONS.md`](memory/LESSONS.md) (process) ou [`equipe/lecons-vivantes.md`](equipe/lecons-vivantes.md) (craft).

## Commande audit

`/narration-pmo-audit` — FOND + FORME en un passage.

## Pointeurs

[`INDEX.md`](INDEX.md) (catalogue navigable) · [`equipe/PROCESS.md`](equipe/PROCESS.md) · [`INBOX.md`](INBOX.md) · pôles voisins [`../minijeux/CLAUDE.md`](../minijeux/CLAUDE.md) · [`../dino/CLAUDE.md`](../dino/CLAUDE.md) (DINO = consommateur de la narration, gouvernance propre).

---

_Convergence mémoire 2026-09-03 (HO-NAR-01) : `pmo/` → `memory/` (quintette), fichier réduit de 169 à ≤80 lignes. Détail : [`memory/MEMORY.md § Journal`](memory/MEMORY.md)._
