"use client";

import { motion } from "motion/react";

/**
 * Pale green of the "sending" surface, read off the reference. It must be
 * OPAQUE (an alpha green would let the content show through — the reference
 * shows a solid fill), so it's the blend of green-100 over white rather than
 * `bg-green-100/55`.
 * NOT-IN-DS: no pale-green token exists yet — candidate for review.
 */
export const SAVING_GREEN = "#D3E27F";

/**
 * SavingVeil — the green surface that grows over one element when the pedido
 * is sent. Drop it inside any `relative overflow-hidden` target and stagger
 * the `delay` per element to get the cascade down the panel.
 *
 * Renders a <span> (not a div) so it stays valid inside <button> targets.
 *
 * scaleY from the top edge, never `height`: scale is GPU-composited, and a
 * height animation on an auto-height parent can't interpolate reliably.
 */
export function SavingVeil({
  active,
  delay = 0,
  radius = 0,
}: {
  active: boolean;
  delay?: number;
  radius?: number;
}) {
  return (
    <motion.span
      aria-hidden
      initial={false}
      animate={{ scaleY: active ? 1 : 0, opacity: active ? 1 : 0 }}
      transition={{
        scaleY: {
          type: "spring",
          stiffness: 90,
          damping: 20,
          delay: active ? delay : 0,
        },
        // Fades out all at once on reset — the cascade is for the way IN.
        opacity: { duration: 0.12, delay: active ? delay : 0 },
      }}
      style={{
        originY: 0,
        background: SAVING_GREEN,
        borderRadius: radius,
      }}
      // z-10 so it covers its target regardless of where it sits among the
      // siblings — lets callers drop it in as the first child without the
      // content painting over the green.
      className="pointer-events-none absolute inset-0 z-10 block"
    />
  );
}
