"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { haptic } from "@/lib/haptic";

export function HaloPress({
  onActivate,
  radius,
  haloColor,
  style,
  className,
  children,
  ariaLabel,
  capturePointer = true,
}: {
  onActivate: () => void;
  radius: number;
  haloColor: string;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
  ariaLabel: string;
  /** When false, the button does NOT setPointerCapture on pointerdown, so a
   *  drag that begins on it can bubble to an ancestor gesture handler (e.g. the
   *  reel pager). Moving off the button then fires onPointerLeave → cancels the
   *  press, so no accidental activation. Default true for standalone buttons. */
  capturePointer?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const cancelled = useRef(false);
  const activateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (activateTimer.current) clearTimeout(activateTimer.current);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      onPointerDown={(e) => {
        if (capturePointer) {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {}
        }
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
        position: "relative",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        ...style,
      }}
    >
      {children}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: -8,
          borderRadius: radius + 8,
          border: `8px solid ${haloColor}`,
          pointerEvents: "none",
          opacity: pressed ? 1 : 0,
          transition: pressed
            ? "opacity 80ms ease-out"
            : "opacity 180ms ease-out 120ms",
        }}
      />
    </button>
  );
}
