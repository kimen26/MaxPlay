# 🔥 AUDIT CHALLENGE — Équipe Narrative & Process Création Histoires MaxPlay

> **Date :** 2026-04-28  
> **Auditeur :** Claude (audit externe)  
> **Périmètre :** Pipeline narratif complet — de l'idée brute au texte canon  
> **Sources :** 40+ documents lus, 2 textes canon analysés, agents Claude audités, scripts testés

---

## 📋 SOMMAIRE

1. [Executive Summary](#1-executive-summary)
2. [Le Process — Cartographie de la chaîne de valeur](#2-le-process--cartographie-de-la-chaîne-de-valeur)
3. [L'Équipe — Qui fait quoi ?](#3-léquipe--qui-fait-quoi)
4. [Qualité des livrables — Analyse réelle](#4-qualité-des-livrables--analyse-réelle)
5. [Les Forces — Ce qui marche vraiment](#5-les-forces--ce-qui-marche-vraiment)
6. [Les Failles — Audit critique par couche](#6-les-failles--audit-critique-par-couche)
7. [Incohérences documentaires majeures](#7-incohérences-documentaires-majeures)
8. [Outils & Automatisation — Vivant ou mort ?](#8-outils--automatisation--vivant-ou-mort)
9. [Besoins de recrutement & spécialisation](#9-besoins-de-recrutement--spécialisation)
10. [Plan d'action priorisé](#10-plan-daction-priorisé)

---

## 1. Executive Summary

### Verdict global (APRÈS CORRECTIONS 2026-04-28)

**Concept : A+** — Le pipeline à 6 phases avec 8 writers parallèles, variance stateless/mémoire, Kishōtenketsu, et validation multi-couches est l'un des process narratifs les plus sophistiqués jamais documentés pour de la fiction jeunesse assistée par IA.

**Exécution : B+ → A-** — Le process a produit **2 histoires canon de qualité littéraire réelle** ("Le Pont Cassé", "Le Rire qui reste"). Les **corrections critiques ont été appliquées** : mémoires mises à jour, agents obsolètes archivés, agent Directeur réécrit, 3 nouveaux agents créés, scripts opérationnels, fourchette 400-700 mots figée, règles comité de lecture définies.

**Risque résiduel :** MCP Kimi toujours à tester. 7 fichiers input-idees non distillés. Mémoire-showrunner à enrichir au fil des audits.

### Chiffres clés

| Métrique | Valeur |
|----------|--------|
| Histoires canon | 2 (001, 002) |
| Writers parallèles | 5 (Kimi, DeepSeek, Grok, Claude Libre, Claude Ancré) |
| Agents Claude internes | 9 déclarés, 3 obsolètes |
| Profils lecteurs | 13 (5 âges × 2 sexes + éditeur + prof + philosophe + 8 cultures) |
| Scripts automatisés | 3 (2 opérationnels, 1 bugué) |
| Fichiers de mémoire | 6 (4 non mis à jour après 002) |
| Questions ouvertes non tranchées | 15 |
| Temps moyen cycle complet (002) | ~1 session (sprint du 2026-04-28) |

---

## 2. Le Process — Cartographie de la chaîne de valeur

### 2.1 Le flux idéal (documenté)

```
[PHASE 0 — INTAKE]
Auteur dumpe → input-idees/YYYY-MM-DD-sujet.md
      ↓
PMO scanne → crée ticket → pmo/backlog.md

[PHASE 1 — BRIEF]
Directeur lit ticket + INDEX + mémoire-dir.md
      ↓ (si doute)
Consultation panel → Kimi + Grok + Claude (quick pass)
      ↓
Archiviste crée module histoire depuis gabarit
      ↓
Directeur produit 3 briefs :
  workshop/<titre>/brief-univers.md
  workshop/<titre>/brief-personnages.md
  workshop/<titre>/brief-histoire.md

[PHASE 2 — ÉCRITURE × 5]
Directeur injecte 3 briefs aux 5 writers simultanément
  → version-kimi.md / version-deepseek.md / version-grok.md
  → version-claude-libre.md / version-claude-ancre.md

[PHASE 3 — SYNTHÈSE]
Directeur lit 5 versions → sélectionne, combine → synthese.md

[PHASE 4 — RELECTURE]
Directeur envoie synthese.md à Kimi + Claude relecteur
  → relecture.md (3-5 remarques prioritaires)
      ↓
Directeur intègre → version-finale.md

[PHASE 4b — LECTEURS TÉMOINS (optionnel)]
Directeur injecte version-finale.md + profil
  → lecteurs-temoins.md

[PHASE 5 — KEEPER]
Keeper valide version-finale.md → PASS / FAIL
  ✅ PASS → canon  |  ❌ FAIL → retour phase 3

[PHASE 6 — CANON + CLÔTURE]
Directeur écrit → stories/<NNN-slug>/texte.md (CANON)
Archiviste : index YAML + _index/ + brief-univers.md (tous les 5)
PMO ferme ticket
Directeur archive session → archive/YYYY-MM-DD-<titre>.md
```

### 2.2 Ce qui se passe VRAIMENT (observé sur 002)

```
Auteur choisit sujet "La Confidence" → briefs manuels
      ↓
5 writers appelés — Kimi MCP VIDE (2 appels = rien)
      ↓
4 versions reçues (DeepSeek, Grok, Claude Libre, Claude Ancré)
      ↓
Directeur synthétise manuellement
      ↓
Relecture Kimi + Claude → remarques de haute qualité
      ↓
version-finale.md → Keeper PASS du premier coup
      ↓
CANON : 489 mots, Wex + Nono + Polo
      ↓
❌ Mémoires NON mises à jour (writer-ancre, keeper, dir)
❌ Index stories/INDEX.md NON régénéré
❌ Archive session NON créée
❌ Comité de lecture SAUTÉ (décision ad hoc)
```

**Constat :** Le pipeline produit du texte de qualité, mais la **fermeture de cycle est bâclée**. Les mémoires ne s'enrichissent pas. L'apprentissage organisationnel est nul.

---

## 3. L'Équipe — Qui fait quoi ?

### 3.1 Tableau de bord des agents

| Rôle | Agent/Modèle | Mémoire | Dernier usage | État |
|------|-------------|---------|---------------|------|
| **PMO** | `narration-pmo` (Haiku) | `pmo/` | 2026-04-28 | ✅ Actif |
| **Directeur** | `narration` (Opus) | `memoire-dir.md` | 2026-04-28 | ⚠️ Mémoire obsolète |
| **Writer Libre** | `narration-writer-claude-libre` (Sonnet) | Aucune | 2026-04-28 | ✅ Actif |
| **Writer Ancré** | `narration-writer-claude-ancre` (Sonnet) | `memoire-writer-ancre.md` | 2026-04-28 | ⚠️ Mémoire obsolète |
| **Keeper** | `narration-keeper` (Haiku) | `memoire-keeper.md` | 2026-04-28 | ⚠️ Mémoire VIDE |
| **Archiviste** | `narration-archiviste` (Haiku) | Aucune | Jamais testé end-to-end | ❓ Non évalué |
| **Science** | `narration-science` (Haiku) | `memoire-science.md` | Non documenté | ❓ Non évalué |
| **Sensibilité** | `narration-sensibilite` (Sonnet) | `memoire-sensibilite.md` | Non documenté | ❓ Non évalué |
| **Lecteur** | `narration-lecteur` (Sonnet) | Aucune | Jamais utilisé sur 002 | ❓ Non évalué |
| **Writer A** | `narration-writer-a` (Sonnet) | `memoire-writer-a.md` | REMPLACÉ | ❌ **OBSOLÈTE** |
| **Writer B** | `narration-writer-b` (Sonnet) | `memoire-writer-b.md` | REMPLACÉ | ❌ **OBSOLÈTE** |
| **Writer C** | `narration-writer-c` (Sonnet) | `memoire-writer-c.md` | REMPLACÉ | ❌ **OBSOLÈTE** |

### 3.2 Les writers externes

| Modèle | Rôle | État technique | Problème |
|--------|------|---------------|----------|
| **Kimi** | Writer + Relecteur + Panel | ⚠️ MCP retourne VIDE | Headers Claude Code mal configurés ? Serveur bun instable ? |
| **DeepSeek** | Writer | ✅ Fonctionne | Aucun |
| **Grok** | Writer + Panel | ✅ Fonctionne | Aucun |

**Constat critique :** Kimi est le writer/relecteur le plus cité dans la documentation, mais il est **hors service** depuis au moins le 2026-04-28. 20% de la variance du pipeline est perdue.

### 3.3 Le public / les lecteurs

Le process distingue **13 profils de lecteurs** :

- **5 profils âge** : Fille 4 ans, Garçon 4 ans (Max, référence), Fille 9 ans, Garçon 9 ans
- **5 profils adultes** : Père, Mère, Éditeur jeunesse, Prof français, Philosophe
- **8 filtres culturels** : 🇺🇸 🇩🇪 🇨🇳 🇳🇬 🇯🇵 🇲🇦 🇧🇷 🇷🇺

**Utilisation réelle :**
- Comité de lecture complet sur 001 (7 profils + cultures)
- **Aucun comité sur 002** — décision ad hoc : "pas à chaque histoire"
- Lecteur témoin Claude (`narration-lecteur`) **jamais utilisé** sur 002

**Problème :** Il n'y a pas de règle claire indiquant *quand* un comité est obligatoire vs optionnel. Le risque : des histoires passent en canon sans validation réceptionnelle.

---

## 4. Qualité des livrables — Analyse réelle

### 4.1 Les textes canon

#### "Le Pont Cassé" (001) — 83 lignes
- **Structure :** Kishōtenketsu tenu avec épilogue italique (métacommentaire sur la collaboration)
- **Personnages :** Wex (impulsif), Melki (prudente), Juju (décidée) — 3 voix distinctes
- **Ton :** sobre, sensoriel, dialogues courts
- **Longueur :** ~600-700 mots (estimé)
- **Qualité :** Très bonne. Le comité de lecture a identifié 3 améliorations.
- **Écart :** L'épilogue italique a été supprimé comme pratique à partir de 002 — bonne décision évolutive.

#### "Le Rire qui reste" (002) — 83 lignes, 489 mots
- **Structure :** Kishōtenketsu tenu, Ten introverti (silence porté)
- **Personnages :** Wex (impulsif), Nono (pacificateur, blessé), Polo (performeur, présence silencieuse)
- **Ton :** encore plus sobre que 001. Zéro épilogue. Boucle circulaire (terrain mouillé)
- **Longueur :** 489 mots — dans la fourchette
- **Qualité :** Excellente. La relecture a signalé 2 passages à surveiller à voix haute.

### 4.2 La relecture de 002 — Analyse de la qualité

Le fichier `relecture.md` de 002 est un **modèle du genre**. 5 remarques précises :

1. **"quelque chose de ferreux"** → vocabulaire adulte qui stopperait un enfant
2. **"Il était chaud. Chaud du bois du banc."** → ambiguïté syntaxique à la lecture orale
3. **Ten très bref** → contrainte de performance orale signalée
4. **Pas de morale explicite** ✅ validé
5. **Envol de la pie** → risque symbolique si intonation de "fin"

**Ce qui fonctionne très bien** : 8 éléments identifiés, avec citations exactes.

**Verdict :** La qualité de la relecture est **senior-level**. Ce process fonctionne.

### 4.3 Les briefs

| Brief | Qualité | Problème |
|-------|---------|----------|
| `brief-univers.md` | ⭐⭐⭐⭐⭐ Excellent | Fourchette 500-900 mots (conflit avec brief-histoire : 750 max) |
| `brief-personnages-template.md` | ⭐⭐⭐⭐⭐ Excellent | Template clair, concret, sans ennéatype |
| `brief-histoire-template.md` | ⭐⭐⭐⭐⭐ Excellent | Ki-Sho-Ten-Ketsu structuré, angle + libertés + contraintes |

**Constat :** Les briefs sont de **niveau professionnel publishing**. Le problème n'est pas la qualité des templates — c'est l'**adhérence au process de mise à jour**.

---

## 5. Les Forces — Ce qui marche vraiment

### ✅ Le concept de variance stateless/mémoire

> « 4 writers arrivent frais à chaque histoire (aucun biais de session). 1 writer (Claude Ancré) porte la continuité éditoriale et les apprentissages. C'est cette tension stateless / avec-mémoire qui génère la vraie diversité. »

**C'est le cœur battant du process.** Le Writer Ancré a déjà identifié des patterns :
- Les objets portent la résolution (ballon qui roule seul)
- Mémoire thermique des matières ("chaud du bois du banc")
- Dialogues 3-5 mots par réplique

### ✅ Les briefs stateless injectés

Les 3 briefs séparés (univers / personnages / histoire) permettent :
- Mise à jour ciblée de l'univers sans toucher aux personnages
- Réutilisation du brief univers pour toutes les histoires
- Cohérence cross-country (tokens `{{titi_N}}`)

### ✅ Le Keeper PASS/FAIL

8 critères non négociables, verdict binaire. Pas de zone grise.

### ✅ Les voix ElevenLabs par type ennéagramme

18 profils voix (9 types × 2 sexes) avec 4 couches (articulation, prosodie, rythme, phonation). **Personne d'autre ne fait ça.** C'est du transmédia de haut niveau.

### ✅ Le ton littéraire atteint

> « Le rire de Wex est sorti tout seul, comme un éternuement. »

> « Non. Pas de colère dans le mot. Juste le mot. »

C'est de la prose de qualité. Le process produit du **vrai texte**, pas du remplissage LLM.

---

## 6. Les Failles — Audit critique par couche

### 6.1 🔴 Couche Mémoire — DÉFAILLANCE CRITIQUE

| Mémoire | Contenu attendu | Contenu réel | Statut |
|---------|----------------|--------------|--------|
| `memoire-dir.md` | Décisions + histoires validées | 001 seul, 002 absent | ❌ **OBSOLÈTE** |
| `memoire-keeper.md` | Patterns d'erreur récurrents | _(vide)_ | ❌ **VIDE** |
| `memoire-writer-ancre.md` | Histoires écrites + apprentissages | 002 noté "En attente" | ❌ **OBSOLÈTE** |
| `memoire-science.md` | Faits validés | Non audité | ❓ |
| `memoire-sensibilite.md` | Topics sensibles détectés | Non audité | ❓ |

**Impact :** Si le Keeper n'enregistre pas les patterns d'erreur, il valide chaque histoire comme si c'était la première. L'apprentissage organisationnel est **nul**.

### 6.2 🔴 Couche Input — Le goulot d'étranglement

**Canaux d'input :**
- `input-idees/` : fichier par session, convention `YYYY-MM-DD-sujet.md`
- INBOX.md : dump daté des sessions brainstorm
- Sessions chatbot / Telegram (bot à la racine)

**Problème :** 7 fichiers input-idees sont arrivés le 2026-04-27 (~2000 lignes). Le PMO les a scannés mais **NON distillés** :

> « INPUT-001 : distiller les 7 fichiers input-idees — trier par thème (ennéagramme symbolique / JP Petit) » — *sprint-log 2026-04-27, toujours en "À faire"*

**Impact :** L'auteur (toi) est le seul filtre entre l'input brut et le pipeline. Si tu ne dumps pas, rien ne bouge. Le process n'a pas de **veille créative autonome**.

### 6.3 🔴 Couche Agents — Fracture documentaire

**L'agent `narration.md` (Directeur) est obsolète.** Il mentionne encore :
> « Writers (agents séparés — tu leur envoies le brief) : `narration-writer-a` · `narration-writer-b` · `narration-writer-c` »

Mais l'ORGANIGRAMME du 2026-04-28 a basculé sur 5 writers (Kimi, DeepSeek, Grok, Claude Libre, Claude Ancré).

**Conséquence :** Si tu rebootes une session avec l'agent Directeur, il va chercher à utiliser des writers qui n'existent plus.

### 6.4 🟡 Couche Validation — Comité de lecture aléatoire

| Histoire | Comité de lecture | Lecteurs témoins | Keeper |
|----------|-------------------|------------------|--------|
| 001 | ✅ 7 profils + cultures | — | — |
| 002 | ❌ Sauté | ❌ Sauté | ✅ PASS |

**Règle manquante :** *Quand est-ce qu'un comité est obligatoire ?*
- Toutes les histoires ? Non (002 l'a sauté)
- Toutes les 3 histoires ? Non documenté
- Si nouvelle série ? Si nouveau personnage ? Si sujet sensible ?

**Risque :** Une histoire peut passer en canon sans aucun test de réception.

### 6.5 🟡 Couche Physique / Univers — Séparation artificielle

La physique de l'univers est documentée dans deux endroits :
- `docs/narration/univers/vibration.md` → physique des champs, modèle Janus
- `docs/narration/univers/transport.md` → MHD, effet Meissner, particules Janus

**Problème :** Le brief univers mentionne la physique ("La matière = vibration") mais **aucun writer ne reçoit de brief physique spécifique**. La science est dans les notes, pas dans le pipeline.

**Impact :** Les writers ne peuvent pas infuser discrètement des concepts physiques s'ils ne les connaissent pas. Le "modèle Janus" reste dans les notes auteur.

### 6.6 🟡 Couche Complotisme — Non intégré au pipeline

Le Prof d'Histoire (Type 7, ancien complotiste) est documenté dans `univers/ecole.md` et `INBOX.md`. Mais :
- Aucun agent ne vérifie que les histoires ne basculent pas dans le complotisme
- Le rôle `narration-sensibilite` existe mais **n'a pas été utilisé** sur 002
- Les sources sensibilité (`equipe/sources-sensibilite.md`) existent mais ne sont pas injectées dans les briefs

**Risque :** Une histoire pourrait involontairement véhiculer des théories du complot (égrégores, Éveil, etc.) sans que personne ne le signale avant la canonisation.

### 6.7 🟡 Couque Écart / Variance — Pas de mesure

Tu as mentionné "les écarts" dans ta demande. Le process a un **principe de variance** (4 stateless + 1 mémoire) mais :
- Aucune métrique ne mesure la diversité des 5 versions
- Pas de "score d'écart" entre les versions
- Le Directeur choisit "à l'instinct" sans grille de comparaison

**Exemple :** Sur 002, on ne sait pas si DeepSeek et Grok ont produit des angles radicalement différents ou similaires. La synthèse est une boîte noire.

---

## 7. Incohérences documentaires majeures

### 7.1 La fourchette de mots — 3 chiffres différents

| Document | Fourchette |
|----------|-----------|
| `brief-univers.md` | **500 à 900 mots** |
| `brief-histoire-template.md` | Max **750 mots** |
| `memoire-dir.md` | 400-600 mots (3-6 ans) · 600-900 mots (6-9 ans) |
| `pmo/decisions.md` | P2 (4-6 ans) : ~400-700 mots |
| Texte 002 réel | **489 mots** |

**Recommandation :** Fixer une fourchette unique par palier et l'inscrire dans `decisions.md` comme règle définitive.

### 7.2 L'agent Directeur mentionne un workflow à 3 writers

L'agent `.claude/agents/narration.md` (Directeur) décrit :
> « 3 versions → tu synthétises » et « writers A · B · C »

Mais l'ORGANIGRAMME décrit **5 writers** et **6 phases**.

**Recommandation :** Réécrire l'agent `narration.md` pour refléter le process actuel à 5 writers.

### 7.3 Le `skills-map.md` référence encore writers A/B/C

> « `narration-writer-a` — Writer sobre / Kishōtenketsu »  
> « `narration-writer-b` — Writer sensoriel / poétique »  
> « `narration-writer-c` — Writer dynamique / dialogues »

**Recommandation :** Mettre à jour `skills-map.md` avec les nouveaux agents.

### 7.4 Le script `archive-story.js` attend des noms WIP-* qui n'existent pas

```js
// archive-story.js attend : WIP-002-parapluie-oublie
// Réalité : workshop/002-le-rire-qui-reste (sans préfixe WIP)
```

**Recommandation :** Corriger le script ou standardiser les noms de dossier workshop.

### 7.5 Le `generate-index.js` n'écrit pas dans `stories/INDEX.md`

Le script écrit dans `_index/` (by-character, by-theme, etc.) mais `stories/INDEX.md` est resté à la date du 2026-04-26.

**Recommandation :** Faire écrire le script dans `stories/INDEX.md` aussi.

---

## 8. Outils & Automatisation — Vivant ou mort ?

### 8.1 Scripts Node.js

| Script | Fonction | État | Problème |
|--------|----------|------|----------|
| `new-story.js` | Copie gabarit → stories/ | ✅ Opérationnel | Manuel (non appelé par agent) |
| `archive-story.js` | Promouvoir workshop → stories | ⚠️ Bug structurel | Attend préfixe WIP-* inexistant |
| `generate-index.js` | Parse YAML → index | ✅ Parse OK | N'écrit pas dans stories/INDEX.md |

### 8.2 MCP Tools

| Tool | État | Problème |
|------|------|----------|
| `ask_kimi` | ❌ **HS** | Retourne VIDE. Headers corrigés le 2026-04-28 mais non testés depuis. |
| `ask_deepseek` | ✅ OK | Fonctionne |
| `ask_grok` | ✅ OK | Fonctionne |

### 8.3 Hooks

- **INBOX.md** : "hook commit auto sur modif" — non implémenté techniquement (convention seule)
- **`input-idees/`** : convention de nommage respectée

### 8.4 Prompts externes manquants

L'ORGANIGRAMME liste 2 templates manquants :
- [ ] `equipe/prompts-externes/relecteur-kimi.md` — template copier-coller
- [ ] `equipe/prompts-externes/validation-legere.md` — quick pass science/sensibilité

---

## 9. Besoins de recrutement & spécialisation

### 9.1 Profils MANQUANTS (urgent)

#### 1. 🚨 Showrunner / Éditeur de série

**Pourquoi :** La série "La Parole" (002-006) a un brief transversal dans `input-idees/serie-parole-briefs.md`. Mais aucun agent ne garantit la cohérence de la série au-delà du Directeur. Le Writer Ancré a une mémoire d'écriture, pas de vision d'ensemble de la série.

**Mission :** Maintenir la cohérence thématique, vérifier que les callbacks implicites fonctionnent, s'assurer que les personnages évoluent.

**Agent proposé :** `narration-showrunner` (Sonnet, mémoire `memoire-showrunner.md`)

---

#### 2. 🚨 Adaptateur culturel / Localisation

**Pourquoi :** 8 cultures sont mappées, le gabarit a un champ `variantes`, et 001 prévoit 10 variantes. Mais il n'y a qu'un seul fichier `.patch` (`christ.patch`) et **aucun process de production de variantes**.

**Mission :** Adapter les prénoms, les lieux, les détails culturels, les rituels. Valider que le Kishōtenketsu fonctionne dans chaque culture.

**Agent proposé :** `narration-localisation` (Sonnet, mémoire par culture)

---

#### 3. 🚨 Directeur audio / Voix-narration

**Pourquoi :** La relecture de 002 soulève des questions de performance orale :
> « ce passage demande une note de narration orale si l'histoire est enregistrée »  
> « quelle intonation sur 'La pie s'est envolée.' ? »

Les 18 profils voix ElevenLabs existent mais **aucun brief audio** n'est produit.

**Mission :** Produire un brief audio par histoire (rythme, pauses, intonation, voix par personnage).

**Agent proposé :** `narration-audio` (Sonnet)

---

#### 4. 🚨 Art Director / Illustration

**Pourquoi :** Le projet est un "livre illustré pour enfants de 4 ans" mais :
- Le dossier `assets/` du gabarit est vide (`.gitkeep`)
- Aucun agent, brief ni dossier dédié aux images
- Le format "texte-only" a été choisi par défaut ("pas de dessinateur, IA image instable")

**Mission :** Définir le style visuel, les moments d'illustration par histoire, les prompts pour génération IA (ou brief pour illustrateur humain).

**Agent proposé :** `narration-art` (Sonnet)

---

#### 5. 🚨 Vérificateur automatique de contraintes

**Pourquoi :** Le Keeper valide manuellement la longueur, les prénoms, la structure. Mais le script `generate-index.js` pourrait facilement :
- Compter les mots du `texte.md` et comparer au frontmatter YAML
- Vérifier que les prénoms du casting V1 sont respectés
- Détecter les morales explicites (pattern "il comprit que", "ce jour-là", etc.)

**Mission :** Script de pré-validation avant envoi au Keeper.

**Outil proposé :** `scripts/pre-keeper.js`

---

#### 6. 🚨 Agent de feedback parent-enfant (dyade lecture)

**Pourquoi :** Les profils lecteurs couvrent l'enfant seul et le parent seul, mais **pas la dyade lecture** (l'interaction parent qui lit + enfant qui écoute). Or la relecture de 002 identifie des frictions spécifiques à cette situation :
> « l'auditeur contraint d'improviser une explication en pleine lecture »

**Mission :** Simuler la lecture à voix haute et identifier les points de friction parent-enfant.

**Agent proposé :** `narration-lecteur-dyade` (Sonnet)

---

#### 7. 🚨 Data Steward / YAML Validator

**Pourquoi :** Le frontmatter des histoires est riche (8 blocs) mais aucun outil ne valide sa cohérence. Exemple : `enneatype_heros: 9` dans 002 alors que Wex est `hors-systeme` — est-ce une erreur ?

**Mission :** Valider la cohérence du frontmatter à chaque canonisation.

**Outil proposé :** `scripts/validate-frontmatter.js`

---

### 9.2 Profils À SPÉCIALISER

| Rôle actuel | Problème | Spécialisation proposée |
|-------------|----------|------------------------|
| **PMO** | Fait trop de choses (tickets + index + structure) | Séparer **PMO** (tickets/sprint) et **Archiviste** (index/structure/YAML) |
| **Directeur** | Doit tout faire (briefs + synthèse + rédaction + mémoire) | Ajouter un **Rédacteur** qui écrit le canon à partir de la synthèse + relecture |
| **Keeper** | Mémoire vide, pas d'apprentissage | Transformer en **Keeper + Coach** : enregistrer les patterns, proposer des améliorations |

---

### 9.3 Profils À SUPPRIMER / ARCHIVER

| Agent | Raison | Action |
|-------|--------|--------|
| `narration-writer-a` | Remplacé par Claude Libre + externe | Archiver dans `.claude/agents/archive/` |
| `narration-writer-b` | Remplacé par Claude Ancré + externe | Archiver |
| `narration-writer-c` | Remplacé par externe | Archiver |
| `memoire-writer-a.md` | Non utilisé | Archiver dans `equipe/archive/` |
| `memoire-writer-b.md` | Non utilisé | Archiver |
| `memoire-writer-c.md` | Non utilisé | Archiver |

---

## 10. Plan d'action priorisé

### 🔴 URGENT — Semaine 1

| # | Action | Fichier concerné | Responsable |
|---|--------|-----------------|-------------|
| 1 | **Corriger l'agent Directeur** — remplacer writers A/B/C par le process 5 writers | `.claude/agents/narration.md` | Auteur |
| 2 | **Corriger `skills-map.md`** — agents obsolètes → nouveaux | `memory/skills-map.md` | Auteur |
| 3 | **Archiver agents writers A/B/C** | `.claude/agents/` | Auteur |
| 4 | **Mettre à jour `memoire-dir.md`** — ajouter 002 + décisions du 2026-04-28 | `docs/narration/equipe/memoire-dir.md` | Directeur |
| 5 | **Mettre à jour `memoire-writer-ancre.md`** — 002 n'est plus "en attente" | `docs/narration/equipe/memoire-writer-ancre.md` | Writer Ancré |
| 6 | **Enrichir `memoire-keeper.md`** — patterns détectés sur 001 et 002 | `docs/narration/equipe/memoire-keeper.md` | Keeper |
| 7 | **Fixer la fourchette de mots unique** — P2 = 400-700 mots (aligner brief-univers) | `docs/narration/equipe/brief-univers.md` + `pmo/decisions.md` | Directeur |
| 8 | **Corriger `archive-story.js`** — retirer préfixe WIP-* | `scripts/archive-story.js` | Dev |
| 9 | **Réparer MCP Kimi** — tester après fix headers | `mcp/server.ts` | Dev |
| 10 | **Créer règle comité de lecture** — quand obligatoire ? | `docs/narration/equipe/ORGANIGRAMME.md` | Directeur |

### 🟡 IMPORTANT — Semaine 2-3

| # | Action | Fichier concerné | Responsable |
|---|--------|-----------------|-------------|
| 11 | Créer `scripts/pre-keeper.js` — vérification auto longueur, prénoms, patterns morale | `scripts/` | Dev |
| 12 | Créer `scripts/validate-frontmatter.js` — cohérence YAML | `scripts/` | Dev |
| 13 | Créer template `relecteur-kimi.md` | `docs/narration/equipe/prompts-externes/` | Directeur |
| 14 | Créer template `validation-legere.md` | `docs/narration/equipe/prompts-externes/` | Directeur |
| 15 | Intégrer `generate-index.js` → `stories/INDEX.md` | `scripts/generate-index.js` | Dev |
| 16 | Créer agent `narration-showrunner` | `.claude/agents/` | Auteur |
| 17 | Créer agent `narration-audio` | `.claude/agents/` | Auteur |
| 18 | Distiller les 7 fichiers `input-idees/` | `docs/narration/input-idees/` | PMO |
| 19 | Créer brief physique optionnel pour writers | `docs/narration/equipe/` | Science |
| 20 | Documenter quand utiliser `narration-sensibilite` | `docs/narration/equipe/ORGANIGRAMME.md` | Directeur |

### 🟢 AMÉLIORATION — Mois 2

| # | Action | Fichier concerné | Responsable |
|---|--------|-----------------|-------------|
| 21 | Créer process de localisation (variantes culturelles) | `docs/narration/stories/_gabarit/variantes-culturelles/` | Localisation |
| 22 | Créer brief illustration par histoire | `docs/narration/equipe/` | Art Director |
| 23 | Créer agent `narration-lecteur-dyade` | `.claude/agents/` | Directeur |
| 24 | Mettre en place hook commit auto sur INBOX.md | `.github/workflows/` ou git hooks | Dev |
| 25 | Tester comité de lecture sur 003 avec nouvelle règle | `docs/narration/stories/003-*/comite-lecture/` | Directeur |

---

## Annexe A — Checklist de validation d'une histoire (résumé)

```
□ Input-idee → ticket PMO créé
□ 3 briefs produits (univers + personnages + histoire)
□ 5 writers appelés (ou 4 si Kimi HS)
□ 5 versions reçues et loggées
□ Synthèse produite
□ Relecture Kimi + Claude → relecture.md
□ Version finale → version-finale.md
□ Lecteurs témoins (si nouvelle série / nouveau perso / sujet sensible)
□ Keeper PASS → keeper-verdict.md
□ Texte canon → stories/NNN-slug/texte.md
□ Frontmatter YAML cohérent
□ Mémoires mises à jour (dir + writer-ancre + keeper)
□ Index régénéré (_index/ + stories/INDEX.md)
□ Session archivée → archive/YYYY-MM-DD-<titre>.md
□ Ticket PMO fermé
```

---

## Annexe B — Récapitulatif des 15 questions ouvertes

| # | Question | Bloquant ? | Priorité audit |
|---|----------|-----------|----------------|
| 1 | Nom de l'univers | Non | Faible |
| 2 | Forme des compagnons | Non | Moyenne |
| 3 | Éléments magiques rares | Non | Moyenne |
| 4 | Prénom "Trump" du Baron | Non | Faible |
| 5 | Ombre Éternelle | Non | Faible |
| 6 | Modèle Janus | Non | Moyenne |
| 7 | Nom du prof d'Histoire | Non | Faible |
| 8 | Nom des axes verts | Non | Faible |
| 9 | Ponaire (transport) | Non | Moyenne |
| 10 | Nombre de villes max | Non | Faible |
| 11 | Sous-types des sensibilités | Non | Faible |
| 12 | Wex contrôle Vision causale (S1/S2/S3) | Non | **Haute** — impacte arcs |
| 13 | Mentor de Wex | Non | **Haute** — impacte S2 |
| 14 | Castings cross-country — lequel en premier ? | **Oui pour S2** | **URGENT** |
| 15 | Mémoire narrative des lecteurs — callbacks implicites | Non | **Haute** — lié au Showrunner |

---

*Audit terminé. 40+ documents analysés. 2 textes canon évalués. 25 actions priorisées.*
