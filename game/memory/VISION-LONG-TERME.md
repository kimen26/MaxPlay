---
name: Vision long terme pôle JEU MaxPlay
description: Hypothèses, ambitions et chantiers futurs - à graver pour que les agents futurs puissent les consulter sans qu'on doive coder maintenant. Distinct du BACKLOG (tactique) et state.md (instantané).
type: project
---

> **Pourquoi ce fichier** : capturer les **hypothèses long terme** et **ambitions** du pôle JEU pour que les agents et sessions futures aient le contexte sans devoir reconstruire la vision.
> Distinct de `BACKLOG.md` (tickets tactiques) et `state.md` (état instantané). À lire pour comprendre **où on veut aller**, pas **ce qu'on fait demain matin**.
>
> **Garant** : `game-pmo` (peut ajouter une hypothèse en cours de session, lecture par tous les agents game-*).
> **Dernière mise à jour** : 2026-05-11

---

## 🗺️ Cartographie cible du pôle JEU (vision 2026-05-11)

```
PÔLE JEU
│
├── 🎮 MINI-JEUX HTML (mj-XX)
│   État : **23 actifs** (mise à jour 2026-05-14 post-MJ-21 déploiement; mj-02/03/07/10 retirés), pipeline stabilisé
│   Règles UX/péda/audio/graphique très denses (voir rules.md + stack.md)
│   Équipe : game-dev (sachant) + game-mj-pmo + game-mj-reviewer
│
├── 🗺️ WEXWORLD / Max Adventure
│   État : EMBRYONNAIRE (Phaser + Vite + TS strict, quartier 16×12, scene Hub + Sandbox)
│   Sous-chantiers :
│     a) Maps tile : pipeline complet ✅ (simplifier/designer/reviewer + tile-pmo)
│     b) Jeu lui-même : à structurer (vision Pokemon Gameboy-like)
│   Équipe future : game-wexworld-designer + game-wexworld-tester + game-wexworld-pmo
│
└── 🤝 CONSEILLER (transverse)
    État : à créer
    Rôle : voix de Papa Yann, force de proposition, challenge des idées, suivi retours Max
    Modèle : Opus (réflexion produit profonde)
```

---

## 🎯 Vision WexWorld — "Pokemon Gameboy-like" pour Max

**Référence visuelle/UX** : Pokemon Gameboy (rouge/bleu/jaune)
- Vue top-down avec personnage qui bouge case par case
- Monde explorable structuré en zones connectées
- Progression par collection (capture pokemons → équivalent ici à débloquer véhicules/animaux/lieux)
- Quêtes courtes contextualisées par PNJ
- Inventaire / journal de bord
- Save system simple

**Adaptation MaxPlay** :
- Personnage joueur = Wex (le doudou hors-système de la narration) — c'est lui qui se balade dans le monde
- Zones = lieux du Hub Ville (Dépôt bus, Musée Dinos, Mur Drapeaux, École Chiffres + futurs Piscine/Gare/Aéroport)
- "Pokémons" à collecter = véhicules RATP (lignes métro 1-14, trams T1-T13, bus iconiques, RER A/B/C) + dinosaures + drapeaux
- PNJ = personnages narration (Melki, Mimi, Dadou, Madie, Lulu, Pierrot, Raph, Juju, Nono) → **pont narration↔jeu**
- Quêtes = mini-jeux contextualisés (les MJ existants insérés comme quêtes dans le monde)
- Inventaire = le Garage (core loop déjà conçu dans rules.md)

→ **Le jeu devient le conteneur unifié** : MJ + narration + collection dans un monde explorable.

**Bénéfice pédagogique** :
- Agentivité (Max choisit où aller)
- Narration émergente (Max raconte ses propres aventures avec Wex)
- Espacement naturel (sessions courtes, retour quand il veut)
- Collection visible (motivation intrinsèque sans gamification toxique)

---

## 🌉 Hypothèse — Pont narration ↔ jeu

**Vision** : les histoires canon du pôle NARRATION pourraient être **jouées** dans WexWorld, pas juste lues/écoutées.

**Mécanisme imaginé** :
- Une histoire canon (ex `001-le-pont-casse`) devient une **mini-zone WexWorld** où Wex revit l'histoire
- Les dialogues sont les répliques tokenisées du texte canon ({{ wex }}, {{ titi_N }})
- Les ennéatypes des personnages se traduisent en comportements PNJ dans le jeu
- Les cross-culture variants permettent une version brésilienne / japonaise du même monde

**Conséquence design** :
- Le texte canon doit rester **portable** (tokens Jinja, déjà décidé Phase C 2026-05-11)
- Les voix ElevenLabs des personnages servent **dans le jeu aussi** (pas juste audio histoires)
- Le pôle narration et le pôle jeu deviennent **interdépendants**

**À ne PAS faire trop tôt** : forcer le pont sans avoir solidifié les deux côtés séparément. D'abord stabiliser WexWorld base, puis intégrer une 1ère histoire en mode pilote.

### Préparation du pont — prérequis canon avant adaptation jeu

*(Section ajoutée 2026-05-11 suite à challenge réciproque narration-pmo OBS-5 CRITIQUE)*

Pour qu'une histoire canon soit "prête pour adaptation WexWorld", elle doit satisfaire **6 critères** avant qu'un gate "adaptation jeu ?" puisse être franchi :

| # | Prérequis | Vérifié par | Source |
|---|---|---|---|
| 1 | **Tokens Jinja figés** dans `texte.md` (`{{ wex }}`, `{{ titi_N }}`) | narration-pmo (Phase C tranchée 2026-05-11) | `decisions.md` Phase C |
| 2 | **Ennéatypes des PNJ gravés** dans `personnages/type-NN/` (pour traduction comportements en jeu) | narration-archiviste | `personnages/INDEX.md` |
| 3 | **Dialogues suffisamment courts** pour UX mobile / dialogue box jeu (lignes < 80 chars idéal) | narration-gatekeeper | `equipe/patte-papa-yann.md` |
| 4 | **Voix ElevenLabs générées** (au moins narrateur + PNJ principaux) | narration-audio | `personnages/voix-meta/` + `stories/<NNN>/audio/` |
| 5 | **Variantes cross-culture** identifiées (au moins FR figé, autres optionnels) | narration-localisation | `cross-culture/castings-nationaux/` |
| 6 | **Lieu(x) de l'histoire mappable** dans WexWorld (zone existante ou à créer) | game-conseiller + game-tile-simplifier | `univers/INDEX.md` + future map LimeZu |

**Protocole de hand-off futur** (à activer en Phase 2 quand WexWorld est mature) :

```
narration-pmo (histoire canonisée étape 10)
  → vérifie 6 critères ci-dessus
  → si tous ✅ : crée ticket dans BACKLOG narration "ADAPT-JEU-NNN : histoire X prête pour WexWorld"
  → alerte game-pmo
        ↓
  game-pmo lit le ticket
  → invoque game-conseiller pour proposer l'adaptation (zone, mécaniques, dialogues)
  → game-wexworld-designer (Phase 2) conçoit la scène
  → game-wexworld-tester valide
  → user valide
  → game-pmo grave la dépendance bidirectionnelle dans state.md + BACKLOG.md
  → narration-pmo grave côté narration "histoire X intégrée WexWorld" dans sprint-log.md
```

**SLA suggéré (à valider Phase 2)** : 3 jours entre canon étape 10 et création ticket ADAPT-JEU. Au-delà → kanban narration en 🟡 (rappel, pas blocage car optionnel).

**Pourquoi maintenant** : narration-pmo a alerté que sans gate explicite, on découvrirait une dépendance cachée dans 3 mois lors de la 1ère intégration. Mieux vaut graver les prérequis maintenant tant que les deux pôles évoluent en parallèle.

---

## 📱 Hypothèse — App mobile à terme

**Pourquoi HTML c'est limité** :
- Audio web parfois capricieux (autoplay, AudioContext, cache)
- Pas d'accès offline propre
- Pas de notifications, pas de save cloud
- TTS web ≠ TTS embarqué (qualité, voix)
- Diffusion grand public via App Store + Play Store nécessite app

**Pistes techniques (à challenger plus tard)** :
- **Capacitor** (Ionic) — wrapper natif du web actuel, plus simple
- **Expo / React Native** — réécriture mais plus performant
- **Flutter** — réécriture totale mais beau et perf
- **PWA enrichie** — entre web et natif, sans app store

**Gestion audio mobile** :
- TTS embarqué (iOS speech, Android TTS) → pas de voix ElevenLabs en temps réel mais voix neutre OK
- Voix générées hors ligne (ElevenLabs export MP3 packagées avec l'app)
- Stratégie hybride : voix critiques (narrateurs, persos clés) en MP3 packagés, TTS embarqué pour le reste

**Bloquant aujourd'hui** : aucun budget mobile dev (pas urgent). Le projet vit très bien en HTML+Phaser pour Max sur tablette familiale.

**Quand reconsidérer** :
- Si on veut tester avec d'autres enfants (cousins, classe Montessori) → distribuer un APK / TestFlight
- Si on veut diffuser grand public → App Store + monétisation (cf. `project_business_plan_narration.md` : piste X Creator Subscriptions)

---

## 🌍 Hypothèse — Diffusion grand public

**Pistes monétisation déjà notées** :
- Abonnement (4-9€/mois, modèle Khan Academy Kids / Lingokids)
- Communauté par culture (lien `feedback_business_plan_narration` — X Creator Subscriptions)
- One-shot (pack histoires + jeu, modèle livre numérique enrichi)

**Public cible élargi** :
- 4-7 ans (Max + sa cohorte)
- Multi-culture (8 cultures cibles déjà identifiées : USA, DE, CN, NG, JP, MA, BR, RU)
- Parents EdTech-aware (Montessori, neurosciences enfance)

**Différenciateurs** :
- Anti-gamification toxique (pas de streak < 7 ans, pas de classement, pas de récompenses promises)
- Multi-culture native (pas un add-on)
- Pont narration↔jeu (rare dans l'industrie)
- Pédagogie ancrée Chabreuil (ennéagramme) + Vygotsky + Bachelard

**Bloquant** : pas de stratégie marketing, pas de roadmap business validée. À considérer si Max + cercle proche valident le concept.

---

## 📋 Liste des hypothèses à tester (suivi)

| ID | Hypothèse | Validation | Statut |
|---|---|---|---|
| H-LT-001 | WexWorld Pokemon-like fonctionne pour 3.5 ans (vs trop complexe) | Tester quartier 16×12 avec navigation case par case + 1 PNJ | ⏳ Phase 2 |
| H-LT-002 | Le pont narration↔jeu est implémentable avant friction excessive | Pilote : intégrer histoire 001 comme mini-zone WexWorld | ⏳ Après Phase 2 |
| H-LT-003 | Voix ElevenLabs packagées en MP3 viables pour app mobile | POC d'extraction batch + intégration dans build | ⏳ Avant app mobile |
| H-LT-004 | Stratégie hybride TTS embarqué + MP3 packagés tient pour 8 cultures | À tester si app mobile lancée | ⏳ Long terme |
| H-LT-005 | Abonnement 4-9€/mois soutenable pour parents EdTech | Étude de marché + tests friction prix | ⏳ Avant diffusion |

---

## 🚦 Règles de mise à jour de ce fichier

- **Ajouter** une hypothèse quand on en formule une dans une session (sans devoir la coder)
- **Mettre à jour** le statut quand on commence à la tester
- **Archiver** (déplacer dans `_archive/`) quand l'hypothèse est tranchée (validée ou rejetée)
- **Ne pas mélanger** avec BACKLOG (tactique court terme) ni state.md (instantané)

---

## 🔗 Liens

- [`memory/state.md`](./state.md) — état instantané pôle JEU
- [`game/tasks/BACKLOG.md`](../tasks/BACKLOG.md) — tickets tactiques
- [`game/memory/rules.md`](./rules.md) — règles UX/péda non-négociables
- [`game/memory/stack.md`](./stack.md) — stack technique
- [`game/web/tile-tools/PIPELINE-MEMORY.md`](../web/tile-tools/PIPELINE-MEMORY.md) — méta-process pipeline tile
- [`game/web/PIPELINE-MEMORY-MJ.md`](../web/PIPELINE-MEMORY-MJ.md) — méta-process pipeline mini-jeux (créé 2026-05-11)
- [`studio/narration/INDEX.md`](../../studio/narration/INDEX.md) — pôle narration (pour le futur pont narration↔jeu)
