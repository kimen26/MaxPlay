# File d'attente ElevenLabs — quoi régénérer, dans quel ordre

> **DOCUMENT MANUEL** — tenu à la main à partir de `_PLAN-GENERATION.md` (2026-08-10).
> Ne pas régénérer automatiquement. Quand le plan bouge, on met ce fichier à jour à la main.
> Détail clé par clé : `plan-generation.json`.

| | |
|---|---|
| Total plan | **490 appels / 45 118 caractères** (49 à créer · 441 à remplacer) |
| + hors plan | 6 récits dino en retard (LOT A1) |
| Solde relevé le 2026-08-10 (`check_subscription`) | **62 983 caractères restants** (58 584 / 121 567 · tier creator · reset ~2026-08-11) |

Le plan complet tient dans le solde actuel, mais on l'exécute par lots, pas en une fois.

## Avant de lancer quoi que ce soit

1. **Vérifier les crédits** : outil MCP `check_subscription` (lecture seule). ~25 car./seconde d'audio.
2. **Dry-run d'abord** : sans `--pour-de-vrai`, chaque script `_gen-*.mjs` affiche ce qu'il ferait et le coût, sans appeler rien.
3. **Padding 250 ms + loudnorm** : déjà appliqués par les `_gen-*.mjs` — rien à ajouter.
4. **⚠️ Les scripts ne génèrent que les fichiers ABSENTS** (filtre `!existe(dest)`, pas de `--force`).
   Pour un lot de **remplacement**, supprimer d'abord les MP3 ciblés, sinon ils sont sautés.
5. Voix résolues par rôle via `voice-map.json` — jamais de voice_id en dur.

---

## LOT A — qualité immédiate FR : ce qui manque ou est en retard

### A1 · 6 récits dino en retard (corythosaurus ×3 + hatzegopteryx ×3) — hors plan

Scripts récrits le 2026-07-27, audio produit le 2026-07-20 (dette ouverte dans `_ETAT-CONTENU.md`) :
`nom`, `regime`, `funfact` des deux bêtes.

- [ ] `bash studio/dino/content/scripts/audio/_gen-audio-v3.sh "corythosaurus hatzegopteryx"`
  (~4 157 car. — le script refait les 4 blocs par dino, dont `taille` déjà à jour ;
  pas de padding/loudnorm dans ce script, voir en-tête du script)

### A2 · 25 règles de jeux manquantes (mj-36 → mj-59 + mj-pose-tiles) — 15 315 car.

Fichiers absents → générés directement.

- [ ] `node studio/minijeux/scripts/audio/_gen-regles.mjs --pour-de-vrai`

### A3 · 24 rendus d'époques (16 gabarits + 8 atomes) — 1 095 car.

`site/sounds/epoques/*.mp3` + `site/sounds/atomes/epoque-*.mp3` / `duree-*.mp3`.

- [ ] **Pas de script `_gen` dédié** — à produire via MCP `text_to_speech` (narrateur_h,
  padding 250 ms + loudnorm à appliquer) ou à scripter. Textes dans `plan-generation.json`
  (clés `gabarit.epoque-datee.*`, `atome.epoque.*`, `atome.duree.*`).

**Sous-total LOT A (plan) : 49 appels / 16 410 car.**

---

## LOT B — remplacements à texte vérifié : 61 appels / 21 180 car.

Le texte est prouvé identique au MP3 → on sait ce qu'on remplace. Risque faible.
Rappel : supprimer les cibles avant de lancer (scripts = fichiers absents seulement).

- [ ] **B1 · 30 règles existantes (mj-04 → mj-35) — 18 869 car.**
  `rm site/sounds/voix/phrases/regle-mj-{04,05,06,08,09,11,13a,13c,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35}.mp3`
  puis `node studio/minijeux/scripts/audio/_gen-regles.mjs --pour-de-vrai`
- [ ] **B2 · 16 consignes — 674 car.**
  Supprimer les 16 MP3 listés dans `plan-generation.json` (clés `jeu.consigne.*` vérifiées,
  dossier `site/sounds/voix/phrases/`) puis
  `node studio/minijeux/scripts/audio/_gen-consignes.mjs --pour-de-vrai`
- [ ] **B3 · 15 menus familles/régimes dino — 1 637 car.** (`site/audio/dinos/fr/menu-*.mp3`)
  Pas de script `_gen` référentiel — pipeline dino / MCP `text_to_speech` (narrateur_h).

---

## LOT C — remplacements à texte NON vérifié : 290 appels / 5 851 car.

⚠️ **Ces textes sont reconstruits (slug ou repli), plausibles mais non prouvés.**
Les remplacer change ce que l'enfant entend — peut-être en mieux, peut-être pas.
**Écouter les MP3 actuels avant, ou trancher explicitement.** Détail par clé : `plan-generation.json`.

| Famille | Appels | Car. |
|---|---|---|
| humeur FR (positif 48 + doux 18) | 66 | 1 359 |
| atomes noms de dinos (les 70) | 70 | 1 574 |
| nombres (`atome.nombre` + gabarits `jeu.nombre`) | 75 | 1 241 |
| consignes | 28 | 678 |
| lieux (bus, fusée) | 12 | 266 |
| phonèmes | 21 | 40 |
| pièces d'échecs | 6 | 193 |
| périodes (trias… pangée) | 5 | 113 |
| lignes nommées (étoile gagnée) | 3 | 111 |
| menus dino (accueil, familles, régime, voyage) | 4 | 276 |

- [ ] **C (tout ou partie)** — seule sous-commande prête : les 28 consignes via
  `studio/minijeux/scripts/audio/_gen-consignes.mjs --pour-de-vrai` après suppression des cibles. Le reste n'a pas de
  script dédié (historiquement produit via MCP) : à scripter ou à générer à la main,
  après relecture des textes.

---

## LOT D — langues invitées non relues par un natif : 90 appels / 1 677 car.

⚠️ **Contenu destiné à un enfant : relecture native AVANT génération** (règle gravée dans
`valider.mjs`). 6 langues × 15 encouragements. Textes vérifiés côté catalogue, mais aucun
natif ne les a relus, et les voix françaises portent un accent (réserve connue, voir
en-tête de `studio/referentiel/generer/_gen-humeur-invitee.mjs`).

- [ ] **D · par langue** (réversible, fichiers hors canon) — supprimer
  `site/sounds/voix/<langue>/` puis, langue par langue :
  `node studio/referentiel/generer/_gen-humeur-invitee.mjs --langue <pt-BR|en|es|it|zh|ja> --pour-de-vrai`

| Langue | Appels | Car. | Relu par un natif |
|---|---|---|---|
| 🇧🇷 pt-BR | 15 | 291 | ☐ |
| 🇬🇧 en | 15 | 312 | ☐ |
| 🇪🇸 es | 15 | 321 | ☐ |
| 🇮🇹 it | 15 | 324 | ☐ |
| 🇨🇳 zh | 15 | 201 | ☐ |
| 🇯🇵 ja | 15 | 228 | ☐ |

---

## Contrôle de cohérence (2026-08-10)

49 (A) + 61 (B) + 290 (C) + 90 (D) = **490** · 16 410 + 21 180 + 5 851 + 1 677 = **45 118 car.** ✓
