"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { springs } from "@/lib/springs";

// A firm wall. Resist from the very first pixel (START_SLOPE < 1) and
// asymptote to MAX_PULL, so the harder you push the harder it resists and the
// content never travels far — the app clearly "doesn't want to go further".
// The spring-back on release still fires, so the spring feel is preserved.
const MAX_PULL = 70;
const START_SLOPE = 0.5;
function rubber(o: number) {
  const a = Math.abs(o);
  const r = MAX_PULL * (1 - Math.exp(-(a * START_SLOPE) / MAX_PULL));
  return Math.sign(o) * r;
}

/** Wraps a natively-scrolling page and adds an iOS-style rubber band at the top
 *  and bottom edges: pull past the edge with spring resistance + a subtle shrink
 *  ("resize"), then it springs back on release. Only engages at the scroll
 *  boundaries, so normal scrolling and native momentum are untouched. */
export function OverscrollBounce({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const pull = useMotionValue(0);
  // The harder you pull past the edge, the more the whole page eases down in
  // size — capped so it stays subtle.
  const scale = useTransform(pull, (p) => 1 - (Math.min(Math.abs(p), MAX_PULL) / MAX_PULL) * 0.03);
  // Shrink toward whichever edge you're pulling from, so the content lifts away
  // from the edge you hit rather than floating in the middle.
  const origin = useTransform(pull, (p) => (p < 0 ? "50% 0%" : "50% 100%"));

  useEffect(() => {
    if (!enabled) {
      pull.set(0);
      return;
    }
    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    // --- touch (mobile, primary) ---
    let startY = 0;
    let atTop = false;
    let atBottom = false;
    let pulling = false;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startY = e.touches[0].clientY;
      const y = window.scrollY;
      atTop = y <= 0;
      atBottom = y >= maxScroll() - 1;
      pulling = false;
      pull.stop();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!atTop && !atBottom) return;
      const dy = e.touches[0].clientY - startY; // finger-down is positive
      const over = (atTop && dy > 0) || (atBottom && dy < 0);
      if (over) {
        e.preventDefault(); // take over from native bounce for this pull
        pulling = true;
        pull.set(rubber(dy));
      } else if (pulling) {
        // scrolled back inside the content — hand control back
        pulling = false;
        animate(pull, 0, springs.settling);
      }
    };
    const release = () => {
      pulling = false;
      animate(pull, 0, springs.settling);
    };

    // --- wheel / trackpad (desktop) ---
    let wheelAccum = 0;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;
    const onWheel = (e: WheelEvent) => {
      const y = window.scrollY;
      const over = (y <= 0 && e.deltaY < 0) || (y >= maxScroll() - 1 && e.deltaY > 0);
      if (!over) return;
      e.preventDefault();
      wheelAccum += -e.deltaY;
      pull.set(rubber(wheelAccum));
      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelAccum = 0;
        animate(pull, 0, springs.settling);
      }, 80);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", release);
    window.addEventListener("touchcancel", release);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", release);
      window.removeEventListener("touchcancel", release);
      window.removeEventListener("wheel", onWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [enabled, pull]);

  return (
    <motion.div style={{ y: pull, scale, transformOrigin: origin, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
