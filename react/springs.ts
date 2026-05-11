/**
 * Spring vocabulary — semantic, never inline.
 * Mirrors the iOS prototype's `Springs.swift`.
 *
 * Rule: pick by *meaning* of the interaction, not visual speed.
 * Adding a new spring? Use a semantic name (what it does), not a descriptor (how it feels).
 */
export const springs = {
  /** Fast response — taps, immediate feedback */
  snappy: { type: "spring", stiffness: 400, damping: 30 },
  /** Confirm, check, success */
  completing: { type: "spring", stiffness: 300, damping: 28 },
  /** Removal, warning, destructive */
  deleting: { type: "spring", stiffness: 500, damping: 25 },
  /** Card expand, reveal, drawer open — softened para evitar overshoot */
  expanding: { type: "spring", stiffness: 170, damping: 30 },
  /** Return to rest, dismiss, settle */
  settling: { type: "spring", stiffness: 150, damping: 28 },
} as const;

export type SpringName = keyof typeof springs;
