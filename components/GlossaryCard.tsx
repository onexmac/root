"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "motion/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";

const RUBBER_KNEE = 240;
const RUBBER_FACTOR = 0.35;

function rubber(overshoot: number) {
  return overshoot < RUBBER_KNEE
    ? overshoot
    : RUBBER_KNEE + (overshoot - RUBBER_KNEE) * RUBBER_FACTOR;
}

export function GlossaryCard({
  term,
  definition,
  onClose,
}: {
  term: string | null;
  definition: string;
  onClose: () => void;
}) {
  const open = term !== null;
  const y = useMotionValue(0);
  const dragging = useRef(false);
  const startY = useRef(0);
  const baseY = useRef(0);
  const engaged = useRef(false);
  const pointerId = useRef<number | null>(null);
  const samples = useRef<{ y: number; t: number }[]>([]);

  useEffect(() => {
    if (open) y.set(0);
  }, [open, y]);

  const onPointerDown = (e: React.PointerEvent) => {
    y.stop();
    dragging.current = true;
    engaged.current = false;
    startY.current = e.clientY;
    baseY.current = y.get();
    pointerId.current = e.pointerId;
    samples.current = [{ y: e.clientY, t: e.timeStamp }];
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || pointerId.current !== e.pointerId) return;
    const dy = e.clientY - startY.current;
    if (!engaged.current && Math.abs(dy) > 8) {
      engaged.current = true;
      haptic.drag();
    }
    const naive = baseY.current + Math.max(0, dy);
    y.set(naive <= 0 ? 0 : rubber(naive));

    samples.current.push({ y: e.clientY, t: e.timeStamp });
    const cutoff = e.timeStamp - 120;
    while (samples.current.length > 2 && samples.current[0].t < cutoff) {
      samples.current.shift();
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerId.current !== e.pointerId) return;
    pointerId.current = null;
    dragging.current = false;
    const translation = y.get();
    const first = samples.current[0];
    const last = samples.current[samples.current.length - 1];
    const dt = last.t - first.t;
    const vy = dt > 0 ? (last.y - first.y) / dt : 0;
    const predicted = translation + vy * 250;
    const dismiss = translation > 100 || predicted > 250;
    if (dismiss) {
      haptic.select();
      animate(y, 800, springs.settling);
      onClose();
    } else {
      animate(y, 0, springs.snappy);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            className="absolute inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
          />
          <motion.div
            key="card"
            className="absolute inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-white px-6 pt-8 text-black"
            style={{
              y,
              paddingBottom: "calc(var(--sab) + 32px)",
              willChange: "transform",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={springs.expanding}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <h3 className="text-2xl font-semibold mb-4">{term}</h3>
            <p className="text-lg leading-relaxed text-black/80">{definition}</p>
            <div className="flex justify-center mt-6">
              <button
                type="button"
                aria-label="Cerrar"
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 7l6 6 6-6"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
