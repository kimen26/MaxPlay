"""Route horizontale 5 rows — version refactorée avec vocab.py + builders.py.

Référence : test_route_h_5rows.py (avant EP-VOCAB). Cette version doit produire
un PNG byte-identique.

Diff de lisibilité :
  AVANT : 36 lignes, 5 constantes string redéfinies, 1 boucle for de 10 lignes
  APRÈS : 1 import, 1 appel macro, total 8 lignes utiles
"""

import sys
from pathlib import Path

# Permet l'import quand on lance via render.py (recipes/ != tile-tools/)
sys.path.insert(0, str(Path(__file__).parent.parent))

from builders import route_h  # noqa: E402

ground = route_h(longueur=14, anti_mono_cols=[4, 10])

SNIPPET = {
    'name': 'route_h_5rows_v2',
    'cols': 14,
    'rows': 5,
    'ground': ground,
    'objects': [],
}
