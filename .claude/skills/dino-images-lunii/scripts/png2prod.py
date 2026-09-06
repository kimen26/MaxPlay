# PNG du staging -> format de la collection paleoart (JPEG q88 / WebP q90).
# ImageMagick n'est pas installé sur ce poste (attention : `convert.exe` de Windows
# est l'utilitaire de disque, pas ImageMagick). Pillow fait le travail.
import sys
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src)
if dst.lower().endswith('.jpg'):
    im.convert('RGB').save(dst, 'JPEG', quality=88, optimize=True, progressive=True)
elif dst.lower().endswith('.webp'):
    im.save(dst, 'WEBP', quality=90, method=6)
else:
    sys.exit('extension non gérée: ' + dst)
