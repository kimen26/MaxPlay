# Kanban — STORY-001 Le Pont Cassé (Canonisé 2026-05-08)

> **Historique :** Ex-TEST-PROCESS-003 (003-le-pont-casse-v2 from-scratch) lancé 2026-05-02 pour valider PROCESS militaire 9 étapes. Migré vers **PROCESS 11 étapes (refonte 2026-05-08)** — étape 9 nouvelle ajoutée (re-relecture rewrite, panel 20 lecteurs), étape 10 = canon. Pour cette histoire, panel re-relecture = 6 lecteurs (transitoire — 20 s'appliquera aux futures). **Canonisé 2026-05-08**, numéro final = 001 (renumérotation série continue).
> Même sujet que 001 (pont cassé) mais fabrication entièrement from-scratch pour valider le nouveau workflow.
> **Validation Papa Yann obligatoire après étape 1 (pitch) ET étape 3 (briefs writers complets).**
> Source de vérité de l'étape en cours — lu en premier par tout agent qui reprend l'histoire.

---

## Légende

| Symbole | Signification |
|---|---|
| ⚪ | Pas commencé |
| 🟢 | En cours (équipe travaille) |
| ⏳ | En attente auteur (validation) |
| ✅ | Terminé (livrable produit + critères PASS validés) |
| ❌ | Refusé (retour itération) |
| 🔴 | BLOQUÉ (SLA dépassé ou problème) |

---

## Étapes

| # | Étape | Owner | Statut | Date | Lien livrable |
|---|---|---|---|---|---|
| 0 | Idée | Auteur | ✅ | 2026-05-02 | Briefs Papa Yann session 2026-05-02 |
| 1 | Pitch | Conseiller (`narration-conseiller`) | ✅ | 2026-05-02 | [`pitch.md`](pitch.md) — livré et validé Papa Yann (validation tacite par cadrage du brief minimal verbatim 2026-05-02) |
| 2 | Plan | Architecte (`narration-architecte`) | ✅ | 2026-05-02 | [`plan-histoire.md`](plan-histoire.md) — livré PASS auto-validé. Révisé 2026-05-03 en mode minimal (recadrage Papa Yann). |
| 3 | Briefs | Directeur (`narration`) | ✅ | 2026-05-04 | [`briefs/_writer-package.md`](briefs/_writer-package.md) (autoporteur, 8 runs) · [`briefs/brief-histoire.md`](briefs/brief-histoire.md) · [`briefs/brief-univers.md`](briefs/brief-univers.md) · [`briefs/brief-personnages.md`](briefs/brief-personnages.md) — **refonte Tour 2 (2026-05-04)** : trio Wex+Raph+Pierrot, variance natifs sans angles, règle promesse du titre |
| 4 | Versions writers | 8 Writers | ✅ | 2026-05-04 | [`versions-writers/`](versions-writers/) — 8 versions livrées (claude×2, kimi×2, deepseek×2, grok×2) |
| 5 | Lecteurs témoins | 6 Témoins (2 enfants seuls + 4 dyades) | ✅ | 2026-05-04 | [`lecteurs-temoins/`](lecteurs-temoins/) — 6 fiches livrées avec classements consolidés |
| 6 | Sélection | Directeur | ✅ | 2026-05-08 | [`selection.md`](selection.md) — base **kimi-run1** validée auteur 2026-05-08 |
| 7 | Rewrite | Auteur top 1 (Kimi K2) | ✅ | 2026-05-08 | [`rewrite/kimi-rewrite-v2.md`](rewrite/kimi-rewrite-v2.md) — comité éditorial : 2 intégrations sur 5 (« Clac. Clac. Clac. » additif + « comme un bracelet »), 3 écartées avec raisons argumentées. 540 mots. Archive : [`kimi-rewrite-v1.md`](rewrite/kimi-rewrite-v1.md) (minimaliste) + [`claude-rewrite-v1.md`](rewrite/claude-rewrite-v1.md) (régression). |
| 8 | GateKeeper | GateKeeper (`narration-gatekeeper`) | ✅ | 2026-05-08 | [`gatekeeper-verdict.md`](gatekeeper-verdict.md) — **PASS (24/24 critères)** |
| 9 | Re-relecture rewrite | 2 enfants + 4 dyades (panel 6 transitoire) | ✅ | 2026-05-08 | [`relecture-rewrite/`](relecture-rewrite/) — **6 × ✅** + 2 corrections légères appliquées (suppression « proprement » + simplification phrase plantation drapeau) |
| 10 | Canon | Directeur + PMO | ✅ | 2026-05-08 | [`texte.md`](texte.md) — **CANON** + [`synthese-finale.md`](synthese-finale.md) + [`README.md`](README.md) frontmatter complet |

---

## Validations auteur (3 obligatoires)

- [x] **Étape 1 — Pitch** validé (Papa Yann) : 2026-05-02 (validation tacite par cadrage brief minimal verbatim)
- [x] **Étape 3 — Briefs** validés (Papa Yann) : 2026-05-04 (GO post-refonte trio Wex+Raph+Pierrot)
- [x] **Étape 6 — Sélection** validée (Papa Yann) : 2026-05-08
- [x] **Étape 10 — Version finale** validée (Papa Yann) : 2026-05-08 (canon)

**SLA :** 3 jours par validation. Au-delà → 🔴 BLOQUÉ + log auto `pmo/sprint-log.md`.

---

## Boucles & itérations

> *Trace des retours en arrière (sélection v2, Architecte v2, etc.). Plafonds dans `equipe/PROCESS.md`.*

| Date | Étape | De → vers | Raison |
|---|---|---|---|
| | | | |

---

## Notes & blocages

**Test PROCESS** : étape 1 lancée 2026-05-02 en binôme Conseiller + Papa Yann. Challenge = valider que le PROCESS militaire neuf étapes produit une histoire de meilleure qualité que la refonte ponctuelle (001 V2 correction).

**Objet** : pond cassé (réutilisé de 001 V1). Les différences de casting/perso/lieu/structure Kishōtenketsu à découvrir en cours de fabrication — le pitch doit être challengé à chaque idée.

**2026-05-02 — Étape 3 livrée par Directeur.** Briefs initiaux trop directifs (7 garde-fous chorégraphiques + 4 angles imposés Sobre/Sensoriel/Dynamique/Instinct avec longueurs précises).

**2026-05-03 — Briefs réduits en mode cadre seulement après recadrage Papa Yann.** Suppression des garde-fous chorégraphiques (Wex <10 mots, Ten silencieux, planche au singulier, Ketsu en 3 options, etc.) et des angles imposés. Application règle F (`equipe/patte-papa-yann.md`) : mot « compagnon » viré, négations gratuites virées. Garde-fous délégués à la patte Papa Yann + GateKeeper étape 8. Plan d'histoire raccourci en parallèle à 10 lignes (autre agent).

**2026-05-03 (révision finale) — writer-package créé, briefs finalisés tutoiement writer, variance figée conformément decisions.md 2026-04-30 (4 base prompt identique + 2 Claude angularisés + 2 Kimi angularisés), saison printemps cadre par défaut arc 1, ennéatypes notés « 1 » et « 6 » dans note Directeur hors-texte.** Le `_writer-package.md` est autoporteur (patte Papa Yann inlinée intégralement) — copié tel quel dans le prompt MCP des writers Kimi/DeepSeek/Grok qui n'ont pas accès au filesystem.

**2026-05-03 (refonte v3) — relecture Papa Yann sur le writer-package : trop de fantômes (exemples 001 Ferretti, 002 ballon, métaphores ratées 003), trop de négations gratuites, mention passé simple et tirets cadratins, fiche Wex bridée ("silencieux / ne résout pas").** Refonte intégrale en règles digérées et positives. Wex repositionné en "héros observateur, joyeux, moteur, légèrement tête en l'air, sans ennéatype, souvent déclencheur" (verbatim Papa Yann). Vocabulaire dur : liste explicite d'interdits 4-8 ans (mort/crever/clochard/pédocriminel/pistolet/pute/enculer + famille), tout le reste passe s'il sert. Ajout cible 30% dialogues (TTS multi-voix). Patte Papa Yann mise à jour en parallèle (critères 6/7/13/14/15 reformulés, critère 15 marqué "interne, ne s'applique pas au writer"). 11 règles d'écriture (vs 15 critères dans la v2).

**Étape 4 ne démarre QUE sur GO explicite Papa Yann** sur les briefs finalisés (validation finale légère sur les 30 premières lignes du `_writer-package.md`).

**2026-05-04 — Tour 1 supprimé, Tour 2 lancé.** Décisions Papa Yann (cf. `pmo/decisions.md` 2026-05-04) :
- Trio refondu : Melki (T1) → **Raph (T7, fille)**. Raison : deux calmes (T1+T6) ne créaient pas assez de friction lisible en arc 1. Avec un T7 dynamique + T6 vigilant + Wex hors-système, plus de relief.
- Variance writers : angles imposés (Sobre/Sensoriel/Dynamique/Instinct) **abandonnés** — n'ont rien apporté Tour 1. Nouveau schéma : **8 runs natifs** = 4 LLM × 2 runs avec températures légèrement différentes. Brief strictement identique pour les 8.
- Lecteurs étendus à 6 : 2 enfants seuls (1 garçon + 1 fille) + 4 dyades (papa+garçon, papa+fille, maman+garçon, maman+fille). Objectif secondaire : observer si la narration colle mieux voix féminine ou masculine pour TTS futur.
- Patte enrichie : règle « **promesse du titre** » ajoutée sous pilier B. Le Ten transforme, le Ketsu résout — il n'élude jamais.
- Brief personnages enrichi avec exemples concrets de réaction par perso (situation-type non-pont, illustration du moteur sans le nommer).
- Sons-bouche, comparaisons domestiques, ouvertures courtes, corps qui participe → patterns gardés en **mémoire Conseiller** (sélection), **pas dans le brief writer** (risque fabrication).

---

## Reprise après reboot

Procédure :
1. Lire ce fichier (statut étape en cours)
2. Lire [`README.md`](README.md) (état global histoire)
3. Lire le dernier livrable produit (selon étape ci-dessus)
4. Lire `pmo/decisions.md` (règles tranchées récentes)
5. Reprendre selon ce qui manque
