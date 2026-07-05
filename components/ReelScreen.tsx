"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { VerticalPills } from "@/components/VerticalPills";
import { ReelPager } from "@/components/ReelPager";
import { Slide } from "@/components/Slide";
import { GlossaryCard } from "@/components/GlossaryCard";
import { BrandMonogram } from "@/components/BrandMark";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import type { Topic } from "@/data/topics";

const IDLE_MS = 2000;
const BACK_DISTANCE = 260;
const BACK_THRESHOLD = 0.3;
const BACK_FLICK_VX = 0.45;
const DRAG_SLOP = 6;

export function ReelScreen({
  topic,
  embedded = false,
  onClose,
  onBackDrag,
  onBackRelease,
  onEndPull,
  onEndRelease,
  chromeLayer,
}: {
  topic: Topic;
  /** Rendered inside the index's growing container: no own entrance/exit,
   *  closing is delegated to the parent via onClose. */
  embedded?: boolean;
  onClose?: () => void;
  /** Interactive back gesture (embedded only): live drag progress 0→1 shrinks
   *  the reel toward the menu; release commits or cancels. */
  onBackDrag?: (progress: number) => void;
  onBackRelease?: (commit: boolean) => void;
  /** Vertical end-of-reel pull, raw signed overscroll px: + = first slide pulled
   *  DOWN (drag toward menu), − = last slide pulled UP (shrink toward menu). */
  onEndPull?: (overscroll: number) => void;
  onEndRelease?: (commit: boolean) => void;
  /** Portal target in the index's fixed layer, OUTSIDE the shrinking card, so
   *  chrome can move independently of the card (embedded only). */
  chromeLayer?: HTMLElement | null;
}) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [backPressed, setBackPressed] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const y = useMotionValue(0);
  const [pageH, setPageH] = useState(0);

  // Chrome transforms — the chrome lives OUTSIDE the shrinking card, so these
  // are in screen space: enter from the borders on open; during a back-drag the
  // back button follows the finger (1:1) and the pills slide off to the right.
  const backIn = useMotionValue(embedded ? 0 : 1);
  const pillsIn = useMotionValue(embedded ? 0 : 1);
  const backDragProgress = useMotionValue(0);
  // Closing (any way): the back button follows/flies to the RIGHT and fades out,
  // the pills slide off to their OWN edge — the RIGHT. backDragProgress drives
  // both; it's set live during a drag and animated to 1 on any close (tap,
  // pull-down, edge/button drag) so every close plays the same exit.
  const backX = useTransform(() => (backIn.get() - 1) * 84 + backDragProgress.get() * BACK_DISTANCE);
  const backOpacity = useTransform(backDragProgress, [0, 0.5], [1, 0]);
  const pillsX = useTransform(() => (1 - pillsIn.get()) * 64 + backDragProgress.get() * 240);

  useEffect(() => {
    if (!embedded) return;
    // Come in after the image has grown into place: the back button springs from
    // the left with a little bounce, the pills glide from the right.
    const a = animate(backIn, 1, { type: "spring", stiffness: 520, damping: 17, mass: 1, delay: 0.34 });
    const b = animate(pillsIn, 1, { type: "spring", stiffness: 280, damping: 30, mass: 1, delay: 0.42 });
    return () => {
      a.stop();
      b.stop();
    };
  }, [embedded, backIn, pillsIn]);

  useEffect(() => {
    if (!embedded) return;
    // Suppress iOS Safari's system edge-swipe-back near the left edge so our own
    // back-drag runs there instead of the browser's history animation.
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t && t.clientX < 30) e.preventDefault();
    };
    document.addEventListener("touchstart", onTouchStart, { passive: false });
    return () => document.removeEventListener("touchstart", onTouchStart);
  }, [embedded]);

  const bumpActivity = useCallback(() => {
    setChromeVisible(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setChromeVisible(false), IDLE_MS);
  }, []);

  useEffect(() => {
    idleTimer.current = setTimeout(() => setChromeVisible(false), IDLE_MS);
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // Every close path runs through here: play the chrome exit (back button +
  // pills off to the right, back button fading) AND close the content. Used by a
  // tap, a pull-down on the first slide, and an edge/button drag commit.
  const goHome = useCallback(() => {
    animate(backDragProgress, 1, springs.snappy);
    if (embedded) {
      onClose?.();
      return;
    }
    setExiting(true);
  }, [embedded, onClose, backDragProgress]);

  // Shared back-drag handling for the back button + left-edge strip. A drag
  // tracks the finger and drives onBackDrag; release commits past a threshold /
  // flick; a tap (no movement) just closes.
  const dragStartX = useRef(0);
  const dragActive = useRef(false);
  const dragMoved = useRef(false);
  const dragStartT = useRef(0);
  const dragLastX = useRef(0);
  const dragLastT = useRef(0);

  const onBackDown = (e: React.PointerEvent) => {
    if (!embedded) return;
    dragStartX.current = e.clientX;
    dragActive.current = true;
    dragMoved.current = false;
    dragStartT.current = e.timeStamp;
    dragLastX.current = e.clientX;
    dragLastT.current = e.timeStamp;
    setBackPressed(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    haptic.select();
  };
  const onBackMove = (e: React.PointerEvent) => {
    if (!dragActive.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > DRAG_SLOP) dragMoved.current = true;
    const p = Math.max(0, Math.min(1, dx / BACK_DISTANCE));
    dragLastX.current = e.clientX;
    dragLastT.current = e.timeStamp;
    backDragProgress.set(p);
    onBackDrag?.(p);
  };
  const onBackUp = () => {
    if (!dragActive.current) return;
    dragActive.current = false;
    setBackPressed(false);
    if (!dragMoved.current) {
      goHome(); // tap
      return;
    }
    const dx = dragLastX.current - dragStartX.current;
    const p = Math.max(0, Math.min(1, dx / BACK_DISTANCE));
    const dt = dragLastT.current - dragStartT.current;
    const vx = dt > 0 ? dx / dt : 0;
    const commit = p >= BACK_THRESHOLD || vx > BACK_FLICK_VX;
    if (commit) {
      goHome(); // same exit as a tap/pull-down (chrome flies right, content closes)
    } else {
      animate(backDragProgress, 0, springs.settling); // chrome snaps back
      onBackRelease?.(false); // content springs back open
    }
  };

  // Vertical end-of-reel pull. Forward the raw overscroll to the parent (which
  // decides pull-DOWN vs shrink) and fade/move the chrome out proportionally.
  const pagerEndPull = (os: number) => {
    backDragProgress.set(Math.min(Math.abs(os) / 200, 1));
    onEndPull?.(os);
  };
  const pagerEndRelease = (commit: boolean) => {
    animate(backDragProgress, commit ? 1 : 0, commit ? springs.snappy : springs.settling);
    onEndRelease?.(commit);
  };

  const chrome = (
    <>
      {embedded && (
        <div
          aria-hidden
          onPointerDown={onBackDown}
          onPointerMove={onBackMove}
          onPointerUp={onBackUp}
          onPointerCancel={onBackUp}
          className="absolute left-0 top-0 bottom-0 z-[62]"
          style={{ width: 24, pointerEvents: "auto", touchAction: "none" }}
        />
      )}
      <motion.button
        type="button"
        aria-label="Volver"
        onPointerDown={embedded ? onBackDown : undefined}
        onPointerMove={embedded ? onBackMove : undefined}
        onPointerUp={embedded ? onBackUp : undefined}
        onPointerCancel={embedded ? onBackUp : undefined}
        onClick={embedded ? undefined : goHome}
        className="absolute z-[62] left-4 bottom-[calc(var(--sab)_+_16px)] md:bottom-auto md:top-[calc(var(--sat)_+_16px)] flex items-center justify-center"
        style={{
          x: backX,
          opacity: backOpacity,
          width: 48,
          height: 48,
          borderRadius: 24,
          background: "var(--accent)",
          pointerEvents: "auto",
          touchAction: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 4l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: 32,
            border: "8px solid var(--accent-deep)",
            pointerEvents: "none",
            opacity: backPressed ? 1 : 0,
            transition: backPressed ? "opacity 80ms ease-out" : "opacity 180ms ease-out 120ms",
          }}
        />
      </motion.button>
      <VerticalPills
        count={topic.slides.length}
        page={page}
        y={y}
        pageH={pageH}
        visible={chromeVisible}
        x={pillsX}
      />
    </>
  );

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ transformOrigin: "50% 100%" }}
        // embedded: the parent container animates the grow/shrink — render
        // static at rest. Standalone (deep link): keep the rise entrance.
        initial={embedded ? false : { y: "100%", scale: 0.9, opacity: 0, borderRadius: 44 }}
        animate={
          exiting
            ? { y: "100%", scale: 0.9, opacity: 0, borderRadius: 44 }
            : { y: "0%", scale: 1, opacity: 1, borderRadius: 0 }
        }
        transition={
          exiting
            ? { default: springs.deleting, opacity: { duration: 0.18 } }
            : { default: springs.settling, opacity: { duration: 0.3 } }
        }
        onAnimationComplete={() => {
          if (exiting) router.push("/");
        }}
      >
        <div data-app className="absolute inset-0">
          <ReelPager
            pageCount={topic.slides.length}
            page={page}
            onPageChange={setPage}
            disabled={activeTerm !== null}
            onActivity={bumpActivity}
            onEndPull={pagerEndPull}
            onEndRelease={pagerEndRelease}
            y={y}
            onMeasure={setPageH}
            endSlot={<BrandMonogram />}
            renderSlide={(index, isCurrent, ctx) => (
              <Slide
                slide={topic.slides[index]}
                index={index}
                isCurrent={isCurrent}
                onTermPress={(term) => setActiveTerm(term)}
                ctx={ctx}
              />
            )}
          />

          <GlossaryCard
            term={activeTerm}
            definition={activeTerm ? topic.glossary[activeTerm] ?? "" : ""}
            onClose={() => setActiveTerm(null)}
          />
        </div>
      </motion.div>

      {/* Chrome renders OUTSIDE the shrinking card: portaled into the index's
          fixed layer when embedded, inline for the standalone deep-link. */}
      {embedded ? (chromeLayer ? createPortal(chrome, chromeLayer) : null) : chrome}
    </div>
  );
}
