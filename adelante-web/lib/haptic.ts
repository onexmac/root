/**
 * Haptic vocabulary. Semantic — pick by the MEANING of the interaction,
 * not by which pattern feels nice. Values from P2_SPEC.md §4 (mirror the
 * SwiftUI P2 prototype's HapticEngine.swift events).
 *
 * Support matrix (as of 2026):
 *   Android Chrome / Firefox / Edge    ✅ Web Vibration API, works
 *   Desktop Chrome / Firefox / Edge    ⚠️ Usually no hardware, no-ops
 *   iOS Safari (any version)           ❌ Not implemented. Apple has not
 *                                          exposed the Taptic Engine to the
 *                                          web. PWAs added to home screen
 *                                          still can't vibrate. There is
 *                                          no known workaround that is both
 *                                          reliable and non-intrusive.
 *
 * For real haptics on iOS, wrap the app in Capacitor + @capacitor/haptics,
 * or ship native. The vocabulary here is forward-compatible — if iOS ever
 * exposes navigator.vibrate, these calls will start working unchanged.
 */

function supportsVibrate(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    typeof navigator.vibrate === 'function'
  );
}

function vibrate(pattern: number | number[]) {
  if (!supportsVibrate()) return false;
  try {
    return navigator.vibrate(pattern);
  } catch {
    return false;
  }
}

export const haptic = {
  /** Light tap — buttons, toggles. Fire on onPressStart (touchdown). */
  select:   () => vibrate(8),
  /** Medium — drag start and snap-threshold crossings. */
  drag:     () => vibrate(15),
  /** Success confirmation. */
  complete: () => vibrate([10, 30, 10]),
  /** Warning before destructive confirm. */
  delete:   () => vibrate([20, 50, 20]),
  /** Validation failure. */
  error:    () => vibrate([30, 30, 30, 30]),
} as const;

export type HapticEvent = keyof typeof haptic;

/** Runtime check — surfaces on the /haptics page for user-visible feedback. */
export function hapticsSupported(): boolean {
  return supportsVibrate();
}
