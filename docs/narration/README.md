# Narration MaxPlay

Univers narratif pour enfants (Max, 3.5–4 ans) basé sur l'ennéagramme (9 personnages-enfants) et un monde post-Éveil sobre avec merveilleux discret.

> **Agent : charger [INDEX.md](INDEX.md) en premier.** Ce README est pour un humain qui découvre le dossier.

---

## Organisation

```
docs/narration/
├── README.md               ← ce fichier (humain)
├── INDEX.md                ← point d'entrée agent (toujours en premier)
├── INBOX.md                ← dump brut sessions (hook commit auto)
│
├── personnages/            ← tableau des 9 + prénoms candidats
├── univers/                ← monde, systèmes, cycle, compagnons, vibration
├── histoires/              ← récits écrits + gabarit
├── Eneagramme/             ← système théorique (9 fiches + situations + ressources)
└── reference/              ← matière de fond (analyses manga/Pokémon, Riso-Hudson)
```

**Règle fondamentale :** un INDEX ne contient jamais de contenu canon, uniquement des pointeurs + état + questions ouvertes.

---

## Workflow (3 couches)

```
  1) Session chatbot / brainstorm
          ↓
  2) INBOX.md  ← dump daté (hook git commit auto sur modif)
          ↓  quand tranché
  3) univers/ · personnages/ · histoires/   ← stable, canon
          ↓
     INDEX du dossier mis à jour
          ↓
     Section INBOX distillée → marquer ✅ distillé DATE → supprimer
```

---

## Ajouter de la matière en vrac

1. Coller dans `INBOX.md` sous un bloc `## [date] — [sujet 5 mots]`
2. Laisser ; le hook commit fera le backup
3. Plus tard : "Distille l'INBOX dans les bons fichiers"

## Travailler sur un personnage

1. Lire `personnages/INDEX.md` (prénoms ⚠)
2. Fiche détaillée : `Eneagramme/personnages/type-XX-*.md`
3. Scène émotionnelle : `Eneagramme/situations/emotions-universelles.md`

## Travailler sur l'univers

1. Lire `univers/INDEX.md` (carte des pièces)
2. Fichier ciblé : `monde.md`, `systemes.md`, `grand-cycle.md`, etc.

## Écrire une nouvelle histoire

1. Copier `histoires/_gabarit.md` → `histoires/<titre>.md`
2. Remplir. Ajouter au tableau de `histoires/INDEX.md`.

---

## Règles de taille

- Fichier stable : 80–300 lignes cible, 400 max
- Au-delà : scinder thématiquement
- Sous-dossier : toujours un `INDEX.md` ≤ 150 lignes

---

## Pôles projet

Ce dossier est le **pôle NARRATION** du projet MaxPlay. Le pôle **JEU** (Phaser/HTML) est ailleurs — voir [CLAUDE.md](../../CLAUDE.md) à la racine.
