# I18N ES/PT — zones restantes (racines, periodes.range, categories, pangee, extinction)

Date : 2026-09-05. Suite de HO-017 (qui avait traité `_meta`, `familles`, `dinos`, `eres`, et
laissé `periodes`/`categories` sans `range`/incomplets, et `racines`/`pangee`/`extinction`
totalement absents en es-ES et pt-BR).

## Zones traduites

| Zone | es-ES | pt-BR | Détail |
|---|---|---|---|
| `racines` (nouvelle clé top-level) | 101 entrées | 101 entrées | clé grecque/latine inchangée, seul `sens` traduit nativement |
| `periodes` | déjà complet (label+desc), `range` ajouté aux 5 | idem | vocabulaire Trias/Triásico/Triássico etc. aligné sur `dinos[].epoque` |
| `categories` | déjà complet (label) — non retouché | idem | rien à ajouter, déjà fait par HO-017 |
| `pangee` (nouvelle clé top-level) | 1 objet complet (titre, soustitre, intro, credit inchangé, fun_fact, pourquoi, 4 étapes) | idem | `credit` recopié tel quel (mention factuelle CC BY 4.0, non traduite) |
| `extinction` (nouvelle clé top-level) | 1 objet complet (titre, soustitre, fun_fact, 5 hypothèses) | idem | unités restées métriques ("10 km", "10 à 20 degrés" / "10 a 20 graus") — pas de conversion impériale (règle réservée à l'anglais) |
| `eres` | **non touché** (déjà rempli, hors périmètre) | non touché | — |

Total chaînes ajoutées par langue : 101 (racines.sens) + 5 (periodes.range) + 1 (pangee, ~14 sous-champs) + 1 (extinction, ~16 sous-champs) = 124 valeurs, ce qui correspond exactement aux 124 erreurs initiales du check.

## Sorties des portes `_check-traduction.cjs`

```
--- check es-es ---
dinos 71/71 · familles 11/11
0 erreurs, 0 avertissements
```

```
--- check pt-br ---
dinos 71/71 · familles 11/11
  WARN dinos/triceratops.fait : chiffres FR [] vs [1]
  WARN dinos/coelodonta.epoque : chiffres FR [50,000] vs [50]
0 erreurs, 2 avertissements
```

Les 2 avertissements pt-br sont préexistants (zone `dinos`, déjà traduite avant cette mission,
hors périmètre de cette tâche — non touchés, non corrigés ici).

## Sorties `_gen-strings-bundle.cjs`

```
C:\ProjetsPerso\Claude_Projects\MaxPlay\site\js\i18n\dinos-strings.es-es.js : 71 dinos, 11 familles, 5 periodes, 4 regimes, 101 racines, pangee=oui, extinction=oui
C:\ProjetsPerso\Claude_Projects\MaxPlay\site\js\i18n\dinos-strings.pt-br.js : 71 dinos, 11 familles, 5 periodes, 4 regimes, 101 racines, pangee=oui, extinction=oui
```

## Contrôle visuel Playwright

Mécanisme confirmé en lisant `site/js/dinos-i18n.js` : le bundle `DINO_STRINGS.racines` est
fusionné dans `DINO_RACINES.racines` par clé (`cle`), et `pangee`/`extinction` par fusion
profonde (`etapes`/`hypotheses` indexées par `periode`/`id`). Donc l'UI lit bien nos
traductions, pas de câblage supplémentaire nécessaire.

`buildPangeeBloc()` n'est pas câblée à un bouton de nav (limite déjà signalée par HO-017) —
capturée par appel direct de la fonction en JS via Playwright, sans toucher `dev-dinos.html`.

Captures produites dans `studio/dino/docs/handoffs/rapports/captures/` :
- `I18N-ES-PT-es-dico.png` — onglet Dico es-ES (racines -saure/-odon/-lophe/-ops/-raptor/cérat- visibles, sens traduits : lagarto, diente, cresta, cara/rostro, ladrón/el que roba, cuerno)
- `I18N-ES-PT-es-epoques.png` — bloc Pangée es-ES injecté (titre "La Pangea", étape "Triásico · hace 250 millones de años · Todo está pegado")
- `I18N-ES-PT-pt-dico.png` — onglet Dico pt-BR (sens traduits : lagarto, dente, crista, rosto/cara, ladrão/aquele que rouba, chifre)
- `I18N-ES-PT-pt-epoques.png` — bloc Pangée pt-BR injecté (titre "A Pangeia", étape "Triássico · há 250 milhões de anos · Está tudo grudado")

## Confirmation zéro mot français

Les 4 captures ont été relues mot à mot : aucun résidu français visible (nav, intro, cartes
racines, bloc Pangée/étapes). Registre respecté : tutoiement implicite (pas de vouvoiement),
unités métriques conservées, vocabulaire des époques identique à celui déjà validé dans
`dinos[].epoque` (Triásico/Triássico, etc.).

## Fichiers modifiés

- `studio/dino/content/i18n/es-es/strings.json`
- `studio/dino/content/i18n/pt-br/strings.json`
- `site/js/i18n/dinos-strings.es-es.js` (régénéré)
- `site/js/i18n/dinos-strings.pt-br.js` (régénéré)
- Ce rapport + 4 captures PNG

Aucun autre fichier touché. Aucune commande git exécutée. Serveur HTTP local (port 8765) et
script Playwright temporaire supprimés en fin de mission.
