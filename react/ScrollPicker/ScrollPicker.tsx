import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { springs } from "../springs";
import { haptic } from "../haptic";
import { QtyPill, type QtyVariant } from "../QtyPill/QtyPill";


const ITEM_HEIGHT = 48;

export interface ScrollPickerProps {
  /** Si está abierto, muestra el bottom sheet */
  open: boolean;
  /** Valor inicial cuando se abre */
  initialValue: number;
  /** Texto contextual mostrado en el header (ej. nombre del material) */
  contextLabel?: string;
  /** Variante de color para el pill grande y la banda del wheel */
  variant?: QtyVariant;
  /** Mínimo. Default 0 */
  min?: number;
  /** Máximo. Default 999 */
  max?: number;
  /** Callback al cerrar sin confirmar */
  onClose: () => void;
  /** Callback al confirmar la cantidad elegida */
  onConfirm: (value: number) => void;
  /** Texto del botón confirmar. Default "Confirmar" */
  confirmLabel?: string;
}

/**
 * ScrollPicker — bottom sheet con rueda scrolleable estilo iOS para elegir cantidades.
 *
 * Tres formas de cambiar el valor:
 *  - Scrollear el wheel (snap-to-row con momentum)
 *  - Tap en el pill grande → swap a input numérico
 *  - Combinación: input sincroniza al wheel y viceversa
 *
 * Se renderiza vía portal a `document.body` para escapar del stacking context
 * de cualquier ancestro con transform (ej. cards arrastrables).
 */
export function ScrollPicker({
  open,
  initialValue,
  contextLabel,
  variant = "default",
  min = 0,
  max = 999,
  onClose,
  onConfirm,
  confirmLabel = "Confirmar",
}: ScrollPickerProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(initialValue));
  const lastHapticRef = useRef(initialValue);
  const programmaticScrollRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    setValue(initialValue);
    setDraft(String(initialValue));
    setEditing(false);
    lastHapticRef.current = initialValue;
    programmaticScrollRef.current = true;
    requestAnimationFrame(() => {
      const el = wheelRef.current;
      if (el) el.scrollTop = (initialValue - min) * ITEM_HEIGHT;
      requestAnimationFrame(() => {
        programmaticScrollRef.current = false;
      });
    });
  }, [open, initialValue, min]);

  const handleScroll = () => {
    const el = wheelRef.current;
    if (!el) return;
    const idx = Math.max(min, Math.min(max, Math.round(el.scrollTop / ITEM_HEIGHT) + min));
    if (idx !== value) {
      setValue(idx);
      if (!editing) setDraft(String(idx));
      if (!programmaticScrollRef.current && idx !== lastHapticRef.current) {
        haptic.select();
        lastHapticRef.current = idx;
      }
    }
  };

  const scrollWheelTo = (next: number, behavior: ScrollBehavior = "smooth") => {
    const clamped = Math.max(min, Math.min(max, next));
    const el = wheelRef.current;
    if (el) {
      programmaticScrollRef.current = true;
      el.scrollTo({ top: (clamped - min) * ITEM_HEIGHT, behavior });
      window.setTimeout(
        () => {
          programmaticScrollRef.current = false;
        },
        behavior === "smooth" ? 350 : 50,
      );
    }
  };

  const confirm = () => {
    haptic.complete();
    const parsed = parseInt(draft.replace(/[^\d]/g, ""), 10);
    const final = Number.isFinite(parsed) ? Math.max(min, Math.min(max, parsed)) : value;
    onConfirm(final);
  };

  const startEdit = () => {
    haptic.select();
    setDraft(String(value));
    setEditing(true);
    requestAnimationFrame(() => inputRef.current?.select());
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
    setDraft(cleaned);
    const parsed = parseInt(cleaned, 10);
    if (Number.isFinite(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      setValue(clamped);
      lastHapticRef.current = clamped;
      scrollWheelTo(clamped, "auto");
    }
  };

  const onInputBlur = () => {
    setEditing(false);
    if (draft === "" || !Number.isFinite(parseInt(draft, 10))) {
      setDraft(String(value));
    }
  };

  const items = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => i + min),
    [min, max],
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="ds-sp__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={springs.snappy}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            className="ds-sp"
            role="dialog"
            aria-modal="true"
            aria-label="Elegir cantidad"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={springs.expanding}
          >
            <div className="ds-sp__handle" aria-hidden />

            {contextLabel && (
              <header className="ds-sp__header">
                <span className="ds-sp__material">{contextLabel}</span>
                <motion.button
                  type="button"
                  className="ds-sp__close"
                  onClick={onClose}
                  whileTap={{ scale: 0.9 }}
                  transition={springs.snappy}
                  aria-label="Cerrar"
                >
                  <CloseIcon />
                </motion.button>
              </header>
            )}

            <div className="ds-sp__divider" aria-hidden />

            <div className="ds-sp__value-row">
              {editing ? (
                <input
                  ref={inputRef}
                  className={`ds-sp__value-input ds-sp__value-input--${variant}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={draft}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                  aria-label="Escribir cantidad"
                />
              ) : (
                <button
                  type="button"
                  className="ds-sp__value-button"
                  onClick={startEdit}
                  aria-label={`Cantidad ${value}, tocá para escribir`}
                >
                  <QtyPill value={value} variant={variant} size="lg" />
                </button>
              )}
              <span className="ds-sp__value-hint">
                {editing ? "Enter para confirmar" : "Tocá para escribir"}
              </span>
            </div>

            <div
              className={`ds-sp__wheel ds-sp__wheel--${variant}`}
              role="listbox"
              aria-label="Cantidad"
              aria-valuenow={value}
            >
              <div className="ds-sp__band" aria-hidden />
              <div className="ds-sp__fade ds-sp__fade--top" aria-hidden />
              <div className="ds-sp__fade ds-sp__fade--bottom" aria-hidden />

              <div className="ds-sp__scroll" ref={wheelRef} onScroll={handleScroll}>
                <ul className="ds-sp__list">
                  {items.map((n) => (
                    <li
                      key={n}
                      className={`ds-sp__item ${n === value ? "ds-sp__item--active" : ""}`}
                      aria-selected={n === value}
                      role="option"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.button
              type="button"
              className="ds-sp__confirm"
              onClick={confirm}
              whileTap={{ scale: 0.97 }}
              transition={springs.snappy}
            >
              {confirmLabel}
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
