# HO-020 — Flore du Mésozoïque : fact-check + rédaction des fiches plantes

**Statut :** en cours
**Depend de :** —
**Décision PY (2026-09-06) :** la flore entre dans l'encyclopédie, présentée sous chaque époque de l'onglet « Les époques » (pas de 6ᵉ onglet, ligne figée respectée). Trias · Jurassique · Crétacé uniquement (temps des dinos).

## Objectif
Un fichier source unique `content/sources/flore/_FLORE-FICHES.md` avec ~19 fiches plantes fact-checkées (Grokipedia 1ʳᵉ source, Wikipedia en repli), prêtes à être portées en data (HO-021).

## Les 6 axes de chaque fiche (demande PY, verbatim de la commande)
1. **Environnement** — où elle pousse (décor simple, 1-2 phrases) — sert aussi de brief image.
2. **Qui la mangeait** — quels dinos de l'encyclopédie (ids EXISTANTS de `site/js/dinos-data.js`, jamais inventer un dino absent), avec le « comment » (hauteur de broutage, dents).
3. **Taille par rapport à un enfant de 4 ans (1 m)** — hauteur réelle chiffrée + comparaison honnête (règle ≤10 % d'écart, référentiel figé `memory/INVARIANTS.md` : enfant 1 m · Papa 1,8 m · porte 2 m · étage 3 m · lampadaire 6 m · bus 12 m · accordéon 18 m).
4. **Format de la feuille / fleur** — forme concrète (éventail, aiguille, fronde, écaille…), toucher, couleur plausible.
5. **Graines / reproduction** — cône, spore, graine nue, fruit, fleur pollinisée par qui.
6. **Le truc fou** — 1 fait marquant + « existe encore aujourd'hui ? » (fossile vivant ou disparue).

## Liste imposée (ids + périodes ; une plante peut couvrir plusieurs périodes)
| id | nom FR | latin | periodes |
|---|---|---|---|
| dicroidium | Dicroïdium (fougère à graines) | Dicroidium | trias |
| prele_geante | Prêle géante | Equisetites | trias, jurassique |
| pleuromeia | Pleuroméia | Pleuromeia | trias |
| voltzia | Voltzia (conifère primitif) | Voltzia | trias |
| ginkgo | Ginkgo | Ginkgo | trias, jurassique, cretace |
| cycas | Cycas | Cycadales | trias, jurassique, cretace |
| araucaria | Araucaria | Araucaria | jurassique, cretace |
| cypres | Cyprès (Cupressacées) | Cupressaceae | jurassique, cretace |
| podocarpe | Podocarpe | Podocarpus | jurassique, cretace |
| fougere_arborescente | Fougère arborescente | Cyatheales | trias, jurassique, cretace |
| williamsonia | Williamsonia (Bennettitale) | Williamsonia | jurassique |
| mousse | Mousses | Bryophyta | trias, jurassique, cretace |
| archaefructus | Archaefructus (1ʳᵉ fleur) | Archaefructus | cretace |
| magnolia | Magnolia | Magnolia | cretace |
| nenuphar | Nénuphar | Nymphaeales | cretace |
| platane | Platane | Platanus | cretace |
| palmier | Palmier | Arecaceae (Sabalites) | cretace |
| herbe | Herbe (premières graminées) | Poaceae | cretace |
| wollemia | Pin de Wollemi | Wollemia | cretace |

Écarter une entrée si le fact-check la rend indéfendable pour la période (le dire dans le rapport). Ajouter au plus 2 entrées si une évidence manque (le justifier).

## Règles d'écriture
- Encyclopédie = VRAI : vrais noms latins + sens du nom (règle noms latin/grec), vraies dates.
- Texte court, oral, 4 ans, jamais nian-nian. Une phrase = une idée. Pas de « Max », « doudou », « peluche », « bus » (hors échelle).
- Champs data cibles (à produire en fin de fichier, bloc JSON valide) :
  `{ id, name, full, nom_etym, type (arbre|conifere|fougere|prele|fleur|mousse|herbe|cycas), periodes[], emoji, png, region, hauteur_m, comp_hauteur, environnement, feuille, graines, mangee_par[ids], mangee_comment, superpower, fait, vivant (string : "Oui : …" | "Non : disparue …") }`
- `png` = `<Id>.jpg` (id capitalisé, ex. `Araucaria.jpg`).
- `comp_hauteur` = comparaison SANS chiffre calculée honnêtement à partir de `hauteur_m` (comme `comp_hauteur` des dinos).

## Fichiers autorisés
- `content/sources/flore/_FACTCHECK-flore.md` (sources consultées, verdicts, incertitudes)
- `content/sources/flore/_FLORE-FICHES.md` (fiches + bloc JSON final)
- `content/sources/flore/plantes.json` (le même JSON seul, consommé par HO-021)

## Hors périmètre
- `site/**` (HO-021), images (HO-022), i18n (HO-023).

## Portes de vérification
```bash
# depuis studio/dino
node -e "const p=require('./content/sources/flore/plantes.json');const ids=new Set(require('fs').readFileSync('../../site/js/dinos-data.js','utf8').match(/id: '([a-z_]+)'/g).map(s=>s.slice(5,-1)));let ko=0;for(const x of p){for(const d of x.mangee_par){if(!ids.has(d)){console.log('dino inconnu',x.id,d);ko++}}for(const per of x.periodes){if(!['trias','jurassique','cretace'].includes(per)){console.log('periode',x.id,per);ko++}}}console.log(p.length,'plantes, erreurs:',ko);process.exit(ko?1:0)"
grep -niE "\bmax\b|doudou|peluche" content/sources/flore/_FLORE-FICHES.md && echo STOP || echo OK-vocab
```

## Rapport attendu
Nombre de fiches, entrées écartées/ajoutées et pourquoi, incertitudes scientifiques restantes (ex. herbe au Crétacé), sortie des 2 portes.
