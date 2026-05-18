'use client';

/**
 * SliderButton — slide-to-confirm matching Figma node 997:3096.
 *
 * Layout:
 *   ┌──────┬──────────────────────────────┐
 *   │ ▶ │  │           Pedir              │
 *   └──────┴──────────────────────────────┘
 *      80px            162px (varies)
 *      └── square green knob with chevron
 *                       └── black track with "Pedir" centered
 *
 * Same hot-path discipline as SlideToConfirm — transform-only, clip-path
 * track, useTransform for derived visuals. See docs/GPU_TRANSFORMS.md.
 */

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { haptic } from '@/lib/haptic';
import { springs } from '@/lib/springs';

const KNOB_SIZE = 80;
const HEIGHT = 80;
const CORNER = 20;
const THRESHOLD = 0.72;

const NUDGE_DIST = 32;
const NUDGE_HOLD_MS = 180;
const NUDGE_KICK = { type: 'spring', stiffness: 800, damping: 15 } as const;
const NUDGE_RETURN = { type: 'spring', stiffness: 320, damping: 24 } as const;

export interface SliderButtonProps {
  label?: string;
  onConfirm: () => void;
  /** Total slider width. Defaults to 282 (Figma frame's 242 + 40 breathing room for halo). */
  width?: number;
  successHoldMs?: number;
}

export function SliderButton({
  label = 'Pedir',
  onConfirm,
  width = 282,
  successHoldMs = 1200,
}: SliderButtonProps) {
  const maxDrag = Math.max(0, width - KNOB_SIZE);

  const x = useMotionValue(0);
  const knobScale = useMotionValue(1);

  const [isConfirmed, setConfirmed] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isDragging = useRef(false);
  const lastTick = useRef(0);
  const nudgeTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (nudgeTimer.current != null) window.clearTimeout(nudgeTimer.current);
  }, []);

  // Black track: visible from pill.x to right edge. Round corners preserved.
  const trackClip = useTransform(x, (v) => `inset(0 0 0 ${v}px round ${CORNER}px)`);

  // The label fades as the knob crosses it, so the user gets a clear
  // "this thing is being acted on" signal during the drag.
  const labelOpacity = useTransform(x, (v) => {
    if (maxDrag <= 0) return 1;
    return Math.max(0, 1 - (v / maxDrag) * 1.6);
  });

  useMotionValueEvent(x, 'change', (latest) => {
    if (isConfirmed || !isDragging.current || maxDrag <= 0) return;
    const p = Math.max(0, Math.min(1, latest / maxDrag));
    const tick = Math.floor(p * 4);
    if (tick !== lastTick.current && tick > 0 && tick < 4) {
      haptic.drag();
      lastTick.current = tick;
    }
  });

  const nudge = () => {
    haptic.select();
    if (nudgeTimer.current != null) window.clearTimeout(nudgeTimer.current);
    animate(x, NUDGE_DIST, NUDGE_KICK);
    animate(knobScale, 1.04, NUDGE_KICK);
    nudgeTimer.current = window.setTimeout(() => {
      nudgeTimer.current = null;
      animate(x, 0, NUDGE_RETURN);
      animate(knobScale, 1, NUDGE_RETURN);
    }, NUDGE_HOLD_MS);
  };

  const commit = () => {
    haptic.complete();
    animate(x, maxDrag, springs.completing);
    setConfirmed(true);
    onConfirm();
    window.setTimeout(() => {
      animate(x, 0, springs.settling);
      setConfirmed(false);
      lastTick.current = 0;
    }, successHoldMs);
  };

  return (
    <div
      className="relative"
      style={{ width, height: HEIGHT, pointerEvents: 'none' }}
    >
      {/* Black track */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black"
        style={{
          clipPath: trackClip,
          borderRadius: CORNER,
          willChange: 'clip-path',
          transform: 'translateZ(0)',
        }}
      />

      {/* "Pedir" label — centered in the track area to the right of the knob */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          paddingLeft: KNOB_SIZE,
          opacity: labelOpacity,
        }}
      >
        <span className="select-none text-white text-[20px] font-medium tracking-wide">
          {label}
        </span>
      </motion.div>

      {/* Green knob — square with right-chevron (or check on success) */}
      <motion.div
        className="draggable-x absolute left-0 top-0 flex items-center justify-center"
        drag={!isConfirmed ? 'x' : false}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={{ left: 0.2, right: 0.15 }}
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
        style={{
          x,
          scale: knobScale,
          width: KNOB_SIZE,
          height: KNOB_SIZE,
          backgroundColor: '#ADD010',
          borderRadius: CORNER,
          willChange: 'transform',
          translateZ: 0,
          pointerEvents: 'auto',
        }}
        onPointerDown={() => {
          if (!isConfirmed) {
            haptic.select();
            setPressed(true);
          }
        }}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
        onTap={() => {
          if (!isConfirmed) nudge();
        }}
        onDragStart={() => {
          isDragging.current = true;
          if (nudgeTimer.current != null) {
            window.clearTimeout(nudgeTimer.current);
            nudgeTimer.current = null;
          }
        }}
        onDragEnd={(_, info) => {
          isDragging.current = false;
          if (isConfirmed) return;
          if (Math.abs(info.offset.x) < 4) return;
          const progress = maxDrag > 0 ? x.get() / maxDrag : 0;
          if (progress >= THRESHOLD) commit();
          else animate(x, 0, springs.snappy);
        }}
        role="button"
        aria-label={label}
      >
        {/* Halo — outer stroke ring on press (halo.green from §3.3) */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: pressed && !isConfirmed ? 1 : 0 }}
          transition={
            pressed
              ? { duration: 0.08, ease: 'easeOut' }
              : { duration: 0.18, ease: 'easeOut', delay: 0.12 }
          }
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: CORNER + 4,
            border: '8px solid rgb(133, 166, 41)',
            pointerEvents: 'none',
            willChange: 'opacity',
            transform: 'translateZ(0)',
          }}
        />

        {isConfirmed ? (
          <motion.svg
            key="check"
            viewBox="0 0 24 24"
            width={28}
            height={28}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springs.completing}
            aria-hidden
          >
            <path
              d="M5 12l5 5L20 7"
              fill="none"
              stroke="black"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        ) : (
          <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="black"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.div>
    </div>
  );
}
