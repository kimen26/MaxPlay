"""Route horizontale 7 rows v3 — VRAIE LARGEUR LIMEZU (3 rows chaussée).

Validation 2026-05-11 sur planches officielles LimeZu : 3 rows d'asphalte
(voie ← / marquage central / voie →) + bordures + trottoirs = 7 rows total.

Macro builders.route_h() refondue pour atteindre ce standard.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from builders import route_h  # noqa: E402

ground = route_h(longueur=14, anti_mono_cols=[4, 10])

SNIPPET = {
    'name': 'route_h_7rows_v3',
    'cols': 14,
    'rows': 7,
    'ground': ground,
    'objects': [],
}
