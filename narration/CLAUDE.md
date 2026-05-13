# PÔLE NARRATION — Règles auto-chargées

> Ce fichier est **chargé automatiquement** par Claude Code dès qu'un fichier sous `narration/` est lu/édité ([doc Anthropic](https://code.claude.com/docs/en/memory#how-claude-md-files-load)).
> Pour la **navigation humaine** (catalogue 4 piliers + équipe + PMO), voir [`INDEX.md`](INDEX.md).
> ⚠️ Ce fichier **n'est PAS re-injecté après `/compact`** — il rechargera quand Claude touchera un fichier de `narration/`.

---

## Principes pôle NARRATION (non négociables)

- **Patte narrative** : B+D+C = **Kishōtenketsu** (sans antagoniste) + tranche de vie + cycle. Détail [`equipe/patte-narrative-maxplay.md`](equipe/patte-narrative-maxplay.md).
- **Univers IMPLICITE** : jamais nommer un ennéatype, un système, une doctrine dans le texte. Tout passe par la matière vivante.
- **Surnoms 4/5 du temps** : prénoms complets réservés au formel.
- **Narration sobre** : objet du titre au centre, monde en touches légères.
- **Jamais inventer** : casting V1 figé + lookup yaml. Ne pas extrapoler depuis IA externes.
- **Référence externe ennéagramme** : `C:\Users\kimen\SecondBrain\Ressources\Enneagramme\` (Chabreuil).

---

## ⚙️ PMO + Archiviste proactifs

`narration-pmo` (FOND) et `narration-archiviste` (FORME) sont **invoqués automatiquement** à chaque tour incluant leur signal. Voir tableau dans [`../CLAUDE.md`](../CLAUDE.md) racine.

| Source de vérité | Fichier |
|------------------|---------|
| Chiffres clés (10 versions / 20 lecteurs / casting / voice_ids / règles d'or) | [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) |
| Décisions définitives + questions ouvertes | [`pmo/decisions.md`](pmo/decisions.md) |
| Tickets actifs (max 3 en cours) | [`pmo/backlog.md`](pmo/backlog.md) |
| Journal sessions | [`pmo/sprint-log.md`](pmo/sprint-log.md) |
| Traces audits + cause racine | [`pmo/audit-trail.md`](pmo/audit-trail.md) |

---

## 🧭 Table de routage NARRATION

**Règle MILITAIRE** : avant de répondre de mémoire à une question "combien / quels / où est X", **invoquer `narration-pmo` en mode RECHERCHE** sur le fichier ci-dessous. Ne jamais répondre de mémoire.

| Question | Source autorité |
|----------|-----------------|
| Combien de writers, modèles, libre vs guidé, températures ? | [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) § *Casting writers étape 4* + [`equipe/PROCESS.md`](equipe/PROCESS.md) L.107-122 |
| Leviers de variance (angle / POV / ouverture / longueur / température) ? | [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) § *Leviers de variance* + [`equipe/templates/brief-histoire.template.md`](equipe/templates/brief-histoire.template.md) |
| 6 axes du writer guidé (créature, geste, onomatopée, rituel, mystère, faute) ? | [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) § *6 axes* + [`equipe/lecons-vivantes.md`](equipe/lecons-vivantes.md) |
| Quel agent fait quoi dans la chaîne ? | [`equipe/ORGANIGRAMME.md`](equipe/ORGANIGRAMME.md) + [`equipe/PROCESS.md`](equipe/PROCESS.md) (owner par étape) |
| Chiffres clés PROCESS (étapes, lecteurs, SLA, rewrite plafond) ? | [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) § *Chiffres clés PROCESS* |
| Casting personnages V1 (prénoms, ennéatypes, voice_ids) ? | [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) § *Casting figé* / § *Voice IDs* + [`personnages/INDEX.md`](personnages/INDEX.md) |
| Règles d'or structurelles (univers implicite, surnoms 4/5, etc.) ? | [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) § *Règles d'or* |
| Patte narrative (B+D+C, Kishōtenketsu) ? | [`equipe/patte-narrative-maxplay.md`](equipe/patte-narrative-maxplay.md) |
| Production audio multi-voix ElevenLabs ? | Skills globaux `~/.claude/skills/elevenlabs-voice-design/` + `audio-direction-elevenlabs/` |

---

## Architecture en 4 piliers (résumé — détail dans [`INDEX.md`](INDEX.md))

| Pilier | Dossier | À lire avant d'écrire |
|--------|---------|----------------------|
| 1 — Personnages | [`personnages/`](personnages/) | [`personnages/INDEX.md`](personnages/INDEX.md) + ennéatype pertinent + boussole pédagogie 4-5 |
| 2 — Univers | [`univers/`](univers/) | [`univers/INDEX.md`](univers/INDEX.md) (fondements, vie-quotidienne, meta) |
| 3 — Cross-culture | [`cross-culture/`](cross-culture/) | [`cross-culture/INDEX.md`](cross-culture/INDEX.md) + doctrine |
| 4 — Saisons | [`saisons/`](saisons/) | [`saisons/INDEX.md`](saisons/INDEX.md) (roadmap S1 en cours) |

**Casting V1 « Christ » figé** (2026-04-24, ajusté 2026-05-05) :
Wex (hors-système, invariant cross-culture) + Melki/Mimi/Dadou/**Madie**/Lulu/Pierrot/Raph/Juju/Nono. **4F/5M+Wex.**
Toujours lire [`personnages/INDEX.md`](personnages/INDEX.md) avant d'écrire un perso.

---

## PROCESS militaire 10 étapes

> ⚠️ Détail complet **auto-chargé** par `.claude/rules/stories-process.md` dès que Claude touche `narration/stories/**`. Résumé pour navigation :

```
0.  Auteur          → INBOX.md (idée brute)
1.  Conseiller      → 1-pitch-plan.md                              ✅ valide auteur
                     (fusion pitch + plan léger 2026-05-12)
3.  Directeur       → 3-briefs/{univers, personnages, histoire}.md + _writer-package.md
4.  10 Writers      → 4-versions-writers/ (2 Claude + 4 Kimi (dont 1 guidé) + 2 DeepSeek + 2 Grok)
5.  20 Lecteurs     → 5-lecteurs-temoins/ + 5-synthese-lecteurs.md
6.  Directeur       → 6-selection.md (base + greffes)              ✅ valide auteur
7.  Writer top 1    → 7-rewrite/<llm>-rewrite-v1.md
8.  GateKeeper      → 8-gatekeeper-verdict.md
9.  Panel 20        → 9-relecture-rewrite/
10. Directeur+PMO   → 10-texte.md (CANON) + maj lecons-vivantes.md ✅ valide auteur
```

Source de vérité : [`equipe/PROCESS.md`](equipe/PROCESS.md).
**Règles obligatoires étapes 1 et 3** : lecture de [`personnages/theorie/pedagogie-enfance/`](personnages/theorie/pedagogie-enfance/README.md) + ennéatypes pertinents.

---

## Production audio (skills globaux)

🎙️ 2 skills globaux auto-triggered :
- [`~/.claude/skills/elevenlabs-voice-design/`](C:/Users/kimen/.claude/skills/elevenlabs-voice-design/) — **CRÉATION** d'une voix (Voice Design prompts, multilingue, voice cloning)
- [`~/.claude/skills/audio-direction-elevenlabs/`](C:/Users/kimen/.claude/skills/audio-direction-elevenlabs/) — **PRODUCTION** multi-voix (text-to-dialogue, tags v3, tricks graphie, pronunciation dicts, voice settings, 17 anti-patterns, 12 cultures)

Source méthodo : [`personnages/voix-meta/_VOICE-IDS-CASTING.md`](personnages/voix-meta/_VOICE-IDS-CASTING.md).
Script production : [`scripts/generate-story-audio.js`](scripts/generate-story-audio.js).

---

## Cross-culture

Les **variantes culturelles** (prénoms par pays, onomatopées, équivalents décor, faune, saisons climatiques) vivent dans [`cross-culture/`](cross-culture/INDEX.md). Le casting FR est dans [`cross-culture/castings-nationaux/fr/`](cross-culture/castings-nationaux/fr/).

---

## Workflow narration

```
Plan → TodoWrite → Dev (subagents) → Verify → Commit → Docs
```
Après correction utilisateur → leçon dans [`pmo/decisions.md`](pmo/decisions.md).

---

## Commandes audit

- `/narration-pmo-audit` — FOND (cohérence sémantique décisions ⇄ INDEX ⇄ Kanban)
- `/narration-archiviste-audit` — FORME (gabarit, refs, orphelins, préfixes étapes)

---

## Pointeurs

- Catalogue navigable : [`INDEX.md`](INDEX.md)
- Process complet : [`equipe/PROCESS.md`](equipe/PROCESS.md)
- INBOX dump : [`INBOX.md`](INBOX.md)
- Pôle voisin : [`../game/CLAUDE.md`](../game/CLAUDE.md)

---

_Refonte 2026-05-13 : extrait de l'ancien CLAUDE.md racine. Table de routage + 4 piliers + casting + PROCESS résumé déplacés ici (chargement on-demand). Détail process auto-chargé via rule `stories-process.md` quand Claude touche `stories/**`. Voir [`pmo/audit-trail.md`](pmo/audit-trail.md) pour la trace._
