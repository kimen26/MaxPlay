# PROCESS éditorial MaxPlay

> **Référence opérationnelle.** Source de vérité du workflow, des owners, des inputs/outputs, des critères PASS et des points de reprise.
> **Pour la cartographie des fichiers et règles de domaine, voir [`cartographie-domaines.md`](cartographie-domaines.md).**
> **Pour l'organigramme et les agents, voir [`ORGANIGRAMME.md`](ORGANIGRAMME.md).**
> **Pour l'index complet de l'équipe, voir [`INDEX.md`](INDEX.md).**
>
> Dernière mise à jour : 2026-05-08 (refonte 11 étapes — ajout étape 9 re-relecture rewrite, panel 20 lecteurs, onomatopées cross-culture, lecons-vivantes)

---

## Principes invariants

1. **Auteur a le dernier mot** — sur le pitch (étape 1), sur la sélection (étape 6), sur la version finale (étape 10). Trois points de validation, pas plus.
2. **1 rewrite max** — si le rewrite ne convient pas, retour à la sélection avec une autre version comme base.
3. **GateKeeper ne change pas l'histoire** — il vérifie le respect des règles, point.
4. **Rien n'est effacé** — versions abandonnées → `_archive/`. Histoire abandonnée → `_archive/` racine. Aucun overwrite.
5. **1 dossier = 1 histoire** — `stories/<NNN-slug>/` contient TOUT (briefs, versions, lecteurs, sélection, rewrite, gatekeeper, re-relecture, canon, variantes, archives). Pas de fragmentation `workshop/`.
6. **Le `kanban.md` est la source de vérité** — pour reprendre une histoire après reboot, on lit son kanban.
7. **Agent manquant = STOP + alerte auteur** (règle absolue 2026-05-02) — l'orchestrateur ne se substitue JAMAIS à un agent défini qui n'est pas chargé en session courante. Voir `pmo/decisions.md` (2026-05-02 RÈGLE ABSOLUE).
8. **Le writer du top 1 garde la main au rewrite** (règle 2026-05-08) — quand une version est élue #1 par les lecteurs, c'est son auteur (Kimi, Claude, etc.) qui retouche son propre texte avec sa propre note d'intention. Pas de greffes injectées par d'autres LLM. Les patterns lecteurs alimentent `lecons-vivantes.md` pour les **futures** histoires.
9. **Onomatopées normées** (règle 2026-05-08) — 0 ou 1 par histoire, choisie dans [`onomatopees-cross-culture.md`](onomatopees-cross-culture.md). Test à voix haute obligatoire.

---

## Vue d'ensemble — 11 étapes

```
0.  Idée            (Auteur)                    → INBOX.md section datée
1.  Pitch           (Conseiller)                ✅ valide auteur
2.  Plan            (Architecte)
3.  Briefs          (Directeur)
4.  Versions        (10 Writers parallèles)
5.  Lecteurs        (Panel cible : 20 lecteurs)
6.  Sélection       (Directeur)                 ✅ valide auteur
7.  Rewrite         (Writer du top 1 si possible — sinon Directeur, 1 cycle max)
8.  GateKeeper      (Haiku)
9.  Re-relecture    (3-4 lecteurs ciblés sur le rewrite + 1 contrôle)
10. Canon           (Directeur + PMO)           ✅ valide auteur
```

**SLA :** 3 jours max sur chaque attente auteur (étapes 1/6/10). Au-delà → `kanban.md` passe en 🔴 BLOQUÉ + log auto dans `pmo/sprint-log.md`.

---

## Étape 0 — Idée

| Champ | Valeur |
|---|---|
| **Owner** | Auteur (Papa Yann) |
| **Inputs** | — |
| **Outputs** | Section datée dans `narration/INBOX.md` (`## YYYY-MM-DD — sujet en 5 mots`) |
| **Critères PASS** | Une idée brute écrite (1 phrase suffit) — pas besoin de format |
| **Condition de passage** | Auteur déclenche l'étape 1 explicitement (sinon l'idée reste dormante en INBOX) |
| **Point de reprise** | Aucun à reprendre — c'est le point d'entrée |
| **Modalité v2/v3** | — |

---

## Étape 1 — Pitch

| Champ | Valeur |
|---|---|
| **Owner** | Conseiller (`narration-conseiller`, Opus) |
| **Inputs** | `INBOX.md` section, `equipe/memoire-conseiller.md`, `personnages/INDEX.md`, `univers/INDEX.md`, `pmo/decisions.md`, `stories/INDEX.md` |
| **Outputs** | `stories/<NNN-slug>/pitch.md` (format MOYEN 4 cases : objet titre · duo+Wex · lieu · moment d'ouverture optionnel) + `stories/<NNN-slug>/kanban.md` (étape 1 ✅) + `stories/<NNN-slug>/README.md` (carte vivante initiale) |
| **Critères PASS** | <ul><li>Objet titre clair (le centre de gravité de l'histoire)</li><li>Duo (2-3 persos du casting V1) + Wex présent</li><li>Lieu déjà connu de `univers/`</li><li>Moment d'ouverture optionnel (1 phrase) si l'objet est faible</li><li>Aucun élément interdit (parents en scène, morale dite, ennéatype nommé, univers nommé)</li></ul> |
| **Condition de passage** | ✅ **Auteur valide pitch** explicitement |
| **Point de reprise** | Si reboot pendant l'étape : relire `pitch.md` (s'il existe en draft) + `kanban.md` |
| **Modalité v2/v3** | Ajustement libre du pitch tant que l'auteur n'a pas validé. Versions intermédiaires → `_archive/pitch-vN-YYYY-MM-DD.md` |

**SLA auteur :** 3 jours. Au-delà : kanban 🔴 BLOQUÉ.

---

## Étape 2 — Plan d'Histoire

| Champ | Valeur |
|---|---|
| **Owner** | Architecte (`narration-architecte`, Sonnet) |
| **Inputs** | `pitch.md`, `equipe/memoire-architecte.md`, `equipe/patte-narrative-maxplay.md`, `personnages/INDEX.md` (+ fiches type-NN concernées), `univers/INDEX.md` (+ fiche du lieu), `arcs/<arc-slug>/fiche.md` (qualité humaine + problématique au niveau arc), `pmo/decisions.md` |
| **Outputs** | `stories/<NNN-slug>/plan-histoire.md` rempli depuis `equipe/templates/plan-histoire.template.md` + `kanban.md` étape 2 ✅ |
| **Critères PASS** | <ul><li>Structure Kishōtenketsu complète (Ki / Sho / Ten / Ketsu)</li><li>Voix tranche de vie + cadre cyclique de l'arc explicités</li><li>Personnages : surnoms 4/5, ennéatypes dilués (jamais étiquetés)</li><li>Contraintes longueur 400-700 mots, dialogues ≥ 2 répliques par perso, ≥ 1 échange 3+ répliques</li><li>Pas d'antagoniste · pas de morale dite · pas de parents en scène · compagnons = ondes/couleurs si présents · sensibilité différenciée (pas hiérarchie de savoir)</li><li>Cohérence avec carte narrative (Conseiller valide implicitement la cohérence en lisant)</li></ul> |
| **Condition de passage** | Plan PASS auto-validé par l'Architecte (l'auteur peut lire et faire un commentaire informel — pas de validation formelle) |
| **Point de reprise** | Si reboot : relire `plan-histoire.md` + `pitch.md` + `kanban.md` |
| **Modalité v2/v3** | Si Conseiller signale une incohérence narrative → Architecte produit un `plan-histoire.v2.md` (ancien → `_archive/`). Plafond : 2 itérations sinon escalade auteur. |

---

## Étape 3 — Briefs writers

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (`narration`, Opus) |
| **Inputs** | `plan-histoire.md`, `equipe/templates/brief-univers.template.md`, `equipe/templates/brief-personnages.template.md`, `equipe/templates/brief-histoire.template.md`, `pmo/decisions.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/briefs/brief-univers.md`</li><li>`stories/<NNN-slug>/briefs/brief-personnages.md`</li><li>`stories/<NNN-slug>/briefs/brief-histoire.md`</li><li>`kanban.md` étape 3 ✅</li></ul> |
| **Critères PASS** | <ul><li>3 briefs présents et remplis depuis les templates</li><li>Chaque brief contient en tête `RÈGLES OBLIGATOIRES` (héritées de `pmo/decisions.md`) + `RÈGLES SPÉCIFIQUES` (à cette histoire)</li><li>Brief-histoire inclut : pitch, plan Ki/Sho/Ten/Ketsu, contraintes longueur/dialogues, motifs visés, garde-fous, **angle/levier de variance pour les writers Claude+Kimi (4 versions sur 8)**</li></ul> |
| **Condition de passage** | Auto-validé Directeur (pas de validation auteur) |
| **Point de reprise** | Si reboot : relire le dossier `briefs/` + `plan-histoire.md` |
| **Modalité v2/v3** | Briefs ajustables jusqu'au lancement étape 4. Après lancement → figés. |

---

## Étape 4 — Versions writers (10 versions parallèles)

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (orchestrateur) — Writers exécutent |
| **Inputs** | Les 3 briefs (univers + personnages + histoire), le plan-histoire.md, le brief writer libre OU guidé selon le rôle ([`templates/brief-writer-libre.template.md`](templates/brief-writer-libre.template.md), [`templates/brief-writer-guide.template.md`](templates/brief-writer-guide.template.md)), la [cheatsheet didascalies vocales](voix/_CHEATSHEET-WRITERS.md) |
| **Outputs** | <ul><li>9 versions LIBRES : `versions-writers/claude-1.md`, `claude-2.md`, `kimi-1.md`, `kimi-2.md`, `kimi-3.md`, `deepseek-1.md`, `deepseek-2.md`, `grok-1.md`, `grok-2.md`</li><li>1 version GUIDÉE : `versions-writers/kimi-guide.md` (annexe AXES 1-6)</li><li>Notes d'intention en fin de chaque fichier (frontmatter + section finale)</li><li>`kanban.md` étape 4 ✅</li></ul> |
| **Casting writers (révision après 3-5 histoires de plus)** | <table><tr><th>Bloc</th><th>N</th><th>LLM / Modèle</th><th>Brief</th></tr><tr><td>Claude</td><td>2</td><td>`claude-opus-4-7` (agent narration-writer-claude-libre)</td><td>libre</td></tr><tr><td>Kimi libre</td><td>3</td><td>`kimi-k2.6` non-thinking (MCP `ask_kimi`)</td><td>libre</td></tr><tr><td>Kimi guidé</td><td>1</td><td>`kimi-k2.6` non-thinking (agent narration-writer-kimi-guide)</td><td>**guidé** (annexe AXES 1-6)</td></tr><tr><td>DeepSeek</td><td>2</td><td>`deepseek-v4-pro` non-thinking (MCP `ask_deepseek`)</td><td>libre</td></tr><tr><td>Grok</td><td>2</td><td>`grok-4.3` `reasoning_effort: low` (MCP `ask_grok`)</td><td>libre</td></tr></table> Détails LLM : [`infra/mcp/MODELS.md`](../../infra/mcp/MODELS.md). |
| **Différence libre vs guidé** | <ul><li>**LIBRE (9 writers)** : reçoit briefs + 5 garde-fous de FORME (ouverture courte, geste avant parole, fin image, longueur, promesse du titre). **Aucune indication de contenu** (pas de "mets une créature", pas d'onomatopée imposée). Variance native préservée.</li><li>**GUIDÉ (1 writer)** : reçoit briefs + brief libre + **annexe AXES 1-6** issue des 100+ relectures. Active 2-3 axes librement, jamais 4+. Doit produire une version qui exploite les leçons sans les copier.</li></ul> |
| **Leviers de variance disponibles (libres)** | Température réelle via param MCP, POV, ouverture, longueur cible. Le Directeur peut imposer un levier par writer dans `brief-histoire.md`. |
| **Checklist auto-cohérence (tous writers)** | Chaque writer fait **une passe factuelle de 30 secondes** avant remise (prénoms casting, cohérence lieux/objets, surnoms 4/5). Pas de réécriture créative — corrige uniquement les bugs. Une 2e passe créative dilue la voix one-shot. |
| **Critères PASS** | <ul><li>10 versions présentes (sauf écart documenté)</li><li>Chaque version : 400-700 mots</li><li>Chaque version : note d'intention en fin</li><li>Aucun writer n'a lu les autres (stateless)</li></ul> |
| **Condition de passage** | Directeur lance étape 5 dès que les 10 versions sont produites |
| **Point de reprise** | Si reboot : compter fichiers présents dans `versions-writers/`. Relancer les writers manquants. |
| **Modalité v2/v3** | Aucune itération en étape 4. Si une version est défectueuse (vide, hors-format) → `_archive/` + relance du writer. |

---

## Étape 5 — Lecteurs témoins (panel 20)

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (orchestrateur) — Lecteurs exécutent (agents `narration-lecteur` + `narration-lecteur-dyade`, Sonnet) |
| **Inputs** | Les 10 versions writers + `equipe/profils-lecteurs.md` |
| **Panel cible — 20 lecteurs** | **10 profils × 2 tranches d'âge.** Tranche A 3-5 ans = priorité (cible Max). Tranche B 6-7 ans = info complémentaire (anticipation + détection histoires qui décrochent à 6-7 ans). |
| **Détail panel** | <table><tr><th>#</th><th>Profil</th><th>Tranche A 3-5 ans</th><th>Tranche B 6-7 ans</th></tr><tr><td>1-2</td><td>Garçon normal</td><td>G-A1</td><td>G-B1</td></tr><tr><td>3-4</td><td>Garçon intro/observateur</td><td>G-A2</td><td>G-B2</td></tr><tr><td>5-6</td><td>Garçon extra</td><td>G-A3</td><td>G-B3</td></tr><tr><td>7-8</td><td>Fille normale</td><td>F-A1</td><td>F-B1</td></tr><tr><td>9-10</td><td>Fille intro/observatrice</td><td>F-A2</td><td>F-B2</td></tr><tr><td>11-12</td><td>Fille extra</td><td>F-A3</td><td>F-B3</td></tr><tr><td>13-14</td><td>Dyade papa-Garçon</td><td>DPG-A</td><td>DPG-B</td></tr><tr><td>15-16</td><td>Dyade papa-Fille</td><td>DPF-A</td><td>DPF-B</td></tr><tr><td>17-18</td><td>Dyade maman-Garçon</td><td>DMG-A</td><td>DMG-B</td></tr><tr><td>19-20</td><td>Dyade maman-Fille</td><td>DMF-A</td><td>DMF-B</td></tr></table> |
| **Outputs** | <ul><li>`lecteurs-temoins/<profil>-<tranche>.md` × 20</li><li>`synthese-lecteurs.md` à la racine du dossier histoire (consolidation Directeur : classement + patterns + citations clés). Sert d'input à l'étape 6 ET alimente `equipe/lecons-vivantes.md` post-canonisation.</li><li>`kanban.md` étape 5 ✅</li></ul> |
| **Format fiche** | Texte libre obligatoire (pas de grille, pas de note sur 10). « J'ai aimé… / J'ai pas compris… / Je retiens… » + classement personnel des 10 versions. Pas de jargon technique (pas de "Kishōtenketsu", "ennéatype"). |
| **Critères PASS** | <ul><li>20 fichiers présents (sauf écart documenté)</li><li>Chaque fichier : retour personnel sur les 10 versions</li><li>`synthese-lecteurs.md` produit avec classement consolidé + patterns observés</li><li>Pondération : tranche A pèse plus dans la sélection (cible Max), tranche B en signal complémentaire</li></ul> |
| **Condition de passage** | Directeur déclenche étape 6 dès que `synthese-lecteurs.md` existe |
| **Point de reprise** | Si reboot : compter fichiers présents dans `lecteurs-temoins/` + vérifier existence `synthese-lecteurs.md`. Relancer ce qui manque. |
| **Modalité v2/v3** | Aucune itération |
| **Note transitoire** | Pour les histoires antérieures à 2026-05-08 (001/002/003/004), le panel à 6 lecteurs (2 enfants + 4 dyades) reste valide pour ne pas re-faire les histoires. Panel 20 applicable à partir de 005. |

---

## Étape 6 — Sélection

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (`narration`, Opus) |
| **Inputs** | Les 10 versions + 6 retours lecteurs + `equipe/memoire-dir.md` + `equipe/patte-narrative-maxplay.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/selection.md` (rempli depuis `equipe/templates/selection.template.md`)</li><li>`kanban.md` étape 6 ✅ + statut "EN ATTENTE AUTEUR"</li></ul> |
| **Format `selection.md`** | <ul><li>**Version base choisie** (laquelle des 8 + pourquoi)</li><li>**Éléments à récupérer** d'autres versions (citations précises)</li><li>**Réactions lecteurs** à prendre en compte (citations + interprétation)</li><li>**Brief de rewrite** : ce qui doit changer, ce qui doit rester intact</li><li>**Tiebreak rule** : si 2 versions sont à égalité, le Directeur choisit celle qui colle le plus à la patte (B+D+C) — pas celle qui plaît le plus au lecteur enfant si elle dérive du Kishōtenketsu</li></ul> |
| **Critères PASS** | <ul><li>`selection.md` rempli toutes sections</li><li>Choix justifié contre la patte narrative et les retours lecteurs</li><li>Brief rewrite actionnable (pas de "améliore globalement")</li></ul> |
| **Condition de passage** | ✅ **Auteur valide la sélection** (peut accepter, ajuster, ou demander un changement de version base) |
| **Point de reprise** | Si reboot : relire `selection.md` + statut kanban |
| **Modalité v2/v3** | Auteur peut demander une nouvelle sélection → Directeur produit `selection.v2.md` (ancien → `_archive/`). Plafond : 2 itérations puis escalade Conseiller. |

**SLA auteur :** 3 jours. Au-delà : kanban 🔴 BLOQUÉ.

---

## Étape 7 — Rewrite

> **Nature de l'étape (refondue 2026-05-08)** : Le rewrite est une **relecture finale par l'auteur du top 1**, pas une consolidation par injection de greffes externes. Logique : la version élue #1 par les lecteurs a gagné **sans avoir vu les autres**. Lui injecter ce qu'on a appris des autres = casser ce qui a fait son succès. L'auteur du top 1 (Kimi, Claude, etc.) **se relit avec sa propre note d'intention**, peaufine SI il sent qu'il y a lieu, sinon laisse tel quel.

> **Les patterns lecteurs ne sont pas perdus** : ils alimentent [`equipe/lecons-vivantes.md`](lecons-vivantes.md) pour les **futures** histoires (Conseiller / Architecte / writers de 005+).

| Champ | Valeur |
|---|---|
| **Owner par défaut** | Writer du top 1 (auteur de la version sélectionnée). Si LLM externe (Kimi/DeepSeek/Grok) → orchestré par le Directeur via MCP. Si Claude → agent `narration-writer-claude-libre`. |
| **Owner de repli** | Si le writer du top 1 dilue trop / sur-réécrit → Directeur (`narration`, Opus) reprend la main avec un rewrite Claude maîtrisé. Si rien ne tient → on canonise la base brute. |
| **Inputs** | `selection.md` + texte de la version base (`versions-writers/<top1>.md`) + sa propre note d'intention. **PAS** : autres versions writers, synthèse lecteurs, retours bruts. (Évite la pollution / cherry-picking.) |
| **Outputs** | <ul><li>`stories/<NNN-slug>/rewrite/<llm>-rewrite-v1.md` (ex: `kimi-rewrite-v1.md`, `claude-rewrite-v1.md`)</li><li>Note de relecture en fin de fichier (3-5 phrases : combien de modifs, pourquoi, zones non touchées)</li><li>`kanban.md` étape 7 ✅</li></ul> |
| **Règles dures stylistiques** | <ul><li>**Conserver le temps verbal** de la base (pas de bascule présent↔imparfait par contamination)</li><li>**Conserver l'ouverture** (premières phrases) si elle est sensorielle ou structurante</li><li>**Conserver la spine** : un lecteur de la base reconnaît le texte</li><li>Cible : longueur base ±10% (pas plus de 50 mots ajoutés)</li></ul> |
| **Critères PASS** | <ul><li>Spine identifiable</li><li>Pas de greffes injectées depuis d'autres versions writers (sauf cas exceptionnel documenté)</li><li>Longueur 400-700 mots</li><li>Patte respectée (B+D+C, pas de dérive A/F)</li><li>Garde-fous narratifs (parents hors-scène, pas de morale, ennéatype dilué, etc.)</li><li>Onomatopées : 0 ou 1, choisie dans [`onomatopees-cross-culture.md`](onomatopees-cross-culture.md)</li></ul> |
| **Condition de passage** | Directeur déclenche étape 8 dès que `v1.md` existe |
| **Point de reprise** | Si reboot : relire `rewrite/v1.md` (s'il existe) + `selection.md` + kanban |
| **Modalité v2/v3** | **1 cycle max.** Si v1 ne convient pas après GateKeeper ou auteur → retour étape 6 (nouvelle sélection avec autre version base). Pas de v2 de rewrite. |

---

## Étape 8 — GateKeeper

| Champ | Valeur |
|---|---|
| **Owner** | GateKeeper (`narration-gatekeeper`, Haiku) |
| **Inputs** | Le rewrite (`rewrite/<llm>-rewrite-v1.md`) + `personnages/lookup.yml` + `pmo/decisions.md` + `equipe/memoire-gatekeeper.md` + `equipe/onomatopees-cross-culture.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/gatekeeper-verdict.md`</li><li>`kanban.md` étape 8 ✅ ou ❌</li><li>Mise à jour `equipe/memoire-gatekeeper.md` (erreurs récurrentes détectées)</li></ul> |
| **Checklist PASS (toutes binaires)** | <ul><li>☐ Prénoms/surnoms vs `lookup.yml`</li><li>☐ Genres/pronoms cohérents</li><li>☐ Longueur 400-700 mots</li><li>☐ Chaque perso ≥ 2 répliques</li><li>☐ ≥ 1 échange de 3+ répliques</li><li>☐ Pas de morale explicite (« il avait appris que… »)</li><li>☐ Pas d'antagoniste</li><li>☐ Univers pas nommé (Éveil, Totems, Janus — implicites)</li><li>☐ Ennéatypes jamais étiquetés</li><li>☐ Surnoms 4/5 du temps</li><li>☐ Ten pas anxiogène</li><li>☐ Pas d'épilogue italique (post-001)</li><li>☐ Parents jamais en scène (saison 1)</li><li>☐ Compagnons = ondes/couleurs si présents</li><li>☐ Sensibilité différenciée (pas hiérarchie savoir)</li></ul> |
| **Critères PASS** | Tous les items binaires ✅. Si une case ❌ → verdict CORRECTIONS avec liste précise (5 min max). |
| **Condition de passage** | <ul><li>**PASS** → étape 9</li><li>**CORRECTIONS** → Directeur applique correctifs (modifie le rewrite directement, pas de nouvelle version) → re-soumet GateKeeper → PASS</li><li>**REJET STRUCTUREL** (rare, problème majeur narratif) → retour étape 6 avec note Conseiller</li></ul> |
| **Point de reprise** | Si reboot : relire `gatekeeper-verdict.md` (s'il existe) — sinon relancer GateKeeper sur le rewrite |
| **Modalité v2/v3** | Pas d'itération de verdict — un seul verdict par soumission. Si corrections, on re-soumet jusqu'à PASS. |

---

## Étape 9 — Re-relecture du rewrite (NOUVEAU)

> **Pourquoi cette étape** (ajoutée 2026-05-08) : le rewrite est une consolidation textuelle. Sans re-validation lecteurs, on prend le risque qu'une greffe ou une retouche ait abîmé ce qui plaisait. Cette étape **dérisque la canonisation**.

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (orchestrateur) — Lecteurs exécutent (`narration-lecteur` + `narration-lecteur-dyade`, Sonnet) |
| **Inputs** | Le rewrite seul (`rewrite/<llm>-rewrite-v1.md`). **Sans** la version base d'origine, **sans** les autres versions writers — lecture neutre, lecteur reçoit juste le texte candidat à canonisation. |
| **Panel — 20 lecteurs (panel complet)** | **Identique au panel étape 5** : 10 profils × 2 tranches d'âge (3-5 / 6-7). Décision auteur 2026-05-08 : pas de sous-panel léger, on re-test au complet pour éliminer tout doute de régression. |
| **Format** | Fiches courtes (plus courtes qu'à l'étape 5 — pas de classement, pas de comparaison entre versions, juste **lecture du texte candidat seul**) : « J'ai aimé / J'ai pas compris / Je retiens / Je relirais oui-non ». Si le lecteur a déjà lu la base à l'étape 5, **on ne lui rappelle pas** — il lit naïf. |
| **Outputs** | <ul><li>`stories/<NNN-slug>/relecture-rewrite/<profil>-<tranche>.md` × 20</li><li>`stories/<NNN-slug>/relecture-rewrite/synthese.md` (verdict consolidé Directeur)</li><li>`kanban.md` étape 9 ✅</li></ul> |
| **Critères PASS** | <ul><li>20 fiches présentes (sauf écart documenté pour 003 qui utilisera le panel transitoire 6 — voir note historique)</li><li>**Aucun retour structurel négatif** convergent (3+ lecteurs signalent la même régression = signal fort)</li><li>Au moins 70% des lecteurs (14/20) répondent positivement à « je relirais »</li><li>Si la version 5 du même panel avait classé la base #1 chez un profil et que ce même profil note maintenant une régression nette → bloquant</li></ul> |
| **Condition de passage** | <ul><li>**PASS** → étape 10</li><li>**CORRECTIONS LÉGÈRES** (1-2 micro-ajustements signalés convergents) → Directeur corrige le rewrite, **pas** de re-relecture supplémentaire (sauf si correction structurelle)</li><li>**RÉGRESSION SIGNIFICATIVE** → retour étape 7 (1 cycle de plus max), ou décision auteur de canoniser la **base brute** si rien ne tient</li></ul> |
| **Point de reprise** | Si reboot : compter fichiers présents dans `relecture-rewrite/`. Relancer ce qui manque. |
| **Modalité v2/v3** | 1 cycle de re-relecture max. Si après corrections étape 7 il y a encore régression → on canonise la base brute (top 1 sans rewrite). |
| **Note historique pour 003-004 (panel 6 transitoire)** | Pour les histoires antérieures à la décision 2026-05-08 (003-v2 et 004), la re-relecture étape 9 utilisera le **même panel 6 lecteurs** que l'étape 5 (cohérence). Panel 20 applicable à partir de 005. |

---

## Étape 10 — Canonisation

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (rédige) + PMO (canonise) |
| **Inputs** | Rewrite GateKeeper-PASS et re-relecture-PASS + `kanban.md` + `equipe/templates/synthese.template.md` + `equipe/lecons-vivantes.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/texte.md` ← **CANON** (copie du rewrite validé)</li><li>`stories/<NNN-slug>/synthese-finale.md` (compilation des analyses Directeur)</li><li>`stories/<NNN-slug>/README.md` (frontmatter YAML rempli)</li><li>`kanban.md` étape 10 ✅</li><li>Mises à jour mémoires : `memoire-conseiller.md`, `memoire-dir.md`, `memoire-architecte.md`</li><li>**Mise à jour `equipe/lecons-vivantes.md`** : ce qu'on a appris sur cette histoire (patterns confirmés, pièges identifiés, axes nouveaux)</li><li>Régénération `stories/INDEX.md` (script `generate-index.js`)</li><li>Entrée `pmo/sprint-log.md` + ticket clos dans `pmo/backlog.md`</li><li>Entrée `pmo/decisions.md` si décision narrative a émergé</li></ul> |
| **Critères PASS** | <ul><li>`texte.md` existe et identique au rewrite re-relu PASS</li><li>`README.md` YAML valide</li><li>`stories/INDEX.md` régénéré</li><li>3 mémoires mises à jour</li><li>**`lecons-vivantes.md` enrichi** (ce qu'on a appris)</li><li>Ticket fermé dans backlog</li></ul> |
| **Condition de passage** | ✅ **Auteur valide la version finale** |
| **Point de reprise** | Si reboot : `texte.md` présent ? Si oui mais index pas à jour → relancer scripts. Si non → recopier depuis le rewrite après validation auteur. |
| **Modalité v2/v3 (post-canon)** | V2 demandée plus tard → `texte.md` actuel déplacé en `_archive/canon-v1-YYYY-MM-DD.md` + nouveau cycle complet étapes 4-10 (briefs/plan rarement modifiés). Trace dans `README.md` (changelog V1 → V2 → V3). |

**SLA auteur :** 3 jours. Au-delà : kanban 🔴 BLOQUÉ.

---

## Reprise après reboot

Procédure standard pour tout agent reprenant une histoire :

1. **Lire `stories/<NNN-slug>/kanban.md`** — source de vérité de l'étape en cours
2. **Lire `stories/<NNN-slug>/README.md`** — état + persos + thème
3. **Lire le dernier output produit** :
   - Étape 1 : `pitch.md`
   - Étape 2 : `plan-histoire.md`
   - Étape 3 : `briefs/`
   - Étape 4 : compter `versions-writers/` (combien sur 10)
   - Étape 5 : compter `lecteurs-temoins/` (combien sur 20 cible, 6 en transitoire pour 001-004) + `synthese-lecteurs.md`
   - Étape 6 : `selection.md`
   - Étape 7 : `rewrite/<llm>-rewrite-v1.md`
   - Étape 8 : `gatekeeper-verdict.md`
   - Étape 9 : compter `relecture-rewrite/` (combien sur 3-4)
   - Étape 10 : `texte.md`
4. **Lire `pmo/decisions.md`** — règles tranchées récentes
5. Reprendre à l'étape signalée par le kanban

---

## Glossaire (extrait — version complète dans [`INDEX.md`](INDEX.md))

| Terme | Définition |
|---|---|
| **Pitch (MOYEN 4 cases)** | Objet titre · duo+Wex · lieu · moment d'ouverture (optionnel) |
| **Plan d'Histoire** | Squelette Kishōtenketsu : Ki/Sho/Ten/Ketsu, persos, contraintes |
| **Brief writer** | Document stateless lu par chaque writer : univers + personnages + histoire |
| **Version writer** | Texte complet 400-700 mots + note d'intention créative |
| **Note d'intention** | Le pourquoi des choix créatifs du writer (pas technique) |
| **Variance** | Levier appliqué aux 4 versions Claude+Kimi pour multiplier les angles (angle narratif / POV / ouverture / longueur) |
| **Lecteur témoin** | Profil simulé : 2 enfant seul + 2 dyade parent-enfant. Texte libre obligatoire. |
| **Sélection** | Décision Directeur post-lecteurs : version base + éléments à récupérer + brief rewrite |
| **Rewrite** | Réécriture v1 unique post-sélection (1 cycle max) |
| **GateKeeper** | Validation technique binaire (15 critères checklist) |
| **Canon** | `texte.md` GateKeeper-PASS + auteur-validé. Figé sauf V2 explicite. |
| **Kanban** | `stories/<NNN-slug>/kanban.md` — source de vérité de l'étape en cours |

---

## Liens rapides

- [`INDEX.md`](INDEX.md) — index complet de l'équipe (à créer)
- [`ORGANIGRAMME.md`](ORGANIGRAMME.md) — agents et chaîne de commandement
- [`cartographie-domaines.md`](cartographie-domaines.md) — où va quelle info
- [`patte-narrative-maxplay.md`](patte-narrative-maxplay.md) — patte B+D+C (à créer, cascade chantier 1)
- [`templates/`](templates/) — gabarits de briefs et docs (à créer)
- [`../pmo/decisions.md`](../pmo/decisions.md) — décisions tranchées
- [`../stories/_gabarit/`](../stories/_gabarit/) — gabarit de dossier histoire unifié (à réécrire)
