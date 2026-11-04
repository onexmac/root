#!/usr/bin/env node
/**
 * Renders the Adelante mark to the three raster icons iOS + PWA need:
 *
 *   • public/apple-touch-icon.png    — 180×180, green bg, black mark
 *                                       (iOS adds its own squircle)
 *   • public/icon-192.png            — 192×192, PWA `purpose: any`
 *   • public/icon-512.png            — 512×512, PWA `purpose: any`
 *   • public/icon-maskable-512.png   — 512×512, PWA `purpose: maskable`
 *                                       (mark inside the center 80% safe zone)
 *
 * The mark path coords come straight from ~/Desktop/adelante-icon.svg
 * (ICON.md §1). Path is rendered at 60% of canvas width per the iOS
 * AppIcon safe-zone proportions (ICON.md §3.1, §4).
 *
 * Run: `npm run icons` (or `node scripts/generate-icons.mjs`)
 *
 * Idempotent — re-running just overwrites the files.
 */

import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// Mark path — verbatim from ~/Desktop/adelante-icon.svg (ICON.md §1).
const MARK_PATH =
  "M0 0H45.645L87.8835 70.7845H41.4411L0 0ZM72.5219 20.6455H118.403L133.203 45.715H162.804L148.004 70.7845H102.257L72.5219 20.6455Z";
const MARK_VIEWBOX_W = 163;
const MARK_VIEWBOX_H = 71;

/**
 * Build a square SVG with the mark centered.
 *
 * `markPctOfWidth` controls how much of the canvas the mark occupies.
 * iOS AppIcon convention: 60% (~614 px on a 1024 canvas) for normal
 * purpose, 50% for `maskable` to keep the art inside the 80% safe zone
 * with margin.
 */
function buildSvg({ size, bg, markColor, markPctOfWidth }) {
  const markW = size * markPctOfWidth;
  const scale = markW / MARK_VIEWBOX_W;
  const markH = MARK_VIEWBOX_H * scale;
  const x = (size - markW) / 2;
  const y = (size - markH) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <g transform="translate(${x} ${y}) scale(${scale})">
    <path fill="${markColor}" fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}"/>
  </g>
</svg>`;
}

async function renderPng(svg, outPath) {
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`✓ ${outPath}`);
}

await mkdir(publicDir, { recursive: true });

/* apple-touch-icon — green bg, black mark, no rounding (iOS adds it). */
await renderPng(
  buildSvg({
    size: 180,
    bg: "#BDDE3B",
    markColor: "#000000",
    markPctOfWidth: 0.6,
  }),
  join(publicDir, "apple-touch-icon.png"),
);

/* PWA standard icons — same recipe as apple-touch, scaled up. */
await renderPng(
  buildSvg({
    size: 192,
    bg: "#BDDE3B",
    markColor: "#000000",
    markPctOfWidth: 0.6,
  }),
  join(publicDir, "icon-192.png"),
);

await renderPng(
  buildSvg({
    size: 512,
    bg: "#BDDE3B",
    markColor: "#000000",
    markPctOfWidth: 0.6,
  }),
  join(publicDir, "icon-512.png"),
);

/* Maskable PWA icon — mark sized to 50% (instead of 60%) so it sits
 * inside the center 80% safe zone with breathing room. Android's
 * adaptive icon crop will keep the mark fully visible across circle /
 * squircle / teardrop crops. Background extends edge-to-edge so the
 * crop doesn't expose transparency. */
await renderPng(
  buildSvg({
    size: 512,
    bg: "#BDDE3B",
    markColor: "#000000",
    markPctOfWidth: 0.5,
  }),
  join(publicDir, "icon-maskable-512.png"),
);

console.log("\nDone. Icons written to public/.");
