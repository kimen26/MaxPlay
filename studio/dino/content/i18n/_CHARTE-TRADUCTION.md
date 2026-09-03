# Charte de traduction — encyclopedie DINO

> Figee 2026-09-03, vague texte (en, es-es, pt-br). S'applique a tout traducteur, humain ou agent.
> Le FR (`site/js/dinos-data.js`) est le CANON : il ne se modifie jamais depuis une autre langue.

## La regle qui prime sur toutes les autres

**On n'ecrit pas la traduction d'un texte francais. On ecrit le texte qu'un auteur natif
aurait ecrit pour un enfant de 4 ans de son pays.**

Le test : un parent natif lit la fiche a voix haute a son enfant. S'il bute une seule fois,
si une tournure « sent la traduction », c'est rate. On ne cherche pas la fidelite mot a mot,
on cherche le meme EFFET sur l'enfant.

## Registre

- Enfant de 3,5 a 5 ans, texte destine a etre **entendu** (voix off), pas lu.
- Phrases courtes. Une idee par phrase. Rythme parle, pas ecrit.
- L'enthousiasme passe par le rythme et le concret, jamais par l'accumulation
  d'exclamations. Garder le nombre de `!` du FR, sans en ajouter.
- L'enfant est tutoye la ou la langue le fait naturellement :
  - **en** : `you` (neutre, pas de probleme)
  - **es-es** : `tu` (registre familier enfant, jamais `usted`)
  - **pt-br** : `voce` (usage bresilien courant, jamais `tu`)

## Ce qui se traduit / ce qui ne se traduit pas

| Se traduit | Ne se traduit JAMAIS |
|---|---|
| `desc`, `fait`, `superpower`, `regime`, `chasseurs`, `proies`, `amis` | `id`, `png`, `color`, `emoji`, `bg` |
| `comp_taille`, `comp_hauteur`, `comp_poids` (comparaisons) | Les mesures chiffrees (`taille_m`, `poids_t`...) |
| `epoque`, `region`, `continent` (noms propres localises) | Le nom scientifique latin (`full`) |
| `nom_etym` (explication d'etymologie) | Les racines grecques/latines elles-memes |
| Familles : `label`, `desc`, `sci_sens`, `explic` | `sci` (nom savant : adapter la graphie locale, pas traduire) |

### `name` — cas particulier
Le nom vernaculaire suit l'usage du pays : `Tyrannosaure` (fr) devient `T. rex` /
`Tyrannosaurus` (en), `Tiranosaurio` (es), `Tiranossauro` (pt-br). **Toujours la forme
qu'un enfant du pays entend a la television et lit dans ses livres**, jamais un calque.

## Les comparaisons : le piege numero un

`comp_taille`, `comp_hauteur`, `comp_poids` comparent la bete a des reperes du quotidien.
Un repere francais ne parle pas a un enfant bresilien.

- **Autorise et encourage** : remplacer le repere par son equivalent culturel local
  (un bus parisien devient un school bus en EN, un onibus en PT-BR).
- **Interdit** : changer l'ORDRE DE GRANDEUR. Si le FR dit « aussi long que 3 voitures »,
  le repere local doit rester equivalent a 3 voitures. On adapte le referent, jamais l'echelle.
- L'honnetete scientifique prime sur la jolie formule.

## Unites de mesure : convertir, avec des chiffres ronds

Le FR est metrique. Un enfant de 4 ans dont le pays ne l'est pas n'entend que du bruit :
« 20 cm » ne lui dit rien, sa main si.

- **en** : convertir en imperial (inches, feet, mph). L'anglais US n'a aucun referentiel
  metrique a cet age, et la lecture a voix haute prive l'enfant de l'image qui pourrait
  le rattraper.
- **es-es, pt-br** : garder le metrique, c'est deja leur systeme.

Deux regles qui vont avec la conversion :

1. **Arrondir.** « 8 inches », jamais « 7.87 inches » : un chiffre a decimale trahit la
   conversion et casse la fluidite orale.
2. **Garder le chiffre ET la comparaison.** Le chiffre donne le frisson et la precision,
   la comparaison porte le sens. « Eight inches long — longer than your hand! »
3. La comparaison doit rester verifiable par l'enfant lui-meme (sa main, sa tete, sa
   maison). Un repere trop abstrait pour 4 ans (« a 4-story building ») se remplace par
   un repere concret (« taller than a giraffe »).

> Ce cas est la SEULE exception autorisee a la regle « les chiffres ne bougent pas » :
> l'ordre de grandeur est rigoureusement conserve, seule l'unite change. Toute conversion
> doit etre justifiee dans NOTES.md. Validee par relecture native (Kimi) le 2026-09-03.

## Etymologie (`nom_etym`)

Le FR explique le sens grec/latin des racines. La structure se conserve : racine, sa langue,
son sens, puis le nom entier. **Les racines restent en grec/latin** ; seule l'explication
autour se traduit. Decision Papa Yann figee : on garde les noms latin/grec et leur sens.

## Predation

La predation se dit avec verite (chasser pour manger est normal, un os qui craque se dit),
mais **jamais de sang, de torture ni d'agonie**. Simple et vrai, pas gore.
Une proie ne se presente jamais comme un danger pour l'enfant.

## Anti-patterns (rejet automatique en relecture)

1. Calque syntaxique : la phrase suit l'ordre des mots francais.
2. Faux-enfantin : diminutifs plaques, « petit ami dinosaure », mievrerie ajoutee.
3. Faux amis : `actuellement`/`actually`, `sensible`/`sensible`, `librairie`/`library`.
4. Registre soutenu : un mot qu'un enfant de 4 ans n'a jamais entendu.
5. Exclamations ajoutees par rapport au FR.
6. Repere culturel non localise (« comme la tour Eiffel » laisse tel quel en EN).
7. Ordre de grandeur modifie pour faire joli.
