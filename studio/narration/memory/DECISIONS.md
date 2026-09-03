# Décisions de fond — Narration

> **Règle :** une décision ici est DÉFINITIVE jusqu'à nouvelle décision explicite datée.
> Aucune entrée n'est datée ≥ 2026-08-01 au moment de cette convergence (2026-09-03) : tout le corps daté est archivé verbatim dans [`archive/decisions-2026-H2.md`](archive/decisions-2026-H2.md). Les deux sections ci-dessous sont des **tableaux de bord** (état courant, pas des logs) : elles restent dans le vivant quelle que soit leur date d'origine.

## Décisions structurantes toujours en vigueur (index, détail → archive)

| ID / titre | Résumé | Archive |
|---|---|---|
| Casting V1 "Christ" figé (2026-04-24, ajusté 2026-05-05) | Wex + Melki/Mimi/Dadou/Madie/Lulu/Pierrot/Raph/Juju/Nono, 4F/5M+Wex | [archive](archive/decisions-2026-H2.md) § 2026-04-24 |
| Patte narrative B+D+C | Kishōtenketsu + tranche de vie + cycle | [archive](archive/decisions-2026-H2.md) § 2026-04-30 |
| Univers IMPLICITE / parents hors-scène / pas de morale | Règles d'or structurelles, jamais nommer un ennéatype | [archive](archive/decisions-2026-H2.md) § 2026-04-24, 2026-04-29 |
| DEC-AUDIO-PRODUCTION-001 v3 (2026-05-16) | Voie officielle audio = MCP `studio_audiobook_from_segments_v2_dialogue`, modèle `eleven_v3` forcé, voice-map.json resolver | [archive](archive/decisions-2026-H2.md) § 2026-05-16 |
| DEC-WRITER-ARCH-001 (2026-05-15) | 14 writers : system unique `_writer-system.md` + brief histoire par story | [archive](archive/decisions-2026-H2.md) § 2026-05-15 |
| Casting 14 writers immuable (refus retrait #9, 2026-05-17) | Jamais régresser le casting writers sans décision auteur explicite datée | [archive](archive/decisions-2026-H2.md) § 2026-05-17 |
| DEC-PANEL-V2 (2026-07-03) | Panel 20 → 12 calls hétérogènes (4 groupes × 3 modèles) | [archive](archive/decisions-2026-H2.md) § 2026-07-03 |
| DEC-DOCTRINE-INSTRUMENT-LECTURE (2026-07-08) | Lecture annotée = instrument PRINCIPAL, duel = secondaire (arbitrages serrés) | [archive](archive/decisions-2026-H2.md) § 2026-07-08 |
| DEC-DOCTRINE-NARRATION-001 (2026-07-17) | Pointeur vers `memory/DECISIONS.md § Doctrine` racine (D-001/D-002/D-003), pas de copie locale | [archive](archive/decisions-2026-H2.md) § 2026-07-17 |
| DEC-UNIVERS-NOM (2026-07-27) | L'univers narratif s'appelle **WEX WORLD** (marque produit reste MaxPlay) | [archive](archive/decisions-2026-H2.md) § 2026-07-27 |
| DEC-SENSIBILITES-T6-T8 (2026-07-27) | Pierrot (T6) = Plantes, Juju (T8) = Animaux (fiches vivantes font foi) | [archive](archive/decisions-2026-H2.md) § 2026-07-27 |
| Agent manquant = STOP + alerte auteur (2026-05-02) | L'orchestrateur ne se substitue jamais à un agent défini non chargé | [archive](archive/decisions-2026-H2.md) § 2026-05-02 |
| Rien n'est effacé (versions/canon) | `versions-writers/`, `lecteurs-temoins/` etc. jamais supprimés après canonisation | [archive](archive/decisions-2026-H2.md) § 2026-04-24 |
| Writer top 1 garde la main au rewrite (2026-05-08) | Pas de greffes injectées par d'autres LLM | [archive](archive/decisions-2026-H2.md) § 2026-05-08 |
| SLA 3 jours / kanban 🔴 BLOQUÉ (DEC-SLA-NARRATION, 2026-05-21) | Au-delà de 72h sans réponse auteur → bloqué | [archive](archive/decisions-2026-H2.md) § 2026-05-21 |

---

## Questions ouvertes (à trancher)

| # | Question | Bloquant ? | Fichier |
|---|----------|-----------|---------|
| 1 | Nom de l'univers — lequel parmi 5 finalistes ? | Non | `../univers/meta/nom-candidats.md` |
| 2 | ~~Compagnons — forme exacte ? Quand apparaissent-ils ?~~ **TRANCHÉ 2026-04-29** (ondes/couleurs, milieu/fin S1) | — | `../univers/vie-quotidienne/compagnons.md` |
| 3 | Éléments magiques rares — garder ou écarter ? | Non | — |
| 4 | Baron — garder prénom "Trump" ? | Non | `../univers/baron.md` |
| 5 | Ombre Éternelle — concept actif ou standby ? | Non | — |
| 6 | Modèle Janus — référence discrète ou assumée ? | Non | `../INBOX.md` (rapports JP Petit) |
| 7 | Nom du prof d'Histoire | Non | `../univers/vie-quotidienne/ecole.md` |
| 8 | Nom des axes verts (Coulées ? Glissières ? Axes vivants ?) | Non | `../univers/vie-quotidienne/transport.md` |
| 9 | Ponaire — mécanique précise + lien voyages culturels | Non | `../univers/vie-quotidienne/transport.md` |
| 10 | Nombre de villes max par pays | Non | `../univers/vie-quotidienne/geographie.md` |
| 11 | Liste des Sensibilités — fermer les sous-types (Fréquence/Son/Schumann) | Non | `../univers/fondements/sensibilites.md` |
| 12 | Quand Wex commence à contrôler sa Vision causale ? (S1/S2/S3) | Non | — |
| 13 | Mentor de Wex — qui ? Quel âge ? Quelle sensibilité ? | Non | — |
| 14 | Castings cross-country (Hébreu, Ghibli, Swahili…) — démarrer lequel en premier ? | Oui pour S2 | `../cross-culture/castings-nationaux/INDEX.md` + `../cross-culture/prenoms/INDEX.md` |
| 15 | Tokens `{titi_N}` dans les textes canon — rétroporter `001-le-pont-casse/texte.md` ou attendre le 2e casting national ? | Oui avant 2e casting | `../stories/001-le-pont-casse/texte.md` + `../personnages/lookup.yml` |
| 16 | **Sous-spé narration-pmo future** : si volume grossit (>20 stories, 2+ castings nationaux actifs), faut-il scinder en `narration-stories-pmo` (kanban + SLA) vs `narration-meta-pmo` (PROCESS + decisions + roadmap) ? Hypothèse transmise par game-pmo 2026-05-11. Pas urgent — tient pour l'instant. | Non (hypothèse) | `.claude/agents/narration-pmo.md` |
| 15 | Mémoire narrative des lecteurs — les enfants connaîtront les histoires précédentes et feront des liens. Comment en tenir compte dans l'écriture (callbacks implicites, évolution persos, arcs longs) ? À partir de quelle histoire introduire ce niveau de couche ? | Non | — |
| 16 | Quartier / communauté — nommé (Clairval, Tissé, Hameau de l'Aube, la Ronde…) ou volontairement anonyme ? Décision 26/04 a écarté les villes réelles, mais n'a pas tranché si on nomme la communauté/quartier. Trade-off : ancrage affectif (B) vs universalité cross-culture (A). | Non | `../univers/vie-quotidienne/geographie.md` |
| 17 | ~~**V1 minimaliste vs V2 comité pour 003-v2**~~ **TRANCHÉ 2026-05-08** (V2 comité retenue, canonisée 001) | — | — |

---

## Propositions en cours (2026-05-15 — en attente validation Papa Yann)

### PROP-KISHOTEN-SYSTEMPROMPT : Formulation Kishōtenketsu pour system prompt Couche 1

**Contexte** : DEC-PROCESS-NEW-001 crée étape B (brainstorm Couche 0) + architecture briefs 3 couches. Besoin formaliser mécanisme Kishōtenketsu pour que writers le comprennent sans ambiguïté.

**Proposition** (à valider) :

#### Formulation recommandée pour system prompt writers

**Pour tous writers (Couche 1 référence)** :
```
Kishōtenketsu : B (Début/Objet) + D (Développement/Complication) + C (Chute/Résolution) 
= tranche de vie avec arc émotionnel simple + cycle (revenir au point de départ, transformé).

- B : présenter situation/objet/personnage avec détail sensoriel
- D : une complication/détour/question qui trouble l'équilibre
- C : non pas une résolution magique, mais un retour au calme + transformation imperceptible
- Cyclique : fin ressemble à début (lieu, personnage, geste) mais subtilité a changé

Raison : convient 4-5 ans (clair, rassurant) + accepte ennéatypes implicites (chaque perso D différent).
```

**Questions ouvertes dans la proposition** :
- Faut-il aussi inclure cycle "Ketsu" (4e acte clôture) ou 3 couches suffisent (B+D+C) ?
- "Transformation imperceptible" — trop flou ? Proposer synonymes : "légère", "intérieure", "invisible" ?
- Exemple concret dans brief ? Ou reléguer en annexe leçons-vivantes ?

**Fichiers impactés si validée** :
- `equipe/templates/couche-1-universel.md` : inclure formulation
- `equipe/templates/_writer-package.template.md` : inclure section Kishōtenketsu
- Writers system prompts : adapter chacun (Claude/Kimi/DeepSeek/Grok)

**Statut** : ⏳ En attente validation Papa Yann.

---

### PROP-DIALOGUE-FIFTY-PERCENT : Variante règle "50% dialogue" — "35-50% dialogue, non obligatoire Ten"

**Contexte** : analyse étape 5 STORY-002 vague 2 montre écarts variance sur % dialogue. Certains writers (grok-reco) poussent à 60%+ dialogue = perte description sensorielle. Autres (claude-opus-reco) restent à 25% = trop sobre. Besoin règle plus flexible.

**Proposition** (à valider) :

#### Assouplissement règle dialogue

**Défaut actuel** : "50% dialogue obligatoire"

**Variante proposée** : "35-50% dialogue. Dialogue non obligatoire pendant Ten (complications). Privilégier action physique/geste quand complication est gestuelle."

**Raison** :
- 35-50% = bandwidth pour variance (certains writers écriture sèche, autres bavardes)
- Non-obligatoire Ten = laisse writer explorer geste-avant-parole pendant complications
- Préserver dialogue pour Ki (présentation) et C (clôture ritual)

**Contre-exemple (rejeter)** :
- "Zéro dialogue" = trop contraignant
- "Jusqu'à 70%" = trop dialogue, perd narration sensorielle

**Fichiers impactés si validée** :
- `brief-histoire.md` gabarit Couche 2 : ajuster ligne dialogue
- `equipe/templates/couche-1-universel.md` : clarifier règle dialogue

**Statut** : ⏳ En attente validation Papa Yann.

---

### PROP-COUCHE0-LLMS : Brainstorm Couche 0 — quels LLMs invités ?

**Contexte** : DEC-PROCESS-NEW-001 crée étape B (brainstorm Couche 0). Besoin préciser : **quels LLMs** inviter pour cette étape d'exploration créative ?

**Propositions à valider** :

#### Option A (PROPOSÉE) : Kimi + DeepSeek + Grok (multi-perspective)
- **Kimi** : excellence créative narratif, 0.6 reco créatif Instant
- **DeepSeek** : riche/prolixe, 1.5 reco créatif, bon pour idées denses
- **Grok** : énergie différente, 1.2 reco, souvent surprend
- **Avantage** : 3 angles créatifs différents = idées variées pour vision guidé
- **Coût** : 3 invocations MCP, temps 2-3 jours

#### Option B (ALTERNATIVE) : Kimi seul (cohérence writer guidé)
- **Kimi** : déjà writer guidé en étape 4, cohérence narrative
- **Avantage** : cohérence amont/aval (même LLM pense brainstorm + écrit guidé)
- **Inconvénient** : perte variance idées, moins exploratoire

#### Option C (ALTERNATIVE) : Claude agents (Conseiller + spécialistes)
- **Conseiller** : déjà intervient étape A (pitch)
- **Avantage** : utilise agents existants, cohérence project
- **Inconvénient** : pas testé intensivement en brainstorm créatif

**Données validant Option A** :
- Étape 4 STORY-002 vague 2 : 14 writers = variance. Couche 0 brainstorm multi-LLM = continuer.
- Vague 3 sera test = mesurer si Couche 0 multi-LLM enrichit writer guidé vs simplifie.

**Statut** : ⏳ En attente validation Papa Yann + décision ressource (coût MCP).

---

### PROP-PANEL-REDUCTION : Réduction panel lecteurs — refonte annoncée

**Contexte** : Papa Yann 2026-05-15 (lors session STORY-002 étape 5-6) : "ENORMEMENT DE MATIÈRE exploitée mal, on garde le top 1 et fini en gros". Signal : panel 20 lecteurs produit trop d'avis, synthèse long, peu d'arbitrage Directeur.

**État actuel** :
- Panel 20 OBLIGATOIRE (validé empiriquement STORY-002)
- Synthèse longueur : ~3000 mots (5-7 heures lecture + analyse)
- Utilisation Directeur : sélectionne top 1-2, ignore reste

**Proposition** (articulation Papa Yann — pas complètement tranchée) :

#### Hypothèse refonte panel

- **Réduire à 10-12 lecteurs** ? (calibrage)
- **Ou garder 20, mais synthèse simplifiée** ? (keep data, lighter output)
- **Ou multi-tour** : vague 1 (6 lecteurs rapide) → sélection, vague 2 (20 complet) si besoin approfondissement ?

**Données présentes** :
- STORY-002 top writer (kimi-reco-guide-v2) plaît fortement (16+/20)
- Bottom 3 writers : évaluation stable (4-8/20), pas besoin 20 avis pour rejeter
- Arbitrage principal : sélection vague 2 qui part en rewrite (étape 7)

**Blocant ?** Non — panel 20 fonctionne, est question optimisation/vélocité.

**Prochaine étape** : Papa Yann décide refonte post-STORY-004 (après test 3-5 histoires).

**Statut** : ⏳ Question ouverte posée. Arbitrage post-STORY-004 (ticket ARCHI-008 tracking).

> ⚠️ Note (2026-09-03, convergence HO-NAR-01) : DEC-PANEL-V2 (2026-07-03, archivée) a depuis tranché la structure à 12 calls — cette proposition de réduction datée du 2026-05-15 est probablement caduque mais n'a jamais été formellement close. Signalée telle quelle, non trichée par cette convergence (question de contenu, hors mandat mémoire).
