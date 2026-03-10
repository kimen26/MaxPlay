# 🚌 MaxPlay

> Jeu éducatif 2D pour **Max** (3.5–4 ans), passionné de bus Villejuif.
> Apprendre en jouant avec les vraies lignes IDFM — sans jamais que ça ressemble à de l'école.

---

## Concept

Max connaît toutes les lignes de bus autour de chez lui, leurs couleurs, leurs numéros, leurs itinéraires.
MaxPlay transforme cette passion en levier d'apprentissage naturel : chiffres, couleurs, lecture phonétique, géographie, logique.

**Les bus ont une vie secrète.** Le jour, ce sont les vrais bus de Villejuif. La nuit, ils ont des émotions, parlent entre eux, vivent des aventures. Max est avec eux — dedans, à leurs côtés — pas spectateur.

---

## Stack

| | |
|---|---|
| **Moteur** | Phaser.js 3 |
| **Build** | Vite 5 + TypeScript strict |
| **Cible** | Navigateur desktop + tablet, paysage 1024×768 |
| **Assets** | SVG/PNG, Web Audio API synthesisé |
| **Input** | Tactile (tablet) + Gamepad 8BitDo FC30 |

---

## Architecture du jeu

```mermaid
graph TD
    subgraph Entrée["🎮 Point d'entrée"]
        Boot["BootScene\n(chargement minimal)"]
        Preload["PreloadScene\n(assets + audio)"]
        Hub["HubScene\n(dépôt de bus)"]
    end

    subgraph MiniJeux["🚌 Mini-jeux"]
        Sandbox["SandboxScene\nTop-down · Max marche · monte dans les bus"]
        Trie["TrieScene\nTrier les bus par ligne"]
        Couleurs["CouleursScene\nQuiz : quelle couleur pour cette ligne ?"]
        Numeros["NumeScene\nQuiz : quel numéro est-ce ?"]
        Calcul["CalcScene\nCalcul mental avec passagers de bus"]
        QuelBus["QuelBusScene\nReconnaissance : quel bus arrive ?"]
    end

    subgraph Progression["🏆 Progression"]
        Flotte["Flotte de bus\n(bus débloqués)"]
        Carte["Carte Villejuif\n(zones allumées)"]
    end

    Boot --> Preload --> Hub
    Hub --> Sandbox
    Hub --> Trie
    Hub --> Couleurs
    Hub --> Numeros
    Hub --> Calcul
    Hub --> QuelBus

    Sandbox -->|"mini-jeu terminé"| Flotte
    Trie --> Flotte
    Couleurs --> Flotte
    Flotte --> Carte
```

---

## Univers de Game Design

```mermaid
mindmap
  root((MaxPlay\nGame Design))
    Mécaniques validées ✅
      Tap pour avancer
      Tap pour monter dans bus
      Quiz choix multiple
      Triage glisser-déposer
      Calcul mental voyageurs
      Reconnaissance visuelle bus
    Direction artistique ✅
      Pixel art top-down
      Style GTA1 / Pokémon vue dessus
      Couleurs vives IDFM officielles
      Animations frame-by-frame
    Mécaniques Phase 2 🔜
      Drag pour diriger personnage
      Mouvements libres aux arrêts
      Interactions décor rue
      Support gamepad FC30
    Idées futures 💡
      Carte Villejuif interactive
      Itinéraires à recomposer
      Mini-jeu horaires
      Collecte de tampons voyageur
      Quiz drapeaux pays arrêts
      Mode nuit vie secrète des bus
      Boss final loup dans le bus
      Easter eggs prout
    Non retenu ❌
      Vue isométrique
      Guide extérieur narrateur
      Pénalité punitive
      Sessions longues 15+ min
```

---

## Branches pédagogiques

```mermaid
flowchart LR
    Max(("👦 Max\n3.5–4 ans"))

    Max --> Chiffres
    Max --> Couleurs
    Max --> Lecture
    Max --> Geo["Géographie"]
    Max --> Logique

    subgraph Chiffres["🔢 Chiffres & Maths"]
        C1["Reconnaître numéros\nde lignes 47–2234"]
        C2["Calcul mental\n+/- passagers"]
        C3["Ordonner les lignes\npar numéro"]
    end

    subgraph Couleurs["🎨 Couleurs"]
        Co1["Associer ligne ↔ couleur\n162=bleu, 185=orange..."]
        Co2["Discriminer teintes proches\n(bleu marine vs bleu RATP)"]
        Co3["Palette complète IDFM\n18 lignes Villejuif"]
    end

    subgraph Lecture["📖 Lecture phonétique"]
        L1["Lire numéro de ligne\nà voix haute"]
        L2["Reconnaître syllabe\ndes noms d'arrêts"]
        L3["Associer mot écrit\nà destination"]
    end

    subgraph Geo["🗺️ Géographie"]
        G1["Carte Villejuif\nzones & quartiers"]
        G2["Trajets quotidiens\nécole, grand-mère, Marriott"]
        G3["Correspondances\nM7 Louis Aragon"]
    end

    subgraph Logique["🧩 Logique & Mémoire"]
        Lo1["Trier par attribut\n(couleur, numéro, taille)"]
        Lo2["Séquences d'arrêts\nà mémoriser"]
        Lo3["Reconnaître pattern\n(quel bus vient ensuite ?)"]
    end
```

---

## Système de progression

```mermaid
flowchart TD
    MJ["Mini-jeu\nterminé ⭐"] --> Unlock["Bus débloqué\ndans la flotte"]
    Unlock --> Flotte["🚌 Flotte\nCollection visuelle\n(dépôt de bus)"]
    Unlock --> Carte["🗺️ Zone Villejuif\nallumée sur la carte"]

    Flotte --> Satisfaction["Satisfaction\ncollection"]
    Carte --> Exploration["Exploration\nde la ville"]

    Satisfaction --> Rejeu["Rejouer\npour tout débloquer"]
    Exploration --> Rejeu

    style MJ fill:#1abc9c,color:#fff
    style Unlock fill:#f39c12,color:#fff
    style Flotte fill:#3498db,color:#fff
    style Carte fill:#9b59b6,color:#fff
```

---

## Roadmap

```mermaid
gantt
    title MaxPlay – Épics
    dateFormat YYYY-MM-DD
    axisFormat %b %Y

    section Fondations ✅
    Infrastructure & Claude config     :done, ep001, 2026-03-07, 2026-03-07
    Direction artistique & univers     :done, ep002, 2026-03-08, 2026-03-08
    Scaffold Phaser.js                 :done, ep003, 2026-03-08, 2026-03-08
    Config Claude avancée (hooks)      :done, ep007, 2026-03-10, 2026-03-10

    section En cours 🔜
    Premier mini-jeu jouable           :active, ep004, 2026-03-10, 2026-03-20
    Recherche motricité enfant 3-4 ans :ep008, 2026-03-15, 2026-03-18
    Recherche audio & TTS              :ep009, 2026-03-15, 2026-03-18

    section À venir 📋
    Système de progression             :ep005, 2026-03-20, 2026-04-01
    Audio (sons + musique + TTS)       :ep006, 2026-03-22, 2026-04-05
```

---

## Lignes de bus Villejuif

Les vraies couleurs officielles IDFM — cœur du jeu.

| Ligne | Couleur | Hex | Ancrage Max |
|-------|---------|-----|-------------|
| **162** | 🟦 Bleu RATP | `#0064B1` | Ligne du quartier |
| **172** | 🟢 Vert | `#008C59` | Quotidien |
| **185** | 🟠 Orange | `#F58443` | **Ligne école** ⭐ |
| **2234** | 🟣 Violet | `#652C90` | Marriott / Marne-la-Vallée ⭐ |
| **TVM** | 🔵 Bleu TVM | `#216EB4` | Trans-Val-de-Marne |
| **286** | 🪻 Lilas | `#C9A2CD` | |
| **380** | 🟩 Vert clair | `#75CE89` | |
| **323** | 🟡 Jaune-vert | `#CEC92A` | |
| **125** | 🔵 Bleu | `#006EB8` | |
| **131** | 🟤 Brun | `#8D653A` | |
| **132** | 🟣 Violet | `#652C90` | |
| **184** | 🟡 Jaune-or | `#DCAC27` | |
| **186** | 🌸 Rose-violet | `#B43C95` | |
| **47** | 🩷 Rose | `#FF82B4` | |
| **180** | 🫒 Olive | `#9B9839` | |
| **N15/N22** | 🌙 Bleu nuit | `#000091` | Lignes de nuit |
| **M7** | 🔴 Violet/Rose | — | Villejuif Louis Aragon |

---

## Règles de design (non-négociables)

```mermaid
flowchart LR
    subgraph UX["❤️ UX Enfant"]
        U1["Zones tap\nmin 80×80 px"]
        U2["Feedback visuel + sonore\n< 200 ms"]
        U3["Zéro pénalité punitive\ntoujours encourager"]
        U4["Sessions 3–8 min max"]
    end

    subgraph Pédago["🎓 Pédagogie"]
        P1["Apprentissage invisible\n(jamais scolaire)"]
        P2["Ancrage affectif\n(vrais bus de Max)"]
        P3["Progression douce\nPhase 1→2→3"]
        P4["Erreur = réessai joyeux\npas punishment"]
    end

    subgraph Tech["⚙️ Tech"]
        T1["Phaser.js 3 + TypeScript\nstrict mode"]
        T2["Vite 5 hot-reload\nitération rapide"]
        T3["Zéro dépendance externe\nsauf Phaser"]
        T4["tsc --noEmit auto\nà chaque modification"]
    end
```

---

## Structure du projet

```
MaxPlay/
├── game/                    ← Phaser.js (TypeScript, Vite)
│   └── src/
│       ├── scenes/          ← BootScene, PreloadScene, HubScene, SandboxScene...
│       ├── constants/       ← colors.ts (vraies couleurs IDFM), config.ts
│       └── main.ts
├── game-html/               ← Version vanilla HTML/JS (7 mini-jeux auto-contenus)
│   └── index.html
├── docs/
│   ├── VISION.md            ← Options ouvertes + décisions
│   ├── MAX_PROFILE.md       ← Profil Max (lignes, passions, géographie)
│   └── REFERENCES.md        ← Ressources et liens
├── tasks/
│   └── BACKLOG.md           ← Source de vérité : épics, tâches, leçons
├── memory/
│   └── MEMORY.md            ← Mémoire Claude (auto-chargée)
└── CLAUDE.md                ← Instructions opérationnelles Claude
```

---

## Lancer le jeu Phaser

```bash
cd game
npm install
npm run dev
# → http://localhost:5173
```

## Version HTML (standalone)

Ouvrir directement `game-html/index.html` dans un navigateur — aucune installation requise.
Contient 7 mini-jeux complets : Sandbox, Trie, Couleurs, Numéros, Calcul, Quel Bus.

---

## Profil Max

| | |
|---|---|
| **Âge** | 3.5–4 ans |
| **Quartier** | Villejuif Feuillantines (Val-de-Marne) |
| **Chiffres** | Compte seul jusqu'à 100, milliers avec aide |
| **Lecture** | Phonétique en cours, progression rapide |
| **Passions** | Bus 🚌 · Animaux 🐾 · Loups 🐺 · Drapeaux 🏳️ · Tayo · Ghibli · Stitch |
| **Input** | Tablet tactile |
| **Humour** | Phase pipi-caca-prout classique 3-4 ans 😄 |

---

*Built with ❤️ by un papa dev · Powered by Claude Code*
