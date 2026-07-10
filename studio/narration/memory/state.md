---
name: État narration MaxPlay
description: État condensé du pôle narration — histoires, casting, workflow, agents à appeler
type: project
---

> Charger ce fichier au démarrage de toute session NARRATION. Puis lire `../pmo/INDEX.md`.
> ⚠️ Refonte complète 2026-07-10 (méga-audit) — l'ancienne version datait du 2026-04-29 et citait des histoires supprimées au ménage 2026-05-08.

## État histoires (2026-07-10)

| # | Titre | Statut | Persos |
|---|-------|--------|--------|
| 001 | Le Pont Cassé | ✅ canon (540 mots, 2026-05-08) | Wex · Raph · Pierrot |
| 002 | La Libellule impossible | 🟢 étape 4 **vague 6** (14 writers relancés 2026-07-10) | Wex · Juju · Nono |
| 003-005 | 3 sujets proposés 2026-07-10 (flaque-miroir Lulu·Madie / caillou Melki·Dadou / goûter Mimi·Lulu) | ⏳ validation Papa Yann | — |

**Arc 1 actif** (10 épisodes, extérieur, printemps, sans adulte, bienveillant). Arc 2 (Parole) en pause.
**Source de vérité statuts** : `../stories/INDEX.md` + kanban de chaque story. Ne PAS répondre de mémoire depuis ce fichier.

## Casting V1 figé (2026-04-24, ajusté 2026-05-05)

Wex (hors-système) + Melki#1 · Mimi#2(F) · Dadou#3 · Madie#4(F) · Lulu#5 · Pierrot#6 · Raph#7(F) · Juju#8(F) · Nono#9. 4F/5M+Wex.
Détail + sensibilités : `../personnages/INDEX.md` + `lookup.yml`. Diminutifs 4/5 du temps.

## PROCESS (source de vérité : `../equipe/PROCESS.md` + `../pmo/INVARIANTS.md`)

11 étapes 0-10 · 14 writers (6 Claude + 4 Kimi + 2 DeepSeek + 2 Grok) · panel v2 = 12 calls (4 groupes × 3 modèles) · 3 validations auteur (1/6/10) · SLA 3 jours.

## Outils de goût (depuis 2026-07-03)

- **Lecture annotée** `site/lecture.html` = instrument PRINCIPAL (DEC-DOCTRINE-INSTRUMENT-LECTURE 2026-07-08)
- **Duel** `site/duel.html` = arbitrages serrés
- Mémoire de goût : `../gout/memoire-papa-yann.md` (lecture OBLIGATOIRE Directeur étapes 3 et 6) + `../gout/palmares-writers.md`

## Leçon infra writers

Writer long (Kimi surtout) : MCP timeout ~250 s → CLI `infra/mcp/call-llm.mjs` (Bash 600 s). Jamais conclure « panne infra ».

## Agents

Conseiller (pitch/brainstorm) · `narration` Directeur (briefs/sélection/rewrite) · writers claude-libre/kimi-guide · lecteur + lecteur-dyade · gatekeeper · pmo (FOND) · archiviste (FORME).
