#!/usr/bin/env python3
"""Upscale + soft-blur any source photo below MIN_WIDTH so low-res
historical scans read as intentional soft-focus instead of choppy/pixelated
when stretched full-bleed on a phone. Run after dropping new images into
public/images/.
"""
import sys
from pathlib import Path
from PIL import Image, ImageFilter

IMAGES_DIR = Path(__file__).resolve().parent.parent / "public" / "images"
MIN_WIDTH = 1200
TARGET_WIDTH = 1400
BLUR_RADIUS = 2.2


def process(path: Path) -> None:
    im = Image.open(path)
    if im.width >= MIN_WIDTH:
        print(f"skip  {path.name} ({im.width}x{im.height}, already crisp)")
        return
    scale = TARGET_WIDTH / im.width
    resized = im.resize((TARGET_WIDTH, round(im.height * scale)), Image.LANCZOS)
    blurred = resized.filter(ImageFilter.GaussianBlur(BLUR_RADIUS))
    blurred.convert("RGB").save(path, "JPEG", quality=82)
    print(f"blurred {path.name} -> {blurred.size} (blur r={BLUR_RADIUS})")


if __name__ == "__main__":
    targets = sys.argv[1:] or [p.name for p in IMAGES_DIR.iterdir()]
    for name in targets:
        p = IMAGES_DIR / name
        if p.suffix.lower() in (".jpg", ".jpeg", ".png"):
            process(p)
