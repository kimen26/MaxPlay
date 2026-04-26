# 🗺️ MaxPlay — Project Tour

> **Carte interactive du projet.** Pour débutants, contributeurs, et agents IA.  
> **Règle d'or :** Ce fichier agrège et pointe vers les sources. Il ne duplique pas leur contenu.  
> **Dernière mise à jour :** 2026-04-26

---

## 📍 Tu es ici

```
MaxPlay/
├── game/           ← Max Adventure (Phaser 3 — bac à sable 2D)
├── game-html/      ← 18 mini-jeux HTML vanilla (ce que Max joue)
├── bot/            ← Bot Telegram (permissions, routing, historique)
├── docs/           ← Toute la documentation (jeu, narration, univers)
├── memory/         ← Mémoire projet globale
├── scripts/        ← Outils (new-story, generate-index, archive-story)
└── tasks/          ← BACKLOG.md (tâches techniques)
```

**Ce document couvre 4 univers :** 🎮 Jeu · 📖 Narration · 🤖 Bot · ⚙️ Technique

---

## A. Vue d'ensemble

### A1. Qu'est-ce que MaxPlay ? (3 niveaux)

**Pour un enfant de 4 ans (Max)**  
C'est un téléphone avec des jeux de bus. Tu reconnais les couleurs, tu comptes les passagers, tu trouves les pays sur une carte. Quand tu réussis, il y a des confettis et le bus fait "vroum". Il y a aussi une grande carte où tu peux faire rouler un bus partout.

**Pour un parent**  
MaxPlay est une plateforme éducative en ligne (gratuite, sans pub) qui accompagne Max dans son apprentissage du quotidien — couleurs, chiffres, lecture, logique — à travers des mini-jeux sur le thème des transports en commun (RATP/IDFM). Les jeux s'adaptent à son rythme. Un suivi parental permet de voir sa progression. Des histoires courtes (bientôt audio) complètent l'univers.

**Pour un développeur**  
MaxPlay est un monorepo multi-pôles :
- **Pôle Jeu** : 18 mini-jeux HTML vanilla (ES6, zero framework) + 1 sandbox Phaser 3/Vite/TS
- **Pôle Narration** : Équipe éditoriale multi-agent (7 agents) produisant des histoires courtes cross-culture
- **Pôle Bot** : Bot Telegram (Bun/Grammy) servant de permission gateway et de routing pour Claude Code
- **Pôle Infra** : GitHub Pages statique, CI/CD GitHub Actions, localStorage (pas de backend)

### A2. Architecture globale

```
┌─────────────────────────────────────────────────────────────┐
│                     UTILISATEUR                             │
│  (Max 4 ans sur tablette · Parent sur suivi.html · Dév)    │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
    ┌──────────▼──────────┐      ┌───────────▼────────────┐
    │   game-html/        │      │   docs/ (narration)    │
    │   18 mini-jeux      │      │   Histoires · Univers  │
    │   HTML + JS vanilla │      │   Personnages · Agents │
    └──────────┬──────────┘      └───────────┬────────────┘
               │                              │
    ┌──────────▼──────────┐      ┌───────────▼────────────┐
    │   game/ (Phaser)    │      │   .claude/agents/      │
    │   Max Adventure     │      │   7 agents narration   │
    │   Vite + TypeScript │      │   3 agents jeu/bot     │
    └──────────┬──────────┘      └───────────┬────────────┘
               │                              │
    ┌──────────▼──────────────────────────────▼────────────┐
    │                  GitHub Pages                        │
    │           (statique, HTTPS, gratuit)                 │
    └──────────────────────────────────────────────────────┘
               │
    ┌──────────▼──────────┐
    │   bot/ (Telegram)   │
    │   Bun + Grammy      │
    │   Routing agent     │
    └─────────────────────┘
```

### A3. Comment naviguer dans ce dépôt ?

| Tu cherches... | Va dans... | Fichier clé |
|---------------|-----------|-------------|
| Une histoire canon | `docs/narration/stories/` | `stories/001-le-pont-casse/README.md` |
| Une idée d'histoire à écrire | `docs/narration/histoires/` | `axes-histoires-en-stock.md` |
| Le casting des personnages | `docs/narration/personnages/` | `INDEX.md` |
| Les règles de l'univers | `docs/narration/univers/` | `monde.md` |
| Un mini-jeu | `game-html/mj-*.html` | `index.html` (menu) |
| Les specs des jeux | `docs/jeux/` | `GAMES_SPECS.md` |
| Le backlog technique | `tasks/` | `BACKLOG.md` |
| La mémoire globale | `memory/` | `MEMORY.md` |
| Un agent IA | `.claude/agents/` | `narration.md` (Directeur) |
| Les décisions éditoriales | `docs/narration/editorial-board/` | `decisions.md` |
| Les index transversaux | `docs/narration/_index/` | `by-character.md` |

---

## B. Écosystème Narration

### B1. Les histoires — Canon & Stock

#### Histoires canon (écrites et validées)

| # | Titre | Personnages | Type | Palier | Mots | Statut | Dossier |
|---|-------|-------------|------|--------|------|--------|---------|
| 001 | **Le Pont Cassé** | Wex · Melki (Titi1) · Juju (Titi8) | Unit | P2 | ~750 | ✅ Canon — V2 à faire | [`stories/001-le-pont-casse/`](../narration/stories/001-le-pont-casse/) |

> **1 histoire canon sur 15 idées inventoriées.**

#### Axes en stock (non encore écrits)

**Unitaires (1 par personnage) —** Voir [`histoires/axes-histoires-en-stock.md`](../narration/histoires/axes-histoires-en-stock.md)

| Axe | Perso central | Titi | Objet | Statut |
|-----|--------------|------|-------|--------|
| H-01 | Wex + Melki + Juju | 1, 8 | Pont | ✅ Écrit |
| H-02 | Mimi | 2 | Parapluie | ❌ Rejetée V2 — sujet perdu |
| H-03 | Polo | 3 | ? | 💡 Idée |
| H-04 | Jérem | 4 | ? | 💡 Idée |
| H-05 | Lulu | 5 | ? | 💡 Idée |
| H-06 | Pierrot | 6 | ? | 💡 Idée |
| H-07 | Raph | 7 | ? | 💡 Idée |
| H-08 | Wex + Juju | 8 | ? | 💡 Idée (incarné dans H-01) |
| H-09 | Nono | 9 | ? | 💡 Idée |
| H-10 | ? | — | ? | 💡 Idée |

**Transversaux (multi-persos) —**

| Axe | Thème | Persos | Statut |
|-----|-------|--------|--------|
| T-01 | Pluie | À définir | 💡 Idée |
| T-02 | ? | À définir | 💡 Idée |
| T-03 | ? | À définir | 💡 Idée |
| T-04 | ? | À définir | 💡 Idée |
| T-05 | ? | À définir | 💡 Idée |

#### Pipeline de création (11 étapes)

```
1. Choisir un axe dans axes-histoires-en-stock.md
        ↓
2. Valider la grille de candidature (8 critères)
        ↓
3. Créer un ticket dans editorial-board/backlog.md
        ↓
4. Le Directeur produit le brief (orchestration.md)
        ↓
5. Writers A/B/C écrivent 3 versions indépendantes
        ↓
6. Le Directeur synthétise (synthesis.md)
        ↓
7. Experts Science + Sensibilité valident
        ↓
8. Comité de lecture (7 profils + 8 cultures)
        ↓
9. Keeper valide (checklist 6 items) → PASS/FAIL
        ↓
10. Copie dans stories/NNN/ → canon
        ↓
11. Variantes culturelles (patchs)
```

---

### B2. Les personnages

**Casting V1 "Christ" — figé le 2026-04-24**

| # | Surnom | Prénom complet | Type | Essence | Meilleur ami | Histoire dédiée |
|---|--------|---------------|------|---------|--------------|-----------------|
| — | **Wex** | — | Hors-système | Observateur | Raph / Juju | H-01 (Pont Cassé) |
| 1 | **Melki** | Melchisédech | Titi1 | Être bon·ne | Pierrot | H-01 |
| 2 | **Mimi** | Marie F | Titi2 | Être aimée | Nono | — |
| 3 | **Polo** | Paul | Titi3 | Être valorisé | — | — |
| 4 | **Jérem** | Jérémie | Titi4 | Être soi-même | Lulu | — |
| 5 | **Lulu** | Luc | Titi5 | Comprendre | Jérem | — |
| 6 | **Pierrot** | Pierre | Titi6 | Avoir du soutien | Melki | — |
| 7 | **Raph** | Raphaëlle F | Titi7 | Être comblée | Wex | — |
| 8 | **Juju** | Judith F | Titi8 | Être forte | Wex | H-01 |
| 9 | **Nono** | Noé | Titi9 | La paix | Mimi | — |

> **3 personnages sur 10 ont une histoire dédiée.**  
> **Règle :** Wex apparaît dans (presque) toutes les histoires comme témoin/relieur.

---

### B3. Thèmes & valeurs déjà couverts

| Thème | Histoire | Personnages |
|-------|----------|-------------|
| Collaboration | Pont Cassé | Wex + Melki + Juju |
| Réparation / causalité | Pont Cassé | Juju (initie) + Melki (mesure) |
| Courage | Pont Cassé | Juju |
| Minutie | Pont Cassé | Melki |
| Voire sans juger | Pont Cassé | Wex |

**Trous thématiques identifiés** (aucune histoire ne couvre encore) :
- Amitié / loyauté (Pierrot Titi6)
- Créativité / originalité (Jérem Titi4)
- Empathie / rejet (Mimi Titi2)
- Joie / fuite (Raph Titi7)
- Harmonie / conflit (Nono Titi9)
- Science / compréhension (Lulu Titi5)
- Image / valeur (Polo Titi3)

---

### B4. Variantes culturelles

| Culture | Statut | Patch | Histoires |
|---------|--------|-------|-----------|
| Christ (base) | ✅ Disponible | [`christ.patch`](../narration/stories/001-le-pont-casse/variantes-culturelles/christ.patch) | 1 |
| Japonais | ⚪ Prévu | — | 0 |
| Swahili | ⚪ Prévu | — | 0 |
| Maghrébin | ⚪ Prévu | — | 0 |
| Africain | ⚪ Prévu | — | 0 |
| Asiatique | ⚪ Prévu | — | 0 |
| Nordique | ⚪ Prévu | — | 0 |
| Latino | ⚪ Prévu | — | 0 |
| Germanique | ⚪ Prévu | — | 0 |
| Slave | ⚪ Prévu | — | 0 |
| Anglo | ⚪ Prévu | — | 0 |

> **0 variante cross-country publiée.** Le système de patch est prêt, aucune variante n'a encore été produite.

---

### B5. Décisions éditoriales en suspend

| # | Question | Date posée | Bloquant ? |
|---|----------|-----------|------------|
| 1 | **Nom de l'univers** — 5 finalistes, lequel choisir ? | 2026-04-17 | 🟡 Moyennement |
| 2 | **Compagnons** — forme exacte ? Apparaissent dans quelles histoires ? | 2026-04-17 | 🟡 Moyennement |
| 3 | **Magie architecturale** — garder les éléments magiques (vélos volants, maisons changeantes) comme rares ou écarter ? | 2026-04-17 | 🟡 Moyennement |
| 4 | **Baron** — garder "Trump" ou renommer ? | 2026-04-17 | 🟢 Faible |
| 5 | **Boss final** — Ombre Éternelle oui/non ? | 2026-04-17 | 🟢 Faible |
| 6 | **Modèle Janus** — référence discrète (parents) ou assumée dans le lore ? | 2026-04-17 | 🟢 Faible |
| 7 | **Format album** — tranché : PAS d'album illustré, texte-only + 1-2 illus max | 2026-04-26 | ✅ Tranché |
| 8 | **Paliers d'âge** — P1/P2/P3 définis | 2026-04-26 | ✅ Tranché |
| 9 | **Wex** — observateur sans ennéatype, confirmé | 2026-04-26 | ✅ Tranché |

> **3 décisions bloquent l'écriture des histoires suivantes :** nom de l'univers, compagnons, niveau de magie.

---

### B6. Sciences référencées dans l'univers

| Domaine | Où | Détails |
|---------|-----|---------|
| **Physique (ondes)** | `univers/vibration.md` | Matière = vibration, émotions = fréquences, métaphore radio |
| **Physique (antimatière)** | `univers/vibration.md` | Modèle Janus (Jean-Pierre Petit), égrégores dans antimatière |
| **Biologie (archétypes)** | `univers/vibration.md` | Animaux = archétypes inscrits (abeille, oiseaux migrateurs) |
| **Biologie (quotidien)** | `univers/monde.md` | Alimentation, sommeil, repas, carnivore/herbivore |
| **Écologie** | `univers/monde.md` | Nature rééquilibrée post-Éveil, énergie solaire gratuite |
| **Astronomie / Cosmologie** | `univers/grand-cycle.md` | Cycle 22 000 ans, Yugas, trou noirs = égrégores cosmiques ? |
| **IA / Éthique** | `univers/monde.md` | IA thérapeutique → fusion avec l'éther |
| **Neuroscience (attention)** | `univers/vibration.md` | Attention collective = amplitude, bridage de la perception |

> **Note :** Toutes ces sciences sont traitées en **implicite** dans les histoires. Le lecteur de 4 ans ne les voit pas, le parent peut les deviner.

---

## C. Écosystème Jeu

### C1. Les mini-jeux

| # | Fichier | Nom affiché | Statut | TTS | Tracking | Lignes |
|---|---------|-------------|--------|-----|----------|--------|
| 1 | `mj-01.html` | Quiz Bus (mix) | ✅ Actif | ✅ | ✅ | ~383 |
| 4 | `mj-04.html` | Compte les passagers | ✅ Actif | — | ✅ | ~210 |
| 5 | `mj-05.html` | La bonne place | ✅ Actif | — | ✅ | ~434 |
| 6 | `mj-06.html` | Lis la phrase | ✅ Actif | ✅ | ✅ | ~335 |
| 8 | `mj-08.html` | Au centre bus | ✅ Actif | — | ✅ | ~803 |
| 9 | `mj-09.html` | Trie les bus ! | ✅ Actif | — | ✅ | ~617 |
| 11 | `mj-11.html` | Quel pays ? | ✅ Actif | ✅ | ✅ | ~761 |
| 12 | `mj-12.html` | Nouveaux sons | 🧪 Dev | — | ✅ | ~431 |
| 13a | `mj-13a.html` | Le premier bus | ✅ Actif | — | ❌ | ~435 |
| 13b | `mj-13b.html` | Monte dans le bus ! | ✅ Actif | — | ❌ | ~410 |
| 13c | `mj-13c.html` | Combien avant ? | ✅ Actif | — | ❌ | ~445 |
| 14 | `mj-14.html` | La grille des bus | ✅ Actif | — | ✅ | ~836 |
| 15 | `mj-15.html` | L'intrus | ✅ Actif | — | ✅ | ~554 |
| 16 | `mj-16.html` | Complète la suite | ✅ Actif | — | ✅ | ~663 |
| 17 | `mj-17.html` | Le garage | ✅ Actif | — | ❌ | ~738 |
| 18 | `mj-18.html` | Tubes de couleurs | ✅ Actif | — | ✅ | ~415 |
| 19 | `mj-19.html` | Trouve le bus ! | ✅ Actif | — | ✅ | ~274 |
| 20 | `mj-20.html` | Compte en 8 langues | ✅ Actif | ✅ | ✅ | ~613 |
| ★ | `max-adventure.html` | Max Adventure | ✅ Actif (Phaser) | — | — | ~92 |
| 🦕 | `dev-dinos.html` | Dino Lab | 🧪 Dev-only | — | — | ~619 |
| 🛠 | `dev-lab.html` | Dev Lab | 🧪 Dev-only | — | — | ~858 |

> **18 mini-jeux actifs** dont 4 sans tracking (`mj-13a/b/c`, `mj-17`).  
> **3 pages dev** exposées (dont 2 dans le menu).

### C2. Jeux orphelins / disparus

| Ancien # | Nom | Sort | Cause |
|----------|-----|------|-------|
| MJ-02 | Quel numéro ? | ❌ Supprimé | Fusion dans MJ-01 (quiz mix) |
| MJ-02b | Devine le numéro (TTS) | ❌ Supprimé | Idem |
| MJ-03a | Compte les passagers | → Renommé MJ-04 | Renumérotation session 9 |
| MJ-03b | La bonne place | → Renommé MJ-05 | Renumérotation session 9 |
| MJ-05 | Terminus | ❌ Disparu | Destination/itinerary |
| MJ-07 | La journée de Max | → `max-adventure.html` | Devenu sandbox Phaser |
| MJ-10 | Tableau de bord sons | → Renommé MJ-12 | Renumérotation |
| MJ-13-proto | Arrêt de bus proto | ❌ Supprimé | Remplacé par 13a/b/c |

> **⚠️ `docs/jeux/GAMES_SPECS.md` reflète encore l'ancienne numérotation.**

### C3. Stack technique

| Couche | Techno | Détail |
|--------|--------|--------|
| Jeux vanilla | HTML5 + ES6 | Zero framework, zero bundler |
| Sandbox | Phaser 3.87 + TS | Vite 5.2, build → `game/dist/` |
| Style | CSS inline | 150-400 lignes de `<style>` par jeu |
| SVG | `js/bus-svg.js` | Bus dynamiques couleur/numéro |
| Audio | Web Audio API | `js/sounds.js`, synthèse 8-bit |
| TTS | Web Speech API | Voix système fr-FR, rate 0.85-0.95 |
| Data | JS globaux | `js/data.js` (26 lignes), `js/idfm.js` (362 lignes) |
| Tracking | localStorage | `js/tracker.js`, 200 sessions max |
| Bot | Bun + Grammy | Port 3001, routing agent auto |
| CI/CD | GitHub Actions | Deploy sur GH Pages |
| Hébergement | GitHub Pages | Statique, HTTPS, gratuit |

---

## D. Écosystème Agents & Mémoires

### D1. Qui fait quoi ?

**Équipe éditoriale (narration)**

| Agent | Rôle | Modèle | Mémoire |
|-------|------|--------|---------|
| `narration` | **Directeur Éditorial** — challenge, briefs, synthèse, comité | Opus | `equipe/memoire-dir.md` |
| `narration-writer-a` | Writer sobre, Kishōtenketsu strict | Sonnet | `equipe/memoire-writer-a.md` |
| `narration-writer-b` | Writer sensoriel, poétique | Sonnet | `equipe/memoire-writer-b.md` |
| `narration-writer-c` | Writer dynamique, dialogues | Sonnet | `equipe/memoire-writer-c.md` |
| `narration-science` | Expert sciences/biologie | Haiku | `equipe/memoire-science.md` |
| `narration-sensibilite` | Veille topics sensibles | Sonnet | `equipe/memoire-sensibilite.md` |
| `narration-keeper` | Validation finale (checklist) | Haiku | `equipe/memoire-keeper.md` |
| `narration-archiviste` | Structure, index, cohérence | Haiku | *(nouveau)* |

**Équipe technique**

| Agent | Rôle | Modèle |
|-------|------|--------|
| `game-dev` | Développement jeux | — |
| *(implicite)* | CI/CD + déploiement | — |

### D2. Comment solliciter un agent ?

**Exemple — Demander au Directeur un brief :**
```
@narration (Opus)
> Je veux ouvrir le ticket STORY-002 (H-02 — Mimi / parapluie).
> La V1 a été rejetée (sujet perdu, trop décorative).
> Produis un nouveau brief d'orchestration pour H-02 v2.
> Contraintes : P2, Kishōtenketsu, univers implicite, objet = parapluie.
```

**Exemple — Demander à l'archiviste l'état du stock :**
```
@narration-archiviste (Haiku)
> Régénère les index et liste les histoires où Juju (Titi8) apparaît.
> Vérifie que tous les modules ont un texte.md et un README.md.
```

---

## E. Index transversaux & FAQ

### E1. Où trouver... ?

| Je cherche... | Fichier |
|--------------|---------|
| Le texte complet du Pont Cassé | `docs/narration/stories/001-le-pont-casse/texte.md` |
| Les retours du comité de lecture | `docs/narration/stories/001-le-pont-casse/comite-lecture/v1-retours.md` |
| Le brief d'une histoire | `docs/narration/stories/NNN/orchestration.md` |
| Les décisions de fond | `docs/narration/editorial-board/decisions.md` |
| Les questions ouvertes | `docs/narration/editorial-board/decisions.md` §Questions ouvertes |
| Le backlog des histoires | `docs/narration/editorial-board/backlog.md` |
| Le casting | `docs/narration/personnages/INDEX.md` |
| Les prénoms par culture | `docs/narration/personnages/prénoms-par-origine.md` |
| Les règles d'écriture | `docs/narration/histoires/INDEX.md` §Règles |
| Le guide auteur ennéagramme | `docs/narration/Eneagramme/ressources/guide-auteur.md` |
| Les specs des jeux | `docs/jeux/GAMES_SPECS.md` *(attention : obsolète)* |
| Le suivi Max | `game-html/suivi.html` |
| Le tracker | `game-html/js/tracker.js` |
| Les couleurs RATP | `docs/ratp-colors.json` |
| Le menu principal | `game-html/index.html` |

### E2. FAQ débutant

**Q1. Combien d'histoires existent ?**  
→ 1 canon (Pont Cassé), 15 idées en stock, 0 variante cross-country.

**Q2. Où en est l'histoire 2 ?**  
→ H-02 (Mimi / parapluie) a été rejetée en V2. Le sujet était perdu, l'histoire trop décorative. À réécrire depuis zéro avec un brief plus strict.

**Q3. Comment faire une version japonaise du Pont Cassé ?**  
→ Le système de patch est prêt : créer `variantes-culturelles/japonais.patch` avec les différences de prénoms/lieux/objets. L'archiviste peut ensuite reconstituer le texte complet.

**Q4. Quelles sont les prochaines histoires à écrire ?**  
→ Selon le backlog : H-02 (Mimi) en priorité, puis T-01 (Pluie). Mais 3 décisions bloquent : nom de l'univers, compagnons, niveau de magie.

**Q5. Quels jeux Max maîtrise déjà ?**  
→ Voir `game-html/suivi.html` (localStorage). Pas de backend. 4 jeux n'ont pas de tracking (13a, 13b, 13c, 17).

**Q6. Pourquoi y a-t-il des numéros qui sautent dans les MJ ?**  
→ Renumérotation historique (session 9). MJ-02, 03, 05, 07, 10 ont été fusionnés ou renommés. `GAMES_SPECS.md` est obsolète.

**Q7. Comment ajouter une nouvelle histoire ?**  
→ `node scripts/new-story.js "titre-de-l-histoire"` — crée le module depuis `_gabarit/`.

**Q8. Qu'est-ce qui bloque la production d'histoires ?**  
→ 3 décisions éditoriales non tranchées + le pipeline A/B/C n'a jamais tourné pour de vrai après le Pont Cassé.

**Q9. Quelle est la stack technique ?**  
→ HTML vanilla (jeux) + Phaser 3/Vite/TS (sandbox) + Bun/Grammy (bot) + GH Pages (hébergement).

**Q10. Y a-t-il des tests automatisés ?**  
→ Non. 0 test. Validation uniquement visuelle + test avec Max.

---

## F. Fichiers orphelins & obsolètes identifiés

| Fichier | Problème | Action recommandée |
|---------|----------|-------------------|
| `docs/jeux/GAMES_SPECS.md` | Numérotation pré-renommage (MJ-02, 03, 05, 07, 10) | 🟡 Mettre à jour ou archiver |
| `docs/narration/TODO-EDITORIAL.md` | Vide | 🔴 Supprimer ou fusionner dans backlog |
| `docs/narration/histoires/_gabarit.md` | Potentiellement obsolète avec `_gabarit/` du Story OS | 🟡 Vérifier si encore utilisé |
| `docs/audit/jeux-2026-04.md` | Audit vieux de 3 semaines | 🟡 Vérifier pertinence |
| `game-html/mj-02.html` | Référencé mais n'existe plus | ✅ Déjà supprimé |
| `game-html/mj-07.html` | Référencé mais n'existe plus | ✅ Déjà supprimé |

---

## G. Synthèse chiffrée

| Domaine | Métrique | Valeur |
|---------|----------|--------|
| **Narration** | Histoires canon | 1 |
| | Histoires en stock | 15 |
| | Variantes culturelles | 0 |
| | Décisions en suspend | 6 (3 bloquantes) |
| **Jeu** | Mini-jeux actifs | 18 |
| | Jeux sans tracking | 4 |
| | Jeux orphelins/disparus | 6 |
| | Tests automatisés | 0 |
| **Tech** | Lignes HTML/JS vanilla | ~14 000 |
| | Agents IA | 8 narration + 3 tech |
| | Backend | Aucun |
| | CI/CD | GitHub Actions → GH Pages |

---

> **Pour aller plus loin :** Voir [`CLAUDE.md`](../CLAUDE.md) pour le contexte agent, [`memory/MEMORY.md`](../memory/MEMORY.md) pour la mémoire globale, et [`tasks/BACKLOG.md`](../tasks/BACKLOG.md) pour les tâches techniques.
