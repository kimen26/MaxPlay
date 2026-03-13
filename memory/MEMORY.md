# MaxPlay – Mémoire Projet

> Chargé automatiquement à chaque session. Rester sous 200 lignes.
> Source de vérité = `tasks/BACKLOG.md`. Ici : contexte rapide pour démarrer.

## Projet

Jeu éducatif 2D pour **Max**, 3.5-4 ans, passionné de bus (lignes Villejuif).
Voir `docs/MAX_PROFILE.md` pour le profil complet.
**Stack** : Phaser.js 3 + Vite + TypeScript · Résolution 1024×768 landscape

## État (2026-03-13)

- EP-001 Infrastructure : ✅
- EP-002 Direction artistique : ✅ flat design arrondi (Toca Boca / Tayo)
- EP-003 Scaffold Phaser.js : ✅
- EP-004 Architecture V0 : ✅ MJ-01 à MJ-06 fonctionnels (HTML vanilla)
- EP-010 Assets & outils : ✅ SVG bus + sprites topdown
- **Déploiement refactoré** : ✅ CI GitHub Actions build Phaser + assemble + deploy
- EP-MJ06 Au garage : **à faire** (T-161 à T-164)
- EP-MJ07 Phaser sandbox : **à faire** (T-171 à T-176)

## Architecture déploiement (2026-03-13)

```
GitHub Pages → kimen26.github.io/MaxPlay/
├── /              ← game-html/index.html (menu)
├── /mj-01.html    ← game-html/mj-01.html
├── ...
├── /mj-07.html    ← splash page → link ./mj-07/
└── /mj-07/        ← Phaser build (game/dist/ copié par CI)
```

**CI** : `.github/workflows/deploy.yml` build Phaser (`CI=true` → base `/MaxPlay/mj-07/`) puis assemble dans `_site/`
**docs/** : uniquement des `.md` (plus de HTML ni d'assets)
**game/dist/**, **_site/** : dans `.gitignore`, jamais commités

## Décisions clés

- **Style** : flat design arrondi (Toca Boca / Tayo) — PAS pixel art
- **Univers** : ville Villejuif réelle + vie secrète des bus
- **POV** : top-down (vue GTA1/Pokémon), tap only Phase 1
- **Progression** : flotte de bus débloquée + carte Villejuif
- **Audio** : Web Speech API (TTS), Web Audio API (sons procéduraux)
- **Bus side-view** : SVG template dynamique {{COLOR}}/{{LINE}}
- **Bus topdown** : sprite sheet White + setTint() Phaser

## Règles jeu (non-négociables)

- Zones tap min 80×80 px · Feedback < 200 ms · Zéro pénalité · Sessions 3–8 min

## Carte des fichiers

| Fichier | Rôle |
|---------|------|
| `tasks/BACKLOG.md` | Source de vérité : épics, tâches, décisions, leçons |
| `docs/MAX_PROFILE.md` | Profil complet Max : lignes bus, couleurs IDFM, intérêts |
| `docs/VISION.md` | Décisions prises + questions ouvertes |
| `game-html/` | MJ-01 à MJ-07 (vanilla HTML/JS) — source déployée |
| `game/src/scenes/` | HubScene · SandboxScene (MJ-07 Phaser) |
| `game/src/constants/colors.ts` | 19 lignes bus IDFM + UI_COLORS |
| `.github/workflows/deploy.yml` | CI : build + assemble + deploy GitHub Pages |
