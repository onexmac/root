"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { PressScale } from "@/components/PressScale";
import { ReelScreen } from "@/components/ReelScreen";
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
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover transition-opacity duration-500"
            style={{ opacity: loaded ? 1 : 0 }}
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

function BrandPills() {
  return (
    <div className="flex flex-col gap-[5px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: i === 0 ? 18 : 10,
            borderRadius: 4,
            background: i === 0 ? "#fff" : "rgba(255,255,255,0.3)",
          }}
        />
      ))}
    </div>
  );
}

export function IndexScreen({ topics }: { topics: Topic[] }) {
  const [opening, setOpening] = useState<Topic | null>(null);
  const [closing, setClosing] = useState(false);
  const openIdx = opening ? topics.findIndex((t) => t.slug === opening.slug) : -1;
  const fading = opening !== null && !closing;

  // Cascade (pos: -1 = brand/title, 0..n-1 = cards; tapped card never fades):
  // the elements BELOW the tap pop out first, nearest→down, one per STEP. Then
  // the whole TOP fades TOGETHER — the title and every card above the tap at
  // once. Each fade is long enough to read as a fade, not a glitch.
  const FADE = 0.13; // duration of one element's fade
  const STEP = 0.09; // gap between the bottom pops
  const belowCount = openIdx >= 0 ? topics.length - 1 - openIdx : 0;
  const topDelay = belowCount * STEP; // when the top group (incl title) goes
  // the photo push starts just as the fades finish (regardless of tap position)
  const growDelay = topDelay + FADE * 0.7;

  const openDelay = (pos: number) => {
    if (openIdx < 0) return 0;
    if (pos !== -1 && pos > openIdx) return (pos - openIdx - 1) * STEP; // below
    return topDelay; // brand + everything above the tap, together
  };
  const elementDelay = (pos: number) =>
    closing ? topDelay - openDelay(pos) : openDelay(pos);

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="grid grid-cols-1 gap-x-8 gap-y-9 px-6 md:grid-cols-2 md:gap-y-12 md:px-10"
          style={{ touchAction: "pan-y", overscrollBehaviorY: "contain" }}
        >
          {/* Brand is the farthest "top" element — first of the top cascade */}
          <motion.div
            className="flex flex-col items-center text-center pt-6 pb-4 md:justify-center md:py-0"
            animate={{ opacity: fading ? 0 : 1 }}
            transition={{ duration: FADE, ease: "easeOut", delay: elementDelay(-1) }}
          >
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
          </motion.div>

          {/* Non-selected cards fade per the tap-relative cascade; the pressed
              one keeps its ring and stays lit until the photo covers it */}
          {topics.map((topic, i) => (
            <motion.div
              key={topic.slug}
              animate={{
                opacity: fading && i !== openIdx ? 0 : 1,
              }}
              transition={{ duration: FADE, ease: "easeOut", delay: i === openIdx ? 0 : elementDelay(i) }}
            >
              <TopicCard
                topic={topic}
                highlighted={opening?.slug === topic.slug}
                onOpen={() => {
                  if (!opening) setOpening(topic);
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* The REAL reel, embedded, grows from under as a rounded dimmed card —
          one tree, no route swap mid-transition, so there is nothing to
          flicker. The URL is updated with history.pushState once it settles;
          deep links still use the /tema/[slug] route with its own entrance. */}
      {opening && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-hidden bg-black"
          style={{ transformOrigin: "50% 100%", willChange: "transform" }}
          // Starts SMALL and mostly OFF-SCREEN below (scale 0.42, y 52%), then
          // rises AND grows to full at once — scale is a real 0.42->1 grow, so it
          // reads as "grow while moving up", not a plain translate. Springy (low
          // damping) for acceleration + overshoot; starts almost immediately so
          // you see it grow WHILE the cards tap-tap fade.
          initial={{ y: "52%", scale: 0.42, opacity: 0, borderRadius: 44 }}
          animate={
            closing
              ? { y: "52%", scale: 0.42, opacity: 0, borderRadius: 44 }
              : { y: "0%", scale: 1, opacity: 1, borderRadius: 0 }
          }
          transition={
            closing
              ? {
                  default: { type: "spring", stiffness: 150, damping: 22, mass: 1 },
                  opacity: { duration: 0.2, delay: 0.16 },
                }
              : {
                  // grow starts as the fades finish (growDelay adapts to how many
                  // elements are below the tap); spring accelerates but barely
                  // overshoots (ratio ~0.82)
                  default: { type: "spring", stiffness: 120, damping: 18, mass: 1, delay: growDelay },
                  opacity: { duration: 0.1, delay: growDelay - 0.02 },
                }
          }
          onAnimationComplete={() => {
            try {
              if (closing) {
                window.history.pushState(null, "", "/");
              } else {
                window.history.pushState(null, "", `/tema/${opening.slug}`);
              }
            } catch {}
            if (closing) {
              setOpening(null);
              setClosing(false);
            }
          }}
        >
          <ReelScreen topic={opening} embedded onClose={() => setClosing(true)} />
          {/* dim that lifts as the card grows (and returns on the way back) */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black pointer-events-none"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: closing ? 0.5 : 0 }}
            transition={{ duration: 0.5, delay: closing ? 0 : 0.08 }}
          />
        </motion.div>
      )}
    </div>
  );
}
