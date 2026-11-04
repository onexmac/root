"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "motion/react";
import { CaretRight, Check } from "@phosphor-icons/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { SHAKE_KEYFRAMES, SHAKE_TRANSITION } from "@/lib/use-shake";

/**
 * SolicitarSlider — the footer's confirm control, with the two-state
 * "arming" morph from the mobile SlideArm (adelante-design-system/react/
 * SlideArm + SlideToConfirm):
 *
 *   DISARMED (no obra assigned yet — U08/U09)
 *     A 52×52 white square-ish button with a green ring and a chevron.
 *     Tapping it advances the flow (`onAdvance`).
 *
 *   ARMED (obra assigned — U10)
 *     The button GROWS leftward into the full slider: the black track is
 *     revealed behind it and the knob turns green. Now it drags.
 *
 * The knob is the SAME DOM node across both states (its background and ring
 * animate) so the morph reads as one element growing — not a crossfade.
 * Width is anchored trailing (`margin-left:auto`), so it grows to the left
 * exactly like SlideArm.
 *
 * Drag mechanics (SlideToConfirm parity):
 *   • Knob width GROWS with the drag (width = knobSize + x), never translates
 *   • Label fades as the knob crosses it        (useTransform, no re-renders)
 *   • Rubber-band past the end                 (0.2× overshoot)
 *   • Tap (< 4 px)                             → bouncy nudge hint
 *   • Below threshold                          → springs.snappy shrink-back
 *   • Commit                                   → springs.completing slam
 */

const TAP_OFFSET_PX = 4;
const NUDGE_DISTANCE_PX = 32;
const NUDGE_HOLD_MS = 180;

// Concrete colors — motion cannot interpolate CSS var() colors (it stalls the
// whole keyframe batch). Literals only for anything animated.
const KNOB_GREEN = "#ADD010";
const KNOB_WHITE = "#ffffff";
const RING_GREEN = "0 0 0 1.5px #ADD010";
const RING_NONE = "0 0 0 1.5px rgba(173,208,16,0)";

export function SolicitarSlider({
  label = "Solicitar",
  armed,
  threshold = 0.72,
  height = 52,
  knobSize = 56,
  knobRadius = 20,
  successHoldMs = 800,
  expandedWidth = 275,
  onAdvance,
  onBlocked,
  onCommitStart,
  onConfirm,
}: {
  label?: string;
  /** false → collapsed chevron button; true → full slide-to-confirm. */
  armed: boolean;
  threshold?: number;
  height?: number;
  knobSize?: number;
  /** Squircle radius — the knob is NOT a circle. */
  knobRadius?: number;
  successHoldMs?: number;
  expandedWidth?: number;
  /** Tap while collapsed — advance the flow (add materials / assign obra). */
  onAdvance?: () => void;
  /**
   * Tapped while still blocked. The slider shakes itself; the parent uses this
   * to shake whatever is actually missing, so the refusal points at the fix.
   */
  onBlocked?: () => void;
  onCommitStart?: () => void;
  onConfirm: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const startX = useRef(0);
  const lastTick = useRef(0);
  // Alarm shake for taps while still disarmed — the control refuses instead
  // of advancing the flow.
  //
  // AnimationControls, not `animate(motionValue, …)`: a MotionValue in `style`
  // never rendered a transform here (it stayed `none`), and a keyframe array
  // in the `animate` prop won't re-fire when the target is unchanged. Controls
  // are the one API built to REPLAY an animation on demand.
  const shakeControls = useAnimationControls();

  const refuse = () => {
    // Shake FIRST, haptic second — the visual is what the user perceives, so
    // nothing optional may run ahead of it.
    shakeControls.start({ x: SHAKE_KEYFRAMES }, SHAKE_TRANSITION);
    // Tell the parent to shake the missing step too.
    onBlocked?.();
    haptic.error();
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () =>
      setMaxDrag(Math.max(0, el.getBoundingClientRect().width - knobSize));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [knobSize, armed]);

  // Disarming mid-drag must not leave the knob stretched.
  useEffect(() => {
    if (!armed) {
      animate(x, 0, springs.snappy);
      lastTick.current = 0;
    }
  }, [armed, x]);

  // The knob STRETCHES: anchored left, width grows with the drag.
  const knobWidth = useTransform(x, (v) => knobSize + v);
  const labelOpacity = useTransform(x, (v) =>
    maxDrag <= 0 ? 1 : Math.max(0, 1 - (v / maxDrag) * 1.6),
  );

  const rubberBand = (raw: number) => {
    if (raw < 0) return raw * 0.25;
    if (raw > maxDrag) return maxDrag + (raw - maxDrag) * 0.2;
    return raw;
  };

  const tickHaptic = (p: number) => {
    const stage = Math.floor(p * 4);
    if (stage !== lastTick.current && stage > 0 && stage < 4) {
      haptic.drag();
      lastTick.current = stage;
    }
  };

  const nudge = () => {
    haptic.select();
    animate(x, NUDGE_DISTANCE_PX, springs.popping);
    window.setTimeout(() => animate(x, 0, springs.settling), NUDGE_HOLD_MS);
  };

  const commit = () => {
    haptic.complete();
    animate(x, maxDrag, springs.completing);
    setConfirmed(true);
    onCommitStart?.();
    window.setTimeout(() => {
      onConfirm();
      animate(x, 0, springs.settling);
      setConfirmed(false);
      lastTick.current = 0;
    }, successHoldMs);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!armed || confirmed) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    startX.current = e.clientX - x.get();
    setDragging(true);
    haptic.select();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!armed || !dragging || confirmed) return;
    const banded = rubberBand(e.clientX - startX.current);
    x.set(banded);
    tickHaptic(Math.max(0, Math.min(1, banded / Math.max(1, maxDrag))));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    if (confirmed) return;
    const v = x.get();
    if (Math.abs(v) < TAP_OFFSET_PX) {
      nudge();
      return;
    }
    if (v / Math.max(1, maxDrag) >= threshold) commit();
    else {
      haptic.drag();
      animate(x, 0, springs.snappy);
      lastTick.current = 0;
    }
  };

  return (
    // Container morphs 52 → 275 px, anchored trailing so it grows leftward.
    // overflow-hidden clips the track while it's still emerging.
    <motion.div
      ref={containerRef}
      initial={false}
      animate={{ width: armed ? expandedWidth : knobSize }}
      transition={armed ? springs.expanding : springs.shrinking}
      // NO overflow-hidden: it clipped the knob mid-slide (the drag scale of
      // 1.04, its shadow, and the rubber-band overshoot past maxDrag all
      // spill past the box). The track doesn't need clipping anyway — it's
      // `inset-x-0`, so it is always exactly as wide as this container and
      // shrinks with it during the collapse.
      className="relative ml-auto select-none"
      style={{ height: knobSize, touchAction: "none" }}
    >
      {/* Black track — revealed as the container grows. */}
      <motion.div
        initial={false}
        animate={{ opacity: armed ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        className="absolute inset-x-0 flex items-center justify-center rounded-[24px] bg-black"
        style={{ height, top: (knobSize - height) / 2 }}
      >
        <motion.span
          className="text-[16px] font-medium text-white"
          style={{ opacity: labelOpacity }}
        >
          {label}
        </motion.span>
      </motion.div>

      {/* Shake wrapper — the alarm lives on its OWN element. Putting `x` in
          the knob's style alongside its `animate` (which owns `scale`) meant
          motion rebuilt the transform from the animate target and dropped the
          shake: transform stayed `none`. Separate element, separate transform,
          no contention. */}
      <motion.div
        className="absolute left-0 top-0"
        animate={shakeControls}
        transition={{ duration: 0.42, ease: "easeInOut" }}
      >
      {/* Knob — the SAME node in both states: white+ring chevron button when
          disarmed, green stretching knob when armed. */}
      <motion.div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="button"
        aria-label={armed ? label : "Continuar"}
        tabIndex={0}
        onClick={() => {
          // Disarmed = not ready to solicit. Refuse with an alarm shake
          // rather than advancing the flow: the pedido needs an assigned
          // obra first, and silently jumping ahead hid that requirement.
          if (!armed) refuse();
        }}
        onKeyDown={(e) => {
          if (!armed && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            refuse();
          }
        }}
        initial={false}
        animate={{
          backgroundColor: armed ? KNOB_GREEN : KNOB_WHITE,
          boxShadow: armed ? RING_NONE : RING_GREEN,
          scale: dragging ? 1.04 : 1,
        }}
        transition={{
          backgroundColor: { duration: 0.22 },
          boxShadow: { duration: 0.22 },
          scale: springs.snappy,
        }}
        className="flex items-center justify-center text-black"
        style={{
          width: armed ? knobWidth : knobSize,
          height: knobSize,
          borderRadius: knobRadius,
          cursor: armed ? (dragging ? "grabbing" : "grab") : "pointer",
        }}
      >
        <motion.span
          initial={false}
          animate={{ opacity: confirmed ? 0 : 1, scale: confirmed ? 0.6 : 1 }}
          transition={springs.snappy}
          className="absolute flex"
        >
          <CaretRight size={20} weight="bold" />
        </motion.span>
        <motion.span
          initial={false}
          animate={{ opacity: confirmed ? 1 : 0, scale: confirmed ? 1 : 0.6 }}
          transition={springs.completing}
          className="absolute flex"
        >
          <Check size={24} weight="bold" />
        </motion.span>
      </motion.div>
      </motion.div>
    </motion.div>
  );
}
