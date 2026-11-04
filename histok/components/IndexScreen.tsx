"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
  type MotionValue,
} from "motion/react";
import { PressScale } from "@/components/PressScale";
import { ReelScreen } from "@/components/ReelScreen";
import { BrandPills, BrandMonogram } from "@/components/BrandMark";
import { haptic } from "@/lib/haptic";
import { springs, cascadeOut } from "@/lib/springs";
import type { Topic, Materia } from "@/data/topics";

/** True on wide screens, where the app becomes a three-pane workspace instead
 *  of a stack of pushed screens. Starts false so the server render and the
 *  phone agree; the effect promotes it on desktop. */
function useThreePane() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1100px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return wide;
}

function TopicCard({
  topic,
  onOpen,
  highlighted,
  scrollContainer,
  cascadeIndex,
}: {
  topic: Topic;
  onOpen: () => void;
  highlighted: boolean;
  /** The scrollable ancestor the scroll-rise should track (the materia
   *  drill-in scrolls its own container, not the window). */
  scrollContainer?: RefObject<HTMLElement | null>;
  /** Position in the cascade — cards arrive one after another, not all at
   *  once. Omit to skip the cascade entirely. */
  cascadeIndex?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [pressed, setPressed] = useState(false);
  // As the card rises into view from the bottom, grow it from clearly smaller
  // to full size — a carousel feel. Cards already in view sit at 1.
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer,
    offset: ["start end", "start 55%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.45, 1]);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const ringOn = pressed || highlighted;

  const card = (
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

  if (cascadeIndex === undefined) return card;

  // Cascade in: the tapped band separates and starts travelling FIRST, then the
  // cards fall in one after another — each arriving at the same reduced size the
  // scroll-rise uses, then growing into place. Separate wrapper so these animate
  // props never fight the scroll-driven MotionValues in `style` above.
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: CASCADE_SCALE }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, transition: cascadeOut }}
      transition={{
        ...springs.popping,
        delay: CASCADE_LEAD + cascadeIndex * CASCADE_STAGGER,
      }}
      style={{ transformOrigin: "50% 100%" }}
    >
      {card}
    </motion.div>
  );
}

// The colored materia band on the index. While its materia is open this one is
// hidden and TravellingBand stands in for it. Both are driven by the SAME
// `activeMateria` state, so they hand off in a single React commit — there is
// never a frame with two bands on screen.
function MateriaBand({
  materia,
  hidden,
  onOpen,
}: {
  materia: Materia;
  hidden: boolean;
  onOpen: (rect: DOMRect) => void;
}) {
  // The travelling band starts from wherever this one sits, so that rect has to
  // be the LAYOUT box. Measuring the button itself returns its *transformed*
  // box: `whileTap` has already scaled it to BAND_PRESS by the time the click
  // fires, which reported the origin ~7px inward and left the trip ending on a
  // small correction. This wrapper is never transformed.
  const box = useRef<HTMLDivElement>(null);
  return (
    <div ref={box}>
    <motion.button
      type="button"
      onClick={() => {
        const r = box.current?.getBoundingClientRect();
        if (r) onOpen(r);
      }}
      style={{
        background: materia.accent,
        borderRadius: BAND_RADIUS,
        opacity: hidden ? 0 : 1,
        WebkitTapHighlightColor: "transparent",
        WebkitTouchCallout: "none",
      }}
      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left select-none"
      whileTap={{ scale: BAND_PRESS, transition: springs.snappy }}
    >
      <span className="text-3xl md:text-4xl font-medium tracking-tight leading-none">
        {materia.label}
      </span>
      <span aria-hidden className="text-white/80">
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <path
            d="M7 4l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.button>
    </div>
  );
}

// Back-swipe: drag rightward and release past the threshold. Hand-rolled (not
// motion's `drag`) so it can axis-lock against the vertical scroll AND be shared
// by the two separate layers that must both accept it — the topics panel and
// the floating band.
function useBackSwipe(
  onBackDrag: (progress: number) => void,
  onBackRelease: (commit: boolean) => void,
) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const axis = useRef<"none" | "x" | "y">("none");
  const vel = useRef({ x: 0, t: 0, last: 0 });
  // A swipe that began on a topic card would otherwise still fire that card's
  // click on release (and open its reel). Swallow the click after a drag.
  const swiped = useRef(false);

  const progressFor = (dx: number) => {
    const w = window.innerWidth || 400;
    // Rubber band: grips the finger, resisting harder the further you pull.
    return Math.min(1, (w * (1 - Math.exp((-dx * 1.3) / w))) / w);
  };

  return {
    onClickCapture: (e: React.MouseEvent<HTMLElement>) => {
      if (!swiped.current) return;
      swiped.current = false;
      e.preventDefault();
      e.stopPropagation();
    },
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      start.current = { x: e.clientX, y: e.clientY };
      axis.current = "none";
      swiped.current = false;
      vel.current = { x: 0, t: performance.now(), last: e.clientX };
    },
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      const s = start.current;
      if (!s) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (axis.current === "none") {
        if (Math.abs(dx) < AXIS_LOCK && Math.abs(dy) < AXIS_LOCK) return;
        // Claim the gesture only when it is clearly horizontal AND rightward;
        // anything else belongs to the native vertical scroll.
        if (Math.abs(dx) > Math.abs(dy) && dx > 0) {
          axis.current = "x";
          swiped.current = true;
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {}
          haptic.select();
        } else {
          axis.current = "y";
          return;
        }
      }
      if (axis.current !== "x") return;
      const now = performance.now();
      const dt = now - vel.current.t;
      if (dt > 0) vel.current.x = ((e.clientX - vel.current.last) / dt) * 1000;
      vel.current.t = now;
      vel.current.last = e.clientX;
      onBackDrag(progressFor(dx));
    },
    onPointerUp: (e: React.PointerEvent<HTMLElement>) => {
      const wasX = axis.current === "x";
      const s = start.current;
      start.current = null;
      axis.current = "none";
      if (!wasX || !s) return;
      const p = progressFor(e.clientX - s.x);
      onBackRelease(p > BACK_COMMIT || (p > 0.1 && vel.current.x > 520));
    },
    onPointerCancel: () => {
      const wasX = axis.current === "x";
      start.current = null;
      axis.current = "none";
      if (wasX) onBackRelease(false);
    },
  };
}

// The ONE band that travels between the list and the footer. It lives outside
// the section's <AnimatePresence> on purpose: the section stays mounted a beat
// longer while its cards animate out, and if the band lived in there it would
// linger on top of the menu band that had already reappeared — two bands, one
// of them stuck. Out here it swaps with the list band in a single commit.
//
// On the drop beat it SPLITS: the left end pinches into an accent circle (the
// back button) and the rest becomes a black pill with a hairline white stroke.
// At rest the two are stacked into one flat band that is pixel-identical to the
// menu band, so the hand-off still has nothing to snap.
function TravellingBand({
  materia,
  navAmt,
  originRect,
  onBack,
  onBackDrag,
  onBackRelease,
}: {
  materia: Materia;
  navAmt: MotionValue<number>;
  /** Where the tapped band sat in the list, in screen coords, at tap time. */
  originRect: DOMRect | null;
  onBack: () => void;
  onBackDrag: (progress: number) => void;
  onBackRelease: (commit: boolean) => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const swipe = useBackSwipe(onBackDrag, onBackRelease);

  // Measured once the band is in place: where it starts (relative to its resting
  // spot) and the geometry the split needs.
  const [geo, setGeo] = useState({ fromX: 0, fromY: 0, fromW: 0, w: 0, h: 0, centre: 0 });

  const x = useTransform(navAmt, [0, BAND_TURN], [geo.fromX, 0]);
  const y = useTransform(navAmt, [BAND_TURN, 1], [geo.fromY, 0]);
  // On desktop the list bands sit in a 3-column grid, so the band also has to
  // grow into the full-width footer. Width rides the sideways beat, with x.
  const width = useTransform(navAmt, [0, BAND_TURN], [geo.fromW, geo.w]);

  useLayoutEffect(() => {
    const el = boxRef.current;
    const lbl = labelRef.current;
    const parent = el?.parentElement;
    if (!el || !lbl || !parent) return;
    // Measure the PARENT's content box, never the band itself: the parent is
    // never transformed or resized, so this stays correct even when the user
    // re-enters mid-flight and the band is carrying a transform.
    const pr = parent.getBoundingClientRect();
    const cs = getComputedStyle(parent);
    const padL = parseFloat(cs.paddingLeft);
    const restW = pr.width - padL - parseFloat(cs.paddingRight);
    const restLeft = pr.left + padL;
    const restTop = pr.top + parseFloat(cs.paddingTop);
    const h = el.getBoundingClientRect().height;
    const pillInner = restW - (h + BAND_GAP);
    setGeo({
      // The split geometry is measured unconditionally — only the starting
      // offset depends on having an origin to travel from.
      fromX: originRect ? originRect.left - restLeft : 0,
      fromY: originRect ? originRect.top - restTop : 0,
      fromW: originRect ? originRect.width : restW,
      w: restW,
      h,
      // How far the label travels to sit centred in the pill at the end.
      centre: Math.max(0, (pillInner - lbl.getBoundingClientRect().width) / 2 - 24),
    });
  }, [originRect, materia.slug]);

  // ONE eased value drives the whole split, in both directions. The raw drop
  // segment is smoothstepped so the shape change starts and ends gently: a
  // spring spends its slow tail at the FAR end, which meant the split got the
  // lazy tail on the way in but the high-velocity phase on the way back, and
  // read as "demasiado rápido de vuelta". Easing both ends evens that out.
  const split = useTransform(navAmt, (v) => {
    const t = (v - BAND_TURN) / (1 - BAND_TURN);
    if (t <= 0) return 0;
    // Smoothstep, but NOT clamped at the top: past 1 it passes the driving
    // spring's overshoot straight through, so the drop springs past its landing
    // and settles. (An easeOutBack here looked springy but reached 1 at only
    // 46% of the segment and merely wobbled after — it front-loaded the whole
    // split and squeezed the liquid neck back into a few frames.)
    if (t >= 1) return t;
    return t * t * (3 - 2 * t);
  });
  const UNIT: [number, number] = [0, 1];

  // The droplet. It does NOT shrink out of the band — it is always sitting at
  // the band's left end, hidden under the pill because they share a colour, and
  // it is the PILL that retreats to let it out. (Shrinking a 257px-wide disc
  // down to 70px ate 95% of the travel and left the liquid neck alive for about
  // three frames, which is why the split could not be seen at all.) On the way
  // out it also swells past the band and sinks below it, like a drop of liquid
  // pulling free.
  const dropSize = useTransform(split, UNIT, [geo.h, geo.h * DROP_GROW], NO_CLAMP);
  const dropLeft = useTransform(split, UNIT, [0, 0]);
  const dropTop = useTransform(split, UNIT, [0, -geo.h * (DROP_GROW - 1) * 0.3], NO_CLAMP);
  const discRadius = useTransform(split, UNIT, [BAND_RADIUS, (geo.h * DROP_GROW) / 2]);
  // The pill retreats late and slowly, so the neck between them stretches for a
  // real stretch of the animation instead of snapping in a couple of frames.
  // Clamped BELOW (its ramp starts at 0.25, so an unclamped map would
  // extrapolate negative and shift the resting band left), open ABOVE so the
  // spring's overshoot still comes through.
  const pillLeft = useTransform(split, (t) => {
    const u = Math.max(0, (t - 0.25) / 0.75);
    return u * (geo.h * DROP_GROW + BAND_GAP);
  });
  const labelX = useTransform(split, [0.25, 1], [0, geo.centre]);

  // The black does not cross-fade — it WIPES IN FROM THE RIGHT, so the accent
  // survives longest at the circle end. A soft-edged gradient whose boundary
  // sweeps right to left across the pill.
  // The black must NOT arrive while the two shapes are still merged: a black
  // pill sitting on a gold drop reads as two stacked objects, not as liquid.
  // It only starts once the neck is thinning, and squares off so most of the
  // blackening happens AFTER they have parted.
  const pillWash = useTransform(split, (t) => {
    const w = Math.max(0, Math.min(1, (t - WASH_START) / (1 - WASH_START)));
    const edge = 115 - w * w * 160;
    return `linear-gradient(90deg, ${materia.accent} ${edge}%, #000000 ${edge + 45}%)`;
  });

  // Stroke and lift arrive LATE — only once the liquid neck has snapped, so a
  // crisp outline never floats over a still-merged blob.
  const late = useTransform(split, (t) =>
    Math.max(0, Math.min(1, (t - STROKE_START) / (1 - STROKE_START))),
  );
  const pillShadow = useTransform(late, (l) =>
    `inset 0 0 0 ${BAND_STROKE}px rgba(255,255,255,${l}), ` +
    `0 ${14 * l}px ${34 * l}px rgba(0,0,0,${0.62 * l})`,
  );
  const discShadow = useTransform(
    late,
    (l) => `0 ${14 * l}px ${34 * l}px rgba(0,0,0,${0.62 * l})`,
  );
  const backOpacity = useTransform(split, [0, 0.9], [0, 1]);
  const fwdOpacity = useTransform(navAmt, [0, 0.3], [1, 0]);

  // The gooey filter only runs mid-flight. At either end it is off, so the
  // resting band stays crisp and pixel-identical to the menu band — a blur that
  // never fully resolves would soften its corners and give the hand-off away.
  const [goo, setGoo] = useState(false);
  useEffect(() => {
    const set = (v: number) => {
      const on = v > 0.03 && v < 0.97;
      setGoo((prev) => (prev === on ? prev : on));
    };
    set(navAmt.get());
    return navAmt.on("change", set);
  }, [navAmt]);

  return (
    <div
      // Same horizontal inset as the list bands, so the resting box matches
      // theirs exactly and the travel is a straight drop.
      className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[1180px] px-6 md:px-10 pt-3 pointer-events-none"
      style={{ paddingBottom: "calc(var(--sab) + 12px)" }}
    >
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <filter id="band-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b" />
            <feColorMatrix
              in="b"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -13"
            />
          </filter>
        </defs>
      </svg>

      {/* One transform for the whole trip; the split happens inside it. The
          gesture lives here so a swipe on either piece reaches it. */}
      <motion.div
        ref={boxRef}
        className="relative w-full pointer-events-none"
        style={{ x, y, width: geo.w ? width : "100%", touchAction: "pan-y" }}
        {...swipe}
      >
        {/* Sizer: never painted, it just gives the box the exact height of a
            list band so everything else can be absolutely positioned over it. */}
        <span
          aria-hidden
          className="invisible block px-6 py-5 text-3xl md:text-4xl font-medium tracking-tight leading-none"
        >
          {materia.label}
        </span>

        {/* SHAPES — the only filtered layer, so the goo never touches the text.
            While it is on, the circle peels off the band through a liquid neck
            instead of two rectangles sliding apart. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ filter: goo ? "url(#band-goo)" : "none" }}
        >
          <motion.div
            className="absolute"
            style={{
              left: dropLeft,
              top: dropTop,
              width: dropSize,
              height: dropSize,
              borderRadius: discRadius,
              backgroundColor: materia.accent,
            }}
          />
          <motion.div
            className="absolute inset-y-0 right-0"
            style={{ left: pillLeft, borderRadius: BAND_RADIUS, background: pillWash }}
          />
        </div>

        {/* CONTROLS — unfiltered: crisp text, arrows, stroke and lift. */}
        <motion.button
          type="button"
          onClick={onBack}
          aria-label="Volver a materias"
          style={{
            left: dropLeft,
            top: dropTop,
            width: dropSize,
            height: dropSize,
            borderRadius: discRadius,
            boxShadow: discShadow,
            WebkitTapHighlightColor: "transparent",
          }}
          className="pointer-events-auto absolute grid place-items-center"
        >
          <motion.span aria-hidden className="text-white" style={{ opacity: backOpacity }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.button>

        <motion.button
          type="button"
          onClick={onBack}
          aria-label={`${materia.label}: volver a materias`}
          style={{
            left: pillLeft,
            borderRadius: BAND_RADIUS,
            boxShadow: pillShadow,
            WebkitTapHighlightColor: "transparent",
          }}
          className="pointer-events-auto absolute inset-y-0 right-0 flex items-center px-6 text-left select-none"
        >
          <motion.span
            ref={labelRef}
            className="text-3xl md:text-4xl font-medium tracking-tight leading-none"
            style={{ x: labelX }}
          >
            {materia.label}
          </motion.span>
          <motion.span
            aria-hidden
            className="ml-auto shrink-0 text-white/80"
            style={{ opacity: fwdOpacity }}
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}

// The full-screen materia view you drill INTO. It rides the SAME `navAmt` value
// as the index, so the two push each other like one filmstrip (never overlap).
// The floating band is NOT in here — see TravellingBand.
function MateriaScreen({
  materia,
  navAmt,
  onBackDrag,
  onBackRelease,
  onOpenTopic,
  openingSlug,
}: {
  materia: Materia;
  /** 0 = at the materia list, 1 = fully drilled in. */
  navAmt: MotionValue<number>;
  onBackDrag: (progress: number) => void;
  onBackRelease: (commit: boolean) => void;
  onOpenTopic: (topic: Topic) => void;
  openingSlug?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const empty = materia.comingSoon || materia.topics.length === 0;
  const swipe = useBackSwipe(onBackDrag, onBackRelease);

  // The panel is pushed in from the right, growing the last little bit.
  const panelX = useTransform(navAmt, [SLIDE_START, PUSH_END], ["100%", "0%"]);
  const panelScale = useTransform(navAmt, [SLIDE_START, PUSH_END], [PUSH_SHRINK, 1]);
  // The topics themselves fade and shrink a little on the drop beat — which runs
  // FIRST on the way back, so leaving starts with the content receding.
  const contentOpacity = useTransform(navAmt, [BAND_TURN, 1], [CONTENT_FADE, 1]);
  const contentScale = useTransform(navAmt, [BAND_TURN, 1], [CONTENT_SHRINK, 1]);

  return (
    // pointer-events-none on the root: while the section is sliding away it must
    // not keep swallowing taps meant for the list underneath. The panel itself
    // re-enables them, so gestures still work whenever it is actually on screen.
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none"
      style={{ touchAction: "pan-y" }}
      {...swipe}
    >
      {/* Topics — pushed IN from the right as the index is pushed OUT to the
          left by the same value, so content displaces content. */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-auto"
        style={{ x: panelX, scale: panelScale, transformOrigin: "0% 50%" }}
      >
        <motion.div
          className="h-full"
          style={{
            opacity: contentOpacity,
            scale: contentScale,
            transformOrigin: "50% 50%",
          }}
        >
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto px-6 md:px-10"
          style={{
            paddingTop: "calc(var(--sat) + 32px)",
            // Room for the floating band — the last card can still clear it.
            paddingBottom: "calc(var(--sab) + 144px)",
            overscrollBehaviorY: "contain",
            touchAction: "pan-y",
          }}
        >
          {empty ? (
            <p className="pt-24 text-center text-white/35 text-lg">Próximamente</p>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-9 md:grid-cols-2 md:gap-y-12">
              {materia.topics.map((topic, i) => (
                <TopicCard
                  key={topic.slug}
                  topic={topic}
                  highlighted={openingSlug === topic.slug}
                  onOpen={() => onOpenTopic(topic)}
                  scrollContainer={scrollRef}
                  cascadeIndex={i}
                />
              ))}
            </div>
          )}

          {/* Same sign-off as the index, so a section ends the way the app does. */}
          <footer className="mt-24 md:mt-28 flex justify-center">
            <BrandMonogram />
          </footer>
        </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// --- Materia push navigation -------------------------------------------------
// The list and the section are two frames of one filmstrip: as the section is
// pushed in from the right, the index is pushed out to the left by the SAME
// value, so content displaces content instead of a sheet covering it.
// How far the index travels out. 100% = a true push (nothing overlaps).
const INDEX_PUSH = "-100%";
// Whichever frame is leaving/arriving is a touch smaller — it shrinks away and
// grows back into place rather than sliding flat.
const PUSH_SHRINK = 0.92;
// Pixels of movement before the back-swipe commits to an axis.
const AXIS_LOCK = 10;
// Fraction of the pull that commits the back on release.
const BACK_COMMIT = 0.34;
// Press feedback on a materia band: it springs down under the finger, then
// detaches from the list and travels to become the section's footer.
const BAND_PRESS = 0.955;
const BAND_RADIUS = 28;
// Width of the white outline the band wears once it is the section footer.
const BAND_STROKE = 1;
// Space that opens between the back circle and the label pill as they split.
const BAND_GAP = 34;
// How much the droplet swells past the band height as it pulls free.
const DROP_GROW = 1.1;
// Let the geometry follow the driving spring past its landing instead of
// clipping it — that overshoot IS the springiness of the split.
const NO_CLAMP = { clamp: false } as const;
// Where the black starts washing in, and where the outline does — both AFTER
// the drop has pulled clear, so the merged phase stays one solid colour.
const WASH_START = 0.6;
const STROKE_START = 0.85;
// Where the band's travel turns the corner: sideways before this, straight down
// after. Two beats, never a diagonal.
const BAND_TURN = 0.35;
// The sideways slide runs PAST the band's turn so the two beats overlap by
// half the band's vertical travel: by the time the band is at mid-height, the
// content is already sliding sideways. (Band travel is [BAND_TURN, 1], whose
// midpoint is 0.725.) A hard hand-off between beats read as content moving late.
const PUSH_END = 0.68;
// The slide is HOME by here instead of at 0. Reversed, the band lands at
// BAND_TURN (0.35) and the slide used to keep running all the way to 0, so the
// footer sat docked while the rest of the interface was still arriving. Both
// now finish within a hair of each other, and the spring's remaining tail moves
// nothing. On the way in it just means the slide starts a beat later, which
// keeps the "slide first, then the drop" order intact.
const SLIDE_START = 0.2;
// Navigation springs. Same natural frequency both ways, so leaving mirrors
// arriving — but the return is critically damped (damping 21 ≈ 2·√110) so it
// cannot overshoot PAST the menu. An underdamped return dips below 0, and since
// the band's transforms clamp there, it visibly froze at the end of the trip.
// Deliberately bouncier than the house `settling` (ζ≈0.68 vs 0.85) and a touch
// slower: the split reads springier because navAmt itself overshoots and the
// un-clamped geometry rides it.
const NAV_IN = { type: "spring" as const, stiffness: 100, damping: 13.6, mass: 1 };
// Critically damped (15 ≈ 2·√56) and deliberately gentler than NAV_IN: the
// return replays the split from a standing start, so it needs the extra room.
const NAV_OUT = { type: "spring" as const, stiffness: 40, damping: 12.6, mass: 1 };
// The cascade holds until the band has separated, turned and started dropping —
// order matters: band first, content second.
const CASCADE_LEAD = 0.26;
const CASCADE_STAGGER = 0.05;
// Cards arrive at the scroll-rise size and grow in, so entering a section reads
// like the same motion as scrolling one into view.
const CASCADE_SCALE = 0.84;
// How far the topics recede while the section is leaving (and arriving).
const CONTENT_FADE = 0.25;
const CONTENT_SHRINK = 0.94;

const OPEN_SPRING = { type: "spring" as const, stiffness: 120, damping: 18, mass: 1 };
const CLOSE_SPRING = { type: "spring" as const, stiffness: 150, damping: 22, mass: 1 };
const CANCEL_SPRING = { type: "spring" as const, stiffness: 210, damping: 26, mass: 1 };
const GROW_DELAY = 0.06;
// Asymptote for the first-slide pull-down: the card approaches this much travel
// no matter how far you drag, so it resists (grips) rather than tracking 1:1.
const PULL_MAX = 400;

export function IndexScreen({ materias }: { materias: Materia[] }) {
  const [opening, setOpening] = useState<Topic | null>(null);
  // Which materia you've drilled INTO (Clear-style). null = the materia list.
  const [activeMateria, setActiveMateria] = useState<Materia | null>(null);
  // ONE value drives the whole materia navigation: 0 = the list, 1 = drilled in.
  // Opening springs it 0→1, the back-swipe drags it 1→0 and commits on release,
  // tapping the footer taps it to 0. Reversible and interruptible — no timed
  // jumps, so a drag can hand off to a spring mid-flight.
  const navAmt = useMotionValue(0);
  // Where the tapped band sat when it was tapped — the travelling band in the
  // section starts from here.
  const [bandOrigin, setBandOrigin] = useState<DOMRect | null>(null);
  const threePane = useThreePane();
  // Reveal the menu band while the travelling band is still sitting exactly on
  // top of it, THEN drop the travelling band. Doing both in one commit makes the
  // reveal race motion's paint; overlapping them cannot flash or jump, because
  // the two are pixel-identical at rest.
  const [handedOff, setHandedOff] = useState(false);
  const indexX = useTransform(navAmt, [SLIDE_START, PUSH_END], ["0%", INDEX_PUSH]);
  // One value drives the whole open/close: 0 = at the menu (small card), 1 =
  // fully-open reel. Opening springs it 0→1; the back gesture drags it 1→0 and
  // commits on release; the back button taps it to 0. No timed jump.
  const openAmt = useMotionValue(0);
  // Chrome (back button + pills) renders in this fixed layer, OUTSIDE the
  // shrinking card, so it can move independently of the card's scale.
  const [chromeLayer, setChromeLayer] = useState<HTMLDivElement | null>(null);
  const cScale = useTransform(openAmt, [0, 1], [0.55, 1]);
  const cY = useTransform(openAmt, [0, 1], ["52%", "0%"]);
  const cardOpacity = useTransform(openAmt, [0, 0.12], [0, 1]);
  // First-slide drag-down: the card translates DOWN following the finger (with a
  // little lag) instead of shrinking. openAmt stays 1 during this.
  const pullDownY = useMotionValue(0);
  const endMode = useRef<"pulldown" | "liftup">("liftup");
  // Corner radius from EITHER the shrink close (openAmt) or the pull-down drag.
  const cardRadius = useTransform(() =>
    Math.max((1 - openAmt.get()) * 44, Math.min(pullDownY.get() / 90, 1) * 40),
  );
  // Solid BLACK behind the card for the whole transition — never a blurred
  // photo. Covers the menu mid-transition, fades near the menu (its fade-in),
  // and ALSO fades as the card is pulled down (revealing the menu behind it).
  const backdropOpacity = useTransform(() => {
    const o = openAmt.get();
    const base = o <= 0 ? 0 : o < 0.16 ? o / 0.16 : 1;
    return base * (1 - Math.min(pullDownY.get() / 420, 1));
  });
  const dimOpacity = useTransform(openAmt, [0, 1], [0.5, 0]);
  // Elastic shrink layered on top of the native scroll bounce at the top/bottom
  // (the native bounce provides the momentum; this adds the rubbery squish).
  const bounceScale = useMotionValue(1);
  const bounceOrigin = useMotionValue("50% 50%");
  // One scale channel, two contributors: the overscroll rubber-band and the
  // shrink-away as the list is pushed out by a materia.
  const indexScale = useTransform(
    () =>
      bounceScale.get() *
      (1 -
        (1 - PUSH_SHRINK) *
          Math.max(
            0,
            Math.min(1, (navAmt.get() - SLIDE_START) / (PUSH_END - SLIDE_START)),
          )),
  );

  // No history.pushState: a same-document history entry is exactly what iOS
  // Safari's edge-swipe-back animates into (the duplicated-reel artifact). We
  // drive open/close entirely with openAmt and our own back-drag instead.
  const open = (topic: Topic) => {
    if (opening) return;
    setOpening(topic);
    openAmt.set(0);
    animate(openAmt, 1, { ...OPEN_SPRING, delay: GROW_DELAY });
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

  // Vertical end-of-reel pull. First slide pulled DOWN (os > 0): the card
  // translates down following the finger (a little behind it). Last slide pulled
  // UP (os < 0): the card shrinks toward the menu.
  const handleEndPull = (os: number) => {
    if (os > 0) {
      // FIRST slide pulled down → card follows the finger down, with tension
      // (resists, so it grips the finger rather than slipping away).
      endMode.current = "pulldown";
      pullDownY.set(PULL_MAX * (1 - Math.exp((-os * 0.6) / PULL_MAX)));
    } else {
      // LAST slide pulled up → the pager shrinks the photo upward + reveals the
      // H footer; the card itself stays open until you commit.
      endMode.current = "liftup";
    }
  };
  const handleEndRelease = (commit: boolean) => {
    if (endMode.current === "pulldown") {
      if (commit) {
        // fling the card the rest of the way down; the menu is already showing
        animate(pullDownY, window.innerHeight * 1.1, {
          ...CLOSE_SPRING,
          onComplete: () => {
            setOpening(null);
            pullDownY.set(0);
          },
        });
      } else {
        animate(pullDownY, 0, CANCEL_SPRING);
      }
    } else if (commit) {
      // liftup committed → shrink the card back to the menu. (Not committed:
      // the pager springs its own upward-resize back, nothing to do here.)
      commitClose();
    }
  };

  // Rubbery shrink at the very top/bottom of the menu. We DON'T preventDefault,
  // so the native iOS elastic scroll (momentum + inertia) still runs — this just
  // adds a subtle scale toward whichever edge you're pushing against.
  useEffect(() => {
    if (opening || activeMateria) return;
    let pinnedY: number | null = null;
    let edge: "top" | "bottom" = "top";
    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const onMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const cy = e.touches[0].clientY;
      const sy = window.scrollY;
      const atTop = sy <= 0;
      const atBottom = sy >= maxScroll() - 1;
      if (atTop || atBottom) {
        if (pinnedY === null) {
          pinnedY = cy;
          edge = atTop ? "top" : "bottom";
        }
        const delta = cy - pinnedY;
        const overshoot = edge === "top" ? Math.max(0, delta) : Math.max(0, -delta);
        bounceOrigin.set(edge === "top" ? "50% 0%" : "50% 100%");
        bounceScale.set(1 - (Math.min(overshoot, 300) / 300) * 0.05);
      } else if (pinnedY !== null) {
        pinnedY = null;
        bounceScale.set(1);
      }
    };
    const onEnd = () => {
      pinnedY = null;
      animate(bounceScale, 1, CANCEL_SPRING);
    };
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("touchcancel", onEnd);
    return () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, [opening, activeMateria, bounceScale, bounceOrigin]);

  // Warm the browser cache with the full-size reel images so opening a topic is
  // instant on iOS: each topic's cover first, then the rest on idle.
  useEffect(() => {
    const seen = new Set<string>();
    const covers: string[] = [];
    const rest: string[] = [];
    for (const m of materias) {
      for (const t of m.topics) {
        t.slides.forEach((s, i) => {
          if (seen.has(s.image)) return;
          seen.add(s.image);
          (i === 0 ? covers : rest).push(s.image);
        });
      }
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
  }, [materias]);

  // --- Materia navigation: open, close, and the interactive back-swipe --------
  // Never refuses a tap. Re-entering the SAME materia mid-exit just reverses
  // from wherever the value is — no reset, no jump. Switching to a different
  // one restarts from the list, which is roughly where you already are.
  const openMateria = (m: Materia, rect: DOMRect) => {
    haptic.select();
    const reentry = activeMateria?.slug === m.slug;
    navAmt.stop();
    if (!reentry) {
      setBandOrigin(rect);
      navAmt.set(0);
    }
    setHandedOff(false);
    setActiveMateria(m);
    animate(navAmt, 1, NAV_IN);
  };
  // EVERY way out funnels through here, so they all play the same animation.
  const closeMateria = () => {
    haptic.select();
    navAmt.stop();
    animate(navAmt, 0, {
      ...NAV_OUT,
      // A spring's default rest tolerance (restDelta 0.01) hands off while the
      // menu is still ~8px short of home — the band swaps onto a target that
      // has not arrived, which reads as a snap. Land tight, then pin to exactly
      // 0 in the same tick as the swap.
      restDelta: 0.0002,
      restSpeed: 0.002,
      onComplete: () => {
        navAmt.set(0);
        // 1) menu band appears underneath the travelling band (no visible change)
        setHandedOff(true);
        // 2) a frame later the travelling band leaves, with the menu band
        //    already painted in place beneath it.
        requestAnimationFrame(() => {
          setActiveMateria(null);
          setHandedOff(false);
        });
      },
    });
  };
  const handleMateriaDrag = (progress: number) => {
    navAmt.stop();
    navAmt.set(1 - (progress < 0 ? 0 : progress > 1 ? 1 : progress));
  };
  const handleMateriaRelease = (commit: boolean) => {
    if (commit) closeMateria();
    else animate(navAmt, 1, springs.snappy);
  };

  // The REAL reel, shared by BOTH layouts: it grows from under as a rounded
  // dimmed card in one tree — no route swap mid-transition, so there is nothing
  // to flicker. On desktop the detail is full screen too, exactly like the
  // phone. Deep links still use the /tema/[slug] route with its own entrance.
  const reelOverlay = opening && (
      <div className="fixed inset-0 z-[60] overflow-hidden">
        {/* Solid BLACK behind the growing/shrinking card — never a blurred
            photo. Covers the menu mid-transition, fades near the menu so the
            index shows through again. */}
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-black"
          style={{ opacity: backdropOpacity }}
        />
        {/* Pull-down wrapper: the first-slide drag-down translates the whole
            card down with the finger (pullDownY), separate from the openAmt
            scale used by every other close. */}
        <motion.div className="absolute inset-0" style={{ y: pullDownY }}>
          {/* The card: scale/y/radius derive from openAmt (grow/shrink), plus
              the pull-down corner radius. */}
          <motion.div
            className="absolute inset-0 overflow-hidden bg-black"
            style={{
              transformOrigin: "50% 100%",
              willChange: "transform",
              scale: cScale,
              y: cY,
              borderRadius: cardRadius,
              opacity: cardOpacity,
            }}
          >
            <ReelScreen
              topic={opening}
              embedded
              onClose={commitClose}
              onBackDrag={handleBackDrag}
              onBackRelease={handleBackRelease}
              onEndPull={handleEndPull}
              onEndRelease={handleEndRelease}
              chromeLayer={chromeLayer}
            />
            {/* dim that lifts as the card grows (and returns as it shrinks) */}
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-black pointer-events-none"
              style={{ opacity: dimOpacity }}
            />
          </motion.div>
        </motion.div>
        {/* Chrome layer — a sibling of the card, so it is NOT scaled by
            openAmt. The reel portals its back button + pills in here so they
            move in screen space (follow the finger, enter from borders). */}
        <div ref={setChromeLayer} className="absolute inset-0 z-[61] pointer-events-none" />
      </div>
  );

  // --- Desktop: a three-pane workspace ---------------------------------------
  // Wide screens have room for the whole hierarchy at once, so nothing gets
  // pushed anywhere: materias on the left, the chosen materia's topics in the
  // middle, the chosen topic's reel on the right. The phone keeps the pushed
  // navigation below.
  if (threePane) {
    return (
      <>
      <div className="h-dvh overflow-hidden bg-black text-white grid grid-cols-[minmax(300px,1fr)_minmax(0,2fr)]">
        {/* 1 — materias */}
        <aside className="h-full overflow-y-auto border-r border-white/10 px-6 py-8 flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-5xl font-medium leading-none tracking-tight">Histok</h1>
            <BrandPills />
          </div>
          <p className="mt-3 text-lg leading-snug text-white/55">
            Más Historia, menos Tik Tok
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {materias.map((m) => {
              const active = activeMateria?.slug === m.slug;
              return (
                <motion.button
                  key={m.slug}
                  type="button"
                  onClick={() => {
                    haptic.select();
                    setActiveMateria(m);
                    setOpening(null);
                  }}
                  style={{
                    background: m.accent,
                    borderRadius: BAND_RADIUS,
                    opacity: active ? 1 : 0.55,
                    WebkitTapHighlightColor: "transparent",
                  }}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left select-none"
                  whileHover={{ opacity: 1 }}
                  whileTap={{ scale: BAND_PRESS, transition: springs.snappy }}
                >
                  <span className="text-2xl font-medium tracking-tight leading-none">
                    {m.label}
                  </span>
                  <span aria-hidden className="text-white/80">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7 4l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </motion.button>
              );
            })}
          </div>
          <footer className="mt-auto pt-10 flex justify-center">
            <BrandMonogram />
          </footer>
        </aside>

        {/* 2 — the materia's topics */}
        {/* 2 + 3 — the materia view spans the remaining two columns */}
        <section className="h-full overflow-y-auto px-10 py-8">
          {!activeMateria ? (
            <p className="pt-24 text-center text-white/35 text-lg">Escogé una materia</p>
          ) : activeMateria.comingSoon || activeMateria.topics.length === 0 ? (
            <p className="pt-24 text-center text-white/35 text-lg">Próximamente</p>
          ) : (
            <div key={activeMateria.slug} className="grid grid-cols-2 gap-x-8 gap-y-10">
              {activeMateria.topics.map((topic, i) => (
                <TopicCard
                  key={topic.slug}
                  topic={topic}
                  highlighted={opening?.slug === topic.slug}
                  onOpen={() => open(topic)}
                  cascadeIndex={i}
                />
              ))}
            </div>
          )}
        </section>
      </div>
      {/* Selecting a topic goes FULL SCREEN, same as the phone. */}
      {reelOverlay}
      </>
    );
  }

  return (
    <div className="min-h-dvh bg-black">
      <motion.div
        data-app
        className="min-h-dvh mx-auto max-w-[1180px] text-white"
        style={{
          paddingTop: "calc(var(--sat) + 32px)",
          paddingBottom: "calc(var(--sab) + 32px)",
          pointerEvents: opening ? "none" : "auto",
          // Pushed OUT to the left by exactly what the section is pushed IN
          // from the right — the two are one filmstrip, they never overlap.
          x: indexX,
          // Rubbery overscroll shrink at the top/bottom, plus the push-shrink.
          scale: indexScale,
          transformOrigin: bounceOrigin,
        }}
      >
        <div
          className="px-6 md:px-10"
          style={{ touchAction: "pan-y", overscrollBehaviorY: "contain" }}
        >
          <div className="flex flex-col items-center text-center pt-6 pb-9 md:pt-2 md:pb-10">
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

          {/* Materias — Clear-style bands. Tap one to drill INTO it. */}
          <div className="flex flex-col gap-3">
            {materias.map((m) => (
              <MateriaBand
                key={m.slug}
                materia={m}
                hidden={activeMateria?.slug === m.slug && !handedOff}
                onOpen={(rect) => openMateria(m, rect)}
              />
            ))}
          </div>
        </div>

        {/* Footer sign-off: the "H" monogram + brand pills, centered with roomy
            breathing room below the last card. */}
        <footer className="mt-28 md:mt-36 px-6 pb-6 flex justify-center">
          <BrandMonogram />
        </footer>
      </motion.div>

      {/* Drill-in: the materia you tapped, expanded to fill the screen. The band
          morphs into the colored header (shared layoutId); the back button in
          that header carries the section's color. */}
      <AnimatePresence>
        {activeMateria && (
          <MateriaScreen
            key={activeMateria.slug}
            materia={activeMateria}
            navAmt={navAmt}
            onBackDrag={handleMateriaDrag}
            onBackRelease={handleMateriaRelease}
            onOpenTopic={open}
            openingSlug={opening?.slug}
          />
        )}
      </AnimatePresence>

      {/* The single travelling band — deliberately OUTSIDE the AnimatePresence
          above, so it appears and disappears in the same commit that hides and
          restores the menu band. Inside, it would outlive the hand-off and sit
          stuck on top of the menu band while the cards animated out. */}
      {activeMateria && (
        <TravellingBand
          materia={activeMateria}
          navAmt={navAmt}
          originRect={bandOrigin}
          onBack={closeMateria}
          onBackDrag={handleMateriaDrag}
          onBackRelease={handleMateriaRelease}
        />
      )}

      {reelOverlay}
    </div>
  );
}
