// Motion vocabulary — named transitions, picked by semantics not speed.
// Never inline spring values elsewhere; add a name here.

import type { Transition } from 'motion/react';

export const springs = {
  snappy:     { type: 'spring', stiffness: 400, damping: 30 },              // tap response
  completing: { type: 'spring', stiffness: 300, damping: 28 },              // confirm, check
  deleting:   { type: 'spring', stiffness: 500, damping: 25 },              // remove, warning
  expanding:  { type: 'spring', stiffness: 200, damping: 26 },              // reveal, open
  settling:   { type: 'spring', stiffness: 150, damping: 28 },              // return to rest
  shrinking:  { type: 'spring', stiffness: 260, damping: 34 },              // near-critical
  morphing:   { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 },   // Things 3 — surface morph (button ↔ panel)
  popping:    { type: 'spring', stiffness: 385, damping: 22, mass: 1 },     // bouncy pop-in for ephemera (badges, chips)
} as const satisfies Record<string, Transition>;
