# TODO — quoi ensuite

> Ouverture/fermeture de chantier. Les lanes livrées se vident dans `CHANGELOG.md`.
> Détail d'exécution = dans le handoff (`docs/handoffs/HO-xxx.md`), jamais ici. Règles d'orchestration et registre : `docs/handoffs/README.md`. Remis à plat le 2026-09-12 : la refonte infra 2026-09-03 est livrée et archivée (`docs/handoffs/archives/2026-09-03-refonte-infra/`).

## CHANTIER CLOS — Refonte GED site ↔ studio (ouvert et livré le 2026-09-12, clôture : `memory/audits/2026-09-12-cloture-refonte-ged.md`)

Audit : `memory/audits/2026-09-12-archi-ged-site-studio.md`. Décisions : D-007 à D-012. Un handoff par lane, exécuté par un sous-agent Sonnet sauf mention ; l'orchestrateur commite chaque vague avant d'ouvrir la suivante. **Definition of done d'une lane** : ses portes passent, son rapport est dans `docs/handoffs/rapports/`, l'orchestrateur a relu le `git status`, la vague est commitée, le handoff descend dans `docs/handoffs/archives/2026-09-12-refonte-ged/`.

| Vague | Handoff | Résultat observable (DoD) | Statut |
|---|---|---|---|
| 0 | HO-R00 (orchestrateur) | plus de binaire tiers ni d'archive dans le tree, gitignore générique, branches mortes supprimées, migration 013 appliquée | fait |
| 1 | HO-R01 minijeux docs GC | 0 ref `pmo/`, 0 lien md mort, 36/36 figées, scripts dino rendus, mockups supprimés | fait |
| 1 | HO-R02 minijeux mémoire | LESSONS ≤ 20 Ko, TODO ≤ 8 Ko, 0 L-NNN perdu | fait |
| 1 | HO-R03 dino mémoire + dé-triplication | mêmes tailles, chaque règle dans un seul fichier, handoffs dino archivés, 45 Mo de refs supprimés | fait |
| 1 | HO-R06 lunii moteur unique | 3 packs reconstruits identiques par `build-pack.mjs`, `.build-*` purgé après build | fait |
| 1 | HO-R07 site assets morts | 0 rip sous droits, 0 asset non référencé listé, casse `pt-br` unique, Playwright vert | fait |
| 2 | HO-R08 package racine + `site/js/gen/` | `npm run build` sans diff, `npm run check` et `npm test` verts, README du gen/ | fait |
| 3 | HO-R09 Mur ← catalogue + check + gabarit | `mur.js` sans id en dur, 36 jeux visibles ou justifiés, `check-mj-coherence` bloquant en CI, `mj-template.html` | fait |
| 3 | HO-R10 dédoublonnage runtime mj | 0 `speechSynthesis` brut, 0 speak/confetti local, chaque mj touché vert | fait |
| 4 | HO-R12 fiche canon dino | `dinos-data.js` généré octet pour octet, check data ↔ narré produit sa liste | fait |
| 4 | HO-R11 service worker | menu et un jeu s'ouvrent hors ligne (captures), manifest sur 44 pages | fait |
| 4 | HO-R04 hooks + agents | 1 processus par événement hook, tests hooks verts, agents JEU/DINO tranchés | fait |
| 5 | HO-R13 WebP | −150 Mo sur `site/img/dinos`, 0 image cassée, règle poids dans `check` | fait |
| 5 | HO-R14 routine `npm run gc` | premier rapport gc produit en < 60 s, 0 faux positif audio | fait |
| 6 | HO-R99 (orchestrateur) | pack git < 1,2 Go, Pages vert après force-push, CHANGELOG + audit de clôture, crons supprimés | fait |

Reliquats absorbés : INDEX minijeux (R01) · pages `speechSynthesis` brut (R10) · commentaires obsolètes `mj-46.html:40`, `mj-50.html:90`, `avatar-picker.js:5,16` (R10) · dérive `aenocyon-taille` (R12) · scripts dino dans minijeux (R01).

## CHANTIER CLOS — Nettoyage assets (images, audio, banque de sons) (ouvert et livré le 2026-09-12, briefs : `docs/handoffs/archives/2026-09-12-nettoyage-assets/`)

Demande Papa Yann : « tout ce qui n'est plus utilisé peut être supprimé ». Hors périmètre : `studio/narration/**` (D-011) et le pack tiles LimeZu (déjà dans le vault `_archive-2026-09-12.zip`). On garde : images dino validées (paléoart, avatars, ombres, sprites, familles, plantes, fonds), 4 vidéos, tout ce que nous avons généré (Grok/ChatGPT/ElevenLabs), toutes les voix EL narrateur H/F et Wex. Sons tiers supprimés sec. Bibliothèque de sons reconstruite par ÉVÉNEMENT, bibliothèque de mots modulables (chiffres, dinos, périodes, familles, lettres, phonèmes…) cadrée. Audits en cours : `memory/audits/2026-09-12-nettoyage-assets-{images,audio,banque-sons}.md`. Audits relus le 2026-09-12 : 0 son tiers restant, 0 lien cassé, audio dino FR tracé 71/71. Le nettoyage porte sur la banque de sons (~9,6 Mo d'orphelins, 1 bug réel) et les dossiers de travail locaux.

| Vague | Handoff | Résultat observable (DoD) | Statut |
|---|---|---|---|
| 1 | HO-N01 banque de sons par événement | 0 mp3 sans pool ni consommateur dans `site/sounds/`, `_BANQUE-SONS.md` par événement et par mot modulable, `quel-dino-manque.mp3` joué, Playwright vert | fait |
| 1 | HO-N02 rangement audio dino (Haiku) | `fr/V3/` = 71 fiches exactement, 4 tickets gravés, `_grok-test` supprimé | fait |
| 1 | HO-N03 orchestrateur | `_new-*` vidés (25 Mo), `.artifacts` purgé, vague commitée | fait |

Questions Papa Yann (hors DoD) : 8 langues sans fiche audio sélectionnables au menu (LANGUES-NOM-SEUL, TODO dino) · run EN post-reset quota à lancer (AUDIO-EN-INTEGRAL).

## Décisions attendues de Papa Yann (hors refonte)

- [ ] MCP `supabase-maxvoyage` : vit dans `~/.claude.json` (utilisateur), donc visible depuis MaxPlay. À déplacer dans le `.mcp.json` du projet MaxVoyage.
- [ ] `memory/audio/PLAN-AUDIO-I18N.md` (2026-07-08) : plan **proposé**, jamais revalidé point par point (convention `<lang>/`, casting `Native <lang>`, gouvernance registre, Supabase Storage hors FR).
- [ ] `memory/GLOSSAIRE.md` : valider les termes ❓, puis passer le vocabulaire partout (handoff par pôle une fois tranché).
- [ ] Pousser les 6 skills globaux sur `kimen26/claude_conf` via `Sync-Skills-github-ProPerso` (action externe).
- [ ] Recette réelle du parcours compte → sync (P30 Pro, 360 px).
- [ ] Nom de domaine (~10 €/an). Resend SMTP + template `{{ .Token }}` bloqué par la config SMTP custom.

## Backlog post-refonte (à ouvrir après la vague 6)

- [ ] GIT : second tour `git filter-repo` si le pack (2,65 Go) doit descendre sous 1,2 Go — purger les anciennes versions d'assets `site/audio/dinos`, `site/img/dinos/paleoart` (décision Papa Yann : on perd l'historique des régénérations).
- [ ] DINO : 4 écarts data ↔ narré listés par `check-coherence-data-narre` (edmontonia, hatzegopteryx, titanis) : corriger le narré ou la fiche, puis passer le contrôle en bloquant.
- [ ] JEU : `site/js/i18n/*.js` (9 bundles générés) à descendre dans `site/js/gen/`.

- [ ] DINO : `i18n.config.json` + brancher `~/.claude/skills/i18n-contenu/scripts/check-i18n.mjs`.
- [ ] DINO : migrer `dino-images-lunii/scripts/{gpt-gen,gpt-gen-dino,grok-gen-dino}.mjs` sur `browser-pilot` (bug qualité Grok, bouton Télécharger).
- [ ] DINO : `site/img/dinos/{grok,wiki}` (63 Mo de galerie secondaire) : garder, réduire ou supprimer.
- [ ] AUDIO : migrer les 17 scripts ElevenLabs vers `~/.claude/skills/tts-pipeline`, loudnorm unique I=-16/TP=-1.5/LRA=11.
- [ ] AUDIO : `audio-verif` bascule `--stt-model scribe_v2` quand `scribe_v1` sera déprécié.
- [ ] NARRATION (hors périmètre refonte, D-011) : skill `name-sonority-check` (8 axes, verdict /16), agent dédié ou skill seule.
