# Backlog — Pôle DINO

> Tickets EP-xxx (chantiers) + Leçons L-xxx (patterns gravés). Tenu par `dino-pmo`.

## Tickets actifs

| ID | Sujet | Priorité | État |
|----|-------|----------|------|
| EP-D01 | ~~Vérifier count dinos (50 réel vs 60 ancien INDEX)~~ → **RÉSOLU 2026-06-03** : count autoritatif = **50** (`DINOS.length`). L'ancien « 60 » comptait des entrées non finalisées. Stale corrigés (INDEX, header data). | — | ✅ fermé |
| EP-D02 | Audio des ~28 dinos sans recap (génération progressive vs TTS) | 🟢 basse | ouvert |
| EP-D03 | Visuels/illustrations des écrans d'époque du voyage (optionnel) | 🟢 basse | idée |
| EP-D04 | 🚩 **Réécriture V2-émotionnelle audio INACHEVÉE** — seul `scripts-audio/parasaurolophus-V2.md` est fait (angle émotion + boucle fermée + tags `[happily][softly][gasps]`). Les ~21 autres dinos audio restent en **V1 factuel** (industrialisé EP-039, `*-V1.md`). À compléter sur le modèle Parasaurolophus (émotion + fluidité). | 🟡 moyenne | **ouvert — flag Papa Yann 2026-06-06** |
| EP-D05 | 🚩 **Audio désynchronisé après correction data (2026-06-06)** — 11 dinos corrigés (taille/poids/régime/amis vs Grokipédia). Leurs scripts `*-V1.md` + MP3 sont **sourcés de `dinos-data.js`** → ils portent les ANCIENS chiffres, à régénérer. Prioritaires (ont déjà l'audio) : **T-Rex** (12→13 m), **Diplodocus** (27→26 m), **Allosaure** (2,3→2 t), **Vélociraptor** (retrait « meute »). | 🟡 moyenne | ouvert |
| EP-D06 | 📖 **Page Dico Latin/Grec** — mots récurrents (69 racines dans `data/racines.json` prêt). Dépendance : **`data/racines.json` généré** (2026-06-08). Format : grille 2×N avec racine + décompo par dino (ex « -saur » = dino qui contient ce morceau). Apprentissage passif lecture 4-5 ans. | 🟢 basse | idée (ready to spec) |
| EP-D07 | 🎮 **Mini-jeu tri/déplacement dinos par couleur** — 50 dinos ont `color` + `png`. Manque silhouette/ombre SVG (pont pôle JEU, traité game-pmo). Interaction : random color → glisser dinos matching sur zone, feedback immédiat (points+sound). Taille 4 s par dino. | 🟢 basse | idée |
| EP-D08 | ⚔️ **Page Duel dino X vs Y** — comparer taille/poids/régime/superpower/chasseurs/proies. Data quasi prête (taille/poids/régime/superpower dans `dinos-data.js`, chasseurs/proies à lister). Storyboard : 2 fiches côte à côte, comparaison narrative (ex « T-Rex pèse comme 10 Véloci »). Pédagogie : décortique la prédation/hiérarchie. | 🟢 basse | idée |
| EP-D09 | 💪 **Page Forces/faiblesses par famille** — résumer par groupe (armure, vitesse, force…). Manque 2-3 attributs dérivés Grokipédia (vitesse estimée, force morsure). Dépendance : EP-D08 (data structure). Format : fiche famille + radar/liste 5 traits. | 🟡 moyenne | idée |
| EP-D10 | ❓ **Quiz — améliorer lecture** — 10-15 questions multi-choix par famille (générable depuis `dinos-data.js` + `data/racines.json`). Format : « Qui est le plus grand ? » + 3 réponses visuelles (PNG dinos). Réutilise image-carousel existante (cf MJ-XX). | 🟢 basse | idée (ready to spec) |
| EP-D11 | 🎙️ **Refonte récit Crétacé/extinction (audio Voyage)** — brief Papa Yann 2026-06-08 : (1) **trop long** — arrêter les fausses mini-histoires de chaque dino ; reframer « **la grande époque des grands prédateurs** » par continent (T-Rex Amérique du Nord, Tarbosaure Asie, Spinosaurus Europe/Afrique… **distribution à fact-checker dino-conseiller**) + les stars connues (Tricératops, Ankylosaure, Pachycéphalo…) en **top 10 dit hyper vite**. (2) Ajouter **volcans d'Inde (trapps du Deccan)** perturbant la Terre **avant ET après** la météorite. (3) Ajouter **tsunami + tremblements de terre** de l'impact. (4) La **chaîne de la vie** (1ʳᵉ partie) = OK, garder. (5) ⚠️ **L'extinction/la mort n'est pas dite clairement → confus** : rendre explicite « ils meurent ». | 🟡 moyenne | **brief Papa Yann 2026-06-08** |
| EP-D12 | 🌍 **Nouvelle section APRÈS la météorite (Cénozoïque / mégafaune)** — Papa Yann 2026-06-08 : prolonger le Voyage au-delà des dinos (mammouths, smilodon, terror birds, paraceratherium…). **Réfs déjà rassemblées** dans `content/inbox/` (dump session concurrente : *01_woolly_mammoths…28_hyaenodon*). À cadrer (écriture dino-conseiller). | 🟢 basse | idée (réfs en cours) |

## Leçons (L-xxx)

- **L-D01** — Un terme savant prononcé dans l'audio DOIT être expliqué dans la foulée (« ptérosaure » seul = incompris → « reptile volant comme le Ptéranodon »). L'enfant ne peut pas chercher un mot qu'il n'a pas.
- **L-D02** — Une catégorie d'onglet doit être **homogène** : « ce qu'il mange » = régimes alimentaires uniquement, pas de morphologie (« Volants & Marins » mélangeait les deux axes).
- **L-D03** — Un nom de famille = **nom scientifique honnête**. Ne pas renommer un groupe hétérogène d'un seul mot faux (ne pas appeler « Ptérosaures » un lot qui contient un mosasaure + un synapside).
- **L-D04** — Une accroche de menu s'écoute en **2-7 s** ; au-delà c'est un cours, l'enfant décroche. Le détail va dans les sections, pas dans l'accroche.
- **L-D05** — Tout audio doit passer le **grep-interdits** (`max|doudou|peluche|bus`) AVANT génération. L'incident « doudou de Max » venait d'un audio généré avant la consigne et jamais re-vérifié.
- **L-D06** — Les scripts/MP3 audio sont **sourcés de `dinos-data.js`** : toute correction de chiffre/fait dans la data **désynchronise l'audio existant**. Réflexe : corriger la data → **flaguer la régénération audio** (EP-D05). Ne jamais toucher un chiffre sans signaler l'audio à refaire.

## Changelog

### Session 2026-06-08
**Réorg `studio/dino/content/`** : 5 dossiers thématiques (sources/data/scripts/scripts-audio/inbox). `__dirname` réparés, régen-diff valide non-régression. INDEX refondus. **Suppression validée** : 12 scripts dialogue superseded (anciens `*-V1.md` ×10, `triceratops-V0.md`, `parasaurolophus-V2.md`) + `generate-audio-segments.py` (ancien pipeline) + `_gen-audio.sh` + 68 segments MP3 périmés. **Nouveau** : `data/racines.json` (69 racines greco-latin). **Features backlog ajoutées** : 5 tickets EP-D06→EP-D10 (Dico, Mini-jeu tri, Duel, Forces/faiblesses, Quiz). **Flags** : Flag A (canon périmé vs data), Flag B (brouillon 001-trex à confirmer). Chiffres invariants OK (50/9/4/22/8/4).

### Session 2026-06-06
Audit qualité images (P1-P4 : doublons/watermarks/mauvaises espèces/wiki-anglais) + nettoyage **169 orphelins** (0 restant). **50 fiches contexte-prompt Grokipédia** (`_FICHES-DINOS-GROKIPEDIA.md`, récupéré via Playwright). **Data-check Grokipédia** : 13 corrections appliquées à `dinos-data.js`. 🚩 Flags audio : **EP-D04** (V2-émotionnelle inachevée) + **EP-D05** (audio désync après fix data). Leçon **L-D06** (data→audio). Réflexe gravé en mémoire : WebFetch 403 → Playwright.

### Session 2026-06-03
Refonte UI + audio + création du pôle DINO (voir `sprint-log.md`). Décisions : pôle pair, Tritri sans méta, scission familles, régimes alimentaires, voix menus. Leçons L-D01→L-D05 gravées.
