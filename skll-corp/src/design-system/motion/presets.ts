import type { Transition, Variants } from 'framer-motion'

// ─── Spring Presets ──────────────────────────────────────────
export const springs = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 } as Transition,
  gentle: { type: 'spring', stiffness: 200, damping: 22 } as Transition,
  bouncy: { type: 'spring', stiffness: 500, damping: 25 } as Transition,
  smooth: { type: 'spring', stiffness: 260, damping: 26 } as Transition,
} as const

// ─── Transition Presets ──────────────────────────────────────
export const transitions = {
  screenEnter: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: springs.smooth,
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: springs.snappy,
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: springs.gentle,
  },
  slideDown: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: springs.gentle,
  },
  expandCollapse: {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: springs.smooth,
  },
} as const

// ─── Gesture Presets ─────────────────────────────────────────
export const gestures = {
  tap: {
    whileTap: { scale: 0.95 },
    transition: springs.snappy,
  },
  hover: {
    whileHover: { scale: 1.03 },
    transition: springs.snappy,
  },
  press: {
    whileTap: { scale: 0.92 },
    whileHover: { scale: 1.05 },
    transition: springs.bouncy,
  },
  subtle: {
    whileTap: { scale: 0.98 },
    whileHover: { scale: 1.01 },
    transition: springs.snappy,
  },
} as const

// ─── Stagger Variants ────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: springs.smooth,
  },
}

// ─── Layout Animation Defaults ───────────────────────────────
export const layoutTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}
