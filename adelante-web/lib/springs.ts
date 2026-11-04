// Motion vocabulary — values derived from the SwiftUI P2 prototype's
// `Motion/Springs.swift`. The SwiftUI `spring(response, dampingFraction)`
// converts to motion.dev's stiffness/damping via:
//   stiffness = (2π / response)²
//   damping   = 2 · dampingFraction · √stiffness     (mass = 1)
//
// Never inline spring values elsewhere; add a semantic name here and use
// it as a transition everywhere that interaction lives. See P2_SPEC.md §5.

import type { Transition } from 'motion/react';

export const springs = {
  // SwiftUI: response 0.30, damping 0.70 — tap response, dialog dismiss
  snappy:     { type: 'spring', stiffness: 440, damping: 29, mass: 1 },

  // SwiftUI: 0.40, 0.80 — confirm, check, slight overshoot
  completing: { type: 'spring', stiffness: 247, damping: 25, mass: 1 },

  // SwiftUI: 0.25, 0.65 — remove, warning
  deleting:   { type: 'spring', stiffness: 632, damping: 33, mass: 1 },

  // SwiftUI: 0.50, 0.75 — reveal, open, card grow, FAB → sheet phase
  expanding:  { type: 'spring', stiffness: 158, damping: 19, mass: 1 },

  // SwiftUI: 0.60, 0.85 — return to rest after drag
  settling:   { type: 'spring', stiffness: 110, damping: 18, mass: 1 },

  // SwiftUI: 0.42, 0.98 — near-critically damped, shrink without overshoot
  shrinking:  { type: 'spring', stiffness: 224, damping: 29, mass: 1 },

  // SwiftUI: 0.32, 0.55 — bouncy pop-in (Activo pill, menu items)
  popping:    { type: 'spring', stiffness: 385, damping: 22, mass: 1 },
} as const satisfies Record<string, Transition>;

export type SpringName = keyof typeof springs;
