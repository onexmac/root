"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { HaloPress } from "@/components/HaloPress";
import { VerticalPills } from "@/components/VerticalPills";
import { ReelPager } from "@/components/ReelPager";
import { Slide } from "@/components/Slide";
import { GlossaryCard } from "@/components/GlossaryCard";
import { BrandMonogram } from "@/components/BrandMark";
import { springs } from "@/lib/springs";
import type { Topic } from "@/data/topics";

const IDLE_MS = 2000;

export function ReelScreen({
  topic,
  embedded = false,
  onClose,
  onBackDrag,
  onBackRelease,
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
}) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const y = useMotionValue(0);
  const [pageH, setPageH] = useState(0);

  // Chrome (back button + pills) moves independently of the shrinking card:
  // it enters from its own border on open, and slides out horizontally while
  // you drag back — following the finger, no vertical movement.
  const backIn = useMotionValue(embedded ? 0 : 1);
  const pillsIn = useMotionValue(embedded ? 0 : 1);
  const backDragProgress = useMotionValue(0);
  const backX = useTransform(() => (backIn.get() - 1) * 84 + backDragProgress.get() * 260);
  const pillsX = useTransform(() => (1 - pillsIn.get()) * 64 + backDragProgress.get() * 220);

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

  const edgeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!embedded) return;
    const el = edgeRef.current;
    if (!el) return;
    // Suppress iOS Safari's system edge-swipe-back at the very left edge, so our
    // own back-drag runs there instead of the browser's history navigation.
    const prevent = (e: TouchEvent) => e.preventDefault();
    el.addEventListener("touchstart", prevent, { passive: false });
    el.addEventListener("touchmove", prevent, { passive: false });
    return () => {
      el.removeEventListener("touchstart", prevent);
      el.removeEventListener("touchmove", prevent);
    };
  }, [embedded]);

  const onPagerBackDrag = (p: number) => {
    backDragProgress.set(p);
    onBackDrag?.(p);
  };
  const onPagerBackRelease = (commit: boolean) => {
    if (!commit) animate(backDragProgress, 0, springs.settling);
    onBackRelease?.(commit);
  };

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

  const goHome = () => {
    if (embedded) {
      onClose?.();
      return;
    }
    setExiting(true);
  };

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
            onExit={goHome}
            y={y}
            onMeasure={setPageH}
            endSlot={<BrandMonogram />}
            backEnabled={embedded}
            onBackDrag={onPagerBackDrag}
            onBackRelease={onPagerBackRelease}
            renderSlide={(index, isCurrent, ctx) => (
              <Slide
                slide={topic.slides[index]}
                index={index}
                isCurrent={isCurrent}
                onTermPress={(term) => setActiveTerm(term)}
                ctx={ctx}
              />
            )}
            // Chrome lives INSIDE the pager viewport so a gesture that starts on
            // the back button (bottom-left) or the pills (right edge) bubbles to
            // the pager and scrolls, instead of hitting a dead zone (Bug B).
            overlay={
              <>
                {/* Left-edge catcher: absorbs the iOS system back-swipe (see the
                    touch listeners above) while still bubbling pointer events to
                    the pager so our own back-drag runs. */}
                {embedded && (
                  <div
                    ref={edgeRef}
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 z-40"
                    style={{ width: 24 }}
                  />
                )}
                {/* Back button follows the finger horizontally during a back-drag
                    (backX) and springs in from the left on open. capturePointer
                    =false so a drag begun here reaches the pager. */}
                <motion.div
                  className="absolute z-30 left-4 bottom-[calc(var(--sab)_+_16px)] md:bottom-auto md:top-[calc(var(--sat)_+_16px)]"
                  style={{ x: backX }}
                >
                  <HaloPress
                    onActivate={goHome}
                    radius={24}
                    haloColor="var(--accent-deep)"
                    ariaLabel="Volver"
                    capturePointer={false}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      background: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M12.5 4l-6 6 6 6"
                        stroke="#fff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </HaloPress>
                </motion.div>

                <VerticalPills
                  count={topic.slides.length}
                  page={page}
                  y={y}
                  pageH={pageH}
                  visible={chromeVisible}
                  x={pillsX}
                />
              </>
            }
          />

          <GlossaryCard
            term={activeTerm}
            definition={activeTerm ? topic.glossary[activeTerm] ?? "" : ""}
            onClose={() => setActiveTerm(null)}
          />
        </div>
      </motion.div>
    </div>
  );
}
