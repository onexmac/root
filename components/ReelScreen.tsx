"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue } from "motion/react";
import { HaloPress } from "@/components/HaloPress";
import { VerticalPills } from "@/components/VerticalPills";
import { ReelPager } from "@/components/ReelPager";
import { Slide } from "@/components/Slide";
import { GlossaryCard } from "@/components/GlossaryCard";
import { springs } from "@/lib/springs";
import type { Topic } from "@/data/topics";

const IDLE_MS = 2000;

export function ReelScreen({ topic }: { topic: Topic }) {
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

  const goHome = () => setExiting(true);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <motion.div
        className="absolute inset-x-0 bottom-0 overflow-hidden"
        initial={{ height: "58%", borderRadius: 32 }}
        animate={
          exiting ? { height: "58%", borderRadius: 32 } : { height: "100%", borderRadius: 0 }
        }
        transition={exiting ? springs.snappy : springs.expanding}
        onAnimationComplete={() => {
          if (exiting) router.push("/");
        }}
      >
        <div data-app className="absolute inset-x-0 bottom-0" style={{ height: "100dvh" }}>
          <ReelPager
            pageCount={topic.slides.length}
            page={page}
            onPageChange={setPage}
            disabled={activeTerm !== null}
            onActivity={bumpActivity}
            onExit={goHome}
            y={y}
            onMeasure={setPageH}
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

          <div
            className="absolute z-30"
            style={{
              top: "calc(var(--sat) + 16px)",
              left: 16,
              opacity: chromeVisible ? 1 : 0,
              transition: "opacity 220ms ease-out",
              pointerEvents: chromeVisible ? "auto" : "none",
            }}
          >
            <HaloPress
              onActivate={goHome}
              radius={24}
              haloColor="var(--accent-deep)"
              ariaLabel="Volver"
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
