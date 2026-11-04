"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, animate, type MotionValue } from "motion/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";

type Sample = { y: number; t: number };

export type SlideContext = {
  y: MotionValue<number>;
  pageH: number;
  peeking: MotionValue<number>;
};

const SLOP = 8;
const RUBBER_KNEE = 240;
const RUBBER_FACTOR = 0.35;
const ADVANCE_DISTANCE_RATIO = 0.18;
const ADVANCE_VELOCITY_PX = 250;
// Release past this much overscroll (px) commits the close-to-menu.
const END_CLOSE_PX = 110;
const VELOCITY_WINDOW_MS = 120;
const PEEK_HOLD_MS = 160;
// Wheel: amplify the scroll so a normal gesture visibly drags the photo, and
// commit at a low fraction of a page so it advances readily instead of fighting
// you. Only a tiny accidental scroll snaps back.
const WHEEL_GAIN = 1.6;
const WHEEL_ADVANCE_RATIO = 0.12;

function rubber(overshoot: number) {
  return overshoot < RUBBER_KNEE
    ? overshoot
    : RUBBER_KNEE + (overshoot - RUBBER_KNEE) * RUBBER_FACTOR;
}

/** Shared release decision for touch drag and wheel: how far past the current
 *  page did we travel (+ predicted momentum), and which page should we land on. */
function decideTarget(
  page: number,
  pageCount: number,
  pageH: number,
  translation: number,
  vy: number,
  ratio = ADVANCE_DISTANCE_RATIO,
) {
  const predicted = translation + vy * ADVANCE_VELOCITY_PX;
  const advance =
    Math.abs(translation) > pageH * ratio ||
    Math.abs(predicted) > ADVANCE_VELOCITY_PX;
  if (!advance) return page;
  return translation < 0
    ? Math.min(pageCount - 1, page + 1)
    : Math.max(0, page - 1);
}

export function ReelPager({
  pageCount,
  page,
  onPageChange,
  disabled,
  renderSlide,
  onActivity,
  onEndPull,
  onEndRelease,
  y,
  onMeasure,
  overlay,
  endSlot,
}: {
  pageCount: number;
  page: number;
  onPageChange: (p: number) => void;
  disabled?: boolean;
  renderSlide: (index: number, isCurrent: boolean, ctx: SlideContext) => ReactNode;
  onActivity?: () => void;
  /** Overscroll past an end (first slide down / last slide up): progress 0→1
   *  drives the close-to-menu transition; release commits or cancels. */
  onEndPull?: (progress: number) => void;
  onEndRelease?: (commit: boolean) => void;
  y: MotionValue<number>;
  onMeasure?: (pageH: number) => void;
  /** Fixed chrome (back button, pills) rendered INSIDE the viewport so a
   *  pointerdown on it bubbles to the pager's gesture handlers — otherwise
   *  gestures starting on the chrome never reach the pager (Bug B). */
  overlay?: ReactNode;
  /** Sign-off revealed just past the last slide when you overscroll the end. */
  endSlot?: ReactNode;
}) {
  const [pageH, setPageH] = useState(0);
  const measured = useRef(false);
  const peeking = useMotionValue(0);
  // Overscroll past an end: signed px (negative past the LAST slide, positive
  // past the FIRST). Instead of translating the strip into empty black, the
  // current slide RESIZES — at the last slide the photo shrinks + pushes up,
  // mirroring the open grow and revealing the sign-off; at the first it's a
  // small squish. No black box.
  const overscroll = useMotionValue(0);
  // LAST slide only (overscroll < 0): the photo shrinks UPWARD (origin top) with
  // resistance, revealing the H sign-off below. Tensioned so it grips the finger
  // rather than slipping. (First slide is handled by the parent's pull-down.)
  const endLift = useTransform(overscroll, (v) => (v < 0 ? 200 * (1 - Math.exp((v * 0.6) / 200)) : 0));
  const slideShift = useTransform(endLift, (t) => -t); // lift the photo up
  const slideScale = useTransform(endLift, (t) => 1 - (t / 200) * 0.28); // shrink up to ~28%
  const slideRadius = useTransform(endLift, (t) => Math.min(t / 50, 1) * 44); // rounds as it shrinks
  const endReveal = useTransform(endLift, (t) => Math.min(1, t / 90));
  const endRevealScale = useTransform(endReveal, (r) => 0.9 + r * 0.1);

  const dragging = useRef(false);
  const axisLocked = useRef<"x" | "y" | null>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const baseY = useRef(0);
  const samples = useRef<Sample[]>([]);
  const pointerId = useRef<number | null>(null);
  const [initialPage] = useState(() => page);
  const peekTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPeeking = useRef(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const wheelActive = useRef(false);
  const wheelSamples = useRef<Sample[]>([]);
  const wheelResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const measure = () => {
      if (dragging.current) return;
      const h = window.visualViewport?.height ?? window.innerHeight;
      setPageH(h);
      onMeasure?.(h);
      if (!measured.current) {
        measured.current = true;
        y.set(-initialPage * h);
      }
    };
    measure();
    window.visualViewport?.addEventListener("resize", measure);
    window.addEventListener("resize", measure);
    return () => {
      window.visualViewport?.removeEventListener("resize", measure);
      window.removeEventListener("resize", measure);
    };
  }, [y, initialPage, onMeasure]);

  useEffect(() => {
    if (!pageH || !measured.current) return;
    if (dragging.current) return;
    animate(y, -page * pageH, springs.settling);
  }, [page, pageH, y]);

  const clearPeekTimer = () => {
    if (peekTimer.current) {
      clearTimeout(peekTimer.current);
      peekTimer.current = null;
    }
  };

  const endPeek = () => {
    if (!isPeeking.current) return;
    isPeeking.current = false;
    // Snappier + smoother than settling: once the hold is committed the photo
    // eagerly returns to full-bleed, no lazy overshoot.
    animate(peeking, 0, springs.shrinking);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (disabled || !pageH) return;
    y.stop();
    dragging.current = false;
    axisLocked.current = null;
    startX.current = e.clientX;
    startY.current = e.clientY;
    baseY.current = y.get();
    samples.current = [{ y: e.clientY, t: e.timeStamp }];
    pointerId.current = e.pointerId;
    onActivity?.();

    clearPeekTimer();
    peekTimer.current = setTimeout(() => {
      if (pointerId.current === null || axisLocked.current === "y") return;
      isPeeking.current = true;
      haptic.select();
      // Eager, low-tension arrival: once committed, the photo wants to get into
      // the revealed position fast and clean (no overshoot wobble).
      animate(peeking, 1, springs.shrinking);
    }, PEEK_HOLD_MS);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (disabled || !pageH || pointerId.current !== e.pointerId) return;

    if (isPeeking.current) {
      const dx0 = e.clientX - startX.current;
      const dy0 = e.clientY - startY.current;
      if (Math.abs(dx0) < SLOP && Math.abs(dy0) < SLOP) return;
      // the user started scrolling mid-peek: cancel the peek and hand off into
      // a fresh drag gesture anchored at this point, so it still tracks 1:1
      isPeeking.current = false;
      animate(peeking, 0, springs.snappy);
      startX.current = e.clientX;
      startY.current = e.clientY;
      baseY.current = y.get();
      samples.current = [{ y: e.clientY, t: e.timeStamp }];
    }

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    if (!axisLocked.current) {
      if (Math.abs(dx) < SLOP && Math.abs(dy) < SLOP) return;
      axisLocked.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      clearPeekTimer(); // any directional drag cancels a pending peek
      if (axisLocked.current === "y") {
        dragging.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
        haptic.drag();
      }
    }

    if (axisLocked.current !== "y") return;

    onActivity?.();
    samples.current.push({ y: e.clientY, t: e.timeStamp });
    const cutoff = e.timeStamp - VELOCITY_WINDOW_MS;
    while (samples.current.length > 2 && samples.current[0].t < cutoff) {
      samples.current.shift();
    }

    const naive = baseY.current + dy;
    const maxY = 0;
    const minY = -(pageCount - 1) * pageH;
    if (naive > maxY) {
      // past the FIRST slide (pull DOWN, +) → drag the card down toward the menu
      y.set(maxY);
      overscroll.set(naive - maxY);
      onEndPull?.(naive - maxY);
    } else if (naive < minY) {
      // past the LAST slide (pull UP, −) → shrink the card toward the menu
      y.set(minY);
      overscroll.set(naive - minY);
      onEndPull?.(naive - minY);
    } else {
      y.set(naive);
      if (overscroll.get() !== 0) {
        overscroll.set(0);
        onEndPull?.(0); // back inside the content → cancel
      }
    }
  };

  const endDrag = (e: React.PointerEvent) => {
    if (pointerId.current !== e.pointerId) return;
    pointerId.current = null;
    clearPeekTimer();
    endPeek();

    if (!dragging.current) {
      axisLocked.current = null;
      return;
    }
    dragging.current = false;
    axisLocked.current = null;

    // Overscrolled past an end → commit the close if pulled far enough,
    // otherwise let it spring back.
    const os = overscroll.get();
    if (os !== 0) {
      onEndRelease?.(Math.abs(os) > END_CLOSE_PX);
      animate(overscroll, 0, springs.settling);
      return;
    }

    const restY = -page * pageH;
    const translation = y.get() - restY;

    const first = samples.current[0];
    const last = samples.current[samples.current.length - 1];
    const dt = last.t - first.t;
    const vy = dt > 0 ? (last.y - first.y) / dt : 0;

    const target = decideTarget(page, pageCount, pageH, translation, vy);

    if (target !== page) {
      haptic.select();
      animate(y, -target * pageH, springs.settling);
      onPageChange(target);
    } else {
      animate(y, restY, springs.snappy);
    }
  };

  // Desktop: mouse wheel / two-finger trackpad scroll DRAGS the reel with the
  // pointer (the photo follows the scroll, rubber-banding at the ends). Only
  // when the scroll goes quiet do we decide — past the threshold it settles to
  // the next photo, otherwise it springs back. Nothing advances on its own, so
  // the user stays in control of the scroll.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const clamp = (raw: number) => {
      const maxY = 0;
      const minY = -(pageCount - 1) * pageH;
      if (raw > maxY) return maxY + rubber(raw - maxY);
      if (raw < minY) return minY - rubber(minY - raw);
      return raw;
    };
    const onWheel = (e: WheelEvent) => {
      if (disabled || !pageH) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      onActivity?.();

      if (!wheelActive.current) {
        wheelActive.current = true;
        y.stop();
        wheelSamples.current = [];
      }

      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= pageH;
      dy *= WHEEL_GAIN;
      // cap travel to ~one page from the current rest so a big fling can't drag
      // several pages before snapping back — keeps it to one page per gesture
      const restY = -page * pageH;
      const raw = Math.max(restY - pageH, Math.min(restY + pageH, y.get() - dy));
      y.set(clamp(raw));

      wheelSamples.current.push({ y: y.get(), t: e.timeStamp });
      const cutoff = e.timeStamp - VELOCITY_WINDOW_MS;
      while (wheelSamples.current.length > 2 && wheelSamples.current[0].t < cutoff) {
        wheelSamples.current.shift();
      }

      if (wheelResetTimer.current) clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = setTimeout(() => {
        wheelActive.current = false;
        const translation = y.get() - restY;
        const s = wheelSamples.current;
        const first = s[0];
        const last = s[s.length - 1];
        const dt = first && last ? last.t - first.t : 0;
        const vy = dt > 0 ? (last.y - first.y) / dt : 0;
        const target = decideTarget(page, pageCount, pageH, translation, vy, WHEEL_ADVANCE_RATIO);
        if (target !== page) {
          haptic.select();
          animate(y, -target * pageH, springs.settling);
          onPageChange(target);
        } else {
          animate(y, restY, springs.snappy);
        }
      }, 90);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [page, pageH, disabled, pageCount, y, onPageChange, onActivity]);

  return (
    <div
      ref={viewportRef}
      className="absolute inset-0 overflow-hidden"
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* Sign-off sits behind the slides at the bottom; the last photo shrinking
          up on overscroll reveals it. */}
      {endSlot && (
        <motion.div
          className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-[calc(var(--sab)_+_48px)] pointer-events-none"
          style={{ opacity: endReveal, scale: endRevealScale }}
        >
          {endSlot}
        </motion.div>
      )}
      <motion.div style={{ y, willChange: "transform" }}>
        {Array.from({ length: pageCount }).map((_, i) =>
          Math.abs(i - page) <= 1 ? (
            <motion.div
              key={i}
              style={
                i === page
                  ? {
                      scale: slideScale,
                      y: slideShift,
                      borderRadius: slideRadius,
                      overflow: "hidden",
                      transformOrigin: "50% 0%",
                    }
                  : undefined
              }
            >
              {renderSlide(i, i === page, { y, pageH, peeking })}
            </motion.div>
          ) : (
            <div key={i} style={{ height: pageH || "100dvh" }} />
          ),
        )}
      </motion.div>
      {overlay}
    </div>
  );
}
