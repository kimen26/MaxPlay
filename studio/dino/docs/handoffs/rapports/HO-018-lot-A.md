# HO-018 — Rapport lot A : scripts audio EN hors fiches

> Exécutant : sous-agent Sonnet (lot A). Livré 2026-09-05. Aucun MP3, aucun appel ElevenLabs, aucun JSON, aucun git, aucun sous-agent, aucune édition de `site/` — conforme au hors périmètre du brief.

## Fichiers produits

| Fichier | Clips | Caractères EN (parlé, tags exclus) |
|---|---|---|
| `content/i18n/en/scripts-hors-fiche/menus.md` | 20 (11 familles + 4 régimes + 5 onglets écrits) | 2 246 |
| `content/i18n/en/scripts-hors-fiche/periodes.md` | 5 | 362 |
| `content/i18n/en/scripts-hors-fiche/recits.md` | 8 | 7 063 |
| `content/i18n/en/scripts-hors-fiche/speciaux.md` | 8 (4 blocs Pangée + 4 blocs Extinction) | 3 958 |
| **Total** | **41 clips** | **13 629 caractères** |

Coût ElevenLabs indicatif (TTS native puis speech-to-speech ≈ ×2) : environ **27 258 caractères facturables**.

## 3 clips les plus longs

1. `recit-glace-mammouth` — 1 330 car. (le plus riche : 8 échanges Narrateur/Wex, âge de glace + arrivée des humains)
2. `recit-intro` — 1 089 car. (naissance de la vie, 9 échanges)
3. `recit-trias` — 898 car.

## Détail des 41 clips

- **Familles (11)** `menu-fam-<id>` : trex, cou_long, arme, cornu, bec, raptor, pterosaures, enaliosaures, volant, mammiferes, oiseaux.
- **Régimes (4)** `menu-regime-<cat>` : carnivores, herbivores, piscivores, omnivores.
- **Onglets (5 écrits / 6 attendus)** `menu-<mode>` : regime, familles, voyage (3 accroches déjà en MP3 FR, texte source `MENU_FALLBACK`) + epoques, dico (2 nouvelles, jamais produites en FR, texte source `T('menu_epoque_intro')` / `tts_fallback_dico`). `menu-accueil` NON écrit — voir ambiguïté ci-dessous.
- **Périodes (5)** `periodes/<id>` : permien, trias, jurassique, cretace, cenozoique. Texte construit sur les `label`/`desc` déjà validés dans `content/i18n/en/strings.json` § `periodes` (Permian, Triassic, Jurassic, Cretaceous, Cenozoic) — repris tels quels, pas réinventés.
- **Récits (8)** `recit-<id>` : intro, trias, jurassique, cretace, extinction, mammiferes, glace-mammouth, paleo. Source : `RECITS-EPOQUES.md` (DIALOGUE V5, voix FR `narrateur_f`/`wex`). Libellés machine gardés `NARRATEUR H`/`WEX` conformément au format du brief, indépendamment de la voix FR source.
- **Spéciaux (8 blocs)** `special-pangee-<a|b|c|d>` + `special-extinction-<a|b|c|d>`. Source : scripts FR archivés `_archive/2026-07-18-ancien-pipeline/special-pangee.md` et `special-extinction.md` (format machine déjà NARRATEUR H/WEX).

## Ambiguïtés de source (non contournées)

1. **`menu-accueil` — texte source FR introuvable.** Le MP3 `site/audio/dinos/fr/menu-accueil.mp3` existe côté produit, mais :
   - `MENU_FALLBACK` (`site/dev-dinos.html`) n'a jamais eu de clé `accueil`.
   - `setMode()` n'appelle `playMenuVoice()` qu'avec `regime`/`famille`/`periode`/`epoque`/`dico` — jamais `accueil`.
   - Recherche complète du repo (grep FR + git history sur `dev-dinos.html`/`dino-ui.js`) : aucune trace d'un texte "accueil".
   - Conclusion probable : MP3 orphelin d'une ancienne version du menu (avant l'actuel système à 5 onglets). **Non écrit** plutôt qu'inventé — à trancher : soit le retirer du produit, soit fournir le texte FR manquant pour que je le traduise.

2. **8 accroches `menu-ep-*` (`menu-ep-intro/trias/jurassique/cretace/extinction/mammiferes/glace-mammouth/paleo`) — texte source FR introuvable.** Les MP3 existent (`site/audio/dinos/fr/menu-ep-*.mp3`), le nommage suit exactement les 8 `recit-*`, mais :
   - Aucune référence dans le code JS (`dev-dinos.html`, `dino-ui.js`) — contrairement à `menu-fam-*`/`menu-regime-*` qui sont câblés via `MENU_FAM_VOICE`/`MENU_REGIME_VOICE`.
   - Aucun fichier source dans `content/sources/recits/` ni `content/scripts-audio/`.
   - Hypothèse la plus probable : accroche courte "teaser" jouée avant le récit complet de chaque époque (pattern analogue aux accroches famille/régime), jamais retrouvée en script écrit. **Non écrit** — 8 clips manquants dans ce lot, à combler dès que le texte FR canon est identifié ou reconstitué par Papa Yann/dino-conseiller.

3. **Spéciaux Pangée/Extinction — clarification structurelle (pas un blocage).** Le brief mentionne "6 spéciaux" ; le repo ne contient que 6 MP3 produits (`special-extinction-a/b/c/d` + `special-extinction-recap` + `special-pangee-recap`), mais le script `_gen-recaps.sh` confirme que les `-recap` sont de pures concaténations ffmpeg des blocs A-D (0 texte propre, 0 appel API). Le texte FR complet des 4 blocs Pangée existe (`_archive/2026-07-18-ancien-pipeline/special-pangee.md`) même si Pangée n'a jamais eu ses 4 MP3 individuels produits, seulement son recap. J'ai donc livré les 8 blocs de texte EN (Pangée A-D + Extinction A-D) pour couvrir l'intégralité du contenu parlé ; les recaps EN n'ont besoin d'aucun texte séparé (même logique de concaténation prévue côté FR).

## Notes de conformité

- Tags : uniquement la liste `TAGS_OK` de `_verif-scripts-audio.cjs` (31 tags). Densité vérifiée programmatiquement sur les 41 clips : aucun manquement (>70 car. → ≥2 tags dont 1 au milieu ; >140 → ≥3 ; jamais 2 tags adjacents ; jamais de tag en toute fin).
- Wex : zéro `!` sur les 41 clips (vérifié), questions terminées par `?`.
- Unités : miles/feet/inches arrondis (ex. météorite "six miles wide", Titanoboa "forty feet long").
- Interdits vérifiés absents : Max/doudou/peluche/nounours, "regarde", bus (hors échelle fiches, non concerné ici), Jurassic Park.
- Noms de dinos : forme plate (Tyrannosaurus, Triceratops, Velociraptor, etc.) — pas de respelling syllabique, ces clips ne sont pas des fiches dino individuelles.
