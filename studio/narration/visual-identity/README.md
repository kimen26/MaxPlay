# Visual Identity — Wex World

> Index maître de l'identité visuelle de la saga. Source de vérité pour le logo, le style-guide et les prompts.

---

## Architecture

```
visual-identity/
├── README.md              ← ce fichier (index maître)
├── style-guide.md         ← palette, grain, traitement Wex, cadre cover
├── logo-saga/             ← logo Wex World (versions + variantes)
│   ├── prompts-log.md     ← log des générations (prompt + modèle + verdict)
│   └── [assets .png/.svg]
├── 001-le-pont-casse/     ← visuels de l'histoire 001
│   ├── prompts-log.md
│   └── [assets .png]
├── 002-libellule-resonance/
│   ├── prompts-log.md
│   └── [assets .png]
└── _gabarit-histoire/     ← dossier modèle à copier pour chaque nouvelle histoire
    ├── prompts-log.md
    └── .gitkeep
```

---

## Modèles image utilisés

| Modèle | Usage | Notes |
|--------|-------|-------|
| **Grok (Aurora)** | Logo saga | Meilleur résultat obtenu à ce jour |
| **ChatGPT (DALL-E 3)** | Covers histoires | Accessible gratuit |
| **Midjourney v7** | Recommandé pour cohérence saga | `--cref` / `--sref` pour cohérence personnages |
| **Flux 1.1 Pro** | API volume | Seed fixe pour reproductibilité |

---

## Règles visuelles (à lire avant de générer)

1. Lire **[style-guide.md](style-guide.md)** — palette + grain + traitement Wex **avant** tout prompt.
2. Logguer **chaque génération** dans le `prompts-log.md` du bon sous-dossier (logo ou NNN-histoire).
3. Ne pas conserver une image sans noter le prompt qui l'a produite.
4. Cohérence cross-histoire : les éléments communs (Wex, ambiance lumière, palette) doivent respecter le style-guide.

---

## État

| Élément | Statut |
|---------|--------|
| Logo saga | Généré (Grok) — à verser ici |
| Style-guide | A construire |
| Cover 001-le-pont-casse | Générée (ChatGPT) — à verser ici |
| Cover 002-libellule-resonance | En cours |

---

_Créé 2026-05-15 — suite décision DEC-VISUEL-001._
