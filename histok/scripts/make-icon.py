#!/usr/bin/env python3
"""Generate the Histok app icon: black square, white serif H, vertical pill
motif on the right (first white, second fading white->gray, rest gray).
Writes a crisp high-res apple-touch-icon + favicon into app/."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

APP = Path(__file__).resolve().parent.parent / "app"
SIZE = 1024

img = Image.new("RGB", (SIZE, SIZE), "#000000")
d = ImageDraw.Draw(img)

font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 600)
bbox = d.textbbox((0, 0), "H", font=font)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
d.text((SIZE * 0.44 - tw / 2 - bbox[0], SIZE / 2 - th / 2 - bbox[1]), "H", font=font, fill="#ffffff")

pw, gap = 40, 30
heights = [128, 78, 78, 78]
x = int(SIZE * 0.80)
total = sum(heights) + gap * (len(heights) - 1)
y = (SIZE - total) // 2
GRAY = (138, 138, 138)
for i, h in enumerate(heights):
    box = [x, y, x + pw, y + h]
    if i == 1:
        # vertical white -> gray gradient, clipped to a rounded pill
        col = Image.new("L", (1, h))
        for j in range(h):
            col.putpixel((0, j), int(255 - (255 - GRAY[0]) * (j / h)))
        pill = Image.merge("RGB", (col, col, col)).resize((pw, h))
        mask = Image.new("L", (pw, h), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, pw - 1, h - 1], radius=pw // 2, fill=255)
        img.paste(pill, (x, y), mask)
    else:
        d.rounded_rectangle(box, radius=pw // 2, fill="#ffffff" if i == 0 else GRAY)
    y += h + gap

img.save(APP / "apple-icon.png")
img.resize((512, 512), Image.LANCZOS).save(APP / "icon.png")
print("wrote", APP / "apple-icon.png", "(1024) and", APP / "icon.png", "(512)")
