# Schéma du catalogue de contenu

> Contrat de format. Toute entrée du catalogue le respecte, et `valider.mjs` le fait respecter.
> Raisonnement et décisions : [`memory/ARCHI-REFERENTIEL-CONTENU.md`](../../../memory/ARCHI-REFERENTIEL-CONTENU.md).

## Pourquoi des fichiers `.mjs` et pas du JSON ou du YAML

Le catalogue est écrit et relu par des humains : il lui faut des commentaires et des chaînes
multi-lignes. JSON n'a ni l'un ni l'autre, YAML demanderait une dépendance. Le projet écrit déjà
ses données en JS (`dinos-data.js`, `catalog.js`) — on reste dans cette maison.

---

## Le champ qui commande tout : `type`

Il n'y a **pas** de schéma unique. Cinq types, cinq formes de contrat. `type` se lit en premier,
il détermine quels autres champs sont exigés et ce que « faire une langue » veut dire.

| `type` | A un texte ? | Canal EL | Traduction | Tiré au sort |
|---|---|---|---|---|
| `bruitage` | non — un **prompt EN** | non (moteur SFX) | aucune, invariant | non |
| `humeur` | pas de texte unique : une **intention** + des variantes | oui | **ré-invention** par culture | **oui** |
| `replique` | oui, canonique | oui | traduction | non |
| `atome` | oui, court | oui | traduction + gabarits | non |
| `gabarit` | non — un **patron à trous** | via ses rendus | patron **propre à la langue** | non |
| `bloc` | oui, long | oui, **réécrit** | réécriture | non |

---

## Champs communs

| Champ | Obligatoire | Rôle |
|---|---|---|
| `cle` | oui | Identifiant stable, en minuscules pointées. **Ne change jamais**, même si le texte change. |
| `type` | oui | L'un des types ci-dessus. |
| `i18n` | oui | `invariant` · `reinvention` · `traduction` · `reecriture` — ce que signifie « faire une autre langue ». |
| `consommee_par` | non | Où c'est joué (page, mini-jeu, module). Sert au sens inverse : savoir qui prévenir quand ça bouge. |
| `note` | non | Contexte utile au prochain lecteur. |

## Bloc `production` — la rejouabilité

Présent sur tout ce qui produit un fichier audio. **C'est le manque qui a motivé tout le chantier :
sans lui, on ne peut ni régénérer à l'identique, ni traduire, ni vérifier ce que l'enfant entend.**

| Champ | Rôle |
|---|---|
| `voix` | **Rôle**, jamais un identifiant : `narrateur_h` · `narrateur_f` · `wex`. Résolu via [`voice-map.json`](../../narration/personnages/voix-meta/voice-map.json). |
| `modele` | `eleven_v3` pour la voix (seul modèle qui lit les tags v3). |
| `reglages` | `stability` etc. Valeurs gravées, jamais inventées. |
| `traitement` | Post-production appliquée, dans l'ordre : `loudnorm`, `padding-250ms`. |
| `texte_envoye` | Le **verbatim**, tags compris, tel qu'il part à l'API. C'est LA donnée qu'on ne veut plus jamais perdre. |

## Champ `texte_verifie`

`true` seulement si le texte du catalogue est **prouvé identique** à ce que dit le MP3 sur le disque
— parce qu'on vient de le générer depuis ce texte, ou parce qu'on l'a écouté.

`false` pour tout audio hérité dont on **reconstruit** le texte à partir du slug ou d'un texte de
repli. Ces reconstructions sont plausibles, pas certaines : un texte de repli ne se déclenche que
si le MP3 échoue, il ne prouve **rien** sur ce que le MP3 dit (incident du 2026-08-10 : la 3ᵉ
étoile passait « Tu maîtrises ce jeu ! » en repli alors que le MP3 joué dit « Tu as gagné une
étoile ! »). Le validateur compte les `false` sans les traiter comme des erreurs : c'est une dette
d'enrôlement, elle se résorbe à chaque régénération.

---

## Forme par type

### `bruitage`
```js
{ cle: 'sfx.klaxon', type: 'bruitage', i18n: 'invariant',
  prompt_en: 'friendly short bus horn, warm, cartoon',   // la source, à la place du texte
  fichier: 'sounds/ui/klaxon.mp3' }
```

### `humeur` — réserve tirée au sort
Pas de texte canonique : demander « quel est le texte de `humeur.positif` ? » n'a pas de sens,
c'est un **ensemble**. On grave l'`intention` et l'inventaire des `variantes`.

```js
{ cle: 'humeur.positif', type: 'humeur', i18n: 'reinvention',
  intention: 'Féliciter chaleureusement un enfant de 4 ans qui vient de réussir',
  voix: ['narrateur_f', 'narrateur_h', 'wex'],   // chaque variante existe dans chaque voix
  variantes: [ { slug: 'bravo', texte: 'Bravo !', tags: ['excited'] }, … ],
  doublon_multilingue: true }
```

`i18n: 'reinvention'` : on ne traduit pas « waouh », on cherche ce qu'un adulte dirait
spontanément à un enfant de 4 ans dans cette culture-là.

### `replique` — phrase fixe réutilisée
```js
{ cle: 'jeu.consigne.quel-bus-arrive-en-premier', type: 'replique', i18n: 'traduction',
  texte: 'Quel bus arrive en premier ?', tags: [],
  production: { voix: 'narrateur_h', … }, texte_verifie: false,
  consommee_par: ['mj-13a'] }
```

### `atome` — brique réutilisée partout
```js
{ cle: 'atome.epoque.cretace', type: 'atome', i18n: 'traduction',
  texte: 'le Crétacé', famille: 'epoque' }
```
`famille` regroupe les atomes interchangeables dans un même trou de gabarit.

### `gabarit` — composition, **pré-générée**
```js
{ cle: 'gabarit.epoque-datee', type: 'gabarit', langue: 'fr',
  patron: '{duree}, c’est {epoque}',
  trous: { duree: 'atome.duree.*', epoque: 'atome.epoque.*' } }
```

**Le gabarit appartient à la LANGUE, pas au contenu.** L'ordre des mots et les accords de pluriel
varient : un patron valide en français devient agrammatical ailleurs (en russe, `1 год / 2 года /
5 лет` — le mot qui suit dépend du nombre). Chaque langue déclare donc ses propres patrons.

**Jamais de concaténation à l'exécution** (décision Papa Yann 2026-07-28) : on rend le patron ×
toutes les combinaisons de trous, et on génère des **phrases entières**. L'assemblage bout à bout
s'entend — pauses mécaniques, intonation qui ne s'enchaîne pas.

**Règle de viabilité, vérifiée par le validateur** : un gabarit n'est admis que si le produit de
ses domaines de trous reste sous `PLAFOND_RENDUS`. Au-delà, la pré-génération est absurde et il
faut soit une tournure neutre qui évite l'accord, soit le repli TTS assumé.

### `bloc` — long, réécrit éditorialement
Les blocs de fiche dino et les récits. Ils vivent déjà dans `studio/dino/content/scripts-audio/`
et sont **catalogués par référence** (le registre pointe, il ne les recopie pas).

---

## Langues

La langue est une **dimension**, pas une colonne. Cible : une vingtaine.

- **Ajouter une langue = ajouter un dossier** sous `catalogue/<langue>/`. On ne touche ni au
  schéma, ni aux autres langues, ni aux clés existantes.
- Une langue absente n'est pas une erreur : c'est une **couverture partielle**, lisible au
  tableau de bord.
- `catalogue/_bruitages.mjs` est **hors langue** : un klaxon reste un klaxon.

---

_Créé 2026-08-10 (Lot 1). Aucun appel ElevenLabs n'est fait depuis le catalogue : `plan-generation.mjs` produit le plan exact des appels, qui n'est exécuté qu'après validation._
