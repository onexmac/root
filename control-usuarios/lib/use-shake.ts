"use client";

import { useEffect, useRef } from "react";
import { useAnimationControls } from "motion/react";

/**
 * Alarm-shake vocabulary, shared by every control that can "refuse".
 *
 * Used when the Solicitar slider is tapped while still blocked: the slider
 * shakes AND so does whatever is actually missing (AGREGAR MATERIALES if the
 * pedido is empty, the OBRA+ button if a box still has no código), so the
 * refusal points at the fix instead of just saying no.
 */
export const SHAKE_KEYFRAMES = [0, -9, 9, -7, 7, -4, 4, 0];
export const SHAKE_TRANSITION = { duration: 0.42, ease: "easeInOut" } as const;

/**
 * Replays the shake whenever `signal` increments and `active` is true.
 *
 * Signal is a COUNTER, not a boolean: motion won't re-run an animation whose
 * target is unchanged, so a boolean would fire once and then go dead on the
 * second refusal.
 *
 * Attach the returned controls to a WRAPPER element, never to one that already
 * animates transforms — motion rebuilds the transform from its own animate
 * target and silently drops a competing `x` (learned the hard way on the
 * slider knob, where the shake rendered as `transform: none`).
 */
export function useShake(signal: number, active = true) {
  const controls = useAnimationControls();
  // Last signal this instance actually reacted to. Seeded with the CURRENT
  // signal so a freshly mounted element never shakes on birth: the effect runs
  // on mount, and once the user had refused even once the counter was already
  // > 0 — which made every new obra box shake the moment it appeared.
  const seen = useRef(signal);

  useEffect(() => {
    const isNew = signal !== seen.current;
    seen.current = signal;
    if (isNew && signal > 0 && active) {
      controls.start({ x: SHAKE_KEYFRAMES }, SHAKE_TRANSITION);
    }
    // `active`/`controls` deliberately omitted: fire on a NEW signal only, not
    // when the target's eligibility flips mid-flight.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signal]);

  return controls;
}
