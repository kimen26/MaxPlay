# MaxPlay – Mémoire Projet

> Chargé automatiquement à chaque session. Rester sous 200 lignes.
> Source de vérité = `tasks/BACKLOG.md`. Ici : contexte rapide pour démarrer.

## Projet

Jeu éducatif 2D pour **Max**, 3.5-4 ans, passionné de bus (lignes Villejuif).
Voir `docs/MAX_PROFILE.md` pour le profil complet.
**Stack** : Phaser.js 3 + Vite + TypeScript · Résolution 1024×768 landscape

## État (2026-03-08)

- EP-001 Infrastructure : ✅ terminée
- EP-002 Direction artistique : ✅ décidée (voir VISION.md)
- EP-003 Scaffold Phaser.js : ✅ installé, tsc 0 erreur, Vite ok
- EP-007 Hooks Claude : ✅ tsc auto après Edit/Write
- EP-004 Premier mini-jeu : **EN COURS** → T-031 sandbox à coder
- EP-008/009 Recherche motricité + audio : à faire en subagents

## Décisions clés (EP-002)

- **Style** : pixel art grille 16×32px (Libresprite/Aseprite), plus facile sans talent artistique
- **Univers** : ville Villejuif réelle + vie secrète des bus
- **POV** : Max est un personnage top-down (vue GTA1/Pokémon), voyage DANS le bus, peut descendre aux arrêts
- **Contrôles Phase 1** : tap only (Max n'a jamais touché de manette)
- **Progression** : flotte de bus débloquée + carte Villejuif qui s'allume
- **Audio** : Web Speech API pour voix (prototype), Howler.js pour sons

## Prochaine tâche : T-031 – Sandbox top-down

Scène `SandboxScene.ts` avec :
- Personnage Max (carré coloré pour l'instant, pas besoin de vrai sprite)
- Rue simple avec arrêt de bus
- Bus 162 (couleur `0x0064B1`) qui arrive, attend, repart
- Max peut TAP pour se déplacer vers l'arrêt
- Max peut TAP sur le bus pour "monter" → feedback positif
- Pas de pédagogie encore – juste voir si ça donne envie

## Règles jeu (non-négociables)

- Zones tap min 80×80 px · Feedback < 200 ms · Zéro pénalité · Sessions 3–8 min

## Carte des fichiers

| Fichier | Rôle |
|---------|------|
| `tasks/BACKLOG.md` | Source de vérité : épics, tâches, décisions, leçons |
| `docs/MAX_PROFILE.md` | Profil complet Max : lignes bus, couleurs IDFM, intérêts |
| `docs/VISION.md` | Décisions prises + questions ouvertes |
| `game/src/scenes/` | Boot · Preload · Hub · **SandboxScene** (à créer T-031) |
| `game/src/constants/colors.ts` | 19 lignes bus IDFM + UI_COLORS |
| `game/src/constants/config.ts` | GAME_WIDTH/HEIGHT, MIN_TAP_SIZE, etc. |
