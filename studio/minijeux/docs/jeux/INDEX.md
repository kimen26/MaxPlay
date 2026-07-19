# Jeux — Index agent

> **Charger ce fichier en premier.** Lire les sous-fichiers seulement si la tâche le nécessite.

---

## État du projet

| Quoi | Statut |
|------|--------|
| Count jeux / actifs / retirés | **Ne pas recopier ici** → [`pmo/INVARIANTS.md`](../../pmo/INVARIANTS.md) § État déploiement |
| Menu (source de vérité) | [`site/js/catalog.js`](../../../../site/js/catalog.js) — par catégories, `status:'live'` |
| Vue d'ensemble à jour | [CLASSIFICATION-2026-07.md](CLASSIFICATION-2026-07.md) |
| Stack | HTML vanilla · `site/js/` partagé · gabarit `mj-shell.js` · GitHub Pages |
| Audit technique | ✅ fait (2026-04-22) — voir `../audit/` |

---

## Règles non-négociables

1. **Bus** : toujours `busSVG()` / `busSVGHiddenNum()` de [`site/js/bus-svg.js`](../../../../site/js/bus-svg.js). Jamais d'emoji 🚌, jamais de div CSS colorée.
2. **Couleurs** : toujours depuis [`site/js/data.js`](../../../../site/js/data.js) → `LIGNES`. Jamais de hex hardcodé.
3. **Pool multi-couleurs** : `selectDistinctColors(pool, n)` — anti-doublons visuels.
4. **UX** : zéro pénalité punitive · feedback < 200ms · zones tap min 80px · sessions 3–8 min.

---

## Carte des fichiers

### Specs & design

| Fichier | Quand le lire |
|---------|--------------|
| [figees/mj-XX.md](figees/) 🔒 | **LOI — lire AVANT toute modif de `mj-XX.html`.** Décisions figées par jeu, anti-régressions. Réinjecté par hook. Y écrivent : main agent (figeage immédiat) ou `game-pmo` unifié ; seul Papa Yann défige. Créé 2026-05-15 (incident MJ-21) |
| [CLASSIFICATION-2026-07.md](CLASSIFICATION-2026-07.md) | **Vue d'ensemble à jour** — catégories, statut, paliers par jeu |
| [_PALIERS-DIFFICULTE.md](_PALIERS-DIFFICULTE.md) | Contrat de difficulté par jeu (⚠️ maxStars = 3 depuis 2026-07-14, voir INVARIANTS) |
| [_archive/GAMES_SPECS.md](_archive/GAMES_SPECS.md) | ⚠️ **ARCHIVÉ / périmé** (déplacé en `_archive/` 2026-07-19). Identité d'un jeu → figées/ + CLASSIFICATION |
| [game-ideas.md](game-ideas.md) | Backlog créatif brut (non priorisé) |
| [mj-34-35-36-specs.md](mj-34-35-36-specs.md) | Specs des jeux 34/35/36 |
| [REVUE-JEUX-2026-07.md](REVUE-JEUX-2026-07.md) | Revue complète menu/jeux par Papa Yann (source de `../audit/menu-2026-07.md`) |
| [../STANDARD-MJ.md](../STANDARD-MJ.md) | **Gabarit visuel de référence** gravé 2026-06-09 — incarné par `site/mj-gold-a.html` / `mj-gold-b.html` (liés depuis le hub tools) |
| [../specs/ARCHI-COMPTES-PROFILS.md](../specs/ARCHI-COMPTES-PROFILS.md) | Spec architecture comptes/profils enfant |
| [../specs/NORME-i-REGLES.md](../specs/NORME-i-REGLES.md) | Norme des panneaux règle ❓/🧑‍🔬 |
| [../specs/REGISTRE-VOIX-A-GENERER.md](../specs/REGISTRE-VOIX-A-GENERER.md) | Registre des voix MP3 à générer |

### Assets

| Fichier | Contenu |
|---------|---------|
| [ASSETS.md](ASSETS.md) | Assets visuels — SVG bus, sprites, règles `temp/` vs assets |
| [AUDIO_ASSETS.md](AUDIO_ASSETS.md) | Sons validés (liens Pixabay) : bus, animaux, cartoon, UI |

### Audit (dossier séparé)

| Fichier | Contenu |
|---------|---------|
| [../audit/INDEX.md](../audit/INDEX.md) | **Point d'entrée** — 4 livrables d'audit (avril 2026) |
| [../audit/jeux-2026-04.md](../audit/jeux-2026-04.md) | Verdict keep/refactor/retire par jeu |
| [../audit/factorisation.md](../audit/factorisation.md) | Plan factorisation CSS/JS partagé |
| [../audit/roadmap-technique.md](../audit/roadmap-technique.md) | Roadmap court/moyen/long terme |

---

## Architecture déploiement

```
GitHub Pages → kimen26.github.io/MaxPlay/
├── /              ← site/index.html (menu, source site/js/catalog.js)
├── /mj-XX.html    ← HTML vanilla (source: site/)
└── /max-adventure/ ← Phaser build (CI uniquement, source studio/max-adventure/)
```

CI : `.github/workflows/deploy.yml` assemble dans `_site/` (non commité).

---

## Profil cible

Max, 3.5–4 ans. Voir [docs/MAX_PROFILE.md](../MAX_PROFILE.md) pour passions, lignes connues, contraintes tactile.
