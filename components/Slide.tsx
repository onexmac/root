"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "motion/react";
import Image from "next/image";
import { springs, cascadeOut } from "@/lib/springs";
import type { Slide as SlideData, BodyPart } from "@/data/topics";
import type { SlideContext } from "@/components/ReelPager";

type Status = "idle" | "shown" | "hidden";

const PARALLAX_FACTOR = 0.28;

function bodyLength(body?: BodyPart[]) {
  if (!body) return 0;
  return body.reduce(
    (sum, part) => sum + (typeof part === "string" ? part.length : part.term.length),
    0,
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function overlayGradient(slide: SlideData) {
  const chars = bodyLength(slide.body);
  const t = slide.body ? Math.min(1, Math.max(0.35, chars / 280)) : 0;
  const top = lerp(0.15, 0.65, t);
  const mid = lerp(0.15, 0.45, t);
  const bottom = lerp(0.85, 0.92, t);
  return `linear-gradient(180deg, rgba(0,0,0,${top}) 0%, rgba(0,0,0,${mid}) 30%, rgba(0,0,0,${bottom}) 100%)`;
}

function TextBlock({
  children,
  status,
  enteredOnce,
  delayMs,
}: {
  children: React.ReactNode;
  status: Status;
  enteredOnce: boolean;
  delayMs: number;
}) {
  const visible = status === "shown";
  return (
    <motion.div
      initial={false}
      animate={visible ? { y: 0, opacity: 1 } : { y: enteredOnce ? 0 : 16, opacity: enteredOnce ? 0 : 0 }}
      transition={
        visible
          ? enteredOnce
            ? { duration: 0.18 }
            : { ...springs.popping, delay: delayMs / 1000 }
          : cascadeOut
      }
    >
      {children}
    </motion.div>
  );
}

export function Slide({
  slide,
  index,
  isCurrent,
  onTermPress,
  ctx,
}: {
  slide: SlideData;
  index: number;
  isCurrent: boolean;
  onTermPress: (term: string) => void;
  ctx: SlideContext;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [enteredOnce, setEnteredOnce] = useState(false);
  const [prevIsCurrent, setPrevIsCurrent] = useState(isCurrent);

  if (isCurrent !== prevIsCurrent) {
    setPrevIsCurrent(isCurrent);
    if (isCurrent && status !== "idle") {
      setStatus("shown");
    } else if (!isCurrent && status !== "idle") {
      setStatus("hidden");
    }
  }

  useEffect(() => {
    if (!isCurrent || status !== "idle") return;
    const t = setTimeout(() => {
      setStatus("shown");
      setEnteredOnce(true);
    }, 100);
    return () => clearTimeout(t);
  }, [isCurrent, status]);

  const localOffset = useTransform(ctx.y, (latest) => latest + index * ctx.pageH);
  const imageY = useTransform(localOffset, (v) => -v * PARALLAX_FACTOR);
  const peekRadius = useTransform(ctx.peeking, [0, 1], [0, 28]);
  const peekFade = useTransform(ctx.peeking, [0, 1], [1, 0]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [containScale, setContainScale] = useState(0.85);

  useEffect(() => {
    if (!naturalSize) return;
    const compute = () => {
      const el = containerRef.current;
      if (!el) return;
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      if (!cw || !ch) return;
      const cover = Math.max(cw / naturalSize.w, ch / naturalSize.h);
      const contain = Math.min(cw / naturalSize.w, ch / naturalSize.h);
      setContainScale(contain / cover);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [naturalSize]);

  const peekScale = useTransform(ctx.peeking, [0, 1], [1, containScale]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100dvh", contain: "layout paint" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: peekScale, borderRadius: peekRadius, overflow: "hidden" }}
      >
        <Image
          src={slide.image}
          alt=""
          fill
          sizes="100vw"
          priority={isCurrent}
          loading={isCurrent ? "eager" : "lazy"}
          className="object-cover"
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) {
              setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
            }
          }}
        />
      </motion.div>
      <motion.div aria-hidden className="absolute inset-0" style={{ opacity: peekFade }}>
        <div
          className="absolute inset-0"
          style={{ background: overlayGradient(slide) }}
        />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-28 flex flex-col gap-4">
          <TextBlock status={status} enteredOnce={enteredOnce} delayMs={140}>
            <h2 className="text-4xl leading-[1.15] font-medium text-white">
              {slide.title}
            </h2>
          </TextBlock>
          {slide.body && (
            <TextBlock status={status} enteredOnce={enteredOnce} delayMs={100}>
              <p className="text-lg leading-relaxed text-white/90">
                {slide.body.map((part, i) =>
                  typeof part === "string" ? (
                    <span key={i}>{part}</span>
                  ) : (
                    <button
                      key={i}
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTermPress(part.term);
                      }}
                      className="font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      {part.term}
                    </button>
                  ),
                )}
              </p>
            </TextBlock>
          )}
        </div>
      </motion.div>
    </div>
  );
}
