# TODO — Pôle DINO

> Tickets ouverts uniquement, 1 ligne chacun. Détail complet (historique, décisions, chiffres) dans
> `archive/backlog-2026-09-vagues.md` (vagues 2026-09-05 → 2026-09-11, rotation 2026-09-12 HO-R03) et
> `archive/backlog-fermes-2026.md` (tickets antérieurs fermés). Statuts : `[ ]` à faire · `[~]` en cours
> · `[!]` bloqué · `[?]` question ouverte.

## Audio (bloqué quota EL, reset 2026-09-11 passé — à revérifier)

- **VOYAGE-V2 / GO** [~] — 12 récits Voyage fusionnés au canon, 12/12 audio FR régénérés et padés. Reste : EN (150 clips hors fiches, JSON prêt) au quota. Détail archive.
- **EPIC-VOYAGE-V2** [~] — Refonte narrative du Voyage en épisodes enrichis, cadrage `PROPOSITION-VOYAGE-V2.md`. Détail archive.
- **RECIT-EXTINCTION-V3 / SUSPENSE** [~] — Audio jugé « mou, plat » par PY malgré l'escalier de tags ; reprise EN MANUEL prévue (session dédiée PY). Pistes à tester listées en archive.
- **AUDIO-EN-INTEGRAL** [!] — Bloqué quota EL (chiffrage ≈ 270 k caractères), décision palier PY requise. Runbook `docs/handoffs/HO-019-reprise-audio-quota.md`.
- **HO-012** [~] — Relecture croisée FR 71/71 PASS, polish top 10 non bloquant en cours.
- **VITESSE** [~] — Champ `vitesse_kmh` collecté (HO-009), décision d'affichage UI à trancher avec PY (**VITESSE-UI** `[?]`).
- **AUDIO-FR-35** [!] — 35 fiches FR restantes (sauropodes/thyréophores/marins/avant-dinos/mégafaune) bloquées quota EL.
- **ECOUTE-PY** [ ] — Papa Yann doit écouter : musiques, SFX, fiches T-Rex 4 langues.
- **EP-D-Audio-Noms-Respell** [!] — 60 noms vocaux FR à régénérer avec respellings syllabiques (à revérifier si toujours pertinent).
- **EP-D-Audio-i18n-EN/PT-BR/ES/IT/AR/RU/ZH/JA** [ ] — respellings + 60 noms MP3 par langue restante.
- **EP-D-Audio-Recap-Par-Dino** [ ] — 60 MP3 « phrase d'époque » courte par dino pour mj-31 (à revérifier).
- **LUNII-VOYAGE-12** [!] — Pack Lunii Voyage resté à 8 épisodes vs 12 sur le site ; étiquettes + rebuild au reset EL.
- **EP-D13 (flore)** [ ] — Audio ElevenLabs des fiches plantes non fait (solde bloqué) — ticket à ouvrir formellement.

## Data / branchage / dette GED

- **EP-D-Periodes-Branchage** [ ] — Brancher les 5 MP3 `periodes/*.mp3` en fiche dino.
- **EP-D-Audio-Carnotaurus-Baryonyx-Badge** [ ] — Badge `DINO_AUDIO_VERSION` affiche « V1 » à tort pour carnotaurus/baryonyx.
- **EP-D-GED-08** [ ] — Renommer `dev-dinos.html` → `dinos.html` (dette nommage, priorité basse).
- **EP-D-Image-FAM-EMBLEME-404** [ ] — 9 emblèmes familles `.png` en data vs `.jpg` déployé → 18 404 masqués. Décision PY requise.
- **GLOSSAIRE** [~] — Vocabulaire unique (Fiche dino / Texte fiche / Script audio / Audio) à propager partout.
- **ALERTE-JP** [~] — Vérifier Dilophosaurus même pattern que l'ancien incident Deinonychus (franchise nommée).
- **EP-D-GED-03** [ ] — Basculer canon étymo `_ETYMO-RACINES-50.md` → `_ETYMO-COMPLET-60.md`.
- **EP-D-GED-04** [ ] — Renommage assets produit par `id` stable (pas urgent).
- **EP-D-GED-05** [ ] — Statut `_BLOC-B-CANONIQUE.md` à trancher + archiver brouillon orphelin.
- **EP-D-ATOMES-PRONONCIATION-i18n** [ ] — Architecture lexique prononciation multi-langue à valider avant code.
- **EP-D-REFERENTIEL-CONTENU** [~] — Référentiel unique de contenu transverse, Lots 1-4 non engagés.
- **EP-D-ENROLEMENT-AUDIO** [ ] — Enrôler l'audio dino au catalogue référentiel ; 27 fichiers sans texte source = dette à transcrire.
- **EP-ARCH-01** [ ] — Archiver la session relecture V3 (8 fichiers) vers `_archive/sessions/2026-06-15-relecture-v3/`.
- **EP-D16** [ ] — Créer `content/scripts-audio/INDEX.md` (dépend EP-ARCH-01).
- **site/img/dinos/_new-*** [ ] — Intégrer ou jeter, gitignorés par pattern (ajouté 2026-09-12, HO-R03).

## Idées produit (basse priorité)

- **EP-D02** [ ] — Audio des ~28 dinos sans recap.
- **EP-D03** [ ] — Visuels des écrans d'époque du voyage (optionnel).
- **EP-D07** [ ] — Mini-jeu tri/déplacement dinos par couleur (pont pôle JEU).
- **EP-D08** [ ] — Page Duel dino X vs Y.
- **EP-D09** [ ] — Page Forces/faiblesses par famille (dépend EP-D08).
- **EP-D10** [ ] — Quiz multi-choix par famille.
- **EP-D11** [ ] — Refonte récit Crétacé/extinction du Voyage.
- **EP-D12** [ ] — Nouvelle section Voyage après la météorite (Cénozoïque/mégafaune).

## Questions Papa Yann non tranchées (2026-09-03)

- **Mésozoïque en macro-info** — proposition 3 Ères en en-têtes de l'onglet Époques ; touche une ligne FIGÉE, tranché par PY.
- **Challenge taxo** — Pachycéphalosaure chez Cératopsiens (vrai groupe Marginocéphales) ; Gallimimus/Oviraptor chez Dromæosaures (faux, Ornithomimidé/Oviraptoridé). Décision PY requise.
- **Drift count** — `dinos-data.js` live = 71 entrées, INVARIANTS dit 70 : à réconcilier par `dino-pmo`.
- **audio-verif sur 70 fiches** — dérive détectée `aenocyon-taille` (MP3 vs JSON) ; à généraliser.

## Retours Papa Yann 2026-09-08 — nid, œufs, navigation fiche

- [ ] Ouverture d'œuf : dino décalé/sombre sur sombre, invisible. Recentrer + éclaircir fond ou halo. (miroir EP-121 pôle JEU)
- [ ] Fiche d'un dino gagné : bouton retour casse le fil (page vide → famille) au lieu de revenir au nid d'origine. (miroir EP-122)
- [ ] Fin de jeu avec gain : proposer un bouton « Aller dans le nid ». (miroir EP-120)
- [ ] Audit des fonds des dessins dinos : vérifier qu'aucune couleur de fond n'entre dans le dino.

## Refonte navigation (idée Papa Yann 2026-09-09, recherche 2026-09-10)

- [ ] Décision d'écran d'accueil en 4-5 portes musée/bibliothèque (Voyage vs Époques se recouvrent, illisible à 4 ans). Maquettes : `studio/dino/docs/research/nav-encyclopedie/pistes.html`.
- [ ] Question ouverte : les mini-jeux dino doivent-ils avoir une porte dédiée depuis l'encyclopédie ?
- [ ] Pills de navigation débordent à 360 px (defaut d'accès réel, vérifié capture).
- [ ] Synthèse concurrents (Britannica Kids, Dinopedia, Pok Pok, Khan Academy Kids) : mécanisme de sélection abstrait = le vrai obstacle 4 ans, cible tactile hors clous, scroll horizontal non découvrable. Détail complet en archive.

## Scelidosaurus / étanchéité (clos, référence)

- [x] 71/71 dinos complets (8/8 axes) depuis Scelidosaurus le 2026-09-11 — voir `memory/_ETAT-DINOS.md` (généré).
