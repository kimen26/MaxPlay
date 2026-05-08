# Backlog PMO Narration

> **Règle :** 3 tickets actifs maximum. Pas plus.
> **Format :** `STATUT | ID | Titre | Priorité | Assigné | Prochaine action`
>
> Statuts : 🟡 En cours · ⚪ À faire · 🔴 Bloqué · ✅ Terminé

---

## En cours

| Statut | ID | Titre | Priorité | Assigné | Prochaine action |
|--------|-----|-------|----------|---------|------------------|
| 🟡 | ARCHI-006 | Formaliser procédure PMO dans `narration-pmo.md` (agent Haiku) | Normale | narration-pmo | Créer doc agent reflet des décisions 2026-05-08 : classification input (6 catégories), routing, checklist remise main. Cible : PMO auto-guidé sans attendre instructions. |
| 🟡 | STORY-005 | Brainstorm prochaine histoire (sujet + casting + brief Papa Yann) | **Haute** | Auteur + Conseiller | Papa Yann lance sujet + casting à partir des axes-en-stock. Conseiller et Directeur produisent brief Papa Yann. Étape 1 (pitch) prête à lancer. Session suivante. |

---

## À faire

| Statut | ID | Titre | Priorité | Assigné | Prochaine action |
|--------|-----|-------|----------|---------|------------------|
| ⚪ | ARCHI-006 | Formaliser procédure PMO dans `.claude/agents/narration-pmo.md` | Normale | narration-pmo (Haiku) | Créer doc agent reflet des décisions 2026-05-08 : classification input (6 catégories), routing, checklist remise main. Cible : PMO auto-guidé sans attendre instructions. |
| ⚪ | UNIVERS-001 | Trancher nom de l'univers | Normale | Auteur | Choisir parmi 21 candidats + pistes "Wex World" / "Wex Bou" (`univers/meta/nom-candidats.md`) |
| ⚪ | STORY-004 | Cartable-à-trou — Polo · Lulu · Mimi · Wex | Pause arc 2 | — | pitch validé — **arc 2 Parole en pause depuis 2026-04-30** (`stories/004-cartable-a-trou/pitch.md`) |
| ⚪ | STORY-005 | Le Mardi — Wex · Pierrot · Melki · graine | Pause arc 2 | — | pitch validé — **arc 2 Parole en pause** (`stories/005-le-mardi/pitch.md`) |
| ⚪ | STORY-006 | Sept à rien — Juju · Mimi · Wex · blocs | Pause arc 2 | — | pitch validé — **arc 2 Parole en pause** (`stories/006-sept-a-rien/pitch.md`) |
| ⚪ | UNIVERS-002 | Définir `univers/societe.md` (Vocation · Pouvoir Intérieur · Mission du jour) | Normale | Auteur · Conseiller | À définir ensemble — concept "contribution joyeuse" remonté du Grok aetheria, demande explicite auteur, absent de l'univers actuel |
| ⚪ | UNIVERS-003 | Borner invariant vs variant dans l'expression ennéatype par culture | Normale | Auteur · Conseiller | À définir : où s'arrête le « même Type N partout » et où commence la variance culturelle légitime ? Documenter règles d'écriture par ennéatype × culture (futur `enneagramme/expression-cross-culture.md`). Voir `univers/meta/architecture-cross-culture.md` section dédiée. |
| ⚪ | NARR-001 | Discussion D4 — Cross-culture micro-structures | **Haute** | Auteur · Conseiller | À creuser ensemble : règles micro-structurelles culturelles (call-and-response africain, cycles amérindiens, etc.) à autoriser dans les bulles culturelles, sans tomber dans le cliché. À cadrer avant ouverture du 2e casting national. |
| ✅ | NARR-002 | Définir le brief writer | Normale | Directeur | **Résolu 2026-04-30** : 3 templates produits (`equipe/templates/brief-{univers,personnages,histoire}.template.md`) avec sections obligatoires + règles héritées de `pmo/decisions.md`. Ratio dialogue à noter dans le synthese.md de chaque story pour info, pas seuil dur. |
| ⚪ | NARR-003 | Définir les sensibilités différenciées de chaque perso (Wex + 9) | Normale | Auteur · Conseiller | 9 sensibilités déjà figées (cf. décision 2026-04-28). Reste : **détailler ce que perçoit chacun précisément** (ce que c'est, ce que ce n'est pas, ce qui les active, ce qu'ils en font). Surtout **Wex — à définir** (piste : écoute des fausses notes / soin-bioélectrique). Idéalement en préparation de S2. |
| ⚪ | NARR-004 | Définir S3 (saison 3 vide) | Basse | Auteur · Conseiller | Saison 3 actuellement vide dans la roadmap. À pitcher quand la S1 sera plus avancée et que la S2 sera cadrée. |

---

## Terminés

| Statut | ID | Titre | Date |
|--------|-----|-------|------|
| ✅ | TEST-PROCESS-001 | 001 V2 chemin CORRECTION (test parallèle abandonné) | 2026-05-08 |
| ✅ | TEST-PROCESS-003 | 003-le-pont-casse-v2 — PROCESS 11 étapes complet (canonisé 001) | 2026-05-08 |
| ✅ | STORY-002-V2 | Le Rire qui reste — V2 (en pause arc 2, diffère à S2) | 2026-05-08 |
| ✅ | STORY-002 | Le Rire qui reste — canon (489 mots · GateKeeper PASS) | 2026-04-28 |
| ✅ | ARCHI-004 | Refonte équipe writers — 5 writers + briefs stateless + agents | 2026-04-28 |
| ✅ | ARCHI-005 | Refonte workflow narratif — 4 writers + lecteurs témoins + GateKeeper + Conseiller/Architecte | 2026-04-28 |
| ✅ | STORY-001-V1 | Le Pont Cassé — V1 + comité de lecture | 2026-04-24 |
| ✅ | ARCHI-001 | Restructuration narration (stories/, pmo/, équipe) | 2026-04-27 |
| ✅ | ARCHI-002 | Suppression histoires/ legacy + migration axes-en-stock | 2026-04-27 |
| ✅ | ARCHI-003 | Nettoyage docs/ (dead code, refs orphelines) | 2026-04-27 |
| ✅ | INPUT-001 | Distillation INBOX 2026-04-27 → univers/ (transport, sensibilités, école, géographie) | 2026-04-28 |
| ✅ | INPUT-002 | Symbolique ésotérique → enneagramme/symbolique.md (pierre, astre, couleur) | 2026-04-28 |
| ✅ | INPUT-003 | Voix ElevenLabs → equipe/voix/ (10 fichiers, 4 couches × 9 types + Wex) | 2026-04-28 |
| ✅ | PERSO-001 | Restructuration personnages multi-pays (type-NN/, wex/, lookup.yml, identite.md) | 2026-04-28 |

---

## Comment créer un ticket

1. Identifier la source : axe stock, dump INBOX.md, décision à prendre
2. Vérifier qu'il y a < 3 tickets actifs — sinon attendre
3. Ajouter une ligne dans "À faire" avec un ID unique (`STORY-NNN`, `PERSO-NNN`, `UNIVERS-NNN`, `ARCHI-NNN`)
4. Quand démarré : déplacer dans "En cours" + mettre à jour `sprint-log.md`
5. Quand terminé : déplacer dans "Terminés" avec date
