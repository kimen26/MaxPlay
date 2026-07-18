#!/usr/bin/env python
"""Detoure une image a fond UNI (clair) -> PNG transparent.
Flood-fill depuis les 4 coins avec tolerance, puis adoucit le bord alpha.
Usage: python detoure_sprite.py <in.png/jpg> <out.png> [tolerance]
Pense pour les sprites dino generes sur fond uni clair (gris/blanc).
"""
import sys
from collections import deque
from PIL import Image, ImageFilter

def detoure(src, dst, tol=32):
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    px = im.load()
    # couleur de fond = moyenne des 4 coins
    corners = [px[0, 0], px[w-1, 0], px[0, h-1], px[w-1, h-1]]
    bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))

    def close_tol(c, t):
        return abs(c[0]-bg[0]) <= t and abs(c[1]-bg[1]) <= t and abs(c[2]-bg[2]) <= t

    def close(c):
        return close_tol(c, tol)

    # BFS flood-fill depuis tous les pixels de bord qui matchent le fond
    visited = bytearray(w*h)
    q = deque()
    for x in range(w):
        for y in (0, h-1):
            if not visited[y*w+x] and close(px[x, y]):
                visited[y*w+x] = 1; q.append((x, y))
    for y in range(h):
        for x in (0, w-1):
            if not visited[y*w+x] and close(px[x, y]):
                visited[y*w+x] = 1; q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx, ny = x+dx, y+dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny*w+nx] and close(px[nx, ny]):
                visited[ny*w+nx] = 1; q.append((nx, ny))

    # construit un canal alpha : 0 sur le fond detecte, 255 ailleurs
    from PIL import Image as _I
    a = _I.new("L", (w, h), 255)
    ap = a.load()
    # passe 2 : color-key GLOBAL — tue aussi les poches de fond piegees
    # (fond coince entre le sujet et le bord, non atteint par le flood).
    # tolerance plus stricte pour ne pas mordre dans le sujet clair (dents, ventre).
    tol_key = max(18, tol - 10)
    for i in range(w*h):
        if close_tol(px[i % w, i // w], tol_key):
            visited[i] = 1
    for i in range(w*h):
        if visited[i]:
            ap[i % w, i // w] = 0
    # adoucit legerement le contour (anti-alias du bord) sur CE canal
    a = a.filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(a)
    # crop sur le contenu non transparent + petite marge
    bbox = im.getbbox()
    if bbox:
        pad = 12
        bbox = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(w, bbox[2]+pad), min(h, bbox[3]+pad))
        im = im.crop(bbox)
    im.save(dst)
    print(f"OK -> {dst} ({im.size[0]}x{im.size[1]})")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("usage: python detoure_sprite.py <in> <out.png> [tolerance]"); sys.exit(1)
    tol = int(sys.argv[3]) if len(sys.argv) > 3 else 32
    detoure(sys.argv[1], sys.argv[2], tol)
