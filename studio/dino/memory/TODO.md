# TODO — Pôle DINO

> Tickets ouverts uniquement, condensés en 1 ligne chacun (détail complet préservé verbatim dans `archive/backlog-fermes-2026.md` pour les tickets qui ont une partie close, et dans l'historique git pour le reste). Extrait le 2026-09-04 (HO-008) depuis l'ancien `pmo/backlog.md` (supprimé). Statuts : `[ ]` à faire · `[~]` en cours · `[!]` bloqué · `[?]` question ouverte.

## Lane — Alerte data

- **ALERTE-JP** [ ] — `dinos-data.js` L1170-71 cite deux fois « Jurassic Park » pour Deinonychus (violation figée ref-adulte, découverte audit 2026-07-17) : réécrire `desc` sans nommer la franchise + vérifier Dilophosaurus même pattern.

## Lane — Branchage audio orphelin (découvertes audit 2026-07-17)

- **EP-D-Menu-EP-Branchage** [ ] — Brancher les 8 accroches d'époque (`menu-ep-*.mp3`) dans l'onglet Voyage, jamais branchées depuis leur production 2026-06-15 — attend décision timing PY (avant/après audio i18n complet).
- **EP-D-Periodes-Branchage** [ ] — Brancher les 5 MP3 `periodes/*.mp3` (icône 🔊 période en fiche dino), données prêtes (`periode` déjà dans dinos-data.js).
- **EP-D-Audio-Carnotaurus-Baryonyx-Badge** [ ] — Badge `DINO_AUDIO_VERSION` affiche « V1 » à tort pour carnotaurus/baryonyx (audio V3 déjà produit) — vérif data + inspection `playDinoFunfact`.
- **EP-D-GED-08 (nommage)** [ ] — Renommer `dev-dinos.html` → `dinos.html` (dette nommage) + MAJ catalog.js + redirect + grep refs. Priorité basse.
- **EP-D-Image-FAM-EMBLEME-404** [ ] — 9 emblèmes familles référencent `.png` dans dinos-data.js mais fichiers déployés en `.jpg` → 18 404 masqués par fallback gracieux. Décision PY requise (renommer fichiers vs corriger refs).

## Lane — i18n audio (respellings + génération par langue, prioritées par PY)

- **EP-D-Audio-Noms-Respell** [!] — 60 noms vocaux FR à régénérer avec respellings syllabiques (post-reset quota EL) — bloqué historique, à revérifier si toujours pertinent vu la vague i18n 2026-09-03.
- **EP-D-Audio-i18n-EN/PT-BR/ES/IT/AR/RU/ZH/JA** [ ] — respellings + 60 noms MP3 par langue restante (AR/RU/ZH/JA demandent validation native critique, décisions dialectales listées dans l'archive). Note : la vague texte 2026-09-03 a déjà livré EN/ES-ES/PT-BR en STRINGS — ces tickets audio noms sont un chantier distinct (voix), à recroiser avant relance.
- **EP-D-Audio-Recap-Par-Dino** [ ] — Générer 60 MP3 « phrase d'époque » courte par dino pour mj-31 frise (bouton hover). Attente quota EL historique, à revérifier.

## Lane — Dette GED / étymo / architecture référentiel

- **EP-D-GED-03** [ ] — Basculer canon étymo `_ETYMO-RACINES-50.md` → `_ETYMO-COMPLET-60.md` (vérifier couverture mammifères Cénozoïque + Titanis + Edmontonia avant bascule).
- **EP-D-GED-04** [ ] — Renommage assets produit par `id` stable (`site/img/dinos/{id}.jpg`) — pas urgent, déclencheur = futur mini-jeu qui le nécessite.
- **EP-D-GED-05** [ ] — Statut `_BLOC-B-CANONIQUE.md` à trancher (régénérer vs geler explicitement) + archiver brouillon orphelin `scripts-audio/001-trex-brachiosaure-velociraptor.md`.
- **EP-D-ATOMES-PRONONCIATION-i18n** [ ] — Le lexique de prononciation ne sert QUE ElevenLabs ; le TTS navigateur reçoit le nom brut et écorche les noms savants. Architecture à valider avant tout code (gabarits pré-générés par langue, pas de concat à l'exécution). Détail : `memory/ARCHI-REFERENTIEL-CONTENU.md` (racine référentiel).
- **EP-D-AUDIO-DRIFT-COMPPOIDS** [ ] — Dérive entre `dinos-data.js` (canon vivant, refonte poids 2026-08-03) et scripts/MP3 V3 déjà produits (ex T-Rex dit encore « 3 hippopotames »). Chiffrage de portée requis avant régénération (probablement tous les dinos touchés par les commits 5c5906ce/58971fbc/65a10394).
- **EP-D-REFERENTIEL-CONTENU** [~] — Référentiel unique de contenu transverse (Lot 0 livré, Lots 1-4 non engagés). Plan : `memory/ARCHI-REFERENTIEL-CONTENU.md` (racine).
- **EP-D-ENROLEMENT-AUDIO** [ ] — Enrôler l'audio dino au catalogue référentiel (mécanique d'abord : 466/563 fichiers déjà verbatim ailleurs) ; 27 fichiers (accroches époques, récits, extinction, périodes) sans texte source retrouvé = vraie dette à transcrire ou réécrire.
- **EP-ARCH-01** [ ] — Archiver la session relecture V3 (8 fichiers `_RELECTURE-*` + `_FACTCHECK-paleo-grokipedia.md`) vers `_archive/sessions/2026-06-15-relecture-v3/`.
- **EP-D16** [ ] — Créer `content/scripts-audio/INDEX.md` (catalogue 51 fichiers V3 par vague) + entrée « Fact-checks & audits » dans `content/INDEX.md`. Dépend d'EP-ARCH-01.

## Lane — Idées produit (basse priorité, jamais démarrées)

- **EP-D02** [ ] — Audio des ~28 dinos sans recap (génération progressive vs TTS).
- **EP-D03** [ ] — Visuels/illustrations des écrans d'époque du voyage (optionnel).
- **EP-D07** [ ] — Mini-jeu tri/déplacement dinos par couleur (pont pôle JEU, manque silhouette/ombre SVG).
- **EP-D08** [ ] — Page Duel dino X vs Y (comparaison narrative, data quasi prête).
- **EP-D09** [ ] — Page Forces/faiblesses par famille (dépend EP-D08).
- **EP-D10** [ ] — Quiz multi-choix par famille (ready to spec).
- **EP-D11** [ ] — Refonte récit Crétacé/extinction du Voyage (brief PY 2026-06-08 : raccourcir, ajouter trapps du Deccan + tsunami/séismes, rendre l'extinction explicite).
- **EP-D12** [ ] — Nouvelle section Voyage après la météorite (Cénozoïque/mégafaune) — réfs déjà rassemblées dans `content/inbox/`.

## Lane — Audit échelle scripts audio FR réécrits (2026-09-03, BLOQUANT)

- **AUDIT-ECHELLE-FR-32** [!] — 32 fiches audio FR hors tolérance sur l'échelle de poids (règle ≤10%) suite à la réécriture du 2026-09-03 par une autre session (ex. Parasaurolophus +60%, Amargasaurus +33%, T-Rex +13%). **Régénération des 68 scripts NON exécutée, bloquée sur cet audit.** 9 fiches ont la comparaison fausse répétée dans la réplique de Wex → réécriture du bloc entier requise, pas un simple `replace`. Le dialogue dynamique lui-même est validé PY et doit être préservé (phrasé allégé gardé, seule la comparaison chiffrée doit être corrigée). i18n (en/es-es/pt-br) non contaminée, ses valeurs sont justes.

## Lane — Questions Papa Yann (2026-09-03, non tranchées)

> Section préservée verbatim depuis `pmo/backlog.md` (écrite par une autre session le 2026-09-03 à 22:54, avant cette migration).

- **Idée PY : ajouter le terme macro « Mésozoïque »** (et sa famille de termes) pour Max — les 5 `DINO_PERIODES` sont plates, sans niveau Ère. Proposition conseiller : 3 Ères (Paléozoïque → Permien / Mésozoïque = Trias+Jura+Crétacé = « l'âge des dinosaures » / Cénozoïque) en en-têtes de l'onglet « Les époques ». ⚠️ Touche une ligne FIGÉE (UI 5 onglets / `buildMenuEpoque`) → tranché par PY, alerte rouge si on passe à l'acte.
- **Challenge taxo transmis à PY** — 2 points de friction réels : (1) Pachycéphalosaure rangé chez les Cératopsiens (vrai groupe = Marginocéphales, cousins) ; (2) Gallimimus + Oviraptor rangés chez les Dromæosaures (ce sont Ornithomimidé + Oviraptoridé, pas des dromæosauridés). Options : renommer libellé honnêtement vs déplacer vs statu quo assumé. Reste assumé OK : Énaliosaures (panier « reptiles marins » incl. Archelon tortue), Plateosaure prosauropode, Archaeoptéryx chez Dromæosaures (lien oiseaux assumé), Ptérosaures + synapsides libellés honnêtement.
- **Drift count détecté** : `dinos-data.js` live = **71** entrées DINOS (zéro doublon id), INVARIANTS dit 70 et sa table familles est plus vieille encore (Thyréophores=8 live vs 7, `arme`=5). À réconcilier par `dino-pmo` au prochain audit (qui est le 71ᵉ ? vraisemblablement ajout post-Saurolophe non tracé).

- 2026-09-03 (audit infra, HO-G08) : `audio-verif` (skill global) mesure ~80 ms de silence de tête sur les MP3 dino (règle 250 ms) et une dérive texte/audio sur `aenocyon-taille` (MP3 « kangourou » vs JSON « Papa »). Ticket : passer `audio-verif` sur les 70 fiches (voir `memory/TODO.md` racine).
