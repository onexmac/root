import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { springs } from "../springs";


/**
 * Estados visuales del pill, mirror del Figma `quantitySelector`:
 *   - pendiente:  gris, sin anillo — todavía no se registró
 *   - incompleto: anillo amarillo en el lado derecho (mitad) — faltan materiales
 *   - completo:   anillo verde completo — están todos
 *   - sin-stock:  anillo rojo completo — no hay disponible
 *
 * Aliases backward-compatible (mapean a los nombres viejos del DS):
 *   - default → incompleto, ok → completo, alert → sin-stock
 */
export type QtyVariant =
  | "pendiente"
  | "incompleto"
  | "completo"
  | "sin-stock"
  | "default"
  | "ok"
  | "alert";

export type QtyMode = "standard" | "pressed";

export interface QtyPillProps {
  /** Cantidad a mostrar dentro del círculo */
  value: number;
  /** Variante visual del anillo. Default "pendiente" (sin anillo). */
  variant?: QtyVariant;
  /** Modo visual. "pressed" agrega halo; también se aplica auto en :active si onTap se da. */
  mode?: QtyMode;
  /** Tamaño: sm=49px (default), md=64px, lg=96px */
  size?: "sm" | "md" | "lg";
  /** Si se pasa, el pill es tappable y dispara este callback */
  onTap?: () => void;
  /** Aria label custom; si no se da, se compone automáticamente */
  ariaLabel?: string;
  className?: string;
}

/** Mapping del nombre viejo al nuevo. La CSS solo tiene clases para los 4 nuevos. */
const VARIANT_RESOLVED: Record<QtyVariant, string> = {
  pendiente: "pendiente",
  incompleto: "incompleto",
  completo: "completo",
  "sin-stock": "sin-stock",
  default: "incompleto",
  ok: "completo",
  alert: "sin-stock",
};

/**
 * QtyPill — pill circular con anillo de variante + número, mirror del Figma quantitySelector.
 *
 * Estructura visual (3 capas):
 *   __outer:  disco gray-200 (49x49 en sm)
 *   __ring:   border colorido por variant — overlay sobre el outer
 *   __inner:  círculo negro (35x35 en sm) con el número
 *
 * Si se pasa `onTap`, es interactivo (botón con press animation y halo en :active).
 * Si no, es decorativo (span).
 */
export function QtyPill({
  value,
  variant = "pendiente",
  mode = "standard",
  size = "sm",
  onTap,
  ariaLabel,
  className,
}: QtyPillProps) {
  const resolved = VARIANT_RESOLVED[variant];
  const classes = `ds-qtypill ds-qtypill--${resolved} ds-qtypill--${mode} ds-qtypill--${size}${className ? ` ${className}` : ""}`;

  const inner = (
    <>
      <span className="ds-qtypill__outer" aria-hidden />
      <span className="ds-qtypill__ring" aria-hidden />
      <span className="ds-qtypill__inner">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className="ds-qtypill__value"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={springs.snappy}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );

  if (onTap) {
    return (
      <motion.button
        type="button"
        className={classes}
        onClick={onTap}
        whileTap={{ scale: 0.86 }}
        transition={springs.snappy}
        aria-label={ariaLabel ?? `Cantidad ${value}`}
      >
        {inner}
      </motion.button>
    );
  }

  return (
    <span className={classes} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
      {inner}
    </span>
  );
}
