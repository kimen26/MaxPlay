# Protocole d'audit images paléoart — 2026-09

But : chaque dino a 7 images conformes à SES caractéristiques, avec une posture/action
DIFFÉRENTE d'une image à l'autre, dans un environnement cohérent (époque + région).

## Les 7 assets par dino

| Fichier | Rôle | Contrainte propre |
|---|---|---|
| `<Base>.jpg` | hero | Corps entier lisible. Enfant possible comme repère d'échelle. |
| `<Base>_headshot.jpg` | portrait | Gros plan tête/buste. |
| `<Base>_manger.jpg` | régime | Montre ce qu'il mange VRAIMENT (voir `regime`/`proies`). |
| `<Base>_ecosysteme.jpg` | milieu | Le décor de son époque/région, dino intégré. |
| `<Base>_paris.jpg` | échelle | Comparaison de taille (bus/rue). Ratio honnête. |
| `<Base>_funfact.jpg` | le fait | Illustre le champ `fait` du dino. |
| `<Base>_coloriage.webp` | coloriage | Trait noir sur blanc, pas de gris. |

## Grille de verdict (par image)

Chaque image reçoit **OK** ou **RECALE** + motif. Motifs de recalage :

1. **MORPHO** — anatomie fausse pour CE dino : nombre de doigts, forme du crâne,
   plumes/écailles, queue traînante au sol, membres mal proportionnés,
   bipède dessiné quadrupède (ou l'inverse), voile/plaques/cornes absentes ou fausses.
2. **IDENTITE** — ce n'est pas ce dino (générique, ou un autre taxon reconnaissable).
3. **CLONE** — posture/cadrage/action quasi identiques à une autre image du MEME dino
   (le défaut visé par cette campagne). Même pose + même angle = recalé.
4. **ENVIRONNEMENT** — décor incohérent avec `epoque`/`region` (herbe/fleurs modernes
   au Trias-Jurassique, mammifères modernes, palmiers pour un dino polaire...).
5. **CONTENU** — la scène ne fait pas son travail : `_manger` sans nourriture,
   `_funfact` qui n'illustre pas le `fait`, `_paris` au ratio faux, hero sans corps entier.
6. **TECHNIQUE** — texte incrusté (sauf repère « 1m »), watermark, artefact IA visible
   (doigt/membre en trop, fusion d'animaux), image floue ou tronquée.

## Règles de jugement

- **On juge contre les caractéristiques du dino**, fournies en JSON — jamais de mémoire.
- **Doute = OK.** On ne recale que sur un défaut qu'on peut nommer et localiser.
  Une image correcte mais banale n'est PAS un motif de recalage.
- **CLONE se juge sur la paire** : on cite les 2 fichiers concernés et ce qui est identique.
- Le hero SANS enfant n'est pas recalé pour ça (plusieurs styles coexistent) — on le note.
- Coloriage : recalé seulement si niveaux de gris/remplissage noir, ou sujet faux.
- Violence : prédation vraie OK, mais jamais sang/torture/agonie (règle pôle).

## Sortie attendue (une ligne par image)

Format TSV strict, sans en-tête, dans `verdicts/<id>.tsv` :

```
<fichier>	<OK|RECALE>	<motif ou ->	<description courte de ce qu'on voit>
```

Puis, pour CHAQUE image RECALE, un prompt de régénération dans `prompts/<id>.md` :
- décrit le dino avec sa MORPHO exacte (traits distinctifs à ne pas rater)
- décrit l'action/posture VOULUE, explicitement différente des autres scènes du dino
- décrit l'environnement (époque + région + flore d'époque)
- interdit : texte incrusté, watermark, humain (sauf hero/paris), sang/gore
