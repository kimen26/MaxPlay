"""Route verticale 5 cols — version refactorée avec builders.py.

Référence : test_route_v_5cols.py. Doit produire un PNG byte-identique.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from builders import route_v  # noqa: E402

ground = route_v(hauteur=12, anti_mono_rows=[1, 6, 9])

SNIPPET = {
    'name': 'route_v_5cols_v2',
    'cols': 5,
    'rows': 12,
    'ground': ground,
    'objects': [],
}
