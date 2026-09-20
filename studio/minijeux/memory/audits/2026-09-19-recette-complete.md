# Recette complète FR + EN — mini-jeux, fiches dino, pages transverses (2026-09-19/20)

Rapport seul, aucune correction appliquée. Environnement : Chromium Playwright, `file://`, viewport
360×740 (P30 Pro) + contrôle 320×568, langue par `?lang=fr|en`. Pas de test sur téléphone physique,
pas d'écoute réelle des MP3 (présence/taille seulement), pas de police système agrandie.

Méthode : 1 script générique (36 jeux × 2 langues : erreurs JS, 404, clés i18n réellement demandées
vs pack EN, assets sur disque, chaînage `next` vs catalogue) + 6 lots de 6 jeux joués jusqu'à la
victoire deux fois en FR et en EN avec captures ouvertes et jugées + 1 agent fiches dino + 1 agent
pages transverses/récompenses. Baseline `npm test` avant recette : 32 PASS / 4 FAIL.

## Verdict en une ligne

**Le FR est solide** (0 crash au chargement, 0 asset manquant, 36/36 chaînages « jeu suivant »
justes, récompenses/nid/œufs cohérents). **L'anglais n'est pas livrable** : l'écran de victoire, le
menu et toutes les pages annexes restent en français, 7 jeux gardent leur titre FR, 0 consigne audio EN.
**Deux jeux plantent à la 8ᵉ manche** (mj-13a, mj-13c), **les 3 jeux dino ne traduisent jamais leur contenu** (ordre de scripts), et mj-40 est à confirmer à la main.

## CRITIQUE (bloque un enfant)

| # | Où | Quoi | Cause racine |
|---|---|---|---|
| C1 | mj-13a, mj-13c | Après 8 manches réussies : `TypeError: Cannot set properties of null` — pas d'écran de fin, pas d'étoile, pas d'œuf, pas de « suite ». FR et EN. | Les deux pages n'ont pas de `<div id="app">` du gabarit ; `mj-golden.js:325` et `:446` font `getElementById('app').innerHTML` sans garde. Scan : ce sont les 2 seuls `golden:true` sans `#app`. Les specs s'arrêtent après la 1ʳᵉ manche, d'où le vert trompeur. |
| C2 | mj-40 Tangram | La recette transverse a vu la figure 2 ne jamais charger après la figure 1 (seul FAIL de son `run-all`, 35/36). Le lot 1 n'a PAS reproduit via le hook `__mjTest` (3★ atteintes). | **Contradictoire** : à confirmer à la main avec un vrai drag tactile avant de trancher (le hook court-circuite peut-être le pointer). |
| C3 | mj-22 Trouve le pays | `fetch()` vers Wikimedia sans repli (`site/mj-22.html:267`) : hors ligne, le drapeau de victoire n'est jamais créé (c'est le FAIL baseline « fontSize vide »). Viole la règle PWA hors ligne. | dépendance réseau externe |
| C4 | Tous jeux `golden` (34) en EN | Écran de victoire 100 % français : titre, sous-titre, « Encore », « La suite », compliments. Seul le bouton nid est traduit. | `site/js/mj-golden.js:316-321, 377-389, 437, 442` chaînes en dur, jamais via `MJi18n`. Idem « Un œuf pour le nid ! » (`celebrations.js:1311`, `mj-golden.js:479`). |
| C5 | `index.html` + compte, suivi, confidentialité, offline, auteur, avatar-atelier en EN | Rien n'est traduit (« Bus », « Lettres », « Chiffres », « Champion », « L'Armoire »…). | `armoire.js` / `mur.js` n'appellent jamais `Lang` ni un pack de chaînes. |
| C7 | mj-24, mj-28, mj-31 (jeux dino) en EN | Contenu dino jamais traduit : funfact (mj-28), noms de dinos et bandes d'époque (mj-31) restent FR alors que `dinos-strings.en.js` a tout. | Ordre de scripts : `js/gen/dinos-data.js` + `js/dinos-i18n.js` sont chargés **avant** `mj-shell.js`, qui n'injecte `js/lang.js` que plus tard ; `dinos-i18n.js:8` lit `window.Lang` → `undefined` → `'fr'`, la fusion EN avorte en silence. Vérifié dans les 3 HTML. |
| C6 | mj-20 Compte en 8 langues, EN | Modes, boutons, badges palier codés en français : mélange FR/EN à l'écran. Comptage 100 % TTS navigateur sans fichier audio ni filet (7 langues sur 8 non vérifiables). | chaînes en dur |

## HAUTE

| # | Où | Quoi |
|---|---|---|
| H1 | mj-20, mj-22, mj-42, mj-50, mj-51, mj-52, mj-53 | Titre (onglet + header) reste FR en EN : `titre:` passé en dur à `MJ.init` au lieu de `MJi18n.titre(...)`. La traduction existe dans `mj-strings.en.js` (code mort). Nuance : le contenu de mj-50/51/52/53 reste FR par décision PY 2026-09-05 (phonétique), mais le titre, lui, a sa traduction. mj-50 : sous-consigne « Touche pour réécouter » ; mj-53 `site/mj-53.html:194` chaîne sans `T()`. |
| H2 | 12 jeux (mj-14/28/30/46/47/48/49/54/55/56/57/59) | `_commun.voix` du pack EN inutilisable : `mj-shell.slugConsigne()` slugifie le texte affiché (`how-many-eggs`) alors que la table EN est clée par les slugs FR (`combien-d-oeufs`). ~40 phrases traduites jamais servies (repli TTS silencieux). |
| H3 | mj-42 | Overlay de victoire en FR dans le HTML livré (`site/mj-42.html:147-149`), `T()` appliqué seulement au moment de gagner. |
| H4 | mj-32 EN | Les 8 noms de familles de dinos de l'écran de choix restent en français ; clés `ui:mj-32:zoomer` / `vueNormale` absentes du pack EN. |
| H5 | `suivi.html` | Débordement horizontal : `scrollWidth` 455 px pour 360 px (pire à 320) — barre Menu/Suivi/Compte/Export/Import/Reset. |
| H6 | mj-38 à 320 px | Plateau partiellement hors cadre : plancher `Math.max(70, …)` dans `cellSize()`. |
| H7 | Audio EN | `site/sounds/voix/en/phrases/` vide : 0 consigne MP3 anglaise (88 en FR). Tout l'EN parle en TTS navigateur. Dette à chiffrer. |
| H9 | mj-31 | Titre header tronqué à 360 ET 320 px, FR et EN (`htitreLong` trop long pour `.htitle` sans retour à la ligne). En EN : 13 × 404 sur `audio/dinos/en/periodes/*.mp3` — le dossier n'existe qu'en FR (5 MP3), repli TTS mais la figée « période toujours en vraie voix » n'est pas tenue en anglais. |
| H8 | Fiche dino `oviraptor.chasseurs` EN | Valeur identique au FR (« Velociraptor, carnivores ») — seule vraie phrase non traduite sur 71 fiches. |

## MOYENNE

- mj-48, mj-49 : titre header tronqué à 320 px (« Tout le monde mon… », « Les barquettes de 1… ») — règle « jamais de texte tronqué ».
- mj-55 : MP3 consigne FR manquant (`complete-la-grille-jamais-3-pareils.mp3`), repli TTS.
- mj-18 : `Stars.get('mj-18')` = 0 juste après une 2ᵉ victoire consécutive (possible artefact du hook de test, à confirmer à la main).
- mj-39 : progression non sauvée avant grille pleine.
- mj-09 en portrait : jeu `landscape` au catalogue, layout vertical peu optimal mais utilisable.
- `lecture.html` reste FR en EN (outil parent ?).
- Tests : mj-37, mj-38, mj-48 = FAIL baseline non reproductibles isolément (charge machine : Playwright empilés). mj-38 avait un vrai timeout corrigé le jour même par `803fac85`. `mur-nid.spec.mjs` 2ᵉ scénario clique `#hdr-padidi` sans ouvrir le vantail (gap de spec, pas de bug).
- `npm run check` : 4 écarts data ↔ texte narré (edmontonia hauteur/poids, hatzegopteryx et titanis vitesse absents du récit) ; 4 consignes sans voix ; 157 voix texte non tracées.

## BASSE / info

- 306 images `img/dinos/` > 300 Ko (paleoart 116, grok 107, sprites 65) : perf mobile à surveiller.
- `continent: ''` sur les 7 reptiles marins : voulu, repli UI.
- `collection-dinos.js` chargé par `mj-shell`/`nid-ui` seulement, pas testable seul.

## Ce qui est propre

- **Chargement** : 72 passages jeu×langue, 0 erreur JS, 0 `console.error`, 0 404 bloquant, 0 asset manquant, bouton retour partout, 36/36 `next` conformes au catalogue.
- **Récompenses (HO-MJ-21)** : sur mj-49 (calcul), mj-50 (lecture), mj-15 (logique) : étoile, œuf, éclosion au nid, mur, 2ᵉ victoire cumulée sans doublon, échec de sauvegarde sans théâtre de gain — tout PASS. Confirmé jeu par jeu sur les lots 2-6 (cumul juste, pas de régression d'état).
- **Fiches dino** : 71/71 (INVARIANTS), 11 familles, 71/71 EN, 497 paleoart + 50 wiki + 118 grok présents, 710/710 segments audio FR+EN présents et non corrompus, `i18n-dinos.spec` PASS, 16 fiches ouvertes en 360 px : traduites, images chargées, navigation OK. Noms latin/grec + sens conservés en EN.
- **Figées** : lots 2-6 conformes aux figées relues (mj-21 bus en bas / pas de popup / primaire = victoire instant ; mj-46/47/49 barèmes ; mj-13c 8 manches ; etc.).
- **PWA** : manifest et précache SW sans entrée manquante.

## Tableau par jeu (FR / EN)

Colonnes : charge · titre EN · joué jusqu'au bout · points/étoiles · œuf/sauvegarde · suivant · visuel 360/320.

| Jeu | FR | EN | Notes |
|---|---|---|---|
| mj-24 | ✅ | ⚠️ | `golden:false`, étoiles propres ; contenu dino FR en EN (C7) |
| mj-57 | ✅ | ⚠️ | le 1ᵉʳ automate a pendu ici (attente sans timeout, pas un bug du jeu) ; C4 |
| mj-28 | ✅ | ❌ | funfact jamais traduit (C7) |
| mj-30 | ✅ | ⚠️ | C4, H2 |
| mj-31 | ⚠️ | ❌ | titre tronqué 360/320 (H9), noms/époques FR (C7), 404 audio époques EN |
| mj-40 | ✅ | ⚠️ | C2 contradictoire (transverse ❌ / lot 1 ✅ via hook) |
| mj-32 | ✅ | ⚠️ | galerie `mj32_galerie` OK ; familles dino FR en EN (H4) |
| mj-09 | ✅ | ⚠️ | victoire FR (C4) |
| mj-21 | ✅ | ⚠️ | figées respectées ; C4 |
| mj-18 | ✅ | ⚠️ | Stars=0 après 2ᵉ victoire à confirmer |
| mj-13c | ❌ | ❌ | C1 crash 8ᵉ manche |
| mj-35 | ✅ | ⚠️ | C4 |
| mj-46 | ✅ | ⚠️ | conforme figée ; C4, H2 |
| mj-47 | ✅ | ⚠️ | conforme ; C4, H2 |
| mj-49 | ✅ | ⚠️ | titre tronqué 320 ; C4, H2 |
| mj-48 | ✅ | ⚠️ | FAIL baseline = flake ; titre tronqué 320 |
| mj-53 | ✅ | ❌ | titre FR (H1), chaîne en dur l.194 |
| mj-52 | ✅ | ❌ | titre FR (H1) |
| mj-51 | ✅ | ❌ | titre FR (H1) ; landscape 740×360 OK |
| mj-50 | ✅ | ❌ | titre + sous-consigne FR (H1) |
| mj-06 | ✅ | ✅ | i18n complet (hors C4) |
| mj-54 | ✅ | ⚠️ | C4, H2 |
| mj-55 | ✅ | ⚠️ | MP3 FR manquant ; C4, H2 |
| mj-56 | ✅ | ⚠️ | C4, H2 |
| mj-59 | ✅ | ⚠️ | C4, H2 |
| mj-13a | ❌ | ❌ | C1 crash 8ᵉ manche |
| mj-14 | ✅ | ⚠️ | C4, H2 |
| mj-15 | ✅ | ⚠️ | C4 |
| mj-34 | ✅ | ⚠️ | C4 |
| mj-37 | ✅ | ⚠️ | FAIL baseline = charge machine ; C4 |
| mj-38 | ✅ | ⚠️ | déborde à 320 (H6) |
| mj-39 | ✅ | ⚠️ | 3 paliers atteints ; progression non sauvée avant grille pleine |
| mj-19 | ✅ | ✅ | rien à signaler (hors C4) |
| mj-22 | ⚠️ | ❌ | C3 fetch externe ; titre FR (H1) |
| mj-20 | ✅ | ❌ | C6 |
| mj-42 | ✅ | ❌ | titre FR (H1), overlay FR (H3) |

## Ordre de correction proposé

1. C1 : ajouter `<div id="app">` à mj-13a/13c **et** une garde dans `mj-golden.js` ; étendre les specs jusqu'à la 8ᵉ manche (le harnais aurait dû voir ça).
2. C7 (ordre `lang.js` dans mj-24/28/31 — ou faire injecter `lang.js` par `mj-shell` avant `dinos-i18n`). C2 mj-40 à confirmer à la main. 3. C3 mj-22 : drapeaux en local ou repli.
4. Chantier « EN livrable » : C4 (golden + celebrations), H1 (7 titres), H2 (slug FR vs EN dans `slugConsigne`), C5 (menu + pages), C6 (mj-20), H3, H4 — puis H7 (consignes MP3 EN, coût ElevenLabs à chiffrer).
5. Mobile : H5 suivi.html, H6 mj-38, titres tronqués mj-48/49.

Captures et rapports bruts par lot : scratchpad de session (non versionnés) ; 42 captures lot 1, 43 + 42 + 42 + 42 + 42 lots 2-6, 25 transverses, 20 dinos, 72 génériques.
