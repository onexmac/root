"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";

export function PressScale({
  onActivate,
  style,
  className,
  children,
  ariaLabel,
  downScale = 0.96,
  onPressChange,
}: {
  onActivate: () => void;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
  ariaLabel: string;
  downScale?: number;
  onPressChange?: (pressed: boolean) => void;
}) {
  const [pressed, setPressedState] = useState(false);
  const setPressed = (v: boolean) => {
    setPressedState(v);
    onPressChange?.(v);
  };
  const cancelled = useRef(false);
  const activateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (activateTimer.current) clearTimeout(activateTimer.current);
    };
  }, []);

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      className={className}
      animate={{ scale: pressed ? downScale : 1 }}
      transition={pressed ? { duration: 0.08 } : springs.popping}
      onPointerDown={(e) => {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
        cancelled.current = false;
        setPressed(true);
        haptic.select();
      }}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => {
        if (pressed) {
          cancelled.current = true;
          setPressed(false);
        }
      }}
      onPointerCancel={() => {
        cancelled.current = true;
        setPressed(false);
      }}
      onClick={() => {
        if (!cancelled.current) activateTimer.current = setTimeout(onActivate, 100);
      }}
      style={{
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        // Behave like a button on touch-and-hold: no iOS image share/save
        // callout, no text/image selection.
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}
