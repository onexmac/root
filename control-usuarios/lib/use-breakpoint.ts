"use client";

import { useEffect, useState } from "react";

/**
 * useIsCompact — true below `breakpoint` px, i.e. when the screen should show
 * the bottom-first UI instead of the full desktop layout.
 *
 * Starts `null` and only resolves after mount. Rendering a layout on the server
 * that the client then disagrees with produces a hydration mismatch, and
 * guessing "desktop" first makes the mobile view flash the desktop chrome — so
 * callers hold a neutral frame for one tick instead.
 */
export function useIsCompact(breakpoint = 1024): boolean | null {
  const [isCompact, setIsCompact] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const apply = () => setIsCompact(mq.matches);
    apply();
    // BOTH signals on purpose. `change` is the precise one, but it was observed
    // not firing on a programmatic viewport change — the layout stayed on the
    // desktop tree at 542 px wide while the query itself already reported
    // `matches: true`. `resize` is the belt: it re-asks on every frame of a
    // window drag, and React bails out when the boolean is unchanged, so the
    // extra listener costs nothing but removes a stale-layout failure mode.
    mq.addEventListener("change", apply);
    window.addEventListener("resize", apply);
    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
    };
  }, [breakpoint]);

  return isCompact;
}
