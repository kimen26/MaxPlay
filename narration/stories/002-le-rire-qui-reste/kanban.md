# Kanban — STORY-002 Le Rire qui reste

> **Source de vérité de l'étape en cours.** Statut canon depuis 2026-04-28.
> Reconstitué rétroactivement le 2026-04-30 lors de la migration workshop→stories.

---

## Légende

| Symbole | Signification |
|---|---|
| ⚪ | Pas commencé |
| 🟢 | En cours |
| ⏳ | En attente auteur |
| ✅ | Terminé |
| ❌ | Refusé |
| 🔴 | BLOQUÉ |

---

## Étapes

| # | Étape | Owner | Statut | Date | Lien livrable |
|---|---|---|---|---|---|
| 0 | Idée | Auteur | ✅ | < 2026-04-28 | INBOX (archivée) |
| 1 | Pitch | Conseiller | ✅ | 2026-04-28 | Brief de série Parole (archive) |
| 2 | Plan | Architecte | ✅ | 2026-04-28 | (intégré dans `briefs/brief-histoire.md`) |
| 3 | Briefs | Directeur | ✅ | 2026-04-28 | [`briefs/`](briefs/) |
| 4 | Versions writers | 4 Writers (schéma pré-militarisation) | ✅ | 2026-04-28 | [`versions-writers/`](versions-writers/) — 4 base + 1 variance Claude Ancré |
| 5 | Lecteurs témoins | — | ⚠ NON DOCUMENTÉ | — | (pas de fichiers `lecteurs-temoins/` retrouvés à la migration) |
| 6 | Sélection | Directeur | ✅ | 2026-04-28 | [`synthese.md`](synthese.md) (anciennement `decision.md`) |
| 7 | Rewrite | Directeur | ✅ | 2026-04-28 | [`_archive/version-finale-pre-canon.md`](\_archive/version-finale-pre-canon.md) |
| 8 | GateKeeper | GateKeeper | ✅ PASS | 2026-04-28 | [`gatekeeper-verdict.md`](gatekeeper-verdict.md) |
| 9 | Canon | Directeur + PMO | ⚠ canon contesté | 2026-04-28 | [`texte.md`](texte.md) — 489 mots — **V2 nécessaire post-relecture Papa Yann 2026-04-30** |

---

## ⚠ Canon contesté — V2 nécessaire (décision Papa Yann 2026-04-30)

> **Relecture critique :** [`lecteurs-temoins/papa-yann-relecture-2026-04-30.md`](lecteurs-temoins/papa-yann-relecture-2026-04-30.md)
> **Verdict :** *"On mettra surement cette histoire 002 ailleurs dans l'autre arc narratif de la parole."*
> **Décision :** **on peut se refaire l'histoire 002 avec le nouveau process**.

### Problèmes à corriger en V2
- 🔴 **Casting Nono+Polo** = confusion phonétique → un des deux doit changer (celui qui tombe reste **garçon**)
- 🔴 **Incohérence physique** : ballon "chaud du bois du banc" alors que sur les genoux
- 🔴 **Pronoms ambigus** ("Il l'a lancé vers Polo" — qui ?)
- 🔴 **Expression inventée** : "jouer avec une dent en moins" → expression courante ou image claire
- 🔴 **Style trop saccadé** pour lecture orale parent
- 🔴 **Tirets cadratins** ambigus
- 🔴 **Détails sensoriels concentrés en bloc** → à distribuer
- 🟡 **Narration jugeante** ("trop fort" → "très fort")
- 🟡 **"Le terrain"** ambigu (sport ou sol ?)
- 🟡 **"L'herbe collait"** pas physiquement logique

### Question style chute
La chute "inachevée douce" passe pour 002 mais Papa Yann demande à confirmer si c'est le style à reproduire ou s'il y a rotation entre fin qui referme (001) et fin inachevée douce.

---

## Validations auteur

- [x] **Étape 1 — Pitch** validé : 2026-04-28 (au sein du brief de série Parole)
- [x] **Étape 6 — Sélection** validée : 2026-04-28 (synthèse)
- [x] **Étape 9 — Version finale** validée : 2026-04-28

---

## Notes & migration

- **Statut au 2026-04-30 :** ✅ CANON depuis le 2026-04-28
- **Migration workshop→stories** effectuée le 2026-04-30 :
  - `workshop/002/version-{claude-libre, deepseek, grok, kimi}.md` → `versions-writers/*-base.md` (deepseek, grok, kimi) + `claude-libre.md`
  - `workshop/002/_archive/version-claude-ancre.md` → `versions-writers/claude-variance-ancre.md`
  - `workshop/002/_archive/{brief-histoire, brief-personnages, brief-univers}.md` → `briefs/*.md`
  - `workshop/002/_archive/{relecture, synthese}.md` → racine
  - `workshop/002/_archive/version-finale.md` → `_archive/version-finale-pre-canon.md`
- **Trous identifiés :** pas de fichiers `lecteurs-temoins/` retrouvés (étape 5 documentée seulement dans le sprint-log, pas dans le dossier histoire). À ne pas reproduire pour les futures histoires.
- **Schéma writers utilisé (pré-militarisation 2026-04-30) :** 4 base (Claude libre, DeepSeek, Grok, Kimi) + 1 variance Claude Ancré. Schéma actuel = 8 versions (4 base + 2 Claude variance + 2 Kimi variance).

---

## Reprise après reboot

L'histoire est canon. Aucune action de reprise nécessaire.
Pour V2 future : copier `texte.md` → `_archive/v1-2026-04-28.md` (déjà fait), créer nouveau `texte.md`.
