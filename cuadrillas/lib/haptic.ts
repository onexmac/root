// Haptic vocabulary — semantic, not decorative. Web Vibration API works on
// Android Chrome; iOS Safari is silent (Apple doesn't expose impact/notification
// feedback to the browser). Build with the vocabulary anyway — it's correct
// when the device honors it.

const vibrate = (pattern: number | number[]) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    // try/catch is NOT paranoia: vibrate() can throw when it isn't tied to a
    // real user gesture (synthetic clicks, programmatic flows). An unguarded
    // throw here propagates into the caller and kills whatever runs AFTER the
    // haptic — it swallowed a shake animation exactly once. Haptics are
    // decoration; they must never break the interaction they accompany.
    try {
      navigator.vibrate(pattern);
    } catch {
      /* device refused / no user activation — ignore */
    }
  }
};

export const haptic = {
  complete: () => vibrate([10, 30, 10]),       // success / confirm
  select:   () => vibrate(5),                  // tap / selection
  drag:     () => vibrate(8),                  // drag milestones (e.g. quarter ticks)
  delete:   () => vibrate([15, 10, 15]),       // remove / dismiss
  error:    () => vibrate([20, 40, 20, 40, 20]),
};
