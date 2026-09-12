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

## HO-R12 livré (2026-09-12) — fiche canon dino

- [x] `studio/dino/content/dinos/<id>.json` (71 fiches) = source unique ; `site/js/gen/dinos-data.js` généré, identique octet pour octet à l'ancien `site/js/dinos-data.js` au premier run.
- [x] `_gen-etat-dinos.cjs`, `_md2json-v3.cjs` lisent les JSON (plus de regex sur le JS).
- [x] En-têtes « Chiffres data » régénérés sur les 71 scripts audio V3 FR.
- [x] `check-coherence-data-narre.cjs` ajouté à `npm run check` (avertissement, jamais bloquant) : 4 écarts restants après corrections du parseur — `edmontonia` (nombres en toutes lettres, hors portée V1 du parseur), `hatzegopteryx`/`titanis` (vitesse absente du BLOC B alors que la fiche a `vitesse_kmh`, à vérifier par un humain). Détail complet : `docs/handoffs/rapports/HO-R12.md`.
- [ ] **`aenocyon-taille` reste un écart MP3 vs JSON** (audio-verif, pas texte vs JSON) : ce contrôle HO-R12 ne le détecte pas et ne peut pas le détecter (portée différente). Toujours à traiter via `audio-verif`.
- [ ] Ancien `site/js/dinos-data.js` supprimé une fois la porte diff validée — si un script legacy le référence encore ailleurs que les 8 fichiers du brief, corriger le chemin.

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

## Plan de refonte nav encyclopedie — l'objet plutot que la categorie (2026-09-12)

Idee Papa Yann : etagere / livre / bibliotheque d'objets, « globe terrestre = le grand voyage ».
Elle coche ce que la recherche concurrents a valide (voir bloc du 2026-09-10) : l'objet EST le
sommaire visuel, et sa forme dit sa fonction sans un mot. Maquettes des 3 declinaisons :
`studio/dino/docs/research/nav-encyclopedie/etagere.html` (A etagere · B grand livre · C musee).

- [ ] **Mesure faite : le chemin reel de Max est de 5 taps** — Mur, tap Roi T-Rex, tap vignette encyclo
  (`MUR.openEncyclo()`, `site/js/mur.js:388`), pill, carte famille, vignette dino. Les apps primees
  tiennent en 1 ou 2. **Consequence dure : tout nouvel ecran doit REMPLACER l'ecran de pills, jamais
  s'ajouter devant.** C'est le critere qui elimine une maquette, pas le gout.
- [ ] **Recommandation : piste B, le grand livre** (2 taps). Les dinos sont visibles des l'ouverture,
  les intercalaires changent la PAGE sans ouvrir de menu. C'est le « visual table of contents »
  d'Ultimate Dinopedia, et l'exact contraire de la molette de sections qui a fait classer Britannica 8+.
  A (etagere) reste un menu de categories deguise : on prend un objet pour atterrir sur une liste,
  soit le meme compte de taps qu'aujourd'hui. C (musee) porte la reserve deja connue (« on regarde,
  on ne touche pas »).
- [ ] **Le globe regle le probleme que 4 maquettes precedentes n'ont pas regle** : un globe TOURNE donc
  il part, un livre se FEUILLETTE donc on y pioche. La frontiere Voyage (raconter) / Epoques (ranger)
  n'a plus besoin d'un mot pour se dire. A garder quelle que soit la piste retenue.
- [ ] **Decision attendue de Papa Yann** avant toute ligne de code : quelle piste, et est-ce que les
  jeux dino entrent dans l'objet (A et C leur donnent une place, B non).
- [ ] Si B est retenu, verifier d'abord que la grille de dinos en page tient la cible NN/G de 2 cm
  (75-80 px CSS) a 360 px : 2 colonnes OK, 3 a mesurer.
