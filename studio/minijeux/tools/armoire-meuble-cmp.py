# -*- coding: utf-8 -*-
"""Compose une planche de comparaison [ref redimensionnee | capture] cote a
cote. Appele par armoire-meuble-shot.mjs (HO-MJ-20), pas d'usage autonome.

Usage: python armoire-meuble-cmp.py <ref.png> <capture.png> <out.png>
"""
import sys
from PIL import Image

ref_path, cap_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]

cap = Image.open(cap_path).convert('RGBA')
ref = Image.open(ref_path).convert('RGBA')

ratio = cap.height / ref.height
ref = ref.resize((max(1, round(ref.width * ratio)), cap.height), Image.LANCZOS)

canvas = Image.new('RGBA', (ref.width + cap.width, cap.height), (245, 245, 245, 255))
canvas.paste(ref, (0, 0), ref)
canvas.paste(cap, (ref.width, 0), cap)
canvas.convert('RGB').save(out_path, 'PNG')
