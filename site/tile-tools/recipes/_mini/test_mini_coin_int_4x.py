"""Test des 4 variantes de nub (_1/_3/_5/_7) a la meme position, pour trancher visuellement
laquelle (si une seule) se connecte proprement au bloc trottoir. Chaque bloc = 4x4 isole.
"""
_R = 'roads/ME_Singles_City_Terrains_48x48_{n}.png'


def r(n):
    return _R.format(n=n)


SW9 = r('Sidewalk_1_9')
A20 = r('Asphalt_1_Variation_20')
nubs = [r('Sidewalk_1_1'), r('Sidewalk_1_3'), r('Sidewalk_1_5'), r('Sidewalk_1_7')]

# 4 blocs 4x4 cote a cote = grille totale 16x4
ground = [[A20] * 16 for _ in range(4)]
for i, nub in enumerate(nubs):
    base_c = i * 4
    ground[2][base_c + 0] = SW9
    ground[2][base_c + 1] = SW9
    ground[2][base_c + 2] = nub
    ground[3][base_c + 0] = SW9
    ground[3][base_c + 1] = SW9
    ground[3][base_c + 2] = SW9

SNIPPET = {'name': 'mini_coin_int_4x', 'cols': 16, 'rows': 4, 'ground': ground, 'objects': []}
