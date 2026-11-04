"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform, useMotionValue, useMotionValueEvent, animate } from "motion/react";
import { springs, cascadeOut } from "@/lib/springs";
import type { Slide as SlideData, BodyPart } from "@/data/topics";
import type { SlideContext } from "@/components/ReelPager";

type Status = "idle" | "shown" | "hidden";

const PARALLAX_FACTOR = 0.28;

function bodyLength(body?: BodyPart[]) {
  if (!body) return 0;
  return body.reduce(
    (sum, part) =>
      sum +
      (typeof part === "string"
        ? part.length
        : "term" in part
          ? part.term.length
          : part.name.length),
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
    // reveal almost immediately (one tick, just enough for the rise to play) so
    // the text doesn't lag behind the photo when you move between slides
    const t = setTimeout(() => {
      setStatus("shown");
      setEnteredOnce(true);
    }, 16);
    return () => clearTimeout(t);
  }, [isCurrent, status]);

  const localOffset = useTransform(ctx.y, (latest) => latest + index * ctx.pageH);
  // A diagram is content, not scenery: CSS letterboxes it whole instead of
  // cropping it to cover, and it does not drift with the pager. Note this is
  // deliberately NOT driven by the measured box — that measurement can land
  // late (or never, if the container is still sized 0 mid-transition), and a
  // diagram that falls back to cover comes out cropped.
  const isDiagram = !!slide.diagram;
  const imageY = useTransform(localOffset, (v) => (isDiagram ? 0 : -v * PARALLAX_FACTOR));

  // Peek: ONE image, sized to cover the viewport (overflowing + clipped so it
  // reads as a normal full-bleed cover). On press it shrinks — same element,
  // same pixels — down to the "contain" size so the whole frame is revealed
  // letterboxed, while the desktop backdrop blur eases off. No second copy,
  // no crossfade: the photo you were looking at is the photo that shrinks.
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const natRef = useRef<{ w: number; h: number } | null>(null);
  const [box, setBox] = useState<{ w: number; h: number; r: number } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const remeasure = () => {
      const el = containerRef.current;
      // an already-cached image is complete before onLoad can fire — grab its
      // natural size here so the shrink ratio is known even on a warm load
      const img = imgRef.current;
      if (img && img.complete && img.naturalWidth) {
        natRef.current = { w: img.naturalWidth, h: img.naturalHeight };
        setLoaded(true);
      }
      const nat = natRef.current;
      if (!el || !nat) return;
      const CW = el.clientWidth;
      const CH = el.clientHeight;
      if (!CW || !CH) return;
      const imgA = nat.w / nat.h;
      const contA = CW / CH;
      const coverW = imgA > contA ? CH * imgA : CW;
      const coverH = imgA > contA ? CH : CW / imgA;
      setBox({ w: coverW, h: coverH, r: Math.min(CW / coverW, CH / coverH) });
    };
    remeasure();
    window.addEventListener("resize", remeasure);
    window.visualViewport?.addEventListener("resize", remeasure);
    return () => {
      window.removeEventListener("resize", remeasure);
      window.visualViewport?.removeEventListener("resize", remeasure);
    };
  }, []);

  const peekScale = useTransform(ctx.peeking, [0, 1], [1, isDiagram ? 1 : (box?.r ?? 1)]);
  const peekRadius = useTransform(ctx.peeking, [0, 1], [0, 18]);
  const textFade = useTransform(ctx.peeking, [0, 1], [1, 0]);

  // Photo-info caption. It sits just below the LIVE photo bottom edge, so as the
  // photo grows back on release the edge descends and pushes the caption down
  // with it — the photo never overlaps it. captionAnchor tracks that edge.
  const captionAnchor = useTransform(ctx.peeking, (v) => {
    if (!box) return 0;
    const scale = 1 + v * (box.r - 1); // same value as peekScale, as a number
    return (box.h * scale) / 2 + 18; // px below the vertical center + a small gap
  });
  const capWobble = useMotionValue(14);
  const capOpacity = useMotionValue(0);
  const capY = useTransform(() => captionAnchor.get() + capWobble.get());
  const [infoShown, setInfoShown] = useState(false);
  useMotionValueEvent(ctx.peeking, "change", (v) => setInfoShown(v > 0.55));
  useEffect(() => {
    if (infoShown) {
      // appear: small delay, then fade in while rising a little from below
      capWobble.set(14);
      animate(capOpacity, 1, { duration: 0.28, delay: 0.2, ease: "easeOut" });
      animate(capWobble, 0, { duration: 0.34, delay: 0.2, ease: [0.22, 1, 0.36, 1] });
    } else {
      // release: fade out fast, no delay — the growing photo pushes it down
      animate(capOpacity, 0, { duration: 0.15, ease: "easeOut" });
      animate(capWobble, 0, { duration: 0.15 });
    }
  }, [infoShown, capOpacity, capWobble]);

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
            setLoaded(true);
          }}
          className="shrink-0 max-w-none [--base-blur:0px] md:[--base-blur:6px]"
          style={{
            width: isDiagram || !box ? "100%" : box.w,
            height: isDiagram || !box ? "100%" : box.h,
            objectFit: isDiagram ? "contain" : "cover",
            scale: peekScale,
            y: imageY,
            borderRadius: peekRadius,
            ["--peek" as string]: ctx.peeking,
            filter: "blur(calc(var(--base-blur) * (1 - var(--peek))))",
          }}
        />
        <div
          aria-hidden
          className={`absolute inset-0 skeleton transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
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
          // When the panel actually overflows it scrolls (pan-y). When it does
          // NOT overflow it must be "none", not the default "auto": the panel is
          // its own scroll container (overflow-y-auto), so the pager's
          // touch-action:none ancestor doesn't cover it. "auto" here lets the
          // browser claim a touch as a no-op panel scroll and cancel the pointer
          // stream, so the pager never pages — the reel "refuses to scroll".
          style={{ touchAction: scrollable ? "pan-y" : "none" }}
        >
          <TextBlock status={status} enteredOnce={enteredOnce} delayMs={55}>
            <h2 className="text-4xl md:text-5xl leading-[1.15] font-medium text-white">
              {slide.title}
            </h2>
          </TextBlock>
          {slide.body && (
            <TextBlock status={status} enteredOnce={enteredOnce} delayMs={0}>
              <p className="text-lg md:text-xl leading-relaxed text-white/90">
                {slide.body.map((part, i) =>
                  typeof part === "string" ? (
                    <span key={i}>{part}</span>
                  ) : "name" in part ? (
                    // Personaje histórico: resaltado pero no tocable — no tiene
                    // definición de glosario, solo hay que reconocer el nombre.
                    <strong key={i} className="font-semibold text-white">
                      {part.name}
                    </strong>
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

      {/* Photo-info caption — sits just below the live photo edge, so the photo
          pushes it down as it grows back on release. Fades/rises in on a small
          delay; fades out fast. */}
      {slide.info && (
        <motion.div
          className="absolute inset-x-0 top-1/2 z-10 flex justify-center px-6 pointer-events-none"
          style={{ y: capY, opacity: capOpacity }}
        >
          <p className="max-w-[560px] text-center text-[15px] md:text-base leading-snug text-white/85">
            {slide.info}
          </p>
        </motion.div>
      )}
    </div>
  );
}
