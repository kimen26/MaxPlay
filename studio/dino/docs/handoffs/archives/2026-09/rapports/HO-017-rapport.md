# HO-017 — Rapport : i18n EN, textes restants du site dino

**Statut :** fait (2026-09-05)

## Chaînes traduites par zone

| Zone | Nb | Détail |
|---|---|---|
| Racines du dico | 101 | 85 racines + 16 noms propres (`site/js/dinos-racines.js`), clé `sens` uniquement (formes grec/latin gardées) |
| Périodes (`DINO_PERIODES`) | 5 | `label`, `desc`, `range` (Permian → Cenozoic) |
| Régimes (`DINO_CATEGORIES`) | 4 | `label` (Meat-Eaters, Plant-Eaters, Fish-Eaters, Eats Everything) |
| Pangée | 1 objet + 4 étapes | `titre`, `soustitre`, `intro`, `credit`, `fun_fact`, `pourquoi` + `etapes.{trias,jurassique,cretace,present}.{label,ma,titre,texte}` |
| Extinction | 1 objet + 5 hypothèses | `titre`, `soustitre`, `fun_fact` + `hypotheses.{meteorite,volcan,cendres,froid,survivants}.{titre,texte,label_certitude}` |
| Voyage (JOURNEY) | 8 épisodes × 2 | `journey_ep_<id>_label` / `_date`, ajoutées en FR (canon `dino-ui.js`), EN, es-es, pt-br |
| `DINO_FAMILLES_INTRO` | — | déjà couvert par la clé `ui.json` existante `menu_famille_intro` (vérifié affiché) |

Unités converties (charte impérial EN, arrondi) : météorite 10 km → **6 miles**, hiver nucléaire 10-20 °C → **18-36 degrees Fahrenheit** (delta ×1.8, pas +32).

## Fichiers modifiés (chemins exacts)

- `studio/dino/content/i18n/en/strings.json` — ajout clés `racines` (101), `periodes` (5), `categories` (4), `pangee`, `extinction`
- `studio/dino/content/i18n/{en,es-es,pt-br}/ui.json` — 16 clés `journey_ep_*` × 3 langues
- `site/js/dino-ui.js` — ajout des 16 clés `journey_ep_*` FR dans `DinoUI._fr` (canon requis par `_check-ui.cjs`, sinon les 3 langues remontaient "clé INCONNUE" ; `T()` fonctionnait déjà sans, mais la porte l'exigeait)
- `site/js/dinos-i18n.js` — fusion profonde `pangee`/`extinction` (nouveau) + **correction d'un bug préexistant** : `merge(DINO_RACINES, S.racines)` fusionnait sur l'objet racine `{racines:[...], dinos:{...}}` au lieu du tableau `DINO_RACINES.racines`, donc ne matchait jamais aucune clé et laissait le dico 100 % FR même avec `strings.json.racines` rempli. Corrigé (`merge(_racinesRoot.racines, S.racines)`).
- `site/dev-dinos.html` — bloc `const JOURNEY = [...]` : `label`/`date` en dur → accesseurs `get label(){ return T('journey_ep_<id>_label'); }` / idem `date` (rien d'autre touché)
- `studio/dino/content/scripts/export/_extract-corpus-i18n.cjs` — lit désormais aussi `site/js/dinos-racines.js`, extrait `racines`, `pangee`, `extinction` dans `corpus-fr.json` ; `CHAMPS_PERIODE` complété avec `range`
- `studio/dino/content/scripts/export/_check-traduction.cjs` — étendu pour vérifier `racines`, `periodes`, `categories`, `pangee` (+ `etapes`), `extinction` (+ `hypotheses`), sans affaiblir les contrôles existants (dinos/familles inchangés)
- `studio/dino/content/scripts/export/_gen-strings-bundle.cjs` — payload complété avec `pangee`/`extinction` (absents avant, le bundle produit ne les portait jamais vers le site)
- `studio/dino/content/i18n/_corpus/corpus-fr.json`, `site/js/i18n/dinos-strings.en.js`, `site/js/i18n/dino-ui-strings.{en,es-es,pt-br}.js` — régénérés par les scripts (jamais à la main)

## Sorties des portes

```
node studio/dino/content/scripts/export/_check-traduction.cjs en
dinos 71/71 · familles 11/11
0 erreurs, 6 avertissements (4 préexistants documentés NOTES.md : therizinosaurus/smilodon
conversions unité ; 2 nouveaux légitimes : meteorite/froid — le checker signale un diff de
chiffres partiel attendu sur une conversion km→mi et une delta °C→°F, pas une erreur de fond)

node studio/dino/content/scripts/export/_check-ui.cjs en   → 92/92 clés, 0 erreur, 1 warn (page_titre = marque, non traduit, attendu)
node studio/dino/content/scripts/export/_check-ui.cjs es-es → 92/92 clés, 0 erreur, 1 warn (idem)
node studio/dino/content/scripts/export/_check-ui.cjs pt-br → 92/92 clés, 0 erreur, 1 warn (idem)

node studio/dino/content/scripts/export/_gen-strings-bundle.cjs en
→ 71 dinos, 11 familles, 5 periodes, 4 regimes, 101 racines, pangee=oui, extinction=oui

node studio/dino/content/scripts/export/_gen-ui-bundle.cjs en ; es-es ; pt-br → 92 clés chacun
```

## Contrôle visuel Playwright

Serveur `python -m http.server 8765` dans `site/`, script Playwright depuis `studio/minijeux/tests/`
(paquet local). Ouverture `dev-dinos.html?lang=en`, 5 onglets parcourus (Familles, Ce qu'il mange,
Voyage, Époques, Dico) + clic sur une racine + rendu direct de `buildPangeeBloc()`/`buildExtinctionBloc()`
(fonctions non branchées à un bouton de nav dans l'état actuel du fichier — hors périmètre HO-017,
signalé ci-dessous). Captures ouvertes (Read) et relues mot à mot :

- `docs/handoffs/rapports/captures/HO-017-voyage.png` — onglet Voyage, 100 % anglais
- `docs/handoffs/rapports/captures/HO-017-dico.png` — onglet Dico, 6 racines visibles, 100 % anglais (bug racines détecté et corrigé pendant cette vérification, voir ci-dessus)
- `docs/handoffs/rapports/captures/HO-017-pangee-extinction.png` + `HO-017-extinction.png` — Pangée et Extinction rendues à part, 100 % anglais, unités converties visibles ("6 miles wide", "18 to 36 degrees Fahrenheit")

Aucun mot français résiduel trouvé sur les 3 captures.

## Zones FR résiduelles non branchées

Aucune dans le périmètre du brief. Deux points signalés, non corrigés (hors mandat) :

1. **`buildPangeeBloc()` / `buildExtinctionBloc()` ne sont appelées par aucun bouton/nav** dans l'état
   actuel de `dev-dinos.html` (vérifié par grep — pas de `showScreen('pangee'...)` ni équivalent). La
   traduction est prête et fonctionnelle (vérifiée par rendu direct en JS), mais un enfant ne peut pas
   encore atteindre ces écrans par le parcours normal. Câblage navigation = hors périmètre HO-017 (le
   brief demande la traduction du mécanisme, pas la pose du bouton d'accès).
2. **es-es / pt-br** n'ont pas reçu la traduction des racines/périodes/régimes/pangée/extinction
   (explicitement hors périmètre du brief — seules les 16 clés `journey_ep_*` UI ont été traduites
   dans ces 2 langues). `strings.json` de ces langues reste vide sur ces clés, ticket futur.
