"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, animate, type MotionValue } from "motion/react";
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
const ADVANCE_DISTANCE_RATIO = 0.25;
const ADVANCE_VELOCITY_PX = 250;
const VELOCITY_WINDOW_MS = 120;
const EXIT_OVERSHOOT_PX = 130;
const PEEK_HOLD_MS = 160;

function rubber(overshoot: number) {
  return overshoot < RUBBER_KNEE
    ? overshoot
    : RUBBER_KNEE + (overshoot - RUBBER_KNEE) * RUBBER_FACTOR;
}

export function ReelPager({
  pageCount,
  page,
  onPageChange,
  disabled,
  renderSlide,
  onActivity,
  onExit,
  y,
  onMeasure,
}: {
  pageCount: number;
  page: number;
  onPageChange: (p: number) => void;
  disabled?: boolean;
  renderSlide: (index: number, isCurrent: boolean, ctx: SlideContext) => ReactNode;
  onActivity?: () => void;
  onExit?: (direction: "start" | "end") => void;
  y: MotionValue<number>;
  onMeasure?: (pageH: number) => void;
}) {
  const [pageH, setPageH] = useState(0);
  const measured = useRef(false);
  const peeking = useMotionValue(0);

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
  const wheelLock = useRef(false);
  const wheelAccum = useRef(0);
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

  const clampBounds = (raw: number) => {
    const maxY = 0;
    const minY = -(pageCount - 1) * pageH;
    if (raw > maxY) return maxY + rubber(raw - maxY);
    if (raw < minY) return minY - rubber(minY - raw);
    return raw;
  };

  const clearPeekTimer = () => {
    if (peekTimer.current) {
      clearTimeout(peekTimer.current);
      peekTimer.current = null;
    }
  };

  const endPeek = () => {
    if (!isPeeking.current) return;
    isPeeking.current = false;
    animate(peeking, 0, springs.settling);
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
      animate(peeking, 1, springs.settling);
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
      if (axisLocked.current === "y") {
        dragging.current = true;
        clearPeekTimer();
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
    y.set(clampBounds(naive));
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

    const restY = -page * pageH;
    const translation = y.get() - restY;

    const first = samples.current[0];
    const last = samples.current[samples.current.length - 1];
    const dt = last.t - first.t;
    const vy = dt > 0 ? (last.y - first.y) / dt : 0;
    const predicted = translation + vy * ADVANCE_VELOCITY_PX;

    const atStart = page === 0 && translation > 0;
    const atEnd = page === pageCount - 1 && translation < 0;
    if (atStart || atEnd) {
      const pastExitThreshold =
        Math.abs(translation) > EXIT_OVERSHOOT_PX ||
        Math.abs(predicted) > ADVANCE_VELOCITY_PX;
      if (pastExitThreshold && onExit) {
        haptic.select();
        animate(y, translation > 0 ? pageH * 1.15 : -((pageCount - 1) * pageH + pageH * 1.15), springs.settling);
        onExit(atStart ? "start" : "end");
        return;
      }
      animate(y, restY, springs.snappy);
      return;
    }

    const advance =
      Math.abs(translation) > pageH * ADVANCE_DISTANCE_RATIO ||
      Math.abs(predicted) > ADVANCE_VELOCITY_PX;

    let target = page;
    if (advance) {
      target =
        translation < 0
          ? Math.min(pageCount - 1, page + 1)
          : Math.max(0, page - 1);
    }

    if (target !== page) {
      haptic.select();
      animate(y, -target * pageH, springs.settling);
      onPageChange(target);
    } else {
      animate(y, restY, springs.snappy);
    }
  };

  // Desktop: mouse wheel / two-finger trackpad scroll advances one page per
  // gesture. A burst of momentum events counts as one page (locked until the
  // burst goes quiet), so a single flick doesn't fly through several slides.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (disabled || !pageH) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      onActivity?.();

      if (wheelResetTimer.current) clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = setTimeout(() => {
        wheelLock.current = false;
        wheelAccum.current = 0;
      }, 140);
      if (wheelLock.current) return;

      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= pageH;
      wheelAccum.current += dy;
      if (Math.abs(wheelAccum.current) < 30) return;

      const dir = wheelAccum.current > 0 ? 1 : -1;
      const target = Math.min(pageCount - 1, Math.max(0, page + dir));
      wheelAccum.current = 0;
      if (target === page) return;

      wheelLock.current = true;
      haptic.select();
      y.stop();
      animate(y, -target * pageH, springs.settling);
      onPageChange(target);
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
      <motion.div style={{ y, willChange: "transform" }}>
        {Array.from({ length: pageCount }).map((_, i) =>
          Math.abs(i - page) <= 1 ? (
            <div key={i}>{renderSlide(i, i === page, { y, pageH, peeking })}</div>
          ) : (
            <div key={i} style={{ height: pageH || "100dvh" }} />
          ),
        )}
      </motion.div>
    </div>
  );
}
