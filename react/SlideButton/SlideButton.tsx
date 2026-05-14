import React, { useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useMotionValue, useTransform } from "motion/react";
import { springs } from "../springs";
import { haptic } from "../haptic";
import { Icon } from "../Icon/Icon";


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

const TRACK_WIDTH = 352;
const KNOB_WIDTH = 88;
const KNOB_HEIGHT = 64;
const KNOB_MARGIN = 8;

/**
 * SlideButton — gesto de "deslizar para confirmar" estilo iOS.
 *
 * Comportamiento:
 *  - Drag horizontal del knob verde a la derecha; rubber-band al pasar el límite.
 *  - Al cruzar el threshold (default 72% del recorrido), dispara onConfirm.
 *  - Fill verde-200 detrás del knob crece con el progreso.
 *  - Label se desvanece al avanzar; al confirmar se muestra el confirmedLabel sobre toda la barra.
 *  - Haptics: select (start), drag (snap-back), complete (confirmar).
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
  const maxDrag = TRACK_WIDTH - KNOB_WIDTH - KNOB_MARGIN;

  const labelOpacity = useTransform(x, [0, maxDrag * 0.4], [1, 0]);
  const fillScaleX = useTransform(x, [0, maxDrag], [0, 1]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (disabled) return;
    const progress = info.offset.x / maxDrag;
    if (progress > threshold) {
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
        onDragStart={() => {
          haptic.select();
          setDragging(true);
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
