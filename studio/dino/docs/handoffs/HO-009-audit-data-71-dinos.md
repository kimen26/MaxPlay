# HO-009 — Audit data des 71 Fiches dino (mesures, lieux, Texte fiche)

**Statut :** pret
**Depend de :** —
**Exécutants :** 4 sous-agents Sonnet (1 par lot), en parallèle. Ownership = le RAPPORT du lot, rien d'autre.

## Objectif

Pour chaque dino du lot, dire si les valeurs de `site/js/dinos-data.js` sont VRAIES, et sinon proposer
la valeur juste avec sa source. Trois choses sont auditées :
1. **Mesures** : `taille_m` (longueur nez → bout de la queue ; pour un volant = envergure, champ `taille_vol`),
   `hauteur_m` (bipède = hauteur à la HANCHE ; quadrupède = à l'ÉPAULE ; sauropode cou dressé = tête ; 0 ou absent pour marin/volant),
   `poids_t` (tonnes ; adulte moyen, pas le record).
2. **Lieu(x) de vie** : `region` (texte FR lu par l'enfant, ex. « Amérique du Nord (Canada, États-Unis) ») et
   `continent` (alimente la carte — valeurs autorisées UNIQUEMENT : `Amérique du Nord`, `Amérique du Sud`, `Europe`,
   `Afrique`, `Asie`, `Océanie`, `Antarctique`, `Eurasie`, `Amériques`, ou composite `X / Y` ; marin = chaîne vide).
   Vérifier que TOUS les lieux de découverte majeurs sont cités, pas seulement le premier.
3. **Texte fiche** (`epoque`, `nom_etym`, `regime`, `superpower`, `chasseurs`, `proies`, `amis`, `fait`, `desc`) :
   chaque affirmation est-elle vraie et datée ? cohabitations réelles (mêmes formation/époque) ? aucune référence
   d'adulte (film, marque, chanteur) ? Tu proposes une réécriture SEULEMENT si quelque chose est faux, flou, ou
   édulcoré. Ce qui est juste et vivant reste tel quel.

## Sources (dans cet ordre)

1. **Grokipedia** (`https://grokipedia.com/page/<Nom_latin>`) — 1ʳᵉ source du pôle. Si WebFetch renvoie 403 : `curl -sL -A "Mozilla/5.0"` ou Playwright (mémoire `reference_webfetch_403_playwright`).
2. Wikipedia EN (infobox + section Description), puis FR.
3. Paul, *The Princeton Field Guide to Dinosaurs* (2ᵉ éd. 2016) quand cité par les deux premières.
Toujours noter la fourchette trouvée (ex. « 12–13 m ») : la valeur retenue est le milieu honnête de la fourchette adulte,
pas le record. Un écart < 10 % avec la data = **CONFORME** (on ne change pas pour changer). Un écart ≥ 10 % = **À CORRIGER**.

## Lots (1 agent chacun)

| Lot | Dinos |
|---|---|
| A — Théropodes (PRIORITÉ, gate l'audio) | tyrannosaurus spinosaurus giganotosaurus carcharodontosaurus allosaurus tarbosaurus albertosaurus ceratosaurus dilophosaurus carnotaurus cryolophosaurus baryonyx therizinosaurus |
| B — Raptors, volants, avant-dinos, oiseaux | velociraptor deinonychus utahraptor microraptor troodon gallimimus oviraptor archaeopteryx pteranodon quetzalcoatlus hatzegopteryx dimetrodon edaphosaurus gorgonops lystrosaurus moschops titanis |
| C — Sauropodes, thyréophores, cératopsiens | brachiosaurus diplodocus apatosaurus camarasaurus amargasaurus plateosaurus patagotitan ankylosaurus euoplocephalus edmontonia minmi scutellosaurus scelidosaurus stegosaurus kentrosaurus triceratops torosaurus protoceratops pentaceratops centrosaurus pachycephalosaurus |
| D — Ornithopodes, marins, mégafaune | parasaurolophus corythosaurus maiasaura saurolophus edmontosaurus iguanodon mosasaurus elasmosaurus ophthalmosaurus liopleurodon archelon shonisaurus ichthyosaurus mammuthus smilodon megatherium paraceratherium glyptodon aenocyon coelodonta |

## Fichiers autorisés (par lot X)

- `studio/dino/docs/handoffs/rapports/HO-009-lot-X.md` (rapport lisible)
- `studio/dino/docs/handoffs/rapports/HO-009-lot-X.json` (corrections machine)

## Hors périmètre (GELÉ — un exécutant qui y touche fait échouer le brief)

- `site/js/dinos-data.js` — l'orchestrateur applique (HO-010). Tu PROPOSES, tu n'édites pas.
- Tout fichier de `studio/dino/content/`, `memory/`, `figees/`, les scripts audio, l'i18n.

## Format du JSON

```json
{ "lot": "A", "date": "2026-09-05", "dinos": [
  { "id": "tyrannosaurus", "verdict": "CONFORME|CORRIGER",
    "mesures": [ { "champ": "taille_m", "actuel": 13, "fourchette": "12-12.5", "propose": 12.3, "ecart_pct": 5.7, "action": "garder|corriger", "source": "Grokipedia Tyrannosaurus §Description ; Wikipedia EN infobox" } ],
    "lieu": { "region_actuel": "Amérique du Nord", "region_propose": null, "continent_actuel": "Amérique du Nord", "continent_propose": null, "source": "..." },
    "textes": [ { "champ": "fait", "probleme": "...", "propose": "texte FR réécrit, 4 ans, même longueur", "source": "..." } ],
    "notes": "cohabitations vérifiées : Triceratops ✓ (Hell Creek), ..." } ] }
```
`propose: null` quand rien ne change. Chaque ligne cite sa source. Aucune valeur sans source.

## Portes de vérification

```bash
node -e "const j=require('./studio/dino/docs/handoffs/rapports/HO-009-lot-X.json'); console.log(j.dinos.length, 'dinos', j.dinos.filter(d=>d.verdict==='CORRIGER').length, 'a corriger')"
```
Le count doit être celui du lot. Chaque `propose` non nul a une `source` non vide.

## Rapport attendu (le .md)

- Tableau par dino : champ · actuel · trouvé (fourchette + source) · proposé · verdict.
- Les 5 corrections les plus importantes en tête, avec la raison en une phrase.
- Les points où les sources se contredisent (on choisit Grokipedia et on le dit).
- Ce que tu n'as PAS pu vérifier (source inaccessible) — dit clairement, jamais deviné.
