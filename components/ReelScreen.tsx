"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue } from "motion/react";
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
}: {
  topic: Topic;
  /** Rendered inside the index's growing container: no own entrance/exit,
   *  closing is delegated to the parent via onClose. */
  embedded?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const y = useMotionValue(0);
  const [pageH, setPageH] = useState(0);

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
                {/* Back button stays put — it's the only way out, so it must NOT
                    get hidden by the idle-fade (that was the "back button
                    disappears" bug). Only the pills follow chromeVisible.
                    capturePointer=false so a drag begun here reaches the pager. */}
                <div className="absolute z-30 left-4 bottom-[calc(var(--sab)_+_16px)] md:bottom-auto md:top-[calc(var(--sat)_+_16px)]">
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
                </div>

                <VerticalPills
                  count={topic.slides.length}
                  page={page}
                  y={y}
                  pageH={pageH}
                  visible={chromeVisible}
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
