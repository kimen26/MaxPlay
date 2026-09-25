# TODO — Pôle DINO

> Tickets ouverts uniquement, 1 ligne chacun. Détail complet (historique, décisions, chiffres) dans
> `archive/backlog-2026-09-vagues.md` (vagues 2026-09-05 → 2026-09-11, rotation 2026-09-12 HO-R03) et
> `archive/backlog-fermes-2026.md` (tickets antérieurs fermés). Statuts : `[ ]` à faire · `[~]` en cours
> · `[!]` bloqué · `[?]` question ouverte.
> Revue 2026-09-25 (chaque ticket confronté au code) : fermés car faits — voix des périodes branchées (`dev-dinos.html:729`), badge audio carnotaurus/baryonyx en V3 (`dev-dinos.html:2470`), emblèmes familles tous en `.png` (plus de 404), `_new-*` vidés, drift 70/71 réconcilié (INVARIANTS = 71), ancien `site/js/dinos-data.js` supprimé, œuf décalé/sombre et bouton « Au nid » en fin de jeu (commit `3b53f1ac`). Les 4 écarts data↔récit + `oviraptor` EN ne sont plus suivis qu'ici (retirés des TODO JEU et transverse).

## Audio (bloqué quota EL, reset 2026-09-11 passé — à revérifier)

- **VOYAGE-V2 / GO** [~] — 12 récits Voyage fusionnés au canon, 12/12 audio FR régénérés et padés. Reste : EN (150 clips hors fiches, JSON prêt) au quota. Détail archive.
- **EPIC-VOYAGE-V2** [~] — Refonte narrative du Voyage en épisodes enrichis, cadrage `PROPOSITION-VOYAGE-V2.md`. Détail archive.
- **RECIT-EXTINCTION-V3 / SUSPENSE** [~] — Audio jugé « mou, plat » par PY malgré l'escalier de tags ; reprise EN MANUEL prévue (session dédiée PY). Pistes à tester listées en archive.
- **AUDIO-EN-INTEGRAL** [!] — Fiches EN 71/71 + 56 clips hors-fiche (20 menus, 3 eres, 33 dico) generes le 2026-09-12, methode STS 2 passes. QUOTA EPUISE au 12/09 (reset 11/10, verifie le 13/09 : 121391/121391 consommes). Reste 94 clips / 37 492 caracteres / ~48 365 credits (13 recits Voyage, 68 dico, 8 speciaux, 5 periodes) : tout tient dans un seul quota mensuel. Brief pret : `docs/handoffs/HO-A02-audio-en-hors-fiche.md`.
- **HO-012** [~] — Relecture croisée FR 71/71 PASS, polish top 10 non bloquant en cours.
- **VITESSE** [~] — Champ `vitesse_kmh` collecté (HO-009), décision d'affichage UI à trancher avec PY (**VITESSE-UI** `[?]`).
- **AUDIO-FR-35** [x] — Perime, verifie le 2026-09-13 : les 71 fiches FR ont leurs 5 blocs (nom, taille, regime, funfact, recap), 0 incomplet. Le ticket datait d'un blocage quota leve depuis.
- **ECOUTE-PY** [ ] — Papa Yann doit écouter : musiques, SFX, fiches T-Rex 4 langues.
- **EP-D-Audio-Noms-Respell** [!] — 60 noms vocaux FR à régénérer avec respellings syllabiques (à revérifier si toujours pertinent).
- **EP-D-Audio-i18n-EN/PT-BR/ES/IT/AR/RU/ZH/JA** [ ] — respellings + 60 noms MP3 par langue restante.
- **EP-D-Audio-Recap-Par-Dino** [ ] — 60 MP3 « phrase d'époque » courte par dino pour mj-31 (à revérifier).
- **NOMS-COURTS-SCELIDOSAURUS** [ ] — 70/71 noms courts dans `site/audio/dinos/<lang>/noms/` : le Scelidosaure (71e dino, ajoute le 2026-09-11) manque dans les 12 langues, verifie le 13/09. A generer avec HO-A02.
- **LANGUES-NOM-SEUL** [x] — Tranche le 2026-09-13 (PY, D-013) : seules `fr` et `en` sont proposees. `es-es`/`pt-br` (13 fiches sur 71) et les 8 langues sans fiche sont retirees de `SUPPORTED` (`site/js/lang.js`, `site/js/mj-shell.js`) et de `LANGUES` (`site/js/mur.js`). Rien n'est supprime du disque, seule la porte se ferme.
- **LUNII-MENU-EP-5** [ ] — 5 étiquettes `menu-ep-{naissance-terre,vie-dans-eau,sortie-eau,reptiles-permien,grande-mort}.mp3` manquantes, à faire avec l'étape 6 de HO-019 (compléter LUNII-VOYAGE-12 si même sujet).
- **LUNII-VOYAGE-12** [!] — Pack Lunii Voyage resté à 8 épisodes vs 12 sur le site ; étiquettes + rebuild au reset EL.
- **REFERENTIEL-96-DETTES** [ ] — 96 dettes « script modifié après le dernier MP3 » dans `studio/referentiel/_ETAT-CONTENU.md` : à acquitter ou régénérer par lot.
- **EP-D13 (flore)** [ ] — Audio ElevenLabs des fiches plantes non fait (solde bloqué) — ticket à ouvrir formellement.

## Data / branchage / dette GED

- [x] **REC-2026-09-19** — Soldé 2026-09-25 : `oviraptor.chasseurs` EN corrigé (« Velociraptor, other carnivores », `studio/dino/content/i18n/en/strings.json` + régénéré). Les 4 écarts `check-coherence-data-narre` étaient tous une limite du parseur (edmontonia : nombres en toutes lettres non reconnus ; hatzegopteryx/titanis : vitesse dite en BLOC C, hors de la zone scannée) — script corrigé (cardinaux FR 0-20 + vitesse cherchée sur tout le document), 0 vrai écart de fond. `npm run check`/coherence-data-narre : 71 fiches, 0 écart.

- **EP-D-GED-08** [ ] — Renommer `dev-dinos.html` → `dinos.html` (dette nommage, priorité basse).
- **GLOSSAIRE** [~] — Vocabulaire unique (Fiche dino / Texte fiche / Script audio / Audio) à propager partout.
- [x] **ALERTE-JP** — Vérifié 2026-09-25 : data (`dinos-data.js`/JSON), script audio V3 et les 6 images paléoart (hero/headshot/manger/coloriage/écosystème/paris) de Dilophosaurus ne reprennent aucun élément Jurassic Park (pas de collerette, pas de crachat de venin, taille réelle 7 m respectée, deux crêtes anatomiquement correctes). Le script audio rappelle même explicitement la charte en commentaire. Rien à corriger.
- **EP-D-GED-03** [ ] — Basculer canon étymo `_ETYMO-RACINES-50.md` → `_ETYMO-COMPLET-60.md` : **NON basculé 2026-09-25**, formats incompatibles — `_ETYMO-RACINES-50.md` est structuré par `id` avec bullets racine/langue/sens (ce que lit `_etymo2racines.cjs`), `_ETYMO-COMPLET-60.md` est un texte narratif par famille de régime avec noms d'affichage FR en en-tête, sans structure exploitable par le parseur actuel. Basculer casserait la génération de `dinos-racines.js` (onglet Le dico). Décision Papa Yann nécessaire : écrire un nouveau parseur pour le format COMPLET-60, ou l'abandonner comme brouillon et garder RACINES-50 comme canon (à graver explicitement si tranché).
- **EP-D-GED-04** [ ] — Renommage assets produit par `id` stable (pas urgent).
- [x] **EP-D-GED-05** — Statut `_BLOC-B-CANONIQUE.md` tranché 2026-09-25 : **gelé volontairement**, artefact pré-V3 superseded par le Bloc B dialogué de `scripts-audio/fr/V3/<id>.md` (canon depuis HO-R12). Ni lu par un script en prod, ni régénéré. Gardé pour l'historique (canon-sans-numéro), noté dans `content/INDEX.md` + `content/sources/INDEX.md` + `sources/mesures/_ECHELLE-REFERENTIEL.md` (référence corrigée vers le vrai canon).
- **EP-D-ATOMES-PRONONCIATION-i18n** [ ] — Architecture lexique prononciation multi-langue à valider avant code.
- **EP-D-REFERENTIEL-CONTENU** [~] — Référentiel unique de contenu transverse, Lots 1-4 non engagés.
- **EP-D-ENROLEMENT-AUDIO** [ ] — Enrôler l'audio dino au catalogue référentiel ; 27 fichiers sans texte source = dette à transcrire.
- [x] **EP-ARCH-01** — Fait 2026-09-25 : 8 fichiers (`_RELECTURE-*` + `_PROMPT-RELECTURE-EXTERNE.md`) déplacés par `git mv` vers `_archive/sessions/2026-06-15-relecture-v3/` (aucun script ne les lisait, `_md2json-v3.cjs` les exclut déjà par préfixe).
- [x] **EP-D16** — Fait 2026-09-25 : `content/scripts-audio/INDEX.md` créé (zéro chiffre en dur, pointe vers INVARIANTS.md).

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
- **audio-verif sur 70 fiches** — dérive détectée `aenocyon-taille` (MP3 vs JSON) ; à généraliser.

## HO-R12 livré (2026-09-12) — fiche canon dino

- [x] `studio/dino/content/dinos/<id>.json` (71 fiches) = source unique ; `site/js/gen/dinos-data.js` généré, identique octet pour octet à l'ancien `site/js/dinos-data.js` au premier run.
- [x] `_gen-etat-dinos.cjs`, `_md2json-v3.cjs` lisent les JSON (plus de regex sur le JS).
- [x] En-têtes « Chiffres data » régénérés sur les 71 scripts audio V3 FR.
- [x] `check-coherence-data-narre.cjs` ajouté à `npm run check` (avertissement, jamais bloquant) : 4 écarts restants après corrections du parseur — `edmontonia` (nombres en toutes lettres, hors portée V1 du parseur), `hatzegopteryx`/`titanis` (vitesse absente du BLOC B alors que la fiche a `vitesse_kmh`, à vérifier par un humain). Détail complet : `docs/handoffs/rapports/HO-R12.md`.
- [ ] **`aenocyon-taille` reste un écart MP3 vs JSON** (audio-verif, pas texte vs JSON) : ce contrôle HO-R12 ne le détecte pas et ne peut pas le détecter (portée différente). Toujours à traiter via `audio-verif`.

## Retours Papa Yann 2026-09-08 — nid, œufs, navigation fiche

- [x] Fiche d'un dino gagné : bouton retour casse le fil → **non reproduit 2026-09-25** (déjà corrigé par le commit `3b53f1ac` « le dino sort au bon endroit »). Méthode : Playwright, `dev-dinos.html?open=<id>` (mécanisme réel du nid via `nid-ui.js`) puis clic sur le bouton retour de la fiche — retombe bien sur la grille de la famille du dino, jamais une grille vide. Le bloc `EP-122` en fin de `dev-dinos.html` pose `currentMode`/`currentCatId` avant `showFiche2()`, exactement la cause racine visée par ce ticket.
- [ ] Audit des fonds des dessins dinos : vérifier qu'aucune couleur de fond n'entre dans le dino.
- [x] **BEBES-OEUF** — Livré 2026-09-25 (GO PY) : les 58 espèces qui pondent ont leur bébé dans sa coquille (`site/img/dinos/bebes/`), montré à l'éclosion du Nid. 3 refaits après revue (Édaphosaure pris pour un Dimétrodon, Hatzegopteryx pris pour un Ptéranodon, Saurolophe avec la crête du Parasaurolophus) : signatures renforcées dans `batch-dino-bebe.mjs`. Reste les 13 vivipares (ticket suivant).
- **BEBES-VIVIPARES** [?] — Question PY : 13 espèces ne sortent pas d'un œuf (7 mammifères + Mosasaure, Élasmosaure, Liopleurodon, Ichtyosaure, Ophtalmosaure, Shonisaure — vivipares). Bébé dans un œuf quand même (logique du jeu) ou bébé sans œuf (encyclopédie = vrai) ? En attendant : tête adulte.
- **NID-INTRO-DOUBLE-CHAMBRE** [ ] — Vu en test 2026-09-25 : 1er œuf d'un profil neuf + arrivée par `?open=nid` → l'intro « Un œuf ! Garde-le au chaud » rouvre une chambre au bout de 6 s (`nid-ui.js` `finish()` → `openChambre()`) PENDANT le théâtre d'éclosion lancé par le deep-link : la nouvelle chambre recouvre la révélation. Pas lié aux bébés.
- [x] **BEBES-TAILLE-REVELATION** — Livré 2026-09-25 (GO PY) : après l'éclosion, le bébé s'affiche en grand au centre avec son nom (2,6 s ou un tap), puis s'envole dans sa case (`nid-ui.js` `presenterBebe`). Corrigé au passage : la case d'album restait invisible après l'éclosion (`MaxFX.hatch` masque son ancre).

## Refonte navigation (idée Papa Yann 2026-09-09, recherche 2026-09-10)

- [ ] Décision d'écran d'accueil en 4-5 portes musée/bibliothèque (Voyage vs Époques se recouvrent, illisible à 4 ans). Maquettes : `studio/dino/docs/research/nav-encyclopedie/pistes.html`.
- [ ] Question ouverte : les mini-jeux dino doivent-ils avoir une porte dédiée depuis l'encyclopédie ?
- [x] Pills de navigation débordent à 360 px → **corrigé 2026-09-25** (structure de nav inchangée, juste la mise en page) : `#mode-selector` passe de scroll horizontal caché (`overflow-x:auto` + scrollbar `display:none`, "Le dico" hors champ sans indice visuel) à `flex-wrap:wrap` centré, `.mp-pill` passe à `min-height:48px` (cible tactile). Vérifié Playwright 360 et 320 px : 5 pills sur 3 lignes, aucune ne déborde, `scrollWidth === innerWidth` aux deux largeurs.
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

## Accueil du site = armoire (décision PY 2026-09-15, chantier pôle JEU HO-MJ-12/13)

- [ ] Sur l'armoire d'accueil, le livre « Les dinos » et le globe ouvrent tous deux `MUR.openEncyclo()` en v1. Quand le mode étagère de l'encyclopédie sera codé (piste A retenue par PY), le globe doit atterrir DIRECTEMENT sur le Grand Voyage (deep-link à définir, ex. `dev-dinos.html?v=7&mode=voyage`), le livre sur l'étagère des familles.
- [ ] Objets GPT réservés pour l'étagère dino (non utilisés par l'accueil) : bébé dino mascotte, pile livres+cartes+puzzle — voir `site/img/armoire/obj-dino.webp`, `obj-livres-jeux.webp`.

## Brainstorm 2026-09-19 — micro-jeu avant fiche, récompenses, capteurs (dossier `docs/research/2026-09-19-brainstorm-mj-dino.md`)

- [ ] **Décision attendue Papa Yann** : péage avant fiche. dino-conseiller dit NON (exploration libre, 5 taps à raccourcir, D-003) ; game-conseiller dit OUI sous forme « tourniquet qui n'arrête jamais » (fiche s'ouvre quoi qu'il arrive, jamais sur fiche neuve, 1/3). Compromis proposé dans le dossier. Ticket JEU EP-136. Aucune ligne de code avant arbitrage — touche `showFiche` (dev-dinos.html).
- [ ] EP-D17 — « Vidéo dino » : on n'en produit pas ; diaporama Ken Burns sur les 5 scènes paléoart existantes, synchronisé au récit audio existant (coût S, JS pur). Les 4 MP4 existants restent des capsules (ticket JEU EP-138).
- [ ] EP-D18 — « Musique dino » : thème d'ambiance court (10-15 s boucle) par FAMILLE, pas par dino (9 max), via EL compose_music — quota à surveiller. Ambiance en exploration ET berceuse-capsule d'éclosion (EP-138).
- [ ] EP-D19 — « Histoire dino » : déjà là (bouton violet Écoute l'histoire, ~40 dinos audio). Rien à débloquer. Reste : pilote d'une VRAIE histoire narrée (pôle narration) attachée à 1 dino.
- [ ] EP-D20 — Capteurs encyclopédie : 1 seul survivant = secouer = tremblement de pas, réservé aux 2-3 vrais géants (Patagotitan, Brachiosaure), bonus du bloc Sa taille, jamais en gate. Rejetés : souffler (gadget), noir (capteur mort + fait non sourcé), cri à deviner (on ne connaît PAS le cri, casse Encyclopédie = VRAI), prononcer (reconnaissance FR sur noms latins échoue).
- [ ] EP-D21 — Enrichissements fiche, priorité conseiller : « Et aujourd'hui ? » descendant vivant (oiseaux/crocodile, fact-check Grokipedia, S-M) et « Comment on le sait » mini-paléontologie 1-2 phrases (seule façon honnête de dire « on imagine », M-L). Puis : comparaison de taille enfant 1 m (S), frise « qui vivait en même temps » (M), dinos voisins de la famille en bas de fiche (S), badge records vérifiés (M), fiche texte parent hors ligne (S), repère humain pour les millions d'années (S, atelier écriture).
- [ ] Questions dino natives pour quiz/tourniquet, par robustesse à 4 ans : silhouette→nom > carnivore/herbivore > cri (NON, cf. EP-D20) > époque (5-6 ans) > première lettre (noms courts seulement) > racine grecque (parent/6 ans+).

## Étymologie audio perdue (retour Papa Yann 2026-09-24, L-D-84)

- [ ] EP-D22 — Réécrire le bloc A des 9 scripts V3 dont le dialogue ne nomme jamais la langue (tyrannosaurus, giganotosaurus, amargasaurus, archelon, mammuthus, mosasaurus, ophthalmosaurus, quetzalcoatlus, shonisaurus) : chaque racine + sa langue + « en entier ». T-Rex fait le 2026-09-24 (script + JSON), MP3 à régénérer sur GO (quota). Puis relire les 62 autres : la langue est dite, mais est-elle dite pour CHAQUE morceau ?
- [ ] EP-D23 — Porte `_verif-scripts-audio.cjs` : bloc A doit contenir chaque racine de `_ETYMO-RACINES-50.md` pour l'id et au moins un nom de langue (grec/latin/…). KO bloquant. Cause racine de L-D-84.
- [ ] Régénérer `tyrannosaurus-nom.mp3` FR (STS v2 dialogue, ≈ 400 car.), puis EN/ES/PT si le bloc EN a le même trou (vérifier `scripts-audio/en/`).
- [ ] Le `-recap.mp3` est la concaténation nom+taille+regime+funfact (`_gen-recaps.sh`) : régénérer le recap T-Rex avec le nom. Et `tyrannosaurus-regime.mp3` est désynchronisé depuis 66d2bed7 (09-12, « l'emportait presque toujours ») : à refaire dans le même lot.
- [ ] Option 0 crédit : l'ancien `tyrannosaurus-nom.mp3` (blob 69fee1c6, commit 4b8b354e du 2026-07-25) contenait la décomposition complète — voix/pipeline d'avant STS v2, à écouter avant de choisir entre restaurer et régénérer.
- [ ] La décision « noms latin/grec + sens, quoi que dise le panel » (Papa Yann, 2026-05-17) ne vit que dans l'auto-memory, pas dans le repo : à graver en ligne 🔒 dans `figees/encyclopedie.md` (Papa Yann confirme le texte).
- [ ] Mesure 2026-09-25 (retour Papa Yann « c'est l'échange Narrateur/Wex qui apprenait ») : sur 71 blocs A, Wex participe encore au sens du nom (devine, assemble, reprend) dans 64 ; les 7 restants sont des mégafaunes à nom non grec (coelodonta, edmontonia, glyptodon, mammuthus, paraceratherium, smilodon, titanis) où il réagit plutôt qu'il ne traduit — à relire à l'oreille, pas prioritaire. Le seul vrai cassé était le T-Rex. La figée à graver dit donc : « bloc A = chaque racine + sa langue + Wex qui assemble le sens en entier ».
