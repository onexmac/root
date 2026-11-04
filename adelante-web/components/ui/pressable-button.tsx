'use client';

import { motion } from 'motion/react';
import {
  forwardRef,
  useCallback,
  useState,
  type CSSProperties,
  type ReactNode,
  type ButtonHTMLAttributes,
} from 'react';

/**
 * Halo color palette — the muted shade that appears as the press ring
 * around each button fill. Derived from the H4 / Adelante Figma palette;
 * keep these in sync with the SwiftUI `PressableSquircleStyle` statics.
 *
 *   green → muted olive   (paired with the brand green pill / "+")
 *   black → medium gray   (paired with the black squircle buttons)
 *   white → light gray    (paired with white buttons / cards)
 */
export const halo = {
  green: 'rgb(133, 166, 41)',
  black: 'rgb(140, 140, 140)',
  white: 'rgb(209, 209, 209)',
} as const;

export type HaloColor = (typeof halo)[keyof typeof halo] | string;

export interface PressableButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: ReactNode;
  /** Corner radius of your button's visible shape, in px. The halo tracks it. */
  cornerRadius?: number;
  /** Halo ring thickness, in px. 8 matches the iOS prototype. */
  haloWidth?: number;
  /** Halo color — typically one of the `halo` palette values. */
  haloColor?: HaloColor;
  /** Fires AFTER `pressDelayMs` so the halo registers visually before any UI change. */
  onClick?: () => void;
  /** Fires on pointer-down (use this for haptic.select() or analytics). */
  onPressStart?: () => void;
  /** Grace period between release and `onClick`. Default 100 ms — matches iOS. */
  pressDelayMs?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Pressable button — port of P2's SwiftUI `PressableSquircleStyle`.
 *
 * On press, a halo ring fades in OUTSIDE the button's edge. The button
 * itself does NOT scale or move — the halo is the entire feedback.
 *
 * Timing (matches iOS to the millisecond):
 *   • Press   → halo opacity 0 → 1, ease-out,  80 ms
 *   • Release → halo opacity 1 → 0, ease-out, 180 ms, delayed 120 ms
 *
 * The release delay is the magic that makes even the briefest tap feel
 * legible — the halo is GUARANTEED to be on screen long enough to read
 * before it starts fading.
 *
 * Halo geometry — to sit OUTSIDE the button:
 *   inset:        -haloWidth / 2          (bounds extend past the button)
 *   borderRadius: cornerRadius + haloWidth / 2   (tracks the button's shape)
 *   border:       haloWidth px solid haloColor
 *
 * Math: a border of thickness `haloWidth` centered on the inset edge has
 * its INNER edge at the button's edge and its OUTER edge `haloWidth` beyond.
 * The middle stays transparent because `border` doesn't fill.
 *
 * IMPORTANT: the parent container must leave at least `haloWidth/2` of
 * breathing room around this button (no `overflow: hidden` directly on
 * the wrapper, or the halo gets clipped). Use the `<PressableSlot>` helper
 * below when embedding inside a card or other clipping container.
 */
export const PressableButton = forwardRef<HTMLButtonElement, PressableButtonProps>(
  function PressableButton(
    {
      children,
      cornerRadius = 20,
      haloWidth = 8,
      haloColor = halo.black,
      onClick,
      onPressStart,
      pressDelayMs = 100,
      className,
      style,
      disabled = false,
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = useCallback(() => {
      if (!onClick || disabled) return;
      window.setTimeout(onClick, pressDelayMs);
    }, [onClick, pressDelayMs, disabled]);

    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        onPointerDown={() => {
          if (disabled) return;
          setIsPressed(true);
          onPressStart?.();
        }}
        onPointerUp={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
        onPointerCancel={() => setIsPressed(false)}
        onClick={handleClick}
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: cornerRadius,
          cursor: disabled ? 'default' : 'pointer',
          border: 0,
          padding: 0,
          margin: 0,
          background: 'transparent',
          outline: 'none',
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none',
          touchAction: 'manipulation',
          ...style,
          // Forced — halo positions itself absolutely against this element.
          position: 'relative',
        }}
      >
        {children}

        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: isPressed ? 1 : 0 }}
          transition={
            isPressed
              ? { duration: 0.08, ease: 'easeOut' }
              : { duration: 0.18, delay: 0.12, ease: 'easeOut' }
          }
          style={{
            position: 'absolute',
            inset: -haloWidth / 2,
            borderRadius: cornerRadius + haloWidth / 2,
            border: `${haloWidth}px solid ${haloColor}`,
            pointerEvents: 'none',
          }}
        />
      </button>
    );
  },
);

/**
 * Wrapper that reserves the breathing room the halo needs to grow into.
 * Use it around a PressableButton whenever the immediate parent has
 * `overflow: hidden` (cards, sheets, table cells). The padding equals
 * `haloWidth/2` on every side — same number the halo's inset uses — so
 * the halo's outer edge lands exactly on the slot's edge.
 *
 *   <PressableSlot>
 *     <PressableButton ...>…</PressableButton>
 *   </PressableSlot>
 */
export function PressableSlot({
  children,
  haloWidth = 8,
  className,
  style,
}: {
  children: ReactNode;
  haloWidth?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        padding: haloWidth / 2,
        margin: -haloWidth / 2,
        overflow: 'visible',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/**
 * Standalone press-delay helper — use it from a parent that owns the
 * tap callback (so the SAME 100 ms grace period applies even when the
 * action you're firing re-renders the button out of existence).
 *
 * Mirrors `pressDelayed` in P2's SwiftUI.
 */
export function pressDelayed(action: () => void, ms = 100) {
  window.setTimeout(action, ms);
}
