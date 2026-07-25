# CHANTIER NID — plan complet (GO PY 2026-07-26)

> Fusion des 2 brainstorms (game-conseiller + Kimi), GO Papa Yann : « prend le meilleur des deux,
> pose les choses complètement, valide avec le conseiller, mets en œuvre intelligemment —
> code mutualisé homogène, bien architecturé, efficient ; UX fluide, intuitive, fun. »
> Voix : différée (décision commune plus tard). Drag du Mur : conservé tel quel (Q2 non tranchée).

## 0. Ce qu'on retient de chaque brainstorm

| Source | Retenu |
|---|---|
| Kimi | Recadrage : sortir après le sans-faute = SAIN. Problème = enchaîner + revenir. Le NID (œuf par jeu terminé → nid visible → éclosion → dino), œuf doré de série, écran victoire 3 boutons, frise-chemin par copain, jeu recommandé, vignettes parlantes, missions V3. |
| Conseiller | A1 difficulté par compétence (pas par étoiles) — cause racine du « trop facile ». A2 partie sauvegardée. A3 fin non-parfaite valorisée (compliment processus). B2 bandeau collection ombres/couleur. Fouille du jour (fusionne avec mission V3). Neutralité thématique du moteur (fossile/œuf aujourd'hui, véhicule demain). Étoile rétrogradée en trophée discret. |
| Écarté (pour l'instant) | Voix menus (GO PY en attente) · tap d'entrée du Mur (drag conservé) · carnet du paléontologue · expéditions multi-repaires (recouvert par frise+missions) · cartes-surprises (recouvert par l'œuf surprise, à re-proposer plus tard en variante). |

## 1. La boucle cible

```
MUR
 ├─ NID visible (œufs en attente + jauge éclosion)          [nouveau]
 ├─ Bandeau collection : dinos gagnés en couleur, ombres sinon → tap = fiche  [B2]
 └─ Rangées copains avec 3 vignettes-aperçu                 [C1]
      ↓ (drag inchangé)
REPAIRE = FRISE-CHEMIN
 └─ jeux en ligne : fait=tamponné · prochain=brille · suivants=silhouettes
    + LE jeu recommandé en grand (« Celui-ci ! »)
      ↓
JEU (golden)
 ├─ niveau = compétence réelle (taux de réussite), plus les étoiles [A1]
 ├─ sortie en cours = partie sauvegardée, reprise au retour        [A2]
 └─ FIN (toutes questions faites, parfait ou non) :
      ├─ ŒUF gagné → vole vers le nid (MaxFX)                      [NID]
      ├─ valorisation processus, étoile sans-faute = bonus discret [A3]
      └─ 3 boutons : ENCORE ! · LA SUITE (grand, jeu suivant de la frise) · Maison
      ↓ (3 parties enchaînées sans Maison → œuf DORÉ)
ÉCLOSION (au 3e œuf, sur le Mur)
 └─ l'œuf craque → dino surprise (jamais promis lequel) → cri + célébration
    → rejoint la collection (bandeau + encyclopédie)
```

## 2. Décisions de design (à valider conseiller)

1. **Rythme** : 1 œuf par partie TERMINÉE (toutes les questions jouées, parfait ou non — sinon on recrée la conditionnalité). Éclosion à **3 œufs**. Anti-inflation : max **3 œufs/jour** par enfant (au-delà : la partie reste valorisée, « le nid est plein pour aujourd'hui, reviens demain » = raison de revenir).
2. **Œuf doré** : 3 parties enchaînées sans retour Maison (via bouton La suite/Encore) → le prochain œuf est doré → l'éclosion qu'il déclenche donne un dino **rare** (pondération : doré pioche dans les 20 % les moins communs). Jamais annoncé à l'avance la 1ʳᵉ fois — surprise découverte.
3. **Tirage éclosion** : dino non possédé, pondéré vers les familles déjà entamées (complétion narrative) ; doré → rare. 62 dinos ≈ 186 parties de runway.
4. **Étoiles** : inchangées côté données (Stars), mais l'UI de fin ne les PROMET plus — le sans-faute déclenche la cinématique étoile comme bonus surprise. Piste golden en jeu inchangée.
5. **Niveau (A1)** : `niveau = f(historique tracker)` — montée si ≥80 % de réussite sur les 2 dernières parties du jeu, descente douce si <40 % (jamais annoncée). Cap 0-2 comme aujourd'hui. Les étoiles n'y participent plus.
6. **Calibrage nombres** (précision PY) : l'enfant additionne des MILLIERS en manipulation décomposée (boules/barres de 10/carrés de 100/cubes de 1000), très accompagné — les paliers nombre doivent monter en **manipulation visuelle** (groupements), pas en calcul mental abstrait.
7. **Neutralité thématique** : le moteur s'appelle `collection.js`, parle d'« items » et de « capsules » en interne ; le skin œuf/dino est une config. Demain : véhicule/garage sans réécrire.
8. **Éclosion = sur le Mur** (retour au menu) et non en jeu — ça donne une raison de rentrer au Mur, et le nid est le théâtre. Si 3e œuf gagné en pleine série, badge « ça bouge dans le nid ! » sur le bouton Maison/Suite.
9. **Encyclopédie** : le bandeau collection (pôle JEU) pointe vers les fiches. Le marquage « possédé » DANS dev-dinos.html = pôle DINO → coordination dino-pmo en phase 2, pas bloquant.

## 3. Architecture (mutualisation)

| Fichier | Rôle |
|---|---|
| `site/js/collection.js` **[nouveau]** | Moteur générique : état (localStorage `maxplay_collection_v1`, par profil), API `grantCapsule({golden})`, `canGrantToday()`, `pending()`, `hatch()` → item, `owned()`, `streak` de série. Zéro DOM. Sync cloud via `child_state` (phase 2). |
| `site/js/nid-ui.js` **[nouveau]** | Rendu du nid sur le Mur + cinématique d'éclosion (compose les primitives MaxFX/celebrations — CONTRAT v2 : on enrichit la bibliothèque, pas d'anim maison par jeu). Skin œuf/dino branché sur `DINO_ASSETS` + `dinos-data` (cris : réutiliser `sounds/fx/dino-bebe-*`). |
| `site/js/mj-golden.js` | A1 (niveau par tracker) · A2 (save/resume `maxplay_resume_<id>`) · A3+fin 3 boutons + octroi œuf (`Collection.grantCapsule`) + vol MaxFX vers pip-nid. `nextGame()` via `MJKit.chain`. |
| `site/js/mj-kit.js` | `MJKit.chain(id)` : ordre des jeux par catégorie depuis catalog.js (source unique) → jeu suivant pour « La suite » et pour la frise. |
| `site/js/mur.js` + `mur.css` | Nid + bandeau collection + vignettes-aperçu sur rangées + frise-chemin dans le repaire (remplace la grille). Coordination Kimi (fichiers chauds — commits rapides, chemins explicites). |
| Tests | `tests/collection.spec.mjs` (moteur pur : grant/hatch/cap/streak) · `tests/mur.spec.mjs` (nid, frise, éclosion) · specs golden existantes MAJ (écran fin 3 boutons casse des asserts actuels) · `audit-gabarit` vert partout. |

Perf : zéro nouvelle requête réseau (assets existants), état en localStorage, rendu nid = DOM léger (<20 nœuds), pas de lib externe.

## 4. Phasage d'exécution

- **P0** : validation de ce plan par game-conseiller (challenge + ajustements).
- **P1 — moteur** : `collection.js` + spec moteur (pur, testable sans UI). 1 agent.
- **P2 — jeu** : mj-golden (A1+A2+A3+fin 3 boutons+œuf) + `MJKit.chain`. 1 agent. ⚠️ touche tous les golden → MAJ des specs impactées + sweep harnais complet.
- **P3 — Mur** : nid-ui + bandeau collection + vignettes rangées + frise-chemin repaire. 1 agent. ⚠️ fichiers partagés avec Kimi.
- **P4 — intégration** : sweep harnais complet (tous les jeux à spec), audit-gabarit all, test de la boucle bout-en-bout (Playwright : jouer 3 parties → 3 œufs → éclosion → collection), captures pour PY.
- **P5 — traces** : figées (écran de fin = nouveau standard → STANDARD-MJ § CONTRAT v3 en PROPOSITION à PY, pas d'auto-figeage), backlog, sprint-log, tickets V3 (missions/reliques/voix).

## 5. Réactions prévues / risques

- **Il spamme le même jeu facile pour les œufs** → cap 3 œufs/jour + niveau qui suit la compétence (le jeu se durcit) + frise qui met le prochain en avant.
- **2 monnaies confuses** → l'étoile disparaît du discours de fin (bonus muet), l'œuf est seul mis en scène. Si confusion au playtest → on tranche.
- **Éclosion ratée si l'enfant quitte l'app avant le Mur** → l'œuf reste `pending`, l'éclosion attend le prochain passage au Mur (rien ne se perd).
- **Specs harnais cassées en masse par le nouvel écran de fin** → P2 inclut la MAJ des asserts `end-wrap` dans les specs impactées, AVANT push.
- **Conflit sessions Kimi sur mur.js/mur.css** → P3 committé immédiatement, chemins explicites, vérif HEAD.
- **Régression figées** : chaque agent lit `figees/mj-XX.md` ; l'écran de fin étant transverse, vérifier qu'aucune figée ne grave l'ancien écran (le cas échéant → alerte 🚨, pas de passage en force).
