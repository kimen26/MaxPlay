# Clôture — refonte GED site ↔ studio (2026-09-12)

> Audit d'ouverture : `2026-09-12-archi-ged-site-studio.md`. Décisions D-007 à D-012. 15 lanes (HO-R00 à HO-R99), 6 vagues, un commit par vague, 12 sous-agents Sonnet, orchestration Claude Fable. Rapports : `docs/handoffs/rapports/HO-Rnn.md`, briefs archivés dans `docs/handoffs/archives/2026-09-12-refonte-ged/`.

## Avant / après

| Mesure | Avant (audit) | Après | Note |
|---|---|---|---|
| Pack git | 3,82 Go | **2,65 Go** | cible < 1,2 Go **non atteinte** : le reste est l'historique des assets régénérés dans `site/` (audio dinos fr 739 Mo, paléoart 361 Mo cumulés), pas des chemins morts. Second tour = décision séparée (purger les anciennes versions d'assets déployés). |
| Fichiers trackés | 13 455 | **7 167** | `_archive/` (6 142) → vault zip, inbox et audio tiers supprimés |
| `studio/lunii/` sur disque | 894 Mo | **66 Mo** | `.build-*` purgés et ignorés, audio tiers supprimé, 1 moteur `build-pack.mjs` + 3 configs |
| `site/img/dinos` | 340 Mo | **265 Mo** | sprites + paléoart en webp, règle « pas de png/jpg > 300 Ko » dans `check` |
| Tables Supabase | 11 | **9** | `feedback`, `tile_refs` supprimées (migration 013) |
| Jeux visibles au Mur | 27 (9 absents, `mj-58` fantôme) | **36** | `mur.js` sans id en dur, `check-mj-coherence` bloquant en CI |
| Fichiers « générés » identifiables | 14 marqués, générateurs éparpillés | **10 dans `site/js/gen/`** + README, `npm run build` déterministe | dont `dinos-data.js` et `sw-version.js` depuis la vague 4 |
| Hors ligne | aucun SW, manifest sur 12/44 pages | **SW précache coquille, manifest sur 45 pages**, vérifié en captures | |
| LESSONS / TODO minijeux | 70 / 39 Ko | **20 / 9,7 Ko** | 120 L-NNN conservés (archive verbatim) |
| LESSONS / TODO dino | 68 / 46 Ko | **16,7 / 9,7 Ko** | 104 leçons conservées |
| Hooks | 4 processus par événement | **1 dispatcher par événement**, 5 tests, < 400 ms | |
| Agents sans point d'entrée | 4 | **0** (`quick` supprimé, 3 câblés) | |
| Handoffs faits hors archives | 22 | **0** | transverse + minijeux + dino |
| Source dino | `dinos-data.js` édité main, 4 copies par fait | **71 fiches JSON canon**, JS et en-têtes générés, contrôle data ↔ narré (4 écarts listés, en avertissement) | |

## Ce qui reste ouvert (dans `memory/TODO.md`)

- Pack git : deuxième réécriture si nécessaire (anciennes versions d'assets `site/`).
- `site/img/dinos/{grok,wiki}` (110 Mo) et `_new-*` : garder, réduire ou jeter.
- Bouton retour unifié : 23 mj gardent un lien `index.html` en dur (`back-button.js` ne matche que `.back`/`#hdr`).
- 4 écarts data ↔ narré (edmontonia, hatzegopteryx, titanis, aenocyon-taille côté MP3) : corriger le texte ou basculer le contrôle en bloquant.
- Questions Papa Yann des rapports : zonage et vignettes des 9 jeux revenus au Mur (R09), statuts HO-003..006 / HO-020-021 dino (R03).
- `site/js/i18n/*.js` restent hors `gen/` (R08).

## Incidents et leçons

- L-009 : suppression hors liste (polices Cursif) invisible aux portes du brief, vue par `run-all` transverse.
- L-010 : changement d'extension d'image cassé par des regex `(jpg|png)` dans 3 fichiers.
- CI : `check-mj-coherence` lisait un dump gitignoré (`textes-jeux.json`) → 36 manques dans le runner ; le `check` le régénère désormais.
- Plafond de dépense API atteint à 02:23 (HO-R11/R12 coupés, repris à 07:16). Un sous-agent R12 avait délégué à un sous-sous-agent (collision d'écriture, stoppée proprement).
- Session dino concurrente pendant la vague 4 : ses ajouts (DEC-TRITRI-002, plan nav encyclopédie) sont inclus dans le commit de la vague 4, non réécrits.
