# Rapport HO-R07 — Site : assets morts et rips sous droits

**Statut brief :** rapport reçu

## 1. Suppressions (fichiers, poids)

| Cible | Fichiers | Poids approx. |
|---|---|---|
| 14 rips racine `sounds/` (Pokémon, Mario, FF7, Zelda, SNCF, RATP, freesound, `perdu.mp3`) | 14 | ~1,4 Mo |
| `sounds/phonemes-test/` | 65 | 1,3 Mo |
| `sounds/music/generique-v1..v3.mp3` (non référencés) | 3 | — |
| `design-shared/mockup.{css,js}` + `design-shared/fonts/{Cursif.ttf,Cursifl.ttf}` | 4 | 284 Ko |
| `img/decor/{meteorite_feu,nuage_gris}.png` | 2 | — |
| `js/decor.js`, `js/pins.js`, `js/voices-manifest.js` | 3 | — |
| **Total** | **91 fichiers supprimés** | **git diff --stat : 88 fichiers touchés, 232 lignes en moins** |

Renommage (pas une suppression) : `sounds/voix/pt-BR/` → `sounds/voix/pt-br/` (15 fichiers, 444 Ko), fait via nom intermédiaire `pt-br-tmp` (Windows insensible à la casse).

**Non supprimé malgré le brief — voir § Questions** : `site/img/dinos/traces/` (15 fichiers, ~1 Mo) — référencé par un vrai script (`studio/dino/content/scripts/export/_audit-fiches-complet.cjs:17` : `const traces = new Set(rd('site/img/dinos/traces'))`, alimente son rapport "top 15"). Le grep du brief ne portait que sur `site/*.html site/js` ; en élargissant à `studio/`, la référence apparaît. Pas dans mes fichiers autorisés donc je ne peux ni le vider ni corriger le script consommateur.

**`sounds/music/victoire-v1..v4.mp3`** : tous les 4 référencés (pool `victory` de `victory-sounds.js`), donc conservés — mais **pas renommés** sans suffixe (contrairement au point 3 du brief), voir § Questions.

## 2. Table rip → remplaçant

| Rip supprimé | Référencé dans | Remplaçant libre déjà présent |
|---|---|---|
| `sounds/ff7_victory.mp3` | `victory-sounds.js` (pool `victory`) | `sounds/fx/victoire-grande.mp3` (déjà dans le pool, doublon retiré) |
| `sounds/victory-mario-series-hq-super-smash-bros.mp3` | `victory-sounds.js` (pool `victory`), `mj-golden.js` ×2 | `sounds/ui/fanfare-victoire.mp3` |
| `sounds/zelda-tresor.mp3` | `victory-sounds.js` (pool `victory`) | `sounds/fx/trompette-fanfare.mp3` |
| `sounds/bus-closing-door-sound.flac` | `mj-48.html` ×2 (`sfx(...)`) | `sounds/ui/porte-bus.mp3` |
| `sounds/freesound_community-bus-pop-85054.mp3` | `mj-golden.js` (pop étoile) | `sounds/fx/pop-apparition.mp3` |
| `sounds/honk-sound.mp3` | `victory-sounds.js` (pool `error`) | `sounds/ui/klaxon.mp3` |
| `sounds/perfect-fart.mp3` | `victory-sounds.js` (pool `error`) | `sounds/fx/prout-long.mp3` |
| `sounds/pew.mp3` | `victory-sounds.js` (pool `error`) | `sounds/fx/boing.mp3` |
| `sounds/pikachu_mw38Ry2.mp3` + `pikachu_scream.mp3` | `mj-13a.html`, `mj-13c.html` (tirage aléatoire) | `sounds/fx/tada.mp3` + `sounds/fx/applaudissements.mp3` |
| `sounds/ratp-jingle.mp3` + `sncf-france-jingle.mp3` | `index.html` (tirage aléatoire au 1er clic) | `sounds/ui/moteur-bus.mp3` + `sounds/ui/klaxon.mp3` |
| `sounds/freesound_community-bus-doors-sound-effect-44034.mp3` | aucune référence code trouvée | supprimé sans remplacement (orphelin) |
| `sounds/perdu.mp3` | aucune référence code trouvée (mot « perdu » dans un commentaire ≠ chemin) | supprimé sans remplacement (orphelin) |

Correctif annexe (même famille de bug) : `LANGUES_INVITEES` dans `victory-sounds.js` déclarait `code: 'pt-BR'` (majuscule) alors que `_langActive()`/`window.Lang.current()` (site/js/lang.js, hors périmètre) renvoie `'pt-br'` minuscule — corrigé en `'pt-br'` pour matcher le nouveau nom de dossier et le code langue déjà utilisé partout ailleurs sur le site.

## 3. Sorties Playwright / portes

```
$ cd studio/minijeux/tests && node audit-gabarit.mjs
36 jeux audités
20 cadre conforme · 16 avec dette · 0 BLOQUANT
migration gabarit shell : 36/36
✓ aucun bloquant — cadre sain

$ npm run mj:test mj-13a
PASS panneau règle ouvert automatiquement à la 1ʳᵉ partie
PASS panneau refermé
PASS piste golden (pips) présente
PASS Niveau 1 = 2 bus
PASS un tap correct → Bravo
PASS Aucune erreur JS / console (smoke)
✓ mj-13a OK — push autorisé

$ npm run mj:test mj-13c
PASS panneau règle ouvert automatiquement à la 1ʳᵉ partie
PASS panneau refermé
PASS piste golden (pips) présente
PASS Niveau 1 = file de 3 bus
PASS réponse correcte → Bravo
PASS Aucune erreur JS / console (smoke)
✓ mj-13c OK — push autorisé

$ node run.mjs mj-48
PASS panneau règle ouvert automatiquement
PASS panneau refermé
PASS Bus rendu via busSVG()
PASS mj-48 : bus 162 rendu dans la couleur officielle IDFM (bleu #0064B1, pas le fallback rouge)
PASS 10 sièges en 2 rangées de 5
PASS Toutes les tuiles QCM verrouillées juste après une bonne réponse
PASS N0 : type count, ≤5 passagers
PASS N0 : sièges occupés = réponse attendue
PASS QCM 3 choix avec la bonne réponse
PASS Bouton QCM ≥ 80px
PASS Erreur : la question reste ouverte (retry)
PASS Bonne réponse : la manche avance
PASS Ordinal : file de 3-5, rang cible 2+
PASS Ordinal : plan caché (focus sur la file)
PASS Ordinal : tap du bon rang gagne la question
PASS Écran de fin golden atteint
PASS Zéro mot punitif
PASS Aucune erreur JS / console (smoke)
✓ mj-48 OK — push autorisé

$ node run.mjs index
PASS profil : avatar présent
PASS profil : compteur ⭐ global
PASS raccourci 🥚 (chambre) présent
PASS raccourci 🦕 (Padidi) présent
PASS 6 copains dans la vallée
PASS décor posé (≥5 éléments)
PASS le Roi T-Rex lit son livre
PASS le Roi n'est pas collé au bord bas de l'écran
PASS bulle : aucun défilement horizontal (tout en 2-3 lignes)
PASS mini-menu avatar visible
PASS modale gate ouverte
PASS étape 1 = bouton à maintenir (pas d'entrée directe)
PASS encyclo verrouillée → modale code ouverte (flux TRITRI inchangé)
PASS mauvais code → message affiché
PASS bon code → modale fermée (dinos débloqués)
PASS Aucune erreur JS / console (smoke)
✓ index OK — push autorisé

$ node studio/referentiel/build.mjs
registre : 924 clés
dettes ouvertes : 94 (sur 639 lignes suivies)
dérives de fait : 1
audio en retard : 0
canaux manquants : 0
consignes sans voix : 4
voix texte non trace : 167
écrit : studio/referentiel/registre.json + _ETAT-CONTENU.md + empreintes.json
```

`index` teste explicitement zéro erreur JS console — preuve directe que retirer le chargement dynamique de `voices-manifest.js` dans `tracker.js` (et la suppression de `decor.js`/`pins.js`, déjà sans loader) ne casse rien à l'exécution réelle.

## 4. Proposition d'arborescence `site/sounds/` (NON appliquée)

Principe : **la langue est un dossier, jamais un suffixe.** Par usage, pas par type technique :

```
site/sounds/
├── ui/                     ← identité sonore du hub (clics, portes, klaxon, étoile…)
├── feedback/               ← ex-pools victory/end-doux/success/error/apparition/collecte
│   ├── victory/            ← ex sounds/music/victoire-v*.mp3 + sounds/fx/victoire-*.mp3
│   ├── erreur/
│   └── apparition/
├── voix/
│   └── <lang>/              ← fr, en, es, it, ja, zh, pt-br… (fr = défaut, pas de dossier "fr" spécial si déjà la racine actuelle)
│       ├── f/ h/ wex/
│       └── phrases/
├── music/                  ← boucles ambiance/musique de fond (menu, calme, suspense)
├── nombres/
│   └── <lang>/
├── phonemes/
│   └── <lang>/
└── pieces/                 ← cas spécifique mj-37, reste à part (pas de langue)
```

Ce que ça change concrètement : `sounds/music/victoire-v1..v4.mp3` migrerait vers `sounds/feedback/victory/` avec des noms qui disent la variante sans suffixe de version numéroté au sens SemVer (ex. `victoire-chiptune.mp3`, `victoire-fanfare-cymbale.mp3`, `victoire-synth-marimba.mp3`, `victoire-fanfare-choeur.mp3` — décrire le son, pas la date de génération). `sounds/nombres/` et `sounds/phonemes/` gagneraient un niveau `<lang>/` au lieu d'être fr-only implicite. Chantier à part entière (renommage massif + mise à jour de tous les appelants JS + du référentiel) — hors périmètre de ce brief, juste esquissé ici comme demandé.

## 5. Questions de conception (5 points)

1. **Local ou BDD ?** Aucun changement : tout reste fichier statique servi par GitHub Pages, comme avant. Rien de ce ticket ne touche Supabase.
2. **Rapidité (poids, requêtes) ?** −91 fichiers, ~3 Mo de MP3/PNG/CSS/JS morts retirés du déployé (phonemes-test 1,3 Mo étant le plus gros morceau). Zéro requête réseau économisée en usage normal (c'étaient des fichiers jamais appelés, sauf les rips remplacés qui restent 1 requête, juste vers un fichier plus léger et déjà mutualisé — moins de doublons en cache navigateur).
3. **Réutilisable par un autre pôle ?** Les remplaçants choisis (`fx/`, `ui/`) sont déjà la banque mutualisée JEU ; aucun nouvel asset créé, donc réutilisabilité inchangée mais dette de duplication réduite (moins de fichiers à mainteni, mêmes sons déjà utilisés ailleurs dans les mêmes pools).
4. **i18n (langue dans la clé ou le chemin) ?** Le renommage `pt-BR` → `pt-br` aligne la casse du dossier sur la convention déjà en vigueur partout ailleurs (`lang.js` : `pt-br` en dossier/clé interne, `pt-BR` réservé au tag BCP-47 `lang=`/Speech API). Confirme la doctrine « la langue est un dossier, jamais un suffixe, et sa casse est fixe » — proposée formellement en § 4.
5. **Index ou manifeste nécessaire, et où ?** Aucun nouveau manifeste créé. `studio/referentiel/couverture.mjs` (hors périmètre) reste la seule liste qui connaît les noms exacts de fichiers orphelins assumés — elle est maintenant partiellement fausse (voir § Questions ci-dessous) et devra être mise à jour par son propriétaire.

## Questions pour l'orchestrateur

1. **`studio/referentiel/couverture.mjs` (hors mes fichiers autorisés) contient une liste `ORPHELINS_ASSUMES` codée en dur** qui cite littéralement 9 des rips que j'ai supprimés/remplacés (`ff7_victory.mp3`, `freesound_community-bus-doors...`, `freesound_community-bus-pop...`, `honk-sound.mp3`, `perdu.mp3`, `perfect-fart.mp3`, `pew.mp3`, `pikachu_mw38Ry2.mp3`, `pikachu_scream.mp3`, `ratp-jingle.mp3`, `sncf-france-jingle.mp3`, `victory-mario-series...mp3`, `zelda-tresor.mp3`). Le script tolère leur absence (pas d'erreur), mais `_COUVERTURE.md` généré affiche maintenant du bruit périmé. Je n'ai pas touché ce fichier (hors périmètre `catalogue/**`). À qui revient la mise à jour de cette liste ?
2. **`site/img/dinos/traces/` n'a PAS été supprimé** malgré le brief : `studio/dino/content/scripts/export/_audit-fiches-complet.cjs` lit réellement ce dossier (`rd('site/img/dinos/traces')`, alimente son rapport « top 15 »). Le grep de vérification du brief portait sur `site/*.html site/js` uniquement, donc n'a pas vu cette dépendance `studio/`. Faut-il ouvrir un ticket pour ce script (vider `traces/` proprement) ou considérer que la « no référence » du brief visait uniquement le runtime site (auquel cas c'est bien 0 partout où le brief regardait, et un futur HO peut vider `traces/` après avoir mis à jour ce script) ?
3. **`sounds/music/victoire-v1..v4.mp3`** : les 4 sont réellement utilisés simultanément dans le même pool `victory` (variété assumée, pas des versions concurrentes d'un même son). Le point 3 du brief demandait de « renommer sans suffixe de version » — impossible tel quel sans collision de noms puisque les 4 sont des sons distincts et coexistants, pas des itérations d'un seul fichier. Je les ai laissés inchangés (`victoire-v1..v4.mp3`) plutôt que d'inventer des noms au jugé. Voir proposition de noms descriptifs en § 4 (`victoire-chiptune.mp3` etc.) — à valider avant renommage, car ce sont des .mp3 encore jamais renommés depuis leur génération EL (HO-015).
4. **`generique-v1..v3.mp3`** : aucune référence trouvée nulle part dans le code (seulement docs `_BANQUE-SONS.md` et 2 handoffs TODO). Supprimés intégralement (aucun n'était « la version référencée » à garder). Si un futur générique doit être branché, il reste dans `_BANQUE-SONS.md`/l'historique git.
5. **`freesound_community-bus-doors-sound-effect-44034.mp3` et `perdu.mp3`** : zéro référence code trouvée nulle part (contrairement aux 11 autres rips qui avaient chacun un appelant identifié) — supprimés sans remplacement plutôt que remplacés, puisqu'il n'y avait rien à remplacer.

## Correction orchestrateur (2026-09-12)
`site/design-shared/fonts/Cursif.ttf` et `Cursifl.ttf` avaient été supprimés (hors liste : seul `mockup.{css,js}` était autorisé). `run-all.mjs` : 4 FAIL (mj-50..53, `ERR_FILE_NOT_FOUND`). Polices restaurées depuis HEAD, les 4 jeux repassent verts individuellement. Leçon L-009 transverse. Décisions sur les questions : `img/dinos/traces/` reste (lu par l'audit dino) ; `victoire-v1..v4` restent tels quels (4 sons distincts) ; `couverture.mjs` sera nettoyé par HO-R14.
