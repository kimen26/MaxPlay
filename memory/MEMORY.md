# MaxPlay – Mémoire Projet

> Chargé automatiquement à chaque session. Rester sous 200 lignes.
> Source de vérité = `tasks/BACKLOG.md`. Ici : contexte rapide pour démarrer.

## Projet

Jeu éducatif 2D pour **Max**, 3.5-4 ans, passionné de bus (lignes Villejuif).
Voir `docs/MAX_PROFILE.md` pour le profil complet.
**Stack** : Phaser.js 3 + Vite + TypeScript · Résolution 1024×768 landscape

## État jeux (2026-04-12, session 12)

- **18 jeux** : mj-01 à mj-17 + max-adventure
- **MJ-17** : L'ombre du bus — silhouette noire, 3 niveaux (nette / floutée / partielle), 4 choix
- **MJ-16** : Complète la suite — 4 cases, pattern à compléter, 3 niveaux (couleurs / tailles / mixte)
- **MJ-15** : L'intrus — 5 bus, 1 ne va pas avec les autres, 3 niveaux (couleur / pair-impair / famille)
- **MJ-14** : La grille des bus — Matrices de Raven, 2 modes (formes géo / bus IDFM), 3 niveaux (ligne → colonne → les deux)
- **MJ-13** : Arrêt de bus — panneau RATP (poteau gris + fiches LED turquoise), layout flexbox mobile, 3 modes A/B/C, Pikachu son bonne réponse
- **tracker.js** : suivi progression localStorage — sessions, scores, taux de réussite, maîtrise Montessori (○ nouveau · ◑ en cours · ● maîtrisé). Intégré dans MJ-01 à MJ-17.
- **suivi.html** : dashboard parent — stats globales, carte par jeu, sparklines, export/import JSON. Accessible via lien discret dans footer index.html.
- **victory-sounds.js** : module partagé `playEndSound(score, max)` + `playErrorSound()` + `stopEndSound()`
  - ≥50% → FF7/Smash Bros/Zelda/Gagné/Super Max · <50% → perdu/motus/among-us
  - erreur → prout/klaxon/pew aléatoire
- **sounds.js** : AudioContext singleton (fix son coupé après clics rapides)
- **index.html** : jingle RATP ou SNCF aléatoire au chargement (autoplay + fallback premier clic)
- **Prochaine étape** : EP-015 (Carnet de Max / Garage progression) + refonte menu (carte ville)

## Projet narration (2026-04-13, session 12)

- **Histoires écrites** : "Le Pont Cassé" — Léo (#7) + Élia (#1) + Sam (#8), thème causalité/responsabilité, V1 complète
- **Comité de lecture** : 7 profils internes (éditeur, prof français, philo, Boo 4 ans, enfant 8 ans, père, mère) + 8 cultures (USA, DE, CN, NG, JP, MA, BR, RU)
- **3 actions V2** : couper chute italique · donner à Élia un vrai tort · ralentir retournement de Léo
- **Univers macro** : en construction — `docs/univers/UNIVERS-NOTES-BRUTES.md`
  - Post-Grande Tempête de Phos (Éveil des consciences, Tisseurs d'Ombre vaincus)
  - Conscience créative + Totems de Pensée (Voile Janus)
  - Gardiens de l'Équilibre (Présence Pure, micro-gestes)
  - Grand Cycle 22k ans (Kali Yuga → Printemps de l'Éveil)
  - Compagnons animaux hybrides liés à chaque enfant
  - Baron (voyageur temporel, Gardien des Portes)
  - **Nom de l'univers** : pas encore choisi (21 candidats dont Phosyntha, Egryntha, Veynara)
- **Personnages nommés** : Léo (#7 héros), Sam (#8), Élia (#1), Lila (#9), Camille (#2), Victor (#3), Iris (#4), Theo (#5), Noa (#6)
- **Docs narration** : `docs/narration/` (SYNTHESE + Eneagramme/) · `docs/univers/`

## Architecture déploiement (2026-03-21)

```
GitHub Pages → kimen26.github.io/MaxPlay/
├── /                    ← game-html/index.html (menu 2 colonnes)
├── /mj-01.html à /mj-17.html  ← 17 mini-jeux HTML vanilla
└── /max-adventure/      ← Phaser build (game/dist/ copié par CI)
    max-adventure.html   ← splash → ./max-adventure/
```

**CI** : `.github/workflows/deploy.yml` build Phaser (`CI=true` → base `/MaxPlay/max-adventure/`) puis assemble dans `_site/`
**docs/** : uniquement des `.md` (plus de HTML ni d'assets)
**game/dist/**, **_site/** : dans `.gitignore`, jamais commités

## Décisions clés MJ-11 (drapeaux)

- **Drapeau dans bus** : `background-size:contain` + fond `#000` pour pillarbox — la fenêtre SVG (40×21) est trop large pour les drapeaux (ratio ≈1.5)
- **TTS bouton** : texte fixe "Écouter" — ne jamais afficher le nom du pays (réponse visible = zéro défi)
- **Confettis** : 40 emojis drapeaux Canvas uniquement au 10/10 sans-faute
- **Victoire** : 5 paliers (10/8-9/6-7/4-5/0-3), toujours positif mais calibré
- **Flag-icons CDN** : `cdn.jsdelivr.net/npm/flag-icons@7.2.3` — 260 drapeaux SVG via classe CSS `fi fi-XX`

## Décisions clés

- **Style** : flat design arrondi (Toca Boca / Tayo) — PAS pixel art
- **Univers** : ville Villejuif réelle + vie secrète des bus
- **POV** : top-down (vue GTA1/Pokémon), tap only Phase 1
- **Progression** : flotte de bus débloquée + carte Villejuif
- **Audio** : Web Speech API (TTS), Web Audio API (sons procéduraux)
- **Bus side-view** : `busSVG()` / `busSVGHiddenNum()` dans `game-html/js/bus-svg.js` — JAMAIS emoji ni div CSS
- **Bus topdown** : sprite sheet White + setTint() Phaser
- **Anti-doublons** : `selectDistinctColors(pool, n, minDist=80)` pour tout quiz à couleurs
- **ratp-colors.json** : source de vérité terminus+couleurs. Protocole de modif dans `.claude/skills/game-rules/bus-rules.md`
- **MJ-04 PHRASES** : jamais de prénom, emoji = représentation du answer, 90 phrases, sans remplacement cyclique

## Règles jeu (non-négociables)

- Zones tap min 80×80 px · Feedback < 200 ms · Zéro pénalité · Sessions 3–8 min

## Tileset LimeZu Modern Exteriors (48×48) — règles apprises (session 8)

**Fichier** : `game-html/map-mockups.html` — 5 maps atomiques validées (M1–M5)

| Règle | Détail |
|-------|--------|
| Sidewalk 1–6 | 6 styles DIFFÉRENTS (pas des orientations). Utiliser 1 style par zone. |
| Variation `_1` | Plein jour. Varier avec `sidewalk2` max 2–3 points par ligne. |
| Anti-répétition | >6 identiques consécutifs = HAUTE. Asphalt : mixer asphalt/asphalt2/asphalt3. |
| bench_city | Sprite 96×96 (2×2 tiles). Ancre top-left. Les 4 cells = sidewalk (jamais asphalt). |
| parking_m | Sprite 48×96 (1×2). Accepté en bas sur asphalt (arrêt-stationnement). |
| Transition | asphalt → sidewalk → bâtiment. Jamais asphalt direct → bâtiment. |
| Layers | `ground` (drawTile, zéro null), `objects` (drawObject, taille native), `decoration` |

## Notes brutes en cours

- [notes-brutes-univers.md](notes-brutes-univers.md) — égregores, Grand Cycle, question fractale personnages/rêve (2026-04-16)

## Bot Telegram (botard)

`bot/index.ts` · grammy + bun · lancé auto au démarrage Claude (hook SessionStart)

**Flow** : message reçu → boutons ✅ Exécuter / ❌ Annuler → si validé → `claude -p … --dangerously-skip-permissions`
**Env vars** : `TELEGRAM_BOT_TOKEN` · `ALLOWED_CHAT_ID` · `PROJECT_PATH`
**Logs** : `/tmp/maxplay-bot.log`
**Redémarrer** : `pkill -f "bot/index.ts" && cd bot && bun run index.ts &`

## Carte des fichiers

| Fichier | Rôle |
|---------|------|
| `tasks/BACKLOG.md` | Source de vérité : épics, tâches, décisions, leçons |
| `docs/README.md` | Carte de toute la documentation — point d'entrée |
| `docs/MAX_PROFILE.md` | Profil complet Max : lignes bus, couleurs IDFM, intérêts |
| `docs/VISION.md` | Décisions prises + questions ouvertes |
| `docs/ratp-colors.json` | Source de vérité couleurs+terminus : 26 actives + 362 référentiel |
| `docs/narration/SYNTHESE.md` | Vue d'ensemble projet narratif (personnages, ennéagramme) |
| `docs/narration/Eneagramme/` | 9 fiches personnages + situations + ressources auteur |
| `docs/univers/UNIVERS-NOTES-BRUTES.md` | Matière brute univers macro (Éveil, Compagnons, Janus, Baron...) |
| `game-html/` | mj-01 à mj-17 + max-adventure (vanilla HTML/JS) — source déployée |
| `game-html/js/tracker.js` | Suivi progression localStorage — sessions, scores, maîtrise |
| `game-html/suivi.html` | Dashboard parent — stats, sparklines, export/import JSON |
| `game-html/js/data.js` | LIGNES (26 actives), DESTINATIONS, getLineDisplayName() |
| `game-html/js/idfm.js` | IDFM_REFERENTIEL — 362 lignes complètes (généré depuis ratp-colors.json) |
| `game-html/js/bus-svg.js` | busSVG() / busSVGHiddenNum() / selectDistinctColors() |
| `game-html/map-mockups.html` | Preview tileset LimeZu — 5 maps atomiques M1–M5 |
| `game/src/scenes/` | HubScene · SandboxScene (max-adventure Phaser) |
| `.claude/skills/game-rules/bus-rules.md` | Règles immuables bus + protocole de modification |
| `.github/workflows/deploy.yml` | CI : build + assemble + deploy GitHub Pages |
