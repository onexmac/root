export const springs = {
  /** Fast response — taps, snap-backs, page snaps after a flick. (0.3, 0.7) */
  snappy: { type: "spring", stiffness: 439, damping: 29.3, mass: 1 },
  /** Confirm, check, success. (0.4, 0.8) */
  completing: { type: "spring", stiffness: 247, damping: 25.1, mass: 1 },
  /** Removal, destructive. (0.25, 0.65) */
  deleting: { type: "spring", stiffness: 632, damping: 32.7, mass: 1 },
  /** Reveals, expansions — visible overshoot. (0.5, 0.75) */
  expanding: { type: "spring", stiffness: 158, damping: 18.8, mass: 1 },
  /** Big deliberate settles — the reel page landing. (0.6, 0.85) */
  settling: { type: "spring", stiffness: 110, damping: 17.8, mass: 1 },
  /** Near-critically damped — shrink without overshoot. (0.42, 0.98) */
  shrinking: { type: "spring", stiffness: 224, damping: 29.3, mass: 1 },
  /** Bouncy pop-in — glossary card, badges, cascade items. (0.32, 0.55) */
  popping: { type: "spring", stiffness: 386, damping: 21.6, mass: 1 },
} as const;

/** Fast simultaneous fade-out for cascade elements on close. (0.22, 0.85) */
export const cascadeOut = { type: "spring", stiffness: 816, damping: 48.6, mass: 1 } as const;
