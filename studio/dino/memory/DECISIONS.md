# Décisions — Pôle DINO

> Une décision ici est DÉFINITIVE jusqu'à nouvelle décision explicite datée. Détail complet (toutes décisions < 2026-08-01) : [`archive/decisions-2026-H1.md`](archive/decisions-2026-H1.md). Aucune entrée datée ≥ 2026-08-01 n'existait dans l'ancien `pmo/decisions.md` à la date de cette migration (2026-09-04) — les décisions plus récentes vivent dans le journal `pmo/sprint-log.md` § archivé et dans `MEMORY.md § Journal`.

## Décisions structurantes toujours en vigueur

- **DEC-GED-001** (2026-07-03) — Doctrine d'architecture GED du pôle : canon sans numéro · zéro chiffre en dur (gouvernance seule, jamais le contenu narré) · frontière autoring/produit · checklist « dino complet » 8 axes — voir `archive/decisions-2026-H1.md` § DEC-GED-001.
- **Tritri = running gag sans méta** (2026-06-03, confirmé Q-DINO-7 2026-06-15) — dino préféré de Wex, jamais nommé « Max/doudou/peluche » — voir `figees/encyclopedie.md`.
- **Échelle honnête = référentiel figé** (itéré 2026-08-03, cf. `INVARIANTS.md` § échelle) — aucune comparaison de taille/poids qui ment > 10 %, sortie exacte de `_compLong`/`_compHaut`/`_compPoids`.
- **Format images paléoart FIGÉ** (2026-07-03) — JPEG q85 + WebP q90 — voir `archive/decisions-2026-H1.md`.
- **DEC-I18N-INVARIANT-001** (2026-07-10) — toute langue = lexique de prononciation avant toute génération audio — voir `archive/decisions-2026-H1.md`.
- **DEC-LANG-I18N-ARCHI-001** (2026-07-10) — architecture pack audio i18n : préfixe langue + overlay strings JS (`dinos-i18n.js`), FR canon `dinos-data.js` inchangé — voir `archive/decisions-2026-H1.md`.
- **DEC-TEMPS-PROFOND-001 / DEC-AUDIO-COMPLET-001** (2026-07-05) — deux caps produit figés (temps profond honnête dans l'UI + cap audio 100 % voix réelle) — voir `archive/decisions-2026-H1.md`.
- **Cénozoïque = fiches individuelles onglet Familles, PAS 9ᵉ épisode Voyage** (2026-07-03), catégories Mammifère + Oiseau distinctes (taxo honnête) — voir `archive/decisions-2026-H1.md`.
- **7 cératopsiens orphelins REJETÉS** (2026-07-03 : anchiceratops, chasmosaurus, diabloceratops, einiosaurus, kosmoceratops, pachyrhinosaurus, utahceratops) — voir `archive/decisions-2026-H1.md`.
- **Silence de tête des fiches narrées = ~80 ms, voulu** (2026-09-04, Papa Yann) — la règle « padding 250 ms » de `.claude/rules/sons.md` vise les MP3 courts (répliques, SFX) dont l'attaque se coupe sur mobile ; les fiches et récits dino gardent leur silence court. `audio-verif` sur du dino : `--min-silence-ms 50`, ne pas « corriger » les 70 fiches.
- **NORME CLÉ D'ASSETS** (2026-07-27, gravée dans `.claude/rules/dino.md`) — la clé de liaison de tout asset = le nom latin capitalisé (`id` du dino), jamais le nom d'affichage FR.

- **DEC-SCRIPTS-AUDIO-002** (2026-09-05, vague HO-009..014) — **Canon Scripts audio = 1 fichier par dino** `content/scripts-audio/<lang>/<id>.md` (FR : `fr/V3/<id>.md`), JSON régénérés, porte `_verif-scripts-audio.cjs` (échelle exécutée, greps, liste de 31 tags v3 autorisés, densité minimale, ponctuation Wex, locuteurs NARRATEUR H/WEX seuls, ≤ 1900 car.). Doctrine tags = brief HO-011 § Doctrine tags. Anciens lots archivés `fr/V3/_archive-2026-09-05-lots/`.
- **DEC-VITESSE-001** (2026-09-05, demande Papa Yann « la vitesse m'intéresse ») — champ optionnel `vitesse_kmh` dans `dinos-data.js` (25 dinos, seulement quand une estimation sérieuse est publiée, source dans `rapports/HO-009-lot-*.json`), fonction `_compVitesse` (repères enfant, ±10 %), dite dans le Script audio en estimation (« les savants pensent que »). **Affichage UI de la vitesse en fiche : non tranché** (question ouverte ci-dessous).
- **DEC-AUDIO-I18N-002** (2026-09-05) — audio des Fiches dino non-FR = pipeline `_gen-audio-i18n-sts.mjs` : par réplique, TTS voix native Voice Library (en Liam · es-es Gabriel Blanco · pt-br Kallil Paiva) → speech-to-speech vers narrateur_h ou wex → concat 300 ms + loudnorm ; ledger `i18n/fiches-audio/<lang>.json`. Le bouton audio de la fiche est gaté par le manifest de la langue (`dinoHasAudio`). Coût constaté ≈ 2× le FR.

## Questions ouvertes (non tranchées)

- **Vitesse en UI ?** (2026-09-05) — `vitesse_kmh` existe en data et dans l'audio ; faut-il l'afficher sur la fiche (ligne « Vitesse : 20 km/h — aussi vite que Papa qui court ») ? Décision Papa Yann.

- **Macro-périodes / Ères** (2026-09-03, demande PY) — ajouter un niveau « Mésozoïque » au-dessus des 5 `DINO_PERIODES` ? Touche une ligne FIGÉE (UI 5 onglets / `buildMenuEpoque`) → alerte rouge si on passe à l'acte sans validation PY explicite. Détail : `TODO.md`.
- **Challenge taxo transmis à PY** (2026-09-03) — Pachycéphalosaure rangé Cératopsiens (vrai groupe = Marginocéphales) · Gallimimus/Oviraptor rangés Dromæosaures (Ornithomimidé/Oviraptoridé). Détail : `TODO.md`.
- **Drift count 70 vs 71** (2026-09-03) — `dinos-data.js` live = 71 entrées, `INVARIANTS.md` dit 70. À réconcilier par `dino-pmo`. Détail : `TODO.md`.
- Questions Q-DINO-1/3/4/5/6/12 (héritées, non tranchées) — voir `archive/decisions-2026-H1.md` § Questions ouvertes.

## Doctrine GED (référence)

Le texte plein de la doctrine (canon sans numéro, zéro chiffre en dur, frontière autoring/produit, checklist 8 axes) vit dans `.claude/rules/dino.md` § Doctrine GED (chargé automatiquement sur tout fichier dino) et dans `archive/decisions-2026-H1.md` § DEC-GED-001. Ce fichier ne le recopie pas (anti-recopie, L-D-45).
