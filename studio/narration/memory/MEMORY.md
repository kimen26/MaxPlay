# État narration — MEMORY

> Charger ce fichier au démarrage de toute session NARRATION. Puis lire `../INDEX.md`.
> Ancien `pmo/INDEX.md` + `memory/state.md` fusionnés ici (convergence HO-NAR-01, 2026-09-03). Détail chiffres → [`INVARIANTS.md`](INVARIANTS.md). Décisions → [`DECISIONS.md`](DECISIONS.md). Tickets → [`TODO.md`](TODO.md). Leçons → [`LESSONS.md`](LESSONS.md).

## État histoires (dernière vérification 2026-07-10 — NE PAS répondre de mémoire, revérifier sur `stories/INDEX.md` + kanban)

| # | Titre | Statut | Persos |
|---|-------|--------|--------|
| 001 | Le Pont Cassé | ✅ canon (540 mots, 2026-05-08) | Wex · Raph · Pierrot |
| 002 | La Libellule impossible | 🟢 étape 4 vague 6 (14 writers relancés 2026-07-10), lecture annotée en attente (INGESTION-LECTURE-V6) | Wex · Juju · Nono |
| 003-005 | Caillou / flaque-miroir / goûter (Melki·Dadou / Lulu·Madie / Mimi·Lulu) | produites jusqu'à l'étape 4 (2026-07-11) | — |
| 006-008 | Le nœud qui tient / L'ombre / La pomme de pin (Juju·Melki / Raph·Madie / Nono·Dadou) | étape 5 panel ✅ (créées 2026-07-11, mandat autonome) | — |

**Arc 1 actif** (10 épisodes, extérieur, printemps, sans adulte, bienveillant). Arc 2 (Parole) en pause.

## Casting V1 figé (2026-04-24, ajusté 2026-05-05)

Wex (hors-système) + Melki#1 · Mimi#2(F) · Dadou#3 · Madie#4(F) · Lulu#5 · Pierrot#6 · Raph#7(F) · Juju#8(F) · Nono#9. 4F/5M+Wex.
Détail + sensibilités : `../personnages/INDEX.md` + `lookup.yml`. Diminutifs 4/5 du temps.

## PROCESS (source de vérité : `../equipe/PROCESS.md` + `INVARIANTS.md`)

11 étapes 0-10 · 14 writers (6 Claude + 4 Kimi + 2 DeepSeek + 2 Grok) · panel v2 = 12 calls (4 groupes × 3 modèles) · 3 validations auteur (1/6/10) · SLA 3 jours.

## Outils de goût (depuis 2026-07-03)

- **Lecture annotée** `site/lecture.html` = instrument PRINCIPAL (DEC-DOCTRINE-INSTRUMENT-LECTURE 2026-07-08)
- **Duel** `site/duel.html` = arbitrages serrés
- Mémoire de goût : `../gout/memoire-papa-yann.md` (lecture OBLIGATOIRE Directeur étapes 3 et 6) + `../gout/palmares-writers.md`

## Leçon infra writers

Writer long (Kimi surtout) : MCP timeout ~250s → CLI `infra/mcp/call-llm.mjs` (Bash 600s). Jamais conclure « panne infra » (détail : `LESSONS.md` L-012).

## Agents

Conseiller (pitch/brainstorm) · `narration` Directeur (briefs/sélection/rewrite) · writers claude-libre/kimi-guide · lecteur + lecteur-dyade · gatekeeper · narration-pmo (FOND+FORME unifié).

## Comment reprendre après une interruption

1. Lire `MEMORY.md § Journal` (ci-dessous) — dernière session, qu'est-ce qui était en cours ?
2. Lire `DECISIONS.md` — quelles décisions sont figées ? Questions ouvertes ?
3. Lire `TODO.md` — quel ticket est prioritaire (max 3 actifs) ?
4. Lire `../INDEX.md` — état du projet narration complet
5. Reprendre le ticket en cours ou demander au Directeur de challenger le suivant

## Journal (3 dernières sessions — détail complet → `archive/sprint-log-2026-H2.md`)

- **2026-08-10** — INCIDENT + RECONSTRUCTION : une restauration externe du working tree (hors git) a reverté les phases cartographie 1-2-3 entre le 2026-07-28 soir et cette date ; ~40 commits d'autres pôles ont ensuite gravé le mélange. Reconstruction partielle depuis l'historique de chat (sprint-log, decisions, backlog, DOCTRINE, hook Kimi, purge settings, compteurs). Leçon L-INCIDENT-RESTAURATION : proposer le commit des traces PMO en fin de tour.
- **2026-07-28** — Phases 2+3 de la cartographie exécutées : dépollution de `stories/_gabarit` (24 fichiers obsolètes supprimés), `scripts/check-compteurs.js` créé (anti-dérive chiffres), convention archive gravée dans DOCTRINE, purge de 83 permissions mortes dans `.claude/settings.json`, parité hook Kimi étendue aux 5 rules narration.
- **2026-07-27** — Méga audit cartographique (6 zones) + phase 1 (~60 réparations mécaniques) : décisions canon gravées (DEC-SENSIBILITES-T6-T8, DEC-UNIVERS-NOM = WEX WORLD), signalétique réparée (panel 12 calls, compteurs réels), rotation semestrielle des logs PMO (D6).

> **Session 2026-09-03 (HO-NAR-01)** : convergence mémoire du pôle — `pmo/` → `memory/` (quintette), INBOX.md distillé et vidé, `equipe/lecons-vivantes.md` confirmé craft (pas touché), CLAUDE.md/README.md/INDEX.md/AGENTS.md à jour des nouveaux chemins. Voir rapport HO-NAR-01 pour le détail des pointeurs extérieurs restés cassés (hors mandat, → HO-G07).
