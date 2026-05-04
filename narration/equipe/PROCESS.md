# PROCESS éditorial MaxPlay

> **Référence opérationnelle.** Source de vérité du workflow, des owners, des inputs/outputs, des critères PASS et des points de reprise.
> **Pour la cartographie des fichiers et règles de domaine, voir [`cartographie-domaines.md`](cartographie-domaines.md).**
> **Pour l'organigramme et les agents, voir [`ORGANIGRAMME.md`](ORGANIGRAMME.md).**
> **Pour l'index complet de l'équipe, voir [`INDEX.md`](INDEX.md).**
>
> Dernière mise à jour : 2026-04-30 (réécriture militaire chantier process)

---

## Principes invariants

1. **Auteur a le dernier mot** — sur le pitch (étape 1), sur la sélection (étape 6), sur la version finale (étape 9). Trois points de validation, pas plus.
2. **1 rewrite max** — si le rewrite ne convient pas, retour à la sélection avec une autre version comme base.
3. **GateKeeper ne change pas l'histoire** — il vérifie le respect des règles, point.
4. **Rien n'est effacé** — versions abandonnées → `_archive/`. Histoire abandonnée → `_archive/` racine. Aucun overwrite.
5. **1 dossier = 1 histoire** — `stories/<NNN-slug>/` contient TOUT (briefs, versions, lecteurs, sélection, rewrite, gatekeeper, canon, variantes, archives). Pas de fragmentation `workshop/`.
6. **Le `kanban.md` est la source de vérité** — pour reprendre une histoire après reboot, on lit son kanban.
7. **Agent manquant = STOP + alerte auteur** (règle absolue 2026-05-02) — l'orchestrateur ne se substitue JAMAIS à un agent défini (PMO, Architecte, GateKeeper, Conseiller, Directeur, Writers, Lecteurs, Archiviste, Science, Sensibilité, Localisation, Audio) qui n'est pas chargé en session courante. Voir `pmo/decisions.md` (2026-05-02 RÈGLE ABSOLUE).

---

## Vue d'ensemble — 9 étapes

```
0. Idée        (Auteur)              → INBOX.md section datée
1. Pitch       (Conseiller)          ✅ valide auteur
2. Plan        (Architecte)
3. Briefs      (Directeur)
4. Versions    (8 Writers parallèles)
5. Lecteurs    (4 Témoins)
6. Sélection   (Directeur)           ✅ valide auteur
7. Rewrite     (Directeur, 1 cycle max)
8. GateKeeper  (Haiku)
9. Canon       (Directeur + PMO)     ✅ valide auteur
```

**SLA :** 3 jours max sur chaque attente auteur (étapes 1/6/9). Au-delà → `kanban.md` passe en 🔴 BLOQUÉ + log auto dans `pmo/sprint-log.md`.

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

## Étape 4 — Versions writers (8 versions parallèles)

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (orchestrateur) — Writers exécutent |
| **Inputs** | Les 3 briefs (univers + personnages + histoire), le plan-histoire.md, la [cheatsheet didascalies vocales](voix/_CHEATSHEET-WRITERS.md) (didascalies FR italiques autorisées dans les drafts ; le voice-director les convertira en tags v3 ElevenLabs en production audio) |
| **Outputs** | <ul><li>`versions-writers/claude-base.md` (Claude config standard, angle natif)</li><li>`versions-writers/kimi-base.md` (Kimi config standard, angle natif)</li><li>`versions-writers/deepseek-base.md` (DeepSeek config standard, angle natif)</li><li>`versions-writers/grok-base.md` (Grok config standard, angle natif)</li><li>`versions-writers/claude-variance-1-{angle}.md` (angularisé)</li><li>`versions-writers/claude-variance-2-{angle}.md` (angularisé)</li><li>`versions-writers/kimi-variance-1-{angle}.md` (angularisé)</li><li>`versions-writers/kimi-variance-2-{angle}.md` (angularisé)</li><li>`versions-writers/_notes-intention/<writer>.md` (1 par version : pourquoi ces choix créatifs, pas technique)</li><li>`kanban.md` étape 4 ✅</li></ul> |
| **Schéma writers (premières histoires, révision après 3-5)** | <table><tr><th>Bloc</th><th>N</th><th>LLM</th><th>Configuration</th><th>Angle</th></tr><tr><td>Core "normal"</td><td>4</td><td>Claude · Kimi · DeepSeek · Grok</td><td>Config standard, prompt identique</td><td>Aucun angle imposé — l'angle natif du LLM se révèle</td></tr><tr><td>Variance Claude</td><td>2</td><td>Claude × 2</td><td>Prompts angularisés</td><td>Sobre + Sensoriel (par défaut)</td></tr><tr><td>Variance Kimi</td><td>2</td><td>Kimi × 2</td><td>Prompts angularisés</td><td>Dynamique + Instinct (par défaut)</td></tr></table> |
| **Leviers de variance disponibles** | <ul><li>**Angle narratif** (Sobre / Sensoriel / Dynamique / Instinct) — par défaut</li><li>**POV / focal narratif** (Wex témoin / un perso du duo / narrateur invisible)</li><li>**Ouverture** (in medias res / lente / dialogue d'amorce)</li><li>**Longueur cible** (400 / 550 / 700 mots)</li></ul> Le Directeur choisit le levier dans `brief-histoire.md`. |
| **Critères PASS** | <ul><li>8 versions présentes (sauf si écart documenté dans `selection.md` à venir — tolérance temporaire)</li><li>Chaque version : 400-700 mots</li><li>Chaque version : note d'intention créative dans `_notes-intention/<writer>.md`</li><li>Aucun writer n'a lu les autres (stateless)</li></ul> |
| **Condition de passage** | Directeur lance étape 5 dès que les 8 versions sont produites |
| **Point de reprise** | Si reboot : compter fichiers présents dans `versions-writers/`. Relancer les writers manquants. |
| **Modalité v2/v3** | Aucune itération en étape 4. Si une version est défectueuse (vide, hors-format) → `_archive/` + relance du writer. |

---

## Étape 5 — Lecteurs témoins

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (orchestrateur) — Lecteurs exécutent |
| **Inputs** | Les 8 versions writers + `equipe/profils-lecteurs.md` |
| **Outputs** | <ul><li>`lecteurs-temoins/enfant-1.md`</li><li>`lecteurs-temoins/enfant-2.md`</li><li>`lecteurs-temoins/dyade-1.md`</li><li>`lecteurs-temoins/dyade-2.md`</li><li>`kanban.md` étape 5 ✅</li></ul> |
| **Profils** | 2 enfants seuls + 2 dyades parent-enfant. Format **texte libre obligatoire** (pas de grille, pas de note sur 10). « J'ai aimé… / J'ai pas compris… / Je retiens… » |
| **Critères PASS** | <ul><li>4 fichiers présents</li><li>Chaque fichier : retour personnel sur les 8 versions (peut comparer, peut signaler des préférences)</li><li>Pas de jargon technique (pas de "Kishōtenketsu", "ennéatype")</li></ul> |
| **Condition de passage** | Directeur déclenche étape 6 |
| **Point de reprise** | Si reboot : relire `lecteurs-temoins/` (ce qui est présent) + relancer ce qui manque |
| **Modalité v2/v3** | Aucune itération |

---

## Étape 6 — Sélection

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (`narration`, Opus) |
| **Inputs** | Les 8 versions + 4 retours lecteurs + `equipe/memoire-dir.md` + `equipe/patte-narrative-maxplay.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/selection.md` (rempli depuis `equipe/templates/selection.template.md`)</li><li>`kanban.md` étape 6 ✅ + statut "EN ATTENTE AUTEUR"</li></ul> |
| **Format `selection.md`** | <ul><li>**Version base choisie** (laquelle des 8 + pourquoi)</li><li>**Éléments à récupérer** d'autres versions (citations précises)</li><li>**Réactions lecteurs** à prendre en compte (citations + interprétation)</li><li>**Brief de rewrite** : ce qui doit changer, ce qui doit rester intact</li><li>**Tiebreak rule** : si 2 versions sont à égalité, le Directeur choisit celle qui colle le plus à la patte (B+D+C) — pas celle qui plaît le plus au lecteur enfant si elle dérive du Kishōtenketsu</li></ul> |
| **Critères PASS** | <ul><li>`selection.md` rempli toutes sections</li><li>Choix justifié contre la patte narrative et les retours lecteurs</li><li>Brief rewrite actionnable (pas de "améliore globalement")</li></ul> |
| **Condition de passage** | ✅ **Auteur valide la sélection** (peut accepter, ajuster, ou demander un changement de version base) |
| **Point de reprise** | Si reboot : relire `selection.md` + statut kanban |
| **Modalité v2/v3** | Auteur peut demander une nouvelle sélection → Directeur produit `selection.v2.md` (ancien → `_archive/`). Plafond : 2 itérations puis escalade Conseiller. |

**SLA auteur :** 3 jours. Au-delà : kanban 🔴 BLOQUÉ.

---

## Étape 7 — Rewrite

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (peut sous-traiter à un writer) |
| **Inputs** | `selection.md` (version base + brief rewrite) + version base elle-même + 4 retours lecteurs |
| **Outputs** | <ul><li>`stories/<NNN-slug>/rewrite/v1.md`</li><li>`kanban.md` étape 7 ✅</li></ul> |
| **Critères PASS** | <ul><li>Rewrite respecte le brief (changements demandés appliqués)</li><li>Longueur 400-700 mots</li><li>Patte respectée (pas de dérive A/F)</li><li>Garde-fous narratifs respectés (parents hors-scène, pas de morale dite, ennéatype dilué, etc.)</li></ul> |
| **Condition de passage** | Directeur déclenche étape 8 dès que `v1.md` existe |
| **Point de reprise** | Si reboot : relire `rewrite/v1.md` (s'il existe) + `selection.md` + kanban |
| **Modalité v2/v3** | **1 cycle max.** Si v1 ne convient pas après GateKeeper ou auteur → retour étape 6 (nouvelle sélection avec autre version base). Pas de v2 de rewrite. |

---

## Étape 8 — GateKeeper

| Champ | Valeur |
|---|---|
| **Owner** | GateKeeper (`narration-gatekeeper`, Haiku) |
| **Inputs** | `rewrite/v1.md` + `personnages/lookup.yml` + `pmo/decisions.md` + `equipe/memoire-gatekeeper.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/gatekeeper-verdict.md`</li><li>`kanban.md` étape 8 ✅ ou ❌</li><li>Mise à jour `equipe/memoire-gatekeeper.md` (erreurs récurrentes détectées)</li></ul> |
| **Checklist PASS (toutes binaires)** | <ul><li>☐ Prénoms/surnoms vs `lookup.yml`</li><li>☐ Genres/pronoms cohérents</li><li>☐ Longueur 400-700 mots</li><li>☐ Chaque perso ≥ 2 répliques</li><li>☐ ≥ 1 échange de 3+ répliques</li><li>☐ Pas de morale explicite (« il avait appris que… »)</li><li>☐ Pas d'antagoniste</li><li>☐ Univers pas nommé (Éveil, Totems, Janus — implicites)</li><li>☐ Ennéatypes jamais étiquetés</li><li>☐ Surnoms 4/5 du temps</li><li>☐ Ten pas anxiogène</li><li>☐ Pas d'épilogue italique (post-001)</li><li>☐ Parents jamais en scène (saison 1)</li><li>☐ Compagnons = ondes/couleurs si présents</li><li>☐ Sensibilité différenciée (pas hiérarchie savoir)</li></ul> |
| **Critères PASS** | Tous les items binaires ✅. Si une case ❌ → verdict CORRECTIONS avec liste précise (5 min max). |
| **Condition de passage** | <ul><li>**PASS** → étape 9</li><li>**CORRECTIONS** → Directeur applique correctifs (modifie `rewrite/v1.md` directement, pas de nouvelle version) → re-soumet GateKeeper → PASS</li><li>**REJET STRUCTUREL** (rare, problème majeur narratif) → retour étape 6 avec note Conseiller</li></ul> |
| **Point de reprise** | Si reboot : relire `gatekeeper-verdict.md` (s'il existe) — sinon relancer GateKeeper sur `rewrite/v1.md` |
| **Modalité v2/v3** | Pas d'itération de verdict — un seul verdict par soumission. Si corrections, on re-soumet jusqu'à PASS. |

---

## Étape 9 — Canonisation

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (rédige) + PMO (canonise) |
| **Inputs** | `rewrite/v1.md` GateKeeper-PASS + `kanban.md` + `equipe/templates/synthese.template.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/texte.md` ← **CANON** (copie de `rewrite/v1.md` validée auteur)</li><li>`stories/<NNN-slug>/synthese.md` (compilation des analyses Directeur)</li><li>`stories/<NNN-slug>/relecture.md` (relecture finale Directeur)</li><li>`stories/<NNN-slug>/README.md` (frontmatter YAML rempli — titre, mots, persos, thème, statut canon)</li><li>`kanban.md` étape 9 ✅</li><li>Mises à jour mémoires : `memoire-conseiller.md`, `memoire-dir.md`, `memoire-architecte.md`</li><li>Régénération `stories/INDEX.md` (script `generate-index.js`)</li><li>Entrée `pmo/sprint-log.md` + ticket clos dans `pmo/backlog.md`</li><li>Entrée `pmo/decisions.md` si une décision narrative a émergé pendant l'écriture</li></ul> |
| **Critères PASS** | <ul><li>`texte.md` existe et est identique au rewrite GateKeeper-PASS</li><li>`README.md` YAML valide (script `validate-frontmatter.js`)</li><li>`stories/INDEX.md` régénéré et incluant la nouvelle histoire</li><li>3 mémoires mises à jour</li><li>Ticket fermé dans backlog</li></ul> |
| **Condition de passage** | ✅ **Auteur valide la version finale** |
| **Point de reprise** | Si reboot : `texte.md` est-il présent ? Si oui mais index pas à jour → relancer scripts. Si non → recopier depuis `rewrite/v1.md` après validation auteur. |
| **Modalité v2/v3 (post-canon)** | Si une V2 de l'histoire est demandée plus tard (correction comité, bug pédagogique) → `texte.md` actuel déplacé en `_archive/v1-YYYY-MM-DD.md` + nouveau `texte.md` créé. Trace dans `README.md` (changelog V1 → V2 → V3). |

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
   - Étape 4 : compter `versions-writers/` (combien sur 8)
   - Étape 5 : compter `lecteurs-temoins/` (combien sur 4)
   - Étape 6 : `selection.md`
   - Étape 7 : `rewrite/v1.md`
   - Étape 8 : `gatekeeper-verdict.md`
   - Étape 9 : `texte.md`
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
