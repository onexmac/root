import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useAnimationControls, useMotionValue, useTransform } from "motion/react";
import { springs } from "../springs";
import { haptic } from "../haptic";
import { Icon } from "../Icon/Icon";
import "./SlideButton.css";

export interface SlideButtonProps {
  /** Texto del label centrado (ej. "Pedir", "Confirmar") */
  label?: string;
  /** Texto que se muestra cuando se confirma */
  confirmedLabel?: string;
  /** Cuánto del recorrido necesita el knob para confirmar (0-1). Default 0.72 */
  threshold?: number;
  /** Callback cuando el usuario completa el deslizamiento */
  onConfirm: () => void;
  /** Bloquea el gesto y atenúa visualmente el botón */
  disabled?: boolean;
  /** Texto alternativo cuando está disabled */
  disabledLabel?: string;
  /** Tiempo (ms) que el estado "confirmado" permanece visible antes de resetear. Default 1800 */
  confirmedHoldMs?: number;
  /** Reset automático después de confirmar. Default true */
  autoReset?: boolean;
  className?: string;
}

/* Figma node 997-3096 dimensions */
const COMPONENT_WIDTH = 242;
const KNOB_SIZE = 56;         /* standard knob body */

/* Tap threshold: drag offsets below this are treated as taps, not drags. */
const TAP_OFFSET_PX = 4;

/* Nudge — fires on tap-without-drag to hint at slide-ability.
 * Springs match SwiftUI's spring(response: 0.22, damping: 0.55) on kick
 * and (0.36, 0.72) on return, with the damping pushed a bit lower on the
 * kick for visible overshoot — the web's pointer drag lacks the inertia
 * of a real touch driver, so the extra bounce compensates. */
const NUDGE_DISTANCE_PX = 32;
const NUDGE_HOLD_MS = 180;
const NUDGE_KICK = { type: "spring", stiffness: 800, damping: 15 } as const;
const NUDGE_RETURN = { type: "spring", stiffness: 320, damping: 24 } as const;

/**
 * SlideButton — deslizar para confirmar.
 *
 * Figma: 242×80, black track 236×54, green knob 56×56 → 64×64 pressed.
 * Springs: snappy (snap-back), completing (confirm animation).
 * Haptics: select (touch), drag (snap-back), complete (confirm).
 */
export function SlideButton({
  label = "Pedir",
  confirmedLabel = "Confirmado",
  threshold = 0.72,
  onConfirm,
  disabled = false,
  disabledLabel,
  confirmedHoldMs = 1800,
  autoReset = true,
  className,
}: SlideButtonProps) {
  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const [confirmed, setConfirmed] = useState(false);
  const maxDrag = COMPONENT_WIDTH - KNOB_SIZE;

  const labelOpacity = useTransform(x, [0, maxDrag * 0.4], [1, 0]);
  const fillScaleX = useTransform(x, [0, maxDrag], [0, 1]);

  // Pending nudge-return timer. Cleared on re-tap, drag start, confirm, or
  // unmount so a stale "go back to 0" can't snap the knob mid-interaction.
  const nudgeTimerRef = useRef<number | null>(null);
  const clearNudgeTimer = () => {
    if (nudgeTimerRef.current != null) {
      window.clearTimeout(nudgeTimerRef.current);
      nudgeTimerRef.current = null;
    }
  };
  useEffect(() => () => clearNudgeTimer(), []);

  // Nudge — bouncy kick-right + settled return. Hints at slide-ability
  // when the user taps the knob instead of dragging.
  const nudge = () => {
    if (disabled || confirmed) return;
    haptic.select();
    clearNudgeTimer();
    animate(x, NUDGE_DISTANCE_PX, NUDGE_KICK);
    nudgeTimerRef.current = window.setTimeout(() => {
      nudgeTimerRef.current = null;
      animate(x, 0, NUDGE_RETURN);
    }, NUDGE_HOLD_MS);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (disabled) return;
    // Tap without meaningful drag → nudge instead of snap-back.
    if (Math.abs(info.offset.x) < TAP_OFFSET_PX) {
      nudge();
      return;
    }
    const progress = info.offset.x / maxDrag;
    if (progress > threshold) {
      clearNudgeTimer();
      haptic.complete();
      setConfirmed(true);
      controls.start({ x: maxDrag, transition: springs.completing });
      onConfirm();
      if (autoReset) {
        window.setTimeout(() => {
          x.set(0);
          setConfirmed(false);
        }, confirmedHoldMs);
      }
    } else {
      haptic.drag();
      controls.start({ x: 0, transition: springs.snappy });
    }
  };

  const visibleLabel = disabled ? (disabledLabel ?? label) : label;
  const [dragging, setDragging] = useState(false);

  return (
    <div
      className={`ds-slide ${disabled ? "ds-slide--disabled" : ""}${className ? ` ${className}` : ""}`}
      aria-live="polite"
    >
      <div className="ds-slide__track">
        <motion.div className="ds-slide__fill" style={{ scaleX: fillScaleX }} aria-hidden />
        <motion.span className="ds-slide__label" style={{ opacity: labelOpacity }}>
          {visibleLabel}
        </motion.span>
      </div>

      <AnimatePresence>
        {confirmed && (
          <motion.div
            key="confirm"
            className="ds-slide__confirm"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={springs.completing}
          >
            <Icon name="check" size="lg" color="currentColor" />
            <span>{confirmedLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="ds-slide__knob"
        drag={confirmed || disabled ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x }}
        animate={controls}
        // Fire haptic on touchdown — earlier than onDragStart, feels instant.
        // Cancel any pending nudge return so a tap during a nudge doesn't
        // get snapped back mid-interaction.
        onPointerDown={() => {
          if (disabled || confirmed) return;
          haptic.select();
          clearNudgeTimer();
        }}
        onDragStart={() => {
          setDragging(true);
          clearNudgeTimer();
        }}
        onDragEnd={(...args) => {
          setDragging(false);
          handleDragEnd(...(args as Parameters<typeof handleDragEnd>));
        }}
        data-dragging={dragging || undefined}
        aria-label={`Deslizar para ${label.toLowerCase()}`}
        disabled={disabled}
      >
        <Icon name="arrow-right" size="lg" color="currentColor" />
      </motion.button>
    </div>
  );
}
