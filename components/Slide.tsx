"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "motion/react";
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

  // Peek: ONE image, sized to cover the viewport (overflowing + clipped so it
  // reads as a normal full-bleed cover). On press it shrinks — same element,
  // same pixels — down to the "contain" size so the whole frame is revealed
  // letterboxed, while the desktop backdrop blur eases off. No second copy,
  // no crossfade: the photo you were looking at is the photo that shrinks.
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const natRef = useRef<{ w: number; h: number } | null>(null);
  const [box, setBox] = useState<{ w: number; h: number; r: number } | null>(null);

  useEffect(() => {
    const remeasure = () => {
      const el = containerRef.current;
      // an already-cached image is complete before onLoad can fire — grab its
      // natural size here so the shrink ratio is known even on a warm load
      const img = imgRef.current;
      if (img && img.complete && img.naturalWidth) {
        natRef.current = { w: img.naturalWidth, h: img.naturalHeight };
      }
      const nat = natRef.current;
      if (!el || !nat) return;
      const CW = el.clientWidth;
      const CH = el.clientHeight;
      if (!CW || !CH) return;
      const imgA = nat.w / nat.h;
      const contA = CW / CH;
      let coverW: number;
      let coverH: number;
      if (imgA > contA) {
        coverH = CH;
        coverW = CH * imgA;
      } else {
        coverW = CW;
        coverH = CW / imgA;
      }
      const r = Math.min(CW / coverW, CH / coverH);
      setBox({ w: coverW, h: coverH, r });
    };
    remeasure();
    window.addEventListener("resize", remeasure);
    window.visualViewport?.addEventListener("resize", remeasure);
    return () => {
      window.removeEventListener("resize", remeasure);
      window.visualViewport?.removeEventListener("resize", remeasure);
    };
  }, []);

  const peekScale = useTransform(ctx.peeking, [0, 1], [1, box?.r ?? 1]);
  const peekRadius = useTransform(ctx.peeking, [0, 1], [0, 18]);
  const textFade = useTransform(ctx.peeking, [0, 1], [1, 0]);

  // A slide can hold more text than fits: the text panel then scrolls on its
  // own (independent of paging) and the photo darkens as you read down. For
  // short text it never overflows, so this is a no-op and paging is unaffected.
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const [scrollDarken, setScrollDarken] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      const over = el.scrollHeight - el.clientHeight > 24;
      setScrollable(over);
      if (!over) setScrollDarken(0);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrollDarken(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100dvh", contain: "layout paint" }}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.img
          ref={imgRef}
          src={slide.image}
          alt=""
          draggable={false}
          loading={isCurrent ? "eager" : "lazy"}
          onLoad={(e) => {
            const img = e.currentTarget;
            natRef.current = { w: img.naturalWidth, h: img.naturalHeight };
            const el = containerRef.current;
            if (!el) return;
            const CW = el.clientWidth;
            const CH = el.clientHeight;
            if (!CW || !CH) return;
            const imgA = img.naturalWidth / img.naturalHeight;
            const contA = CW / CH;
            const coverW = imgA > contA ? CH * imgA : CW;
            const coverH = imgA > contA ? CH : CW / imgA;
            setBox({ w: coverW, h: coverH, r: Math.min(CW / coverW, CH / coverH) });
          }}
          className="shrink-0 max-w-none [--base-blur:0px] md:[--base-blur:6px]"
          style={{
            width: box ? box.w : "100%",
            height: box ? box.h : "100%",
            objectFit: "cover",
            scale: peekScale,
            y: imageY,
            borderRadius: peekRadius,
            ["--peek" as string]: ctx.peeking,
            filter: "blur(calc(var(--base-blur) * (1 - var(--peek))))",
          }}
        />
      </div>

      {/* Text + gradient — fades out during peek */}
      <motion.div className="absolute inset-0" style={{ opacity: textFade }}>
        <div aria-hidden className="absolute inset-0" style={{ background: overlayGradient(slide) }} />
        <div aria-hidden className="absolute inset-0 hidden md:block bg-black/35" />
        <div
          aria-hidden
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: scrollDarken * 0.5, transition: "opacity 120ms linear" }}
        />
        <div
          ref={scrollRef}
          onScroll={onScroll}
          onPointerDown={scrollable ? (e) => e.stopPropagation() : undefined}
          className="absolute inset-x-0 bottom-0 px-6 pb-28 flex flex-col gap-4 max-h-[80dvh] overflow-y-auto overscroll-contain md:inset-0 md:max-h-none md:overflow-visible md:justify-center md:items-start md:px-16 md:pb-0 md:max-w-[660px]"
          style={{ touchAction: scrollable ? "pan-y" : undefined }}
        >
          <TextBlock status={status} enteredOnce={enteredOnce} delayMs={140}>
            <h2 className="text-4xl md:text-5xl leading-[1.15] font-medium text-white">
              {slide.title}
            </h2>
          </TextBlock>
          {slide.body && (
            <TextBlock status={status} enteredOnce={enteredOnce} delayMs={100}>
              <p className="text-lg md:text-xl leading-relaxed text-white/90">
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
