"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { PressScale } from "@/components/PressScale";
import { springs } from "@/lib/springs";
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
  const router = useRouter();
  const [opening, setOpening] = useState<Topic | null>(null);

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
          {/* Brand fades first when a topic opens */}
          <motion.div
            className="flex flex-col items-center text-center pt-6 pb-4 md:justify-center md:py-0"
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.2 }}
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

          {/* Non-selected cards fade out; the pressed one keeps its ring and
              stays lit until the growing photo covers it */}
          {topics.map((topic, i) => (
            <motion.div
              key={topic.slug}
              animate={{
                opacity: opening && opening.slug !== topic.slug ? 0 : 1,
              }}
              transition={{ duration: 0.22, delay: opening ? i * 0.04 : 0 }}
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

      {/* The topic's cover grows from under as a rounded, dimmed card with its
          chrome (back button + pills) already in place. When it settles
          full-bleed, we navigate — the reel mounts matching this exact frame. */}
      {opening && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <motion.div
            className="absolute inset-0 overflow-hidden bg-black"
            style={{ transformOrigin: "50% 100%", willChange: "transform" }}
            initial={{ y: "60%", scale: 0.92, opacity: 0, borderRadius: 40 }}
            animate={{ y: "0%", scale: 1, opacity: 1, borderRadius: 0 }}
            transition={{ default: springs.settling, opacity: { duration: 0.28 } }}
            onAnimationComplete={() => {
              try {
                sessionStorage.setItem("histok-seamless", "1");
              } catch {}
              router.push(`/tema/${opening.slug}`);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={opening.slides[0].image}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.7 }}
            />
            <div
              className="absolute left-4 bottom-[calc(var(--sab)_+_16px)] md:bottom-auto md:top-[calc(var(--sat)_+_16px)] flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: "var(--accent)" }}
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
            </div>
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col"
              style={{ gap: 6 }}
            >
              {opening.slides.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: 8,
                    height: 26,
                    borderRadius: 4,
                    background: i === 0 ? "#fff" : "rgba(255,255,255,0.28)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
