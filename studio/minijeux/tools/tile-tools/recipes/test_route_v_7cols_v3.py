"""Route verticale 7 cols v3 - VRAIE LARGEUR LIMEZU (3 cols chaussee).

Validation 2026-05-11 sur planches officielles LimeZu : 3 cols d'asphalte
(voie ouest / marquage central / voie est) + bordures + trottoirs = 7 cols total.

Macro builders.route_v() refondue pour atteindre ce standard.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from builders import route_v  # noqa: E402

ground = route_v(hauteur=14, anti_mono_rows=[4, 10])

SNIPPET = {
    'name': 'route_v_7cols_v3',
    'cols': 7,
    'rows': 14,
    'ground': ground,
    'objects': [],
}
