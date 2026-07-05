"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, animate } from "motion/react";
import { PressScale } from "@/components/PressScale";
import { ReelScreen } from "@/components/ReelScreen";
import { BrandPills, BrandMonogram } from "@/components/BrandMark";
import type { Topic } from "@/data/topics";

function TopicCard({
  topic,
  onOpen,
  highlighted,
}: {
  topic: Topic;
  onOpen: () => void;
  highlighted: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [pressed, setPressed] = useState(false);
  // As the card rises into view from the bottom, grow it from clearly smaller
  // to full size — a carousel feel. Cards already in view sit at 1.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 55%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.45, 1]);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const ringOn = pressed || highlighted;

  return (
    <motion.div ref={ref} style={{ scale, opacity, transformOrigin: "50% 100%" }}>
      <PressScale
        onActivate={onOpen}
        onPressChange={setPressed}
        ariaLabel={topic.label}
        className="text-left w-full"
        downScale={0.96}
      >
        <span className="block text-2xl mb-3">{topic.label}</span>
        <span
          className="relative block w-full aspect-[16/8] rounded-[20px] overflow-hidden"
          style={{
            boxShadow: ringOn
              ? "0 0 0 4px rgba(255,255,255,0.55)"
              : "0 0 0 4px rgba(255,255,255,0)",
            transition: "box-shadow 160ms ease-out",
          }}
        >
          <span aria-hidden className={`absolute inset-0 skeleton transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`} />
          <Image
            ref={imgRef}
            src={topic.thumbnail}
            alt=""
            fill
            draggable={false}
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover transition-opacity duration-500"
            style={{
              opacity: loaded ? 1 : 0,
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
              pointerEvents: "none",
            }}
            onLoad={() => setLoaded(true)}
          />
          {topic.comingSoon && (
            <span className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm tracking-wide uppercase">
              Próximamente
            </span>
          )}
        </span>
      </PressScale>
    </motion.div>
  );
}

const OPEN_SPRING = { type: "spring" as const, stiffness: 120, damping: 18, mass: 1 };
const CLOSE_SPRING = { type: "spring" as const, stiffness: 150, damping: 22, mass: 1 };
const CANCEL_SPRING = { type: "spring" as const, stiffness: 210, damping: 26, mass: 1 };
const GROW_DELAY = 0.06;

export function IndexScreen({ topics }: { topics: Topic[] }) {
  const [opening, setOpening] = useState<Topic | null>(null);
  // One value drives the whole open/close: 0 = at the menu (small card), 1 =
  // fully-open reel. Opening springs it 0→1; the back gesture drags it 1→0 and
  // commits on release; the back button taps it to 0. No timed jump.
  const openAmt = useMotionValue(0);
  // Chrome (back button + pills) renders in this fixed layer, OUTSIDE the
  // shrinking card, so it can move independently of the card's scale.
  const [chromeLayer, setChromeLayer] = useState<HTMLDivElement | null>(null);
  const cScale = useTransform(openAmt, [0, 1], [0.55, 1]);
  const cY = useTransform(openAmt, [0, 1], ["52%", "0%"]);
  const cRadius = useTransform(openAmt, [0, 1], [44, 0]);
  const cardOpacity = useTransform(openAmt, [0, 0.12], [0, 1]);
  // Blurred backdrop shows ONLY during the opening grow (to avoid black around
  // the growing card). It's switched off once open, so closing/back-dragging
  // reveals plain black behind the shrinking card — not the blurred gray photo.
  const backdropShow = useMotionValue(0);
  const dimOpacity = useTransform(openAmt, [0, 1], [0.5, 0]);

  // No history.pushState: a same-document history entry is exactly what iOS
  // Safari's edge-swipe-back animates into (the duplicated-reel artifact). We
  // drive open/close entirely with openAmt and our own back-drag instead.
  const open = (topic: Topic) => {
    if (opening) return;
    setOpening(topic);
    openAmt.set(0);
    backdropShow.set(0);
    animate(backdropShow, 1, { duration: 0.12 });
    animate(openAmt, 1, {
      ...OPEN_SPRING,
      delay: GROW_DELAY,
      // once open, drop the blurred backdrop so the close reveals black
      onComplete: () => backdropShow.set(0),
    });
  };

  const commitClose = () => {
    animate(openAmt, 0, {
      ...CLOSE_SPRING,
      onComplete: () => setOpening(null),
    });
  };

  // Live drag from the reel's left edge / back button: progress 0→1 shrinks the
  // reel back toward the menu, tracking the finger.
  const handleBackDrag = (progress: number) => {
    openAmt.stop();
    const p = progress < 0 ? 0 : progress > 1 ? 1 : progress;
    openAmt.set(1 - p);
  };
  const handleBackRelease = (commit: boolean) => {
    if (commit) commitClose();
    else animate(openAmt, 1, CANCEL_SPRING);
  };

  // Warm the browser cache with the full-size reel images so opening a topic is
  // instant on iOS: each topic's cover first, then the rest on idle.
  useEffect(() => {
    const seen = new Set<string>();
    const covers: string[] = [];
    const rest: string[] = [];
    for (const t of topics) {
      t.slides.forEach((s, i) => {
        if (seen.has(s.image)) return;
        seen.add(s.image);
        (i === 0 ? covers : rest).push(s.image);
      });
    }
    const warm = (src: string) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
    };
    covers.forEach(warm);
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 400));
    const handle = idle(() => rest.forEach(warm));
    return () => {
      const cancel = (window as unknown as { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback;
      if (cancel && typeof handle === "number") cancel(handle);
    };
  }, [topics]);

  return (
    <div className="min-h-dvh bg-black">
      <motion.div
        data-app
        className="min-h-dvh mx-auto max-w-[1180px] text-white"
        style={{
          paddingTop: "calc(var(--sat) + 32px)",
          paddingBottom: "calc(var(--sab) + 32px)",
          pointerEvents: opening ? "none" : "auto",
        }}
        // Load fade-in only. While a reel is open the blurred backdrop covers
        // the index; it's revealed again as the reel shrinks back on close.
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div
          className="grid grid-cols-1 gap-x-8 gap-y-9 px-6 md:grid-cols-2 md:gap-y-12 md:px-10"
          style={{ touchAction: "pan-y", overscrollBehaviorY: "contain" }}
        >
          <div className="flex flex-col items-center text-center pt-6 pb-4 md:justify-center md:py-0">
            <div className="flex items-center gap-3">
              <h1 className="text-6xl md:text-7xl font-medium leading-none tracking-tight">
                Histok
              </h1>
              <BrandPills />
            </div>
            <p className="mt-4 text-xl md:text-2xl leading-snug text-white/55">
              Más Historia,
              <br />
              menos Tik Tok
            </p>
          </div>

          {topics.map((topic) => (
            <TopicCard
              key={topic.slug}
              topic={topic}
              highlighted={opening?.slug === topic.slug}
              onOpen={() => open(topic)}
            />
          ))}
        </div>

        {/* Footer sign-off: the "H" monogram + brand pills, centered with roomy
            breathing room below the last card. */}
        <footer className="mt-28 md:mt-36 px-6 pb-6 flex justify-center">
          <BrandMonogram />
        </footer>
      </motion.div>

      {/* The REAL reel, embedded, grows from under as a rounded dimmed card —
          one tree, no route swap mid-transition, so there is nothing to
          flicker. The URL is updated with history.pushState once it settles;
          deep links still use the /tema/[slug] route with its own entrance. */}
      {opening && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          {/* Full-screen blurred backdrop of the cover photo, so the area around
              the growing/shrinking card is its own image, never black. Fades in
              fast at the start of the grow, out at the end of the close. */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${opening.slides[0].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(30px) brightness(0.65)",
              transform: "scale(1.2)",
              opacity: backdropShow,
            }}
          />
          {/* The card: every transform derives from openAmt, so opening springs
              it up, the back-drag tracks the finger, and closing springs it back
              — one continuous value, never a jump. */}
          <motion.div
            className="absolute inset-0 overflow-hidden bg-black"
            style={{
              transformOrigin: "50% 100%",
              willChange: "transform",
              scale: cScale,
              y: cY,
              borderRadius: cRadius,
              opacity: cardOpacity,
            }}
          >
            <ReelScreen
              topic={opening}
              embedded
              onClose={commitClose}
              onBackDrag={handleBackDrag}
              onBackRelease={handleBackRelease}
              chromeLayer={chromeLayer}
            />
            {/* dim that lifts as the card grows (and returns as it shrinks) */}
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-black pointer-events-none"
              style={{ opacity: dimOpacity }}
            />
          </motion.div>
          {/* Chrome layer — a sibling of the card, so it is NOT scaled by
              openAmt. The reel portals its back button + pills in here so they
              move in screen space (follow the finger, enter from borders). */}
          <div ref={setChromeLayer} className="absolute inset-0 z-[61] pointer-events-none" />
        </div>
      )}
    </div>
  );
}
