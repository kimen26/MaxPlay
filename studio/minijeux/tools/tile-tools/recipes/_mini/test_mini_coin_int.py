"""Mini-render ISOLE 4x4 — coin INTERIEUR (concave) du virage, methode L-009.

# CORRECTION : le message coordinateur citait "Sidewalk_1_3 (NE)" mais la VERIFICATION
# VISUELLE directe (zoom x10 sur _1/_3/_5/_7 isoles, comparaison cote a cote) montre :
#   _1 = nub SE, _3 = nub SW, _5 = nub NW, _7 = nub NE.
# (vocab.py lui-meme a un bug de commentaire sur _5/_7, inverses — non corrige ici, hors
# scope, verifie independamment par l'image plutot que par la doc, cf regle d'or SKILL).
# Pour un bloc trottoir qui remplit l'angle SUD-OUEST d'un virage OUEST->SUD, le coin qui
# doit s'ouvrir vers la chaussee (N + E) est le coin NE du bloc -> tile SW7 (nub NE), pas SW3.

Contexte 4x4 : asphalte au N et a l'E (la chaussee qui tourne), bloc trottoir SW rempli
au S-O. SW7 REMPLACE la cellule du coin NE du bloc trottoir lui-meme (pas une cellule
separee plus loin dans l'asphalte — lecon LESSONS "la tile doit etre a la frontiere du
bloc, pas au-dela").

  row0 : asphalte asphalte asphalte asphalte   (chaussee, cote nord de la poche)
  row1 : asphalte asphalte asphalte asphalte   (chaussee)
  row2 : trottoir trottoir SW7      asphalte   (coin NE du bloc trottoir remplace par SW7)
  row3 : trottoir trottoir trottoir asphalte   (bloc trottoir continue, coin non affecte)

A valider visuellement : le coin doit s'inserer proprement, sans pixel qui depasse
dans l'asphalte ni trou visible entre trottoir et bloc.
"""
_R = 'roads/ME_Singles_City_Terrains_48x48_{n}.png'


def r(n):
    return _R.format(n=n)


SW9 = r('Sidewalk_1_9')
SW7 = r('Sidewalk_1_7')
A20 = r('Asphalt_1_Variation_20')

ground = [
    [A20, A20, A20, A20],
    [A20, A20, A20, A20],
    [SW9, SW9, SW7, A20],
    [SW9, SW9, SW9, A20],
]

SNIPPET = {'name': 'mini_coin_int', 'cols': 4, 'rows': 4, 'ground': ground, 'objects': []}
